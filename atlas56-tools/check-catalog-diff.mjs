import assert from 'node:assert/strict';
import {POSES as BEFORE,stateFor as beforeState} from '../fullbody-tcm-v55/pose-catalog.js';
import {POSES as AFTER,stateFor as afterState} from '../fullbody-tcm-v56/pose-catalog.js';
assert.equal(AFTER.length,120);assert.deepEqual(AFTER.map(p=>p.id),BEFORE.map(p=>p.id));
const changed=[];let unchangedStates=0;
for(let i=0;i<AFTER.length;i++){
 const a=AFTER[i],b=BEFORE[i];
 assert.deepEqual({...a,spec:null},{...b,spec:null},a.id+' task identity changed');
 if(JSON.stringify(a.spec)!==JSON.stringify(b.spec))changed.push(a.id);

 for(const phase of [0,.25,.5,.75,1]){assert.deepEqual(afterState(a,phase),beforeState(b,phase),a.id+' state changed');unchangedStates++;}
}
assert.deepEqual(changed,[]);console.log(JSON.stringify({postures:120,changed,unchangedStates,clinicalPrediction:false}));
