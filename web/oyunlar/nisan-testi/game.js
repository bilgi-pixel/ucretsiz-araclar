// Nişan Testi: süre bitene kadar rastgele beliren hedeflere olabildiğince hızlı ve isabetli tıkla.
// Puan = isabet başına 100 + hız bonusu (1 saniyenin altında kalan her 10 ms için 1) − ıska başına 30.
// Ses yok, ağ isteği yok. Rekorlar yalnızca localStorage'da (ba-oyun-nisan-testi).

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-nisan-testi';
const SIZES = { buyuk: 64, orta: 46, kucuk: 30 };
const SIZE_NAMES = { buyuk: 'büyük', orta: 'orta', kucuk: 'küçük' };
const DURS = [15, 30, 60];

/* ---------- Kayıt ---------- */
const store = { best: {} };
function loadStore() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    if (o && typeof o === 'object' && o.best && typeof o.best === 'object' && !Array.isArray(o.best)) {
      for (const [k, v] of Object.entries(o.best)) {
        if (/^(buyuk|orta|kucuk)-(15|30|60)$/.test(k) && Number.isInteger(v) && v >= 0 && v < 1e7) store.best[k] = v;
      }
    }
  } catch (e) { /* bozuk ya da kapalı depolama: varsayılanlarla devam */ }
}
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Puan ---------- */
export const hitPoints = (ms) => 100 + Math.max(0, Math.round((1000 - ms) / 10));
const nf = new Intl.NumberFormat('tr-TR');

const boxEl = $('oyun');
const fieldEl = $('nt-field');
const targetEl = $('nt-target');
const startBtn = $('nt-start');
const sizeSel = $('nt-size');
const durSel = $('nt-dur');

const state = { phase: 'hazir', hits: 0, misses: 0, score: 0, rts: [], spawnAt: 0, endAt: 0, x: 50, y: 50, timer: 0, durMs: 30000, last: null };

const cfgKey = () => `${sizeSel.value}-${durSel.value}`;
const best = () => store.best[cfgKey()] || 0;
const say = (t) => { $('nt-msg').textContent = t; };
const acc = () => (state.hits + state.misses ? Math.round((state.hits / (state.hits + state.misses)) * 100) : 0);
const avg = () => (state.rts.length ? Math.round(state.rts.reduce((a, b) => a + b, 0) / state.rts.length) : 0);

function render() {
  const left = state.phase === 'oyun' ? Math.max(0, state.endAt - performance.now()) : state.phase === 'bitti' ? 0 : state.durMs;
  $('nt-time').textContent = (left / 1000).toFixed(1);
  $('nt-hits').textContent = String(state.hits);
  $('nt-acc').textContent = state.hits + state.misses ? `%${acc()}` : '–';
  $('nt-best').textContent = nf.format(best());
  $('nt-score').textContent = nf.format(state.score);
}

function place() {
  const px = SIZES[sizeSel.value];
  const w = fieldEl.clientWidth || 400;
  const h = fieldEl.clientHeight || 300;
  // Hedef alan dışına taşmasın: yarıçap kadar kenar payı bırak.
  const mx = Math.min(45, ((px / 2 + 4) / w) * 100);
  const my = Math.min(45, ((px / 2 + 4) / h) * 100);
  let x;
  let y;
  do {
    x = mx + Math.random() * (100 - 2 * mx);
    y = my + Math.random() * (100 - 2 * my);
  } while (Math.hypot((x - state.x) * w / 100, (y - state.y) * h / 100) < px * 1.2);
  state.x = x;
  state.y = y;
  targetEl.style.left = `${x}%`;
  targetEl.style.top = `${y}%`;
  targetEl.style.setProperty('--s', `${px}px`);
  targetEl.classList.remove('is-pop');
  void targetEl.offsetWidth;
  targetEl.classList.add('is-pop');
  state.spawnAt = performance.now();
}

function start() {
  state.phase = 'oyun';
  state.hits = 0; state.misses = 0; state.score = 0; state.rts = [];
  state.durMs = Number(durSel.value) * 1000;
  state.endAt = performance.now() + state.durMs;
  boxEl.dataset.phase = 'oyun';
  startBtn.hidden = true;
  $('sonuc').hidden = true; $('sonuc').classList.remove('is-active');
  sizeSel.disabled = true; durSel.disabled = true;
  targetEl.hidden = false;
  place();
  clearInterval(state.timer);
  state.timer = setInterval(tick, 100);
  say(`Başladı! ${durSel.value} saniyeniz var.`);
  render();
}

function tick() {
  if (state.phase !== 'oyun') return;
  if (performance.now() >= state.endAt) finish();
  else render();
}

function hit() {
  if (state.phase !== 'oyun') return;
  const rt = Math.max(0, Math.round(performance.now() - state.spawnAt));
  state.hits++;
  state.rts.push(rt);
  state.score += hitPoints(rt);
  place();
  render();
}

function miss() {
  if (state.phase !== 'oyun') return;
  state.misses++;
  state.score = Math.max(0, state.score - 30);
  fieldEl.classList.remove('is-miss');
  void fieldEl.offsetWidth;
  fieldEl.classList.add('is-miss');
  render();
}

function finish() {
  if (state.phase !== 'oyun') return;
  clearInterval(state.timer);
  state.phase = 'bitti';
  boxEl.dataset.phase = 'bitti';
  targetEl.hidden = true;
  startBtn.hidden = false;
  startBtn.textContent = 'Tekrar başla';
  sizeSel.disabled = false; durSel.disabled = false;
  const k = cfgKey();
  const record = state.score > (store.best[k] || 0);
  if (record) { store.best[k] = state.score; saveStore(); }
  state.last = { score: state.score, hits: state.hits, misses: state.misses, acc: acc(), avg: avg(), record };
  $('sonuc-puan').textContent = nf.format(state.score);
  $('sonuc-isabet').textContent = String(state.hits);
  $('sonuc-iska').textContent = String(state.misses);
  $('sonuc-dogruluk').textContent = state.hits + state.misses ? `%${acc()}` : '–';
  $('sonuc-ort').textContent = state.rts.length ? `${avg()} ms` : '–';
  $('sonuc-rekor').hidden = !record;
  $('sonuc').hidden = false; $('sonuc').classList.add('is-active');
  say(`Süre doldu. ${state.hits} isabet, ${nf.format(state.score)} puan (${SIZE_NAMES[sizeSel.value]} hedef, ${durSel.value} saniye).`);
  render();
}

/* ---------- Olaylar ---------- */
targetEl.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); hit(); });
// Klavyeyle (Enter/boşluk) basış: tıklama olayı detail=0 ile gelir.
targetEl.addEventListener('click', (e) => { e.stopPropagation(); if (e.detail === 0) hit(); });
fieldEl.addEventListener('pointerdown', (e) => { if (e.target === fieldEl) miss(); });
startBtn.addEventListener('click', (e) => { e.stopPropagation(); start(); targetEl.focus({ preventScroll: true }); });
startBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
$('nt-restart').addEventListener('click', () => { clearInterval(state.timer); state.phase = 'hazir'; start(); });
$('nt-again').addEventListener('click', () => { start(); targetEl.focus({ preventScroll: true }); });
sizeSel.addEventListener('change', render);
durSel.addEventListener('change', () => { state.durMs = Number(durSel.value) * 1000; render(); });
boxEl.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if ((e.key === 's' || e.key === 'S') && state.phase !== 'oyun') { e.preventDefault(); start(); targetEl.focus({ preventScroll: true }); }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && state.phase === 'oyun') finish(); });

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
const snapshot = () => ({ phase: state.phase, hits: state.hits, misses: state.misses, score: state.score, best: best(), x: state.x, y: state.y, last: state.last });
window.__nisanTest = Object.assign(snapshot, { start, finish, hitPoints, setEnd: (ms) => { state.endAt = performance.now() + ms; } });

loadStore();
render();
