export function initMeridianExperience({learning,invalidate}){
 const $=id=>document.getElementById(id),panel=$('tcmControls'),body=document.body;
 body.classList.add('meridian-v26');
 const guide=$('guideToggle');if(guide){guide.closest('label').hidden=true;guide.closest('label').setAttribute('aria-hidden','true');}
 const local=$('localStudyToggle');if(local){
  const row=local.closest('label');row.classList.add('v26-local-scope');row.hidden=false;
  for(const n of [...row.childNodes])if(n!==local)n.remove();
  const text=document.createElement('span');text.textContent='仅看当前穴位附近';row.append(text);
  const note=document.createElement('small');note.textContent='关闭时保留完整线路';row.append(note);
  panel.querySelector('.tcm-side-picker').after(row);local.checked=false;local.dispatchEvent(new Event('change',{bubbles:true}));
 }
 $('autoFocusPoint').parentElement.lastChild.textContent=' 点选后转到清楚的观察角度';$('sharedAcupointCoverage').hidden=true;
 const oldFit=$('tcmFitMeridian');if(oldFit)oldFit.textContent='看全线';$('tcmQuickFit').textContent='看全线';
 const directions=document.createElement('div');directions.className='v26-orientation';directions.innerHTML='<span>观察</span>';
 for(const [name,dir]of [['正面',[0,0,1]],['背面',[0,0,-1]],['左侧',[1,0,0]],['右侧',[-1,0,0]]]){
  const b=document.createElement('button');b.type='button';b.textContent=name;b.dataset.meridianView=name;b.onclick=()=>learning.fitMeridian(dir);directions.append(b);
 }
 panel.querySelector('.tcm-master-row').after(directions);
 const oldActions=$('guideFront')?.closest('.guide-actions');if(oldActions)oldActions.hidden=true;
 const empty=document.createElement('button');empty.type='button';empty.id='v26ClearPointSearch';empty.textContent='清空搜索';empty.hidden=true;
 $('acupointSearch').closest('label').after(empty);empty.onclick=()=>{const input=$('acupointSearch');input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));input.focus();};
 $('acupointSearch').addEventListener('input',()=>{empty.hidden=!$('acupointSearch').value;});
 const point=document.createElement('div');point.id='v26PointSummary';point.hidden=true;
 point.innerHTML='<div><strong></strong><small></small></div><button type="button" data-action="focus">定位</button><button type="button" data-action="details">详情</button>';
 document.querySelector('.stage').append(point);
 point.querySelector('[data-action="focus"]').onclick=()=>learning.focusSelectedPoint();
 point.querySelector('[data-action="details"]').onclick=()=>{$('chipDetails').click();};
 const fit=$('labelFitAll');if(fit)fit.textContent='看全线';
 let queued=false;function update(){queued=false;const s=learning.getState(),p=s.selectedPoint;
  point.hidden=!(s.enabled&&s.pointsOn&&p);body.classList.toggle('v26-point-selected',!point.hidden);$('acupointSearch').setAttribute('aria-label','搜索穴位名称、拼音或编码');
  if(p){point.querySelector('strong').textContent=p.name+' · '+p.code;point.querySelector('small').textContent=(p.side==='left'?'人体左侧':p.side==='right'?'人体右侧':'人体中线')+' · 学习示意';}
  for(const [id,on]of [['meridianLineToggle',s.linesOn],['acupointToggle',s.pointsOn],['pointNamesToggle',s.namesOn]])$(id).setAttribute('aria-pressed',String(on));
  if($('autoFocusPoint'))$('autoFocusPoint').checked=s.autoFocus;
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 for(const event of ['atlas:selection','atlas:tcm-visibility','atlas:transition-settled','atlas:sex-changed'])window.addEventListener(event,schedule);
 panel.addEventListener('click',schedule);panel.addEventListener('change',schedule);
 const oldLocalHandler=local?.onchange;if(local)local.onchange=e=>{oldLocalHandler?.call(local,e);learning.flushLabels();invalidate();};
 update();window.__ATLAS_MERIDIAN_UX__={version:'28.0.0',refresh:update};
}
