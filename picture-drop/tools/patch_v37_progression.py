#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; INDEX=ROOT/'index.html'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'
s=GAME.read_text(encoding='utf-8')

# 1) Expand the picture pool from 36 to 60 using the generated flat-illustration pack.
marker='  const QUADRANTS = ['
extra_paths=[
'37-jellyfish','38-ramen','39-skateboard','40-rain-window','41-arcade','42-vinyl','43-sakura','44-hot-spring',
'45-panda','46-penguin','47-robot','48-submarine','49-whale','50-dinosaur','51-bakery','52-pottery',
'53-ferris-wheel','54-telescope','55-camper','56-basketball','57-tea-house','58-lantern-alley','59-aurora-tent','60-windmill']
extra_names=['水母夜游','拉面小馆','滑板公园','雨夜窗景','街机房','黑胶唱片','樱花坡道','山间温泉','竹林熊猫','冰原企鹅','机器人工作间','深海潜艇','蓝鲸跃海','恐龙谷','清晨面包店','陶艺工坊','夜色摩天轮','星空望远镜','露营房车','夕阳球场','茶屋庭院','灯笼小巷','极光帐篷','风车麦田']
insert="  PICTURE_PATHS.push(...[\n"+",\n".join(f"    'assets/pictures-extra/{slug}.svg'" for slug in extra_paths)+"\n  ]);\n  PICTURE_NAMES.push(...[\n"+",\n".join(f"    '{name}'" for name in extra_names)+"\n  ]);\n\n"
if 'assets/pictures-extra/37-jellyfish.svg' not in s:
    s=s.replace(marker,insert+marker,1)

# 2) Replace the old monotonic difficulty/count curve and overlap-heavy image selection.
old_count=re.search(r"  function imageCountForLevel\(level\) \{.*?\n  \}\n\n  function warmLevelImages",s,re.S)
if not old_count: raise SystemExit('imageCountForLevel block not found')
new_count=r'''  function imageCountForLevel(level) {
    // A saw-tooth difficulty curve: milestone levels grow, the level immediately
    // after a hard milestone breathes a little, and late-game rounds carry deep decks.
    if (level <= 1) return 5;   // tutorial still shows one real refill wave
    if (level === 2) return 6;
    if (level === 3) return 7;
    if (level === 4) return 8;
    if (level === 5) return 9;
    if (level <= 7) return 9;
    if (level <= 9) return 10;
    if (level === 10) return 12;
    if (level === 11) return 11;
    if (level === 12) return 12;
    if (level === 13) return 12;
    if (level === 14) return 13;
    if (level === 15) return 14;
    const band=Math.floor((level-16)/5);
    let count=Math.min(18,14+band);
    if (isHardLevel(level)) count=Math.min(20,count+2);
    else if ((level-16)%5===0) count=Math.max(14,count-1); // relief after a boss level
    return count;
  }

  function warmLevelImages'''
s=s[:old_count.start()]+new_count+s[old_count.end():]

sel=re.search(r"  function selectedImagesForLevel\(level, count\) \{.*?\n  \}\n\n  function generateLevel",s,re.S)
if not sel: raise SystemExit('selectedImagesForLevel block not found')
new_sel=r'''  function selectedImagesForLevel(level, count) {
    const n=PICTURE_PATHS.length;
    // Stable permutation mixes categories; 23-position chapter stride guarantees
    // adjacent levels are disjoint while count <= 20 in the 60-image pool.
    const order=Array.from({length:n},(_,i)=>(11+i*37)%n);
    const start=((level-1)*23)%n;
    return Array.from({length:Math.min(count,n)},(_,i)=>order[(start+i)%n]);
  }

  function levelIntroCopy(level) {
    if(level===1)return '拖动碎片，把同一张图的四块拼完整';
    if(level===2)return '消除后，上方牌堆会继续发牌';
    if(level===3)return '拼好的组合可整体拖；按住后拖可拆单块';
    if(level===5)return '连续完成图片，会触发更强的 Combo 反馈';
    if(level===10)return '开始利用拆分与重力，给后续碎片腾位置';
    if(level===15)return '5×5 困难模式 · 观察牌堆、落点与组合';
    if(isHardLevel(level))return '困难关卡 · 更深牌堆与更多图片';
    return GRID===5?'5×5 · 多轮发牌':'4×4 · 多轮发牌';
  }

  function generateLevel'''
s=s[:sel.start()]+new_sel+s[sel.end():]

# 3) Settle first, merge/clear only after gravity has fully stabilized.
rs=s.index('  async function resolveBoard(')
re_=s.index('\n\n\n  async function animateAndClear',rs)
new_resolve=r'''  async function resolveBoard(beforeConnections=new Set(), isPlayerMove=false) {
    game.phase='resolving';
    if (isPlayerMove) game.comboStreak=0;
    game.lastResolveTrace=[];
    let baseline=new Set(beforeConnections);
    let safety=0;

    while (safety++ < 128) {
      // Physics always wins over matching. A transient mid-air 2x2 is not allowed
      // to merge/clear before it reaches a stable resting position.
      game.groups=computeGroups(); game.connections=computeConnections();
      const beforeGravity=new Set(game.connections);
      const moved=await applyGravity();
      if(moved) {
        game.lastResolveTrace.push('gravity');
        baseline=beforeGravity;
        continue;
      }

      // Only a stable board is allowed to create merge feedback or clear pictures.
      game.groups=computeGroups(); game.connections=computeConnections();
      const newIds=new Set();
      for(const edge of game.connections) if(!baseline.has(edge)) edge.split('|').forEach(id=>newIds.add(id));
      if(newIds.size) {
        game.lastResolveTrace.push('merge');
        newIds.forEach((id)=>tileEls.get(id)?.classList.add('merge-pop'));
        audio.merge(); haptic(14);
        await delay(150);
        newIds.forEach((id)=>tileEls.get(id)?.classList.remove('merge-pop'));
      }

      const complete=game.groups.filter(g=>g.complete);
      if(complete.length) {
        game.lastResolveTrace.push('clear');
        game.comboStreak += complete.length;
        game.comboMax=Math.max(game.comboMax,game.comboStreak);
        if(game.comboStreak>=2) showCombo(game.comboStreak);
        else showToast('拼好了！',600);
        await animateAndClear(complete);
        baseline=new Set();
        continue;
      }

      // With no stable completion, deal another small wave. The next loop falls
      // those cards first, giving the level repeated deck beats instead of one dump.
      const beforeDeal=new Set(game.connections);
      const dealt=await dealIntoBoard();
      if(dealt) {
        game.lastResolveTrace.push('deal');
        baseline=beforeDeal;
        continue;
      }
      if (await rescueIfStalled()) { game.lastResolveTrace.push('rescue'); baseline=new Set(); continue; }
      break;
    }

    if(remainingDeckCount()===0 && game.board.every(v=>!v)) { await finishLevel(); return; }
    game.phase='idle';
  }'''
s=s[:rs]+new_resolve+s[re_:]

# 4) More visible deal beats, but shorter animations to keep pace fluid.
s=s.replace('      for(let k=emptyTop.length-1;k>=0&&deck.length;k--){',
'''      const waveCap=game.level<=2?1:2;
      const minK=Math.max(0,emptyTop.length-waveCap);
      for(let k=emptyTop.length-1;k>=minK&&deck.length;k--){''',1)
s=s.replace("      card.style.animationDelay=`${n*38}ms`;", "      card.style.animationDelay=`${n*24}ms`;",1)
s=s.replace('      },270+n*38);', '      },220+n*24);',1)
s=s.replace('    await delay(325+dealt.length*38+390);', '    await delay(250+dealt.length*24+235);',1)

# 5) Tutorial beats and intro copy.
s=s.replace("    dom.introLevel.textContent=String(game.level);dom.introText.textContent=GRID===5?'困难关卡 · 5×5 竖幅拼图':'4×4 竖幅拼图';",
"    dom.introLevel.textContent=String(game.level);dom.introText.textContent=levelIntroCopy(game.level);",1)
s=s.replace("    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('直接拖＝整组；按住后拖＝拆单块；所有悬空块都会下落',3300);}else dom.tutorialHand.classList.remove('is-visible');",
"    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('先拖动一块碎片，和同一张图拼起来',3000);}else dom.tutorialHand.classList.remove('is-visible');",1)
# First-move tutorial message.
move_line='    game.board=validation.board; game.moves++; game.movesSinceClear=(game.movesSinceClear||0)+1; renderBoard(); updateHud();'
if move_line in s:
    s=s.replace(move_line,move_line+"\n    if(game.level===1&&game.moves===1&&!save.tutorialSeen)showToast('很好！拼好的组合可以一起拖，按住后再拖可拆开',2900);",1)
# First clear explains refill/fall.
clear_line='    game.clearedCount+=groups.length;game.movesSinceClear=0;renderBoard();'
if clear_line in s:
    s=s.replace(clear_line,clear_line+"\n    if(game.level===1&&game.clearedCount===groups.length&&!save.tutorialSeen)showToast('完成！空位会先下落，顶部牌堆再继续补牌',3000);",1)

# Export progression + resolver helpers for CI regression.
export_marker='window.__JIGSAW__={'
if export_marker in s:
    s=s.replace('remainingDeckCount,updateBoardLayout,TILE_ASPECT,finishLevel,goHome}',
                'remainingDeckCount,updateBoardLayout,TILE_ASPECT,finishLevel,goHome,resolveBoard,renderBoard,imageCountForLevel,selectedImagesForLevel,levelIntroCopy,pictureCount:PICTURE_PATHS.length}',1)

GAME.write_text(s,encoding='utf-8')

# 6) Offline builder also embeds the new SVG assets.
b=STANDALONE.read_text(encoding='utf-8')
old_loop="""for image_path in sorted((ROOT/'assets'/'pictures-portrait').glob('*.webp')):\n    relative=f'assets/pictures-portrait/{image_path.name}'\n    data_uri='data:image/webp;base64,'+base64.b64encode(image_path.read_bytes()).decode('ascii')\n    js=js.replace(f\"'{relative}'\",f\"'{data_uri}'\")\n"""
new_loop="""assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg'))]\nfor image_path in sorted(assets):\n    relative=image_path.relative_to(ROOT).as_posix()\n    mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else 'image/webp'\n    data_uri=f'data:{mime};base64,'+base64.b64encode(image_path.read_bytes()).decode('ascii')\n    js=js.replace(f\"'{relative}'\",f\"'{data_uri}'\")\n"""
if old_loop not in b: raise SystemExit('standalone image loop not found')
b=b.replace(old_loop,new_loop,1)
STANDALONE.write_text(b,encoding='utf-8')

# 7) Cache bust every core asset.
idx=INDEX.read_text(encoding='utf-8')
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=3.7.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=3.7.0',idx)
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=3.7.0',idx)
INDEX.write_text(idx,encoding='utf-8')

sw=SW.read_text(encoding='utf-8')
sw=re.sub(r"jigsaw-drop-h5-v[0-9.]+","jigsaw-drop-h5-v3.7.0",sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=3.7.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=3.7.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=3.7.0',sw)
SW.write_text(sw,encoding='utf-8')
VERSION.write_text('3.7.0\n',encoding='utf-8')
print('patched v3.7 settle-first progression')
