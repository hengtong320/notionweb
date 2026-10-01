"""V28: body-specific outside-skin contact and side-effect-free state restoration."""
from pathlib import Path
import shutil,hashlib,json
src=Path('fullbody-tcm-v27');p=Path('fullbody-tcm-v28');tools=Path('atlas28-repair')
assert not p.exists(), 'Do not overwrite an existing release'
assert hashlib.sha256((src/'app.bundle.js').read_bytes()).hexdigest()=='428611725afdc06d60bb2cd1b4f96efa7f39dec15657ac2aceeddd5ad09f3f39'
shutil.copytree(src,p);shutil.rmtree(p/'checks',ignore_errors=True);(p/'checks').mkdir()
for n in ['build-info.json','release.json']:(p/n).unlink(missing_ok=True)
def edit(n,a,b):
 f=p/n;s=f.read_text();assert s.count(a)==1,(n,a[:90],s.count(a));f.write_text(s.replace(a,b))
for f in p.iterdir():
 if f.is_file() and f.suffix in ['.js','.html','.md'] and f.name!='app.bundle.js':
  f.write_text(f.read_text().replace('27.0.0','28.0.0').replace('fullbody-tcm-v27/','fullbody-tcm-v28/').replace('V27 · 观察与标注同步','V28 · 男女体表一致性'))
# Select the exposed contact in the established projection direction, not the
# nearest of a back and palm pair. Existing locality and same-side bounds stay.
edit('skin-v17.js',"hits.sort((a,b)=>local&&!palmar?a.point.distanceToSquared(world)-b.point.distanceToSquared(world):a.distance-b.distance);", "hits.sort((a,b)=>a.distance-b.distance);")
edit('skin-v17.js',"key:sex+'-skin-v25'", "key:sex+'-skin-v28-outer-contact'")
# Never insert a recorded path whose endpoints belong to the previous contacts.
edit('skin-v17.js',"if(a&&b&&path){", "if(a&&b&&path&&new THREE.Vector3(...path[0]).distanceTo(a.point)<3&&new THREE.Vector3(...path.at(-1)).distanceTo(b.point)<3){")
# Restore is not a fresh click: preserve off switches, current side and native
# isolated selection. Restore the point card without triggering body mutations.
edit('learning-enhancements.js',"function selectPoint(p,focus=false){", "function selectPoint(p,focus=false,{restoring=false}={}){")
edit('learning-enhancements.js',"if(state.bodySex==='female'){window.__ATLAS_FEMALE__?.clearSelection();", "if(state.bodySex==='female'){if(!restoring)window.__ATLAS_FEMALE__?.clearSelection();")
edit('learning-enhancements.js',"p={...p,landmarks:[]};toggleTCM(true);", "p={...p,landmarks:[]};if(!restoring)toggleTCM(true);")
edit('learning-enhancements.js',"if(p.position||p.navigationArea){if(!selectedMeridians", "if(!restoring&&(p.position||p.navigationArea)){if(!selectedMeridians")
edit('learning-enhancements.js',"if(p.side!=='midline'){const physical", "if(!restoring&&p.side!=='midline'){const physical")
edit('learning-enhancements.js',"selectedPoint=p;pointsOn=true;labelPage=0;", "selectedPoint=p;if(!restoring)pointsOn=true;labelPage=0;")
edit('learning-enhancements.js',"if(autoSpeak()&&!state.bodyTransition)speak(p.name);", "if(!restoring&&autoSpeak()&&!state.bodyTransition)speak(p.name);")
edit('learning-enhancements.js',"if(q){selectPoint(q,false);if(!v.studyContext)", "if(q){selectPoint(q,false,{restoring:true});if(!v.studyContext)")
edit('learning-enhancements.js',"syncReferenceWindow();updateOverlayVisibility();updateStatus();\n };", "syncReferenceWindow();updateOverlayVisibility();updateStatus();\n  for(const [id,on]of [['meridianLineToggle',linesOn],['acupointToggle',pointsOn],['pointNamesToggle',namesOn]]){ $(id).classList.toggle('active',on);$(id).setAttribute('aria-pressed',String(on));}\n  for(const b of panel.querySelectorAll('[data-tcm-side]')){b.classList.toggle('active',b.dataset.tcmSide===tcmSide);b.setAttribute('aria-pressed',String(b.dataset.tcmSide===tcmSide));}\n };")
# Stronger commit boundary: point, cloud, guide and pigment all share one body.
edit('learning-enhancements.js',"r.ink=ink;if(ink){ink.mesh.userData.meridian", "r.ink=ink;if(ink){ink.mesh.userData.referenceBody=body;ink.mesh.userData.projectorKey=projector.key;ink.mesh.userData.meridian")
edit('learning-enhancements.js',"for(const {r,anchors,guides,ink}of pending){", "if(pending.length!==routeRecords.length)throw Error('体表点线尚未完整构建');\n    for(const {r,anchors,guides,ink}of pending){")
edit('learning-enhancements.js',"&&pointsOn&&!!(selectedPoint?.position||selectedPoint?.navigationArea)", "&&pointsOn&&!!selectedPoint&&routeMatches(selectedPoint)&&!!(selectedPoint.position||selectedPoint.navigationArea)")
# Screen placement is part of the camera state, including full-body view offsets.
edit('app.js',"camera.far=v.far;camera.clearViewOffset();syncCameraUp();", "camera.far=v.far;camera.clearViewOffset();if(v.view?.enabled)camera.setViewOffset(v.view.fullWidth,v.view.fullHeight,v.view.offsetX,v.view.offsetY,v.view.width,v.view.height);syncCameraUp();")
# Add narrow inspection and local-observation transfer APIs inside the owner of
# point positions. A counterpart can change position without being inaccurate.
f=p/'learning-enhancements.js';s=f.read_text();key=" window.__ATLAS_LEARNING__={";assert s.count(key)==1
s=s.replace(key,(tools/'surface-transfer.txt').read_text()+'\n'+key)
s=s.replace("window.__ATLAS_LEARNING__={getInkAudit:","window.__ATLAS_LEARNING__={captureSurfaceObservation,transferSurfaceObservation,getSurfaceConsistencyAudit,getInkAudit:")
f.write_text(s)
# Capture the semantic point before camera snapshot cancels pending focus. Pass
# that snapshot into the sex transaction, not a second already-suspended one.
edit('shared-v14.js',"learning:learning.getState(),camera:captureCamera()", "learning:learning.getState(),surfaceObservation:learning.captureSurfaceObservation(),camera:captureCamera()")
edit('shared-v14.js',"return await fn();", "return await fn(previous);")
edit('shared-v14.js',"function switchSex(target){return enqueueAction('sex',()=>switchSexNow(target));}","function switchSex(target){return enqueueAction('sex',previous=>switchSexNow(target,previous));}")
edit('shared-v14.js',"async function switchSexNow(target){", "async function switchSexNow(target,previous){")
edit('shared-v14.js',"const was=captureWorkspace(),from=sex()", "const was=previous||captureWorkspace(),from=sex()")
edit('shared-v14.js',"restoreCamera(was.camera);section=was.section;", "restoreCamera(learning.transferSurfaceObservation(was.surfaceObservation,was.camera));section=was.section;")
# During the transaction there is no click target on the old body. Keep the
# sex selector usable so rapid sex clicks retain existing last-request handling.
edit('shared-v14.js',"const switchNotice=document.createElement('div');", "function lockSurfaceInputs(on){for(const sel of ['#tcmControls','.study-toolbar','#tcmPointCard','#acupointLabels','#v26PointSummary']){const e=document.querySelector(sel);if(e)e.inert=on;}}\n const switchNotice=document.createElement('div');")
edit('shared-v14.js',"state.bodyTransition=true;document.body.dataset.bodySwitching", "state.bodyTransition=true;lockSurfaceInputs(true);document.body.dataset.bodySwitching")
edit('shared-v14.js',"finally{state.bodyTransition=false;document.body.dataset.bodySwitching", "finally{state.bodyTransition=false;lockSurfaceInputs(false);document.body.dataset.bodySwitching")
# Documentation written by this patch is a description, not a test result.
(p/'README.md').write_text('''# V28 男女体表一致性

修复手足局部投影选取较近的内层/另一面交点的问题，按已定义的投影方向选择局部最外层交点。保留同侧和局部距离限制；编号原始坐标不变，但错误面的显示投影会改变，不能声称所有显示坐标不变。男女各自重新生成点、线路与皮肤笔触，使用独立版本缓存；旧手部预录路径只在端点仍一致时复用。

切换时恢复选中穴位不再等同于新点击：关闭的点位、线路和穴名保持关闭，侧别和图层不受旧点重新选中影响；局部裁切以当前身体的点重建。切换完成前不接受旧人体上的经络点选。局部观察跟随同名同侧点，保留放大程度，必要时转到无遮挡方向；非局部视角不擅自移动。镜头恢复包含原有视图偏移。

checks 中的几何、交互与截图检查分开记录。图形一致性不等同于临床取穴定位；原始人体、点位依据和女性原生/教学参考来源不变。正常体表保持不透明与深度遮挡，不靠全透视显示。
''',encoding='utf-8')
immutable=[f.name for f in src.iterdir() if f.suffix=='.json' and f.name not in ['build-info.json','release.json']]
for n in immutable:assert (src/n).read_bytes()==(p/n).read_bytes()
print('Built V28 source; unchanged data files:',len(immutable))
