"""Add the published LEFT lower limb and L1-L5; never mutate an approved atlas."""
from pathlib import Path
import hashlib,json,os,re,shutil,subprocess,urllib.request
import numpy as np
import trimesh
ROOT=Path(__file__).resolve().parents[1]
BASE_REF='151baae597565be72c82c4ac1e24e2754518ee71'
OUT=ROOT/'lumbar-atlas';OUT.mkdir(exist_ok=True)
LOCAL=not (ROOT/'.git').exists()
def original(p):return (ROOT/p).read_bytes() if LOCAL else subprocess.check_output(['git','show',BASE_REF+':'+p],cwd=ROOT)
for f in ['app.js','bones-data.js','styles.css','index.template.html','assets/hip.glb','assets/provenance.json','MODEL-LICENSES.txt','LICENSE']:
    p=OUT/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(original('hip-atlas/'+f))
if LOCAL:shutil.copytree(ROOT/'hip-atlas/vendor',OUT/'vendor',dirs_exist_ok=True)
else:
    for f in subprocess.check_output(['git','ls-tree','-r','--name-only',BASE_REF,'hip-atlas/vendor/'],cwd=ROOT,text=True).splitlines():
        p=OUT/f.removeprefix('hip-atlas/');p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(original(f))
source=ROOT/'lumbar-source';source.mkdir(exist_ok=True)
if LOCAL:
    data=(ROOT/'toolkit/source.glb').read_bytes();shutil.copy(ROOT/'toolkit/draco_decoder.cjs',source/'draco_decoder.cjs');decoder=(ROOT/'toolkit/decode-original.cjs').read_text()
else:
    with urllib.request.urlopen('https://raw.githubusercontent.com/Liyucheng1997/242_lab-human-anatomy/main/public/models/skeleton.glb',timeout=90) as r:data=r.read()
    shutil.copy(Path(os.environ['THREE_PACKAGE'])/'examples/jsm/libs/draco/gltf/draco_decoder.js',source/'draco_decoder.cjs');decoder=original('foot-atlas/decode_draco.cjs').decode()
sha=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest();assert sha=='5e15f7ea303c554f6c25a417f7f184696234b436'
(source/'z-anatomy-skeleton.glb').write_bytes(data)
meta=json.loads((OUT/'assets/provenance.json').read_text());prior_details=meta['bones'];limb=[b for b in prior_details if b['sourceNode'].endswith('.r.001') and b['id']!='hip-right'];assert len(limb)==32
mapping={b['sourceNode'].replace('.r.001','.l.001'):b['id']+'-left' for b in limb if not b['id'].startswith('sesamoid-')}
mapping['Sesamoid bones of foot.l.001']='sesamoids-left'
for i in range(1,6):mapping[f'Vertebra L{i}.001']=f'L{i}'
foot_names={b['sourceNode'] for b in limb if b['id'] not in ['femur','patella','tibia','fibula']};assert len(foot_names)==27
j=json.loads(data[20:20+int.from_bytes(data[12:16],'little')]);allnames={n.get('name') for n in j['nodes']};assert set(mapping).issubset(allnames),set(mapping)-allnames
selected=sorted(set(mapping)|foot_names)
a=decoder.index('const isFoot=');z=decoder.index('\nconst selected=',a);decoder=decoder[:a]+'const chosen=new Set('+json.dumps(selected)+');const isFoot=n=>chosen.has(n);'+decoder[z:]
decoder=decoder.replace("typed.length/(type==='VEC3'?3:1)","typed.length/({SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[type])").replace("a.num_components()===3?'VEC3':'SCALAR'","({1:'SCALAR',2:'VEC2',3:'VEC3',4:'VEC4'}[a.num_components()])")
(source/'decode.cjs').write_text(decoder);subprocess.run(['node',str(source/'decode.cjs')],env={**os.environ,'ATLAS_SOURCE':str(source)},check=True)
s=trimesh.load(source/'skeleton-decoded.glb',force='scene');raw={};matrices={}
for name in s.graph.nodes_geometry:
    if name not in set(selected):continue
    matrix,gn=s.graph[name];m=s.geometry[gn].copy();m.apply_transform(matrix);m.apply_scale(1000);raw[name]=m;matrices[name]=matrix.tolist()
vs=np.vstack([raw[n].vertices for n in foot_names]);origin=(vs.min(0)+vs.max(0))/2;midline=-float(origin[0])
scene=trimesh.load(OUT/'assets/hip.glb',force='scene');prior={n:(scene.graph[n][0].copy(),scene.geometry[scene.graph[n][1]].copy()) for n in scene.graph.nodes_geometry};assert len(prior)==36
added=[]
for name,ident in mapping.items():
    m=raw[name]
    if ident=='sesamoids-left':
        parts=sorted(m.split(only_watertight=False),key=lambda a:abs(a.centroid[0]));assert len(parts)==2
        added.extend([('sesamoid-medial-left',name,parts[0]),('sesamoid-lateral-left',name,parts[1])])
    else:added.append((ident,name,m))
assert len(added)==37
new_details=[]
for ident,name,m in added:
    m.vertices-=origin;bounds=m.bounds.copy();pos=bounds.mean(0);m.vertices-=pos
    m.visual=trimesh.visual.ColorVisuals(m,vertex_colors=[232,223,204,255]);m.metadata={}
    scene.add_geometry(m,node_name=ident,geom_name=ident,transform=trimesh.transformations.translation_matrix(pos))
    d={'id':ident,'sourceNode':name,'center':pos.tolist(),'bounds':bounds.tolist(),'vertices':len(m.vertices),'triangles':len(m.faces),'sourceMatrix':matrices[name]};new_details.append(d)
asset=scene.export(file_type='glb',include_normals=True);(OUT/'assets/lumbar.glb').write_bytes(asset)
check=trimesh.load(OUT/'assets/lumbar.glb',force='scene');errors={};bounds={}
for n in check.graph.nodes_geometry:
    matrix,gn=check.graph[n];m=check.geometry[gn];v=trimesh.transform_points(m.vertices,matrix);bounds[n]=[v.min(0).tolist(),v.max(0).tolist()]
    if n in prior:
        mat,old=prior[n];assert np.array_equal(old.faces,m.faces),n;assert old.vertices.shape==m.vertices.shape,n
        errors[n]=float(np.max(np.abs(trimesh.transform_points(old.vertices,mat)-v)));assert errors[n]==0,n
assert len(check.graph.nodes_geometry)==73
pair_checks=[]
for b in limb:
    rid=b['id'];lid=rid+'-left';rc=np.mean(bounds[rid],axis=0);lc=np.mean(bounds[lid],axis=0)
    assert lc[0]>rc[0],(rid,rc,lc)
    pair_checks.append({'right':rid,'left':lid,'rightX':float(rc[0]),'leftX':float(lc[0]),'pass':True})
y=[np.mean(bounds[f'L{i}'],axis=0)[1] for i in range(1,6)];assert all(y[i]>y[i+1] for i in range(4)),y
meta.update({'baseRef':BASE_REF,'bones':prior_details+new_details,'newBones':[b['id'] for b in new_details],'totalTriangles':sum(b['triangles'] for b in prior_details+new_details),'approvedHipPreserved':True,'priorMeshCoordinateErrorsMillimeters':errors,'maxPriorCoordinateErrorMillimeters':max(errors.values()),'sideChecks':pair_checks,'modelBounds':bounds,'sourceOriginMillimeters':origin.tolist(),'patientMidlineX':midline,'lumbarOrderSuperiorToInferior':y,'standardFreeLimbBones':60,'pelvicBones':4,'lumbarBones':5,'additionalHalluxSesamoids':4,'basicBones':69,'sesamoids':4,'modifications':'All 36 prior meshes and transforms retained unchanged. Added the published 32 left lower-limb bone meshes and five lumbar vertebrae L1-L5. Baked original source matrices, including source-authored left reflection. No new mirroring, smoothing, invented surfaces or geometry replacement. Split only two disconnected native left hallux sesamoids.','extension':'Lumbar spine, complete bony pelvis, both free lower limbs. No thoracic/cervical vertebrae, intervertebral discs, cartilage, nerves, ligaments or physical joint simulation.'})
(OUT/'assets/provenance.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2))
info={'version':'lumbar-bilateral-v1','baseRef':BASE_REF,'bones':73,'addedLeftLimbBones':32,'addedLumbarBones':5,'priorBones':36,'totalTriangles':meta['totalTriangles'],'modelBytes':len(asset),'approvedHipPreserved':True,'maxPriorCoordinateErrorMillimeters':0,'sideValidatedPairs':32,'noRuntimeNetwork':True,'threeVersion':'0.180.0'}
(OUT/'build-info.json').write_text(json.dumps(info,indent=2));print('MODEL_OK',json.dumps(info));print('MIDLINE',midline,'LUMBAR',y)
