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

export interface HelpfulMove {
    group: PuzzleGroup;
    dr: number;
    dc: number;
    board: BoardCell[];
    value: number;
    split: boolean;
    imageKey: string;
    targetCells: number[];
}

export interface CoreSnapshot {
    grid: number;
    board: BoardCell[];
    decks: string[][];
    imageKeys: string[];
    seed: number;
    maxDealPerColumn: number;
}

export interface ResetOptions {
    fastStart?: boolean;
    maxDealPerColumn?: number;
    chainDepth?: number;
}

export interface GravityResult {
    moved: boolean;
    ids: string[];
    from: Map<string, number>;
    to: Map<string, number>;
    fractured: boolean;
}

export interface RescueResult {
    changed: boolean;
    imageKey?: string;
    sourceCell?: number;
    targetCell?: number;
    changedIds: string[];
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

function arraysEqual<T>(a: T[], b: T[]): boolean {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}

export class JigsawCore {
    public grid = 4;
    public board: BoardCell[] = [];
    public decks: string[][] = [];
    public readonly tiles = new Map<string, TileData>();
    public imageKeys: string[] = [];
    public seed = 1;
    public maxDealPerColumn = 1;
    public generation = { chainDepth: 0 };

    public reset(
        imageKeys: string[],
        grid: number,
        seed = 1,
        options: boolean | ResetOptions = false,
    ): void {
        if (grid < 4 || grid > 6) throw new Error(`unsupported grid: ${grid}`);
        if (imageKeys.length < 1) throw new Error("at least one image is required");

        const normalized: ResetOptions = typeof options === "boolean" ? { fastStart: options } : options;
        this.grid = grid;
        this.imageKeys = [...new Set(imageKeys)];
        this.seed = seed >>> 0;
        this.maxDealPerColumn = Math.max(1, Math.floor(normalized.maxDealPerColumn ?? 1));
        this.generation = { chainDepth: Math.max(0, Math.floor(normalized.chainDepth ?? 0)) };
        this.tiles.clear();

        const allIds: string[] = [];
        this.imageKeys.forEach((imageKey, imageIndex) => {
            for (let quadrant = 0; quadrant < 4; quadrant += 1) {
                const id = `I${imageIndex}-${imageKey}-Q${quadrant}`;
                this.tiles.set(id, { id, imageKey, quadrant: quadrant as Quadrant });
                allIds.push(id);
            }
        });

        const random = mulberry32(this.seed);
        shuffle(allIds, random);
        const capacity = grid * grid;
        this.board = Array<BoardCell>(capacity).fill(null);
        const visible = allIds.slice(0, capacity);
        const start = capacity - visible.length;
        visible.forEach((id, index) => { this.board[start + index] = id; });

        this.decks = Array.from({ length: grid }, () => [] as string[]);
        allIds.slice(capacity).forEach((id, index) => {
            this.decks[index % grid].push(id);
        });

        // A generated level must expose at least one complete four-piece family.
        // This is deterministic and happens only during generation, never silently
        // while the player is making plans from the deck preview.
        this.ensureImageVisible(this.imageKeys[0]);
        if (normalized.fastStart && grid === 4) this.seedFastStart(this.imageKeys[0]);
        else this.breakAllCompleteImages();
        if ((normalized.chainDepth ?? 0) >= 2) this.seedChain(Math.min(3, normalized.chainDepth ?? 0));
        this.assertIntegrity();
    }

    public makeSnapshot(): CoreSnapshot {
        return {
            grid: this.grid,
            board: this.board.slice(),
            decks: this.decks.map((deck) => deck.slice()),
            imageKeys: this.imageKeys.slice(),
            seed: this.seed,
            maxDealPerColumn: this.maxDealPerColumn,
        };
    }

    public restoreSnapshot(snapshot: CoreSnapshot): void {
        if (snapshot.grid !== this.grid || !arraysEqual(snapshot.imageKeys, this.imageKeys)) {
            throw new Error("snapshot belongs to another generated level");
        }
        this.board = snapshot.board.slice();
        this.decks = snapshot.decks.map((deck) => deck.slice());
        this.seed = snapshot.seed >>> 0;
        this.maxDealPerColumn = snapshot.maxDealPerColumn;
        this.assertIntegrity();
    }

    public cloneBoard(): BoardCell[] {
        return this.board.slice();
    }

    public idsForImage(imageKey: string): string[] {
        const result = Array<string>(4);
        for (const tile of this.tiles.values()) {
            if (tile.imageKey === imageKey) result[tile.quadrant] = tile.id;
        }
        if (result.some((id) => !id)) throw new Error(`incomplete image tile set: ${imageKey}`);
        return result;
    }

    public cellForTile(id: string, board: BoardCell[] = this.board): number {
        return board.indexOf(id);
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
            { r: -1, c: 0 }, { r: 1, c: 0 }, { r: 0, c: -1 }, { r: 0, c: 1 },
        ];

        const originFor = (cell: number, tile: TileData): string => {
            const pos = this.cellToRC(cell);
            const q = QUADRANT_POS[tile.quadrant];
            return `${tile.imageKey}:${pos.r - q.r}:${pos.c - q.c}`;
        };

        for (let cell = 0; cell < board.length; cell += 1) {
            const id = board[cell];
            if (!id || visited.has(cell)) continue;
            const tile = this.tiles.get(id);
            if (!tile) continue;
            const origin = originFor(cell, tile);
            const stack = [cell];
            const cells: number[] = [];
            const ids: string[] = [];
            visited.add(cell);

            while (stack.length > 0) {
                const current = stack.pop()!;
                const currentId = board[current];
                const currentTile = currentId ? this.tiles.get(currentId) : undefined;
                if (!currentId || !currentTile) continue;
                cells.push(current);
                ids.push(currentId);
                const rc = this.cellToRC(current);
                for (const direction of directions) {
                    const nr = rc.r + direction.r;
                    const nc = rc.c + direction.c;
                    if (nr < 0 || nr >= this.grid || nc < 0 || nc >= this.grid) continue;
                    const neighbor = this.rcToCell(nr, nc);
                    if (visited.has(neighbor)) continue;
                    const neighborId = board[neighbor];
                    const neighborTile = neighborId ? this.tiles.get(neighborId) : undefined;
                    if (!neighborTile || originFor(neighbor, neighborTile) !== origin) continue;
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }

            const ordered = cells.map((value, index) => ({ cell: value, id: ids[index] })).sort((a, b) => a.cell - b.cell);
            const quadrants = new Set(ordered.map((entry) => this.tiles.get(entry.id)!.quadrant));
            groups.push({
                imageKey: tile.imageKey,
                ids: ordered.map((entry) => entry.id),
                cells: ordered.map((entry) => entry.cell),
                complete: ordered.length === 4 && quadrants.size === 4,
            });
        }
        return groups;
    }

    public groupForTile(id: string, split = false, board: BoardCell[] = this.board): PuzzleGroup | null {
        const cell = this.cellForTile(id, board);
        if (cell < 0) return null;
        const tile = this.tiles.get(id);
        if (!tile) return null;
        if (split) return { imageKey: tile.imageKey, ids: [id], cells: [cell], complete: false };
        return this.computeGroups(board).find((group) => group.ids.includes(id)) ?? null;
    }

    public connectionMask(id: string, board: BoardCell[] = this.board): { left: boolean; right: boolean; up: boolean; down: boolean } {
        const result = { left: false, right: false, up: false, down: false };
        const cell = this.cellForTile(id, board);
        if (cell < 0) return result;
        const group = this.groupForTile(id, false, board);
        if (!group || group.ids.length < 2) return result;
        const groupCells = new Set(group.cells);
        const rc = this.cellToRC(cell);
        result.left = rc.c > 0 && groupCells.has(cell - 1);
        result.right = rc.c < this.grid - 1 && groupCells.has(cell + 1);
        result.up = rc.r > 0 && groupCells.has(cell - this.grid);
        result.down = rc.r < this.grid - 1 && groupCells.has(cell + this.grid);
        return result;
    }

    public validateMove(group: PuzzleGroup, dr: number, dc: number, board: BoardCell[] = this.board): MoveResult {
        if (dr === 0 && dc === 0) return { valid: false, board: board.slice(), targetCells: [], reason: "same-cell" };
        const targetCells: number[] = [];
        for (const cell of group.cells) {
            const rc = this.cellToRC(cell);
            const row = rc.r + dr;
            const column = rc.c + dc;
            if (row < 0 || row >= this.grid || column < 0 || column >= this.grid) {
                return { valid: false, board: board.slice(), targetCells: [], reason: "outside" };
            }
            targetCells.push(this.rcToCell(row, column));
        }

        const sourceSet = new Set(group.cells);
        const targetSet = new Set(targetCells);
        const union = new Set<number>([...sourceSet, ...targetSet]);
        const starts = group.cells.filter((cell) => !targetSet.has(cell));
        if (starts.length === 0) return { valid: false, board: board.slice(), targetCells, reason: "no-leading-edge" };

        const nextBoard = board.slice();
        const touched = new Set<number>();
        for (const start of starts) {
            const chain = [start];
            let current = start;
            while (true) {
                const rc = this.cellToRC(current);
                const row = rc.r + dr;
                const column = rc.c + dc;
                if (row < 0 || row >= this.grid || column < 0 || column >= this.grid) break;
                const next = this.rcToCell(row, column);
                if (!union.has(next)) break;
                chain.push(next);
                current = next;
            }
            const values = chain.map((cell) => board[cell]);
            nextBoard[chain[0]] = values[values.length - 1];
            for (let index = 1; index < chain.length; index += 1) nextBoard[chain[index]] = values[index - 1];
            chain.forEach((cell) => touched.add(cell));
        }

        if ([...union].some((cell) => !touched.has(cell))) {
            return { valid: false, board: board.slice(), targetCells, reason: "unsupported-shape" };
        }
        for (let index = 0; index < group.ids.length; index += 1) {
            if (nextBoard[targetCells[index]] !== group.ids[index]) {
                return { valid: false, board: board.slice(), targetCells, reason: "rigid-shape-broken" };
            }
        }
        return { valid: true, board: nextBoard, targetCells };
    }

    public applyMove(group: PuzzleGroup, dr: number, dc: number): MoveResult {
        const result = this.validateMove(group, dr, dc);
        if (result.valid) this.board = result.board;
        return result;
    }

    public gravityStep(): GravityResult {
        const before = new Map<string, number>();
        this.board.forEach((id, cell) => { if (id) before.set(id, cell); });
        const groups = this.computeGroups();
        const groupByCell = new Map<number, number>();
        groups.forEach((group, index) => group.cells.forEach((cell) => groupByCell.set(cell, index)));
        const memo = new Map<number, boolean>();
        const visiting = new Set<number>();

        const canMove = (index: number): boolean => {
            if (memo.has(index)) return memo.get(index)!;
            if (visiting.has(index)) return false;
            visiting.add(index);
            const group = groups[index];
            const own = new Set(group.cells);
            let allowed = true;
            for (const cell of group.cells) {
                const rc = this.cellToRC(cell);
                if (rc.r >= this.grid - 1) { allowed = false; break; }
                const below = cell + this.grid;
                if (own.has(below) || !this.board[below]) continue;
                const support = groupByCell.get(below);
                if (support === undefined || support === index || !canMove(support)) { allowed = false; break; }
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
                for (const cell of groups[index].cells) next[cell + this.grid] = this.board[cell];
            }
            this.board = next;
            return this.gravityResult(before, ids, false);
        }

        // If a shape is pinned on only one side, unsupported quarters settle.
        // This runs only after no whole connected group can move.
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
        if (cells.size === 0) return { moved: false, ids: [], from: before, to: before, fractured: false };
        const next = this.cloneBoard();
        const ids: string[] = [];
        for (const cell of cells) {
            const id = this.board[cell];
            if (id) ids.push(id);
            next[cell] = null;
        }
        for (const cell of cells) next[cell + this.grid] = this.board[cell];
        this.board = next;
        return this.gravityResult(before, ids, true);
    }

    public settleGravity(maxSteps = 64): GravityResult[] {
        const results: GravityResult[] = [];
        for (let step = 0; step < maxSteps; step += 1) {
            const result = this.gravityStep();
            if (!result.moved) break;
            results.push(result);
        }
        return results;
    }

    public completeGroups(board: BoardCell[] = this.board): PuzzleGroup[] {
        return this.computeGroups(board).filter((group) => group.complete);
    }

    public clearGroups(groups: PuzzleGroup[]): string[] {
        const images: string[] = [];
        for (const group of groups) {
            images.push(group.imageKey);
            for (const cell of group.cells) this.board[cell] = null;
        }
        return images;
    }

    public dealWave(maxPerColumn = this.maxDealPerColumn): DealPlacement[] {
        const placements: DealPlacement[] = [];
        const limit = Math.max(1, Math.floor(maxPerColumn));
        for (let column = 0; column < this.grid; column += 1) {
            let placed = 0;
            while (placed < limit && !this.board[column] && this.decks[column].length > 0) {
                const id = this.decks[column].shift()!;
                this.board[column] = id;
                placements.push({ id, cell: column, column });
                placed += 1;
                // Only the first top cell exists in each column; another card can
                // enter after gravity creates a new top opening.
                break;
            }
        }
        return placements;
    }

    public peekDeck(column: number, count = 1): string[] {
        return (this.decks[column] ?? []).slice(0, Math.max(0, count));
    }

    public remainingCount(): number {
        return this.board.filter(Boolean).length + this.decks.reduce((total, deck) => total + deck.length, 0);
    }

    public score(board: BoardCell[] = this.board): number {
        return this.computeGroups(board).reduce((total, group) => total + group.ids.length * group.ids.length, 0);
    }

    public visibleCountForImage(imageKey: string, board: BoardCell[] = this.board): number {
        const ids = new Set(this.idsForImage(imageKey));
        return board.reduce((count, id) => count + (id && ids.has(id) ? 1 : 0), 0);
    }

    public visibleCompletionImage(board: BoardCell[] = this.board): string | null {
        return this.imageKeys.find((key) => this.visibleCountForImage(key, board) === 4) ?? null;
    }

    public isStable(): boolean {
        const snapshot = this.makeSnapshot();
        const result = this.gravityStep();
        this.restoreSnapshot(snapshot);
        return !result.moved;
    }

    public isDeadlocked(): boolean {
        if (this.remainingCount() === 0) return false;
        if (this.completeGroups().length > 0) return false;
        const hasDeck = this.decks.some((deck) => deck.length > 0);
        if (!hasDeck) return this.findHelpfulMove() === null;
        const boardFull = this.board.every(Boolean);
        return boardFull && this.visibleCompletionImage() === null;
    }

    public findHelpfulMove(): HelpfulMove | null {
        const groups = this.computeGroups();
        const candidates: { group: PuzzleGroup; split: boolean }[] = groups.map((group) => ({ group, split: false }));
        for (const group of groups) {
            if (group.ids.length <= 1) continue;
            for (const id of group.ids) {
                const single = this.groupForTile(id, true);
                if (single) candidates.push({ group: single, split: true });
            }
        }

        const baselineComplete = this.completeGroups().length;
        const baselineScore = this.score();
        let best: HelpfulMove | null = null;
        for (const candidate of candidates) {
            const anchor = this.cellToRC(candidate.group.cells[0]);
            for (let row = 0; row < this.grid; row += 1) {
                for (let column = 0; column < this.grid; column += 1) {
                    const dr = row - anchor.r;
                    const dc = column - anchor.c;
                    const result = this.validateMove(candidate.group, dr, dc);
                    if (!result.valid) continue;
                    const afterGroups = this.computeGroups(result.board);
                    const complete = afterGroups.filter((group) => group.complete).length;
                    const sameImageLargest = Math.max(1, ...afterGroups.filter((group) => group.imageKey === candidate.group.imageKey).map((group) => group.ids.length));
                    const value =
                        (complete - baselineComplete) * 10000
                        + (this.score(result.board) - baselineScore) * 8
                        + sameImageLargest * 18
                        - (candidate.split ? 2 : 0)
                        - (Math.abs(dr) + Math.abs(dc)) * 0.05;
                    if (!best || value > best.value) {
                        best = {
                            group: candidate.group,
                            dr,
                            dc,
                            board: result.board,
                            value,
                            split: candidate.split,
                            imageKey: candidate.group.imageKey,
                            targetCells: result.targetCells,
                        };
                    }
                }
            }
        }
        return best && best.value > 0 ? best : null;
    }

    public rescue(): RescueResult {
        if (this.remainingCount() === 0) return { changed: false, changedIds: [] };
        const ranked = this.imageKeys
            .map((imageKey) => ({ imageKey, visible: this.visibleCountForImage(imageKey) }))
            .filter((entry) => entry.visible < 4)
            .sort((a, b) => b.visible - a.visible);
        const imageKey = (ranked[0]?.imageKey ?? this.imageKeys[0]);
        this.ensureImageVisible(imageKey);
        const ids = this.idsForImage(imageKey);
        const anchorRow = this.grid - 2;
        const anchorColumn = Math.max(0, Math.floor((this.grid - 2) / 2));
        const target = [
            this.rcToCell(anchorRow, anchorColumn),
            this.rcToCell(anchorRow, anchorColumn + 1),
            this.rcToCell(anchorRow + 1, anchorColumn),
            this.rcToCell(anchorRow + 1, anchorColumn + 1),
        ];
        this.swapIntoCell(ids[0], target[0]);
        this.swapIntoCell(ids[1], target[1]);
        this.swapIntoCell(ids[2], target[2]);

        // Keep one legal player action: park Q3 outside its final cell.
        const staging = this.board.findIndex((id, cell) =>
            !target.includes(cell)
            && Boolean(id)
            && this.tiles.get(id!)?.imageKey !== imageKey,
        );
        if (staging < 0) {
            this.swapIntoCell(ids[3], target[3]);
            return { changed: true, imageKey, changedIds: ids.slice() };
        }
        this.swapIntoCell(ids[3], staging);
        if (this.board[target[3]]?.startsWith(`I`) === false || this.board[target[3]] === null) {
            const fallback = this.board.find((id, cell) => cell !== staging && !target.includes(cell) && id);
            if (fallback) this.swapIntoCell(fallback, target[3]);
        }
        this.assertIntegrity();
        return {
            changed: true,
            imageKey,
            sourceCell: staging,
            targetCell: target[3],
            changedIds: ids.slice(),
        };
    }

    public assertIntegrity(): void {
        const all = [...this.board.filter((id): id is string => Boolean(id)), ...this.decks.flat()];
        const expected = this.tiles.size;
        if (all.length !== expected) throw new Error(`piece count mismatch: ${all.length}/${expected}`);
        const unique = new Set(all);
        if (unique.size !== expected) throw new Error(`duplicate or missing pieces: ${unique.size}/${expected}`);
        for (const id of unique) if (!this.tiles.has(id)) throw new Error(`unknown tile id: ${id}`);
    }

    private gravityResult(before: Map<string, number>, ids: string[], fractured: boolean): GravityResult {
        const to = new Map<string, number>();
        this.board.forEach((id, cell) => { if (id) to.set(id, cell); });
        return { moved: true, ids, from: before, to, fractured };
    }

    private ensureImageVisible(imageKey: string): void {
        const ids = this.idsForImage(imageKey);
        for (const id of ids) {
            if (this.board.includes(id)) continue;
            const deckLocation = this.findInDeck(id);
            if (!deckLocation) throw new Error(`hidden tile not found: ${id}`);
            const target = this.board.findIndex((boardId) => boardId && this.tiles.get(boardId)?.imageKey !== imageKey);
            if (target < 0) throw new Error("no board tile available for initial frontier");
            const displaced = this.board[target]!;
            this.board[target] = id;
            this.decks[deckLocation.column][deckLocation.index] = displaced;
        }
    }

    private seedFastStart(imageKey: string): void {
        const ids = this.idsForImage(imageKey);
        const target = [8, 9, 12, 13];
        this.swapIntoCell(ids[0], target[0]);
        this.swapIntoCell(ids[1], target[1]);
        this.swapIntoCell(ids[2], target[2]);
        const staging = 15;
        this.swapIntoCell(ids[3], staging);
        this.breakOtherCompleteImages(imageKey);
    }

    private seedChain(depth: number): void {
        if (this.grid !== 5 || this.imageKeys.length < depth) return;
        // This is a gentle deterministic chain seed rather than a scripted clear:
        // each selected family starts with a two-piece relation in a different area.
        const anchors = [[3, 0], [3, 2], [1, 1]];
        for (let index = 0; index < depth; index += 1) {
            const ids = this.idsForImage(this.imageKeys[index]);
            const [row, column] = anchors[index];
            this.swapIntoCell(ids[0], this.rcToCell(row, column));
            this.swapIntoCell(ids[1], this.rcToCell(row, column + 1));
        }
        this.breakAllCompleteImages();
    }

    private breakAllCompleteImages(): void {
        let guard = 0;
        while (guard++ < this.imageKeys.length * 3) {
            const complete = this.completeGroups()[0];
            if (!complete) return;
            const source = complete.cells[complete.cells.length - 1];
            const target = this.board.findIndex((id, cell) => {
                if (!id || complete.cells.includes(cell)) return false;
                return this.tiles.get(id)?.imageKey !== complete.imageKey;
            });
            if (target < 0) return;
            [this.board[source], this.board[target]] = [this.board[target], this.board[source]];
        }
    }

    private swapIntoCell(id: string, target: number): void {
        const boardCell = this.board.indexOf(id);
        const displaced = this.board[target];
        if (boardCell >= 0) {
            this.board[boardCell] = displaced;
            this.board[target] = id;
            return;
        }
        const location = this.findInDeck(id);
        if (!location) throw new Error(`tile not found: ${id}`);
        if (!displaced) {
            this.decks[location.column].splice(location.index, 1);
        } else {
            this.decks[location.column][location.index] = displaced;
        }
        this.board[target] = id;
    }

    private findInDeck(id: string): { column: number; index: number } | null {
        for (let column = 0; column < this.decks.length; column += 1) {
            const index = this.decks[column].indexOf(id);
            if (index >= 0) return { column, index };
        }
        return null;
    }

    private breakOtherCompleteImages(protectedImage: string): void {
        let guard = 0;
        while (guard++ < 20) {
            const complete = this.completeGroups().find((group) => group.imageKey !== protectedImage);
            if (!complete) return;
            const source = complete.cells[complete.cells.length - 1];
            const target = this.board.findIndex((id, cell) => {
                if (!id || complete.cells.includes(cell)) return false;
                return this.tiles.get(id)?.imageKey !== complete.imageKey;
            });
            if (target < 0) return;
            [this.board[source], this.board[target]] = [this.board[target], this.board[source]];
        }
    }
}
