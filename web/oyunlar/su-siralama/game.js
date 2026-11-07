// Su Sıralama: renkli sıvıları tüplere dök, her tüp tek renkle dolsun.
// Seviyeler tohumlu üretilir (aynı seviye hep aynı dizilim). Ses yok, ağ isteği yok.
// Seviye ve rekor yalnızca localStorage'da tutulur (ba-oyun-su-siralama).

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-su-siralama';
const CAP = 4; // bir tüpün kapasitesi
const MAX_COLORS = 9;
const SYMBOLS = ['●', '▲', '■', '◆', '★', '✚', '♥', '✿', '☾'];
const COLORS = ['#e8554d', '#4a9be8', '#58c46a', '#f2b134', '#a07ce8', '#2fbfa8', '#f08a3c', '#e05fb0', '#8d97a8'];
const NAMES = ['kırmızı', 'mavi', 'yeşil', 'sarı', 'mor', 'turkuaz', 'turuncu', 'pembe', 'gri'];

/* ---------- Kayıt ---------- */
const store = { best: 0, level: 1 };
const clampInt = (v, lo, hi, d) => (Number.isInteger(v) && v >= lo && v <= hi ? v : d);
function loadStore() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      store.best = clampInt(o.best, 0, 9999, 0);
      store.level = clampInt(o.level, 1, 9999, 1);
    }
  } catch (e) { /* bozuk ya da kapalı depolama: varsayılanlarla devam */ }
}
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Üretici ---------- */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const colorCount = (level) => Math.min(3 + Math.floor((level - 1) / 2), MAX_COLORS);

/** Seviye için tüpleri üretir: k renk dolu, 2 boş tüp. Hiçbir tüp baştan tamamlanmış olmaz. */
function generate(level) {
  const k = colorCount(level);
  for (let attempt = 0; attempt < 50; attempt++) {
    const rand = rng(level * 7919 + 13 + attempt * 101);
    const units = [];
    for (let c = 0; c < k; c++) for (let i = 0; i < CAP; i++) units.push(c);
    for (let i = units.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [units[i], units[j]] = [units[j], units[i]];
    }
    const tubes = [];
    for (let t = 0; t < k; t++) tubes.push(units.slice(t * CAP, (t + 1) * CAP));
    if (tubes.some((t) => t.every((x) => x === t[0]))) continue;
    tubes.push([], []);
    return tubes;
  }
  const tubes = [];
  for (let c = 0; c < k; c++) tubes.push([c, (c + 1) % k, (c + 2) % k, c]);
  tubes.push([], []);
  return tubes;
}

/* ---------- Durum ---------- */
const state = { level: 1, tubes: [], moves: 0, undo: [], sel: -1, won: false };

const tubesEl = $('su-tubes');
const msgEl = $('su-msg');
const boxEl = $('oyun');
let focusIdx = 0;

const topRun = (t) => {
  if (!t.length) return 0;
  let n = 1;
  while (n < t.length && t[t.length - 1 - n] === t[t.length - 1]) n++;
  return n;
};
function canPour(a, b) {
  const A = state.tubes[a];
  const B = state.tubes[b];
  if (!A || !B || a === b || !A.length || B.length >= CAP) return false;
  return !B.length || B[B.length - 1] === A[A.length - 1];
}
const isSolved = () => state.tubes.every((t) => !t.length || (t.length === CAP && t.every((x) => x === t[0])));
const say = (text) => { msgEl.textContent = text; };

function pour(a, b) {
  if (state.won) return { ok: false, reason: 'bitti' };
  if (!canPour(a, b)) return { ok: false, reason: 'olmaz' };
  const A = state.tubes[a];
  const B = state.tubes[b];
  const n = Math.min(topRun(A), CAP - B.length);
  for (let i = 0; i < n; i++) B.push(A.pop());
  state.undo.push({ a, b, n });
  state.moves++;
  state.sel = -1;
  render();
  if (isSolved()) win();
  else say(`${n} birim döküldü: tüp ${a + 1} → tüp ${b + 1}.`);
  return { ok: true, n };
}
function undo() {
  if (state.won || !state.undo.length) { say('Geri alınacak hamle yok.'); return false; }
  const { a, b, n } = state.undo.pop();
  for (let i = 0; i < n; i++) state.tubes[a].push(state.tubes[b].pop());
  state.moves = Math.max(0, state.moves - 1);
  state.sel = -1;
  render();
  say('Son hamle geri alındı.');
  return true;
}

function win() {
  state.won = true;
  if (state.level > store.best) store.best = state.level;
  store.level = state.level + 1;
  saveStore();
  boxEl.dataset.phase = 'bitti';
  render();
  const box = $('sonuc');
  $('sonuc-seviye').textContent = String(state.level);
  $('sonuc-hamle').textContent = String(state.moves);
  $('sonuc-rekor').hidden = state.level < store.best;
  box.hidden = false;
  box.classList.add('is-active');
  say(`Seviye ${state.level} tamamlandı, ${state.moves} hamlede.`);
  $('su-next').focus();
}

function startLevel(level, tubes) {
  state.level = level;
  state.tubes = tubes || generate(level);
  state.moves = 0;
  state.undo = [];
  state.sel = -1;
  state.won = false;
  boxEl.dataset.phase = 'oyun';
  const box = $('sonuc');
  box.hidden = true;
  box.classList.remove('is-active');
  render();
  say(`Seviye ${level}: ${colorCount(level)} renk, ${state.tubes.length} tüp.`);
}

/* ---------- Çizim ---------- */
function tubeLabel(t, i) {
  const parts = t.map((c) => NAMES[c]).join(', ');
  const free = CAP - t.length;
  return `Tüp ${i + 1}: ${t.length ? 'alttan üste ' + parts : 'boş'}; ${free} boş yer${state.sel === i ? ' (seçili)' : ''}`;
}
function render() {
  if (tubesEl.children.length !== state.tubes.length) {
    tubesEl.textContent = '';
    state.tubes.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'su-tube';
      b.dataset.i = String(i);
      b.addEventListener('click', () => choose(i));
      b.addEventListener('focus', () => { focusIdx = i; });
      tubesEl.appendChild(b);
    });
  }
  state.tubes.forEach((t, i) => {
    const b = tubesEl.children[i];
    b.setAttribute('aria-label', tubeLabel(t, i));
    b.setAttribute('aria-pressed', String(state.sel === i));
    b.classList.toggle('is-sel', state.sel === i);
    b.classList.toggle('is-done', t.length === CAP && t.every((x) => x === t[0]));
    b.disabled = state.won;
    b.textContent = '';
    t.forEach((c) => {
      const s = document.createElement('span');
      s.className = 'su-seg';
      s.style.background = COLORS[c];
      s.textContent = SYMBOLS[c];
      b.appendChild(s);
    });
  });
  $('su-level').textContent = String(state.level);
  $('su-moves').textContent = String(state.moves);
  $('su-best').textContent = String(store.best);
  $('su-undo').disabled = state.won || !state.undo.length;
}

function choose(i) {
  if (state.won) return;
  if (state.sel < 0) {
    if (!state.tubes[i].length) { say('Boş tüpten dökülmez; önce dolu bir tüp seçin.'); return; }
    state.sel = i;
    render();
    say(`Tüp ${i + 1} seçildi. Dökmek için hedef tüpü seçin.`);
    return;
  }
  if (state.sel === i) { state.sel = -1; render(); say('Seçim iptal edildi.'); return; }
  const from = state.sel;
  if (!canPour(from, i)) {
    const full = state.tubes[i].length >= CAP;
    say(full ? `Tüp ${i + 1} dolu; başka bir tüp deneyin.` : `Tüp ${i + 1} içindeki üst renk farklı; yalnızca aynı renge ya da boş tüpe dökülür.`);
    return;
  }
  pour(from, i);
}

/* ---------- Klavye ---------- */
boxEl.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  const n = state.tubes.length;
  if (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'Home' || k === 'End') {
    if (state.won) return;
    e.preventDefault();
    let i = focusIdx;
    if (k === 'ArrowRight') i = (i + 1) % n;
    else if (k === 'ArrowLeft') i = (i - 1 + n) % n;
    else i = k === 'Home' ? 0 : n - 1;
    tubesEl.children[i].focus();
  } else if (k === 'Escape') {
    if (state.sel >= 0) { state.sel = -1; render(); say('Seçim iptal edildi.'); }
  } else if (k === 'u' || k === 'U') {
    undo();
  } else if (k === 'r' || k === 'R') {
    restart();
  } else if (/^[1-9]$/.test(k) && !state.won) {
    const i = Number(k) - 1;
    if (i < n) { tubesEl.children[i].focus(); choose(i); }
  }
});

function restart() {
  startLevel(state.level);
  say(`Seviye ${state.level} baştan başladı.`);
}
$('su-undo').addEventListener('click', undo);
$('su-restart').addEventListener('click', restart);
$('su-next').addEventListener('click', () => { startLevel(state.level + 1); tubesEl.children[0].focus(); });
$('su-again').addEventListener('click', () => { restart(); tubesEl.children[0].focus(); });
$('su-reset').addEventListener('click', () => {
  store.level = 1;
  saveStore();
  startLevel(1);
  say('İlk seviyeden başladınız; en yüksek seviyeniz korunur.');
});

/* ---------- Tam ekran ---------- */
const fsBtn = $('tam-ekran');
if (document.fullscreenEnabled && boxEl.requestFullscreen) {
  fsBtn.hidden = false;
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else boxEl.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    fsBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement));
    fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

/* ---------- Test kancası ---------- */
const snapshot = () => ({
  level: state.level, tubes: state.tubes.map((t) => t.slice()), moves: state.moves, won: state.won,
  sel: state.sel, best: store.best, canUndo: state.undo.length > 0,
});
window.__suSiralamaTest = Object.assign(snapshot, {
  pour,
  undo,
  newLevel: (n) => { startLevel(n); return snapshot(); },
  setTubes: (tubes) => { startLevel(state.level, tubes.map((t) => t.slice())); return snapshot(); },
  generate: (n) => generate(n),
});

loadStore();
startLevel(store.level);
