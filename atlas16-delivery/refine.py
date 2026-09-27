from pathlib import Path
p=Path('fullbody-tcm-v16')
f=p/'view-v16.js';s=f.read_text()
s=s.replace("stage.append(top,bottom);", "stage.append(top,bottom);const bodySelectorHome=document.createComment('body selector original position');$('bodySelector').before(bodySelectorHome);")
s=s.replace("expanded=true;captureCamera();", "expanded=true;top.querySelector('.wide-title').after($('bodySelector'));captureCamera();")
s=s.replace("expanded=false;body.classList.remove", "expanded=false;bodySelectorHome.after($('bodySelector'));body.classList.remove")
s=s.replace("function details(){const p=learning.getState().selectedPoint;hegu.hidden=!(p?.code==='LI4'&&!female.active&&body.classList.contains('point-detail-active'));addContextActions();}", "function details(){const st=learning.getState(),p=st.selectedPoint;hegu.hidden=!(p?.code==='LI4'&&!female.active&&st.cardOpen);if(!hegu.hidden){const host=$('tcmPointCard');const actions=host.querySelector('.tcm-card-actions');if(actions)actions.after(hegu);else host.append(hegu);}addContextActions();}")
f.write_text(s)
f=p/'view-v16.css';f.write_text(f.read_text()+'''\n#wideViewBar .wide-title{display:none}#wideViewBar #bodySelector{margin:0;flex:none}#wideViewBar #bodySelector button{min-height:44px;min-width:44px;padding:6px 9px}body.atlas-expanded .selection-chip,body.atlas-expanded .view-badge{display:none!important}body[data-shared-ui].atlas-expanded .study-toolbar{display:none!important}\n@media(pointer:coarse) and (min-width:700px){#fullscreenBtn{min-width:44px;min-height:44px}}\n''')
f=p/'app.js';s=f.read_text().replace('(innerWidth<=1100?1.25:2)','(navigator.maxTouchPoints>1||innerWidth<=1100?1.25:2)').replace('aoPass.enabled=innerWidth>1100;','aoPass.enabled=innerWidth>1100&&navigator.maxTouchPoints<=1;').replace('Math.min(window.devicePixelRatio||1,2));previewRenderer','Math.min(window.devicePixelRatio||1,navigator.maxTouchPoints>1?1.25:2));previewRenderer');f.write_text(s)
f=p/'stability-v10.js';s=f.read_text().replace('V12 · Z-Anatomy','V16 · Z-Anatomy').replace('-V12-${','-V16-${');f.write_text(s)
f=p/'versions.html';s=f.read_text().replace('V15 经络与切换修订','V16 平板与人体观察').replace('<body>', '<body><p>当前 V16：平板稳定看图、器官在人体内、合谷掌骨参照修订。<a href="../fullbody-tcm-v15/">保留 V15</a></p>');f.write_text(s)
f=Path('atlas16-delivery/verify.cjs');s=f.read_text()
s=s.replace("const touchBefore=await camera();", "ck('Same gender selector is available inside expanded mode',await page.locator('#wideViewBar #bodySelector').isVisible());const touchBefore=await camera();")
a="await page.locator('#wideFrame').click();await settle();const framed="
b="""const nativeBefore=await camera();await page.locator('#wideNative').click();await page.waitForTimeout(250);report.nativeFullscreenActuallyEntered=await page.evaluate(()=>!!document.fullscreenElement||!!document.webkitFullscreenElement);if(report.nativeFullscreenActuallyEntered){await page.evaluate(()=>(document.exitFullscreen||document.webkitExitFullscreen).call(document));await page.waitForTimeout(250);ck('Actual native fullscreen exit retains in-page viewing',await page.evaluate(()=>__ATLAS_VIEW__.getState().expanded));ck('Actual native exit retains camera',delta(nativeBefore,await camera())<.001);}else ck('Native fullscreen unsupported or declined does not lose expanded state',await page.evaluate(()=>__ATLAS_VIEW__.getState().expanded));
 await page.locator('#wideFrame').click();await settle();const framed="""
assert a in s;s=s.replace(a,b)
s=s.replace("ck('User can explicitly exit expansion',", "ck('Same gender selector returns to original header',await page.locator('.topbar #bodySelector').isVisible());ck('User can explicitly exit expansion',")
f.write_text(s)
print('V16 review fixes: visible inline LI4 guide, shared gender control, native-exit check and touch GPU budget')
