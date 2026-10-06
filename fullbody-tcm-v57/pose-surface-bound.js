import * as T from 'three';

// A bounded correction of displayed vertices, only for the opt-in box pose.
// The source positions, topology and rigid joints remain unchanged. The ratio
// is a mesh quality guard, not a material constant or a tissue injury limit.
const ratio=2.995,limit=.00125,passes=32;
export function createSurfaceBound(){
 const states=new WeakMap();
 function prepare(g){
  if(states.has(g))return states.get(g);
  const n=g.attributes.position.count;
  g.setAttribute('poseBoundOffset',new T.Float32BufferAttribute(new Float32Array(n*3),3));
  g.setAttribute('poseBoundNormal',new T.Float32BufferAttribute(new Float32Array(n*4),4));
  const width=1024,height=Math.ceil(n*2/width),texture=new T.DataTexture(new Float32Array(width*height*4),width,height,T.RGBAFormat,T.FloatType);texture.needsUpdate=true;
  const state={texture,uniforms:{poseBoundTexture:{value:texture},poseBoundOn:{value:0}},active:false,dirty:[],normalDirty:[],snapshot:null,report:{active:false,correctedVertices:0,maximumCorrectionMetres:0,clinicalCalibration:false}};
  states.set(g,state);return state;
 }
 function topology(g,s){
  if(s.edges)return;
  const p=g.attributes.position.array,n=g.attributes.position.count,ix=g.index.array,mask=new Uint8Array(n),seen=new Set(),edges=[],needed=new Set();
  for(let i=0;i<n;i++)mask[i]=+(p[i*3+1]>.10&&p[i*3+1]<.32);
  for(let f=0;f<ix.length;f+=3)for(let k=0;k<3;k++){
   let a=ix[f+k],b=ix[f+(k+1)%3];if(a>b)[a,b]=[b,a];if(!mask[a]&&!mask[b])continue;
   const key=a*n+b;if(seen.has(key))continue;seen.add(key);
   const length=Math.hypot(p[a*3]-p[b*3],p[a*3+1]-p[b*3+1],p[a*3+2]-p[b*3+2]);
   if(length>.001){edges.push(a,b,length);needed.add(a);needed.add(b);}
  }
  const edgeCounts=new Uint32Array(n);for(let j=0;j<edges.length;j+=3){edgeCounts[edges[j]]++;edgeCounts[edges[j+1]]++;}
  const edgeStarts=new Uint32Array(n+1);for(let i=0;i<n;i++)edgeStarts[i+1]=edgeStarts[i]+edgeCounts[i];
  const edgeCursor=edgeStarts.slice(),incidentEdges=new Uint32Array(edgeStarts[n]);for(let j=0;j<edges.length;j+=3){incidentEdges[edgeCursor[edges[j]]++]=j;incidentEdges[edgeCursor[edges[j+1]]++]=j;}
  const counts=new Uint32Array(n);for(const v of ix)counts[v]++;
  const starts=new Uint32Array(n+1);for(let i=0;i<n;i++)starts[i+1]=starts[i]+counts[i];
  const cursor=starts.slice(),faces=new Uint32Array(ix.length);for(let f=0;f<ix.length;f+=3)for(let k=0;k<3;k++)faces[cursor[ix[f+k]]++]=f;
  Object.assign(s,{edgeStarts,incidentEdges,mask,edges:new Float64Array(edges),needed:new Uint32Array([...needed]),starts,faces,original:new Float32Array(n*3),posed:new Float32Array(n*3),evaluated:new Uint8Array(n)});
 }
 function clear(g,s){
  const offset=g.attributes.poseBoundOffset,normal=g.attributes.poseBoundNormal;
  for(const i of s.dirty){offset.setXYZ(i,0,0,0);s.texture.image.data.fill(0,i*8,i*8+4);}
  for(const i of s.normalDirty){normal.setXYZW(i,0,0,0,0);s.texture.image.data.fill(0,i*8+4,i*8+8);}
  if(s.dirty.length)offset.needsUpdate=true;if(s.normalDirty.length)normal.needsUpdate=true;
  if(s.dirty.length||s.normalDirty.length)s.texture.needsUpdate=true;s.dirty=[];s.normalDirty=[];
 }
 function update(g,enabled,matrices,write){
  if(!g)return;const s=prepare(g);enabled=enabled&&!!g.userData.nativeFemale;
  if(!enabled){if(s.active)clear(g,s);s.active=false;s.uniforms.poseBoundOn.value=0;s.snapshot=null;s.report={active:false,correctedVertices:0,maximumCorrectionMetres:0,clinicalCalibration:false};return;}
  const palette=matrices.flatMap(m=>m.elements);
  if(s.active&&s.snapshot?.length===palette.length&&palette.every((v,i)=>v===s.snapshot[i]))return;
  const start=performance.now();topology(g,s);clear(g,s);s.active=true;s.snapshot=palette;s.evaluated.fill(0);
  const {original:o,posed:p,edges:e,mask,needed}=s;
  const evaluate=i=>{if(s.evaluated[i])return;write(i,o);p[i*3]=o[i*3];p[i*3+1]=o[i*3+1];p[i*3+2]=o[i*3+2];s.evaluated[i]=1;};
  for(const i of needed)evaluate(i);
  // Process only initially stretched edges and neighbours of moved vertices.
  // A min-heap retains the original ascending edge order in every pass. Newly
  // affected earlier edges wait for the next pass, exactly as in the full scan.
  let candidates=[],iterations=0,visitedEdges=0;const queued=new Uint8Array(e.length/3),nextMark=new Uint8Array(e.length/3);
  for(let j=0;j<e.length;j+=3){const a=e[j]*3,b=e[j+1]*3;if(Math.hypot(p[b]-p[a],p[b+1]-p[a+1],p[b+2]-p[a+2])-e[j+2]*ratio>1e-7)candidates.push(j);}
  for(let pass=0;pass<passes;pass++){
   const heap=[],next=[];queued.fill(0);nextMark.fill(0);let touched=0;
   const push=j=>{const k=j/3;if(queued[k])return;queued[k]=1;let i=heap.length;heap.push(j);while(i){const parent=(i-1)>>1;if(heap[parent]<=j)break;heap[i]=heap[parent];i=parent;}heap[i]=j;};
   const pop=()=>{const first=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let child=i*2+1;if(child+1<heap.length&&heap[child+1]<heap[child])child++;if(heap[child]>=last)break;heap[i]=heap[child];i=child;}heap[i]=last;}queued[first/3]=0;return first;};
   for(const j of candidates)push(j);
   while(heap.length){const j=pop();visitedEdges++;const a=e[j],b=e[j+1],dx=p[b*3]-p[a*3],dy=p[b*3+1]-p[a*3+1],dz=p[b*3+2]-p[a*3+2],current=Math.hypot(dx,dy,dz),excess=current-e[j+2]*ratio;
    if(excess<=1e-7)continue;const scale=excess/current/(mask[a]+mask[b]);
    for(let endpoint=0;endpoint<2;endpoint++){
     const v=endpoint?b:a;if(!mask[v])continue;const sign=endpoint?-1:1;
     p[v*3]+=sign*dx*scale;p[v*3+1]+=sign*dy*scale;p[v*3+2]+=sign*dz*scale;
     const x=p[v*3]-o[v*3],y=p[v*3+1]-o[v*3+1],z=p[v*3+2]-o[v*3+2],distance=Math.hypot(x,y,z);
     if(distance>limit){p[v*3]=o[v*3]+x*limit/distance;p[v*3+1]=o[v*3+1]+y*limit/distance;p[v*3+2]=o[v*3+2]+z*limit/distance;}
     for(let k=s.edgeStarts[v];k<s.edgeStarts[v+1];k++){const neighbour=s.incidentEdges[k];if(!nextMark[neighbour/3]){nextMark[neighbour/3]=1;next.push(neighbour);}if(neighbour>j)push(neighbour);}
    }touched++;
   }iterations++;if(!touched)break;candidates=next;
  }
  let maximum=0;const normalVertices=new Set(),ix=g.index.array,offset=g.attributes.poseBoundOffset,normal=g.attributes.poseBoundNormal;
  for(const i of needed){const x=p[i*3]-o[i*3],y=p[i*3+1]-o[i*3+1],z=p[i*3+2]-o[i*3+2],distance=Math.hypot(x,y,z);if(!distance)continue;
   maximum=Math.max(maximum,distance);s.dirty.push(i);offset.setXYZ(i,x,y,z);s.texture.image.data.set([x,y,z,0],i*8);
   for(let j=s.starts[i];j<s.starts[i+1];j++){const f=s.faces[j];normalVertices.add(ix[f]);normalVertices.add(ix[f+1]);normalVertices.add(ix[f+2]);}
  }
  // Recompute area-weighted normals for affected vertices and their one-ring.
  // Unchanged neighbourhoods keep the production skinning normals.
  for(const i of normalVertices){let nx=0,ny=0,nz=0;
   for(let j=s.starts[i];j<s.starts[i+1];j++){const f=s.faces[j],a=ix[f],b=ix[f+1],c=ix[f+2];evaluate(a);evaluate(b);evaluate(c);
    const ux=p[b*3]-p[a*3],uy=p[b*3+1]-p[a*3+1],uz=p[b*3+2]-p[a*3+2],vx=p[c*3]-p[a*3],vy=p[c*3+1]-p[a*3+1],vz=p[c*3+2]-p[a*3+2];
    nx+=uy*vz-uz*vy;ny+=uz*vx-ux*vz;nz+=ux*vy-uy*vx;
   }const length=Math.hypot(nx,ny,nz);if(length){normal.setXYZW(i,nx/length,ny/length,nz/length,1);s.texture.image.data.set([nx/length,ny/length,nz/length,1],i*8+4);s.normalDirty.push(i);}
  }
  if(s.dirty.length)offset.needsUpdate=true;if(s.normalDirty.length)normal.needsUpdate=true;
  s.uniforms.poseBoundOn.value=+(s.dirty.length>0);if(s.dirty.length||s.normalDirty.length)s.texture.needsUpdate=true;
  s.report={active:true,correctedVertices:s.dirty.length,normalVertices:s.normalDirty.length,maximumCorrectionMetres:maximum,maximumAllowedCorrectionMetres:limit,edgeRatioGuard:ratio,passes:iterations,visitedEdges,solveMethod:'ascending active-edge queue',edges:e.length/3,computeMilliseconds:performance.now()-start,sourceVerticesUnchanged:true,clinicalCalibration:false};
 }
 function vertex(g,i,out){const s=states.get(g);if(s?.active){const a=g.attributes.poseBoundOffset.array;out.x+=a[i*3];out.y+=a[i*3+1];out.z+=a[i*3+2];}return out;}
 return {prepare,update,vertex,uniforms:g=>prepare(g).uniforms,audit:g=>states.get(g)?.report||{active:false,clinicalCalibration:false}};
}
