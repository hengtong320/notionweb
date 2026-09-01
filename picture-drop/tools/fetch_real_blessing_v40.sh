#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/assets/blessings-real"
mkdir -p "$OUT"

names=(
  "01-lotus-sunrise.png"
  "02-trumpet-flower.png"
  "03-jujube-orchard.png"
  "04-elegant-woman.png"
  "05-blessing-vase.png"
  "06-pine-crane.png"
)
urls=(
  "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:32bca72f-4816-40a1-bc85-d2f20f557522"
  "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:8a60be8e-de58-46fa-9845-de694db5c7d4"
  "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:492e8c08-3c86-44ee-a0d3-089202c20e65"
  "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:5ef9426b-73fd-4971-b397-ec985fd14cc8"
  "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:cb8bf747-4e87-421c-98a1-79af6d35d402"
  "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:41dcd8a2-ffa0-451b-8840-b21705f79529"
)

for i in "${!names[@]}"; do
  target="$OUT/${names[$i]}"
  # Once committed, keep the checked-in asset so future builds never depend on an expiring URL.
  if [[ -s "$target" ]]; then
    continue
  fi
  tmp="$target.part"
  curl -L --fail --retry 4 --retry-all-errors --connect-timeout 20 --max-time 180 \
    --silent --show-error -o "$tmp" "${urls[$i]}"
  mv "$tmp" "$target"
done

python - <<'PY'
from pathlib import Path
import struct
root=Path('picture-drop/assets/blessings-real')
files=sorted(root.glob('*.png'))
assert len(files)==6, files
for p in files:
    data=p.read_bytes()
    assert data[:8]==b'\x89PNG\r\n\x1a\n', f'not PNG: {p}'
    w,h=struct.unpack('>II',data[16:24])
    assert (w,h)==(720,960), f'{p}: {(w,h)}'
    assert len(data)>150_000, f'{p} unexpectedly small'
    print(f'OK {p.name}: {w}x{h}, {len(data):,} bytes')
PY
