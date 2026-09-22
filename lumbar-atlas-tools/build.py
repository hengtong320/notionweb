"""Content-only viewer extension; build a self-contained page with all 73 meshes."""
from pathlib import Path
import base64,hashlib,json,os,re,subprocess
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'lumbar-atlas';TOOLS=Path(__file__).resolve().parent
info=json.loads((OUT/'build-info.json').read_text());meta=json.loads((OUT/'assets/provenance.json').read_text())
data=(OUT/'bones-data.js').read_text();data=data.replace('export const BY_ID=',(TOOLS/'bilateral-data.js').read_text()+'\nexport const BY_ID=')
data=data.replace('export const SOURCES=[',"export const SOURCES=[{title:'OpenStax · 脊柱与腰椎',url:'https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column',note:'L1—L5、腰骶衔接、椎体与椎弓的教学参考。'},")
(OUT/'bones-data.js').write_text(data)
s=(OUT/'app.js').read_text()
s=s.replace("region:'pelvic-limb'","region:'all',side:'both'",1).replace("selected:'hip-right'","selected:'L5'",1)
a=s.index('const REGION_LABELS=');z=s.index('function syncCameraUp()',a);s=s[:a]+(TOOLS/'regions.js').read_text()+'\n'+s[z:]
old="if(state.ready&&!regionContains(id))setRegion(BY_ID[id].group==='pelvis'?'pelvis':BY_ID[id].group==='thigh'?(id==='femur'&&['hip','pelvis','pelvic-limb'].includes(state.region)?'hip':'knee'):BY_ID[id].group==='leg'?'leg':'foot');"
assert old in s;s=s.replace(old,'revealBone(id);')
s=s.replace(' / 36',' / 73').replace('bones.size!==36','bones.size!==73').replace('需要36块','需要73块').replace('tris!==44008','tris!=='+str(info['totalTriangles'])).replace('./assets/hip.glb','./assets/lumbar.glb')
s=s.replace("selectBone('hip-right');resize();setRegion('pelvic-limb');","selectBone('L5');resize();setRegion('all');")
s=s.replace("function bindUI(){","function bindUI(){\n document.querySelectorAll('[data-side]').forEach(el=>el.addEventListener('click',()=>setSide(el.dataset.side)));\n")
s=s.replace('getState:()=>({region:state.region,','getState:()=>({region:state.region,side:state.side,').replace('}),setRegion,selectBone,','}),setSide,setRegion,selectBone,')
a=s.index("if(!state.isolated&&!onlySelected&&state.region==='ankle'");z=s.index('if(box.isEmpty())return;',a)
s=s[:a]+'scopedFocusBox(box,onlySelected);\n'+s[z:]
a=s.index('function explosionVector(');z=s.index('function setExplode(',a)
old_explode=s[a:z].replace('function explosionVector(', 'function baselineExplosion(')
s=s[:a]+old_explode+f'''const PATIENT_MIDLINE_X={meta['patientMidlineX']};
function explosionVector(id,home){{
 const b=BY_ID[id];let v;
 if(b.group==='lumbar'){{const i=Number(id[1]);return new THREE.Vector3((i%2?1:-1)*28,(6-i)*28+40,-35-i*15);}}
 if(b.side==='left'&&b.group!=='pelvis'){{const h=home.clone();h.x=2*PATIENT_MIDLINE_X-h.x;v=baselineExplosion(b.baseId,h);v.x*=-1;}}
 else v=baselineExplosion(id,home);
 if(state.side==='both'&&!['lumbar','pelvis'].includes(b.group))v.x+=b.side==='left'?105:-105;
 return v;
}}
'''+s[z:]
s=s.replace('for(const b of bones.values())b.position.copy(b.userData.home).addScaledVector(b.userData.explosion,state.explode/100).add(b.userData.offset);','for(const b of bones.values()){b.userData.explosion=explosionVector(b.name,b.userData.home);b.position.copy(b.userData.home).addScaledVector(b.userData.explosion,state.explode/100).add(b.userData.offset);}')
s=s.replace("axes=[['内',new THREE.Vector3(1,0,0)","axes=[['左',new THREE.Vector3(1,0,0)").replace("['背',new THREE.Vector3(0,1,0)","['上',new THREE.Vector3(0,1,0)")
a=s.index('function updateLabels()');z=s.index('function positionLabel',a);label=s[a:z];start=label.index('}else{projected.sort(')
label=label[:start]+'''}else{
 const top=180,bottom=h-190,spacing=21,capacity=Math.max(1,Math.floor((bottom-top)/spacing)),columns=Math.min(4,Math.max(2,Math.ceil(projected.length/capacity)));
 projected.sort((a,b)=>a.x-b.x);const chunk=Math.ceil(projected.length/columns);
 for(let col=0;col<columns;col++){
  const arr=projected.slice(col*chunk,(col+1)*chunk).sort((a,b)=>a.y-b.y);
  const step=Math.min(spacing,(bottom-top)/Math.max(1,arr.length-1));let previous=top-step;
  for(const p of arr){p.ly=Math.max(clamp(p.y,top,bottom),previous+step);previous=p.ly;}
  for(let i=arr.length-1;i>=0;i--)arr[i].ly=Math.min(arr[i].ly,i===arr.length-1?bottom:arr[i+1].ly-step);
  for(const p of arr)positionLabel(p,72+col*(w-160)/Math.max(1,columns-1),p.ly);
 }
}}
'''
s=s[:a]+label+s[z:]
s=s.replace("ctx.fillText('骨盆与下肢图谱 · 右下肢与完整骨盆'","ctx.fillText('腰椎与双下肢图谱'")
(OUT/'app.js').write_text(s)
html=(OUT/'index.template.html').read_text()
html=html.replace('骨盆与下肢图谱','腰椎与双下肢图谱').replace('PELVIS & LIMB ATLAS','LUMBAR & LOWER LIMBS').replace('骨盆 · 第三期','腰椎与双腿 · 第四期').replace('/notionweb/knee-atlas/','/notionweb/hip-atlas/').replace('上一版：大腿与膝','上一版：骨盆与下肢')
a=html.index('<div class="region-picker"');z=html.index('<label class="search-box"',a)
regions=[('foot','足部'),('ankle','足踝'),('leg','小腿与足'),('knee','膝部'),('whole','下肢全览'),('hip','髋部'),('pelvis','骨盆'),('pelvic-limb','骨盆与下肢'),('lumbar','腰椎'),('lumbosacral','腰骶与骨盆'),('all','腰椎与双腿')]
nav='<div class="region-picker" aria-label="观察部位">'+''.join(f'<button data-region="{r}"'+(' class="active"' if r=='all' else '')+'>'+n+'</button>' for r,n in regions)+'</div>'
nav+='<div class="side-picker" aria-label="人体左右侧"><button data-side="both" class="active">双侧</button><button data-side="right">人体右侧 R</button><button data-side="left">人体左侧 L</button></div><p id="regionHint" class="region-hint">双侧完整下肢 + 骨盆 + 腰椎 · 73 块</p>\n  '
html=html[:a]+nav+html[z:]
html=html.replace('解剖结构 <b>36</b>','解剖结构 <b>73</b>').replace('01 / 36','01 / 73').replace('原 32 块下肢骨 + 4 块骨盆骨','双下肢 64 + 骨盆 4 + 腰椎 5').replace('原三版保持不变；本期增加髋部与骨盆。','64 块下肢骨中含 4 块额外拇趾籽骨。').replace('骨盆与右侧下肢三维模型','腰椎、骨盆与双下肢三维模型').replace('骨盆与右下肢 <span>Pelvis &amp; right lower limb</span>','腰椎、骨盆与双下肢 <span>Lumbar spine &amp; lower limbs</span>').replace('探索骨盆与下肢','探索腰椎与双下肢')
html=html.replace('<div class="stage-caption">','<div id="sideNotice" class="side-notice"></div><div class="stage-caption">')
html=html.replace('左侧可以在足部、足踝、小腿与足、膝部、下肢全览、右髋部、骨盆、骨盆与下肢之间切换。','左侧可切换足部至腰椎的观察区域，使用“双侧 / 人体右侧 / 人体左侧”选择观察范围。腰椎、腰骶与骨盆、骨盆区域固定显示中轴结构。').replace('“右髋部”','“髋部”').replace('右下肢内侧','下肢内侧')
a=html.index('<p class="source-intro">');z=html.index('<div id="sourceLinks"',a)
html=html[:a]+f'''<p class="source-intro">本版沿用 Z-Anatomy / BodyParts3D 同源骨架，保留原36块骨，并增加源文件自带的左侧完整下肢32块骨与五节腰椎 L1—L5。并非由简单几何体拼造，也不是患者 CT。</p><div class="model-facts"><div><strong>73</strong><span>双腿64 + 骨盆4 + 腰椎5</span></div><div><strong>{info['totalTriangles']:,}</strong><span>源模型表面三角形</span></div><div><strong>本地</strong><span>模型内置，无数据上传</span></div></div><p class="source-intro">左右按人体自身区分，不按屏幕位置。左侧使用源文件已发布的反射网格及变换，不是独立扫描的双侧个体差异模型。原有骨面未修改，未新增细分或虚构结构。现有69块常规骨另加4块拇趾籽骨；髌骨已经计入常规骨。尚未包含胸椎、颈椎、上肢、头颅、椎间盘、软骨、神经及韧带。骨间间隙不等于人体内没有软组织；拆解不是运动或复位模拟。</p>'''+html[z:]
(OUT/'index.template.html').write_text(html)
css=(OUT/'styles.css').read_text()+'''
/* Bilateral and lumbar content selectors; approved stage and material design retained. */
.region-picker button[data-region]{grid-column:span 2}.region-picker button[data-region="lumbosacral"],.region-picker button[data-region="all"]{grid-column:span 3}
.side-picker{display:flex;gap:3px;margin:0 18px 7px;padding:3px;border:1px solid #dfe7dd;border-radius:7px;background:#f2f5ef;flex-shrink:0}.side-picker button{flex:1;font-size:10px;padding:7px 2px;color:#829282;border-radius:4px;white-space:nowrap}.side-picker button.active{background:#fff;color:#315e50;box-shadow:0 1px 4px #203c3312}.side-picker button:disabled{opacity:.45;cursor:default}
.side-notice{position:absolute;top:169px;left:30px;right:65px;font-size:10px;color:#879481;pointer-events:none;line-height:1.6}.bone-label{font-size:10px;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.brand strong{font-size:16px}.breadcrumb{font-size:10px}
@media(max-height:820px){.side-notice{top:166px;font-size:9px}.region-picker button{padding-top:5px;padding-bottom:5px}.side-picker button{padding-top:5px;padding-bottom:5px}.sidebar-intro p{display:none}.region-hint{margin-bottom:7px}.sidebar-bottom{padding-top:8px;padding-bottom:8px}}
@media(max-width:1220px){.side-picker{margin-left:13px;margin-right:13px}.side-notice{left:22px;font-size:9px}}
'''
(OUT/'styles.css').write_text(css)
subprocess.run(['node','--check',str(OUT/'app.js')],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(OUT/'app.js'),str(OUT/'app.bundle.js')],check=True)
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+css+'</style>');html=re.sub(r'<script type="importmap">.*?</script>','',html,flags=re.S)
model=base64.b64encode((OUT/'assets/lumbar.glb').read_bytes()).decode();bundle=(OUT/'app.bundle.js').read_text().replace('</script','<\\/script')
html=html.replace('<script type="module" src="app.js"></script>',f'<script>window.FOOT_ATLAS_EMBEDDED="{model}";</script>\n<script>{bundle}</script>');(OUT/'index.html').write_text(html)
info.update({'htmlBytes':len(html.encode()),'htmlSHA256':hashlib.sha256(html.encode()).hexdigest()});(OUT/'build-info.json').write_text(json.dumps(info,indent=2))
(OUT/'MODEL-LICENSES.txt').write_text((OUT/'MODEL-LICENSES.txt').read_text()+'\nFourth extension: L1-L5 and native left lower-limb meshes including source-authored reflection. All prior 36 meshes preserved. No new geometry or physical joint simulation. See assets/provenance.json.\n')
print('BUILD_OK',json.dumps(info))
