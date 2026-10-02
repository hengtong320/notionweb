"""V30 skin contact/state repair. Preserve V29 and numbered point/route data."""
from pathlib import Path
import hashlib,json,shutil
src=Path('fullbody-tcm-v29');p=Path('fullbody-tcm-v30')
sha=lambda f:hashlib.sha256(f.read_bytes()).hexdigest()
assert sha(src/'app.bundle.js')=='d0b37d4f9e3c91b02a1bb40ff201df3266bb48031104442c5e0617606c75122d'
assert not p.exists()
shutil.copytree(src,p);shutil.rmtree(p/'checks',ignore_errors=True)
for n in ['release.json','build-info.json']:(p/n).unlink(missing_ok=True)
def edit(n,a,b):
 f=p/n;s=f.read_text();assert s.count(a)==1,(n,a[:90],s.count(a));f.write_text(s.replace(a,b,1))
helper=""" function reconcileSurfaceSide(side){
  if(!paintedSkinVisible())return;
  const female=state.bodySex==='female',api=window.__ATLAS_FEMALE__,physical=female?api?.getState().side:state.side;
  if(!physical||physical===side||physical==='both'&&side!=='both')return;
  if(female)api.setSide(side);else window.__FOOT_ATLAS__.restoreBoneState({side,isolated:false,neighbors:false});
 }
"""
edit('learning-enhancements.js',' function setTCMSide(side){ctx.invalidate();',helper+' function setTCMSide(side){ctx.invalidate();')
edit('learning-enhancements.js','labelPage=0;const prior=selectedPoint;navigationFocus=null;tcmSide=side;','labelPage=0;const prior=selectedPoint;navigationFocus=null;tcmSide=side;reconcileSurfaceSide(side);')
edit('learning-enhancements.js','if(target){selectPoint(target,false);return;}','if(target){selectPoint(target,false,{restoring:true});return;}')
edit('learning-enhancements.js','else ctx.setSide(p.side);','else window.__FOOT_ATLAS__.restoreBoneState({side:p.side,isolated:false,neighbors:false});')
edit('learning-enhancements.js','if(!enabled||!pointsOn||!selectedPoint?.position||!paintedSkinVisible())return null;','if(!enabled||!(pointsOn||guideOn&&linesOn)||!selectedPoint?.position||!paintedSkinVisible())return null;')
edit('learning-enhancements.js','if(!old?.focused||!view||!enabled||!pointsOn||!paintedSkinVisible())return view;','if(!old?.focused||!view||!enabled||!(pointsOn||guideOn&&linesOn)||!paintedSkinVisible())return view;')
# Keep tube-clearance anchors; derive label, click and selection from actual pigment.
edit('learning-enhancements.js','r.data.forEach((p,i)=>p.position.copy(anchors[i].point));','r.data.forEach((p,i)=>{p.position.copy(anchors[i].point);const c=ink?.centers[i];p.skinContact=c?.code===p.code?new THREE.Vector3(...c.position):null;});')
edit('learning-enhancements.js','function project(p){const v=p.position.clone().project(camera)','function project(p){const v=(paintedSkinVisible()&&p.skinContact?p.skinContact:p.position).clone().project(camera)')
edit('learning-enhancements.js','u.pointsOn.value=pointsOn?1:0;','u.pointsOn.value=pointsOn?1:0;if(u.selectedOn){const active=show&&pointsOn&&selectedPoint?.skinContact&&selectedPoint.meridian===r.meridian&&selectedPoint.side===r.side;u.selectedOn.value=active?1:0;if(active)u.selectedContact.value.copy(selectedPoint.skinContact);}')
edit('learning-enhancements.js','&&!!(selectedPoint.position||selectedPoint.navigationArea);selectedMarker.material.depthTest=!xray;','&&!!(selectedPoint.position||selectedPoint.navigationArea)&&(!paintedSkinVisible()||!selectedPoint.skinContact||xray);selectedMarker.material.depthTest=!xray;')
edit('learning-enhancements.js','points:!!r.ink&&r.ink.mesh.material.uniforms.pointsOn.value>0,cloud:','points:!!r.ink&&r.ink.mesh.material.uniforms.pointsOn.value>0,selected:!!r.ink&&effective(r.ink.mesh)&&r.ink.mesh.material.uniforms.selectedOn?.value>0,cloud:')
edit('learning-enhancements.js','markerVisible:!!selectedMarker&&effective(selectedMarker),markerPosition:','skinContact:selectedPoint.skinContact?.toArray()||null,markerVisible:!!selectedMarker&&effective(selectedMarker)||ink.some(i=>i.selected),spriteVisible:!!selectedMarker&&effective(selectedMarker),paintedSelection:ink.some(i=>i.selected),markerPosition:')
edit('learning-enhancements.js','markerPosition:selectedMarker?.geometry?.attributes.position?','markerPosition:ink.some(i=>i.selected)?selectedPoint.skinContact.toArray():selectedMarker?.geometry?.attributes.position?')
f=p/'learning-enhancements.js';s=f.read_text();s=s.replace('surfaceProjector.isVisible(p.position,','surfaceProjector.isVisible(p.skinContact||p.position,').replace('surfaceProjector?.isVisible(selectedPoint.position,','surfaceProjector?.isVisible(selectedPoint.skinContact||selectedPoint.position,')
s=s.replace("if(!enabled||suspended||!guideOn||!linesOn||precisionMode!=='illustrative')return null;","if(state.bodyTransition||surfaceBusy||referenceBody!==(state.bodySex||'male')||!enabled||suspended||!guideOn||!linesOn||precisionMode!=='illustrative')return null;")
f.write_text(s)
edit('shared-v14.js',"'#v26PointSummary']","'#v26PointSummary','.view-switcher','.side-picker','.view-controls','.control-dock']")
# Draw selected annulus on the same clipped, depth-tested skin triangles.
edit('skin-ink-v24.js','radius=kind?7.5:5.2','radius=kind?13.5:5.2')
edit('skin-ink-v24.js','pointsOn:{value:1},',"pointsOn:{value:1},selectedOn:{value:0},selectedContact:{value:new THREE.Vector3()},selectedTint:{value:new THREE.Color('#d37022')},")
edit('skin-ink-v24.js','fragmentShader:`uniform vec3 tint;','fragmentShader:`uniform float selectedOn;uniform vec3 selectedContact;uniform vec3 selectedTint;uniform vec3 tint;')
edit('skin-ink-v24.js','float lineDistance=1.e5,pointDistance=1.e5,lineAlong=0.;','float lineDistance=1.e5,pointDistance=1.e5,selectedDistance=1.e5,lineAlong=0.;')
edit('skin-ink-v24.js','if(a.w>.5){if(pointsOn>.5)pointDistance=min(pointDistance,d);}','if(a.w>.5){if(pointsOn>.5){pointDistance=min(pointDistance,d);if(selectedOn>.5&&distance(a.xyz,selectedContact)<.01)selectedDistance=min(selectedDistance,d);}}')
edit('skin-ink-v24.js','if(alpha<.02)discard;gl_FragColor=vec4(paint,alpha);','float selectionRing=(1.-smoothstep(4.8*pixelRatio-aa,4.8*pixelRatio+aa,selectedDistance))*smoothstep(3.5*pixelRatio-aa,3.5*pixelRatio+aa,selectedDistance);\n    if(selectedOn>.5&&selectionRing>.01){paint=mix(paint,selectedTint,selectionRing);alpha=max(alpha,selectionRing);}\n    if(alpha<.02)discard;gl_FragColor=vec4(paint,alpha);')
edit('skin-ink-v24.js','screenSpaceStroke:true,','skinContactSelection:true,screenSpaceStroke:true,')
for n in ['shared-v14.js','learning-enhancements.js','index.html','index.template.html','versions.html']:
 f=p/n
 if f.exists():f.write_text(f.read_text().replace('29.0.0','30.0.0').replace('fullbody-tcm-v29/','fullbody-tcm-v30/').replace('V29 · 体表状态与可见性','V30 · 体表实点与切换同步'))
immutable=[f.name for f in src.iterdir() if f.is_file() and (f.suffix=='.json' and f.name not in ['release.json','build-info.json'] or f.name in ['skin-v17.js','skin-route-v24.js','point-rules-v18.js','reference-data.js','acupoints-data.js','female-fingers-v24.js','surface-path-v25.js'])]
for n in immutable:assert sha(src/n)==sha(p/n),n
(p/'v30-invariants.json').write_text(json.dumps({'baseVersion':'29.0.0','unchangedFiles':{n:sha(p/n) for n in immutable},'clinicalCalibration':False},indent=2))
(p/'README.md').write_text('''# V30 体表实点与切换同步

从已发布V29继续修复体表观察的遗漏路径，不移动编号定位数据，不改男女独立投影和原始路线。

## 修复

- 皮肤绘点、穴名引线和点击中心使用同一皮肤接触位置。原来用于线管避让的2.4模型单位偏移不再被误用为皮肤实点的屏幕位置。选中圈直接绘于同一皮肤三角面，不再在皮肤前方悬浮。关闭透视时保持不透明皮肤和正常遮挡。
- 已选局部穴位但关闭点位、只看线路时，男女切换仍跟随对应位置，保留放大程度；不因此打开隐藏的点或名称。
- 切换经络左右侧只是恢复同名对应点，不冒充新点击而打开隐藏图层。显式双侧或另一侧经络请求解除冲突的人体侧别过滤；男性不再调用旧的重置全身视角分支。
- 人体切换中锁定方向、侧别和观察控制，避免旧模型上的操作写进新模型。

## 验证边界

新增检查记录V29同操作基线及V30候选/公开网址表现；原贴肤和观察检查单独记录。不以自动检查数量表示临床准确。原始人体及编号穴位/路线保持不变，新增skinContact仅表示实际皮肤绘制落点；全身每个穴位的临床位置仍未校准。
''',encoding='utf-8')
print('V30 patched; preserved anatomy/rules files:',len(immutable))