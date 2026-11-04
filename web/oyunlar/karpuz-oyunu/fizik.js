// Karpuz Oyunu fizik ve kural çekirdeği. DOM'a dokunmaz; saf JavaScript (tarayıcıda ve Node'da aynı sonucu verir).
// Kap içinde 2B daire fiziği: sabit adım (1/120 sn) ve her adımda 4-8 alt adım; yerçekimi, duvar/zemin çarpışması,
// daire-daire konum düzeltmesi + normal impuls, dönmeli sürtünme, sönüm ve uyuyan cisim optimizasyonu.
// Aynı tohum ve aynı girdilerle her çalıştırma birebir aynı sonucu üretir (rastgelelik yalnızca tohumlu üreteçten).

/* ---------- Dünya ölçüleri (mantıksal birim; çizim ekrana göre ölçeklenir) ---------- */
export const W = 400;
export const H = 600;
export const LEFT = 14; // kap iç sol kenarı
export const RIGHT = 386; // kap iç sağ kenarı
export const FLOOR = 586; // kap tabanı
export const BOX_TOP = 96; // kap duvarlarının çizildiği üst kenar
export const LINE_Y = 112; // tehlike çizgisi
export const DROP_Y = 54; // bırakıcının meyveyi tuttuğu yükseklik

/* ---------- Fizik sabitleri ---------- */
export const STEP = 1 / 120; // sabit adım (sn)
export const MIN_SUB = 4;
export const MAX_SUB = 8;
const GRAVITY = 1500; // birim/sn²
const REST_FRUIT = 0.15; // meyve-meyve sekme katsayısı
const REST_WALL = 0.12; // duvar/zemin sekme katsayısı
const REST_MIN_V = 60; // bu hızın altındaki çarpışmalar sekmez (dinlenen yığında titreşimi önler)
const MU_FRUIT = 0.3; // meyve-meyve sürtünmesi
const MU_WALL = 0.45; // duvar/zemin sürtünmesi
const LIN_DAMP = 0.2; // doğrusal sönüm (1/sn)
const ANG_DAMP = 1.5; // açısal sönüm (1/sn)
const MAX_SPEED = 1800;
const SLOP = 0.05; // bu kadar iç içe geçmeye izin verilir (kıpırtıyı azaltır)
const PUSH = 0.8; // alt adım başına giderilen iç içe geçme oranı
const MAX_PUSH = 6; // alt adım başına en büyük konum düzeltmesi (patlamayı önler)
export const MERGE_GAP = 0.6; // aynı seviyedeki iki meyve bu kadar yakınsa "temas" sayılır
const SLEEP_V = 5; // uyuma eşiği (birim/sn)
const SLEEP_W = 0.25; // uyuma eşiği (rad/sn)
const SLEEP_T = 0.8; // bu kadar süre neredeyse durursa cisim uyur
const WAKE_V = 30; // uyuyan cismi uyandıran bağıl hız
const SUPPORT_GAP = 0.5; // dayanak sayılan en büyük aralık (MERGE_GAP'ten küçük olmalı)

/* ---------- Oyun kuralları ---------- */
export const OVER_LIMIT = 2; // çizginin üstünde bundan uzun kalan meyve oyunu bitirir (sn)
export const IMMUNITY = 1; // yeni bırakılan meyvenin muafiyet süresi (sn)
export const DROP_COOLDOWN = 0.45; // iki bırakma arasındaki en kısa süre (sn)
export const KARPUZ_BONUS = 100; // iki karpuz birleşince verilen bonus
export const DROP_LVLS = 5; // bırakılabilen meyveler: ilk 5 seviye

// Meyve seviyeleri: ad, yarıçap ve renk (parçacık ve önizleme için)
export const FRUITS = [
  null,
  { name: 'Kiraz', r: 12, color: '#c8102e' },
  { name: 'Çilek', r: 16, color: '#e0242f' },
  { name: 'Üzüm', r: 21, color: '#7b3fb0' },
  { name: 'Mandalina', r: 26, color: '#f26a1b' },
  { name: 'Portakal', r: 32, color: '#ff9a1a' },
  { name: 'Elma', r: 39, color: '#d81e1e' },
  { name: 'Armut', r: 47, color: '#b8c936' },
  { name: 'Şeftali', r: 56, color: '#ff9a76' },
  { name: 'Ananas', r: 66, color: '#f4b400' },
  { name: 'Kavun', r: 78, color: '#d9cf6a' },
  { name: 'Karpuz', r: 90, color: '#2e8b2e' },
];
export const MAX_LVL = FRUITS.length - 1;

/** n. seviye meyveyi oluşturmanın puanı: üçgensel sayı T(n) = n(n+1)/2 → 1, 3, 6, 10, … */
export const triangular = (n) => (n * (n + 1)) / 2;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/* ---------- Tohumlu rastgele sayı üreteci (mulberry32) ---------- */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const pickLevel = (rng) => 1 + Math.floor(rng() * DROP_LVLS);

/** Bir tohumun bırakılacak meyve dizisi (oyundaki sırayla aynı): ilk değer ilk bırakılan meyvedir. */
export function fruitSequence(seed, n) {
  const rng = mulberry32(seed);
  const out = [];
  for (let i = 0; i < n; i++) out.push(pickLevel(rng));
  return out;
}

/* ---------- Dünya ---------- */
export function createWorld(seed) {
  const s = seed >>> 0;
  const rng = mulberry32(s);
  const w = {
    seed: s, rng, bodies: [], pending: [], events: [],
    t: 0, score: 0, state: 'playing', cur: 0, next: 0, readyAt: 0, overTimer: 0,
    merges: 0, drops: 0, karpuz: 0, biggest: 0, nextId: 1, lastSub: MIN_SUB,
  };
  w.cur = pickLevel(rng);
  w.next = pickLevel(rng);
  return w;
}

function makeBody(w, lvl, x, y, o) {
  const r = FRUITS[lvl].r;
  const fixed = !!o.fixed;
  return {
    id: w.nextId++, lvl, r, x, y,
    vx: o.vx || 0, vy: o.vy || 0, a: o.a || 0, av: o.av || 0,
    invM: fixed ? 0 : 1 / (r * r), // kütle alanla orantılı
    fixed, asleep: false, still: 0, over: 0, dead: false, merging: false,
    s1: 0, stable: false, // bu adımdaki ilk dayanak kimliği; iki ayrı dayanak (ya da zemin) varsa kararlı
    born: typeof o.born === 'number' ? o.born : w.t,
    fresh: o.fresh ? 0 : 1, // 0→1 arası: yeni oluşan meyvenin görsel büyümesi (yalnızca çizim)
  };
}

function clampInside(b) {
  b.x = clamp(b.x, LEFT + b.r, RIGHT - b.r);
  if (b.y > FLOOR - b.r) b.y = FLOOR - b.r;
}

function wake(b) {
  b.asleep = false;
  b.still = 0;
}

/** Test ve hata ayıklama için doğrudan meyve koyar (muafiyetsiz). fixed: yerinde sabit kalan cisim. */
export function spawnBody(w, lvl, x, y, o = {}) {
  const b = makeBody(w, clamp(Math.round(lvl), 1, MAX_LVL), x, y, { ...o, born: typeof o.born === 'number' ? o.born : w.t - IMMUNITY });
  clampInside(b);
  w.bodies.push(b);
  if (b.lvl > w.biggest) w.biggest = b.lvl;
  return b;
}

export function canDrop(w) {
  return w.state === 'playing' && w.t + 1e-9 >= w.readyAt;
}

/** Bırakıcıdaki meyveyi x konumundan düşürür; sıradaki meyve öne geçer, yenisi tohumlu üreteçten gelir. */
export function dropFruit(w, x) {
  if (!canDrop(w)) return null;
  const lvl = w.cur;
  const r = FRUITS[lvl].r;
  const b = makeBody(w, lvl, clamp(x, LEFT + r, RIGHT - r), DROP_Y, { born: w.t });
  w.bodies.push(b);
  w.cur = w.next;
  w.next = pickLevel(w.rng);
  w.readyAt = w.t + DROP_COOLDOWN;
  w.drops++;
  if (lvl > w.biggest) w.biggest = lvl;
  w.events.push({ type: 'drop', lvl, x: b.x, y: b.y });
  return b;
}

/** Bir sabit adım (1/120 sn) ilerletir. */
export function stepWorld(w) {
  if (w.state !== 'playing') return;
  // Alt adım sayısı (4-8): en hızlı cisim bir alt adımda en küçük yarıçapın beşte birinden fazla ilerlemesin
  // (tünelleme yok); kap doldukça yığın daha çok yinelemeyle çözülsün (iç içe geçme azalır).
  let maxV = 0;
  let awake = 0;
  for (const b of w.bodies) {
    if (b.asleep || b.fixed) continue;
    awake++;
    const v = Math.max(Math.abs(b.vx), Math.abs(b.vy));
    if (v > maxV) maxV = v;
  }
  const bySpeed = Math.ceil((maxV * STEP) / (FRUITS[1].r * 0.2));
  const byLoad = awake < 10 ? MIN_SUB : awake < 20 ? 6 : MAX_SUB;
  const sub = clamp(Math.max(bySpeed, byLoad), MIN_SUB, MAX_SUB);
  w.lastSub = sub;
  const h = STEP / sub;
  for (let s = 0; s < sub; s++) substep(w, h);
  w.t += STEP;
  settle(w);
}

/** saniye kadar ilerletir (oyun biterse durur); atılan adım sayısını döndürür. */
export function advance(w, seconds) {
  const n = Math.round(seconds / STEP);
  let i = 0;
  for (; i < n && w.state === 'playing'; i++) stepWorld(w);
  return i;
}

// Sol kenara göre ekleme sıralaması (her alt adımda dizi neredeyse sıralı olduğundan hızlıdır)
function sortByLeft(a) {
  for (let i = 1; i < a.length; i++) {
    const b = a[i];
    const k = b.x - b.r;
    let j = i - 1;
    while (j >= 0 && a[j].x - a[j].r > k) { a[j + 1] = a[j]; j--; }
    a[j + 1] = b;
  }
}

function substep(w, h) {
  const bs = w.bodies;
  const ld = 1 / (1 + LIN_DAMP * h);
  const ad = 1 / (1 + ANG_DAMP * h);
  const g = GRAVITY * h;
  for (let i = 0; i < bs.length; i++) {
    const b = bs[i];
    if (b.fixed || b.asleep) continue;
    b.vy += g;
    b.vx *= ld; b.vy *= ld; b.av *= ad;
    const sp2 = b.vx * b.vx + b.vy * b.vy;
    if (sp2 > MAX_SPEED * MAX_SPEED) { const k = MAX_SPEED / Math.sqrt(sp2); b.vx *= k; b.vy *= k; }
    b.x += b.vx * h;
    b.y += b.vy * h;
    b.a += b.av * h;
  }
  // Geniş evre: süpür ve buda (x eksenine göre sıralı dizide yalnızca x aralığı çakışan çiftler denenir)
  sortByLeft(bs);
  for (let i = 0; i < bs.length; i++) {
    const A = bs[i];
    if (A.merging) continue;
    const reach = A.x + A.r + MERGE_GAP;
    for (let j = i + 1; j < bs.length; j++) {
      const B = bs[j];
      if (B.x - B.r > reach) break;
      if (B.merging) continue;
      pair(w, A, B);
      if (A.merging) break;
    }
  }
  // Duvarlar en son: alt adım sonunda her cisim kesinlikle kabın içindedir
  for (let i = 0; i < bs.length; i++) {
    const b = bs[i];
    if (!b.fixed && !b.asleep && !b.merging) walls(b);
  }
  if (w.pending.length) applyMerges(w);
}

function pair(w, A, B) {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const rs = A.r + B.r;
  const d2 = dx * dx + dy * dy;
  const lim = rs + MERGE_GAP;
  if (d2 >= lim * lim) return;
  let d = Math.sqrt(d2);
  let nx;
  let ny;
  if (d > 1e-9) { nx = dx / d; ny = dy / d; } else { nx = 0; ny = 1; d = 0; }

  // Aynı seviye temas: temas noktasında birleşme (adım sonunda uygulanır)
  if (A.lvl === B.lvl && !A.fixed && !B.fixed) {
    A.merging = true;
    B.merging = true;
    const k = d * (A.r / rs);
    w.pending.push({ A, B, x: A.x + nx * k, y: A.y + ny * k });
    return;
  }

  const pen = rs - d;
  // Destek kaydı: n A'dan B'ye; ny < 0 ise B üstte (y aşağı doğru artar). Uyuyan cismin dayanağını yitirip
  // yitirmediği de buradan anlaşıldığı için çok küçük bir aralık da temas sayılır.
  if (pen > -SUPPORT_GAP) {
    if (ny < -0.1) support(B, A.id);
    else if (ny > 0.1) support(A, B.id);
  }
  if (pen <= 0) return;
  let sA = A.fixed || A.asleep;
  let sB = B.fixed || B.asleep;
  if (sA && sB) return;

  // Temas noktasındaki bağıl hız (dönme dahil). rA = n·rA, rB = -n·rB; ω×r = (-ω·r.y, ω·r.x)
  const rvx = (B.vx + B.av * ny * B.r) - (A.vx - A.av * ny * A.r);
  const rvy = (B.vy - B.av * nx * B.r) - (A.vy + A.av * nx * A.r);

  // Uyuyan cisim yalnızca hızlı çarpma ya da derin girmede uyanır; aksi hâlde sabit sayılır
  if (sA !== sB && (Math.abs(rvx) + Math.abs(rvy) > WAKE_V || pen > 2)) {
    if (A.asleep) { wake(A); sA = false; }
    if (B.asleep) { wake(B); sB = false; }
  }
  const iA = sA ? 0 : A.invM;
  const iB = sB ? 0 : B.invM;
  const iSum = iA + iB;
  if (iSum <= 0) return;

  // Konum düzeltmesi (ters kütleyle paylaştırılır; hıza enerji eklemez)
  const c = Math.min(MAX_PUSH, (pen - SLOP) * PUSH);
  if (c > 0) {
    const q = c / iSum;
    A.x -= nx * q * iA; A.y -= ny * q * iA;
    B.x += nx * q * iB; B.y += ny * q * iB;
  }

  // Normal impuls
  const vn = rvx * nx + rvy * ny;
  if (vn >= 0) return;
  const e = -vn > REST_MIN_V ? REST_FRUIT : 0;
  const jn = (-(1 + e) * vn) / iSum;
  A.vx -= jn * nx * iA; A.vy -= jn * ny * iA;
  B.vx += jn * nx * iB; B.vy += jn * ny * iB;

  // Sürtünme impulsu (Coulomb sınırı). Dolu disk: I = m·r²/2 → teğet etkin kütle 3·(1/mA + 1/mB)
  const tx = -ny;
  const ty = nx;
  const vt = rvx * tx + rvy * ty;
  const fl = MU_FRUIT * jn;
  const jt = clamp(-vt / (3 * iSum), -fl, fl);
  A.vx -= jt * tx * iA; A.vy -= jt * ty * iA;
  B.vx += jt * tx * iB; B.vy += jt * ty * iB;
  if (iA) A.av -= (jt * 2 * iA) / A.r;
  if (iB) B.av -= (jt * 2 * iB) / B.r;
}

// Bir cisim ancak iki ayrı dayanağı (ya da zemini) varsa uyuyabilir; tek bir meyvenin tepesinde dengede
// duran meyve uyutulmaz, yuvarlanıp düşmeye devam eder.
function support(b, id) {
  if (b.s1 === 0) b.s1 = id;
  else if (b.s1 !== id) b.stable = true;
}

function walls(b) {
  if (b.x - b.r < LEFT) { wallHit(b, 1, 0, LEFT - (b.x - b.r)); support(b, -1); }
  else if (b.x + b.r > RIGHT) { wallHit(b, -1, 0, b.x + b.r - RIGHT); support(b, -2); }
  if (b.y + b.r > FLOOR) { wallHit(b, 0, -1, b.y + b.r - FLOOR); b.stable = true; }
}

// n: duvardan cisme doğru birim normal; pen: iç içe geçme. Duvar sonsuz kütlelidir, düzeltme tamdır.
function wallHit(b, nx, ny, pen) {
  b.x += nx * pen;
  b.y += ny * pen;
  const R = b.r;
  // Temas noktası r = -n·R → temas hızı v + ω×r
  const cvx = b.vx + b.av * ny * R;
  const cvy = b.vy - b.av * nx * R;
  const vn = cvx * nx + cvy * ny;
  if (vn >= 0) return;
  const e = -vn > REST_MIN_V ? REST_WALL : 0;
  const dvn = -(1 + e) * vn; // hız değişimi (impuls × 1/m)
  b.vx += dvn * nx;
  b.vy += dvn * ny;
  const tx = -ny;
  const ty = nx;
  const vt = cvx * tx + cvy * ty;
  const fl = MU_WALL * dvn;
  const dvt = clamp(-vt / 3, -fl, fl);
  b.vx += dvt * tx;
  b.vy += dvt * ty;
  b.av -= (dvt * 2) / R;
}

function applyMerges(w) {
  for (const m of w.pending) {
    const { A, B } = m;
    A.dead = true;
    B.dead = true;
    w.merges++;
    if (A.lvl >= MAX_LVL) {
      // İki karpuz: ikisi de kaybolur, büyük bonus
      w.score += KARPUZ_BONUS;
      w.karpuz++;
      w.events.push({ type: 'karpuz', lvl: A.lvl, x: m.x, y: m.y, points: KARPUZ_BONUS });
    } else {
      const lvl = A.lvl + 1;
      const nb = makeBody(w, lvl, m.x, m.y, {
        vx: (A.vx + B.vx) / 2, vy: (A.vy + B.vy) / 2, a: (A.a + B.a) / 2, av: (A.av + B.av) / 2,
        born: w.t - IMMUNITY, fresh: true,
      });
      clampInside(nb);
      w.bodies.push(nb);
      const pts = triangular(lvl);
      w.score += pts;
      if (lvl > w.biggest) w.biggest = lvl;
      w.events.push({ type: 'merge', lvl, x: nb.x, y: nb.y, points: pts });
    }
  }
  w.pending.length = 0;
  w.bodies = w.bodies.filter((b) => !b.dead);
  // Destek değişmiş olabilir: herkes uyanır
  for (const b of w.bodies) if (b.asleep) wake(b);
}

// Adım sonu: uyuma, tehlike çizgisi sayacı ve oyun sonu
function settle(w) {
  let worst = 0;
  for (const b of w.bodies) {
    if (!b.fixed && b.asleep) {
      // Altındaki meyve kayıp gittiyse uyuyan cisim uyanır; yoksa duvarda ya da havada asılı kalırdı.
      // Uyuyan cisim için duvar denetimi yapılmadığından duvar ve zemin teması burada eklenir.
      if (!b.stable && b.y + b.r < FLOOR - SUPPORT_GAP) {
        if (b.x - b.r <= LEFT + SUPPORT_GAP) support(b, -1);
        else if (b.x + b.r >= RIGHT - SUPPORT_GAP) support(b, -2);
        if (!b.stable) wake(b);
      }
    } else if (!b.fixed) {
      if (b.stable && Math.abs(b.vx) < SLEEP_V && Math.abs(b.vy) < SLEEP_V && Math.abs(b.av) < SLEEP_W) {
        b.still += STEP;
        if (b.still >= SLEEP_T) { b.asleep = true; b.vx = 0; b.vy = 0; b.av = 0; }
      } else {
        b.still = 0;
      }
    }
    b.s1 = 0;
    b.stable = false;
    if (b.y - b.r < LINE_Y && w.t - b.born >= IMMUNITY - 1e-9) {
      b.over += STEP;
      if (b.over > worst) worst = b.over;
    } else {
      b.over = 0;
    }
  }
  w.overTimer = worst;
  if (worst > OVER_LIMIT + 1e-9) {
    w.state = 'over';
    w.events.push({ type: 'over' });
  }
}

/** Kabın dışına taşan ya da sayısal olarak bozulan cisim sayısı (uzun simülasyon testi için). */
export function boundsViolations(w, eps = 0.01) {
  let bad = 0;
  for (const b of w.bodies) {
    const finite = Number.isFinite(b.x) && Number.isFinite(b.y) && Number.isFinite(b.vx) && Number.isFinite(b.vy);
    if (!finite || b.x - b.r < LEFT - eps || b.x + b.r > RIGHT + eps || b.y + b.r > FLOOR + eps || b.y < -H) bad++;
  }
  return bad;
}
