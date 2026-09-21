"""Build an additive ankle atlas from a pinned approved foot atlas. Never write foot-atlas/."""
from pathlib import Path
import base64, hashlib, json, os, re, shutil, subprocess, tempfile, urllib.request
import numpy as np
import trimesh
ROOT=Path(__file__).resolve().parents[1]
BASE_REF='31d013bc909f0846beaa384cad647f12db8f7aa6'
OUT=ROOT/'ankle-atlas';OUT.mkdir(exist_ok=True)
PKG=Path(os.environ['THREE_PACKAGE'])
files=['app.js','bones-data.js','styles.css','index.template.html','decode_draco.cjs','qa.cjs','assets/foot.glb','assets/provenance.json','MODEL-LICENSES.txt','LICENSE','build-info.json']
for f in files:
    data=subprocess.check_output(['git','show',f'{BASE_REF}:foot-atlas/{f}'],cwd=ROOT)
    p=OUT/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
source=ROOT/'ankle-atlas-source';source.mkdir(exist_ok=True)
url='https://raw.githubusercontent.com/Liyucheng1997/242_lab-human-anatomy/main/public/models/skeleton.glb'
with urllib.request.urlopen(url,timeout=90) as response:data=response.read()
sha=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
assert sha=='5e15f7ea303c554f6c25a417f7f184696234b436',sha
(source/'z-anatomy-skeleton.glb').write_bytes(data)
shutil.copy(PKG/'examples/jsm/libs/draco/gltf/draco_decoder.js',source/'draco_decoder.cjs')
decoder=(OUT/'decode_draco.cjs').read_text().replace('Talus|Calcaneus','Tibia|Fibula|Talus|Calcaneus')
(source/'decode.cjs').write_text(decoder)
subprocess.run(['node',str(source/'decode.cjs')],env={**os.environ,'ATLAS_SOURCE':str(source)},check=True)
s=trimesh.load(source/'skeleton-decoded.glb',force='scene')
foot_parts=[];new_parts=[]
for name in s.graph.nodes_geometry:
    if not name.endswith('.r.001'):continue
    matrix,geometry=s.graph[name];mesh=s.geometry[geometry].copy();mesh.apply_transform(matrix);mesh.apply_scale(1000)
    raw=name[:-6]
    if raw in ['Tibia','Fibula']:new_parts.append((raw.lower(),name,mesh))
    elif re.search(r'Talus|Calcaneus|Navicular bone|Cuboid bone|cuneiform bone|metatarsal bone|phalanx.*finger of foot|Sesamoid bones of foot',raw,re.I):foot_parts.append(mesh)
assert len(new_parts)==2,[(n,s.graph[n][1]) for n in s.graph.nodes_geometry]
allv=np.vstack([m.vertices for m in foot_parts]);foot_center=(allv.min(0)+allv.max(0))/2
result=trimesh.load(OUT/'assets/foot.glb',force='scene')
original={n:(result.graph[n][0].copy(),result.geometry[result.graph[n][1]].copy()) for n in result.graph.nodes_geometry}
assert len(original)==28
meta=json.loads((OUT/'assets/provenance.json').read_text())
for ident,name,mesh in new_parts:
    mesh.vertices-=foot_center
    position=mesh.bounds.mean(0);mesh.vertices-=position
    mesh.visual=trimesh.visual.ColorVisuals(mesh,vertex_colors=[232,223,204,255]);mesh.metadata={}
    result.add_geometry(mesh,node_name=ident,geom_name=ident,transform=trimesh.transformations.translation_matrix(position))
    meta['bones'].append({'id':ident,'sourceNode':name,'center':position.tolist(),'vertices':len(mesh.vertices),'triangles':len(mesh.faces)})
assert len(result.graph.nodes_geometry)==30
(OUT/'assets/ankle.glb').write_bytes(result.export(file_type='glb',include_normals=True))
loaded=trimesh.load(OUT/'assets/ankle.glb',force='scene');max_error=0
for name,(matrix,mesh) in original.items():
    matrix2,gn=loaded.graph[name];m2=loaded.geometry[gn]
    assert np.array_equal(mesh.faces,m2.faces),name
    assert mesh.vertices.shape==m2.vertices.shape,name
    err=float(np.max(np.abs(trimesh.transform_points(mesh.vertices,matrix)-trimesh.transform_points(m2.vertices,matrix2))))
    assert err<0.0001,(name,err)
    max_error=max(max_error,err)
meta.update({'baseRef':BASE_REF,'basicBones':28,'sesamoids':2,'newBones':['tibia','fibula'],'totalTriangles':sum(x['triangles'] for x in meta['bones']),'approvedFootPreserved':True,'maxFootCoordinateErrorMillimeters':max_error,'modifications':'Retained all 28 approved foot meshes and their original transforms; added the source right tibia and fibula in the same anatomical coordinate system. No artificial bone geometry, subdivision, stretching or independent scaling. Visualization only; no joint kinematics.','extension':'Right ankle and lower leg; no femur or patella yet.'})
(OUT/'assets/provenance.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2))
shutil.copytree(ROOT/'foot-atlas/vendor',OUT/'vendor',dirs_exist_ok=True)
print('ANATOMY_CHECK',json.dumps({k:meta[k] for k in ['totalTriangles','approvedFootPreserved','maxFootCoordinateErrorMillimeters']},ensure_ascii=False))
print('NEW_BONES',json.dumps(meta['bones'][-2:],ensure_ascii=False))
