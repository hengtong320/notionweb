from pathlib import Path
import os,re
p=Path('fullbody-tcm-v15')
f=p/'female-v12.js';s=f.read_text();anchor=' function updateLabel(){';assert anchor in s
code=r'''
 const viewCue=document.createElement('div');viewCue.id='femaleViewCue';viewCue.className='empty-view-cue';viewCue.hidden=true;viewCue.setAttribute('role','status');viewCue.innerHTML='<span></span><button type="button">看当前结构</button>';document.querySelector('.stage').append(viewCue);
 const viewFrustum=new THREE.Frustum(),viewMatrix=new THREE.Matrix4(),viewBox=new THREE.Box3(),sampleVertex=new THREE.Vector3(),visibilityRay=new THREE.Raycaster();let coverageSignature='',viewCoverage={active:false,loadedVisible:0,inFrustum:0,visibleSurfaceHits:0,needsRefocus:false};
 function syncViewCoverage(){
  if(!active){viewCue.hidden=true;coverageSignature='';viewCoverage={active:false,loadedVisible:0,inFrustum:0,visibleSurfaceHits:0,needsRefocus:false};return;}
  const pending=sexBusy||window.__ATLAS_SHARED__?.getState().busy||[...systems.values()].some(x=>x.promise&&!x.loaded);
  if(pending){viewCue.hidden=true;coverageSignature='';return;}
  camera.updateMatrixWorld(true);root.updateMatrixWorld(true);
  const ns=visible(),signature=camera.matrixWorld.elements.join(',')+'|'+camera.projectionMatrix.elements.join(',')+'|'+ns.map(n=>n.uuid).join(',');if(signature===coverageSignature)return;coverageSignature=signature;
  viewMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);viewFrustum.setFromProjectionMatrix(viewMatrix);
  const candidates=[];for(const n of ns){if(!n.geometry.boundingBox)n.geometry.computeBoundingBox();viewBox.copy(n.geometry.boundingBox).applyMatrix4(n.matrixWorld);if(viewFrustum.intersectsBox(viewBox))candidates.push(n);}
  let surfaceHits=0,samples=0,rayChecks=0;
  for(const n of candidates){const a=n.geometry.attributes.position,step=Math.max(1,Math.floor(a.count/64));for(let i=0;i<a.count;i+=step){sampleVertex.fromBufferAttribute(a,i).applyMatrix4(n.matrixWorld).project(camera);samples++;if(sampleVertex.z>=-1&&sampleVertex.z<=1&&Math.abs(sampleVertex.x)<.92&&sampleVertex.y>-.82&&sampleVertex.y<.56){surfaceHits++;break;}}if(surfaceHits)break;}
  // A large surface can fill the view even when all sampled vertices are outside.
  // Confirm with real triangle hits; a loose artery bounding box is not a visible organ.
  if(!surfaceHits&&candidates.length){visibilityRay.near=camera.near;visibilityRay.far=camera.far;for(const [x,y]of [[0,0],[0,.35],[0,-.35],[-.35,0],[.35,0]]){visibilityRay.setFromCamera(new THREE.Vector2(x,y),camera);rayChecks++;if(visibilityRay.intersectObjects(candidates,false).length){surfaceHits++;break;}}}
  viewCoverage={active:true,loadedVisible:ns.length,inFrustum:candidates.length,visibleSurfaceHits:surfaceHits,sampledVertices:samples,raycastChecks:rayChecks,needsRefocus:ns.length>0&&surfaceHits===0};
  viewCue.hidden=surfaceHits>0;viewCue.querySelector('span').textContent=ns.length?'当前结构不在主要视野内，已保留你的视角。':'当前图层没有可见结构。';viewCue.querySelector('button').textContent=ns.length?'看当前结构':'看女性体表';
 }
 viewCue.querySelector('button').onclick=()=>{if(visible().length){fit(camera.position.clone().sub(controls.target).normalize().toArray());invalidate();}else window.__ATLAS_SHARED__?.choose('surface',false);};
'''
if ' const viewCue=' in s:
 start=s.index(' const viewCue=');end=s.index(anchor,start);s=s[:start]+code+s[end:]
else:s=s.replace(anchor,code+anchor)
s=s.replace('function updateLabel(){if(active)', 'function updateLabel(){syncViewCoverage();if(active)')
if 'getViewCoverage:' not in s:s=s.replace('get active(){return active;}', 'getViewCoverage:()=>({...viewCoverage}),get active(){return active;}')
s=s.replace('部分系统覆盖 · V13','部分系统覆盖 · V15').replace("+'-V14.png'","+'-V15.png'");f.write_text(s)
f=p/'shared-v14.js';f.write_text(re.sub(r"version:'15\.0\.[01]'","version:'15.0.2'",f.read_text()))
f=p/'shared-v14.css'
if '.empty-view-cue{' not in f.read_text():f.write_text(f.read_text()+r'''
.empty-view-cue{position:absolute;z-index:6;left:50%;bottom:108px;transform:translateX(-50%);display:flex;align-items:center;gap:12px;max-width:calc(100% - 32px);padding:10px 13px;background:#fffffff2;border:1px solid #d7e1d8;border-radius:10px;box-shadow:0 3px 14px #2645320a;font-size:12px;line-height:1.6;color:#426253}.empty-view-cue button{flex:none;min-height:36px;border:1px solid #bed1c2;padding:5px 10px;border-radius:7px;background:#eef5e9;color:#2d6554}.empty-view-cue span{min-width:0}.empty-view-cue[hidden]{display:none!important}
@media(max-width:600px){.empty-view-cue{bottom:90px;gap:8px;padding:8px 10px;width:calc(100% - 28px)}.empty-view-cue button{min-height:42px}.detail-open .empty-view-cue,.nav-open .empty-view-cue{display:none}}
''')
f=p/'README.md';f.write_text(f.read_text()+'''\n\n15.0.2：视野提示同时检查实际网格采样和三角形射线命中，避免长血管包围盒进入视野、实际结构却不在画面中的误判。增加故意移出视野再点击恢复的必经检查。不会自动改变相机；这项检查与经穴定位准确度无关。\n''')
tools=Path(os.environ.get('ATLAS15_REVIEW_TOOLS','/tmp/atlas15-reviewed/atlas15-delivery'))
f=tools/'build.cjs';f.write_text(f.read_text().replace("version:'15.0.0'","version:'15.0.2'"))
f=tools/'verify.cjs';s=f.read_text().replace("'15.0.0'","'15.0.2'");a="await snap('female-shared');";assert a in s
s=s.replace(a,"""const heldFemale=await cam();await page.evaluate(()=>__ATLAS_FEMALE__.updateFrame());const coverage=await page.evaluate(()=>__ATLAS_FEMALE__.getViewCoverage());ck('Female view has an actual mesh surface or an explicit recovery control',coverage.visibleSurfaceHits>0||await page.locator('#femaleViewCue').isVisible(),coverage);ck('Offscreen helper never changes the preserved camera',distance(heldFemale,await cam())<.001);await snap('female-preserved-context');await page.evaluate(()=>{const c=__FOOT_ATLAS__.captureCamera();c.position[0]+=5000;c.target[0]+=5000;__FOOT_ATLAS__.restoreCamera(c);});await settle();await page.evaluate(()=>__ATLAS_FEMALE__.updateFrame());ck('Deliberately panned-out view always offers an actual recovery control',await page.locator('#femaleViewCue').isVisible()&&await page.evaluate(()=>__ATLAS_FEMALE__.getViewCoverage().needsRefocus));await snap('female-empty-view-guidance');await page.locator('#femaleViewCue button').click();await settle();await page.evaluate(()=>__ATLAS_FEMALE__.updateFrame());ck('Actual recovery button returns real female surfaces to the view',await page.evaluate(()=>__ATLAS_FEMALE__.getViewCoverage().visibleSurfaceHits>0)&&await page.locator('#femaleViewCue').isHidden());await snap('female-shared');""")
f.write_text(s)
print('CONTEXT_REVIEW: actual surface checks plus mandatory recovery journey; no automatic refocus')
