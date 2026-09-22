"""Explicit adult skeletal manifest; original Chinese study notes, not copied textbook text."""
ADDED=[]
GROUPS=[('cranial','脑颅骨','',8,'#a99e84'),('facial','面颅骨','',14,'#bda78c'),('head-other','舌骨与听小骨','',7,'#b6a9bc'),('cervical','颈椎','',7,'#9baeba'),('thoracic','胸椎','',12,'#abb293'),('thorax','肋骨与胸骨','',25,'#bdac88'),('shoulder','肩带骨','',4,'#a3b8a4'),('arm','上臂与前臂','',6,'#a4b4b3'),('carpal','腕骨','',16,'#baa997'),('metacarpal','掌骨','',10,'#99b1b3'),('hand-phalanges','指骨','',28,'#b6a2ad')]
def add(id,name,en,group,nodes,description,look,tip,neighbors=None,side='midline',base=None,pinyin=''):
 ADDED.append(dict(id=id,name=name,en=en,group=group,region=dict((x[0],x[1]) for x in GROUPS)[group],sourceNodes=nodes if isinstance(nodes,list) else [nodes],description=description,look=look,tip=tip,neighbors=neighbors or [],side=side,baseId=base or id,pinyin=pinyin))
cranial={
 'frontal':('额骨','Frontal bone','构成额部和眼眶上壁，位于颅骨前上方。','由额部转向下方，比较眶部的平面与向后弯曲的颅面。','额骨是一块；左右眼眶上方属于同一额骨。',['parietal-right','parietal-left','sphenoid','ethmoid','nasal-right','nasal-left']),
 'occipital':('枕骨','Occipital bone','位于颅后下部，参与颅底，并围绕枕骨大孔。','从颅底看枕骨大孔及其两侧的枕髁，再对照下方寰椎的位置。','枕骨下方与第一颈椎衔接；本图没有显示脊髓。',['parietal-right','parietal-left','temporal-right','temporal-left','sphenoid','C1']),
 'sphenoid':('蝶骨','Sphenoid bone','位于颅底中央，向两侧展开，参与眼眶和颅底的构成。','单独查看，比较中央骨体、向两侧的翼状部分和向下的翼突。','从整颅中移开周围骨，较容易理解蝶骨的位置。',['frontal','ethmoid','occipital','temporal-right','temporal-left','parietal-right','parietal-left']),
 'ethmoid':('筛骨','Ethmoid bone','位于两眼眶之间和鼻腔上部，参与鼻中隔、鼻腔侧壁及眶内侧壁。','移开额骨和鼻骨，观察筛骨的中线骨板及左右两侧的结构。','上、中鼻甲属于筛骨；下鼻甲是另外的独立骨。',['frontal','sphenoid','vomer','lacrimal-right','lacrimal-left','maxilla-right','maxilla-left'])}
for k,(cn,en,d,l,t,n) in cranial.items():add(k,cn,en,'cranial',en+'.001',d,l,t,n)
for side,suf,cnside in [('right','r','右'),('left','l','左')]:
 add('parietal-'+side,cnside+'顶骨','Parietal bone · '+side,'cranial','Parietal bone.'+suf+'.001','位于颅顶及颅侧上部；左右顶骨共同形成颅盖的大部分。','转动观察外表面的弧度，再看朝向颅腔的内表面和周边骨缝边缘。','骨缝是连接边界；拆开只是教学展示，不表示可自由活动。',['frontal','occipital','temporal-'+side,'sphenoid','parietal-'+('left' if side=='right' else 'right')],side,'parietal')
 add('temporal-'+side,cnside+'颞骨','Temporal bone · '+side,'cranial','Temporal bone.'+suf+'.001','位于颅侧下部和颅底，外耳道区域、乳突及下颌窝位于此骨。','由侧面寻找外耳道附近和颧突，再从下方看与下颌骨相对的下颌窝。','颞骨读 niè gǔ。中耳听小骨可在专门区域放大观察。',['parietal-'+side,'occipital','sphenoid','zygomatic-'+side,'mandible'],side,'temporal','niè gǔ')
facial={
 'maxilla':('上颌骨','Maxilla','形成上颌、硬腭的前部和眼眶底部的一部分。','比较牙槽缘、眶面和向内的腭突；左右上颌骨在中线相接。','牙齿不属于骨，未计入本图206块标准骨。','hé gǔ',['frontal','ethmoid','nasal','lacrimal','zygomatic','palatine','inferior-concha']),
 'zygomatic':('颧骨','Zygomatic bone','形成面颊的骨性突起，参与眼眶外侧壁及颧弓。','从侧面看它如何向后接续颞骨的颧突，再看朝向眼眶的骨面。','颧弓由颧骨与颞骨的相应骨突共同形成。','quán gǔ',['frontal','sphenoid','temporal','maxilla']),
 'nasal':('鼻骨','Nasal bone','位于鼻梁上部，左右各一块，处于额骨下方和上颌骨之间。','在正面辨认左右鼻骨，再单独旋转看其薄板状形态。','鼻尖主要不是骨结构；本版没有加入鼻软骨。','',['frontal','ethmoid','maxilla']),
 'lacrimal':('泪骨','Lacrimal bone','是眼眶内侧壁前部的小骨，靠近鼻根两侧。','先在眼眶区域定位，再单独查看薄骨板与沟样区域。','它很小，整颅视图不易点到时可从目录选择。','',['frontal','ethmoid','maxilla','inferior-concha']),
 'palatine':('腭骨','Palatine bone','位于鼻腔后部与硬腭后方，左右各一块。','从颅底观察水平板与上颌骨腭突的接续，再看向上的骨板。','硬腭后部主要由腭骨参与构成。','è gǔ',['sphenoid','ethmoid','maxilla','inferior-concha']),
 'inferior-concha':('下鼻甲','Inferior nasal concha bone','位于鼻腔外侧壁，向鼻腔内卷曲；左右各为一块独立骨。','转到鼻腔前方，必要时隐藏上颌骨，观察其卷曲的薄板形态。','下鼻甲是独立骨，不能与筛骨的中鼻甲混淆。','',['ethmoid','maxilla','lacrimal','palatine'])}
for side,suf,cnside in [('right','r','右'),('left','l','左')]:
 for k,(cn,en,d,l,t,p,n) in facial.items():
  ns=[a if a in cranial else a+'-'+side for a in n]
  if k in ['nasal','maxilla','palatine']:ns.append(k+'-'+('left' if side=='right' else 'right'))
  if k in ['maxilla','palatine']:ns.append('vomer')
  add(k+'-'+side,cnside+cn,en+' · '+side,'facial',en+'.'+suf+'.001',d,l,t,ns,side,k,p)
add('vomer','犁骨','Vomer','facial','Vomer.001','位于鼻腔中线，构成骨性鼻中隔的后下部。','从侧面看薄板形态，回到原位比较它与筛骨垂直板的相接。','鼻中隔不全是骨；前部软骨没有显示。',['sphenoid','ethmoid','maxilla-right','maxilla-left','palatine-right','palatine-left'])
add('mandible','下颌骨','Mandible','facial','Mandible.001','形成下颌，包含水平的骨体和两侧向上的下颌支。','沿下颌支向上，比较前方冠突和后方髁突；观察髁突与颞骨的位置关系。','下颌骨为一块，左右两端分别与颞骨构成颞下颌关节。',['temporal-right','temporal-left'],pinyin='hé gǔ')
add('hyoid','舌骨','Hyoid bone','head-other','Hyoid bone.001','位于下颌骨下方、颈前部，具有骨体及向两侧伸出的角。','单独查看其弧形轮廓与大小角，再回到下颌骨和颈椎附近定位。','舌骨不与其他骨直接形成关节，主要由软组织悬系。')
for side,suf,cnside in [('right','r','右'),('left','l','左')]:
 for k,cn,en,n in [('malleus','锤骨','Malleus',['incus']),('incus','砧骨','Incus',['malleus','stapes']),('stapes','镫骨','Stapes',['incus'])]:
  add(k+'-'+side,cnside+cn,en+' · '+side,'head-other',en+'.'+suf+'.001','位于'+cnside+'侧中耳，是三块听小骨之一；在全身比例下非常细小。','使用听小骨区域或单独查看，旋转比较与相邻听小骨接续的部位。','这是自动放大的观察视图，不代表真实大小；此处未显示鼓膜与内耳。',[x+'-'+side for x in n],side,k,{'incus':'zhēn gǔ','stapes':'dèng gǔ'}.get(k,''))
for code,count,group,cn in [('C',7,'cervical','颈椎'),('T',12,'thoracic','胸椎')]:
 for i in range(1,count+1):
  id=code+str(i);en=('Atlas (C1)' if id=='C1' else 'Axis (C2)' if id=='C2' else 'Vertebra '+id)
  n=([code+str(i-1)] if i>1 else ['occipital'] if code=='C' else ['C7'])+([code+str(i+1)] if i<count else ['T1'] if code=='C' else ['L1'])
  if code=='T':n+=['rib-'+str(i)+'-right','rib-'+str(i)+'-left']
  name='寰椎 C1' if id=='C1' else '枢椎 C2' if id=='C2' else '第'+str(i)+cn+' '+id
  d='位于枕骨下方，是第一颈椎；环形结构不同于典型椎骨，没有一般椎体和棘突。' if id=='C1' else '位于寰椎下方，向上的齿突是识别第二颈椎的重要特征。' if id=='C2' else f'从上向下编号为第{i}{cn}，位于相邻椎骨之间。'
  l='从上方看左右侧块与椎孔，再从后面比较前弓和后弓。' if id=='C1' else '观察齿突、椎体和后方棘突，比较其与寰椎的空间关系。' if id=='C2' else '先区分前方椎体与后方椎弓，再观察椎孔、横突及棘突。'+('胸椎还可结合对应肋骨观察骨性接续。' if code=='T' else '注意两侧横突区域与胸椎、腰椎的区别。')
  add(id,name,en,group,en+'.001',d,l,'仅显示骨表面，椎间盘、韧带、脊髓和神经未显示。',n,pinyin='huán zhuī' if id=='C1' else 'shū zhuī' if id=='C2' else '')
ordinals=['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth','Ninth','Tenth','Eleventh','Twelfth']
for side,suf,cnside in [('right','r','右'),('left','l','左')]:
 for i,ord in enumerate(ordinals,1):
  n=['T'+str(i)]+(['T'+str(i-1)] if 2<=i<=9 else [])
  add(f'rib-{i}-{side}',f'{cnside}第{i}肋骨',ord+' rib · '+side,'thorax',ord+' rib.'+suf+'.001',f'从上向下编号为第{i}肋，位于胸廓{cnside}侧。'+('前端经相应肋软骨接到胸骨。' if i<=7 else '前端经肋软骨参与肋弓连接，不直接以骨接到胸骨。' if i<=10 else '属于浮肋，前端不与胸骨连接。'),'沿后端辨认肋头、肋颈或结节区域，再沿弯曲骨体看到前端。','本图不显示肋软骨，因此肋骨前端与胸骨之间可见空隙。',n,side,'rib-'+str(i))
add('sternum','胸骨','Sternum','thorax',['Manubrium of sternum.001','Body of sternum.001','Xiphoid process.001'],'位于胸廓前方正中，由胸骨柄、胸骨体和剑突三个区域构成。','从侧面比较胸骨柄与体的角度，再从前面辨认上端和下端的形状。','按成人骨骼标准清单计为一块；源模型的三个部分合为同一可选对象。',['clavicle-right','clavicle-left'])
for side,suf,cnside in [('right','r','右'),('left','l','左')]:
 add('clavicle-'+side,cnside+'锁骨','Clavicle · '+side,'shoulder','Clavicle.'+suf+'.001','横位于胸廓前上方，内端接胸骨，外端接肩胛骨肩峰。','转动比较S形轮廓和两端；在原位查看它如何连接胸骨和肩部。','骨性连接之外还有韧带和关节盘等软组织，本版未显示。',['sternum','scapula-'+side],side,'clavicle')
 add('scapula-'+side,cnside+'肩胛骨','Scapula · '+side,'shoulder','Scapula.'+suf+'.001','位于胸廓后上方，是扁平的肩带骨；外侧关节盂与肱骨头相对。','从后面看肩胛冈、肩峰，从外侧看关节盂和喙突，再观察面向肋骨的前面。','肩胛骨贴近胸廓，但不与肋骨直接形成普通骨性关节。',['clavicle-'+side,'humerus-'+side],side,'scapula','jiǎ gǔ')
 add('humerus-'+side,cnside+'肱骨','Humerus · '+side,'arm','Humerus.'+suf+'.001','位于上臂；上端为肱骨头，下端与尺骨、桡骨衔接。','比较上端圆形骨头和下端滑车、小头等区域，再看骨干。','上端参与肩关节，下端参与肘关节。',['scapula-'+side,'ulna-'+side,'radius-'+side],side,'humerus','gōng gǔ')
 add('radius-'+side,cnside+'桡骨','Radius · '+side,'arm','Radius.'+suf+'.001','位于前臂拇指一侧；近端的桡骨头较小，远端靠近腕部较宽。','观察近端圆盘状骨头，再对照远端与腕骨的排列。','解剖学姿势下桡骨在外侧；本图没有模拟前臂旋转。',['humerus-'+side,'ulna-'+side,'scaphoid-'+side,'lunate-'+side],side,'radius','ráo gǔ')
 add('ulna-'+side,cnside+'尺骨','Ulna · '+side,'arm','Ulna.'+suf+'.001','位于前臂小指一侧，近端形成明显的鹰嘴与滑车切迹。','从侧面看近端钩状轮廓，再比较细小的远端与桡骨远端。','尺骨与腕骨之间有软组织结构，不应把它与腕骨简单标成直接骨关节。',['humerus-'+side,'radius-'+side],side,'ulna')
carpals={
 'scaphoid':('手舟骨','Scaphoid bone','近侧列拇指侧','舟骨近端与桡骨相对，远端朝向大、小多角骨。',['radius','lunate','trapezium','trapezoid','capitate']),
 'lunate':('月骨','Lunate bone','近侧列中部','比较朝向桡骨的近端凸面与朝向头状骨的远端面。',['radius','scaphoid','triquetrum','capitate','hamate']),
 'triquetrum':('三角骨','Triquetrum bone','近侧列小指侧','掌侧邻接豌豆骨，远侧邻接钩骨。',['lunate','pisiform','hamate']),
 'pisiform':('豌豆骨','Pisiform bone','腕部掌侧','找到它与三角骨相对的骨面。',['triquetrum']),
 'trapezium':('大多角骨','Trapezium bone','远侧列拇指侧','比较它与第一掌骨基底相对的鞍形关节区域。',['scaphoid','trapezoid','hand-metacarpal-1','hand-metacarpal-2']),
 'trapezoid':('小多角骨','Trapezoid bone','远侧列第二掌骨后方','观察它夹在大多角骨和头状骨之间的位置。',['scaphoid','trapezium','capitate','hand-metacarpal-2']),
 'capitate':('头状骨','Capitate bone','远侧列中央','观察较圆的头部与向第三掌骨接续的远端。',['scaphoid','lunate','trapezoid','hamate','hand-metacarpal-2','hand-metacarpal-3','hand-metacarpal-4']),
 'hamate':('钩骨','Hamate bone','远侧列小指侧','从掌侧寻找钩状突起，再看它与第四、第五掌骨的接续。',['lunate','triquetrum','capitate','hand-metacarpal-4','hand-metacarpal-5'])}
for side,suf,cnside in [('right','r','右'),('left','l','左')]:
 for k,(cn,en,pos,l,n) in carpals.items():add(k+'-'+side,cnside+cn,en+' · '+side,'carpal',en+'.'+suf+'.001','位于'+cnside+'手'+pos+'，是八块腕骨之一。',l+'单骨观察可排除周围腕骨的遮挡。','手舟骨位于腕部，足舟骨位于足部，两者不是同一块骨。' if k=='scaphoid' else '腕骨按近侧列与远侧列观察；展开距离只是显示效果。',[x+'-'+side for x in n],side,k)
 for i in range(1,6):
  id=f'hand-metacarpal-{i}';n={1:['trapezium'],2:['trapezium','trapezoid','capitate'],3:['capitate'],4:['capitate','hamate'],5:['hamate']}[i]+[f'hand-proximal-{i}']
  add(id+'-'+side,cnside+'第'+str(i)+'掌骨',ordinals[i-1]+' metacarpal · '+side,'metacarpal',ordinals[i-1]+' metacarpal bone.'+suf+'.001',f'从拇指到小指编号，这是第{i}掌骨，位于手掌内部。','沿近端基底、骨干、远端掌骨头依次观察，再对照同列近节指骨。','掌骨属于手掌，指骨属于手指。',[x+'-'+side for x in n],side,id)
  for part,cnpart in [('proximal','近节'),('middle','中节'),('distal','远节')]:
   if i==1 and part=='middle':continue
   id=f'hand-{part}-{i}';finger='拇指' if i==1 else ['','', '示指','中指','环指','小指'][i]
   n=[f'hand-metacarpal-{i}',f'hand-{"distal" if i==1 else "middle"}-{i}'] if part=='proximal' else [f'hand-proximal-{i}',f'hand-distal-{i}'] if part=='middle' else [f'hand-{"proximal" if i==1 else "middle"}-{i}']
   add(id+'-'+side,cnside+finger+cnpart+'指骨',part.capitalize()+f' phalanx · finger {i} · '+side,'hand-phalanges',part.capitalize()+' phalanx of '+ordinals[i-1].lower()+' finger of hand.'+suf+'.001','位于'+cnside+'手'+finger+'的'+cnpart+'。','转动比较近端基底与远端形态，再在手部区域沿同一手指逐节定位。','拇指只有近节、远节；其余四指各有近节、中节、远节。',[x+'-'+side for x in n],side,id)
assert len(ADDED)==137,len(ADDED)
assert len({b['id'] for b in ADDED})==137
assert sum(x[3] for x in GROUPS)==137
