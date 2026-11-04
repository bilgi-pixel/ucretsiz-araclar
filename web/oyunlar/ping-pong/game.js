// Ping Pong — canvas, sabit adımlı fizik (1/120 sn) + requestAnimationFrame ile çizim.
// Dış kütüphane, görsel, ses ve ağ isteği yok. Maç geçmişi ve ayarlar yalnızca bu tarayıcının
// localStorage alanında durur.
// Oyun alanı sabit bir "mantıksal" 640 x 400 birimdir; ekranda CSS ile ölçeklenir,
// canvas devicePixelRatio kadar yüksek çözünürlükte çizilir.

const W = 640;
const H = 400;
const DT = 1 / 120;
const PAD_W = 10;
const PAD_H = 72;
const PAD_MARGIN = 22; // raketin kenara uzaklığı
const PAD_SPEED = 430; // klavye ile birim/sn
const BALL_R = 7;
const BALL_BASE = 300; // servis hızı (birim/sn)
const BALL_ACC = 24; // her raket vuruşunda eklenen hız
const BALL_MAX = 760;
const MAX_ANG = (52 * Math.PI) / 180; // raketin ucuna çarpınca en fazla bu kadar sapar
const SERVE_DELAY = 0.8;
const HISTORY_MAX = 20;
const STORE_KEY = 'ba-oyun-ping-pong';

const LEFT_FACE = PAD_MARGIN + PAD_W; // sol raketin top tarafındaki yüzü
const RIGHT_FACE = W - PAD_MARGIN - PAD_W; // sağ raketin top tarafındaki yüzü

// Bilgisayar rakibi: takip hızı, hata payı, tahmin ve takibe başlama noktası (topun x konumu / genişlik)
const AI = {
  kolay: { speed: 190, err: 46, predict: false, from: 0.5, label: 'kolay' },
  orta: { speed: 290, err: 26, predict: false, from: 0.3, label: 'orta' },
  zor: { speed: 420, err: 9, predict: true, from: 0, label: 'zor' },
};

const COLOR = {
  bgTop: '#1b1e23',
  bgBottom: '#121418',
  line: 'rgba(255, 255, 255, .22)',
  score: 'rgba(255, 255, 255, .32)',
  left: '#e6e4e1',
  right: '#e8a0b3',
  ball: '#ffffff',
  text: '#d7d8db',
};

const $ = (id) => document.getElementById(id);
const box = $('game-box');
const stage = $('stage');
const canvas = $('board');
const ctx = canvas.getContext('2d');
const overlay = $('overlay');
const overlayTitle = $('overlay-title');
const overlayText = $('overlay-text');
const overlayBtn = $('overlay-btn');
const btnMain = $('btn-main');
const btnRestart = $('btn-restart');
const btnFull = $('btn-full');
const btnClear = $('btn-clear');
const selMode = $('sel-mode');
const selDiff = $('sel-diff');
const selTarget = $('sel-target');
const fieldDiff = $('field-diff');
const elScoreL = $('score-left');
const elScoreR = $('score-right');
const elLabelL = $('label-left');
const elLabelR = $('label-right');
const elTarget = $('hud-target');
const elRally = $('hud-rally');
const elStatus = $('status');
const elHistory = $('history');
const elHistorySum = $('history-sum');

/* ---------- Rastgelelik: tohumlanabilir (testler için) ---------- */

function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let rand = makeRng((Math.random() * 4294967296) >>> 0);

/* ---------- Kalıcı veri (yalnızca localStorage) ---------- */

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
function validEntry(e) {
  return !!e && typeof e === 'object' && isNum(e.t) && isNum(e.left) && isNum(e.right)
    && (e.winner === 'left' || e.winner === 'right') && (e.mode === 'cpu' || e.mode === 'two')
    && (e.target === 7 || e.target === 11);
}
function loadStore() {
  const base = { history: [], settings: { mode: 'cpu', diff: 'orta', target: 7 } };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return base;
    if (Array.isArray(raw.history)) base.history = raw.history.filter(validEntry).slice(0, HISTORY_MAX);
    const s = raw.settings;
    if (s && typeof s === 'object') {
      if (s.mode === 'two') base.settings.mode = 'two';
      if (s.diff === 'kolay' || s.diff === 'orta' || s.diff === 'zor') base.settings.diff = s.diff;
      if (s.target === 11) base.settings.target = 11;
    }
  } catch (_) {
    /* localStorage kapalı ya da bozuk: oyun varsayılanlarla çalışır */
  }
  return base;
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Oyun durumu ---------- */

let state = 'hazir'; // hazir | oynuyor | duraklatildi | bitti
let phase = 'serve'; // serve (top ortada bekler) | rally (top oyunda)
let mode = store.settings.mode;
let diff = store.settings.diff;
let target = store.settings.target;
let scoreL = 0;
let scoreR = 0;
let rally = 0;
let longest = 0;
let speed = BALL_BASE;
let serveDir = -1; // -1: sola (sol oyuncuya), +1: sağa
let serveTimer = SERVE_DELAY;
let winner = '';
let aiErr = 0;
let unlockAt = 0; // oyun sonu ekranında kazara tuşla geçmeyi önleyen kısa kilit
let manualMode = false; // yalnızca test kancası: gerçek zamanlı döngüyü durdurup advance() ile sürmek için
const ball = { x: W / 2, y: H / 2, vx: 0, vy: 0 };
const pads = { left: H / 2, right: H / 2 };
const keys = { w: false, s: false, up: false, down: false };

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const setPad = (side, y) => { pads[side] = clamp(y, PAD_H / 2, H - PAD_H / 2); };

/* ---------- Servis ve skor ---------- */

function placeBallForServe() {
  ball.x = W / 2;
  ball.y = H / 2;
  ball.vx = 0;
  ball.vy = 0;
  speed = BALL_BASE;
  rally = 0;
  phase = 'serve';
  serveTimer = SERVE_DELAY;
  aiErr = (rand() * 2 - 1) * AI[diff].err;
}

function launchBall() {
  const a = (0.2 + 0.2 * rand()) * (rand() < 0.5 ? -1 : 1); // yatayla 11-23 derece
  ball.vx = serveDir * speed * Math.cos(a);
  ball.vy = speed * Math.sin(a);
  phase = 'rally';
}

function pointTo(side) {
  if (side === 'left') scoreL += 1; else scoreR += 1;
  serveDir = side === 'left' ? 1 : -1; // topu puanı kaybeden karşılar
  const reached = side === 'left' ? scoreL : scoreR;
  if (reached >= target) { endMatch(side); return; }
  placeBallForServe();
  announce(`Sayı: ${side === 'left' ? leftName() : rightName()}. Skor ${scoreL} - ${scoreR}.`);
}

function leftName() { return mode === 'cpu' ? 'sen' : 'sol oyuncu'; }
function rightName() { return mode === 'cpu' ? 'bilgisayar' : 'sağ oyuncu'; }

/* ---------- Bilgisayar rakibi ---------- */

// Topun sağ rakete ulaşacağı y konumu (üst/alt duvar yansımaları dahil)
function predictY() {
  if (ball.vx <= 0) return ball.y;
  const t = (RIGHT_FACE - BALL_R - ball.x) / ball.vx;
  const span = H - 2 * BALL_R;
  const raw = ball.y - BALL_R + ball.vy * t;
  const m = ((raw % (2 * span)) + 2 * span) % (2 * span);
  return BALL_R + (m > span ? 2 * span - m : m);
}

function moveAI(dt) {
  const cfg = AI[diff];
  let goal = H / 2; // top uzaktayken ortaya doğru yavaşça döner
  let sp = cfg.speed * 0.5;
  if (phase === 'rally' && ball.vx > 0 && ball.x > W * cfg.from) {
    goal = (cfg.predict ? predictY() : ball.y) + aiErr;
    sp = cfg.speed;
  }
  const d = goal - pads.right;
  if (Math.abs(d) > 3) setPad('right', pads.right + clamp(d, -sp * dt, sp * dt));
}

/* ---------- Güncelleme ---------- */

function update(dt) {
  // Oyuncu raketleri
  const upL = keys.w || (mode === 'cpu' && keys.up);
  const dnL = keys.s || (mode === 'cpu' && keys.down);
  const dL = (dnL ? 1 : 0) - (upL ? 1 : 0);
  if (dL) setPad('left', pads.left + dL * PAD_SPEED * dt);
  if (mode === 'two') {
    const dR = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    if (dR) setPad('right', pads.right + dR * PAD_SPEED * dt);
  } else {
    moveAI(dt);
  }

  if (phase === 'serve') {
    serveTimer -= dt;
    if (serveTimer <= 0) launchBall();
    return;
  }

  const px = ball.x;
  const py = ball.y;
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  if (ball.y - BALL_R < 0) { ball.y = BALL_R; ball.vy = Math.abs(ball.vy); }
  else if (ball.y + BALL_R > H) { ball.y = H - BALL_R; ball.vy = -Math.abs(ball.vy); }

  // Raket çarpışması: top yüzeyi bu adımda geçtiyse temas noktasını hesapla (hızlı top raketten geçemez)
  if (ball.vx < 0 && px - BALL_R >= LEFT_FACE && ball.x - BALL_R < LEFT_FACE) {
    const t = (px - BALL_R - LEFT_FACE) / Math.max(1e-6, px - ball.x);
    const yAt = py + (ball.y - py) * t;
    if (Math.abs(yAt - pads.left) <= PAD_H / 2 + BALL_R * 0.8) { bounceOff('left', yAt); return; }
  } else if (ball.vx > 0 && px + BALL_R <= RIGHT_FACE && ball.x + BALL_R > RIGHT_FACE) {
    const t = (RIGHT_FACE - px - BALL_R) / Math.max(1e-6, ball.x - px);
    const yAt = py + (ball.y - py) * t;
    if (Math.abs(yAt - pads.right) <= PAD_H / 2 + BALL_R * 0.8) { bounceOff('right', yAt); return; }
  }

  if (ball.x + BALL_R < 0) pointTo('right');
  else if (ball.x - BALL_R > W) pointTo('left');
}

// Raket vuruşu: açı temas noktasına göre belirlenir (orta dik, uçlar geniş açı); her vuruşta top hızlanır.
function bounceOff(side, yAt) {
  const rel = clamp((yAt - pads[side]) / (PAD_H / 2 + BALL_R), -1, 1);
  const ang = rel * MAX_ANG;
  speed = Math.min(BALL_MAX, speed + BALL_ACC);
  const dir = side === 'left' ? 1 : -1;
  ball.vx = dir * speed * Math.cos(ang);
  ball.vy = speed * Math.sin(ang);
  ball.x = side === 'left' ? LEFT_FACE + BALL_R + 0.01 : RIGHT_FACE - BALL_R - 0.01;
  rally += 1;
  longest = Math.max(longest, rally);
  if (side === 'left') aiErr = (rand() * 2 - 1) * AI[diff].err; // her gelen topta yeni hata payı
}

/* ---------- Durum geçişleri ---------- */

function announce(msg) { elStatus.textContent = msg; }

// lockMs > 0: düğme kısa süre kapalı kalır (oyuncu tuşa basarken ekran kazara geçilmesin).
function showOverlay(title, text, btnLabel, focusBtn, lockMs = 0) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  overlayBtn.textContent = btnLabel;
  overlay.hidden = false;
  unlockAt = performance.now() + lockMs;
  overlayBtn.disabled = lockMs > 0;
  if (lockMs > 0) {
    setTimeout(() => {
      overlayBtn.disabled = false;
      if (focusBtn && !overlay.hidden && state === 'bitti') overlayBtn.focus({ preventScroll: true });
    }, lockMs);
  } else if (focusBtn) {
    overlayBtn.focus({ preventScroll: true });
  }
}

function resetMatch() {
  scoreL = 0;
  scoreR = 0;
  longest = 0;
  winner = '';
  serveDir = -1; // ilk servis sol oyuncuya
  pads.left = H / 2;
  pads.right = H / 2;
  keys.w = keys.s = keys.up = keys.down = false;
  presses.clear();
  placeBallForServe();
}

function readyText() {
  return mode === 'cpu'
    ? `Bilgisayara (${AI[diff].label}) karşı ilk ${target} sayıya ulaşan kazanır. Raket: W S, ↑ ↓ ya da ekranı sürükleyin.`
    : `İlk ${target} sayıya ulaşan kazanır. Sol: W S · Sağ: ↑ ↓ (dokunmatikte ekranın iki yarısı).`;
}

function toReady() {
  stopLoop();
  resetMatch();
  state = 'hazir';
  showOverlay('Ping Pong', readyText(), 'Başlat', false);
  draw();
  sync();
}

function startMatch() {
  resetMatch();
  state = 'oynuyor';
  overlay.hidden = true;
  announce('Maç başladı. Servis geliyor.');
  draw();
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function endMatch(side) {
  stopLoop();
  state = 'bitti';
  winner = side;
  keys.w = keys.s = keys.up = keys.down = false;
  presses.clear();
  store.history.unshift({ t: Date.now(), mode, diff: mode === 'cpu' ? diff : '', target, left: scoreL, right: scoreR, winner: side, rally: longest });
  store.history = store.history.slice(0, HISTORY_MAX);
  saveStore();
  renderHistory();
  let title;
  if (mode === 'cpu') title = side === 'left' ? 'Kazandın!' : 'Bilgisayar kazandı';
  else title = side === 'left' ? 'Sol oyuncu kazandı' : 'Sağ oyuncu kazandı';
  const text = `Skor: ${scoreL} – ${scoreR} · En uzun vuruş serisi: ${longest}.`;
  showOverlay(title, text, 'Yeniden oyna', true, 600);
  announce(`${title} ${text}`);
  draw();
  sync();
}

function pauseGame() {
  if (state !== 'oynuyor') return;
  stopLoop();
  keys.w = keys.s = keys.up = keys.down = false;
  presses.clear();
  state = 'duraklatildi';
  showOverlay('Duraklatıldı', 'Devam etmek için Boşluk ya da P tuşuna basın.', 'Devam et', true);
  announce('Oyun duraklatıldı.');
  draw();
  sync();
}

function resumeGame() {
  if (state !== 'duraklatildi') return;
  state = 'oynuyor';
  overlay.hidden = true;
  announce('Oyun devam ediyor.');
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function primaryAction() {
  if (state === 'bitti' && performance.now() < unlockAt) return;
  if (state === 'hazir' || state === 'bitti') startMatch();
  else if (state === 'oynuyor') pauseGame();
  else if (state === 'duraklatildi') resumeGame();
}

/* ---------- Döngü ---------- */

let rafId = 0;
let lastTs = 0;
let acc = 0;

function frame(ts) {
  rafId = 0;
  if (state !== 'oynuyor') return;
  if (manualMode) {
    acc = 0;
    lastTs = ts;
  } else {
    acc += clamp((ts - lastTs) / 1000, 0, 0.1); // sekme uyuyunca ani atlama olmasın
    lastTs = ts;
    let guard = 0;
    while (state === 'oynuyor' && acc >= DT && guard++ < 24) {
      update(DT);
      acc -= DT;
    }
  }
  draw();
  sync();
  if (state === 'oynuyor') rafId = requestAnimationFrame(frame);
}
function startLoop() {
  lastTs = performance.now();
  acc = 0;
  if (!rafId) rafId = requestAnimationFrame(frame);
}
function stopLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

/* ---------- Ekran bilgileri ---------- */

const lastData = {};
function setData(key, value) {
  const v = String(value);
  if (lastData[key] !== v) { lastData[key] = v; stage.setAttribute(`data-${key}`, v); }
}
const lastText = new Map();
function setText(el, value) {
  const v = String(value);
  if (lastText.get(el) !== v) { lastText.set(el, v); el.textContent = v; }
}
function sync() {
  setData('state', state);
  setData('phase', phase);
  setData('mode', mode);
  setData('diff', diff);
  setData('target', target);
  setData('score-l', scoreL);
  setData('score-r', scoreR);
  setData('rally', rally);
  setData('speed', Math.round(speed));
  setData('ball-x', ball.x.toFixed(1));
  setData('ball-y', ball.y.toFixed(1));
  setData('pad-l', pads.left.toFixed(1));
  setData('pad-r', pads.right.toFixed(1));
  setData('winner', winner);
  setText(elScoreL, scoreL);
  setText(elScoreR, scoreR);
  setText(elLabelL, mode === 'cpu' ? 'Sen' : 'Sol');
  setText(elLabelR, mode === 'cpu' ? 'Rakip' : 'Sağ');
  setText(elTarget, target);
  setText(elRally, rally);
  setText(btnMain, { hazir: 'Başlat', oynuyor: 'Duraklat', duraklatildi: 'Devam et', bitti: 'Yeniden oyna' }[state]);
  // Ayarlar yalnızca top oyundayken kilitlidir
  const lock = state === 'oynuyor';
  selMode.disabled = lock;
  selDiff.disabled = lock;
  selTarget.disabled = lock;
  fieldDiff.hidden = mode !== 'cpu';
}

function dateLabel(t) {
  try { return new Date(t).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' }); } catch (_) { return ''; }
}
function renderHistory() {
  elHistory.textContent = '';
  const list = store.history.slice(0, 5);
  for (const h of list) {
    const li = document.createElement('li');
    const who = h.mode === 'cpu'
      ? `Bilgisayar${h.diff && AI[h.diff] ? ` (${AI[h.diff].label})` : ''}`
      : 'İki kişi';
    const res = h.mode === 'cpu'
      ? (h.winner === 'left' ? 'Kazandın' : 'Kaybettin')
      : (h.winner === 'left' ? 'Sol oyuncu kazandı' : 'Sağ oyuncu kazandı');
    li.textContent = `${who} · ${h.target} sayı · ${h.left}–${h.right} · ${res} · ${dateLabel(h.t)}`;
    elHistory.appendChild(li);
  }
  const cpu = store.history.filter((h) => h.mode === 'cpu');
  const wins = cpu.filter((h) => h.winner === 'left').length;
  elHistorySum.textContent = store.history.length
    ? `Kayıtlı ${store.history.length} maç · Bilgisayara karşı ${wins} galibiyet, ${cpu.length - wins} yenilgi.`
    : 'Henüz kayıtlı maç yok. Biten her maç bu cihazda saklanır.';
  btnClear.hidden = !store.history.length;
}

/* ---------- Çizim ---------- */

let cssW = 0;
let cssH = 0;
let dprNow = 1;

function fit() {
  const rect = canvas.getBoundingClientRect();
  cssW = Math.max(1, Math.round(rect.width));
  cssH = Math.max(1, Math.round((cssW * H) / W));
  dprNow = Math.min(window.devicePixelRatio || 1, 3);
  const pw = Math.round(cssW * dprNow);
  const ph = Math.round(cssH * dprNow);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph; // boyut değişince bağlam sıfırlanır
  }
  draw();
}

function rr(x, y, w, h, r) {
  const k = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + k, y);
  ctx.arcTo(x + w, y, x + w, y + h, k);
  ctx.arcTo(x + w, y + h, x, y + h, k);
  ctx.arcTo(x, y + h, x, y, k);
  ctx.arcTo(x, y, x + w, y, k);
  ctx.closePath();
}

function draw() {
  if (!cssW) return;
  const s = (cssW / W) * dprNow;
  ctx.setTransform(s, 0, 0, s, 0, 0);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, COLOR.bgTop);
  g.addColorStop(1, COLOR.bgBottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Orta çizgi
  ctx.strokeStyle = COLOR.line;
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.moveTo(W / 2, 8);
  ctx.lineTo(W / 2, H - 8);
  ctx.stroke();
  ctx.setLineDash([]);

  // Büyük skorlar
  ctx.fillStyle = COLOR.score;
  ctx.font = '500 64px "IBM Plex Mono", ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(String(scoreL), W / 4, 18);
  ctx.fillText(String(scoreR), (3 * W) / 4, 18);

  // Raketler
  ctx.fillStyle = COLOR.left;
  rr(PAD_MARGIN, pads.left - PAD_H / 2, PAD_W, PAD_H, 4);
  ctx.fill();
  ctx.fillStyle = COLOR.right;
  rr(W - PAD_MARGIN - PAD_W, pads.right - PAD_H / 2, PAD_W, PAD_H, 4);
  ctx.fill();

  // Top
  ctx.fillStyle = COLOR.ball;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
  ctx.fill();

  if (state === 'oynuyor' && phase === 'serve') {
    ctx.fillStyle = COLOR.text;
    ctx.font = '600 20px "IBM Plex Sans", system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('Servis', W / 2, H / 2 - 28);
  }
}

/* ---------- Girdiler: klavye, fare, dokunma ---------- */

function isInBox(el) { return el instanceof Node && box.contains(el); }

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (t instanceof Element && t.closest('select, input, textarea, [contenteditable="true"]')) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const isSpace = e.key === ' ' || e.key === 'Spacebar';

  if (key === 'w' || key === 's' || key === 'ArrowUp' || key === 'ArrowDown') {
    if (state === 'oynuyor' || isInBox(t)) {
      if (key === 'w') keys.w = true;
      else if (key === 's') keys.s = true;
      else if (key === 'ArrowUp') keys.up = true;
      else keys.down = true;
      e.preventDefault(); // sayfa kaymasın
    }
    return;
  }
  if (isSpace || key === 'p') {
    // Odaktaki düğme ya da bağlantı Boşluk'u kendi tıklaması için kullanır; ona karışma
    if (isSpace && t instanceof Element && t.closest('button, a, summary')) return;
    if (state === 'oynuyor') { if (!e.repeat) pauseGame(); e.preventDefault(); }
    else if (state === 'duraklatildi') { if (!e.repeat) resumeGame(); e.preventDefault(); }
    else if (isSpace && isInBox(t)) { if (!e.repeat) primaryAction(); e.preventDefault(); }
    return;
  }
  if (e.key === 'Enter' && isInBox(t) && !(t instanceof Element && t.closest('button, a, summary'))) {
    if (state === 'hazir' || state === 'bitti') { primaryAction(); e.preventDefault(); }
  }
});

document.addEventListener('keyup', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === 'w') keys.w = false;
  if (key === 's') keys.s = false;
  if (key === 'ArrowUp') keys.up = false;
  if (key === 'ArrowDown') keys.down = false;
});
window.addEventListener('blur', () => { keys.w = keys.s = keys.up = keys.down = false; });

// Fare (bilgisayara karşı): imleç sol raketi izler. Dokunma/kalem: sürükleme göreceli çalışır (parmak raketi örtmez);
// iki kişilikte ekranın sol yarısı sol raketi, sağ yarısı sağ raketi yönetir ve iki parmak aynı anda çalışır.
const presses = new Map(); // pointerId -> { side, y, padY }
const toLogicalY = (clientY) => ((clientY - canvas.getBoundingClientRect().top) / Math.max(1, canvas.getBoundingClientRect().height)) * H;

stage.addEventListener('pointerdown', (e) => {
  if (e.target instanceof Element && e.target.closest('button')) return;
  if (state !== 'oynuyor') return;
  let side = 'left';
  if (mode === 'cpu') {
    if (e.pointerType === 'mouse') { setPad('left', toLogicalY(e.clientY)); return; }
  } else {
    const rect = canvas.getBoundingClientRect();
    side = e.clientX - rect.left < rect.width / 2 ? 'left' : 'right';
    for (const p of presses.values()) if (p.side === side) return; // aynı yarıyı ikinci bir işaretçi tutamaz
  }
  presses.set(e.pointerId, { side, y: e.clientY, padY: pads[side] });
  if (e.pointerType !== 'mouse') {
    try { stage.setPointerCapture(e.pointerId); } catch (_) { /* yapay olaylarda yakalama yok */ }
  }
});
stage.addEventListener('pointermove', (e) => {
  if (state !== 'oynuyor') return;
  if (mode === 'cpu' && e.pointerType === 'mouse') {
    setPad('left', toLogicalY(e.clientY));
    return;
  }
  const p = presses.get(e.pointerId);
  if (!p) return;
  const scale = H / Math.max(1, canvas.getBoundingClientRect().height);
  setPad(p.side, p.padY + (e.clientY - p.y) * scale);
});
const endPress = (e) => { presses.delete(e.pointerId); };
stage.addEventListener('pointerup', endPress);
stage.addEventListener('pointercancel', endPress);

/* ---------- Düğmeler, ayarlar, tam ekran ---------- */

btnMain.addEventListener('click', primaryAction);
overlayBtn.addEventListener('click', primaryAction);
btnRestart.addEventListener('click', startMatch);
btnClear.addEventListener('click', () => {
  store.history = [];
  saveStore();
  renderHistory();
  announce('Maç geçmişi temizlendi.');
});

function applySettings() {
  mode = selMode.value === 'two' ? 'two' : 'cpu';
  diff = AI[selDiff.value] ? selDiff.value : 'orta';
  target = selTarget.value === '11' ? 11 : 7;
  store.settings = { mode, diff, target };
  saveStore();
  toReady(); // ayar değişince maç baştan, hazır ekranına döner
}
selMode.addEventListener('change', applySettings);
selDiff.addEventListener('change', applySettings);
selTarget.addEventListener('change', applySettings);

document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });
window.addEventListener('pagehide', saveStore);

if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled) || !box.requestFullscreen) {
  btnFull.hidden = true; // iPhone Safari gibi tam ekranı desteklemeyen tarayıcılar
} else {
  btnFull.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === box;
    btnFull.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
    btnFull.setAttribute('aria-pressed', on ? 'true' : 'false');
    fit();
    if (state === 'oynuyor') stage.focus({ preventScroll: true });
  });
}

/* ---------- Test kancası (yalnızca Playwright testleri kullanır) ---------- */

// Durumu okur ve deterministik senaryo kurar. Hiçbiri sayı ya da avantaj vermez:
//  - advance(sn): sabit adımlı fiziği eşzamanlı ilerletir (gerçek girdilerle aynı update()).
//  - seed(n): oyun mantığının rastgele sayı üretecini sıfırlar.
//  - manual(açık): gerçek zamanlı döngüyü durdurur; yalnızca advance() ilerletir.
window.__pongTest = Object.assign(() => ({
  state,
  phase,
  mode,
  diff,
  target,
  scores: { left: scoreL, right: scoreR },
  rally,
  longest,
  speed,
  winner,
  serveDir,
  ball: { x: ball.x, y: ball.y, vx: ball.vx, vy: ball.vy },
  paddles: { left: pads.left, right: pads.right },
  history: store.history.length,
}), {
  advance(seconds) {
    let n = Math.round(seconds / DT);
    while (n-- > 0 && state === 'oynuyor') update(DT);
    draw();
    sync();
  },
  seed(n) { rand = makeRng(n); },
  manual(on) { manualMode = !!on; },
});

/* ---------- Başlangıç ---------- */

selMode.value = mode;
selDiff.value = diff;
selTarget.value = String(target);
renderHistory();
toReady();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
window.addEventListener('resize', fit);
fit();
