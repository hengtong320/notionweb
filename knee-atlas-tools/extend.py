"""Add content and region scopes to the approved viewer, without restyling it."""
from pathlib import Path
import base64,hashlib,json,re,subprocess
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'knee-atlas'
meta=json.loads((OUT/'assets/provenance.json').read_text());info=json.loads((OUT/'build-info.json').read_text())
p=OUT/'bones-data.js';s=p.read_text()
addition="""
// Additional knee/thigh study notes; original bone entries and ordering retained.
GROUPS.unshift({id:'thigh',name:'大腿与膝',pinyin:'',en:'Thigh & knee',count:2,color:'#b59772'});
BONES.push(
 {id:'femur',name:'股骨',en:'Femur',group:'thigh',region:'大腿',feature:'股骨头、股骨颈、大小转子、内外侧髁',description:'大腿中的长骨。近端的股骨头朝向内侧，与髋骨的髋臼形成髋关节；本期尚未加入髋骨。远端的内、外侧髁与胫骨上端构成膝关节的骨性部分，前方的髌面与髌骨相关节。股骨不直接与腓骨相关节。',look:'先在“下肢全览”看股骨的完整形状；单独查看后比较近端的圆形股骨头和远端的两侧髁（kē）。再切到“膝部”，移开髌骨，查看股骨远端前方的髌面；转到后面看髁间窝。',neighbors:['tibia','patella'],tip:'股骨头在上端、朝内侧；膝部在下端。髁读 kē。上方髋骨尚未加入。'},
 {id:'patella',name:'髌骨',pinyin:'bìn gǔ',en:'Patella',group:'thigh',region:'膝前方',feature:'前面、后方关节面、底与尖',description:'俗称膝盖骨，位于膝关节前方，包埋于股四头肌腱中，是一块籽骨。后方关节面与股骨的髌面相关节，并不直接与胫骨形成关节。本模型没有显示肌腱、髌韧带或关节软骨。',look:'在“膝部”从前方找到这块小骨。使用“拆骨”把它向旁边移出，再用“转骨”比较前面和朝向股骨的后面；单独查看可避免周围骨头遮挡。',neighbors:['femur'],tip:'髌骨读 bìn gǔ。它接触股骨，不直接与胫骨相关节；不要把自由拆解当作真实运动。'}
);
const tibiaEntry=BONES.find(b=>b.id==='tibia');
tibiaEntry.neighbors=['femur',...tibiaEntry.neighbors];
tibiaEntry.description='小腿内侧较粗壮的长骨，上端内、外侧髁与股骨远端构成膝关节的骨性部分；外侧与腓骨相邻。下端向内延伸形成内踝，与距骨共同参与踝关节。本期已加入股骨、髌骨，可切换“膝部”观察上下衔接。';
tibiaEntry.look='先沿完整骨干比较上下两端，再切换“膝部”看上端胫骨平台与股骨的关系；切换“足踝”看下端及内踝。膝部的间隙不代表空无一物，本版没有显示半月板和软骨。';
"""
assert 'export const BY_ID=' in s;s=s.replace('export const BY_ID=',addition+'\nexport const BY_ID=',1)
s=s.replace('OpenStax · 小腿骨与踝部解剖','OpenStax · 下肢骨与膝部解剖').replace('新增胫骨、腓骨、内外踝及其骨性关系的教学参考。','股骨、髌骨、胫腓骨及膝踝骨性关系的教学参考。')
p.write_text(s)
p=OUT/'app.js';s=p.read_text()
def replace(old,new):
    global s
    assert old in s,'Missing approved source fragment: '+old[:120]
    s=s.replace(old,new,1)
replace("const state={region:'leg',ready:false,selected:'talus'","const state={region:'whole',ready:false,selected:'patella'")
replace("if(state.ready&&state.region==='foot'&&BY_ID[id].group==='leg')setRegion('leg');","if(state.ready&&!regionContains(id))setRegion(BY_ID[id].group==='thigh'?'knee':BY_ID[id].group==='leg'?'leg':'foot');")
s=s.replace(' / 30',' / 32').replace('足踝图谱','下肢骨骼图谱')
replace("if(b.group==='leg')return v.set", "if(id==='femur')return v.set(0,130,-40);if(id==='patella')return v.set(75,5,115);if(b.group==='leg')return v.set")
a=s.index('const REGION_LABELS=');b=s.index('const VIEWS=',a)
s=s[:a]+"""const REGION_LABELS={foot:['右足骨骼','Right foot'],ankle:['足踝连接','Ankle focus'],leg:['小腿与足','Lower leg & foot'],knee:['膝部骨骼','Knee focus'],whole:['右侧下肢','Right lower limb']};
const KNEE_BONES=new Set(['femur','patella','tibia','fibula']);
const KNEE_FOCUS="""+json.dumps(meta['kneeFocusBounds'])+""";
function regionContains(id){
 const group=BY_ID[id]?.group;
 if(state.region==='whole')return true;
 if(state.region==='knee')return KNEE_BONES.has(id);
 if(group==='thigh')return false;
 return state.region!=='foot'||group!=='leg';
}
function updateRegionUI(){
 camera.far=['whole','knee'].includes(state.region)?10000:state.region==='leg'?6500:2400;camera.updateProjectionMatrix();
 document.querySelectorAll('[data-region]').forEach(el=>{el.classList.toggle('active',el.dataset.region===state.region);el.setAttribute('aria-pressed',String(el.dataset.region===state.region));});
 const [cn,en]=REGION_LABELS[state.region];$('regionHeading').innerHTML=cn+' <span>'+en+'</span>';
 $('regionHint').textContent={foot:'保留足部观察范围 · 小腿及大腿骨暂不显示',ankle:'镜头聚焦踝部 · 小腿上端在视野外',leg:'完整胫骨、腓骨 + 原有足骨',knee:'聚焦膝部 · 4 块完整骨参与观察，未显示软组织',whole:'从股骨到足趾 · 30 块常规骨 + 2 块拇趾籽骨'}[state.region];
 const upper=state.region==='knee'||state.region==='whole';
 document.querySelector('[data-view="dorsal"]').textContent=upper?'上方':'足背';
 document.querySelector('[data-view="plantar"]').textContent=upper?'下方':'足底';
 document.querySelector('[data-view="front"]').textContent=upper?'前面':'趾端';
}
function setRegion(region,refit=true){
 if(!state.ready||!REGION_LABELS[region])return;
 state.region=region;state.isolated=false;state.neighbors=false;
 if(!regionContains(state.selected))state.selected=region==='knee'?'patella':'talus';
 updateRegionUI();applyVisibility();selectBone(state.selected,true);
 if(refit)setView('overview');
}

"""+s[b:]
replace("front:{dir:[0,.1,1],up:[0,1,0],name:'趾端 · 朝向脚跟'}", "front:{dir:[0,.1,1],up:[0,1,0],name:'趾端 · 朝向脚跟'},back:{dir:[0,.08,-1],up:[0,1,0],name:'后面 · 从后往前看'}")
replace("if(name==='overview'&&state.region==='leg')v.dir=[-1,.85,1.35];", "if(name==='overview'&&state.region==='leg')v.dir=[-1,.85,1.35];if(name==='overview'&&state.region==='whole')v.dir=[-.85,.26,1.6];if(name==='overview'&&state.region==='knee')v.dir=[-.72,.22,1.6];if(['whole','knee'].includes(state.region)){if(name==='front'){v.dir=[0,.015,1];v.name='前面 · 从前往后看';}if(name==='dorsal')v.name='上方 · 从上往下看';if(name==='plantar')v.name='下方 · 从下往上看';}")
replace("box.min.set(-90,-40,-120);box.max.set(90,125,105);}","box.min.set(-90,-40,-120);box.max.set(90,125,105);}if(!state.isolated&&!onlySelected&&state.region==='knee'&&state.explode===0&&![...bones.values()].some(isManuallyMoved)){box.min.fromArray(KNEE_FOCUS[0]);box.max.fromArray(KNEE_FOCUS[1]);}")
replace('controls.maxDistance=2200;',"controls.maxDistance=['whole','knee'].includes(state.region)?Math.max(4000,distance*3):2200;")
s=s.replace('./assets/ankle.glb','./assets/knee.glb').replace('bones.size!==30','bones.size!==32').replace('需要30块','需要32块').replace('tris!==19520','tris!=='+str(meta['totalTriangles']))
replace("selectBone('talus');resize();setRegion('leg');","selectBone('patella');resize();setRegion('whole');")
replace("main(){buildTree();bindUI();selectBone('talus');", "main(){buildTree();bindUI();selectBone('patella');")
# Observable state supports deterministic real-browser verification without replacing input handlers.
replace('region:state.region,ready:state.ready,','region:state.region,cameraAnimating:!!cameraTween,ready:state.ready,')
# Ignore labels/toolbars when finding points used by mouse integration tests.
replace("if(pick({clientX:x,clientY:y})?.object.name===id)return{x,y};", "const top=document.elementFromPoint(x,y);if(top&&(top===viewport||top===renderer.domElement)&&pick({clientX:x,clientY:y})?.object.name===id)return{x,y};")
p.write_text(s)
# Keep styling. Add just one navigation row and the posterior view control.
p=OUT/'index.template.html';html=p.read_text()
html=html.replace('足踝图谱','下肢骨骼图谱').replace('ANKLE ATLAS','LOWER LIMB ATLAS')
html=html.replace('足踝与小腿','下肢骨骼').replace('小腿与足 · 第一期扩展','大腿与膝 · 第二期扩展')
html=html.replace('<button data-region="leg" class="active">小腿与足</button>','<button data-region="leg">小腿与足</button><button data-region="knee">膝部</button><button data-region="whole" class="active">下肢全览</button>')
html=html.replace('解剖结构 <b>30</b>','解剖结构 <b>32</b>')
html=html.replace('28 块足骨 + 2 块小腿骨','30 块常规下肢骨 + 2 块拇趾籽骨')
html=html.replace('26 块基本足骨 + 2 块籽骨 + 胫腓骨','30 块常规下肢骨 + 2 块拇趾籽骨')
html=html.replace('<button data-view="front">趾端</button>','<button data-view="front">趾端</button><button data-view="back">后面</button>')
html=html.replace('../foot-atlas/','../ankle-atlas/').replace('原足骨版','上一版：足踝')
html=html.replace('右侧足骨、胫骨和腓骨','右侧股骨、髌骨、胫骨、腓骨和足骨')
html=html.replace('<strong>28 + 2</strong><span>原足骨（含籽骨）+ 小腿骨</span>','<strong>30 + 2</strong><span>常规下肢骨 + 额外拇趾籽骨</span>')
html=html.replace('19,520',format(meta['totalTriangles'],','))
html=html.replace('本版保留已经验证的28块足骨及其相对位置，在同一套坐标中新增完整胫骨、腓骨；“足踝”是镜头聚焦，不是把小腿骨截短。','本版保留已经验证的30块足踝与小腿骨，在同一套坐标中新增完整股骨、髌骨；“膝部”和“足踝”是镜头聚焦，不是截短骨头。没有加入髋骨、半月板、软骨和韧带。')
html=html.replace('本版仅新增胫骨、腓骨','本版仅新增股骨、髌骨')
(OUT/'index.template.html').write_text(html)
css=(OUT/'styles.css').read_text()+'''\n/* Content extension only: original colours, spacing, rendering and controls retained. */
.region-picker{display:grid;grid-template-columns:repeat(6,minmax(0,1fr))}.region-picker button{grid-column:span 2}.region-picker button[data-region="knee"],.region-picker button[data-region="whole"]{grid-column:span 3}.brand strong{font-size:17px;letter-spacing:1px}.view-switcher button{min-width:35px;padding-left:6px;padding-right:6px}
'''
(OUT/'styles.css').write_text(css)
licenses=(OUT/'MODEL-LICENSES.txt').read_text()+'\nSecond additive extension: source right femur and patella extracted in the same coordinate frame; original 30 ankle/foot meshes unchanged. No additional decimation. See assets/provenance.json.\n'
(OUT/'MODEL-LICENSES.txt').write_text(licenses)
(OUT/'README.md').write_text('''# 下肢骨骼图谱 · 大腿与膝（第二期扩展）

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
''')
subprocess.run(['node','--check',str(OUT/'app.js')],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(OUT/'app.js'),str(OUT/'app.bundle.js')],check=True)
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+css+'</style>')
html=re.sub(r'<script type="importmap">.*?</script>','',html,flags=re.S)
bundle=(OUT/'app.bundle.js').read_text().replace('</script','<\\/script')
html=html.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((OUT/'assets/knee.glb').read_bytes()).decode()+'";</script>\n<script>'+bundle+'</script>')
(OUT/'index.html').write_text(html)
info.update({'htmlBytes':len(html.encode()),'htmlSHA256':hashlib.sha256(html.encode()).hexdigest()});(OUT/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
print('KNEE_VIEWER_OK',json.dumps(info))
