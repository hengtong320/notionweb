"""Prevent body-adaptation discontinuities from becoming free-space connectors."""
from pathlib import Path
p=Path('fullbody-tcm-v17')
f=p/'skin-v17.js';s=f.read_text()
s=s.replace('function tube(points,normals){','function tube(points,normals,connections){').replace('if(i){const a=(i-1)*sides+k','if(i&&connections[i]){const a=(i-1)*sides+k')
a=s.index(' function curve(source,context={})');b=s.index(' function isVisible(',a)
s=s[:a]+r'''
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
''' +s[b:]
f.write_text(s)
f=p/'learning-enhancements.js';s=f.read_text()
s=s.replace("g.tube.geometry=value.geometry;g.points=value.points;const old=g.guide.geometry,geometry=new LineGeometry().setPositions(g.points.flatMap(v=>v.toArray()));", "g.tube.geometry=value.geometry;g.points=value.points;g.connections=value.connections||null;g.traceDiagnostics=value.traceDiagnostics||null;const old=g.guide.geometry,geometry=value.segmentPositions?new LineSegmentsGeometry().setPositions(value.segmentPositions):new LineGeometry().setPositions(g.points.flatMap(v=>v.toArray()));")
s=s.replace("const a=g.points[i-1],b=g.points[i];gap=", "if(g.connections&&!g.connections[i])continue;const a=g.points[i-1],b=g.points[i];gap=")
s=s.replace("return {source:'display consistency only; not anatomical calibration',count:rows.length", "return {surfaceTrace:routeRecords.flatMap(r=>r.guides.map(g=>({meridian:r.meridian,side:r.side,...g.traceDiagnostics}))),source:'display consistency only; not anatomical calibration',count:rows.length")
s=s.replace("curveStyle,headAreaVisible:", "curveStyle,surfaceTrace:routeRecords.flatMap(r=>r.guides.map(g=>({meridian:r.meridian,side:r.side,...g.traceDiagnostics}))),headAreaVisible:")
s=s.replace("function setMeridians(ids){ctx.invalidate();", "function setMeridians(ids){hover.hidden=true;ctx.invalidate();")
f.write_text(s)
f=Path('atlas17-delivery/verify.cjs');s=f.read_text()
needle="ck('No uncaught errors',report.errors.length===0,report.errors);"
extra="""for(const sex of ['female','male']){await page.evaluate(sex=>__ATLAS_SHARED__.switchSex(sex),sex);await settle();const traces=await page.evaluate(()=>__ATLAS_LEARNING__.getState().surfaceTrace);report[sex+'SurfaceTrace']=traces;ck(sex+' rendered curves have no free-space bridging segments',traces.length>0&&traces.every(t=>t.drawnSegments>0&&t.maxDrawnSurfaceGap<=3.3),traces.map(t=>({meridian:t.meridian,side:t.side,gap:t.maxDrawnSurfaceGap,breaks:t.disconnectedTransitions})));}\n"""
assert needle in s;s=s.replace(needle,extra+needle)
f.write_text(s)
f=p/'README.md';s=f.read_text();s=s.replace('男女分别缓存贴面几何，','曲线采样沿用邻近参照点的身体部位，避免女性手臂被当成躯干。局部曲率重新贴肤；分离皮肤区域之间不强行绘制穿空连线。男女分别缓存贴面几何，');f.write_text(s)
print('Continuous regional samples and skin-traced segments ready')
