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
