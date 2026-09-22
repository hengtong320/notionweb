// Same-source contralateral anatomy. Right IDs remain stable for prior links.
const originalLimb = BONES.filter(b => b.group !== 'pelvis');
const limbIds = new Set(originalLimb.map(b=>b.id));
for(const b of originalLimb){
 const left={...b,id:b.id+'-left',name:'左'+b.name,en:'Left '+b.en,side:'left',baseId:b.id,
  description:b.description.replaceAll('右','左'),look:b.look.replaceAll('右髋部','髋部'),tip:b.tip.replaceAll('右','左'),
  neighbors:b.neighbors.map(id=>limbIds.has(id)?id+'-left':id==='hip-right'?'hip-left':id)};
 b.name='右'+b.name;b.en='Right '+b.en;b.side='right';b.baseId=b.id;
 b.look=b.look.replaceAll('右髋部','髋部');
 BONES.push(left);
}
for(const b of BONES.filter(b=>b.group==='pelvis')){b.side=b.id==='hip-right'?'right':b.id==='hip-left'?'left':'midline';b.baseId=b.id;}
const leftHip=BONES.find(b=>b.id==='hip-left');
leftHip.neighbors=['femur-left','sacrum','hip-right'];
leftHip.description='骨盆左侧的髋骨。外侧髋臼与左股骨头构成左髋关节；本版已补齐左侧大腿、小腿和足部。前方经耻骨联合与右髋骨连接，后方与骶骨形成骶髂关节。成人髋骨整体显示。';
leftHip.tip='左侧指人体自身的左侧；正面观察时通常在屏幕右边。左侧模型使用源文件自带的网格与反射变换。';
BONES.find(b=>b.id==='hip-right').look=BONES.find(b=>b.id==='hip-right').look.replaceAll('右髋部','髋部');
const sacrum=BONES.find(b=>b.id==='sacrum');sacrum.neighbors=['L5',...sacrum.neighbors];
sacrum.description='位于两块髋骨之间、骨盆后方，由骶椎融合形成。两侧与髋骨形成骶髂关节；上方承接第五腰椎 L5，下端连接尾骨。本版已加入 L1—L5，椎间盘和韧带未显示。';
GROUPS.unshift({id:'lumbar',name:'腰椎',pinyin:'yāo zhuī',en:'Lumbar vertebrae',count:5,color:'#8b9fa7'});
for(let i=1;i<=5;i++){
 BONES.push({id:'L'+i,baseId:'L'+i,side:'midline',name:'第'+['一','二','三','四','五'][i-1]+'腰椎',en:'Lumbar vertebra L'+i,group:'lumbar',region:'腰部 · L'+i,feature:'椎体、椎弓、棘突与关节突',
 description:'腰椎由上向下编号 L1—L5，这是第'+['一','二','三','四','五'][i-1]+'腰椎（L'+i+'）。'+(i===1?'上方接第十二胸椎，本期胸椎尚未加入。':i===5?'下方与骶骨形成腰骶连接，是腰椎与骨盆之间的衔接处。':'位于 L'+(i-1)+' 与 L'+(i+1)+' 之间。')+'前方较大的椎体与后方椎弓围出椎孔。相邻椎体间的椎间盘未显示，画面间隙不代表体内空无一物。',
 look:'先从侧面看这节椎骨在整段腰椎中的排列，再单独查看，比较前方椎体、后方棘突和两侧横突。转到上方观察椎孔，注意相邻椎骨关节突的相对朝向。'+(i===5?'回到“腰骶与骨盆”，比较 L5 与骶骨上端的方向。':''),
 neighbors:[...(i>1?['L'+(i-1)]:[]),...(i<5?['L'+(i+1)]:['sacrum'])],
 tip:'L'+i+' 是编号，不是额外骨块。此页只展示骨表面；没有椎间盘、神经、脊髓或疾病、复位模拟。'});
}
for(const g of GROUPS)g.count=BONES.filter(b=>b.group===g.id).length;
if(BONES.length!==73||new Set(BONES.map(b=>b.id)).size!==73)throw Error('Bone metadata incomplete');
const allIds=new Set(BONES.map(b=>b.id));for(const b of BONES)for(const n of b.neighbors)if(!allIds.has(n))throw Error('Unknown neighbor '+n);
