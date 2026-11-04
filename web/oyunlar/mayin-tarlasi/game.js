// Mayın Tarlası — bağımlılıksız, DOM/ızgara tabanlı oyun.
// Gizlilik: ağ isteği yok; yalnızca en iyi süreler ve tercihler localStorage'a yazılır.
const $ = (id) => document.getElementById(id);

const LEVELS = {
  kolay: { w: 9, h: 9, m: 10, label: 'Kolay' },
  orta: { w: 16, h: 16, m: 40, label: 'Orta' },
  zor: { w: 30, h: 16, m: 99, label: 'Zor' },
};
const LIMITS = { wMin: 5, wMax: 40, hMin: 5, hMax: 30 };
const BEST_KEY = 'ba-mayin-en-iyi';
const PREF_KEY = 'ba-mayin-tercih';
const LONG_PRESS_MS = 420;

const FLAG_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M8 4l11 4.5L8 13z" fill="#c0392b"/></svg>';
const MINE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5.5" fill="currentColor"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="10.3" cy="10.3" r="1.5" fill="#fff"/></svg>';
const WRONG_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M8 4l11 4.5L8 13z" fill="#c0392b"/><path d="M3 3l18 18M21 3L3 21" stroke="#a3271f" stroke-width="2.4" stroke-linecap="round"/></svg>';

// localStorage güvenli sarmalayıcı (gizli sekme / kota hatası oyunu bozmasın)
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* yoksay */ }
  },
};

const el = {
  box: $('oyun'), scroll: $('tahta-kaydirma'), grid: $('tahta'), counter: $('sayac'), time: $('sure'), status: $('durum'),
  level: $('seviye'), custom: $('ozel-alan'), cw: $('ozel-w'), ch: $('ozel-h'), cm: $('ozel-m'), customGo: $('ozel-baslat'),
  restart: $('yeni-oyun'), flagMode: $('bayrak-modu'), question: $('soru-isareti'), pause: $('duraklat'),
  pauseCover: $('duraklatildi'), resume: $('devam-et'), fullscreen: $('tam-ekran'), error: $('hata'), best: $('en-iyi'),
};

// ---- Oyun durumu ----
let cfg;            // { key, w, h, m }
let cells = [];     // { mine, open, mark (0 yok, 1 bayrak, 2 soru), n, openedAt (doğrudan açıldığı an; hiç açılmadıysa -Infinity) }
let nodes = [];     // hücre DOM düğümleri
let nbr = [];       // her hücrenin komşu indeksleri
let phase = 'ready'; // ready | play | won | lost
let flagCount = 0;
let openCount = 0;
let elapsedMs = 0;
let runStart = 0;
let timerId = 0;
let paused = false;
let flagMode = false;
let lastFocus = 0;
let lastPointerType = 'mouse';
const longPress = { timer: 0, fired: false, x: 0, y: 0 };

// ---- Yardımcılar ----
const pad3 = (n) => (n < 0 ? '-' + String(Math.min(99, -n)).padStart(2, '0') : String(Math.min(999, n)).padStart(3, '0'));

function formatTime(ms) {
  const s = ms / 1000;
  if (s < 60) return s.toFixed(1).replace('.', ',') + ' sn';
  return Math.floor(s / 60) + ' dk ' + Math.floor(s % 60) + ' sn';
}

function bestKey() {
  return cfg.key === 'ozel' ? `ozel:${cfg.w}x${cfg.h}:${cfg.m}` : cfg.key;
}

function setStatus(text) { el.status.textContent = text; }

function showError(text) {
  el.error.textContent = text;
  el.error.classList.toggle('is-active', !!text);
}

function buildNeighbors() {
  nbr = [];
  for (let r = 0; r < cfg.h; r++) {
    for (let c = 0; c < cfg.w; c++) {
      const list = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          const rr = r + dr;
          const cc = c + dc;
          if (rr >= 0 && rr < cfg.h && cc >= 0 && cc < cfg.w) list.push(rr * cfg.w + cc);
        }
      }
      nbr.push(list);
    }
  }
}

// ---- Tahta çizimi ----
function buildGrid() {
  el.grid.textContent = '';
  el.grid.setAttribute('aria-rowcount', String(cfg.h));
  el.grid.setAttribute('aria-colcount', String(cfg.w));
  nodes = [];
  for (let r = 0; r < cfg.h; r++) {
    const row = document.createElement('div');
    row.className = 'mt-row';
    row.setAttribute('role', 'row');
    for (let c = 0; c < cfg.w; c++) {
      const cell = document.createElement('div');
      cell.className = 'mt-cell s-kapali';
      cell.setAttribute('role', 'gridcell');
      cell.tabIndex = r === 0 && c === 0 ? 0 : -1;
      cell.dataset.r = String(r);
      cell.dataset.c = String(c);
      cell.dataset.state = 'kapali';
      cell.setAttribute('aria-label', `${r + 1}. satır ${c + 1}. sütun, kapalı`);
      nodes.push(cell);
      row.append(cell);
    }
    el.grid.append(row);
  }
  fitCells();
}

// Hücre boyutunu mevcut genişliğe göre seç; sığmıyorsa kaydırma alanı devreye girer.
function fitCells() {
  if (!cfg) return;
  const avail = (el.scroll.clientWidth || 308) - 8; // 8 px: kaydırma kutusunun iç boşluğu
  const size = Math.max(26, Math.min(44, Math.floor(avail / cfg.w)));
  el.grid.style.setProperty('--cs', size + 'px');
}

function renderCell(i) {
  const c = cells[i];
  const node = nodes[i];
  const r = Math.floor(i / cfg.w) + 1;
  const col = (i % cfg.w) + 1;
  let state = 'kapali';
  let html = '';
  let desc = 'kapalı';
  if (c.open && c.mine) {
    state = 'patladi'; html = MINE_SVG; desc = 'patlayan mayın';
  } else if (c.open) {
    state = 'acik';
    if (c.n > 0) { html = String(c.n); desc = `${c.n} komşu mayın`; } else { desc = 'boş'; }
  } else if (phase === 'lost' && c.mine && c.mark !== 1) {
    state = 'mayin'; html = MINE_SVG; desc = 'mayın';
  } else if (phase === 'lost' && !c.mine && c.mark === 1) {
    state = 'yanlis-bayrak'; html = WRONG_SVG; desc = 'yanlış bayrak';
  } else if (c.mark === 1) {
    state = 'bayrak'; html = FLAG_SVG; desc = 'bayraklı';
  } else if (c.mark === 2) {
    state = 'soru'; html = '?'; desc = 'soru işaretli';
  }
  node.dataset.state = state;
  node.dataset.n = state === 'acik' && c.n > 0 ? String(c.n) : '';
  node.className = `mt-cell s-${state}` + (state === 'acik' && c.n > 0 ? ` n${c.n}` : '');
  if (html.startsWith('<svg')) node.innerHTML = html; else node.textContent = html;
  node.setAttribute('aria-label', `${r}. satır ${col}. sütun, ${desc}`);
}

function renderAll() { for (let i = 0; i < cells.length; i++) renderCell(i); }

function updateCounter() {
  const left = cfg.m - flagCount;
  el.counter.textContent = pad3(left);
  el.counter.dataset.value = String(left);
}

function updateTime() {
  const s = Math.floor(elapsedMs / 1000);
  el.time.textContent = pad3(s);
  el.time.dataset.value = String(s);
}

function renderBest() {
  const best = store.get(BEST_KEY, {});
  const rows = Object.entries(LEVELS).map(([k, v]) => `<li><span>${v.label} (${v.w}×${v.h}, ${v.m} mayın)</span><strong>${best[k] ? formatTime(best[k]) : '—'}</strong></li>`);
  if (cfg.key === 'ozel') {
    const v = best[bestKey()];
    rows.push(`<li><span>Özel (${cfg.w}×${cfg.h}, ${cfg.m} mayın)</span><strong>${v ? formatTime(v) : '—'}</strong></li>`);
  }
  el.best.innerHTML = rows.join('');
}

// ---- Zamanlayıcı ----
function startTimer() {
  runStart = performance.now() - elapsedMs;
  clearInterval(timerId);
  timerId = setInterval(() => { elapsedMs = performance.now() - runStart; updateTime(); }, 200);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = 0;
}

function setPaused(on) {
  if (phase !== 'play' || on === paused) return;
  paused = on;
  if (on) { elapsedMs = performance.now() - runStart; stopTimer(); updateTime(); } else { startTimer(); }
  el.box.classList.toggle('is-paused', on);
  el.pauseCover.hidden = !on;
  el.pause.textContent = on ? 'Devam et' : 'Duraklat';
  setStatus(on ? 'Oyun duraklatıldı; süre işlemiyor. Devam etmek için düğmeye basın.' : 'Oyun sürüyor.');
  if (on) el.resume.focus(); else focusCell(lastFocus);
}

// ---- Yeni oyun ----
function newGame(next) {
  if (next) cfg = next;
  stopTimer();
  clearTimeout(longPress.timer);
  phase = 'ready'; paused = false; flagCount = 0; openCount = 0; elapsedMs = 0; runStart = 0;
  el.box.classList.remove('is-paused', 'is-won', 'is-lost');
  el.pauseCover.hidden = true;
  el.pause.textContent = 'Duraklat';
  el.pause.disabled = true;
  cells = Array.from({ length: cfg.w * cfg.h }, () => ({ mine: false, open: false, mark: 0, n: 0, openedAt: -Infinity }));
  buildNeighbors();
  buildGrid();
  lastFocus = 0;
  updateCounter();
  updateTime();
  renderBest();
  setStatus('Hazır. Herhangi bir kareyi açarak başlayın; ilk tıklama her zaman güvenlidir.');
}

// Mayınları ilk tıklamadan sonra yerleştir: tıklanan kare ve komşuları güvenli.
function placeMines(safe) {
  let banned = new Set([safe, ...nbr[safe]]);
  let pool = [];
  for (let i = 0; i < cells.length; i++) if (!banned.has(i)) pool.push(i);
  if (pool.length < cfg.m) { // çok yoğun tahta: yalnızca tıklanan kare güvenli kalsın
    banned = new Set([safe]);
    pool = [];
    for (let i = 0; i < cells.length; i++) if (!banned.has(i)) pool.push(i);
  }
  for (let k = 0; k < cfg.m; k++) {
    const j = k + Math.floor(Math.random() * (pool.length - k));
    [pool[k], pool[j]] = [pool[j], pool[k]];
    cells[pool[k]].mine = true;
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].n = nbr[i].reduce((sum, j) => sum + (cells[j].mine ? 1 : 0), 0);
  }
}

// ---- Açma / bayrak / akor ----
// Tek kareyi açar (sıfır ise yayılır). Mayına denk gelirse true döner; oyun sonu denetimi afterMove'dadır.
function reveal(start) {
  const first = cells[start];
  if (first.open || first.mark === 1) return false;
  if (first.mine) { first.open = true; first.mark = 0; renderCell(start); return true; }
  const stack = [start];
  while (stack.length) {
    const i = stack.pop();
    const c = cells[i];
    if (c.open || c.mark === 1 || c.mine) continue;
    c.open = true;
    c.mark = 0;
    openCount++;
    renderCell(i);
    if (c.n === 0) for (const j of nbr[i]) if (!cells[j].open && cells[j].mark !== 1) stack.push(j);
  }
  return false;
}

function afterMove(hitMine) {
  if (hitMine) {
    phase = 'lost';
    stopTimer();
    renderAll();
    el.box.classList.add('is-lost');
    el.pause.disabled = true;
    setStatus('Kaybettiniz: bir mayına bastınız. Yeni oyun düğmesiyle tekrar deneyebilirsiniz.');
    return;
  }
  if (openCount === cells.length - cfg.m) {
    phase = 'won';
    elapsedMs = performance.now() - runStart;
    stopTimer();
    for (const c of cells) if (c.mine) c.mark = 1;
    flagCount = cfg.m;
    renderAll();
    updateCounter();
    updateTime();
    el.box.classList.add('is-won');
    el.pause.disabled = true;
    const key = bestKey();
    const best = store.get(BEST_KEY, {});
    const ms = Math.max(1, Math.round(elapsedMs));
    let note = '';
    if (!best[key] || ms < best[key]) { best[key] = ms; store.set(BEST_KEY, best); note = ' Yeni en iyi süre!'; }
    renderBest();
    setStatus(`Kazandınız! Tüm güvenli kareleri ${formatTime(ms)} sürede açtınız.${note}`);
  }
}

function ensureStarted(i) {
  if (phase !== 'ready') return;
  placeMines(i);
  phase = 'play';
  el.pause.disabled = false;
  startTimer();
  setStatus('Oyun sürüyor. Kalan mayın sayısı sayaçta gösterilir.');
}

function openAt(i) {
  if (phase === 'won' || phase === 'lost' || paused) return;
  if (cells[i].mark === 1) return; // bayraklı kare açılmaz
  ensureStarted(i);
  cells[i].openedAt = performance.now(); // çift tık korumasında yalnızca doğrudan tıklanan kare sayılır
  afterMove(reveal(i));
}

function chord(i) {
  const c = cells[i];
  if (phase !== 'play' || paused || !c.open || c.n === 0) return;
  const around = nbr[i];
  const flags = around.reduce((s, j) => s + (cells[j].mark === 1 ? 1 : 0), 0);
  if (flags !== c.n) return;
  let hit = false;
  for (const j of around) {
    if (cells[j].open || cells[j].mark === 1) continue;
    if (reveal(j)) hit = true;
  }
  afterMove(hit);
}

function toggleMark(i) {
  if (phase === 'won' || phase === 'lost' || paused) return;
  const c = cells[i];
  if (c.open) return;
  if (c.mark === 0) { c.mark = 1; flagCount++; }
  else if (c.mark === 1) { flagCount--; c.mark = el.question.checked ? 2 : 0; }
  else { c.mark = 0; }
  renderCell(i);
  updateCounter();
}

// Tıklama türüne göre davran: açık sayıda (bayrak modunda) akor, bayrak modunda işaretle, aksi halde aç.
function activate(i) {
  if (cells[i].open) { if (flagMode) chord(i); return; }
  if (flagMode) toggleMark(i); else openAt(i);
}

// ---- Odak / klavye ----
function focusCell(i) {
  const node = nodes[i];
  if (node) node.focus();
}

function cellIndex(target) {
  const cell = target.closest && target.closest('.mt-cell');
  return cell ? Number(cell.dataset.r) * cfg.w + Number(cell.dataset.c) : -1;
}

el.grid.addEventListener('focusin', (e) => {
  const i = cellIndex(e.target);
  if (i < 0) return;
  if (nodes[lastFocus]) nodes[lastFocus].tabIndex = -1;
  lastFocus = i;
  nodes[i].tabIndex = 0;
});

el.grid.addEventListener('keydown', (e) => {
  const i = cellIndex(e.target);
  if (i < 0 || e.ctrlKey || e.metaKey || e.altKey) return;
  const r = Math.floor(i / cfg.w);
  const c = i % cfg.w;
  let nr = r;
  let nc = c;
  switch (e.key) {
    case 'ArrowUp': nr = Math.max(0, r - 1); break;
    case 'ArrowDown': nr = Math.min(cfg.h - 1, r + 1); break;
    case 'ArrowLeft': nc = Math.max(0, c - 1); break;
    case 'ArrowRight': nc = Math.min(cfg.w - 1, c + 1); break;
    case 'Home': nc = 0; break;
    case 'End': nc = cfg.w - 1; break;
    case 'PageUp': nr = 0; break;
    case 'PageDown': nr = cfg.h - 1; break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      // Klavyede Enter: kapalıysa aç, açık sayıdaysa akor.
      if (cells[i].open) chord(i); else if (flagMode) toggleMark(i); else openAt(i);
      return;
    case 'f':
    case 'F':
      e.preventDefault();
      toggleMark(i);
      return;
    default: return;
  }
  e.preventDefault();
  focusCell(nr * cfg.w + nc);
});

// ---- Fare / dokunma ----
el.grid.addEventListener('pointerdown', (e) => {
  lastPointerType = e.pointerType || 'mouse';
  const i = cellIndex(e.target);
  if (i < 0) return;
  longPress.fired = false;
  if (e.pointerType === 'touch' || e.pointerType === 'pen') {
    clearTimeout(longPress.timer);
    longPress.x = e.clientX;
    longPress.y = e.clientY;
    longPress.timer = setTimeout(() => {
      longPress.fired = true;
      toggleMark(i);
      if (navigator.vibrate) { try { navigator.vibrate(15); } catch { /* yoksay */ } }
    }, LONG_PRESS_MS);
  }
});

const cancelLongPress = () => clearTimeout(longPress.timer);
el.grid.addEventListener('pointerup', cancelLongPress);
el.grid.addEventListener('pointercancel', cancelLongPress);
el.grid.addEventListener('pointerleave', cancelLongPress);
el.grid.addEventListener('pointermove', (e) => {
  if (Math.hypot(e.clientX - longPress.x, e.clientY - longPress.y) > 10) cancelLongPress();
});

el.grid.addEventListener('click', (e) => {
  const i = cellIndex(e.target);
  if (i < 0) return;
  if (longPress.fired) { longPress.fired = false; return; } // uzun basmadan sonraki tıklamayı yoksay
  activate(i);
});

// Sağ tık = bayrak. Dokunmatik uzun basma zaten pointerdown zamanlayıcısında işlendi.
el.grid.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const i = cellIndex(e.target);
  if (i < 0) return;
  if (lastPointerType === 'touch' || lastPointerType === 'pen') return;
  toggleMark(i);
});

// Çift tık (akor): yeni açılmış karede yanlışlıkla tetiklenmesin diye 450 ms koruma var.
// performance.now() sayfa açılışında 0'dan başlar; doğrudan açılmamış karenin openedAt'i -Infinity olduğundan
// sayfanın ilk 450 ms'sinde de koruma yalnızca gerçekten yeni tıklanan kareye uygulanır.
el.grid.addEventListener('dblclick', (e) => {
  const i = cellIndex(e.target);
  if (i < 0) return;
  if (performance.now() - cells[i].openedAt < 450) return;
  chord(i);
});

// Orta tuş da akor yapar.
el.grid.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); });
el.grid.addEventListener('auxclick', (e) => {
  if (e.button !== 1) return;
  e.preventDefault();
  const i = cellIndex(e.target);
  if (i >= 0) chord(i);
});

// ---- Düğmeler ve seçenekler ----
function savePrefs() {
  store.set(PREF_KEY, { level: el.level.value, w: Number(el.cw.value), h: Number(el.ch.value), m: Number(el.cm.value), question: el.question.checked });
}

function startPreset(key) {
  showError('');
  const v = LEVELS[key];
  newGame({ key, w: v.w, h: v.h, m: v.m });
}

function startCustom() {
  const w = Math.round(Number(el.cw.value));
  const h = Math.round(Number(el.ch.value));
  const m = Math.round(Number(el.cm.value));
  if (!(w >= LIMITS.wMin && w <= LIMITS.wMax) || !(h >= LIMITS.hMin && h <= LIMITS.hMax)) {
    showError(`Genişlik ${LIMITS.wMin}–${LIMITS.wMax}, yükseklik ${LIMITS.hMin}–${LIMITS.hMax} arasında olmalı. Değerleri düzeltip tekrar deneyin.`);
    return;
  }
  const maxM = w * h - 9;
  if (!(m >= 1 && m <= maxM)) {
    showError(`Bu boyutta mayın sayısı 1 ile ${maxM} arasında olmalı; ilk tıklamanın güvenli olması için tahtada boş kare kalmalıdır.`);
    return;
  }
  showError('');
  newGame({ key: 'ozel', w, h, m });
  savePrefs();
}

function applyLevelUi() {
  el.custom.hidden = el.level.value !== 'ozel';
}

el.level.addEventListener('change', () => {
  applyLevelUi();
  if (el.level.value === 'ozel') { startCustom(); return; }
  startPreset(el.level.value);
  savePrefs();
});
el.customGo.addEventListener('click', startCustom);
el.restart.addEventListener('click', () => { showError(''); newGame(); focusCell(0); });
el.question.addEventListener('change', savePrefs);

el.flagMode.addEventListener('click', () => {
  flagMode = !flagMode;
  el.flagMode.setAttribute('aria-pressed', String(flagMode));
  el.flagMode.textContent = flagMode ? 'Bayrak modu: açık' : 'Bayrak modu: kapalı';
  el.box.classList.toggle('flag-mode', flagMode);
});

el.pause.addEventListener('click', () => setPaused(!paused));
el.resume.addEventListener('click', () => setPaused(false));
document.addEventListener('visibilitychange', () => { if (document.hidden) setPaused(true); });

if (document.fullscreenEnabled) {
  el.fullscreen.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen(); else el.box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    el.fullscreen.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
    fitCells();
  });
} else {
  el.fullscreen.hidden = true;
}

if (typeof ResizeObserver === 'function') new ResizeObserver(() => fitCells()).observe(el.scroll);

// ---- Başlangıç ----
(function init() {
  const prefs = store.get(PREF_KEY, {});
  if (prefs.w) el.cw.value = prefs.w;
  if (prefs.h) el.ch.value = prefs.h;
  if (prefs.m) el.cm.value = prefs.m;
  el.question.checked = !!prefs.question;
  const level = prefs.level === 'ozel' || LEVELS[prefs.level] ? prefs.level : 'kolay';
  el.level.value = level;
  applyLevelUi();
  if (level === 'ozel') {
    const w = Math.min(LIMITS.wMax, Math.max(LIMITS.wMin, Number(el.cw.value) || 12));
    const h = Math.min(LIMITS.hMax, Math.max(LIMITS.hMin, Number(el.ch.value) || 12));
    const m = Math.min(w * h - 9, Math.max(1, Number(el.cm.value) || 20));
    newGame({ key: 'ozel', w, h, m });
  } else {
    newGame({ key: level, ...LEVELS[level] });
  }
})();
