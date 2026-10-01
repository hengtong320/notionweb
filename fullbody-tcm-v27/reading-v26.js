// Present the same point data once, without changing coordinates or selection.
export function initReadingV26({learning,invalidate}){
 const $=id=>document.getElementById(id);document.body.classList.add('reading-v26');let queued=false;
 function refresh(){queued=false;const current=window.__ATLAS_STUDY__?.getState().current;
  if(current?.kind==='meridian'){
   const ids=current.id.split(',').filter(Boolean),name=$('currentStudyName');
   const short={LU:'肺经',LI:'大肠经',ST:'胃经',SP:'脾经',HT:'心经',SI:'小肠经',BL:'膀胱经',KI:'肾经',PC:'心包经',TE:'三焦经',GB:'胆经',LR:'肝经',GV:'督脉',CV:'任脉',EX:'头面补充'};
   if(name){name.title=current.name;name.textContent=ids.length>=14?'全部经脉 · '+ids.length+' 条':ids.length>3?ids.length+' 条经脉对照':ids.map(id=>short[id]||id).join('＋');}
  }
  const card=$('tcmPointCard');
  if(current?.kind==='point'&&card&&!card.hidden&&!card.dataset.readingReady){
   card.dataset.readingReady='1';
   const heading=card.querySelector('h3'),location=card.querySelector('.v10-point-summary');
   if(heading&&location)heading.after(location);
   const constraint=card.querySelector('.v18-location');
   if(constraint){const details=document.createElement('details');details.className='v26-point-basis';const summary=document.createElement('summary');summary.textContent='模型依据与复核状态';details.append(summary);constraint.before(details);details.append(constraint);const projection=card.querySelector('.point-projection-info');if(projection)details.append(projection);}
   const notice=document.createElement('p');notice.className='v26-point-notice';notice.textContent='位置为学习示意，尚未逐穴临床校准。';card.querySelector('.tcm-card-actions')?.before(notice);
   $('focusPointBtn').textContent='定位到此点';$('closePointCard').setAttribute('aria-label','收起穴位详情');
  }
  invalidate();
 }
 function schedule(){const card=$('tcmPointCard');if(card&&!card.querySelector('.v26-point-notice'))delete card.dataset.readingReady;if(!queued){queued=true;queueMicrotask(refresh);}}
 for(const event of ['atlas:selection','atlas:transition-settled','atlas:tcm-visibility','atlas:sex-changed'])window.addEventListener(event,schedule);
 schedule();window.__ATLAS_READING_V26__={refresh:schedule,version:'27.0.0'};
}
