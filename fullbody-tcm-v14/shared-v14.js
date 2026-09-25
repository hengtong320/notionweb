// One persistent UI, two data adapters. No male coordinates are used as female anatomy.
export function initSharedControls(ctx){
 const {learning,tissues,female,state,toast,invalidate,captureCamera,restoreCamera}=ctx;
 const $=id=>document.getElementById(id),el=(tag,cls)=>Object.assign(document.createElement(tag),{className:cls||''});
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f\s]/g,'').toLowerCase();
 const panel=$('tissuePanel'),sidebar=document.querySelector('.sidebar'),bonePane=document.querySelector('.bone-pane');
 const layers=[
  {id:'skeletal',name:'骨骼与关节',male:['bones'],female:['skeletal']},
  {id:'muscular',name:'肌肉',male:['muscular'],female:['muscular']},
  {id:'nervous',name:'神经',male:['nervous'],female:['nervous']},
  {id:'organs',name:'器官与气道',male:['visceral'],female:['respiratory','digestive','urinary','reproductive']},
  {id:'vascular',name:'心脏与血管',male:['heart','vessels'],female:['vascular']},
  {id:'surface',name:'体表',male:['surface'],female:['surface']},
  {id:'ear',name:'耳部',male:['ear'],female:[]},
  {id:'breast',name:'乳腺',male:[],female:['breast']},
  {id:'lymphatic',name:'淋巴与免疫',male:[],female:['lymphatic']}
 ];
 const sceneNames={bones:'骨骼结构',muscles:'肌肉外形',nerves:'神经走行',compare:'分层对照',chest:'胸腔器官',heart:'心脏特写',abdomen:'腹部器官',vascular:'心血管',surface:'体表经络',pelvis:'盆腔结构',breast:'乳腺结构','ear-right':'右耳','ear-left':'左耳'};
 let section='directory',scene='bones',libraryPage=0,selectionTicket=0,viewTicket=0,catalogPromise=null,maleCatalog=[],queued=false,sexSwitching=false;
 const cache={male:null,female:null};let currentPoint=null,currentReference=false;const historyUI={};
 document.body.dataset.sharedUi='14';document.body.dataset.bodySex=female.active?'female':'male';
 $('boneTab').textContent='结构目录';$('layersTab').textContent='结构图层';$('tcmTab').textContent='经络穴位';
 $('releaseBadge').textContent='V14 · 共用学习界面';$('tissueSearch').hidden=true;$('tissueList').hidden=true;
 $('organQuickBar')?.remove();$('femaleLibrary').hidden=true;
 const directory=el('section','shared-directory');directory.id='structureLibrary';
 directory.innerHTML='<h2>结构目录</h2><p class="shared-intro">搜索、筛选，点击查看同一结构。</p><label class="search-box"><input id="structureSearch" type="search" placeholder="名称 / 拼音 / English" aria-label="搜索结构" autocomplete="off"></label><div class="shared-filters"><select id="structureSystem" aria-label="结构系统"><option value="all">全部系统</option>'+layers.map(x=>`<option value="${x.id}">${x.name}</option>`).join('')+'</select><select id="structureScope" aria-label="结构范围"><option value="all">全部目录</option><option value="visible">画面可见</option></select></div><p id="structureSummary" class="shared-summary" role="status"></p><div id="structureResults" class="shared-results"></div><div class="shared-pager"><button id="structurePrevious">上一页</button><span id="structurePage"></span><button id="structureNext">下一页</button></div>';
 sidebar.append(directory);
 const sides=document.querySelector('.side-picker');directory.querySelector('.shared-filters').after(sides);
 const regions=el('details','v12-disclosure');regions.id='structureRegions';regions.innerHTML='<summary>骨骼部位快捷查看</summary>';regions.append(document.querySelector('.region-picker'));directory.querySelector('h2').after(regions);
 const paneHeader=panel.querySelector('h2');const coverage=el('p','shared-coverage');coverage.id='sharedCoverage';paneHeader.after(coverage);
 // Keep existing load callbacks alive but take the old controls out of layout.
 const legacy=$('customLayers').querySelector('.v12-custom-body');legacy.hidden=true;
 const layerRows=el('div','shared-layer-rows');layerRows.id='sharedLayerRows';
 layerRows.innerHTML=layers.map(x=>`<section data-shared-layer="${x.id}" class="shared-layer"><label><input type="checkbox" id="sharedLayer-${x.id}"><b>${x.name}</b><small id="sharedLayerState-${x.id}"></small></label><label class="shared-opacity" id="sharedOpacityRow-${x.id}"><span>不透明度</span><input id="sharedOpacity-${x.id}" type="range" min="8" max="100" value="100" aria-label="${x.name}不透明度"><output id="sharedOpacityValue-${x.id}">100%</output></label></section>`).join('');$('customLayers').append(layerRows);
 for(const l of layers){$('sharedLayer-'+l.id).onchange=e=>enableLayer(l,e.target.checked).catch(fail);$('sharedOpacity-'+l.id).oninput=e=>opacityLayer(l,Number(e.target.value)/100);}
 const display=el('label','layer-check');display.id='sharedDisplayRow';display.innerHTML='显示方式<select id="sharedDisplay" aria-label="显示方式"><option value="solid">清晰原色</option><option value="context">透明参照</option><option value="focus">突出当前</option></select>';panel.querySelector('.v12-tasks').after(display);
 $('sharedDisplay').onchange=()=>{const mode=$('sharedDisplay').value;if(female.active)female.setDisplayMode(mode);else{for(const[k,x]of Object.entries(tissues.getState().systems))if(x.on)tissues.setOpacity(k,mode==='context'?.28:1);tissues.setBoneOpacity(mode==='context'?.3:1);if(mode==='focus'&&tissues.getState().selected)tissues.choose(tissues.getState().selected.id,false);}schedule();};
 const more=el('details','v12-disclosure');more.id='sharedMoreRegions';more.innerHTML='<summary>更多部位</summary><div class="profile-grid"><button data-shared-scene="pelvis">盆腔结构</button><button data-shared-scene="breast">乳腺结构</button></div>';panel.querySelector('.v12-tasks').append(more);
 panel.querySelectorAll('[data-profile]').forEach(b=>b.onclick=()=>choose(b.dataset.profile,true).catch(fail));
 panel.querySelectorAll('[data-system-view]').forEach(b=>b.onclick=()=>choose(b.dataset.systemView,false).catch(fail));
 more.querySelectorAll('[data-shared-scene]').forEach(b=>b.onclick=()=>choose(b.dataset.sharedScene,false).catch(fail));
 $('tissueClear').textContent='只留骨骼';$('tissueClear').onclick=()=>choose('bones',true).catch(fail);$('chestCompare').hidden=true;
 const unavailable=el('p','shared-coverage');unavailable.id='sharedAcupointCoverage';unavailable.textContent='女性点位未标注；名称、搜索与介绍照常使用。';unavailable.hidden=true;$('tcmControls').querySelector('.tcm-head').after(unavailable);
 const tcmMore=el('details','v12-disclosure');tcmMore.id='sharedMeridianOptions';tcmMore.innerHTML='<summary>更多显示选项</summary><div></div>';
 for(const x of [...$('tcmControls').querySelectorAll('.tcm-xray,.guide-actions')])tcmMore.lastElementChild.append(x);
 $('tcmControls').querySelector('.tcm-side-picker').after(tcmMore);$('tcmControls').querySelector('.tcm-head b').textContent='经络穴位';$('tcmControls').querySelector('.tcm-head small').textContent='同一目录，可多选对照';
 const pair=el('button');pair.id='pairHeartPericardium';pair.textContent='心经＋心包经';$('pairHeart').after(pair);pair.onclick=()=>{learning.setMeridians(['HT','PC']);learning.toggleTCM(true);schedule();};
 const hint=el('small','shared-coverage');hint.textContent='勾选只改显示；需要移动镜头时点“看全线”。';$('meridianChips').after(hint);
 // Female and male descriptions occupy the SAME scroll container.
 document.querySelector('.detail-scroll').append($('femaleDetail'));
 const tabs=[['boneTab','directory'],['tcmTab','meridians'],['layersTab','layers']];
 for(const[id,tab]of tabs)$(id).addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();showSection(tab);},true);
 $('tcmBtn').addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();showSection('meridians');},true);
 function fail(e){toast('操作未完成：'+e.message);schedule();}
 function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;redraw();});}
 function sex(){return female.active?'female':'male';}
 function systemsFor(l){return l[sex()];}
 function available(l){return systemsFor(l).length>0;}
 function snapshots(){const t=tissues.getState(),f=female.getState();return female.active?f.systems:{bones:{on:state.bonesOn,loaded:true,count:210,visible:window.__FOOT_ATLAS__.getState().visible,opacity:t.boneOpacity},...t.systems};}
 async function ensureCatalog(){
  if(!catalogPromise)catalogPromise=Promise.all([fetch('../fullbody-tcm-v11/assets/new-catalog.json').then(r=>{if(!r.ok)throw Error('器官目录加载失败');return r.json();}),fetch('../fullbody-tcm-v9/assets/tissue-catalog.json').then(r=>{if(!r.ok)throw Error('组织目录加载失败');return r.json();})]).then(([n,t])=>{maleCatalog=[...window.__FOOT_ATLAS__.getCatalog().map(r=>({...r,system:'bones',kind:'bone'})),...t.map(r=>({...r,system:r.id.split('-')[0],kind:'tissue'})),...n.map(r=>({...r,kind:'tissue'}))];cache.male=maleCatalog;renderDirectory();}).catch(e=>{catalogPromise=null;$('structureSummary').textContent=e.message+'，点击结构目录重试。';});
  await catalogPromise;if(female.active)cache.female=female.getCatalog();
 }
 function activeCatalog(){if(female.active)return female.getCatalog().map(r=>({...r,kind:'tissue'}));return maleCatalog.length?maleCatalog:window.__FOOT_ATLAS__.getCatalog().map(r=>({...r,kind:'bone',system:'bones'}));}
 function groupFor(r){return layers.find(l=>l[sex()].includes(r.system))?.id||'other';}
 function matchesSide(r){const s=$('structureSide')?.value||(female.active?female.getState().side:state.side);return s==='both'||!s||r.side==='midline'||r.side===s||r.side==='bilateral';}
 function currentId(){return female.active?female.getState().selected:window.__ATLAS_STUDY__?.getState().current?.id;}
 function renderDirectory(){
  const query=norm($('structureSearch').value),sys=$('structureSystem').value,scope=$('structureScope').value,rows=activeCatalog();
  const visible=new Set(female.active?female.getVisibleCatalog().map(r=>r.id):[...tissues.getVisibleCatalog().map(r=>r.id),...window.__FOOT_ATLAS__.getState().bones.filter(r=>r.visible).map(r=>r.id)]);
  const arr=rows.filter(r=>(sys==='all'||groupFor(r)===sys)&&matchesSide(r)&&(scope!=='visible'||visible.has(r.id))&&(!query||norm([r.name,r.pinyin,r.en,r.english,r.id,r.sourceName].join(' ')).includes(query)));
  const pages=Math.max(1,Math.ceil(arr.length/60));libraryPage=Math.max(0,Math.min(libraryPage,pages-1));const id=currentId();
  const summary=(female.active?'女性':'男性')+' · '+arr.length+' 个结构'+(scope==='visible'?' · 画面可见':' · 点击时按需加载');$('structureSummary').textContent=summary;
  $('structureResults').innerHTML=arr.slice(libraryPage*60,(libraryPage+1)*60).map(r=>`<button data-structure-id="${esc(r.id)}" class="${r.id===id?'active':''}" aria-pressed="${r.id===id}"><b>${esc(r.name)}</b><small>${esc(r.pinyin||r.en||r.english||'')}</small><span>${visible.has(r.id)?'已显示':'可查看'}</span></button>`).join('')||'<p class="shared-empty">当前筛选没有匹配结构。可清空搜索或选择“全部系统”。</p>';
  $('structurePage').textContent=(libraryPage+1)+' / '+pages;$('structurePrevious').disabled=libraryPage===0;$('structureNext').disabled=libraryPage>=pages-1;
 }
 async function pickStructure(id){const row=activeCatalog().find(r=>r.id===id);if(!row)return false;const currentSex=sex(),token=++selectionTicket;document.body.classList.remove('reference-detail','point-detail-active');currentReference=false;currentPoint=null;
  if(female.active)await female.select(id,true);else if(row.kind==='bone'){window.__FOOT_ATLAS__.selectBone(id,true,true);$('focusBtn').click();}else{await tissues.enable(row.system,true);if(token!==selectionTicket||currentSex!==sex())return false;tissues.revealStructure(id);tissues.choose(id,true);}schedule();return true;
 }
 $('structureResults').onclick=e=>{const b=e.target.closest('[data-structure-id]');if(b){b.setAttribute('aria-busy','true');pickStructure(b.dataset.structureId).catch(fail).finally(()=>b.removeAttribute('aria-busy'));}};
 $('structureSearch').oninput=()=>{libraryPage=0;renderDirectory();};for(const id of ['structureSystem','structureScope'])$(id).onchange=()=>{libraryPage=0;renderDirectory();};
 $('structurePrevious').onclick=()=>{libraryPage--;renderDirectory();};$('structureNext').onclick=()=>{libraryPage++;renderDirectory();};
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.target.closest('input,textarea,select')&&!document.querySelector('dialog[open]')){e.preventDefault();e.stopImmediatePropagation();showSection('directory');$('structureSearch').focus();}},true);
 $('evidenceCurrent').onclick=e=>{if(!['point','meridian'].includes(window.__ATLAS_STUDY__.getState().current.kind)){e.preventDefault();$('sourceDialog').showModal();}};function redraw(){
  const f=female.active,fs=female.getState(),ts=tissues.getState(),ss=snapshots();document.body.dataset.bodySex=sex();document.body.dataset.atlasTab=section;document.body.classList.toggle('tcm-display-on',learning.getState().enabled);
  bonePane.hidden=true;$('femaleLibrary').hidden=true;directory.hidden=section!=='directory';panel.hidden=section!=='layers';$('tcmControls').hidden=section!=='meridians';
  for(const[id,t]of tabs){$(id).classList.toggle('active',t===section);$(id).setAttribute('aria-selected',String(t===section));}
  coverage.textContent=f?'女性独立参考 · 骨骼与肌肉为部分覆盖':'男性解剖参考';unavailable.hidden=!f;
  for(const l of layers){const list=systemsFor(l),st=list.map(k=>ss[k]).filter(Boolean),on=st.some(v=>v.on),supported=available(l);const cb=$('sharedLayer-'+l.id);cb.checked=on;cb.disabled=!supported;cb.indeterminate=on&&st.some(v=>!v.on);const loaded=st.reduce((n,v)=>n+(v.count||0),0);$('sharedLayerState-'+l.id).textContent=!supported?'当前模型未提供':st.some(v=>v.loading)?'加载中…':loaded?loaded+' 个结构':'按需加载';$('sharedOpacityRow-'+l.id).hidden=!on||!supported;const opacity=st.filter(v=>v.on).reduce((s,x)=>s+(x.opacity??1),0)/Math.max(1,st.filter(v=>v.on).length);$('sharedOpacity-'+l.id).value=Math.round(opacity*100);$('sharedOpacityValue-'+l.id).textContent=Math.round(opacity*100)+'%';}
  panel.querySelectorAll('[data-profile],[data-system-view],[data-shared-scene]').forEach(b=>{const key=b.dataset.profile||b.dataset.systemView||b.dataset.sharedScene;const disabled=f&&key.startsWith('ear-')||!f&&key==='breast';b.disabled=disabled;b.title=disabled?'当前模型未提供该结构':'';b.classList.toggle('active',key===scene);b.setAttribute('aria-pressed',String(key===scene));});
  $('sharedDisplay').value=f?fs.mode:($('sharedDisplay').value||'solid');$('layerCompactStatus').textContent=layers.filter(l=>systemsFor(l).some(k=>ss[k]?.on)).map(l=>l.name).join(' ＋ ')||'未打开结构层';
  for(const id of ['surfaceAttach','fasciaOn','tissueClip','nerveXray','internalDetails','earFilter','vesselFilter']){const e=$(id);if(e){e.disabled=f;e.closest('label').hidden=false;e.title=f?'当前女性参考不支持此细分项':'';}}
  for(const id of ['tcmQuickFit','tcmFitMeridian','labelFitAll','guideBack','guideFront','autoFocusPoint','meridianLineToggle','acupointToggle','pointNamesToggle'])if($(id)){$(id).disabled=f;$(id).title=f?'女性点位尚未标注；名称与介绍正常可查':'';}
  for(const b of regions.querySelectorAll('[data-region]')){b.disabled=f;b.title=f?'女性来源没有此部位完整骨架，可从上方系统筛选查看已有结构':'';}
  for(const b of document.querySelectorAll('[data-side]'))b.classList.toggle('active',b.dataset.side===(f?fs.side:state.side));
  for(const b of document.querySelectorAll('[data-mode]'))b.disabled=f&&b.dataset.mode!=='orbit';for(const id of ['explode','resetBonesBtn'])$(id).disabled=f;
  for(const id of ['colorBtn','labelsBtn','ghostBtn'])if($(id)){$(id).disabled=f;$(id).title=f?'当前女性来源不支持骨块专用标注':'';}
  for(const id of ['tcmLayerToggle','tcmMasterToggle']){$(id).disabled=f;if(f)$(id).textContent='点位未标注';} $('focusCurrent').disabled=f&&currentReference; if(f&&currentReference){document.body.classList.add('reference-detail','point-detail-active');$('femaleDetail').hidden=true;}else if(f){$('femaleDetail').hidden=false;}
  if(!f&&currentReference)document.body.classList.add('reference-detail');
  if(!['point','meridian'].includes(window.__ATLAS_STUDY__.getState().current.kind))$('evidenceCurrent').textContent='来源与说明';renderDirectory();invalidate();
 }
 function showSection(s){const held=captureCamera();section=s;if(s==='meridians'){learning.setPanel(true);learning.toggleTCM(true);}else learning.setPanel(false);redraw();if(innerWidth<=1100){document.body.classList.add('nav-open');document.body.classList.remove('detail-open');}restoreCamera(held);ensureCatalog();}
 async function enableLayer(l,on){const ticket=++viewTicket,initialSex=sex(),held=captureCamera();if(!available(l))return;if(female.active)female.setCustom();else tissues.clearOrganScope();for(const k of systemsFor(l)){if(female.active)await female.enable(k,on);else if(k==='bones'){state.bonesOn=!!on;$('bonesOn').checked=!!on;$('bonesOn').dispatchEvent(new Event('change',{bubbles:true}));}else await tissues.enable(k,on);if(ticket!==viewTicket||initialSex!==sex())return;}scene='custom';restoreCamera(held);schedule();}
 function opacityLayer(l,v){for(const k of systemsFor(l)){if(female.active)female.setOpacity(k,v);else if(k==='bones')tissues.setBoneOpacity(v);else tissues.setOpacity(k,v);}schedule();}
 async function choose(key,preserve=true,options={}){const ticket=++viewTicket,initialSex=sex(),held=preserve?captureCamera():null;scene=key;
  if(female.active){const mapping={bones:'bones',muscles:'muscles',nerves:'nerves',compare:'compare',chest:'chest',heart:'chest',abdomen:'abdomen',vascular:'vessels',surface:'surface',pelvis:'pelvis',breast:'breast'};if(!mapping[key])return false;await female.setPreset(mapping[key],{preserveView:preserve,preservePanel:true});}
  else if(['bones','muscles','nerves','compare'].includes(key))await tissues.setProfile(key);else if(key==='pelvis')window.__FOOT_ATLAS__.setRegion('pelvis');else if(key==='breast')return false;else await tissues.setAnatomyView(key);
  if(ticket!==viewTicket||initialSex!==sex())return false;if(held)restoreCamera(held);if(!options.keepSection)section='layers';if(currentReference&&currentPoint)learning.selectPoint(currentPoint.code,currentPoint.side,false);redraw();return true;
 }
 // Keep the actual DOM, current tab, search terms, filters and disclosures across both adapters.
 async function switchSex(target){if((target==='female')===female.active&&!sexSwitching)return;const ticket=++selectionTicket;sexSwitching=true;viewTicket++;const saved={logical:layers.map(l=>{const a=systemsFor(l).map(k=>snapshots()[k]).filter(Boolean),on=a.filter(v=>v.on);return{id:l.id,on:on.length>0,opacity:on.length?on.reduce((n,v)=>n+(v.opacity??1),0)/on.length:(a[0]?.opacity??1)};}),display:$('sharedDisplay').value,section,scene,scroll:sidebar.scrollTop,detail:document.body.classList.contains('detail-open'),reference:currentReference,point:currentPoint&&{...currentPoint},side:female.active?female.getState().side:state.side};historyUI[sex()]=saved;
  try{await female.setSex(target);if(ticket!==selectionTicket)return;const afterSwitch=captureCamera();$('bodySelector').setAttribute('aria-busy','true');
   if(saved.scene==='custom'){if(female.active)female.setCustom();else tissues.clearOrganScope();}
   for(const item of saved.logical){const l=layers.find(x=>x.id===item.id);if(!available(l))continue;const keys=systemsFor(l),already=keys.filter(k=>snapshots()[k]?.on),wanted=item.on?(saved.scene==='custom'||!already.length?keys:already):[];
    for(const k of keys){if(ticket!==selectionTicket)return;const on=wanted.includes(k);if(female.active){await female.enable(k,on);female.setOpacity(k,item.opacity);}else if(k==='bones'){state.bonesOn=on;$('bonesOn').checked=on;$('bonesOn').dispatchEvent(new Event('change',{bubbles:true}));tissues.setBoneOpacity(item.opacity);}else{await tissues.enable(k,on);tissues.setOpacity(k,item.opacity);}}
   }
   if(ticket!==selectionTicket)return;$('sharedDisplay').value=saved.display;if(female.active)female.setDisplayMode(saved.display);restoreCamera(afterSwitch);section=saved.section;scene=saved.scene;currentReference=saved.reference;currentPoint=saved.point;if(saved.reference&&saved.point)learning.selectPoint(saved.point.code,saved.point.side,false);if(saved.reference&&!saved.point)window.__ATLAS_EVIDENCE__.showChannel(learning.getState().selectedMeridians);if(female.active)female.setSide(saved.side);redraw();sidebar.scrollTop=saved.scroll;document.body.classList.toggle('detail-open',saved.detail);requestAnimationFrame(()=>{sidebar.scrollTop=saved.scroll;});}finally{if(ticket===selectionTicket){sexSwitching=false;$('bodySelector').setAttribute('aria-busy','false');schedule();}}
 }
 $('bodySelector').querySelectorAll('[data-body-sex]').forEach(b=>b.onclick=()=>switchSex(b.dataset.bodySex).catch(fail));
 document.addEventListener('click',e=>{const b=e.target.closest('[data-side]');if(!b)return;if(female.active){e.preventDefault();e.stopImmediatePropagation();female.setSide(b.dataset.side);}schedule();},true);
 window.addEventListener('atlas:v9-point-click',()=>{currentReference=true;currentPoint=learning.getState().selectedPoint;schedule();});
 window.addEventListener('atlas:v9-channel-click',()=>{currentReference=true;currentPoint=null;schedule();});
 $('v9ChannelInfo').addEventListener('click',()=>{currentReference=true;currentPoint=null;schedule();});
 window.addEventListener('atlas:selection',e=>{if(e.detail?.kind==='meridian'&&!sexSwitching&&!learning.getState().selectedPoint){currentPoint=null;}if(['bone','tissue','region'].includes(e.detail?.kind)&&!sexSwitching){currentReference=false;currentPoint=null;document.body.classList.remove('reference-detail');}schedule();});
 window.addEventListener('atlas:sex-changed',()=>{document.body.dataset.bodySex=sex();if(!sexSwitching)schedule();});
 for(const e of ['atlas:profile-changed','atlas:structure-updated'])window.addEventListener(e,schedule);
 panel.addEventListener('change',schedule);panel.addEventListener('click',()=>setTimeout(schedule,100));
 // Per-body saved layers, same controls, exact opacity and visibility restored.
 let savedCombo={};$('saveLayerCombo').onclick=()=>{const value={layers:layers.map(l=>({id:l.id,states:systemsFor(l).map(k=>({key:k,...snapshots()[k]}))})),display:$('sharedDisplay').value,scene};savedCombo[sex()]=value;try{localStorage.setItem('atlas14:layers:'+sex(),JSON.stringify(value));}catch{}toast('已保存当前图层组合');};
 $('restoreLayerCombo').onclick=async()=>{let v=savedCombo[sex()];try{v=JSON.parse(localStorage.getItem('atlas14:layers:'+sex())||'null')||v;}catch{}if(!v)return toast('请先保存一个组合');const initialSex=sex(),held=captureCamera();for(const l of v.layers){for(const s of l.states){if(initialSex!==sex())return;if(female.active){await female.enable(s.key,!!s.on);female.setOpacity(s.key,s.opacity??1);}else if(s.key==='bones'){state.bonesOn=!!s.on;$('bonesOn').checked=!!s.on;$('bonesOn').dispatchEvent(new Event('change',{bubbles:true}));tissues.setBoneOpacity(s.opacity??1);}else{await tissues.enable(s.key,!!s.on);tissues.setOpacity(s.key,s.opacity??1);}}}scene=v.scene;$('sharedDisplay').value=v.display;if(female.active)female.setDisplayMode(v.display);restoreCamera(held);schedule();toast('已恢复组合，视角保持不变');};
 // Reference focus and reading never invoke the last selected female organ accidentally.
 for(const id of ['focusBtn','focusCurrent'])$(id).addEventListener('click',e=>{if(female.active&&currentReference){e.preventDefault();e.stopImmediatePropagation();}},true);
 $('speakCurrent').onclick=()=>window.__ATLAS_SPEECH__.speak(currentPoint?.name||(female.active?female.getCatalog().find(r=>r.id===female.getState().selected)?.name:window.__ATLAS_STUDY__.getState().current?.name)||'');
 const api={showSection,choose,switchSex,pickStructure,ready:ensureCatalog(),getState:()=>({version:'14.0.0',section,scene,sex:sex(),directoryQuery:$('structureSearch').value,systemFilter:$('structureSystem').value,scope:$('structureScope').value,directoryElement:directory.id,layersElement:layerRows.id,meridianElement:'tcmControls',femalePointRegistration:false,selectedPoint:currentPoint,sameTabs:tabs.map(([id])=>$(id).textContent),layerRows:layers.map(l=>l.id),busy:sexSwitching})};window.__ATLAS_SHARED__=api;redraw();return api;
}
