import {lookupTerm} from './catalog-v10.js';
const safeKinds=new Set(['point','meridian','bone','tissue','region']);
const profiles=new Set(['bones','muscles','nerves','compare']);
const clone=o=>JSON.parse(JSON.stringify(o));
export function initStability(ctx){
 const {learning,tissues,speech,viewport,renderer,toast,invalidate}=ctx,$=id=>document.getElementById(id);
 let current={kind:'bone',id:'sternum',name:ctx.boneInfo('sternum').name,side:'midline'},lastTarget=null,lastCapture=null,restoring=false,restoreSerial=0;
 const box=document.createElement('section');box.className='current-study';box.id='currentStudy';
 box.innerHTML='<small>当前学习对象</small><h3 id="currentStudyName"></h3><p id="currentStudyMode"></p><div class="v10-current-actions"><button id="focusCurrent">聚焦当前</button><button id="overallCurrent">返回整体</button><button id="backCurrent" disabled>返回上次</button><button id="speakCurrent">朗读名称</button></div><div class="v10-current-links"><a id="evidenceCurrent" href="evidence.html">查阅说明</a><button id="shareCurrent">复制当前链接</button><a href="calibration.html">定位工作台</a></div>';
 document.querySelector('.detail-scroll').prepend(box);
 const status=document.createElement('span');status.className='v10-live-status';status.setAttribute('aria-live','polite');status.setAttribute('role','status');box.append(status);
 function linkFor(target=current,base='./'){
  const u=new URL(base,location.href),hash=new URLSearchParams({kind:target.kind,id:target.id,side:target.side||'both',mode:learning.getState().precisionMode,layer:tissues.getState().profile});
  u.hash=hash.toString();return u.href;
 }
 function update(){
  document.body.dataset.currentKind=current.kind;
  $('currentStudyName').textContent=current.name||current.id;
  const p=learning.getState().precisionMode;
  $('currentStudyMode').textContent=(current.kind==='point'||current.kind==='meridian')?(p==='strict'?'资料查阅 · 未显示未校准坐标':'三维示意 · 未校准位置'):'解剖结构 · 当前模型教学观察';
  $('evidenceCurrent').href=linkFor(current,'evidence.html');$('evidenceCurrent').textContent=current.kind==='point'||current.kind==='meridian'?'查阅同一条目 ↗':'查阅经穴资料 ↗';
  $('backCurrent').disabled=!lastTarget;
  $('speakCurrent').disabled=current.kind==='region';
  status.textContent='当前：'+current.name;
  if(!restoring&&location.protocol!=='file:')try{history.replaceState(null,'',linkFor());}catch{}
  invalidate();
 }
 function adopt(target){
  if(!target||!safeKinds.has(target.kind)||!target.id)return;
  if(!restoring&&current.kind!=='region'&&(current.kind!==target.kind||current.id!==target.id||current.side!==target.side))lastTarget={...current,mode:learning.getState().precisionMode,layer:tissues.getState().profile};
  current={kind:target.kind,id:String(target.id),name:target.name||lookupTerm(target.id)?.name||target.id,side:target.side||'both'};update();
 }
 window.addEventListener('atlas:selection',e=>adopt(e.detail));
 window.addEventListener('atlas:bone-selected',e=>{if(e.detail?.user){const b=ctx.boneInfo(e.detail.id);adopt({kind:'bone',id:b.id,name:b.name,side:b.side});}});
 window.addEventListener('atlas:region-changed',e=>adopt({kind:'region',id:e.detail.region,name:e.detail.name,side:e.detail.side}));
 window.addEventListener('atlas:precision-changed',update);window.addEventListener('atlas:profile-changed',update);
 async function navigate(target){
  const serial=++restoreSerial;restoring=true;
  try{
   if(target.mode)learning.setPrecisionMode(target.mode==='illustrative'?'illustrative':'strict');
   if(target.kind==='point')learning.selectPoint(target.id,target.side||'right',true);
   else if(target.kind==='meridian'){learning.clearStudyContext(true);learning.setMeridians(target.id.split(',').filter(id=>/^(LU|LI|ST|SP|HT|SI|BL|KI|PC|TE|GB|LR|GV|CV|EX)$/.test(id)));learning.setTCMSide(target.side||'both');learning.toggleTCM(true);learning.fitMeridian();}
   else if(target.kind==='bone'&&ctx.boneInfo(target.id))ctx.focusBone(target.id);
   else if(target.kind==='region')ctx.setRegion(target.id);
   else if(target.kind==='tissue'){const known=tissues.getCatalog().find(t=>t.id===target.id);if(!known){await tissues.enable('muscular',true);await tissues.enable('nervous',true);}if(serial===restoreSerial)tissues.choose(target.id,true);}
   if(serial===restoreSerial&&target.layer&&profiles.has(target.layer))await tissues.setProfile(target.layer);
  }finally{if(serial===restoreSerial){restoring=false;update();}}
 }
 function focusCurrent(){
  if(current.kind==='point')return learning.selectPoint(current.id,current.side||'right',true);
  if(current.kind==='meridian'){learning.fitMeridian();return true;}
  if(current.kind==='bone'){ctx.focusBone(current.id);return true;}
  if(current.kind==='tissue')return tissues.choose(current.id,true);
  ctx.setRegion(current.id);return true;
 }
 $('focusCurrent').onclick=focusCurrent;$('overallCurrent').onclick=ctx.returnToOverview;
 $('backCurrent').onclick=()=>{if(lastTarget){const to={...lastTarget},from={...current};navigate(to).then(()=>{lastTarget=from;update();}).catch(e=>toast('返回失败：'+e.message));}};
 $('speakCurrent').onclick=()=>speech.speak(current.name);
 $('shareCurrent').onclick=async()=>{const url=linkFor();try{await navigator.clipboard.writeText(url);toast('已复制当前条目、左右侧与观察模式');}catch{const t=document.createElement('textarea');t.value=url;t.style.position='fixed';t.style.top='0';box.append(t);t.select();try{document.execCommand('copy');toast('已复制当前链接');}catch{toast('可复制地址栏中的当前链接');}t.remove();}};
 document.addEventListener('keydown',e=>{if(e.target.closest?.('input,textarea,select,[contenteditable]')||e.ctrlKey||e.altKey||e.metaKey||document.querySelector('dialog[open]'))return;if(['g','t'].includes(e.key.toLowerCase())&&current.kind!=='bone'){e.preventDefault();e.stopImmediatePropagation();toast('先选中一块骨骼，再使用拆骨或转骨');}},true);
 function parseHash(){const h=new URLSearchParams(location.hash.slice(1));const kind=h.get('kind'),id=h.get('id');if(!safeKinds.has(kind)||!id||id.length>240)return null;return{kind,id,side:['right','left','both','midline'].includes(h.get('side'))?h.get('side'):'right',mode:h.get('mode')==='illustrative'?'illustrative':'strict',layer:profiles.has(h.get('layer'))?h.get('layer'):'bones'};}
 async function restoreHash(){const p=parseHash();if(p)await navigate(p);}
 const initial=parseHash();
 window.addEventListener('hashchange',()=>restoreHash().catch(e=>toast('链接恢复失败：'+e.message)));
 // Capture the rendered scene plus exactly the currently visible labels and their leaders.
 async function capture(){
  await document.fonts?.ready;ctx.flushLabels();ctx.renderNow();
  const source=renderer.domElement,r=viewport.getBoundingClientRect(),scale=source.width/r.width;
  const canvas=document.createElement('canvas');canvas.width=source.width;canvas.height=source.height;
  const g=canvas.getContext('2d');if(!g)throw Error('设备未提供截图画布');g.drawImage(source,0,0);
  const visible=e=>{if(!e||e.hidden)return false;const style=getComputedStyle(e),b=e.getBoundingClientRect();return style.display!=='none'&&style.visibility!=='hidden'&&b.width>0&&b.height>0&&b.right>r.left&&b.left<r.right&&b.bottom>r.top&&b.top<r.bottom;};
  g.save();g.scale(scale,scale);g.beginPath();g.rect(0,0,r.width,r.height);g.clip();
  const svg=document.querySelector('.acupoint-label-wires');
  if(svg&&visible(svg)&&visible(svg.parentElement)){g.lineWidth=.7;for(const p of svg.querySelectorAll('path')){g.strokeStyle=p.classList.contains('active')?'#a76b25':'#929d91';try{g.stroke(new Path2D(p.getAttribute('d')||''));}catch{}}}
  const captured=[];
  for(const el of viewport.querySelectorAll('.bone-label,.acu-name,.area-focus-tag,.head-area-tag,.reference-area-tag')){
   if(!visible(el))continue;const b=el.getBoundingClientRect(),x=b.left-r.left,y=b.top-r.top,style=getComputedStyle(el),text=el.textContent.trim();if(!text)continue;
   g.fillStyle=style.backgroundColor==='rgba(0, 0, 0, 0)'?'rgba(252,255,248,.94)':style.backgroundColor;g.fillRect(x,y,b.width,b.height);g.strokeStyle='#c2d0c1';g.lineWidth=.7;g.strokeRect(x,y,b.width,b.height);g.font=`500 ${Math.max(12,parseFloat(style.fontSize)||12)}px "Noto Sans CJK SC","PingFang SC",sans-serif`;g.fillStyle=style.color||'#315742';g.textBaseline='middle';g.fillText(text,x+5,y+b.height/2,b.width-10);captured.push(text);
  }
  const mode=(current.kind==='point'||current.kind==='meridian')?(learning.getState().precisionMode==='strict'?'资料查阅 · 未校准点线隐藏':'三维示意 · 穴位与经络位置未校准'):'解剖教学模型 · 非患者诊断';
  const layer=tissues.getState().nerveXray?' · 神经透视辅助':'';
  const title=`${current.name} ${current.kind==='point'?current.id:''} · ${current.side==='left'?'人体左侧':current.side==='right'?'人体右侧':''}`;
  g.fillStyle='rgba(248,252,245,.96)';g.fillRect(0,0,r.width,48);g.font='600 17px "Noto Sans CJK SC",sans-serif';g.fillStyle='#254c3e';g.fillText(title,16,25,r.width-30);
  g.fillStyle='rgba(248,252,245,.96)';g.fillRect(0,r.height-64,r.width,64);g.fillStyle='#345642';g.font='12px "Noto Sans CJK SC",sans-serif';g.fillText(mode+layer,14,r.height-41,r.width-28);g.font='10px sans-serif';g.fillText('V10 · Z-Anatomy / BodyParts3D · CC BY-SA 4.0 · 学习参考',14,r.height-20,r.width-28);g.restore();
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('截图导出失败');
  const filename=`人体研习-${current.name}-${current.id}-V10-${new Date().toISOString().slice(0,10)}.png`.replace(/[\\/:*?"<>|]/g,'-');
  lastCapture={filename,object:clone(current),labels:captured,mode:mode+layer,bytes:blob.size,width:canvas.width,height:canvas.height};
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);toast('已保存当前对象、可见标注与模式说明');return lastCapture;
 }
 const api={getState:()=>({current:clone(current),previous:lastTarget&&clone(lastTarget),lastCapture:lastCapture&&clone(lastCapture),restoring}),focusCurrent,capture,navigate,linkFor};window.__ATLAS_STUDY__=api;
 if(initial){queueMicrotask(()=>navigate(initial).catch(e=>toast('链接无法恢复：'+e.message)));}else update();
 return api;
}
