#!/usr/bin/env python3
from pathlib import Path

root=Path(__file__).resolve().parents[2]/'cocos-jigsaw-drop'
source=root/'assets/scripts/GameBootstrap.ts'
text=source.read_text(encoding='utf-8')
text=text.replace('            rotated: false,\n','')
text=text.replace('.call(resolve).start();','.call(() => resolve()).start();')
source.write_text(text,encoding='utf-8')
print('patched generated Cocos project TypeScript compatibility')
