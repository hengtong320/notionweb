from pathlib import Path
p=Path('fullbody-tcm-v13')
f=p/'tissues-v4.js';s=f.read_text();a="if(displaced)ctx.learning.suspend(true);else ctx.learning.suspend(false);";assert a in s;s=s.replace(a,"ctx.learning.suspend(displaced||state.bodySex==='female');");s=s.replace("const key=[organBox?","const key=[state.bodySex,organBox?");f.write_text(s)
f=p/'learning-enhancements.js';s=f.read_text();s=s.replace("suspend:value=>{if(suspended!==value)","suspend:value=>{value=!!value||ctx.state.bodySex==='female';if(suspended!==value)")
a='surfaceAttached=!!on;surfaceBadge.hidden=!on;';assert a in s;s=s.replace(a,"""if(on){
    // Point symbols follow the same display-projection path as their named route.
    // Source/reference coordinates remain separately stored and reversible.
    for(const r of routeRecords)for(const p of r.data){let best=null,d=Infinity;for(const g of r.guides)for(const v of g.projected?.samples||[]){const n=v.source.distanceToSquared(p.sourcePosition);if(n<d){d=n;best=v.point;}}if(best&&d<100)p.position.copy(best);}
   }
   """+a);f.write_text(s)
f=p/'surface-v13.js';s=f.read_text();i=s.index(' function curve(');j=s.index(' function isVisible',i)
s=s[:i]+''' function nearestContinuous(v,c,preferred){
  const candidates=[subset(v,c),all];let best=null,score=Infinity;
  for(const s of candidates){const n=s.bvh.closestPointToPoint(v);if(!n)continue;const q=n.point.clone();const face=n.faceIndex,pos=s.g.attributes.position;const tri=new THREE.Triangle(new THREE.Vector3().fromBufferAttribute(pos,face*3),new THREE.Vector3().fromBufferAttribute(pos,face*3+1),new THREE.Vector3().fromBufferAttribute(pos,face*3+2));let normal=tri.getNormal(new THREE.Vector3());if(normal.dot(preferred)<0)normal.negate();q.addScaledVector(normal,2.2);const d=q.distanceToSquared(v);if(d<score){score=d;best=q;}}
  return best;
 }
 function curve(source,context={}){
  const c=new THREE.CatmullRomCurve3(source.map(v=>v.clone()),false,'centripetal'),count=Math.max(24,Math.min(2300,Math.ceil(c.getLength()/2.5))),refs=c.getSpacedPoints(count),points=[];let repaired=0;
  for(let i=0;i<refs.length;i++){
   const v=refs[i],raw=project(v,2.2,context),prev=points.at(-1);let q=raw;
   if(prev){const step=v.distanceTo(refs[i-1]),limit=Math.max(12,step*3.5);if(raw.distanceTo(prev)>limit){
    // A first-hit switch can jump from the near shell to a distant body partition.
    // Continue along the nearest actual surface, seeded by the previous path tangent.
    const predicted=prev.clone().add(v.clone().sub(refs[i-1])),near=nearestContinuous(predicted,context,direction(v,context));
    if(near&&near.distanceTo(prev)<raw.distanceTo(prev)){q=near;repaired++;}
   }}
   points.push(q);
  }
  // Smooth the continuous path, not a stateless discontinuous ray-hit function.
  const smooth=points.map(v=>v.clone());for(let pass=0;pass<2;pass++){const next=smooth.map(v=>v.clone());for(let i=1;i<smooth.length-1;i++){const avg=smooth[i-1].clone().addScaledVector(smooth[i],2).add(smooth[i+1]).multiplyScalar(.25);if(avg.distanceTo(smooth[i])<6)next[i].copy(avg);}smooth.splice(0,smooth.length,...next);}
  const route=new THREE.CatmullRomCurve3(smooth,false,'centripetal');route.arcLengthDivisions=count;const samples=refs.map((v,i)=>({source:v.clone(),point:smooth[i].clone()}));
  return {geometry:new THREE.TubeGeometry(route,count,1.15,10,false),points:smooth,samples,continuityRepairs:repaired};
 }
''' + s[j:];f.write_text(s)
f=p/'shared-v13.js';s=f.read_text();a="$('organQuickBar')?.remove();";assert a in s;s=s.replace(a,a+"$('chestCompare').hidden=true;$('tissueClear').textContent='只留骨骼';")
a="for(const b of document.querySelectorAll('[data-mode]'))";assert a in s;s=s.replace(a,"$('bonesOn').closest('label').querySelector('small').textContent=f?'部分骨骼与关节':'210个独立骨块';for(const b of document.querySelectorAll('[data-side]')){b.classList.toggle('active',b.dataset.side===(f?fs.side:state.side));} "+a)
a="$('tissueClear').onclick=";assert a in s;s=s.replace(a,"document.addEventListener('click',e=>{const b=e.target.closest('[data-side]');if(female.active&&b){e.preventDefault();e.stopImmediatePropagation();female.setSide(b.dataset.side);redraw();}},true);\n "+a)
f.write_text(s)
f=p/'female-v12.js';s=f.read_text().replace('部分系统覆盖 · V12','部分系统覆盖 · V13').replace("+'-V12.png'","+'-V13.png'");f.write_text(s)
f=Path('atlas13-tools/verify.cjs');s=f.read_text();a="if(!pass)throw Error(name+': '+JSON.stringify(detail));console.log('PASS',name);";assert a in s;s=s.replace(a,"if(!pass)console.error('CHECK_FAILED',name,JSON.stringify(detail));else console.log('PASS',name);")
a="report.success=true;";assert a in s;s=s.replace(a,"report.success=report.checks.every(c=>c.pass);if(!report.success){report.failure=report.checks.filter(c=>!c.pass).map(c=>c.name).join('; ');process.exitCode=1;}")
a="report.surface=await page.evaluate";assert a in s;s=s.replace(a,"fs.writeFileSync(path.join(out,engine+'-route-geometry.json'),JSON.stringify(routes));ck('Projected route segments have no cross-partition jumps',report.routeDiagnostics.every(r=>r.longestSegment<28),report.routeDiagnostics.filter(r=>r.longestSegment>=28));"+a)
f.write_text(s)
print('SURFACE_CONTINUITY_AND_FEMALE_OWNERSHIP_READY')
