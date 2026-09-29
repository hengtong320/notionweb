"""Final visual-review fixes applied before bundling and all browser checks."""
from pathlib import Path
p=Path('fullbody-tcm-v25')
f=p/'learning-enhancements.js';s=f.read_text()
a='const u=r.ink.mesh.material.uniforms;u.lineScale.value='
assert a in s
s=s.replace(a,'const u=r.ink.mesh.material.uniforms;u.pixelRatio.value=ctx.renderer.getPixelRatio();u.lineScale.value=',1);f.write_text(s)
f=p/'skin-ink-v24.js';s=f.read_text()
a='clamp(max(.55,perpendicularPixel*.85*pixelRatio),.55,3.)*lineScale'
assert a in s
s=s.replace(a,'clamp(perpendicularPixel*1.1*pixelRatio,.18,3.)*lineScale',1);f.write_text(s)
f=p/'README.md';s=f.read_text().replace('皮肤笔触按线条垂直方向的屏幕导数计算抗锯齿，适配设备像素比。','皮肤笔触按线条垂直方向的屏幕导数计算抗锯齿，适配设备像素比。近看时降低物理宽度下限，避免放大到指趾后笔触变成粗条。未进入镜头的经脉材质也同步初始化当前像素比，转入镜头时继续实时更新。');f.write_text(s)
print('Close-up stroke width and pixel density initialization updated')
