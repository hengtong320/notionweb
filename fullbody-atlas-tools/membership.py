"""Compile all region membership before rendering; no runtime classification needed."""
import json,subprocess
from pathlib import Path
from catalog import ADDED
REGIONS=['body','head','auditory','cervical','thoracic','spine','thorax','shoulder','upper','elbow','wrist','hand','foot','ankle','leg','knee','whole','hip','pelvis','pelvic-limb','lumbar','lumbosacral','all']
FIXED={'pelvis','lumbar','lumbosacral','cervical','thoracic','spine'}
LOWER={'thigh','leg','tarsal','metatarsal','phalanges','sesamoid'};HAND={'carpal','metacarpal','hand-phalanges'}
def create(p):
 script="import {BONES} from "+json.dumps((p/'baseline-data.js').as_uri())+";console.log(JSON.stringify(BONES));"
 old=json.loads(subprocess.check_output(['node','--input-type=module','-e',script],text=True));bones=old+ADDED
 assert len(bones)==210
 def member(b,r):
  g=b['group'];id=b['id'];base=b['baseId']
  table={'body':True,'head':g in ['cranial','facial','head-other'],'auditory':base in ['malleus','incus','stapes'],'cervical':g=='cervical','thoracic':g=='thoracic','lumbar':g=='lumbar','spine':g in ['cervical','thoracic','lumbar'] or id in ['sacrum','coccyx'],'thorax':g in ['thorax','thoracic'],'shoulder':g=='shoulder' or base=='humerus','upper':g in HAND|{'shoulder','arm'},'elbow':g=='arm','wrist':g=='carpal' or base in ['radius','ulna'],'hand':g in HAND,'lumbosacral':g in ['lumbar','pelvis'],'pelvis':g=='pelvis','all':g in LOWER|{'pelvis','lumbar'},'pelvic-limb':g in LOWER|{'pelvis'},'hip':base=='femur' or id in ['hip-right','hip-left'],'whole':g in LOWER,'knee':base in ['femur','patella','tibia','fibula'],'leg':g in LOWER-{'thigh'},'ankle':g in LOWER-{'thigh'},'foot':g in ['tarsal','metatarsal','phalanges','sesamoid']}
  return table[r]
 result={r:{s:[b['id'] for b in bones if member(b,r) and (r in FIXED or s=='both' or b['side'] in [s,'midline'] or (r in ['all','pelvic-limb'] and b['group']=='pelvis'))] for s in ['both','right','left']} for r in REGIONS}
 expected={'body':210,'head':29,'auditory':6,'cervical':7,'thoracic':12,'spine':26,'thorax':37,'shoulder':6,'upper':64,'elbow':6,'wrist':20,'hand':54,'foot':56,'ankle':60,'leg':60,'knee':8,'whole':64,'hip':4,'pelvis':4,'pelvic-limb':68,'lumbar':5,'lumbosacral':9,'all':73}
 for r,n in expected.items():assert len(result[r]['both'])==n,(r,len(result[r]['both']))
 assert len(result['hand']['left'])==27 and len(result['upper']['right'])==32
 (p/'region-membership.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));return result
