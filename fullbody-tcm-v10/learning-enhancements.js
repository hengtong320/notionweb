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
 const displayColors={LU:'#12618d',LI:'#6853ac',ST:'#397851',SP:'#946ba1',HT:'#a82f63',SI:'#116d9e',BL:'#4d59ab',KI:'#685f92',PC:'#893f76',TE:'#328076',GB:'#46558c',LR:'#2c7750',GV:'#6643b1',CV:'#1768a0'};
 ctx.MERIDIANS=[...ctx.MERIDIANS.map(m=>({...m,color:displayColors[m.id]||m.color})),{id:'EX',short:'头面补充',name:'经外／头面补充',pinyin:'jīng wài',color:'#8259a0',count:12}];
 const refMap=Object.fromEntries([...REFERENCES,...NAVIGATION_POINTS].map(p=>[p.code,p]));
 ctx.ACUPOINTS=[...ctx.ACUPOINTS.map(p=>({...p,...refMap[p.code],mapped:!!refMap[p.code]?.position})),...REFERENCES.filter(p=>p.meridian==='EX').map(p=>({...p,mapped:!!(p.position||p.parts)}))];
 ctx.ACUPOINTS=ctx.ACUPOINTS.map(canonicalPoint);
 const meridianMap=Object.fromEntries(ctx.MERIDIANS.map(m=>[m.id,m]));
 let selectedMeridians=new Set(['HT','SI']),suspended=false;
 const PAIR = new Set(['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR']);
 const routeRoot = new THREE.Group(); routeRoot.name='Individually annotated reference anchors V4'; scene.add(routeRoot);
 let enabled=false, panelOpen=false, linesOn=true, pointsOn=true, namesOn=true, xray=true, guideOn=true;
 let autoFocus=true,labelPage=0,labelMode='smart',navigationFocus=null,focusSerial=0,lastLabelsAt=0;
 let labelStats={total:0,inView:0,shown:0,page:1,pages:1,capacity:0};
 let activeMeridian=store.get('atlas-meridian','LU'), tcmSide='both', selectedPoint=null, selectedMarker=null, cardOpen=false;
 if(!meridianMap[activeMeridian] && activeMeridian!=='ALL') activeMeridian='LU';
 const pointIndex=new Map(), routeRecords=[], labelNodes=[];
 let studyContext=null,curveStyle='tube',precisionMode='strict';
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
 const panel=document.createElement('section');panel.id='tcmControls';panel.className='tcm-controls';panel.hidden=true;panel.innerHTML=`<div class="tcm-head"><div><b>经脉与穴名 · 证据查阅</b><small>设置在侧栏，3D画面始终可操作</small></div><button id="tcmClose" aria-label="收起经络设置">收起</button></div><div class="tcm-master-row"><button id="tcmMasterToggle">显示经络</button><button id="tcmFitMeridian">看所选</button></div><div class="tcm-toggle-row"><button id="meridianLineToggle" class="active">线路</button><button id="acupointToggle" class="active">点位</button><button id="pointNamesToggle" class="active">穴名</button></div><div class="tcm-side-picker"><button data-tcm-side="right">人体右侧</button><button data-tcm-side="both" class="active">双侧</button><button data-tcm-side="left">人体左侧</button></div><label class="tcm-xray"><input id="tcmXray" type="checkbox" checked>透视点线（背侧也可见，非体表深度）</label><label class="tcm-xray"><input id="guideToggle" type="checkbox" checked>显示经络导览（非取穴定位）</label><label class="tcm-xray">线型<select id="curveStyle"><option value="tube">立体细线（示意）</option><option value="smooth">平面导览（示意）</option><option value="dashed">虚线导览</option></select></label><div class="guide-actions"><button id="guideBack">看背部</button><button id="guideFront">看正面</button></div><div id="guideCoverage" class="guide-coverage"></div><label class="tcm-xray"><input id="autoFocusPoint" type="checkbox" checked>点击穴名查看部位；示意模式可聚焦标记</label><label class="tcm-search"><input id="acupointSearch" type="search" placeholder="穴名 / 拼音 / 编码，如迎香、KI27" autocomplete="off"></label><div class="v4-button-row"><button id="pairHeart">心经＋小肠经</button><button id="pairLung">肺经＋大肠经</button><button id="headPoints">头面补充</button></div><div class="selection-help">可多选经脉；再次点击取消。十四经361个穴名均有部位导航；示意点不等于临床定位。</div><div id="meridianChips" class="meridian-chips"></div><div class="tcm-section-label">穴位名称目录 <small id="pointResultCount"></small></div><div id="acupointResults" class="acupoint-results"></div><p class="tcm-disclaimer">点位为按部位和骨性标志建立的导航示意，未经临床定位校准。导览线展示体表区域，不含完整内行、络脉及其他支脉。</p>`;sidebar.append(panel);
 const status=document.createElement('div');status.id='tcmStatus';status.className='tcm-status';status.hidden=true;status.innerHTML='<span class="tcm-status-dot"></span><button id="tcmStatusMain"></button><button id="tcmStatusSettings">设置</button><button id="tcmStatusHide">隐藏图层</button>';document.querySelector('.stage').append(status);
 const card=document.createElement('section');card.id='tcmPointCard';card.className='tcm-point-card';card.hidden=true;document.querySelector('.detail-scroll').prepend(card);
 const chip=document.createElement('div');chip.id='selectionChip';chip.className='selection-chip';chip.innerHTML='<button id="selectionChipText"></button><button id="chipDetails">详情</button><button id="chipSpeak">朗读</button>';document.querySelector('.stage').append(chip);
 const labels=document.createElement('div');labels.id='acupointLabels';labels.className='acupoint-label-layer';viewport.append(labels);
 const labelNav=document.createElement('div');labelNav.id='acupointLabelNav';labelNav.className='acupoint-label-nav';labelNav.hidden=true;
 labelNav.innerHTML='<button id="labelModeToggle" aria-pressed="false">就近穴名</button><button id="labelPrevious" aria-label="上一页穴名">‹</button><span id="labelPageInfo"></span><button id="labelNext" aria-label="下一页穴名">›</button><button id="labelFitAll">看全线</button>';
 document.querySelector('.stage').append(labelNav);
 const wires=document.createElementNS('http://www.w3.org/2000/svg','svg');wires.classList.add('acupoint-label-wires');labels.append(wires);
 const hover=document.createElement('div');hover.id='acuHover';hover.className='acu-hover';hover.hidden=true;viewport.append(hover);
 const areaTag=document.createElement('div');areaTag.id='headAreaTag';areaTag.className='head-area-tag';areaTag.hidden=true;viewport.append(areaTag);
 $('openNav').onclick=()=>{document.body.classList.toggle('nav-open');document.body.classList.remove('detail-open');};
 $('closeNav').onclick=()=>{document.body.classList.remove('nav-open');};
 $('openDetail').onclick=()=>{document.body.classList.toggle('detail-open');document.body.classList.remove('nav-open');};
 $('closeDetail').onclick=()=>document.body.classList.remove('detail-open');
 $('boneTab').onclick=()=>setPanel(false);$('tcmTab').onclick=()=>{toggleTCM(true);setPanel(true);};
 $('chipDetails').onclick=$('selectionChipText').onclick=()=>{if(selectedPoint&&enabled){card.hidden=false;cardOpen=true;document.body.classList.add('point-detail-active');}document.body.classList.add('detail-open');document.body.classList.remove('nav-open');};
 $('chipSpeak').onclick=()=>speak(selectedPoint&&enabled?selectedPoint.name:BY_ID[state.selected]?.name);
 window.addEventListener('atlas:bone-selected',e=>{if(e.detail?.user){selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();if(autoSpeak())speak(BY_ID[e.detail.id]?.name);}updateStatus();});
 window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')){document.body.classList.remove('nav-open','detail-open');viewPanel.hidden=true;if(panelOpen)setPanel(false);}});
 $('meridianChips').innerHTML=ctx.MERIDIANS.map(m=>`<button data-meridian="${m.id}" style="--m:${m.color}">${m.short}<small>${m.id}</small></button>`).join('')+'<button data-meridian="ALL">全部经脉</button>';
 $('meridianChips').querySelectorAll('button').forEach(b=>b.onclick=()=>{const id=b.dataset.meridian;if(id==='ALL'){setMeridians(ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id));toggleTCM(true);fitMeridian();return;}if(selectedMeridians.has(id)&&selectedMeridians.size>1)selectedMeridians.delete(id);else selectedMeridians.add(id);setMeridians([...selectedMeridians]);toggleTCM(true);fitMeridian();});
 $('pairHeart').onclick=()=>{setMeridians(['HT','SI']);toggleTCM(true);fitMeridian();};$('pairLung').onclick=()=>{setMeridians(['LU','LI']);toggleTCM(true);fitMeridian();};$('headPoints').onclick=()=>{setMeridians(['EX']);toggleTCM(true);fitMeridian([0,.04,1]);};
 $('meridianQuick').onchange=()=>{if($('meridianQuick').value==='MULTI'){toggleTCM(true);setPanel(true);return;}setMeridian($('meridianQuick').value);toggleTCM(true);fitMeridian();};
 $('tcmLayerToggle').onclick=()=>toggleTCM(!enabled);
 $('tcmBtn').onclick=()=>{toggleTCM(true);setPanel(!panelOpen||!document.body.classList.contains('nav-open')&&compact());};
 $('tcmClose').onclick=()=>setPanel(false);
 $('tcmMasterToggle').onclick=()=>toggleTCM(!enabled);
 $('tcmStatusSettings').onclick=()=>setPanel(true);
 $('tcmStatusHide').onclick=()=>toggleTCM(false);
 $('tcmStatusMain').onclick=()=>selectedPoint&&(selectedPoint.position||selectedPoint.navigationArea)?focusReference(selectedPoint):fitMeridian();
 $('tcmQuickFit').onclick=$('tcmFitMeridian').onclick=()=>{toggleTCM(true);fitMeridian();};
 for(const [id,get,set] of [['meridianLineToggle',()=>linesOn,v=>linesOn=v],['acupointToggle',()=>pointsOn,v=>pointsOn=v],['pointNamesToggle',()=>namesOn,v=>namesOn=v]])$(id).onclick=()=>{set(!get());$(id).classList.toggle('active',get());updateOverlayVisibility();};
 panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.onclick=()=>{setTCMSide(b.dataset.tcmSide);fitMeridian();});
 $('tcmXray').onchange=()=>{xray=$('tcmXray').checked;updateOverlayVisibility();};
 $('acupointSearch').oninput=renderResults;
 $('autoFocusPoint').onchange=e=>autoFocus=e.target.checked;
 $('labelPrevious').onclick=()=>{labelPage=Math.max(0,labelPage-1);lastLabelsAt=0;};
 $('labelNext').onclick=()=>{labelPage=Math.min(labelStats.pages-1,labelPage+1);lastLabelsAt=0;};
 $('labelFitAll').onclick=()=>fitMeridian();
 $('labelModeToggle').onclick=()=>{labelMode=labelMode==='complete'?'smart':'complete';labelPage=0;$('labelModeToggle').textContent=labelMode==='complete'?'完整穴名':'就近穴名';$('labelModeToggle').setAttribute('aria-pressed',String(labelMode==='complete'));lastLabelsAt=0;};
 $('curveStyle').onchange=e=>{curveStyle=e.target.value;for(const r of routeRecords)for(const g of r.guides)for(const obj of [g.guide,g.border]){obj.material.dashed=curveStyle==='dashed';obj.material.needsUpdate=true;}updateOverlayVisibility();};
 $('guideToggle').onchange=e=>{guideOn=e.target.checked;updateOverlayVisibility();};
 $('guideBack').onclick=()=>fitMeridian([0,.05,-1]);$('guideFront').onclick=()=>fitMeridian([0,.05,1]);
 function setPanel(open){if(open&&$('tissuePanel')){$('tissuePanel').hidden=true;$('layersTab')?.classList.remove('active');}panelOpen=!!open;panel.hidden=!panelOpen;bonePane.hidden=panelOpen;sidebar.classList.toggle('tcm-mode',panelOpen);$('boneTab').classList.toggle('active',!panelOpen);$('tcmTab').classList.toggle('active',panelOpen);$('tcmBtn').setAttribute('aria-expanded',String(panelOpen));if(compact()){document.body.classList.toggle('nav-open',panelOpen);document.body.classList.remove('detail-open');}viewPanel.hidden=true;}
 function toggleTCM(on){enabled=!!on;routeRoot.visible=enabled;updateOverlayVisibility();if(!enabled){card.hidden=true;cardOpen=false;hover.hidden=true;}updateStatus();}
 function setMeridians(ids){ctx.invalidate();navigationFocus=null;labelPage=0;selectedMeridians=new Set(ids.filter(id=>meridianMap[id]));activeMeridian=selectedMeridians.size===1?[...selectedMeridians][0]:'MULTI';$('meridianQuick').value=activeMeridian;panel.querySelectorAll('[data-meridian]').forEach(b=>{b.classList.toggle('active',selectedMeridians.has(b.dataset.meridian));b.setAttribute('aria-pressed',String(selectedMeridians.has(b.dataset.meridian)));});if(selectedPoint&&!selectedMeridians.has(selectedPoint.meridian)){selectedPoint=null;card.hidden=true;cardOpen=false;clearSelectedMarker();}updateOverlayVisibility();renderResults();if(selectedMeridians.size===1&&selectedMeridians.has('GV')){ctx.setView('back');fitMeridian();}window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'meridian',id:[...selectedMeridians].join(','),name:[...selectedMeridians].map(id=>meridianMap[id].name).join('＋'),side:tcmSide}}));}
 function setMeridian(id){id=String(id).toUpperCase().replace(/^DU$/,'GV').replace(/^(RN|REN)$/,'CV');setMeridians(id==='ALL'?ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id):[id]);if(id==='GV'||id==='BL'){ctx.setView('back');fitMeridian();}else if(id==='CV'){ctx.setView('front');fitMeridian();}}
 function setTCMSide(side){ctx.invalidate();
  if(!['right','both','left'].includes(side))return;ctx.invalidate();labelPage=0;const prior=selectedPoint;navigationFocus=null;tcmSide=side;
  panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.classList.toggle('active',b.dataset.tcmSide===side));
  if(prior&&prior.side!=='midline'&&side!=='both'){
   const target=pointIndex.get(prior.code+'|'+side);
   if(target){selectPoint(target,autoFocus);return;}
  }
  updateOverlayVisibility();updateStatus();
  if(!prior)window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'meridian',id:[...selectedMeridians].join(','),name:[...selectedMeridians].map(id=>meridianMap[id].name).join('＋'),side}}));
 }

 function updateStatus(){if(!$('tcmStatusMain'))return;document.body.classList.toggle('point-detail-active',cardOpen&&enabled);status.hidden=!enabled;const m=meridianMap[activeMeridian];const summary=[...selectedMeridians].map(id=>meridianMap[id]?.short).join('＋');const text=selectedPoint?`${selectedPoint.name} ${selectedPoint.code} · ${selectedPoint.side==='left'?'人体左':selectedPoint.side==='right'?'人体右':'中线'}`:`${summary||'未选经脉'} · ${guideOn?'走向示意 · ':''}${getVisiblePoints().length}参考点`;$('tcmStatusMain').textContent=text;status.style.setProperty('--m',m?.color||'#467961');$('tcmLayerToggle').textContent=enabled?'经络：显示':'经络：隐藏';$('tcmLayerToggle').classList.toggle('active',enabled);$('tcmLayerToggle').setAttribute('aria-pressed',String(enabled));$('tcmMasterToggle').textContent=enabled?'隐藏经络图层':'显示经络图层';$('selectionChipText').textContent=selectedPoint&&enabled?`${selectedPoint.name} · ${selectedPoint.pinyin} · ${selectedPoint.code}`:`${BY_ID[state.selected]?.name||'选择骨骼'} · ${bonePinyin(state.selected)||''}`;}
 function makePointMaterial(color,size){return new THREE.ShaderMaterial({uniforms:{tint:{value:new THREE.Color(color)},pixelSize:{value:size},pixelRatio:{value:renderer.getPixelRatio()}},vertexShader:'uniform float pixelSize;uniform float pixelRatio;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_PointSize=pixelSize*pixelRatio;}',fragmentShader:'uniform vec3 tint;void main(){float d=length(gl_PointCoord-vec2(0.5));if(d>0.5)discard;vec3 c=d>0.35?vec3(0.98):tint;float a=1.0-smoothstep(0.44,0.5,d);gl_FragColor=vec4(c,a);\n#include <colorspace_fragment>\n}',transparent:true,depthWrite:false,depthTest:false,toneMapped:false});}
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
    return {guide,border,tube:sampled.mesh,points:smooth,note:path.note,curveDiagnostics:sampled.diagnostics};
   });
   const cloud=new THREE.Points(new THREE.BufferGeometry().setFromPoints(data.map(p=>p.position)),makePointMaterial(color,12));cloud.renderOrder=30;routeRoot.add(outline,line,cloud);routeRecords.push({meridian:m.id,side,data,line,outline,cloud,color,guides,hasSegments:segments.length>0});
  }
 }
 }
 buildRoutes();
 function routeMatches(r){return selectedMeridians.has(r.meridian)&&(tcmSide==='both'||r.side==='midline'||r.side===tcmSide);}
 function referenceWindow(){
  if(!studyContext||document.getElementById('localStudyToggle')?.checked===false)return null;
  const v=new THREE.Vector3(...studyContext.center),radius=studyContext.radius*1.6;
  return new THREE.Box3(v.clone().addScalar(-radius),v.clone().addScalar(radius));
 }
 function getVisiblePoints(){const box=referenceWindow();return enabled&&!suspended&&pointsOn&&precisionMode==='illustrative'?routeRecords.filter(routeMatches).flatMap(r=>r.data).filter(p=>!box||box.containsPoint(p.position)):[];}
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

 function updateOverlayVisibility(){ctx.invalidate();
  routeRoot.visible=enabled&&!suspended&&precisionMode==='illustrative';
  for(const r of routeRecords){
   const show=enabled&&routeMatches(r);r.line.visible=false;r.outline.visible=false;r.cloud.visible=show&&pointsOn;
   for(const obj of [r.line,r.outline,r.cloud])obj.material.depthTest=!xray;
   r.line.material.linewidth=3.5;r.outline.material.linewidth=6.5;r.cloud.material.uniforms.pixelSize.value=selectedMeridians.size>3?8:12;
   for(const g of r.guides){g.guide.visible=show&&guideOn&&linesOn&&curveStyle!=='tube';g.border.visible=g.guide.visible;g.tube.visible=show&&guideOn&&linesOn&&curveStyle==='tube';g.guide.material.depthTest=!xray;g.border.material.depthTest=!xray;g.tube.material.depthTest=!xray;g.tube.material.opacity=xray?.82:.97;}
  }
  if(selectedMarker){selectedMarker.visible=precisionMode==='illustrative'&&enabled&&!suspended&&pointsOn&&!!(selectedPoint?.position||selectedPoint?.navigationArea);selectedMarker.material.depthTest=!xray;}
  const active=routeRecords.filter(routeMatches),gn=active.reduce((n,r)=>n+r.guides.length,0);
  if($('guideCoverage'))$('guideCoverage').textContent=precisionMode==='strict'?'严谨查阅：当前全部点线未完成定位校准，已隐藏。可查看目录说明，或明确切换到未校准的三维示意。':referenceWindow()?'局部观察：'+studyContext.name+'；只显示当前范围内的点线。点击“看全线”恢复整条，或在图层设置关闭局部范围。':!guideOn?'线路已关闭；点位和穴名仍可查看。勾选走向导览恢复线路。':gn?`${curveStyle==='tube'?'三维细线':curveStyle==='smooth'?'平面导览线':'虚线'}：区域导览，非真实神经或取穴线；圆点：原穴名参照。${gn} 段；仅平滑显示，未改变穴位坐标。`:'所选条目暂无走向线；点位或名称目录仍可查看。';
  lastLabelRebuild='';updateStatus();
 }
 const baseFocusBounds=ctx.focusBounds;
 ctx.focusBounds=(box,options={})=>{
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
 function prepareNavigation(){
  ctx.prepareReferenceFocus?.();suspended=false;pointsOn=true;namesOn=true;
  $('acupointToggle').classList.add('active');$('pointNamesToggle').classList.add('active');
  if(compact())setPanel(false);
 }
 function frameNavigation(box,direction,up,title){ctx.invalidate();
  const serial=++focusSerial;
  navigationFocus={box:box.clone(),direction:[...direction],up:[...up],title,serial};
  const apply=()=>{if(serial!==focusSerial||!navigationFocus)return;ctx.focusBounds(box,{direction,up});$('viewBadge').lastElementChild.textContent=title;};
  apply();requestAnimationFrame(()=>{apply();lastLabelsAt=0;});
 }
 function fitMeridian(requestedDirection=null){
  const active=routeRecords.filter(routeMatches),pts=active.flatMap(r=>[...r.data.map(p=>p.position),...r.guides.flatMap(g=>g.points)]);
  if(selectedMeridians.has('EX'))for(const p of ctx.ACUPOINTS.filter(p=>p.navigationArea)){pts.push(areaCenter({...p,side:'right'}));if(p.side==='paired')pts.push(areaCenter({...p,side:'left'}));}
  if(!pts.length){toast('所选条目尚无导航范围');return false;}
  studyContext=null;
  prepareNavigation();toggleTCM(true);labelPage=0;
  const ids=[...selectedMeridians];let dir=[0,.05,1];
  if(ids.every(id=>['GV','BL','SI','TE'].includes(id)))dir=[0,.08,-1];
  else if(ids.length===1&&ids[0]==='GB')dir=[tcmSide==='left'?1:-1,.05,.15];
  frameNavigation(new THREE.Box3().setFromPoints(pts).expandByScalar(35),requestedDirection||dir,[0,1,0],ids.map(id=>meridianMap[id].short).join('＋')+' · 全段导航');
  updateOverlayVisibility();return true;
 }
 function strictBounds(p){const box=new THREE.Box3();for(let id of p?.landmarks||[]){if(p.side==='left'){const original=BY_ID[id];id=BONES.find(b=>b.side==='left'&&b.baseId===original?.baseId)?.id||id;}const b=bones.get(id);if(b){b.geometry.computeBoundingBox();box.union(b.geometry.boundingBox.clone().translate(b.userData.home));}}return box;}
 function focusPoint(pos){
  if(!pos)return false;
  const p=selectedPoint?.position===pos?selectedPoint:getVisiblePoints().find(p=>p.position===pos);
  prepareNavigation();toggleTCM(true);
  if(precisionMode==='strict'){
   const box=strictBounds(p);
   if(box.isEmpty()){studyContext=null;const map={chest:'thorax',abdomen:'lumbosacral',back:'spine',neck:'cervical',leg:'leg',thigh:'whole',forearm:'upper',pelvis:'pelvis',head:'head',hand:'hand',foot:'foot',upper:'upper'};const region=map[p?.region];if(region)ctx.setRegion(region,true,{keepStudy:true});toast('该坐标未校准：仅查看相关解剖区域，不显示精确点');updateOverlayVisibility();return true;}
   studyContext={code:p.code,name:p.name,side:p.side,center:box.getCenter(new THREE.Vector3()).toArray(),radius:Math.max(75,box.getSize(new THREE.Vector3()).length()/2),areaOnly:true,regionLabel:p.regionLabel};
   const dir=p?.view?[...p.view]:[0,.05,1];if(p.side==='left')dir[0]*=-1;const up=Math.abs(dir[1])>.9?[0,0,1]:[0,1,0];frameNavigation(box.expandByScalar(25),dir,up,p.name+' · 骨性参照范围 / 非精确点');updateOverlayVisibility();return true;
  }
  let dir=p?.view?[...p.view]:[0,.05,1];if(p?.side==='left')dir[0]*=-1;
  const up=Math.abs(dir[1])>.9?[0,0,1]:[0,1,0],radius=p?.focusRadius||70;
  frameNavigation(new THREE.Box3(pos.clone().addScalar(-radius),pos.clone().addScalar(radius)),dir,up,(p?.name||'穴位')+' · '+(p?.code||'')+' 部位参照');
  updateOverlayVisibility();return true;
 }
 function renderResults(){const q=normalize($('acupointSearch').value.replace(/影像穴?|迎像穴?/g,'迎香').replace(/穴$/,''));const arr=ctx.ACUPOINTS.filter(p=>(q||selectedMeridians.has(p.meridian))&&(!q||normalize([p.code,p.name,p.pinyin,p.meridianName].join(' ')).includes(q)));$('pointResultCount').textContent=`${arr.length}项 · ${arr.filter(p=>p.mapped||p.areaNavigation).length}可导航`;
 $('acupointResults').innerHTML=arr.map(p=>`<button data-point="${p.code}" class="${selectedPoint?.code===p.code?'active':''}"><b>${p.name}<small>${p.pinyin}</small></b><span>${p.code}<small>${p.navigationArea?'看'+p.navigationArea.label:p.mapped?(p.regionLabel||'部位示意'):'资料条目'}</small></span></button>`).join('')||'<p class="empty-search">没有找到</p>';
 $('acupointResults').querySelectorAll('button').forEach(b=>b.onclick=()=>{const p=ctx.ACUPOINTS.find(p=>p.code===b.dataset.point);if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);toggleTCM(true);const side=PAIR.has(p.meridian)||p.side==='paired'?(tcmSide==='left'?'left':'right'):'midline';selectPoint(pointIndex.get(p.code+'|'+side)||{...p,side,position:null},autoFocus);});}
 function nearestBones(pos){return [...bones].map(([id,b])=>{const bb=b.geometry.boundingBox.clone().translate(b.userData.home);return {id,d:bb.distanceToPoint(pos)};}).sort((a,b)=>a.d-b.d).slice(0,3);}
 function clearSelectedMarker(){if(selectedMarker){routeRoot.remove(selectedMarker);selectedMarker.traverse(n=>{n.geometry?.dispose();n.material?.dispose();});selectedMarker=null;}areaTag.hidden=true;lastLabelRebuild='';}
 function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;ctx.invalidate();p=canonicalPoint(p);
 if(p.navigationArea?.fixedSide)p={...p,side:p.navigationArea.fixedSide};
  if(p.position||p.navigationArea){if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);if(tcmSide!=='both'&&p.side!=='midline'&&p.side!==tcmSide)setTCMSide(p.side);toggleTCM(true);}
  selectedPoint=p;labelPage=0;clearSelectedMarker();setStudyContext(p);
 if(p.position){selectedMarker=new THREE.Points(new THREE.BufferGeometry().setFromPoints([p.position]),makePointMaterial('#d37022',20));selectedMarker.renderOrder=60;routeRoot.add(selectedMarker);selectedMarker.visible=enabled&&!suspended&&pointsOn&&precisionMode==='illustrative';}
 if(!p.position&&p.navigationArea){
  const a=p.navigationArea,ring=new THREE.Mesh(new THREE.RingGeometry(a.ring*.83,a.ring,80),new THREE.MeshBasicMaterial({color:'#bb791d',transparent:true,opacity:.82,side:THREE.DoubleSide,depthTest:false,depthWrite:false,toneMapped:false}));
  ring.position.copy(areaCenter(p));ring.quaternion.copy(camera.quaternion);ring.renderOrder=60;ring.userData.studyArea=true;selectedMarker=ring;routeRoot.add(ring);areaTag.textContent=p.name+' · '+a.label+'观察范围';
 }
 const m=meridianMap[p.meridian];cardOpen=true;card.hidden=false;document.body.classList.remove('tissue-detail-active');if($('tissueDetail'))$('tissueDetail').hidden=true;
 card.innerHTML=pointCardV9(p,m,BY_ID);
 window.dispatchEvent(new CustomEvent('atlas:v9-point-click',{detail:{code:p.code,side:p.side}}));
 $('closePointCard').onclick=()=>{card.hidden=true;cardOpen=false;document.body.classList.remove('detail-open','point-detail-active');};$('focusPointBtn').onclick=()=>focusReference(p);$('speakPointBtn').onclick=()=>speak(p.name);$('pointPrev').onclick=()=>stepPoint(-1);$('pointNext').onclick=()=>stepPoint(1);card.querySelectorAll('[data-near]').forEach(b=>b.onclick=()=>{let id=b.dataset.near;if(p.side==='left'){const orig=BY_ID[id];id=BONES.find(b=>b.baseId===orig.baseId&&b.side==='left')?.id||id;}selectBone(id,true,true);});renderResults();updateStatus();lastLabelRebuild='';
 if(focus&&(p.position||p.navigationArea)){focusReference(p);}if(focus&&!p.position&&!p.navigationArea){document.body.classList.add('detail-open');toast('尚无可导航位置，保留资料说明');}mountLayerContext();window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'point',id:p.code,name:p.name,side:p.side}}));if(autoSpeak())speak(p.name);return true;
 }

 function areaCenter(p){const a=p.navigationArea,v=new THREE.Vector3(...a.center);if(p.side==='left'&&!a.fixedSide)v.x=2*99.55318155698478-v.x;return v;}
 function setStudyContext(p){
  if(precisionMode==='strict'&&p.position){const box=strictBounds(p);studyContext=box.isEmpty()?null:{code:p.code,name:p.name,side:p.side,center:box.getCenter(new THREE.Vector3()).toArray(),radius:Math.max(75,box.getSize(new THREE.Vector3()).length()/2),areaOnly:true,regionLabel:p.regionLabel};return;}
  const a=p.navigationArea,pos=p.position||a&&areaCenter(p);
  studyContext=pos?{code:p.code,name:p.name,side:p.side,center:pos.toArray(),radius:a?.radius||p.focusRadius||70,regionLabel:a?.label||p.regionLabel||p.region,areaOnly:!p.position}:null;
 }
 function focusReference(p){
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
  for(const b of box.querySelectorAll('[data-study-profile]'))b.onclick=async()=>{if(!studyContext&&selectedPoint)focusReference(selectedPoint);await window.__ATLAS_TISSUES__?.setProfile(b.dataset.studyProfile);refreshLayerContext();};
  refreshLayerContext();
 }
 function refreshLayerContext(){
  const profile=window.__ATLAS_TISSUES__?.getState().profile||'bones';
  card.querySelectorAll('[data-study-profile]').forEach(b=>b.classList.toggle('active',b.dataset.studyProfile===profile));
  if($('studyLayerStatus'))$('studyLayerStatus').textContent='当前观察：'+(selectedPoint?.name||'未选穴名')+' · '+({bones:'骨骼结构',muscles:'肌肉外形',nerves:'神经走行',compare:'分层对照',custom:'自选图层'}[profile]||profile);
 }
 window.addEventListener('atlas:profile-changed',refreshLayerContext);
 window.addEventListener('atlas:bone-selected',e=>{if(e.detail?.user)studyContext=null;});
 

 function stepPoint(d){if(!selectedPoint)return;const a=ctx.ACUPOINTS.filter(p=>p.meridian===selectedPoint.meridian),i=a.findIndex(p=>p.code===selectedPoint.code),next=a[(i+d+a.length)%a.length];selectPoint(pointIndex.get(next.code+'|'+selectedPoint.side)||{...next,side:selectedPoint.side,position:null},true);}
 function project(p){const v=p.position.clone().project(camera),r=viewport.getBoundingClientRect();return {x:r.left+(v.x*.5+.5)*r.width,y:r.top+(-v.y*.5+.5)*r.height,z:v.z};}
 function pointUnoccluded(p){
  if(xray)return true;
  const candidates=[];scene.traverse(n=>{if(!n.isMesh||!n.visible||(!n.userData.atlas&&!bones.has(n.name))||n.material.opacity<.5)return;let parent=n.parent;while(parent){if(!parent.visible)return;parent=parent.parent;}candidates.push(n);});
  if(!candidates.length)return true;const delta=p.position.clone().sub(camera.position),distance=delta.length();const ray=new THREE.Raycaster(camera.position,delta.normalize(),0,Math.max(0,distance-2));return ray.intersectObjects(candidates,false).length===0;
 }
 function hitPoint(e){if(!enabled||suspended||!pointsOn)return null;let best=null,bestD=e.pointerType==='touch'?23:14;for(const p of getVisiblePoints()){const v=project(p);if(v.z< -1||v.z>1)continue;const d=Math.hypot(e.clientX-v.x,e.clientY-v.y);if(d<bestD&&pointUnoccluded(p)){bestD=d;best=p;}}return best;}
 function hitRoute(e){
  if(!enabled||suspended||!guideOn||!linesOn||precisionMode!=='illustrative')return null;let best=null,bestDistance=e.pointerType==='touch'?14:8;
  for(const r of routeRecords.filter(routeMatches))for(const g of r.guides)for(let i=1;i<g.points.length;i++){
   const a=project({position:g.points[i-1]}),b=project({position:g.points[i]});if(a.z< -1||a.z>1||b.z< -1||b.z>1)continue;
   const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((e.clientX-a.x)*dx+(e.clientY-a.y)*dy)/(dx*dx+dy*dy||1)));
   const d=Math.hypot(e.clientX-a.x-t*dx,e.clientY-a.y-t*dy);if(d<bestDistance){bestDistance=d;best=r;}
  }return best;
 }
 function handlePointerClick(e){if(state.mode!=='orbit'||e.button!==0)return false;const p=hitPoint(e);if(p)return selectPoint(p,autoFocus);const r=hitRoute(e);if(!r)return false;setMeridian(r.meridian);setTCMSide(r.side==='midline'?'both':r.side);fitMeridian();toast(meridianMap[r.meridian].name+' · 已聚焦所选线路');window.dispatchEvent(new CustomEvent('atlas:v9-channel-click',{detail:{ids:[r.meridian]}}));return true;}

 viewport.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch'||performance.now()-lastHover<70){hover.hidden=true;return;}lastHover=performance.now();const p=hitPoint(e);hoveredPoint=p;if(!p){hover.hidden=true;return;}const r=viewport.getBoundingClientRect();hover.textContent=`${p.name} · ${p.pinyin} · ${p.code}`;hover.style.left=Math.min(e.clientX-r.left+15,r.width-210)+'px';hover.style.top=Math.max(8,e.clientY-r.top-38)+'px';hover.hidden=false;$('hoverTip').hidden=true;},{passive:true});
 viewport.addEventListener('pointerleave',()=>hover.hidden=true);
 function updateFrame(){
  syncReferenceWindow();
  const w=viewport.clientWidth,h=viewport.clientHeight,dpr=renderer.getPixelRatio(),sz=`${w},${h},${dpr}`;
  if(sz!==lastSize){lastSize=sz;for(const r of routeRecords){r.line.material.resolution.set(w,h);r.outline.material.resolution.set(w,h);r.cloud.material.uniforms.pixelRatio.value=dpr;for(const g of r.guides){g.guide.material.resolution.set(w,h);g.border.material.resolution.set(w,h);}}if(selectedMarker)selectedMarker.material.uniforms?.pixelRatio&&(selectedMarker.material.uniforms.pixelRatio.value=dpr);}
  const displaced=state.explode>0||[...bones.values()].some(b=>b.userData.offset.lengthSq()>.1);document.body.classList.toggle('anatomy-displaced',displaced&&enabled);
  if(selectedMarker?.userData.studyArea){selectedMarker.quaternion.copy(camera.quaternion);selectedMarker.visible=enabled&&!suspended&&pointsOn&&precisionMode==='illustrative';const p=project({position:selectedMarker.position}),r=viewport.getBoundingClientRect();areaTag.hidden=!(precisionMode==='illustrative'&&enabled&&!suspended&&p.z>-1&&p.z<1&&p.x>=r.left&&p.x<=r.right&&p.y>=r.top&&p.y<=r.bottom);areaTag.style.left=Math.max(5,Math.min(w-205,p.x-r.left+14))+'px';areaTag.style.top=Math.max(8,p.y-r.top+22)+'px';}
  updatePointLabels();
 }
 function updatePointLabels(){
  const now=performance.now();lastLabelsAt=now;
  labelNav.hidden=!(enabled&&!suspended&&pointsOn&&namesOn&&precisionMode==='illustrative');
  labels.hidden=!(enabled&&!suspended&&pointsOn&&precisionMode==='illustrative');
  if(labels.hidden)return;
  const rect=viewport.getBoundingClientRect(),w=rect.width,h=rect.height;
  const top=Math.max(100,document.querySelector('.study-toolbar').getBoundingClientRect().bottom-rect.top+12,status.hidden?0:status.getBoundingClientRect().bottom-rect.top+12);
  const bottom=h-(document.body.classList.contains('dock-collapsed')?120:220),rowHeight=25;
  const perColumn=Math.max(1,Math.floor((bottom-top)/rowHeight)),columns=w<540?1:2,capacity=perColumn*columns;
  const all=namesOn?getVisiblePoints():[];
  const inView=v=>v.z> -1&&v.z<1&&v.x>=rect.left&&v.x<=rect.right&&v.y>=rect.top&&v.y<=rect.bottom;
  let candidates=all.map(p=>({p,v:project(p)})).filter(x=>inView(x.v));
  candidates.sort((a,b)=>a.v.y-b.v.y||a.v.x-b.v.x||a.p.ordinal-b.p.ordinal);
  const sp=selectedPoint?.position?{p:selectedPoint,v:project(selectedPoint)}:null;
  const pin=sp&&inView(sp.v)?sp:null;
  const pool=candidates.filter(x=>!(x.p.code===pin?.p.code&&x.p.side===pin?.p.side)),slots=Math.max(1,capacity-(pin?1:0));
  const count=candidates.length,pages=Math.max(1,Math.ceil(pool.length/slots));labelPage=Math.max(0,Math.min(labelPage,pages-1));
  let pageItems=labelMode==='complete'?pool.slice(labelPage*slots,(labelPage+1)*slots):pool.slice().sort((a,b)=>pin?Math.hypot(a.v.x-pin.v.x,a.v.y-pin.v.y)-Math.hypot(b.v.x-pin.v.x,b.v.y-pin.v.y):0).slice(0,pin?5:8);
  if(pin)pageItems=[pin,...pageItems];
  const key=pageItems.map(x=>x.p.code+'|'+x.p.side).join(',')+':'+selectedPoint?.code+':'+labelMode;
  if(key!==lastLabelRebuild){lastLabelRebuild=key;for(const x of labelNodes)x.el.remove();labelNodes.length=0;
   for(const x of pageItems){
    const el=document.createElement('button');el.type='button';el.className='acu-name v6-label'+(x.p===selectedPoint?' selected':'');
    el.textContent=x.p.name+' '+x.p.code+(x.p.side==='midline'?'':x.p.side==='right'?' R':' L');
    el.title=x.p.name+' · '+x.p.pinyin+' · 点击聚焦';el.dataset.labelPoint=x.p.code;el.dataset.labelSide=x.p.side;
    el.addEventListener('pointerdown',e=>e.stopPropagation());el.onclick=e=>{e.stopPropagation();selectPoint(x.p,autoFocus);};labels.append(el);labelNodes.push({p:x.p,el});
   }
  }
  wires.setAttribute('viewBox',`0 0 ${w} ${h}`);let paths='';let shown=0;const occupied=[];
  const railRows=Math.ceil(labelNodes.length/columns),railStep=Math.max(rowHeight,(bottom-top-24)/Math.max(1,railRows-1));
  for(let i=0;i<labelNodes.length;i++){
   const item=labelNodes[i],v=project(item.p),width=Math.min(w<540?123:148,w*.32);let x,y,visible=inView(v);
   if(labelMode==='complete'){
    const column=i%columns;x=column===0?8:w-width-68;y=top+Math.floor(i/columns)*railStep;
   }else{
    x=v.x-rect.left+10;y=v.y-rect.top-12;if(x+width>w-65)x-=width+20;
    visible=visible&&y>top&&y<bottom;
    if(visible&&item.p!==selectedPoint&&occupied.some(b=>x<b.x+width&&x+width>b.x&&y<b.y+24&&y+24>b.y))visible=false;
   }
   item.el.hidden=!visible;if(!visible)continue;shown++;item.el.style.width=width+'px';item.el.style.transform=`translate(${x}px,${y}px)`;occupied.push({x,y});
   if(labelMode==='complete'){
    const sx=x<w/2?x+width:x,sy=y+11,tx=v.x-rect.left,ty=v.y-rect.top;
    paths+=`<path d="M${sx.toFixed(1)},${sy.toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)}" class="${item.p===selectedPoint?'active':''}"/>`;
   }
  }
  if(selectedPoint?.navigationArea&&count===0)labelNav.hidden=true;
  wires.innerHTML=paths;labelStats={total:all.length,inView:count,shown,page:labelPage+1,pages,capacity};
  $('labelPageInfo').textContent=`${shown}/${count} 视野内 · ${labelPage+1}/${pages}页`;
  $('labelPrevious').disabled=labelPage===0;$('labelNext').disabled=labelPage>=pages-1;
 }
 $('meridianQuick').add(new Option('多经脉对照','MULTI'));setMeridians(['HT','SI']);renderResults();updateStatus();
 function clearStudyContext(clearSelection=false){
 studyContext=null;navigationFocus=null;focusSerial++;lastLabelRebuild='';lastLabelsAt=0;
 if(clearSelection){selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();document.body.classList.remove('point-detail-active');if($('v9MeridianCard'))$('v9MeridianCard').hidden=true;}
 updateOverlayVisibility();updateStatus();ctx.invalidate();
 }
 window.__ATLAS_LEARNING__={clearStudyContext,focusSelectedPoint:()=>selectedPoint?focusReference(selectedPoint):false,flushLabels:()=>{lastLabelsAt=0;updatePointLabels();},setLabelMode:mode=>{labelMode=mode==='complete'?'complete':'smart';$('labelModeToggle').textContent=labelMode==='complete'?'完整穴名':'就近穴名';lastLabelRebuild='';ctx.invalidate();},clearPointSelection:()=>{selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();updateStatus();},setPrecisionMode:mode=>{precisionMode=mode==='illustrative'?'illustrative':'strict';if(selectedPoint)setStudyContext(selectedPoint);updateOverlayVisibility();lastLabelsAt=0;lastLabelRebuild='';window.dispatchEvent(new CustomEvent('atlas:precision-changed'));ctx.invalidate();},getReferenceWindowState:()=>{const b=referenceWindow();return {active:!!b,bounds:b&&[b.min.toArray(),b.max.toArray()],visible:getVisiblePoints().map(p=>({code:p.code,side:p.side,position:p.position.toArray()})),drawnPoints:routeRecords.filter(routeMatches).reduce((n,r)=>n+r.cloud.geometry.attributes.position.count,0),clippedRouteMaterials:routeRecords.filter(routeMatches).flatMap(r=>r.guides).filter(g=>g.guide.material.clippingPlanes?.length===6).length};},getStudyContext:()=>studyContext&&{...studyContext,center:[...studyContext.center]},getCurveDiagnostics:()=>routeRecords.flatMap(r=>r.guides.map(g=>({meridian:r.meridian,side:r.side,note:g.note,...g.curveDiagnostics}))),hasNavigationFocus:()=>!!navigationFocus&&enabled,restoreNavigationFocus:()=>{if(navigationFocus){const f=navigationFocus;ctx.focusBounds(f.box,{direction:f.direction,up:f.up});}},setLabelPage:value=>{labelPage=Math.max(0,Number(value)||0);lastLabelsAt=0;},getNavigationCatalog:()=>routeRecords.flatMap(r=>r.data.map(p=>({code:p.code,name:p.name,side:p.side,position:p.position.toArray(),region:p.region,view:p.view}))),getRouteScreen:(id,side='right')=>{const r=routeRecords.find(r=>r.meridian===id&&(r.side===side||r.side==='midline'));return r?.guides.flatMap(g=>g.points.map(position=>project({position})))||[];},setMeridians,suspend:value=>{if(suspended!==value){suspended=value;updateOverlayVisibility();}},getReferences:()=>ctx.ACUPOINTS.map(p=>({code:p.code,name:p.name,mapped:p.mapped,region:p.region,hasPosition:!!p.position})),handlePointerClick,hitPoint,toggleTCM,setPanel,setMeridian,setTCMSide,fitMeridian,runPreset,updateFrame,selectPoint:(code,side='right',focus=false)=>selectPoint(pointIndex.get(code+'|'+side)||pointIndex.get(code+'|midline')||{...ctx.ACUPOINTS.find(p=>p.code===code),side,position:null},focus),getPointScreen:(code,side='right')=>{const p=pointIndex.get(code+'|'+side)||pointIndex.get(code+'|midline');return p?.position?project(p):p?.navigationArea?{...project({position:areaCenter(p)}),areaOnly:true}:null;},speakBone:id=>speak(BY_ID[id]?.name),getState:()=>({precisionMode,coordinateVerified:0,curveStyle,headAreaVisible:!!selectedMarker?.userData.studyArea&&selectedMarker.visible,studyContext,labelStats,autoFocus,navigationFocus:navigationFocus&&{title:navigationFocus.title,serial:navigationFocus.serial,center:navigationFocus.box.getCenter(new THREE.Vector3()).toArray()},guideOn,routeDiagnostics:routeRecords.filter(routeMatches).map(r=>({meridian:r.meridian,side:r.side,markerRenderOrder:r.cloud.renderOrder,guideRenderOrder:Math.max(0,...r.guides.map(g=>g.guide.renderOrder)),referencePoints:r.data.length,connected:r.hasSegments,guideCount:r.guides.length,guideVertices:r.guides.reduce((n,g)=>n+g.points.length,0),visible:precisionMode==='illustrative'&&enabled&&!suspended&&(r.line.visible||r.guides.some(g=>g.guide.visible||g.tube.visible))})),version:'10.0.0',termSource:'catalog-v10',selectedMeridians:[...selectedMeridians],suspended,legacyEqualSpacingRemoved:true,clinicalCalibration:false,enabled,panelOpen,linesOn,pointsOn,namesOn,xray,tcmSide,activeMeridian,selectedPoint:selectedPoint&&{code:selectedPoint.code,name:selectedPoint.name,side:selectedPoint.side,areaOnly:!!selectedPoint.navigationArea},cardOpen,statusVisible:!status.hidden,meridians:14,supplementalNames:12,standardAcupoints:361,annotatedNames:ctx.ACUPOINTS.filter(p=>p.mapped).length,markerInstances:routeRecords.reduce((n,r)=>n+r.data.length,0),visiblePoints:getVisiblePoints().length,routes:routeRecords.length,autoSpeak:autoSpeak(),lineWidthPixels:activeMeridian==='ALL'?2.2:3.5,pointSizePixels:activeMeridian==='ALL'?7:11})};
 mountEvidenceUI(window.__ATLAS_LEARNING__);
 return window.__ATLAS_LEARNING__;
}
