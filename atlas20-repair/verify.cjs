// Browser checks validate state/graphics, never clinical anatomical accuracy.
const fs=require('fs'),path=require('path'),http=require('http'),{PNG}=require('pngjs'),pw=require('playwright');
const engine=process.env.BROWSER||'chromium',baseline=process.env.BASELINE==='true',live=!!process.env.TEST_URL,version=baseline?'19':'20',root=process.cwd(),out=path.join(root,'fullbody-tcm-v20/checks'),prefix=baseline?'baseline-v19':(live?'live-':'local-')+engine;fs.mkdirSync(out,{recursive:true});
const server=live?null:http.createServer((req,res)=>{let f=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(f.endsWith('/'))f+='index.html';try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.glb':'model/gltf-binary'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.writeHead(404);res.end();}}).listen(8190,'127.0.0.1');
const report={version:version+'.0.0',engine,live,baseline,checks:[],errors:[],pixelChecks:[],startedAt:new Date().toISOString(),clinicalCalibration:false};
function ck(name,ok,detail){report.checks.push({name,pass:!!ok,detail});console.log(ok?'PASS':'FAIL',name,ok?'':JSON.stringify(detail));if(!ok&&!baseline)throw Error(name);}
function diff(a,b){const x=PNG.sync.read(a),y=PNG.sync.read(b);let n=0;for(let i=0;i<x.data.length;i+=4)if(Math.abs(x.data[i]-y.data[i])+Math.abs(x.data[i+1]-y.data[i+1])+Math.abs(x.data[i+2]-y.data[i+2])>70)n++;return n;}
(async()=>{let browser,p;try{
 browser=await pw[engine].launch({headless:true,...(engine==='chromium'?{args:['--no-sandbox','--enable-unsafe-swiftshader']}: {})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});p=await context.newPage();p.setDefaultTimeout(90000);p.on('pageerror',e=>report.errors.push(e.message));
 const url=process.env.TEST_URL||'http://127.0.0.1:8190/fullbody-tcm-v'+version+'/';const response=await p.goto(url);ck('Published page responds',response.status()===200);await p.waitForFunction(()=>window.__ATLAS_SHARED__&&__FOOT_ATLAS__.getState().ready);await p.evaluate(()=>localStorage.setItem('atlas-auto-speak','0'));
 const settle=async()=>{await p.waitForFunction(()=>!__ATLAS_SHARED__.getState().busy&&!__ATLAS_LEARNING__.getSurfaceState().busy&&!__FOOT_ATLAS__.getState().cameraAnimating,null,{timeout:120000});await p.waitForTimeout(180);};
 const read=()=>p.evaluate(()=>{const f=__ATLAS_FEMALE__.getState(),m=__FOOT_ATLAS__.getState(),t=__ATLAS_TISSUES__.getState(),l=__ATLAS_LEARNING__.getState(),s=__ATLAS_SHARED__.getState(),actual=[];
 __ATLAS_RENDER_AUDIT__.scene.traverse(n=>{if(!n.isMesh)return;for(let q=n;q;q=q.parent)if(!q.visible)return;const a=n.userData.female||n.userData.atlas;if(a)actual.push({id:a.id,sex:n.userData.female?'female':'male',system:a.system,opacity:n.material.opacity,depth:n.material.depthWrite});else if(n.userData.home)actual.push({id:n.name,sex:'male',system:'bones',opacity:n.material.opacity,depth:n.material.depthWrite});});actual.sort((a,b)=>a.id.localeCompare(b.id));
 const display=Object.fromEntries(['enabled','linesOn','pointsOn','namesOn','xray','guideOn','curveStyle','tcmSide','selectedMeridians','selectedPoint'].map(k=>[k,l[k]]));return {s,display,f,m,t,actual,ink:__ATLAS_LEARNING__.getInkAudit(),camera:__FOOT_ATLAS__.captureCamera(),heading:document.querySelector('#regionHeading').textContent};});
 const snap=async name=>{await settle();await p.screenshot({path:path.join(out,prefix+'-'+name+'.png')});};
 const sex=async target=>{await p.locator('[data-body-sex="'+target+'"]').click();await settle();};
 const choose=async key=>{await p.locator('#layersTab').click();if(key==='pelvis')await p.locator('#sharedMoreRegions').evaluate(e=>e.open=true);const sel=['bones','muscles','nerves','compare'].includes(key)?'[data-profile="'+key+'"]':key==='pelvis'?'[data-shared-scene="pelvis"]':'[data-system-view="'+key+'"]';await p.locator(sel).click();await settle();};
 if(baseline){
  await choose('chest');const chest=await read();await sex('female');await sex('male');const again=await read();ck('Chest crop survives gender round trip',JSON.stringify(chest.t.organView)===JSON.stringify(again.t.organView),{before:chest.t.organView,after:again.t.organView});
  await choose('abdomen');const abdomen=await read();await sex('female');await sex('male');const after=await read();ck('Abdomen crop survives gender round trip',JSON.stringify(abdomen.t.organView)===JSON.stringify(after.t.organView),{before:abdomen.t.organView,after:after.t.organView});
  await sex('female');await choose('heart');const heart=await read();ck('Female heart scene does not fall back to lungs',!heart.f.systems.respiratory?.on,{preset:heart.f.preset,lungsOn:heart.f.systems.respiratory?.on});await snap('heart');
 }else{
  for(const key of ['bones','chest','heart','abdomen','vascular','pelvis','nerves','muscles','compare','surface']){
   await sex('male');await choose(key);const before=await read();await sex('female');const female=await read();
   ck(key+': female owns all actually visible meshes',female.actual.length>0&&female.actual.every(n=>n.sex==='female'),female.actual.reduce((a,n)=>(a[n.system]=(a[n.system]||0)+1,a),{}));
   ck(key+': semantic scene is unchanged',female.s.scene===key&&female.s.sex==='female');
   if(['bones','chest','heart','abdomen','nerves'].includes(key))ck(key+': no unsolicited female skin mask',!female.f.systems.surface?.on);
   if(key==='heart')ck('Female heart excludes lungs',!female.f.systems.respiratory?.on&&female.f.systems.vascular.visible>0);
   if(['chest','bones','surface','abdomen'].includes(key))await snap('female-'+key);
   await sex('male');const after=await read();
   ck(key+': male crop is retained',JSON.stringify(before.t.organView)===JSON.stringify(after.t.organView),{before:before.t.organView,after:after.t.organView});
   ck(key+': male meshes and opacities restore exactly',JSON.stringify(before.actual)===JSON.stringify(after.actual),{before:before.actual.length,after:after.actual.length});
   ck(key+': no opposite-body meshes remain',after.actual.length>0&&after.actual.every(n=>n.sex==='male'));
   ck(key+': independent meridian toggles preserved',JSON.stringify(before.display)===JSON.stringify(after.display));
   if(['chest','bones','surface','abdomen'].includes(key))await snap('male-'+key+'-returned');
  }
  // The scene, channel selection, local point and label flags travel together.
  await p.evaluate(()=>{const l=__ATLAS_LEARNING__;l.setMeridians(['HT','PC']);l.setTCMSide('left');l.selectPoint('PC6','left',false);document.querySelector('#pointNamesToggle').click();});await settle();
  await p.evaluate(()=>__ATLAS_SHARED__.choose('nerves',true,{keepSection:true}));await settle();const selected=await read();await sex('female');let r=await read();ck('Selected point and channel settings survive female switch',JSON.stringify(selected.display)===JSON.stringify(r.display),{before:selected.display,after:r.display});await sex('male');r=await read();ck('Selected point survives male return',r.display.selectedPoint?.code==='PC6'&&r.display.selectedPoint.side==='left');
  // Skin paint is checked in actual canvas pixels, separately from flags.
  for(const target of ['male','female']){await sex(target);await choose('surface');await p.evaluate(()=>{__ATLAS_LEARNING__.clearStudyContext(true);__ATLAS_LEARNING__.setTCMSide('both');__ATLAS_LEARNING__.setMeridians(['CV','HT','PC','ST']);__ATLAS_LEARNING__.fitMeridian([0,0,1]);});await settle();
   const feature=async(lines,points)=>{await p.evaluate(({lines,points})=>{const s=__ATLAS_LEARNING__.getState();if(s.linesOn!==lines)document.querySelector('#meridianLineToggle').click();if(s.pointsOn!==points)document.querySelector('#acupointToggle').click();if(s.namesOn)document.querySelector('#pointNamesToggle').click();},{lines,points});await settle();return p.locator('#viewport canvas').first().screenshot();};
   const blank=await feature(false,false),line=await feature(true,false),points=await feature(false,true);await feature(true,true);const a=await read(),skin=a.actual.filter(n=>n.system==='surface');const linePixels=diff(blank,line),pointPixels=diff(blank,points);report.pixelChecks.push({sex:target,linePixels,pointPixels});
   ck(target+': opaque skin and correct pigment body',skin.length>0&&skin.every(n=>n.opacity===1&&n.depth)&&a.ink.active&&a.ink.body===target&&!a.display.xray);
   ck(target+': drawn lines and dots are actually visible',linePixels>350&&pointPixels>150,{linePixels,pointPixels});await snap(target+'-opaque-skin');
  }
  await choose('bones');await p.locator('#labelsBtn').click();await settle();await sex('male');await sex('female');ck('Female labels contain only current female structures',await p.locator('#femaleStructureLabels button:visible').count()>0);await sex('male');ck('Female labels are removed on male return',await p.locator('#femaleStructureLabels button:visible').count()===0);await snap('male-bone-labels');
  // User-adjusted opacity and saved native combinations, not just default presets.
  await choose('nerves');await p.locator('#customLayers').evaluate(e=>e.open=true);await p.locator('#sharedOpacity-nervous').evaluate(e=>{e.value='55';e.dispatchEvent(new Event('input',{bubbles:true}));});await settle();await sex('female');r=await read();ck('User nerve opacity survives gender change',Math.abs(r.f.systems.nervous.opacity-.55)<.001);await sex('male');r=await read();ck('User nerve opacity survives return',Math.abs(r.t.systems.nervous.opacity-.55)<.001);
  await p.locator('#saveLayerCombo').click();const combo=await read();await choose('chest');await p.locator('#restoreLayerCombo').click();await settle();r=await read();ck('Saved combination restores native scope and opacities',r.s.scene===combo.s.scene&&JSON.stringify(r.actual)===JSON.stringify(combo.actual));
  // Interleave requested bodies and scenes before earlier actions resolve.
  await p.evaluate(()=>{window.__raceRequests=[__ATLAS_SHARED__.switchSex('female'),__ATLAS_SHARED__.choose('abdomen',false),__ATLAS_SHARED__.switchSex('male'),__ATLAS_SHARED__.choose('surface',false),__ATLAS_SHARED__.switchSex('female')];});await p.evaluate(()=>Promise.all(__raceRequests));await settle();r=await read();ck('Interleaved latest body and scene requests win together',r.s.sex==='female'&&r.s.scene==='surface'&&r.ink.body==='female'&&r.actual.every(n=>n.sex==='female'));ck('No unexpected transition errors',r.s.transitionErrors.length===0,r.s.transitionErrors);
  if(!live){
   const q=await context.newPage();q.on('pageerror',e=>report.errors.push(e.message));await q.goto(url);await q.waitForFunction(()=>window.__ATLAS_SHARED__);await q.evaluate(()=>__ATLAS_SHARED__.switchSex('female'));await q.route('**/female/digestive.glb',route=>route.abort('failed'));
   const failure=await q.evaluate(async()=>{try{await __ATLAS_SHARED__.choose('abdomen',false);return null;}catch(e){return e.message;}});ck('Injected asset failure is reported',!!failure);await q.waitForFunction(()=>!__ATLAS_SHARED__.getState().busy);const state=await q.evaluate(()=>({s:__ATLAS_SHARED__.getState(),f:__ATLAS_FEMALE__.getState()}));ck('Failed scene change rolls back to visible female bones',state.s.scene==='bones'&&state.f.systems.skeletal.visible>0&&!state.s.transition);
   await q.unroute('**/female/digestive.glb');await q.evaluate(()=>__ATLAS_SHARED__.choose('abdomen',false));const retry=await q.evaluate(()=>__ATLAS_FEMALE__.getState());ck('Failed layer can be retried without reload',retry.systems.digestive.visible>0);await q.close();
  }
  ck('No uncaught browser errors',report.errors.length===0,report.errors);
 }
 report.success=report.checks.every(c=>c.pass);report.finishedAt=new Date().toISOString();
 }catch(e){report.failure=e.stack;report.success=false;try{await p.screenshot({path:path.join(out,prefix+'-FAIL.png')});}catch{}console.error(e);if(!baseline)process.exitCode=1;}
 finally{fs.writeFileSync(path.join(out,prefix+'.json'),JSON.stringify(report,null,2));await browser?.close();server?.close();}
})().catch(e=>{console.error(e);process.exitCode=1});