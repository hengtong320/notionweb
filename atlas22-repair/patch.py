"""V22: narrow interaction repairs. Original meshes and point coordinates are unchanged."""
from pathlib import Path
import shutil,hashlib
src=Path('fullbody-tcm-v21');p=Path('fullbody-tcm-v22')
assert hashlib.sha256((src/'app.bundle.js').read_bytes()).hexdigest()=='49fa4357333e801a244b147dc08bf9515e39cfe5f5225933f7a81b913df8a08d','Re-review changed V21 first'
assert not p.exists(),'Do not overwrite a published release'
shutil.copytree(src,p);shutil.rmtree(p/'checks',ignore_errors=True)
for name in ['build-info.json','release.json']:(p/name).unlink(missing_ok=True)
def change(name,old,new):
 f=p/name;s=f.read_text();assert s.count(old)==1,(name,old[:100],s.count(old));f.write_text(s.replace(old,new,1))
# Snapshot saves join the same queue as the view/layer/sex mutations they follow.
change('shared-v14.js','let savedCombo={};$(\'saveLayerCombo\').onclick=()=>{','let savedCombo={};$(\'saveLayerCombo\').onclick=()=>enqueueAction(\'save-combo\',saveCombo).catch(fail);function saveCombo(){')
change('shared-v14.js',"display:$('sharedDisplay').value,scene,native:captureNative(),learning:learning.getState()};savedCombo[sex()]=value;", "display:$('sharedDisplay').value,scene,native:captureNative(),learning:learning.getState(),reference:currentReference,savedAt:new Date().toISOString()};savedCombo[sex()]=value;")
change('shared-v14.js',"localStorage.setItem('atlas21:layers:'+sex(),JSON.stringify(value));}catch{}toast('已保存当前图层组合');", "localStorage.setItem('atlas21:layers:'+sex(),JSON.stringify(value));}catch{toast('已临时保存，本页可载入；浏览器未允许持久保存。');return value;}toast('已保存'+(female.active?'女性':'男性')+'当前图层组合');return value;")
change('shared-v14.js',"if(v.native){await restoreNative(v.native);await bindReference();scene=v.scene;$('sharedDisplay').value=v.display;if(v.learning)learning.restoreDisplayState(v.learning);return;}","if(v.native){const held=captureCamera();await restoreNative(v.native);await bindReference(v.learning?.enabled);scene=v.scene;$('sharedDisplay').value=v.display;if(v.learning)learning.restoreDisplayState(v.learning);currentPoint=learning.getState().selectedPoint;currentReference=!!(v.reference||currentPoint||v.learning?.studyContext);if(!currentReference){const id=captureNative().selected,row=id&&activeCatalog().find(r=>r.id===id);window.dispatchEvent(new CustomEvent('atlas:selection',{detail:row?{kind:row.kind||'tissue',id:row.id,name:row.name,side:row.side}:{kind:'region',id:scene,name:(female.active?'女性':'男性')+' · '+(sceneNames[scene]||'自定义图层'),side:'both'}}));}const labels=female.active?female.getLabels():state.labels;$('labelsBtn').classList.toggle('active',labels);$('labelsBtn').setAttribute('aria-pressed',String(labels));restoreCamera(held);schedule();toast('已载入'+(female.active?'女性':'男性')+'组合，保留当前视角');return;}")
# Female-only custom layers must not produce an empty male model. Keep the
# original body snapshot for an immediate return, until the user changes view.
change('shared-v14.js','async function switchSexNow(target){','let unavailableReturn=null;\n async function switchSexNow(target){')
change('shared-v14.js','savedLabels=female.active?female.getLabels():state.labels;',"savedLabels=female.active?female.getLabels():state.labels,savedDetails=female.active?female.getState().fineDetails:!!$('internalDetails').checked;\n  const returning=unavailableReturn?.target===target&&unavailableReturn.revision===layoutRevision?unavailableReturn:null;")
change('shared-v14.js',"let next=was.scene;if(!female.active&&next==='breast'", "let next=returning?.scene||was.scene;const nativeOn=Object.values(was.native.systems||{}).some(s=>s.on);const compatibleOn=logical.some(item=>item.on&&systemsFor(layers.find(l=>l.id===item.id)).length);let unavailableFallback=false;if(next==='custom'&&nativeOn&&!compatibleOn&&!returning){unavailableReturn={target:from,revision:layoutRevision,scene:was.scene,native:was.native};next='skin';unavailableFallback=true;toast('当前模型没有对应图层，先显示纯体表；切回后恢复原组合。');}if(!female.active&&next==='breast'")
change('shared-v14.js','const cached=bodySnapshots.get(target),reusable=cached&&cached.scene===next&&cached.revision===layoutRevision;', 'const cached=returning||bodySnapshots.get(target),reusable=cached&&cached.scene===next&&cached.revision===layoutRevision;')
change('shared-v14.js','if(reusable){await restoreNative(cached.native);scene=next;}', 'if(reusable){await restoreNative(cached.native);scene=next;if(returning)unavailableReturn=null;}')
change('shared-v14.js','if(female.active){female.setSide(savedSide);female.setLabels(savedLabels);', "if(female.active){female.setFineDetails(savedDetails);female.setSide(savedSide);female.setLabels(savedLabels);")
change('shared-v14.js',"else window.__FOOT_ATLAS__.restoreBoneState({side:savedSide,labels:savedLabels});", "else{window.__FOOT_ATLAS__.restoreBoneState({side:savedSide,labels:savedLabels});for(const id of ['internalDetails','fasciaOn']){const e=$(id);if(e.checked!==savedDetails){e.checked=savedDetails;e.dispatchEvent(new Event('change',{bubbles:true}));}}}")
change('shared-v14.js',"learning.restoreDisplayState({...was.learning,enabled:next==='surface'?true:was.learning.enabled});", "learning.restoreDisplayState({...was.learning,enabled:unavailableFallback?false:next==='surface'?true:was.learning.enabled});")
# Quick views close the phone drawer only after the requested view completes;
# the same top-level button opens and closes it, keeping the current tab.
change('layers-ui-v21.js',"await api.choose(b.dataset.v21View,false);api.showSection('layers');", "await api.choose(b.dataset.v21View,false);api.showSection('layers');if(innerWidth<=600){document.body.classList.remove('nav-open');$('v21LayersOpen').focus({preventScroll:true});}")
change('layers-ui-v21.js',"mobileLayers.onclick=()=>api.showSection('layers');$('openNav').textContent='目录';$('openNav').onclick=()=>api.showSection('directory');", "function toggleDrawer(section){if(api.getState().section===section&&document.body.classList.contains('nav-open'))document.body.classList.remove('nav-open');else api.showSection(section);refresh();}mobileLayers.onclick=()=>toggleDrawer('layers');$('openNav').textContent='目录';$('openNav').setAttribute('aria-controls','structureLibrary');$('openNav').onclick=()=>toggleDrawer('directory');$('closeNav').addEventListener('click',()=>{refresh();(api.getState().section==='layers'?mobileLayers:$('openNav')).focus({preventScroll:true});});")
change('layers-ui-v21.js',"function refresh(){const s=api.getState(),f=female.active;", "function refresh(){const s=api.getState(),f=female.active;$('openNav').setAttribute('aria-expanded',String(s.section==='directory'&&document.body.classList.contains('nav-open')));")
change('layers-ui-v21.js',"if(span)span.textContent='显色';", "if(span)span.textContent='不透明度';")
change('layers-ui-v21.js',"勾选叠加，拖动滑杆调整显色", "勾选叠加；不透明度越高，遮挡越完整")
# Avoid inaccurate old version and dataset captions in exported female images.
change('female-v12.js',"HRA / HuBMAP · 统一比例女性体表 · 模型标志估计、未逐穴临床配准 · V18", "HRA 女性原生＋Z-Anatomy 教学参考 · 未逐穴临床配准 · V22")
change('female-v12.js',"+'-V15.png'", "+'-V22.png'")
change('stability-v10.js',"V16 · Z-Anatomy / BodyParts3D · CC BY-SA 4.0 · 学习参考", "V22 · Z-Anatomy / BodyParts3D · CC BY-SA 4.0 · 学习参考")
change('stability-v10.js','-V16-${new Date()', '-V22-${new Date()')
for name in ['index.html','index.template.html','app.js','learning-enhancements.js','shared-v14.js','layers-ui-v21.js']:
 f=p/name
 if f.exists():f.write_text(f.read_text().replace('21.0.0','22.0.0').replace('V21 · 图层直达与完整教学参考','V22 · 图层与切换稳定性'))
css=p/'layers-ui-v21.css';css.write_text(css.read_text()+'''\n@media(max-width:600px){.layers-v21 .v21-region-row button,.layers-v21 .v21-mixer-actions button,.layers-v21 .v21-bottom-tools button,.layers-v21 .v21-bottom-tools label{min-height:44px}.layers-v21 .shared-opacity input{height:32px;min-height:32px}}\n''')
(p/'README.md').write_text('''# V22 图层与切换稳定性

在 V21 的六个快速视图和常驻自定义图层上修复边界操作，不增加新的嵌套面板。

- 保存组合与视图、性别、图层切换使用同一队列，保存点击前已请求的最终状态；浏览器不能持久保存时明确提示仅本页保存。
- 载入组合恢复经络选中点、说明卡归属和标注按钮，保持当前视角。沿用 V21 的个人已存组合，不清空用户存档。
- 只打开乳腺等女性独有自定义图层后切换男性，显示纯体表而不是空白。未另行修改视图时，切回女性恢复原组合及不透明度。
- 内部细节开关在男女之间一致传递，不因切换隐藏筋膜等部件；不修改或虚增源模型数量。
- 手机“图层”“目录”按钮可再次点击收起。手机点击快速视图后自动收起面板查看模型；桌面和平板保持图层面板以便连续调整。提升细节按钮与滑杆的触控区域。
- 截图导出的版本和女性混合来源说明更新，不再导出 V15/V16 的旧文件名。

## 验证

checks/baseline-v21-* 记录旧版同路径结果（失败项是复现，不是新版本通过）。checks/local-* 与 checks/live-* 分开记录候选和公开网址的结果。原 V21 的63项回归另外保留为 compatibility-*，不拿已有报告冒充本次执行。

## 来源与精度边界

保留 V21 的模型数据和部件数量：女性原生体表、骨盆和内脏，加明确标源的统一比例教学参考。没有新增女性扫描，没有改变经穴定位或升级任何穴位为临床校准。原 V21 和原始模型文件保持不变。
''',encoding='utf-8')
print('V22 focused repairs assembled; original meshes and point registration unchanged')
