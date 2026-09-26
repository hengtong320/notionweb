from pathlib import Path
import json
p=Path('fullbody-tcm-v15')
def replace(file, old, new):
 path=p/file;s=path.read_text();assert old in s,(file,old[:120]);path.write_text(s.replace(old,new))
# Reading a point is not a camera action. The detail drawer must open even when
# autofocus is OFF; opening it must never change the chosen camera pose.
replace('learning-enhancements.js', "mountLayerContext();window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'point'", "mountLayerContext();if(compact()){setPanel(false);document.body.classList.remove('nav-open');document.body.classList.add('detail-open');}window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'point'")
# Clear wires immediately, including in on-demand rendering.
replace('learning-enhancements.js', "function updateOverlayVisibility(){ctx.invalidate();if(surfaceAttached)xray=false;", "function updateOverlayVisibility(){ctx.invalidate();if(!enabled||suspended||!pointsOn||!namesOn){wires.innerHTML='';labels.hidden=true;}if(surfaceAttached)xray=false;")
# Never present display consistency metrics as clinical accuracy.
replace('learning-enhancements.js', "side:p.side,position:p.position.toArray(),expected:expected.toArray(),secondaryShift", "side:p.side,sourcePosition:(p.sourcePosition||p.position).toArray(),displayDisplacement:p.position.distanceTo(p.sourcePosition||p.position),position:p.position.toArray(),expected:expected.toArray(),secondaryShift")
replace('learning-enhancements.js', "getSurfaceState:()=>({attached:surfaceAttached", "getSurfaceState:()=>({projectionDiagnostics:surfaceProjector?.stats()||null,attached:surfaceAttached")
replace('learning-enhancements.js', "card.innerHTML=pointCardV9(p,m,BY_ID);", "card.innerHTML=pointCardV9(p,m,BY_ID);if(p.position){const info=document.createElement('details');info.className='point-projection-info';const source=p.sourcePosition||p.position;const shift=p.position.distanceTo(source);info.innerHTML='<summary>当前图形位置的依据</summary><p>名称与文字说明、原始部位参照、贴面显示是不同的数据。此点仍是未完成体表定位审核的部位参照，不用于准确取穴。</p><p>'+ (surfaceAttached?'本次显示投影相对原部位参照偏移约 '+shift.toFixed(1)+' 个模型毫米；这不是定位误差或临床精度。':'当前使用原部位参照，未做体表校准。')+'</p>';card.append(info);}")
css=p/'shared-v14.css';css.write_text(css.read_text()+'''\n.point-projection-info{font-size:12px;line-height:1.65;margin-top:14px;color:#586a63}.point-projection-info summary{cursor:pointer}.point-projection-info p{margin:8px 0}\n''')
f=Path('atlas15-delivery/verify.cjs');s=f.read_text()
s=s.replace("ck('Channel switch preserves rotated and zoomed camera',distance(before,await cam())<.001);", """ck('Channel switch preserves rotated and zoomed camera',distance(before,await cam())<.001);
 const allChannels=await page.evaluate(()=>{const l=__ATLAS_LEARNING__,result=[];const expected={LU:22,LI:40,ST:90,SP:42,HT:18,SI:38,BL:134,KI:54,PC:18,TE:46,GB:88,LR:28,GV:28,CV:24};for(const [id,n]of Object.entries(expected)){l.selectPoint('PC6','right',false);l.setMeridians([id]);const w=l.getReferenceWindowState();result.push({id,expected:n,actual:w.visible.length,unclipped:!w.active&&w.clippedRouteMaterials===0});}return result;});
 ck('All 14 filters release previous local crop and retain their complete point catalogs',allChannels.every(x=>x.actual===x.expected&&x.unclipped),allChannels);
""")
s=s.replace("ck('Each attached point lies on its own sampled route',audit.maxLineGap<.01,audit.maxLineGap);", """ck('Each attached point lies on its own sampled route',audit.maxLineGap<.01,audit.maxLineGap);
 ck('Projection audit reports source displacement instead of claiming anatomical accuracy',audit.points.every(x=>Array.isArray(x.sourcePosition)&&Number.isFinite(x.displayDisplacement)));
""")
s=s.replace("ck('Phone selected point description is visible',await page.locator('#tcmPointCard').isVisible());await snap('phone-point');", """ck('Phone selected point description is visible',await page.locator('#tcmPointCard').isVisible());ck('Phone selection opens detail independently of camera autofocus',await page.evaluate(()=>!__ATLAS_LEARNING__.getState().autoFocus&&document.body.classList.contains('detail-open')&&!document.body.classList.contains('nav-open')));await snap('phone-point');
 const phoneCam=await cam();await page.locator('#pointNext').click();await settle();ck('Phone next point is visible and respects disabled autofocus',await page.locator('#tcmPointCard').isVisible()&&distance(phoneCam,await cam())<.001);
""")
s=s.replace("ck('Landscape no horizontal overflow',", """await page.locator('#openNav').click();await page.locator('#tcmTab').click();await page.locator('#acupointSearch').fill('长强');await page.locator('[data-point="GV1"]').first().click();await settle();ck('Landscape point description is readable with autofocus off',await page.locator('#tcmPointCard').isVisible());await snap('landscape-point');
 ck('Landscape no horizontal overflow',""")
f.write_text(s)
readme=p/'README.md';readme.write_text(readme.read_text()+'''\n\n发布补充：手机选择穴名与自动聚焦解耦；关闭名称立即清除引线；逐项核对14经的筛选数量；投影审计保留原位置与显示位移。单点与所属线路使用同一锚点，但此为图形一致性，不是所有经穴位置通过标准取穴审核。\n''')
print('FINAL: drawer/camera independence; explicit projection provenance; expanded channel regression')
