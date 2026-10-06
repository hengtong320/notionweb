import {gripTask as beforeTask,solveGrip as beforeGrip} from '../fullbody-tcm-v56/pose-grip.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {surfaceCrossings} from '../atlas56-tools/surface-crossings.mjs';
import {POSES as PREVIOUS_POSES,stateFor as previousStateFor} from '../fullbody-tcm-v56/pose-catalog.js';
import {boneSegment} from '../fullbody-tcm-v56/pose-segments.js';
import {MeshBVH,ExtendedTriangle} from 'three-mesh-bvh';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v56/bones-data.js';
import {normalizeFemaleMesh} from '../fullbody-tcm-v56/body-frame-v18.js';
import {addRegionHints,mergeSurfaceGeometry} from '../fullbody-tcm-v56/pose-regions.js';
import {createPoseBinding,posedTriangle} from '../fullbody-tcm-v57/pose-binding.js';
import {createPoseBinding as createRawBinding} from '../fullbody-tcm-v56/pose-binding.js';
import {solvePose,matrixFor,REST} from '../fullbody-tcm-v56/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v57/pose-catalog.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v57/pose-grip.js';
import {createInertiaRig,observeGravity,FEMALE_PARAMETERS} from '../fullbody-tcm-v56/pose-inertia.js';

// Decode the unchanged, bundled official decoder offline. No network or browser
// execution is needed to check either native female or shared source geometry.
const sandbox={module:{exports:{}},exports:{},console,setTimeout,clearTimeout,performance};vm.runInNewContext(fs.readFileSync('fullbody-tcm-v56/draco-decoder.txt','utf8'),sandbox);const draco=await sandbox.module.exports({});
const decoder={preload(){},decodeDracoFile(buffer,callback,ids,types,_color,onError){
 return Promise.resolve().then(()=>{const decoder=new draco.Decoder(),source=new Int8Array(buffer),mesh=new draco.Mesh(),status=decoder.DecodeArrayToMesh(source,source.byteLength,mesh);if(!status.ok())throw Error(status.error_msg());const g=new T.BufferGeometry();
  for(const [name,id] of Object.entries(ids)){const attr=decoder.GetAttributeByUniqueId(mesh,id),count=mesh.num_points()*attr.num_components(),pointer=draco._malloc(count*4);decoder.GetAttributeDataArrayForAllPoints(mesh,attr,draco.DT_FLOAT32,count*4,pointer);const values=new Float32Array(draco.HEAPF32.buffer,pointer,count).slice();draco._free(pointer);g.setAttribute(name,new T.BufferAttribute(values,attr.num_components()));}
  const count=mesh.num_faces()*3,pointer=draco._malloc(count*4);decoder.GetTrianglesUInt32Array(mesh,count*4,pointer);g.setIndex(new T.BufferAttribute(new Uint32Array(draco.HEAPU32.buffer,pointer,count).slice(),1));draco._free(pointer);draco.destroy(mesh);draco.destroy(decoder);callback(g);return g;
 }).catch(onError);
}};
const loader=new GLTFLoader().setDRACOLoader(decoder);
async function load(path){const b=fs.readFileSync(path),g=await loader.parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');g.scene.updateMatrixWorld(true);return g;}
function bake(n,female=false){if(female)normalizeFemaleMesh(n,T);const g=n.geometry.clone().applyMatrix4(n.matrixWorld);g.scale(.001,.001,.001).translate(-.09955,-.835,.05);g.computeBoundingBox();return g;}
const data=new Map(BONES.map(b=>[b.id,b])),boneDoc=await load('fullbody-tcm-v9/assets/fullbody.glb'),meshes=[];
const segment=boneSegment;
boneDoc.scene.traverse(n=>{if(n.isMesh){const m=new T.Mesh(bake(n));m.name=n.name;m.userData={info:data.get(n.name),segment:segment(data.get(n.name))};meshes.push(m);}});
const handRig=createHandRig(meshes);if(process.env.ATLAS_BINDING_POSE)console.log(JSON.stringify({hands:Object.fromEntries(['R','L'].map(s=>[s,{palm:handRig[s].palm.toArray(),wrist:handRig[s].wristRest.toArray(),fingers:handRig[s].fingers.map(f=>({index:f.index,nodes:f.nodes.map(n=>n.toArray())}))}]))}));const binding=createPoseBinding(handRig),skin={};
for(const sex of ['male','female']){const d=await load(sex==='male'?'fullbody-tcm-v11/assets/surface.glb':'fullbody-tcm-v12/assets/female/surface.glb');skin[sex]=[];d.scene.traverse(n=>{if(n.isMesh){const sourcePosition=n.geometry.attributes.position.clone(),g=bake(n,sex==='female');g.userData.sourcePosition=sourcePosition;g.userData.nativeFemale=sex==='female';g.userData.sourceInfo=n.userData.atlas;g.userData.sourceName=n.userData.atlas?.name||n.name;addRegionHints(g,{...n.userData.atlas,system:'surface'},sex==='female'?sourcePosition:null,true);skin[sex].push(g);}});}

if(process.env.ATLAS_COMPONENTS)for(const [sex,gs] of Object.entries(skin))console.log(JSON.stringify({sex,components:gs.map(g=>g.userData.armComponents)}));
for(const [sex,gs]of Object.entries(skin)){skin[sex]=[mergeSurfaceGeometry(gs)];skin[sex][0].userData.sourceName=sex+'-merged-source';skin[sex][0].userData.nativeFemale=sex==='female';}

for(const [sex,gs] of Object.entries(skin))for(const g of gs){
const buf=fs.readFileSync('fullbody-tcm-v56/pose-skin-'+sex+'.bin'),bytes=buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength),n=g.attributes.position.count,extra=new Uint32Array(bytes,0,3)[2];
g.setAttribute('skinIndex',new T.Uint16BufferAttribute(new Uint16Array(bytes,12,n*4).slice(),4));g.setAttribute('skinWeight',new T.Float32BufferAttribute(new Float32Array(bytes,12+n*8,n*4).slice(),4));
const hand=new Float32Array(n),si=new Uint16Array(n*4),sw=new Float32Array(n*4),xi=new Uint16Array(n*4),xw=new Float32Array(n*4),dv=new DataView(bytes);
for(let j=0;j<extra;j++){const o=12+n*24+j*56,i=dv.getUint32(o,true);hand[i]=dv.getFloat32(o+4,true);for(let b=0;b<2;b++)for(let k=0;k<4;k++){(b?xi:si)[i*4+k]=dv.getUint16(o+8+b*8+k*2,true);(b?xw:sw)[i*4+k]=dv.getFloat32(o+24+b*16+k*4,true);}}
g.setAttribute('poseHand',new T.Float32BufferAttribute(hand,1));g.setAttribute('skinIndexHand',new T.Uint16BufferAttribute(si,4));g.setAttribute('skinWeightHand',new T.Float32BufferAttribute(sw,4));g.setAttribute('skinIndexExtra',new T.Uint16BufferAttribute(xi,4));g.setAttribute('skinWeightExtra',new T.Float32BufferAttribute(xw,4));binding.prepareSpine(g);binding.prepareSurface(g);
}
const V=a=>new T.Vector3(...a);function boundsFor(test){const box=new T.Box3();for(const m of meshes)if(test(m))box.union(m.geometry.boundingBox.clone().applyMatrix4(m.matrix));return box;}
function applyMatrices(result){for(const m of meshes){m.matrix.copy(matrixFor(result.parts[m.userData.segment]));m.matrixWorld.copy(m.matrix);}}
function translateSolved(result,dy){for(const part of Object.values(result.parts))part.position.y+=dy;for(const c of result.constraints){c.target[1]+=dy;c.actual[1]+=dy;}applyMatrices(result);}
function configure(spec,isBefore=false){
 spec=structuredClone(spec);
 const place=()=>{let result=solvePose(spec);applyMatrices(result);const all=boundsFor(()=>true);
  if(spec.bed){if(spec.bridge){const headMin=boundsFor(m=>m.userData.segment==='head').min.y;spec.height=(spec.height||0)-headMin;result=solvePose(spec);applyMatrices(result);translateSolved(result,.45);}else translateSolved(result,.45-all.min.y);}
  else if(spec.water)translateSolved(result,.45-all.min.y);
  else if(spec.floorSit){const min=boundsFor(m=>m.userData.segment==='pelvis').min.y;if(Math.abs(min)>.002){spec.height=(spec.height||0)-min;result=solvePose(spec);applyMatrices(result);}const minY=boundsFor(()=>true).min.y;if(minY<0&&!spec.handSupport)translateSolved(result,-minY);}
  else if(spec.kneeling||spec.quadruped){const lift=Math.max(0,-boundsFor(m=>!m.userData.segment.startsWith('wrist')).min.y);if(lift&&spec.feet?.length){spec.height=(spec.height||0)+lift;result=solvePose(spec);applyMatrices(result);}else translateSolved(result,lift);}
  return result;
 };
 let r=place();
 if(spec.handSupport||spec.quadruped){for(let pass=0;pass<4;pass++){let changed=false;for(const side of spec.handSides||['R','L']){const bottom=boundsFor(m=>m.userData.segment==='wrist'+side).min.y;if(Math.abs(bottom)>.001&&spec['handTarget'+side]){spec['handTarget'+side][1]-=bottom;changed=true;}}if(!changed)break;r=place();}}
 const task=handRig&&(isBefore?beforeTask:gripTask)(spec,r);if(task){(isBefore?beforeGrip:solveGrip)(r,task,handRig);applyMatrices(r);for(const entry of r.grip.matrices){entry.mesh.matrix.copy(entry.matrix);entry.mesh.matrixWorld.copy(entry.matrix);}}
 return r;
}


const heldBoxGeometry=new RoundedBoxGeometry(.30,.23,.25,2,.012),heldBoxBVH=new MeshBVH(heldBoxGeometry,{maxLeafTris:8}),heldRayDirection=new T.Vector3(1,.271,.193).normalize();
function actualBoxDepth(p){const hits=heldBoxBVH.raycast(new T.Ray(p,heldRayDirection),T.DoubleSide).map(h=>h.distance).sort((a,b)=>a-b),unique=hits.filter((d,i)=>i===0||d-hits[i-1]>1e-7);if(unique.length%2===0)return 0;return heldBoxBVH.closestPointToPoint(p).distance;}
{assert(Math.abs(actualBoxDepth(new T.Vector3())-.115)<1e-6);assert.equal(actualBoxDepth(new T.Vector3(.2,0,0)),0);assert(actualBoxDepth(new T.Vector3(.145,0,0))>.0049);assert.equal(actualBoxDepth(new T.Vector3(.149,.114,.124)),0);}
const rawBinding=createRawBinding(handRig);
const report={version:'57.0.0',baselineVersion:'56.0.0',heldObjectCheck:true?'Actual RoundedBoxGeometry triangles, odd ray crossings and closest-triangle distance':'Analytic rounded box SDF',clearanceThreshold:.002,scope:'All source triangles, including mixed-region triangles and same-region self intersections; unique unordered face pairs; rest centroid separation at least 40 mm; excludes shared vertices and intersections in source',sourceVerticesUnchanged:true,rows:[]};
const cases=JSON.parse(fs.readFileSync((process.env.ATLAS_COMPLETE_CASES||'atlas57-tools/box-full-cases.json'),'utf8'));
for(const c of cases){
 const p=(c.version==='before'?PREVIOUS_POSES:POSES).find(p=>p.id===c.pose),spec={...(c.version==='before'?previousStateFor:stateFor)(p,c.phase||0),...c.override,taskId:p.id,flags:p.flags},result=configure(spec,c.version==='before');if(c.version!=='before')assert.equal(spec.boxPlacement?.stabilizeWaist,true,'Candidate must use the actual production display correction');
 for(const side of ['R','L']){
  for(const [a,b] of [['shoulder','elbow'],['elbow','wrist']])assert(Math.abs(result.joints[a+side].distanceTo(result.joints[b+side])-V(REST[a+side]).distanceTo(b==='wrist'?handRig[side].wristRest:V(REST[b+side])))<1e-8,'Rigid arm length changed');
  for(const p of Object.values(result.parts))assert(p.position.toArray().concat(p.rotation.toArray()).every(Number.isFinite),'Non-finite transform');
  assert(handRig[side].wristRest.clone().applyMatrix4(matrixFor(result.parts['elbow'+side])).distanceTo(handRig[side].wristRest.clone().applyMatrix4(matrixFor(result.parts['wrist'+side])))<1e-8,'Disconnected wrist');
 }
 for(const f of result.grip.fingerChains)for(let i=1;i<f.nodes.length;i++)assert(Math.abs(V(f.nodes[i]).distanceTo(V(f.nodes[i-1]))-f.restLengths[i-1])<1e-8,'Finger length changed');
 assert(result.grip.contacts.every(c=>c.error<.003),'Unreachable grip');
 binding.update(result);rawBinding.update(result);
 for(const sex of ['male','female']){const g=skin[sex][0],rest=g.attributes.position,posed=new Float32Array(rest.count*3),isBefore=c.version==='before',b=isBefore?rawBinding:binding;
 const correctionStart=performance.now();if(!isBefore)binding.updateSurfaceBound(g);const correctionMilliseconds=performance.now()-correctionStart,waistCorrection=isBefore?null:binding.surfaceBoundAudit(g);for(let i=0;i<rest.count;i++)posed.set(b.vertex(g,i).toArray(),i*3);
 let reversedFaceOrientations=0;
 if(!isBefore&&waistCorrection.correctedVertices){const raw=new Float32Array(rest.count*3),v=new T.Vector3();for(let i=0;i<rest.count;i++)raw.set(rawBinding.vertex(g,i,v).toArray(),i*3);const ix=g.index.array;
 for(let f=0;f<ix.length;f+=3){const a=ix[f]*3,b=ix[f+1]*3,c=ix[f+2]*3,normal=p=>{const ux=p[b]-p[a],uy=p[b+1]-p[a+1],uz=p[b+2]-p[a+2],vx=p[c]-p[a],vy=p[c+1]-p[a+1],vz=p[c+2]-p[a+2];return [uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx];},n=normal(raw),m=normal(posed);if(n[0]*m[0]+n[1]*m[1]+n[2]*m[2]<0)reversedFaceOrientations++;}}

 const classify=ids=>{const x=ids.reduce((s,i)=>s+rest.getX(i),0)/3,y=ids.reduce((s,i)=>s+rest.getY(i),0)/3,arm=ids.reduce((s,i)=>s+g.attributes.bindingArm.getX(i),0)/3;return arm>.8?(x<0?'arm-right':'arm-left'):y<-.27?(x<0?'leg-right':'leg-left'):'body';};
 const crossings=surfaceCrossings(g,posed,classify);
 let boxOverlap=null;if(result.grip?.type==='box'){const task=result.grip.task,inverse=task.rotation.clone().invert();let depth=0,inside=0,deepest=null,armInside=0,armDepth=0,armDeepest=null;for(let i=0;i<rest.count;i++){const isArm=g.attributes.bindingArm.getX(i)>.8;const p=new T.Vector3().fromArray(posed,i*3).sub(task.center).applyQuaternion(inverse),q=new T.Vector3(Math.abs(p.x)-.138,Math.abs(p.y)-.103,Math.abs(p.z)-.113),sdfDepth=.012-(Math.min(Math.max(q.x,q.y,q.z),0)+new T.Vector3(Math.max(q.x,0),Math.max(q.y,0),Math.max(q.z,0)).length()),d=true&&sdfDepth>.002?actualBoxDepth(p):sdfDepth;if(isArm){if(d>.002){armInside++;if(d>armDepth){armDepth=d;armDeepest={vertex:i,rest:[rest.getX(i),rest.getY(i),rest.getZ(i)],posed:Array.from(posed.slice(i*3,i*3+3)),weights:Array.from({length:4},(_,k)=>({id:binding.ids[g.attributes.skinIndex.getComponent(i,k)],weight:g.attributes.skinWeight.getComponent(i,k)})).filter(w=>w.weight)};}}continue;}if(d>.002){inside++;if(d>depth){depth=d;deepest={vertex:i,rest:[rest.getX(i),rest.getY(i),rest.getZ(i)],posed:Array.from(posed.slice(i*3,i*3+3))};}}}boxOverlap={sourceBodyOrLegVerticesInside:inside,maximumDepth:depth,deepest,sourceArmVerticesInside:armInside,maximumArmDepth:armDepth,armDeepest};}

 let maxRatio=0,over3=0,worstEdge=null;const edgeGroups={};for(let f=0;f<g.index.count;f+=3)for(let k=0;k<3;k++){const a=g.index.getX(f+k),b=g.index.getX(f+(k+1)%3),base=Math.hypot(rest.getX(a)-rest.getX(b),rest.getY(a)-rest.getY(b),rest.getZ(a)-rest.getZ(b));if(base<=.001)continue;const length=Math.hypot(posed[a*3]-posed[b*3],posed[a*3+1]-posed[b*3+1],posed[a*3+2]-posed[b*3+2]);const ratio=length/base,part=binding.ids[g.attributes.skinIndex.getX(a)],group=/hand/.test(part)?'fingers':/^wrist|elbow/.test(part)?'wrist-forearm':/^shoulder/.test(part)?'upper-arm':/^hip/.test(part)?'hip-thigh':/^knee/.test(part)?'knee-calf':/^ankle/.test(part)?'foot':'trunk-head',bucket=edgeGroups[group]||={max:0,over3:0};bucket.max=Math.max(bucket.max,ratio);if(ratio>3){over3++;bucket.over3++;}if(ratio>maxRatio){maxRatio=ratio;worstEdge={vertices:[a,b],rest:[a,b].map(i=>[rest.getX(i),rest.getY(i),rest.getZ(i)]),posed:[a,b].map(i=>Array.from(posed.slice(i*3,i*3+3))),parts:[a,b].map(i=>Array.from({length:4},(_,k)=>({id:binding.ids[g.attributes.skinIndex.getComponent(i,k)],weight:g.attributes.skinWeight.getComponent(i,k)})).filter(x=>x.weight)),base,length};}}
 const row={reversedFaceOrientations,waistCorrection,correctionMilliseconds,maxRatio,over3,edgeGroups,worstEdge,gripContactMaximumError:Math.max(...result.grip.contacts.map(x=>x.error)),pose:c.pose,variant:c.name||c.pose,phase:c.phase||0,version:c.version,sex,...crossings,sourceWeights:crossings.examples.map(e=>({pair:e.pair,vertices:e.vertices.map(ids=>ids.map(i=>({i,armHint:g.attributes.bindingArm.getX(i),weights:Array.from({length:4},(_,k)=>({id:binding.ids[g.attributes.skinIndex.getComponent(i,k)],weight:g.attributes.skinWeight.getComponent(i,k)})).filter(w=>w.weight)})))})),joints:Object.fromEntries(Object.entries(result.joints).filter(([k])=>/^(hip|knee|ankle|shoulder|elbow|wrist)/.test(k)).map(([k,v])=>[k,v.toArray()])),boxCenter:result.grip?.task?.center?.toArray(),boxOverlap};report.rows.push(row);console.log(JSON.stringify({...row,examples:undefined,sourceWeights:undefined,joints:undefined,worstEdge:undefined,edgeGroups:undefined}));
 }
}
const failures=[];for(const a of report.rows.filter(r=>r.variant.startsWith('candidate-'))){const b=report.rows.find(r=>r.variant==='baseline-'+a.variant.slice(10)&&r.sex===a.sex);assert(b,'Missing previous-version counterpart');const problems=[];for(const [g,n]of Object.entries(a.groups))if(n>(b.groups[g]||0))problems.push({group:g,before:b.groups[g]||0,after:n});if(a.maxRatio>b.maxRatio+1e-4||a.over3>b.over3)problems.push({stretchBefore:[b.maxRatio,b.over3],stretchAfter:[a.maxRatio,a.over3]});if(a.reversedFaceOrientations)problems.push({reversedFaceOrientations:a.reversedFaceOrientations});if(a.boxOverlap.sourceBodyOrLegVerticesInside||a.boxOverlap.sourceArmVerticesInside)problems.push({boxOverlap:a.boxOverlap});if(problems.length)failures.push({variant:a.variant,sex:a.sex,problems});}
report.failures=failures;report.passed=failures.length===0;report.pairedCandidateStates=report.rows.length/2;fs.writeFileSync(process.env.ATLAS_COMPLETE_OUTPUT||'atlas57-tools/box-boundary-verification.json',JSON.stringify(report,null,2));assert.equal(failures.length,0,'Box posture geometry regression');
