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
