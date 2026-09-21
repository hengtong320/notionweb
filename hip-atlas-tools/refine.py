"""Polish additive page labels only; keep renderer and source geometry untouched."""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parents[1]/'hip-atlas'
replacements={
 '<title>骨盆与下肢图谱 · Lower Limb Atlas</title>':'<title>骨盆与下肢图谱 · Pelvis & Limb Atlas</title>',
 'content="真实解剖模型驱动的足骨 3D 学习工具。':'content="有来源的解剖模型驱动的骨盆与下肢 3D 学习工具。',
 '<b>右侧 · 第二期</b>':'<b>骨盆 · 第三期</b>',
 'class="baseline-link" href="https://hengtong320.github.io/notionweb/ankle-atlas/"':'class="baseline-link" href="https://hengtong320.github.io/notionweb/knee-atlas/"',
 'aria-label="右侧足踝和小腿三维模型"':'aria-label="骨盆与右侧下肢三维模型"',
 '<h2 id="regionHeading">小腿与足 <span>Lower leg &amp; foot</span></h2>':'<h2 id="regionHeading">骨盆与右下肢 <span>Pelvis &amp; right lower limb</span></h2>',
 '<p id="regionHint" class="region-hint">完整胫骨、腓骨 + 原有足骨</p>':'<p id="regionHint" class="region-hint">完整骨盆 + 右侧下肢 · 共 36 个独立骨块</p>',
 '>01 / 30<':'>01 / 36<',
 '<h2>探索足踝</h2>':'<h2>探索骨盆与下肢</h2>',
 '左侧“足部 / 足踝 / 小腿与足”切换观察范围。切换不会改变已拖动骨块的位置；需要恢复排列时请用“一键归位”。“足踝”聚焦关节，小腿上端在画面外；“小腿与足”显示完整长度。':'左侧可以在足部、足踝、小腿与足、膝部、下肢全览、右髋部、骨盆、骨盆与下肢之间切换。切换保留已拖动骨块的位置；恢复排列请用“一键归位”。“右髋部”聚焦髋关节，股骨下端可能在画面外，但完整骨形没有被截短。',
 '内侧指拇趾一侧，外侧指小趾一侧，不随画面左右改变。':'左右按人体自身的左右区分，不随画面改变。右下肢内侧朝向身体中线；足部内侧是拇趾侧，外侧是小趾侧。',
 '不是用球体、圆柱拼成的脚骨':'不是用球体、圆柱拼成的示意骨架'
}
for name in ['index.template.html','index.html']:
 p=root/name;s=p.read_text()
 for old,new in replacements.items():
  if old not in s:raise RuntimeError('Expected page label missing in '+name+': '+old)
  s=s.replace(old,new,1)
 p.write_text(s)
data=(root/'index.html').read_bytes();p=root/'build-info.json';info=json.loads(p.read_text())
info.update({'htmlBytes':len(data),'htmlSHA256':hashlib.sha256(data).hexdigest(),'revision':'hip-v1-pelvic-labels'})
p.write_text(json.dumps(info,ensure_ascii=False,indent=2))
print('LABELS_AND_LINK_VERIFIED',info['htmlSHA256'])
