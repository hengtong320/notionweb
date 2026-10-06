import * as THREE from 'three';
// Display route repair for digits and sharp face/ear spans. Numbered endpoints
// stay fixed. Graph edges belong to existing skin triangles, never air gaps.
export function repairDigitPaths(raw,geometry,bvh,context,nearest,contact=nearest){
 const result={repairedSpans:0,rejectedSpans:0,originalLength:0,repairedLength:0,anchorsMoved:0,spans:[]};
 const parts=[];for(let i=0;i<raw.length;i++)if(raw[i].anchor)parts.push(i);
 const replacements=[];
 for(let k=1;k<parts.length;k++){
  const start=parts[k-1],end=parts[k],a=raw[start],b=raw[end];if(end-start<4)continue;
  const digit=[a,b].every(p=>p.point.y<850&&p.point.y>620&&Math.abs(p.point.x-99.55318156)>140);
  const foot=[a,b].every(p=>p.point.y<160),arm=[a,b].every(p=>p.point.y>790&&p.point.y<1350&&Math.abs(p.point.x-99.55318156)>140),head=['LI','SI','TE'].includes(context.meridian)&&[a,b].every(p=>p.point.y>1370);if(!digit&&!foot&&!arm&&!head)continue;
  let length=0,turns=0;for(let i=start+1;i<=end;i++){length+=raw[i].point.distanceTo(raw[i-1].point);if(i<end){const u=raw[i].point.clone().sub(raw[i-1].point),v=raw[i+1].point.clone().sub(raw[i].point);if(u.length()>.3&&v.length()>.3&&u.angleTo(v)>Math.PI/3)turns++;}}
  const surfaceGap=head&&raw.slice(start+1,end+1).some((p,j)=>(bvh.closestPointToPoint(p.point.clone().lerp(raw[start+j].point,.5))?.distance??Infinity)>1.1);
  const chord=a.point.distanceTo(b.point);if((!turns&&!surfaceGap)||chord<4||chord>160)continue;
  const path=findPath(a,b,chord);if(!path){result.rejectedSpans++;continue;}
  for(let pass=0;pass<16;pass++){
   const next=path.map(p=>p.clone());for(let j=1;j<path.length-1;j++){
    const q=path[j-1].clone().add(path[j+1]).multiplyScalar(.5),aim=a.normal.clone().lerp(b.normal,j/(path.length-1)).normalize(),h=contact(q,aim);
    if(h&&h.point.distanceTo(path[j])<2&&h.point.distanceTo(q)<2)next[j]=h.point;
   }for(let j=1;j<path.length-1;j++)path[j]=next[j];
  }
  let newLength=0,valid=true;for(let j=1;j<path.length;j++){
   newLength+=path[j].distanceTo(path[j-1]);for(const t of [.25,.5,.75])if((bvh.closestPointToPoint(path[j-1].clone().lerp(path[j],t))?.distance??Infinity)>1.1)valid=false;
  }
  if(!valid||newLength>length*.995||newLength<chord*.999){result.rejectedSpans++;continue;}
  const samples=[a];for(let j=1;j<path.length-1;j++){
   const t=j/(path.length-1),aim=a.normal.clone().lerp(b.normal,t).normalize(),h=contact(path[j],aim);
   if(!h||h.point.distanceTo(path[j])>1.2){valid=false;break;}
   samples.push({point:path[j],normal:h.normal,source:a.source.clone().lerp(b.source,t),anchor:false});
  }if(!valid){result.rejectedSpans++;continue;}samples.push(b);
  replacements.push({start,end,samples});result.repairedSpans++;result.spans.push({from:(context.anchors||[]).find(p=>p.source.distanceToSquared(a.source)<1e-8)?.code,to:(context.anchors||[]).find(p=>p.source.distanceToSquared(b.source)<1e-8)?.code,before:length,after:newLength});result.originalLength+=length;result.repairedLength+=newLength;
 }
 for(const r of replacements.reverse())raw.splice(r.start,r.end-r.start+1,...r.samples);
 return result;
 function findPath(a,b,chord){
  const ha=bvh.closestPointToPoint(a.point),hb=bvh.closestPointToPoint(b.point);if(!ha||!hb)return null;
  const line=new THREE.Line3(ha.point,hb.point),margin=Math.min(28,Math.max(12,chord*.24)),box=new THREE.Box3().setFromPoints([ha.point,hb.point]).expandByScalar(margin),vertices=[],edges=[],keys=new Map(),faces=new Map(),tmp=new THREE.Vector3();
  const vertex=v=>{const key=v.toArray().map(x=>Math.round(x*1000)).join(':');let id=keys.get(key);if(id===undefined){id=vertices.length;keys.set(key,id);vertices.push(v.clone());edges.push(new Map());}return id;};
  bvh.shapecast({intersectsBounds:v=>v.intersectsBox(box),intersectsTriangle:(tri,id)=>{
   if(!tri.intersectsBox(box))return false;
   const center=tri.a.clone().add(tri.b).add(tri.c).multiplyScalar(1/3),t=line.closestPointToPointParameter(center,true),aim=a.normal.clone().lerp(b.normal,t);if(aim.lengthSq()>.01&&tri.getNormal(new THREE.Vector3()).dot(aim.normalize())<-.25)return false;
   const ps=[tri.a,tri.b,tri.c];if(!ps.some(v=>line.closestPointToPoint(v,true,tmp).distanceTo(v)<=margin))return false;
   const ids=ps.map(vertex);faces.set(id,ids);for(let i=0;i<3;i++){const j=(i+1)%3,u=ids[i],v=ids[j],d=vertices[u].distanceTo(vertices[v]);if(d>0){edges[u].set(v,d);edges[v].set(u,d);}}return false;
  }});
  const source=faces.get(ha.faceIndex),target=faces.get(hb.faceIndex);if(!source||!target)return null;
  const goal=vertex(hb.point);for(const i of target){const d=vertices[i].distanceTo(hb.point);edges[i].set(goal,d);edges[goal].set(i,d);}
  const begin=vertex(ha.point);for(const i of source){const d=vertices[i].distanceTo(ha.point);edges[begin].set(i,d);edges[i].set(begin,d);}
  const heap=[],cost=new Float64Array(vertices.length).fill(Infinity),from=new Int32Array(vertices.length).fill(-1);
  function push(id,f,g){const e={id,f,g};let i=heap.length;heap.push(e);while(i){const p=(i-1)>>1;if(heap[p].f<=f)break;heap[i]=heap[p];i=p;}heap[i]=e;}
  function pop(){const e=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let j=i*2+1;if(j+1<heap.length&&heap[j+1].f<heap[j].f)j++;if(heap[j].f>=last.f)break;heap[i]=heap[j];i=j;}heap[i]=last;}return e;}
  cost[begin]=0;push(begin,chord,0);let visits=0;
  while(heap.length&&visits++<50000){const {id,g}=pop();if(g!==cost[id])continue;if(id===goal)break;
   for(const [j,d]of edges[id]){const dev=line.closestPointToPoint(vertices[j],true,tmp).distanceTo(vertices[j]),next=g+d*(1+.2*(dev/margin)**2);if(next<cost[j]&&next<chord*4+30){cost[j]=next;from[j]=id;push(j,next+vertices[j].distanceTo(hb.point),next);}}
  }
  if(!Number.isFinite(cost[goal]))return null;let id=goal,chain=[];for(let i=0;i<=vertices.length;i++){chain.push(vertices[id]);if(id===begin)break;id=from[id];if(id<0)return null;}chain.reverse();
  const samples=[a.point.clone()];for(let i=1;i<chain.length;i++){const n=Math.max(1,Math.ceil(chain[i].distanceTo(chain[i-1])/1.5));for(let j=1;j<=n;j++){const q=chain[i-1].clone().lerp(chain[i],j/n),t=line.closestPointToPointParameter(q,true),aim=a.normal.clone().lerp(b.normal,t).normalize(),h=contact(q,aim);if(!h||h.point.distanceTo(q)>1.5)return null;samples.push(h.point);}}samples[samples.length-1]=b.point.clone();return samples;
 }
}
