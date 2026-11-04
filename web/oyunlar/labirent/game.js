// Labirent Oyunu — rastgele labirent (recursive backtracker), BFS ile çözüm yolu, karanlık mod ve yazdırma.
// Saf canvas; kütüphane, ses ve ağ isteği yok. Kodda Türkçe yorum, İngilizce tanımlayıcı.
// En iyi süreler yalnızca bu cihazın localStorage'ında durur.

const S = 600;                 // mantıksal tuval kenarı (CSS ile ölçeklenir)
const PAD = 12;                // tuval kenar boşluğu
const SIZES = [10, 20, 30];
const WALL_WIDTH = { 10: 4, 20: 3, 30: 2.4 };
const STORAGE_PREFIX = 'ba-oyun-labirent-en-iyi-';

// Geçit bitleri: bit 1 ise o yönde duvar YOK (geçit açık).
const DIRS = [
  { key: 'N', bit: 1, opp: 4, dx: 0, dy: -1 },
  { key: 'E', bit: 2, opp: 8, dx: 1, dy: 0 },
  { key: 'S', bit: 4, opp: 1, dx: 0, dy: 1 },
  { key: 'W', bit: 8, opp: 2, dx: -1, dy: 0 },
];
const DIR = Object.fromEntries(DIRS.map((d) => [d.key, d]));
const KEY_MAP = {
  ArrowUp: 'N', ArrowRight: 'E', ArrowDown: 'S', ArrowLeft: 'W',
  w: 'N', d: 'E', s: 'S', a: 'W', W: 'N', D: 'E', S: 'S', A: 'W',
};

const $ = (id) => document.getElementById(id);
const canvas = $('game-canvas');
const ctx = canvas.getContext('2d');
const box = $('oyun-kutusu');
const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const dpr = Math.min(2, window.devicePixelRatio || 1);
canvas.width = canvas.height = Math.round(S * dpr);
// Duvarlar değişmediği için labirent katmanı bir kez çizilip önbelleğe alınır.
const layer = document.createElement('canvas');
layer.width = layer.height = canvas.width;
const lctx = layer.getContext('2d');

/* ---------- Labirent üretimi ve çözümü ---------- */

// Recursive backtracker (rastgele derinlik öncelikli arama). Özyineleme yerine yığın kullanılır.
// Sonuç "mükemmel labirent"tir: her hücreye tek bir yoldan ulaşılır, döngü yoktur.
function generateMaze(n, rnd = Math.random) {
  const open = new Uint8Array(n * n);
  const visited = new Uint8Array(n * n);
  const stack = [0];
  visited[0] = 1;
  while (stack.length) {
    const c = stack[stack.length - 1];
    const x = c % n;
    const y = (c / n) | 0;
    const options = DIRS.filter((d) => {
      const nx = x + d.dx;
      const ny = y + d.dy;
      return nx >= 0 && ny >= 0 && nx < n && ny < n && !visited[ny * n + nx];
    });
    if (!options.length) { stack.pop(); continue; }
    const d = options[Math.floor(rnd() * options.length)];
    const next = (y + d.dy) * n + (x + d.dx);
    open[c] |= d.bit;
    open[next] |= d.opp;
    visited[next] = 1;
    stack.push(next);
  }
  return open;
}

// BFS: from hücresinden to hücresine en kısa yol (hücre dizini dizisi); yol yoksa null.
function solveMaze(open, n, from, to) {
  const prev = new Int32Array(n * n).fill(-1);
  prev[from] = from;
  const queue = [from];
  for (let head = 0; head < queue.length; head++) {
    const c = queue[head];
    if (c === to) break;
    const x = c % n;
    const y = (c / n) | 0;
    for (const d of DIRS) {
      if (!(open[c] & d.bit)) continue;
      const ni = (y + d.dy) * n + (x + d.dx);
      if (prev[ni] === -1) { prev[ni] = c; queue.push(ni); }
    }
  }
  if (prev[to] === -1) return null;
  const path = [];
  for (let c = to; ; c = prev[c]) { path.push(c); if (c === from) break; }
  return path.reverse();
}

/* ---------- Durum ---------- */
let n = 10;
let open = new Uint8Array(0);
let px = 0, py = 0;             // top: mantıksal hücre
let vx = 0, vy = 0;             // top: görsel konum (yumuşak geçiş için)
let moves = 0;
let state = 'ready';            // 'ready' (ilk hamle bekleniyor) | 'playing' | 'won'
let t0 = 0;
let finalMs = 0;
let showSolution = false;
let usedHint = false;
let dark = false;
let solutionPath = [];
let bestMs = 0;                 // seçili boyutun en iyi süresi (önbellek)

/* ---------- Depolama ---------- */
function readBest(size) {
  try { const v = parseInt(localStorage.getItem(STORAGE_PREFIX + size) || '', 10); return v > 0 ? v : 0; } catch { return 0; }
}
function writeBest(size, ms) {
  try { localStorage.setItem(STORAGE_PREFIX + size, String(ms)); } catch { /* sessizce geç */ }
}

/* ---------- Çizim ---------- */
const cellSize = (count = n, size = S, pad = PAD) => (size - 2 * pad) / count;
const centerOf = (x, y) => [PAD + (x + 0.5) * cellSize(), PAD + (y + 0.5) * cellSize()];

// Labirent katmanı: hem ekranda hem yazdırma görselinde kullanılır.
// o: { bg, wall, lw, tint, labels, count, openBits }
function drawMazeLayer(c, size, pad, o) {
  const count = o.count;
  const cell = cellSize(count, size, pad);
  c.fillStyle = o.bg;
  c.fillRect(0, 0, size, size);
  if (o.tint) {
    c.fillStyle = '#d6f0dd';
    c.fillRect(pad, pad, cell, cell);
    c.fillStyle = '#ffe8a8';
    c.fillRect(pad + (count - 1) * cell, pad + (count - 1) * cell, cell, cell);
  }
  c.strokeStyle = o.wall;
  c.lineWidth = o.lw;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.beginPath();
  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      const bits = o.openBits[y * count + x];
      const ox = pad + x * cell;
      const oy = pad + y * cell;
      // Giriş (sol üst) ve çıkış (sağ alt) duvarı açık bırakılır.
      if (!(bits & 1) && !(x === 0 && y === 0)) { c.moveTo(ox, oy); c.lineTo(ox + cell, oy); }
      if (!(bits & 8)) { c.moveTo(ox, oy); c.lineTo(ox, oy + cell); }
      if (x === count - 1 && !(bits & 2)) { c.moveTo(ox + cell, oy); c.lineTo(ox + cell, oy + cell); }
      if (y === count - 1 && !(bits & 4) && x !== count - 1) { c.moveTo(ox, oy + cell); c.lineTo(ox + cell, oy + cell); }
    }
  }
  c.stroke();
  // Hedef yıldızı
  const gx = pad + (count - 0.5) * cell;
  const gy = pad + (count - 0.5) * cell;
  const outer = cell * 0.34;
  c.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : outer * 0.45;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    c[i === 0 ? 'moveTo' : 'lineTo'](gx + Math.cos(a) * r, gy + Math.sin(a) * r);
  }
  c.closePath();
  c.fillStyle = '#f9a825';
  c.fill();
  c.lineWidth = Math.max(1, cell * 0.04);
  c.strokeStyle = '#8a5300';
  c.stroke();
}

function drawPath(c, path, count, size, pad, color, width) {
  if (path.length < 2) return;
  const cell = cellSize(count, size, pad);
  c.strokeStyle = color;
  c.lineWidth = width;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.beginPath();
  path.forEach((idx, i) => {
    const x = pad + ((idx % count) + 0.5) * cell;
    const y = pad + (((idx / count) | 0) + 0.5) * cell;
    c[i === 0 ? 'moveTo' : 'lineTo'](x, y);
  });
  c.stroke();
}

function renderLayer() {
  lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawMazeLayer(lctx, S, PAD, { bg: '#fffdf7', wall: '#2b2f36', lw: WALL_WIDTH[n], tint: true, count: n, openBits: open });
}

function drawFog() {
  const cell = cellSize();
  const [bx, by] = [PAD + (vx + 0.5) * cell, PAD + (vy + 0.5) * cell];
  const outer = Math.max(cell * 2.8, 80);
  const g = ctx.createRadialGradient(bx, by, outer * 0.4, bx, by, outer);
  g.addColorStop(0, 'rgba(11,13,18,0)');
  g.addColorStop(1, 'rgba(11,13,18,1)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
}

function drawBall() {
  const cell = cellSize();
  const x = PAD + (vx + 0.5) * cell;
  const y = PAD + (vy + 0.5) * cell;
  const r = cell * 0.3;
  ctx.fillStyle = 'rgba(0,0,0,.22)';
  ctx.beginPath();
  ctx.ellipse(x + r * 0.15, y + r * 0.35, r, r * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
  g.addColorStop(0, '#ffb3c0');
  g.addColorStop(1, '#8c2638');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = Math.max(1.2, cell * 0.05);
  ctx.strokeStyle = dark ? '#ffffff' : '#5e1a25';
  ctx.stroke();
}

function draw() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(layer, 0, 0);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (dark) drawFog();
  if (showSolution && solutionPath.length > 1) {
    drawPath(ctx, solutionPath, n, S, PAD, 'rgba(245,158,11,.92)', Math.min(8, Math.max(3, cellSize() * 0.24)));
  }
  drawBall();
}

/* ---------- Arayüz ---------- */
const el = {
  time: $('hud-time'), moves: $('hud-moves'), best: $('hud-best'),
  overlay: $('overlay'), ovTitle: $('ov-title'), ovText: $('ov-text'), ovPrimary: $('ov-primary'),
  newMaze: $('btn-new'), restart: $('btn-restart'), solve: $('btn-solve'), dark: $('btn-dark'),
  print: $('btn-print'), full: $('btn-full'), printSolution: $('chk-print-solution'),
  live: $('live'), sheet: $('print-sheet'), note: $('lb-note'),
};
const sizeButtons = SIZES.map((s) => $(`size-${s}`));
const shown = {};
function setText(key, value) {
  if (shown[key] !== value) { shown[key] = value; el[key].textContent = value; }
}

function formatTime(ms) {
  const tenths = Math.floor(ms / 100);
  const minutes = Math.floor(tenths / 600);
  const seconds = ((tenths % 600) / 10).toFixed(1).replace('.', ',');
  if (!minutes) return `${seconds} sn`;
  return `${minutes}:${(tenths % 600) < 100 ? '0' : ''}${seconds}`;
}

const currentMs = () => (state === 'ready' ? 0 : state === 'won' ? finalMs : performance.now() - t0);

function renderHud() {
  setText('time', formatTime(currentMs()));
  setText('moves', String(moves));
  setText('best', bestMs ? formatTime(bestMs) : 'yok');
}
function announce(msg) { el.live.textContent = msg; }
function note(msg) { el.note.textContent = msg; }

/* ---------- Animasyon döngüsü: yalnızca gerektiğinde çalışır ---------- */
let raf = 0;
let lastT = 0;
function schedule() {
  if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(tick); }
}
function tick(now) {
  raf = 0;
  const dt = Math.min(0.05, (now - lastT) / 1000);
  lastT = now;
  // Topu hedef hücreye yumuşakça kaydır (azaltılmış harekette anında)
  let moving = false;
  if (reduceMotion) { vx = px; vy = py; } else {
    const k = Math.min(1, dt * 18);
    vx += (px - vx) * k;
    vy += (py - vy) * k;
    if (Math.abs(px - vx) < 0.002 && Math.abs(py - vy) < 0.002) { vx = px; vy = py; } else moving = true;
  }
  draw();
  renderHud();
  if (moving || state === 'playing') schedule();
}

/* ---------- Oyun akışı ---------- */
function setButtons() {
  el.restart.disabled = moves === 0 && state === 'ready' && !showSolution;
  el.solve.disabled = state === 'won';
  el.solve.textContent = showSolution ? 'Çözümü gizle' : 'Çözümü göster';
  el.dark.setAttribute('aria-pressed', String(dark));
  sizeButtons.forEach((b, i) => b.setAttribute('aria-pressed', String(SIZES[i] === n)));
}

function recomputeSolution() {
  solutionPath = solveMaze(open, n, py * n + px, n * n - 1) || [];
}

function resetAttempt() {
  px = py = 0; vx = vy = 0; moves = 0; state = 'ready'; t0 = 0; finalMs = 0;
  showSolution = false; usedHint = false; solutionPath = [];
  el.overlay.hidden = true;
  note('İlk harekette süre başlar.');
  setButtons();
  schedule();
}

function newMaze(size = n) {
  n = size;
  open = generateMaze(n);
  bestMs = readBest(n);
  renderLayer();
  resetAttempt();
  announce(`Yeni ${n} çarpı ${n} labirent hazır.`);
}

function win() {
  finalMs = performance.now() - t0;
  state = 'won';
  let record = false;
  if (!usedHint) {
    const best = readBest(n);
    if (!best || finalMs < best) { writeBest(n, Math.round(finalMs)); record = true; }
  }
  bestMs = readBest(n);
  const best = bestMs;
  const parts = [`Süre: ${formatTime(finalMs)}, hamle: ${moves}.`];
  if (usedHint) parts.push('Çözümü gösterdiğin için bu tur en iyi süreye yazılmadı.');
  else if (record) parts.push('Yeni en iyi süre!');
  else if (best) parts.push(`En iyi süre: ${formatTime(best)}.`);
  el.ovTitle.textContent = 'Tebrikler, çıkışı buldun!';
  el.ovText.textContent = parts.join(' ');
  el.overlay.hidden = false;
  setButtons();
  announce(`Tebrikler, çıkışı buldun. ${parts.join(' ')}`);
  el.ovPrimary.focus({ preventScroll: true });
}

function step(key) {
  if (state === 'won') return false;
  const d = DIR[key];
  const idx = py * n + px;
  if (!(open[idx] & d.bit)) {
    // Duvara çarpma: top kısa bir "dürtme" hareketi yapar
    if (!reduceMotion) { vx += d.dx * 0.14; vy += d.dy * 0.14; }
    schedule();
    return false;
  }
  px += d.dx;
  py += d.dy;
  moves++;
  if (state === 'ready') { state = 'playing'; t0 = performance.now(); }
  if (showSolution) recomputeSolution();
  if (px === n - 1 && py === n - 1) win();
  setButtons();
  schedule();
  return true;
}

function toggleSolution() {
  if (state === 'won') return;
  showSolution = !showSolution;
  if (showSolution) {
    usedHint = true;
    recomputeSolution();
    note('Çözüm gösteriliyor; bu tur en iyi süreye yazılmaz.');
    announce('Çözüm yolu gösteriliyor.');
  } else {
    note(usedHint ? 'Çözüm gösterildiği için bu tur en iyi süreye yazılmaz.' : 'İlk harekette süre başlar.');
    announce('Çözüm yolu gizlendi.');
  }
  setButtons();
  schedule();
}

function toggleDark() {
  dark = !dark;
  announce(dark ? 'Karanlık mod açık: yalnızca yakın çevre görünür.' : 'Karanlık mod kapalı.');
  setButtons();
  schedule();
}

/* ---------- Klavye ---------- */
// Oklar ve WASD yalnızca oyun kutusuna odaklıyken ya da sayfada odak yokken (labirent ekranda görünürse) çalışır;
// böylece makale okurken ok tuşlarıyla sayfa kaydırma bozulmaz, form öğelerinde de müdahale edilmez.
function boxInView() {
  const r = box.getBoundingClientRect();
  return r.bottom > 80 && r.top < window.innerHeight - 80;
}
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const dir = KEY_MAP[e.key];
  if (!dir) return;
  const t = e.target;
  if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName))) return;
  const inside = t instanceof Node && box.contains(t);
  if (!inside && !(t === document.body && boxInView())) return;
  e.preventDefault();
  step(dir);
});

/* ---------- Kaydırma (parmak ya da fare ile sürükleme) ---------- */
let drag = null;
function swipeThreshold() {
  const rect = canvas.getBoundingClientRect();
  return Math.max(18, ((rect.width * cellSize()) / S) * 0.8);
}
canvas.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
  try { canvas.setPointerCapture(e.pointerId); } catch { /* bazı ortamlarda desteklenmez */ }
  canvas.focus({ preventScroll: true });
});
canvas.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = e.clientX - drag.x;
  const dy = e.clientY - drag.y;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < swipeThreshold()) return;
  step(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'E' : 'W') : (dy > 0 ? 'S' : 'N'));
  drag.x = e.clientX;
  drag.y = e.clientY;
});
const endDrag = (e) => { if (drag && e.pointerId === drag.id) drag = null; };
canvas.addEventListener('pointerup', endDrag);
canvas.addEventListener('pointercancel', endDrag);

/* ---------- Ekran okları (basılı tutunca tekrarlar) ---------- */
let repeatTimer = 0;
function stopRepeat() { clearTimeout(repeatTimer); clearInterval(repeatTimer); repeatTimer = 0; }
for (const [id, key] of [['dp-up', 'N'], ['dp-right', 'E'], ['dp-down', 'S'], ['dp-left', 'W']]) {
  const b = $(id);
  b.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    stopRepeat();
    step(key);
    repeatTimer = setTimeout(() => { repeatTimer = setInterval(() => step(key), 110); }, 330);
  });
  for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(ev, stopRepeat);
  // Klavyeyle (Enter/Boşluk) etkinleştirme: detail === 0; fare/dokunma pointerdown'da zaten işlendi.
  b.addEventListener('click', (e) => { if (e.detail === 0) step(key); });
}

/* ---------- Düğmeler ---------- */
sizeButtons.forEach((b, i) => b.addEventListener('click', () => { newMaze(SIZES[i]); canvas.focus({ preventScroll: true }); }));
el.newMaze.addEventListener('click', () => { newMaze(); canvas.focus({ preventScroll: true }); });
el.ovPrimary.addEventListener('click', () => { newMaze(); canvas.focus({ preventScroll: true }); });
el.restart.addEventListener('click', () => { resetAttempt(); announce('Aynı labirent baştan başladı.'); canvas.focus({ preventScroll: true }); });
el.solve.addEventListener('click', toggleSolution);
el.dark.addEventListener('click', toggleDark);

if (document.fullscreenEnabled && box.requestFullscreen) {
  el.full.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
} else {
  el.full.hidden = true;
}

/* ---------- Yazdırılabilir labirent ---------- */
// Beyaz zemin, siyah duvar, "BAŞLA" ve "BİTİŞ" etiketli yüksek çözünürlüklü görsel üretir.
function renderPrintImage(withSolution) {
  const size = 1200;
  const pad = 70;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  drawMazeLayer(g, size, pad, { bg: '#ffffff', wall: '#000000', lw: { 10: 7, 20: 5, 30: 3.6 }[n], tint: false, count: n, openBits: open });
  const cell = cellSize(n, size, pad);
  if (withSolution) {
    drawPath(g, solveMaze(open, n, 0, n * n - 1) || [], n, size, pad, '#d32f2f', Math.max(4, cell * 0.22));
  }
  g.fillStyle = '#000000';
  g.font = '700 32px Arial, Helvetica, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'alphabetic';
  const sx = pad + cell / 2;               // giriş hücresinin merkezi
  const ex = size - pad - cell / 2;        // çıkış hücresinin merkezi
  g.fillText('BAŞLA', sx, pad - 30);
  g.fillText('BİTİŞ', ex, size - pad + 62);
  // Aşağı bakan oklar: girişe doğru ve çıkıştan dışarı
  for (const [ax, ay] of [[sx, pad - 6], [ex, size - pad + 26]]) {
    g.beginPath();
    g.moveTo(ax - 11, ay - 18);
    g.lineTo(ax + 11, ay - 18);
    g.lineTo(ax, ay);
    g.closePath();
    g.fill();
  }
  return c.toDataURL('image/png');
}

function makePage(title, dataUrl, alt) {
  const page = document.createElement('div');
  page.className = 'ps-page';
  const h = document.createElement('h2');
  h.textContent = title;
  const meta = document.createElement('p');
  meta.className = 'ps-meta';
  meta.textContent = 'Adın: ______________________   Tarih: ____________   Süre: ____________';
  const img = document.createElement('img');
  img.alt = alt;
  img.src = dataUrl;
  const foot = document.createElement('p');
  foot.className = 'ps-foot';
  foot.textContent = 'Bilişim Ajans – Ücretsiz Labirent Oyunu · araclar.bilisimajans.com/oyunlar/labirent/';
  page.append(h, meta, img, foot);
  return page;
}

async function printMaze() {
  const pages = [makePage(`Labirent ${n}×${n}`, renderPrintImage(false), `${n} çarpı ${n} labirent: sol üstten sağ alta çıkışı bulun`)];
  if (el.printSolution.checked) {
    pages.push(makePage(`Çözüm – Labirent ${n}×${n}`, renderPrintImage(true), `${n} çarpı ${n} labirentin çözüm yolu kırmızı çizgiyle gösterilir`));
  }
  el.sheet.replaceChildren(...pages);
  // Görseller çözülmeden yazdırma penceresi açılırsa sayfa boş çıkabilir.
  await Promise.all([...el.sheet.querySelectorAll('img')].map((img) => img.decode().catch(() => {})));
  window.print();
}
el.print.addEventListener('click', () => { printMaze(); });

/* ---------- Test kancası ---------- */
// Playwright testi labirent yapısını okuyup kendi BFS'iyle çözülebilirliği doğrular.
window.__labirentTest = Object.assign(() => ({
  n, open: Array.from(open), px, py, moves, state, showSolution, usedHint, dark,
  goal: n * n - 1, path: showSolution ? solutionPath.slice() : [],
}), {
  // Ana tuvaldeki hücre merkezinin RGB değeri (çözüm çizgisi görünüyor mu kontrolü için)
  pixel(idx) {
    const [cx, cy] = centerOf(idx % n, (idx / n) | 0);
    const d = ctx.getImageData(Math.round(cx * dpr), Math.round(cy * dpr), 1, 1).data;
    return [d[0], d[1], d[2]];
  },
});

newMaze(10);
