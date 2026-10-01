"""Finalize body-specific foot contact and coherent explicit point selection."""
from pathlib import Path
p=Path('fullbody-tcm-v28')
f=p/'skin-v17.js';s=f.read_text();a="if(m==='BL'&&v.y<1440)return new THREE.Vector3(0,0,-1);";b="if(m==='BL'&&v.y<1440&&r!=='foot')return new THREE.Vector3(0,0,-1);";assert s.count(a)==1;f.write_text(s.replace(a,b))
f=p/'README.md';f.write_text(f.read_text()+'\n足部复查发现膀胱经通用背侧方向覆盖了足部自己的观察方向。足部现在沿用现有逐点方向参照，不再向后投到脚趾另一面；这仍是显示投影修正，不是临床标志重新配准。主动点选时，点位按钮、选中标记和皮肤绘点一起同步，即使关闭自动聚焦也不依赖镜头移动来刷新。\n')
(p/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 V28</title><style>body{font:16px/1.8 system-ui;max-width:740px;padding:30px;margin:auto;background:#f3f6ed;color:#315842}a{color:#246a50}</style><h1>V28 · 男女体表一致性</h1><p>手足外层接触投影，男女各自的皮肤点线缓存；恢复选点不覆盖隐藏状态；局部观察跟随同名穴位与当前皮肤。</p><p>原始点位依据及人体模型不变，显示投影会因错误面修正而改变。仍未逐穴临床校准。</p><p><a href="./">进入当前版本</a> · <a href="../anatomy/">固定入口</a> · <a href="../fullbody-tcm-v27/">V27 回退</a></p></html>''',encoding='utf-8')
f=p/'learning-enhancements.js';s=f.read_text()
a="selectedPoint=p;if(!restoring)pointsOn=true;labelPage=0;"
b="selectedPoint=p;if(!restoring){pointsOn=true;$('acupointToggle').classList.add('active');$('acupointToggle').setAttribute('aria-pressed','true');}labelPage=0;"
assert s.count(a)==1;s=s.replace(a,b)
a="if(!surfaceProjector.isVisible(p.position,cameraPos)){"
b="if(old.visible&&!surfaceProjector.isVisible(p.position,cameraPos)){"
assert s.count(a)==1;s=s.replace(a,b)
a="if(!restoring&&autoSpeak()&&!state.bodyTransition)speak(p.name);return true;"
b="updateOverlayVisibility();if(!restoring&&autoSpeak()&&!state.bodyTransition)speak(p.name);return true;"
assert s.count(a)==1;s=s.replace(a,b);f.write_text(s)
f=Path('atlas28-repair/verify.cjs');s=f.read_text()
a=" // Independent scene raycasts cover dorsal, palmar, plantar and trunk points."
assert s.count(a)==1
extra=""" await p.evaluate(()=>{for(const id of ['acupointToggle','meridianLineToggle','pointNamesToggle'])if(document.getElementById(id).classList.contains('active'))document.getElementById(id).click();__ATLAS_LEARNING__.setMeridian('TE');__ATLAS_LEARNING__.selectPoint('TE3','right',false);});await settle();const clicked=await snapshot();ck('Intentional point selection without auto-focus updates both UI and skin drawing, not lines or names',clicked.flags.pointsOn&&clicked.ui.point&&clicked.selected.markerVisible&&clicked.inks.every(i=>i.points)&&!clicked.flags.linesOn&&!clicked.flags.namesOn,clicked.flags);await p.evaluate(()=>{for(const id of ['meridianLineToggle','pointNamesToggle'])if(!document.getElementById(id).classList.contains('active'))document.getElementById(id).click()});await settle();
"""
s=s.replace(a,extra+a);f.write_text(s)
