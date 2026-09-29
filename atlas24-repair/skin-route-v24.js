import * as THREE from 'three';
// Display geometry only: numbered landmarks are fixed, never moved by smoothing.
export function skinRouteSamples(source,context,{sample,nearest}){
 const anchors=context.anchors||[];
 const knots=source.map((v,i)=>{
  const anchor=anchors.find(a=>a.source.distanceToSquared(v)<1e-8);
  let near=anchor;
  if(!near&&anchors.length)near=anchors.reduce((a,b)=>a.source.distanceToSquared(v)<b.source.distanceToSquared(v)?a:b);
  const c=near?{...context,region:near.region,view:near.view,projectionNormal:near.projectionNormal,code:anchor?.code}:context;
  const h=sample(v,c);
  return {source:v.clone(),point:anchor?anchor.point.clone():h.point.clone(),normal:h.normal.clone(),anchor:!!anchor};
 });
 // Interpolate on the target body, not on a male-space curve whose projection
 // direction changes abruptly halfway between two numbered landmarks.
 const spline=new THREE.CatmullRomCurve3(knots.map(k=>k.point.clone()),false,'centripetal');
 const raw=[];
 for(let i=0;i<knots.length;i++){
  const a=knots[i];raw.push({...a,point:a.point.clone(),normal:a.normal.clone()});
  if(i===knots.length-1)continue;
  const b=knots[i+1],steps=Math.max(2,Math.min(600,Math.ceil(a.point.distanceTo(b.point)/1.6)));
  for(let j=1;j<steps;j++){
   const t=j/steps,q=spline.getPoint((i+t)/(knots.length-1));
   let aim=a.normal.clone().lerp(b.normal,t);if(aim.lengthSq()<1e-6)aim.copy(a.normal);aim.normalize();
   const h=nearest(q,aim);if(!h)throw Error('经络中间采样无法贴肤');
   raw.push({source:a.source.clone().lerp(b.source,t),point:h.point,normal:h.normal,anchor:false});
  }
 }
 return raw;
}
export function relaxSkinSamples(raw,nearest){
 // Small tangent fairing removes mesh-seam jitters. No smoothing across air,
 // no resampling of numbered landmarks, and no unconstrained curve shortcut.
 const originals=raw.map(r=>r.point.clone());let moved=0,maxMove=0;
 for(let pass=0;pass<4;pass++){
  const next=raw.map(r=>({point:r.point.clone(),normal:r.normal.clone()}));
  for(let i=1;i<raw.length-1;i++){
   const a=raw[i-1],r=raw[i],b=raw[i+1];if(r.anchor||r.point.distanceTo(a.point)>7||r.point.distanceTo(b.point)>7)continue;
   const q=a.point.clone().add(b.point).multiplyScalar(.2).addScaledVector(r.point,.6),h=nearest(q,r.normal);
   if(!h||h.point.distanceTo(originals[i])>1.2||h.normal.dot(r.normal)<.65)continue;
   next[i]=h;maxMove=Math.max(maxMove,h.point.distanceTo(originals[i]));moved++;
  }
  raw.forEach((r,i)=>{if(!r.anchor){r.point.copy(next[i].point);r.normal.copy(next[i].normal);}});
 }
 return {intermediateUpdates:moved,maxIntermediateMove:maxMove,numberedAnchorsMoved:0,method:'target-skin centripetal interpolation with fixed landmarks and bounded surface relaxation'};
}
