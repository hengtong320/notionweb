/** Screen labels only. Does not modify point positions or route geometry. */
export function placeLabels(items,{width,height,obstacles=[],limit=8,previous=new Map()}){
 const placed=[],margin=8,pad=5;
 const overlaps=(a,b)=>a.x<b.x+b.w+pad&&a.x+a.w+pad>b.x&&a.y<b.y+b.h+pad&&a.y+a.h+pad>b.y;
 for(const item of items){
  if(placed.length>=limit)break;
  const w=Math.min(item.w||128,width-2*margin),h=item.h||28;
  const old=previous.get(item.key),offsets=[];
  if(old)offsets.push([old.dx,old.dy]);
  offsets.push([14,-h/2],[-w-14,-h/2],[14,-h-12],[-w-14,-h-12],[14,12],[-w-14,12],[-w/2,-h-16],[-w/2,16]);
  for(const dy of [-h*2-10,h+20])offsets.push([14,dy],[-w-14,dy]);
  let box=null;
  for(const [dx,dy] of offsets){const q={x:item.x+dx,y:item.y+dy,w,h};
   if(q.x<margin||q.y<margin||q.x+w>width-margin||q.y+h>height-margin)continue;
   if(obstacles.some(b=>overlaps(q,b))||placed.some(b=>overlaps(q,b)))continue;
   box=q;break;
  }
  if(!box)continue;
  const sx=Math.max(box.x,Math.min(box.x+box.w,item.x)),sy=Math.max(box.y,Math.min(box.y+box.h,item.y));
  placed.push({...item,...box,sx,sy,tx:item.x,ty:item.y});
 }
 return placed;
}
