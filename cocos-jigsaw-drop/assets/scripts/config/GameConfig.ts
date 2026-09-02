export type GameMode = "blessing" | "classic";
export type DifficultyKey = "easy" | "normal" | "hard" | "expert";

export interface PictureDefinition {
    key: string;
    name: string;
    bundle: "blessing" | "classic-a" | "classic-b" | "classic-c";
    path: string;
    category: string;
}

export interface PackDefinition {
    id: string;
    mode: GameMode;
    name: string;
    subtitle: string;
    difficulty: string;
    difficultyKey: DifficultyKey;
    grid: 4 | 5;
    imageKeys: string[];
    seed: number;
    fastStart: boolean;
    startFlow: number;
    flowGain: number;
    hints: number;
    rescues: number;
    maxDealPerColumn: number;
    albumTitle: string;
    albumEnglish: string;
    albumLines: [string, string];
    accent: string;
}

const blessing = (
    key: string,
    name: string,
    category: string,
): PictureDefinition => ({ key, name, category, bundle: "blessing", path: `pictures/${key}` });

const classic = (
    key: string,
    name: string,
    index: number,
    category: string,
): PictureDefinition => ({
    key,
    name,
    category,
    bundle: index <= 20 ? "classic-a" : index <= 40 ? "classic-b" : "classic-c",
    path: `pictures/${key}`,
});

export const BLESSING_PICTURES: PictureDefinition[] = [
    blessing("01-lotus-sunrise", "荷香晨曦", "花景"),
    blessing("02-trumpet-flower", "凌霄花开", "花景"),
    blessing("03-jujube-orchard", "枣园丰收", "丰收"),
    blessing("04-elegant-woman", "花间晨安", "人物"),
    blessing("05-blessing-vase", "福气花瓶", "花景"),
    blessing("06-pine-crane", "松鹤延年", "山水"),
    blessing("07-peony-courtyard", "牡丹晨露", "花景"),
    blessing("08-tea-terraces", "云海茶山", "山水"),
    blessing("09-wheat-windmill", "麦田晨光", "丰收"),
    blessing("10-ocean-sailboat", "海上朝阳", "山水"),
    blessing("11-sunflower-lane", "向阳花路", "花景"),
    blessing("12-ginkgo-temple", "银杏古寺", "山水"),
    blessing("13-heli-red-mountain", "赤翼群山", "直升机"),
    blessing("14-heli-white-coast", "白翼海岸", "直升机"),
    blessing("15-heli-yellow-alpine", "金翼雪湖", "直升机"),
    blessing("16-heli-blue-city", "蓝翼都市", "直升机"),
    blessing("17-heli-black-desert", "玄翼沙海", "直升机"),
    blessing("18-heli-silver-snow", "银翼雪峰", "直升机"),
];

export const CLASSIC_PICTURES: PictureDefinition[] = [
    classic("01-alpine-lake", "高山湖泊", 1, "风景"),
    classic("02-blue-alley", "蓝白小巷", 2, "建筑"),
    classic("03-golden-dog", "金毛伙伴", 3, "萌宠"),
    classic("04-white-cat", "白猫", 4, "萌宠"),
    classic("05-red-roses", "红玫瑰", 5, "花卉"),
    classic("06-berry-basket", "莓果篮", 6, "美食"),
    classic("07-vintage-phone", "复古电话", 7, "物件"),
    classic("08-city-bicycle", "城市单车", 8, "城市"),
    classic("09-tropical-beach", "热带海滩", 9, "风景"),
    classic("10-hot-air-balloons", "热气球", 10, "旅行"),
    classic("11-neon-city", "霓虹城市", 11, "城市"),
    classic("12-autumn-forest", "秋日森林", 12, "风景"),
    classic("13-mountain-cabin", "山间木屋", 13, "建筑"),
    classic("14-coffee-cup", "咖啡时光", 14, "美食"),
    classic("15-macarons", "马卡龙", 15, "美食"),
    classic("16-sushi", "寿司拼盘", 16, "美食"),
    classic("17-lemon-drink", "柠檬汽水", 17, "美食"),
    classic("18-violin", "小提琴", 18, "艺术"),
    classic("19-astronaut", "太空漫游", 19, "幻想"),
    classic("20-moon-castle", "月夜城堡", 20, "幻想"),
    classic("21-waterfall", "林间瀑布", 21, "风景"),
    classic("22-lavender-field", "薰衣草田", 22, "花卉"),
    classic("23-sunflower-field", "向日葵", 23, "花卉"),
    classic("24-snow-village", "雪中小镇", 24, "建筑"),
    classic("25-lighthouse", "海边灯塔", 25, "建筑"),
    classic("26-red-car", "红色跑车", 26, "交通"),
    classic("27-parrot", "彩色鹦鹉", 27, "动物"),
    classic("28-fox", "森林狐狸", 28, "动物"),
    classic("29-koi-pond", "锦鲤池", 29, "动物"),
    classic("30-library", "老图书馆", 30, "建筑"),
    classic("31-cathedral", "古老教堂", 31, "建筑"),
    classic("32-desert", "沙漠旅人", 32, "风景"),
    classic("33-sailboat", "白帆船", 33, "旅行"),
    classic("34-cherry-bridge", "樱花桥", 34, "花卉"),
    classic("35-tropical-fish", "热带鱼", 35, "动物"),
    classic("36-old-train", "山间火车", 36, "交通"),
    classic("37-jellyfish", "水母夜游", 37, "动物"),
    classic("38-ramen", "拉面小馆", 38, "美食"),
    classic("39-skateboard", "滑板公园", 39, "运动"),
    classic("40-rain-window", "雨夜窗景", 40, "城市"),
    classic("41-arcade", "街机房", 41, "物件"),
    classic("42-vinyl", "黑胶唱片", 42, "艺术"),
    classic("43-sakura", "樱花坡道", 43, "花卉"),
    classic("44-hot-spring", "山间温泉", 44, "旅行"),
    classic("45-panda", "竹林熊猫", 45, "动物"),
    classic("46-penguin", "冰原企鹅", 46, "动物"),
    classic("47-robot", "机器人工作间", 47, "幻想"),
    classic("48-submarine", "深海潜艇", 48, "交通"),
    classic("49-whale", "蓝鲸跃海", 49, "动物"),
    classic("50-dinosaur", "恐龙谷", 50, "动物"),
    classic("51-bakery", "清晨面包店", 51, "美食"),
    classic("52-pottery", "陶艺工坊", 52, "艺术"),
    classic("53-ferris-wheel", "夜色摩天轮", 53, "旅行"),
    classic("54-telescope", "星空望远镜", 54, "幻想"),
    classic("55-camper", "露营房车", 55, "旅行"),
    classic("56-basketball", "夕阳球场", 56, "运动"),
    classic("57-tea-house", "茶屋庭院", 57, "建筑"),
    classic("58-lantern-alley", "灯笼小巷", 58, "建筑"),
    classic("59-aurora-tent", "极光帐篷", 59, "旅行"),
    classic("60-windmill", "风车麦田", 60, "风景"),
];

export const ALL_PICTURES = [...BLESSING_PICTURES, ...CLASSIC_PICTURES];
export const PICTURE_BY_KEY = new Map(ALL_PICTURES.map((item) => [item.key, item]));

export const BLESSING_PACKS: PackDefinition[] = [
    {
        id: "blessing-easy",
        mode: "blessing",
        name: "花开晨安",
        subtitle: "4×4 · 4张差异明显的写实美图",
        difficulty: "轻松",
        difficultyKey: "easy",
        grid: 4,
        imageKeys: ["01-lotus-sunrise", "02-trumpet-flower", "07-peony-courtyard", "08-tea-terraces"],
        seed: 20260921,
        fastStart: true,
        startFlow: 0,
        flowGain: 1.1,
        hints: 3,
        rescues: 3,
        maxDealPerColumn: 1,
        albumTitle: "花开见喜",
        albumEnglish: "A BEAUTIFUL MORNING",
        albumLines: ["愿晨光温柔相伴", "日日顺心安康"],
        accent: "#ffbd86",
    },
    {
        id: "blessing-medium",
        mode: "blessing",
        name: "山河丰景",
        subtitle: "5×5 · 8张写实图 · 深牌堆规划",
        difficulty: "进阶",
        difficultyKey: "normal",
        grid: 5,
        imageKeys: [
            "03-jujube-orchard", "04-elegant-woman", "05-blessing-vase", "06-pine-crane",
            "09-wheat-windmill", "10-ocean-sailboat", "11-sunflower-lane", "12-ginkgo-temple",
        ],
        seed: 20260922,
        fastStart: false,
        startFlow: 16,
        flowGain: 1.15,
        hints: 4,
        rescues: 3,
        maxDealPerColumn: 1,
        albumTitle: "山河有福",
        albumEnglish: "GOOD FORTUNE EVERYWHERE",
        albumLines: ["愿眼里有风景", "心里有欢喜"],
        accent: "#f2d184",
    },
    {
        id: "blessing-helicopter",
        mode: "blessing",
        name: "一飞冲天",
        subtitle: "5×5 · 6张同题材直升机照片",
        difficulty: "困难",
        difficultyKey: "hard",
        grid: 5,
        imageKeys: [
            "13-heli-red-mountain", "14-heli-white-coast", "15-heli-yellow-alpine",
            "16-heli-blue-city", "17-heli-black-desert", "18-heli-silver-snow",
        ],
        seed: 20260923,
        fastStart: false,
        startFlow: 24,
        flowGain: 1.2,
        hints: 5,
        rescues: 3,
        maxDealPerColumn: 1,
        albumTitle: "一飞冲天",
        albumEnglish: "SOAR TOWARD THE SKY",
        albumLines: ["愿你一路向上", "前程辽阔明亮"],
        accent: "#ffd05f",
    },
    {
        id: "blessing-expert",
        mode: "blessing",
        name: "心流大师",
        subtitle: "5×5 · 8张跨主题写实图 · 连锁种子",
        difficulty: "大师",
        difficultyKey: "expert",
        grid: 5,
        imageKeys: [
            "01-lotus-sunrise", "03-jujube-orchard", "07-peony-courtyard", "09-wheat-windmill",
            "11-sunflower-lane", "13-heli-red-mountain", "16-heli-blue-city", "18-heli-silver-snow",
        ],
        seed: 20260924,
        fastStart: false,
        startFlow: 34,
        flowGain: 1.28,
        hints: 3,
        rescues: 2,
        maxDealPerColumn: 1,
        albumTitle: "万事皆顺",
        albumEnglish: "EVERYTHING FLOWS",
        albumLines: ["心有从容节奏", "事事渐入佳境"],
        accent: "#ffe07d",
    },
];

export function classicImageCount(level: number): number {
    const n = Math.max(1, Math.floor(level));
    if (n <= 5) return Math.min(9, n + 4);
    if (n <= 9) return n % 2 === 0 ? 9 : 10;
    if (n === 10) return 11;
    if (n <= 14) return 10 + ((n - 11) % 3);
    if (n === 15) return 9;
    const band = Math.floor((n - 15) / 5);
    let count = Math.min(13, 9 + band);
    if (n % 5 === 0) count = Math.min(14, count + 1);
    return count;
}

export function createClassicPack(level: number): PackDefinition {
    const n = Math.max(1, Math.floor(level));
    const grid: 4 | 5 = n >= 15 ? 5 : 4;
    const count = classicImageCount(n);
    const start = ((n - 1) * 17) % CLASSIC_PICTURES.length;
    const imageKeys: string[] = [];
    for (let index = 0; index < count; index += 1) {
        imageKeys.push(CLASSIC_PICTURES[(start + index * 7) % CLASSIC_PICTURES.length].key);
    }
    const hard = n % 5 === 0;
    return {
        id: `classic-${n}`,
        mode: "classic",
        name: `经典关卡 ${n}`,
        subtitle: `${grid}×${grid} · ${count}张图片${hard ? " · 挑战关" : ""}`,
        difficulty: hard ? "困难" : n >= 15 ? "进阶" : "普通",
        difficultyKey: hard ? "hard" : n >= 15 ? "normal" : "easy",
        grid,
        imageKeys,
        seed: (0x4a17b200 + n * 104729) >>> 0,
        fastStart: n <= 2,
        startFlow: hard ? 20 : 0,
        flowGain: hard ? 1.15 : 1,
        hints: 3,
        rescues: 3,
        maxDealPerColumn: n <= 2 ? 1 : 2,
        albumTitle: `经典关卡 ${n}`,
        albumEnglish: "JIGSAW DROP",
        albumLines: ["观察、规划、拼合", "让连锁自然发生"],
        accent: hard ? "#ffcf65" : "#7ee8ff",
    };
}

export function requiredBundles(pack: PackDefinition): string[] {
    return [...new Set(pack.imageKeys.map((key) => PICTURE_BY_KEY.get(key)?.bundle).filter((value): value is PictureDefinition["bundle"] => Boolean(value)))];
}
