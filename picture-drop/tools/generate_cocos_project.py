#!/usr/bin/env python3
from __future__ import annotations

import argparse
import copy
import json
import os
import shutil
import textwrap
import uuid
from pathlib import Path
from typing import Any, Iterable

SCRIPT_UUID = "54d8a86a-7217-419b-b455-d3c0b6dd8f09"
SCRIPT_TYPE = "54d8ahqchdBm7RV08C23Y8J"
SCENE_UUID = "5a58b215-6ea5-4f9b-89a1-cd7d503e28ca"
PROJECT_UUID = "6d341b43-82f6-4efe-a65d-7117b88ac8e7"


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(textwrap.dedent(content).lstrip("\n"), encoding="utf-8")


def copy_template_settings(template: Path, out: Path) -> None:
    src = template / "settings"
    if src.exists():
        shutil.copytree(src, out / "settings", dirs_exist_ok=True)
    # These folders are editor defaults; they contain no game code or sample assets.
    creator = template / ".creator"
    if creator.exists():
        shutil.copytree(creator, out / ".creator", dirs_exist_ok=True)


def iter_id_refs(value: Any) -> Iterable[int]:
    if isinstance(value, dict):
        if set(value.keys()) == {"__id__"} and isinstance(value.get("__id__"), int):
            yield value["__id__"]
        else:
            for child in value.values():
                yield from iter_id_refs(child)
    elif isinstance(value, list):
        for child in value:
            yield from iter_id_refs(child)


def remap_ids(value: Any, mapping: dict[int, int]) -> Any:
    if isinstance(value, dict):
        if set(value.keys()) == {"__id__"} and isinstance(value.get("__id__"), int):
            return {"__id__": mapping[value["__id__"]]}
        return {key: remap_ids(child, mapping) for key, child in value.items()}
    if isinstance(value, list):
        return [remap_ids(child, mapping) for child in value]
    return value


def find_object(data: list[dict[str, Any]], type_name: str, name: str | None = None) -> int:
    for index, obj in enumerate(data):
        if obj.get("__type__") != type_name:
            continue
        if name is None or obj.get("_name") == name:
            return index
    raise RuntimeError(f"template object not found: {type_name} {name}")


def build_scene(template: Path, out: Path) -> None:
    source = json.loads((template / "assets" / "Scenes" / "Game.scene").read_text(encoding="utf-8"))
    data = copy.deepcopy(source)
    scene_index = find_object(data, "cc.Scene")
    canvas_index = find_object(data, "cc.Node", "Canvas")
    camera_index = find_object(data, "cc.Node", "Camera")

    scene = data[scene_index]
    canvas = data[canvas_index]
    camera = data[camera_index]

    scene["_children"] = [{"__id__": canvas_index}]
    canvas["_children"] = [{"__id__": camera_index}]
    allowed_canvas_components: list[dict[str, int]] = []
    for ref in canvas.get("_components", []):
        obj = data[ref["__id__"]]
        if obj.get("__type__") in {"cc.UITransform", "cc.Canvas", "cc.Widget"}:
            allowed_canvas_components.append(ref)
    canvas["_components"] = allowed_canvas_components

    roots = {0, scene_index, canvas_index, camera_index}
    selected = set(roots)
    queue = list(roots)
    while queue:
        current = queue.pop()
        for ref in iter_id_refs(data[current]):
            if ref not in selected:
                selected.add(ref)
                queue.append(ref)

    order = sorted(selected)
    mapping = {old: new for new, old in enumerate(order)}
    minimal = [remap_ids(copy.deepcopy(data[index]), mapping) for index in order]

    scene_new = minimal[mapping[scene_index]]
    canvas_new = minimal[mapping[canvas_index]]
    camera_new = minimal[mapping[camera_index]]

    scene_new["_name"] = "Main"
    scene_new["_id"] = SCENE_UUID
    minimal[0]["_name"] = "Main"
    if "_native" not in minimal[0] and "native" in minimal[0]:
        minimal[0]["_native"] = minimal[0].pop("native")

    canvas_new["_name"] = "Canvas"
    canvas_new["_lpos"] = {"__type__": "cc.Vec3", "x": 375, "y": 667, "z": 0}
    camera_new["_name"] = "Camera"

    for obj in minimal:
        if obj.get("__type__") == "cc.UITransform" and obj.get("node") == {"__id__": mapping[canvas_index]}:
            obj["_contentSize"] = {"__type__": "cc.Size", "width": 750, "height": 1334}
        if obj.get("__type__") == "cc.Camera" and obj.get("node") == {"__id__": mapping[camera_index]}:
            obj["_orthoHeight"] = 667
            obj["_color"] = {"__type__": "cc.Color", "r": 5, "g": 24, "b": 54, "a": 255}
        if obj.get("__type__") == "cc.PrefabInfo" and obj.get("fileId"):
            obj["fileId"] = SCENE_UUID

    bootstrap_node_index = len(minimal)
    bootstrap_component_index = bootstrap_node_index + 1
    bootstrap_node = {
        "__type__": "cc.Node",
        "_name": "GameBootstrap",
        "_objFlags": 0,
        "__editorExtras__": {},
        "_parent": {"__id__": mapping[canvas_index]},
        "_children": [],
        "_active": True,
        "_components": [{"__id__": bootstrap_component_index}],
        "_prefab": None,
        "_lpos": {"__type__": "cc.Vec3", "x": 0, "y": 0, "z": 0},
        "_lrot": {"__type__": "cc.Quat", "x": 0, "y": 0, "z": 0, "w": 1},
        "_lscale": {"__type__": "cc.Vec3", "x": 1, "y": 1, "z": 1},
        "_mobility": 0,
        "_layer": 33554432,
        "_euler": {"__type__": "cc.Vec3", "x": 0, "y": 0, "z": 0},
        "_id": "bootstrap" + uuid.uuid4().hex[:14],
    }
    bootstrap_component = {
        "__type__": SCRIPT_TYPE,
        "_name": "",
        "_objFlags": 0,
        "__editorExtras__": {},
        "node": {"__id__": bootstrap_node_index},
        "_enabled": True,
        "__prefab": None,
        "_id": "component" + uuid.uuid4().hex[:14],
    }
    minimal.extend([bootstrap_node, bootstrap_component])
    canvas_new["_children"] = [
        {"__id__": mapping[camera_index]},
        {"__id__": bootstrap_node_index},
    ]

    # Validate every object reference before writing.
    for index, obj in enumerate(minimal):
        for ref in iter_id_refs(obj):
            if not 0 <= ref < len(minimal):
                raise RuntimeError(f"invalid __id__ {ref} at object {index}")

    scene_dir = out / "assets" / "scenes"
    scene_dir.mkdir(parents=True, exist_ok=True)
    (scene_dir / "Main.scene").write_text(json.dumps(minimal, ensure_ascii=False, indent=2), encoding="utf-8")
    write(
        scene_dir / "Main.scene.meta",
        f'''{{
          "ver": "1.1.50",
          "importer": "scene",
          "imported": true,
          "uuid": "{SCENE_UUID}",
          "files": [".json"],
          "subMetas": {{}},
          "userData": {{}}
        }}
        ''',
    )


def convert_assets(source: Path, out: Path) -> list[str]:
    from PIL import Image, ImageOps

    target = out / "assets" / "resources" / "pictures"
    target.mkdir(parents=True, exist_ok=True)
    items: list[tuple[Path, str]] = []
    for path in sorted((source / "assets" / "blessings-realistic").glob("*")):
        if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}:
            items.append((path, path.stem))
    for path in sorted((source / "assets" / "blessings-v42").glob("*")):
        if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}:
            items.append((path, path.stem))

    written: list[str] = []
    for src, stem in items:
        with Image.open(src) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            image = ImageOps.fit(image, (900, 1200), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
            dst = target / f"{stem}.webp"
            image.save(dst, "WEBP", quality=86, method=6)
            written.append(stem)
    if len(written) < 18:
        raise RuntimeError(f"expected at least 18 photorealistic images, got {len(written)}")
    return written


CORE_TS = r'''
export type Quadrant = 0 | 1 | 2 | 3;
export type BoardCell = string | null;

export interface TileData {
    id: string;
    imageKey: string;
    quadrant: Quadrant;
}

export interface PuzzleGroup {
    imageKey: string;
    ids: string[];
    cells: number[];
    complete: boolean;
}

export interface MoveResult {
    valid: boolean;
    board: BoardCell[];
    targetCells: number[];
    reason?: string;
}

export interface DealPlacement {
    id: string;
    cell: number;
    column: number;
}

const QUADRANT_POS = [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
    { r: 1, c: 0 },
    { r: 1, c: 1 },
] as const;

function mulberry32(seed: number): () => number {
    let state = seed >>> 0;
    return () => {
        state += 0x6d2b79f5;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
}

function shuffle<T>(items: T[], random: () => number): void {
    for (let index = items.length - 1; index > 0; index -= 1) {
        const other = Math.floor(random() * (index + 1));
        [items[index], items[other]] = [items[other], items[index]];
    }
}

export class JigsawCore {
    public grid = 4;
    public board: BoardCell[] = [];
    public decks: string[][] = [];
    public readonly tiles = new Map<string, TileData>();
    public imageKeys: string[] = [];

    public reset(imageKeys: string[], grid: number, seed = 1, fastStart = false): void {
        if (grid < 4 || grid > 6) {
            throw new Error(`unsupported grid: ${grid}`);
        }
        this.grid = grid;
        this.imageKeys = imageKeys.slice();
        this.tiles.clear();

        const allIds: string[] = [];
        imageKeys.forEach((imageKey, imageIndex) => {
            for (let quadrant = 0; quadrant < 4; quadrant += 1) {
                const id = `I${imageIndex}-${imageKey}-Q${quadrant}`;
                this.tiles.set(id, { id, imageKey, quadrant: quadrant as Quadrant });
                allIds.push(id);
            }
        });

        const random = mulberry32(seed);
        shuffle(allIds, random);
        const capacity = grid * grid;
        this.board = Array<BoardCell>(capacity).fill(null);
        const visible = allIds.slice(0, capacity);
        const start = capacity - visible.length;
        visible.forEach((id, index) => {
            this.board[start + index] = id;
        });

        this.decks = Array.from({ length: grid }, () => [] as string[]);
        allIds.slice(capacity).forEach((id, index) => {
            this.decks[index % grid].push(id);
        });

        if (fastStart && grid === 4 && imageKeys.length >= 1) {
            const ids = this.idsForImage(imageKeys[0]);
            this.swapIntoCell(ids[0], 8);
            this.swapIntoCell(ids[1], 9);
            this.swapIntoCell(ids[2], 12);
            this.swapIntoCell(ids[3], 15);
            this.breakOtherCompleteImages(imageKeys[0]);
        }
    }

    public cloneBoard(): BoardCell[] {
        return this.board.slice();
    }

    public idsForImage(imageKey: string): string[] {
        const result = Array<string>(4);
        for (const tile of this.tiles.values()) {
            if (tile.imageKey === imageKey) {
                result[tile.quadrant] = tile.id;
            }
        }
        if (result.some((id) => !id)) {
            throw new Error(`incomplete image tile set: ${imageKey}`);
        }
        return result;
    }

    public cellForTile(id: string): number {
        return this.board.indexOf(id);
    }

    public rcToCell(row: number, column: number): number {
        return row * this.grid + column;
    }

    public cellToRC(cell: number): { r: number; c: number } {
        return { r: Math.floor(cell / this.grid), c: cell % this.grid };
    }

    public computeGroups(board: BoardCell[] = this.board): PuzzleGroup[] {
        const visited = new Set<number>();
        const groups: PuzzleGroup[] = [];
        const directions = [
            { r: -1, c: 0 },
            { r: 1, c: 0 },
            { r: 0, c: -1 },
            { r: 0, c: 1 },
        ];

        const originFor = (cell: number, tile: TileData): string => {
            const pos = this.cellToRC(cell);
            const q = QUADRANT_POS[tile.quadrant];
            return `${tile.imageKey}:${pos.r - q.r}:${pos.c - q.c}`;
        };

        for (let cell = 0; cell < board.length; cell += 1) {
            const id = board[cell];
            if (!id || visited.has(cell)) {
                continue;
            }
            const tile = this.tiles.get(id);
            if (!tile) {
                continue;
            }
            const origin = originFor(cell, tile);
            const stack = [cell];
            const cells: number[] = [];
            const ids: string[] = [];
            visited.add(cell);

            while (stack.length > 0) {
                const current = stack.pop()!;
                const currentId = board[current];
                if (!currentId) {
                    continue;
                }
                const currentTile = this.tiles.get(currentId);
                if (!currentTile) {
                    continue;
                }
                cells.push(current);
                ids.push(currentId);
                const rc = this.cellToRC(current);
                for (const direction of directions) {
                    const nr = rc.r + direction.r;
                    const nc = rc.c + direction.c;
                    if (nr < 0 || nr >= this.grid || nc < 0 || nc >= this.grid) {
                        continue;
                    }
                    const neighbor = this.rcToCell(nr, nc);
                    if (visited.has(neighbor)) {
                        continue;
                    }
                    const neighborId = board[neighbor];
                    const neighborTile = neighborId ? this.tiles.get(neighborId) : undefined;
                    if (!neighborTile || originFor(neighbor, neighborTile) !== origin) {
                        continue;
                    }
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }

            const quadrants = new Set(ids.map((tileId) => this.tiles.get(tileId)!.quadrant));
            groups.push({
                imageKey: tile.imageKey,
                ids,
                cells,
                complete: ids.length === 4 && quadrants.size === 4,
            });
        }
        return groups;
    }

    public groupForTile(id: string, split = false): PuzzleGroup | null {
        const cell = this.cellForTile(id);
        if (cell < 0) {
            return null;
        }
        const tile = this.tiles.get(id);
        if (!tile) {
            return null;
        }
        if (split) {
            return { imageKey: tile.imageKey, ids: [id], cells: [cell], complete: false };
        }
        return this.computeGroups().find((group) => group.ids.includes(id)) ?? null;
    }

    public connectionMask(id: string): { left: boolean; right: boolean; up: boolean; down: boolean } {
        const result = { left: false, right: false, up: false, down: false };
        const cell = this.cellForTile(id);
        if (cell < 0) {
            return result;
        }
        const group = this.groupForTile(id);
        if (!group || group.ids.length < 2) {
            return result;
        }
        const groupCells = new Set(group.cells);
        const rc = this.cellToRC(cell);
        result.left = rc.c > 0 && groupCells.has(cell - 1);
        result.right = rc.c < this.grid - 1 && groupCells.has(cell + 1);
        result.up = rc.r > 0 && groupCells.has(cell - this.grid);
        result.down = rc.r < this.grid - 1 && groupCells.has(cell + this.grid);
        return result;
    }

    public validateMove(group: PuzzleGroup, dr: number, dc: number): MoveResult {
        if (dr === 0 && dc === 0) {
            return { valid: false, board: this.cloneBoard(), targetCells: [], reason: "same-cell" };
        }
        const targetCells: number[] = [];
        for (const cell of group.cells) {
            const rc = this.cellToRC(cell);
            const row = rc.r + dr;
            const column = rc.c + dc;
            if (row < 0 || row >= this.grid || column < 0 || column >= this.grid) {
                return { valid: false, board: this.cloneBoard(), targetCells: [], reason: "outside" };
            }
            targetCells.push(this.rcToCell(row, column));
        }

        const sourceSet = new Set(group.cells);
        const targetSet = new Set(targetCells);
        const union = new Set<number>([...sourceSet, ...targetSet]);
        const starts = group.cells.filter((cell) => !targetSet.has(cell));
        if (starts.length === 0) {
            return { valid: false, board: this.cloneBoard(), targetCells, reason: "no-leading-edge" };
        }

        const nextBoard = this.cloneBoard();
        const touched = new Set<number>();
        for (const start of starts) {
            const chain = [start];
            let current = start;
            while (true) {
                const rc = this.cellToRC(current);
                const row = rc.r + dr;
                const column = rc.c + dc;
                if (row < 0 || row >= this.grid || column < 0 || column >= this.grid) {
                    break;
                }
                const next = this.rcToCell(row, column);
                if (!union.has(next)) {
                    break;
                }
                chain.push(next);
                current = next;
            }
            const values = chain.map((cell) => this.board[cell]);
            nextBoard[chain[0]] = values[values.length - 1];
            for (let index = 1; index < chain.length; index += 1) {
                nextBoard[chain[index]] = values[index - 1];
            }
            chain.forEach((cell) => touched.add(cell));
        }

        if ([...union].some((cell) => !touched.has(cell))) {
            return { valid: false, board: this.cloneBoard(), targetCells, reason: "unsupported-shape" };
        }
        for (let index = 0; index < group.ids.length; index += 1) {
            if (nextBoard[targetCells[index]] !== group.ids[index]) {
                return { valid: false, board: this.cloneBoard(), targetCells, reason: "rigid-shape-broken" };
            }
        }
        return { valid: true, board: nextBoard, targetCells };
    }

    public applyMove(group: PuzzleGroup, dr: number, dc: number): MoveResult {
        const result = this.validateMove(group, dr, dc);
        if (result.valid) {
            this.board = result.board;
        }
        return result;
    }

    public gravityStep(): { moved: boolean; ids: string[] } {
        const groups = this.computeGroups();
        const groupByCell = new Map<number, number>();
        groups.forEach((group, index) => group.cells.forEach((cell) => groupByCell.set(cell, index)));
        const memo = new Map<number, boolean>();
        const visiting = new Set<number>();

        const canMove = (index: number): boolean => {
            if (memo.has(index)) {
                return memo.get(index)!;
            }
            if (visiting.has(index)) {
                return false;
            }
            visiting.add(index);
            const group = groups[index];
            const own = new Set(group.cells);
            let allowed = true;
            for (const cell of group.cells) {
                const rc = this.cellToRC(cell);
                if (rc.r >= this.grid - 1) {
                    allowed = false;
                    break;
                }
                const below = cell + this.grid;
                if (own.has(below) || !this.board[below]) {
                    continue;
                }
                const support = groupByCell.get(below);
                if (support === undefined || support === index || !canMove(support)) {
                    allowed = false;
                    break;
                }
            }
            visiting.delete(index);
            memo.set(index, allowed);
            return allowed;
        };

        const movable = groups.map((_, index) => index).filter((index) => canMove(index));
        if (movable.length > 0) {
            const next = this.cloneBoard();
            const ids: string[] = [];
            for (const index of movable) {
                for (const cell of groups[index].cells) {
                    const id = this.board[cell];
                    if (id) ids.push(id);
                    next[cell] = null;
                }
            }
            for (const index of movable) {
                for (const cell of groups[index].cells) {
                    next[cell + this.grid] = this.board[cell];
                }
            }
            this.board = next;
            return { moved: true, ids };
        }

        // If a joined shape is pinned on only one side, unsupported quarters settle
        // independently rather than floating forever.
        const cells = new Set<number>();
        let changed = true;
        while (changed) {
            changed = false;
            for (let row = this.grid - 2; row >= 0; row -= 1) {
                for (let column = 0; column < this.grid; column += 1) {
                    const cell = this.rcToCell(row, column);
                    if (!this.board[cell] || cells.has(cell)) continue;
                    const below = cell + this.grid;
                    if (!this.board[below] || cells.has(below)) {
                        cells.add(cell);
                        changed = true;
                    }
                }
            }
        }
        if (cells.size === 0) {
            return { moved: false, ids: [] };
        }
        const next = this.cloneBoard();
        const ids: string[] = [];
        for (const cell of cells) {
            const id = this.board[cell];
            if (id) ids.push(id);
            next[cell] = null;
        }
        for (const cell of cells) {
            next[cell + this.grid] = this.board[cell];
        }
        this.board = next;
        return { moved: true, ids };
    }

    public completeGroups(): PuzzleGroup[] {
        return this.computeGroups().filter((group) => group.complete);
    }

    public clearGroups(groups: PuzzleGroup[]): string[] {
        const images: string[] = [];
        for (const group of groups) {
            images.push(group.imageKey);
            for (const cell of group.cells) {
                this.board[cell] = null;
            }
        }
        return images;
    }

    public dealWave(): DealPlacement[] {
        const placements: DealPlacement[] = [];
        for (let column = 0; column < this.grid; column += 1) {
            if (this.board[column] || this.decks[column].length === 0) {
                continue;
            }
            const id = this.decks[column].shift()!;
            this.board[column] = id;
            placements.push({ id, cell: column, column });
        }
        return placements;
    }

    public remainingCount(): number {
        return this.board.filter(Boolean).length + this.decks.reduce((total, deck) => total + deck.length, 0);
    }

    public score(board: BoardCell[] = this.board): number {
        return this.computeGroups(board).reduce((total, group) => total + group.ids.length * group.ids.length, 0);
    }

    public findHelpfulMove(): { group: PuzzleGroup; dr: number; dc: number; board: BoardCell[] } | null {
        const groups = this.computeGroups();
        const baselineComplete = this.completeGroups().length;
        const baselineScore = this.score();
        let best: { group: PuzzleGroup; dr: number; dc: number; board: BoardCell[]; value: number } | null = null;
        for (const group of groups) {
            for (let row = 0; row < this.grid; row += 1) {
                for (let column = 0; column < this.grid; column += 1) {
                    const source = this.cellToRC(group.cells[0]);
                    const dr = row - source.r;
                    const dc = column - source.c;
                    const result = this.validateMove(group, dr, dc);
                    if (!result.valid) continue;
                    const complete = this.computeGroups(result.board).filter((candidate) => candidate.complete).length;
                    const value = (complete - baselineComplete) * 1000 + (this.score(result.board) - baselineScore);
                    if (!best || value > best.value) {
                        best = { group, dr, dc, board: result.board, value };
                    }
                }
            }
        }
        if (!best || best.value <= 0) return null;
        return { group: best.group, dr: best.dr, dc: best.dc, board: best.board };
    }

    private swapIntoCell(id: string, target: number): void {
        const boardCell = this.board.indexOf(id);
        const displaced = this.board[target];
        if (boardCell >= 0) {
            this.board[boardCell] = displaced;
            this.board[target] = id;
            return;
        }
        for (const deck of this.decks) {
            const index = deck.indexOf(id);
            if (index >= 0) {
                deck[index] = displaced!;
                this.board[target] = id;
                return;
            }
        }
        throw new Error(`tile not found: ${id}`);
    }

    private breakOtherCompleteImages(protectedImage: string): void {
        let guard = 0;
        while (guard++ < 12) {
            const complete = this.completeGroups().find((group) => group.imageKey !== protectedImage);
            if (!complete) return;
            const source = complete.cells[complete.cells.length - 1];
            const target = this.board.findIndex((id, cell) => {
                if (!id || complete.cells.includes(cell)) return false;
                return this.tiles.get(id)!.imageKey !== complete.imageKey;
            });
            if (target < 0) return;
            [this.board[source], this.board[target]] = [this.board[target], this.board[source]];
        }
    }
}
'''

PLATFORM_TS = r'''
export interface SharePayload {
    title: string;
    query?: string;
    imageUrl?: string;
}

export interface PlatformBridge {
    readonly name: "web" | "wechat" | "douyin";
    vibrate(type?: "light" | "medium" | "heavy"): void;
    share(payload: SharePayload): Promise<void>;
    saveImage(filePath: string): Promise<void>;
}

class UniversalBridge implements PlatformBridge {
    public readonly name: "web" | "wechat" | "douyin";
    private readonly api: any;

    public constructor() {
        const globalApi = globalThis as any;
        if (globalApi.wx) {
            this.name = "wechat";
            this.api = globalApi.wx;
        } else if (globalApi.tt) {
            this.name = "douyin";
            this.api = globalApi.tt;
        } else {
            this.name = "web";
            this.api = null;
        }
    }

    public vibrate(type: "light" | "medium" | "heavy" = "light"): void {
        if (this.api?.vibrateShort) {
            try { this.api.vibrateShort({ type }); } catch (_) { /* platform variation */ }
        }
    }

    public async share(payload: SharePayload): Promise<void> {
        if (this.api?.shareAppMessage) {
            this.api.shareAppMessage(payload);
            return;
        }
        console.info("[JigsawDrop] share preview", payload);
    }

    public async saveImage(filePath: string): Promise<void> {
        if (this.api?.saveImageToPhotosAlbum) {
            await new Promise<void>((resolve, reject) => {
                this.api.saveImageToPhotosAlbum({ filePath, success: resolve, fail: reject });
            });
            return;
        }
        console.info("[JigsawDrop] save image preview", filePath);
    }
}

export function createPlatformBridge(): PlatformBridge {
    return new UniversalBridge();
}
'''

BOOTSTRAP_TS = r'''
import {
    _decorator,
    Color,
    Component,
    EventTouch,
    Graphics,
    HorizontalTextAlignment,
    ImageAsset,
    Label,
    Layers,
    Node,
    Rect,
    ResolutionPolicy,
    Size,
    Sprite,
    SpriteFrame,
    tween,
    UIOpacity,
    UITransform,
    Vec2,
    Vec3,
    VerticalTextAlignment,
    view,
    resources,
} from "cc";
import { JigsawCore, PuzzleGroup } from "./core/JigsawCore";
import { createPlatformBridge, PlatformBridge } from "./platform/PlatformBridge";

const { ccclass } = _decorator;

interface PackDefinition {
    id: string;
    name: string;
    subtitle: string;
    grid: number;
    images: string[];
    fastStart: boolean;
    accent: Color;
}

interface DragState {
    tileId: string;
    sourceCell: number;
    group: PuzzleGroup;
    split: boolean;
    moved: boolean;
    startPoint: Vec3;
    startPositions: Map<string, Vec3>;
    holdTimer: ReturnType<typeof setTimeout> | null;
}

const DESIGN_WIDTH = 750;
const DESIGN_HEIGHT = 1334;
const UI_LAYER = Layers.Enum.UI_2D;

@ccclass("GameBootstrap")
export class GameBootstrap extends Component {
    private readonly core = new JigsawCore();
    private readonly platform: PlatformBridge = createPlatformBridge();
    private readonly packs: PackDefinition[] = [
        {
            id: "blessing",
            name: "花开晨安",
            subtitle: "4×4 · 4张写实美图 · 一步体验首次拼合",
            grid: 4,
            images: ["01-lotus-sunrise", "02-trumpet-flower", "07-peony-courtyard", "08-tea-terraces"],
            fastStart: true,
            accent: new Color(255, 191, 125, 255),
        },
        {
            id: "helicopter",
            name: "直升机挑战",
            subtitle: "5×5 · 6张同题材照片 · 颜色与地貌辨认",
            grid: 5,
            images: [
                "13-heli-red-mountain",
                "14-heli-white-coast",
                "15-heli-yellow-alpine",
                "16-heli-blue-city",
                "17-heli-black-desert",
                "18-heli-silver-snow",
            ],
            fastStart: false,
            accent: new Color(255, 210, 86, 255),
        },
    ];

    private runtimeRoot!: Node;
    private boardNode!: Node;
    private boardGraphics!: Graphics;
    private tileLayer!: Node;
    private deckLayer!: Node;
    private statusLabel!: Label;
    private titleLabel!: Label;
    private subtitleLabel!: Label;
    private loadingLabel!: Label;
    private hintLabel!: Label;
    private winOverlay!: Node;
    private winContent!: Node;
    private packButtons: Node[] = [];
    private currentPack = this.packs[0];
    private tileNodes = new Map<string, Node>();
    private baseFrames = new Map<string, SpriteFrame>();
    private pieceFrames = new Map<string, SpriteFrame[]>();
    private completedImages: string[] = [];
    private moves = 0;
    private busy = false;
    private drag: DragState | null = null;
    private tileWidth = 156;
    private tileHeight = 208;
    private boardWidth = 624;
    private boardHeight = 832;

    protected start(): void {
        void this.initialize();
    }

    private async initialize(): Promise<void> {
        view.setDesignResolutionSize(DESIGN_WIDTH, DESIGN_HEIGHT, ResolutionPolicy.FIXED_WIDTH);
        const canvas = this.node.parent;
        if (!canvas) throw new Error("GameBootstrap must be a child of Canvas");
        canvas.getComponent(UITransform)?.setContentSize(DESIGN_WIDTH, DESIGN_HEIGHT);
        this.buildShell(canvas);
        await this.switchPack(this.packs[0]);
    }

    private buildShell(canvas: Node): void {
        this.runtimeRoot = this.createNode("RuntimeRoot", canvas, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);
        const background = this.createNode("Background", this.runtimeRoot, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);
        const bg = background.addComponent(Graphics);
        bg.fillColor = new Color(6, 29, 62, 255);
        bg.rect(-DESIGN_WIDTH / 2, -DESIGN_HEIGHT / 2, DESIGN_WIDTH, DESIGN_HEIGHT);
        bg.fill();
        bg.fillColor = new Color(15, 72, 122, 120);
        bg.circle(-280, 430, 260);
        bg.fill();
        bg.fillColor = new Color(22, 121, 154, 90);
        bg.circle(300, -470, 330);
        bg.fill();

        const topPanel = this.createNode("TopPanel", this.runtimeRoot, 710, 150, 0, 570);
        const topGraphics = topPanel.addComponent(Graphics);
        topGraphics.fillColor = new Color(14, 53, 91, 235);
        topGraphics.roundRect(-355, -75, 710, 150, 28);
        topGraphics.fill();
        topGraphics.strokeColor = new Color(103, 225, 255, 150);
        topGraphics.lineWidth = 2;
        topGraphics.roundRect(-355, -75, 710, 150, 28);
        topGraphics.stroke();

        this.titleLabel = this.addLabel(topPanel, "JIGSAW DROP · COCOS", 36, new Color(255, 255, 255, 255), 0, 34, 650, 54);
        this.titleLabel.isBold = true;
        this.subtitleLabel = this.addLabel(topPanel, "Cocos Creator 3.8.6 原生2D渲染样板", 20, new Color(153, 229, 255, 255), 0, -18, 650, 36);

        const buttonRow = this.createNode("PackButtons", this.runtimeRoot, 690, 70, 0, 468);
        this.packButtons = this.packs.map((pack, index) => {
            const button = this.addButton(buttonRow, pack.name, index === 0 ? -175 : 175, 0, 330, 62, () => void this.switchPack(pack));
            return button;
        });

        this.boardNode = this.createNode("Board", this.runtimeRoot, this.boardWidth, this.boardHeight, 0, -8);
        this.boardGraphics = this.boardNode.addComponent(Graphics);
        this.tileLayer = this.createNode("TileLayer", this.boardNode, this.boardWidth, this.boardHeight, 0, 0);
        this.deckLayer = this.createNode("DeckLayer", this.runtimeRoot, 650, 56, 0, 408);

        const statusPanel = this.createNode("StatusPanel", this.runtimeRoot, 690, 74, 0, -493);
        const statusGraphics = statusPanel.addComponent(Graphics);
        statusGraphics.fillColor = new Color(8, 37, 73, 235);
        statusGraphics.roundRect(-345, -37, 690, 74, 24);
        statusGraphics.fill();
        this.statusLabel = this.addLabel(statusPanel, "", 23, new Color(255, 255, 255, 255), 0, 10, 650, 32);
        this.hintLabel = this.addLabel(statusPanel, "拖动碎片交换位置 · 拼好的组合会一起移动 · 长按可拆单块", 15, new Color(139, 213, 244, 255), 0, -19, 650, 24);

        const bottomRow = this.createNode("BottomButtons", this.runtimeRoot, 690, 72, 0, -585);
        this.addButton(bottomRow, "提示", -225, 0, 190, 58, () => this.showHint());
        this.addButton(bottomRow, "重新开始", 0, 0, 220, 58, () => void this.switchPack(this.currentPack));
        this.addButton(bottomRow, "平台分享", 225, 0, 190, 58, () => void this.previewShare());

        this.loadingLabel = this.addLabel(this.runtimeRoot, "正在载入写实纹理…", 30, new Color(255, 255, 255, 255), 0, -10, 600, 56);
        this.loadingLabel.node.active = false;

        this.winOverlay = this.createNode("WinOverlay", this.runtimeRoot, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);
        const overlayBg = this.winOverlay.addComponent(Graphics);
        overlayBg.fillColor = new Color(2, 12, 29, 224);
        overlayBg.rect(-DESIGN_WIDTH / 2, -DESIGN_HEIGHT / 2, DESIGN_WIDTH, DESIGN_HEIGHT);
        overlayBg.fill();
        this.winContent = this.createNode("WinContent", this.winOverlay, 660, 1050, 0, 0);
        this.winOverlay.active = false;
    }

    private async switchPack(pack: PackDefinition): Promise<void> {
        if (this.busy) return;
        this.busy = true;
        this.drag = null;
        this.currentPack = pack;
        this.moves = 0;
        this.completedImages = [];
        this.winOverlay.active = false;
        this.loadingLabel.node.active = true;
        this.loadingLabel.string = `正在载入「${pack.name}」…`;
        this.titleLabel.string = pack.name;
        this.subtitleLabel.string = pack.subtitle;
        this.updatePackButtons();

        await this.loadImages(pack.images);
        this.configureBoard(pack.grid);
        this.core.reset(pack.images, pack.grid, pack.id === "helicopter" ? 20260901 : 20260831, pack.fastStart);
        this.clearTileNodes();
        this.drawBoard();
        this.syncTiles(false);
        this.drawDecks();
        this.updateStatus();
        this.loadingLabel.node.active = false;
        this.busy = false;
    }

    private configureBoard(grid: number): void {
        if (grid === 4) {
            this.tileWidth = 156;
            this.tileHeight = 208;
        } else {
            this.tileWidth = 126;
            this.tileHeight = 168;
        }
        this.boardWidth = this.tileWidth * grid;
        this.boardHeight = this.tileHeight * grid;
        this.boardNode.getComponent(UITransform)!.setContentSize(this.boardWidth, this.boardHeight);
        this.tileLayer.getComponent(UITransform)!.setContentSize(this.boardWidth, this.boardHeight);
        this.boardNode.setPosition(0, grid === 4 ? -5 : -12, 0);
        this.deckLayer.setPosition(0, this.boardNode.position.y + this.boardHeight / 2 + 38, 0);
    }

    private async loadImages(keys: string[]): Promise<void> {
        await Promise.all(keys.map(async (key) => {
            if (this.baseFrames.has(key)) return;
            const image = await this.loadImageAsset(`pictures/${key}`);
            const base = SpriteFrame.createWithImage(image);
            base.packable = false;
            this.baseFrames.set(key, base);
            this.pieceFrames.set(key, [0, 1, 2, 3].map((quadrant) => this.makePieceFrame(base, quadrant)));
        }));
    }

    private loadImageAsset(path: string): Promise<ImageAsset> {
        return new Promise((resolve, reject) => {
            resources.load(path, ImageAsset, (error, asset) => {
                if (error || !asset) {
                    reject(error ?? new Error(`failed to load ${path}`));
                    return;
                }
                resolve(asset);
            });
        });
    }

    private makePieceFrame(base: SpriteFrame, quadrant: number): SpriteFrame {
        const rect = base.rect;
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;
        const column = quadrant % 2;
        const topRow = quadrant < 2;
        const frame = new SpriteFrame();
        frame.reset({
            texture: base.texture,
            rect: new Rect(rect.x + column * halfWidth, rect.y + (topRow ? halfHeight : 0), halfWidth, halfHeight),
            originalSize: new Size(halfWidth, halfHeight),
            offset: new Vec2(0, 0),
            rotated: false,
        });
        frame.packable = false;
        return frame;
    }

    private drawBoard(): void {
        const g = this.boardGraphics;
        g.clear();
        g.fillColor = new Color(4, 20, 47, 242);
        g.roundRect(-this.boardWidth / 2 - 8, -this.boardHeight / 2 - 8, this.boardWidth + 16, this.boardHeight + 16, 18);
        g.fill();
        g.strokeColor = new Color(109, 224, 255, 185);
        g.lineWidth = 2;
        g.roundRect(-this.boardWidth / 2 - 8, -this.boardHeight / 2 - 8, this.boardWidth + 16, this.boardHeight + 16, 18);
        g.stroke();
        g.strokeColor = new Color(44, 94, 132, 150);
        g.lineWidth = 1;
        for (let row = 1; row < this.core.grid; row += 1) {
            const y = this.boardHeight / 2 - row * this.tileHeight;
            g.moveTo(-this.boardWidth / 2, y);
            g.lineTo(this.boardWidth / 2, y);
        }
        for (let column = 1; column < this.core.grid; column += 1) {
            const x = -this.boardWidth / 2 + column * this.tileWidth;
            g.moveTo(x, -this.boardHeight / 2);
            g.lineTo(x, this.boardHeight / 2);
        }
        g.stroke();
    }

    private syncTiles(animate: boolean): void {
        const active = new Set(this.core.board.filter((id): id is string => Boolean(id)));
        for (const [id, node] of this.tileNodes) {
            node.active = active.has(id);
        }
        this.core.board.forEach((id, cell) => {
            if (!id) return;
            const node = this.ensureTileNode(id);
            node.active = true;
            const target = this.positionForCell(cell);
            if (animate) {
                tween(node).to(0.18, { position: target }, { easing: "quadOut" }).start();
            } else {
                node.setPosition(target);
            }
            this.drawTileFrame(id);
        });
    }

    private ensureTileNode(id: string): Node {
        const existing = this.tileNodes.get(id);
        if (existing) return existing;
        const tile = this.core.tiles.get(id)!;
        const node = this.createNode(`Tile-${id}`, this.tileLayer, this.tileWidth, this.tileHeight, 0, 0);
        node.addComponent(UIOpacity).opacity = 255;

        const imageNode = this.createNode("Image", node, this.tileWidth + 0.5, this.tileHeight + 0.5, 0, 0);
        const sprite = imageNode.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = this.pieceFrames.get(tile.imageKey)![tile.quadrant];

        const shadeNode = this.createNode("Shade", node, this.tileWidth, this.tileHeight, 0, 0);
        const shade = shadeNode.addComponent(Graphics);
        shade.fillColor = new Color(255, 255, 255, 12);
        shade.rect(-this.tileWidth / 2, 0, this.tileWidth, this.tileHeight / 2);
        shade.fill();

        const frameNode = this.createNode("Frame", node, this.tileWidth, this.tileHeight, 0, 0);
        frameNode.addComponent(Graphics);
        node.on(Node.EventType.TOUCH_START, (event: EventTouch) => this.onTouchStart(id, event), this);
        node.on(Node.EventType.TOUCH_MOVE, (event: EventTouch) => this.onTouchMove(id, event), this);
        node.on(Node.EventType.TOUCH_END, (event: EventTouch) => void this.onTouchEnd(id, event), this);
        node.on(Node.EventType.TOUCH_CANCEL, (event: EventTouch) => void this.onTouchEnd(id, event), this);
        this.tileNodes.set(id, node);
        return node;
    }

    private drawTileFrame(id: string): void {
        const node = this.tileNodes.get(id);
        const graphics = node?.getChildByName("Frame")?.getComponent(Graphics);
        if (!graphics) return;
        const mask = this.core.connectionMask(id);
        const w = this.tileWidth;
        const h = this.tileHeight;
        graphics.clear();
        graphics.lineWidth = 3;
        graphics.strokeColor = new Color(244, 250, 255, 235);
        if (!mask.left) { graphics.moveTo(-w / 2 + 1.5, -h / 2); graphics.lineTo(-w / 2 + 1.5, h / 2); }
        if (!mask.right) { graphics.moveTo(w / 2 - 1.5, -h / 2); graphics.lineTo(w / 2 - 1.5, h / 2); }
        if (!mask.up) { graphics.moveTo(-w / 2, h / 2 - 1.5); graphics.lineTo(w / 2, h / 2 - 1.5); }
        if (!mask.down) { graphics.moveTo(-w / 2, -h / 2 + 1.5); graphics.lineTo(w / 2, -h / 2 + 1.5); }
        graphics.stroke();
        graphics.lineWidth = 1;
        graphics.strokeColor = new Color(12, 40, 70, 190);
        if (!mask.left) { graphics.moveTo(-w / 2 + 3.5, -h / 2); graphics.lineTo(-w / 2 + 3.5, h / 2); }
        if (!mask.right) { graphics.moveTo(w / 2 - 3.5, -h / 2); graphics.lineTo(w / 2 - 3.5, h / 2); }
        if (!mask.up) { graphics.moveTo(-w / 2, h / 2 - 3.5); graphics.lineTo(w / 2, h / 2 - 3.5); }
        if (!mask.down) { graphics.moveTo(-w / 2, -h / 2 + 3.5); graphics.lineTo(w / 2, -h / 2 + 3.5); }
        graphics.stroke();
    }

    private onTouchStart(id: string, event: EventTouch): void {
        if (this.busy || !this.tileNodes.get(id)?.active) return;
        const sourceCell = this.core.cellForTile(id);
        const group = this.core.groupForTile(id);
        if (sourceCell < 0 || !group) return;
        const startPoint = this.touchInBoard(event);
        const positions = new Map<string, Vec3>();
        group.ids.forEach((tileId) => {
            const node = this.tileNodes.get(tileId);
            if (node) positions.set(tileId, node.position.clone());
        });
        const drag: DragState = {
            tileId: id,
            sourceCell,
            group,
            split: false,
            moved: false,
            startPoint,
            startPositions: positions,
            holdTimer: null,
        };
        if (group.ids.length > 1) {
            drag.holdTimer = setTimeout(() => {
                if (this.drag !== drag || drag.moved) return;
                const single = this.core.groupForTile(id, true);
                if (!single) return;
                drag.group = single;
                drag.split = true;
                drag.startPositions.clear();
                const node = this.tileNodes.get(id);
                if (node) drag.startPositions.set(id, node.position.clone());
                this.hintLabel.string = "已拆成单块：继续拖动即可";
                this.platform.vibrate("light");
            }, 330);
        }
        this.drag = drag;
        drag.group.ids.forEach((tileId) => this.tileNodes.get(tileId)?.setSiblingIndex(this.tileLayer.children.length - 1));
    }

    private onTouchMove(id: string, event: EventTouch): void {
        const drag = this.drag;
        if (!drag || drag.tileId !== id) return;
        const point = this.touchInBoard(event);
        const dx = point.x - drag.startPoint.x;
        const dy = point.y - drag.startPoint.y;
        if (Math.hypot(dx, dy) > 8) {
            drag.moved = true;
            if (drag.holdTimer) {
                clearTimeout(drag.holdTimer);
                drag.holdTimer = null;
            }
        }
        drag.group.ids.forEach((tileId) => {
            const node = this.tileNodes.get(tileId);
            const origin = drag.startPositions.get(tileId);
            if (node && origin) node.setPosition(origin.x + dx, origin.y + dy, 0);
        });
    }

    private async onTouchEnd(id: string, event: EventTouch): Promise<void> {
        const drag = this.drag;
        if (!drag || drag.tileId !== id) return;
        this.drag = null;
        if (drag.holdTimer) clearTimeout(drag.holdTimer);
        if (!drag.moved) {
            this.syncTiles(true);
            return;
        }
        const point = this.touchInBoard(event);
        const targetCell = this.cellAtPoint(point);
        if (targetCell < 0) {
            this.syncTiles(true);
            return;
        }
        const sourceRC = this.core.cellToRC(drag.sourceCell);
        const targetRC = this.core.cellToRC(targetCell);
        const result = this.core.validateMove(drag.group, targetRC.r - sourceRC.r, targetRC.c - sourceRC.c);
        if (!result.valid) {
            this.syncTiles(true);
            this.hintLabel.string = "这个位置放不下当前组合";
            return;
        }
        this.busy = true;
        this.core.board = result.board;
        this.moves += 1;
        this.platform.vibrate("light");
        await this.animateBoard(0.18);
        await this.resolveBoard();
        this.busy = false;
        this.updateStatus();
    }

    private async resolveBoard(): Promise<void> {
        let guard = 0;
        while (guard++ < 96) {
            const gravity = this.core.gravityStep();
            if (gravity.moved) {
                await this.animateBoard(0.16);
                continue;
            }
            const complete = this.core.completeGroups();
            if (complete.length > 0) {
                await this.animateComplete(complete);
                const images = this.core.clearGroups(complete);
                this.completedImages.push(...images);
                complete.flatMap((group) => group.ids).forEach((id) => {
                    const node = this.tileNodes.get(id);
                    if (node) node.active = false;
                });
                this.syncTiles(false);
                this.drawDecks();
                this.platform.vibrate(complete.length > 1 ? "heavy" : "medium");
                continue;
            }
            const dealt = this.core.dealWave();
            if (dealt.length > 0) {
                this.syncTiles(false);
                dealt.forEach((placement) => {
                    const node = this.tileNodes.get(placement.id);
                    if (node) node.setPosition(this.positionForCell(placement.cell).add3f(0, 70, 0));
                });
                await this.animateBoard(0.17);
                this.drawDecks();
                continue;
            }
            break;
        }
        this.syncTiles(false);
        this.drawDecks();
        if (this.core.remainingCount() === 0) {
            this.showWin();
        }
    }

    private animateBoard(duration: number): Promise<void> {
        const jobs: Promise<void>[] = [];
        this.core.board.forEach((id, cell) => {
            if (!id) return;
            const node = this.ensureTileNode(id);
            const target = this.positionForCell(cell);
            jobs.push(new Promise((resolve) => {
                tween(node).to(duration, { position: target }, { easing: "quadOut" }).call(resolve).start();
            }));
        });
        return Promise.all(jobs).then(() => {
            this.syncTiles(false);
        });
    }

    private async animateComplete(groups: PuzzleGroup[]): Promise<void> {
        const overlays: Node[] = [];
        for (const group of groups) {
            const cells = group.cells.map((cell) => this.core.cellToRC(cell));
            const minRow = Math.min(...cells.map((item) => item.r));
            const minColumn = Math.min(...cells.map((item) => item.c));
            const topLeft = this.positionForCell(this.core.rcToCell(minRow, minColumn));
            const overlay = this.createNode(`Complete-${group.imageKey}`, this.tileLayer, this.tileWidth * 2, this.tileHeight * 2, topLeft.x + this.tileWidth / 2, topLeft.y - this.tileHeight / 2);
            const opacity = overlay.addComponent(UIOpacity);
            const sprite = overlay.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.baseFrames.get(group.imageKey)!;
            group.ids.forEach((id) => {
                const node = this.tileNodes.get(id);
                if (node) node.active = false;
            });
            overlay.setScale(0.96, 0.96, 1);
            overlays.push(overlay);
            tween(overlay).to(0.16, { scale: new Vec3(1.04, 1.04, 1) }, { easing: "backOut" }).start();
            tween(opacity).delay(0.18).to(0.20, { opacity: 0 }).start();
        }
        await this.delay(390);
        overlays.forEach((node) => node.destroy());
    }

    private showHint(): void {
        if (this.busy) return;
        const move = this.core.findHelpfulMove();
        if (!move) {
            this.hintLabel.string = "先观察同一张图片的颜色、物体边缘与背景方向";
            return;
        }
        const source = this.tileNodes.get(move.group.ids[0]);
        const sourceCell = move.group.cells[0];
        const sourceRC = this.core.cellToRC(sourceCell);
        const target = this.positionForCell(this.core.rcToCell(sourceRC.r + move.dr, sourceRC.c + move.dc));
        if (source) {
            const original = source.scale.clone();
            tween(source)
                .to(0.16, { scale: new Vec3(1.08, 1.08, 1) })
                .to(0.16, { scale: original })
                .union()
                .repeat(2)
                .start();
        }
        this.hintLabel.string = `提示：把发光组合移向 ${Math.round(target.x)}, ${Math.round(target.y)} 附近`;
    }

    private async previewShare(): Promise<void> {
        await this.platform.share({
            title: `${this.currentPack.name} · Cocos Creator 原生渲染样板`,
            query: `pack=${this.currentPack.id}`,
        });
        this.hintLabel.string = `当前运行平台：${this.platform.name}；微信/抖音分享接口已经预留`;
    }

    private showWin(): void {
        this.busy = true;
        this.winOverlay.active = true;
        this.winContent.removeAllChildren();
        const panel = this.createNode("Panel", this.winContent, 660, 1040, 0, 0);
        const graphics = panel.addComponent(Graphics);
        graphics.fillColor = new Color(20, 39, 67, 250);
        graphics.roundRect(-330, -520, 660, 1040, 34);
        graphics.fill();
        graphics.strokeColor = this.currentPack.accent;
        graphics.lineWidth = 3;
        graphics.roundRect(-330, -520, 660, 1040, 34);
        graphics.stroke();
        const title = this.addLabel(panel, "本局写实合辑完成", 39, new Color(255, 255, 255, 255), 0, 438, 590, 58);
        title.isBold = true;
        this.addLabel(panel, `${this.currentPack.name} · ${this.completedImages.length}张完整图片`, 21, this.currentPack.accent, 0, 390, 590, 38);

        const columns = this.completedImages.length <= 4 ? 2 : 3;
        const rows = Math.ceil(this.completedImages.length / columns);
        const cardWidth = columns === 2 ? 245 : 170;
        const cardHeight = cardWidth * 4 / 3;
        const gapX = columns === 2 ? 26 : 18;
        const gapY = 18;
        const totalWidth = columns * cardWidth + (columns - 1) * gapX;
        const totalHeight = rows * cardHeight + (rows - 1) * gapY;
        this.completedImages.forEach((key, index) => {
            const row = Math.floor(index / columns);
            const column = index % columns;
            const x = -totalWidth / 2 + cardWidth / 2 + column * (cardWidth + gapX);
            const y = 300 - row * (cardHeight + gapY);
            const card = this.createNode(`Album-${key}`, panel, cardWidth, cardHeight, x, y);
            const sprite = card.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.baseFrames.get(key)!;
            const frame = card.addComponent(Graphics);
            frame.strokeColor = new Color(255, 255, 255, 205);
            frame.lineWidth = 3;
            frame.roundRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 12);
            frame.stroke();
        });
        const captionY = Math.max(-410, 300 - totalHeight - 22);
        this.addLabel(panel, "愿晨光温柔相伴 · 愿每一步都走向开阔", 22, new Color(255, 240, 203, 255), 0, captionY, 590, 42);
        this.addButton(panel, "再玩一次", -145, -458, 250, 62, () => void this.switchPack(this.currentPack));
        this.addButton(panel, "切换主题", 145, -458, 250, 62, () => void this.switchPack(this.currentPack.id === "blessing" ? this.packs[1] : this.packs[0]));
    }

    private drawDecks(): void {
        this.deckLayer.removeAllChildren();
        const count = this.core.grid;
        const spacing = this.boardWidth / count;
        for (let column = 0; column < count; column += 1) {
            const amount = this.core.decks[column]?.length ?? 0;
            const node = this.createNode(`Deck-${column}`, this.deckLayer, spacing - 8, 45, -this.boardWidth / 2 + spacing * (column + 0.5), 0);
            const g = node.addComponent(Graphics);
            g.fillColor = amount > 0 ? new Color(183, 68, 86, 245) : new Color(40, 77, 105, 120);
            g.roundRect(-(spacing - 8) / 2, -20, spacing - 8, 40, 10);
            g.fill();
            g.strokeColor = new Color(255, 222, 178, amount > 0 ? 220 : 80);
            g.lineWidth = 2;
            g.roundRect(-(spacing - 8) / 2, -20, spacing - 8, 40, 10);
            g.stroke();
            this.addLabel(node, amount > 0 ? String(amount) : "·", 19, new Color(255, 255, 255, 245), 0, 0, spacing - 16, 32);
        }
    }

    private updateStatus(): void {
        this.statusLabel.string = `已完成 ${this.completedImages.length}/${this.currentPack.images.length} 张  ·  移动 ${this.moves} 步  ·  剩余 ${this.core.remainingCount()} 块`;
        this.hintLabel.string = this.currentPack.id === "helicopter"
            ? "困难点：先看机身颜色，再看雪山、海岸、城市与沙漠背景"
            : "拖动碎片交换位置 · 拼好的组合会一起移动 · 长按可拆单块";
    }

    private updatePackButtons(): void {
        this.packButtons.forEach((button, index) => {
            const active = this.packs[index].id === this.currentPack.id;
            const graphics = button.getComponent(Graphics)!;
            graphics.clear();
            graphics.fillColor = active ? this.currentPack.accent : new Color(20, 58, 91, 245);
            graphics.roundRect(-165, -31, 330, 62, 18);
            graphics.fill();
            graphics.strokeColor = new Color(255, 255, 255, active ? 210 : 90);
            graphics.lineWidth = 2;
            graphics.roundRect(-165, -31, 330, 62, 18);
            graphics.stroke();
            const label = button.getChildByName("Label")?.getComponent(Label);
            if (label) label.color = active ? new Color(45, 34, 30, 255) : new Color(255, 255, 255, 255);
        });
    }

    private positionForCell(cell: number): Vec3 {
        const rc = this.core.cellToRC(cell);
        return new Vec3(
            -this.boardWidth / 2 + this.tileWidth * (rc.c + 0.5),
            this.boardHeight / 2 - this.tileHeight * (rc.r + 0.5),
            0,
        );
    }

    private cellAtPoint(point: Vec3): number {
        const column = Math.floor((point.x + this.boardWidth / 2) / this.tileWidth);
        const row = Math.floor((this.boardHeight / 2 - point.y) / this.tileHeight);
        if (row < 0 || row >= this.core.grid || column < 0 || column >= this.core.grid) return -1;
        return this.core.rcToCell(row, column);
    }

    private touchInBoard(event: EventTouch): Vec3 {
        const point = event.getUILocation();
        return this.boardNode.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(point.x, point.y, 0));
    }

    private clearTileNodes(): void {
        this.tileNodes.forEach((node) => node.destroy());
        this.tileNodes.clear();
        this.tileLayer.removeAllChildren();
    }

    private createNode(name: string, parent: Node, width: number, height: number, x: number, y: number): Node {
        const node = new Node(name);
        node.layer = UI_LAYER;
        parent.addChild(node);
        node.setPosition(x, y, 0);
        node.addComponent(UITransform).setContentSize(width, height);
        return node;
    }

    private addLabel(parent: Node, text: string, fontSize: number, color: Color, x: number, y: number, width: number, height: number): Label {
        const node = this.createNode("Label", parent, width, height, x, y);
        const label = node.addComponent(Label);
        label.string = text;
        label.fontSize = fontSize;
        label.lineHeight = Math.round(fontSize * 1.22);
        label.color = color;
        label.horizontalAlign = HorizontalTextAlignment.CENTER;
        label.verticalAlign = VerticalTextAlignment.CENTER;
        label.overflow = Label.Overflow.SHRINK;
        return label;
    }

    private addButton(parent: Node, text: string, x: number, y: number, width: number, height: number, callback: () => void): Node {
        const node = this.createNode(`Button-${text}`, parent, width, height, x, y);
        const graphics = node.addComponent(Graphics);
        graphics.fillColor = new Color(20, 58, 91, 245);
        graphics.roundRect(-width / 2, -height / 2, width, height, 18);
        graphics.fill();
        graphics.strokeColor = new Color(255, 255, 255, 90);
        graphics.lineWidth = 2;
        graphics.roundRect(-width / 2, -height / 2, width, height, 18);
        graphics.stroke();
        const label = this.addLabel(node, text, 22, new Color(255, 255, 255, 255), 0, 0, width - 20, height - 12);
        label.node.name = "Label";
        node.on(Node.EventType.TOUCH_END, callback, this);
        return node;
    }

    private delay(milliseconds: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}
'''

CORE_TEST_TS = r'''
import assert from "node:assert/strict";
import { JigsawCore } from "../assets/scripts/core/JigsawCore";

const easy = new JigsawCore();
easy.reset(["a", "b", "c", "d"], 4, 7, true);
assert.equal(easy.board.length, 16);
assert.equal(easy.remainingCount(), 16);
const hint = easy.findHelpfulMove();
assert.ok(hint, "fast-start board should expose a positive move");
easy.board = hint.board;
let gravityGuard = 0;
while (easy.gravityStep().moved && gravityGuard++ < 20) { /* settle */ }
const complete = easy.completeGroups();
assert.ok(complete.length >= 1, "hint move should complete at least one image");
const cleared = easy.clearGroups(complete);
assert.ok(cleared.length >= 1);

const hard = new JigsawCore();
hard.reset(["h1", "h2", "h3", "h4", "h5", "h6"], 5, 11, false);
assert.equal(hard.board.length, 25);
assert.equal(hard.remainingCount(), 24);
assert.equal(hard.decks.flat().length, 0);

const ids = hard.idsForImage("h1");
hard.board = Array(25).fill(null);
hard.board[5] = ids[0];
hard.board[6] = ids[1];
const rigid = hard.gravityStep();
assert.equal(rigid.moved, true);
assert.equal(hard.board[10], ids[0]);
assert.equal(hard.board[11], ids[1]);

const swap = new JigsawCore();
swap.reset(["x", "y", "z", "w"], 4, 3, false);
const tileId = swap.board[0]!;
const group = swap.groupForTile(tileId, true)!;
const result = swap.validateMove(group, 3, 3);
assert.equal(result.valid, true);
assert.equal(result.board[15], tileId);

console.log("PASS JigsawCore: generation, move, completion, clear, rigid gravity and long-distance swap");
'''

README_MD = r'''
# Jigsaw Drop — Cocos Creator 3.8.6 原生渲染样板

这是把现有 H5 拼图游戏迁移到 **Cocos Creator 3.8.6 + TypeScript** 的第一版可运行工程。

## 直接打开

1. 安装 Cocos Creator **3.8.6**。
2. 解压本项目。
3. 在 Cocos Dashboard 里选择“打开项目”，选择本文件夹根目录。
4. 等待第一次资源导入完成；编辑器会自动定位 `assets/scenes/Main.scene`。
5. 点击编辑器顶部的预览按钮即可运行。

## 当前已经原生迁移的内容

- Cocos 2D Canvas、Sprite、Graphics、Label 和 Tween 渲染；
- 4×4 写实祝福样板；
- 5×5 六张直升机同题材困难样板；
- 完整图片只加载一份纹理，四块使用同一纹理的四个裁剪区域；
- 单块拖动、正确组合整体拖动、长按拆单块；
- 区域交换、重力下落、组合优先下落、单侧受阻后的合理拆分；
- 完整 2×2 图片识别、完整图覆盖动画、消除与补牌循环；
- 提示、重新开始、组合成果页；
- `PlatformBridge` 已识别 Web、微信 `wx` 和抖音 `tt` 运行环境，并预留震动、保存和分享接口；
- 核心规则位于纯 TypeScript 文件 `assets/scripts/core/JigsawCore.ts`，不依赖 Cocos，可独立测试。

## 工程结构

```text
assets/
├── scenes/Main.scene
├── scripts/GameBootstrap.ts
├── scripts/core/JigsawCore.ts
├── scripts/platform/PlatformBridge.ts
└── resources/pictures/        # 18 张写实图片
```

## 本样板的边界

这版的目标是先验证 **Cocos 原生渲染、触摸手感、图片裁切、无 DOM 架构和双平台适配结构**。它还不是微信/抖音正式提审包：正式发布仍需填写各自 AppID、配置隐私与分享素材、接入登录/云存档/广告，并把图片包拆成 Asset Bundle 或远程资源。

## 推荐下一步

确认 Creator 内的拖动、拼合、重力和图片观感后，再把 H5 v4.2 的全部关卡、FLOW/FEVER、Canvas 粒子、多图高清海报、撤销与求解器逐项迁入这个工程。
'''


def write_project_files(out: Path) -> None:
    write(
        out / "package.json",
        f'''{{
          "name": "jigsaw-drop-cocos",
          "uuid": "{PROJECT_UUID}",
          "version": "0.1.0",
          "type": "2d",
          "creator": {{
            "version": "3.8.6"
          }}
        }}
        ''',
    )
    write(
        out / "tsconfig.json",
        '''{
          "extends": "./temp/tsconfig.cocos.json",
          "compilerOptions": {
            "strict": true,
            "noImplicitOverride": true
          }
        }
        ''',
    )
    write(
        out / "tsconfig.ci.json",
        '''{
          "compilerOptions": {
            "target": "ES2020",
            "module": "ESNext",
            "moduleResolution": "Node",
            "experimentalDecorators": true,
            "strict": true,
            "skipLibCheck": true,
            "esModuleInterop": true,
            "allowSyntheticDefaultImports": true,
            "types": ["@cocos/creator-types/engine"],
            "lib": ["ES2020", "DOM"]
          },
          "include": ["assets/scripts/**/*.ts"]
        }
        ''',
    )
    write(
        out / ".gitignore",
        '''library/
        local/
        temp/
        build/
        profiles/
        node_modules/
        .DS_Store
        ''',
    )
    write(out / "README.md", README_MD)
    write(out / "PROJECT_VERSION", "0.1.0-cocos-3.8.6\n")
    write(out / "assets" / "scripts" / "core" / "JigsawCore.ts", CORE_TS)
    write(out / "assets" / "scripts" / "platform" / "PlatformBridge.ts", PLATFORM_TS)
    write(out / "assets" / "scripts" / "GameBootstrap.ts", BOOTSTRAP_TS)
    write(
        out / "assets" / "scripts" / "GameBootstrap.ts.meta",
        f'''{{
          "ver": "4.0.24",
          "importer": "typescript",
          "imported": true,
          "uuid": "{SCRIPT_UUID}",
          "files": [],
          "subMetas": {{}},
          "userData": {{}}
        }}
        ''',
    )
    write(out / "tests" / "core.test.ts", CORE_TEST_TS)


def update_settings(out: Path) -> None:
    packages = out / "settings" / "v2" / "packages"
    packages.mkdir(parents=True, exist_ok=True)
    write(
        packages / "project.json",
        '''{
          "__version__": "1.0.6",
          "general": {
            "designResolution": {
              "fitHeight": false,
              "fitWidth": true,
              "width": 750,
              "height": 1334
            }
          }
        }
        ''',
    )
    write(
        packages / "scene.json",
        f'''{{
          "__version__": "1.0.3",
          "current-scene": "{SCENE_UUID}"
        }}
        ''',
    )
    if not (packages / "builder.json").exists():
        write(packages / "builder.json", '{"__version__":"1.3.9"}\n')


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--template", required=True, type=Path)
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()

    if args.out.exists():
        shutil.rmtree(args.out)
    args.out.mkdir(parents=True)
    copy_template_settings(args.template, args.out)
    write_project_files(args.out)
    build_scene(args.template, args.out)
    assets = convert_assets(args.source, args.out)
    update_settings(args.out)

    manifest = {
        "project": "Jigsaw Drop Cocos Prototype",
        "creator": "3.8.6",
        "version": "0.1.0",
        "images": assets,
        "scene": "assets/scenes/Main.scene",
        "entryComponent": "assets/scripts/GameBootstrap.ts",
    }
    (args.out / "migration-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {args.out} with {len(assets)} images")


if __name__ == "__main__":
    main()
