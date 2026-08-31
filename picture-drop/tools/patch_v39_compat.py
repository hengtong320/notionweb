#!/usr/bin/env python3
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'game.js'
s=p.read_text(encoding='utf-8')
old='pictureCount:PICTURE_PATHS.length,predictCascade'
new='pictureCount:STANDARD_PICTURE_COUNT,totalPictureCount:PICTURE_PATHS.length,predictCascade'
if old not in s and new not in s:raise SystemExit('pictureCount export marker missing')
if old in s:s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')
print('patched v3.9 classic picture-count compatibility')
