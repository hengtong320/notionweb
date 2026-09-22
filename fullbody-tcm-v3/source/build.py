"""V3 is a new, additive viewer. No previously accepted viewer is modified."""
from pathlib import Path
import os,sys,json,hashlib,re,shutil,subprocess,base64
ROOT=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
SRC=ROOT/'fullbody-tcm-atlas';DST=ROOT/'fullbody-tcm-v3';TOOLS=Path(__file__).resolve().parent
BASE_SHA='87076e42ba71f57e9f74ae0c8bffbd30904af65c8b83939ef8dffc27d7c9d0ef'
assert hashlib.sha256((SRC/'index.html').read_bytes()).hexdigest()==BASE_SHA,'Baseline changed; review required'
if not DST.exists():shutil.copytree(SRC,DST)
for name in ('delivery-release.json',):
 (DST/name).unlink(missing_ok=True)
(DST/'qa').mkdir(exist_ok=True)
s=(SRC/'app.js').read_text()
def between(text,start,end,new):
 a=text.index(start);b=text.index(end,a+len(start));return text[:a]+new+'\n'+text[b:]
s=between(s,'function spineExplosion(id){','function explosionVector',r'''function spineExplosion(id){
 let seq=SPINE_SEQUENCE.filter(x=>regionContains(x)&&bones.has(x));
 if(['spine','lumbosacral'].includes(state.region))seq.push(...['sacrum','coccyx'].filter(x=>regionContains(x)&&bones.has(x)));
 if(!seq.includes(id)||seq.length<2)return new THREE.Vector3();
 // Stack original bounding surfaces, not alternating vectors. At 100%, every
 // adjacent pair has a positive vertical gap, while its X/Z and rotation stay fixed.
 const gap=seq.length<=7?23:17, target=[bones.get(seq[0]).userData.home.y];
 for(let i=1;i<seq.length;i++){
  const prev=bones.get(seq[i-1]),cur=bones.get(seq[i]);
  target[i]=target[i-1]+prev.geometry.boundingBox.min.y-cur.geometry.boundingBox.max.y-gap;
 }
 const bottomAnchored=['body','all','pelvic-limb','lumbosacral'].includes(state.region);
 const shift=bottomAnchored?bones.get(seq.at(-1)).userData.home.y-target.at(-1):
  (bones.get(seq[0]).userData.home.y+bones.get(seq.at(-1)).userData.home.y-target[0]-target.at(-1))/2;
 const i=seq.indexOf(id);return new THREE.Vector3(0,target[i]+shift-bones.get(id).userData.home.y,0);
}''')
s=s.replace("if(['cervical','thoracic','lumbar'].includes(b.group))return spineExplosion(id);","if(['cervical','thoracic','lumbar'].includes(b.group)||(['sacrum','coccyx'].includes(id)&&['spine','lumbosacral'].includes(state.region)))return spineExplosion(id);")
s=s.replace("b.userData.explosion=explosionVector(b.name,b.userData.home);", "b.userData.explosion=regionContains(b.name)?explosionVector(b.name,b.userData.home):new THREE.Vector3();")
s=s.replace("$('explode').addEventListener('input',()=>setExplode($('explode').value));", "$('explode').addEventListener('input',()=>setExplode($('explode').value,false));$('explode').addEventListener('change',()=>fitToContent(true));")
s=s.replace("'脊柱按解剖上下顺序展开，不再左右交错'", "'按上下轴向分层，完全展开时逐节留出间隙'")
s=between(s,'function bindPointer(){','function rebuildLabels',r'''function bindPointer(){
 const touches=new Set();let multiTouch=false;
 viewport.addEventListener('pointerdown',e=>{
  if(!state.ready||e.button!==0)return;cameraTween=null;
  if(e.pointerType==='touch'){
   touches.add(e.pointerId);
   if(touches.size>1){multiTouch=true;activePointer=null;controls.enabled=true;controls.enableRotate=true;return;}
  }
  const hit=pick(e);activePointer={id:e.pointerId,x:e.clientX,y:e.clientY,maxMove:0,hit:hit?.object||null,dragging:false,touch:e.pointerType==='touch'};
  if(hit&&state.mode!=='orbit'){
   selectBone(hit.object.name,false,true);const b=hit.object,normal=camera.getWorldDirection(new THREE.Vector3());
   activePointer={...activePointer,dragging:true,bone:b,startPosition:b.position.clone(),startQuaternion:b.quaternion.clone(),plane:new THREE.Plane().setFromNormalAndCoplanarPoint(normal,hit.point),anchor:hit.point.clone(),right:new THREE.Vector3(1,0,0).applyQuaternion(camera.quaternion),up:new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion)};
   if(activePointer.touch){controls.enableRotate=false;}else{controls.enabled=false;viewport.setPointerCapture(e.pointerId);e.preventDefault();e.stopPropagation();}
   $('hoverTip').hidden=true;
  }
 },{capture:true});
 viewport.addEventListener('pointermove',e=>{
  if(!state.ready)return;
  const a=activePointer;if(a?.id===e.pointerId)a.maxMove=Math.max(a.maxMove,Math.hypot(e.clientX-a.x,e.clientY-a.y));
  if(multiTouch||touches.size>1)return;
  if(a?.dragging&&a.id===e.pointerId){const b=a.bone;
   if(state.mode==='move'){pointerCoords(e);raycaster.setFromCamera(mouse,camera);const p=raycaster.ray.intersectPlane(a.plane,new THREE.Vector3());if(p){b.position.copy(a.startPosition).add(p.sub(a.anchor));b.userData.offset.copy(b.position).sub(b.userData.home).addScaledVector(b.userData.explosion,-state.explode/100);}}
   else{const dx=(e.clientX-a.x)*.009,dy=(e.clientY-a.y)*.009,q1=new THREE.Quaternion().setFromAxisAngle(a.up,dx),q2=new THREE.Quaternion().setFromAxisAngle(a.right,dy);b.quaternion.copy(q1).multiply(q2).multiply(a.startQuaternion).normalize();}
   updateGhosts();e.stopPropagation();return;
  }
  if(e.buttons||e.pointerType==='touch'){$('hoverTip').hidden=true;return;}
  const hit=pick(e),id=hit?.object.name||'';if(id!==hoveredId){hoveredId=id;applyVisibility();}
  if(hit){const r=viewport.getBoundingClientRect();$('hoverTip').textContent=BY_ID[id].name+' '+bonePinyin(BY_ID[id]);$('hoverTip').style.left=Math.min(e.clientX-r.left+15,r.width-170)+'px';$('hoverTip').style.top=Math.max(8,e.clientY-r.top-32)+'px';$('hoverTip').hidden=false;}else $('hoverTip').hidden=true;
 },{capture:true});
 function end(e,cancel=false){
  const a=activePointer,wasMulti=multiTouch;
  if(e.pointerType==='touch'){touches.delete(e.pointerId);if(!touches.size)multiTouch=false;}
  if(a?.id===e.pointerId){
   activePointer=null;
   if(a.dragging){if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);controls.enabled=true;controls.enableRotate=true;updateTree();if(!a.touch)e.stopPropagation();}
   else if(!cancel&&!wasMulti&&e.button===0&&a.maxMove<(a.touch?9:5)&&Math.hypot(e.clientX-a.x,e.clientY-a.y)<(a.touch?9:5)){
    if(window.__ATLAS_LEARNING__?.handlePointerClick(e))return;const hit=pick(e);if(hit)selectBone(hit.object.name,false,true);
   }
  }
  if(!touches.size){controls.enableRotate=true;controls.enabled=true;}
 }
 viewport.addEventListener('pointerup',e=>end(e),{capture:true});viewport.addEventListener('pointercancel',e=>end(e,true),{capture:true});
 viewport.addEventListener('lostpointercapture',e=>{if(activePointer?.id===e.pointerId)end(e,true);});
 viewport.addEventListener('pointerleave',()=>{$('hoverTip').hidden=true;if(!activePointer?.dragging&&hoveredId){hoveredId='';applyVisibility();}});
 viewport.addEventListener('dblclick',e=>{if(state.ready){if(window.__ATLAS_LEARNING__?.hitPoint(e))return;const hit=pick(e);if(hit){selectBone(hit.object.name,false,true);fitToContent(true,null,null,true);}}});viewport.addEventListener('contextmenu',e=>e.preventDefault());
}''')
helper=r'''
function focusBounds(box){
 if(!state.ready||box.isEmpty())return;cameraTween=null;const old=controls.enableDamping;controls.enableDamping=false;controls.update();
 const center=box.getCenter(new THREE.Vector3()),dir=camera.position.clone().sub(controls.target).normalize();if(dir.lengthSq()<.1||Math.abs(dir.y)>.96)dir.set(0,.1,1).normalize();
 camera.up.set(0,1,0);syncCameraUp();const right=new THREE.Vector3().crossVectors(camera.up,dir).normalize(),up=new THREE.Vector3().crossVectors(dir,right).normalize();let mx=0,my=0,depth=0;
 for(let i=0;i<8;i++){const v=new THREE.Vector3(i&1?box.max.x:box.min.x,i&2?box.max.y:box.min.y,i&4?box.max.z:box.min.z).sub(center);mx=Math.max(mx,Math.abs(v.dot(right)));my=Math.max(my,Math.abs(v.dot(up)));depth=Math.max(depth,Math.abs(v.dot(dir)));}
 const h=viewport.clientHeight,w=viewport.clientWidth,t=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));const hf=clamp((h-350)/h,.34,.70),wf=clamp((w-80)/w,.50,.88);
 const distance=Math.max(my/(t*hf),mx/(t*camera.aspect*wf))+depth+20;camera.position.copy(center).addScaledVector(dir,distance);controls.target.copy(center);controls.minDistance=5;controls.maxDistance=Math.max(5000,distance*4);camera.far=Math.max(24000,distance*8);camera.updateProjectionMatrix();controls.update();controls.enableDamping=old;
}
let renderQuality='auto',lastViewportSize='',lastPaint=0;
function renderDPR(){return Math.min(window.devicePixelRatio||1,renderQuality==='high'?2:renderQuality==='balanced'?1:(innerWidth<=1100?1.25:2));}
function applyRenderQuality(){if(!renderer)return;renderer.setPixelRatio(renderDPR());composer?.setPixelRatio(renderDPR());if(aoPass)aoPass.enabled=renderQuality==='high'||renderQuality==='auto'&&innerWidth>1100;if(previewRenderer)previewRenderer.setPixelRatio(Math.min(renderDPR(),1.5));resize();}
'''
s=s.replace('function setupRenderer(){',helper+'\nfunction setupRenderer(){')
s=s.replace('renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));','renderer.setPixelRatio(renderDPR());')
s=s.replace("composer.addPass(new OutputPass());renderer.domElement", "composer.addPass(new OutputPass());aoPass.enabled=innerWidth>1100;renderer.domElement")
s=between(s,'function resize(){','async function loadModel',r'''function resize(){
 if(!renderer)return;const w=Math.max(1,viewport.clientWidth),h=Math.max(1,viewport.clientHeight),key=w+','+h,changed=key!==lastViewportSize;lastViewportSize=key;
 renderer.setSize(w,h);camera.aspect=w/h;camera.setViewOffset(w,h,0,22,w,h);camera.updateProjectionMatrix();composer.setSize(w,h);
 if(previewRenderer){const p=$('preview'),pw=Math.max(p.clientWidth,1),ph=Math.max(p.clientHeight,1);previewRenderer.setSize(pw,ph);previewCamera.aspect=pw/ph;previewCamera.updateProjectionMatrix();if(state.ready)updatePreview();}
 if(changed&&state.ready)fitToContent(false);needsLabelRebuild=true;
}''')
s=s.replace('syncAOProjection();composer.render(dt);', 'learningEnhancements?.updateFrame?.();syncAOProjection();composer.render(dt);')
s=s.replace("if(previewMesh&&$('preview').clientWidth>0", "if(previewMesh&&(innerWidth>1100||document.body.classList.contains('detail-open'))&&$('preview').clientWidth>0")
s=s.replace("if(!renderer||document.hidden)return;const dt", "if(!renderer||document.hidden)return;const fps=renderQuality==='balanced'||renderQuality==='auto'&&innerWidth<=1100?30:60;if(now-lastPaint<1000/fps-1)return;lastPaint=now;const dt")
s=s.replace("function bindUI(){", "function bindUI(){$('renderQuality').addEventListener('change',()=>{renderQuality=$('renderQuality').value;applyRenderQuality();});")
s=s.replace('duration:480','duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?1:480')
s=s.replace('fitToContent,bonePinyin,MERIDIANS,ACUPOINTS}', 'fitToContent,focusBounds,setView,bonePinyin,MERIDIANS,ACUPOINTS}')
s=s.replace('getState:()=>({region:', 'getState:()=>({version:"3.0",renderQuality,pixelRatio:renderer?.getPixelRatio(),region:')
s=s.replace('triangles:b.geometry.index.count/3', 'boundsMin:b.geometry.boundingBox.min.toArray(),boundsMax:b.geometry.boundingBox.max.toArray(),triangles:b.geometry.index.count/3')
(DST/'app.js').write_text(s)
old=(SRC/'learning-enhancements.js').read_text();route=old[old.index(' function idFor'):old.index(' function buildRoutes')]
new=(TOOLS/'learning-v3.js').read_text().replace(' /* ORIGINAL_ROUTES */',route)
(DST/'learning-enhancements.js').write_text(new)
(DST/'styles.css').write_text((SRC/'styles.css').read_text()+'\n'+(TOOLS/'styles-v3.css').read_text())
h=(SRC/'index.template.html').read_text()
h=h.replace('<title>全身骨骼研习室 · Full-body Skeletal Atlas</title>','<title>骨骼研习室 V3 · 操作优化版</title>')
h=h.replace('<div class="header-actions">','<span class="release-badge" id="releaseBadge">V3 · 操作优化</span><div class="header-actions"><select id="renderQuality" class="quality-select" aria-label="渲染画质"><option value="auto">画质自动</option><option value="high">高清</option><option value="balanced">流畅</option></select>')
h=h.replace('最大缩放','最大缩放').replace('width=device-width, initial-scale=1','width=device-width, initial-scale=1, viewport-fit=cover')
(DST/'index.template.html').write_text(h)
subprocess.run(['node','--check',str(DST/'app.js')],check=True)
subprocess.run(['node','--check',str(DST/'learning-enhancements.js')],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(DST/'app.js'),str(DST/'app.bundle.js')],check=True)
h=h.replace('<link rel="stylesheet" href="styles.css">','<style>'+(DST/'styles.css').read_text()+'</style>')
h=re.sub(r'<script type="importmap">.*?</script>','',h,flags=re.S)
h=h.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((DST/'assets/fullbody.glb').read_bytes()).decode()+'";</script>\n<script>'+(DST/'app.bundle.js').read_text().replace('</script','<\\/script')+'</script>')
(DST/'index.html').write_text(h)
info={'version':'fullbody-tcm-v3','baselineHTMLSHA256':BASE_SHA,'bones':210,'htmlSHA256':hashlib.sha256(h.encode()).hexdigest(),'htmlBytes':len(h.encode()),'modelSHA256':hashlib.sha256((DST/'assets/fullbody.glb').read_bytes()).hexdigest(),'bonesUnchanged':(DST/'assets/fullbody.glb').read_bytes()==(SRC/'assets/fullbody.glb').read_bytes(),'standardPointNames':361,'coordinateStatus':'unvalidated schematic interpolation; not anatomical point localization','renderer':'three 0.180.0','noModelCDN':True}
(DST/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
(DST/'README.md').write_text('''# 骨骼研习室 V3 — 操作优化版

入口：https://hengtong320.github.io/notionweb/fullbody-tcm-v3/

独立发布，不覆盖任何已验收旧页面。原210块骨及其网格完全保留。

经络设置移入左侧目录；收起设置、收起详情和隐藏图层是三个不同操作。画面上保留图层开关、经脉切换与看全线。点线采用固定屏幕宽度，不随缩放变成大球；点位轻点选择，拖动仍旋转。穴位姓名标签避让，支持左右过滤、上下穴切换、无声调拼音搜索。左右指人体自身。

腰椎、胸椎、颈椎按原骨表面高度沿纵轴分层；完全展开时保证各相邻椎骨包围盒有空隙。不旋转或左右甩出。滑杆拖动期间不反复抢镜头，松开后重新适配。归位恢复原始位置与方向。

手机/平板主画面不再被三列挤压：可收起目录与详情，保留部位入口、骨名拼音和朗读。有自动/高清/流畅画质。检测脚本报告具体环境，不代表所有真实设备认证。

重要：经穴名称和归经与3D定位不是同一回事。当前361个名称的3D点仍是旧版沿示意曲线插值排列，未经逐穴体表定位校准。不能以该点坐标或邻近网格推断标准取穴位置；本轮没有声称提高穴位定位准确度，不用于针刺、治疗或手法复位。骨骼自由展开也不代表真实运动。

原模型与许可见 MODEL-LICENSES.txt；没有额外打包系统字体或语音。朗读能力取决于设备中文语音。
''')
print(json.dumps(info,ensure_ascii=False))
