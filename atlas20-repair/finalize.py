from pathlib import Path
p=Path('fullbody-tcm-v20')
def replace(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:100]);f.write_text(s.replace(old,new,1))
f=Path('atlas20-repair/verify.cjs');s=f.read_text();s=s.replace("p.locator('[data-body-sex=", "p.locator('#bodySelector button[data-body-sex=")
if 'Female selected-organ isolation restores after roundtrip' not in s:
 extra=Path('atlas20-publish/extra-scenarios.cjs').read_text().replace('/lung/i.test(r.sourceName)','/bronchopulmonary/i.test(r.sourceName)')
 extra="await p.evaluate(()=>__ATLAS_LEARNING__.toggleTCM(false));\n"+extra
 anchor='  // Interleave requested bodies and scenes before earlier actions resolve.'
 assert anchor in s
 s=s.replace(anchor,extra+'\n'+anchor)
 s=s.replace("ck(key+': no opposite-body meshes remain'", "if(['chest','heart','abdomen'].includes(key))ck(key+': header describes the active organ scene',after.heading.includes({chest:'胸腔',heart:'心脏',abdomen:'腹部'}[key]),after.heading);\n   ck(key+': no opposite-body meshes remain'")
f.write_text(s)
replace('shared-v14.js',"else{await tissues.enable(row.system,true);", "else{tissues.clearOrganScope();await tissues.enable(row.system,true);")
replace('shared-v14.js',"choose(b.dataset.profile,true)","choose(b.dataset.profile,false)")
replace('shared-v14.js',"if(held)restoreCamera(held);if(!options.keepSection)section='layers';", "if(held)restoreCamera(held);else if(!female.active&&['bones','muscles','nerves','compare'].includes(key))window.__FOOT_ATLAS__.setView('front');if(!options.keepSection)section='layers';")
replace('shared-v14.js',"if(!f&&currentReference)document.body.classList.add('reference-detail');", "if(!f&&currentReference)document.body.classList.add('reference-detail');\n  if(!f&&!currentReference&&scene!=='bones'){$('regionHeading').textContent='男性 · '+(sceneNames[scene]||'自定义图层');$('visibleCount').textContent=(tissues.getVisibleCatalog().length+(state.bonesOn&&!state.tissueIsolated?[...ctx.bones.values()].filter(b=>b.visible).length:0))+' 个结构';}")
replace('female-v12.js',"function urlState(){if(document.body.classList", "function urlState(){if(state.bodyTransition)return;if(document.body.classList")
replace('female-v12.js'," const api={captureState", " window.addEventListener('atlas:transition-settled',()=>{if(active){update();urlState();}});\n const api={captureState")
replace('female-v12.js',"['chest','abdomen','pelvis'].includes(preset)","['chest','heart','abdomen','pelvis'].includes(preset)")
s=(p/'female-v12.js').read_text().replace("surface:'体表外形',chest:","surface:'体表外形',heart:'心脏与邻近血管',chest:").replace("surface:'女性体表',chest:","surface:'女性体表',heart:'心脏与邻近血管',chest:")
(p/'female-v12.js').write_text(s)
(p/'README.md').write_text('''# V20 男女场景同步修复

## 可复现的 V19 故障

旧版从男性胸腔切到女性再切回男性，器官显示范围由胸腔包围盒变成 null；腹部也发生相同错误。原因是恢复左右侧时调用了带有重置部位副作用的旧接口。女性“心脏特写”被映射到胸腔，同时启用了呼吸系统。checks/baseline-v19.json 记录旧版实际浏览器复现结果，不应把预期失败当成新版成功。

## 本次变更

性别、场景、图层、透明度和目录点选统一进入串行事务，连点时以最后一次请求为准。加载时保留上一幅完整渲染，避免两套人体和标注交叉出现；失败时恢复原场景并允许重试。骨架左右侧、可见性和姿态有无副作用的独立恢复接口，不再清空胸腹范围或偷偷聚焦旧器官。

每个人体分别保存当前显示状态，包括器官范围、图层、不透明度、隐藏项、单独查看、骨架姿态和标注。经络选择、左右侧、点线开关、穴名和当前穴位独立恢复。性别切换不再为了重选旧结构而开启额外皮肤。心脏、胸腔、腹部、盆腔使用对应的场景规则。器官视图标题同步当前场景，不再被骨架区域标题覆盖；主动选择骨架等预设时重新适配视野，避免继承上一个器官特写的镜头。

皮肤绘线继续使用 V19 的真实皮肤三角形方案，体表预设为100%不透明，正常深度遮挡，不靠透明人体或透视实现可见。

## 验证文件

checks/local-chromium.json 与 local-webkit.json 包含完整场景往返、实际渲染网格归属、器官范围、透明度、经络开关、皮肤图像像素差、标注、保存组合、交错切换与受控资源加载失败后的回退检查。还覆盖选中器官的单独查看、隐藏，以及骨架分离姿态往返恢复。checks/live-*.json 专门记录公开入口验证，本地通过不能替代公网通过。

## 未改变的边界

本次修复的是状态与显示，不修改原始 GLB 或经穴坐标注册文件。女性来源的骨骼、肌肉、周围神经仍是部分覆盖，未提供的结构不伪装成完整女性解剖。361个穴名中190个有模型约束、171个待细定位审核；没有穴位升级为临床配准通过。清晰显示不等于准确取穴。

原 V19 目录保留可回退。
''',encoding='utf-8')
(p/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 · V20</title><style>body{max-width:780px;margin:40px auto;padding:20px;font:16px/1.8 system-ui;background:#f4f7ee;color:#315945}a{color:#276d62}</style><h1>V20 · 男女场景同步</h1><p>修复男女切换导致器官范围丢失、重新点选改变图层、经络状态不同步的问题。完整场景统一切换，资源失败恢复原画面。</p><p><a href="./">进入当前版本</a> · <a href="../anatomy/">固定入口</a> · <a href="release.json">发布记录</a></p><p>体表绘线不依赖透明皮肤；点位仍为学习示意，未完成临床配准。女性模型部分结构缺失的来源边界保持不变。</p><h2>历史版本</h2><p><a href="../fullbody-tcm-v19/">V19 皮肤绘线与图层切换</a></p><p><a href="../fullbody-tcm-v18/">V18 统一教学比例</a></p><p><a href="../fullbody-tcm-v17/">V17 男女体表经络</a></p></html>''',encoding='utf-8')
print('V20 final scene headings, framing and extended point/organ/body journeys installed')
