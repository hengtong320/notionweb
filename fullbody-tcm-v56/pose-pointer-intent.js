// A point selection requires one quiet primary-pointer gesture. Keep its full
// travel history: a drag returning to its origin is still a drag.
export function createPointerIntent(tolerance=5){
 const pointers=new Map();
 return {
  down(event){
   const quiet=event.button===0&&event.isPrimary!==false&&!event.altKey&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey;
   pointers.set(event.pointerId,{x:event.clientX,y:event.clientY,quiet});
   if(pointers.size>1)for(const point of pointers.values())point.quiet=false;
  },
  move(event){
   const point=pointers.get(event.pointerId);
   if(point&&Math.hypot(event.clientX-point.x,event.clientY-point.y)>tolerance)point.quiet=false;
  },
  up(event){
   this.move(event);const point=pointers.get(event.pointerId);pointers.delete(event.pointerId);
   return !!point?.quiet&&pointers.size===0&&event.button===0;
  },
  cancel(event){pointers.delete(event.pointerId);},
  clear(){pointers.clear();}
 };
}
