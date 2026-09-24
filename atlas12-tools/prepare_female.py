"""Prepare independent HRA female systems; preserve relative source anatomy."""
import json,struct,hashlib,re,sys
from pathlib import Path
import numpy as np
from pypinyin import lazy_pinyin,Style
src=Path(sys.argv[1] if len(sys.argv)>1 else 'female-inspection');out=Path('fullbody-tcm-v12/assets/female');out.mkdir(parents=True,exist_ok=True)
b=(src/'female-source.glb').read_bytes();assert hashlib.sha256(b).hexdigest()=='472567a56896b9b7890508da6501fbf858e56aaa30745365f7a71ade782b529c'
jlen=struct.unpack_from('<I',b,12)[0];j=json.loads(b[20:20+jlen]);data=memoryview(b)[28+jlen:]
meta=json.loads((src/'metadata-0.txt').read_text());assert 'by/4.0' in meta['was_derived_from']['license']
DT={5121:np.uint8,5123:np.dtype('<u2'),5125:np.dtype('<u4'),5126:np.dtype('<f4')};DIM={'SCALAR':1,'VEC3':3,'VEC4':4,'VEC2':2}
def acc(i):
 a=j['accessors'][i];v=j['bufferViews'][a['bufferView']];dt=DT[a['componentType']];sz=DIM[a['type']];off=v.get('byteOffset',0)+a.get('byteOffset',0)
 return np.ndarray((a['count'],sz),dtype=dt,buffer=data,offset=off,strides=(v.get('byteStride',np.dtype(dt).itemsize*sz),np.dtype(dt).itemsize)).copy()
def transform(n):
 if 'matrix'in n:return np.array(n['matrix']).reshape(4,4,order='F')
 x,y,z,w=n.get('rotation',[0,0,0,1]);m=np.eye(4);m[:3,:3]=np.array([[1-2*y*y-2*z*z,2*x*y-2*z*w,2*x*z+2*y*w],[2*x*y+2*z*w,1-2*x*x-2*z*z,2*y*z-2*x*w],[2*x*z-2*y*w,2*y*z+2*x*w,1-2*x*x-2*y*y]])@np.diag(n.get('scale',[1,1,1]));m[:3,3]=n.get('translation',[0,0,0]);return m
G={'integumentary':'surface','nervous':'nervous','muscular':'muscular','reproductive':'reproductive','digestive':'digestive','urinary':'urinary','circulatory':'vascular','respiratory':'respiratory','lymphatic':'lymphatic','skeletal':'skeletal'}
labels={'surface':'女性体表','breast':'乳腺结构','nervous':'脑、脊髓与感官','muscular':'肌肉（眼部与膝部）','reproductive':'女性生殖系统','digestive':'消化系统','urinary':'泌尿系统','vascular':'心脏与血管','respiratory':'肺与气道','lymphatic':'淋巴与免疫器官','skeletal':'骨骼与关节（部分）'}
zh={'skin':'全身体表','uterus':'子宫','body of uterus':'子宫体','cervix':'宫颈','cervix of uterus':'子宫颈','vagina':'阴道','ovary':'卵巢','fallopian tube':'输卵管','fundus of uterus':'子宫底','uterine cavity':'子宫腔','endometrium':'子宫内膜','myometrium':'子宫肌层','mammary gland':'乳腺','mammary lobes':'乳腺叶','nipple':'乳头','areola':'乳晕','areolar tubercles':'乳晕腺结节','fat':'脂肪','main lactiferous ducts':'主输乳管','main lactiferous sinuses':'输乳管窦','suspensory ligaments':'悬韧带','lung':'肺','lungs':'肺','heart':'心脏','liver':'肝脏','stomach':'胃','pancreas':'胰腺','spleen':'脾','kidney':'肾','urinary bladder':'膀胱','trachea':'气管','larynx':'喉','brain':'脑','spinal cord':'脊髓','ilium':'髂骨','ischium':'坐骨','pubis':'耻骨','sacrum':'骶骨','coccyx':'尾骨','femur':'股骨','tibia':'胫骨','fibula':'腓骨','patella':'髌骨','sternum':'胸骨','manubrium':'胸骨柄','rectum':'直肠','anus':'肛门','colon':'结肠','ascending colon':'升结肠','descending colon':'降结肠','transverse colon':'横结肠','sigmoid colon':'乙状结肠','duodenum':'十二指肠','jejunum':'空肠','ileum':'回肠','cecum':'盲肠','vermiform appendix':'阑尾','gallbladder':'胆囊','ureter':'输尿管','urethra':'尿道','aorta':'主动脉','aortic arch':'主动脉弓','ascending aorta':'升主动脉','descending aorta':'降主动脉','abdominal aorta':'腹主动脉','thoracic aorta':'胸主动脉','superior vena cava':'上腔静脉','inferior vena cava':'下腔静脉','atrium':'心房','ventricle':'心室','mitral valve':'二尖瓣','tricuspid valve':'三尖瓣','aortic valve':'主动脉瓣','pulmonary valve':'肺动脉瓣','thymus':'胸腺','pupil':'瞳孔','retina':'视网膜','sclera':'巩膜','lens':'晶状体','cornea':'角膜','iris':'虹膜','ampulla of uterine tube':'输卵管壶腹','isthmus of fallopian tube':'输卵管峡部','fibria of uterine tube':'输卵管伞','uterine tube infundibulum':'输卵管漏斗','cervicovaginal junction':'宫颈阴道交界','uterosacral ligament':'宫骶韧带','cardinal ligament of uterus':'子宫主韧带','broad ligament':'子宫阔韧带','mesosalpinx':'输卵管系膜','uterovesical pouch':'膀胱子宫陷凹','abdominal ostium of uterine tube':'输卵管腹腔口','cornua':'子宫角','lower uterine segment':'子宫下段','posterior wall of uterus':'子宫后壁','anterior wall of uterus':'子宫前壁','internal cervical os':'宫颈内口','external cervical os':'宫颈外口','uterocervical junction':'子宫体颈交界','uterine fundus':'子宫底','endometrial cavity':'子宫内膜腔','endocervical canal':'宫颈管','vaginal wall':'阴道壁','mesometrium':'子宫系膜','mesovarium':'卵巢系膜','broad ligament of uterus':'子宫阔韧带','round ligament of uterus':'子宫圆韧带','ovarian ligament':'卵巢固有韧带','suspensory ligament of ovary':'卵巢悬韧带','uterus endometrium':'子宫内膜','uterus myometrium':'子宫肌层','uterus fundus':'子宫底','uterus cervix':'宫颈','uterus body':'子宫体','lung upper lobe':'肺上叶','lung lower lobe':'肺下叶','lung middle lobe':'肺中叶','uterine tube':'输卵管','ilium compact bone':'髂骨皮质','pubis compact bone':'耻骨皮质','ischium compact bone':'坐骨皮质'}
def translate(n):
 s=n['name'].replace('VH_F_','').replace('Allen_','');side='left' if re.search(r'(?:^|_)(?:L|left)(?:_|$)',s) else 'right' if re.search(r'(?:^|_)(?:R|right)(?:_|$)',s) else 'midline'
 s=re.sub(r'(?:^|_)(?:L|R|left|right)(?=_|$)','',s).replace('_',' ').strip();raw=s;s=re.sub(r'\s+',' ',s).lower();v=zh.get(s)
 if not v and re.match(r'(cervical|thoracic|lumbar) vertebra',s):
  m=re.search(r'(\d+)',s);v={'cervical':'颈椎','thoracic':'胸椎','lumbar':'腰椎'}[s.split()[0]]+(m[1] if m else '')
 if v:return ('左' if side=='left' and not v.startswith('左') else '右' if side=='right' and not v.startswith('右') else '')+v,side,raw
 fallback=n.get('extras',{}).get('label','')
 if not fallback or fallback in ['-','NA','N/A']:fallback=raw
 return ('左 · ' if side=='left' else '右 · ' if side=='right' else '')+fallback,side,raw
rows=[];groups={}
def walk(i,world,ancestry):
 n=j['nodes'][i];world=world@transform(n);anc=ancestry+[n.get('name','')]
 if 'mesh'in n:
  sysname=next((a for a in anc if a.endswith('_system')),'');group=next((v for k,v in G.items() if k in sysname),'other')
  if any('placenta'in a or 'umbilical'in a for a in anc):return
  if group=='surface' and n['name']!='VH_F_skin':group='breast'
  if group not in labels:return
  for prim in j['meshes'][n['mesh']]['primitives']:
   pos=acc(prim['attributes']['POSITION']).astype('float64');pos=pos@world[:3,:3].T+world[:3,3];pos=pos*1000+np.array([100,760,0]);pos=pos.astype('<f4')
   norm=acc(prim['attributes']['NORMAL']).astype('float64')@np.linalg.inv(world[:3,:3]);norm/=np.maximum(np.linalg.norm(norm,axis=1,keepdims=True),1e-12);norm=norm.astype('<f4')
   idx=acc(prim['indices']).reshape(-1,3).astype('<u4')
   if np.linalg.det(world[:3,:3])<0:idx=idx[:,[0,2,1]]
   id=f'hraf-{i}';name,side,english=translate(n);detail=bool(re.search(r'spongy|medulla|papilla|pyramid|nephron|couinaud|segment|cortex|lobule|wall|cavity',n['name'],re.I))
   row={'id':id,'sourceNode':i,'sourceName':n['name'],'name':name,'english':english,'side':side,'system':group,'ancestry':anc,'ontology':n.get('extras',{}).get('representation_of'),'bounds':[pos.min(0).tolist(),pos.max(0).tolist()],'triangles':len(idx),'detail':detail,'femaleSource':True,'pinyin':' '.join(lazy_pinyin(name,style=Style.TONE,errors=lambda x:[x])) if re.search(r'[\u4e00-\u9fff]',name) else ''}
   rows.append(row);groups.setdefault(group,[]).append((id,pos,norm,idx,row))
 for c in n.get('children',[]):walk(c,world,anc)
walk(0,np.eye(4),[])
assert len(rows)==880
for group,arr in groups.items():
 gl={'asset':{'version':'2.0','generator':'Atlas female import 12.0','copyright':'Kristen Browne; Heidi Schlehlein, HRA / HuBMAP 2023, CC BY 4.0'},'scene':0,'scenes':[{'nodes':[]}],'nodes':[],'meshes':[],'buffers':[{'byteLength':0}],'bufferViews':[],'accessors':[]};blob=bytearray()
 def add(a,typ,ctype,target):
  while len(blob)%4:blob.append(0)
  raw=a.tobytes();vi=len(gl['bufferViews']);gl['bufferViews'].append({'buffer':0,'byteOffset':len(blob),'byteLength':len(raw),'target':target});blob.extend(raw)
  ai=len(gl['accessors']);ac={'bufferView':vi,'componentType':ctype,'count':len(a),'type':typ}
  if typ=='VEC3':ac.update(min=a.min(0).tolist(),max=a.max(0).tolist())
  gl['accessors'].append(ac);return ai
 for id,pos,norm,idx,row in arr:
  pa=add(pos,'VEC3',5126,34962);na=add(norm,'VEC3',5126,34962);dt='<u2' if len(pos)<65536 else '<u4';ia=add(idx.reshape(-1).astype(dt),'SCALAR',5123 if dt=='<u2' else 5125,34963)
  gl['scenes'][0]['nodes'].append(len(gl['nodes']));gl['nodes'].append({'name':id,'mesh':len(gl['meshes'])});gl['meshes'].append({'name':id,'primitives':[{'attributes':{'POSITION':pa,'NORMAL':na},'indices':ia}]})
 while len(blob)%4:blob.append(0)
 gl['buffers'][0]['byteLength']=len(blob);js=json.dumps(gl,separators=(',',':')).encode();js+=b' '*((-len(js))%4);result=struct.pack('<III',0x46546c67,2,28+len(js)+len(blob))+struct.pack('<II',len(js),0x4e4f534a)+js+struct.pack('<II',len(blob),0x004e4942)+blob
 (out/(group+'.glb')).write_bytes(result);print(group,len(arr),len(result))
(out/'catalog.json').write_text(json.dumps({'groups':labels,'entries':rows,'source':'HRA united-female v1.5','sourceSHA256':hashlib.sha256(b).hexdigest(),'coordinateTransform':'all source node transforms baked, metres to millimetres, translation [100,760,0]; no male anatomy mixed in','scope':'whole-body surface with selected organs; partial skeleton and muscles; not all human structures; no acupoint registration','license':'CC BY 4.0','citation':meta['was_derived_from']['citation'],'url':meta['was_derived_from']['distributions'][0]['downloadUrl']},ensure_ascii=False,separators=(',',':')))
(out/'source-metadata.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2))
