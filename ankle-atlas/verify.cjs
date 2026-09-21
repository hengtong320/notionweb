'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert'),crypto=require('crypto'),cp=require('child_process');
const {chromium,webkit}=require('playwright');
const base=path.resolve(__dirname,'../ankle-atlas'),out=path.join(base,'qa');fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[],requests=[];const check=(name,pass,detail)=>{checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});assert(pass,name);console.log('PASS',name);};
const live=process.env.ATLAS_LIVE_URL,engine=process.env.ATLAS_BROWSER==='webkit'?webkit:chromium;
const label=live?'live':engine===webkit?'webkit':'final-offline';
(async()=>{let browser,page;try{
 browser=await engine.launch({headless:true,...(engine===chromium?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']}:{})});
 const context=await browser.newContext({viewport:{width:1366,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
 if(!live)await context.route('**/*',r=>/^https?:/.test(r.request().url())?r.abort():r.continue());
 page=await context.newPage();page.setDefaultTimeout(30000);
 page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 const response=await page.goto(live||'file://'+path.join(base,'index.html'),{waitUntil:'load',timeout:90000});
 if(live){check('Public page HTTP 200',response.status()===200);const data=await response.body();check('Public page exactly matches verified artifact',crypto.createHash('sha256').update(data).digest('hex')===crypto.createHash('sha256').update(fs.readFileSync(path.join(base,'index.html'))).digest('hex'));}
 await page.waitForFunction(()=>window.__FOOT_ATLAS__?.getState().ready,undefined,{timeout:45000});
 const state=()=>page.evaluate(()=>window.__FOOT_ATLAS__.getState()),settle=async()=>{await page.waitForTimeout(650);await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));};
 const region=async name=>{await page.locator('[data-region="'+name+'"]').click();await settle();};
 await settle();let s=await state();
 check('All 30 independent bones loaded',s.count===30&&s.visible===30);
 check('19,520 source triangles preserved',s.bones.reduce((n,b)=>n+b.triangles,0)===19520);
 check('Initial view shows complete lower leg and foot',s.region==='leg');
 check('No secondary downloads for anatomy or engine',requests.length===(live?1:0),requests);
 const meta=JSON.parse(fs.readFileSync(path.join(base,'assets/provenance.json')));check('All 28 approved foot mesh positions exactly preserved',meta.approvedFootPreserved&&meta.maxFootCoordinateErrorMillimeters===0);
 check('Original foot page not modified',cp.execSync('git diff 31d013bc909f0846beaa384cad647f12db8f7aa6 -- foot-atlas/',{cwd:path.dirname(base)}).length===0);
 await page.screenshot({path:path.join(out,label+'-01-full-leg.png')});
 for(const bone of s.bones){await page.locator('[data-select="'+bone.id+'"]').click();check('Chinese identification: '+bone.id,(await state()).selected===bone.id&&(await page.locator('#description').innerText()).trim().length>8);}
 await page.locator('[data-select="tibia"]').click();check('Tibia name and pronunciation',(await page.locator('#detailTitle').innerText()).includes('jìng gǔ'));
 await page.locator('[data-select="fibula"]').click();check('Fibula name and pronunciation',(await page.locator('#detailTitle').innerText()).includes('féi gǔ'));
 await page.locator('#search').fill('胫');check('Chinese search finds only tibia',await page.locator('.bone-row:visible').count()===1);await page.locator('#search').fill('fei');check('Pinyin search finds only fibula',await page.locator('.bone-row:visible').count()===1);await page.locator('#search').fill('');
 // Run the original interaction regression in the same foot-only observation scope.
 await region('foot');s=await state();check('Foot scope retains 28 original visible meshes',s.visible===28&&s.bones.filter(b=>b.visible).every(b=>!['tibia','fibula'].includes(b.id)));
 await page.locator('#homeBtn').click();await settle();await page.screenshot({path:path.join(out,label+'-02-original-foot.png')});
 await page.locator('[data-view="dorsal"]').click();await settle();
 let pt=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('talus'));check('Original foot remains raycast-pickable',!!pt);await page.mouse.click(pt.x,pt.y);check('Actual foot click identifies talus',(await state()).selected==='talus');
 async function dragBone(id,mode,dx=70,dy=-25){await page.locator('[data-mode="'+mode+'"]').click();await settle();const pt=await page.evaluate(id=>window.__FOOT_ATLAS__.getPickPoint(id),id);check('Visible drag surface: '+id+'/'+mode,!!pt);await page.mouse.move(pt.x,pt.y);await page.mouse.down();await page.mouse.move(pt.x+dx,pt.y+dy,{steps:10});await page.mouse.up();await settle();}
 const before=await state();await dragBone('talus','move');s=await state();check('Original foot drag moves exactly one bone',s.bones.filter(b=>Math.hypot(...b.offset)>.1).length===1);check('Dragging a bone does not orbit camera',Math.hypot(...s.camera.map((v,i)=>v-before.camera[i]))<.1);
 await page.locator('#ghostBtn').click();check('Original-position reference works',(await state()).ghost);
 await dragBone('talus','rotate',40,24);check('Original foot individual rotation works',Math.abs((await state()).bones.find(b=>b.id==='talus').rotation[3]-1)>.001);
 await page.locator('#resetBonesBtn').click();await settle();s=await state();check('Reset preserves exact original coordinates',s.bones.every(b=>Math.hypot(...b.position.map((v,i)=>v-b.home[i]))<1e-8));check('Reset restores individual orientations',s.bones.every(b=>Math.abs(b.rotation[3]-1)<1e-8));
 await page.locator('#isolateBtn').click();await settle();check('Original foot single-bone study',(await state()).visible===1);await page.keyboard.press('Escape');await settle();check('Escape returns to same foot scope',(await state()).visible===28&&(await state()).region==='foot');
 await page.locator('#neighborsBtn').click();check('Neighbor emphasis works',(await state()).neighbors);await page.locator('#neighborsBtn').click();
 await page.locator('#hideSelectedBtn').click();check('Hide selected bone works',(await state()).visible===27);await page.locator('#showAllBtn').click();await settle();check('Show all respects foot scope',(await state()).visible===28);
 await page.locator('#explode').evaluate(e=>{e.value=60;e.dispatchEvent(new Event('input',{bubbles:true}));});await settle();check('Original full-foot expansion works',(await state()).explode===60);
 await page.locator('#labelsBtn').click();await settle();await page.waitForFunction(()=>document.querySelectorAll('.bone-label').length===28);check('Foot labels show original 28 structures',await page.locator('.bone-label').count()===28);
 await page.locator('#homeBtn').click();await settle();
 for(const [name,axis,sign]of [['plantar',1,-1],['medial',0,1],['lateral',0,-1]]){await page.locator('[data-view="'+name+'"]').click();await settle();s=await state();check('Correct standard view: '+name,(s.camera[axis]-s.target[axis])*sign>0);}
 // New regional views and independent long-bone controls.
 await region('leg');await page.locator('#homeBtn').click();await settle();
 for(const id of ['tibia','fibula']){
  await region('leg');await page.locator('#homeBtn').click();await settle();await page.locator('[data-select="'+id+'"]').click();await settle();
  let point=await page.evaluate(id=>window.__FOOT_ATLAS__.getPickPoint(id),id);
  if(!point){await page.locator('[data-view="lateral"]').click();await settle();point=await page.evaluate(id=>window.__FOOT_ATLAS__.getPickPoint(id),id);}
  check('New bone visible and pickable: '+id,!!point);await page.mouse.click(point.x,point.y);check('Mouse click identifies '+id,(await state()).selected===id);
  await dragBone(id,'move',id==='fibula'?-85:85,15);s=await state();check('Only '+id+' is displaced',s.bones.filter(b=>Math.hypot(...b.offset)>.1).length===1&&Math.hypot(...s.bones.find(b=>b.id===id).offset)>5);
  await dragBone(id,'rotate',32,18);check('Independent long-bone rotation: '+id,Math.abs((await state()).bones.find(b=>b.id===id).rotation[3]-1)>.001);
  await page.screenshot({path:path.join(out,label+'-'+id+'-moved.png')});
  await page.locator('#isolateBtn').click();await settle();check('Single long-bone inspection: '+id,(await state()).visible===1);await page.screenshot({path:path.join(out,label+'-'+id+'-single.png')});
  await page.keyboard.press('Escape');await page.locator('#resetSelectedBtn').click();await settle();s=await state();const b=s.bones.find(b=>b.id===id);check('Per-bone reset: '+id,Math.hypot(...b.offset)<1e-8&&Math.abs(b.rotation[3]-1)<1e-8);
 }
 await region('leg');await page.locator('#homeBtn').click();await page.locator('[data-select="talus"]').click();await settle();
 await region('ankle');check('Ankle focus retains complete bones without shortening',(await state()).visible===30);await page.screenshot({path:path.join(out,label+'-03-ankle-focus.png')});
 await page.locator('#neighborsBtn').click();check('Talus neighbor list includes tibia and fibula',(await page.locator('#neighbors').innerText()).includes('胫骨')&&(await page.locator('#neighbors').innerText()).includes('腓骨'));await page.locator('#neighborsBtn').click();
 await region('leg');await page.locator('#explode').evaluate(e=>{e.value=65;e.dispatchEvent(new Event('input',{bubbles:true}));});await settle();s=await state();check('Expansion separates all 30 structures',s.explode===65&&s.bones.every(b=>Math.hypot(...b.position.map((v,i)=>v-b.home[i]))>1));
 if(!s.labels)await page.locator('#labelsBtn').click();await settle();await page.waitForFunction(()=>document.querySelectorAll('.bone-label').length===30);check('All 30 individual labels created',await page.locator('.bone-label').count()===30);await page.screenshot({path:path.join(out,label+'-04-exploded.png')});
 await page.locator('#homeBtn').click();await settle();if((await state()).labels)await page.locator('#labelsBtn').click();
 await region('foot');await page.locator('[data-select="tibia"]').click();await settle();check('Selecting new bone from foot view reveals it',(await state()).region==='leg'&&(await state()).bones.find(b=>b.id==='tibia').visible);
 await region('leg');await page.locator('#homeBtn').click();await settle();await page.setViewportSize({width:1366,height:768});await settle();check('No laptop horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:path.join(out,label+'-05-laptop.png')});
 await page.locator('#helpBtn').click();check('Existing help still opens',await page.locator('#helpDialog').isVisible());await page.locator('#helpDialog [data-close]').last().click();await page.locator('#footerSource').click();check('Source and limits dialog opens',await page.locator('#sourceDialog').isVisible());await page.locator('#sourceDialog [data-close]').click();
 const download=page.waitForEvent('download');await page.locator('#captureBtn').click();await(await download).saveAs(path.join(out,label+'-capture.png'));check('View capture works',fs.statSync(path.join(out,label+'-capture.png')).size>5000);
 check('No browser or shader errors',errors.length===0,errors);
 fs.writeFileSync(path.join(out,label+'-report.json'),JSON.stringify({success:true,checkedAt:new Date().toISOString(),checks,errors,requests,browser:engine===webkit?'webkit':'chromium',url:live||'offline embedded HTML'},null,2));
 console.log('VERIFIED',label,checks.length);
}catch(e){errors.push(String(e));console.error(e);if(page)try{await page.screenshot({path:path.join(out,label+'-failure.png')});}catch{}fs.writeFileSync(path.join(out,label+'-report.json'),JSON.stringify({success:false,checks,errors,requests},null,2));process.exitCode=1;}finally{if(browser)await browser.close();}})();
