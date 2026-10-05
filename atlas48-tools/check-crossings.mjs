import {gripTask as oldGripTask,solveGrip as oldSolveGrip} from '../fullbody-tcm-v47/pose-grip.js';
import {MeshBVH,ExtendedTriangle} from 'three-mesh-bvh';
import {createPoseBinding as oldBinding} from '../fullbody-tcm-v47/pose-binding.js';
import {addRegionHints as oldRegionHints} from '../fullbody-tcm-v47/pose-regions.js';
import {POSES as OLD_POSES,stateFor as oldState} from '../fullbody-tcm-v47/pose-catalog.js';
import {solvePose as oldSolve} from '../fullbody-tcm-v47/pose-engine.js';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v48/bones-data.js';
import {normalizeFemaleMesh} from '../fullbody-tcm-v48/body-frame-v18.js';
import {addRegionHints,mergeSurfaceGeometry} from '../fullbody-tcm-v48/pose-regions.js';
import {createPoseBinding,posedTriangle} from '../fullbody-tcm-v48/pose-binding.js';
import {solvePose,matrixFor,REST} from '../fullbody-tcm-v48/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v48/pose-catalog.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v48/pose-grip.js';
import {createInertiaRig,observeGravity,FEMALE_PARAMETERS} from '../fullbody-tcm-v48/pose-inertia.js';

// Decode the unchanged, bundled official decoder offline. No network or browser
// execution is needed to check either native female or shared source geometry.
const sandbox={module:{exports:{}},exports:{},console,setTimeout,clearTimeout,performance};vm.runInNewContext(fs.readFileSync('fullbody-tcm-v48/draco-decoder.txt','utf8'),sandbox);const draco=await sandbox.module.exports({});
const decoder={preload(){},decodeDracoFile(buffer,callback,ids,types,_color,onError){
 return Promise.resolve().then(()=>{const decoder=new draco.Decoder(),source=new Int8Array(buffer),mesh=new draco.Mesh(),status=decoder.DecodeArrayToMesh(source,source.byteLength,mesh);if(!status.ok())throw Error(status.error_msg());const g=new T.BufferGeometry();
  for(const [name,id] of Object.entries(ids)){const attr=decoder.GetAttributeByUniqueId(mesh,id),count=mesh.num_points()*attr.num_components(),pointer=draco._malloc(count*4);decoder.GetAttributeDataArrayForAllPoints(mesh,attr,draco.DT_FLOAT32,count*4,pointer);const values=new Float32Array(draco.HEAPF32.buffer,pointer,count).slice();draco._free(pointer);g.setAttribute(name,new T.BufferAttribute(values,attr.num_components()));}
  const count=mesh.num_faces()*3,pointer=draco._malloc(count*4);decoder.GetTrianglesUInt32Array(mesh,count*4,pointer);g.setIndex(new T.BufferAttribute(new Uint32Array(draco.HEAPU32.buffer,pointer,count).slice(),1));draco._free(pointer);draco.destroy(mesh);draco.destroy(decoder);callback(g);return g;
 }).catch(onError);
}};
const loader=new GLTFLoader().setDRACOLoader(decoder);
async function load(path){const b=fs.readFileSync(path),g=await loader.parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');g.scene.updateMatrixWorld(true);return g;}
function bake(n,female=false){if(female)normalizeFemaleMesh(n,T);const g=n.geometry.clone().applyMatrix4(n.matrixWorld);g.scale(.001,.001,.001).translate(-.09955,-.835,.05);g.computeBoundingBox();return g;}
const data=new Map(BONES.map(b=>[b.id,b])),boneDoc=await load('fullbody-tcm-v9/assets/fullbody.glb'),meshes=[];
function segment(b){const s=b.side==='left'?'L':'R';if(b.group==='cervical'||b.group==='lumbar')return b.id;if(['cranial','facial','head-other'].includes(b.group))return'head';if(['thorax','thoracic','shoulder'].includes(b.group))return'trunk';if(b.group==='pelvis')return'pelvis';if(b.group==='arm')return b.id.startsWith('humerus')?'shoulder'+s:'elbow'+s;if(['carpal','metacarpal','hand-phalanges'].includes(b.group))return'wrist'+s;if(b.group==='thigh')return b.id.startsWith('patella')?'patella'+s:'hip'+s;if(b.group==='leg')return'knee'+s;return'ankle'+s;}
boneDoc.scene.traverse(n=>{if(n.isMesh){const m=new T.Mesh(bake(n));m.name=n.name;m.userData={info:data.get(n.name),segment:segment(data.get(n.name))};meshes.push(m);}});
const handRig=createHandRig(meshes);if(process.env.ATLAS_BINDING_POSE)console.log(JSON.stringify({hands:Object.fromEntries(['R','L'].map(s=>[s,{palm:handRig[s].palm.toArray(),wrist:handRig[s].wristRest.toArray(),fingers:handRig[s].fingers.map(f=>({index:f.index,nodes:f.nodes.map(n=>n.toArray())}))}]))}));const binding=createPoseBinding(handRig),skin={};
for(const sex of ['male','female']){const d=await load(sex==='male'?'fullbody-tcm-v11/assets/surface.glb':'fullbody-tcm-v12/assets/female/surface.glb');skin[sex]=[];d.scene.traverse(n=>{if(n.isMesh){const sourcePosition=n.geometry.attributes.position.clone(),g=bake(n,sex==='female');g.userData.sourcePosition=sourcePosition;g.userData.nativeFemale=sex==='female';g.userData.sourceInfo=n.userData.atlas;g.userData.sourceName=n.userData.atlas?.name||n.name;addRegionHints(g,{...n.userData.atlas,system:'surface'},sex==='female'?sourcePosition:null,true);binding.attributes(g);skin[sex].push(g);}});}

if(process.env.ATLAS_COMPONENTS)for(const [sex,gs] of Object.entries(skin))console.log(JSON.stringify({sex,components:gs.map(g=>g.userData.armComponents)}));
for(const [sex,gs]of Object.entries(skin)){skin[sex]=[mergeSurfaceGeometry(gs)];skin[sex][0].userData.sourceName=sex+'-merged-source';skin[sex][0].userData.nativeFemale=sex==='female';}
const before=oldBinding(handRig);for(const gs of Object.values(skin))for(const g of gs){before.attributes(g,{surface:true});before.prepareSurface(g);g.userData.oldIndices=g.attributes.skinIndex.clone();g.userData.oldWeights=g.attributes.skinWeight.clone();binding.attributes(g,{surface:true});binding.prepareSurface(g);g.userData.newIndices=g.attributes.skinIndex.clone();g.userData.newWeights=g.attributes.skinWeight.clone();}
const rows=[],identityMatrix=new T.Matrix4(),regionFor=(g,i)=>{const p=g.attributes.position,x=p.getX(i),y=p.getY(i),arm=g.getAttribute('bindingArm').getX(i);if(arm>.8)return x<0?'arm-right':'arm-left';if(y<-.27)return x<0?'leg-right':'leg-left';return 'body';};
for(const id of ['yoga-dog','yoga-child','side-curl-left','bend-hips','carry-chest','stand-phone','sit-phone','stand-high-phone','work-phone-ear'].filter(id=>!process.env.ATLAS_DIAG||process.env.ATLAS_DIAG.split(',').includes(id))){const p=POSES.find(p=>p.id===id),spec=stateFor(p,0);spec.taskId=id;spec.flags=p.flags;
 for(const version of ['before','after']){const b=version==='before'?before:binding,active=version==='before'?{...oldState(OLD_POSES.find(p=>p.id===id),0),taskId:id,flags:p.flags}:spec,r=(version==='before'?oldSolve:solvePose)(active),task=(version==='before'?oldGripTask:gripTask)(active,r);if(task)(version==='before'?oldSolveGrip:solveGrip)(r,task,handRig);b.update(r);
 for(const [sex,gs]of Object.entries(skin)){const g=gs[0];g.userData.dualQuaternion=true;g.setAttribute('skinIndex',g.userData[version==='before'?'oldIndices':'newIndices']);g.setAttribute('skinWeight',g.userData[version==='before'?'oldWeights':'newWeights']);const parts=new Map(),rest=g.attributes.position,posed=new Float32Array(rest.count*3);for(let i=0;i<rest.count;i++)posed.set(b.vertex(g,i).toArray(),i*3);
 for(let i=0;i<g.index.count;i+=3){const ids=[0,1,2].map(k=>g.index.getX(i+k)),regions=ids.map(j=>regionFor(g,j));if(!regions.every(v=>v===regions[0]))continue;const name=regions[0];if(!parts.has(name))parts.set(name,[]);parts.get(name).push(...ids);}
 const docs=new Map();for(const [name,ids]of parts){const geom=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(posed,3));geom.setIndex(ids);docs.set(name,{geometry:geom,bvh:new MeshBVH(geom,{indirect:true,maxLeafTris:8})});}
 for(const [a,c]of [['arm-right','body'],['arm-left','body'],['arm-right','arm-left'],['leg-right','leg-left'],['leg-right','body'],['leg-left','body']]){const aa=docs.get(a),cc=docs.get(c);if(!aa||!cc)continue;let count=0;const examples=[];
 aa.bvh.bvhcast(cc.bvh,identityMatrix,{intersectsTriangles:(t1,t2,i,j)=>{if(!t1.intersectsTriangle(t2,null,true))return false;const ai=aa.bvh.resolveTriangleIndex(i)*3,ci=cc.bvh.resolveTriangleIndex(j)*3,idsA=[0,1,2].map(k=>aa.geometry.index.getX(ai+k)),idsC=[0,1,2].map(k=>cc.geometry.index.getX(ci+k));if(idsA.some(v=>idsC.includes(v)))return false;const ra=new ExtendedTriangle(...idsA.map(v=>new T.Vector3().fromBufferAttribute(rest,v))),rc=new ExtendedTriangle(...idsC.map(v=>new T.Vector3().fromBufferAttribute(rest,v))),centerA=ra.getMidpoint(new T.Vector3()),centerC=rc.getMidpoint(new T.Vector3());if(centerA.distanceTo(centerC)<.04||ra.intersectsTriangle(rc,null,true))return false;count++;if(examples.length<3)examples.push({vertices:[idsA,idsC],rest:[ra.a.toArray(),ra.b.toArray(),ra.c.toArray(),rc.a.toArray(),rc.b.toArray(),rc.c.toArray()],posed:[t1.a.toArray(),t1.b.toArray(),t1.c.toArray(),t2.a.toArray(),t2.b.toArray(),t2.c.toArray()]});return false;}});rows.push({pose:id,phase:0,sex,version,pair:[a,c],crossingTrianglePairs:count,examples});console.log(JSON.stringify({pose:id,sex,version,pair:[a,c],crossings:count}));}
 }
 }
}
fs.writeFileSync('atlas48-tools/crossing-verification.json',JSON.stringify({measurement:'New intersections of nonadjacent region triangles, rest centroids at least 40 mm apart; excludes shared vertices and intersections already in source. Counts triangle pairs, not depth, force or clinical pressure.',serializationDecimalPlaces:8,rows},(_key,value)=>typeof value==='number'?Number(value.toFixed(8)):value,2));

const total=(pose,sex,version)=>rows.filter(r=>r.pose===pose&&r.sex===sex&&r.version===version).reduce((n,r)=>n+r.crossingTrianglePairs,0);for(const pose of ['stand-phone','sit-phone','stand-high-phone'])for(const sex of ['male','female']){assert(total(pose,sex,'after')<=total(pose,sex,'before'),'phone total crossings regression');assert.equal(rows.find(r=>r.pose===pose&&r.sex===sex&&r.version==='after'&&r.pair.join('|')==='arm-right|arm-left').crossingTrianglePairs,0,'phone hands still cross');}for(const pose of ['yoga-dog','yoga-child','side-curl-left','bend-hips','carry-chest','work-phone-ear'])for(const sex of ['male','female'])assert.equal(total(pose,sex,'after'),total(pose,sex,'before'),'unrelated crossings changed');
