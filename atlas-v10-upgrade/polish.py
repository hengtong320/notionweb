from pathlib import Path
import re,json,hashlib,shutil
P=Path('fullbody-tcm-v10')
def edit(n,f):
 p=P/n;p.write_text(f(p.read_text()))
# A guessed homophone would introduce a new mispronunciation. Keep the actual phrase.
edit('catalog-v10.js',lambda s:s.replace("spokenText:'全竹'","spokenText:'攒竹穴'"))
edit('stability-v10.css',lambda s:s+'''\nbody .detail-scroll>#currentStudy{display:block!important}body[data-current-kind="point"] .detail-scroll>section:not(#currentStudy):not(#tcmPointCard),body[data-current-kind="meridian"] .detail-scroll>section:not(#currentStudy):not(#v9MeridianCard){display:none!important}body:not([data-current-kind="bone"]) #studyTip,body:not([data-current-kind="bone"]) .detail-actions{display:none!important}.current-study h3{font-size:18px!important}.current-study p{color:#405c47;font-size:12px!important}.tcm-point-card p{color:#46604e;font-size:14px!important}\n''')
for n in ['index.template.html','index.html']:
 edit(n,lambda s:re.sub(r'<title>.*?</title>','<title>全身骨骼研习室 V10 · 稳定修订</title>',s).replace('本地运行 · 无数据上传','同站点资源 · 语音另行区分').replace('全身骨骼 · 第五期','全身解剖 · 学习观察').replace('V10 · 曲线与证据（研究修订）','V10 · 稳定修订'))
# Avoid keeping another physical copy of the anatomy and hundreds of audio files.
for n in ['voice','assets']:
 d=P/n
 if d.exists():shutil.rmtree(d)
# Non-destructive selective retries are already provided by layer enable; make them explicit.
edit('tissues-v4.js',lambda s:s.replace('加载失败，可重试','加载失败，请重新勾选重试'))
edit('app.js',lambda s:s.replace("e.target.matches('input,textarea,[contenteditable]')","e.target.matches('input,textarea,select,[contenteditable]')"))
completed=['shared-terminology','global-active-target','point-and-region-focus-reset','annotated-screenshot-export','evidence-viewer-deep-links','shared-same-origin-models','on-demand-rendering','explicit-layer-visibility','responsive-control-targets','calibration-pilot-records']
openitems=['full-body-skin-registration','independent-clinical-coordinate-audit','full-audio-human-listening-review','all-361-point-evidence-expansion','real-device-performance-baseline','region-geometry-LOD','shared-repository-branch-protection']
(P/'implementation-status.json').write_text(json.dumps({'implemented':completed,'requiresFurtherWork':openitems,'clinicalApproved':False,'originalModelDataUnchanged':True},ensure_ascii=False,indent=2))
(P/'IMPLEMENTATION.md').write_text('''# V10 实现范围\n\n保留V9三列布局、颜色、骨骼与拆解手感。新增的学习对象栏位于原详情区域，不替换主体界面。\n\n本轮实现：统一术语数据；当前对象、聚焦、返回整体与上次对象；可见穴名/引线和模式状态截图；资料页与三维页同目标往返与链接分享；同站点资源独立加载；静止阅读按需绘制；神经突出与透视说明；文字与触控区调整；六项定位审核样例及完整审核清单入口。\n\n未宣称完成：全身皮肤配准、独立临床定位审核、音频逐条人工审听、361条专项证据扩写、真实设备性能基线、按解剖部位拆分模型LOD。没有改动共享仓库的分支保护策略。\n\n在线入口体积下降不等于实测网速等比例提高。模型首次仍需下载，来自同站点保留的V9资源；离线导出为另外一个文件。不得删除V9资源目录。\n\n软件测试验证数据一致性和完整任务，不是临床认证。\n''')
