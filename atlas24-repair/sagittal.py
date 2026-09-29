from pathlib import Path
root=Path('fullbody-tcm-v24')
(root/'midline-v24.js').write_text(r'''import * as THREE from 'three';
// Real triangle/plane intersections. Never snap x after finding a point on
// another body region. This is geometric display binding, not clinical review.
export function createSagittalContact(geometry,bvh,faceNormal){
 let profile=null;const middle=99.55318156;
 function build(){
  profile=[];const a=geometry.attributes.position,index=geometry.index;
  for(const x of [middle-.02,middle+.02])for(let i=0;i<index.count;i+=3){
   const ids=[index.getX(i),index.getX(i+1),index.getX(i+2)],hits=[];
   for(let k=0;k<3;k++){const j=ids[k],l=ids[(k+1)%3],dx=a.getX(j)-x,ex=a.getX(l)-x;if(dx*ex>=0)continue;const t=dx/(dx-ex);hits.push([x,a.getY(j)+(a.getY(l)-a.getY(j))*t,a.getZ(j)+(a.getZ(l)-a.getZ(j))*t]);}
   if(hits.length===2)profile.push({a:hits[0],b:hits[1],faceIndex:i/3});
  }
  if(!profile.length)throw Error('当前皮肤缺少可用的正中断面');
 }
 return (v,aim)=>{
  if(!profile)build();let best=Infinity,h=null;
  for(const s of profile){const [ax,ay,az]=s.a,[bx,by,bz]=s.b,dy=by-ay,dz=bz-az,t=Math.max(0,Math.min(1,((v.y-ay)*dy+(v.z-az)*dz)/(dy*dy+dz*dz||1))),y=ay+t*dy,z=az+t*dz,d=(v.x-ax)**2+(v.y-y)**2+(v.z-z)**2;if(d<best){best=d;h={point:new THREE.Vector3(ax,y,z),faceIndex:s.faceIndex};}}
  const d=aim.clone();d.x=0;if(d.lengthSq()<1e-8)d.set(0,0,1);d.normalize();
  const outer=bvh.raycastFirst(new THREE.Ray(h.point.clone().addScaledVector(d,12),d.clone().negate()),THREE.DoubleSide);
  if(outer&&outer.point.distanceTo(h.point)<8)h=outer;
  const normal=faceNormal(h,d);return {skin:h.point.clone(),point:h.point.clone().addScaledVector(normal,.35),normal};
 };
}
''')
f=root/'skin-v17.js';s=f.read_text();s="import {createSagittalContact} from './midline-v24.js';\n"+s
old=' function solve(world,d,c={})';assert old in s;s=s.replace(old,' const sagittalNearest=createSagittalContact(geometry,bvh,faceNormal);\n'+old,1)
old='if(!hit){fallbacks++;const near=bvh.closestPointToPoint(world);';assert old in s;s=s.replace(old,"if(!hit&&c.side==='midline'){fallbacks++;return sagittalNearest(world,d);}"+old,1)
old='const h=sample(seed,{...context,projectionNormal:d.toArray()});return {point:h.point.clone(),normal:h.normal.clone()};';assert old in s;s=s.replace(old,'return sagittalNearest(seed,d);',1);f.write_text(s)
f=root/'README.md';s=f.read_text();s+='''\n## 正中断面的缺口处理\n\n任督脉中间段及正中射线漏检的局部，使用原皮肤三角网格与相邻正中矢状面的真实交线作投影参照，而非投向附近的一侧皮肤，或事后强行把x坐标改成中线。头顶部、脐部等分片接缝因此不再导致左右漂移。原网格存在间隙时仍保留线路分段，不虚构横跨空白的皮肤，也不把会阴等待复核区域升级为已准确取穴。\n''';f.write_text(s)
print('Midline interpolation now uses actual sagittal skin intersections; anatomical gaps are not fabricated')
