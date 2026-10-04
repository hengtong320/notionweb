import assert from 'node:assert/strict';
import {POSES,poseState,calculate} from '../fullbody-tcm-v37/pose-data.js';
let count=0;const check=(a,b)=>{assert.deepEqual(a,b);count++};
const stand=poseState('stand');let r=calculate({},stand);check(r.weight,686.7);check(r.staticSupport,686.7);check(r.distribution.reduce((a,x)=>a+x.force,0),r.weight);
check(calculate({gravity:1.62},stand).weight,113.4);check(calculate({gravity:0},stand).weight,0);check(calculate({share:0},stand).distribution[0].force,0);
r=calculate({},poseState('swim'));check(r.buoyancy,637.65);assert(Math.abs(r.netWaterWeight-49.05)<1e-10);count++;check(r.staticSupport,null);assert(calculate({volume:100},poseState('swim')).netWaterWeight<0);count++;
check(calculate({gravity:0},poseState('swim')).buoyancy,0);check(calculate({},poseState('run')).staticSupport,null);check(poseState('run',.3).contact,[]);check(poseState('run',.6).contact,['左脚']);check(calculate({minutes:0},stand).changes,0);check(calculate({minutes:40,breakEvery:20},stand).changes,1);check(calculate({breakEvery:0},stand).changes,0);
for(const p of POSES)for(const phase of [0,.25,.5,.75,1]){const state=poseState(p.id,phase);assert(state.phaseName);assert(Object.values(state.joints).flat().every(Number.isFinite));assert.equal(calculate({},state).clinicalPrediction,false);count++;}
check(POSES.length,9);console.log('Pose checks:',count,'passed; all 9 poses / 5 phase positions finite.');
