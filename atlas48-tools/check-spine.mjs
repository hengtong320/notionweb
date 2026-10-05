import fs from 'node:fs';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v48/bones-data.js';
import {REST,solvePose,matrixFor} from '../fullbody-tcm-v48/pose-engine.js';
import {solvePose as oldSolve} from '../fullbody-tcm-v47/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v48/pose-catalog.js';
import {SPINE_LEVELS,spineAdjustment,observeSpine} from '../fullbody-tcm-v48/pose-spine.js';
const bytes=fs.readFileSync('fullbody-tcm-v9/assets/fullbody.glb'),doc=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),''),data=new Map(BONES.map(b=>[b.id,b])),meshes=[];
doc.scene.updateMatrixWorld(true);doc.scene.traverse(n=>{if(!n.isMesh||!SPINE_LEVELS.includes(n.name))return;const g=n.geometry.clone().applyMatrix4(n.matrixWorld).scale(.001,.001,.001).translate(-.09955,-.835,.05);g.computeBoundingBox();const m=new T.Mesh(g);m.name=n.name;m.userData={info:data.get(n.name),segment:n.name.startsWith('T')?'trunk':n.name};meshes.push(m);});
assert.equal(meshes.length,24);assert.deepEqual(spineAdjustment({lumbarSide:999,cervicalSide:-999,lumbarFlex:NaN}),{lumbarFlex:0,lumbarSide:12,cervicalFlex:0,cervicalSide:-12});
let originalStates=0,adjustedStates=0;
const controls=[{lumbarSide:12},{lumbarSide:-12},{cervicalSide:12},{cervicalSide:-12},{lumbarFlex:12,cervicalFlex:-12},{lumbarFlex:-12,cervicalFlex:12},{lumbarSide:12,cervicalSide:-12,lumbarFlex:12,cervicalFlex:-12}];
for(const pose of POSES)for(const phase of [0,.5,1]){
 const spec=stateFor(pose,phase),base=solvePose(spec),old=oldSolve(spec),original=observeSpine(base,meshes);originalStates++;
 for(const [id,part]of Object.entries(base.parts)){assert.deepEqual(part.position.toArray(),old.parts[id].position.toArray());assert.deepEqual(part.rotation.toArray(),old.parts[id].rotation.toArray());}
 assert(original.levels.every(r=>r.displacementMM<1e-9&&r.rotationDifferenceDegrees<1e-5));
 for(const adjustment of controls){const result=solvePose({...spec,spineAdjustment:adjustment}),study=observeSpine(result,meshes);adjustedStates++;
  assert.equal(study.levels.length,24);assert.equal(study.cobbAngle,null);assert.equal(study.affectedClinicalLevel,null);assert.equal(study.damageProbability,null);assert.equal(study.thoracicIndependentRotation,false);
  for(const chain of [['lumbar','L5','L4','L3','L2','L1','trunk'],['trunk','C7','C6','C5','C4','C3','C2','C1'],...['R','L'].flatMap(s=>[['hip'+s,'knee'+s,'ankle'+s],['shoulder'+s,'elbow'+s,'wrist'+s]])])for(let i=1;i<chain.length;i++)assert(Math.abs(result.joints[chain[i]].distanceTo(result.joints[chain[i-1]])-new T.Vector3(...REST[chain[i]]).distanceTo(new T.Vector3(...REST[chain[i-1]])))<1e-8);
  for(const part of Object.values(result.parts)){const m=matrixFor(part);assert(m.elements.every(Number.isFinite));assert(Math.abs(m.determinant()-1)<1e-9);}
  assert(study.levels.every(r=>r.center.every(Number.isFinite)&&Number.isFinite(r.displacementMM)));
 }
}
const result={sourceSpineBones:24,originalStates,adjustedStates,zeroAdjustmentMatchesV47Exactly:true,limbAndSpineLengthsPreserved:true,rigidBoneMatrices:true,thoracicIndependentRotation:false,clinicalPrediction:false,cobbAngle:null,damageProbability:null};
fs.writeFileSync('atlas48-tools/spine-verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
