import {fitFractions} from './view-v16.js';
import {placeLabels,labelSlots,placeCompleteLabels} from './meridian-layout-v26.js';
import {FEMALE_FINGER_LANDMARKS} from './female-fingers-v24.js';
import {correctRegionalReferences} from './route-corridors-v13.js';
import {applyPointRules,registrationSummary,getRegistration,registrationCard} from './point-rules-v18.js';
import {canonicalPoint} from './catalog-v10.js';
import {createRouteTube} from './route-geometry-v9.js';
import {pointCardV9,mountEvidenceUI,evidenceData} from './evidence-ui-v9.js';
import {correctedPinyin} from './pronunciation-v5.js';
import {createGuidePaths} from './route-guides-v6.js';
import {NAVIGATION_POINTS} from './navigation-points-v6.js';
import {REFERENCES as ORIGINAL_REFERENCES} from './reference-data.js';
import {headStudyReferences} from './head-study-v8.js';
import {smoothGuidePath} from './route-smoothing-v8.js';
const REFERENCES=headStudyReferences(ORIGINAL_REFERENCES,NAVIGATION_POINTS);
import {LineSegments2} from 'three/addons/lines/LineSegments2.js';
import {LineSegmentsGeometry} from 'three/addons/lines/LineSegmentsGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

// V3: panels are navigation; layer visibility is an independent, persistent state.
export function initLearningEnhancements(ctx) {
 const {THREE, scene, camera, renderer, viewport, bones, BONES, BY_ID, state, controls, toast, selectBone, setRegion, setSide, fitToContent} = ctx;
 const $ = id => document.getElementById(id);
 const store = {get(k,d){try{return localStorage.getItem(k)??d;}catch{return d;}},set(k,v){try{localStorage.setItem(k,v);}catch{}}};
 const compact = () => innerWidth <= 1100;
 const normalize = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\s·]/g,'');
 const bonePinyin = id => ctx.bonePinyin(BY_ID[id]);
 const displayColors={LU:'#12618d',LI:'#6853ac',ST:'#397851',SP:'#946ba1',HT:'#bd3657',SI:'#116d9e',BL:'#4d59ab',KI:'#685f92',PC:'#137976',TE:'#328076',GB:'#46558c',LR:'#2c7750',GV:'#6643b1',CV:'#1768a0'};
 ctx.MERIDIANS=[...ctx.MERIDIANS.map(m=>({...m,color:displayColors[m.id]||m.color})),{id:'EX',short:'头面补充',name:'经外／头面补充',pinyin:'jīng wài',color:'#8259a0',count:12}];
 const refMap=Object.fromEntries([...REFERENCES,...NAVIGATION_POINTS].map(p=>[p.code,p]));
 ctx.ACUPOINTS=[...ctx.ACUPOINTS.map(p=>({...p,...refMap[p.code],mapped:!!refMap[p.code]?.position})),...REFERENCES.filter(p=>p.meridian==='EX').map(p=>({...p,mapped:!!(p.position||p.parts)}))];
 ctx.ACUPOINTS=applyPointRules(correctRegionalReferences(ctx.ACUPOINTS.map(canonicalPoint)));
 const meridianMap=Object.fromEntries(ctx.MERIDIANS.map(m=>[m.id,m]));
 let selectedMeridians=new Set(['HT','SI']),suspended=false;
 const PAIR = new Set(['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR']);
 const routeRoot = new THREE.Group(); routeRoot.name='Individually annotated reference anchors V4'; scene.add(routeRoot);
 let enabled=false, panelOpen=false, linesOn=true, pointsOn=true, namesOn=true, xray=false, guideOn=true;
 let autoFocus=true,labelPage=0,labelMode='smart',navigationFocus=null,focusSerial=0,lastLabelsAt=0;
 let labelStats={total:0,inView:0,shown:0,page:1,pages:1,capacity:0};
 let activeMeridian=store.get('atlas-meridian','LU'), tcmSide='both', selectedPoint=null, selectedMarker=null, cardOpen=false;
 if(!meridianMap[activeMeridian] && activeMeridian!=='ALL') activeMeridian='LU';
 const pointIndex=new Map(), routeRecords=[], labelNodes=[];
 let surfaceProjector=null,surfaceAttached=false,surfaceBusy=false;let lastSkinPaintVisible=null;
 const paintedSkinVisible=()=>surfaceAttached&&!!surfaceProjector?.hasVisibleSkin?.();
 let surfaceDesired=false,surfaceTask=null,referenceBody='male',desiredBody='male',desiredProjector=null;const bodyProjectors=new Map();let studyContext=null,curveStyle='smooth',precisionMode='strict';
 let hoveredPoint=null, lastHover=0, lastLabelRebuild='', lastPose='', lastSize='';
 controls.addEventListener('start',()=>{navigationFocus=null;focusSerial++;});
 const autoSpeak=()=>store.get('atlas-auto-speak','1')!=='0';
 function speak(text){return ctx.speech.speak(text);}
 function setAutoSpeak(on){store.set('atlas-auto-speak',on?'1':'0');$('autoSpeakBtn').classList.toggle('active',on);$('autoSpeakBtn').setAttribute('aria-pressed',String(on));}
 const sidebar=document.querySelector('.sidebar'), detail=document.querySelector('.detail-panel');
 const bonePane=document.createElement('div');bonePane.className='bone-pane';
 while(sidebar.firstChild)bonePane.append(sidebar.firstChild);sidebar.append(bonePane);
 const tabs=document.createElement('div');tabs.className='library-tabs';tabs.innerHTML='<button id="boneTab" class="active">骨骼目录</button><button id="tcmTab">经络穴位</button><button id="closeNav" title="收起目录" aria-label="收起目录">收起</button>';sidebar.prepend(tabs);
 const drawer=document.createElement('div');drawer.className='drawer-buttons';drawer.innerHTML='<button id="openNav">部位 / 目录</button><button id="openDetail">详情</button>';document.querySelector('.header-actions').prepend(drawer);
 const closeDetail=document.createElement('button');closeDetail.id='closeDetail';closeDetail.textContent='收起详情';document.querySelector('.detail-top').prepend(closeDetail);
 const speakButton=document.createElement('button');speakButton.id='speakBoneBtn';speakButton.className='speak-bone-button';speakButton.textContent='▶ 朗读骨名';document.querySelector('.detail-top').append(speakButton);speakButton.onclick=()=>speak(BY_ID[state.selected]?.name);
 const tools=document.querySelector('.stage-tools');
 const auto=document.createElement('button');auto.id='autoSpeakBtn';auto.title='点选时自动朗读';auto.textContent='声';auto.setAttribute('aria-label','点选时自动朗读');tools.prepend(auto);auto.onclick=()=>setAutoSpeak(!autoSpeak());setAutoSpeak(autoSpeak());
 const more=document.createElement('button');more.id='moreViewsBtn';more.title='更多学习焦点';more.textContent='局部';tools.prepend(more);
 const viewPanel=document.createElement('div');viewPanel.id='moreViewsPanel';viewPanel.className='more-views-panel';viewPanel.hidden=true;viewPanel.innerHTML='<div class="panel-kicker">局部快捷观察</div><div class="preset-grid"></div>';document.querySelector('.stage').append(viewPanel);
 const PRESETS=[['face','面颅与下颌','head','mandible'],['skullbase','颅底','head','sphenoid'],['craniovertebral','颅颈交界','cervical','C1'],['neckshoulder','颈肩','shoulder','clavicle-right'],['shoulderjoint','肩关节','shoulder','humerus-right'],['elbowjoint','肘关节','elbow','radius-right'],['forearm','前臂','upper','radius-right'],['palm','腕掌与手指','hand','capitate-right'],['kneejoint','膝关节','knee','patella'],['anklejoint','踝关节','ankle','talus'],['plantar','足底','foot','calcaneus'],['sacroiliac','骶髂区','pelvis','sacrum']];
 for(const [id,name] of PRESETS){const b=document.createElement('button');b.dataset.preset=id;b.textContent=name;b.onclick=()=>runPreset(id);viewPanel.querySelector('.preset-grid').append(b);}
 function runPreset(id){const p=PRESETS.find(p=>p[0]===id);if(!p)return false;let bid=p[3];if(state.side==='left'){const original=BY_ID[bid];bid=BONES.find(b=>b.side==='left'&&b.baseId===original?.baseId)?.id||bid;}
  setRegion(p[2]);selectBone(bid,true,false);viewPanel.hidden=true;
  if(id==='plantar')ctx.setView('plantar');else if(['skullbase','face'].includes(id))fitToContent(true,null,null,true);
  document.body.classList.remove('nav-open');return true;
 }
 more.onclick=()=>{viewPanel.hidden=!viewPanel.hidden;};
 const toolbar=document.createElement('div');toolbar.className='study-toolbar';toolbar.innerHTML='<button id="tcmLayerToggle" aria-pressed="false">经络：隐藏</button><select id="meridianQuick" aria-label="快速切换经脉"></select><button id="tcmQuickFit">看所选</button><button id="tcmBtn">经络设置</button>';document.querySelector('.stage').append(toolbar);
 $('meridianQuick').innerHTML=ctx.MERIDIANS.map(m=>`<option value="${m.id}">${m.short} ${m.id}</option>`).join('')+'<option value="ALL">全部十四经脉</option>';$('meridianQuick').value=activeMeridian;
 const panel=document.createElement('section');panel.id='tcmControls';panel.className='tcm-controls';panel.hidden=true;panel.innerHTML=`<div class="tcm-head"><div><b>经脉与穴名 · 证据查阅</b><small>设置在侧栏，3D画面始终可操作</small></div><button id="tcmClose" aria-label="收起经络设置">收起</button></div><div class="tcm-master-row"><button id="tcmMasterToggle">显示经络</button><button id="tcmFitMeridian">看所选</button></div><div class="tcm-toggle-row"><button id="meridianLineToggle" class="active">线路</button><button id="acupointToggle" class="active">点位</button><button id="pointNamesToggle" class="active">穴名</button></div><div class="tcm-side-picker"><button data-tcm-side="right">人体右侧</button><button data-tcm-side="both" class="active">双侧</button><button data-tcm-side="left">人体左侧</button></div><label class="tcm-xray"><input id="tcmXray" type="checkbox">透视查看被遮挡的点线</label><label class="tcm-xray"><input id="guideToggle" type="checkbox" checked>显示经络导览（非取穴定位）</label><label class="tcm-xray">线型<select id="curveStyle"><option value="smooth">贴肤实线</option><option value="dashed">贴肤虚线</option></select></label><div class="guide-actions"><button id="guideBack">看背部</button><button id="guideFront">看正面</button></div><div id="guideCoverage" class="guide-coverage"></div><label class="tcm-xray"><input id="autoFocusPoint" type="checkbox" checked>点击穴名查看部位；示意模式可聚焦标记</label><label class="tcm-search"><input id="acupointSearch" aria-label="搜索穴位名称、拼音或编码" type="search" placeholder="穴名 / 拼音 / 编码，如迎香、KI27" autocomplete="off"></label><div class="v4-button-row"><button id="pairHeart">心经＋小肠经</button><button id="pairLung">肺经＋大肠经</button><button id="headPoints">头面补充</button></div><div class="selection-help">可多选经脉；再次点击取消。十四经361个穴名均有部位导航；示意点不等于临床定位。</div><div id="meridianChips" class="meridian-chips"></div><div class="tcm-section-label">穴位名称目录 <small id="pointResultCount"></small></div><div id="acupointResults" class="acupoint-results"></div><p class="tcm-disclaimer">点位为按部位和骨性标志建立的导航示意，未经临床定位校准。导览线展示体表区域，不含完整内行、络脉及其他支脉。</p>`;sidebar.append(panel);
 const status=document.createElement('div');status.id='tcmStatus';status.className='tcm-status';status.hidden=true;status.innerHTML='<span class="tcm-status-dot"></span><button id="tcmStatusMain"></button><button id="tcmStatusSettings">设置</button><button id="tcmStatusHide">隐藏图层</button>';document.querySelector('.stage').append(status);
 const card=document.createElement('section');card.id='tcmPointCard';card.className='tcm-point-card';card.hidden=true;document.querySelector('.detail-scroll').prepend(card);
 const chip=document.createElement('div');chip.id='selectionChip';chip.className='selection-chip';chip.innerHTML='<button id="selectionChipText"></button><button id="chipDetails">详情</button><button id="chipSpeak">朗读</button>';document.querySelector('.stage').append(chip);
 const labels=document.createElement('div');labels.id='acupointLabels';labels.className='acupoint-label-layer';viewport.append(labels);
 const labelNav=document.createElement('div');labelNav.id='acupointLabelNav';labelNav.className='acupoint-label-nav';labelNav.hidden=true;
 labelNav.innerHTML='<button id="labelModeToggle" aria-pressed="false">附近穴名</button><button id="labelPrevious" aria-label="上一页穴名">‹</button><span id="labelPageInfo"></span><button id="labelNext" aria-label="下一页穴名">›</button><button id="labelFitAll">看全线</button>';
 document.querySelector('.stage').append(labelNav);
 const wires=document.createElementNS('http://www.w3.org/2000/svg','svg');wires.classList.add('acupoint-label-wires');labels.append(wires);
 const hover=document.createElement('div');hover.id='acuHover';hover.className='acu-hover';hover.hidden=true;viewport.append(hover);
 const areaTag=document.createElement('div');areaTag.id='headAreaTag';areaTag.className='head-area-tag';areaTag.hidden=true;viewport.append(areaTag);
 $('openNav').onclick=()=>{document.body.classList.toggle('nav-open');document.body.classList.remove('detail-open');};
 $('closeNav').onclick=()=>{document.body.classList.remove('nav-open');};
 function ensureDetailPointVisible(){if(!compact()||!enabled||!selectedPoint?.position)return;requestAnimationFrame(()=>{if(document.body.classList.contains('detail-open')&&project(selectedPoint).y>detail.getBoundingClientRect().top-28)focusReference(selectedPoint);});}
 $('openDetail').onclick=()=>{document.body.classList.toggle('detail-open');document.body.classList.remove('nav-open');ensureDetailPointVisible();};
 $('closeDetail').onclick=()=>document.body.classList.remove('detail-open');
 $('boneTab').onclick=()=>setPanel(false);$('tcmTab').onclick=()=>{toggleTCM(true);setPanel(true);};
 $('chipDetails').onclick=$('selectionChipText').onclick=()=>{if(selectedPoint&&enabled){card.hidden=false;cardOpen=true;document.body.classList.add('point-detail-active');}document.body.classList.add('detail-open');document.body.classList.remove('nav-open');ensureDetailPointVisible();};
 $('chipSpeak').onclick=()=>speak(selectedPoint&&enabled?selectedPoint.name:BY_ID[state.selected]?.name);
 window.addEventListener('atlas:bone-selected',e=>{if(e.detail?.user){selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();if(autoSpeak())speak(BY_ID[e.detail.id]?.name);}updateStatus();});
 window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')){document.body.classList.remove('nav-open','detail-open');viewPanel.hidden=true;if(panelOpen)setPanel(false);}});
 $('meridianChips').innerHTML=ctx.MERIDIANS.map(m=>`<button data-meridian="${m.id}" style="--m:${m.color}">${m.short}<small>${m.id}</small></button>`).join('')+'<button data-meridian="ALL">全部经脉</button>';
 $('meridianChips').querySelectorAll('button').forEach(b=>b.onclick=()=>{const id=b.dataset.meridian;if(id==='ALL'){setMeridians(ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id));toggleTCM(true);return;}if(selectedMeridians.has(id))selectedMeridians.delete(id);else selectedMeridians.add(id);setMeridians([...selectedMeridians]);toggleTCM(true);});
 $('pairHeart').onclick=()=>{setMeridians(['HT','SI']);toggleTCM(true);};$('pairLung').onclick=()=>{setMeridians(['LU','LI']);toggleTCM(true);};$('headPoints').onclick=()=>{setMeridians(['EX']);toggleTCM(true);};
 $('meridianQuick').onchange=()=>{if($('meridianQuick').value==='MULTI'){toggleTCM(true);setPanel(true);return;}setMeridian($('meridianQuick').value);toggleTCM(true);};
 $('tcmLayerToggle').onclick=()=>toggleTCM(!enabled);
 $('tcmBtn').onclick=()=>{toggleTCM(true);setPanel(!panelOpen||!document.body.classList.contains('nav-open')&&compact());};
 $('tcmClose').onclick=()=>setPanel(false);
 $('tcmMasterToggle').onclick=()=>toggleTCM(!enabled);
 $('tcmStatusSettings').onclick=()=>setPanel(true);
 $('tcmStatusHide').onclick=()=>toggleTCM(false);
 $('tcmStatusMain').onclick=()=>selectedPoint&&(selectedPoint.position||selectedPoint.navigationArea)?focusReference(selectedPoint):fitMeridian();
 $('tcmQuickFit').onclick=$('tcmFitMeridian').onclick=()=>{toggleTCM(true);fitMeridian();};
 for(const [id,get,set] of [['meridianLineToggle',()=>linesOn,v=>{linesOn=v;guideOn=v;$('guideToggle').checked=v;}],['acupointToggle',()=>pointsOn,v=>pointsOn=v],['pointNamesToggle',()=>namesOn,v=>namesOn=v]])$(id).onclick=()=>{set(!get());$(id).classList.toggle('active',get());updateOverlayVisibility();};
 panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.onclick=()=>{setTCMSide(b.dataset.tcmSide);});
 $('tcmXray').onchange=()=>{xray=$('tcmXray').checked;updateOverlayVisibility();};
 $('acupointSearch').oninput=renderResults;
 $('autoFocusPoint').onchange=e=>autoFocus=e.target.checked;
 $('labelPrevious').onclick=()=>{labelPage=Math.max(0,labelPage-1);lastLabelsAt=0;};
 $('labelNext').onclick=()=>{labelPage=Math.min(labelStats.pages-1,labelPage+1);lastLabelsAt=0;};
 $('labelFitAll').onclick=()=>fitMeridian();
 $('labelModeToggle').onclick=()=>{labelMode=labelMode==='complete'?'smart':'complete';labelPage=0;$('labelModeToggle').textContent=labelMode==='complete'?'完整穴名':'附近穴名';$('labelModeToggle').setAttribute('aria-pressed',String(labelMode==='complete'));lastLabelsAt=0;};
 $('curveStyle').onchange=e=>{curveStyle=e.target.value;for(const r of routeRecords)for(const g of r.guides)for(const obj of [g.guide,g.border]){obj.material.dashed=curveStyle==='dashed';obj.material.needsUpdate=true;}updateOverlayVisibility();};
 $('guideToggle').onchange=e=>{guideOn=linesOn=e.target.checked;$('meridianLineToggle').classList.toggle('active',linesOn);updateOverlayVisibility();};
 $('guideBack').onclick=()=>fitMeridian([0,.05,-1]);$('guideFront').onclick=()=>fitMeridian([0,.05,1]);
 function setPanel(open){if(open&&$('tissuePanel')){$('tissuePanel').hidden=true;$('layersTab')?.classList.remove('active');}panelOpen=!!open;panel.hidden=!panelOpen;bonePane.hidden=panelOpen;sidebar.classList.toggle('tcm-mode',panelOpen);$('boneTab').classList.toggle('active',!panelOpen);$('tcmTab').classList.toggle('active',panelOpen);$('tcmBtn').setAttribute('aria-expanded',String(panelOpen));if(compact()){document.body.classList.toggle('nav-open',panelOpen);document.body.classList.remove('detail-open');}viewPanel.hidden=true;}
 function toggleTCM(on){enabled=!!on;window.dispatchEvent(new CustomEvent('atlas:tcm-visibility'));routeRoot.visible=enabled;updateOverlayVisibility();if(!enabled){card.hidden=true;cardOpen=false;hover.hidden=true;wires.innerHTML='';}updateStatus();}
 function setMeridians(ids){hover.hidden=true;ctx.invalidate();labelPage=0;window.__FOOT_ATLAS__?.captureCamera();studyContext=null;navigationFocus=null;focusSerial++;lastReferenceWindowKey='';selectedMeridians=new Set(ids.filter(id=>meridianMap[id]));activeMeridian=selectedMeridians.size===1?[...selectedMeridians][0]:'MULTI';$('meridianQuick').value=activeMeridian;panel.querySelectorAll('[data-meridian]').forEach(b=>{b.classList.toggle('active',selectedMeridians.has(b.dataset.meridian));b.setAttribute('aria-pressed',String(selectedMeridians.has(b.dataset.meridian)));});if(selectedPoint&&!selectedMeridians.has(selectedPoint.meridian)){selectedPoint=null;card.hidden=true;cardOpen=false;clearSelectedMarker();}syncReferenceWindow();updateOverlayVisibility();renderResults();window.dispatchEvent(new CustomEvent('atlas:selection',{detail:selectedPoint?{kind:'point',id:selectedPoint.code,name:selectedPoint.name,side:selectedPoint.side}:{kind:'meridian',id:[...selectedMeridians].join(','),name:(selectedMeridians.size===14?'十四经总览':selectedMeridians.size>3?selectedMeridians.size+'条经脉对照':[...selectedMeridians].map(id=>meridianMap[id].name).join('＋')),side:tcmSide}}));}
 function setMeridian(id){id=String(id).toUpperCase().replace(/^DU$/,'GV').replace(/^(RN|REN)$/,'CV');setMeridians(id==='ALL'?ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id):[id]);}
 function reconcileSurfaceSide(side){
  if(!surfaceAttached)return;
  const female=state.bodySex==='female',api=window.__ATLAS_FEMALE__,physical=female?api?.getState().side:state.side;
  if(!physical||physical===side||physical==='both'&&side!=='both')return;
  if(female)api.setSide(side);else window.__FOOT_ATLAS__.restoreBoneState({side,isolated:false,neighbors:false});
 }
 function setTCMSide(side){ctx.invalidate();
  if(!['right','both','left'].includes(side))return;ctx.invalidate();labelPage=0;const prior=selectedPoint,observation=captureSurfaceObservation(),view=window.__FOOT_ATLAS__?.captureCamera();navigationFocus=null;tcmSide=side;reconcileSurfaceSide(side);
  panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.classList.toggle('active',b.dataset.tcmSide===side));
  if(prior&&prior.side!=='midline'&&side!=='both'){
   const target=pointIndex.get(prior.code+'|'+side);
   if(target){selectPoint(target,false,{restoring:true});if(observation&&view)window.__FOOT_ATLAS__?.restoreCamera(transferSurfaceObservation({...observation,visible:true,side:target.side},view));return;}
  }
  updateOverlayVisibility();updateStatus();
  if(!prior)window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'meridian',id:[...selectedMeridians].join(','),name:(selectedMeridians.size===14?'十四经总览':selectedMeridians.size>3?selectedMeridians.size+'条经脉对照':[...selectedMeridians].map(id=>meridianMap[id].name).join('＋')),side}}));
 }

 function updateStatus(){if(!$('tcmStatusMain'))return;document.body.classList.toggle('point-detail-active',cardOpen&&enabled);status.hidden=!enabled;const m=meridianMap[activeMeridian];const summary=selectedMeridians.size===14?'十四经总览':selectedMeridians.size>3?selectedMeridians.size+'条经脉对照':[...selectedMeridians].map(id=>meridianMap[id]?.short).join('＋');const text=selectedPoint?`${selectedPoint.name} ${selectedPoint.code} · ${selectedPoint.side==='left'?'人体左':selectedPoint.side==='right'?'人体右':'中线'}`:`${summary||'未选经脉'} · ${guideOn?'走向示意 · ':''}${getVisiblePoints().length}参考点`;$('tcmStatusMain').textContent=text;status.style.setProperty('--m',m?.color||'#467961');$('tcmLayerToggle').textContent=enabled?'经络：显示':'经络：隐藏';$('tcmLayerToggle').classList.toggle('active',enabled);$('tcmLayerToggle').setAttribute('aria-pressed',String(enabled));$('tcmMasterToggle').textContent=enabled?'隐藏经络图层':'显示经络图层';$('selectionChipText').textContent=selectedPoint&&enabled?`${selectedPoint.name} · ${selectedPoint.pinyin} · ${selectedPoint.code}`:`${BY_ID[state.selected]?.name||'选择骨骼'} · ${bonePinyin(state.selected)||''}`;}
 function makePointMaterial(color,size){return new THREE.ShaderMaterial({uniforms:{tint:{value:new THREE.Color(color)},pixelSize:{value:size},pixelRatio:{value:renderer.getPixelRatio()}},vertexShader:'uniform float pixelSize;uniform float pixelRatio;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_PointSize=pixelSize*pixelRatio;}',fragmentShader:'uniform vec3 tint;void main(){float d=length(gl_PointCoord-vec2(0.5));if(d>0.5)discard;vec3 c=d<0.13?tint:d<0.32?vec3(0.99):tint;float a=1.0-smoothstep(0.44,0.5,d);gl_FragColor=vec4(c,a);\n#include <colorspace_fragment>\n}',transparent:true,depthWrite:false,depthTest:false,toneMapped:false});}
 function buildRoutes(){
 const mid=99.55318155698478;
 for(const m of ctx.MERIDIANS){const sideList=PAIR.has(m.id)?['right','left']:m.id==='EX'?['right','left','midline']:['midline'];
  for(const side of sideList){const members=ctx.ACUPOINTS.filter(p=>p.meridian===m.id);const data=[];
   for(const p of members){if(m.id==='EX'&&((p.side==='midline')!==(side==='midline')))continue;
    if(p.parts){if(side!=='midline')continue;p.parts.forEach((v,i)=>data.push({...p,part:i+1,side,position:new THREE.Vector3(...v)}));}
    else if(p.position){const v=new THREE.Vector3(...p.position);if(side==='left')v.x=2*mid-v.x;data.push({...p,side,position:v});}
    else pointIndex.set(p.code+'|'+side,{...p,side,position:null});
   }
   data.forEach(p=>{if(!pointIndex.get(p.code+'|'+side)?.position)pointIndex.set(p.code+'|'+side,p);});
   const c=new THREE.Color(m.color),hsl={};c.getHSL(hsl);c.setHSL(hsl.h,Math.max(.52,hsl.s),Math.min(.37,hsl.l));const color='#'+c.getHexString();
   const segments=[];if(m.id!=='EX')for(let i=1;i<data.length;i++){const a=data[i-1],b=data[i];if(Number(b.code.match(/\d+$/)?.[0])===Number(a.code.match(/\d+$/)?.[0])+1)segments.push(...a.position.toArray(),...b.position.toArray());}
   const geo=new LineSegmentsGeometry().setPositions(segments.length?segments:[0,0,0,0,0,0]);
   const material=new LineMaterial({color,linewidth:3,worldUnits:false,transparent:true,opacity:.78,depthTest:true,depthWrite:false,toneMapped:false});const line=new LineSegments2(geo,material);line.renderOrder=20;line.computeLineDistances();
   const outline=new LineSegments2(geo,new LineMaterial({color:'#ffffff',linewidth:5,worldUnits:false,transparent:true,opacity:.65,depthTest:true,depthWrite:false,toneMapped:false}));outline.renderOrder=19;
   const guides=createGuidePaths(THREE,bones,m.id,side,data).map(path=>{
    const sampled=createRouteTube(THREE,path.points,color),smooth=sampled.points;routeRoot.add(sampled.mesh);
    const geometry=new LineGeometry().setPositions(smooth.flatMap(p=>p.toArray()));
    const mat=new LineMaterial({color: m.id==='GV'?'#6643b1':color,linewidth:4,worldUnits:false,transparent:true,opacity:.93,depthTest:false,depthWrite:false,dashed:false,dashSize:12,gapSize:6,dashScale:1,toneMapped:false});
    const guide=new Line2(geometry,mat);guide.computeLineDistances();guide.renderOrder=22;routeRoot.add(guide);
    const border=new Line2(geometry,new LineMaterial({color:'#fbfcf8',linewidth:7,worldUnits:false,transparent:true,opacity:.85,depthTest:false,depthWrite:false,dashed:false,dashSize:12,gapSize:6,dashScale:1,toneMapped:false}));border.computeLineDistances();border.renderOrder=21;routeRoot.add(border);
    return {guide,border,tube:sampled.mesh,points:smooth,sourcePoints:path.points.map(v=>v.clone()),sourceGeometry:sampled.mesh.geometry,codes:path.codes,note:path.note,curveDiagnostics:sampled.diagnostics};
   });
   const cloud=new THREE.Points(new THREE.BufferGeometry().setFromPoints(data.map(p=>p.position)),makePointMaterial(color,12));cloud.renderOrder=30;routeRoot.add(outline,line,cloud);routeRecords.push({meridian:m.id,side,data,line,outline,cloud,color,guides,hasSegments:segments.length>0});
  }
 }
 }
 buildRoutes();
 function routeMatches(r){const physical=state.bodySex==='female'?window.__ATLAS_FEMALE__?.getState().side:state.side;return selectedMeridians.has(r.meridian)&&(tcmSide==='both'||r.side==='midline'||r.side===tcmSide)&&(!physical||physical==='both'||r.side==='midline'||r.side===physical);}
 function referenceWindow(){
  if(!studyContext||document.getElementById('localStudyToggle')?.checked===false)return null;
  const v=new THREE.Vector3(...studyContext.center),radius=studyContext.radius*1.6;
  return new THREE.Box3(v.clone().addScalar(-radius),v.clone().addScalar(radius));
 }
 function getVisiblePoints(){const box=referenceWindow();return !state.bodyTransition&&enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')&&pointsOn&&precisionMode==='illustrative'?routeRecords.filter(routeMatches).flatMap(r=>r.data).filter(p=>!box||box.containsPoint(p.position)):[];}
 let lastReferenceWindowKey='';
 function syncReferenceWindow(){
  const box=referenceWindow(),key=box?studyContext.code+'|'+studyContext.side+'|'+studyContext.center.join(','):'full';
  if(key===lastReferenceWindowKey)return;lastReferenceWindowKey=key;
  const planes=box?[new THREE.Plane(new THREE.Vector3(1,0,0),-box.min.x),new THREE.Plane(new THREE.Vector3(-1,0,0),box.max.x),new THREE.Plane(new THREE.Vector3(0,1,0),-box.min.y),new THREE.Plane(new THREE.Vector3(0,-1,0),box.max.y),new THREE.Plane(new THREE.Vector3(0,0,1),-box.min.z),new THREE.Plane(new THREE.Vector3(0,0,-1),box.max.z)]:[];
  for(const r of routeRecords){
   const shown=box?r.data.filter(p=>box.containsPoint(p.position)):r.data;
   r.cloud.geometry.dispose();r.cloud.geometry=new THREE.BufferGeometry().setFromPoints(shown.map(p=>p.position));if(shown.length)r.cloud.geometry.computeBoundingSphere();
   for(const g of r.guides)for(const mesh of [g.guide,g.border,g.tube]){mesh.material.clippingPlanes=planes;mesh.material.needsUpdate=true;}
  }
  lastLabelsAt=0;lastLabelRebuild='';updateOverlayVisibility();
 }

 function boxPlanes(b){return [new THREE.Plane(new THREE.Vector3(1,0,0),-b.min.x),new THREE.Plane(new THREE.Vector3(-1,0,0),b.max.x),new THREE.Plane(new THREE.Vector3(0,1,0),-b.min.y),new THREE.Plane(new THREE.Vector3(0,-1,0),b.max.y),new THREE.Plane(new THREE.Vector3(0,0,1),-b.min.z),new THREE.Plane(new THREE.Vector3(0,0,-1),b.max.z)];}
 function updateOverlayVisibility(){ctx.invalidate();surfaceProjector?.syncOcclusion?.();const badge=$('v9PrecisionBadge');if(badge)badge.textContent=xray?'透视点线 · 未校准':paintedSkinVisible()?'贴肤点线 · 未校准':'体表投影 · 未校准';if(!enabled||suspended||!pointsOn||!namesOn){wires.innerHTML='';labels.hidden=true;}
  routeRoot.visible=!state.bodyTransition&&enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')&&precisionMode==='illustrative';
  for(const r of routeRecords){
   const show=enabled&&routeMatches(r),paint=paintedSkinVisible()&&!!r.ink;r.line.visible=false;r.outline.visible=false;r.cloud.visible=show&&pointsOn&&(!paint||xray);if(r.ink){r.ink.mesh.visible=show&&paint;const u=r.ink.mesh.material.uniforms;u.pixelRatio.value=ctx.renderer.getPixelRatio();u.lineScale.value=selectedMeridians.size>3?.95:1.15;u.linesOn.value=guideOn&&linesOn&&curveStyle!=='tube'&&!xray?1:0;u.pointsOn.value=pointsOn&&!xray?1:0;if(u.selectedOn){const active=show&&pointsOn&&!xray&&selectedPoint?.skinContact&&selectedPoint.meridian===r.meridian&&selectedPoint.side===r.side;u.selectedOn.value=active?1:0;if(active)u.selectedContact.value.copy(selectedPoint.skinContact);}u.dashed.value=curveStyle==='dashed'?1:0;const physical=state.bodySex==='female'?window.__ATLAS_FEMALE__?.getState().side:state.side;u.physicalSide.value=physical==='left'?1:physical==='right'?-1:0;r.ink.mesh.material.clippingPlanes=[...(referenceWindow()?boxPlanes(referenceWindow()):[]),...(surfaceProjector?.getSkinClipping?.()||[])];}
   for(const obj of [r.line,r.outline,r.cloud])obj.material.depthTest=!xray;
   r.line.material.linewidth=3.5;r.outline.material.linewidth=6.5;r.cloud.material.uniforms.pixelSize.value=surfaceAttached?6:selectedMeridians.size>3?8:12;
   for(const g of r.guides){const width=surfaceAttached?2.3*(selectedMeridians.size>3?.95:1.15):4;g.guide.material.linewidth=width;g.border.material.linewidth=width+1.6;g.guide.visible=show&&guideOn&&linesOn&&curveStyle!=='tube'&&(!paint||xray);g.border.visible=g.guide.visible;g.tube.visible=show&&guideOn&&linesOn&&curveStyle==='tube';g.guide.material.depthTest=!xray;g.border.material.depthTest=!xray;g.tube.material.depthTest=!xray;g.tube.material.opacity=surfaceAttached?1:xray?.82:.97;g.tube.material.color.set(r.color);if(surfaceAttached)g.tube.material.color.multiplyScalar(.68);g.tube.material.emissive.set(surfaceAttached?r.color:'#000000');g.tube.material.emissiveIntensity=surfaceAttached?.13:0;}
  }
  if(selectedMarker){selectedMarker.visible=precisionMode==='illustrative'&&enabled&&!suspended&&pointsOn&&!!selectedPoint&&routeMatches(selectedPoint)&&!!(selectedPoint.position||selectedPoint.navigationArea)&&(!paintedSkinVisible()||!selectedPoint.skinContact||xray);selectedMarker.material.depthTest=!xray;if(selectedMarker.material.uniforms?.pixelSize)selectedMarker.material.uniforms.pixelSize.value=surfaceAttached?10:20;}
  const active=routeRecords.filter(routeMatches),gn=active.reduce((n,r)=>n+r.guides.length,0);
  if($('guideCoverage'))$('guideCoverage').textContent=precisionMode==='strict'?'严谨查阅：当前全部点线未完成定位校准，已隐藏。可查看目录说明，或明确切换到未校准的三维示意。':referenceWindow()?'局部观察：'+studyContext.name+'；只显示当前范围内的点线。点击“看全线”恢复整条，或在图层设置关闭局部范围。':!guideOn?'线路已关闭；点位和穴名仍可查看。勾选走向导览恢复线路。':gn?`${curveStyle==='tube'?'三维细线':curveStyle==='smooth'?'平面导览线':'虚线'}：区域导览，非真实神经或取穴线；圆点：原穴名参照。${gn} 段；${surfaceAttached?'贴面显示投影；不是穴位校准。':'原参照坐标；不是穴位校准。'}`:'所选条目暂无走向线；点位或名称目录仍可查看。';
  lastLabelRebuild='';updateStatus();
 }
 const baseFocusBounds=ctx.focusBounds;
 ctx.focusBounds=(box,options={})=>{
  if(options.safeCenter){camera.clearViewOffset();baseFocusBounds(box,options);return;}
  baseFocusBounds(box,options);
  if(!options.direction||box.isEmpty())return;
  const rect=viewport.getBoundingClientRect(),w=Math.max(1,rect.width),h=Math.max(1,rect.height);
  let top=65;
  for(const sel of ['.stage-heading','.view-switcher','.study-toolbar','#tcmStatus']){
   const el=document.querySelector(sel);if(el&&!el.hidden&&el.getBoundingClientRect().height)top=Math.max(top,el.getBoundingClientRect().bottom-rect.top+18);
  }
  if(!status.hidden)top=Math.max(top,status.getBoundingClientRect().bottom-rect.top+18);
  top=Math.min(top,h*.56);
  let bottom=document.body.classList.contains('dock-collapsed')?(h<450?64:120):Math.min(225,h*.34);
  const rails=enabled&&namesOn&&labelMode==='complete'&&precisionMode==='illustrative';
  const left=rails?(w<540?136:165):35,right=rails?(w<540?54:225):60;
  const usableW=Math.max(w*.22,w-left-right),usableH=Math.max(h*.18,h-top-bottom);
  const center=box.getCenter(new THREE.Vector3()),dir=new THREE.Vector3(...options.direction).normalize();
  const rightV=new THREE.Vector3().crossVectors(camera.up,dir).normalize(),upV=new THREE.Vector3().crossVectors(dir,rightV).normalize();let mx=0,my=0,depth=0;
  for(let i=0;i<8;i++){const v=new THREE.Vector3(i&1?box.max.x:box.min.x,i&2?box.max.y:box.min.y,i&4?box.max.z:box.min.z).sub(center);mx=Math.max(mx,Math.abs(v.dot(rightV)));my=Math.max(my,Math.abs(v.dot(upV)));depth=Math.max(depth,Math.abs(v.dot(dir)));}
  const t=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
  const distance=Math.max(my/(t*(usableH/h)),mx/(t*camera.aspect*(usableW/w)))+depth+24;
  const cx=left+usableW/2,cy=top+usableH/2;
  camera.setViewOffset(w,h,w/2-cx,h/2-cy,w,h);camera.position.copy(center).addScaledVector(dir,distance);controls.target.copy(center);
  controls.maxDistance=Math.max(5000,distance*4);camera.far=Math.max(24000,distance*8);camera.updateProjectionMatrix();
  const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;camera.updateMatrixWorld(true);
 };
 function prepareNavigation(keepDetails=false){const hadDetails=document.body.classList.contains('detail-open');
  if(state.bodySex!=='female')ctx.prepareReferenceFocus?.();suspended=false;
  if(compact()){setPanel(false);if(keepDetails&&hadDetails)document.body.classList.add('detail-open');}
 }
 function frameNavigation(box,direction,up,title,pointFocus=false){ctx.invalidate();
  const serial=++focusSerial;
  navigationFocus={box:box.clone(),direction:[...direction],up:[...up],title,serial};
  const apply=()=>{if(serial!==focusSerial||!navigationFocus)return;ctx.focusBounds(box,{direction,up,safeCenter:pointFocus});
   if(pointFocus&&paintedSkinVisible()&&selectedPoint?.position&&!surfaceProjector.isVisible(selectedPoint.skinContact||selectedPoint.position,camera.position)){
    const contact=selectedPoint.skinContact||selectedPoint.position,distance=camera.position.distanceTo(selectedPoint.position),d=surfaceProjector.visibleDirection(contact,direction);
    // Safe-area translation can place the camera behind a fold or the other leg.
    // Retry the verified sight line before retaining a hidden selected marker.
    camera.position.copy(contact).addScaledVector(new THREE.Vector3(...d),distance);controls.target.copy(contact);camera.up.set(...(Math.abs(d[1])>.9?[0,0,1]:[0,1,0]));const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;camera.updateMatrixWorld(true);
   }
   $('viewBadge').lastElementChild.textContent=title;};
  apply();requestAnimationFrame(()=>{apply();lastLabelsAt=0;});
 }
 function fitMeridian(requestedDirection=null){if(state.bodySex==='female'&&referenceBody!=='female')return false;
  const active=routeRecords.filter(routeMatches),pts=active.flatMap(r=>[...r.data.map(p=>p.position),...r.guides.flatMap(g=>g.points)]);
  if(state.bodySex!=='female'&&selectedMeridians.has('EX'))for(const p of ctx.ACUPOINTS.filter(p=>p.navigationArea)){pts.push(areaCenter({...p,side:'right'}));if(p.side==='paired')pts.push(areaCenter({...p,side:'left'}));}
  if(!pts.length){toast('所选条目尚无导航范围');return false;}
  const previousDirection=camera.position.clone().sub(controls.target).normalize().toArray(),previousUp=camera.up.toArray();
  studyContext=null;
  if($('localStudyToggle')){$('localStudyToggle').checked=false;$('localStudyToggle').dispatchEvent(new Event('change',{bubbles:true}));}
  prepareNavigation();toggleTCM(true);labelPage=0;
  const ids=[...selectedMeridians];let dir=[0,.05,1];
  if(ids.every(id=>['GV','BL','SI','TE'].includes(id)))dir=[0,.08,-1];
  else if(ids.length===1&&ids[0]==='GB')dir=[tcmSide==='left'?1:-1,.05,.15];
  frameNavigation(new THREE.Box3().setFromPoints(pts).expandByScalar(35),requestedDirection||previousDirection,requestedDirection?(Math.abs(requestedDirection[1])>.9?[0,0,1]:[0,1,0]):previousUp,ids.map(id=>meridianMap[id].short).join('＋')+' · 全段导航');
  updateOverlayVisibility();return true;
 }
 function strictBounds(p){const box=new THREE.Box3();for(let id of p?.landmarks||[]){if(p.side==='left'){const original=BY_ID[id];id=BONES.find(b=>b.side==='left'&&b.baseId===original?.baseId)?.id||id;}const b=bones.get(id);if(b){b.geometry.computeBoundingBox();box.union(b.geometry.boundingBox.clone().translate(b.userData.home));}}return box;}
 function keepSelectedInView(){
  if(!selectedPoint?.position||!enabled||state.bodyTransition)return;
  camera.updateMatrixWorld(true);const safe=fitFractions(viewport),v=selectedPoint.position.clone().project(camera);
  if(v.z < -1||v.z > 1)return;
  const x=(v.x+1)*safe.width/2,y=(1-v.y)*safe.height/2;
  if(x>=safe.left+12&&x<=safe.width-safe.right-12&&y>=safe.top+12&&y<=safe.height-safe.bottom-12)return;
  const centerX=(safe.left+safe.width-safe.right)/2,centerY=(safe.top+safe.height-safe.bottom)/2;
  const forward=controls.target.clone().sub(camera.position).normalize(),depth=selectedPoint.position.clone().sub(camera.position).dot(forward);
  if(depth<=0)return;
  const right=new THREE.Vector3().crossVectors(forward,camera.up).normalize(),up=new THREE.Vector3().crossVectors(right,forward).normalize(),scale=2*depth*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))/safe.height;
  const shift=right.multiplyScalar((x-centerX)*scale).addScaledVector(up,(centerY-y)*scale);
  const damping=controls.enableDamping;controls.enableDamping=false;camera.position.add(shift);controls.target.add(shift);controls.update();controls.enableDamping=damping;camera.updateMatrixWorld(true);lastLabelsAt=0;ctx.invalidate();
 }
 function focusPoint(pos){
  if(!pos)return false;
  const p=selectedPoint?.position===pos?selectedPoint:getVisiblePoints().find(p=>p.position===pos);
  prepareNavigation(true);toggleTCM(true);
  if(precisionMode==='strict'){
   const box=strictBounds(p);
   if(box.isEmpty()){studyContext=null;const map={chest:'thorax',abdomen:'lumbosacral',back:'spine',neck:'cervical',leg:'leg',thigh:'whole',forearm:'upper',pelvis:'pelvis',head:'head',hand:'hand',foot:'foot',upper:'upper'};const region=map[p?.region];if(region)ctx.setRegion(region,true,{keepStudy:true});toast('该坐标未校准：仅查看相关解剖区域，不显示精确点');updateOverlayVisibility();return true;}
   studyContext={code:p.code,name:p.name,side:p.side,center:box.getCenter(new THREE.Vector3()).toArray(),radius:Math.max(75,box.getSize(new THREE.Vector3()).length()/2),areaOnly:true,regionLabel:p.regionLabel};
   const dir=p?.view?[...p.view]:[0,.05,1];if(p.side==='left')dir[0]*=-1;const up=Math.abs(dir[1])>.9?[0,0,1]:[0,1,0];frameNavigation(box.expandByScalar(25),dir,up,p.name+' · 骨性参照范围 / 非精确点');updateOverlayVisibility();return true;
  }
  let dir=p?.view?[...p.view]:[0,.05,1];if(p?.side==='left')dir[0]*=-1;if(paintedSkinVisible()&&surfaceProjector?.visibleDirection)dir=surfaceProjector.visibleDirection(p?.skinContact||pos,dir);
  const up=Math.abs(dir[1])>.9?[0,0,1]:[0,1,0],radius=p?.focusRadius||70;
  frameNavigation(new THREE.Box3(pos.clone().addScalar(-radius),pos.clone().addScalar(radius)),dir,up,(p?.name||'穴位')+' · '+(p?.code||'')+' 部位参照',true);
  updateOverlayVisibility();return true;
 }
 function renderResults(){const q=normalize($('acupointSearch').value.replace(/影像穴?|迎像穴?/g,'迎香').replace(/穴$/,''));const arr=ctx.ACUPOINTS.filter(p=>(q||selectedMeridians.has(p.meridian))&&(!q||normalize([p.code,p.name,p.pinyin,p.meridianName].join(' ')).includes(q)));$('pointResultCount').textContent=`${arr.length} 项`;
 $('acupointResults').innerHTML=arr.map(p=>`<button data-point="${p.code}" class="${selectedPoint?.code===p.code?'active':''}"><b>${p.name}<small>${p.pinyin}</small></b><span>${p.code}<small>${p.navigationArea?'看'+p.navigationArea.label:p.mapped?(p.regionLabel||'部位示意'):'资料条目'}</small></span></button>`).join('')||'<p class="empty-search">没有找到</p>';
 $('acupointResults').querySelectorAll('button').forEach(b=>b.onclick=()=>{const p=ctx.ACUPOINTS.find(p=>p.code===b.dataset.point);if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);toggleTCM(true);const side=PAIR.has(p.meridian)||p.side==='paired'?(tcmSide==='left'?'left':'right'):'midline';selectPoint(pointIndex.get(p.code+'|'+side)||{...p,side,position:null},autoFocus);});}
 function nearestBones(pos){return [...bones].map(([id,b])=>{const bb=b.geometry.boundingBox.clone().translate(b.userData.home);return {id,d:bb.distanceToPoint(pos)};}).sort((a,b)=>a.d-b.d).slice(0,3);}
 function clearSelectedMarker(){if(selectedMarker){routeRoot.remove(selectedMarker);selectedMarker.traverse(n=>{n.geometry?.dispose();n.material?.dispose();});selectedMarker=null;}areaTag.hidden=true;lastLabelRebuild='';}
 function selectPoint(p,focus=false,{restoring=false}={}){if(!p?.name||!p?.code)return false;const keepDetails=document.body.classList.contains('detail-open');ctx.invalidate();p=canonicalPoint(p);if(state.bodySex==='female'){if(!restoring)window.__ATLAS_FEMALE__?.clearSelection();if(referenceBody!=='female'){window.__ATLAS_FEMALE__?.ensureMeridianSurface().then(()=>selectPoint(pointIndex.get(p.code+'|'+p.side)||p,focus)).catch(e=>toast(e.message));return true;}p={...p,landmarks:[]};if(!restoring)toggleTCM(true);}document.body.classList.add('reference-detail');
 if(p.navigationArea?.fixedSide)p={...p,side:p.navigationArea.fixedSide};
  if(!restoring&&(p.position||p.navigationArea)){if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);if(tcmSide!=='both'&&p.side!=='midline'&&p.side!==tcmSide)setTCMSide(p.side);toggleTCM(true);}
  if(!restoring&&p.side!=='midline'){const physical=state.bodySex==='female'?window.__ATLAS_FEMALE__?.getState().side:state.side;if(physical&&physical!=='both'&&physical!==p.side){if(state.bodySex==='female')window.__ATLAS_FEMALE__.setSide(p.side);else window.__FOOT_ATLAS__.restoreBoneState({side:p.side,isolated:false,neighbors:false});}}selectedPoint=p;if(!restoring){pointsOn=true;$('acupointToggle').classList.add('active');$('acupointToggle').setAttribute('aria-pressed','true');}labelPage=0;clearSelectedMarker();setStudyContext(p);
 if(p.position){selectedMarker=new THREE.Points(new THREE.BufferGeometry().setFromPoints([p.position]),makePointMaterial('#d37022',20));selectedMarker.material.depthTest=!xray;selectedMarker.renderOrder=60;routeRoot.add(selectedMarker);selectedMarker.visible=enabled&&!suspended&&pointsOn&&precisionMode==='illustrative';}
 if(!p.position&&p.navigationArea){
  const a=p.navigationArea,ring=new THREE.Mesh(new THREE.RingGeometry(a.ring*.83,a.ring,80),new THREE.MeshBasicMaterial({color:'#bb791d',transparent:true,opacity:.82,side:THREE.DoubleSide,depthTest:false,depthWrite:false,toneMapped:false}));
  ring.position.copy(areaCenter(p));ring.quaternion.copy(camera.quaternion);ring.renderOrder=60;ring.userData.studyArea=true;selectedMarker=ring;routeRoot.add(ring);areaTag.textContent=p.name+' · '+a.label+'观察范围';
 }
 const m=meridianMap[p.meridian];cardOpen=true;card.hidden=false;document.body.classList.remove('tissue-detail-active');if($('tissueDetail'))$('tissueDetail').hidden=true;
 card.innerHTML=pointCardV9(p,m,BY_ID);card.querySelector('.tcm-card-actions').insertAdjacentHTML('afterend',registrationCard(p));if(p.position){const info=document.createElement('details');info.className='point-projection-info';const source=p.sourcePosition||p.position;const shift=p.position.distanceTo(source);info.innerHTML='<summary>当前图形位置的依据</summary><p>名称与文字说明、原始部位参照、贴面显示是不同的数据。此点仍是未完成体表定位审核的部位参照，不用于准确取穴。</p><p>'+ (surfaceAttached?'本次显示投影相对原部位参照偏移约 '+shift.toFixed(1)+' 个模型单位；不是患者毫米，也不是临床误差。':'当前使用原部位参照，未做体表校准。')+'</p>';card.append(info);}if(state.bodySex==='female'){const hint=document.createElement('p');hint.className='shared-coverage';hint.textContent=FEMALE_FINGER_LANDMARKS[p.code]?'女性手部按本模型的'+FEMALE_FINGER_LANDMARKS[p.code].digit+'表面作对应修正；甲角、关节与骨度分寸仍待逐穴复核。':'统一身材比例的女性教学显示；该点仍需女性局部标志复核。';card.querySelector('.tcm-card-actions').after(hint);}
 window.dispatchEvent(new CustomEvent('atlas:v9-point-click',{detail:{code:p.code,side:p.side}}));
 $('closePointCard').onclick=()=>{card.hidden=true;cardOpen=false;document.body.classList.remove('detail-open','point-detail-active');};$('focusPointBtn').onclick=()=>focusReference(p);$('speakPointBtn').onclick=()=>speak(p.name);$('pointPrev').onclick=()=>stepPoint(-1);$('pointNext').onclick=()=>stepPoint(1);card.querySelectorAll('[data-near]').forEach(b=>b.onclick=()=>{let id=b.dataset.near;if(p.side==='left'){const orig=BY_ID[id];id=BONES.find(b=>b.baseId===orig.baseId&&b.side==='left')?.id||id;}selectBone(id,true,true);});renderResults();updateStatus();lastLabelRebuild='';
 if(focus&&(p.position||p.navigationArea)){focusReference(p);}if(focus&&!p.position&&!p.navigationArea){document.body.classList.remove('nav-open');document.body.classList.add('detail-open');}mountLayerContext();if(compact()){setPanel(false);document.body.classList.remove('nav-open');document.body.classList.toggle('detail-open',keepDetails||(!p.position&&!p.navigationArea));}window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'point',id:p.code,name:p.name,side:p.side}}));updateOverlayVisibility();if(!restoring&&autoSpeak()&&!state.bodyTransition)speak(p.name);return true;
 }

 function areaCenter(p){const a=p.navigationArea,v=new THREE.Vector3(...a.center);if(p.side==='left'&&!a.fixedSide)v.x=2*99.55318155698478-v.x;return referenceBody==='female'&&surfaceProjector?surfaceProjector.mapSource(v,{side:p.side,region:'head'}):v;}
 function setStudyContext(p){if(state.bodySex==='female'&&referenceBody!=='female'){studyContext=null;return;}
  if(precisionMode==='strict'&&p.position){const box=strictBounds(p);studyContext=box.isEmpty()?null:{code:p.code,name:p.name,side:p.side,center:box.getCenter(new THREE.Vector3()).toArray(),radius:Math.max(75,box.getSize(new THREE.Vector3()).length()/2),areaOnly:true,regionLabel:p.regionLabel};return;}
  const a=p.navigationArea,pos=p.position||a&&areaCenter(p);
  studyContext=pos?{code:p.code,name:p.name,side:p.side,center:pos.toArray(),radius:a?.radius||p.focusRadius||70,regionLabel:a?.label||p.regionLabel||p.region,areaOnly:!p.position}:null;
 }
 function focusReference(p){if(state.bodySex==='female'&&referenceBody!=='female')return false;
  if(p.position)return focusPoint(p.position);if(!p.navigationArea)return false;
  prepareNavigation();setStudyContext(p);toggleTCM(true);const a=p.navigationArea,pos=areaCenter(p),dir=[...a.view];if(p.side==='left'&&!a.fixedSide)dir[0]*=-1;
  const up=Math.abs(dir[1])>.9?[0,0,1]:[0,1,0];
  frameNavigation(new THREE.Box3(pos.clone().addScalar(-a.radius),pos.clone().addScalar(a.radius)),dir,up,p.name+' · '+a.label+'观察范围');
  updateOverlayVisibility();return true;
 }
 function mountLayerContext(){
  const box=document.createElement('section');box.id='pointLayerContext';box.className='point-layer-context';
  box.innerHTML='<h4>同一位置看结构</h4><p>保留当前名称与视角，仅切换显示重点；范围外的点线暂时收起，看全线可恢复。经络与神经是不同图层，不代表一一对应或神经支配关系。</p><div class="profile-grid"><button data-study-profile="bones">骨骼</button><button data-study-profile="muscles">肌肉</button><button data-study-profile="nerves">神经</button><button data-study-profile="compare">分层对照</button></div><small id="studyLayerStatus"></small>';
  card.append(box);
  if(state.bodySex==='female'){box.querySelector('h4').textContent='在当前视角看结构';box.querySelector('p').textContent='保留当前女性体表参照位置，仅切换显示层；不是神经支配关系或取穴定位。';}for(const b of box.querySelectorAll('[data-study-profile]'))b.onclick=async()=>{await window.__ATLAS_SHARED__?.choose(b.dataset.studyProfile,true,{keepSection:true});refreshLayerContext();};
  refreshLayerContext();
 }
 function refreshLayerContext(){
  const profile=window.__ATLAS_SHARED__?.getState().scene||window.__ATLAS_TISSUES__?.getState().profile||'bones';
  card.querySelectorAll('[data-study-profile]').forEach(b=>b.classList.toggle('active',b.dataset.studyProfile===profile));
  if($('studyLayerStatus'))$('studyLayerStatus').textContent='当前观察：'+(selectedPoint?.name||'未选穴名')+' · '+({bones:'骨骼结构',muscles:'肌肉外形',nerves:'神经走行',compare:'分层对照',custom:'自选图层',surface:'体表经络',skin:'纯体表',organs:'胸腹内脏',pelvis:'盆腔结构',breast:'乳腺结构',chest:'胸腔器官',heart:'心脏特写',abdomen:'腹部器官',vascular:'心血管'}[profile]||profile);
 }
 window.addEventListener('atlas:profile-changed',refreshLayerContext);
 window.addEventListener('atlas:bone-selected',e=>{if(e.detail?.user)studyContext=null;});
 

 function stepPoint(d){if(!selectedPoint)return;const a=ctx.ACUPOINTS.filter(p=>p.meridian===selectedPoint.meridian),i=a.findIndex(p=>p.code===selectedPoint.code),next=a[(i+d+a.length)%a.length];selectPoint(pointIndex.get(next.code+'|'+selectedPoint.side)||{...next,side:selectedPoint.side,position:null},autoFocus);}
 function project(p){const v=(paintedSkinVisible()&&p.skinContact?p.skinContact:p.position).clone().project(camera),r=viewport.getBoundingClientRect();return {x:r.left+(v.x*.5+.5)*r.width,y:r.top+(-v.y*.5+.5)*r.height,z:v.z};}
 let frameOccluders=null;
 function pointUnoccluded(p){
  if(xray)return true;if(paintedSkinVisible()&&surfaceProjector)return surfaceProjector.isVisible(p.skinContact||p.position,camera.position);
  if(!frameOccluders){frameOccluders=[];scene.traverse(n=>{if(!n.isMesh||!n.visible||(!n.userData.atlas&&!n.userData.female&&!bones.has(n.name)))return;for(let q=n.parent;q;q=q.parent)if(!q.visible)return;const ms=Array.isArray(n.material)?n.material:[n.material];if(ms.some(m=>m.visible!==false&&m.colorWrite!==false&&m.depthTest!==false&&m.depthWrite!==false&&m.opacity>.02))frameOccluders.push(n);});}const candidates=frameOccluders;
  if(!candidates.length)return true;const delta=p.position.clone().sub(camera.position),distance=delta.length();const ray=new THREE.Raycaster(camera.position,delta.normalize(),0,Math.max(0,distance-.25));return !ray.intersectObjects(candidates,false).some(hit=>{const source=hit.object.material,m=Array.isArray(source)?source[hit.face?.materialIndex||0]:source;if(!m||m.visible===false||m.colorWrite===false||m.depthTest===false||m.depthWrite===false)return false;const planes=m.clippingPlanes||[];return !(planes.length&&(m.clipIntersection?planes.every(pl=>pl.distanceToPoint(hit.point)<0):planes.some(pl=>pl.distanceToPoint(hit.point)<0)));});
 }
 function hitPoint(e){if(state.bodyTransition||surfaceBusy||referenceBody!==(state.bodySex||'male'))return null;camera.updateMatrixWorld(true);frameOccluders=null;if(!enabled||suspended||!pointsOn)return null;let best=null,bestD=e.pointerType==='touch'?23:14;for(const p of getVisiblePoints()){const v=project(p);if(v.z< -1||v.z>1)continue;const d=Math.hypot(e.clientX-v.x,e.clientY-v.y);if(d<bestD&&pointUnoccluded(p)){bestD=d;best=p;}}return best;}
 function hitRoute(e){
  if(state.bodyTransition||surfaceBusy||referenceBody!==(state.bodySex||'male')||!enabled||suspended||!guideOn||!linesOn||precisionMode!=='illustrative')return null;let best=null,bestDistance=e.pointerType==='touch'?14:8;
  for(const r of routeRecords.filter(routeMatches))for(const g of r.guides)for(let i=1;i<g.points.length;i++){
   if(g.connections&&!g.connections[i])continue;const a=project({position:g.points[i-1]}),b=project({position:g.points[i]});if(a.z< -1||a.z>1||b.z< -1||b.z>1)continue;
   const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((e.clientX-a.x)*dx+(e.clientY-a.y)*dy)/(dx*dx+dy*dy||1)));
   const world=g.points[i-1].clone().lerp(g.points[i],t),box=referenceWindow();if(box&&!box.containsPoint(world))continue;const d=Math.hypot(e.clientX-a.x-t*dx,e.clientY-a.y-t*dy);if(d<bestDistance&&pointUnoccluded({position:world})){bestDistance=d;best=r;}
  }return best;
 }
 function handlePointerClick(e){if(state.mode!=='orbit'||e.button!==0)return false;const p=hitPoint(e);if(p)return selectPoint(p,autoFocus);const r=hitRoute(e);if(!r)return false;clearStudyContext(true);toast(meridianMap[r.meridian].name+' · 对照选择与视角保持');window.dispatchEvent(new CustomEvent('atlas:v9-channel-click',{detail:{ids:[r.meridian]}}));return true;}

 viewport.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch'||performance.now()-lastHover<70){hover.hidden=true;return;}lastHover=performance.now();const p=hitPoint(e);hoveredPoint=p;if(!p){hover.hidden=true;return;}const r=viewport.getBoundingClientRect();hover.textContent=`${p.name} · ${p.pinyin} · ${p.code}`;hover.style.left=Math.min(e.clientX-r.left+15,r.width-210)+'px';hover.style.top=Math.max(8,e.clientY-r.top-38)+'px';hover.hidden=false;$('hoverTip').hidden=true;},{passive:true});
 viewport.addEventListener('pointerleave',()=>hover.hidden=true);
 function updateFrame(){frameOccluders=null;
  const needsSkinDepth=surfaceProjector?.syncOcclusion?.();
  if(surfaceProjector?.occlusionRoot)surfaceProjector.occlusionRoot.visible=paintedSkinVisible()&&!xray&&!!needsSkinDepth;
  const skinNow=paintedSkinVisible()+'|'+(state.bodySex||'male')+'|'+(state.bodySex==='female'?window.__ATLAS_FEMALE__?.getState().side:state.side);if(lastSkinPaintVisible!==skinNow){lastSkinPaintVisible=skinNow;updateOverlayVisibility();lastLabelsAt=0;}
  syncReferenceWindow();
  const w=viewport.clientWidth,h=viewport.clientHeight,dpr=renderer.getPixelRatio(),sz=`${w},${h},${dpr}`;
  if(sz!==lastSize){lastSize=sz;for(const r of routeRecords){r.line.material.resolution.set(w,h);r.outline.material.resolution.set(w,h);r.cloud.material.uniforms.pixelRatio.value=dpr;for(const g of r.guides){g.guide.material.resolution.set(w,h);g.border.material.resolution.set(w,h);}}if(selectedMarker)selectedMarker.material.uniforms?.pixelRatio&&(selectedMarker.material.uniforms.pixelRatio.value=dpr);}
  const displaced=state.explode>0||[...bones.values()].some(b=>b.userData.offset.lengthSq()>.1);document.body.classList.toggle('anatomy-displaced',displaced&&enabled);
  if(selectedMarker?.userData.studyArea){selectedMarker.quaternion.copy(camera.quaternion);selectedMarker.visible=enabled&&!suspended&&pointsOn&&precisionMode==='illustrative';const p=project({position:selectedMarker.position}),r=viewport.getBoundingClientRect();areaTag.hidden=!(precisionMode==='illustrative'&&enabled&&!suspended&&p.z>-1&&p.z<1&&p.x>=r.left&&p.x<=r.right&&p.y>=r.top&&p.y<=r.bottom);areaTag.style.left=Math.max(5,Math.min(w-205,p.x-r.left+14))+'px';areaTag.style.top=Math.max(8,p.y-r.top+22)+'px';}
  updatePointLabels();
 }
 let labelOffsets=new Map(),labelPlacementAudit=[],labelRefreshTimer=0,labelFingerprint='';let labelSceneRevision=0;const labelWork={computed:0,skipped:0};for(const ev of ['atlas:selection','atlas:transition-settled','atlas:tcm-visibility','atlas:region-changed'])window.addEventListener(ev,()=>{labelSceneRevision++;});for(const ev of ['input','change','pointerup'])document.addEventListener(ev,()=>{labelSceneRevision++;},{capture:true,passive:true});
 function updatePointLabels(){
  const now=performance.now();if(now-lastLabelsAt<40){if(!labelRefreshTimer)labelRefreshTimer=setTimeout(()=>{labelRefreshTimer=0;ctx.invalidate();},41-(now-lastLabelsAt));return;}clearTimeout(labelRefreshTimer);labelRefreshTimer=0;lastLabelsAt=now;
  const ready=enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')&&pointsOn&&namesOn&&precisionMode==='illustrative';
  labelNav.hidden=!ready;labels.hidden=!ready;
  if(!ready){wires.innerHTML='';labelPlacementAudit=[];labelFingerprint='';return;}
  const rect=viewport.getBoundingClientRect(),w=rect.width,h=rect.height,phone=w<540;
  const obstacles=[];
  for(const selector of ['.stage-heading','.view-switcher','.stage-tools','.detail-panel','.study-toolbar','#tcmStatus','.view-badge','.view-controls','.control-dock','#selectionChip','#acupointLabelNav','#v26PointSummary','#directoryPreview']){
   for(const node of document.querySelectorAll(selector)){
    const style=getComputedStyle(node),r=node.getBoundingClientRect();
    if(node.hidden||style.display==='none'||style.visibility==='hidden'||!r.width||!r.height)continue;
    const x=Math.max(0,r.left-rect.left),y=Math.max(0,r.top-rect.top),right=Math.min(w,r.right-rect.left),bottom=Math.min(h,r.bottom-rect.top);
    if(right>x&&bottom>y)obstacles.push({x,y,w:right-x,h:bottom-y});
   }
  }
  const fingerprint=[labelSceneRevision,lastSkinPaintVisible,camera.matrixWorld.elements.join(','),camera.projectionMatrix.elements.join(','),w,h,labelMode,labelPage,selectedPoint?.code,selectedPoint?.side,[...selectedMeridians].join(','),tcmSide,state.side,referenceBody,studyContext?.code,JSON.stringify(studyContext),$('localStudyToggle')?.checked,xray,JSON.stringify(obstacles)].join('|');
  if(paintedSkinVisible()&&labelFingerprint===fingerprint&&lastLabelRebuild){labelWork.skipped++;return;}labelFingerprint=fingerprint;labelWork.computed++;
  const all=getVisiblePoints(),inView=v=>v.z>-1&&v.z<1&&v.x>=rect.left&&v.x<=rect.right&&v.y>=rect.top&&v.y<=rect.bottom;
  // Nearby names follow the actual 3D neighbourhood when a point is close.
  // Perspective can put distant abdomen/shoulder anchors over a sole/head.
  const radius=selectedPoint?.focusRadius||70,distance=camera.position.distanceTo(controls.target);
  const nearPoint=labelMode==='smart'&&selectedPoint?.position&&distance<radius*16&&controls.target.distanceTo(selectedPoint.position)<radius*2.5;
  const nameRadius=Math.max(radius*2.5,Math.min(radius*4,distance*.3));
  const localNames=nearPoint?all.filter(p=>p.position.distanceTo(selectedPoint.position)<=nameRadius):all;
  let candidates=localNames.map(p=>({p,v:project(p)})).filter(x=>inView(x.v)&&pointUnoccluded(x.p));
  candidates.sort((a,b)=>a.v.y-b.v.y||a.v.x-b.v.x||a.p.ordinal-b.p.ordinal);
  const pin=candidates.find(x=>x.p.code===selectedPoint?.code&&x.p.side===selectedPoint?.side),pool=candidates.filter(x=>x!==pin);
  const item=x=>({key:x.p.code+'|'+x.p.side,p:x.p,x:x.v.x-rect.left,y:x.v.y-rect.top,w:phone?(x===pin?Math.min(126,Math.max(96,18+(x.p.name.length*2+x.p.code.length+4)*6)):126):140,h:phone?32:28,priority:x===pin});
  const anchorObstacles=candidates.map(x=>({x:x.v.x-rect.left,y:x.v.y-rect.top}));
  const availableSlots=labelSlots({width:w,height:h,obstacles,anchors:anchorObstacles,labelWidth:phone?126:140,labelHeight:phone?32:28});
  const capacity=availableSlots.length,slots=Math.max(1,capacity-(pin?1:0)),pages=Math.max(1,Math.ceil(pool.length/slots));
  labelPage=Math.max(0,Math.min(labelPage,pages-1));let placements;
  if(labelMode==='complete'){
   const items=[...(pin?[pin]:[]),...pool.slice(labelPage*slots,(labelPage+1)*slots)].slice(0,capacity);
   placements=placeCompleteLabels(items.map(item),availableSlots);
  }else{
   let ordered=[];
   if(pin){ordered=[pin,...pool.sort((a,b)=>Math.hypot(a.v.x-pin.v.x,a.v.y-pin.v.y)-Math.hypot(b.v.x-pin.v.x,b.v.y-pin.v.y))];}
   else{
    const remaining=[...pool],seeds=[];
    while(remaining.length){let best=0,score=-Infinity;
     for(let i=0;i<remaining.length;i++){const v=remaining[i].v,s=seeds.length?Math.min(...seeds.map(q=>Math.hypot((v.x-q.x)/w,(v.y-q.y)/h))):-Math.hypot((v.x-rect.left-w/2)/w,(v.y-rect.top-h*.48)/h);if(s>score){score=s;best=i;}}
     const x=remaining.splice(best,1)[0];ordered.push(x);seeds.push(x.v);
     if(seeds.length>=32){ordered.push(...remaining);break;}
    }
   }
   placements=placeLabels(ordered.map(item),{width:w,height:h,obstacles,anchors:anchorObstacles,limit:phone?(pin?4:6):(pin?6:10),previous:labelOffsets});
   labelOffsets=new Map(placements.map(a=>[a.key,{dx:a.x-a.tx,dy:a.y-a.ty}]));
  }
  const currentKey=selectedPoint?.code+'|'+selectedPoint?.side,key=placements.map(a=>a.key).join(',')+':'+currentKey+':'+labelMode;
  if(key!==lastLabelRebuild){lastLabelRebuild=key;for(const x of labelNodes)x.el.remove();labelNodes.length=0;
   for(const x of placements){const el=document.createElement('button');el.type='button';el.className='acu-name v6-label'+(x.key===currentKey?' selected':'');el.textContent=x.p.name+' '+x.p.code+(x.p.side==='midline'?'':x.p.side==='right'?' · 右':' · 左');el.setAttribute('aria-label',x.p.name+' '+x.p.code+' · '+(x.p.side==='midline'?'人体中线':x.p.side==='right'?'人体右侧':'人体左侧'));el.title=x.p.name+' · '+x.p.pinyin+' · 点击查看';el.dataset.labelPoint=x.p.code;el.dataset.labelSide=x.p.side;el.addEventListener('pointerdown',e=>e.stopPropagation());el.onclick=e=>{e.stopPropagation();selectPoint(x.p,autoFocus);};labels.append(el);labelNodes.push({p:x.p,el});}
  }
  wires.setAttribute('viewBox',`0 0 ${w} ${h}`);let paths='';
  placements.forEach((a,i)=>{const el=labelNodes[i].el;el.hidden=false;el.style.width=a.w+'px';el.style.height=a.h+'px';el.style.transform=`translate(${a.x}px,${a.y}px)`;
   paths+=`<path data-point="${a.p.code}" data-side="${a.p.side}" d="M${a.sx.toFixed(2)},${a.sy.toFixed(2)} L${a.tx.toFixed(2)},${a.ty.toFixed(2)}" class="${a.key===currentKey?'active':''}"/>`;
  });
  wires.innerHTML=paths;labelPlacementAudit=placements.map(a=>({code:a.p.code,side:a.p.side,anchor:[a.tx,a.ty],box:[a.x,a.y,a.w,a.h],leaderStart:[a.sx,a.sy]}));
  // In a dense small view the existing selected-point summary is the label.
  // Connect it to the unchanged skin anchor instead of covering other points.
  if(pin&&!placements.some(a=>a.key===currentKey)){
   const summary=document.getElementById('v26PointSummary'),sr=summary?.getBoundingClientRect();
   if(sr?.width&&getComputedStyle(summary).display!=='none'&&getComputedStyle(summary).visibility!=='hidden'){
    const tx=pin.v.x-rect.left,ty=pin.v.y-rect.top,sx=Math.max(sr.left-rect.left+8,Math.min(sr.right-rect.left-8,tx)),sy=sr.top-rect.top;
    wires.innerHTML+=`<path data-point="${pin.p.code}" data-side="${pin.p.side}" d="M${sx.toFixed(2)},${sy.toFixed(2)} L${tx.toFixed(2)},${ty.toFixed(2)}" class="active"/>`;
    labelPlacementAudit.push({code:pin.p.code,side:pin.p.side,anchor:[tx,ty],box:[sr.left-rect.left,sr.top-rect.top,sr.width,sr.height],leaderStart:[sx,sy],docked:true});
   }
  }

  labelStats={total:all.length,inView:candidates.length,shown:placements.length,page:labelMode==='complete'?labelPage+1:1,pages:labelMode==='complete'?pages:1,capacity};
  if(selectedPoint?.navigationArea&&!candidates.length)labelNav.hidden=true;
  $('labelPageInfo').textContent=labelMode==='complete'?`${placements.length}/${candidates.length} 视野内 · ${labelPage+1}/${pages}页`:`${placements.length}个附近穴名${labelPlacementAudit.some(a=>a.docked)?' · 选中穴见摘要':' · 点击查看'}`;
  $('labelPrevious').disabled=labelMode!=='complete'||!capacity||!labelPage;$('labelNext').disabled=labelMode!=='complete'||!capacity||labelPage>=pages-1;if(labelMode==='complete'&&!capacity)$('labelPageInfo').textContent='空间不足，请收起面板或调整视角';
 }
 $('meridianQuick').add(new Option('多经脉对照','MULTI'));setMeridians(['HT','SI']);renderResults();updateStatus();
 function clearStudyContext(clearSelection=false){
 studyContext=null;navigationFocus=null;focusSerial++;lastLabelRebuild='';lastLabelsAt=0;
 if(clearSelection){selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();document.body.classList.remove('point-detail-active');if($('v9MeridianCard'))$('v9MeridianCard').hidden=true;}
 updateOverlayVisibility();updateStatus();ctx.invalidate();
 }
 const surfaceBadge=document.createElement('div');surfaceBadge.id='surfaceProjectedBadge';surfaceBadge.hidden=true;surfaceBadge.textContent='体表显示投影 · 原坐标保留 · 未校准';document.querySelector('.stage').append(surfaceBadge);

 for(const r of routeRecords){for(const p of r.data)p.sourcePosition=p.position.clone();for(const g of r.guides){g.sourcePoints=g.sourcePoints||g.points.map(v=>v.clone());g.sourceGeometry=g.tube.geometry;g.bodyCache=new Map();}}
 function setReferenceBody(body,projector=null,attach=true){
  desiredBody=body;if(projector)bodyProjectors.set(body,projector);desiredProjector=bodyProjectors.get(body)||null;surfaceDesired=attach&&!!desiredProjector;return rebuildSurface();
 }
 function setSurfaceAttachment(on){surfaceDesired=!!on;if(desiredBody==='female'&&desiredProjector)surfaceDesired=true;return rebuildSurface();}
 function rebuildSurface(){
  if(surfaceTask)return surfaceTask;
  if(referenceBody===desiredBody&&surfaceAttached===surfaceDesired&&surfaceProjector===desiredProjector)return Promise.resolve(true);
  surfaceBusy=true;updateOverlayVisibility();
  surfaceTask=(async()=>{try{
   while(referenceBody!==desiredBody||surfaceAttached!==surfaceDesired||surfaceProjector!==desiredProjector){
    const target=surfaceDesired,body=desiredBody,projector=desiredProjector,pending=[];
    if(target&&!projector)return false;
    for(const r of routeRecords){
     const anchors=r.data.map(p=>({code:p.code,source:p.sourcePosition,point:target?projector.project(p.sourcePosition,2.4,{meridian:r.meridian,side:r.side,region:p.region,view:p.view,projectionNormal:p.projectionNormal,code:p.code}):p.sourcePosition.clone(),region:p.region,view:p.view,projectionNormal:p.projectionNormal,skin:target?projector.getContact(p.sourcePosition,{meridian:r.meridian,side:r.side,region:p.region,view:p.view,projectionNormal:p.projectionNormal,code:p.code}):null}));
     const guides=r.guides.map(g=>{let value;if(target){if(!g.bodyCache.has(projector.key))g.bodyCache.set(projector.key,projector.curve(g.sourcePoints,{meridian:r.meridian,side:r.side,anchors:anchors.filter(a=>g.codes.includes(a.code)),codes:g.codes}));value=g.bodyCache.get(projector.key);}else value={points:g.sourcePoints,geometry:g.sourceGeometry};return {g,value};});let ink=null;if(target&&projector.createInk){r.inkCache??=new Map();if(!r.inkCache.has(projector.key))r.inkCache.set(projector.key,projector.createInk(guides,anchors,r.color));ink=r.inkCache.get(projector.key);}pending.push({r,anchors,guides,ink});
     await new Promise(resolve=>setTimeout(resolve,0));if(target!==surfaceDesired||body!==desiredBody||projector!==desiredProjector)break;
    }
    if(target!==surfaceDesired||body!==desiredBody||projector!==desiredProjector)continue;
    if(pending.length!==routeRecords.length)throw Error('体表点线尚未完整构建');
    for(const {r,anchors,guides,ink}of pending){if(r.ink)routeRoot.remove(r.ink.mesh);r.ink=ink;if(ink){ink.mesh.userData.referenceBody=body;ink.mesh.userData.projectorKey=projector.key;ink.mesh.userData.meridian=r.meridian;ink.mesh.userData.bodySide=r.side;routeRoot.add(ink.mesh);}r.data.forEach((p,i)=>{p.position.copy(anchors[i].point);const c=ink?.centers[i];p.skinContact=c?.code===p.code?new THREE.Vector3(...c.position):null;});for(const {g,value}of guides){g.tube.geometry=value.geometry;g.points=value.points;g.connections=value.connections||null;g.traceDiagnostics=value.traceDiagnostics||null;const old=g.guide.geometry,geometry=value.segmentPositions?new LineSegmentsGeometry().setPositions(value.segmentPositions):new LineGeometry().setPositions(g.points.flatMap(v=>v.toArray()));g.guide.geometry=geometry;g.border.geometry=geometry;old.dispose();g.guide.computeLineDistances();g.border.computeLineDistances();}}
    if(surfaceProjector?.occlusionRoot)routeRoot.remove(surfaceProjector.occlusionRoot);referenceBody=body;surfaceProjector=projector;surfaceAttached=target;if(target&&projector?.occlusionRoot)routeRoot.add(projector.occlusionRoot);surfaceBadge.hidden=!target;surfaceBadge.textContent=(body==='female'?'女性体表':'体表')+'经穴示意 · 未配准';
    studyContext=null;navigationFocus=null;focusSerial++;lastReferenceWindowKey='';lastLabelRebuild='';lastLabelsAt=0;
    if(selectedPoint?.code){const p=pointIndex.get(selectedPoint.code+'|'+selectedPoint.side);if(p){selectedPoint={...selectedPoint,position:p.position,skinContact:p.skinContact};if(selectedMarker?.isPoints)selectedMarker.geometry.setFromPoints([p.position]);}}
    syncReferenceWindow();updateOverlayVisibility();ctx.invalidate();
   }return true;
  }finally{surfaceBusy=false;surfaceTask=null;updateOverlayVisibility();ctx.invalidate();}})();return surfaceTask;
 }

 let lastSurfaceTransfer=null;
 function captureSurfaceObservation(){
  if(!enabled||!(pointsOn||guideOn&&linesOn)||!selectedPoint?.position||!surfaceAttached)return null;
  const p=selectedPoint,dist=camera.position.distanceTo(controls.target),radius=p.focusRadius||70;
  return {body:referenceBody,code:p.code,side:p.side,position:p.position.toArray(),focused:dist<radius*16&&controls.target.distanceTo(p.position)<radius*2.5,visible:surfaceProjector.isVisible(p.skinContact||p.position,camera.position)};
 }
 function transferSurfaceObservation(old,view){
  lastSurfaceTransfer={applied:false,reason:'whole-view-or-no-point'};
  if(!old?.focused||!view||!enabled||!(pointsOn||guideOn&&linesOn)||!surfaceAttached)return view;
  const p=pointIndex.get(old.code+'|'+old.side);if(!p?.position||selectedPoint?.code!==old.code||selectedPoint?.side!==old.side)return view;
  const cameraPos=new THREE.Vector3(...view.position),target=new THREE.Vector3(...view.target),original=new THREE.Vector3(...old.position),delta=p.position.clone().sub(original),distance=cameraPos.distanceTo(target);
  cameraPos.add(delta);target.add(delta);let changedDirection=false;
  // Visibility is evaluated from the final camera location, including the
  // off-centre point framing, rather than only from a nominal axis.
  if(paintedSkinVisible()&&old.visible&&!surfaceProjector.isVisible(p.skinContact||p.position,cameraPos)){
   const oldDir=new THREE.Vector3(...view.position).sub(new THREE.Vector3(...view.target)).normalize();
   const visible=surfaceProjector.visibleDirection(p.skinContact||p.position,oldDir.toArray()),nextDir=new THREE.Vector3(...visible).normalize();
   const turn=new THREE.Quaternion().setFromUnitVectors(oldDir,nextDir),offset=target.clone().sub(p.position).applyQuaternion(turn);
   const nextTarget=p.position.clone().add(offset),nextCamera=nextTarget.clone().addScaledVector(nextDir,distance);
   if(surfaceProjector.isVisible(p.skinContact||p.position,nextCamera)){target.copy(nextTarget);cameraPos.copy(nextCamera);changedDirection=nextDir.distanceTo(oldDir)>1e-6;}
   else {target.copy(p.position);cameraPos.copy(p.position).addScaledVector(nextDir,distance);changedDirection=true;}
  }
  lastSurfaceTransfer={applied:true,body:referenceBody,code:old.code,side:old.side,delta:delta.toArray(),distance,changedDirection,visible:surfaceProjector.isVisible(p.skinContact||p.position,cameraPos)};
  return {...view,position:cameraPos.toArray(),target:target.toArray(),up:changedDirection?(Math.abs(cameraPos.clone().sub(target).normalize().y)>.95?[0,0,1]:[0,1,0]):view.up};
 }
 function getSurfaceConsistencyAudit(){
  scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
  const effective=o=>{for(let n=o;n;n=n.parent)if(!n.visible)return false;return true;};
  const points=routeRecords.flatMap(r=>r.data.map(p=>({code:p.code,side:p.side,position:p.position.toArray(),sourcePosition:p.sourcePosition.toArray(),skinContact:p.skinContact?.toArray()||null,visibleFromCamera:!!surfaceProjector?.isVisible(p.skinContact||p.position,camera.position)})));
  const ink=routeRecords.filter(routeMatches).map(r=>({meridian:r.meridian,side:r.side,body:r.ink?.mesh.userData.referenceBody||referenceBody,projectorKey:r.ink?.mesh.userData.projectorKey||null,visible:!!r.ink&&effective(r.ink.mesh),lines:!!r.ink&&r.ink.mesh.material.uniforms.linesOn.value>0,points:!!r.ink&&r.ink.mesh.material.uniforms.pointsOn.value>0,selected:!!r.ink&&effective(r.ink.mesh)&&r.ink.mesh.material.uniforms.selectedOn?.value>0,cloud:effective(r.cloud),centers:r.ink?.centers}));
  return {body:state.bodySex||'male',referenceBody,desiredBody,surfaceAttached,surfaceBusy,transition:!!state.bodyTransition,routeRootVisible:effective(routeRoot),skinVisible:paintedSkinVisible(),points,ink,selected:selectedPoint?.position?{code:selectedPoint.code,side:selectedPoint.side,position:selectedPoint.position.toArray(),visibleFromCamera:pointUnoccluded(selectedPoint),skinContact:selectedPoint.skinContact?.toArray()||null,markerVisible:(!!selectedMarker&&effective(selectedMarker)||ink.some(i=>i.selected))&&pointUnoccluded(selectedPoint),spriteVisible:!!selectedMarker&&effective(selectedMarker),paintedSelection:ink.some(i=>i.selected),markerPosition:ink.some(i=>i.selected)?selectedPoint.skinContact.toArray():selectedMarker?.geometry?.attributes.position?Array.from(selectedMarker.geometry.attributes.position.array).slice(0,3):null}:null,localWindow:referenceWindow()&&[referenceWindow().min.toArray(),referenceWindow().max.toArray()],transfer:lastSurfaceTransfer,visibilityProbe:selectedPoint?.skinContact&&surfaceProjector?.visibilityProbe(selectedPoint.skinContact),clinicalCalibration:false};
 }

 window.__ATLAS_LEARNING__={getSelectedVisibility:()=>selectedPoint?pointUnoccluded(selectedPoint):null,keepSelectedInView,captureSurfaceObservation,transferSurfaceObservation,getSurfaceConsistencyAudit,getInkAudit:()=>({active:paintedSkinVisible(),body:referenceBody,depthTest:routeRecords.every(r=>!r.ink||r.ink.mesh.material.depthTest),routes:routeRecords.filter(routeMatches).map(r=>({meridian:r.meridian,side:r.side,visible:!!r.ink?.mesh.visible,...r.ink?.stats,centers:r.ink?.centers}))}),getRegistration,registrationSummary,cancelPendingFocus:()=>{focusSerial++;navigationFocus=null;},setReferenceBody,setSurfaceProjector:p=>{bodyProjectors.set(p.sex||'male',p);desiredProjector=p;},setSurfaceAttachment,getSurfaceAudit:()=>routeRecords.filter(routeMatches).flatMap(r=>r.guides.flatMap(g=>g.points.filter((v,i)=>i%Math.max(1,Math.floor(g.points.length/30))===0).map(position=>({screen:project({position}),visible:surfaceProjector?.isVisible(position,camera.position)})))),getDisplayAudit:()=>{
 const rows=[];for(const r of routeRecords)for(const p of r.data){const expected=surfaceAttached?surfaceProjector.project(p.sourcePosition||p.position,2.2,{meridian:r.meridian,side:r.side,region:p.region,view:p.view,projectionNormal:p.projectionNormal,code:p.code}):(p.sourcePosition||p.position);let gap=Infinity;for(const g of r.guides)for(let i=1;i<g.points.length;i++){if(g.connections&&!g.connections[i])continue;const a=g.points[i-1],b=g.points[i];gap=Math.min(gap,a.distanceToSquared(b)<1e-12?p.position.distanceTo(a):new THREE.Line3(a,b).closestPointToPoint(p.position,true,new THREE.Vector3()).distanceTo(p.position));}rows.push({code:p.code,name:p.name,side:p.side,sourcePosition:(p.sourcePosition||p.position).toArray(),displayDisplacement:p.position.distanceTo(p.sourcePosition||p.position),position:p.position.toArray(),expected:expected.toArray(),secondaryShift:p.position.distanceTo(expected),lineGap:gap,registrationStatus:p.registration?.status,skinDistance:surfaceAttached?surfaceProjector.auditPoint(p.position).distance:null});}
 const collisions=[];for(let i=0;i<rows.length;i++)for(let j=0;j<i;j++)if(rows[i].side===rows[j].side&&rows[i].position.every((v,k)=>Math.abs(v-rows[j].position[k])<1e-6))collisions.push([rows[j].code,rows[i].code,rows[i].side]);
 return {surfaceTrace:routeRecords.flatMap(r=>r.guides.map(g=>({meridian:r.meridian,side:r.side,...g.traceDiagnostics}))),source:'display consistency only; not anatomical calibration',count:rows.length,attached:surfaceAttached,geometryFinite:routeRecords.every(r=>r.guides.every(g=>g.points.every(p=>p.toArray().every(Number.isFinite))&&g.tube.geometry.attributes.position.array.every(Number.isFinite)&&g.tube.geometry.attributes.normal.array.every(Number.isFinite))),collisions,maxSecondaryShift:Math.max(...rows.map(p=>p.secondaryShift)),maxLineGap:Math.max(...rows.map(p=>p.lineGap)),points:rows};},getSurfaceState:()=>({referenceBody,desiredBody,projectionDiagnostics:surfaceProjector?.stats()||null,attached:surfaceAttached,desired:surfaceDesired,busy:surfaceBusy,originalRecordsPreserved:true,navigationRevision:18,clinicalCalibration:false}),clearStudyContext,focusSelectedPoint:()=>selectedPoint?focusReference(selectedPoint):false,flushLabels:()=>{lastLabelsAt=0;updatePointLabels();},setLabelMode:mode=>{labelMode=mode==='complete'?'complete':'smart';$('labelModeToggle').textContent=labelMode==='complete'?'完整穴名':'附近穴名';lastLabelRebuild='';ctx.invalidate();},clearPointSelection:()=>{selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();clearStudyContext(false);updateStatus();},setPrecisionMode:mode=>{precisionMode='illustrative';if(selectedPoint)setStudyContext(selectedPoint);updateOverlayVisibility();lastLabelsAt=0;lastLabelRebuild='';window.dispatchEvent(new CustomEvent('atlas:precision-changed'));ctx.invalidate();},getReferenceWindowState:()=>{const b=referenceWindow();return {active:!!b,bounds:b&&[b.min.toArray(),b.max.toArray()],visible:getVisiblePoints().map(p=>({code:p.code,side:p.side,position:p.position.toArray()})),drawnPoints:routeRecords.filter(routeMatches).reduce((n,r)=>n+r.cloud.geometry.attributes.position.count,0),clippedRouteMaterials:routeRecords.filter(routeMatches).flatMap(r=>r.guides).filter(g=>g.guide.material.clippingPlanes?.length===6).length};},getStudyContext:()=>studyContext&&{...studyContext,center:[...studyContext.center]},getCurveDiagnostics:()=>routeRecords.flatMap(r=>r.guides.map(g=>({meridian:r.meridian,side:r.side,note:g.note,...g.curveDiagnostics}))),hasNavigationFocus:()=>!!navigationFocus&&enabled,restoreNavigationFocus:()=>{if(navigationFocus){const f=navigationFocus;ctx.focusBounds(f.box,{direction:f.direction,up:f.up});}},setLabelPage:value=>{labelPage=Math.max(0,Number(value)||0);lastLabelsAt=0;},getNavigationCatalog:()=>routeRecords.flatMap(r=>r.data.map(p=>({code:p.code,name:p.name,side:p.side,position:p.position.toArray(),sourcePosition:(p.sourcePosition||p.position).toArray(),originalPosition:p.originalPosition||null,navigationRevision:p.navigationRevision||null,displayProjection:surfaceAttached,region:p.region,view:p.view,projectionNormal:p.projectionNormal}))),getRouteSamples:()=>routeRecords.map(r=>({meridian:r.meridian,side:r.side,branches:r.guides.map(g=>({points:g.points.map(v=>v.toArray()),connections:g.connections,diagnostics:g.traceDiagnostics}))})),getRouteGeometry:()=>routeRecords.map(r=>({meridian:r.meridian,side:r.side,branches:r.guides.map(g=>g.points.map(v=>v.toArray()))})),getRouteScreen:(id,side='right')=>{const r=routeRecords.find(r=>r.meridian===id&&(r.side===side||r.side==='midline'));return r?.guides.flatMap(g=>g.points.map(position=>project({position})))||[];},setMeridians,suspend:value=>{value=!!value;if(suspended!==value){suspended=value;updateOverlayVisibility();}},getReferences:()=>ctx.ACUPOINTS.map(p=>({code:p.code,name:p.name,pinyin:p.pinyin,mapped:p.mapped,region:p.region,hasPosition:!!p.position})),handlePointerClick,hitRoute,hitPoint,toggleTCM,setPanel,setMeridian,setTCMSide,fitMeridian,runPreset,updateFrame,selectPoint:(code,side='right',focus=false)=>selectPoint(pointIndex.get(code+'|'+side)||pointIndex.get(code+'|midline')||{...ctx.ACUPOINTS.find(p=>p.code===code),side,position:null},focus),getPointScreen:(code,side='right')=>{const p=pointIndex.get(code+'|'+side)||pointIndex.get(code+'|midline');return p?.position?project(p):p?.navigationArea?{...project({position:areaCenter(p)}),areaOnly:true}:null;},speakBone:id=>speak(BY_ID[id]?.name),getObservationState:()=>({skinVisible:paintedSkinVisible(),xray,active:enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')}),getLabelPerformance:()=>({...labelWork}),getLabelPlacementAudit:()=>labelPlacementAudit,getState:()=>({localStudyOnly:!!$('localStudyToggle')?.checked,labelPage,registration:registrationSummary(),referenceBody,surfaceBusy,surfaceAttached,labelMode,precisionMode,coordinateVerified:0,curveStyle,surfaceTrace:routeRecords.flatMap(r=>r.guides.map(g=>({meridian:r.meridian,side:r.side,...g.traceDiagnostics}))),headAreaVisible:!!selectedMarker?.userData.studyArea&&selectedMarker.visible,studyContext,labelStats,autoFocus,navigationFocus:navigationFocus&&{title:navigationFocus.title,serial:navigationFocus.serial,center:navigationFocus.box.getCenter(new THREE.Vector3()).toArray()},guideOn,routeDiagnostics:routeRecords.filter(routeMatches).map(r=>({meridian:r.meridian,side:r.side,markerRenderOrder:r.cloud.renderOrder,guideRenderOrder:Math.max(0,...r.guides.map(g=>g.guide.renderOrder)),referencePoints:r.data.length,connected:r.hasSegments,guideCount:r.guides.length,guideVertices:r.guides.reduce((n,g)=>n+g.points.length,0),visible:precisionMode==='illustrative'&&enabled&&!suspended&&(r.line.visible||r.guides.some(g=>g.guide.visible||g.tube.visible||r.ink?.mesh.visible))})),version:'38.0.0',termSource:'catalog-v10',selectedMeridians:[...selectedMeridians],suspended,legacyEqualSpacingRemoved:true,clinicalCalibration:false,enabled,panelOpen,linesOn,pointsOn,namesOn,xray,tcmSide,activeMeridian,selectedPoint:selectedPoint&&{code:selectedPoint.code,name:selectedPoint.name,side:selectedPoint.side,areaOnly:!!selectedPoint.navigationArea},cardOpen,statusVisible:!status.hidden,meridians:14,supplementalNames:12,standardAcupoints:361,annotatedNames:ctx.ACUPOINTS.filter(p=>p.mapped).length,markerInstances:routeRecords.reduce((n,r)=>n+r.data.length,0),visiblePoints:getVisiblePoints().length,routes:routeRecords.length,autoSpeak:autoSpeak(),lineWidthPixels:activeMeridian==='ALL'?2.2:3.5,pointSizePixels:activeMeridian==='ALL'?7:11})};

 window.__ATLAS_LEARNING__.restoreDisplayState=(v,{selection=true}={})=>{
  clearStudyContext(true);setMeridians(v.selectedMeridians||['HT','PC']);
  tcmSide=v.tcmSide||'both';const physical=state.bodySex==='female'?window.__ATLAS_FEMALE__?.getState().side:state.side;if(paintedSkinVisible()&&physical&&physical!=='both'&&tcmSide!=='both'&&physical!==tcmSide)tcmSide=physical;linesOn=!!v.linesOn;pointsOn=!!v.pointsOn;namesOn=!!v.namesOn;xray=!!v.xray;guideOn=linesOn=linesOn&&v.guideOn!==false;curveStyle=v.curveStyle==='dashed'?'dashed':'smooth';precisionMode='illustrative';enabled=!!v.enabled;autoFocus=v.autoFocus!==false;
  labelMode=v.labelMode==='complete'?'complete':'smart';$('labelModeToggle').textContent=labelMode==='complete'?'完整穴名':'附近穴名';$('labelModeToggle').setAttribute('aria-pressed',String(labelMode==='complete'));$('autoFocusPoint').checked=autoFocus;if($('localStudyToggle')){$('localStudyToggle').checked=!!v.localStudyOnly;$('localStudyToggle').dispatchEvent(new Event('change',{bubbles:true}));}$('curveStyle').value=curveStyle;$('tcmXray').checked=xray;$('guideToggle').checked=guideOn;
  for(const r of routeRecords)for(const g of r.guides)for(const obj of [g.guide,g.border]){obj.material.dashed=curveStyle==='dashed';obj.material.needsUpdate=true;}
  if(selection&&v.selectedPoint){const restoredSide=v.selectedPoint.side!=='midline'&&tcmSide!=='both'?tcmSide:v.selectedPoint.side;const q=pointIndex.get(v.selectedPoint.code+'|'+restoredSide)||pointIndex.get(v.selectedPoint.code+'|midline');if(q){selectPoint(q,false,{restoring:true});if(!v.studyContext)studyContext=null;}}
  labelPage=Math.max(0,Number(v.labelPage)||0);enabled=!!v.enabled;if(!v.cardOpen){cardOpen=false;card.hidden=true;}syncReferenceWindow();updateOverlayVisibility();updateStatus();
  for(const [id,on]of [['meridianLineToggle',linesOn],['acupointToggle',pointsOn],['pointNamesToggle',namesOn]]){ $(id).classList.toggle('active',on);$(id).setAttribute('aria-pressed',String(on));}
  for(const b of panel.querySelectorAll('[data-tcm-side]')){b.classList.toggle('active',b.dataset.tcmSide===tcmSide);b.setAttribute('aria-pressed',String(b.dataset.tcmSide===tcmSide));}
 };

 mountEvidenceUI(window.__ATLAS_LEARNING__);
 return window.__ATLAS_LEARNING__;
}
