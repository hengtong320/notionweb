from pathlib import Path
p=Path('fullbody-tcm-v19');f=p/'shared-v14.js';s=f.read_text()
a=s.index(' async function switchSexNow(target)');b=s.index(" $('bodySelector').querySelectorAll",a)
s=s[:a]+''' async function switchSexNow(target){
  if(!['male','female'].includes(target)||target===sex())return false;
  const held=captureCamera(),from=sex(),was={scene,section,reference:currentReference,point:currentPoint&&{...currentPoint},enabled:learning.getState().enabled,side:female.active?female.getState().side:state.side,labels:female.active?female.getLabels():state.labels,display:$('sharedDisplay').value,scroll:sidebar.scrollTop,detail:document.body.classList.contains('detail-open')};
  const logical=layers.map(l=>{const all=systemsFor(l).map(k=>snapshots()[k]).filter(Boolean),on=all.filter(v=>v.on);return {id:l.id,on:on.length>0,opacity:on.length?on.reduce((n,v)=>n+(v.opacity??1),0)/on.length:1};});
  const oldRow=activeCatalog().find(r=>r.id===currentId());sexSwitching=true;viewTicket++;selectionTicket++;learning.cancelPendingFocus?.();learning.suspend(true);
  try{
   await female.setSex(target,{managed:true});
   document.body.classList.remove('tissue-detail-active','point-detail-active','reference-detail');
   if($('tissueDetail'))$('tissueDetail').hidden=true;
   if(was.scene==='custom'){
    if(female.active)female.setCustom();else{await tissues.setProfile('bones');tissues.clearOrganScope();}
    for(const item of logical){const l=layers.find(l=>l.id===item.id);for(const k of systemsFor(l)){
      if(female.active){await female.enable(k,item.on);female.setOpacity(k,item.opacity);}
      else if(k==='bones'){state.bonesOn=item.on;$('bonesOn').checked=item.on;$('bonesOn').dispatchEvent(new Event('change',{bubbles:true}));tissues.setBoneOpacity(item.opacity);}
      else{await tissues.enable(k,item.on);tissues.setOpacity(k,item.opacity);}
    }}
    scene='custom';
   }else{
    let next=was.scene;if(!female.active&&next==='breast')next='surface';if(female.active&&next.startsWith('ear-'))next='surface';
    await chooseNow(next,true,{keepSection:true});
   }
   if(female.active){await female.ensureMeridianSurface();female.setSide(was.side);female.setLabels(was.labels);}else{window.__FOOT_ATLAS__.setSide(was.side);if(state.labels!==was.labels)$('labelsBtn').click();}
   await bindVisibleSurface();learning.suspend(false);learning.toggleTCM(was.enabled);
   currentReference=was.reference;currentPoint=was.point;
   if(was.reference&&was.point){learning.selectPoint(was.point.code,was.point.side,false);}
   else if(was.reference){window.__ATLAS_EVIDENCE__.showChannel(learning.getState().selectedMeridians);}
   else{
    currentPoint=null;const match=oldRow&&activeCatalog().find(r=>r.name===oldRow.name&&r.side===oldRow.side);
    if(match){if(female.active)await female.select(match.id,false);else if(match.kind==='bone')window.__FOOT_ATLAS__.selectBone(match.id,true,true);else tissues.choose(match.id,false);}
    else{if(female.active)female.clearSelection();else tissues.clearSelection();window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'region',id:scene,name:(female.active?'女性':'男性')+' · '+(sceneNames[scene]||'当前结构'),side:was.side}}));}
   }
   restoreCamera(held);section=was.section;redraw();sidebar.scrollTop=was.scroll;document.body.classList.toggle('detail-open',was.detail);
   $('labelsBtn').classList.toggle('active',was.labels);$('labelsBtn').setAttribute('aria-pressed',String(was.labels));return true;
  }catch(e){toast('切换未完成：'+e.message);throw e;}
  finally{sexSwitching=false;learning.suspend(false);$('bodySelector').setAttribute('aria-busy','false');schedule();}
 }
''' + s[b:]
s=s.replace("for(const id of ['colorBtn','labelsBtn','ghostBtn'])", "for(const id of ['colorBtn','ghostBtn'])")
s=s.replace("coverage.textContent=f?'女性独立参考 · 骨骼与肌肉为部分覆盖'", "coverage.textContent=f?'女性模型 · 骨骼、周围神经为部分覆盖'")
s=s.replace("if(l.id==='surface'&&on){if(female.active)await female.ensureMeridianSurface();else await tissues.attachSurface(true);}","if(l.id==='surface'&&on){if(female.active){female.setOpacity('surface',1);await female.ensureMeridianSurface();}else{tissues.setOpacity('surface',1);await tissues.attachSurface(true);}}")
s=s.replace("e.disabled=f;e.closest('label').hidden=id==='surfaceAttach';", "e.disabled=f;e.closest('label').hidden=f||id==='surfaceAttach';")
s=s.replace("function opacityLayer(l,v){", "$('labelsBtn').addEventListener('click',e=>{if(!female.active)return;e.preventDefault();e.stopImmediatePropagation();female.setLabels(!female.getLabels());$('labelsBtn').classList.toggle('active',female.getLabels());$('labelsBtn').setAttribute('aria-pressed',String(female.getLabels()));},true);\n function opacityLayer(l,v){")
s=s.replace("if(key==='surface'&&female.active){await female.ensureMeridianSurface();learning.toggleTCM(true);}", "if(key==='surface'){if(female.active){female.setOpacity('surface',1);await female.ensureMeridianSurface();}else tissues.setOpacity('surface',1);$('sharedDisplay').value='solid';learning.toggleTCM(true);}")
s=s.replace("version:'18.0.0'","version:'19.0.0'").replace('V18 · 统一体型与点位约束','V19 · 皮肤绘线与图层切换')
f.write_text(s)
f=p/'female-v12.js';s=f.read_text().replace("if(e.key.toLowerCase()==='h'){isolated", "if(e.key.toLowerCase()==='l')$('labelsBtn').click();if(e.key.toLowerCase()==='h'){isolated")
f.write_text(s)
f=p/'tissues-v4.js';s=f.read_text().replace("if(system==='surface'&&!on){attachmentSerial++;ctx.learning.setSurfaceAttachment?.(false);", "if(system==='surface'&&!on&&state.bodySex!=='female'){attachmentSerial++;ctx.learning.setSurfaceAttachment?.(false);")
s=s.replace("if(name==='surface'){state.bonesOn=false;", "if(name==='surface'){systems.surface.opacity=1;$('surfaceOpacity').value=100;lastKey='';state.bonesOn=false;")
f.write_text(s)
f=p/'app.js';s=f.read_text().replace("function updateLabels(){if(document.body.classList.contains('organ-view-active'))", "function updateLabels(){if(state.bodySex==='female'||document.body.classList.contains('organ-view-active'))")
s=s.replace('syncAOProjection();composer.render(dt);', 'if(femaleViewer?.active)aoPass.enabled=false;syncAOProjection();composer.render(dt);')
f.write_text(s)
f=p/'shared-v14.css';s=f.read_text()+'''\n.female-structure-labels{position:absolute;inset:0;pointer-events:none;z-index:10}.female-structure-labels[hidden]{display:none}.female-structure-labels button{position:absolute;pointer-events:auto;max-width:180px;padding:5px 8px;border:1px solid #cad6cd;border-radius:5px;background:rgba(255,255,255,.95);color:#24463d;font:12px/1.4 system-ui;box-shadow:0 1px 3px #23422b18}.female-structure-labels button[hidden]{display:none}\n''';f.write_text(s)
for name in ['index.html','index.template.html']:
 f=p/name
 if f.exists():f.write_text(f.read_text().replace('18.0.0','19.0.0').replace('V18','V19').replace('统一体型与点位约束','皮肤绘线与图层切换'))
(p/'README.md').write_text('''# V19 皮肤绘线与图层切换

体表线路和落点用当前皮肤的真实三角形绘制，使用正常深度遮挡与微量多边形偏移，不用透明皮肤或关闭深度测试实现可见。前臂到掌心的掌侧投影优先选择掌侧外表面，避免最近交点误落手背。选择隐藏皮肤时，切回独立的空间对照线；透视仅为可选的背侧辅助。

男女使用同一个场景切换事务，不再先恢复上一性别的旧场景然后叠加另一套图层。骨骼、神经预设不附带不透明皮肤遮罩，切回体表恢复100%不透明。女性图层透明度不再隐式叠乘，标注按钮可以显示当前女性来源中的结构，切换后清理另一套标注。

原V18路径和原始模型文件保留。女性源骨骼、周围神经覆盖并不完整；本修复不把缺失结构伪称为完整女性解剖。190个模型约束、171个待细定位复核的穴名状态保持原样，0个穴位被升级为临床配准通过。绘线清晰与点线一致不等于准确取穴。检查以实际画面像素、交互与渲染参数分别记录。
''',encoding='utf-8')
