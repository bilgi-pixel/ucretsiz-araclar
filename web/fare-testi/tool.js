// Fare testi: tıklama, çift tıklama, kaydırma, CPS ve çizim alanı. Hiçbir veri cihazdan çıkmaz.
const $ = (id) => document.getElementById(id);

const BUTTONS = [
  { id: 'b0', name: 'Sol' }, { id: 'b1', name: 'Orta' }, { id: 'b2', name: 'Sağ' }, { id: 'b3', name: 'Geri (yan)' }, { id: 'b4', name: 'İleri (yan)' },
];
const S = {
  clicks: [0, 0, 0, 0, 0], lastDown: [null, null, null, null, null], suspects: 0, minGap: null, dbl: 0, log: [],
  wheel: { up: 0, down: 0, left: 0, right: 0, dy: 0, dx: 0 },
  cps: { best: 0, last: 0, running: false, done: false, count: 0, start: 0, dur: 5, timer: 0 },
  moves: 0, maxHz: 0, lastHz: 0, stamps: [], pointerTypes: new Set(),
};
const fmt = (n) => n.toFixed(1).replace('.', ',');

// --- Tıklama göstergesi ve istenmeyen çift tıklama tespiti ---
const pad = $('click-pad');
pad.addEventListener('contextmenu', (e) => e.preventDefault());
['mouseup', 'auxclick', 'mousedown'].forEach((t) => pad.addEventListener(t, (e) => { if (e.button > 0) e.preventDefault(); }));
pad.addEventListener('pointerdown', (e) => {
  const b = e.button;
  if (b < 0 || b > 4) return;
  S.clicks[b]++;
  $(BUTTONS[b].id + '-n').textContent = String(S.clicks[b]);
  $(BUTTONS[b].id).classList.add('is-down');
  noteType(e);
  const prev = S.lastDown[b];
  if (prev != null) {
    const gap = e.timeStamp - prev;
    if (gap < 1000) {
      S.log.unshift(`${BUTTONS[b].name}: ${gap.toFixed(0)} ms${gap < 80 ? ' (şüpheli)' : ''}`);
      S.log.length = Math.min(S.log.length, 6);
      if (S.minGap == null || gap < S.minGap) S.minGap = gap;
      if (gap < 80) S.suspects++;
    }
  }
  S.lastDown[b] = e.timeStamp;
  renderDouble();
  renderReport();
});
const release = (e) => { if (e.button >= 0 && e.button <= 4) $(BUTTONS[e.button].id).classList.remove('is-down'); };
pad.addEventListener('pointerup', release);
pad.addEventListener('pointercancel', () => BUTTONS.forEach((b) => $(b.id).classList.remove('is-down')));
pad.addEventListener('dblclick', () => { S.dbl++; $('dbl-count').textContent = String(S.dbl); renderReport(); });
function renderDouble() {
  $('sus-count').textContent = String(S.suspects);
  $('min-gap').textContent = S.minGap == null ? '–' : `${S.minGap.toFixed(0)} ms`;
  $('gap-log').textContent = S.log.length ? S.log.join('  |  ') : 'Henüz ardışık tıklama yok.';
  $('sus-warn').hidden = S.suspects === 0;
}

// --- Tekerlek ---
$('wheel-pad').addEventListener('wheel', (e) => {
  e.preventDefault(); // Yalnızca bu kutunun içinde sayfa kaymasını durdurur
  if (e.deltaY < 0) S.wheel.up++; else if (e.deltaY > 0) S.wheel.down++;
  if (e.deltaX < 0) S.wheel.left++; else if (e.deltaX > 0) S.wheel.right++;
  S.wheel.dy += e.deltaY; S.wheel.dx += e.deltaX;
  $('w-up').textContent = String(S.wheel.up);
  $('w-down').textContent = String(S.wheel.down);
  $('w-left').textContent = String(S.wheel.left);
  $('w-right').textContent = String(S.wheel.right);
  $('w-delta').textContent = `Y: ${Math.round(S.wheel.dy)} · X: ${Math.round(S.wheel.dx)} (birim: ${['piksel', 'satır', 'sayfa'][e.deltaMode] || e.deltaMode})`;
  renderReport();
}, { passive: false });

// --- CPS ---
const cpad = $('cps-pad');
function cpsReset() {
  clearTimeout(S.cps.timer);
  S.cps.running = false; S.cps.count = 0;
  $('cps-count').textContent = '0';
  $('cps-time').textContent = `${S.cps.dur} sn`;
  cpad.textContent = 'Başlamak için buraya tıklayın';
}
function cpsFinish() {
  S.cps.running = false; S.cps.done = true;
  S.cps.last = S.cps.count / S.cps.dur;
  S.cps.best = Math.max(S.cps.best, S.cps.last);
  $('cps-last').textContent = fmt(S.cps.last);
  $('cps-best').textContent = fmt(S.cps.best);
  $('cps-time').textContent = 'Bitti';
  cpad.textContent = `Süre doldu: ${S.cps.count} tıklama, ${fmt(S.cps.last)} CPS. Tekrar için tıklayın`;
  renderReport();
}
function cpsTick() {
  if (!S.cps.running) return;
  const left = S.cps.dur - (performance.now() - S.cps.start) / 1000;
  $('cps-time').textContent = `${Math.max(0, left).toFixed(1).replace('.', ',')} sn`;
  if (left > 0) requestAnimationFrame(cpsTick);
}
cpad.addEventListener('contextmenu', (e) => e.preventDefault());
cpad.addEventListener('click', () => {
  if (!S.cps.running) {
    // İlk tıklama turu başlatır ve sayılır
    S.cps.done = false;
    S.cps.running = true; S.cps.count = 0; S.cps.start = performance.now();
    S.cps.timer = setTimeout(cpsFinish, S.cps.dur * 1000);
    requestAnimationFrame(cpsTick);
    cpad.textContent = 'Hızlı tıklayın!';
  }
  S.cps.count++;
  $('cps-count').textContent = String(S.cps.count);
});
document.querySelectorAll('input[name="cps-dur"]').forEach((r) => r.addEventListener('change', () => {
  if (!r.checked) return;
  S.cps.dur = Number(r.value); S.cps.done = false; cpsReset();
}));
$('cps-reset').addEventListener('click', () => { S.cps.done = false; cpsReset(); });

// --- Çizim alanı, imleç bilgisi, tahmini örnekleme hızı ---
const cv = $('draw');
const ctx = cv.getContext('2d');
let prevPt = null;
function noteType(e) {
  const t = e.pointerType || '–';
  S.pointerTypes.add(t);
  $('pi-type').textContent = t;
  $('pi-buttons').textContent = String(e.buttons);
}
function draw(e) {
  const r = cv.getBoundingClientRect();
  const x = (e.clientX - r.left) * (cv.width / r.width);
  const y = (e.clientY - r.top) * (cv.height / r.height);
  if (prevPt) {
    const dt = Math.max(1, e.timeStamp - prevPt.t);
    const speed = Math.hypot(x - prevPt.x, y - prevPt.y) / dt * 1000; // piksel/sn
    ctx.strokeStyle = `hsl(${Math.max(0, 210 - speed / 8)}, 80%, 45%)`;
    ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(prevPt.x, prevPt.y); ctx.lineTo(x, y); ctx.stroke();
    $('pi-speed').textContent = `${Math.round(speed)} px/sn`;
  }
  prevPt = { x, y, t: e.timeStamp };
  S.moves++;
  $('pi-xy').textContent = `${Math.round(e.clientX)}, ${Math.round(e.clientY)}`;
  $('move-count').textContent = String(S.moves);
  noteType(e);
  S.stamps.push(e.timeStamp);
}
// pointerrawupdate varsa ham olay sıklığını verir; yoksa pointermove kareye hizalanır (genelde 60-144 Hz)
const moveEvt = 'onpointerrawupdate' in window ? 'pointerrawupdate' : 'pointermove';
cv.addEventListener(moveEvt, draw);
cv.addEventListener('pointerleave', () => { prevPt = null; });
cv.addEventListener('pointerdown', (e) => noteType(e));
setInterval(() => {
  const now = performance.now();
  S.stamps = S.stamps.filter((t) => now - t < 500);
  if (S.stamps.length >= 12) {
    const span = S.stamps[S.stamps.length - 1] - S.stamps[0];
    if (span > 50) {
      S.lastHz = Math.round((S.stamps.length - 1) / span * 1000);
      S.maxHz = Math.max(S.maxHz, S.lastHz);
      $('pi-rate').textContent = `~${S.lastHz} Hz (en yüksek ~${S.maxHz} Hz)`;
      $('pi-mode').textContent = moveEvt === 'pointerrawupdate' ? 'ham olay (pointerrawupdate)' : 'kareye hizalı olay (pointermove)';
      renderReport();
    }
  }
}, 250);
$('draw-clear').addEventListener('click', () => { ctx.clearRect(0, 0, cv.width, cv.height); prevPt = null; });

// --- Rapor ---
function reportText() {
  const c = S.clicks;
  return [
    'Bilişim Ajans – Fare Testi Raporu',
    `Tıklamalar: Sol ${c[0]} · Orta ${c[1]} · Sağ ${c[2]} · Geri ${c[3]} · İleri ${c[4]}`,
    `Çift tıklama olayı: ${S.dbl} · Şüpheli çift tıklama (< 80 ms): ${S.suspects}${S.minGap != null ? ' · en kısa aralık ' + S.minGap.toFixed(0) + ' ms' : ''}`,
    `Tekerlek: yukarı ${S.wheel.up} · aşağı ${S.wheel.down} · sol ${S.wheel.left} · sağ ${S.wheel.right}`,
    `CPS: son ${fmt(S.cps.last)} · en iyi ${fmt(S.cps.best)} (${S.cps.dur} sn turu)`,
    `İmleç olayı: ${S.moves}${S.maxHz ? ' · tahmini örnekleme ~' + S.maxHz + ' Hz' : ''} · işaretçi türü: ${[...S.pointerTypes].join(', ') || '–'}`,
  ].join('\n');
}
function renderReport() { $('report').textContent = reportText(); }
async function copyReport() {
  try { await navigator.clipboard.writeText(reportText()); $('copy-msg').textContent = 'Rapor panoya kopyalandı.'; }
  catch {
    const range = document.createRange(); range.selectNodeContents($('report'));
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
    $('copy-msg').textContent = 'Pano erişimi kapalı; rapor seçildi, Ctrl+C ile kopyalayabilirsiniz.';
  }
}
function resetAll() {
  S.clicks = [0, 0, 0, 0, 0]; S.lastDown = [null, null, null, null, null]; S.suspects = 0; S.minGap = null; S.dbl = 0; S.log = [];
  S.wheel = { up: 0, down: 0, left: 0, right: 0, dy: 0, dx: 0 };
  S.cps.best = 0; S.cps.last = 0; S.cps.done = false;
  S.moves = 0; S.maxHz = 0; S.lastHz = 0; S.stamps = []; S.pointerTypes = new Set();
  BUTTONS.forEach((b) => { $(b.id + '-n').textContent = '0'; });
  ['dbl-count', 'w-up', 'w-down', 'w-left', 'w-right', 'move-count'].forEach((id) => { $(id).textContent = '0'; });
  $('w-delta').textContent = '–'; $('cps-last').textContent = '–'; $('cps-best').textContent = '–';
  ['pi-type', 'pi-buttons', 'pi-xy', 'pi-speed', 'pi-rate', 'pi-mode'].forEach((id) => { $(id).textContent = '–'; });
  $('copy-msg').textContent = '';
  ctx.clearRect(0, 0, cv.width, cv.height); prevPt = null;
  cpsReset(); renderDouble(); renderReport();
}
$('btn-copy').addEventListener('click', copyReport);
$('btn-reset').addEventListener('click', resetAll);
cpsReset(); renderDouble(); renderReport();
