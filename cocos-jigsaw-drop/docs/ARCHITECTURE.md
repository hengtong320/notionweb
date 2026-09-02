# Jigsaw Drop Cocos 架构说明

## 目标

本工程不再是把 H5 页面放进 WebView，而是以 Cocos Creator 3.8.8 原生 2D 渲染重新实现。核心要求：

- Web、微信小游戏、抖音小游戏共用一套 TypeScript 规则；
- 棋盘逻辑与动画彻底分离；
- 图片按 Asset Bundle / 小游戏分包按需载入；
- 手机安全区、前后台生命周期、触摸取消与多尺寸布局统一处理；
- 项目可以直接交给其他开发者继续增加关卡、平台能力和商业化模块。

## 目录

```text
assets/
├── scenes/Main.scene
├── scripts/
│   ├── GameBootstrap.ts            # 应用、界面、棋盘表现与结算导演
│   ├── AudioDirector.ts            # 音效加载与分层反馈
│   ├── config/GameConfig.ts        # 78张图片、4个祝福包、经典关卡曲线
│   ├── core/JigsawCore.ts          # 纯TypeScript规则内核
│   └── platform/PlatformBridge.ts  # Web / wx / tt平台适配
├── resources/audio/                # 只留小体积首包音效
└── bundles/
    ├── blessing/                   # 18张写实图
    ├── classic-a/                  # 经典1—20
    ├── classic-b/                  # 经典21—40
    └── classic-c/                  # 经典41—60
```

## 规则层

`JigsawCore` 不引用 `cc`，可在 Node.js 中独立测试。它负责：

- 4×4 / 5×5 棋盘生成；
- 每张完整图四个象限；
- 单块、已拼组合和长按拆块；
- 形状区域交换；
- 组合优先重力与单侧悬空拆分；
- 完整图片识别、清除与按列发牌；
- 下一张牌预览；
- 提示搜索；
- 快照与一步撤销；
- 死局检测；
- 由玩家明确触发的救场，不在后台偷偷换牌；
- 棋盘、牌堆与碎片守恒校验。

结算顺序固定为：

```text
移动完成
→ 重力一直结算到稳定
→ 新拼合反馈
→ 完整图片清除
→ 再次重力
→ 按列发牌
→ 重复至稳定
```

动画掉帧不会改变规则结果。

## 表现层

`GameBootstrap` 运行时构建以下界面：

- 首页；
- 四档写实祝福关卡选择；
- 60级经典模式；
- 游戏顶部工具、牌堆预览、棋盘、FLOW、状态栏；
- 设置；
- 完成后的多图祝福合辑；
- 横屏提示、安全区适配和消息提示。

碎片使用一张完整纹理的四个 `SpriteFrame` 象限。正确拼合后，额外创建一个 `Mask.Type.GRAPHICS_STENCIL` 联合遮罩，用同一张完整纹理覆盖组合成员，因此静止状态下内部不依赖四个 Sprite 边缘拼接。

## 平台层

`PlatformBridge` 统一封装：

- `wx` / `tt` / Web 环境识别；
- `onShow` / `onHide`；
- 启动参数；
- 安全区和系统信息；
- 帧率与常亮；
- 本地存储；
- 震动；
- 主动和被动分享；
- Canvas 截图；
- 保存图片到相册。

业务代码不得直接散落 `wx.*` 或 `tt.*` 判断。新增平台时实现同一接口即可。

## 资源与分包

四个图片目录都配置为 Cocos Asset Bundle：

- 微信 `wechatgame`：`subpackage`；
- 抖音 `bytedance-mini-game`：`subpackage`；
- Web：`merge_dep`。

切换关卡时只载入该关需要的 Bundle 与图片。切换到不再使用的 Bundle 后，销毁裁剪 SpriteFrame、释放 Bundle 资源并移除缓存。

## 内容扩展

增加一张图：

1. 把原图放到对应 Bundle 的 `pictures` 目录；
2. 在 `GameConfig.ts` 增加 `PictureDefinition`；
3. 把 key 加入关卡包或经典图库；
4. 运行核心测试，确认每张图片 key 唯一。

增加一个祝福包：

1. 在 `BLESSING_PACKS` 中增加配置；
2. 设置棋盘、图片、随机种子、FLOW、提示次数和祝福文案；
3. 首页关卡选择会自动生成新卡片。

增加平台功能：

1. 先扩展 `PlatformBridge` 接口；
2. 在 `UniversalBridge` 中分别实现 wx / tt / Web；
3. 表现层只调用统一接口。
