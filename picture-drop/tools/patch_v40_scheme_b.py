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

replacements={
"    {path:'assets/blessings/01-lotus-sunrise.svg',name:'荷花晨曦',title:'早安',lines:['岁岁安康','日日舒心顺遂'],accent:'#ff7da8',titleColor:'#fff8f4'},":
"    {path:'assets/blessings-realistic/01-lotus-sunrise.png',name:'晨湖荷韵',title:'早安',english:'Good morning',lines:['岁岁安康','日日舒心顺遂'],accent:'#ffd36f',titleColor:'#fffdf6',layout:{titleX:540,titleY:170,bodyX:540,bodyY:1115}},",
"    {path:'assets/blessings/02-trumpet-flower.svg',name:'凌霄花开',title:'早安',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffcc72',titleColor:'#fff7df'},":
"    {path:'assets/blessings-realistic/02-trumpet-flower.png',name:'晨光凌霄',title:'早安',english:'Good morning',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffd67d',titleColor:'#fffaf0',layout:{titleX:275,titleY:190,bodyX:540,bodyY:1125}},",
"    {path:'assets/blessings/03-jujube-orchard.svg',name:'枣园丰收',title:'早上好',lines:['喜乐相伴','轻松惬意'],accent:'#f5dd62',titleColor:'#fffef2'},":
"    {path:'assets/blessings-realistic/03-jujube-orchard.png',name:'晨露枣园',title:'早上好',english:'Good morning',lines:['喜乐相伴','轻松惬意'],accent:'#f8df68',titleColor:'#fffef4',layout:{titleX:540,titleY:155,bodyX:540,bodyY:1135}},",
"    {path:'assets/blessings/04-blessing-vase.svg',name:'福气花瓶',title:'早上好',lines:['开心快乐','幸福安康'],accent:'#ffcc72',titleColor:'#fff8ec'},":
"    {path:'assets/blessings-realistic/04-elegant-woman.png',name:'花间雅韵',title:'晨安',english:'Good morning',lines:['清晨的平安是祝福','愿你每天从容欢喜'],accent:'#ffd4df',titleColor:'#fffdfb',layout:{titleX:805,titleY:175,bodyX:540,bodyY:1150}},",
"    {path:'assets/blessings/05-pine-crane.svg',name:'松鹤延年',title:'晨安',lines:['福寿绵长','平安喜乐'],accent:'#f2dc9a',titleColor:'#fffdf4'},":
"    {path:'assets/blessings-realistic/05-blessing-vase.png',name:'幸福花瓶',title:'早上好',english:'Good morning',lines:['开心快乐','幸福安康'],accent:'#ffd18a',titleColor:'#fffaf0',layout:{titleX:280,titleY:185,bodyX:280,bodyY:1130}},",
"    {path:'assets/blessings/06-peony-gold.svg',name:'花开富贵',title:'吉祥如意',lines:['花开富贵','好运常在'],accent:'#ffd06b',titleColor:'#fff8e7'},":
"    {path:'assets/blessings-realistic/06-pine-crane.png',name:'松鹤晨光',title:'晨安',english:'Morning blessing',lines:['福寿绵长','平安喜乐'],accent:'#f4d38a',titleColor:'#fffdf4',layout:{titleX:795,titleY:170,bodyX:540,bodyY:1170}},",
}
for old,new in replacements.items():
    if old not in s:
        raise SystemExit(f'metadata marker missing: {old[:70]}')
    s=s.replace(old,new,1)

marker="  const BLESSING_INDICES=BLESSING_CARDS.map((_,i)=>BLESSING_START+i);\n"
if marker not in s: raise SystemExit('blessing indices marker missing')
s=s.replace(marker,marker+"  const REALISTIC_BLESSING_COUNT=6;\n  function isRealisticBlessingIndex(index){return Number.isInteger(index)&&index>=BLESSING_START&&index<BLESSING_START+REALISTIC_BLESSING_COUNT;}\n",1)

s=s.replace("    if(game.mode==='blessing')return '拼出完整祝福图，完成后可保存或分享给亲友';",
            "    if(game.mode==='blessing')return '先拼无字写实美图，完成后自动生成带祝福语的精美作品';",1)
s=s.replace("stage?.classList.toggle('is-hard',hard);stage?.classList.toggle('is-blessing',game.mode==='blessing');",
            "stage?.classList.toggle('is-hard',hard);stage?.classList.toggle('is-blessing',game.mode==='blessing');stage?.classList.toggle('is-realistic-blessing',game.mode==='blessing'&&game.selectedImages.some(isRealisticBlessingIndex));",1)
s=s.replace("titleLabel.textContent=game.mode==='blessing'?'祝福':(hard?'困难':'关卡');",
            "titleLabel.textContent=game.mode==='blessing'?'写实祝福':(hard?'困难':'关卡');",1)
s=s.replace("showToast('拼完整后会生成一张可保存、可分享的祝福作品',3300);",
            "showToast('先拼无字写实美图，完成后自动生成可保存、可分享的祝福作品',3600);",1)

poster_match=re.search(r"  async function renderBlessingPoster\(index\)\{.*?\n  \}\n\n  async function posterBlob",s,re.S)
if not poster_match: raise SystemExit('poster function block missing')
new_poster=r'''  function roundedRectPath(ctx,x,y,w,h,r){
    const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
  }

  function drawPosterSpark(ctx,x,y,r,color){
    ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,-r);ctx.lineTo(r*.24,-r*.24);ctx.lineTo(r,0);ctx.lineTo(r*.24,r*.24);ctx.lineTo(0,r);ctx.lineTo(-r*.24,r*.24);ctx.lineTo(-r,0);ctx.lineTo(-r*.24,-r*.24);ctx.closePath();ctx.fill();ctx.restore();
  }

  async function renderBlessingPoster(index){
    const meta=blessingMeta(index);if(!meta)throw new Error('not a blessing card');
    const img=await loadPosterImage(PICTURE_PATHS[index]);
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;const ctx=canvas.getContext('2d');
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(img,0,0,1080,1440);

    const top=ctx.createLinearGradient(0,0,0,430);top.addColorStop(0,'rgba(18,16,24,.48)');top.addColorStop(.62,'rgba(20,17,28,.12)');top.addColorStop(1,'rgba(20,17,28,0)');ctx.fillStyle=top;ctx.fillRect(0,0,1080,460);
    const bottom=ctx.createLinearGradient(0,865,0,1440);bottom.addColorStop(0,'rgba(18,14,21,0)');bottom.addColorStop(.30,'rgba(18,14,21,.22)');bottom.addColorStop(.66,'rgba(18,14,21,.62)');bottom.addColorStop(1,'rgba(10,10,18,.82)');ctx.fillStyle=bottom;ctx.fillRect(0,820,1080,620);
    const vignette=ctx.createRadialGradient(540,650,360,540,650,900);vignette.addColorStop(.62,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(0,0,0,.20)');ctx.fillStyle=vignette;ctx.fillRect(0,0,1080,1440);

    ctx.strokeStyle='rgba(255,239,190,.72)';ctx.lineWidth=4;ctx.strokeRect(22,22,1036,1396);
    ctx.strokeStyle='rgba(255,255,255,.34)';ctx.lineWidth=1.5;ctx.strokeRect(34,34,1012,1372);

    const layout={titleX:540,titleY:180,bodyX:540,bodyY:1140,...(meta.layout||{})};
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';
    ctx.save();ctx.shadowColor='rgba(255,191,92,.60)';ctx.shadowBlur=26;ctx.shadowOffsetY=6;
    ctx.font='900 150px "STKaiti","KaiTi","Songti SC","PingFang SC",serif';ctx.strokeStyle='rgba(42,27,29,.82)';ctx.lineWidth=22;ctx.strokeText(meta.title,layout.titleX,layout.titleY);ctx.fillStyle=meta.titleColor||'#fffdf5';ctx.fillText(meta.title,layout.titleX,layout.titleY);ctx.restore();

    const english=meta.english||(/[早晨]/.test(meta.title)?'Good morning':'Best wishes');
    ctx.save();ctx.textAlign='center';ctx.font='italic 52px Georgia,"Times New Roman",serif';ctx.shadowColor='rgba(0,0,0,.50)';ctx.shadowBlur=12;ctx.lineWidth=7;ctx.strokeStyle='rgba(38,27,31,.64)';ctx.strokeText(english,layout.titleX,layout.titleY+105);ctx.fillStyle='rgba(255,250,235,.96)';ctx.fillText(english,layout.titleX,layout.titleY+105);ctx.restore();
    drawPosterSpark(ctx,layout.titleX+220,layout.titleY-48,18,'rgba(255,232,157,.96)');
    drawPosterSpark(ctx,layout.titleX-220,layout.titleY+36,11,'rgba(255,255,255,.90)');

    const panelX=Math.max(70,Math.min(150,layout.bodyX-430)),panelY=layout.bodyY-82,panelW=860,panelH=238;
    const panel=ctx.createLinearGradient(panelX,panelY,panelX+panelW,panelY+panelH);panel.addColorStop(0,'rgba(57,24,25,.58)');panel.addColorStop(.52,'rgba(84,34,28,.38)');panel.addColorStop(1,'rgba(27,22,31,.62)');roundedRectPath(ctx,panelX,panelY,panelW,panelH,34);ctx.fillStyle=panel;ctx.fill();ctx.strokeStyle='rgba(255,225,151,.48)';ctx.lineWidth=2;ctx.stroke();

    ctx.save();ctx.textAlign='center';ctx.font='800 66px "STKaiti","KaiTi","Songti SC","PingFang SC",serif';ctx.lineWidth=12;ctx.strokeStyle='rgba(56,24,25,.90)';ctx.fillStyle='#fff8e9';ctx.shadowColor='rgba(255,180,83,.42)';ctx.shadowBlur=12;
    let y=layout.bodyY;for(const line of meta.lines){ctx.strokeText(line,layout.bodyX,y);ctx.fillText(line,layout.bodyX,y);y+=88;}ctx.restore();
    ctx.fillStyle=meta.accent||'#ffd36f';ctx.fillRect(layout.bodyX-155,layout.bodyY+145,310,5);drawPosterSpark(ctx,layout.bodyX+184,layout.bodyY+147,13,'rgba(255,245,200,.95)');

    ctx.font='500 29px "PingFang SC","Microsoft YaHei",sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.90)';ctx.fillText('亲手拼出的祝福 · 送给重要的人',540,1370);
    return canvas;
  }

  async function posterBlob'''
s=s[:poster_match.start()]+new_poster+s[poster_match.end():]

export_marker='pictureCount:PICTURE_PATHS.length'
if export_marker not in s: raise SystemExit('export marker missing')
s=s.replace(export_marker,export_marker+',realisticBlessingCount:REALISTIC_BLESSING_COUNT,isRealisticBlessingIndex',1)

GAME.write_text(s,encoding='utf-8')

idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('<button id="blessingBtn" class="blessing-entry"><span>早安祝福拼图</span><small>拼完生成作品 · 可保存分享</small></button>',
'''<button id="blessingBtn" class="blessing-entry"><span>写实祝福拼图 <b>方案B</b></span><small>先拼无字美图 · 完成自动生成祝福作品</small></button>''')
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',idx)
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',idx)
INDEX.write_text(idx,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
if '/* v4.0-realistic-blessing-scheme-b */' not in css:
    css += r'''

/* v4.0-realistic-blessing-scheme-b */
.blessing-entry{position:relative;overflow:hidden;min-height:78px!important;padding:14px 17px!important;text-align:left!important;background-image:linear-gradient(90deg,rgba(7,51,45,.94) 0%,rgba(9,62,53,.78) 52%,rgba(9,52,48,.28) 100%),url("assets/blessings-realistic/01-lotus-sunrise.png")!important;background-size:cover!important;background-position:center 61%!important;border:1px solid rgba(255,225,151,.64)!important;box-shadow:0 9px 24px rgba(0,45,46,.24),inset 0 0 0 1px rgba(255,255,255,.12)!important}
.blessing-entry::after{content:'NEW';position:absolute;right:12px;top:10px;padding:3px 7px;border-radius:999px;background:linear-gradient(135deg,#ffdf75,#ff9e42);color:#563000;font-size:9px;font-weight:1000;letter-spacing:.5px;box-shadow:0 3px 9px rgba(58,31,0,.24)}
.blessing-entry span{position:relative;z-index:1;color:#fff9e8!important;text-shadow:0 2px 7px rgba(0,0,0,.42)}
.blessing-entry span b{display:inline-block;margin-left:5px;padding:2px 7px;border-radius:999px;background:rgba(255,218,114,.94);color:#613b00;font-size:10px;vertical-align:2px;text-shadow:none}
.blessing-entry small{position:relative;z-index:1;color:rgba(255,255,255,.86)!important;text-shadow:0 1px 5px rgba(0,0,0,.55)}
.game-stage.is-realistic-blessing .topbar{background:linear-gradient(180deg,rgba(10,66,58,.98),rgba(8,91,77,.90))}
.game-stage.is-realistic-blessing .level-title span{font-size:10px;letter-spacing:.5px}
.game-stage.is-realistic-blessing .board-wrap{box-shadow:0 16px 40px rgba(0,35,31,.34),0 0 0 1px rgba(255,229,160,.32)}
.game-stage.is-realistic-blessing .blessing-lockup{left:5%!important;right:5%!important;bottom:5%!important;padding:8px 10px 9px!important;border-radius:13px!important;background:linear-gradient(180deg,rgba(42,19,22,.18),rgba(42,19,22,.72))!important;border:1px solid rgba(255,223,148,.45);box-shadow:0 6px 18px rgba(0,0,0,.22)}
.game-stage.is-realistic-blessing .blessing-lockup strong{font-family:"STKaiti","KaiTi","Songti SC",serif!important;font-size:clamp(20px,6vw,30px)!important;color:#fffaf0!important;text-shadow:0 2px 0 rgba(80,31,25,.85),0 0 12px rgba(255,200,108,.60)!important}
.game-stage.is-realistic-blessing .blessing-lockup span{font-family:"STKaiti","KaiTi","Songti SC",serif!important;font-size:clamp(10px,3vw,14px)!important;color:#fff5dc!important;text-shadow:0 1px 5px rgba(0,0,0,.75)!important}
.blessing-preview-shell{background:linear-gradient(145deg,#f8edda,#ead7b5)!important}
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
if old not in b: raise SystemExit('standalone asset list marker missing')
b=b.replace(old,new,1)
b=b.replace("mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else 'image/webp'",
            "mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else ('image/png' if image_path.suffix.lower()=='.png' else 'image/webp')",1)
STANDALONE.write_text(b,encoding='utf-8')

VERSION.write_text('4.0.0\n',encoding='utf-8')
print('patched v4.0 realistic blessing scheme B')
