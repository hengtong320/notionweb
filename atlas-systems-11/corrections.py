from pathlib import Path
import json
p=Path('fullbody-tcm-v11')
def rep(f,a,b,n=1):
 t=p/f;s=t.read_text();assert a in s,(f,a[:90]);t.write_text(s.replace(a,b,n))
# Regional shells have inward-facing lining. Restrict the display projection to
# outward-facing candidates relative to same-source bone centres. Not a skin registration.
rep('surface-v11.js','createSurfaceProjector(meshes){','createSurfaceProjector(meshes,boneCentres){')
rep('surface-v11.js',' const geometry=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());', ''' const combined=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());
 const positions=combined.attributes.position,normals=combined.attributes.normal,keptPositions=[],keptNormals=[];
 const centre=new THREE.Vector3(),n=new THREE.Vector3(),near=new THREE.Vector3(),v=new THREE.Vector3();let excludedInnerTriangles=0;
 for(let i=0;i<positions.count;i+=3){centre.set(0,0,0);n.set(0,0,0);for(let j=0;j<3;j++){centre.add(v.fromBufferAttribute(positions,i+j));n.add(v.fromBufferAttribute(normals,i+j));}centre.multiplyScalar(1/3);n.normalize();let best=Infinity;for(const c of boneCentres){const d=centre.distanceToSquared(c);if(d<best){best=d;near.copy(c);}}
  if(n.dot(v.subVectors(centre,near))<=0){excludedInnerTriangles++;continue;}
  for(let j=0;j<3;j++){keptPositions.push(positions.getX(i+j),positions.getY(i+j),positions.getZ(i+j));keptNormals.push(normals.getX(i+j),normals.getY(i+j),normals.getZ(i+j));}}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(keptPositions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(keptNormals,3));combined.dispose();
''')
rep('surface-v11.js',' return {project,curve,stats:', ''' function isVisible(v,cameraPosition){const delta=v.clone().sub(cameraPosition),distance=delta.length();const hit=bvh.raycastFirst(new THREE.Ray(cameraPosition,delta.normalize()),THREE.DoubleSide);return !hit||hit.distance>=distance-1.5;}
 return {project,curve,isVisible,stats:''')
rep('surface-v11.js','({surfaceTriangles:', '({excludedInnerTriangles,surfaceTriangles:')
rep('tissues-v4.js','createSurfaceProjector(systems.surface.meshes)','createSurfaceProjector(systems.surface.meshes,[...bones.values()].map(b=>new THREE.Box3().setFromObject(b).getCenter(new THREE.Vector3())))')
rep('tissues-v4.js',"if(system==='surface')return '#d7b49c'", "if(system==='surface')return '#af8b72'")
rep('tissues-v4.js',"return /right/.test(info.en)?'#b98183':'#bf9092'", "return /right/.test(info.en)?'#9c6065':'#a66d72'")
rep('tissues-v4.js',"if(!['bones','muscles','nerves','compare'].includes(p))return;", "if(!['bones','muscles','nerves','compare'].includes(p))return;viewSerial++;document.body.classList.remove('organ-view-active');")
rep('tissues-v4.js',"n.visible=s.on&&", "n.visible=s.on&&(profile!=='chest'||system!=='visceral'||['lung','airway'].includes(m.category)||/oesoph|esoph/.test(m.en.toLowerCase()))&&(profile!=='abdomen'||system!=='visceral'||m.category==='organ')&&(profile!=='heart'||system!=='vessels'||/aorta|vena cava|coronary|cardiac|pulmonary/i.test(m.en))&&")
rep('tissues-v4.js',"if(name.startsWith('ear-')){setSide?.(name==='ear-left'?'left':'right');organBox=null;}", "if(name.startsWith('ear-')){const side=name==='ear-left'?'left':'right';setSide?.(side);organBox=new THREE.Box3();for(const n of systems.ear.meshes)if(n.userData.atlas.side===side)organBox.expandByObject(n);organBox.expandByScalar(8);}")
rep('tissues-v4.js',"setBoneOpacity(name==='surface'?.08:name.startsWith('ear-')?.12:.18)", "setBoneOpacity(name==='surface'?.08:name.startsWith('ear-')?.1:.08)")
rep('tissues-v4.js',"window.addEventListener('atlas:region-changed',()=>{organBox=null;lastKey='';});", "window.addEventListener('atlas:region-changed',()=>{organBox=null;document.body.classList.remove('organ-view-active');lastKey='';});")
rep('tissues-v4.js',"if(e.detail.user)clearSelection();", "if(e.detail.user){document.body.classList.remove('organ-view-active');clearSelection();}")
rep('tissues-v4.js',"  document.body.classList.remove('nav-open');window.dispatchEvent", "  document.body.classList.add('organ-view-active');const viewNames={chest:'胸腔器官',heart:'心脏与邻近血管',abdomen:'腹部器官',vascular:'心血管系统','ear-right':'右耳 · 外耳与内部','ear-left':'左耳 · 外耳与内部',surface:'体表参照与经络示意'};const heading=$('regionHeading');heading.textContent=viewNames[name];if(name!=='surface')window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'region',id:state.region,name:viewNames[name],side:state.side}}));document.body.classList.remove('nav-open');window.dispatchEvent")
# Keep errors actionable without unhandled promises from native button handlers.
rep('tissues-v4.js',"quick.querySelectorAll('[data-quick]').forEach(b=>b.onclick=()=>setAnatomyView(b.dataset.quick));", "quick.querySelectorAll('[data-quick]').forEach(b=>b.onclick=()=>setAnatomyView(b.dataset.quick).catch(e=>toast(e.message)));")
rep('tissues-v4.js',"additions.querySelectorAll('[data-system-view]').forEach(b=>b.onclick=()=>setAnatomyView(b.dataset.systemView));", "additions.querySelectorAll('[data-system-view]').forEach(b=>b.onclick=()=>setAnatomyView(b.dataset.systemView).catch(e=>toast(e.message)));")
rep('tissues-v4.js',"$('surfaceAttach').onchange=e=>attachSurface(e.target.checked);", "$('surfaceAttach').onchange=e=>attachSurface(e.target.checked).catch(e=>toast(e.message));")
rep('learning-enhancements.js',"if(xray)return true;", "if(surfaceAttached&&surfaceProjector)return surfaceProjector.isVisible(p.position,camera.position);if(xray)return true;")
rep('learning-enhancements.js',"let candidates=all.map(p=>", "let candidates=all.filter(p=>!surfaceAttached||surfaceProjector.isVisible(p.position,camera.position)).map(p=>")
rep('learning-enhancements.js',"if(d<bestDistance){bestDistance=d;best=r;}", "if(d<bestDistance&&(!surfaceAttached||surfaceProjector.isVisible(g.points[i-1].clone().lerp(g.points[i],t),camera.position))){bestDistance=d;best=r;}")
rep('learning-enhancements.js',"getSurfaceState:()=>({attached:", "getSurfaceAudit:()=>routeRecords.filter(routeMatches).flatMap(r=>r.guides.flatMap(g=>g.points.filter((v,i)=>i%Math.max(1,Math.floor(g.points.length/30))===0).map(position=>({screen:project({position}),visible:surfaceProjector?.isVisible(position,camera.position)})))),getSurfaceState:()=>({attached:")
rep('app.js',"floor.visible=!state.isolated&&", "floor.visible=!document.body.classList.contains('organ-view-active')&&!state.isolated&&")
rep('app.js',"function updateLabels(){if(needsLabelRebuild)", "function updateLabels(){if(document.body.classList.contains('organ-view-active')){for(const p of labelNodes){p.el.style.display='none';p.line.style.display='none';}return;}if(needsLabelRebuild)")
rep('stability-v10.js',"  ctx.setRegion(current.id);return true;", "  const profile=tissues.getState().profile;if(['chest','heart','abdomen','vascular','ear-right','ear-left','surface'].includes(profile))return tissues.setAnatomyView(profile);ctx.setRegion(current.id);return true;")
rep('stability-v10.js',"   if(target.mode)learning.setPrecisionMode", "   target={...target};if(['point','meridian'].includes(target.kind)&&['chest','heart','abdomen','vascular','ear-right','ear-left','surface'].includes(target.layer)){await tissues.setProfile(target.layer);if(serial!==restoreSerial)return;target.layer=null;}\n   if(target.mode)learning.setPrecisionMode")
rep('stability-v10.js',"const mode=(current.kind", "const mode=(learning.getState().surfaceAttached?'体表显示投影 · ':'')+(current.kind")
rep('stability-v10.js',"const mode=(learning.getState().surfaceAttached?'体表显示投影 · ':'')+(current.kind", "const mode=(learning.getState().surfaceAttached?'体表显示投影 · ':'')+((current.kind")
rep('stability-v10.js',"'解剖教学模型 · 非患者诊断';", "'解剖教学模型 · 非患者诊断');")
with (p/'styles.css').open('a') as f:f.write('\n.organ-view-active .detail-title,.organ-view-active .preview-wrap,.organ-view-active #boneIndex,.organ-view-active .detail-actions,.organ-view-active .bone-actions{display:none!important}.organ-view-active .detail-scroll>section:not(#currentStudy):not(#tissueDetail){display:none!important}.organ-view-active #studyTip{display:none!important}\n')
for fn in ['index.template.html','index.html']:
 rep(fn,'V11 · 稳定修订','V11 · 器官与体表')
(p/'versions.html').write_text('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习 · 版本记录</title><h1>V11 器官与体表</h1><p>新增同源胸腹器官、心血管、耳部及体表参照；原骨架与穴位数据不改。贴面为显示投影，非临床校准。</p><p><a href="../anatomy/">固定入口</a> · <a href="../fullbody-tcm-v10-1/">V10.1</a> · <a href="../fullbody-tcm-v9/">V9</a> · <a href="../foot-atlas/">足骨原版</a></p></html>')
# Verify the visual fixes at the semantic/UI boundary, not just loaded mesh counts.
t=Path('atlas-systems-11/verify.cjs');s=t.read_text()
s=s.replace("await capture('chest-organs');", "ck('Chest scene excludes abdominal organ meshes',await page.evaluate(()=>window.__ATLAS_TISSUES__.getState().systems.visceral.visible<30));ck('Organ view removes stale bone controls',await page.locator('.detail-title').isHidden());await capture('chest-organs');")
s=s.replace("s.systems.ear.visible>10&&s.systems.ear.visible<35", "s.systems.ear.visible===24")
s=s.replace("stats.surfaceTriangles>10000&&stats.calls>1000&&!stats.coordinateCalibration", "stats.surfaceTriangles>10000&&stats.excludedInnerTriangles>10000&&stats.calls>1000&&!stats.coordinateCalibration")
s=s.replace("await capture('surface-kidney');", "const visibleSamples=await page.evaluate(()=>window.__ATLAS_LEARNING__.getSurfaceAudit().filter(p=>p.visible&&p.screen.x>0&&p.screen.y>0&&p.screen.x<1440&&p.screen.y<1000));report.frontSurfaceVisibleSamples=visibleSamples.length;ck('Front-side surface routes have visible sampled segments',visibleSamples.length>10,{samples:visibleSamples.length});await capture('surface-kidney');")
t.write_text(s)
t=Path('atlas-systems-11/compile.cjs');s=t.read_text();s=s.replace("info.version='11.0.0';", "info.version='11.0.0';info.visualRevision='11.0.1';info.base='V10.1';info.clinicalCalibration=false;info.originalCoordinatesUnchanged=true;info.surfaceProjection='display-only outward regional shell projection';")
s=s.replace("info.bundleBytes=", "info.onlineHTMLBytes=info.onlineEntryBytes;info.stylesSHA256=hash(fs.readFileSync(path.join(root,'styles.css')));info.evidenceSHA256=hash(fs.readFileSync(path.join(root,'evidence.html')));info.evidenceBundleSHA256=hash(fs.readFileSync(path.join(root,'evidence.bundle.js')));info.bundleBytes=")
t.write_text(s)
print('VISUAL_CORRECTIONS_READY')
