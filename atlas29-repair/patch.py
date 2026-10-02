"""V29: bounded opaque-skin state repair. Preserve all original point/route data."""
from pathlib import Path
import hashlib,json,shutil
src=Path('fullbody-tcm-v28');dst=Path('fullbody-tcm-v29')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(src/'app.bundle.js')=='e1ff086300771374f79b6ec838a8cb80e46ec9a4e9848409e48b3d89e2776efc','V28 changed; reconcile before patching'
assert not dst.exists(),'Do not overwrite an existing release'
shutil.copytree(src,dst);shutil.rmtree(dst/'checks',ignore_errors=True);(dst/'checks').mkdir()
for n in ['release.json','build-info.json']:(dst/n).unlink(missing_ok=True)
def edit(n,a,b):
 f=dst/n;s=f.read_text();assert s.count(a)==1,(n,a[:100],s.count(a));f.write_text(s.replace(a,b,1))
# Selecting a preset intentionally enables its subject. Switching sex does not.
edit('shared-v14.js','enabled:unavailableFallback?false:next===\'surface\'?true:was.learning.enabled','enabled:unavailableFallback?false:was.learning.enabled')
# Adding a whole skin shell is incompatible with isolating one internal bone.
# Exit only isolation; do not change the requested meridians, camera or side.
edit('shared-v14.js','if(!available(l))return;if(female.active)female.setCustom();',"if(!available(l))return;if(l.id==='surface'&&on){if(female.active)female.clearSelection();else{tissues.clearSelection();window.__FOOT_ATLAS__.restoreBoneState({isolated:false,neighbors:false});const x=$('nerveXray');if(x.checked){x.checked=false;x.dispatchEvent(new Event('change',{bubbles:true}));}}}if(female.active)female.setCustom();")
# A meridian local-window is not permission to delete disconnected skin pieces.
# Keep the surrounding opaque skin continuous, matching the female whole shell.
# Explicit anatomical scopes and isolate operations retain their old behavior.
edit('tissues-v4.js','const planes=clipPlanes(clipBox);warning.hidden=',"const planes=clipPlanes(clipBox),localSkinContext=!!study&&localStudy&&!organBox&&state.region==='body';warning.hidden=")
edit('tissues-v4.js','&&(isolated||!clipBox||bb.intersectsBox(clipBox));','&&(system===\'surface\'&&localSkinContext||isolated||!clipBox||bb.intersectsBox(clipBox));')
edit('tissues-v4.js','n.material.clippingPlanes=isolated||!clipOn?[]:planes;','n.material.clippingPlanes=isolated||!clipOn||system===\'surface\'&&localSkinContext?[]:planes;')
# Prevent the fallback anatomy picker from drilling through an opaque skin.
# Genuine visible meridian clicks retain first priority.
f=dst/'app.js';s=f.read_text();s="import {findOpaqueSkinHit} from './opaque-skin-v29.js';\n"+s
needle="if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;if(femaleViewer?.active)"
assert s.count(needle)==1
s=s.replace(needle,"if(state.bodyTransition)return;if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;if(findOpaqueSkinHit({THREE,scene,camera,viewport},e))return;if(femaleViewer?.active)")
f.write_text(s);shutil.copy2('atlas29-repair/opaque-skin.js',dst/'opaque-skin-v29.js')
for n in ['shared-v14.js','learning-enhancements.js','index.html','index.template.html','versions.html']:
 f=dst/n
 if f.exists():f.write_text(f.read_text().replace('V28 · 男女体表一致性','V29 · 体表状态与可见性').replace('28.0.0','29.0.0').replace('fullbody-tcm-v28/','fullbody-tcm-v29/'))
# Retain V26 baseline comparisons, but run every candidate journey against V29.
prior=Path('/tmp/atlas28-tested/atlas28-repair')
if prior.is_dir():
 for old,new in [('verify.cjs','surface-regression.cjs'),('observation.cjs','observation-regression.cjs')]:
  s=(prior/old).read_text().replace('fullbody-tcm-v28','fullbody-tcm-v29').replace("'28'","'29'").replace("version:'28.0.0'","version:'29.0.0'")
  assert "start('28'" not in s and "v==='28'" not in s
  Path('atlas29-repair',new).write_text(s)
immutable=[f.name for f in src.iterdir() if f.is_file() and (f.suffix=='.json' and f.name not in ['release.json','build-info.json'] or f.name in ['skin-v17.js','skin-ink-v24.js','skin-route-v24.js','point-rules-v18.js','reference-data.js','acupoints-data.js','female-fingers-v24.js','surface-path-v25.js'])]
for n in immutable:assert sha(src/n)==sha(dst/n),n
(dst/'README.md').write_text('''# V29 体表状态与可见性

基于已发布 V28，保留它的男女独立贴肤坐标、错误面投影修正与切换缓存。本轮修复的是此前漏掉的组合操作，不重新编号或移动穴位。

## 修复

1. 在体表预设中隐藏经络总开关后，男女往返仍保持隐藏；切换性别不等于重新选择体表预设。线路、点位、穴名各自状态继续保留。
2. 仅看当前穴位附近只裁切经络点线和需要局部观察的内部结构；在全身体表下保留连续的不透明皮肤，避免男性分片皮肤被局部框删掉而女性整块皮肤不受影响。显式器官/解剖范围不受此例外影响。
3. 单独查看骨头后，主动开启体表会退出冲突的内部结构隔离，不再出现体表已勾选却完全看不到。保留当前镜头、经脉选择和侧别。
4. 从神经预设开启不透明体表时取消旧神经透视辅助，避免神经线穿过皮肤冒充经络线，男女往返使用正常深度遮挡。之后仍可主动启用原有透视选项。
5. 普通点击不透明皮肤时，不再穿透选中后方隐藏的骨头或器官。可见经络和穴位仍优先点选；目录的明确结构查看不受影响。切换中也不让旧画面的点击进入内部结构选择。

## 验证

atlas29-evidence 保存 V28 同操作基线及 V29 候选/公网截图与检查。新增脚本覆盖总开关、局部范围、孤立骨骼、神经叠层与皮肤点击；另复跑 V28 的44项贴肤切换和28项观察/标注检查。以实际报告为准，不以历史通过数量代替当前执行。

## 边界

原始人体与经穴数据不变；女性仍按原生结构及明确标源的教学补充分开说明。正常体表不通过透明皮肤或全经络透视掩盖显示问题。显示一致并不代表逐穴临床校准，原有局部路线转折/真实缺口仍需复核。
''',encoding='utf-8')
(dst/'v29-invariants.json').write_text(json.dumps({'originalSource':'fullbody-tcm-v28','unchangedFiles':{n:sha(dst/n) for n in immutable},'clinicalCalibration':False},indent=2))
print('V29 assembled, unchanged anatomy and display-geometry files:',len(immutable))
