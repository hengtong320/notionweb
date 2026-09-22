'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {chromium,webkit}=require('playwright');
const root=path.resolve('fullbody-tcm-v4'),out=path.join(root,'qa-v4');fs.mkdirSync(out,{recursive:true});
const url=process.env.ATLAS_URL||'http://127.0.0.1:8765/fullbody-tcm-v4/';const type=process.env.ATLAS_BROWSER||'chromium';
const report={url,browser:type,startedAt:new Date().toISOString(),checks:[],errors:[],success:false};
function check(name,pass,detail){report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});console.log(pass?'PASS':'FAIL',name);if(!pass)throw Error(name+': '+JSON.stringify(detail));}
let browser,page;
async function settle(){await page.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating);await page.waitForTimeout(250);}
(async()=>{try{
 browser=await(type==='webkit'?webkit:chromium).launch({headless:true,...(type==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']}:{})});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{try{localStorage.setItem('atlas-auto-speak','0');}catch{}});
 page=await ctx.newPage();page.setDefaultTimeout(120000);const network=[];
 page.on('pageerror',e=>report.errors.push(String(e)));
 page.on('console',msg=>{if(msg.type()==='error'&&/shader|WebGLProgram|THREE.ERROR/.test(msg.text()))report.errors.push(msg.text());});
 page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
 const response=await page.goto(url,{waitUntil:'load',timeout:120000});check('Webpage HTTP 200',response.status()===200,response.status());
 const bytes=await response.body();const expected=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'index.html'))).digest('hex');
 check('Online HTML matches tested V4 build',crypto.createHash('sha256').update(bytes).digest('hex')===expected);report.htmlSHA256=expected;
 await page.waitForFunction(()=>window.__FOOT_ATLAS__?.getState().ready&&window.__ATLAS_TISSUES__&&window.__ATLAS_SPEECH__);await settle();
 let s=await page.evaluate(()=>window.__FOOT_ATLAS__.getState());check('210 original bones loaded',s.count===210,s.count);check('Cursor zoom enabled',s.zoomToCursor===true);
 check('Bone pinyin retained',await page.evaluate(()=>window.__FOOT_ATLAS__.getCatalog().every(b=>!!b.pinyin)));
 const original=await page.locator('.control-dock').boundingBox();await page.locator('#dockToggle').click();let short=await page.locator('.control-dock').boundingBox();check('Dock folds and releases viewing space',short.height<original.height-30,{original:original.height,folded:short.height});await page.locator('#dockToggle').click();
 await page.locator('#tcmBtn').click();await page.locator('#pairHeart').click();await settle();
 let l=await page.evaluate(()=>window.__ATLAS_LEARNING__.getState());check('Heart and small intestine channels displayed together',l.enabled&&l.selectedMeridians.includes('HT')&&l.selectedMeridians.includes('SI'),l);
 check('Old equal-spacing point algorithm removed',l.legacyEqualSpacingRemoved===true&&l.clinicalCalibration===false);
 await page.locator('#tcmClose').click();check('Closing settings keeps layer',await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().enabled));
 await page.evaluate(()=>window.__ATLAS_LEARNING__.setMeridians(['LU','LI','HT']));check('Three channels independently selected',(await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedMeridians.length))===3);
 const unknown=await page.evaluate(()=>window.__ATLAS_LEARNING__.getReferences().find(p=>!p.mapped&&p.code.startsWith('LI'))?.code);
 await page.evaluate(code=>window.__ATLAS_LEARNING__.selectPoint(code,'right',false),unknown);
 check('Unmapped point has no invented 3D coordinate',await page.evaluate(code=>window.__ATLAS_LEARNING__.getPointScreen(code,'right')===null,unknown));
 check('Missing position is visibly disclosed',(await page.locator('#tcmPointCard').innerText()).includes('不生成假坐标'));
 await page.locator('#tcmLayerToggle').click();
 await page.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('lumbar');window.__FOOT_ATLAS__.setExplode(100);});await settle();
 s=await page.evaluate(()=>window.__FOOT_ATLAS__.getState());let lumbar=s.bones.filter(b=>/^L[1-5]$/.test(b.id));check('Lumbar bones separate vertically',lumbar.every(b=>Math.abs(b.position[0]-b.home[0])<1e-6&&Math.abs(b.position[2]-b.home[2])<1e-6));
 await page.evaluate(()=>window.__FOOT_ATLAS__.reset());await settle();check('All bones return to original positions',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.every(b=>b.position.every((v,i)=>Math.abs(v-b.home[i])<1e-6))));
 if(type==='chromium'){
  await page.evaluate(()=>window.__FOOT_ATLAS__.setRegion('lumbar'));await settle();
  let p=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('L3'));check('Lumbar actual mouse pick available',!!p,p);
  await page.mouse.click(p.x,p.y);check('Real bone click selects L3',(await page.evaluate(()=>window.__FOOT_ATLAS__.getState().selected))==='L3');
  await page.evaluate(()=>window.__FOOT_ATLAS__.setMode('move'));p=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('L3'));
  await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+55,p.y+15,{steps:8});await page.mouse.up();check('Original single-bone drag works',await page.evaluate(()=>Math.hypot(...window.__FOOT_ATLAS__.getState().bones.find(b=>b.id==='L3').offset)>1));
  await page.evaluate(()=>window.__FOOT_ATLAS__.reset());await settle();
  p=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('L3'));let before=await page.evaluate(()=>window.__FOOT_ATLAS__.getState().camera);await page.mouse.move(p.x,p.y);await page.mouse.wheel(0,-160);await page.waitForTimeout(500);let after=await page.evaluate(()=>window.__FOOT_ATLAS__.getState().camera);check('Wheel zoom changes camera toward cursor',after.some((v,i)=>Math.abs(v-before[i])>1));
 }
 await page.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('thorax');window.__FOOT_ATLAS__.setView('front');});await settle();
 await page.locator('#layersTab').click();await page.locator('#muscularOn').check();
 await page.waitForFunction(()=>{const s=window.__ATLAS_TISSUES__.getState().systems.muscular;return s.loaded||!s.loading;});
 let t=await page.evaluate(()=>window.__ATLAS_TISSUES__.getState());check('Real muscle GLB decoded and visible',t.systems.muscular.loaded&&t.systems.muscular.count===683&&t.systems.muscular.visible>0,t.systems.muscular);
 await page.locator('#muscularOpacity').evaluate(el=>{el.value='45';el.dispatchEvent(new Event('input',{bubbles:true}));});await page.waitForTimeout(300);check('Muscle opacity control works',(await page.evaluate(()=>window.__ATLAS_TISSUES__.getState().systems.muscular.opacity))===.45);
 await page.screenshot({path:path.join(out,type+'-chest-muscles.png')});
 if(type==='chromium'){
  await page.locator('#nervousOn').check();await page.waitForFunction(()=>{const s=window.__ATLAS_TISSUES__.getState().systems.nervous;return s.loaded||!s.loading;});
  t=await page.evaluate(()=>window.__ATLAS_TISSUES__.getState());check('Real nervous GLB decoded',t.systems.nervous.loaded&&t.systems.nervous.count===550,t.systems.nervous);
  await page.evaluate(()=>window.__FOOT_ATLAS__.setRegion('body'));await settle();
  t=await page.evaluate(()=>window.__ATLAS_TISSUES__.getState());check('Muscles and nerves can be superimposed',t.systems.muscular.on&&t.systems.nervous.on&&t.systems.nervous.visible>0);
  await page.screenshot({path:path.join(out,'v4-muscles-nerves.png')});
  const muscle=await page.evaluate(()=>window.__ATLAS_TISSUES__.getCatalog().find(n=>n.en.toLowerCase().includes('pectoralis major')));
  check('Chinese tissue labels present',!!muscle?.name,muscle?.name);
  await page.evaluate(id=>window.__ATLAS_TISSUES__.choose(id,true),muscle.id);await settle();check('Tissue detail selects correct name',(await page.locator('#tissueDetail').innerText()).includes(muscle.name));
  await page.locator('#tissueIsolate').click();check('Single tissue isolation works',(await page.evaluate(()=>window.__ATLAS_TISSUES__.getState().isolated))===true);
  await page.evaluate(()=>window.__ATLAS_TISSUES__.clearSelection());
  await page.locator('#layersTab').click();await page.locator('#voiceSample').click();
  await page.waitForFunction(()=>window.__ATLAS_SPEECH__.getState().currentTime>0.05,{},{timeout:20000});
  let audio=await page.evaluate(()=>window.__ATLAS_SPEECH__.getState());check('Neural Mandarin audio is actually playing',audio.lastEngine.includes('Kokoro')&&audio.currentTime>0,audio);
  await page.locator('#voiceStop').click();check('Audio stop works',!(await page.evaluate(()=>window.__ATLAS_SPEECH__.getState().playing)));
  await page.evaluate(()=>window.__FOOT_ATLAS__.setExplode(30));await page.waitForTimeout(300);t=await page.evaluate(()=>window.__ATLAS_TISSUES__.getState());check('Tissue overlay pauses during bone separation',t.displaced===true&&t.systems.muscular.visible===0);check('Point layer pauses with displaced bones',(await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().suspended))===true);
  await page.evaluate(()=>window.__FOOT_ATLAS__.reset());await settle();check('Original tissue overlay resumes after reset',(await page.evaluate(()=>window.__ATLAS_TISSUES__.getState().systems.muscular.visible))>0);
  await page.evaluate(()=>{window.__ATLAS_TISSUES__.enable('muscular',false);window.__ATLAS_TISSUES__.enable('nervous',false);window.__ATLAS_LEARNING__.setMeridians(['HT','SI']);window.__ATLAS_LEARNING__.toggleTCM(true);window.__ATLAS_LEARNING__.fitMeridian();window.__ATLAS_LEARNING__.setPanel(true);});await settle();
  await page.screenshot({path:path.join(out,'v4-heart-small-intestine.png')});
 }
 check('No horizontal overflow on desktop',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 const external=network.filter(u=>new URL(u).origin!==new URL(url).origin);check('No external model, decoder or voice CDN requests',external.length===0,external);
 await ctx.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});page=await mobile.newPage();page.setDefaultTimeout(90000);page.on('pageerror',e=>report.errors.push(String(e)));
 await page.goto(url,{waitUntil:'load',timeout:120000});await page.waitForFunction(()=>window.__ATLAS_TISSUES__&&window.__FOOT_ATLAS__.getState().ready);await settle();
 check('Phone has usable 3D viewport',await page.locator('#viewport').evaluate(el=>el.clientWidth>=350&&el.clientHeight>500));check('Dock starts collapsed on phone',(await page.evaluate(()=>window.__FOOT_ATLAS__.getState().dockCollapsed))===true);
 await page.locator('#openNav').tap();await page.locator('#layersTab').tap();check('Phone exposes tissue controls',await page.locator('#muscularOn').isVisible());await page.locator('#closeNav').tap();
 await page.screenshot({path:path.join(out,type+'-phone.png')});check('No phone horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await mobile.close();
 check('No uncaught JavaScript or shader errors',report.errors.length===0,report.errors);report.success=true;
 }catch(e){report.failure=String(e);console.error(e);if(page&&!page.isClosed()){try{report.visibleError=await page.locator('#loading').innerText();await page.screenshot({path:path.join(out,'failure-'+type+'.png'),timeout:15000});}catch{}}process.exitCode=1;
 }finally{if(browser)await browser.close();report.finishedAt=new Date().toISOString();const name=(url.includes('127.0.0.1')?'local-':'live-')+type+'.json';fs.writeFileSync(path.join(out,name),JSON.stringify(report,null,2));console.log(JSON.stringify({success:report.success,checks:report.checks.length,failure:report.failure}));}
})();
