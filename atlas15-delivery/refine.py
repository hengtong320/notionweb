from pathlib import Path
p=Path('fullbody-tcm-v15')
f=p/'surface-v13.js';s=f.read_text()
a='for(let i=0;i<samples.length;i++)samples[i].point.copy(sm[i]);const route='
b="""for(let i=0;i<samples.length;i++)samples[i].point.copy(sm[i]);
  const unique=[],uniqueSamples=[];for(let i=0;i<sm.length;i++){if(!sm[i].toArray().every(Number.isFinite))throw Error('经络几何包含无效坐标');if(!unique.length||unique.at(-1).distanceToSquared(sm[i])>1e-10){unique.push(sm[i]);uniqueSamples.push(samples[i]);}}sm.splice(0,sm.length,...unique);samples.splice(0,samples.length,...uniqueSamples);const route="""
assert a in s;s=s.replace(a,b);f.write_text(s)
f=p/'learning-enhancements.js';s=f.read_text()
a='for(let i=1;i<g.points.length;i++)gap=Math.min(gap,new THREE.Line3(g.points[i-1],g.points[i]).closestPointToPoint(p.position,true,new THREE.Vector3()).distanceTo(p.position));'
b='for(let i=1;i<g.points.length;i++){const a=g.points[i-1],b=g.points[i];gap=Math.min(gap,a.distanceToSquared(b)<1e-12?p.position.distanceTo(a):new THREE.Line3(a,b).closestPointToPoint(p.position,true,new THREE.Vector3()).distanceTo(p.position));}'
assert a in s;s=s.replace(a,b)
s=s.replace("count:rows.length,attached:surfaceAttached,collisions,", "count:rows.length,attached:surfaceAttached,geometryFinite:routeRecords.every(r=>r.guides.every(g=>g.points.every(p=>p.toArray().every(Number.isFinite))&&g.tube.geometry.attributes.position.array.every(Number.isFinite)&&g.tube.geometry.attributes.normal.array.every(Number.isFinite))),collisions,")
s=s.replace('surfaceDesired=!!on;\n  if(surfaceTask)', 'surfaceDesired=!!on;\n  if(surfaceDesired&&!surfaceProjector){surfaceDesired=false;return Promise.resolve(false);}\n  if(surfaceTask)')
f.write_text(s)
f=p/'app.js';s=f.read_text();s=s.replace('function pick(e){if(femaleViewer?.active)return null;', 'function pick(e){if(femaleViewer?.active||!state.bonesOn)return null;')
s+="\nfor(const name of ['atlas:profile-changed','atlas:sex-changed','atlas:region-changed'])window.addEventListener(name,()=>{for(const id of ['hoverTip','acuHover']){const tip=document.getElementById(id);if(tip)tip.hidden=true;}});\n";f.write_text(s)
f=Path('atlas15-delivery/verify.cjs');s=f.read_text()
s=s.replace("ck('670 points checked independently of guide geometry',audit.count===670);", "ck('670 points checked independently of guide geometry',audit.count===670);ck('All route vertices and normals are finite',audit.geometryFinite);")
s=s.replace("document.querySelector('#acupointWires');return !w||w.children.length===0||getComputedStyle(w).display==='none';", "document.querySelector('.acupoint-label-wires');return !!w&&w.children.length===0;")
s=s.replace("ck('Skin attachment is enabled',await page.evaluate(()=>__ATLAS_LEARNING__.getSurfaceState().attached));", "ck('Skin attachment is enabled',await page.evaluate(()=>__ATLAS_LEARNING__.getSurfaceState().attached));await page.mouse.move(820,400);await page.waitForTimeout(100);ck('Hidden skeleton does not produce a bone hover in skin view',await page.locator('#hoverTip').isHidden());")
f.write_text(s)
print('REFINED finite continuous routes, non-vacuous wire check and visible-model picking')
