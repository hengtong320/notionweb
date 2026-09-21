'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert'),crypto=require('crypto'),cp=require('child_process');
const {chromium,webkit}=require('playwright');
const root=path.resolve(__dirname,'..'),base=path.join(root,'knee-atlas'),out=path.join(base,'qa');fs.mkdirSync(out,{recursive:true});
const info=JSON.parse(fs.readFileSync(path.join(base,'build-info.json'))),meta=JSON.parse(fs.readFileSync(path.join(base,'assets/provenance.json')));
const checks=[],errors=[],requests=[];const check=(name,pass,detail)=>{checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});assert(pass,name);console.log('PASS',name);};
const live=process.env.ATLAS_LIVE_URL,engine=process.env.ATLAS_BROWSER==='webkit'?webkit:chromium,label=live?'live':engine===webkit?'webkit':'offline';
const report={startedAt:new Date().toISOString(),browser:engine===webkit?'webkit':'chromium',url:live||'file: embedded HTML',htmlSHA256:info.htmlSHA256,success:false,checks,errors,requests};
(async()=>{let browser,page;try{
 browser=await engine.launch({headless:true,...(engine===chromium?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']}:{})});
 const context=await browser.newContext({viewport:{width:1366,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
 if(!live)await context.route('**/*',r=>/^https?:/.test(r.request().url())?r.abort():r.continue());
 page=await context.newPage();page.setDefaultTimeout(45000);page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 const response=await page.goto(live||'file://'+path.join(base,'index.html'),{waitUntil:'load',timeout:90000});
 if(live){check('Public URL returns HTTP 200',response.status()===200);check('Public HTML exactly matches tested build',crypto.createHash('sha256').update(await response.body()).digest('hex')===info.htmlSHA256);}
 await page.waitForFunction(()=>window.__FOOT_ATLAS__?.getState().ready,undefined,{timeout:60000});
 const state=()=>page.evaluate(()=>window.__FOOT_ATLAS__.getState());
 const settle=async()=>{await page.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating);await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));};
 const click=async selector=>{await page.locator(selector).click();await settle();};
 const region=async r=>{await click('[data-region="'+r+'"]');};
 const shot=async name=>{await settle();await page.screenshot({path:path.join(out,label+'-'+name+'.png'),timeout:30000});};
 await settle();let s=await state();
 check('All 32 anatomical meshes loaded',s.count===32&&s.visible===32);
 check('Initial region is full right lower limb',s.region==='whole');
 check('Source triangle count matches verified mesh manifest',s.bones.reduce((n,b)=>n+b.triangles,0)===info.totalTriangles);
 check('No network dependencies after HTML',requests.length===(live?1:0),requests);
 check('All 30 prior meshes retain their coordinates',meta.approvedAnklePreserved&&meta.maxPriorCoordinateErrorMillimeters===0);
 check('Approved foot and ankle directories unchanged',cp.execSync('git diff '+info.baseRef+' -- foot-atlas/ ankle-atlas/',{cwd:root}).length===0);
 check('Loading overlay dismisses',await page.locator('#loading').evaluate(e=>e.classList.contains('done')));
 check('New count is visible in sidebar',(await page.locator('.library-meta').innerText()).includes('32'));
 await shot('01-whole');
 for(const [r,count]of [['foot',28],['ankle',30],['leg',30],['knee',4],['whole',32]]){
  await region(r);s=await state();check('Region '+r+' contains correct independent bones',s.visible===count&&s.region===r,{visible:s.visible});
  check('Region '+r+' creates finite camera coordinates',[...s.camera,...s.target].every(Number.isFinite));
  if(['foot','ankle','knee'].includes(r))await shot('region-'+r);
 }
 // WebKit smoke test covers rendering and new-bone selection with blocked network.
 if(engine===webkit){for(const id of ['femur','patella']){await click('[data-select="'+id+'"]');check('WebKit identifies '+id,(await state()).selected===id);await click('#isolateBtn');check('WebKit isolates '+id,(await state()).visible===1);await page.keyboard.press('Escape');await settle();}check('WebKit no rendering errors',errors.length===0,errors);report.success=true;return;}
 await region('whole');
 for(const bone of (await state()).bones){await page.locator('[data-select="'+bone.id+'"]').click();check('Chinese name and description: '+bone.id,(await state()).selected===bone.id&&(await page.locator('#description').innerText()).trim().length>8);}
 await click('[data-select="patella"]');check('Patella pronunciation',(await page.locator('#detailTitle').innerText()).includes('bìn gǔ'));check('Patella articulation is with femur only',(await page.locator('#neighbors').innerText()).trim()==='股骨');
 await click('[data-select="femur"]');check('Femur has tibia and patella as articulating neighbors',(await page.locator('#neighbors').innerText()).includes('胫骨')&&(await page.locator('#neighbors').innerText()).includes('髌骨')&&!(await page.locator('#neighbors').innerText()).includes('腓骨'));
 for(const [q,id]of [['髌','patella'],['bin','patella'],['Femur','femur'],['胫','tibia'],['fei','fibula']]){await page.locator('#search').fill(q);check('Search '+q+' resolves '+id,await page.locator('.bone-row:visible').count()===1&&(await page.locator('.bone-row:visible').getAttribute('data-bone'))===id);}await page.locator('#search').fill('');
 async function drag(id,mode,dx=60,dy=18){await click('[data-mode="'+mode+'"]');const p=await page.evaluate(id=>window.__FOOT_ATLAS__.getPickPoint(id),id);check('Visible mouse target '+id+'/'+mode,!!p);await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+dx,p.y+dy,{steps:6});await page.mouse.up();await settle();}
 // Preserve the original fine foot controls.
 await region('foot');await click('#homeBtn');await click('[data-view="dorsal"]');
 let pt=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('talus'));check('Original talus can be picked',!!pt);await page.mouse.click(pt.x,pt.y);check('Actual foot click still selects talus',(await state()).selected==='talus');
 const before=await state();await drag('talus','move',60,-20);s=await state();check('Foot drag moves just one mesh',s.bones.filter(b=>Math.hypot(...b.offset)>.1).length===1);check('Dragging does not rotate the scene',Math.hypot(...s.camera.map((v,i)=>v-before.camera[i]))<.1);
 await click('#ghostBtn');check('Original-position reference works',(await state()).ghost);await drag('talus','rotate',32,20);check('Original foot bone rotates independently',Math.abs((await state()).bones.find(b=>b.id==='talus').rotation[3]-1)>.001);
 await click('#resetBonesBtn');s=await state();check('Every mesh returns to original position and rotation',s.bones.every(b=>Math.hypot(...b.position.map((v,i)=>v-b.home[i]))<1e-8&&Math.abs(b.rotation[3]-1)<1e-8));
 await click('#isolateBtn');check('Single foot-bone viewing retained',(await state()).visible===1);await page.keyboard.press('Escape');await settle();check('Escape returns to foot-only scope',(await state()).visible===28);
 await click('#hideSelectedBtn');check('Hide bone retained',(await state()).visible===27);await click('#showAllBtn');check('Show all respects foot scope',(await state()).visible===28);
 await page.locator('#explode').evaluate(e=>{e.value=60;e.dispatchEvent(new Event('input',{bubbles:true}));});await settle();check('Foot expansion retained',(await state()).explode===60);
 if(!(await state()).labels)await click('#labelsBtn');check('Foot creates 28 labels',await page.locator('.bone-label').count()===28);await click('#homeBtn');if((await state()).labels)await click('#labelsBtn');
 for(const [name,axis,sign]of [['plantar',1,-1],['medial',0,1],['lateral',0,-1]]){await click('[data-view="'+name+'"]');s=await state();check('Original standard view '+name,(s.camera[axis]-s.target[axis])*sign>0);}
 // Both prior long bones and both new bones must support the same actual mouse operations.
 for(const id of ['tibia','fibula','femur','patella']){
  await region(id==='femur'?'whole':id==='patella'?'knee':'leg');await click('#homeBtn');await click('[data-select="'+id+'"]');
  if(id==='patella')await click('[data-view="front"]');
  let p=await page.evaluate(id=>window.__FOOT_ATLAS__.getPickPoint(id),id);
  if(!p){await click('[data-view="lateral"]');p=await page.evaluate(id=>window.__FOOT_ATLAS__.getPickPoint(id),id);}
  check('Whole anatomical bone is mouse-pickable: '+id,!!p);await page.mouse.click(p.x,p.y);check('Mouse selects '+id,(await state()).selected===id);
  await drag(id,'move',id==='fibula'?-60:60,15);s=await state();check('Move only '+id,s.bones.filter(b=>Math.hypot(...b.offset)>.1).length===1&&Math.hypot(...s.bones.find(b=>b.id===id).offset)>3);
  await drag(id,'rotate',30,17);check('Rotate '+id,Math.abs((await state()).bones.find(b=>b.id===id).rotation[3]-1)>.001);
  if(['femur','patella'].includes(id))await shot(id+'-separated');
  await click('#isolateBtn');check('Isolate '+id,(await state()).visible===1);if(['femur','patella'].includes(id))await shot(id+'-single');
  await page.keyboard.press('Escape');await settle();await click('#resetSelectedBtn');s=await state();let b=s.bones.find(b=>b.id===id);check('Accurate individual reset '+id,Math.hypot(...b.offset)<1e-8&&Math.abs(b.rotation[3]-1)<1e-8);
 }
 await region('knee');await click('#homeBtn');await click('[data-select="patella"]');await click('[data-view="front"]');
 s=await state();check('Knee scope contains femur patella tibia fibula only',s.bones.filter(b=>b.visible).map(b=>b.id).sort().join(',')==='femur,fibula,patella,tibia');
 check('Front knee camera is anterior to target',s.camera[2]>s.target[2]);await shot('02-knee-front');await click('[data-view="back"]');s=await state();check('Posterior knee view works',s.camera[2]<s.target[2]);await shot('03-knee-back');
 await click('#neighborsBtn');check('Neighbor emphasis retained',(await state()).neighbors);await click('#neighborsBtn');
 await region('whole');await click('#homeBtn');await page.locator('#explode').evaluate(e=>{e.value=55;e.dispatchEvent(new Event('input',{bubbles:true}));});await settle();s=await state();check('All 32 meshes can be separated',s.explode===55&&s.bones.every(b=>Math.hypot(...b.position.map((v,i)=>v-b.home[i]))>1));
 if(!s.labels)await click('#labelsBtn');check('32 independent Chinese labels created',await page.locator('.bone-label').count()===32);await shot('04-whole-exploded');await click('#homeBtn');
 await region('foot');await click('[data-select="femur"]');check('Selecting femur from foot scope reveals knee region',(await state()).region==='knee'&&(await state()).bones.find(b=>b.id==='femur').visible);
 await region('knee');await click('[data-select="calcaneus"]');check('Selecting foot bone from knee scope returns to foot',(await state()).region==='foot');
 await region('leg');await click('#homeBtn');await page.setViewportSize({width:1366,height:768});await settle();check('Laptop layout has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await region('knee');await shot('05-laptop-knee');
 await click('#helpBtn');check('Help opens',await page.locator('#helpDialog').isVisible());await page.locator('#helpDialog [data-close]').last().click();await click('#footerSource');check('Source dialog includes knee limitations',(await page.locator('#sourceDialog').innerText()).includes('半月板'));await page.locator('#sourceDialog [data-close]').click();
 const dl=page.waitForEvent('download');await page.locator('#captureBtn').click();await(await dl).saveAs(path.join(out,label+'-capture.png'));check('Screenshot download retained',fs.statSync(path.join(out,label+'-capture.png')).size>5000);
 check('No browser or shader errors',errors.length===0,errors);report.success=true;
}catch(e){errors.push(String(e));console.error(e);if(page)try{await page.screenshot({path:path.join(out,label+'-failure.png'),timeout:15000});}catch{}process.exitCode=1;
}finally{report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,label+'-report.json'),JSON.stringify(report,null,2));console.log('TEST_RESULT',label,report.success,checks.length);if(browser)await browser.close();}})();
