#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/assets/blessings-real"
mkdir -p "$OUT"

fetch() {
  local name="$1" url="$2" tmp="$OUT/.${name}.tmp"
  echo "Downloading ${name}"
  curl -L --fail --show-error --silent \
    --retry 5 --retry-delay 2 --retry-all-errors \
    --connect-timeout 25 --max-time 240 \
    -A 'Mozilla/5.0 (compatible; JigsawDropBuild/4.0)' \
    "$url" -o "$tmp"
  mv "$tmp" "$OUT/$name"
}

# Adobe Firefly originals generated specifically for the Scheme-B blessing mode,
# then reframed losslessly to 720x960 for predictable H5 memory and download cost.
fetch '01-lotus-sunrise.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:32bca72f-4816-40a1-bc85-d2f20f557522'
fetch '02-trumpet-flower.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:8a60be8e-de58-46fa-9845-de694db5c7d4'
fetch '03-jujube-orchard.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:492e8c08-3c86-44ee-a0d3-089202c20e65'
fetch '04-elegant-woman.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:5ef9426b-73fd-4971-b397-ec985fd14cc8'
fetch '05-blessing-vase.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:cb8bf747-4e87-421c-98a1-79af6d35d402'
fetch '06-pine-crane.png' 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:41dcd8a2-ffa0-451b-8840-b21705f79529'

python - "$OUT" <<'PY'
from pathlib import Path
import hashlib, json, struct, sys
out=Path(sys.argv[1])
manifest=[]
for p in sorted(out.glob('*.png')):
    data=p.read_bytes()
    if data[:8] != b'\x89PNG\r\n\x1a\n':
        raise SystemExit(f'{p.name}: not a PNG')
    width,height=struct.unpack('>II',data[16:24])
    if (width,height)!=(720,960):
        raise SystemExit(f'{p.name}: expected 720x960, got {width}x{height}')
    if len(data)<100_000:
        raise SystemExit(f'{p.name}: unexpectedly small ({len(data)} bytes)')
    manifest.append({'file':p.name,'width':width,'height':height,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
if len(manifest)!=6:
    raise SystemExit(f'expected 6 images, got {len(manifest)}')
(out/'manifest.json').write_text(json.dumps({'source':'Adobe Firefly generated originals','scheme':'B','images':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(manifest,ensure_ascii=False,indent=2))
PY
