import assert from 'node:assert/strict';
import {POSES,stateFor} from '../fullbody-tcm-v53/pose-catalog.js';
import {solvePose,REST} from '../fullbody-tcm-v53/pose-engine.js';
import {analyze} from '../fullbody-tcm-v53/pose-analysis.js';
const length=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
const failures=[],signatures=new Set();let states=0;
for(const p of POSES){
 assert(p.explanation.length>0,p.id+' explanation');assert(p.refs.length>=2,p.id+' references');
 for(const phase of [0,.25,.5,.75,1]){const s=stateFor(p,phase),r=solvePose(s);states++;
  if(!Object.values(r.joints).flatMap(v=>v.toArray()).every(Number.isFinite))failures.push([p.id,phase,'finite']);
  for(const c of r.constraints)if(c.error>.003)failures.push([p.id,phase,c.id,c.error]);
  for(const side of ['R','L'])for(const [a,b]of [['hip','knee'],['knee','ankle'],['shoulder','elbow'],['elbow','wrist']])assert(Math.abs(r.joints[a+side].distanceTo(r.joints[b+side])-length(REST[a+side],REST[b+side]))<1e-8,p.id+' changed limb length');
  for(const chain of [['lumbar','L5','L4','L3','L2','L1','trunk'],['trunk','C7','C6','C5','C4','C3','C2','C1']])for(let i=1;i<chain.length;i++){const a=chain[i-1],b=chain[i];assert(Math.abs(r.joints[a].distanceTo(r.joints[b])-length(REST[a],REST[b]))<1e-8,p.id+' changed spine length');}
 }
 const r=solvePose(p.spec);signatures.add(JSON.stringify(Object.fromEntries(Object.entries(r.joints).map(([k,v])=>[k,v.toArray().map(x=>+x.toFixed(3))]))));
 if(p.dynamic)assert.notDeepEqual(stateFor(p,0),stateFor(p,1),p.id+' inactive phase');
}
assert.equal(POSES.length,120);assert(signatures.size>=100,'Insufficient different geometry: '+signatures.size);assert.deepEqual(failures,[],'Unreachable targets');
const p=POSES.find(p=>p.id==='lift-close'),input={mass:70,gravity:9.81,load:5,minutes:60,interval:20,volume:65};
const a=analyze(p,p.spec,input,[0,0,.3],[0,0,0]);assert(Math.abs(a.externalMoment-14.715)<1e-10);assert.equal(a.plannedChanges,2);assert.equal(a.clinicalPrediction,false);assert.equal(a.internalJointForce,null);assert.equal(a.damageProbability,null);
const zero=analyze(p,p.spec,{...input,gravity:0},[0,0,.3],[0,0,0]);assert.equal(zero.weight,0);assert.equal(zero.externalMoment,0);
const water=POSES.find(p=>p.spec.water),w=analyze(water,water.spec,input,[0,0,0],[0,0,0]);assert(Math.abs(w.buoyancy-637.65)<1e-8);
console.log(JSON.stringify({catalog:120,distinctJointConfigurations:signatures.size,statesChecked:states,unreachableTargets:0,preservedLimbAndSpineChains:true,physicsAndUnknowns:true}));
