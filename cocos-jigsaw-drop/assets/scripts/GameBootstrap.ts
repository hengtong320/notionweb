import {
    _decorator,
    assetManager,
    BlockInputEvents,
    Color,
    Component,
    EventTouch,
    Graphics,
    HorizontalTextAlignment,
    ImageAsset,
    Label,
    Layers,
    Mask,
    Node,
    Rect,
    ResolutionPolicy,
    Size,
    Sprite,
    SpriteFrame,
    tween,
    Tween,
    UIOpacity,
    UITransform,
    Vec2,
    Vec3,
    VerticalTextAlignment,
    view,
} from "cc";
import { AudioDirector } from "./AudioDirector";
import {
    BLESSING_PACKS,
    createClassicPack,
    PackDefinition,
    PICTURE_BY_KEY,
    PictureDefinition,
    requiredBundles,
} from "./config/GameConfig";
import {
    CoreSnapshot,
    HelpfulMove,
    JigsawCore,
    MoveResult,
    PuzzleGroup,
} from "./core/JigsawCore";
import { createPlatformBridge, PlatformBridge } from "./platform/PlatformBridge";

const { ccclass } = _decorator;
const UI_LAYER = Layers.Enum.UI_2D;
const DESIGN_WIDTH = 750;
const DESIGN_HEIGHT = 1334;
const TILE_ASPECT = 0.75;
const SAVE_KEY = "jigsaw-drop-cocos-v1";
const APP_VERSION = "1.0.0-beta.1";

interface GameSave {
    schema: number;
    classicLevel: number;
    sound: boolean;
    vibration: boolean;
    fps: 45 | 60;
    unlocked: string[];
    completedBlessingPacks: string[];
    best: Record<string, { moves: number; seconds: number; maxChain: number }>;
}

interface UndoState {
    core: CoreSnapshot;
    completedImages: string[];
    moves: number;
    elapsed: number;
    flow: number;
    feverTurns: number;
    streakCombo: number;
    streakGrace: number;
    maxChain: number;
    hints: number;
    rescues: number;
}

interface DragState {
    touchId: number;
    tileId: string;
    sourceCell: number;
    group: PuzzleGroup;
    split: boolean;
    moved: boolean;
    startPoint: Vec3;
    startPositions: Map<string, Vec3>;
    holdTimer: ReturnType<typeof setTimeout> | null;
    previewDr: number;
    previewDc: number;
    preview: MoveResult | null;
}

interface ViewportState {
    width: number;
    height: number;
    safeWidth: number;
    safeHeight: number;
    safeCenterY: number;
    topInset: number;
    bottomInset: number;
}

function hexColor(hex: string, alpha = 255): Color {
    const value = hex.replace("#", "");
    const full = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
    return new Color(
        parseInt(full.slice(0, 2), 16),
        parseInt(full.slice(2, 4), 16),
        parseInt(full.slice(4, 6), 16),
        alpha,
    );
}

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

@ccclass("GameBootstrap")
export class GameBootstrap extends Component {
    private readonly core = new JigsawCore();
    private readonly platform: PlatformBridge = createPlatformBridge();
    private audio!: AudioDirector;
    private save: GameSave = {
        schema: 1,
        classicLevel: 1,
        sound: true,
        vibration: true,
        fps: 60,
        unlocked: [],
        completedBlessingPacks: [],
        best: {},
    };

    private runtimeRoot!: Node;
    private safeRoot!: Node;
    private backgroundNode!: Node;
    private backgroundGraphics!: Graphics;
    private homeScreen!: Node;
    private homeContent!: Node;
    private homeProgressLabel!: Label;
    private homePlatformLabel!: Label;
    private gameScreen!: Node;
    private packOverlay!: Node;
    private packPanel!: Node;
    private settingsOverlay!: Node;
    private settingsPanel!: Node;
    private resultScreen!: Node;
    private resultPanel!: Node;
    private resultActions!: Node;
    private orientationOverlay!: Node;
    private toastNode!: Node;
    private toastLabel!: Label;

    private gameTopbar!: Node;
    private gameTitleLabel!: Label;
    private gameSubtitleLabel!: Label;
    private deckLayer!: Node;
    private boardNode!: Node;
    private boardGraphics!: Graphics;
    private tileLayer!: Node;
    private joinedLayer!: Node;
    private fxLayer!: Node;
    private hintLayer!: Node;
    private dropPreview!: Graphics;
    private statusPanel!: Node;
    private statusLabel!: Label;
    private guideLabel!: Label;
    private flowBar!: Node;
    private flowFill!: Node;
    private flowLabel!: Label;
    private comboLabel!: Label;
    private gameBottombar!: Node;
    private hintButton!: Node;
    private undoButton!: Node;
    private rescueButton!: Node;
    private rescueButtonLabel!: Label;

    private viewport: ViewportState = {
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        safeWidth: DESIGN_WIDTH,
        safeHeight: DESIGN_HEIGHT,
        safeCenterY: 0,
        topInset: 0,
        bottomInset: 0,
    };
    private viewportSignature = "";
    private currentPack: PackDefinition = BLESSING_PACKS[0];
    private loadedBundles = new Map<string, any>();
    private baseFrames = new Map<string, SpriteFrame>();
    private pieceFrames = new Map<string, SpriteFrame[]>();
    private tileNodes = new Map<string, Node>();
    private joinedSurfaces: Node[] = [];
    private hintNodes: Node[] = [];
    private completedImages: string[] = [];
    private drag: DragState | null = null;
    private undoState: UndoState | null = null;
    private busy = false;
    private gameStartedAt = 0;
    private elapsedBeforePause = 0;
    private pausedAt = 0;
    private moves = 0;
    private turnChain = 0;
    private maxChain = 0;
    private streakCombo = 0;
    private streakGrace = 0;
    private flow = 0;
    private feverTurns = 0;
    private hints = 3;
    private rescues = 3;
    private needsRescue = false;
    private tileWidth = 138;
    private tileHeight = 184;
    private boardWidth = 552;
    private boardHeight = 736;
    private toastTimer: ReturnType<typeof setTimeout> | null = null;
    private currentResultCapture = "";

    protected start(): void {
        void this.initialize();
    }

    protected onDestroy(): void {
        this.cancelDrag();
        this.releasePictureResources([]);
    }

    private async initialize(): Promise<void> {
        view.setDesignResolutionSize(DESIGN_WIDTH, DESIGN_HEIGHT, ResolutionPolicy.FIXED_WIDTH);
        this.save = this.platform.getStorage<GameSave>(SAVE_KEY, this.save);
        this.save.schema = 1;
        this.save.classicLevel = Math.max(1, this.save.classicLevel || 1);
        this.save.unlocked = Array.isArray(this.save.unlocked) ? this.save.unlocked : [];
        this.save.completedBlessingPacks = Array.isArray(this.save.completedBlessingPacks) ? this.save.completedBlessingPacks : [];
        this.save.best = this.save.best ?? {};
        this.platform.setPreferredFPS(this.save.fps === 45 ? 45 : 60);
        this.platform.keepScreenOn(true);
        this.platform.setup({
            onShow: (query) => this.onPlatformShow(query),
            onHide: () => this.onPlatformHide(),
            passiveSharePayload: () => this.passiveSharePayload(),
        });

        const canvas = this.node.parent;
        if (!canvas) throw new Error("GameBootstrap must be a direct child of Canvas");
        this.buildShell(canvas);
        this.audio = new AudioDirector(this.runtimeRoot);
        this.audio.setEnabled(this.save.sound);
        void this.audio.preload();
        this.refreshLayout(true);
        this.schedule(() => this.refreshLayout(false), 0.5);
        this.schedule(() => this.updateStatus(), 0.25);
        this.showHome();

        const query = this.platform.getLaunchQuery();
        if (query.pack) {
            const pack = BLESSING_PACKS.find((item) => item.id === query.pack);
            if (pack) await this.startPack(pack);
        } else if (query.mode === "classic") {
            const level = Math.max(1, Number(query.level) || this.save.classicLevel);
            await this.startPack(createClassicPack(level));
        }
    }

    private buildShell(canvas: Node): void {
        this.runtimeRoot = this.createNode("RuntimeRoot", canvas, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);
        this.backgroundNode = this.createNode("Background", this.runtimeRoot, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);
        this.backgroundGraphics = this.backgroundNode.addComponent(Graphics);
        this.safeRoot = this.createNode("SafeRoot", this.runtimeRoot, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);

        this.homeScreen = this.createNode("HomeScreen", this.safeRoot, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);
        this.buildHome();
        this.gameScreen = this.createNode("GameScreen", this.safeRoot, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);
        this.buildGame();
        this.gameScreen.active = false;

        this.packOverlay = this.createOverlay("PackOverlay");
        this.packPanel = this.createNode("PackPanel", this.packOverlay, 690, 1100, 0, 0);
        this.packOverlay.active = false;
        this.settingsOverlay = this.createOverlay("SettingsOverlay");
        this.settingsPanel = this.createNode("SettingsPanel", this.settingsOverlay, 640, 680, 0, 0);
        this.settingsOverlay.active = false;
        this.resultScreen = this.createOverlay("ResultScreen", new Color(1, 10, 24, 242));
        this.resultPanel = this.createNode("ResultPanel", this.resultScreen, 690, 1180, 0, 0);
        this.resultScreen.active = false;

        this.orientationOverlay = this.createOverlay("OrientationOverlay", new Color(2, 13, 30, 252));
        const orientationCard = this.createNode("OrientationCard", this.orientationOverlay, 560, 280, 0, 0);
        this.drawRoundedPanel(orientationCard, 560, 280, new Color(12, 45, 82, 255), new Color(91, 221, 255, 200), 28);
        const orientationTitle = this.addLabel(orientationCard, "请将手机竖屏使用", 36, Color.WHITE, 0, 45, 500, 58);
        orientationTitle.isBold = true;
        this.addLabel(orientationCard, "竖屏可以获得完整棋盘和更准确的拖动体验", 21, new Color(169, 225, 247, 255), 0, -32, 500, 72);
        this.orientationOverlay.active = false;

        this.toastNode = this.createNode("Toast", this.runtimeRoot, 610, 76, 0, -420);
        this.drawRoundedPanel(this.toastNode, 610, 76, new Color(5, 24, 50, 238), new Color(255, 255, 255, 90), 30);
        this.toastLabel = this.addLabel(this.toastNode, "", 22, Color.WHITE, 0, 0, 570, 56);
        this.toastNode.active = false;
    }

    private buildHome(): void {
        this.homeContent = this.createNode("HomeContent", this.homeScreen, 710, 1160, 0, 0);
        const eyebrow = this.addLabel(this.homeContent, `COCOS CREATOR 3.8.8 · ${APP_VERSION}`, 17, new Color(134, 225, 255, 255), 0, 495, 650, 28);
        eyebrow.isBold = true;
        const title = this.addLabel(this.homeContent, "JIGSAW DROP", 62, Color.WHITE, 0, 422, 680, 84);
        title.isBold = true;
        const subtitle = this.addLabel(this.homeContent, "重力拼合 · 连锁消除 · 写实祝福合辑", 23, new Color(182, 232, 251, 255), 0, 362, 650, 42);
        subtitle.isBold = true;

        const hero = this.createNode("Hero", this.homeContent, 650, 360, 0, 118);
        this.drawRoundedPanel(hero, 650, 360, new Color(15, 64, 105, 238), new Color(111, 226, 255, 155), 36);
        const heroArt = hero.addComponent(Graphics);
        heroArt.fillColor = new Color(255, 191, 134, 210);
        heroArt.roundRect(-278, -114, 205, 270, 24);
        heroArt.fill();
        heroArt.fillColor = new Color(111, 224, 255, 210);
        heroArt.roundRect(-56, -136, 205, 270, 24);
        heroArt.fill();
        heroArt.fillColor = new Color(255, 213, 93, 210);
        heroArt.roundRect(166, -92, 112, 248, 24);
        heroArt.fill();
        this.addLabel(hero, "把散落的画面拼成完整作品", 28, Color.WHITE, 78, 103, 455, 50).isBold = true;
        this.addLabel(hero, "利用重力、拆分与组合制造连锁；祝福模式整局完成后生成可分享合辑。", 19, new Color(212, 241, 252, 255), 86, 29, 430, 98);

        const actions = this.createNode("HomeActions", this.homeContent, 650, 285, 0, -205);
        this.addButton(actions, "写实祝福合辑", 0, 94, 610, 78, () => this.openPackMenu(), {
            fill: new Color(244, 160, 78, 255), stroke: new Color(255, 235, 185, 220), text: new Color(55, 35, 25, 255), fontSize: 27,
        });
        this.addButton(actions, "继续经典闯关", 0, 0, 610, 72, () => void this.startPack(createClassicPack(this.save.classicLevel)), {
            fill: new Color(27, 108, 160, 255), stroke: new Color(119, 228, 255, 180), text: Color.WHITE, fontSize: 25,
        });
        this.addButton(actions, "设置", 0, -88, 292, 62, () => this.openSettings());
        this.addButton(actions, "直升机困难关", 159, -88, 292, 62, () => void this.startPack(BLESSING_PACKS[2]));
        actions.getChildByName("Button-设置")?.setPosition(-159, -88, 0);

        this.homeProgressLabel = this.addLabel(this.homeContent, "", 20, new Color(255, 239, 205, 255), 0, -420, 650, 62);
        this.homeProgressLabel.isBold = true;
        this.homePlatformLabel = this.addLabel(this.homeContent, "", 15, new Color(139, 205, 232, 255), 0, -488, 650, 52);
    }

    private buildGame(): void {
        this.gameTopbar = this.createNode("Topbar", this.gameScreen, 720, 112, 0, 0);
        this.addButton(this.gameTopbar, "‹", -318, 0, 66, 66, () => this.showHome(), { fontSize: 38 });
        this.gameTitleLabel = this.addLabel(this.gameTopbar, "", 31, Color.WHITE, -30, 18, 480, 48);
        this.gameTitleLabel.isBold = true;
        this.gameSubtitleLabel = this.addLabel(this.gameTopbar, "", 17, new Color(159, 225, 249, 255), -30, -25, 480, 30);
        this.addButton(this.gameTopbar, "⚙", 318, 0, 66, 66, () => this.openSettings(), { fontSize: 28 });

        this.deckLayer = this.createNode("DeckLayer", this.gameScreen, 700, 70, 0, 0);
        this.boardNode = this.createNode("Board", this.gameScreen, this.boardWidth, this.boardHeight, 0, 0);
        this.boardGraphics = this.boardNode.addComponent(Graphics);
        this.tileLayer = this.createNode("TileLayer", this.boardNode, this.boardWidth, this.boardHeight, 0, 0);
        this.joinedLayer = this.createNode("JoinedLayer", this.boardNode, this.boardWidth, this.boardHeight, 0, 0);
        this.fxLayer = this.createNode("FxLayer", this.boardNode, this.boardWidth, this.boardHeight, 0, 0);
        this.hintLayer = this.createNode("HintLayer", this.boardNode, this.boardWidth, this.boardHeight, 0, 0);
        const previewNode = this.createNode("DropPreview", this.boardNode, this.boardWidth, this.boardHeight, 0, 0);
        this.dropPreview = previewNode.addComponent(Graphics);

        this.comboLabel = this.addLabel(this.gameScreen, "", 34, new Color(255, 236, 120, 255), 0, 0, 500, 58);
        this.comboLabel.isBold = true;
        this.comboLabel.node.active = false;

        this.flowBar = this.createNode("FlowBar", this.gameScreen, 610, 38, 0, 0);
        const flowBg = this.flowBar.addComponent(Graphics);
        flowBg.fillColor = new Color(5, 27, 57, 230);
        flowBg.roundRect(-305, -19, 610, 38, 19);
        flowBg.fill();
        const flowTrack = this.createNode("Track", this.flowBar, 465, 16, 42, 0);
        this.drawRoundedPanel(flowTrack, 465, 16, new Color(26, 61, 91, 255), new Color(95, 194, 226, 90), 8);
        this.flowFill = this.createNode("Fill", flowTrack, 0, 12, -232, 0);
        this.flowFill.getComponent(UITransform)!.anchorPoint = new Vec2(0, 0.5);
        const fillGraphics = this.flowFill.addComponent(Graphics);
        fillGraphics.fillColor = new Color(153, 244, 110, 255);
        fillGraphics.roundRect(0, -6, 465, 12, 6);
        fillGraphics.fill();
        this.addLabel(this.flowBar, "FLOW", 16, new Color(167, 235, 255, 255), -250, 0, 90, 28).isBold = true;
        this.flowLabel = this.addLabel(this.flowBar, "0%", 15, Color.WHITE, 276, 0, 62, 26);

        this.statusPanel = this.createNode("StatusPanel", this.gameScreen, 690, 82, 0, 0);
        this.drawRoundedPanel(this.statusPanel, 690, 82, new Color(5, 29, 62, 238), new Color(101, 210, 244, 105), 24);
        this.statusLabel = this.addLabel(this.statusPanel, "", 21, Color.WHITE, 0, 17, 650, 32);
        this.statusLabel.isBold = true;
        this.guideLabel = this.addLabel(this.statusPanel, "", 15, new Color(157, 218, 242, 255), 0, -19, 650, 26);

        this.gameBottombar = this.createNode("Bottombar", this.gameScreen, 690, 72, 0, 0);
        this.hintButton = this.addButton(this.gameBottombar, "提示", -250, 0, 150, 62, () => this.showHint());
        this.undoButton = this.addButton(this.gameBottombar, "撤销", -83, 0, 150, 62, () => this.undo());
        this.rescueButton = this.addButton(this.gameBottombar, "整理", 83, 0, 150, 62, () => void this.handleRescue());
        this.rescueButtonLabel = this.rescueButton.getChildByName("Label")!.getComponent(Label)!;
        this.addButton(this.gameBottombar, "重开", 250, 0, 150, 62, () => void this.startPack(this.currentPack));
    }

    private showHome(): void {
        this.cancelDrag();
        this.clearHint();
        this.busy = false;
        this.gameScreen.active = false;
        this.resultScreen.active = false;
        this.packOverlay.active = false;
        this.settingsOverlay.active = false;
        this.homeScreen.active = true;
        this.elapsedBeforePause = 0;
        this.updateHome();
        this.refreshLayout(true);
    }

    private updateHome(): void {
        const unlocked = new Set(this.save.unlocked).size;
        this.homeProgressLabel.string = `经典进度：第 ${this.save.classicLevel} 关   ·   已收集 ${unlocked}/78 张图片`;
        const info = this.platform.getSystemInfo();
        this.homePlatformLabel.string = `运行环境：${this.platform.name} · ${info.model} · ${this.save.fps} FPS · 微信/抖音平台桥已启用`;
    }

    private openPackMenu(): void {
        this.audio.tap();
        this.packOverlay.active = true;
        this.packPanel.removeAllChildren();
        this.drawRoundedPanel(this.packPanel, 690, 1080, new Color(247, 235, 214, 255), new Color(255, 255, 255, 190), 34);
        const close = this.addButton(this.packPanel, "×", 295, 485, 58, 58, () => { this.packOverlay.active = false; }, {
            fill: new Color(100, 68, 53, 220), fontSize: 31,
        });
        close.name = "Close";
        const title = this.addLabel(this.packPanel, "写实祝福合辑", 35, new Color(68, 49, 39, 255), -8, 467, 560, 54);
        title.isBold = true;
        this.addLabel(this.packPanel, "从轻松识别到同题材困难关；整局完成后生成一张可保存、可分享的合辑。", 17, new Color(116, 89, 72, 255), 0, 411, 600, 64);

        BLESSING_PACKS.forEach((pack, index) => {
            const y = 295 - index * 205;
            const card = this.createNode(`Pack-${pack.id}`, this.packPanel, 610, 180, 0, y);
            const accent = hexColor(pack.accent);
            this.drawRoundedPanel(card, 610, 180, new Color(255, 255, 255, 236), new Color(accent.r, accent.g, accent.b, 180), 22);
            const badge = this.createNode("Badge", card, 92, 34, -235, 55);
            this.drawRoundedPanel(badge, 92, 34, accent, new Color(255, 255, 255, 110), 17);
            this.addLabel(badge, pack.difficulty, 14, new Color(48, 36, 31, 255), 0, 0, 82, 25).isBold = true;
            const name = this.addLabel(card, pack.name, 26, new Color(52, 40, 34, 255), 25, 46, 430, 42);
            name.isBold = true;
            this.addLabel(card, pack.subtitle, 16, new Color(120, 92, 75, 255), 25, 6, 430, 34);
            this.addLabel(card, `${pack.imageKeys.length}张图片 · ${pack.grid}×${pack.grid} · 提示${pack.hints}次`, 14, new Color(171, 91, 55, 255), 25, -35, 430, 30);
            this.addButton(card, "开始", 235, -48, 105, 50, () => {
                this.packOverlay.active = false;
                void this.startPack(pack);
            }, { fill: accent, text: new Color(52, 38, 31, 255), fontSize: 18 });
        });
        this.refreshLayout(true);
    }

    private openSettings(): void {
        this.audio.tap();
        this.settingsOverlay.active = true;
        this.settingsPanel.removeAllChildren();
        this.drawRoundedPanel(this.settingsPanel, 640, 680, new Color(18, 49, 77, 252), new Color(115, 224, 255, 170), 32);
        const title = this.addLabel(this.settingsPanel, "设置", 38, Color.WHITE, 0, 265, 500, 58);
        title.isBold = true;
        this.addButton(this.settingsPanel, "×", 268, 274, 58, 58, () => { this.settingsOverlay.active = false; }, { fontSize: 31 });
        this.addSettingToggle("音效", this.save.sound, 150, (value) => {
            this.save.sound = value;
            this.audio.setEnabled(value);
            this.persist();
        });
        this.addSettingToggle("震动", this.save.vibration, 55, (value) => {
            this.save.vibration = value;
            this.persist();
            if (value) this.haptic("light");
        });
        this.addSettingToggle("60 FPS", this.save.fps === 60, -40, (value) => {
            this.save.fps = value ? 60 : 45;
            this.platform.setPreferredFPS(this.save.fps);
            this.persist();
        });
        this.addLabel(this.settingsPanel, "竖屏自适应、安全区、后台暂停、微信与抖音生命周期均由平台层统一处理。", 17, new Color(168, 221, 242, 255), 0, -155, 540, 72);
        this.addButton(this.settingsPanel, "关闭", 0, -260, 260, 60, () => { this.settingsOverlay.active = false; });
        this.refreshLayout(true);
    }

    private addSettingToggle(name: string, enabled: boolean, y: number, callback: (enabled: boolean) => void): void {
        const row = this.createNode(`Setting-${name}`, this.settingsPanel, 520, 72, 0, y);
        this.addLabel(row, name, 23, Color.WHITE, -165, 0, 220, 50).isBold = true;
        let state = enabled;
        const button = this.addButton(row, state ? "已开启" : "已关闭", 165, 0, 170, 54, () => {
            state = !state;
            const label = button.getChildByName("Label")?.getComponent(Label);
            if (label) label.string = state ? "已开启" : "已关闭";
            this.paintButton(button, state ? new Color(83, 201, 136, 255) : new Color(72, 92, 110, 255), new Color(255, 255, 255, 120));
            callback(state);
        }, { fill: state ? new Color(83, 201, 136, 255) : new Color(72, 92, 110, 255), fontSize: 18 });
    }

    private async startPack(pack: PackDefinition): Promise<void> {
        if (this.busy) return;
        this.busy = true;
        this.cancelDrag();
        this.clearHint();
        this.currentPack = pack;
        this.homeScreen.active = false;
        this.packOverlay.active = false;
        this.settingsOverlay.active = false;
        this.resultScreen.active = false;
        this.gameScreen.active = true;
        this.gameTitleLabel.string = pack.name;
        this.gameSubtitleLabel.string = `${pack.difficulty} · ${pack.subtitle}`;
        this.completedImages = [];
        this.moves = 0;
        this.turnChain = 0;
        this.maxChain = 0;
        this.streakCombo = 0;
        this.streakGrace = 0;
        this.flow = pack.startFlow;
        this.feverTurns = 0;
        this.hints = pack.hints;
        this.rescues = pack.rescues;
        this.needsRescue = false;
        this.undoState = null;
        this.elapsedBeforePause = 0;
        this.gameStartedAt = Date.now();
        this.pausedAt = 0;
        this.currentResultCapture = "";
        this.showToast(`正在载入「${pack.name}」…`, 1500);

        try {
            await this.loadPackPictures(pack);
            this.core.reset(pack.imageKeys, pack.grid, pack.seed, {
                fastStart: pack.fastStart,
                maxDealPerColumn: pack.maxDealPerColumn,
                chainDepth: pack.difficultyKey === "expert" ? 3 : 0,
            });
            this.clearTileNodes();
            this.configureBoard(pack.grid);
            this.drawBoard();
            this.syncTiles(false);
            this.drawDecks();
            this.updateStatus();
            this.busy = false;
            this.refreshLayout(true);
            this.showToast(`${pack.name} · ${pack.imageKeys.length}张图片`, 1300);
        } catch (error) {
            console.error("[JigsawDrop] pack load failed", error);
            this.busy = false;
            this.showToast("资源载入失败，请返回后重试", 3000);
        }
    }

    private async loadPackPictures(pack: PackDefinition): Promise<void> {
        const bundles = requiredBundles(pack);
        this.releasePictureResources(bundles);
        await Promise.all(bundles.map((name) => this.loadBundle(name)));
        await Promise.all(pack.imageKeys.map((key) => this.loadPicture(key)));
    }

    private loadBundle(name: string): Promise<any> {
        const cached = this.loadedBundles.get(name) ?? assetManager.getBundle(name);
        if (cached) {
            this.loadedBundles.set(name, cached);
            return Promise.resolve(cached);
        }
        return new Promise((resolve, reject) => {
            assetManager.loadBundle(name, (error, bundle) => {
                if (error || !bundle) { reject(error ?? new Error(`bundle load failed: ${name}`)); return; }
                this.loadedBundles.set(name, bundle);
                resolve(bundle);
            });
        });
    }

    private async loadPicture(key: string): Promise<void> {
        if (this.baseFrames.has(key)) return;
        const definition = PICTURE_BY_KEY.get(key);
        if (!definition) throw new Error(`picture config missing: ${key}`);
        const bundle = await this.loadBundle(definition.bundle);
        const image = await new Promise<ImageAsset>((resolve, reject) => {
            bundle.load(definition.path, ImageAsset, (error: Error | null, asset: ImageAsset) => {
                if (error || !asset) { reject(error ?? new Error(`picture load failed: ${key}`)); return; }
                resolve(asset);
            });
        });
        const base = SpriteFrame.createWithImage(image);
        base.packable = false;
        this.baseFrames.set(key, base);
        this.pieceFrames.set(key, [0, 1, 2, 3].map((quadrant) => this.makePieceFrame(base, quadrant)));
    }

    private releasePictureResources(keepBundles: string[]): void {
        const keep = new Set(keepBundles);
        for (const [key, frame] of this.baseFrames) {
            const definition = PICTURE_BY_KEY.get(key);
            if (definition && keep.has(definition.bundle)) continue;
            frame.destroy();
            this.baseFrames.delete(key);
            const pieces = this.pieceFrames.get(key) ?? [];
            pieces.forEach((piece) => piece.destroy());
            this.pieceFrames.delete(key);
        }
        for (const [name, bundle] of this.loadedBundles) {
            if (keep.has(name)) continue;
            try { bundle.releaseAll(); assetManager.removeBundle(bundle); } catch (_) { /* editor may retain bundle */ }
            this.loadedBundles.delete(name);
        }
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

    private configureBoard(grid: number): void {
        const v = this.viewport;
        const topbarBottom = v.safeHeight / 2 - 118;
        const deckReserve = 82;
        const bottomReserve = 188;
        const availableHeight = Math.max(580, topbarBottom + v.safeHeight / 2 - bottomReserve - deckReserve);
        const maxWidth = Math.min(v.safeWidth - 22, 724);
        this.tileWidth = Math.floor(Math.min(maxWidth / grid, availableHeight / (grid / TILE_ASPECT)));
        this.tileHeight = this.tileWidth / TILE_ASPECT;
        this.boardWidth = this.tileWidth * grid;
        this.boardHeight = this.tileHeight * grid;
        [this.boardNode, this.tileLayer, this.joinedLayer, this.fxLayer, this.hintLayer, this.dropPreview.node].forEach((node) => {
            node.getComponent(UITransform)?.setContentSize(this.boardWidth, this.boardHeight);
        });
        for (const node of this.tileNodes.values()) this.resizeTileNode(node);
    }

    private drawBoard(): void {
        const g = this.boardGraphics;
        g.clear();
        g.fillColor = new Color(3, 19, 43, 248);
        g.roundRect(-this.boardWidth / 2 - 7, -this.boardHeight / 2 - 7, this.boardWidth + 14, this.boardHeight + 14, 17);
        g.fill();
        g.strokeColor = new Color(113, 224, 255, 180);
        g.lineWidth = 2;
        g.roundRect(-this.boardWidth / 2 - 7, -this.boardHeight / 2 - 7, this.boardWidth + 14, this.boardHeight + 14, 17);
        g.stroke();
        g.strokeColor = new Color(33, 75, 112, 145);
        g.lineWidth = 1;
        for (let row = 1; row < this.core.grid; row += 1) {
            const y = this.boardHeight / 2 - row * this.tileHeight;
            g.moveTo(-this.boardWidth / 2, y); g.lineTo(this.boardWidth / 2, y);
        }
        for (let column = 1; column < this.core.grid; column += 1) {
            const x = -this.boardWidth / 2 + column * this.tileWidth;
            g.moveTo(x, -this.boardHeight / 2); g.lineTo(x, this.boardHeight / 2);
        }
        g.stroke();
    }

    private syncTiles(animate: boolean): void {
        const active = new Set(this.core.board.filter((id): id is string => Boolean(id)));
        for (const [id, node] of this.tileNodes) node.active = active.has(id);
        this.core.board.forEach((id, cell) => {
            if (!id) return;
            const node = this.ensureTileNode(id);
            node.active = true;
            this.resizeTileNode(node);
            const target = this.positionForCell(cell);
            Tween.stopAllByTarget(node);
            if (animate) tween(node).to(0.18 * this.speedFactor(), { position: target }, { easing: "quadOut" }).start();
            else node.setPosition(target);
            this.drawTileFrame(id);
        });
        if (!animate && !this.drag) this.rebuildJoinedSurfaces();
    }

    private ensureTileNode(id: string): Node {
        const existing = this.tileNodes.get(id);
        if (existing) return existing;
        const tile = this.core.tiles.get(id)!;
        const node = this.createNode(`Tile-${id}`, this.tileLayer, this.tileWidth, this.tileHeight, 0, 0);
        node.addComponent(UIOpacity).opacity = 255;
        const imageNode = this.createNode("Image", node, this.tileWidth + 1, this.tileHeight + 1, 0, 0);
        const sprite = imageNode.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = this.pieceFrames.get(tile.imageKey)![tile.quadrant];
        const frameNode = this.createNode("Frame", node, this.tileWidth, this.tileHeight, 0, 0);
        frameNode.addComponent(Graphics);
        node.on(Node.EventType.TOUCH_START, (event: EventTouch) => this.onTouchStart(id, event), this);
        node.on(Node.EventType.TOUCH_MOVE, (event: EventTouch) => this.onTouchMove(id, event), this);
        node.on(Node.EventType.TOUCH_END, (event: EventTouch) => void this.onTouchEnd(id, event), this);
        node.on(Node.EventType.TOUCH_CANCEL, (event: EventTouch) => void this.onTouchCancel(id, event), this);
        this.tileNodes.set(id, node);
        return node;
    }

    private resizeTileNode(node: Node): void {
        node.getComponent(UITransform)?.setContentSize(this.tileWidth, this.tileHeight);
        const image = node.getChildByName("Image");
        image?.getComponent(UITransform)?.setContentSize(this.tileWidth + 1, this.tileHeight + 1);
        const frame = node.getChildByName("Frame");
        frame?.getComponent(UITransform)?.setContentSize(this.tileWidth, this.tileHeight);
    }

    private drawTileFrame(id: string): void {
        const node = this.tileNodes.get(id);
        const graphics = node?.getChildByName("Frame")?.getComponent(Graphics);
        if (!graphics) return;
        const mask = this.core.connectionMask(id);
        const w = this.tileWidth;
        const h = this.tileHeight;
        graphics.clear();
        graphics.lineWidth = this.core.grid === 5 ? 2.2 : 2.7;
        graphics.strokeColor = new Color(242, 249, 255, 232);
        if (!mask.left) { graphics.moveTo(-w / 2 + 1, -h / 2); graphics.lineTo(-w / 2 + 1, h / 2); }
        if (!mask.right) { graphics.moveTo(w / 2 - 1, -h / 2); graphics.lineTo(w / 2 - 1, h / 2); }
        if (!mask.up) { graphics.moveTo(-w / 2, h / 2 - 1); graphics.lineTo(w / 2, h / 2 - 1); }
        if (!mask.down) { graphics.moveTo(-w / 2, -h / 2 + 1); graphics.lineTo(w / 2, -h / 2 + 1); }
        graphics.stroke();
        graphics.lineWidth = 0.8;
        graphics.strokeColor = new Color(8, 30, 59, 175);
        if (!mask.left) { graphics.moveTo(-w / 2 + 3, -h / 2); graphics.lineTo(-w / 2 + 3, h / 2); }
        if (!mask.right) { graphics.moveTo(w / 2 - 3, -h / 2); graphics.lineTo(w / 2 - 3, h / 2); }
        if (!mask.up) { graphics.moveTo(-w / 2, h / 2 - 3); graphics.lineTo(w / 2, h / 2 - 3); }
        if (!mask.down) { graphics.moveTo(-w / 2, -h / 2 + 3); graphics.lineTo(w / 2, -h / 2 + 3); }
        graphics.stroke();
    }

    private rebuildJoinedSurfaces(): void {
        this.clearJoinedSurfaces();
        for (const node of this.tileNodes.values()) {
            const image = node.getChildByName("Image");
            if (image) image.active = node.active;
        }
        const groups = this.core.computeGroups().filter((group) => group.ids.length > 1);
        for (const group of groups) {
            const firstId = group.ids[0];
            const firstTile = this.core.tiles.get(firstId)!;
            const firstCell = this.core.cellForTile(firstId);
            const rc = this.core.cellToRC(firstCell);
            const quadrantRow = Math.floor(firstTile.quadrant / 2);
            const quadrantColumn = firstTile.quadrant % 2;
            const originRow = rc.r - quadrantRow;
            const originColumn = rc.c - quadrantColumn;

            const surface = this.createNode(`Joined-${group.imageKey}-${group.cells.join("-")}`, this.joinedLayer, this.boardWidth, this.boardHeight, 0, 0);
            const mask = surface.addComponent(Mask);
            mask.type = Mask.Type.GRAPHICS_STENCIL;
            const stencil = surface.getComponent(Graphics) ?? surface.addComponent(Graphics);
            stencil.clear();
            stencil.fillColor = Color.WHITE;
            for (const cell of group.cells) {
                const position = this.positionForCell(cell);
                stencil.rect(position.x - this.tileWidth / 2 - 0.75, position.y - this.tileHeight / 2 - 0.75, this.tileWidth + 1.5, this.tileHeight + 1.5);
            }
            stencil.fill();
            const image = this.createNode("FullImage", surface, this.tileWidth * 2 + 1, this.tileHeight * 2 + 1,
                -this.boardWidth / 2 + this.tileWidth * (originColumn + 1),
                this.boardHeight / 2 - this.tileHeight * (originRow + 1));
            const sprite = image.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.baseFrames.get(group.imageKey)!;
            this.joinedSurfaces.push(surface);
            group.ids.forEach((id) => {
                const tileNode = this.tileNodes.get(id);
                const tileImage = tileNode?.getChildByName("Image");
                if (tileImage) tileImage.active = false;
            });
        }
    }

    private clearJoinedSurfaces(): void {
        this.joinedSurfaces.forEach((node) => node.destroy());
        this.joinedSurfaces = [];
        for (const node of this.tileNodes.values()) {
            const image = node.getChildByName("Image");
            if (image) image.active = node.active;
        }
    }

    private onTouchStart(id: string, event: EventTouch): void {
        if (this.busy || !this.gameScreen.active || !this.tileNodes.get(id)?.active) return;
        const touchId = Number((event as any).getID?.() ?? 0);
        if (this.drag && this.drag.touchId !== touchId) return;
        const sourceCell = this.core.cellForTile(id);
        const group = this.core.groupForTile(id);
        if (sourceCell < 0 || !group) return;
        this.clearHint();
        this.clearJoinedSurfaces();
        const startPoint = this.touchInBoard(event);
        const startPositions = new Map<string, Vec3>();
        group.ids.forEach((tileId) => {
            const node = this.tileNodes.get(tileId);
            if (node) {
                startPositions.set(tileId, node.position.clone());
                node.setSiblingIndex(this.tileLayer.children.length - 1);
                node.setScale(1.018, 1.018, 1);
            }
        });
        const drag: DragState = {
            touchId,
            tileId: id,
            sourceCell,
            group,
            split: false,
            moved: false,
            startPoint,
            startPositions,
            holdTimer: null,
            previewDr: 0,
            previewDc: 0,
            preview: null,
        };
        if (group.ids.length > 1) {
            drag.holdTimer = setTimeout(() => {
                if (this.drag !== drag || drag.moved) return;
                const single = this.core.groupForTile(id, true);
                if (!single) return;
                drag.group.ids.forEach((tileId) => this.tileNodes.get(tileId)?.setScale(1, 1, 1));
                drag.group = single;
                drag.split = true;
                drag.startPositions.clear();
                const node = this.tileNodes.get(id);
                if (node) {
                    drag.startPositions.set(id, node.position.clone());
                    node.setScale(1.035, 1.035, 1);
                }
                this.guideLabel.string = "已拆成单块：继续拖动即可";
                this.audio.merge(2);
                this.haptic("light");
            }, 330);
        }
        this.drag = drag;
    }

    private onTouchMove(id: string, event: EventTouch): void {
        const drag = this.drag;
        const touchId = Number((event as any).getID?.() ?? 0);
        if (!drag || drag.tileId !== id || drag.touchId !== touchId) return;
        const point = this.touchInBoard(event);
        const dx = point.x - drag.startPoint.x;
        const dy = point.y - drag.startPoint.y;
        if (Math.hypot(dx, dy) > Math.max(7, this.tileWidth * 0.045)) {
            drag.moved = true;
            if (drag.holdTimer) { clearTimeout(drag.holdTimer); drag.holdTimer = null; }
        }
        drag.group.ids.forEach((tileId) => {
            const node = this.tileNodes.get(tileId);
            const origin = drag.startPositions.get(tileId);
            if (node && origin) node.setPosition(origin.x + dx, origin.y + dy, 0);
        });
        const targetCell = this.cellAtPoint(point);
        if (targetCell < 0) {
            drag.preview = null;
            this.drawDropPreview(null);
            return;
        }
        const source = this.core.cellToRC(drag.sourceCell);
        const target = this.core.cellToRC(targetCell);
        const dr = target.r - source.r;
        const dc = target.c - source.c;
        if (dr === drag.previewDr && dc === drag.previewDc && drag.preview) return;
        drag.previewDr = dr;
        drag.previewDc = dc;
        drag.preview = this.core.validateMove(drag.group, dr, dc);
        this.drawDropPreview(drag.preview);
    }

    private async onTouchEnd(id: string, event: EventTouch): Promise<void> {
        const drag = this.drag;
        const touchId = Number((event as any).getID?.() ?? 0);
        if (!drag || drag.tileId !== id || drag.touchId !== touchId) return;
        this.drag = null;
        if (drag.holdTimer) clearTimeout(drag.holdTimer);
        drag.group.ids.forEach((tileId) => this.tileNodes.get(tileId)?.setScale(1, 1, 1));
        this.drawDropPreview(null);
        if (!drag.moved) {
            this.syncTiles(false);
            return;
        }
        const result = drag.preview ?? this.core.validateMove(drag.group, drag.previewDr, drag.previewDc);
        if (!result.valid) {
            this.audio.invalid();
            this.haptic("light");
            this.showToast("这个位置放不下当前组合", 1300);
            await this.animateBoard(0.16);
            return;
        }
        await this.commitMove(drag.group, drag.previewDr, drag.previewDc, result);
    }

    private onTouchCancel(id: string, event: EventTouch): void {
        const drag = this.drag;
        const touchId = Number((event as any).getID?.() ?? 0);
        if (!drag || drag.tileId !== id || drag.touchId !== touchId) return;
        this.cancelDrag();
        this.syncTiles(true);
    }

    private cancelDrag(): void {
        if (!this.drag) return;
        if (this.drag.holdTimer) clearTimeout(this.drag.holdTimer);
        this.drag.group.ids.forEach((id) => this.tileNodes.get(id)?.setScale(1, 1, 1));
        this.drag = null;
        this.drawDropPreview(null);
    }

    private async commitMove(group: PuzzleGroup, dr: number, dc: number, prepared?: MoveResult): Promise<void> {
        if (this.busy) return;
        const result = prepared ?? this.core.validateMove(group, dr, dc);
        if (!result.valid) return;
        const beforeConnections = this.connectionSet();
        this.undoState = this.captureUndo();
        this.core.board = result.board;
        this.moves += 1;
        this.busy = true;
        this.audio.tap();
        this.haptic("light");
        await this.animateBoard(0.17);
        await this.resolveBoard(beforeConnections, true);
        if (!this.resultScreen.active) this.busy = false;
        this.updateStatus();
    }

    private async resolveBoard(beforeConnections: Set<string>, playerMove: boolean): Promise<void> {
        if (playerMove) this.turnChain = 0;
        let baseline = beforeConnections;
        let guard = 0;
        while (guard++ < 128) {
            const beforeGravity = this.connectionSet();
            const gravity = this.core.settleGravity();
            if (gravity.length > 0) {
                this.clearJoinedSurfaces();
                const maxDistance = Math.max(1, ...gravity.flatMap((step) => step.ids.map((id) => {
                    const from = step.from.get(id) ?? 0;
                    const to = step.to.get(id) ?? from;
                    return Math.abs(this.core.cellToRC(to).r - this.core.cellToRC(from).r);
                })));
                await this.animateBoard(clamp(0.12 + maxDistance * 0.035, 0.15, 0.34));
                this.audio.drop(maxDistance);
                baseline = beforeGravity;
                continue;
            }

            const afterConnections = this.connectionSet();
            const newIds = new Set<string>();
            for (const edge of afterConnections) {
                if (baseline.has(edge)) continue;
                edge.split("|").forEach((id) => newIds.add(id));
            }
            if (newIds.size > 0) {
                const stage = Math.max(2, ...this.core.computeGroups().filter((group) => group.ids.some((id) => newIds.has(id))).map((group) => group.ids.length));
                await this.animateMerge([...newIds], stage);
                this.audio.merge(stage);
                this.haptic(stage >= 3 ? "medium" : "light");
                baseline = afterConnections;
            }

            const complete = this.core.completeGroups();
            if (complete.length > 0) {
                this.turnChain += 1;
                this.maxChain = Math.max(this.maxChain, this.turnChain);
                this.streakCombo = this.streakGrace > 0 ? this.streakCombo + complete.length : Math.max(1, complete.length);
                this.streakGrace = this.feverTurns > 0 ? 3 : 2;
                await this.animateComplete(complete, this.turnChain);
                const images = this.core.clearGroups(complete);
                this.completedImages.push(...images);
                images.forEach((key) => {
                    if (!this.save.unlocked.includes(key)) this.save.unlocked.push(key);
                });
                const gain = (12 * images.length + Math.max(0, this.turnChain - 1) * 9) * this.currentPack.flowGain;
                this.addFlow(gain);
                this.audio.clear(this.turnChain);
                this.haptic(this.turnChain >= 3 ? "heavy" : "medium");
                baseline = new Set<string>();
                this.updateStatus();
                continue;
            }

            const dealt = this.core.dealWave();
            if (dealt.length > 0) {
                this.clearJoinedSurfaces();
                this.syncTiles(false);
                dealt.forEach((placement) => {
                    const node = this.tileNodes.get(placement.id);
                    if (node) node.setPosition(this.positionForCell(placement.cell).add3f(0, 80, 0));
                });
                await this.animateBoard(0.18);
                this.drawDecks();
                baseline = this.connectionSet();
                continue;
            }
            break;
        }

        this.syncTiles(false);
        this.drawDecks();
        if (this.core.remainingCount() === 0) {
            await this.showWin();
            return;
        }
        this.needsRescue = this.core.isDeadlocked();
        if (this.needsRescue) this.showToast("当前局面需要整理，点击闪烁的“整理”按钮", 3000);
        if (playerMove) {
            if (this.turnChain === 0) {
                this.streakGrace = Math.max(0, this.streakGrace - 1);
                if (this.streakGrace === 0) this.streakCombo = 0;
            }
            if (this.feverTurns > 0) this.feverTurns -= 1;
        }
        this.persist();
        this.updateStatus();
    }

    private addFlow(amount: number): void {
        if (this.feverTurns > 0) return;
        this.flow = Math.min(100, this.flow + amount);
        if (this.flow >= 100) {
            this.flow = 100;
            this.feverTurns = 3;
            this.audio.fever();
            this.showToast("FLOW FEVER · 接下来3步连锁加速", 2200);
            this.showComboText("FLOW FEVER", 44, new Color(255, 231, 91, 255));
            this.haptic("heavy");
        }
    }

    private speedFactor(): number {
        const fever = this.feverTurns > 0 ? 0.76 : 1;
        const chain = Math.max(0.58, 1 - Math.max(0, this.turnChain - 1) * 0.08);
        return fever * chain;
    }

    private connectionSet(): Set<string> {
        const edges = new Set<string>();
        for (const group of this.core.computeGroups()) {
            if (group.ids.length < 2) continue;
            const cells = new Map(group.cells.map((cell, index) => [cell, group.ids[index]]));
            for (const [cell, id] of cells) {
                const rc = this.core.cellToRC(cell);
                if (rc.c < this.core.grid - 1 && cells.has(cell + 1)) edges.add([id, cells.get(cell + 1)!].sort().join("|"));
                if (rc.r < this.core.grid - 1 && cells.has(cell + this.core.grid)) edges.add([id, cells.get(cell + this.core.grid)!].sort().join("|"));
            }
        }
        return edges;
    }

    private animateBoard(duration: number): Promise<void> {
        const jobs: Promise<void>[] = [];
        const seconds = duration * this.speedFactor();
        this.core.board.forEach((id, cell) => {
            if (!id) return;
            const node = this.ensureTileNode(id);
            const target = this.positionForCell(cell);
            Tween.stopAllByTarget(node);
            jobs.push(new Promise((resolve) => {
                tween(node).to(seconds, { position: target }, { easing: "quadOut" }).call(() => resolve()).start();
            }));
        });
        return Promise.all(jobs).then(() => this.syncTiles(false));
    }

    private async animateMerge(ids: string[], stage: number): Promise<void> {
        this.clearJoinedSurfaces();
        ids.forEach((id) => {
            const node = this.tileNodes.get(id);
            if (!node) return;
            tween(node).to(0.09, { scale: new Vec3(1.045, 1.045, 1) }).to(0.10, { scale: Vec3.ONE }).start();
        });
        const centers = ids.map((id) => this.tileNodes.get(id)?.position).filter((value): value is Vec3 => Boolean(value));
        if (centers.length) {
            const center = centers.reduce((sum, value) => sum.add(value.clone()), new Vec3()).multiplyScalar(1 / centers.length);
            this.spawnBurst(center, 8 + stage * 4, new Color(126, 233, 255, 255));
        }
        await this.delay(180 * this.speedFactor());
        this.syncTiles(false);
    }

    private async animateComplete(groups: PuzzleGroup[], chain: number): Promise<void> {
        this.clearJoinedSurfaces();
        const overlays: Node[] = [];
        for (const group of groups) {
            const firstId = group.ids[0];
            const firstTile = this.core.tiles.get(firstId)!;
            const firstCell = this.core.cellForTile(firstId);
            const rc = this.core.cellToRC(firstCell);
            const originRow = rc.r - Math.floor(firstTile.quadrant / 2);
            const originColumn = rc.c - firstTile.quadrant % 2;
            const center = new Vec3(
                -this.boardWidth / 2 + this.tileWidth * (originColumn + 1),
                this.boardHeight / 2 - this.tileHeight * (originRow + 1),
                0,
            );
            const overlay = this.createNode(`Complete-${group.imageKey}`, this.fxLayer, this.tileWidth * 2, this.tileHeight * 2, center.x, center.y);
            const opacity = overlay.addComponent(UIOpacity);
            const sprite = overlay.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.baseFrames.get(group.imageKey)!;
            group.ids.forEach((id) => {
                const node = this.tileNodes.get(id);
                if (node) node.active = false;
            });
            overlay.setScale(0.96, 0.96, 1);
            tween(overlay).to(0.13 * this.speedFactor(), { scale: new Vec3(1.055, 1.055, 1) }, { easing: "backOut" }).start();
            tween(opacity).delay(0.19 * this.speedFactor()).to(0.18 * this.speedFactor(), { opacity: 0 }).start();
            this.spawnBurst(center, 18 + Math.min(24, chain * 6), chain >= 3 ? new Color(255, 226, 91, 255) : new Color(255, 183, 112, 255));
            overlays.push(overlay);
        }
        this.showComboText(chain > 1 ? `CHAIN ×${chain}` : "完成！", chain > 2 ? 46 : 36, chain > 2 ? new Color(255, 231, 86, 255) : new Color(255, 255, 255, 255));
        tween(this.boardNode).to(0.065, { scale: new Vec3(1.012, 1.012, 1) }).to(0.09, { scale: Vec3.ONE }).start();
        await this.delay((chain >= 3 ? 320 : 390) * this.speedFactor());
        overlays.forEach((node) => node.destroy());
    }

    private spawnBurst(center: Vec3, count: number, color: Color): void {
        const amount = Math.min(42, count);
        for (let index = 0; index < amount; index += 1) {
            const angle = (Math.PI * 2 * index / amount) + Math.random() * 0.2;
            const distance = 45 + Math.random() * 105;
            const particle = this.createNode("Particle", this.fxLayer, 12, 12, center.x, center.y);
            const graphics = particle.addComponent(Graphics);
            graphics.fillColor = new Color(color.r, color.g, color.b, 240);
            graphics.circle(0, 0, 3 + Math.random() * 4);
            graphics.fill();
            const opacity = particle.addComponent(UIOpacity);
            tween(particle).to(0.35 * this.speedFactor(), {
                position: new Vec3(center.x + Math.cos(angle) * distance, center.y + Math.sin(angle) * distance, 0),
                scale: new Vec3(0.2, 0.2, 1),
            }, { easing: "quadOut" }).call(() => particle.destroy()).start();
            tween(opacity).to(0.34 * this.speedFactor(), { opacity: 0 }).start();
        }
    }

    private showComboText(text: string, size: number, color: Color): void {
        this.comboLabel.string = text;
        this.comboLabel.fontSize = size;
        this.comboLabel.color = color;
        this.comboLabel.node.active = true;
        this.comboLabel.node.setScale(0.7, 0.7, 1);
        const opacity = this.comboLabel.node.getComponent(UIOpacity) ?? this.comboLabel.node.addComponent(UIOpacity);
        opacity.opacity = 255;
        Tween.stopAllByTarget(this.comboLabel.node);
        Tween.stopAllByTarget(opacity);
        tween(this.comboLabel.node).to(0.15, { scale: new Vec3(1.08, 1.08, 1) }, { easing: "backOut" }).to(0.16, { scale: Vec3.ONE }).start();
        tween(opacity).delay(0.55).to(0.24, { opacity: 0 }).call(() => { this.comboLabel.node.active = false; }).start();
    }

    private showHint(): void {
        if (this.busy || !this.gameScreen.active) return;
        this.audio.tap();
        if (this.hints <= 0) { this.showToast("本关提示次数已经用完", 1600); return; }
        const move = this.core.findHelpfulMove();
        if (!move) {
            if (this.core.isDeadlocked()) {
                this.needsRescue = true;
                this.showToast("关键碎片暂时无法推进，请点击“整理”解锁", 2400);
            } else this.showToast("先观察同一张图的颜色和边缘方向", 1900);
            this.updateStatus();
            return;
        }
        this.hints -= 1;
        this.drawHint(move);
        this.updateStatus();
    }

    private drawHint(move: HelpfulMove): void {
        this.clearHint();
        this.clearJoinedSurfaces();
        for (const [id, node] of this.tileNodes) {
            const tile = this.core.tiles.get(id);
            const opacity = node.getComponent(UIOpacity)!;
            opacity.opacity = tile?.imageKey === move.imageKey ? 255 : 92;
        }
        move.group.ids.forEach((id) => {
            const node = this.tileNodes.get(id);
            if (node) tween(node).to(0.14, { scale: new Vec3(1.06, 1.06, 1) }).to(0.14, { scale: Vec3.ONE }).union().repeat(4).start();
        });

        const preview = this.createNode("HintPreview", this.hintLayer, 132, 176, -this.boardWidth / 2 + 78, this.boardHeight / 2 - 98);
        const sprite = preview.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = this.baseFrames.get(move.imageKey)!;
        const frame = preview.addComponent(Graphics);
        frame.strokeColor = new Color(255, 238, 112, 255);
        frame.lineWidth = 4;
        frame.roundRect(-66, -88, 132, 176, 12);
        frame.stroke();
        this.hintNodes.push(preview);

        const targetGraphicsNode = this.createNode("HintTargets", this.hintLayer, this.boardWidth, this.boardHeight, 0, 0);
        const g = targetGraphicsNode.addComponent(Graphics);
        g.fillColor = new Color(255, 230, 75, 48);
        g.strokeColor = new Color(255, 232, 89, 245);
        g.lineWidth = 4;
        move.targetCells.forEach((cell) => {
            const p = this.positionForCell(cell);
            g.rect(p.x - this.tileWidth / 2 + 2, p.y - this.tileHeight / 2 + 2, this.tileWidth - 4, this.tileHeight - 4);
            g.fill(); g.stroke();
        });
        this.hintNodes.push(targetGraphicsNode);

        const sourceCenter = this.averagePosition(move.group.cells);
        const targetCenter = this.averagePosition(move.targetCells);
        const arrowNode = this.createNode("HintArrow", this.hintLayer, this.boardWidth, this.boardHeight, 0, 0);
        const arrow = arrowNode.addComponent(Graphics);
        arrow.strokeColor = new Color(255, 239, 108, 255);
        arrow.fillColor = new Color(255, 239, 108, 255);
        arrow.lineWidth = 7;
        arrow.moveTo(sourceCenter.x, sourceCenter.y);
        arrow.lineTo(targetCenter.x, targetCenter.y);
        arrow.stroke();
        const angle = Math.atan2(targetCenter.y - sourceCenter.y, targetCenter.x - sourceCenter.x);
        arrow.moveTo(targetCenter.x, targetCenter.y);
        arrow.lineTo(targetCenter.x - Math.cos(angle - 0.55) * 24, targetCenter.y - Math.sin(angle - 0.55) * 24);
        arrow.lineTo(targetCenter.x - Math.cos(angle + 0.55) * 24, targetCenter.y - Math.sin(angle + 0.55) * 24);
        arrow.close(); arrow.fill();
        this.hintNodes.push(arrowNode);
        const pictureName = PICTURE_BY_KEY.get(move.imageKey)?.name ?? "目标图片";
        this.guideLabel.string = `${move.split ? "长按拆出发光单块" : "拖动发光组合"}，拼成「${pictureName}」`;
        setTimeout(() => this.clearHint(), 4200);
    }

    private clearHint(): void {
        this.hintNodes.forEach((node) => node.destroy());
        this.hintNodes = [];
        for (const node of this.tileNodes.values()) {
            const opacity = node.getComponent(UIOpacity);
            if (opacity) opacity.opacity = 255;
            Tween.stopAllByTarget(node);
            node.setScale(1, 1, 1);
        }
        if (!this.drag) this.rebuildJoinedSurfaces();
    }

    private async handleRescue(): Promise<void> {
        if (this.busy) return;
        this.audio.tap();
        if (this.core.isDeadlocked() || this.needsRescue) {
            this.undoState = this.captureUndo();
            const result = this.core.rescue();
            if (!result.changed) { this.showToast("当前局面暂时不需要整理", 1500); return; }
            this.needsRescue = false;
            this.busy = true;
            await this.animateBoard(0.24);
            this.busy = false;
            this.showToast("已整理出一条可继续的路径", 1900);
            this.haptic("medium");
            this.updateStatus();
            return;
        }
        if (this.rescues <= 0) { this.showToast("自动整理次数已经用完", 1600); return; }
        const move = this.core.findHelpfulMove();
        if (!move) { this.showToast("暂时没有更好的整理动作", 1600); return; }
        this.rescues -= 1;
        this.drawHint(move);
        await this.delay(480);
        this.clearHint();
        await this.commitMove(move.group, move.dr, move.dc, { valid: true, board: move.board, targetCells: move.targetCells });
    }

    private captureUndo(): UndoState {
        return {
            core: this.core.makeSnapshot(),
            completedImages: this.completedImages.slice(),
            moves: this.moves,
            elapsed: this.currentElapsed(),
            flow: this.flow,
            feverTurns: this.feverTurns,
            streakCombo: this.streakCombo,
            streakGrace: this.streakGrace,
            maxChain: this.maxChain,
            hints: this.hints,
            rescues: this.rescues,
        };
    }

    private undo(): void {
        if (this.busy || !this.undoState) { this.showToast("暂无可撤销的操作", 1200); return; }
        this.audio.tap();
        const state = this.undoState;
        this.undoState = null;
        this.core.restoreSnapshot(state.core);
        this.completedImages = state.completedImages.slice();
        this.moves = state.moves;
        this.elapsedBeforePause = state.elapsed;
        this.gameStartedAt = Date.now();
        this.flow = state.flow;
        this.feverTurns = state.feverTurns;
        this.streakCombo = state.streakCombo;
        this.streakGrace = state.streakGrace;
        this.maxChain = state.maxChain;
        this.hints = state.hints;
        this.rescues = state.rescues;
        this.needsRescue = false;
        this.clearTileNodes();
        this.syncTiles(false);
        this.drawDecks();
        this.updateStatus();
        this.showToast("已撤销上一步", 1200);
        this.haptic("light");
    }

    private async showWin(): Promise<void> {
        this.busy = true;
        this.audio.win();
        this.haptic("heavy");
        this.persistWin();
        this.resultScreen.active = true;
        this.gameScreen.active = false;
        this.resultPanel.removeAllChildren();
        this.resultActions = this.createNode("ResultActions", this.resultPanel, 640, 150, 0, -485);
        const accent = hexColor(this.currentPack.accent);
        this.drawRoundedPanel(this.resultPanel, 690, Math.min(1180, this.viewport.safeHeight - 30), new Color(15, 35, 60, 252), new Color(accent.r, accent.g, accent.b, 210), 34);
        const titleText = this.currentPack.mode === "blessing" ? `${this.currentPack.name}合辑完成` : `${this.currentPack.name}完成`;
        const title = this.addLabel(this.resultPanel, titleText, 39, Color.WHITE, 0, 485, 620, 60);
        title.isBold = true;
        this.addLabel(this.resultPanel, `${this.completedImages.length}张完整图片 · ${this.moves}步 · 最高连锁×${Math.max(1, this.maxChain)}`, 18, accent, 0, 437, 620, 34);

        const count = this.completedImages.length;
        const columns = count <= 4 ? 2 : count <= 6 ? 3 : 4;
        const rows = Math.ceil(count / columns);
        const areaWidth = 610;
        const areaHeight = 710;
        const gap = 13;
        const cardWidth = (areaWidth - gap * (columns - 1)) / columns;
        const cardHeight = Math.min(cardWidth / TILE_ASPECT, (areaHeight - gap * (rows - 1)) / rows);
        const totalWidth = columns * cardWidth + (columns - 1) * gap;
        const totalHeight = rows * cardHeight + (rows - 1) * gap;
        this.completedImages.forEach((key, index) => {
            const row = Math.floor(index / columns);
            const column = index % columns;
            const remaining = count - row * columns;
            const rowCount = Math.min(columns, remaining);
            const rowWidth = rowCount * cardWidth + (rowCount - 1) * gap;
            const x = -rowWidth / 2 + cardWidth / 2 + column * (cardWidth + gap);
            const y = 330 - row * (cardHeight + gap);
            const card = this.createNode(`Result-${key}`, this.resultPanel, cardWidth, cardHeight, x, y);
            const sprite = card.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.baseFrames.get(key)!;
            const frame = card.addComponent(Graphics);
            frame.strokeColor = new Color(255, 255, 255, 205);
            frame.lineWidth = 3;
            frame.roundRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 12);
            frame.stroke();
            const name = PICTURE_BY_KEY.get(key)?.name ?? key;
            const plate = this.createNode("NamePlate", card, cardWidth, 32, 0, -cardHeight / 2 + 16);
            const plateGraphics = plate.addComponent(Graphics);
            plateGraphics.fillColor = new Color(2, 11, 24, 180);
            plateGraphics.rect(-cardWidth / 2, -16, cardWidth, 32);
            plateGraphics.fill();
            this.addLabel(plate, name, clamp(cardWidth * 0.09, 12, 18), Color.WHITE, 0, 0, cardWidth - 10, 28);
        });
        const captionY = Math.max(-390, 330 - totalHeight - 40);
        const lines = this.currentPack.mode === "blessing" ? this.currentPack.albumLines : ["观察、规划、拼合", "让连锁自然发生"] as [string, string];
        this.addLabel(this.resultPanel, `${lines[0]} · ${lines[1]}`, 22, new Color(255, 241, 205, 255), 0, captionY, 620, 48).isBold = true;
        this.addLabel(this.resultPanel, this.currentPack.albumEnglish, 15, new Color(172, 222, 240, 255), 0, captionY - 38, 600, 28);

        if (this.currentPack.mode === "blessing") {
            this.addButton(this.resultActions, "保存合辑", -205, 35, 185, 58, () => void this.saveResult());
            this.addButton(this.resultActions, "分享合辑", 0, 35, 185, 58, () => void this.shareResult(), { fill: accent, text: new Color(48, 35, 30, 255) });
            this.addButton(this.resultActions, "再玩一次", 205, 35, 185, 58, () => void this.startPack(this.currentPack));
        } else {
            this.addButton(this.resultActions, "下一关", -150, 35, 250, 58, () => void this.startPack(createClassicPack(this.save.classicLevel)), { fill: accent, text: new Color(40, 34, 30, 255) });
            this.addButton(this.resultActions, "再玩一次", 150, 35, 250, 58, () => void this.startPack(this.currentPack));
        }
        this.addButton(this.resultActions, "返回首页", 0, -40, 260, 52, () => this.showHome());
        this.resultPanel.setScale(0.95, 0.95, 1);
        tween(this.resultPanel).to(0.24, { scale: Vec3.ONE }, { easing: "backOut" }).start();
        this.refreshLayout(true);
        this.persist();
    }

    private async captureResult(): Promise<string> {
        if (this.currentResultCapture) return this.currentResultCapture;
        const wasActive = this.resultActions.active;
        this.resultActions.active = false;
        await this.delay(100);
        try {
            this.currentResultCapture = await this.platform.captureCanvas({ fileType: "png", quality: 0.96 });
            return this.currentResultCapture;
        } finally {
            this.resultActions.active = wasActive;
        }
    }

    private async saveResult(): Promise<void> {
        if (this.busy && !this.resultScreen.active) return;
        this.audio.tap();
        try {
            const path = await this.captureResult();
            await this.platform.saveImage(path);
            this.showToast(this.platform.name === "web" ? "浏览器预览已生成；小游戏端会保存到相册" : "祝福合辑已保存到相册", 2300);
        } catch (error) {
            console.warn("[JigsawDrop] save failed", error);
            this.showToast("保存失败，请检查相册权限后重试", 2600);
        }
    }

    private async shareResult(): Promise<void> {
        this.audio.tap();
        try {
            const imageUrl = await this.captureResult();
            await this.platform.share({
                title: `${this.currentPack.albumTitle}｜${this.currentPack.albumLines.join("，")}`,
                query: `pack=${this.currentPack.id}`,
                imageUrl,
                channel: this.platform.name === "douyin" ? "article" : undefined,
            });
        } catch (error) {
            console.warn("[JigsawDrop] share failed", error);
            this.showToast("分享未完成，可以先保存图片", 2200);
        }
    }

    private persistWin(): void {
        const seconds = Math.round(this.currentElapsed());
        const key = this.currentPack.id;
        const previous = this.save.best[key];
        if (!previous || this.moves < previous.moves || (this.moves === previous.moves && seconds < previous.seconds)) {
            this.save.best[key] = { moves: this.moves, seconds, maxChain: this.maxChain };
        }
        if (this.currentPack.mode === "classic") {
            const level = Number(this.currentPack.id.replace("classic-", "")) || this.save.classicLevel;
            this.save.classicLevel = Math.max(this.save.classicLevel, level + 1);
        } else if (!this.save.completedBlessingPacks.includes(this.currentPack.id)) {
            this.save.completedBlessingPacks.push(this.currentPack.id);
        }
        this.persist();
    }

    private passiveSharePayload(): { title: string; query: string; imageUrl?: string } {
        return {
            title: this.currentPack.mode === "blessing"
                ? `${this.currentPack.albumTitle}｜亲手拼出的祝福合辑`
                : `我正在挑战${this.currentPack.name}`,
            query: this.currentPack.mode === "blessing"
                ? `pack=${this.currentPack.id}`
                : `mode=classic&level=${Math.max(1, Number(this.currentPack.id.replace("classic-", "")) || 1)}`,
            imageUrl: this.currentResultCapture || undefined,
        };
    }

    private onPlatformHide(): void {
        this.cancelDrag();
        if (this.gameScreen.active && !this.pausedAt) {
            this.elapsedBeforePause = this.currentElapsed();
            this.pausedAt = Date.now();
        }
        this.persist();
    }

    private onPlatformShow(query: Record<string, string>): void {
        if (this.pausedAt) {
            this.gameStartedAt = Date.now();
            this.pausedAt = 0;
        }
        if (query.pack && !this.gameScreen.active && !this.resultScreen.active) {
            const pack = BLESSING_PACKS.find((item) => item.id === query.pack);
            if (pack) void this.startPack(pack);
        }
        this.refreshLayout(true);
    }

    private updateStatus(): void {
        if (!this.gameScreen?.active) return;
        const seconds = Math.round(this.currentElapsed());
        const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
        const rest = String(seconds % 60).padStart(2, "0");
        this.statusLabel.string = `完成 ${this.completedImages.length}/${this.currentPack.imageKeys.length}  ·  ${this.moves}步  ·  ${minutes}:${rest}  ·  连击×${Math.max(1, this.streakCombo)}`;
        if (this.needsRescue) this.guideLabel.string = "当前局面需要整理：点击闪烁按钮，不会暗中换牌";
        else if (this.currentPack.difficultyKey === "hard") this.guideLabel.string = "先看机身颜色，再看雪山、海岸、城市与沙漠背景";
        else this.guideLabel.string = "直接拖动整组 · 长按后拖可拆单块 · 悬空自动下落";
        this.flowLabel.string = this.feverTurns > 0 ? `FEVER ${this.feverTurns}` : `${Math.round(this.flow)}%`;
        const width = 465 * (this.feverTurns > 0 ? 1 : this.flow / 100);
        this.flowFill.getComponent(UITransform)?.setContentSize(width, 12);
        this.flowFill.setPosition(-232, 0, 0);
        this.hintButton.getChildByName("Label")!.getComponent(Label)!.string = `提示 ${this.hints}`;
        this.undoButton.getChildByName("Label")!.getComponent(Label)!.string = this.undoState ? "撤销" : "撤销 —";
        this.rescueButtonLabel.string = this.needsRescue ? "整理！" : `整理 ${this.rescues}`;
        this.paintButton(this.rescueButton, this.needsRescue ? new Color(255, 207, 74, 255) : new Color(20, 58, 91, 245), new Color(255, 255, 255, this.needsRescue ? 220 : 90));
        if (this.needsRescue) {
            const scale = 1 + Math.sin(Date.now() / 140) * 0.055;
            this.rescueButton.setScale(scale, scale, 1);
        } else this.rescueButton.setScale(1, 1, 1);
    }

    private drawDecks(): void {
        this.deckLayer.removeAllChildren();
        const count = this.core.grid;
        const spacing = this.boardWidth / count;
        for (let column = 0; column < count; column += 1) {
            const amount = this.core.decks[column]?.length ?? 0;
            const node = this.createNode(`Deck-${column}`, this.deckLayer, spacing - 7, 64, -this.boardWidth / 2 + spacing * (column + 0.5), 0);
            const g = node.addComponent(Graphics);
            g.fillColor = amount > 0 ? new Color(181, 60, 83, 250) : new Color(39, 75, 103, 120);
            g.roundRect(-(spacing - 7) / 2, -27, spacing - 7, 54, 10);
            g.fill();
            g.strokeColor = new Color(255, 224, 184, amount > 0 ? 220 : 65);
            g.lineWidth = 2;
            g.roundRect(-(spacing - 7) / 2, -27, spacing - 7, 54, 10);
            g.stroke();
            const nextId = this.core.peekDeck(column, 1)[0];
            if (nextId) {
                const tile = this.core.tiles.get(nextId)!;
                const preview = this.createNode("Next", node, Math.min(34, spacing * 0.25), 43, -spacing * 0.22, 0);
                const sprite = preview.addComponent(Sprite);
                sprite.sizeMode = Sprite.SizeMode.CUSTOM;
                sprite.spriteFrame = this.pieceFrames.get(tile.imageKey)?.[tile.quadrant] ?? null;
            }
            this.addLabel(node, amount > 0 ? String(amount) : "·", 17, Color.WHITE, amount > 0 ? spacing * 0.16 : 0, 0, spacing * 0.38, 28).isBold = true;
        }
    }

    private drawDropPreview(result: MoveResult | null): void {
        const g = this.dropPreview;
        g.clear();
        if (!result || result.targetCells.length === 0) return;
        const valid = result.valid;
        g.fillColor = valid ? new Color(91, 235, 143, 42) : new Color(255, 80, 80, 38);
        g.strokeColor = valid ? new Color(114, 255, 169, 225) : new Color(255, 110, 110, 225);
        g.lineWidth = 3;
        result.targetCells.forEach((cell) => {
            const p = this.positionForCell(cell);
            g.rect(p.x - this.tileWidth / 2 + 3, p.y - this.tileHeight / 2 + 3, this.tileWidth - 6, this.tileHeight - 6);
            g.fill(); g.stroke();
        });
    }

    private refreshLayout(force: boolean): void {
        const visible = view.getVisibleSize();
        const info = this.platform.getSystemInfo();
        const scale = visible.width / Math.max(1, info.windowWidth);
        const topInset = clamp(info.safeArea.top * scale, 0, visible.height * 0.18);
        const bottomInset = clamp((info.windowHeight - info.safeArea.bottom) * scale, 0, visible.height * 0.18);
        const safeHeight = Math.max(620, visible.height - topInset - bottomInset);
        const safeCenterY = (bottomInset - topInset) / 2;
        const signature = `${visible.width.toFixed(1)}:${visible.height.toFixed(1)}:${topInset.toFixed(1)}:${bottomInset.toFixed(1)}:${this.core.grid}`;
        if (!force && signature === this.viewportSignature) return;
        this.viewportSignature = signature;
        this.viewport = {
            width: visible.width,
            height: visible.height,
            safeWidth: visible.width,
            safeHeight,
            safeCenterY,
            topInset,
            bottomInset,
        };
        this.runtimeRoot.getComponent(UITransform)?.setContentSize(visible.width, visible.height);
        this.backgroundNode.getComponent(UITransform)?.setContentSize(visible.width, visible.height);
        this.safeRoot.getComponent(UITransform)?.setContentSize(visible.width, safeHeight);
        this.safeRoot.setPosition(0, safeCenterY, 0);
        [this.homeScreen, this.gameScreen].forEach((node) => node.getComponent(UITransform)?.setContentSize(visible.width, safeHeight));
        this.drawBackground();
        this.layoutHome();
        this.layoutGame();
        this.layoutOverlays();
        this.orientationOverlay.active = visible.width > visible.height * 0.92;
    }

    private drawBackground(): void {
        const g = this.backgroundGraphics;
        g.clear();
        g.fillColor = new Color(5, 26, 56, 255);
        g.rect(-this.viewport.width / 2, -this.viewport.height / 2, this.viewport.width, this.viewport.height);
        g.fill();
        g.fillColor = new Color(15, 92, 145, 115);
        g.circle(-this.viewport.width * 0.39, this.viewport.height * 0.31, this.viewport.width * 0.52);
        g.fill();
        g.fillColor = new Color(24, 151, 168, 72);
        g.circle(this.viewport.width * 0.43, -this.viewport.height * 0.33, this.viewport.width * 0.58);
        g.fill();
    }

    private layoutHome(): void {
        const scale = Math.min(1, this.viewport.safeHeight / 1250, this.viewport.safeWidth / 740);
        this.homeContent.setScale(scale, scale, 1);
        this.homeContent.setPosition(0, 0, 0);
    }

    private layoutGame(): void {
        if (!this.gameTopbar) return;
        const half = this.viewport.safeHeight / 2;
        this.gameTopbar.setPosition(0, half - 63, 0);
        this.gameTopbar.getComponent(UITransform)?.setContentSize(Math.min(720, this.viewport.safeWidth - 16), 112);
        this.gameBottombar.setPosition(0, -half + 43, 0);
        this.statusPanel.setPosition(0, -half + 121, 0);
        this.flowBar.setPosition(0, -half + 181, 0);
        this.deckLayer.setPosition(0, half - 151, 0);
        this.configureBoard(this.currentPack.grid || this.core.grid || 4);
        const boardTop = half - 197;
        const boardBottom = -half + 216;
        this.boardNode.setPosition(0, (boardTop + boardBottom) / 2, 0);
        this.comboLabel.node.setPosition(0, this.boardNode.position.y + Math.min(this.boardHeight * 0.22, 180), 0);
        this.toastNode.setPosition(0, -this.viewport.height / 2 + this.viewport.bottomInset + 242, 0);
        this.drawBoard();
        this.syncTiles(false);
        this.drawDecks();
    }

    private layoutOverlays(): void {
        [this.packOverlay, this.settingsOverlay, this.resultScreen, this.orientationOverlay].forEach((node) => {
            node.getComponent(UITransform)?.setContentSize(this.viewport.width, this.viewport.height);
            node.setPosition(0, -this.viewport.safeCenterY, 0);
        });
        const packScale = Math.min(1, (this.viewport.safeHeight - 28) / 1120, this.viewport.safeWidth / 710);
        this.packPanel.setScale(packScale, packScale, 1);
        const settingsScale = Math.min(1, (this.viewport.safeHeight - 50) / 720, this.viewport.safeWidth / 680);
        this.settingsPanel.setScale(settingsScale, settingsScale, 1);
        const resultScale = Math.min(1, (this.viewport.safeHeight - 22) / 1200, this.viewport.safeWidth / 710);
        this.resultPanel.setScale(resultScale, resultScale, 1);
    }

    private currentElapsed(): number {
        if (!this.gameStartedAt) return this.elapsedBeforePause;
        if (this.pausedAt) return this.elapsedBeforePause;
        return this.elapsedBeforePause + (Date.now() - this.gameStartedAt) / 1000;
    }

    private persist(): void {
        this.platform.setStorage(SAVE_KEY, this.save);
    }

    private haptic(type: "light" | "medium" | "heavy"): void {
        if (this.save.vibration) this.platform.vibrate(type);
    }

    private showToast(message: string, duration = 1800): void {
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastLabel.string = message;
        this.toastNode.active = true;
        const opacity = this.toastNode.getComponent(UIOpacity) ?? this.toastNode.addComponent(UIOpacity);
        opacity.opacity = 255;
        Tween.stopAllByTarget(this.toastNode);
        this.toastNode.setScale(0.94, 0.94, 1);
        tween(this.toastNode).to(0.14, { scale: Vec3.ONE }, { easing: "backOut" }).start();
        this.toastTimer = setTimeout(() => {
            tween(opacity).to(0.22, { opacity: 0 }).call(() => { this.toastNode.active = false; }).start();
        }, duration);
    }

    private positionForCell(cell: number): Vec3 {
        const rc = this.core.cellToRC(cell);
        return new Vec3(
            -this.boardWidth / 2 + this.tileWidth * (rc.c + 0.5),
            this.boardHeight / 2 - this.tileHeight * (rc.r + 0.5),
            0,
        );
    }

    private averagePosition(cells: number[]): Vec3 {
        if (!cells.length) return new Vec3();
        return cells.map((cell) => this.positionForCell(cell)).reduce((sum, value) => sum.add(value), new Vec3()).multiplyScalar(1 / cells.length);
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
        this.clearJoinedSurfaces();
        for (const node of this.tileNodes.values()) node.destroy();
        this.tileNodes.clear();
        this.tileLayer.removeAllChildren();
        this.fxLayer.removeAllChildren();
        this.hintLayer.removeAllChildren();
    }

    private createOverlay(name: string, color = new Color(2, 14, 31, 224)): Node {
        const node = this.createNode(name, this.runtimeRoot, DESIGN_WIDTH, DESIGN_HEIGHT, 0, 0);
        node.addComponent(BlockInputEvents);
        const graphics = node.addComponent(Graphics);
        graphics.fillColor = color;
        graphics.rect(-DESIGN_WIDTH, -DESIGN_HEIGHT, DESIGN_WIDTH * 2, DESIGN_HEIGHT * 2);
        graphics.fill();
        return node;
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
        label.lineHeight = Math.round(fontSize * 1.24);
        label.color = color;
        label.horizontalAlign = HorizontalTextAlignment.CENTER;
        label.verticalAlign = VerticalTextAlignment.CENTER;
        label.overflow = Label.Overflow.SHRINK;
        label.enableWrapText = true;
        return label;
    }

    private addButton(
        parent: Node,
        text: string,
        x: number,
        y: number,
        width: number,
        height: number,
        callback: () => void,
        style: { fill?: Color; stroke?: Color; text?: Color; fontSize?: number } = {},
    ): Node {
        const node = this.createNode(`Button-${text}`, parent, width, height, x, y);
        this.paintButton(node, style.fill ?? new Color(20, 58, 91, 245), style.stroke ?? new Color(255, 255, 255, 90));
        const label = this.addLabel(node, text, style.fontSize ?? 21, style.text ?? Color.WHITE, 0, 0, width - 16, height - 10);
        label.node.name = "Label";
        label.isBold = true;
        node.on(Node.EventType.TOUCH_START, () => node.setScale(0.975, 0.975, 1), this);
        node.on(Node.EventType.TOUCH_CANCEL, () => node.setScale(1, 1, 1), this);
        node.on(Node.EventType.TOUCH_END, () => {
            node.setScale(1, 1, 1);
            callback();
        }, this);
        return node;
    }

    private paintButton(node: Node, fill: Color, stroke: Color): void {
        const size = node.getComponent(UITransform)!.contentSize;
        const graphics = node.getComponent(Graphics) ?? node.addComponent(Graphics);
        graphics.clear();
        graphics.fillColor = fill;
        graphics.roundRect(-size.width / 2, -size.height / 2, size.width, size.height, Math.min(20, size.height / 2));
        graphics.fill();
        graphics.strokeColor = stroke;
        graphics.lineWidth = 2;
        graphics.roundRect(-size.width / 2, -size.height / 2, size.width, size.height, Math.min(20, size.height / 2));
        graphics.stroke();
    }

    private drawRoundedPanel(node: Node, width: number, height: number, fill: Color, stroke: Color, radius: number): void {
        node.getComponent(UITransform)?.setContentSize(width, height);
        const graphics = node.getComponent(Graphics) ?? node.addComponent(Graphics);
        graphics.clear();
        graphics.fillColor = fill;
        graphics.roundRect(-width / 2, -height / 2, width, height, radius);
        graphics.fill();
        graphics.strokeColor = stroke;
        graphics.lineWidth = 2;
        graphics.roundRect(-width / 2, -height / 2, width, height, radius);
        graphics.stroke();
    }

    private delay(milliseconds: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}
