"""Small, guarded maintenance changes on the existing verified V10, not a redesign."""
from pathlib import Path
import hashlib,json,shutil
BASE=Path('fullbody-tcm-v10'); OUT=Path('fullbody-tcm-v10-1')
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(BASE/'app.bundle.js')=='47b387a4cf02cab04e77dd9538c5aa40771fd25c1480ec879f66449738f0073c','V10 changed; reconcile first'
assert not OUT.exists(),'Refusing to replace an existing revision'
shutil.copytree(BASE,OUT)
shutil.rmtree(OUT/'checks',ignore_errors=True);(OUT/'checks').mkdir()
(OUT/'delivery-release.json').unlink(missing_ok=True)
def patch(file,old,new):
 p=OUT/file;s=p.read_text();assert old in s,f'Missing guarded target: {file}: {old[:75]}';p.write_text(s.replace(old,new,1))
patch('evidence-page-v10.js',"mode=hash.get('mode')==='illustrative'?'illustrative':'strict';", "mode=hash.get('mode')==='illustrative'?'illustrative':'strict',layer=['bones','muscles','nerves','compare'].includes(hash.get('layer'))?hash.get('layer'):'bones';")
patch('evidence-page-v10.js','{kind:tab,id,side,mode}', '{kind:tab,id,side,mode,layer}')
patch('evidence-page-v10.js','{kind:tab,id:selected,side,mode}', '{kind:tab,id:selected,side,mode,layer}')
patch('evidence-page-v10.js',"mode=h.get('mode')==='illustrative'?'illustrative':'strict';render();", "mode=h.get('mode')==='illustrative'?'illustrative':'strict';layer=['bones','muscles','nerves','compare'].includes(h.get('layer'))?h.get('layer'):'bones';render();")
patch('evidence-page-v10.js','({tab,selected,side,mode})','({tab,selected,side,mode,layer})')
patch('evidence-page-v10.js',"b.onclick=()=>show(id);", "b.onclick=()=>{show(id);if(innerWidth<=760)document.getElementById('focusHeading')?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};")
patch('stability-v10.js',"if(target.mode)learning.setPrecisionMode", "if(target.kind==='point'&&!learning.getReferences().some(p=>p.code===target.id))throw Error('没有这个穴名，请从目录重新选择');\n   if(target.kind==='bone'&&!ctx.boneInfo(target.id))throw Error('没有这个骨名，请从目录重新选择');\n   if(target.mode)learning.setPrecisionMode")
patch('stability-v10.js',"else if(target.kind==='tissue'){const known=tissues.getCatalog().find(t=>t.id===target.id);if(!known){await tissues.enable('muscular',true);await tissues.enable('nervous',true);}if(serial===restoreSerial)tissues.choose(target.id,true);}", """else if(target.kind==='tissue'){
    if(target.layer&&profiles.has(target.layer))await tissues.setProfile(target.layer);
    if(serial!==restoreSerial)return;
    let known=tissues.getCatalog().find(t=>t.id===target.id);
    if(!known){await tissues.enable('muscular',true);if(serial!==restoreSerial)return;await tissues.enable('nervous',true);}
    if(serial!==restoreSerial)return;
    known=tissues.getCatalog().find(t=>t.id===target.id);
    if(!known)throw Error('未找到该组织；请从肌肉神经目录重新选择');
    await tissues.enable(known.system,true);
    if(serial===restoreSerial)tissues.choose(target.id,true);
   }""")
patch('stability-v10.js',"if(serial===restoreSerial&&target.layer&&profiles.has(target.layer))await tissues.setProfile(target.layer);", "if(serial===restoreSerial&&target.kind!=='tissue'&&target.layer&&profiles.has(target.layer))await tissues.setProfile(target.layer);")
patch('stability-v10.js',"const visible=e=>{if(!e||e.hidden)return false;", "const visible=e=>{if(!e)return false;for(let a=e;a instanceof Element;a=a.parentElement){const s=getComputedStyle(a);if(a.hidden||s.display==='none'||s.visibility==='hidden'||s.opacity==='0')return false;}")
patch('stability-v10.js',"const mode=(current.kind==='point'||current.kind==='meridian')?", "const mode=(current.kind==='point'||current.kind==='meridian'||learning.getState().enabled)?")
patch('stability-v10.js',"lastCapture={filename,object:clone(current),labels:captured,mode:mode+layer,", "lastCapture={filename,object:clone(current),labels:captured,layerProfile:tissues.getState().profile,mode:mode+layer,")
assert "labelMode='smart'" in (OUT/'learning-enhancements.js').read_text()
patch('learning-enhancements.js','aria-pressed="false">就近穴名</button>', 'aria-pressed="false">附近穴名</button>')
p=OUT/'learning-enhancements.js';s=p.read_text().replace("'就近穴名'","'附近穴名'")
s=s.replace("$('labelPageInfo').textContent=`${shown}/${count} 视野内 · ${labelPage+1}/${pages}页`;", "$('labelPageInfo').textContent=labelMode==='complete'?`${shown}/${count} 视野内 · ${labelPage+1}/${pages}页`:`附近${shown}个 · 完整目录${all.length}个`;" )
s=s.replace("$('labelPrevious').disabled=labelPage===0;$('labelNext').disabled=labelPage>=pages-1;", "$('labelPrevious').disabled=labelMode!=='complete'||labelPage===0;$('labelNext').disabled=labelMode!=='complete'||labelPage>=pages-1;")
s=s.replace("getState:()=>({precisionMode,", "getState:()=>({labelMode,precisionMode,")
s=s.replace("labelStats={total:all.length,inView:count,shown,page:labelPage+1,pages,capacity}","labelStats={total:all.length,inView:count,shown,page:labelMode==='complete'?labelPage+1:1,pages:labelMode==='complete'?pages:1,capacity}")
p.write_text(s)
# Old tissue-only hiding rule had greater specificity and hid the new global study controls.
patch('styles.css','.tissue-detail-active .detail-scroll>section:not(#tissueDetail)', '.tissue-detail-active .detail-scroll>section:not(#tissueDetail):not(#currentStudy)')
for f in ['app.js','catalog-v10.js','stability-v10.js','learning-enhancements.js','index.html','index.template.html','versions.html']:
 p=OUT/f;s=p.read_text().replace('10.0.0','10.1.0').replace('V10 ·','V10.1 ·').replace('V10 稳定修订','V10.1 细节修订').replace('-V10-','-V10.1-');p.write_text(s)
p=OUT/'stability-v10.css';p.write_text(p.read_text()+'''\n/* V10.1: quiet defaults; no new navigation panel or layout. */
#labelPageInfo{font-size:11px;color:#385747}
#labelModeToggle{min-width:72px}
#currentStudyMode{line-height:1.7}
@media(max-width:600px){.acu-name{min-height:28px}#acupointLabelNav{max-width:calc(100% - 18px);flex-wrap:wrap}.v10-current-links a,.v10-current-links button{min-height:40px}#focusHeading{scroll-margin-top:16px}}
''')
info=json.loads((OUT/'build-info.json').read_text());info.update(version='10.1.0',base='V10',baseCommit='37d78170c0ed6a704514340e6c8fb0d59960e80b',status='candidate',minorRevision=True,clinicalCalibration=False,coordinatesUnchanged=True,allAudioHumanReviewed=False)
(OUT/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
(OUT/'README.md').write_text('''# V10.1 细节修订

固定入口：https://hengtong320.github.io/notionweb/anatomy/

保留 V10/V9 的界面风格、骨骼模型和交互，不是大改版。

沿用 V10 已有：术语统一、当前对象聚焦、回到整体清除局部范围、带标注截图、资料与三维深链接、同站资源复用、静止按需绘制、字体和触控区修正、六项定位试点记录。

本次补充：默认附近穴名减轻遮挡（完整目录和完整标注仍可用）；三维→说明→三维保留图层与左右侧；组织深链接先切图层再选择，防止选中后又被清空；选择肌肉或神经时全局学习操作仍可见，不再丢失返回整体入口；截图不合成被父容器隐藏的标签，经络可见时始终保留未校准说明；手机阅读条目主动滚到详情。无效条目给出提示，不生成坐标。

资源继续复用同站点 fullbody-tcm-v9/assets 与 voice。入口变小不代表整套模型无需下载。

严格定位、完整皮肤配准、逐条音频审听、全部361条临床证据扩写、真实设备性能基线与分部位LOD尚未完成。六项定位试点是待核查记录，不是六项已通过；旧坐标和所有模型均未改。此网页只用于学习，非准确取穴、诊断或复位依据。

本次软件回归范围见 delivery-release.json 和 checks/。历史版本保留。
''')
p=OUT/'IMPLEMENTATION.md';p.write_text(p.read_text().replace('# V10 实现范围','# V10.1 实现范围')+'\n本次维护修订另外修复组织选择隐藏全局操作、资料往返丢失图层、组织链接恢复次序和隐藏标签截图问题。未改解剖数据或新增坐标。\n')
print('PATCH_READY',OUT)
