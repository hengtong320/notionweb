'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {chromium,webkit}=require('playwright');
const base=__dirname,out=path.join(base,'qa');fs.mkdirSync(out,{recursive:true});
const publicURL='https://hengtong320.github.io/notionweb/foot-atlas/';
const report={startedAt:new Date().toISOString(),publicURL,cases:[],success:false};
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
const localHash=hash(fs.readFileSync(path.join(base,'index.html')));
function check(test,name,pass,detail){test.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});if(!pass)throw new Error(name+(detail===undefined?'':': '+JSON.stringify(detail)));console.log('PASS',test.name,name);}
async function testBrowser(name,engine,url,{offline=false,optional=false}={}){
 const test={name,url,optional,checks:[],errors:[],requests:[]};report.cases.push(test);let browser,page;
 try{
  browser=await engine.launch({headless:true,...(engine===chromium?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']}:{})});
  const context=await browser.newContext({viewport:{width:1440,height:960},deviceScaleFactor:1,serviceWorkers:'block'});
  if(offline)await context.route('**/*',route=>/^https?:/.test(route.request().url())?route.abort():route.continue());
  page=await context.newPage();page.setDefaultTimeout(20000);
  page.on('pageerror',error=>test.errors.push(String(error)));
  page.on('request',req=>{if(/^https?:/.test(req.url()))test.requests.push(req.url());});
  const started=Date.now();const response=await page.goto(url,{waitUntil:'load',timeout:90000});
  if(/^https?:/.test(url)){
   check(test,'Published page returns HTTP 200',response.status()===200,response.status());
   const body=await response.body();test.htmlBytes=body.length;test.sha256=hash(body);
   check(test,'Live page exactly matches the complete repository build',test.sha256===localHash,{expected:localHash,actual:test.sha256});
   check(test,'HTML contains embedded model and renderer',body.includes(Buffer.from('FOOT_ATLAS_EMBEDDED'))&&body.length>1000000,body.length);
  }
  await page.waitForFunction(()=>window.__FOOT_ATLAS__?.getState().ready,undefined,{timeout:45000});
  await page.waitForTimeout(1000);test.readyMilliseconds=Date.now()-started;
  let state=await page.evaluate(()=>window.__FOOT_ATLAS__.getState());
  check(test,'All 28 separate bones actually instantiated',state.count===28&&state.visible===28,{count:state.count,visible:state.visible});
  check(test,'All source triangles present',state.bones.reduce((s,b)=>s+b.triangles,0)===16586);
  check(test,'No secondary network fetches for engine or anatomy',test.requests.length===(offline?0:1),test.requests);
  check(test,'Loading mask closes',await page.locator('#loading').evaluate(el=>el.classList.contains('done')));
  await page.screenshot({path:path.join(out,name+'-overview.png')});
  for(const b of state.bones){
   await page.locator('[data-select="'+b.id+'"]').click();
   const selected=await page.evaluate(()=>window.__FOOT_ATLAS__.getState().selected);
   check(test,'Chinese identification: '+b.id,selected===b.id&&(await page.locator('#description').innerText()).trim().length>4);
  }
  await page.locator('#homeBtn').click();await page.waitForTimeout(1000);
  await page.locator('[data-view="dorsal"]').click();await page.waitForTimeout(1000);
  let pt=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('talus'));
  check(test,'Real mesh raycast has a visible pickable surface',!!pt);
  await page.mouse.click(pt.x,pt.y);check(test,'Mouse click identifies talus',(await page.evaluate(()=>window.__FOOT_ATLAS__.getState())).selected==='talus');
  await page.locator('[data-mode="move"]').click();
  pt=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('talus'));
  await page.mouse.move(pt.x,pt.y);await page.mouse.down();await page.mouse.move(pt.x+65,pt.y-28,{steps:8});await page.mouse.up();
  state=await page.evaluate(()=>window.__FOOT_ATLAS__.getState());
  check(test,'Dragging separates exactly one bone',state.bones.filter(b=>Math.hypot(...b.offset)>.1).length===1);
  await page.locator('#resetBonesBtn').click();await page.waitForTimeout(1000);
  state=await page.evaluate(()=>window.__FOOT_ATLAS__.getState());
  check(test,'Reset restores all original coordinates',state.bones.every(b=>Math.hypot(...b.position.map((v,i)=>v-b.home[i]))<1e-8));
  await page.locator('#isolateBtn').click();await page.waitForTimeout(1000);
  check(test,'Single-bone study shows one bone',(await page.evaluate(()=>window.__FOOT_ATLAS__.getState())).visible===1);
  await page.screenshot({path:path.join(out,name+'-single-bone.png')});
  await page.keyboard.press('Escape');await page.waitForTimeout(1000);
  await page.locator('#explode').evaluate(el=>{el.value='60';el.dispatchEvent(new Event('input',{bubbles:true}));});await page.waitForTimeout(1000);
  check(test,'Whole-foot separation slider works',(await page.evaluate(()=>window.__FOOT_ATLAS__.getState())).explode===60);
  await page.screenshot({path:path.join(out,name+'-exploded.png')});
  await page.locator('#homeBtn').click();await page.waitForTimeout(1000);
  await page.locator('[data-view="plantar"]').click();await page.waitForTimeout(1000);
  state=await page.evaluate(()=>window.__FOOT_ATLAS__.getState());
  check(test,'Plantar view points from below',state.camera[1]<state.target[1]);
  await page.setViewportSize({width:1366,height:768});await page.waitForTimeout(500);
  check(test,'1366px laptop viewport has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:path.join(out,name+'-laptop.png')});
  check(test,'No uncaught script errors',test.errors.length===0,test.errors);
  test.success=true;
 }catch(error){test.success=false;test.failure=String(error);console.error(name,error);if(page){try{test.visibleMessage=await page.locator('#loading').innerText();await page.screenshot({path:path.join(out,name+'-failure.png'),timeout:10000});}catch{}}}
 finally{if(browser)await browser.close();}
}
async function testDisabledWebGL(){let browser;const test={name:'webgl-disabled-diagnostic',checks:[]};report.cases.push(test);try{
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-webgl']});const page=await browser.newPage();
 await page.goto('file://'+path.join(base,'index.html'));await page.waitForTimeout(1500);
 const title=await page.locator('#loadingTitle').innerText(),detail=await page.locator('#loadingDetail').innerText();
 check(test,'Unsupported WebGL displays a visible explanation rather than empty bones',title.includes('未能打开')&&detail.includes('硬件加速'),{title,detail});test.success=true;
}catch(e){test.success=false;test.failure=String(e);}finally{if(browser)await browser.close();}}
(async()=>{try{
 await testBrowser('chromium-live',chromium,publicURL+'?delivery=20260921');
 await testBrowser('chromium-offline',chromium,'file://'+path.join(base,'index.html'),{offline:true});
 await testBrowser('webkit-offline',webkit,'file://'+path.join(base,'index.html'),{offline:true,optional:true});
 await testDisabledWebGL();
 report.success=report.cases.filter(c=>!c.optional).every(c=>c.success);
 report.finishedAt=new Date().toISOString();
 fs.writeFileSync(path.join(out,'delivery-report.json'),JSON.stringify(report,null,2));
 console.log('DELIVERY_RESULT',JSON.stringify({success:report.success,cases:report.cases.map(c=>({name:c.name,success:c.success,checks:c.checks.length,failure:c.failure,readyMilliseconds:c.readyMilliseconds}))}));
 if(!report.success)process.exitCode=1;
}catch(e){report.failure=String(e);fs.writeFileSync(path.join(out,'delivery-report.json'),JSON.stringify(report,null,2));throw e;}})();
