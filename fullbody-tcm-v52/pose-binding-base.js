import * as T from 'three';
import {REST,matrixFor} from './pose-engine.js';

// Visual registration in the common teaching frame. These weights have no
// material constants, subject measurements, tissue forces or clinical meaning.
const V=a=>new T.Vector3(...a);
export function createPoseBinding(handRig){
 const ids=Object.keys(REST).filter(id=>!/^T\d+$/.test(id)),chains=[];
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
 const unique=[...new Set(ids)],index=new Map(unique.map((id,i)=>[id,i])),matrices=unique.map(()=>new T.Matrix4()),real=unique.map(()=>new T.Vector4(0,0,0,1)),dual=unique.map(()=>new T.Vector4()),dqEnabled={value:1};
 function nearest(point,family){
  if(family==='body'){const y=point.y,levels=['pelvis','lumbar','L5','L4','L3','L2','L1','trunk','C7','C6','C5','C4','C3','C2','C1','head'],heights=levels.map(id=>id==='head'?.69:REST[id][1]);let j=1;while(j<heights.length-1&&y>heights[j])j++;const a=levels[j-1],b=levels[j],t=T.MathUtils.smoothstep(y,heights[j-1],heights[j]);return [[a,1-t],[b,t]];}
  const h=handRig?.[family.slice(-1)],progress=h?point.clone().sub(h.wristRest).dot(h.long):0;let finger=null,score=Infinity;if(h&&progress>.04)for(const c of chains){if(c.family!==family||!c.id.startsWith('hand-'))continue;const delta=point.clone().sub(c.a),t=T.MathUtils.clamp(delta.dot(new T.Vector3(c.dx,c.dy,c.dz))/c.lengthSq,0,1),d=delta.sub(new T.Vector3(c.dx,c.dy,c.dz).multiplyScalar(t)).lengthSq();if(d<score){score=d;finger=c.id.match(/-(\d)-/)[1];}}
  let distance=Infinity;const candidates=[];
  for(const c of chains){
   if(c.family!==family)continue;
   if(c.id.startsWith('hand-')&&(progress<.025||finger&&c.id.match(/-(\d)-/)[1]!==finger))continue;
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
 function continuousArmField(g){
  if(!g.userData.nativeFemale)return null;const hints=g.getAttribute('bindingArm');if(!hints)return null;const p=g.attributes.position,size=.018,bins=new Map(),key=(x,y,z)=>x+','+y+','+z;
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);if(y<.15||y>.68)continue;const k=key(Math.floor(x/size),Math.floor(y/size),Math.floor(z/size)),b=bins.get(k)||{x:0,y:0,z:0,w:0,n:0};b.x+=x;b.y+=y;b.z+=z;b.w+=hints.getX(i);b.n++;bins.set(k,b);}for(const b of bins.values())for(const k of ['x','y','z','w'])b[k]/=b.n;
  const field=hints.array.slice();for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),blend=T.MathUtils.smoothstep(y,.10,.20)*(1-T.MathUtils.smoothstep(y,.55,.62))*T.MathUtils.smoothstep(Math.abs(x),.08,.12);if(!blend)continue;const ix=Math.floor(x/size),iy=Math.floor(y/size),iz=Math.floor(z/size);let total=0,sum=0;for(let dx=-5;dx<=5;dx++)for(let dy=-5;dy<=5;dy++)for(let dz=-5;dz<=5;dz++){const b=bins.get(key(ix+dx,iy+dy,iz+dz));if(!b)continue;const d=(x-b.x)**2+(y-b.y)**2+(z-b.z)**2;if(d>.09**2)continue;const w=Math.exp(-d/(2*.035**2));sum+=b.w*w;total+=w;}if(total)field[i]=T.MathUtils.lerp(field[i],sum/total,blend);}
  return field;
 }
 // Diffuse influences along existing surface edges, never between nearby
 // unrelated limbs. Weld duplicated patch-border positions only; no vertices,
 // topology or source shape are moved. The original weights anchor the solve.
 function regularize(geometry,indices,values){
  const p=geometry.attributes.position,n=p.count,groups=[],lookup=new Map(),vertexGroup=new Uint32Array(n);
  for(let i=0;i<n;i++){const key=[p.getX(i),p.getY(i),p.getZ(i)].map(x=>Math.round(x*1e5)).join(',');let j=lookup.get(key);if(j===undefined){j=groups.length;lookup.set(key,j);groups.push({vertices:[],edges:new Set()});}groups[j].vertices.push(i);vertexGroup[i]=j;}
  const index=geometry.index,count=index?.count||n;
  for(let i=0;i<count;i+=3){const triangle=[0,1,2].map(k=>index?index.getX(i+k):i+k);for(let k=0;k<3;k++){const a=triangle[k],b=triangle[(k+1)%3],u=vertexGroup[a],v=vertexGroup[b];if(u!==v&&Math.hypot(p.getX(a)-p.getX(b),p.getY(a)-p.getY(b),p.getZ(a)-p.getZ(b))<.04){groups[u].edges.add(v);groups[v].edges.add(u);}}}
  const size=unique.length,original=new Float32Array(groups.length*size);for(let j=0;j<groups.length;j++)for(const i of groups[j].vertices)for(let k=0;k<4;k++)original[j*size+indices[i*4+k]]+=values[i*4+k]/groups[j].vertices.length;
  let field=original.slice(),next=new Float32Array(field.length);
  for(let pass=0;pass<24;pass++){for(let j=0;j<groups.length;j++){const neighbours=groups[j].edges,offset=j*size;for(let k=0;k<size;k++){let sum=0;for(const q of neighbours)sum+=field[q*size+k];next[offset+k]=neighbours.size?.02*original[offset+k]+.48*field[offset+k]+.5*sum/neighbours.size:original[offset+k];}}[field,next]=[next,field];}
  for(let j=0;j<groups.length;j++){const representative=groups[j].vertices[0];let armAmount=0;for(let k=0;k<4;k++)if(/^(shoulder|elbow|wrist|hand-)/.test(unique[indices[representative*4+k]]))armAmount+=values[representative*4+k];if(p.getY(representative)>0||armAmount<.99){continue;}const entries=[];for(let k=0;k<size;k++)if(field[j*size+k]>1e-7)entries.push([k,field[j*size+k]]);entries.sort((a,b)=>b[1]-a[1]);entries.length=Math.min(4,entries.length);const sum=entries.reduce((a,e)=>a+e[1],0);for(const i of groups[j].vertices)for(let k=0;k<4;k++){indices[i*4+k]=entries[k]?.[0]||0;values[i*4+k]=(entries[k]?.[1]||0)/sum;}}
 }
 function attributes(geometry,{bodyOnly=false,surface=false}={}){const p=geometry.attributes.position,hints=geometry.getAttribute('bindingArm'),armField=surface?continuousArmField(geometry):null,indices=new Uint16Array(p.count*4),values=new Float32Array(p.count*4),point=new T.Vector3();for(let i=0;i<p.count;i++){point.fromBufferAttribute(p,i);const w=weights(point,bodyOnly,armField?armField[i]:hints?hints.getX(i):null);indices.set(w.indices,i*4);values.set(w.weights,i*4);}if(surface)regularize(geometry,indices,values);geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(values,4));return geometry;}
 function update(result){dqEnabled.value=result.grip?0:1;for(let i=0;i<unique.length;i++){const id=unique[i],part=result.parts[id];if(part)matrices[i].copy(matrixFor(part));else{const entry=result.grip?.matrices.find(e=>e.mesh.name===id);if(entry)matrices[i].copy(entry.matrix);else matrices[i].copy(matrixFor(result.parts['wrist'+(id.endsWith('right')?'R':'L')]));}}for(let i=0;i<unique.length;i++){const q=new T.Quaternion().setFromRotationMatrix(matrices[i]),e=matrices[i].elements,x=e[12],y=e[13],z=e[14];real[i].set(q.x,q.y,q.z,q.w);dual[i].set(.5*(x*q.w+y*q.z-z*q.y),.5*(-x*q.z+y*q.w+z*q.x),.5*(x*q.y-y*q.x+z*q.w),-.5*(x*q.x+y*q.y+z*q.z));}}
 function vertex(geometry,i,out=new T.Vector3()){
  const factor=geometry.userData.dualQuaternion?(geometry.getAttribute('poseDq')?.getX(i)||0)*dqEnabled.value:0;
  if(factor>=1)return dqVertex(geometry,i,out);
  const p=new T.Vector3().fromBufferAttribute(geometry.attributes.position,i),indices=geometry.attributes.skinIndex,weights=geometry.attributes.skinWeight;out.set(0,0,0);
  for(let k=0;k<4;k++){const w=weights.array[i*4+k];if(w)out.addScaledVector(p.clone().applyMatrix4(matrices[indices.array[i*4+k]]),w);}if(factor)out.lerp(dqVertex(geometry,i,new T.Vector3()),factor);return out;
 }
 function dqVertex(g,i,out){
  const si=g.attributes.skinIndex.array,sw=g.attributes.skinWeight.array,ref=real[si[i*4]],r=new T.Vector4(0,0,0,0),d=new T.Vector4(0,0,0,0);for(let k=0;k<4;k++){const j=si[i*4+k],factor=sw[i*4+k]*(ref.dot(real[j])<-1e-6?-1:1);r.addScaledVector(real[j],factor);d.addScaledVector(dual[j],factor);}const length=r.length();r.divideScalar(length);d.divideScalar(length);d.addScaledVector(r,-r.dot(d));const q=new T.Quaternion(r.x,r.y,r.z,r.w),t=new T.Quaternion(d.x,d.y,d.z,d.w).multiply(q.clone().conjugate());return out.fromBufferAttribute(g.attributes.position,i).applyQuaternion(q).add(new T.Vector3(2*t.x,2*t.y,2*t.z));
 }
 function prepareSurface(g){const p=g.attributes.position,si=g.attributes.skinIndex.array,sw=g.attributes.skinWeight.array,values=new Float32Array(p.count);for(let i=0;i<p.count;i++){let arm=0;for(let k=0;k<4;k++)if(/^(shoulder|elbow|wrist|hand-)/.test(unique[si[i*4+k]]))arm+=sw[i*4+k];values[i]=(1-T.MathUtils.smoothstep(p.getY(i),.10,.20))*T.MathUtils.smoothstep(arm,.9,.99);}g.setAttribute('poseDq',new T.Float32BufferAttribute(values,1));g.userData.dualQuaternion=true;return g;}
 function skinMaterial(material){
  material.onBeforeCompile=shader=>{shader.uniforms.poseDqEnabled=dqEnabled;shader.uniforms.poseReal={value:real};shader.uniforms.poseDual={value:dual};shader.vertexShader=shader.vertexShader.replace('#include <common>',`#include <common>
   uniform float poseDqEnabled;attribute float poseDq;uniform vec4 poseReal[${unique.length}];uniform vec4 poseDual[${unique.length}];
   vec3 poseRotate(vec3 p,vec4 q){return p+2.0*cross(q.xyz,cross(q.xyz,p)+q.w*p);}
   void poseBlend(out vec4 qr,out vec4 qd){vec4 ref=poseReal[int(skinIndex.x)];qr=vec4(0.0);qd=vec4(0.0);for(int k=0;k<4;k++){int j=int(skinIndex[k]);float w=skinWeight[k]*(dot(ref,poseReal[j])<-0.000001?-1.0:1.0);qr+=poseReal[j]*w;qd+=poseDual[j]*w;}float l=length(qr);qr/=l;qd/=l;qd-=qr*dot(qr,qd);}
  `).replace('#include <skinnormal_vertex>',`vec4 poseQR,poseQD;poseBlend(poseQR,poseQD);mat4 poseLinearMatrix=skinWeight.x*boneMatX+skinWeight.y*boneMatY+skinWeight.z*boneMatZ+skinWeight.w*boneMatW;objectNormal=mix((poseLinearMatrix*vec4(objectNormal,0.0)).xyz,poseRotate(objectNormal,poseQR),poseDq*poseDqEnabled);`).replace('#include <skinning_vertex>',`vec4 poseVR,poseVD;poseBlend(poseVR,poseVD);vec3 poseT=2.0*(-poseVD.w*poseVR.xyz+poseVR.w*poseVD.xyz+cross(poseVR.xyz,poseVD.xyz));vec4 poseLinearVertex=(skinWeight.x*boneMatX+skinWeight.y*boneMatY+skinWeight.z*boneMatZ+skinWeight.w*boneMatW)*vec4(transformed,1.0);transformed=mix(poseLinearVertex.xyz,poseRotate(transformed,poseVR)+poseT,poseDq*poseDqEnabled);`);};material.customProgramCacheKey=()=> 'pose-dq-v52-base-'+unique.length;return material;
 }
 return {ids:unique,matrices,real,dual,prepareSurface,skinMaterial,weights,attributes,update,vertex,method:'continuous region surface binding with dual quaternion wrist and finger blending',individualCalibration:false};
}

export function posedTriangle(binding,geometry,anchor,offset=0){
 const [i,j,k]=anchor.vertices,a=binding.vertex(geometry,i),b=binding.vertex(geometry,j),c=binding.vertex(geometry,k),normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();
 if(anchor.flip)normal.negate();
 return {point:a.multiplyScalar(anchor.bary[0]).addScaledVector(b,anchor.bary[1]).addScaledVector(c,anchor.bary[2]).addScaledVector(normal,offset),normal};
}
