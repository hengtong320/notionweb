from pathlib import Path
import shutil,json
p=Path('fullbody-tcm-v24');assert not p.exists(),'Do not overwrite an existing release'
shutil.copytree('fullbody-tcm-v23',p)
shutil.rmtree(p/'checks',ignore_errors=True)
for n in ['build-info.json','release.json']:(p/n).unlink(missing_ok=True)
for n in ['skin-route-v24.js','skin-ink-v24.js']:shutil.copy2(Path('atlas24-repair')/n,p/n)
def edit(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:100]);f.write_text(s.replace(old,new,1))
f=p/'skin-v17.js';s=f.read_text().replace("from './skin-ink-v19.js'","from './skin-ink-v24.js'")
s="import {skinRouteSamples,relaxSkinSamples} from './skin-route-v24.js';\n"+s
# A missed fingertip ray must not hit a distant thigh. Use the closest local
# skin when the requested region has no nearby directional intersection.
s=s.replace("h.point.distanceTo(world)<190", "h.point.distanceTo(world)<(c.region==='hand'?45:c.region==='foot'?65:190)")
# Markers follow their exact skin contact, with a small rendering clearance.
# Do not use a 2.4 mm offset whose surface-normal jumps are visible close up.
s=s.replace('2.4','.35')
a=s.index("  const c=new THREE.CatmullRomCurve3(source.map(v=>v.clone()),false,'centripetal'),clean=[];")
b=s.index('  // A triangle-adjacency path',a)
s=s[:a]+"""  const anchors=context.anchors||[];
  function projectNear(v,aim){const h=bvh.closestPointToPoint(v);if(!h)return null;const normal=faceNormal(h,aim);return {point:h.point.clone().addScaledVector(normal,.35),normal};}
  const raw=skinRouteSamples(source,context,{sample,nearest:projectNear});
"""+s[b:]
needle='  const nearest=(v,aim)=>'
assert needle in s
s=s.replace(needle,'  const fairing=relaxSkinSamples(raw,projectNear);\n'+needle,1)
s=s.replace('anchorCount:clean.filter(e=>e.anchor).length','anchorCount:anchors.length')
s=s.replace('traceDiagnostics:{drawnSegments:','traceDiagnostics:{...fairing,sourceKnotCount:source.length,drawnSegments:')
s=s.replace("'-skin-v19'","'-skin-v24'")
f.write_text(s)
# Expose connection flags for regression measurements; keep original API.
edit('learning-enhancements.js','getRouteGeometry:()=>routeRecords.map(',"getRouteSamples:()=>routeRecords.map(r=>({meridian:r.meridian,side:r.side,branches:r.guides.map(g=>({points:g.points.map(v=>v.toArray()),connections:g.connections,diagnostics:g.traceDiagnostics}))})),getRouteGeometry:()=>routeRecords.map(")
# Keep point names from reappearing after the user explicitly switches them off.
edit('learning-enhancements.js',"function updatePointLabels(){", "function updatePointLabels(){")
for name in ['app.js','shared-v14.js','layers-ui-v21.js','learning-enhancements.js','view-v16.js','female-v12.js','index.html','index.template.html']:
 f=p/name
 if f.exists():
  s=f.read_text().replace('23.0.0','24.0.0').replace('V23 · 结构选择与定位','V24 · 经络贴肤与线条优化').replace('V23','V24')
  f.write_text(s)
(p/'README.md').write_text('''# V24 经络贴肤与线条优化

本轮针对经络位置与线条本身，而非继续增加界面控件。

1. 限制手、足区域射线的远距离命中。女性商阳 LI1 原先在射线未命中指端时会落到大腿，改为局部皮肤回退，左右分别验证。
2. 先把各控制点贴合当前人体，再在该体表上做向心插值；中间点不再因相邻穴位的投影方向突然切换而出现直角台阶。穴位锚点固定，中间点做小范围贴面平滑，不以美观为由移动编号穴位。
3. 渲染间距由2.4缩为0.35模型单位，减少近看时法线变化引起的悬空和抖动。原始定位记录和模型文件不改写。
4. 同一经脉的相邻笔划按最小距离合并，每块皮肤三角面只绘制一次，避免接头叠色变粗。线宽根据体表屏幕尺度稳定调整；点位使用中心实点和分离外圈，外圈不表示取穴范围。
5. 正常遮挡、不透明体表、性别切换、图层与原来的目录预览流程继续保留。危险跨空连接仍不强行补线。

## 验证与边界

checks区分基线、候选和公网结果。程序验证贴肤、点线一致、正常遮挡及可视质量；不代表各穴位已经按临床标准核验。原点位数据库仍有待逐穴复核项目，本轮不升级任何临床校准状态。女性原生与共享教学模型的来源标记不变。V23保留。
''')
(p/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 V24</title><style>body{max-width:760px;margin:40px auto;padding:20px;font:16px/1.8 system-ui;background:#f4f7ee;color:#315945}a{color:#276d62}</style><h1>V24 · 经络贴肤与线条优化</h1><p>局部投影修复、固定穴位的贴面平滑、单次皮肤笔划合并及更清晰的中心点。</p><p>原始模型和定位数据库不改写，显示优化不等于临床校准。</p><p><a href="./">进入当前版本</a> · <a href="../anatomy/">固定入口</a> · <a href="release.json">发布记录</a></p><p><a href="../fullbody-tcm-v23/">V23 结构选择与定位</a></p></html>''')
print('V24 assembled: original models, registration records and prior release unchanged')
