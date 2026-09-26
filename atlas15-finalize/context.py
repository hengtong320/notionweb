from pathlib import Path
import os
p=Path('fullbody-tcm-v15')
f=p/'female-v12.js';s=f.read_text()
anchor=' function updateLabel(){'
assert anchor in s
code=r'''
 const viewCue=document.createElement('div');viewCue.id='femaleViewCue';viewCue.className='empty-view-cue';viewCue.hidden=true;viewCue.setAttribute('role','status');viewCue.innerHTML='<span></span><button type="button">看当前结构</button>';document.querySelector('.stage').append(viewCue);
 const viewFrustum=new THREE.Frustum(),viewMatrix=new THREE.Matrix4(),viewBox=new THREE.Box3();let viewCoverage={active:false,loadedVisible:0,inFrustum:0,needsRefocus:false};
 function syncViewCoverage(){
  if(!active){viewCue.hidden=true;viewCoverage={active:false,loadedVisible:0,inFrustum:0,needsRefocus:false};return;}
  const pending=sexBusy||window.__ATLAS_SHARED__?.getState().busy||[...systems.values()].some(x=>x.promise&&!x.loaded);
  camera.updateMatrixWorld(true);root.updateMatrixWorld(true);viewMatrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);viewFrustum.setFromProjectionMatrix(viewMatrix);
  const ns=visible();let inFrame=0;
  for(const n of ns){if(!n.geometry.boundingBox)n.geometry.computeBoundingBox();viewBox.copy(n.geometry.boundingBox).applyMatrix4(n.matrixWorld);if(viewFrustum.intersectsBox(viewBox))inFrame++;}
  viewCoverage={active:true,loadedVisible:ns.length,inFrustum:inFrame,needsRefocus:!pending&&ns.length>0&&inFrame===0};
  viewCue.hidden=!!pending||inFrame>0;
  viewCue.querySelector('span').textContent=ns.length?'当前结构在视野外，已保留你的视角。':'当前图层没有可见结构。';
  viewCue.querySelector('button').textContent=ns.length?'看当前结构':'看女性体表';
 }
 viewCue.querySelector('button').onclick=()=>{if(visible().length){fit(camera.position.clone().sub(controls.target).normalize().toArray());invalidate();}else window.__ATLAS_SHARED__?.choose('surface',false);};
'''
s=s.replace(anchor,code+anchor).replace('function updateLabel(){if(active)', 'function updateLabel(){syncViewCoverage();if(active)')
s=s.replace('get active(){return active;}', 'getViewCoverage:()=>({...viewCoverage}),get active(){return active;}')
s=s.replace('部分系统覆盖 · V13','部分系统覆盖 · V15').replace("+'-V14.png'","+'-V15.png'")
f.write_text(s)
f=p/'shared-v14.js';s=f.read_text().replace("version:'15.0.0'","version:'15.0.1'");f.write_text(s)
f=p/'shared-v14.css';f.write_text(f.read_text()+r'''
.empty-view-cue{position:absolute;z-index:6;left:50%;bottom:108px;transform:translateX(-50%);display:flex;align-items:center;gap:12px;max-width:calc(100% - 32px);padding:10px 13px;background:#fffffff2;border:1px solid #d7e1d8;border-radius:10px;box-shadow:0 3px 14px #2645320a;font-size:12px;line-height:1.6;color:#426253}.empty-view-cue button{flex:none;min-height:36px;border:1px solid #bed1c2;padding:5px 10px;border-radius:7px;background:#eef5e9;color:#2d6554}.empty-view-cue span{min-width:0}.empty-view-cue[hidden]{display:none!important}
@media(max-width:600px){.empty-view-cue{bottom:90px;gap:8px;padding:8px 10px;width:calc(100% - 28px)}.empty-view-cue button{min-height:42px}.detail-open .empty-view-cue,.nav-open .empty-view-cue{display:none}}
''')
f=p/'README.md';f.write_text(f.read_text()+'''\n\n15.0.1 画面复核补丁：男女切换保留当前相对视角。若女性源结构位于当前视野之外，显示可关闭侧栏后使用的“看当前结构”操作；不自动转动或缩放，不把视野之外误报成模型加载失败。女性截图版本标识同步更新。\n''')
tools=Path(os.environ.get('ATLAS15_REVIEW_TOOLS','/tmp/atlas15-reviewed/atlas15-delivery'))
f=tools/'build.cjs';f.write_text(f.read_text().replace("version:'15.0.0'","version:'15.0.1'"))
f=tools/'verify.cjs';s=f.read_text().replace("'15.0.0'","'15.0.1'")
a="await snap('female-shared');"
assert a in s
s=s.replace(a,"""const heldFemale=await cam();await page.evaluate(()=>__ATLAS_FEMALE__.updateFrame());const coverage=await page.evaluate(()=>__ATLAS_FEMALE__.getViewCoverage());ck('Offscreen female structures are explained without forcing a camera reset',coverage.inFrustum>0||await page.locator('#femaleViewCue').isVisible(),coverage);ck('Offscreen helper never changes the preserved camera',distance(heldFemale,await cam())<.001);await snap('female-preserved-context');if(coverage.needsRefocus){await page.locator('#femaleViewCue button').click();await settle();await page.evaluate(()=>__ATLAS_FEMALE__.updateFrame());ck('Explicit current-structure action brings real female geometry into view',await page.evaluate(()=>__ATLAS_FEMALE__.getViewCoverage().inFrustum>0)&&await page.locator('#femaleViewCue').isHidden());}await snap('female-shared');""")
f.write_text(s)
print('CONTEXT_REVIEW: truthful offscreen guidance; no implicit camera movement')
