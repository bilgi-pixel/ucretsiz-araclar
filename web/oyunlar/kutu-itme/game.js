// Kutu itme bulmacası — DOM tabanlı tahta; dış kütüphane, görsel ya da ağ isteği yok.
// Seviyeler seviyeler.js, harita ayrıştırıcı / ölü kare hesabı / BFS çözücü cozucu.js içindedir.
// İlerleme, en iyi hamle sayıları ve yarım kalan seviyeler yalnızca bu tarayıcının localStorage
// alanında ("ba-oyun-kutu-itme") durur; hiçbir yere gönderilmez.
import { SEVIYELER } from './seviyeler.js';
import { parseLevel, deadSquares, frozenAt, walkPath, DIR_KEYS } from './cozucu.js';

const STORE_KEY = 'ba-oyun-kutu-itme';
const MAX_PATH = 20000;
const N = SEVIYELER.length;
const KEY_DIRS = { ArrowUp: 0, ArrowDown: 1, ArrowLeft: 2, ArrowRight: 3, w: 0, W: 0, s: 1, S: 1, a: 2, A: 2, d: 3, D: 3 };

const $ = (id) => document.getElementById(id);
const box = $('game-box');
const wrap = $('board-wrap');
const board = $('board');
const el = {
  level: $('level-label'), diff: $('level-diff'), par: $('level-par'),
  moves: $('moves'), pushes: $('pushes'), onGoal: $('on-goal'), best: $('best'),
  msg: $('msg'), result: $('result'), resultTitle: $('result-title'), resultText: $('result-text'),
  nextLevel: $('btn-next-level'), replay: $('btn-replay'),
  undo: $('btn-undo'), restart: $('btn-restart'), prev: $('btn-prev'), next: $('btn-next'),
  grid: $('level-grid'), progress: $('progress'), full: $('btn-full'),
};

/* ---------- Kalıcı veri (yalnızca localStorage, bozuk veriye karşı korumalı) ---------- */

const PATH_RE = /^[udlrUDLR]*$/;
function loadStore() {
  const out = { level: 1, best: {}, paths: {} };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
    if (Number.isInteger(raw.level) && raw.level >= 1 && raw.level <= N) out.level = raw.level;
    if (raw.best && typeof raw.best === 'object' && !Array.isArray(raw.best)) {
      for (const [k, v] of Object.entries(raw.best)) {
        const i = Number(k);
        if (!Number.isInteger(i) || i < 1 || i > N || !Array.isArray(v) || v.length !== 2) continue;
        const [m, p] = v;
        if (!Number.isInteger(m) || !Number.isInteger(p) || p < SEVIYELER[i - 1].itme || p > m || m > MAX_PATH) continue;
        out.best[i] = [m, p];
      }
    }
    if (raw.paths && typeof raw.paths === 'object' && !Array.isArray(raw.paths)) {
      for (const [k, v] of Object.entries(raw.paths)) {
        const i = Number(k);
        if (!Number.isInteger(i) || i < 1 || i > N || typeof v !== 'string' || !v || v.length > MAX_PATH || !PATH_RE.test(v)) continue;
        out.paths[i] = v;
      }
    }
  } catch (_) { /* bozuk kayıt ya da kapalı depolama: varsayılanla devam */ }
  return out;
}
const store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* gizli gezinme ya da kota */ }
}

/* ---------- Oyun durumu ---------- */

let idx = 0;           // 0 tabanlı seviye sırası
let L = null;          // ayrıştırılmış harita (cozucu.js)
let dead = null;       // hiçbir hedefe itilemeyen kareler
let boxes = [];        // kutu konumları; dizi sırası kutunun kimliğidir (çizimde kutular yer değiştirmez)
let occ = null;        // kutu varsa 1 (cozucu.js ile aynı biçim)
let player = 0;
let moves = 0;
let pushes = 0;
let path = '';         // seviye başından beri hamleler: küçük harf yürüme, büyük harf itme
let history = [];      // geri al yığını (sınırsız)
let won = false;
let cell = 32;
let boxEls = [];
let playerEl = null;
let gridButtons = [];

const xy = (i) => [i % L.w, Math.floor(i / L.w)];
const boxIndexAt = (i) => (occ[i] ? boxes.indexOf(i) : -1);
const goalsFilled = () => boxes.filter((b) => L.goals[b]).length;

function snapshot(withPath) {
  const s = { player, boxes: boxes.slice(), moves, pushes, pathLen: path.length };
  if (withPath) s.path = path;
  return s;
}
function rebuildOcc() {
  occ.fill(0);
  for (const b of boxes) occ[b] = 1;
}
function restore(s) {
  player = s.player;
  boxes = s.boxes.slice();
  moves = s.moves;
  pushes = s.pushes;
  path = typeof s.path === 'string' ? s.path : path.slice(0, s.pathLen);
  rebuildOcc();
  won = false;
}

// Tek adım uygular (geçmişe yazmaz). Dönüş: 0 engel, 1 yürüdü, 2 kutu itti.
function applyStep(d) {
  const t = player + L.offsets[d];
  if (!L.inside[t]) return 0;
  if (occ[t]) {
    const t2 = t + L.offsets[d];
    if (!L.inside[t2] || occ[t2]) return 0;
    const bi = boxIndexAt(t);
    boxes[bi] = t2;
    occ[t] = 0;
    occ[t2] = 1;
    pushes++;
    path += DIR_KEYS[d].toUpperCase();
    player = t;
    moves++;
    return 2;
  }
  path += DIR_KEYS[d];
  player = t;
  moves++;
  return 1;
}

function canStep(d) {
  const t = player + L.offsets[d];
  if (!L.inside[t]) return false;
  if (!occ[t]) return true;
  const t2 = t + L.offsets[d];
  return !!L.inside[t2] && !occ[t2];
}

function step(d) {
  if (won || !L) return false;
  if (!canStep(d)) { bump(); return false; }
  history.push(snapshot(false));
  const r = applyStep(d);
  afterChange(r === 2 ? boxes.findIndex((b) => b === player + L.offsets[d]) : -1);
  return true;
}

// Dokunulan kareye kutulara çarpmadan yürür (tek geri al adımı sayılır)
function walkTo(target) {
  if (won || target === player || !L.inside[target] || occ[target]) return;
  const p = walkPath(L, occ, player, target);
  if (!p) { showMsg('Oraya kutuları itmeden yürüyemezsiniz.'); return; }
  history.push(snapshot(false));
  for (const ch of p) applyStep(DIR_KEYS.indexOf(ch));
  afterChange(-1);
}

function undo() {
  if (!L) return;
  if (!history.length) { showMsg('Geri alınacak hamle yok.'); return; }
  restore(history.pop());
  hideResult();
  afterChange(-1, true);
  showMsg(history.length ? `Geri alındı. ${moves} hamle, ${pushes} itme.` : 'Geri alındı; seviyenin başındasınız.');
}

function restart() {
  if (!L || (moves === 0 && path === '')) return;
  // Yeniden başlatma da geri alınabilir: tüm durum yığına yazılır
  history.push(snapshot(true));
  player = L.player;
  boxes = L.boxes.slice();
  moves = 0;
  pushes = 0;
  path = '';
  won = false;
  rebuildOcc();
  hideResult();
  afterChange(-1, true);
  showMsg('Seviye baştan başladı. Fikrinizi değiştirirseniz Geri al ile önceki duruma dönebilirsiniz.');
}

function afterChange(pushedBox, quiet) {
  renderPieces();
  if (path) store.paths[idx + 1] = path; else delete store.paths[idx + 1];
  if (goalsFilled() === boxes.length) { win(); return; }
  renderHud();
  saveStore();
  if (quiet || pushedBox < 0) return;
  const b = boxes[pushedBox];
  if (dead[b]) showMsg('Bu kutu artık hiçbir hedefe itilemez (köşede ya da hedefsiz bir duvar kenarında). Geri al (Z) ile düzeltin.', true);
  else if (frozenAt(L, occ, b)) showMsg('Kutular duvarla birlikte kilitlendi; bir daha kıpırdayamazlar. Geri al (Z) ile düzeltin.', true);
  else if (L.goals[b]) showMsg(`Kutu hedefe yerleşti: ${goalsFilled()}/${boxes.length}.`);
  else showMsg('');
}

function win() {
  won = true;
  delete store.paths[idx + 1];
  const id = idx + 1;
  const prev = store.best[id];
  const record = !prev || moves < prev[0] || (moves === prev[0] && pushes < prev[1]);
  if (record) store.best[id] = [moves, pushes];
  if (idx + 1 < N) store.level = idx + 2; // yenilemede sıradaki seviye açılsın
  saveStore();
  renderHud();
  renderGrid();
  board.classList.add('won');
  const par = SEVIYELER[idx].itme;
  el.resultTitle.textContent = `Seviye ${id} tamamlandı!`;
  let text = `${moves} hamle ve ${pushes} itmeyle çözdünüz.`;
  if (record && prev) text += ` Yeni rekor! Önceki en iyiniz ${prev[0]} hamleydi.`;
  else if (!record) text += ` En iyiniz: ${prev[0]} hamle, ${prev[1]} itme.`;
  if (pushes === par) text += ' Bu seviyenin en az itmeli çözümünü buldunuz.';
  else text += ` Bu seviye en az ${par} itmeyle çözülebiliyor.`;
  if (idx + 1 === N) text += ' Bu son seviyeydi; hepsini bitirdiyseniz tebrikler!';
  el.resultText.textContent = text;
  el.nextLevel.hidden = idx + 1 >= N;
  el.result.hidden = false;
  el.result.classList.add('is-active');
  showMsg(`Tebrikler! Seviye ${id} çözüldü.`);
  (el.nextLevel.hidden ? el.replay : el.nextLevel).focus({ preventScroll: true });
}
function hideResult() {
  el.result.hidden = true;
  el.result.classList.remove('is-active');
  board.classList.remove('won');
}

/* ---------- Seviye yükleme ---------- */

function loadLevel(i) {
  idx = Math.min(N - 1, Math.max(0, i));
  L = parseLevel(SEVIYELER[idx].harita);
  dead = deadSquares(L);
  occ = new Uint8Array(L.inside.length);
  player = L.player;
  boxes = L.boxes.slice();
  moves = 0;
  pushes = 0;
  path = '';
  history = [];
  won = false;
  rebuildOcc();
  buildBoard();
  hideResult();

  // Yarım kalan seviyeyi kayıtlı hamlelerden yeniden kur (geri al yığını da oluşur)
  const saved = store.paths[idx + 1];
  let resumed = false;
  if (saved) {
    let ok = true;
    for (const ch of saved) {
      const d = DIR_KEYS.indexOf(ch.toLowerCase());
      if (d < 0 || !canStep(d)) { ok = false; break; }
      history.push(snapshot(false));
      const r = applyStep(d);
      if ((r === 2) !== (ch !== ch.toLowerCase())) { ok = false; break; }
    }
    if (!ok || goalsFilled() === boxes.length) {
      player = L.player; boxes = L.boxes.slice(); moves = 0; pushes = 0; path = ''; history = [];
      rebuildOcc();
      delete store.paths[idx + 1];
    } else {
      resumed = true;
    }
  }
  store.level = idx + 1;
  saveStore();

  el.level.textContent = `Seviye ${idx + 1} / ${N}`;
  el.diff.textContent = SEVIYELER[idx].zorluk;
  el.par.textContent = `${boxes.length} kutu · en az ${SEVIYELER[idx].itme} itme`;
  board.dataset.level = String(idx + 1);
  board.setAttribute('aria-label', `Kutu itme tahtası, seviye ${idx + 1}: ${boxes.length} kutu, ${L.w} sütun, ${L.h} satır.`);
  fit();
  renderPieces(true);
  renderHud();
  renderGrid();
  if (resumed) showMsg(`Seviye ${idx + 1}: kaldığınız yerden devam ediyorsunuz (${moves} hamle). Geri al ile adım adım dönebilirsiniz.`);
  else if (idx === 0) showMsg('Ok tuşları, W A S D, kaydırma ya da yön düğmeleriyle yürüyün; kutuyu halkalı hedef karesine itin.');
  else showMsg(`Seviye ${idx + 1} hazır: ${boxes.length} kutuyu ${boxes.length} hedefe itin.`);
}

function goLevel(i) {
  if (i < 0 || i >= N) return;
  loadLevel(i);
  board.focus({ preventScroll: true });
}

/* ---------- Çizim ---------- */

function buildBoard() {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < L.w * L.h; i++) {
    const t = document.createElement('div');
    t.className = L.inside[i] ? (L.goals[i] ? 'ki-t f g' : 'ki-t f') : L.walls[i] ? 'ki-t w' : 'ki-t o';
    frag.appendChild(t);
  }
  boxEls = boxes.map(() => {
    const b = document.createElement('div');
    b.className = 'ki-p ki-box';
    frag.appendChild(b);
    return b;
  });
  playerEl = document.createElement('div');
  playerEl.className = 'ki-p ki-player';
  frag.appendChild(playerEl);
  board.replaceChildren(frag);
  board.style.setProperty('--w', String(L.w));
  board.style.setProperty('--h', String(L.h));
}

function renderPieces(instant) {
  if (instant) board.classList.add('no-anim');
  boxes.forEach((b, k) => {
    const [x, y] = xy(b);
    const e = boxEls[k];
    e.style.setProperty('--x', String(x));
    e.style.setProperty('--y', String(y));
    e.classList.toggle('on', !!L.goals[b]);
    e.classList.toggle('dead', !!dead[b]);
  });
  const [px, py] = xy(player);
  playerEl.style.setProperty('--x', String(px));
  playerEl.style.setProperty('--y', String(py));
  if (instant) requestAnimationFrame(() => requestAnimationFrame(() => board.classList.remove('no-anim')));
}

function renderHud() {
  el.moves.textContent = String(moves);
  el.pushes.textContent = String(pushes);
  el.onGoal.textContent = `${goalsFilled()}/${boxes.length}`;
  const best = store.best[idx + 1];
  el.best.textContent = best ? String(best[0]) : '–';
  el.best.parentElement.title = best ? `En iyi: ${best[0]} hamle, ${best[1]} itme` : 'Bu seviye henüz çözülmedi';
  board.dataset.moves = String(moves);
  board.dataset.pushes = String(pushes);
  board.dataset.state = won ? 'bitti' : 'oynuyor';
  el.undo.disabled = history.length === 0;
  el.restart.disabled = moves === 0 && path === '';
  el.prev.disabled = idx === 0;
  el.next.disabled = idx >= N - 1;
}

function buildGrid() {
  gridButtons = SEVIYELER.map((lv, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ki-lv';
    b.textContent = String(i + 1);
    b.addEventListener('click', () => {
      goLevel(i);
      $('levels').open = false;
    });
    return b;
  });
  el.grid.replaceChildren(...gridButtons);
}
function renderGrid() {
  let solved = 0;
  gridButtons.forEach((b, i) => {
    const best = store.best[i + 1];
    if (best) solved++;
    b.classList.toggle('done', !!best);
    b.classList.toggle('cur', i === idx);
    if (i === idx) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    b.setAttribute('aria-label', `Seviye ${i + 1}, ${SEVIYELER[i].zorluk}${best ? `, çözüldü, en iyi ${best[0]} hamle` : ''}`);
  });
  el.progress.textContent = `${solved}/${N} çözüldü`;
}

function showMsg(text, warn) {
  el.msg.textContent = text;
  el.msg.classList.toggle('warn', !!warn);
}

function bump() {
  playerEl.classList.remove('bump');
  void playerEl.offsetWidth; // animasyonu yeniden başlat
  playerEl.classList.add('bump');
}

// Hücre boyutu: kutu genişliğine sığar; tam ekranda yüksekliğe de sığar
function fit() {
  if (!L) return;
  const avail = Math.max(120, wrap.clientWidth - 4);
  const fs = document.fullscreenElement === box;
  // Alçak ekranda (yatay telefon) tam ekran içeriği kaydırılabilir; tahta yine de okunur boyda kalsın
  const maxH = fs ? Math.max(200, window.innerHeight - 330) : Math.max(260, window.innerHeight * 0.6);
  let c = Math.floor(Math.min(avail / L.w, maxH / L.h, 52));
  c = Math.max(16, c);
  if (c !== cell || !board.style.getPropertyValue('--cell')) {
    cell = c;
    board.classList.add('no-anim');
    board.style.setProperty('--cell', `${c}px`);
    requestAnimationFrame(() => requestAnimationFrame(() => board.classList.remove('no-anim')));
  }
}

/* ---------- Klavye ---------- */
// Oklar ve WASD yalnızca odak oyun kutusundayken ya da sayfada odak yokken (tahta ekranda görünürse)
// çalışır; böylece içerik okunurken ok tuşlarıyla sayfa kaydırma bozulmaz.
function boxInView() {
  const r = board.getBoundingClientRect();
  return r.bottom > 40 && r.top < window.innerHeight - 40;
}
document.addEventListener('keydown', (e) => {
  if (e.altKey || e.metaKey) return;
  const t = e.target;
  if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName))) return;
  const inside = t instanceof Node && box.contains(t);
  if (!inside && !((t === document.body || t === document.documentElement) && boxInView())) return;
  const k = e.key;
  if (e.ctrlKey) {
    if (k === 'z' || k === 'Z') { e.preventDefault(); undo(); }
    return;
  }
  if (k in KEY_DIRS) { e.preventDefault(); step(KEY_DIRS[k]); return; }
  if (k === 'z' || k === 'Z' || k === 'u' || k === 'U' || k === 'Backspace') { e.preventDefault(); undo(); return; }
  if (k === 'r' || k === 'R') { e.preventDefault(); restart(); return; }
  if ((k === 'n' || k === 'N') && idx < N - 1) { e.preventDefault(); goLevel(idx + 1); return; }
  if ((k === 'p' || k === 'P') && idx > 0) { e.preventDefault(); goLevel(idx - 1); return; }
  if (k === 'Enter' && t === board && won && idx < N - 1) { e.preventDefault(); goLevel(idx + 1); }
});

/* ---------- Kaydırma ve dokunma ---------- */
// Parmağı ya da fareyi bir kare boyu sürüklemek bir adım atar (sürüklemeye devam ettikçe sürer).
// Kısa dokunuş: komşu kareye adım (kutuyu iter) ya da uzak kareye kutulara çarpmadan yürüyüş.
let drag = null;
board.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  drag = { id: e.pointerId, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moved: false };
  try { board.setPointerCapture(e.pointerId); } catch (_) { /* desteklenmiyor */ }
  board.focus({ preventScroll: true });
});
board.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = e.clientX - drag.x;
  const dy = e.clientY - drag.y;
  const th = Math.max(18, cell * 0.8);
  if (Math.max(Math.abs(dx), Math.abs(dy)) < th) return;
  drag.moved = true;
  step(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 3 : 2) : (dy > 0 ? 1 : 0));
  drag.x = e.clientX;
  drag.y = e.clientY;
});
board.addEventListener('pointerup', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  const tap = !drag.moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 12;
  drag = null;
  if (!tap || won) return;
  const r = board.getBoundingClientRect();
  const x = Math.floor((e.clientX - r.left) / cell);
  const y = Math.floor((e.clientY - r.top) / cell);
  if (x < 0 || y < 0 || x >= L.w || y >= L.h) return;
  const target = y * L.w + x;
  const [px, py] = xy(player);
  const d = Math.abs(x - px) + Math.abs(y - py);
  if (d === 1) step(x > px ? 3 : x < px ? 2 : y > py ? 1 : 0);
  else if (d > 1) walkTo(target);
});
board.addEventListener('pointercancel', () => { drag = null; });

/* ---------- Ekran okları (basılı tutunca tekrarlar) ---------- */
let repeatTimer = 0;
function stopRepeat() { clearTimeout(repeatTimer); clearInterval(repeatTimer); repeatTimer = 0; }
for (const [id, d] of [['dp-up', 0], ['dp-down', 1], ['dp-left', 2], ['dp-right', 3]]) {
  const b = $(id);
  b.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    stopRepeat();
    step(d);
    repeatTimer = setTimeout(() => { repeatTimer = setInterval(() => step(d), 140); }, 380);
  });
  for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(ev, stopRepeat);
  // Klavyeyle (Enter/Boşluk) etkinleştirme: detail === 0; fare ve dokunma pointerdown'da işlendi
  b.addEventListener('click', (e) => { if (e.detail === 0) step(d); });
}

/* ---------- Düğmeler ---------- */
el.undo.addEventListener('click', undo);
el.restart.addEventListener('click', restart);
el.prev.addEventListener('click', () => goLevel(idx - 1));
el.next.addEventListener('click', () => goLevel(idx + 1));
el.nextLevel.addEventListener('click', () => goLevel(idx + 1));
el.replay.addEventListener('click', () => { goLevel(idx); });

if (document.fullscreenEnabled && box.requestFullscreen) {
  el.full.hidden = false;
  el.full.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else box.requestFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === box;
    el.full.setAttribute('aria-pressed', String(on));
    el.full.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
    fit();
  });
}

if ('ResizeObserver' in window) new ResizeObserver(() => fit()).observe(wrap);
window.addEventListener('resize', fit);

// Tarayıcı testleri için kanca (oyuncuya sunulan bir özellik değildir): yalnızca durumu okur.
window.__kutuItmeTest = () => (L ? {
  level: idx + 1, count: N, w: L.w, h: L.h, player, boxes: boxes.slice().sort((a, b) => a - b),
  moves, pushes, path, won, undo: history.length, cell, par: SEVIYELER[idx].itme,
} : null);

/* ---------- Başlangıç ---------- */
buildGrid();
loadLevel(store.level - 1);
board.dataset.ready = '1';
