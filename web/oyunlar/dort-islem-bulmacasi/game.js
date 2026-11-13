// Dört İşlem Bulmacası: dört sayıyı dört işlemle birleştirip hedef sayıya ulaş. Her sayı tam bir kez kullanılır.
// Bulmacalar tohumlu üretilir ve her birinin en az bir çözümü vardır (çözücü kesirli aritmetikle tam arar).
// Ses yok, ağ isteği yok. İlerleme yalnızca localStorage'da (ba-oyun-dort-islem).

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-dort-islem';

/* ---------- Kesir aritmetiği ---------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
function fr(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; }
const OPS = {
  '+': (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d),
  '-': (a, b) => fr(a.n * b.d - b.n * a.d, a.d * b.d),
  '*': (a, b) => fr(a.n * b.n, a.d * b.d),
  '/': (a, b) => (b.n === 0 ? null : fr(a.n * b.d, a.d * b.n)),
};
const SYM = { '+': '+', '-': '−', '*': '×', '/': '÷' };
const show = (f) => (f.d === 1 ? String(f.n) : `${f.n}/${f.d}`);

/** Tüm sayılarla hedefe ulaşan ilk ifadeyi döndürür; yoksa null. */
export function solve(nums, target) {
  const t = fr(target);
  const rec = (items) => {
    if (items.length === 1) return items[0].v.n === t.n && items[0].v.d === t.d ? items[0].e : null;
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if (i === j) continue;
        const rest = items.filter((_, k) => k !== i && k !== j);
        for (const op of ['+', '-', '*', '/']) {
          if ((op === '+' || op === '*') && i > j) continue; // değişme özelliği: tekrar arama
          const v = OPS[op](items[i].v, items[j].v);
          if (!v) continue;
          const e = rest.length ? `(${items[i].e} ${SYM[op]} ${items[j].e})` : `${items[i].e} ${SYM[op]} ${items[j].e}`;
          const r = rec([...rest, { v, e }]);
          if (r) return r;
        }
      }
    }
    return null;
  };
  return rec(nums.map((n) => ({ v: fr(n), e: String(n) })));
}

/** Dört sayıyla ulaşılabilen tüm tam sayı sonuçları. */
function reachable(nums) {
  const out = new Set();
  const rec = (vals) => {
    if (vals.length === 1) { if (vals[0].d === 1) out.add(vals[0].n); return; }
    for (let i = 0; i < vals.length; i++) {
      for (let j = 0; j < vals.length; j++) {
        if (i === j) continue;
        const rest = vals.filter((_, k) => k !== i && k !== j);
        for (const op of ['+', '-', '*', '/']) {
          if ((op === '+' || op === '*') && i > j) continue;
          const v = OPS[op](vals[i], vals[j]);
          if (v) rec([...rest, v]);
        }
      }
    }
  };
  rec(nums.map((n) => fr(n)));
  return out;
}

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

/** Bulmaca numarasına göre sayılar ve hedef. İlk bulmacalar küçük sayılar ve küçük hedeflerle başlar. */
export function generate(no) {
  const rand = rng(no * 7919 + 13);
  const maxN = no <= 5 ? 6 : no <= 15 ? 9 : 12;
  const [lo, hi] = no <= 5 ? [8, 15] : no <= 15 ? [10, 30] : [15, 60];
  for (let attempt = 0; attempt < 100; attempt++) {
    const nums = Array.from({ length: 4 }, () => 1 + Math.floor(rand() * maxN));
    const targets = [...reachable(nums)].filter((v) => v >= lo && v <= hi && !nums.includes(v)).sort((a, b) => a - b);
    if (targets.length) return { nums, target: targets[Math.floor(rand() * targets.length)] };
  }
  return { nums: [3, 3, 8, 8], target: 24 };
}

/* ---------- Kayıt ---------- */
const store = { no: 1, solved: 0, streak: 0, bestStreak: 0 };
const clampInt = (v, lo, hi, d) => (Number.isInteger(v) && v >= lo && v <= hi ? v : d);
function loadStore() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      store.no = clampInt(o.no, 1, 99999, 1);
      store.solved = clampInt(o.solved, 0, 99999, 0);
      store.streak = clampInt(o.streak, 0, 99999, 0);
      store.bestStreak = clampInt(o.bestStreak, 0, 99999, 0);
    }
  } catch (e) { /* bozuk ya da kapalı depolama */ }
}
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Oyun durumu ---------- */
const boxEl = $('oyun');
const cardsEl = $('di-cards');
const opBtns = [...document.querySelectorAll('.di-op')];
const state = { nums: [], target: 0, cards: [], sel: -1, op: null, undo: [], won: false, hinted: false, next: 1 };
const say = (t) => { $('di-msg').textContent = t; };

function startPuzzle(no, custom) {
  const p = custom || generate(no);
  state.nums = p.nums.slice();
  state.target = p.target;
  state.cards = p.nums.map((n, i) => ({ v: fr(n), e: String(n), id: i }));
  state.next = 4;
  state.sel = -1; state.op = null; state.undo = []; state.won = false; state.hinted = false;
  $('sonuc').hidden = true; $('sonuc').classList.remove('is-active');
  boxEl.dataset.phase = 'oyun';
  render();
}

function pick(i) {
  if (state.won || i < 0 || i >= state.cards.length) return;
  if (state.sel === -1 || (state.op === null && state.sel !== i)) { state.sel = i; render(); return; }
  if (state.sel === i) { state.sel = -1; state.op = null; render(); return; }
  const a = state.cards[state.sel];
  const b = state.cards[i];
  const v = OPS[state.op](a.v, b.v);
  if (!v) { say('Sıfıra bölünemez. Başka bir işlem seçin.'); return; }
  state.undo.push(state.cards.map((c) => ({ ...c })));
  const e = `${a.e} ${SYM[state.op]} ${b.e}`;
  const merged = { v, e: `(${e})`, id: state.next++ };
  const cards = state.cards.slice();
  cards[i] = merged;
  cards.splice(state.sel, 1);
  state.cards = cards;
  state.sel = cards.indexOf(merged);
  state.op = null;
  say(`${e} = ${show(v)}`);
  if (cards.length === 1) check();
  render();
}

function setOp(op) {
  if (state.won || !OPS[op]) return;
  if (state.sel === -1) { say('Önce bir sayı kartı seçin.'); return; }
  state.op = state.op === op ? null : op;
  render();
}

function check() {
  const v = state.cards[0].v;
  if (v.d === 1 && v.n === state.target) {
    state.won = true;
    const record = !state.hinted && store.streak + 1 > store.bestStreak;
    store.solved++;
    store.streak = state.hinted ? 0 : store.streak + 1;
    if (record) store.bestStreak = store.streak;
    store.no++;
    saveStore();
    boxEl.dataset.phase = 'bitti';
    $('sonuc-ifade').textContent = `${state.cards[0].e.replace(/^\((.*)\)$/, '$1')} = ${state.target}`;
    $('sonuc-seri').textContent = String(store.streak);
    $('sonuc-rekor').hidden = !record || store.streak < 2;
    $('sonuc').hidden = false; $('sonuc').classList.add('is-active');
    say(state.hinted ? 'Çözüldü. İpucu kullandığınız için seri sıfırlandı.' : `Tebrikler! Hedef ${state.target} bulundu.`);
  } else {
    say(`Sonuç ${show(v)} oldu, hedef ${state.target}. Geri alın ya da baştan deneyin.`);
  }
}

function undo() {
  if (state.won || !state.undo.length) return;
  state.cards = state.undo.pop();
  state.sel = -1; state.op = null;
  say('Son işlem geri alındı.');
  render();
}
function restart() { if (!state.won) { startPuzzle(store.no, { nums: state.nums, target: state.target }); say('Bulmaca baştan başladı.'); } }
function hint() {
  if (state.won) return;
  const s = solve(state.nums, state.target);
  state.hinted = true;
  say(s ? `Bir çözüm: ${s} = ${state.target}` : 'Bu bulmacanın çözümü bulunamadı.');
}
function skip() {
  store.streak = 0; store.no++; saveStore();
  startPuzzle(store.no);
  say(`Yeni bulmaca: ${state.nums.join(', ')} ile ${state.target} yapın.`);
}

function render() {
  // Kartlar yeniden çizilirken klavye odağı kaybolmasın.
  const hadFocus = cardsEl.contains(document.activeElement);
  cardsEl.replaceChildren(...state.cards.map((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'di-card' + (i === state.sel ? ' is-sel' : '') + (c.v.d !== 1 ? ' is-frac' : '');
    b.textContent = show(c.v);
    b.dataset.i = String(i);
    b.setAttribute('aria-pressed', String(i === state.sel));
    b.setAttribute('aria-label', `Sayı ${show(c.v)}${c.e.length > 3 ? `, ${c.e} işleminden` : ''}`);
    b.disabled = state.won;
    b.addEventListener('click', () => pick(i));
    return b;
  }));
  for (const b of opBtns) {
    b.setAttribute('aria-pressed', String(b.dataset.op === state.op));
    b.disabled = state.won;
  }
  $('di-target').textContent = String(state.target);
  $('di-no').textContent = String(store.no);
  $('di-streak').textContent = String(store.streak);
  $('di-solved').textContent = String(store.solved);
  $('di-goal').textContent = String(state.target);
  $('di-undo').disabled = state.won || !state.undo.length;
  if (hadFocus && !state.won) cardsEl.children[state.sel >= 0 ? state.sel : 0]?.focus();
}

/* ---------- Olaylar ---------- */
for (const b of opBtns) b.addEventListener('click', () => setOp(b.dataset.op));
$('di-undo').addEventListener('click', undo);
$('di-restart').addEventListener('click', restart);
$('di-hint').addEventListener('click', hint);
$('di-new').addEventListener('click', skip);
$('di-next').addEventListener('click', () => { startPuzzle(store.no); say(`Bulmaca ${store.no}: ${state.nums.join(', ')} ile ${state.target} yapın.`); cardsEl.firstChild?.focus(); });
boxEl.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (k >= '1' && k <= '4') { e.preventDefault(); pick(Number(k) - 1); }
  else if (k === '+' || k === '-' || k === '*' || k === '/') { e.preventDefault(); setOp(k); }
  else if (k === 'x' || k === 'X') { e.preventDefault(); setOp('*'); }
  else if (k === 'u' || k === 'U' || k === 'Backspace') { e.preventDefault(); undo(); }
  else if (k === 'r' || k === 'R') restart();
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
  no: store.no, nums: state.nums.slice(), target: state.target, cards: state.cards.map((c) => show(c.v)), sel: state.sel, op: state.op,
  won: state.won, solved: store.solved, streak: store.streak, bestStreak: store.bestStreak, canUndo: state.undo.length > 0,
});
window.__dortIslemTest = Object.assign(snapshot, {
  pick, setOp, undo, hint, solve, generate,
  setPuzzle: (nums, target) => { startPuzzle(store.no, { nums, target }); return snapshot(); },
});

loadStore();
startPuzzle(store.no);
say(`Bulmaca ${store.no}: ${state.nums.join(', ')} sayılarıyla ${state.target} yapın.`);
