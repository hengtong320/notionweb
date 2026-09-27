import * as THREE from 'three';
import {MeshBVH} from 'three-mesh-bvh';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
// A display binding, not a clinical registration. Original reference coordinates
// remain immutable; every body has its own surface BVH and display cache.
export function createSkinProjector(meshes,{sex='male',templateMeshes=[]}={}){
 const makeGeometry=ns=>{const gs=ns.map(n=>{n.updateWorldMatrix(true,false);const g=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone();const p=new THREE.BufferGeometry();p.setAttribute('position',g.attributes.position.clone());p.applyMatrix4(n.matrixWorld);g.dispose();return p;});const out=mergeGeometries(gs,false);gs.forEach(g=>g.dispose());if(!out)throw Error('没有体表几何');out.computeVertexNormals();out.computeBoundingBox();return out;};
 const geometry=makeGeometry(meshes),bvh=new MeshBVH(geometry,{maxLeafTris:12}),box=geometry.boundingBox.clone();
 const template=sex==='female'?makeGeometry(templateMeshes):geometry,sourceBox=template.boundingBox.clone(),sourceMid=(sourceBox.min.x+sourceBox.max.x)/2,mid=(box.min.x+box.max.x)/2;
 const slices=new Map(),sourcePos=template.attributes.position,targetPos=geometry.attributes.position;
 const toV=(a,i)=>new THREE.Vector3(a.getX(i),a.getY(i),a.getZ(i));
 function sliceAt(a,y,part,side,center){
  const key=(a===sourcePos?'s':'t')+'|'+y+'|'+part+'|'+side;if(slices.has(key))return slices.get(key);
  let vs=[];for(let i=0;i<a.count;i++)if(Math.abs(a.getY(i)-y)<12)vs.push([a.getX(i),a.getZ(i)]);
  if(vs.length<12){slices.set(key,null);return null;}vs.sort((a,b)=>a[0]-b[0]);const groups=[[]];
  for(const v of vs){const g=groups.at(-1);if(g.length&&v[0]-g.at(-1)[0]>23)groups.push([]);groups.at(-1).push(v);}
  const good=groups.filter(g=>g.length>8),central=good.find(g=>g[0][0]<=center&&g.at(-1)[0]>=center)||good[Math.floor(good.length/2)];let chosen=vs;
  if(part==='arm'){
   // Several separate digit islands belong to ONE hand. Selecting the extreme
   // island alone scales other fingertips far outside the hand (onto the thigh).
   const arm=good.filter(g=>g!==central&&(side==='left'?g[0][0]>center:g.at(-1)[0]<center)).flat();
   if(arm.length>=8)chosen=arm;else chosen=vs.filter(v=>side==='left'?v[0]>center+125:v[0]<center-125);
  }else if(part==='body'&&central)chosen=central;
  else if(part==='leg')chosen=vs.filter(v=>side==='left'?v[0]>center:v[0]<center);
  if(chosen.length<8){slices.set(key,null);return null;}
  const b={minX:Math.min(...chosen.map(v=>v[0])),maxX:Math.max(...chosen.map(v=>v[0])),minZ:Math.min(...chosen.map(v=>v[1])),maxZ:Math.max(...chosen.map(v=>v[1]))};slices.set(key,b);return b;
 }
 function slice(a,y,part,side,center){const low=Math.floor(y/8)*8,t=(y-low)/8,p=sliceAt(a,low,part,side,center),q=sliceAt(a,low+8,part,side,center);if(!p||!q)return p||q;return Object.fromEntries(Object.keys(p).map(k=>[k,p[k]+(q[k]-p[k])*t]));}
 function region(v,c={}){if(c.region)return c.region;const x=Math.abs(v.x-99.553);if(x>165&&v.y<815&&v.y>600)return'hand';if(x>145&&v.y>=815&&v.y<1045)return'forearm';if(x>143&&v.y>=1045&&v.y<1340)return'upper';if(v.y>1450)return'head';if(v.y>1370)return'neck';if(v.y<150)return'foot';if(v.y<580)return'leg';if(v.y<790)return'thigh';return'body';}
 const yKeys=[[620,715],[650,748],[780,862],[810,891],[1040,1045],[1300,1300],[1370,1350]];
 function armY(y){for(let i=1;i<yKeys.length;i++)if(y<=yKeys[i][0]){const[a,b]=yKeys[i-1],[c,d]=yKeys[i];return b+(y-a)*(d-b)/(c-a);}return y-20;}
 function mapSource(v,c={}){if(sex==='male')return v.clone();const r=region(v,c),arm=['hand','forearm','wrist','upper','elbow'].includes(r),leg=['foot','leg','thigh'].includes(r),part=arm?'arm':leg?'leg':'body';const u=(v.y-sourceBox.min.y)/(sourceBox.max.y-sourceBox.min.y),y=arm?armY(v.y):box.min.y+u*(box.max.y-box.min.y),s=slice(sourcePos,v.y,part,c.side,sourceMid),t=slice(targetPos,y,part,c.side,mid);let x=mid+(v.x-sourceMid)*.97,z=-58+(v.z+20)*.97;
  if(s&&t&&s.maxX-s.minX>4&&s.maxZ-s.minZ>4){x=t.minX+(v.x-s.minX)*(t.maxX-t.minX)/(s.maxX-s.minX);z=t.minZ+(v.z-s.minZ)*(t.maxZ-t.minZ)/(s.maxZ-s.minZ);}
  return new THREE.Vector3(x,y,z);}
 function direction(v,c={}){const r=region(v,c),m=c.meridian,right=c.side!=='left';if(r==='hand'&&m==='LI')return sex==='female'?new THREE.Vector3(0,0,-1):new THREE.Vector3(right?-.68714:.68714,.02151,-.7262).normalize();if(['hand','forearm','wrist','upper','elbow'].includes(r)){if(['LI','TE','SI'].includes(m))return new THREE.Vector3(0,0,-1);if(['LU','HT','PC'].includes(m))return new THREE.Vector3(0,0,1);}if(m==='GV'&&v.y>1530)return new THREE.Vector3(0,Math.max(0,(v.y-1530)/135),(v.z+35)/92).normalize();if(m==='GV')return new THREE.Vector3(0,0,v.y>1460&&v.z>0?1:-1);if(m==='BL'&&v.y<1440)return new THREE.Vector3(0,0,-1);if(c.view){const d=new THREE.Vector3(...c.view);if(c.side==='left')d.x*=-1;return d.normalize();}if(m==='SI'||m==='TE')return new THREE.Vector3(0,0,v.y>1470?1:-1);if(m==='GB')return new THREE.Vector3(right?-1:1,0,.1).normalize();if(m==='KI'&&v.y<80)return new THREE.Vector3(0,-1,0);if(['KI','SP','LR'].includes(m)&&v.y<780)return new THREE.Vector3(right?1:-1,0,.15).normalize();return new THREE.Vector3(0,0,1);}
 let calls=0,fallbacks=0,maxShift=0;const memo=new Map();
 const faceNormal=(hit,aim)=>{const idx=geometry.index,a=geometry.attributes.position,i=hit.faceIndex*3;const va=toV(a,idx.getX(i)),vb=toV(a,idx.getX(i+1)),vc=toV(a,idx.getX(i+2)),n=vb.sub(va).cross(vc.sub(va)).normalize();if(n.dot(aim)<0)n.negate();return n;};
 function solve(world,d,c={}){const origin=world.clone().addScaledVector(d,220),ray=new THREE.Ray(origin,d.clone().negate());let hits=bvh.raycast(ray,THREE.DoubleSide).filter(h=>h.point.distanceTo(world)<190&&(c.side==='midline'||!c.side||(c.side==='right'?h.point.x<mid+4:h.point.x>mid-4)));hits.sort((a,b)=>a.distance-b.distance);let hit=hits[0];if(!hit){fallbacks++;const near=bvh.closestPointToPoint(world);if(!near)throw Error('体表投影失败');hit=near;const n=faceNormal(hit,d),outer=bvh.raycastFirst(new THREE.Ray(hit.point.clone().addScaledVector(n,24),n.clone().negate()),THREE.DoubleSide);if(outer&&outer.point.distanceTo(hit.point)<24)hit=outer;d=n;}const normal=faceNormal(hit,d);return {point:hit.point.clone().addScaledVector(normal,2.4),skin:hit.point.clone(),normal};}
 function sample(v,c={}){const key=v.toArray().map(x=>x.toFixed(4)).join(',')+'|'+c.meridian+'|'+c.side+'|'+c.region+'|'+(c.view||[]).join(',');if(memo.has(key))return memo.get(key);calls++;const world=mapSource(v,c),s=solve(world,direction(v,c),c);maxShift=Math.max(maxShift,s.point.distanceTo(world));memo.set(key,s);return s;}
 function project(v,offset=2.4,c={}){return sample(v,c).point.clone();}
 function tube(points,normals,connections){const sides=10,p=[],n=[],ind=[];for(let i=0;i<points.length;i++){let tangent=points[Math.min(points.length-1,i+1)].clone().sub(points[Math.max(0,i-1)]).normalize(),s=tangent.clone().cross(normals[i]);if(s.lengthSq()<1e-7)s=tangent.clone().cross(new THREE.Vector3(0,1,0));if(s.lengthSq()<1e-7)s.set(1,0,0);s.normalize();const up=tangent.clone().cross(s).normalize();for(let k=0;k<sides;k++){const a=2*Math.PI*k/sides,normal=s.clone().multiplyScalar(Math.cos(a)).addScaledVector(up,Math.sin(a));p.push(...points[i].clone().addScaledVector(normal,.85).toArray());n.push(...normal.toArray());if(i&&connections[i]){const a=(i-1)*sides+k,b=(i-1)*sides+(k+1)%sides,c=i*sides+k,d=i*sides+(k+1)%sides;ind.push(a,c,b,b,c,d);}}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(n,3));g.setIndex(ind);g.computeBoundingSphere();return g;}

 function curve(source,context={}){
  const c=new THREE.CatmullRomCurve3(source.map(v=>v.clone()),false,'centripetal'),count=Math.max(24,Math.min(3600,Math.ceil(c.getLength()/2.5))),initial=c.getSpacedPoints(count),events=initial.map((source,i)=>({source,order:i,anchor:null}));
  for(const a of context.anchors||[]){let best=null,d=Infinity;for(let i=1;i<initial.length;i++){const line=new THREE.Line3(initial[i-1],initial[i]),q=line.closestPointToPoint(a.source,true,new THREE.Vector3()),dist=q.distanceToSquared(a.source);if(dist<d){d=dist;best=i-1+line.closestPointToPointParameter(a.source,true);}}if(best!==null&&d<144)events.push({source:a.source.clone(),order:best,anchor:a});}
  events.sort((a,b)=>a.order-b.order||Number(!!b.anchor)-Number(!!a.anchor));const clean=[];
  for(const e of events){if(!clean.length||e.source.distanceToSquared(clean.at(-1).source)>1e-9)clean.push(e);else if(e.anchor)clean[clean.length-1]=e;}
  // Interstitial samples inherit the nearby actual landmark's body region.
  // A generic world-X threshold confuses the female forearm with the trunk.
  const anchored=clean.filter(e=>e.anchor),raw=[];
  for(const e of clean){let a=e.anchor;if(!a&&anchored.length){let near=anchored[0];for(const q of anchored)if(Math.abs(q.order-e.order)<Math.abs(near.order-e.order))near=q;a=near.anchor;}
   const ctx=a?{...context,region:a.region,view:a.view}:context,h=sample(e.source,ctx);raw.push({source:e.source,point:h.point.clone(),normal:h.normal.clone(),anchor:!!e.anchor});}
  const nearest=(v,aim)=>{const h=bvh.closestPointToPoint(v);if(!h)return null;const normal=faceNormal(h,aim);return {point:h.point.clone().addScaledVector(normal,2.4),normal};};
  const distance=v=>bvh.closestPointToPoint(v)?.distance??Infinity;
  const gap=(a,b)=>Math.max(distance(a.point.clone().lerp(b.point,.25)),distance(a.point.clone().lerp(b.point,.5)),distance(a.point.clone().lerp(b.point,.75)));
  // Trace local curvature only. Never connect across air between a limb and
  // the trunk, between fingers, or between the two legs merely to close a line.
  function trace(a,b,depth=0){const len=a.point.distanceTo(b.point),g=gap(a,b);if(len<=6&&g<=3.3)return [a,b];if(depth>=8)return null;
   const mid=a.point.clone().lerp(b.point,.5);if(distance(mid)>10)return null;
   let aim=a.normal.clone().add(b.normal);if(aim.lengthSq()<1e-8)aim.copy(a.normal);aim.normalize();const m=nearest(mid,aim);if(!m||m.point.distanceTo(a.point)<1e-5||m.point.distanceTo(b.point)<1e-5)return null;
   const left=trace(a,m,depth+1);if(!left)return null;const right=trace(m,b,depth+1);return right?[...left,...right.slice(1)]:null;}
  const points=[],normals=[],samples=[],connections=[],segmentPositions=[];let rejected=0,retraced=0,maxGap=0;
  function append(h,src,connected){if(points.length&&points.at(-1).distanceToSquared(h.point)<1e-10)return;points.push(h.point.clone());normals.push(h.normal.clone());samples.push({source:src.clone(),point:h.point.clone()});connections.push(!!connected);}
  append(raw[0],raw[0].source,false);
  for(let i=1;i<raw.length;i++){const a=raw[i-1],b=raw[i],chain=trace(a,b);if(!chain){rejected++;append(b,b.source,false);continue;}if(chain.length>2)retraced++;
   for(let j=1;j<chain.length;j++){maxGap=Math.max(maxGap,gap(chain[j-1],chain[j]));append(chain[j],a.source.clone().lerp(b.source,j/(chain.length-1)),true);}}
  for(let i=1;i<points.length;i++)if(connections[i])segmentPositions.push(...points[i-1].toArray(),...points[i].toArray());
  if(points.length<2||!segmentPositions.length)throw Error('无有效贴肤曲线');
  return {geometry:tube(points,normals,connections),points,samples,connections,segmentPositions,anchorCount:clean.filter(e=>e.anchor).length,traceDiagnostics:{drawnSegments:segmentPositions.length/6,retracedTransitions:retraced,disconnectedTransitions:rejected,maxDrawnSurfaceGap:maxGap,clinicalCalibration:false}};
 }
 function isVisible(v,cp){const d=v.clone().sub(cp),distance=d.length(),hit=bvh.raycastFirst(new THREE.Ray(cp,d.normalize()),THREE.DoubleSide);return !hit||hit.distance>=distance-.25;}
 return {key:sex+'-skin-v17',sex,project,curve,mapSource,isVisible,stats:()=>({version:17,sex,method:sex==='female'?'body-and-limb proportional illustrative transfer onto independent female skin':'outer-skin normal projection',clinicalCalibration:false,calls,fallbacks,maxShift}),auditPoint:(p)=>{const h=bvh.closestPointToPoint(p);return {distance:h?.distance??null};},dispose:()=>{geometry.dispose();if(template!==geometry)template.dispose();}};
}

export {createSkinProjector as createSurfaceProjector};
