// Static vertical force balance only. Contact locations may range over each
// reference foot polygon, so force distribution is bounded rather than guessed.
// A basic feasible solution of the three balance equations uses at most three
// contact vertices. Enumerating those solutions gives exact bounds for this LP.
export function supportReactionBounds(footPolygons,projection,totalWeight){
 if(!(totalWeight>0)||!Number.isFinite(totalWeight))return {applicable:false,reason:'没有正的重力总载荷',actualForces:null};
 const vertices=Object.entries(footPolygons).flatMap(([side,points])=>points.map(([x,z])=>({x,z,left:side==='L'?1:0}))),[x,z]=projection;let minimum=Infinity,maximum=-Infinity,solutions=0;
 for(let i=0;i<vertices.length;i++)for(let j=i+1;j<vertices.length;j++)for(let k=j+1;k<vertices.length;k++){
  const a=vertices[i],b=vertices[j],c=vertices[k],bx=b.x-a.x,bz=b.z-a.z,cx=c.x-a.x,cz=c.z-a.z,det=bx*cz-bz*cx;if(Math.abs(det)<1e-12)continue;
  const v=((x-a.x)*cz-(z-a.z)*cx)/det,w=(bx*(z-a.z)-bz*(x-a.x))/det,u=1-v-w;if(Math.min(u,v,w)<-1e-9)continue;
  let left=Math.max(0,Math.min(1,u*a.left+v*b.left+w*c.left));if(left<1e-12)left=0;else if(1-left<1e-12)left=1;minimum=Math.min(minimum,left);maximum=Math.max(maximum,left);solutions++;
 }
 if(!solutions)return {applicable:false,reason:'没有满足垂直力与力矩平衡的非负支撑解',actualForces:null};
 return {applicable:true,totalWeight,fraction:{L:[minimum,maximum],R:[1-maximum,1-minimum]},force:{L:[minimum*totalWeight,maximum*totalWeight],R:[(1-maximum)*totalWeight,(1-minimum)*totalWeight]},feasibleExtremeSolutions:solutions,actualForces:null,assumptions:['参考足骨投影包络作为可用接触范围，足底软组织未校准','身体与已设外物在同一地面静止；忽略加速度与水平支撑力','以竖直非负接触力平衡总重及前后、左右力矩；区间内左右分担互补','没有实测压力中心，输出可行区间，不是个人实测反力、压力或内部关节力']};
}
