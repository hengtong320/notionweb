from __future__ import annotations

from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import math
import random
from pathlib import Path
import numpy as np

OUT = Path(__file__).resolve().parents[1] / 'assets' / 'pictures'
OUT.mkdir(parents=True, exist_ok=True)
S = 512


def rgb(hexstr: str):
    h = hexstr.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def gradient(c1, c2, vertical=True):
    c1 = np.array(c1, dtype=float)
    c2 = np.array(c2, dtype=float)
    if vertical:
        t = np.linspace(0, 1, S)[:, None, None]
        arr = c1[None, None, :] * (1-t) + c2[None, None, :] * t
        arr = np.repeat(arr, S, axis=1)
    else:
        t = np.linspace(0, 1, S)[None, :, None]
        arr = c1[None, None, :] * (1-t) + c2[None, None, :] * t
        arr = np.repeat(arr, S, axis=0)
    return Image.fromarray(np.uint8(arr.clip(0,255)), 'RGB')


def add_grain(img, amount=8, seed=0):
    rng = np.random.default_rng(seed)
    arr = np.asarray(img).astype(np.int16)
    noise = rng.normal(0, amount, arr.shape[:2])[:, :, None]
    arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(arr, 'RGB')


def vignette(img, strength=.30):
    y, x = np.ogrid[-1:1:S*1j, -1:1:S*1j]
    r = np.sqrt(x*x + y*y)
    mask = np.clip(1 - strength*np.maximum(r-.15,0), .55, 1)
    arr = np.asarray(img).astype(np.float32)
    arr *= mask[:, :, None]
    return Image.fromarray(np.uint8(np.clip(arr,0,255)), 'RGB')


def finish(img, seed, sat=1.12, contrast=1.08):
    img = ImageEnhance.Color(img).enhance(sat)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = add_grain(img, 4.8, seed)
    return vignette(img, .22)


def poly(draw, pts, fill, outline=None, width=1):
    draw.polygon(pts, fill=fill)
    if outline:
        draw.line(pts+[pts[0]], fill=outline, width=width, joint='curve')


def bokeh(img, rng, colors, n=20, maxr=55, alpha=80):
    layer = Image.new('RGBA', (S,S), (0,0,0,0)); d=ImageDraw.Draw(layer)
    for _ in range(n):
        r=rng.randint(10,maxr); x=rng.randint(-r,S+r); y=rng.randint(-r,S+r)
        c=rng.choice(colors)
        d.ellipse((x-r,y-r,x+r,y+r), fill=(*c, rng.randint(alpha//3,alpha)))
    layer=layer.filter(ImageFilter.GaussianBlur(12))
    return Image.alpha_composite(img.convert('RGBA'), layer).convert('RGB')


def scene_alpine(seed=1):
    rng=random.Random(seed); img=gradient(rgb('#8fd7ff'), rgb('#ffd2a3')); d=ImageDraw.Draw(img)
    # sun
    d.ellipse((360,55,455,150), fill=rgb('#fff1b0'))
    # mountains
    poly(d, [(0,280),(120,105),(235,280)], rgb('#5e7890'))
    poly(d, [(110,285),(285,70),(430,285)], rgb('#7891a2'))
    poly(d, [(290,285),(410,130),(512,285)], rgb('#526e82'))
    poly(d, [(205,180),(285,70),(340,180)], rgb('#f4f2ef'))
    poly(d, [(65,200),(120,105),(165,205)], rgb('#eff6f8'))
    # lake reflection
    d.rectangle((0,280,S,S), fill=rgb('#2f9cc8'))
    for y in range(300,500,18):
        d.line((0,y,S,y+rng.randint(-4,4)), fill=rgb('#89def0'), width=rng.randint(2,5))
    # foreground pines
    for x in [30,72,442,480]:
        h=rng.randint(130,220); base=500
        d.rectangle((x-4,base-h//2,x+4,base), fill=rgb('#45372e'))
        for j in range(7):
            yy=base-h+j*h/8; w=(j+2)*8
            poly(d, [(x,yy-35),(x-w,yy+20),(x+w,yy+20)], rgb('#174f43'))
    return finish(img, seed)


def scene_alley(seed=2):
    rng=random.Random(seed); img=gradient(rgb('#8bd9ed'), rgb('#f7d7b2')); d=ImageDraw.Draw(img)
    d.rectangle((0,0,165,S), fill=rgb('#f7f2e7')); d.rectangle((350,0,S,S), fill=rgb('#faf5e7'))
    # buildings blue accents
    for side in [0,1]:
        x0=25 if side==0 else 388
        for y in [55,175,300]:
            d.rounded_rectangle((x0,y,x0+82,y+105), 8, fill=rgb('#287fb3'), outline=rgb('#135b84'), width=4)
            d.rectangle((x0+12,y+12,x0+70,y+92), fill=rgb('#bce7f7'))
    # perspective path
    poly(d, [(165,512),(350,512),(292,230),(220,230)], rgb('#d8cfbd'))
    for y in range(270,500,45):
        w=(y-230)*.28
        d.line((256-w,y,256+w,y), fill=rgb('#998e7e'), width=5)
    # flowers
    for _ in range(38):
        x=rng.choice([rng.randint(105,180), rng.randint(330,407)]); y=rng.randint(90,440); r=rng.randint(4,10)
        d.ellipse((x-r,y-r,x+r,y+r), fill=rng.choice([rgb('#e9486c'),rgb('#ffb232'),rgb('#914fc9'),rgb('#f66855')]))
    d.ellipse((235,215,277,255), fill=rgb('#ffffff'))
    return finish(img, seed,1.18,1.06)


def scene_dog(seed=3):
    rng=random.Random(seed); img=gradient(rgb('#72c5dd'), rgb('#d2e4ae')); img=bokeh(img,rng,[rgb('#ffffff'),rgb('#b5e97e'),rgb('#6dc2e9')],18,60,100); d=ImageDraw.Draw(img)
    # shoulders/head
    d.ellipse((112,235,400,530), fill=rgb('#d99036'))
    d.ellipse((120,75,398,380), fill=rgb('#e2a64a'))
    # ears
    d.ellipse((70,105,185,345), fill=rgb('#9e5e2b')); d.ellipse((330,105,445,345), fill=rgb('#9e5e2b'))
    # muzzle
    d.ellipse((178,210,340,350), fill=rgb('#f2d095'))
    d.ellipse((222,190,292,250), fill=rgb('#47302a'))
    # eyes
    for x in [193,315]:
        d.ellipse((x-18,170,x+18,206), fill=rgb('#2d211d')); d.ellipse((x-8,175,x+1,184), fill='white')
    d.arc((205,250,315,335), 8,172, fill=rgb('#5f372c'), width=7)
    d.polygon([(255,306),(230,365),(281,365)], fill=rgb('#e76e7c'))
    return finish(img,seed,1.12,1.05)


def scene_cat(seed=4):
    rng=random.Random(seed); img=gradient(rgb('#dfb6ff'), rgb('#7fcde4')); img=bokeh(img,rng,[rgb('#ffffff'),rgb('#ffd6f6'),rgb('#9d8fff')],22,46,90); d=ImageDraw.Draw(img)
    d.ellipse((120,120,405,460), fill=rgb('#f4f2ed'))
    poly(d,[(145,165),(155,55),(235,145)],rgb('#e9e6df')); poly(d,[(300,145),(384,55),(382,190)],rgb('#e9e6df'))
    for x in [205,320]:
        d.ellipse((x-28,205,x+28,255),fill=rgb('#59b88c')); d.ellipse((x-7,208,x+7,252), fill=rgb('#1a2925')); d.ellipse((x-15,210,x-3,222),fill='white')
    d.polygon([(265,265),(240,290),(290,290)], fill=rgb('#e68d9b'))
    d.arc((188,278,265,345), 310,95, fill=rgb('#4c4b4b'), width=5); d.arc((265,278,342,345), 85,230, fill=rgb('#4c4b4b'), width=5)
    for yy in [285,305,325]:
        d.line((145,yy,230,300),fill=rgb('#5f5e5e'),width=3); d.line((300,300,410,yy),fill=rgb('#5f5e5e'),width=3)
    return finish(img,seed,1.06,1.08)


def scene_roses(seed=5):
    rng=random.Random(seed); img=gradient(rgb('#2a0d28'), rgb('#6e1734')); img=bokeh(img,rng,[rgb('#ff5572'),rgb('#ffb645'),rgb('#ffffff')],18,35,110); d=ImageDraw.Draw(img)
    # vase
    d.polygon([(190,310),(330,310),(300,505),(220,505)], fill=rgb('#155d68'))
    for _ in range(16):
        x=rng.randint(100,410); y=rng.randint(70,330); r=rng.randint(28,52); c=rng.choice([rgb('#d62045'),rgb('#f03a55'),rgb('#bc153b'),rgb('#f05e74')])
        for k in range(5):
            ang=k*2*math.pi/5+rng.random(); cx=x+math.cos(ang)*r*.32; cy=y+math.sin(ang)*r*.32
            d.ellipse((cx-r*.42,cy-r*.30,cx+r*.42,cy+r*.30),fill=c)
        d.ellipse((x-r*.24,y-r*.24,x+r*.24,y+r*.24), fill=rgb('#7a102b'))
    for _ in range(18):
        x=rng.randint(95,420); y=rng.randint(140,390); d.ellipse((x-18,y-9,x+18,y+9),fill=rgb('#1e7559'))
    return finish(img,seed,1.2,1.1)


def scene_berries(seed=6):
    rng=random.Random(seed); img=gradient(rgb('#2d4f2a'), rgb('#b5cf83')); d=ImageDraw.Draw(img)
    # basket/table
    d.rectangle((0,345,S,S), fill=rgb('#7e4e2e'))
    d.ellipse((65,210,447,505), fill=rgb('#c4904c'), outline=rgb('#5d361e'), width=12)
    d.ellipse((85,225,427,475), fill=rgb('#8d5b32'))
    for _ in range(90):
        x=rng.randint(105,407); y=rng.randint(245,445); r=rng.randint(8,18); c=rng.choice([rgb('#9c1230'),rgb('#c52a46'),rgb('#6f0b26'),rgb('#ef4a58')])
        d.ellipse((x-r,y-r,x+r,y+r),fill=c)
        d.ellipse((x-r*.25,y-r*.45,x+r*.1,y-r*.15),fill=rgb('#ff9da2'))
    for _ in range(12):
        x=rng.randint(90,430); y=rng.randint(150,310)
        d.ellipse((x-35,y-14,x+35,y+14),fill=rgb('#3a873d'))
    return finish(img,seed,1.17,1.12)


def scene_phone(seed=7):
    rng=random.Random(seed); img=gradient(rgb('#3a2222'), rgb('#c19057')); d=ImageDraw.Draw(img)
    # wood tabletop
    for y in range(0,S,45): d.line((0,y,S,y+rng.randint(-5,5)), fill=rgb('#6a3e2a'), width=8)
    # rotary phone
    d.rounded_rectangle((70,230,445,470),45,fill=rgb('#2c2a2a'),outline=rgb('#0e0e0e'),width=9)
    d.ellipse((145,175,370,400),fill=rgb('#47423e'),outline=rgb('#141312'),width=10)
    d.ellipse((195,225,320,350),fill=rgb('#d1b68e'))
    for k in range(10):
        a=k*2*math.pi/10; x=258+math.cos(a)*78; y=288+math.sin(a)*78
        d.ellipse((x-14,y-14,x+14,y+14),fill=rgb('#e0c7a1'),outline=rgb('#1e1b19'),width=3)
    # handset
    d.rounded_rectangle((70,105,440,200),45,fill=rgb('#252424'),outline=rgb('#090909'),width=8)
    d.ellipse((55,105,170,215),fill=rgb('#242222')); d.ellipse((340,105,455,215),fill=rgb('#242222'))
    return finish(img,seed,.95,1.2)


def scene_bicycle(seed=8):
    rng=random.Random(seed); img=gradient(rgb('#f8b56a'), rgb('#7050a5')); d=ImageDraw.Draw(img)
    # city silhouettes
    for x in range(0,S,55):
        h=rng.randint(110,260); d.rectangle((x,310-h,x+45,310),fill=rng.choice([rgb('#4f4168'),rgb('#6c4a68'),rgb('#91536f')]))
        for yy in range(325-h,290,35):
            d.rectangle((x+10,yy,x+18,yy+14),fill=rgb('#ffd27a'))
    d.rectangle((0,310,S,S),fill=rgb('#2f3542'))
    # bike
    for cx in [155,365]: d.ellipse((cx-88,300,cx+88,476),outline=rgb('#e7e5df'),width=12)
    d.line((155,388,255,275,365,388,235,388,155,388),fill=rgb('#f0d45f'),width=12,joint='curve')
    d.line((255,275,235,388),fill=rgb('#f0d45f'),width=12)
    d.line((255,275,330,260),fill=rgb('#f0d45f'),width=10)
    d.line((210,250,285,250),fill=rgb('#f0d45f'),width=10)
    return finish(img,seed,1.15,1.1)


def scene_beach(seed=9):
    rng=random.Random(seed); img=gradient(rgb('#5fc9f3'), rgb('#d8f7ff')); d=ImageDraw.Draw(img)
    d.rectangle((0,260,S,390),fill=rgb('#13a6cc'))
    for y in [290,325,360]: d.arc((-30,y-28,540,y+35),0,180,fill=rgb('#d7fbff'),width=8)
    d.rectangle((0,390,S,S),fill=rgb('#f0d08a'))
    # palm
    d.line((95,420,145,125),fill=rgb('#7b4c27'),width=22)
    for a in [-2.7,-2.3,-1.9,-1.3,-.8,-.35]:
        ex=145+math.cos(a)*160; ey=125+math.sin(a)*110
        d.line((145,125,ex,ey),fill=rgb('#197d58'),width=16)
    # umbrella
    d.pieslice((280,180,500,390),180,360,fill=rgb('#ff5b5b'))
    d.pieslice((280,180,500,390),200,240,fill=rgb('#ffd85b'))
    d.pieslice((280,180,500,390),280,320,fill=rgb('#ffd85b'))
    d.line((390,285,390,480),fill=rgb('#7d5938'),width=10)
    return finish(img,seed,1.2,1.05)


def scene_balloons(seed=10):
    rng=random.Random(seed); img=gradient(rgb('#62b8ef'), rgb('#f7c4a5')); d=ImageDraw.Draw(img)
    # distant hills
    for i,c in enumerate([rgb('#7b6c86'),rgb('#5a6381'),rgb('#435d73')]):
        pts=[(0,340+i*45)]
        x=0
        while x<=S:
            pts.append((x,320+i*45+rng.randint(-35,35))); x+=55
        pts += [(S,S),(0,S)]
        poly(d,pts,c)
    for x,y,r,c in [(135,160,70,rgb('#e95c45')),(340,120,58,rgb('#ffd357')),(420,245,42,rgb('#7b5ad7')),(235,270,38,rgb('#55c3a4'))]:
        d.ellipse((x-r,y-r,x+r,y+r),fill=c,outline=rgb('#ffffff'),width=5)
        d.line((x-r*.6,y,x+r*.6,y),fill=rgb('#ffffff'),width=6)
        d.line((x,y-r,x,y+r),fill=rgb('#ffffff'),width=6)
        d.line((x-12,y+r,x-6,y+r+35),fill=rgb('#5d4632'),width=3); d.line((x+12,y+r,x+6,y+r+35),fill=rgb('#5d4632'),width=3)
        d.rectangle((x-12,y+r+30,x+12,y+r+48),fill=rgb('#80512b'))
    return finish(img,seed,1.18,1.07)


def scene_neon(seed=11):
    rng=random.Random(seed); img=gradient(rgb('#0e173d'), rgb('#3a0d51')); d=ImageDraw.Draw(img)
    # wet road
    poly(d,[(130,S),(382,S),(310,210),(202,210)],rgb('#171b2d'))
    # buildings
    for side in [0,1]:
        for i in range(5):
            w=rng.randint(55,100); x=(i*65-10) if side==0 else (512-(i+1)*65)
            h=rng.randint(220,430); d.rectangle((x,512-h,x+w,512),fill=rng.choice([rgb('#151b35'),rgb('#202045'),rgb('#2a1844')]))
            for yy in range(512-h+20,480,45):
                c=rng.choice([rgb('#00e5ff'),rgb('#ff36c8'),rgb('#fbd85d')]); d.rectangle((x+15,yy,x+w-15,yy+17),fill=c)
    # reflections
    for _ in range(18):
        x=rng.randint(150,360); y=rng.randint(250,500); c=rng.choice([rgb('#00e5ff'),rgb('#ff36c8'),rgb('#fbd85d')])
        d.line((x,y,x+rng.randint(-20,20),min(512,y+rng.randint(20,95))),fill=c,width=rng.randint(3,9))
    return finish(img,seed,1.35,1.15)


def scene_forest(seed=12):
    rng=random.Random(seed); img=gradient(rgb('#f4b348'),rgb('#5b3b39')); d=ImageDraw.Draw(img)
    for _ in range(18):
        x=rng.randint(-30,540); w=rng.randint(12,30); col=rng.choice([rgb('#47352c'),rgb('#5d3b25'),rgb('#69452d')])
        d.rectangle((x,0,x+w,S),fill=col)
        for _ in range(12):
            y=rng.randint(0,420); rr=rng.randint(18,55); c=rng.choice([rgb('#d9492f'),rgb('#f07a2f'),rgb('#e4a32a'),rgb('#a83b2f')])
            d.ellipse((x-rr,y-rr,x+rr,y+rr),fill=c)
    poly(d,[(170,S),(350,S),(300,210),(220,210)],rgb('#c88b54'))
    return finish(img,seed,1.22,1.1)


def scene_cabin(seed=13):
    rng=random.Random(seed); img=gradient(rgb('#718da8'),rgb('#e6d3b4')); d=ImageDraw.Draw(img)
    # mountains
    poly(d,[(0,290),(160,90),(300,290)],rgb('#667c89')); poly(d,[(190,290),(370,75),(512,290)],rgb('#536b7d'))
    poly(d,[(275,190),(370,75),(430,190)],rgb('#f1f4f4'))
    d.rectangle((0,285,S,S),fill=rgb('#4e724f'))
    # cabin
    d.rectangle((120,270,410,470),fill=rgb('#7c452c'))
    poly(d,[(90,285),(265,150),(440,285)],rgb('#3b302d'))
    d.rectangle((245,330,315,470),fill=rgb('#3e2a25'))
    for x in [155,340]:
        d.rectangle((x,315,x+55,380),fill=rgb('#ffd26a'),outline=rgb('#2b2523'),width=8)
    # smoke
    for i in range(5):
        d.ellipse((340+i*18,110-i*18,395+i*18,165-i*18),fill=rgb('#dfdfe0'))
    return finish(img,seed,1.08,1.13)


def scene_coffee(seed=14):
    rng=random.Random(seed); img=gradient(rgb('#6d4634'),rgb('#cba67b')); d=ImageDraw.Draw(img)
    # table grain
    for y in range(0,S,38): d.line((0,y,S,y+rng.randint(-6,6)),fill=rgb('#81573d'),width=6)
    # saucer/cup
    d.ellipse((80,240,430,470),fill=rgb('#efe6dc'),outline=rgb('#bcaea1'),width=6)
    d.ellipse((125,145,390,410),fill=rgb('#f7f0e9'),outline=rgb('#a49a91'),width=7)
    d.ellipse((150,175,365,355),fill=rgb('#5d3022'))
    # latte swirl
    for i in range(5):
        d.arc((185+i*7,210+i*6,330-i*7,320-i*6),200,520,fill=rgb('#e8cfa9'),width=8)
    # handle
    d.ellipse((345,220,455,340),outline=rgb('#f4ede5'),width=24)
    # beans
    for _ in range(18):
        x=rng.randint(20,480); y=rng.choice([rng.randint(40,170),rng.randint(410,500)]); r=rng.randint(8,16)
        d.ellipse((x-r,y-r,x+r,y+r),fill=rgb('#3c2118')); d.line((x-r//2,y+r//2,x+r//2,y-r//2),fill=rgb('#8a5b3f'),width=3)
    return finish(img,seed,1.05,1.17)


def scene_macarons(seed=15):
    rng=random.Random(seed); img=gradient(rgb('#f4dbde'),rgb('#b9d8e8')); d=ImageDraw.Draw(img)
    colors=[rgb('#ef7698'),rgb('#81c7b5'),rgb('#ffd16e'),rgb('#a995dd'),rgb('#ee9a5e')]
    y=410
    for i in range(6):
        w=250-i*14; x=256-w//2+rng.randint(-10,10); h=56; c=colors[i%len(colors)]
        d.rounded_rectangle((x,y-h,x+w,y),22,fill=c,outline=rgb('#ffffff'),width=4)
        d.rectangle((x+10,y-h//2-5,x+w-10,y-h//2+5),fill=rgb('#fff1df'))
        y-=h-7
    # bokeh dots
    for _ in range(28):
        x=rng.randint(20,490); y=rng.randint(20,270); r=rng.randint(4,16); d.ellipse((x-r,y-r,x+r,y+r),fill=rng.choice(colors))
    return finish(img,seed,1.2,1.03)


def scene_sushi(seed=16):
    rng=random.Random(seed); img=gradient(rgb('#242936'),rgb('#544537')); d=ImageDraw.Draw(img)
    d.ellipse((35,65,475,505),fill=rgb('#1b2027'),outline=rgb('#a39a8f'),width=10)
    # sushi pieces grid
    for row in range(3):
        for col in range(3):
            x=110+col*125+rng.randint(-5,5); y=140+row*115+rng.randint(-5,5)
            if (row+col)%3==0:
                d.rounded_rectangle((x-48,y-28,x+48,y+28),18,fill=rgb('#f5eee2'))
                d.rounded_rectangle((x-44,y-32,x+44,y+8),16,fill=rgb('#ec7a56'))
                for j in range(-30,31,15): d.line((x+j,y-28,x+j+10,y),fill=rgb('#f8ad8b'),width=4)
            elif (row+col)%3==1:
                d.ellipse((x-43,y-43,x+43,y+43),fill=rgb('#15241e'))
                d.ellipse((x-32,y-32,x+32,y+32),fill=rgb('#f2e7d1'))
                d.ellipse((x-21,y-21,x+21,y+21),fill=rgb('#f2b23c'))
            else:
                d.rounded_rectangle((x-42,y-38,x+42,y+38),12,fill=rgb('#f2e7d1'))
                d.rectangle((x-42,y-4,x+42,y+13),fill=rgb('#19251e'))
    d.ellipse((385,380,450,445),fill=rgb('#7ead43')); d.ellipse((60,365,120,425),fill=rgb('#e8b3b1'))
    return finish(img,seed,1.13,1.12)


def scene_lemon(seed=17):
    rng=random.Random(seed); img=gradient(rgb('#5ad0d9'),rgb('#f5e987')); img=bokeh(img,rng,[rgb('#ffffff'),rgb('#fff08b'),rgb('#58d3c8')],18,40,100); d=ImageDraw.Draw(img)
    # glass
    d.polygon([(145,90),(385,90),(350,480),(180,480)],fill=rgb('#d9fbff'),outline=rgb('#ffffff'),width=9)
    d.polygon([(166,165),(365,165),(340,455),(190,455)],fill=rgb('#f1de50'))
    # ice
    for _ in range(8):
        x=rng.randint(195,330); y=rng.randint(190,410); r=rng.randint(18,32); d.rounded_rectangle((x-r,y-r,x+r,y+r),8,fill=rgb('#e9fbff'),outline=rgb('#ffffff'),width=3)
    # lemon slices
    for x,y,r in [(160,130,60),(360,220,48)]:
        d.ellipse((x-r,y-r,x+r,y+r),fill=rgb('#ffe756'),outline=rgb('#fff7aa'),width=6)
        for k in range(8):
            a=k*math.pi/4; d.line((x,y,x+math.cos(a)*r*.8,y+math.sin(a)*r*.8),fill=rgb('#fff4a6'),width=3)
    d.line((300,40,250,430),fill=rgb('#ef5c7a'),width=12)
    return finish(img,seed,1.18,1.04)


def scene_violin(seed=18):
    rng=random.Random(seed); img=gradient(rgb('#1b1a2b'),rgb('#78424a')); d=ImageDraw.Draw(img)
    # sheet/spotlight
    d.ellipse((30,-40,480,520),fill=rgb('#4f3444'))
    # violin body
    d.ellipse((145,245,365,475),fill=rgb('#b65a2e'),outline=rgb('#4d2219'),width=10)
    d.ellipse((168,150,342,350),fill=rgb('#c76932'),outline=rgb('#4d2219'),width=10)
    d.rectangle((242,55,270,320),fill=rgb('#5b2b20'))
    d.polygon([(220,60),(290,60),(275,20),(235,20)],fill=rgb('#5b2b20'))
    for x in [200,310]:
        d.arc((x-35,255,x+25,390),80,280,fill=rgb('#4b241d'),width=9)
    for dx in [-7,-2,3,8]: d.line((255+dx,65,255+dx,450),fill=rgb('#f0d5ad'),width=2)
    # bow
    d.line((70,470,455,90),fill=rgb('#d6c0a1'),width=6)
    return finish(img,seed,1.08,1.17)


def scene_space(seed=19):
    rng=random.Random(seed); img=gradient(rgb('#081127'),rgb('#1b0f3d')); d=ImageDraw.Draw(img)
    for _ in range(120):
        x=rng.randrange(S); y=rng.randrange(S); r=rng.choice([1,1,1,2,3]); d.ellipse((x-r,y-r,x+r,y+r),fill=rng.choice([rgb('#ffffff'),rgb('#a9d6ff'),rgb('#ffd7a8')]))
    d.ellipse((270,40,560,330),fill=rgb('#5b72c8'))
    d.ellipse((310,72,530,292),fill=rgb('#6f8cdf'))
    # astronaut
    d.ellipse((85,115,245,275),fill=rgb('#e7edf2'),outline=rgb('#7f91a5'),width=8)
    d.ellipse((110,140,220,245),fill=rgb('#2b4a67'))
    d.rounded_rectangle((90,245,245,440),40,fill=rgb('#e9eef2'),outline=rgb('#8190a0'),width=8)
    d.line((110,300,35,400),fill=rgb('#e9eef2'),width=28); d.line((220,300,285,380),fill=rgb('#e9eef2'),width=28)
    d.line((130,430,105,510),fill=rgb('#e9eef2'),width=30); d.line((205,430,235,510),fill=rgb('#e9eef2'),width=30)
    return finish(img,seed,1.17,1.13)


def scene_castle(seed=20):
    rng=random.Random(seed); img=gradient(rgb('#1b2252'),rgb('#6b427d')); d=ImageDraw.Draw(img)
    d.ellipse((355,45,485,175),fill=rgb('#fff4c7'))
    # hills
    poly(d,[(0,390),(160,290),(270,390),(380,260),(512,390),(512,512),(0,512)],rgb('#182340'))
    # castle
    d.rectangle((120,225,405,430),fill=rgb('#5f6479'))
    for x in [115,210,320,400]:
        d.rectangle((x,175,x+75,430),fill=rgb('#697084'))
        poly(d,[(x-8,175),(x+37,105),(x+83,175)],rgb('#303854'))
    for x in [145,250,355]:
        d.rounded_rectangle((x,275,x+38,340),16,fill=rgb('#ffd66c'))
    d.rounded_rectangle((230,330,300,440),30,fill=rgb('#2e3448'))
    # bridge
    d.line((0,485,512,445),fill=rgb('#9b7b5f'),width=18)
    return finish(img,seed,1.08,1.14)


def scene_waterfall(seed=21):
    rng=random.Random(seed); img=gradient(rgb('#7cd0de'),rgb('#2e6f66')); d=ImageDraw.Draw(img)
    # cliffs
    poly(d,[(0,0),(155,0),(205,190),(170,430),(0,512)],rgb('#4d6c58'))
    poly(d,[(512,0),(365,0),(320,200),(345,430),(512,512)],rgb('#3f6656'))
    # waterfall
    d.polygon([(185,0),(350,0),(330,385),(180,385)],fill=rgb('#d7f6f4'))
    for x in range(200,340,22): d.line((x,0,x-rng.randint(0,40),390),fill=rgb('#8fd9e6'),width=rng.randint(5,12))
    d.ellipse((65,330,450,540),fill=rgb('#2c9ca5'))
    for _ in range(18):
        x=rng.randint(40,470); y=rng.randint(35,420); d.ellipse((x-35,y-16,x+35,y+16),fill=rng.choice([rgb('#276445'),rgb('#408157'),rgb('#75a94d')]))
    return finish(img,seed,1.13,1.06)


def scene_lavender(seed=22):
    rng=random.Random(seed); img=gradient(rgb('#83c5ef'),rgb('#f4c1c9')); d=ImageDraw.Draw(img)
    d.ellipse((370,45,465,140),fill=rgb('#fff0b6'))
    # field perspective
    d.rectangle((0,260,S,S),fill=rgb('#5d7c49'))
    for row in range(8):
        y=285+row*31; width=20+row*11
        for x in range(-20,S+20,55-row*3):
            c=rng.choice([rgb('#7450ad'),rgb('#8c64cb'),rgb('#a67ad6')])
            d.line((x,y+55,x+rng.randint(-5,5),y-25),fill=rgb('#315e38'),width=3)
            d.ellipse((x-width//2,y-20,x+width//2,y+25),fill=c)
    poly(d,[(225,S),(290,S),(268,260),(250,260)],rgb('#d8bf86'))
    return finish(img,seed,1.2,1.05)


def scene_sunflower(seed=23):
    rng=random.Random(seed); img=gradient(rgb('#5bb9e7'),rgb('#e6f2bd')); d=ImageDraw.Draw(img)
    d.rectangle((0,270,S,S),fill=rgb('#6e9a42'))
    for _ in range(26):
        x=rng.randint(-30,540); y=rng.randint(190,480); r=int((y-150)/7)+rng.randint(10,28)
        d.line((x,y,x,y+120),fill=rgb('#3b7a3e'),width=max(3,r//7))
        for k in range(14):
            a=k*2*math.pi/14; cx=x+math.cos(a)*r*.75; cy=y+math.sin(a)*r*.75
            d.ellipse((cx-r*.32,cy-r*.13,cx+r*.32,cy+r*.13),fill=rgb('#f7c52f'))
        d.ellipse((x-r*.35,y-r*.35,x+r*.35,y+r*.35),fill=rgb('#5a341f'))
    return finish(img,seed,1.22,1.08)


def scene_snow(seed=24):
    rng=random.Random(seed); img=gradient(rgb('#7898b5'),rgb('#d9e8f0')); d=ImageDraw.Draw(img)
    d.rectangle((0,270,S,S),fill=rgb('#e9f2f4'))
    # houses
    for x,y,c in [(60,250,rgb('#a64f44')),(235,285,rgb('#4d7897')),(365,235,rgb('#bf7f43'))]:
        d.rectangle((x,y,x+120,y+150),fill=c)
        poly(d,[(x-18,y),(x+60,y-80),(x+138,y)],rgb('#f1f5f6'))
        d.rectangle((x+45,y+70,x+78,y+150),fill=rgb('#4c332a'))
        d.rectangle((x+15,y+35,x+42,y+70),fill=rgb('#ffd979'))
    # snowflakes
    for _ in range(70):
        x=rng.randrange(S); y=rng.randrange(S); r=rng.randint(2,7); d.ellipse((x-r,y-r,x+r,y+r),fill=rgb('#ffffff'))
    return finish(img,seed,.9,1.08)


def scene_lighthouse(seed=25):
    rng=random.Random(seed); img=gradient(rgb('#6bc5ee'),rgb('#f5cf9a')); d=ImageDraw.Draw(img)
    d.rectangle((0,330,S,S),fill=rgb('#1688ad'))
    for y in [350,395,440]: d.arc((-50,y-30,570,y+30),0,180,fill=rgb('#d4f7ff'),width=7)
    # cliff
    poly(d,[(0,390),(210,275),(320,390),(380,512),(0,512)],rgb('#5e704f'))
    # tower
    d.polygon([(110,125),(190,125),(215,380),(85,380)],fill=rgb('#f4efe5'),outline=rgb('#7f7569'))
    for y in [190,270]: d.polygon([(97,y),(202,y),(208,y+32),(92,y+32)],fill=rgb('#d94f45'))
    d.rectangle((95,75,205,145),fill=rgb('#323d4c'))
    d.polygon([(80,75),(150,25),(220,75)],fill=rgb('#d94f45'))
    d.line((205,100,480,45),fill=rgb('#fff6bc'),width=18)
    return finish(img,seed,1.15,1.08)


def scene_car(seed=26):
    rng=random.Random(seed); img=gradient(rgb('#222b40'),rgb('#7e4160')); d=ImageDraw.Draw(img)
    d.rectangle((0,320,S,S),fill=rgb('#24272d'))
    for y in range(340,510,50): d.line((0,y,S,y),fill=rgb('#3c4047'),width=3)
    # car body
    d.rounded_rectangle((55,255,455,410),55,fill=rgb('#d72f42'),outline=rgb('#721522'),width=8)
    poly(d,[(130,255),(205,170),(335,170),(402,255)],rgb('#c6293b'),rgb('#721522'),6)
    poly(d,[(205,180),(260,180),(255,250),(150,250)],rgb('#80b7c9'))
    poly(d,[(270,180),(330,180),(392,250),(275,250)],rgb('#80b7c9'))
    for x in [135,380]:
        d.ellipse((x-58,355,x+58,470),fill=rgb('#141518')); d.ellipse((x-30,382,x+30,442),fill=rgb('#b6bac2'))
    d.rectangle((305,285,425,315),fill=rgb('#ffd36f'))
    return finish(img,seed,1.22,1.15)


def scene_parrot(seed=27):
    rng=random.Random(seed); img=gradient(rgb('#1f8f83'),rgb('#c5df7d')); img=bokeh(img,rng,[rgb('#ffffff'),rgb('#5ee0be'),rgb('#f9d85d')],20,40,80); d=ImageDraw.Draw(img)
    d.ellipse((115,90,400,465),fill=rgb('#e63f49'))
    d.ellipse((165,95,360,325),fill=rgb('#f2c53e'))
    d.ellipse((185,130,345,275),fill=rgb('#3a91d4'))
    d.ellipse((205,115,300,210),fill=rgb('#f7f5df'))
    d.ellipse((235,140,270,175),fill=rgb('#1a1d20'))
    d.polygon([(170,185),(70,240),(185,255)],fill=rgb('#2f3438'))
    d.polygon([(325,270),(430,500),(250,455)],fill=rgb('#2f9c66'))
    d.line((60,450,460,410),fill=rgb('#6b4b2b'),width=24)
    return finish(img,seed,1.22,1.08)


def scene_fox(seed=28):
    rng=random.Random(seed); img=gradient(rgb('#557c77'),rgb('#d1b477')); img=bokeh(img,rng,[rgb('#ffffff'),rgb('#b5d49a')],18,50,90); d=ImageDraw.Draw(img)
    # head
    d.ellipse((115,120,405,460),fill=rgb('#dc6b32'))
    poly(d,[(135,170),(120,35),(240,150)],rgb('#b84d2b')); poly(d,[(285,150),(405,35),(385,185)],rgb('#b84d2b'))
    poly(d,[(155,170),(145,80),(215,160)],rgb('#f4d2b1')); poly(d,[(310,160),(380,80),(370,185)],rgb('#f4d2b1'))
    d.ellipse((175,250,345,430),fill=rgb('#f4e7d8'))
    for x in [205,315]: d.ellipse((x-20,215,x+20,255),fill=rgb('#2a211c'))
    d.ellipse((240,300,300,350),fill=rgb('#2f211c'))
    d.arc((220,330,315,400),5,175,fill=rgb('#5f2d23'),width=6)
    return finish(img,seed,1.08,1.1)


def scene_koi(seed=29):
    rng=random.Random(seed); img=gradient(rgb('#0f6d83'),rgb('#3ab3a9')); d=ImageDraw.Draw(img)
    # lily pads
    for _ in range(12):
        x=rng.randint(30,480); y=rng.randint(30,480); r=rng.randint(25,55); c=rng.choice([rgb('#3e974f'),rgb('#5cad57'),rgb('#2f7e4b')])
        d.pieslice((x-r,y-r,x+r,y+r),20,350,fill=c)
    # koi fish
    for x,y,a,c in [(160,210,-.4,rgb('#f4f0dd')),(350,315,2.6,rgb('#ef7b32')),(270,105,1.2,rgb('#f4f0dd'))]:
        L=125; W=48; pts=[]
        for px,py in [(-L/2,0),(0,-W/2),(L/2,0),(0,W/2)]:
            pts.append((x+px*math.cos(a)-py*math.sin(a),y+px*math.sin(a)+py*math.cos(a)))
        poly(d,pts,c)
        tx=x-L/2*math.cos(a); ty=y-L/2*math.sin(a)
        poly(d,[(tx,ty),(tx-45*math.cos(a-.8),ty-45*math.sin(a-.8)),(tx-45*math.cos(a+.8),ty-45*math.sin(a+.8))],c)
        d.ellipse((x-10,y-10,x+10,y+10),fill=rgb('#e34b2f'))
    return finish(img,seed,1.18,1.08)


def scene_library(seed=30):
    rng=random.Random(seed); img=gradient(rgb('#3c2528'),rgb('#8f6844')); d=ImageDraw.Draw(img)
    # shelves
    for y in [55,185,315]:
        d.rectangle((20,y,S-20,y+20),fill=rgb('#4f2d1f'))
        x=30
        while x<480:
            w=rng.randint(12,30); h=rng.randint(60,110); c=rng.choice([rgb('#9d3e3e'),rgb('#365f75'),rgb('#b88a3a'),rgb('#57784d'),rgb('#6d4e8a')])
            d.rectangle((x,y-h,x+w,y),fill=c,outline=rgb('#2a201d'),width=2); x+=w+rng.randint(2,6)
    # ladder
    d.line((360,60,300,500),fill=rgb('#b88b5b'),width=13); d.line((430,60,370,500),fill=rgb('#b88b5b'),width=13)
    for yy in range(110,480,55): d.line((350,yy,420,yy-10),fill=rgb('#b88b5b'),width=9)
    d.ellipse((65,395,260,520),fill=rgb('#6f3b2e'))
    return finish(img,seed,1.08,1.14)


def scene_cathedral(seed=31):
    rng=random.Random(seed); img=gradient(rgb('#6daed7'),rgb('#e8c7a8')); d=ImageDraw.Draw(img)
    # facade
    d.rectangle((85,145,430,500),fill=rgb('#cbb99b'),outline=rgb('#8e806b'),width=6)
    for x in [80,360]:
        d.rectangle((x,90,x+85,500),fill=rgb('#b9a78c'))
        poly(d,[(x-10,90),(x+42,20),(x+95,90)],rgb('#8f806e'))
    # center roof and rose window
    poly(d,[(160,145),(258,55),(355,145)],rgb('#9c8d77'))
    d.ellipse((205,165,310,270),fill=rgb('#537a98'),outline=rgb('#776a5c'),width=10)
    for a in np.linspace(0,2*math.pi,12,endpoint=False): d.line((258,218,258+math.cos(a)*48,218+math.sin(a)*48),fill=rgb('#d2c3ab'),width=4)
    for x in [135,235,335]: d.rounded_rectangle((x,315,x+55,500),25,fill=rgb('#473e38'))
    return finish(img,seed,.98,1.12)


def scene_desert(seed=32):
    rng=random.Random(seed); img=gradient(rgb('#4f8dd1'),rgb('#ffd08c')); d=ImageDraw.Draw(img)
    d.ellipse((370,45,475,150),fill=rgb('#fff0a5'))
    # dunes
    d.pieslice((-250,200,500,760),180,360,fill=rgb('#c8863e'))
    d.pieslice((90,250,760,760),180,360,fill=rgb('#e2a455'))
    d.pieslice((-280,330,420,820),180,360,fill=rgb('#f1be71'))
    # camel silhouette
    d.ellipse((160,285,315,395),fill=rgb('#5c3828'))
    d.ellipse((270,245,355,330),fill=rgb('#5c3828'))
    d.line((205,365,180,500),fill=rgb('#5c3828'),width=18); d.line((280,365,305,500),fill=rgb('#5c3828'),width=18)
    d.line((330,270,390,205),fill=rgb('#5c3828'),width=18); d.ellipse((375,180,425,225),fill=rgb('#5c3828'))
    return finish(img,seed,1.12,1.1)


def scene_sailboat(seed=33):
    rng=random.Random(seed); img=gradient(rgb('#68c4ee'),rgb('#e9f6f6')); d=ImageDraw.Draw(img)
    d.rectangle((0,290,S,S),fill=rgb('#1d9cc5'))
    for y in range(320,500,34): d.arc((-30,y-22,540,y+25),0,180,fill=rgb('#8edff0'),width=5)
    # boat
    d.polygon([(100,375),(425,375),(365,470),(160,470)],fill=rgb('#f0eee4'),outline=rgb('#4b6070'))
    d.line((255,100,255,390),fill=rgb('#58473a'),width=10)
    poly(d,[(250,115),(250,350),(105,350)],rgb('#ffffff'),rgb('#b7c2c8'),4)
    poly(d,[(265,145),(265,350),(410,350)],rgb('#ef5e55'),rgb('#9e443e'),4)
    d.ellipse((50,40,120,110),fill=rgb('#fff1a6'))
    return finish(img,seed,1.14,1.04)


def scene_cherry(seed=34):
    rng=random.Random(seed); img=gradient(rgb('#8fd2f1'),rgb('#f6d4dc')); d=ImageDraw.Draw(img)
    # river/bridge
    d.rectangle((0,315,S,S),fill=rgb('#6bbad2'))
    d.arc((60,180,460,510),180,360,fill=rgb('#c24b4b'),width=32)
    d.line((75,345,440,345),fill=rgb('#b93f43'),width=24)
    for x in range(90,440,55): d.line((x,300,x,390),fill=rgb('#a73c3e'),width=8)
    # branches and blossoms
    for side in [0,1]:
        bx=0 if side==0 else S
        d.line((bx,40,240 if side==0 else 275,240),fill=rgb('#6e4539'),width=20)
        for _ in range(45):
            x=rng.randint(0,250) if side==0 else rng.randint(270,512); y=rng.randint(0,260); r=rng.randint(8,17)
            d.ellipse((x-r,y-r,x+r,y+r),fill=rng.choice([rgb('#f5b6cc'),rgb('#ffd4e3'),rgb('#ef92b6')]))
    return finish(img,seed,1.12,1.06)


def scene_fish(seed=35):
    rng=random.Random(seed); img=gradient(rgb('#075d82'),rgb('#23b7aa')); d=ImageDraw.Draw(img)
    # light beams
    for x in [80,240,400]: poly(d,[(x-80,0),(x+20,0),(x+180,S),(x+40,S)],(125,231,233))
    # bubbles
    for _ in range(35):
        x=rng.randrange(S); y=rng.randrange(S); r=rng.randint(3,13); d.ellipse((x-r,y-r,x+r,y+r),outline=rgb('#c9f6f2'),width=2)
    # fish
    for x,y,L,c in [(175,210,150,rgb('#f2cc49')),(360,345,125,rgb('#ef6a5b')),(300,120,85,rgb('#8dd57f'))]:
        d.ellipse((x-L/2,y-L*.25,x+L/2,y+L*.25),fill=c)
        poly(d,[(x-L/2,y),(x-L*.78,y-L*.28),(x-L*.78,y+L*.28)],c)
        d.ellipse((x+L*.22,y-L*.08,x+L*.29,y-L*.01),fill=rgb('#151c21'))
        for k in range(4): d.line((x-L*.1+k*L*.12,y-L*.22,x-L*.05+k*L*.12,y+L*.22),fill=rgb('#ffffff'),width=3)
    # coral
    for x in range(20,520,50):
        d.line((x,512,x+rng.randint(-30,30),410),fill=rng.choice([rgb('#f06b64'),rgb('#a868d4'),rgb('#e5a84f')]),width=14)
    return finish(img,seed,1.24,1.08)


def scene_train(seed=36):
    rng=random.Random(seed); img=gradient(rgb('#5b6d75'),rgb('#d6b98d')); d=ImageDraw.Draw(img)
    # foggy hills
    for i,c in enumerate([rgb('#7f8b7a'),rgb('#64766f'),rgb('#50645f')]):
        pts=[(0,230+i*55)]
        for x in range(0,513,70): pts.append((x,210+i*55+rng.randint(-35,35)))
        pts += [(512,512),(0,512)]; poly(d,pts,c)
    # tracks
    d.line((155,S,245,265),fill=rgb('#453b35'),width=14); d.line((390,S,285,265),fill=rgb('#453b35'),width=14)
    for y in range(300,510,35):
        span=(y-265)*.7; d.line((270-span,y,270+span,y),fill=rgb('#6b513d'),width=10)
    # train
    d.rounded_rectangle((165,120,370,330),25,fill=rgb('#672c2d'),outline=rgb('#2f2726'),width=8)
    d.rectangle((195,160,340,245),fill=rgb('#232e33'))
    d.ellipse((225,285,285,345),fill=rgb('#171a1b')); d.ellipse((315,285,375,345),fill=rgb('#171a1b'))
    d.ellipse((235,70,305,140),fill=rgb('#2a2826'))
    # smoke
    for i in range(6): d.ellipse((230+i*22,25-i*6,300+i*22,90-i*6),fill=rgb('#c8c9c4'))
    return finish(img,seed,1.02,1.16)

SCENES = [
    ('alpine-lake',scene_alpine),('blue-alley',scene_alley),('golden-dog',scene_dog),('white-cat',scene_cat),
    ('red-roses',scene_roses),('berry-basket',scene_berries),('vintage-phone',scene_phone),('city-bicycle',scene_bicycle),
    ('tropical-beach',scene_beach),('hot-air-balloons',scene_balloons),('neon-city',scene_neon),('autumn-forest',scene_forest),
    ('mountain-cabin',scene_cabin),('coffee-cup',scene_coffee),('macarons',scene_macarons),('sushi',scene_sushi),
    ('lemon-drink',scene_lemon),('violin',scene_violin),('astronaut',scene_space),('moon-castle',scene_castle),
    ('waterfall',scene_waterfall),('lavender-field',scene_lavender),('sunflower-field',scene_sunflower),('snow-village',scene_snow),
    ('lighthouse',scene_lighthouse),('red-car',scene_car),('parrot',scene_parrot),('fox',scene_fox),
    ('koi-pond',scene_koi),('library',scene_library),('cathedral',scene_cathedral),('desert',scene_desert),
    ('sailboat',scene_sailboat),('cherry-bridge',scene_cherry),('tropical-fish',scene_fish),('old-train',scene_train),
]

if __name__ == '__main__':
    thumbs=[]
    for i,(name,fn) in enumerate(SCENES,1):
        img=fn(i)
        p=OUT/f'{i:02d}-{name}.webp'
        img.save(p,'WEBP',quality=86,method=6)
        thumb=img.resize((128,128),Image.Resampling.LANCZOS)
        td=ImageDraw.Draw(thumb); td.rounded_rectangle((3,3,125,125),8,outline='white',width=3)
        thumbs.append((thumb,name))
    sheet=Image.new('RGB',(6*128,6*148),(24,37,70)); sd=ImageDraw.Draw(sheet)
    for i,(thumb,name) in enumerate(thumbs):
        x=(i%6)*128; y=(i//6)*148; sheet.paste(thumb,(x,y)); sd.text((x+6,y+130),f'{i+1:02d}',fill='white')
    sheet.save(OUT/'contact-sheet.jpg',quality=88)
    print(f'Generated {len(SCENES)} images in {OUT}')
