// Observation rules describe shown supports and task exposure, not personal clinical predictions.
const phoneIds=new Set(['sit-phone','stand-phone','stand-high-phone','work-phone-ear']);
export function loadContext(p,s=p.spec){
 const kind=s.box?'box':s.bag?'bag':s.backpack?'backpack':s.guitar?'guitar':p.id==='rest-game'?'controller':phoneIds.has(p.id)?'phone':null;
 const labels={box:'箱子',bag:'提袋',backpack:'背包',guitar:'吉他',controller:'游戏手柄',phone:'手机'};
 return {supported:!!kind,kind,label:labels[kind]||null,position:kind==='backpack'?'画面背包的近似中心':'画面'+(labels[kind]||'外物')+'的近似中心',reason:kind?null:s.tool?'工具与地面接触，推拉阻力及支撑分担尚未求解。':s.bike||s.steering?'握把或方向盘由车辆支撑，不能将其重量直接作为手持负荷。':'此姿势没有可计算的外物与对应作用位置。'};
}
export function taskObservation(p,s=p.spec){
 const f=new Set(p.flags),moving=!!p.actionState,repeated=f.has('repetition')||['sit-typing','sit-laptop','wipe-table'].includes(p.id),kind=moving?'activity':repeated?'mixed':'static';
 const label=kind==='activity'?'活动总时长':kind==='mixed'?'重复任务与姿势维持':'静态保持';
 const contact=s.bridge?'头部、肩背和足部的床面接触':s.bed?(s.lying==='left'?'左侧躯干、头与下肢':s.lying==='right'?'右侧躯干、头与下肢':s.lying==='prone'?'胸腹侧、头与下肢':'背侧、头与下肢'):s.forearmSupport?'双前臂与台面':s.handSupport||s.quadruped?'手掌与地面':s.kneeling?'膝部与地面':s.backSupport?'骨盆、靠背与足部':s.chair||s.floorSit?'骨盆与座面':s.water?'水体的分布承托':s.bike?'座垫、握把与脚踏':'足部与地面';
 return {kind,label,contact};
}
export function timeObservation(p,s,duration,interval){
 const task=taskObservation(p,s),changes=[];if(interval>0)for(let n=interval;n<duration;n+=interval)changes.push(n);
 const longestSegment=duration===0?0:interval>0?Math.min(duration,interval):duration;
 const text=duration===0?'当前时长为0，仅观察姿态，不累计任务时间。':task.kind==='activity'?`设定 ${duration} 分钟代表活动总时长，当前画面只是一个动作阶段；支撑与肌肉任务会随运动变化，不能把这一帧固定保持 ${duration} 分钟。`:task.kind==='mixed'?`设定 ${duration} 分钟包含躯干姿势维持和反复操作。静态维持与手部重复次数是不同暴露；动作频率、力度与实际休息尚未输入。`:`设定 ${duration} 分钟代表保持当前支撑和姿态。${task.contact}的接触位置可能持续不变；没有把分钟数换算成疲劳或接触压强。`;
 const plan=duration===0?'当前没有需要排入的换姿时间。':changes.length?`按你的计划，在第 ${changes.join('、')} 分钟换姿或换任务，共 ${changes.length} 次；最长连续任务段 ${longestSegment} 分钟。`:`本次 ${duration} 分钟内没有安排中途转换；连续任务段 ${longestSegment} 分钟。`;
 return {...task,text,plan,changes,longestSegment,plannedChanges:changes.length};
}
export function compareObservations(before,after){
 const lines=[];const a=before.analysis,b=after.analysis;
 const removed=before.supports.filter(x=>!after.supports.includes(x)),added=after.supports.filter(x=>!before.supports.includes(x));
 lines.push(added.length||removed.length?`支撑改变：${removed.length?'移除 '+removed.join('、')+'；':''}${added.length?'增加 '+added.join('、'):''}。接触名称变化不表示已知分担力或压力。`:'支撑名称相同；仍需比较躯干、四肢和外物位置，不能据此认定身体负担相同。');
 for(const [name,key] of [['腰背','lumbar'],['颈肩','neck'],['髋膝','knees']]){const x=key==='lumbar'?a.taskDescription+' '+a.lumbar.join(' '):key==='neck'?a.neck+' '+a.shoulders:a[key],y=key==='lumbar'?b.taskDescription+' '+b.lumbar.join(' '):key==='neck'?b.neck+' '+b.shoulders:b[key];lines.push({region:name,before:x,after:y,same:x===y});}
 if(a.loadContext.kind&&a.loadContext.kind===b.loadContext.kind&&a.load===b.load&&a.gravity===b.gravity&&a.lever!==null&&b.lever!==null)lines.push(`同一类${b.loadContext.label}、相同设定质量与重力：水平力臂由 ${a.lever.toFixed(3)} m 变为 ${b.lever.toFixed(3)} m。这里比较外物重力对腰部参照点的力矩，没有求身体内部受力。`);
 else if(a.loadContext.supported!==b.loadContext.supported)lines.push('两项的外物负荷适用性不同；没有外物的一项显示“不适用”，不能拿它与另一项的外力矩作身体负担高低排序。');
 else if(a.load!==b.load||a.gravity!==b.gravity||a.loadContext.kind!==b.loadContext.kind)lines.push('物体类型、设定质量或重力不同；当前数值变化同时包含条件变化，不能只归因于姿势。');
 if(a.bodyGravity&&b.bodyGravity){const x=a.bodyGravity,y=b.bodyGravity;lines.push(`人体参考质心高度由 ${x.center[1].toFixed(3)} m 变为 ${y.center[1].toFixed(3)} m；水平位置随当前姿态改变。质心不是肌肉或内部压力测量。`);lines.push(`选定上身分段的重力矩由 ${x.upper.moment.toFixed(1)} N·m 变为 ${y.upper.moment.toFixed(1)} N·m。${a.mass===b.mass&&a.gravity===b.gravity?'体重与重力设定相同，可以比较参考分段的位置变化。':'体重或重力设定不同，数值变化同时包含观察条件改变。'} 支撑分担、动态惯性与腰椎内力未求解，不能按数值给姿势排安全等级。`);if(!x.support.applicable||!y.support.applicable)lines.push('至少一项不满足仅足部同地面的静态条件，不把足骨包络内外作为两项的平衡对照。');}
 lines.push(`时间对照：前项为${a.time.label} ${a.duration} 分钟，当前为${b.time.label} ${b.duration} 分钟。前项计划 ${a.plannedChanges} 次转换，当前计划 ${b.plannedChanges} 次；计划不表示实际已休息，也不能推算恢复程度。`);
 return lines;
}
