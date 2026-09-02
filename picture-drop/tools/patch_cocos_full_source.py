#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
source=ROOT/'cocos-jigsaw-drop'/'assets'/'scripts'/'GameBootstrap.ts'
text=source.read_text(encoding='utf-8')
text=text.replace(
    '            const stencil = mask.graphics;\n',
    '            const stencil = surface.getComponent(Graphics) ?? surface.addComponent(Graphics);\n',
)
source.write_text(text,encoding='utf-8')
print('patched complete Cocos source compatibility')
