// Uzay Savaşı — canvas, sabit adımlı fizik (1/120 sn) + requestAnimationFrame ile çizim.
// Dış kütüphane, görsel, ses ve ağ isteği yok; tüm çizimler canvas ile kodla yapılır.
// En yüksek skor yalnızca bu tarayıcının localStorage alanında durur.
// Oyun alanı sabit bir "mantıksal" 420 x 560 birimdir; ekranda CSS ile ölçeklenir,
// canvas devicePixelRatio kadar yüksek çözünürlükte çizilir.

const W = 420;
const H = 560;
const DT = 1 / 120;
const SHIP_Y = H - 56;
const SHIP_HALF = 16; // gemi yarı genişliği (çarpışma için biraz daha dar sayılır)
const SHIP_SPEED = 300; // klavye ile birim/sn
const BULLET_SPEED = 640;
const FIRE_CD = 0.2; // iki atış arası saniye
const START_LIVES = 3;
const DROP_EVERY = 8; // her 8. düşmanda sıradaki güçlendirme düşer (şansa bağlı değil)
const MAX_PBULLETS = 48;
const MAX_EBULLETS = 32;
const MAX_PARTICLES = 160;
const STORE_KEY = 'ba-oyun-uzay-savasi';

const HP = { drone: 1, zigzag: 2, tank: 3 };
const PTS = { drone: 10, zigzag: 20, tank: 30 };
const COLOR = {
  bgTop: '#0d0f1a',
  bgBottom: '#1a1c24',
  ship: '#e6e4e1',
  shipWing: '#c25a72',
  cockpit: '#7b2331',
  flame: '#f0c674',
  drone: '#e8a0b3',
  zigzag: '#f0c674',
  tank: '#8fd0c9',
  bossHull: '#c25a72',
  bossPlate: '#7b2331',
  bossCore: '#f0c674',
  pBullet: '#fff3c4',
  eBullet: '#ff8a9e',
  text: '#e8e9ec',
  capDouble: '#7b2331',
  capDoubleEdge: '#e8a0b3',
  capShield: '#2f6f9f',
  capShieldEdge: '#bde3ff',
  capSpeed: '#2f7d4f',
  capSpeedEdge: '#bdf0cf',
};
const POWERUPS = ['double', 'shield', 'speed'];
const POWERUP_LABEL = { double: 'Ç', shield: 'K', speed: 'H' };

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
const elScore = $('score');
const elBest = $('best');
const elWave = $('wave');
const elLives = $('lives');
const elBuff = $('buff');
const elStatus = $('status');

/* ---------- Rastgelelik: tohumlanabilir (testler için), parçacıklar ayrı üreteç kullanır ---------- */

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
let rand = makeRng((Math.random() * 4294967296) >>> 0); // oyun mantığı
const vrand = makeRng(20251104); // yalnızca görsel (parçacık): oyun sonucunu etkilemez

/* ---------- Hareket azaltma tercihi ---------- */

const rmq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
let reduceMotion = !!(rmq && rmq.matches);
if (rmq && rmq.addEventListener) {
  rmq.addEventListener('change', (e) => {
    reduceMotion = e.matches;
    if (reduceMotion) parts.length = 0;
  });
}

/* ---------- Kalıcı veri (yalnızca localStorage) ---------- */

function loadBest() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    const n = raw && Number(raw.best);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  } catch (_) {
    return 0; // localStorage kapalı ya da bozuk: oyun yine çalışır
  }
}
let best = loadBest();
function saveBest() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ best })); } catch (_) { /* özel gezinme modu */ }
}

/* ---------- Oyun durumu ---------- */

let state = 'hazir'; // hazir | oynuyor | duraklatildi | bitti
let score = 0;
let lives = START_LIVES;
let wave = 1;
let kills = 0;
let dropIdx = 0;
let bestAtStart = 0;
let unlockAt = 0; // oyun sonu ekranında kazara tuşla geçmeyi önleyen kısa kilit
let waveState = 'intro'; // intro | fight | clear
let waveTimer = 0;
let bannerText = '';
let bannerT = 0;
let enemyFireT = 1;
let enemies = [];
let boss = null;
let form = { x: 0, y: 0, y0: 64, dir: 1, total: 1 };
let pBullets = [];
let eBullets = [];
let pups = [];
let parts = [];
let manualMode = false; // yalnızca test kancası: gerçek zamanlı döngüyü durdurup advance() ile sürmek için
const ship = { x: W / 2, invul: 0, shield: false, doubleT: 0, speedT: 0, cd: 0 };
const keys = { left: false, right: false, fire: false };
let pointerFire = false;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* ---------- Yıldız arka planı (sabit tohumlu, 3 katman) ---------- */

const stars = (() => {
  const r = makeRng(77);
  const list = [];
  for (let i = 0; i < 72; i++) {
    const layer = i % 3;
    list.push({ x: r() * W, y: r() * H, s: 1 + layer * 0.7, v: 14 + layer * 22, a: 0.35 + layer * 0.25 });
  }
  return list;
})();

/* ---------- Dalga kurulumu ---------- */

function enemyType(n, row) {
  if (row === 0 && n >= 3) return 'tank';
  if (row <= 1 && n >= 2) return 'zigzag';
  return 'drone';
}

function buildWave(n) {
  enemies = [];
  boss = null;
  eBullets = [];
  waveState = 'intro';
  enemyFireT = 1.4;
  if (n % 5 === 0) {
    // Her 5. dalgada patron: dalga numarasına göre dayanıklılığı artar
    const k = n / 5;
    const hp = 36 + 24 * (k - 1);
    boss = { x: W / 2, y: -70, w: 128, h: 58, hp, maxHp: hp, t: 0, fireT: 1.6, volley: 0 };
    form = { x: 0, y: 0, y0: 64, dir: 1, total: 1 };
    bannerText = `Dalga ${n}: PATRON!`;
  } else {
    const rows = Math.min(5, 1 + n);
    const cols = n >= 7 ? 7 : 6;
    const sx = n >= 7 ? 48 : 52;
    const sy = 34;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const type = enemyType(n, r);
        enemies.push({ ox: c * sx, oy: r * sy, type, hp: HP[type], maxHp: HP[type], w: 30, h: 24, x: 0, y: 0 });
      }
    }
    form = { x: (W - (cols - 1) * sx) / 2, y: -(rows * sy) - 10, y0: 64, dir: n % 2 ? 1 : -1, total: enemies.length };
    layout();
    bannerText = `Dalga ${n}`;
  }
  bannerT = 1.8;
}

function layout() {
  for (const e of enemies) {
    e.x = form.x + e.ox;
    e.y = form.y + e.oy;
  }
}

/* ---------- Skor ---------- */

function addScore(n) {
  score += n;
  if (score > best) { best = score; saveBest(); }
}

/* ---------- Parçacıklar (hareket azaltma açıkken hiç üretilmez) ---------- */

function burst(x, y, color, n) {
  if (reduceMotion) return;
  for (let i = 0; i < n && parts.length < MAX_PARTICLES; i++) {
    const a = vrand() * Math.PI * 2;
    const sp = 40 + vrand() * 150;
    parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.35 + vrand() * 0.35, max: 0.7, color });
  }
}

/* ---------- Ateş ve düşman mermileri ---------- */

function shoot() {
  if (pBullets.length >= MAX_PBULLETS) return;
  const y = SHIP_Y - 20;
  if (ship.doubleT > 0) {
    pBullets.push({ x: ship.x - 8, y }, { x: ship.x + 8, y });
  } else {
    pBullets.push({ x: ship.x, y });
  }
}

function enemyBulletSpeed() { return Math.min(260, 150 + 8 * wave); }

function fireEnemy(x, y, aimed, speed) {
  if (eBullets.length >= MAX_EBULLETS) return;
  let vx = 0;
  let vy = speed;
  if (aimed) {
    const dx = ship.x - x;
    const dy = SHIP_Y - y;
    const len = Math.max(1, Math.hypot(dx, dy));
    vx = clamp(dx / len, -0.6, 0.6) * speed;
    vy = Math.sqrt(Math.max(0, speed * speed - vx * vx));
  }
  eBullets.push({ x, y, vx, vy });
}

function enemyShoots() {
  // Her sütunun en alttaki düşmanı ateş edebilir
  const lowest = new Map();
  for (const e of enemies) {
    const cur = lowest.get(e.ox);
    if (!cur || e.y > cur.y) lowest.set(e.ox, e);
  }
  const list = Array.from(lowest.values());
  if (!list.length) return;
  const pick = list[Math.floor(rand() * list.length)];
  fireEnemy(pick.x, pick.y + 12, rand() < 0.35, enemyBulletSpeed());
}

function bossVolley() {
  boss.volley += 1;
  const k = wave / 5;
  const sp = Math.min(260, 180 + 10 * k);
  const phase2 = boss.hp <= boss.maxHp / 2;
  const y = boss.y + 30;
  if (boss.volley % 3 === 0) {
    fireEnemy(boss.x, y, true, sp + 20);
    return;
  }
  const angles = phase2 ? [-0.5, -0.25, 0, 0.25, 0.5] : [-0.3, 0, 0.3];
  for (const a of angles) {
    if (eBullets.length >= MAX_EBULLETS) break;
    eBullets.push({ x: boss.x, y, vx: Math.sin(a) * sp, vy: Math.cos(a) * sp });
  }
}

/* ---------- Güçlendirmeler ---------- */

function dropPowerup(x, y, type) {
  pups.push({ x, y, type });
}

function collectPowerup(type) {
  addScore(25);
  if (type === 'double') { ship.doubleT = 12; announce('Çift atış kazandın: 12 saniye.'); }
  else if (type === 'shield') { ship.shield = true; announce('Kalkan kazandın: bir hasarı emer.'); }
  else { ship.speedT = 10; announce('Hız kazandın: 10 saniye.'); }
}

/* ---------- Hasar ve ölüm ---------- */

function damageShip() {
  if (ship.invul > 0 || state !== 'oynuyor') return false;
  if (ship.shield) {
    ship.shield = false;
    ship.invul = 1;
    burst(ship.x, SHIP_Y, COLOR.capShieldEdge, 14);
    announce('Kalkan hasarı emdi.');
    return true;
  }
  lives -= 1;
  ship.invul = 2.2;
  burst(ship.x, SHIP_Y, COLOR.flame, 26);
  if (lives <= 0) endGame();
  else announce(`Can kaybettin. Kalan can: ${lives}.`);
  return true;
}

function killEnemy(e) {
  const i = enemies.indexOf(e);
  if (i >= 0) enemies.splice(i, 1);
  addScore(PTS[e.type]);
  kills += 1;
  burst(e.x, e.y, COLOR[e.type], 10);
  const extra = rand() < 0.04; // her öldürmede bir kez çekilir (deterministik sıra)
  if (kills % DROP_EVERY === 0) dropPowerup(e.x, e.y, POWERUPS[dropIdx++ % POWERUPS.length]);
  else if (extra) dropPowerup(e.x, e.y, POWERUPS[Math.floor(rand() * POWERUPS.length)]);
}

function killBoss() {
  const k = wave / 5;
  addScore(500 * k);
  burst(boss.x, boss.y, COLOR.bossHull, 36);
  burst(boss.x, boss.y, COLOR.bossCore, 24);
  dropPowerup(boss.x, boss.y, 'shield');
  boss = null;
  eBullets = [];
}

/* ---------- Güncelleme ---------- */

function update(dt) {
  ship.invul = Math.max(0, ship.invul - dt);
  ship.doubleT = Math.max(0, ship.doubleT - dt);
  ship.speedT = Math.max(0, ship.speedT - dt);
  ship.cd = Math.max(0, ship.cd - dt);
  bannerT = Math.max(0, bannerT - dt);

  if (!reduceMotion) {
    for (const s of stars) {
      s.y += s.v * dt;
      if (s.y > H) { s.y -= H; }
    }
  }

  // Gemi
  const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  if (dir) moveShipTo(ship.x + dir * SHIP_SPEED * (ship.speedT > 0 ? 1.45 : 1) * dt);
  if ((keys.fire || pointerFire) && ship.cd === 0) {
    shoot();
    ship.cd = FIRE_CD * (ship.speedT > 0 ? 0.7 : 1);
  }

  for (const b of pBullets) b.y -= BULLET_SPEED * dt;
  pBullets = pBullets.filter((b) => b.y > -20);

  // Düşman filosu
  if (enemies.length) {
    if (waveState === 'intro') {
      form.y += 130 * dt;
      if (form.y >= form.y0) { form.y = form.y0; waveState = 'fight'; }
    } else if (waveState === 'fight') {
      const sp = Math.min(100, 30 + 5 * wave) * (1 + 0.8 * (1 - enemies.length / form.total));
      form.x += form.dir * sp * dt;
      let minOx = Infinity;
      let maxOx = -Infinity;
      for (const e of enemies) { if (e.ox < minOx) minOx = e.ox; if (e.ox > maxOx) maxOx = e.ox; }
      const right = form.x + maxOx + 15;
      const left = form.x + minOx - 15;
      if (right > W - 12) { form.x -= right - (W - 12); form.dir = -1; form.y += 14; }
      else if (left < 12) { form.x += 12 - left; form.dir = 1; form.y += 14; }
    }
    layout();

    if (waveState === 'fight') {
      enemyFireT -= dt;
      if (enemyFireT <= 0) {
        enemyShoots();
        enemyFireT = Math.max(0.32, 1.25 - 0.07 * wave) * (0.7 + 0.6 * rand());
      }
      // Filo yere indi: can kaybedilir, filo en üste döner
      let bottom = -Infinity;
      for (const e of enemies) bottom = Math.max(bottom, e.y + e.h / 2);
      if (bottom >= SHIP_Y - 34) {
        damageShip();
        form.y = form.y0;
        layout();
        eBullets = [];
        announce('Düşmanlar yere indi.');
        if (state !== 'oynuyor') return;
      }
    }
  }

  // Patron
  if (boss) {
    if (waveState === 'intro') {
      boss.y += 110 * dt;
      if (boss.y >= 92) { boss.y = 92; waveState = 'fight'; }
    } else if (waveState === 'fight') {
      const phase2 = boss.hp <= boss.maxHp / 2;
      boss.t += dt * (phase2 ? 1.5 : 1);
      boss.x = W / 2 + Math.sin(boss.t * 0.9) * (W / 2 - 80);
      boss.fireT -= dt;
      if (boss.fireT <= 0) {
        bossVolley();
        boss.fireT = phase2 ? 0.75 : 1.2;
      }
    }
  }

  // Düşman mermileri
  for (const b of eBullets) { b.x += b.vx * dt; b.y += b.vy * dt; }
  eBullets = eBullets.filter((b) => b.y < H + 20 && b.x > -20 && b.x < W + 20);

  // Oyuncu mermisi çarpışmaları
  for (let i = pBullets.length - 1; i >= 0; i--) {
    const b = pBullets[i];
    let hit = false;
    for (const e of enemies) {
      if (Math.abs(b.x - e.x) <= e.w / 2 + 3 && Math.abs(b.y - e.y) <= e.h / 2 + 6) {
        e.hp -= 1;
        hit = true;
        if (e.hp <= 0) killEnemy(e);
        else { addScore(2); burst(b.x, b.y, COLOR[e.type], 3); }
        break;
      }
    }
    if (!hit && boss && Math.abs(b.x - boss.x) <= boss.w / 2 && Math.abs(b.y - boss.y) <= boss.h / 2) {
      boss.hp -= 1;
      hit = true;
      addScore(3);
      burst(b.x, b.y, COLOR.bossCore, 3);
      if (boss.hp <= 0) killBoss();
    }
    if (hit) pBullets.splice(i, 1);
  }

  // Düşman mermisi ve gövde çarpışmaları gemiye
  for (let i = eBullets.length - 1; i >= 0; i--) {
    const b = eBullets[i];
    if (Math.abs(b.x - ship.x) <= SHIP_HALF - 2 && Math.abs(b.y - SHIP_Y) <= 16) {
      eBullets.splice(i, 1);
      damageShip();
      if (state !== 'oynuyor') return;
    }
  }
  if (waveState === 'fight') {
    for (const e of enemies.slice()) {
      if (Math.abs(e.x - ship.x) < 24 && Math.abs(e.y - SHIP_Y) < 26) {
        killEnemy(e);
        damageShip();
        if (state !== 'oynuyor') return;
      }
    }
  }

  // Düşen güçlendirmeler
  for (const p of pups) p.y += 100 * dt;
  pups = pups.filter((p) => {
    if (Math.abs(p.x - ship.x) <= 24 && Math.abs(p.y - SHIP_Y) <= 26) {
      collectPowerup(p.type);
      return false;
    }
    return p.y < H + 20;
  });

  // Parçacıklar
  for (const q of parts) { q.x += q.vx * dt; q.y += q.vy * dt; q.life -= dt; }
  parts = parts.filter((q) => q.life > 0);

  // Dalga ilerlemesi
  if (waveState === 'fight' && !enemies.length && !boss) {
    waveState = 'clear';
    waveTimer = 1.6;
    eBullets = [];
    const bonus = 50 * wave;
    addScore(bonus);
    bannerText = `Dalga ${wave} temizlendi +${bonus}`;
    bannerT = 1.6;
    announce(`Dalga ${wave} temizlendi. ${bonus} bonus puan.`);
  } else if (waveState === 'clear') {
    waveTimer -= dt;
    if (waveTimer <= 0) {
      wave += 1;
      buildWave(wave);
      announce(boss ? `Dalga ${wave}: patron geliyor.` : `Dalga ${wave} başladı.`);
    }
  }
}

function moveShipTo(x) {
  ship.x = clamp(x, 18, W - 18);
}

/* ---------- Durum geçişleri ---------- */

function announce(msg) { elStatus.textContent = msg; }

// lockMs > 0: düğme kısa süre kapalı kalır (oyuncu ateş tuşundayken ekran kazara geçilmesin).
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

function resetRun(startWave) {
  score = 0;
  lives = START_LIVES;
  wave = startWave;
  kills = 0;
  dropIdx = 0;
  pBullets = [];
  eBullets = [];
  pups = [];
  parts = [];
  ship.x = W / 2;
  ship.invul = 0;
  ship.shield = false;
  ship.doubleT = 0;
  ship.speedT = 0;
  ship.cd = 0;
  keys.left = keys.right = keys.fire = false;
  pointerFire = false;
  buildWave(startWave);
}

function toReady() {
  stopLoop();
  resetRun(1);
  bannerT = 0;
  state = 'hazir';
  showOverlay('Uzay Savaşı', 'Gemiyi ← → ya da A D tuşlarıyla yönlendirin, Boşluk tuşunu basılı tutarak ateş edin. Dokunmatik ekranda parmağınızı sürükleyin; gemi kendiliğinden ateş eder. Üç canınız var.', 'Başlat', false);
  draw();
  sync();
}

function startGame(startWave = 1) {
  bestAtStart = best;
  resetRun(startWave);
  state = 'oynuyor';
  overlay.hidden = true;
  announce(`Oyun başladı. Dalga ${startWave}. Ateş etmek için Boşluk tuşunu basılı tutun.`);
  draw();
  sync();
  startLoop();
  stage.focus({ preventScroll: true });
}

function endGame() {
  stopLoop();
  state = 'bitti';
  keys.left = keys.right = keys.fire = false;
  pointerFire = false;
  saveBest();
  const record = score > bestAtStart && score > 0;
  const text = `Skor: ${score} · En yüksek: ${best} · Ulaştığın dalga: ${wave}.${record ? ' Yeni rekor!' : ''}`;
  showOverlay('Oyun bitti', text, 'Yeniden oyna', true, 600);
  announce(`Oyun bitti. ${text}`);
  draw();
  sync();
}

function pauseGame() {
  if (state !== 'oynuyor') return;
  stopLoop();
  keys.left = keys.right = keys.fire = false;
  pointerFire = false;
  state = 'duraklatildi';
  showOverlay('Duraklatıldı', 'Devam etmek için P ya da Boşluk tuşuna basın.', 'Devam et', true);
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
  if (state === 'hazir' || state === 'bitti') startGame();
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
let lastBuff = '';
const lastText = new Map();
function setText(el, value) {
  const v = String(value);
  if (lastText.get(el) !== v) { lastText.set(el, v); el.textContent = v; }
}
function sync() {
  setData('state', state);
  setData('score', score);
  setData('lives', lives);
  setData('wave', wave);
  setData('enemies', enemies.length);
  setData('boss', boss ? '1' : '0');
  setData('ship-x', ship.x.toFixed(1));
  setData('shield', ship.shield ? '1' : '0');
  setData('double', ship.doubleT > 0 ? '1' : '0');
  setData('speed', ship.speedT > 0 ? '1' : '0');
  setText(elScore, score);
  setText(elBest, Math.max(best, score));
  setText(elWave, wave);
  setText(elLives, lives > 0 ? '♥'.repeat(lives) : '–');
  elLives.parentElement.setAttribute('aria-label', `Kalan can: ${lives}`);
  const buffs = [];
  if (ship.doubleT > 0) buffs.push(`Çift atış: ${Math.ceil(ship.doubleT)} sn`);
  if (ship.shield) buffs.push('Kalkan aktif');
  if (ship.speedT > 0) buffs.push(`Hız: ${Math.ceil(ship.speedT)} sn`);
  const buff = buffs.join(' · ');
  if (buff !== lastBuff) { lastBuff = buff; elBuff.textContent = buff; elBuff.hidden = !buff; }
  setText(btnMain, { hazir: 'Başlat', oynuyor: 'Duraklat', duraklatildi: 'Devam et', bitti: 'Yeniden oyna' }[state]);
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

function poly(points, close = true) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
  if (close) ctx.closePath();
}

function drawShip() {
  const blinkOff = ship.invul > 0 && !reduceMotion && Math.floor(ship.invul * 10) % 2 === 0;
  ctx.save();
  ctx.translate(ship.x, SHIP_Y);
  ctx.globalAlpha = ship.invul > 0 ? (reduceMotion ? 0.55 : blinkOff ? 0.35 : 0.9) : 1;
  // Kanatlar
  ctx.fillStyle = COLOR.shipWing;
  poly([[-17, 14], [-6, -2], [-4, 14]]); ctx.fill();
  poly([[17, 14], [6, -2], [4, 14]]); ctx.fill();
  // Alev
  ctx.fillStyle = COLOR.flame;
  poly([[-3.5, 12], [3.5, 12], [0, 21]]); ctx.fill();
  // Gövde: üçgen
  ctx.fillStyle = COLOR.ship;
  poly([[0, -21], [11, 14], [0, 9], [-11, 14]]); ctx.fill();
  // Kokpit
  ctx.fillStyle = COLOR.cockpit;
  ctx.beginPath();
  ctx.arc(0, -3, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  if (ship.shield) {
    ctx.strokeStyle = COLOR.capShieldEdge;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(ship.x, SHIP_Y, 27, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawEnemy(e) {
  ctx.save();
  ctx.translate(e.x, e.y);
  ctx.fillStyle = COLOR[e.type];
  if (e.type === 'drone') {
    // Aşağı bakan üçgen
    poly([[0, 12], [-15, -11], [15, -11]]); ctx.fill();
    ctx.fillStyle = COLOR.bgTop;
    ctx.fillRect(-3, -6, 6, 4);
  } else if (e.type === 'zigzag') {
    // Elmas
    poly([[0, -13], [17, 0], [0, 13], [-17, 0]]); ctx.fill();
  } else {
    // Altıgen
    poly([[-16, 0], [-8, -12], [8, -12], [16, 0], [8, 12], [-8, 12]]); ctx.fill();
  }
  if (e.type !== 'drone') {
    // Kalan dayanıklılık: nokta sayısı (yalnızca renge bağlı değil)
    ctx.fillStyle = COLOR.bgTop;
    const n = e.hp;
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.arc((i - (n - 1) / 2) * 7, 0, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawBoss() {
  ctx.save();
  ctx.translate(boss.x, boss.y);
  ctx.fillStyle = COLOR.bossPlate;
  poly([[-64, -6], [-42, -28], [42, -28], [64, -6], [42, 29], [-42, 29]]); ctx.fill();
  ctx.fillStyle = COLOR.bossHull;
  poly([[-52, -6], [-36, -21], [36, -21], [52, -6], [36, 20], [-36, 20]]); ctx.fill();
  ctx.fillStyle = COLOR.ship;
  ctx.fillRect(-46, 18, 10, 14);
  ctx.fillRect(36, 18, 10, 14);
  ctx.fillStyle = COLOR.bossCore;
  const pulse = reduceMotion ? 0 : Math.sin(boss.t * 6) * 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 9 + pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLOR.bgTop;
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // Can çubuğu
  const bw = W - 60;
  const ratio = clamp(boss.hp / boss.maxHp, 0, 1);
  ctx.fillStyle = 'rgba(255,255,255,.18)';
  ctx.fillRect(30, 12, bw, 8);
  ctx.fillStyle = COLOR.bossHull;
  ctx.fillRect(30, 12, bw * ratio, 8);
  ctx.fillStyle = COLOR.text;
  ctx.font = '600 11px "IBM Plex Sans", system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('PATRON', 30, 24);
}

function drawPowerup(p) {
  const fill = { double: COLOR.capDouble, shield: COLOR.capShield, speed: COLOR.capSpeed }[p.type];
  const edge = { double: COLOR.capDoubleEdge, shield: COLOR.capShieldEdge, speed: COLOR.capSpeedEdge }[p.type];
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = edge;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = '700 13px "IBM Plex Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(POWERUP_LABEL[p.type], p.x, p.y + 0.5);
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

  // Yıldızlar
  for (const st of stars) {
    ctx.globalAlpha = st.a;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(st.x, st.y, st.s, st.s);
  }
  ctx.globalAlpha = 1;

  for (const e of enemies) drawEnemy(e);
  if (boss) drawBoss();
  for (const p of pups) drawPowerup(p);

  // Mermiler
  ctx.fillStyle = COLOR.pBullet;
  for (const b of pBullets) ctx.fillRect(b.x - 2, b.y - 7, 4, 14);
  ctx.fillStyle = COLOR.eBullet;
  for (const b of eBullets) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawShip();

  // Parçacıklar
  for (const q of parts) {
    ctx.globalAlpha = clamp(q.life / q.max, 0, 1);
    ctx.fillStyle = q.color;
    ctx.fillRect(q.x - 1.5, q.y - 1.5, 3, 3);
  }
  ctx.globalAlpha = 1;

  // Dalga başlığı
  if (bannerT > 0 && state !== 'hazir') {
    ctx.globalAlpha = clamp(bannerT / 0.5, 0, 1);
    ctx.fillStyle = COLOR.text;
    ctx.font = '700 26px "IBM Plex Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(bannerText, W / 2, H * 0.42);
    ctx.globalAlpha = 1;
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

  if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'a' || key === 'd') {
    if (state === 'oynuyor' || isInBox(t)) {
      if (key === 'ArrowLeft' || key === 'a') keys.left = true; else keys.right = true;
      e.preventDefault();
    }
    return;
  }
  if ((key === 'ArrowUp' || key === 'ArrowDown') && (state === 'oynuyor' || isInBox(t))) {
    e.preventDefault(); // sayfa kaymasın
    return;
  }
  if (isSpace) {
    if (state === 'oynuyor') {
      // Odak bir düğmedeyse Boşluk onu tıklatmasın: odağı oyun alanına al
      if (t instanceof Element && t.closest('button, a, summary') && isInBox(t)) stage.focus({ preventScroll: true });
      keys.fire = true;
      e.preventDefault();
      return;
    }
    if (t instanceof Element && t.closest('button, a, summary')) return;
    if (state === 'duraklatildi') { if (!e.repeat) resumeGame(); e.preventDefault(); }
    else if (isInBox(t)) { if (!e.repeat) primaryAction(); e.preventDefault(); }
    return;
  }
  if (key === 'p') {
    if (state === 'oynuyor') { pauseGame(); e.preventDefault(); }
    else if (state === 'duraklatildi') { resumeGame(); e.preventDefault(); }
    return;
  }
  if (e.key === 'Enter' && isInBox(t) && !(t instanceof Element && t.closest('button, a, summary'))) {
    if (state === 'hazir' || state === 'bitti') { primaryAction(); e.preventDefault(); }
  }
});

document.addEventListener('keyup', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === 'ArrowLeft' || key === 'a') keys.left = false;
  if (key === 'ArrowRight' || key === 'd') keys.right = false;
  if (e.key === ' ' || e.key === 'Spacebar') keys.fire = false;
});
window.addEventListener('blur', () => { keys.left = keys.right = keys.fire = false; pointerFire = false; });

// Fare: gemi imleci izler, basılı tutunca ateş eder. Dokunma/kalem: sürükleme göreceli çalışır
// (parmak gemiyi örtmez) ve parmak ekrandayken gemi kendiliğinden ateş eder.
let press = null;
const toLogicalX = (clientX) => ((clientX - canvas.getBoundingClientRect().left) / Math.max(1, canvas.getBoundingClientRect().width)) * W;

stage.addEventListener('pointerdown', (e) => {
  if (e.target instanceof Element && e.target.closest('button')) return;
  if (state !== 'oynuyor' || press) return;
  press = { id: e.pointerId, x: e.clientX, shipX: ship.x, type: e.pointerType };
  pointerFire = true;
  if (e.pointerType === 'mouse') moveShipTo(toLogicalX(e.clientX));
  else {
    try { stage.setPointerCapture(e.pointerId); } catch (_) { /* yapay olaylarda yakalama yok */ }
  }
});
stage.addEventListener('pointermove', (e) => {
  if (state !== 'oynuyor') return;
  if (e.pointerType === 'mouse') {
    moveShipTo(toLogicalX(e.clientX));
    return;
  }
  if (!press || press.id !== e.pointerId) return;
  const scale = W / Math.max(1, canvas.getBoundingClientRect().width);
  moveShipTo(press.shipX + (e.clientX - press.x) * scale);
});
const endPress = (e) => {
  if (!press || press.id !== e.pointerId) return;
  press = null;
  pointerFire = false;
};
stage.addEventListener('pointerup', endPress);
stage.addEventListener('pointercancel', endPress);

/* ---------- Düğmeler, tam ekran ---------- */

btnMain.addEventListener('click', primaryAction);
overlayBtn.addEventListener('click', primaryAction);
btnRestart.addEventListener('click', () => startGame());

document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });
window.addEventListener('pagehide', saveBest);

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

// Durumu okur ve deterministik senaryo kurar. Hiçbiri skor, can ya da güçlendirme vermez:
//  - advance(sn): sabit adımlı fiziği eşzamanlı ilerletir (gerçek girdilerle aynı update()).
//  - seed(n): oyun mantığının rastgele sayı üretecini sıfırlar.
//  - moveTo(x): gemiyi fare imleciyle aynı biçimde konumlar.
//  - manual(açık): gerçek zamanlı döngüyü durdurur; yalnızca advance() ilerletir.
//  - startAtWave(n): yeni oyunu n. dalgadan, 0 puanla başlatır (patron senaryosu için).
window.__uzayTest = Object.assign(() => ({
  state,
  score,
  best,
  lives,
  wave,
  kills,
  waveState,
  particlesEnabled: !reduceMotion,
  particles: parts.length,
  ship: { x: ship.x, y: SHIP_Y, invul: ship.invul, shield: ship.shield, doubleT: ship.doubleT, speedT: ship.speedT },
  enemies: enemies.map((e) => ({ x: e.x, y: e.y, w: e.w, h: e.h, hp: e.hp, type: e.type })),
  boss: boss ? { x: boss.x, y: boss.y, hp: boss.hp, maxHp: boss.maxHp } : null,
  bullets: pBullets.map((b) => ({ x: b.x, y: b.y })),
  enemyBullets: eBullets.map((b) => ({ x: b.x, y: b.y, vx: b.vx, vy: b.vy })),
  powerups: pups.map((p) => ({ x: p.x, y: p.y, type: p.type })),
}), {
  advance(seconds) {
    let n = Math.round(seconds / DT);
    while (n-- > 0 && state === 'oynuyor') update(DT);
    draw();
    sync();
  },
  seed(n) { rand = makeRng(n); },
  moveTo(x) { moveShipTo(x); },
  manual(on) { manualMode = !!on; },
  startAtWave(n) { startGame(Math.max(1, Math.floor(n))); },
});

/* ---------- Başlangıç ---------- */

toReady();
if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
window.addEventListener('resize', fit);
fit();
