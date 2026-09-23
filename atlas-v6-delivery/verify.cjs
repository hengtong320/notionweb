'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const {chromium,webkit}=require('playwright');
const root=path.resolve('fullbody-tcm-v6'),out=path.join(root,'checks');fs.mkdirSync(out,{recursive:true});
const mode=process.env.BROWSER||'chromium',live=!!process.env.LIVE_URL;
const report={startedAt:new Date().toISOString(),browser:mode,live,success:false,checks:[],errors:[]};
const ck=(name,pass,detail)=>{report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});console.log(pass?'PASS':'FAIL',name);if(!pass)throw Error(name+' '+JSON.stringify(detail));};
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const server=http.createServer((req,res)=>{try{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(f===root)f=path.join(root,'index.html');if(!f.startsWith(root+path.sep)||!fs.statSync(f).isFile())throw Error('bad');res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.mp3':'audio/mpeg','.glb':'model/gltf-binary'})[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);}catch{res.writeHead(404);res.end();}});
const settle=async p=>{await p.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating);await p.waitForTimeout(180);};
(async()=>{let b,p;try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=process.env.LIVE_URL||'http://127.0.0.1:'+server.address().port+'/';report.url=url;
 const r=await fetch(url);ck('HTTP200',r.status===200);const html=Buffer.from(await r.arrayBuffer());report.htmlSHA256=hash(html);ck('Exact published HTML',hash(fs.readFileSync(path.join(root,'index.html')))===report.htmlSHA256);
 b=await (mode==='webkit'?webkit:chromium).launch({headless:true,...(mode==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{})});
 const c=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});p=await c.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>report.errors.push(String(e)));p.on('console',m=>{if(m.type()==='error'&&!/404|favicon/.test(m.text()))report.errors.push(m.text());});
 await p.addInitScript(()=>localStorage.setItem('atlas-auto-speak','0'));await p.goto(url,{waitUntil:'load',timeout:120000});await p.waitForFunction(()=>window.__ATLAS_LEARNING__?.getState().version==='6.0',{},{timeout:90000});await settle(p);
 ck('Unchanged 210 bones',await p.evaluate(()=>window.__FOOT_ATLAS__.getState().count===210&&window.__FOOT_ATLAS__.getState().bones.reduce((s,b)=>s+b.triangles,0)===534003));
 ck('All 361 names have separate educational locations',await p.evaluate(()=>{const a=window.__ATLAS_LEARNING__.getReferences().filter(p=>!p.code.startsWith('EX'));return a.length===361&&a.every(p=>p.hasPosition)&&new Set(a.map(p=>p.code)).size===361;}));
 ck('670 bilateral-midline markers',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().markerInstances===670));
 const counts={LU:11,LI:20,ST:45,SP:21,HT:9,SI:19,BL:67,KI:27,PC:9,TE:23,GB:44,LR:14,GV:28,CV:24};
 for(const [m,count] of Object.entries(counts)){
  await p.selectOption('#meridianQuick',m);await settle(p);
  const s=await p.evaluate(()=>({state:window.__ATLAS_LEARNING__.getState(),rows:document.querySelectorAll('#acupointResults [data-point]').length}));
  ck(m+' complete name count',s.rows===count,s.rows);ck(m+' both sides guide visible',s.state.routeDiagnostics.filter(r=>r.meridian===m).every(r=>r.visible&&r.referencePoints===count&&r.guideVertices>count),s.state.routeDiagnostics);
 }
 // Exhaustive interaction checks, NOT clinical localization validation.
 const all=await p.evaluate(()=>window.__ATLAS_LEARNING__.getReferences().filter(p=>!p.code.startsWith('EX')));const samples=[];
 for(let i=0;i<all.length;i+=25){const batch=all.slice(i,i+25);const res=await p.evaluate(batch=>batch.map(q=>{const ok=window.__ATLAS_LEARNING__.selectPoint(q.code,'right',true),s=window.__FOOT_ATLAS__.getState(),p=window.__ATLAS_LEARNING__.getPointScreen(q.code,'right'),r=document.querySelector('#viewport').getBoundingClientRect();return {code:q.code,pass:ok&&s.target.every((v,j)=>Math.abs(v-q.position[j])<.001)&&p&&Math.abs(p.x-(r.left+r.width/2))<3&&Math.abs(p.y-(r.top+r.height/2))<40};}),batch);samples.push(...res);}
 report.perPoint=samples;ck('361 of 361 point focus targets centered',samples.length===361&&samples.every(x=>x.pass),samples.filter(x=>!x.pass));
 await p.selectOption('#meridianQuick','KI');await p.evaluate(()=>window.__ATLAS_LEARNING__.setLabelMode('all'));await settle(p);
 await p.click('#tcmBtn');await p.fill('#acupointSearch','KI27');await p.click('[data-point="KI27"]');await settle(p);
 ck('Actual list click selects KI27',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedPoint.code==='KI27'));
 await p.fill('#acupointSearch','影像穴');ck('Dictation alias finds 迎香',await p.locator('[data-point="LI20"]').count()===1);await p.click('[data-point="LI20"]');await settle(p);
 ck('迎香 focuses front of face',await p.evaluate(()=>{const s=window.__FOOT_ATLAS__.getState(),t=window.__ATLAS_LEARNING__.getState();return t.selectedPoint.code==='LI20'&&s.target[1]>1450&&s.camera[2]>s.target[2];}));
 await p.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('LI20','left',true));await settle(p);ck('Left Yingxiang mirrored focus',await p.evaluate(()=>{const s=window.__FOOT_ATLAS__.getState();return Math.abs(s.target[0]-(2*99.55318155698478-80))<.001;}));
 await p.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('KI1','right',true));await settle(p);ck('Sole point uses underside view',await p.evaluate(()=>{const s=window.__FOOT_ATLAS__.getState();return s.camera[1]<s.target[1];}));
 await p.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('lumbar');window.__FOOT_ATLAS__.setExplode(100);window.__ATLAS_LEARNING__.selectPoint('KI3','right',true);});await settle(p);ck('Selecting point restores exploded pose and visible layer',await p.evaluate(()=>window.__FOOT_ATLAS__.getState().explode===0&&!window.__ATLAS_LEARNING__.getState().suspended));
 await p.evaluate(()=>{window.__ATLAS_LEARNING__.selectPoint('GV20','right',true);window.__ATLAS_LEARNING__.selectPoint('KI27','left',true);window.__ATLAS_LEARNING__.selectPoint('LI20','right',true);});await settle(p);ck('Last rapid click wins',await p.evaluate(()=>Math.abs(window.__FOOT_ATLAS__.getState().target[1]-1512)<.001));
 await p.fill('#acupointSearch','');await p.selectOption('#meridianQuick','KI');await p.click('#tcmClose');await settle(p);ck('Collapse keeps route and point layer',await p.evaluate(()=>{let s=window.__ATLAS_LEARNING__.getState();return s.enabled&&!s.panelOpen&&s.visiblePoints===54;}));
 await p.evaluate(()=>window.__ATLAS_LEARNING__.setLabelMode('all'));await settle(p);ck('All on-screen KI labels are present, no 24-name cap',await p.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.labelStats.shown===s.labelStats.inFrame&&s.labelStats.shown>24;}),await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().labelStats));
 if(!live)await p.screenshot({path:path.join(out,mode+'-kidney.png'),timeout:60000});
 await p.locator('#acupointLabels [data-acu-label="KI27"][data-side="right"]').click();await settle(p);ck('Click rendered name label focuses KI27',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedPoint.code==='KI27'));
 await p.evaluate(()=>{window.__ATLAS_LEARNING__.selectPoint('LI20','right',true);window.__ATLAS_LEARNING__.setLabelMode('selected');});await settle(p);
 if(!live)await p.screenshot({path:path.join(out,mode+'-yingxiang.png'),timeout:60000});
 if(mode==='chromium'){
  const q=await p.evaluate(()=>window.__ATLAS_LEARNING__.getPointScreen('LI20','right'));await p.mouse.click(q.x,q.y);await settle(p);ck('Real 3D dot click focuses LI20',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedPoint.code==='LI20'));
  const before=await p.evaluate(()=>window.__FOOT_ATLAS__.getState().camera);await p.mouse.move(q.x,q.y);await p.mouse.down();await p.mouse.move(q.x+80,q.y+25,{steps:8});await p.mouse.up();await settle(p);ck('Dragging a point still orbits',await p.evaluate(a=>window.__FOOT_ATLAS__.getState().camera.some((v,i)=>Math.abs(v-a[i])>1),before));
 }
 await p.evaluate(()=>{window.__ATLAS_LEARNING__.setMeridians(['KI','HT','SI','GV']);window.__ATLAS_LEARNING__.fitMeridian();window.__ATLAS_LEARNING__.setLabelMode('auto');});await settle(p);ck('More than three meridians retain names',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().labelStats.shown>0));
 await p.evaluate(()=>window.__ATLAS_LEARNING__.selectPoint('LI20','right',true));await p.setViewportSize({width:390,height:844});await settle(p);ck('Mobile resize retains focused point',await p.evaluate(()=>Math.abs(window.__FOOT_ATLAS__.getState().target[1]-1512)<.001));
 ck('No mobile horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));if(!live)await p.screenshot({path:path.join(out,mode+'-phone.png'),timeout:60000});
 ck('No browser script/shader errors',report.errors.length===0,report.errors);report.success=true;
 }catch(e){report.failure=String(e);console.error(e);if(p)try{await p.screenshot({path:path.join(out,'failure-'+mode+(live?'-live':'')+'.png'),timeout:20000});}catch{}process.exitCode=1;}
 finally{if(b)await b.close();await new Promise(r=>server.close(r));report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,(live?'live-':'local-')+mode+'.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({success:report.success,checks:report.checks.length,failure:report.failure}));}
})();
