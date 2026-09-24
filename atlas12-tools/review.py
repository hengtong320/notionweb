"""Review-stage corrections from actual desktop and phone screenshots."""
from pathlib import Path
import json,re
from pypinyin import lazy_pinyin,Style
p=Path('fullbody-tcm-v12')
def edit(n,a,b):
 f=p/n;s=f.read_text();assert a in s,(n,a[:90]);f.write_text(s.replace(a,b))
edit('app.js',"const clamp=THREE.MathUtils.clamp;", "const initialReferenceHash=location.hash;\nconst clamp=THREE.MathUtils.clamp;")
edit('app.js','femaleViewer=initFemale({THREE,scene,', 'femaleViewer=initFemale({initialHash:initialReferenceHash,THREE,scene,')
edit('app.js','function setView(name){invalidate();',"function setView(name){if(femaleViewer?.active){femaleViewer.view(name);return;}invalidate();")
edit('app.js','else fitToContent(false);}needsLabelRebuild=true;', "else if(tissueLayer?.getState().organView){const b=tissueLayer.getState().organView;focusBounds(new THREE.Box3(new THREE.Vector3(...b[0]),new THREE.Vector3(...b[1])),{direction:camera.position.clone().sub(controls.target).normalize().toArray()});}else fitToContent(false);}needsLabelRebuild=true;")
edit('female-v12.js', "const h=new URLSearchParams(location.hash.slice(1));", "const h=new URLSearchParams((ctx.initialHash||location.hash).slice(1));")
edit('female-v12.js',"let catalog=null,loadCatalog=null,active=false,serial=0,preset='surface',selected=null,isolated=false,mode='solid',side='both',saved=null;", "let catalog=null,loadCatalog=null,active=false,serial=0,preset='surface',selected=null,isolated=false,mode='solid',side='both',saved=null,viewName='front';")
edit('female-v12.js',"pane.innerHTML='<h2>","pane.innerHTML='<button id=\"femaleCloseNav\" class=\"female-drawer-close\" aria-label=\"收起女性目录\">收起目录 ×</button><h2>")
edit('female-v12.js',"document.querySelector('.sidebar').append(pane);", "document.querySelector('.sidebar').append(pane);$('femaleCloseNav').onclick=()=>document.body.classList.remove('nav-open');")
edit('female-v12.js',"detail.innerHTML='<span", "detail.innerHTML='<button id=\"femaleCloseDetail\" class=\"female-drawer-close\" aria-label=\"收起女性详情\">收起详情 ×</button><span")
edit('female-v12.js','detail.innerHTML=`<span', 'detail.innerHTML=`<button id="femaleCloseDetail" class="female-drawer-close" aria-label="收起女性详情">收起详情 ×</button><span')
edit('female-v12.js',"function bindDetail(){", "function bindDetail(){$('femaleCloseDetail')&&($('femaleCloseDetail').onclick=()=>document.body.classList.remove('detail-open'));")
edit('female-v12.js',"else fit();}\n async function setPreset", "else fit();}\n function view(name){const dirs={front:[0,0,1],back:[0,0,-1],overview:[.8,.25,1],medial:[1,0,0],lateral:[-1,0,0],dorsal:[0,1,.01],plantar:[0,-1,.01]};if(!dirs[name])return;viewName=name;document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$('viewBadge').lastElementChild.textContent={front:'前面',back:'后面',overview:'立体',medial:'人体左面',lateral:'人体右面',dorsal:'上方',plantar:'下方'}[name];fit(dirs[name]);}\n async function setPreset")
edit('female-v12.js',"focusBounds(box.expandByScalar(preset==='pelvis'?25:15),{direction:dir||[0,.04,1],up:[0,1,0]});", "{focusBounds(box.expandByScalar(preset==='pelvis'?25:15),{direction:dir||[0,.04,1],up:[0,1,0]});camera.position.sub(controls.target).multiplyScalar(preset==='surface'?1.18:1.06).add(controls.target);controls.update();camera.updateMatrixWorld(true);invalidate();}")
edit('female-v12.js',"mode='solid';$('femaleMode').value='solid';for(const[key,s]of systems)", "mode=id==='breast'?'context':'solid';$('femaleMode').value=mode;for(const[key,s]of systems)")
edit('female-v12.js',"update();renderList();fit();document.body.classList.remove('nav-open');return true;", "update();renderList();view('front');document.body.classList.remove('nav-open','detail-open');return true;")
edit('female-v12.js',"if(mode==='context'&&r.system==='skeletal')opacity=.4;", "if(mode==='context'&&r.system==='skeletal')opacity=.4;if(mode==='context'&&r.system==='breast'&&/fat/.test(r.sourceName))opacity=.16;")
edit('female-v12.js',"await enable(row.system,true);hidden.delete(id);selected=id;isolated=false;", "await enable(row.system,true);if(!active)return false;hidden.delete(id);const keepIsolated=isolated&&selected===id;selected=id;isolated=keepIsolated;")
edit('female-v12.js',"const v=t.dataset.view;if(v){e.preventDefault();e.stopImmediatePropagation();const dirs={front:[0,0,1],back:[0,0,-1],overview:[.8,.25,1],medial:[1,0,0],lateral:[-1,0,0],dorsal:[0,1,.01],plantar:[0,-1,.01]};fit(dirs[v]);return;}", "const v=t.dataset.view;if(v){e.preventDefault();e.stopImmediatePropagation();view(v);return;}")
edit('female-v12.js',"select,enable,focus,fit,click,capture,", "select,enable,focus,fit,view,click,capture,")
edit('female-v12.js',"active,preset,mode,side,selected,isolated,source:", "active,preset,mode,side,view:viewName,selected,isolated,source:")
edit('female-v12.js',"function updateLabel(){if(!active||!selected)", "function updateLabel(){if(active){const n=visible().length+' 个女性结构';if($('visibleCount').textContent!==n)$('visibleCount').textContent=n;if($('renderStatus').textContent!=='女性 · HRA参考')$('renderStatus').textContent='女性 · HRA参考';}if(!active||!selected)")
edit('female-v12.js',"saved={region:state.region,", "saved={view:state.view,region:state.region,")
edit('female-v12.js',"speech.stop?.();setMode('orbit');resetBones(true);", "speech.stop?.();setMode('orbit');resetBones(true);$('toast').classList.remove('show');")
edit('female-v12.js',"tissues.showPanel(true);try{history.replaceState", "if(saved?.view)document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===saved.view));$('renderStatus').textContent='男性 · 解剖参考';tissues.showPanel(true);try{history.replaceState")
edit('refinement-v12.js',"const update=()=>{const s=tissues.getState();", "const update=()=>{const s=tissues.getState();document.body.classList.toggle('tcm-display-on',learning.getState().enabled);if(!female.active){$('renderStatus').textContent='男性 · 解剖参考';const num=Object.values(s.systems).filter(x=>x.on).reduce((n,x)=>n+x.visible,0);if(num){const count=window.__FOOT_ATLAS__.getState().visible+num;const text=count+' 个可见结构';if($('visibleCount').textContent!==text)$('visibleCount').textContent=text;}}")
edit('refinement-v12.js',"window.addEventListener('atlas:profile-changed',update);", "window.addEventListener('atlas:tcm-visibility',()=>requestAnimationFrame(update));window.addEventListener('atlas:profile-changed',update);")
edit('refinement-v12.js',"const focus=document.createElement('button');", "panel.querySelectorAll('[data-system-view]').forEach(b=>{b.onclick=async()=>{await tissues.setAnatomyView(b.dataset.systemView);if(innerWidth>1100)tissues.showPanel(true);update();};});\n const focus=document.createElement('button');")
f=p/'refinement-v12.css';f.write_text(f.read_text()+'''
#layerLegend{display:none!important}
body:not(.tcm-display-on) #tcmLayerToggle,body:not(.tcm-display-on) #meridianQuick,body:not(.tcm-display-on) #tcmQuickFit{display:none!important}
body:not(.tcm-display-on) .study-toolbar{width:auto;max-width:100%;padding:0;box-shadow:none;background:transparent}
.female-view #moreViewsBtn,.female-view #autoSpeakBtn,.female-view #labelsBtn,.female-view #colorBtn,.female-view #ghostBtn,.female-view .stage-tools>span{display:none!important}
.female-view .stage-tools{top:220px}
.female-drawer-close{display:none}
@media(max-width:1100px){.female-drawer-close{display:block;position:sticky;top:0;z-index:5;margin:0 0 10px auto;border:1px solid #d3dfcc;background:#f6faef;padding:8px 12px;min-height:40px;border-radius:7px;color:#3e6450;font-size:12px;cursor:pointer}.female-view .stage-tools{top:160px}}
''')
f=p/'assets/female/catalog.json';d=json.loads(f.read_text())
exact={'VH_F_hilum_L':'左肺门','VH_F_hilum_R':'右肺门','VH_F_hilum_upper_L':'左肺上叶肺门','VH_F_hilum_lower_L':'左肺下叶肺门','VH_F_hilum_upper_R':'右肺上叶肺门','VH_F_hilum_middle_R':'右肺中叶肺门','VH_F_hilum_lower_R':'右肺下叶肺门','VH_F_left_cardiac_atrium':'左心房','VH_F_right_cardiac_atrium':'右心房','VH_F_inferior_vena_cava_a':'下腔静脉（段一）','VH_F_inferior_vena_cava_b':'下腔静脉（段二）','VH_F_descending_aorta_a':'降主动脉（段一）','VH_F_descending_aorta_b':'降主动脉（段二）','VH_F_epiglotic_cartilage':'会厌软骨','VH_F_cricoid_cartilage':'环状软骨','VH_F_thyroid_cartilage':'甲状软骨','VH_F_tracheal_cartilage':'气管软骨','VH_F_carina':'气管隆嵴','VH_F_left_main_bronchus':'左主支气管','VH_F_right_main_bronchus':'右主支气管','VH_F_lingula_superior_bronchopulmonary_segment':'左肺上舌段','VH_F_lingula_inferior_bronchopulmonary_segment':'左肺下舌段'}
segment={'anterior':'前','posterior':'后','apical':'尖','superior':'上','medial':'内侧','lateral':'外侧','anterior_basal':'前底','posterior_basal':'后底','medial_basal':'内侧底','lateral_basal':'外侧底','lingula_superior':'上舌','lingula_inferior':'下舌'}
for r in d['entries']:
 n=r['sourceName'];v=exact.get(n)
 if not v:
  m=re.fullmatch(r'VH_F_(left|right)_(.+)_bronchopulmonary_segm(?:ent|ennt)?',n)
  if m and m[2] in segment:v=('左' if m[1]=='left' else '右')+'肺'+segment[m[2]]+'段'
 if not v:
  m=re.fullmatch(r'VH_F_(left|right)_(.+)_bronch(?:us|i)',n)
  if m and m[2] in segment:v=('左' if m[1]=='left' else '右')+segment[m[2]]+'段支气管'
 if not v:
  m=re.fullmatch(r'VH_F_(left|right)_(superior|inferior|middle)_lobar_bronchus',n)
  if m:v=('左' if m[1]=='left' else '右')+{'superior':'上','inferior':'下','middle':'中'}[m[2]]+'叶支气管'
 if not v:
  m=re.fullmatch(r'VH_F_(arytenoid_cartilage|corniculate_cartilage|cartilage_of_main_bronchus|cartilage_of_lobar_bronchus|cartilage_of_tertiary_bronchus)_(L|R)',n)
  if m:v=('左' if m[2]=='L' else '右')+{'arytenoid_cartilage':'杓状软骨','corniculate_cartilage':'小角软骨','cartilage_of_main_bronchus':'主支气管软骨','cartilage_of_lobar_bronchus':'肺叶支气管软骨','cartilage_of_tertiary_bronchus':'肺段支气管软骨'}[m[1]]
 if v:r['name']=v;r['pinyin']=' '.join(lazy_pinyin(v,style=Style.TONE,errors=lambda x:[x]))
f.write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')))
(p/'README.md').write_text((p/'README.md').read_text()+'\n画面复核修正：女性体表全景留出顶部视角区；女性独立链接恢复与数字视角快捷键；手机女性目录、详情有自己的收起按钮；乳腺默认透明脂肪参照；女性只显示适用工具，不显示男模面数；胸腔快捷切换后保留图层设置。\n')
# Verify complete links and actual mobile drawer actions as part of both browser journeys.
f=Path('atlas12-tools/verify.cjs');s=f.read_text();target="ck('No uncaught page errors',report.errors.length===0,report.errors);";assert target in s
addition="""
await page.goto(url.split('#')[0]+'#sex=female&preset=pelvis&id=hraf-473&mode=focus&side=left',{waitUntil:'load',timeout:90000});await page.waitForFunction(()=>{const s=window.__ATLAS_FEMALE__?.getState();return s?.active&&s.selected==='hraf-473'&&s.mode==='focus'&&s.side==='left';},undefined,{timeout:120000});await settle();ck('Reloaded female deep link restores exact target and display context',await page.evaluate(()=>window.__ATLAS_FEMALE__.getState().selected==='hraf-473'));
await page.keyboard.press('2');await settle();ck('Female numbered view shortcuts do not invoke male camera',await page.evaluate(()=>window.__ATLAS_FEMALE__.getState().view==='dorsal'));await page.locator('[data-view="front"]').click();await settle();
await page.setViewportSize({width:390,height:844});await settle();await page.locator('#openNav').click();ck('Phone female directory can be opened',await page.locator('#femaleCloseNav').isVisible());await page.locator('#femaleCloseNav').click();ck('Phone female directory has a working close control',await page.locator('#femaleLibrary').isHidden());await page.locator('#openDetail').click();ck('Phone female detail has its own close control',await page.locator('#femaleCloseDetail').isVisible());await page.locator('#femaleCloseDetail').click();ck('Phone closes detail to expose the actual model',await page.locator('#femaleDetail').isHidden());await page.locator('#openNav').click();await page.locator('[data-female-preset="surface"]').click();await page.waitForFunction(()=>window.__ATLAS_FEMALE__.getState().preset==='surface');await settle();await page.screenshot({path:out+'/'+kind+'-female-phone-final.png'});
await page.setViewportSize({width:1440,height:1000});await settle();ck('Female tools exclude stale bone-only controls',await page.locator('#labelsBtn').isHidden()&&await page.locator('#moreViewsBtn').isHidden());await page.screenshot({path:out+'/'+kind+'-female-body-final.png'});
"""
f.write_text(s.replace(target,addition+target))
print('V12_REVIEW_FIXES_READY')
