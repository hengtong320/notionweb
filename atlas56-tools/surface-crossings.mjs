import assert from 'node:assert/strict';
import * as T from 'three';
import {MeshBVH,ExtendedTriangle} from 'three-mesh-bvh';

// Display diagnostics only. Face-pair counts depend on mesh tessellation and
// do not measure tissue penetration depth, pressure, force, or clinical risk.
const sourceFacts=new WeakMap();
export function surfaceCrossings(restGeometry,posedValues,regionFor,{minimumSourceSeparation=.04,maxLeafTris=8,examplesPerGroup=1}={}){
 const rest=restGeometry.attributes.position,index=restGeometry.index;
 assert(rest?.isBufferAttribute,'A source position attribute is required');
 assert(index?.isBufferAttribute&&index.itemSize===1,'Triangle indices must be a BufferAttribute');
 assert.equal(index.count%3,0);assert.equal(posedValues.length,rest.count*3);
 for(const i of index.array)assert(Number.isInteger(i)&&i>=0&&i<rest.count,'Invalid source triangle index');
 const geometry=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(posedValues,3));
 geometry.setIndex(new T.BufferAttribute(index.array.slice(),1));
 assert.equal(geometry.index.count,index.count);
 let facts=sourceFacts.get(restGeometry);if(!facts){const centers=new Float64Array(index.count);for(let f=0;f<index.count/3;f++)for(let k=0;k<3;k++){const i=index.getX(f*3+k);centers[f*3]+=rest.getX(i)/3;centers[f*3+1]+=rest.getY(i)/3;centers[f*3+2]+=rest.getZ(i)/3;}facts={centers};sourceFacts.set(restGeometry,facts);}
 const bvh=new MeshBVH(geometry,{indirect:true,maxLeafTris}),seen=new Set(),groups={},examples=[],samples=new Map(),sourceBands={},faceCount=index.count/3;
 let total=0,callbacks=0;
 bvh.bvhcast(bvh,new T.Matrix4(),{intersectsTriangles:(ta,tb,i,j)=>{
  callbacks++;const ai=bvh.resolveTriangleIndex(i),bi=bvh.resolveTriangleIndex(j);
  if(ai===bi)return false;
  const ca=ai*3,cb=bi*3,centers=facts.centers,dx=centers[ca]-centers[cb],dy=centers[ca+1]-centers[cb+1],dz=centers[ca+2]-centers[cb+2];
  if(dx*dx+dy*dy+dz*dz<minimumSourceSeparation*minimumSourceSeparation)return false;
  const a0=index.getX(ca),a1=index.getX(ca+1),a2=index.getX(ca+2),b0=index.getX(cb),b1=index.getX(cb+1),b2=index.getX(cb+2);
  if(a0===b0||a0===b1||a0===b2||a1===b0||a1===b1||a1===b2||a2===b0||a2===b1||a2===b2||(!ta.intersectsTriangle(tb,null,true)&&!tb.intersectsTriangle(ta,null,true)))return false;
  // BVH traversal may report an unordered pair in either direction. Do not
  // discard one direction by assuming the source face numbers are sorted.
  const key=Math.min(ai,bi)*faceCount+Math.max(ai,bi);if(seen.has(key))return false;
  const a=[a0,a1,a2],b=[b0,b1,b2];
  const ra=new ExtendedTriangle(...a.map(v=>new T.Vector3().fromBufferAttribute(rest,v))),rb=new ExtendedTriangle(...b.map(v=>new T.Vector3().fromBufferAttribute(rest,v)));
  if(ra.getMidpoint(new T.Vector3()).distanceTo(rb.getMidpoint(new T.Vector3()))<minimumSourceSeparation||ra.intersectsTriangle(rb,null,true)||rb.intersectsTriangle(ra,null,true))return false;
  seen.add(key);total++;const pair=[regionFor(a),regionFor(b)].sort().join('|');groups[pair]=(groups[pair]||0)+1;if(pair==='body|body'){const band=(centers[ca+1]+centers[cb+1])/2>.10?'upper-body':'pelvis';sourceBands[band]=(sourceBands[band]||0)+1;}
  if((samples.get(pair)||0)<examplesPerGroup){samples.set(pair,(samples.get(pair)||0)+1);examples.push({pair,faces:[ai,bi],vertices:[a,b],rest:[ra.a.toArray(),ra.b.toArray(),ra.c.toArray(),rb.a.toArray(),rb.b.toArray(),rb.c.toArray()],posed:[ta.a.toArray(),ta.b.toArray(),ta.c.toArray(),tb.a.toArray(),tb.b.toArray(),tb.c.toArray()]});}
  return false;
 }});
 geometry.dispose();return {triangles:faceCount,newIntersectionFacePairs:total,groups,sourceBands,examples,callbacks};
}
