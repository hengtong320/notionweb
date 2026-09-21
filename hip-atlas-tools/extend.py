"""Add pelvic content and study scopes to the approved viewer; preserve existing controls."""
from pathlib import Path
import base64,hashlib,json,os,re,subprocess
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'hip-atlas'
meta=json.loads((OUT/'assets/provenance.json').read_text());info=json.loads((OUT/'build-info.json').read_text())
s=(OUT/'bones-data.js').read_text()
addition="""
// Third additive region. An adult hip bone remains one complete selectable bone.
GROUPS.unshift({id:'pelvis',name:'骨盆',pinyin:'',en:'Bony pelvis',count:4,color:'#a99775'});
BONES.push(
 {id:'hip-right',name:'右髋骨',pinyin:'kuān gǔ',en:'Right hip bone',group:'pelvis',region:'骨盆 · 右侧',feature:'髂嵴、髋臼、闭孔与坐骨结节',description:'骨盆右侧的髋骨。成人髋骨由髂骨、坐骨、耻骨融合而成，本页按一块完整骨显示，不把这三个区域当作可以活动的三块骨。外侧的髋臼与右股骨头组成髋关节；后方与骶骨形成骶髂关节，前方经耻骨联合与左髋骨连接。',look:'切到“右髋部”观察股骨头与髋臼（kuān jiù）的衔接，移开股骨后查看窝状的髋臼；单独查看时，比较上方的髂（qià）骨翼、下方的闭孔与后下方的坐骨结节。',neighbors:['femur','sacrum','hip-left'],tip:'右侧指人体自身的右侧，不是屏幕右边。髂骨、坐骨、耻骨是成人髋骨的三个融合区域。'},
 {id:'hip-left',name:'左髋骨',pinyin:'kuān gǔ',en:'Left hip bone',group:'pelvis',region:'骨盆 · 左侧',feature:'髋臼、髂骨翼与耻骨联合面',description:'骨盆左侧的髋骨，与右髋骨及骶骨、尾骨组成骨性骨盆。外侧髋臼用于容纳左股骨头；本期尚未加入左股骨和左下肢，因此这侧髋臼呈空出状态，不是模型加载失败。前方经耻骨联合与右髋骨相接。',look:'切到“骨盆”，对照左右两块髋骨；从外侧观察髋臼，从内侧观察髂窝，再转到前方比较两侧耻骨联合面的相对位置。本模型未显示耻骨间盘。',neighbors:['sacrum','hip-right'],tip:'左髋骨使用原始模型发布的左侧网格及变换。本期只接入右下肢，左侧股骨尚未加入。'},
 {id:'sacrum',name:'骶骨',pinyin:'dǐ gǔ',en:'Sacrum',group:'pelvis',region:'骨盆后方 · 脊柱下端',feature:'骶岬、前后骶孔与耳状面',description:'位于两块髋骨之间、骨盆后方，由骶椎融合形成。两侧与髋骨的髂骨区域形成骶髂关节；上方承接腰椎，下端连接尾骨。本期未加入腰椎，因此骶骨上方保留为空。',look:'先从前方看较凹的盆面及前骶孔，再用“后面”视角比较后方的骨嵴与后骶孔；移开一侧髋骨，观察两骨相对的耳状面。表面精度受源网格限制。',neighbors:['hip-right','hip-left','coccyx'],tip:'骶读 dǐ。观察展开不表示骶髂关节可以像模型一样大幅分离或转动。'},
 {id:'coccyx',name:'尾骨',en:'Coccyx',group:'pelvis',region:'骶骨下方 · 脊柱末端',feature:'尾骨底与尾骨尖',description:'位于骶骨下方的脊柱末端小骨，由尾椎构成，融合程度存在个体差异。本模型将其作为一个完整骨块，可从骶骨下端的连接处定位。周围软组织没有在本页显示。',look:'在“骨盆”选择尾骨后点击“单独查看”，放大转动观察；回到区域后，从后面或侧面看它与骶骨下端的排列。它较小，必要时先隐藏周围髋骨。',neighbors:['sacrum'],tip:'尾骨不是坐骨。需要近看时使用“单独查看”，不必把整个骨盆放得很大。'}
);
const femurPelvis=BONES.find(b=>b.id==='femur');
femurPelvis.neighbors=['hip-right',...femurPelvis.neighbors];
femurPelvis.description='大腿中的长骨。上端的股骨头朝向内侧，与右髋骨的髋臼构成髋关节，本期已加入完整骨盆。下端的内外侧髁与胫骨上端构成膝关节的骨性部分，前方髌面与髌骨相关节；不直接与腓骨相关节。';
femurPelvis.look='切到“右髋部”查看圆形股骨头、较细的股骨颈与髋臼的衔接；用“拆骨”移开股骨，比较两侧相对骨面。单独查看完整股骨，再切到“膝部”观察下端。';
femurPelvis.tip='本期已加入右髋骨。髋关节在股骨上端，膝关节在下端；本页不显示软骨或髋臼唇。';
"""
assert 'export const BY_ID=' in s;s=s.replace('export const BY_ID=',addition+'\nexport const BY_ID=',1)
s=s.replace('export const SOURCES=[','export const SOURCES=[\n {title:"OpenStax · 骨盆与髋骨",url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/8-3-the-pelvic-girdle-and-pelvis",note:"骨盆、成人髋骨融合区域、骶髂关节与耻骨联合的教学参考。"},',1)
(OUT/'bones-data.js').write_text(s)
s=(OUT/'app.js').read_text()
def replace(old,new):
    global s
    assert old in s,old[:130]
    s=s.replace(old,new,1)
replace("const state={region:'whole',ready:false,selected:'patella'","const state={region:'pelvic-limb',ready:false,selected:'hip-right'")
replace("setRegion(BY_ID[id].group==='thigh'?'knee':BY_ID[id].group==='leg'?'leg':'foot')","setRegion(BY_ID[id].group==='pelvis'?'pelvis':BY_ID[id].group==='thigh'?(id==='femur'&&['hip','pelvis','pelvic-limb'].includes(state.region)?'hip':'knee'):BY_ID[id].group==='leg'?'leg':'foot')")
s=s.replace(' / 32',' / 36')
replace("sesamoid:'zigu'","sesamoid:'zigu',coccyx:'weigu',pelvis:'gupen'")
replace("if(id==='femur')return v.set", "if(b.group==='pelvis'){const d={'hip-right':[-140,20,35],'hip-left':[140,20,35],sacrum:[0,100,-120],coccyx:[0,-50,-170]};return v.fromArray(d[id]);}if(id==='femur')return v.set")
a=s.index('const REGION_LABELS=');b=s.index('const VIEWS=',a)
s=s[:a]+"""const REGION_LABELS={foot:['右足骨骼','Right foot'],ankle:['足踝连接','Ankle focus'],leg:['小腿与足','Lower leg & foot'],knee:['膝部骨骼','Knee focus'],whole:['右侧下肢','Right lower limb'],hip:['右髋部','Right hip'],pelvis:['骨性骨盆','Bony pelvis'],'pelvic-limb':['骨盆与右下肢','Pelvis & right lower limb']};
const KNEE_BONES=new Set(['femur','patella','tibia','fibula']);
const KNEE_FOCUS="""+json.dumps(meta['kneeFocusBounds'])+""";
const HIP_FOCUS="""+json.dumps(meta['hipFocusBounds'])+""";
const UPPER_REGIONS=new Set(['whole','knee','hip','pelvis','pelvic-limb']);
function regionContains(id){
 const group=BY_ID[id]?.group;
 if(state.region==='pelvic-limb')return true;
 if(state.region==='pelvis')return group==='pelvis';
 if(state.region==='hip')return id==='hip-right'||id==='femur';
 if(group==='pelvis')return false;
 if(state.region==='whole')return true;
 if(state.region==='knee')return KNEE_BONES.has(id);
 if(group==='thigh')return false;
 return state.region!=='foot'||group!=='leg';
}
function updateRegionUI(){
 scene.background.set('#eff2e9');if(UPPER_REGIONS.has(state.region))scene.background.multiplyScalar(2.0);
 camera.far=['hip','pelvis','pelvic-limb'].includes(state.region)?12000:UPPER_REGIONS.has(state.region)?10000:state.region==='leg'?6500:2400;camera.updateProjectionMatrix();
 document.querySelectorAll('[data-region]').forEach(el=>{el.classList.toggle('active',el.dataset.region===state.region);el.setAttribute('aria-pressed',String(el.dataset.region===state.region));});
 const [cn,en]=REGION_LABELS[state.region];$('regionHeading').innerHTML=cn+' <span>'+en+'</span>';
 $('regionHint').textContent={foot:'保留足部观察范围 · 上方骨骼暂不显示',ankle:'镜头聚焦踝部 · 小腿上端在视野外',leg:'完整胫骨、腓骨 + 原有足骨',knee:'聚焦膝部 · 4 块完整骨参与观察，未显示软组织',whole:'从股骨到足趾 · 保留原有 32 块骨',hip:'右髋骨 + 完整股骨 · 镜头聚焦髋部，未截短',pelvis:'左右髋骨 + 骶骨 + 尾骨 · 腰椎及左下肢尚未加入','pelvic-limb':'完整骨盆 + 右侧下肢 · 共 36 个独立骨块'}[state.region];
 const upper=UPPER_REGIONS.has(state.region),bilateral=['pelvis','pelvic-limb'].includes(state.region);
 document.querySelector('[data-view="dorsal"]').textContent=upper?'上方':'足背';
 document.querySelector('[data-view="plantar"]').textContent=upper?'下方':'足底';
 document.querySelector('[data-view="front"]').textContent=upper?'前面':'趾端';
 document.querySelector('[data-view="medial"]').textContent=bilateral?'左面':'内侧';
 document.querySelector('[data-view="lateral"]').textContent=bilateral?'右面':'外侧';
}
function setRegion(region,refit=true){
 if(!state.ready||!REGION_LABELS[region])return;
 state.region=region;state.isolated=false;state.neighbors=false;
 if(!regionContains(state.selected))state.selected=['hip','pelvis','pelvic-limb'].includes(region)?'hip-right':region==='knee'?'patella':'talus';
 updateRegionUI();applyVisibility();selectBone(state.selected,true);
 if(refit)setView('overview');
}

"""+s[b:]
replace("if(['whole','knee'].includes(state.region)){", "if(name==='overview'&&state.region==='hip')v.dir=[-1,.24,1.6];if(name==='overview'&&state.region==='pelvis')v.dir=[-.48,.24,1.8];if(name==='overview'&&state.region==='pelvic-limb')v.dir=[-.5,.18,1.9];if(['pelvis','pelvic-limb'].includes(state.region)){if(name==='medial')v.name='左面 · 人体左侧';if(name==='lateral')v.name='右面 · 人体右侧';}else if(state.region==='hip'){if(name==='medial')v.name='内侧 · 朝向身体中线';if(name==='lateral')v.name='外侧 · 从右侧看髋臼';}if(UPPER_REGIONS.has(state.region)){")
replace("box.min.fromArray(KNEE_FOCUS[0]);box.max.fromArray(KNEE_FOCUS[1]);}","box.min.fromArray(KNEE_FOCUS[0]);box.max.fromArray(KNEE_FOCUS[1]);}if(!state.isolated&&!onlySelected&&state.region==='hip'&&state.explode===0&&![...bones.values()].some(isManuallyMoved)){box.min.fromArray(HIP_FOCUS[0]);box.max.fromArray(HIP_FOCUS[1]);}")
replace("controls.maxDistance=['whole','knee'].includes(state.region)?", "controls.maxDistance=UPPER_REGIONS.has(state.region)?")
replace("&&!['whole','knee'].includes(state.region)","&&!UPPER_REGIONS.has(state.region)")
s=s.replace('./assets/knee.glb','./assets/hip.glb').replace('bones.size!==32','bones.size!==36').replace('需要32块','需要36块').replace('tris!==23590','tris!=='+str(meta['totalTriangles']))
replace("selectBone('patella');resize();setRegion('whole');","selectBone('hip-right');resize();setRegion('pelvic-limb');")
replace("main(){buildTree();bindUI();selectBone('patella');","main(){buildTree();bindUI();selectBone('hip-right');")
replace("axes=[['内',new THREE.Vector3(1,0,0)","axes=[[(['pelvis','pelvic-limb'].includes(state.region)?'左':'内'),new THREE.Vector3(1,0,0)")
s=s.replace('下肢骨骼图谱 · 右侧','骨盆与下肢图谱 · 右下肢')
s=s.replace('ghost:state.ghost,labels:state.labels,','ghost:state.ghost,labels:state.labels,colors:state.colors,')
(OUT/'app.js').write_text(s)
html=(OUT/'index.template.html').read_text()
html=html.replace('下肢骨骼图谱','骨盆与下肢图谱').replace('LOWER LIMB ATLAS','PELVIS & LIMB ATLAS')
html=html.replace('大腿与膝 · 第二期扩展','髋部与骨盆 · 第三期扩展')
html=html.replace('<button data-region="whole" class="active">下肢全览</button>','<button data-region="whole">下肢全览</button><button data-region="hip">右髋部</button><button data-region="pelvis">骨盆</button><button data-region="pelvic-limb" class="active">骨盆与下肢</button>')
html=html.replace('原有 30 块 + 股骨、髌骨','原 32 块下肢骨 + 4 块骨盆骨').replace('原两版保持不变；本期增加大腿与膝。','原三版保持不变；本期增加髋部与骨盆。')
html=html.replace('解剖结构 <b>32</b>','解剖结构 <b>36</b>')
html=html.replace('30 块常规下肢骨 + 2 块拇趾籽骨','原 32 块下肢骨 + 4 块骨盆骨')
html=html.replace('右侧股骨、髌骨、胫骨、腓骨和足骨','左右髋骨、骶骨、尾骨与右侧下肢骨骼')
html=html.replace('<strong>30 + 2</strong><span>常规下肢骨 + 额外拇趾籽骨</span>','<strong>32 + 4</strong><span>原下肢骨（含拇趾籽骨）+ 骨盆骨</span>')
html=html.replace('23,590',format(meta['totalTriangles'],','))
html=html.replace('../ankle-atlas/','../knee-atlas/').replace('上一版：足踝','上一版：大腿与膝')
html=html.replace('本版保留已经验证的30块足踝与小腿骨，在同一套坐标中新增完整股骨、髌骨；“膝部”和“足踝”是镜头聚焦，不是截短骨头。没有加入髋骨、半月板、软骨和韧带。','本版保留已经验证的32块右下肢骨，在同一坐标中新增左右髋骨、骶骨和尾骨。成人髋骨整体显示，不将髂骨、坐骨、耻骨当成可分离关节。右髋部只是镜头聚焦，股骨未截短。腰椎、左下肢、软骨、韧带和髋臼唇尚未加入。')
html=html.replace('本版仅新增股骨、髌骨','本版新增左右髋骨、骶骨和尾骨')
html=html.replace('<b>右足</b>','<b>骨盆与右下肢</b>')
(OUT/'index.template.html').write_text(html)
css=(OUT/'styles.css').read_text()+'''
/* Added scopes only; established viewer materials, controls and visual style unchanged. */
.region-picker button[data-region]{grid-column:span 2}.region-picker button[data-region="pelvis"],.region-picker button[data-region="pelvic-limb"]{grid-column:span 3}
'''
(OUT/'styles.css').write_text(css)
(OUT/'MODEL-LICENSES.txt').write_text((OUT/'MODEL-LICENSES.txt').read_text()+'\nThird additive extension: original right/left hip bones, sacrum and coccyx. Preserved source transforms, including source left hip reflection. Kept all 32 previous meshes with unchanged face indices and vertex positions. No clinical certification or joint-motion simulation.\n')
subprocess.run(['node','--check',str(OUT/'app.js')],check=True)
if (ROOT/'toolkit/esbuild').exists():
    package=OUT/'vendor/package.json';package.write_text(json.dumps({'name':'three','type':'module','exports':{'.':'./three.module.min.js','./addons/*':'./addons/*'}}))
    nm=ROOT/'node_modules';nm.mkdir(exist_ok=True);link=nm/'three'
    if link.is_symlink():link.unlink()
    link.symlink_to(OUT/'vendor',target_is_directory=True)
    subprocess.run([str(ROOT/'toolkit/esbuild'),str(OUT/'app.js'),'--bundle','--minify','--format=iife','--target=es2020','--legal-comments=inline','--outfile='+str(OUT/'app.bundle.js')],check=True)
else:
    subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(OUT/'app.js'),str(OUT/'app.bundle.js')],check=True)
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+css+'</style>')
html=re.sub(r'<script type="importmap">.*?</script>','',html,flags=re.S)
bundle=(OUT/'app.bundle.js').read_text().replace('</script','<\\/script')
html=html.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((OUT/'assets/hip.glb').read_bytes()).decode()+'";</script>\n<script>'+bundle+'</script>')
(OUT/'index.html').write_text(html)
info.update({'htmlBytes':len(html.encode()),'htmlSHA256':hashlib.sha256(html.encode()).hexdigest()})
(OUT/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
print('HIP_VIEWER_OK',json.dumps(info))
