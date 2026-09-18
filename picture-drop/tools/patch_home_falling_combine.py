#!/usr/bin/env python3
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'index.html'
s=p.read_text(encoding='utf-8')
old='<a href="synthesis.html?v=2.0.0" class="secondary-btn" style="display:flex;align-items:center;justify-content:space-between;text-decoration:none;background:linear-gradient(135deg,#29377c,#8a43ad);border-color:rgba(255,232,115,.55);color:#fff;box-shadow:0 8px 20px rgba(38,24,96,.28)"><span style="font-weight:900">层级合成 · 新版试玩</span><small style="font-size:10px;opacity:.9">微颗粒 → 局部 → 大区域 → 完整大图</small></a>'
new='<a href="falling-combine.html?v=3.0.0" class="secondary-btn" style="display:flex;align-items:center;justify-content:space-between;text-decoration:none;background:linear-gradient(135deg,#234f82,#7145aa);border-color:rgba(255,232,115,.55);color:#fff;box-shadow:0 8px 20px rgba(38,24,96,.28)"><span style="font-weight:900">下落式层级合成 · v3</span><small style="font-size:10px;opacity:.9">发牌下落 → 4块成小图 → 16图成大图</small></a>'
if old in s:s=s.replace(old,new,1)
elif 'falling-combine.html?v=3.0.0' not in s:raise SystemExit('expected synthesis entry not found')
p.write_text(s,encoding='utf-8')
print('patched homepage falling combine entry')
