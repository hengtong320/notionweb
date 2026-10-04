import assert from 'node:assert/strict';
import {POSES,stateFor} from '../fullbody-tcm-v44/pose-catalog.js';
import {analyze} from '../fullbody-tcm-v44/pose-analysis.js';
import {loadContext,taskObservation,timeObservation,compareObservations} from '../fullbody-tcm-v44/pose-observation.js';
const get=id=>POSES.find(p=>p.id===id),input={mass:70,gravity:9.81,load:5,minutes:30,interval:20,volume:65};
let supported=0;
for(const p of POSES){const c=loadContext(p);if(c.supported)supported++;for(const t of [0,1,10,30,60]){const a=analyze(p,stateFor(p,.5),{...input,minutes:t},[0,1,.3],[0,1,0]);assert.equal(a.load,c.supported?5:0,p.id);assert.equal(a.externalMoment,c.supported?14.715:null,p.id);assert(a.lumbar[0].length>10);assert.equal(a.plannedChanges,t===60?2:t===30?1:0);assert.equal(a.time.longestSegment,Math.min(t,20));assert.equal(a.internalJointForce,null);assert.equal(a.damageProbability,null);assert(a.time.text.length>20);}}
for(const id of ['stand-relaxed','stand-counter','cycle','sit-drive','sweep','mop','supine','side-left','walk-right'])assert.equal(loadContext(get(id)).supported,false,id);
for(const id of ['lift-close','stand-right-bag','stand-backpack','sit-phone','rest-guitar','rest-game'])assert(loadContext(get(id)).supported,id);
const badPoint=analyze(get('lift-close'),get('lift-close').spec,input,null,[0,0,0]);assert.equal(badPoint.externalMoment,null);
const stand=analyze(get('stand-relaxed'),get('stand-relaxed').spec,input,[0,1,.3],[0,1,0]);assert(stand.loadRejected);assert(stand.lumbar[0].includes('维持直立'));
const counter=analyze(get('stand-counter'),get('stand-counter').spec,input,[0,1,.3],[0,1,0]);assert(counter.lumbar[0].includes('前臂与台面'));
const walk=taskObservation(get('walk-right')),game=taskObservation(get('rest-game'));assert.equal(walk.kind,'activity');assert.equal(game.kind,'mixed');
assert.equal(timeObservation(get('stand-relaxed'),get('stand-relaxed').spec,60,0).plannedChanges,0);assert.equal(timeObservation(get('stand-relaxed'),get('stand-relaxed').spec,60,0).longestSegment,60);
const diff=compareObservations({analysis:stand,supports:['右脚']},{analysis:counter,supports:['右脚','右前臂']});assert(diff.some(x=>typeof x==='string'&&x.includes('右前臂')));assert(diff.some(x=>x.region==='腰背'&&!x.same));assert(diff.some(x=>x.region==='颈肩'&&!x.same));
const left=analyze(get('side-left'),get('side-left').spec,input,null,[0,0,0]),right=analyze(get('side-right'),get('side-right').spec,input,null,[0,0,0]);assert(left.lumbar.some(x=>x.includes('左侧躯干')));assert(right.lumbar.some(x=>x.includes('右侧躯干')));
assert.equal(analyze(get('lift-close'),get('lift-close').spec,{...input,gravity:0},[0,1,.3],[0,1,0]).externalMoment,0);
console.log(JSON.stringify({poses:120,timeCases:600,supportedLoads:supported,loadContextRejection:true,staticActivityAndRepetition:true,comparisonRegions:true,unknownForcesRemainNull:true}));
