'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const {chromium,webkit}=require('playwright');
const root=path.resolve('fullbody-tcm-v8'),out=path.join(root,'checks');fs.mkdirSync(out,{recursive:true});
const mode=process.env.BROWSER||'chromium',live=!!process.env.LIVE_URL;
const report={startedAt:new Date().toISOString(),browser:mode,success:false,checks:[],errors:[],clinicalCalibration:false};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function ck(name,pass,detail){report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});console.log(pass?'PASS':'FAIL',name);if(!pass)throw Error(name+': '+JSON.stringify(detail));}
const server=http.createServer((req,res)=>{try{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(f===root)f=path.join(root,'index.html');if(!f.startsWith(root+path.sep)||!fs.statSync(f).isFile())throw Error('not a file');const ext=path.extname(f);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.glb':'model/gltf-binary','.mp3':'audio/mpeg','.txt':'text/plain'})[ext]||'application/octet-stream');fs.createReadStream(f).pipe(res);}catch{res.writeHead(404);res.end();}});
async function settle(p){await p.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating,null,{timeout:45000});await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
async function capture(p,name){if(!live)await p.screenshot({path:path.join(out,mode+'-'+name+'.png'),timeout:60000});}
async function result(p,code,side='right'){return p.evaluate(({code,side})=>{const a=window.__FOOT_ATLAS__.getState(),l=window.__ATLAS_LEARNING__,s=l.getState(),v=l.getPointScreen(code,side),r=document.getElementById('viewport').getBoundingClientRect(),c=l.getStudyContext();return {selected:s.selectedPoint,center:c?.center,target:a.target,camera:a.camera,area:s.headAreaVisible,inView:!!v&&v.z>-1&&v.z<1&&v.x>r.left&&v.x<r.right&&v.y>r.top&&v.y<r.bottom,error:c?Math.hypot(...c.center.map((v,i)=>v-a.target[i])):9999};},{code,side});}
(async()=>{let browser,page;try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=process.env.LIVE_URL||'http://127.0.0.1:'+server.address().port+'/';report.url=url;
 const r=await fetch(url),bytes=Buffer.from(await r.arrayBuffer());report.htmlSHA256=hash(bytes);ck('Published or local HTTP 200 and exact V8 HTML',r.status===200&&report.htmlSHA256===hash(fs.readFileSync(path.join(root,'index.html'))));
 browser=await (mode==='webkit'?webkit:chromium).launch({headless:true,...(mode==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});
 await context.addInitScript(()=>{try{localStorage.setItem('atlas-auto-speak','0');}catch{}});
 page=await context.newPage();page.setDefaultTimeout(45000);page.on('pageerror',e=>report.errors.push(String(e)));const requests=[];page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});page.on('console',m=>{if(m.type()==='error'&&!/favicon|404/.test(m.text()))report.errors.push(m.text());});
 await page.goto(url,{waitUntil:'load',timeout:90000});await page.waitForFunction(()=>window.__ATLAS_TISSUES__&&window.__ATLAS_LEARNING__?.getCurveDiagnostics,null,{timeout:90000});await settle(page);
 ck('V8 and all original 210 bones',await page.evaluate(()=>{const s=window.__FOOT_ATLAS__.getState();return s.version==='8.0'&&s.count===210&&s.bones.reduce((n,b)=>n+b.triangles,0)===534003;}));
 ck('Original 670 standard marker instances retained',await page.evaluate(()=>window.__ATLAS_LEARNING__.getNavigationCatalog().length===670));
 const curves=await page.evaluate(()=>window.__ATLAS_LEARNING__.getCurveDiagnostics());report.curves=curves;
 ck('Every original route branch remains finite and sampled',curves.length>=26&&curves.every(c=>c.samples>1&&Number.isFinite(c.maxDeviation)),{branches:curves.length});
 ck('Curves actually depart from straight segments',curves.filter(c=>c.curvedSegments>0).length>=24);
 ck('Smoothing is bounded, preserves anchors and endpoints',curves.every(c=>c.maxDeviation<=10.0001&&c.endpointsPreserved&&c.anchorPointsPreserved));
 for(const id of ['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR','GV','CV']){
  await page.evaluate(id=>{const l=window.__ATLAS_LEARNING__;l.setMeridian(id);l.setTCMSide('both');l.toggleTCM(true);l.fitMeridian();},id);await settle(page);
  ck('Visible branch coverage: '+id,await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().routeDiagnostics.every(r=>r.visible&&r.guideVertices>1)));
 }
 await page.evaluate(()=>{const l=window.__ATLAS_LEARNING__;l.setMeridian('KI');l.setTCMSide('right');l.fitMeridian();});await settle(page);await capture(page,'smooth-kidney');
 await page.locator('#tcmBtn').click();await page.locator('#curveStyle').selectOption('dashed');ck('Dashed reference option works',await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().curveStyle==='dashed'));await page.locator('#curveStyle').selectOption('smooth');await page.locator('#tcmClose').click();
 ck('Collapse retains routes',await page.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.enabled&&!s.panelOpen&&s.routeDiagnostics.some(r=>r.visible);}));
 await page.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('thorax');window.__FOOT_ATLAS__.setView('front');});await settle(page);await page.locator('#tcmBtn').click();await page.locator('#acupointSearch').fill('印堂');await page.locator('[data-point="EX-YINTANG"]').click();await settle(page);
 let x=await result(page,'EX-YINTANG','midline');ck('Actual Yintang directory click leaves thorax for eyebrow area',x.selected?.code==='EX-YINTANG'&&x.target[1]>1540&&x.inView&&x.error<.001&&x.area,x);await capture(page,'yintang');
 await page.locator('#acupointSearch').fill('安眠');await page.locator('[data-point="EX-ANMIAN"]').click();await settle(page);
 x=await result(page,'EX-ANMIAN');ck('Actual Anmian click reaches posterior-lateral head area',x.selected?.code==='EX-ANMIAN'&&x.target[1]>1450&&x.camera[0]<x.target[0]&&x.camera[2]<x.target[2]&&x.inView&&x.error<.001,x);
 const extras=await page.evaluate(()=>window.__ATLAS_LEARNING__.getReferences().filter(p=>p.code.startsWith('EX-')));
 for(const p of extras){await page.evaluate(code=>window.__ATLAS_LEARNING__.selectPoint(code,'right',true),p.code);await settle(page);const q=await result(page,p.code);ck('Supplement region navigation: '+p.code,q.selected?.code===p.code&&q.inView&&q.target[1]>1400&&q.error<.001,q);}
 await page.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('EX-ANMIAN','left',true));await settle(page);x=await result(page,'EX-ANMIAN','left');ck('Anmian left/right orientation mirrors correctly',x.selected?.side==='left'&&x.target[0]>99.5&&x.camera[0]>x.target[0]&&x.inView,x);
 await page.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('EX-ANMIAN','right',true));await settle(page);
 for(const profile of ['bones','muscles','nerves','compare']){
  await page.locator('[data-study-profile="'+profile+'"]').click();await page.waitForFunction(p=>window.__ATLAS_TISSUES__.getState().profile===p&&!Object.values(window.__ATLAS_TISSUES__.getState().systems).some(s=>s.loading),profile,{timeout:90000});await settle(page);
  const q=await result(page,'EX-ANMIAN');const st=await page.evaluate(()=>window.__ATLAS_TISSUES__.getState());
  ck('Profile '+profile+' keeps Anmian and camera target',q.selected?.code==='EX-ANMIAN'&&q.error<.001&&q.inView&&st.studyContext?.code==='EX-ANMIAN');
  if(profile==='muscles')ck('Local muscle context renders actual meshes',st.systems.muscular.count===683&&st.systems.muscular.visible>0&&st.systems.muscular.visible<683,st.systems.muscular);
  if(profile==='nerves')ck('Local nerve context renders actual meshes',st.systems.nervous.count===550&&st.systems.nervous.visible>0,st.systems.nervous);
 }
 await capture(page,'anmian-layer-context');
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('bones'));await page.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('LI20','right',true));await settle(page);x=await result(page,'LI20');ck('Existing Yingxiang target still focuses correctly',x.inView&&x.error<.001&&x.selected?.code==='LI20');
 await page.evaluate(()=>{window.__ATLAS_LEARNING__.setMeridians(['HT','SI']);window.__ATLAS_LEARNING__.fitMeridian();});await settle(page);ck('Two channels and names remain selectable',await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedMeridians.length===2&&window.__ATLAS_LEARNING__.getState().visiblePoints>0));
 await page.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('lumbar');window.__FOOT_ATLAS__.setExplode(100,false);});await settle(page);
 ck('Original lumbar vertical separation preserved',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.filter(b=>/^L[1-5]$/.test(b.id)).every(b=>Math.abs(b.position[0]-b.home[0])<.001&&Math.abs(b.position[2]-b.home[2])<.001)));
 await page.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('EX-YINTANG','midline',true));await settle(page);ck('Extra navigation also restores separated bones',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().explode===0));
 await page.setViewportSize({width:390,height:844});await settle(page);x=await result(page,'EX-YINTANG','midline');ck('Phone resize keeps Yintang study area on screen',x.inView&&x.error<.001,x);ck('Phone no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await capture(page,'phone-yintang');
 await page.setViewportSize({width:844,height:390});await settle(page);await page.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('EX-ANMIAN','left',true));await settle(page);x=await result(page,'EX-ANMIAN','left');ck('Landscape extra focus remains on screen',x.inView&&x.error<.001,x);
 ck('No third-party runtime dependencies',requests.every(u=>new URL(u).origin===new URL(url).origin));ck('No JavaScript or shader errors',report.errors.length===0,report.errors);report.success=true;
 }catch(e){report.failure=String(e);console.error(e);process.exitCode=1;if(page)try{await page.screenshot({path:path.join(out,'failure-'+mode+'.png'),timeout:10000});}catch{}}
 finally{if(browser)await browser.close();await new Promise(r=>server.close(r));report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,(live?'live-':'local-')+mode+'.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({success:report.success,checks:report.checks.length,failure:report.failure}));}
})();
