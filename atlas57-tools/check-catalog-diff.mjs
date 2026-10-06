import assert from 'node:assert/strict';
import {POSES as BEFORE,stateFor as beforeState} from '../fullbody-tcm-v56/pose-catalog.js';
import {POSES as AFTER,stateFor as afterState} from '../fullbody-tcm-v57/pose-catalog.js';
assert.equal(AFTER.length,120);assert.deepEqual(AFTER.map(p=>p.id),BEFORE.map(p=>p.id));
const changed=[];let unchangedStates=0;
for(let i=0;i<AFTER.length;i++){
 const a=AFTER[i],b=BEFORE[i];
 assert.deepEqual({...a,spec:null},{...b,spec:null},a.id+' task identity changed');
 if(JSON.stringify(a.spec)!==JSON.stringify(b.spec))changed.push(a.id);

 for(const phase of [0,.25,.5,.75,1]){if(a.id!=='lift-squat'){assert.deepEqual(afterState(a,phase),beforeState(b,phase),a.id+' state changed');unchangedStates++;}}
}
assert.deepEqual(changed,['lift-squat']);
const spec=AFTER.find(p=>p.id==='lift-squat').spec;assert.equal(spec.height,.45);assert.equal(spec.legR.abd,24);assert.equal(spec.legL.abd,24);assert.deepEqual(spec.boxPlacement,{shoulderOffset:[0,-.28,.32],elbowGuide:[.7,-.4,.4],hingeFrame:true,palmOffset:.181,stabilizeWaist:true});console.log(JSON.stringify({postures:120,changed,unchangedStates,clinicalPrediction:false}));
