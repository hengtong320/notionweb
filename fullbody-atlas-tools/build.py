from pathlib import Path
import json,re,base64,subprocess,hashlib,os
from catalog import ADDED,GROUPS
from membership import create as create_membership
ROOT=Path(__file__).resolve().parents[1];P=ROOT/'fullbody-atlas';T=ROOT/'fullbody-atlas-tools'
info=json.loads((P/'build-info.json').read_text())
prior=(P/'bones-data.js').read_text();(P/'baseline-data.js').write_text(prior)
membership=create_membership(P)
order=['cranial','facial','head-other','cervical','thoracic','lumbar','thorax','shoulder','arm','carpal','metacarpal','hand-phalanges','pelvis','thigh','leg','tarsal','metatarsal','phalanges','sesamoid']
notes="""import {BONES as OLD,GROUPS as OG,SOURCES as OS} from './baseline-data.js';
import ADDED from './additions.json';import AG from './additional-groups.json';
const order=ORDER;
export const BONES=[...OLD.map(b=>({...b,neighbors:[...b.neighbors]})),...ADDED];
const by=Object.fromEntries(BONES.map(b=>[b.id,b]));
for(const b of BONES)b.studyRegion={cranial:'head',facial:'head','head-other':b.id==='hyoid'?'head':'auditory',cervical:'cervical',thoracic:'thoracic',lumbar:'lumbar',thorax:'thorax',shoulder:'shoulder',arm:'upper',carpal:'hand',metacarpal:'hand','hand-phalanges':'hand',pelvis:'pelvis',thigh:'knee',leg:'leg'}[b.group]||'foot';
by.L1.neighbors=[...new Set(['T12',...by.L1.neighbors])];
for(const b of BONES){b.neighbors=[...new Set(b.neighbors)].filter(n=>n!==b.id);for(const id of b.neighbors)if(!by[id])throw Error('Unknown neighbor '+id+' of '+b.id);}
export const GROUPS=[...AG,...OG].sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
BONES.sort((a,b)=>order.indexOf(a.group)-order.indexOf(b.group));
export const BY_ID=Object.fromEntries(BONES.map((b,i)=>[b.id,{...b,index:i+1}]));
export const SOURCES=[...OS,{title:'OpenStax · 成人骨骼清单核对',url:'https://openstax.org/books/anatomy-and-physiology-2e/pages/7-1-divisions-of-the-skeletal-system',note:'骨名、分类与计数核对；中文学习说明为本项目另行撰写。'},{title:'OpenStax · 颅骨与上肢',url:'https://openstax.org/books/anatomy-and-physiology-2e/pages/7-2-the-skull',note:'用于核对颅骨构成；不是模型精度认证。'}];
if(BONES.length!==210||new Set(BONES.map(b=>b.id)).size!==210)throw Error('Bone manifest incomplete');
for(const g of GROUPS)if(BONES.filter(b=>b.group===g.id).length!==g.count)throw Error('Group count mismatch '+g.id);
""".replace('ORDER',json.dumps(order));(P/'bones-data.js').write_text(notes)
s=(P/'app.js').read_text()
s=s.replace("region:'all',side:'both',ready:false,selected:'L5'","region:'body',side:'both',ready:false,selected:'sternum'")
s=s.replace('/ 73','/ 210').replace('!==73','!==210').replace('需要73块','需要210块').replace('tris!==84444','tris!=='+str(info['totalTriangles'])).replace('./assets/lumbar.glb','./assets/fullbody.glb')
s=s.replace("selectBone('L5');resize();setRegion('all')","selectBone('sternum');resize();setRegion('body')").replace("bindUI();selectBone('hip-right')","bindUI();selectBone('sternum')")
s=s.replace('腰椎与双下肢图谱','全身骨骼研习室')
a=s.index('const REGION_LABELS=');z=s.index('const VIEWS=',a)
actions=s[s.index('function setSide(',a):s.index('function revealBone(',a)]
actions=actions.replace("candidate=side==='left'?b.baseId+'-left':b.baseId","candidate=matchingSide(b,side)")
navigation='const REGION_MEMBERSHIP='+json.dumps(membership,separators=(',',':'))+';\n'+''.join((T/f).read_text()+'\n' for f in ['region-definitions.js','region-membership.js','region-ui.js','bone-routing.js'])+actions
s=s[:a]+navigation+'\n'+s[z:]
s=s.replace("globalSide=FIXED_REGIONS.has(state.region)||state.side==='both';","globalSide=FIXED_REGIONS.has(state.region)||state.side==='both'||['body','head','thorax','auditory'].includes(state.region);")
s=s.replace("if(state.region==='hip')v.dir=[-1,.24,1.6];","if(state.region==='hip')v.dir=[-1,.24,1.6];if(['cervical','thoracic','spine','head'].includes(state.region))v.dir=[-.85,.22,1.6];if(['hand','wrist'].includes(state.region))v.dir=[-.3,.05,1.8];")
s=s.replace("if(!['ankle','knee','hip'].includes(state.region))return;","if(!['ankle','knee','hip','shoulder','elbow','wrist'].includes(state.region))return;")
s=s.replace("box.union(bounds);","""if(state.region==='shoulder'&&data.baseId==='humerus')bounds.min.y=bounds.max.y-170;
  if(state.region==='elbow'){if(data.baseId==='humerus')bounds.max.y=bounds.min.y+130;else bounds.min.y=bounds.max.y-130;}
  if(state.region==='wrist'&&['radius','ulna'].includes(data.baseId))bounds.max.y=bounds.min.y+100;
  box.union(bounds);""")
a=s.index('function explosionVector(');z=s.index('function setExplode',a)
s=s[:a]+"""function explosionVector(id,home){
 const b=BY_ID[id],sgn=b.side==='left'?1:-1;
 if(b.group==='cervical'||b.group==='thoracic'){const i=Number(id.slice(1)),n=b.group==='cervical'?7:12;return new THREE.Vector3((i%2?1:-1)*40,(n-i)*24+70,-50-i*10);}
 if(b.group==='thorax'){if(id==='sternum')return new THREE.Vector3(0,20,180);const i=Number(id.split('-')[1]);return new THREE.Vector3(sgn*(100+i*7),(7-i)*13,30);}
 if(['cranial','facial'].includes(b.group)){const v=home.clone().sub(new THREE.Vector3(PATIENT_MIDLINE_X,1535,-100));if(v.lengthSq()<1)v.set(0,1,0);return v.normalize().multiplyScalar(b.group==='cranial'?155:95);}
 if(b.group==='head-other')return id==='hyoid'?new THREE.Vector3(0,-60,100):new THREE.Vector3(sgn*(id.startsWith('malleus')?50:id.startsWith('incus')?80:110),15,30);
 if(b.group==='shoulder')return new THREE.Vector3(sgn*180,55,b.baseId==='clavicle'?90:-90);
 if(b.group==='arm')return new THREE.Vector3(sgn*(b.baseId==='humerus'?155:b.baseId==='radius'?210:280),b.baseId==='humerus'?50:-30,40);
 if(HAND_GROUPS.has(b.group)){const i=Number(b.baseId.split('-').at(-1))||1,v=new THREE.Vector3(sgn*(90+i*18),-35,25);if(b.group==='hand-phalanges')v.y-=b.baseId.includes('distal')?115:b.baseId.includes('middle')?80:50;if(b.group==='carpal')v.set(sgn*(65+(BONES.findIndex(x=>x.id===id)%4)*18),10,((BONES.findIndex(x=>x.id===id)%3)-1)*50);return v;}
 let v;if(b.group==='lumbar'){const i=Number(id[1]);return new THREE.Vector3((i%2?1:-1)*28,(6-i)*28+40,-35-i*15);}
 if(b.side==='left'&&b.group!=='pelvis'){const h=home.clone();h.x=2*PATIENT_MIDLINE_X-h.x;v=baselineExplosion(b.baseId,h);v.x*=-1;}else v=baselineExplosion(id,home);
 if(state.side==='both'&&!['lumbar','pelvis'].includes(b.group))v.x+=b.side==='left'?105:-105;
 return v;
}
"""+s[z:]
s=s.replace("const ids=state.labels?","let ids=state.labels?")
s=s.replace(",svg=document.createElementNS('http://www.w3.org/2000/svg','svg');", ";if(state.region==='body'&&ids.length>90){const key=new Set(['frontal','mandible','hyoid','C1','C7','T6','T12','L3','sacrum','coccyx','hip-right','hip-left','sternum','clavicle-right','clavicle-left','scapula-right','scapula-left','humerus-right','humerus-left','radius-right','radius-left','ulna-right','ulna-left','femur','femur-left','patella','patella-left','tibia','tibia-left','fibula','fibula-left','calcaneus','calcaneus-left','hand-metacarpal-3-right','hand-metacarpal-3-left','rib-7-right','rib-7-left',state.selected]);ids=ids.filter(id=>key.has(id));}const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');")
s=s.replace('distance=Math.max(distance,28)','distance=Math.max(distance,state.isolated||onlySelected?10:28)')
s=s.replace('getState:()=>({region:',"getCatalog:()=>BONES.map(b=>({id:b.id,name:b.name,group:b.group,side:b.side,baseId:b.baseId,neighbors:[...b.neighbors]})),getState:()=>({region:")
(P/'app.js').write_text(s)
h=(P/'index.template.html').read_text()
h=h.replace('腰椎与双下肢图谱','全身骨骼研习室').replace('Lumbar & Lower Limb Atlas','Full-body Skeletal Atlas').replace('LUMBAR & LOWER LIMBS','HUMAN SKELETAL ATLAS').replace('腰椎与双腿 · 第四期','全身骨骼 · 第五期').replace('> 下肢 <','> 全身 <').replace('https://hengtong320.github.io/notionweb/hip-atlas/','https://hengtong320.github.io/notionweb/lumbar-atlas/').replace('上一版：骨盆与下肢','上一版：腰椎与双腿')
newregions=[('body','全身总览'),('head','头颅与舌骨'),('auditory','听小骨'),('cervical','颈椎'),('thoracic','胸椎'),('spine','脊柱全览'),('thorax','胸廓'),('shoulder','肩部'),('upper','上肢全览'),('elbow','肘部'),('wrist','腕部'),('hand','手部')]
h=h.replace('<button data-region="all" class="active">','<button data-region="all">')
h=h.replace('<div class="region-picker" aria-label="观察部位">','<div class="region-picker" aria-label="观察部位">'+''.join(f'<button data-region="{id}"'+(' class="active"' if id=='body' else '')+'>'+cn+'</button>' for id,cn in newregions))
h=h.replace('>73<','>210<').replace('/ 73','/ 210').replace('双侧完整下肢 + 骨盆 + 腰椎 · 73 块','全身骨骼已接入 · 210 个独立对象').replace('双下肢 64 + 骨盆 4 + 腰椎 5','206 块标准骨 + 4 块足部籽骨').replace('64 块下肢骨中含 4 块额外拇趾籽骨。','按成人常用清单核对，牙齿不计为骨。').replace('84,444',f"{info['totalTriangles']:,}").replace('双腿64 + 骨盆4 + 腰椎5','206 标准骨 + 4 足部籽骨')
h=re.sub(r'<p class="source-intro">.*?</p>',lambda m:'<p class="source-intro">本版包含成人常用清单的206块骨，加上原有4块足部籽骨。源模型来自 Z-Anatomy / BodyParts3D；原73块骨保持不变，新增137块骨。包含完整脊柱、胸廓、双上肢和手、颅骨、舌骨与6块听小骨。胸骨的三个源部件按一块骨处理；牙齿、肋软骨、椎间盘、鼻软骨、鼻窦内容物不当作骨头。仍为表面教学模型，不代表患者CT或临床精度。多数左侧沿用源文件镜像变换。</p>' if '本版沿用' in m.group() else '<p class="source-intro">支持逐骨拆开、旋转与归位，但骨缝、成人髋骨的融合区以及胸骨各部并非可任意活动的关节。没有加入软骨、关节盘、韧带、神经或脊髓；骨间空隙不能理解为没有软组织。听小骨请使用单侧或单骨观察。全身标注只显示重点骨名；进入各局部区域可查看全部标注。</p>',h)
h=h.replace('左侧可切换足部至腰椎的观察区域','左侧可切换全身或各个局部观察区域').replace('探索腰椎与双下肢','探索全身骨骼')
h=h.replace('腰椎、骨盆与双下肢 <span>Lumbar spine &amp; lower limbs</span>','全身骨骼 <span>Complete skeleton</span>')
(P/'index.template.html').write_text(h)
css=(P/'styles.css').read_text()+"""\n/* Same components, with a scrollable region chooser for the complete inventory. */
.region-picker{max-height:186px;overflow-y:auto;flex-shrink:0;scrollbar-width:thin}.bone-select{min-width:0}.bone-select>span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.stage-heading h2{font-size:24px}.region-hint{min-height:30px}.sidebar-bottom strong{font-size:11px}
@media(max-height:820px){.region-picker{max-height:126px}.sidebar-intro{padding-top:12px;padding-bottom:8px}.sidebar-intro .eyebrow{display:none}}
"""
(P/'styles.css').write_text(css)
subprocess.run(['node','--check',str(P/'app.js')],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(P/'app.js'),str(P/'app.bundle.js')],check=True)
h=h.replace('<link rel="stylesheet" href="styles.css">','<style>'+css+'</style>');h=re.sub(r'<script type="importmap">.*?</script>','',h,flags=re.S)
h=h.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((P/'assets/fullbody.glb').read_bytes()).decode()+'";</script>\n<script>'+(P/'app.bundle.js').read_text().replace('</script','<\\/script')+'</script>')
(P/'index.html').write_text(h);info.update(htmlBytes=len(h.encode()),htmlSHA256=hashlib.sha256(h.encode()).hexdigest());(P/'build-info.json').write_text(json.dumps(info,indent=2))
(P/'README.md').write_text('''# 全身骨骼研习室 · 第五期

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
''')
print('BUILD_OK',json.dumps(info))
