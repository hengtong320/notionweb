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
