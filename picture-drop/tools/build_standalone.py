#!/usr/bin/env python3
from pathlib import Path
import base64,re
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text('utf-8');css=(ROOT/'style.css').read_text('utf-8');js=(ROOT/'game.js').read_text('utf-8')
assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg')),*((ROOT/'assets'/'blessings-realistic').glob('*.png'))]
for image_path in sorted(assets):
    relative=image_path.relative_to(ROOT).as_posix()
    mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else ('image/png' if image_path.suffix.lower()=='.png' else 'image/webp')
    data_uri=f'data:{mime};base64,'+base64.b64encode(image_path.read_bytes()).decode('ascii')
    js=js.replace(f"'{relative}'",f"'{data_uri}'")
html=re.sub(r'\s*<link rel="manifest"[^>]*>\n?','\n',html)
html=re.sub(r'  <link rel="stylesheet" href="style\.css[^\"]*" />',f'  <style>\n{css}\n  </style>',html)
html=re.sub(r'  <script src="game\.js[^\"]*"></script>',f'  <script>\n{js}\n  </script>',html)
out=ROOT/'Jigsaw-Drop-offline.html';out.write_text(html,'utf-8');print(f'Built {out} ({out.stat().st_size:,} bytes)')
