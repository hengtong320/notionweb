'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const {chromium,webkit}=require('playwright');
const root=path.resolve('fullbody-tcm-v5'),out=path.join(root,'checks');fs.mkdirSync(out,{recursive:true});
const mode=process.env.BROWSER||'chromium',live=!!process.env.LIVE_URL;
const report={startedAt:new Date().toISOString(),type:'actual-browser-rendering',browser:mode,success:false,checks:[],errors:[]};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function check(name,pass,detail){report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});console.log(pass?'PASS':'FAIL',name);if(!pass)throw Error(name+': '+JSON.stringify(detail));}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.glb':'model/gltf-binary','.mp3':'audio/mpeg','.txt':'text/plain'};
const server=http.createServer((req,res)=>{try{let target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(target===root)target=path.join(root,'index.html');if(!target.startsWith(root+path.sep)||!fs.statSync(target).isFile())throw Error('not a file');res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');fs.createReadStream(target).pipe(res);}catch{res.writeHead(404);res.end();}});
async function settle(page){await page.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating,null,{timeout:30000});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
(async()=>{let browser,page;try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=process.env.LIVE_URL||'http://127.0.0.1:'+server.address().port+'/';report.url=url;
 const response=await fetch(url);check('Website HTTP 200',response.status===200,response.status);const data=Buffer.from(await response.arrayBuffer());report.htmlSHA256=hash(data);check('Served HTML matches tested build',report.htmlSHA256===hash(fs.readFileSync(path.join(root,'index.html'))));
 browser=await (mode==='webkit'?webkit:chromium).launch({headless:true,...(mode==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{})});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});
 page=await ctx.newPage();page.setDefaultTimeout(30000);page.on('pageerror',e=>report.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error'&&!/favicon|404/.test(m.text()))report.errors.push(m.text());});
 const requests=[];page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 await page.goto(url,{waitUntil:'load',timeout:90000});await page.waitForFunction(()=>window.__FOOT_ATLAS__?.getState().ready&&window.__ATLAS_TISSUES__&&window.__ATLAS_LEARNING__,null,{timeout:90000});await settle(page);
 check('V5 runtime loaded',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().version==='5.0'));
 check('All 210 original bones rendered',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().count===210&&window.__FOOT_ATLAS__.getState().visible===210));
 check('Original bone geometry preserved',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.reduce((n,b)=>n+b.triangles,0)===534003));
 check('C3 retains corrected pinyin',await page.evaluate(()=>window.__FOOT_ATLAS__.getCatalog().find(b=>b.id==='C3').pinyin.includes('zhuī')));
 check('Toolbar starts collapsed',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().dockCollapsed));
 await page.locator('#dockToggle').click();check('Toolbar can be reopened',await page.evaluate(()=>!window.__FOOT_ATLAS__.getState().dockCollapsed));await page.locator('#dockToggle').click();
 await page.locator('#meridianQuick').selectOption('GV');await settle(page);
 check('GV schematic guide has visible geometry',await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().routeDiagnostics.some(r=>r.meridian==='GV'&&r.visible&&r.guideVertices>100)));
 check('GV view faces posterior surface',await page.evaluate(()=>{const s=window.__FOOT_ATLAS__.getState();return s.camera[2]<s.target[2];}));
 await page.screenshot({path:path.join(out,(live?'live-':'')+mode+'-gv.png')});
 await page.locator('#tcmBtn').click();await page.locator('#tcmClose').click();check('Closing controls keeps the guide visible',await page.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.enabled&&!s.panelOpen&&s.routeDiagnostics.some(r=>r.visible);}));
 await page.evaluate(()=>window.__ATLAS_LEARNING__.setMeridians(['HT','SI']));check('Two selected meridians coexist',await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedMeridians.join(',')==='HT,SI'));
 await page.evaluate(()=>{window.__ATLAS_LEARNING__.toggleTCM(false);window.__FOOT_ATLAS__.setRegion('body');window.__FOOT_ATLAS__.setView('front');});await settle(page);
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('muscles'));await settle(page);
 check('All muscle-source meshes decoded',await page.evaluate(()=>window.__ATLAS_TISSUES__.getState().systems.muscular.count===683));
 check('Muscle profile is visible and opaque',await page.evaluate(()=>{const s=window.__ATLAS_TISSUES__.getState();return s.profile==='muscles'&&s.systems.muscular.visible>0&&s.systems.muscular.opacity===1;}));
 await page.screenshot({path:path.join(out,(live?'live-':'')+mode+'-muscles.png')});
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('nerves'));await settle(page);
 check('All nerve-source meshes decoded',await page.evaluate(()=>window.__ATLAS_TISSUES__.getState().systems.nervous.count===550));
 check('Nerve profile highlights nerve layer',await page.evaluate(()=>{const s=window.__ATLAS_TISSUES__.getState();return s.nerveXray&&s.systems.nervous.visible>0&&s.systems.nervous.opacity===1;}));
 await page.screenshot({path:path.join(out,(live?'live-':'')+mode+'-nerves.png')});
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('compare'));check('Comparison restores depth-tested nerve display',await page.evaluate(()=>!window.__ATLAS_TISSUES__.getState().nerveXray));
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('bones'));await page.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('lumbar');window.__FOOT_ATLAS__.setExplode(100);});await settle(page);
 check('Lumbar vertebrae separate only vertically',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.filter(b=>/^L[1-5]$/.test(b.id)).every(b=>Math.abs(b.position[0]-b.home[0])<.001&&Math.abs(b.position[2]-b.home[2])<.001)));
 await page.screenshot({path:path.join(out,(live?'live-':'')+mode+'-lumbar.png')});
 await page.evaluate(()=>window.__FOOT_ATLAS__.reset());await settle(page);
 check('Reset restores original coordinates',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.every(b=>b.position.every((v,i)=>Math.abs(v-b.home[i])<.0001))));
 check('Mouse-centered zoom enabled',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().zoomToCursor));
 if(mode==='chromium'){
  await page.evaluate(()=>window.__FOOT_ATLAS__.setRegion('lumbar'));await settle(page);const pt=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('L3'));check('Real L3 mesh can be picked',!!pt,pt);
  await page.mouse.click(pt.x,pt.y);check('Mouse click selects L3',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().selected==='L3'));
  await page.evaluate(()=>window.__FOOT_ATLAS__.setMode('move'));await page.mouse.move(pt.x,pt.y);await page.mouse.down();await page.mouse.move(pt.x+45,pt.y-20,{steps:8});await page.mouse.up();
  check('Real mouse drag moves selected bone',await page.evaluate(()=>Math.hypot(...window.__FOOT_ATLAS__.getState().bones.find(b=>b.id==='L3').offset)>1));await page.evaluate(()=>window.__FOOT_ATLAS__.reset());await settle(page);
 }
 const voiceName=Object.values(JSON.parse(fs.readFileSync(path.join(root,'voice-map.json'),'utf8')).mapping)[0];
 const voiceURL=new URL('./voice/'+voiceName,url).href;
 const vr=await fetch(voiceURL),audioBytes=Buffer.from(await vr.arrayBuffer());
 check('Published audio file accessible and intact',vr.status===200&&audioBytes.length>500&&hash(audioBytes)===hash(fs.readFileSync(path.join(root,'voice',voiceName))),{status:vr.status,bytes:audioBytes.length});
 check('Pronunciation guard active',await page.evaluate(()=>window.__ATLAS_SPEECH__.getState().readingGuard===true));
 check('No horizontal desktop overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.setViewportSize({width:390,height:844});await settle(page);check('Phone has usable 3D viewport',await page.locator('#viewport').evaluate(e=>e.clientWidth>300&&e.clientHeight>300));
 check('No horizontal phone overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:path.join(out,(live?'live-':'')+mode+'-phone.png')});
 const origin=new URL(url).origin;check('No third-party runtime model dependency',requests.every(u=>new URL(u).origin===origin),requests.filter(u=>new URL(u).origin!==origin));
 check('No uncaught JavaScript or shader errors',report.errors.length===0,report.errors);report.success=true;
 }catch(e){report.failure=String(e);console.error(e);if(page)try{await page.screenshot({path:path.join(out,'failure-'+mode+'.png'),timeout:10000});}catch{}process.exitCode=1;}
 finally{if(browser)await browser.close();await new Promise(r=>server.close(r));report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,(live?'live-':'local-')+mode+'.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({success:report.success,checks:report.checks.length,failure:report.failure}));}
})();
