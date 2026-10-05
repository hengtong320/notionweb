import {boneSegment} from '../fullbody-tcm-v49/pose-segments.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v49/bones-data.js';
import {POSES,stateFor} from '../fullbody-tcm-v49/pose-catalog.js';
import {solvePose,REST,matrixFor} from '../fullbody-tcm-v49/pose-engine.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v49/pose-grip.js';
const root=process.cwd(),bytes=fs.readFileSync(path.join(root,'fullbody-tcm-v9/assets/fullbody.glb'));
const g=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');g.scene.updateMatrixWorld(true);const boneData=new Map(BONES.map(b=>[b.id,b]));
const segment=boneSegment;
const meshes=[];g.scene.traverse(n=>{if(!n.isMesh)return;const info=boneData.get(n.name),geo=n.geometry.clone();geo.applyMatrix4(new T.Matrix4().makeScale(.001,.001,.001).multiply(n.matrixWorld));geo.translate(-.09955,-.835,.05);geo.computeBoundingBox();const m=new T.Mesh(geo);m.name=n.name;m.userData={segment:segment(info),info};meshes.push(m);});const rig=createHandRig(meshes),rows=[],fails=[];
for(const p of POSES)for(const phase of [0,.25,.5,.75,1]){const spec=stateFor(p,phase);spec.taskId=p.id;const r=solvePose(spec),task=gripTask(spec,r);for(const m of meshes)m.matrix.copy(matrixFor(r.parts[m.userData.segment]));if(!task)continue;solveGrip(r,task,rig);for(const m of meshes)m.matrix.copy(matrixFor(r.parts[m.userData.segment]));for(const e of r.grip.matrices)e.mesh.matrix.copy(e.matrix);
 for(const c of r.grip.contacts)if(c.error>.003)fails.push([p.id,phase,c.side,c.finger,c.error]);
 for(const side of ['R','L'])for(const [a,b] of [['shoulder','elbow'],['elbow','wrist']])assert(Math.abs(r.joints[a+side].distanceTo(r.joints[b+side])-new T.Vector3(...REST[a+side]).distanceTo(b==='wrist'&&task.roles[side]?rig[side].wristRest:new T.Vector3(...REST[b+side])))<1e-8,p.id+' arm bone stretched');
 for(const side of ['R','L'])if(task.roles[side]){const pivot=rig[side].wristRest;assert(pivot.clone().applyMatrix4(matrixFor(r.parts['elbow'+side])).distanceTo(pivot.clone().applyMatrix4(matrixFor(r.parts['wrist'+side])))<1e-8,p.id+' wrist joint disconnected');}
 for(const f of r.grip.fingerChains)for(let i=1;i<f.nodes.length;i++)assert(Math.abs(new T.Vector3(...f.nodes[i]).distanceTo(new T.Vector3(...f.nodes[i-1]))-f.restLengths[i-1])<1e-8,p.id+' finger bone stretched');
 assert(meshes.every(m=>m.matrix.elements.every(Number.isFinite)),p.id+' bone transform');
 const boxDistance=(v,c,size,q=new T.Quaternion())=>{const a=v.clone().sub(c).applyQuaternion(q.clone().invert()),d=new T.Vector3(Math.abs(a.x)-size[0]/2,Math.abs(a.y)-size[1]/2,Math.abs(a.z)-size[2]/2);return Math.min(Math.max(d.x,d.y,d.z),0)+new T.Vector3(Math.max(d.x,0),Math.max(d.y,0),Math.max(d.z,0)).length();};
 const distances=[];if(task.type==='wheel')distances.push(v=>{const a=v.clone().sub(task.center).applyQuaternion(task.rotation.clone().invert());return Math.hypot(Math.hypot(a.x,a.y)-.17,a.z)-.016;});if(task.type==='bag'){distances.push(v=>boxDistance(v,task.center,[.23,.30,.15]));distances.push(v=>new T.Line3(task.handleA,task.handleB).closestPointToPoint(v,true,new T.Vector3()).distanceTo(v)-.011);}if(task.type==='box')distances.push(v=>boxDistance(v,task.center,[.30,.23,.25],task.rotation));if(task.type==='phone')distances.push(v=>boxDistance(v,task.center,[.075,.14,.009],task.rotation));if(task.type==='controller'){distances.push(v=>boxDistance(v,task.center,[.17,.038,.085],task.rotation));for(const sign of [-1,1]){const c=task.center.clone().add(new T.Vector3(sign*.073,-.012,-.015).applyQuaternion(task.rotation));distances.push(v=>boxDistance(v,c,[.044,.065,.105],task.rotation));}}
 if(task.type==='tool')distances.push(v=>new T.Line3(task.top,task.tip).closestPointToPoint(v,true,new T.Vector3()).distanceTo(v)-.014);
 if(task.type==='bike')distances.push(v=>new T.Line3(task.handleA,task.handleB).closestPointToPoint(v,true,new T.Vector3()).distanceTo(v)-.016);
 if(task.type==='guitar'){distances.push(v=>{const a=v.clone().sub(task.center).applyQuaternion(task.rotation.clone().invert());return (Math.hypot(a.x/.18,a.y/.21,a.z/.065)-1)*.065;});const d=task.neck.clone().sub(task.center).normalize(),c=task.center.clone().lerp(task.neck,.60).add(new T.Vector3(0,0,.047).applyQuaternion(task.rotation)),q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),d);distances.push(v=>boxDistance(v,c,[.055,task.center.distanceTo(task.neck)*.8,.035],q));}
 let penetration=0,inside=0,samples=0;const perBone=[];for(const m of meshes.filter(m=>m.userData.segment.startsWith('wrist'))){const a=m.geometry.attributes.position;let boneDepth=0;for(let i=0;i<a.count;i++){const v=new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(m.matrix);for(const sdf of distances){const depth=-sdf(v);penetration=Math.max(penetration,depth);boneDepth=Math.max(boneDepth,depth);if(depth>.002)inside++;samples++;}}if(boneDepth>.002)perBone.push({name:m.name,depth:boneDepth});}
 assert(penetration<.002,p.id+' hand penetrates held object beyond 2 mm mesh tolerance: '+penetration);
 rows.push({pose:p.id,phase,contacts:r.grip.contacts,fingerChains:r.grip.fingerChains,penetration,inside,samples,perBone});
}
fs.writeFileSync(path.join(root,'atlas49-tools/grip-check.json'),JSON.stringify({states:rows.length,poses:new Set(rows.map(x=>x.pose)).size,failures:fails,rows},null,2));console.log(JSON.stringify({heldPoses:new Set(rows.map(x=>x.pose)).size,states:rows.length,maxPenetration:Math.max(...rows.map(r=>r.penetration)),vertexCollisionTolerance:.002,failures:fails}));assert.deepEqual(fails,[],'Unreachable hand or fingertip target');
