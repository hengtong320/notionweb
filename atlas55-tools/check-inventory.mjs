import {boneSegment} from '../fullbody-tcm-v55/pose-segments.js';
import {MeshBVH,ExtendedTriangle} from 'three-mesh-bvh';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v55/bones-data.js';
import {normalizeFemaleMesh} from '../fullbody-tcm-v55/body-frame-v18.js';
import {addRegionHints,mergeSurfaceGeometry} from '../fullbody-tcm-v55/pose-regions.js';
import {createPoseBinding,posedTriangle} from '../fullbody-tcm-v55/pose-binding.js';
import {solvePose,matrixFor,REST} from '../fullbody-tcm-v55/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v55/pose-catalog.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v55/pose-grip.js';
import {createInertiaRig,observeGravity,FEMALE_PARAMETERS} from '../fullbody-tcm-v55/pose-inertia.js';

// Decode the unchanged, bundled official decoder offline. No network or browser
// execution is needed to check either native female or shared source geometry.
const sandbox={module:{exports:{}},exports:{},console,setTimeout,clearTimeout,performance};vm.runInNewContext(fs.readFileSync('fullbody-tcm-v55/draco-decoder.txt','utf8'),sandbox);const draco=await sandbox.module.exports({});
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
const buf=fs.readFileSync('fullbody-tcm-v55/pose-skin-'+sex+'.bin'),bytes=buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength),n=g.attributes.position.count,extra=new Uint32Array(bytes,0,3)[2];
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

const metrics=[],cache=new Map(),rows=[],identityMatrix=new T.Matrix4(),regionFor=(g,i)=>{const p=g.attributes.position,x=p.getX(i),y=p.getY(i),arm=g.getAttribute('bindingArm').getX(i);if(arm>.8)return x<0?'arm-right':'arm-left';if(y<-.27)return x<0?'leg-right':'leg-left';return 'body';};
const cases=POSES.filter(p=>!process.env.ATLAS_FOCUS||process.env.ATLAS_FOCUS.split(',').includes(p.id)).flatMap(p=>[0,.25,.5,.75,1].map(phase=>({pose:p.id,phase,name:p.id+'-'+phase})));for(const c of cases){const variant=c.name,id=c.pose,p=POSES.find(p=>p.id===id),spec={...stateFor(p,c.phase??0),...c.override,taskId:id,flags:p.flags};
 {const b=binding,r=configure(spec);binding.update(r);const key=JSON.stringify([binding.matrices.map(m=>m.elements),r.grip?.type,r.grip?.task.id.includes('ear'),r.grip?.task.center?.toArray(),r.grip?.task.rotation?.toArray()]);if(cache.has(key)){const v=cache.get(key);rows.push(...v.rows.map(a=>({...a,pose:id,phase:c.phase,variant})));metrics.push(...v.metrics.map(a=>({...a,pose:id,phase:c.phase,variant})));continue;}const rowStart=rows.length,metricStart=metrics.length;
 for(const [sex,gs]of Object.entries(skin)){const g=gs[0];g.userData.dualQuaternion=true;const parts=new Map(),rest=g.attributes.position,posed=new Float64Array(rest.count*3);for(let i=0;i<rest.count;i++)posed.set(b.vertex(g,i).toArray(),i*3);
 let maxRatio=0,maxLength=0,over3=0;for(let t=0;t<g.index.count;t+=3)for(let k=0;k<3;k++){const a=g.index.getX(t+k),b=g.index.getX(t+(k+1)%3),base=Math.hypot(rest.getX(a)-rest.getX(b),rest.getY(a)-rest.getY(b),rest.getZ(a)-rest.getZ(b)),len=Math.hypot(posed[a*3]-posed[b*3],posed[a*3+1]-posed[b*3+1],posed[a*3+2]-posed[b*3+2]);maxLength=Math.max(maxLength,len);if(base>.001){maxRatio=Math.max(maxRatio,len/base);if(len/base>3)over3++;}}metrics.push({pose:id,phase:c.phase,variant,sex,maxRatio,maxLength,over3});
for(let i=0;i<g.index.count;i+=3){const ids=[0,1,2].map(k=>g.index.getX(i+k)),regions=ids.map(j=>regionFor(g,j));if(!regions.every(v=>v===regions[0]))continue;const name=regions[0];if(!parts.has(name))parts.set(name,[]);parts.get(name).push(...ids);}
 const docs=new Map();for(const [name,ids]of parts){const geom=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(posed,3));geom.setIndex(ids);docs.set(name,{geometry:geom,bvh:new MeshBVH(geom,{indirect:true,maxLeafTris:8})});}
 for(const [a,otherRegion]of [['arm-right','body'],['arm-left','body'],['arm-right','arm-left'],['leg-right','leg-left'],['leg-right','body'],['leg-left','body']]){const aa=docs.get(a),cc=docs.get(otherRegion);if(!aa||!cc)continue;let count=0;const examples=[];
 aa.bvh.bvhcast(cc.bvh,identityMatrix,{intersectsTriangles:(t1,t2,i,j)=>{if(!t1.intersectsTriangle(t2,null,true))return false;const ai=aa.bvh.resolveTriangleIndex(i)*3,ci=cc.bvh.resolveTriangleIndex(j)*3,idsA=[0,1,2].map(k=>aa.geometry.index.getX(ai+k)),idsC=[0,1,2].map(k=>cc.geometry.index.getX(ci+k));if(idsA.some(v=>idsC.includes(v)))return false;const ra=new ExtendedTriangle(...idsA.map(v=>new T.Vector3().fromBufferAttribute(rest,v))),rc=new ExtendedTriangle(...idsC.map(v=>new T.Vector3().fromBufferAttribute(rest,v))),centerA=ra.getMidpoint(new T.Vector3()),centerC=rc.getMidpoint(new T.Vector3());if(centerA.distanceTo(centerC)<.04||ra.intersectsTriangle(rc,null,true))return false;count++;if(examples.length<3)examples.push({vertices:[idsA,idsC],rest:[ra.a.toArray(),ra.b.toArray(),ra.c.toArray(),rc.a.toArray(),rc.b.toArray(),rc.c.toArray()],posed:[t1.a.toArray(),t1.b.toArray(),t1.c.toArray(),t2.a.toArray(),t2.b.toArray(),t2.c.toArray()]});return false;}});rows.push({pose:id,phase:c.phase,sex,variant,pair:[a,otherRegion],crossingTrianglePairs:count,examples});}
 }
 cache.set(key,{rows:rows.slice(rowStart),metrics:metrics.slice(metricStart)});console.log(JSON.stringify({pose:id,phase:c.phase,uniqueGeometryStates:cache.size}));
 }
}

if(process.env.ATLAS_DIAGNOSTIC_OUTPUT){fs.writeFileSync(process.env.ATLAS_DIAGNOSTIC_OUTPUT,JSON.stringify({metrics,rows}));if(process.env.ATLAS_FOCUS)process.exit(0);}
const key=r=>[r.pose,r.sex,r.phase].join('|'),pairs=[['arm-right','body'],['arm-left','body'],['arm-right','arm-left'],['leg-right','leg-left'],['leg-right','body'],['leg-left','body']],baseline=JSON.parse(fs.readFileSync('atlas55-tools/surface-inventory-baseline.json','utf8')),states=new Map(),issues=[];
assert.equal(metrics.length,1200);assert.equal(rows.length,7200);
for(const r of rows){const id=key(r),pair=pairs.findIndex(p=>p.join('|')===r.pair.join('|')),before=baseline[id];assert(before,id+' missing baseline');if(!states.has(id))states.set(id,{pose:r.pose,sex:r.sex,phase:r.phase,crossings:[0,0,0,0,0,0]});states.get(id).crossings[pair]=r.crossingTrianglePairs;assert(r.crossingTrianglePairs<=before.crossings[pair],id+' '+r.pair.join('|')+' new crossing regression: '+before.crossings[pair]+' -> '+r.crossingTrianglePairs);}
for(const r of metrics){const before=baseline[key(r)];assert(r.maxRatio<=before.maxRatio+1e-4,key(r)+' increased maximum stretch beyond documented numerical ratio tolerance');assert(r.over3<=before.over3,key(r)+' additional stretched edges');Object.assign(states.get(key(r)),{maxEdgeRatio:r.maxRatio,maxEdgeLength:r.maxLength,edgesOver3:r.over3});}
const measurements=[...states.values()],flagged=values=>new Set(values.filter(r=>r.crossings.some(n=>n>0)).map(r=>r.pose)).size,poses=POSES.map(p=>{const current=measurements.filter(r=>r.pose===p.id),previous=Object.values(baseline).filter(r=>r.pose===p.id);return {pose:p.id,name:p.name,maximumCrossingsBefore:Math.max(...previous.map(r=>r.crossings.reduce((a,b)=>a+b,0))),maximumCrossingsAfter:Math.max(...current.map(r=>r.crossings.reduce((a,b)=>a+b,0))),maximumEdgeRatio:Math.max(...current.map(r=>r.maxEdgeRatio))};});
const report={version:'55.0.0',placement:'Production configure including floor placement and hand-support adjustment',poses:120,sexPhaseStates:1200,uniqueGeometryStates:cache.size,regionComparisons:7200,sourceSkinUnchanged:true,clinicalPrediction:false,baselineFlaggedPoses:flagged(Object.values(baseline)),flaggedPoses:flagged(measurements),noNewCrossings:true,maximumRatioChanges:metrics.filter(r=>r.maxRatio>baseline[key(r)].maxRatio+1e-6).map(r=>({pose:r.pose,sex:r.sex,phase:r.phase,before:baseline[key(r)].maxRatio,after:r.maxRatio})),noIncreasedMaximumEdgeStretch:metrics.every(r=>r.maxRatio<=baseline[key(r)].maxRatio+1e-6),noIncreasedMaximumStretchBeyondNumericalTolerance:true,numericalRatioTolerance:1e-4,diagnosticRatio3IsNotClinicalThreshold:true,noAdditionalStretchedEdges:true,poseSummary:poses,measurements};
fs.writeFileSync('atlas55-tools/surface-inventory-verification.json',JSON.stringify(report,(_k,v)=>typeof v==='number'?Number(v.toFixed(8)):v,2));console.log(JSON.stringify({...report,poseSummary:undefined,measurements:undefined}));
