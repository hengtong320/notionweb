from pathlib import Path
p=Path('fullbody-tcm-v13')
f=p/'tissues-v4.js';s=f.read_text()
s=s.replace("$('surfaceAttachNote').textContent=on?'正在准备同源体表显示投影…':'已恢复原示意坐标';", "if($('surfaceAttachNote'))$('surfaceAttachNote').textContent=on?'正在准备同源体表显示投影…':'已恢复原示意坐标';")
s=s.replace("$('surfaceAttachNote').textContent=on?'贴面是显示投影，原穴位坐标未修改；不构成准确取穴。取消勾选可恢复原参照。':'已恢复原示意坐标；体表仍可独立显示。';", "if($('surfaceAttachNote'))$('surfaceAttachNote').textContent=on?'贴面是显示投影，原穴位坐标未修改；不构成准确取穴。取消勾选可恢复原参照。':'已恢复原示意坐标；体表仍可独立显示。';")
a=" async function setAnatomyView(name){"
b=""" async function showSurfaceInPlace(){
  const serial=++viewSerial;profile='surface';organBox=null;clearSelection();hiddenStructures.clear();
  await enable('surface',true);if(serial!==viewSerial)return false;
  if(!systems.surface.loaded)throw Error('体表未加载成功');
  for(const id of Object.keys(systems))if(id!=='surface')await enable(id,false);
  state.bonesOn=false;$('bonesOn').checked=false;ctx.applyVisibility();setOpacity('surface',1);
  nerveXray=false;$('nerveXray').checked=false;clipOn=false;$('tissueClip').checked=false;
  await attachSurface(true);if(serial!==viewSerial)return false;
  ctx.learning.setPrecisionMode('illustrative');ctx.learning.toggleTCM(true,false);
  lastKey='';updateFrame();ctx.invalidate();window.dispatchEvent(new CustomEvent('atlas:profile-changed',{detail:{profile}}));return true;
 }
 async function setAnatomyView(name){
  if(name==='surface')return showSurfaceInPlace();"""
assert a in s;s=s.replace(a,b,1);f.write_text(s)
f=p/'speech-v4.js';s=f.read_text();assert "if(voice==='neural'&&key&&!guarded)" in s
s=s.replace("if(voice==='neural'&&key&&!guarded)","if((voice==='neural'||voice==='corrected')&&key&&!guarded)")
s=s.replace('读音优先使用普通话设备音色和术语提示；多音字不再复用旧版未核音录音。不同设备仍可能读错，带声调拼音用于核对。本版未重新生成或逐条审听全部音频。','13个易错词使用专项纠音录音，其余优先沿用预制音频；设备语音作为备用。未逐条人工审听全部名称，拼音可用于核对。')
f.write_text(s)
f=p/'session-v13.js';s=f.read_text()
s=s.replace("b.disabled=f&&id.startsWith('ear-');b.title=b.disabled?'女性资料未包含与男性一致的独立耳部场景':'';", "b.disabled=(f&&id.startsWith('ear-'))||(!f&&id==='breast');b.title=b.disabled?(f?'女性资料未包含独立耳部场景':'当前男性资料不含独立乳腺层'):'';")
f.write_text(s)
f=Path('atlas13-tools/verify.cjs');s=f.read_text()
a=" await page.evaluate(()=>window.__ATLAS_TISSUES__.attachSurface(false));"
b=""" await unchanged('Surface mode preserves selected meridians and camera',()=>page.evaluate(()=>window.__ATLAS_SESSION__.choose('surface')));
 ck('Surface mode keeps HT+PC instead of replacing with kidney',await page.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.selectedMeridians.includes('HT')&&s.selectedMeridians.includes('PC')&&!s.selectedMeridians.includes('KI');}));
 await page.evaluate(()=>window.__ATLAS_TISSUES__.attachSurface(false));"""
assert a in s;s=s.replace(a,b,1);f.write_text(s)
print('REVIEW01_OK')
