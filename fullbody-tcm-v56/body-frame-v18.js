import FRAME from './body-frame-v18.json';
// A reversible teaching-frame derivative. Original source GLBs are not edited.
// It aligns display proportions, not clinical organ or acupoint registration.
const nativeGeometry=new WeakMap();
const mix=(a,b,t)=>a+(b-a)*t;
const smooth=(a,b,x)=>{let t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
function interpolate(rows,y){let i=1;while(i<rows.length-1&&y>rows[i][0])i++;const a=rows[i-1],b=rows[i],t=Math.max(0,Math.min(1,(y-a[0])/(b[0]-a[0])));return a.map((v,k)=>mix(v,b[k],t));}
function mapY(rows,y){let i=1;while(i<rows.length-1&&y>rows[i][0])i++;const a=rows[i-1],b=rows[i];return a[1]+(y-a[0])*(b[1]-a[1])/(b[0]-a[0]);}
function partMap(p,part){const r=interpolate(FRAME.frames[part],p[1]),left=p[0]>FRAME.midFemale,sx=left&&part!=='body'?2*FRAME.midFemale-p[0]:p[0];let x=r[4]+(sx-r[2])*r[6];if(left&&part!=='body')x=2*FRAME.midMale-x;return [x,mapY(part==='arm'?FRAME.armVertical:FRAME.vertical,p[1]),r[5]+(p[2]-r[3])*r[7]];}
export function standardizeFemalePoint(p){const body=partMap(p,'body'),leg=partMap(p,'leg'),arm=partMap(p,'arm'),ax=Math.abs(p[0]-FRAME.midFemale),y=p[1];
 const legWeight=1-smooth(620,760,y);let out=body.map((v,k)=>mix(v,leg[k],legWeight));
 const boundary=175+70*(1-smooth(880,1050,y))-35*smooth(1050,1240,y);const armWeight=smooth(boundary,boundary+65,ax)*(1-smooth(1200,1375,y))*smooth(635,690,y);
 out=out.map((v,k)=>mix(v,arm[k],armWeight));return out;
}
export function normalizeFemaleMesh(mesh,THREE){if(nativeGeometry.has(mesh))return;mesh.updateWorldMatrix(true,false);const native=mesh.geometry,derived=native.clone(),pos=derived.attributes.position,inv=mesh.matrixWorld.clone().invert(),v=new THREE.Vector3();nativeGeometry.set(mesh,native);
 for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i).applyMatrix4(mesh.matrixWorld);v.fromArray(standardizeFemalePoint(v.toArray())).applyMatrix4(inv);pos.setXYZ(i,v.x,v.y,v.z);}pos.needsUpdate=true;derived.computeVertexNormals();derived.computeBoundingBox();derived.computeBoundingSphere();mesh.geometry=derived;mesh.userData.displayNormalization='common-body-frame-v18';}
// The native coordinates must remain available when a source node is reused
// by more than one layer; a normalized display geometry is not a native hint.
export function nativeFemalePosition(mesh){return (nativeGeometry.get(mesh)||mesh.geometry).attributes.position;}
const normalizing=new WeakMap();
export async function normalizeFemaleMeshAsync(mesh,THREE,pause){
 if(normalizing.has(mesh))return normalizing.get(mesh);if(nativeGeometry.has(mesh))return;
 const task=(async()=>{mesh.updateWorldMatrix(true,false);const native=mesh.geometry,derived=native.clone(),pos=derived.attributes.position,inv=mesh.matrixWorld.clone().invert(),v=new THREE.Vector3();
  try{for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i).applyMatrix4(mesh.matrixWorld);v.fromArray(standardizeFemalePoint(v.toArray())).applyMatrix4(inv);pos.setXYZ(i,v.x,v.y,v.z);if((i+1)%1024===0)await pause();}
   pos.needsUpdate=true;derived.computeVertexNormals();await pause();derived.computeBoundingBox();derived.computeBoundingSphere();nativeGeometry.set(mesh,native);mesh.geometry=derived;mesh.userData.displayNormalization='common-body-frame-v18';
  }catch(error){derived.dispose();throw error;}
 })();normalizing.set(mesh,task);try{await task;}finally{normalizing.delete(mesh);}
}
export function bodyFrameInfo(){return {mode:'common-proportion teaching frame',sourceMeshesUnchanged:true,clinicalRegistration:false,planes:FRAME.planes,commonFrame:true};}
