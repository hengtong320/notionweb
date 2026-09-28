from pathlib import Path
import shutil,re
p=Path('fullbody-tcm-v21');assert not p.exists(),'Do not overwrite published V21'
shutil.copytree('fullbody-tcm-v20',p)
shutil.rmtree(p/'checks',ignore_errors=True)
for name in ['release.json','build-info.json']:(p/name).unlink(missing_ok=True)
for src,dest in [('complete-female.js','female-complete-v21.js'),('layers-ui.js','layers-ui-v21.js'),('layers-ui.css','layers-ui-v21.css')]:shutil.copyfile(Path('atlas21-repair')/src,p/dest)
def change(name,old,new,count=1):
 f=p/name;s=f.read_text();assert old in s,(name,old[:100]);f.write_text(s.replace(old,new,count))
# Keep the currently published 20.0.1 state transaction implementation.
f=p/'female-v12.js';s=f.read_text();s="import {createFemaleCompletion} from './female-complete-v21.js';\n"+s
s=s.replace("labelsOn=false,side='both'","labelsOn=false,fineDetails=false,side='both'")
needle="const pane=document.createElement('section');";assert needle in s
s=s.replace(needle,"const completion=createFemaleCompletion({THREE,bones,loader});\n "+needle,1)
s=s.replace(".then(d=>catalog=d)",".then(async d=>catalog=await completion.getCatalog(d))",1)
a=s.index(' async function enable(id,on)');b=s.index(' let femaleSkinProjector',a)
s=s[:a]+''' function systemStatus(id,text){const node=$('femaleStatus-'+id);if(node)node.textContent=text;}
 async function enable(id,on){
  let entry=systems.get(id);if(!entry){entry={on:false,opacity:1,loaded:false,promise:null,meshes:[]};systems.set(id,entry);}entry.on=!!on;
  const cb=pane.querySelector(`[data-female-layer="${id}"]`);if(cb)cb.checked=entry.on;
  if(on&&!entry.loaded){if(!entry.promise){systemStatus(id,'加载中…');invalidate();entry.promise=(async()=>{
   await getCatalog();let nodes=[];
   if(completion.handles(id))nodes=await completion.load(id);
   else{const doc=await loader.loadAsync('../fullbody-tcm-v12/assets/female/'+id+'.glb');doc.scene.updateMatrixWorld(true);doc.scene.traverse(n=>{if(!n.isMesh)return;const row=catalog.entries.find(r=>r.id===n.name);if(!row)throw Error('女性结构无来源记录');n.userData.female=row;normalizeFemaleMesh(n,THREE);nodes.push(n);});const holder=new THREE.Group();for(const n of nodes){n.updateWorldMatrix(true,false);const g=n.geometry.clone().applyMatrix4(n.matrixWorld);n.geometry=g;n.position.set(0,0,0);n.quaternion.identity();n.scale.set(1,1,1);} }
   const holder=new THREE.Group();holder.name='female-system-'+id;
   for(const n of nodes){const row=n.userData.female;n.material=new THREE.MeshStandardMaterial({color:color(row),roughness:.73,metalness:0,envMapIntensity:row.system==='surface'?.08:.19,side:THREE.DoubleSide});n.geometry.computeBoundingBox();n.renderOrder=3;maps.set(row.id,n);holder.add(n);}
   entry.meshes=nodes;root.add(holder);entry.loaded=true;systemStatus(id,nodes.length+'部件');update();renderList();
  })().catch(e=>{entry.promise=null;entry.on=false;if(cb)cb.checked=false;systemStatus(id,'加载失败，点选重试');throw e;});}await entry.promise;}
  update();renderList();return entry;
 }
''' + s[b:]
s=s.replace("return colors[r.system];","return colors[r.nativeSystem||r.system]||'#c8b38e';")
s=s.replace("function contextMatch(r){","function contextMatch(r){if(r.nativeDetail)return r.id===selected;",1)
s=s.replace("function coarse(r){","function coarse(r){if(r.nativeDetail)return r.id===selected;if(fineDetails)return true;if(r.origin==='shared-teaching')return r.category!=='fascia';",1)
s=s.replace("r.side==='midline'||r.side===side","r.side==='midline'||r.side==='bilateral'||r.side===side")
s=s.replace("const cfg={surface:['surface']","const cfg={organs:['respiratory','vascular','digestive','urinary','reproductive','skeletal'],surface:['surface']",1)
s=s.replace("['chest','heart','abdomen','pelvis','vessels','nerves']","['organs','chest','heart','abdomen','pelvis','vessels','nerves']")
s=s.replace("surface:'女性体表',heart:","organs:'胸腹内脏',surface:'女性体表',heart:")
s=s.replace("surface:'体表外形',heart:","organs:'胸腹内脏',surface:'体表外形',heart:")
s=s.replace("skeletal:'骨骼与关节（部分）'","skeletal:'全身骨架'").replace("muscular:'肌肉（部分）'","muscular:'全身肌肉'").replace("nervous:'脑、脊髓与感官'","nervous:'全身神经'")
s=s.replace("nerves:'脑与脊髓'","nerves:'全身神经'")
s=s.replace("const colors=","groupNames['native-skeletal']='女性原生骨关节细节';groupNames['native-muscular']='女性原生局部肌肉';groupNames['native-nervous']='女性原生脑与感官细节';\n const colors=",1)
s=s.replace("function captureState(){return {preset,selected,isolated,mode,side,labelsOn,","function captureState(){return {preset,selected,isolated,mode,side,labelsOn,fineDetails,")
s=s.replace("labelsOn=!!v.labelsOn;","labelsOn=!!v.labelsOn;fineDetails=!!v.fineDetails;")
s=s.replace("const api={captureState,restoreState,","const api={getCompletionAudit:()=>completion.audit(),setFineDetails:v=>{fineDetails=!!v;update();},restoreHidden:()=>{hidden.clear();isolated=false;update();renderList();},captureState,restoreState,",1)
s=s.replace("active,preset,mode,side,view:viewName","active,preset,mode,side,fineDetails,view:viewName")
s=s.replace("source:'HRA united-female v1.5'","source:'HRA female + Z-Anatomy shared teaching'")
s=s.replace("maleMixedIn:false","mixedReferenceSources:true,originalMaleSceneVisible:false")
s=s.replace("<span class=\"group-tag\">女性参考 · HRA</span>","<span class=\"group-tag\">女性 · 完整教学参考</span>")
s=s.replace("HRA / HuBMAP，Visible Human Female 参考集 v1.5。独立于男性模型；以统一身材比例显示；不是原始体型，也不是临床器官配准。体表与部分器官已接入，骨骼、肌肉与周围神经的覆盖不完整。","女性体表、骨盆、内脏及特有器官来自 HRA / HuBMAP。全身骨架、肌肉与神经以 Z-Anatomy / BodyParts3D 统一比例教学参考补齐。补充结构不是女性原生扫描，不是临床器官配准。原生局部细节另在结构目录保留。")
s=s.replace("<p>HRA 女性参考集 v1.5，保留源结构。该参考集的骨骼、肌肉覆盖不完整。</p>","<p>${r.origin==='shared-teaching'?'Z-Anatomy / BodyParts3D 统一比例教学补充；不是女性原生扫描或临床配准。':'HRA 女性参考集 v1.5 原生几何；以统一教学比例显示。'}</p>")
s=s.replace(" 个女性结构"," 个已启用部件").replace(" 个结构'"," 个已启用部件'").replace("女性 · HRA参考","女性 · 原生＋教学补充")
f.write_text(s)
# The custom mixer is an ordinary open section, not another disclosure.
change('refinement-v12.js',"const custom=document.createElement('details');","const custom=document.createElement('section');custom.open=true;")
change('refinement-v12.js',"<summary>自定义组合与透明度</summary>","<h3>自定义图层</h3>")
change('refinement-v12.js',"女性：HRA / HuBMAP 独立参考集（CC BY 4.0）。两套数据分别展示；女性没有的骨骼、肌肉和周围神经，不借用男性填充。","女性：HRA / HuBMAP 原生结构＋Z-Anatomy / BodyParts3D 统一比例教学补充；每个补充结构单独标注来源，不作为女性原生扫描。")
f=p/'refinement-v12.js';s=f.read_text();s=s.replace('女性具有全身体表、女性生殖与部分器官；骨骼和肌肉并未覆盖全身。','女性具有全身体表、女性生殖与内脏；全身骨架、肌肉和神经使用已标明来源的教学参考补齐，女性骨盆保留原生几何。');f.write_text(s)
# Add direct pure-skin and whole-viscera presets.
change('tissues-v4.js',"const valid=['chest'","const valid=['organs','chest'")
change('tissues-v4.js',"const wanted={chest:","const wanted={organs:['heart','visceral'],chest:")
change('tissues-v4.js',"if(name==='chest')organBox=","if(name==='organs')organBox=new THREE.Box3(new THREE.Vector3(-150,620,-210),new THREE.Vector3(345,1470,185));\n  if(name==='chest')organBox=")
change('tissues-v4.js',"const viewNames={chest:","const viewNames={organs:'胸腹内脏',chest:")
f=p/'shared-v14.js';s=f.read_text().replace('// One persistent UI, two data adapters. No male coordinates are used as female anatomy.','// Persistent controls, independent scene adapters, explicit shared-teaching provenance.')
s=s.replace("const sceneNames={bones:","const sceneNames={skin:'纯体表',organs:'胸腹内脏',bones:")
s=s.replace("const mapping={bones:'bones'","const mapping={skin:'surface',organs:'organs',bones:'bones'")
s=s.replace("await tissues.setAnatomyView(key);","await tissues.setAnatomyView(key==='skin'?'surface':key);")
needle="  $('sharedDisplay').value='solid';";assert needle in s
s=s.replace(needle,"  if(key==='skin')learning.toggleTCM(false);\n"+needle,1)
s=s.replace("coverage.textContent=f?'女性模型 · 骨骼、周围神经为部分覆盖':'男性解剖参考'","coverage.textContent=f?'女性原生结构＋统一比例教学补充':'男性解剖参考'")
s=s.replace("function groupFor(r){return layers.find(l=>l[sex()].includes(r.system))","function groupFor(r){return layers.find(l=>l[sex()].includes(r.nativeSystem||r.system))")
s=s.replace("const arr=rows.filter(r=>(sys==='all'","const arr=rows.filter(r=>(scope==='native-details'?r.nativeDetail:!r.nativeDetail)&&(sys==='all'")
s=s.replace("scope==='visible'?' · 画面可见'","scope==='visible'?' · 已启用'").replace('画面可见</option>','已启用结构</option>')
s=s.replace("scope!=='visible'||visible.has(r.id)","scope!=='visible'||visible.has(r.id)")
s=s.replace("const api={runMutation:","const api={getModelCounts:()=>Object.fromEntries(['bones','muscular','nervous'].map(id=>[id,maleCatalog.filter(r=>r.system===id).length])),runMutation:",1)
# Separate incompatible V20 saved combinations from the new primary catalogs.
s=s.replace('atlas14:layers:','atlas21:layers:')
f.write_text(s)
# Connect one new UI module after existing shared controls are ready.
change('app.js',"import {initSharedControls}","import {initLayersV21} from './layers-ui-v21.js';\nimport {initSharedControls}")
change('app.js'," initViewportExperience({"," initLayersV21({learning:learningEnhancements,tissues:tissueLayer,female:femaleViewer,toast});\n initViewportExperience({")
# Existing anatomy terms, point coordinates and skin pigment remain unchanged.
for name in ['index.html','index.template.html']:
 f=p/name
 if f.exists():
  s=f.read_text();s=s.replace('</head>','<link rel="stylesheet" href="./layers-ui-v21.css?v=21.0.0"></head>');f.write_text(s)
for f in p.glob('*'):
 if f.suffix in ['.js','.html','.css']:
  s=f.read_text();s=re.sub(r'20\.0\.[01]','21.0.0',s).replace('V20 · 男女场景同步','V21 · 图层直达与完整教学参考');f.write_text(s)
(p/'README.md').write_text('''# V21 图层直达与完整教学参考

结构图层改为六个直达视图（体表经络、纯体表、全身骨骼、全身肌肉、全身神经、胸腹内脏），部位特写平铺。自定义勾选和显色滑杆常驻展开；删除重复的旧快捷入口、无效灰色选项和反复出现的说明。保存/载入组合沿用受控的场景事务，V21独立存储，不误读V20局部女性模型的旧组合。

## 女性结构补充不是虚增计数

全身骨架按男性参考相同的210个可选择骨模型部件组织。女性髋骨、骶骨、尾骨使用HRA原生几何，髋骨的髂/坐/耻骨皮质按同一整骨合并显示；其他骨架使用Z-Anatomy/BodyParts3D的统一比例教学参考。全身肌肉及附属组织683个部件（含110项筋膜等附属结构）、神经系统550个部件使用相同的明确标源教学参考。不修改原始GLB。

这不是新获取的完整女性扫描，不表示性别形态差异已全面配准。HRA女性体表、内脏、生殖和乳腺保持原生来源。原先的女性骨/肌/神经469个局部细分结构保留在“女性原生局部细节”目录，按点选单独呈现，不与整骨重复计数。每个条目区分female-native与shared-teaching来源。

数字是可选择模型部件数，不是人体标准骨数；不同数据集的心脏、器官拆分不能硬凑相等。经穴注册文件保持不变，仍未逐穴临床校准。

## 验证

checks包含实际浏览器图层操作、骨架210部件/身体区域覆盖、肌肉神经目录与真实网格数、女性原生骨盆、原生细节点选、左右侧、保存恢复、反复男女切换、纯体表与不透明绘线、桌面和平板截图。发布记录将本地资源测试和公网验证分开记录。

V20原路径保留。
''',encoding='utf-8')
with (p/'MODEL-LICENSES.txt').open('a') as f:f.write('\nV21 female teaching completion: Z-Anatomy / BodyParts3D meshes are copied into an independent common-proportion teaching scene; HRA female pelvis replaces four common bone parts. These derivatives retain CC BY-SA 4.0 / source attribution above. HRA native parts retain CC BY 4.0. No clinical or native-female-scan claim. Original source meshes and point registration unchanged.\n')
print('V21 assembled from published V20 with direct layers and explicit anatomy completion')
