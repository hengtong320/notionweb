// Fixed labels for the user-requested full-body anatomy viewer.
const REGION_LABELS={body:['全身骨骼','Complete skeleton'],head:['头颅与舌骨','Skull & hyoid'],auditory:['听小骨','Auditory ossicles'],cervical:['颈椎 C1—C7','Cervical spine'],thoracic:['胸椎 T1—T12','Thoracic spine'],spine:['脊柱全览','Vertebral column'],thorax:['胸廓','Thoracic cage'],shoulder:['肩部','Shoulders'],upper:['上肢全览','Upper limbs'],elbow:['肘部','Elbows'],wrist:['腕部','Wrists'],hand:['手部','Hands'],foot:['足部','Feet'],ankle:['足踝连接','Ankles'],leg:['小腿与足','Lower legs & feet'],knee:['膝部骨骼','Knees'],whole:['下肢全览','Lower limbs'],hip:['髋部连接','Hip joints'],pelvis:['骨性骨盆','Bony pelvis'],'pelvic-limb':['骨盆与下肢','Pelvis & lower limbs'],lumbar:['腰椎 L1—L5','Lumbar spine'],lumbosacral:['腰骶与骨盆','Lumbosacral & pelvis'],all:['腰椎、骨盆与双下肢','Lumbar spine & lower limbs']};
const UPPER_REGIONS=new Set(Object.keys(REGION_LABELS).filter(x=>!['foot','ankle','leg'].includes(x)));
const FIXED_REGIONS=new Set(['pelvis','lumbar','lumbosacral','cervical','thoracic','spine']);
const LOWER_GROUPS=new Set(['thigh','leg','tarsal','metatarsal','phalanges','sesamoid']);
const HAND_GROUPS=new Set(['carpal','metacarpal','hand-phalanges']);
const ARM_GROUPS=new Set(['shoulder','arm',...HAND_GROUPS]);
const regionNames=Object.fromEntries(Object.entries(REGION_LABELS).map(([k,v])=>[k,v[0]]));
