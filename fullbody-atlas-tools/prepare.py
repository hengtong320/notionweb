"""Append a complete, explicitly enumerated adult skeleton to the approved 73 meshes."""
from pathlib import Path
import os,json,hashlib,shutil,subprocess,urllib.request
import numpy as np
import trimesh
from catalog import ADDED,GROUPS
ROOT=Path(__file__).resolve().parents[1]
BASE_REF='78df9ba4183a13a231da54f2d3ffc94928e6e736'
OUT=ROOT/'fullbody-atlas';(OUT/'assets').mkdir(parents=True,exist_ok=True)
LOCAL=not (ROOT/'.git').exists()
def prior(p):
 return (ROOT/'baseline'/p).read_bytes() if LOCAL else subprocess.check_output(['git','show',BASE_REF+':'+p],cwd=ROOT)
for f in ['app.js','bones-data.js','styles.css','index.template.html','assets/lumbar.glb','assets/provenance.json','MODEL-LICENSES.txt','LICENSE']:
 p=OUT/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(prior('lumbar-atlas/'+f))
source=ROOT/'fullbody-source';source.mkdir(exist_ok=True)
if LOCAL:
 data=(ROOT/'source/source.glb').read_bytes();decoder=(ROOT/'source/decode-original.cjs').read_text();shutil.copy(ROOT/'source/draco_decoder.cjs',source/'draco_decoder.cjs')
else:
 with urllib.request.urlopen('https://raw.githubusercontent.com/Liyucheng1997/242_lab-human-anatomy/main/public/models/skeleton.glb',timeout=90) as r:data=r.read()
 decoder=subprocess.check_output(['git','show',BASE_REF+':foot-atlas/decode_draco.cjs'],cwd=ROOT).decode()
 shutil.copy(Path(os.environ['THREE_PACKAGE'])/'examples/jsm/libs/draco/gltf/draco_decoder.js',source/'draco_decoder.cjs')
source_sha=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
assert source_sha=='5e15f7ea303c554f6c25a417f7f184696234b436',source_sha
(source/'z-anatomy-skeleton.glb').write_bytes(data)
selected={n for b in ADDED for n in b['sourceNodes']}
doc=json.loads(data[20:20+int.from_bytes(data[12:16],'little')]);allnames={n.get('name') for n in doc['nodes'] if 'mesh' in n}
assert selected<=allnames,selected-allnames
start=decoder.index('const isFoot=');end=decoder.index('\nconst selected=',start)
decoder=decoder[:start]+'const chosen=new Set('+json.dumps(sorted(selected))+');const isFoot=n=>chosen.has(n);'+decoder[end:]
decoder=decoder.replace("typed.length/(type==='VEC3'?3:1)","typed.length/({SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[type])").replace("a.num_components()===3?'VEC3':'SCALAR'","({1:'SCALAR',2:'VEC2',3:'VEC3',4:'VEC4'}[a.num_components()])")
(source/'decode.cjs').write_text(decoder)
subprocess.run(['node',str(source/'decode.cjs')],env={**os.environ,'ATLAS_SOURCE':str(source)},check=True,stdout=subprocess.DEVNULL)
s=trimesh.load(source/'skeleton-decoded.glb',force='scene')
meta=json.loads((OUT/'assets/provenance.json').read_text());origin=np.array(meta['sourceOriginMillimeters'])
scene=trimesh.load(OUT/'assets/lumbar.glb',force='scene')
old={n:(scene.graph[n][0].copy(),scene.geometry[scene.graph[n][1]].copy()) for n in scene.graph.nodes_geometry};assert len(old)==73
new=[]
for b in ADDED:
 pieces=[];matrices=[]
 for name in b['sourceNodes']:
  matrix,gn=s.graph[name];mesh=s.geometry[gn].copy();mesh.apply_transform(matrix);mesh.apply_scale(1000);mesh.vertices-=origin;pieces.append(mesh);matrices.append(matrix.tolist())
 mesh=pieces[0] if len(pieces)==1 else trimesh.util.concatenate(pieces)
 pos=mesh.bounds.mean(0);mesh.vertices-=pos;mesh.visual=trimesh.visual.ColorVisuals(mesh,vertex_colors=[232,223,204,255]);mesh.metadata={}
 assert len(mesh.vertices)>0 and len(mesh.faces)>0 and np.isfinite(mesh.vertices).all(),b['id']
 scene.add_geometry(mesh,node_name=b['id'],geom_name=b['id'],transform=trimesh.transformations.translation_matrix(pos))
 new.append(dict(id=b['id'],sourceNodes=b['sourceNodes'],sourceMatrices=matrices,center=pos.tolist(),vertices=len(mesh.vertices),triangles=len(mesh.faces)))
asset=scene.export(file_type='glb',include_normals=True);(OUT/'assets/fullbody.glb').write_bytes(asset)
check=trimesh.load(OUT/'assets/fullbody.glb',force='scene');assert len(check.graph.nodes_geometry)==210
errors={};bounds={}
for n in check.graph.nodes_geometry:
 mat,gn=check.graph[n];mesh=check.geometry[gn];v=trimesh.transform_points(mesh.vertices,mat);bounds[n]=[v.min(0).tolist(),v.max(0).tolist()]
 if n in old:
  om,og=old[n];assert np.array_equal(og.faces,mesh.faces),n
  err=float(np.max(np.abs(trimesh.transform_points(og.vertices,om)-v)));assert err==0,(n,err);errors[n]=err
for prefix,count in [('C',7),('T',12)]:
 ys=[np.mean(bounds[prefix+str(i)],axis=0)[1] for i in range(1,count+1)];assert all(a>b for a,b in zip(ys,ys[1:])),prefix
for b in ADDED:
 if b['side']=='right':
  left=b['id'].removesuffix('-right')+'-left';assert left in bounds
  assert np.mean(bounds[left],axis=0)[0]>np.mean(bounds[b['id']],axis=0)[0],b['id']
meta.update(dict(baseRef=BASE_REF,bones=meta['bones']+new,newBones=[b['id'] for b in ADDED],totalTriangles=sum(len(g.faces) for g in check.geometry.values()),approvedLumbarPreserved=True,priorMeshCoordinateErrorsMillimeters=errors,maxPriorCoordinateErrorMillimeters=0,modelBounds=bounds,standardAdultBones=206,additionalHalluxSesamoids=4,coverageComplete=True,modifications='Retained all 73 approved meshes and transforms. Added 137 enumerated source bones. Baked only original source transforms in the same coordinate system. Sternum combines three published parts into one selectable adult bone without inventing or joining surfaces. Excluded teeth, cartilages, sinus contents, and non-anatomical label geometry. No smoothing, subdivision, new mirroring, or invented geometry.',extension='Complete 206-bone adult standard inventory plus four previously included hallux sesamoids. Bone surfaces only; no teeth, cartilage, ligaments, discs, nerves, or clinical motion simulation.'))
(OUT/'assets/provenance.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2))
(OUT/'additions.json').write_text(json.dumps(ADDED,ensure_ascii=False,indent=2))
(OUT/'additional-groups.json').write_text(json.dumps([dict(zip(['id','name','pinyin','count','color'],g)) for g in GROUPS],ensure_ascii=False,indent=2))
info=dict(version='fullbody-v1',baseRef=BASE_REF,bones=210,standardAdultBones=206,additionalHalluxSesamoids=4,priorBones=73,addedBones=137,coverageComplete=True,totalTriangles=meta['totalTriangles'],modelBytes=len(asset),approvedLumbarPreserved=True,maxPriorCoordinateErrorMillimeters=0,noRuntimeNetwork=True,threeVersion='0.180.0')
(OUT/'build-info.json').write_text(json.dumps(info,indent=2));print('MODEL_OK',json.dumps(info))
