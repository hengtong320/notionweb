#!/usr/bin/env python3
from pathlib import Path
import struct
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'blessings-realistic'
OUT.mkdir(parents=True, exist_ok=True)

ASSETS = {
    '01-lotus-sunrise.png': 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:1f37c267-2bc6-4818-b7c6-6e118c7faabd',
    '02-trumpet-flower.png': 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:69826483-d1b6-44f1-8405-c6817648ffb4',
    '03-jujube-orchard.png': 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:e160543e-0160-4370-abaa-fd579d21b98d',
    '04-elegant-woman.png': 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:f8e9d1ed-1d8a-4f28-8b70-7a1843afe874',
    '05-blessing-vase.png': 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:7680b8f9-0ffa-4117-b473-32e69351fe2f',
    '06-pine-crane.png': 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:49e2a024-d18c-4d8c-98e8-9782f90d1a1e',
}

PNG_SIGNATURE = b'\x89PNG\r\n\x1a\n'


def png_size(data: bytes) -> tuple[int, int]:
    if len(data) < 24 or data[:8] != PNG_SIGNATURE or data[12:16] != b'IHDR':
        raise ValueError('not a valid PNG')
    return struct.unpack('>II', data[16:24])


def is_valid(path: Path) -> bool:
    try:
        data = path.read_bytes()
        return len(data) > 100_000 and png_size(data) == (896, 1152)
    except Exception:
        return False


headers = {
    'User-Agent': 'Mozilla/5.0 JigsawDropBuild/4.0',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
}

for name, url in ASSETS.items():
    path = OUT / name
    if is_valid(path):
        print(f'SKIP valid {name} ({path.stat().st_size:,} bytes)')
        continue
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=90) as response:
        data = response.read()
    size = png_size(data)
    if size != (896, 1152):
        raise RuntimeError(f'{name}: expected 896x1152, got {size}')
    if len(data) <= 100_000:
        raise RuntimeError(f'{name}: unexpectedly small ({len(data)} bytes)')
    path.write_bytes(data)
    print(f'DOWNLOADED {name}: {size[0]}x{size[1]}, {len(data):,} bytes')

print('v4.0 realistic blessing image pack ready')
