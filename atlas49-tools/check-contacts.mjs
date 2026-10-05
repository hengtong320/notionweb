import fs from 'node:fs';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v49/bones-data.js';
import {boneSegment,isTrunkBone} from '../fullbody-tcm-v49/pose-segments.js';
import {poseContacts} from '../fullbody-tcm-v49/pose-contacts.js';
import {solvePose,matrixFor} from '../fullbody-tcm-v49/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v49/pose-catalog.js';
const bytes=fs.readFileSync('fullbody-tcm-v9/assets/fullbody.glb'),doc=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),''),data=new Map(BONES.map(b=>[b.id,b])),meshes=[];
doc.scene.updateMatrixWorld(true);doc.scene.traverse(n=>{if(!n.isMesh)return;const g=n.geometry.clone().applyMatrix4(n.matrixWorld).scale(.001,.001,.001).translate(-.09955,-.835,.05);g.computeBoundingBox();meshes.push({geometry:g,userData:{info:data.get(n.name),segment:boneSegment(data.get(n.name))}});});
assert.equal(meshes.length,210);assert.equal(meshes.filter(isTrunkBone).length,41);
let states=0,bedStates=0,waterStates=0,backSupportStates=0;
for(const pose of POSES)for(const phase of [0,.25,.5,.75,1])for(const adjustment of [{},{thoracicSide:12,thoracicFlex:-12,thoracicTwist:12,cervicalSide:-12,lumbarSide:12}]){
 const spec={...stateFor(pose,phase),spineAdjustment:adjustment},r=solvePose(spec),bounds=test=>{const box=new T.Box3();for(const m of meshes)if(test(m))box.union(m.geometry.boundingBox.clone().applyMatrix4(matrixFor(r.parts[m.userData.segment])));return box;},rows=poseContacts(spec,r,bounds),trunk=bounds(isTrunkBone);states++;
 assert(!trunk.isEmpty());assert(rows.every(c=>c.point.toArray().every(Number.isFinite)&&c.normal.toArray().every(Number.isFinite)));
 if(spec.bed){bedStates++;const c=rows.find(c=>/躯干|背侧|胸腹侧/.test(c.name));assert(c,'Missing bed trunk marker: '+pose.id);assert(c.point.length()>1e-6);}
 if(spec.water){waterStates++;const c=rows.find(c=>c.name.includes('浮力'));assert(c);assert(c.point.distanceTo(trunk.getCenter(new T.Vector3()))<1e-12);}
 if(spec.backSupport){backSupportStates++;const c=rows.find(c=>c.name.startsWith('背部'));assert(c);assert(c.point.distanceTo(trunk.getCenter(new T.Vector3()))<1e-12);}
 if(!Object.keys(adjustment).length){const legacy=new T.Box3();for(const m of meshes.filter(isTrunkBone))legacy.union(m.geometry.boundingBox.clone().applyMatrix4(matrixFor(r.parts.trunk)));assert(trunk.min.distanceTo(legacy.min)<1e-10&&trunk.max.distanceTo(legacy.max)<1e-10);}
}
const report={sourceBones:210,trunkBones:41,states,bedStates,waterStates,backSupportStates,finiteMarkers:true,noMissingTrunkMarkers:true,zeroAdjustmentTrunkBoundsPreserved:true,physicalContactsSolved:false};
fs.writeFileSync('atlas49-tools/contact-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
