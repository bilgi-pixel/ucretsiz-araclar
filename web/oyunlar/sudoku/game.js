// Sudoku — arayüz ve oyun akışı. Üretici/çözücü core.js içindedir.
// Gizlilik: ağ isteği yok; kayıt, en iyi süreler ve tercihler yalnızca localStorage'da tutulur.
import { LEVELS, generate, hashString, peersOf, candidates } from './core.js';

const $ = (id) => document.getElementById(id);

const KEYS = { save: 'ba-sudoku-kayit', best: 'ba-sudoku-en-iyi', daily: 'ba-sudoku-gunluk', prefs: 'ba-sudoku-tercih' };
const DAILY_LEVEL = 'orta';

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* yoksay */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* yoksay */ }
  },
};

const el = {
  box: $('sd-oyun'), board: $('sd-tahta'), wrap: $('sd-tahta-kutu'), pad: $('sd-rakamlar'), status: $('sd-durum'),
  time: $('sd-sure'), mode: $('sd-mod'), hintCount: $('sd-ipucu-sayi'), level: $('sd-seviye'),
  newBtn: $('sd-yeni'), dailyBtn: $('sd-gunluk'), notes: $('sd-not'), undo: $('sd-geri'), hint: $('sd-ipucu'),
  pause: $('sd-duraklat'), pauseCover: $('sd-duraklatildi'), resume: $('sd-devam'), print: $('sd-yazdir'), fullscreen: $('sd-tamekran'),
  errors: $('sd-hata'), best: $('sd-en-iyi'), sheet: $('sd-baski'),
};

const PEERS = Array.from({ length: 81 }, (_, i) => new Set(peersOf(i)));
const POP = (m) => { let c = 0; while (m) { c += m & 1; m >>= 1; } return c; };

// ---- Durum ----
let S = null;          // aktif oyun (aşağıdaki alanlar)
// S = { level, seed, daily, puzzle, solution, values, notes, locked (0 boş/kullanıcı, 2 ipucu), elapsedMs, hints, done }
let sel = 0;
let notesMode = false;
let paused = false;
let generating = false;
let showErrors = true;
let runStart = 0;
let timerId = 0;
let lastSaveAt = 0;
let undoStack = [];
let armed = null;
let armTimer = 0;
let cellNodes = [];

// ---- Yardımcılar ----
function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function randomSeed() {
  try { return crypto.getRandomValues(new Uint32Array(1))[0]; } catch { return (Date.now() ^ (performance.now() * 1000)) >>> 0; }
}

const setStatus = (text) => { el.status.textContent = text; };
const givenCount = (puzzle) => puzzle.reduce((n, v) => n + (v ? 1 : 0), 0);
const hasProgress = () => !!S && S.puzzle.some((g, i) => !g && (S.values[i] || S.notes[i]));

// ---- Tahta DOM'u (bir kez kurulur) ----
function buildBoard() {
  el.board.textContent = '';
  cellNodes = [];
  for (let r = 0; r < 9; r++) {
    const row = document.createElement('div');
    row.className = 'sd-row';
    row.setAttribute('role', 'row');
    for (let c = 0; c < 9; c++) {
      const i = r * 9 + c;
      const cell = document.createElement('div');
      cell.className = 'sd-cell';
      cell.setAttribute('role', 'gridcell');
      cell.tabIndex = i === 0 ? 0 : -1;
      cell.dataset.i = String(i);
      cell.dataset.r = String(r);
      cell.dataset.c = String(c);
      const v = document.createElement('span');
      v.className = 'sd-v';
      const n = document.createElement('span');
      n.className = 'sd-n';
      n.setAttribute('aria-hidden', 'true');
      for (let d = 1; d <= 9; d++) n.append(document.createElement('i'));
      cell.append(v, n);
      cellNodes.push(cell);
      row.append(cell);
    }
    el.board.append(row);
  }
}

function render() {
  if (!S) return;
  const selV = S.values[sel];
  for (let i = 0; i < 81; i++) {
    const node = cellNodes[i];
    const v = S.values[i];
    const nm = S.notes[i];
    const given = S.puzzle[i] !== 0;
    const hint = S.locked[i] === 2;
    const wrong = showErrors && v !== 0 && !given && !hint && v !== S.solution[i];
    let cls = 'sd-cell';
    if (given) cls += ' is-given';
    if (hint) cls += ' is-hint';
    if (i === sel) cls += ' is-selected';
    else if (PEERS[sel].has(i)) cls += ' is-peer';
    if (selV && v === selV && i !== sel) cls += ' is-same';
    if (wrong) cls += ' is-wrong';
    const sig = `${cls}|${v}|${nm}`;
    if (node._sig === sig) continue;
    node._sig = sig;
    node.className = cls;
    node.dataset.v = v ? String(v) : '';
    node.dataset.given = given ? '1' : '0';
    node.dataset.hint = hint ? '1' : '0';
    node.dataset.wrong = wrong ? '1' : '0';
    node.dataset.notes = nm ? String(nm) : '';
    node.firstChild.textContent = v ? String(v) : '';
    const dots = node.lastChild.children;
    for (let d = 0; d < 9; d++) dots[d].textContent = !v && nm & (1 << d) ? String(d + 1) : '';
    const where = `Satır ${Math.floor(i / 9) + 1}, sütun ${(i % 9) + 1}`;
    let what;
    if (given) what = `verilen ${v}`;
    else if (v) what = `${hint ? 'ipucu ' : 'değer '}${v}${wrong ? ', yanlış' : ''}`;
    else if (nm) what = 'notlar ' + Array.from({ length: 9 }, (_, d) => (nm & (1 << d) ? d + 1 : 0)).filter(Boolean).join(' ');
    else what = 'boş';
    node.setAttribute('aria-label', `${where}, ${what}`);
  }
  updatePad();
  el.undo.disabled = undoStack.length === 0 || S.done;
  el.hintCount.textContent = String(S.hints);
}

function updatePad() {
  const count = new Array(10).fill(0);
  for (const v of S.values) if (v) count[v]++;
  for (const btn of el.pad.querySelectorAll('[data-d]')) {
    const d = Number(btn.dataset.d);
    if (!d) continue;
    const left = Math.max(0, 9 - count[d]);
    btn.querySelector('small').textContent = String(left);
    btn.classList.toggle('is-done', left === 0);
    btn.setAttribute('aria-label', `${d} rakamını gir, ${left} adet kaldı`);
  }
}

function renderBest() {
  const best = store.get(KEYS.best, {});
  const daily = store.get(KEYS.daily, {});
  const rows = Object.entries(LEVELS).map(([k, v]) => `<li><span>${v.label}</span><strong>${best[k] ? formatTime(best[k]) : '—'}</strong></li>`);
  const today = daily[todayStr()];
  rows.push(`<li><span>Günlük bulmaca (bugün)</span><strong>${today ? formatTime(today) : '—'}</strong></li>`);
  el.best.innerHTML = rows.join('');
}

function buildSheet() {
  let rows = '';
  for (let r = 0; r < 9; r++) {
    let tds = '';
    for (let c = 0; c < 9; c++) tds += `<td>${S.puzzle[r * 9 + c] || ''}</td>`;
    rows += `<tr>${tds}</tr>`;
  }
  const kind = S.daily ? `Günlük bulmaca ${S.daily}` : 'Rastgele bulmaca';
  el.sheet.innerHTML = `<h2>Sudoku – ${LEVELS[S.level].label}</h2><p>${kind} · ${givenCount(S.puzzle)} verilen rakam · Her satır, sütun ve 3×3 kutuda 1–9 birer kez yer almalıdır.</p><table class="sd-print-grid"><tbody>${rows}</tbody></table><p class="sd-print-note">Bilişim Ajans · araclar.bilisimajans.com/oyunlar/sudoku/ · %100 ücretsiz, kayıt yok, dosya yüklenmez.</p>`;
}

function updateModeLabel() {
  el.mode.textContent = S.daily ? `Günlük bulmaca · ${S.daily} · ${LEVELS[S.level].label}` : `${LEVELS[S.level].label} seviye · rastgele`;
}

// ---- Zamanlayıcı ----
function tick() {
  S.elapsedMs = performance.now() - runStart;
  el.time.textContent = formatTime(S.elapsedMs);
  el.time.dataset.value = String(Math.floor(S.elapsedMs / 1000));
  if (performance.now() - lastSaveAt > 10000) save();
}
function startTimer() {
  runStart = performance.now() - S.elapsedMs;
  clearInterval(timerId);
  timerId = setInterval(tick, 500);
  tick();
}
function stopTimer() {
  clearInterval(timerId);
  timerId = 0;
}

function setPaused(on) {
  if (!S || S.done || generating || on === paused) return;
  paused = on;
  if (on) { tick(); stopTimer(); save(); } else { startTimer(); }
  el.box.classList.toggle('is-paused', on);
  el.pauseCover.hidden = !on;
  el.pause.textContent = on ? 'Devam et' : 'Duraklat';
  setStatus(on ? 'Oyun duraklatıldı; süre işlemiyor. Devam etmek için düğmeye basın.' : 'Oyun sürüyor.');
  if (on) el.resume.focus(); else cellNodes[sel].focus();
}

// ---- Kaydet / devam ----
function save() {
  if (!S || S.done) return;
  lastSaveAt = performance.now();
  store.set(KEYS.save, {
    v: 1, level: S.level, seed: S.seed, daily: S.daily,
    puzzle: S.puzzle.join(''), solution: S.solution.join(''), values: S.values.join(''), locked: S.locked.join(''),
    notes: Array.from(S.notes), elapsedMs: Math.round(S.elapsedMs), hints: S.hints,
  });
}

function loadSaved() {
  const d = store.get(KEYS.save, null);
  try {
    if (!d || d.v !== 1 || !LEVELS[d.level]) return null;
    for (const k of ['puzzle', 'solution', 'values', 'locked']) if (typeof d[k] !== 'string' || !/^[0-9]{81}$/.test(d[k])) return null;
    if (!Array.isArray(d.notes) || d.notes.length !== 81 || d.notes.some((n) => !Number.isInteger(n) || n < 0 || n > 511)) return null;
    const puzzle = Int8Array.from(d.puzzle, Number);
    const solution = Int8Array.from(d.solution, Number);
    const values = Int8Array.from(d.values, Number);
    for (let i = 0; i < 81; i++) {
      if (!solution[i]) return null;
      if (puzzle[i] && (puzzle[i] !== solution[i] || values[i] !== puzzle[i])) return null;
    }
    return {
      level: d.level, seed: d.seed >>> 0, daily: typeof d.daily === 'string' ? d.daily : null, puzzle, solution, values,
      notes: Uint16Array.from(d.notes), locked: Uint8Array.from(d.locked, Number),
      elapsedMs: Math.max(0, Number(d.elapsedMs) || 0), hints: Math.max(0, Number(d.hints) || 0), done: false,
    };
  } catch { return null; }
}

// ---- Oyun başlat ----
function activate(game, message) {
  S = game;
  undoStack = [];
  paused = false;
  el.box.classList.remove('is-won', 'is-paused');
  el.pauseCover.hidden = true;
  el.pause.textContent = 'Duraklat';
  sel = Math.max(0, S.puzzle.findIndex((g, i) => !g && S.values[i] !== S.solution[i]));
  for (const n of cellNodes) { n._sig = ''; n.tabIndex = -1; }
  cellNodes[sel].tabIndex = 0;
  updateModeLabel();
  buildSheet();
  render();
  renderBest();
  startTimer();
  save();
  setStatus(message);
  el.box.dataset.ready = '1';
}

async function startGame({ level, seed, daily = null }) {
  if (generating) return;
  generating = true;
  stopTimer();
  el.box.dataset.ready = '0';
  setStatus('Bulmaca üretiliyor…');
  await new Promise((r) => setTimeout(r, 30)); // arayüz "üretiliyor" mesajını çizebilsin
  const { puzzle, solution } = generate(level, seed);
  generating = false;
  activate({
    level, seed, daily, puzzle, solution, values: Int8Array.from(puzzle), notes: new Uint16Array(81),
    locked: new Uint8Array(81), elapsedMs: 0, hints: 0, done: false,
  }, `Yeni bulmaca hazır: ${LEVELS[level].label}, ${givenCount(puzzle)} verilen rakam. Kare seçip rakam girin.`);
}

// Devam eden oyun varsa önce onay iste (aynı düğmeye ikinci basış onaydır).
function guarded(btn, fn) {
  if (S && !S.done && hasProgress() && armed !== btn) {
    disarm();
    armed = btn;
    btn.dataset.armed = '1';
    btn.textContent = 'Emin misiniz? Evet, yeni oyun';
    setStatus('Mevcut oyunun ilerlemesi silinecek. Onaylamak için aynı düğmeye tekrar basın.');
    armTimer = setTimeout(disarm, 5000);
    return;
  }
  disarm();
  fn();
}
function disarm() {
  clearTimeout(armTimer);
  if (armed) { armed.textContent = armed.dataset.label; delete armed.dataset.armed; armed = null; }
}

function newRandom() {
  const level = LEVELS[el.level.value] ? el.level.value : 'orta';
  store.set(KEYS.prefs, { ...store.get(KEYS.prefs, {}), level });
  startGame({ level, seed: randomSeed() });
}

function newDaily() {
  const date = todayStr();
  startGame({ level: DAILY_LEVEL, seed: hashString(`ba-sudoku-gunluk-${date}`), daily: date });
}

// ---- Düzenleme ----
const canEdit = (i) => !!S && !S.done && !paused && !generating && S.puzzle[i] === 0 && S.locked[i] !== 2;

function pushUndo() {
  undoStack.push({ v: S.values.slice(), n: S.notes.slice(), l: S.locked.slice() });
  if (undoStack.length > 300) undoStack.shift();
}

function select(i) {
  if (i === sel) return;
  cellNodes[sel].tabIndex = -1;
  sel = i;
  cellNodes[i].tabIndex = 0;
  render();
}

function afterChange() {
  render();
  save();
  checkWin();
}

function enter(d) {
  if (!S || S.done || paused || generating) return;
  if (!canEdit(sel)) { setStatus('Bu kare verilen ya da ipucuyla açılan bir rakam içeriyor; değiştirilemez. Boş bir kare seçin.'); return; }
  const i = sel;
  if (notesMode) {
    if (S.values[i]) { setStatus('Dolu karede not tutulamaz. Önce rakamı silin ya da not modunu kapatın.'); return; }
    pushUndo();
    S.notes[i] ^= 1 << (d - 1);
  } else {
    if (S.values[i] === d) return;
    pushUndo();
    S.values[i] = d;
    S.notes[i] = 0;
    for (const j of PEERS[i]) S.notes[j] &= ~(1 << (d - 1)); // aynı satır/sütun/kutudaki notlardan rakamı temizle
  }
  afterChange();
}

function eraseCell() {
  if (!S || !canEdit(sel)) return;
  if (!S.values[sel] && !S.notes[sel]) return;
  pushUndo();
  S.values[sel] = 0;
  S.notes[sel] = 0;
  afterChange();
}

function undo() {
  if (!S || S.done || paused || !undoStack.length) return;
  const snap = undoStack.pop();
  S.values = snap.v; S.notes = snap.n; S.locked = snap.l;
  render();
  save();
  setStatus('Son hamle geri alındı.');
}

function giveHint() {
  if (!S || S.done || paused || generating) return;
  const needs = (i) => S.puzzle[i] === 0 && S.locked[i] !== 2 && S.values[i] !== S.solution[i];
  let target = -1;
  if (needs(sel)) {
    target = sel;
  } else {
    // önce yanlış doldurulmuş kare, yoksa en az adayı olan boş kare
    for (let i = 0; i < 81 && target < 0; i++) if (needs(i) && S.values[i]) target = i;
    if (target < 0) {
      let bestCnt = 99;
      for (let i = 0; i < 81; i++) {
        if (!needs(i)) continue;
        const cnt = POP(candidates(S.values, i));
        if (cnt < bestCnt) { bestCnt = cnt; target = i; }
      }
    }
  }
  if (target < 0) return;
  pushUndo();
  const d = S.solution[target];
  S.values[target] = d;
  S.notes[target] = 0;
  S.locked[target] = 2;
  for (const j of PEERS[target]) S.notes[j] &= ~(1 << (d - 1));
  S.hints++;
  select(target);
  afterChange();
  if (!S.done) setStatus(`İpucu: ${Math.floor(target / 9) + 1}. satır, ${(target % 9) + 1}. sütun = ${d}. İpucu kullanılan oyunlar en iyi süreye yazılmaz.`);
}

function checkWin() {
  if (S.values.every((v, i) => v === S.solution[i])) { finish(); return; }
  if (S.values.every((v) => v !== 0)) {
    setStatus(showErrors
      ? 'Tahta dolu ama bazı rakamlar yanlış. Kırmızı işaretli kareleri düzeltin.'
      : 'Tahta dolu ama çözüm doğru değil. Yanlışları görmek için "Hataları göster" seçeneğini açın.');
  }
}

function finish() {
  tick();
  stopTimer();
  S.done = true;
  const ms = Math.max(1, Math.round(S.elapsedMs));
  const notes = [];
  if (S.daily) {
    const daily = store.get(KEYS.daily, {});
    if (!daily[S.daily] || ms < daily[S.daily]) daily[S.daily] = ms;
    const keys = Object.keys(daily).sort().slice(-60);
    store.set(KEYS.daily, Object.fromEntries(keys.map((k) => [k, daily[k]])));
    notes.push('Günlük bulmaca süreniz kaydedildi.');
  }
  if (S.hints === 0) {
    const best = store.get(KEYS.best, {});
    if (!best[S.level] || ms < best[S.level]) { best[S.level] = ms; store.set(KEYS.best, best); notes.push('Yeni en iyi süre!'); }
  } else {
    notes.push('İpucu kullandığınız için en iyi süre güncellenmedi.');
  }
  store.remove(KEYS.save);
  el.box.classList.add('is-won');
  render();
  renderBest();
  setStatus(`Tebrikler! ${LEVELS[S.level].label} bulmacayı ${formatTime(ms)} sürede çözdünüz. ${notes.join(' ')}`.trim());
}

// ---- Olaylar ----
const cellIndex = (target) => {
  const cell = target.closest && target.closest('.sd-cell');
  return cell ? Number(cell.dataset.i) : -1;
};

el.board.addEventListener('focusin', (e) => { const i = cellIndex(e.target); if (i >= 0) select(i); });
el.board.addEventListener('click', (e) => { const i = cellIndex(e.target); if (i >= 0) select(i); });

el.board.addEventListener('keydown', (e) => {
  const i = cellIndex(e.target);
  if (i < 0) return;
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z' || e.key === 'Z') { e.preventDefault(); undo(); }
    return;
  }
  if (e.altKey) return;
  const r = Math.floor(i / 9);
  const c = i % 9;
  let ni = i;
  switch (e.key) {
    case 'ArrowUp': ni = Math.max(0, r - 1) * 9 + c; break;
    case 'ArrowDown': ni = Math.min(8, r + 1) * 9 + c; break;
    case 'ArrowLeft': ni = r * 9 + Math.max(0, c - 1); break;
    case 'ArrowRight': ni = r * 9 + Math.min(8, c + 1); break;
    case 'Home': ni = r * 9; break;
    case 'End': ni = r * 9 + 8; break;
    case 'Backspace': case 'Delete': case '0': e.preventDefault(); eraseCell(); return;
    case 'n': case 'N': e.preventDefault(); toggleNotes(); return;
    case 'h': case 'H': e.preventDefault(); giveHint(); return;
    default:
      if (/^[1-9]$/.test(e.key)) { e.preventDefault(); enter(Number(e.key)); }
      return;
  }
  e.preventDefault();
  cellNodes[ni].focus();
});

el.pad.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-d]');
  if (!btn) return;
  const d = Number(btn.dataset.d);
  if (d === 0) eraseCell(); else enter(d);
});

function toggleNotes() {
  notesMode = !notesMode;
  el.notes.setAttribute('aria-pressed', String(notesMode));
  el.notes.textContent = notesMode ? 'Not modu: açık' : 'Not modu: kapalı';
  el.box.classList.toggle('notes-mode', notesMode);
}

el.notes.addEventListener('click', toggleNotes);
el.undo.addEventListener('click', undo);
el.hint.addEventListener('click', giveHint);
el.newBtn.addEventListener('click', () => guarded(el.newBtn, newRandom));
el.dailyBtn.addEventListener('click', () => guarded(el.dailyBtn, newDaily));
el.pause.addEventListener('click', () => setPaused(!paused));
el.resume.addEventListener('click', () => setPaused(false));
el.print.addEventListener('click', () => { if (S) window.print(); });
el.errors.addEventListener('change', () => {
  showErrors = el.errors.checked;
  store.set(KEYS.prefs, { ...store.get(KEYS.prefs, {}), errors: showErrors });
  for (const n of cellNodes) n._sig = '';
  if (S) render();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { setPaused(true); save(); }
});
window.addEventListener('pagehide', () => { if (S && !S.done) { if (timerId) tick(); save(); } });

if (document.fullscreenEnabled) {
  el.fullscreen.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen(); else el.box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    el.fullscreen.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
} else {
  el.fullscreen.hidden = true;
}

// ---- Başlangıç ----
(function init() {
  const prefs = store.get(KEYS.prefs, {});
  showErrors = prefs.errors !== false;
  el.errors.checked = showErrors;
  if (LEVELS[prefs.level]) el.level.value = prefs.level;
  for (const b of [el.newBtn, el.dailyBtn]) b.dataset.label = b.textContent;
  buildBoard();
  renderBest();
  const saved = loadSaved();
  if (saved) {
    activate(saved, `Kayıtlı oyununuz yüklendi (${LEVELS[saved.level].label}); kaldığınız yerden devam edebilirsiniz. İlerlemeniz otomatik kaydedilir.`);
  } else {
    startGame({ level: LEVELS[el.level.value] ? el.level.value : 'orta', seed: randomSeed() });
  }
})();
