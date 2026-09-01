#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; INDEX=ROOT/'index.html'; CSS=ROOT/'style.css'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'
s=GAME.read_text(encoding='utf-8')

# Replace the illustrated blessing pool with six photographic, text-free Scheme-B bases.
cards=r'''  const BLESSING_CARDS=[
    {path:'assets/blessings-real/01-lotus-sunrise.png',name:'荷塘晨光',title:'早安',subtitle:'GOOD MORNING',lines:['岁岁安康','日日舒心顺遂'],accent:'#ffd66b',titleColor:'#fffaf0',layout:'center',seal:'安'},
    {path:'assets/blessings-real/02-trumpet-flower.png',name:'凌霄晨露',title:'早安',subtitle:'A BEAUTIFUL DAY',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffd27b',titleColor:'#fff8e7',layout:'left',seal:'喜'},
    {path:'assets/blessings-real/03-jujube-orchard.png',name:'枣园丰收',title:'早上好',subtitle:'GOOD MORNING',lines:['喜乐相伴','轻松惬意'],accent:'#ffe074',titleColor:'#fffdf2',layout:'center',seal:'福'},
    {path:'assets/blessings-real/04-elegant-woman.png',name:'花间雅韵',title:'晨安',subtitle:'MORNING WISHES',lines:['清晨的问候是牵挂','愿你平安喜乐常相伴'],accent:'#f7c9da',titleColor:'#fff7fb',layout:'left',seal:'悦'},
    {path:'assets/blessings-real/05-blessing-vase.png',name:'福气花瓶',title:'早上好',subtitle:'HAPPINESS & HEALTH',lines:['开心快乐','幸福安康'],accent:'#ffd276',titleColor:'#fffaf0',layout:'center',seal:'福'},
    {path:'assets/blessings-real/06-pine-crane.png',name:'松鹤延年',title:'晨安',subtitle:'PEACE & LONGEVITY',lines:['福寿绵长','平安喜乐'],accent:'#f6dc91',titleColor:'#fffdf4',layout:'center',seal:'寿'}
  ];'''
pattern=re.compile(r"  const BLESSING_CARDS=\[.*?\n  \];",re.S)
if not pattern.search(s): raise SystemExit('BLESSING_CARDS block not found')
s=pattern.sub(cards,s,count=1)

# Remove obsolete illustrated indices from old local saves and always open this six-image showcase at round 1.
s=s.replace("blessings: Array.isArray(parsed.blessings) ? parsed.blessings.filter(Number.isInteger) : [],",
            "blessings: Array.isArray(parsed.blessings) ? parsed.blessings.filter(index=>Number.isInteger(index)&&isBlessingIndex(index)) : [],",1)
s=s.replace("dom.blessingBtn.addEventListener('click',()=>{audio.tap();game.mode='blessing';startLevel(save.blessingLevel||1);});",
            "dom.blessingBtn.addEventListener('click',()=>{audio.tap();game.mode='blessing';startLevel(1);});",1)
s=s.replace("if(game.mode==='blessing')return '拼出完整祝福图，完成后可保存或分享给亲友';",
            "if(game.mode==='blessing')return '先拼纯净写实美景，完成后自动生成祝福作品';",1)
s=s.replace("if(game.mode==='blessing'){dom.tutorialHand.classList.remove('is-visible');showToast('拼完整后会生成一张可保存、可分享的祝福作品',3300);}",
            "if(game.mode==='blessing'){dom.tutorialHand.classList.remove('is-visible');showToast('游戏里拼无字美景；完成后再自动排版成祝福海报',3600);}",1)

# Premium poster compositor for photographic bases. Text is added only after the puzzle is complete.
start=s.index('  async function renderBlessingPoster(index){')
end=s.index('\n  async function posterBlob(index)',start)
poster=r'''  async function renderBlessingPoster(index){
    const meta=blessingMeta(index);if(!meta)throw new Error('not a blessing card');
    const img=await loadPosterImage(PICTURE_PATHS[index]);
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;
    canvas.dataset.scheme='B';canvas.dataset.source='photorealistic';canvas.dataset.title=meta.title;
    const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    ctx.drawImage(img,0,0,1080,1440);

    // Preserve the photograph while reserving readable, cinematic text zones.
    const top=ctx.createLinearGradient(0,0,0,500);top.addColorStop(0,'rgba(8,16,31,.54)');top.addColorStop(.52,'rgba(8,16,31,.16)');top.addColorStop(1,'rgba(8,16,31,0)');ctx.fillStyle=top;ctx.fillRect(0,0,1080,520);
    const bottom=ctx.createLinearGradient(0,790,0,1440);bottom.addColorStop(0,'rgba(10,15,27,0)');bottom.addColorStop(.40,'rgba(10,15,27,.20)');bottom.addColorStop(1,'rgba(10,15,27,.76)');ctx.fillStyle=bottom;ctx.fillRect(0,760,1080,680);
    const glow=ctx.createRadialGradient(540,310,40,540,310,580);glow.addColorStop(0,'rgba(255,237,188,.13)');glow.addColorStop(1,'rgba(255,237,188,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,1080,720);

    ctx.save();ctx.strokeStyle='rgba(255,248,220,.46)';ctx.lineWidth=3;ctx.strokeRect(24,24,1032,1392);ctx.restore();
    const left=meta.layout==='left',tx=left?88:540;ctx.textAlign=left?'left':'center';ctx.textBaseline='middle';ctx.lineJoin='round';
    const dateText=new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'long'}).format(new Date());
    ctx.font='600 30px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.88)';ctx.fillText(dateText,tx,72);

    ctx.save();ctx.shadowColor='rgba(0,0,0,.42)';ctx.shadowBlur=18;ctx.shadowOffsetY=6;
    ctx.font=`900 ${meta.title.length>=4?126:158}px "STKaiti","KaiTi","FZKai-Z03","PingFang SC",serif`;
    ctx.strokeStyle='rgba(33,25,29,.72)';ctx.lineWidth=18;ctx.strokeText(meta.title,tx,205);ctx.fillStyle=meta.titleColor;ctx.fillText(meta.title,tx,205);ctx.restore();
    ctx.font='600 28px Georgia,"Times New Roman",serif';ctx.letterSpacing='4px';ctx.fillStyle='rgba(255,247,221,.92)';ctx.fillText(meta.subtitle||'GOOD MORNING',tx,306);

    // Small hand-stamped seal makes the result feel like a finished greeting artwork.
    const sealX=left?tx+22:930,sealY=365;ctx.save();ctx.translate(sealX,sealY);ctx.rotate(-.07);ctx.fillStyle='rgba(177,36,35,.90)';ctx.fillRect(-31,-31,62,62);ctx.strokeStyle='rgba(255,229,184,.92)';ctx.lineWidth=3;ctx.strokeRect(-25,-25,50,50);ctx.font='700 34px "STKaiti","KaiTi",serif';ctx.textAlign='center';ctx.fillStyle='#ffeac0';ctx.fillText(meta.seal||'福',0,3);ctx.restore();

    ctx.textAlign=left?'left':'center';ctx.save();ctx.shadowColor='rgba(0,0,0,.48)';ctx.shadowBlur=14;ctx.shadowOffsetY=4;
    ctx.font='800 64px "STKaiti","KaiTi","PingFang SC",serif';ctx.lineWidth=12;ctx.strokeStyle='rgba(24,20,30,.72)';ctx.fillStyle='#fffaf0';
    let y=1120;for(const line of meta.lines){ctx.strokeText(line,tx,y);ctx.fillText(line,tx,y);y+=94;}ctx.restore();

    // Gold divider and understated source line—shareable, but not a heavy watermark.
    const lineLeft=left?tx:390;ctx.fillStyle=meta.accent;ctx.fillRect(lineLeft,1310,left?280:300,5);
    ctx.font='500 27px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.90)';ctx.fillText('拼出美好 · 分享祝福',tx,1362);

    // A few restrained star glints add finish without covering the photograph.
    const stars=left?[[870,170,18],[955,1040,12],[815,1240,9]]:[[900,330,15],[176,1040,10],[930,1245,9]];
    ctx.save();ctx.fillStyle='rgba(255,248,199,.92)';for(const [x,y,r] of stars){ctx.beginPath();ctx.moveTo(x,y-r);ctx.lineTo(x+r*.25,y-r*.25);ctx.lineTo(x+r,y);ctx.lineTo(x+r*.25,y+r*.25);ctx.lineTo(x,y+r);ctx.lineTo(x-r*.25,y+r*.25);ctx.lineTo(x-r,y);ctx.lineTo(x-r*.25,y-r*.25);ctx.closePath();ctx.fill();}ctx.restore();
    return canvas;
  }'''
s=s[:start]+poster+s[end:]

# Export scheme markers for browser regression tests.
export_old='blessingCount:BLESSING_CARDS.length,standardPictureCount:STANDARD_PICTURE_COUNT}'
export_new="blessingCount:BLESSING_CARDS.length,standardPictureCount:STANDARD_PICTURE_COUNT,blessingScheme:'B-photorealistic'}"
if export_old in s:s=s.replace(export_old,export_new,1)
elif "blessingScheme:'B-photorealistic'" not in s:raise SystemExit('debug export marker not found')
GAME.write_text(s,encoding='utf-8')

idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('<button id="blessingBtn" class="blessing-entry"><span>早安祝福拼图</span><small>拼完生成作品 · 可保存分享</small></button>',
'''<button id="blessingBtn" class="blessing-entry"><span><b>方案B · 写实</b>写实祝福拼图</span><small>纯净美景入局 · 完成后生成精美祝福海报</small></button>''',1)
idx=idx.replace('<div class="blessing-modal-head"><div><small>拼图生成作品</small><h2>我的祝福卡</h2></div>',
                '<div class="blessing-modal-head"><div><small>方案B · 写实美景生成</small><h2>我的祝福作品</h2></div>',1)
idx=idx.replace('浏览器支持时会直接调起系统分享；否则自动生成图片供保存。','游戏中拼的是无字写实底图；作品页会自动叠加日期与祝福文案。',1)
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',idx)
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',idx)
INDEX.write_text(idx,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
css+=r'''

/* v4.0-photorealistic-blessing-scheme-b */
#blessingBtn.blessing-entry{position:relative;isolation:isolate;overflow:hidden;min-height:86px;padding:15px 18px;border:1px solid rgba(255,226,157,.82);background:linear-gradient(90deg,rgba(7,45,38,.82),rgba(9,70,61,.46)),url("assets/blessings-real/01-lotus-sunrise.png") center 61%/cover no-repeat;box-shadow:0 12px 28px rgba(0,45,60,.23),inset 0 0 0 1px rgba(255,255,255,.18)}
#blessingBtn.blessing-entry::after{content:'✦';position:absolute;right:16px;top:14px;color:#ffe39a;font-size:21px;text-shadow:0 0 14px rgba(255,218,115,.9);z-index:-1}
#blessingBtn.blessing-entry span,#blessingBtn.blessing-entry small{position:relative;color:#fff;text-shadow:0 2px 8px rgba(0,25,29,.72)}
#blessingBtn.blessing-entry span{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:900}
#blessingBtn.blessing-entry span b{display:inline-flex;padding:3px 7px;border-radius:999px;background:linear-gradient(135deg,#ffce6c,#fff0ae);color:#71440d;font-size:10px;letter-spacing:.4px;text-shadow:none;box-shadow:0 2px 7px rgba(71,39,0,.22)}
#blessingBtn.blessing-entry small{display:block;margin-top:5px;font-size:11px;font-weight:700;opacity:.96}
.game-stage.is-blessing .level-title span::after{content:' · 写实';font-size:9px;margin-left:3px;color:#ffe8a2}
.game-stage.is-blessing .work-badge{background:linear-gradient(135deg,rgba(11,86,68,.94),rgba(189,124,27,.94));border-color:rgba(255,225,154,.75)}
.game-stage.is-blessing .blessing-lockup strong{font-family:"STKaiti","KaiTi","PingFang SC",serif;letter-spacing:2px}
.blessing-preview-shell{background:linear-gradient(145deg,#f8eddb,#d9c3a3);box-shadow:inset 0 0 0 1px rgba(255,255,255,.72),0 12px 34px rgba(35,25,12,.22)}
.blessing-preview-shell img{box-shadow:0 8px 24px rgba(24,18,10,.22)}
'''
CSS.write_text(css,encoding='utf-8')

sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v4.0.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',sw)
SW.write_text(sw,encoding='utf-8')

b=STANDALONE.read_text(encoding='utf-8')
b=b.replace("*((ROOT/'assets'/'blessings').glob('*.svg'))]","*((ROOT/'assets'/'blessings').glob('*.svg')),*((ROOT/'assets'/'blessings-real').glob('*.png'))]",1)
b=b.replace("mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else 'image/webp'",
            "mime={'.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'}[image_path.suffix.lower()]",1)
STANDALONE.write_text(b,encoding='utf-8')
VERSION.write_text('4.0.0\n',encoding='utf-8')
print('patched v4.0 photorealistic blessing Scheme B')
