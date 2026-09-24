from pathlib import Path
import json
p=Path('fullbody-tcm-v8');f=p/'learning-enhancements.js';s=f.read_text()
def rep(a,b):
 global s
 assert a in s,a[:100]
 s=s.replace(a,b,1)
rep("function getVisiblePoints(){return enabled&&!suspended&&pointsOn?routeRecords.filter(routeMatches).flatMap(r=>r.data):[];}", """function referenceWindow(){
  if(!studyContext||document.getElementById('localStudyToggle')?.checked===false)return null;
  const v=new THREE.Vector3(...studyContext.center),radius=studyContext.radius*1.6;
  return new THREE.Box3(v.clone().addScalar(-radius),v.clone().addScalar(radius));
 }
 function getVisiblePoints(){const box=referenceWindow();return enabled&&!suspended&&pointsOn?routeRecords.filter(routeMatches).flatMap(r=>r.data).filter(p=>!box||box.containsPoint(p.position)):[];}
 let lastReferenceWindowKey='';
 function syncReferenceWindow(){
  const box=referenceWindow(),key=box?studyContext.code+'|'+studyContext.side+'|'+studyContext.center.join(','):'full';
  if(key===lastReferenceWindowKey)return;lastReferenceWindowKey=key;
  const planes=box?[new THREE.Plane(new THREE.Vector3(1,0,0),-box.min.x),new THREE.Plane(new THREE.Vector3(-1,0,0),box.max.x),new THREE.Plane(new THREE.Vector3(0,1,0),-box.min.y),new THREE.Plane(new THREE.Vector3(0,-1,0),box.max.y),new THREE.Plane(new THREE.Vector3(0,0,1),-box.min.z),new THREE.Plane(new THREE.Vector3(0,0,-1),box.max.z)]:[];
  for(const r of routeRecords){
   const shown=box?r.data.filter(p=>box.containsPoint(p.position)):r.data;
   r.cloud.geometry.dispose();r.cloud.geometry=new THREE.BufferGeometry().setFromPoints(shown.map(p=>p.position));if(shown.length)r.cloud.geometry.computeBoundingSphere();
   for(const g of r.guides)for(const mesh of [g.guide,g.border]){mesh.material.clippingPlanes=planes;mesh.material.needsUpdate=true;}
  }
  lastLabelsAt=0;lastLabelRebuild='';updateOverlayVisibility();
 }
""")
rep(" function updateFrame(){\n", " function updateFrame(){\n  syncReferenceWindow();\n")
rep("if($('guideCoverage'))$('guideCoverage').textContent=", "if($('guideCoverage'))$('guideCoverage').textContent=referenceWindow()?'局部观察：'+studyContext.name+'；只显示当前范围内的点线。点击“看全线”恢复整条，或在图层设置关闭局部范围。':")
rep('保留当前名称与视角，仅切换显示重点。经络与神经是不同图层', '保留当前名称与视角，仅切换显示重点；范围外的点线暂时收起，看全线可恢复。经络与神经是不同图层')
rep("window.__ATLAS_LEARNING__={", "window.__ATLAS_LEARNING__={getReferenceWindowState:()=>{const b=referenceWindow();return {active:!!b,bounds:b&&[b.min.toArray(),b.max.toArray()],visible:getVisiblePoints().map(p=>({code:p.code,side:p.side,position:p.position.toArray()})),drawnPoints:routeRecords.filter(routeMatches).reduce((n,r)=>n+r.cloud.geometry.attributes.position.count,0),clippedRouteMaterials:routeRecords.filter(routeMatches).flatMap(r=>r.guides).filter(g=>g.guide.material.clippingPlanes?.length===6).length};},")
f.write_text(s)
f=p/'tissues-v4.js';t=f.read_text().replace('只看当前观察范围相关模型','只看当前范围的结构与点线').replace('范围筛选是几何相交，不是穴位—神经支配关系。','局部范围可关闭；看全线恢复完整经脉。几何相交不表示穴位—神经支配关系。');f.write_text(t)
f=p/'README.md';f.write_text(f.read_text()+'\n局部观察补充：选中部位时，只显示当前空间范围内的相关点线，避免胸部点名投影到头部造成误读。看全线恢复整条，可在图层设置关闭局部范围。原目录、670个标准导航实例、模型与线路原数据均不删除。\n')
info=json.loads((p/'build-info.json').read_text());info['visualRevision']='8.0.2';info['focusWindowFiltersDistantPointsAndLines']=True;(p/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
print('CONTEXT_WINDOW_PATCHED')
