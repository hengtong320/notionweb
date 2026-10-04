import {REFERENCES} from './pose-catalog.js';
const safe=(n,min,max,fallback)=>Number.isFinite(Number(n))?Math.max(min,Math.min(max,Number(n))):fallback;
export function analyze(p,spec,input,loadPoint,lumbarPoint){
 const mass=safe(input.mass,20,200,70),gravity=safe(input.gravity,0,20,9.81),load=safe(input.load,0,40,p.spec.load||0),duration=safe(input.minutes,0,480,30),interval=safe(input.interval,0,120,20),volume=safe(input.volume,0,200,65);
 const lever=loadPoint&&lumbarPoint?Math.hypot(loadPoint[0]-lumbarPoint[0],loadPoint[2]-lumbarPoint[2]):null;
 const flags=new Set(p.flags),notes=[];
 if(p.category==='卧躺')notes.push('床面在多个区域承托身体，腰背不必像站立一样维持直立。腰椎仍有内部力，具体舒适程度取决于支撑、曲线与个体情况。');
 else if(flags.has('staticStanding'))notes.push('腰背、髋和下肢肌肉共同维持直立。长时间主要站在原地与腰背不适、疲劳及下肢不适有关；这并不表示站到某一分钟就会损伤腰椎。');
 else if(p.spec.chair&&flags.has('backSupported'))notes.push('椅面承托骨盆，靠背提供额外支撑。腰背维持需求与无靠背状态不同；支撑良好也需要活动和姿势变化。');
 else if(p.spec.chair||p.spec.floorSit)notes.push('座面承托骨盆；没有靠背时，腰背肌肉需要持续控制躯干。坐姿的屈髋与骨盆倾斜会改变腰段形态。');
 else if(flags.has('water'))notes.push('水中浮力参与承托，身体仍需控制姿态。骨块不能提供实际人体排水体积，水阻和划水推进力也尚未计算。');
 else notes.push('腰背与髋共同控制躯干和骨盆。姿态改变了外力作用线与身体部位的相对位置，但不能仅靠骨架角度求真实关节力。');
 if(flags.has('spineFlex'))notes.push('当前腰背前屈更多。前屈本身不是损伤判断；持续固定、负重、伸远和反复动作需要一起考虑。');
 if(flags.has('hinge'))notes.push('前倾主要由髋部折叠参与，腰背仍要控制躯干；不能把腰背保持形状理解成腰部完全不受力。');
 if(flags.has('twist')||flags.has('sideBend'))notes.push('躯干旋转或侧弯形成不同方向的维持需求；持物时尤其要同时看负荷位置和持续方式。');
 if(gravity===0)notes.push('重力引起的重量与物体外力矩为0。画面的接触姿态只是摆位示意，不能据此认定仍靠脚承重；主动运动和约束力未求解。');
 if(load>0)notes.push('物体重力对腰部参照点产生外力矩。相同重量放得更远，水平力臂更大；这不是椎间盘压强或脊柱压缩力。');
 const neck=flags.has('neckFlex')?'低头需要颈肩持续控制头部；把物体抬高可能减少低头，但上肢悬持也需观察。':flags.has('neckTurn')?'头部偏转，一侧颈部持续维持与短时转头不同。':flags.has('neckExtension')?'仰看与举臂叠加，颈部和肩部处于不同于放松站姿的状态。':'当前头颈大体随躯干；没有计算颈部肌肉力或神经张力。';
 const shoulders=flags.has('armsUp')?'上肢举起，肩部肌肉需要维持或推动手臂；肩关节接触力未计算。':flags.has('armsSupported')?'台面承托部分上肢，和悬持相比支撑条件不同；分担比例需测量。':flags.has('armsHeld')||load>0?'上肢悬持或持物，肩肘需要维持；物体越远，外力矩与平衡要求越不同。':flags.has('handContact')?'手掌支撑身体，手腕与肩带参与承托；标记不是掌部压力分布。':'观察肩臂的自然摆放与支撑；没有把骨块颜色当作肌肉激活。';
 const knees=flags.has('kneeContact')?'膝区域与地面或垫面接近，接触压力与软组织承托没有建模。':flags.has('kneeFlex')?'髋膝屈曲改变关节链形态，静态维持或动作控制需要下肢参与；未计算膝内部接触力。':flags.has('asymmetric')?'左右下肢或上肢状态不同，支撑不能默认均分。':'髋膝和足部共同构成下肢支撑；真实受力还取决于动作与地面反力。';
 const timeText=duration===0?'当前时长为0，仅观察姿态；没有累积保持时间。':p.actionState?'持续时间代表这项活动的设定总时长，不能理解成始终保持当前动作截图。动作频率、强度与恢复间隔仍需额外记录。':'保持同一状态的时间增加，会延长静态维持和局部接触的暴露；实际疲劳、疼痛和耐受差异很大，没有统一分钟阈值。';
 const refs=[...new Set([...p.refs,'torque',flags.has('staticStanding')?'standing':'duration'])].map(k=>REFERENCES[k]);
 return {mass,gravity,load,duration,interval,weight:mass*gravity,loadWeight:load*gravity,lever,externalMoment:lever===null?null:load*gravity*lever,buoyancy:spec.water?1000*gravity*volume/1000:null,netWaterWeight:spec.water?mass*gravity-1000*gravity*volume/1000:null,plannedChanges:interval>0?Math.max(0,Math.ceil(duration/interval)-1):0,lumbar:notes,neck,shoulders,knees,timeText,refs,clinicalPrediction:false,internalJointForce:null,damageProbability:null};
}
