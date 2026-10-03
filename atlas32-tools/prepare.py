from pathlib import Path
import shutil

root = Path(__file__).resolve().parent.parent
source = root / 'fullbody-tcm-v31'
target = root / 'fullbody-tcm-v32'
shutil.copytree(source, target, dirs_exist_ok=True)
for directory in ['checks']:
    shutil.rmtree(target / directory, ignore_errors=True)
for name in ['build-info.json', 'release.json', 'final-source-match.json']:
    (target / name).unlink(missing_ok=True)

def change(name, old, new):
    p = target / name
    text = p.read_text()
    assert old in text, (name, old[:80])
    p.write_text(text.replace(old, new))

for p in target.iterdir():
    if p.suffix in ['.js', '.css', '.html'] and '.bundle.' not in p.name:
        p.write_text(p.read_text().replace('31.0.0', '32.0.0').replace('V31 · 体表侧别与切换一致性', 'V32 · 清晰操作与点线显示'))

change('learning-enhancements.js', 'u.linesOn.value=guideOn&&linesOn?1:0;u.pointsOn.value=pointsOn?1:0;', 'u.linesOn.value=guideOn&&linesOn&&curveStyle!==\'tube\'&&!xray?1:0;u.pointsOn.value=pointsOn&&!xray?1:0;')
change('learning-enhancements.js', 'const active=show&&pointsOn&&selectedPoint?.skinContact', 'const active=show&&pointsOn&&!xray&&selectedPoint?.skinContact')
change('learning-enhancements.js', "curveStyle==='tube'&&(!paint||xray)", "curveStyle==='tube'")
change('learning-enhancements.js', "curveStyle=v.curveStyle||'smooth'", "curveStyle=v.curveStyle==='dashed'?'dashed':'smooth'")
change('learning-enhancements.js', '<input id="acupointSearch" type="search"', '<input id="acupointSearch" aria-label="搜索穴位名称、拼音或编码" type="search"')
change('learning-enhancements.js', '显示背侧点线（透视辅助）', '透视查看被遮挡的点线')
change('learning-enhancements.js', '<option value="smooth">皮肤绘线</option><option value="tube">立体对照线</option><option value="dashed">虚线导览</option>', '<option value="smooth">贴肤实线</option><option value="dashed">贴肤虚线</option>')

# The meridian-side control must transfer a local camera just like the
# structure-side control, while retaining the existing zoom and hidden flags.
change('learning-enhancements.js', 'const prior=selectedPoint;navigationFocus=null;tcmSide=side;', 'const prior=selectedPoint,observation=captureSurfaceObservation(),view=window.__FOOT_ATLAS__?.captureCamera();navigationFocus=null;tcmSide=side;')
change('learning-enhancements.js', 'if(target){selectPoint(target,false,{restoring:true});return;}', 'if(target){selectPoint(target,false,{restoring:true});if(observation&&view)window.__FOOT_ATLAS__?.restoreCamera(transferSurfaceObservation({...observation,visible:true,side:target.side},view));return;}')

change('learning-enhancements.js', 'focused:!!studyContext&&dist<radius*16', 'focused:dist<radius*16')

# When a short-screen details sheet would cover its selected point, reuse the
# existing framing helper after layout. Do not reframe points already in view.
change('learning-enhancements.js', "$('openDetail').onclick=()=>", "function ensureDetailPointVisible(){if(!compact()||!enabled||!selectedPoint?.position)return;requestAnimationFrame(()=>{if(document.body.classList.contains('detail-open')&&project(selectedPoint).y>detail.getBoundingClientRect().top-28)focusReference(selectedPoint);});}\n $('openDetail').onclick=()=>")
change('learning-enhancements.js', "document.body.classList.toggle('detail-open');document.body.classList.remove('nav-open');};", "document.body.classList.toggle('detail-open');document.body.classList.remove('nav-open');ensureDetailPointVisible();};")
change('learning-enhancements.js', "document.body.classList.add('detail-open');document.body.classList.remove('nav-open');};", "document.body.classList.add('detail-open');document.body.classList.remove('nav-open');ensureDetailPointVisible();};")

# Restore an opaque surface through the current shared scene adapter, not the
# legacy comparison profile. Keep the address consistent after a body switch.
change('stability-v10.js', 'async function navigate(target){', "async function restoreProfile(layer){if(layer==='surface'&&window.__ATLAS_SHARED__)return window.__ATLAS_SHARED__.choose('surface',true,{keepSection:true});return tissues.setProfile(layer); }\n async function navigate(target){")
change('stability-v10.js', 'await tissues.setProfile(target.layer)', 'await restoreProfile(target.layer)')
change('stability-v10.js', "$('backCurrent').disabled=true;invalidate();return;", "$('backCurrent').disabled=true;if(!restoring&&document.body.dataset.bodySwitching!=='true')try{history.replaceState(null,'',linkFor());}catch{}invalidate();return;")
change('stability-v10.js', 'function adopt(target){', "window.addEventListener('atlas:transition-settled',update);\n function adopt(target){")

change('female-v12.js', "learning.selectPoint(h.get('id'),h.get('side')||'right',false)", "learning.selectPoint(h.get('id'),h.get('side')||'right',true)")

# Opacity is a material edit, not a scene replacement. Keep queue ordering when
# another scene operation is actually in progress; otherwise avoid suspending ink.
change('shared-v14.js', "function opacityLayer(l,v){return enqueueAction('opacity:'+l.id,()=>{layoutRevision++;opacityLayerNow(l,v);});}", "function opacityLayer(l,v){if(state.bodyTransition||queuedActions)return enqueueAction('opacity:'+l.id,()=>{layoutRevision++;opacityLayerNow(l,v);});layoutRevision++;opacityLayerNow(l,v);invalidate();return Promise.resolve(true);}")

# The old display-mode row is intentionally hidden by the current layer UI.
# Do not reintroduce an extra mode control just to expose its legacy branches.
change('meridian-ux-v26.js', "$('autoFocusPoint').parentElement.lastChild.textContent=' 点选后转到清楚的观察角度';", "$('autoFocusPoint').parentElement.lastChild.textContent=' 点选后转到清楚的观察角度';$('sharedAcupointCoverage').hidden=true;")
change('meridian-ux-v26.js', "body.classList.toggle('v26-point-selected',!point.hidden);", "body.classList.toggle('v26-point-selected',!point.hidden);$('acupointSearch').setAttribute('aria-label','搜索穴位名称、拼音或编码');")

css = '''
/* V32: retain one clear action per task on compact screens. */
#sharedAcupointCoverage{display:none!important}
@media(max-width:650px){body.reading-v26[data-current-kind=point] .detail-panel>.detail-top{display:none!important}}
@media(max-width:600px){
 .topbar .brand{flex:none;width:25px;min-width:25px}
 .topbar .brand>span:last-child{display:none}
 .topbar .brand-mark{display:flex!important;width:25px;height:28px}
 .topbar .brand-mark svg{width:20px;height:20px}
 .topbar{gap:4px}
 #bodySelector{flex:none}
 body.female-view .stage-heading .eyebrow{display:none!important}
 #labelFitAll{display:none!important}
 body.v26-point-selected:not(.nav-open):not(.detail-open) .tcm-status{display:none!important}
 .view-switcher button{min-height:34px}
 #tcmQuickControls button{min-height:36px}
 #acupointSearch{min-height:44px}
}
@media(max-width:350px){.topbar .brand{display:none}}
'''
(target / 'experience-v32.css').write_text(css)
for name in ['index.html', 'index.template.html']:
    change(name, '</head>', '<link rel="stylesheet" href="experience-v32.css?v=32.0.0"></head>')

(target / 'README.md').write_text('''# V32 清晰操作与点线显示

基于 V31，保留原始模型、穴位和路线。简化体表线型、修复透视重复绘制与滑杆过渡，以及左右镜头和链接恢复；收紧手机顶栏，减少重复的看全线与选中摘要，补充穴位搜索名称。

V31 中的“突出当前”代码差异仍保留为后续事项：该控件在现行图层界面已隐藏，本轮不重新增加该入口。

运行须保留整个仓库，因为模型仍引用 V9、V11、V12 资源。从仓库根目录启动静态服务器，再打开 fullbody-tcm-v32/。构建方法见 atlas32-tools/README.md。

本轮浏览器检查和已知边界见 atlas32-tools/REVIEW.md。历史验收记录不算本轮结果；点位仍为学习示意，未完成临床校准。
''')
print('Prepared V32 source; V31 and original model assets untouched.')
