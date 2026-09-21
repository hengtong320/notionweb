# 骨盆与下肢图谱 · 第三期扩展

在线访问：https://hengtong320.github.io/notionweb/hip-atlas/

本期在已认可的 knee-atlas 基础上新增左右髋骨、骶骨、尾骨，共36个独立骨块：原32个右下肢骨块（含2个额外拇趾籽骨）＋4块骨盆骨。骨盆不是只有右半边；左髋骨也已加入，但左下肢和腰椎尚未加入。

## 原来三个版本保持不变
- 足部：https://hengtong320.github.io/notionweb/foot-atlas/
- 足踝与小腿：https://hengtong320.github.io/notionweb/ankle-atlas/
- 大腿与膝：https://hengtong320.github.io/notionweb/knee-atlas/

## 观察与操作
新入口：右髋部、骨盆、骨盆与下肢。足部、足踝、小腿与足、膝部、下肢全览均保留。
浏览旋转、缩放、平移、点骨识名、G拆骨、T转骨、单独查看、邻骨强调、隐藏、整体展开、原位参考、单骨与全体归位、中文/拼音搜索、分组配色、预览、截图及全屏沿用原来的实现。
“右髋部”聚焦右髋骨与完整股骨的上端，不是切掉股骨下端。“骨盆”显示四块骨。“骨盆与下肢”显示完整骨盆和右侧下肢。
成人髋骨作为一块整体显示，髂骨（qià）、坐骨、耻骨是其融合区域，不当作可分离关节。骶骨读dǐ gǔ，髋骨读kuān gǔ。

## 模型与边界
来源同前版：Z-Anatomy / BodyParts3D 派生骨架，Git blob 5e15f7ea303c554f6c25a417f7f184696234b436。保留源文件中左右髋骨的网格和变换，包括源文件发布的左侧反射变换。未新增细分、平滑、减面、伸缩或虚构几何。新模型与原32块骨处于同一坐标系；原骨顶点坐标和面索引逐一比较。

不包含腰椎、左侧下肢、关节软骨、髋臼唇、韧带、耻骨间盘及其他软组织。自由拆解不是关节运动模拟或手法复位指导，表面模型也不是患者CT或骨内部剖面，不宣称临床级精度。骨盆观察中的空隙不可理解为生理上没有软组织。

## 来源
- OpenStax Anatomy & Physiology 2e §8.3：https://openstax.org/books/anatomy-and-physiology-2e/pages/8-3-the-pelvic-girdle-and-pelvis
- Z-Anatomy：https://github.com/Z-Anatomy/Models-of-human-anatomy
- 查看 MODEL-LICENSES.txt 和 assets/provenance.json 了解许可与逐骨处理记录。

## 构建与验证
index.html内置网格、样式和渲染代码，可独立离线运行。qa目录保留实际浏览器截图和离线、线上、WebKit测试报告。测试结果仅覆盖报告所列项目，不能等同于对所有电脑或解剖精度的认证。
构建基线085381cbf6ee7cb014a01caa06913cb5ada8a934；仅新建hip-atlas/及相应构建工具，三个旧版目录保持不变。
