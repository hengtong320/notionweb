import { game, sys } from "cc";

export interface SharePayload {
    title: string;
    query?: string;
    imageUrl?: string;
    imageUrlId?: string;
    channel?: string;
    templateId?: string;
}

export interface PlatformSystemInfo {
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    pixelRatio: number;
    statusBarHeight: number;
    safeArea: { left: number; top: number; right: number; bottom: number; width: number; height: number };
    platform: string;
    model: string;
}

export interface CaptureOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    destWidth?: number;
    destHeight?: number;
    fileType?: "png" | "jpg";
    quality?: number;
}

export interface PlatformSetupOptions {
    onShow?: (query: Record<string, string>) => void;
    onHide?: () => void;
    passiveSharePayload?: () => SharePayload;
}

export interface PlatformBridge {
    readonly name: "web" | "wechat" | "douyin";
    readonly isMiniGame: boolean;
    setup(options: PlatformSetupOptions): void;
    getSystemInfo(): PlatformSystemInfo;
    getLaunchQuery(): Record<string, string>;
    setPreferredFPS(fps: number): void;
    keepScreenOn(enabled?: boolean): void;
    vibrate(type?: "light" | "medium" | "heavy"): void;
    getStorage<T>(key: string, fallback: T): T;
    setStorage<T>(key: string, value: T): void;
    removeStorage(key: string): void;
    share(payload: SharePayload): Promise<void>;
    captureCanvas(options?: CaptureOptions): Promise<string>;
    saveImage(filePath: string): Promise<void>;
    saveCurrentCanvas(options?: CaptureOptions): Promise<string>;
}

class UniversalBridge implements PlatformBridge {
    public readonly name: "web" | "wechat" | "douyin";
    public readonly isMiniGame: boolean;
    private readonly api: any;

    public constructor() {
        const scope = globalThis as any;
        if (scope.wx) { this.name = "wechat"; this.api = scope.wx; }
        else if (scope.tt) { this.name = "douyin"; this.api = scope.tt; }
        else { this.name = "web"; this.api = null; }
        this.isMiniGame = this.name !== "web";
    }

    public setup(options: PlatformSetupOptions): void {
        if (!this.api) return;
        try {
            this.api.onShow?.((result: any) => options.onShow?.(this.normalizeQuery(result?.query ?? {})));
            this.api.onHide?.(() => options.onHide?.());
            this.api.showShareMenu?.({ withShareTicket: true, menus: ["shareAppMessage", "shareTimeline"] });
            this.api.onShareAppMessage?.(() => this.toShareObject(options.passiveSharePayload?.() ?? { title: "Jigsaw Drop" }));
            this.api.onShareTimeline?.(() => this.toShareObject(options.passiveSharePayload?.() ?? { title: "Jigsaw Drop" }));
        } catch (error) {
            console.warn("[JigsawDrop] platform setup warning", error);
        }
    }

    public getSystemInfo(): PlatformSystemInfo {
        let raw: any = {};
        try { raw = this.api?.getSystemInfoSync?.() ?? {}; } catch (_) { raw = {}; }
        const rect = sys.getSafeAreaRect?.();
        const canvas = this.getCanvas();
        const screenWidth = Number(raw.screenWidth ?? raw.windowWidth ?? canvas?.width ?? 750) || 750;
        const screenHeight = Number(raw.screenHeight ?? raw.windowHeight ?? canvas?.height ?? 1334) || 1334;
        const windowWidth = Number(raw.windowWidth ?? screenWidth) || screenWidth;
        const windowHeight = Number(raw.windowHeight ?? screenHeight) || screenHeight;
        const safe = raw.safeArea ?? {
            left: rect?.x ?? 0,
            top: Math.max(0, screenHeight - (rect?.y ?? 0) - (rect?.height ?? screenHeight)),
            right: (rect?.x ?? 0) + (rect?.width ?? screenWidth),
            bottom: screenHeight - (rect?.y ?? 0),
            width: rect?.width ?? screenWidth,
            height: rect?.height ?? screenHeight,
        };
        return {
            screenWidth,
            screenHeight,
            windowWidth,
            windowHeight,
            pixelRatio: Number(raw.pixelRatio ?? 1) || 1,
            statusBarHeight: Number(raw.statusBarHeight ?? safe.top ?? 0) || 0,
            safeArea: {
                left: Number(safe.left ?? 0), top: Number(safe.top ?? 0),
                right: Number(safe.right ?? windowWidth), bottom: Number(safe.bottom ?? windowHeight),
                width: Number(safe.width ?? windowWidth), height: Number(safe.height ?? windowHeight),
            },
            platform: String(raw.platform ?? this.name),
            model: String(raw.model ?? "unknown"),
        };
    }

    public getLaunchQuery(): Record<string, string> {
        if (this.api?.getLaunchOptionsSync) {
            try { return this.normalizeQuery(this.api.getLaunchOptionsSync()?.query ?? {}); } catch (_) { return {}; }
        }
        return {};
    }

    public setPreferredFPS(fps: number): void {
        const value = Math.max(30, Math.min(60, Math.round(fps)));
        try { this.api?.setPreferredFramesPerSecond?.(value); } catch (_) { /* optional */ }
        game.frameRate = value;
    }

    public keepScreenOn(enabled = true): void {
        try { this.api?.setKeepScreenOn?.({ keepScreenOn: enabled }); } catch (_) { /* optional */ }
    }

    public vibrate(type: "light" | "medium" | "heavy" = "light"): void {
        try { this.api?.vibrateShort?.({ type }); } catch (_) {
            try { this.api?.vibrateShort?.(); } catch (_) { /* optional */ }
        }
    }

    public getStorage<T>(key: string, fallback: T): T {
        try {
            if (this.api?.getStorageSync) {
                const value = this.api.getStorageSync(key);
                return value === "" || value === undefined || value === null ? fallback : value as T;
            }
            const raw = sys.localStorage?.getItem(key);
            return raw ? JSON.parse(raw) as T : fallback;
        } catch (_) { return fallback; }
    }

    public setStorage<T>(key: string, value: T): void {
        try {
            if (this.api?.setStorageSync) this.api.setStorageSync(key, value);
            else sys.localStorage?.setItem(key, JSON.stringify(value));
        } catch (error) { console.warn("[JigsawDrop] storage write failed", error); }
    }

    public removeStorage(key: string): void {
        try {
            if (this.api?.removeStorageSync) this.api.removeStorageSync(key);
            else sys.localStorage?.removeItem(key);
        } catch (_) { /* ignore */ }
    }

    public async share(payload: SharePayload): Promise<void> {
        if (!this.api?.shareAppMessage) {
            console.info("[JigsawDrop] share preview", payload);
            return;
        }
        await new Promise<void>((resolve) => {
            try {
                this.api.shareAppMessage({
                    ...this.toShareObject(payload),
                    success: () => resolve(),
                    fail: (error: any) => {
                        if (!String(error?.errMsg ?? "").includes("cancel")) console.warn("[JigsawDrop] share failed", error);
                        resolve();
                    },
                });
            } catch (error) {
                console.warn("[JigsawDrop] share call failed", error);
                resolve();
            }
        });
    }

    public captureCanvas(options: CaptureOptions = {}): Promise<string> {
        const canvas = this.getCanvas();
        if (!canvas) return Promise.reject(new Error("render canvas unavailable"));
        const width = Number(options.width ?? canvas.width ?? 750);
        const height = Number(options.height ?? canvas.height ?? 1334);
        const request = {
            canvas,
            x: options.x ?? 0, y: options.y ?? 0, width, height,
            destWidth: options.destWidth ?? width, destHeight: options.destHeight ?? height,
            fileType: options.fileType ?? "png", quality: options.quality ?? 0.94,
        };
        if (this.api?.canvasToTempFilePath) {
            return new Promise((resolve, reject) => this.api.canvasToTempFilePath({ ...request, success: (r: any) => resolve(r.tempFilePath), fail: reject }));
        }
        if (canvas.toTempFilePath) {
            return new Promise((resolve, reject) => canvas.toTempFilePath({ ...request, success: (r: any) => resolve(r.tempFilePath), fail: reject }));
        }
        if (canvas.toDataURL) return Promise.resolve(canvas.toDataURL(`image/${request.fileType}`, request.quality));
        return Promise.reject(new Error("canvas export is not supported"));
    }

    public async saveImage(filePath: string): Promise<void> {
        if (!this.api?.saveImageToPhotosAlbum) {
            console.info("[JigsawDrop] save image preview", filePath);
            return;
        }
        await this.ensureAlbumPermission();
        await new Promise<void>((resolve, reject) => this.api.saveImageToPhotosAlbum({ filePath, success: () => resolve(), fail: reject }));
    }

    public async saveCurrentCanvas(options: CaptureOptions = {}): Promise<string> {
        const path = await this.captureCanvas(options);
        await this.saveImage(path);
        return path;
    }

    private getCanvas(): any {
        const scope = globalThis as any;
        return scope.canvas ?? (game as any).canvas ?? null;
    }

    private normalizeQuery(value: any): Record<string, string> {
        const result: Record<string, string> = {};
        if (!value || typeof value !== "object") return result;
        Object.keys(value).forEach((key) => { result[key] = String(value[key]); });
        return result;
    }

    private toShareObject(payload: SharePayload): Record<string, unknown> {
        const result: Record<string, unknown> = { title: payload.title };
        if (payload.query) result.query = payload.query;
        if (payload.imageUrl) result.imageUrl = payload.imageUrl;
        if (payload.imageUrlId) result.imageUrlId = payload.imageUrlId;
        if (payload.channel) result.channel = payload.channel;
        if (payload.templateId) result.templateId = payload.templateId;
        return result;
    }

    private async ensureAlbumPermission(): Promise<void> {
        if (!this.api?.getSetting || !this.api?.authorize) return;
        const settings = await new Promise<any>((resolve) => this.api.getSetting({ success: resolve, fail: () => resolve({ authSetting: {} }) }));
        if (settings?.authSetting?.["scope.writePhotosAlbum"] === true) return;
        await new Promise<void>((resolve, reject) => this.api.authorize({ scope: "scope.writePhotosAlbum", success: () => resolve(), fail: reject }));
    }
}

export function createPlatformBridge(): PlatformBridge {
    return new UniversalBridge();
}
