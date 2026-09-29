"""Build V25 from the released V24; immutable model and point data are preserved."""
from pathlib import Path
import shutil,hashlib,json
p=Path('fullbody-tcm-v25');base=Path('fullbody-tcm-v24')
assert not p.exists(),'Refuse to overwrite an existing release'
shutil.copytree(base,p)
shutil.rmtree(p/'checks',ignore_errors=True)
for name in ['release.json','build-info.json']:(p/name).unlink(missing_ok=True)
for f in p.iterdir():
 if f.suffix in ['.js','.html','.css'] and f.name!='app.bundle.js':
  s=f.read_text().replace('24.0.0','25.0.0').replace('V24 · 经络贴肤与线条优化','V25 · 经络曲线与笔触').replace('fullbody-tcm-v24/','fullbody-tcm-v25/').replace('-V24','-V25')
  f.write_text(s)
def edit(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:90]);f.write_text(s.replace(old,new,1))
shutil.copy2('atlas25-repair/surface-path-v25.js',p/'surface-path-v25.js')
edit('skin-v17.js',"import {createSagittalContact}","import {repairDigitPaths} from './surface-path-v25.js';\nimport {createSagittalContact}")
edit('skin-v17.js','  const fairing=relaxSkinSamples(raw,projectNear);',"  const contact=(v,aim)=>{const h=bvh.closestPointToPoint(v);if(!h)return null;const normal=faceNormal(h,aim);return {point:h.point.clone().addScaledVector(normal,.35),normal};};\n  const digitRepair=repairDigitPaths(raw,geometry,bvh,context,projectNear,contact);\n  const fairing=relaxSkinSamples(raw,projectNear);")
edit('skin-v17.js','traceDiagnostics:{...fairing,sourceKnotCount','traceDiagnostics:{...fairing,digitRepair,sourceKnotCount')
edit('skin-v17.js',"key:sex+'-skin-v24'","key:sex+'-skin-v25'")
edit('skin-route-v24.js'," return {intermediateUpdates:moved,maxIntermediateMove:maxMove,numberedAnchorsMoved:0,method:'target-skin centripetal interpolation with fixed landmarks and bounded surface relaxation'};",r""" function bends(i,replacement){let sum=0,max=0;const p=j=>j===i?replacement:raw[j].point;
  for(let j=Math.max(1,i-1);j<=Math.min(raw.length-2,i+1);j++){
   const a=p(j).clone().sub(p(j-1)),b=p(j+1).clone().sub(p(j)),la=a.length(),lb=b.length();
   if(la<.03||lb<.03||la>7||lb>7)return null;
   const t=a.angleTo(b);sum+=t;max=Math.max(max,t);
  }return {sum,max};
 }
 // Accept a surface projection only when affected bends improve and no
 // neighboring turn becomes sharper. Numbered anchor positions never move.
 for(let pass=0;pass<8;pass++)for(let i=1;i<raw.length-1;i++){
  const a=raw[i-1],r=raw[i],b=raw[i+1];if(r.anchor||r.point.distanceTo(a.point)>7||r.point.distanceTo(b.point)>7)continue;
  const q=a.point.clone().add(b.point).multiplyScalar(.2).addScaledVector(r.point,.6),h=nearest(q,r.normal);
  if(!h||h.point.distanceTo(originals[i])>1.2||h.normal.dot(r.normal)<.65)continue;
  const before=bends(i,r.point),after=bends(i,h.point);if(!before||!after||after.sum>before.sum-.00001||after.max>before.max+.00001)continue;
  r.point.copy(h.point);r.normal.copy(h.normal);maxMove=Math.max(maxMove,h.point.distanceTo(originals[i]));moved++;
 }
 return {intermediateUpdates:moved,maxIntermediateMove:maxMove,numberedAnchorsMoved:0,method:'bounded energy-decreasing surface fairing; numbered anchors fixed'};""")
edit('skin-ink-v24.js','radius=kind?6.8:3.8','radius=kind?7.5:5.2')
edit('skin-ink-v24.js','lineScale:{value:1}},','lineScale:{value:1},pixelRatio:{value:1}},')
edit('skin-ink-v24.js','uniform float lineScale;uniform sampler2D','uniform float lineScale;uniform float pixelRatio;uniform sampler2D')
edit('skin-ink-v24.js','float lineRadius=clamp(max(.5,unitPixel*.85),.5,3.)*lineScale;','')
edit('skin-ink-v24.js','unitPixel*2.),1.2,6.)','unitPixel*2.2*pixelRatio),1.2,6.)')
edit('skin-ink-v24.js','float lineDistance=1.e5,pointDistance=1.e5;','float lineDistance=1.e5,pointDistance=1.e5,lineAlong=0.;')
edit('skin-ink-v24.js',"else if(linesOn>.5){if(dashed>.5&&mod(b.w+t*length(ab),16.)>10.)continue;lineDistance=min(lineDistance,d);}","else if(linesOn>.5&&d<lineDistance){lineDistance=d;lineAlong=b.w+t*length(ab);}")
edit('skin-ink-v24.js','float aa=clamp(unitPixel*.65,.06,.9),lineAlpha=1.-smoothstep(lineRadius-aa,lineRadius+aa,lineDistance),pointAlpha=1.-smoothstep(pointRadius-aa,pointRadius+aa,pointDistance);',r"""float perpendicularPixel=max(length(vec2(dFdx(lineDistance),dFdy(lineDistance))),.015);
    float lineRadius=clamp(max(.55,perpendicularPixel*.85*pixelRatio),.55,3.)*lineScale;
    if(dashed>.5){float phase=mod(lineAlong,16.),gap=phase>10.?min(phase-10.,16.-phase):0.;lineDistance=length(vec2(lineDistance,gap));}
    float lineAA=clamp(length(vec2(dFdx(lineDistance),dFdy(lineDistance)))*.65,.025,1.5);
    float aa=clamp(unitPixel*.65,.06,1.2),lineAlpha=1.-smoothstep(lineRadius-lineAA,lineRadius+lineAA,lineDistance),pointAlpha=1.-smoothstep(pointRadius-aa,pointRadius+aa,pointDistance);""")
edit('skin-ink-v24.js','mesh.userData.skinInk=true;','mesh.userData.skinInk=true;mesh.onBeforeRender=renderer=>{material.uniforms.pixelRatio.value=renderer.getPixelRatio();};')
edit('skin-ink-v24.js',"method:'single-pass skin distance-field union',clinicalCalibration:false","method:'single-pass surface ink with perpendicular-derivative antialiasing and round dash caps',highDpiAware:true,roundedDashes:true,clinicalCalibration:false")
edit('learning-enhancements.js','const u=r.ink.mesh.material.uniforms;u.linesOn','const u=r.ink.mesh.material.uniforms;u.lineScale.value=selectedMeridians.size>3?.95:1.15;u.linesOn')
(p/'README.md').write_text('''# V25 经络曲线与笔触

从 V24 继续修复实际皮肤上的线路，不增加界面面板，不修改编号穴位定位记录。

## 本轮改动

局部掌指、足部路线出现投影折返时，先在当前人体的真实皮肤三角网格上寻找局部连接。路径受原段附近的范围、法线方向、皮肤距离和长度约束；没有连续表面时不跨空强行接线。两端编号穴位固定，不能为了美观移动点位。这是显示曲线优化，不代表最短路径就是临床经脉走行。

保留原贴面采样，再加入受限平滑：只有局部弯折总量下降且不会制造更尖的邻近折点时才接受。编号锚点保持不动；中间采样的平滑位移限制在1.2模型单位，继续使用正常深度遮挡及不透明体表。

皮肤笔触按线条垂直方向的屏幕导数计算抗锯齿，适配设备像素比。少量经脉对照略突出笔触，多经脉总览保持克制。虚线使用圆端过渡，点位仍区分中心实点与辅助外圈，外圈不是取穴范围。几何覆盖扩展到抗锯齿边缘，不截断绘制候选。

## 验证

checks 下分别保存当前 V24 基线、V25 候选以及公开网址的真实浏览器测试和截图。编号穴位与上一版本逐点比较；曲线检查统计急转弯、断开连接、贴肤距离和实际画面的线点可见性。原有图层、男女切换、目录预览和组合保存测试分别执行，不复用旧报告冒充新验证。

## 仍待解决

本轮没有将穴位数据库升级为临床校准，也未调整编号穴位的解剖依据。部分面部、会阴与分片皮肤接缝仍需模型及逐点核查，不能用平滑或透视掩盖。女性原生结构与共享教学参考来源不变。原模型和 V24 原路径保留。
''',encoding='utf-8')
(p/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 · V25</title><style>body{max-width:780px;margin:40px auto;padding:20px;font:16px/1.8 system-ui;background:#f4f7ee;color:#315945}a{color:#276d62}</style><h1>V25 · 经络曲线与笔触</h1><p>修复局部掌指路线的投影折返；沿真实皮肤连接并受限平滑，编号穴位不随平滑移动。线条适配高像素密度、圆端虚线及少量经脉对照。</p><p>正常遮挡和不透明皮肤不变。原点位仍为未逐一临床配准的学习示意，部分复杂区域仍需复核。</p><p><a href="./">进入当前版本</a> · <a href="../anatomy/">固定入口</a> · <a href="release.json">发布记录</a></p><p><a href="../fullbody-tcm-v24/">V24 经络贴肤与线条优化</a></p><p><a href="../fullbody-tcm-v23/">V23 结构选择与定位</a></p></html>''',encoding='utf-8')
# Verify original data, including finger mapping and original source coordinates.
for f in base.iterdir():
 if f.suffix=='.json' and f.name not in ['release.json','build-info.json']:
  assert f.read_bytes()==(p/f.name).read_bytes(),f.name
for name in ['female-fingers-v24.js','midline-v24.js']:
 assert (base/name).read_bytes()==(p/name).read_bytes(),name
(p/'checks').mkdir()
# Copy the exact published regression scripts; only route/version and output names change.
for name in ['verify.cjs','prior-verify.cjs','prior-prior-interactions.cjs','prior-compatibility.cjs']:
 s=(Path('atlas24-publish/verified-tests')/name).read_text()
 s=s.replace('fullbody-tcm-v24','fullbody-tcm-v25').replace('24.0.0','25.0.0').replace('-V24','-V25').replace("version=baseline?'22':'24'","version=baseline?'22':'25'")
 if name=='verify.cjs':s=s.replace("(live?'live-':'local-')+engine","(live?'geometry-live-':'geometry-local-')+engine")
 (Path('atlas25-repair')/('prior-'+name)).write_text(s)
print('V25 build sources prepared; numbered point and anatomical data unchanged')
