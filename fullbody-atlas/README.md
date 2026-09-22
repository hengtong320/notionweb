# 全身骨骼研习室 · 第五期

在线入口：https://hengtong320.github.io/notionweb/fullbody-atlas/

原5个版本均保持不变。本版沿用原有风格、材质、交互，在原73个骨块基础上增加137块，覆盖成人常用206块标准骨，并保留4块额外拇趾籽骨。胸骨的柄、体、剑突作为同一选择对象，不虚构活动关节。

## 操作
浏览、拆骨、转骨、整体展开、单骨查看、相邻骨、隐藏、原位参考、归位、搜索、标注、配色、截图、全屏均沿用原版。新增头颅、听小骨、颈椎、胸椎、脊柱全览、胸廓、肩、上肢、肘、腕、手的观察范围。双侧与人体左右侧可切换。听小骨可切换人体左侧或右侧，微小结构宜单骨放大。全身标注只显示重点骨名，进入局部可以显示该区域全部骨名。

## 模型与边界
源文件固定于既有 Z-Anatomy / BodyParts3D 派生版本。所有源节点、处理记录、完整清单与73块原骨逐顶点比对见 assets/provenance.json。没有重新减面、伸缩、平滑或虚构骨形；原作者左右镜像变换仍保留，因此不是双侧独立扫描模型。合并胸骨的三个已有部分时不添加新表面。牙齿、鼻窦内容、软骨、椎间盘、韧带、脊髓与神经未加入；不能把空隙当成缺骨。本工具不是CT、骨内部剖面、关节活动或手法复位指导。206为常用成人清单，不否认个体数量变异。

index.html 内置全部模型和渲染引擎，可保存后离线运行，不依赖CDN或模型站。代码MIT；模型具有独立CC BY-SA许可，见 MODEL-LICENSES.txt。网页的中文学习说明为项目编写，资料只用于核对，不是解剖精度认证。

## 核验资料
- OpenStax 骨骼清单：https://openstax.org/books/anatomy-and-physiology-2e/pages/7-1-divisions-of-the-skeletal-system
- 颅骨：https://openstax.org/books/anatomy-and-physiology-2e/pages/7-2-the-skull
- 上肢：https://openstax.org/books/anatomy-and-physiology-2e/pages/8-2-bones-of-the-upper-limb
- 模型：https://github.com/Z-Anatomy/Models-of-human-anatomy

qa目录包含实际浏览器检查和截图，以具体报告结果为准。
