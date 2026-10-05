import {boneSegment} from '../fullbody-tcm-v55/pose-segments.js';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v55/bones-data.js';
import {normalizeFemaleMesh} from '../fullbody-tcm-v55/body-frame-v18.js';
import {addRegionHints,mergeSurfaceGeometry} from '../fullbody-tcm-v55/pose-regions.js';
import {createPoseBinding,posedTriangle} from '../fullbody-tcm-v55/pose-binding.js';
import {solvePose,matrixFor,REST} from '../fullbody-tcm-v55/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v55/pose-catalog.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v55/pose-grip.js';
import {createInertiaRig,observeGravity,FEMALE_PARAMETERS} from '../fullbody-tcm-v55/pose-inertia.js';

// Decode the unchanged, bundled official decoder offline. No network or browser
// execution is needed to check either native female or shared source geometry.
const sandbox={module:{exports:{}},exports:{},console,setTimeout,clearTimeout,performance};vm.runInNewContext(fs.readFileSync('fullbody-tcm-v55/draco-decoder.txt','utf8'),sandbox);const draco=await sandbox.module.exports({});
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
const segment=boneSegment;
boneDoc.scene.traverse(n=>{if(n.isMesh){const m=new T.Mesh(bake(n));m.name=n.name;m.userData={info:data.get(n.name),segment:segment(data.get(n.name))};meshes.push(m);}});
const handRig=createHandRig(meshes);if(process.env.ATLAS_BINDING_POSE)console.log(JSON.stringify({hands:Object.fromEntries(['R','L'].map(s=>[s,{palm:handRig[s].palm.toArray(),wrist:handRig[s].wristRest.toArray(),fingers:handRig[s].fingers.map(f=>({index:f.index,nodes:f.nodes.map(n=>n.toArray())}))}]))}));const binding=createPoseBinding(handRig),skin={};
for(const sex of ['male','female']){const d=await load(sex==='male'?'fullbody-tcm-v11/assets/surface.glb':'fullbody-tcm-v12/assets/female/surface.glb');skin[sex]=[];d.scene.traverse(n=>{if(n.isMesh){const sourcePosition=n.geometry.attributes.position.clone(),g=bake(n,sex==='female');g.userData.sourcePosition=sourcePosition;g.userData.nativeFemale=sex==='female';addRegionHints(g,{...n.userData.atlas,system:'surface'},sex==='female'?sourcePosition:null,true);skin[sex].push(g);}});}
const modelMeta={};for(const sex of ['male','female']){
 const g=mergeSurfaceGeometry(skin[sex]);skin[sex]=[g];g.userData.nativeFemale=sex==='female';binding.attributes(g,{surface:true});binding.prepareSurface(g);g.userData.sourcePosition=g.attributes.position;
 const n=g.attributes.position.count,extra=[];for(let i=0;i<n;i++)if(g.attributes.poseHand.getX(i)>0)extra.push(i);
 const bytes=Buffer.alloc(12+24*n+56*extra.length);bytes.writeUInt32LE(0x534b3438,0);bytes.writeUInt32LE(n,4);bytes.writeUInt32LE(extra.length,8);Buffer.from(g.attributes.skinIndex.array.buffer).copy(bytes,12);Buffer.from(g.attributes.skinWeight.array.buffer).copy(bytes,12+n*8);
 for(let row=0;row<extra.length;row++){const i=extra[row],offset=12+n*24+row*56;bytes.writeUInt32LE(i,offset);bytes.writeFloatLE(g.attributes.poseHand.getX(i),offset+4);for(let block=0;block<2;block++)for(let k=0;k<4;k++){const id=block?'Extra':'Hand';bytes.writeUInt16LE(g.attributes['skinIndex'+id].array[i*4+k],offset+8+block*8+k*2);bytes.writeFloatLE(g.attributes['skinWeight'+id].array[i*4+k],offset+24+block*16+k*4);}}
 fs.writeFileSync('fullbody-tcm-v55/pose-skin-'+sex+'.bin',bytes);modelMeta[sex]={legPartition:g.userData.legPartition,vertices:n,extraVertices:extra.length,positionHash:crypto.createHash('sha256').update(Buffer.from(g.attributes.position.array.buffer)).digest('hex'),bindingHash:crypto.createHash('sha256').update(bytes).digest('hex')};
}
fs.writeFileSync('fullbody-tcm-v55/pose-binding-data.json',JSON.stringify({version:'55.0.0',influences:8,layout:'sparse-phone-hand-eight',palette:binding.ids,models:modelMeta,sourceSkinVerticesUnmoved:true,method:binding.method},null,2));
const identity={parts:Object.fromEntries(Object.entries(REST).map(([id,a])=>[id,{position:new T.Vector3(...a),rest:new T.Vector3(...a),rotation:new T.Quaternion()}]))};binding.update(identity);
let totalVertices=0;
for(const gs of Object.values(skin))for(const g of gs){const p=g.attributes.position;totalVertices+=p.count;for(let i=0;i<p.count;i++){const sum=Array.from(g.attributes.skinWeight.array.slice(i*4,i*4+4)).reduce((a,b)=>a+b,0);assert(Math.abs(sum-1)<1e-6);if(g.attributes.poseHand.getX(i)>0){const sumHand=[...g.attributes.skinWeightHand.array.slice(i*4,i*4+4),...g.attributes.skinWeightExtra.array.slice(i*4,i*4+4)].reduce((a,b)=>a+b,0);assert(Math.abs(sumHand-1)<1e-6);}assert(binding.vertex(g,i).distanceTo(new T.Vector3().fromBufferAttribute(p,i))<1e-7);}}
const rows=[];
for(const p of POSES.filter(p=>!process.env.ATLAS_BINDING_POSE||p.id===process.env.ATLAS_BINDING_POSE))for(const phase of [0,.25,.5,.75,1]){const spec=stateFor(p,phase);spec.taskId=p.id;const r=solvePose(spec),task=gripTask(spec,r);if(task)solveGrip(r,task,handRig);binding.update(r);
 for(const [sex,gs] of Object.entries(skin)){
  const totalPositions=gs.reduce((n,g)=>n+g.attributes.position.count,0),totalIndices=gs.reduce((n,g)=>n+(g.index?.count||g.attributes.position.count),0);let maxLength=0,maxRatio=0,minRatio=1,checked=0,worstEdge=null;const box=new T.Box3();for(const g of gs){const pos=g.attributes.position,step=Math.max(1,Math.ceil(totalPositions/1500));for(let i=0;i<pos.count;i+=step){const v=binding.vertex(g,i);assert(v.toArray().every(Number.isFinite));box.expandByPoint(v);}
   const count=g.index?.count||pos.count,triangleStep=Math.max(3,Math.ceil(totalIndices/1500/3)*3);for(let i=0;i+2<count;i+=triangleStep){const vertices=[0,1,2].map(k=>g.index?g.index.getX(i+k):i+k),anchor={vertices,bary:[.2,.3,.5]},point=posedTriangle(binding,g,anchor).point,a=binding.vertex(g,vertices[0]),b=binding.vertex(g,vertices[1]),c=binding.vertex(g,vertices[2]),expected=a.clone().multiplyScalar(.2).addScaledVector(b,.3).addScaledVector(c,.5);assert(point.distanceTo(expected)<1e-9);const restA=new T.Vector3().fromBufferAttribute(pos,vertices[0]),restB=new T.Vector3().fromBufferAttribute(pos,vertices[1]),base=restA.distanceTo(restB),length=a.distanceTo(b);maxLength=Math.max(maxLength,length);if(base>.001){if(length/base>maxRatio){maxRatio=length/base;worstEdge={original:vertices.slice(0,2).map(i=>new T.Vector3().fromBufferAttribute(g.userData.sourcePosition,i).toArray()),rest:[restA.toArray(),restB.toArray()],posed:[a.toArray(),b.toArray()],base,length,weights:vertices.slice(0,2).map(j=>Array.from(g.attributes.skinWeight.array.slice(j*4,j*4+4))),parts:vertices.slice(0,2).map(j=>Array.from(g.attributes.skinIndex.array.slice(j*4,j*4+4)).map(i=>binding.ids[i]))};}minRatio=Math.min(minRatio,length/base);}checked++;}
  }assert(box.getSize(new T.Vector3()).length()<4,p.id+' exploded skin');assert(maxLength<.2,p.id+' catastrophic display tear');assert(maxRatio<20,p.id+' catastrophic display edge stretch');rows.push({pose:p.id,phase,sex,trianglesSampled:checked,maxEdgeLength:maxLength,maxEdgeRatio:maxRatio,minEdgeRatio:minRatio,worstEdge,bounds:[box.min.toArray(),box.max.toArray()]});
 }
 const female=observeGravity(p,spec,r,createInertiaRig(meshes,handRig,'female'),{mass:70,gravity:9.81,load:0},[0,0,0],false);assert.equal(female.sex,'female');assert(Math.abs(female.massSum-70)<1e-9);assert(Math.abs(female.upper.fraction-.4576/.9999)<1e-9);assert.deepEqual(female.parameters,FEMALE_PARAMETERS);assert.equal(female.internalJointForce,null);
}
const adjustedRows=[];
for(const id of ['stand-relaxed','sit-supported','supine','side-left','yoga-table','swim-breast-glide'])for(const adjustment of [{lumbarSide:12,cervicalSide:-12},{lumbarSide:-12,cervicalSide:12},{lumbarFlex:12,cervicalFlex:-12},{lumbarFlex:-12,cervicalFlex:12},{thoracicSide:12},{thoracicSide:-12},{thoracicFlex:12},{thoracicFlex:-12},{thoracicTwist:12},{thoracicTwist:-12},{thoracicSide:12,thoracicFlex:12,thoracicTwist:12,cervicalSide:-12,lumbarSide:-12}]){
 const p=POSES.find(p=>p.id===id);assert(p,id);const spec={...stateFor(p,0),spineAdjustment:adjustment,taskId:id},r=solvePose(spec),task=gripTask(spec,r);if(task)solveGrip(r,task,handRig);binding.update(r);
 for(const [sex,gs]of Object.entries(skin)){let checked=0,maxLength=0,maxRatio=0;for(const g of gs){const pos=g.attributes.position,count=g.index?.count||pos.count,step=Math.max(3,Math.ceil(count/1500/3)*3);for(let i=0;i+2<count;i+=step){const vertices=[0,1,2].map(k=>g.index?g.index.getX(i+k):i+k),actual=vertices.map(j=>binding.vertex(g,j)),point=posedTriangle(binding,g,{vertices,bary:[.2,.3,.5]}).point;assert(point.distanceTo(actual[0].clone().multiplyScalar(.2).addScaledVector(actual[1],.3).addScaledVector(actual[2],.5))<1e-9);assert(actual.every(v=>v.toArray().every(Number.isFinite)));for(let k=0;k<3;k++){const length=actual[k].distanceTo(actual[(k+1)%3]),base=new T.Vector3().fromBufferAttribute(pos,vertices[k]).distanceTo(new T.Vector3().fromBufferAttribute(pos,vertices[(k+1)%3]));maxLength=Math.max(maxLength,length);if(base>.001)maxRatio=Math.max(maxRatio,length/base);}checked++;}}
  assert(maxLength<.2,id+' adjusted skin tear');assert(maxRatio<20,id+' adjusted skin stretch');adjustedRows.push({pose:id,sex,adjustment,trianglesSampled:checked,maxLength,maxRatio});
 }
}
fs.writeFileSync('atlas55-tools/binding-verification.json',JSON.stringify({totalVertices,states:rows.length,adjustedStates:adjustedRows.length,method:binding.method,rows,adjustedRows},null,2));
console.log(JSON.stringify({sourceSkinVertices:totalVertices,skinStates:rows.length,restIdentity:true,weightsNormalized:true,triangleAttachmentsExact:true,femaleMassConserved:true,clinicalCalibration:false,worstEdgeRatio:Math.max(...rows.map(r=>r.maxEdgeRatio))}));
