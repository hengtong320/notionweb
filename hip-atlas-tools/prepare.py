"""Add four same-source pelvic bones without modifying the three approved viewers."""
from pathlib import Path
import hashlib,json,os,re,shutil,subprocess,urllib.request
import numpy as np
import trimesh
ROOT=Path(__file__).resolve().parents[1]
BASE_REF='085381cbf6ee7cb014a01caa06913cb5ada8a934'
OUT=ROOT/'hip-atlas';OUT.mkdir(exist_ok=True)
LOCAL=not (ROOT/'.git').exists()
def original(path):
    return (ROOT/path).read_bytes() if LOCAL else subprocess.check_output(['git','show',BASE_REF+':'+path],cwd=ROOT)
files=['app.js','bones-data.js','styles.css','index.template.html','assets/knee.glb','assets/provenance.json','MODEL-LICENSES.txt','LICENSE','build-info.json']
for f in files:
    p=OUT/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(original('knee-atlas/'+f))
if LOCAL:shutil.copytree(ROOT/'knee-atlas/vendor',OUT/'vendor',dirs_exist_ok=True)
else:
    for f in subprocess.check_output(['git','ls-tree','-r','--name-only',BASE_REF,'knee-atlas/vendor/'],cwd=ROOT,text=True).splitlines():
        p=OUT/f.removeprefix('knee-atlas/');p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(original(f))
source=ROOT/'hip-source';source.mkdir(exist_ok=True)
if LOCAL:
    data=(ROOT/'toolkit/source.glb').read_bytes()
    shutil.copy(ROOT/'toolkit/draco_decoder.cjs',source/'draco_decoder.cjs')
    decoder=(ROOT/'toolkit/decode-original.cjs').read_text()
else:
    with urllib.request.urlopen('https://raw.githubusercontent.com/Liyucheng1997/242_lab-human-anatomy/main/public/models/skeleton.glb',timeout=90) as r:data=r.read()
    shutil.copy(Path(os.environ['THREE_PACKAGE'])/'examples/jsm/libs/draco/gltf/draco_decoder.js',source/'draco_decoder.cjs')
    decoder=original('foot-atlas/decode_draco.cjs').decode()
sha=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
assert sha=='5e15f7ea303c554f6c25a417f7f184696234b436',sha
(source/'z-anatomy-skeleton.glb').write_bytes(data)
start=decoder.index('const isFoot=');end=decoder.index('\nconst selected=',start)
decoder=decoder[:start]+"const isFoot=n=>['Hip bone.r.001','Hip bone.l.001','Sacrum.001','Coccyx.001'].includes(n)||(n.endsWith('.r.001')&&/Talus|Calcaneus|Navicular bone|Cuboid bone|cuneiform bone|metatarsal bone|phalanx.*finger of foot|Sesamoid bones of foot/i.test(n));"+decoder[end:]
decoder=decoder.replace("typed.length/(type==='VEC3'?3:1)","typed.length/({SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[type])").replace("a.num_components()===3?'VEC3':'SCALAR'","({1:'SCALAR',2:'VEC2',3:'VEC3',4:'VEC4'}[a.num_components()])")
(source/'decode.cjs').write_text(decoder)
subprocess.run(['node',str(source/'decode.cjs')],env={**os.environ,'ATLAS_SOURCE':str(source)},check=True)
s=trimesh.load(source/'skeleton-decoded.glb',force='scene')
MAP={'Hip bone.r.001':'hip-right','Hip bone.l.001':'hip-left','Sacrum.001':'sacrum','Coccyx.001':'coccyx'}
added=[];foot=[]
for name in s.graph.nodes_geometry:
    if name not in MAP and not name.endswith('.r.001'):continue
    matrix,gn=s.graph[name];m=s.geometry[gn].copy();m.apply_transform(matrix);m.apply_scale(1000)
    if name in MAP:added.append((MAP[name],name,m))
    elif re.search(r'Talus|Calcaneus|Navicular bone|Cuboid bone|cuneiform bone|metatarsal bone|phalanx.*finger of foot|Sesamoid bones of foot',name,re.I):foot.append(m)
assert {x[0] for x in added}==set(MAP.values())
assert len(foot)==27,len(foot)
vs=np.vstack([m.vertices for m in foot]);origin=(vs.min(0)+vs.max(0))/2
base=trimesh.load(OUT/'assets/knee.glb',force='scene')
prior={n:(base.graph[n][0].copy(),base.geometry[base.graph[n][1]].copy()) for n in base.graph.nodes_geometry}
assert len(prior)==32
meta=json.loads((OUT/'assets/provenance.json').read_text());add_details=[]
for ident,name,m in sorted(added,key=lambda x:list(MAP.values()).index(x[0])):
    m.vertices-=origin;bounds=m.bounds.copy();pos=bounds.mean(0);m.vertices-=pos
    m.visual=trimesh.visual.ColorVisuals(m,vertex_colors=[232,223,204,255]);m.metadata={}
    base.add_geometry(m,node_name=ident,geom_name=ident,transform=trimesh.transformations.translation_matrix(pos))
    detail={'id':ident,'sourceNode':name,'center':pos.tolist(),'bounds':bounds.tolist(),'vertices':len(m.vertices),'triangles':len(m.faces)}
    add_details.append(detail);meta['bones'].append(detail)
asset=base.export(file_type='glb',include_normals=True);(OUT/'assets/hip.glb').write_bytes(asset)
check=trimesh.load(OUT/'assets/hip.glb',force='scene');errors={}
for n,(mat,m) in prior.items():
    mat2,gn=check.graph[n];m2=check.geometry[gn]
    assert np.array_equal(m.faces,m2.faces),n
    assert m.vertices.shape==m2.vertices.shape,n
    err=float(np.max(np.abs(trimesh.transform_points(m.vertices,mat)-trimesh.transform_points(m2.vertices,mat2))))
    assert err<0.0001,(n,err);errors[n]=err
assert len(check.graph.nodes_geometry)==36
pv=np.vstack([np.asarray(b['bounds']) for b in add_details]);pelvis_bounds=np.array([pv.min(0),pv.max(0)])
r=next(b for b in add_details if b['id']=='hip-right');hip_bounds=np.array(r['bounds']);hip_bounds[0]-=[30,60,30];hip_bounds[1]+=[30,15,30]
meta.update({'baseRef':BASE_REF,'newBones':list(MAP.values()),'totalTriangles':sum(x['triangles'] for x in meta['bones']),'approvedKneePreserved':True,'priorMeshCoordinateErrorsMillimeters':errors,'maxPriorCoordinateErrorMillimeters':max(errors.values()),'pelvisFocusBounds':pelvis_bounds.tolist(),'hipFocusBounds':hip_bounds.tolist(),'basicBones':34,'sesamoids':2,'pelvicBones':4,'standardRightLimbBones':30,'additionalHalluxSesamoids':2,'modifications':'Preserved all 32 approved knee/leg/foot meshes, their vertices, face indices and original transforms. Added the published right and left hip bone, sacrum and coccyx with baked source transforms, including the source left-side reflection. No new smoothing, subdivision, remeshing, truncation or independent scaling. Adult hip bones remain one selectable bone each.','extension':'Complete bony pelvis with right free lower limb; no left femur, lumbar spine, cartilage, ligaments, labrum or physical joint simulation.'})
(OUT/'assets/provenance.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2))
info={'version':'hip-v1','baseRef':BASE_REF,'bones':36,'pelvicBones':4,'standardRightLimbBones':30,'additionalHalluxSesamoids':2,'addedBones':list(MAP.values()),'totalTriangles':meta['totalTriangles'],'modelBytes':len(asset),'approvedKneePreserved':True,'maxPriorCoordinateErrorMillimeters':max(errors.values()),'noRuntimeNetwork':True,'threeVersion':'0.180.0'}
(OUT/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
print('HIP_MODEL_OK',json.dumps(info));print('ADDED',json.dumps(add_details));print('ORIGIN',origin.tolist())
