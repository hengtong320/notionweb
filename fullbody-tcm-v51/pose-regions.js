import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import FRAME from './body-frame-v18.json';
// Native region information disambiguates a thigh surface from fingers that
// happen to be nearby in the rest scan. It is a binding hint, not new anatomy.
export function sourceArmHint(info){const text=[info?.en,info?.english,info?.name].join(' ');if(/forearm|region of arm|region of elbow|wrist|hand|palm|bicipital|cubital|deltoid|deltopectoral|radial foveola|nail plate|perionyx|brachial|ulnar|median nerve|radial nerve|腋神经|尺神经|正中神经|桡神经/i.test(text)&&!/foot/i.test(text))return 1;if(/thigh|femoral|popliteal|ankle|foot|sole|knee|leg|hip|inguinal|gluteal|sacral|urogenital|anal region|sciatic|tibial|sural|saphenous|peroneal|fibular|坐骨|股神经|胫神经|腓神经/i.test(text))return 0;return info?.system==='surface'?0:null;}
export function nativeFemaleArmHint(point){const y=point.y,boundary=175+70*(1-T.MathUtils.smoothstep(y,880,1050))-35*T.MathUtils.smoothstep(y,1050,1240);return T.MathUtils.smoothstep(Math.abs(point.x-FRAME.midFemale),boundary,boundary+65)*(1-T.MathUtils.smoothstep(y,1200,1375));}
export function addRegionHints(geometry,info,nativePosition=null,topology=false){if(topology&&nativePosition&&info?.system==='surface'){geometry.setAttribute('bindingArm',new T.Float32BufferAttribute(nativeSurfaceArmField(geometry,nativePosition),1));return;}const hint=sourceArmHint(info);if(!nativePosition&&hint===null)return;const values=new Float32Array(geometry.attributes.position.count),point=new T.Vector3();for(let i=0;i<values.length;i++)values[i]=nativePosition?nativeFemaleArmHint(point.fromBufferAttribute(nativePosition,i)):hint;geometry.setAttribute('bindingArm',new T.Float32BufferAttribute(values,1));}

// Below the axilla plane the native scan has separate arm and trunk surface
// components. Propagate those component labels through the shoulder topology,
// rather than classifying the inner arm as trunk from an X/Y threshold.
export function nativeSurfaceArmField(geometry,native){
 const n=native.count,adj=Array.from({length:n},()=>new Set()),index=geometry.index,count=index?.count||n;
 for(let i=0;i<count;i+=3){const t=[0,1,2].map(k=>index?index.getX(i+k):i+k);for(let k=0;k<3;k++){adj[t[k]].add(t[(k+1)%3]);adj[t[(k+1)%3]].add(t[k]);}}
 const fixed=new Int8Array(n);fixed.fill(-1);let components=[],plane=1000;
 function partition(cut){const labels=new Int32Array(n);labels.fill(-1);const result=[];for(let i=0;i<n;i++){if(labels[i]>=0||native.getY(i)>=cut)continue;const id=result.length,queue=[i];labels[i]=id;let mean=0;for(let q=0;q<queue.length;q++){const v=queue[q];mean+=native.getX(v)-FRAME.midFemale;for(const j of adj[v])if(labels[j]<0&&native.getY(j)<cut){labels[j]=id;queue.push(j);}}mean/=queue.length;result.push({queue,vertices:queue.length,meanX:mean,arm:Math.abs(mean)>180?1:0});}return result;}
 for(const cut of [1000,1050,1100,1150,1175]){const rows=partition(cut);if(rows.some(r=>r.arm&&r.meanX<0&&r.vertices>1000)&&rows.some(r=>r.arm&&r.meanX>0&&r.vertices>1000)&&rows.some(r=>!r.arm&&r.vertices>50000)){components=rows;plane=cut;}}
 if(!components.length)throw Error('原生体表手臂区域无法识别');for(const c of components)for(const v of c.queue)fixed[v]=c.arm;components=components.map(({queue,...row})=>row);
 const offsets=new Uint32Array(n+1);for(let i=0;i<n;i++)offsets[i+1]=offsets[i]+adj[i].size;const edges=new Uint32Array(offsets[n]);for(let i=0;i<n;i++)edges.set([...adj[i]],offsets[i]);
 let field=new Float32Array(n),next=new Float32Array(n);for(let i=0;i<n;i++){if(native.getY(i)>1375)fixed[i]=0;field[i]=fixed[i]>=0?fixed[i]:nativeFemaleArmHint(new T.Vector3().fromBufferAttribute(native,i));}
 for(let pass=0;pass<800;pass++){for(let i=0;i<n;i++){if(fixed[i]>=0){next[i]=fixed[i];continue;}let sum=0;const a=offsets[i],b=offsets[i+1];for(let j=a;j<b;j++)sum+=field[edges[j]];next[i]=b>a?.25*field[i]+.75*sum/(b-a):field[i];}[field,next]=[next,field];}
 geometry.userData.armPartitionPlane=plane;geometry.userData.armComponents=components;return field;
}

export function mergeSurfaceGeometry(geometries){
 const pieces=geometries.map(source=>{const g=source.clone();for(const name of Object.keys(g.attributes))if(!['position','bindingArm','oldBindingArm'].includes(name))g.deleteAttribute(name);if(!g.index)g.setIndex(Array.from({length:g.attributes.position.count},(_,i)=>i));return g;});
 const g=mergeGeometries(pieces,false);g.computeVertexNormals();g.computeBoundingBox();pieces.forEach(g=>g.dispose());return g;
}
