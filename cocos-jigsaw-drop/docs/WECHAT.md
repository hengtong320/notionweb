# 微信小游戏构建与真机检查

## 打开工程

1. 使用 Cocos Dashboard 安装 **Cocos Creator 3.8.8**。
2. 打开 `cocos-jigsaw-drop` 根目录。
3. 等待首次导入完成，双击 `assets/scenes/Main.scene`。
4. 先用浏览器预览确认首页、祝福关、经典关和结果页正常。

## 构建

1. 打开「项目 → 构建发布」。
2. 选择「微信小游戏」。
3. 方向选择 `portrait`。
4. 填写你自己的微信小游戏 AppID；仓库不包含任何真实 AppID。
5. 建议保留：
   - 主包分包模式；
   - 分离引擎；
   - 高性能模式；
   - 关闭调试构建后再测最终包体。
6. 点击构建，再用微信开发者工具打开输出目录。

工程内已提供 `profiles/v2/packages/wechatgame.json` 作为竖屏构建起点，AppID 保持为空，避免误用他人凭据。

## 分包

以下目录已配置为 Asset Bundle，并在微信构建中使用 `subpackage`：

```text
blessing
classic-a
classic-b
classic-c
```

首包只应包含：

- Main 场景；
- TypeScript 逻辑；
- 运行时绘制 UI；
- 少量 WAV 音效。

78张大图片不应进入主包。

## 分享与保存

`PlatformBridge` 已接入：

- `wx.showShareMenu`；
- `wx.onShareAppMessage`；
- `wx.onShareTimeline`；
- `wx.shareAppMessage`；
- Canvas 临时图片导出；
- `wx.saveImageToPhotosAlbum`；
- 本地存储、震动、前后台生命周期。

正式提审前仍需在微信公众平台完成：

- 分享文案和封面审核；
- 隐私保护指引；
- 保存相册用途说明；
- 必要的用户授权说明；
- 如改用远程 Bundle，配置 HTTPS 下载域名。

## 真机验收

至少覆盖：

- iPhone 刘海屏、灵动岛机型；
- 普通 iPhone；
- Android 高屏占比设备；
- 低端 Android；
- 从聊天卡片进入；
- 从后台返回；
- 来电/锁屏后恢复；
- 多指触摸和系统侧滑取消；
- 拒绝相册权限后再次保存；
- 弱网首次下载分包；
- 缓存后的二次启动。

重点观察：

- 顶部按钮不被状态栏遮挡；
- 底部按钮不落入 Home Indicator；
- 拖动时不会被页面滚动或多指打断；
- 5×5 棋盘在小屏仍完整；
- 分享结果图不包含操作按钮；
- 分包加载失败能返回首页并重试。
