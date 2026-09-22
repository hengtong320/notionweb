function matchingSide(b,side){
 return BONES.find(x=>x.baseId===b.baseId&&x.side===side)?.id;
}
function revealBone(id){
 if(!state.ready||regionContains(id))return;
 const item=BY_ID[id];
 state.side=item.side==='midline'?'both':item.side;
 setRegion(item.studyRegion);
}
