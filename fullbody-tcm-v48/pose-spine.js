import * as T from 'three';
import {solvePose,matrixFor} from './pose-engine.js';

export const SPINE_LEVELS=[...Array.from({length:7},(_,i)=>'C'+(i+1)),...Array.from({length:12},(_,i)=>'T'+(i+1)),...Array.from({length:5},(_,i)=>'L'+(i+1))];
export const SPINE_KEYS=['lumbarFlex','lumbarSide','cervicalFlex','cervicalSide'];
export function spineAdjustment(values={}){return Object.fromEntries(SPINE_KEYS.map(k=>[k,T.MathUtils.clamp(Number(values[k])||0,-12,12)]));}
export function observeSpine(result,meshes){
 const baseline=solvePose({...result.spec,spineAdjustment:undefined}),offset=result.joints.pelvis.clone().sub(baseline.joints.pelvis);
 // Align the reference pelvis after scene placement. Values describe source
 // bone bounds and rigid transform differences, not vertebral endplates.
 for(const part of Object.values(baseline.parts))part.position.add(offset);
 const levels=SPINE_LEVELS.map(id=>{
  const mesh=meshes.find(m=>m.name===id);if(!mesh)throw Error('Missing spine source '+id);
  const segment=mesh.userData.segment,actual=result.parts[segment],reference=baseline.parts[segment],center=mesh.geometry.boundingBox.getCenter(new T.Vector3()),point=center.clone().applyMatrix4(matrixFor(actual)),original=center.clone().applyMatrix4(matrixFor(reference));
  return {id,name:mesh.userData.info.name,segment,center:point.toArray(),referenceCenter:original.toArray(),displacementMM:point.distanceTo(original)*1000,rotationDifferenceDegrees:T.MathUtils.radToDeg(actual.rotation.angleTo(reference.rotation)),independentRotation:!id.startsWith('T')};
 });
 return {adjustment:spineAdjustment(result.spec.spineAdjustment),reference:'Same scene specification, pelvis aligned, additional spine adjustment zero',levels,cobbAngle:null,affectedClinicalLevel:null,internalJointForce:null,damageProbability:null,thoracicIndependentRotation:false,clinicalPrediction:false};
}
