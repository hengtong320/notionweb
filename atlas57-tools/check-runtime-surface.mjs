import {constrainWaistEdges} from './waist-edge-oracle.mjs';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {surfaceCrossings} from '../atlas56-tools/surface-crossings.mjs';
import {POSES as PREVIOUS_POSES,stateFor as previousStateFor} from '../fullbody-tcm-v55/pose-catalog.js';
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
function configure(spec){
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
 const task=handRig&&gripTask(spec,r);if(task){solveGrip(r,task,handRig);applyMatrices(r);for(const entry of r.grip.matrices){entry.mesh.matrix.copy(entry.matrix);entry.mesh.matrixWorld.copy(entry.matrix);}}
 return r;
}


const heldBoxGeometry=new RoundedBoxGeometry(.30,.23,.25,2,.012),heldBoxBVH=new MeshBVH(heldBoxGeometry,{maxLeafTris:8}),heldRayDirection=new T.Vector3(1,.271,.193).normalize();
function actualBoxDepth(p){const hits=heldBoxBVH.raycast(new T.Ray(p,heldRayDirection),T.DoubleSide).map(h=>h.distance).sort((a,b)=>a-b),unique=hits.filter((d,i)=>i===0||d-hits[i-1]>1e-7);if(unique.length%2===0)return 0;return heldBoxBVH.closestPointToPoint(p).distance;}
if(process.env.ATLAS_BOX_MESH){assert(Math.abs(actualBoxDepth(new T.Vector3())-.115)<1e-6);assert.equal(actualBoxDepth(new T.Vector3(.2,0,0)),0);assert(actualBoxDepth(new T.Vector3(.145,0,0))>.0049);assert.equal(actualBoxDepth(new T.Vector3(.149,.114,.124)),0);}

const rawBinding=createRawBinding(handRig),cases=JSON.parse(fs.readFileSync((process.env.ATLAS_COMPLETE_CASES||'atlas57-tools/box-boundary-cases.json'),'utf8')),rows=[],hashes=Object.fromEntries(Object.entries(skin).map(([s,gs])=>[s,Buffer.from(gs[0].attributes.position.array.buffer).toString('base64')]));
for(const c of cases){
 const p=POSES.find(p=>p.id===c.pose),spec={...stateFor(p,c.phase||0),...c.override,taskId:p.id,flags:p.flags};spec.boxPlacement={...spec.boxPlacement,stabilizeWaist:true};const r=configure(spec);binding.update(r);rawBinding.update(r);
 for(const sex of ['male','female']){const g=skin[sex][0],n=g.attributes.position.count,expected=new Float32Array(n*3),v=new T.Vector3();for(let i=0;i<n;i++)expected.set(rawBinding.vertex(g,i,v).toArray(),i*3);const oracle=constrainWaistEdges(g,expected);
 const start=performance.now();binding.updateSurfaceBound(g);const computeMilliseconds=performance.now()-start,report=binding.surfaceBoundAudit(g);let max=0,offsetMax=0,normalError=0;
 for(let i=0;i<n;i++){binding.vertex(g,i,v);max=Math.max(max,Math.hypot(v.x-expected[i*3],v.y-expected[i*3+1],v.z-expected[i*3+2]));const a=g.attributes.poseBoundOffset.array;offsetMax=Math.max(offsetMax,Math.hypot(a[i*3],a[i*3+1],a[i*3+2]));const normal=g.attributes.poseBoundNormal.array;if(normal[i*4+3])normalError=Math.max(normalError,Math.abs(Math.hypot(normal[i*4],normal[i*4+1],normal[i*4+2])-1));}
 assert(max<2e-7,'Oracle mismatch '+max);assert(offsetMax<=.0012502);assert(normalError<1e-6);const cachedStart=performance.now();binding.updateSurfaceBound(g);const cachedMilliseconds=performance.now()-cachedStart;assert.deepEqual(binding.surfaceBoundAudit(g),report,'Repeated update must reuse the result');
 assert.equal(Buffer.from(g.attributes.position.array.buffer).toString('base64'),hashes[sex]);rows.push({sex,variant:c.name,oracle,report,computeMilliseconds,cachedMilliseconds,maximumPositionDifferenceMetres:max,maximumNormalLengthError:normalError});console.log(JSON.stringify(rows.at(-1)));
 }
}
// Restore inactive states and verify attributes cannot leak into another pose.
const p=POSES.find(p=>p.id==='stand-relaxed'),r=configure({...stateFor(p,0),taskId:p.id});binding.update(r);for(const sex of ['female','male']){const g=skin[sex][0];binding.updateSurfaceBound(g);assert(!binding.surfaceBoundAudit(g).active);assert(g.attributes.poseBoundOffset.array.every(x=>x===0));assert(g.attributes.poseBoundNormal.array.every(x=>x===0));}
fs.writeFileSync((process.env.ATLAS_COMPLETE_OUTPUT||'atlas57-tools/runtime-surface-verification.json'),JSON.stringify({passed:true,states:rows.length,measurement:'Runtime display kernel versus independently applied offline bounded-edge oracle, all source vertices; normal lengths; repeated-cache use; inactive-state cleanup; source hashes unchanged',rows},null,2));
