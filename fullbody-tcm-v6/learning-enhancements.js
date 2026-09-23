import {correctedPinyin} from './pronunciation-v5.js';
import {makePlacements,fullGuidePaths,viewFor,REGION_NAMES,COUNTS} from './acupoint-layout-v6.js';
import {REFERENCES} from './reference-data.js';
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
 const normalize = s => String(s).toLowerCase().replace(/影像|迎像/g,'迎香').replace(/內/g,'内').replace(/穴/g,'').replace(/\b(kd|kid)\s*(?=\d)/g,'ki').normalize('NFD').replace(/[\u0300-\u036f\s·-]/g,'');
 const bonePinyin = id => ctx.bonePinyin(BY_ID[id]);
 const displayColors={LU:'#12618d',LI:'#6853ac',ST:'#397851',SP:'#946ba1',HT:'#a82f63',SI:'#116d9e',BL:'#4d59ab',KI:'#685f92',PC:'#893f76',TE:'#328076',GB:'#46558c',LR:'#2c7750',GV:'#6643b1',CV:'#1768a0'};
 ctx.MERIDIANS=[...ctx.MERIDIANS.map(m=>({...m,color:displayColors[m.id]||m.color})),{id:'EX',short:'头面补充',name:'经外／头面补充',pinyin:'jīng wài',color:'#8259a0',count:12}];
 ctx.ACUPOINTS=[...makePlacements(THREE,bones,ctx.ACUPOINTS,REFERENCES),...REFERENCES.filter(p=>p.meridian==='EX').map(p=>({...p,mapped:!!(p.position||p.parts),placementKind:'directory'}))];
 ctx.ACUPOINTS=ctx.ACUPOINTS.map(p=>({...p,pinyin:correctedPinyin(p.name,p.pinyin)}));
 const meridianMap=Object.fromEntries(ctx.MERIDIANS.map(m=>[m.id,m]));
 let selectedMeridians=new Set(['KI']),suspended=false,selectedRoute=null,focusSerial=0,lastFocus=null,labelMode='auto',labelStats={shown:0,inFrame:0,total:0},lastLabelTime=0,activeFocusBox=null,activeFocusView=null;
 const PAIR = new Set(['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR']);
 const routeRoot = new THREE.Group(); routeRoot.name='V6 educational placements and distinct route guides'; scene.add(routeRoot);
 let enabled=false, panelOpen=false, linesOn=true, pointsOn=true, namesOn=true, xray=true, guideOn=true;
 let activeMeridian='KI', tcmSide='both', selectedPoint=null, selectedMarker=null, cardOpen=false;
 if(!meridianMap[activeMeridian] && activeMeridian!=='ALL') activeMeridian='LU';
 const pointIndex=new Map(), routeRecords=[], labelNodes=[];
 let hoveredPoint=null, lastHover=0, lastLabelRebuild='', lastPose='', lastSize='';
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
 const panel=document.createElement('section');panel.id='tcmControls';panel.className='tcm-controls';panel.hidden=true;panel.innerHTML=`<div class="tcm-head"><div><b>经络专项 · 名称与定位导览</b><small>设置在侧栏，3D画面始终可操作</small></div><button id="tcmClose" aria-label="收起经络设置">收起</button></div><div class="tcm-master-row"><button id="tcmMasterToggle">显示经络</button><button id="tcmFitMeridian">看所选</button></div><div class="tcm-toggle-row"><button id="meridianLineToggle" class="active">线路</button><button id="acupointToggle" class="active">点位</button><button id="pointNamesToggle" class="active">穴名</button></div><div class="tcm-side-picker"><button data-tcm-side="right">人体右侧</button><button data-tcm-side="both" class="active">双侧</button><button data-tcm-side="left">人体左侧</button></div><label class="tcm-xray"><input id="tcmXray" type="checkbox" checked>透视点线（背侧也可见，非体表深度）</label><label class="tcm-xray"><input id="guideToggle" type="checkbox" checked>显示虚线走向导览（非取穴定位）</label><div class="guide-actions"><button id="guideBack">看背部</button><button id="guideFront">看正面</button></div><div id="guideCoverage" class="guide-coverage"></div><label class="tcm-search"><input id="acupointSearch" type="search" placeholder="穴名 / 无声调拼音 / LU5" autocomplete="off"></label><div class="v4-button-row"><button id="pairHeart">心经＋小肠经</button><button id="pairLung">肺经＋大肠经</button><button id="headPoints">头面补充</button></div><div class="selection-help">可多选经脉；再次点击取消。十四经361穴均有教学示意位置；经外补充仍单独标明。</div><div id="meridianChips" class="meridian-chips"></div><label class="v6-select-row">画面穴名<select id="labelMode"><option value="auto">清晰排布</option><option value="all">显示全部在屏穴名</option><option value="selected">仅当前穴</option></select></label><label class="v6-select-row">分部观察<select id="focusRegionSelect"><option value="all">整条经脉</option></select></label><div class="tcm-section-label">完整穴位目录 <small id="pointResultCount"></small></div><div id="acupointResults" class="acupoint-results"></div><p class="tcm-disclaimer">361个穴名各有单独的模型教学位置，不沿曲线均分。所有坐标仍未经皮肤配准与临床校准；虚线是体表走向导览，不含完整内行支脉，不能用于取穴。</p>`;sidebar.append(panel);
 const status=document.createElement('div');status.id='tcmStatus';status.className='tcm-status';status.hidden=true;status.innerHTML='<span class="tcm-status-dot"></span><button id="tcmStatusMain"></button><button id="tcmStatusSettings">设置</button><button id="tcmStatusHide">隐藏图层</button>';document.querySelector('.stage').append(status);
 const card=document.createElement('section');card.id='tcmPointCard';card.className='tcm-point-card';card.hidden=true;document.querySelector('.detail-scroll').prepend(card);
 const chip=document.createElement('div');chip.id='selectionChip';chip.className='selection-chip';chip.innerHTML='<button id="selectionChipText"></button><button id="chipDetails">详情</button><button id="chipSpeak">朗读</button>';document.querySelector('.stage').append(chip);
 const labelInfo=document.createElement('button');labelInfo.id='v6LabelInfo';labelInfo.className='v6-label-info';labelInfo.hidden=true;document.querySelector('.stage').append(labelInfo);labelInfo.onclick=()=>{setPanel(true);$('acupointSearch').focus();};
 const labels=document.createElement('div');labels.id='acupointLabels';labels.className='acupoint-label-layer';viewport.append(labels);const leaders=document.createElementNS('http://www.w3.org/2000/svg','svg');leaders.classList.add('v6-label-leaders');leaders.setAttribute('aria-hidden','true');viewport.append(leaders);
 labels.addEventListener('pointerdown',e=>e.stopPropagation(),true);labels.addEventListener('pointerup',e=>e.stopPropagation(),true);
 const hover=document.createElement('div');hover.id='acuHover';hover.className='acu-hover';hover.hidden=true;viewport.append(hover);
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
 $('pairHeart').onclick=()=>{setMeridians(['HT','SI']);toggleTCM(true);fitMeridian();};$('pairLung').onclick=()=>{setMeridians(['LU','LI']);toggleTCM(true);fitMeridian();};$('headPoints').onclick=()=>{setMeridians(['EX']);toggleTCM(true);setRegion('head');ctx.setView('front');};
 $('meridianQuick').onchange=()=>{if($('meridianQuick').value==='MULTI'){toggleTCM(true);setPanel(true);return;}setMeridian($('meridianQuick').value);toggleTCM(true);fitMeridian();};
 $('tcmLayerToggle').onclick=()=>toggleTCM(!enabled);
 $('tcmBtn').onclick=()=>{toggleTCM(true);setPanel(!panelOpen||!document.body.classList.contains('nav-open')&&compact());};
 $('tcmClose').onclick=()=>setPanel(false);
 $('tcmMasterToggle').onclick=()=>toggleTCM(!enabled);
 $('tcmStatusSettings').onclick=()=>setPanel(true);
 $('tcmStatusHide').onclick=()=>toggleTCM(false);
 $('tcmStatusMain').onclick=()=>selectedPoint?.position?focusPoint(selectedPoint.position):fitMeridian();
 $('tcmQuickFit').onclick=$('tcmFitMeridian').onclick=()=>{toggleTCM(true);fitMeridian();};
 for(const [id,get,set] of [['meridianLineToggle',()=>linesOn,v=>linesOn=v],['acupointToggle',()=>pointsOn,v=>pointsOn=v],['pointNamesToggle',()=>namesOn,v=>namesOn=v]])$(id).onclick=()=>{set(!get());$(id).classList.toggle('active',get());updateOverlayVisibility();};
 panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.onclick=()=>setTCMSide(b.dataset.tcmSide));
 $('tcmXray').onchange=()=>{xray=$('tcmXray').checked;updateOverlayVisibility();};
 $('acupointSearch').oninput=renderResults;
 $('labelMode').onchange=e=>{labelMode=e.target.value;lastLabelRebuild='';};
 $('focusRegionSelect').onchange=e=>{const pts=routeRecords.filter(routeMatches).flatMap(r=>r.data).filter(p=>e.target.value==='all'||p.region===e.target.value);if(pts.length)focusSet(pts.map(p=>p.position),e.target.value==='all'?null:viewFor(pts[0]));};
 $('guideToggle').onchange=e=>{guideOn=e.target.checked;updateOverlayVisibility();};
 $('guideBack').onclick=()=>fitMeridian({dir:[0,.05,-1],up:[0,1,0]});$('guideFront').onclick=()=>fitMeridian({dir:[0,.05,1],up:[0,1,0]});
 function setPanel(open){if(open&&$('tissuePanel')){$('tissuePanel').hidden=true;$('layersTab')?.classList.remove('active');}panelOpen=!!open;panel.hidden=!panelOpen;bonePane.hidden=panelOpen;sidebar.classList.toggle('tcm-mode',panelOpen);$('boneTab').classList.toggle('active',!panelOpen);$('tcmTab').classList.toggle('active',panelOpen);$('tcmBtn').setAttribute('aria-expanded',String(panelOpen));if(compact()){document.body.classList.toggle('nav-open',panelOpen);document.body.classList.remove('detail-open');}viewPanel.hidden=true;}
 function toggleTCM(on){enabled=!!on;routeRoot.visible=enabled;updateOverlayVisibility();if(!enabled){card.hidden=true;cardOpen=false;hover.hidden=true;}updateStatus();}
 function setMeridians(ids){selectedMeridians=new Set(ids.filter(id=>meridianMap[id]));activeMeridian=selectedMeridians.size===1?[...selectedMeridians][0]:'MULTI';$('meridianQuick').value=activeMeridian;panel.querySelectorAll('[data-meridian]').forEach(b=>{b.classList.toggle('active',selectedMeridians.has(b.dataset.meridian));b.setAttribute('aria-pressed',String(selectedMeridians.has(b.dataset.meridian)));});if(selectedPoint&&!selectedMeridians.has(selectedPoint.meridian)){selectedPoint=null;card.hidden=true;cardOpen=false;clearSelectedMarker();}updateOverlayVisibility();renderResults();rebuildRegions();}
 function setMeridian(id){id=String(id).toUpperCase().replace(/^DU$/,'GV').replace(/^(RN|REN)$/,'CV');setMeridians(id==='ALL'?ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id):[id]);if(id==='GV'||id==='BL'){ctx.setView('back');fitMeridian();}else if(id==='CV'){ctx.setView('front');fitMeridian();}}
 function setTCMSide(side){if(!['right','both','left'].includes(side))return;tcmSide=side;panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.classList.toggle('active',b.dataset.tcmSide===side));if(selectedPoint&&selectedPoint.side!=='midline'&&side!=='both'&&side!==selectedPoint.side){selectedPoint=null;card.hidden=true;cardOpen=false;clearSelectedMarker();}updateOverlayVisibility();}
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
   const guides=fullGuidePaths(THREE,m.id,side,data).map(path=>{
    const smooth=new THREE.CatmullRomCurve3(path.points,false,'centripetal',.2).getPoints(Math.max(24,path.points.length*6));
    const geometry=new LineGeometry().setPositions(smooth.flatMap(p=>p.toArray()));
    const mat=new LineMaterial({color: m.id==='GV'?'#6643b1':color,linewidth:4,worldUnits:false,transparent:true,opacity:.93,depthTest:false,depthWrite:false,dashed:true,dashSize:8,gapSize:4,dashScale:1,toneMapped:false});
    const guide=new Line2(geometry,mat);guide.computeLineDistances();guide.renderOrder=22;routeRoot.add(guide);
    const border=new Line2(geometry,new LineMaterial({color:'#fbfcf8',linewidth:7,worldUnits:false,transparent:true,opacity:.85,depthTest:false,depthWrite:false,dashed:true,dashSize:8,gapSize:4,dashScale:1,toneMapped:false}));border.computeLineDistances();border.renderOrder=21;routeRoot.add(border);
    return {guide,border,points:smooth,note:path.note};
   });
   const cloud=new THREE.Points(new THREE.BufferGeometry().setFromPoints(data.map(p=>p.position)),makePointMaterial(color,12));cloud.renderOrder=21;routeRoot.add(outline,line,cloud);routeRecords.push({meridian:m.id,side,data,line,outline,cloud,color,guides,hasSegments:segments.length>0});
  }
 }
 }
 buildRoutes();
 function routeMatches(r){return selectedMeridians.has(r.meridian)&&(tcmSide==='both'||r.side==='midline'||r.side===tcmSide);}
 function getVisiblePoints(){return enabled&&!suspended&&pointsOn?routeRecords.filter(routeMatches).flatMap(r=>r.data):[];}
 function updateOverlayVisibility(){
  routeRoot.visible=enabled&&!suspended;
  for(const r of routeRecords){
   const show=enabled&&routeMatches(r);r.line.visible=show&&linesOn&&!guideOn&&r.hasSegments;r.outline.visible=r.line.visible;r.cloud.visible=show&&pointsOn;
   for(const obj of [r.line,r.outline,r.cloud])obj.material.depthTest=!xray;
   r.line.material.linewidth=3.5;r.outline.material.linewidth=6.5;r.cloud.material.uniforms.pixelSize.value=selectedMeridians.size>3?8:12;
   for(const g of r.guides){g.guide.visible=show&&guideOn&&linesOn;g.border.visible=g.guide.visible;g.guide.material.depthTest=!xray;g.border.material.depthTest=!xray;}
  }
  if(selectedMarker){selectedMarker.visible=enabled&&!suspended&&pointsOn&&!!selectedPoint?.position;selectedMarker.material.depthTest=!xray;}
  const active=routeRecords.filter(routeMatches),gn=active.reduce((n,r)=>n+r.guides.length,0);
  if($('guideCoverage')){const std=ctx.ACUPOINTS.filter(p=>selectedMeridians.has(p.meridian)&&p.meridian!=='EX');$('guideCoverage').textContent=`所选十四经：${std.length} / ${[...selectedMeridians].reduce((n,m)=>n+(COUNTS[m]||0),0)}个穴名，${std.filter(p=>p.position).length}个教学位置；${gn}段体表导览。坐标为示意，未作临床校准。`;}
  lastLabelRebuild='';updateStatus();
 }
 function rebuildRegions(){const previous=$('focusRegionSelect').value;const keys=[...new Set(ctx.ACUPOINTS.filter(p=>selectedMeridians.has(p.meridian)).map(p=>p.region))];$('focusRegionSelect').innerHTML='<option value="all">整条经脉</option>'+keys.map(k=>`<option value="${k}">${REGION_NAMES[k]||k}</option>`).join('');$('focusRegionSelect').value=keys.includes(previous)?previous:'all';}
 function restoreForFocus(){
  const displaced=state.explode>0||state.isolated||[...bones.values()].some(b=>b.userData.offset.lengthSq()>.1||b.quaternion.angleTo(new THREE.Quaternion())>.015);
  if(displaced){ctx.restore();toast('为正确对照位置，已恢复骨骼原位');}
  suspended=false;ctx.setMode('orbit');setRegion('body',false);setSide('both');
  enabled=true;pointsOn=true;namesOn=true;$('acupointToggle').classList.add('active');$('pointNamesToggle').classList.add('active');updateOverlayVisibility();
 }
 function focusSet(points,view){
  if(!points.length)return false;restoreForFocus();if(compact())setPanel(false);document.body.classList.remove('detail-open','nav-open');
  const ticket=++focusSerial,box=new THREE.Box3().setFromPoints(points).expandByScalar(view?.half||32);
  const orient=view||{dir:((selectedMeridians.size===1&&['GV','BL'].includes([...selectedMeridians][0]))?[0,.06,-1]:[0,.08,1]),up:[0,1,0]};
  activeFocusBox=box.clone();activeFocusView=orient;lastFocus={kind:'region',target:box.getCenter(new THREE.Vector3()).toArray(),serial:ticket};
  const apply=()=>{if(ticket!==focusSerial)return;ctx.focusBounds(box,{direction:new THREE.Vector3(...orient.dir),up:new THREE.Vector3(...orient.up)});lastLabelRebuild='';};
  apply();requestAnimationFrame(()=>requestAnimationFrame(apply));return true;
 }
 function fitMeridian(view=null){
  const records=routeRecords.filter(routeMatches),pts=records.flatMap(r=>[...r.data.map(p=>p.position),...r.guides.flatMap(g=>g.points)]);
  if(!pts.length){setRegion('head');ctx.setView('front');toast('经外补充：目前仅有头面目录，未生成精准点位');return false;}
  selectedRoute=null;return focusSet(pts,view);
 }
 function focusPoint(p){
  if(p?.isVector3)p=selectedPoint&&selectedPoint.position===p?selectedPoint:{position:p,region:'head',side:'right'};
  if(!p?.position){setRegion('head');ctx.setView('front');lastFocus={kind:'region-only',code:p?.code,region:'head'};toast('已转到头面区域；此补充条目尚无点位，不冒充精准聚焦');return false;}
  focusSet([p.position],viewFor(p));lastFocus={kind:'educational-point',code:p.code,side:p.side,target:p.position.toArray(),clinicalCalibration:false};return true;
 }
 function renderResults(){const q=normalize($('acupointSearch').value);const arr=ctx.ACUPOINTS.filter(p=>(q||selectedMeridians.has(p.meridian))&&(!q||normalize([p.code,p.name,p.pinyin,p.meridianName].join(' ')).includes(q)));$('pointResultCount').textContent=`${arr.length}项 · ${arr.filter(p=>p.mapped).length}有教学位置`;const savedScroll=$('acupointResults').scrollTop;
 $('acupointResults').innerHTML=arr.map(p=>`<button data-point="${p.code}" class="${selectedPoint?.code===p.code?'active':''}"><b>${p.name}<small>${p.pinyin}</small></b><span>${p.code}<small>${p.mapped?'教学示意位置':'仅区域导航'}</small></span></button>`).join('')||'<p class="empty-search">没有找到</p>';$('acupointResults').scrollTop=savedScroll;
 $('acupointResults').querySelectorAll('button').forEach(b=>b.onclick=()=>{const p=ctx.ACUPOINTS.find(p=>p.code===b.dataset.point);if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);toggleTCM(true);const side=PAIR.has(p.meridian)||p.side==='paired'?(tcmSide==='left'?'left':'right'):'midline';selectPoint(pointIndex.get(p.code+'|'+side)||{...p,side,position:null},true);});}
 function nearestBones(pos){return [...bones].map(([id,b])=>{const bb=b.geometry.boundingBox.clone().translate(b.userData.home);return {id,d:bb.distanceToPoint(pos)};}).sort((a,b)=>a.d-b.d).slice(0,3);}
 function clearSelectedMarker(){if(selectedMarker){routeRoot.remove(selectedMarker);selectedMarker.geometry.dispose();selectedMarker.material.dispose();selectedMarker=null;}lastLabelRebuild='';}
 function selectPoint(p,focus=true){if(!p?.name||!p?.code)return false;if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);if(p.side!=='midline'&&tcmSide!=='both'&&p.side!==tcmSide)setTCMSide(p.side);selectedRoute=null;enabled=true;pointsOn=true;namesOn=true;selectedPoint=p;clearSelectedMarker();updateOverlayVisibility();
 if(p.position){selectedMarker=new THREE.Points(new THREE.BufferGeometry().setFromPoints([p.position]),makePointMaterial('#d37022',20));selectedMarker.renderOrder=30;routeRoot.add(selectedMarker);selectedMarker.visible=enabled&&!suspended&&pointsOn;}
 const m=meridianMap[p.meridian];cardOpen=true;card.hidden=false;document.body.classList.remove('tissue-detail-active');if($('tissueDetail'))$('tissueDetail').hidden=true;
 card.innerHTML=`<div class="tcm-card-head"><span>${m.name} · ${p.code}</span><button id="closePointCard">收起</button></div><h3>${p.name}<small>${p.pinyin} · ${p.side==='left'?'人体左侧':p.side==='right'?'人体右侧':'中线／组合'}</small></h3><h4>教学位置与体表定位说明</h4><p class="location-text">${p.locationNote||'此条目已收录名称与归经，位置说明待逐条复核，暂不绘制三维点。'}</p><p class="coordinate-warning">${p.position?'此点是项目设置的模型教学位置，不是经过临床验证的取穴坐标。标准定位文字、骨度分寸与本模型坐标须区分；现无完整皮肤配准。':'缺少相应标志或尚未标注：不生成假坐标，不自动跳到别的骨头。'}</p>${p.sourceScheme?`<small>${p.sourceScheme}</small>`:''}<div class="tcm-card-actions"><button id="focusPointBtn" ${p.position?'':'disabled'}>聚焦参考点</button><button id="speakPointBtn">朗读穴名</button></div><div class="point-step"><button id="pointPrev">上一穴</button><button id="pointNext">下一穴</button></div><details class="bone-reference"><summary>说明涉及的骨性标志（非最近距离猜测）</summary>${(p.landmarks||[]).filter(id=>BY_ID[id]).map(id=>`<button data-near="${id}">${BY_ID[id].name}</button>`).join('')||'待补充'}</details><p><a class="reference-link" href="${p.reference||'https://iris.who.int/handle/10665/353407'}" target="_blank" rel="noopener">查阅定位资料来源 ↗</a></p>`;
 $('closePointCard').onclick=()=>{card.hidden=true;cardOpen=false;document.body.classList.remove('detail-open','point-detail-active');};$('focusPointBtn').onclick=()=>focusPoint(p);$('speakPointBtn').onclick=()=>speak(p.name);$('pointPrev').onclick=()=>stepPoint(-1);$('pointNext').onclick=()=>stepPoint(1);card.querySelectorAll('[data-near]').forEach(b=>b.onclick=()=>{let id=b.dataset.near;if(p.side==='left'){const orig=BY_ID[id];id=BONES.find(b=>b.baseId===orig.baseId&&b.side==='left')?.id||id;}selectBone(id,true,true);});renderResults();updateStatus();lastLabelRebuild='';
 if(focus){focusPoint(p);if(compact())setPanel(false);}if(autoSpeak())speak(p.name);return true;
 }
 function stepPoint(d){if(!selectedPoint)return;const a=ctx.ACUPOINTS.filter(p=>p.meridian===selectedPoint.meridian),i=a.findIndex(p=>p.code===selectedPoint.code),next=a[(i+d+a.length)%a.length];selectPoint(pointIndex.get(next.code+'|'+selectedPoint.side)||{...next,side:selectedPoint.side,position:null},true);}
 function project(p){const v=p.position.clone().project(camera),r=viewport.getBoundingClientRect();return {x:r.left+(v.x*.5+.5)*r.width,y:r.top+(-v.y*.5+.5)*r.height,z:v.z};}
 function pointUnoccluded(p){
  if(xray)return true;
  const candidates=[];scene.traverse(n=>{if(!n.isMesh||!n.visible||(!n.userData.atlas&&!bones.has(n.name))||n.material.opacity<.5)return;let parent=n.parent;while(parent){if(!parent.visible)return;parent=parent.parent;}candidates.push(n);});
  if(!candidates.length)return true;const delta=p.position.clone().sub(camera.position),distance=delta.length();const ray=new THREE.Raycaster(camera.position,delta.normalize(),0,Math.max(0,distance-2));return ray.intersectObjects(candidates,false).length===0;
 }
 function hitPoint(e){if(!enabled||suspended||!pointsOn)return null;let best=null,bestD=e.pointerType==='touch'?23:14;for(const p of getVisiblePoints()){const v=project(p);if(v.z< -1||v.z>1)continue;const d=Math.hypot(e.clientX-v.x,e.clientY-v.y);if(d<bestD&&pointUnoccluded(p)){bestD=d;best=p;}}return best;}
 function hitRoute(e){
  if(!enabled||suspended||!linesOn)return null;let best=null,limit=e.pointerType==='touch'?16:8;
  for(const r of routeRecords.filter(routeMatches))for(const g of r.guides)if(g.guide.visible)for(let i=1;i<g.points.length;i++){
   const a=project({position:g.points[i-1]}),b=project({position:g.points[i]});if(a.z< -1||a.z>1||b.z< -1||b.z>1)continue;
   const dx=b.x-a.x,dy=b.y-a.y,len=dx*dx+dy*dy;if(len<.01)continue;const t=Math.max(0,Math.min(1,((e.clientX-a.x)*dx+(e.clientY-a.y)*dy)/len));const d=Math.hypot(e.clientX-a.x-t*dx,e.clientY-a.y-t*dy);
   if(d<limit){limit=d;best={meridian:r.meridian,side:r.side,position:g.points[i-1].clone().lerp(g.points[i],t)};}
  }return best;
 }
 function handlePointerClick(e){if(state.mode!=='orbit'||e.button!==0)return false;const p=hitPoint(e);if(p)return selectPoint(p,true);const r=hitRoute(e);if(!r)return false;
  selectedPoint=null;clearSelectedMarker();selectedRoute=r;cardOpen=true;card.hidden=false;const m=meridianMap[r.meridian];
  card.innerHTML=`<div class="tcm-card-head"><b>${m.name} · 走向段</b><button id="closePointCard">收起</button></div><p>你选中的是经脉导览线，不是穴位。虚线只表示教学走向，不代表实体组织或完整内行分支。</p><button id="routeFit">返回整条经脉</button>`;
  $('closePointCard').onclick=()=>{cardOpen=false;card.hidden=true;};$('routeFit').onclick=()=>fitMeridian();
  focusSet([r.position],{dir:['GV','BL'].includes(r.meridian)?[0,.06,-1]:[0,.08,1],up:[0,1,0],half:125});updateStatus();return true;
 }
 viewport.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch'||performance.now()-lastHover<70){hover.hidden=true;return;}lastHover=performance.now();const p=hitPoint(e);hoveredPoint=p;if(!p){hover.hidden=true;return;}const r=viewport.getBoundingClientRect();hover.textContent=`${p.name} · ${p.pinyin} · ${p.code}`;hover.style.left=Math.min(e.clientX-r.left+15,r.width-210)+'px';hover.style.top=Math.max(8,e.clientY-r.top-38)+'px';hover.hidden=false;$('hoverTip').hidden=true;},{passive:true});
 viewport.addEventListener('pointerleave',()=>hover.hidden=true);
 function updateFrame(){
  const w=viewport.clientWidth,h=viewport.clientHeight,dpr=renderer.getPixelRatio(),sz=`${w},${h},${dpr}`;
  if(sz!==lastSize){lastSize=sz;for(const r of routeRecords){r.line.material.resolution.set(w,h);r.outline.material.resolution.set(w,h);r.cloud.material.uniforms.pixelRatio.value=dpr;for(const g of r.guides){g.guide.material.resolution.set(w,h);g.border.material.resolution.set(w,h);}}if(selectedMarker)selectedMarker.material.uniforms.pixelRatio.value=dpr;}
  const displaced=state.explode>0||[...bones.values()].some(b=>b.userData.offset.lengthSq()>.1);document.body.classList.toggle('anatomy-displaced',displaced&&enabled);
  const key=[enabled,pointsOn,namesOn,[...selectedMeridians].join(','),suspended,tcmSide,selectedPoint?.code,selectedPoint?.side,labelMode].join('|');
  if(key!==lastLabelRebuild){lastLabelRebuild=key;labels.replaceChildren();leaders.replaceChildren();labelNodes.length=0;
   let arr=namesOn?(labelMode==='selected'?[]:getVisiblePoints()):[];
   if(selectedPoint?.position&&enabled&&!suspended&&pointsOn&&!arr.includes(selectedPoint))arr=[selectedPoint,...arr];
   for(const p of arr){const el=document.createElement('button');el.type='button';el.className='acu-name'+(p===selectedPoint?' selected':'');el.dataset.acuLabel=p.code;el.dataset.side=p.side;el.title=`${p.name} ${p.pinyin} ${p.code} · 点击聚焦教学位置`;el.textContent=`${p.side==='midline'?'':p.side==='left'?'左·':'右·'}${p.name} ${p.code}`;el.onclick=e=>{e.stopPropagation();selectPoint(p,true);};labels.append(el);const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('stroke',meridianMap[p.meridian].color);line.setAttribute('stroke-width',p===selectedPoint?'1.5':'.75');line.setAttribute('opacity',p===selectedPoint?'.9':'.45');leaders.append(line);labelNodes.push({p,el,line});}
  }
  if(performance.now()-lastLabelTime<65)return;lastLabelTime=performance.now();
  const rect=viewport.getBoundingClientRect(),toolbarBottom=document.querySelector('.study-toolbar').getBoundingClientRect().bottom,statusBottom=status.hidden?0:status.getBoundingClientRect().bottom;
  const top=Math.max(70,Math.max(toolbarBottom,statusBottom)-rect.top+8),dock=document.querySelector('.control-dock'),dockTop=document.body.classList.contains('dock-collapsed')?h-64:dock.getBoundingClientRect().top-rect.top;
  const bottom=Math.max(top+60,Math.min(h-70,dockTop-18));let candidates=[];
  for(const item of labelNodes){item.el.hidden=true;item.line.style.display='none';const v=project(item.p);if(v.z< -1||v.z>1||v.x<rect.left||v.x>rect.right||v.y<rect.top||v.y>rect.bottom)continue;candidates.push({...item,x:v.x-rect.left,y:v.y-rect.top});}
  const allCount=candidates.length,capacity=Math.max(6,Math.floor((bottom-top)/24)*2);
  if(labelMode==='auto'&&candidates.length>capacity){candidates.sort((a,b)=>(a.p===selectedPoint?-1:0)-(b.p===selectedPoint?-1:0)||Math.abs(a.y-h/2)-Math.abs(b.y-h/2));candidates=candidates.slice(0,capacity);}
  candidates.sort((a,b)=>a.y-b.y);const cols=[[],[]];for(const item of candidates){let side=item.x<w*.5?0:1;if(Math.abs(cols[0].length-cols[1].length)>4)side=cols[0].length<cols[1].length?0:1;cols[side].push(item);}
  for(let side=0;side<2;side++){const list=cols[side],step=Math.min(26,(bottom-top)/Math.max(1,list.length)),labelW=w<500?109:130,x=side?Math.max(0,w-labelW-10):10;let y=top-step;
   for(const a of list){a.ly=Math.max(top,Math.min(bottom,a.y-10),y+step);y=a.ly;}
   for(let i=list.length-1;i>=0;i--)list[i].ly=Math.min(list[i].ly,i===list.length-1?bottom:list[i+1].ly-step);
   for(const a of list){a.el.hidden=false;a.el.style.transform=`translate(${x}px,${a.ly}px)`;a.el.style.maxWidth=labelW+'px';a.el.style.fontSize=step<17?'10px':'';a.line.style.display='';a.line.setAttribute('x1',a.x);a.line.setAttribute('y1',a.y);a.line.setAttribute('x2',side?x:x+labelW);a.line.setAttribute('y2',a.ly+10);}
  }
  labelStats={shown:candidates.length,inFrame:allCount,total:getVisiblePoints().length};labelInfo.hidden=!enabled||suspended;
  labelInfo.textContent=`穴名 ${candidates.length}/${allCount} 在屏 · 所选${getVisiblePoints().length}个双侧标记 · 查看完整目录`;

 }
 $('meridianQuick').add(new Option('多经脉对照','MULTI'));setMeridians(['KI']);renderResults();updateStatus();
 window.__ATLAS_LEARNING__={setMeridians,suspend:value=>{if(suspended!==value){suspended=value;updateOverlayVisibility();}},getReferences:()=>ctx.ACUPOINTS.map(p=>({code:p.code,name:p.name,pinyin:p.pinyin,mapped:p.mapped,region:p.region,hasPosition:!!p.position,placementKind:p.placementKind,position:p.position})),handlePointerClick,hitPoint,hitRoute,refocusAfterResize:()=>{if(!enabled||!activeFocusBox)return false;ctx.focusBounds(activeFocusBox,{direction:new THREE.Vector3(...activeFocusView.dir),up:new THREE.Vector3(...activeFocusView.up)});return true;},setLabelMode:mode=>{if(['auto','all','selected'].includes(mode)){labelMode=mode;$('labelMode').value=mode;lastLabelRebuild='';}},getRouteScreen:(m,side='right')=>{const r=routeRecords.find(r=>r.meridian===m&&(r.side===side||r.side==='midline'));const g=r?.guides[0];return g?g.points.map(p=>project({position:p})):[];},toggleTCM,setPanel,setMeridian,setTCMSide,fitMeridian,runPreset,updateFrame,selectPoint:(code,side='right',focus=true)=>selectPoint(pointIndex.get(code+'|'+side)||pointIndex.get(code+'|midline')||{...ctx.ACUPOINTS.find(p=>p.code===code),side,position:null},focus),getPointScreen:(code,side='right')=>{const p=pointIndex.get(code+'|'+side)||pointIndex.get(code+'|midline');return p?.position?project(p):null;},speakBone:id=>speak(BY_ID[id]?.name),getState:()=>({lastFocus,labelStats,labelMode,focusSerial,selectedRoute:selectedRoute&&{meridian:selectedRoute.meridian,side:selectedRoute.side},guideOn,routeDiagnostics:routeRecords.filter(routeMatches).map(r=>({meridian:r.meridian,side:r.side,referencePoints:r.data.length,connected:r.hasSegments,guideCount:r.guides.length,guideVertices:r.guides.reduce((n,g)=>n+g.points.length,0),visible:enabled&&!suspended&&(r.line.visible||r.guides.some(g=>g.guide.visible))})),version:'6.0',selectedMeridians:[...selectedMeridians],suspended,legacyEqualSpacingRemoved:true,clinicalCalibration:false,enabled,panelOpen,linesOn,pointsOn,namesOn,xray,tcmSide,activeMeridian,selectedPoint:selectedPoint&&{code:selectedPoint.code,name:selectedPoint.name,side:selectedPoint.side},cardOpen,statusVisible:!status.hidden,meridians:14,supplementalNames:12,standardAcupoints:361,annotatedNames:ctx.ACUPOINTS.filter(p=>p.mapped).length,markerInstances:routeRecords.reduce((n,r)=>n+r.data.length,0),visiblePoints:getVisiblePoints().length,routes:routeRecords.length,autoSpeak:autoSpeak(),lineWidthPixels:activeMeridian==='ALL'?2.2:3.5,pointSizePixels:activeMeridian==='ALL'?7:11})};
 return window.__ATLAS_LEARNING__;
}
