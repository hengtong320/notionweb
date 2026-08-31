from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'assets' / 'pictures'
DST = ROOT / 'assets' / 'pictures-portrait'
DST.mkdir(parents=True, exist_ok=True)

TARGET = (690, 1000)  # measured reference tile/full-image aspect ~= 0.69

files = sorted(SRC.glob('*.webp'))
if not files:
    raise SystemExit('no source pictures found')

for src in files:
    with Image.open(src) as im:
        im = im.convert('RGB')
        fitted = ImageOps.fit(
            im,
            TARGET,
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
        fitted.save(DST / src.name, 'WEBP', quality=86, method=6)

print(f'generated {len(files)} portrait pictures at {TARGET[0]}x{TARGET[1]}')
