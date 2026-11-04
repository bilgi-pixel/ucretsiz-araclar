// Kelime Avı — Bilişim Ajans.
// Tamamı istemci tarafıdır: çerez/izleme yok. Ağ isteği yalnızca aynı kökendeki kategoriler.json dosyasınadır.
// Kalıcı veri: localStorage'daki seçimler ve en iyi süreler (anahtar: ba-oyun-kelime-avi).
import {
  DIR_INFO, LEVELS, SIZES, cellsOf, lineCells, makePuzzle, matchSelection, snapEnd, trUpper, wordAt,
} from './core.js';

const KEY = 'ba-oyun-kelime-avi';
const DATA_URL = 'kategoriler.json';
const SIZE_LIST = Object.keys(SIZES).map(Number);
const LEVEL_NAMES = { kolay: 'Kolay', orta: 'Orta', zor: 'Zor' };
const COLOR_COUNT = 6; // bulunan kelimeler için dönüşümlü renk sayısı

const $ = (id) => document.getElementById(id);

// ---------------------------------------------------------------------------
// Depolama: bozuk ya da eksik kayıt oyunu çökertmez, varsayılana düşer.
// ---------------------------------------------------------------------------
function loadStore() {
  const d = { size: 12, level: 'kolay', cat: 'hayvanlar', best: {} };
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (raw && typeof raw === 'object') {
      if (SIZE_LIST.includes(raw.size)) d.size = raw.size;
      if (typeof raw.level === 'string' && Object.hasOwn(LEVELS, raw.level)) d.level = raw.level;
      if (typeof raw.cat === 'string' && /^[a-z]{1,20}$/.test(raw.cat)) d.cat = raw.cat;
      if (raw.best && typeof raw.best === 'object') {
        for (const [k, v] of Object.entries(raw.best)) {
          if (/^\d+:[a-z]+$/.test(k) && v && Number.isFinite(v.time) && v.time >= 0) d.best[k] = { time: Math.round(v.time) };
        }
      }
    }
  } catch { /* bozuk kayıt yok sayılır */ }
  return d;
}
const store = loadStore();
function saveStore() {
  try { window.localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* yazılamazsa oyun yine çalışır */ }
}

export function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

// ---------------------------------------------------------------------------
// Durum
// ---------------------------------------------------------------------------
let data = null; // kategoriler.json içeriği
let puzzle = null; // { size, level, grid, placements, words }
const found = new Map(); // kelime -> { cells, color }
let hints = 0;
let hintWord = null;
let hintCell = null;
let elapsed = 0;
let running = false;
let lastTs = 0;
let finished = false;
let anchor = null; // seçimin başlangıç hücresi [r, c]
let endCell = null; // seçimin bitiş hücresi
let cursor = [0, 0]; // klavye odağındaki hücre
let cellEls = [];
let selEls = [];
let wordEls = new Map();
let record = null; // son bitişte yazılan rekor bilgisi (test kancası için)

const sameCell = (a, b) => a && b && a[0] === b[0] && a[1] === b[1];
const bestKey = () => `${store.size}:${store.level}`;

// Tarayıcı testleri için kanca: yerleşimi okur (oyuncuya sunulan bir özellik değildir).
window.__kelimeAviTest = () => (puzzle ? {
  size: puzzle.size,
  level: puzzle.level,
  cat: store.cat,
  grid: puzzle.grid.map((row) => row.join('')),
  placements: puzzle.placements.map((p) => ({ word: p.word, dir: p.dir, cells: cellsOf(p), found: found.has(p.word) })),
  found: found.size,
  total: puzzle.words.length,
  hints,
  hintCell,
  finished,
  elapsed: Math.round(elapsed),
  record,
} : null);

// ---------------------------------------------------------------------------
// Arayüz
// ---------------------------------------------------------------------------
function setStatus(msg, kind) {
  const s = $('status');
  s.textContent = msg;
  s.dataset.kind = kind || '';
}
function showError(msg) { const e = $('error'); e.textContent = msg; e.classList.add('is-active'); }
function clearError() { const e = $('error'); e.textContent = ''; e.classList.remove('is-active'); }

function tick() {
  const now = performance.now();
  if (running && !document.hidden) elapsed += now - lastTs;
  lastTs = now;
  $('time').textContent = formatTime(elapsed);
}
setInterval(tick, 250);
document.addEventListener('visibilitychange', () => { lastTs = performance.now(); });

function renderStats() {
  $('found-count').textContent = puzzle ? `${found.size} / ${puzzle.words.length}` : '—';
  $('hint-count').textContent = String(hints);
  $('time').textContent = formatTime(elapsed);
  const b = store.best[bestKey()];
  $('best').textContent = b ? formatTime(b.time) : '—';
  $('btn-hint').disabled = !puzzle || finished;
  document.querySelectorAll('[data-size-btn]').forEach((el) => el.setAttribute('aria-pressed', String(Number(el.dataset.sizeBtn) === store.size)));
  document.querySelectorAll('[data-level-btn]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.levelBtn === store.level)));
}

const cellLabel = (r, c) => {
  const base = `${puzzle.grid[r][c]}, ${r + 1}. satır, ${c + 1}. sütun`;
  const extra = [];
  if (cellEls[r][c].classList.contains('fd')) extra.push('bulundu');
  if (hintCell && sameCell(hintCell, [r, c])) extra.push('ipucu: bir kelimenin ilk harfi');
  return extra.length ? `${base}, ${extra.join(', ')}` : base;
};

function setCursor(cell, focus) {
  const [or, oc] = cursor;
  if (cellEls[or] && cellEls[or][oc]) cellEls[or][oc].tabIndex = -1;
  cursor = [cell[0], cell[1]];
  const el = cellEls[cell[0]][cell[1]];
  el.tabIndex = 0;
  if (focus) el.focus({ preventScroll: true });
}

function renderSel() {
  for (const el of selEls) el.classList.remove('sel', 'bad');
  selEls = [];
  if (!anchor) return;
  const end = endCell || anchor;
  const line = lineCells(anchor, end);
  const list = line || [anchor, end];
  for (const [r, c] of list) {
    const el = cellEls[r][c];
    el.classList.add('sel');
    if (!line) el.classList.add('bad');
    selEls.push(el);
  }
}

function clearSel() {
  anchor = null;
  endCell = null;
  renderSel();
}

function buildGrid() {
  const gridEl = $('grid');
  const n = puzzle.size;
  gridEl.textContent = '';
  gridEl.style.setProperty('--n', String(n));
  gridEl.dataset.size = String(n);
  gridEl.classList.remove('done');
  gridEl.setAttribute('aria-label', `Harf ızgarası, ${n} satır ${n} sütun. Oklarla gezinin, Shift ile seçimi uzatın, Enter ile onaylayın.`);
  cellEls = [];
  selEls = [];
  const frag = document.createDocumentFragment();
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < n; c++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ka-cell';
      b.textContent = puzzle.grid[r][c];
      b.dataset.r = String(r);
      b.dataset.c = String(c);
      b.tabIndex = -1;
      row.push(b);
      frag.appendChild(b);
    }
    cellEls.push(row);
  }
  gridEl.appendChild(frag);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) cellEls[r][c].setAttribute('aria-label', cellLabel(r, c));
  cursor = [0, 0];
  cellEls[0][0].tabIndex = 0;
}

function buildWordList() {
  const ul = $('words');
  ul.textContent = '';
  wordEls = new Map();
  for (const w of puzzle.words) {
    const li = document.createElement('li');
    li.dataset.word = w;
    const span = document.createElement('span');
    span.className = 'w';
    span.textContent = w;
    const sr = document.createElement('span');
    sr.className = 'visually-hidden';
    sr.textContent = ' (bulundu)';
    sr.hidden = true;
    li.append(span, sr);
    ul.appendChild(li);
    wordEls.set(w, li);
  }
}

/** Yazdırılabilir sayfa: bulmaca + kelime listesi, ayrı sayfada cevap anahtarı. */
function buildPrint() {
  const { size, grid, placements } = puzzle;
  const catName = data && data[store.cat] ? data[store.cat].ad : '';
  $('pr-title').textContent = `Kelime Avı – ${catName}`;
  $('pr-meta').textContent = `${size}×${size} ızgara · ${LEVEL_NAMES[puzzle.level]} · ${placements.length} kelime`;
  const fillGrid = (target, marks) => {
    target.textContent = '';
    target.style.setProperty('--n', String(size));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const d = document.createElement('span');
        d.textContent = grid[r][c];
        if (marks && marks.has(r * size + c)) d.className = 'k';
        target.appendChild(d);
      }
    }
  };
  fillGrid($('pr-grid'), null);
  const marks = new Set();
  for (const p of placements) for (const [r, c] of cellsOf(p)) marks.add(r * size + c);
  fillGrid($('pr-grid-ans'), marks);
  const list = $('pr-words');
  list.textContent = '';
  for (const p of placements) { const li = document.createElement('li'); li.textContent = p.word; list.appendChild(li); }
  const ans = $('pr-ans-list');
  ans.textContent = '';
  for (const p of placements) {
    const li = document.createElement('li');
    li.textContent = `${p.word} — ${p.r + 1}. satır, ${p.c + 1}. sütun, ${DIR_INFO[p.dir].arrow} ${DIR_INFO[p.dir].ad}`;
    ans.appendChild(li);
  }
}

// ---------------------------------------------------------------------------
// Oyun akışı
// ---------------------------------------------------------------------------
function newPuzzle() {
  if (!data || !Object.hasOwn(data, store.cat)) return;
  clearError();
  const p = makePuzzle({ pool: data[store.cat].kelimeler, size: store.size, level: store.level });
  if (!p) {
    showError('Bu seçimle bulmaca hazırlanamadı. Başka bir kategori ya da daha büyük bir ızgara deneyin.');
    return;
  }
  puzzle = p;
  found.clear();
  hints = 0; hintWord = null; hintCell = null;
  elapsed = 0; running = true; lastTs = performance.now(); finished = false;
  record = null;
  anchor = null; endCell = null;
  $('result').hidden = true;
  buildGrid();
  buildWordList();
  buildPrint();
  renderStats();
  setStatus(`${puzzle.words.length} kelime gizlendi. Harfleri fareyle ya da parmağınızla sürükleyerek kelimeyi işaretleyin; süre şimdi başladı.`, '');
  $('grid').dataset.ready = '1';
}

function markFound(word, cells) {
  const color = found.size % COLOR_COUNT;
  found.set(word, { cells, color });
  for (const [r, c] of cells) {
    const el = cellEls[r][c];
    for (let i = 0; i < COLOR_COUNT; i++) el.classList.remove(`f${i}`);
    el.classList.add('fd', `f${color}`);
  }
  if (hintWord === word) {
    if (hintCell) cellEls[hintCell[0]][hintCell[1]].classList.remove('hint');
    hintWord = null;
    hintCell = null;
  }
  for (const [r, c] of cells) cellEls[r][c].setAttribute('aria-label', cellLabel(r, c));
  const li = wordEls.get(word);
  li.classList.add('found');
  li.classList.remove('hinted');
  li.querySelector('.visually-hidden').hidden = false;
  renderStats();
  if (found.size === puzzle.words.length) finish();
  else setStatus(`"${word}" kelimesini buldunuz! ${puzzle.words.length - found.size} kelime kaldı.`, 'ok');
}

function finish() {
  tick();
  running = false;
  finished = true;
  clearSel();
  $('grid').classList.add('done');
  const time = Math.round(elapsed);
  const key = bestKey();
  const prev = store.best[key];
  let msg = `Tüm kelimeleri ${formatTime(time)} sürede ve ${hints} ipucuyla buldunuz.`;
  let newBest = false;
  if (hints > 0) {
    msg += ' İpucu kullandığınız oyun en iyi süre olarak kaydedilmez.';
  } else if (!prev || time < prev.time) {
    store.best[key] = { time };
    saveStore();
    newBest = true;
    msg += prev ? ' Yeni en iyi süre!' : ' İlk süreniz kaydedildi.';
  } else {
    msg += ` En iyi süreniz ${formatTime(prev.time)}.`;
  }
  record = { time, hints, newBest, key };
  $('result-title').textContent = newBest ? 'Tebrikler, yeni rekor!' : 'Tebrikler, tüm kelimeler bulundu!';
  $('result-msg').textContent = msg;
  $('result').hidden = false;
  setStatus(msg, 'ok');
  renderStats();
}

/** Başlangıç ve bitiş hücresi arasındaki çizgiyi kelimelerle karşılaştırır. */
function commit(a, b) {
  clearSel();
  if (finished || !puzzle) return false;
  const line = lineCells(a, b);
  if (!line) {
    setStatus('Seçim düz bir çizgide olmalı: yatay, dikey ya da çapraz.', 'warn');
    return false;
  }
  if (line.length < 2) return false;
  const remaining = puzzle.words.filter((w) => !found.has(w));
  const hit = matchSelection(puzzle.grid, line, remaining);
  if (hit) { markFound(hit, line); return true; }
  const dup = matchSelection(puzzle.grid, line, [...found.keys()]);
  if (dup) setStatus(`"${dup}" kelimesini zaten buldunuz.`, 'warn');
  else setStatus(`"${wordAt(puzzle.grid, line)}" listedeki kelimelerden biri değil. Tekrar deneyin.`, 'warn');
  return false;
}

function giveHint() {
  if (!puzzle || finished) return;
  const left = puzzle.placements.filter((p) => !found.has(p.word));
  if (!left.length) return;
  let p = hintWord ? left.find((x) => x.word === hintWord) : null;
  if (!p) {
    p = left[Math.floor(Math.random() * left.length)];
    hints++;
    hintWord = p.word;
    hintCell = [p.r, p.c];
  }
  for (const row of cellEls) for (const el of row) el.classList.remove('hint');
  for (const li of wordEls.values()) li.classList.remove('hinted');
  const el = cellEls[p.r][p.c];
  el.classList.add('hint');
  el.setAttribute('aria-label', cellLabel(p.r, p.c));
  wordEls.get(p.word).classList.add('hinted');
  renderStats();
  setStatus(`İpucu: "${p.word}" kelimesi ${puzzle.grid[p.r][p.c]} harfiyle başlıyor. Işaretli kareyi bulun (${p.r + 1}. satır, ${p.c + 1}. sütun).`, '');
}

// ---------------------------------------------------------------------------
// Girdi: fare/parmak sürükleme, dokun-dokun ve klavye
// ---------------------------------------------------------------------------
function cellFromPoint(x, y) {
  const rect = $('grid').getBoundingClientRect();
  const n = puzzle.size;
  const c = Math.min(n - 1, Math.max(0, Math.floor((x - rect.left) / (rect.width / n))));
  const r = Math.min(n - 1, Math.max(0, Math.floor((y - rect.top) / (rect.height / n))));
  return [r, c];
}

function initPointer() {
  const gridEl = $('grid');
  let drag = null; // { id, start, moved, prev }
  gridEl.addEventListener('pointerdown', (e) => {
    if (!puzzle || finished) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    const cell = cellFromPoint(e.clientX, e.clientY);
    try { gridEl.setPointerCapture(e.pointerId); } catch { /* yakalama desteklenmiyorsa sürükleme yine çalışır */ }
    drag = { id: e.pointerId, start: cell, moved: false, prev: anchor };
    setCursor(cell, true);
    if (!drag.prev) { anchor = cell; endCell = cell; renderSel(); }
  });
  gridEl.addEventListener('pointermove', (e) => {
    if (!drag || drag.id !== e.pointerId || !puzzle) return;
    const p = cellFromPoint(e.clientX, e.clientY);
    const end = snapEnd(drag.start, p, puzzle.size);
    if (!sameCell(end, drag.start)) drag.moved = true;
    if (drag.moved) {
      anchor = drag.start;
      endCell = end;
      renderSel();
    }
  });
  const finishDrag = (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const d = drag;
    drag = null;
    if (!puzzle || finished) return;
    if (d.moved) { commit(anchor, endCell); return; }
    // Sürükleme olmadı: dokun-dokun kipi (ilk dokunuş başlangıç, ikinci dokunuş bitiş)
    if (d.prev) {
      if (sameCell(d.prev, d.start)) { clearSel(); setStatus('Seçim iptal edildi.', ''); } else commit(d.prev, d.start);
    } else {
      anchor = d.start;
      endCell = d.start;
      renderSel();
      setStatus(`Başlangıç harfi: ${puzzle.grid[d.start[0]][d.start[1]]}. Şimdi kelimenin son harfine dokunun ya da başka bir harften sürükleyin.`, '');
    }
  };
  gridEl.addEventListener('pointerup', finishDrag);
  gridEl.addEventListener('pointercancel', (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    drag = null;
    clearSel();
  });
}

const MOVE_KEYS = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
const DIAG_KEYS = { Home: [-1, -1], PageUp: [-1, 1], End: [1, -1], PageDown: [1, 1] };

function announceSel() {
  if (!anchor) return;
  const line = lineCells(anchor, endCell || anchor);
  if (line && line.length > 1) setStatus(`Seçim: ${wordAt(puzzle.grid, line)}. Onaylamak için Enter, iptal için Escape.`, '');
  else if (!line) setStatus('Seçim düz bir çizgide değil; yatay, dikey ya da çapraz olmalı.', 'warn');
}

function initKeyboard() {
  // Odak başka yolla (Tab, fare, program) bir hücreye geldiğinde klavye imleci de oraya taşınır.
  $('grid').addEventListener('focusin', (e) => {
    const t = e.target && e.target.closest ? e.target.closest('.ka-cell') : null;
    if (t && puzzle) setCursor([Number(t.dataset.r), Number(t.dataset.c)], false);
  });
  $('grid').addEventListener('keydown', (e) => {
    if (!puzzle || e.ctrlKey || e.metaKey || e.altKey) return;
    const n = puzzle.size;
    const k = e.key;
    const step = MOVE_KEYS[k] || ((e.shiftKey || anchor) ? DIAG_KEYS[k] : null);
    if (step) {
      e.preventDefault();
      const next = [Math.min(n - 1, Math.max(0, cursor[0] + step[0])), Math.min(n - 1, Math.max(0, cursor[1] + step[1]))];
      if (e.shiftKey && !anchor && !finished) { anchor = cursor.slice(); endCell = anchor; }
      setCursor(next, true);
      if (anchor && !finished) { endCell = next; renderSel(); announceSel(); }
      return;
    }
    if (k === 'Home' || k === 'End' || k === 'PageUp' || k === 'PageDown') {
      // Seçim yokken: Home/End satır başı-sonu, PageUp/PageDown sütun başı-sonu
      e.preventDefault();
      const next = k === 'Home' ? [cursor[0], 0] : k === 'End' ? [cursor[0], n - 1] : k === 'PageUp' ? [0, cursor[1]] : [n - 1, cursor[1]];
      setCursor(next, true);
      return;
    }
    if (k === 'Enter' || k === ' ') {
      e.preventDefault();
      if (finished) return;
      if (!anchor) {
        anchor = cursor.slice();
        endCell = anchor;
        renderSel();
        setStatus(`Başlangıç harfi: ${puzzle.grid[cursor[0]][cursor[1]]}. Oklarla son harfe gidin (köşegen için Shift ile Home, End, PageUp, PageDown), sonra Enter'a basın.`, '');
      } else if (sameCell(anchor, cursor)) {
        clearSel();
        setStatus('Seçim iptal edildi.', '');
      } else {
        const a = anchor;
        commit(a, cursor);
      }
      return;
    }
    if (k === 'Escape' && anchor) {
      e.preventDefault();
      clearSel();
      setStatus('Seçim iptal edildi.', '');
    }
  });
}

// ---------------------------------------------------------------------------
// Başlangıç
// ---------------------------------------------------------------------------
function populateCategories() {
  const sel = $('kategori');
  sel.textContent = '';
  for (const [key, v] of Object.entries(data)) {
    const o = document.createElement('option');
    o.value = key;
    o.textContent = `${v.ad} (${v.kelimeler.length} kelime)`;
    sel.appendChild(o);
  }
  if (!Object.hasOwn(data, store.cat)) store.cat = Object.keys(data)[0];
  sel.value = store.cat;
}

async function init() {
  initPointer();
  initKeyboard();
  renderStats();
  $('btn-new').addEventListener('click', () => { newPuzzle(); });
  $('btn-again').addEventListener('click', () => { newPuzzle(); $('grid').scrollIntoView({ block: 'nearest' }); });
  $('btn-hint').addEventListener('click', giveHint);
  $('btn-print').addEventListener('click', () => { if (puzzle) window.print(); });
  $('print-answers').addEventListener('change', (e) => { $('print-sheet').dataset.answers = e.target.checked ? '1' : '0'; });
  $('kategori').addEventListener('change', (e) => { store.cat = e.target.value; saveStore(); newPuzzle(); });
  document.querySelectorAll('[data-size-btn]').forEach((b) => b.addEventListener('click', () => {
    const next = Number(b.dataset.sizeBtn);
    if (next === store.size && puzzle) return;
    store.size = next; saveStore(); newPuzzle();
  }));
  document.querySelectorAll('[data-level-btn]').forEach((b) => b.addEventListener('click', () => {
    const next = b.dataset.levelBtn;
    if (next === store.level && puzzle) return;
    store.level = next; saveStore(); newPuzzle();
  }));

  const box = $('game-box');
  const fsBtn = $('btn-full');
  if (document.fullscreenEnabled && box.requestFullscreen) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else box.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => { fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran'; });
  }

  setStatus('Kelime listesi yükleniyor…', '');
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(String(res.status));
    data = await res.json();
    if (!data || typeof data !== 'object' || !Object.keys(data).length) throw new Error('boş');
    for (const v of Object.values(data)) v.kelimeler = Array.isArray(v.kelimeler) ? v.kelimeler.map((w) => trUpper(String(w))) : [];
  } catch {
    setStatus('', '');
    showError('Kelime listesi yüklenemedi. Sayfayı yenileyin; sorun sürerse bağlantınızı kontrol edip tekrar deneyin.');
    return;
  }
  populateCategories();
  newPuzzle();
}

if (typeof document !== 'undefined' && document.getElementById('grid')) init();
