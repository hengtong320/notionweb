from pathlib import Path
import shutil,json,hashlib
base=Path('fullbody-tcm-v13');dst=Path('fullbody-tcm-v14');tools=Path('atlas14-delivery')
if dst.exists():shutil.rmtree(dst)
shutil.copytree(base,dst)
for f in ['checks','delivery-release.json','build-info.json']:
 p=dst/f
 if p.is_dir():shutil.rmtree(p)
 elif p.exists():p.unlink()
(dst/'checks').mkdir()
def change(file,old,new):
 p=dst/file;s=p.read_text();assert old in s,(file,old[:120]);p.write_text(s.replace(old,new))
change('app.js',"from './shared-v13.js'","from './shared-v14.js'")
change('index.html','shared-v13.css','shared-v14.css')
change('index.html','V13 · 视角保持与经脉分辨','V14 · 共用学习界面')
change('index.html','V11 · 版本记录','版本记录')
for f in ['shared-v14.js','shared-v14.css']:shutil.copy2(tools/f,dst/f)
p=dst/'evidence-ui-v9.js';s=p.read_text()
a=s.index(" const panel=document.getElementById('tcmControls'),intro=")
b=s.index(" const card=document.createElement('section');",a)
s=s[:a]+''' const panel=document.getElementById('tcmControls'),intro=document.createElement('section');intro.className='v9-mode-box';intro.innerHTML='<div class="v12-acu-actions"><button id="v9ChannelInfo">所选经脉介绍</button><button id="v12SourceInfo">来源与说明</button></div>';panel.querySelector('.tcm-head').after(intro);
 const badge=document.createElement('div');badge.id='v9PrecisionBadge';badge.className='v9-precision-badge';document.querySelector('.stage').append(badge);
 const sync=()=>{badge.textContent='经穴示意 · 未校准';badge.hidden=!api.getState().enabled||document.body.dataset.bodySex==='female';};
 api.setPrecisionMode('illustrative');document.getElementById('v12SourceInfo').onclick=()=>document.getElementById('sourceDialog').showModal();window.addEventListener('atlas:tcm-visibility',sync);window.addEventListener('atlas:sex-changed',sync);sync();
''' + s[b:]
s=s.replace("function show(ids){api.clearPointSelection?.();", "function show(ids){document.body.classList.add('reference-detail');api.clearPointSelection?.();")
p.write_text(s)
change('learning-enhancements.js','p=canonicalPoint(p);',"p=canonicalPoint(p);if(state.bodySex==='female'){p={...p,position:null,navigationArea:null,landmarks:[]};toggleTCM(true);}document.body.classList.add('reference-detail');")
change('learning-enhancements.js','function fitMeridian(requestedDirection=null){',"function fitMeridian(requestedDirection=null){if(state.bodySex==='female')return false;")
change('learning-enhancements.js','function focusReference(p){',"function focusReference(p){if(state.bodySex==='female')return false;")
change('learning-enhancements.js','function setStudyContext(p){',"function setStudyContext(p){if(state.bodySex==='female'){studyContext=null;return;}")
change('learning-enhancements.js',"card.innerHTML=pointCardV9(p,m,BY_ID);","card.innerHTML=pointCardV9(p,m,BY_ID);if(state.bodySex==='female'){$('focusPointBtn').disabled=true;$('focusPointBtn').textContent='此模型暂无点位';const hint=document.createElement('p');hint.className='shared-coverage';hint.textContent='介绍与名称共用；女性三维点位未标注，当前视角不变。';card.querySelector('.tcm-card-actions').after(hint);}")
change('learning-enhancements.js',"if(focus&&!p.position&&!p.navigationArea){document.body.classList.add('detail-open');toast('尚无可导航位置，保留资料说明');}","if(focus&&!p.position&&!p.navigationArea){document.body.classList.add('detail-open');}")
change('learning-enhancements.js',"for(const b of box.querySelectorAll('[data-study-profile]'))b.onclick=async()=>{if(!studyContext&&selectedPoint)focusReference(selectedPoint);await window.__ATLAS_TISSUES__?.setProfile(b.dataset.studyProfile);refreshLayerContext();};", "if(state.bodySex==='female'){box.querySelector('h4').textContent='在当前视角看结构';box.querySelector('p').textContent='切换图层不改变视角；女性点位尚未标注。';}for(const b of box.querySelectorAll('[data-study-profile]'))b.onclick=async()=>{await window.__ATLAS_SHARED__?.choose(b.dataset.studyProfile,true,{keepSection:true});refreshLayerContext();};")
change('learning-enhancements.js',"const profile=window.__ATLAS_TISSUES__?.getState().profile||'bones';", "const profile=window.__ATLAS_SHARED__?.getState().scene||window.__ATLAS_TISSUES__?.getState().profile||'bones';")
change('female-v12.js',"let sexSerial=0,sexBusy=false;", "let sexSerial=0,sexBusy=false;")
change('female-v12.js',"speech.stop?.();setMode('orbit');learning.cancelPendingFocus?.();learning.toggleTCM(false);learning.suspend(true);", "speech.stop?.();setMode('orbit');learning.cancelPendingFocus?.();learning.suspend(true);")
change('female-v12.js',"const ticket=++sexSerial;if((sex==='female')===active", "const tcmEnabled=learning.getState().enabled;const ticket=++sexSerial;if((sex==='female')===active")
change('female-v12.js',"learning.toggleTCM(!!saved?.enabled);", "learning.toggleTCM(tcmEnabled);")
change('female-v12.js',"muscles:'surface',nerves:'nerves',compare:'surface'", "muscles:'muscles',nerves:'nerves',compare:'compare'")
change('female-v12.js',"const sceneLayers={surface:['surface']", "const sceneLayers={muscles:['muscular','surface'],compare:['surface','skeletal','nervous'],surface:['surface']")
change('female-v12.js',"s={on:false,loaded:false,promise:null,meshes:[]}","s={on:false,opacity:1,loaded:false,promise:null,meshes:[]}")
change('female-v12.js',"n.material.transparent=opacity<1;", "opacity*=s.opacity??1;n.material.transparent=opacity<1;")
change('female-v12.js',"get active(){return active;},setSex", "setOpacity:(id,v)=>{const s=systems.get(id);if(s){s.opacity=Math.max(.08,Math.min(1,Number(v)||1));update();}},getVisibleCatalog:()=>visible().map(n=>n.userData.female),clearSelection:()=>{selected=null;isolated=false;update();showIntro();},get active(){return active;},setSex")
change('female-v12.js',"on:s.on,loaded:s.loaded,count:s.meshes.length", "on:s.on,opacity:s.opacity??1,loaded:s.loaded,loading:!!s.promise&&!s.loaded,count:s.meshes.length,visible:s.meshes.filter(n=>n.visible&&active).length")
change('female-v12.js',"async function select(id,doFocus=true){", "async function select(id,doFocus=true){document.body.classList.remove('reference-detail','point-detail-active');")
change('female-v12.js',"if(doFocus)focus();document.body.classList.remove('nav-open');document.body.classList.add('detail-open');return true;", "if(doFocus)focus();document.body.classList.remove('nav-open');document.body.classList.add('detail-open');window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'tissue',id:row.id,name:row.name,side:row.side}}));window.dispatchEvent(new Event('atlas:structure-updated'));return true;")
change('female-v12.js',"function showIntro(){detail.hidden=false;", "function showIntro(){document.body.classList.remove('reference-detail');detail.hidden=false;")
change('tissues-v4.js',"function choose(id,focus=false){", "function choose(id,focus=false){document.body.classList.remove('reference-detail');")
change('tissues-v4.js',"getCatalog:()=>[...entries.values()].map(n=>n.userData.atlas),", "getCatalog:()=>[...entries.values()].map(n=>n.userData.atlas),revealStructure:id=>{hiddenStructures.delete(id);organBox=null;isolated=false;state.tissueIsolated=false;lastKey='';updateFrame();},")
change('app.js',"function selectBone(id,fromList=false,announce=false){", "function selectBone(id,fromList=false,announce=false){document.body.classList.remove('reference-detail');")
change('stability-v10.js',"if(window.__ATLAS_FEMALE__?.active)return;", "if(window.__ATLAS_FEMALE__?.active){document.body.dataset.currentKind=current.kind;$('currentStudyName').textContent=current.name||current.id;$('currentStudyMode').textContent=['point','meridian'].includes(current.kind)?'经穴介绍':'解剖结构';invalidate();return;}")
p=dst/'refinement-v12.js';s=p.read_text().replace('女性暂不显示男性经穴坐标。','经穴名称与介绍共用；女性三维点位未标注。');p.write_text(s)
(dst/'README.md').write_text('''# V14 共用学习界面

男女使用同一结构目录、搜索、图层组合、透明度及经穴资料组件。切换只更换数据，保留页签、输入、筛选、展开状态和相对观察视角。

去掉“只读资料”双重开关；经络开关直接控制点线。共用完整经穴介绍，女性尚无配准点位，因此不将男性三维坐标套用；未提供的结构显示覆盖状态，不伪造数据。

保持模型、骨块拆解、拼音、语音、证据、来源许可和全部历史版本。新版未改变模型顶点或穴位坐标，未完成临床定位或整套音频人工审听。
''')
print('PATCHED V14')
change('female-v12.js',"const v=t.dataset.view;if(v)","if(document.body.classList.contains('reference-detail')&&['focusBtn','focusCurrent'].includes(t.id)){e.preventDefault();e.stopImmediatePropagation();return;}const v=t.dataset.view;if(v)")
