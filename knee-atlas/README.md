# 下肢骨骼图谱 · 大腿与膝（第二期扩展）

在线访问：https://hengtong320.github.io/notionweb/knee-atlas/

原足骨版：https://hengtong320.github.io/notionweb/foot-atlas/

原足踝与小腿版：https://hengtong320.github.io/notionweb/ankle-atlas/

## 本次内容
同源右侧股骨、髌骨，接续原有30块足踝与小腿骨。共32个独立骨块：30块常规下肢骨加2块额外拇趾籽骨。髌骨本身已计入30块常规下肢骨，不重复计数。

足部、足踝、小腿与足继续保留，新增膝部与下肢全览。膝部聚焦4块完整骨（股骨、髌骨、胫骨、腓骨）的局部，不表示腓骨直接参与股胫或髌股关节。髌骨与股骨相关节，不直接与胫骨相关节。

## 操作不变
浏览拖动旋转、滚轮缩放、右键平移。点骨识名，G拆骨、T转骨、R浏览；F聚焦、H归位、L标注，Esc退出单骨。支持整体展开、单独查看、邻骨强调、隐藏/显示、原位参考、分组配色、中文及拼音搜索、右侧单骨预览、截图、全屏。新增“后面”标准视角。

## 模型与边界
从既有Z-Anatomy / BodyParts3D派生骨架中提取，同一坐标与比例，不制作虚构几何；原30块骨的逐顶点位置与面索引均验证保留。具体校验与来源见assets/provenance.json。原两版目录不修改。

股骨上端的髋骨尚未加入；不含半月板、软骨、韧带或肌腱。本版是骨性结构观察，不是完整软组织膝关节、患者CT、骨内部剖面、真实关节运动或手法复位模拟。网格细节受上游分辨率限制。

模型遵循独立的CC BY-SA许可；应用代码为MIT。来源与许可见MODEL-LICENSES.txt。

## 资料
- OpenStax Anatomy & Physiology 2e, 8.4: https://openstax.org/books/anatomy-and-physiology-2e/pages/8-4-bones-of-the-lower-limb
- Z-Anatomy: https://github.com/Z-Anatomy/Models-of-human-anatomy

## 交付与验证
index.html内置全部网格、样式和渲染代码，可独立离线运行。qa中的浏览器报告、截图记录实际显示与鼠标操作结果。构建从固定的已认可版本提取，不覆盖foot-atlas/或ankle-atlas/。测试通过仅指所列项目，不等同于临床解剖认证或覆盖所有设备。
