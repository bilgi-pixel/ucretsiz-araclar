// CPS Testi — saniyedeki tıklama sayısı. Dış kütüphane ve ağ isteği yok.
// En iyi skorlar yalnızca bu tarayıcının localStorage alanında (mod başına) durur.

const MODES = [1, 5, 10, 30, 60];
const STORE_KEY = 'ba-oyun-cps-testi';
const MAX_HUMAN_CPS = 25; // bunun üstü insan sınırlarının dışında sayılır, rekor olarak kaydedilmez
const DUP_MS = 1; // aynı fiziksel basıştan gelen çift olayları süzmek için en küçük aralık (ms)
const LOCK_MS = 700; // test bitince kazara tıklamayı önleyen kısa kilit

const LEVELS = [
  [4, 'Yavaş'],
  [6, 'Normal'],
  [8, 'İyi'],
  [10, 'Hızlı'],
  [12, 'Çok hızlı'],
  [14, 'Elit'],
  [Infinity, 'Olağanüstü'],
];
const levelOf = (cps) => LEVELS.find(([max]) => cps < max)[1];

const $ = (id) => document.getElementById(id);
const pad = $('pad');
const elTime = $('time');
const elClicks = $('clicks');
const elCps = $('cps');
const elBest = $('best');
const elBig = $('pad-big');
const elSub = $('pad-sub');
const result = $('result');

/* ---------- Kalıcı veri ---------- */

function loadBest() {
  const out = {};
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    const src = raw && typeof raw === 'object' ? raw.best : null;
    if (src && typeof src === 'object') {
      for (const m of MODES) {
        const v = Number(src[m]);
        if (Number.isFinite(v) && v > 0 && v <= MAX_HUMAN_CPS) out[m] = v;
      }
    }
  } catch (_) { /* bozuk ya da kapalı depolama: boş başla */ }
  return out;
}
let best = loadBest();
function saveBest() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ best })); } catch (_) { /* özel gezinme */ }
}

/* ---------- Durum ---------- */

let state = 'hazir'; // hazir | sayiyor | bitti
let mode = 5;
let input = 'mouse'; // mouse | space
let clicks = 0;
let t0 = 0;
let timer = null;
let lastStamp = -1e9;
let lockUntil = 0;

const fmt = (n, d = 1) => n.toFixed(d);
const elapsed = () => (performance.now() - t0) / 1000;

function setAttrs(cps) {
  pad.dataset.state = state;
  pad.dataset.clicks = String(clicks);
  pad.dataset.mode = String(mode);
  pad.dataset.input = input;
  pad.dataset.cps = fmt(cps ?? 0, 2);
}

function render() {
  const left = state === 'sayiyor' ? Math.max(0, mode - elapsed()) : mode;
  const e = state === 'sayiyor' ? Math.max(elapsed(), 0.5) : mode;
  const liveCps = state === 'hazir' ? 0 : clicks / e;
  elTime.textContent = fmt(left);
  elClicks.textContent = String(clicks);
  elCps.textContent = fmt(state === 'bitti' ? clicks / mode : liveCps);
  elBest.textContent = best[mode] ? fmt(best[mode], 2) : '–';
  setAttrs(state === 'bitti' ? clicks / mode : liveCps);
}

function reset() {
  clearInterval(timer);
  timer = null;
  state = 'hazir';
  clicks = 0;
  result.hidden = true;
  elBig.textContent = input === 'space' ? 'Boşluk!' : 'Tıkla!';
  elSub.textContent = input === 'space' ? 'Alan seçiliyken Boşluk tuşuna basın; ilk basışla süre başlar.' : 'İlk tıklamayla süre başlar.';
  render();
}

function finish() {
  clearInterval(timer);
  timer = null;
  state = 'bitti';
  lockUntil = performance.now() + LOCK_MS;
  const cps = clicks / mode;
  const plausible = cps <= MAX_HUMAN_CPS;
  const record = plausible && clicks > 0 && cps > (best[mode] || 0);
  if (record) { best[mode] = Math.round(cps * 100) / 100; saveBest(); }
  elBig.textContent = fmt(cps, 2) + ' CPS';
  elSub.textContent = 'Süre doldu.';
  $('res-title').textContent = record ? 'Yeni en iyi skor!' : 'Süre doldu';
  $('res-line').textContent = `${mode} saniyede ${clicks} tıklama = ${fmt(cps, 2)} CPS`;
  $('res-level').textContent = `Seviye: ${levelOf(cps)}`;
  $('res-note').textContent = !plausible
    ? 'Bu hız insan sınırlarının üzerinde; otomatik tıklayıcı kullanıldıysa sonuç kaydedilmez.'
    : best[mode] ? `Bu mod için en iyi skorunuz: ${fmt(best[mode], 2)} CPS` : '';
  result.hidden = false;
  render();
}

function tick() {
  if (elapsed() >= mode) finish();
  else render();
}

/** Tek bir sayılabilir basış; stamp = olayın zaman damgası. */
function count(stamp) {
  if (state === 'bitti') return;
  if (stamp - lastStamp < DUP_MS) return; // aynı basıştan gelen çift olay
  const now = performance.now();
  if (state === 'hazir') {
    state = 'sayiyor';
    t0 = now;
    clicks = 0;
    result.hidden = true;
    elSub.textContent = 'Devam edin!';
    timer = setInterval(tick, 50);
  } else if ((now - t0) / 1000 >= mode) {
    finish();
    return;
  }
  lastStamp = stamp;
  clicks += 1;
  elBig.textContent = String(clicks);
  pad.classList.add('hit');
  setTimeout(() => pad.classList.remove('hit'), 60);
  render();
}

/* ---------- Girdiler ---------- */

// Fare / dokunma: yalnızca pointerdown sayılır; sonradan üretilen click ve mouse olayları yok sayılır.
pad.addEventListener('pointerdown', (e) => {
  if (!e.isTrusted) return; // betikle üretilmiş sentetik olay
  if (input !== 'mouse' || !e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return;
  if (state === 'bitti') return;
  e.preventDefault();
  count(e.timeStamp);
});
pad.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  if (!e.isTrusted) return;
  if (e.key === 'Escape') { reset(); return; }
  const onPad = e.target === pad || e.target === document.body;
  if (!onPad || e.repeat) return;
  const isSpace = e.code === 'Space' || e.key === ' ';
  if (input === 'space' && isSpace) {
    e.preventDefault();
    if (state !== 'bitti') count(e.timeStamp);
  } else if (input === 'mouse' && e.key === 'Enter' && e.target === pad) {
    e.preventDefault();
    if (state !== 'bitti') count(e.timeStamp);
  } else if (isSpace && e.target === pad) {
    e.preventDefault(); // Boşluk ile sayfa kaymasın
  }
});

/* ---------- Seçimler ---------- */

function syncButtons() {
  document.querySelectorAll('#modes [data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.mode) === mode)));
  document.querySelectorAll('#inputs [data-input]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.input === input)));
}
$('modes').addEventListener('click', (e) => {
  const b = e.target.closest('[data-mode]');
  if (!b) return;
  mode = Number(b.dataset.mode);
  syncButtons();
  reset();
});
$('inputs').addEventListener('click', (e) => {
  const b = e.target.closest('[data-input]');
  if (!b) return;
  input = b.dataset.input;
  syncButtons();
  reset();
  if (input === 'space') pad.focus();
});
$('btn-reset').addEventListener('click', () => { reset(); });

syncButtons();
reset();
