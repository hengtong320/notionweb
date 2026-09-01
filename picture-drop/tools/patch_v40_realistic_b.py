#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; INDEX=ROOT/'index.html'; CSS=ROOT/'style.css'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'

s=GAME.read_text(encoding='utf-8')

cards=r'''  const BLESSING_CARDS=[
    {path:'assets/blessings-realistic/01-lotus-sunrise.png',name:'晨曦荷香',title:'早安',english:'Good Morning',lines:['岁岁安康','日日舒心顺遂'],accent:'#ffd46f',titleColor:'#fffdf7',layout:{titleX:760,titleY:155,englishY:255,linesX:710,linesY:1115,align:'center'}},
    {path:'assets/blessings-realistic/02-trumpet-flower.png',name:'凌霄晨光',title:'早安',english:'Good Morning',lines:['心情明朗','好事常来'],accent:'#ffc16d',titleColor:'#fffaf0',layout:{titleX:245,titleY:165,englishY:265,linesX:540,linesY:1100,align:'center'}},
    {path:'assets/blessings-realistic/03-jujube-orchard.png',name:'晨光枣园',title:'早上好',english:'Have a Lovely Day',lines:['喜乐相伴','轻松惬意'],accent:'#ffe079',titleColor:'#fffef5',layout:{titleX:540,titleY:165,englishY:265,linesX:540,linesY:1105,align:'center'}},
    {path:'assets/blessings-realistic/04-elegant-woman.png',name:'花间雅韵',title:'晨安',english:'Morning Blessings',lines:['愿你常怀欢喜','岁月温柔相伴'],accent:'#ffd8e5',titleColor:'#fffafc',layout:{titleX:225,titleY:170,englishY:270,linesX:250,linesY:650,align:'center',lineSize:51}},
    {path:'assets/blessings-realistic/05-blessing-vase.png',name:'福气花瓶',title:'早安',english:'Good Morning',lines:['开心快乐','幸福安康'],accent:'#ffd477',titleColor:'#fffaf0',layout:{titleX:540,titleY:165,englishY:265,linesX:540,linesY:1090,align:'center'}},
    {path:'assets/blessings-realistic/06-forest-waterfall.png',name:'清泉晨光',title:'健康平安',english:'Peace & Health',lines:['清心自在','顺遂常伴'],accent:'#aee8d3',titleColor:'#f7fff9',layout:{titleX:540,titleY:165,englishY:260,linesX:540,linesY:1105,align:'center',titleSize:112}},
    {path:'assets/blessings/07-moon-osmanthus.svg',name:'月圆桂香',title:'中秋安康',lines:['花好月圆','阖家团圆'],accent:'#ffd86b',titleColor:'#fff8d9'},
    {path:'assets/blessings/08-lantern-festival.svg',name:'灯火佳节',title:'佳节快乐',lines:['家和万事兴','福气常相伴'],accent:'#ffd56a',titleColor:'#fff4db'},
    {path:'assets/blessings/09-chrysanthemum-mountain.svg',name:'菊香重阳',title:'重阳安康',lines:['登高望远','福寿康宁'],accent:'#ffe079',titleColor:'#fff9df'},
    {path:'assets/blessings/10-plum-snow.svg',name:'踏雪寻梅',title:'冬日安好',lines:['岁月静好','温暖常在'],accent:'#ffd4e2',titleColor:'#fff'},
    {path:'assets/blessings/11-fireworks-city.svg',name:'烟火新岁',title:'新年快乐',lines:['万事顺遂','心想事成'],accent:'#ffe36b',titleColor:'#fff'},
    {path:'assets/blessings/12-spring-fortune.svg',name:'新春纳福',title:'新春大吉',lines:['福气满满','阖家安康'],accent:'#ffd36a',titleColor:'#fff8df'}
  ];'''
pat=re.compile(r"  const BLESSING_CARDS=\[.*?\n  \];",re.S)
if not pat.search(s): raise SystemExit('BLESSING_CARDS block not found')
s=pat.sub(cards,s,count=1)

s=s.replace("if(game.mode==='blessing')return '拼出完整祝福图，完成后可保存或分享给亲友';",
            "if(game.mode==='blessing')return '先拼纯净写实美图，完成后自动生成带祝福语的高清作品';",1)
s=s.replace("if(game.mode==='blessing'){dom.tutorialHand.classList.remove('is-visible');showToast('拼完整后会生成一张可保存、可分享的祝福作品',3300);}",
            "if(game.mode==='blessing'){dom.tutorialHand.classList.remove('is-visible');showToast('游戏中专注拼美图，拼完整后再生成可保存分享的祝福作品',3600);}",1)

start=s.index('  async function renderBlessingPoster(index){')
end=s.index('\n\n  async function posterBlob',start)
poster=r'''  async function renderBlessingPoster(index){
    const meta=blessingMeta(index);if(!meta)throw new Error('not a blessing card');
    const img=await loadPosterImage(PICTURE_PATHS[index]);
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;const ctx=canvas.getContext('2d');
    ctx.drawImage(img,0,0,1080,1440);
    const layout=meta.layout||{},align=layout.align||'center';
    const titleX=layout.titleX??540,titleY=layout.titleY??195,englishY=layout.englishY??305;
    const linesX=layout.linesX??540,linesY=layout.linesY??1125;

    const top=ctx.createLinearGradient(0,0,0,430);top.addColorStop(0,'rgba(12,18,32,.48)');top.addColorStop(.58,'rgba(12,18,32,.10)');top.addColorStop(1,'rgba(12,18,32,0)');ctx.fillStyle=top;ctx.fillRect(0,0,1080,470);
    const bottom=ctx.createLinearGradient(0,760,0,1440);bottom.addColorStop(0,'rgba(10,15,25,0)');bottom.addColorStop(.48,'rgba(10,15,25,.24)');bottom.addColorStop(1,'rgba(10,15,25,.72)');ctx.fillStyle=bottom;ctx.fillRect(0,720,1080,720);

    ctx.textAlign=align;ctx.textBaseline='middle';ctx.lineJoin='round';
    const titleSize=layout.titleSize??(meta.title.length>=4?118:154);
    ctx.save();ctx.shadowColor='rgba(0,0,0,.42)';ctx.shadowBlur=24;ctx.shadowOffsetY=8;
    ctx.font=`900 ${titleSize}px "Songti SC","STSong","PingFang SC","Microsoft YaHei",serif`;
    ctx.strokeStyle='rgba(40,28,35,.72)';ctx.lineWidth=Math.max(14,titleSize*.12);ctx.strokeText(meta.title,titleX,titleY);
    ctx.fillStyle=meta.titleColor||'#fff';ctx.fillText(meta.title,titleX,titleY);ctx.restore();

    if(meta.english){
      ctx.save();ctx.textAlign=align;ctx.font='italic 54px Georgia,"Times New Roman",serif';ctx.shadowColor='rgba(0,0,0,.50)';ctx.shadowBlur=13;ctx.shadowOffsetY=5;
      ctx.strokeStyle='rgba(30,25,35,.62)';ctx.lineWidth=8;ctx.strokeText(meta.english,titleX,englishY);ctx.fillStyle='#fffdf5';ctx.fillText(meta.english,titleX,englishY);ctx.restore();
    }

    const lineSize=layout.lineSize??66;
    ctx.save();ctx.textAlign=align;ctx.font=`900 ${lineSize}px "PingFang SC","Microsoft YaHei",sans-serif`;ctx.shadowColor='rgba(0,0,0,.46)';ctx.shadowBlur=18;ctx.shadowOffsetY=7;
    ctx.lineWidth=13;ctx.strokeStyle='rgba(46,24,28,.80)';ctx.fillStyle='#fffaf0';
    let y=linesY;for(const line of meta.lines){ctx.strokeText(line,linesX,y);ctx.fillText(line,linesX,y);y+=lineSize+34;}ctx.restore();

    ctx.fillStyle=meta.accent;ctx.fillRect(390,1308,300,5);
    const sparkle=(x,y,r)=>{ctx.save();ctx.translate(x,y);ctx.strokeStyle='rgba(255,248,205,.95)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-r,0);ctx.lineTo(r,0);ctx.moveTo(0,-r);ctx.lineTo(0,r);ctx.stroke();ctx.restore();};
    sparkle(352,1310,12);sparkle(728,1310,9);
    ctx.textAlign='center';ctx.font='500 29px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.90)';ctx.fillText('这份美好由我亲手拼成，送给重要的人',540,1364);
    return canvas;
  }'''
s=s[:start]+poster+s[end:]
GAME.write_text(s,encoding='utf-8')

idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('<span>早安祝福拼图</span><small>拼完生成作品 · 可保存分享</small>',
                '<span>写实祝福拼图 <b class="real-badge">方案B</b></span><small>拼纯净美图 · 完成后生成祝福作品</small>',1)
idx=idx.replace('<button id="workBadge" class="work-badge" hidden>祝福作品 <b id="workBadgeCount">0</b>/6</button>',
                '<button id="workBadge" class="work-badge" hidden>写实作品 <b id="workBadgeCount">0</b>/6</button>',1)
idx=idx.replace('<div class="blessing-modal-head"><div><small>拼图生成作品</small><h2>我的祝福卡</h2></div>',
                '<div class="blessing-modal-head"><div><small>纯净拼图 · 智能排版</small><h2>我的写实祝福卡</h2></div>',1)
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',idx)
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',idx)
INDEX.write_text(idx,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
css += r'''

/* v4.0 photorealistic blessing scheme B */
.blessing-entry{position:relative;isolation:isolate;overflow:hidden;min-height:78px;background-image:linear-gradient(90deg,rgba(7,44,54,.88),rgba(10,63,65,.55)),url("assets/blessings-realistic/01-lotus-sunrise.png")!important;background-size:cover!important;background-position:center 56%!important;border:1px solid rgba(255,227,151,.72)!important;box-shadow:0 12px 25px rgba(0,39,48,.26),inset 0 0 0 1px rgba(255,255,255,.18)!important}
.blessing-entry::before{content:'';position:absolute;inset:0;z-index:-1;background:radial-gradient(circle at 84% 15%,rgba(255,236,156,.42),transparent 34%)}
.blessing-entry span,.blessing-entry small{position:relative;text-shadow:0 2px 7px rgba(0,0,0,.72)}
.real-badge{display:inline-block;margin-left:5px;padding:2px 6px;border-radius:999px;background:linear-gradient(135deg,#ffe795,#efad42);color:#52320c;font-size:9px;vertical-align:3px;text-shadow:none;box-shadow:0 2px 7px rgba(0,0,0,.22)}
.game-stage.is-blessing{background:radial-gradient(circle at 50% -8%,rgba(255,222,151,.25),transparent 34%),linear-gradient(180deg,#0e5959 0%,#073f4b 46%,#063342 100%)}
.game-stage.is-blessing .topbar{background:linear-gradient(180deg,rgba(5,49,54,.96),rgba(5,61,68,.90));border-bottom-color:rgba(255,218,132,.42)}
.game-stage.is-blessing .board-wrap{box-shadow:0 18px 34px rgba(0,20,28,.42),0 0 0 1px rgba(255,222,151,.22)}
.game-stage.is-blessing .work-badge{background:linear-gradient(135deg,rgba(255,231,157,.96),rgba(238,171,71,.96));color:#57320b;box-shadow:0 7px 18px rgba(0,20,24,.30)}
.blessing-lockup{background:linear-gradient(180deg,transparent,rgba(10,14,24,.68));padding:22% 7% 8%!important;text-shadow:0 3px 10px rgba(0,0,0,.78)}
.blessing-lockup strong{font-family:"Songti SC","STSong","PingFang SC",serif!important;letter-spacing:.08em}
.blessing-preview-shell{background:linear-gradient(145deg,#fff8e6,#d6aa55)!important;padding:5px!important;box-shadow:0 16px 36px rgba(24,14,5,.28)}
.blessing-preview-shell img{border-radius:13px;display:block}
'''
CSS.write_text(css,encoding='utf-8')

sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v4.0.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',sw)
SW.write_text(sw,encoding='utf-8')

b=STANDALONE.read_text(encoding='utf-8')
old="assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg'))]"
new="assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg')),*((ROOT/'assets'/'blessings-realistic').glob('*.png'))]"
if old not in b: raise SystemExit('standalone assets marker missing')
b=b.replace(old,new,1)
b=b.replace("mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else 'image/webp'",
            "mime={'svg':'image/svg+xml','png':'image/png','jpg':'image/jpeg','jpeg':'image/jpeg','webp':'image/webp'}.get(image_path.suffix.lower().lstrip('.'),'application/octet-stream')",1)
STANDALONE.write_text(b,encoding='utf-8')

VERSION.write_text('4.0.0\n',encoding='utf-8')
print('patched v4.0 photorealistic blessing scheme B')
