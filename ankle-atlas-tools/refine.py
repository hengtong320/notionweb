from pathlib import Path
import base64,json,re,subprocess
base=Path(__file__).resolve().parents[1]/'ankle-atlas'
p=base/'app.js';text=p.read_text()
old="if(state.ready&&state.region==='foot'&&BY_ID[id].group==='leg')setRegion('leg',false);"
assert old in text
text=text.replace(old,"if(state.ready&&state.region==='foot'&&BY_ID[id].group==='leg')setRegion('leg');")
p.write_text(text)
(base/'README.md').write_text('''# 足踝图谱 · 小腿与足（第一期扩展）

在线访问：https://hengtong320.github.io/notionweb/ankle-atlas/

原足骨版保持不变：https://hengtong320.github.io/notionweb/foot-atlas/

## 本次仅增加

- 同源右侧胫骨、腓骨；原28块足骨（含2块籽骨）保留，共30个独立骨块。
- 左侧“足部 / 足踝 / 小腿与足”三个观察范围。
- 新骨中文名、难字拼音、解剖位置与主要邻接骨。

浏览、点选、拆骨、转骨、单独查看、观察相邻、隐藏、整体展开、原位参考、标注、分组颜色、归位、预览、截图、全屏和快捷键沿用足骨版。

“足踝”是镜头聚焦，小腿上端在视野外，不是截短模型。“小腿与足”显示完整胫腓骨。本期尚未加入股骨、髌骨，不是完整膝关节或全身骨架。

## 模型与文件

模型来自已有的 Z-Anatomy / BodyParts3D 派生骨架；新增骨与足骨使用同一坐标系。`assets/provenance.json` 记录网格来源和原28块骨的逐顶点坐标比较。`index.html` 内置全部模型和渲染引擎，离线打开无需再从模型站或CDN下载。

原足骨版固定基线：31d013bc909f0846beaa384cad647f12db8f7aa6。构建只写入新的 ankle-atlas/，不修改 foot-atlas/。

模型表面受源数据分辨率限制；没有韧带、软骨、骨髓腔、真实关节运动或复位模拟。自由拆解仅用于观察。来源与许可见 MODEL-LICENSES.txt 和网页的模型来源弹窗。

## 验证

`qa/offline-report.json`：阻断外部网络后的完整操作回归。
`qa/live-report.json`：公开网址与构建文件校验及真实鼠标操作。
`qa/webkit-smoke.json`：WebKit离线加载检查（不是所有交互回归）。
截图是真实浏览器渲染记录。请以对应报告中的 success 与日期为准；不会因为源代码写了功能就宣称已经验证。
''')
subprocess.run(['node','--check',str(p)],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(p),str(base/'app.bundle.js')],check=True)
h=(base/'index.template.html').read_text().replace('<link rel="stylesheet" href="styles.css">','<style>'+(base/'styles.css').read_text()+'</style>')
h=re.sub(r'<script type="importmap">.*?</script>','',h,flags=re.S)
bundle=(base/'app.bundle.js').read_text().replace('</script','<\\/script')
h=h.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((base/'assets/ankle.glb').read_bytes()).decode()+'";</script>\n<script>'+bundle+'</script>')
(base/'index.html').write_text(h)
info=json.loads((base/'build-info.json').read_text());info['htmlBytes']=len(h.encode());(base/'build-info.json').write_text(json.dumps(info,indent=2))
