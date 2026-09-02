# 抖音小游戏构建与真机检查

## 构建

1. 使用 Cocos Creator **3.8.8** 打开工程。
2. 打开「项目 → 构建发布」。
3. 平台选择「字节跳动小游戏 / ByteDance Mini Game」。
4. 方向选择 `portrait`。
5. 填写你自己的抖音小游戏 AppID。
6. 建议启用高性能模式，正式测试时关闭调试构建。
7. 构建后使用抖音开发者工具打开输出目录。

工程提供 `profiles/v2/packages/bytedance-mini-game.json` 作为构建起点，AppID 和远程资源地址均为空。

## 分包与资源

`blessing、classic-a、classic-b、classic-c` 已配置成小游戏分包。进入关卡时，Cocos 只加载该关需要的 Bundle；切换到无关内容后释放纹理和 Bundle。

如果后期图片数量继续增长，可以把较低频内容改为远程 Bundle，并在抖音开放平台配置合法 HTTPS 域名。首版建议先使用本地分包，减少网络域名和缓存策略变量。

## 已封装的平台能力

`PlatformBridge` 会在存在 `tt` 时启用：

- `tt.onShow` / `tt.onHide`；
- `tt.showShareMenu`；
- `tt.onShareAppMessage`；
- `tt.shareAppMessage`；
- `tt.canvasToTempFilePath`；
- `tt.saveImageToPhotosAlbum`；
- `tt.setPreferredFramesPerSecond`；
- `tt.setKeepScreenOn`；
- 本地存储与震动。

正式上线前还需要在开放平台完成：

- 分享素材和文案配置；
- 隐私政策及相册权限用途；
- 侧边栏复访入口；
- 登录与云存档；
- 广告位申请和审核；
- 如果做录屏分享，再增加录屏开始、停止和视频分享流程。

## 真机验收

重点覆盖：

- Android 与 iOS 抖音；
- 普通模式与高性能模式；
- 前后台切换、录屏浮层、私信分享返回；
- 弱网分包下载；
- 低内存设备连续切换多个图片包；
- 直升机5×5困难关长时间操作；
- 保存图片权限拒绝与重新授权；
- 分享卡片带 `pack` 参数回流对应主题。

抖音版后续最值得增加的是：把“最后一步拼合 → 连锁 → 多图合辑展开”录成6—10秒短视频，再使用平台视频分享能力分发；这部分与静态合辑分享应当作为独立模块接入，不要写进规则内核。
