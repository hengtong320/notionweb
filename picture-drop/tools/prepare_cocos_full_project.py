#!/usr/bin/env python3
from __future__ import annotations

import json
import math
import shutil
import struct
import uuid
import wave
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "picture-drop"
PROJECT = ROOT / "cocos-jigsaw-drop"
ASSETS = PROJECT / "assets"
BUNDLES = ASSETS / "bundles"
RESOURCES = ASSETS / "resources"
SCENE_UUID = "5a58b215-6ea5-4f9b-89a1-cd7d503e28ca"


def stable_uuid(name: str) -> str:
    return str(uuid.uuid5(uuid.UUID("34b6d070-806f-44fb-8db1-762df29c3a8e"), name))


def write_json(path: Path, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def bundle_meta(name: str) -> dict[str, object]:
    config_id = "auto_" + stable_uuid("bundle-config:" + name).replace("-", "")[:22]
    return {
        "ver": "1.2.0",
        "importer": "directory",
        "imported": True,
        "uuid": stable_uuid("bundle:" + name),
        "files": [],
        "subMetas": {},
        "userData": {
            "bundleName": name,
            "isBundle": True,
            "bundleConfigID": config_id,
            "compressionType": {
                "wechatgame": "subpackage",
                "bytedance-mini-game": "subpackage",
                "web-mobile": "merge_dep",
            },
            "isRemoteBundle": {
                "wechatgame": False,
                "bytedance-mini-game": False,
                "web-mobile": False,
            },
        },
    }


def folder_meta(name: str) -> dict[str, object]:
    return {
        "ver": "1.2.0",
        "importer": "directory",
        "imported": True,
        "uuid": stable_uuid("folder:" + name),
        "files": [],
        "subMetas": {},
        "userData": {},
    }


def fit_jpeg(src: Path, dst: Path, size: tuple[int, int], quality: int) -> None:
    with Image.open(src) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        dst.parent.mkdir(parents=True, exist_ok=True)
        image.save(dst, "JPEG", quality=quality, optimize=True, progressive=True, subsampling=1)


def render_svg(src: Path, dst: Path, size: tuple[int, int], quality: int) -> None:
    try:
        import cairosvg
    except ImportError as error:
        raise RuntimeError("cairosvg is required for classic SVG conversion") from error
    temp = dst.with_suffix(".render.png")
    temp.parent.mkdir(parents=True, exist_ok=True)
    cairosvg.svg2png(url=str(src), write_to=str(temp), output_width=size[0] * 2, output_height=size[1] * 2)
    fit_jpeg(temp, dst, size, quality)
    temp.unlink(missing_ok=True)


def copy_picture_sets() -> dict[str, list[str]]:
    if BUNDLES.exists():
        shutil.rmtree(BUNDLES)
    BUNDLES.mkdir(parents=True, exist_ok=True)
    write_json(ASSETS / "bundles.meta", folder_meta("bundles"))

    legacy = RESOURCES / "pictures"
    if legacy.exists():
        shutil.rmtree(legacy)
    (RESOURCES / "pictures.meta").unlink(missing_ok=True)

    blessing_sources = sorted((SOURCE / "assets" / "blessings-realistic").glob("*"))
    blessing_sources += sorted((SOURCE / "assets" / "blessings-v42").glob("*"))
    blessing_sources = [p for p in blessing_sources if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}]
    if len(blessing_sources) != 18:
        raise RuntimeError(f"expected 18 blessing photos, found {len(blessing_sources)}")

    classic_sources = sorted((SOURCE / "assets" / "pictures-portrait").glob("*.webp"))
    classic_extra = sorted((SOURCE / "assets" / "pictures-extra").glob("*.svg"))
    if len(classic_sources) != 36 or len(classic_extra) != 24:
        raise RuntimeError(f"classic source mismatch: {len(classic_sources)} + {len(classic_extra)}")

    outputs: dict[str, list[str]] = {"blessing": [], "classic-a": [], "classic-b": [], "classic-c": []}
    for src in blessing_sources:
        dst = BUNDLES / "blessing" / "pictures" / f"{src.stem}.jpg"
        fit_jpeg(src, dst, (720, 960), 86)
        outputs["blessing"].append(src.stem)

    for index, src in enumerate(classic_sources + classic_extra, start=1):
        bundle = "classic-a" if index <= 20 else "classic-b" if index <= 40 else "classic-c"
        dst = BUNDLES / bundle / "pictures" / f"{src.stem}.jpg"
        if src.suffix.lower() == ".svg":
            render_svg(src, dst, (600, 800), 84)
        else:
            fit_jpeg(src, dst, (600, 800), 84)
        outputs[bundle].append(src.stem)

    for name, keys in outputs.items():
        write_json(BUNDLES / f"{name}.meta", bundle_meta(name))
        if not keys:
            raise RuntimeError(f"empty bundle: {name}")

    return outputs


def envelope(index: int, total: int, attack: float = 0.08, release: float = 0.25) -> float:
    t = index / max(1, total - 1)
    return min(1.0, t / attack if attack > 0 else 1.0, (1.0 - t) / release if release > 0 else 1.0)


def write_tone(path: Path, frequencies: list[float], duration: float, volume: float = 0.35, noise: float = 0.0) -> None:
    rate = 22050
    total = max(1, int(rate * duration))
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "wb") as handle:
        handle.setnchannels(1)
        handle.setsampwidth(2)
        handle.setframerate(rate)
        frames = bytearray()
        state = 0x1234567
        for index in range(total):
            t = index / rate
            value = 0.0
            for offset, frequency in enumerate(frequencies):
                value += math.sin(2 * math.pi * frequency * t + offset * 0.22) / len(frequencies)
            if noise:
                state = (1103515245 * state + 12345) & 0x7FFFFFFF
                value += (((state / 0x7FFFFFFF) * 2) - 1) * noise
            value *= envelope(index, total) * volume
            sample = int(max(-1, min(1, value)) * 32767)
            frames.extend(struct.pack("<h", sample))
        handle.writeframes(frames)


def generate_audio() -> list[str]:
    audio = RESOURCES / "audio"
    if audio.exists():
        shutil.rmtree(audio)
    cues = {
        "tap": ([720], 0.075, 0.24, 0.02),
        "invalid": ([170, 128], 0.17, 0.24, 0.015),
        "merge": ([520, 780], 0.16, 0.26, 0.01),
        "drop": ([110, 165], 0.12, 0.24, 0.06),
        "clear-1": ([523.25, 659.25, 783.99], 0.33, 0.28, 0.015),
        "clear-2": ([659.25, 830.61, 987.77], 0.36, 0.30, 0.018),
        "clear-3": ([783.99, 987.77, 1174.66], 0.40, 0.31, 0.02),
        "fever": ([392, 523.25, 659.25, 783.99], 0.62, 0.29, 0.02),
        "win": ([523.25, 659.25, 783.99, 1046.5], 0.80, 0.28, 0.015),
    }
    for name, (frequencies, duration, volume, noise) in cues.items():
        write_tone(audio / f"{name}.wav", frequencies, duration, volume, noise)
    return list(cues)


def trim_engine_modules() -> None:
    path = PROJECT / "settings" / "v2" / "packages" / "engine.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    cache = data["modules"]["configs"]["defaultConfig"]["cache"]
    keep = {
        "base", "gfx-webgl", "gfx-webgl2", "animation", "2d", "mask", "graphics",
        "affine-transform", "ui", "intersection-2d", "audio", "tween",
        "render-pipeline", "custom-pipeline",
    }
    for key, value in cache.items():
        if isinstance(value, dict) and "_value" in value:
            value["_value"] = key in keep
    data["modules"]["configs"]["defaultConfig"]["includeModules"] = sorted(keep)
    write_json(path, data)


def write_profiles() -> None:
    profile_root = PROJECT / "profiles" / "v2" / "packages"
    common = {
        "buildPath": "project://build",
        "mainBundleCompressionType": "subpackage",
        "mainBundleIsRemote": False,
        "buildStageGroup": {"build": ["run"]},
        "wasmCompressionMode": "",
        "startSceneAssetBundle": False,
        "debug": False,
        "useBuiltinServer": False,
        "bundleConfigs": [],
        "scenes": [{"url": "db://assets/scenes/Main.scene", "uuid": SCENE_UUID}],
        "startScene": SCENE_UUID,
    }
    wechat = {
        "__version__": "1.0.4",
        "builder": {
            "common": {**common, "outputName": "wechatgame", "platform": "wechatgame"},
            "__version__": "1.3.9",
            "options": {
                "wechatgame": {
                    "orientation": "portrait",
                    "appid": "",
                    "buildOpenDataContextTemplate": False,
                    "separateEngine": True,
                    "highPerformanceMode": True,
                    "wasmSubpackage": False,
                    "__version__": "1.0.4",
                }
            },
        },
    }
    bytedance = {
        "__version__": "1.0.4",
        "builder": {
            "common": {**common, "outputName": "bytedance-mini-game", "platform": "bytedance-mini-game"},
            "__version__": "1.3.9",
            "options": {
                "bytedance-mini-game": {
                    "orientation": "portrait",
                    "appid": "",
                    "separateEngine": False,
                    "highPerformanceMode": True,
                    "remoteServerAddress": "",
                    "__version__": "1.0.4",
                }
            },
        },
    }
    write_json(profile_root / "wechatgame.json", wechat)
    write_json(profile_root / "bytedance-mini-game.json", bytedance)


def update_project_files(outputs: dict[str, list[str]], audio: list[str]) -> None:
    package_path = PROJECT / "package.json"
    package = json.loads(package_path.read_text(encoding="utf-8"))
    package["version"] = "1.0.0-beta.1"
    package["creator"] = {"version": "3.8.8"}
    write_json(package_path, package)
    (PROJECT / "PROJECT_VERSION").write_text("1.0.0-beta.1\n", encoding="utf-8")

    project_path = PROJECT / "settings" / "v2" / "packages" / "project.json"
    project = json.loads(project_path.read_text(encoding="utf-8"))
    project.setdefault("general", {})["designResolution"] = {
        "fitHeight": False,
        "fitWidth": True,
        "width": 750,
        "height": 1334,
    }
    write_json(project_path, project)
    trim_engine_modules()
    write_profiles()

    manifest = {
        "version": "1.0.0-beta.1",
        "creator": "3.8.8",
        "designResolution": [750, 1334],
        "assetBundles": outputs,
        "audio": audio,
        "platforms": ["web-mobile", "wechatgame", "bytedance-mini-game"],
        "sourceH5": "picture-drop v4.2.0",
    }
    write_json(PROJECT / "migration-manifest.json", manifest)


def main() -> None:
    outputs = copy_picture_sets()
    audio = generate_audio()
    update_project_files(outputs, audio)
    total = sum(len(value) for value in outputs.values())
    if total != 78:
        raise RuntimeError(f"expected 78 bundled pictures, got {total}")
    print(json.dumps({"pictures": total, "bundles": {k: len(v) for k, v in outputs.items()}, "audio": len(audio)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
