(() => {
  'use strict';

  const GRID = 4;
  const CELL_COUNT = GRID * GRID;
  const STORAGE_KEY = 'jigsaw-drop-h5-v2';
  const PICTURE_PATHS = [
    'assets/pictures/01-alpine-lake.webp',
    'assets/pictures/02-blue-alley.webp',
    'assets/pictures/03-golden-dog.webp',
    'assets/pictures/04-white-cat.webp',
    'assets/pictures/05-red-roses.webp',
    'assets/pictures/06-berry-basket.webp',
    'assets/pictures/07-vintage-phone.webp',
    'assets/pictures/08-city-bicycle.webp',
    'assets/pictures/09-tropical-beach.webp',
    'assets/pictures/10-hot-air-balloons.webp',
    'assets/pictures/11-neon-city.webp',
    'assets/pictures/12-autumn-forest.webp',
    'assets/pictures/13-mountain-cabin.webp',
    'assets/pictures/14-coffee-cup.webp',
    'assets/pictures/15-macarons.webp',
    'assets/pictures/16-sushi.webp',
    'assets/pictures/17-lemon-drink.webp',
    'assets/pictures/18-violin.webp',
    'assets/pictures/19-astronaut.webp',
    'assets/pictures/20-moon-castle.webp',
    'assets/pictures/21-waterfall.webp',
    'assets/pictures/22-lavender-field.webp',
    'assets/pictures/23-sunflower-field.webp',
    'assets/pictures/24-snow-village.webp',
    'assets/pictures/25-lighthouse.webp',
    'assets/pictures/26-red-car.webp',
    'assets/pictures/27-parrot.webp',
    'assets/pictures/28-fox.webp',
    'assets/pictures/29-koi-pond.webp',
    'assets/pictures/30-library.webp',
    'assets/pictures/31-cathedral.webp',
    'assets/pictures/32-desert.webp',
    'assets/pictures/33-sailboat.webp',
    'assets/pictures/34-cherry-bridge.webp',
    'assets/pictures/35-tropical-fish.webp',
    'assets/pictures/36-old-train.webp'
  ];
  const PICTURE_NAMES = [
    '高山湖泊','蓝白小巷','金毛伙伴','白猫','红玫瑰','莓果篮','复古电话','城市单车','热带海滩',
    '热气球','霓虹城市','秋日森林','山间木屋','咖啡时光','马卡龙','寿司拼盘','柠檬汽水','小提琴',
    '太空漫游','月夜城堡','林间瀑布','薰衣草田','向日葵','雪中小镇','海边灯塔','红色跑车','彩色鹦鹉',
    '森林狐狸','锦鲤池','老图书馆','古老教堂','沙漠旅人','白帆船','樱花桥','热带鱼','山间火车'
  ];
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
    constructor() { this.ctx = null; this.master = null; }
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
    noise(duration = .08, gain = .05) {
      if (!this.ensure()) return;
      const now = this.ctx.currentTime;
      const buffer = this.ctx.createBuffer(1, Math.max(1, this.ctx.sampleRate * duration), this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const src = this.ctx.createBufferSource(); const g = this.ctx.createGain();
      src.buffer = buffer; g.gain.value = gain; src.connect(g); g.connect(this.master); src.start(now);
    }
    tap() { this.tone(430, .045, 'triangle', .07, 0, 560); }
    swap() { this.tone(240, .09, 'triangle', .09, 0, 420); this.tone(430, .07, 'sine', .055, .045, 540); }
    merge() { this.tone(610, .1, 'sine', .09, 0, 770); this.tone(880, .1, 'sine', .06, .07, 1050); }
    clear() { [540, 690, 860, 1080].forEach((f, i) => this.tone(f, .16, i < 2 ? 'triangle' : 'sine', .09, i * .055, f * 1.04)); this.noise(.13, .025); }
    deal() { this.tone(190, .055, 'triangle', .055, 0, 245); }
    invalid() { this.tone(170, .13, 'sawtooth', .045, 0, 130); }
    win() { [523,659,784,1046].forEach((f,i)=>this.tone(f,.32,'triangle',.085,i*.12,f*1.01)); }
  }
  const audio = new AudioEngine();
  function haptic(pattern = 12) {
    if (save.settings.vibration && navigator.vibrate) navigator.vibrate(pattern);
  }

  const game = {
    level: save.level,
    phase: 'boot',
    board: Array(CELL_COUNT).fill(null),
    tiles: new Map(),
    deck: [],
    selectedImages: [],
    totalImages: 0,
    clearedImages: [],
    clearedCount: 0,
    moves: 0,
    comboMax: 1,
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
    unlockedThisLevel: []
  };

  const tileEls = new Map();
  const cellEls = [];
  for (let i = 0; i < CELL_COUNT; i++) {
    const cell = document.createElement('div');
    const { r, c } = idxToRC(i);
    cell.className = 'cell';
    cell.dataset.index = String(i);
    cell.style.left = `${c * 25}%`; cell.style.top = `${r * 25}%`;
    dom.cellLayer.appendChild(cell); cellEls.push(cell);
  }

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

  function imageCountForLevel(level) {
    if (level <= 2) return 5;
    if (level <= 5) return 6;
    if (level <= 10) return 7;
    if (level <= 18) return 8;
    // The board still shows only 16 pieces at once; extra images stay in the four feed columns.
    return Math.min(12, 8 + Math.floor((level - 19) / 8));
  }
  function selectedImagesForLevel(level, count) {
    const start = ((level - 1) * 5) % PICTURE_PATHS.length;
    return Array.from({ length: count }, (_, i) => (start + i) % PICTURE_PATHS.length);
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

    // Start from four solved 2x2 blocks, then apply deterministic swaps.
    const board = Array(CELL_COUNT).fill(null);
    const solvedAnchors = [[0,0],[0,2],[2,0],[2,2]];
    selected.slice(0,4).forEach((imageIndex, imageOrder) => {
      const [ar, ac] = solvedAnchors[imageOrder];
      byImage.get(imageIndex).forEach((id, q) => {
        const qp = QUADRANTS[q]; board[rcToIdx(ar + qp.y, ac + qp.x)] = id;
      });
    });
    const swaps = Math.min(30, 7 + Math.floor((level - 1) * 1.8));
    for (let n = 0; n < swaps; n++) {
      let a = Math.floor(rnd() * CELL_COUNT), b = Math.floor(rnd() * CELL_COUNT);
      if (a === b) b = (b + 5) % CELL_COUNT;
      [board[a], board[b]] = [board[b], board[a]];
    }
    // Ensure no picture begins fully completed and at least one partial pair remains for an inviting first move.
    let guard = 0;
    while (findCompleteGroups(board, tiles).length && guard++ < 100) {
      const a = Math.floor(rnd() * CELL_COUNT), b = (a + 5 + Math.floor(rnd() * 7)) % CELL_COUNT;
      [board[a], board[b]] = [board[b], board[a]];
    }
    if (computeConnections(board, tiles).size === 0) {
      // Put two compatible pieces together, while keeping the board unsolved.
      const imageIndex = selected[0]; const ids = byImage.get(imageIndex);
      const positions = ids.map((id) => board.indexOf(id));
      const targetA = rcToIdx(0, 0), targetB = rcToIdx(0, 1);
      const swapInto = (from, to) => { const p = board.indexOf(from); [board[p], board[to]] = [board[to], board[p]]; };
      swapInto(ids[0], targetA); swapInto(ids[1], targetB);
      if (findCompleteGroups(board, tiles).length) [board[positions[2]], board[(positions[2] + 3) % CELL_COUNT]] = [board[(positions[2] + 3) % CELL_COUNT], board[positions[2]]];
    }

    const deck = [];
    selected.slice(4).forEach((imageIndex) => deck.push(...byImage.get(imageIndex)));
    shuffle(deck, rnd);
    return { seed, board, deck, tiles, selected, imageCount };
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
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `${PICTURE_NAMES[tile.imageIndex]}的第${tile.quadrant + 1}块碎片`);
      el.style.backgroundImage = `url("${PICTURE_PATHS[tile.imageIndex]}")`;
      el.style.backgroundPosition = QUADRANTS[tile.quadrant].bg;
      el.addEventListener('pointerdown', onTilePointerDown);
      tileEls.set(tile.id, el); dom.tileLayer.appendChild(el);
    }
    return el;
  }

  function renderBoard(options = {}) {
    const hiddenIds = options.hiddenIds || new Set();
    game.groups = computeGroups();
    game.connections = computeConnections();
    const joinMap = new Map();
    game.board.forEach((id) => { if (id) joinMap.set(id, { left:false,right:false,up:false,down:false }); });
    for (let i = 0; i < CELL_COUNT; i++) {
      const id = game.board[i]; if (!id) continue;
      const tile = game.tiles.get(id); const {r,c}=idxToRC(i);
      if (c>0 && game.board[i-1] && isCompatibleEdge(game.tiles.get(game.board[i-1]),tile,0,1)) joinMap.get(id).left=true;
      if (c<3 && game.board[i+1] && isCompatibleEdge(tile,game.tiles.get(game.board[i+1]),0,1)) joinMap.get(id).right=true;
      if (r>0 && game.board[i-4] && isCompatibleEdge(game.tiles.get(game.board[i-4]),tile,1,0)) joinMap.get(id).up=true;
      if (r<3 && game.board[i+4] && isCompatibleEdge(tile,game.tiles.get(game.board[i+4]),1,0)) joinMap.get(id).down=true;
    }
    const activeIds = new Set(game.board.filter(Boolean));
    for (const [id, el] of tileEls) {
      if (!activeIds.has(id)) { el.style.display='none'; continue; }
      el.style.display='block';
      const index = game.board.indexOf(id); const {r,c}=idxToRC(index);
      el.dataset.cellIndex = String(index);
      el.style.left = `${c*25}%`; el.style.top = `${r*25}%`;
      el.style.opacity = hiddenIds.has(id) ? '0' : '1';
      el.style.zIndex = String(10 + r);
      el.classList.remove('join-left','join-right','join-up','join-down');
      const join = joinMap.get(id);
      if (join.left) el.classList.add('join-left'); if (join.right) el.classList.add('join-right');
      if (join.up) el.classList.add('join-up'); if (join.down) el.classList.add('join-down');
    }
    activeIds.forEach((id) => ensureTileElement(game.tiles.get(id)));
    // A second pass is needed for newly-created elements.
    for (const id of activeIds) {
      const el = tileEls.get(id); const index=game.board.indexOf(id); const {r,c}=idxToRC(index); const join=joinMap.get(id);
      el.style.display='block'; el.dataset.cellIndex=String(index); el.style.left=`${c*25}%`; el.style.top=`${r*25}%`; el.style.opacity=hiddenIds.has(id)?'0':'1'; el.style.zIndex=String(10+r);
      el.classList.remove('join-left','join-right','join-up','join-down');
      if(join.left)el.classList.add('join-left'); if(join.right)el.classList.add('join-right'); if(join.up)el.classList.add('join-up'); if(join.down)el.classList.add('join-down');
    }
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
  }

  function updateDeckVisuals() {
    const remaining = game.deck.length;
    const columns = [...dom.deckArea.querySelectorAll('.deck-column')];
    columns.forEach((col, i) => {
      const visualCount = Math.max(0, Math.ceil((remaining - i) / 4));
      col.classList.toggle('is-empty', visualCount <= 0);
      col.dataset.showCount = visualCount > 3 ? 'true' : 'false';
      const countEl = col.querySelector('.deck-count'); countEl.textContent = visualCount > 0 ? String(visualCount) : '';
    });
  }

  function captureTileRects() {
    const rects = new Map();
    for (const [id, el] of tileEls) {
      if (el.style.display !== 'none' && game.board.includes(id)) rects.set(id, el.getBoundingClientRect());
    }
    return rects;
  }

  async function animateFlipFromRects(firstRects, duration = 300) {
    const moving = [];
    for (const [id, el] of tileEls) {
      if (!game.board.includes(id) || !firstRects.has(id)) continue;
      el.style.transition = 'none'; el.style.transform = 'none';
      const last = el.getBoundingClientRect(), first = firstRects.get(id);
      const dx = first.left - last.left, dy = first.top - last.top;
      if (Math.abs(dx) > .5 || Math.abs(dy) > .5) {
        el.style.transform = `translate3d(${dx}px,${dy}px,0)`; moving.push(el);
      }
    }
    if (!moving.length) return;
    // Force style flush.
    void dom.board.offsetWidth;
    requestAnimationFrame(() => moving.forEach((el) => {
      el.style.transition = `transform ${duration}ms cubic-bezier(.22,.88,.28,1)`;
      el.style.transform = 'none';
    }));
    await delay(duration + 35);
    moving.forEach((el) => { el.style.transition=''; el.style.transform=''; });
  }

  function clearCellHighlights() {
    cellEls.forEach((cell) => cell.classList.remove('is-source','is-target','is-target-invalid'));
  }

  function validateMove(sourceGroup, dr, dc, board = game.board, groups = game.groups, options = {}) {
    if (!sourceGroup || (!dr && !dc)) return { valid:false, reason:'same' };
    const cells = sourceGroup.cells.slice();
    const sourceSet = new Set(cells);
    const targets = [];
    for (const index of cells) {
      const {r,c}=idxToRC(index), nr=r+dr, nc=c+dc;
      if (nr<0||nr>=GRID||nc<0||nc>=GRID) return {valid:false,reason:'bounds'};
      targets.push(rcToIdx(nr,nc));
    }
    const targetSet = new Set(targets);
    if (targets.some((index)=>sourceSet.has(index))) return {valid:false,reason:'overlap',targets};

    const next = board.slice();
    const sourceValues = cells.map((cell)=>board[cell]);
    const displaced = targets.map((cell)=>board[cell]);

    // Clear both regions first, then perform a position-preserving region swap.
    cells.forEach((cell)=>{ next[cell]=null; });
    targets.forEach((cell)=>{ next[cell]=null; });
    targets.forEach((cell,i)=>{ next[cell]=sourceValues[i] || null; });
    cells.forEach((cell,i)=>{ next[cell]=displaced[i] || null; });

    // Sanity: never duplicate or lose pieces.
    const beforeIds = board.filter(Boolean).slice().sort().join('|');
    const afterIds = next.filter(Boolean).slice().sort().join('|');
    if (beforeIds !== afterIds) return {valid:false,reason:'integrity',targets};
    return {valid:true,targets,board:next,displaced};
  }

  function onTilePointerDown(event) {
    if (game.phase !== 'idle') return;
    audio.ensure();
    const id = event.currentTarget.dataset.tileId;
    const index = game.board.indexOf(id); if (index < 0) return;
    const joined = groupAtCell(index);
    if (!joined) return;
    event.preventDefault();
    const rect = dom.board.getBoundingClientRect();
    const single = { ids:[id], cells:[index], imageIndex:game.tiles.get(id)?.imageIndex, complete:false };
    const drag = {
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY, dx:0,dy:0,
      joinedGroup:joined, sourceGroup:single, sourceIds:[id], sourceCells:[index],
      boardRect:rect, cellSize:rect.width/GRID, lastDr:0,lastDc:0, validation:null,
      mode:'single', pressedAt:performance.now(), moved:false, holdTimer:0
    };
    if (joined.ids.length > 1) {
      drag.holdTimer = window.setTimeout(()=>{
        if (!game.drag || game.drag !== drag || drag.moved) return;
        drag.mode='group'; drag.sourceGroup=joined; drag.sourceIds=joined.ids.slice(); drag.sourceCells=joined.cells.slice();
        clearCellHighlights();
        drag.sourceCells.forEach((cell)=>cellEls[cell].classList.add('is-source'));
        drag.sourceIds.forEach((tileId)=>tileEls.get(tileId)?.classList.add('is-dragging'));
        showToast('整组移动',650); haptic(12); audio.merge();
      },180);
    }
    game.drag=drag; game.phase='dragging';
    drag.sourceCells.forEach((cell)=>cellEls[cell].classList.add('is-source'));
    drag.sourceIds.forEach((tileId)=>tileEls.get(tileId)?.classList.add('is-dragging'));
    window.addEventListener('pointermove', onDragMove, {passive:false});
    window.addEventListener('pointerup', onDragEnd, {passive:false,once:true});
    window.addEventListener('pointercancel', onDragEnd, {passive:false,once:true});
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch (_) {}
    audio.tap(); haptic(7);
  }

  function onDragMove(event) {
    const drag=game.drag; if(!drag||event.pointerId!==drag.pointerId)return;
    event.preventDefault();
    drag.dx=event.clientX-drag.startX; drag.dy=event.clientY-drag.startY;
    if (Math.hypot(drag.dx,drag.dy) > Math.max(7,drag.cellSize*.08)) {
      drag.moved=true;
      if (drag.holdTimer) { clearTimeout(drag.holdTimer); drag.holdTimer=0; }
    }
    drag.sourceIds.forEach((id)=>{
      const el=tileEls.get(id); if(el)el.style.transform=`translate3d(${drag.dx}px,${drag.dy}px,0) scale(1.035)`;
    });
    const dc=Math.round(drag.dx/drag.cellSize), dr=Math.round(drag.dy/drag.cellSize);
    if(dc===drag.lastDc&&dr===drag.lastDr)return;
    drag.lastDc=dc; drag.lastDr=dr; clearCellHighlights(); drag.sourceCells.forEach((cell)=>cellEls[cell].classList.add('is-source'));
    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell].classList.add(result.valid?'is-target':'is-target-invalid'));
  }

  async function onDragEnd(event) {
    const drag=game.drag; if(!drag)return;
    if (drag.holdTimer) clearTimeout(drag.holdTimer);
    window.removeEventListener('pointermove',onDragMove);
    window.removeEventListener('pointerup',onDragEnd);
    window.removeEventListener('pointercancel',onDragEnd);
    clearCellHighlights(); game.drag=null;

    // A tap is not a move and should never break a joined image.
    if (!drag.moved || (!drag.lastDr && !drag.lastDc)) {
      drag.sourceIds.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transform='';el.classList.remove('is-dragging');}});
      game.phase='idle'; return;
    }
    const validation=drag.validation || validateMove(drag.sourceGroup,drag.lastDr,drag.lastDc);
    if(validation.valid) {
      await commitMove(drag.sourceGroup,drag.lastDr,drag.lastDc,validation.board,true);
    } else {
      audio.invalid(); haptic([10,25,10]);
      drag.sourceIds.forEach((id)=>{
        const el=tileEls.get(id); if(!el)return;
        el.style.transition='transform 180ms cubic-bezier(.2,.9,.25,1.18)'; el.style.transform='none';
      });
      await delay(195);
      drag.sourceIds.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transition='';el.style.transform='';el.classList.remove('is-dragging');}});
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
    game.board=validation.board; game.moves++; renderBoard(); updateHud();
    await animateFlipFromRects(firstRects,285);
    audio.swap(); haptic(10);
    if (!save.tutorialSeen && game.level===1) {
      save.tutorialSeen=true; persist(); dom.tutorialHand.classList.remove('is-visible');
    }
    await resolveBoard(0,beforeConnections);
    return true;
  }

  function boardScore(board) {
    const groups=computeGroups(board,game.tiles);
    const connections=computeConnections(board,game.tiles).size;
    const complete=groups.filter(g=>g.complete).length;
    const groupBonus=groups.reduce((sum,g)=>sum+(g.ids.length>1?g.ids.length*g.ids.length:0),0);
    return complete*1000+connections*48+groupBonus*5;
  }

  function findHelpfulMove() {
    const groups=computeGroups();
    const base=boardScore(game.board); let best=null;
    for (const group of groups) {
      for (let dr=-(GRID-1);dr<=GRID-1;dr++) for(let dc=-(GRID-1);dc<=GRID-1;dc++) {
        if(!dr&&!dc)continue;
        const result=validateMove(group,dr,dc,game.board,groups); if(!result.valid)continue;
        const score=boardScore(result.board);
        const sameImageNear = group.ids.some((id)=>{
          const image=game.tiles.get(id).imageIndex;
          return computeGroups(result.board,game.tiles).some(g=>g.imageIndex===image&&g.ids.length>group.ids.length);
        });
        const adjusted=score+(sameImageNear?35:0);
        if(!best||adjusted>best.score)best={group,dr,dc,board:result.board,score:adjusted,rawScore:score};
      }
    }
    if(best&&best.rawScore>=base) return best;
    return best;
  }

  function markHint(move) {
    clearHintMarks();
    const targetCells=move.group.cells.map((i)=>{const {r,c}=idxToRC(i);return rcToIdx(r+move.dr,c+move.dc);});
    move.group.ids.forEach((id)=>tileEls.get(id)?.classList.add('is-hint-source'));
    targetCells.forEach((cell)=>{
      cellEls[cell].classList.add('is-target');
      const id=game.board[cell]; if(id)tileEls.get(id)?.classList.add('is-hint-target');
    });
    drawHintArrow(move.group.cells,targetCells);
    game.hintTimer=window.setTimeout(clearHintMarks,2300);
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
    const points=cells.map((i)=>{const {r,c}=idxToRC(i);return{x:(c+.5)*25,y:(r+.5)*25};});
    return {x:points.reduce((s,p)=>s+p.x,0)/points.length,y:points.reduce((s,p)=>s+p.y,0)/points.length};
  }
  function clearHintMarks() {
    clearTimeout(game.hintTimer);
    tileEls.forEach((el)=>el.classList.remove('is-hint-source','is-hint-target'));
    cellEls.forEach((el)=>el.classList.remove('is-target'));
    dom.fxLayer.querySelectorAll('.hint-arrow').forEach((el)=>el.remove());
  }

  async function useHint() {
    if(game.phase!=='idle')return;
    if(game.hintCount<=0){showToast('提示次数用完啦');audio.invalid();return;}
    const move=findHelpfulMove();
    if(!move){showToast('试试直接拖一块拆开，或长按后整组移动');audio.invalid();return;}
    game.hintCount--;updateHud();markHint(move);audio.merge();showToast('直接拖可拆单块；长按再拖可搬整组');
  }
  async function useAuto() {
    if(game.phase!=='idle')return;
    if(game.autoCount<=0){showToast('自动整理次数用完啦');audio.invalid();return;}
    const move=findHelpfulMove();
    if(!move){showToast('暂时没有更优的一步');audio.invalid();return;}
    game.autoCount--;updateHud();markHint(move);game.phase='hinting';await delay(520);clearHintMarks();
    await commitMove(move.group,move.dr,move.dc,move.board,false);
  }

  async function resolveBoard(chain=0,beforeConnections=new Set()) {
    game.phase='resolving';
    game.groups=computeGroups(); game.connections=computeConnections();
    const newIds=new Set();
    for(const edge of game.connections) if(!beforeConnections.has(edge)) edge.split('|').forEach(id=>newIds.add(id));
    if(newIds.size) {
      newIds.forEach((id)=>tileEls.get(id)?.classList.add('merge-pop'));
      audio.merge(); haptic(14);
      await delay(360);
      newIds.forEach((id)=>tileEls.get(id)?.classList.remove('merge-pop'));
    }
    const complete=game.groups.filter(g=>g.complete);
    if(complete.length) {
      const nextChain=chain+complete.length; game.comboMax=Math.max(game.comboMax,nextChain);
      if(nextChain>=2)showCombo(nextChain); else showToast(['拼好了！','漂亮！','完美拼接！'][game.clearedCount%3]);
      await animateAndClear(complete);
      await applyGravity();
      await dealIntoBoard();
      const postDealConnections=new Set(game.connections);
      await resolveBoard(nextChain,postDealConnections);
      return;
    }
    if(game.deck.length===0 && game.board.every(v=>!v)) { await finishLevel(); return; }
    game.phase='idle';
  }

  async function animateAndClear(groups) {
    const clearIds=[]; const overlays=[];
    for(const group of groups) {
      clearIds.push(...group.ids);
      const overlay=document.createElement('div');overlay.className='complete-overlay';
      overlay.style.left=`${group.minC*25}%`;overlay.style.top=`${group.minR*25}%`;
      overlay.style.width=`${(group.maxC-group.minC+1)*25}%`;overlay.style.height=`${(group.maxR-group.minR+1)*25}%`;
      overlay.style.backgroundImage=`url("${PICTURE_PATHS[group.imageIndex]}")`;dom.fxLayer.appendChild(overlay);overlays.push(overlay);
      createSparks((group.minC+1)*25,(group.minR+1)*25,18);
      if(!game.clearedImages.includes(group.imageIndex)) game.clearedImages.push(group.imageIndex);
      if(!save.unlocked.includes(group.imageIndex)&&!game.unlockedThisLevel.includes(group.imageIndex))game.unlockedThisLevel.push(group.imageIndex);
    }
    clearIds.forEach((id)=>tileEls.get(id)?.classList.add('clear-out'));
    audio.clear();haptic([25,25,35]);
    await delay(560);
    game.board=game.board.map((id)=>clearIds.includes(id)?null:id);
    clearIds.forEach((id)=>{const el=tileEls.get(id);if(el){el.remove();tileEls.delete(id);}});
    overlays.forEach((el)=>el.remove());
    game.clearedCount+=groups.length;renderBoard();
  }

  function createSparks(xPercent,yPercent,count=14) {
    for(let i=0;i<count;i++){
      const el=document.createElement('i');el.className='spark';el.style.left=`calc(${xPercent}% - 3px)`;el.style.top=`calc(${yPercent}% - 3px)`;
      const a=Math.random()*Math.PI*2,d=35+Math.random()*85;el.style.setProperty('--dx',`${Math.cos(a)*d}px`);el.style.setProperty('--dy',`${Math.sin(a)*d}px`);
      el.style.animationDelay=`${Math.random()*80}ms`;dom.fxLayer.appendChild(el);setTimeout(()=>el.remove(),900);
    }
  }

  function settleGroupsRigid(board) {
    const next=Array(CELL_COUNT).fill(null);
    for(let c=0;c<GRID;c++){
      const ids=[];
      for(let r=GRID-1;r>=0;r--){
        const id=board[rcToIdx(r,c)]; if(id) ids.push(id);
      }
      ids.forEach((id,k)=>{ next[rcToIdx(GRID-1-k,c)]=id; });
    }
    return next;
  }

  async function applyGravity() {
    const next=settleGroupsRigid(game.board);
    if(next.every((id,i)=>id===game.board[i]))return;
    const oldIndex=new Map(); game.board.forEach((id,i)=>{if(id)oldIndex.set(id,i);});
    const first=captureTileRects(); game.board=next; renderBoard();
    let maxRows=1;
    next.forEach((id,i)=>{
      if(!id)return; const from=oldIndex.get(id); if(from==null)return;
      maxRows=Math.max(maxRows,Math.max(0,idxToRC(i).r-idxToRC(from).r));
    });
    const duration=Math.min(420,170+maxRows*62);
    await animateFlipFromRects(first,duration);
    const landed=[];
    next.forEach((id,i)=>{
      if(!id)return; const from=oldIndex.get(id); if(from!=null&&idxToRC(i).r>idxToRC(from).r)landed.push(id);
    });
    landed.forEach((id)=>tileEls.get(id)?.classList.add('land-pop'));
    if(landed.length){ haptic(Math.min(24,7+maxRows*4)); audio.deal(); }
    await delay(95);
    landed.forEach((id)=>tileEls.get(id)?.classList.remove('land-pop'));
    game.groups=computeGroups(); game.connections=computeConnections(); renderBoard();
  }

  async function dealIntoBoard() {
    const empty=[];
    for(let r=0;r<GRID;r++)for(let c=0;c<GRID;c++){const i=rcToIdx(r,c);if(!game.board[i]&&game.deck.length)empty.push(i);}
    if(!empty.length)return;
    const dealt=[];
    for(const index of empty){if(!game.deck.length)break;const id=game.deck.shift();game.board[index]=id;dealt.push({index,id});}
    const hidden=new Set(dealt.map(d=>d.id));renderBoard({hiddenIds:hidden});updateDeckVisuals();
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();const dropY=Math.max(130,boardRect.top-deckRect.top+40);
    dealt.forEach((item,n)=>{
      const {r,c}=idxToRC(item.index);const card=document.createElement('div');card.className='deal-card';card.style.left=`${c*25}%`;card.style.top=`${r*25}%`;card.style.setProperty('--drop-y',`${dropY+r*24}px`);card.style.animationDelay=`${n*38}ms`;
      card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{audio.deal();const tile=tileEls.get(item.id);if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),520);}card.remove();},290+n*38);
    });
    await delay(360+dealt.length*38+450);
    game.groups=computeGroups();game.connections=computeConnections();renderBoard();
  }

  function showCombo(value) {
    dom.comboToast.querySelector('strong').textContent=`× ${value}`;
    dom.comboToast.classList.remove('is-visible');void dom.comboToast.offsetWidth;dom.comboToast.classList.add('is-visible');
    setTimeout(()=>dom.comboToast.classList.remove('is-visible'),920);
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
    game.level=Math.max(1,level);game.phase='loading';game.moves=0;game.clearedCount=0;game.clearedImages=[];game.unlockedThisLevel=[];game.comboMax=1;game.hintCount=3;game.autoCount=3;game.timerBase=0;game.timerRunning=false;
    tileEls.forEach((el)=>el.remove());tileEls.clear();dom.fxLayer.innerHTML='';clearCellHighlights();
    const generated=generateLevel(game.level);game.generation=generated;game.initialSeed=generated.seed;game.board=generated.board.slice();game.deck=generated.deck.slice();game.tiles=generated.tiles;game.selectedImages=generated.selected;game.totalImages=generated.imageCount;
    dom.introLevel.textContent=String(game.level);dom.introText.textContent=game.level===1?'把四块碎片拼成一张完整图片':'新的图片正在落下';
    dom.levelIntro.classList.add('is-visible');updateHud();updateDeckVisuals();
    await preloadImages(game.selectedImages);renderBoard({hiddenIds:new Set(game.board.filter(Boolean))});
    await delay(300);await initialDealAnimation();
    await delay(120);dom.levelIntro.classList.remove('is-visible');startTimer();game.phase='idle';
    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('拖动碎片交换位置，正确的边会自动吸附',2800);}else dom.tutorialHand.classList.remove('is-visible');
  }

  async function initialDealAnimation() {
    const items=game.board.map((id,index)=>({id,index})).filter(x=>x.id);
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();const dropY=Math.max(170,boardRect.top-deckRect.top+60);
    items.forEach(({id,index},n)=>{
      const {r,c}=idxToRC(index);const card=document.createElement('div');card.className='deal-card';card.style.left=`${c*25}%`;card.style.top=`${r*25}%`;card.style.setProperty('--drop-y',`${dropY+r*26}px`);const stagger=r*85+c*28;card.style.animationDelay=`${stagger}ms`;card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{audio.deal();const tile=tileEls.get(id);if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),520);}card.remove();},330+stagger);
    });
    await delay(330+3*85+3*28+560);renderBoard();
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
    window.addEventListener('resize',()=>{if(game.phase==='dragging'&&game.drag){game.drag.boardRect=dom.board.getBoundingClientRect();game.drag.cellSize=game.drag.boardRect.width/GRID;}});
    window.addEventListener('contextmenu',(event)=>event.preventDefault());
  }

  async function boot() {
    bindEvents();updateHome();
    if(location.protocol.startsWith('http')&&'serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
    await preloadImages([((save.level-1)*5)%PICTURE_PATHS.length]);
    await delay(1350);dom.splash.classList.remove('is-visible');showOnly(dom.homeScreen);game.phase='home';
  }

  window.__JIGSAW__={game,startLevel,findHelpfulMove,commitMove,computeGroups,computeConnections,boardScore,generateLevel,settleGroupsRigid,finishLevel,goHome};
  boot();
})();
