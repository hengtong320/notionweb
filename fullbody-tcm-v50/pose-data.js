// Angles describe a teaching pose, not measured motion or validated joint limits.
export const SOURCES=[
 ['重力计算 · NASA','https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/weight-equation-2/'],
 ['姿势与持续时间 · OSHA','https://www.osha.gov/etools/computer-workstations/positions'],
 ['运动与关节力分析所需数据 · OpenSim','https://opensimconfluence.atlassian.net/wiki/spaces/OpenSim/pages/53089741'],
 ['浮力原理 · OpenStax','https://openstax.org/books/university-physics-volume-1/pages/14-4-archimedes-principle-and-buoyancy']
];
export const POSES=[
 {id:'stand',name:'站姿',category:'日常',phase:['双脚站立'],contact:['右脚','左脚'],static:true,note:'双脚与地面接触。图示不代表体重一定均分；可调整右侧支撑比例，比较假设下的分配。',joints:{}},
 {id:'sit',name:'坐姿',category:'日常',phase:['有支撑坐姿','前倾坐姿'],contact:['座面','右脚','左脚'],static:true,note:'座面和双脚分担支撑。身体前倾会改变重力作用线与支撑的相对位置；椎间盘压力、肌肉力量需要另行测量或建模。',joints:{hipR:[-90,0,0],hipL:[-90,0,0],kneeR:[90,0,0],kneeL:[90,0,0],elbowR:[-85,0,0],elbowL:[-85,0,0]}},
 {id:'lie',name:'躺姿',category:'日常',phase:['仰卧'],contact:['头背部','骨盆','双下肢'],static:true,note:'支撑由床面或地面分布提供。接触标记仅提示区域，不能据此计算局部压力或压伤风险。',root:[-90,0,0],joints:{}},
 {id:'meditate',name:'静坐',category:'日常',phase:['盘坐示意'],contact:['座面','双下肢'],static:true,note:'骨盆与下肢提供接触支撑。髋、膝角度是参考姿势；个体活动范围与软组织接触尚未校准。不要把模型姿势当作必须达到的角度。',joints:{hipR:[-90,-55,0],hipL:[-90,55,0],kneeR:[125,0,0],kneeL:[125,0,0],shoulderR:[-20,0,0],shoulderL:[-20,0,0],elbowR:[-70,0,0],elbowL:[-70,0,0]}},
 {id:'run',name:'跑步',category:'运动',phase:['右脚支撑','腾空','左脚支撑','腾空'],contact:[],static:false,note:'跑步包含支撑与腾空阶段。支撑时地面反力与身体加速度有关，不能直接用体重代替；当前没有测力台或运动捕捉数据。',joints:{}},
 {id:'swim',name:'游泳',category:'运动',phase:['右臂划水','左臂划水'],contact:['水体'],static:false,water:true,note:'水中同时存在重力、浮力和运动阻力。可输入排水体积估算浮力；未计算推进力、阻力、呼吸状态和实际游泳轨迹。',root:[90,0,0],joints:{}},
 {id:'tree',name:'瑜伽 · 树式',category:'瑜伽',phase:['右脚支撑','左脚支撑'],contact:[],static:true,note:'单脚支撑，另一侧下肢为摆放示意。平衡需要重力作用线与支撑范围配合；本模型没有肌肉控制和平衡求解，不判断姿势是否稳定。',joints:{}},
 {id:'warrior',name:'瑜伽 · 战士式',category:'瑜伽',phase:['右腿在前','左腿在前'],contact:['右脚','左脚'],static:true,note:'前后脚形成较宽支撑范围。膝、髋和踝受力需要地面反力、动作与肌肉模型；这里展示关节链和接触关系。',joints:{}},
 {id:'dog',name:'瑜伽 · 下犬式',category:'瑜伽',phase:['手脚支撑示意'],contact:['右手','左手','右脚','左脚'],static:true,note:'手脚共同支撑。骨架采用近似关节中心的刚体摆位；肩带、脊柱与手足接触仍需复核，不能据此判断关节负荷。',root:[135,0,0],joints:{hipR:[-95,0,0],hipL:[-95,0,0],ankleR:[-40,0,0],ankleL:[-40,0,0],shoulderR:[165,0,0],shoulderL:[165,0,0],wristR:[60,0,0],wristL:[60,0,0]}}
];
export function poseState(id,phase=0){
 const p=POSES.find(x=>x.id===id)||POSES[0],t=Math.max(0,Math.min(1,Number(phase)||0)),index=Math.min(p.phase.length-1,Math.floor(t*p.phase.length));
 const joints=Object.fromEntries(Object.entries(p.joints).map(([k,v])=>[k,[...v]]));let contact=[...p.contact];
 if(id==='sit')joints.trunk=[index?20:0,0,0];
 if(id==='run'){
  const frames=[[-10,15,25,100],[-40,25,30,110],[25,100,-10,15],[30,110,-40,25],[-10,15,25,100]],u=t*4,k=Math.min(3,Math.floor(u)),f=u-k,angles=frames[k].map((a,i)=>a+(frames[k+1][i]-a)*f);
  Object.assign(joints,{trunk:[10,0,0],hipR:[angles[0],0,0],hipL:[angles[2],0,0],kneeR:[angles[1],0,0],kneeL:[angles[3],0,0],ankleR:[-angles[0]-angles[1],0,0],ankleL:[-angles[2]-angles[3],0,0],shoulderR:[-angles[0]*.7,0,0],shoulderL:[-angles[2]*.7,0,0],elbowR:[-85,0,0],elbowL:[-85,0,0]});contact=index===0?['右脚']:index===2?['左脚']:[];
 }
 if(id==='swim'){const a=t*360;Object.assign(joints,{shoulderR:[a,0,0],shoulderL:[a+180,0,0],elbowR:[-25,0,0],elbowL:[-25,0,0],hipR:[Math.sin(t*Math.PI*4)*12,0,0],hipL:[-Math.sin(t*Math.PI*4)*12,0,0]});}
 if(id==='tree'){const side=index?'R':'L';Object.assign(joints,{['hip'+side]:[-35,index?-50:50,index?25:-25],['knee'+side]:[110,0,0],shoulderR:[0,0,-150],shoulderL:[0,0,150],elbowR:[-15,0,0],elbowL:[-15,0,0]});contact=index?['左脚']:['右脚'];}
 if(id==='warrior'){const front=index?'L':'R',back=index?'R':'L';Object.assign(joints,{['hip'+front]:[-45,0,0],['knee'+front]:[70,0,0],['hip'+back]:[30,0,0],['ankle'+front]:[-25,0,0],['ankle'+back]:[-30,0,0],shoulderR:[0,0,-75],shoulderL:[0,0,75]});}
 return {...p,joints,phaseIndex:index,phaseName:p.phase[index],contact};
}
export function calculate({mass=70,gravity=9.81,volume=65,density=1000,minutes=30,breakEvery=20,share=.5},pose){
 const m=Math.max(20,Math.min(200,Number(mass)||70)),g=Math.max(0,Math.min(20,Number(gravity)||0)),v=Math.max(0,Math.min(200,Number(volume)||0)),rho=Math.max(900,Math.min(1200,Number(density)||1000));
 const duration=Math.max(0,Math.min(1440,Number(minutes)||0));const weight=m*g,buoyancy=pose.water?rho*g*v/1000:0,seconds=duration*60;
 const staticSupport=pose.static?weight:null;const right=Math.max(0,Math.min(1,Number(share)||0));
 const distribution=pose.id==='stand'||pose.id==='warrior'?[{name:'右脚',force:weight*right},{name:'左脚',force:weight*(1-right)}]:pose.id==='tree'?[{name:pose.contact[0],force:weight}]:[];
 return {mass:m,gravity:g,weight,buoyancy,netWaterWeight:weight-buoyancy,staticSupport,distribution,seconds,changes:breakEvery>0?Math.max(0,Math.ceil(duration/Number(breakEvery))-1):0,clinicalPrediction:false};
}
