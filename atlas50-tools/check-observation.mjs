import assert from 'node:assert/strict';
import {POSES,stateFor} from '../fullbody-tcm-v50/pose-catalog.js';
import {analyze} from '../fullbody-tcm-v50/pose-analysis.js';
import {loadContext,taskObservation,timeObservation,compareObservations} from '../fullbody-tcm-v50/pose-observation.js';
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
// Evidence stays tied to the original protocol; plans never manufacture recovery.
const representative=['stand-relaxed','sit-supported','sit-edge','bend-round','lift-close','lift-far','supine','side-left','run-right','swim-breast-pull'];
let researchCases=0;
for(const id of representative){const p=get(id);assert(p,id);for(const t of [0,1,20,30,60,120])for(const gap of [0,20]){const x=timeObservation(p,p.spec,t,gap);assert(x.study.maintenance.length>20);assert(x.study.exposure.includes(t+' 分钟')||t===0&&x.study.exposure.includes('0分钟'));assert.equal(x.study.personalFatigue,null);assert.equal(x.study.recovery,null);assert(x.planOnly);assert(x.study.evidence.every(e=>e.protocol&&e.finding&&e.limit&&e.url.startsWith('https://')));if(t===0)assert(x.study.evidence.every(e=>e.relation.includes('背景研究')));researchCases++;}}
const p=get('stand-relaxed'),x=timeObservation(p,p.spec,30,20),y=timeObservation(p,p.spec,60,20),z=timeObservation(p,p.spec,60,0);assert.notEqual(x.study.exposure,y.study.exposure);assert.equal(y.study.exposure,z.study.exposure);assert.equal(y.study.evidence[0].minutes,120);assert.equal(y.study.evidence[0].finding,x.study.evidence[0].finding);
const u=analyze(p,p.spec,{...input,minutes:60},[0,1,.3],[0,1,0]);assert.equal(u.externalMoment,stand.externalMoment);assert.equal(u.damageProbability,null);
const td=compareObservations({analysis:stand,supports:[]},{analysis:u,supports:[]}).find(x=>x.region==='持续时间与身体任务');assert(td&&!td.same);
console.log(JSON.stringify({researchCases,evidenceProtocolFixed:true,zeroTime:true,plansDoNotChangeExposure:true,timeComparison:true}));
