const fs=require('fs'),path=require('path'),http=require('http'),pw=require('playwright');
const engine=process.env.BROWSER||'chromium',live=!!process.env.TEST_URL,root=process.cwd(),out=path.join(root,'fullbody-tcm-v20/checks'),prefix=(live?'live-final-':'local-final-')+engine;fs.mkdirSync(out,{recursive:true});
const report={version:'20.0.1',engine,live,checks:[],errors:[],startedAt:new Date().toISOString(),clinicalCalibration:false};
const server=live?null:http.createServer((req,res)=>{let f=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(f.endsWith('/'))f+='index.html';try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.glb':'model/gltf-binary'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.writeHead(404);res.end();}}).listen(8194,'127.0.0.1');
function ck(name,ok,detail){report.checks.push({name,pass:!!ok,detail});console.log(ok?'PASS':'FAIL',name);if(!ok)throw Error(name+': '+JSON.stringify(detail));}
(async()=>{let browser,p;try{
 browser=await pw[engine].launch({headless:true,...(engine==='chromium'?{args:['--no-sandbox','--enable-unsafe-swiftshader']}: {})});p=await browser.newPage({viewport:{width:1440,height:1000},serviceWorkers:'block'});p.setDefaultTimeout(90000);p.on('pageerror',e=>report.errors.push(e.message));
 const url=process.env.TEST_URL||'http://127.0.0.1:8194/fullbody-tcm-v20/';const r=await p.goto(url);ck('HTTP success',r.status()===200);await p.waitForFunction(()=>window.__ATLAS_SHARED__&&__FOOT_ATLAS__.getState().ready);
 const settle=async()=>{await p.waitForFunction(()=>!__ATLAS_SHARED__.getState().busy&&!__ATLAS_LEARNING__.getSurfaceState().busy&&!__FOOT_ATLAS__.getState().cameraAnimating);await p.waitForTimeout(200);};
 const read=()=>p.evaluate(()=>{const rows=[];__ATLAS_RENDER_AUDIT__.scene.traverse(n=>{if(!n.isMesh)return;for(let q=n;q;q=q.parent)if(!q.visible)return;const a=n.userData.female||n.userData.atlas;if(a)rows.push({id:a.id,sex:n.userData.female?'female':'male',system:a.system,opacity:n.material.opacity});else if(n.userData.home)rows.push({id:n.name,sex:'male',system:'bones',opacity:n.material.opacity});});rows.sort((a,b)=>a.id.localeCompare(b.id));return {sex:__ATLAS_SHARED__.getState().sex,scene:__ATLAS_SHARED__.getState().scene,source:document.querySelector('#renderStatus').textContent,heading:document.querySelector('#regionHeading').textContent,box:__ATLAS_TISSUES__.getState().organView,ink:__ATLAS_LEARNING__.getInkAudit(),rows};});
 for(const key of ['chest','bones','surface']){
  await p.evaluate(key=>__ATLAS_SHARED__.choose(key,false),key);await settle();const before=await read();
  await p.locator('#bodySelector button[data-body-sex="female"]').click();await settle();let state=await read();
  ck(key+': female caption and actual meshes agree',state.source==='女性 · HRA参考'&&state.sex==='female'&&state.rows.length>0&&state.rows.every(n=>n.sex==='female'),{source:state.source,sex:state.sex});
  if(key==='surface')ck('Female skin pigment retained',state.ink.active&&state.ink.body==='female');
  await p.screenshot({path:path.join(out,prefix+'-female-'+key+'.png')});
  await p.locator('#bodySelector button[data-body-sex="male"]').click();await settle();state=await read();
  ck(key+': male caption and actual meshes agree',state.source==='男性 · 解剖参考'&&state.sex==='male'&&state.rows.length>0&&state.rows.every(n=>n.sex==='male'),{source:state.source,sex:state.sex});
  ck(key+': native crop and rendered structures unchanged by caption repair',JSON.stringify(state.box)===JSON.stringify(before.box)&&JSON.stringify(state.rows)===JSON.stringify(before.rows));
  if(key==='chest')ck('Male chest title remains chest',state.heading==='男性 · 胸腔器官',state.heading);
  if(key==='surface')ck('Male skin pigment retained',state.ink.active&&state.ink.body==='male');
  await p.screenshot({path:path.join(out,prefix+'-male-'+key+'.png')});
 }
 ck('No uncaught browser errors',report.errors.length===0,report.errors);report.success=true;
 }catch(e){report.success=false;report.failure=e.stack;console.error(e);try{await p.screenshot({path:path.join(out,prefix+'-FAIL.png')});}catch{}process.exitCode=1;}
 finally{report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,prefix+'.json'),JSON.stringify(report,null,2));await browser?.close();server?.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
