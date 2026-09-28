from pathlib import Path

root = Path('fullbody-tcm-v19')
css = root / 'shared-v14.css'
css.write_text(css.read_text(encoding='utf-8') + '''
body[data-shared-ui].female-view #labelsBtn {
  display: inline-flex !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}
''', encoding='utf-8')

# Reverse reflected triangles only in the temporary projection copy.
f = root / 'skin-v17.js'
s = f.read_text(encoding='utf-8')
old = 'p.applyMatrix4(n.matrixWorld);g.dispose();return p;'
assert old in s
s = s.replace(old, '''p.applyMatrix4(n.matrixWorld);
 if(n.matrixWorld.determinant()<0){const a=p.attributes.position.array;for(let i=0;i<a.length;i+=9){for(let k=0;k<3;k++){const t=a[i+3+k];a[i+3+k]=a[i+6+k];a[i+6+k]=t;}}p.attributes.position.needsUpdate=true;}
 g.dispose();return p;''')
f.write_text(s, encoding='utf-8')

f = root / 'female-v12.js'
s = f.read_text(encoding='utf-8')
s = s.replace("compare:['surface','skeletal','nervous']", "compare:['skeletal','nervous','muscular']")
old = 'await Promise.all(cfg.map(k=>enable(k,true)));if(!active||token!==serial)return false;'
assert old in s
s = s.replace(old, old+"for(const k of cfg)systems.get(k).opacity=1;if(id==='compare'){systems.get('muscular').opacity=.27;systems.get('skeletal').opacity=.65;}")
s = s.replace("else{if(systems.get('surface'))systems.get('surface').opacity=1;if(systems.get('skeletal'))systems.get('skeletal').opacity=1;}", "else if(id!=='compare'){if(systems.get('surface'))systems.get('surface').opacity=1;if(systems.get('skeletal'))systems.get('skeletal').opacity=1;}")
s = s.replace("setDisplayMode:v=>{", "setDisplayMode:(v,options={})=>{")
s = s.replace("for(const s of systems.values())if(s.on)s.opacity=v==='context'?.28:1;", "if(!options.preserveOpacity)for(const s of systems.values())if(s.on)s.opacity=v==='context'?.28:1;")
f.write_text(s, encoding='utf-8')

f = root / 'shared-v14.js'
s = f.read_text(encoding='utf-8')
old = "else if(key==='pelvis')window.__FOOT_ATLAS__.setRegion('pelvis');"
assert old in s
s = s.replace(old, "else if(key==='pelvis'){await tissues.setProfile('bones');window.__FOOT_ATLAS__.setRegion('pelvis');}")
s = s.replace("female.setDisplayMode(v.display);", "female.setDisplayMode(v.display,{preserveOpacity:true});")
f.write_text(s, encoding='utf-8')
f = root/'learning-enhancements.js';f.write_text(f.read_text().replace("version:'18.0.0'", "version:'19.0.0'"))
(root/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 · V19</title><style>body{max-width:760px;margin:40px auto;padding:20px;font:16px/1.8 system-ui;background:#f4f7ee;color:#315945}a{color:#276d62}</style><h1>V19 皮肤绘线与图层切换</h1><p>在真实皮肤网格上绘制线路与落点，体表模式默认不透明。修正镜像三角形方向、掌侧投影、男女场景切换、女性标注按钮及保存图层透明度的恢复。</p><p>原始模型文件未变。女性骨骼与周围神经数据为部分覆盖；点位仍为学习示意，未逐穴临床校准。</p><p><a href="./">打开 V19</a> · <a href="../anatomy/">固定入口</a> · <a href="../fullbody-tcm-v18/">V18 历史版本</a> · <a href="../fullbody-tcm-v17/">V17 历史版本</a></p></html>''',encoding='utf-8')

# Extend the normal interaction journey. Explicit transparency here is only
# a saved-settings regression; the opaque surface preset is restored below.
f = Path('atlas19-repair/verify.cjs');s=f.read_text()
needle="await p.setViewportSize({width:1024,height:768});"
assert needle in s
extra='''
 for(const sex of ['male','female']){
  await p.evaluate(async sex=>{await __ATLAS_SHARED__.switchSex(sex);await __ATLAS_SHARED__.choose('surface',false);__ATLAS_LEARNING__.clearStudyContext(true);__ATLAS_LEARNING__.setMeridians(['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR','GV','CV']);__ATLAS_LEARNING__.fitMeridian([0,0,1]);},sex);await settle();
  ck(sex+' all selected meridians have rendered skin triangles',await p.evaluate(()=>{const a=__ATLAS_LEARNING__.getInkAudit();return a.routes.length===26&&a.routes.every(r=>r.visible&&r.surfaceTriangles>0&&r.points>0);}));
  await snap(sex+'-all-meridians-opaque');
  await p.evaluate(()=>{document.querySelector('#customLayers').open=true;});
  await p.locator('#sharedLayer-surface').uncheck();await settle();
  ck(sex+' hiding skin disables pigment layer',!(await p.evaluate(()=>__ATLAS_LEARNING__.getInkAudit().active)));
  await p.locator('#sharedLayer-surface').check();await settle();
  ck(sex+' re-enabling skin restores pigment on opaque surface',await p.evaluate(()=>__ATLAS_LEARNING__.getInkAudit().active)&&(await skin()).every(x=>x.opacity===1));
  await p.evaluate(()=>{const e=document.querySelector('#sharedOpacity-surface');e.value=65;e.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#saveLayerCombo').click();e.value=100;e.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#restoreLayerCombo').click();});await settle();
  ck(sex+' saved opacity is restored without an implicit multiplier',(await skin()).every(x=>Math.abs(x.opacity-.65)<.001));
  await p.evaluate(()=>__ATLAS_SHARED__.choose('surface',false));await settle();
  ck(sex+' surface preset resets to opaque after a custom combination',(await skin()).every(x=>x.opacity===1));
 }
 await p.evaluate(()=>{__ATLAS_LEARNING__.setMeridians(['HT','PC']);});
'''
s=s.replace(needle,extra+needle);f.write_text(s)
print('Reflected surfaces, explicit presets, saved settings and expanded regressions ready.')
