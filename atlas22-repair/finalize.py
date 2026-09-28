from pathlib import Path
p=Path('fullbody-tcm-v22')
f=p/'shared-v14.js';s=f.read_text()
a='let actionTail=Promise.resolve(),queuedActions=0,layoutRevision=0;'
assert a in s;s=s.replace(a,'let actionTail=Promise.resolve(),queuedActions=0,layoutRevision=0,coalescingEpoch=0;',1)
a='const n=(actionSequence.get(key)||0)+1;actionSequence.set(key,n);'
assert a in s;s=s.replace(a,"const scopedKey=key+':'+(key==='save-combo'?++coalescingEpoch:coalescingEpoch);const n=(actionSequence.get(scopedKey)||0)+1;actionSequence.set(scopedKey,n);",1)
a='if(n!==actionSequence.get(key))return false;'
assert a in s;s=s.replace(a,'if(n!==actionSequence.get(scopedKey))return false;',1);f.write_text(s)
# Add another assertion rather than relaxing the original before-save check.
f=Path('atlas22-repair/verify.cjs');s=f.read_text();needle='// Saving and restoring a point must restore both the learning adapter and the shared card owner.'
extra="""await choose('bones');await p.evaluate(async()=>{const a=__ATLAS_SHARED__.runMutation('test-barrier-delay',()=>new Promise(r=>setTimeout(r,250)));const b=__ATLAS_SHARED__.choose('skin',false);document.querySelector('#saveLayerCombo').click();const c=__ATLAS_SHARED__.choose('bones',false);await Promise.all([a,b,c]);});await settle();saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('atlas21:layers:male')||'null'));check('A later view request cannot cancel the view captured by Save',saved?.scene==='skin'&&(await read()).s.scene==='bones',{savedScene:saved?.scene});\n"""
assert needle in s;s=s.replace(needle,extra+needle,1)
needle="check('No uncaught browser errors',report.errors.length===0,report.errors);"
extra="""await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>document.body.classList.remove('nav-open','detail-open'));for(const who of ['male','female']){await sex(who);const [download]=await Promise.all([p.waitForEvent('download'),p.evaluate(who=>who==='female'?__ATLAS_FEMALE__.capture():__ATLAS_STUDY__.capture(),who)]);check(who+': exported image filename uses current release',download.suggestedFilename().includes('-V22'),{filename:download.suggestedFilename()});}\n"""
assert needle in s;s=s.replace(needle,extra+needle,1);f.write_text(s)
(p/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 · V22</title><style>body{max-width:780px;margin:40px auto;padding:20px;font:16px/1.8 system-ui;background:#f4f7ee;color:#315945}a{color:#276d62}</style><h1>V22 · 图层与切换稳定性</h1><p>保存组合按点击顺序完成，修复女性独有自定义图层切换为空、内部细节不同步和手机图层面板不易收起的问题。原有六个快速视图与自定义组合保留。</p><p><a href="./">进入当前版本</a> · <a href="../anatomy/">固定入口</a> · <a href="release.json">发布记录</a></p><p>不修改源模型、部件计数或经穴定位。混合教学来源与未临床校准的边界保持不变。</p><h2>历史版本</h2><p><a href="../fullbody-tcm-v21/">V21 图层直达与教学参考</a></p><p><a href="../fullbody-tcm-v20/">V20 男女场景同步</a></p></html>''',encoding='utf-8')
print('Save barrier and image-export/version regression installed')
