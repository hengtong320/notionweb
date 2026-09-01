#!/usr/bin/env python3
from pathlib import Path
import json
from PIL import Image

root=Path(__file__).resolve().parents[2]/'cocos-jigsaw-drop'
source=root/'assets/scripts/GameBootstrap.ts'
text=source.read_text(encoding='utf-8')
text=text.replace('            rotated: false,\n','')
text=text.replace('.call(resolve).start();','.call(() => resolve()).start();')
text=text.replace('Cocos Creator 3.8.6 原生2D渲染样板','Cocos Creator 3.8.8 原生2D渲染样板')
source.write_text(text,encoding='utf-8')

# Cocos supports WebP on mini-game targets, but JPG is the safest source format
# for importing and previewing the same project on macOS/Windows editors.
pictures=root/'assets/resources/pictures'
for src in sorted(pictures.glob('*.webp')):
    dst=src.with_suffix('.jpg')
    with Image.open(src) as image:
        image.convert('RGB').save(dst,'JPEG',quality=91,optimize=True,progressive=True)
    src.unlink()

package_path=root/'package.json'
package=json.loads(package_path.read_text(encoding='utf-8'))
package['creator']['version']='3.8.8'
package_path.write_text(json.dumps(package,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

manifest_path=root/'migration-manifest.json'
manifest=json.loads(manifest_path.read_text(encoding='utf-8'))
manifest['creator']='3.8.8'
manifest['textureFormat']='jpg'
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

for relative in ['README.md','PROJECT_VERSION']:
    path=root/relative
    body=path.read_text(encoding='utf-8').replace('3.8.6','3.8.8').replace('WebP 资源','JPG 资源').replace('WebP assets','JPG assets')
    path.write_text(body,encoding='utf-8')

print('patched generated project for Cocos Creator 3.8.8 and JPG textures')
