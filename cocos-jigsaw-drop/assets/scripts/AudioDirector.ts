import { AudioClip, AudioSource, Node, resources } from "cc";

export type AudioCue =
    | "tap"
    | "invalid"
    | "merge"
    | "drop"
    | "clear1"
    | "clear2"
    | "clear3"
    | "fever"
    | "win";

const CUE_PATHS: Record<AudioCue, string> = {
    tap: "audio/tap",
    invalid: "audio/invalid",
    merge: "audio/merge",
    drop: "audio/drop",
    clear1: "audio/clear-1",
    clear2: "audio/clear-2",
    clear3: "audio/clear-3",
    fever: "audio/fever",
    win: "audio/win",
};

export class AudioDirector {
    private readonly source: AudioSource;
    private readonly clips = new Map<AudioCue, AudioClip>();
    private enabled = true;
    private ready = false;

    public constructor(parent: Node) {
        const node = new Node("AudioDirector");
        parent.addChild(node);
        this.source = node.addComponent(AudioSource);
        this.source.loop = false;
        this.source.volume = 1;
    }

    public async preload(): Promise<void> {
        if (this.ready) return;
        const entries = Object.entries(CUE_PATHS) as [AudioCue, string][];
        await Promise.all(entries.map(([cue, path]) => new Promise<void>((resolve) => {
            resources.load(path, AudioClip, (error, clip) => {
                if (!error && clip) this.clips.set(cue, clip);
                else console.warn(`[JigsawDrop] audio missing: ${path}`, error);
                resolve();
            });
        })));
        this.ready = true;
    }

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!enabled) this.source.stop();
    }

    public get isEnabled(): boolean {
        return this.enabled;
    }

    public play(cue: AudioCue, volume = 1): void {
        if (!this.enabled) return;
        const clip = this.clips.get(cue);
        if (clip) this.source.playOneShot(clip, Math.max(0, Math.min(1.4, volume)));
    }

    public tap(): void { this.play("tap", 0.65); }
    public invalid(): void { this.play("invalid", 0.75); }
    public merge(stage = 2): void { this.play("merge", Math.min(1.1, 0.65 + stage * 0.1)); }
    public drop(distance = 1): void { this.play("drop", Math.min(1, 0.45 + distance * 0.09)); }

    public clear(chain = 1): void {
        const cue: AudioCue = chain >= 3 ? "clear3" : chain === 2 ? "clear2" : "clear1";
        this.play(cue, Math.min(1.25, 0.82 + chain * 0.08));
    }

    public fever(): void { this.play("fever", 1); }
    public win(): void { this.play("win", 1); }
}
