#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'
INDEX=ROOT/'index.html'
CSS=ROOT/'style.css'
SW=ROOT/'sw.js'
VERSION=ROOT/'VERSION'
STANDALONE=ROOT/'tools'/'build_standalone.py'

s=GAME.read_text(encoding='utf-8')

# Replace only the first six blessing backgrounds. Gameplay receives clean,
# text-free photographs; the share poster adds typography after completion.
cards=[
("assets/blessings/01-lotus-sunrise.svg", "assets/blessings-realistic/01-lotus-sunrise.png",
 "{path:'assets/blessings-realistic/01-lotus-sunrise.png',name:'荷花晨曦',title:'早安',subtitle:'Good morning',lines:['岁岁安康','日日舒心顺遂'],accent:'#ff91b3',titleColor:'#fffdf8',titleX:540,titleY:178,titleSize:150,textX:610,textY:1125,lineSize:68}"),
("assets/blessings/02-trumpet-flower.svg", "assets/blessings-realistic/02-trumpet-flower.png",
 "{path:'assets/blessings-realistic/02-trumpet-flower.png',name:'凌霄花开',title:'早安',subtitle:'Good morning',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffd184',titleColor:'#fffaf0',titleX:290,titleY:188,titleSize:148,textX:540,textY:1125,lineSize:62}"),
("assets/blessings/03-jujube-orchard.svg", "assets/blessings-realistic/03-jujube-orchard.png",
 "{path:'assets/blessings-realistic/03-jujube-orchard.png',name:'枣园丰收',title:'早上好',subtitle:'GOOD MORNING',lines:['喜乐相伴','轻松惬意'],accent:'#ffe174',titleColor:'#fffdf0',titleX:335,titleY:188,titleSize:135,textX:540,textY:1135,lineSize:72}"),
("assets/blessings/04-blessing-vase.svg", "assets/blessings-realistic/04-blessing-vase.png",
 "{path:'assets/blessings-realistic/04-blessing-vase.png',name:'福气花瓶',title:'早上好',subtitle:'GOOD MORNING',lines:['开心快乐','幸福安康'],accent:'#ffc45f',titleColor:'#fff8e8',titleX:760,titleY:176,titleSize:132,textX:540,textY:1132,lineSize:76}"),
("assets/blessings/05-pine-crane.svg", "assets/blessings-realistic/05-pine-crane.png",
 "{path:'assets/blessings-realistic/05-pine-crane.png',name:'松鹤延年',title:'晨安',subtitle:'MORNING PEACE',lines:['福寿绵长','平安喜乐'],accent:'#f3db9a',titleColor:'#fffdf4',titleX:790,titleY:188,titleSize:140,textX:540,textY:1135,lineSize:74}"),
("assets/blessings/06-peony-gold.svg", "assets/blessings-realistic/06-peony-gold.png",
 "{path:'assets/blessings-realistic/06-peony-gold.png',name:'花开富贵',title:'吉祥如意',subtitle:'BEST WISHES',lines:['花开富贵','好运常在'],accent:'#ffd46d',titleColor:'#fff9e9',titleX:650,titleY:178,titleSize:124,textX:540,textY:1130,lineSize:74}"),
]
for old_path,new_path,new_obj in cards:
    # Replace the full matching metadata object so each composition can place
    # typography around its subject instead of using one generic layout.
    pattern=r"\{path:'"+re.escape(old_path)+r"'.*?\}"
    s,n=re.subn(pattern,new_obj,s,count=1)
    if n!=1:
        raise SystemExit(f'blessing metadata not found: {old_path}')

# Scheme-B completion renderer: draw the clean source photo first, then add a
# restrained high-contrast title, English subline, blessing copy and sparkles.
start=s.index('  async function renderBlessingPoster(index){')
end=s.index('\n\n  async function posterBlob',start)
renderer=r'''  async function renderBlessingPoster(index){
    const meta=blessingMeta(index);if(!meta)throw new Error('not a blessing card');
    const img=await loadPosterImage(PICTURE_PATHS[index]);
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;const ctx=canvas.getContext('2d');
    // Cover-fit keeps every generated source usable even if a provider returns a
    // slightly different portrait dimension.
    const scale=Math.max(1080/img.width,1440/img.height),sw=1080/scale,sh=1440/scale;
    const sx=(img.width-sw)/2,sy=(img.height-sh)/2;ctx.drawImage(img,sx,sy,sw,sh,0,0,1080,1440);

    const top=ctx.createLinearGradient(0,0,0,480);top.addColorStop(0,'rgba(8,17,27,.46)');top.addColorStop(.56,'rgba(8,17,27,.12)');top.addColorStop(1,'rgba(8,17,27,0)');ctx.fillStyle=top;ctx.fillRect(0,0,1080,500);
    const bottom=ctx.createLinearGradient(0,780,0,1440);bottom.addColorStop(0,'rgba(8,12,23,0)');bottom.addColorStop(.34,'rgba(8,12,23,.22)');bottom.addColorStop(1,'rgba(8,12,23,.74)');ctx.fillStyle=bottom;ctx.fillRect(0,760,1080,680);
    // A faint warm bloom makes the final piece feel authored rather than merely captioned.
    const glow=ctx.createRadialGradient(540,1160,20,540,1160,520);glow.addColorStop(0,'rgba(255,208,117,.14)');glow.addColorStop(1,'rgba(255,208,117,0)');ctx.fillStyle=glow;ctx.fillRect(0,650,1080,790);

    ctx.textBaseline='middle';ctx.lineJoin='round';ctx.textAlign='center';
    const titleX=meta.titleX??540,titleY=meta.titleY??190,titleSize=meta.titleSize??145;
    ctx.save();ctx.shadowColor='rgba(0,0,0,.48)';ctx.shadowBlur=18;ctx.shadowOffsetY=8;
    ctx.font=`900 ${titleSize}px "STKaiti","KaiTi","PingFang SC","Microsoft YaHei",serif`;
    ctx.lineWidth=Math.max(13,titleSize*.12);ctx.strokeStyle='rgba(25,31,38,.78)';ctx.strokeText(meta.title,titleX,titleY);
    ctx.lineWidth=Math.max(5,titleSize*.045);ctx.strokeStyle='rgba(255,255,255,.92)';ctx.strokeText(meta.title,titleX,titleY);
    ctx.fillStyle=meta.titleColor||'#fff';ctx.fillText(meta.title,titleX,titleY);ctx.restore();

    if(meta.subtitle){
      ctx.save();ctx.textAlign='center';ctx.font='italic 600 43px Georgia,"Times New Roman",serif';ctx.letterSpacing='1px';
      ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=10;ctx.lineWidth=5;ctx.strokeStyle='rgba(18,24,34,.65)';ctx.strokeText(meta.subtitle,titleX,titleY+105);
      ctx.fillStyle='rgba(255,255,255,.96)';ctx.fillText(meta.subtitle,titleX,titleY+105);ctx.restore();
    }

    const textX=meta.textX??540,textY=meta.textY??1130,lineSize=meta.lineSize??68;
    ctx.save();ctx.font=`900 ${lineSize}px "PingFang SC","Microsoft YaHei",sans-serif`;ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=13;ctx.shadowOffsetY=5;
    let y=textY;for(const line of meta.lines){
      ctx.lineWidth=14;ctx.strokeStyle='rgba(40,25,25,.76)';ctx.strokeText(line,textX,y);
      ctx.lineWidth=5;ctx.strokeStyle='rgba(255,244,215,.95)';ctx.strokeText(line,textX,y);
      ctx.fillStyle=meta.accent||'#ffd36a';ctx.fillText(line,textX,y);y+=94;
    }
    ctx.restore();

    function sparkle(x,y,r){
      ctx.save();ctx.translate(x,y);ctx.fillStyle='rgba(255,250,210,.96)';ctx.shadowColor='#ffd76c';ctx.shadowBlur=18;
      ctx.beginPath();ctx.moveTo(0,-r);ctx.quadraticCurveTo(r*.18,-r*.18,r,0);ctx.quadraticCurveTo(r*.18,r*.18,0,r);ctx.quadraticCurveTo(-r*.18,r*.18,-r,0);ctx.quadraticCurveTo(-r*.18,-r*.18,0,-r);ctx.fill();ctx.restore();
    }
    sparkle(835,textY-30,23);sparkle(930,textY+120,14);sparkle(185,textY+85,11);
    ctx.fillStyle=meta.accent||'#ffd36a';ctx.fillRect(390,1320,300,5);
    ctx.font='500 28px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.88)';ctx.fillText('用心拼成的祝福 · 送给重要的人',540,1370);
    return canvas;
  }'''
s=s[:start]+renderer+s[end:]

# Make the mode language explain scheme B clearly.
s=s.replace("if(game.mode==='blessing')return '拼出完整祝福图，完成后可保存或分享给亲友';",
            "if(game.mode==='blessing')return '先拼纯净写实美图，完成后自动生成祝福作品';",1)
s=s.replace("showToast('拼完整后会生成一张可保存、可分享的祝福作品',3300);",
            "showToast('游戏中只拼纯净美图，完成后自动加上祝福文字',3500);",1)
GAME.write_text(s,encoding='utf-8')

idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('<button id="blessingBtn" class="blessing-entry"><span>早安祝福拼图</span><small>拼完生成作品 · 可保存分享</small></button>',
                '<button id="blessingBtn" class="blessing-entry"><span>写实祝福拼图 <b>方案B</b></span><small>拼纯净美图 · 完成后生成祝福作品</small></button>')
idx=idx.replace('<div class="blessing-modal-head"><div><small>拼图生成作品</small><h2>我的祝福卡</h2></div>',
                '<div class="blessing-modal-head"><div><small>纯净底图完成后自动排版</small><h2>我的写实祝福作品</h2></div>')
idx=idx.replace('浏览器支持时会直接调起系统分享；否则自动生成图片供保存。','作品为1080×1440高清图片；浏览器支持时直接调起分享，否则可保存到手机。')
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',idx)
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',idx)
INDEX.write_text(idx,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
if '/* v4.0-scheme-b-photoreal */' not in css:
    css += r'''

/* v4.0-scheme-b-photoreal */
.blessing-entry{
  min-height:78px!important;text-align:left!important;padding:13px 18px 12px 118px!important;
  background-image:linear-gradient(90deg,rgba(5,49,40,.20) 0,rgba(5,49,40,.32) 28%,rgba(5,36,39,.88) 66%,rgba(5,28,39,.96) 100%),url("assets/blessings-realistic/01-lotus-sunrise.png")!important;
  background-size:cover!important;background-position:center 63%!important;border:1px solid rgba(255,224,139,.74)!important;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.22),0 10px 24px rgba(0,43,64,.28)!important;
}
.blessing-entry span,.blessing-entry small{position:relative;z-index:1;text-shadow:0 2px 8px rgba(0,0,0,.72)}
.blessing-entry span{display:block;font-size:18px;font-weight:950;color:#fff7dc}
.blessing-entry span b{display:inline-grid;place-items:center;margin-left:6px;padding:2px 6px;border-radius:8px;background:linear-gradient(180deg,#ffd979,#e69b2e);color:#58350d;font-size:10px;vertical-align:3px;text-shadow:none;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.blessing-entry small{display:block;margin-top:5px;color:rgba(255,255,255,.9);font-size:11px}
.game-stage.is-blessing .level-title span::after{content:' · 写实';font-size:9px;color:#fff2c5}
.blessing-lockup{background:linear-gradient(180deg,rgba(7,13,22,0),rgba(7,13,22,.72))!important;padding-top:28%!important}
.blessing-lockup strong{font-family:"STKaiti","KaiTi","PingFang SC",serif!important;text-shadow:0 3px 0 rgba(51,25,25,.6),0 0 14px rgba(255,226,142,.72)!important}
.blessing-preview-shell{background:#171d22!important;box-shadow:0 14px 34px rgba(0,0,0,.28)!important}
.blessing-preview-shell img{image-rendering:auto}
'''
CSS.write_text(css,encoding='utf-8')

builder=STANDALONE.read_text(encoding='utf-8')
old="assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg'))]"
new="assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg')),*((ROOT/'assets'/'blessings-realistic').glob('*.png'))]"
if old not in builder:raise SystemExit('standalone assets marker missing')
builder=builder.replace(old,new,1)
builder=builder.replace("mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else 'image/webp'",
                        "mime={'svg':'image/svg+xml','png':'image/png','webp':'image/webp'}.get(image_path.suffix.lower().lstrip('.'),'application/octet-stream')",1)
STANDALONE.write_text(builder,encoding='utf-8')

sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v4.0.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',sw)
SW.write_text(sw,encoding='utf-8')
VERSION.write_text('4.0.0\n',encoding='utf-8')
print('patched v4.0 scheme B photorealistic blessings')
