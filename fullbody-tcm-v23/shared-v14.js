// Persistent controls, independent scene adapters, explicit shared-teaching provenance.
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
  {id:'vascular',name:'心脏与血管',male:['heart','vessels'],female:['vascular','vessels']},
  {id:'surface',name:'体表',male:['surface'],female:['surface']},
  {id:'ear',name:'耳部',male:['ear'],female:['ear']},
  {id:'breast',name:'乳腺',male:[],female:['breast']},
  {id:'lymphatic',name:'淋巴与免疫',male:[],female:['lymphatic']}
 ];
 const sceneNames={skin:'纯体表',organs:'胸腹内脏',bones:'骨骼结构',muscles:'肌肉外形',nerves:'神经走行',compare:'分层对照',chest:'胸腔器官',heart:'心脏特写',abdomen:'腹部器官',vascular:'心血管',surface:'体表经络',pelvis:'盆腔结构',breast:'乳腺结构','ear-right':'右耳','ear-left':'左耳'};
 let section='directory',scene='bones',libraryPage=0,selectionTicket=0,viewTicket=0,catalogPromise=null,maleCatalog=[],queued=false,sexSwitching=false;
 const cache={male:null,female:null};let currentPoint=null,currentReference=false,meridianOpened=false;const historyUI={};let directoryReturn=null;
 const preview=document.createElement('div');preview.id='directoryPreview';preview.hidden=true;preview.setAttribute('role','status');preview.innerHTML='<span id=directoryPreviewText></span><button id=directoryPreviewReturn type=button>返回先前视图</button>';document.querySelector('.stage').append(preview);
 function clearDirectoryPreview(){directoryReturn=null;preview.hidden=true;}
 $('directoryPreviewReturn').onclick=()=>enqueueAction('directory-return',async()=>{const held=directoryReturn;if(!held)return;clearDirectoryPreview();await rollbackWorkspace(held);if(held.selection&&!held.reference)window.dispatchEvent(new CustomEvent('atlas:selection',{detail:held.selection}));}).catch(fail);
 document.body.dataset.sharedUi='14';document.body.dataset.bodySex=female.active?'female':'male';
 $('boneTab').textContent='结构目录';$('layersTab').textContent='结构图层';$('tcmTab').textContent='经络穴位';
 $('releaseBadge').textContent='V23 · 结构选择与定位';$('tissueSearch').hidden=true;$('tissueList').hidden=true;
 $('organQuickBar')?.remove();$('femaleLibrary').hidden=true;
 const directory=el('section','shared-directory');directory.id='structureLibrary';
 directory.innerHTML='<h2>结构目录</h2><p class="shared-intro">搜索、筛选，点击查看同一结构。</p><label class="search-box"><input id="structureSearch" type="search" placeholder="名称 / 拼音 / English" aria-label="搜索结构" autocomplete="off"></label><div class="shared-filters"><select id="structureSystem" aria-label="结构系统"><option value="all">全部系统</option>'+layers.map(x=>`<option value="${x.id}">${x.name}</option>`).join('')+'</select><select id="structureScope" aria-label="结构范围"><option value="all">全部目录</option><option value="visible">已启用结构</option></select></div><p id="structureSummary" class="shared-summary" role="status"></p><div id="structureResults" class="shared-results"></div><div class="shared-pager"><button id="structurePrevious">上一页</button><span id="structurePage"></span><button id="structureNext">下一页</button></div>';
 sidebar.append(directory);const resetSearch=el('button','directory-reset');resetSearch.type='button';resetSearch.id='structureReset';resetSearch.textContent='清空筛选';directory.querySelector('.shared-filters').after(resetSearch);resetSearch.onclick=()=>{for(const id of ['structureSystem','structureScope'])$(id).value='all';$('structureSearch').value='';libraryPage=0;renderDirectory();$('structureSearch').focus();};
 const sides=document.querySelector('.side-picker');directory.querySelector('.shared-filters').after(sides);
 const regions=el('details','v12-disclosure');regions.id='structureRegions';regions.innerHTML='<summary>骨骼部位快捷查看</summary>';regions.append(document.querySelector('.region-picker'));directory.querySelector('h2').after(regions);
 const paneHeader=panel.querySelector('h2');const coverage=el('p','shared-coverage');coverage.id='sharedCoverage';paneHeader.after(coverage);
 // Keep existing load callbacks alive but take the old controls out of layout.
 const legacy=$('customLayers').querySelector('.v12-custom-body');legacy.hidden=true;
 const layerRows=el('div','shared-layer-rows');layerRows.id='sharedLayerRows';
 layerRows.innerHTML=layers.map(x=>`<section data-shared-layer="${x.id}" class="shared-layer"><label><input type="checkbox" id="sharedLayer-${x.id}"><b>${x.name}</b><small id="sharedLayerState-${x.id}"></small></label><label class="shared-opacity" id="sharedOpacityRow-${x.id}"><span>不透明度</span><input id="sharedOpacity-${x.id}" type="range" min="8" max="100" value="100" aria-label="${x.name}不透明度"><output id="sharedOpacityValue-${x.id}">100%</output></label></section>`).join('');$('customLayers').append(layerRows);
 for(const l of layers){$('sharedLayer-'+l.id).onchange=e=>enableLayer(l,e.target.checked).catch(fail);$('sharedOpacity-'+l.id).oninput=e=>opacityLayer(l,Number(e.target.value)/100);}
 const display=el('label','layer-check');display.id='sharedDisplayRow';display.innerHTML='显示方式<select id="sharedDisplay" aria-label="显示方式"><option value="solid">清晰原色</option><option value="context">透明参照</option><option value="focus">突出当前</option></select>';panel.querySelector('.v12-tasks').after(display);
 $('sharedDisplay').onchange=()=>{const mode=$('sharedDisplay').value;enqueueAction('display',()=>{layoutRevision++;applyDisplayMode(mode);}).catch(fail);};
 const more=el('details','v12-disclosure');more.id='sharedMoreRegions';more.innerHTML='<summary>更多部位</summary><div class="profile-grid"><button data-shared-scene="pelvis">盆腔结构</button><button data-shared-scene="breast">乳腺结构</button></div>';panel.querySelector('.v12-tasks').append(more);
 panel.querySelectorAll('[data-profile]').forEach(b=>b.onclick=()=>choose(b.dataset.profile,false).catch(fail));
 panel.querySelectorAll('[data-system-view]').forEach(b=>b.onclick=()=>choose(b.dataset.systemView,false).catch(fail));
 more.querySelectorAll('[data-shared-scene]').forEach(b=>b.onclick=()=>choose(b.dataset.sharedScene,false).catch(fail));
 if($('surfaceAttach'))$('surfaceAttach').closest('label').hidden=true;if($('surfaceAttachNote'))$('surfaceAttachNote').hidden=true;$('tissueClear').textContent='只留骨骼';$('tissueClear').onclick=()=>choose('bones',true).catch(fail);$('chestCompare').hidden=true;
 const unavailable=el('p','shared-coverage');unavailable.id='sharedAcupointCoverage';unavailable.textContent='男女共用身材比例；女性特有结构独立展示。点位显示定位依据与复核状态。';unavailable.hidden=true;$('tcmControls').querySelector('.tcm-head').after(unavailable);
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
 let actionTail=Promise.resolve(),queuedActions=0,layoutRevision=0,coalescingEpoch=0;const actionSequence=new Map(),bodySnapshots=new Map(),transitionErrors=[];
 const switchNotice=document.createElement('div');switchNotice.id='bodyTransitionNotice';switchNotice.hidden=true;switchNotice.setAttribute('role','status');switchNotice.textContent='正在同步人体、图层与标注…';document.querySelector('.stage').append(switchNotice);
 function captureNative(){return female.active?female.captureState():tissues.captureState();}
 async function restoreNative(v){return female.active?female.restoreState(v):tissues.restoreState(v);}
 function captureWorkspace(){return {selection:window.__ATLAS_STUDY__?.getState().current,sex:sex(),native:captureNative(),learning:learning.getState(),camera:captureCamera(),section,scene,reference:currentReference,point:currentPoint&&{...currentPoint},display:$('sharedDisplay').value,scroll:sidebar.scrollTop,detail:document.body.classList.contains('detail-open'),revision:layoutRevision};}
 async function bindReference(needed=learning.getState().enabled){
  const ss=snapshots();if(needed||ss.surface?.on){if(female.active)await female.ensureMeridianSurface();else await tissues.ensureMeridianReference();}
  else await learning.setReferenceBody(sex(),null,false);
 }
 async function rollbackWorkspace(v){
  await female.setSex(v.sex,{managed:true});await restoreNative(v.native);await bindReference(v.learning.enabled);learning.restoreDisplayState(v.learning);
  section=v.section;scene=v.scene;currentReference=v.reference;currentPoint=v.point;layoutRevision=v.revision;$('sharedDisplay').value=v.display;restoreCamera(v.camera);sidebar.scrollTop=v.scroll;document.body.classList.toggle('detail-open',v.detail);
 }
 function enqueueAction(key,fn){
  const scopedKey=key+':'+(key==='save-combo'?++coalescingEpoch:coalescingEpoch);const n=(actionSequence.get(scopedKey)||0)+1;actionSequence.set(scopedKey,n);queuedActions++;$('bodySelector').setAttribute('aria-busy','true');
  const run=actionTail.catch(()=>{}).then(async()=>{
   if(n!==actionSequence.get(scopedKey))return false;const previous=captureWorkspace();state.bodyTransition=true;document.body.dataset.bodySwitching='true';switchNotice.hidden=false;learning.suspend(true);learning.cancelPendingFocus?.();
   try{if(!['structure','directory-return','save-combo','reference'].includes(key))clearDirectoryPreview();return await fn();}
   catch(e){transitionErrors.push({action:key,message:e.message,at:new Date().toISOString()});try{await rollbackWorkspace(previous);}catch(restoreError){transitionErrors.push({action:'rollback',message:restoreError.message});}throw e;}
   finally{state.bodyTransition=false;document.body.dataset.bodySwitching='false';switchNotice.hidden=true;const displaced=!female.active&&(state.explode>0||[...ctx.bones.values()].some(b=>b.userData.offset.lengthSq()>.1||b.quaternion.angleTo(new ctx.THREE.Quaternion())>.015));learning.suspend(displaced);tissues.updateFrame();learning.updateFrame();redraw();window.dispatchEvent(new Event('atlas:transition-settled'));invalidate();}
  });
  actionTail=run.catch(()=>{});return run.finally(()=>{queuedActions--;if(!queuedActions)$('bodySelector').setAttribute('aria-busy','false');schedule();});
 }
 function choose(key,preserve=true,options={}){return enqueueAction('scene',()=>{layoutRevision++;return chooseNow(key,preserve,options);});}
 function enableLayer(layer,on){return enqueueAction('layer:'+layer.id,()=>enableLayerNow(layer,on));}
 function pickStructure(id){return enqueueAction('structure',()=>pickStructureNow(id));}
 function switchSex(target){return enqueueAction('sex',()=>switchSexNow(target));}
 function applyDisplayMode(mode){
  if(!['solid','context','focus'].includes(mode))return;
  if(female.active)female.setDisplayMode(mode);
  else{for(const [id,s]of Object.entries(tissues.getState().systems))if(s.on)tissues.setOpacity(id,mode==='context'?.28:1);tissues.setBoneOpacity(mode==='context'?.3:1);}
  $('sharedDisplay').value=mode;schedule();
 }
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
 function groupFor(r){return layers.find(l=>l[sex()].includes(r.nativeSystem||r.system))?.id||'other';}
 function matchesSide(r){const s=$('structureSide')?.value||(female.active?female.getState().side:state.side);return s==='both'||!s||r.side==='midline'||r.side===s||r.side==='bilateral';}
 function currentId(){const c=window.__ATLAS_STUDY__?.getState().current;return female.active?female.getState().selected:c&&['bone','tissue'].includes(c.kind)?c.id:null;}
 function renderDirectory(){
  const query=norm($('structureSearch').value),sys=$('structureSystem').value,scope=$('structureScope').value,rows=activeCatalog();
  const visible=new Set(female.active?female.getVisibleCatalog().map(r=>r.id):[...tissues.getVisibleCatalog().map(r=>r.id),...window.__FOOT_ATLAS__.getState().bones.filter(r=>r.visible).map(r=>r.id)]);
  const arr=rows.filter(r=>(scope==='native-details'?r.nativeDetail:!r.nativeDetail)&&(sys==='all'||groupFor(r)===sys)&&matchesSide(r)&&(scope!=='visible'||visible.has(r.id))&&(!query||norm([r.name,r.pinyin,r.en,r.english,r.id,r.sourceName].join(' ')).includes(query)));
  const pages=Math.max(1,Math.ceil(arr.length/60));libraryPage=Math.max(0,Math.min(libraryPage,pages-1));const id=currentId();
  const summary=(female.active?'女性':'男性')+' · '+arr.length+' 个结构'+(scope==='visible'?' · 已启用':' · 点击时按需加载');$('structureSummary').textContent=summary;
  $('structureReset').hidden=!query&&sys==='all'&&scope==='all';
  $('structureResults').innerHTML=arr.slice(libraryPage*60,(libraryPage+1)*60).map(r=>`<button data-structure-id="${esc(r.id)}" class="${r.id===id?'active':''}" aria-pressed="${r.id===id}"><b>${esc(r.name)}</b><small>${esc(r.pinyin||r.en||r.english||'')}</small><span>${visible.has(r.id)?'已显示':'可查看'}</span></button>`).join('')||'<p class="shared-empty">当前筛选没有匹配结构。可清空搜索或选择“全部系统”。</p>';
  $('structurePage').textContent=(libraryPage+1)+' / '+pages;$('structurePrevious').disabled=libraryPage===0;$('structureNext').disabled=libraryPage>=pages-1;
 }
 async function pickStructureNow(id){await ensureCatalog();const row=activeCatalog().find(r=>r.id===id);if(!row)return false;const currentSex=sex(),token=++selectionTicket;
  const shell=snapshots().surface,covered=row.system!=='surface'&&shell?.on&&(shell.opacity??1)>=.9;
  if(covered&&!directoryReturn)directoryReturn=captureWorkspace();const solo=!!directoryReturn&&row.system!=='surface';
  document.body.classList.remove('reference-detail','point-detail-active');currentReference=false;currentPoint=null;learning.clearStudyContext(true);if(solo)learning.toggleTCM(false);
  layoutRevision++;scene='custom';
  if(female.active){female.setCustom();await female.select(id,true);if(solo){female.setIsolated(true);female.focus();}}
  else if(row.kind==='bone'){tissues.clearSelection();window.__FOOT_ATLAS__.restoreBoneState({bonesOn:true,isolated:false,neighbors:false});window.__FOOT_ATLAS__.selectBone(id,true,true);if(solo)window.__FOOT_ATLAS__.restoreBoneState({isolated:true});$('focusBtn').click();}
  else{window.__FOOT_ATLAS__.restoreBoneState({isolated:false,neighbors:false});tissues.clearOrganScope();await tissues.enable(row.system,true);if(token!==selectionTicket||currentSex!==sex())return false;tissues.revealStructure(id);tissues.choose(id,false);if(solo)tissues.setIsolated(true);tissues.choose(id,true);}
  if(solo){preview.hidden=false;$('directoryPreviewText').textContent='单独查看 · '+row.name+'（先前图层已保留）';}else if(row.system==='surface')clearDirectoryPreview();
  document.body.classList.remove('nav-open');document.body.classList.add('detail-open');schedule();return true;
 }
 $('structureResults').onclick=e=>{const b=e.target.closest('[data-structure-id]');if(b){b.setAttribute('aria-busy','true');pickStructure(b.dataset.structureId).catch(fail).finally(()=>b.removeAttribute('aria-busy'));}};
 $('structureSearch').oninput=()=>{libraryPage=0;renderDirectory();};for(const id of ['structureSystem','structureScope'])$(id).onchange=()=>{libraryPage=0;renderDirectory();};
 function pageDirectory(delta){libraryPage+=delta;renderDirectory();$('structureResults').scrollIntoView({block:'start',behavior:'auto'});$('structureResults').querySelector('button')?.focus({preventScroll:true});}
 $('structurePrevious').onclick=()=>pageDirectory(-1);$('structureNext').onclick=()=>pageDirectory(1);
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.target.closest('input,textarea,select')&&!document.querySelector('dialog[open]')){e.preventDefault();e.stopImmediatePropagation();showSection('directory');$('structureSearch').focus();}},true);
 $('evidenceCurrent').onclick=e=>{if(!['point','meridian'].includes(window.__ATLAS_STUDY__.getState().current.kind)){e.preventDefault();$('sourceDialog').showModal();}};function redraw(){
  const f=female.active,fs=female.getState(),ts=tissues.getState(),ss=snapshots();document.body.dataset.bodySex=sex();document.body.dataset.atlasTab=section;document.body.classList.toggle('tcm-display-on',learning.getState().enabled);
  bonePane.hidden=true;$('femaleLibrary').hidden=true;directory.hidden=section!=='directory';panel.hidden=section!=='layers';$('tcmControls').hidden=section!=='meridians';
  for(const[id,t]of tabs){$(id).classList.toggle('active',t===section);$(id).setAttribute('aria-selected',String(t===section));}
  coverage.textContent=f?'女性原生结构＋统一比例教学补充':'男性解剖参考';unavailable.hidden=!f;
  for(const l of layers){const list=systemsFor(l),st=list.map(k=>ss[k]).filter(Boolean),on=st.some(v=>v.on),supported=available(l);const cb=$('sharedLayer-'+l.id);cb.checked=on;cb.disabled=!supported;cb.indeterminate=on&&st.some(v=>!v.on);const loaded=st.reduce((n,v)=>n+(v.count||0),0);$('sharedLayerState-'+l.id).textContent=!supported?'当前模型未提供':st.some(v=>v.loading)?'加载中…':loaded?loaded+' 个结构':'按需加载';$('sharedOpacityRow-'+l.id).hidden=!on||!supported;const opacity=st.filter(v=>v.on).reduce((s,x)=>s+(x.opacity??1),0)/Math.max(1,st.filter(v=>v.on).length);$('sharedOpacity-'+l.id).value=Math.round(opacity*100);$('sharedOpacityValue-'+l.id).textContent=Math.round(opacity*100)+'%';}
  panel.querySelectorAll('[data-profile],[data-system-view],[data-shared-scene]').forEach(b=>{const key=b.dataset.profile||b.dataset.systemView||b.dataset.sharedScene;const disabled=f&&key.startsWith('ear-')||!f&&key==='breast';b.disabled=disabled;b.title=disabled?'当前模型未提供该结构':'';b.classList.toggle('active',key===scene);b.setAttribute('aria-pressed',String(key===scene));});
  $('sharedDisplay').value=f?fs.mode:($('sharedDisplay').value||'solid');$('layerCompactStatus').textContent=layers.filter(l=>systemsFor(l).some(k=>ss[k]?.on)).map(l=>l.name).join(' ＋ ')||'未打开结构层';
  for(const id of ['surfaceAttach','fasciaOn','tissueClip','nerveXray','internalDetails','earFilter','vesselFilter']){const e=$(id);if(e){e.disabled=f;e.closest('label').hidden=f||id==='surfaceAttach';e.title=f?'当前女性参考不支持此细分项':'';}}
  for(const id of ['tcmQuickFit','tcmFitMeridian','labelFitAll','guideBack','guideFront','autoFocusPoint','meridianLineToggle','acupointToggle','pointNamesToggle'])if($(id)){$(id).disabled=false;$(id).title='';}
  regions.hidden=f;for(const b of regions.querySelectorAll('[data-region]')){b.disabled=f;b.title=f?'女性完整骨架可从结构目录搜索和点选':'';}
  for(const b of document.querySelectorAll('[data-side]'))b.classList.toggle('active',b.dataset.side===(f?fs.side:state.side));
  for(const b of document.querySelectorAll('[data-mode]'))b.disabled=f&&b.dataset.mode!=='orbit';for(const id of ['explode','resetBonesBtn'])$(id).disabled=f;
  for(const id of ['colorBtn','ghostBtn'])if($(id)){$(id).disabled=f;$(id).title=f?'当前女性来源不支持骨块专用标注':'';}
  for(const id of ['tcmLayerToggle','tcmMasterToggle']){$(id).disabled=false;} $('focusCurrent').disabled=false; if(f&&currentReference){document.body.classList.add('reference-detail','point-detail-active');$('femaleDetail').hidden=true;}else if(f){$('femaleDetail').hidden=false;}
  if(!f&&currentReference)document.body.classList.add('reference-detail');
  if(!f&&!currentReference&&scene!=='bones'){$('regionHeading').textContent='男性 · '+(sceneNames[scene]||'自定义图层');$('visibleCount').textContent=(tissues.getVisibleCatalog().length+(state.bonesOn&&!state.tissueIsolated?[...ctx.bones.values()].filter(b=>b.visible).length:0))+' 个结构';}
  if(!['point','meridian'].includes(window.__ATLAS_STUDY__.getState().current.kind))$('evidenceCurrent').textContent='来源与说明';renderDirectory();invalidate();
 }
 function showSection(s){const held=captureCamera();section=s;if(s==='meridians'){learning.setPanel(true);if(!meridianOpened){learning.toggleTCM(true);meridianOpened=true;}}else learning.setPanel(false);redraw();if(innerWidth<=1100){document.body.classList.add('nav-open');document.body.classList.remove('detail-open');}restoreCamera(held);ensureCatalog();}
 async function enableLayerNow(l,on){layoutRevision++;const ticket=++viewTicket,initialSex=sex(),held=captureCamera();if(!available(l))return;if(female.active)female.setCustom();else tissues.clearOrganScope();for(const k of systemsFor(l)){if(female.active)await female.enable(k,on);else if(k==='bones'){state.bonesOn=!!on;$('bonesOn').checked=!!on;$('bonesOn').dispatchEvent(new Event('change',{bubbles:true}));}else await tissues.enable(k,on);if(ticket!==viewTicket||initialSex!==sex())return;}if(l.id==='surface'&&on){if(female.active){female.setOpacity('surface',1);await female.ensureMeridianSurface();}else{tissues.setOpacity('surface',1);await tissues.attachSurface(true);}}scene='custom';restoreCamera(held);schedule();}
 $('labelsBtn').addEventListener('click',e=>{if(!female.active)return;e.preventDefault();e.stopImmediatePropagation();female.setLabels(!female.getLabels());$('labelsBtn').classList.toggle('active',female.getLabels());$('labelsBtn').setAttribute('aria-pressed',String(female.getLabels()));},true);
 function opacityLayer(l,v){return enqueueAction('opacity:'+l.id,()=>{layoutRevision++;opacityLayerNow(l,v);});}
 function opacityLayerNow(l,v){for(const k of systemsFor(l)){if(female.active)female.setOpacity(k,v);else if(k==='bones')tissues.setBoneOpacity(v);else tissues.setOpacity(k,v);}schedule();}
 async function chooseNow(key,preserve=true,options={}){
  if(!sceneNames[key]&&key!=='custom')return false;
  if(female.active&&key.startsWith('ear-')||!female.active&&key==='breast'){toast('当前模型没有提供该结构；保留当前画面。');return false;}
  const prior=learning.getState(),held=preserve?captureCamera():null,keepPoint=!!options.keepSection&&!!prior.selectedPoint&&!options.internalSwitch;
  currentReference=false;currentPoint=null;learning.clearStudyContext(true);tissues.clearSelection();if(female.active)female.clearSelection();
  window.__FOOT_ATLAS__.prepareBodyScene(key==='pelvis'?'pelvis':'body');
  document.body.classList.remove('tissue-detail-active','point-detail-active','reference-detail');
  if(female.active){const mapping={skin:'surface',organs:'organs',bones:'bones',muscles:'muscles',nerves:'nerves',compare:'compare',chest:'chest',heart:'heart',abdomen:'abdomen',vascular:'vessels',surface:'surface',pelvis:'pelvis',breast:'breast'};if(key==='custom')female.setCustom();else await female.setPreset(mapping[key],{managed:true,preserveView:preserve,preservePanel:true});}
  else if(['bones','muscles','nerves','compare'].includes(key))await tissues.setProfile(key);
  else if(key==='pelvis'){await tissues.setAnatomyView('abdomen');tissues.setOrganScope([[-130,650,-200],[340,990,200]],'pelvis');}
  else if(key==='custom')tissues.clearOrganScope();else await tissues.setAnatomyView(key==='skin'?'surface':key);
  scene=key;
  if(key==='surface'){if(female.active)female.setOpacity('surface',1);else tissues.setOpacity('surface',1);}
  await bindReference(key==='surface'||prior.enabled);
  learning.restoreDisplayState({...prior,enabled:key==='surface'||prior.enabled,selectedPoint:keepPoint?prior.selectedPoint:null,studyContext:keepPoint?prior.studyContext:null,cardOpen:keepPoint&&prior.cardOpen},{selection:keepPoint});
  currentReference=keepPoint;currentPoint=keepPoint?learning.getState().selectedPoint:null;
  if(key==='skin')learning.toggleTCM(false);
  $('sharedDisplay').value='solid';
  if(!keepPoint)window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'region',id:key,name:(female.active?'女性':'男性')+' · '+sceneNames[key],side:'both'}}));
  if(held)restoreCamera(held);else if(!female.active&&['bones','muscles','nerves','compare'].includes(key))window.__FOOT_ATLAS__.setView('front');if(!options.keepSection)section='layers';redraw();return true;
 }
 async function bindVisibleSurface(){return bindReference();}
 let unavailableReturn=null;
 async function switchSexNow(target){
  if(!['male','female'].includes(target)||target===sex())return false;
  const was=captureWorkspace(),from=sex(),savedSide=female.active?female.getState().side:state.side,savedLabels=female.active?female.getLabels():state.labels,savedDetails=female.active?female.getState().fineDetails:!!$('internalDetails').checked;
  const returning=unavailableReturn?.target===target&&unavailableReturn.revision===layoutRevision?unavailableReturn:null;
  const logical=layers.map(l=>{const states=systemsFor(l).map(k=>snapshots()[k]).filter(Boolean),on=states.filter(s=>s.on);return {id:l.id,on:on.length>0,opacity:on.length?on.reduce((n,s)=>n+(s.opacity??1),0)/on.length:1};});
  bodySnapshots.set(from,{scene:was.scene,revision:layoutRevision,native:was.native});sexSwitching=true;viewTicket++;selectionTicket++;
  try{
   await female.setSex(target,{managed:true});currentReference=false;currentPoint=null;document.body.classList.remove('reference-detail','point-detail-active','tissue-detail-active');
   let next=returning?.scene||was.scene;const nativeOn=Object.values(was.native.systems||{}).some(s=>s.on);const compatibleOn=logical.some(item=>item.on&&systemsFor(layers.find(l=>l.id===item.id)).length);let unavailableFallback=false;if(next==='custom'&&nativeOn&&!compatibleOn&&!returning){unavailableReturn={target:from,revision:layoutRevision,scene:was.scene,native:was.native};next='skin';unavailableFallback=true;toast('当前模型没有对应图层，先显示纯体表；切回后恢复原组合。');}if(!female.active&&next==='breast'||female.active&&next.startsWith('ear-')){next='surface';toast('当前模型没有对应结构，已切到体表；原结构状态已保留。');}
   const cached=returning||bodySnapshots.get(target),reusable=cached&&cached.scene===next&&cached.revision===layoutRevision;
   if(reusable){await restoreNative(cached.native);scene=next;if(returning)unavailableReturn=null;}
   else if(next==='custom'){
    window.__FOOT_ATLAS__.prepareBodyScene('body');if(female.active)female.setCustom();else{await tissues.setProfile('bones');tissues.clearOrganScope();}
    for(const item of logical){const l=layers.find(l=>l.id===item.id);for(const k of systemsFor(l)){
     if(female.active){await female.enable(k,item.on);female.setOpacity(k,item.opacity);}
     else if(k==='bones')window.__FOOT_ATLAS__.restoreBoneState({bonesOn:item.on,boneOpacity:item.opacity});
     else{await tissues.enable(k,item.on);tissues.setOpacity(k,item.opacity);}
    }}scene='custom';
   }else{
    await chooseNow(next,true,{keepSection:true,internalSwitch:true});
    // Preserve user opacity without enabling every organ subgroup in a preset.
    for(const item of logical){const l=layers.find(l=>l.id===item.id);for(const k of systemsFor(l)){const s=snapshots()[k];if(s?.on&&item.on){if(female.active)female.setOpacity(k,item.opacity);else if(k==='bones')tissues.setBoneOpacity(item.opacity);else tissues.setOpacity(k,item.opacity);}}}
   }
   if(female.active){female.setFineDetails(savedDetails);female.setSide(savedSide);female.setLabels(savedLabels);female.setDisplayMode(was.display,{preserveOpacity:true});}
   else{window.__FOOT_ATLAS__.restoreBoneState({side:savedSide,labels:savedLabels});for(const id of ['internalDetails','fasciaOn']){const e=$(id);if(e.checked!==savedDetails){e.checked=savedDetails;e.dispatchEvent(new Event('change',{bubbles:true}));}}}
   await bindReference(was.learning.enabled||next==='surface');
   learning.restoreDisplayState({...was.learning,enabled:unavailableFallback?false:next==='surface'?true:was.learning.enabled});
   currentReference=was.reference||!!was.learning.selectedPoint;currentPoint=learning.getState().selectedPoint;
   if(!currentReference){const native=captureNative(),id=native.selected,row=id&&activeCatalog().find(r=>r.id===id);window.dispatchEvent(new CustomEvent('atlas:selection',{detail:row?{kind:row.kind||'tissue',id:row.id,name:row.name,side:row.side}:{kind:'region',id:scene,name:(female.active?'女性':'男性')+' · '+(sceneNames[scene]||'当前结构'),side:savedSide}}));}
   const bad=Object.entries(snapshots()).filter(([id,s])=>s.on&&!s.loaded);if(bad.length)throw Error('图层未就绪：'+bad.map(([id])=>id).join('、'));
   restoreCamera(was.camera);section=was.section;$('sharedDisplay').value=was.display;redraw();sidebar.scrollTop=was.scroll;document.body.classList.toggle('detail-open',was.detail);
   $('labelsBtn').classList.toggle('active',savedLabels);$('labelsBtn').setAttribute('aria-pressed',String(savedLabels));return true;
  }finally{sexSwitching=false;}
 }
 $('bodySelector').querySelectorAll('[data-body-sex]').forEach(b=>b.onclick=()=>switchSex(b.dataset.bodySex).catch(fail));
 document.addEventListener('click',e=>{const b=e.target.closest('[data-side]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();enqueueAction('side',()=>{layoutRevision++;if(female.active)female.setSide(b.dataset.side);else window.__FOOT_ATLAS__.restoreBoneState({side:b.dataset.side});}).catch(fail);},true);
 window.addEventListener('atlas:v9-point-click',()=>{currentReference=true;currentPoint=learning.getState().selectedPoint;schedule();});
 window.addEventListener('atlas:v9-channel-click',()=>{currentReference=true;currentPoint=null;schedule();});
 $('v9ChannelInfo').addEventListener('click',()=>{currentReference=true;currentPoint=null;schedule();});
 window.addEventListener('atlas:selection',e=>{if(e.detail?.kind==='meridian'&&!sexSwitching&&!learning.getState().selectedPoint){currentPoint=null;}if(['bone','tissue','region'].includes(e.detail?.kind)&&!sexSwitching){currentReference=false;currentPoint=null;document.body.classList.remove('reference-detail');}schedule();});
 window.addEventListener('atlas:sex-changed',()=>{document.body.dataset.bodySex=sex();if(!sexSwitching)schedule();});
 window.addEventListener('atlas:tcm-visibility',()=>{if(learning.getState().enabled&&!state.bodyTransition)enqueueAction('reference',()=>bindReference(true)).catch(fail);});
 for(const e of ['atlas:profile-changed','atlas:structure-updated'])window.addEventListener(e,schedule);
 panel.addEventListener('change',schedule);panel.addEventListener('click',()=>setTimeout(schedule,100));
 // Per-body saved layers, same controls, exact opacity and visibility restored.
 let savedCombo={};$('saveLayerCombo').onclick=()=>enqueueAction('save-combo',saveCombo).catch(fail);function saveCombo(){const value={layers:layers.map(l=>({id:l.id,states:systemsFor(l).map(k=>({key:k,...snapshots()[k]}))})),display:$('sharedDisplay').value,scene,native:captureNative(),learning:learning.getState(),reference:currentReference,savedAt:new Date().toISOString()};savedCombo[sex()]=value;try{localStorage.setItem('atlas21:layers:'+sex(),JSON.stringify(value));}catch{toast('已临时保存，本页可载入；浏览器未允许持久保存。');return value;}toast('已保存'+(female.active?'女性':'男性')+'当前图层组合');return value;};
 $('restoreLayerCombo').onclick=()=>enqueueAction('combo',restoreCombo).catch(fail);async function restoreCombo(){let v=savedCombo[sex()];try{v=JSON.parse(localStorage.getItem('atlas21:layers:'+sex())||'null')||v;}catch{}if(!v)return toast('请先保存一个组合');layoutRevision++;if(v.native){const held=captureCamera();await restoreNative(v.native);await bindReference(v.learning?.enabled);scene=v.scene;$('sharedDisplay').value=v.display;if(v.learning)learning.restoreDisplayState(v.learning);currentPoint=learning.getState().selectedPoint;currentReference=!!(v.reference||currentPoint||v.learning?.studyContext);if(!currentReference){const id=captureNative().selected,row=id&&activeCatalog().find(r=>r.id===id);window.dispatchEvent(new CustomEvent('atlas:selection',{detail:row?{kind:row.kind||'tissue',id:row.id,name:row.name,side:row.side}:{kind:'region',id:scene,name:(female.active?'女性':'男性')+' · '+(sceneNames[scene]||'自定义图层'),side:'both'}}));}const labels=female.active?female.getLabels():state.labels;$('labelsBtn').classList.toggle('active',labels);$('labelsBtn').setAttribute('aria-pressed',String(labels));restoreCamera(held);schedule();toast('已载入'+(female.active?'女性':'男性')+'组合，保留当前视角');return;}const initialSex=sex(),held=captureCamera();for(const l of v.layers){for(const s of l.states){if(initialSex!==sex())return;if(female.active){await female.enable(s.key,!!s.on);female.setOpacity(s.key,s.opacity??1);}else if(s.key==='bones'){state.bonesOn=!!s.on;$('bonesOn').checked=!!s.on;$('bonesOn').dispatchEvent(new Event('change',{bubbles:true}));tissues.setBoneOpacity(s.opacity??1);}else{await tissues.enable(s.key,!!s.on);tissues.setOpacity(s.key,s.opacity??1);}}}await bindReference();scene=v.scene;$('sharedDisplay').value=v.display;if(female.active)female.setDisplayMode(v.display,{preserveOpacity:true});restoreCamera(held);schedule();toast('已恢复组合，视角保持不变');};
 // Reference focus and reading never invoke the last selected female organ accidentally.
 for(const id of ['focusBtn','focusCurrent'])$(id).addEventListener('click',e=>{if(female.active&&currentReference){e.preventDefault();e.stopImmediatePropagation();learning.focusSelectedPoint();}},true);
 $('speakCurrent').onclick=()=>window.__ATLAS_SPEECH__.speak(currentPoint?.name||(female.active?female.getCatalog().find(r=>r.id===female.getState().selected)?.name:window.__ATLAS_STUDY__.getState().current?.name)||'');
 const api={getModelCounts:()=>Object.fromEntries(['bones','muscular','nervous','vessels','ear'].map(id=>[id,maleCatalog.filter(r=>r.system===id).length])),runMutation:(key,fn)=>enqueueAction(key,()=>{layoutRevision++;return fn();}),showSection,choose,switchSex,pickStructure,ready:ensureCatalog(),getState:()=>({version:'23.0.0',section,scene,sex:sex(),directoryQuery:$('structureSearch').value,systemFilter:$('structureSystem').value,scope:$('structureScope').value,directoryElement:directory.id,layersElement:layerRows.id,meridianElement:'tcmControls',femalePointRegistration:false,selectedPoint:currentPoint,sameTabs:tabs.map(([id])=>$(id).textContent),layerRows:layers.map(l=>l.id),busy:sexSwitching||queuedActions>0,layoutRevision,transition:state.bodyTransition||false,transitionErrors:[...transitionErrors]})};window.__ATLAS_SHARED__=api;redraw();return api;
}
