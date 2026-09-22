const REGION_LABELS={foot:['足部','Feet'],ankle:['足踝连接','Ankles'],leg:['小腿与足','Lower legs & feet'],knee:['膝部骨骼','Knees'],whole:['下肢全览','Lower limbs'],hip:['髋部连接','Hip joints'],pelvis:['骨性骨盆','Bony pelvis'],'pelvic-limb':['骨盆与下肢','Pelvis & lower limbs'],lumbar:['腰椎 L1—L5','Lumbar spine'],lumbosacral:['腰骶与骨盆','Lumbosacral & pelvis'],all:['腰椎、骨盆与双下肢','Lumbar spine & lower limbs']};
const UPPER_REGIONS=new Set(['whole','knee','hip','pelvis','pelvic-limb','lumbar','lumbosacral','all']);
const FIXED_REGIONS=new Set(['pelvis','lumbar','lumbosacral']);
const regionNames={foot:'足部',ankle:'足踝',leg:'小腿与足',knee:'膝部',whole:'下肢全览',hip:'髋部',pelvis:'骨盆','pelvic-limb':'骨盆与下肢',lumbar:'腰椎',lumbosacral:'腰骶与骨盆',all:'腰椎与双腿'};
function regionContains(id){
 const b=BY_ID[id];if(!b)return false;
 const g=b.group,base=b.baseId,sideOK=state.side==='both'||b.side===state.side;
 switch(state.region){
  case 'lumbar':return g==='lumbar';
  case 'lumbosacral':return g==='lumbar'||g==='pelvis';
  case 'pelvis':return g==='pelvis';
  case 'all':return g==='pelvis'||g==='lumbar'||sideOK;
  case 'pelvic-limb':return g==='pelvis'||(g!=='lumbar'&&sideOK);
  case 'hip':return sideOK&&(base==='femur'||id==='hip-right'||id==='hip-left');
  case 'whole':return g!=='pelvis'&&g!=='lumbar'&&sideOK;
  case 'knee':return sideOK&&['femur','patella','tibia','fibula'].includes(base);
  case 'leg':case 'ankle':return !['lumbar','pelvis','thigh'].includes(g)&&sideOK;
  case 'foot':return !['lumbar','pelvis','thigh','leg'].includes(g)&&sideOK;
  default:return false;
 }
}
function defaultSelection(){return BONES.find(b=>regionContains(b.id))?.id||'L5';}
function updateRegionUI(){
 scene.background.set('#eff2e9');if(UPPER_REGIONS.has(state.region))scene.background.multiplyScalar(2.0);
 camera.far=UPPER_REGIONS.has(state.region)?16000:6500;camera.updateProjectionMatrix();
 document.querySelectorAll('[data-region]').forEach(el=>{el.classList.toggle('active',el.dataset.region===state.region);el.setAttribute('aria-pressed',String(el.dataset.region===state.region));});
 document.querySelectorAll('[data-side]').forEach(el=>{el.classList.toggle('active',el.dataset.side===state.side);el.setAttribute('aria-pressed',String(el.dataset.side===state.side));el.disabled=FIXED_REGIONS.has(state.region);});
 const [cn,en]=REGION_LABELS[state.region],suffix=FIXED_REGIONS.has(state.region)?'':state.side==='both'?'双侧':state.side==='right'?'人体右侧':'人体左侧';
 $('regionHeading').innerHTML=(state.region==='all'&&state.side!=='both'?'腰椎、骨盆与'+(state.side==='right'?'右':'左')+'下肢':cn)+' <span>'+en+'</span>';
 $('regionHint').textContent={foot:'每足 28 块（含 2 块籽骨）',ankle:'聚焦踝部 · 小腿未截短',leg:'完整胫腓骨与足部',knee:'聚焦膝部 · 长骨未截短',whole:'从完整股骨到足趾',hip:'髋骨与股骨头的骨性衔接',pelvis:'左右髋骨、骶骨、尾骨',lumbar:'五节腰椎逐一观察 · 不含椎间盘',lumbosacral:'L1—L5、骶尾骨与左右髋骨','pelvic-limb':'骨盆与下肢，不显示腰椎',all:'双腿已补齐 · 腰椎接至骨盆'}[state.region]+(suffix?' · '+suffix:'');
 $('sideNotice').textContent='左右均指人体自身；正面看：人体右侧在画面左边。';
 const upper=UPPER_REGIONS.has(state.region),globalSide=FIXED_REGIONS.has(state.region)||state.side==='both';
 document.querySelector('[data-view="dorsal"]').textContent=upper?'上方':'足背';
 document.querySelector('[data-view="plantar"]').textContent=upper?'下方':'足底';
 document.querySelector('[data-view="front"]').textContent=upper?'前面':'趾端';
 document.querySelector('[data-view="medial"]').textContent=globalSide?'人体左面':'内侧';
 document.querySelector('[data-view="lateral"]').textContent=globalSide?'人体右面':'外侧';
}
function setSide(side){
 if(!['both','right','left'].includes(side)||!state.ready)return;
 state.side=side;state.isolated=false;state.neighbors=false;
 if(!regionContains(state.selected)){
  const b=BY_ID[state.selected],candidate=side==='left'?b.baseId+'-left':b.baseId;
  state.selected=regionContains(candidate)?candidate:defaultSelection();
 }
 updateRegionUI();setExplode(state.explode,false);applyVisibility();selectBone(state.selected,true);setView('overview');
}
function setRegion(region,refit=true){
 if(!state.ready||!REGION_LABELS[region])return;
 state.region=region;state.isolated=false;state.neighbors=false;
 if(!regionContains(state.selected))state.selected=defaultSelection();
 updateRegionUI();setExplode(state.explode,false);applyVisibility();selectBone(state.selected,true);if(refit)setView('overview');
}
function revealBone(id){
 if(!state.ready||regionContains(id))return;
 const b=BY_ID[id];state.isolated=false;state.neighbors=false;
 if(b.group==='lumbar')state.region='lumbar';
 else if(b.group==='pelvis')state.region='pelvis';
 else{
  if(state.side!=='both'&&state.side!==b.side)state.side=b.side;
  if(!regionContains(id))state.region=b.group==='thigh'?'knee':b.group==='leg'?'leg':'foot';
 }
 updateRegionUI();applyVisibility();setView('overview');
}
const VIEWS={overview:{dir:[1,.9,1.18],up:[0,1,0],name:'立体视角'},dorsal:{dir:[0,1,.001],up:[0,0,1],name:'足背 · 从上往下看'},plantar:{dir:[0,-1,.001],up:[0,0,1],name:'足底 · 从下往上看'},medial:{dir:[1,.04,0],up:[0,1,0],name:'内侧 · 拇趾侧'},lateral:{dir:[-1,.04,0],up:[0,1,0],name:'外侧 · 小趾侧'},front:{dir:[0,.1,1],up:[0,1,0],name:'趾端 · 朝向脚跟'},back:{dir:[0,.08,-1],up:[0,1,0],name:'后面 · 从后往前看'}};
function setView(name){
 if(!state.ready||!VIEWS[name])return;
 const v={...VIEWS[name],dir:[...VIEWS[name].dir]},damping=controls.enableDamping,upper=UPPER_REGIONS.has(state.region),globalSide=FIXED_REGIONS.has(state.region)||state.side==='both';
 if(name==='overview'){
  if(state.region==='leg')v.dir=[-1,.85,1.35];
  if(upper)v.dir=['lumbar','lumbosacral'].includes(state.region)?[-.9,.32,1.6]:[-.48,.18,1.9];
  if(state.region==='hip')v.dir=[-1,.24,1.6];
  if(state.side==='left'&&!FIXED_REGIONS.has(state.region))v.dir[0]*=-1;
 }
 if(name==='medial'||name==='lateral'){
  if(globalSide)v.name=name==='medial'?'人体左面 · 从左侧看':'人体右面 · 从右侧看';
  else{if(state.side==='left')v.dir[0]*=-1;v.name=(state.side==='left'?'左侧肢体 · ':'右侧肢体 · ')+(name==='medial'?'内侧朝向身体中线':'外侧远离身体中线');}
 }
 if(upper){if(name==='front'){v.dir=[0,.015,1];v.name='正面 · 人体右侧在画面左边';}if(name==='dorsal')v.name='上方 · 从上往下看';if(name==='plantar')v.name='下方 · 从下往上看';}
 cameraTween=null;controls.enableDamping=false;controls.update();state.view=name;
 document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$('viewBadge').lastElementChild.textContent=v.name;
 try{fitToContent(false,new THREE.Vector3(...v.dir),new THREE.Vector3(...v.up));}finally{controls.enableDamping=damping;}
}
function scopedFocusBox(box,onlySelected){
 if(state.isolated||onlySelected||state.explode!==0||[...bones.values()].some(isManuallyMoved))return;
 if(!['ankle','knee','hip'].includes(state.region))return;
 const visible=[...bones].filter(([id,b])=>b.visible);
 box.makeEmpty();
 for(const [id,b]of visible){
  const data=BY_ID[id],bounds=new THREE.Box3().setFromObject(b);
  if(state.region==='ankle'){if(data.group==='leg')bounds.max.y=Math.min(bounds.max.y,b.userData.home.y+b.geometry.boundingBox.min.y+145);}
  if(state.region==='knee'){
   if(data.baseId==='femur')bounds.max.y=bounds.min.y+155;
   if(['tibia','fibula'].includes(data.baseId))bounds.min.y=bounds.max.y-150;
  }
  if(state.region==='hip'&&data.baseId==='femur')bounds.min.y=bounds.max.y-180;
  box.union(bounds);
 }
 box.expandByScalar(10);
}
