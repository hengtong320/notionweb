#!/usr/bin/env python3
from pathlib import Path

root=Path(__file__).resolve().parents[1]
path=root/'index.html'
s=path.read_text(encoding='utf-8')
s=s.replace('href="boss.html?v=1.1.0"','href="synthesis.html?v=2.0.0"')
s=s.replace('终极合成 · BOSS试玩','层级合成 · 新版试玩')
s=s.replace('4块吸附成小图 → 16图下落合成画卷','微颗粒 → 局部 → 大区域 → 完整大图')
path.write_text(s,encoding='utf-8')
print('patched synthesis entry')
