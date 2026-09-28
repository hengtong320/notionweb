"""Targeted V23 selection fixes. No model or point-registration changes."""
from pathlib import Path
import shutil
p=Path('fullbody-tcm-v23')
assert not p.exists(), 'Refuse to overwrite an existing release'
shutil.copytree('fullbody-tcm-v22',p)
shutil.rmtree(p/'checks',ignore_errors=True)
for n in ['release.json','build-info.json']:(p/n).unlink(missing_ok=True)
def edit(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:100]);f.write_text(s.replace(old,new,1))
# Selection must obey the user's subsequent side filter.
edit('female-v12.js',"if(r.id===selected)n.visible=s.on&&!hidden.has(r.id);", "if(r.id===selected)n.visible=s.on&&!hidden.has(r.id)&&(side==='both'||r.side==='midline'||r.side==='bilateral'||r.side===side);")
edit('female-v12.js',"side='both';$('femaleSide').value='both';update();showSelected();", "if(side!=='both'&&!['midline','bilateral',side].includes(row.side))side='both';$('femaleSide').value=side;update();showSelected();")
edit('female-v12.js',"function bindDetail(){", "function detailMutation(key,fn){const a=window.__ATLAS_SHARED__;return (a?a.runMutation(key,fn):Promise.resolve().then(fn)).catch(e=>toast('操作未完成：'+e.message));}\n function announceRegion(){window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'region',id:preset,name:'女性 · 当前结构',side}}));window.dispatchEvent(new Event('atlas:structure-updated'));}\n function bindDetail(){")
edit('female-v12.js',"$('femaleIsolate').onclick=()=>{isolated=!isolated;update();focus();showSelected();}", "$('femaleIsolate').onclick=()=>detailMutation('isolate-structure',()=>{isolated=!isolated;update();focus();showSelected();})")
edit('female-v12.js',"$('femaleHide').onclick=()=>{const n=maps.get(selected);if(n){hidden.add(selected);n.visible=false;}selected=null;isolated=false;tag.hidden=true;renderList();showIntro();invalidate();}", "$('femaleHide').onclick=()=>detailMutation('hide-structure',()=>{if(selected)hidden.add(selected);selected=null;isolated=false;tag.hidden=true;update();renderList();showIntro();announceRegion();})")
edit('female-v12.js',"setSide:v=>{if(['both','left','right'].includes(v)){side=v;$('femaleSide').value=v;update();}}", "setSide:v=>{if(['both','left','right'].includes(v)){side=v;$('femaleSide').value=v;const r=maps.get(selected)?.userData.female;if(r&&v!=='both'&&!['midline','bilateral',v].includes(r.side)){selected=null;isolated=false;showIntro();announceRegion();}update();renderList();}}")
edit('female-v12.js',"restoreHidden:()=>{hidden.clear();isolated=false;update();renderList();}", "setIsolated:v=>{isolated=!!v&&!!selected;update();showSelected();},restoreHidden:()=>{hidden.clear();isolated=false;update();renderList();if(selected)showSelected();else showIntro();}")
# A explicitly selected fascia can be inspected without enabling all details.
edit('tissues-v4.js',"(m.category!=='fascia'||fascia)","(m.category!=='fascia'||fascia||m.id===selected?.id)")
edit('tissues-v4.js',"$('hideStructure').onclick=()=>{hiddenStructures.add(id);clearSelection();updateFrame();}", "$('hideStructure').onclick=()=>{const hide=()=>{hiddenStructures.add(id);clearSelection();updateFrame();window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'region',id:profile,name:'男性 · 当前结构',side:state.side}}));window.dispatchEvent(new Event('atlas:structure-updated'));};const a=window.__ATLAS_SHARED__;if(a)a.runMutation('hide-structure',hide).catch(e=>toast(e.message));else hide();}")
edit('tissues-v4.js',"const api={setOrganScope:", "const api={setIsolated:v=>{isolated=!!v&&!!selected;state.tissueIsolated=isolated;ctx.applyVisibility();lastKey='';updateFrame();if(selected)choose(selected.id,false);},setOrganScope:")
# Temporarily inspect internal structures without making the skin transparent.
edit('shared-v14.js',"const historyUI={};", "const historyUI={};let directoryReturn=null;\n const preview=document.createElement('div');preview.id='directoryPreview';preview.hidden=true;preview.setAttribute('role','status');preview.innerHTML='<span id=directoryPreviewText></span><button id=directoryPreviewReturn type=button>返回先前视图</button>';document.querySelector('.stage').append(preview);\n function clearDirectoryPreview(){directoryReturn=null;preview.hidden=true;}\n $('directoryPreviewReturn').onclick=()=>enqueueAction('directory-return',async()=>{const held=directoryReturn;if(!held)return;clearDirectoryPreview();await rollbackWorkspace(held);if(held.selection&&!held.reference)window.dispatchEvent(new CustomEvent('atlas:selection',{detail:held.selection}));}).catch(fail);")
edit('shared-v14.js',"function captureWorkspace(){return {sex:sex(),", "function captureWorkspace(){return {selection:window.__ATLAS_STUDY__?.getState().current,sex:sex(),")
edit('shared-v14.js',"try{return await fn();}","try{if(!['structure','directory-return','save-combo','reference'].includes(key))clearDirectoryPreview();return await fn();}")
old=""" async function pickStructureNow(id){const row=activeCatalog().find(r=>r.id===id);if(!row)return false;const currentSex=sex(),token=++selectionTicket;document.body.classList.remove('reference-detail','point-detail-active');currentReference=false;currentPoint=null;
  layoutRevision++;scene='custom';if(female.active){female.setCustom();await female.select(id,true);}else if(row.kind==='bone'){window.__FOOT_ATLAS__.selectBone(id,true,true);$('focusBtn').click();}else{tissues.clearOrganScope();await tissues.enable(row.system,true);if(token!==selectionTicket||currentSex!==sex())return false;tissues.revealStructure(id);tissues.choose(id,true);}schedule();return true;
 }"""
new=""" async function pickStructureNow(id){await ensureCatalog();const row=activeCatalog().find(r=>r.id===id);if(!row)return false;const currentSex=sex(),token=++selectionTicket;
  const shell=snapshots().surface,covered=row.system!=='surface'&&shell?.on&&(shell.opacity??1)>=.9;
  if(covered&&!directoryReturn)directoryReturn=captureWorkspace();const solo=!!directoryReturn&&row.system!=='surface';
  document.body.classList.remove('reference-detail','point-detail-active');currentReference=false;currentPoint=null;learning.clearStudyContext(true);
  layoutRevision++;scene='custom';
  if(female.active){female.setCustom();await female.select(id,true);if(solo){female.setIsolated(true);female.focus();}}
  else if(row.kind==='bone'){tissues.clearSelection();window.__FOOT_ATLAS__.restoreBoneState({bonesOn:true,isolated:false,neighbors:false});window.__FOOT_ATLAS__.selectBone(id,true,true);if(solo)window.__FOOT_ATLAS__.restoreBoneState({isolated:true});$('focusBtn').click();}
  else{window.__FOOT_ATLAS__.restoreBoneState({isolated:false,neighbors:false});tissues.clearOrganScope();await tissues.enable(row.system,true);if(token!==selectionTicket||currentSex!==sex())return false;tissues.revealStructure(id);tissues.choose(id,false);if(solo)tissues.setIsolated(true);tissues.choose(id,true);}
  if(solo){preview.hidden=false;$('directoryPreviewText').textContent='单独查看 · '+row.name+'（先前图层已保留）';}else if(row.system==='surface')clearDirectoryPreview();
  document.body.classList.remove('nav-open');document.body.classList.add('detail-open');schedule();return true;
 }"""
edit('shared-v14.js',old,new)
edit('shared-v14.js',"sidebar.append(directory);", "sidebar.append(directory);const resetSearch=el('button','directory-reset');resetSearch.type='button';resetSearch.id='structureReset';resetSearch.textContent='清空筛选';directory.querySelector('.shared-filters').after(resetSearch);resetSearch.onclick=()=>{for(const id of ['structureSystem','structureScope'])$(id).value='all';$('structureSearch').value='';libraryPage=0;renderDirectory();$('structureSearch').focus();};")
edit('shared-v14.js',"$('structurePrevious').onclick=()=>{libraryPage--;renderDirectory();};$('structureNext').onclick=()=>{libraryPage++;renderDirectory();};", "function pageDirectory(delta){libraryPage+=delta;renderDirectory();$('structureResults').scrollIntoView({block:'start',behavior:'auto'});$('structureResults').querySelector('button')?.focus({preventScroll:true});}\n $('structurePrevious').onclick=()=>pageDirectory(-1);$('structureNext').onclick=()=>pageDirectory(1);")
edit('shared-v14.js',"$('structureResults').innerHTML=", "$('structureReset').hidden=!query&&sys==='all'&&scope==='all';\n  $('structureResults').innerHTML=")
edit('layers-ui-v21.js',"if(e.target===dialog)dialog.close();", "const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();")
for name in ['index.html','index.template.html','app.js','shared-v14.js','female-v12.js','stability-v10.js','layers-ui-v21.js','versions.html']:
 f=p/name;s=f.read_text().replace('22.0.0','23.0.0').replace('V22','V23').replace('V23 · 图层与切换稳定性','V23 · 结构选择与定位');f.write_text(s)
with (p/'layers-ui-v21.css').open('a') as f:f.write('''\n#directoryPreview{position:absolute;left:50%;top:112px;transform:translateX(-50%);z-index:25;display:flex;align-items:center;gap:12px;max-width:calc(100% - 32px);padding:9px 12px;border:1px solid #c4d6c7;border-radius:9px;background:#f9fcf5;color:#355844;font-size:12px;box-shadow:0 2px 12px #18372916}#directoryPreview[hidden]{display:none!important}#directoryPreview button{flex-shrink:0;min-height:36px;border:1px solid #9cbaa4;border-radius:6px;background:#edf4e9;color:#285a3c;padding:5px 10px;cursor:pointer}.directory-reset{margin:6px 0 10px;border:0;background:none;color:#396b50;text-decoration:underline;text-underline-offset:3px;padding:6px 2px;cursor:pointer}#structureResults{scroll-margin-top:12px}@media(max-width:600px){#directoryPreview{top:132px;width:calc(100% - 36px);font-size:11px;gap:6px;padding:6px 8px}#directoryPreview button{min-height:44px}.directory-reset{min-height:44px}}\n''')
(p/'README.md').write_text('''# V23 结构选择与定位

从 V22 继续修复结构选择路径，不改模型、经穴坐标或图层来源。

- 目录定位遇到不透明体表遮挡时，临时单独查看目标；不调低皮肤不透明度。上方“返回先前视图”恢复之前图层、选择、视角和经络状态。新的手动图层或性别操作结束这次临时预览，不保存跨性别的过期返回目标。
- 从软组织单独查看切换到骨骼目录时，解除旧软组织隔离并启用骨层；骨层关闭时也能正常定位搜索结果。
- 女性已选结构遵守随后切换的左右侧筛选；选择同侧结构不再偷偷复位为双侧。单独查看后隐藏当前结构，会立即恢复剩余可见结构并同步当前对象，不留空白和过期名称。
- 男性隐藏组织后同步当前学习对象；指定搜索一个筋膜部件时可直接查看，不需要先打开全部附属组织。
- 搜索增加“清空筛选”，翻页后滚回新结果顶部；模型说明弹窗内部留白不再被误判为遮罩点击。

checks/baseline-* 是 V22 实际路径复现。checks/local-* 为新版本候选，checks/live-* 为公开网址；兼容性回归独立记录。测试结果只说明所测交互路径，不是解剖或临床校准。

女性原生与统一比例教学补充的来源边界不变。全部穴位仍未逐一临床配准。原 V22 保留。
''',encoding='utf-8')
for f in Path('fullbody-tcm-v22').glob('*.json'):
 if f.name not in ['release.json','build-info.json']:assert f.read_bytes()==(p/f.name).read_bytes(),f.name
print('V23 selection and directory repair assembled')
