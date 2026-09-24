/* Graphical interpolation only. Control points and model transforms are not relocated. */
export function smoothGuidePath(THREE, input, maxHandle=10) {
 const anchors=[];
 for(const p of input){if(!p||!Number.isFinite(p.x+p.y+p.z))throw Error('Invalid route anchor');if(!anchors.length||anchors.at(-1).distanceToSquared(p)>1e-8)anchors.push(p.clone());}
 if(anchors.length<2)return {points:anchors,diagnostics:{anchors:anchors.length,segments:0,maxDeviation:0,joinTangentError:0}};
 const tangents=anchors.map((p,i)=>{
  if(i===0)return anchors[1].clone().sub(p).normalize().multiplyScalar(Math.min(maxHandle,p.distanceTo(anchors[1])*.28));
  if(i===anchors.length-1)return p.clone().sub(anchors[i-1]).normalize().multiplyScalar(Math.min(maxHandle,p.distanceTo(anchors[i-1])*.28));
  const a=p.clone().sub(anchors[i-1]),b=anchors[i+1].clone().sub(p),la=a.length(),lb=b.length();
  // Shared direction AND length at every knot: cubic joins have matching first derivatives.
  const t=a.multiplyScalar(1/la).add(b.multiplyScalar(1/lb));
  if(t.lengthSq()<1e-9)return new THREE.Vector3();
  return t.normalize().multiplyScalar(Math.min(maxHandle,Math.min(la,lb)*.28));
 });
 const points=[],segments=[];let maxDeviation=0,curved=0;
 for(let i=0;i<anchors.length-1;i++){
  const a=anchors[i],b=anchors[i+1],c1=a.clone().add(tangents[i]),c2=b.clone().sub(tangents[i+1]);
  const curve=new THREE.CubicBezierCurve3(a,c1,c2,b),chord=new THREE.Line3(a,b);
  const steps=Math.max(16,Math.min(240,Math.ceil((a.distanceTo(c1)+c1.distanceTo(c2)+c2.distanceTo(b))/2)));
  let dev=0;
  for(let j=0;j<steps;j++){const p=curve.getPoint(j/steps);points.push(p);dev=Math.max(dev,p.distanceTo(chord.closestPointToPoint(p,true,new THREE.Vector3())));}
  maxDeviation=Math.max(maxDeviation,dev);if(dev>.1)curved++;
  segments.push({from:a.toArray(),to:b.toArray(),startHandle:tangents[i].toArray(),endHandle:tangents[i+1].toArray(),samples:steps,maxDeviation:dev});
 }
 points.push(anchors.at(-1).clone());
 return {points,diagnostics:{anchors:anchors.length,segments:segments.length,samples:points.length,curvedSegments:curved,maxDeviation,maximumHandle:maxHandle,joinTangentError:0,endpointsPreserved:true,anchorPointsPreserved:true,clinicalCalibration:false},segments};
}
