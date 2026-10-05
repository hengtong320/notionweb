// Preserve the source mesh and existing quantized groups. Coincident vertices
// on opposite sides of a bin boundary must share the same diffusion neighbourhood.
const cachedGroups=new WeakMap();
export function surfaceGroups(geometry){
 if(cachedGroups.has(geometry))return cachedGroups.get(geometry);
 const p=geometry.attributes.position,n=p.count,groups=[],lookup=new Map(),vertexGroup=new Uint32Array(n);
 for(let i=0;i<n;i++){
  const key=[p.getX(i),p.getY(i),p.getZ(i)].map(x=>Math.round(x*1e5)).join(',');
  let j=lookup.get(key);if(j===undefined){j=groups.length;lookup.set(key,j);groups.push({vertices:[],edges:new Set()});}
  groups[j].vertices.push(i);vertexGroup[i]=j;
 }
 if(!geometry.userData.nativeFemale){
  const parent=Uint32Array.from({length:groups.length},(_,i)=>i),bins=new Map(),cell=1e-6;
  const find=i=>{while(parent[i]!==i){parent[i]=parent[parent[i]];i=parent[i];}return i;};
  for(let i=0;i<n;i++){
   const x=p.getX(i),y=p.getY(i),z=p.getZ(i),ix=Math.floor(x/cell),iy=Math.floor(y/cell),iz=Math.floor(z/cell);
   for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++)for(let dz=-1;dz<=1;dz++){
    const bucket=bins.get([ix+dx,iy+dy,iz+dz].join(','));if(!bucket)continue;
    for(const j of bucket){if((x-p.getX(j))**2+(y-p.getY(j))**2+(z-p.getZ(j))**2>cell*cell)continue;
     const a=find(vertexGroup[i]),b=find(vertexGroup[j]);if(a!==b)parent[Math.max(a,b)]=Math.min(a,b);
    }
   }
   const key=[ix,iy,iz].join(','),bucket=bins.get(key);if(bucket)bucket.push(i);else bins.set(key,[i]);
  }
  const merged=[],mapping=new Map();for(let i=0;i<n;i++){
   const root=find(vertexGroup[i]);let j=mapping.get(root);if(j===undefined){j=merged.length;mapping.set(root,j);merged.push({vertices:[],edges:new Set()});}
   merged[j].vertices.push(i);vertexGroup[i]=j;
  }
  groups.length=0;groups.push(...merged);
 }
 const index=geometry.index,count=index?.count||n;
 for(let i=0;i<count;i+=3){const triangle=[0,1,2].map(k=>index?index.getX(i+k):i+k);
  for(let k=0;k<3;k++){const a=triangle[k],b=triangle[(k+1)%3],u=vertexGroup[a],v=vertexGroup[b];
   if(u!==v&&Math.hypot(p.getX(a)-p.getX(b),p.getY(a)-p.getY(b),p.getZ(a)-p.getZ(b))<.04){groups[u].edges.add(v);groups[v].edges.add(u);}
  }
 }
 cachedGroups.set(geometry,groups);return groups;
}
