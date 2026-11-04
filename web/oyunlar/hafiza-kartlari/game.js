// Hafıza Kartları — eşleştirme oyunu.
// Tamamen istemci tarafı: semboller emoji veya satır içi SVG olarak üretilir, dış görsel/istek yoktur.
// En iyi sonuç ve ayarlar yalnızca bu cihazdaki localStorage'a yazılır.

const STORE_KEY = 'ba-oyun-hafiza-kartlari';
const MISMATCH_DELAY = 900; // eşleşmeyen kartların kapanma süresi (ms)

// Boyut tanımları: cols x rows (sütun x satır); çift sayıda kart zorunlu.
const SIZES = {
  '4x3': { cols: 4, rows: 3 },
  '4x4': { cols: 4, rows: 4 },
  '6x5': { cols: 6, rows: 5 },
  '6x6': { cols: 6, rows: 6 },
};

// "Semboller" teması: 18 farklı emoji (6x6 için 18 çift gerekir).
const EMOJIS = [
  ['🐶', 'köpek'], ['🐱', 'kedi'], ['🐰', 'tavşan'], ['🦊', 'tilki'], ['🐻', 'ayı'], ['🐼', 'panda'],
  ['🐸', 'kurbağa'], ['🐵', 'maymun'], ['🦁', 'aslan'], ['🐯', 'kaplan'], ['🐧', 'penguen'], ['🐢', 'kaplumbağa'],
  ['🍎', 'elma'], ['🍋', 'limon'], ['🍇', 'üzüm'], ['🍓', 'çilek'], ['🌻', 'ayçiçeği'], ['⭐', 'yıldız'],
];

// "Renkler" teması: 6 şekil x 3 renk = 18 ayırt edilebilir sembol (renk körlüğü için şekil de değişir).
const SHAPES = ['daire', 'kare', 'üçgen', 'baklava', 'yıldız', 'altıgen'];
const COLORS = [['#c62828', 'kırmızı'], ['#1565c0', 'mavi'], ['#f9a825', 'sarı']];

function starPoints() {
  // Beş köşeli yıldız: dış yarıçap 10, iç yarıçap 4.3, merkez (12, 12.6)
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 10 : 4.3;
    const a = (-90 + i * 36) * Math.PI / 180;
    pts.push((12 + r * Math.cos(a)).toFixed(2) + ',' + (12.6 + r * Math.sin(a)).toFixed(2));
  }
  return pts.join(' ');
}

function shapeSvg(shape, color) {
  const body = {
    'daire': '<circle cx="12" cy="12" r="9"/>',
    'kare': '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/>',
    'üçgen': '<polygon points="12,3 22,20.5 2,20.5"/>',
    'baklava': '<polygon points="12,2 22,12 12,22 2,12"/>',
    'yıldız': '<polygon points="' + starPoints() + '"/>',
    'altıgen': '<polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"/>',
  }[shape];
  return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="' + color
    + '" stroke="rgba(0,0,0,.45)" stroke-width="1.2" stroke-linejoin="round">' + body + '</svg>';
}

/** Seçilen tema için `count` adet benzersiz sembol üretir. */
function buildSymbols(theme, count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    if (theme === 'sayilar') {
      list.push({ key: 'n' + (i + 1), html: null, text: String(i + 1), name: String(i + 1) });
    } else if (theme === 'renkler') {
      const shape = SHAPES[i % SHAPES.length];
      const [hex, cname] = COLORS[Math.floor(i / SHAPES.length) % COLORS.length];
      list.push({ key: 'c' + i, html: shapeSvg(shape, hex), text: null, name: cname + ' ' + shape });
    } else {
      list.push({ key: 'e' + i, html: null, text: EMOJIS[i][0], name: EMOJIS[i][1] });
    }
  }
  return list;
}

function shuffle(arr) {
  // Fisher–Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---- Depolama (localStorage erişilemezse sessizce yoksayılır) ----
function loadStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function saveStore(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* özel gezinti vb. */ }
}

const fmtTime = (ms) => {
  const s = Math.floor(ms / 1000);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
};

// ---- DOM ----
const $ = (id) => document.getElementById(id);
const box = $('oyun-kutusu');
const board = $('mc-board');
const selSize = $('mc-size');
const selTheme = $('mc-theme');
const selPlayers = $('mc-players');
const elMoves = $('mc-moves');
const elTime = $('mc-time');
const elBest = $('mc-best');
const elStatus = $('mc-status');
const elTurns = $('mc-turns');
const elResult = $('mc-result');

const store = loadStore();
store.best = store.best || {};
store.prefs = store.prefs || {};

// Kayıtlı ayarları geri yükle (geçerli değerlerse)
if (SIZES[store.prefs.size]) selSize.value = store.prefs.size;
if (['semboller', 'sayilar', 'renkler'].includes(store.prefs.theme)) selTheme.value = store.prefs.theme;
if (['1', '2'].includes(store.prefs.players)) selPlayers.value = store.prefs.players;

// ---- Oyun durumu ----
let cards = [];          // { pair, sym, state: 'closed'|'open'|'matched', el }
let openIdx = [];        // eşleşmeyi bekleyen açık kart indeksleri (en çok 2)
let pending = null;      // eşleşmeyen çiftin kapanmasını bekleyen { idx, timer }
let moves = 0;
let matchedPairs = 0;
let totalPairs = 0;
let startedAt = 0;
let finalMs = 0;
let timerId = 0;
let finished = false;
let current = 0;         // iki oyunculu modda sıradaki oyuncu (0 veya 1)
let scores = [0, 0];
let focusIdx = 0;
let sizeKey = '4x3';
let players = 1;

function setStatus(text) { elStatus.textContent = text; }

function cardLabel(i) {
  const c = cards[i];
  const n = i + 1;
  if (c.state === 'closed') return 'Kart ' + n + ', kapalı';
  if (c.state === 'open') return 'Kart ' + n + ': ' + c.sym.name;
  return 'Kart ' + n + ': ' + c.sym.name + ', eşleşti';
}

function setState(i, state) {
  const c = cards[i];
  c.state = state;
  c.el.dataset.state = state;
  c.el.setAttribute('aria-label', cardLabel(i));
  c.el.setAttribute('aria-disabled', state === 'matched' ? 'true' : 'false');
}

function updateStats() {
  elMoves.textContent = String(moves);
  elTime.textContent = fmtTime(finished ? finalMs : (startedAt ? Date.now() - startedAt : 0));
}

function updateBestText() {
  const b = store.best[sizeKey];
  const label = sizeKey.replace('x', ' × ');
  elBest.textContent = b
    ? 'En iyi sonuç (' + label + '): ' + b.moves + ' hamle · ' + fmtTime(b.ms)
    : 'En iyi sonuç (' + label + '): henüz yok';
}

function updateTurns() {
  const two = players === 2;
  elTurns.hidden = !two;
  if (!two) return;
  $('mc-p1-score').textContent = String(scores[0]);
  $('mc-p2-score').textContent = String(scores[1]);
  $('mc-p1').setAttribute('aria-current', current === 0 ? 'true' : 'false');
  $('mc-p2').setAttribute('aria-current', current === 1 ? 'true' : 'false');
}

function stopTimer() { clearInterval(timerId); timerId = 0; }

function startTimer() {
  startedAt = Date.now();
  timerId = setInterval(updateStats, 250);
}

function resolvePending() {
  if (!pending) return;
  clearTimeout(pending.timer);
  pending.idx.forEach((i) => setState(i, 'closed'));
  pending = null;
}

function whoName(p) { return 'Oyuncu ' + (p + 1); }

function finishGame() {
  finished = true;
  finalMs = Date.now() - startedAt;
  stopTimer();
  updateStats();
  const title = $('mc-result-title');
  const text = $('mc-result-text');
  if (players === 1) {
    title.textContent = 'Tebrikler, tüm çiftleri buldunuz!';
    let msg = totalPairs + ' çifti ' + moves + ' hamlede, ' + fmtTime(finalMs) + ' sürede tamamladınız.';
    const prev = store.best[sizeKey];
    if (!prev || moves < prev.moves || (moves === prev.moves && finalMs < prev.ms)) {
      store.best[sizeKey] = { moves, ms: finalMs };
      saveStore(store);
      msg += ' Yeni en iyi sonuç!';
      updateBestText();
    }
    text.textContent = msg;
    setStatus('Oyun bitti. ' + msg);
  } else {
    let msg;
    if (scores[0] === scores[1]) {
      title.textContent = 'Berabere!';
      msg = 'İki oyuncu da ' + scores[0] + ' çift buldu.';
    } else {
      const w = scores[0] > scores[1] ? 0 : 1;
      title.textContent = whoName(w) + ' kazandı!';
      msg = scores[0] + ' – ' + scores[1] + ' (toplam ' + moves + ' hamle, ' + fmtTime(finalMs) + ').';
    }
    text.textContent = msg;
    setStatus('Oyun bitti. ' + title.textContent + ' ' + msg);
  }
  elResult.classList.add('is-active');
}

function flip(i) {
  if (finished) return;
  if (pending) resolvePending(); // yeni karta tıklanınca eşleşmeyen çift hemen kapanır
  const c = cards[i];
  if (c.state !== 'closed') return;
  if (!startedAt) startTimer();
  setState(i, 'open');
  openIdx.push(i);
  if (openIdx.length === 1) {
    setStatus('Açılan kart: ' + c.sym.name + '. Şimdi eşini bulun.');
    return;
  }
  // İkinci kart açıldı: hamle sayılır ve değerlendirilir.
  moves++;
  const [a, b] = openIdx;
  openIdx = [];
  if (cards[a].pair === cards[b].pair) {
    setState(a, 'matched');
    setState(b, 'matched');
    matchedPairs++;
    scores[current]++;
    updateStats();
    updateTurns();
    if (matchedPairs === totalPairs) { finishGame(); return; }
    setStatus('Eşleşme: ' + c.sym.name + '!' + (players === 2 ? ' ' + whoName(current) + ' devam ediyor.' : ''));
  } else {
    pending = { idx: [a, b], timer: setTimeout(resolvePending, MISMATCH_DELAY) };
    setStatus('Eşleşmedi: ' + cards[a].sym.name + ' ve ' + cards[b].sym.name + '.'
      + (players === 2 ? ' Sıra ' + whoName(1 - current) + "'de." : ''));
    if (players === 2) current = 1 - current;
    updateStats();
    updateTurns();
  }
}

function setFocus(i, move) {
  focusIdx = Math.max(0, Math.min(cards.length - 1, i));
  cards.forEach((c, k) => { c.el.tabIndex = k === focusIdx ? 0 : -1; });
  if (move) cards[focusIdx].el.focus();
}

function buildBoard() {
  board.textContent = '';
  const { cols } = SIZES[sizeKey];
  board.style.setProperty('--cols', String(cols));
  cards.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mc-card';
    btn.dataset.state = 'closed';
    btn.dataset.i = String(i);
    btn.innerHTML = '<span class="mc-inner"><span class="mc-face mc-front" aria-hidden="true"></span>'
      + '<span class="mc-face mc-back" aria-hidden="true"><span class="mc-sym"></span></span></span>';
    const sym = btn.querySelector('.mc-sym');
    if (c.sym.html) sym.innerHTML = c.sym.html; else sym.textContent = c.sym.text;
    btn.addEventListener('click', () => { setFocus(i, false); flip(i); });
    c.el = btn;
    board.appendChild(btn);
    setState(i, 'closed');
  });
  setFocus(0, false);
}

function newGame() {
  resolvePending();
  stopTimer();
  sizeKey = selSize.value in SIZES ? selSize.value : '4x3';
  players = selPlayers.value === '2' ? 2 : 1;
  const { cols, rows } = SIZES[sizeKey];
  totalPairs = (cols * rows) / 2;
  const symbols = buildSymbols(selTheme.value, totalPairs);
  const deck = [];
  symbols.forEach((s, k) => { deck.push({ pair: k, sym: s }, { pair: k, sym: s }); });
  shuffle(deck);
  cards = deck.map((d) => ({ pair: d.pair, sym: d.sym, state: 'closed', el: null }));
  openIdx = [];
  pending = null;
  moves = 0;
  matchedPairs = 0;
  startedAt = 0;
  finalMs = 0;
  finished = false;
  current = 0;
  scores = [0, 0];
  elResult.classList.remove('is-active');
  buildBoard();
  updateStats();
  updateBestText();
  updateTurns();
  setStatus(players === 2
    ? 'Oyuncu 1 başlıyor. Bir kart seçin.'
    : 'Bir kart seçerek başlayın. Süre ilk karta dokununca işler.');
  store.prefs = { size: sizeKey, theme: selTheme.value, players: String(players) };
  saveStore(store);
}

// Klavye: ok tuşları ve Home/End ile kartlar arasında gezinme (roving tabindex).
board.addEventListener('keydown', (e) => {
  if (!cards.length) return;
  const cols = SIZES[sizeKey].cols;
  const from = Number(e.target.closest('.mc-card')?.dataset.i ?? focusIdx);
  let to = null;
  switch (e.key) {
    case 'ArrowRight': to = from + 1; break;
    case 'ArrowLeft': to = from - 1; break;
    case 'ArrowDown': to = from + cols; break;
    case 'ArrowUp': to = from - cols; break;
    case 'Home': to = 0; break;
    case 'End': to = cards.length - 1; break;
    default: return;
  }
  e.preventDefault();
  if (to >= 0 && to < cards.length) setFocus(to, true);
});

[selSize, selTheme, selPlayers].forEach((s) => s.addEventListener('change', newGame));
$('mc-restart').addEventListener('click', newGame);
$('mc-again').addEventListener('click', () => { newGame(); setFocus(0, true); });

// Tam ekran: yalnızca oyun kutusu gösterilir (reklam alanları kutunun dışındadır).
const fsBtn = $('mc-full');
if (!document.fullscreenEnabled) {
  fsBtn.hidden = true;
} else {
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

newGame();
