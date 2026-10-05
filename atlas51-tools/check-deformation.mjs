import {loadCheckedSurface} from './surface-cache.mjs';
import {boneSegment} from '../fullbody-tcm-v51/pose-segments.js';
import {gripTask as oldGripTask,solveGrip as oldSolveGrip} from '../fullbody-tcm-v50/pose-grip.js';
import {createPoseBinding as oldBinding} from '../fullbody-tcm-v50/pose-binding.js';
import {addRegionHints as oldRegionHints} from '../fullbody-tcm-v50/pose-regions.js';
import {POSES as OLD_POSES,stateFor as oldState} from '../fullbody-tcm-v50/pose-catalog.js';
import {solvePose as oldSolve} from '../fullbody-tcm-v50/pose-engine.js';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v51/bones-data.js';
import {normalizeFemaleMesh} from '../fullbody-tcm-v51/body-frame-v18.js';
import {addRegionHints,mergeSurfaceGeometry} from '../fullbody-tcm-v51/pose-regions.js';
import {createPoseBinding,posedTriangle} from '../fullbody-tcm-v51/pose-binding.js';
import {solvePose,matrixFor,REST} from '../fullbody-tcm-v51/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v51/pose-catalog.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v51/pose-grip.js';
import {createInertiaRig,observeGravity,FEMALE_PARAMETERS} from '../fullbody-tcm-v51/pose-inertia.js';

// Decode the unchanged, bundled official decoder offline. No network or browser
// execution is needed to check either native female or shared source geometry.
const sandbox={module:{exports:{}},exports:{},console,setTimeout,clearTimeout,performance};vm.runInNewContext(fs.readFileSync('fullbody-tcm-v51/draco-decoder.txt','utf8'),sandbox);const draco=await sandbox.module.exports({});
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
for(const sex of ['male','female']){const d=await load(sex==='male'?'fullbody-tcm-v11/assets/surface.glb':'fullbody-tcm-v12/assets/female/surface.glb');skin[sex]=[];d.scene.traverse(n=>{if(n.isMesh){const sourcePosition=n.geometry.attributes.position.clone(),g=bake(n,sex==='female');g.userData.sourcePosition=sourcePosition;g.userData.nativeFemale=sex==='female';g.userData.sourceInfo=n.userData.atlas;g.userData.sourceName=n.userData.atlas?.name||n.name;addRegionHints(g,{...n.userData.atlas,system:'surface'},sex==='female'?sourcePosition:null,true);skin[sex].push(g);}});}

if(process.env.ATLAS_COMPONENTS)for(const [sex,gs] of Object.entries(skin))console.log(JSON.stringify({sex,components:gs.map(g=>g.userData.armComponents)}));
for(const [sex,gs]of Object.entries(skin)){skin[sex]=[mergeSurfaceGeometry(gs)];skin[sex][0].userData.sourceName=sex+'-merged-source';skin[sex][0].userData.nativeFemale=sex==='female';}
const before=oldBinding(handRig);for(const [sex,gs]of Object.entries(skin))for(const g of gs){assert.deepEqual(fs.readFileSync('fullbody-tcm-v50/pose-skin-'+sex+'.bin'),fs.readFileSync('fullbody-tcm-v51/pose-skin-'+sex+'.bin'));loadCheckedSurface(g,sex,before);g.userData.oldIndices=g.attributes.skinIndex.clone();g.userData.oldWeights=g.attributes.skinWeight.clone();loadCheckedSurface(g,sex,binding);g.userData.newIndices=g.attributes.skinIndex.clone();g.userData.newWeights=g.attributes.skinWeight.clone();}
const cases=['rest-one-hand','clean-floor','yoga-table','yoga-dog','yoga-child','side-left','side-curl-left','bend-hips','carry-chest','stand-phone','sit-phone','stand-high-phone','work-phone-ear','swim-breast-glide','prone'];
const rows=[];
for(const id of cases.filter(id=>!process.env.ATLAS_DIAG||process.env.ATLAS_DIAG.split(',').includes(id))){const p=POSES.find(p=>p.id===id);if(!p)continue;const spec=stateFor(p,0);spec.taskId=p.id;spec.flags=p.flags;
 for(const version of ['before','after']){const b=version==='before'?before:binding,activeSpec=version==='before'?{...oldState(OLD_POSES.find(p=>p.id===id),0),taskId:id,flags:p.flags}:spec,r=(version==='before'?oldSolve:solvePose)(activeSpec),task=(version==='before'?oldGripTask:gripTask)(activeSpec,r);if(task)(version==='before'?oldSolveGrip:solveGrip)(r,task,handRig);b.update(r);
  for(const [sex,gs]of Object.entries(skin)){let edges=0,maxRatio=0,maxLength=0,worst=null,stretched=0,skinInside=0,skinDepth=0;const groups={};
   for(const g of gs){g.userData.dualQuaternion=true;g.setAttribute('skinIndex',g.userData[version==='before'?'oldIndices':'newIndices']);g.setAttribute('skinWeight',g.userData[version==='before'?'oldWeights':'newWeights']);const pos=g.attributes.position,posed=new Float64Array(pos.count*3);for(let i=0;i<pos.count;i++){const v=b.vertex(g,i);posed.set(v.toArray(),i*3);if(r.grip?.type==='phone'){const local=v.clone().sub(task.center).applyQuaternion(task.rotation.clone().invert()),depth=Math.min(.0375-Math.abs(local.x),.07-Math.abs(local.y),.0045-Math.abs(local.z));if(depth>0){skinInside++;skinDepth=Math.max(skinDepth,depth);}}}
    const count=g.index?.count||pos.count;
    for(let i=0;i<count;i+=3){const ids=[0,1,2].map(k=>g.index?g.index.getX(i+k):i+k);for(let k=0;k<3;k++){const a=ids[k],c=ids[(k+1)%3],base=Math.hypot(pos.getX(a)-pos.getX(c),pos.getY(a)-pos.getY(c),pos.getZ(a)-pos.getZ(c)),length=Math.hypot(...[0,1,2].map(q=>posed[a*3+q]-posed[c*3+q]));maxLength=Math.max(maxLength,length);if(base<=.001)continue;edges++;const ratio=length/base,part=b.ids[g.attributes.skinIndex.getX(a)],region=/hand/.test(part)?'fingers':/^wrist|elbow/.test(part)?'wrist-forearm':/^shoulder/.test(part)?'upper-arm':/^hip/.test(part)?'hip-thigh':/^knee/.test(part)?'knee-calf':/^ankle/.test(part)?'foot':'trunk-head';const bucket=groups[region]||={edges:0,over3:0,max:0};bucket.edges++;bucket.max=Math.max(bucket.max,ratio);if(ratio>3){stretched++;bucket.over3++;}if(ratio>maxRatio){maxRatio=ratio;worst={source:g.userData.sourceName,triangle:i/3,vertices:[a,c],base,length,rest:[a,c].map(j=>[pos.getX(j),pos.getY(j),pos.getZ(j)]),posed:[a,c].map(j=>Array.from(posed.slice(j*3,j*3+3))),parts:[a,c].map(j=>Array.from(g.attributes.skinIndex.array.slice(j*4,j*4+4)).map(n=>b.ids[n])),weights:[a,c].map(j=>Array.from(g.attributes.skinWeight.array.slice(j*4,j*4+4))),phoneHand:[a,c].map(j=>({amount:g.attributes.poseHand.getX(j),parts:[...g.attributes.skinIndexHand.array.slice(j*4,j*4+4),...g.attributes.skinIndexExtra.array.slice(j*4,j*4+4)].map(n=>b.ids[n]),weights:[...g.attributes.skinWeightHand.array.slice(j*4,j*4+4),...g.attributes.skinWeightExtra.array.slice(j*4,j*4+4)],palm:version==='after'?Array.from(g.attributes.posePalm.array.slice(j*3,j*3+3)):null}))};}}}
   }rows.push({pose:id,phase:0,version,sex,edges,maxRatio,maxLength,over3:stretched,groups,worst,heldObjectSkin:r.grip?.type==='phone'?{verticesInside:skinInside,maxDepth:skinDepth}:null});console.log(JSON.stringify({pose:id,version,sex,maxRatio,maxLength,over3:stretched}));
  }
 }
}
fs.writeFileSync('atlas51-tools/deformation-verification.json',JSON.stringify({sourceSkinUnchanged:true,boneMeshesRescaled:false,measurement:'all three triangle edges, rest length > 1 mm; repeated shared edges included',serializationDecimalPlaces:8,rows},(_key,value)=>typeof value==='number'?Number(value.toFixed(8)):value,2));

const changed=new Set(['stand-phone','sit-phone','stand-high-phone','work-phone-ear','yoga-child']);
for(const a of rows.filter(r=>r.version==='after')){
 const b=rows.find(r=>r.version==='before'&&r.pose===a.pose&&r.sex===a.sex);
 assert(a.maxLength<.08,a.pose+' display tear');
 if(changed.has(a.pose)){
  assert(a.maxRatio<=b.maxRatio+1e-6,a.pose+' stretch regression');
  assert(a.over3<=b.over3,a.pose+' extra stretched edges');
  if(a.pose.includes('phone')){assert(a.maxRatio<b.maxRatio,a.pose+' no stretch improvement');assert(a.heldObjectSkin.maxDepth<.002,a.pose+' skin crosses phone beyond existing 2 mm display tolerance');}
 }else{
  assert(Math.abs(a.maxRatio-b.maxRatio)<1e-6,a.pose+' unchanged deformation differs');
  assert.equal(a.over3,b.over3,a.pose+' unchanged stretched edges differ');
 }
}
