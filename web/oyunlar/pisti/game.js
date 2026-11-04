// Pişti arayüzü — Bilişim Ajans. Tamamen istemci tarafı; dış istek, çerez, ses yoktur.
// Kalıcı veri: yalnızca bu cihazda localStorage 'ba-oyun-pisti' (galibiyet/yenilgi, pişti sayısı, ayarlar).
import * as E from './engine.js';

const STORE_KEY = 'ba-oyun-pisti';

// ---------------------------------------------------------------------------
// Depolama: bozuk veri varsayılana döner
// ---------------------------------------------------------------------------
const defaultStore = () => ({ played: 0, won: 0, lost: 0, pistiCount: 0, bestTotal: 0, level: 'orta', target: 151, hints: true });

function loadStore() {
  const d = defaultStore();
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { raw = null; }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return d;
  const cnt = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), 1e9) : 0);
  const won = cnt(raw.won);
  const lost = cnt(raw.lost);
  return {
    played: Math.max(cnt(raw.played), won + lost),
    won,
    lost,
    pistiCount: cnt(raw.pistiCount),
    bestTotal: cnt(raw.bestTotal),
    level: ['kolay', 'orta', 'zor'].includes(raw.level) ? raw.level : 'orta',
    target: raw.target === 101 ? 101 : 151,
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
const box = $('ps-box');
const elStatus = $('ps-status');
const elLast = $('ps-last');
const elOpp = $('ps-opp');
const elTable = $('ps-table');
const elHand = $('ps-hand');
const elDeck = $('ps-deck');
const elTableCount = $('ps-table-count');
const elScoreMe = $('ps-score-me');
const elScoreCpu = $('ps-score-cpu');
const elCapMe = $('ps-cap-me');
const elCapCpu = $('ps-cap-cpu');
const elPistiMe = $('ps-pisti-me');
const elPistiCpu = $('ps-pisti-cpu');
const elResult = $('ps-result');
const elResultTitle = $('ps-result-title');
const elResultText = $('ps-result-text');
const btnNext = $('ps-next');
const selLevel = $('ps-level');
const selTarget = $('ps-target');
const chkHints = $('ps-hints');
const elStats = $('ps-stats');

const params = new URLSearchParams(location.search);
const seedParam = params.get('seed');
const FAST = params.get('hiz') === '1';
const DELAY = FAST ? 30 : 850;

let rngSeed = seedParam !== null && /^\d+$/.test(seedParam) ? Number(seedParam) : null;
const makeRng = () => (rngSeed !== null ? E.mulberry32(rngSeed++) : Math.random);

let state = null;
let aiTimer = 0;
let busy = false; // sonuç penceresi açıkken oynamayı kilitle

// ---------------------------------------------------------------------------
// Kart çizimi (HTML/CSS)
// ---------------------------------------------------------------------------
function cardEl(id, { down = false, button = false } = {}) {
  const el = document.createElement(button ? 'button' : 'div');
  if (button) el.type = 'button';
  el.className = 'ps-card';
  if (down) {
    el.classList.add('down');
    if (!button) el.setAttribute('aria-hidden', 'true');
    return el;
  }
  const s = E.suitOf(id);
  const r = E.rankOf(id);
  if (s === 1 || s === 2) el.classList.add('red');
  const label = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][r];
  el.dataset.id = String(id);
  el.setAttribute('aria-label', E.cardName(id));
  el.innerHTML = `<span class="c" aria-hidden="true">${label}</span><span class="s" aria-hidden="true">${E.SUITS[s]}︎</span><span class="m" aria-hidden="true">${E.SUITS[s]}︎</span>`;
  return el;
}

function render() {
  if (!state) return;
  // Rakip eli (kapalı kartlar)
  elOpp.textContent = '';
  for (let i = 0; i < state.hands[1].length; i++) elOpp.appendChild(cardEl(0, { down: true }));
  elOpp.setAttribute('aria-label', `Bilgisayarın elinde ${state.hands[1].length} kart var`);

  // Yer: son 6 kartı yelpaze gibi göster, ilk dağıtımdaki alt kartlar kapalı
  elTable.textContent = '';
  const hidden = new Set(state.hiddenIds);
  const shown = state.table.slice(-6);
  shown.forEach((id, i) => {
    const c = cardEl(id, { down: hidden.has(id) && i < shown.length - 1 });
    c.style.left = `calc(var(--ps-off) * ${i})`;
    elTable.appendChild(c);
  });
  elTable.classList.toggle('is-empty', !state.table.length);
  elTable.setAttribute('aria-label', state.table.length
    ? `Yerdeki kartlar, en üstte ${E.cardName(state.table[state.table.length - 1])}; toplam ${state.table.length} kart`
    : 'Yerde kart yok');
  elTableCount.textContent = state.table.length ? `Yerde ${state.table.length} kart` : 'Yer boş';
  elDeck.textContent = `Deste: ${state.deck.length}`;

  // Benim elim
  elHand.textContent = '';
  const myTurn = state.phase === 'play' && state.turn === 0 && !busy;
  for (const id of state.hands[0]) {
    const b = cardEl(id, { button: true });
    b.disabled = !myTurn;
    if (store.hints && myTurn && E.captures(state.table, id)) b.classList.add('can');
    b.addEventListener('click', () => onPlayCard(id));
    elHand.appendChild(b);
  }

  elScoreMe.textContent = String(state.total[0]);
  elScoreCpu.textContent = String(state.total[1]);
  elCapMe.textContent = String(state.captured[0].length);
  elCapCpu.textContent = String(state.captured[1].length);
  elPistiMe.textContent = String(state.pistiCount[0]);
  elPistiCpu.textContent = String(state.pistiCount[1]);
  box.dataset.turn = state.phase !== 'play' ? 'over' : state.turn === 0 ? 'me' : 'cpu';
  box.dataset.hand = String(state.handNo);
  if (state.phase === 'play') {
    elStatus.textContent = state.turn === 0 ? 'Sıra sizde: bir kart seçin.' : 'Bilgisayar düşünüyor…';
    elStatus.classList.remove('is-over');
  }
}

function renderStats() {
  elStats.textContent = `Bu cihazda: ${store.played} oyun, ${store.won} galibiyet, ${store.lost} yenilgi · toplam ${store.pistiCount} pişti`;
}

// ---------------------------------------------------------------------------
// Oyun akışı
// ---------------------------------------------------------------------------
function describe(ev, who) {
  const name = who === 0 ? 'Siz' : 'Bilgisayar';
  let t = `${name}: ${E.cardName(ev.card)}`;
  if (ev.captured.length) {
    t += ` ile ${ev.captured.length} kart topladı${who === 0 ? 'nız' : ''}`;
    if (ev.pisti === 20) t += ' — vale piştisi! (+20)';
    else if (ev.pisti === 10) t += ' — PİŞTİ! (+10)';
  } else {
    t += ' oynadı.';
  }
  return t;
}

function onPlayCard(id) {
  if (!state || state.phase !== 'play' || state.turn !== 0 || busy) return;
  if (!state.hands[0].includes(id)) return;
  const ev = E.play(state, id);
  afterPlay(ev, 0);
}

function afterPlay(ev, who) {
  elLast.textContent = describe(ev, who) + (ev.dealt ? ' Yeni kartlar dağıtıldı.' : '');
  render();
  if (ev.handOver) { endHand(ev.result); return; }
  scheduleAi();
}

function scheduleAi() {
  clearTimeout(aiTimer);
  if (!state || state.phase !== 'play' || state.turn !== 1) return;
  aiTimer = setTimeout(() => {
    if (!state || state.phase !== 'play' || state.turn !== 1) return;
    const card = E.chooseCard(state, 1, state.level, state.rng);
    const ev = E.play(state, card);
    afterPlay(ev, 1);
  }, DELAY);
}

function endHand(res) {
  busy = true;
  render();
  const over = state.phase === 'gameover';
  const rows = [
    `Kart sayısı: siz ${res.counts[0]} · bilgisayar ${res.counts[1]}`,
    `Kart puanları: siz ${res.cardPts[0]} · bilgisayar ${res.cardPts[1]}`,
    `Pişti puanları: siz ${res.pistiPts[0]} · bilgisayar ${res.pistiPts[1]}`,
    `Çoğunluk (3 puan): ${res.majority[0] ? 'siz' : res.majority[1] ? 'bilgisayar' : 'kimse almadı'}`,
    `Bu eli aldığınız puan: ${res.pts[0]} · bilgisayar: ${res.pts[1]}`,
    `Toplam: siz ${state.total[0]} · bilgisayar ${state.total[1]} (hedef ${state.target})`,
  ];
  elResultTitle.textContent = over ? (state.winner === 0 ? 'Oyunu kazandınız!' : 'Bilgisayar kazandı') : 'El bitti';
  elResultText.innerHTML = rows.map((r) => `<span>${r}</span>`).join('');
  btnNext.textContent = over ? 'Yeni oyun' : 'Sonraki el';
  elResult.hidden = false;
  elStatus.textContent = over ? 'Oyun bitti.' : 'El bitti.';
  elStatus.classList.toggle('is-over', over);
  if (over) {
    store.played += 1;
    if (state.winner === 0) store.won += 1; else store.lost += 1;
    store.bestTotal = Math.max(store.bestTotal, state.total[0]);
  }
  store.pistiCount += state.pistiCount[0];
  saveStore();
  renderStats();
  btnNext.focus();
}

function nextHand() {
  elResult.hidden = true;
  busy = false;
  if (state.phase === 'gameover') { newGame(); return; }
  E.startHand(state);

  elLast.textContent = state.turn === 0 ? 'Yeni el: ilk hamle sizde.' : 'Yeni el: ilk hamle bilgisayarda.';
  render();
  scheduleAi();
}

function newGame() {
  clearTimeout(aiTimer);
  elResult.hidden = true;
  busy = false;
  state = E.newGame({ target: store.target, level: store.level, rng: makeRng() });

  elLast.textContent = 'Yeni oyun başladı. Yerdeki kartların en üstü açıktır.';
  render();
  scheduleAi();
}

// ---------------------------------------------------------------------------
// Ayarlar ve düğmeler
// ---------------------------------------------------------------------------
selLevel.value = store.level;
selTarget.value = String(store.target);
chkHints.checked = store.hints;
selLevel.addEventListener('change', () => { store.level = selLevel.value; saveStore(); if (state) state.level = store.level; });
selTarget.addEventListener('change', () => { store.target = selTarget.value === '101' ? 101 : 151; saveStore(); newGame(); });
chkHints.addEventListener('change', () => { store.hints = chkHints.checked; saveStore(); render(); });
btnNext.addEventListener('click', nextHand);
$('ps-new').addEventListener('click', newGame);
$('ps-stats-reset').addEventListener('click', () => {
  const keep = { level: store.level, target: store.target, hints: store.hints };
  Object.assign(store, defaultStore(), keep);
  saveStore();
  renderStats();
});
$('ps-full').addEventListener('click', () => {
  if (document.fullscreenElement) { document.exitFullscreen?.(); return; }
  if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
});

renderStats();
newGame();

// Test kancası: yalnızca durum okuma/hazırlama; ağa çıkmaz
window.__pistiTest = {
  state: () => JSON.parse(JSON.stringify({ ...state, rng: undefined })),
  engine: E,
};
