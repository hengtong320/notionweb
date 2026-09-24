"""Restore the delivered V9 source exactly; never overwrite an accepted viewer."""
from pathlib import Path
import base64,hashlib,json,lzma,shutil

def sha(data): return hashlib.sha256(data).hexdigest()
base=Path('fullbody-tcm-v8'); root=Path('fullbody-tcm-v9')
assert sha((base/'index.html').read_bytes())=='0af6cccf622776fa2cf685ff2055ac9d5c86a238f4a4d10c1c579c274b915a31','Unexpected V8 base'
if root.exists(): raise RuntimeError('V9 already exists; refusing to replace it')
parts=sorted(Path('atlas-v9-publish').glob('payload.[0-9][0-9].b64'))
assert len(parts)==4,'Missing source transport part'
raw=lzma.decompress(base64.b64decode(''.join(p.read_text().strip() for p in parts),validate=True))
assert sha(raw)=='3a81132d41511f352d4c5834e2c977148bad20e1cefa95efc8ccfb92bc39e71e','Source transport corrupted'
records=json.loads(raw)
shutil.copytree(base,root)
for name in ['checks','source','qa','qa-v3','qa-v4']:
    shutil.rmtree(root/name,ignore_errors=True)
for name in ['build-info.json','delivery-release.json','delivery-status.json']:
    (root/name).unlink(missing_ok=True)
spec=records['evidence-data-v9.json']['dataSpec']
points={p['code']:p for p in json.loads((root/'acupoints-data.js').read_text().split('export const ACUPOINTS=')[1].split(';',1)[0])}
nav={p['code']:p for p in json.loads((root/'navigation-points-v6.js').read_text().split('export const NAVIGATION_POINTS=')[1].rstrip().removesuffix(';'))}
restored={}
for code,over in spec['overrides'].items():
    a=points[code]; v=dict(spec['commonPoint'])
    v.update({k:a[k] for k in ['code','name','pinyin','meridian','ordinal']})
    v.update(region=nav[code]['regionLabel'],location=nav[code]['locationNote'],traditional='属于'+a['meridianName']+'。')
    v.update(over)
    restored[code]={k:v[k] for k in dict.fromkeys(spec['pointFields']+list(over))}
data={k:(restored if k=='points' else spec['other'][k]) for k in spec['order']}
for name,item in records.items():
    p=root/name
    assert not Path(name).is_absolute() and '..' not in Path(name).parts
    if 'dataSpec' in item: content=json.dumps(data,ensure_ascii=False,indent=2)
    elif 'lineEdits' in item:
        old=p.read_bytes(); assert sha(old)==item['baseSHA256'],'Base mismatch: '+name
        lines=old.decode().splitlines(keepends=True)
        for start,end,replacement in reversed(item['lineEdits']): lines[start:end]=[replacement]
        content=''.join(lines)
    else: content=item['content']
    if item.get('expansion'): content=content.replace('__DEPLOY_EMBED_EVIDENCE_DATA__',json.dumps(data,ensure_ascii=False,separators=(',',':')))
    if name=='coordinate-audit.csv': content=content.replace('\r\n','\n').replace('\n','\r\n')
    assert sha(content.encode())==item['sha256'],'Reconstruction mismatch: '+name
    p.parent.mkdir(parents=True,exist_ok=True);p.write_text(content)
    print('EXACT_V9_SOURCE',name,flush=True)
models={'fullbody.glb':'f675737728bd5c21c553bb82490694f4c52cb744f7f9ebba346c66775aebd1c2','muscular.glb':'e655e5d21e821778c277261026dac00747b929abee5bd61d2b5a156fe5fbcde7','nervous.glb':'647a754f729510b0f9e4297e5c6a2ef69b9e5b30142b1a07928ae929e3283652'}
for name,digest in models.items(): assert sha((root/'assets'/name).read_bytes())==digest,name
(root/'README.md').write_text('''# V9 研究修订 · 在线版

三维入口：https://hengtong320.github.io/notionweb/fullbody-tcm-v9/

经穴与经脉说明：https://hengtong320.github.io/notionweb/fullbody-tcm-v9/evidence.html

本目录发布聊天中交付的V9研究工程；骨骼、肌肉、神经、音频沿用V8原始资源，全部在本站加载，不需要另行安装或部署。旧版不覆盖。骨模型和渲染代码内置，软组织和语音按需加载。

默认“严谨查阅”隐藏未校准点线；在经络设置中点击“切换到三维示意（未校准）”查看管状曲线。点击穴名或经脉可以查看资料与证据。此模式区别不是渲染失败。

这仍然是研究与教学示意版本，没有完成皮肤配准、逐穴专业复核或误差测量；不能用于准确取穴、针刺、诊断或复位，也没有重新审听全部音频。网页发布及浏览器测试不等于临床定位认证。

原始研究说明见RESEARCH-AND-ACCEPTANCE.md；其中的“未发布”“WebGL未验收”描述的是先前本地交付阶段。此次发布后的实际状态只以delivery-release.json与checks中的当前报告为准。

模型许可与署名见MODEL-LICENSES.txt。
''')
info={'version':'fullbody-tcm-v9-research','status':'candidate','sourcePayloadSHA256':sha(raw),'sourceFileSHA256':{n:v['sha256'] for n,v in records.items()},'modelsSHA256':models,'bones':210,'standardNames':361,'defaultMode':'strict','clinicalCalibration':False,'audioChanged':False,'allAudioHumanReviewed':False,'previousViewersUnchanged':True,'evidenceHTMLSHA256':sha((root/'evidence.html').read_bytes())}
(root/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
print('RESTORED',root,flush=True)
