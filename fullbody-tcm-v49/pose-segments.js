// Rigid teaching attachments preserve source bone dimensions. Rib heads are
// grouped with their numbered thoracic level; cartilage and joint mechanics
// are not solved by these transforms.
export function boneSegment(b){
 const s=b.side==='left'?'L':'R';
 if(['cervical','thoracic','lumbar'].includes(b.group))return b.id;
 if(['cranial','facial','head-other'].includes(b.group))return 'head';
 if(b.group==='shoulder')return 'T2';
 if(b.group==='thorax')return b.id.startsWith('rib-')?'T'+b.id.split('-')[1]:'T6';
 if(b.group==='pelvis')return 'pelvis';
 if(b.group==='arm')return b.id.startsWith('humerus')?'shoulder'+s:'elbow'+s;
 if(['carpal','metacarpal','hand-phalanges'].includes(b.group))return 'wrist'+s;
 if(b.group==='thigh')return b.id.startsWith('patella')?'patella'+s:'hip'+s;
 if(b.group==='leg')return 'knee'+s;
 return 'ankle'+s;
}
export const isTrunkBone=mesh=>['thorax','thoracic','shoulder'].includes(mesh.userData.info.group);
export const belongsToSegment=(mesh,id)=>id==='trunk'?isTrunkBone(mesh):mesh.userData.segment===id;
