# Jigsaw Drop — Cocos Creator 3.8.8 完整可继续开发版

本工程把 H5 v4.2 的主要产品结构迁移为 **Cocos Creator 3.8.8 + TypeScript 原生 2D 游戏**。它不是 WebView 套壳，棋盘、触摸、图片、动画、音效、结果合辑与平台接口都运行在 Cocos 中。

## 直接打开

1. 安装 Cocos Creator **3.8.8**。
2. 解压下载包。
3. 在 Cocos Dashboard 选择「打开其他项目」，选中本文件夹根目录。
4. 等待首次资源导入完成。
5. 双击 `assets/scenes/Main.scene`。
6. 点击顶部预览按钮。

首次导入78张图片可能需要一段时间，完成后再次打开会明显更快。

## 已实现内容

### 游戏与内容

- 4档写实祝福关：
  - 花开晨安：4×4、4张图；
  - 山河丰景：5×5、8张图与深牌堆；
  - 一飞冲天：5×5、6张相似直升机图；
  - 心流大师：5×5、8张跨主题图与连锁种子；
- 60级经典模式，使用60张经典图片；
- 共78张可用图片；
- 整局完成后生成多图祝福合辑结果页；
- 结果页可调用微信/抖音分享和保存相册。

### 核心玩法

- 单块拖动；
- 正确组合整体拖动；
- 长按约330ms拆出单块；
- 形状区域交换；
- 重力优先结算；
- 正确组合优先整体下落，单侧受阻时合理拆分；
- 完整2×2图片识别、消除与按列发牌；
- 每列下一张碎片预览；
- 拼合、下落、完成、连锁反馈；
- Combo、跨步连击、FLOW与3回合FEVER；
- 一步撤销；
- 带完整图片预览、目标区域与箭头的提示；
- 明确死局提示和由玩家主动触发的救场，不会暗中改牌；
- 音效、震动、粒子和棋盘冲击。

### 手机与平台

- 刘海屏、灵动岛、Home Indicator安全区；
- 竖屏布局和横屏提醒；
- 4×4 / 5×5根据真实可用高度动态计算；
- 微信 `wx`、抖音 `tt`、Web自动识别；
- onShow/onHide、后台暂停、触摸取消；
- 45/60 FPS设置；
- 屏幕常亮；
- 本地进度；
- 主动/被动分享；
- Canvas临时图片；
- 保存图片到相册；
- AppID为空，不携带任何账号凭据。

### 资源架构

图片不再放在主包 `resources` 中，而是分为四个 Cocos Asset Bundle：

```text
blessing   18张写实图
classic-a  经典1—20
classic-b  经典21—40
classic-c  经典41—60
```

微信和抖音构建均配置为 `subpackage`。游戏只加载当前关卡需要的 Bundle；切换内容后释放不再使用的纹理和 Bundle。

## 工程结构

```text
assets/
├── scenes/Main.scene
├── scripts/
│   ├── GameBootstrap.ts
│   ├── AudioDirector.ts
│   ├── config/GameConfig.ts
│   ├── core/JigsawCore.ts
│   └── platform/PlatformBridge.ts
├── resources/audio/
└── bundles/
    ├── blessing/pictures/
    ├── classic-a/pictures/
    ├── classic-b/pictures/
    └── classic-c/pictures/

docs/
├── ARCHITECTURE.md
├── WECHAT.md
└── DOUYIN.md
```

## 继续开发从哪里开始

- 改规则：`assets/scripts/core/JigsawCore.ts`
- 改关卡和图片：`assets/scripts/config/GameConfig.ts`
- 改界面和动画：`assets/scripts/GameBootstrap.ts`
- 改微信/抖音能力：`assets/scripts/platform/PlatformBridge.ts`
- 改声音：`assets/scripts/AudioDirector.ts`
- 查看架构：`docs/ARCHITECTURE.md`
- 构建微信：`docs/WECHAT.md`
- 构建抖音：`docs/DOUYIN.md`

## 自动验证

仓库构建流程会执行：

- Cocos 3.8.8类型检查；
- 纯TypeScript核心测试；
- 4个祝福包和60级经典配置检查；
- 棋盘/牌堆/碎片守恒；
- 确定性关卡生成；
- 组合重力；
- 快照与撤销；
- 死局检测不修改棋盘；
- 明确救场恢复路径；
- 78张图片与9个音效检查；
- Asset Bundle元数据检查；
- 项目ZIP重新打包。

## 仍需你自己的平台配置

工程可以直接预览和继续开发，但正式提审仍需在微信/抖音平台填写：

- AppID；
- 隐私政策；
- 分享素材；
- 相册权限用途；
- 登录、云存档；
- 广告位；
- 如使用远程资源，配置HTTPS域名。

这些信息属于你的平台账号，不应写死在通用工程中。
