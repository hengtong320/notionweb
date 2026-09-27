from pathlib import Path
import shutil,json,re,hashlib
root=Path('.');base=root/'fullbody-tcm-v15';dst=root/'fullbody-tcm-v16';tools=root/'atlas16-delivery'
assert hashlib.sha256((base/'app.bundle.js').read_bytes()).hexdigest()=='5ba997d77c390d6f6469bf23088f3629af1654750209ec10f8e5dabdec6d43cb','V15 baseline changed'
if dst.exists():shutil.rmtree(dst)
shutil.copytree(base,dst,ignore=shutil.ignore_patterns('checks','delivery-release.json','build-info.json','*.pretty.js'))
(dst/'checks').mkdir()
def replace(file,old,new):
 p=dst/file;s=p.read_text();assert old in s,(file,old[:100]);p.write_text(s.replace(old,new))
for n in ['view-v16.js','view-v16.css','hegu-reference-v16.json']:
 shutil.copy2(tools/n,dst/n)
p=dst/'app.js';s=p.read_text();s="import {initViewportExperience,fitFractions} from './view-v16.js';\n"+s
s=s.replace('hFraction=clamp((h-315)/h,.37,.72),wFraction=clamp((w-130)/w,.47,.86)','hFraction=fitFractions(viewport).hf,wFraction=fitFractions(viewport).wf').replace('+depth*.68','+depth+12')
start=s.index("const dock=document.querySelector('.control-dock');const reserved=");end=s.index('\n const distance=',start)
s=s[:start]+"const {hf,wf}=fitFractions(viewport);"+s[end:]
s=s.replace('camera.setViewOffset(w,h,0,22,w,h);','camera.clearViewOffset();')
s=s.replace('if(v.view?.enabled)camera.setViewOffset(v.view.fullWidth,v.view.fullHeight,v.view.offsetX,v.view.offsetY,v.view.width,v.view.height);else camera.clearViewOffset();','camera.clearViewOffset();')
anchor=' initSharedControls({THREE,camera,controls,learning:learningEnhancements,tissues:tissueLayer,female:femaleViewer,state,bones,toast,invalidate,captureCamera,restoreCamera});'
assert anchor in s
s=s.replace(anchor,anchor+'\n initViewportExperience({THREE,scene,camera,controls,viewport,focusBounds,resize,invalidate,captureCamera,restoreCamera,state,bones,female:femaleViewer,tissues:tissueLayer,learning:learningEnhancements,toast});')
p.write_text(s)
p=dst/'tissues-v4.js';s=p.read_text();s=s.replace("setRegion(name==='chest'||name==='heart'?'thorax':name.startsWith('ear-')?'auditory':'body');","setRegion(name.startsWith('ear-')?'auditory':'body');")
s=s.replace("state.bonesOn=name==='vascular'||name.startsWith('ear-');", "state.bonesOn=name!=='surface';")
s=s.replace("setBoneOpacity(name==='surface'?.08:name.startsWith('ear-')?.1:.08);", "setBoneOpacity(name==='surface'?.08:name.startsWith('ear-')?.1:.32);")
s=s.replace("clipOn=name==='heart';","clipOn=false;")
s=s.replace("box.expandByScalar(name.startsWith('ear-')?8:25)","box.expandByScalar(name.startsWith('ear-')?8:name==='surface'?25:135)")
anchor=' function choose(id,focus=false){';assert anchor in s
s=s.replace(anchor,""" function ensureBodyContext(){
  if(state.bodySex==='female')return false;isolated=false;state.tissueIsolated=false;state.isolated=false;state.bonesOn=true;$('bonesOn').checked=true;
  setRegion('body',false,{keepStudy:true});setBoneOpacity(.32);ctx.applyVisibility();lastKey='';updateFrame();return true;
 }
"""+anchor)
s=s.replace("if(focus){state.isolated=false;ctx.applyVisibility();focusBounds(new THREE.Box3().setFromObject(n).expandByScalar(15));", "if(focus){const contextual=['heart','visceral','vessels'].includes(selected.system)&&!isolated;if(contextual)ensureBodyContext();state.isolated=false;ctx.applyVisibility();focusBounds(new THREE.Box3().setFromObject(n).expandByScalar(contextual?120:15));")
s=s.replace('const api={setAnatomyView,','const api={ensureBodyContext,setAnatomyView,')
p.write_text(s)
p=dst/'female-v12.js';s=p.read_text()
s=s.replace("function contextMatch(r){", "function contextMatch(r){if(['chest','abdomen','pelvis','vessels'].includes(preset)&&['surface','skeletal'].includes(r.system))return true;")
s=s.replace("chest:['respiratory','vascular']", "chest:['respiratory','vascular','surface','skeletal']")
s=s.replace("abdomen:['digestive','urinary']", "abdomen:['digestive','urinary','surface','skeletal']")
s=s.replace("pelvis:['reproductive','skeletal','urinary']", "pelvis:['reproductive','skeletal','urinary','surface']")
s=s.replace("vessels:['vascular']", "vessels:['vascular','surface','skeletal']")
s=s.replace("if(!active||token!==serial)return false;update();renderList();", "if(!active||token!==serial)return false;if(['chest','abdomen','pelvis','vessels'].includes(id)){systems.get('surface').opacity=.10;systems.get('skeletal').opacity=.35;}else{if(systems.get('surface'))systems.get('surface').opacity=1;if(systems.get('skeletal'))systems.get('skeletal').opacity=1;}update();renderList();")
s=s.replace(" function focus(){", """ async function ensureBodyContext(){isolated=false;await Promise.all([enable('surface',true),enable('skeletal',true)]);systems.get('surface').opacity=.10;systems.get('skeletal').opacity=.35;update();return true;}
 function focus(){""")
s=s.replace('new THREE.Box3().setFromObject(n).expandByScalar(12),{direction:', "new THREE.Box3().setFromObject(n).expandByScalar(!isolated&&['respiratory','vascular','digestive','urinary','reproductive'].includes(n.userData.female.system)?115:12),{direction:")
s=s.replace("if(!active)return false;hidden.delete(id);", "if(!active)return false;if(['respiratory','vascular','digestive','urinary','reproductive'].includes(row.system))await ensureBodyContext();hidden.delete(id);")
s=s.replace('const api={setDisplayMode:', 'const api={ensureBodyContext,setDisplayMode:')
p.write_text(s)
p=dst/'shared-v14.js';s=p.read_text()
s=s.replace("if(ticket!==selectionTicket)return;$('sharedDisplay').value=saved.display;", "if(ticket!==selectionTicket)return;if(['chest','heart','abdomen','vascular','pelvis'].includes(saved.scene)){if(female.active)await female.ensureBodyContext();else tissues.ensureBodyContext();}if(ticket!==selectionTicket)return;$('sharedDisplay').value=saved.display;")
s=s.replace('V15 · 经络与切换修订','V16 · 平板与人体观察').replace("version:'15.0.2'","version:'16.0.0'")
p.write_text(s)
audit=json.loads((tools/'hegu-reference-v16.json').read_text());p=dst/'navigation-points-v6.js';s=p.read_text();head,suffix=s.split('export const NAVIGATION_POINTS=',1);points=json.loads(suffix.rstrip().rstrip(';'))
for x in points:
 if x['code']=='LI4':
  x.update(position=audit['position'],view=audit['view'],originalPosition=audit['oldPosition'],focusRadius=62,positionQuality='bone-midshaft-reference-unregistered',navigationOnly=True,method='本模型第2掌骨长轴中点、桡侧边界与手背方向的几何学习参照；未完成体表独立配准',locationNote='手背，第2掌骨桡侧中点处（拇指侧）。当前参照按掌骨中段重新计算；体表精确位置仍待独立复核。',sourceScheme='LI4文字定位与模型几何参照分开记录；参见hegu-reference-v16.json')
p.write_text(head+'export const NAVIGATION_POINTS='+json.dumps(points,ensure_ascii=False,separators=(',',':'))+';\n')
p=dst/'evidence-data-v9.json';d=json.loads(p.read_text());r=d['points']['LI4'];r['location']='手背，第2掌骨桡侧中点处；桡侧是拇指侧。';r['requiredLandmarks']='第1、2掌骨，第2掌骨中段与拇指侧方向，手背体表及手部姿势。';r['anatomyCaution']='本模型已依据第2掌骨长轴中点重新计算几何参照，并修正为手背观察。掌骨几何不等于个体皮肤上的精确位置，体表配准与独立复核仍未完成。';r['positionStatus']='bone-reference-unregistered';p.write_text(json.dumps(d,ensure_ascii=False,indent=2))
p=dst/'index.html';s=p.read_text();s=s.replace('</head>','<link rel="stylesheet" href="view-v16.css?v=16.0.0">\n</head>');s=s.replace('15.0.2','16.0.0').replace('V14 · 共用学习界面','V16 · 平板与人体观察').replace('fullbody-tcm-v15/','fullbody-tcm-v16/');p.write_text(s)
for n in ['evidence.html','versions.html']:
 p=dst/n;s=p.read_text().replace('15.0.2','16.0.0');p.write_text(s)
(dst/'README.md').write_text('''# V16 平板与人体观察\n\n保留原界面与模型。铺满看图不依赖系统全屏；系统退出后保留网页看图状态，用户可明确退出。双指缩放平移、单指平移切换、完整显示、同一侧栏。此策略不声称修复iPadOS系统自身的全屏行为。\n\n器官默认在原坐标并显示骨架参照；女性使用自身部分骨架及体表，不混用男性结构。单独查看仍可主动选择。\n\nLI4按本模型第2掌骨长轴中点与桡侧边界更新几何参照，纠正手背观察方向；不是临床配准。其他穴位没有批量调整。骨骼、器官等模型顶点未修改。\n\n验收分别记录数据、实浏览器触摸/全屏状态/视野、器官上下文以及公开页面。模拟iPad尺寸与WebKit不等于实机验收。\n''')
print('V16 focused patch applied')
