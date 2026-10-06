import assert from 'node:assert/strict';
const cached=new WeakMap();
// Bounded, offline display-position experiment for a source-coordinate trunk and adjacent arm band.
// The source mesh and bone chain are unchanged. This is not tissue mechanics.
export function constrainWaistEdges(g,values,{ratio=2.995,limit=.00125,passes=32}={}){
 if(!g.userData.nativeFemale)return {applied:false,maximumCorrection:0};
 let state=cached.get(g);
 if(!state){const p=g.attributes.position,h=g.attributes.bindingArm,n=p.count,mask=new Uint8Array(n),edges=[],seen=new Set();for(let i=0;i<n;i++)mask[i]=+(p.getY(i)>.10&&p.getY(i)<.32);
  for(let f=0;f<g.index.count;f+=3)for(let k=0;k<3;k++){let a=g.index.getX(f+k),b=g.index.getX(f+(k+1)%3);if(a>b)[a,b]=[b,a];if(!mask[a]&&!mask[b])continue;const key=a*n+b;if(seen.has(key))continue;seen.add(key);const length=Math.hypot(p.getX(a)-p.getX(b),p.getY(a)-p.getY(b),p.getZ(a)-p.getZ(b));if(length>.001)edges.push([a,b,length]);}state={mask,edges};cached.set(g,state);
 }
 const original=values.slice(),p=values,n=g.attributes.position.count,{mask,edges}=state;let maximumCorrection=0;
 for(let pass=0;pass<passes;pass++){let touched=0;for(const [a,b,length]of edges){const dx=p[b*3]-p[a*3],dy=p[b*3+1]-p[a*3+1],dz=p[b*3+2]-p[a*3+2],current=Math.hypot(dx,dy,dz),excess=current-length*ratio;if(excess<=1e-7)continue;const share=mask[a]+mask[b],scale=excess/current/share;for(const [v,sign]of [[a,1],[b,-1]])if(mask[v]){p[v*3]+=sign*dx*scale;p[v*3+1]+=sign*dy*scale;p[v*3+2]+=sign*dz*scale;const x=p[v*3]-original[v*3],y=p[v*3+1]-original[v*3+1],z=p[v*3+2]-original[v*3+2],distance=Math.hypot(x,y,z);if(distance>limit){p[v*3]=original[v*3]+x*limit/distance;p[v*3+1]=original[v*3+1]+y*limit/distance;p[v*3+2]=original[v*3+2]+z*limit/distance;}}touched++;}if(!touched)break;
 }
 let corrected=0,reversedFaceOrientations=0;for(let i=0;i<n;i++){const d=Math.hypot(p[i*3]-original[i*3],p[i*3+1]-original[i*3+1],p[i*3+2]-original[i*3+2]);maximumCorrection=Math.max(maximumCorrection,d);if(d>1e-7)corrected++;assert(d<=limit+2e-7);assert(mask[i]||d===0,'Outside vertices must remain unchanged');}
 for(let f=0;f<g.index.count;f+=3){const [a,b,c]=[0,1,2].map(k=>g.index.getX(f+k)),normal=v=>{const x=[0,1,2].map(k=>v[b*3+k]-v[a*3+k]),y=[0,1,2].map(k=>v[c*3+k]-v[a*3+k]);return [x[1]*y[2]-x[2]*y[1],x[2]*y[0]-x[0]*y[2],x[0]*y[1]-x[1]*y[0]];},u=normal(original),v=normal(p);if(u.reduce((s,x,k)=>s+x*v[k],0)<0)reversedFaceOrientations++;}
 return {applied:true,maximumCorrection,corrected,reversedFaceOrientations,ratio,limit,passes,edges:edges.length,sourceVerticesUnchanged:true,clinicalCalibration:false};
}
