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
        this.subtitleLabel = this.addLabel(topPanel, "Cocos Creator 3.8.8 原生2D渲染样板", 20, new Color(153, 229, 255, 255), 0, -18, 650, 36);

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
                tween(node).to(duration, { position: target }, { easing: "quadOut" }).call(() => resolve()).start();
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
