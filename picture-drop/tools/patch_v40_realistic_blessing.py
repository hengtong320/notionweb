#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; INDEX=ROOT/'index.html'; CSS=ROOT/'style.css'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'

s=GAME.read_text(encoding='utf-8')

# Replace the illustrative blessing pool with six full-bleed, text-free, realistic
# photographic bases. Copy is deliberately rendered only after completion (Scheme B).
pat=r"  const BLESSING_CARDS=\[\n.*?\n  \];\n  const BLESSING_START"
replacement=r'''  const BLESSING_CARDS=[
    {path:'assets/blessings-realistic/01-lotus-sunrise.png',name:'荷花晨曦',title:'早安',subtitle:'GOOD MORNING',lines:['岁岁安康','日日舒心顺遂'],accent:'#ff96b8',titleColor:'#fffaf7',realistic:true,layout:{titleX:785,titleY:165,titleAlign:'center',bodyX:700,bodyY:1165,bodyAlign:'center',bodySize:64}},
    {path:'assets/blessings-realistic/02-trumpet-flower.png',name:'凌霄花开',title:'早安',subtitle:'GOOD MORNING',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffc86f',titleColor:'#fff9e8',realistic:true,layout:{titleX:110,titleY:170,titleAlign:'left',bodyX:100,bodyY:1110,bodyAlign:'left',bodySize:54}},
    {path:'assets/blessings-realistic/03-jujube-orchard.png',name:'枣园丰收',title:'早上好',subtitle:'MORNING WISHES',lines:['喜乐相伴','轻松惬意'],accent:'#f4d85d',titleColor:'#fffdf2',realistic:true,layout:{titleX:105,titleY:160,titleAlign:'left',bodyX:105,bodyY:1070,bodyAlign:'left',bodySize:66}},
    {path:'assets/blessings-realistic/04-elegant-woman.png',name:'晨光佳人',title:'早安',subtitle:'A BEAUTIFUL DAY',lines:['清晨的平安是祝福','日子的温暖是幸福'],accent:'#ffc0d8',titleColor:'#fff',realistic:true,sideShade:true,layout:{titleX:92,titleY:160,titleAlign:'left',bodyX:88,bodyY:735,bodyAlign:'left',bodySize:48}},
    {path:'assets/blessings-realistic/05-blessing-vase.png',name:'福气花瓶',title:'早上好',subtitle:'GOOD MORNING',lines:['开心快乐','幸福安康'],accent:'#ffd16e',titleColor:'#fff8ec',realistic:true,layout:{titleX:540,titleY:160,titleAlign:'center',bodyX:540,bodyY:1140,bodyAlign:'center',bodySize:70}},
    {path:'assets/blessings-realistic/06-pine-crane.png',name:'松鹤晨曦',title:'晨安',subtitle:'PEACE & HEALTH',lines:['福寿绵长','平安喜乐'],accent:'#f1d994',titleColor:'#fffdf5',realistic:true,layout:{titleX:790,titleY:160,titleAlign:'center',bodyX:755,bodyY:1130,bodyAlign:'center',bodySize:68}}
  ];
  const BLESSING_START'''
s,n=re.subn(pat,replacement,s,count=1,flags=re.S)
if n!=1: raise SystemExit('BLESSING_CARDS block not found')

# Migrate old illustrative blessing indices out of local saves safely.
s=s.replace("blessings: Array.isArray(parsed.blessings) ? parsed.blessings.filter(Number.isInteger) : [],",
            "blessings: Array.isArray(parsed.blessings) ? parsed.blessings.filter((v)=>Number.isInteger(v)&&isBlessingIndex(v)) : [],",1)

s=s.replace("if(game.mode==='blessing')return '拼出完整祝福图，完成后可保存或分享给亲友';",
            "if(game.mode==='blessing')return '拼无字写实美景，完成后自动生成精美祝福作品';",1)
s=s.replace("if(game.mode==='blessing'){dom.tutorialHand.classList.remove('is-visible');showToast('拼完整后会生成一张可保存、可分享的祝福作品',3300);}",
            "if(game.mode==='blessing'){dom.tutorialHand.classList.remove('is-visible');showToast('先拼无字写实底图，完成后自动排版成可分享祝福作品',3600);}",1)

# Replace the final-poster renderer with a higher-fidelity Scheme B compositor.
start=s.index('  async function renderBlessingPoster(index){')
end=s.index('\n\n  async function posterBlob',start)
poster=r'''  function roundedRectPath(ctx,x,y,w,h,r){
    const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
  }

  function drawSparkle(ctx,x,y,size,color,alpha=1){
    ctx.save();ctx.translate(x,y);ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.beginPath();
    ctx.moveTo(0,-size);ctx.quadraticCurveTo(size*.16,-size*.16,size,0);ctx.quadraticCurveTo(size*.16,size*.16,0,size);ctx.quadraticCurveTo(-size*.16,size*.16,-size,0);ctx.quadraticCurveTo(-size*.16,-size*.16,0,-size);ctx.fill();ctx.restore();
  }

  function coverImage(ctx,img,w,h){
    const sr=img.width/img.height,tr=w/h;let sx=0,sy=0,sw=img.width,sh=img.height;
    if(sr>tr){sw=img.height*tr;sx=(img.width-sw)/2;}else if(sr<tr){sh=img.width/tr;sy=(img.height-sh)/2;}
    ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h);
  }

  function outlinedPosterText(ctx,text,x,y,fill,accent,strokeWidth){
    ctx.save();ctx.lineJoin='round';ctx.miterLimit=2;ctx.shadowColor='rgba(0,0,0,.34)';ctx.shadowBlur=18;ctx.shadowOffsetY=8;
    ctx.strokeStyle='rgba(25,22,34,.78)';ctx.lineWidth=strokeWidth;ctx.strokeText(text,x,y);
    ctx.shadowColor='transparent';ctx.strokeStyle=accent;ctx.lineWidth=Math.max(3,strokeWidth*.22);ctx.strokeText(text,x,y);
    ctx.fillStyle=fill;ctx.fillText(text,x,y);ctx.restore();
  }

  async function renderBlessingPoster(index){
    const meta=blessingMeta(index);if(!meta)throw new Error('not a blessing card');
    const img=await loadPosterImage(PICTURE_PATHS[index]);
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;const ctx=canvas.getContext('2d');
    coverImage(ctx,img,1080,1440);

    // Preserve the photograph while making independently positioned text readable.
    const top=ctx.createLinearGradient(0,0,0,490);top.addColorStop(0,'rgba(9,18,30,.42)');top.addColorStop(.62,'rgba(9,18,30,.11)');top.addColorStop(1,'rgba(9,18,30,0)');ctx.fillStyle=top;ctx.fillRect(0,0,1080,520);
    const bottom=ctx.createLinearGradient(0,790,0,1440);bottom.addColorStop(0,'rgba(12,18,30,0)');bottom.addColorStop(.42,'rgba(12,18,30,.22)');bottom.addColorStop(1,'rgba(8,13,25,.72)');ctx.fillStyle=bottom;ctx.fillRect(0,760,1080,680);
    if(meta.sideShade){const side=ctx.createLinearGradient(0,0,570,0);side.addColorStop(0,'rgba(10,15,28,.52)');side.addColorStop(.76,'rgba(10,15,28,.08)');side.addColorStop(1,'rgba(10,15,28,0)');ctx.fillStyle=side;ctx.fillRect(0,0,620,1440);}

    const layout=meta.layout||{},titleAlign=layout.titleAlign||'center',bodyAlign=layout.bodyAlign||'center';
    const dateText=new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'short'}).format(new Date());
    const pillW=265,pillH=56,pillX=titleAlign==='left'?760:54,pillY=48;
    ctx.save();roundedRectPath(ctx,pillX,pillY,pillW,pillH,28);ctx.fillStyle='rgba(6,16,31,.38)';ctx.fill();ctx.strokeStyle='rgba(255,255,255,.42)';ctx.lineWidth=2;ctx.stroke();ctx.font='600 28px "PingFang SC","Microsoft YaHei",sans-serif';ctx.textBaseline='middle';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.95)';ctx.fillText(`今日问候 · ${dateText}`,pillX+pillW/2,pillY+pillH/2+1);ctx.restore();

    ctx.textBaseline='middle';ctx.textAlign=titleAlign;ctx.font=`900 ${layout.titleSize||148}px "STKaiti","KaiTi","PingFang SC","Microsoft YaHei",sans-serif`;
    outlinedPosterText(ctx,meta.title,layout.titleX??540,layout.titleY??190,meta.titleColor||'#fff',meta.accent||'#ffd36a',22);
    if(meta.subtitle){ctx.save();ctx.textAlign=titleAlign;ctx.font='700 30px Georgia,serif';ctx.letterSpacing='3px';ctx.fillStyle='rgba(255,255,255,.92)';ctx.shadowColor='rgba(0,0,0,.38)';ctx.shadowBlur=8;ctx.fillText(meta.subtitle,layout.titleX??540,(layout.titleY??190)+100);ctx.restore();}

    ctx.textAlign=bodyAlign;ctx.font=`800 ${layout.bodySize||64}px "PingFang SC","Microsoft YaHei",sans-serif`;
    let y=layout.bodyY??1135;const x=layout.bodyX??540;
    for(const line of meta.lines){outlinedPosterText(ctx,line,x,y,'#fffdf7',meta.accent||'#ffd36a',13);y+=(layout.bodySize||64)+34;}
    const ruleWidth=bodyAlign==='left'?320:300,ruleX=bodyAlign==='left'?x:x-ruleWidth/2;
    ctx.fillStyle=meta.accent||'#ffd36a';ctx.fillRect(ruleX,y+15,ruleWidth,5);
    drawSparkle(ctx,bodyAlign==='left'?ruleX+ruleWidth+25:ruleX+ruleWidth+30,y+17,16,'#fff',.96);
    drawSparkle(ctx,bodyAlign==='left'?ruleX+ruleWidth+58:ruleX-28,y-4,8,meta.accent||'#ffd36a',.9);

    ctx.save();ctx.font='500 27px "PingFang SC","Microsoft YaHei",sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.84)';ctx.fillText('愿美好常伴左右 · 把这份祝福送给重要的人',540,1384);ctx.restore();
    return canvas;
  }'''
s=s[:start]+poster+s[end:]

# Export a clear flag for regression tests and future product analytics.
s=s.replace('blessingCount:BLESSING_CARDS.length,standardPictureCount:STANDARD_PICTURE_COUNT};',
            'blessingCount:BLESSING_CARDS.length,standardPictureCount:STANDARD_PICTURE_COUNT,realisticBlessing:true};',1)

GAME.write_text(s,encoding='utf-8')

# Home copy: make the Scheme B promise explicit without changing the navigation model.
idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('<button id="blessingBtn" class="blessing-entry"><span>早安祝福拼图</span><small>拼完生成作品 · 可保存分享</small></button>',
                '<button id="blessingBtn" class="blessing-entry"><span>写实早安祝福</span><small>拼无字美景 · 自动生成精美作品</small></button>',1)
idx=idx.replace('<button id="workBadge" class="work-badge" hidden>祝福作品 <b id="workBadgeCount">0</b>/6</button>',
                '<button id="workBadge" class="work-badge" hidden>写实作品 <b id="workBadgeCount">0</b>/6</button>',1)
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',idx)
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',idx)
INDEX.write_text(idx,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
css += r'''

/* v4.0 Scheme B realistic blessing mode */
.blessing-entry{position:relative;overflow:hidden;border-color:rgba(255,219,130,.75)!important;background:linear-gradient(135deg,rgba(19,83,69,.98),rgba(9,119,132,.94) 48%,rgba(240,142,84,.94))!important;box-shadow:0 10px 26px rgba(1,45,62,.28),inset 0 1px rgba(255,255,255,.34)!important}
.blessing-entry::before{content:'';position:absolute;inset:-55% -20%;background:radial-gradient(circle at 78% 40%,rgba(255,217,136,.52),transparent 25%),radial-gradient(circle at 25% 60%,rgba(255,143,184,.34),transparent 27%);transform:rotate(-8deg);pointer-events:none}
.blessing-entry::after{content:'写实 · 方案B';position:absolute;right:11px;top:9px;padding:3px 8px;border-radius:999px;background:rgba(255,247,218,.94);color:#815221;font-size:9px;font-weight:900;letter-spacing:.4px;box-shadow:0 2px 8px rgba(0,0,0,.16)}
.blessing-entry span,.blessing-entry small{position:relative;z-index:1;text-shadow:0 2px 7px rgba(0,0,0,.38)}
#gameStage[data-mode="blessing"] .board{box-shadow:0 0 0 1px rgba(255,229,166,.35),0 14px 38px rgba(0,31,50,.28)}
#gameStage[data-mode="blessing"] .complete-overlay{filter:saturate(1.07) contrast(1.02)}
'''
CSS.write_text(css,encoding='utf-8')

sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v4.0.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',sw)
SW.write_text(sw,encoding='utf-8')

# Include photographic PNGs in the single-file offline build.
b=STANDALONE.read_text(encoding='utf-8')
old="assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg'))]"
new="assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg')),*((ROOT/'assets'/'blessings-realistic').glob('*.png'))]"
if old not in b: raise SystemExit('standalone asset list not found')
b=b.replace(old,new,1)
b=b.replace("mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else 'image/webp'",
            "mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else ('image/png' if image_path.suffix.lower()=='.png' else 'image/webp')",1)
STANDALONE.write_text(b,encoding='utf-8')

VERSION.write_text('4.0.0\n',encoding='utf-8')
print('patched v4.0 realistic Scheme B blessing mode')
