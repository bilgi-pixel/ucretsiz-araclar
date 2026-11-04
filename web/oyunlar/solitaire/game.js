// Solitaire (Klondike) — Bilişim Ajans.
// Tamamen istemci tarafı: kartlar HTML/CSS ile çizilir, dış görsel/istek/çerez yoktur.
// Kalıcı veri: yalnızca bu cihazdaki localStorage (oynanan, kazanılan, en iyi süre, en az hamle, ayarlar).
//
// Kart numarası: id = takım * 13 + (değer - 1); takım 0 ♠, 1 ♥, 2 ♦, 3 ♣; değer 1 (As) … 13 (Papaz).
// Konum gösterimi: { pile: 't'|'w'|'f'|'s', n: yığın no, idx: yığındaki kart sırası }
//   t = tableau sütunu (0-6), w = atık, f = temel (takım numarası), s = stok (çekme destesi).

const STORE_KEY = 'ba-oyun-solitaire';
const TXT = '︎'; // takım simgesinin emoji değil düz yazı olarak çizilmesi için

const SUITS = [
  { sym: '♠', name: 'Maça', red: false },
  { sym: '♥', name: 'Kupa', red: true },
  { sym: '♦', name: 'Karo', red: true },
  { sym: '♣', name: 'Sinek', red: false },
];
const RANK_LABEL = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RANK_NAME = ['', 'As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Vale', 'Kız', 'Papaz'];

// Düzen ölçüleri, kart genişliğinin yüzdesi (cqw) olarak: yığın kıvrımları
const CARD_H = 140;   // kart yüksekliği (genişlik 100)
const DOWN_OFF = 14;  // kapalı kartlar arası dikey boşluk
const UP_OFF = 30;    // açık kartlar arası dikey boşluk
const FAN_OFF = 24;   // 3 kart çekmede atık yelpazesi

export const suitOf = (id) => Math.floor(id / 13);
export const rankOf = (id) => (id % 13) + 1;
export const isRed = (id) => SUITS[suitOf(id)].red;
const cardName = (id) => SUITS[suitOf(id)].name + ' ' + RANK_NAME[rankOf(id)];
const cardShort = (id) => RANK_LABEL[rankOf(id)] + SUITS[suitOf(id)].sym + TXT;

// ---------------------------------------------------------------------------
// Tohumlu rastgele sayı (mulberry32) ve deste karıştırma
// ---------------------------------------------------------------------------

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Aynı tohum her zaman aynı desteyi verir (Fisher–Yates). */
export function deckForSeed(seed) {
  const rng = mulberry32(seed);
  const deck = Array.from({ length: 52 }, (_, i) => i);
  for (let i = 51; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ---------------------------------------------------------------------------
// Depolama: bozuk ya da beklenmeyen veri varsayılanlara döner, hata fırlatmaz
// ---------------------------------------------------------------------------

const defaultStore = () => ({ played: 0, won: 0, bestTime: null, bestMoves: null, draw: 1, kingOnly: true });

function loadStore() {
  const d = defaultStore();
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { raw = null; }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return d;
  const cnt = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), 1e9) : 0);
  const best = (v) => (typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.min(Math.floor(v), 1e9) : null);
  const won = cnt(raw.won);
  return {
    played: Math.max(cnt(raw.played), won),
    won,
    bestTime: best(raw.bestTime),
    bestMoves: best(raw.bestMoves),
    draw: raw.draw === 3 ? 3 : 1,
    kingOnly: raw.kingOnly !== false,
  };
}

function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* özel gezinti vb. */ }
}

const store = loadStore();

// ---------------------------------------------------------------------------
// DOM başvuruları
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);
const box = $('oyun-kutusu');
const board = $('sl-board');
const elStatus = $('sl-status');
const elMoves = $('sl-moves');
const elScore = $('sl-score');
const elTime = $('sl-time');
const elSeed = $('sl-seed');
const elResult = $('sl-result');
const btnUndo = $('sl-undo');
const btnHint = $('sl-hint');
const btnAuto = $('sl-auto');
const selDraw = $('sl-draw');
const selEmpty = $('sl-empty');

const pileEls = {
  s: $('sl-stock'),
  w: $('sl-waste'),
  f: [0, 1, 2, 3].map((i) => $('sl-f' + i)),
  t: [0, 1, 2, 3, 4, 5, 6].map((i) => $('sl-t' + i)),
};
const pileEl = (pile, n) => (pile === 's' || pile === 'w' ? pileEls[pile] : pileEls[pile][n]);

const reduceMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// ---------------------------------------------------------------------------
// Oyun durumu
// ---------------------------------------------------------------------------

let S = null;            // geçerli oyun
let history = [];        // geri alma anlık görüntüleri (sınırsız)
let sel = null;          // { from, ids }
let autoRunning = false;
let autoGen = 0;         // otomatik tamamlama zamanlayıcılarını yeni oyunda iptal eder
let pendingFocus = null; // render sonrası odaklanılacak yığın
let hintTimer = 0;
let hintCursor = 0;
let hintSig = '';
let fxTimer = 0;

function say(text) { elStatus.textContent = text; }

function snap() {
  return {
    stock: S.stock.slice(),
    waste: S.waste.slice(),
    found: S.found.map((f) => f.slice()),
    tab: S.tab.map((c) => c.map((x) => ({ id: x.id, up: x.up }))),
    fan: S.fan, moves: S.moves, score: S.score,
  };
}

function restore(s) {
  S.stock = s.stock; S.waste = s.waste; S.found = s.found; S.tab = s.tab;
  S.fan = s.fan; S.moves = s.moves; S.score = s.score;
}

/** Yeni dağıtım: aynı tohum aynı sırayı verir. */
function dealGame(seed, opts = {}) {
  const deck = deckForSeed(seed);
  const tab = [];
  let p = 0;
  for (let c = 0; c < 7; c++) {
    const col = [];
    for (let k = 0; k <= c; k++) col.push({ id: deck[p++], up: k === c });
    tab.push(col);
  }
  S = {
    seed,
    draw: opts.draw === 3 ? 3 : (opts.draw === 1 ? 1 : store.draw),
    kingOnly: typeof opts.kingOnly === 'boolean' ? opts.kingOnly : store.kingOnly,
    stock: deck.slice(p), // son eleman destenin üstü
    waste: [],
    found: [[], [], [], []],
    tab,
    fan: 0, moves: 0, score: 0, elapsed: 0, counted: false, won: false,
  };
  resetUi();
}

function resetUi() {
  history = [];
  sel = null;
  autoRunning = false;
  autoGen++;
  hintCursor = 0;
  hintSig = '';
  clearTimeout(hintTimer);
  stopFx();
  elResult.classList.remove('is-active');
  selDraw.value = String(S.draw);
  selEmpty.value = S.kingOnly ? 'king' : 'any';
  render();
}

const newSeed = () => 1 + Math.floor(Math.random() * 999999);

// ---------------------------------------------------------------------------
// Kurallar
// ---------------------------------------------------------------------------

/** Konumdaki taşınabilir kartların numaraları (yoksa null). */
function getCards(from) {
  if (from.pile === 't') {
    const col = S.tab[from.n];
    if (!col || from.idx < 0 || from.idx >= col.length || !col[from.idx].up) return null;
    return col.slice(from.idx).map((c) => c.id);
  }
  if (from.pile === 'w') return S.waste.length ? [S.waste[S.waste.length - 1]] : null;
  if (from.pile === 'f') {
    const f = S.found[from.n];
    return f && f.length ? [f[f.length - 1]] : null;
  }
  return null;
}

const canGoFoundation = (id) => rankOf(id) === S.found[suitOf(id)].length + 1;

/** Hamle geçerli mi? Geçersizse Türkçe gerekçe döner. */
function canMove(from, dest) {
  const cards = getCards(from);
  if (!cards) return { ok: false, reason: 'Taşınacak kart yok.' };
  const first = cards[0];
  if (dest.pile === 'f') {
    if (from.pile === 'f') return { ok: false, reason: 'Kart zaten temelde.' };
    if (cards.length !== 1) return { ok: false, reason: 'Temele her seferinde yalnızca bir kart konabilir.' };
    if (!canGoFoundation(first)) {
      return { ok: false, reason: 'Temele aynı takımdan kartlar As\'tan başlayarak sırayla konur.' };
    }
    return { ok: true, suit: suitOf(first) };
  }
  if (dest.pile !== 't') return { ok: false, reason: 'Kartlar yalnızca sütunlara ve temellere bırakılabilir.' };
  if (from.pile === 't' && from.n === dest.n) return { ok: false, reason: 'Kart zaten bu sütunda.' };
  const col = S.tab[dest.n];
  if (!col.length) {
    if (S.kingOnly && rankOf(first) !== 13) return { ok: false, reason: 'Boş sütuna yalnızca Papaz konabilir.' };
    return { ok: true };
  }
  const top = col[col.length - 1];
  if (rankOf(top.id) !== rankOf(first) + 1 || isRed(top.id) === isRed(first)) {
    return { ok: false, reason: 'Kart, kendinden bir büyük ve zıt renkli kartın üzerine konabilir.' };
  }
  return { ok: true };
}

/** İlk hamlede "oynanan" sayısını artırır ve süreyi başlatır. */
function markStarted() {
  if (S.counted) return;
  S.counted = true;
  store.played++;
  saveStore();
  renderRecord();
}

/** Hamleyi uygular (geçerliliği çağıran denetler). Döndürür: { flipped, delta } */
function applyMove(from, dest) {
  history.push(snap());
  const cards = getCards(from);
  let delta = 0;
  let flipped = null;
  if (from.pile === 't') S.tab[from.n].splice(from.idx);
  else if (from.pile === 'w') {
    S.waste.pop();
    S.fan = S.waste.length ? Math.max(1, S.fan - 1) : 0;
  } else S.found[from.n].pop();

  if (dest.pile === 'f') {
    S.found[suitOf(cards[0])].push(cards[0]);
    delta += 10;
  } else {
    cards.forEach((id) => S.tab[dest.n].push({ id, up: true }));
    if (from.pile === 'w') delta += 5;
    if (from.pile === 'f') delta -= 15;
  }
  if (from.pile === 't') {
    const col = S.tab[from.n];
    const top = col[col.length - 1];
    if (top && !top.up) { top.up = true; delta += 5; flipped = top.id; }
  }
  S.score = Math.max(0, S.score + delta);
  S.moves++;
  markStarted();
  if (S.found.every((f) => f.length === 13)) onWin();
  return { flipped, delta };
}

/** Stoktan çek; stok boşsa atığı ters çevirip yeniden stok yap. */
function doDraw() {
  if (S.won || autoRunning) return;
  if (!S.stock.length && !S.waste.length) { say('Deste ve atık boş; çekilecek kart yok.'); return; }
  history.push(snap());
  if (S.stock.length) {
    const n = Math.min(S.draw, S.stock.length);
    for (let i = 0; i < n; i++) S.waste.push(S.stock.pop());
    S.fan = n;
    say(n + ' kart çekildi. Atığın üstünde: ' + cardName(S.waste[S.waste.length - 1]) + '.');
  } else {
    S.stock = S.waste.slice().reverse();
    S.waste = [];
    S.fan = 0;
    say('Atık yeniden desteye çevrildi (' + S.stock.length + ' kart).');
  }
  S.moves++;
  markStarted();
  clearSel(true);
  pendingFocus = { pile: 's', n: 0 };
  render();
}

function undo() {
  if (S.won || autoRunning || !history.length) return;
  restore(history.pop());
  clearSel(true);
  hintCursor = 0;
  render();
  say('Son hamle geri alındı.');
}

// ---------------------------------------------------------------------------
// İpucu
// ---------------------------------------------------------------------------

/** Geçerli hamlelerin öncelik sırasına göre listesi. */
function findHints() {
  const found = [];
  const reveal = [];
  const wasteTab = [];
  const other = [];
  const wTop = S.waste.length ? S.waste[S.waste.length - 1] : null;

  if (wTop !== null && canGoFoundation(wTop)) {
    found.push({ from: { pile: 'w', n: 0, idx: S.waste.length - 1 }, dest: { pile: 'f', n: suitOf(wTop) },
      text: cardName(wTop) + ' kartını temele gönderin.' });
  }
  S.tab.forEach((col, c) => {
    if (!col.length) return;
    const top = col[col.length - 1];
    if (top.up && canGoFoundation(top.id)) {
      found.push({ from: { pile: 't', n: c, idx: col.length - 1 }, dest: { pile: 'f', n: suitOf(top.id) },
        text: cardName(top.id) + ' kartını temele gönderin.' });
    }
  });

  S.tab.forEach((col, c) => {
    col.forEach((card, idx) => {
      if (!card.up) return;
      for (let d = 0; d < 7; d++) {
        if (d === c) continue;
        const from = { pile: 't', n: c, idx };
        const dest = { pile: 't', n: d };
        if (!canMove(from, dest).ok) continue;
        const below = idx > 0 ? col[idx - 1] : null;
        if (idx === 0 && !S.tab[d].length) continue; // boş sütundan boş sütuna taşımak anlamsız
        const text = cardName(card.id) + (S.tab[d].length ? ' kartını ' + cardName(S.tab[d][S.tab[d].length - 1].id) + ' üzerine taşıyın.' : ' kartını boş sütuna taşıyın.');
        if (below && !below.up) reveal.push({ from, dest, text: text.replace(/\.$/, '') + '; kapalı bir kart açılır.' });
        else if (idx === 0) other.push({ from, dest, text: text.replace(/\.$/, '') + '; sütun boşalır.' });
        else if (below && below.up && canGoFoundation(below.id)) other.push({ from, dest, text });
      }
    });
  });

  if (wTop !== null) {
    for (let d = 0; d < 7; d++) {
      const from = { pile: 'w', n: 0, idx: S.waste.length - 1 };
      const dest = { pile: 't', n: d };
      if (canMove(from, dest).ok) {
        wasteTab.push({ from, dest, text: cardName(wTop) + (S.tab[d].length ? ' kartını ' + cardName(S.tab[d][S.tab[d].length - 1].id) + ' üzerine taşıyın.' : ' kartını boş sütuna taşıyın.') });
      }
    }
  }

  const list = [...found, ...reveal, ...wasteTab, ...other];
  if (S.stock.length) list.push({ from: { pile: 's', n: 0, idx: -1 }, dest: null, text: 'Desteden kart çekin.' });
  else if (S.waste.length) list.push({ from: { pile: 's', n: 0, idx: -1 }, dest: null, text: 'Atığı yeniden desteye çevirmek için desteye dokunun.' });
  return list;
}

function lastEl(pile, n) {
  const all = pileEl(pile, n).querySelectorAll('.sl-card, .sl-slot');
  return all[all.length - 1] || null;
}

function srcEl(from) {
  if (from.pile === 's') return pileEls.s.querySelector('button');
  if (from.pile === 'w') return lastEl('w', 0);
  return pileEl(from.pile, from.n).querySelector('.sl-card[data-idx="' + from.idx + '"]');
}

function clearHintMarks() {
  clearTimeout(hintTimer);
  board.querySelectorAll('.is-hint').forEach((el) => el.classList.remove('is-hint'));
}

function showHint() {
  if (S.won || autoRunning) return;
  const list = findHints();
  if (!list.length) { say('Oynanabilir hamle bulunamadı. Geri alıp farklı bir yol deneyebilir ya da yeniden dağıtabilirsiniz.'); return; }
  const sig = S.moves + '|' + history.length + '|' + S.stock.length;
  hintCursor = sig === hintSig ? (hintCursor + 1) % list.length : 0;
  hintSig = sig;
  const h = list[hintCursor];
  clearSel(true);
  clearHintMarks();
  const a = srcEl(h.from);
  if (a) a.classList.add('is-hint');
  if (h.dest) {
    const b = lastEl(h.dest.pile, h.dest.n);
    if (b) b.classList.add('is-hint');
  }
  say('İpucu: ' + h.text);
  hintTimer = setTimeout(clearHintMarks, 4000);
}

// ---------------------------------------------------------------------------
// Otomatik tamamla
// ---------------------------------------------------------------------------

function canAuto() {
  return !!S && !S.won && !autoRunning && S.stock.length === 0 && S.tab.every((col) => col.every((c) => c.up));
}

/** Temele gidebilecek (atık ya da sütun üstü) ilk kartın hamlesi. */
function nextFoundationMove() {
  if (S.waste.length) {
    const id = S.waste[S.waste.length - 1];
    if (canGoFoundation(id)) return { from: { pile: 'w', n: 0, idx: S.waste.length - 1 }, dest: { pile: 'f', n: suitOf(id) } };
  }
  for (let c = 0; c < 7; c++) {
    const col = S.tab[c];
    if (!col.length) continue;
    const id = col[col.length - 1].id;
    if (canGoFoundation(id)) return { from: { pile: 't', n: c, idx: col.length - 1 }, dest: { pile: 'f', n: suitOf(id) } };
  }
  return null;
}

function autoComplete() {
  if (!canAuto()) { say('Otomatik tamamlama için tüm sütun kartları açık ve deste boş olmalı.'); return; }
  autoRunning = true;
  const gen = ++autoGen;
  clearSel(true);
  clearHintMarks();
  const step = () => {
    if (gen !== autoGen) return;
    const mv = nextFoundationMove();
    if (!mv || S.won) {
      autoRunning = false;
      render();
      if (!S.won) say('Otomatik tamamlama devam edemedi; kalan kartları elle oynayın.');
      return;
    }
    applyMove(mv.from, mv.dest);
    render();
    if (S.won) { autoRunning = false; return; }
    if (reduceMotion()) step(); else setTimeout(step, 55);
  };
  step();
}

// ---------------------------------------------------------------------------
// Kazanma
// ---------------------------------------------------------------------------

function onWin() {
  S.won = true;
  store.won++;
  store.played = Math.max(store.played, store.won);
  const secs = Math.max(1, Math.round(S.elapsed / 1000));
  let note = '';
  if (store.bestTime === null || secs < store.bestTime) { store.bestTime = secs; note += ' Yeni en iyi süre!'; }
  if (store.bestMoves === null || S.moves < store.bestMoves) { store.bestMoves = S.moves; note += ' Yeni en az hamle!'; }
  saveStore();
  renderRecord();
  const msg = S.moves + ' hamle, ' + fmtTime(S.elapsed) + ' süre, ' + S.score + ' puan.' + note;
  $('sl-result-text').textContent = msg;
  elResult.classList.add('is-active');
  say('Tebrikler, oyunu kazandınız! ' + msg);
  clearSel(true);
  startFx();
  try { elResult.scrollIntoView({ block: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' }); } catch { /* eski tarayıcı */ }
}

/** Kazanma animasyonu: düşen takım simgeleri; "hareketi azalt" tercihinde hiç oluşturulmaz. */
function startFx() {
  stopFx();
  if (reduceMotion()) return;
  const fx = document.createElement('div');
  fx.className = 'sl-fx';
  fx.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 30; i++) {
    const s = document.createElement('i');
    const suit = SUITS[i % 4];
    s.textContent = suit.sym + TXT;
    if (suit.red) s.className = 'r';
    s.style.setProperty('--x', (Math.random() * 94).toFixed(1) + '%');
    s.style.setProperty('--d', (2.4 + Math.random() * 2.6).toFixed(2) + 's');
    s.style.setProperty('--dl', (-Math.random() * 4).toFixed(2) + 's');
    fx.appendChild(s);
  }
  board.appendChild(fx);
  fxTimer = setTimeout(stopFx, 14000);
}

function stopFx() {
  clearTimeout(fxTimer);
  board.querySelectorAll('.sl-fx').forEach((n) => n.remove());
}

// ---------------------------------------------------------------------------
// Çizim
// ---------------------------------------------------------------------------

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

function newStack(pileNode) {
  pileNode.textContent = '';
  const st = document.createElement('div');
  st.className = 'sl-stack';
  pileNode.appendChild(st);
  return st;
}

/** Açık yüzlü kart: interaktif ise <button>, değilse <div>. */
function faceCard(id, pile, n, idx, interactive, top, left) {
  const el = document.createElement(interactive ? 'button' : 'div');
  if (interactive) el.type = 'button';
  el.className = 'sl-card up' + (isRed(id) ? ' red' : '');
  el.dataset.pile = pile;
  el.dataset.n = String(n);
  el.dataset.idx = String(idx);
  el.dataset.id = String(id);
  if (interactive) { el.dataset.act = '1'; el.setAttribute('aria-label', cardName(id)); }
  else el.setAttribute('aria-hidden', 'true');
  const label = RANK_LABEL[rankOf(id)];
  const sym = SUITS[suitOf(id)].sym + TXT;
  const face = rankOf(id) > 10;
  el.innerHTML = '<span class="c" aria-hidden="true">' + label + sym + '</span>'
    + '<span class="m' + (face ? ' f' : '') + '" aria-hidden="true">' + (face ? label : sym) + '</span>'
    + (face ? '<span class="m2" aria-hidden="true">' + sym + '</span>' : '');
  el.style.top = top + 'cqw';
  if (left) el.style.left = left + 'cqw';
  return el;
}

function backCard(pile, n, idx, top, tag) {
  const el = document.createElement(tag);
  if (tag === 'button') el.type = 'button';
  el.className = 'sl-card down';
  el.dataset.pile = pile;
  el.dataset.n = String(n);
  el.dataset.idx = String(idx);
  if (tag === 'div') el.setAttribute('aria-hidden', 'true');
  el.style.top = top + 'cqw';
  return el;
}

function slot(pile, n, label, glyph, extra) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'sl-slot' + (extra ? ' ' + extra : '');
  el.dataset.pile = pile;
  el.dataset.n = String(n);
  el.setAttribute('aria-label', label);
  el.innerHTML = '<span aria-hidden="true">' + (glyph || '') + '</span>';
  return el;
}

function renderStock() {
  const st = newStack(pileEls.s);
  if (S.stock.length) {
    const b = backCard('s', 0, 0, 0, 'button');
    b.classList.add('sl-stockbtn');
    b.setAttribute('aria-label', 'Çekme destesi, ' + S.stock.length + ' kart. Kart çekmek için Enter\'a basın.');
    b.innerHTML = '<span class="cnt" aria-hidden="true">' + S.stock.length + '</span>';
    st.appendChild(b);
  } else {
    st.appendChild(slot('s', 0, S.waste.length ? 'Deste boş. Atığı yeniden desteye çevirmek için Enter\'a basın.' : 'Deste ve atık boş.', S.waste.length ? '↻' : '', 'sl-stockbtn'));
  }
  pileEls.s.setAttribute('aria-label', 'Çekme destesi');
}

function renderWaste() {
  const st = newStack(pileEls.w);
  if (!S.waste.length) {
    st.appendChild(slot('w', 0, 'Atık yığını, boş', ''));
  } else {
    const fanN = S.draw === 3 ? Math.min(Math.max(S.fan, 1), S.waste.length, 3) : 1;
    const shown = S.waste.slice(-fanN);
    shown.forEach((id, k) => {
      const idx = S.waste.length - fanN + k;
      st.appendChild(faceCard(id, 'w', 0, idx, k === fanN - 1, 0, k * FAN_OFF));
    });
  }
  pileEls.w.setAttribute('aria-label', 'Atık yığını, ' + S.waste.length + ' kart');
}

function renderFound() {
  S.found.forEach((f, s) => {
    const st = newStack(pileEls.f[s]);
    if (f.length) {
      const id = f[f.length - 1];
      const el = faceCard(id, 'f', s, f.length - 1, true, 0, 0);
      el.setAttribute('aria-label', cardName(id) + ', temel');
      st.appendChild(el);
    } else {
      st.appendChild(slot('f', s, SUITS[s].name + ' temeli, boş', SUITS[s].sym + TXT, SUITS[s].red ? 'r' : ''));
    }
    pileEls.f[s].setAttribute('aria-label', SUITS[s].name + ' temeli, ' + f.length + ' kart');
  });
}

function renderTableau() {
  S.tab.forEach((col, n) => {
    const st = newStack(pileEls.t[n]);
    let y = 0;
    if (!col.length) {
      st.appendChild(slot('t', n, 'Boş sütun ' + (n + 1) + (S.kingOnly ? ', yalnızca Papaz konabilir' : ''), ''));
    }
    col.forEach((c, i) => {
      const el = c.up ? faceCard(c.id, 't', n, i, true, y, 0) : backCard('t', n, i, y, 'div');
      st.appendChild(el);
      if (i < col.length - 1) y += c.up ? UP_OFF : DOWN_OFF;
    });
    st.style.height = (y + CARD_H) + 'cqw';
    const down = col.filter((c) => !c.up).length;
    pileEls.t[n].setAttribute('aria-label', 'Sütun ' + (n + 1) + ', ' + down + ' kapalı, ' + (col.length - down) + ' açık kart');
  });
}

/** Her yığında yalnızca bir odak noktası (üstteki kart/boş yuva) Tab ile erişilir. */
function setRoving() {
  const piles = [pileEls.s, pileEls.w, ...pileEls.f, ...pileEls.t];
  piles.forEach((p) => {
    const items = [...p.querySelectorAll('button')];
    items.forEach((b, i) => { b.tabIndex = i === items.length - 1 ? 0 : -1; });
    if (p === pileEls.s && items[0]) items[0].tabIndex = 0;
  });
}

function render() {
  lastTap = null; // her durum değişikliği çift tıklama penceresini kapatır
  // Odak yığındaysa render sonrası aynı yığına dön.
  if (!pendingFocus && board.contains(document.activeElement)) {
    const loc = locFromTarget(document.activeElement);
    if (loc) pendingFocus = { pile: loc.pile, n: loc.n };
  }
  renderStock();
  renderWaste();
  renderFound();
  renderTableau();
  setRoving();
  applySelection();
  updateHud();
  if (pendingFocus) {
    const pf = pendingFocus;
    pendingFocus = null;
    const p = pileEl(pf.pile, pf.n);
    const t = p && (p.querySelector('button[tabindex="0"]') || p.querySelector('button'));
    if (t) t.focus({ preventScroll: true });
  }
}

function updateHud() {
  elMoves.textContent = String(S.moves);
  elScore.textContent = String(S.score);
  elSeed.textContent = String(S.seed);
  renderTime();
  btnUndo.disabled = S.won || autoRunning || !history.length;
  btnHint.disabled = S.won || autoRunning;
  btnAuto.disabled = !canAuto();
  board.dataset.state = S.won ? 'won' : 'play';
  board.dataset.draw = String(S.draw);
}

function renderTime() { if (S) elTime.textContent = fmtTime(S.elapsed); }

function renderRecord() {
  $('sl-st-played').textContent = String(store.played);
  $('sl-st-won').textContent = String(store.won);
  $('sl-st-time').textContent = store.bestTime === null ? '—' : fmtTime(store.bestTime * 1000);
  $('sl-st-moves').textContent = store.bestMoves === null ? '—' : String(store.bestMoves);
}

// ---------------------------------------------------------------------------
// Seçim (tıkla-tıkla ve klavye)
// ---------------------------------------------------------------------------

function locFromTarget(t) {
  const el = t && t.closest ? t.closest('[data-pile]') : null;
  if (!el) return null;
  const isCard = el.classList.contains('sl-card') && el.dataset.idx !== undefined && el.dataset.pile !== 's';
  return {
    pile: el.dataset.pile,
    n: Number(el.dataset.n) || 0,
    idx: isCard ? Number(el.dataset.idx) : -1,
    act: el.dataset.act === '1',
  };
}

const keyOf = (l) => l.pile + l.n + ':' + l.idx;

function applySelection() {
  board.querySelectorAll('.sl-card.sel').forEach((e) => { e.classList.remove('sel'); e.removeAttribute('aria-pressed'); });
  if (!sel) return;
  const { from } = sel;
  pileEl(from.pile, from.n).querySelectorAll('.sl-card[data-act="1"], .sl-card.up').forEach((e) => {
    if (Number(e.dataset.idx) >= from.idx) {
      e.classList.add('sel');
      if (e.dataset.act === '1') e.setAttribute('aria-pressed', 'true');
    }
  });
}

function clearSel(silent) {
  if (!sel) return;
  sel = null;
  applySelection();
  if (!silent) say('Seçim kaldırıldı.');
}

function select(loc) {
  const from = { pile: loc.pile, n: loc.n, idx: loc.idx };
  const ids = getCards(from);
  if (!ids) return;
  clearHintMarks();
  sel = { from, ids };
  applySelection();
  say('Seçildi: ' + ids.map(cardName).join(', ') + '. Bırakmak için bir sütuna ya da temele dokunun (klavyede hedefe gidip Enter).');
}

const destOf = (loc) => (loc.pile === 't' ? { pile: 't', n: loc.n } : loc.pile === 'f' ? { pile: 'f', n: loc.n } : null);

/** Hamleyi dener; başarıyla yapılırsa true. Gerekçeyi durum satırına yazar. */
function tryMove(from, dest) {
  const chk = canMove(from, dest);
  if (!chk.ok) { say('Hamle yapılamadı: ' + chk.reason); return false; }
  const cards = getCards(from);
  const info = applyMove(from, dest);
  pendingFocus = { pile: dest.pile, n: dest.pile === 'f' ? chk.suit : dest.n };
  sel = null;
  render();
  if (!S.won) {
    say(cards.map(cardName).join(', ') + ' taşındı.' + (info.flipped !== null ? ' Açılan kart: ' + cardName(info.flipped) + '.' : ''));
  }
  return true;
}

/** Bir yere dokunma/Enter: seçim yoksa seç, varsa oraya bırakmayı dene. */
function activate(loc) {
  if (S.won || autoRunning) return;
  if (loc.pile === 's') { clearSel(true); doDraw(); return; }
  const isCard = loc.idx >= 0;
  if (sel) {
    if (isCard && sel.from.pile === loc.pile && sel.from.n === loc.n && sel.from.idx === loc.idx) { clearSel(); return; }
    if (sel.from.pile === loc.pile && sel.from.n === loc.n) {
      // Aynı yığındaki başka karta dokunmak seçimi oraya taşır.
      clearSel(true);
      if (loc.act) select(loc);
      return;
    }
    const from = sel.from;
    const dest = destOf(loc);
    sel = null;
    applySelection();
    if (!dest) { say('Kartlar yalnızca sütunlara ve temellere bırakılabilir.'); return; }
    tryMove(from, dest);
    return;
  }
  if (loc.act) { select(loc); return; }
  if (loc.pile === 'w') say('Atık yığını boş.');
}

/** Çift tık / F tuşu: en üstteki kartı temele gönder. */
function quickFoundation(loc) {
  if (S.won || autoRunning) return;
  if (loc.pile === 'f') { say('Kart zaten temelde.'); return; }
  if (loc.pile === 't') {
    const col = S.tab[loc.n];
    if (loc.idx !== col.length - 1) { say('Yalnızca bir sütunun en üstteki kartı temele gönderilebilir.'); return; }
  } else if (loc.pile !== 'w') return;
  const from = { pile: loc.pile, n: loc.n, idx: loc.idx };
  const ids = getCards(from);
  if (!ids) return;
  tryMove(from, { pile: 'f', n: suitOf(ids[0]) });
}

let lastTap = null;

function handleTap(loc) {
  const now = performance.now();
  const key = keyOf(loc);
  if (loc.act && loc.pile !== 'f' && lastTap && lastTap.key === key && now - lastTap.t < 420) {
    lastTap = null;
    clearSel(true);
    quickFoundation(loc);
    return;
  }
  lastTap = loc.act ? { key, t: now } : null;
  activate(loc);
}

// ---------------------------------------------------------------------------
// Sürükle-bırak (pointer olayları: fare, dokunmatik, kalem)
// ---------------------------------------------------------------------------

let pdown = null; // { x, y, id, loc }
let drag = null;  // { from, ghost, srcEls, grabX, grabY, w, h, x, y }

board.addEventListener('pointerdown', (e) => {
  if (S.won || autoRunning) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  const loc = locFromTarget(e.target);
  pdown = loc ? { x: e.clientX, y: e.clientY, id: e.pointerId, loc } : null;
});

window.addEventListener('pointermove', (e) => {
  if (!pdown || e.pointerId !== pdown.id) return;
  if (!drag) {
    if (Math.hypot(e.clientX - pdown.x, e.clientY - pdown.y) < 7) return;
    if (!startDrag()) { pdown = null; return; }
  }
  drag.x = e.clientX;
  drag.y = e.clientY;
  positionGhost();
  markDrop(bestDrop().best);
});

window.addEventListener('pointerup', (e) => {
  if (!pdown || e.pointerId !== pdown.id) return;
  const down = pdown;
  pdown = null;
  if (drag) { drag.x = e.clientX; drag.y = e.clientY; finishDrag(); return; }
  const under = document.elementFromPoint(e.clientX, e.clientY);
  const up = under ? locFromTarget(under) : null;
  if (up && keyOf(up) === keyOf(down.loc)) handleTap(up);
});

window.addEventListener('pointercancel', () => { pdown = null; if (drag) endDrag(); });

// Klavye (Enter/Boşluk) ile gelen tıklamalar: detail === 0. Fare tıklamaları pointerup'ta işlenir.
board.addEventListener('click', (e) => {
  if (e.detail !== 0) return;
  const loc = locFromTarget(e.target);
  if (loc) { lastTap = null; activate(loc); }
});

board.addEventListener('dragstart', (e) => e.preventDefault());
board.addEventListener('contextmenu', (e) => e.preventDefault());

function startDrag() {
  const loc = pdown.loc;
  if (!loc.act || loc.pile === 's') return false;
  const from = { pile: loc.pile, n: loc.n, idx: loc.idx };
  if (!getCards(from)) return false;
  clearSel(true);
  clearHintMarks();
  const els = [...pileEl(loc.pile, loc.n).querySelectorAll('.sl-card')].filter((el) => Number(el.dataset.idx) >= loc.idx);
  if (!els.length) return false;
  const r0 = els[0].getBoundingClientRect();
  const ghost = document.createElement('div');
  ghost.className = 'sl-ghost';
  ghost.style.width = r0.width + 'px';
  els.forEach((el) => {
    const c = el.cloneNode(true);
    c.removeAttribute('aria-label');
    c.removeAttribute('data-act');
    c.setAttribute('aria-hidden', 'true');
    c.tabIndex = -1;
    c.style.left = '0';
    c.style.top = (el.getBoundingClientRect().top - r0.top) + 'px';
    ghost.appendChild(c);
    el.classList.add('is-dragging');
  });
  board.appendChild(ghost);
  drag = { from, ghost, srcEls: els, grabX: pdown.x - r0.left, grabY: pdown.y - r0.top, w: r0.width, h: r0.height, x: pdown.x, y: pdown.y };
  return true;
}

function positionGhost() {
  const br = board.getBoundingClientRect();
  drag.ghost.style.left = (drag.x - drag.grabX - br.left) + 'px';
  drag.ghost.style.top = (drag.y - drag.grabY - br.top) + 'px';
}

/** Sürüklenen kartın en çok örtüştüğü geçerli hedefi bulur (en az kartın %15'i örtüşmeli). */
function bestDrop() {
  const L = drag.x - drag.grabX; const T = drag.y - drag.grabY;
  const R = L + drag.w; const B = T + drag.h;
  const min = drag.w * drag.h * 0.15;
  let best = null; let bestOv = 0;
  let worst = null; let worstOv = 0;
  const cands = [];
  for (let s = 0; s < 4; s++) cands.push({ pile: 'f', n: s });
  for (let c = 0; c < 7; c++) cands.push({ pile: 't', n: c });
  cands.forEach((d) => {
    const rc = pileEl(d.pile, d.n).getBoundingClientRect();
    const bottom = rc.bottom + (d.pile === 't' ? drag.h * 0.4 : 0);
    const ov = Math.max(0, Math.min(R, rc.right) - Math.max(L, rc.left)) * Math.max(0, Math.min(B, bottom) - Math.max(T, rc.top));
    if (ov < min) return;
    const chk = canMove(drag.from, d);
    if (chk.ok) { if (ov > bestOv) { best = d; bestOv = ov; } }
    else if (ov > worstOv) { worst = { d, reason: chk.reason }; worstOv = ov; }
  });
  return { best, worst };
}

function markDrop(d) {
  board.querySelectorAll('.drop-ok').forEach((e) => e.classList.remove('drop-ok'));
  if (d) pileEl(d.pile, d.n).classList.add('drop-ok');
}

function endDrag() {
  if (!drag) return;
  drag.ghost.remove();
  drag.srcEls.forEach((el) => el.classList.remove('is-dragging'));
  markDrop(null);
  drag = null;
}

function finishDrag() {
  const { best, worst } = bestDrop();
  const from = drag.from;
  endDrag();
  if (best) tryMove(from, best);
  else if (worst) say('Hamle yapılamadı: ' + worst.reason);
}

// ---------------------------------------------------------------------------
// Klavye gezintisi: Tab yığınlar arasında, oklar yığın içinde ve yığınlar arasında
// ---------------------------------------------------------------------------

const TOP_ORDER = [['s', 0], ['w', 0], ['f', 0], ['f', 1], ['f', 2], ['f', 3]];
const topIndexForCol = (c) => (c === 0 ? 0 : c <= 2 ? 1 : c - 1);
const colForTopIndex = (i) => (i === 0 ? 0 : i === 1 ? 1 : i + 1);

function focusPile(pile, n) {
  const p = pileEl(pile, n);
  const t = p.querySelector('button[tabindex="0"]') || p.querySelector('button');
  if (t) t.focus();
}

function focusCard(pile, n, idx) {
  const t = pileEl(pile, n).querySelector('.sl-card[data-idx="' + idx + '"]');
  if (t && t.tagName === 'BUTTON') t.focus();
}

function navigate(loc, key) {
  if (loc.pile === 't') {
    const col = S.tab[loc.n];
    if (key === 'ArrowLeft') focusPile('t', Math.max(0, loc.n - 1));
    else if (key === 'ArrowRight') focusPile('t', Math.min(6, loc.n + 1));
    else if (key === 'ArrowDown') { if (loc.idx >= 0 && loc.idx < col.length - 1) focusCard('t', loc.n, loc.idx + 1); }
    else if (key === 'ArrowUp') {
      const firstUp = col.findIndex((c) => c.up);
      if (loc.idx >= 0 && loc.idx > firstUp && firstUp >= 0) focusCard('t', loc.n, loc.idx - 1);
      else { const [p, n] = TOP_ORDER[topIndexForCol(loc.n)]; focusPile(p, n); }
    }
    return;
  }
  const i = TOP_ORDER.findIndex(([p, n]) => p === loc.pile && n === loc.n);
  if (i < 0) return;
  if (key === 'ArrowLeft') { const [p, n] = TOP_ORDER[Math.max(0, i - 1)]; focusPile(p, n); }
  else if (key === 'ArrowRight') { const [p, n] = TOP_ORDER[Math.min(TOP_ORDER.length - 1, i + 1)]; focusPile(p, n); }
  else if (key === 'ArrowDown') focusPile('t', colForTopIndex(i));
}

// Odaklanan düğme, yığının tek Tab durağı olur (roving tabindex).
board.addEventListener('focusin', (e) => {
  const p = e.target.closest ? e.target.closest('.sl-pile') : null;
  if (!p || e.target.tagName !== 'BUTTON') return;
  p.querySelectorAll('button').forEach((b) => { b.tabIndex = -1; });
  e.target.tabIndex = 0;
});

board.addEventListener('keydown', (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  const loc = locFromTarget(e.target);
  if (!loc) return;
  switch (e.key) {
    case 'ArrowLeft': case 'ArrowRight': case 'ArrowUp': case 'ArrowDown':
      e.preventDefault();
      navigate(loc, e.key);
      break;
    case 'Escape':
      clearSel();
      break;
    case 'f': case 'F':
      e.preventDefault();
      clearSel(true);
      quickFoundation(loc);
      break;
    case 'u': case 'U':
      e.preventDefault();
      undo();
      break;
    case 'h': case 'H':
      e.preventDefault();
      showHint();
      break;
    default:
  }
});

// ---------------------------------------------------------------------------
// Düğmeler ve ayarlar
// ---------------------------------------------------------------------------

function currentOpts() {
  return { draw: selDraw.value === '3' ? 3 : 1, kingOnly: selEmpty.value !== 'any' };
}

function startNew(seed) {
  const o = currentOpts();
  store.draw = o.draw;
  store.kingOnly = o.kingOnly;
  saveStore();
  dealGame(seed, o);
  say('Yeni dağıtım hazır (no ' + S.seed + '). Bir kart seçerek ya da desteden çekerek başlayın.');
}

$('sl-new').addEventListener('click', () => startNew(newSeed()));
$('sl-replay').addEventListener('click', () => startNew(S.seed));
$('sl-again').addEventListener('click', () => { startNew(newSeed()); pendingFocus = { pile: 's', n: 0 }; render(); });
btnUndo.addEventListener('click', undo);
btnHint.addEventListener('click', showHint);
btnAuto.addEventListener('click', autoComplete);

function onOptionChange() {
  const o = currentOpts();
  store.draw = o.draw;
  store.kingOnly = o.kingOnly;
  saveStore();
  if (S.moves === 0 && !S.won) {
    // Henüz hamle yapılmadıysa ayar aynı dağıtıma hemen uygulanır.
    const counted = S.counted;
    dealGame(S.seed, o);
    S.counted = counted;
    say('Ayar uygulandı: ' + (o.draw === 3 ? '3 kart çekme' : '1 kart çekme') + ', boş sütuna ' + (o.kingOnly ? 'yalnızca Papaz' : 'herhangi bir kart') + '.');
  } else {
    say('Ayar kaydedildi; yeni dağıtımda geçerli olacak.');
  }
}
selDraw.addEventListener('change', onOptionChange);
selEmpty.addEventListener('change', onOptionChange);

// Tam ekran: yalnızca oyun kutusu gösterilir (reklam alanları kutunun dışındadır).
const fsBtn = $('sl-full');
if (!document.fullscreenEnabled || !box.requestFullscreen) {
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

// Süre: yalnızca oyun başladıktan sonra, sekme görünürken ve oyun bitmemişken işler.
let lastTick = performance.now();
setInterval(() => {
  const now = performance.now();
  const dt = now - lastTick;
  lastTick = now;
  if (S && S.counted && !S.won && !document.hidden) S.elapsed += Math.min(dt, 1000);
  renderTime();
}, 250);

// ---------------------------------------------------------------------------
// Test kancası (oyuncuya sunulan bir özellik değildir)
// ---------------------------------------------------------------------------

function readout() {
  return {
    seed: S.seed, draw: S.draw, kingOnly: S.kingOnly, moves: S.moves, score: S.score,
    elapsed: S.elapsed, started: S.counted, won: S.won, fan: S.fan,
    stock: S.stock.slice(), waste: S.waste.slice(),
    found: S.found.map((f) => f.slice()),
    tab: S.tab.map((c) => c.map((x) => ({ id: x.id, up: x.up }))),
    historyLength: history.length,
    selected: sel ? { from: sel.from, ids: sel.ids.slice() } : null,
    hints: findHints().length,
  };
}

/** Test durumu kurar. Geçersiz (52 benzersiz kart yok, temel sırası bozuk) ise false döner. */
function applyTestState(o) {
  try {
    const tab = [];
    for (let c = 0; c < 7; c++) {
      const col = ((o.tableau || [])[c] || []).map((x) => (typeof x === 'number' ? { id: x, up: true } : { id: x.id, up: x.up !== false }));
      if (col.length) col[col.length - 1].up = true;
      tab.push(col);
    }
    const found = [0, 1, 2, 3].map((s) => ((o.foundations || [])[s] || []).slice());
    const stock = (o.stock || []).slice();
    const waste = (o.waste || []).slice();
    const all = [...stock, ...waste, ...found.flat(), ...tab.flat().map((x) => x.id)];
    if (all.length !== 52 || new Set(all).size !== 52 || all.some((v) => !Number.isInteger(v) || v < 0 || v > 51)) return false;
    if (found.some((f, s) => f.some((id, k) => id !== s * 13 + k))) return false;
    S = {
      seed: Number.isInteger(o.seed) ? o.seed : 1,
      draw: o.draw === 3 ? 3 : (o.draw === 1 ? 1 : S.draw),
      kingOnly: typeof o.kingOnly === 'boolean' ? o.kingOnly : S.kingOnly,
      stock, waste, found, tab,
      fan: Number.isInteger(o.fan) ? o.fan : (waste.length ? 1 : 0),
      moves: Number.isInteger(o.moves) ? o.moves : 0,
      score: Number.isInteger(o.score) ? o.score : 0,
      elapsed: typeof o.elapsed === 'number' ? o.elapsed : 0,
      counted: !!o.counted, won: false,
    };
    resetUi();
    return true;
  } catch {
    return false;
  }
}

window.__solitaireTest = Object.assign(() => readout(), {
  deal(seed, opts) { dealGame(seed, opts || {}); return readout(); },
  setState: applyTestState,
  stats: () => ({ ...store }),
});

// ---------------------------------------------------------------------------
// Başlangıç
// ---------------------------------------------------------------------------

renderRecord();
dealGame(newSeed(), { draw: store.draw, kingOnly: store.kingOnly });
say('Bir kart seçerek ya da desteden çekerek başlayın. Süre ilk hamlede işlemeye başlar.');
