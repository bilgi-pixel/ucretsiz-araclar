// Kaydırmalı Sayı Bulmacası (15 bulmaca) — Bilişim Ajans.
// Tamamı istemci tarafıdır: ağ isteği yok, çerez yok. Resimli modda seçilen fotoğraf yalnızca
// bu sayfanın belleğinde (blob: adresi) işlenir; cihazdan çıkmaz. Kalıcı veri: localStorage'daki en iyi süreler.

const PREFIX = 'ba-oyun-kaydirmali-bulmaca';
export const SIZES = [3, 4, 5];

// ---------------------------------------------------------------------------
// Saf mantık (DOM'a dokunmaz; Node içinde de içe aktarılabilir)
// Dizi gösterimi: cells[i] = i. karedeki taş (satır öncelikli), 0 = boşluk. Hedef: 1..n²-1, sonda 0.
// "Adım" = boşluğa kayacak taşın o andaki kare numarası.
// ---------------------------------------------------------------------------

export function goalCells(n) {
  return Array.from({ length: n * n }, (_, i) => (i === n * n - 1 ? 0 : i + 1));
}

export function isSolved(cells, n) {
  for (let i = 0; i < n * n - 1; i++) if (cells[i] !== i + 1) return false;
  return cells[n * n - 1] === 0;
}

/** Boşluk dışındaki taşlar arasındaki ters sıra (inversion) sayısı. */
export function countInversions(cells) {
  const a = cells.filter(Boolean);
  let inv = 0;
  for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) inv++;
  return inv;
}

/**
 * Çözülebilirlik: n tekse ters sıra sayısı çift olmalı; n çiftse
 * (ters sıra + boşluğun alttan satır numarası, 1'den başlayarak) tek olmalı.
 */
export function isSolvable(cells, n) {
  const inv = countInversions(cells);
  if (n % 2 === 1) return inv % 2 === 0;
  const blankRowFromBottom = n - Math.floor(cells.indexOf(0) / n);
  return (inv + blankRowFromBottom) % 2 === 1;
}

/** Rastgele permütasyon üretir; çözülemezse iki taşı takas ederek eşliği düzeltir; çözülmüş olamaz. */
export function shuffled(n, rng = Math.random) {
  for (;;) {
    const a = goalCells(n);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    if (!isSolvable(a, n)) {
      // Boş olmayan iki taşı takas etmek ters sıra eşliğini değiştirir (boşluğun yeri sabit kalır).
      const first = a.findIndex((v) => v !== 0);
      const second = a.findIndex((v, i) => v !== 0 && i > first);
      [a[first], a[second]] = [a[second], a[first]];
    }
    if (!isSolved(a, n)) return a;
  }
}

/** idx karesindeki taşa tıklanınca kayacak taşların listesi (boşluğa en yakın olandan başlar). */
export function slideSteps(cells, n, idx) {
  const blank = cells.indexOf(0);
  if (idx === blank || idx < 0 || idx >= n * n) return [];
  const br = Math.floor(blank / n); const bc = blank % n;
  const r = Math.floor(idx / n); const c = idx % n;
  const steps = [];
  if (r === br) {
    const d = c > bc ? 1 : -1;
    for (let cc = bc + d; cc !== c + d; cc += d) steps.push(br * n + cc);
  } else if (c === bc) {
    const d = r > br ? 1 : -1;
    for (let rr = br + d; rr !== r + d; rr += d) steps.push(rr * n + bc);
  }
  return steps;
}

/** Ok yönüne göre kayacak taş: taş o yöne gider (sola basınca boşluğun sağındaki taş sola kayar). */
export function arrowSteps(cells, n, dir) {
  const blank = cells.indexOf(0);
  const br = Math.floor(blank / n); const bc = blank % n;
  let r = br; let c = bc;
  if (dir === 'left') c = bc + 1;
  else if (dir === 'right') c = bc - 1;
  else if (dir === 'up') r = br + 1;
  else if (dir === 'down') r = br - 1;
  if (r < 0 || r >= n || c < 0 || c >= n) return [];
  return [r * n + c];
}

/** Başlangıç karesindeki taşın dir yönünde kaydırılması: boşluk o yönde ve aynı hizadaysa kayar. */
export function swipeSteps(cells, n, idx, dir) {
  const blank = cells.indexOf(0);
  const br = Math.floor(blank / n); const bc = blank % n;
  const r = Math.floor(idx / n); const c = idx % n;
  const ok = (dir === 'left' && br === r && bc < c) || (dir === 'right' && br === r && bc > c)
    || (dir === 'up' && bc === c && br < r) || (dir === 'down' && bc === c && br > r);
  return ok ? slideSteps(cells, n, idx) : [];
}

/** Adımları uygular; yeni dizi döndürür (geçersiz adımda hata fırlatır). */
export function applySteps(cells, n, steps) {
  const a = cells.slice();
  let blank = a.indexOf(0);
  for (const idx of steps) {
    const adjacent = Math.abs(idx - blank) === n || (Math.abs(idx - blank) === 1 && Math.floor(idx / n) === Math.floor(blank / n));
    if (!adjacent) throw new Error('Geçersiz adım');
    a[blank] = a[idx];
    a[idx] = 0;
    blank = idx;
  }
  return a;
}

/**
 * Çözüm planı üretir (en kısa olmayabilir, ama her çözülebilir durumda sonuç verir).
 * Yöntem: üst satırı/sol sütunu sırayla oturtup küçülen dikdörtgeni 2×2'ye indirmek.
 * Her taş (satırın son iki taşı birlikte) küçük bir BFS ile yerine taşınır. Çözülemezse null.
 */
export function solve(start, n) {
  if (!isSolvable(start, n)) return null;
  const N2 = n * n;
  const cells = start.slice();
  const steps = [];
  const locked = new Array(N2).fill(false);
  let blank = cells.indexOf(0);

  const NB = Array.from({ length: N2 }, (_, i) => {
    const r = Math.floor(i / n); const c = i % n; const out = [];
    if (r > 0) out.push(i - n);
    if (r < n - 1) out.push(i + n);
    if (c > 0) out.push(i - 1);
    if (c < n - 1) out.push(i + 1);
    return out;
  });

  const apply = (idx) => { cells[blank] = cells[idx]; cells[idx] = 0; blank = idx; steps.push(idx); };

  // BFS yardımcısı: durum anahtarı -> [önceki anahtar, boşluğa kayan taşın karesi]
  function runPath(prev, goalKey, startKey) {
    const path = [];
    for (let k = goalKey; k !== startKey;) { const [pk, mv] = prev.get(k); path.push(mv); k = pk; }
    path.reverse().forEach(apply);
  }

  // Tek taşı hedef kareye götürür; durum = (taşın karesi, boşluğun karesi).
  function placeOne(value, target) {
    const t0 = cells.indexOf(value);
    if (t0 === target) return true;
    const key = (t, b) => t * N2 + b;
    const startKey = key(t0, blank);
    const prev = new Map([[startKey, null]]);
    const queue = [[t0, blank]];
    for (let qi = 0; qi < queue.length; qi++) {
      const [t, b] = queue[qi];
      for (const q of NB[b]) {
        if (locked[q]) continue;
        const nt = q === t ? b : t;
        const k = key(nt, q);
        if (prev.has(k)) continue;
        prev.set(k, [key(t, b), q]);
        if (nt === target) { runPath(prev, k, startKey); return true; }
        queue.push([nt, q]);
      }
    }
    return false;
  }

  // Satırın/sütunun son iki taşını birlikte yerine koyar; durum = (A karesi, B karesi, boşluk).
  function placeTwo(valA, targetA, valB, targetB) {
    const a0 = cells.indexOf(valA); const b0 = cells.indexOf(valB);
    if (a0 === targetA && b0 === targetB) return true;
    const key = (a, b, bl) => (a * N2 + b) * N2 + bl;
    const startKey = key(a0, b0, blank);
    const prev = new Map([[startKey, null]]);
    const queue = [[a0, b0, blank]];
    for (let qi = 0; qi < queue.length; qi++) {
      const [a, b, bl] = queue[qi];
      for (const q of NB[bl]) {
        if (locked[q]) continue;
        const na = q === a ? bl : a;
        const nb = q === b ? bl : b;
        const k = key(na, nb, q);
        if (prev.has(k)) continue;
        prev.set(k, [key(a, b, bl), q]);
        if (na === targetA && nb === targetB) { runPath(prev, k, startKey); return true; }
        queue.push([na, nb, q]);
      }
    }
    return false;
  }

  function placeLine(idxs) {
    for (let k = 0; k < idxs.length - 2; k++) {
      if (!placeOne(idxs[k] + 1, idxs[k])) return false;
      locked[idxs[k]] = true;
    }
    const a = idxs[idxs.length - 2]; const b = idxs[idxs.length - 1];
    if (!placeTwo(a + 1, a, b + 1, b)) return false;
    locked[a] = true; locked[b] = true;
    return true;
  }

  let top = 0; let left = 0;
  while (n - top > 2 || n - left > 2) {
    const R = n - top; const C = n - left;
    const row = R > 2 && (C <= 2 || R >= C);
    const idxs = [];
    if (row) { for (let c = left; c < n; c++) idxs.push(top * n + c); top++; }
    else { for (let r = top; r < n; r++) idxs.push(r * n + left); left++; }
    if (!placeLine(idxs)) return null;
  }

  // Kalan 2×2: en fazla 12 durum, BFS ile çözülür.
  const free = [];
  for (let r = n - 2; r < n; r++) for (let c = n - 2; c < n; c++) free.push(r * n + c);
  const goal = goalCells(n);
  const sig = () => free.map((i) => cells[i]).join(',');
  const goalSig = free.map((i) => goal[i]).join(',');
  if (sig() !== goalSig) {
    const startSig = sig();
    const startBlank = blank;
    const prev = new Map([[startSig, null]]);
    const queue = [{ s: cells.slice(), b: startBlank, sig: startSig }];
    let foundSig = null;
    for (let qi = 0; qi < queue.length && !foundSig; qi++) {
      const cur = queue[qi];
      for (const q of NB[cur.b]) {
        if (!free.includes(q)) continue;
        const s = cur.s.slice();
        s[cur.b] = s[q]; s[q] = 0;
        const sg = free.map((i) => s[i]).join(',');
        if (prev.has(sg)) continue;
        prev.set(sg, [cur.sig, q]);
        if (sg === goalSig) { foundSig = sg; break; }
        queue.push({ s, b: q, sig: sg });
      }
    }
    if (!foundSig) return null;
    const path = [];
    for (let k = foundSig; k !== startSig;) { const [pk, mv] = prev.get(k); path.push(mv); k = pk; }
    path.reverse().forEach(apply);
  }
  return isSolved(cells, n) ? steps : null;
}

// ---------------------------------------------------------------------------
// Arayüz
// ---------------------------------------------------------------------------

const KEYS = {
  ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
  a: 'left', d: 'right', w: 'up', s: 'down', A: 'left', D: 'right', W: 'up', S: 'down',
};
const BIG_FILE = 50 * 1024 * 1024; // bundan büyük görsellerde uyarı gösterilir
const MAX_SIDE = 720; // fotoğraf bu kenar uzunluğuna kırpılıp küçültülür

function lsGet(key) { try { return window.localStorage.getItem(key); } catch { return null; } }
function lsSet(key, value) { try { window.localStorage.setItem(key, value); } catch { /* yazılamazsa oyun yine çalışır */ } }

export function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Örnek resim: kendi çizimimiz (gün batımı manzarası + dağınık renkli kareler), her parça farklı görünür. */
function drawSample(canvas) {
  const S = 720;
  canvas.width = S; canvas.height = S;
  const g = canvas.getContext('2d');
  const sky = g.createLinearGradient(0, 0, 0, S);
  sky.addColorStop(0, '#3a0d18'); sky.addColorStop(0.45, '#a23a56'); sky.addColorStop(0.75, '#f0a0b3'); sky.addColorStop(1, '#ffd98a');
  g.fillStyle = sky; g.fillRect(0, 0, S, S);
  // Güneş
  const sun = g.createRadialGradient(500, 430, 10, 500, 430, 150);
  sun.addColorStop(0, '#fffbe8'); sun.addColorStop(0.45, '#ffd98a'); sun.addColorStop(1, 'rgba(255,217,138,0)');
  g.fillStyle = sun; g.beginPath(); g.arc(500, 430, 150, 0, Math.PI * 2); g.fill();
  // Yıldızlar (sabit sözde rastgele dizi)
  let seed = 7;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  g.fillStyle = '#fff';
  for (let i = 0; i < 60; i++) { g.globalAlpha = 0.4 + rnd() * 0.6; g.fillRect(rnd() * S, rnd() * S * 0.45, 3, 3); }
  g.globalAlpha = 1;
  // Dağlar
  const ridge = (color, base, amp, freq, phase) => {
    g.fillStyle = color; g.beginPath(); g.moveTo(0, S);
    for (let x = 0; x <= S; x += 8) g.lineTo(x, base - Math.abs(Math.sin(x / freq + phase)) * amp - Math.sin(x / (freq * 2.3)) * amp * 0.4);
    g.lineTo(S, S); g.closePath(); g.fill();
  };
  ridge('#7b2331', 470, 120, 90, 1); ridge('#5e1a25', 540, 100, 70, 3); ridge('#3a0d18', 620, 80, 55, 5);
  // Ev ve ağaçlar
  g.fillStyle = '#ffd98a'; g.fillRect(120, 560, 70, 50);
  g.fillStyle = '#2a0810'; g.beginPath(); g.moveTo(110, 560); g.lineTo(155, 520); g.lineTo(200, 560); g.closePath(); g.fill();
  g.fillStyle = '#2a0810';
  for (const x of [240, 270, 600, 640, 680]) { g.beginPath(); g.moveTo(x - 22, 640); g.lineTo(x, 570); g.lineTo(x + 22, 640); g.closePath(); g.fill(); }
  // Renkli kareler: her parçayı ayırt etmeyi kolaylaştırır
  const colors = ['#00aeef', '#ec008c', '#ffe000', '#6fcf97', '#fff'];
  for (let i = 0; i < 26; i++) { g.fillStyle = colors[i % colors.length]; g.fillRect(rnd() * (S - 30), rnd() * (S - 30), 14 + rnd() * 16, 14 + rnd() * 16); }
}

function init() {
  const $ = (id) => document.getElementById(id);
  const box = $('game-box');
  const board = $('board');
  const tilesEl = $('tiles');
  const thumb = $('thumb');

  let n = 4;
  let mode = 'sayi'; // sayi | resim
  let cells = goalCells(4);
  let tileEls = new Map();
  let moves = 0;
  let elapsed = 0;
  let running = false;
  let lastTs = 0;
  let solved = false;
  let assisted = false;
  let animTimer = null;
  let photoUrl = null;
  let justSwiped = false;

  const savedSize = Number(lsGet(`${PREFIX}:size`));
  if (SIZES.includes(savedSize)) n = savedSize;

  const bestKey = () => `${PREFIX}:best:${mode}:${n}`;
  function readBest() {
    try {
      const d = JSON.parse(lsGet(bestKey()) || 'null');
      if (d && Number.isFinite(d.time) && Number.isFinite(d.moves)) return d;
    } catch { /* bozuk kayıt yok sayılır */ }
    return null;
  }

  // --- Mesajlar ------------------------------------------------------------
  function setStatus(msg, kind) {
    const s = $('status');
    s.textContent = msg;
    s.dataset.kind = kind || '';
  }
  function showError(msg) { const e = $('error'); e.textContent = msg; e.classList.add('is-active'); }
  function clearError() { const e = $('error'); e.textContent = ''; e.classList.remove('is-active'); }
  function setNote(msg) { $('photo-note').textContent = msg; }

  // --- Süre ----------------------------------------------------------------
  function tick() {
    const now = performance.now();
    if (running && !document.hidden) elapsed += now - lastTs;
    lastTs = now;
    $('time').textContent = formatTime(elapsed);
  }
  setInterval(tick, 250);
  document.addEventListener('visibilitychange', () => { lastTs = performance.now(); });

  function startTimer() {
    if (running || solved) return;
    running = true; lastTs = performance.now();
  }
  function stopTimer() { tick(); running = false; }

  // --- Çizim ---------------------------------------------------------------
  function buildBoard() {
    board.style.setProperty('--n', String(n));
    board.dataset.size = String(n);
    tilesEl.textContent = '';
    tileEls = new Map();
    const total = n * n;
    // Arka plandaki boş kare ızgarası (taşların altında görünür)
    const cellsEl = $('cells');
    cellsEl.textContent = '';
    for (let i = 0; i < total; i++) cellsEl.appendChild(document.createElement('div'));
    for (let v = 1; v <= total; v++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = v === total ? 'ptile ghost' : 'ptile';
      b.dataset.v = String(v);
      b.tabIndex = -1;
      b.style.setProperty('--gc', String((v - 1) % n));
      b.style.setProperty('--gr', String(Math.floor((v - 1) / n)));
      const span = document.createElement('span');
      span.textContent = String(v);
      b.appendChild(span);
      if (v === total) {
        b.disabled = true;
        b.setAttribute('aria-hidden', 'true');
        b.style.setProperty('--r', String(n - 1));
        b.style.setProperty('--c', String(n - 1));
      }
      tilesEl.appendChild(b);
      tileEls.set(v, b);
    }
  }

  function render() {
    cells.forEach((v, i) => {
      if (!v) return;
      const e = tileEls.get(v);
      const r = Math.floor(i / n); const c = i % n;
      e.style.setProperty('--r', String(r));
      e.style.setProperty('--c', String(c));
      e.dataset.pos = String(i);
      e.classList.toggle('ok', v === i + 1);
      e.setAttribute('aria-label', `Taş ${v}, ${r + 1}. satır ${c + 1}. sütun${v === i + 1 ? ', doğru yerinde' : ''}`);
    });
    board.dataset.cells = cells.join(',');
    board.dataset.solved = String(solved);
    board.classList.toggle('solved', solved);
    tileEls.get(n * n)?.classList.toggle('show', solved);
    $('moves').textContent = String(moves);
    $('time').textContent = formatTime(elapsed);
    const best = readBest();
    $('best').textContent = best ? formatTime(best.time) : '—';
    $('btn-solve').disabled = solved;
    $('btn-solve').textContent = animTimer ? 'Durdur' : 'Çözümü izle';
    board.setAttribute('aria-label', `${n} çarpı ${n} kaydırmalı bulmaca tahtası. Bir taşa tıklayın ya da ok tuşlarıyla kaydırın.`);
    document.querySelectorAll('[data-size-btn]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.sizeBtn) === n)));
    document.querySelectorAll('[data-mode-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modeBtn === mode)));
  }

  // --- Oyun akışı ----------------------------------------------------------
  function stopAnim() {
    if (animTimer) { clearInterval(animTimer); animTimer = null; }
  }

  function newPuzzle() {
    stopAnim();
    cells = shuffled(n);
    moves = 0; elapsed = 0; running = false; solved = false; assisted = false;
    board.classList.remove('solved');
    buildBoard();
    render();
    setStatus('Bulmaca karıştırıldı. Taşları 1\'den başlayarak sıraya dizin; boşluk sağ alt köşede bitmeli.', '');
  }

  function finish() {
    stopAnim();
    stopTimer();
    solved = true;
    let msg;
    if (assisted) {
      msg = `Çözüm tamamlandı (${moves} hamle). Çözümü izlediğiniz için bu sonuç en iyi süre olarak kaydedilmedi.`;
    } else {
      const rec = readBest();
      const time = Math.round(elapsed);
      const newTime = !rec || time < rec.time;
      const newMoves = !rec || moves < rec.moves;
      lsSet(bestKey(), JSON.stringify({ time: newTime ? time : rec.time, moves: newMoves ? moves : rec.moves }));
      msg = `Tebrikler! ${n}×${n} bulmacayı ${moves} hamlede, ${formatTime(elapsed)} sürede çözdünüz.`;
      if (newTime && rec) msg += ' Yeni en iyi süre!';
      else if (!rec) msg += ' İlk süreniz kaydedildi.';
    }
    setStatus(msg, 'ok');
    render();
  }

  function applyMove(steps) {
    if (!steps.length || solved) return false;
    startTimer();
    cells = applySteps(cells, n, steps);
    moves += steps.length;
    render();
    if (isSolved(cells, n)) finish();
    else setStatus('', '');
    return true;
  }

  function userMove(steps) {
    if (animTimer) { stopAnim(); assisted = true; render(); }
    return applyMove(steps);
  }

  function solveAnimation() {
    if (animTimer) { stopAnim(); render(); setStatus('Çözüm duraklatıldı. Kendiniz devam edebilirsiniz.', ''); return; }
    if (solved) return;
    const plan = solve(cells, n);
    if (!plan) { showError('Bu dizilim çözülemedi. Lütfen "Karıştır" ile yeni bir bulmaca başlatın.'); return; }
    clearError();
    assisted = true;
    stopTimer();
    if (!plan.length) { finish(); return; }
    const delay = Math.max(30, Math.min(160, Math.round(5000 / plan.length)));
    let i = 0;
    setStatus(`Çözüm oynatılıyor (${plan.length} hamle)…`, '');
    animTimer = setInterval(() => {
      const idx = plan[i++];
      cells = applySteps(cells, n, [idx]);
      moves++;
      if (i >= plan.length) { render(); finish(); return; }
      render();
    }, delay);
    render();
  }

  // --- Girdi: tıklama, kaydırma, klavye ------------------------------------
  const tileIndexOf = (target) => {
    const t = target && target.closest ? target.closest('.ptile') : null;
    return t && t.dataset.pos !== undefined && !t.classList.contains('ghost') ? Number(t.dataset.pos) : -1;
  };

  board.addEventListener('click', (e) => {
    if (justSwiped) { justSwiped = false; return; }
    const idx = tileIndexOf(e.target);
    if (idx < 0) return;
    userMove(slideSteps(cells, n, idx));
  });

  let swipe = null;
  board.addEventListener('pointerdown', (e) => { swipe = { x: e.clientX, y: e.clientY, idx: tileIndexOf(e.target), id: e.pointerId }; });
  board.addEventListener('pointerup', (e) => {
    if (!swipe || swipe.id !== e.pointerId) return;
    const dx = e.clientX - swipe.x; const dy = e.clientY - swipe.y;
    const start = swipe;
    swipe = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    justSwiped = true;
    setTimeout(() => { justSwiped = false; }, 80);
    const dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    userMove(start.idx >= 0 ? swipeSteps(cells, n, start.idx, dir) : arrowSteps(cells, n, dir));
  });
  board.addEventListener('pointercancel', () => { swipe = null; });

  function boardInView() {
    const r = board.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    const dir = KEYS[e.key];
    if (!dir || !boardInView()) return;
    e.preventDefault();
    userMove(arrowSteps(cells, n, dir));
  });

  // --- Resimli mod ---------------------------------------------------------
  function setPhotoUrl(url) {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    photoUrl = url;
    const css = `url("${url}")`;
    board.style.setProperty('--img', css);
    thumb.style.setProperty('--img', css);
  }

  async function useCanvas(canvas) {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.9));
    if (!blob) throw new Error('canvas');
    setPhotoUrl(URL.createObjectURL(blob));
  }

  async function useSample() {
    const canvas = document.createElement('canvas');
    drawSample(canvas);
    await useCanvas(canvas);
    thumb.dataset.src = 'ornek';
  }

  async function loadPhoto(file) {
    clearError(); setNote('');
    if (!file) return;
    if (file.type && !file.type.startsWith('image/')) {
      showError('Bu dosya bir resim değil. JPG, PNG, WebP veya GIF türünde bir fotoğraf seçin.');
      return;
    }
    if (file.size > BIG_FILE) {
      setNote(`Dosya büyük (${(file.size / 1048576).toFixed(0)} MB); açılması biraz sürebilir. Daha küçük bir fotoğraf daha hızlı yüklenir.`);
    }
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('decode')); img.src = url; });
      if (!img.naturalWidth || !img.naturalHeight) throw new Error('decode');
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      const out = Math.min(MAX_SIDE, side);
      const canvas = document.createElement('canvas');
      canvas.width = out; canvas.height = out;
      const g = canvas.getContext('2d');
      g.fillStyle = '#fff'; g.fillRect(0, 0, out, out); // saydam PNG'ler siyah olmasın
      g.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, out, out);
      await useCanvas(canvas);
      thumb.dataset.src = 'foto';
      setNote(`"${file.name}" ortadan kare olarak kırpıldı. Fotoğrafınız bu cihazdan çıkmadı.`);
      newPuzzle();
    } catch {
      showError('Bu dosya görüntü olarak açılamadı. Dosya bozuk olabilir ya da biçimi desteklenmiyor; JPG, PNG veya WebP bir fotoğraf deneyin.');
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function setMode(next) {
    if (next === mode) return;
    clearError(); setNote('');
    mode = next;
    board.classList.toggle('pic', mode === 'resim');
    $('photo-panel').hidden = mode !== 'resim';
    if (mode === 'resim' && !photoUrl) {
      try { await useSample(); } catch { showError('Örnek resim hazırlanamadı. Sayılı moda dönebilirsiniz.'); mode = 'sayi'; board.classList.remove('pic'); $('photo-panel').hidden = true; }
    }
    newPuzzle();
  }

  // --- Bağlantılar ---------------------------------------------------------
  $('btn-shuffle').addEventListener('click', () => { clearError(); newPuzzle(); });
  $('btn-solve').addEventListener('click', solveAnimation);
  document.querySelectorAll('[data-size-btn]').forEach((b) => {
    b.addEventListener('click', () => {
      const next = Number(b.dataset.sizeBtn);
      if (next === n) return;
      n = next; lsSet(`${PREFIX}:size`, String(n)); newPuzzle();
    });
  });
  document.querySelectorAll('[data-mode-btn]').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.modeBtn)));
  $('photo').addEventListener('change', (e) => { const f = e.target.files && e.target.files[0]; loadPhoto(f); e.target.value = ''; });
  $('btn-sample').addEventListener('click', async () => { clearError(); try { await useSample(); setNote('Örnek resim yüklendi.'); newPuzzle(); } catch { showError('Örnek resim hazırlanamadı.'); } });
  $('show-nums').addEventListener('change', (e) => board.classList.toggle('nonum', !e.target.checked));

  const fsBtn = $('btn-full');
  if (document.fullscreenEnabled && box.requestFullscreen) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else box.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => { fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran'; });
  }

  newPuzzle();
}

if (typeof document !== 'undefined' && document.getElementById('board')) init();
