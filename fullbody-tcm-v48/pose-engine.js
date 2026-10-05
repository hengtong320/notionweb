import * as T from 'three';
export const REST={pelvis:[0,0,0],lumbar:[0,.070,0],trunk:[0,.265,0],head:[0,.570,-.014],hipR:[-.06155,-.006,.007],hipL:[.06145,-.006,.007],kneeR:[-.07955,-.449,.002],kneeL:[.07945,-.449,.002],ankleR:[-.07655,-.807,-.002],ankleL:[.07645,-.807,-.002],shoulderR:[-.16255,.513,-.001],shoulderL:[.16245,.513,-.001],elbowR:[-.24355,.209,.012],elbowL:[.24345,.209,.012],wristR:[-.2611536346375942,-.02796148508787155,.04506544675678015],wristL:[.2611600048840046,-.02796148508787155,.04506544675678015]};
// Wrist references are the unchanged source scaphoid/lunate centre average.
// Correcting the former 46 mm off-joint pivot moves the hand by rigid transforms;
// it does not rescale any bone mesh.
Object.assign(REST,{L5:[.000003,.100466,-.002002],L4:[.000003,.132709,.003071],L3:[.000015,.161027,.003956],L2:[.000003,.192581,.003021],L1:[.000003,.221575,-.002113]});
Object.assign(REST,{C7:[.000003,.569682,-.014950],C6:[.000004,.583688,-.007832],C5:[.000003,.597805,-.002653],C4:[.000079,.610736,.000654],C3:[.000003,.624041,.000234],C2:[.000019,.647640,.001112],C1:[.000007,.660593,.005704]});
REST.patellaR=REST.kneeR;REST.patellaL=REST.kneeL;
export const SOLE=.067;
const V=a=>new T.Vector3(...a),D=new T.Vector3(0,-1,0),q=(x=0,y=0,z=0)=>new T.Quaternion().setFromEuler(new T.Euler(x*Math.PI/180,y*Math.PI/180,z*Math.PI/180,'YXZ'));
const rest=id=>V(REST[id]),diff=(a,b)=>rest(a).sub(rest(b));
export function solveTwoBone(start,end,l1,l2,pole){
 const delta=end.clone().sub(start),requested=delta.length(),distance=T.MathUtils.clamp(requested,Math.abs(l1-l2)+.0001,l1+l2-.00001),axis=delta.lengthSq()>1e-10?delta.normalize():D.clone();
 const adjusted=start.clone().addScaledVector(axis,distance),along=(l1*l1-l2*l2+distance*distance)/(2*distance),height=Math.sqrt(Math.max(0,l1*l1-along*along));
 let perpendicular=pole.clone().sub(start);perpendicular.addScaledVector(axis,-perpendicular.dot(axis));if(perpendicular.lengthSq()<1e-9){perpendicular=new T.Vector3(0,0,1);perpendicular.addScaledVector(axis,-perpendicular.dot(axis));if(perpendicular.lengthSq()<1e-9)perpendicular.set(1,0,0);}perpendicular.normalize();
 return {mid:start.clone().addScaledVector(axis,along).addScaledVector(perpendicular,height),end:adjusted,error:Math.abs(requested-distance)};
}
function aim(restDirection,direction,base){const actual=D.clone().applyQuaternion(base);return new T.Quaternion().setFromUnitVectors(actual,direction.clone().normalize()).multiply(base).multiply(new T.Quaternion().setFromUnitVectors(restDirection.clone().normalize(),D));}
export function solvePose(spec){
 const adjustment=Object.fromEntries(['lumbarFlex','lumbarSide','cervicalFlex','cervicalSide'].map(k=>[k,T.MathUtils.clamp(Number(spec.spineAdjustment?.[k])||0,-12,12)]));
 const joints={},parts={},constraints=[];const root=new T.Quaternion().setFromEuler(new T.Euler(...(spec.orientation||[0,0,0]).map(v=>v*Math.PI/180),'XYZ')).multiply(q(spec.pelvisTilt||0,spec.turn||0,spec.sideBend||0));
 const pelvis=V(spec.position||[0,spec.height??.87,0]);joints.pelvis=pelvis;
 const set=(id,pos,rotation)=>{parts[id]={position:pos,rotation,rest:rest(id)};joints[id]=pos;};set('pelvis',pelvis,root);
 const lumbar=pelvis.clone().add(diff('lumbar','pelvis').applyQuaternion(root));set('lumbar',lumbar,root);
 let previousRest=rest('lumbar'),previousPosition=lumbar,previousQ=root;
 for(const [index,id] of ['L5','L4','L3','L2','L1'].entries()){
  const rotation=root.clone().multiply(q(((spec.bend||0)+adjustment.lumbarFlex)*(index+1)/5,(spec.twist||0)*(index+1)/5,adjustment.lumbarSide*(index+1)/5));
  const position=previousPosition.clone().add(rest(id).sub(previousRest).applyQuaternion(previousQ.clone().slerp(rotation,.5)));
  set(id,position,rotation);previousRest=rest(id);previousPosition=position;previousQ=rotation;
 }
 const trunkQ=previousQ.clone(),trunk=previousPosition.clone().add(rest('trunk').sub(previousRest).applyQuaternion(trunkQ));set('trunk',trunk,trunkQ);
 let neckRest=rest('trunk'),neckPosition=trunk,neckQ=trunkQ;
 for(const [index,id] of ['C7','C6','C5','C4','C3','C2','C1'].entries()){
  const rotation=trunkQ.clone().multiply(q(((spec.neck||0)+adjustment.cervicalFlex)*index/6,(spec.look||0)*index/6,adjustment.cervicalSide*index/6));
  const position=neckPosition.clone().add(rest(id).sub(neckRest).applyQuaternion(neckQ.clone().slerp(rotation,.5)));
  set(id,position,rotation);neckRest=rest(id);neckPosition=position;neckQ=rotation;
 }
 set('head',neckPosition.clone(),neckQ.clone());parts.head.rest=rest('C1');
 for(const side of ['R','L']){
  const sign=side==='R'?-1:1,leg=spec['leg'+side]||{},hip=pelvis.clone().add(rest('hip'+side).applyQuaternion(root));
  const l1=diff('knee'+side,'hip'+side).length(),l2=diff('ankle'+side,'knee'+side).length();
  let hipQ=root.clone().multiply(q(-(leg.flex||0),leg.yaw||0,sign*(leg.abd||0))).multiply(q(0,leg.roll||0)),knee=hip.clone().addScaledVector(D.clone().applyQuaternion(hipQ),l1),shinQ=hipQ.clone().multiply(q(leg.knee||0)),ankle=knee.clone().addScaledVector(D.clone().applyQuaternion(shinQ),l2);
  if(spec.feet?.includes(side)||spec['footTarget'+side]){
   const target=spec['footTarget'+side]?V(spec['footTarget'+side]):ankle.clone();if(!spec['footTarget'+side])target.y=SOLE+(leg.step||0);
   const ik=solveTwoBone(hip,target,l1,l2,spec['kneePole'+side]?V(spec['kneePole'+side]):knee.clone().add(new T.Vector3(0,0,.03)));knee=ik.mid;ankle=ik.end;constraints.push({id:'foot'+side,error:ik.error,target:target.toArray(),actual:ankle.toArray()});
  }
  set('hip'+side,hip,aim(diff('knee'+side,'hip'+side),knee.clone().sub(hip),hipQ));set('knee'+side,knee,aim(diff('ankle'+side,'knee'+side),ankle.clone().sub(knee),shinQ));
  set('patella'+side,knee.clone(),parts['hip'+side].rotation.clone().slerp(parts['knee'+side].rotation,.5));
  const footQ=leg.footEuler?q(...leg.footEuler):spec.feet?.includes(side)||spec['footTarget'+side]?q(0,leg.footYaw||0):spec.kneeling||spec.quadruped?q(180):root.clone().multiply(q(leg.footPitch||0,leg.footYaw||0));set('ankle'+side,ankle,footQ);
  const arm=spec['arm'+side]||{},shoulder=trunk.clone().add(diff('shoulder'+side,'trunk').applyQuaternion(trunkQ)),a1=diff('elbow'+side,'shoulder'+side).length(),a2=diff('wrist'+side,'elbow'+side).length();
  const armQ=trunkQ.clone().multiply(q(-(arm.flex||0),arm.yaw||0,sign*(arm.abd||0))).multiply(q(0,arm.roll||0));let elbow=shoulder.clone().addScaledVector(D.clone().applyQuaternion(armQ),a1),foreQ=armQ.clone().multiply(q(-(arm.elbow||0))),wrist=elbow.clone().addScaledVector(D.clone().applyQuaternion(foreQ),a2);
  if(spec['handTarget'+side]||spec.handsLap||(spec.floorSit&&!spec.flags?.includes('handContact'))){const target=spec['handTarget'+side]?V(spec['handTarget'+side]):pelvis.clone().add(new T.Vector3(sign*.15,.08,spec.lapReach??(spec.floorSit?.19:.27))),pole=spec['elbowPole'+side]?V(spec['elbowPole'+side]):shoulder.clone().add(new T.Vector3(sign*.35,-.35,.10));const ik=solveTwoBone(shoulder,target,a1,a2,pole);elbow=ik.mid;wrist=ik.end;constraints.push({id:'hand'+side,error:ik.error,target:target.toArray(),actual:wrist.toArray()});}
  set('shoulder'+side,shoulder,aim(diff('elbow'+side,'shoulder'+side),elbow.clone().sub(shoulder),armQ));set('elbow'+side,elbow,aim(diff('wrist'+side,'elbow'+side),wrist.clone().sub(elbow),foreQ));
  const handQ=spec['handFlat'+side]?q(-90).multiply(q(0,180)).multiply(new T.Quaternion().setFromUnitVectors(diff('wrist'+side,'elbow'+side).normalize(),D)):parts['elbow'+side].rotation.clone().premultiply(new T.Quaternion().setFromAxisAngle(wrist.clone().sub(elbow).normalize(),((spec.handsLap||spec.floorSit)?180:arm.handTurn||0)*Math.PI/180));set('wrist'+side,wrist,handQ);
 }
 // Each lumbar level rotates individually; bone geometry and inter-centre chain lengths are preserved.
 return {joints,parts,constraints,spec};
}
export function matrixFor(part){const matrix=new T.Matrix4().makeRotationFromQuaternion(part.rotation);matrix.setPosition(part.position.clone().sub(part.rest.clone().applyQuaternion(part.rotation)));return matrix;}
