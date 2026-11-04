// Örümcek Solitaire — Bilişim Ajans.
// Tamamen istemci tarafı: kartlar HTML/CSS ile çizilir; dış görsel, istek ya da çerez yoktur.
// Kalıcı veri yalnızca bu cihazdaki localStorage'dadır (zorluk, dağıtım kuralı, istatistikler).
// Kart çizimi, sürükle-bırak, geri al ve ipucu altyapısı Solitaire (Klondike) sayfasından uyarlanmıştır.
//
// İki deste = 104 kart = 8 "set" (her set As..Papaz, 13 kart). Kart numarası: id = set * 13 + (değer - 1).
// Setin takımı zorluğa göre değişir: 1 renk → 8 maça; 2 renk → 4 maça + 4 kupa; 4 renk → her takımdan 2 set.

const STORE_KEY = 'ba-oyun-orumcek-solitaire';
const TXT = '︎'; // takım simgesi emoji değil düz yazı olarak çizilsin
const COLS = 10;
const TOTAL = 104;
const START_SCORE = 500;
const SET_BONUS = 100;
const CARD_RATIO = 1.4;
const MODES = [1, 2, 4];

const SUITS = [
  { sym: '♠', name: 'Maça', red: false },
  { sym: '♥', name: 'Kupa', red: true },
  { sym: '♦', name: 'Karo', red: true },
  { sym: '♣', name: 'Sinek', red: false },
];
const RANK_LABEL = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RANK_NAME = ['', 'As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Vale', 'Kız', 'Papaz'];
const MODE_SETS = { 1: [0, 0, 0, 0, 0, 0, 0, 0], 2: [0, 1, 0, 1, 0, 1, 0, 1], 4: [0, 1, 2, 3, 0, 1, 2, 3] };
const MODE_NAME = { 1: '1 renk', 2: '2 renk', 4: '4 renk' };

export const rankOf = (id) => (id % 13) + 1;
export const suitFor = (mode, id) => MODE_SETS[mode][Math.floor(id / 13)];

// ---------------------------------------------------------------------------
// Tohumlu rastgele sayı (mulberry32) ve 104 kartlık deste karıştırma
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

/** Aynı tohum her zaman aynı sırayı verir (Fisher–Yates). */
export function deckForSeed(seed) {
  const rng = mulberry32(seed);
  const deck = Array.from({ length: TOTAL }, (_, i) => i);
  for (let i = TOTAL - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ---------------------------------------------------------------------------
// Depolama: bozuk ya da beklenmeyen veri varsayılanlara döner, hata fırlatmaz
// ---------------------------------------------------------------------------

const blankStats = () => ({ played: 0, won: 0, bestScore: null, bestTime: null, bestMoves: null });
const defaultStore = () => ({ suits: 1, strict: true, stats: { 1: blankStats(), 2: blankStats(), 4: blankStats() } });
const isObj = (v) => !!v && typeof v === 'object' && !Array.isArray(v);

function loadStore() {
  const d = defaultStore();
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { raw = null; }
  if (!isObj(raw)) return d;
  const cnt = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), 1e9) : 0);
  const pos = (v) => (typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.min(Math.floor(v), 1e9) : null);
  const nonNeg = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), 1e6) : null);
  d.suits = MODES.includes(raw.suits) ? raw.suits : 1;
  d.strict = raw.strict !== false;
  const st = isObj(raw.stats) ? raw.stats : {};
  MODES.forEach((m) => {
    const r = isObj(st[m]) ? st[m] : {};
    const won = cnt(r.won);
    d.stats[m] = {
      played: Math.max(cnt(r.played), won),
      won,
      bestScore: nonNeg(r.bestScore),
      bestTime: pos(r.bestTime),
      bestMoves: pos(r.bestMoves),
    };
  });
  return d;
}

function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* özel gezinti, kota vb. */ }
}

const store = loadStore();

// ---------------------------------------------------------------------------
// DOM başvuruları
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);
const box = $('oyun-kutusu');
const board = $('sp-board');
const elStatus = $('sp-status');
const elResult = $('sp-result');
const elError = $('sp-error');
const btnUndo = $('sp-undo');
const btnHint = $('sp-hint');
const btnAuto = $('sp-auto');
const btnDeal = $('sp-deal');
const selSuits = $('sp-suits');
const selRule = $('sp-rule');
const seedInput = $('sp-seed-in');

const pileEls = {
  s: $('sp-stock'),
  t: Array.from({ length: COLS }, (_, i) => $('sp-t' + i)),
  d: Array.from({ length: 8 }, (_, i) => $('sp-d' + i)),
};

const reduceMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// ---------------------------------------------------------------------------
// Oyun durumu
// ---------------------------------------------------------------------------

let S = null;            // geçerli oyun
let history = [];        // geri alma anlık görüntüleri (sınırsız)
let sel = null;          // { c, idx }
let autoRunning = false;
let autoGen = 0;         // otomatik tamamlama zamanlayıcılarını yeni oyunda iptal eder
let pendingFocus = null; // render sonrası odaklanılacak yığın
let hintTimer = 0;
let hintCursor = 0;
let hintSig = '';
let fxTimer = 0;
let lastTap = null;

const suitOf = (id) => suitFor(S.suits, id);
const isRed = (id) => SUITS[suitOf(id)].red;
const cardName = (id) => SUITS[suitOf(id)].name + ' ' + RANK_NAME[rankOf(id)];
const score = () => Math.max(0, START_SCORE - S.moves + SET_BONUS * S.done.length);

function say(text) { elStatus.textContent = text; }

function snap() {
  return {
    stock: S.stock.slice(),
    tab: S.tab.map((c) => c.map((x) => ({ id: x.id, up: x.up }))),
    done: S.done.slice(),
    moves: S.moves,
  };
}

function restore(s) {
  S.stock = s.stock; S.tab = s.tab; S.done = s.done; S.moves = s.moves;
}

/** Yeni dağıtım: ilk 4 sütuna 6, diğer 6 sütuna 5 kart (54); kalan 50 kart destede. */
function dealGame(seed, opts = {}) {
  const deck = deckForSeed(seed);
  const tab = [];
  let p = 0;
  for (let c = 0; c < COLS; c++) {
    const n = c < 4 ? 6 : 5;
    const col = [];
    for (let k = 0; k < n; k++) col.push({ id: deck[p++], up: k === n - 1 });
    tab.push(col);
  }
  S = {
    seed,
    suits: MODES.includes(opts.suits) ? opts.suits : store.suits,
    strict: typeof opts.strict === 'boolean' ? opts.strict : store.strict,
    stock: deck.slice(p), // son eleman destenin üstü
    tab,
    done: [],
    moves: 0, elapsed: 0, counted: false, won: false,
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
  elResult.hidden = true;
  elResult.classList.remove('is-active');
  selSuits.value = String(S.suits);
  selRule.value = S.strict ? 'strict' : 'free';
  render();
}

const newSeed = () => 1 + Math.floor(Math.random() * 999999);

// ---------------------------------------------------------------------------
// Kurallar
// ---------------------------------------------------------------------------

/** Sütunun üstünden geriye doğru aynı takım + ardışık azalan açık kartların başladığı indeks. */
function runStart(col) {
  if (!col.length) return -1;
  let i = col.length - 1;
  while (i > 0) {
    const a = col[i - 1];
    const b = col[i];
    if (!a.up || suitOf(a.id) !== suitOf(b.id) || rankOf(a.id) !== rankOf(b.id) + 1) break;
    i--;
  }
  return i;
}

/** Bu karttan başlayarak üstündeki kartlar birlikte alınabilir mi? */
function canPick(c, idx) {
  const col = S.tab[c];
  if (!col || !Number.isInteger(idx) || idx < 0 || idx >= col.length) return { ok: false, reason: 'Taşınacak kart yok.' };
  if (!col[idx].up) return { ok: false, reason: 'Kapalı kart taşınamaz; önce üstündeki kartları başka sütunlara taşıyın.' };
  if (idx < runStart(col)) {
    return { ok: false, reason: 'Bu kartlar birlikte taşınamaz: birlikte taşınan dizi aynı renkten (aynı takımdan) ve ardışık azalan olmalı. Yalnızca üstteki düzgün diziyi taşıyabilirsiniz.' };
  }
  return { ok: true };
}

/** Hamle geçerli mi? Geçersizse Türkçe gerekçe döner. */
function canMove(c, idx, d) {
  const pick = canPick(c, idx);
  if (!pick.ok) return pick;
  if (!Number.isInteger(d) || d < 0 || d >= COLS) return { ok: false, reason: 'Kartlar yalnızca sütunlara bırakılabilir.' };
  if (c === d) return { ok: false, reason: 'Kartlar zaten bu sütunda.' };
  const dest = S.tab[d];
  if (!dest.length) return { ok: true };
  const top = dest[dest.length - 1];
  if (rankOf(top.id) !== rankOf(S.tab[c][idx].id) + 1) {
    return { ok: false, reason: 'Kart yalnızca kendinden bir büyük kartın üzerine (renk fark etmez) ya da boş sütuna konabilir.' };
  }
  return { ok: true };
}

/**
 * Seçilen dizinin tamamı hedefe uymuyorsa hedefe uyan alt diziyi bulur
 * (örneğin 9-8-7 seçiliyken 8'in üzerine yalnızca 7 gider).
 */
function resolveMove(c, idx, d) {
  const chk = canMove(c, idx, d);
  if (chk.ok) return { ok: true, idx };
  const col = S.tab[c];
  const dest = S.tab[d];
  if (canPick(c, idx).ok && dest && dest.length && c !== d) {
    const need = rankOf(dest[dest.length - 1].id) - 1;
    for (let k = idx + 1; k < col.length; k++) {
      if (rankOf(col[k].id) === need && canMove(c, k, d).ok) return { ok: true, idx: k };
    }
  }
  return { ok: false, reason: chk.reason };
}

function canDeal() {
  if (!S.stock.length) return { ok: false, reason: 'Destede dağıtılacak kart kalmadı; kalan hamleleri sütunlarda yapın.' };
  if (S.strict && S.tab.some((col) => !col.length)) {
    // Masada 10 karttan az kart varsa boş sütunların hepsini doldurmak imkânsızdır; oyuncuya tek çıkış yolu söylenir.
    if (S.tab.reduce((a, col) => a + col.length, 0) < COLS) {
      return { ok: false, reason: 'Boş sütun varken dağıtılamaz (klasik kural). Masada 10 karttan az kart kaldığı için her sütunu doldurmak mümkün değil; dağıtmak için "Boş sütunda dağıtım" ayarını "İzin ver" yapın.' };
    }
    return { ok: false, reason: 'Boş sütun varken dağıtılamaz (klasik kural). Önce her boş sütuna en az bir kart taşıyın ya da "Boş sütunda dağıtım" ayarını "İzin ver" yapın.' };
  }
  return { ok: true };
}

/** İlk hamlede "oynanan" sayısını artırır ve süreyi başlatır. */
function markStarted() {
  if (S.counted) return;
  S.counted = true;
  store.stats[S.suits].played++;
  saveStore();
  renderRecord();
}

function flipTop(c) {
  const col = S.tab[c];
  const top = col[col.length - 1];
  if (top && !top.up) { top.up = true; return top.id; }
  return null;
}

/** Sütunun üstünde aynı takımdan Papaz→As dizisi oluştuysa 13 kartı kaldırır. */
function collectRuns(c) {
  const out = [];
  const col = S.tab[c];
  while (col.length >= 13) {
    const top = col[col.length - 1];
    if (!top.up || rankOf(top.id) !== 1) break;
    if (col.length - runStart(col) < 13) break;
    const removed = col.splice(col.length - 13);
    const suit = suitOf(removed[0].id);
    S.done.push(suit);
    out.push(suit);
    flipTop(c);
  }
  return out;
}

/** Hamleyi uygular (geçerliliği çağıran denetler). */
function applyMove(c, idx, d) {
  history.push(snap());
  const moving = S.tab[c].splice(idx);
  S.tab[d].push(...moving);
  const flipped = flipTop(c);
  S.moves++;
  markStarted();
  const sets = collectRuns(d);
  if (S.done.length === 8 && !S.won) onWin();
  return { flipped, sets, ids: moving.map((x) => x.id) };
}

/** Desteden her sütuna birer kart dağıtır. */
function doDeal() {
  if (!S || S.won || autoRunning) return false;
  const chk = canDeal();
  if (!chk.ok) { say(chk.reason); return false; }
  history.push(snap());
  let n = 0;
  for (let c = 0; c < COLS && S.stock.length; c++) { S.tab[c].push({ id: S.stock.pop(), up: true }); n++; }
  S.moves++;
  markStarted();
  const sets = [];
  for (let c = 0; c < COLS; c++) sets.push(...collectRuns(c));
  clearSel(true);
  clearHintMarks();
  if (pileEls.s.contains(document.activeElement)) pendingFocus = { pile: 's', n: 0 };
  if (S.done.length === 8 && !S.won) onWin();
  render();
  if (!S.won) {
    const left = Math.ceil(S.stock.length / COLS);
    say(n + ' kart dağıtıldı. ' + (left ? left + ' dağıtım kaldı.' : 'Deste bitti.') + setMsg(sets));
  }
  return true;
}

function setMsg(sets) {
  if (!sets.length) return '';
  return ' ' + sets.map((s) => SUITS[s].name).join(', ') + ' dizisi tamamlandı ve kaldırıldı (+' + (SET_BONUS * sets.length) + ' puan).';
}

function undo() {
  if (!S || S.won || autoRunning || !history.length) return;
  restore(history.pop());
  clearSel(true);
  clearHintMarks();
  hintCursor = 0;
  render();
  say('Son hamle geri alındı.');
}

// ---------------------------------------------------------------------------
// İpucu
// ---------------------------------------------------------------------------

/** Hamle yapılırsa hedefte Papaz→As tamamlanır mı? */
function completesRun(c, idx, d) {
  const col = S.tab[c];
  const dest = S.tab[d];
  if (!dest.length || rankOf(col[col.length - 1].id) !== 1) return false;
  const top = dest[dest.length - 1];
  if (suitOf(top.id) !== suitOf(col[idx].id)) return false;
  return (dest.length - runStart(dest)) + (col.length - idx) === 13;
}

const colWord = (d) => (d + 1) + '. sütun';

/** Geçerli ve işe yarar hamlelerin öncelik sırasına göre listesi. */
function findHints() {
  const complete = [];
  const suited = [];
  const reveal = [];
  const other = [];
  const toEmpty = [];
  const emptyCol = S.tab.findIndex((col) => !col.length);
  for (let c = 0; c < COLS; c++) {
    const col = S.tab[c];
    if (!col.length) continue;
    const rs = runStart(col);
    const below = rs > 0 ? col[rs - 1] : null;
    const onParent = !!below && below.up && rankOf(below.id) === rankOf(col[rs].id) + 1;
    for (let idx = rs; idx < col.length; idx++) {
      const id = col[idx].id;
      const count = col.length - idx;
      const what = cardName(id) + (count > 1 ? ' ile başlayan ' + count + ' kartlık diziyi' : ' kartını');
      for (let d = 0; d < COLS; d++) {
        if (d === c || !S.tab[d].length) continue;
        const top = S.tab[d][S.tab[d].length - 1];
        if (rankOf(top.id) !== rankOf(id) + 1) continue;
        const same = suitOf(top.id) === suitOf(id);
        const h = { c, idx, d, text: what + ' ' + colWord(d) + 'daki ' + cardName(top.id) + ' üzerine taşıyın' };
        if (completesRun(c, idx, d)) { h.text += '; dizi tamamlanır.'; complete.push(h); continue; }
        if (idx > rs) continue; // düzgün diziyi bölmek işe yaramaz
        if (same) { h.text += '; aynı renkten dizi uzar.'; suited.push(h); }
        else if (below && !below.up) { h.text += '; kapalı bir kart açılır.'; reveal.push(h); }
        else if (idx === 0) { h.text += '; sütun boşalır.'; reveal.push(h); }
        else if (!onParent) { h.text += '.'; other.push(h); }
      }
    }
    if (emptyCol >= 0 && rs > 0 && (!below.up || !onParent)) {
      toEmpty.push({ c, idx: rs, d: emptyCol, text: cardName(col[rs].id) + (col.length - rs > 1 ? ' ile başlayan diziyi' : ' kartını') + ' boş ' + colWord(emptyCol) + 'a taşıyın' + (below.up ? '.' : '; kapalı bir kart açılır.') });
    }
  }
  const list = [...complete, ...suited, ...reveal, ...other, ...toEmpty];
  if (canDeal().ok) list.push({ deal: true, text: 'Desteden yeni sıra dağıtın (D tuşu).' });
  return list;
}

function cardEl(c, idx) {
  return pileEls.t[c].querySelector('.sp-card[data-idx="' + idx + '"]');
}

function topEl(d) {
  const all = pileEls.t[d].querySelectorAll('.sp-card, .sp-slot');
  return all[all.length - 1] || null;
}

function clearHintMarks() {
  clearTimeout(hintTimer);
  board.querySelectorAll('.is-hint').forEach((el) => el.classList.remove('is-hint'));
}

function showHint() {
  if (!S || S.won || autoRunning) return;
  const list = findHints();
  if (!list.length) {
    say(S.stock.length
      ? 'Oynanabilir hamle bulunamadı. Boş sütunu doldurup dağıtabilir, geri alıp farklı bir yol deneyebilir ya da yeni oyun başlatabilirsiniz.'
      : 'Oynanabilir hamle bulunamadı. Geri alıp farklı bir yol deneyebilir ya da yeni oyun başlatabilirsiniz.');
    return;
  }
  const sig = S.moves + '|' + history.length + '|' + S.stock.length;
  hintCursor = sig === hintSig ? (hintCursor + 1) % list.length : 0;
  hintSig = sig;
  const h = list[hintCursor];
  clearSel(true);
  clearHintMarks();
  if (h.deal) {
    const b = pileEls.s.querySelector('button');
    if (b) b.classList.add('is-hint');
  } else {
    const a = cardEl(h.c, h.idx);
    if (a) a.classList.add('is-hint');
    const b = topEl(h.d);
    if (b) b.classList.add('is-hint');
  }
  say('İpucu ' + (hintCursor + 1) + '/' + list.length + ': ' + h.text);
  hintTimer = setTimeout(clearHintMarks, 4000);
}

// ---------------------------------------------------------------------------
// Otomatik tamamla: deste boş ve tüm kartlar açıkken sınırlı arama ile çözüm bulur
// ---------------------------------------------------------------------------

function canAuto() {
  return !!S && !S.won && !autoRunning && S.stock.length === 0 && S.tab.every((col) => col.every((x) => x.up));
}

function solveEndgame() {
  const mode = S.suits;
  const sOf = (id) => suitFor(mode, id);
  const val = (id) => sOf(id) * 13 + rankOf(id); // iki destedeki eş kartlar aynı sayılır
  const rs = (col) => {
    let i = col.length - 1;
    while (i > 0 && sOf(col[i - 1]) === sOf(col[i]) && rankOf(col[i - 1]) === rankOf(col[i]) + 1) i--;
    return i;
  };
  const keyOf = (tab) => tab.map((c) => c.map(val).join('.')).sort().join('|');
  const clean = (col) => {
    while (col.length >= 13 && rankOf(col[col.length - 1]) === 1 && col.length - rs(col) >= 13) col.splice(col.length - 13);
  };
  const gen = (tab) => {
    const out = [];
    const empty = tab.findIndex((c) => !c.length);
    for (let c = 0; c < tab.length; c++) {
      const col = tab[c];
      if (!col.length) continue;
      const r = rs(col);
      const onParent = r > 0 && rankOf(col[r - 1]) === rankOf(col[r]) + 1;
      const endsWithAce = rankOf(col[col.length - 1]) === 1;
      for (let idx = r; idx < col.length; idx++) {
        for (let d = 0; d < tab.length; d++) {
          if (d === c || !tab[d].length) continue;
          const dest = tab[d];
          const top = dest[dest.length - 1];
          if (rankOf(top) !== rankOf(col[idx]) + 1) continue;
          const same = sOf(top) === sOf(col[idx]);
          const completes = same && endsWithAce && (dest.length - rs(dest)) + (col.length - idx) === 13;
          if (idx > r) { if (completes) out.push({ c, idx, d, p: 0 }); continue; }
          if (same) out.push({ c, idx, d, p: completes ? 0 : 1 });
          else if (!onParent) out.push({ c, idx, d, p: idx === 0 ? 2 : 3 });
        }
      }
      if (empty >= 0 && r > 0) out.push({ c, idx: r, d: empty, p: 4 });
    }
    return out.sort((a, b) => a.p - b.p);
  };

  const seen = new Set();
  const deadline = performance.now() + 1500;
  let budget = 60000;
  let aborted = false;
  const path = [];
  const dfs = (tab, depth) => {
    if (tab.every((c) => !c.length)) return true;
    if (--budget < 0 || depth > 500 || performance.now() > deadline) { aborted = true; return false; }
    const k = keyOf(tab);
    if (seen.has(k)) return false;
    seen.add(k);
    for (const m of gen(tab)) {
      const t2 = tab.map((c) => c.slice());
      t2[m.d].push(...t2[m.c].splice(m.idx));
      clean(t2[m.d]);
      path.push(m);
      if (dfs(t2, depth + 1)) return true;
      path.pop();
      if (aborted) return false;
    }
    return false;
  };
  return dfs(S.tab.map((col) => col.map((x) => x.id)), 0) ? path.slice() : null;
}

function autoComplete() {
  if (!canAuto()) { say('Otomatik tamamlama için deste boş ve tüm kartlar açık olmalı.'); return; }
  clearSel(true);
  clearHintMarks();
  const plan = solveEndgame();
  if (!plan) { say('Otomatik tamamlama bir çözüm bulamadı; kalan kartları elle oynamayı ya da birkaç hamle geri almayı deneyin.'); return; }
  autoRunning = true;
  const gen = ++autoGen;
  let i = 0;
  render();
  say('Otomatik tamamlanıyor…');
  const step = () => {
    if (gen !== autoGen) return;
    const m = plan[i++];
    if (!m || S.won || !canMove(m.c, m.idx, m.d).ok) {
      autoRunning = false;
      render();
      if (!S.won) say('Otomatik tamamlama durdu; kalan kartları elle oynayın.');
      return;
    }
    applyMove(m.c, m.idx, m.d);
    if (S.won) { autoRunning = false; render(); return; }
    render();
    if (reduceMotion()) step(); else setTimeout(step, 90);
  };
  step();
}

// ---------------------------------------------------------------------------
// Kazanma
// ---------------------------------------------------------------------------

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

function onWin() {
  S.won = true;
  const st = store.stats[S.suits];
  if (!S.counted) { S.counted = true; st.played++; }
  st.won++;
  st.played = Math.max(st.played, st.won);
  const secs = Math.max(1, Math.round(S.elapsed / 1000));
  const sc = score();
  let note = '';
  if (st.bestScore === null || sc > st.bestScore) { st.bestScore = sc; note += ' Yeni en yüksek puan!'; }
  if (st.bestTime === null || secs < st.bestTime) { st.bestTime = secs; note += ' Yeni en iyi süre!'; }
  if (st.bestMoves === null || S.moves < st.bestMoves) st.bestMoves = S.moves;
  saveStore();
  renderRecord();
  const msg = MODE_NAME[S.suits] + ', ' + S.moves + ' hamle, ' + fmtTime(S.elapsed) + ' süre, ' + sc + ' puan.' + note;
  $('sp-result-text').textContent = msg;
  elResult.hidden = false;
  elResult.classList.add('is-active');
  say('Tebrikler, sekiz dizinin hepsini tamamladınız! ' + msg);
  sel = null;
  startFx();
  try { elResult.scrollIntoView({ block: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' }); } catch { /* eski tarayıcı */ }
}

/** Kazanma animasyonu: düşen takım simgeleri; "hareketi azalt" tercihinde hiç oluşturulmaz. */
function startFx() {
  stopFx();
  if (reduceMotion()) return;
  const fx = document.createElement('div');
  fx.className = 'sp-fx';
  fx.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 32; i++) {
    const s = document.createElement('i');
    const suit = SUITS[MODE_SETS[S.suits][i % 8]];
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
  board.querySelectorAll('.sp-fx').forEach((n) => n.remove());
}

// ---------------------------------------------------------------------------
// Çizim
// ---------------------------------------------------------------------------

function newStack(pileNode) {
  pileNode.textContent = '';
  const st = document.createElement('div');
  st.className = 'sp-stack';
  pileNode.appendChild(st);
  return st;
}

/** Açık yüzlü kart: etkileşimli ise <button>, değilse <div>. */
function faceCard(id, pile, n, idx, interactive) {
  const el = document.createElement(interactive ? 'button' : 'div');
  if (interactive) el.type = 'button';
  el.className = 'sp-card up' + (isRed(id) ? ' red' : '');
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
  return el;
}

function backCard(n, idx) {
  const el = document.createElement('div');
  el.className = 'sp-card down';
  el.dataset.pile = 't';
  el.dataset.n = String(n);
  el.dataset.idx = String(idx);
  el.setAttribute('aria-hidden', 'true');
  return el;
}

function renderStock() {
  const st = newStack(pileEls.s);
  const b = document.createElement('button');
  b.type = 'button';
  b.dataset.pile = 's';
  b.dataset.n = '0';
  b.setAttribute('aria-keyshortcuts', 'D');
  if (S.stock.length) {
    const left = Math.ceil(S.stock.length / COLS);
    b.className = 'sp-card down sp-stockbtn';
    b.innerHTML = '<span class="cnt" aria-hidden="true">' + left + '</span>';
    b.setAttribute('aria-label', 'Deste: ' + left + ' dağıtım kaldı (' + S.stock.length + ' kart). Dağıtmak için Enter ya da D tuşu.');
  } else {
    b.className = 'sp-slot sp-stockbtn';
    b.innerHTML = '<span aria-hidden="true"></span>';
    b.setAttribute('aria-label', 'Deste boş; dağıtılacak kart kalmadı.');
  }
  st.appendChild(b);
}

function renderDone() {
  pileEls.d.forEach((p, i) => {
    const st = newStack(p);
    if (i < S.done.length) {
      // Tamamlanan setin Papaz'ı gösterilir (yalnızca görsel).
      const suit = S.done[i];
      const set = MODE_SETS[S.suits].indexOf(suit);
      const el = faceCard((set < 0 ? 0 : set) * 13 + 12, 'd', i, 12, false);
      st.appendChild(el);
    } else {
      const el = document.createElement('div');
      el.className = 'sp-slot sp-doneslot';
      el.setAttribute('aria-hidden', 'true');
      st.appendChild(el);
    }
  });
  $('sp-done-label').textContent = 'Tamamlanan diziler: ' + S.done.length + '/8';
}

function renderTableau() {
  S.tab.forEach((col, n) => {
    const st = newStack(pileEls.t[n]);
    if (!col.length) {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'sp-slot';
      el.dataset.pile = 't';
      el.dataset.n = String(n);
      el.setAttribute('aria-label', 'Boş sütun ' + (n + 1) + ', herhangi bir kart ya da dizi konabilir');
      el.innerHTML = '<span aria-hidden="true"></span>';
      st.appendChild(el);
    }
    col.forEach((c, i) => st.appendChild(c.up ? faceCard(c.id, 't', n, i, true) : backCard(n, i)));
    const down = col.filter((c) => !c.up).length;
    const top = col.length ? ', en üstte ' + cardName(col[col.length - 1].id) : '';
    pileEls.t[n].setAttribute('aria-label', 'Sütun ' + (n + 1) + ': ' + down + ' kapalı, ' + (col.length - down) + ' açık kart' + top);
  });
  layoutTableau();
}

/**
 * Kartların dikey bindirme payını ekran genişliğine ve sütun uzunluğuna göre ayarlar:
 * dar ekranda köşe yazısı okunacak kadar pay bırakılır, uzun sütunlar ekrana sığacak kadar sıkıştırılır.
 */
function layoutTableau() {
  if (!S) return;
  const w = pileEls.t[0].clientWidth;
  if (!w) return;
  const h = w * CARD_RATIO;
  const corner = Math.min(17, Math.max(10, w * 0.34)); // CSS'teki köşe yazısı boyutuyla aynı
  const upNat = Math.max(corner + 7, w * 0.28);
  const downNat = Math.max(4, w * 0.13);
  const minUp = corner + 4;
  const viewH = document.fullscreenElement === box ? box.clientHeight : window.innerHeight;
  const maxH = Math.max(h * 3.2, (viewH || 700) * 0.7);
  S.tab.forEach((col, n) => {
    const st = pileEls.t[n].firstElementChild;
    if (!st) return;
    let ups = 0;
    let downs = 0;
    for (let i = 0; i < col.length - 1; i++) { if (col[i].up) ups++; else downs++; }
    let up = upNat;
    let down = downNat;
    const natural = ups * up + downs * down;
    if (natural > 0 && natural + h > maxH) {
      const f = (maxH - h) / natural;
      up = Math.max(minUp, up * f);
      down = Math.max(2, down * f);
    }
    let y = 0;
    const els = st.querySelectorAll('.sp-card');
    els.forEach((el, i) => {
      el.style.top = y.toFixed(1) + 'px';
      if (i < col.length - 1) y += col[i].up ? up : down;
    });
    st.style.height = (y + h).toFixed(1) + 'px';
  });
}

/** Her yığında tek bir Tab durağı: sütunda taşınabilir dizinin ilk kartı (ya da boş yuva). */
function setRoving() {
  const sb = pileEls.s.querySelector('button');
  if (sb) sb.tabIndex = 0;
  pileEls.t.forEach((p, n) => {
    const items = [...p.querySelectorAll('button')];
    items.forEach((b) => { b.tabIndex = -1; });
    const col = S.tab[n];
    const target = col.length ? cardEl(n, runStart(col)) : items[0];
    if (target) target.tabIndex = 0;
    else if (items.length) items[items.length - 1].tabIndex = 0;
  });
}

function render() {
  lastTap = null; // her durum değişikliği çift tıklama penceresini kapatır
  if (!pendingFocus && board.contains(document.activeElement)) {
    const loc = locFromTarget(document.activeElement);
    if (loc && (loc.pile === 't' || loc.pile === 's')) pendingFocus = { pile: loc.pile, n: loc.n };
  }
  renderStock();
  renderDone();
  renderTableau();
  setRoving();
  applySelection();
  updateHud();
  if (pendingFocus) {
    const pf = pendingFocus;
    pendingFocus = null;
    const p = pf.pile === 's' ? pileEls.s : pileEls.t[pf.n];
    const t = p && (p.querySelector('button[tabindex="0"]') || p.querySelector('button'));
    if (t) t.focus({ preventScroll: true });
  }
}

function updateHud() {
  $('sp-moves').textContent = String(S.moves);
  $('sp-score').textContent = String(score());
  $('sp-seed').textContent = String(S.seed);
  $('sp-sets').textContent = S.done.length + '/8';
  renderTime();
  btnUndo.disabled = S.won || autoRunning || !history.length;
  btnHint.disabled = S.won || autoRunning;
  btnAuto.disabled = !canAuto();
  btnDeal.disabled = S.won || autoRunning || !S.stock.length;
  btnDeal.textContent = S.stock.length ? 'Dağıt (' + Math.ceil(S.stock.length / COLS) + ')' : 'Deste bitti';
  board.dataset.state = S.won ? 'won' : 'play';
  board.dataset.suits = String(S.suits);
}

function renderTime() { if (S) $('sp-time').textContent = fmtTime(S.elapsed); }

function renderRecord() {
  const m = S ? S.suits : store.suits;
  const st = store.stats[m];
  $('sp-st-mode').textContent = MODE_NAME[m];
  $('sp-st-played').textContent = String(st.played);
  $('sp-st-won').textContent = String(st.won);
  $('sp-st-rate').textContent = st.played ? '%' + Math.round((st.won / st.played) * 100) : '—';
  $('sp-st-score').textContent = st.bestScore === null ? '—' : String(st.bestScore);
  $('sp-st-time').textContent = st.bestTime === null ? '—' : fmtTime(st.bestTime * 1000);
}

// ---------------------------------------------------------------------------
// Seçim (tıkla-tıkla ve klavye)
// ---------------------------------------------------------------------------

function locFromTarget(t) {
  const el = t && t.closest ? t.closest('[data-pile]') : null;
  if (!el || !board.contains(el)) return null;
  const isCard = el.classList.contains('sp-card') && el.dataset.idx !== undefined && el.dataset.pile === 't';
  return {
    pile: el.dataset.pile,
    n: Number(el.dataset.n) || 0,
    idx: isCard ? Number(el.dataset.idx) : -1,
    act: el.dataset.act === '1',
  };
}

const keyOf = (l) => l.pile + l.n + ':' + l.idx;

function applySelection() {
  board.querySelectorAll('.sp-card.sel').forEach((e) => { e.classList.remove('sel'); e.removeAttribute('aria-pressed'); });
  if (!sel) return;
  pileEls.t[sel.c].querySelectorAll('.sp-card.up').forEach((e) => {
    if (Number(e.dataset.idx) >= sel.idx) {
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

function select(c, idx) {
  const chk = canPick(c, idx);
  if (!chk.ok) { sel = null; applySelection(); say(chk.reason); return; }
  clearHintMarks();
  sel = { c, idx };
  applySelection();
  const n = S.tab[c].length - idx;
  say('Seçildi: ' + cardName(S.tab[c][idx].id) + (n > 1 ? ' ve üstündeki ' + (n - 1) + ' kart' : '') + '. Bırakmak için bir sütuna dokunun (klavyede hedef sütuna gidip Enter).');
}

/** Hamleyi dener; başarıyla yapılırsa true. Gerekçeyi durum satırına yazar. */
function tryMove(c, idx, d) {
  const r = resolveMove(c, idx, d);
  if (!r.ok) { say('Hamle yapılamadı: ' + r.reason); return false; }
  const info = applyMove(c, r.idx, d);
  pendingFocus = { pile: 't', n: d };
  sel = null;
  render();
  if (!S.won) {
    const moved = info.ids.length > 1 ? info.ids.length + ' kart (' + cardName(info.ids[0]) + ' dizisi)' : cardName(info.ids[0]);
    say(moved + ' ' + colWord(d) + 'a taşındı.' + (info.flipped !== null ? ' Açılan kart: ' + cardName(info.flipped) + '.' : '') + setMsg(info.sets));
  }
  return true;
}

/** Bir yere dokunma/Enter: seçim yoksa seç, varsa oraya bırakmayı dene. */
function activate(loc) {
  if (!S || S.won || autoRunning) return;
  if (loc.pile === 's') { clearSel(true); doDeal(); return; }
  if (loc.pile !== 't') return;
  const col = S.tab[loc.n];
  const card = loc.idx >= 0 ? col[loc.idx] : null;
  if (sel) {
    if (sel.c === loc.n) {
      if (card && loc.idx === sel.idx) { clearSel(); return; }
      clearSel(true);
      if (card && card.up) select(loc.n, loc.idx);
      return;
    }
    const from = sel;
    sel = null;
    applySelection();
    tryMove(from.c, from.idx, loc.n);
    return;
  }
  if (card && card.up) { select(loc.n, loc.idx); return; }
  if (card) say('Kapalı kart; üstündeki kartları taşıdığınızda açılır.');
  else if (!col.length) say('Boş sütun. Önce taşımak istediğiniz kartı seçin.');
}

/** Dizi için en iyi hedef: aynı renkten büyük kart > herhangi bir büyük kart > boş sütun. */
function bestDestFor(c, idx) {
  if (!canPick(c, idx).ok) return null;
  const id = S.tab[c][idx].id;
  let same = -1;
  let any = -1;
  let empty = -1;
  for (let d = 0; d < COLS; d++) {
    if (d === c) continue;
    const dc = S.tab[d];
    if (!dc.length) { if (empty < 0 && idx > 0) empty = d; continue; }
    const top = dc[dc.length - 1].id;
    if (rankOf(top) !== rankOf(id) + 1) continue;
    if (suitOf(top) === suitOf(id)) { if (same < 0) same = d; } else if (any < 0) any = d;
  }
  if (same >= 0) return same;
  if (any >= 0) return any;
  return empty >= 0 ? empty : null;
}

/** Çift tık: diziyi en uygun yere gönderir. */
function quickMove(loc) {
  if (!S || S.won || autoRunning || loc.pile !== 't' || loc.idx < 0) return;
  const chk = canPick(loc.n, loc.idx);
  if (!chk.ok) { say(chk.reason); return; }
  const d = bestDestFor(loc.n, loc.idx);
  if (d === null) { say('Bu kart için uygun bir yer yok.'); return; }
  tryMove(loc.n, loc.idx, d);
}

function handleTap(loc) {
  const now = performance.now();
  const key = keyOf(loc);
  if (loc.act && loc.pile === 't' && lastTap && lastTap.key === key && now - lastTap.t < 420) {
    lastTap = null;
    clearSel(true);
    quickMove(loc);
    return;
  }
  lastTap = loc.act ? { key, t: now } : null;
  activate(loc);
}

// ---------------------------------------------------------------------------
// Sürükle-bırak (pointer olayları: fare, dokunmatik, kalem)
// ---------------------------------------------------------------------------

let pdown = null; // { x, y, id, loc }
let drag = null;  // { c, idx, ghost, srcEls, grabX, grabY, w, h, x, y }

board.addEventListener('pointerdown', (e) => {
  if (!S || S.won || autoRunning) return;
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
  if (loc.pile !== 't' || !loc.act || loc.idx < 0) return false;
  const chk = canPick(loc.n, loc.idx);
  if (!chk.ok) { say(chk.reason); return false; }
  clearSel(true);
  clearHintMarks();
  const els = [...pileEls.t[loc.n].querySelectorAll('.sp-card')].filter((el) => Number(el.dataset.idx) >= loc.idx);
  if (!els.length) return false;
  const r0 = els[0].getBoundingClientRect();
  const ghost = document.createElement('div');
  ghost.className = 'sp-ghost';
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
  drag = { c: loc.n, idx: loc.idx, ghost, srcEls: els, grabX: pdown.x - r0.left, grabY: pdown.y - r0.top, w: r0.width, h: r0.height, x: pdown.x, y: pdown.y };
  return true;
}

function positionGhost() {
  const br = board.getBoundingClientRect();
  drag.ghost.style.left = (drag.x - drag.grabX - br.left) + 'px';
  drag.ghost.style.top = (drag.y - drag.grabY - br.top) + 'px';
}

/** Sürüklenen kartın en çok örtüştüğü geçerli sütunu bulur (en az kartın %15'i örtüşmeli). */
function bestDrop() {
  const L = drag.x - drag.grabX;
  const T = drag.y - drag.grabY;
  const R = L + drag.w;
  const B = T + drag.h;
  const min = drag.w * drag.h * 0.15;
  let best = null; let bestOv = 0;
  let worst = null; let worstOv = 0;
  for (let d = 0; d < COLS; d++) {
    if (d === drag.c) continue;
    const rc = pileEls.t[d].getBoundingClientRect();
    const bottom = rc.bottom + drag.h * 0.4;
    const ov = Math.max(0, Math.min(R, rc.right) - Math.max(L, rc.left)) * Math.max(0, Math.min(B, bottom) - Math.max(T, rc.top));
    if (ov < min) continue;
    const r = resolveMove(drag.c, drag.idx, d);
    if (r.ok) { if (ov > bestOv) { best = d; bestOv = ov; } }
    else if (ov > worstOv) { worst = { d, reason: r.reason }; worstOv = ov; }
  }
  return { best, worst };
}

function markDrop(d) {
  board.querySelectorAll('.drop-ok').forEach((e) => e.classList.remove('drop-ok'));
  if (d !== null && d !== undefined) pileEls.t[d].classList.add('drop-ok');
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
  const { c, idx } = drag;
  endDrag();
  if (best !== null) tryMove(c, idx, best);
  else if (worst) say('Hamle yapılamadı: ' + worst.reason);
  else say('Kartlar yerine döndü. Taşımak için kartları bir sütunun üzerine bırakın.');
}

// ---------------------------------------------------------------------------
// Klavye: Tab sütunlar arasında, oklar sütun içinde ve sütunlar arasında;
// D dağıtır, Ctrl+Z geri alır, H ipucu verir, Esc seçimi kaldırır.
// ---------------------------------------------------------------------------

function focusPile(pile, n) {
  const p = pile === 's' ? pileEls.s : pileEls.t[n];
  const t = p.querySelector('button[tabindex="0"]') || p.querySelector('button');
  if (t) t.focus();
}

function navigate(loc, key) {
  if (loc.pile === 's') {
    if (key === 'ArrowRight' || key === 'ArrowDown') focusPile('t', 0);
    return;
  }
  const col = S.tab[loc.n];
  if (key === 'ArrowLeft') { if (loc.n === 0) focusPile('s', 0); else focusPile('t', loc.n - 1); }
  else if (key === 'ArrowRight') focusPile('t', Math.min(COLS - 1, loc.n + 1));
  else if (key === 'ArrowDown') {
    if (loc.idx >= 0 && loc.idx < col.length - 1) { const el = cardEl(loc.n, loc.idx + 1); if (el && el.tagName === 'BUTTON') el.focus(); }
  } else if (key === 'ArrowUp') {
    if (loc.idx > 0 && col[loc.idx - 1] && col[loc.idx - 1].up) { const el = cardEl(loc.n, loc.idx - 1); if (el && el.tagName === 'BUTTON') el.focus(); }
    else if (loc.n === 0) focusPile('s', 0);
  }
}

// Odaklanan düğme yığının tek Tab durağı olur (roving tabindex).
board.addEventListener('focusin', (e) => {
  const p = e.target.closest ? e.target.closest('.sp-pile') : null;
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
    default:
  }
});

document.addEventListener('keydown', (e) => {
  const t = e.target;
  const tag = t && t.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || (t && t.isContentEditable)) return;
  if (!(box.contains(t) || t === document.body || t === document.documentElement)) return;
  if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
    e.preventDefault();
    undo();
    return;
  }
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'd' || e.key === 'D') { e.preventDefault(); clearSel(true); doDeal(); }
  else if (e.key === 'h' || e.key === 'H') { e.preventDefault(); showHint(); }
});

// ---------------------------------------------------------------------------
// Düğmeler, ayarlar ve dağıtım numarası
// ---------------------------------------------------------------------------

function hideError() {
  elError.hidden = true;
  elError.classList.remove('is-active');
  elError.textContent = '';
  seedInput.removeAttribute('aria-invalid');
}

function showError(msg) {
  elError.textContent = msg;
  elError.hidden = false;
  elError.classList.add('is-active');
  seedInput.setAttribute('aria-invalid', 'true');
}

function currentSuits() {
  const m = Number(selSuits.value);
  return MODES.includes(m) ? m : 1;
}

function startNew(seed) {
  const suits = currentSuits();
  const strict = selRule.value !== 'free';
  store.suits = suits;
  store.strict = strict;
  saveStore();
  dealGame(seed, { suits, strict });
  renderRecord();
  say('Yeni dağıtım hazır (no ' + S.seed + ', ' + MODE_NAME[S.suits] + '). Bir kart seçerek ya da sürükleyerek başlayın.');
}

$('sp-new').addEventListener('click', () => { hideError(); startNew(newSeed()); });
$('sp-replay').addEventListener('click', () => { hideError(); startNew(S.seed); });
$('sp-again').addEventListener('click', () => { hideError(); startNew(newSeed()); pendingFocus = { pile: 's', n: 0 }; render(); });
btnUndo.addEventListener('click', undo);
btnHint.addEventListener('click', showHint);
btnAuto.addEventListener('click', autoComplete);
btnDeal.addEventListener('click', () => { clearSel(true); doDeal(); });

$('sp-seed-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = String(seedInput.value || '').trim();
  if (!raw) { showError('Dağıtım numarası boş. 1 ile 999999 arasında bir sayı yazın; mevcut oyunun numarası durum kutusundaki "Dağıtım" alanında görünür.'); return; }
  if (!/^\d+$/.test(raw)) { showError('Dağıtım numarası yalnızca rakamlardan oluşmalı (örnek: 4242). Harf, boşluk, nokta ya da eksi işareti kullanmayın.'); return; }
  const n = Number(raw);
  if (n < 1 || n > 999999) { showError('Dağıtım numarası 1 ile 999999 arasında olmalı. Daha kısa bir sayı deneyin.'); return; }
  hideError();
  startNew(n);
});

selSuits.addEventListener('change', () => {
  const m = currentSuits();
  store.suits = m;
  saveStore();
  if (S.moves === 0 && !S.won) {
    // Henüz hamle yapılmadıysa zorluk aynı dağıtıma hemen uygulanır.
    dealGame(S.seed, { suits: m, strict: S.strict });
    renderRecord();
    say('Zorluk uygulandı: ' + MODE_NAME[m] + '. Aynı dağıtım yeni takımlarla kuruldu.');
  } else {
    say('Zorluk kaydedildi (' + MODE_NAME[m] + '); yeni dağıtımda geçerli olacak.');
  }
});

selRule.addEventListener('change', () => {
  S.strict = selRule.value !== 'free';
  store.strict = S.strict;
  saveStore();
  render();
  say(S.strict ? 'Klasik kural: boş sütun varken desteden dağıtılamaz.' : 'Gevşek kural: boş sütun olsa da desteden dağıtabilirsiniz.');
});

// Tam ekran: yalnızca oyun kutusu gösterilir (reklam alanları kutunun dışındadır).
const fsBtn = $('sp-full');
if (!document.fullscreenEnabled || !box.requestFullscreen) {
  fsBtn.hidden = true;
} else {
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
    fsBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement));
    layoutTableau();
  });
}

// Ekran boyutu değişince yalnızca kart konumları yeniden hesaplanır.
let layoutRaf = 0;
const scheduleLayout = () => {
  if (layoutRaf || drag) return;
  layoutRaf = requestAnimationFrame(() => { layoutRaf = 0; layoutTableau(); });
};
window.addEventListener('resize', scheduleLayout);
if (typeof ResizeObserver === 'function') {
  let lastW = 0;
  new ResizeObserver(() => {
    const w = pileEls.t[0].clientWidth;
    if (w !== lastW) { lastW = w; scheduleLayout(); }
  }).observe(board);
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
    seed: S.seed, suits: S.suits, strict: S.strict, moves: S.moves, score: score(),
    elapsed: S.elapsed, started: S.counted, won: S.won,
    stock: S.stock.slice(), stockCount: S.stock.length,
    done: S.done.slice(),
    tab: S.tab.map((c) => c.map((x) => ({ id: x.id, up: x.up, suit: suitOf(x.id), rank: rankOf(x.id) }))),
    tableCount: S.tab.reduce((a, c) => a + c.length, 0),
    historyLength: history.length,
    selected: sel ? { c: sel.c, idx: sel.idx } : null,
    hints: findHints().map((h) => h.text),
    canAuto: canAuto(),
  };
}

/** Test durumu kurar. Geçersizse (yinelenen kart, toplam 104 değil, açık karttan sonra kapalı kart) false döner. */
function applyTestState(o) {
  try {
    if (!isObj(o)) return false;
    const suits = MODES.includes(o.suits) ? o.suits : S.suits;
    const tab = [];
    for (let c = 0; c < COLS; c++) {
      const src = (Array.isArray(o.tableau) && Array.isArray(o.tableau[c])) ? o.tableau[c] : [];
      const col = src.map((x) => (typeof x === 'number' ? { id: x, up: true } : { id: x && x.id, up: !(x && x.up === false) }));
      if (col.length) col[col.length - 1].up = true;
      let seenUp = false;
      for (const x of col) { if (x.up) seenUp = true; else if (seenUp) return false; }
      tab.push(col);
    }
    const stock = Array.isArray(o.stock) ? o.stock.slice() : [];
    const done = Array.isArray(o.done) ? o.done.slice() : [];
    const all = [...stock, ...tab.flat().map((x) => x.id)];
    if (all.some((v) => !Number.isInteger(v) || v < 0 || v >= TOTAL) || new Set(all).size !== all.length) return false;
    if (done.length > 8 || done.some((s) => !MODE_SETS[suits].includes(s))) return false;
    if (all.length + done.length * 13 !== TOTAL) return false;
    S = {
      seed: Number.isInteger(o.seed) ? o.seed : 1,
      suits,
      strict: typeof o.strict === 'boolean' ? o.strict : S.strict,
      stock, tab, done,
      moves: Number.isInteger(o.moves) && o.moves >= 0 ? o.moves : 0,
      elapsed: typeof o.elapsed === 'number' ? o.elapsed : 0,
      counted: !!o.counted, won: false,
    };
    resetUi();
    renderRecord();
    return true;
  } catch {
    return false;
  }
}

window.__orumcekSolitaireTest = Object.assign(() => readout(), {
  deal(seed, opts) { dealGame(seed, opts || {}); renderRecord(); return readout(); },
  setState: applyTestState,
  move(c, idx, d) {
    const chk = canMove(c, idx, d);
    if (!chk.ok) return chk;
    tryMove(c, idx, d);
    return { ok: true };
  },
  dealStock: () => doDeal(),
  stats: () => JSON.parse(JSON.stringify(store)),
});

// ---------------------------------------------------------------------------
// Başlangıç
// ---------------------------------------------------------------------------

dealGame(newSeed(), { suits: store.suits, strict: store.strict });
renderRecord();
say('Bir kart seçerek ya da sürükleyerek başlayın; hamle kalmayınca desteden dağıtın (D). Süre ilk hamlede işlemeye başlar.');
