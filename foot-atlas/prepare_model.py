from pathlib import Path
import os, json, numpy as np, trimesh, hashlib, shutil, re
base=Path(__file__).resolve().parent;(base/'assets').mkdir(parents=True,exist_ok=True)
src=Path(os.environ['ATLAS_SOURCE'])/'z-anatomy-skeleton.glb'
s=trimesh.load(Path(os.environ['ATLAS_SOURCE'])/'skeleton-decoded.glb',force='scene')
terms={'Talus':'talus','Calcaneus':'calcaneus','Navicular bone':'navicular','Cuboid bone':'cuboid','Medial cuneiform bone':'cuneiform-medial','Intermediate cuneiform bone':'cuneiform-intermediate','Lateral cuneiform bone':'cuneiform-lateral'}
ordinals=['first','second','third','fourth','fifth'];items=[]
for name in s.graph.nodes_geometry:
 if not name.endswith('.r.001'):continue
 raw=name[:-6];ident=terms.get(raw)
 if 'metatarsal bone' in raw.lower():ident='metatarsal-'+str(ordinals.index(raw.lower().split()[0])+1)
 if 'phalanx' in raw and 'finger of foot' in raw:ident=raw.lower().split()[0]+'-'+str(next(i+1 for i,o in enumerate(ordinals) if 'of '+o+' finger' in raw.lower()))
 if raw=='Sesamoid bones of foot':ident='sesamoids'
 if not ident:continue
 matrix,gn=s.graph[name];m=s.geometry[gn].copy();m.apply_transform(matrix);m.apply_scale(1000)
 if ident=='sesamoids':
  parts=sorted(m.split(only_watertight=False),key=lambda m:m.centroid[0],reverse=True)
  assert len(parts)==2,len(parts)
  for i,mesh in enumerate(parts):items.append(('sesamoid-'+('medial' if i==0 else 'lateral'),name,mesh))
 else:items.append((ident,name,m))
assert len(items)==28,len(items)
allv=np.vstack([m.vertices for _,_,m in items]);center=(allv.min(0)+allv.max(0))/2
scene=trimesh.Scene();details=[]
for ident,name,m in items:
 m.vertices-=center;pos=m.bounds.mean(0);m.vertices-=pos
 # Keep the published surface: no subdivision, invented landmarks, or deformation.
 m.visual=trimesh.visual.ColorVisuals(m,vertex_colors=[232,223,204,255]);m.metadata={}
 scene.add_geometry(m,node_name=ident,geom_name=ident,transform=trimesh.transformations.translation_matrix(pos))
 details.append({'id':ident,'sourceNode':name,'center':pos.tolist(),'vertices':len(m.vertices),'triangles':len(m.faces)})
(base/'assets/foot.glb').write_bytes(scene.export(file_type='glb',include_normals=True))
meta={'side':'right','basicBones':26,'sesamoids':2,'source':'Z-Anatomy / BodyParts3D','license':'CC BY-SA 4.0','sourceURL':'https://github.com/Liyucheng1997/242_lab-human-anatomy/blob/main/public/models/skeleton.glb','sourceBlobSHA':'5e15f7ea303c554f6c25a417f7f184696234b436','sourceSHA256':hashlib.sha256(src.read_bytes()).hexdigest(),'modifications':'Extracted right foot; split the two sesamoid connected components; baked published transforms; converted meters to millimeters; centered the foot and each bone. Anatomical vertex positions otherwise unchanged. Visualization colors replaced.','bounds':(np.array([allv.min(0),allv.max(0)])-center).tolist(),'bones':details,'totalTriangles':sum(x['triangles'] for x in details)}
assert meta['totalTriangles']==16586
(base/'assets/provenance.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2))
print('MODEL_OK',len(items),'bones',meta['totalTriangles'],'triangles')
pkg=Path(os.environ['THREE_PACKAGE']);vendor=base/'vendor';vendor.mkdir(exist_ok=True)
shutil.copy(pkg/'build/three.module.min.js',vendor/'three.module.min.js');shutil.copy(pkg/'build/three.core.min.js',vendor/'three.core.min.js');shutil.copy(pkg/'LICENSE',vendor/'THREE-LICENSE.txt')
entries=['controls/OrbitControls.js','loaders/GLTFLoader.js','environments/RoomEnvironment.js','postprocessing/EffectComposer.js','postprocessing/RenderPass.js','postprocessing/SSAOPass.js','postprocessing/OutputPass.js'];seen=set()
def copydep(rel):
 p=(pkg/'examples/jsm'/rel).resolve()
 if p in seen:return
 seen.add(p);target=vendor/'addons'/p.relative_to(pkg/'examples/jsm');target.parent.mkdir(parents=True,exist_ok=True);shutil.copy(p,target)
 for rel in re.findall(r'''(?:from\s*|import\s*)['"]([^'"]+)['"]''',p.read_text()):
  if rel.startswith('.') and rel.endswith('.js'):copydep(str((p.parent/rel).resolve().relative_to(pkg/'examples/jsm')))
for e in entries:copydep(e)
