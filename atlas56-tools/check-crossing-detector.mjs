import assert from 'node:assert/strict';
import * as T from 'three';
import {surfaceCrossings} from './surface-crossings.mjs';
const pose=[-1,-1,0,1,-1,0,0,1,0,0,-.4,-1,0,-.4,1,0,.4,0],source=pose.map((v,i)=>i>=9&&i%3===0?v+10:v);
function geometry(values,indices=[0,1,2,3,4,5]){const g=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(values,3));g.setIndex(indices);return g;}
const sourceGeometry=geometry(source),region=ids=>ids[0]<3?'arm-right':'leg-right',rows=[];
for(const [name,indices,translation,leaf]of [['original',[0,1,2,3,4,5],[0,0,0],8],['reversed faces',[3,4,5,0,1,2],[0,0,0],1],['translated',null,[5,3,-7],1],['large leaves',null,[0,0,0],32]]){
 const g=geometry(source,indices||[0,1,2,3,4,5]),values=pose.map((v,i)=>v+translation[i%3]),r=surfaceCrossings(g,values,region,{maxLeafTris:leaf});assert.equal(r.newIntersectionFacePairs,1,name);assert.equal(r.groups['arm-right|leg-right'],1,name);rows.push({name,count:r.newIntersectionFacePairs});g.dispose();
}
const self=surfaceCrossings(sourceGeometry,pose,()=> 'leg-right');assert.equal(self.groups['leg-right|leg-right'],1);rows.push({name:'same region self crossing',count:self.newIntersectionFacePairs});
assert.equal(surfaceCrossings(geometry(pose),pose,region).newIntersectionFacePairs,0);rows.push({name:'intersection already in source excluded',count:0});
assert.equal(surfaceCrossings(sourceGeometry,source,region).newIntersectionFacePairs,0);rows.push({name:'separated surfaces',count:0});
const invalid=geometry(source);invalid.setIndex(new Uint32Array([0,1,2,3,4,5]));assert.throws(()=>surfaceCrossings(invalid,pose,region),/BufferAttribute/);rows.push({name:'invalid typed-array indices rejected',passed:true});
sourceGeometry.dispose();invalid.dispose();console.log(JSON.stringify({checks:rows.length,rows,clinicalPrediction:false}));
