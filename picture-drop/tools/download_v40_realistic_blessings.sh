#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/assets/blessings-realistic"
mkdir -p "$OUT"

fetch_asset() {
  local name="$1"
  local url="$2"
  local target="$OUT/$name"
  if [[ -s "$target" ]]; then
    echo "keep existing $name"
    return
  fi
  echo "download $name"
  curl -L --fail --retry 4 --retry-all-errors --connect-timeout 20 --max-time 240 \
    -A 'Mozilla/5.0 Jigsaw-Drop-GitHub-Builder' \
    -o "$target.tmp" "$url"
  mv "$target.tmp" "$target"
}

fetch_asset '01-lotus-sunrise.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:ec33d9f8-65f0-4bd4-8b26-03fa375b2526'
fetch_asset '02-trumpet-flower.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:f957ace1-ed8e-495e-afc8-da8c56d5a1f7'
fetch_asset '03-jujube-orchard.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:10a475db-a9a6-4bd2-b1f1-3fbbec34077e'
fetch_asset '04-elegant-woman.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:eb364ddf-c8ae-4d26-89c6-3bf4060b3d7f'
fetch_asset '05-blessing-vase.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:e1bfb40f-e36a-4c2b-ae02-2ac97e0e61fa'
fetch_asset '06-pine-crane.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:76510980-67fd-4f57-a0b3-e6b9d554f089'

python - <<'PY'
from pathlib import Path
import struct
root=Path('picture-drop/assets/blessings-realistic')
files=sorted(root.glob('*.png'))
assert len(files)==6, files
for p in files:
    data=p.read_bytes()
    assert data[:8]==b'\x89PNG\r\n\x1a\n', f'not png: {p}'
    width,height=struct.unpack('>II',data[16:24])
    assert (width,height)==(1080,1440), (p,width,height)
    assert len(data)>100_000, (p,len(data))
    print(p.name,width,height,len(data))
PY
