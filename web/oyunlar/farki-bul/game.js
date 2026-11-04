// Farkı bul: tohumlu rastgele üretilen iki SVG sahnede 5 farkı bulma oyunu.
// Dış görsel yok; sahneler geometrik şekillerden çizilir. Ağ isteği yok; yalnızca localStorage'a rekor yazılır.

const KEY = 'ba-oyun-farki-bul';
const W = 400;
const H = 300;
const NS = 'http://www.w3.org/2000/svg';
const HIT_R = 30; // fark tıklama yarıçapı (görünüm kutusu birimi)
const WRONG_PENALTY = 5;
const HINT_PENALTY = 10;
const MAX_HINTS = 3;
const LEVELS = {
  kolay: { count: 9, gap: 62, size: 1.6, hue: 150, rot: 90 },
  orta: { count: 13, gap: 50, size: 1.4, hue: 80, rot: 60 },
  zor: { count: 18, gap: 43, size: 1.25, hue: 45, rot: 40 },
};
const ASYM = ['triangle', 'tree', 'house', 'arrow'];
const TYPES = ['circle', 'square', 'triangle', 'star', 'tree', 'house', 'cloud', 'arrow'];
const KIND_LABEL = { renk: 'renk', boyut: 'boyut', eksik: 'eksik nesne', ek: 'fazladan nesne', dondurme: 'dönüş' };

const $ = (id) => document.getElementById(id);

// Tohumlu sözde rastgele sayı üreteci (mulberry32)
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, r) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STAR = (() => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 ? 8 : 20;
    p.push(`${(Math.cos(ang) * rad).toFixed(1)},${(Math.sin(ang) * rad).toFixed(1)}`);
  }
  return p.join(' ');
})();

function shapeSvg(type, fill) {
  const st = `fill="${fill}" stroke="#222" stroke-width="2" stroke-linejoin="round"`;
  switch (type) {
    case 'circle': return `<circle r="18" ${st}/>`;
    case 'square': return `<rect x="-16" y="-16" width="32" height="32" rx="3" ${st}/>`;
    case 'triangle': return `<polygon points="0,-20 19,15 -19,15" ${st}/>`;
    case 'star': return `<polygon points="${STAR}" ${st}/>`;
    case 'tree': return `<rect x="-4" y="6" width="8" height="14" fill="#7a5230" stroke="#222" stroke-width="1.5"/><polygon points="0,-20 16,8 -16,8" ${st}/>`;
    case 'house': return `<rect x="-15" y="-4" width="30" height="22" ${st}/><polygon points="-19,-4 0,-20 19,-4" fill="#8b2e2e" stroke="#222" stroke-width="2" stroke-linejoin="round"/><rect x="-4" y="6" width="8" height="12" fill="#fff" stroke="#222" stroke-width="1.5"/>`;
    case 'cloud': return `<g ${st}><ellipse cx="-8" cy="4" rx="12" ry="9"/><ellipse cx="6" cy="0" rx="13" ry="11"/><ellipse cx="14" cy="6" rx="9" ry="7"/></g>`;
    default: return `<polygon points="-18,-6 4,-6 4,-14 20,0 4,14 4,6 -18,6" ${st}/>`;
  }
}

function fillOf(o) {
  return `hsl(${Math.round(o.hue) % 360} 70% ${o.light}%)`;
}

function objSvg(o) {
  return `<g class="fb-shape" transform="translate(${o.x.toFixed(1)} ${o.y.toFixed(1)}) rotate(${o.rot}) scale(${o.scale.toFixed(3)})">${shapeSvg(o.type, fillOf(o))}</g>`;
}

/** Tohumdan iki sahne ve 5 fark üretir. Aynı tohum ve seviye her zaman aynı sonucu verir. */
export function generateRound(seed, levelName) {
  const L = LEVELS[levelName] || LEVELS.orta;
  const r = rng(seed * 2654435761 + 12345);
  const placed = [];
  const pick = (gap) => {
    for (let tries = 0; tries < 400; tries++) {
      const g = tries > 250 ? gap * 0.75 : gap;
      const x = 34 + r() * (W - 68);
      const y = 34 + r() * (H - 68);
      if (placed.every((p) => Math.hypot(p.x - x, p.y - y) >= g)) return { x, y };
    }
    return { x: 34 + r() * (W - 68), y: 34 + r() * (H - 68) };
  };
  const make = (id) => {
    const pos = pick(L.gap);
    const o = { id, type: TYPES[Math.floor(r() * TYPES.length)], x: pos.x, y: pos.y, scale: 0.85 + r() * 0.3, rot: 0, hue: Math.floor(r() * 360), light: 48 + Math.floor(r() * 14) };
    placed.push(o);
    return o;
  };
  const base = [];
  for (let i = 0; i < L.count; i++) base.push(make(i));
  const order = shuffle(base.map((o) => o.id), r);
  const kinds = shuffle(['renk', 'boyut', 'eksik', 'dondurme'], r);
  const diffs = [];
  const A = base.map((o) => ({ ...o }));
  const B = base.map((o) => ({ ...o }));
  kinds.forEach((kind, k) => {
    const id = order[k];
    const a = A[id];
    const b = B[id];
    if (kind === 'renk') b.hue = a.hue + L.hue + r() * 20;
    else if (kind === 'boyut') b.scale = a.scale * (r() < 0.5 ? L.size : 1 / L.size);
    else if (kind === 'dondurme') {
      a.type = ASYM[Math.floor(r() * ASYM.length)];
      b.type = a.type;
      b.rot = L.rot * (r() < 0.5 ? 1 : -1);
    }
    diffs.push({ id, kind, x: a.x, y: a.y });
  });
  // eksik: B'den çıkar; ek: yalnızca B'de var
  const missingId = diffs.find((d) => d.kind === 'eksik').id;
  const bList = B.filter((o) => o.id !== missingId);
  const extra = make(base.length);
  bList.push({ ...extra });
  diffs.push({ id: extra.id, kind: 'ek', x: extra.x, y: extra.y });
  const sky = Math.floor(r() * 40) + 190;
  const ground = 195 + Math.floor(r() * 30);
  return { seed, level: levelName, A, B: bList, missingId, diffs, sky, ground, all: B.concat([extra]) };
}

function backdrop(round) {
  return `<rect width="${W}" height="${H}" fill="hsl(${round.sky} 70% 90%)"/><rect y="${round.ground}" width="${W}" height="${H - round.ground}" fill="hsl(110 35% 78%)"/><circle cx="365" cy="34" r="16" fill="#ffe7a0" stroke="#d6a73a" stroke-width="2"/>`;
}

let round = null;
let level = 'orta';
let roundNo = 1;
let found = new Set();
let penalty = 0;
let hints = 0;
let startAt = 0;
let timer = null;
let finished = false;
let baseSeed = 0;

function loadStore() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || '{}') || {};
    const best = {};
    for (const k of Object.keys(LEVELS)) {
      const v = s.best && s.best[k];
      if (Number.isFinite(v) && v > 0) best[k] = v;
    }
    return { best, rounds: Number.isFinite(s.rounds) && s.rounds >= 0 ? Math.floor(s.rounds) : 0 };
  } catch { return { best: {}, rounds: 0 }; }
}
function saveStore(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* depolama kapalı olabilir */ }
}

const fmt = (ms) => {
  const t = Math.max(0, ms) / 1000;
  const m = Math.floor(t / 60);
  return `${m}:${(t - m * 60).toFixed(1).padStart(4, '0')}`;
};
const elapsed = () => (finished ? elapsedFinal : performance.now() - startAt + penalty * 1000);
let elapsedFinal = 0;

function renderBest() {
  const s = loadStore();
  const b = s.best[level];
  $('fb-best').textContent = b ? fmt(b) : '–';
  $('fb-total').textContent = String(s.rounds);
}

function tick() {
  $('fb-time').textContent = fmt(elapsed());
}

function setStatus(t, cls) {
  const el = $('fb-status');
  el.textContent = t;
  el.className = 'fb-status' + (cls ? ' ' + cls : '');
}

function buildPanels() {
  const objsA = round.A.map(objSvg).join('');
  const objsB = round.B.map(objSvg).join('');
  const focus = round.all.map((o, i) => `<g class="fb-focus" tabindex="0" role="button" data-id="${o.id}" aria-label="Nesne ${i + 1}"><circle class="fb-ring" cx="${o.x.toFixed(1)}" cy="${o.y.toFixed(1)}" r="26" fill="transparent"/></g>`).join('');
  $('fb-a').innerHTML = backdrop(round) + objsA + '<g class="fb-marks"></g>';
  $('fb-b').innerHTML = backdrop(round) + objsB + '<g class="fb-marks"></g>' + focus;
}

function markBoth(d, cls) {
  const els = [];
  for (const id of ['fb-a', 'fb-b']) {
    const g = $(id).querySelector('.fb-marks');
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', d.x.toFixed(1));
    c.setAttribute('cy', d.y.toFixed(1));
    c.setAttribute('r', String(HIT_R - 4));
    c.setAttribute('class', cls);
    g.appendChild(c);
    els.push(c);
  }
  return els;
}

function updateCounter() {
  $('fb-found').textContent = `${found.size} / 5`;
  $('fb-hint').disabled = finished || hints >= MAX_HINTS;
  $('fb-hint').textContent = `İpucu (${MAX_HINTS - hints} hak, +${HINT_PENALTY} sn)`;
  $('fb-penalty').textContent = String(penalty);
  $('fb-round').textContent = String(roundNo);
}

function finishRound() {
  finished = true;
  elapsedFinal = performance.now() - startAt + penalty * 1000;
  clearInterval(timer);
  tick();
  const s = loadStore();
  s.rounds += 1;
  const prev = s.best[level];
  const isRecord = !prev || elapsedFinal < prev;
  if (isRecord) s.best[level] = Math.round(elapsedFinal);
  saveStore(s);
  renderBest();
  $('fb-next').hidden = false;
  $('fb-next').focus();
  setStatus(`Tur tamamlandı: ${fmt(elapsedFinal)} (ceza dahil).${isRecord ? ' Yeni rekor!' : ''}`, 'is-over');
  updateCounter();
}

function hitAt(x, y) {
  return round.diffs.find((d) => !found.has(d.id) && Math.hypot(d.x - x, d.y - y) <= HIT_R);
}

function onPoint(x, y, byId) {
  if (finished) return;
  const d = byId !== undefined ? round.diffs.find((q) => q.id === byId && !found.has(q.id)) : hitAt(x, y);
  if (d) {
    found.add(d.id);
    markBoth(d, 'fb-found-mark');
    setStatus(`Fark bulundu: ${KIND_LABEL[d.kind]} (${found.size}/5).`, '');
    updateCounter();
    if (found.size === 5) finishRound();
    return;
  }
  // Zaten bulunmuş farka tıklama ceza sayılmaz
  const old = round.diffs.some((q) => found.has(q.id) && Math.hypot(q.x - x, q.y - y) <= HIT_R);
  if (old && byId === undefined) return;
  if (byId !== undefined && found.has(byId)) return;
  penalty += WRONG_PENALTY;
  const m = document.createElementNS(NS, 'text');
  const pt = byId !== undefined ? round.all.find((o) => o.id === byId) : { x, y };
  m.setAttribute('x', pt.x.toFixed(1));
  m.setAttribute('y', pt.y.toFixed(1));
  m.setAttribute('class', 'fb-wrong-mark');
  m.setAttribute('text-anchor', 'middle');
  m.textContent = '✕';
  for (const id of ['fb-a', 'fb-b']) {
    const cl = m.cloneNode(true);
    $(id).querySelector('.fb-marks').appendChild(cl);
    setTimeout(() => cl.remove(), 700);
  }
  setStatus(`Fark yok. +${WRONG_PENALTY} sn ceza.`, 'is-wrong');
  updateCounter();
  tick();
}

function svgPoint(svg, e) {
  const r = svg.getBoundingClientRect();
  return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
}

function hint() {
  if (finished || hints >= MAX_HINTS) return;
  const d = round.diffs.find((q) => !found.has(q.id));
  if (!d) return;
  hints += 1;
  penalty += HINT_PENALTY;
  const els = markBoth(d, 'fb-hint-mark');
  setTimeout(() => els.forEach((e) => e.remove()), 2200);
  setStatus(`İpucu gösterildi: ışıklı halkaya bakın. +${HINT_PENALTY} sn.`, '');
  updateCounter();
  tick();
}

function startRound(seed) {
  round = generateRound(seed, level);
  found = new Set();
  penalty = 0;
  hints = 0;
  finished = false;
  startAt = performance.now();
  buildPanels();
  $('fb-next').hidden = true;
  clearInterval(timer);
  timer = setInterval(tick, 200);
  setStatus('Soldaki ve sağdaki resim arasındaki 5 farkı bulun. Farkı tıklayın veya dokunun.', '');
  updateCounter();
  renderBest();
  tick();
}

function newSeed() {
  return (Math.floor(Math.random() * 1e9) + 1) >>> 0;
}

// Test kancası: fark konumları (görünüm kutusu ve ekran koordinatı) ile yanlış tıklama noktası
window.__farkTest = () => {
  const ra = $('fb-a').getBoundingClientRect();
  const toClient = (x, y) => ({ cx: ra.left + (x / W) * ra.width, cy: ra.top + (y / H) * ra.height });
  let wrong = { x: 10, y: 10 };
  let bestD = -1;
  for (let x = 20; x < W; x += 20) {
    for (let y = 20; y < H; y += 20) {
      const dm = Math.min(...round.diffs.map((d) => Math.hypot(d.x - x, d.y - y)));
      if (dm > bestD) { bestD = dm; wrong = { x, y }; }
    }
  }
  return {
    seed: round.seed,
    level,
    found: found.size,
    penalty,
    finished,
    diffs: round.diffs.map((d) => ({ id: d.id, kind: d.kind, x: d.x, y: d.y, ...toClient(d.x, d.y) })),
    wrong: { ...wrong, ...toClient(wrong.x, wrong.y) },
  };
};

function initFullscreen() {
  const box = document.querySelector('.game-box');
  const btn = $('fb-full');
  if (!(document.fullscreenEnabled && box.requestFullscreen)) return;
  btn.hidden = false;
  btn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    btn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

function init() {
  const q = new URLSearchParams(location.search);
  const sp = Number(q.get('seed'));
  baseSeed = Number.isFinite(sp) && sp > 0 ? Math.floor(sp) : newSeed();
  const lv = q.get('seviye');
  if (lv && LEVELS[lv]) { level = lv; $('fb-level').value = lv; }
  for (const id of ['fb-a', 'fb-b']) {
    $(id).addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('.fb-focus') && e.detail === 0) return; // klavye tıklaması keydown'da işlenir
      const p = svgPoint($(id), e);
      onPoint(p.x, p.y);
    });
  }
  $('fb-b').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const g = e.target.closest && e.target.closest('.fb-focus');
    if (!g) return;
    e.preventDefault();
    const id = Number(g.dataset.id);
    const o = round.all.find((q2) => q2.id === id);
    onPoint(o.x, o.y, id);
  });
  $('fb-level').addEventListener('change', (e) => { level = e.target.value; roundNo = 1; startRound(newSeed()); });
  $('fb-hint').addEventListener('click', hint);
  $('fb-next').addEventListener('click', () => { roundNo += 1; startRound(newSeed()); });
  $('fb-new').addEventListener('click', () => { startRound(newSeed()); });
  initFullscreen();
  startRound(baseSeed);
}

init();
