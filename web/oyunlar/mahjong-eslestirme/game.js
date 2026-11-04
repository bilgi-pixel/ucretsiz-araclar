// Taş eşleştirme (solitaire) arayüzü — Bilişim Ajans. Tamamen istemci tarafı; dış istek, çerez, ses yoktur.
// Taş çizimleri bu dosyada üretilen kendi SVG simgelerimizdir. Kalıcı veri: localStorage 'ba-oyun-mahjong-eslestirme'.
import * as E from './engine.js';

const STORE_KEY = 'ba-oyun-mahjong-eslestirme';

// ---------------------------------------------------------------------------
// Depolama: bozuk veri varsayılana döner
// ---------------------------------------------------------------------------
const defaultStore = () => ({ played: 0, won: 0, best: { kaplumbaga: 0, piramit: 0, kale: 0 }, layout: 'kaplumbaga', hints: true });

function loadStore() {
  const d = defaultStore();
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { raw = null; }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return d;
  const cnt = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), 1e9) : 0);
  const best = {};
  for (const k of E.LAYOUT_KEYS) best[k] = cnt(raw.best && typeof raw.best === 'object' ? raw.best[k] : 0);
  return {
    played: cnt(raw.played),
    won: Math.min(cnt(raw.won), cnt(raw.played) || cnt(raw.won)),
    best,
    layout: E.LAYOUT_KEYS.includes(raw.layout) ? raw.layout : 'kaplumbaga',
    hints: raw.hints !== false,
  };
}
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* özel gezinti vb. */ }
}
const store = loadStore();

// ---------------------------------------------------------------------------
// DOM
// ---------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const box = $('mj-box');
const wrap = $('mj-wrap');
const boardEl = $('mj-board');
const elStatus = $('mj-status');
const elTime = $('mj-time');
const elLeft = $('mj-left');
const elPairs = $('mj-pairs');
const elBest = $('mj-best');
const elStats = $('mj-stats');
const elWin = $('mj-win');
const elWinText = $('mj-win-text');
const selLayout = $('mj-layout');
const btnUndo = $('mj-undo');

const params = new URLSearchParams(location.search);
const seedParam = params.get('seed');
let rngSeed = seedParam !== null && /^\d+$/.test(seedParam) ? Number(seedParam) : null;
const makeRng = () => (rngSeed !== null ? E.mulberry32(rngSeed++) : Math.random);
if (E.LAYOUT_KEYS.includes(params.get('layout'))) store.layout = params.get('layout');

let game = null;
let selected = -1;
let hintPair = null;
let startedAt = 0;
let elapsed = 0; // saniye
let timerId = 0;
let finished = false;

// ---------------------------------------------------------------------------
// Taş yüzleri (SVG)
// ---------------------------------------------------------------------------
const DOT_POS = {
  1: [[20, 26]],
  2: [[20, 15], [20, 37]],
  3: [[11, 13], [20, 26], [29, 39]],
  4: [[12, 16], [28, 16], [12, 36], [28, 36]],
  5: [[12, 14], [28, 14], [20, 26], [12, 38], [28, 38]],
  6: [[12, 11], [28, 11], [12, 26], [28, 26], [12, 41], [28, 41]],
  7: [[9, 9], [20, 13], [31, 17], [12, 33], [28, 33], [12, 44], [28, 44]],
  8: [[12, 9], [28, 9], [12, 20], [28, 20], [12, 31], [28, 31], [12, 42], [28, 42]],
  9: [[10, 11], [20, 11], [30, 11], [10, 26], [20, 26], [30, 26], [10, 41], [20, 41], [30, 41]],
};
const COLORS = ['#1b7a4a', '#b3121f', '#1f4e9b'];
const FLOWER_COLORS = ['#c2185b', '#e65100', '#6a1b9a', '#00796b'];
const SEASON_COLORS = ['#2e7d32', '#c62828', '#8d6e00', '#1565c0'];

function faceSvg(face) {
  let g = '';
  if (face <= 8) {
    const n = face + 1;
    const r = n === 1 ? 9 : 4.6;
    DOT_POS[n].forEach(([x, y], i) => {
      const c = n === 1 ? COLORS[1] : (n === 5 && i === 2 ? COLORS[1] : COLORS[i % 2 ? 0 : 2]);
      g += `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x}" cy="${y}" r="${r * 0.45}" fill="#fff" opacity=".85"/>`;
    });
  } else if (face <= 17) {
    const n = face - 8;
    const pos = n === 1 ? [[20, 26]] : DOT_POS[n];
    pos.forEach(([x, y], i) => {
      const c = n === 1 ? COLORS[1] : (i % 3 === 1 ? COLORS[1] : COLORS[0]);
      const h = n === 1 ? 30 : n >= 7 ? 9 : 12;
      g += `<rect x="${x - 2.8}" y="${y - h / 2}" width="5.6" height="${h}" rx="2.6" fill="${c}"/><rect x="${x - 4}" y="${y - 0.8}" width="8" height="1.6" fill="#fff" opacity=".9"/>`;
    });
  } else if (face <= 26) {
    const n = face - 17;
    g += `<text x="20" y="31" text-anchor="middle" font-family="IBM Plex Sans, Arial, sans-serif" font-weight="700" font-size="28" fill="#1f4e9b">${n}</text>`;
    g += `<rect x="9" y="38" width="22" height="3" rx="1.5" fill="#b3121f"/><rect x="12" y="43" width="16" height="3" rx="1.5" fill="#b3121f"/>`;
  } else if (face <= 30) {
    const letter = ['D', 'G', 'B', 'K'][face - 27];
    g += `<circle cx="20" cy="26" r="15" fill="none" stroke="#16181d" stroke-width="2.2"/><text x="20" y="35" text-anchor="middle" font-family="IBM Plex Sans, Arial, sans-serif" font-weight="700" font-size="25" fill="#16181d">${letter}</text>`;
  } else if (face === 31) {
    g += `<path d="M20 8 L34 26 L20 44 L6 26 Z" fill="#b3121f"/><path d="M20 17 L27 26 L20 35 L13 26 Z" fill="#fff" opacity=".85"/>`;
  } else if (face === 32) {
    g += `<path d="M20 8 L33 16 L33 36 L20 44 L7 36 L7 16 Z" fill="#1b7a4a"/><circle cx="20" cy="26" r="6" fill="#fff" opacity=".85"/>`;
  } else if (face === 33) {
    g += `<rect x="7" y="9" width="26" height="34" rx="4" fill="none" stroke="#1f4e9b" stroke-width="3"/><rect x="13" y="15" width="14" height="22" rx="2" fill="none" stroke="#1f4e9b" stroke-width="2"/>`;
  } else if (face <= 37) {
    const k = face - 34;
    const c = FLOWER_COLORS[k];
    for (let a = 0; a < 5; a++) {
      const ang = (a / 5) * Math.PI * 2 - Math.PI / 2;
      g += `<circle cx="${20 + Math.cos(ang) * 8.5}" cy="${24 + Math.sin(ang) * 8.5}" r="6.5" fill="${c}" opacity=".9"/>`;
    }
    g += `<circle cx="20" cy="24" r="4.5" fill="#f5c542"/><text x="20" y="49" text-anchor="middle" font-family="IBM Plex Sans, Arial, sans-serif" font-weight="700" font-size="10" fill="${c}">${k + 1}</text>`;
  } else {
    const k = face - 38;
    const c = SEASON_COLORS[k];
    g += `<path d="M20 6 C34 14 34 32 20 42 C6 32 6 14 20 6 Z" fill="${c}"/><path d="M20 12 L20 44" stroke="#fff" stroke-width="1.6" opacity=".85"/><text x="20" y="51" text-anchor="middle" font-family="IBM Plex Sans, Arial, sans-serif" font-weight="700" font-size="9" fill="${c}">${k + 1}</text>`;
  }
  return `<svg viewBox="0 0 40 52" aria-hidden="true" focusable="false">${g}</svg>`;
}

function faceName(face) {
  if (face <= 8) return `${face + 1} Nokta`;
  if (face <= 17) return `${face - 8} Bambu`;
  if (face <= 26) return `${face - 17} Sayı`;
  if (face <= 30) return ['Doğu', 'Güney', 'Batı', 'Kuzey'][face - 27] + ' yönü';
  if (face <= 33) return ['Kırmızı', 'Yeşil', 'Beyaz'][face - 31] + ' ejder';
  if (face <= 37) return `Çiçek ${face - 33}`;
  return `Mevsim ${face - 37}`;
}

// ---------------------------------------------------------------------------
// Çizim
// ---------------------------------------------------------------------------
let unit = 14; // yarım taş genişliği (px)
const ASPECT = 1.3;
const DZ = 4;

function computeUnit() {
  const xs = game.board.positions.map((p) => p[0]);
  const maxX = Math.max(...xs) + 2;
  const avail = Math.max(wrap.clientWidth - 24, 200);
  unit = Math.max(9, Math.min(26, Math.floor(avail / maxX)));
}

function layoutBoard() {
  computeUnit();
  const pos = game.board.positions;
  const maxX = Math.max(...pos.map((p) => p[0])) + 2;
  const maxY = Math.max(...pos.map((p) => p[1])) + 2;
  const maxZ = Math.max(...pos.map((p) => p[2]));
  boardEl.style.width = `${maxX * unit + maxZ * DZ + 10}px`;
  boardEl.style.height = `${maxY * unit * ASPECT + maxZ * DZ + 10}px`;
  boardEl.style.setProperty('--tw', `${2 * unit}px`);
}

function whyBlocked(i) {
  const g = game;
  if (g.board.cover[i].some((j) => g.alive[j])) return 'Bu taşın üstünde başka taş var.';
  return 'Bu taşın hem sağı hem solu kapalı.';
}

function render() {
  if (!game) return;
  const g = game;
  const pos = g.board.positions;
  const order = [...pos.keys()].filter((i) => g.alive[i]).sort((a, b) => pos[a][2] - pos[b][2] || pos[a][1] - pos[b][1] || pos[a][0] - pos[b][0]);
  boardEl.textContent = '';
  const maxZ = Math.max(...pos.map((p) => p[2]));
  let freeCount = 0;
  for (const i of order) {
    const [x, y, z] = pos[i];
    const free = E.isFree(g.board, g.alive, i);
    if (free) freeCount++;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mj-tile' + (free ? ' free' : ' blocked') + (i === selected ? ' sel' : '') + (hintPair && hintPair.includes(i) ? ' hint' : '');
    b.style.left = `${5 + x * unit - z * DZ + maxZ * DZ}px`;
    b.style.top = `${5 + y * unit * ASPECT - z * DZ + maxZ * DZ}px`;
    b.style.width = `${2 * unit}px`;
    b.style.height = `${2 * unit * ASPECT}px`;
    b.style.zIndex = String(10 + z * 20 + Math.floor(y));
    b.dataset.i = String(i);
    b.dataset.face = String(g.faces[i]);
    b.dataset.z = String(z);
    b.setAttribute('aria-label', `${faceName(g.faces[i])}, ${free ? 'serbest' : 'kapalı'}${i === selected ? ', seçili' : ''}`);
    b.setAttribute('aria-pressed', i === selected ? 'true' : 'false');
    if (!free) b.tabIndex = -1;
    if (hintPair && hintPair.includes(i)) b.dataset.hint = '1';
    b.innerHTML = faceSvg(g.faces[i]);
    b.addEventListener('click', () => onTile(i));
    boardEl.appendChild(b);
  }
  elLeft.textContent = String(g.remaining);
  const pairCount = E.freePairs(g.board, g.alive, g.faces).length;
  elPairs.textContent = String(pairCount);
  btnUndo.disabled = !g.history.length;
  box.dataset.remaining = String(g.remaining);
  box.dataset.pairs = String(pairCount);
  box.classList.toggle('no-hints', !store.hints);
}

function renderTime() {
  const s = Math.floor(elapsed);
  elTime.textContent = fmt(s);
}
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

function renderStats() {
  const b = store.best[game ? game.key : store.layout];
  elBest.textContent = b ? fmt(b) : '—';
  elStats.textContent = `Oynanan: ${store.played} · Çözülen: ${store.won}`;
}

const say = (msg) => { elStatus.textContent = msg; };

// ---------------------------------------------------------------------------
// Etkileşim
// ---------------------------------------------------------------------------
function onTile(i) {
  if (!game || finished || !game.alive[i]) return;
  hintPair = null;
  if (!E.isFree(game.board, game.alive, i)) {
    say(`${whyBlocked(i)} Yalnızca serbest taşlar eşleşir.`);
    render();
    return;
  }
  if (selected === -1) {
    selected = i;
    say(`${faceName(game.faces[i])} seçildi. Eşini seçin.`);
    render();
    return;
  }
  if (selected === i) {
    selected = -1;
    say('Seçim kaldırıldı.');
    render();
    return;
  }
  const a = selected;
  if (E.matches(game.faces[a], game.faces[i]) && E.removePair(game, a, i)) {
    selected = -1;
    say(`${faceName(game.faces[a])} çifti kaldırıldı.`);
    afterMove();
  } else {
    selected = i;
    say(`Taşlar eşleşmiyor (${faceName(game.faces[a])} ≠ ${faceName(game.faces[i])}). Yeni seçim: ${faceName(game.faces[i])}.`);
    render();
  }
}

function afterMove() {
  render();
  if (E.isWon(game)) { win(); return; }
  if (E.isStuck(game)) say('Hamle kalmadı. “Karıştır” ile kalan taşları yeniden dağıtın ya da “Geri al” deyin.');
}

function win() {
  finished = true;
  clearInterval(timerId);
  elapsed = Math.max(1, Math.round((performance.now() - startedAt) / 1000));
  renderTime();
  store.played += 1;
  store.won += 1;
  const prev = store.best[game.key];
  const isBest = !prev || elapsed < prev;
  if (isBest) store.best[game.key] = elapsed;
  saveStore();
  renderStats();
  elWinText.textContent = `Tüm taşları kaldırdınız. Süre: ${fmt(elapsed)}${isBest ? ' — yeni en iyi süre!' : ` (en iyi: ${fmt(prev)})`}. Karıştırma: ${game.shuffles}, geri alma: ${game.undos}.`;
  elWin.hidden = false;
  say('Tebrikler, tahtayı temizlediniz!');
  $('mj-win-new').focus({ preventScroll: true });
}

function newGame() {
  clearInterval(timerId);
  game = E.createGame(store.layout, makeRng());
  selected = -1;
  hintPair = null;
  finished = false;
  elWin.hidden = true;
  startedAt = performance.now();
  elapsed = 0;
  renderTime();
  timerId = setInterval(() => {
    elapsed = Math.floor((performance.now() - startedAt) / 1000);
    renderTime();
  }, 500);
  layoutBoard();
  renderStats();
  say('Aynı iki serbest taşı seçerek kaldırın. Serbest taş: üstü açık, sağı ya da solu boş.');
  render();
}

// ---------------------------------------------------------------------------
// Düğmeler
// ---------------------------------------------------------------------------
$('mj-new').addEventListener('click', newGame);
$('mj-win-new').addEventListener('click', newGame);
$('mj-hint').addEventListener('click', () => {
  if (!game || finished) return;
  const h = E.hint(game);
  selected = -1;
  if (!h) { hintPair = null; say('Eşleşecek serbest çift yok. “Karıştır” ya da “Geri al” deneyin.'); render(); return; }
  hintPair = h;
  say(`İpucu: işaretli iki ${faceName(game.faces[h[0]])} taşını eşleştirin.`);
  render();
  const first = boardEl.querySelector(`[data-i="${h[0]}"]`);
  if (first) first.focus({ preventScroll: true });
});
$('mj-shuffle').addEventListener('click', () => {
  if (!game || finished) return;
  selected = -1;
  hintPair = null;
  if (E.reshuffle(game, makeRng())) say('Kalan taşlar karıştırıldı; dağılım yine çözülebilir.');
  else say('Karıştırılamadı.');
  render();
  if (E.isStuck(game)) say('Hamle kalmadı; tekrar karıştırın.');
});
btnUndo.addEventListener('click', () => {
  if (!game || finished) return;
  selected = -1;
  hintPair = null;
  if (E.undo(game)) say('Son hamle geri alındı.');
  render();
});
$('mj-full').addEventListener('click', () => {
  if (document.fullscreenElement) { document.exitFullscreen?.(); return; }
  if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
});
selLayout.value = store.layout;
selLayout.addEventListener('change', () => {
  store.layout = E.LAYOUT_KEYS.includes(selLayout.value) ? selLayout.value : 'kaplumbaga';
  saveStore();
  newGame();
});
$('mj-hints').checked = store.hints;
$('mj-hints').addEventListener('change', () => { store.hints = $('mj-hints').checked; saveStore(); render(); });
$('mj-stats-reset').addEventListener('click', () => {
  const keep = { layout: store.layout, hints: store.hints };
  Object.assign(store, defaultStore(), keep);
  saveStore();
  renderStats();
});

// Genişlik değişince (döndürme, tam ekran) tahtayı yeniden ölçekle
let lastW = 0;
const onResize = () => {
  if (!game || wrap.clientWidth === lastW) return;
  lastW = wrap.clientWidth;
  layoutBoard();
  render();
};
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(onResize).observe(wrap);
else window.addEventListener('resize', onResize);

newGame();
