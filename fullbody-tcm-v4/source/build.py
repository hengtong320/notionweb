from pathlib import Path
import os,json,base64,zlib,re,shutil,struct,itertools,subprocess,hashlib
R=Path.cwd();B=R/'fullbody-tcm-v3';O=R/'fullbody-tcm-v4';U=Path('/tmp/v4-upstream');V=Path('/tmp/v4-voice');N=Path(os.environ['NODE_PATH'])
assert hashlib.sha256((B/'assets/fullbody.glb').read_bytes()).hexdigest()=='f675737728bd5c21c553bb82490694f4c52cb744f7f9ebba346c66775aebd1c2'
O.mkdir(exist_ok=True)
for f in B.iterdir():
 if f.is_file() and f.name not in ['index.html','app.bundle.js','delivery-release.json']:shutil.copy(f,O/f.name)
(O/'assets').mkdir(exist_ok=True)
for n in ['fullbody.glb','provenance.json']:shutil.copy(B/'assets'/n,O/'assets'/n)
# Recover only complete readable modules from the interrupted staging bundle.
s=''.join(p.read_text() for p in sorted((R/'atlas-v4-tools/source').glob('*.b64')))
s=re.sub(r'[^A-Za-z0-9+/=]','',s);s=s[:len(s)//4*4];d=zlib.decompressobj(31);parts=[]
for byte in base64.b64decode(s):
 try:parts.append(d.decompress(bytes([byte])))
 except zlib.error:break
s=b''.join(parts).decode('utf-8',errors='replace');dec=json.JSONDecoder();i=1;recovered={}
while i<len(s):
 try:
  key,i=dec.raw_decode(s,i)
  while s[i] in ': \n':i+=1
  value,i=dec.raw_decode(s,i);recovered[key]=value
  if s[i]!=',':break
  i+=1
 except (ValueError,IndexError):break
for name in ['learning-enhancements.js','tissues-v4.js','speech-v4.js']:
 assert name in recovered and '\ufffd' not in recovered[name],name
 (O/name).write_text(recovered[name])
s=recovered['reference-data.js'];i=s.index('[')+1;refs=[]
while i<len(s):
 try:
  item,i=dec.raw_decode(s,i)
  assert isinstance(item,dict) and re.fullmatch(r'[A-Z]+\d+',item['code']) and '\ufffd' not in json.dumps(item,ensure_ascii=False)
  refs.append(item)
  if s[i]!=',':break
  i+=1
 except (ValueError,IndexError,AssertionError,KeyError):break
assert len(refs)==95,'Reference recovery requires review'
extras=[('Yintang','印堂','yìn táng','midline'),('Taiyang','太阳','tài yáng','paired'),('Yuyao','鱼腰','yú yāo','paired'),('Sishencong','四神聪','sì shén cōng','midline'),('Anmian','安眠','ān mián','paired'),('Erjian','耳尖','ěr jiān','paired'),('Qiuhou','球后','qiú hòu','paired'),('Shanglianquan','上廉泉','shàng lián quán','midline'),('Jiachengjiang','夹承浆','jiā chéng jiāng','paired'),('Jinjing','金津','jīn jīn','paired'),('Yuye','玉液','yù yè','paired'),('Bitong','鼻通','bí tōng','paired')]
for en,cn,py,side in extras:
 refs.append(dict(code='EX-'+en.upper(),name=cn,pinyin=py,meridian='EX',side=side,region='head',position=None,landmarks=[],locationNote='头面补充目录：需结合皮肤、耳廓、眼眶或口腔等体表标志核对；本轮不生成未经校准的三维坐标。',sourceScheme='项目目录索引（EX-英文名），不是统一国标编号；不同命名体系分类可能不同。',reference='https://github.com/SciCrunch/TARA-Ontology-Repository/blob/b488d0bf855eef17a131946bd387d6e2e9dfa26d/curated-data/acupoints/extra-acupoints.csv'))
(O/'reference-data.js').write_text('export const REFERENCES='+json.dumps(refs,ensure_ascii=False,separators=(',',':'))+';\n')
s=(O/'learning-enhancements.js').read_text()
s=s.replace("function updateStatus(){if(!$('tcmStatusMain'))return;","function updateStatus(){if(!$('tcmStatusMain'))return;document.body.classList.toggle('point-detail-active',cardOpen&&enabled);")
s=s.replace("card.hidden=true;cardOpen=false;document.body.classList.remove('detail-open');","card.hidden=true;cardOpen=false;document.body.classList.remove('detail-open','point-detail-active');")
s=s.replace("card.hidden=false;cardOpen=true;}document.body.classList.add('detail-open')","card.hidden=false;cardOpen=true;document.body.classList.add('point-detail-active');}document.body.classList.add('detail-open')")
s=s.replace('看全线','看所选').replace('单独标注的骨性参考锚点','逐点人工标注的学习参考点，仍未经临床或体表配准验证')
(O/'learning-enhancements.js').write_text(s)
# Preserve source world transforms, convert meters to the approved millimeter frame.
origin=json.loads((B/'assets/provenance.json').read_text())['sourceOriginMillimeters'];labels=json.loads((U/'anatomy.json').read_text())
def mul(a,b):return [[sum(a[i][k]*b[k][j] for k in range(4)) for j in range(4)] for i in range(4)]
def matrix(n):
 if 'matrix' in n:return [[n['matrix'][j*4+i] for j in range(4)] for i in range(4)]
 x,y,z,w=n.get('rotation',[0,0,0,1]);scale=n.get('scale',[1,1,1]);t=n.get('translation',[0,0,0])
 a=[[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w),t[0]],[2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w),t[1]],[2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y),t[2]],[0,0,0,1]]
 for i in range(3):
  for j in range(3):a[i][j]*=scale[j]
 return a
alignment=[[1000,0,0,-origin[0]],[0,1000,0,-origin[1]],[0,0,1000,-origin[2]],[0,0,0,1]];counts={};catalog=[]
for system in ['muscular','nervous']:
 raw=(U/(system+'.glb')).read_bytes();jn=struct.unpack_from('<I',raw,12)[0];doc=json.loads(raw[20:20+jn]);bn=struct.unpack_from('<I',raw,20+jn)[0];binary=raw[28+jn:28+jn+bn]
 nodes=doc['nodes'];parents={child:i for i,n in enumerate(nodes) for child in n.get('children',[])};world={}
 def wm(i):
  if i not in world:world[i]=mul(wm(parents[i]),matrix(nodes[i])) if i in parents else mul(alignment,matrix(nodes[i]))
  return world[i]
 count=0
 for i,n in enumerate(nodes):
  if 'mesh' not in n:continue
  original=n.get('name','');en=re.sub(r'\.\d+$','',original).strip();side='midline'
  if en.endswith(('.l','.r')):side='left' if en[-1]=='l' else 'right';en=en[:-2]
  item=labels.get(en.lower())
  if not item:del n['mesh'];continue
  mins=[];maxs=[]
  for pr in doc['meshes'][n['mesh']]['primitives']:
   ac=doc['accessors'][pr['attributes']['POSITION']]
   if 'min' in ac and 'max' in ac:mins.append(ac['min']);maxs.append(ac['max'])
  if not mins:del n['mesh'];continue
  lo=[min(a[k] for a in mins) for k in range(3)];hi=[max(a[k] for a in maxs) for k in range(3)];m=wm(i)
  pts=[[sum(m[k][j]*p[j] for j in range(4)) for k in range(3)] for p in [(*p,1) for p in itertools.product(*zip(lo,hi))]]
  bounds=[[min(p[k] for p in pts) for k in range(3)],[max(p[k] for p in pts) for k in range(3)]]
  info={'id':system+'-'+str(i),'name':({'right':'右','left':'左','midline':''}[side])+item['zh'],'en':en,'side':side,'category':'fascia' if any(w in en.lower() for w in ['fascia','aponeurosis','retinaculum','sheath','tendon']) else system,'bounds':bounds,'sourceNode':original}
  n.setdefault('extras',{})['atlas']=info;count+=1;catalog.append(info)
 roots=doc['scenes'][doc.get('scene',0)]['nodes'];nodes.append({'name':'Approved coordinate alignment','children':roots,'matrix':[alignment[i][j] for j in range(4) for i in range(4)]});doc['scenes'][doc.get('scene',0)]['nodes']=[len(nodes)-1]
 data=json.dumps(doc,separators=(',',':'),ensure_ascii=False).encode();data+=b' '*((-len(data))%4);binary+=b'\0'*((-len(binary))%4)
 result=struct.pack('<III',0x46546c67,2,28+len(data)+len(binary))+struct.pack('<II',len(data),0x4e4f534a)+data+struct.pack('<II',len(binary),0x004e4942)+binary
 (O/'assets'/(system+'.glb')).write_bytes(result);counts[system]=count
(O/'assets/tissue-catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2))
shutil.copy(U/'source-manifest.json',O/'assets/tissue-source-manifest.json')
shutil.copy(N/'three/examples/jsm/libs/draco/gltf/draco_decoder.js',O/'draco-decoder.txt')
(O/'voice').mkdir(exist_ok=True)
for f in V.iterdir():
 if f.suffix in ['.mp3','.json']:shutil.copy(f,O/'voice'/f.name)
shutil.copy(V/'voice-manifest.json',O/'voice-map.json')
vm=json.loads((O/'voice-map.json').read_text())
for name,filename in list(vm['mapping'].items()):
 alias=re.sub(r'\s+[A-Za-z]+\d+$','',name).strip();vm['mapping'].setdefault(alias,filename)
assert vm['mapping'].get('寰椎')==vm['mapping'].get('寰椎 C1')
(O/'voice-map.json').write_text(json.dumps(vm,ensure_ascii=False))

s=(O/'tissues-v4.js').read_text().replace("document.body.classList.add('tissue-detail-active');","document.body.classList.add('tissue-detail-active');document.body.classList.remove('point-detail-active');")
(O/'tissues-v4.js').write_text(s)
s=(B/'app.js').read_text();s="import {initSpeech} from './speech-v4.js';\nimport {initTissues} from './tissues-v4.js';\n"+s
s=s.replace('const state={','let tissueLayer=null,speech=null,richLayers=false;\nconst state={bonesOn:true,')
s=s.replace('b.visible=!state.hidden.has(id)','b.visible=state.bonesOn&&!state.hidden.has(id)')
s=s.replace('controls.zoomSpeed=.8;','controls.zoomSpeed=.65;controls.zoomToCursor=true;')
s=s.replace('if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;const hit=pick(e);','if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;if(tissueLayer?.click(e))return;const hit=pick(e);')
s=s.replace('const fps=renderQuality','const fps=richLayers?30:renderQuality')
s=s.replace('learningEnhancements?.updateFrame?.();','tissueLayer?.updateFrame();learningEnhancements?.updateFrame?.();')
s=s.replace('version:"3.0",renderQuality','version:"4.0",bonesOn:state.bonesOn,zoomToCursor:controls?.zoomToCursor,dockCollapsed:document.body.classList.contains("dock-collapsed"),renderQuality')
assert 'await loadModel();learningEnhancements=initLearningEnhancements(' in s
s=s.replace('await loadModel();learningEnhancements=initLearningEnhancements(','await loadModel();speech=initSpeech(toast);window.__ATLAS_SPEECH__=speech;learningEnhancements=initLearningEnhancements(')
assert 'bonePinyin,MERIDIANS,ACUPOINTS});}' in s
s=s.replace('bonePinyin,MERIDIANS,ACUPOINTS});}','bonePinyin,MERIDIANS,ACUPOINTS,speech});tissueLayer=initTissues({THREE,scene,camera,renderer,viewport,bones,state,toast,focusBounds,setRegion,setView,regionContains,applyVisibility,learning:learningEnhancements,setPerformance:on=>{richLayers=on;aoPass.enabled=!on&&(renderQuality==="high"||renderQuality==="auto"&&innerWidth>1100);renderer.shadowMap.enabled=!on;}},speech);setupV4Dock();}')
s+='''\nfunction setupV4Dock(){
 const dock=document.querySelector('.control-dock'),b=document.createElement('button');b.id='dockToggle';b.type='button';dock.prepend(b);
 const set=on=>{document.body.classList.toggle('dock-collapsed',on);b.textContent=on?'展开操作栏 ▴':'收起操作栏 ▾';b.setAttribute('aria-expanded',String(!on));};b.onclick=()=>set(!document.body.classList.contains('dock-collapsed'));set(innerWidth<650);
 const hint=document.createElement('small');hint.className='zoom-instruction';hint.textContent='滚轮朝鼠标位置缩放 · 双击骨骼聚焦 · H 回到整体';document.querySelector('.stage').append(hint);
}\n'''
s=s.replace('updateGhosts();if(fit&&!state.isolated)fitToContent(true);','updateGhosts();tissueLayer?.updateFrame();if(fit&&!state.isolated)fitToContent(true);')
(O/'app.js').write_text(s)
html=(B/'index.template.html').read_text().replace('V3 · 操作优化','V4 · 肌肉与神经').replace('V3','V4').replace('全身骨骼研习室 · Full-body Skeletal Atlas','全身骨骼 · 肌肉神经 · 经络参考 V4')
html=html.replace('上一版：腰椎与双腿','保留原版 V3').replace('https://hengtong320.github.io/notionweb/lumbar-atlas/','https://hengtong320.github.io/notionweb/fullbody-tcm-v3/')
(O/'index.template.html').write_text(html)
css=(B/'styles.css').read_text()+'\n'+(R/'atlas-v4-delivery/styles.css').read_text();(O/'styles.css').write_text(css)
for n in ['app.js','learning-enhancements.js','tissues-v4.js','speech-v4.js','reference-data.js']:subprocess.run(['node','--check',str(O/n)],check=True)
js="require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],loader:{'.txt':'text'},outfile:process.argv[2],legalComments:'inline'})"
subprocess.run(['node','-e',js,str(O/'app.js'),str(O/'app.bundle.js')],check=True)
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+css+'</style>');html=re.sub(r'<script type="importmap">.*?</script>','',html,flags=re.S)
bundle=(O/'app.bundle.js').read_text().replace('</script','<\\/script');embed=base64.b64encode((O/'assets/fullbody.glb').read_bytes()).decode()
html=html.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+embed+'";</script>\n<script>'+bundle+'</script>');(O/'index.html').write_text(html)
manifest=dict(version='fullbody-tcm-v4',bones=210,bonesUnchanged=True,htmlSHA256=hashlib.sha256(html.encode()).hexdigest(),htmlBytes=len(html.encode()),tissues=counts,neuralRecordings=json.loads((O/'voice-map.json').read_text())['uniqueRecordings'],referenceNames=len(refs),individuallyMarkedReferenceNames=95,supplementalDirectoryNames=12,clinicalCalibration=False,oldInterpolatedCoordinatesRemoved=True,softTissueAlignment=dict(scale=1000,subtractOrigin=origin),previousViewersUntouched=True)
(O/'build-info.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(O/'README.md').write_text('''# 全身骨骼 · 肌肉神经 · 经络参考 V4

网页：https://hengtong320.github.io/notionweb/fullbody-tcm-v4/

保留210骨块。新增同源肌肉/神经按需加载、透明度、结构点选，预制中文女声，音色和语速选择，操作栏折叠与鼠标指向缩放。心经与小肠经等可多选对照。

## 精度边界
361个经穴名称不等于361个准确坐标。旧版沿曲线均匀插值已移除；95个名称有手工学习参考标记，未经皮肤或临床定位验证。其余仅名称目录，不捏造坐标。头面补充12项也没有自动生成位置；参考连线不是完整经脉循行。不用于取穴、针刺、诊断或手法复位。

肌肉不等于皮肤。未包含真实皮肤、皮下脂肪和全部神经末梢。胸廓保留原始坐标，没有为外观上下挪动。拆骨时软组织与点位暂停对照，归位恢复。

骨骼与渲染代码内置，肌肉/神经/语音同站点按需加载。单独保存index.html不含所有软组织和音频；完整文件夹需一起保存。语音为预制合成音频，未逐条人工审听，部分名称回退设备语音。

模型许可见MODEL-LICENSES.txt和assets/tissue-source-manifest.json，未复制第三方完整临床讲解。
''')
with (O/'MODEL-LICENSES.txt').open('a') as f:f.write('\nV4肌肉与神经：Z-Anatomy / BodyParts3D，CC BY-SA 4.0；固定来源提交322ba39e96ea91ce08601caad2c0aaade1dc99f0。米转毫米并减去原足骨基准原点，原骨网格未修改。神经语音为Kokoro-82M-v1.1-zh合成输出，模型Apache-2.0，见voice/voice-manifest.json。Draco decoder来自Three.js 0.180.0，保留原许可证头。\n')
print(json.dumps(manifest,ensure_ascii=False,indent=2))
