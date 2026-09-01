#!/usr/bin/env python3
"""Generate the photorealistic, text-free blessing backgrounds used by v4.0.

The images are generated once during the release workflow, converted to optimized
WebP, committed to the repository, and then served locally by GitHub Pages. This
keeps gameplay/export deterministic and avoids a runtime dependency on the image
service.
"""
from __future__ import annotations

from io import BytesIO
from pathlib import Path
from urllib.parse import quote
import time

import requests
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageStat

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "blessings-real"
OUT.mkdir(parents=True, exist_ok=True)

WIDTH, HEIGHT = 896, 1280
BASE = (
    "premium photorealistic photography, vertical 7:10 smartphone greeting-card composition, "
    "beautiful natural light, rich but realistic colors, high dynamic range, fine detail, "
    "Chinese audience aesthetic, elegant and emotionally warm, clear main subject, "
    "leave tasteful negative space near the upper and lower thirds for later greeting typography, "
    "absolutely no text, no letters, no calligraphy, no logo, no watermark, no border, no frame"
)

SCENES = [
    (
        "01-lotus-sunrise.webp",
        41001,
        "pink lotus flowers and dew-covered emerald lotus leaves beside a perfectly calm mountain lake, "
        "soft mist drifting between blue-green mountains, the sun just rising above the valley, "
        "gold and rose reflections across the water, tranquil dawn atmosphere, award-winning nature photograph",
    ),
    (
        "02-trumpet-vine.webp",
        41002,
        "clusters of vivid orange trumpet-vine blossoms glowing in early morning sunlight, "
        "a warm coral-to-golden sky behind them, a few natural green leaves framing the edge, "
        "shallow depth of field, luxurious botanical editorial photograph",
    ),
    (
        "03-elegant-lady.webp",
        41003,
        "a fictional elegant adult Chinese woman in a refined black velvet qipao, pearl necklace and sapphire earrings, "
        "graceful side profile with a gentle natural smile, holding a small pink blossom branch, "
        "soft pink plum-blossom garden bokeh, tasteful high-fashion portrait photography, "
        "original fictional face, not resembling any real person",
    ),
    (
        "04-jujube-orchard.webp",
        41004,
        "heavy branches filled with ripe red-and-green Chinese jujube fruit in a lush orchard, "
        "fresh glossy leaves, sunlit green field receding into creamy bokeh, warm clean morning light, "
        "abundant harvest, premium food and agricultural photography",
    ),
    (
        "05-blessing-vase.webp",
        41005,
        "a glossy deep-red Chinese ceramic vase holding velvety red roses and luminous pink lilies, "
        "on a warm wooden table near a sunlit garden window, soft golden morning rays, "
        "tasteful home interior bokeh, premium floral still-life photography, prosperous and joyful mood",
    ),
    (
        "06-pine-cranes.webp",
        41006,
        "two red-crowned cranes standing beside an old pine at the edge of a misty lake at sunrise, "
        "layered mountains in soft golden haze, subtle reflections and drifting fog, "
        "realistic wildlife and landscape photography, serene longevity symbolism",
    ),
]


def endpoint(prompt: str, seed: int, model: bool = True) -> str:
    params = f"width={WIDTH}&height={HEIGHT}&seed={seed}&nologo=true&enhance=true"
    if model:
        params += "&model=flux"
    return f"https://image.pollinations.ai/prompt/{quote(prompt, safe='')}?{params}"


def download_scene(prompt: str, seed: int) -> Image.Image:
    urls = [endpoint(prompt, seed, True), endpoint(prompt, seed, False)]
    last_error: Exception | None = None
    headers = {
        "User-Agent": "JigsawDrop-AssetBuilder/4.0 (+https://github.com/hengtong320/notionweb)",
        "Accept": "image/avif,image/webp,image/png,image/jpeg,*/*",
    }
    for attempt in range(6):
        url = urls[min(attempt // 3, len(urls) - 1)]
        try:
            response = requests.get(url, headers=headers, timeout=(20, 210))
            response.raise_for_status()
            if len(response.content) < 45_000:
                raise RuntimeError(f"image response too small: {len(response.content)} bytes")
            image = Image.open(BytesIO(response.content)).convert("RGB")
            if image.width < 640 or image.height < 900:
                raise RuntimeError(f"unexpected generated size: {image.size}")
            return image
        except Exception as exc:  # network services occasionally queue or throttle
            last_error = exc
            time.sleep(4 + attempt * 3)
    raise RuntimeError(f"could not generate scene after retries: {last_error}")


def finish_image(image: Image.Image) -> Image.Image:
    # Cover-crop to the exact in-game portrait ratio without stretching subjects.
    image = ImageOps.fit(
        image,
        (WIDTH, HEIGHT),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    )
    # A restrained finishing pass: realistic contrast, gentle colour and crisp detail.
    image = ImageEnhance.Contrast(image).enhance(1.035)
    image = ImageEnhance.Color(image).enhance(1.045)
    image = ImageEnhance.Sharpness(image).enhance(1.08)
    return image


def validate(image: Image.Image, name: str) -> None:
    small = image.resize((64, 92), Image.Resampling.BILINEAR)
    stat = ImageStat.Stat(small)
    spread = sum(stat.var) / 3
    extrema_span = sum(high - low for low, high in stat.extrema) / 3
    if spread < 420 or extrema_span < 105:
        raise RuntimeError(f"{name} looks too flat or invalid (variance={spread:.1f}, span={extrema_span:.1f})")


def main() -> None:
    for filename, seed, scene in SCENES:
        target = OUT / filename
        prompt = f"{scene}. {BASE}."
        image = finish_image(download_scene(prompt, seed))
        validate(image, filename)
        image.save(target, "WEBP", quality=88, method=6)
        if target.stat().st_size < 55_000:
            raise RuntimeError(f"optimized file is suspiciously small: {target}")
        print(f"generated {target.relative_to(ROOT)} {image.size} {target.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
