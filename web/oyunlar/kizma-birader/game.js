// Kızma Birader arayüzü: SVG tahta, zar animasyonu, bilgisayar sırası, geri al (yalnız bota karşı),
// otomatik kayıt/devam (localStorage), klavye kısayolları ve tam ekran. Kurallar engine.js içindedir.
// Ağ isteği yok; yalnızca bu cihazın localStorage alanına yazılır. Ses yok.
import * as E from './engine.js';

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-kizma-birader';
const NS = 'http://www.w3.org/2000/svg';
const CELL = 10; // SVG kullanıcı birimi: 11x11 ızgara → 110x110
const C = E.COLORS;
const GEN = ["Kırmızı'nın", "Mavi'nin", "Yeşil'in", "Sarı'nın"];
const DAT = ["Kırmızı'ya", "Mavi'ye", "Yeşil'e", "Sarı'ya"];

const boxEl = $('oyun');
const setupEl = $('ekran-ayar');
const playEl = $('ekran-oyun');
const svg = $('tahta');
const statusEl = $('durum');
const msgEl = $('mesaj');
const dieEl = $('zar');
const rollBtn = $('zar-at');
const triesEl = $('deneme');
const pieceBtns = [...document.querySelectorAll('#taslar .kb-pbtn')];
const legendEl = $('oyuncular');
const undoBtn = $('geri-al');
const resultEl = $('sonuc');
const fsBtn = $('tam-ekran');
const modeEl = $('ayar-mod');
const countEl = $('ayar-sayi');
const levelEl = $('ayar-zorluk');
const mustHitEl = $('ayar-vurus');
const safeEl = $('ayar-guvenli');
const penaltyEl = $('ayar-ceza');
const continueBtn = $('devam');
const reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

/* ---------- Rastgelelik: ?seed= ile tohumlanabilir, test kancası zarları sıraya koyabilir ---------- */
function randomSeed() {
  try { return crypto.getRandomValues(new Uint32Array(1))[0]; } catch (e) { return (Date.now() ^ Math.floor(Math.random() * 4294967296)) >>> 0; }
}
const seedParam = parseInt(new URLSearchParams(location.search).get('seed') || '', 10);
// Her rengin kendi zar dizisi vardır ve bu dizilerin durumu geri al yığınında ve kayıtta saklanır.
// Böylece geri alma ya da sayfayı yenileme, hiçbir oyuncunun sonraki zarlarını değiştiremez.
let diceRng = [];
let botRng = null;
function reseed(s) {
  const mix = E.mulberry32(s >>> 0);
  diceRng = [0, 1, 2, 3].map(() => E.mulberry32(Math.floor(mix() * 4294967296)));
  botRng = E.mulberry32(Math.floor(mix() * 4294967296));
}
reseed(Number.isFinite(seedParam) ? seedParam : randomSeed());
const rngState = () => [...diceRng, botRng].map((r) => r.getState());
function setRngState(arr) {
  if (!Array.isArray(arr) || arr.length !== 5 || !arr.every((v) => Number.isInteger(v) && v >= 0 && v <= 0xFFFFFFFF)) return false;
  diceRng.forEach((r, i) => r.setState(arr[i]));
  botRng.setState(arr[4]);
  return true;
}
const forced = [];
function nextDie(color) {
  while (forced.length) { const v = Number(forced.shift()); if (Number.isInteger(v) && v >= 1 && v <= 6) return v; }
  return 1 + Math.floor(diceRng[color]() * 6);
}

/* ---------- Kayıt (bozuk veriye karşı korumalı) ---------- */
const clampInt = (v, lo, hi) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, Math.round(v))) : 0);
function loadStore() {
  const st = { v: 1, stats: { games: 0, wins: 0, local: 0 }, settings: E.normalizeSettings(null), save: null, rng: null };
  try {
    const o = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!o || typeof o !== 'object' || Array.isArray(o)) return st;
    if (o.stats && typeof o.stats === 'object' && !Array.isArray(o.stats)) {
      st.stats.games = clampInt(o.stats.games, 0, 1e7);
      st.stats.wins = Math.min(st.stats.games, clampInt(o.stats.wins, 0, 1e7));
      st.stats.local = clampInt(o.stats.local, 0, 1e7);
    }
    st.settings = E.normalizeSettings(o.settings);
    st.save = E.restoreGame(o.save);
    if (st.save && Array.isArray(o.rng) && o.rng.length === 5 && o.rng.every((v) => Number.isInteger(v) && v >= 0 && v <= 0xFFFFFFFF)) st.rng = o.rng.slice();
  } catch (e) { /* bozuk kayıt: varsayılana dön */ }
  return st;
}
let store = loadStore();
function persist() {
  store.save = G && G.phase !== 'over' ? G : null;
  store.rng = store.save ? rngState() : null;
  if (G) store.settings = G.settings;
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı ya da dolu: oyun yine çalışır */ }
}

/* ---------- Durum ---------- */
let G = null;
let undoStack = [];
let selected = -1;
let rolling = false;
let thinking = false;
let shownDie = 0;
let speed = null; // test kancası: gecikme çarpanı (0 = anında)
let gen = 0;
let animTimer = 0;
const timers = new Set();

function after(ms, fn) {
  const my = gen;
  const t = setTimeout(() => { timers.delete(t); if (my === gen) fn(); }, Math.max(0, ms));
  timers.add(t);
}
function cancelAll() {
  gen += 1;
  timers.forEach((t) => clearTimeout(t));
  timers.clear();
  clearInterval(animTimer);
  animTimer = 0;
  rolling = false;
  thinking = false;
  dieEl.classList.remove('is-rolling');
}
// Zar animasyonu hareket azaltma tercihinde kısalır; bilgisayar beklemeleri okunabilirlik içindir.
function delay(kind) {
  const base = { roll: 560, bot: 520, pass: 1000 }[kind] || 300;
  if (speed !== null) return base * speed;
  if (kind === 'roll' && reduceMotion.matches) return 60;
  return base;
}

const humanTurn = () => G && G.phase !== 'over' && !E.isBot(G, G.turn);
const legalNow = () => (G && G.phase === 'move' ? E.legalMoves(G, G.turn, G.die) : []);
function who(c) {
  if (G && G.settings.mode === 'bot') return c === 0 ? 'Kırmızı (siz)' : `${C[c].name} (bilgisayar)`;
  return C[c].name;
}

/* ---------- SVG tahta ---------- */
const at = (xy) => [(xy[0] + 0.5) * CELL, (xy[1] + 0.5) * CELL];
function coordOf(color, piece, p) {
  if (p === E.YARD) return at(E.YARDS[color][piece]);
  if (p < E.TRACK) return at(E.PATH[E.absOf(color, p)]);
  return at(E.GOALS[color][p - E.GOAL0]);
}
function el(tag, attrs, parent) {
  const n = document.createElementNS(NS, tag);
  Object.entries(attrs || {}).forEach(([k, v]) => n.setAttribute(k, String(v)));
  if (parent) parent.appendChild(n);
  return n;
}
// Renk körlüğü için her rengin kendi şekli vardır
function shapeEl(shape, r, attrs, parent) {
  if (shape === 'daire') return el('circle', { cx: 0, cy: 0, r, ...attrs }, parent);
  if (shape === 'kare') { const a = r * 0.88; return el('rect', { x: -a, y: -a, width: 2 * a, height: 2 * a, rx: r * 0.2, ...attrs }, parent); }
  if (shape === 'elmas') { const a = r * 1.18; return el('path', { d: `M0 ${-a}L${a} 0L0 ${a}L${-a} 0Z`, ...attrs }, parent); }
  const a = r * 1.22;
  return el('path', { d: `M0 ${-a}L${a} ${a * 0.78}L${-a} ${a * 0.78}Z`, ...attrs }, parent);
}
function shapeIcon(color) {
  const s = document.createElementNS(NS, 'svg');
  s.setAttribute('viewBox', '-6 -6 12 12');
  s.setAttribute('class', `kb-ico kb-c${color}`);
  s.setAttribute('aria-hidden', 'true');
  shapeEl(C[color].shape, 4.4, { class: 'kb-body' }, s);
  return s;
}

const squares = new Map(); // anahtar → kare öğesi
let piecesLayer = null;
let targetsLayer = null;
const pieceEls = new Map(); // "renk-taş" → g
const yardBgs = [];

function buildBoard() {
  svg.textContent = '';
  el('title', { id: 'tahta-baslik' }, svg).textContent = 'Kızma Birader tahtası: 40 karelik ortak yol, her renge 4 ev ve 4 hedef karesi';
  el('rect', { x: 0.5, y: 0.5, width: 109, height: 109, rx: 6, class: 'kb-bg' }, svg);
  // Ev alanları (köşeler)
  const corners = [[1.5, 1.5], [8.5, 1.5], [8.5, 8.5], [1.5, 8.5]];
  corners.forEach((cc, color) => {
    const [x, y] = at(cc);
    const r = el('rect', { x: x - 18.5, y: y - 18.5, width: 37, height: 37, rx: 5, class: `kb-yardbg kb-c${color}` }, svg);
    yardBgs[color] = r;
  });
  // Yol bağlantı çizgisi
  const d = E.PATH.map((p, i) => { const [x, y] = at(p); return `${i ? 'L' : 'M'}${x} ${y}`; }).join('') + 'Z';
  el('path', { d, class: 'kb-line' }, svg);
  [0, 1, 2, 3].forEach((color) => {
    const g = E.GOALS[color];
    const [x1, y1] = at(E.PATH[(E.START[color] + 39) % 40]);
    const [x2, y2] = at(g[3]);
    el('path', { d: `M${x1} ${y1}L${x2} ${y2}`, class: 'kb-line' }, svg);
  });
  // Ortak yol kareleri
  E.PATH.forEach((p, abs) => {
    const [x, y] = at(p);
    const owner = E.START.indexOf(abs);
    const c = el('circle', { cx: x, cy: y, r: 4.3, class: owner >= 0 ? `kb-sq kb-start kb-c${owner}` : 'kb-sq', 'data-sq': `t${abs}` }, svg);
    squares.set(`t${abs}`, c);
    if (owner >= 0) {
      const g = el('g', { transform: `translate(${x} ${y})`, class: `kb-startmark kb-c${owner}` }, svg);
      shapeEl(C[owner].shape, 2.1, { class: 'kb-mark' }, g);
    }
  });
  // Hedef ve ev kareleri
  [0, 1, 2, 3].forEach((color) => {
    E.GOALS[color].forEach((p, i) => {
      const [x, y] = at(p);
      squares.set(`g${color}-${i}`, el('circle', { cx: x, cy: y, r: 4.3, class: `kb-sq kb-goal kb-c${color}`, 'data-sq': `g${color}-${i}` }, svg));
    });
    E.YARDS[color].forEach((p, i) => {
      const [x, y] = at(p);
      squares.set(`y${color}-${i}`, el('circle', { cx: x, cy: y, r: 4.3, class: `kb-sq kb-yard kb-c${color}`, 'data-sq': `y${color}-${i}` }, svg));
    });
  });
  // Orta süs: dört rengin hedef yönünü gösteren üçgenler
  const [cx, cy] = at([5, 5]);
  const h = 4.6;
  [[`M${cx} ${cy}L${cx - h} ${cy - h}L${cx - h} ${cy + h}Z`, 0], [`M${cx} ${cy}L${cx - h} ${cy - h}L${cx + h} ${cy - h}Z`, 1],
    [`M${cx} ${cy}L${cx + h} ${cy - h}L${cx + h} ${cy + h}Z`, 2], [`M${cx} ${cy}L${cx - h} ${cy + h}L${cx + h} ${cy + h}Z`, 3]]
    .forEach(([dd, color]) => el('path', { d: dd, class: `kb-center kb-c${color}` }, svg));
  targetsLayer = el('g', { class: 'kb-targets' }, svg);
  piecesLayer = el('g', { class: 'kb-pieces' }, svg);
}

function buildPieces() {
  piecesLayer.textContent = '';
  pieceEls.clear();
  G.active.forEach((color) => {
    for (let i = 0; i < 4; i++) {
      const g = el('g', { class: `kb-pc kb-c${color}`, 'data-color': color, 'data-piece': i }, piecesLayer);
      el('circle', { cx: 0, cy: 0, r: 5.1, class: 'kb-ring' }, g);
      shapeEl(C[color].shape, 3.55, { class: 'kb-body' }, g);
      const t = el('text', { x: 0, y: C[color].shape === 'ucgen' ? 1.25 : 0.1, class: 'kb-num' }, g);
      t.textContent = String(i + 1);
      g.addEventListener('click', () => onPieceClick(color, i));
      pieceEls.set(`${color}-${i}`, g);
    }
  });
}

/* ---------- Zar ---------- */
const PIPS = { 1: [[30, 30]], 2: [[17, 17], [43, 43]], 3: [[17, 17], [30, 30], [43, 43]], 4: [[17, 17], [43, 17], [17, 43], [43, 43]], 5: [[17, 17], [43, 17], [30, 30], [17, 43], [43, 43]], 6: [[17, 15], [43, 15], [17, 30], [43, 30], [17, 45], [43, 45]] };
function drawDie(v) {
  const color = G ? G.turn : 0;
  dieEl.className = `kb-die kb-c${color}${rolling ? ' is-rolling' : ''}`;
  dieEl.textContent = '';
  const s = document.createElementNS(NS, 'svg');
  s.setAttribute('viewBox', '0 0 60 60');
  s.setAttribute('aria-hidden', 'true');
  el('rect', { x: 3, y: 3, width: 54, height: 54, rx: 10, class: 'kb-die-face' }, s);
  (PIPS[v] || []).forEach(([x, y]) => el('circle', { cx: x, cy: y, r: 5.2, class: 'kb-pip' }, s));
  if (!PIPS[v]) { const t = el('text', { x: 30, y: 31, class: 'kb-die-q' }, s); t.textContent = '?'; }
  dieEl.appendChild(s);
  dieEl.dataset.value = String(v || 0);
  dieEl.setAttribute('aria-label', v ? `Zar: ${v}` : 'Zar henüz atılmadı');
}

/* ---------- Çizim ---------- */
function locText(p) {
  if (p === E.YARD) return 'Ev';
  if (p < E.TRACK) return `Yol ${p + 1}`;
  return `Hedef ${p - E.GOAL0 + 1}`;
}
function destText(m) {
  if (m.enter) return 'başlangıç karesine çıkar';
  if (m.goal) return `hedefin ${m.to - E.GOAL0 + 1}. karesine girer`;
  return `${m.to + 1}. kareye ilerler`;
}

function render() {
  if (!G) return;
  const legal = legalNow();
  const human = humanTurn();
  const byPiece = new Map(legal.map((m) => [m.piece, m]));
  if (selected >= 0 && !byPiece.has(selected)) selected = -1;
  boxEl.dataset.phase = G.phase;
  boxEl.dataset.turn = C[G.turn].key;
  boxEl.dataset.busy = rolling || thinking ? '1' : '0';

  // Taşlar
  G.active.forEach((color) => {
    G.pos[color].forEach((p, i) => {
      const g = pieceEls.get(`${color}-${i}`);
      if (!g) return;
      const [x, y] = coordOf(color, i, p);
      g.style.transform = `translate(${x}px, ${y}px)`;
      g.dataset.pos = String(p);
      const movable = human && color === G.turn && byPiece.has(i);
      g.classList.toggle('is-movable', movable);
      g.classList.toggle('is-sel', movable && i === selected);
      const hitTarget = human && legal.some((m) => m.hit && m.hit.color === color && m.hit.piece === i);
      g.classList.toggle('is-target', hitTarget);
    });
  });
  // Hedef halkaları (yalnız insan sırasında)
  targetsLayer.textContent = '';
  if (human) {
    legal.forEach((m) => {
      const [x, y] = coordOf(G.turn, m.piece, m.to);
      const ring = el('circle', { cx: x, cy: y, r: 4.9, class: `kb-tgt${m.piece === selected ? ' is-sel' : ''}`, 'data-piece': m.piece }, targetsLayer);
      ring.addEventListener('click', () => playPiece(m.piece));
    });
  }
  // Son hamle ve sıra vurgusu
  squares.forEach((sq) => sq.classList.remove('is-last'));
  if (G.last) {
    const L = G.last;
    const key = L.to < E.TRACK ? `t${E.absOf(L.color, L.to)}` : `g${L.color}-${L.to - E.GOAL0}`;
    const sq = squares.get(key);
    if (sq) sq.classList.add('is-last');
  }
  yardBgs.forEach((r, color) => r && r.classList.toggle('is-turn', G.phase !== 'over' && color === G.turn));

  // Durum satırı
  const name = who(G.turn);
  let status;
  if (G.phase === 'over') status = `Oyun bitti – kazanan: ${who(G.winner)}.`;
  else if (!human) status = `Sıra: ${name} – ${G.phase === 'move' ? `${G.die} attı, hamlesini seçiyor…` : 'zar atıyor…'}`;
  else if (G.phase === 'roll') status = `Sıra: ${name} – zar atın.`;
  else status = `Sıra: ${name} – ${G.die} geldi, oynatacağınız taşı seçin.`;
  if (statusEl.textContent !== status) statusEl.textContent = status;
  const three = G.phase === 'roll' && E.needsThreeTries(G, G.turn) && G.die !== 6;
  triesEl.textContent = three ? `Taş çıkarmak için 6 gerekir · kalan deneme: ${G.tries}` : (G.phase === 'roll' && G.sixes > 0 && G.phase !== 'over' ? '6 attığı için yeniden atış' : '');
  if (!rolling) drawDie(shownDie);
  rollBtn.disabled = !(human && G.phase === 'roll' && !rolling);

  // Taş düğmeleri: sıradaki rengin dört taşı
  pieceBtns.forEach((b, i) => {
    const p = G.pos[G.turn][i];
    const m = byPiece.get(i);
    const can = human && !!m;
    b.disabled = !can;
    b.className = `kb-pbtn kb-c${G.turn}${can ? ' is-movable' : ''}${can && i === selected ? ' is-sel' : ''}`;
    b.querySelector('.kb-ico-wrap').replaceChildren(shapeIcon(G.turn));
    b.querySelector('.kb-loc').textContent = locText(p);
    b.setAttribute('aria-label', `${C[G.turn].name} ${i + 1}. taş, ${locText(p).toLowerCase()}${can ? `: ${destText(m)}${m.hit ? `, ${GEN[m.hit.color]} taşını eve gönderir` : ''}` : ', oynayamaz'}`);
  });

  // Oyuncu listesi
  legendEl.textContent = '';
  G.active.forEach((color) => {
    const li = document.createElement('li');
    li.className = `kb-pl${G.phase !== 'over' && color === G.turn ? ' is-turn' : ''}${color === G.winner ? ' is-win' : ''}`;
    li.dataset.color = C[color].key;
    li.appendChild(shapeIcon(color));
    const b = document.createElement('b');
    b.textContent = who(color);
    const arr = G.pos[color];
    const small = document.createElement('small');
    small.textContent = `Ev ${arr.filter((p) => p === E.YARD).length} · Yol ${arr.filter((p) => p >= 0 && p < E.TRACK).length} · Hedef ${arr.filter((p) => p >= E.GOAL0).length}/4`;
    li.append(b, small);
    legendEl.appendChild(li);
  });

  undoBtn.hidden = G.settings.mode !== 'bot';
  undoBtn.disabled = !(G.settings.mode === 'bot' && undoStack.length && G.phase !== 'over');
}

function setMsg(text) { msgEl.textContent = text; }

/* ---------- Akış ---------- */
function focusInBox(target) {
  const a = document.activeElement;
  if (!target || target.disabled) return;
  if (!a || a === document.body || boxEl.contains(a)) target.focus({ preventScroll: true });
}

function schedule(wait = 0) {
  render();
  if (!G || G.phase === 'over') return;
  if (E.isBot(G, G.turn)) {
    thinking = true;
    boxEl.dataset.busy = '1';
    if (G.phase === 'roll') after(wait + delay('bot'), () => { thinking = false; doRoll(); });
    else after(wait + delay('bot'), () => { thinking = false; botMove(); });
  } else if (wait > 0) {
    // insan sırası: kısa beklemeden sonra zar düğmesini etkinleştir
    rolling = true;
    rollBtn.disabled = true;
    after(wait, () => { rolling = false; render(); focusInBox(rollBtn); });
  } else {
    focusInBox(G.phase === 'roll' ? rollBtn : null);
  }
}

function doRoll() {
  if (!G || G.phase !== 'roll' || rolling) return;
  rolling = true;
  selected = -1;
  const die = nextDie(G.turn);
  const ms = delay('roll');
  render();
  dieEl.classList.add('is-rolling');
  boxEl.dataset.busy = '1';
  if (ms >= 120) {
    let k = 0;
    animTimer = setInterval(() => { k += 1; drawDie(((die + k * 3) % 6) + 1); }, 80); // görsel; sonuç önceden belirlendi
  }
  after(ms, () => {
    clearInterval(animTimer);
    animTimer = 0;
    rolling = false;
    shownDie = die;
    dieEl.classList.remove('is-rolling');
    onRolled(die);
  });
}

function onRolled(die) {
  const color = G.turn;
  const bot = E.isBot(G, color);
  const res = E.applyRoll(G, die);
  const w = C[color].name;
  if (res.type === 'move') {
    if (bot) {
      setMsg(`${w} ${die} attı.`);
      persist();
      schedule();
    } else {
      selected = res.moves[0].piece;
      setMsg(`${w}: ${die} geldi. ${res.moves.length === 1 ? 'Tek geçerli hamle var.' : `${res.moves.length} taş oynayabilir.`}`);
      persist();
      render();
      focusInBox(pieceBtns[selected]);
    }
    return;
  }
  if (res.type === 'again') setMsg(`${w}: 6 geldi ama oynanacak taş yok; yeniden atış hakkı var.`);
  else if (res.type === 'retry') setMsg(`${w}: ${die} geldi. Taş çıkarmak için 6 gerekir; kalan deneme: ${res.left}.`);
  else if (res.type === 'pass') setMsg(`${w}: ${die} geldi, oynanabilecek hamle yok. Sıra ${DAT[res.next]} geçti.`);
  else if (res.type === 'penalty') setMsg(`${w}: art arda üç kez 6! Ceza kuralı gereği hamle yapılmadı, sıra ${DAT[res.next]} geçti.`);
  persist();
  schedule(res.type === 'pass' || res.type === 'penalty' ? delay('pass') : 0);
}

function botMove() {
  if (!G || G.phase !== 'move' || !E.isBot(G, G.turn)) return;
  const moves = legalNow();
  const m = E.chooseBotMove(G, moves, G.settings.level, botRng);
  if (m) playMove(m, false);
}

function playPiece(i) {
  if (!humanTurn() || G.phase !== 'move' || rolling) return;
  const m = legalNow().find((x) => x.piece === i);
  if (!m) { setMsg(`${i + 1}. taş bu zarla oynayamaz; ışıklı taşlardan birini seçin.`); return; }
  playMove(m, true);
}

function playMove(m, human) {
  if (human && G.settings.mode === 'bot') {
    undoStack.push({ g: E.cloneGame(G), rng: rngState() });
    if (undoStack.length > 40) undoStack.shift();
  }
  const color = G.turn;
  const res = E.applyChoice(G, m);
  selected = -1;
  let text = `${C[color].name}: ${m.piece + 1}. taş `;
  if (m.enter) text += 'oyuna girdi.';
  else if (m.goal && m.from < E.GOAL0) text += 'hedefe girdi.';
  else if (m.goal) text += 'hedefte ilerledi.';
  else text += `${m.to - m.from} kare ilerledi.`;
  if (m.hit) text += ` ${GEN[m.hit.color]} ${m.hit.piece + 1}. taşı eve döndü.`;
  if (res.type === 'again') text += ' 6 geldiği için yeniden atış hakkı var.';
  if (res.type === 'win') { setMsg(text); finish(); return; }
  setMsg(text);
  persist();
  schedule();
}

function finish() {
  cancelAll();
  undoStack = [];
  if (G.settings.mode === 'bot') {
    store.stats.games += 1;
    if (G.winner === 0) store.stats.wins += 1;
  } else store.stats.local += 1;
  persist();
  render();
  const youWon = G.settings.mode === 'bot' && G.winner === 0;
  $('sonuc-baslik').textContent = G.settings.mode === 'bot' ? (youWon ? 'Tebrikler, kazandınız!' : `Kazanan: ${who(G.winner)}`) : `Kazanan: ${C[G.winner].name}`;
  $('sonuc-metin').textContent = `${C[G.winner].name}, dört taşını da hedefe soktu. ${G.settings.mode === 'bot' ? `Bilgisayara karşı ${store.stats.games} oyunda ${store.stats.wins} galibiyetiniz var.` : 'Yeni bir el için aşağıdaki düğmeyi kullanın.'}`;
  resultEl.hidden = false;
  resultEl.classList.add('is-active');
  $('sonuc-baslik').focus({ preventScroll: true });
  renderStats();
}

function hideResult() {
  resultEl.hidden = true;
  resultEl.classList.remove('is-active');
}

function undo() {
  if (!G || G.settings.mode !== 'bot' || !undoStack.length || G.phase === 'over') return;
  cancelAll();
  const u = undoStack.pop();
  G = u.g;
  setRngState(u.rng); // zar dizileri de geri döner: geri alma yeni zar attırmaz
  shownDie = G.die;
  selected = -1;
  const m = legalNow()[0];
  if (m) selected = m.piece;
  setMsg(`Son hamleniz geri alındı. ${G.die} zarıyla başka bir taş seçebilirsiniz.`);
  persist();
  render();
}

/* ---------- Ekranlar ---------- */
function readSettings() {
  return E.normalizeSettings({
    mode: modeEl.value, count: Number(countEl.value), level: levelEl.value,
    mustHit: mustHitEl.checked, safeStart: safeEl.checked, sixPenalty: penaltyEl.checked,
  });
}
function writeSettings(s) {
  modeEl.value = s.mode;
  countEl.value = String(s.count);
  levelEl.value = s.level;
  mustHitEl.checked = s.mustHit;
  safeEl.checked = s.safeStart;
  penaltyEl.checked = s.sixPenalty;
  syncSetup();
}
function syncSetup() {
  const bot = modeEl.value === 'bot';
  [...countEl.options].forEach((o) => {
    const n = Number(o.value);
    o.textContent = bot ? `${n} oyuncu (siz + ${n - 1} bilgisayar)` : `${n} kişi aynı cihazda`;
  });
  $('alan-zorluk').hidden = !bot;
}
function renderStats() {
  const s = store.stats;
  $('istatistik').textContent = s.games || s.local
    ? `Bilgisayara karşı ${s.games} oyun, ${s.wins} galibiyet${s.local ? ` · aynı cihazda ${s.local} oyun` : ''}.`
    : 'Henüz bitmiş oyun yok. Sonuçlarınız yalnızca bu cihazda tutulur.';
  $('ist-sifirla').hidden = !(s.games || s.local);
  const sv = store.save;
  continueBtn.hidden = !sv;
  const info = $('devam-bilgi');
  info.hidden = !sv;
  if (sv) info.textContent = `Kayıtlı oyun: ${sv.settings.mode === 'bot' ? 'bilgisayara karşı' : 'aynı cihazda'}, ${sv.settings.count} oyuncu, ${sv.turnNo}. sıra.`;
}
function showScreen(name) {
  setupEl.hidden = name !== 'ayar';
  playEl.hidden = name !== 'oyun';
  if (name === 'ayar') boxEl.dataset.phase = 'ayar';
}

function enterGame(g, message) {
  cancelAll();
  G = g;
  undoStack = [];
  selected = -1;
  shownDie = G.phase === 'move' ? G.die : 0;
  hideResult();
  showScreen('oyun');
  buildPieces();
  setMsg(message);
  persist();
  if (G.phase === 'move' && !E.isBot(G, G.turn)) selected = legalNow()[0].piece;
  schedule();
  if (!E.isBot(G, G.turn)) focusInBox(G.phase === 'roll' ? rollBtn : pieceBtns[selected]);
}

function startNew() {
  const s = readSettings();
  const g = E.createGame(s);
  enterGame(g, s.mode === 'bot' ? 'Yeni oyun başladı. Siz kırmızısınız; ilk zarı siz atarsınız.' : 'Yeni oyun başladı. İlk sıra kırmızıda.');
}

function backToSetup() {
  cancelAll();
  if (G) persist();
  store = loadStore();
  G = null;
  hideResult();
  showScreen('ayar');
  renderStats();
  $('baslat').focus({ preventScroll: true });
}

/* ---------- Girdi ---------- */
function onPieceClick(color, i) {
  if (!humanTurn() || G.phase !== 'move') return;
  if (color === G.turn) { playPiece(i); return; }
  const m = legalNow().find((x) => x.hit && x.hit.color === color && x.hit.piece === i);
  if (m) playPiece(m.piece);
}

function selectPiece(i) {
  const legal = legalNow();
  if (!legal.some((m) => m.piece === i)) {
    setMsg(`${i + 1}. taş bu zarla oynayamaz; ışıklı taşlardan birini seçin.`);
    return;
  }
  selected = i;
  render();
  pieceBtns[i].focus({ preventScroll: true });
}

function boxInView() {
  const r = boxEl.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

document.addEventListener('keydown', (e) => {
  if (!G || playEl.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  const tag = t && t.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  const inBox = t === document.body || t === document.documentElement || boxEl.contains(t);
  if (!inBox || !boxInView() || !humanTurn()) return;
  if (e.key >= '1' && e.key <= '4') {
    if (G.phase !== 'move' || rolling) return;
    e.preventDefault();
    selectPiece(Number(e.key) - 1);
    return;
  }
  if (e.key === ' ' || e.key === 'Enter') {
    if (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY') return; // düğmenin kendi davranışı çalışsın
    if (G.phase === 'roll' && !rolling) { e.preventDefault(); doRoll(); } else if (G.phase === 'move' && selected >= 0) { e.preventDefault(); playPiece(selected); }
    return;
  }
  const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
  if (dir && G.phase === 'move') {
    const movable = legalNow().map((m) => m.piece).sort((a, b) => a - b);
    if (!movable.length) return;
    e.preventDefault();
    const cur = movable.indexOf(selected);
    const next = cur < 0 ? movable[0] : movable[(cur + dir + movable.length) % movable.length];
    selectPiece(next);
  }
});

pieceBtns.forEach((b, i) => {
  b.addEventListener('click', () => playPiece(i));
  b.addEventListener('focus', () => { if (G && G.phase === 'move' && humanTurn() && legalNow().some((m) => m.piece === i) && selected !== i) { selected = i; render(); } });
});
rollBtn.addEventListener('click', () => { if (humanTurn()) doRoll(); });
undoBtn.addEventListener('click', undo);
$('ayarlar').addEventListener('click', backToSetup);
$('tekrar').addEventListener('click', () => { writeSettings(G ? G.settings : readSettings()); startNew(); });
$('ayara-don').addEventListener('click', backToSetup);
$('baslat').addEventListener('click', startNew);
continueBtn.addEventListener('click', () => {
  const g = store.save ? E.restoreGame(JSON.parse(JSON.stringify(store.save))) : null;
  if (!g) { $('ayar-uyari').textContent = 'Kayıtlı oyun okunamadı; yeni bir oyun başlatın.'; store.save = null; renderStats(); return; }
  setRngState(store.rng); // kayıtla saklanan zar dizileri: yenileme sonraki zarları değiştirmez
  writeSettings(g.settings);
  enterGame(g, `Kayıtlı oyun yüklendi. Sıra ${DAT[g.turn]}.`);
});
modeEl.addEventListener('change', syncSetup);
$('ist-sifirla').addEventListener('click', () => {
  if (!window.confirm('Oyun istatistikleri silinsin mi? Bu işlem geri alınamaz.')) return;
  store.stats = { games: 0, wins: 0, local: 0 };
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ }
  renderStats();
});

// Tam ekran: yalnızca oyun kutusu gösterilir (reklam alanları kutunun dışındadır).
if (document.fullscreenEnabled) {
  fsBtn.hidden = false;
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else boxEl.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    fsBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement));
    fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

/* ---------- Başlat ---------- */
buildBoard();
writeSettings(store.settings);
renderStats();
showScreen('ayar');
drawDie(0);

/* ---------- Test ve hata ayıklama kancası: gizli bilgi taşımaz. Çağrı: window.__kizmaBiraderTest() → api ---------- */
const api = {
  state() {
    if (!G) return null;
    return { ...E.cloneGame(G), rolling, thinking, shownDie, selected, undo: undoStack.length, legal: legalNow().map((m) => ({ piece: m.piece, from: m.from, to: m.to, hit: m.hit, enter: m.enter, goal: m.goal })) };
  },
  /** Sonraki atışlarda kullanılacak zarları sıraya koyar. */
  forceDice(list) { forced.push(...list); return forced.length; },
  /** Gecikme çarpanı: 0 = anında (yalnız test), null = normal. */
  setSpeed(x) { speed = x === null ? null : Math.max(0, Number(x) || 0); },
  setSeed(n) { reseed(n); },
  delays() { return { roll: delay('roll'), bot: delay('bot'), pass: delay('pass') }; },
  /** Konum kurar: { settings, pos: [[...4]|null x4], turn }. Geçersiz konumda hata fırlatır. */
  setup(o) {
    const g = E.restoreGame({ v: 1, settings: o.settings, pos: o.pos, turn: o.turn });
    if (!g) throw new Error('Geçersiz konum');
    writeSettings(g.settings);
    enterGame(g, 'Test konumu kuruldu.');
    return api.state();
  },
  engine: E,
};
window.__kizmaBiraderTest = () => api;
