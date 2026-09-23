import {BONES as OLD,GROUPS as OG,SOURCES as OS} from './baseline-data.js';
import ADDED from './additions.json';import AG from './additional-groups.json';
const order=["cranial", "facial", "head-other", "cervical", "thoracic", "lumbar", "thorax", "shoulder", "arm", "carpal", "metacarpal", "hand-phalanges", "pelvis", "thigh", "leg", "tarsal", "metatarsal", "phalanges", "sesamoid"];
export const BONES=[...OLD.map(b=>({...b,neighbors:[...b.neighbors]})),...ADDED];
const by=Object.fromEntries(BONES.map(b=>[b.id,b]));
for(const b of BONES)b.studyRegion={cranial:'head',facial:'head','head-other':b.id==='hyoid'?'head':'auditory',cervical:'cervical',thoracic:'thoracic',lumbar:'lumbar',thorax:'thorax',shoulder:'shoulder',arm:'upper',carpal:'hand',metacarpal:'hand','hand-phalanges':'hand',pelvis:'pelvis',thigh:'knee',leg:'leg'}[b.group]||'foot';
by.L1.neighbors=[...new Set(['T12',...by.L1.neighbors])];
for(const b of BONES){b.neighbors=[...new Set(b.neighbors)].filter(n=>n!==b.id);for(const id of b.neighbors)if(!by[id])throw Error('Unknown neighbor '+id+' of '+b.id);}
export const GROUPS=[...AG,...OG].sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
BONES.sort((a,b)=>order.indexOf(a.group)-order.indexOf(b.group));
export const BY_ID=Object.fromEntries(BONES.map((b,i)=>[b.id,{...b,index:i+1}]));
export const SOURCES=[...OS,{title:'OpenStax · 成人骨骼清单核对',url:'https://openstax.org/books/anatomy-and-physiology-2e/pages/7-1-divisions-of-the-skeletal-system',note:'骨名、分类与计数核对；中文学习说明为本项目另行撰写。'},{title:'OpenStax · 颅骨与上肢',url:'https://openstax.org/books/anatomy-and-physiology-2e/pages/7-2-the-skull',note:'用于核对颅骨构成；不是模型精度认证。'}];
SOURCES.push({title:'WHO · 标准针灸穴位定位',url:'https://iris.who.int/handle/10665/353407',note:'361个经穴的标准定位方法；本页仅使用标准名称体系并制作3D学习示意。'},{title:'GB/T 12346-2021 · 经穴名称与定位',url:'https://std.samr.gov.cn/gb/search/gbDetailedCNF?id=D1E86BE73ADD430EE05397BE0A0A206B',note:'现行中国国家推荐标准，用于核对经穴名称与定位框架。'},{title:'TARA Acupoints Ontology',url:'https://github.com/SciCrunch/TARA-Ontology-Repository',note:'用于机器可读的经穴代码、中文名、拼音与经脉归属核对；3D坐标为本项目教学示意。'});
if(BONES.length!==210||new Set(BONES.map(b=>b.id)).size!==210)throw Error('Bone manifest incomplete');
for(const g of GROUPS)if(BONES.filter(b=>b.group===g.id).length!==g.count)throw Error('Group count mismatch '+g.id);
