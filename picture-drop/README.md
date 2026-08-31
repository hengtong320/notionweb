# Jigsaw Drop · 拼图落落

根据参考录屏的核心玩法重新实现的一款原创 H5 拼图消除游戏。纯原生 HTML、CSS、JavaScript，无前端框架和外部接口依赖。

## 在线体验

<https://hengtong320.github.io/notionweb/picture-drop/>

## 下载与本地游玩

- 完整压缩包：<https://hengtong320.github.io/notionweb/picture-drop/Jigsaw-Drop-H5-v1.0.zip>
- 单文件离线版：<https://hengtong320.github.io/notionweb/picture-drop/Jigsaw-Drop-offline.html>
- 下载后最方便的方式：直接双击单文件离线版。
- 完整工程：双击 `index.html`；或在项目目录运行 `python3 -m http.server 8080` 后访问 `http://localhost:8080`。

## 已实现

- 36 张原创主题图片及完整图片图鉴
- 4×4 棋盘，图片四分块和正确方位吸附
- 单块、横向、纵向和 L 形组合整体拖动
- 多格区域交换、非法落点提示与回弹
- 2×2 完成后放大、高光、粒子与消除
- 已拼组合保持刚性整体下落，顶部牌堆翻面补牌
- Combo、音效、震动、星级、成绩与本地进度
- 首页、关卡推进、提示、自动一步、设置与图鉴
- 手机竖屏、桌面端、刘海安全区和 PWA 离线缓存

## 文件结构

```text
index.html                  页面结构
style.css                   UI、响应式和动效
game.js                     棋盘规则、关卡、交互和状态机
assets/pictures/            36 张原创 WebP 图片
assets/icons/               PWA 图标
tools/generate_pictures.py  图片生成脚本
tools/generate_icons.py     图标生成脚本
tools/build_standalone.py    单文件离线版构建脚本
sw.js                       离线缓存
manifest.webmanifest        PWA 配置
```

## 说明

本项目只参考玩法机制，未使用参考游戏的名称、代码、图片、商标或关卡数据。
