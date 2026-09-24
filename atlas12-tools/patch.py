from pathlib import Path
import shutil,re,json,hashlib
src=Path('fullbody-tcm-v11');p=Path('fullbody-tcm-v12');p.mkdir(exist_ok=True)
for f in src.iterdir():
 if f.is_file() and f.name not in ['app.bundle.js','evidence.bundle.js','delivery-release.json']:shutil.copy2(f,p/f.name)
(p/'assets').mkdir(exist_ok=True)
for f in (src/'assets').glob('*.json'):shutil.copy2(f,p/'assets'/f.name)
for n in ['female-v12.js','refinement-v12.js','refinement-v12.css']:shutil.copy2(Path('atlas12-tools')/n,p/n)
def replace(file,a,b):
 f=p/file;s=f.read_text();assert a in s,(file,a[:60]);f.write_text(s.replace(a,b))
replace('app.js',"import {initStability}","import {initFemale} from './female-v12.js';\nimport {initRefinement} from './refinement-v12.js';\nimport {initStability}")
replace('app.js','let tissueLayer=null,speech=null,richLayers=false,studyController=null;','let tissueLayer=null,speech=null,richLayers=false,studyController=null,femaleViewer=null;')
replace('app.js','function pick(e){','function pick(e){if(femaleViewer?.active)return null;')
replace('app.js','if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;', 'if(femaleViewer?.active){femaleViewer.click(e);return;}if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;')
replace('app.js',"if(changed&&state.ready){if(learningEnhancements?.hasNavigationFocus?.())", "if(changed&&state.ready){if(femaleViewer?.active)femaleViewer.focus();else if(learningEnhancements?.hasNavigationFocus?.())")
replace('app.js','learningEnhancements?.updateFrame?.();syncAOProjection();','learningEnhancements?.updateFrame?.();femaleViewer?.updateFrame();syncAOProjection();')
replace('app.js',"if((!studyController||studyController.getState().current.kind==='bone')&&previewMesh", "if(!femaleViewer?.active&&(!studyController||studyController.getState().current.kind==='bone')&&previewMesh")
replace('app.js','function saveCapture(){return ', 'function saveCapture(){if(femaleViewer?.active)return femaleViewer.capture();return ')
replace('app.js','function returnToOverview(){\n if(!state.ready)return;','function returnToOverview(){\n if(femaleViewer?.active){femaleViewer.fit();return;}if(!state.ready)return;')
replace('app.js',"viewport.addEventListener('dblclick',e=>{if(state.ready){", "viewport.addEventListener('dblclick',e=>{if(femaleViewer?.active){femaleViewer.focus();return;}if(state.ready){")
replace('app.js'," for(const event of ['pointerdown'", " femaleViewer=initFemale({THREE,scene,camera,renderer,viewport,controls,state,bones,modelRoot,learning:learningEnhancements,tissues:tissueLayer,speech,toast,focusBounds,invalidate,setMode,applyVisibility,resetBones,setRegion,setSide,renderNow:()=>{syncAOProjection();composer.render();}});\n initRefinement({learning:learningEnhancements,tissues:tissueLayer,female:femaleViewer,invalidate,toast});\n for(const event of ['pointerdown'")
replace('tissues-v4.js',"extraSystems.includes(system)?'./'", "extraSystems.includes(system)?'../fullbody-tcm-v11/'")
f=p/'index.template.html';s=f.read_text().replace('V11 · 器官与体表','V12 · 双参考与简洁观察').replace('全身骨骼研习室 V11','人体研习室 V12').replace('<link rel="stylesheet" href="stability-v10.css">','<link rel="stylesheet" href="stability-v10.css"><link rel="stylesheet" href="refinement-v12.css">');s=s.replace('有来源的解剖模型驱动的骨盆与下肢 3D 学习工具。旋转、逐骨点选、自由拆解、单骨观察与中文解剖标注。','男性与独立女性参考模型。旋转、点选、骨骼拆解和结构分层学习。');f.write_text(s)
f=p/'evidence-ui-v9.js';s=f.read_text();a=s.index('export function evidenceBody');b=s.index('export function pointCardV9',a)
s=s[:a]+'''export function evidenceBody(p){
 const r=DATA.points[p.code],h=DATA.headExamples[p.name];
 if(!r)return `<section class="v9-evidence"><h4>部位与名称</h4><p>${esc(h?.[0]||p.locationNote||'补充部位导航')}</p><details><summary>来源与补充说明</summary><p>光环表示观察范围，不是精确穴位。本条目的单穴现代证据尚未录入。</p>${link(h?.[2]||'tara')}</details></section>`;
 return `<section class="v9-evidence"><p class="v10-point-summary"><b>${esc(r.name)} · ${esc(r.region)}</b><br>${esc(r.location)}</p><h4>名称与传统分类</h4><p>${esc(r.traditional)}</p><h4>现代研究</h4><span class="v9-level">${esc(r.evidenceLevel)}</span><p>${esc(r.evidence)}</p><p class="v9-source">${r.evidenceSources.map(link).join('<br>')}</p><details class="v12-point-source"><summary>定位依据与来源</summary><p>${esc(r.locationStatus)}</p><p>需要的标志：${esc(r.requiredLandmarks)}</p><p>${esc(r.anatomyCaution)}</p>${link('who')}<br>${link('gb')}<p>本模型位置尚未校准；体表投影只改变画面，不用于准确取穴。传统分类不等于现代疗效证据。</p></details></section>`;
}
''' + s[b:]
a=s.index("intro.innerHTML='");b=s.index("';panel.querySelector",a)
s=s[:a]+'''intro.innerHTML='<div class="v12-acu-actions"><button id="v9ChannelInfo">所选经脉介绍</button><button id="v12SourceInfo">来源与说明</button></div><details class="v12-acu-options"><summary>显示选项</summary><label><input id="v9Strict" type="checkbox">只读资料，暂不显示点线</label><button id="v9Diagram">只读资料</button></details>''' + s[b:]
a=s.index(' const sync=v=>');b=s.index(' const set=v=>',a)
s=s[:a]+''' const sync=v=>{document.getElementById('v9Strict').checked=v;document.getElementById('v9Diagram').textContent=v?'显示三维示意':'只读资料';badge.textContent=v?'资料模式':'经络示意 · 未校准';badge.hidden=!api.getState().enabled;};
''' +s[b:]
s=s.replace('set(true);',"set(false);document.getElementById('v12SourceInfo').onclick=()=>document.getElementById('sourceDialog').showModal();window.addEventListener('atlas:tcm-visibility',()=>sync(api.getState().precisionMode==='strict'));")
f.write_text(s)
replace('learning-enhancements.js','function toggleTCM(on){enabled=!!on;',"function toggleTCM(on){enabled=!!on;window.dispatchEvent(new CustomEvent('atlas:tcm-visibility'));")
f=p/'stability-v10.js';s=f.read_text().replace('<a href="calibration.html">定位工作台</a>','').replace('资料查阅 · 未显示未校准坐标','资料查阅').replace('三维示意 · 未校准位置','经穴示意').replace('解剖结构 · 当前模型教学观察','解剖结构');s=s.replace("function update(){\n", "function update(){\n  if(window.__ATLAS_FEMALE__?.active)return;\n");f.write_text(s)
for n in ['app.js','learning-enhancements.js','stability-v10.js','evidence-page-v10.js','versions.html']:
 f=p/n;s=f.read_text().replace('11.0.0','12.0.0').replace('V11 ·','V12 ·').replace('-V11-','-V12-');f.write_text(s)
(p/'README.md').write_text('''# V12 双参考与简洁观察
固定入口：https://hengtong320.github.io/notionweb/anatomy/

保留原男性几何与V11功能，增加独立的HRA女性参考，未混用男性结构补齐女性模型。女性体表与器官有来源；骨骼、肌肉和周围神经的覆盖不完整。女性暂不显示男性经络穴位，未做女性取穴配准。

重复的审核计数和大段提示合并到来源与说明；开启经络时保留简短状态和导出提示。经络打开即可看到示意，资料模式保留在显示选项中。原始示意坐标没有更改。

结构图层按快捷场景、自定义组合、细分选项和语音设置组织。只在启用的图层显示透明度；可用专注看图收起侧栏，不改变模型。女性可独立点选、搜索、聚焦、隔离、隐藏、截图；有原色、透明参照、突出所选三种显示方式。

女性来源：Kristen Browne; Heidi Schlehlein. 2023. 3D Reference Organ Set for Female v1.5. HRA/HuBMAP, DOI 10.48539/HBM352.BTSQ.586. CC BY 4.0。见assets/female/source-metadata.json。源矩阵烘焙，统一米转毫米并整体平移；采用Draco压缩。没有按男性形状变形，没有借用男性骨骼补齐。

男性骨骼、肌肉、神经、器官及体表继续复用本站V9/V11资源。首次开启某一新系统仍需下载。女性与男性是不同来源的参考集合，不是同一个人的两种外观。

软件测试不等于临床精度验证，未完成逐穴配准或全套语音人工审听。模型覆盖、测试与限制见delivery-release.json及checks/。
''')
(p/'FEMALE-LICENSE.txt').write_text('HRA / HuBMAP Female Reference v1.5\nKristen Browne; Heidi Schlehlein (2023)\nCC BY 4.0 https://creativecommons.org/licenses/by/4.0/\nhttps://doi.org/10.48539/HBM352.BTSQ.586\nhttps://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.5/metadata.json\nAdaptations: original world matrices baked, metres converted to millimetres, uniform translation [100,760,0], original native systems separated, labels translated conservatively, Draco compression (16bit positions). No male geometry borrowed. Pregnancy-specific structures excluded. Partial skeletal and muscle coverage.\n')
print('PATCH_READY')
