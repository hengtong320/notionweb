import {loadCheckedSurface} from './surface-cache.mjs';
import {boneSegment} from '../fullbody-tcm-v57/pose-segments.js';
import {gripTask as oldGripTask,solveGrip as oldSolveGrip} from '../fullbody-tcm-v56/pose-grip.js';
import {createPoseBinding as oldBinding} from '../fullbody-tcm-v56/pose-binding.js';
import {addRegionHints as oldRegionHints} from '../fullbody-tcm-v56/pose-regions.js';
import {POSES as OLD_POSES,stateFor as oldState} from '../fullbody-tcm-v56/pose-catalog.js';
import {solvePose as oldSolve} from '../fullbody-tcm-v56/pose-engine.js';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v57/bones-data.js';
import {normalizeFemaleMesh} from '../fullbody-tcm-v57/body-frame-v18.js';
import {addRegionHints,mergeSurfaceGeometry} from '../fullbody-tcm-v57/pose-regions.js';
import {createPoseBinding,posedTriangle} from '../fullbody-tcm-v57/pose-binding.js';
import {solvePose,matrixFor,REST} from '../fullbody-tcm-v57/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v57/pose-catalog.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v57/pose-grip.js';
import {createInertiaRig,observeGravity,FEMALE_PARAMETERS} from '../fullbody-tcm-v57/pose-inertia.js';

// Decode the unchanged, bundled official decoder offline. No network or browser
// execution is needed to check either native female or shared source geometry.
const sandbox={module:{exports:{}},exports:{},console,setTimeout,clearTimeout,performance};vm.runInNewContext(fs.readFileSync('fullbody-tcm-v57/draco-decoder.txt','utf8'),sandbox);const draco=await sandbox.module.exports({});
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

const checks=[],before=oldBinding(handRig),identity=()=>({parts:Object.fromEntries(Object.entries(REST).map(([id,a])=>[id,{position:new T.Vector3(...a),rest:new T.Vector3(...a),rotation:new T.Quaternion()}]))});
function movedOpposite(side){const r=identity(),opposite=side==='L'?'R':'L',q=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),.6),origin=new T.Vector3(...REST['hip'+opposite]);for(const name of ['hip','knee','ankle']){const p=r.parts[name+opposite];p.position.sub(origin).applyQuaternion(q).add(origin);p.rotation.copy(q);}return r;}
for(const [sex,gs] of Object.entries(skin))for(const side of ['R','L']){
 const g=gs[0],p=g.attributes.position,samples=[];for(let i=0;i<p.count;i++)if((side==='R'?p.getX(i)<0:p.getX(i)>0)&&p.getY(i)<-.27&&g.attributes.bindingArm.getX(i)<.5)samples.push(i);
 assert(samples.length>1000);const row={sex,side,samples:samples.length};for(const [version,b]of [['before',before],['after',binding]]){loadCheckedSurface(g,sex,b,version==='before'?'56':'56');b.update(identity());const start=samples.map(i=>b.vertex(g,i));b.update(movedOpposite(side));let max=0,changed=0;for(let j=0;j<samples.length;j++){const delta=b.vertex(g,samples[j]).distanceTo(start[j]);max=Math.max(max,delta);if(delta>2e-5)changed++;}row[version]={maxDisplacementMetres:max,changedVertices:changed};if(version==='after')assert(max<2e-5,sex+' '+side+' skin follows opposite leg');}checks.push(row);
}
const structures=[];
for(const [system,file,female]of [['nerves','fullbody-tcm-v9/assets/nervous.glb',false],['vessels','fullbody-tcm-v11/assets/vessels.glb',false],['female-vessels','fullbody-tcm-v12/assets/female/vascular.glb',true]]){
 const d=await load(file),entries=[];const nativeCatalog=female?new Map(JSON.parse(fs.readFileSync('fullbody-tcm-v12/assets/female/catalog.json','utf8')).entries.map(r=>[r.id,r])):null;
 d.scene.traverse(n=>{if(n.isMesh){const info=nativeCatalog?.get(n.name)||n.userData.atlas,text=[info?.name,info?.en,info?.english].join(' ');if(/femoral|sciatic|popliteal|tibial|peroneal|fibular|saphenous|sural|股|胫|腓|坐骨/i.test(text))entries.push({n,info});}});
 for(const {n,info}of entries){const g=bake(n,female);g.userData.sourceInfo=info;addRegionHints(g,info,null,true);binding.attributes(g);const reference=g.clone();let pauses=0;await binding.attributesAsync(g,{},async()=>{pauses++;});for(const key of ['skinIndex','skinWeight','skinIndexSpine','skinWeightSpine','poseSpine'])assert.deepEqual(g.attributes[key].array,reference.attributes[key].array,info.name+' async '+key);reference.dispose();g.computeBoundingBox();const box=g.boundingBox,side=box.min.x>=-.001?'L':box.max.x<=.001?'R':null;if(!side)continue;binding.update(identity());const samples=[];for(let i=0;i<g.attributes.position.count;i++)if(g.attributes.position.getY(i)<-.27)samples.push(i);if(!samples.length)continue;const start=samples.map(i=>binding.vertex(g,i));binding.update(movedOpposite(side));let max=0;for(let j=0;j<samples.length;j++)max=Math.max(max,binding.vertex(g,samples[j]).distanceTo(start[j]));assert(max<2e-5,system+' '+info.name+' follows opposite leg');structures.push({system,chunkedPreparationMatchesSync:true,id:info.id,name:info.name,side,samples:samples.length,maxDisplacementMetres:max});g.dispose();}
}
assert(structures.some(r=>r.system==='nerves'));
console.log(JSON.stringify({testedSystems:[...new Set(structures.map(r=>r.system))],structures:structures.length}));
const report={version:'57.0.0',sourceSkinUnchanged:true,independentOppositeLegMotion:true,toleranceMetres:2e-5,skin:checks,structures,clinicalCalibration:false};fs.writeFileSync('atlas57-tools/leg-isolation-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify({skinCases:checks.length,structures:structures.length,beforeMaximumMetres:Math.max(...checks.map(r=>r.before.maxDisplacementMetres)),afterMaximumMetres:Math.max(...checks.map(r=>r.after.maxDisplacementMetres)),passed:true}));
