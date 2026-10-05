// Move existing controls, retaining their handlers and state; no duplicate actions.
export function initCompactLayout({learning}){
 const $=id=>document.getElementById(id),body=document.body;
 const menu=document.createElement('details');menu.id='compactActions';
 menu.innerHTML='<summary aria-label="更多观察工具">更多</summary><div class="compact-actions-body"></div>';
 document.querySelector('.header-actions').append(menu);
 const content=menu.lastElementChild;
 const ids=['poseEntry','renderQuality','helpBtn','focusWorkspace','fullscreenBtn','captureBtn','moreViewsBtn','autoSpeakBtn','labelsBtn','colorBtn','ghostBtn','dockToggle'];
 const alwaysMenu=new Set(['moreViewsBtn','autoSpeakBtn','labelsBtn','colorBtn','ghostBtn','dockToggle']);
 const homes=ids.map(id=>{const el=$(id),home=document.createComment('control home: '+id);el.before(home);return {el,home};});
 const labels={helpBtn:'操作指南',focusWorkspace:'专注看图',fullscreenBtn:'铺满看图',captureBtn:'保存当前视图',moreViewsBtn:'局部观察',autoSpeakBtn:'点选时朗读',labelsBtn:'骨名标注',colorBtn:'解剖分组配色',ghostBtn:'原位参考影'};
 for(const [id,label]of Object.entries(labels)){const el=$(id);el.setAttribute('aria-label',label);el.title=label;if(['moreViewsBtn','autoSpeakBtn'].includes(id))for(const node of [...el.childNodes])if(node.nodeType===3)node.remove();if(!el.querySelector('.compact-control-name')&&el.textContent.trim()!==label){const text=document.createElement('span');text.className='compact-control-name';text.textContent=label;el.append(text);}}
 const views=document.querySelector('.view-switcher'),directions=document.createElement('label');directions.id='compactDirection';directions.innerHTML='观察方向<select aria-label="观察方向"><option value="free" disabled>自由视角</option></select>';
 const select=directions.querySelector('select');
 for(const b of views.querySelectorAll('[data-view]')){const option=document.createElement('option');option.value=b.dataset.view;option.textContent=b.textContent;select.append(option);}
 views.append(directions);select.onchange=()=>views.querySelector('[data-view="'+select.value+'"]').click();
 const restoreDetails=document.createElement('button');restoreDetails.id='restorePointDetails';restoreDetails.textContent='查看穴位详情';restoreDetails.hidden=true;document.querySelector('.study-toolbar').append(restoreDetails);restoreDetails.onclick=()=>$('chipDetails').click();
 let compact=false,scheduled=false;
 function layout(){scheduled=false;const collapsed=innerWidth>1100&&body.dataset.currentKind==='point'&&!learning.getState().cardOpen;body.classList.toggle('point-detail-collapsed',collapsed);restoreDetails.hidden=!collapsed;const on=innerWidth<=650||(innerHeight<=440&&innerWidth<=1100);
  if(on!==compact){compact=on;menu.open=false;body.classList.toggle('compact-v35',on);for(const {el,home}of homes){if(on||alwaysMenu.has(el.id))content.append(el);else home.after(el);}}
  if(on){const stage=$('stage').getBoundingClientRect(),heading=document.querySelector('.stage-heading').getBoundingClientRect(),view=views.getBoundingClientRect();
   body.style.setProperty('--compact-view-top',Math.max(42,heading.bottom-stage.top+8)+'px');
   body.style.setProperty('--compact-study-top',Math.max(92,view.bottom-stage.top+8)+'px');
   const toolbar=document.querySelector('.study-toolbar').getBoundingClientRect();body.style.setProperty('--compact-status-top',toolbar.bottom-stage.top+8+'px');
  }
  const active=views.querySelector('[data-view][aria-pressed="true"]');select.value=active?.dataset.view||'free';
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(layout);}}
 new MutationObserver(schedule).observe($('tcmPointCard'),{attributes:true,attributeFilter:['hidden']});
 new MutationObserver(schedule).observe(body,{attributes:true,attributeFilter:['data-current-kind']});
 new ResizeObserver(schedule).observe(document.querySelector('.study-toolbar'));
 new ResizeObserver(schedule).observe(document.querySelector('.stage-heading'));
 new MutationObserver(schedule).observe(views,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
 window.addEventListener('resize',()=>{schedule();requestAnimationFrame(()=>requestAnimationFrame(()=>window.__ATLAS_LEARNING__?.keepSelectedInView()));});
 for(const event of ['atlas:selection','atlas:profile-changed','atlas:transition-settled','atlas:sex-changed'])window.addEventListener(event,schedule);
 content.addEventListener('click',e=>{if(e.target.closest('button')&&!e.target.closest('#renderQuality'))menu.open=false;});
 document.addEventListener('pointerdown',e=>{if(menu.open&&!menu.contains(e.target))menu.open=false;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus();}});
 for(const {el}of homes)if(alwaysMenu.has(el.id))content.append(el);
 layout();schedule();
}
