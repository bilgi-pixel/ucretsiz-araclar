// İhaleli batak arayüzü — Bilişim Ajans. Tamamen istemci tarafı; dış istek, çerez, ses yoktur.
// Kalıcı veri: yalnızca bu cihazda localStorage 'ba-oyun-batak' (oynanan/kazanılan oyun, en iyi skor, ayarlar).
import * as E from './engine.js';

const STORE_KEY = 'ba-oyun-batak';
const VS = '︎'; // metin biçimi (emoji değil) için değişken seçici

// ---------------------------------------------------------------------------
// Depolama: bozuk veri varsayılana döner
// ---------------------------------------------------------------------------
const defaultStore = () => ({ played: 0, won: 0, bestScore: 0, target: 0, hints: true });

function loadStore() {
  const d = defaultStore();
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { raw = null; }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return d;
  const cnt = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), 1e9) : 0);
  const won = cnt(raw.won);
  return {
    played: Math.max(cnt(raw.played), won),
    won,
    bestScore: cnt(raw.bestScore),
    target: [0, 30, 50].includes(raw.target) ? raw.target : 0,
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
const box = $('bt-box');
const elStatus = $('bt-status');
const elLast = $('bt-last');
const elHand = $('bt-hand');
const elPanel = $('bt-panel');
const elResult = $('bt-result');
const elResultTitle = $('bt-result-title');
const elResultText = $('bt-result-text');
const btnNext = $('bt-next');
const selTarget = $('bt-target');
const chkHints = $('bt-hints');
const elStats = $('bt-stats');
const elRound = $('bt-round');
const elTrumpInfo = $('bt-trump-info');

const NAMES = ['Siz', 'Sol', 'Karşı', 'Sağ'];
const params = new URLSearchParams(location.search);
const seedParam = params.get('seed');
const FAST = params.get('hiz') === '1';
const DELAY = FAST ? 25 : 750;
const TRICK_DELAY = FAST ? 40 : 1300;

let rngSeed = seedParam !== null && /^\d+$/.test(seedParam) ? Number(seedParam) : null;
const makeRng = () => (rngSeed !== null ? E.mulberry32(rngSeed++) : Math.random);

let st = null;
let rng = Math.random;
let timer = 0;
let busy = false; // el sonu bekleme / sonuç penceresi
let showLast = null; // tamamlanan el kısa süre masada görünür

// ---------------------------------------------------------------------------
// Kart çizimi (HTML/CSS)
// ---------------------------------------------------------------------------
function cardEl(id, { down = false, button = false } = {}) {
  const el = document.createElement(button ? 'button' : 'div');
  if (button) el.type = 'button';
  el.className = 'bt-card';
  if (down) {
    el.classList.add('down');
    el.setAttribute('aria-hidden', 'true');
    return el;
  }
  const s = E.suitOf(id);
  const r = E.rankOf(id);
  if (s === 1 || s === 2) el.classList.add('red');
  const label = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][r];
  el.dataset.id = String(id);
  el.setAttribute('aria-label', E.cardName(id));
  el.innerHTML = `<span class="c" aria-hidden="true">${label}</span><span class="s" aria-hidden="true">${E.SUITS[s]}${VS}</span><span class="m" aria-hidden="true">${E.SUITS[s]}${VS}</span>`;
  return el;
}

const suitText = (s) => `${E.SUITS[s]}${VS} ${E.SUIT_NAMES[s]}`;

function seatInfo(p) {
  const parts = [];
  if (st.bids[p] === 0) parts.push('pas');
  else if (st.bids[p] > 0) parts.push(`ihale ${st.bids[p]}`);
  if (st.phase === 'play' || st.phase === 'roundover' || st.phase === 'over') parts.push(`aldığı el ${st.tricks[p]}`);
  return parts.join(' · ');
}

function render() {
  if (!st) return;
  box.dataset.phase = st.phase;
  box.dataset.turn = String(st.turn);
  elRound.textContent = `El ${Math.min(st.roundNo, E.MAX_ROUNDS)} / ${E.MAX_ROUNDS}`;
  elTrumpInfo.textContent = st.trump >= 0 ? `Koz: ${suitText(st.trump)} · İhale: ${st.highBid} (${NAMES[st.bidder]})` : 'Koz henüz seçilmedi';
  for (let p = 0; p < 4; p++) {
    $(`bt-score-${p}`).textContent = String(st.scores[p]);
    if (p === 0) { $('bt-info-0').textContent = seatInfo(0); continue; }
    const back = $(`bt-back-${p}`);
    back.textContent = '';
    if (st.hands[p].length) {
      back.appendChild(cardEl(0, { down: true }));
      const n = document.createElement('span');
      n.className = 'bt-count';
      n.textContent = `×${st.hands[p].length}`;
      back.appendChild(n);
    }
    back.setAttribute('role', 'img');
    back.setAttribute('aria-label', `${NAMES[p]} oyuncunun elinde ${st.hands[p].length} kart var`);
    $(`bt-info-${p}`).textContent = seatInfo(p);
    $(`bt-seat-${p}`).classList.toggle('is-turn', st.turn === p && (st.phase === 'play' || st.phase === 'bid' || st.phase === 'trump') && !busy);
    $(`bt-seat-${p}`).classList.toggle('is-bidder', st.bidder === p && st.phase !== 'bid');
  }
  $('bt-seat-0').classList.toggle('is-bidder', st.bidder === 0 && st.phase !== 'bid');

  // Masadaki el (ya da az önce biten el)
  const cards = showLast ? showLast.cards : st.trick;
  for (let p = 0; p < 4; p++) {
    const slot = $(`bt-slot-${p}`);
    slot.textContent = '';
    slot.classList.remove('is-winner');
    const t = cards.find((x) => x.p === p);
    if (t) {
      slot.appendChild(cardEl(t.card));
      if (showLast && showLast.winner === p) slot.classList.add('is-winner');
    }
  }
  const slotsLabel = cards.length ? `Masadaki kartlar: ${cards.map((t) => `${NAMES[t.p]} ${E.cardName(t.card)}`).join(', ')}` : 'Masada kart yok';
  $('bt-trick').setAttribute('aria-label', slotsLabel);

  // Benim elim
  elHand.textContent = '';
  const myTurn = st.phase === 'play' && st.turn === 0 && !busy && !showLast;
  const legal = myTurn ? new Set(E.legalCards(st, 0)) : new Set();
  for (const id of st.hands[0]) {
    const c = cardEl(id, { button: true });
    const ok = legal.has(id);
    c.disabled = !ok;
    if (ok && store.hints) c.classList.add('can');
    if (!ok && myTurn) c.classList.add('no');
    c.addEventListener('click', () => onHumanPlay(id));
    elHand.appendChild(c);
  }
  renderPanel();
  renderStatus();
}

function renderStatus() {
  let msg = '';
  if (st.phase === 'bid') {
    msg = st.bidTurn === 0
      ? `İhale sırası sizde. ${st.highBid ? `Şu anki en yüksek ihale: ${st.highBid} (${NAMES[st.bidder]}).` : 'Henüz ihale verilmedi.'} En az ${E.MIN_BID} el isteyebilir ya da pas geçebilirsiniz.`
      : `İhale: ${NAMES[st.bidTurn]} düşünüyor…`;
  } else if (st.phase === 'trump') {
    msg = st.bidder === 0
      ? `İhaleyi aldınız (${st.highBid} el${st.forced ? ', herkes pas geçtiği için zorunlu' : ''}). Kozu seçin.`
      : `${NAMES[st.bidder]} ihaleyi ${st.highBid} ile aldı${st.forced ? ' (herkes pas geçti, zorunlu)' : ''}. Koz seçiyor…`;
  } else if (st.phase === 'play') {
    if (showLast) msg = `Eli ${NAMES[showLast.winner]} aldı.`;
    else if (st.turn === 0) {
      const lead = st.trick.length ? E.SUIT_NAMES[E.suitOf(st.trick[0].card)] : '';
      const l = E.legalCards(st, 0);
      msg = st.trick.length
        ? `Sıra sizde. ${lead} açıldı; ${l.length === st.hands[0].length ? 'istediğiniz kartı atabilirsiniz.' : 'atabileceğiniz kartlar işaretli (renge uyma, kesme, büyük atma zorunlu).'}`
        : 'Sıra sizde: eli siz açıyorsunuz, istediğiniz kartı atın.';
    } else msg = `Sıra: ${NAMES[st.turn]}…`;
  } else if (st.phase === 'roundover') msg = 'El bitti.';
  else if (st.phase === 'over') msg = 'Oyun bitti.';
  elStatus.textContent = msg;
  elStatus.classList.toggle('is-over', st.phase === 'over');
}

function renderPanel() {
  elPanel.textContent = '';
  elPanel.hidden = true;
  if (busy) return;
  if (st.phase === 'bid' && st.bidTurn === 0) {
    elPanel.hidden = false;
    const h = document.createElement('p');
    h.className = 'bt-panel-h';
    h.textContent = 'İhaleniz:';
    elPanel.appendChild(h);
    const row = document.createElement('div');
    row.className = 'bt-bids';
    const pass = document.createElement('button');
    pass.type = 'button';
    pass.className = 'ba-btn bt-bid';
    pass.dataset.bid = '0';
    pass.textContent = 'Pas';
    pass.addEventListener('click', () => onHumanBid(0));
    row.appendChild(pass);
    for (const b of E.legalBids(st)) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ba-btn bt-bid';
      btn.dataset.bid = String(b);
      btn.textContent = String(b);
      btn.setAttribute('aria-label', `${b} el iste`);
      btn.addEventListener('click', () => onHumanBid(b));
      row.appendChild(btn);
    }
    elPanel.appendChild(row);
  } else if (st.phase === 'trump' && st.bidder === 0) {
    elPanel.hidden = false;
    const h = document.createElement('p');
    h.className = 'bt-panel-h';
    h.textContent = 'Kozu seçin:';
    elPanel.appendChild(h);
    const row = document.createElement('div');
    row.className = 'bt-bids';
    for (let s = 0; s < 4; s++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ba-btn bt-trump' + (s === 1 || s === 2 ? ' red' : '');
      btn.dataset.suit = String(s);
      btn.textContent = suitText(s);
      btn.addEventListener('click', () => { E.chooseTrump(st, s); step(); });
      row.appendChild(btn);
    }
    elPanel.appendChild(row);
  }
}

function renderStats() {
  elStats.textContent = `Oynanan oyun: ${store.played} · Kazanılan: ${store.won} · En yüksek skor: ${store.bestScore}`;
}

// ---------------------------------------------------------------------------
// Akış
// ---------------------------------------------------------------------------
function later(fn, ms) {
  clearTimeout(timer);
  timer = setTimeout(fn, ms);
}

function step() {
  clearTimeout(timer);
  render();
  if (busy) return;
  if (st.phase === 'bid') {
    if (st.bidTurn === 0) return;
    later(() => {
      const p = st.bidTurn;
      const amount = E.aiBid(st, p);
      E.bid(st, p, amount);
      elLast.textContent = amount ? `${NAMES[p]}: ${amount} el istedi.` : `${NAMES[p]}: pas.`;
      step();
    }, DELAY);
  } else if (st.phase === 'trump') {
    if (st.bidder === 0) return;
    later(() => {
      const s = E.aiTrump(st, st.bidder);
      E.chooseTrump(st, s);
      elLast.textContent = `${NAMES[st.bidder]} kozu ${E.SUIT_NAMES[s]} seçti.`;
      step();
    }, DELAY);
  } else if (st.phase === 'play') {
    if (st.turn === 0) return;
    later(() => {
      const p = st.turn;
      const card = E.aiPlay(st, p);
      const ev = E.playCard(st, p, card);
      elLast.textContent = `${NAMES[p]}: ${E.cardName(card)}`;
      afterPlay(ev);
    }, DELAY);
  } else if (st.phase === 'roundover' || st.phase === 'over') {
    showResult();
  }
}

function afterPlay(ev) {
  if (!ev.ok) { step(); return; }
  if (!ev.trickDone) { step(); return; }
  showLast = st.lastTrick;
  busy = true;
  render();
  later(() => {
    showLast = null;
    busy = false;
    if (ev.roundDone) { showResult(); return; }
    step();
  }, TRICK_DELAY);
}

function onHumanBid(amount) {
  if (!st || st.phase !== 'bid' || st.bidTurn !== 0) return;
  const r = E.bid(st, 0, amount);
  if (!r.ok) return;
  elLast.textContent = amount ? `Siz: ${amount} el istediniz.` : 'Siz: pas.';
  step();
}

function onHumanPlay(id) {
  if (!st || st.phase !== 'play' || st.turn !== 0 || busy || showLast) return;
  const ev = E.playCard(st, 0, id);
  if (!ev.ok) return;
  elLast.textContent = `Siz: ${E.cardName(id)}`;
  afterPlay(ev);
}

function showResult() {
  busy = true;
  render();
  const r = st.result;
  const lines = [];
  lines.push(`İhale: ${NAMES[r.bidder]} · ${r.bid} el · koz ${E.SUIT_NAMES[st.trump]} — ${r.made ? 'tuttu' : 'batırdı'}`);
  for (let p = 0; p < 4; p++) {
    const d = r.delta[p];
    lines.push(`${NAMES[p]}: ${st.tricks[p]} el → ${d > 0 ? '+' : ''}${d} puan (toplam ${st.scores[p]})`);
  }
  if (st.phase === 'over') {
    const w = st.winner;
    elResultTitle.textContent = w === 0 ? 'Oyunu siz kazandınız' : `Oyun bitti: ${NAMES[w]} kazandı`;
    lines.push(`Sıralama: ${st.scores.map((s, p) => ({ s, p })).sort((a, b) => b.s - a.s).map((x) => `${NAMES[x.p]} ${x.s}`).join(' · ')}`);
    btnNext.textContent = 'Yeni oyun';
    store.played += 1;
    if (w === 0) store.won += 1;
    if (st.scores[0] > store.bestScore) store.bestScore = st.scores[0];
    saveStore();
    renderStats();
  } else {
    elResultTitle.textContent = `${st.roundNo}. el bitti`;
    btnNext.textContent = 'Sonraki el';
  }
  elResultText.textContent = '';
  for (const l of lines) {
    const s = document.createElement('span');
    s.textContent = l;
    elResultText.appendChild(s);
  }
  elResult.hidden = false;
  btnNext.focus({ preventScroll: true });
}

function nextHand() {
  elResult.hidden = true;
  busy = false;
  if (st.phase === 'over') { newGame(); return; }
  E.nextRound(st, rng);
  elLast.textContent = '';
  step();
}

function newGame() {
  clearTimeout(timer);
  rng = makeRng();
  st = E.newGame({ rng, target: store.target });
  busy = false;
  showLast = null;
  elResult.hidden = true;
  elLast.textContent = '';
  step();
}

// ---------------------------------------------------------------------------
// Ayarlar ve düğmeler
// ---------------------------------------------------------------------------
selTarget.value = String(store.target);
chkHints.checked = store.hints;
selTarget.addEventListener('change', () => { const v = Number(selTarget.value); store.target = [30, 50].includes(v) ? v : 0; saveStore(); newGame(); });
chkHints.addEventListener('change', () => { store.hints = chkHints.checked; saveStore(); render(); });
btnNext.addEventListener('click', nextHand);
$('bt-new').addEventListener('click', newGame);
$('bt-stats-reset').addEventListener('click', () => {
  const keep = { target: store.target, hints: store.hints };
  Object.assign(store, defaultStore(), keep);
  saveStore();
  renderStats();
});
$('bt-full').addEventListener('click', () => {
  if (document.fullscreenElement) { document.exitFullscreen?.(); return; }
  if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
});

renderStats();
newGame();
