"""V31: preserve a coherent opaque skin view while changing body and side."""
from pathlib import Path
import shutil,hashlib,json
src=Path('fullbody-tcm-v30');dst=Path('fullbody-tcm-v31')
assert hashlib.sha256((src/'app.bundle.js').read_bytes()).hexdigest()=='32029acc4f9951fc5bd57473494e18e5749bd9a4a72fb4e9fe609d46572e26f5'
assert not dst.exists(),'Refuse to overwrite a release'
shutil.copytree(src,dst);shutil.rmtree(dst/'checks',ignore_errors=True)
for n in ['build-info.json','release.json','phone-final-build.json']:(dst/n).unlink(missing_ok=True)
def edit(n,a,b):
 f=dst/n;s=f.read_text();assert s.count(a)==1,(n,a[:80],s.count(a));f.write_text(s.replace(a,b))
for n in ['app.js','shared-v14.js','learning-enhancements.js','index.html','index.template.html','versions.html']:
 f=dst/n
 if f.exists():f.write_text(f.read_text().replace('30.0.1','31.0.0').replace('V30 · 体表实点与切换同步','V31 · 体表侧别与切换一致性').replace('fullbody-tcm-v30/','fullbody-tcm-v31/'))
edit('shared-v14.js',"function lockSurfaceInputs(on){", "let controlsBeforeTransition=null;\n window.addEventListener('keydown',e=>{if(state.bodyTransition&&!e.target.closest?.('input,textarea,select')){e.preventDefault();e.stopImmediatePropagation();}},true);\n function lockSurfaceInputs(on){if(on&&controlsBeforeTransition===null){controlsBeforeTransition=ctx.controls.enabled;ctx.controls.enabled=false;}else if(!on&&controlsBeforeTransition!==null){ctx.controls.enabled=controlsBeforeTransition;controlsBeforeTransition=null;}")
old="enqueueAction('side',()=>{layoutRevision++;if(female.active)female.setSide(b.dataset.side);else window.__FOOT_ATLAS__.restoreBoneState({side:b.dataset.side});})"
new="enqueueAction('side',previous=>{layoutRevision++;const side=b.dataset.side,skinOn=!!snapshots().surface?.on;if(female.active)female.setSide(side);else window.__FOOT_ATLAS__.restoreBoneState({side});if(skinOn){learning.setTCMSide(side);const p=learning.getState().selectedPoint;if(previous.surfaceObservation&&p)restoreCamera(learning.transferSurfaceObservation({...previous.surfaceObservation,side:p.side},previous.camera));}})"
edit('shared-v14.js',old,new)
helper="""function prepareSkinPose(){
  if(female.active)return false;
  const displaced=state.explode>0||[...ctx.bones.values()].some(b=>b.userData.offset.lengthSq()>.1||b.quaternion.angleTo(new ctx.THREE.Quaternion())>.015);
  if(!displaced)return false;
  window.__FOOT_ATLAS__.restoreBoneState({explode:0,isolated:false,neighbors:false,ghost:false,mode:'orbit',poses:[...ctx.bones.keys()].map(id=>({id,offset:[0,0,0],rotation:[0,0,0,1]}))});
  toast('已将拆开的骨骼归位，以贴合体表；观察视角保持不变。');return true;
 }
 """
edit('shared-v14.js','async function enableLayerNow(l,on){',helper+'async function enableLayerNow(l,on){')
edit('shared-v14.js',"if(l.id==='surface'&&on){if(female.active)female.clearSelection();", "if(l.id==='surface'&&on){prepareSkinPose();if(female.active)female.clearSelection();")
edit('shared-v14.js',"const ss=snapshots();if(needed||ss.surface?.on)","const ss=snapshots();if(ss.surface?.on)prepareSkinPose();if(needed||ss.surface?.on)")
edit('learning-enhancements.js','dir=surfaceProjector.visibleDirection(pos,dir);','dir=surfaceProjector.visibleDirection(p?.skinContact||pos,dir);')
edit('learning-enhancements.js','surfaceProjector.visibleDirection(p.position,oldDir.toArray())','surfaceProjector.visibleDirection(p.skinContact||p.position,oldDir.toArray())')
edit('learning-enhancements.js',"selectedPoint={...selectedPoint,position:p.position};", "selectedPoint={...selectedPoint,position:p.position,skinContact:p.skinContact};")
edit('learning-enhancements.js','function hitPoint(e){frameOccluders=null;', 'function hitPoint(e){if(state.bodyTransition||surfaceBusy||referenceBody!==(state.bodySex||\'male\'))return null;camera.updateMatrixWorld(true);frameOccluders=null;')
edit('learning-enhancements.js',"tcmSide=v.tcmSide||'both';linesOn=", "tcmSide=v.tcmSide||'both';const physical=state.bodySex==='female'?window.__ATLAS_FEMALE__?.getState().side:state.side;if(paintedSkinVisible()&&physical&&physical!=='both'&&tcmSide!=='both'&&physical!==tcmSide)tcmSide=physical;linesOn=")
edit('learning-enhancements.js',"const q=pointIndex.get(v.selectedPoint.code+'|'+v.selectedPoint.side)||pointIndex.get(v.selectedPoint.code+'|midline');", "const restoredSide=v.selectedPoint.side!=='midline'&&tcmSide!=='both'?tcmSide:v.selectedPoint.side;const q=pointIndex.get(v.selectedPoint.code+'|'+restoredSide)||pointIndex.get(v.selectedPoint.code+'|midline');")
edit('learning-enhancements.js',"visibleFromCamera:!!surfaceProjector?.isVisible(p.position,camera.position)","skinContact:p.skinContact?.toArray()||null,visibleFromCamera:!!surfaceProjector?.isVisible(p.skinContact||p.position,camera.position)")
for n in ['index.html','index.template.html']:
 if (dst/n).exists():edit(n,'</head>', '<style>body[data-body-switching="true"] #acupointHover,body[data-body-switching="true"] #femalePointLabel,body[data-body-switching="true"] #femaleStructureLabels,body[data-body-switching="true"] #acupointLabels{visibility:hidden!important}</style></head>')
raw=[n.name for n in src.iterdir() if n.suffix=='.json' and n.name not in ['release.json','build-info.json','phone-final-build.json']]
for n in raw:assert (src/n).read_bytes()==(dst/n).read_bytes(),n
(dst/'README.md').write_text('''# V31 体表侧别与切换一致性

基于 V30.0.1 修复不透明体表观察中的冲突路径。保留独立男女皮肤、原始穴位与经络几何。

## 本轮修正

结构目录切换人体侧别时，同步经络侧别和同名选中穴位。局部观察时迁移到该侧皮肤上的对应点，保留放大程度；隐藏的实点、名称和线路开关不被恢复过程意外开启。读取旧的侧别冲突组合时进行归一，不再左侧皮肤与右侧经络互相过滤。

男性骨架被拆开或旋转后，显式开启体表时先将显示骨架归位，保留镜头和透明度设定，不改原始骨骼几何。避免男性皮肤因遗留位移被整体隐藏、女性却可显示的不一致。

切换期间暂时锁定旋转控制与全局快捷键，隐藏旧的浮动标注；完成后恢复控制。拾取使用当前相机矩阵并拒绝过渡中的旧点。聚焦和切换可见性检查统一使用皮肤实点接触位置，不使用抬高的线管参照位置。重绑定后的已选点同时更新其皮肤接触位置。

## 验证边界

检查区分未改动 V30 基线、V31候选和公开网址。覆盖不透明皮肤上的点像素、左右冲突、男女往返、隐藏开关、骨架归位与手机视口。自动验证只代表所测路径，不代表所有穴位已临床校准。男女各自使用独立皮肤投影，同名穴位不是强行复用完全相同的世界坐标。原始模型、编号点和路线不改动；仍为学习示意。
''',encoding='utf8')
(dst/'invariants-v31.json').write_text(json.dumps({'unchangedJSONFiles':raw,'numberedPointsAndRoutesUnchanged':True,'clinicalCalibration':False},indent=2))
print('V31 assembled and source invariants checked',len(raw))
