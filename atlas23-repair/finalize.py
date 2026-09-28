from pathlib import Path
p=Path('fullbody-tcm-v23')
def edit(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:80]);f.write_text(s.replace(old,new,1))
edit('female-v12.js',"function detailMutation(key,fn){const a=window.__ATLAS_SHARED__;return (a?a.runMutation(key,fn):Promise.resolve().then(fn))", "function detailMutation(key,fn){const a=window.__ATLAS_SHARED__,target=selected,job=()=>{if(!active||target!==selected)return false;return fn();};return (a?a.runMutation(key,job):Promise.resolve().then(job))")
edit('tissues-v4.js',"const hide=()=>{hiddenStructures.add(id);", "const hide=()=>{if(state.bodySex==='female'||selected?.id!==id)return false;hiddenStructures.add(id);")
edit('shared-v14.js',"currentReference=false;currentPoint=null;learning.clearStudyContext(true);\n  layoutRevision++;scene='custom';", "currentReference=false;currentPoint=null;learning.clearStudyContext(true);if(solo)learning.toggleTCM(false);\n  layoutRevision++;scene='custom';")
# Camera snapshots must include orbit distance limits changed by a close-up.
edit('app.js',"viewName:state.view};}", "viewName:state.view,controlLimits:{minDistance:controls.minDistance,maxDistance:controls.maxDistance}};}")
edit('app.js',"controls.target.fromArray(v.target);camera.up.fromArray(v.up);", "controls.target.fromArray(v.target);const distance=camera.position.distanceTo(controls.target);controls.minDistance=Number.isFinite(v.controlLimits?.minDistance)?v.controlLimits.minDistance:Math.min(controls.minDistance,distance);controls.maxDistance=Number.isFinite(v.controlLimits?.maxDistance)?v.controlLimits.maxDistance:Math.max(controls.maxDistance,distance);camera.up.fromArray(v.up);")
f=p/'learning-enhancements.js';f.write_text(f.read_text().replace("version:'22.0.0'","version:'23.0.0'"))
(p/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 · V23</title><style>body{max-width:780px;margin:40px auto;padding:20px;font:16px/1.8 system-ui;background:#f4f7ee;color:#315945}a{color:#276d62}</style><h1>V23 · 结构选择与定位</h1><p>修复女性左右筛选、单独查看后隐藏为空、搜索结构受旧隔离限制及隐藏后名称残留。体表下的结构采用临时单独查看，支持恢复原图层、经络与视角；不使用透明人体掩盖定位问题。</p><p>搜索可清空筛选，翻页自动对准新结果。源模型、部件数和经穴定位不改动。</p><p><a href="./">进入当前版本</a> · <a href="../anatomy/">固定入口</a> · <a href="release.json">发布与验证记录</a></p><h2>历史版本</h2><p><a href="../fullbody-tcm-v22/">V22 图层与切换稳定性</a></p><p><a href="../fullbody-tcm-v21/">V21 图层直达与教学参考</a></p><p>女性原生与共享教学来源分别标明；穴位未逐一临床配准。</p></html>''')
f=Path('atlas23-repair/verify.cjs')
if f.exists():
 s=f.read_text();s=s.replace("const pb=await p.locator('#directoryPreview').boundingBox();", "const pb=await p.locator('#directoryPreview').count()?await p.locator('#directoryPreview').boundingBox():null;")
 s=s.replace("r.sourceId==='femur-right'", "r.sourceId==='femur'")
 needle="restored.camera.target.every((v,i)=>Math.abs(v-original.camera.target[i])<.001));"
 assert needle in s
 s=s.replace(needle,"restored.camera.target.every((v,i)=>Math.abs(v-original.camera.target[i])<.001),{original:original.camera,restored:restored.camera});")
 f.write_text(s)
print('Stale detail actions guarded; solo preview hides unrelated meridians; version notes updated')
