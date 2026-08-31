#!/usr/bin/env python3
"""Build a completely self-contained offline HTML edition."""
from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / 'index.html').read_text('utf-8')
css = (ROOT / 'style.css').read_text('utf-8')
js = (ROOT / 'game.js').read_text('utf-8')

for image_path in sorted((ROOT / 'assets' / 'pictures').glob('*.webp')):
    relative = f'assets/pictures/{image_path.name}'
    data_uri = 'data:image/webp;base64,' + base64.b64encode(image_path.read_bytes()).decode('ascii')
    js = js.replace(f"'{relative}'", f"'{data_uri}'")

html = html.replace('  <link rel="manifest" href="manifest.webmanifest" />\n', '')
html = html.replace('  <link rel="icon" href="assets/icons/icon-192.png" type="image/png" />\n', '')
html = html.replace('  <link rel="stylesheet" href="style.css" />', f'  <style>\n{css}\n  </style>')
html = html.replace('  <script src="game.js"></script>', f'  <script>\n{js}\n  </script>')

output = ROOT / 'Jigsaw-Drop-offline.html'
output.write_text(html, 'utf-8')
print(f'Built {output} ({output.stat().st_size:,} bytes)')
