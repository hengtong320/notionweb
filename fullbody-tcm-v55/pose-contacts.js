import * as T from 'three';
import {isTrunkBone} from './pose-segments.js';

// Geometric scene markers only. These source-bone bounds are not solved skin
// contacts, pressure centres or force application measurements.
export function poseContacts(spec,result,boundsFor){
 const out=[],up=[0,1,0];
 const add=(name,test,normal=up)=>{const b=boundsFor(test);if(b.isEmpty())throw Error('Missing marker geometry: '+name);const point=b.getCenter(new T.Vector3());point.y=b.min.y;out.push({name,point,normal:new T.Vector3(...normal)});};
 const trunkCenter=()=>{const b=boundsFor(isTrunkBone);if(b.isEmpty())throw Error('Missing trunk marker geometry');return b.getCenter(new T.Vector3());};
 for(const s of spec.feet||[])add((s==='R'?'右':'左')+'脚'+(spec['leg'+s]?.step?' · 台面':spec.bed?' · 床面':' · 地面'),m=>m.userData.segment==='ankle'+s);
 if(spec.backSupport)out.push({name:'背部 · '+(spec.wall?'墙面':'靠背'),point:trunkCenter(),normal:new T.Vector3(0,0,1)});
 if(spec.bike){out.push({name:'骨盆 · 座垫',point:result.joints.pelvis.clone(),normal:new T.Vector3(...up)});for(const side of ['R','L'])out.push({name:(side==='R'?'右':'左')+'脚 · 脚踏示意',point:result.joints['ankle'+side].clone(),normal:new T.Vector3(...up)});}
 if(spec.chair||spec.floorSit||spec.heelSit)add(spec.chair?'骨盆 · 座面':spec.heelSit?'骨盆 · 脚跟区域':'骨盆 · 地面',m=>m.userData.segment==='pelvis');
 if(spec.bed){
  if(['left','right'].includes(spec.lying))add((spec.lying==='left'?'左':'右')+'侧躯干 · 床面',m=>isTrunkBone(m)||m.userData.segment==='pelvis');
  else add(spec.lying==='prone'?'胸腹侧 · 床面':'背侧 · 床面',isTrunkBone);
  add('头部 · '+(spec.headPillow?'枕面':'床面'),m=>m.userData.segment==='head');
  if(!spec.bridge)add('下肢 · 床面',m=>['hipR','hipL','kneeR','kneeL'].includes(m.userData.segment));
 }
 if(spec.quadruped||spec.kneeling)for(const s of spec.kneeSides||['R','L'])add((s==='R'?'右':'左')+'膝 · 地面',m=>m.userData.info.id.startsWith('patella')&&m.userData.segment==='patella'+s);
 if(spec.handSupport||spec.quadruped)for(const s of spec.handSides||['R','L'])add((s==='R'?'右':'左')+'手 · 地面',m=>m.userData.segment==='wrist'+s);
 if(spec.forearmSupport)for(const s of ['R','L'])add((s==='R'?'右':'左')+'前臂 · 台面',m=>m.userData.segment==='elbow'+s);
 if(spec.water)out.push({name:'水体 · 浮力分布示意',point:trunkCenter(),normal:new T.Vector3(...up)});
 return out;
}
