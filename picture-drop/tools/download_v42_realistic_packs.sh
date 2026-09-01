#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/assets/blessings-v42"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

fetch(){
  local name="$1" url="$2"
  echo "fetching $name"
  curl -L --fail --retry 4 --retry-all-errors --connect-timeout 20 --max-time 180 "$url" -o "$TMP/$name.png"
  test -s "$TMP/$name.png"
}

fetch 07-peony-courtyard 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:b262dd3d-abeb-4a99-b387-683cf5656ef6'
fetch 08-tea-terraces 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:8d107b5a-b292-4670-a133-f89548e92a70'
fetch 09-wheat-windmill 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:36fd61d6-fa2a-4481-8c6b-7fdb979db2e2'
fetch 10-ocean-sailboat 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:5b5463fc-ff87-4229-b13c-27244a6915e7'
fetch 11-sunflower-lane 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:505bda04-4105-4db0-b1cb-2ce21a958aaa'
fetch 12-ginkgo-temple 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:4e3ff3d9-34f3-4a01-9efd-61e1a7862924'
fetch 13-heli-red-mountain 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:8698a93e-b605-4b9d-8eee-73ffedcaab47'
fetch 14-heli-white-coast 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:f29e8e67-dbf0-4352-aee3-30fd534d2946'
fetch 15-heli-yellow-alpine 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:1b668a66-b64f-4759-9c46-653de9b50d03'
fetch 16-heli-blue-city 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:d6bdad57-f813-4fd6-86ab-8f0446134b38'
fetch 17-heli-black-desert 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:a3b5f40c-9c2d-47b6-9683-25ec68ef50e9'
fetch 18-heli-silver-snow 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:49fd23bb-7c2a-4a5e-bea7-28401a9bac00'

python - "$TMP" "$OUT" <<'PY'
from pathlib import Path
from PIL import Image, ImageOps
import sys
src=Path(sys.argv[1]);out=Path(sys.argv[2])
for path in sorted(src.glob('*.png')):
    with Image.open(path) as im:
        im=ImageOps.exif_transpose(im).convert('RGB')
        im=ImageOps.fit(im,(900,1200),method=Image.Resampling.LANCZOS,centering=(0.5,0.5))
        target=out/(path.stem+'.webp')
        im.save(target,'WEBP',quality=88,method=6)
        if target.stat().st_size>1_500_000:
            raise SystemExit(f'asset too large: {target} {target.stat().st_size}')
        print(target,target.stat().st_size)
PY

test "$(find "$OUT" -maxdepth 1 -name '*.webp' | wc -l | tr -d ' ')" = '12'
