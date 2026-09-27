from pathlib import Path
import shutil
base=Path('fullbody-tcm-v16');dst=Path('fullbody-tcm-v17')
if dst.exists():shutil.rmtree(dst)
shutil.copytree(base,dst,ignore=shutil.ignore_patterns('checks','delivery-release.json','build-info.json'))
(dst/'checks').mkdir()
shutil.copy('atlas17-delivery/surface-v17.js',dst/'surface-v17.js')
def edit(name,fn):
 f=dst/name;f.write_text(fn(f.read_text()))
def rep(s,a,b):
 assert a in s,a[:130]
 return s.replace(a,b)
f=dst/'learning-enhancements.js';s=f.read_text()
s=s.replace('namesOn=true, xray=true','namesOn=true, xray=false').replace('type="checkbox" checked>透视点线（背侧也可见，非体表深度）','type="checkbox">透视辅助（看背侧，不改变贴面位置）')
s=s.replace('if(surfaceAttached)xray=false;','')
s=s.replace('if(surfaceAttached&&surfaceProjector)return surfaceProjector.isVisible(p.position,camera.position);if(xray)return true;','if(xray)return true;if(surfaceAttached&&surfaceProjector)return surfaceProjector.isVisible(p.position,camera.position);')
s=s.replace("state.bodySex==='female')return false;","state.bodySex==='female'&&displayBody!=='female')return false;").replace("value=!!value||ctx.state.bodySex==='female';","value=!!value;")
s=s.replace("routeRoot.visible=enabled&&!suspended&&precisionMode==='illustrative';","routeRoot.visible=enabled&&!suspended&&displayBody===(state.bodySex||'male')&&precisionMode==='illustrative';")
s=s.replace('getVisiblePoints(){const box=referenceWindow();return enabled&&!suspended&&pointsOn',"getVisiblePoints(){const box=referenceWindow();return enabled&&!suspended&&displayBody===(state.bodySex||'male')&&pointsOn")
s=s.replace("if(state.bodySex==='female'){window.__ATLAS_FEMALE__?.clearSelection();p={...p,position:null,navigationArea:null,landmarks:[]};toggleTCM(true);}","if(state.bodySex==='female'){window.__ATLAS_FEMALE__?.clearSelection();p={...p,landmarks:[]};if(!pointIndex.has(p.code+'|'+p.side))p={...p,position:null,navigationArea:null};toggleTCM(true);}")
s=rep(s,"if(state.bodySex==='female'){$('focusPointBtn').disabled=true;$('focusPointBtn').textContent='此模型暂无点位';const hint=document.createElement('p');hint.className='shared-coverage';hint.textContent='介绍与名称共用；女性三维点位未标注，当前视角不变。';card.querySelector('.tcm-card-actions').after(hint);}","if(state.bodySex==='female'){const hint=document.createElement('small');hint.className='shared-coverage';hint.textContent='女性体表适配示意 · 尚未逐穴校准';card.querySelector('.tcm-card-actions').after(hint);}")
s=s.replace("function setStudyContext(p){if(state.bodySex==='female'){studyContext=null;return;}","function setStudyContext(p){").replace('切换图层不改变视角；女性点位尚未标注。','切换图层不改变视角；当前位置为女性体表适配示意。').replace('本次显示投影相对原部位参照偏移约 ','本次显示相对原部位参照位移约 ').replace('个模型毫米；这不是定位误差或临床精度。','个模型单位；跨模型形态适配不是定位误差或临床精度。')
start=s.index(' let surfaceDesired=false,surfaceTask=null;');end=s.index('\n window.__ATLAS_LEARNING__=',start)
s=s[:start]+r''' let surfaceDesired=false,surfaceTask=null,displayBody='male',requestedBody='male';
 const providers={male:null,female:null};let configRevision=0;
 async function setDisplayBody(body,provider){
  if(!['male','female'].includes(body))throw Error('未知参考人体');
  if(provider)providers[body]=provider;
  requestedBody=body;configRevision++;
  if(body==='female')surfaceDesired=true;
  return applySurfaceConfiguration();
 }
 function setSurfaceAttachment(on){surfaceDesired=!!on;configRevision++;return applySurfaceConfiguration();}
 function applySurfaceConfiguration(){
  if(surfaceTask)return surfaceTask;
  surfaceBusy=true;
  surfaceTask=(async()=>{try{for(;;){
   const rev=configRevision,body=requestedBody,target=surfaceDesired,provider=providers[body];
   const useSurface=target||body==='female';if(useSurface&&!provider)return false;
   const pending=[];
   for(const r of routeRecords){
    const context={meridian:r.meridian,side:r.side};
    const anchors=r.data.map(p=>{if(!p.sourcePosition)p.sourcePosition=p.position.clone();return {code:p.code,source:p.sourcePosition,point:useSurface?provider.project(p.sourcePosition,2.8,{...context,region:p.region,view:p.view}):p.sourcePosition.clone(),region:p.region,view:p.view};});
    const guides=[];
    for(const g of r.guides){if(!g.sourcePoints){g.sourcePoints=g.points.map(v=>v.clone());g.sourceGeometry=g.tube.geometry;}
     if(!g.bodyProjection)g.bodyProjection={};
     if(useSurface&&!g.bodyProjection[body])g.bodyProjection[body]=provider.curve(g.sourcePoints,{...context,anchors});
     guides.push({g,value:useSurface?g.bodyProjection[body]:{points:g.sourcePoints,geometry:g.sourceGeometry}});
    }
    pending.push({r,anchors,guides});await new Promise(resolve=>setTimeout(resolve,0));if(rev!==configRevision)break;
   }
   if(rev!==configRevision)continue;
   for(const {r,anchors,guides}of pending){r.data.forEach((p,i)=>p.position.copy(anchors[i].point));
    for(const {g,value}of guides){g.tube.geometry=value.geometry;g.points=value.points;const geometry=new LineGeometry().setPositions(g.points.flatMap(v=>v.toArray()));const old=g.guide.geometry;g.guide.geometry=geometry;g.border.geometry=geometry;old.dispose();g.guide.computeLineDistances();g.border.computeLineDistances();}
   }
   displayBody=body;surfaceProjector=provider||providers.male;surfaceAttached=useSurface;
   surfaceBadge.hidden=!enabled||!surfaceAttached;lastReferenceWindowKey='';lastLabelRebuild='';lastLabelsAt=0;studyContext=null;navigationFocus=null;
   if(selectedPoint){const p=pointIndex.get(selectedPoint.code+'|'+selectedPoint.side);if(p){selectedPoint={...selectedPoint,position:p.position,landmarks:body==='female'?[]:selectedPoint.landmarks};if(selectedMarker?.isPoints)selectedMarker.geometry.setFromPoints([p.position]);}}
   syncReferenceWindow();updateOverlayVisibility();ctx.invalidate();if(rev===configRevision)break;
  }return true;}finally{surfaceBusy=false;surfaceTask=null;}})();return surfaceTask;
 }
 function visibilityAudit(){const pts=getVisiblePoints();return {body:displayBody,source:surfaceProjector?.body,xray,attached:surfaceAttached,points:pts.map(p=>({code:p.code,side:p.side,position:p.position.toArray(),screen:project(p),unoccluded:pointUnoccluded(p),skinDistance:surfaceProjector?.distanceToSkin(p.position)})),depthTest:routeRecords.filter(routeMatches).every(r=>r.cloud.material.depthTest===!xray&&r.guides.every(g=>g.tube.material.depthTest===!xray)),clinicalCalibration:false};}
''' + s[end:]
s=s.replace('setSurfaceProjector:p=>{surfaceProjector=p;}',"setDisplayBody,visibilityAudit,setXray:value=>{xray=!!value;$('tcmXray').checked=xray;updateOverlayVisibility();},setSurfaceProjector:p=>{providers[p.body||'male']=p;if(displayBody===(p.body||'male'))surfaceProjector=p;}")
s=s.replace('getState:()=>({surfaceAttached,','getState:()=>({displayBody,surfaceAttached,')
s=s.replace("if(!p?.name||!p?.code)return false;ctx.invalidate();p=canonicalPoint(p);","if(!p?.name||!p?.code)return false;ctx.invalidate();p=canonicalPoint(p);const displayPoint=pointIndex.get(p.code+'|'+p.side);if(displayPoint)p={...p,position:displayPoint.position};")
f.write_text(s)
f=dst/'tissues-v4.js';s=f.read_text().replace("from './surface-v13.js'","from './surface-v17.js'").replace("ctx.learning.suspend(displaced||state.bodySex==='female')","ctx.learning.suspend(displaced&&state.bodySex!=='female')").replace("if(system==='surface'&&!on)","if(system==='surface'&&!on&&state.bodySex!=='female')")
s=s.replace('async function attachSurface(on){',"async function prepareSurfaceProjector(){const was=systems.surface.on;await enable('surface',true);if(!systems.surface.loaded)throw Error('体表未加载');root.updateWorldMatrix(true,true);if(!surfaceProjector)surfaceProjector=createSurfaceProjector(systems.surface.meshes);systems.surface.on=was;$('surfaceOn').checked=was;lastKey='';updateFrame();return surfaceProjector;}\n async function attachSurface(on){")
s=s.replace("const ticket=++attachmentSerial;\n  $('surfaceAttach')","if(state.bodySex==='female')return window.__ATLAS_FEMALE__.attachMeridians(on);const ticket=++attachmentSerial;\n  $('surfaceAttach')")
s=s.replace('const api={','const api={prepareSurfaceProjector,');f.write_text(s)
f=dst/'female-v12.js';s="import {createSurfaceProjector} from './surface-v17.js';\n"+f.read_text()
s=s.replace('async function setSex(sex){',r'''let meridianSurface=null,meridianSurfaceTask=null;
 async function prepareMeridianSurface(){
  if(meridianSurface)return meridianSurface;if(meridianSurfaceTask)return meridianSurfaceTask;
  meridianSurfaceTask=(async()=>{const was=systems.get('surface')?.on||false;await enable('surface',true);root.updateWorldMatrix(true,true);const source=await tissues.prepareSurfaceProjector();meridianSurface=createSurfaceProjector(systems.get('surface').meshes,{sex:'female',source});systems.get('surface').on=was;update();return meridianSurface;})().finally(()=>meridianSurfaceTask=null);return meridianSurfaceTask;
 }
 async function attachMeridians(on){const p=await prepareMeridianSurface();await learning.setDisplayBody('female',p);if(on)await enable('surface',true);learning.suspend(false);invalidate();return true;}
 async function setSex(sex){''')
s=s.replace('ctx.restoreCamera(transferView(priorCamera,true));',"await learning.setDisplayBody('female',await prepareMeridianSurface());learning.suspend(false);learning.toggleTCM(tcmEnabled);ctx.restoreCamera(transferView(priorCamera,true));")
s=s.replace("active=false;state.bodySex='male';root.visible=false;","active=false;state.bodySex='male';await learning.setDisplayBody('male');root.visible=false;")
s=s.replace('const api={ensureBodyContext','const api={prepareMeridianSurface,attachMeridians,ensureBodyContext')
s=s.replace("e.preventDefault();e.stopImmediatePropagation();return;}const v=t.dataset.view","e.preventDefault();e.stopImmediatePropagation();learning.focusSelectedPoint();return;}const v=t.dataset.view")
s=s.replace("if(e.key.toLowerCase()==='f'&&!document.body.classList.contains('reference-detail'))focus();","if(e.key.toLowerCase()==='f'){if(document.body.classList.contains('reference-detail'))learning.focusSelectedPoint();else focus();}")
f.write_text(s)
f=dst/'shared-v14.js';s=f.read_text().replace('女性点位未标注；名称、搜索与介绍照常使用。','女性体表适配示意；名称与操作共用，未做逐穴定位校准。').replace("e.disabled=f;e.closest('label')","e.disabled=f&&id!=='surfaceAttach';e.closest('label')")
s=s.replace("$(id).disabled=f;$(id).title=f?'女性点位尚未标注；名称与介绍正常可查':'';","$(id).disabled=false;$(id).title='';").replace("$(id).disabled=f;if(f)$(id).textContent='点位未标注';","$(id).disabled=false;").replace("$('focusCurrent').disabled=f&&currentReference;","$('focusCurrent').disabled=false;")
s=s.replace("await female.setPreset(mapping[key],{preserveView:preserve,preservePanel:true});","await female.setPreset(mapping[key],{preserveView:preserve,preservePanel:true});if(key==='surface'){await female.attachMeridians(true);learning.toggleTCM(true);}")
s=s.replace("if(female.active&&currentReference){e.preventDefault();e.stopImmediatePropagation();}","if(female.active&&currentReference){e.preventDefault();e.stopImmediatePropagation();learning.focusSelectedPoint();}")
s=s.replace("'V16 · 平板与人体观察'","'V17 · 男女体表经络'").replace("'V15 · 经络与切换修订'","'V17 · 男女体表经络'").replace("version:'16.0.1'","version:'17.0.0'");f.write_text(s)
edit('app.js',lambda s:rep(s,'if(femaleViewer?.active){femaleViewer.click(e);return;}if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;','if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;if(femaleViewer?.active){femaleViewer.click(e);return;}'))
edit('app.js',lambda s:s.replace('if(femaleViewer?.active){femaleViewer.focus();return;}','if(window.__ATLAS_LEARNING__?.hitPoint(e)){window.__ATLAS_LEARNING__.focusSelectedPoint();return;}if(femaleViewer?.active){femaleViewer.focus();return;}'))
edit('evidence-ui-v9.js',lambda s:s.replace("||document.body.dataset.bodySex==='female'",''))
f=dst/'shared-v14.css';f.write_text(f.read_text()+'''
body.female-view[data-shared-ui] #tcmStatus:not([hidden]),body.female-view[data-shared-ui] .acu-label-toolbar:not([hidden]){display:flex!important}
body.female-view[data-shared-ui] #v9PrecisionBadge:not([hidden]),body.female-view[data-shared-ui] .acupoint-labels:not([hidden]),body.female-view[data-shared-ui] .acupoint-label-wires:not([hidden]),body.female-view[data-shared-ui] .acupoint-label-nav:not([hidden]){display:block!important}
body.female-view[data-shared-ui] #tcmStatus[hidden],body.female-view[data-shared-ui] .acu-label-toolbar[hidden],body.female-view[data-shared-ui] #v9PrecisionBadge[hidden],body.female-view[data-shared-ui] .acupoint-labels[hidden],body.female-view[data-shared-ui] .acupoint-label-wires[hidden],body.female-view[data-shared-ui] .acupoint-label-nav[hidden]{display:none!important}
''')
for name in ['index.html','evidence.html','versions.html']:
 edit(name,lambda s:s.replace('fullbody-tcm-v16','fullbody-tcm-v17').replace('16.0.1','17.0.0').replace('V16 平板与人体观察','V17 男女体表经络'))
(dst/'README.md').write_text('''# V17 男女体表经络\n\n保留V16，正常遮挡与透视不改变点线位置。沿实际外表面法线留出细管间距；曲线平滑后重投影，避免切进皮肤。男女采用同一交互和分开的投影缓存。女性图形采用男女源体表分区比例对应并投影到女性自身皮肤，属于形态适配示意，不是独立标定的女性经穴数据。未改动解剖模型，不代表逐穴定位准确。保留多选、当前视角、原位器官和沉浸操作。\n''')
print('V17 sources prepared')
