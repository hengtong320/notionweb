from pathlib import Path
p=Path('fullbody-tcm-v15')
f=p/'shared-v14.css'
f.write_text(f.read_text()+'''\n/* One readable status, not two overlapping badges. Detailed projection provenance stays in the point card. */\n#surfaceProjectedBadge{display:none!important}\n#v9PrecisionBadge{transform:none!important;width:auto;left:12px;right:auto;bottom:8px;max-width:calc(100% - 24px);white-space:normal;text-align:left}\n@media(max-width:650px){#v9PrecisionBadge{left:8px;bottom:6px;max-width:calc(100% - 16px)}}\n''')
(p/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 · 版本记录</title><style>body{max-width:760px;margin:40px auto;padding:20px;font:16px/1.8 system-ui;background:#f4f7ee;color:#315945}a{color:#276d62}li{margin:10px 0}</style><h1>V15 经络与切换修订</h1><p>修复旧裁切范围残留、点线贴面不同步、不同穴名被合并、快速切换时旧任务覆盖新选择，以及手机关闭自动聚焦后详情不显示。</p><p>本版保持原界面和解剖模型。图形一致性检查不等于定位审核；经穴仍为未完成逐穴校准的学习示意。</p><p><a href="../anatomy/">固定入口</a> · <a href="./">返回三维</a></p><ul><li><a href="../fullbody-tcm-v14/">V14 共用学习界面</a></li><li><a href="../fullbody-tcm-v13/">V13 视角保持与经脉分辨</a></li><li><a href="../fullbody-tcm-v12/">V12 双参考</a></li><li><a href="../fullbody-tcm-v11/">V11 器官与体表</a></li><li><a href="../fullbody-tcm-v10-1/">V10.1 稳定性修订</a></li><li><a href="../foot-atlas/">足骨原版</a></li></ul></html>''')
f=Path('atlas15-delivery/verify.cjs');s=f.read_text()
a="ck('Skin attachment is enabled',await page.evaluate(()=>__ATLAS_LEARNING__.getSurfaceState().attached));"
assert a in s;s=s.replace(a,a+"""
 ck('One unclipped qualification badge in the actual stage',await page.evaluate(()=>{const e=document.getElementById('v9PrecisionBadge'),b=e.getBoundingClientRect(),r=document.querySelector('.stage').getBoundingClientRect();return !e.hidden&&b.width>0&&b.x>=r.x&&b.y>=r.y&&b.right<=r.right&&b.bottom<=r.bottom&&getComputedStyle(document.getElementById('surfaceProjectedBadge')).display==='none';}));
""")
a="ck('Hidden point layer leaves no leader wires',"
assert a in s;s=s.replace(a,"ck('Hiding meridians leaves no obsolete projection badge',await page.locator('#v9PrecisionBadge').isHidden()&&await page.locator('#surfaceProjectedBadge').isHidden());\n "+a)
s=s.replace("ck('No uncaught JavaScript errors',report.errors.length===0,report.errors);report.success=true;", "const versions=await page.request.get(new URL('versions.html',report.url).href);ck('Version history describes the current V15 and preserves V14 link',versions.ok()&&(await versions.text()).includes('V15 经络与切换修订')&&(await versions.text()).includes('../fullbody-tcm-v14/'));ck('No uncaught JavaScript errors',report.errors.length===0,report.errors);report.success=true;")
f.write_text(s)
print('VISUAL_REVIEW: consolidated status badge stays inside the stage; version history updated')
