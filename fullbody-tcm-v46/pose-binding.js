import * as T from 'three';
import {REST,matrixFor} from './pose-engine.js';

// Visual registration in the common teaching frame. These weights have no
// material constants, subject measurements, tissue forces or clinical meaning.
const V=a=>new T.Vector3(...a);
export function createPoseBinding(handRig){
 const ids=Object.keys(REST),chains=[];
 const line=(id,a,b,next=id,previous=id,width=.045)=>{const start=V(a),end=V(b),delta=end.clone().sub(start);chains.push({id,a:start,b:end,dx:delta.x,dy:delta.y,dz:delta.z,length:delta.length(),lengthSq:delta.lengthSq(),next,previous,width});};
 const spine=['pelvis','lumbar','L5','L4','L3','L2','L1'];
 for(let i=0;i<spine.length-1;i++)line(spine[i],REST[spine[i]],REST[spine[i+1]],spine[i+1],spine[Math.max(0,i-1)],.025);
 line('L1',REST.L1,REST.trunk,'trunk','L2',.025);
 line('trunk',REST.trunk,REST.C7,'C7','L1',.05);
 const neck=['C7','C6','C5','C4','C3','C2','C1'];
 for(let i=0;i<neck.length-1;i++)line(neck[i],REST[neck[i]],REST[neck[i+1]],neck[i+1],neck[Math.max(0,i-1)],.012);
 line('head',REST.C1,[0,.84,0],'head','C2',.018);
 for(const s of ['R','L']){
  line('hip'+s,REST['hip'+s],REST['knee'+s],'knee'+s,'pelvis',.065);
  line('knee'+s,REST['knee'+s],REST['ankle'+s],'ankle'+s,'hip'+s,.045);
  line('ankle'+s,REST['ankle'+s],[REST['ankle'+s][0],-.87,.16],'ankle'+s,'knee'+s,.03);
  line('shoulder'+s,REST['shoulder'+s],REST['elbow'+s],'elbow'+s,'trunk',.055);
  line('elbow'+s,REST['elbow'+s],REST['wrist'+s],'wrist'+s,'shoulder'+s,.04);
  const hand=handRig?.[s];
  line('wrist'+s,REST['wrist'+s],hand?.palm.toArray()||[REST['wrist'+s][0],-.13,.03],'wrist'+s,'elbow'+s,.024);
  if(hand)for(const f of hand.fingers)for(let i=0;i<3;i++){
   const id=f.bones[i].name;ids.push(id);
   line(id,f.nodes[i].toArray(),f.nodes[i+1].toArray(),i<2?f.bones[i+1].name:id,i?f.bones[i-1].name:'wrist'+s,.007);
  }
 }
 for(const c of chains)c.family=/^(hip|knee|ankle)/.test(c.id)?'leg'+c.id.slice(-1):/^(shoulder|elbow|wrist)/.test(c.id)?'arm'+c.id.slice(-1):c.id.startsWith('hand-')?'arm'+(c.id.endsWith('right')?'R':'L'):'body';
 const unique=[...new Set(ids)],index=new Map(unique.map((id,i)=>[id,i])),matrices=unique.map(()=>new T.Matrix4());
 function nearest(point,family){
  let distance=Infinity;const candidates=[];
  for(const c of chains){
   if(c.family!==family)continue;
   const x=point.x-c.a.x,y=point.y-c.a.y,z=point.z-c.a.z,t=T.MathUtils.clamp((x*c.dx+y*c.dy+z*c.dz)/c.lengthSq,0,1),dx=x-c.dx*t,dy=y-c.dy*t,dz=z-c.dz*t,d=dx*dx+dy*dy+dz*dz;
   distance=Math.min(distance,d);candidates.push({c,d,along:t*c.length});
  }
  const sigma=family==='body'?.018:family.startsWith('leg')?.025:.012,combined=new Map();let total=0;
  for(const {c,d,along} of candidates){const factor=Math.exp(-(d-distance)/(sigma*sigma));if(factor<1e-5)continue;total+=factor;const length=c.length,pairs=[[c.id,1]];
  // Each segment shares a smooth transition with its neighbours; the limb
  // interior follows its actual bone, without blending the opposite limb.
  if(along<c.width&&c.previous!==c.id){const w=.5*(1-T.MathUtils.smoothstep(along,0,c.width));pairs[0][1]-=w;pairs.push([c.previous,w]);}
  if(length-along<c.width&&c.next!==c.id){const w=.5*(1-T.MathUtils.smoothstep(length-along,0,c.width));pairs[0][1]-=w;pairs.push([c.next,w]);}
   for(const [id,w] of pairs)combined.set(id,(combined.get(id)||0)+w*factor);
  }return [...combined].map(([id,w])=>[id,w/total]);
 }
 function distanceTo(point,family){let distance=Infinity;for(const c of chains){if(c.family!==family)continue;const x=point.x-c.a.x,y=point.y-c.a.y,z=point.z-c.a.z,t=T.MathUtils.clamp((x*c.dx+y*c.dy+z*c.dz)/c.lengthSq,0,1);distance=Math.min(distance,Math.hypot(x-c.dx*t,y-c.dy*t,z-c.dz*t));}return distance;}
 function weights(point,bodyOnly=false,armHint=null){
  const side=point.x<0?'R':'L',y=point.y,armDistance=distanceTo(point,'arm'+side),centralDistance=Math.min(distanceTo(point,'body'),distanceTo(point,'leg'+side));
  let arm=bodyOnly?0:T.MathUtils.smoothstep(centralDistance-armDistance,-.012,.025)*(1-T.MathUtils.smoothstep(y,.54,.60))*T.MathUtils.smoothstep(y,-.27,-.20);
  if(!bodyOnly&&armHint!==null)arm=armHint;
  const leg=bodyOnly?0:1-T.MathUtils.smoothstep(y,-.23,-.02),pairs=new Map();
  const add=(family,factor)=>{if(factor<=0)return;for(const [id,w] of nearest(point,family))pairs.set(id,(pairs.get(id)||0)+w*factor);};
  const middleWidth=T.MathUtils.lerp(.001,.05,T.MathUtils.smoothstep(y,-.40,-.20)),left=T.MathUtils.smoothstep(point.x,-middleWidth,middleWidth);
  add('arm'+side,arm);add('legR',leg*(1-arm)*(1-left));add('legL',leg*(1-arm)*left);add('body',(1-leg)*(1-arm));
  const ordered=[...pairs].filter(([,w])=>w>1e-8).sort((a,b)=>b[1]-a[1]).slice(0,4),sum=ordered.reduce((n,[,w])=>n+w,0);
  return {indices:[...ordered.map(([id])=>index.get(id)),0,0,0].slice(0,4),weights:[...ordered.map(([,w])=>w/sum),0,0,0].slice(0,4)};
 }
 function attributes(geometry,{bodyOnly=false}={}){const p=geometry.attributes.position,hints=geometry.getAttribute('bindingArm'),indices=new Uint16Array(p.count*4),values=new Float32Array(p.count*4),point=new T.Vector3();for(let i=0;i<p.count;i++){point.fromBufferAttribute(p,i);const w=weights(point,bodyOnly,hints?hints.getX(i):null);indices.set(w.indices,i*4);values.set(w.weights,i*4);}geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(values,4));return geometry;}
 function update(result){for(let i=0;i<unique.length;i++){const id=unique[i],part=result.parts[id];if(part)matrices[i].copy(matrixFor(part));else{const entry=result.grip?.matrices.find(e=>e.mesh.name===id);if(entry)matrices[i].copy(entry.matrix);else matrices[i].copy(matrixFor(result.parts['wrist'+(id.endsWith('right')?'R':'L')]));}}}
 function vertex(geometry,i,out=new T.Vector3()){
  const p=new T.Vector3().fromBufferAttribute(geometry.attributes.position,i),indices=geometry.attributes.skinIndex,weights=geometry.attributes.skinWeight;out.set(0,0,0);
  for(let k=0;k<4;k++){const w=weights.array[i*4+k];if(w)out.addScaledVector(p.clone().applyMatrix4(matrices[indices.array[i*4+k]]),w);}return out;
 }
 return {ids:unique,matrices,weights,attributes,update,vertex,method:'piecewise continuous linear blend display binding',individualCalibration:false};
}

export function posedTriangle(binding,geometry,anchor,offset=0){
 const [i,j,k]=anchor.vertices,a=binding.vertex(geometry,i),b=binding.vertex(geometry,j),c=binding.vertex(geometry,k),normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();
 if(anchor.flip)normal.negate();
 return {point:a.multiplyScalar(anchor.bary[0]).addScaledVector(b,anchor.bary[1]).addScaledVector(c,anchor.bary[2]).addScaledVector(normal,offset),normal};
}
