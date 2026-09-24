/* Broad study regions, NOT extra acupoint XYZ registrations. No clinical point is fabricated. */
export function headStudyReferences(references, navigation) {
 const mid=99.55318155698478;
 const np=Object.fromEntries(navigation.map(p=>[p.code,p]));
 const an=np.TE17.position.map((v,i)=>(v+np.GB20.position[i])/2);
 const areas={
  'EX-YINTANG':{center:[mid,1560,68],view:[0,.04,1],radius:48,ring:13,label:'眉间与鼻根',landmarks:['frontal','nasal-right','nasal-left'],note:'印堂的文字定位为两眉之间。本页聚焦眉间及鼻根的观察范围；光环是部位提示，不是已配准的取穴点。',reference:'https://jxjyxb.bucm.edu.cn/BZYAttachs/courseware/zhenjiuxue/a2/a2_26.htm'},
  'EX-ANMIAN':{center:an,view:[-1,.05,-.55],radius:65,ring:22,label:'耳后与枕颈',landmarks:['temporal-right','occipital','C1'],note:'安眠按常用描述位于耳后枕颈区域、翳风与风池之间。这里利用两者既有部位参照的中间范围导航，不能据此确定真实取穴位置。'},
  'EX-TAIYANG':{center:[28,1550,27],view:[-1,.03,.4],radius:60,ring:22,label:'颞部',landmarks:['temporal-right','frontal']},
  'EX-YUYAO':{center:[70,1564,65],view:[-.22,.05,1],radius:55,ring:18,label:'眉部',landmarks:['frontal']},
  'EX-SISHENCONG':{center:np.GV20.position,view:[0,1,.06],radius:75,ring:34,label:'头顶部',landmarks:['parietal-right','parietal-left'],note:'四神聪是头顶的一组穴名。光环仅指示头顶部观察范围，不代表四个穴位的精确布点。'},
  'EX-ERJIAN':{center:[15,1570,-22],view:[-1,.03,.2],radius:70,ring:28,label:'耳廓附近',landmarks:['temporal-right'],note:'耳尖依赖耳廓标志。本模型缺少完整耳廓，只导航到颞侧耳区；没有在颞骨上假设一个耳尖穴。'},
  'EX-QIUHOU':{center:[59,1525,61],view:[-.35,-.05,1],radius:60,ring:23,label:'眼眶下外侧',landmarks:['zygomatic-right','maxilla-right'],note:'仅导航到眼眶下外侧观察范围，不能把眼球、眼睑缺失的骨模型用作取穴。'},
  'EX-SHANGLIANQUAN':{center:[mid,1457,39],view:[0,-.28,1],radius:65,ring:25,label:'颏下与舌骨附近',landmarks:['mandible','hyoid']},
  'EX-JIACHENGJIANG':{center:[73,1468,62],view:[-.25,0,1],radius:60,ring:22,label:'颏唇旁',landmarks:['mandible']},
  'EX-JINJING':{center:[89,1482,37],view:[0,.08,1],radius:80,ring:30,label:'口腔与舌下区域',landmarks:['mandible','hyoid'],note:'金津为舌下相关条目。本模型未包含可核对的舌下黏膜及静脉，只打开口腔—下颌的观察范围，不绘制精确穴点。'},
  'EX-YUYE':{center:[110,1482,37],view:[0,.08,1],radius:80,ring:30,label:'口腔与舌下区域',landmarks:['mandible','hyoid'],note:'玉液为舌下相关条目。本模型缺少相应软组织，光环仅用于区域导航，不代表取穴位置。'},
  'EX-BITONG':{center:[84,1531,73],view:[-.15,.03,1],radius:52,ring:16,label:'鼻旁',landmarks:['nasal-right','maxilla-right']}
 };
 return references.map(p=>{
  if(p.meridian!=='EX'||!areas[p.code])return p;
  const a=areas[p.code];
  return {...p,position:null,parts:undefined,mapped:false,areaNavigation:true,
   navigationArea:{...a,center:[...a.center],quality:'broad-study-area-not-acupoint',clinicalCalibration:false},
   locationNote:a.note||`${a.label}的区域导航。本模型缺少完整皮肤及体表标志；光环只提示观察范围，不是准确穴位坐标。`,
   landmarks:a.landmarks,reference:a.reference||p.reference,sourceScheme:'文字资料与项目区域导航；光环尺寸为界面提示，不是取穴误差或人体测量值。'};
 });
}
