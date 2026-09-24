"""Finalize the existing V12 candidate; keep all source meshes unchanged."""
from pathlib import Path
import json
p=Path('fullbody-tcm-v12')
def edit(name,old,new):
    f=p/name;s=f.read_text();assert old in s,(name,old[:100]);f.write_text(s.replace(old,new))
# A hash-only navigation is a same-document navigation, not a page reload.
# Restore female links on both first load and subsequent hash changes.
f=p/'female-v12.js';s=f.read_text()
start=s.index(' const h=new URLSearchParams((ctx.initialHash||location.hash).slice(1));')
end=s.index('\n return api;',start)
s=s[:start]+''' let restoringFemaleHash=false,pendingFemaleHash=null;
 async function restoreFemaleLink(raw){
  pendingFemaleHash=raw;if(restoringFemaleHash)return;restoringFemaleHash=true;
  try{while(pendingFemaleHash!==null){
   const text=pendingFemaleHash;pendingFemaleHash=null;
   const h=new URLSearchParams(text.replace(/^#/,''));
   if(h.get('sex')!=='female')continue;
   await setSex('female');
   await setPreset(h.get('preset')||'surface');
   if(h.get('id'))await select(h.get('id'),true);
   mode=['solid','context','focus'].includes(h.get('mode'))?h.get('mode'):'solid';
   side=['left','right','both'].includes(h.get('side'))?h.get('side'):'both';
   $('femaleMode').value=mode;$('femaleSide').value=side;update();
  }}catch(e){toast('女性链接恢复失败：'+e.message);}
  finally{restoringFemaleHash=false;urlState();invalidate();}
 }
 window.addEventListener('hashchange',()=>{const raw=location.hash;if(new URLSearchParams(raw.slice(1)).get('sex')==='female')restoreFemaleLink(raw);});
 const initial=ctx.initialHash||location.hash;
 if(new URLSearchParams(initial.slice(1)).get('sex')==='female')queueMicrotask(()=>restoreFemaleLink(initial));
''' +s[end:]
s=s.replace('function urlState(){if(!active)return;','function urlState(){if(!active||restoringFemaleHash)return;')
# Mark the actual delivery revision while retaining the source module structure.
f.write_text(s)
# Unify keyboard view changes with the currently active reference.
old="if(['f','h','g','t','l'].includes(e.key.toLowerCase()))"
new="const keyViews={'1':'overview','2':'dorsal','3':'plantar','4':'medial','5':'lateral','6':'front','7':'back'};if(keyViews[e.key]){e.preventDefault();e.stopImmediatePropagation();view(keyViews[e.key]);return;}if(['f','h','g','t','l'].includes(e.key.toLowerCase()))"
edit('female-v12.js',old,new)
# Preserve the requested layer-combination convenience in the consolidated viewer.
f=p/'refinement-v12.js';s=f.read_text();anchor=' const focus=document.createElement(\'button\');';assert anchor in s
add=''' const savedRow=document.createElement('div');savedRow.className='v4-button-row';savedRow.innerHTML='<button id="saveLayerCombo">保存我的组合</button><button id="restoreLayerCombo">恢复我的组合</button>';custom.after(savedRow);
 let sessionCombo=null;
 $('saveLayerCombo').onclick=()=>{const v=tissues.getState();sessionCombo={systems:v.systems,bonesOn:$('bonesOn').checked,boneOpacity:v.boneOpacity,nerveXray:v.nerveXray};try{localStorage.setItem('atlas12:layers',JSON.stringify(sessionCombo));toast('已保存当前图层组合');}catch{toast('已保存到本次会话');}};
 $('restoreLayerCombo').onclick=async()=>{let v=sessionCombo;try{v=JSON.parse(localStorage.getItem('atlas12:layers')||'null')||v;}catch{}if(!v){toast('请先保存一个图层组合');return;}const b=$('restoreLayerCombo');b.disabled=true;try{for(const[k,x]of Object.entries(v.systems)){if(!Object.hasOwn(tissues.getState().systems,k))continue;await tissues.enable(k,!!x.on);tissues.setOpacity(k,Math.max(.1,Math.min(1,Number(x.opacity)||1)));}$('bonesOn').checked=!!v.bonesOn;$('bonesOn').dispatchEvent(new Event('change',{bubbles:true}));tissues.setBoneOpacity(v.boneOpacity||1);$('nerveXray').checked=!!v.nerveXray;$('nerveXray').dispatchEvent(new Event('change',{bubbles:true}));update();invalidate();toast('已恢复图层组合，观察位置不变');}catch(e){toast('组合恢复失败：'+e.message);}finally{b.disabled=false;}};
'''
s=s.replace(anchor,add+anchor);f.write_text(s)
# Keep known corrected medical readings in the added female catalog.
f=p/'assets/female/catalog.json';j=json.loads(f.read_text())
corrections={'子宫体':'zǐ gōng tǐ','子宫颈':'zǐ gōng jǐng','子宫底':'zǐ gōng dǐ','子宫':'zǐ gōng','左卵巢':'zuǒ luǎn cháo','右卵巢':'yòu luǎn cháo'}
for r in j['entries']:
    if r['name'] in corrections:r['pinyin']=corrections[r['name']]
f.write_text(json.dumps(j,ensure_ascii=False,separators=(',',':')))
# Extend the existing real-browser journeys instead of dropping their assertions.
f=Path('/tmp/atlas12-candidate/atlas12-tools/verify.cjs');s=f.read_text()
s=s.replace("version:'12.0.0'","version:'12.0.1'")
a="ck('No uncaught page errors',report.errors.length===0,report.errors);";assert a in s
extra='''
await page.goto(url.split('#')[0]+'#sex=female&preset=pelvis&id=hraf-473&mode=focus&side=left',{waitUntil:'load',timeout:90000});await page.reload({waitUntil:'load',timeout:90000});await page.waitForFunction(()=>{const s=window.__ATLAS_FEMALE__?.getState();return s?.active&&s.selected==='hraf-473'&&s.side==='left'&&s.mode==='focus';},undefined,{timeout:120000});await settle();ck('Full page reload restores the native female deep link',true);
await page.locator('[data-body-sex="male"]').click();await page.waitForFunction(()=>!window.__ATLAS_FEMALE__.active);await settle();await page.locator('#layersTab').click();
await page.locator('#tissuePanel [data-profile="bones"]').click();await settle();await page.locator('#saveLayerCombo').click();await page.locator('#customLayers summary').click();await page.locator('#bonesOn').uncheck();await page.locator('#restoreLayerCombo').click();await page.waitForFunction(()=>window.__FOOT_ATLAS__.getState().bonesOn);ck('Saved layer combination restores an actual visibility change',await page.locator('#bonesOn').isChecked());await page.locator('#customLayers summary').click();await page.screenshot({path:out+'/'+kind+'-final-layers.png'});
'''
s=s.replace(a,extra+a);f.write_text(s)
# The prepared package must not carry an unrelated historical delivery record.
for n in ['delivery-release.json','implementation-status.json']:
    (p/n).unlink(missing_ok=True)
f=p/'README.md';f.write_text(f.read_text()+'\n发布修订 12.0.1：修复同页女性链接恢复，增加完整刷新回归检查、图层组合保存恢复；所有新旧源模型保持不变。尚无全身女性肌肉/骨骼/经穴校准，界面保留简短覆盖说明。\n')
f=p/'IMPLEMENTATION.md';f.write_text('# V12.0.1 发布范围\n\n保留既有男性骨骼、组织、器官与经穴导航功能；精简常驻说明，折叠高级控制，支持专注看图与图层组合保存。独立女性参考源包含体表及多系统结构，但全身骨骼、肌肉和周围神经覆盖不完整，不混入男性网格。\n\n修复女性同页链接和刷新恢复，保留实际点击、隔离、隐藏、模式切换、截图、手机抽屉和男女切换回归测试。定位未完成临床校准，所有音频尚未逐条人工审听。正式发布状态与本轮结果以 delivery-release.json 为准。\n')
print('FINAL_SOURCE_READY')
