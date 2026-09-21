"""Extract only additional right femur and patella; preserve all 30 approved meshes."""
from pathlib import Path
import hashlib,json,os,re,shutil,subprocess,tempfile,urllib.request
import numpy as np
import trimesh
ROOT=Path(__file__).resolve().parents[1]
BASE_REF='cda7429af0fe45e80a1e36a300154edc7ef9d2cc'
OUT=ROOT/'knee-atlas';OUT.mkdir(exist_ok=True)
PKG=Path(os.environ['THREE_PACKAGE'])
def original(path):return subprocess.check_output(['git','show',BASE_REF+':'+path],cwd=ROOT)
files=['app.js','bones-data.js','styles.css','index.template.html','assets/ankle.glb','assets/provenance.json','MODEL-LICENSES.txt','LICENSE','build-info.json']
files+=subprocess.check_output(['git','ls-tree','-r','--name-only',BASE_REF,'ankle-atlas/vendor/'],cwd=ROOT,text=True).splitlines()
for f in files:
    f=f.removeprefix('ankle-atlas/')
    p=OUT/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(original('ankle-atlas/'+f))
old=trimesh.load(OUT/'assets/ankle.glb',force='scene')
prior={n:(old.graph[n][0].copy(),old.geometry[old.graph[n][1]].copy()) for n in old.graph.nodes_geometry}
assert len(prior)==30
meta=json.loads((OUT/'assets/provenance.json').read_text())
with tempfile.TemporaryDirectory(prefix='knee-source-') as directory:
    src=Path(directory)
    url='https://raw.githubusercontent.com/Liyucheng1997/242_lab-human-anatomy/main/public/models/skeleton.glb'
    with urllib.request.urlopen(url,timeout=90) as response:data=response.read()
    sha=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
    assert sha=='5e15f7ea303c554f6c25a417f7f184696234b436',sha
    (src/'z-anatomy-skeleton.glb').write_bytes(data)
    shutil.copy(PKG/'examples/jsm/libs/draco/gltf/draco_decoder.js',src/'draco_decoder.cjs')
    decoder=original('foot-atlas/decode_draco.cjs').decode().replace('Talus|Calcaneus','Femur|Patella|Talus|Calcaneus')
    (src/'decode.cjs').write_text(decoder)
    subprocess.run(['node',str(src/'decode.cjs')],env={**os.environ,'ATLAS_SOURCE':str(src)},check=True)
    scene=trimesh.load(src/'skeleton-decoded.glb',force='scene')
    foot=[];added=[]
    for name in scene.graph.nodes_geometry:
        if not name.endswith('.r.001'):continue
        matrix,gn=scene.graph[name];mesh=scene.geometry[gn].copy();mesh.apply_transform(matrix);mesh.apply_scale(1000)
        raw=name[:-6]
        if raw in ['Femur','Patella']:added.append((raw.lower(),name,mesh))
        elif re.search(r'Talus|Calcaneus|Navicular bone|Cuboid bone|cuneiform bone|metatarsal bone|phalanx.*finger of foot|Sesamoid bones of foot',raw,re.I):foot.append(mesh)
    assert {i[0] for i in added}=={'femur','patella'},[n for n in scene.graph.nodes_geometry]
    verts=np.vstack([m.vertices for m in foot]);origin=(verts.min(0)+verts.max(0))/2
    for ident,name,mesh in added:
        mesh.vertices-=origin
        bounds=mesh.bounds.copy();position=bounds.mean(0);mesh.vertices-=position
        mesh.visual=trimesh.visual.ColorVisuals(mesh,vertex_colors=[232,223,204,255]);mesh.metadata={}
        old.add_geometry(mesh,node_name=ident,geom_name=ident,transform=trimesh.transformations.translation_matrix(position))
        meta['bones'].append({'id':ident,'sourceNode':name,'center':position.tolist(),'bounds':bounds.tolist(),'vertices':len(mesh.vertices),'triangles':len(mesh.faces)})
assert len(old.graph.nodes_geometry)==32
asset=old.export(file_type='glb',include_normals=True);(OUT/'assets/knee.glb').write_bytes(asset)
loaded=trimesh.load(OUT/'assets/knee.glb',force='scene');errors={}
for name,(matrix,mesh) in prior.items():
    matrix2,gn=loaded.graph[name];m2=loaded.geometry[gn]
    assert np.array_equal(mesh.faces,m2.faces),name
    assert mesh.vertices.shape==m2.vertices.shape,name
    err=float(np.max(np.abs(trimesh.transform_points(mesh.vertices,matrix)-trimesh.transform_points(m2.vertices,matrix2))))
    assert err<0.0001,(name,err);errors[name]=err
patella=next(b for b in meta['bones'] if b['id']=='patella')
center=np.array(patella['center'])+np.array([0,-8,-25])
meta.update({'baseRef':BASE_REF,'basicBones':30,'sesamoids':2,'newBones':['femur','patella'],'totalTriangles':sum(x['triangles'] for x in meta['bones']),'approvedAnklePreserved':True,'maxPriorCoordinateErrorMillimeters':max(errors.values()),'priorMeshCoordinateErrorsMillimeters':errors,'kneeFocusBounds':[(center+[-95,-110,-100]).tolist(),(center+[95,115,105]).tolist()],'modifications':'Kept all 30 approved ankle/foot meshes, faces and transforms; added source right femur and patella in the original shared coordinate system. No subdivision, fabricated shape, stretching or separate scaling. Knee focus is camera framing, not geometry cropping.','extension':'Right free lower limb: femur, patella, tibia, fibula and foot, plus two hallux sesamoids. No pelvic bone or knee soft tissues.'})
(OUT/'assets/provenance.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2))
info={'version':'knee-v1','baseRef':BASE_REF,'bones':32,'standardLimbBones':30,'additionalHalluxSesamoids':2,'addedBones':['femur','patella'],'totalTriangles':meta['totalTriangles'],'modelBytes':len(asset),'approvedAnklePreserved':True,'maxPriorCoordinateErrorMillimeters':max(errors.values()),'noRuntimeNetwork':True,'threeVersion':'0.180.0'}
(OUT/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
print('ADDITIVE_ANATOMY_OK',json.dumps(info));print('ADDED_BONES',json.dumps(meta['bones'][-2:]));
