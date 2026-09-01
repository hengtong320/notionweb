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
  curl -L --fail --silent --show-error --retry 4 --retry-all-errors \
    --connect-timeout 20 --max-time 240 \
    -A 'Mozilla/5.0 Jigsaw-Drop-GitHub-Builder' \
    -H 'Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8' \
    -o "$target.tmp" "$url"
  mv "$target.tmp" "$target"
}

# Adobe Firefly photorealistic, full-bleed, text-free 3:4 bases.
fetch_asset '01-lotus-sunrise.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:1f37c267-2bc6-4818-b7c6-6e118c7faabd'
fetch_asset '02-trumpet-flower.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:69826483-d1b6-44f1-8405-c6817648ffb4'
fetch_asset '03-jujube-orchard.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:e160543e-0160-4370-abaa-fd579d21b98d'
fetch_asset '04-elegant-woman.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:f8e9d1ed-1d8a-4f28-8b70-7a1843afe874'
fetch_asset '05-blessing-vase.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:7680b8f9-0ffa-4117-b473-32e69351fe2f'
fetch_asset '06-pine-crane.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:49e2a024-d18c-4d8c-98e8-9782f90d1a1e'

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
    assert (width,height)==(896,1152), (p,width,height)
    assert len(data)>100_000, (p,len(data))
    print(p.name,width,height,len(data))
PY
