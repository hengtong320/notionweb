from pathlib import Path
p=Path('fullbody-tcm-v21')
f=p/'layers-ui-v21.js';s=f.read_text()
a=s.index(" $('v21Meridians').onchange=");b=s.index(" const detailRow=",a)
s=s[:a]+""" $('v21Meridians').onchange=e=>{const enabled=e.target.checked;api.runMutation('meridian-visibility',async()=>{if(enabled){if(female.active)await female.ensureMeridianSurface();else await tissues.ensureMeridianReference();}learning.toggleTCM(enabled);}).catch(e=>toast(e.message));};
"""+s[b:]
a=s.index("$('v21FineDetails').onchange=");b=s.index(" $('v21RestoreHidden').onclick",a)
s=s[:a]+"""$('v21FineDetails').onchange=e=>{const enabled=e.target.checked;api.runMutation('fine-details',()=>{if(female.active)female.setFineDetails(enabled);else{const old=$('internalDetails');old.checked=enabled;old.dispatchEvent(new Event('change',{bubbles:true}));const fascia=$('fasciaOn');fascia.checked=enabled;fascia.dispatchEvent(new Event('change',{bubbles:true}));}}).catch(e=>toast(e.message));};
"""+s[b:]
s=s.replace('!!tissues.getState().details',"!!$('internalDetails').checked")
needle=" let queued=false;";assert needle in s
s=s.replace(needle,""" const mobileLayers=document.createElement('button');mobileLayers.type='button';mobileLayers.id='v21LayersOpen';mobileLayers.textContent='图层';mobileLayers.setAttribute('aria-controls','tissuePanel');$('openNav').after(mobileLayers);mobileLayers.onclick=()=>api.showSection('layers');$('openNav').textContent='目录';$('openNav').onclick=()=>api.showSection('directory');
"""+needle,1)
s=s.replace("function refresh(){const s=api.getState(),f=female.active;","function refresh(){const s=api.getState(),f=female.active;mobileLayers.classList.toggle('active',s.section==='layers');mobileLayers.setAttribute('aria-expanded',String(s.section==='layers'&&document.body.classList.contains('nav-open')));")
f.write_text(s)
f=p/'layers-ui-v21.css';s=f.read_text()+"\n.layers-v21 .drawer-buttons #v21LayersOpen.active{background:#dfece1;color:#245f43;border-color:#8db29b}@media(max-width:600px){.layers-v21 .drawer-buttons{gap:3px}.layers-v21 .drawer-buttons button{padding:5px 6px;min-width:36px}.layers-v21 #renderQuality{max-width:60px}}\n";f.write_text(s)
f=p/'female-v12.js';s=f.read_text().replace("nerves:'全身神经',vessels:","muscles:'全身肌肉',compare:'分层对照',nerves:'全身神经',vessels:");s=s.replace("nervous:'#b78837'","nervous:'#896126'");f.write_text(s)
f=p/'shared-v14.js';s=f.read_text().replace("for(const b of regions.querySelectorAll('[data-region]')){b.disabled=f;","regions.hidden=f;for(const b of regions.querySelectorAll('[data-region]')){b.disabled=f;");s=s.replace('女性来源没有此部位完整骨架，可从上方系统筛选查看已有结构','女性完整骨架可从结构目录搜索和点选');f.write_text(s)
f=p/'tissues-v4.js';s=f.read_text().replace('getState:()=>({localStudy,studyContext:','getState:()=>({details,fascia,localStudy,studyContext:');f.write_text(s)
f=Path('atlas21-repair/verify.cjs');s=f.read_text()
s=s.replace("await p.setViewportSize({width:w,height:h});await p.locator('#layersTab').click();","await p.setViewportSize({width:w,height:h});await p.locator('#v21LayersOpen').click();")
needle=" await choose('skin');await p.locator('#sharedLayer-skeletal').check();";assert needle in s
extra=""" for(const who of ['male','female']){await sex(who);await choose('skin');await p.locator('#v21Meridians').check();await settle();ck(who+': custom meridian toggle honors requested value after asynchronous binding',await p.evaluate(()=>__ATLAS_LEARNING__.getState().enabled&&document.querySelector('#v21Meridians').checked));await p.locator('#v21Meridians').uncheck();await settle();ck(who+': custom meridian toggle turns pigment off again',await p.evaluate(()=>!__ATLAS_LEARNING__.getState().enabled));await choose('muscles');await p.locator('#v21FineDetails').check();await settle();ck(who+': detail toggle and actual internal-detail state agree',await p.evaluate(who=>document.querySelector('#v21FineDetails').checked&&(who==='female'?__ATLAS_FEMALE__.getState().fineDetails:(__ATLAS_TISSUES__.getState().details&&__ATLAS_TISSUES__.getState().fascia)),who));await p.locator('#v21FineDetails').uncheck();await settle();}
"""
s=s.replace(needle,extra+needle,1);f.write_text(s)
f=p/'README.md';s=f.read_text().replace('部位特写平铺。','部位特写平铺。平板和手机页头新增“图层”直达，不必先打开目录；目录与图层分开进入。');f.write_text(s)
print('Responsive direct layer button and asynchronous custom toggles verified as explicit user paths')
