import {repairDigitPaths} from './surface-path-v25.js';
import {createSagittalContact} from './midline-v24.js';
import {FEMALE_FINGER_LANDMARKS} from './female-fingers-v24.js';
import {skinRouteSamples,relaxSkinSamples} from './skin-route-v24.js';
import {createSkinInk} from './skin-ink-v24.js';
import HAND_ROUTE from './female-hand-route-v18.json';
import FEMALE_LOCAL from './female-local-v18.json';
import * as THREE from 'three';
import {MeshBVH} from 'three-mesh-bvh';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
// A display binding, not a clinical registration. Original reference coordinates
// remain immutable; every body has its own surface BVH and display cache.
export function createSkinProjector(meshes,{sex='male',templateMeshes=[],standardized=false}={}){
 const makeGeometry=ns=>{const gs=ns.map(n=>{n.updateWorldMatrix(true,false);const g=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone();const p=new THREE.BufferGeometry();p.setAttribute('position',g.attributes.position.clone());p.applyMatrix4(n.matrixWorld);
 if(n.matrixWorld.determinant()<0){const a=p.attributes.position.array;for(let i=0;i<a.length;i+=9){for(let k=0;k<3;k++){const t=a[i+3+k];a[i+3+k]=a[i+6+k];a[i+6+k]=t;}}p.attributes.position.needsUpdate=true;}
 g.dispose();return p;});const out=mergeGeometries(gs,false);gs.forEach(g=>g.dispose());if(!out)throw Error('没有体表几何');out.computeVertexNormals();out.computeBoundingBox();return out;};
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
 function mapSource(v,c={}){if(sex==='female'&&standardized&&FEMALE_LOCAL[c.code]?.[c.side])return new THREE.Vector3(...FEMALE_LOCAL[c.code][c.side].position);if(sex==='male'||standardized)return v.clone();const r=region(v,c),arm=['hand','forearm','wrist','upper','elbow'].includes(r),leg=['foot','leg','thigh'].includes(r),part=arm?'arm':leg?'leg':'body';const u=(v.y-sourceBox.min.y)/(sourceBox.max.y-sourceBox.min.y),y=arm?armY(v.y):box.min.y+u*(box.max.y-box.min.y),s=slice(sourcePos,v.y,part,c.side,sourceMid),t=slice(targetPos,y,part,c.side,mid);let x=mid+(v.x-sourceMid)*.97,z=-58+(v.z+20)*.97;
  if(s&&t&&s.maxX-s.minX>4&&s.maxZ-s.minZ>4){x=t.minX+(v.x-s.minX)*(t.maxX-t.minX)/(s.maxX-s.minX);z=t.minZ+(v.z-s.minZ)*(t.maxZ-t.minZ)/(s.maxZ-s.minZ);}
  return new THREE.Vector3(x,y,z);}
 function direction(v,c={}){if(c.projectionNormal){const d=new THREE.Vector3(...c.projectionNormal);if(c.side==='left')d.x*=-1;return d.normalize();}const r=region(v,c),m=c.meridian,right=c.side!=='left';if(r==='hand'&&m==='LI')return sex==='female'?new THREE.Vector3(0,0,-1):new THREE.Vector3(right?-.68714:.68714,.02151,-.7262).normalize();if(['hand','forearm','wrist','upper','elbow'].includes(r)){if(['LI','TE','SI'].includes(m))return new THREE.Vector3(0,0,-1);if(['LU','HT','PC'].includes(m))return new THREE.Vector3(0,0,1);}if(m==='GV'&&v.y>1530)return new THREE.Vector3(0,Math.max(0,(v.y-1530)/135),(v.z+35)/92).normalize();if(m==='GV')return new THREE.Vector3(0,0,v.y>1460&&v.z>0?1:-1);if(m==='BL'&&v.y<1440&&r!=='foot')return new THREE.Vector3(0,0,-1);if(c.view){const d=new THREE.Vector3(...c.view);if(c.side==='left')d.x*=-1;return d.normalize();}if(m==='SI'||m==='TE')return new THREE.Vector3(0,0,v.y>1470?1:-1);if(m==='GB')return new THREE.Vector3(right?-1:1,0,.1).normalize();if(m==='KI'&&v.y<80)return new THREE.Vector3(0,-1,0);if(['KI','SP','LR'].includes(m)&&v.y<780)return new THREE.Vector3(right?1:-1,0,.15).normalize();return new THREE.Vector3(0,0,1);}
 let calls=0,fallbacks=0,maxShift=0;const memo=new Map();
 const faceNormal=(hit,aim)=>{const idx=geometry.index,a=geometry.attributes.position,i=hit.faceIndex*3;const va=toV(a,idx.getX(i)),vb=toV(a,idx.getX(i+1)),vc=toV(a,idx.getX(i+2)),n=vb.sub(va).cross(vc.sub(va)).normalize();if(n.dot(aim)<0)n.negate();return n;};
 const sagittalNearest=createSagittalContact(geometry,bvh,faceNormal);
 function solve(world,d,c={}){const origin=world.clone().addScaledVector(d,220),ray=new THREE.Ray(origin,d.clone().negate());let hits=bvh.raycast(ray,THREE.DoubleSide).filter(h=>h.point.distanceTo(world)<(c.region==='hand'?45:c.region==='foot'?65:190)&&(c.side==='midline'||!c.side||(c.side==='right'?h.point.x<mid+4:h.point.x>mid-4)));if(c.side==='midline'){for(const dx of [-.02,.02]){const o=origin.clone();o.x+=dx;hits.push(...bvh.raycast(new THREE.Ray(o,d.clone().negate()),THREE.DoubleSide).filter(h=>h.point.distanceTo(world)<190));}}if(c.side==='midline'&&!hits.length){const tangent=new THREE.Vector3(0,-d.z,d.y).normalize();for(const dx of [-.02,.02])for(const dt of [-.5,.5]){const o=origin.clone().addScaledVector(tangent,dt);o.x+=dx;hits.push(...bvh.raycast(new THREE.Ray(o,d.clone().negate()),THREE.DoubleSide).filter(h=>h.point.distanceTo(world)<190));}}const local=['hand','foot'].includes(c.region);const palmar=c.region==='hand'&&['PC','HT','LU'].includes(c.meridian)&&d.z>.6&&Math.abs(d.y)<.35;hits.sort((a,b)=>a.distance-b.distance);let hit=hits[0];if(hits.length&&['abdomen','pelvis','thigh'].includes(c.region)){hits.sort((a,b)=>a.point.distanceToSquared(world)-b.point.distanceToSquared(world));const near=hits[0];hit=hits.filter(h=>h.point.distanceTo(near.point)<8).sort((a,b)=>b.point.dot(d)-a.point.dot(d))[0];const closest=bvh.closestPointToPoint(world);if(closest&&hit.point.distanceTo(world)>Math.max(65,closest.distance*2+15))hit=null;}if(!hit&&c.side==='midline'){fallbacks++;return sagittalNearest(world,d);}if(!hit){fallbacks++;const near=bvh.closestPointToPoint(world);if(!near)throw Error('体表投影失败');hit=near;const n=faceNormal(hit,d),outer=bvh.raycastFirst(new THREE.Ray(hit.point.clone().addScaledVector(n,24),n.clone().negate()),THREE.DoubleSide);if(outer&&outer.point.distanceTo(hit.point)<24)hit=outer;d=n;}const normal=faceNormal(hit,d);return {point:hit.point.clone().addScaledVector(normal,.35),skin:hit.point.clone(),normal};}
 function sample(v,c={}){const key=v.toArray().map(x=>x.toFixed(4)).join(',')+'|'+c.meridian+'|'+c.side+'|'+c.region+'|'+(c.view||[]).join(',')+'|'+(c.projectionNormal||[]).join(',')+'|'+(c.code||'');if(memo.has(key))return memo.get(key);calls++;const world=mapSource(v,c),finger=sex==='female'&&standardized?FEMALE_FINGER_LANDMARKS[c.code]?.[c.side]:null,s=finger?{skin:new THREE.Vector3(...finger.position),point:new THREE.Vector3(...finger.position).addScaledVector(new THREE.Vector3(...finger.normal).normalize(),.35),normal:new THREE.Vector3(...finger.normal).normalize()}:solve(world,direction(v,c),c);maxShift=Math.max(maxShift,s.point.distanceTo(world));memo.set(key,s);return s;}
 function project(v,offset=.35,c={}){return sample(v,c).point.clone();}
 function tube(points,normals,connections){const sides=10,p=[],n=[],ind=[];for(let i=0;i<points.length;i++){let tangent=points[Math.min(points.length-1,i+1)].clone().sub(points[Math.max(0,i-1)]).normalize(),s=tangent.clone().cross(normals[i]);if(s.lengthSq()<1e-7)s=tangent.clone().cross(new THREE.Vector3(0,1,0));if(s.lengthSq()<1e-7)s.set(1,0,0);s.normalize();const up=tangent.clone().cross(s).normalize();for(let k=0;k<sides;k++){const a=2*Math.PI*k/sides,normal=s.clone().multiplyScalar(Math.cos(a)).addScaledVector(up,Math.sin(a));p.push(...points[i].clone().addScaledVector(normal,.85).toArray());n.push(...normal.toArray());if(i&&connections[i]){const a=(i-1)*sides+k,b=(i-1)*sides+(k+1)%sides,c=i*sides+k,d=i*sides+(k+1)%sides;ind.push(a,c,b,b,c,d);}}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(n,3));g.setIndex(ind);g.computeBoundingSphere();return g;}

 function curve(source,context={}){
  if(source.length<2)throw Error('线路至少需要两个锚点');
  const anchors=context.anchors||[];
  function projectNear(v,aim){let h=bvh.closestPointToPoint(v);if(!h)return null;const d=aim.clone().normalize();const outer=bvh.raycastFirst(new THREE.Ray(h.point.clone().addScaledVector(d,12),d.clone().negate()),THREE.DoubleSide);if(outer&&outer.point.distanceTo(h.point)<8)h=outer;const normal=faceNormal(h,d);return {point:h.point.clone().addScaledVector(normal,.35),normal};}
  if(context.side==='midline'){
   projectNear=(v,aim)=>{const seed=v.clone();seed.x=99.55318156;const d=context.meridian==='CV'?new THREE.Vector3(0,0,1):direction(seed,{meridian:'GV',side:'midline'});return sagittalNearest(seed,d);};
  }
  const raw=skinRouteSamples(source,context,{sample,nearest:projectNear});
  // A triangle-adjacency path keeps the female fourth-finger transition on
  // the actual hand, instead of crossing an inter-finger air gap. Model
  // geometry continuity is not clinical verification of the meridian.
  if(sex==='female'&&standardized&&context.meridian==='TE'&&context.side==='right'){
   const a=anchors.find(a=>a.code==='TE1'),b=anchors.find(a=>a.code==='TE2'),path=HAND_ROUTE.paths['TE1:TE2:right'];
   if(a&&b&&path&&new THREE.Vector3(...path[0]).distanceTo(a.point)<3&&new THREE.Vector3(...path.at(-1)).distanceTo(b.point)<3){const i=raw.findIndex(r=>r.anchor&&r.source.distanceToSquared(a.source)<1e-8),j=raw.findIndex(r=>r.anchor&&r.source.distanceToSquared(b.source)<1e-8);
    if(i>=0&&j>i){const normals=geometry.attributes.normal,mid=path.map((p,k)=>{const v=new THREE.Vector3(...p),h=bvh.closestPointToPoint(v),aim=toV(normals,geometry.index.getX(h.faceIndex*3)),normal=faceNormal(h,aim);return {source:a.source.clone().lerp(b.source,(k+1)/(path.length+1)),point:h.point.clone().addScaledVector(normal,.35),normal,anchor:false};});raw.splice(i,j-i+1,raw[i],...mid,raw[j]);}
   }
  }
  const contact=(v,aim)=>{const h=bvh.closestPointToPoint(v);if(!h)return null;const normal=faceNormal(h,aim);return {point:h.point.clone().addScaledVector(normal,.35),normal};};
  const digitRepair=repairDigitPaths(raw,geometry,bvh,context,projectNear,contact);
  const fairing=relaxSkinSamples(raw,projectNear);
  const nearest=projectNear;
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
  return {geometry:tube(points,normals,connections),points,samples,connections,segmentPositions,anchorCount:anchors.length,traceDiagnostics:{...fairing,digitRepair,sourceKnotCount:source.length,drawnSegments:segmentPositions.length/6,retracedTransitions:retraced,disconnectedTransitions:rejected,maxDrawnSurfaceGap:maxGap,clinicalCalibration:false}};
 }
 function isVisible(v,cp){const d=v.clone().sub(cp),distance=d.length(),hit=bvh.raycastFirst(new THREE.Ray(cp,d.normalize()),THREE.DoubleSide);return !hit||hit.distance>=distance-.25;}
 function visibleDirection(point,preferred){
  const first=new THREE.Vector3(...preferred).normalize(),check=d=>[180,600,1800].every(distance=>isVisible(point,point.clone().addScaledVector(d,distance)));
  if(check(first))return first.toArray();
  const choices=[],contact=bvh.closestPointToPoint(point);
  if(contact){const n=faceNormal(contact,point.clone().sub(contact.point));choices.push(n,n.clone().add(first).normalize());}
  for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)if(x||y||z)choices.push(new THREE.Vector3(x,y,z).normalize());
  choices.sort((a,b)=>b.dot(first)-a.dot(first));return (choices.find(check)||first).toArray();
 }
 const hasVisibleSkin=()=>meshes.some(n=>{for(let q=n;q;q=q.parent)if(!q.visible)return false;return n.material.opacity>.02;});
 return {hasVisibleSkin,createInk:(guides,points,color)=>createSkinInk(geometry,bvh,guides,points,color),key:sex+'-skin-v28-outer-contact'+(standardized?'-common-frame':''),sex,project,curve,mapSource,isVisible,visibleDirection,stats:()=>({version:18,sex,standardized,method:standardized?'common teaching proportions with body-specific skin, not clinical registration':sex==='female'?'body-and-limb proportional illustrative transfer onto independent female skin':'outer-skin normal projection',clinicalCalibration:false,calls,fallbacks,maxShift}),auditPoint:(p)=>{const h=bvh.closestPointToPoint(p);return {distance:h?.distance??null};},dispose:()=>{geometry.dispose();if(template!==geometry)template.dispose();}};
}

export {createSkinProjector as createSurfaceProjector};
