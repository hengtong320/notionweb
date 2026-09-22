// Membership tables are produced and validated from the fixed bone inventory at build time.
function regionContains(id){
 return Boolean(REGION_MEMBERSHIP[state.region]?.[state.side]?.includes(id));
}
function defaultSelection(){
 const preferred={body:'sternum',head:'frontal',cervical:'C2',thoracic:'T6',spine:'T6',thorax:'sternum',lumbar:'L5',lumbosacral:'L5',pelvis:'sacrum'};
 return preferred[state.region]||BONES.find(b=>regionContains(b.id))?.id||'sternum';
}
