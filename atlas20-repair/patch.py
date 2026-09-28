"""Repair state ownership in V20. Original models and point registrations remain unchanged."""
from pathlib import Path
import shutil
p=Path('fullbody-tcm-v20')
if p.exists(): shutil.rmtree(p)
shutil.copytree('fullbody-tcm-v19',p)
shutil.rmtree(p/'checks',ignore_errors=True)
for n in ['build-info.json','release.json']: (p/n).unlink(missing_ok=True)
def edit(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:120]);f.write_text(s.replace(old,new,1))
def insert(name,anchor,text):edit(name,anchor,text+'\n'+anchor)
insert('app.js','function exposeAPI(){',r'''
function captureBoneState(){return {region:state.region,side:state.side,selected:state.selected,bonesOn:state.bonesOn,boneOpacity:state.boneOpacity,labels:state.labels,hidden:[...state.hidden],isolated:state.isolated,neighbors:state.neighbors,ghost:state.ghost,explode:state.explode,mode:state.mode,poses:[...bones].map(([id,b])=>({id,offset:b.userData.offset.toArray(),rotation:b.quaternion.toArray()}))};}
function restoreBoneState(v){
 if(v.region&&REGION_LABELS[v.region])state.region=v.region;
 if(['left','right','both'].includes(v.side))state.side=v.side;
 if(v.selected&&BY_ID[v.selected])state.selected=v.selected;
 for(const k of ['bonesOn','boneOpacity','labels','isolated','neighbors','ghost'])if(k in v)state[k]=v[k];
 if(v.hidden)state.hidden=new Set(v.hidden);
 for(const item of v.poses||[]){const b=bones.get(item.id);if(b){b.userData.offset.fromArray(item.offset);b.quaternion.fromArray(item.rotation);}}
 if(v.mode)setMode(v.mode);setExplode(v.explode??state.explode,false);
 modelRoot.visible=state.bodySex!=='female';updateRegionUI();applyVisibility();updateTree();needsLabelRebuild=true;
 if(document.getElementById('bonesOn'))document.getElementById('bonesOn').checked=state.bonesOn;
 $('labelsBtn').classList.toggle('active',!!state.labels);$('labelsBtn').setAttribute('aria-pressed',String(!!state.labels));invalidate();
}
function prepareBodyScene(region='body') {restoreBoneState({region,side:'both',hidden:[],isolated:false,neighbors:false,ghost:false,explode:0,mode:'orbit',poses:[...bones].map(([id])=>({id,offset:[0,0,0],rotation:[0,0,0,1]}))});}
''')
edit('app.js','window.__FOOT_ATLAS__={captureCamera','window.__FOOT_ATLAS__={captureBoneState,restoreBoneState,prepareBodyScene,captureCamera')
edit('app.js','show=state.ghost&&moved&&b.visible&&!state.isolated',"show=state.bodySex!=='female'&&state.ghost&&moved&&b.visible&&!state.isolated")
edit('app.js','composer.render(dt);framesRendered++;','if(!state.bodyTransition){composer.render(dt);framesRendered++;}')
# Failed loads reject instead of being reported as successful blank scenes.
edit('tissues-v4.js',"toast('软组织加载失败：'+e.message);console.error(e);","s.error=e.message;throw e;")
edit('tissues-v4.js',"s.loaded=true;$(system+'Status')", "s.loaded=true;s.error=null;$(system+'Status')")
edit('tissues-v4.js',"ctx.learning.setSurfaceAttachment?.(false);$('surfaceAttach').checked=false;","$('surfaceAttach').checked=false;")
edit('tissues-v4.js',"ctx.learning.suspend(displaced&&state.bodySex!=='female');","ctx.learning.suspend(!!state.bodyTransition||displaced&&state.bodySex!=='female');")
edit('tissues-v4.js','const key=[state.bodySex,organBox?', 'const key=[state.bodyTransition,state.bodySex,organBox?')
edit('tissues-v4.js',"clearOrganScope:()=>{organBox=null;lastKey='';updateFrame();}","clearOrganScope:()=>{profile='custom';organBox=null;lastKey='';updateFrame();}")
insert('tissues-v4.js',' const api={',r'''
 function captureState(){return {profile,organBox:organBox&&[organBox.min.toArray(),organBox.max.toArray()],details,vesselFilter,earFilter,fascia,clipOn,nerveXray,localStudy,selected:selected?.id||null,isolated,hidden:[...hiddenStructures],bone:window.__FOOT_ATLAS__.captureBoneState(),systems:Object.fromEntries(Object.entries(systems).map(([id,s])=>[id,{on:s.on,opacity:s.opacity}]))};}
 async function restoreState(v){
  clearSelection();for(const [id,s]of Object.entries(v.systems||{})){await enable(id,!!s.on);setOpacity(id,s.opacity??1);}
  profile=v.profile||'custom';organBox=v.organBox?new THREE.Box3(new THREE.Vector3(...v.organBox[0]),new THREE.Vector3(...v.organBox[1])):null;
  details=!!v.details;vesselFilter=v.vesselFilter||'all';earFilter=v.earFilter||'all';fascia=!!v.fascia;clipOn=!!v.clipOn;nerveXray=!!v.nerveXray;localStudy=v.localStudy!==false;
  hiddenStructures.clear();for(const id of v.hidden||[])hiddenStructures.add(id);
  selected=v.selected?entries.get(v.selected)?.userData.atlas||null:null;isolated=!!v.isolated&&!!selected;state.tissueIsolated=isolated;
  window.__FOOT_ATLAS__.restoreBoneState(v.bone||{});
  for(const [id,value]of Object.entries({internalDetails:details,fasciaOn:fascia,tissueClip:clipOn,nerveXray,localStudyToggle:localStudy}))$(id).checked=value;
  $('vesselFilter').value=vesselFilter;$('earFilter').value=earFilter;lastKey='';updateFrame();
  document.body.classList.toggle('organ-view-active',!!organBox||['surface','vascular'].includes(profile));
  if(selected)choose(selected.id,false);return true;
 }
 async function ensureMeridianReference(){
  const meshes=await window.__ATLAS_TISSUES__.getSurfaceReferenceMeshes();root.updateWorldMatrix(true,true);
  if(!surfaceProjector)surfaceProjector=createSurfaceProjector(meshes,[...bones.values()].map(b=>new THREE.Box3().setFromObject(b).getCenter(new THREE.Vector3())));
  await ctx.learning.setReferenceBody('male',surfaceProjector,true);return true;
 }
''')
edit('tissues-v4.js',' const api={getSurfaceReferenceMeshes',' const api={setOrganScope:(bounds,name)=>{profile=name;organBox=new THREE.Box3(new THREE.Vector3(...bounds[0]),new THREE.Vector3(...bounds[1]));lastKey="";updateFrame();},captureState,restoreState,ensureMeridianReference,getSurfaceReferenceMeshes')
edit('learning-enhancements.js','routeRoot.visible=enabled&&!suspended&&!surfaceBusy','routeRoot.visible=!state.bodyTransition&&enabled&&!suspended&&!surfaceBusy')
edit('learning-enhancements.js','return enabled&&!suspended&&!surfaceBusy','return !state.bodyTransition&&enabled&&!suspended&&!surfaceBusy')
insert('learning-enhancements.js',' mountEvidenceUI(window.__ATLAS_LEARNING__);',r'''
 window.__ATLAS_LEARNING__.restoreDisplayState=(v,{selection=true}={})=>{
  clearStudyContext(true);setMeridians(v.selectedMeridians||['HT','PC']);
  tcmSide=v.tcmSide||'both';linesOn=!!v.linesOn;pointsOn=!!v.pointsOn;namesOn=!!v.namesOn;xray=!!v.xray;guideOn=v.guideOn!==false;curveStyle=v.curveStyle||'smooth';precisionMode='illustrative';enabled=!!v.enabled;autoFocus=v.autoFocus!==false;
  $('curveStyle').value=curveStyle;$('tcmXray').checked=xray;$('guideToggle').checked=guideOn;
  for(const r of routeRecords)for(const g of r.guides)for(const obj of [g.guide,g.border]){obj.material.dashed=curveStyle==='dashed';obj.material.needsUpdate=true;}
  if(selection&&v.selectedPoint){const q=pointIndex.get(v.selectedPoint.code+'|'+v.selectedPoint.side)||pointIndex.get(v.selectedPoint.code+'|midline');if(q){selectPoint(q,false);if(!v.studyContext)studyContext=null;}}
  enabled=!!v.enabled;if(!v.cardOpen){cardOpen=false;card.hidden=true;}syncReferenceWindow();updateOverlayVisibility();updateStatus();
 };
''')
edit('learning-enhancements.js',"if(autoSpeak())speak(p.name);return true;","if(autoSpeak()&&!state.bodyTransition)speak(p.name);return true;")
# Corresponding female scenes have their own correct scope, not a chest fallback.
edit('female-v12.js',"heart:'chest'","heart:'heart'")
edit('female-v12.js',"chest:['respiratory','vascular','surface','skeletal'],abdomen:['digestive','urinary','surface','skeletal'],pelvis:['reproductive','skeletal','urinary','surface']","chest:['respiratory','vascular','skeletal'],heart:['vascular','skeletal'],abdomen:['digestive','urinary','skeletal'],pelvis:['reproductive','skeletal','urinary']")
edit('female-v12.js',"vessels:['vascular','surface','skeletal'],bones:['skeletal']","vessels:['vascular','skeletal'],bones:['skeletal']")
edit('female-v12.js',"nerves:['nervous'],vessels:","nerves:['nervous','skeletal'],vessels:")
edit('female-v12.js',"if(['chest','abdomen','pelvis','vessels'].includes(id)){systems.get('surface').opacity=.18;systems.get('skeletal').opacity=.40;}","if(['chest','heart','abdomen','pelvis','vessels','nerves'].includes(id)){systems.get('skeletal').opacity=.32;}")
edit('female-v12.js',"if(preset==='chest')return", "if(preset==='heart')return r.system==='skeletal'||r.system==='vascular'&&r.ancestry.some(n=>/heart|aorta|vena_cava|pulmonary|cardiac/.test(n));if(preset==='chest')return")
edit('female-v12.js',"if(['respiratory','vascular','digestive','urinary','reproductive'].includes(row.system))await ensureBodyContext();","")
edit('female-v12.js',"await learning.setReferenceBody('male',null,false);", "await learning.setReferenceBody('male',null,true);")
edit('female-v12.js',"async function setSex(sex,options={}){", "async function setSex(sex,options={}){\n  if(!options.managed&&window.__ATLAS_SHARED__)return window.__ATLAS_SHARED__.switchSex(sex);")
edit('female-v12.js',"async function setPreset(id,options={}){", "async function setPreset(id,options={}){if(!options.managed&&window.__ATLAS_SHARED__)return window.__ATLAS_SHARED__.choose(id==='vessels'?'vascular':id,!!options.preserveView,{keepSection:true});")
edit('female-v12.js',"learning.suspend(false);return true;", "if(!state.bodyTransition)learning.suspend(false);return true;")
insert('female-v12.js',' const api={',r'''
 function captureState(){return {preset,selected,isolated,mode,side,labelsOn,hidden:[...hidden],systems:Object.fromEntries([...systems].map(([id,s])=>[id,{on:s.on,opacity:s.opacity}]))};}
 async function restoreState(v){
  serial++;for(const [id,s]of systems)s.on=!!v.systems?.[id]?.on;
  for(const [id,s]of Object.entries(v.systems||{})){await enable(id,s.on);systems.get(id).opacity=s.opacity??1;}
  preset=v.preset||'custom';selected=v.selected&&maps.has(v.selected)?v.selected:null;isolated=!!v.isolated&&!!selected;mode=v.mode||'solid';side=v.side||'both';labelsOn=!!v.labelsOn;
  hidden.clear();for(const id of v.hidden||[])hidden.add(id);$('femaleMode').value=mode;$('femaleSide').value=side;update();renderList();if(selected)showSelected();else showIntro();return true;
 }
''')
edit('female-v12.js',' const api={setLabels',' const api={captureState,restoreState,setLabels')
edit('female-v12.js',"async function select(id,doFocus=true){", "async function select(id,doFocus=true){if(!state.bodyTransition&&window.__ATLAS_SHARED__)return window.__ATLAS_SHARED__.runMutation('selection',()=>select(id,doFocus));")
edit('stability-v10.js',"if(!restoring&&location.protocol!=='file:')", "if(!restoring&&document.body.dataset.bodySwitching!=='true'&&location.protocol!=='file:')")
insert('stability-v10.js'," window.addEventListener('atlas:selection'", " window.addEventListener('atlas:transition-settled',update);")
# Shared UI remains in place; replace only the action ownership and adapter calls.
s=(p/'shared-v14.js').read_text()
a=s.index(' let actionTail=Promise.resolve()');b=s.index(' function fail(e)',a)
s=s[:a]+Path('atlas20-repair/transaction-block.js').read_text()+s[b:]
a=s.index(' async function chooseNow(');b=s.index(" $('bodySelector').querySelectorAll",a)
s=s[:a]+Path('atlas20-repair/switch-block.js').read_text()+s[b:]
s=s.replace("function opacityLayer(l,v){", "function opacityLayer(l,v){return enqueueAction('opacity:'+l.id,()=>{layoutRevision++;opacityLayerNow(l,v);});}\n function opacityLayerNow(l,v){",1)
a=s.index(" $('sharedDisplay').onchange=");b=s.index('\n const more=',a)
s=s[:a]+" $('sharedDisplay').onchange=()=>{const mode=$('sharedDisplay').value;enqueueAction('display',()=>{layoutRevision++;applyDisplayMode(mode);}).catch(fail);};"+s[b:]
s=s.replace("function enableLayerNow(l,on){", "function enableLayerNow(l,on){layoutRevision++;",1)
s=s.replace("if(female.active)await female.select(id,true);else", "layoutRevision++;scene='custom';if(female.active){female.setCustom();await female.select(id,true);}else",1)
s=s.replace("function currentId(){return female.active?female.getState().selected:window.__ATLAS_STUDY__?.getState().current?.id;}","function currentId(){const c=window.__ATLAS_STUDY__?.getState().current;return female.active?female.getState().selected:c&&['bone','tissue'].includes(c.kind)?c.id:null;}")
s=s.replace("document.addEventListener('click',e=>{const b=e.target.closest('[data-side]');if(!b)return;if(female.active){e.preventDefault();e.stopImmediatePropagation();female.setSide(b.dataset.side);}schedule();},true);", "document.addEventListener('click',e=>{const b=e.target.closest('[data-side]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();enqueueAction('side',()=>{layoutRevision++;if(female.active)female.setSide(b.dataset.side);else window.__FOOT_ATLAS__.restoreBoneState({side:b.dataset.side});}).catch(fail);},true);")
s=s.replace(" for(const e of ['atlas:profile-changed'", " window.addEventListener('atlas:tcm-visibility',()=>{if(learning.getState().enabled&&!state.bodyTransition)enqueueAction('reference',()=>bindReference(true)).catch(fail);});\n for(const e of ['atlas:profile-changed'",1)
s=s.replace("scene};savedCombo[sex()]", "scene,native:captureNative(),learning:learning.getState()};savedCombo[sex()]",1)
s=s.replace("if(!v)return toast('请先保存一个组合');const initialSex", "if(!v)return toast('请先保存一个组合');layoutRevision++;if(v.native){await restoreNative(v.native);await bindReference();scene=v.scene;$('sharedDisplay').value=v.display;if(v.learning)learning.restoreDisplayState(v.learning);return;}const initialSex",1)
s=s.replace('await bindVisibleSurface();scene=v.scene;',"await bindReference();scene=v.scene;",1)
s=s.replace("busy:sexSwitching||queuedActions>0", "busy:sexSwitching||queuedActions>0,layoutRevision,transition:state.bodyTransition||false,transitionErrors:[...transitionErrors]")
s=s.replace("const api={showSection", "const api={runMutation:(key,fn)=>enqueueAction(key,()=>{layoutRevision++;return fn();}),showSection",1)
(p/'shared-v14.js').write_text(s)
edit('refinement-v12.js',"if(female.active)return;const s=tissues.getState();", "if(female.active||document.body.dataset.bodySwitching==='true')return;const s=tissues.getState();")
for name in ['app.js','index.html','index.template.html','shared-v14.js','learning-enhancements.js']:
 f=p/name;s=f.read_text().replace('19.0.0','20.0.0').replace('V19 · 皮肤绘线与图层切换','V20 · 男女场景同步').replace('V19 皮肤绘线与图层切换','V20 男女场景同步');f.write_text(s)
with (p/'shared-v14.css').open('a') as f:f.write('''\n#bodyTransitionNotice{position:absolute;z-index:150;left:50%;top:48%;transform:translate(-50%,-50%);padding:13px 22px;border:1px solid #c5d4c9;border-radius:12px;background:rgba(248,252,246,.96);color:#234c3e;box-shadow:0 5px 25px #20372c20;pointer-events:none}body[data-body-switching="true"] #viewport{pointer-events:none}body[data-body-switching="true"] #labels,body[data-body-switching="true"] .acupoint-labels,body[data-body-switching="true"] #femaleStructureLabels,body[data-body-switching="true"] #femalePointLabel{visibility:hidden!important}\n''')
print('V20 scene ownership patch assembled; original assets/point registration preserved.')
