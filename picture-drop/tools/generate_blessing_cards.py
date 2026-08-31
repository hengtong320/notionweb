#!/usr/bin/env python3
from pathlib import Path
import math

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'blessings'
OUT.mkdir(parents=True, exist_ok=True)

W, H = 750, 1000

DEFS = '''
<defs>
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="18"/></filter>
  <filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#243449" flood-opacity=".28"/></filter>
  <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".42"/><stop offset="1" stop-color="#fff" stop-opacity=".04"/></linearGradient>
</defs>
'''

def wrap(body: str, extra_defs: str = '') -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
{DEFS}{extra_defs}
{body}
</svg>'''

def lotus():
    leaves = ''.join(f'<ellipse cx="{x}" cy="{y}" rx="{r}" ry="{r*.42}" fill="{c}" transform="rotate({a} {x} {y})"/>' for x,y,r,c,a in [
        (120,805,150,'#2f9b70',-12),(330,850,190,'#3ba75c',8),(590,830,155,'#2f8d63',-8),(655,955,170,'#177b68',12),(145,970,170,'#278a73',-5)])
    petals=[]
    for cx,cy,scale in [(235,785,1.0),(520,820,.76),(115,690,.45)]:
        for i in range(12):
            a=2*math.pi*i/12
            x=cx+math.cos(a)*54*scale; y=cy+math.sin(a)*28*scale
            petals.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{32*scale:.1f}" ry="{72*scale:.1f}" fill="#ff8fc2" transform="rotate({i*30} {x:.1f} {y:.1f})"/>')
        petals.append(f'<circle cx="{cx}" cy="{cy}" r="{26*scale}" fill="#ffd56b"/>')
    return wrap(f'''
<defs><linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ef8fd1"/><stop offset=".43" stop-color="#ffd8a2"/><stop offset="1" stop-color="#7ad6e7"/></linearGradient><linearGradient id="water1" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e8c9dc"/><stop offset="1" stop-color="#4e9ec4"/></linearGradient></defs>
<rect width="750" height="1000" fill="url(#sky1)"/>
<circle cx="390" cy="350" r="58" fill="#fff9c8" filter="url(#glow)"/>
<path d="M0 420 Q120 290 250 410 T480 390 T750 420 V610 H0Z" fill="#225f75" opacity=".88"/>
<path d="M0 480 Q150 360 290 470 T560 450 T750 470 V620 H0Z" fill="#347a78" opacity=".82"/>
<rect y="510" width="750" height="490" fill="url(#water1)"/>
<ellipse cx="390" cy="540" rx="300" ry="55" fill="#fff" opacity=".28" filter="url(#soft)"/>
{leaves}
{''.join(petals)}
<g opacity=".72" fill="#fff">{''.join(f'<circle cx="{80+i*47}" cy="{900+(i%3)*24}" r="{3+i%4}"/>' for i in range(13))}</g>
''')

def trumpet():
    flowers=[]
    for x,y,s,rot in [(420,350,1,12),(555,430,.92,-8),(365,515,.72,28),(590,590,.66,-20),(460,625,.58,18)]:
        flowers.append(f'<g transform="translate({x} {y}) rotate({rot}) scale({s})"><path d="M0 0 C55 -80 110 -70 118 -20 C123 16 78 38 32 20 C70 72 20 112 -18 82 C-52 55 -28 15 0 0Z" fill="#ff8e34"/><path d="M25 8 C52 -20 83 -14 92 6 C72 3 51 9 32 22Z" fill="#ffd270" opacity=".72"/></g>')
    return wrap(f'''
<defs><linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e82735"/><stop offset=".54" stop-color="#ff7652"/><stop offset="1" stop-color="#ffc678"/></linearGradient></defs>
<rect width="750" height="1000" fill="url(#bg2)"/>
<circle cx="620" cy="130" r="190" fill="#ffce8d" opacity=".18" filter="url(#soft)"/>
<path d="M730 40 C600 130 600 300 510 390 C430 470 370 670 255 810" stroke="#315b31" stroke-width="22" fill="none" stroke-linecap="round"/>
<g fill="#305f2e">{''.join(f'<ellipse cx="{590-i*30}" cy="{130+i*66}" rx="38" ry="18" transform="rotate({-30+i*11} {590-i*30} {130+i*66})"/>' for i in range(7))}</g>
{''.join(flowers)}
<ellipse cx="360" cy="825" rx="260" ry="85" fill="#fff3dd" opacity=".12" filter="url(#soft)"/>
''')

def jujube():
    fruits=[]
    for i,(x,y) in enumerate([(470,270),(525,315),(575,365),(430,385),(510,430),(610,455),(390,485),(465,525),(550,560),(635,590),(420,630),(505,665),(585,700),(660,740)]):
        fruits.append(f'<ellipse cx="{x}" cy="{y}" rx="{24+(i%3)*3}" ry="{34+(i%2)*4}" fill="url(#fruit4)" transform="rotate({-18+i*7} {x} {y})"/>')
    return wrap(f'''
<defs><linearGradient id="bg4" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e9f8b7"/><stop offset=".38" stop-color="#98d95d"/><stop offset="1" stop-color="#3f954f"/></linearGradient><linearGradient id="fruit4" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e9c84f"/><stop offset=".5" stop-color="#cb6334"/><stop offset="1" stop-color="#872622"/></linearGradient></defs>
<rect width="750" height="1000" fill="url(#bg4)"/>
<ellipse cx="210" cy="410" rx="130" ry="170" fill="#3b8b47" opacity=".38" filter="url(#soft)"/>
<path d="M780 210 C610 330 570 540 325 875" stroke="#5a3322" stroke-width="24" fill="none" stroke-linecap="round"/>
<path d="M580 330 C510 300 450 295 360 275 M545 455 C475 430 390 430 300 405 M520 570 C430 540 360 575 290 620" stroke="#70402b" stroke-width="12" fill="none" stroke-linecap="round"/>
<g fill="#2d783d">{''.join(f'<ellipse cx="{330+i*39}" cy="{270+(i%4)*78}" rx="45" ry="17" transform="rotate({-35+i*13} {330+i*39} {270+(i%4)*78})"/>' for i in range(11))}</g>
{''.join(fruits)}
<path d="M0 800 Q190 710 360 820 T750 790 V1000 H0Z" fill="#78b94f" opacity=".55"/>
''')

def vase():
    petals=[]
    for cx,cy,color in [(305,385,'#ef4050'),(430,330,'#ff6d70'),(515,435,'#f6a2bb')]:
        for i in range(9):
            a=i*40; petals.append(f'<ellipse cx="{cx}" cy="{cy}" rx="42" ry="86" fill="{color}" transform="rotate({a} {cx} {cy})" opacity=".92"/>')
        petals.append(f'<circle cx="{cx}" cy="{cy}" r="34" fill="#ffd48b"/>')
    return wrap(f'''
<defs><linearGradient id="bg6" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff3d2"/><stop offset=".45" stop-color="#e8f5d8"/><stop offset="1" stop-color="#f4b96f"/></linearGradient><linearGradient id="vase6" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff9f39"/><stop offset=".5" stop-color="#e75223"/><stop offset="1" stop-color="#b62222"/></linearGradient></defs>
<rect width="750" height="1000" fill="url(#bg6)"/>
<circle cx="590" cy="160" r="130" fill="#fff" opacity=".42" filter="url(#soft)"/>
<g stroke="#4e7a43" stroke-width="12" stroke-linecap="round"><path d="M375 670 L305 390"/><path d="M390 670 L430 345"/><path d="M405 670 L515 450"/></g>
{''.join(petals)}
<path d="M250 590 C290 555 475 555 515 590 L480 845 C455 905 310 905 280 845Z" fill="url(#vase6)" filter="url(#shadow)"/>
<circle cx="382" cy="725" r="78" fill="#b71f26" stroke="#ffd67e" stroke-width="10"/><text x="382" y="754" text-anchor="middle" font-size="86" font-weight="800" fill="#ffd67e" font-family="serif">福</text>
<rect y="875" width="750" height="125" fill="#9a5b37" opacity=".34"/>
''')

def crane():
    return wrap('''
<defs><linearGradient id="bg5" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f6d79b"/><stop offset=".5" stop-color="#b6d9c9"/><stop offset="1" stop-color="#4f8e84"/></linearGradient></defs>
<rect width="750" height="1000" fill="url(#bg5)"/>
<circle cx="560" cy="220" r="72" fill="#fff4be" filter="url(#glow)"/>
<path d="M0 560 Q130 390 250 535 T480 500 T750 540 V1000 H0Z" fill="#4b817c"/>
<path d="M0 650 Q170 520 330 640 T750 610 V1000 H0Z" fill="#2c6664" opacity=".86"/>
<g stroke="#173f3c" stroke-width="18" fill="none" stroke-linecap="round"><path d="M80 900 C160 720 120 480 230 260"/><path d="M175 560 l-105 -65 M190 500 l100 -65 M205 430 l-95 -75 M220 360 l105 -65"/></g>
<g stroke="#244f4b" stroke-width="8">''' + ''.join(f'<path d="M{60+i*24} {510-i*20} l{-45+(i%2)*90} -20"/>' for i in range(10)) + '''</g>
<g fill="#fff" stroke="#284d4b" stroke-width="5"><path d="M430 440 q45 -65 90 0 q-38 -24 -90 0Z"/><path d="M520 550 q55 -75 110 0 q-48 -27 -110 0Z"/></g>
<ellipse cx="385" cy="745" rx="280" ry="48" fill="#fff" opacity=".22" filter="url(#soft)"/>
''')

def peony():
    blooms=[]
    for cx,cy,s,c in [(270,400,1,'#ff8ea9'),(500,500,.9,'#e94366'),(390,680,.75,'#ffd5de')]:
        for i in range(16):
            a=2*math.pi*i/16;x=cx+math.cos(a)*50*s;y=cy+math.sin(a)*40*s
            blooms.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{35*s:.1f}" ry="{58*s:.1f}" fill="{c}" transform="rotate({i*22.5:.1f} {x:.1f} {y:.1f})" opacity=".9"/>')
        blooms.append(f'<circle cx="{cx}" cy="{cy}" r="{34*s}" fill="#ffd37c"/>')
    return wrap(f'''
<defs><radialGradient id="bg7"><stop stop-color="#ffcc84"/><stop offset=".55" stop-color="#d83247"/><stop offset="1" stop-color="#78192d"/></radialGradient></defs><rect width="750" height="1000" fill="url(#bg7)"/>
<g opacity=".25" fill="#ffd980">{''.join(f'<circle cx="{(i*83)%750}" cy="{70+(i*127)%900}" r="{4+i%7}"/>' for i in range(28))}</g>
<g stroke="#315f3e" stroke-width="15" fill="none"><path d="M380 930 C350 720 310 550 270 420"/><path d="M400 930 C430 720 485 620 500 520"/></g>
{''.join(blooms)}
''')

def moon():
    return wrap('''
<defs><linearGradient id="bg8" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#131c55"/><stop offset=".55" stop-color="#373078"/><stop offset="1" stop-color="#935b75"/></linearGradient></defs>
<rect width="750" height="1000" fill="url(#bg8)"/><circle cx="500" cy="280" r="138" fill="#fff1bf" filter="url(#glow)"/>
<path d="M0 700 Q160 560 290 680 T520 645 T750 690 V1000 H0Z" fill="#202d4c"/>
<path d="M80 900 C210 720 190 500 320 270" stroke="#6a4b2d" stroke-width="20" fill="none"/>
<g fill="#ffd14f">''' + ''.join(f'<circle cx="{240+(i%5)*34}" cy="{300+(i//5)*58}" r="{8+(i%3)*3}"/>' for i in range(25)) + '''</g>
<g fill="#fff" opacity=".75">''' + ''.join(f'<circle cx="{40+(i*71)%700}" cy="{70+(i*113)%570}" r="{1+i%3}"/>' for i in range(22)) + '''</g>
''')

def lantern():
    lanterns=[]
    for x,y,s in [(180,260,1),(560,220,.82),(380,510,.68)]:
        lanterns.append(f'<g transform="translate({x} {y}) scale({s})" filter="url(#shadow)"><rect x="-18" y="-92" width="36" height="28" rx="8" fill="#ffd06a"/><ellipse cy="0" rx="92" ry="112" fill="#e93631"/><path d="M-70 -55 H70 M-82 0 H82 M-70 55 H70" stroke="#ffcc62" stroke-width="9" opacity=".72"/><rect x="-16" y="105" width="32" height="45" fill="#ffd06a"/><path d="M0 150 v72" stroke="#ffd06a" stroke-width="10"/></g>')
    return wrap(f'''
<defs><linearGradient id="bg9" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#5e1025"/><stop offset=".5" stop-color="#b51e35"/><stop offset="1" stop-color="#ef7445"/></linearGradient></defs><rect width="750" height="1000" fill="url(#bg9)"/>
<g stroke="#ffd66c" fill="none" opacity=".7">{''.join(f'<path d="M{90+i*135} {100+(i%2)*80} l40 -70 M{90+i*135} {100+(i%2)*80} l-45 -20 M{90+i*135} {100+(i%2)*80} l20 45" stroke-width="5"/>' for i in range(5))}</g>
{''.join(lanterns)}<path d="M0 860 Q160 780 330 850 T750 820 V1000 H0Z" fill="#8c1730" opacity=".8"/>
''')

def chrysanthemum():
    petals=[]
    for cx,cy,s,c in [(235,610,1,'#ffd95e'),(485,660,.9,'#f49c44'),(365,805,.7,'#fff1a2')]:
        for i in range(20):
            a=i*18; petals.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{16*s}" ry="{85*s}" fill="{c}" transform="rotate({a} {cx} {cy})" opacity=".88"/>')
        petals.append(f'<circle cx="{cx}" cy="{cy}" r="{28*s}" fill="#9b5b26"/>')
    return wrap(f'''
<defs><linearGradient id="bg10" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffcf8a"/><stop offset=".48" stop-color="#f18c5b"/><stop offset="1" stop-color="#663a52"/></linearGradient></defs><rect width="750" height="1000" fill="url(#bg10)"/>
<circle cx="555" cy="210" r="80" fill="#fff2b6" filter="url(#glow)"/><path d="M0 500 Q140 350 280 500 T540 450 T750 520 V1000 H0Z" fill="#5c5974" opacity=".82"/>
<path d="M0 610 Q190 470 350 610 T750 570 V1000 H0Z" fill="#365a58" opacity=".9"/>{''.join(petals)}
''')

def plum():
    return wrap('''
<defs><linearGradient id="bg11" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#dff4fa"/><stop offset=".55" stop-color="#94bdd3"/><stop offset="1" stop-color="#587f9e"/></linearGradient></defs><rect width="750" height="1000" fill="url(#bg11)"/>
<g fill="#fff" opacity=".82">''' + ''.join(f'<circle cx="{(i*67)%750}" cy="{40+(i*97)%920}" r="{3+i%6}"/>' for i in range(36)) + '''</g>
<path d="M-20 920 C120 690 160 450 420 240 M110 690 C250 610 370 590 590 520 M250 520 C330 390 470 310 700 280" stroke="#4f322f" stroke-width="25" fill="none" stroke-linecap="round"/>
<g fill="#f8a7bf" stroke="#fff3f6" stroke-width="4">''' + ''.join(f'<circle cx="{150+(i*57)%560}" cy="{280+(i*83)%480}" r="{15+i%9}"/>' for i in range(22)) + '''</g>
''')

def fireworks():
    bursts=[]
    for cx,cy,c in [(170,230,'#ffdc68'),(535,180,'#75efff'),(370,370,'#ff72bb')]:
        for i in range(18):
            a=2*math.pi*i/18;x2=cx+math.cos(a)*110;y2=cy+math.sin(a)*110
            bursts.append(f'<path d="M{cx} {cy} L{x2:.1f} {y2:.1f}" stroke="{c}" stroke-width="5" stroke-linecap="round" opacity=".85"/>')
    city=''.join(f'<rect x="{i*55}" y="{720-(i%4)*50}" width="48" height="{280+(i%4)*50}" fill="{["#151f49","#202861","#2f3476"][i%3]}"/><g fill="#ffe37a">'+''.join(f'<rect x="{i*55+9+(j%2)*18}" y="{750-(i%4)*45+(j//2)*28}" width="8" height="12"/>' for j in range(8))+'</g>' for i in range(14))
    return wrap(f'''<defs><linearGradient id="bg12" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#101342"/><stop offset=".55" stop-color="#43266a"/><stop offset="1" stop-color="#e34d78"/></linearGradient></defs><rect width="750" height="1000" fill="url(#bg12)"/>{''.join(bursts)}{city}''')

def spring():
    return wrap('''
<defs><radialGradient id="bg13"><stop stop-color="#ffba58"/><stop offset=".55" stop-color="#e83c32"/><stop offset="1" stop-color="#8f101f"/></radialGradient></defs><rect width="750" height="1000" fill="url(#bg13)"/>
<g fill="#ffd36a" opacity=".26">''' + ''.join(f'<circle cx="{(i*91)%750}" cy="{60+(i*117)%880}" r="{5+i%10}"/>' for i in range(26)) + '''</g>
<g transform="translate(375 530)" filter="url(#shadow)"><path d="M-165 -220 Q0 -290 165 -220 L125 230 Q0 300 -125 230Z" fill="#e94031" stroke="#ffd36a" stroke-width="12"/><circle r="110" fill="#b71927" stroke="#ffd36a" stroke-width="12"/><text y="42" text-anchor="middle" font-size="125" font-weight="900" fill="#ffd36a" font-family="serif">福</text></g>
<g fill="#ffd36a"><circle cx="110" cy="180" r="55"/><circle cx="640" cy="160" r="42"/></g>
<path d="M0 900 Q170 790 360 880 T750 830 V1000 H0Z" fill="#7c101e" opacity=".75"/>
''')

cards = {
    '01-lotus-sunrise.svg': lotus(),
    '02-trumpet-flower.svg': trumpet(),
    '03-jujube-orchard.svg': jujube(),
    '04-blessing-vase.svg': vase(),
    '05-pine-crane.svg': crane(),
    '06-peony-gold.svg': peony(),
    '07-moon-osmanthus.svg': moon(),
    '08-lantern-festival.svg': lantern(),
    '09-chrysanthemum-mountain.svg': chrysanthemum(),
    '10-plum-snow.svg': plum(),
    '11-fireworks-city.svg': fireworks(),
    '12-spring-fortune.svg': spring(),
}

for name, data in cards.items():
    (OUT / name).write_text(data, encoding='utf-8')
print(f'generated {len(cards)} blessing backgrounds in {OUT}')
