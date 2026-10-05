import assert from 'node:assert/strict';
import {supportReactionBounds} from '../fullbody-tcm-v54/pose-support.js';
const rectangle=(a,b)=>[[a,-.1],[b,-.1],[b,.1],[a,.1]],feet={R:rectangle(-.2,-.1),L:rectangle(.1,.2)},r=supportReactionBounds(feet,[0,0],900);
assert(r.applicable);assert(Math.abs(r.fraction.L[0]-1/3)<1e-12);assert(Math.abs(r.fraction.L[1]-2/3)<1e-12);assert.equal(r.actualForces,null);
for(const weight of [70*9.81,140*9.81,70*1.62]){const current=supportReactionBounds(feet,[0,0],weight);assert.deepEqual(current.fraction,r.fraction);assert(Math.abs(current.force.L[0]-weight/3)<1e-10);assert(Math.abs(current.force.L[1]+current.force.R[0]-weight)<1e-10);assert(Math.abs(current.force.L[0]+current.force.R[1]-weight)<1e-10);}
const single=supportReactionBounds({L:feet.L},[.15,0],800);assert(single.applicable);assert.deepEqual(single.fraction.L,[1,1]);assert.deepEqual(single.fraction.R,[0,0]);assert.deepEqual(single.force.L,[800,800]);
assert(!supportReactionBounds(feet,[.5,0],900).applicable);assert(!supportReactionBounds(feet,[0,0],0).applicable);assert(!supportReactionBounds(feet,[0,.2],900).applicable);
console.log(JSON.stringify({supportForceBounds:'verified by exact rectangular-foot solution',forceAndMomentBalance:true,massGravityScaling:true,singleSupport:true,outsideSupportRejected:true,actualForcesRemainUnknown:true}));
