from pathlib import Path
import shutil,hashlib
root=Path('fullbody-tcm-v24')
p=root/'learning-enhancements.js';s=p.read_text()
a="labels.hidden=!(enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')&&pointsOn&&precisionMode==='illustrative');"
b="labels.hidden=!(enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')&&pointsOn&&namesOn&&precisionMode==='illustrative');"
assert a in s;s=s.replace(a,b,1)
s="import {FEMALE_FINGER_LANDMARKS} from './female-fingers-v24.js';\n"+s
old="hint.textContent='统一身材比例的女性教学显示；该点仍需女性局部标志复核。';"
new="hint.textContent=FEMALE_FINGER_LANDMARKS[p.code]?'女性手部按本模型的'+FEMALE_FINGER_LANDMARKS[p.code].digit+'表面作对应修正；甲角、关节与骨度分寸仍待逐穴复核。':'统一身材比例的女性教学显示；该点仍需女性局部标志复核。';"
assert old in s;s=s.replace(old,new,1);p.write_text(s)
assert hashlib.sha256(Path('fullbody-tcm-v12/assets/female/surface.glb').read_bytes()).hexdigest()=='a62b1a87c1fdeb264cbe3b364aae2f56a10169592277741918dbf0776feb23a0'
assert hashlib.sha256((root/'body-frame-v18.json').read_bytes()).hexdigest()=='acb5fe7c123321f81844e87930911cc69a6ecc8cc313b7401d8e9fe8e19ba7f9'
shutil.copy2('atlas24-repair/female-fingers-v24.js',root/'female-fingers-v24.js')
p=root/'skin-v17.js';s=p.read_text();s="import {FEMALE_FINGER_LANDMARKS} from './female-fingers-v24.js';\n"+s
old="const world=mapSource(v,c),s=solve(world,direction(v,c),c);"
new="const world=mapSource(v,c),finger=sex==='female'&&standardized?FEMALE_FINGER_LANDMARKS[c.code]?.[c.side]:null,s=finger?{skin:new THREE.Vector3(...finger.position),point:new THREE.Vector3(...finger.position).addScaledVector(new THREE.Vector3(...finger.normal).normalize(),.35),normal:new THREE.Vector3(...finger.normal).normalize()}:solve(world,direction(v,c),c);"
assert old in s;s=s.replace(old,new,1)
# Exact rays through x=99.55318156 can miss the numerical seam of mirrored
# male skin patches. Two tiny adjacent probes recover the real outer surface,
# rather than falling back 10-17 units to a lateral nearest point.
needle="const local=['hand','foot'].includes(c.region);"
assert needle in s
s=s.replace(needle,"if(c.side==='midline'){for(const dx of [-.02,.02]){const o=origin.clone();o.x+=dx;hits.push(...bvh.raycast(new THREE.Ray(o,d.clone().negate()),THREE.DoubleSide).filter(h=>h.point.distanceTo(world)<190));}}"+needle,1)
# Constrain intermediate samples to the same sagittal plane as their anchors.
needle='  const raw=skinRouteSamples(source,context,{sample,nearest:projectNear});'
assert needle in s
replacement="""  if(context.side==='midline'){
   projectNear=(v,aim)=>{const seed=v.clone();seed.x=99.55318156;const d=aim.clone();d.x=0;if(d.lengthSq()<1e-8)d.set(0,0,context.meridian==='CV'?1:-1);d.normalize();const h=sample(seed,{...context,projectionNormal:d.toArray()});return {point:h.point.clone(),normal:h.normal.clone()};};
  }
"""+needle
s=s.replace(needle,replacement,1);p.write_text(s)
f=Path('atlas24-repair/verify.cjs');s=f.read_text()
old="li.length===2&&li.every(p=>dist(p.position,p.sourcePosition)<45)"
new="li.length===2&&li.every(p=>sex==='female'?(p.position[1]>703&&p.position[1]<730&&(p.side==='right'?p.position[0]:199.10636311396956-p.position[0])<-230):dist(p.position,p.sourcePosition)<45)"
assert old in s;s=s.replace(old,new,1)
needle="let baseline=null;const bf="
extra=r'''
  for(const id of ['CV','GV']){const ps=d.routes.filter(r=>r.meridian===id).flatMap(r=>r.branches.flatMap(b=>b.points));const deviation=Math.max(...ps.map(v=>Math.abs(v[0]-99.55318156)));ck(sex+' '+id+' route stays on the midline instead of drifting sideways',ps.length>10&&deviation<.4,{maxLateralDeviation:deviation,allowedRenderingClearance:.35,seamProbe:.02});}
  if(sex==='female'){
   const targets={LU11:{y:[770,792],x:[-240,-217]},LI1:{y:[703,730],x:[-246,-230]},LI2:{y:[738,749],x:[-227,-212]},LI3:{y:[748,760],x:[-219,-203]},PC9:{y:[660,675],x:[-222,-204]}};
   for(const [code,box] of Object.entries(targets)){const ps=d.display.points.filter(p=>p.code===code);ck('Female '+code+' remains on its intended finger on both hands',ps.length===2&&ps.every(p=>{const x=p.side==='right'?p.position[0]:199.10636311396956-p.position[0];return x>box.x[0]&&x<box.x[1]&&p.position[1]>box.y[0]&&p.position[1]<box.y[1];}),ps.map(p=>({side:p.side,position:p.position})));}
  }
  '''
assert needle in s;s=s.replace(needle,extra+needle,1);f.write_text(s)
f=root/'README.md';s=f.read_text();s+='''\n## 女性手指对应与中线修正\n\n女性手势与男性原始手模不同，直接最近点投影会把少商落到食指、商阳落到中指、中冲落到无名指。对本模型的拇指、食指与中指表面分区重新建立显示对应，少商 LU11、商阳 LI1、二间 LI2、三间 LI3、中冲 PC9 共十个左右侧显示位置单独记录在 female-fingers-v24.js。该文件绑定原始女性皮肤及统一比例参数的 SHA256，不盲目用于其他模型。\n\n任督脉中间采样沿既有穴位的共同矢状面投影，避免颈部最近点计算把中线推向左右。男性左右皮肤区域的数值接缝用相邻0.02模型单位的射线补测，避免神阙、部分背部点位在正中射线漏检后被误推到一侧。仍取实际皮肤交点，并保留0.35模型单位的法线渲染间距，不强行穿透模型。\n\n手指归属按 WHO 2008 文字定位，经 SciCrunch/TARA 固定版本定位表核对；本次只校正模型的手指对应和贴面位置，并未完成甲角、掌指关节间隙、0.1同身寸等精细临床配准，卡片亦保留这一状态。原始 point-registration-v18.json 不改写。\n''';f.write_text(s)
print('Midline seam, female digit correspondence and label preference fixed; clinical registry unchanged')
