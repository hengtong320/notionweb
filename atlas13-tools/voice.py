from pathlib import Path
import asyncio,json,hashlib
import edge_tts
out=Path('fullbody-tcm-v13/voice-corrected');out.mkdir(parents=True,exist_ok=True)
rows=[('changqiang','长强','cháng qiáng','常强'),('dazhui','大椎','dà zhuī','大锥'),('yinjiao','龈交','yín jiāo','银交'),('ximen','郄门','xì mén','隙门'),('yinxi','阴郄','yīn xì','阴隙'),('danzhong','膻中','dàn zhōng','淡中')]
async def run():
 result=[]
 for file,name,py,text in rows:
  error=None
  for n in range(2):
   try:
    await asyncio.wait_for(edge_tts.Communicate(text+'。','zh-CN-XiaoxiaoNeural',rate='-8%').save(str(out/(file+'.mp3'))),timeout=24);error=None;break
   except Exception as e:error=str(e);print('VOICE_RETRY',name,error,flush=True)
  if error:raise RuntimeError('Voice generation failed: '+name+': '+error)
  b=(out/(file+'.mp3')).read_bytes();assert len(b)>2000
  result.append(dict(name=name,pinyin=py,ttsInput=text,file=file+'.mp3',bytes=len(b),sha256=hashlib.sha256(b).hexdigest()))
 (out/'manifest.json').write_text(json.dumps({'engine':'zh-CN-XiaoxiaoNeural / edge-tts 7.2.8','synthetic':True,'method':'homophone disambiguation for six names; displayed spelling unchanged','humanFullAudioReview':False,'entries':result},ensure_ascii=False,indent=2))
asyncio.run(run())
