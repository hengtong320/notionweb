#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
from PIL import Image, ImageEnhance
from io import BytesIO
import time

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets'/'blessings-real'
OUT.mkdir(parents=True,exist_ok=True)

CARDS=[
('01-lotus-sunrise.webp',101,"ultra photorealistic premium vertical greeting-card photograph, tranquil Chinese lotus pond at sunrise, layered misty blue mountains, golden sun reflected on calm lake, lush green lotus leaves with crystal dew, several vivid pink lotus flowers in foreground, cinematic natural light, elegant composition, high-end photography, realistic details, no people, no words, no typography, no letters, no watermark"),
('02-trumpet-bloom.webp',203,"ultra photorealistic vertical macro photograph of orange trumpet vine flowers blooming in warm morning sunlight, soft coral red and peach bokeh background, fresh green leaves, delicate petals, premium greeting card composition, natural realistic colors, high-end botanical photography, no words, no typography, no letters, no watermark"),
('03-elegant-morning.webp',307,"ultra photorealistic vertical portrait of an elegant adult Chinese woman in a refined black qipao, tasteful pearl necklace and sapphire earrings, gentle warm smile, holding a small flower branch, soft pink blossom garden background, graceful wholesome morning greeting mood, cinematic beauty photography, natural skin texture, premium editorial lighting, no words, no typography, no letters, no watermark"),
('04-jujube-harvest.webp',409,"ultra photorealistic vertical photograph of ripe red and green Chinese jujube fruits hanging densely on glossy branches, sunlit green orchard and meadow in background, fresh morning light, abundance and health, premium nature photography, crisp realistic texture, no people, no words, no typography, no letters, no watermark"),
('05-fortune-vase.webp',503,"ultra photorealistic vertical still life photograph, glowing orange ceramic vase with a subtle traditional Chinese blessing medallion, bouquet of red roses and soft pink lilies, eucalyptus leaves, warm golden morning sunlight through a window, elegant cozy home, premium greeting card composition, realistic flowers and ceramic, no words, no typography, no letters, no watermark"),
('06-pine-crane.webp',607,"ultra photorealistic vertical landscape photograph, two elegant red-crowned cranes beside a quiet lake, ancient pine tree and distant golden mountains at sunrise, light mist, peaceful longevity and good fortune symbolism, cinematic natural light, premium Chinese greeting-card aesthetic, realistic wildlife photography, no words, no typography, no letters, no watermark"),
]

for filename,seed,prompt in CARDS:
    target=OUT/filename
    if target.exists() and target.stat().st_size>50000:
        continue
    url=f"https://image.pollinations.ai/prompt/{quote(prompt)}?width=828&height=1200&seed={seed}&model=flux&nologo=true&enhance=true"
    last=None
    for attempt in range(5):
        try:
            req=Request(url,headers={'User-Agent':'Mozilla/5.0 JigsawDrop/4.0'})
            with urlopen(req,timeout=150) as resp:
                data=resp.read()
            if len(data)<30000:
                raise RuntimeError(f'image too small: {len(data)}')
            im=Image.open(BytesIO(data)).convert('RGB')
            target_ratio=828/1200
            w,h=im.size
            if w/h>target_ratio:
                nw=int(h*target_ratio);x=(w-nw)//2;im=im.crop((x,0,x+nw,h))
            else:
                nh=int(w/target_ratio);y=(h-nh)//2;im=im.crop((0,y,w,y+nh))
            im=im.resize((828,1200),Image.Resampling.LANCZOS)
            im=ImageEnhance.Contrast(im).enhance(1.025)
            im=ImageEnhance.Color(im).enhance(1.025)
            im.save(target,'WEBP',quality=86,method=6)
            if target.stat().st_size<40000:
                raise RuntimeError('encoded image unexpectedly small')
            print(filename,target.stat().st_size)
            break
        except Exception as exc:
            last=exc
            if target.exists(): target.unlink()
            time.sleep(2.5*(attempt+1))
    else:
        raise RuntimeError(f'failed to generate {filename}: {last}')
print(f'generated {len(CARDS)} photorealistic blessing images')
