import * as THREE from 'three';
import {MeshBVH} from 'three-mesh-bvh';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// A visual projection onto the same-source regional body surface. This is NOT
// a clinical registration or a measurement of acupuncture-coordinate accuracy.
export function createSurfaceProjector(meshes,boneCentres){
 const geometries=[];
 for(const mesh of meshes){
  mesh.updateWorldMatrix(true,false);
  const input=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();
  const g=new THREE.BufferGeometry();g.setAttribute('position',input.getAttribute('position').clone());
  if(input.getAttribute('normal'))g.setAttribute('normal',input.getAttribute('normal').clone());
  g.applyMatrix4(mesh.matrixWorld);if(!g.getAttribute('normal'))g.computeVertexNormals();
  geometries.push(g);input.dispose();
 }
 if(!geometries.length)throw Error('没有可用的同源体表参照');
 const combined=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());
 const positions=combined.attributes.position,normals=combined.attributes.normal,keptPositions=[],keptNormals=[];
 const centre=new THREE.Vector3(),n=new THREE.Vector3(),near=new THREE.Vector3(),v=new THREE.Vector3();let excludedInnerTriangles=0;
 for(let i=0;i<positions.count;i+=3){centre.set(0,0,0);n.set(0,0,0);for(let j=0;j<3;j++){centre.add(v.fromBufferAttribute(positions,i+j));n.add(v.fromBufferAttribute(normals,i+j));}centre.multiplyScalar(1/3);n.normalize();let best=Infinity;for(const c of boneCentres){const d=centre.distanceToSquared(c);if(d<best){best=d;near.copy(c);}}
  if(n.dot(v.subVectors(centre,near))<=0){excludedInnerTriangles++;continue;}
  for(let j=0;j<3;j++){keptPositions.push(positions.getX(i+j),positions.getY(i+j),positions.getZ(i+j));keptNormals.push(normals.getX(i+j),normals.getY(i+j),normals.getZ(i+j));}}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(keptPositions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(keptNormals,3));combined.dispose();

 const bvh=new MeshBVH(geometry,{maxLeafTris:12});
 const pos=geometry.attributes.position,norm=geometry.attributes.normal;
 const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),bc=new THREE.Vector3(),normal=new THREE.Vector3(),na=new THREE.Vector3(),nb=new THREE.Vector3(),nc=new THREE.Vector3();
 let calls=0,maxSourceDistance=0;
 function project(v,offset=3.8){
  const hit=bvh.closestPointToPoint(v);if(!hit||!Number.isFinite(hit.distance))throw Error('体表参照投影失败');
  const i=hit.faceIndex*3,idx=geometry.index;const ia=idx?idx.getX(i):i,ib=idx?idx.getX(i+1):i+1,ic=idx?idx.getX(i+2):i+2;
  a.fromBufferAttribute(pos,ia);b.fromBufferAttribute(pos,ib);c.fromBufferAttribute(pos,ic);
  THREE.Triangle.getBarycoord(hit.point,a,b,c,bc);
  na.fromBufferAttribute(norm,ia);nb.fromBufferAttribute(norm,ib);nc.fromBufferAttribute(norm,ic);
  normal.copy(na).multiplyScalar(bc.x).addScaledVector(nb,bc.y).addScaledVector(nc,bc.z).normalize();
  if(!normal.lengthSq())normal.subVectors(v,hit.point).normalize();
  calls++;maxSourceDistance=Math.max(maxSourceDistance,hit.distance);
  return hit.point.clone().addScaledVector(normal,offset);
 }
 function curve(source){
  const original=new THREE.CatmullRomCurve3(source.map(v=>v.clone()),false,'centripetal');
  const count=Math.max(24,Math.min(2400,Math.ceil(original.getLength()/3)));
  let points=original.getSpacedPoints(count).map(v=>project(v,3.8));
  // Smooth along the surface, then project back. No clinical/source record changes.
  for(let pass=0;pass<3;pass++)points=points.map((v,i)=>i===0||i===points.length-1?v.clone():project(v.clone().multiplyScalar(.5).addScaledVector(points[i-1],.25).addScaledVector(points[i+1],.25),3.8));
  const base=new THREE.CatmullRomCurve3(points,false,'centripetal');
  class SurfaceCurve extends THREE.Curve {getPoint(t,target=new THREE.Vector3()){return target.copy(project(base.getPoint(t),3.8));}}
  const routed=new SurfaceCurve();routed.arcLengthDivisions=Math.max(200,count);
  const geo=new THREE.TubeGeometry(routed,count,1.9,12,false);
  const sampled=Array.from({length:count+1},(_,i)=>routed.getPoint(i/count));
  return {geometry:geo,points:sampled};
 }
 function isVisible(v,cameraPosition){const delta=v.clone().sub(cameraPosition),distance=delta.length();const hit=bvh.raycastFirst(new THREE.Ray(cameraPosition,delta.normalize()),THREE.DoubleSide);return !hit||hit.distance>=distance-1.5;}
 return {project,curve,isVisible,stats:()=>({excludedInnerTriangles,surfaceTriangles:(geometry.index?.count||pos.count)/3,calls,maxSourceDistance,coordinateCalibration:false,method:'display-only nearest regional surface; smooth then reproject'}),dispose:()=>geometry.dispose()};
}
