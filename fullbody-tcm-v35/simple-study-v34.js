// A smaller default workspace; detailed tools remain available on demand.
export function initSimpleStudy({learning,tissues,female,toast}){
 const $=id=>document.getElementById(id),api=window.__ATLAS_SHARED__;
 document.body.classList.add('simple-v34');
 $('boneTab').textContent='人体结构';$('layersTab').textContent='查看图层';
 $('tcmBtn').textContent='选择经络';$('tcmQuickFit').textContent='看全线';
 for(const id of ['tcmMasterToggle','tcmFitMeridian','labelFitAll'])$(id).hidden=true;
 document.querySelector('.v26-orientation').hidden=true;
 const custom=$('customLayers'),heading=custom.querySelector('h3'),summary=document.createElement('summary');
 summary.textContent='叠加与显示设置';heading.replaceWith(summary);custom.open=false;
 const quick=$('v21Quick'),vascular=quick.querySelector('[data-v21-view="vascular"]');
 vascular.textContent='全身血管';quick.querySelector('.v21-quick-grid').append(vascular);
 const vesselPanel=document.createElement('section');vesselPanel.id='v34VesselPanel';vesselPanel.innerHTML='<label>血管类型<select id="v34VesselFilter" aria-label="画面血管类型"><option value="all">动脉与静脉</option><option value="artery">只看动脉</option><option value="vein">只看静脉</option></select></label><p>红色：动脉 · 蓝色：静脉<br>颜色用于辨认结构，不表示含氧量。</p>';
 quick.querySelector('.v21-quick-grid').after(vesselPanel);
 const directoryFilter=document.createElement('label');directoryFilter.id='v34DirectoryVessels';directoryFilter.innerHTML='血管类型<select id="v34DirectoryFilter" aria-label="目录血管类型"><option value="all">动脉与静脉</option><option value="artery">只看动脉</option><option value="vein">只看静脉</option></select>';
 $('structureLibrary').querySelector('.shared-filters').after(directoryFilter);
 for(const id of ['v34VesselFilter','v34DirectoryFilter'])$(id).onchange=e=>api.setVesselFilter(e.target.value).catch(e=>toast('筛选未完成：'+e.message));
 const more=$('sharedMeridianOptions');more.querySelector('summary').textContent='线型、透视与局部观察';more.lastElementChild.prepend($('localStudyToggle').closest('label'));
 const pairs=$('pairHeart').parentElement,pairDetails=document.createElement('details');pairDetails.className='v34-pairs';pairDetails.innerHTML='<summary>经脉对照组合</summary>';pairs.before(pairDetails);pairDetails.append(pairs);
 const legend=document.createElement('div');legend.id='v34VesselLegend';legend.setAttribute('role','status');document.querySelector('.stage').append(legend);
 const help=$('helpDialog');help.querySelector('h2').textContent='三步开始学习';
 help.querySelector('[data-close]').setAttribute('aria-label','关闭操作指南');$('sourceDialog').querySelector('[data-close]').setAttribute('aria-label','关闭来源说明');
 const notices=help.querySelectorAll('.notice');notices[0].textContent='手机：点选后先看模型，点“详情”阅读说明。常用观察按钮在底部，附加工具在“更多”。左右均指人体自身的左右。';notices[1].textContent='经络与穴位为学习示意，尚未逐穴临床校准。骨骼拆解用于观察结构，位移不代表人体允许的活动范围。';
 const articles=help.querySelectorAll('.guide-cards article');
 [['选择内容','在“查看图层”选择经络、骨骼、肌肉、神经、内脏或血管；男女使用同一套入口。'],['找到结构','在“人体结构”搜索名称；在“经络穴位”搜索穴名或编码。点击后看位置和资料。'],['观察关系','拖动旋转、滚轮缩放。需要叠加或透明度时展开“叠加与显示设置”；点“返回全身”结束局部观察。']].forEach(([h,p],i)=>{articles[i].querySelector('h3').textContent=h;articles[i].querySelector('p').textContent=p;});
 let queued=false;
 function refresh(){queued=false;const s=api.getState(),native=female.active?female.getState():tissues.getState(),vascularOn=female.active?native.systems.vessels?.on||native.systems.vascular?.on:native.systems.vessels?.on;
  vesselPanel.hidden=!vascularOn;directoryFilter.hidden=$('structureSystem').value!=='vascular';
  for(const id of ['v34VesselFilter','v34DirectoryFilter'])$(id).value=s.vesselFilter;
  legend.hidden=!vascularOn;legend.textContent=(s.vesselFilter==='vein'?'静脉 · 蓝色':s.vesselFilter==='artery'?'动脉 · 红色':'动脉红色 · 静脉蓝色')+' · 结构学习配色';
  $('tcmBtn').hidden=s.section==='meridians'&&innerWidth>1100;
  $('v21Coverage').textContent='来源与模型';
 }
 function schedule(){if(!queued){queued=true;queueMicrotask(refresh);}}
 for(const event of ['atlas:section-changed','atlas:transition-settled','atlas:sex-changed','atlas:profile-changed','atlas:vessel-filter','atlas:selection'])window.addEventListener(event,schedule);
 $('structureSystem').addEventListener('change',schedule);$('structureReset').addEventListener('click',schedule);window.addEventListener('resize',schedule);
 refresh();
}
