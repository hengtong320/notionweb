from pathlib import Path
p=Path('fullbody-tcm-v26')
def edit(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:80]);f.write_text(s.replace(old,new,1))
# The legacy focus wrapper would overwrite the new available-space framing.
edit('learning-enhancements.js','ctx.focusBounds=(box,options={})=>{\n  baseFocusBounds(box,options);','ctx.focusBounds=(box,options={})=>{\n  if(options.safeCenter){camera.clearViewOffset();baseFocusBounds(box,options);return;}\n  baseFocusBounds(box,options);')
edit('learning-enhancements.js',"['.stage-heading','.view-switcher','.stage-heading','.view-switcher','.stage-tools','.detail-panel','.study-toolbar','#tcmStatus']", "['.stage-heading','.view-switcher','.study-toolbar','#tcmStatus']")
edit('learning-enhancements.js','function prepareNavigation(){','function prepareNavigation(keepDetails=false){const hadDetails=document.body.classList.contains(\'detail-open\');')
edit('learning-enhancements.js','if(compact())setPanel(false);\n }\n function frameNavigation',"if(compact()){setPanel(false);if(keepDetails&&hadDetails)document.body.classList.add('detail-open');}\n }\n function frameNavigation")
edit('learning-enhancements.js',"prepareNavigation();toggleTCM(true);\n  if(precisionMode==='strict')", "prepareNavigation(true);toggleTCM(true);\n  if(precisionMode==='strict')")
edit('learning-enhancements.js',"for(const selector of ['.study-toolbar','#tcmStatus'", "for(const selector of ['.stage-heading','.view-switcher','.stage-tools','.detail-panel','.study-toolbar','#tcmStatus'")
# Throttling must schedule a final on-demand frame rather than leave stale text.
edit('learning-enhancements.js','let labelOffsets=new Map(),labelPlacementAudit=[];', 'let labelOffsets=new Map(),labelPlacementAudit=[],labelRefreshTimer=0;')
edit('learning-enhancements.js','const now=performance.now();if(now-lastLabelsAt<40)return;lastLabelsAt=now;', 'const now=performance.now();if(now-lastLabelsAt<40){if(!labelRefreshTimer)labelRefreshTimer=setTimeout(()=>{labelRefreshTimer=0;ctx.invalidate();},41-(now-lastLabelsAt));return;}clearTimeout(labelRefreshTimer);labelRefreshTimer=0;lastLabelsAt=now;')
f=p/'reading-v26.css';f.write_text(f.read_text().replace('#labelNav{display:none!important}', '#acupointLabelNav{display:none!important}'))
# Report clarity; do not change data or source acknowledgements.
f=p/'versions.html';f.write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>V26 更新</title><style>body{max-width:760px;margin:40px auto;padding:20px;font:16px/1.8 system-ui;color:#315945}a{color:#276d62}</style><h1>V26 · 经络阅读与观察</h1><p>改进真实皮肤面上的连续笔触、穴位标签避让与引线，统一线路开关，保留完整线路，局部观察由用户明确开启。</p><p>手机点选先保留模型，详情主动打开为有限高度底部面板；定位镜头避开详情和工具栏。卡片先显示定位文字，复核状态和来源仍可查看。</p><p>编号穴位坐标不变。本次是图形和交互修复，不代表穴位完成临床配准。</p><p><a href="./">进入当前版本</a> · <a href="../fullbody-tcm-v25/">V25 回退</a> · <a href="release.json">测试记录</a></p></html>''')
# A continuity test must project actual skin contacts (the paint center), not
# the 0.35-normal-offset display tube, and must freeze the comparison camera.
f=Path('atlas26-repair/verify.cjs');s=f.read_text()
s=s.replace('l.clearPointSelection();l.setMeridians([\'PC\']);', "controls.enableDamping=false;controls.update();camera.clearViewOffset();l.clearPointSelection();l.setMeridians(['PC']);")
a=s.index('const sample=await p.evaluate(');b=s.index('const a=PNG.sync.read(blank)',a)
s=s[:a]+'''const sample=await p.evaluate(()=>{const l=__ATLAS_LEARNING__,{THREE,camera,scene}=__ATLAS_RENDER_AUDIT__,rect=document.querySelector('#viewport canvas').getBoundingClientRect(),pts=l.getNavigationCatalog(),a=pts.find(q=>q.code==='PC5'&&q.side==='right'),b=pts.find(q=>q.code==='PC6'&&q.side==='right'),count=l.getInkAudit().routes.find(r=>r.meridian==='PC'&&r.side==='right').drawnSegments;let mesh;scene.traverseVisible(n=>{if(n.userData.skinInk&&n.userData.meridian==='PC'&&n.userData.bodySide==='right')mesh=n;});const data=mesh.material.uniforms.inkData.value.image.data,g=[];for(let k=0;k<count;k++){if(!k)g.push(Array.from(data.slice(k*8,k*8+3)));g.push(Array.from(data.slice(k*8+4,k*8+7)));}const dist=(q,r)=>Math.hypot(...q.map((n,i)=>n-r[i]));const near=q=>g.reduce((best,r,i)=>dist(q,r)<dist(q,g[best])?i:best,0);let i=near(a.position),j=near(b.position);if(i>j)[i,j]=[j,i];const values=g.slice(i,j+1).map(q=>{const v=new THREE.Vector3(...q).project(camera);return [(v.x*.5+.5)*rect.width,(-v.y*.5+.5)*rect.height];});return {points:values,width:rect.width,height:rect.height};});''' +s[b:]
s=s.replace("await p.locator('#focusPointBtn').click();await settle();const q=", "await p.locator('#focusPointBtn').click();await settle();ck('Focusing from phone details keeps the details open',await p.evaluate(()=>document.body.classList.contains('detail-open')));const q=")
s=s.replace("await p.locator('#closePointCard').click();await settle();", "if(await p.locator('#closePointCard').isVisible())await p.locator('#closePointCard').click();await settle();")
s=s.replace("await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>__ATLAS_SHARED__.switchSex('male'));", "await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>__ATLAS_SHARED__.switchSex('male'));")
f.write_text(s)
print('Point framing and explicit details coexist; stable camera and painted-contact pixel audit')
