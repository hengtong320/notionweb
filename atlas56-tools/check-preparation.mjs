import {loadCheckedSurface} from './surface-cache.mjs';
import {boneSegment} from '../fullbody-tcm-v56/pose-segments.js';
import {gripTask as oldGripTask,solveGrip as oldSolveGrip} from '../fullbody-tcm-v55/pose-grip.js';
import {createPoseBinding as oldBinding} from '../fullbody-tcm-v55/pose-binding.js';
import {addRegionHints as oldRegionHints} from '../fullbody-tcm-v55/pose-regions.js';
import {POSES as OLD_POSES,stateFor as oldState} from '../fullbody-tcm-v55/pose-catalog.js';
import {solvePose as oldSolve} from '../fullbody-tcm-v55/pose-engine.js';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {BONES} from '../fullbody-tcm-v56/bones-data.js';
import {normalizeFemaleMesh,normalizeFemaleMeshAsync,nativeFemalePosition} from '../fullbody-tcm-v56/body-frame-v18.js';
import {addRegionHints,mergeSurfaceGeometry} from '../fullbody-tcm-v56/pose-regions.js';
import {createPoseBinding,posedTriangle} from '../fullbody-tcm-v56/pose-binding.js';
import {solvePose,matrixFor,REST} from '../fullbody-tcm-v56/pose-engine.js';
import {POSES,stateFor} from '../fullbody-tcm-v56/pose-catalog.js';
import {createHandRig,gripTask,solveGrip} from '../fullbody-tcm-v56/pose-grip.js';
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

const catalog=new Map(JSON.parse(fs.readFileSync('fullbody-tcm-v12/assets/female/catalog.json','utf8')).entries.map(r=>[r.id,r])),nodes=[];
for(const system of ['respiratory','digestive','urinary','reproductive','breast','vascular']){const d=await load('fullbody-tcm-v12/assets/female/'+system+'.glb');d.scene.traverse(n=>{const info=catalog.get(n.name);if(n.isMesh&&info&&(system!=='vascular'||info.ancestry.includes('VH_F_heart')))nodes.push({node:n,info});});}
const cases=nodes.sort((a,b)=>b.node.geometry.attributes.position.count-a.node.geometry.attributes.position.count).slice(0,8),rows=[];
function independent(n){const m=new T.Mesh(n.geometry.clone());m.matrixAutoUpdate=false;m.matrix.copy(n.matrixWorld);m.updateMatrixWorld(true);return m;}
for(const {node,info}of cases){const a=independent(node),b=independent(node),native=b.geometry.attributes.position.array.slice();normalizeFemaleMesh(a,T);let yields=0;await normalizeFemaleMeshAsync(b,T,async()=>{yields++;});for(const attr of ['position','normal'])assert.deepEqual(b.geometry.attributes[attr].array,a.geometry.attributes[attr].array,info.name+' '+attr);assert.deepEqual(nativeFemalePosition(b).array,native,info.name+' native source moved');const displayed=b.geometry;await normalizeFemaleMeshAsync(b,T,async()=>{throw Error('normalization ran twice');});assert.equal(b.geometry,displayed);assert.deepEqual(nativeFemalePosition(b).array,native);const g=a.geometry.clone().applyMatrix4(a.matrixWorld).scale(.001,.001,.001).translate(-.09955,-.835,.05),h=g.clone(),old=oldBinding(),now=createPoseBinding();old.attributes(g,{bodyOnly:true});let pauses=0;await now.attributesAsync(h,{bodyOnly:true},async()=>{pauses++;});assert.deepEqual(h.attributes.skinIndex.array,g.attributes.skinIndex.array,info.name+' body indices');assert.deepEqual(h.attributes.skinWeight.array,g.attributes.skinWeight.array,info.name+' body weights');rows.push({id:info.id,name:info.name,vertices:native.length/3,normalizationYields:yields,bindingYields:pauses,positionsAndNormalsIdentical:true,nativeSourceUnmoved:true,nativeHintRetainedOnReuse:true,bodyWeightsMatchV53:true});a.geometry.dispose();b.geometry.dispose();g.dispose();h.dispose();}
assert.equal(rows.length,8);assert(rows.every(r=>r.normalizationYields>0&&r.bindingYields>0));fs.writeFileSync('atlas56-tools/preparation-verification.json',JSON.stringify({version:'56.0.0',largestNativeOrganMeshes:rows.length,rows,clinicalCalibration:false},null,2));console.log(JSON.stringify({largestNativeOrganMeshes:rows.length,largestVertices:rows[0].vertices,allComparedAttributesByteIdentical:true,sourceCoordinatesRetainedOnReuse:true}));
