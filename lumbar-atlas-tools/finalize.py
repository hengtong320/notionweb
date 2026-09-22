from pathlib import Path
import json,hashlib,re,base64,subprocess
ROOT=Path(__file__).resolve().parents[1];p=ROOT/'lumbar-atlas'
s=(p/'app.js').read_text().replace('骨盆与下肢图谱 · 右下肢','腰椎与双下肢图谱');(p/'app.js').write_text(s)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(p/'app.js'),str(p/'app.bundle.js')],check=True)
h=(p/'index.template.html').read_text().replace('<link rel="stylesheet" href="styles.css">','<style>'+(p/'styles.css').read_text()+'</style>')
h=re.sub(r'<script type="importmap">.*?</script>','',h,flags=re.S)
h=h.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((p/'assets/lumbar.glb').read_bytes()).decode()+'";</script>\n<script>'+(p/'app.bundle.js').read_text().replace('</script','<\\/script')+'</script>')
(p/'index.html').write_text(h)
info=json.loads((p/'build-info.json').read_text());info.update({'htmlSHA256':hashlib.sha256(h.encode()).hexdigest(),'htmlBytes':len(h.encode())});(p/'build-info.json').write_text(json.dumps(info,indent=2))
(p/'README.md').write_text('''# 腰椎与双下肢图谱 · 第四期扩展

在线访问：https://hengtong320.github.io/notionweb/lumbar-atlas/

原来四版 foot-atlas、ankle-atlas、knee-atlas、hip-atlas 保持不变。本版补齐源文件中的左侧下肢32块骨，并增加五节腰椎L1—L5。共73个独立骨块：双下肢64、骨盆4、腰椎5，其中包含4块额外拇趾籽骨。髌骨已计入常规骨，不重复计算。

## 左右与操作
左右指人体自身，不随画面转动改变；正面看时人体右腿通常位于画面左边。原先是右下肢，本版补齐左下肢。左侧采用源文件原作者已发布的网格与反射变换，不是独立扫描的双侧个体差异模型。

所有原有操作继续保留：点选识名、G拆骨、T转骨、R浏览、缩放、平移、单骨观察、邻骨强调、隐藏、展开、原位参考、归位、搜索、配色、预览、截图及全屏。增加双侧/人体右侧/人体左侧切换及腰椎、腰骶与骨盆、腰椎与双腿范围。髋、膝、踝仅镜头聚焦，长骨没有被截短。

腰椎、骨盆和腰骶与骨盆为固定中轴观察区域，左右切换暂不可用；切到肢体或全览范围即可使用。切换保留手动拆解状态，一键归位恢复。

## 来源与边界
继续使用固定的 Z-Anatomy/BodyParts3D 派生骨架，source blob 5e15f7ea303c554f6c25a417f7f184696234b436。原36块骨的顶点、面索引和坐标均核对保留。新增网格使用明确的源节点与原始变换，见 assets/provenance.json。

本期未包含胸椎、颈椎、上肢、头颅、椎间盘、软骨、韧带、神经或脊髓。骨间间隙不表示没有软组织。仅观察骨性结构，不是患者CT、疾病模拟、真实关节运动或手法复位指导。成人髋骨与骶骨不人为拆成活动关节。

index.html 内置所有模型、样式及渲染代码，支持独立离线运行。qa中的报告与截图记录实际环境、测试项目和结果，不代表所有设备或临床精度认证。代码MIT；模型有单独CC BY-SA许可，见MODEL-LICENSES.txt。
''')
print(json.dumps(info))
