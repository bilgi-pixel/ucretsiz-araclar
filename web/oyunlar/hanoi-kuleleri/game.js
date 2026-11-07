// Hanoi Kuleleri: diskleri soldaki çubuktan sağdaki çubuğa taşı; büyük disk küçüğün üstüne konmaz.
// Ses yok, ağ isteği yok. Kayıt yalnızca localStorage'da (ba-oyun-hanoi-kuleleri); bozuk kayıt varsayılana döner.

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-hanoi-kuleleri';
const MIN_DISCS = 3;
const MAX_DISCS = 8;
const COLORS = ['#e8554d', '#f08a3c', '#f2b134', '#58c46a', '#2fbfa8', '#4a9be8', '#a07ce8', '#e05fb0'];

/* ---------- Kayıt ---------- */
const store = { best: 0, discs: MIN_DISCS, moves: {} };
const clampInt = (v, lo, hi, d) => (Number.isInteger(v) && v >= lo && v <= hi ? v : d);
function loadStore() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      store.best = clampInt(o.best, 0, MAX_DISCS, 0);
      store.discs = clampInt(o.discs, MIN_DISCS, MAX_DISCS, MIN_DISCS);
      if (o.moves && typeof o.moves === 'object' && !Array.isArray(o.moves)) {
        for (let n = MIN_DISCS; n <= MAX_DISCS; n++) {
          const m = clampInt(o.moves[n], 1, 99999, 0);
          if (m) store.moves[n] = m;
        }
      }
    }
  } catch (e) { /* bozuk ya da kapalı depolama: varsayılanlarla devam */ }
}
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Durum ---------- */
const state = { n: MIN_DISCS, pegs: [[], [], []], moves: 0, undo: [], sel: -1, won: false };
const pegsEl = $('hn-pegs');
const msgEl = $('hn-msg');
const boxEl = $('oyun');
let focusIdx = 0;

const minMoves = (n) => 2 ** n - 1;
const say = (t) => { msgEl.textContent = t; };
const top = (p) => (state.pegs[p].length ? state.pegs[p][state.pegs[p].length - 1] : Infinity);
function canMove(a, b) {
  if (a === b || !state.pegs[a] || !state.pegs[b] || !state.pegs[a].length) return false;
  return top(a) < top(b);
}

function newGame(n, pegs) {
  state.n = n;
  state.pegs = pegs || [Array.from({ length: n }, (_, i) => n - i), [], []];
  state.moves = 0;
  state.undo = [];
  state.sel = -1;
  state.won = false;
  boxEl.dataset.phase = 'oyun';
  const box = $('sonuc');
  box.hidden = true;
  box.classList.remove('is-active');
  render();
  say(`${n} disk: tümünü 3. çubuğa taşıyın. En az ${minMoves(n)} hamlede yapılabilir.`);
}

function move(a, b) {
  if (state.won) return { ok: false, reason: 'bitti' };
  if (!canMove(a, b)) return { ok: false, reason: 'olmaz' };
  const d = state.pegs[a].pop();
  state.pegs[b].push(d);
  state.undo.push({ a, b });
  state.moves++;
  state.sel = -1;
  render();
  if (state.pegs[2].length === state.n) win();
  else say(`${d} numaralı disk ${a + 1}. çubuktan ${b + 1}. çubuğa taşındı.`);
  return { ok: true, disc: d };
}
function undo() {
  if (state.won || !state.undo.length) { say('Geri alınacak hamle yok.'); return false; }
  const { a, b } = state.undo.pop();
  state.pegs[a].push(state.pegs[b].pop());
  state.moves = Math.max(0, state.moves - 1);
  state.sel = -1;
  render();
  say('Son hamle geri alındı.');
  return true;
}

function win() {
  state.won = true;
  const n = state.n;
  let record = false;
  if (!store.moves[n] || state.moves < store.moves[n]) { store.moves[n] = state.moves; record = true; }
  if (n > store.best) store.best = n;
  store.discs = Math.min(n + 1, MAX_DISCS);
  saveStore();
  boxEl.dataset.phase = 'bitti';
  render();
  const perfect = state.moves === minMoves(n);
  $('sonuc-disk').textContent = String(n);
  $('sonuc-hamle').textContent = String(state.moves);
  $('sonuc-en-az').textContent = String(minMoves(n));
  $('sonuc-mukemmel').hidden = !perfect;
  $('sonuc-rekor').hidden = !record;
  $('hn-next').hidden = n >= MAX_DISCS;
  const box = $('sonuc');
  box.hidden = false;
  box.classList.add('is-active');
  say(`${n} disk ${state.moves} hamlede taşındı${perfect ? ' (en az hamle)' : ''}.`);
  (n >= MAX_DISCS ? $('hn-again') : $('hn-next')).focus();
}

/* ---------- Çizim ---------- */
function pegLabel(p) {
  const t = state.pegs[p];
  const list = t.length ? `alttan üste ${t.join(', ')} numaralı diskler` : 'boş';
  return `Çubuk ${p + 1}${p === 2 ? ' (hedef)' : ''}: ${list}${state.sel === p ? ' (seçili)' : ''}`;
}
function render() {
  if (pegsEl.children.length !== 3) {
    pegsEl.textContent = '';
    for (let p = 0; p < 3; p++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'hn-peg';
      b.dataset.i = String(p);
      b.addEventListener('click', () => choose(p));
      b.addEventListener('focus', () => { focusIdx = p; });
      pegsEl.appendChild(b);
    }
  }
  for (let p = 0; p < 3; p++) {
    const b = pegsEl.children[p];
    b.setAttribute('aria-label', pegLabel(p));
    b.setAttribute('aria-pressed', String(state.sel === p));
    b.classList.toggle('is-sel', state.sel === p);
    b.classList.toggle('is-goal', p === 2);
    b.disabled = state.won;
    b.textContent = '';
    const rod = document.createElement('span');
    rod.className = 'hn-rod';
    b.appendChild(rod);
    state.pegs[p].forEach((d) => {
      const s = document.createElement('span');
      s.className = 'hn-disc';
      s.dataset.size = String(d);
      s.style.width = `${30 + (d / state.n) * 66}%`;
      s.style.background = COLORS[(d - 1) % COLORS.length];
      s.textContent = String(d);
      b.appendChild(s);
    });
  }
  $('hn-discs').textContent = String(state.n);
  $('hn-moves').textContent = String(state.moves);
  $('hn-min').textContent = String(minMoves(state.n));
  $('hn-best').textContent = String(store.moves[state.n] || '–');
  $('hn-undo').disabled = state.won || !state.undo.length;
  $('hn-less').disabled = state.n <= MIN_DISCS;
  $('hn-more').disabled = state.n >= MAX_DISCS;
}

function choose(p) {
  if (state.won) return;
  if (state.sel < 0) {
    if (!state.pegs[p].length) { say(`Çubuk ${p + 1} boş; önce disk bulunan bir çubuk seçin.`); return; }
    state.sel = p;
    render();
    say(`Çubuk ${p + 1} seçildi (üstteki disk ${top(p)}). Taşımak için hedef çubuğu seçin.`);
    return;
  }
  if (state.sel === p) { state.sel = -1; render(); say('Seçim iptal edildi.'); return; }
  const from = state.sel;
  if (!canMove(from, p)) {
    say(`Büyük disk küçük diskin üstüne konmaz: ${top(from)} numaralı disk, ${top(p)} numaralı diskin üstüne taşınamaz.`);
    return;
  }
  move(from, p);
}

/* ---------- Klavye ---------- */
boxEl.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (k === 'ArrowRight' || k === 'ArrowLeft') {
    if (state.won) return;
    e.preventDefault();
    const i = k === 'ArrowRight' ? (focusIdx + 1) % 3 : (focusIdx + 2) % 3;
    pegsEl.children[i].focus();
  } else if (k === 'Escape') {
    if (state.sel >= 0) { state.sel = -1; render(); say('Seçim iptal edildi.'); }
  } else if (k === 'u' || k === 'U') {
    undo();
  } else if (k === 'r' || k === 'R') {
    restart();
  } else if (/^[1-3]$/.test(k) && !state.won) {
    const i = Number(k) - 1;
    pegsEl.children[i].focus();
    choose(i);
  }
});

function restart() { newGame(state.n); say(`${state.n} disk baştan başladı.`); }
function setDiscs(n) {
  const v = clampInt(n, MIN_DISCS, MAX_DISCS, state.n);
  store.discs = v;
  saveStore();
  newGame(v);
}
$('hn-undo').addEventListener('click', undo);
$('hn-restart').addEventListener('click', restart);
$('hn-less').addEventListener('click', () => setDiscs(state.n - 1));
$('hn-more').addEventListener('click', () => setDiscs(state.n + 1));
$('hn-next').addEventListener('click', () => { setDiscs(state.n + 1); pegsEl.children[0].focus(); });
$('hn-again').addEventListener('click', () => { restart(); pegsEl.children[0].focus(); });

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
  n: state.n, pegs: state.pegs.map((p) => p.slice()), moves: state.moves, won: state.won, sel: state.sel,
  best: store.best, bestMoves: Object.assign({}, store.moves), canUndo: state.undo.length > 0,
});
window.__hanoiTest = Object.assign(snapshot, {
  move,
  undo,
  newGame: (n) => { newGame(n); return snapshot(); },
  setPegs: (n, pegs) => { newGame(n, pegs.map((p) => p.slice())); return snapshot(); },
});

loadStore();
newGame(store.discs);
