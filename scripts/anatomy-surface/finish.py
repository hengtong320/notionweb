"""Finish the existing V17 candidate without modifying V16 or source anatomy."""
from pathlib import Path
import json
p = Path('fullbody-tcm-v17')
# The old manual binding checkbox duplicates the skin layer and, when cleared,
# can put markers back under an opaque skin. Skin mode owns binding now.
f = p / 'shared-v14.js'
s = f.read_text()
needle = "$('tissueClear').textContent='只留骨骼';"
assert needle in s
s = s.replace(needle, "$('surfaceAttach').closest('label').hidden=true;$('surfaceAttachNote').hidden=true;" + needle, 1)
f.write_text(s)
# Keep provenance inside the documentation; the usable controls stay shared.
for name in ['index.html', 'index.template.html', 'evidence.html', 'versions.html', 'app.js', 'learning-enhancements.js', 'shared-v14.js']:
    f = p / name
    if f.exists():
        s = f.read_text().replace('17.0.0','17.0.1')
        f.write_text(s)
# Extend, rather than replace, the previous actual browser click journey.
f = Path('atlas17-delivery/verify.cjs')
s = f.read_text().replace("version:'17.0.0'", "version:'17.0.1'")
needle = "ck('No uncaught errors',report.errors.length===0,report.errors);"
assert needle in s
extra = Path('scripts/anatomy-surface/extra-journey.cjs').read_text()
s = s.replace(needle, extra + '\n' + needle)
f.write_text(s)
(p/'README.md').write_text('''# V17.0.1 男女体表经络修复

体表显示不再依赖透视开关。点和线路按当前人体的真实皮肤网格投影，沿表面法线留出微小显示间距；线管按投影后的采样直接构建，避免二次曲线插值穿进皮肤。正常模式保留身体遮挡，透视只改变背侧点线是否可见，不挪动位置。

女性经络使用独立女性皮肤与分部位比例适配，不再被性别切换逻辑整体禁用。男女分别缓存贴面几何，共用经脉筛选、点选、穴名卡片和左右侧控件。自定义体表图层同样触发贴肤，不需要额外勾选旧版的“贴面显示”。

继续保留 V16 的平板布局和视角控制。原始男性、女性模型与原参照坐标不变。V16 保留在旧路径，可回退。

## 验证

checks/local-chromium.json 和 checks/local-webkit.json 记录真实浏览器点击、体表射线遮挡、男女往返、透视开关、线型、自定义图层、快速切换和视口检查；同目录有实际运行截图。local 代表仓库完整资产的本地服务，不等同于已验证公网部署。公网检测单独记录为 live-*。

## 适用范围

这是经络学习与体表关系示意，不是临床取穴系统。女性点位为独立体表的比例适配示意，并未完成逐穴临床配准。测试通过代表图形显示与交互检查通过，不代表经穴位置已逐一通过标准定位审核。
''', encoding='utf-8')
print('V17.0.1 finish and expanded journey ready')
