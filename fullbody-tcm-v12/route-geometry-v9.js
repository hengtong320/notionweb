export function naturalRoute(THREE,input,_depth=0){
 const p=[];for(const v of input){if(!v||![v.x,v.y,v.z].every(Number.isFinite))throw Error('Non-finite route');if(!p.length||p.at(-1).distanceToSquared(v)>1e-8)p.push(v.clone());}
 if(p.length<2)throw Error('A branch needs two different anchors');
 const n=p.length,s=[0];for(let i=1;i<n;i++)s.push(s[i-1]+p[i].distanceTo(p[i-1]));const total=s.at(-1);
 const h=s.slice(1).map((v,i)=>v-s[i]);
 // Solve tridiagonal system for second derivatives with natural endpoint conditions.
 const M=Array.from({length:n},()=>new THREE.Vector3());
 for(const axis of ['x','y','z']){const a=new Float64Array(n),b=new Float64Array(n),c=new Float64Array(n),d=new Float64Array(n);b[0]=b[n-1]=1;
  for(let i=1;i<n-1;i++){a[i]=h[i-1];b[i]=2*(h[i-1]+h[i]);c[i]=h[i];d[i]=6*((p[i+1][axis]-p[i][axis])/h[i]-(p[i][axis]-p[i-1][axis])/h[i-1]);}
  for(let i=1;i<n;i++){const w=a[i]/b[i-1];b[i]-=w*c[i-1];d[i]-=w*d[i-1];}
  M[n-1][axis]=d[n-1]/b[n-1];for(let i=n-2;i>=0;i--)M[i][axis]=(d[i]-c[i]*M[i+1][axis])/b[i];
 }
 class Natural extends THREE.Curve{
  constructor(){super();this.arcLengthDivisions=Math.max(500,Math.ceil(total));}
  segment(t){const x=THREE.MathUtils.clamp(t,0,1)*total;let lo=0,hi=n-1;while(lo+1<hi){const m=(lo+hi)>>1;if(s[m]<=x)lo=m;else hi=m;}return {i:Math.min(lo,n-2),x};}
  getPoint(t,target=new THREE.Vector3()){const {i,x}=this.segment(t),w=h[i],a=(s[i+1]-x)/w,b=(x-s[i])/w;return target.copy(p[i]).multiplyScalar(a).addScaledVector(p[i+1],b).addScaledVector(M[i],(a*a*a-a)*w*w/6).addScaledVector(M[i+1],(b*b*b-b)*w*w/6);}
  derivative(t,order=1,target=new THREE.Vector3()){const {i,x}=this.segment(t),w=h[i],a=(s[i+1]-x)/w,b=(x-s[i])/w;if(order===2)return target.copy(M[i]).multiplyScalar(a).addScaledVector(M[i+1],b);
   return target.copy(p[i+1]).sub(p[i]).divideScalar(w).addScaledVector(M[i],(-3*a*a+1)*w/6).addScaledVector(M[i+1],(3*b*b-1)*w/6);}
  getTangent(t,target=new THREE.Vector3()){return this.derivative(t,1,target).normalize();}
 }
 const curve=new Natural(),segments=Math.max(36,Math.min(2200,Math.ceil(curve.getLength()/3))),points=curve.getSpacedPoints(segments);
 let anchorError=0,maxDeparture=0,minSpeed=Infinity;const departures=[];
 for(let i=0;i<n;i++)anchorError=Math.max(anchorError,curve.getPoint(s[i]/total).distanceTo(p[i]));
 for(let i=0;i<n-1;i++){const chord=new THREE.Line3(p[i],p[i+1]);let dev=0;for(let j=0;j<=32;j++){const t=(s[i]+h[i]*j/32)/total,v=curve.getPoint(t);dev=Math.max(dev,v.distanceTo(chord.closestPointToPoint(v,true,new THREE.Vector3())));minSpeed=Math.min(minSpeed,curve.derivative(t).length());}departures.push(dev);maxDeparture=Math.max(maxDeparture,dev);}
 // Guard graphically against unconstrained spline overshoot. These units are
 // a display-envelope bound relative to the OLD schematic, NOT clinical error.
 if(_depth<7&&maxDeparture>5){const refined=[];for(let i=0;i<n-1;i++){refined.push(p[i]);if(departures[i]>3.5)refined.push(p[i].clone().lerp(p[i+1],.5));}refined.push(p[n-1]);const out=naturalRoute(THREE,refined,_depth+1);out.diagnostics.originalAnchors=_depth===0?input.length:out.diagnostics.originalAnchors;out.diagnostics.adaptiveRefinementPasses=Math.max(out.diagnostics.adaptiveRefinementPasses||0,_depth+1);out.diagnostics.initialMaxDeparture= _depth===0?maxDeparture:out.diagnostics.initialMaxDeparture;return out;}

 // Diagnostic shape envelope is graphical only, never a clinical error bound.
 const geometry=new THREE.TubeGeometry(curve,segments,1.65,12,false);
 return {curve,points,geometry,diagnostics:{algorithm:'chord-length natural cubic spline',continuity:'C2 at internal knots',anchors:n,segments,samples:points.length,anchorError,maxDepartureFromOldPolyline:maxDeparture,minDerivativeNorm:minSpeed,triangleCount:geometry.index.count/3,clinicalCalibration:false,surfaceRegistered:false,graphicalReviewNeeded:maxDeparture>5||minSpeed<.05}};
}
export function createRouteTube(THREE,input,color){const r=naturalRoute(THREE,input);const material=new THREE.MeshStandardMaterial({color,roughness:.42,metalness:0,envMapIntensity:.35,transparent:true,opacity:.94,depthWrite:false,depthTest:true});const mesh=new THREE.Mesh(r.geometry,material);mesh.renderOrder=22;mesh.userData.isIllustrativeMeridian=true;return {...r,mesh};}
