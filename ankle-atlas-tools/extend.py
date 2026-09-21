"""Apply additive content/UI changes to the frozen approved foot implementation."""
from pathlib import Path
import json,re,subprocess,base64,os
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'ankle-atlas'
meta=json.loads((out/'assets/provenance.json').read_text());TRIS=meta['totalTriangles']
def replace(text,old,new):
    if old not in text:raise RuntimeError('Baseline mismatch: '+old[:100])
    return text.replace(old,new)
p=out/'bones-data.js';text=p.read_text()
text=replace(text,"export const GROUPS = [","export const GROUPS = [\n {id:'leg',name:'小腿骨',pinyin:'xiǎo tuǐ',en:'Leg',count:2,color:'#a5ad85'},")
addition="""
BONES.unshift(
 {id:'tibia',name:'胫骨',pinyin:'jìng gǔ',en:'Tibia',group:'leg',region:'小腿 · 内侧',feature:'上端、骨干、内踝',description:'小腿内侧较粗壮的长骨。下端与距骨形成踝关节的部分关节面，内侧向下的突出是内踝；上端朝向膝部，本版尚未加入股骨和髌骨。',look:'先用“小腿与足”看整块胫骨，再切到“足踝”看它的下端。拆出胫骨并转动，比较下端关节面与内踝的位置；单独查看可以观察上端和骨干。',neighbors:['fibula','talus'],tip:'内踝属于胫骨，不是另一块独立的骨头。'},
 {id:'fibula',name:'腓骨',pinyin:'féi gǔ',en:'Fibula',group:'leg',region:'小腿 · 外侧',feature:'腓骨头、骨干、外踝',description:'小腿外侧细长的骨，位于胫骨外侧。上端是腓骨头，下端向下延伸形成外踝；外踝内侧面与距骨相关节。腓骨不直接与股骨形成关节。',look:'在“小腿与足”中沿着细长骨干向下找到外踝；在“足踝”中，比较外踝、内踝和距骨的空间关系。使用“转骨”可以观察外踝朝向距骨的一面。',neighbors:['tibia','talus'],tip:'外踝属于腓骨；内外侧按身体方位判断，不按屏幕左右。'}
);
const talusEntry=BONES.find(b=>b.id==='talus');
talusEntry.description='位于跟骨上方、舟骨后方。上面的距骨滑车与胫骨、腓骨下端共同构成踝关节。本版已加入两块完整小腿骨，可切换“足踝”观察连接，或切换“小腿与足”看全貌。';
talusEntry.neighbors=['tibia','fibula',...talusEntry.neighbors];
"""
text=replace(text,'export const BY_ID=',addition+'\nexport const BY_ID=')
text=replace(text,'export const SOURCES=[',"export const SOURCES=[\n {title:'OpenStax · 小腿骨与踝部解剖',url:'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-4-bones-of-the-lower-limb',note:'新增胫骨、腓骨、内外踝及其骨性关系的教学参考。'},")
p.write_text(text)
p=out/'app.js';text=p.read_text()
text=replace(text,"const state={ready:false,","const state={region:'leg',ready:false,")
text=replace(text,"return;state.selected=id;","return;if(state.ready&&state.region==='foot'&&BY_ID[id].group==='leg')setRegion('leg',false);state.selected=id;")
text=text.replace('/ 28','/ 30').replace('!==28','!==30').replace('需要28块','需要30块').replace('tris!==16586',f'tris!=={TRIS}')
text=replace(text,"b.visible=!state.hidden.has(id)&&(!state.isolated||id===state.selected);","b.visible=!state.hidden.has(id)&&regionContains(id)&&(!state.isolated||id===state.selected);")
text=replace(text,"if(b.group==='tarsal'){","if(b.group==='leg')return v.set(id==='tibia'?95:-110,id==='tibia'?75:30,-25);if(b.group==='tarsal'){")
text=replace(text,"const v=VIEWS[name],damping=controls.enableDamping;","const v={...VIEWS[name]},damping=controls.enableDamping;if(name==='overview'&&state.region==='leg')v.dir=[1,.3,1.18];")
text=replace(text,"if(box.isEmpty())return;const center=", "if(!state.isolated&&!onlySelected&&state.region==='ankle'&&state.explode===0&&![...bones.values()].some(isManuallyMoved)){box.min.set(-90,-40,-120);box.max.set(90,125,105);}\nif(box.isEmpty())return;const center=")
text=replace(text,"selectBone('talus');resize();fitToContent(false,new THREE.Vector3(...VIEWS.overview.dir),new THREE.Vector3(0,1,0));", "selectBone('talus');resize();setRegion('leg');")
text=replace(text,"./assets/foot.glb","./assets/ankle.glb")
text=replace(text,"function bindUI(){", "function bindUI(){\n document.querySelectorAll('[data-region]').forEach(el=>el.addEventListener('click',()=>setRegion(el.dataset.region)));\n")
text=replace(text,"getState:()=>({ready:","getState:()=>({region:state.region,ready:")
text=replace(text,"}),selectBone,setExplode,setView,setMode,reset:","}),setRegion,selectBone,setExplode,setView,setMode,reset:")
text=text.replace('旋转整足','旋转模型').replace('返回整足','返回区域').replace('足骨图谱 · 右足','足踝图谱 · 右侧').replace('足骨图谱-','足踝图谱-')
regioncode="""
const REGION_LABELS={foot:['右足骨骼','Right foot'],ankle:['足踝连接','Ankle focus'],leg:['小腿与足','Lower leg & foot']};
function regionContains(id){return state.region!=='foot'||BY_ID[id].group!=='leg';}
function updateRegionUI(){
 document.querySelectorAll('[data-region]').forEach(el=>{el.classList.toggle('active',el.dataset.region===state.region);el.setAttribute('aria-pressed',String(el.dataset.region===state.region));});
 const [cn,en]=REGION_LABELS[state.region];$('regionHeading').innerHTML=cn+' <span>'+en+'</span>';
 $('regionHint').textContent=state.region==='ankle'?'镜头聚焦踝部 · 小腿上端在视野外':state.region==='foot'?'保留足部观察范围 · 小腿骨暂不显示':'完整胫骨、腓骨 + 原有足骨';
}
function setRegion(region,refit=true){
 if(!state.ready||!REGION_LABELS[region])return;
 state.region=region;state.isolated=false;state.neighbors=false;
 if(region==='foot'&&BY_ID[state.selected].group==='leg')state.selected='talus';
 updateRegionUI();applyVisibility();selectBone(state.selected,true);
 if(refit)setView('overview');
}
"""
text=replace(text,'const VIEWS=',regioncode+'\nconst VIEWS=')
p.write_text(text)
p=out/'index.template.html';html=p.read_text()
html=html.replace('足骨图谱','足踝图谱').replace('FOOT ATLAS','ANKLE ATLAS').replace('28','30').replace('16,586',format(TRIS,','))
html=replace(html,'人体解剖 <span>/</span> 足部 <span>/</span> <b>右足</b>','人体解剖 <span>/</span> 下肢 <span>/</span> <b>右侧 · 第一期</b>')
html=replace(html,'<h2>右足骨骼 <span>Right foot</span></h2>','<h2 id="regionHeading">小腿与足 <span>Lower leg &amp; foot</span></h2>')
html=replace(html,'<label class="search-box">','<div class="region-picker" aria-label="观察部位"><button data-region="foot">足部</button><button data-region="ankle">足踝</button><button data-region="leg" class="active">小腿与足</button></div><p id="regionHint" class="region-hint">完整胫骨、腓骨 + 原有足骨</p>\n  <label class="search-box">')
html=replace(html,'<span class="private-badge">','<a class="baseline-link" href="../foot-atlas/" target="_blank" rel="noopener">原足骨版 ↗</a><span class="private-badge">')
html=replace(html,'26 块基本足骨 + 2 块籽骨','原足骨 28 块 + 小腿骨 2 块')
html=replace(html,'籽骨单独列出，不混入基本足骨计数。','保留足骨原版；本次新增胫骨、腓骨。')
html=html.replace('26 + 2','28 + 2').replace('基本足骨 + 籽骨','原足骨（含籽骨）+ 小腿骨')
html=html.replace('从 Z-Anatomy 的骨骼图谱中提取右足','从 Z-Anatomy 的骨骼图谱中提取右侧足骨、胫骨和腓骨')
html=html.replace('处理仅包含右足提取、两个籽骨的连通分离、坐标换算、网格居中与显示配色；','本版保留已经验证的28块足骨及其相对位置，在同一套坐标中新增完整胫骨、腓骨；“足踝”是镜头聚焦，不是把小腿骨截短。')
html=html.replace('右足三维模型','右侧足踝和小腿三维模型').replace('探索足骨','探索足踝').replace('旋转整足','旋转模型').replace('返回整足','返回区域')
html=replace(html,'<div class="guide-shortcuts">','<div class="notice">左侧“足部 / 足踝 / 小腿与足”切换观察范围。切换不会改变已拖动骨块的位置；需要恢复排列时请用“一键归位”。“足踝”聚焦关节，小腿上端在画面外；“小腿与足”显示完整长度。</div><div class="guide-shortcuts">')
p.write_text(html)
p=out/'styles.css';p.write_text(p.read_text()+'''\n/* Additive navigation; approved viewport and controls unchanged. */
.region-picker{display:flex;gap:3px;margin:0 18px 7px;padding:3px;border:1px solid #dfe7dd;border-radius:7px;background:#f2f5ef;flex-shrink:0}.region-picker button{flex:1;white-space:nowrap;font-size:10px;padding:7px 3px;border-radius:4px;color:#829282}.region-picker button.active{background:#fff;color:#315e50;box-shadow:0 1px 4px #203c3312}.region-hint{font-size:9px;color:#8a9992;margin:0 20px 14px;line-height:1.6;min-height:14px}.baseline-link{font-size:11px;color:#547b67;white-space:nowrap;padding:6px;border-radius:4px}.baseline-link:hover{background:#ecf1ed}@media(max-width:1220px){.region-picker{margin-left:13px;margin-right:13px}.region-hint{margin-left:16px;margin-right:13px;font-size:8px}}@media(max-height:820px){.region-hint{margin-bottom:10px}.sidebar-intro{padding-top:16px;padding-bottom:11px}}@media(max-width:760px){.region-picker{display:none}.baseline-link{font-size:9px}}
''')
manifest={'version':'2026-09-21-ankle-v1','baseRef':meta['baseRef'],'bones':30,'footBonesIncludingSesamoids':28,'addedBones':['tibia','fibula'],'totalTriangles':TRIS,'modelBytes':(out/'assets/ankle.glb').stat().st_size,'approvedFootPreserved':True,'noRuntimeNetwork':True,'threeVersion':'0.180.0'}
(out/'build-info.json').write_text(json.dumps(manifest,indent=2))
p=out/'MODEL-LICENSES.txt';p.write_text(p.read_text()+'\n2026-09-21 extension: added right Tibia and Fibula source meshes; retained approved foot geometry. No clinical or joint-motion claim.\n')
subprocess.run(['node','--check',str(out/'app.js')],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(out/'app.js'),str(out/'app.bundle.js')],check=True)
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+(out/'styles.css').read_text()+'</style>')
html=re.sub(r'<script type="importmap">.*?</script>','',html,flags=re.S)
bundle=(out/'app.bundle.js').read_text().replace('</script','<\\/script')
html=html.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((out/'assets/ankle.glb').read_bytes()).decode()+'";</script>\n<script>'+bundle+'</script>')
(out/'index.html').write_text(html);manifest['htmlBytes']=len(html.encode());(out/'build-info.json').write_text(json.dumps(manifest,indent=2))
print('EXTENSION_OK',json.dumps(manifest))
