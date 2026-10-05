/** Display labels only. Anchors are obstacles, never moved to make labels fit. */
export const overlaps=(a,b,pad=5)=>a.x<b.x+b.w+pad&&a.x+a.w+pad>b.x&&a.y<b.y+b.h+pad&&a.y+a.h+pad>b.y;
const anchorBox=p=>({x:p.x-5,y:p.y-5,w:10,h:10});
function clear(box,options,placed=[]){return box.x>=8&&box.y>=8&&box.x+box.w<=options.width-8&&box.y+box.h<=options.height-8&&!options.obstacles.some(b=>overlaps(box,b))&&!placed.some(b=>overlaps(box,b))&&!(options.anchors||[]).some(p=>overlaps(box,anchorBox(p),2));}
function result(item,box){return {...item,...box,tx:item.x,ty:item.y,sx:Math.max(box.x,Math.min(box.x+box.w,item.x)),sy:Math.max(box.y,Math.min(box.y+box.h,item.y))};}
export function placeLabels(items,{width,height,obstacles=[],anchors=[],limit=8,previous=new Map()}){
 const options={width,height,obstacles,anchors},placed=[];
 for(const item of items){
  if(placed.length>=limit)break;
  const w=Math.min(item.w||128,width-16),h=item.h||28,old=previous.get(item.key),offsets=[];
  if(old)offsets.push([old.dx,old.dy]);
  offsets.push([14,-h/2],[-w-14,-h/2],[14,-h-12],[-w-14,-h-12],[14,12],[-w-14,12],[-w/2,-h-16],[-w/2,16]);
  for(const d of [2,3,4])for(const dy of [-d*h-10,(d-1)*h+20])offsets.push([14,dy],[-w-14,dy]);
  let box=offsets.map(([dx,dy])=>({x:item.x+dx,y:item.y+dy,w,h})).find(q=>clear(q,options,placed));
  if(!box&&item.priority){
   const candidates=[];
   for(let y=8;y+h<=height-8;y+=8)for(let x=8;x+w<=width-8;x+=8){const q={x,y,w,h};if(clear(q,options,placed))candidates.push(q);}
   candidates.sort((a,b)=>Math.hypot(a.x+a.w/2-item.x,a.y+a.h/2-item.y)-Math.hypot(b.x+b.w/2-item.x,b.y+b.h/2-item.y));box=candidates[0];
  }
  if(box)placed.push(result(item,box));
 }
 return placed;
}
/** Available edge slots are measured from actual controls, not fixed margins. */
export function labelSlots({width,height,obstacles=[],anchors=[],labelWidth=140,labelHeight=28}){
 const options={width,height,obstacles,anchors},slots=[],w=Math.min(labelWidth,width-16),h=labelHeight;
 const xs=[8,width-w-8];
 for(let y=8;y+h<=height-8;y+=h+8){
  for(const x of xs){const box={x,y,w,h};if(clear(box,options,slots))slots.push(box);}
 }
 return slots;
}
export function placeCompleteLabels(items,slots){
 const available=slots.map(s=>({...s})),placed=[];
 for(const item of items){
  if(!available.length)break;
  let best=0,score=Infinity;
  for(let i=0;i<available.length;i++){
   const b=available[i],c=Math.abs(b.y+b.h/2-item.y)*1.5+Math.abs(b.x+b.w/2-item.x);
   if(c<score){score=c;best=i;}
  }
  placed.push(result(item,available.splice(best,1)[0]));
 }
 return placed;
}
