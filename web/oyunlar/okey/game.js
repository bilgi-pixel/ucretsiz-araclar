// Okey arayüzü — Bilişim Ajans. Tamamen istemci tarafı; dış istek, çerez, ses yoktur.
// Kalıcı veri: yalnızca bu cihazda localStorage 'ba-oyun-okey' (el, galibiyet, puan, çifte/okey bitişleri).
import * as E from './engine.js';

const STORE_KEY = 'ba-oyun-okey';

// ---------------------------------------------------------------------------
// Depolama: bozuk veri varsayılana döner
// ---------------------------------------------------------------------------
const defaultStore = () => ({ played: 0, won: 0, draws: 0, cifte: 0, okeyFinish: 0, points: 0 });

function loadStore() {
  const d = defaultStore();
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { raw = null; }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return d;
  const cnt = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), 1e9) : 0);
  const pts = (v) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(-1e9, Math.min(Math.trunc(v), 1e9)) : 0);
  const won = cnt(raw.won);
  return { played: Math.max(cnt(raw.played), won), won, draws: cnt(raw.draws), cifte: cnt(raw.cifte), okeyFinish: cnt(raw.okeyFinish), points: pts(raw.points) };
}
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* özel gezinti vb. */ }
}
const store = loadStore();

// ---------------------------------------------------------------------------
// DOM
// ---------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const box = $('ok-box');
const elStatus = $('ok-status');
const elLast = $('ok-last');
const elRack = $('ok-rack');
const elPile = $('ok-pile');
const elInd = $('ok-indicator');
const elOkeyInfo = $('ok-okey-info');
const elResult = $('ok-result');
const elResultTitle = $('ok-result-title');
const elResultText = $('ok-result-text');
const btnNext = $('ok-next');
const btnDiscard = $('ok-discard-btn');
const btnFinish = $('ok-finish-btn');
const elStats = $('ok-stats');
const elGroups = $('ok-groups');

const params = new URLSearchParams(location.search);
const seedParam = params.get('seed');
const FAST = params.get('hiz') === '1';
const DELAY = FAST ? 25 : 900;
let rngSeed = seedParam !== null && /^\d+$/.test(seedParam) ? Number(seedParam) : null;
const makeRng = () => (rngSeed !== null ? E.mulberry32(rngSeed++) : Math.random);

const SEAT_NAMES = ['Siz', 'Bilgisayar 1 (sağ)', 'Bilgisayar 2 (karşı)', 'Bilgisayar 3 (sol)'];

let round = null;
let rng = Math.random;
let layout = new Array(E.SLOTS).fill(null); // ıstaka: 2 satır × 15 yuva
let selected = null;                        // seçili taş numarası
let handNo = 0;
let aiTimer = 0;
const totals = [0, 0, 0, 0];
let suppressClick = false;

// ---------------------------------------------------------------------------
// Taş çizimi
// ---------------------------------------------------------------------------
function tileEl(id, tag = 'div') {
  const el = document.createElement(tag);
  if (tag === 'button') el.type = 'button';
  el.className = 'ok-tile';
  el.dataset.id = String(id);
  if (E.isFake(id)) {
    el.classList.add('fake');
    el.innerHTML = '<span class="n" aria-hidden="true">✦</span>';
    el.setAttribute('aria-label', 'Sahte okey');
  } else {
    el.classList.add('c' + E.colorOf(id));
    const joker = E.isJoker(id, round.okey);
    if (joker) el.classList.add('joker');
    el.innerHTML = `<span class="n" aria-hidden="true">${E.numOf(id)}</span><span class="dot" aria-hidden="true"></span>${joker ? '<span class="jk" aria-hidden="true">okey</span>' : ''}`;
    el.setAttribute('aria-label', E.tileName(id) + (joker ? ' (okey, joker)' : ''));
  }
  return el;
}

// ---------------------------------------------------------------------------
// Istaka düzeni
// ---------------------------------------------------------------------------
function syncLayout() {
  const hand = new Set(round.hands[0]);
  for (let i = 0; i < layout.length; i++) if (layout[i] !== null && !hand.has(layout[i])) layout[i] = null;
  const present = new Set(layout.filter((x) => x !== null));
  for (const id of round.hands[0]) {
    if (present.has(id)) continue;
    const k = layout.indexOf(null);
    if (k >= 0) layout[k] = id;
  }
  if (selected !== null && !hand.has(selected)) selected = null;
}

function moveTile(from, to) {
  if (from === to || to < 0 || to >= layout.length) return;
  const t = layout[from];
  layout[from] = layout[to];
  layout[to] = t;
}

const groupCache = new Map();
function typeOfSegment(ids) {
  const key = ids.slice().sort((a, b) => a - b).join(',') + '|' + round.okey.color + round.okey.num;
  if (!groupCache.has(key)) groupCache.set(key, E.groupType(ids, round.okey));
  return groupCache.get(key);
}

/** Boşlukla ayrılmış ardışık taş dizilerini per olarak denetler. */
function markGroups() {
  let groups = 0;
  let tiles = 0;
  const marks = new Array(layout.length).fill(false);
  for (let row = 0; row < 2; row++) {
    let seg = [];
    const flush = () => {
      if (seg.length >= 3 && typeOfSegment(seg.map((s) => s.id))) {
        groups++; tiles += seg.length;
        seg.forEach((s) => { marks[s.i] = true; });
      }
      seg = [];
    };
    for (let c = 0; c < E.ROW; c++) {
      const i = row * E.ROW + c;
      if (layout[i] === null) flush(); else seg.push({ id: layout[i], i });
    }
    flush();
  }
  return { marks, groups, tiles };
}

// ---------------------------------------------------------------------------
// Çizim
// ---------------------------------------------------------------------------
function renderRack(focusId) {
  const { marks, groups, tiles } = markGroups();
  elRack.textContent = '';
  for (let i = 0; i < E.SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'ok-slot';
    slot.dataset.slot = String(i);
    const id = layout[i];
    if (id !== null) {
      const t = tileEl(id, 'button');
      if (marks[i]) t.classList.add('in-group');
      if (selected === id) { t.classList.add('sel'); t.setAttribute('aria-pressed', 'true'); } else t.setAttribute('aria-pressed', 'false');
      slot.appendChild(t);
    }
    elRack.appendChild(slot);
  }
  elGroups.textContent = `Dizili per: ${groups} (${tiles} taş) · yeşil alt çizgi, geçerli per demektir.`;
  if (focusId !== undefined && focusId !== null) {
    const t = elRack.querySelector(`.ok-tile[data-id="${focusId}"]`);
    if (t) t.focus();
  }
}

function discTile(seat) {
  const list = round.discards[seat];
  const holder = $('ok-disc-' + seat);
  holder.textContent = '';
  if (!list.length) { holder.classList.add('empty'); return; }
  holder.classList.remove('empty');
  const last = list[list.length - 1];
  const canTake = seat === 3 && round.phase === 'draw' && round.turn === 0;
  const t = tileEl(last, canTake ? 'button' : 'div');
  if (canTake) {
    t.classList.add('take');
    t.setAttribute('aria-label', 'Soldaki oyuncunun attığı taşı al: ' + E.tileName(last));
    t.addEventListener('click', () => humanDraw('side'));
  }
  holder.appendChild(t);
  const count = document.createElement('span');
  count.className = 'ok-dcount';
  count.textContent = String(list.length);
  count.setAttribute('aria-hidden', 'true');
  holder.appendChild(count);
}

function render(focusId) {
  if (!round) return;
  syncLayout();
  // Gösterge ve okey
  elInd.textContent = '';
  elInd.appendChild(tileEl(round.indicator));
  elOkeyInfo.textContent = `Gösterge: ${E.tileName(round.indicator)} · Okey: ${E.COLORS[round.okey.color]} ${round.okey.num}`;
  // Ortadaki taşlar
  const myDraw = round.phase === 'draw' && round.turn === 0;
  elPile.disabled = !myDraw || !round.pile.length;
  elPile.textContent = '';
  const cnt = document.createElement('span');
  cnt.textContent = `Ortadan çek (${round.pile.length})`;
  elPile.appendChild(cnt);
  // Rakipler
  for (const s of [1, 2, 3]) {
    $('ok-n-' + s).textContent = String(round.hands[s].length);
    $('ok-seat-' + s).classList.toggle('turn', round.turn === s && round.phase !== 'over');
  }
  for (const s of [0, 1, 2, 3]) discTile(s);
  box.dataset.turn = round.phase === 'over' ? 'over' : round.turn === 0 ? 'me' : 'cpu';
  box.dataset.phase = round.phase;
  box.dataset.hand = String(handNo);
  btnDiscard.disabled = !(round.phase === 'discard' && round.turn === 0 && selected !== null);
  btnFinish.disabled = btnDiscard.disabled;
  $('ok-series').disabled = round.phase === 'over';
  $('ok-pairs').disabled = round.phase === 'over';
  if (round.phase !== 'over') {
    if (round.turn === 0) {
      elStatus.textContent = round.phase === 'draw'
        ? 'Sıra sizde: ortadan veya soldaki oyuncunun attığı taşı çekin.'
        : 'Bir taş seçip atın (ya da bitiriyorsanız "Seçili taşla bitir").';
    } else {
      elStatus.textContent = `Sıra: ${SEAT_NAMES[round.turn]}…`;
    }
    elStatus.classList.remove('is-over');
  }
  renderRack(focusId);
  elRack.setAttribute('aria-label', `Istakanız, ${round.hands[0].length} taş`);
}

function renderStats() {
  elStats.textContent = `Bu cihazda: ${store.played} el, ${store.won} galibiyet, ${store.draws} berabere · ${store.cifte} çifte, ${store.okeyFinish} okey atarak bitiş · puan ${store.points}`;
  $('ok-totals').textContent = `Oturum puanı — Siz: ${totals[0]} · B1: ${totals[1]} · B2: ${totals[2]} · B3: ${totals[3]}`;
}

// ---------------------------------------------------------------------------
// Akış
// ---------------------------------------------------------------------------
function say(t) { elLast.textContent = t; }

function humanDraw(source) {
  if (!round || round.phase !== 'draw' || round.turn !== 0) return;
  let t;
  try { t = E.draw(round, 0, source); } catch (e) { say('Bu taş çekilemez: ' + e.message); return; }
  selected = null;
  say(`${source === 'side' ? 'Yandan' : 'Ortadan'} ${E.tileName(t)} çektiniz.`);
  syncLayout();
  render(t);
}

function humanDiscard(id) {
  if (!round || round.phase !== 'discard' || round.turn !== 0) return;
  if (!round.hands[0].includes(id)) return;
  E.discard(round, 0, id);
  selected = null;
  say(`${E.tileName(id)} attınız.`);
  afterMove();
}

function humanFinish(id) {
  if (!round || round.phase !== 'discard' || round.turn !== 0) return;
  const res = E.finish(round, 0, id);
  if (!res) {
    say('Bu taşla bitmiyor: kalan 14 taşın hepsi perde olmalı (ya da yedi çift). Önce "Seri diz" ile deneyin.');
    return;
  }
  selected = null;
  endRound();
}

function afterMove() {
  render();
  if (round.phase === 'over') { endRound(); return; }
  scheduleAi();
}

function scheduleAi() {
  clearTimeout(aiTimer);
  if (!round || round.phase === 'over' || round.turn === 0) return;
  aiTimer = setTimeout(() => {
    if (!round || round.phase === 'over' || round.turn === 0) return;
    const p = round.turn;
    const ev = E.aiPlay(round, p, rng);
    if (ev.finished) {
      say(`${SEAT_NAMES[p]} eli bitirdi.`);
    } else {
      const from = ev.source === 'side' ? 'yandan' : ev.source === 'pile' ? 'ortadan' : null;
      say(from ? `${SEAT_NAMES[p]} ${from} taş çekti ve ${E.tileName(ev.discarded)} attı.` : `${SEAT_NAMES[p]} açtı ve ${E.tileName(ev.discarded)} attı.`);
    }
    if (round.phase === 'over') { render(); endRound(); return; }
    render();
    scheduleAi();
  }, DELAY);
}

function endRound() {
  clearTimeout(aiTimer);
  render();
  const r = round.result;
  store.played += 1;
  let title;
  let text;
  if (r.winner === null) {
    store.draws += 1;
    title = 'Berabere';
    text = 'Ortadaki taşlar bitti, kimse eli bitiremedi. Puan değişmedi.';
  } else {
    r.deltas.forEach((d, i) => { totals[i] += d; });
    store.points += r.deltas[0];
    if (r.winner === 0) {
      store.won += 1;
      if (r.kind === 'cifte') store.cifte += 1;
      if (r.okeyFinish) store.okeyFinish += 1;
    }
    title = r.winner === 0 ? 'Eli siz bitirdiniz!' : `${SEAT_NAMES[r.winner]} eli bitirdi`;
    const kinds = [r.kind === 'cifte' ? 'çifte bitme (×2)' : 'normal bitme', r.okeyFinish ? 'okey atarak bitme (×2)' : null].filter(Boolean).join(', ');
    text = `${kinds}. Puan: siz ${r.deltas[0] > 0 ? '+' : ''}${r.deltas[0]}, diğerleri ${r.deltas[r.winner === 0 ? 1 : 0] > 0 ? '+' : ''}${r.deltas[r.winner === 0 ? 1 : 0]}.`;
  }
  saveStore();
  renderStats();
  elResultTitle.textContent = title;
  elResultText.textContent = text;
  elResult.hidden = false;
  elStatus.textContent = 'El bitti.';
  elStatus.classList.add('is-over');
  btnNext.focus();
}

function startRound() {
  clearTimeout(aiTimer);
  elResult.hidden = true;
  rng = makeRng();
  round = E.newRound({ rng, starter: handNo % 4 });
  layout = new Array(E.SLOTS).fill(null);
  selected = null;
  groupCache.clear();
  round.hands[0].forEach((id, i) => { layout[i] = id; });
  say(round.starter === 0 ? 'Yeni el: ilk atış sizde (15 taş).' : `Yeni el: ${SEAT_NAMES[round.starter]} başlıyor.`);
  render();
  scheduleAi();
}

function newGame() {
  handNo = 0;
  totals.fill(0);
  renderStats();
  startRound();
}

// ---------------------------------------------------------------------------
// Etkileşim: seçme, klavye, sürükleme
// ---------------------------------------------------------------------------
const slotOf = (id) => layout.indexOf(id);

elRack.addEventListener('click', (e) => {
  if (suppressClick) return;
  const tile = e.target.closest('.ok-tile');
  const slotEl = e.target.closest('.ok-slot');
  if (tile) {
    const id = Number(tile.dataset.id);
    selected = selected === id ? null : id;
    render(id);
  } else if (slotEl && selected !== null) {
    const to = Number(slotEl.dataset.slot);
    moveTile(slotOf(selected), to);
    render(selected);
  }
});

elRack.addEventListener('dblclick', (e) => {
  const tile = e.target.closest('.ok-tile');
  if (tile && round.phase === 'discard' && round.turn === 0) humanDiscard(Number(tile.dataset.id));
});

elRack.addEventListener('keydown', (e) => {
  const tile = e.target.closest && e.target.closest('.ok-tile');
  if (!tile) return;
  const id = Number(tile.dataset.id);
  const i = slotOf(id);
  const d = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -E.ROW, ArrowDown: E.ROW }[e.key];
  if (d !== undefined) {
    e.preventDefault();
    if (selected === id) { // seçili taşı yürüt
      const to = i + d;
      if (to >= 0 && to < E.SLOTS) { moveTile(i, to); render(id); }
    } else { // odağı en yakın taşa taşı
      let k = i + d;
      while (k >= 0 && k < E.SLOTS && layout[k] === null) k += d;
      if (k >= 0 && k < E.SLOTS) { const t = elRack.querySelector(`.ok-tile[data-id="${layout[k]}"]`); if (t) t.focus(); }
    }
  } else if (e.key === 'Escape') { selected = null; render(id); }
  else if (e.key === 'Delete' || e.key === 'd' || e.key === 'D') { humanDiscard(id); }
});

// Sürükle-bırak (fare ve dokunma)
let drag = null;
elRack.addEventListener('pointerdown', (e) => {
  const tile = e.target.closest('.ok-tile');
  if (!tile || e.button > 0) return;
  drag = { id: Number(tile.dataset.id), x: e.clientX, y: e.clientY, active: false, ghost: null, tile, pid: e.pointerId };
});
document.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.pid) return;
  if (!drag.active) {
    if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 7) return;
    drag.active = true;
    const g = drag.tile.cloneNode(true);
    g.classList.add('ok-ghost');
    g.removeAttribute('aria-label');
    document.body.appendChild(g);
    drag.ghost = g;
    drag.tile.classList.add('dragging');
  }
  const g = drag.ghost;
  g.style.transform = `translate(${e.clientX - g.offsetWidth / 2}px, ${e.clientY - g.offsetHeight / 2}px)`;
});
function endDrag(e, cancel) {
  if (!drag || e.pointerId !== drag.pid) return;
  const d = drag;
  drag = null;
  if (!d.active) return;
  d.ghost.remove();
  d.tile.classList.remove('dragging');
  suppressClick = true;
  setTimeout(() => { suppressClick = false; }, 0);
  if (cancel) return;
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const slotEl = el && el.closest('.ok-slot');
  const dropDisc = el && el.closest('[data-drop="discard"]');
  if (slotEl) {
    moveTile(slotOf(d.id), Number(slotEl.dataset.slot));
    render(d.id);
  } else if (dropDisc) {
    if (round.phase === 'discard' && round.turn === 0) humanDiscard(d.id);
    else say('Önce bir taş çekmelisiniz.');
  }
}
document.addEventListener('pointerup', (e) => endDrag(e, false));
document.addEventListener('pointercancel', (e) => endDrag(e, true));

// Düğmeler
elPile.addEventListener('click', () => humanDraw('pile'));
btnDiscard.addEventListener('click', () => { if (selected !== null) humanDiscard(selected); });
btnFinish.addEventListener('click', () => { if (selected !== null) humanFinish(selected); });
$('ok-series').addEventListener('click', () => {
  layout = E.autoSeries(round.hands[0], round.okey);
  render(selected);
  say('Taşlar seri olarak dizildi: perler yan yana, kalanlar sonda.');
});
$('ok-pairs').addEventListener('click', () => {
  layout = E.autoPairs(round.hands[0], round.okey);
  render(selected);
  say('Taşlar çift olarak dizildi: aynı taşlar yan yana.');
});
btnNext.addEventListener('click', () => { handNo += 1; startRound(); });
$('ok-new').addEventListener('click', newGame);
$('ok-stats-reset').addEventListener('click', () => {
  Object.assign(store, defaultStore());
  saveStore();
  renderStats();
});
$('ok-full').addEventListener('click', () => {
  if (document.fullscreenElement) { document.exitFullscreen?.(); return; }
  if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
});

renderStats();
newGame();

// Test kancası: yalnızca durum okuma; ağa çıkmaz
window.__okeyTest = {
  state: () => JSON.parse(JSON.stringify({ phase: round.phase, turn: round.turn, hands: round.hands, pile: round.pile.length, okey: round.okey, indicator: round.indicator, layout, result: round.result, starter: round.starter })),
  engine: E,
};
