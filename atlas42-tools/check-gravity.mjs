import {createInertiaRig,observeGravity,hull2,pointInHull} from '../fullbody-tcm-v42/pose-inertia.js';
import {loadContext} from '../fullbody-tcm-v42/pose-observation.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v42/bones-data.js';
import {POSES,stateFor} from '../fullbody-tcm-v42/pose-catalog.js';
import {solvePose,REST,matrixFor} from '../fullbody-tcm-v42/pose-engine.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v42/pose-grip.js';
const root=process.cwd(),bytes=fs.readFileSync(path.join(root,'fullbody-tcm-v9/assets/fullbody.glb'));
const g=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');g.scene.updateMatrixWorld(true);const boneData=new Map(BONES.map(b=>[b.id,b]));
function segment(b){const s=b.side==='left'?'L':'R';if(b.group==='cervical')return b.id;if(['cranial','facial','head-other'].includes(b.group))return'head';if(b.group==='lumbar')return b.id;if(['thorax','thoracic','shoulder'].includes(b.group))return'trunk';if(b.group==='pelvis')return'pelvis';if(b.group==='arm')return b.id.startsWith('humerus')?'shoulder'+s:'elbow'+s;if(['carpal','metacarpal','hand-phalanges'].includes(b.group))return'wrist'+s;if(b.group==='thigh')return b.id.startsWith('patella')?'patella'+s:'hip'+s;if(b.group==='leg')return'knee'+s;return'ankle'+s;}
const meshes=[];g.scene.traverse(n=>{if(!n.isMesh)return;const info=boneData.get(n.name),geo=n.geometry.clone();geo.applyMatrix4(new T.Matrix4().makeScale(.001,.001,.001).multiply(n.matrixWorld));geo.translate(-.09955,-.835,.05);geo.computeBoundingBox();const m=new T.Mesh(geo);m.name=n.name;m.userData={segment:segment(info),info};meshes.push(m);});const handRig=createHandRig(meshes),rig=createInertiaRig(meshes,handRig),rows=[];
const input={mass:70,gravity:9.81,load:7};
function observed(p,phase=0,values=input){const spec=stateFor(p,phase);spec.taskId=p.id;const r=solvePose(spec),task=gripTask(spec,r);if(task)solveGrip(r,task,handRig);return observeGravity(p,spec,r,rig,values,r.grip?.task.center?.toArray()||[0,0,0],loadContext(p,spec).supported);}
const get=id=>POSES.find(p=>p.id===id);
for(const p of POSES)for(const phase of [0,.25,.5,.75,1]){
 const a=observed(p,phase),zero=observed(p,phase,{...input,gravity:0}),heavy=observed(p,phase,{...input,mass:140}),moon=observed(p,phase,{...input,gravity:1.62});
 assert.equal(a.segments.length,16);assert(Math.abs(a.massSum-70)<1e-10);assert(Math.abs(a.upper.fraction-.4911)<1e-10);assert(a.center.every(Number.isFinite));assert(a.segments.every(s=>s.center.every(Number.isFinite)));assert(Number.isFinite(a.upper.moment));
 assert.equal(zero.upper.moment,0);assert.equal(zero.support.applicable,false);assert.equal(zero.support.inside,null);assert.deepEqual(zero.center,a.center);assert.deepEqual(heavy.center,a.center);assert(Math.abs(heavy.upper.moment-2*a.upper.moment)<1e-9);assert(Math.abs(moon.upper.moment-a.upper.moment*1.62/9.81)<1e-9);
 if(p.dynamic||p.spec.bed||p.spec.chair||p.spec.backSupport||p.spec.forearmSupport||p.spec.tool||p.spec.shelf)assert.equal(a.support.applicable,false,p.id);
 const manual=a.segments.filter(s=>s.upper).reduce((v,s)=>v.add(new T.Vector3(...s.center).sub(new T.Vector3(...a.upper.reference)).cross(new T.Vector3(0,-s.mass*9.81,0))),new T.Vector3());assert(manual.distanceTo(new T.Vector3(...a.upper.momentVector))<1e-10);
 rows.push({pose:p.id,phase,center:a.center,upperMoment:a.upper.moment,support:a.support.applicable});
}
const standing=observed(get('stand-relaxed'));
const magnitudes=standing.segments.filter(s=>s.upper).reduce((sum,s)=>sum+s.mass*9.81*Math.hypot(s.center[0]-standing.upper.reference[0],s.center[2]-standing.upper.reference[2]),0);assert(standing.upper.moment<magnitudes/2,'Opposing moments must cancel before taking magnitude');
const lp=[.2,1,.3],rr=solvePose(get('lift-close').spec),sys=observeGravity(get('lift-close'),rr.spec,rr,rig,input,lp,true);assert(new T.Vector3(...sys.systemCenter).distanceTo(new T.Vector3(...sys.center).multiplyScalar(70).addScaledVector(new T.Vector3(...lp),7).divideScalar(77))<1e-10);assert(standing.support.applicable);
for(const id of ['bend-hips','bend-round'])assert(observed(get(id)).upper.moment>standing.upper.moment);
assert(observed(get('lift-far')).upper.moment>observed(get('lift-close')).upper.moment);
const translated=solvePose({...get('stand-relaxed').spec,position:[.3,.86,.2]}),shift=observeGravity(get('stand-relaxed'),translated.spec,translated,rig,input,[0,0,0],false);
assert(new T.Vector3(...shift.center).sub(new T.Vector3(...standing.center)).distanceTo(new T.Vector3(.3,0,.2))<1e-10);assert(Math.abs(shift.upper.moment-standing.upper.moment)<1e-10);
const square=hull2([[0,0],[1,0],[1,1],[0,1],[.5,.5]]);assert.equal(square.length,4);assert.equal(pointInHull([.5,.5],square),true);assert.equal(pointInHull([1.2,.5],square),false);
for(const id of ['lift-close','lift-far']){const a=observed(get(id));assert.equal(a.externalMass,7);assert(a.support.applicable);assert(a.systemCenter.every(Number.isFinite));}
const examples=['stand-relaxed','bend-hips','bend-round','lift-close','lift-far','stand-counter','sit-supported','supine'].map(id=>({id,...observed(get(id))}));
fs.writeFileSync(path.join(root,'atlas42-tools/gravity-check.json'),JSON.stringify({mapping:rig.mapping,states:rows.length,rows,examples},null,2));
console.log(JSON.stringify({gravityStates:rows.length,segments:16,massConserved:true,massGravityScaling:true,vectorSum:true,zeroGravity:true,unsupportedSupportsExcluded:true,examples:examples.map(a=>({pose:a.id,moment:a.upper.moment}))}));
