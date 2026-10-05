import * as T from 'three';
import {REST,matrixFor} from './pose-engine.js';
import {createPoseBinding as createBaseBinding} from './pose-binding-base.js';

// Visual registration in the common teaching frame. These weights have no
// material constants, subject measurements, tissue forces or clinical meaning.
const V=a=>new T.Vector3(...a);
export function createPoseBinding(handRig){
 const baseBinding=createBaseBinding(handRig),phoneHand={value:0},palmSides={value:new T.Vector2()},thoracicEnabled={value:0};
 const phoneShell={value:0},phoneShellInverse={value:new T.Matrix4()},phoneShellMatrix={value:new T.Matrix4()};
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
 ids.push(...Object.keys(REST).filter(id=>/^T\d+$/.test(id)));
 const unique=[...new Set(ids)],index=new Map(unique.map((id,i)=>[id,i])),matrices=unique.map(()=>new T.Matrix4()),real=unique.map(()=>new T.Vector4(0,0,0,1)),dual=unique.map(()=>new T.Vector4()),dqEnabled={value:1};
 const central=id=>['pelvis','lumbar','trunk','head'].includes(id)||/^[CL]\d+$/.test(id);
 const bodyIndices=unique.map((id,i)=>central(id)?i:null).filter(i=>i!==null);
 function prepareSpine(g){
  const p=g.attributes.position,si=new Uint16Array(p.count*4),sw=new Float32Array(p.count*4),mask=new Float32Array(p.count),levels=['L1',...Array.from({length:12},(_,i)=>'T'+(12-i)),'C7'];
  for(let i=0;i<p.count;i++){
   const y=p.getY(i);let j=1;while(j<levels.length-1&&y>REST[levels[j]][1])j++;
   const a=levels[j-1],b=levels[j],t=T.MathUtils.smoothstep(y,REST[a][1],REST[b][1]);
   si[i*4]=index.get(a);si[i*4+1]=index.get(b);sw[i*4]=1-t;sw[i*4+1]=t;
   mask[i]=T.MathUtils.smoothstep(y,REST.L1[1]-.03,REST.L1[1])*(1-T.MathUtils.smoothstep(y,REST.C7[1],REST.C7[1]+.03));
  }
  g.setAttribute('skinIndexSpine',new T.Uint16BufferAttribute(si,4));g.setAttribute('skinWeightSpine',new T.Float32BufferAttribute(sw,4));g.setAttribute('poseSpine',new T.Float32BufferAttribute(mask,1));return g;
 }
 function nearest(point,family){
  if(family==='body'){const y=point.y,levels=['pelvis','lumbar','L5','L4','L3','L2','L1','trunk','C7','C6','C5','C4','C3','C2','C1','head'],heights=levels.map(id=>id==='head'?.69:REST[id][1]);let j=1;while(j<heights.length-1&&y>heights[j])j++;const a=levels[j-1],b=levels[j],t=T.MathUtils.smoothstep(y,heights[j-1],heights[j]);return [[a,1-t],[b,t]];}
  const h=handRig?.[family.slice(-1)],progress=h?point.clone().sub(h.wristRest).dot(h.long):0;
  let distance=Infinity;const candidates=[];
  for(const c of chains){
   if(c.family!==family)continue;
   if(c.id.startsWith('hand-')&&progress<=.010)continue;
   const x=point.x-c.a.x,y=point.y-c.a.y,z=point.z-c.a.z,t=T.MathUtils.clamp((x*c.dx+y*c.dy+z*c.dz)/c.lengthSq,0,1),dx=x-c.dx*t,dy=y-c.dy*t,dz=z-c.dz*t,d=dx*dx+dy*dy+dz*dz;
   distance=Math.min(distance,d);candidates.push({c,d,along:t*c.length});
  }
  const sigma=family==='body'?.018:family.startsWith('leg')?.025:T.MathUtils.lerp(.018,.008,T.MathUtils.smoothstep(progress,.04,.10)),combined=new Map();let total=0;
  for(const {c,d,along} of candidates){const factor=Math.exp(-(d-distance)/(sigma*sigma))*(c.id.startsWith('hand-')?T.MathUtils.smoothstep(progress,.010,.040):1);if(factor<1e-5)continue;total+=factor;const length=c.length,pairs=[[c.id,1]];
  // Each segment shares a smooth transition with its neighbours; the limb
  // interior follows its actual bone, without blending the opposite limb.
  if(along<c.width&&c.previous!==c.id){const w=.5*(1-T.MathUtils.smoothstep(along,0,c.width));pairs[0][1]-=w;pairs.push([c.previous,w]);}
  if(length-along<c.width&&c.next!==c.id){const w=.5*(1-T.MathUtils.smoothstep(length-along,0,c.width));pairs[0][1]-=w;pairs.push([c.next,w]);}
   for(const [id,w] of pairs)combined.set(id,(combined.get(id)||0)+w*factor);
  }return [...combined].map(([id,w])=>[id,w/total]);
 }
 function distanceTo(point,family){let distance=Infinity;for(const c of chains){if(c.family!==family)continue;const x=point.x-c.a.x,y=point.y-c.a.y,z=point.z-c.a.z,t=T.MathUtils.clamp((x*c.dx+y*c.dy+z*c.dz)/c.lengthSq,0,1);distance=Math.min(distance,Math.hypot(x-c.dx*t,y-c.dy*t,z-c.dz*t));}return distance;}
 function weights(point,bodyOnly=false,armHint=null,limit=4){
  const side=point.x<0?'R':'L',y=point.y,armDistance=distanceTo(point,'arm'+side),centralDistance=Math.min(distanceTo(point,'body'),distanceTo(point,'leg'+side));
  let arm=bodyOnly?0:T.MathUtils.smoothstep(centralDistance-armDistance,-.012,.025)*(1-T.MathUtils.smoothstep(y,.54,.60))*T.MathUtils.smoothstep(y,-.27,-.20);
  if(!bodyOnly&&armHint!==null)arm=armHint;
  const leg=bodyOnly?0:1-T.MathUtils.smoothstep(y,-.23,-.02),pairs=new Map();
  const add=(family,factor)=>{if(factor<=0)return;for(const [id,w] of nearest(point,family))pairs.set(id,(pairs.get(id)||0)+w*factor);};
  const middleWidth=T.MathUtils.lerp(.001,.05,T.MathUtils.smoothstep(y,-.40,-.20)),left=T.MathUtils.smoothstep(point.x,-middleWidth,middleWidth);
  add('arm'+side,arm);add('legR',leg*(1-arm)*(1-left));add('legL',leg*(1-arm)*left);add('body',(1-leg)*(1-arm));
  const ordered=[...pairs].filter(([,w])=>w>1e-8).sort((a,b)=>b[1]-a[1]).slice(0,limit),sum=ordered.reduce((n,[,w])=>n+w,0);
  return {indices:Array.from({length:limit},(_,i)=>ordered[i]?index.get(ordered[i][0]):0),weights:Array.from({length:limit},(_,i)=>ordered[i]?ordered[i][1]/sum:0)};
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
 function regularize(geometry,indices,values,stride){
  const p=geometry.attributes.position,n=p.count,groups=[],lookup=new Map(),vertexGroup=new Uint32Array(n);
  for(let i=0;i<n;i++){const key=[p.getX(i),p.getY(i),p.getZ(i)].map(x=>Math.round(x*1e5)).join(',');let j=lookup.get(key);if(j===undefined){j=groups.length;lookup.set(key,j);groups.push({vertices:[],edges:new Set()});}groups[j].vertices.push(i);vertexGroup[i]=j;}
  const index=geometry.index,count=index?.count||n;
  for(let i=0;i<count;i+=3){const triangle=[0,1,2].map(k=>index?index.getX(i+k):i+k);for(let k=0;k<3;k++){const a=triangle[k],b=triangle[(k+1)%3],u=vertexGroup[a],v=vertexGroup[b];if(u!==v&&Math.hypot(p.getX(a)-p.getX(b),p.getY(a)-p.getY(b),p.getZ(a)-p.getZ(b))<.04){groups[u].edges.add(v);groups[v].edges.add(u);}}}
  const size=unique.length,original=new Float32Array(groups.length*size);for(let j=0;j<groups.length;j++)for(const i of groups[j].vertices)for(let k=0;k<stride;k++)original[j*size+indices[i*stride+k]]+=values[i*stride+k]/groups[j].vertices.length;
  let field=original.slice(),next=new Float32Array(field.length);
  for(let pass=0;pass<64;pass++){for(let j=0;j<groups.length;j++){const neighbours=groups[j].edges,offset=j*size;for(let k=0;k<size;k++){let sum=0;for(const q of neighbours)sum+=field[q*size+k];next[offset+k]=neighbours.size?.004*original[offset+k]+.496*field[offset+k]+.5*sum/neighbours.size:original[offset+k];}}[field,next]=[next,field];}
  for(let j=0;j<groups.length;j++){const representative=groups[j].vertices[0];let armAmount=0;for(let k=0;k<stride;k++)if(/^(shoulder|elbow|wrist|hand-)/.test(unique[indices[representative*stride+k]]))armAmount+=values[representative*stride+k];if(p.getY(representative)>0||armAmount<.99){continue;}const entries=[];for(let k=0;k<size;k++)if(field[j*size+k]>1e-7)entries.push([k,field[j*size+k]]);entries.sort((a,b)=>b[1]-a[1]);entries.length=Math.min(stride,entries.length);const sum=entries.reduce((a,e)=>a+e[1],0);for(const i of groups[j].vertices)for(let k=0;k<stride;k++){indices[i*stride+k]=entries[k]?.[0]||0;values[i*stride+k]=(entries[k]?.[1]||0)/sum;}}
 }
 function attributes(geometry,{bodyOnly=false,surface=false}={}){
  if(!surface)return prepareSpine(baseBinding.attributes(geometry,{bodyOnly}));
  const p=geometry.attributes.position,hints=geometry.getAttribute('bindingArm'),armField=continuousArmField(geometry),stride=8,indices=new Uint16Array(p.count*stride),values=new Float32Array(p.count*stride),point=new T.Vector3();
  for(let i=0;i<p.count;i++){point.fromBufferAttribute(p,i);const hint=armField?armField[i]:hints?hints.getX(i):null,w=weights(point,bodyOnly,hint,point.y<=0&&hint>=.99?8:4);indices.set(w.indices,i*stride);values.set(w.weights,i*stride);}
  regularize(geometry,indices,values,stride);baseBinding.attributes(geometry,{surface:true});
  const amount=new Float32Array(p.count);for(let i=0;i<p.count;i++){let arm=0;for(let k=0;k<4;k++)if(/^(shoulder|elbow|wrist|hand-)/.test(unique[geometry.attributes.skinIndex.array[i*4+k]]))arm+=geometry.attributes.skinWeight.array[i*4+k];amount[i]=(1-T.MathUtils.smoothstep(p.getY(i),-.03,0))*T.MathUtils.smoothstep(arm,.99,1);}
  for(let block=0;block<2;block++){const si=new Uint16Array(p.count*4),sw=new Float32Array(p.count*4);for(let i=0;i<p.count;i++)if(amount[i]>0)for(let k=0;k<4;k++){si[i*4+k]=indices[i*stride+block*4+k];sw[i*4+k]=values[i*stride+block*4+k];}geometry.setAttribute(block?'skinIndexExtra':'skinIndexHand',new T.Uint16BufferAttribute(si,4));geometry.setAttribute(block?'skinWeightExtra':'skinWeightHand',new T.Float32BufferAttribute(sw,4));}
  geometry.setAttribute('poseHand',new T.Float32BufferAttribute(amount,1));return prepareSpine(geometry);
 }
 function update(result){phoneShell.value=+(result.grip?.type==='phone');if(phoneShell.value){phoneShellMatrix.value.compose(result.grip.task.center,result.grip.task.rotation,new T.Vector3(1,1,1));phoneShellInverse.value.copy(phoneShellMatrix.value).invert();}const palmStrength=result.grip?.task.id.includes('ear')?1:.6;palmSides.value.set(palmStrength*+(result.grip?.type==='phone'&&!!result.grip.task.roles.R),palmStrength*+(result.grip?.type==='phone'&&!!result.grip.task.roles.L));thoracicEnabled.value=+(!!(result.spec?.spineAdjustment?.thoracicFlex||result.spec?.spineAdjustment?.thoracicSide||result.spec?.spineAdjustment?.thoracicTwist));phoneHand.value=+(result.grip?.type==='phone');dqEnabled.value=result.grip?0:1;for(let i=0;i<unique.length;i++){const id=unique[i],part=result.parts[id];if(part)matrices[i].copy(matrixFor(part));else{const entry=result.grip?.matrices.find(e=>e.mesh.name===id);if(entry)matrices[i].copy(entry.matrix);else matrices[i].copy(matrixFor(result.parts['wrist'+(id.endsWith('right')?'R':'L')]));}}for(let i=0;i<unique.length;i++){const q=new T.Quaternion().setFromRotationMatrix(matrices[i]),e=matrices[i].elements,x=e[12],y=e[13],z=e[14];real[i].set(q.x,q.y,q.z,q.w);dual[i].set(.5*(x*q.w+y*q.z-z*q.y),.5*(-x*q.z+y*q.w+z*q.x),.5*(x*q.y-y*q.x+z*q.w),-.5*(x*q.x+y*q.y+z*q.z));}}
 function vertex(geometry,i,out=new T.Vector3(),projectShell=true){
  const factor=geometry.userData.dualQuaternion?(geometry.getAttribute('poseDq')?.getX(i)||0)*dqEnabled.value:0;
  if(factor>=1)return spineVertex(geometry,i,dqVertex(geometry,i,out));
  const p=new T.Vector3().fromBufferAttribute(geometry.attributes.position,i),indices=geometry.attributes.skinIndex,weights=geometry.attributes.skinWeight;out.set(0,0,0);
  for(let k=0;k<4;k++){const w=weights.array[i*4+k];if(w)out.addScaledVector(p.clone().applyMatrix4(matrices[indices.array[i*4+k]]),w);}if(factor)out.lerp(dqVertex(geometry,i,new T.Vector3()),factor);const hand=(geometry.attributes.poseHand?.getX(i)||0)*phoneHand.value;if(hand){const posed=new T.Vector3();for(const [si,sw]of [[geometry.attributes.skinIndexHand,geometry.attributes.skinWeightHand],[geometry.attributes.skinIndexExtra,geometry.attributes.skinWeightExtra]])for(let k=0;k<4;k++){const w=sw.array[i*4+k];if(w)posed.addScaledVector(p.clone().applyMatrix4(matrices[si.array[i*4+k]]),w);}out.lerp(posed,hand);}const palm=geometry.attributes.posePalm;if(palm){const mask=palm.getX(i)*palmSides.value.getComponent(palm.getZ(i));if(mask)out.lerp(p.clone().applyMatrix4(matrices[palm.getY(i)]),mask);}return projectShell?shellVertex(geometry,spineVertex(geometry,i,out)):spineVertex(geometry,i,out);
 }
 // Correct only shallow skin/device overlap in the displayed geometry. The
 // source mesh and rigid bones stay unchanged; this is not a tissue force solve.
 function shellVertex(g,out){
  if(!phoneShell.value||!g.attributes.posePalm)return out;
  const local=out.clone().applyMatrix4(phoneShellInverse.value),depths=[.0375-Math.abs(local.x),.07-Math.abs(local.y),.0045-Math.abs(local.z)],depth=Math.min(...depths);
  if(depth<=0||depth>.00195)return out;
  const axis=depths.indexOf(depth);local.setComponent(axis,local.getComponent(axis)+(local.getComponent(axis)<0?-1:1)*(depth+.00005));
  return out.copy(local.applyMatrix4(phoneShellMatrix.value));
 }
 function spineVertex(g,i,out){
  const blend=(g.attributes.poseSpine?.getX(i)||0)*thoracicEnabled.value;if(!blend)return out;
  const p=new T.Vector3().fromBufferAttribute(g.attributes.position,i),si=g.attributes.skinIndex.array,sw=g.attributes.skinWeight.array,original=new T.Vector3(),replacement=new T.Vector3();let bodyWeight=0;
  for(let k=0;k<4;k++){const j=si[i*4+k],w=sw[i*4+k];if(w&&central(unique[j])){bodyWeight+=w;original.addScaledVector(p.clone().applyMatrix4(matrices[j]),w);}}
  if(!bodyWeight)return out;
  for(let k=0;k<4;k++){const w=g.attributes.skinWeightSpine.array[i*4+k];if(w)replacement.addScaledVector(p.clone().applyMatrix4(matrices[g.attributes.skinIndexSpine.array[i*4+k]]),w*bodyWeight);}
  return out.addScaledVector(replacement.sub(original),blend);
 }
 const spineHeader=()=>`
  uniform float poseThoracicEnabled;attribute float poseSpine;attribute vec4 skinIndexSpine;attribute vec4 skinWeightSpine;
  bool poseCentral(float id){return ${bodyIndices.map(i=>'abs(id-'+i+'.0)<0.1').join('||')};}
 `;
 const spineMatrix=()=>`mat4 poseOriginalBody=mat4(0.0);float poseBodyWeight=0.0;for(int k=0;k<4;k++){if(poseCentral(skinIndex[k])){poseOriginalBody+=skinWeight[k]*getBoneMatrix(skinIndex[k]);poseBodyWeight+=skinWeight[k];}}mat4 poseThoracicMatrix=skinWeightSpine.x*getBoneMatrix(skinIndexSpine.x)+skinWeightSpine.y*getBoneMatrix(skinIndexSpine.y);mat4 poseSpineDelta=poseSpine*poseThoracicEnabled*(poseThoracicMatrix*poseBodyWeight-poseOriginalBody);`;
 function tissueMaterial(material){
  material.onBeforeCompile=shader=>{shader.uniforms.poseThoracicEnabled=thoracicEnabled;shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>'+spineHeader()).replace('#include <skinnormal_vertex>',`#include <skinnormal_vertex>
   ${spineMatrix()}objectNormal+=(poseSpineDelta*vec4(normal,0.0)).xyz;
  `).replace('#include <skinning_vertex>',`vec3 poseRestPosition=transformed;
   #include <skinning_vertex>
   transformed+=(poseSpineDelta*vec4(poseRestPosition,1.0)).xyz;`);};
  material.customProgramCacheKey=()=> 'pose-thoracic-tissue-v53-'+unique.length;return material;
 }
 function dqVertex(g,i,out){
  const si=g.attributes.skinIndex.array,sw=g.attributes.skinWeight.array,ref=real[si[i*4]],r=new T.Vector4(0,0,0,0),d=new T.Vector4(0,0,0,0);for(let k=0;k<4;k++){const j=si[i*4+k],factor=sw[i*4+k]*(ref.dot(real[j])<-1e-6?-1:1);r.addScaledVector(real[j],factor);d.addScaledVector(dual[j],factor);}const length=r.length();r.divideScalar(length);d.divideScalar(length);d.addScaledVector(r,-r.dot(d));const q=new T.Quaternion(r.x,r.y,r.z,r.w),t=new T.Quaternion(d.x,d.y,d.z,d.w).multiply(q.clone().conjugate());return out.fromBufferAttribute(g.attributes.position,i).applyQuaternion(q).add(new T.Vector3(2*t.x,2*t.y,2*t.z));
 }
 function prepareSurface(g){const p=g.attributes.position,si=g.attributes.skinIndex.array,sw=g.attributes.skinWeight.array,values=new Float32Array(p.count);for(let i=0;i<p.count;i++){let arm=0;for(let k=0;k<4;k++)if(/^(shoulder|elbow|wrist|hand-)/.test(unique[si[i*4+k]]))arm+=sw[i*4+k];values[i]=(1-T.MathUtils.smoothstep(p.getY(i),.10,.20))*T.MathUtils.smoothstep(arm,.9,.99);}g.setAttribute('poseDq',new T.Float32BufferAttribute(values,1));const palm=new Float32Array(p.count*3),point=new T.Vector3();for(let i=0;i<p.count;i++){point.fromBufferAttribute(p,i);const side=point.x<0?'R':'L',h=handRig?.[side];if(!h)continue;const progress=point.clone().sub(h.wristRest).dot(h.long);palm[i*3]=(1-T.MathUtils.smoothstep(progress,.035,.12))*(g.attributes.poseHand?.getX(i)||0);palm[i*3+1]=index.get('wrist'+side);palm[i*3+2]=side==='R'?0:1;}g.setAttribute('posePalm',new T.Float32BufferAttribute(palm,3));g.userData.dualQuaternion=true;return g;}
 function skinMaterial(material){
  material.onBeforeCompile=shader=>{shader.uniforms.posePhoneShell=phoneShell;shader.uniforms.posePhoneShellInverse=phoneShellInverse;shader.uniforms.posePhoneShellMatrix=phoneShellMatrix;shader.uniforms.posePalmSides=palmSides;shader.uniforms.poseThoracicEnabled=thoracicEnabled;shader.uniforms.poseDqEnabled=dqEnabled;shader.uniforms.posePhoneHand=phoneHand;shader.uniforms.poseReal={value:real};shader.uniforms.poseDual={value:dual};shader.vertexShader=shader.vertexShader.replace('#include <common>',`#include <common>
   ${spineHeader()}
   uniform float posePhoneShell;uniform mat4 posePhoneShellInverse;uniform mat4 posePhoneShellMatrix;
   vec3 poseShellNormal;
   vec3 poseShell(vec3 p){poseShellNormal=vec3(0.0);if(posePhoneShell<0.5)return p;vec3 local=(posePhoneShellInverse*vec4(p,1.0)).xyz;vec3 depths=vec3(.0375,.07,.0045)-abs(local);float d=min(depths.x,min(depths.y,depths.z));if(d<=0.0||d>.00195)return p;int axis=d==depths.x?0:d==depths.y?1:2;float s=local[axis]<0.0?-1.0:1.0;local[axis]+=s*(d+.00005);vec3 n=vec3(0.0);n[axis]=s;poseShellNormal=(posePhoneShellMatrix*vec4(n,0.0)).xyz;return (posePhoneShellMatrix*vec4(local,1.0)).xyz;}
   uniform vec2 posePalmSides;attribute vec3 posePalm;uniform float poseDqEnabled;uniform float posePhoneHand;attribute float poseDq;attribute float poseHand;attribute vec4 skinIndexHand;attribute vec4 skinWeightHand;attribute vec4 skinIndexExtra;attribute vec4 skinWeightExtra;uniform vec4 poseReal[${unique.length}];uniform vec4 poseDual[${unique.length}];
   vec3 poseRotate(vec3 p,vec4 q){return p+2.0*cross(q.xyz,cross(q.xyz,p)+q.w*p);}
   void poseBlend(out vec4 qr,out vec4 qd){vec4 ref=poseReal[int(skinIndex.x)];qr=vec4(0.0);qd=vec4(0.0);for(int k=0;k<4;k++){int j=int(skinIndex[k]);float w=skinWeight[k]*(dot(ref,poseReal[j])<-0.000001?-1.0:1.0);qr+=poseReal[j]*w;qd+=poseDual[j]*w;}float l=length(qr);qr/=l;qd/=l;qd-=qr*dot(qr,qd);}
  `).replace('#include <skinnormal_vertex>',`vec3 poseRestNormal=objectNormal;vec4 poseQR,poseQD;poseBlend(poseQR,poseQD);mat4 poseLinearMatrix=skinWeight.x*boneMatX+skinWeight.y*boneMatY+skinWeight.z*boneMatZ+skinWeight.w*boneMatW;mat4 poseHandMatrix=mat4(0.0);float poseHandBlend=poseHand*posePhoneHand;if(poseHandBlend>0.0){for(int k=0;k<4;k++){poseHandMatrix+=skinWeightHand[k]*getBoneMatrix(skinIndexHand[k])+skinWeightExtra[k]*getBoneMatrix(skinIndexExtra[k]);}}float posePalmBlend=posePalm.x*posePalmSides[int(posePalm.z)];mat4 posePalmMatrix=getBoneMatrix(posePalm.y);${spineMatrix()}objectNormal=mix(mix((poseLinearMatrix*vec4(objectNormal,0.0)).xyz,poseRotate(objectNormal,poseQR),poseDq*poseDqEnabled),(poseHandMatrix*vec4(objectNormal,0.0)).xyz,poseHandBlend)+(poseSpineDelta*vec4(poseRestNormal,0.0)).xyz;objectNormal=mix(objectNormal,(posePalmMatrix*vec4(poseRestNormal,0.0)).xyz,posePalmBlend);vec3 poseShellPosition=mix(mix((poseLinearMatrix*vec4(position,1.0)).xyz,poseRotate(position,poseQR)+2.0*(-poseQD.w*poseQR.xyz+poseQR.w*poseQD.xyz+cross(poseQR.xyz,poseQD.xyz)),poseDq*poseDqEnabled),(poseHandMatrix*vec4(position,1.0)).xyz,poseHandBlend)+(poseSpineDelta*vec4(position,1.0)).xyz;poseShellPosition=mix(poseShellPosition,(posePalmMatrix*vec4(position,1.0)).xyz,posePalmBlend);poseShell(poseShellPosition);if(length(poseShellNormal)>0.0)objectNormal=poseShellNormal;`).replace('#include <skinning_vertex>',`vec3 poseRestPosition=transformed;vec4 poseVR,poseVD;poseBlend(poseVR,poseVD);vec3 poseT=2.0*(-poseVD.w*poseVR.xyz+poseVR.w*poseVD.xyz+cross(poseVR.xyz,poseVD.xyz));vec4 poseLinearVertex=(skinWeight.x*boneMatX+skinWeight.y*boneMatY+skinWeight.z*boneMatZ+skinWeight.w*boneMatW)*vec4(transformed,1.0);transformed=mix(mix(poseLinearVertex.xyz,poseRotate(transformed,poseVR)+poseT,poseDq*poseDqEnabled),(poseHandMatrix*vec4(transformed,1.0)).xyz,poseHandBlend)+(poseSpineDelta*vec4(poseRestPosition,1.0)).xyz;transformed=mix(transformed,(posePalmMatrix*vec4(poseRestPosition,1.0)).xyz,posePalmBlend);transformed=poseShell(transformed);`);};material.customProgramCacheKey=()=> 'pose-hand8-v53-'+unique.length;return material;
 }
 return {ids:unique,matrices,real,dual,prepareSurface,prepareSpine,skinMaterial,tissueMaterial,weights,attributes,update,vertex,method:'Continuous phone hand field, palm transition, shallow device shell contact and thoracic central contributions',individualCalibration:false};
}

export function posedTriangle(binding,geometry,anchor,offset=0){
 const [i,j,k]=anchor.vertices,a=binding.vertex(geometry,i),b=binding.vertex(geometry,j),c=binding.vertex(geometry,k),normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();
 if(anchor.flip)normal.negate();
 return {point:a.multiplyScalar(anchor.bary[0]).addScaledVector(b,anchor.bary[1]).addScaledVector(c,anchor.bary[2]).addScaledVector(normal,offset),normal};
}
