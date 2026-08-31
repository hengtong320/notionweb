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
    movesSinceClear: 0
  };

  const tileEls = new Map();
  const cellEls = [];

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
      col.innerHTML = '<div class="deck-stack"></div><span class="deck-count"></span>';
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
    if (level <= 2) return 5;
    if (level <= 5) return 6;
    if (level <= 10) return 7;
    if (level <= 14) return 8;
    if (isHardLevel(level)) return Math.min(18, 15 + Math.floor((level - 15) / 10));
    return Math.min(15, 10 + Math.floor((level - 15) / 3));
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

    // Never begin with an immediately complete 2x2 image.
    let guard = 0;
    while (findCompleteGroups(board, tiles).length && guard++ < 80) {
      const group = findCompleteGroups(board, tiles)[0];
      const cell = group.cells[group.cells.length - 1];
      let other = Math.floor(rnd() * CELL_COUNT);
      let tries = 0;
      while ((group.cells.includes(other) || tiles.get(board[other])?.imageIndex === group.imageIndex) && tries++ < 40) {
        other = Math.floor(rnd() * CELL_COUNT);
      }
      [board[cell], board[other]] = [board[other], board[cell]];
    }

    return { seed, board, decks, tiles, selected, imageCount, grid: GRID };
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
      if (c<GRID-1 && game.board[i+1] && isCompatibleEdge(tile,game.tiles.get(game.board[i+1]),0,1)) joinMap.get(id).right=true;
      if (r>0 && game.board[i-GRID] && isCompatibleEdge(game.tiles.get(game.board[i-GRID]),tile,1,0)) joinMap.get(id).up=true;
      if (r<GRID-1 && game.board[i+GRID] && isCompatibleEdge(tile,game.tiles.get(game.board[i+GRID]),1,0)) joinMap.get(id).down=true;
    }
    const activeIds = new Set(game.board.filter(Boolean));
    const indexById = new Map();
    game.board.forEach((id,index)=>{ if(id) indexById.set(id,index); });
    for (const [id, el] of tileEls) {
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

  function remainingDeckCount() {
    return (game.decks || []).reduce((sum, deck) => sum + deck.length, 0);
  }

  function updateDeckVisuals() {
    const columns = [...dom.deckArea.querySelectorAll('.deck-column')];
    columns.forEach((col, i) => {
      const count = game.decks?.[i]?.length || 0;
      col.classList.toggle('is-empty', count <= 0);
      col.dataset.depth = String(Math.min(3, count));
      col.dataset.showCount = 'false';
      const countEl = col.querySelector('.deck-count');
      if (countEl) countEl.textContent = '';
    });
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
    game.board=validation.board; game.moves++; game.movesSinceClear=(game.movesSinceClear||0)+1; renderBoard(); updateHud();
    await animateFlipFromRects(firstRects,235);
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

  function findHelpfulMove() {
    const groups=computeGroups();
    const base=boardScore(game.board); let best=null;
    for (const group of groups) {
      for (let dr=-(GRID-1);dr<=GRID-1;dr++) for(let dc=-(GRID-1);dc<=GRID-1;dc++) {
        if(!dr&&!dc)continue;
        const result=validateMove(group,dr,dc,game.board,groups); if(!result.valid)continue;
        const score=boardScore(result.board);
        const afterGroups=computeGroups(result.board,game.tiles);
        const completes=afterGroups.filter(g=>g.complete).length;
        const movedGrowth=group.ids.reduce((bestGrowth,id)=>{
          const targetIndex=result.board.indexOf(id);
          const after=afterGroups.find(g=>g.cells.includes(targetIndex));
          return Math.max(bestGrowth,(after?.ids.length||1)-group.ids.length);
        },0);
        const adjusted=score+completes*420+movedGrowth*75;
        if(!best||adjusted>best.score)best={group,dr,dc,board:result.board,score:adjusted,rawScore:score};
      }
    }
    if(best&&best.rawScore>=base-30) return best;
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
    const points=cells.map((i)=>{
      const g=cellRectPercent(i);
      return{x:g.left+g.width/2,y:g.top+g.height/2};
    });
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
    if(!move){showToast('拼好的组合可以整体搬动，也可以被其他碎片拆开替换');audio.invalid();return;}
    game.hintCount--;updateHud();markHint(move);audio.merge();showToast('拖动发光的拼合块到目标区域');
  }

  async function useAuto() {
    if(game.phase!=='idle')return;
    if(game.autoCount<=0){showToast('自动整理次数用完啦');audio.invalid();return;}
    const move=findHelpfulMove();
    if(!move){showToast('暂时没有更优的一步');audio.invalid();return;}
    game.autoCount--;updateHud();markHint(move);game.phase='hinting';await delay(520);clearHintMarks();
    await commitMove(move.group,move.dr,move.dc,move.board,false);
  }

  function buildRescueBoard() {
    if ((game.movesSinceClear||0) < Math.max(12, GRID*3)) return null;
    const allLocations=new Map();
    game.board.forEach((id,i)=>{if(id)allLocations.set(id,{kind:'board',index:i});});
    game.decks.forEach((deck,c)=>deck.forEach((id,p)=>allLocations.set(id,{kind:'deck',col:c,pos:p})));
    const candidates=[...new Set([...game.tiles.values()].map(t=>t.imageIndex))];
    for(const imageIndex of candidates){
      const ids=[0,1,2,3].map(q=>[...game.tiles.values()].find(t=>t.imageIndex===imageIndex&&t.quadrant===q)?.id);
      if(ids.some(id=>!id||!allLocations.has(id)))continue;
      // Prefer an image already fully present on the board; otherwise do not pull through a deck.
      if(!ids.every(id=>allLocations.get(id).kind==='board'))continue;
      for(let r=GRID-2;r>=0;r--)for(let c=0;c<GRID-1;c++){
        const targets=[rcToIdx(r,c),rcToIdx(r,c+1),rcToIdx(r+1,c),rcToIdx(r+1,c+1)];
        const next=game.board.slice();
        const sourceCells=ids.map(id=>next.indexOf(id));
        // Permute by swaps so tile integrity is preserved.
        for(let q=0;q<4;q++){
          const want=ids[q], target=targets[q], src=next.indexOf(want);
          if(src<0)break;
          [next[src],next[target]]=[next[target],next[src]];
        }
        if(findCompleteGroups(next,game.tiles).some(g=>g.imageIndex===imageIndex))return next;
      }
    }
    return null;
  }

  async function rescueIfStalled() {
    const next=buildRescueBoard();
    if(!next)return false;
    const first=captureTileRects();
    game.board=next; renderBoard();
    await animateFlipFromRects(first,260);
    game.movesSinceClear=0;
    showToast('已自动解开死局',900); audio.merge(); haptic(16);
    return true;
  }

  async function resolveBoard(beforeConnections=new Set(), isPlayerMove=false) {
    game.phase='resolving';
    if (isPlayerMove) game.comboStreak=0;
    let baseline=new Set(beforeConnections);
    let safety=0;

    while (safety++ < 96) {
      game.groups=computeGroups(); game.connections=computeConnections();
      const newIds=new Set();
      for(const edge of game.connections) if(!baseline.has(edge)) edge.split('|').forEach(id=>newIds.add(id));
      if(newIds.size) {
        newIds.forEach((id)=>tileEls.get(id)?.classList.add('merge-pop'));
        audio.merge(); haptic(14);
        await delay(220);
        newIds.forEach((id)=>tileEls.get(id)?.classList.remove('merge-pop'));
      }

      const complete=game.groups.filter(g=>g.complete);
      if(complete.length) {
        game.comboStreak += complete.length;
        game.comboMax=Math.max(game.comboMax,game.comboStreak);
        if(game.comboStreak>=2) showCombo(game.comboStreak);
        else showToast('拼好了！',650);
        await animateAndClear(complete);
        baseline=new Set(computeConnections());
        continue;
      }

      // Reference behavior: unsupported pieces/groups always fall after a move.
      const beforeGravity=new Set(game.connections);
      const moved=await applyGravity();
      if(moved) {
        baseline=beforeGravity;
        continue;
      }

      // Once stable, each column independently feeds its accessible top vacancies.
      const beforeDeal=new Set(game.connections);
      const dealt=await dealIntoBoard();
      if(dealt) {
        baseline=beforeDeal;
        continue;
      }
      if (await rescueIfStalled()) { baseline=new Set(); continue; }
      break;
    }

    if(remainingDeckCount()===0 && game.board.every(v=>!v)) { await finishLevel(); return; }
    game.phase='idle';
  }



  async function animateAndClear(groups) {
    const clearIds=[]; const overlays=[];
    for(const group of groups) {
      clearIds.push(...group.ids);
      const overlay=document.createElement('div');overlay.className='complete-overlay';
      const rect=groupRectPercent(group);
      overlay.style.left=`${rect.left}%`;overlay.style.top=`${rect.top}%`;
      overlay.style.width=`${rect.width}%`;overlay.style.height=`${rect.height}%`;
      overlay.style.backgroundImage=`url("${PICTURE_PATHS[group.imageIndex]}")`;dom.fxLayer.appendChild(overlay);overlays.push(overlay);
      createSparks(rect.left+rect.width/2,rect.top+rect.height/2,20);
      if(!game.clearedImages.includes(group.imageIndex)) game.clearedImages.push(group.imageIndex);
      if(!save.unlocked.includes(group.imageIndex)&&!game.unlockedThisLevel.includes(group.imageIndex))game.unlockedThisLevel.push(group.imageIndex);
    }
    clearIds.forEach((id)=>tileEls.get(id)?.classList.add('clear-out'));
    audio.clear();haptic([25,25,35]);
    // The reference holds the completed 2x2 image on screen long enough to read it.
    await delay(720);
    game.board=game.board.map((id)=>clearIds.includes(id)?null:id);
    clearIds.forEach((id)=>{const el=tileEls.get(id);if(el){el.remove();tileEls.delete(id);}});
    overlays.forEach((el)=>el.remove());
    game.clearedCount+=groups.length;game.movesSinceClear=0;renderBoard();
  }


  function createSparks(xPercent,yPercent,count=14) {
    for(let i=0;i<count;i++){
      const el=document.createElement('i');el.className='spark';el.style.left=`calc(${xPercent}% - 3px)`;el.style.top=`calc(${yPercent}% - 3px)`;
      const a=Math.random()*Math.PI*2,d=35+Math.random()*85;el.style.setProperty('--dx',`${Math.cos(a)*d}px`);el.style.setProperty('--dy',`${Math.sin(a)*d}px`);
      el.style.animationDelay=`${Math.random()*80}ms`;dom.fxLayer.appendChild(el);setTimeout(()=>el.remove(),900);
    }
  }

  function gravityStep(board) {
    const groups=computeGroups(board,game.tiles).sort((a,b)=>b.maxR-a.maxR||b.minR-a.minR);
    const owner=new Map();
    groups.forEach((group)=>group.cells.forEach((cell)=>owner.set(cell,group)));
    const movable=new Set();
    let changed=true;
    while(changed) {
      changed=false;
      for(const group of groups) {
        if(movable.has(group.key)||group.maxR>=GRID-1)continue;
        const own=new Set(group.cells);
        const can=group.cells.every((cell)=>{
          const target=cell+GRID;
          if(target>=CELL_COUNT)return false;
          if(own.has(target)||!board[target])return true;
          const blocker=owner.get(target);
          return blocker ? movable.has(blocker.key) : false;
        });
        if(can){movable.add(group.key);changed=true;}
      }
    }
    const movingGroups=groups.filter((group)=>movable.has(group.key));
    if(!movingGroups.length)return{moved:false,board:board.slice(),ids:[]};
    const next=board.slice();
    const entries=[];
    movingGroups.forEach((group)=>group.cells.forEach((cell)=>entries.push([cell,board[cell]])));
    entries.forEach(([cell])=>{next[cell]=null;});
    entries.sort((a,b)=>b[0]-a[0]).forEach(([cell,id])=>{next[cell+GRID]=id;});
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
    let wave=0, moved=false;
    const movedIds=new Set();
    while(wave<GRID*GRID*2) {
      const step=gravityStep(game.board);
      if(!step.moved)break;
      moved=true; step.ids.forEach((id)=>movedIds.add(id));
      const first=captureTileRects();
      game.board=step.board; renderBoard();
      const duration=Math.max(72,128-wave*12);
      await animateFlipFromRects(first,duration);
      wave++;
    }
    if(moved) {
      movedIds.forEach((id)=>tileEls.get(id)?.classList.add('land-pop'));
      audio.deal(); haptic(Math.min(28,8+wave*4));
      await delay(95);
      movedIds.forEach((id)=>tileEls.get(id)?.classList.remove('land-pop'));
    }
    game.groups=computeGroups();game.connections=computeConnections();renderBoard();
    return moved;
  }


  async function dealIntoBoard() {
    const dealt=[];
    for(let c=0;c<GRID;c++){
      const deck=game.decks?.[c]; if(!deck?.length)continue;
      const emptyTop=[];
      for(let r=0;r<GRID;r++){
        const index=rcToIdx(r,c);
        if(game.board[index])break;
        emptyTop.push(index);
      }
      for(let k=emptyTop.length-1;k>=0&&deck.length;k--){
        const index=emptyTop[k], id=deck.shift();
        game.board[index]=id; dealt.push({index,id,col:c,order:dealt.length});
      }
    }
    if(!dealt.length){updateDeckVisuals();return false;}

    const hidden=new Set(dealt.map(d=>d.id));renderBoard({hiddenIds:hidden});updateDeckVisuals();
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();
    const dropBase=Math.max(105,boardRect.top-deckRect.top+34);
    const rowStepPx=boardRect.height*gridMetrics().step/100;
    dealt.forEach((item,n)=>{
      const geom=cellRectPercent(item.index); const {r}=idxToRC(item.index);
      const card=document.createElement('div');card.className='deal-card';
      card.style.left=`${geom.left}%`;card.style.top=`${geom.top}%`;card.style.width=`${geom.width}%`;card.style.height=`${geom.height}%`;
      card.style.setProperty('--drop-y',`${dropBase+r*rowStepPx}px`);
      card.style.animationDelay=`${n*38}ms`;card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{
        audio.deal();const tile=tileEls.get(item.id);
        if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),500);}
        card.remove();
      },270+n*38);
    });
    await delay(325+dealt.length*38+390);
    game.groups=computeGroups();game.connections=computeConnections();renderBoard();
    return true;
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
    game.level=Math.max(1,level);
    configureGrid(gridForLevel(game.level));
    updateBoardLayout();
    game.phase='loading';game.moves=0;game.clearedCount=0;game.clearedImages=[];game.unlockedThisLevel=[];
    game.comboMax=1;game.comboStreak=0;game.hintCount=3;game.autoCount=3;game.movesSinceClear=0;game.timerBase=0;game.timerRunning=false;
    tileEls.forEach((el)=>el.remove());tileEls.clear();dom.fxLayer.innerHTML='';clearCellHighlights();
    const generated=generateLevel(game.level);game.generation=generated;game.initialSeed=generated.seed;
    game.board=generated.board.slice();game.decks=generated.decks.map((deck)=>deck.slice());game.tiles=generated.tiles;
    game.selectedImages=generated.selected;game.totalImages=generated.imageCount;

    const hard=isHardLevel(game.level);
    const stage=document.getElementById('gameStage');stage?.classList.toggle('is-hard',hard);
    const title=dom.levelNumber.parentElement;title?.classList.toggle('is-hard',hard);
    const titleLabel=title?.querySelector('span');if(titleLabel)titleLabel.textContent=hard?'困难':'关卡';
    dom.introLevel.textContent=String(game.level);dom.introText.textContent=GRID===5?'困难关卡 · 5×5 竖幅拼图':'4×4 竖幅拼图';
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
    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('直接拖＝整组；按住后拖＝拆单块；所有悬空块都会下落',3300);}else dom.tutorialHand.classList.remove('is-visible');
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


  window.__JIGSAW__={game,startLevel,findHelpfulMove,commitMove,computeGroups,computeConnections,boardScore,generateLevel,settleGroupsRigid,gravityStep,validateMove,gridForLevel,isHardLevel,remainingDeckCount,updateBoardLayout,TILE_ASPECT,finishLevel,goHome};
  boot();
})();
