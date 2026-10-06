import * as T from 'three';
import {surfaceGroups} from './pose-surface-groups.js';

export function structureLegSide(geometry){
 const info=geometry.userData.sourceInfo,text=[info?.name,info?.en,info?.english].join(' ');
 if(!/femoral|popliteal|tibial|peroneal|fibular|saphenous|sural|sciatic|plantar|dorsalis pedis|foot|股|胫|腓|坐骨|足/i.test(text))return null;
 if(/\bright\b|\bR[. _]|右/i.test(text))return 0;
 if(/\bleft\b|\bL[. _]|左/i.test(text))return 1;
 geometry.computeBoundingBox();const box=geometry.boundingBox;
 if(box.min.x>=-.001)return 1;if(box.max.x<=.001)return 0;return null;
}

// A medial thigh can be close to the midline without belonging to both legs.
// Identify each source leg by connectivity below the groin, then extend its
// side through the connected hip transition. This changes display weights only.
export function surfaceLegSides(geometry){
 if(geometry.hasAttribute('bindingLeg'))return geometry.attributes.bindingLeg.array;
 const p=geometry.attributes.position,groups=surfaceGroups(geometry),n=groups.length,arm=geometry.attributes.bindingArm;
 const representative=groups.map(g=>g.vertices[0]),prior=new Float32Array(n),fixed=new Int8Array(n);fixed.fill(-1);
 for(let i=0;i<n;i++){const v=representative[i],y=p.getY(v),width=T.MathUtils.lerp(.001,.05,T.MathUtils.smoothstep(y,-.40,-.20));prior[i]=T.MathUtils.smoothstep(p.getX(v),-width,width);}
 let components=null,plane=null;
 for(const cut of [-.25,-.30,-.35]){
  const visited=new Uint8Array(n),rows=[];
  for(let i=0;i<n;i++){
   const vi=representative[i];if(visited[i]||p.getY(vi)>=cut||(arm?.getX(vi)||0)>.5)continue;
   const queue=[i];visited[i]=1;let meanX=0,minY=Infinity;
   for(let q=0;q<queue.length;q++){const j=queue[q],v=representative[j];meanX+=p.getX(v);minY=Math.min(minY,p.getY(v));
    for(const k of groups[j].edges){const u=representative[k];if(!visited[k]&&p.getY(u)<cut&&(arm?.getX(u)||0)<=.5){visited[k]=1;queue.push(k);}}
   }
   meanX/=queue.length;if(minY<-.55&&queue.length>1000)rows.push({queue,meanX,minY});
  }
  if(rows.some(r=>r.meanX<-.02)&&rows.some(r=>r.meanX>.02)){components=rows;plane=cut;break;}
 }
 if(!components)throw Error('无法从原体表辨认左右腿连通区域');
 for(const c of components)for(const i of c.queue)fixed[i]=+(c.meanX>0);
 for(let i=0;i<n;i++){const v=representative[i];if(p.getY(v)>-.02||(arm?.getX(v)||0)>.5)fixed[i]=prior[i]>=.5?1:0;}
 let field=prior.slice(),next=new Float32Array(n);for(let i=0;i<n;i++)if(fixed[i]>=0)field[i]=fixed[i];
 for(let pass=0;pass<300;pass++){
  for(let i=0;i<n;i++){if(fixed[i]>=0){next[i]=fixed[i];continue;}let sum=0;for(const j of groups[i].edges)sum+=field[j];next[i]=groups[i].edges.size?.25*field[i]+.75*sum/groups[i].edges.size:prior[i];}
  [field,next]=[next,field];
 }
 const values=new Float32Array(p.count);for(let i=0;i<n;i++)for(const v of groups[i].vertices)values[v]=field[i];
 geometry.setAttribute('bindingLeg',new T.Float32BufferAttribute(values,1));
 geometry.userData.legPartition={plane,components:components.map(({queue,...r})=>({...r,groups:queue.length,side:r.meanX<0?'right':'left'})),method:'Source topology leg side propagation',clinicalCalibration:false};
 return values;
}
