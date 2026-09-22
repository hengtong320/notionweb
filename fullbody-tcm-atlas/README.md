# 全身骨骼研习室 · 经络学习增强版

在线入口：https://hengtong320.github.io/notionweb/fullbody-tcm-atlas/

基于已验收的 fullbody-atlas，不修改此前版本。新增：完整骨名拼音、浏览器中文朗读、14条经脉/361标准经穴名称的可开关3D学习层、穴位与附近骨性参照、少量高价值学习焦点。

## 经络穴位的定位边界
经穴名称、拼音、经脉归属以WHO标准命名体系、GB/T 12346-2021和TARA机器可读数据进行交叉核对。网页不复制WHO整段定位原文。由于本项目底层是骨骼表面模型而非真人皮肤/软组织模型，穴位标记沿经脉与骨性标志映射为**3D学习示意**；它用于理解“穴位大致位于哪些骨性结构附近”，不是个体针刺定位、进针深度、方向或治疗指导。人体取穴应依据体表标志、骨度分寸和个体比例。

## 朗读
所有210个骨块都有带声调拼音。点击骨骼可自动调用浏览器 Web Speech API 朗读中文骨名，也可以关闭自动朗读或手动点“朗读骨名”。语音音色取决于操作系统/浏览器安装的中文语音。

## 数据来源
- WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008)
- GB/T 12346-2021 经穴名称与定位（现行推荐性国家标准）
- SciCrunch TARA Acupoints Ontology（仅抽取代码、名称、拼音、经脉归属；构建固定到提交 b488d0bf855eef17a131946bd387d6e2e9dfa26d）
- 原骨骼模型与许可沿用 fullbody-atlas。
