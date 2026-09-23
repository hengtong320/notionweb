'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const {chromium,webkit}=require('playwright');
const root=path.resolve('fullbody-tcm-v6'),out=path.join(root,'checks');fs.mkdirSync(out,{recursive:true});
const mode=process.env.BROWSER||'chromium',live=!!process.env.LIVE_URL;
const report={startedAt:new Date().toISOString(),browser:mode,type:'browser-functional-navigation-not-clinical-validation',success:false,checks:[],pointChecks:[],errors:[]};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function check(name,pass,detail){report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});console.log(pass?'PASS':'FAIL',name);if(!pass)throw Error(name+': '+JSON.stringify(detail));}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.glb':'model/gltf-binary','.mp3':'audio/mpeg','.txt':'text/plain'};
const server=http.createServer((req,res)=>{try{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(f===root)f=path.join(root,'index.html');if(!f.startsWith(root+path.sep)||!fs.statSync(f).isFile())throw Error('not a file');res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);}catch{res.writeHead(404);res.end();}});
async function settle(page){await page.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating,null,{timeout:45000});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
async function shot(page,name){if(!live)await page.screenshot({path:path.join(out,mode+'-'+name+'.png'),timeout:45000});}
async function focusResult(page,code,side){return page.evaluate(({code,side})=>{const a=window.__FOOT_ATLAS__,l=window.__ATLAS_LEARNING__,p=l.getNavigationCatalog().find(p=>p.code===code&&p.side===side),s=a.getState(),v=l.getPointScreen(code,side),r=document.getElementById('viewport').getBoundingClientRect();return {selected:l.getState().selectedPoint,target:s.target,position:p?.position,camera:s.camera,inView:!!v&&v.z> -1&&v.z<1&&v.x>r.left&&v.x<r.right&&v.y>r.top&&v.y<r.bottom,centerError:p?Math.hypot(...s.target.map((x,i)=>x-p.position[i])):9999};},{code,side});}
(async()=>{let browser,page;try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=process.env.LIVE_URL||'http://127.0.0.1:'+server.address().port+'/';report.url=url;
 const response=await fetch(url);check('Webpage HTTP 200',response.status===200);const data=Buffer.from(await response.arrayBuffer());report.htmlSHA256=hash(data);check('Public or served build matches exact tested bytes',report.htmlSHA256===hash(fs.readFileSync(path.join(root,'index.html'))));
 browser=await (mode==='webkit'?webkit:chromium).launch({headless:true,...(mode==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{})});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{try{localStorage.setItem('atlas-auto-speak','0');}catch{}});
 page=await ctx.newPage();page.setDefaultTimeout(30000);page.on('pageerror',e=>report.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error'&&!/favicon|404/.test(m.text()))report.errors.push(m.text());});
 const requests=[];page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 await page.goto(url,{waitUntil:'load',timeout:90000});await page.waitForFunction(()=>window.__FOOT_ATLAS__?.getState().ready&&window.__ATLAS_LEARNING__?.getNavigationCatalog,null,{timeout:90000});await settle(page);
 check('V6 application loaded',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().version==='6.0'));
 check('210 original bone meshes remain',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().count===210));
 check('Original bone geometry retained',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.reduce((n,b)=>n+b.triangles,0)===534003));
 const catalog=await page.evaluate(()=>window.__ATLAS_LEARNING__.getNavigationCatalog());
 check('All 361 classical names have individual navigation references',new Set(catalog.map(p=>p.code)).size===361);
 check('670 bilateral and midline navigation markers instantiated',catalog.length===670,catalog.length);
 const coverage=JSON.parse(fs.readFileSync(path.join(root,'meridian-reference-coverage.json')));
 for(const [id,count] of Object.entries(coverage.channels)){
  await page.evaluate(id=>{const l=window.__ATLAS_LEARNING__;l.setMeridian(id);l.setTCMSide('both');l.toggleTCM(true);l.fitMeridian();},id);await settle(page);
  const stats=await page.evaluate(id=>{const l=window.__ATLAS_LEARNING__,s=l.getState(),r=document.getElementById('viewport').getBoundingClientRect();return {routes:s.routeDiagnostics,points:s.visiblePoints,allInView:l.getNavigationCatalog().filter(p=>p.code.replace(/\d+$/,'')===id).every(p=>{const v=l.getPointScreen(p.code,p.side);return v&&v.z> -1&&v.z<1&&v.x>=r.left&&v.x<=r.right&&v.y>=r.top&&v.y<=r.bottom;})};},id);
  const expected=count*(['GV','CV'].includes(id)?1:2);
  check(id+' complete channel can be framed',stats.points===expected&&stats.allInView&&stats.routes.every(r=>r.visible&&r.guideVertices>1),stats);
 }
 await page.evaluate(()=>{const l=window.__ATLAS_LEARNING__;l.setMeridian('KI');l.setTCMSide('right');l.fitMeridian();});await settle(page);await page.waitForTimeout(180);
 check('Kidney channel includes 27 labels from foot to chest',await page.evaluate(()=>{const c=window.__ATLAS_LEARNING__.getNavigationCatalog().filter(p=>/^KI\d+$/.test(p.code)&&p.side==='right');return c.length===27&&c.find(p=>p.code==='KI1').position[1]<0&&c.find(p=>p.code==='KI27').position[1]>1300;}));
 const totalPages=await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().labelStats.pages);const found=new Set();
 for(let i=0;i<totalPages;i++){
  await page.evaluate(i=>window.__ATLAS_LEARNING__.setLabelPage(i),i);await page.waitForTimeout(160);
  const names=await page.locator('[data-label-point]:visible').evaluateAll(els=>els.map(e=>e.dataset.labelPoint));names.forEach(n=>found.add(n));
 }
 check('Complete label pages expose all 27 kidney names',found.size===27,[...found]);await page.evaluate(()=>window.__ATLAS_LEARNING__.setLabelPage(0));await page.waitForTimeout(150);await shot(page,'kidney-full');
 const pointBatch=mode==='webkit'?catalog.filter(p=>['KI1','KI27','LI20','GV14','GV20','CV1','HT9','SI19','BL67','TE23'].includes(p.code)):catalog;
 for(let start=0;start<pointBatch.length;start+=20){
  const results=await page.evaluate(batch=>{const l=window.__ATLAS_LEARNING__,a=window.__FOOT_ATLAS__,r=document.getElementById('viewport').getBoundingClientRect();return batch.map(p=>{const ok=l.selectPoint(p.code,p.side,true),s=a.getState(),v=l.getPointScreen(p.code,p.side),sel=l.getState().selectedPoint;const error=Math.hypot(...s.target.map((x,i)=>x-p.position[i]));return {code:p.code,name:p.name,side:p.side,pass:!!ok&&sel?.code===p.code&&sel.side===p.side&&error<.001&&v.z> -1&&v.z<1&&v.x>r.left&&v.x<r.right&&v.y>r.top&&v.y<r.bottom,error};});},pointBatch.slice(start,start+20));
  report.pointChecks.push(...results);const bad=results.filter(r=>!r.pass);if(bad.length)check('Every requested point focuses itself',false,bad);
  await settle(page);console.log('FOCUS_CHECKED',report.pointChecks.length,'/',pointBatch.length);
 }
 check('All requested name-side targets focus correctly',report.pointChecks.length===pointBatch.length&&report.pointChecks.every(p=>p.pass),{tested:report.pointChecks.length});
 await page.evaluate(()=>{const l=window.__ATLAS_LEARNING__;l.setMeridian('KI');l.selectPoint('KI1','right',true);});await settle(page);
 let result=await focusResult(page,'KI1','right');check('Yongquan focus views sole from below',result.inView&&result.centerError<.001&&result.camera[1]<result.target[1],result);await shot(page,'sole-focus');
 await page.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('GV20','midline',true));await settle(page);
 result=await focusResult(page,'GV20','midline');check('Baihui focuses from above the head',result.inView&&result.camera[1]>result.target[1],result);
 await page.locator('#tcmBtn').click();await page.locator('#acupointSearch').fill('影像穴');
 check('Spoken-name alias resolves to Yingxiang',await page.locator('#acupointResults [data-point="LI20"]').count()===1);
 await page.locator('#acupointResults [data-point="LI20"]').click();await settle(page);
 result=await focusResult(page,'LI20','right');check('Real directory click focuses Yingxiang face region',result.centerError<.001&&result.inView&&result.camera[2]>result.target[2],result);await shot(page,'yingxiang-focus');
 await page.locator('#acupointSearch').fill('');await page.locator('#tcmClose').click();
 await page.evaluate(()=>{const l=window.__ATLAS_LEARNING__;l.setMeridian('KI');l.setTCMSide('right');l.fitMeridian();});await settle(page);await page.waitForTimeout(180);
 if(mode==='chromium'){
  const point=await page.evaluate(()=>window.__ATLAS_LEARNING__.getPointScreen('KI27','right'));
  await page.mouse.click(point.x,point.y);await settle(page);result=await focusResult(page,'KI27','right');
  check('Real 3D point click focuses its own target',result.selected?.code==='KI27'&&result.centerError<.001,result);
  await page.waitForTimeout(150);const label=page.locator('[data-label-point="KI27"][data-label-side="right"]:visible');check('Selected point name remains legible and clickable',await label.count()>0);
  await label.first().click();await settle(page);result=await focusResult(page,'KI27','right');check('Real label click focuses matching point',result.centerError<.001&&result.inView,result);
  await page.evaluate(()=>{const l=window.__ATLAS_LEARNING__;l.setMeridian('LU');l.setTCMSide('right');l.fitMeridian();l.selectPoint('LU1','right',false);});await settle(page);
  const p=await page.evaluate(()=>window.__ATLAS_LEARNING__.getPointScreen('LU5','right'));
  const before=await page.evaluate(()=>window.__FOOT_ATLAS__.getState().camera);
  await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+62,p.y+17,{steps:8});await page.mouse.up();await page.waitForTimeout(200);
  check('Dragging from a point still orbits without accidental focus',await page.evaluate(before=>{const a=window.__FOOT_ATLAS__.getState(),l=window.__ATLAS_LEARNING__.getState();return l.selectedPoint.code==='LU1'&&a.camera.some((v,i)=>Math.abs(v-before[i])>.01);},before));
 }
 await page.evaluate(()=>{const l=window.__ATLAS_LEARNING__;l.selectPoint('LI20','right',true);l.selectPoint('KI1','right',true);l.selectPoint('KI27','left',true);});await settle(page);
 result=await focusResult(page,'KI27','left');check('Rapid sequential clicks retain the final point and correct side',result.selected?.code==='KI27'&&result.selected.side==='left'&&result.centerError<.001,result);
 await page.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('lumbar');window.__FOOT_ATLAS__.setExplode(65,false);window.__ATLAS_LEARNING__.selectPoint('LI20','right',true);});await settle(page);
 check('Acupoint focus exits exploded local bone mode',await page.evaluate(()=>{const s=window.__FOOT_ATLAS__.getState();return s.explode===0&&s.region==='body'&&s.side==='both'&&s.visible===210;}));
 await page.evaluate(()=>{const l=window.__ATLAS_LEARNING__;l.setMeridians(['LU','LI','HT','SI']);l.setTCMSide('both');l.fitMeridian();});await settle(page);await page.waitForTimeout(180);
 check('Selecting four channels no longer hides all names',await page.locator('[data-label-point]:visible').count()>5);
 await page.locator('#tcmBtn').click();await page.locator('#tcmClose').click();check('Collapsing directory preserves points and routes',await page.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.enabled&&!s.panelOpen&&s.visiblePoints>0&&s.routeDiagnostics.some(r=>r.visible);}));
 await page.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('LI20','right',true));await settle(page);
 await page.setViewportSize({width:390,height:844});await settle(page);await page.waitForTimeout(200);
 result=await focusResult(page,'LI20','right');check('Resizing to phone preserves selected target instead of zooming out',result.centerError<.001&&result.inView,result);
 check('Phone has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await shot(page,'phone-focus');
 await page.setViewportSize({width:844,height:390});await settle(page);await page.waitForTimeout(150);
 result=await focusResult(page,'LI20','right');check('Phone landscape keeps focus',result.centerError<.001&&result.inView,result);
 await page.setViewportSize({width:1440,height:1000});await settle(page);
 await page.evaluate(()=>{window.__ATLAS_LEARNING__.setMeridian('GV');window.__ATLAS_LEARNING__.setTCMSide('both');window.__ATLAS_LEARNING__.fitMeridian();});await settle(page);await shot(page,'gv-full');
 const origin=new URL(url).origin;check('No third-party runtime model dependency',requests.every(u=>new URL(u).origin===origin),requests.filter(u=>new URL(u).origin!==origin));
 check('No uncaught script or shader errors',report.errors.length===0,report.errors);report.success=true;
}catch(e){report.failure=String(e);console.error(e);if(page)try{report.visibleFailure=await page.locator('#loading').innerText();await page.screenshot({path:path.join(out,'failure-'+mode+'.png'),timeout:15000});}catch{}process.exitCode=1;}
finally{if(browser)await browser.close();await new Promise(r=>server.close(r));report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,(live?'live-':'local-')+mode+'.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({success:report.success,checks:report.checks.length,points:report.pointChecks.length,failure:report.failure}));}
})();
