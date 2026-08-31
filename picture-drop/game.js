(() => {
  'use strict';

  let GRID = 4;
  let CELL_COUNT = GRID * GRID;
  const STORAGE_KEY = 'jigsaw-drop-h5-v2';
  const PICTURE_PATHS = [
    'assets/pictures-portrait/01-alpine-lake.webp',
    'assets/pictures-portrait/02-blue-alley.webp',
    'assets/pictures-portrait/03-golden-dog.webp',
    'assets/pictures-portrait/04-white-cat.webp',
    'assets/pictures-portrait/05-red-roses.webp',
    'assets/pictures-portrait/06-berry-basket.webp',
    'assets/pictures-portrait/07-vintage-phone.webp',
    'assets/pictures-portrait/08-city-bicycle.webp',
    'assets/pictures-portrait/09-tropical-beach.webp',
    'assets/pictures-portrait/10-hot-air-balloons.webp',
    'assets/pictures-portrait/11-neon-city.webp',
    'assets/pictures-portrait/12-autumn-forest.webp',
    'assets/pictures-portrait/13-mountain-cabin.webp',
    'assets/pictures-portrait/14-coffee-cup.webp',
    'assets/pictures-portrait/15-macarons.webp',
    'assets/pictures-portrait/16-sushi.webp',
    'assets/pictures-portrait/17-lemon-drink.webp',
    'assets/pictures-portrait/18-violin.webp',
    'assets/pictures-portrait/19-astronaut.webp',
    'assets/pictures-portrait/20-moon-castle.webp',
    'assets/pictures-portrait/21-waterfall.webp',
    'assets/pictures-portrait/22-lavender-field.webp',
    'assets/pictures-portrait/23-sunflower-field.webp',
    'assets/pictures-portrait/24-snow-village.webp',
    'assets/pictures-portrait/25-lighthouse.webp',
    'assets/pictures-portrait/26-red-car.webp',
    'assets/pictures-portrait/27-parrot.webp',
    'assets/pictures-portrait/28-fox.webp',
    'assets/pictures-portrait/29-koi-pond.webp',
    'assets/pictures-portrait/30-library.webp',
    'assets/pictures-portrait/31-cathedral.webp',
    'assets/pictures-portrait/32-desert.webp',
    'assets/pictures-portrait/33-sailboat.webp',
    'assets/pictures-portrait/34-cherry-bridge.webp',
    'assets/pictures-portrait/35-tropical-fish.webp',
    'assets/pictures-portrait/36-old-train.webp'
  ];
  const PICTURE_NAMES = [
    '高山湖泊','蓝白小巷','金毛伙伴','白猫','红玫瑰','莓果篮','复古电话','城市单车','热带海滩',
    '热气球','霓虹城市','秋日森林','山间木屋','咖啡时光','马卡龙','寿司拼盘','柠檬汽水','小提琴',
    '太空漫游','月夜城堡','林间瀑布','薰衣草田','向日葵','雪中小镇','海边灯塔','红色跑车','彩色鹦鹉',
    '森林狐狸','锦鲤池','老图书馆','古老教堂','沙漠旅人','白帆船','樱花桥','热带鱼','山间火车'
  ];
  PICTURE_PATHS.push(...[
    'assets/pictures-extra/37-jellyfish.svg',
    'assets/pictures-extra/38-ramen.svg',
    'assets/pictures-extra/39-skateboard.svg',
    'assets/pictures-extra/40-rain-window.svg',
    'assets/pictures-extra/41-arcade.svg',
    'assets/pictures-extra/42-vinyl.svg',
    'assets/pictures-extra/43-sakura.svg',
    'assets/pictures-extra/44-hot-spring.svg',
    'assets/pictures-extra/45-panda.svg',
    'assets/pictures-extra/46-penguin.svg',
    'assets/pictures-extra/47-robot.svg',
    'assets/pictures-extra/48-submarine.svg',
    'assets/pictures-extra/49-whale.svg',
    'assets/pictures-extra/50-dinosaur.svg',
    'assets/pictures-extra/51-bakery.svg',
    'assets/pictures-extra/52-pottery.svg',
    'assets/pictures-extra/53-ferris-wheel.svg',
    'assets/pictures-extra/54-telescope.svg',
    'assets/pictures-extra/55-camper.svg',
    'assets/pictures-extra/56-basketball.svg',
    'assets/pictures-extra/57-tea-house.svg',
    'assets/pictures-extra/58-lantern-alley.svg',
    'assets/pictures-extra/59-aurora-tent.svg',
    'assets/pictures-extra/60-windmill.svg'
  ]);
  PICTURE_NAMES.push(...[
    '水母夜游',
    '拉面小馆',
    '滑板公园',
    '雨夜窗景',
    '街机房',
    '黑胶唱片',
    '樱花坡道',
    '山间温泉',
    '竹林熊猫',
    '冰原企鹅',
    '机器人工作间',
    '深海潜艇',
    '蓝鲸跃海',
    '恐龙谷',
    '清晨面包店',
    '陶艺工坊',
    '夜色摩天轮',
    '星空望远镜',
    '露营房车',
    '夕阳球场',
    '茶屋庭院',
    '灯笼小巷',
    '极光帐篷',
    '风车麦田'
  ]);

  const QUADRANTS = [
    { x: 0, y: 0, bg: '0% 0%' },
    { x: 1, y: 0, bg: '100% 0%' },
    { x: 0, y: 1, bg: '0% 100%' },
    { x: 1, y: 1, bg: '100% 100%' }
  ];

  const $ = (id) => document.getElementById(id);
  const dom = {
    splash: $('splash'), homeScreen: $('homeScreen'), playScreen: $('playScreen'), winScreen: $('winScreen'),
    settingsModal: $('settingsModal'), galleryModal: $('galleryModal'), levelIntro: $('levelIntro'),
    homeSettingsBtn: $('homeSettingsBtn'), homeStars: $('homeStars'), homeLevel: $('homeLevel'), homePreview: $('homePreview'),
    playBtn: $('playBtn'), galleryBtn: $('galleryBtn'), galleryCount: $('galleryCount'), levelNumber: $('levelNumber'),
    settingsBtn: $('settingsBtn'), autoBtn: $('autoBtn'), hintBtn: $('hintBtn'), autoCount: $('autoCount'), hintCount: $('hintCount'),
    deckArea: $('deckArea'), board: $('board'), cellLayer: $('cellLayer'), tileLayer: $('tileLayer'), fxLayer: $('fxLayer'),
    juiceCanvas: $('juiceCanvas'), chainStatus: $('chainStatus'), flowMeter: $('flowMeter'), flowFill: $('flowFill'), flowText: $('flowText'),
    tutorialHand: $('tutorialHand'), timeText: $('timeText'), moveText: $('moveText'), progressBar: $('progressBar'),
    comboToast: $('comboToast'), messageToast: $('messageToast'), winTime: $('winTime'), winMoves: $('winMoves'),
    winCombo: $('winCombo'), starRow: $('starRow'), nextBtn: $('nextBtn'), replayBtn: $('replayBtn'), unlockedStrip: $('unlockedStrip'),
    confettiCanvas: $('confettiCanvas'), soundToggle: $('soundToggle'), vibrationToggle: $('vibrationToggle'),
    resumeBtn: $('resumeBtn'), restartBtn: $('restartBtn'), homeBtn: $('homeBtn'), galleryGrid: $('galleryGrid'),
    introLevel: $('introLevel'), introText: $('introText')
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const idxToRC = (index) => ({ r: Math.floor(index / GRID), c: index % GRID });
  const rcToIdx = (r, c) => r * GRID + c;
  const pairKey = (a, b) => a < b ? `${a}|${b}` : `${b}|${a}`;
  const TILE_ASPECT = 0.69;

  function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function shuffle(array, rnd = Math.random) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function loadSave() {
    const defaults = {
      level: 1,
      totalStars: 0,
      stars: {},
      best: {},
      unlocked: [],
      tutorialSeen: false,
      settings: { sound: true, vibration: true }
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        ...defaults,
        ...parsed,
        stars: { ...defaults.stars, ...(parsed.stars || {}) },
        best: { ...defaults.best, ...(parsed.best || {}) },
        settings: { ...defaults.settings, ...(parsed.settings || {}) },
        unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : []
      };
    } catch (error) {
      console.warn('存档读取失败', error);
      return defaults;
    }
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(save)); }
    catch (error) { console.warn('存档写入失败', error); }
  }
  const save = loadSave();

  class AudioEngine {
    constructor() { this.ctx = null; this.master = null; this.noiseBuffer = null; }
    ensure() {
      if (!save.settings.sound) return false;
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.22;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return true;
    }
    tone(freq, duration = .08, type = 'sine', gain = .13, when = 0, endFreq = null) {
      if (!this.ensure()) return;
      const now = this.ctx.currentTime + when;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, now);
      if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
      g.gain.setValueAtTime(.0001, now);
      g.gain.exponentialRampToValueAtTime(gain, now + .012);
      g.gain.exponentialRampToValueAtTime(.0001, now + duration);
      osc.connect(g); g.connect(this.master); osc.start(now); osc.stop(now + duration + .02);
    }
    noise(duration = .08, gain = .05, when = 0) {
      if (!this.ensure()) return;
      if (!this.noiseBuffer) {
        const length=Math.max(1,Math.floor(this.ctx.sampleRate*.28));
        this.noiseBuffer=this.ctx.createBuffer(1,length,this.ctx.sampleRate);
        const data=this.noiseBuffer.getChannelData(0);
        for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length*.72);
      }
      const now=this.ctx.currentTime+when;
      const src=this.ctx.createBufferSource(),g=this.ctx.createGain();
      src.buffer=this.noiseBuffer;
      g.gain.setValueAtTime(.0001,now);
      g.gain.exponentialRampToValueAtTime(gain,now+.008);
      g.gain.exponentialRampToValueAtTime(.0001,now+duration);
      src.connect(g);g.connect(this.master);src.start(now);src.stop(now+duration+.02);
    }
    tap() { this.tone(430, .045, 'triangle', .07, 0, 560); }
    swap() { this.tone(240, .09, 'triangle', .09, 0, 420); this.tone(430, .07, 'sine', .055, .045, 540); }
    merge() { this.mergeStage(2); }
    mergeStage(size=2) {
      const stage=Math.max(2,Math.min(4,size));
      const root=stage===2?610:stage===3?720:840;
      this.tone(root,.085,'sine',.075,0,root*1.18);
      this.tone(root*1.34,.095,'triangle',.052,.035,root*1.55);
      if(stage>=3)this.tone(root*.52,.11,'sine',.048,0,root*.68);
    }
    chain(level=1,fever=false) {
      const tier=Math.max(1,Math.min(5,level));
      const notes=[523.25,659.25,783.99,1046.5,1318.51];
      const root=notes[tier-1];
      this.tone(root,.15,'triangle',.09,0,root*1.04);
      this.tone(root*1.5,.17,'sine',.06,.025,root*1.62);
      this.tone(Math.max(92,root/4),.19,'sine',.075,0,Math.max(110,root/3.4));
      this.noise(.11,.018+tier*.006,.02);
      if(tier>=3)this.tone(root*2,.12,'sine',.04,.075,root*2.15);
      if(fever)this.tone(root*.75,.24,'sawtooth',.032,0,root*1.02);
    }
    clear() { this.chain(1,false); }
    drop(distance=1) {
      const d=Math.max(1,Math.min(5,distance));
      this.tone(170-d*9,.055+d*.008,'triangle',.038+d*.006,0,205-d*5);
    }
    feverStart() {
      [523,659,784,1046].forEach((f,i)=>this.tone(f,.28,'triangle',.055,i*.065,f*1.02));
      this.noise(.16,.025,.12);
    }
    feverEnd() { this.tone(740,.18,'sine',.05,0,390); }
    deal() { this.tone(190, .055, 'triangle', .055, 0, 245); }
    invalid() { this.tone(170, .13, 'sawtooth', .045, 0, 130); }
    win() { [523,659,784,1046].forEach((f,i)=>this.tone(f,.32,'triangle',.085,i*.12,f*1.01)); }
  }
  const audio = new AudioEngine();
  function haptic(pattern = 12) {
    if (save.settings.vibration && navigator.vibrate) navigator.vibrate(pattern);
  }


  class JuiceDirector {
    constructor(canvas,board) {
      this.canvas=canvas;this.board=board;this.ctx=canvas?.getContext('2d')||null;
      this.pool=Array.from({length:280},()=>({active:false}));
      this.rings=[];this.beams=[];this.raf=0;this.last=0;this.w=1;this.h=1;this.dpr=1;this.lastCenter=null;
    }
    resize() {
      if(!this.canvas||!this.ctx||!this.board)return;
      const rect=this.board.getBoundingClientRect();if(rect.width<2||rect.height<2)return;
      this.w=rect.width;this.h=rect.height;this.dpr=Math.min(2,window.devicePixelRatio||1);
      const pw=Math.round(this.w*this.dpr),ph=Math.round(this.h*this.dpr);
      if(this.canvas.width!==pw||this.canvas.height!==ph){this.canvas.width=pw;this.canvas.height=ph;}
      this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    }
    reset() {
      cancelAnimationFrame(this.raf);this.raf=0;this.last=0;this.lastCenter=null;this.rings.length=0;this.beams.length=0;
      this.pool.forEach(p=>p.active=false);if(this.ctx)this.ctx.clearRect(0,0,this.w,this.h);
    }
    ensureLoop() { if(!this.raf)this.raf=requestAnimationFrame(t=>this.frame(t)); }
    particle(x,y,tier=1,color=null) {
      const p=this.pool.find(v=>!v.active);if(!p)return;
      const a=Math.random()*Math.PI*2,s=1.9+Math.random()*(2.5+tier*.65);
      Object.assign(p,{active:true,x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.1,life:1,max:1,size:2+Math.random()*(2.2+tier*.5),rot:Math.random()*6.28,vr:(Math.random()-.5)*.22,color:color||['#fff57d','#75f6ff','#ffffff','#ff86cf','#7dffab'][Math.floor(Math.random()*5)]});
    }
    burstPercent(xp,yp,tier=1,count=0) {
      const x=xp/100*this.w,y=yp/100*this.h,n=count||Math.min(52,14+tier*8);
      for(let i=0;i<n;i++)this.particle(x,y,tier);
      this.rings.push({x,y,r:8,max:42+tier*13,life:1,tier});this.ensureLoop();
    }
    beamPercent(a,b,tier=1) {
      if(!a||!b)return;
      this.beams.push({x1:a.x/100*this.w,y1:a.y/100*this.h,x2:b.x/100*this.w,y2:b.y/100*this.h,life:1,tier});this.ensureLoop();
    }
    mergeGroup(group) {
      const rect=groupRectPercent(group),center={x:rect.left+rect.width/2,y:rect.top+rect.height/2};
      this.burstPercent(center.x,center.y,Math.min(3,Math.max(1,group.ids.length-1)),8+group.ids.length*3);
    }
    clearGroups(groups,tier=1) {
      const centers=[];
      groups.forEach(group=>{const r=groupRectPercent(group);centers.push({x:r.left+r.width/2,y:r.top+r.height/2});});
      centers.forEach((center,i)=>{
        if(i===0&&this.lastCenter)this.beamPercent(this.lastCenter,center,tier);
        if(i>0)this.beamPercent(centers[i-1],center,tier);
        this.burstPercent(center.x,center.y,tier);
      });
      if(centers.length)this.lastCenter=centers[centers.length-1];
      this.pulse(tier);
    }
    pulse(tier=1) {
      const wrap=this.board?.closest('.board-wrap');if(!wrap)return;
      const cls=`juice-hit-${Math.min(5,tier)}`;
      wrap.classList.remove('juice-hit-1','juice-hit-2','juice-hit-3','juice-hit-4','juice-hit-5');
      requestAnimationFrame(()=>wrap.classList.add(cls));
      setTimeout(()=>wrap.classList.remove(cls),300);
      dom.deckArea?.classList.add('deck-react');setTimeout(()=>dom.deckArea?.classList.remove('deck-react'),260);
    }
    frame(now) {
      this.raf=0;if(!this.ctx)return;
      const dt=Math.min(2.1,Math.max(.45,(this.last?now-this.last:16.7)/16.7));this.last=now;
      const ctx=this.ctx;ctx.clearRect(0,0,this.w,this.h);ctx.save();ctx.globalCompositeOperation='lighter';
      let active=false;
      this.beams=this.beams.filter(b=>{
        b.life-=.075*dt;if(b.life<=0)return false;active=true;
        ctx.globalAlpha=Math.min(1,b.life)*.8;ctx.strokeStyle=b.tier>=4?'#fff59a':'#7bf7ff';ctx.lineWidth=2+b.tier*.55;
        ctx.beginPath();ctx.moveTo(b.x1,b.y1);ctx.lineTo(b.x2,b.y2);ctx.stroke();return true;
      });
      this.rings=this.rings.filter(r=>{
        r.life-=.052*dt;if(r.life<=0)return false;active=true;r.r+=(r.max-r.r)*.16*dt;
        ctx.globalAlpha=r.life*.72;ctx.strokeStyle=r.tier>=3?'#fff378':'#80f8ff';ctx.lineWidth=1.5+r.tier*.45;
        ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.stroke();return true;
      });
      for(const p of this.pool){
        if(!p.active)continue;p.life-=.035*dt;if(p.life<=0){p.active=false;continue;}active=true;
        p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.085*dt;p.vx*=Math.pow(.985,dt);p.rot+=p.vr*dt;
        ctx.globalAlpha=Math.min(1,p.life*1.45);ctx.fillStyle=p.color;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
        ctx.fillRect(-p.size,-p.size*.36,p.size*2,p.size*.72);ctx.restore();
      }
      ctx.restore();if(active)this.ensureLoop();else this.last=0;
    }
  }
  const juice=new JuiceDirector(dom.juiceCanvas,dom.board);

  const game = {
    level: save.level,
    phase: 'boot',
    board: Array(CELL_COUNT).fill(null),
    tiles: new Map(),
    decks: [],
    selectedImages: [],
    totalImages: 0,
    clearedImages: [],
    clearedCount: 0,
    moves: 0,
    comboMax: 1,
    comboStreak: 0,
    hintCount: 3,
    autoCount: 3,
    groups: [],
    connections: new Set(),
    drag: null,
    timerBase: 0,
    timerStartedAt: 0,
    timerRunning: false,
    timerRaf: 0,
    modalPreviousPhase: null,
    toastTimer: 0,
    hintTimer: 0,
    initialSeed: 0,
    generation: null,
    unlockedThisLevel: [],
    movesSinceClear: 0,
    turnChain: 0,
    turnCleared: 0,
    streakCombo: 0,
    streakGrace: 0,
    flowEnergy: 0,
    feverActive: false,
    feverTurns: 0,
    feverStartedThisTurn: false,
    lastChainPrediction: null,
    lastResolveTrace: []
  };

  const tileEls = new Map();
  const cellEls = [];
  const joinedSurfaceEls = new Map();

  function updateBoardLayout() {
    const stage = document.getElementById('gameStage');
    const area = dom.board.closest('.game-area');
    const wrap = dom.board.parentElement;
    if (!stage || !area || !wrap) return;

    const stageW = stage.clientWidth || window.innerWidth || 390;
    const areaH = area.clientHeight || Math.max(520, (stage.clientHeight || window.innerHeight || 844) - 64);
    const deckH = GRID >= 5 ? 64 : 62;
    const statusH = 40;
    const verticalSlack = 16;
    const maxW = Math.max(250, Math.min(stageW - 18, 420));
    const maxH = Math.max(360, areaH - deckH - statusH - verticalSlack);
    const boardW = Math.max(238, Math.min(maxW, maxH * TILE_ASPECT));
    const boardH = boardW / TILE_ASPECT;

    // CSS uses !important on the wrapper, so update the custom properties
    // that those rules consume instead of relying only on inline width/height.
    document.documentElement.style.setProperty('--board-w', `${boardW}px`);
    document.documentElement.style.setProperty('--board-h', `${boardH}px`);
    wrap.style.setProperty('width', `${boardW}px`, 'important');
    wrap.style.setProperty('height', `${boardH}px`, 'important');
    dom.deckArea.style.setProperty('width', `${boardW}px`, 'important');
    const status = dom.board.closest('.game-area')?.querySelector('.status-row');
    if (status) status.style.setProperty('width', `${boardW}px`, 'important');
    dom.board.style.setProperty('--live-board-w', `${boardW}px`);
    dom.board.style.setProperty('--live-board-h', `${boardH}px`);
    juice.resize();
  }

  function gridMetrics() {
    // The original keeps a narrow blue gutter between unrelated cells.
    // Connected pieces bridge that gutter, so a joined image reads as one shape.
    const gap = 0;
    const cell = 100 / GRID;
    return { gap, cell, step: cell + gap };
  }

  function cellRectPercentByRC(r, c) {
    const m = gridMetrics();
    return { left: c * m.step, top: r * m.step, width: m.cell, height: m.cell, gap: m.gap, step: m.step };
  }

  function cellRectPercent(index) {
    const { r, c } = idxToRC(index);
    return cellRectPercentByRC(r, c);
  }

  function groupRectPercent(group) {
    const m = gridMetrics();
    return {
      left: group.minC * m.step,
      top: group.minR * m.step,
      width: (group.maxC - group.minC + 1) * m.cell + (group.maxC - group.minC) * m.gap,
      height: (group.maxR - group.minR + 1) * m.cell + (group.maxR - group.minR) * m.gap
    };
  }

  function applyBaseGeometry(el, index) {
    const g = cellRectPercent(index);
    el.style.left = `${g.left}%`;
    el.style.top = `${g.top}%`;
    el.style.width = `${g.width}%`;
    el.style.height = `${g.height}%`;
  }

  function applyTileGeometry(el, index, join) {
    const g = cellRectPercent(index);
    // Tiles always keep the exact cell rectangle. Joined seams are removed only by
    // borders/radii, so all four 200% background quadrants line up pixel-perfectly.
    el.style.left = `${g.left}%`;
    el.style.top = `${g.top}%`;
    el.style.width = `${g.width}%`;
    el.style.height = `${g.height}%`;
  }

  function configureGrid(size) {
    GRID = Math.max(4, Math.min(5, Number(size) || 4));
    CELL_COUNT = GRID * GRID;
    game.board = Array(CELL_COUNT).fill(null);
    game.decks = Array.from({ length: GRID }, () => []);
    dom.board.dataset.grid = String(GRID);
    document.getElementById('gameStage')?.setAttribute('data-grid', String(GRID));

    dom.cellLayer.innerHTML = '';
    cellEls.length = 0;
    for (let i = 0; i < CELL_COUNT; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = String(i);
      applyBaseGeometry(cell, i);
      dom.cellLayer.appendChild(cell);
      cellEls.push(cell);
    }

    dom.deckArea.innerHTML = '';
    dom.deckArea.style.gridTemplateColumns = `repeat(${GRID}, 1fr)`;
    for (let c = 0; c < GRID; c++) {
      const col = document.createElement('div');
      col.className = 'deck-column';
      col.dataset.col = String(c);
      col.innerHTML = '<div class="deck-stack"></div><div class="next-card"><i></i></div><span class="deck-count"></span>';
      dom.deckArea.appendChild(col);
    }
    updateBoardLayout();
  }


  configureGrid(4);

  function showOnly(screen) {
    [dom.splash, dom.homeScreen, dom.playScreen].forEach((el) => el.classList.toggle('is-visible', el === screen));
  }
  function showModal(modal) {
    [dom.settingsModal, dom.galleryModal].forEach((el) => el.classList.toggle('is-visible', el === modal));
  }
  function hideModals() {
    [dom.settingsModal, dom.galleryModal].forEach((el) => el.classList.remove('is-visible'));
  }

  function updateHome() {
    dom.homeStars.textContent = String(save.totalStars || 0);
    dom.homeLevel.textContent = String(save.level || 1);
    dom.galleryCount.textContent = `${save.unlocked.length} / ${PICTURE_PATHS.length}`;
    const imageIndex = ((save.level - 1) * 5) % PICTURE_PATHS.length;
    dom.homePreview.innerHTML = '';
    for (let q = 0; q < 4; q++) {
      const piece = document.createElement('div'); piece.className = 'preview-piece';
      piece.style.backgroundImage = `url("${PICTURE_PATHS[imageIndex]}")`;
      piece.style.backgroundPosition = QUADRANTS[q].bg;
      dom.homePreview.appendChild(piece);
    }
    renderGallery();
  }

  function isHardLevel(level) {
    return level >= 15 && level % 5 === 0;
  }

  function gridForLevel(level) {
    // Video evidence: L14 is 4x4 / four piles; L15 expands to 5x5 / five piles.
    return level >= 15 ? 5 : 4;
  }

  function imageCountForLevel(level) {
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

  function warmLevelImages(indices) {
    if (!indices || !indices.length) return;
    indices.forEach((imageIndex)=>{
      const img=new Image();
      img.decoding='async';
      img.src=PICTURE_PATHS[imageIndex];
      if (img.decode) img.decode().catch(()=>{});
    });
  }

  function selectedImagesForLevel(level, count) {
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

  function generateLevel(level) {
    const seed = (level * 2654435761 + 9109) >>> 0;
    const rnd = mulberry32(seed);
    const imageCount = imageCountForLevel(level);
    const selected = selectedImagesForLevel(level, imageCount);
    const tiles = new Map();
    const byImage = new Map();
    selected.forEach((imageIndex, imageOrder) => {
      const arr = [];
      for (let q = 0; q < 4; q++) {
        const id = `L${level}-I${imageIndex}-Q${q}`;
        const tile = { id, imageIndex, imageOrder, quadrant: q };
        tiles.set(id, tile); arr.push(id);
      }
      byImage.set(imageIndex, arr);
    });

    const allIds = [...tiles.keys()];
    shuffle(allIds, rnd);
    const board = allIds.splice(0, CELL_COUNT);
    const decks = Array.from({ length: GRID }, () => []);
    allIds.forEach((id, i) => decks[i % GRID].push(id));
    decks.forEach((deck) => shuffle(deck, rnd));

    const locateAndSwapIntoCell = (id, targetCell) => {
      const existing = board[targetCell];
      const boardPos = board.indexOf(id);
      if (boardPos >= 0) {
        [board[boardPos], board[targetCell]] = [board[targetCell], board[boardPos]];
        return;
      }
      for (let c = 0; c < decks.length; c++) {
        const p = decks[c].indexOf(id);
        if (p >= 0) {
          decks[c][p] = existing;
          board[targetCell] = id;
          return;
        }
      }
      throw new Error(`tile location missing: ${id}`);
    };

    const locateAndSwapIntoDeckSlot=(id,col,pos=0)=>{
      const target=decks[col]?.[pos];
      if(target===id)return;
      const boardPos=board.indexOf(id);
      if(boardPos>=0){
        board[boardPos]=target||null;decks[col][pos]=id;return;
      }
      for(let dc=0;dc<decks.length;dc++){
        const p=decks[dc].indexOf(id);
        if(p<0)continue;
        decks[dc][p]=target;decks[col][pos]=id;return;
      }
      throw new Error(`deck tile location missing: ${id}`);
    };

    // The reference starts with several already-joined 2/3-piece shapes.
    const patterns = GRID === 5
      ? [[0,1],[0,2],[2,3],[1,3],[0,1,2],[0,2,3]]
      : [[0,1],[0,2],[2,3],[0,1,2]];
    const anchors = [];
    for (let r = 0; r < GRID - 1; r++) for (let c = 0; c < GRID - 1; c++) anchors.push([r,c]);
    shuffle(anchors, rnd);
    const used = new Set();
    for (let k = 0; k < Math.min(patterns.length, selected.length, anchors.length); k++) {
      const imageIndex = selected[k];
      const pattern = patterns[k % patterns.length];
      let chosen = null;
      for (const anchor of anchors) {
        const cells = pattern.map((q) => rcToIdx(anchor[0] + QUADRANTS[q].y, anchor[1] + QUADRANTS[q].x));
        if (cells.every((cell) => !used.has(cell))) { chosen = { anchor, cells }; break; }
      }
      if (!chosen) continue;
      pattern.forEach((q, i) => {
        locateAndSwapIntoCell(byImage.get(imageIndex)[q], chosen.cells[i]);
        used.add(chosen.cells[i]);
      });
    }

    let chainSeed=null;
    if(level>=3&&selected.length>=3){
      const depth=level>=5?3:2;
      const chainImages=selected.slice(-depth);
      const anchors=[[0,GRID-2],[1,GRID-3],[2,GRID-4]];
      const protectedCells=new Set();
      const idsA=byImage.get(chainImages[0]),a=anchors[0];
      const aTargets=[0,1,2,3].map(q=>rcToIdx(a[0]+QUADRANTS[q].y,a[1]+QUADRANTS[q].x));
      [0,1,2].forEach(q=>{locateAndSwapIntoCell(idsA[q],aTargets[q]);protectedCells.add(aTargets[q]);});
      const sourceCandidates=Array.from({length:CELL_COUNT},(_,i)=>CELL_COUNT-1-i).filter(i=>!protectedCells.has(i)&&i!==aTargets[3]);
      const sourceCell=sourceCandidates[0];locateAndSwapIntoCell(idsA[3],sourceCell);protectedCells.add(sourceCell);

      for(let stage=1;stage<depth;stage++){
        const ids=byImage.get(chainImages[stage]),anchor=anchors[stage];
        const targets=[0,1,2,3].map(q=>rcToIdx(anchor[0]+QUADRANTS[q].y,anchor[1]+QUADRANTS[q].x));
        [0,2,3].forEach(q=>{locateAndSwapIntoCell(ids[q],targets[q]);protectedCells.add(targets[q]);});
        if(stage===1){
          locateAndSwapIntoDeckSlot(ids[1],anchor[1]+1,0);
        }else{
          // The third chain's missing top-right quarter waits above the shared
          // B/C cell. When B clears, gravity—not an arbitrary extra deal—drops it
          // through the two cleared cells into C's final position.
          const feederCell=rcToIdx(0,anchor[1]+1);
          locateAndSwapIntoCell(ids[1],feederCell);protectedCells.add(feederCell);
        }
      }
      chainSeed={depth,starterId:idsA[3],targetCell:aTargets[3],protectedCells:[...protectedCells],images:chainImages};
    }

    // Never begin with an immediately complete 2x2 image.
    const chainProtected=new Set(chainSeed?.protectedCells||[]);
    let guard = 0;
    while (findCompleteGroups(board, tiles).length && guard++ < 80) {
      const group = findCompleteGroups(board, tiles)[0];
      const cell = group.cells[group.cells.length - 1];
      let other = Math.floor(rnd() * CELL_COUNT);
      let tries = 0;
      while ((group.cells.includes(other) || chainProtected.has(other) || tiles.get(board[other])?.imageIndex === group.imageIndex) && tries++ < 40) {
        other = Math.floor(rnd() * CELL_COUNT);
      }
      [board[cell], board[other]] = [board[other], board[cell]];
    }

    return { seed, board, decks, tiles, selected, imageCount, grid: GRID, chainSeed };
  }


  function isCompatibleEdge(tileA, tileB, dr, dc) {
    if (!tileA || !tileB || tileA.imageIndex !== tileB.imageIndex) return false;
    const qa = QUADRANTS[tileA.quadrant], qb = QUADRANTS[tileB.quadrant];
    return qb.y - qa.y === dr && qb.x - qa.x === dc;
  }

  function computeConnections(board = game.board, tiles = game.tiles) {
    const edges = new Set();
    for (let i = 0; i < CELL_COUNT; i++) {
      const id = board[i]; if (!id) continue;
      const tile = tiles.get(id); const { r, c } = idxToRC(i);
      if (c < GRID - 1 && board[i + 1] && isCompatibleEdge(tile, tiles.get(board[i + 1]), 0, 1)) edges.add(pairKey(id, board[i + 1]));
      if (r < GRID - 1 && board[i + GRID] && isCompatibleEdge(tile, tiles.get(board[i + GRID]), 1, 0)) edges.add(pairKey(id, board[i + GRID]));
    }
    return edges;
  }

  function computeGroups(board = game.board, tiles = game.tiles) {
    const adjacency = new Map();
    board.forEach((id) => { if (id) adjacency.set(id, []); });
    const connect = (a, b) => { adjacency.get(a).push(b); adjacency.get(b).push(a); };
    for (let i = 0; i < CELL_COUNT; i++) {
      const id = board[i]; if (!id) continue;
      const tile = tiles.get(id); const { r, c } = idxToRC(i);
      if (c < GRID - 1 && board[i + 1] && isCompatibleEdge(tile, tiles.get(board[i + 1]), 0, 1)) connect(id, board[i + 1]);
      if (r < GRID - 1 && board[i + GRID] && isCompatibleEdge(tile, tiles.get(board[i + GRID]), 1, 0)) connect(id, board[i + GRID]);
    }
    const seen = new Set(); const groups = [];
    for (const id of adjacency.keys()) {
      if (seen.has(id)) continue;
      const stack = [id], ids = []; seen.add(id);
      while (stack.length) {
        const cur = stack.pop(); ids.push(cur);
        for (const next of adjacency.get(cur)) if (!seen.has(next)) { seen.add(next); stack.push(next); }
      }
      const cells = ids.map((tileId) => board.indexOf(tileId)).sort((a,b)=>a-b);
      const coords = cells.map(idxToRC);
      const minR = Math.min(...coords.map(p=>p.r)), maxR = Math.max(...coords.map(p=>p.r));
      const minC = Math.min(...coords.map(p=>p.c)), maxC = Math.max(...coords.map(p=>p.c));
      const imageIndex = tiles.get(ids[0]).imageIndex;
      const quadrants = new Set(ids.map((tileId) => tiles.get(tileId).quadrant));
      const complete = ids.length === 4 && quadrants.size === 4 && maxR - minR === 1 && maxC - minC === 1;
      groups.push({ key: ids.slice().sort().join(','), ids, cells, imageIndex, minR, maxR, minC, maxC, complete });
    }
    return groups;
  }

  function findCompleteGroups(board = game.board, tiles = game.tiles) {
    return computeGroups(board, tiles).filter((g) => g.complete);
  }

  function groupAtCell(index, groups = game.groups) {
    return groups.find((g) => g.cells.includes(index)) || null;
  }

  function ensureTileElement(tile) {
    let el = tileEls.get(tile.id);
    if (!el) {
      el = document.createElement('div');
      el.className = 'tile'; el.dataset.tileId = tile.id;
      el.style.pointerEvents = 'auto';
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `${PICTURE_NAMES[tile.imageIndex]}的第${tile.quadrant + 1}块碎片`);
      const pieceImage=`url("${PICTURE_PATHS[tile.imageIndex]}")`;
      el.style.backgroundImage = pieceImage;
      el.style.setProperty('--piece-image',pieceImage);
      el.style.backgroundPosition = QUADRANTS[tile.quadrant].bg;
      el.addEventListener('pointerdown', onTilePointerDown);
      tileEls.set(tile.id, el); dom.tileLayer.appendChild(el);
    }
    return el;
  }

  function clearJoinedSurfaces() {
    joinedSurfaceEls.forEach(el=>el.remove());
    joinedSurfaceEls.clear();
  }

  function quadrantClipPath(quadrants) {
    const key=[...quadrants].sort((a,b)=>a-b).join('');
    const paths={
      '01':'polygon(0 0,100% 0,100% 50%,0 50%)',
      '23':'polygon(0 50%,100% 50%,100% 100%,0 100%)',
      '02':'polygon(0 0,50% 0,50% 100%,0 100%)',
      '13':'polygon(50% 0,100% 0,100% 100%,50% 100%)',
      '012':'polygon(0 0,100% 0,100% 50%,50% 50%,50% 100%,0 100%)',
      '013':'polygon(0 0,100% 0,100% 100%,50% 100%,50% 50%,0 50%)',
      '023':'polygon(0 0,50% 0,50% 50%,100% 50%,100% 100%,0 100%)',
      '123':'polygon(50% 0,100% 0,100% 100%,0 100%,0 50%,50% 50%)',
      '0123':'inset(0)'
    };
    return paths[key]||'inset(0)';
  }

  function createJoinedSurface(group, hiddenIds=new Set()) {
    if(group.ids.length<2||group.ids.some(id=>hiddenIds.has(id)))return null;
    const firstId=group.ids[0], firstCell=game.board.indexOf(firstId);
    if(firstCell<0)return null;
    const tile=game.tiles.get(firstId), p=idxToRC(firstCell), q=QUADRANTS[tile.quadrant];
    const originR=p.r-q.y, originC=p.c-q.x, m=gridMetrics();
    const quadrants=new Set(group.ids.map(id=>game.tiles.get(id).quadrant));
    const el=document.createElement('div');
    el.className='joined-surface';el.dataset.groupKey=group.key;
    el.style.left=`${originC*m.step}%`;el.style.top=`${originR*m.step}%`;
    el.style.width=`${m.cell*2}%`;el.style.height=`${m.cell*2}%`;
    el.style.backgroundImage=`url(\"${PICTURE_PATHS[group.imageIndex]}\")`;
    el.style.clipPath=quadrantClipPath(quadrants);
    el.style.webkitClipPath=quadrantClipPath(quadrants);
    el.style.zIndex=String(5+Math.max(0,group.minR));
    dom.tileLayer.appendChild(el);joinedSurfaceEls.set(group.key,el);
    group.ids.forEach(id=>tileEls.get(id)?.classList.add('is-surface-member'));
    return el;
  }

  function suspendJoinedSurface(group,active) {
    if(!group)return;
    group.ids.forEach(id=>tileEls.get(id)?.classList.toggle('surface-drag-raw',active));
    const surface=joinedSurfaceEls.get(group.key);
    if(surface)surface.classList.toggle('is-suspended',active);
  }

  function renderBoard(options = {}) {
    const hiddenIds = options.hiddenIds || new Set();
    const suppressJoinedSurfaces=!!options.suppressJoinedSurfaces;
    clearJoinedSurfaces();
    game.groups = computeGroups();
    game.connections = computeConnections();
    const joinMap = new Map();
    game.board.forEach((id) => { if (id) joinMap.set(id, { left:false,right:false,up:false,down:false }); });
    for (let i = 0; i < CELL_COUNT; i++) {
      const id = game.board[i]; if (!id) continue;
      const tile = game.tiles.get(id); const {r,c}=idxToRC(i);
      if (c>0 && game.board[i-1] && isCompatibleEdge(game.tiles.get(game.board[i-1]),tile,0,1)) joinMap.get(id).left=true;
      if (c<GRID-1 && game.board[i+1] && isCompatibleEdge(tile,game.tiles.get(game.board[i+1]),0,1)) joinMap.get(id).right=true;
      if (r>0 && game.board[i-GRID] && isCompatibleEdge(game.tiles.get(game.board[i-GRID]),tile,1,0)) joinMap.get(id).up=true;
      if (r<GRID-1 && game.board[i+GRID] && isCompatibleEdge(tile,game.tiles.get(game.board[i+GRID]),1,0)) joinMap.get(id).down=true;
    }
    const activeIds = new Set(game.board.filter(Boolean));
    const indexById = new Map();
    game.board.forEach((id,index)=>{ if(id) indexById.set(id,index); });
    for (const [id, el] of tileEls) {
      el.classList.remove('is-surface-member','surface-drag-raw');
      if (!activeIds.has(id)) el.style.display='none';
    }
    activeIds.forEach((id) => ensureTileElement(game.tiles.get(id)));
    for (const id of activeIds) {
      const el = tileEls.get(id);
      const index=indexById.get(id);
      const {r}=idxToRC(index);
      const join=joinMap.get(id);
      el.style.display='block';
      el.dataset.cellIndex=String(index);
      applyTileGeometry(el, index, join);
      el.style.opacity=hiddenIds.has(id)?'0':'1';
      el.style.zIndex=String(10+r);
      el.classList.remove('join-left','join-right','join-up','join-down');
      if(join.left)el.classList.add('join-left');
      if(join.right)el.classList.add('join-right');
      if(join.up)el.classList.add('join-up');
      if(join.down)el.classList.add('join-down');
      el.classList.toggle('is-joined', join.left||join.right||join.up||join.down);
    }
    if(!suppressJoinedSurfaces) game.groups.filter(g=>g.ids.length>1).forEach(g=>createJoinedSurface(g,hiddenIds));
    updateDeckVisuals(); updateHud();
  }

  function updateHud() {
    dom.levelNumber.textContent = String(game.level);
    dom.moveText.textContent = String(game.moves);
    dom.hintCount.textContent = String(game.hintCount);
    dom.autoCount.textContent = String(game.autoCount);
    dom.hintBtn.classList.toggle('is-empty', game.hintCount <= 0);
    dom.autoBtn.classList.toggle('is-empty', game.autoCount <= 0);
    const progress = game.totalImages ? game.clearedCount / game.totalImages : 0;
    dom.progressBar.style.width = `${clamp(progress*100,0,100)}%`;
    if(dom.chainStatus){
      const visible=game.streakCombo>=2&&game.streakGrace>0;
      dom.chainStatus.classList.toggle('is-visible',visible);
      dom.chainStatus.querySelector('strong').textContent=`×${Math.max(1,game.streakCombo)}`;
      dom.chainStatus.querySelector('small').textContent=game.feverActive?`热潮剩${game.feverTurns}步`:`可续${game.streakGrace}步`;
    }
    if(dom.flowFill)dom.flowFill.style.width=`${clamp(game.flowEnergy,0,100)}%`;
    if(dom.flowMeter)dom.flowMeter.classList.toggle('is-fever',game.feverActive);
    if(dom.flowText)dom.flowText.textContent=game.feverActive?'FEVER':`${Math.round(game.flowEnergy)}%`;
  }

  function remainingDeckCount() {
    return (game.decks || []).reduce((sum, deck) => sum + deck.length, 0);
  }

  function updateDeckVisuals() {
    const columns=[...dom.deckArea.querySelectorAll('.deck-column')];
    columns.forEach((col,i)=>{
      const deck=game.decks?.[i]||[],count=deck.length,nextId=deck[0],tile=nextId?game.tiles.get(nextId):null;
      col.classList.toggle('is-empty',count<=0);col.dataset.depth=String(Math.min(3,count));col.dataset.showCount=count>0?'true':'false';
      const countEl=col.querySelector('.deck-count');if(countEl)countEl.textContent=count?String(count):'';
      const preview=col.querySelector('.next-card');
      if(preview){
        preview.classList.toggle('is-visible',!!tile);
        if(tile){preview.style.backgroundImage=`url("${PICTURE_PATHS[tile.imageIndex]}")`;preview.style.backgroundPosition=QUADRANTS[tile.quadrant].bg;preview.dataset.quadrant=String(tile.quadrant);preview.title=`下一张：${PICTURE_NAMES[tile.imageIndex]}`;}
        else{preview.style.backgroundImage='';preview.removeAttribute('title');}
      }
    });
  }


  function simulateDealWave(board,decks) {
    let dealt=false;const waveCap=game.level<=2?1:2;
    for(let c=0;c<GRID;c++){
      const deck=decks[c];if(!deck?.length)continue;
      const emptyTop=[];for(let r=0;r<GRID;r++){const i=rcToIdx(r,c);if(board[i])break;emptyTop.push(i);}
      const minK=Math.max(0,emptyTop.length-waveCap);
      for(let k=emptyTop.length-1;k>=minK&&deck.length;k--){board[emptyTop[k]]=deck.shift();dealt=true;}
    }
    return dealt;
  }

  function predictCascade(board,decks=game.decks,maxWaves=5) {
    let b=board.slice(),d=decks.map(x=>x.slice()),waves=0,pictures=0,guard=0;
    while(guard++<80&&waves<maxWaves){
      const settled=settleGroupsRigid(b);
      if(settled.some((id,i)=>id!==b[i])){b=settled;continue;}
      const complete=findCompleteGroups(b,game.tiles);
      if(complete.length){
        const clear=new Set(complete.flatMap(g=>g.ids));b=b.map(id=>clear.has(id)?null:id);waves++;pictures+=complete.length;continue;
      }
      if(!simulateDealWave(b,d))break;
    }
    return{waves,pictures};
  }

  function clearChainPrediction() {
    game.lastChainPrediction=null;dom.fxLayer.querySelectorAll('.chain-predict-badge').forEach(el=>el.remove());
  }

  function updateChainPrediction(board,targetCells=[]) {
    clearChainPrediction();const prediction=predictCascade(board,game.decks,5);game.lastChainPrediction=prediction;
    if(prediction.pictures<1)return prediction;
    const center=averageCellCenter(targetCells.length?targetCells:[0]);
    const badge=document.createElement('div');badge.className='chain-predict-badge'+(prediction.waves>=2?' is-hot':'');
    badge.textContent=prediction.waves>=2?`连锁 ×${prediction.waves}`:'可完成';badge.style.left=`${center.x}%`;badge.style.top=`${center.y}%`;
    dom.fxLayer.appendChild(badge);return prediction;
  }

  function captureTileRects() {
    const rects = new Map();
    const active = new Set(game.board.filter(Boolean));
    for (const [id, el] of tileEls) {
      if (el.style.display !== 'none' && active.has(id)) rects.set(id, el.getBoundingClientRect());
    }
    return rects;
  }

  async function animateFlipFromRects(firstRects, duration = 300) {
    const moving = [];
    const active = new Set(game.board.filter(Boolean));
    for (const [id, el] of tileEls) {
      if (!active.has(id) || !firstRects.has(id)) continue;
      el.style.transition = 'none'; el.style.transform = 'none';
      const last = el.getBoundingClientRect(), first = firstRects.get(id);
      const dx = first.left - last.left, dy = first.top - last.top;
      if (Math.abs(dx) > .5 || Math.abs(dy) > .5) {
        el.style.transform = `translate3d(${dx}px,${dy}px,0)`; moving.push(el);
      }
    }
    if (!moving.length) return;
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    moving.forEach((el) => {
      el.style.transition = `transform ${duration}ms cubic-bezier(.22,.88,.28,1)`;
      el.style.transform = 'none';
    });
    await delay(duration + 35);
    moving.forEach((el) => { el.style.transition=''; el.style.transform=''; });
  }

  function clearCellHighlights() {
    cellEls.forEach((cell) => cell.classList.remove('is-source','is-target','is-target-invalid'));
    clearChainPrediction();
  }

  function validateMove(sourceGroup, dr, dc, board = game.board, groups = game.groups, options = {}) {
    if (!sourceGroup || (!dr && !dc)) return { valid:false, reason:'same' };
    const cells = sourceGroup.cells.slice();
    const sourceSet = new Set(cells);
    const targets = [];
    const edges = new Map();
    for (const index of cells) {
      const {r,c}=idxToRC(index), nr=r+dr, nc=c+dc;
      if (nr<0||nr>=GRID||nc<0||nc>=GRID) return {valid:false,reason:'bounds'};
      const target = rcToIdx(nr,nc);
      targets.push(target);
      edges.set(index, target);
    }
    const targetSet = new Set(targets);
    const next = board.slice();

    // Reference rule: the dragged joined shape remains rigid, but the target region
    // may cut through any other joined shape. Target cells are displaced back into
    // the source footprint. Overlapping translations are handled as path rotations.
    const starts = cells.filter((cell) => !targetSet.has(cell));
    const touched = new Set();
    for (const start of starts) {
      const path = [start];
      let cur = start;
      while (edges.has(cur)) {
        cur = edges.get(cur);
        path.push(cur);
      }
      const values = path.map((cell) => board[cell]);
      next[path[0]] = values[values.length - 1] || null;
      for (let i = 0; i < path.length - 1; i++) next[path[i+1]] = values[i] || null;
      path.forEach((cell)=>touched.add(cell));
    }
    // Disjoint source/target shapes are fully covered by the paths above. This is
    // an integrity fallback for any exotic translated shape.
    for (const s of cells) if (!touched.has(s) && !targetSet.has(s)) next[s] = null;

    const beforeIds = board.filter(Boolean).slice().sort().join('|');
    const afterIds = next.filter(Boolean).slice().sort().join('|');
    if (beforeIds !== afterIds) return {valid:false,reason:'integrity',targets};
    return {valid:true,targets,board:next};
  }


  function onTilePointerDown(event) {
    if (game.phase === 'dragging' && !game.drag) game.phase = 'idle';
    if (game.phase !== 'idle') return;
    audio.ensure();
    const id = event.currentTarget.dataset.tileId;
    const index = game.board.indexOf(id); if (index < 0) return;
    const joined = groupAtCell(index);
    if (!joined) return;
    event.preventDefault();

    const rect = dom.board.getBoundingClientRect();
    const m = gridMetrics();
    const tile = game.tiles.get(id);
    const singleGroup = { ids:[id], cells:[index], imageIndex:tile?.imageIndex, minR:idxToRC(index).r, maxR:idxToRC(index).r, minC:idxToRC(index).c, maxC:idxToRC(index).c, complete:false };
    const drag = {
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY, dx:0,dy:0,
      wholeGroup:joined, singleGroup,
      sourceGroup:joined, sourceIds:joined.ids.slice(), sourceCells:joined.cells.slice(),
      touchedId:id, boardRect:rect,
      stepX:rect.width*m.step/100, stepY:rect.height*m.step/100,
      lastDr:0,lastDc:0, validation:null, moved:false, splitMode:false, holdTimer:0
    };

    // Normal gesture = move the whole joined shape. Holding briefly before dragging
    // tears the touched quarter out, which matches the user's expected dual behavior.
    if (joined.ids.length > 1) {
      drag.holdTimer = window.setTimeout(() => {
        if (!game.drag || game.drag !== drag || drag.moved) return;
        drag.splitMode = true;
        drag.sourceGroup = singleGroup;
        drag.sourceIds = [id];
        drag.sourceCells = [index];
        clearCellHighlights();
        joined.ids.forEach((tileId)=>tileEls.get(tileId)?.classList.remove('is-dragging'));
        joined.cells.forEach((cell)=>cellEls[cell]?.classList.remove('is-source'));
        cellEls[index]?.classList.add('is-source');
        tileEls.get(id)?.classList.add('is-dragging');
        showToast('已拆成单块', 650); haptic(12); audio.tap();
      }, 320);
    }

    suspendJoinedSurface(joined,true);
    game.drag=drag; game.phase='dragging';
    joined.cells.forEach((cell)=>cellEls[cell]?.classList.add('is-source'));
    joined.ids.forEach((tileId)=>tileEls.get(tileId)?.classList.add('is-dragging'));
    window.addEventListener('pointermove', onDragMove, {passive:false});
    window.addEventListener('pointerup', onDragEnd, {passive:false,once:true});
    window.addEventListener('pointercancel', onDragEnd, {passive:false,once:true});
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch (_) {}
    audio.tap(); haptic(7);
  }




  function flushDragFrame() {
    const drag=game.drag;
    if(!drag){ return; }
    drag.rafId=0;
    const dx=drag.pendingDx ?? drag.dx ?? 0;
    const dy=drag.pendingDy ?? drag.dy ?? 0;
    drag.dx=dx; drag.dy=dy;
    if (Math.hypot(dx,dy) > Math.max(6,Math.min(drag.stepX,drag.stepY)*.06)) {
      drag.moved=true;
      if (drag.holdTimer) { clearTimeout(drag.holdTimer); drag.holdTimer=0; }
    }
    const transform=`translate3d(${dx}px,${dy}px,0) scale(1.018)`;
    drag.sourceIds.forEach((id)=>{
      const el=tileEls.get(id);
      if(el && el.style.transform!==transform) el.style.transform=transform;
    });
    const dc=Math.round(dx/drag.stepX), dr=Math.round(dy/drag.stepY);
    if(dc===drag.lastDc&&dr===drag.lastDr)return;
    drag.lastDc=dc; drag.lastDr=dr;
    clearCellHighlights();
    drag.sourceCells.forEach((cell)=>cellEls[cell]?.classList.add('is-source'));
    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell]?.classList.add(result.valid?'is-target':'is-target-invalid'));
    if(result.valid&&result.board)updateChainPrediction(result.board,result.targets||[]);
  }

  function onDragMove(event) {
    const drag=game.drag; if(!drag||event.pointerId!==drag.pointerId)return;
    event.preventDefault();
    drag.pendingDx=event.clientX-drag.startX;
    drag.pendingDy=event.clientY-drag.startY;
    if(!drag.rafId) drag.rafId=requestAnimationFrame(flushDragFrame);
  }


  async function onDragEnd(event) {
    const drag=game.drag; if(!drag)return;
    if (drag.holdTimer) clearTimeout(drag.holdTimer);
    if (drag.rafId) { cancelAnimationFrame(drag.rafId); drag.rafId=0; flushDragFrame(); }
    window.removeEventListener('pointermove',onDragMove);
    window.removeEventListener('pointerup',onDragEnd);
    window.removeEventListener('pointercancel',onDragEnd);
    clearCellHighlights(); game.drag=null;

    if (!drag.moved || (!drag.lastDr && !drag.lastDc)) {
      drag.wholeGroup.ids.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transform='';el.classList.remove('is-dragging');}});
      suspendJoinedSurface(drag.wholeGroup,false);
      game.phase='idle'; return;
    }

    let source = drag.sourceGroup;
    let validation = drag.validation || validateMove(source,drag.lastDr,drag.lastDc);

    // If whole-shape placement cannot happen, automatically allow the touched
    // quarter to tear out when that single-cell swap is legal.
    if (!validation.valid && !drag.splitMode && drag.wholeGroup.ids.length > 1) {
      const singleValidation = validateMove(drag.singleGroup,drag.lastDr,drag.lastDc);
      if (singleValidation.valid) {
        source = drag.singleGroup;
        validation = singleValidation;
        drag.splitMode = true;
      }
    }

    drag.wholeGroup.ids.forEach((id)=>tileEls.get(id)?.classList.remove('is-dragging'));
    if(validation.valid) {
      await commitMove(source,drag.lastDr,drag.lastDc,validation.board,true);
    } else {
      audio.invalid(); haptic([10,25,10]);
      drag.wholeGroup.ids.forEach((id)=>{
        const el=tileEls.get(id); if(!el)return;
        el.style.transition='transform 180ms cubic-bezier(.2,.9,.25,1.18)'; el.style.transform='none';
      });
      await delay(195);
      drag.wholeGroup.ids.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transition='';el.style.transform='';}});
      suspendJoinedSurface(drag.wholeGroup,false);
      game.phase='idle';
    }
  }


  async function commitMove(sourceGroup, dr, dc, preparedBoard = null, fromDrag = false) {
    if (!sourceGroup || game.phase === 'resolving') return false;
    const validation = preparedBoard ? {valid:true,board:preparedBoard} : validateMove(sourceGroup,dr,dc);
    if (!validation.valid) return false;
    game.phase='swapping';
    const beforeConnections=new Set(game.connections);
    const firstRects=captureTileRects();
    sourceGroup.ids.forEach((id)=>{
      const el=tileEls.get(id); if(el){ el.classList.remove('is-dragging'); el.style.transition='none'; }
    });
    game.board=validation.board; game.moves++; game.movesSinceClear=(game.movesSinceClear||0)+1; renderBoard({suppressJoinedSurfaces:true}); updateHud();
    await animateFlipFromRects(firstRects,215);
    renderBoard();
    audio.swap(); haptic(10);
    if (!save.tutorialSeen && game.level===1) {
      save.tutorialSeen=true; persist(); dom.tutorialHand.classList.remove('is-visible');
    }
    await resolveBoard(beforeConnections,true,false);
    return true;
  }

  function boardScore(board) {
    const groups=computeGroups(board,game.tiles);
    const connections=computeConnections(board,game.tiles).size;
    const complete=groups.filter(g=>g.complete).length;
    const groupBonus=groups.reduce((sum,g)=>sum+(g.ids.length>1?g.ids.length*g.ids.length:0),0);
    return complete*1000+connections*48+groupBonus*5;
  }

  function countImageConnections(board,imageIndex) {
    let count=0;
    for(const edge of computeConnections(board,game.tiles)){
      const id=edge.split('|')[0];
      if(game.tiles.get(id)?.imageIndex===imageIndex)count++;
    }
    return count;
  }

  function findHelpfulMove() {
    const states=visibleImageState();
    const ready=[...states.values()].filter(s=>s.quadrants.size===4);
    if(!ready.length)return null;
    const groups=computeGroups();
    let best=null;

    // Prioritize images that already have the largest correctly joined component.
    ready.sort((a,b)=>{
      const ag=Math.max(...groups.filter(g=>g.imageIndex===a.imageIndex).map(g=>g.ids.length),1);
      const bg=Math.max(...groups.filter(g=>g.imageIndex===b.imageIndex).map(g=>g.ids.length),1);
      return bg-ag||b.ids.length-a.ids.length;
    });

    for(const state of ready){
      const imageIndex=state.imageIndex;
      const ids=imageIdsByQuadrant(imageIndex);
      const sources=[];
      for(const group of groups.filter(g=>g.imageIndex===imageIndex)){
        sources.push({group,splitMode:false});
        if(group.ids.length>1){
          for(const id of group.ids){
            const cell=game.board.indexOf(id),p=idxToRC(cell),tile=game.tiles.get(id);
            sources.push({group:{ids:[id],cells:[cell],imageIndex,minR:p.r,maxR:p.r,minC:p.c,maxC:p.c,complete:false},splitMode:true,tile});
          }
        }
      }

      for(let ar=0;ar<GRID-1;ar++)for(let ac=0;ac<GRID-1;ac++){
        const anchorCells=[rcToIdx(ar,ac),rcToIdx(ar,ac+1),rcToIdx(ar+1,ac),rcToIdx(ar+1,ac+1)];
        for(const source of sources){
          const firstId=source.group.ids[0];
          const tile=game.tiles.get(firstId); if(!tile)continue;
          const current=game.board.indexOf(firstId); if(current<0)continue;
          const cur=idxToRC(current),q=QUADRANTS[tile.quadrant];
          const tr=ar+q.y,tc=ac+q.x,dr=tr-cur.r,dc=tc-cur.c;
          if(!dr&&!dc)continue;
          const result=validateMove(source.group,dr,dc); if(!result.valid)continue;
          let placed=0;
          for(let qq=0;qq<4;qq++)if(result.board[anchorCells[qq]]===ids[qq])placed++;
          const complete=findCompleteGroups(result.board,game.tiles).some(g=>g.imageIndex===imageIndex);
          const connections=countImageConnections(result.board,imageIndex);
          const score=(complete?100000:0)+placed*3000+connections*650+source.group.ids.length*80-(source.splitMode?35:0)-(Math.abs(dr)+Math.abs(dc))*2;
          if(!best||score>best.score){
            best={group:source.group,dr,dc,board:result.board,score,splitMode:source.splitMode,imageIndex,targetAnchor:{r:ar,c:ac,cells:anchorCells}};
          }
        }
      }
    }
    return best;
  }

  function markHint(move) {
    clearHintMarks();
    const targetCells=move.group.cells.map((i)=>{const {r,c}=idxToRC(i);return rcToIdx(r+move.dr,c+move.dc);});
    move.group.ids.forEach(id=>tileEls.get(id)?.classList.add('is-hint-source'));
    game.board.forEach(id=>{if(id&&game.tiles.get(id)?.imageIndex===move.imageIndex)tileEls.get(id)?.classList.add('is-hint-family');});
    targetCells.forEach(cell=>{
      cellEls[cell]?.classList.add('is-target');
      const id=game.board[cell];if(id)tileEls.get(id)?.classList.add('is-hint-target');
    });
    if(move.targetAnchor){
      const frame=document.createElement('div');frame.className='hint-target-frame';
      const g=cellRectPercentByRC(move.targetAnchor.r,move.targetAnchor.c);
      frame.style.left=`${g.left}%`;frame.style.top=`${g.top}%`;
      frame.style.width=`${g.width*2}%`;frame.style.height=`${g.height*2}%`;
      dom.fxLayer.appendChild(frame);
    }
    drawHintArrow(move.group.cells,targetCells);
    game.hintTimer=window.setTimeout(clearHintMarks,3000);
  }

  function drawHintArrow(sourceCells,targetCells) {
    const old=dom.fxLayer.querySelector('.hint-arrow'); if(old)old.remove();
    const srcCenter=averageCellCenter(sourceCells), targetCenter=averageCellCenter(targetCells);
    const dx=targetCenter.x-srcCenter.x, dy=targetCenter.y-srcCenter.y;
    const length=Math.hypot(dx,dy), angle=Math.atan2(dy,dx)*180/Math.PI;
    const arrow=document.createElement('div'); arrow.className='hint-arrow';
    arrow.style.left=`${srcCenter.x}%`; arrow.style.top=`${srcCenter.y}%`;
    arrow.style.width=`${length}%`; const arrowTransform=`translateY(-50%) rotate(${angle}deg)`; arrow.style.transform=arrowTransform; arrow.style.setProperty('--arrow-transform',arrowTransform);
    dom.fxLayer.appendChild(arrow); setTimeout(()=>arrow.remove(),2300);
  }
  function averageCellCenter(cells) {
    const points=cells.map((i)=>{
      const g=cellRectPercent(i);
      return{x:g.left+g.width/2,y:g.top+g.height/2};
    });
    return {x:points.reduce((s,p)=>s+p.x,0)/points.length,y:points.reduce((s,p)=>s+p.y,0)/points.length};
  }

  function clearHintMarks() {
    clearTimeout(game.hintTimer);
    tileEls.forEach((el)=>el.classList.remove('is-hint-source','is-hint-target','is-hint-family'));
    cellEls.forEach((el)=>el.classList.remove('is-target'));
    dom.fxLayer.querySelectorAll('.hint-arrow,.hint-target-frame').forEach((el)=>el.remove());
  }

  async function useHint() {
    if(game.phase!=='idle')return;
    if(game.hintCount<=0){showToast('提示次数用完啦');audio.invalid();return;}
    let move=findHelpfulMove();
    if(!move&&remainingDeckCount()>0){
      game.phase='resolving';
      await ensurePlayableFrontier(false);
      game.phase='idle';
      move=findHelpfulMove();
    }
    if(!move){showToast('当前局面可继续交换，优先凑齐同一张图');audio.invalid();return;}
    game.hintCount--;updateHud();markHint(move);audio.merge();
    showToast(move.splitMode?'按住发光碎片后，拖到箭头位置':'拖动发光图片块到箭头位置',2400);
  }

  async function useAuto() {
    if(game.phase!=='idle')return;
    if(game.autoCount<=0){showToast('自动整理次数用完啦');audio.invalid();return;}
    let move=findHelpfulMove();
    if(!move&&remainingDeckCount()>0){
      game.phase='resolving';await ensurePlayableFrontier(false);game.phase='idle';move=findHelpfulMove();
    }
    if(!move){showToast('暂时没有需要整理的位置');audio.invalid();return;}
    game.autoCount--;updateHud();markHint(move);game.phase='hinting';await delay(420);clearHintMarks();
    await commitMove(move.group,move.dr,move.dc,move.board,false);
  }

  function imageIdsByQuadrant(imageIndex) {
    const ids=Array(4).fill(null);
    for(const tile of game.tiles.values()) if(tile.imageIndex===imageIndex) ids[tile.quadrant]=tile.id;
    return ids;
  }

  function visibleImageState(board=game.board) {
    const map=new Map();
    board.forEach((id,index)=>{
      if(!id)return;
      const tile=game.tiles.get(id); if(!tile)return;
      let state=map.get(tile.imageIndex);
      if(!state){state={imageIndex:tile.imageIndex,ids:[],cells:[],quadrants:new Set()};map.set(tile.imageIndex,state);}
      state.ids.push(id);state.cells.push(index);state.quadrants.add(tile.quadrant);
    });
    return map;
  }

  function visibleCompletionImage(board=game.board) {
    for(const state of visibleImageState(board).values()) if(state.quadrants.size===4) return state.imageIndex;
    return null;
  }

  function locateDeckTile(id) {
    for(let c=0;c<game.decks.length;c++){
      const pos=game.decks[c].indexOf(id);
      if(pos>=0)return{col:c,pos};
    }
    return null;
  }

  function chooseFrontierCandidate(maxMissing=4) {
    const states=visibleImageState();
    const candidates=[];
    const imageIndices=[...new Set([...game.tiles.values()].map(t=>t.imageIndex))];
    for(const imageIndex of imageIndices){
      const ids=imageIdsByQuadrant(imageIndex);
      if(ids.some(id=>!id))continue;
      const visible=states.get(imageIndex)?.quadrants.size||0;
      const missing=ids.filter(id=>!game.board.includes(id));
      if(missing.length===0||missing.length>maxMissing)continue;
      if(missing.some(id=>!locateDeckTile(id)))continue;
      candidates.push({imageIndex,ids,visible,missing});
    }
    candidates.sort((a,b)=>b.visible-a.visible||a.missing.length-b.missing.length||a.imageIndex-b.imageIndex);
    return candidates[0]||null;
  }

  function ensureVisibleCompletionSet() {
    const already=visibleCompletionImage();
    if(already!==null)return{changed:false,imageIndex:already,changedIds:[]};
    const candidate=chooseFrontierCandidate(4);
    if(!candidate)return{changed:false,imageIndex:null,changedIds:[]};

    const groups=computeGroups();
    const protectedIds=new Set(candidate.ids.filter(id=>game.board.includes(id)));
    const replaceable=[];
    for(let cell=0;cell<CELL_COUNT;cell++){
      const id=game.board[cell]; if(!id||protectedIds.has(id))continue;
      const group=groupAtCell(cell,groups);
      const tile=game.tiles.get(id);
      // Prefer unrelated singletons, then small groups, and avoid tearing another
      // nearly-complete image apart unless there is no other choice.
      const sameCount=visibleImageState().get(tile?.imageIndex)?.quadrants.size||0;
      const score=(group?.ids.length||1)*100+sameCount*12+idxToRC(cell).r;
      replaceable.push({cell,score});
    }
    replaceable.sort((a,b)=>a.score-b.score||a.cell-b.cell);
    if(replaceable.length<candidate.missing.length)return{changed:false,imageIndex:null,changedIds:[]};

    const changedIds=[];
    for(const missingId of candidate.missing){
      const loc=locateDeckTile(missingId); if(!loc)continue;
      const target=replaceable.shift().cell;
      const displaced=game.board[target];
      game.board[target]=missingId;
      game.decks[loc.col][loc.pos]=displaced;
      changedIds.push(missingId);
    }
    return{changed:changedIds.length>0,imageIndex:candidate.imageIndex,changedIds};
  }

  function primeDecksForPlayableFrontier() {
    if(visibleCompletionImage()!==null)return false;
    const slots=[];
    for(let c=0;c<GRID;c++){
      let capacity=0;
      for(let r=0;r<GRID;r++){
        const index=rcToIdx(r,c);
        if(game.board[index])break;
        capacity++;
      }
      for(let i=0;i<capacity;i++)slots.push(c);
    }
    if(!slots.length)return false;
    const candidate=chooseFrontierCandidate(slots.length);
    if(!candidate)return false;
    const usedByColumn=Array(GRID).fill(0);
    for(let i=0;i<candidate.missing.length;i++){
      const id=candidate.missing[i], targetCol=slots[i];
      const targetPos=usedByColumn[targetCol]++;
      const loc=locateDeckTile(id); if(!loc)continue;
      const targetId=game.decks[targetCol][targetPos];
      if(loc.col===targetCol&&loc.pos===targetPos)continue;
      game.decks[loc.col][loc.pos]=targetId;
      game.decks[targetCol][targetPos]=id;
    }
    return true;
  }

  async function ensurePlayableFrontier(announce=true) {
    if(visibleCompletionImage()!==null)return false;
    const result=ensureVisibleCompletionSet();
    if(!result.changed)return false;
    renderBoard();
    result.changedIds.forEach(id=>tileEls.get(id)?.classList.add('frontier-in'));
    await delay(260);
    result.changedIds.forEach(id=>tileEls.get(id)?.classList.remove('frontier-in'));
    game.movesSinceClear=0;
    if(announce)showToast('已整理出可解图片',850);
    haptic(10);
    return true;
  }

  async function rescueIfStalled() {
    return ensurePlayableFrontier(true);
  }

  function chainSpeedFactor() {
    if(game.feverActive)return .67;
    if(game.turnChain>=4)return .72;
    if(game.turnChain>=3)return .78;
    if(game.turnChain>=2)return .88;
    return 1;
  }

  function comboHaptic(tier) {
    return [[10],[12,22,16],[18,20,24],[22,18,28,18,20],[26,16,32,16,26]][Math.max(1,Math.min(5,tier))-1];
  }

  function startFever() {
    if(game.feverActive)return;
    game.feverActive=true;game.feverTurns=3;game.feverStartedThisTurn=true;game.flowEnergy=0;game.streakGrace=Math.max(game.streakGrace,3);
    document.getElementById('gameStage')?.classList.add('is-fever');audio.feverStart();haptic([22,25,30]);juice.pulse(5);showToast('FLOW FEVER · 连锁加速！',1500);updateHud();
  }

  function endFever() {
    if(!game.feverActive)return;
    game.feverActive=false;game.feverTurns=0;document.getElementById('gameStage')?.classList.remove('is-fever');audio.feverEnd();updateHud();
  }

  function gainFlow(amount) {
    if(game.feverActive)return;
    game.flowEnergy=clamp(game.flowEnergy+amount,0,100);
    if(game.flowEnergy>=100)startFever();else updateHud();
  }

  function registerClear(count) {
    const firstThisTurn=game.turnCleared===0;
    game.turnCleared+=count;game.turnChain+=count;game.comboStreak=game.turnChain;
    if(firstThisTurn){
      if(game.streakGrace>0&&game.streakCombo>0)game.streakCombo+=count;
      else game.streakCombo=count;
    } else game.streakCombo+=count;
    game.streakGrace=game.feverActive?3:2;
    game.comboMax=Math.max(game.comboMax,game.turnChain,game.streakCombo);
    gainFlow(count*12+Math.max(0,game.turnChain-1)*7);
    return Math.min(5,game.turnChain+(game.feverActive?1:0));
  }

  function finishPlayerResolve(isPlayerMove) {
    if(!isPlayerMove)return;
    if(game.turnCleared===0){
      game.streakGrace=Math.max(0,game.streakGrace-1);
      if(game.streakGrace===0)game.streakCombo=0;
    }
    if(game.feverActive&&!game.feverStartedThisTurn){game.feverTurns--;if(game.feverTurns<=0)endFever();}
    updateHud();
  }

  async function resolveBoard(beforeConnections=new Set(), isPlayerMove=false) {
    game.phase='resolving';
    if(isPlayerMove){game.turnChain=0;game.turnCleared=0;game.feverStartedThisTurn=false;if(game.streakGrace<=0)game.streakCombo=0;}
    game.lastResolveTrace=[];
    let baseline=new Set(beforeConnections),safety=0;

    while(safety++<128){
      game.groups=computeGroups();game.connections=computeConnections();
      const beforeGravity=new Set(game.connections),moved=await applyGravity();
      if(moved){game.lastResolveTrace.push('gravity');baseline=beforeGravity;continue;}

      game.groups=computeGroups();game.connections=computeConnections();
      const newIds=new Set();
      for(const edge of game.connections)if(!baseline.has(edge))edge.split('|').forEach(id=>newIds.add(id));
      if(newIds.size){
        game.lastResolveTrace.push('merge');
        const touched=game.groups.filter(g=>g.ids.some(id=>newIds.has(id))),stage=Math.max(2,...touched.map(g=>g.ids.length));
        touched.forEach(g=>juice.mergeGroup(g));newIds.forEach(id=>tileEls.get(id)?.classList.add('merge-pop'));
        audio.mergeStage(stage);haptic(stage>=3?[10,18,14]:9);await delay(Math.round(120*chainSpeedFactor()));
        newIds.forEach(id=>tileEls.get(id)?.classList.remove('merge-pop'));baseline=new Set(game.connections);
      }

      const complete=game.groups.filter(g=>g.complete);
      if(complete.length){
        game.lastResolveTrace.push('clear');const tier=registerClear(complete.length);
        showCombo(game.turnChain,game.streakCombo,tier);await animateAndClear(complete,tier);baseline=new Set();continue;
      }

      const beforeDeal=new Set(game.connections),dealt=await dealIntoBoard();
      if(dealt){game.lastResolveTrace.push('deal');baseline=beforeDeal;continue;}
      if(await rescueIfStalled()){game.lastResolveTrace.push('rescue');baseline=new Set();continue;}
      break;
    }

    if(remainingDeckCount()===0&&game.board.every(v=>!v)){finishPlayerResolve(isPlayerMove);await finishLevel();return;}
    finishPlayerResolve(isPlayerMove);game.phase='idle';
  }

  async function animateAndClear(groups,tier=1) {
    const clearIds=[],overlays=[];tier=Math.max(1,Math.min(5,tier));
    for(const group of groups){
      clearIds.push(...group.ids);const overlay=document.createElement('div');overlay.className='complete-overlay';overlay.dataset.tier=String(tier);
      const rect=groupRectPercent(group);overlay.style.left=`${rect.left}%`;overlay.style.top=`${rect.top}%`;overlay.style.width=`${rect.width}%`;overlay.style.height=`${rect.height}%`;
      overlay.style.backgroundImage=`url("${PICTURE_PATHS[group.imageIndex]}")`;overlay.style.animationDuration=`${Math.max(330,650-tier*55)}ms`;dom.fxLayer.appendChild(overlay);overlays.push(overlay);
      if(!game.clearedImages.includes(group.imageIndex))game.clearedImages.push(group.imageIndex);
      if(!save.unlocked.includes(group.imageIndex)&&!game.unlockedThisLevel.includes(group.imageIndex))game.unlockedThisLevel.push(group.imageIndex);
    }
    juice.clearGroups(groups,tier);audio.chain(tier,game.feverActive);haptic(comboHaptic(tier));
    if(tier>=3)await delay(52);
    clearIds.forEach(id=>tileEls.get(id)?.classList.add('clear-out'));
    const hold=Math.round(Math.max(285,570-tier*48)*chainSpeedFactor());await delay(hold);
    game.board=game.board.map(id=>clearIds.includes(id)?null:id);
    clearIds.forEach(id=>{const el=tileEls.get(id);if(el){el.remove();tileEls.delete(id);}});overlays.forEach(el=>el.remove());
    game.clearedCount+=groups.length;game.movesSinceClear=0;renderBoard();
    if(game.level===1&&game.clearedCount===groups.length&&!save.tutorialSeen)showToast('完成！空位会先下落，顶部牌堆再继续补牌',3000);
  }

  function createSparks(xPercent,yPercent,count=14) {
    juice.burstPercent(xPercent,yPercent,Math.max(1,Math.ceil(count/12)),count);
  }

  function gravityStep(board) {
    const movable=new Set();
    let changed=true;
    while(changed){
      changed=false;
      for(let r=GRID-2;r>=0;r--){
        for(let c=0;c<GRID;c++){
          const cell=rcToIdx(r,c), id=board[cell];
          if(!id||movable.has(id))continue;
          const below=board[cell+GRID];
          if(!below||movable.has(below)){movable.add(id);changed=true;}
        }
      }
    }
    if(!movable.size)return{moved:false,board:board.slice(),ids:[]};
    const next=board.slice(), entries=[];
    for(let r=GRID-1;r>=0;r--)for(let c=0;c<GRID;c++){
      const cell=rcToIdx(r,c),id=board[cell];if(id&&movable.has(id))entries.push([cell,id]);
    }
    entries.forEach(([cell])=>{next[cell]=null;});
    entries.forEach(([cell,id])=>{next[cell+GRID]=id;});
    return{moved:true,board:next,ids:entries.map(([,id])=>id)};
  }

  function settleGroupsRigid(board) {
    let next=board.slice();
    let safety=0;
    while(safety++<GRID*GRID*2){
      const step=gravityStep(next);
      if(!step.moved)break;
      next=step.board;
    }
    return next;
  }


  async function applyGravity() {
    let next=game.board.slice(),waves=0;
    const dropCount=new Map();
    while(waves<GRID*GRID*2){
      const step=gravityStep(next);if(!step.moved)break;
      step.ids.forEach(id=>dropCount.set(id,(dropCount.get(id)||0)+1));
      next=step.board;waves++;
    }
    if(!waves)return false;
    const first=captureTileRects();
    game.board=next;
    renderBoard({suppressJoinedSurfaces:true});
    const maxDrop=Math.max(...dropCount.values(),1);
    const duration=Math.round(Math.min(430,Math.max(170,145+maxDrop*62))*chainSpeedFactor());
    await animateFlipFromRects(first,duration);
    renderBoard();
    dropCount.forEach((_,id)=>tileEls.get(id)?.classList.add('land-pop'));
    audio.drop(maxDrop);haptic(Math.min(30,8+maxDrop*4));
    await delay(Math.round(70*chainSpeedFactor()));
    dropCount.forEach((_,id)=>tileEls.get(id)?.classList.remove('land-pop'));
    game.groups=computeGroups();game.connections=computeConnections();
    return true;
  }

  async function dealIntoBoard() {
    primeDecksForPlayableFrontier();
    const dealt=[];
    for(let c=0;c<GRID;c++){
      const deck=game.decks?.[c]; if(!deck?.length)continue;
      const emptyTop=[];
      for(let r=0;r<GRID;r++){
        const index=rcToIdx(r,c);
        if(game.board[index])break;
        emptyTop.push(index);
      }
      const waveCap=game.level<=2?1:2;
      const minK=Math.max(0,emptyTop.length-waveCap);
      for(let k=emptyTop.length-1;k>=minK&&deck.length;k--){
        const index=emptyTop[k], id=deck.shift();
        game.board[index]=id; dealt.push({index,id,col:c,order:dealt.length});
      }
    }
    if(!dealt.length){updateDeckVisuals();return false;}

    const hidden=new Set(dealt.map(d=>d.id));renderBoard({hiddenIds:hidden});updateDeckVisuals();
    const dealFactor=chainSpeedFactor();
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();
    const dropBase=Math.max(105,boardRect.top-deckRect.top+34);
    const rowStepPx=boardRect.height*gridMetrics().step/100;
    dealt.forEach((item,n)=>{
      const geom=cellRectPercent(item.index); const {r}=idxToRC(item.index);
      const card=document.createElement('div');card.className='deal-card';
      card.style.left=`${geom.left}%`;card.style.top=`${geom.top}%`;card.style.width=`${geom.width}%`;card.style.height=`${geom.height}%`;
      card.style.setProperty('--drop-y',`${dropBase+r*rowStepPx}px`);
      card.style.animationDelay=`${Math.round(n*24*dealFactor)}ms`;card.style.animationDuration=`${Math.round(480*dealFactor)}ms`;card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{
        audio.deal();const tile=tileEls.get(item.id);
        if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),500);}
        card.remove();
      },Math.round(220*dealFactor+n*24*dealFactor));
    });
    await delay(Math.round((250+dealt.length*24+235)*dealFactor));
    game.groups=computeGroups();game.connections=computeConnections();renderBoard();
    return true;
  }



  function showCombo(value,streak=value,tier=Math.min(5,value)) {
    const label=value>=5?'FEVER CHAIN':value>=3?'SUPER CHAIN':value>=2?'CHAIN':'NICE';
    dom.comboToast.querySelector('span').textContent=label;dom.comboToast.querySelector('strong').textContent=`× ${value}`;dom.comboToast.dataset.tier=String(tier);
    dom.comboToast.classList.remove('is-visible');requestAnimationFrame(()=>requestAnimationFrame(()=>dom.comboToast.classList.add('is-visible')));
    clearTimeout(game.comboToastTimer);game.comboToastTimer=setTimeout(()=>dom.comboToast.classList.remove('is-visible'),720+Math.min(5,tier)*90);
    updateHud();
  }
  function showToast(text,duration=1700) {
    clearTimeout(game.toastTimer);dom.messageToast.textContent=text;dom.messageToast.classList.add('is-visible');
    game.toastTimer=setTimeout(()=>dom.messageToast.classList.remove('is-visible'),duration);
  }

  function formatTime(ms) {
    const total=Math.max(0,Math.floor(ms/1000));const m=Math.floor(total/60),s=total%60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  function currentElapsed() { return game.timerBase+(game.timerRunning?performance.now()-game.timerStartedAt:0); }
  function startTimer() {
    game.timerBase=0;game.timerStartedAt=performance.now();game.timerRunning=true;cancelAnimationFrame(game.timerRaf);tickTimer();
  }
  function pauseTimer() {
    if(!game.timerRunning)return;game.timerBase=currentElapsed();game.timerRunning=false;cancelAnimationFrame(game.timerRaf);
  }
  function resumeTimer() {
    if(game.timerRunning||game.phase==='home'||game.phase==='boot')return;game.timerStartedAt=performance.now();game.timerRunning=true;tickTimer();
  }
  function tickTimer() {
    dom.timeText.textContent=formatTime(currentElapsed());
    if(game.timerRunning)game.timerRaf=requestAnimationFrame(tickTimer);
  }

  async function preloadImages(indices) {
    await Promise.all(indices.map((i)=>new Promise((resolve)=>{const img=new Image();img.onload=img.onerror=resolve;img.src=PICTURE_PATHS[i];})));
  }

  async function startLevel(level) {
    hideModals();dom.winScreen.classList.remove('is-visible');showOnly(dom.playScreen);clearHintMarks();
    game.level=Math.max(1,level);
    configureGrid(gridForLevel(game.level));
    updateBoardLayout();
    game.phase='loading';game.moves=0;game.clearedCount=0;game.clearedImages=[];game.unlockedThisLevel=[];
    game.comboMax=1;game.comboStreak=0;game.turnChain=0;game.turnCleared=0;game.streakCombo=0;game.streakGrace=0;game.flowEnergy=0;game.feverActive=false;game.feverTurns=0;game.feverStartedThisTurn=false;game.hintCount=3;game.autoCount=3;game.movesSinceClear=0;game.timerBase=0;game.timerRunning=false;juice.reset();document.getElementById('gameStage')?.classList.remove('is-fever');
    tileEls.forEach((el)=>el.remove());tileEls.clear();dom.fxLayer.innerHTML='';clearCellHighlights();
    const generated=generateLevel(game.level);game.generation=generated;game.initialSeed=generated.seed;
    game.board=generated.board.slice();game.decks=generated.decks.map((deck)=>deck.slice());game.tiles=generated.tiles;
    game.selectedImages=generated.selected;game.totalImages=generated.imageCount;
    ensureVisibleCompletionSet();

    const hard=isHardLevel(game.level);
    const stage=document.getElementById('gameStage');stage?.classList.toggle('is-hard',hard);
    const title=dom.levelNumber.parentElement;title?.classList.toggle('is-hard',hard);
    const titleLabel=title?.querySelector('span');if(titleLabel)titleLabel.textContent=hard?'困难':'关卡';
    dom.introLevel.textContent=String(game.level);dom.introText.textContent=levelIntroCopy(game.level);
    dom.levelIntro.classList.add('is-visible');updateHud();updateDeckVisuals();

    const preloadSet=new Set();
    game.board.filter(Boolean).forEach((id)=>preloadSet.add(game.tiles.get(id).imageIndex));
    game.decks.forEach((deck)=>deck.slice(0,2).forEach((id)=>preloadSet.add(game.tiles.get(id).imageIndex)));
    await preloadImages([...preloadSet]);
    updateBoardLayout();
    renderBoard({hiddenIds:new Set(game.board.filter(Boolean))});
    await delay(220);await initialDealAnimation();
    await delay(80);dom.levelIntro.classList.remove('is-visible');startTimer();
    const initialConnections=new Set(game.connections);
    game.phase='resolving';
    await resolveBoard(initialConnections,false);
    if(game.phase!=='won')game.phase='idle';
    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('先拖动一块碎片，和同一张图拼起来',3000);}
    else{dom.tutorialHand.classList.remove('is-visible');if(game.level===3)showToast('看牌堆下一张：先完成上层图片，试着触发二连锁',3300);else if(game.level===5)showToast('三连锁教学：提前留好落点，连得越多反馈越强',3400);}
  }



  async function initialDealAnimation() {
    const items=game.board.map((id,index)=>({id,index})).filter(x=>x.id);
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();const dropY=Math.max(150,boardRect.top-deckRect.top+52);
    const rowStepPx=boardRect.height*gridMetrics().step/100;
    items.forEach(({id,index})=>{
      const {r,c}=idxToRC(index);const geom=cellRectPercent(index);
      const card=document.createElement('div');card.className='deal-card';
      card.style.left=`${geom.left}%`;card.style.top=`${geom.top}%`;card.style.width=`${geom.width}%`;card.style.height=`${geom.height}%`;
      card.style.setProperty('--drop-y',`${dropY+r*rowStepPx}px`);
      const stagger=r*52+c*17;card.style.animationDelay=`${stagger}ms`;card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{audio.deal();const tile=tileEls.get(id);if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),500);}card.remove();},285+stagger);
    });
    await delay(285+(GRID-1)*52+(GRID-1)*17+500);renderBoard();
  }



  function calculateStars() {
    const target=game.totalImages*3+3;
    if(game.moves<=target)return 3;if(game.moves<=target+game.totalImages*2)return 2;return 1;
  }

  async function finishLevel() {
    game.phase='won';pauseTimer();audio.win();haptic([30,45,30,45,70]);await delay(420);
    const elapsed=currentElapsed(),stars=calculateStars();
    const oldStars=save.stars[game.level]||0;save.stars[game.level]=Math.max(oldStars,stars);save.totalStars=Object.values(save.stars).reduce((a,b)=>a+Number(b||0),0);
    const oldBest=save.best[game.level];if(!oldBest||elapsed<oldBest.time)save.best[game.level]={time:Math.round(elapsed),moves:game.moves};
    for(const imageIndex of game.unlockedThisLevel)if(!save.unlocked.includes(imageIndex))save.unlocked.push(imageIndex);
    save.level=Math.max(save.level,game.level+1);persist();
    dom.winTime.textContent=formatTime(elapsed);dom.winMoves.textContent=String(game.moves);dom.winCombo.textContent=String(game.comboMax);
    [...dom.starRow.children].forEach((el,i)=>{el.classList.toggle('is-on',i<stars);el.style.animationDelay=`${i*120}ms`;});
    dom.unlockedStrip.innerHTML='';
    const shown=(game.unlockedThisLevel.length?game.unlockedThisLevel:game.clearedImages).slice(-5);
    shown.forEach((idx)=>{const img=document.createElement('img');img.src=PICTURE_PATHS[idx];img.alt=PICTURE_NAMES[idx];dom.unlockedStrip.appendChild(img);});
    dom.winScreen.classList.add('is-visible');startConfetti();updateHome();
  }

  function startConfetti() {
    const canvas=dom.confettiCanvas,ctx=canvas.getContext('2d');const rect=canvas.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);
    canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    const colors=['#fff46d','#ff6da7','#75f0ff','#62ef82','#ffffff','#bf80ff'];
    const pieces=Array.from({length:80},()=>({x:Math.random()*rect.width,y:-20-Math.random()*rect.height*.6,vx:(Math.random()-.5)*2.7,vy:2.3+Math.random()*4.2,r:3+Math.random()*6,a:Math.random()*Math.PI*2,va:(Math.random()-.5)*.22,c:colors[Math.floor(Math.random()*colors.length)]}));
    let start=performance.now();
    function frame(now){ctx.clearRect(0,0,rect.width,rect.height);for(const p of pieces){p.x+=p.vx;p.y+=p.vy;p.a+=p.va;p.vy+=.025;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;ctx.fillRect(-p.r,-p.r*.55,p.r*2,p.r*1.1);ctx.restore();}if(now-start<3800)requestAnimationFrame(frame);else ctx.clearRect(0,0,rect.width,rect.height);}requestAnimationFrame(frame);
  }

  function openSettings() {
    game.modalPreviousPhase=game.phase; if(game.phase!=='home'&&game.phase!=='boot')pauseTimer();
    dom.soundToggle.classList.toggle('is-on',save.settings.sound);dom.vibrationToggle.classList.toggle('is-on',save.settings.vibration);
    dom.resumeBtn.style.display=dom.playScreen.classList.contains('is-visible')?'block':'none';dom.restartBtn.style.display=dom.playScreen.classList.contains('is-visible')?'block':'none';
    showModal(dom.settingsModal);
  }
  function closeSettings() {
    hideModals();
    if(dom.playScreen.classList.contains('is-visible')&&game.phase!=='won'){
      game.phase=game.modalPreviousPhase==='dragging'?'idle':(game.modalPreviousPhase||'idle');
      if(game.phase==='paused'||game.phase==='loading')game.phase='idle';resumeTimer();
    }
  }
  function goHome() {
    pauseTimer();clearHintMarks();game.phase='home';dom.winScreen.classList.remove('is-visible');hideModals();showOnly(dom.homeScreen);updateHome();
  }

  function renderGallery() {
    dom.galleryGrid.innerHTML='';
    PICTURE_PATHS.forEach((src,index)=>{
      const item=document.createElement('div');item.className='gallery-item'+(save.unlocked.includes(index)?'':' is-locked');
      const img=document.createElement('img');img.src=src;img.alt=save.unlocked.includes(index)?PICTURE_NAMES[index]:'未解锁图片';
      const num=document.createElement('span');num.textContent=String(index+1).padStart(2,'0');item.append(img,num);dom.galleryGrid.appendChild(item);
    });
  }

  function bindEvents() {
    dom.playBtn.addEventListener('click',()=>{audio.tap();startLevel(save.level);});
    dom.settingsBtn.addEventListener('click',()=>{audio.tap();openSettings();});dom.homeSettingsBtn.addEventListener('click',()=>{audio.tap();openSettings();});
    dom.galleryBtn.addEventListener('click',()=>{audio.tap();renderGallery();showModal(dom.galleryModal);});
    dom.hintBtn.addEventListener('click',()=>{audio.tap();useHint();});dom.autoBtn.addEventListener('click',()=>{audio.tap();useAuto();});
    dom.nextBtn.addEventListener('click',()=>{audio.tap();dom.winScreen.classList.remove('is-visible');startLevel(game.level+1);});
    dom.replayBtn.addEventListener('click',()=>{audio.tap();dom.winScreen.classList.remove('is-visible');startLevel(game.level);});
    dom.resumeBtn.addEventListener('click',()=>{audio.tap();closeSettings();});
    dom.restartBtn.addEventListener('click',()=>{audio.tap();hideModals();startLevel(game.level);});
    dom.homeBtn.addEventListener('click',()=>{audio.tap();goHome();});
    dom.soundToggle.addEventListener('click',()=>{save.settings.sound=!save.settings.sound;dom.soundToggle.classList.toggle('is-on',save.settings.sound);persist();if(save.settings.sound)audio.tap();});
    dom.vibrationToggle.addEventListener('click',()=>{save.settings.vibration=!save.settings.vibration;dom.vibrationToggle.classList.toggle('is-on',save.settings.vibration);persist();haptic(15);});
    document.querySelectorAll('[data-close-modal]').forEach((btn)=>btn.addEventListener('click',()=>{audio.tap();if(dom.settingsModal.classList.contains('is-visible'))closeSettings();else hideModals();}));
    [dom.settingsModal,dom.galleryModal].forEach((layer)=>layer.addEventListener('pointerdown',(event)=>{if(event.target===layer){if(layer===dom.settingsModal)closeSettings();else hideModals();}}));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseTimer();else if(dom.playScreen.classList.contains('is-visible')&&!dom.settingsModal.classList.contains('is-visible')&&game.phase==='idle')resumeTimer();});
    window.addEventListener('resize',()=>{
      updateBoardLayout();
      if(game.phase==='dragging'&&game.drag){
        const rect=dom.board.getBoundingClientRect(),m=gridMetrics();
        game.drag.boardRect=rect;game.drag.stepX=rect.width*m.step/100;game.drag.stepY=rect.height*m.step/100;
      }
    });
    window.addEventListener('contextmenu',(event)=>event.preventDefault());
  }


  async function boot() {
    bindEvents();updateHome();
    if(location.protocol.startsWith('http')&&'serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
    await preloadImages([((save.level-1)*5)%PICTURE_PATHS.length]);
    await delay(850);dom.splash.classList.remove('is-visible');
    const requested=Number(new URLSearchParams(location.search).get('level'));
    if(Number.isInteger(requested)&&requested>0){await startLevel(requested);return;}
    showOnly(dom.homeScreen);game.phase='home';
  }


  window.__JIGSAW__={game,startLevel,findHelpfulMove,commitMove,computeGroups,computeConnections,boardScore,generateLevel,settleGroupsRigid,gravityStep,validateMove,gridForLevel,isHardLevel,remainingDeckCount,updateBoardLayout,TILE_ASPECT,finishLevel,goHome,visibleCompletionImage,ensureVisibleCompletionSet,primeDecksForPlayableFrontier,resolveBoard,renderBoard,imageCountForLevel,selectedImagesForLevel,levelIntroCopy,pictureCount:PICTURE_PATHS.length,predictCascade,simulateDealWave,chainSpeedFactor,juice,registerClear,startFever,endFever};
  boot();
})();
