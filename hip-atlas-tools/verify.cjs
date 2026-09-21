'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert'),crypto=require('crypto'),cp=require('child_process');
const {chromium,webkit}=require('playwright');
const base=path.resolve(__dirname,'../hip-atlas'),out=path.join(base,'qa');fs.mkdirSync(out,{recursive:true});
const browserName=process.env.BROWSER||'chromium',mode=process.env.LIVE_URL?'live':browserName==='webkit'?'webkit':'offline';
const url=process.env.LIVE_URL||'file://'+path.join(base,'index.html');
const meta=JSON.parse(fs.readFileSync(path.join(base,'assets/provenance.json'))),expectedHash=crypto.createHash('sha256').update(fs.readFileSync(path.join(base,'index.html'))).digest('hex');
const report={startedAt:new Date().toISOString(),browser:browserName,url,htmlSHA256:expectedHash,success:false,checks:[],errors:[],requests:[]};
const check=(name,pass,detail)=>{report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});assert(pass,name);console.log('PASS',name);};
(async()=>{let browser,page;try{
 browser=await (browserName==='webkit'?webkit:chromium).launch({headless:true,...(browserName==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{})});
 report.browserVersion=browser.version();
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});
 if(mode!=='live')await context.route(/^https?:/,r=>r.abort());
 page=await context.newPage();page.setDefaultTimeout(60000);
 page.on('pageerror',e=>report.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('request',r=>{if(/^https?:/.test(r.url()))report.requests.push(r.url());});
 const response=await page.goto(url,{waitUntil:'load',timeout:90000});
 if(mode==='live'){check('Published URL returns HTTP 200',response.status()===200);check('Published HTML equals tested artifact',crypto.createHash('sha256').update(await response.body()).digest('hex')===expectedHash);}
 await page.waitForFunction(()=>window.__FOOT_ATLAS__?.getState().ready,undefined,{timeout:90000});
 const state=()=>page.evaluate(()=>window.__FOOT_ATLAS__.getState());
 const frame=()=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const settle=async()=>{await page.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating);await frame();};
 const click=async selector=>{await page.locator(selector).click();await settle();};
 const region=async r=>{await click('[data-region="'+r+'"]');};
 const view=async v=>{await click('[data-view="'+v+'"]');};
 const select=async id=>{await click('[data-select="'+id+'"]');};
 const capture=async name=>{await settle();await page.screenshot({path:path.join(out,mode+'-'+name+'.png')});};
 let s=await state();check('All 36 separate bones loaded',s.count===36&&s.visible===36);check('Source triangles preserved',s.bones.reduce((n,b)=>n+b.triangles,0)===meta.totalTriangles);check('Original 32 mesh coordinates and face indices preserved',meta.approvedKneePreserved&&meta.maxPriorCoordinateErrorMillimeters===0);check('Initial scope includes whole pelvis and right leg',s.region==='pelvic-limb');
 check('No external anatomy or renderer downloads',report.requests.length===(mode==='live'?1:0),report.requests);
 const unchanged=cp.execFileSync('git',['diff',meta.baseRef,'--','foot-atlas/','ankle-atlas/','knee-atlas/'],{cwd:path.dirname(base),encoding:'utf8'});check('All three approved atlas directories unchanged',unchanged==='');
 await capture('01-pelvis-and-limb');
 const regions={foot:28,ankle:30,leg:30,knee:4,whole:32,hip:2,pelvis:4,'pelvic-limb':36};
 for(const [r,count]of Object.entries(regions)){await region(r);s=await state();check('Correct visible bones in scope '+r,s.visible===count,{visible:s.visible});check('Finite camera and target in '+r,[...s.camera,...s.target].every(Number.isFinite));if(['hip','pelvis','foot','knee'].includes(r))await capture('region-'+r);}
 await region('pelvis');check('Pelvic scope contains four adult bones only',(await state()).bones.filter(b=>b.visible).map(b=>b.id).sort().join(',')==='coccyx,hip-left,hip-right,sacrum');
 check('No false separate adult ilium pubis ischium entries',await page.locator('[data-select="ilium"],[data-select="pubis"],[data-select="ischium"]').count()===0);
 await select('hip-left');check('Left limb not yet added is explained',(await page.locator('#description').innerText()).includes('尚未加入左股骨'));
 await select('sacrum');check('Sacrum name has correct pronunciation',(await page.locator('#detailTitle').innerText()).includes('dǐ gǔ'));
 await select('hip-right');check('Hip right lists femur and pelvic neighbors',(await page.locator('#neighbors').innerText()).includes('股骨')&&(await page.locator('#neighbors').innerText()).includes('骶骨'));
 await view('front');s=await state();check('Anterior pelvic view is from front',s.camera[2]>s.target[2]);await capture('02-pelvis-front');
 await view('back');s=await state();check('Posterior pelvic view is from back',s.camera[2]<s.target[2]);await capture('03-pelvis-back');
 await view('medial');check('Bilateral scope uses patient left/right rather than foot labels',(await page.locator('[data-view="medial"]').innerText())==='左面');
 if(browserName==='webkit'){
  for(const id of ['hip-right','hip-left','sacrum','coccyx']){await region('pelvis');await select(id);check('WebKit identifies '+id,(await state()).selected===id);await click('#isolateBtn');check('WebKit isolates '+id,(await state()).visible===1);await page.keyboard.press('Escape');await settle();}
  check('No WebKit rendering or script errors',report.errors.length===0,report.errors);
 }else{
  await region('pelvic-limb');
  for(const bone of (await state()).bones){await select(bone.id);check('Chinese identification '+bone.id,(await state()).selected===bone.id&&(await page.locator('#description').innerText()).trim().length>5);}
  for(const [q,id,n]of [['髋','hip-right',2],['di gu','sacrum',1],['weigu','coccyx',1],['髌','patella',1],['fei','fibula',1]]){await page.locator('#search').fill(q);check('Search '+q,await page.locator('.bone-row:visible').count()===n);await page.locator('#search').fill('');}
  const getPoint=async id=>{for(const v of ['overview','front','back','lateral','medial']){await view(v);const pt=await page.evaluate(id=>window.__FOOT_ATLAS__.getPickPoint(id),id);if(pt)return pt;}return null;};
  const drag=async(id,mode,dx=70,dy=-25)=>{await click('[data-mode="'+mode+'"]');const pt=await page.evaluate(id=>window.__FOOT_ATLAS__.getPickPoint(id),id);check('Visible actual mouse target '+id+'/'+mode,!!pt);await page.mouse.move(pt.x,pt.y);await page.mouse.down();await page.mouse.move(pt.x+dx,pt.y+dy,{steps:6});await page.mouse.up();await settle();};
  for(const [id,r]of [['talus','foot'],['tibia','leg'],['patella','knee'],['femur','whole'],['hip-right','pelvis'],['hip-left','pelvis'],['sacrum','pelvis'],['coccyx','pelvis']]){
   await region(r);await click('#homeBtn');await select(id);const pt=await getPoint(id);check('Bone is pickable in assembled scope '+id,!!pt);await page.mouse.click(pt.x,pt.y);await settle();check('Actual mouse identifies '+id,(await state()).selected===id);
   const before=await state();await drag(id,'move');s=await state();check('Dragging moves only '+id,s.bones.filter(b=>Math.hypot(...b.offset)>.1).length===1&&Math.hypot(...s.bones.find(b=>b.id===id).offset)>1);check('Bone drag does not orbit '+id,Math.hypot(...s.camera.map((x,i)=>x-before.camera[i]))<.1);
   if(id==='hip-right'||id==='sacrum'){await click('#ghostBtn');check('Original reference enabled '+id,(await state()).ghost);await capture(id+'-separated');await click('#ghostBtn');}
   await click('#resetBonesBtn');await drag(id,'rotate',38,24);s=await state();check('Independent bone rotation '+id,Math.abs(s.bones.find(b=>b.id===id).rotation[3]-1)>.001);
   await click('#resetSelectedBtn');s=await state();check('Individual exact reset '+id,s.bones.every(b=>Math.hypot(...b.position.map((v,i)=>v-b.home[i]))<1e-7&&Math.abs(b.rotation[3]-1)<1e-7));
   await click('#isolateBtn');check('Single bone inspection '+id,(await state()).visible===1&&(await state()).isolated);if(['hip-right','sacrum','coccyx'].includes(id))await capture(id+'-single');await page.keyboard.press('Escape');await settle();check('Escape restores scope '+id,(await state()).visible===regions[r]);
  }
  await region('hip');await click('#homeBtn');await select('femur');check('Hip joint scope includes original complete femur and right hip',(await state()).bones.filter(b=>b.visible).map(b=>b.id).sort().join(',')==='femur,hip-right');check('Femur links to the new right hip',(await page.locator('#neighbors').innerText()).includes('右髋骨'));
  await click('#neighborsBtn');check('Neighbor emphasis kept',(await state()).neighbors);await click('#neighborsBtn');await click('#hideSelectedBtn');check('Hide selected bone works',(await state()).visible===1);await click('#showAllBtn');check('Show all respects hip scope',(await state()).visible===2);
  for(const r of ['foot','knee','pelvis','pelvic-limb']){await region(r);await click('#homeBtn');await page.locator('#explode').evaluate(el=>{el.value='55';el.dispatchEvent(new Event('input',{bubbles:true}));});await settle();s=await state();check('All visible bones separate in '+r,s.explode===55&&s.bones.filter(b=>b.visible).every(b=>Math.hypot(...b.position.map((x,i)=>x-b.home[i]))>.1));if(!s.labels)await click('#labelsBtn');check('Correct label count '+r,await page.locator('.bone-label').count()===regions[r]);if(r==='pelvis')await capture('04-pelvis-exploded');if(r==='pelvic-limb')await capture('05-whole-exploded');await click('#labelsBtn');}
  await click('#homeBtn');await region('pelvis');await select('hip-right');await click('#colorBtn');check('Group colors enabled',(await state()).colors);await click('#colorBtn');
  await region('foot');await select('sacrum');check('Pelvic bone selection switches to pelvis',(await state()).region==='pelvis'&&(await state()).selected==='sacrum');await select('femur');check('Femur selection from pelvis switches to right hip',(await state()).region==='hip');await select('talus');check('Foot selection restores foot scope',(await state()).region==='foot');
  for(const [v,axis,sign]of [['plantar',1,-1],['medial',0,1],['lateral',0,-1]]){await view(v);s=await state();check('Original foot standard view '+v,(s.camera[axis]-s.target[axis])*sign>0);}
  await region('pelvis');await page.setViewportSize({width:1366,height:768});await settle();check('Laptop layout no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await capture('06-laptop-pelvis');
  await click('#helpBtn');check('Original help dialog opens',await page.locator('#helpDialog').isVisible());await page.locator('#helpDialog [data-close]').last().click();await click('#sourceBtn');check('Source dialog describes lumbar and left-leg limits',(await page.locator('#sourceDialog').innerText()).includes('腰椎、左下肢'));await page.locator('#sourceDialog [data-close]').click();
  const dlPromise=page.waitForEvent('download');await page.locator('#captureBtn').click();const dl=await dlPromise;await dl.saveAs(path.join(out,mode+'-capture.png'));check('Screenshot export works',fs.statSync(path.join(out,mode+'-capture.png')).size>5000);
  check('No browser or shader errors',report.errors.length===0,report.errors);
 }
 report.success=true;
}catch(e){report.failure=String(e);report.errors.push(String(e));console.error(e);if(page){try{report.visibleError=await page.locator('#loading').innerText();await page.screenshot({path:path.join(out,mode+'-failure.png'),timeout:20000});}catch{}}process.exitCode=1;
}finally{report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,mode+'-report.json'),JSON.stringify(report,null,2));console.log('RESULT',mode,report.success,report.checks.length);if(browser)await browser.close();}})();
