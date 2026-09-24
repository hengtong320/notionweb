'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const {chromium,webkit}=require('playwright');
const root=path.resolve('fullbody-tcm-v9'),out=path.join(root,'checks');fs.mkdirSync(out,{recursive:true});
const mode=process.env.BROWSER||'chromium',live=!!process.env.LIVE_URL;
const report={startedAt:new Date().toISOString(),browser:mode,live,success:false,checks:[],errors:[],clinicalValidation:false};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function ck(name,pass,detail){report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});console.log(pass?'PASS':'FAIL',name);if(!pass)throw Error(name+': '+JSON.stringify(detail));}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.glb':'model/gltf-binary','.mp3':'audio/mpeg','.csv':'text/csv; charset=utf-8'};
const server=http.createServer((req,res)=>{try{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(f===root)f=path.join(root,'index.html');if(!f.startsWith(root+path.sep)||!fs.statSync(f).isFile())throw Error();res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);}catch{res.writeHead(404);res.end();}});
async function settle(p){await p.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating,null,{timeout:60000});await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
(async()=>{let browser,page;try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=process.env.LIVE_URL||'http://127.0.0.1:'+server.address().port+'/';report.url=url;
 const response=await fetch(url),body=Buffer.from(await response.arrayBuffer());report.htmlSHA256=hash(body);ck('HTTP 200 and exact V9 HTML',response.status===200&&report.htmlSHA256===hash(fs.readFileSync(path.join(root,'index.html'))));
 browser=await(mode==='webkit'?webkit:chromium).launch({headless:true,...(mode==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});page=await context.newPage();page.setDefaultTimeout(60000);
 const requests=[];page.on('pageerror',e=>report.errors.push(String(e)));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});page.on('console',m=>{if(m.type()==='error'&&/THREE|shader|WebGL|Uncaught/.test(m.text()))report.errors.push(m.text());});
 await page.goto(url,{waitUntil:'load',timeout:120000});await page.waitForFunction(()=>window.__FOOT_ATLAS__?.getState().ready&&window.__ATLAS_LEARNING__&&window.__ATLAS_EVIDENCE__&&window.__ATLAS_TISSUES__,null,{timeout:120000});await settle(page);
 ck('Actual WebGL2 drawing context created',await page.locator('#viewport canvas').first().evaluate(c=>{const gl=c.getContext('webgl2');return !!gl&&!gl.isContextLost()&&gl.drawingBufferWidth>300;}));
 ck('All 210 original bones loaded and visible',await page.evaluate(()=>{const s=window.__FOOT_ATLAS__.getState();return s.count===210&&s.visible===210;}));
 ck('V9 research module and 361-name evidence dataset',await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().version==='9.0-research'&&Object.keys(window.__ATLAS_EVIDENCE__.getData().points).length===361));
 ck('Default strict mode does not claim calibrated coordinates',await page.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.precisionMode==='strict'&&s.coordinateVerified===0&&!s.clinicalCalibration&&!s.routeDiagnostics.some(r=>r.visible);}));
 await page.locator('#tcmBtn').click();await page.locator('#v9Diagram').click();await page.locator('#meridianQuick').selectOption('KI');await settle(page);
 ck('Explicit illustration switch enables kidney tube routes',await page.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.precisionMode==='illustrative'&&s.curveStyle==='tube'&&s.routeDiagnostics.some(r=>r.meridian==='KI'&&r.visible);}));
 const curves=await page.evaluate(()=>window.__ATLAS_LEARNING__.getCurveDiagnostics());
 ck('All 33 curve branches are genuine finite tube geometry',curves.length===33&&curves.every(c=>Number.isFinite(c.triangleCount)&&c.triangleCount>0&&Number.isFinite(c.maxDepartureFromOldPolyline)),curves.map(c=>({meridian:c.meridian,side:c.side,triangles:c.triangleCount})));
 if(!live)await page.screenshot({path:path.join(out,mode+'-kidney-tubes.png'),timeout:90000});
 await page.locator('#tcmClose').click();ck('Closing settings leaves illustration visible',await page.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return !s.panelOpen&&s.routeDiagnostics.some(r=>r.visible);}));
 await page.locator('#tcmBtn').click();await page.locator('#acupointSearch').fill('PC6');await page.locator('#acupointResults [data-point="PC6"]').first().click();await settle(page);
 ck('Actual point-directory click selects PC6',await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedPoint?.code==='PC6'));
 ck('Point explanation contains bounded modern evidence and location status',await page.locator('#tcmPointCard').evaluate(e=>/现代研究/.test(e.innerText)&&/术后/.test(e.innerText)&&/未完成/.test(e.innerText)));
 if(!live)await page.screenshot({path:path.join(out,mode+'-point-evidence.png'),timeout:90000});
 await page.locator('#v9ChannelInfo').click();ck('Channel explanation is accessible from the control',await page.locator('#v9MeridianCard').evaluate(e=>!e.hidden&&/现代解读/.test(e.innerText)));
 await page.locator('#v9CloseChannel').click();await page.locator('#v9Diagram').click();
 ck('Returning to strict mode hides schematic routes',await page.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.precisionMode==='strict'&&!s.routeDiagnostics.some(r=>r.visible);}));
 await page.evaluate(()=>{window.__ATLAS_LEARNING__.setPanel(false);window.__ATLAS_LEARNING__.toggleTCM(false);window.__FOOT_ATLAS__.setRegion('body');});await settle(page);
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('muscles'));await settle(page);
 ck('Same-site muscle model loads',await page.evaluate(()=>{const s=window.__ATLAS_TISSUES__.getState().systems.muscular;return s.count===683&&s.visible>0;}));
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('nerves'));await settle(page);
 ck('Same-site nerve model loads',await page.evaluate(()=>{const s=window.__ATLAS_TISSUES__.getState().systems.nervous;return s.count===550&&s.visible>0;}));
 if(!live&&mode==='chromium')await page.screenshot({path:path.join(out,'chromium-nerves.png'),timeout:90000});
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('bones'));await page.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('lumbar');window.__FOOT_ATLAS__.setExplode(100);});await settle(page);
 ck('Lumbar separation remains vertical',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.filter(b=>/^L[1-5]$/.test(b.id)).every(b=>Math.abs(b.position[0]-b.home[0])<.001&&Math.abs(b.position[2]-b.home[2])<.001)));
 await page.evaluate(()=>window.__FOOT_ATLAS__.reset());await settle(page);
 ck('Reset restores original bone positions',await page.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.every(b=>b.position.every((v,i)=>Math.abs(v-b.home[i])<.001))));
 if(mode==='chromium'){
  await page.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('lumbar');window.__FOOT_ATLAS__.setMode('move');});await settle(page);
  const p=await page.evaluate(()=>window.__FOOT_ATLAS__.getPickPoint('L3'));ck('L3 has a directly pickable surface',!!p);
  await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+45,p.y-25,{steps:8});await page.mouse.up();
  ck('Actual mouse drag still separates a bone',await page.evaluate(()=>Math.hypot(...window.__FOOT_ATLAS__.getState().bones.find(b=>b.id==='L3').offset)>1));
  await page.evaluate(()=>window.__FOOT_ATLAS__.reset());await settle(page);
 }
 const voiceMap=JSON.parse(fs.readFileSync(path.join(root,'voice-map.json'),'utf8')).mapping;
 const voiceFile=Object.values(voiceMap)[0];const voice=await fetch(new URL('./voice/'+voiceFile,url));const voiceBytes=Buffer.from(await voice.arrayBuffer());
 ck('Existing audio downloads with exact bytes',voice.status===200&&hash(voiceBytes)===hash(fs.readFileSync(path.join(root,'voice',voiceFile))));
 ck('No off-site runtime model requests',requests.every(u=>new URL(u).origin===new URL(url).origin));
 await page.setViewportSize({width:390,height:844});await settle(page);
 ck('Phone has usable canvas without page overflow',await page.evaluate(()=>{const e=document.getElementById('viewport');return e.clientWidth>=300&&e.clientHeight>=300&&document.documentElement.scrollWidth<=innerWidth+1;}));
 if(!live)await page.screenshot({path:path.join(out,mode+'-phone.png'),timeout:90000});
 await page.close();page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));page.setDefaultTimeout(30000);
 const evidenceURL=new URL('./evidence.html',url).href;report.evidenceURL=evidenceURL;
 const er=await page.goto(evidenceURL,{waitUntil:'load',timeout:90000});const eb=await er.body();report.evidenceHTMLSHA256=hash(eb);
 ck('Evidence page HTTP 200 and exact delivered bytes',er.status()===200&&hash(eb)===hash(fs.readFileSync(path.join(root,'evidence.html'))));
 ck('Evidence directory includes all 361 names',await page.locator('#results button').count()===361);
 await page.locator('#search').fill('neiguan');ck('Pinyin search works',await page.locator('#results button').count()===1);
 await page.locator('#results button').first().click();ck('Search result opens the point explanation',await page.locator('#detail').evaluate(e=>e.innerText.includes('术后')));
 await page.locator('#search').fill('');await page.locator('#channel').selectOption('KI');ck('Kidney evidence directory has all 27 names',await page.locator('#results button').count()===27);
 await page.locator('[data-topic="ST36"]').click();ck('Animal evidence is identified as animal evidence',await page.locator('#detail').evaluate(e=>e.innerText.includes('小鼠')));
 await page.locator('#meridianTab').click();ck('All 14 channel descriptions available',await page.locator('#results button').count()===14);
 await page.locator('[data-id="HT"]').click();ck('Channel description distinguishes tradition and nerves',await page.locator('#detail').evaluate(e=>/传统/.test(e.innerText)&&/神经/.test(e.innerText)));
 await page.setViewportSize({width:390,height:844});ck('Evidence phone layout has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 if(!live)await page.screenshot({path:path.join(out,mode+'-evidence-phone.png'),timeout:30000});
 ck('No uncaught JavaScript or shader errors',report.errors.length===0,report.errors);report.success=true;
 }catch(error){report.failure=String(error);console.error(error);if(page)try{await page.screenshot({path:path.join(out,(live?'live-':'')+'failure-'+mode+'.png'),timeout:20000});}catch{}process.exitCode=1;}
 finally{if(browser)await browser.close();await new Promise(r=>server.close(r));report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,(live?'live-':'local-')+mode+'.json'),JSON.stringify(report,null,2));console.log('RESULT',JSON.stringify({success:report.success,checks:report.checks.length,failure:report.failure}));}
})();
