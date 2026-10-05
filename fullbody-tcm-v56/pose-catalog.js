// Each entry describes a distinct task/support arrangement. Angles are teaching targets, not measured individual motion.
export const REFERENCES={
 standing:{title:'久站与腰背不适 · NIOSH',url:'https://www.cdc.gov/niosh/bulletin/2014/standing.html'},
 posture:{title:'支撑与工作姿势 · OSHA',url:'https://www.osha.gov/etools/computer-workstations/positions'},
 duration:{title:'静态维持与重复动作 · OSHA',url:'https://www.osha.gov/etools/computer-workstations/work-process'},
 handling:{title:'弯腰、扭转与搬物 · NIOSH',url:'https://www.cdc.gov/niosh/engcontrols/ecd/detail25.html'},
 rest:{title:'卧躺支撑与活动 · NHS',url:'https://www.nbt.nhs.uk/our-services/a-z-services/emergency-zone/ed-miu-patient-information/back-injuries'},
 torque:{title:'外力矩原理 · OpenStax',url:'https://openstax.org/books/university-physics-volume-1/pages/10-6-torque'},
 motion:{title:'真实关节力所需数据 · OpenSim',url:'https://opensimconfluence.atlassian.net/wiki/spaces/OpenSim/pages/53089741'},
 buoyancy:{title:'水中浮力 · OpenStax',url:'https://openstax.org/books/university-physics-volume-1/pages/14-4-archimedes-principle-and-buoyancy'}
};
const arm=(flex=0,elbow=12,abd=5,handTurn=0)=>({flex,elbow,abd,handTurn});
const leg=(flex=0,knee=4,abd=0,yaw=0,roll=0)=>({flex,knee,abd,yaw,roll});
const relaxedArm=()=>arm(0,12,10);
const standing=o=>({height:.86,feet:['R','L'],armR:relaxedArm(),armL:relaxedArm(),legR:leg(),legL:leg(),...o});
const sitting=o=>standing({handsLap:!o.armR&&!o.armL,height:.49,legR:leg(90,90),legL:leg(90,90),armR:arm(5,75),armL:arm(5,75),chair:true,...o});
const lying=(kind,o={})=>({height:0,orientation:kind==='supine'?[-90,0,0]:kind==='prone'?[90,0,0]:kind==='left'?[-90,90,0]:[-90,-90,0],bed:true,lying:kind,feet:[],legR:leg(0,0),legL:leg(0,0),armR:arm(0,5,o.bridge||o.handTargetR||o.handTargetL||kind==='left'||kind==='right'?8:10),armL:arm(0,5,o.bridge||o.handTargetR||o.handTargetL||kind==='left'||kind==='right'?8:10),...o});
const squat=o=>standing({height:.37,pelvisTilt:25,bend:5,legR:leg(115,130,8),legL:leg(115,130,8),armR:arm(50,15),armL:arm(50,15),...o});
const kneel=o=>({height:.49,kneeling:true,feet:[],legR:leg(0,90),legL:leg(0,90),armR:relaxedArm(),armL:relaxedArm(),...o});
const all=[];
function add(id,name,category,create,options,explanation,flags=[]){all.push({id,name,category,spec:create(options),explanation,flags,refs:category==='卧躺'?['rest','posture']:category==='搬抬' || category==='家务'?['handling','duration']:category==='游泳'?['buoyancy','motion']:category==='站立'?['standing','posture','duration']:['posture','duration','motion'],dynamic:['出行运动','游泳'].includes(category),compare:null});}
// 16 sleep/rest arrangements, including explicitly different left/right support and knee placement.
add('supine','仰卧 · 双腿伸直','卧躺',o=>lying('supine',o),{},'床面承托躯干和下肢；腰椎原有曲线保留，不能把卧躺理解成腰部内部受力为零。');
add('supine-knees','仰卧 · 双膝屈曲','卧躺',o=>lying('supine',o),{legR:leg(45,90),legL:leg(45,90)},'双膝抬起，双脚靠近臀部；骨盆与腰背关系随屈髋改变。',['flexHip']);
add('supine-roll','仰卧 · 膝下垫枕','卧躺',o=>lying('supine',o),{legR:leg(18,30),legL:leg(18,30),kneePillow:true},'膝下支撑与伸腿仰卧是不同的支撑条件；比较腰背曲线与腿部承托，不把垫枕当成人人相同的治疗。');
add('supine-legs-chair','仰卧 · 小腿放凳上','卧躺',o=>lying('supine',o),{legR:leg(90,90),legL:leg(90,90),legBench:true},'小腿由较高支撑承托，髋膝屈曲；观察骨盆、腰背及床面支撑的变化。',['flexHip']);
add('supine-one-right','仰卧 · 右腿屈膝','卧躺',o=>lying('supine',o),{legR:leg(45,85)},'一腿伸直、一腿屈膝，左右髋的姿态不同；关注骨盆是否发生旋转。',['asymmetric']);
add('supine-one-left','仰卧 · 左腿屈膝','卧躺',o=>lying('supine',o),{legL:leg(45,85)},'左右与右腿屈膝相反，可对照骨盆与腰部的非对称支撑。',['asymmetric']);
add('supine-arms','仰卧 · 双手放头旁','卧躺',o=>lying('supine',o),{handTargetR:[-.22,.01,-.60],handTargetL:[.22,.01,-.60],elbowPoleR:[-.4,.01,-.40],elbowPoleL:[.4,.01,-.40]},'上肢不再贴躯干；肩部与床面的支撑位置改变，肩部不适不能仅由角度判断。',['armsUp']);
add('side-left','左侧卧 · 双腿微屈','卧躺',o=>lying('left',o),{legR:leg(25,40),legL:leg(25,40),armR:arm(30,80,10),armL:arm(25,80,12),headPillow:true},'左侧肩、躯干侧面和髋区域靠近床面；下侧肩承托与上侧腿摆放影响舒适度。',['sideSupport']);
add('side-right','右侧卧 · 双腿微屈','卧躺',o=>lying('right',o),{legR:leg(25,40),legL:leg(25,40),armR:arm(25,80,12),armL:arm(30,80,10),headPillow:true},'右侧为下侧支撑，不能沿用左侧标记；比较下侧肩和髋的接触区域。',['sideSupport']);
add('side-left-pillow','左侧卧 · 膝间夹枕','卧躺',o=>lying('left',o),{legR:leg(28,45,5),legL:leg(28,45),armR:arm(35,80),armL:arm(20,85),headPillow:true,betweenPillow:true},'膝间支撑将上侧腿与下侧腿分开，减少上侧腿直接压住下侧腿的摆放；不推断具体压力下降百分比。',['sideSupport']);
add('side-right-pillow','右侧卧 · 膝间夹枕','卧躺',o=>lying('right',o),{legR:leg(28,45),legL:leg(28,45,5),armR:arm(20,85),armL:arm(35,80),headPillow:true,betweenPillow:true},'与左侧夹枕相反，查看枕头是否真正位于两膝之间，而非悬浮在腿外。',['sideSupport']);
add('side-curl-left','左侧卧 · 蜷腿','卧躺',o=>lying('left',o),{legR:leg(65,100),legL:leg(65,100),armR:arm(45,110),armL:arm(40,110),headPillow:true},'屈髋、屈膝明显，躯干保持侧卧；与微屈腿状态对照，不要求使用者达到固定角度。',['flexHip','sideSupport']);
add('side-curl-right','右侧卧 · 蜷腿','卧躺',o=>lying('right',o),{legR:leg(65,100),legL:leg(65,100),armR:arm(40,110),armL:arm(45,110),headPillow:true},'蜷腿与伸腿的髋膝状态不同；右侧肩髋靠近床面。',['flexHip','sideSupport']);
add('prone','俯卧 · 手臂放两侧','卧躺',o=>lying('prone',o),{look:65},'胸腹侧由床面承托，头转向一侧；持续单侧转头可能增加颈部静态维持需求。',['neckTurn']);
add('prone-hip-pillow','俯卧 · 骨盆下垫枕','卧躺',o=>lying('prone',o),{look:-60,pelvisPillow:true,legR:leg(-5,8),legL:leg(-5,8)},'骨盆区域增加支撑，与直接俯卧对照腰背形态；枕头的高度与个人舒适度需要另外调整。',['neckTurn']);
add('recline-bed','半卧 · 靠垫阅读','卧躺',o=>lying('supine',o),{recline:35,bend:35,neck:15,armR:arm(30,95),armL:arm(30,95),backWedge:true,legR:leg(10,20),legL:leg(10,20)},'背部由靠垫承托，上肢持物；长时间低头和手臂悬持仍可能产生疲劳。',['neckFlex','armsHeld']);
// 16 sitting tasks.
add('sit-supported','坐姿 · 靠背双脚着地','坐姿',sitting,{backSupport:true},'腰背有靠背支撑、双脚着地；仍需改变姿势，靠背不意味着可以无限久坐。',['backSupported']);
add('sit-edge','坐姿 · 椅前沿无靠背','坐姿',sitting,{height:.48,legR:leg(85,85),legL:leg(85,85),armR:arm(10,65),armL:arm(10,65)},'无靠背时躯干肌群与被动组织共同参与维持；比较有靠背和无靠背的支撑区别。',['unsupported']);
add('sit-slouch','坐姿 · 骨盆后倾弓背','坐姿',sitting,{pelvisTilt:-12,bend:32,neck:8,armR:arm(12,85),armL:arm(12,85)},'骨盆后倾与腰背前屈同时存在；关注静态维持和姿势变化，不把弓背直接等同损伤。',['spineFlex','neckFlex']);
add('sit-recline','坐姿 · 靠背后倾','坐姿',sitting,{pelvisTilt:-18,backSupport:true,armR:arm(20,55),armL:arm(20,55)},'后倾靠背增加背部承托，脚仍需有支撑；与无靠背后仰不同。',['backSupported']);
add('sit-typing','坐姿 · 桌前打字','坐姿',sitting,{desk:true,armR:arm(10,85),armL:arm(10,85),neck:3},'前臂靠近水平、肘靠近身体；桌高、屏幕位置和反复输入都影响颈肩负担。',['repetition','armsHeld']);
add('sit-laptop','坐姿 · 低头看笔记本','坐姿',sitting,{desk:true,bend:15,neck:30,armR:arm(20,70),armL:arm(20,70)},'屏幕偏低伴随低头和前倾；颈肩维持与输入重复是不同的负担因素。',['neckFlex','spineFlex','repetition']);
add('sit-phone','坐姿 · 低头看手机','坐姿',sitting,{neck:38,bend:8,armR:arm(15,110,25),armL:arm(15,110,25)},'头部前屈、前臂持物，颈部和肩部需要持续维持；抬高屏幕与给前臂支撑可作对照。',['neckFlex','armsHeld']);
add('sit-read','坐姿 · 桌面阅读','坐姿',sitting,{desk:true,neck:22,armR:arm(10,95),armL:arm(12,90)},'桌面支撑书本，上肢不必一直托书；低头角度与持续时间仍需观察。',['neckFlex']);
add('sit-meal','坐姿 · 进食','坐姿',sitting,{desk:true,armR:arm(25,115),armL:arm(8,75),neck:10},'持餐具的上肢与另一侧动作不同，颈肩与肘腕反复动作需分开看。',['asymmetric','repetition']);
add('sit-drive','坐姿 · 驾驶','坐姿',sitting,{backSupport:true,armR:arm(35,65,12),armL:arm(35,65,12),legR:leg(75,65),legL:leg(80,70),steering:true},'靠背承托、双手握方向盘，脚部前伸；长时间固定姿态和实际道路振动不能由静态骨架计算。',['backSupported','armsHeld']);
add('sit-right-cross','坐姿 · 右腿交叠','坐姿',sitting,{legR:leg(100,110,-5,25),armR:arm(6,80),armL:arm(6,80),feet:['L']},'右腿离开地面并移向左侧，左右骨盆与支撑不对称。',['asymmetric']);
add('sit-left-cross','坐姿 · 左腿交叠','坐姿',sitting,{legL:leg(100,110,-5,-25),armR:arm(6,80),armL:arm(6,80),feet:['R']},'左腿交叠与右腿交叠相反；不能把单侧姿势的分析复制到另一侧而不改标记。',['asymmetric']);
add('sit-footrest','坐姿 · 双脚放脚踏','坐姿',sitting,{legR:{...leg(88,95),step:.16},legL:{...leg(88,95),step:.16},footrest:true,backSupport:true},'脚踏增加脚部支撑，腿不再悬垂；腰背仍需靠背与活动变化。',['backSupported']);
add('sit-high-stool','坐姿 · 高凳脚踏','坐姿',sitting,{height:.66,legR:{...leg(65,80),step:.19},legL:{...leg(65,80),step:.19},stool:true,footrest:true,armR:arm(12,70),armL:arm(12,70)},'高凳与普通椅的髋膝角不同；足部需要脚踏，不能把脚悬空标成地面支撑。',['unsupported']);
add('floor-long-sit','地面坐 · 双腿伸直','坐姿',o=>({...o,height:.16,feet:[],floorSit:true,legR:leg(90,0,4),legL:leg(90,0,4),armR:arm(20,35),armL:arm(20,35)}),{},'地面承托骨盆和腿，髋屈曲；腿后侧的活动范围与骨盆姿态因人而异。',['flexHip','unsupported']);
add('floor-cross-sit','地面坐 · 右腿在上盘腿','坐姿',o=>({...o,height:.16,feet:[],floorSit:true,handsKnees:true,footTargetR:[.07,.23,.30],footTargetL:[-.07,.067,.43],legR:{...leg(90,125,0,-40,-85),footYaw:60},legL:{...leg(90,125,0,40,85),footYaw:-60},armR:arm(25,85),armL:arm(25,85)}),{},'盘腿要屈髋、外展和旋转共同配合；不是把膝关节向侧面掰弯。',['flexHip','unsupported']);
// 12 standing configurations.
add('stand-relaxed','站立 · 放松双脚','站立',standing,{},'腰背、髋与下肢共同维持直立；久站不动可能出现腰背不适和下肢疲劳，应与行走及坐站转换对照。',['staticStanding']);
add('stand-wide','站立 · 宽站距','站立',standing,{height:.81,legR:leg(0,8,18),legL:leg(0,8,18)},'站距扩大了支撑范围，但不代表腰椎内部压力自动降低。',['staticStanding']);
add('stand-stagger','站立 · 前后分脚','站立',standing,{height:.82,legR:leg(18,10),legL:leg(-12,15)},'前后脚支撑不同，便于比较骨盆与腰背的姿态；没有自动平衡求解。',['asymmetric','staticStanding']);
add('stand-right-rest','站立 · 右脚放矮台','站立',standing,{height:.84,legR:{...leg(28,38),step:.18},footrest:true},'一脚在矮台、一脚在地面，屈髋改变骨盆姿态；台面支撑要与地面区别标记。',['asymmetric']);
add('stand-left-rest','站立 · 左脚放矮台','站立',standing,{height:.84,legL:{...leg(28,38),step:.18},footrest:true},'左脚抬高与右脚抬高相反，可轮换比较腰背与支撑方向。',['asymmetric']);
add('stand-wall','站立 · 背靠墙','站立',standing,{pelvisTilt:-4,wall:true,backSupport:true,legR:leg(5,5),legL:leg(5,5)},'墙提供额外接触，足部仍在地面；墙面分担多少力需要测量，不能按颜色估算。',['backSupported']);
add('stand-counter','站立 · 前臂靠柜台','站立',standing,{pelvisTilt:8,desk:true,armR:arm(15,90),armL:arm(15,90),forearmSupport:true},'柜台增加前臂支撑，可能减少肩部悬持需求；柜台高度不合适也会带来前倾。',['armsSupported']);
add('stand-phone','站立 · 低头看手机','站立',standing,{neck:35,armR:arm(10,120),armL:arm(10,120)},'久站与低头持物叠加，腰背静态维持和颈肩维持分别存在。',['staticStanding','neckFlex','armsHeld']);
add('stand-high-phone','站立 · 抬高手机','站立',standing,{neck:8,armR:arm(35,110),armL:arm(35,110)},'抬高手机减少低头，但手臂仍需悬持；不能说抬高手机就消除所有负担。',['staticStanding','armsHeld']);
add('stand-right-bag','站立 · 右手提袋','站立',standing,{armR:arm(0,10,12),load:5,loadSide:'R',bag:true,sideBend:-3},'单侧物体使外力矩偏向一侧；腰背需要维持身体与物体的平衡。',['staticStanding','load','asymmetric']);
add('stand-left-bag','站立 · 左手提袋','站立',standing,{armL:arm(0,10,12),load:5,loadSide:'L',bag:true,sideBend:3},'与右手提袋方向相反，比较腰背侧向负担与物体位置。',['staticStanding','load','asymmetric']);
add('stand-backpack','站立 · 背包前倾调整','站立',standing,{pelvisTilt:5,bend:5,backpack:true,load:6,loadSide:'back'},'背包在身体后方，身体前倾可改变整体姿态；肩带压力与实际重心需要额外数据。',['staticStanding','load']);
// 12 bending / load handling situations.
add('bend-hips','弯腰 · 髋部折叠','搬抬',standing,{height:.78,pelvisTilt:45,legR:leg(35,20),legL:leg(35,20),armR:arm(0,10),armL:arm(0,10)},'前倾主要来自髋部，腰背曲线相对保持；仍需腰背肌肉控制躯干重力产生的外力矩。',['hinge','unsupported']);
add('bend-round','弯腰 · 腰背前屈','搬抬',standing,{height:.78,pelvisTilt:15,bend:38,legR:leg(15,15),legL:leg(15,15),armR:arm(0,8),armL:arm(0,8)},'与髋部折叠相比，腰段前屈更多；角度不能直接换算椎间盘压力或损伤。',['spineFlex','unsupported']);
add('lift-close','搬箱 · 贴近身体','搬抬',standing,{armR:arm(10,90,8,-70),armL:arm(10,90,8,70),box:true,load:5},'物体靠近躯干，重力对腰部参照点的水平力臂较短；只计算物体外力矩。',['load','armsHeld']);
add('lift-far','搬箱 · 向前伸臂','搬抬',standing,{armR:arm(70,15,8,-70),armL:arm(70,15,8,70),box:true,load:5},'相同物体向前伸远，水平力臂增加；物体外力矩通常随距离增加，不代表已算内部压缩力。',['load','reach','armsHeld']);
add('lift-squat','搬箱 · 屈髋屈膝取物','搬抬',squat,{height:.40,armR:arm(10,35,10,-70),armL:arm(10,35,10,70),box:true,load:5},'髋膝屈曲靠近低处物体，腿部与躯干共同参与；没有哪一种动作对所有人都绝对安全。',['load','kneeFlex','hinge']);
add('lift-stoop','搬箱 · 直腿前屈取物','搬抬',standing,{height:.80,pelvisTilt:35,bend:25,legR:leg(25,10),legL:leg(25,10),armR:arm(0,10,6,-70),armL:arm(0,10,6,70),box:true,load:5},'腿部屈曲较少、躯干前倾较多；观察物体距离、腰背维持与重复次数的叠加。',['load','spineFlex']);
add('carry-chest','搬物 · 胸前抱箱','搬抬',standing,{armR:arm(30,110,14,-70),armL:arm(30,110,14,70),box:true,load:8},'抱在胸前减少物体向前伸远，但肩肘需要维持，视野也可能受影响。',['load','armsHeld']);
add('carry-low','搬物 · 双手低位提箱','搬抬',standing,{armR:arm(8,20,12,-70),armL:arm(8,20,12,70),box:true,load:8},'双手低位提物与胸前抱物的上肢状态不同；腰部参照点的力臂由实际物体位置决定。',['load']);
add('turn-load-right','搬物 · 持箱向右转身','搬抬',standing,{twist:-25,armR:arm(20,80,12,-70),armL:arm(20,80,12,70),box:true,load:5},'躯干扭转与持物叠加；转脚与转躯干是不同的运动策略。',['load','twist']);
add('turn-load-left','搬物 · 持箱向左转身','搬抬',standing,{twist:25,armR:arm(20,80,12,-70),armL:arm(20,80,12,70),box:true,load:5},'与向右转身相反，观察两侧髋与腰段的相对朝向。',['load','twist']);
add('place-high','搬物 · 放上高层架','搬抬',standing,{armR:arm(130,25,12,-70),armL:arm(130,25,12,70),shelf:true,box:true,load:3,neck:-12},'高举持物增加肩部悬持与平衡要求；不计算肌肉力量或允许重量。',['load','armsUp']);
add('pick-one-knee','搬物 · 单膝着地取物','搬抬',kneel,{height:.47,feet:['R'],kneeSides:['L'],legR:leg(90,90),legL:leg(0,90),armR:arm(35,20),armL:arm(35,20),pelvisTilt:12,load:3,box:true},'一膝与另一脚形成支撑，躯干靠近物体；膝部接触压力不能从骨架表面估算。',['asymmetric','load','kneeContact']);
// 12 housework configurations.
add('wash-dishes','家务 · 水槽前洗碗','家务',standing,{height:.85,pelvisTilt:12,bend:6,desk:true,armR:arm(20,80),armL:arm(20,80)},'台面过低会增加前倾，洗碗动作具有重复性；可与抬高工作面比较。',['spineFlex','repetition']);
add('cook-counter','家务 · 台面备菜','家务',standing,{desk:true,armR:arm(12,80),armL:arm(18,70),neck:15},'双手操作与低头观察，肩颈维持和手部反复动作同时存在。',['neckFlex','repetition']);
add('sweep','家务 · 扫地','家务',standing,{height:.82,pelvisTilt:12,armR:arm(25,55),armL:arm(45,20),legR:leg(8,12),legL:leg(-6,8),tool:'broom'},'前后分脚、两手高度不同；扫动方向、重复次数与腰背前倾需一起看。',['asymmetric','repetition']);
add('mop','家务 · 向前推拖把','家务',standing,{height:.74,pelvisTilt:18,bend:5,armR:arm(40,25),armL:arm(55,10),legR:leg(15,20),legL:leg(-10,12),tool:'mop'},'推拖把与扫地的伸臂距离不同；实际推力、摩擦与地面条件尚未输入。',['reach','repetition']);
add('vacuum','家务 · 吸尘','家务',standing,{height:.80,pelvisTilt:10,armR:arm(30,35),armL:relaxedArm(),legR:leg(10,15),legL:leg(-8,10),tool:'vacuum'},'单手推拉、另一臂放松；两侧负担不对称，实际吸头阻力没有计算。',['asymmetric','repetition']);
add('wipe-table','家务 · 擦低桌','家务',standing,{height:.76,pelvisTilt:35,bend:8,legR:leg(30,20),legL:leg(20,15),armR:arm(10,15),armL:arm(15,45),desk:true},'低桌令躯干前倾并向前伸手；给另一手支撑与缩短距离可作对照。',['spineFlex','reach']);
add('wipe-high','家务 · 擦高处窗面','家务',standing,{armR:arm(140,25,10),armL:relaxedArm(),neck:-15,window:true},'一侧上肢高举、头部仰看；肩部悬持与颈部维持是主要观察点。',['armsUp','neckExtension','repetition']);
add('laundry-low','家务 · 低处取衣','家务',squat,{height:.42,armR:arm(10,40,10),armL:arm(10,40,10),basket:true},'屈髋屈膝靠近衣篮；与站着弯腰取衣比较髋膝及腰背形态。',['kneeFlex']);
add('hang-clothes','家务 · 举臂晾衣','家务',standing,{armR:arm(145,20,15),armL:arm(145,20,15),neck:-10,rail:true},'双臂高举且反复摆放；模型没有肩部肌肉力，不以箭头长度表示肩负荷。',['armsUp','repetition']);
add('tie-shoe','家务 · 坐着系鞋带','家务',sitting,{height:.43,pelvisTilt:25,bend:30,neck:15,armR:arm(10,25,10),armL:arm(10,25,10),legR:leg(85,95),legL:leg(85,95)},'坐姿前倾、低头接近脚部；椅面仍承托骨盆，腰背处于前屈。',['spineFlex','neckFlex']);
add('garden-kneel','家务 · 跪姿园艺','家务',kneel,{pelvisTilt:18,bend:8,armR:arm(30,30),armL:arm(30,30)},'膝与胫骨区域靠近地面，躯干前倾；可比较跪垫与减少持续固定的条件。',['kneeContact','spineFlex']);
add('clean-floor','家务 · 四点支撑擦地','家务',o=>({...o,height:.445,pelvisTilt:75,feet:[],legR:leg(75,90),legL:leg(75,90),handTargetR:[-.20,.035,.57],handTargetL:[.20,.035,.57],handFlatR:true,handFlatL:true,quadruped:true}),{},'双手和双膝支撑，反复向前伸手会改变上肢与躯干的负担；不计算掌部压强。',['handContact','kneeContact','repetition']);
// 12 travel and motion snapshots.
add('walk-right','行走 · 右脚支撑','出行运动',standing,{height:.84,feet:['R'],legR:leg(8,8),legL:leg(25,45,3),armR:arm(-10,20,10),armL:arm(15,20,10),motion:'walk'},'支撑腿与摆动腿不同，地面反力随加速度变化；重量不能替代步态受力。',['dynamic','asymmetric']);
add('walk-left','行走 · 左脚支撑','出行运动',standing,{height:.84,feet:['L'],legL:leg(8,8),legR:leg(25,45,3),armL:arm(-10,20,10),armR:arm(15,20,10),motion:'walk'},'与右支撑相反；检查摆动脚离地和左右标记。',['dynamic','asymmetric']);
add('run-right','跑步 · 右支撑阶段','出行运动',standing,{height:.78,pelvisTilt:8,feet:['R'],legR:leg(18,22),legL:leg(-15,100),armR:arm(-15,85),armL:arm(30,85),motion:'run'},'跑步支撑常伴随较明显的屈髋屈膝与摆臂；真实地面反力需要测力数据。',['dynamic','asymmetric']);
add('run-left','跑步 · 左支撑阶段','出行运动',standing,{height:.78,pelvisTilt:8,feet:['L'],legL:leg(18,22),legR:leg(-15,100),armL:arm(-15,85),armR:arm(30,85),motion:'run'},'左支撑与右支撑互换，摆动脚保持离地。',['dynamic','asymmetric']);
add('run-flight','跑步 · 腾空阶段','出行运动',standing,{height:.98,pelvisTilt:8,feet:[],legR:leg(50,65),legL:leg(-20,110),armR:arm(-15,85),armL:arm(35,85),motion:'flight'},'腾空时没有地面支撑，身体受重力等外力；不能显示地面支撑箭头。',['dynamic']);
add('stairs-up-right','上台阶 · 右脚抬高','出行运动',standing,{height:.76,legR:{...leg(45,65),step:.22},legL:leg(-8,10),stepProp:true,armR:arm(-10,20,10),armL:arm(20,25,10)},'一脚在台阶、一脚在地面；髋膝活动和身体提升需要肌肉做功。',['dynamic','kneeFlex']);
add('stairs-up-left','上台阶 · 左脚抬高','出行运动',standing,{height:.76,legL:{...leg(45,65),step:.22},legR:leg(-8,10),stepProp:true,armL:arm(-10,20,10),armR:arm(20,25,10)},'左腿抬高，台阶位置随支撑脚变化；两侧不能用同一台阶落点。',['dynamic','kneeFlex']);
add('stairs-down','下台阶 · 前腿承接','出行运动',standing,{height:.76,legR:leg(25,40),legL:{...leg(-5,20),step:.18},stepProp:true,armR:arm(10,25),armL:arm(-10,25)},'下降阶段需要控制身体下落，屈膝承担制动；静态截图不代表瞬时冲击。',['dynamic','kneeFlex']);
add('jump-crouch','跳跃 · 起跳准备','出行运动',squat,{height:.54,pelvisTilt:20,legR:leg(55,75),legL:leg(55,75),armR:arm(-25,15),armL:arm(-25,15)},'髋膝屈曲、手臂向后；起跳力和落地冲击未由截图计算。',['dynamic','kneeFlex']);
add('jump-air','跳跃 · 空中伸展','出行运动',standing,{height:1.08,feet:[],legR:leg(10,15),legL:leg(10,15),armR:arm(150,10,15),armL:arm(150,10,15)},'双脚离地，上肢伸展；与有地面接触的起跳、落地阶段区别显示。',['dynamic','armsUp']);
add('jump-land','跳跃 · 屈膝落地','出行运动',squat,{height:.57,pelvisTilt:18,legR:leg(50,70),legL:leg(50,70),armR:arm(30,20),armL:arm(30,20)},'髋膝屈曲形成承接姿态；没有真实速度和地面反力时不提供冲击数值。',['dynamic','kneeFlex']);
add('cycle','骑行 · 前倾握把','出行运动',sitting,{height:.85,pelvisTilt:25,bend:10,feet:[],legR:leg(65,75),legL:leg(100,110),armR:arm(55,30),armL:arm(55,30),bike:true,chair:false},'座垫、双手和脚踏分担接触，左右腿阶段不同；实际踩踏力与车身振动未计算。',['dynamic','spineFlex','armsHeld']);
// 12 workplace and reaching situations.
add('work-standing','工作 · 站立键盘台','工作',standing,{desk:true,armR:arm(5,90),armL:arm(5,90),neck:2},'站立输入仍有静态维持和重复动作；与坐姿输入进行支撑对照。',['staticStanding','repetition']);
add('work-low-desk','工作 · 站着使用低桌','工作',standing,{height:.80,desk:true,pelvisTilt:22,bend:12,neck:15,armR:arm(10,70),armL:arm(10,70)},'过低工作面促使躯干和颈部前倾，腰背与颈肩一起维持。',['spineFlex','neckFlex','repetition']);
add('work-right-mouse','工作 · 右手远伸鼠标','工作',sitting,{desk:true,armR:arm(35,35,20),armL:arm(5,90),neck:8},'一侧伸得更远，肩部和上肢持续维持不同；把鼠标移近可作为条件对照。',['reach','asymmetric','repetition']);
add('work-left-mouse','工作 · 左手远伸鼠标','工作',sitting,{desk:true,armL:arm(35,35,20),armR:arm(5,90),neck:8},'与右手操作相反，两侧上肢的伸臂与肘角不同。',['reach','asymmetric','repetition']);
add('work-phone-ear','工作 · 持电话到右耳','工作',sitting,{handTargetR:[-.12,1.03,.09],elbowPoleR:[-.22,.70,.10],handTurnR:180,armR:arm(70,120,20),armL:arm(5,70,15),look:-8},'右肩肘维持手持电话，另一臂放松；与耳机免持的支撑需求不同。',['asymmetric','armsHeld']);
add('work-read-raised','工作 · 阅读架抬高书本','工作',sitting,{desk:true,neck:5,armR:arm(5,65),armL:arm(5,65),readingStand:true},'书本由阅读架支撑，头部相对抬高；减少低头不等于能持续不动。',['armsSupported']);
add('work-turn-right','工作 · 坐着向右看屏幕','工作',sitting,{twist:-20,look:-25,armR:arm(12,75),armL:arm(12,75),desk:true},'头和躯干朝向偏右；持续扭转与短时转头应区别观察。',['twist','neckTurn']);
add('work-turn-left','工作 · 坐着向左看屏幕','工作',sitting,{twist:20,look:25,armR:arm(12,75),armL:arm(12,75),desk:true},'与向右观看相反，肩带和骨盆相对朝向改变。',['twist','neckTurn']);
add('reach-shelf-right','取物 · 右手伸高架','工作',standing,{armR:arm(155,12,10),armL:relaxedArm(),neck:-10,shelf:true},'高举一侧肩，上肢与视线抬高；持续高举和短时取物不是同一种暴露。',['armsUp','asymmetric']);
add('reach-shelf-left','取物 · 左手伸高架','工作',standing,{armL:arm(155,12,10),armR:relaxedArm(),neck:-10,shelf:true},'左侧高举对应左肩活动，不能显示右侧接触。',['armsUp','asymmetric']);
add('reach-low-right','取物 · 右手向侧方低处','工作',standing,{height:.79,sideBend:15,armR:arm(10,15,25),armL:relaxedArm(),legR:leg(8,15),legL:leg(0,8)},'侧弯与单手伸取叠加；腰背存在侧向维持，该姿势尚未绑定持物位置，不能据此计算外物重力矩。',['asymmetric','sideBend']);
add('reach-low-left','取物 · 左手向侧方低处','工作',standing,{height:.79,sideBend:-15,armL:arm(10,15,25),armR:relaxedArm(),legL:leg(8,15),legR:leg(0,8)},'与右侧低处取物相反，关注腰段与骨盆的侧向姿态。',['asymmetric','sideBend']);
// 8 leisure configurations.
add('rest-sofa','休闲 · 沙发后靠','休闲',sitting,{height:.40,pelvisTilt:-22,backSupport:true,sofa:true,legR:leg(70,65),legL:leg(70,65),armR:arm(10,45),armL:arm(10,45)},'沙发靠背承托，但较低座面和脚部位置会改变髋膝姿态；仍要考虑持续不动。',['backSupported']);
add('rest-tv-side','休闲 · 侧坐看电视','休闲',sitting,{sofa:true,twist:28,look:15,legR:leg(80,90),legL:leg(95,105),armR:arm(15,55),armL:arm(15,55)},'骨盆仍朝座面前方，躯干与头偏转；与正对电视的姿态不同。',['twist','asymmetric']);
add('rest-guitar','休闲 · 坐姿弹吉他','休闲',sitting,{armR:arm(35,80,20),armL:arm(40,80,35),neck:18,legR:leg(95,95),legL:leg(85,85),guitar:true},'两臂任务不同且低头观察，坐姿支撑和上肢重复动作同时存在。',['asymmetric','repetition','neckFlex']);
add('rest-game','休闲 · 坐姿握游戏手柄','休闲',sitting,{neck:12,armR:arm(10,105),armL:arm(10,105),backSupport:true},'手柄靠近身体，前臂仍需维持；靠背不能消除手腕重复动作。',['backSupported','armsHeld','repetition']);
add('rest-picnic','休闲 · 地面屈膝坐','休闲',o=>({...o,height:.085,feet:['R','L'],floorSit:true,handsLap:true,lapHeight:.20,lapReach:.27,legR:leg(135,125,6),legL:leg(135,125,6),armR:arm(35,80),armL:arm(35,80)}),{},'骨盆在地面、双膝抬起，与盘腿不同；腰背没有靠背时需要维持躯干。',['flexHip','unsupported']);
add('rest-one-hand','休闲 · 地面坐单手后撑','休闲',o=>({...o,height:.10,feet:[],floorSit:true,pelvisTilt:-25,legR:{...leg(65,0,5),footPitch:25},legL:{...leg(65,0,5),footPitch:25},armR:arm(-35,5,20),armL:arm(25,70)}),{},'一侧手在身体后方支撑，肩腕接触与无手撑地面坐不同。',['handContact','asymmetric']);
add('rest-kneeling','休闲 · 跪坐脚跟','休闲',kneel,{height:.197,legR:leg(65,155,3),legL:leg(65,155,3),handsLap:true,heelSit:true},'膝屈曲较大、臀部靠近脚跟；个体膝踝活动范围和软组织压迫尚未评估。',['kneeFlex','kneeContact']);
add('rest-ball','休闲 · 半蹲接球','休闲',squat,{height:.64,pelvisTilt:12,legR:leg(38,55,8),legL:leg(38,55,8),armR:arm(65,35,15),armL:arm(65,35,15),ball:true},'髋膝屈曲与双手伸出共同形成准备姿态；球的冲击和实际反应速度没有建模。',['kneeFlex','armsHeld']);
// 12 yoga / movement practice snapshots. These are observation examples, not practice prescriptions.
add('yoga-mountain','瑜伽 · 山式','瑜伽',standing,{height:.86,legR:leg(0,3,2),legL:leg(0,3,2),armR:arm(0,5,10),armL:arm(0,5,10)},'观察身体直立与双脚支撑，不要求所有人按固定骨架达到同一对齐。',['staticStanding']);
add('yoga-tree-right','瑜伽 · 树式右脚支撑','瑜伽',standing,{feet:['R'],legL:leg(40,115,22,55,55),armR:arm(135,35,15),armL:arm(135,35,15)},'单脚支撑，另一髋外展旋转、膝屈曲；没有自动平衡求解。',['asymmetric','armsUp']);
add('yoga-tree-left','瑜伽 · 树式左脚支撑','瑜伽',standing,{feet:['L'],legR:leg(40,115,22,-55,-55),armR:arm(135,35,15),armL:arm(135,35,15)},'左右相反，抬起的腿不应出现地面支撑箭头。',['asymmetric','armsUp']);
add('yoga-warrior-right','瑜伽 · 战士式右腿在前','瑜伽',standing,{height:.70,legR:leg(50,75),legL:leg(-30,5),armR:arm(0,5,90),armL:arm(0,5,90)},'前后脚支撑、前膝屈曲、双臂展开；活动范围和姿势稳定性仍需个体验证。',['kneeFlex','armsHeld']);
add('yoga-warrior-left','瑜伽 · 战士式左腿在前','瑜伽',standing,{height:.70,legL:leg(50,75),legR:leg(-30,5),armR:arm(0,5,90),armL:arm(0,5,90)},'左前右后与右前左后区别显示，支撑脚不悬浮。',['kneeFlex','armsHeld']);
add('yoga-chair','瑜伽 · 椅式','瑜伽',squat,{height:.64,pelvisTilt:15,legR:leg(40,60),legL:leg(40,60),armR:arm(150,10,8),armL:arm(150,10,8)},'髋膝屈曲与双臂举起，需要下肢和躯干维持；不提供保持多久才安全的阈值。',['kneeFlex','armsUp']);
add('yoga-fold','瑜伽 · 站姿前屈','瑜伽',standing,{height:.79,pelvisTilt:65,bend:20,legR:leg(50,12),legL:leg(50,12),armR:arm(0,8),armL:arm(0,8)},'髋与腰背共同前屈；腿后侧柔韧性因人而异，骨架不代表必须触地。',['hinge','spineFlex']);
add('yoga-dog','瑜伽 · 下犬式','瑜伽',o=>({...o,height:.64,pelvisTilt:135,feet:['R','L'],armR:arm(-60),armL:arm(-60),legR:leg(95,3),legL:leg(95,3),handTargetR:[-.20,.035,.84],handTargetL:[.20,.035,.84],handFlatR:true,handFlatL:true,handSupport:true}),{},'骨盆抬高，双手双脚形成支撑；手腕、肩与腿后侧的范围不能由姿势名称推定。',['handContact','hinge']);
add('yoga-table','瑜伽 · 四点支撑','瑜伽',o=>({...o,height:.44,pelvisTilt:75,feet:[],legR:leg(75,90),legL:leg(75,90),handTargetR:[-.20,.035,.60],handTargetL:[.20,.035,.60],handFlatR:true,handFlatL:true,quadruped:true}),{},'双膝双手承托，背部接近水平；与下犬式的伸膝和足部支撑不同。',['handContact','kneeContact']);
add('yoga-cat','瑜伽 · 四点支撑弓背','瑜伽',o=>({...o,height:.45,pelvisTilt:70,bend:25,neck:15,feet:[],legR:leg(70,90),legL:leg(70,90),handTargetR:[-.20,.035,.60],handTargetL:[.20,.035,.60],handFlatR:true,handFlatL:true,quadruped:true}),{},'从四点支撑加入脊柱前屈，逐段观察腰背变化；不是把整块胸廓绕错误轴翻转。',['handContact','spineFlex']);
add('yoga-child','瑜伽 · 婴儿式前伸参考','瑜伽',kneel,{height:.23,pelvisTilt:90,bend:5,armR:arm(-60),armL:arm(-60),legR:leg(135,135,25),legL:leg(135,135,25),handTargetR:[-.20,.035,1.03],handTargetL:[.20,.035,1.03],handFlatR:true,handFlatL:true,handSupport:true},'宽膝前伸参考：双膝分开、躯干前倾、双臂前伸。当前尚未完成骨盆坐到脚跟、深屈曲软组织接触；请勿把它当作完整婴儿式或个体活动范围。',['kneeFlex','hinge','armsUp']);
add('yoga-bridge','瑜伽 · 仰卧桥式','瑜伽',o=>lying('supine',o),{bridge:true,orientation:[-110,0,0],height:.31,neck:20,feet:['R','L'],legR:leg(-10,100),legL:leg(-10,100),handTargetR:[-.22,.10,-.20],handTargetL:[.22,.10,-.20],elbowPoleR:[-.32,.10,-.42],elbowPoleL:[.32,.10,-.42],handFlatR:true,handFlatL:true},'肩背与双脚承托、骨盆抬高；与完全躺在床面不同，不按重量均分支撑。',['hipExtension']);
// The IK rotation prior also controls humeral twist; wrist reach alone
// does not establish a suitable shoulder surface orientation.
// 8 swimming states.
add('swim-prone-float','水中 · 俯漂伸展','游泳',o=>({...lying('prone',o),bed:false,water:true,height:.5}),{armR:arm(170,5,8),armL:arm(170,5,8)},'身体俯向水面、双臂前伸；浮力来自排水体积，而不是骨块体积。',['water']);
add('swim-back-float','水中 · 仰漂','游泳',o=>({...lying('supine',o),bed:false,water:true,height:.5}),{armR:arm(0,5,35),armL:arm(0,5,35)},'仰向水面、上肢展开；姿态不会自动给出实际排水量或平衡稳定性。',['water']);
add('swim-crawl-right','自由泳 · 右臂划水','游泳',o=>({...lying('prone',o),bed:false,water:true,height:.5}),{armR:arm(65,70,12),armL:arm(175,10,8),legR:leg(8,15),legL:leg(-8,5),look:-35},'一臂前伸、一臂划水，腿交替；推进力、水阻与呼吸轨迹需要动态测量。',['water','dynamic','asymmetric']);
add('swim-crawl-left','自由泳 · 左臂划水','游泳',o=>({...lying('prone',o),bed:false,water:true,height:.5}),{armL:arm(65,70,12),armR:arm(175,10,8),legL:leg(8,15),legR:leg(-8,5),look:35},'左右划水相反，上肢与转头方向分别对应。',['water','dynamic','asymmetric']);
add('swim-breast-pull','蛙泳 · 收臂屈腿','游泳',o=>({...lying('prone',o),bed:false,water:true,height:.5}),{armR:arm(80,100,40),armL:arm(80,100,40),legR:leg(30,100,15),legL:leg(30,100,15)},'双臂回收、双膝屈曲；髋外展和腿部回收与自由泳不同。',['water','dynamic','kneeFlex']);
add('swim-breast-glide','蛙泳 · 蹬腿后滑行','游泳',o=>({...lying('prone',o),bed:false,water:true,height:.5}),{armR:arm(178,5,4),armL:arm(178,5,4),legR:leg(0,2,3),legL:leg(0,2,3)},'手臂和腿伸展形成滑行姿态；身体外形与速度共同影响阻力，当前未计算。',['water','dynamic']);
add('swim-backstroke','仰泳 · 单臂回摆','游泳',o=>({...lying('supine',o),bed:false,water:true,height:.5}),{armR:arm(155,12,15),armL:arm(15,25,12),legR:leg(8,10),legL:leg(-8,5)},'仰卧于水中、双臂不同阶段；不能沿用俯卧自由泳的支撑说明。',['water','dynamic','asymmetric']);
add('swim-tread','水中 · 直立踩水','游泳',o=>({...standing(o),feet:[],water:true,height:.9}),{armR:arm(55,55,55),armL:arm(55,55,55),legR:leg(20,35,18),legL:leg(20,35,18)},'直立踩水没有地面支撑；浮力与主动划水共同影响身体，不能只靠静态浮力判断是否能浮起。',['water','dynamic']);
for(const p of all){if(['sit-supported','sit-edge','sit-slouch','sit-footrest','sit-high-stool','floor-long-sit'].includes(p.id))p.spec.lapHeight=.14;if(p.id==='floor-long-sit')p.spec.lapReach=.27;if(['sit-right-cross','sit-left-cross','rest-tv-side'].includes(p.id))p.spec.lapHeight=.16;if(p.id==='sit-slouch'){p.spec.lapHeight=.16;p.spec.lapReach=.21;}if(p.id==='sit-recline'){p.spec.lapHeight=.16;p.spec.lapReach=.21;}if(p.id==='rest-sofa'){p.spec.lapHeight=.18;p.spec.lapReach=.21;}if(['sit-edge','sit-slouch','sit-recline','sit-high-stool','sit-right-cross','sit-left-cross','rest-sofa','rest-tv-side'].includes(p.id))p.spec.handsLap=true;if(['bend-hips','bend-round','lift-stoop','yoga-fold'].includes(p.id)){for(const side of ['R','L'])p.spec['arm'+side].flex=(p.spec.pelvisTilt||0)+(p.spec.bend||0);}if(p.id==='rest-one-hand'){p.spec.lapReach=.17;p.spec.handTargetR=[-.25,.035,-.30];p.spec.elbowPoleR=[-.35,.15,-.14];p.spec.handFlatR=true;p.spec.handSides=['R'];p.spec.handSupport=true;}if(p.spec.desk){for(const side of ['R','L'])p.spec['arm'+side].handTurn=side==='R'?-90:90;}if(p.spec.lying==='left'||p.spec.lying==='right'){const left=p.spec.lying==='left',x=left?1:-1,lower=left?'L':'R',upper=left?'R':'L';p.spec['handTarget'+lower]=[x*.25,-.14,-.51];p.spec['handTarget'+upper]=[x*.31,.13,-.35];p.spec['elbowPole'+lower]=[x*.36,-.30,-.30];p.spec['elbowPole'+upper]=[x*.40,.30,-.20];}p.actionState=p.dynamic;p.dynamic=p.id.includes('crawl')||['walk','run'].includes(p.spec.motion);}
// Explicit ground anchors keep the feet under the task while hips counter-shift.
// These are reference task configurations, not an automatic balance optimizer.
for(const [id,height,z,tilt,bend] of [['bend-hips',.78,-.16,45,0],['bend-round',.79,-.14,15,38],['lift-stoop',.85,-.18,35,25],['yoga-fold',.82,-.22,65,20]]){
 const p=all.find(p=>p.id===id);Object.assign(p.spec,{height,position:[0,height,z],pelvisTilt:tilt,bend});
 for(const side of ['R','L']){const x=side==='R'?-.11:.11;p.spec['footTarget'+side]=[x,.067,0];p.spec['kneePole'+side]=[x,.45,.30];}
}
for(const side of ['R','L']){const right=side==='R',p=all.find(p=>p.id==='reach-low-'+(right?'right':'left')),x=right?.055:-.055;Object.assign(p.spec,{height:.79,position:[x,.79,-.025]});for(const foot of ['R','L']){const fx=foot==='R'?-.14:.14;p.spec['footTarget'+foot]=[fx,.067,0];p.spec['kneePole'+foot]=[fx,.45,.3];}}
for(const side of ['R','L']){const right=side==='R',other=right?'L':'R',p=all.find(p=>p.id==='yoga-tree-'+(right?'right':'left')),x=right?-.10:.10;Object.assign(p.spec,{height:.86,position:[x,.86,0]});p.spec['footTarget'+side]=[right?-.07:.07,.067,0];p.spec['kneePole'+side]=[x,.45,.3];p.spec['leg'+other]={flex:30,knee:120,abd:35,yaw:right?45:-45,roll:0,footEuler:[90,0,right?-90:90]};p.spec['footTarget'+other]=[right?.10:-.10,.53,.01];p.spec['kneePole'+other]=[right?.40:-.40,.8,.07];p.explanation='单脚承重，骨盆移向承重脚；另一髋外展、膝屈曲。参考质心与足骨投影用于检查摆位，不代表个体平衡能力。';}
for(const id of ['bend-hips','bend-round','yoga-fold']){const p=all.find(p=>p.id===id);for(const side of ['R','L'])p.spec['arm'+side].abd=15;}
export const POSES=all;
export const CATEGORIES=[...new Set(all.map(p=>p.category))];
const pairs=[['supine','supine-roll'],['side-left','side-left-pillow'],['side-right','side-right-pillow'],['sit-supported','sit-edge'],['sit-typing','sit-laptop'],['sit-phone','sit-read'],['stand-relaxed','stand-counter'],['stand-phone','stand-high-phone'],['bend-hips','bend-round'],['lift-close','lift-far'],['lift-squat','lift-stoop'],['yoga-table','yoga-cat'],['swim-breast-pull','swim-breast-glide']];
for(const [a,b]of pairs){all.find(p=>p.id===a).compare=b;all.find(p=>p.id===b).compare=a;}
export function stateFor(p,phase=0){const s=structuredClone(p.spec);if(!p.dynamic)return s;const t=Math.max(0,Math.min(1,phase));if(p.category==='游泳'&&p.id.includes('crawl')){const side=p.id.endsWith('right')?'R':'L',other=side==='R'?'L':'R';s['arm'+side].flex=65+(155-65)*t;s['arm'+other].flex=175-(160*t);s['leg'+side].flex=8-16*t;s['leg'+other].flex=-8+16*t;}else if(p.spec.motion==='walk'||p.spec.motion==='run'){const side=p.id.endsWith('right')?'R':'L',other=side==='R'?'L':'R';s['leg'+other].flex+=(p.spec.motion==='run'?35:20)*t;s['leg'+other].knee=Math.max(25,s['leg'+other].knee-25*t);s['arm'+side].flex+=20*t;s['arm'+other].flex-=20*t;}return s;}
