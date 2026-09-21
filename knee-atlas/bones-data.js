// Original Chinese study notes. Geometry names are mapped explicitly, never inferred by position.
export const GROUPS = [
 {id:'leg',name:'小腿骨',pinyin:'xiǎo tuǐ',en:'Leg',count:2,color:'#a5ad85'},
 {id:'tarsal',name:'跗骨',pinyin:'fū gǔ',en:'Tarsals',count:7,color:'#c49b65'},
 {id:'metatarsal',name:'跖骨',pinyin:'zhí gǔ',en:'Metatarsals',count:5,color:'#7fa4a4'},
 {id:'phalanges',name:'趾骨',pinyin:'zhǐ gǔ',en:'Phalanges',count:14,color:'#a39aba'},
 {id:'sesamoid',name:'籽骨',pinyin:'zǐ gǔ',en:'Sesamoids',count:2,color:'#cfaa92'}
];
export const BONES = [
 {id:'talus',name:'距骨',en:'Talus',group:'tarsal',region:'后足',feature:'滑车、距骨头与颈',description:'位于跟骨上方、舟骨后方。上面的距骨滑车与小腿的胫骨、腓骨共同构成踝关节；本模型不包含小腿骨。',look:'先看上方的滑车样曲面，再绕到前方看较圆的距骨头。移开距骨，可以观察它与跟骨相对的下方骨面。',neighbors:['calcaneus','navicular'],tip:'上接小腿，下邻跟骨，前邻舟骨。'},
 {id:'calcaneus',name:'跟骨',en:'Calcaneus',group:'tarsal',region:'后足',feature:'跟骨结节与载距突',description:'形成脚跟，是足部最大的跗骨。上方与距骨相关节，前方与骰骨相关节，后部为跟腱附着区域。',look:'转到足内侧寻找向内伸出的载距突；再看后下方宽大的跟骨结节。足底视角最容易理解它与前足之间的纵弓。',neighbors:['talus','cuboid'],tip:'脚跟的主体，不是踝部两侧的凸起。'},
 {id:'navicular',name:'舟骨',en:'Navicular',group:'tarsal',region:'中足',feature:'后方凹面与舟骨粗隆',description:'位于距骨头前方，前面连接三块楔骨，参与内侧纵弓的构成。足内侧可见向内突出的舟骨粗隆。',look:'隔离后转到后面，看承接距骨头的凹形骨面；前面则朝向三块楔骨。注意其位置在足内侧，不在外侧。',neighbors:['talus','cuneiform-medial','cuneiform-intermediate','cuneiform-lateral'],tip:'距骨 → 舟骨 → 三块楔骨。'},
 {id:'cuboid',name:'骰骨',pinyin:'tóu gǔ',en:'Cuboid',group:'tarsal',region:'中足',feature:'足底沟与外侧列',description:'位于足外侧，后面连接跟骨，前面主要连接第四、第五跖骨。它是外侧纵弓的组成部分。',look:'从足底观察骰骨下方的沟形区域；从外侧观察跟骨、骰骨和第五跖骨的前后排列。',neighbors:['calcaneus','cuneiform-lateral','metatarsal-4','metatarsal-5'],tip:'“骰”在这里读 tóu。记住它在小趾一侧。'},
 {id:'cuneiform-medial',name:'内侧楔骨',pinyin:'xiē gǔ',en:'Medial cuneiform',group:'tarsal',region:'中足',feature:'三块楔骨中最内侧的一块',description:'位于舟骨前方、第一跖骨后方，是三块楔骨中较大的一块。它与第一跖骨一起位于拇趾一侧。',look:'隔离后比较上下宽窄；在原位观察它如何接续第一跖骨，以及第二跖骨基底与邻近楔骨的嵌合关系。',neighbors:['navicular','cuneiform-intermediate','metatarsal-1','metatarsal-2'],tip:'内侧＝拇趾侧；不是画面的固定左侧。'},
 {id:'cuneiform-intermediate',name:'中间楔骨',pinyin:'xiē gǔ',en:'Intermediate cuneiform',group:'tarsal',region:'中足',feature:'夹在两块楔骨之间',description:'位于内侧、外侧楔骨之间，后接舟骨，前接第二跖骨。它较短，使第二跖骨基底位于相邻楔骨之间。',look:'从足背往下看三块楔骨的排列，再展开少量观察第二跖骨基底的位置。不要将观察用的展开间隙当成真实关节间隙。',neighbors:['navicular','cuneiform-medial','cuneiform-lateral','metatarsal-2'],tip:'由内向外：内侧楔骨、中间楔骨、外侧楔骨。'},
 {id:'cuneiform-lateral',name:'外侧楔骨',pinyin:'xiē gǔ',en:'Lateral cuneiform',group:'tarsal',region:'中足',feature:'前接第三跖骨',description:'位于中间楔骨外侧、骰骨内侧，后接舟骨，前方主要连接第三跖骨，并与相邻跖骨基底接触。',look:'从足背识别它与中间楔骨、骰骨的边界；移出后转动，比较各个关节面的方向。',neighbors:['navicular','cuneiform-intermediate','cuboid','metatarsal-2','metatarsal-3','metatarsal-4'],tip:'“外侧楔骨”仍在骰骨的内侧。'}
];
const cn=['一','二','三','四','五'], ord=['First','Second','Third','Fourth','Fifth'];
for(let i=1;i<=5;i++) BONES.push({id:`metatarsal-${i}`,name:`第${cn[i-1]}跖骨`,pinyin:'zhí gǔ',en:`${ord[i-1]} metatarsal`,group:'metatarsal',region:'前足',feature:i===1?'粗壮的第一跖骨与跖骨头':i===5?'第五跖骨基底的粗隆':'基底、骨干与跖骨头',description:`从拇趾侧向小趾侧编号，这是第${cn[i-1]}跖骨。近端为基底，中部为骨干，远端的跖骨头与第${cn[i-1]}趾近节趾骨形成跖趾关节。`+(i===1?'第一跖骨较粗短，头下方有两块籽骨。':i===5?'基底外侧的突出称第五跖骨粗隆。':''),look:i===2?'从足背观察第二跖骨基底如何位于楔骨之间，再沿骨干看到前方较圆的跖骨头。':'沿长轴从基底转到骨头，比较前后两端的形状。足底视角可观察跖骨头的排列。',neighbors:[...(i===1?['cuneiform-medial']:i===2?['cuneiform-medial','cuneiform-intermediate','cuneiform-lateral']:i===3?['cuneiform-lateral']:['cuboid']),`proximal-${i}`,...(i===1?['sesamoid-medial','sesamoid-lateral']:[])],tip:'跖骨在脚掌内部；趾骨才是脚趾中的骨。'});
for(let i=1;i<=5;i++)for(const [part,zh,en] of [['proximal','近节','Proximal'],['middle','中节','Middle'],['distal','远节','Distal']]){
 if(i===1&&part==='middle')continue;
 const toe=i===1?'拇趾':`第${cn[i-1]}趾`;
 BONES.push({id:`${part}-${i}`,name:`${toe}${zh}趾骨`,en:`${en} phalanx · toe ${i}`,group:'phalanges',region:'前足',feature:part==='distal'?'末端膨大的粗隆':'基底、骨体与远端骨头',description:`这是${toe}的${zh}趾骨。`+(i===1?'拇趾只有近节、远节两块趾骨，没有中节。':'第二至第五趾通常各有近节、中节、远节三块趾骨。')+(part==='proximal'?'其基底在后方与同列跖骨头相关节。':part==='distal'?'它位于脚趾最末端，末端形态不同于前面的骨节。':'它位于近节和远节之间。'),look:'单独查看后，转动比较基底的凹面与另一端的骨形。回到原位，沿同一脚趾从后向前依次识别各节。',neighbors:part==='proximal'?[`metatarsal-${i}`,`${i===1?'distal':'middle'}-${i}`]:part==='middle'?[`proximal-${i}`,`distal-${i}`]:[`${i===1?'proximal':'middle'}-${i}`],tip:i===1?'拇趾 2 节，其余四趾各 3 节，共 14 块趾骨。':'“近”靠近跖骨，“远”靠近趾尖。'});
}
for(const [s,zh]of [['medial','内侧'],['lateral','外侧']])BONES.push({id:`sesamoid-${s}`,name:`拇趾${zh}籽骨`,pinyin:'zǐ gǔ',en:`${s==='medial'?'Medial':'Lateral'} hallux sesamoid`,group:'sesamoid',region:'前足 · 足底',feature:'第一跖骨头下方的小骨',description:`位于第一跖骨头足底侧的${zh}，属于拇趾籽骨。籽骨包埋于相关肌腱结构中；本图只显示骨表面，没有显示肌腱。`,look:'切换足底视角，在第一跖骨头下方找两块小骨。隔离后可以更清晰地看到单个籽骨的形状。',neighbors:['metatarsal-1'],tip:'这里额外展示 2 块籽骨，不计入常说的 26 块基本足骨。'});

BONES.unshift(
 {id:'tibia',name:'胫骨',pinyin:'jìng gǔ',en:'Tibia',group:'leg',region:'小腿 · 内侧',feature:'上端、骨干、内踝',description:'小腿内侧较粗壮的长骨。下端与距骨形成踝关节的部分关节面，内侧向下的突出是内踝；上端朝向膝部，本版尚未加入股骨和髌骨。',look:'先用“小腿与足”看整块胫骨，再切到“足踝”看它的下端。拆出胫骨并转动，比较下端关节面与内踝的位置；单独查看可以观察上端和骨干。',neighbors:['fibula','talus'],tip:'内踝属于胫骨，不是另一块独立的骨头。'},
 {id:'fibula',name:'腓骨',pinyin:'féi gǔ',en:'Fibula',group:'leg',region:'小腿 · 外侧',feature:'腓骨头、骨干、外踝',description:'小腿外侧细长的骨，位于胫骨外侧。上端是腓骨头，下端向下延伸形成外踝；外踝内侧面与距骨相关节。腓骨不直接与股骨形成关节。',look:'在“小腿与足”中沿着细长骨干向下找到外踝；在“足踝”中，比较外踝、内踝和距骨的空间关系。使用“转骨”可以观察外踝朝向距骨的一面。',neighbors:['tibia','talus'],tip:'外踝属于腓骨；内外侧按身体方位判断，不按屏幕左右。'}
);
const talusEntry=BONES.find(b=>b.id==='talus');
talusEntry.description='位于跟骨上方、舟骨后方。上面的距骨滑车与胫骨、腓骨下端共同构成踝关节。本版已加入两块完整小腿骨，可切换“足踝”观察连接，或切换“小腿与足”看全貌。';
talusEntry.neighbors=['tibia','fibula',...talusEntry.neighbors];


// Additional knee/thigh study notes; original bone entries and ordering retained.
GROUPS.unshift({id:'thigh',name:'大腿与膝',pinyin:'',en:'Thigh & knee',count:2,color:'#b59772'});
BONES.push(
 {id:'femur',name:'股骨',en:'Femur',group:'thigh',region:'大腿',feature:'股骨头、股骨颈、大小转子、内外侧髁',description:'大腿中的长骨。近端的股骨头朝向内侧，与髋骨的髋臼形成髋关节；本期尚未加入髋骨。远端的内、外侧髁与胫骨上端构成膝关节的骨性部分，前方的髌面与髌骨相关节。股骨不直接与腓骨相关节。',look:'先在“下肢全览”看股骨的完整形状；单独查看后比较近端的圆形股骨头和远端的两侧髁（kē）。再切到“膝部”，移开髌骨，查看股骨远端前方的髌面；转到后面看髁间窝。',neighbors:['tibia','patella'],tip:'股骨头在上端、朝内侧；膝部在下端。髁读 kē。上方髋骨尚未加入。'},
 {id:'patella',name:'髌骨',pinyin:'bìn gǔ',en:'Patella',group:'thigh',region:'膝前方',feature:'前面、后方关节面、底与尖',description:'俗称膝盖骨，位于膝关节前方，包埋于股四头肌腱中，是一块籽骨。后方关节面与股骨的髌面相关节，并不直接与胫骨形成关节。本模型没有显示肌腱、髌韧带或关节软骨。',look:'在“膝部”从前方找到这块小骨。使用“拆骨”把它向旁边移出，再用“转骨”比较前面和朝向股骨的后面；单独查看可避免周围骨头遮挡。',neighbors:['femur'],tip:'髌骨读 bìn gǔ。它接触股骨，不直接与胫骨相关节；不要把自由拆解当作真实运动。'}
);
const tibiaEntry=BONES.find(b=>b.id==='tibia');
tibiaEntry.neighbors=['femur',...tibiaEntry.neighbors];
tibiaEntry.description='小腿内侧较粗壮的长骨，上端内、外侧髁与股骨远端构成膝关节的骨性部分；外侧与腓骨相邻。下端向内延伸形成内踝，与距骨共同参与踝关节。本期已加入股骨、髌骨，可切换“膝部”观察上下衔接。';
tibiaEntry.look='先沿完整骨干比较上下两端，再切换“膝部”看上端胫骨平台与股骨的关系；切换“足踝”看下端及内踝。膝部的间隙不代表空无一物，本版没有显示半月板和软骨。';

export const BY_ID=Object.fromEntries(BONES.map((b,i)=>[b.id,{...b,index:i+1}]));
export const SOURCES=[
 {title:'OpenStax · 下肢骨与膝部解剖',url:'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-4-bones-of-the-lower-limb',note:'股骨、髌骨、胫腓骨及膝踝骨性关系的教学参考。'},
 {title:'Z-Anatomy · 原始解剖图谱',url:'https://github.com/Z-Anatomy/Models-of-human-anatomy',note:'Gauthier Kervyn 与贡献者；模型许可 CC BY-SA 4.0。'},
 {title:'BodyParts3D · 上游数据库与建模说明',url:'https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html',note:'© The Database Center for Life Science；上游数据 CC BY-SA 2.1 Japan。'},
 {title:'本次提取使用的 Z-Anatomy GLB 导出',url:'https://github.com/Liyucheng1997/242_lab-human-anatomy/blob/main/public/models/skeleton.glb',note:'来源文件 blob SHA：5e15f7ea303c554f6c25a417f7f184696234b436。'},
 {title:'NCBI Bookshelf · Foot and Ankle',url:'https://www.ncbi.nlm.nih.gov/books/NBK546698/',note:'用于核对足部基本分区和骨骼组成。'},
 {title:'NCBI Bookshelf · Calcaneus / Talus',url:'https://www.ncbi.nlm.nih.gov/books/NBK519544/',note:'跟骨结构说明；距骨参考 NBK541086。'},
 {title:'NCBI Bookshelf · Navicular Bone',url:'https://www.ncbi.nlm.nih.gov/books/NBK547675/',note:'舟骨的位置与形态参考。'}
];