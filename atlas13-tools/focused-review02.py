from pathlib import Path
p=Path('fullbody-tcm-v13')
f=p/'tissues-v4.js';s=f.read_text();a=' async function attachSurface(on){';assert a in s;s=s.replace(a," function surfaceStatus(text){const el=$('surfaceAttachNote');if(el)el.textContent=text;}\n"+a)
a="$('surfaceAttachNote').textContent=on?'正在准备同源体表显示投影…':'已恢复原示意坐标';";assert a in s;s=s.replace(a,"surfaceStatus(on?'正在准备同源体表显示投影…':'已恢复原示意坐标');")
a="$('surfaceAttachNote').textContent=on?'贴面是显示投影，原穴位坐标未修改；不构成准确取穴。取消勾选可恢复原参照。':'已恢复原示意坐标；体表仍可独立显示。';";assert a in s;s=s.replace(a,"surfaceStatus(on?'区域贴面显示，不构成准确取穴；取消可恢复参照。':'已恢复原参照；体表仍可独立显示。');");f.write_text(s)
f=p/'refinement-v12.js';s=f.read_text();a="const update=()=>{const s=tissues.getState();";assert a in s;s=s.replace(a,"const update=()=>{if(female.active)return;const s=tissues.getState();")
s=s.replace('href="./assets/female/source-metadata.json"','href="../fullbody-tcm-v12/assets/female/source-metadata.json"');f.write_text(s)
print('SURFACE_AND_SHARED_STATUS_READY')
