from pathlib import Path
import shutil,json
base=Path('fullbody-tcm-v12');p=Path('fullbody-tcm-v13');tools=Path('atlas13-tools')
if p.exists():shutil.rmtree(p)
shutil.copytree(base,p,ignore=shutil.ignore_patterns('checks','*.glb','*.mp3','app.bundle.js','evidence.bundle.js','delivery-release.json'))
def edit(n,a,b):
 f=p/n;s=f.read_text();assert a in s,(n,a[:90]);f.write_text(s.replace(a,b))
for name in ['shared-v13.js','shared-v13.css','surface-v13.js','route-corridors-v13.js']:shutil.copy(tools/name,p/name)
edit('pronunciation-v5.js','export const TERMS={',"export const TERMS={\n '长强':{pinyin:'cháng qiáng',spoken:'常强'},'长强穴':{pinyin:'cháng qiáng xué',spoken:'常强穴'},")
edit('pronunciation-v5.js','return /椎|郄|俞|髂|骰|龈|攒竹|蠡沟|太冲|跖|跗|膻/','return /长强|椎|郄|俞|髂|骰|龈|攒竹|蠡沟|太冲|跖|跗|膻/')
edit('catalog-v10.js','const EXACT={',"const EXACT={GV1:{pinyin:'cháng qiáng',spokenText:'常强',aliases:['长强穴']},")
edit('speech-v4.js','const guarded=lookupTerm(text)?.readingGuard',"const fixed={'长强':'changqiang','长强穴':'changqiang','大椎':'dazhui','龈交':'yinjiao','郄门':'ximen','阴郄':'yinxi','膻中':'danzhong'};const fix=fixed[canonical(text)];if(fix){lastEngine='V13 专项读音';spokenText=lookupTerm(text)?.spokenText||speechHint(text);audio.playbackRate=rate;audio.src='./voice-corrected/'+fix+'.mp3';audio.play().catch(e=>{if(ticket!==serial)return;lastError=String(e);systemSpeak(text);});return true;}const guarded=lookupTerm(text)?.readingGuard")
edit('speech-v4.js','试听大椎','试听长强')
edit('speech-v4.js',"onclick=()=>speak('大椎')","onclick=()=>speak('长强')")
edit('speech-v4.js','大椎 <b>dà zhuī</b>','长强 <b>cháng qiáng</b>　大椎 <b>dà zhuī</b>')
edit('speech-v4.js','playing:!audio.paused||!!utterance,currentTime:','playing:!audio.paused||!!utterance,audioURL:audio.currentSrc||audio.src,currentTime:')
edit('speech-v4.js','本版未重新生成或逐条审听全部音频。','长强等六个易错词使用专项消歧合成音频；全套音频尚未逐词审听。')
edit('learning-enhancements.js','import {canonicalPoint}',"import {correctRegionalReferences,createRegionalGuides} from './route-corridors-v13.js';\nimport {canonicalPoint}")
edit('learning-enhancements.js','ctx.ACUPOINTS=ctx.ACUPOINTS.map(canonicalPoint);','ctx.ACUPOINTS=correctRegionalReferences(ctx.ACUPOINTS.map(canonicalPoint));')
edit('learning-enhancements.js',"HT:'#a82f63'","HT:'#bd3657'")
edit('learning-enhancements.js',"PC:'#893f76'","PC:'#137976'")
edit('learning-enhancements.js','createGuidePaths(THREE,bones,m.id,side,data)','createRegionalGuides(THREE,bones,m.id,side,data,createGuidePaths)')
f=p/'learning-enhancements.js';s=f.read_text()
for a,b in [
 ('toggleTCM(true);fitMeridian();return;','toggleTCM(true);return;'),
 ('setMeridians([...selectedMeridians]);toggleTCM(true);fitMeridian();','setMeridians([...selectedMeridians]);toggleTCM(true);'),
 ("setMeridians(['HT','SI']);toggleTCM(true);fitMeridian();","setMeridians(['HT','SI']);toggleTCM(true);"),
 ("setMeridians(['LU','LI']);toggleTCM(true);fitMeridian();","setMeridians(['LU','LI']);toggleTCM(true);"),
 ("setMeridians(['EX']);toggleTCM(true);fitMeridian([0,.04,1]);","setMeridians(['EX']);toggleTCM(true);"),
 ("setMeridian($('meridianQuick').value);toggleTCM(true);fitMeridian();","setMeridian($('meridianQuick').value);toggleTCM(true);"),
 ('setTCMSide(b.dataset.tcmSide);fitMeridian();','setTCMSide(b.dataset.tcmSide);'),
 ("if(selectedMeridians.size===1&&selectedMeridians.has('GV')){ctx.setView('back');fitMeridian();}",''),
 ("if(id==='GV'||id==='BL'){ctx.setView('back');fitMeridian();}else if(id==='CV'){ctx.setView('front');fitMeridian();}",''),
 ('selectPoint(target,autoFocus);return;','selectPoint(target,false);return;'),
 ('function setMeridians(ids){ctx.invalidate();navigationFocus=null;','function setMeridians(ids){ctx.invalidate();'),
 ('if(selectedMeridians.has(id)&&selectedMeridians.size>1)selectedMeridians.delete(id);','if(selectedMeridians.has(id))selectedMeridians.delete(id);'),
 ("fitMeridian();toast(meridianMap[r.meridian].name+' · 已聚焦所选线路')","toast(meridianMap[r.meridian].name+' · 已选择，视角保持')"),
 ('surfaceProjector.project(p.sourcePosition,4.1)','surfaceProjector.project(p.sourcePosition,2.2,{meridian:r.meridian,side:r.side,region:p.region,view:p.view})'),
 ('surfaceProjector.curve(g.sourcePoints)','surfaceProjector.curve(g.sourcePoints,{meridian:r.meridian,side:r.side})'),
 ('sourceCoordinatesUnchanged:true','originalRecordsPreserved:true,navigationRevision:13'),
 ("getRouteScreen:(id,side='right')=>","getRouteGeometry:()=>routeRecords.map(r=>({meridian:r.meridian,side:r.side,branches:r.guides.map(g=>g.points.map(v=>v.toArray()))})),getRouteScreen:(id,side='right')=>"),
 ('mapped:p.mapped,region:p.region','pinyin:p.pinyin,mapped:p.mapped,region:p.region'),
 ('sourcePosition:(p.sourcePosition||p.position).toArray(),','sourcePosition:(p.sourcePosition||p.position).toArray(),originalPosition:p.originalPosition||null,navigationRevision:p.navigationRevision||null,'),
 ('window.__ATLAS_LEARNING__={','window.__ATLAS_LEARNING__={cancelPendingFocus:()=>{focusSerial++;navigationFocus=null;},')]:
 assert a in s,a[:100];s=s.replace(a,b)
f.write_text(s)
edit('tissues-v4.js',"from './surface-v11.js'","from './surface-v13.js'")
f=p/'app.js';s=f.read_text();s="import {initSharedControls} from './shared-v13.js';\n"+s
s=s.replace('function prepareReferenceFocus(){','function prepareReferenceFocus(){\n const hadVisibleBones=state.bonesOn;')
s=s.replace("if(state.region!=='body'||state.side!=='both'){state.side='both';setRegion('body',false,{keepStudy:true});}","if(hadVisibleBones&&(state.region!=='body'||state.side!=='both')){state.side='both';setRegion('body',false,{keepStudy:true});}")
a='femaleViewer=initFemale({initialHash:initialReferenceHash,';assert a in s;s=s.replace(a,'femaleViewer=initFemale({captureCamera,restoreCamera,initialHash:initialReferenceHash,')
a=' initRefinement({learning:learningEnhancements,tissues:tissueLayer,female:femaleViewer,invalidate,toast});';assert a in s;s=s.replace(a,a+'\n initSharedControls({THREE,camera,controls,learning:learningEnhancements,tissues:tissueLayer,female:femaleViewer,state,bones,toast,invalidate,captureCamera,restoreCamera});')
s=s.replace('function exposeAPI(){',"""function captureCamera(){cameraTween=null;learningEnhancements?.cancelPendingFocus?.();return {position:camera.position.toArray(),target:controls.target.toArray(),up:camera.up.toArray(),zoom:camera.zoom,near:camera.near,far:camera.far,view:camera.view?{...camera.view}:null,viewName:state.view};}
function restoreCamera(v){if(!v)return;cameraTween=null;learningEnhancements?.cancelPendingFocus?.();const d=controls.enableDamping;controls.enableDamping=false;controls.update();camera.position.fromArray(v.position);controls.target.fromArray(v.target);camera.up.fromArray(v.up);camera.zoom=v.zoom;camera.near=v.near;camera.far=v.far;if(v.view?.enabled)camera.setViewOffset(v.view.fullWidth,v.view.fullHeight,v.view.offsetX,v.view.offsetY,v.view.width,v.view.height);else camera.clearViewOffset();syncCameraUp();controls.update();controls.enableDamping=d;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);state.view=v.viewName;invalidate();}
function exposeAPI(){""")
s=s.replace('window.__FOOT_ATLAS__={','window.__FOOT_ATLAS__={captureCamera,restoreCamera,');f.write_text(s)
f=p/'female-v12.js';s=f.read_text()
s=s.replace("fetch('./assets/female/catalog.json')","fetch('../fullbody-tcm-v12/assets/female/catalog.json')")
s=s.replace("loader.loadAsync('./assets/female/'+id+'.glb')","loader.loadAsync('../fullbody-tcm-v12/assets/female/'+id+'.glb')")
s=s.replace('async function setPreset(id){','async function setPreset(id,options={}){')
s=s.replace("bones:['skeletal']}[id]","bones:['skeletal','surface'],muscles:['muscular','surface'],compare:['surface','skeletal','nervous']}[id]")
s=s.replace("mode=id==='breast'?'context':'solid'","mode=['breast','compare','bones','muscles'].includes(id)?'context':'solid'")
s=s.replace("view('front');document.body.classList.remove('nav-open','detail-open');return true;","if(!options.preserveView)view('front');if(!options.preservePanel)document.body.classList.remove('nav-open','detail-open');return true;")
s=s.replace("preset='custom';isolated=false;update();fit();","preset='custom';isolated=false;update();").replace("side=e.target.value;update();fit();","side=e.target.value;update();")
i=s.index(' async function setSex(sex)');j=s.index(' function syncSex()',i)
s=s[:i]+""" let sexSerial=0,sexBusy=false;
 const femaleSceneForMale=()=>({chest:'chest',heart:'chest',abdomen:'abdomen',vascular:'vessels',surface:'surface',bones:'bones',muscles:'surface',nerves:'nerves',compare:'surface'}[tissues.getState().profile]||'surface');
 const sceneLayers={surface:['surface'],chest:['respiratory','vascular'],abdomen:['digestive','urinary'],pelvis:['reproductive','skeletal','urinary'],breast:['breast'],nerves:['nervous'],vessels:['vascular'],bones:['skeletal','surface']};
 function transferView(v,toFemale){
  // Frame normalization preserves angle and apparent scale, not clinical registration.
  const scale=toFemale?1666.348/1700:1700/1666.348,from=toFemale?[99.553,0,-20]:[94.159,-34.761,-58],to=toFemale?[94.159,-34.761,-58]:[99.553,0,-20];
  const map=a=>a.map((x,i)=>to[i]+(x-from[i])*scale);return {...v,position:map(v.position),target:map(v.target),near:v.near*scale,far:v.far*scale};
 }
 async function setSex(sex){
  if(!['male','female'].includes(sex))return false;
  const ticket=++sexSerial;if((sex==='female')===active&&!sexBusy)return true;sexBusy=true;switcher.setAttribute('aria-busy','true');
  try{if(sex==='female'){
   const wanted=femaleSceneForMale();await getCatalog();await Promise.all(sceneLayers[wanted].map(k=>enable(k,true)));if(ticket!==sexSerial)return false;
   const priorCamera=ctx.captureCamera(),viewState={nav:document.body.classList.contains('nav-open'),detail:document.body.classList.contains('detail-open')};
   saved={view:state.view,region:state.region,side:state.side,bonesOn:state.bonesOn,profile:tissues.getState().profile,systems:tissues.getState().systems,cameraState:priorCamera,surfaceAttached:learning.getState().surfaceAttached,enabled:learning.getState().enabled};
   speech.stop?.();setMode('orbit');learning.cancelPendingFocus?.();learning.toggleTCM(false);learning.suspend(true);
   for(const k of Object.keys(tissues.getState().systems))await tissues.enable(k,false);if(ticket!==sexSerial)return false;
   tissues.clearSelection();state.bonesOn=false;applyVisibility();active=true;state.bodySex='female';document.body.classList.add('female-view','organ-view-active');modelRoot.visible=false;root.visible=true;pane.hidden=false;detail.hidden=false;
   await setPreset(wanted,{preserveView:true,preservePanel:true});if(ticket!==sexSerial)return false;
   ctx.restoreCamera(transferView(priorCamera,true));document.body.classList.toggle('nav-open',viewState.nav);document.body.classList.toggle('detail-open',viewState.detail);
  }else{
   if(!active)return true;const priorCamera=ctx.captureCamera();serial++;active=false;state.bodySex='male';root.visible=false;pane.hidden=true;detail.hidden=true;tag.hidden=true;document.body.classList.remove('female-view','organ-view-active');modelRoot.visible=true;
   state.bonesOn=saved?.bonesOn??true;await tissues.setProfile(saved?.profile&&saved.profile!=='custom'?saved.profile:'bones');if(ticket!==sexSerial)return false;
   setRegion(saved?.region||'body',false);ctx.setSide(saved?.side||'both');
   if(saved?.systems)for(const[k,v]of Object.entries(saved.systems)){await tissues.enable(k,v.on);tissues.setOpacity(k,v.opacity);}
   state.bonesOn=saved?.bonesOn??true;applyVisibility();learning.suspend(false);if(saved?.surfaceAttached)await tissues.attachSurface(true);learning.toggleTCM(!!saved?.enabled);
   ctx.restoreCamera(transferView(priorCamera,false));$('renderStatus').textContent='男性 · 解剖参考';try{history.replaceState(null,'',location.pathname+location.search);}catch{}
  }
  syncSex();invalidate();window.dispatchEvent(new CustomEvent('atlas:sex-changed',{detail:{sex:active?'female':'male'}}));return true;
  }catch(e){toast('模型切换失败，可重试：'+e.message);throw e;}finally{if(ticket===sexSerial){sexBusy=false;switcher.setAttribute('aria-busy','false');syncSex();}}
 }
"""+s[j:]
s=s.replace('const api={get active()',"const api={setDisplayMode:v=>{if(['solid','context','focus'].includes(v)){mode=v;$('femaleMode').value=v;update();}},setSide:v=>{if(['both','left','right'].includes(v)){side=v;$('femaleSide').value=v;update();}},get active()")
s=s.replace('getState:()=>({active,preset','getState:()=>({sexBusy,active,preset');f.write_text(s)
f=p/'refinement-v12.css';s=f.read_text().replace('.female-view .sidebar>*:not(#femaleLibrary){display:none!important}','.female-view .sidebar>.bone-pane{display:none!important}').replace('.female-view .detail-panel>*:not(#femaleDetail){display:none!important}','.female-view .detail-panel>.detail-top{display:none!important}');f.write_text(s)
for n in ['index.html','index.template.html']:
 f=p/n;s=f.read_text().replace('V12','V13').replace('双参考与简洁观察','视角保持与经脉分辨');s=s.replace('</head>','<link rel="stylesheet" href="shared-v13.css"></head>');f.write_text(s)
for n in ['female-v12.js','refinement-v12.js','app.js','learning-enhancements.js']:
 f=p/n;s=f.read_text().replace("version:'12.0.0'","version:'13.0.0'").replace('version:"12.0.0"','version:"13.0.0"');f.write_text(s)
(p/'build-info.json').write_text(json.dumps({'version':'13.0.0','base':'V12.0.1','anatomyGeometryUnchanged':True,'navigationCorridorRevision':13,'clinicalCalibration':False,'femaleAcupointRegistration':False,'allAudioHumanReviewed':False,'cameraSelectorsPreserveView':True,'sharedGenderControls':True},ensure_ascii=False,indent=2))
if (tools/'README.md').exists():shutil.copy(tools/'README.md',p/'README.md')
print('V13_SOURCE_READY')
