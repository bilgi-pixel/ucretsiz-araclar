// Yapboz — Bilişim Ajans.
// Tamamı istemci tarafıdır: ağ isteği yok, çerez yok. Örnek görseller canvas ile burada çizilir;
// kullanıcının fotoğrafı yalnızca bu sayfanın belleğinde (blob: adresi) işlenir ve cihazdan çıkmaz.
// Kalıcı veri: localStorage'daki seçimler ve en iyi süreler (anahtar: ba-oyun-yapboz).

const KEY = 'ba-oyun-yapboz';
export const SIZES = [3, 4, 5, 6];
const SAMPLE_IDS = ['gunbatimi', 'desen', 'sehir'];
const SAMPLE_NAMES = { gunbatimi: 'Gün batımı', desen: 'Geometrik desen', sehir: 'Gece şehri' };
const IMG_SIDE = 840; // 3, 4, 5 ve 6'ya tam bölünür; parçalar piksel kesirine düşmez
const MIN_OUT = 360; // çok küçük fotoğraflar bu boyuta büyütülür
const MAX_SIDE = 840;
const BIG_FILE = 50 * 1024 * 1024; // bundan büyük dosyada uyarı gösterilir
const MAX_FILE = 200 * 1024 * 1024; // bundan büyük dosya açılmaz
const MAX_PIXELS = 100 * 1000 * 1000; // 100 megapikselden büyük görsel açılmaz
const DRAG_SLOP = 6; // bu kadar piksel hareket "sürükleme" sayılır, altı "dokunma"

const $ = (id) => document.getElementById(id);
const RM = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
const reducedMotion = () => !!(RM && RM.matches);

// ---------------------------------------------------------------------------
// Depolama: bozuk ya da eksik kayıt oyunu çökertmez, varsayılana düşer.
// ---------------------------------------------------------------------------
function loadStore() {
  const d = { size: 4, image: 'gunbatimi', best: {} };
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (raw && typeof raw === 'object') {
      if (SIZES.includes(raw.size)) d.size = raw.size;
      if (typeof raw.image === 'string' && SAMPLE_IDS.includes(raw.image)) d.image = raw.image;
      if (raw.best && typeof raw.best === 'object') {
        for (const [k, v] of Object.entries(raw.best)) {
          if (SIZES.includes(Number(k)) && v && Number.isFinite(v.time) && v.time >= 0 && Number.isFinite(v.moves) && v.moves >= 0) {
            d.best[k] = { time: Math.round(v.time), moves: Math.round(v.moves) };
          }
        }
      }
    }
  } catch { /* bozuk kayıt yok sayılır */ }
  return d;
}
const store = loadStore();
function saveStore() {
  try { window.localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* yazılamazsa oyun yine çalışır */ }
}

export function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Karıştırılmış 0..count-1 listesi; sıralı çıkarsa yeniden karıştırır. */
export function shuffledIds(count, rng = Math.random) {
  for (;;) {
    const a = Array.from({ length: count }, (_, i) => i);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    if (count < 2 || a.some((v, i) => v !== i)) return a;
  }
}

// ---------------------------------------------------------------------------
// Örnek görseller: kendi çizimlerimiz (dış dosya yok). Sabit tohumlu, her parça farklı görünür.
// ---------------------------------------------------------------------------
function seeded(seed) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

function drawSunset(g, S) {
  const rnd = seeded(11);
  const sky = g.createLinearGradient(0, 0, 0, S);
  sky.addColorStop(0, '#1b1245'); sky.addColorStop(0.32, '#6b2a8c'); sky.addColorStop(0.58, '#e2476f'); sky.addColorStop(0.78, '#ff9e5e'); sky.addColorStop(1, '#ffd98a');
  g.fillStyle = sky; g.fillRect(0, 0, S, S);
  g.fillStyle = '#fff';
  for (let i = 0; i < 70; i++) { g.globalAlpha = 0.3 + rnd() * 0.7; g.fillRect(rnd() * S, rnd() * S * 0.38, 3, 3); }
  g.globalAlpha = 1;
  const sx = S * 0.66; const sy = S * 0.62;
  const sun = g.createRadialGradient(sx, sy, 8, sx, sy, S * 0.22);
  sun.addColorStop(0, '#fffbe8'); sun.addColorStop(0.35, '#ffe08a'); sun.addColorStop(1, 'rgba(255,200,120,0)');
  g.fillStyle = sun; g.beginPath(); g.arc(sx, sy, S * 0.22, 0, Math.PI * 2); g.fill();
  // Bulutlar
  g.fillStyle = 'rgba(255,255,255,0.2)';
  for (let k = 0; k < 6; k++) {
    const cx = rnd() * S; const cy = S * (0.14 + rnd() * 0.34); const w = S * (0.1 + rnd() * 0.1);
    for (let j = 0; j < 4; j++) { g.beginPath(); g.ellipse(cx + (j - 1.5) * w * 0.55, cy + (j % 2) * 6, w * 0.6, w * 0.22, 0, 0, Math.PI * 2); g.fill(); }
  }
  // Dağ sıraları
  const ridge = (color, base, amp, freq, phase) => {
    g.fillStyle = color; g.beginPath(); g.moveTo(0, S);
    for (let x = 0; x <= S; x += 6) g.lineTo(x, base - Math.abs(Math.sin(x / freq + phase)) * amp - Math.sin(x / (freq * 2.1)) * amp * 0.35);
    g.lineTo(S, S); g.closePath(); g.fill();
  };
  ridge('#8a3a7a', S * 0.62, S * 0.14, S * 0.11, 1); ridge('#5c2a6b', S * 0.7, S * 0.12, S * 0.085, 3); ridge('#33194a', S * 0.78, S * 0.1, S * 0.07, 5);
  // Göl ve güneşin yansıması
  const lake = g.createLinearGradient(0, S * 0.82, 0, S);
  lake.addColorStop(0, '#f08a6a'); lake.addColorStop(1, '#3c1a52');
  g.fillStyle = lake; g.fillRect(0, S * 0.82, S, S * 0.18);
  g.fillStyle = 'rgba(255,240,190,0.55)';
  for (let i = 0; i < 9; i++) g.fillRect(sx - S * (0.1 - i * 0.012), S * (0.83 + i * 0.017), S * (0.2 - i * 0.024), 4);
  // Kuşlar ve çam ağaçları
  g.strokeStyle = '#2a1238'; g.lineWidth = 3;
  for (let i = 0; i < 6; i++) { const bx = S * (0.15 + rnd() * 0.5); const by = S * (0.2 + rnd() * 0.2); g.beginPath(); g.moveTo(bx - 12, by); g.quadraticCurveTo(bx - 5, by - 9, bx, by); g.quadraticCurveTo(bx + 5, by - 9, bx + 12, by); g.stroke(); }
  g.fillStyle = '#1d0c2b';
  for (const t of [0.06, 0.12, 0.2, 0.86, 0.93]) {
    const tx = S * t; const ty = S * 0.9; const h = S * (0.1 + rnd() * 0.06);
    g.beginPath(); g.moveTo(tx - h * 0.28, ty); g.lineTo(tx, ty - h); g.lineTo(tx + h * 0.28, ty); g.closePath(); g.fill();
  }
}

function drawPattern(g, S) {
  const rnd = seeded(23);
  const pal = ['#00aeef', '#ec008c', '#ffe000', '#7b2331', '#fff8f3', '#2a0810'];
  const N = 10; const c = S / N;
  for (let r = 0; r < N; r++) {
    for (let k = 0; k < N; k++) {
      const bg = (r * 3 + k * 5 + Math.floor(rnd() * 3)) % pal.length;
      let fg = (bg + 1 + Math.floor(rnd() * (pal.length - 1))) % pal.length;
      if (fg === bg) fg = (bg + 1) % pal.length;
      const x = k * c; const y = r * c;
      g.fillStyle = pal[bg]; g.fillRect(x, y, c + 1, c + 1);
      g.fillStyle = pal[fg];
      const type = Math.floor(rnd() * 5);
      g.beginPath();
      if (type === 0) { const cx = x + (rnd() < 0.5 ? 0 : c); const cy = y + (rnd() < 0.5 ? 0 : c); g.moveTo(cx, cy); g.arc(cx, cy, c, 0, Math.PI * 2); g.save(); g.clip(); g.fillRect(x, y, c, c); g.restore(); g.beginPath(); }
      else if (type === 1) { g.moveTo(x, y); g.lineTo(x + c, y); g.lineTo(x, y + c); g.closePath(); g.fill(); }
      else if (type === 2) { g.arc(x + c / 2, y + c / 2, c * 0.34, 0, Math.PI * 2); g.fill(); }
      else if (type === 3) { g.moveTo(x + c, y + c); g.lineTo(x, y + c); g.lineTo(x + c, y); g.closePath(); g.fill(); }
      else { g.rect(x + c * 0.2, y + c * 0.2, c * 0.6, c * 0.6); g.fill(); }
    }
  }
  // Çerçevesiz, parçalar arası ayrım için ince çizgiler
  g.strokeStyle = 'rgba(0,0,0,0.12)'; g.lineWidth = 2;
  for (let i = 1; i < N; i++) { g.beginPath(); g.moveTo(i * c, 0); g.lineTo(i * c, S); g.moveTo(0, i * c); g.lineTo(S, i * c); g.stroke(); }
}

function drawCity(g, S) {
  const rnd = seeded(37);
  const sky = g.createLinearGradient(0, 0, 0, S);
  sky.addColorStop(0, '#080c2b'); sky.addColorStop(0.5, '#2b2166'); sky.addColorStop(0.8, '#b0457a'); sky.addColorStop(1, '#f2a679');
  g.fillStyle = sky; g.fillRect(0, 0, S, S);
  g.fillStyle = '#fff';
  for (let i = 0; i < 90; i++) { g.globalAlpha = 0.25 + rnd() * 0.75; g.fillRect(rnd() * S, rnd() * S * 0.5, 2 + rnd() * 2, 2 + rnd() * 2); }
  g.globalAlpha = 1;
  // Ay
  const mx = S * 0.24; const my = S * 0.2;
  const moon = g.createRadialGradient(mx, my, 6, mx, my, S * 0.1);
  moon.addColorStop(0, '#fffdf0'); moon.addColorStop(0.5, '#fff1b8'); moon.addColorStop(1, 'rgba(255,241,184,0)');
  g.fillStyle = moon; g.beginPath(); g.arc(mx, my, S * 0.1, 0, Math.PI * 2); g.fill();
  // Uzak ve yakın binalar, yanık pencereler
  const skyline = (color, minH, maxH, wMin, wMax, lit) => {
    let x = -10;
    while (x < S) {
      const w = wMin + rnd() * (wMax - wMin); const h = S * (minH + rnd() * (maxH - minH)); const y = S * 0.84 - h;
      g.fillStyle = color; g.fillRect(x, y, w, S - y);
      if (lit) {
        for (let wy = y + 12; wy < S * 0.82; wy += 18) for (let wx = x + 8; wx < x + w - 10; wx += 16) {
          if (rnd() < 0.45) { g.fillStyle = rnd() < 0.75 ? '#ffe28a' : '#9fe6ff'; g.fillRect(wx, wy, 7, 9); }
        }
      }
      x += w + 2 + rnd() * 6;
    }
  };
  skyline('#3a2a6e', 0.12, 0.34, 40, 80, false);
  skyline('#1a1238', 0.1, 0.3, 46, 90, true);
  // Nehir ve yansıma
  const water = g.createLinearGradient(0, S * 0.84, 0, S);
  water.addColorStop(0, '#2a1b4d'); water.addColorStop(1, '#0c0a24');
  g.fillStyle = water; g.fillRect(0, S * 0.84, S, S * 0.16);
  for (let i = 0; i < 40; i++) { g.fillStyle = rnd() < 0.7 ? 'rgba(255,226,138,0.5)' : 'rgba(159,230,255,0.45)'; g.fillRect(rnd() * S, S * (0.85 + rnd() * 0.14), 3 + rnd() * 5, 2); }
  // Köprü
  g.strokeStyle = '#ffb36b'; g.lineWidth = 4;
  g.beginPath(); g.moveTo(0, S * 0.82); g.quadraticCurveTo(S * 0.5, S * 0.7, S, S * 0.82); g.stroke();
}

const DRAWERS = { gunbatimi: drawSunset, desen: drawPattern, sehir: drawCity };

// ---------------------------------------------------------------------------
// Arayüz ve oyun durumu
// ---------------------------------------------------------------------------
function init() {
  const area = $('area');
  const board = $('board');
  const slotsEl = $('slots');
  const tray = $('tray');
  const preview = $('preview');
  const previewImg = $('preview-img');
  const thumb = $('thumb');

  let n = store.size;
  let imageKind = store.image; // gunbatimi | desen | sehir | foto
  let imageUrl = null;
  let ready = false;
  let slots = []; // slots[i] = karedeki parça numarası ya da null; parça k'nın doğru karesi k'dır
  let trayIds = []; // tepsideki parçalar (görünen sıra)
  let pieceEls = [];
  let slotEls = [];
  let selected = null; // seçili parça (dokun/klavye ile yerleştirme için)
  let moves = 0;
  let elapsed = 0;
  let running = false;
  let lastTs = 0;
  let finished = false;
  let record = null;
  let trayFocus = null; // tepsi içinde klavye odağındaki parça
  let slotCursor = 0; // tahtada klavye odağındaki kare
  let pendingFocus = null; // render sonrası odaklanacak öğe
  let drag = null;
  let scrollRaf = 0;
  let confettiTimer = 0;

  const isLocked = (id) => slots[id] === id;
  const lockedCount = () => slots.reduce((a, v, i) => a + (v === i ? 1 : 0), 0);
  const locate = (id) => {
    const i = slots.indexOf(id);
    return i >= 0 ? { kind: 'slot', index: i } : { kind: 'tray', index: trayIds.indexOf(id) };
  };
  const bestKey = () => String(n);

  // --- Mesajlar ------------------------------------------------------------
  function setStatus(msg, kind) { const s = $('status'); s.textContent = msg; s.dataset.kind = kind || ''; }
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
  function startTimer() { if (running || finished) return; running = true; lastTs = performance.now(); }
  function stopTimer() { tick(); running = false; }

  // --- Görsel --------------------------------------------------------------
  async function setImageFromCanvas(canvas, kind) {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.92));
    if (!blob) throw new Error('canvas');
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    imageUrl = URL.createObjectURL(blob);
    const css = `url("${imageUrl}")`;
    area.style.setProperty('--img', css);
    thumb.style.setProperty('--img', css);
    previewImg.src = imageUrl;
    imageKind = kind;
    area.dataset.image = kind;
  }

  async function useSample(id) {
    const canvas = document.createElement('canvas');
    canvas.width = IMG_SIDE; canvas.height = IMG_SIDE;
    DRAWERS[id](canvas.getContext('2d'), IMG_SIDE);
    await setImageFromCanvas(canvas, id);
    if (SAMPLE_IDS.includes(id)) { store.image = id; saveStore(); }
  }

  async function loadPhoto(file) {
    clearError(); setNote('');
    if (!file) return false;
    if (file.type && !file.type.startsWith('image/')) {
      showError('Bu dosya bir resim değil. JPG, PNG, WebP veya GIF türünde bir fotoğraf seçin.');
      return false;
    }
    if (file.size > MAX_FILE) {
      showError(`Dosya çok büyük (${(file.size / 1048576).toFixed(0)} MB). Yapboz için 200 MB'dan küçük bir fotoğraf seçin; telefonla çekilen fotoğraflar genellikle yeterlidir.`);
      return false;
    }
    if (file.size > BIG_FILE) {
      setNote(`Dosya büyük (${(file.size / 1048576).toFixed(0)} MB); açılması biraz sürebilir. Daha küçük bir fotoğraf daha hızlı yüklenir.`);
    }
    let url = null;
    try {
      url = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('decode')); img.src = url; });
      if (!img.naturalWidth || !img.naturalHeight) throw new Error('decode');
      if (img.naturalWidth * img.naturalHeight > MAX_PIXELS) {
        showError(`Görsel çok büyük (${img.naturalWidth} × ${img.naturalHeight} piksel). En fazla yaklaşık 100 megapiksellik bir fotoğraf kullanın; fotoğrafı küçültüp yeniden deneyin.`);
        setNote('');
        return false;
      }
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      const out = Math.max(MIN_OUT, Math.min(MAX_SIDE, side));
      const canvas = document.createElement('canvas');
      canvas.width = out; canvas.height = out;
      const g = canvas.getContext('2d');
      g.fillStyle = '#fff'; g.fillRect(0, 0, out, out); // saydam PNG'ler siyah olmasın
      g.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, out, out);
      await setImageFromCanvas(canvas, 'foto');
      setNote(`"${file.name}" ortadan kare olarak kırpıldı. Fotoğrafınız bu cihazdan çıkmadı.`);
      newPuzzle();
      return true;
    } catch {
      showError('Bu dosya görüntü olarak açılamadı. Dosya bozuk olabilir ya da biçimi desteklenmiyor; JPG, PNG veya WebP bir fotoğraf deneyin.');
      return false;
    } finally {
      if (url) URL.revokeObjectURL(url);
    }
  }

  // --- Çizim ---------------------------------------------------------------
  function buildBoard() {
    area.style.setProperty('--n', String(n));
    board.dataset.n = String(n);
    slotsEl.textContent = '';
    tray.textContent = '';
    pieceEls = [];
    slotEls = [];
    for (let i = 0; i < n * n; i++) {
      const s = document.createElement('div');
      s.className = 'yb-slot';
      s.dataset.cell = String(i);
      s.dataset.num = String(i + 1);
      s.setAttribute('role', 'button');
      s.tabIndex = -1;
      slotsEl.appendChild(s);
      slotEls.push(s);
    }
    for (let id = 0; id < n * n; id++) {
      const p = document.createElement('div');
      p.className = 'yb-piece';
      p.dataset.id = String(id);
      p.setAttribute('role', 'button');
      p.style.setProperty('--gc', String(id % n));
      p.style.setProperty('--gr', String(Math.floor(id / n)));
      const num = document.createElement('span');
      num.textContent = String(id + 1);
      num.setAttribute('aria-hidden', 'true');
      p.appendChild(num);
      pieceEls.push(p);
    }
  }

  function describeSlot(i) {
    const r = Math.floor(i / n) + 1; const c = (i % n) + 1;
    const id = slots[i];
    const state = id === null ? 'boş' : (id === i ? 'doğru parça yerleşti, kilitli' : 'parça yerleşti, ama bu karenin parçası değil');
    return `Kare ${r}. satır ${c}. sütun, ${state}`;
  }

  function render() {
    const remaining = n * n - lockedCount();
    // Tahta kareleri
    for (let i = 0; i < n * n; i++) {
      const id = slots[i];
      const se = slotEls[i];
      const pe = id === null ? null : pieceEls[id];
      if (pe) { if (pe.parentElement !== se) se.replaceChildren(pe); } else if (se.firstChild) se.replaceChildren();
      se.classList.toggle('filled', id !== null);
      se.classList.toggle('locked', id !== null && id === i);
      se.tabIndex = i === slotCursor ? 0 : -1;
      se.setAttribute('aria-label', describeSlot(i));
    }
    // Tepsi
    const want = trayIds.map((id) => pieceEls[id]);
    const same = tray.children.length === want.length && want.every((el, k) => tray.children[k] === el);
    if (!same) tray.replaceChildren(...want);
    if (trayFocus === null || !trayIds.includes(trayFocus)) trayFocus = trayIds.length ? trayIds[0] : null;
    // Parçalar
    for (let id = 0; id < n * n; id++) {
      const pe = pieceEls[id];
      const inSlot = slots.includes(id);
      pe.classList.toggle('in-slot', inSlot);
      pe.classList.toggle('locked', isLocked(id));
      pe.classList.toggle('selected', selected === id);
      if (inSlot) { pe.setAttribute('aria-hidden', 'true'); pe.removeAttribute('tabindex'); pe.removeAttribute('aria-pressed'); pe.removeAttribute('aria-label'); }
      else {
        pe.removeAttribute('aria-hidden');
        pe.tabIndex = id === trayFocus ? 0 : -1;
        pe.setAttribute('aria-pressed', String(selected === id));
        pe.setAttribute('aria-label', `Parça ${id + 1}${selected === id ? ', seçili' : ''}`);
      }
    }
    board.dataset.solved = String(finished);
    board.classList.toggle('solved', finished);
    $('remaining').textContent = String(remaining);
    $('moves').textContent = String(moves);
    $('time').textContent = formatTime(elapsed);
    const b = store.best[bestKey()];
    $('best').textContent = b ? formatTime(b.time) : '—';
    tray.setAttribute('aria-label', trayIds.length ? `Dağınık parçalar, ${trayIds.length} parça` : 'Dağınık parça kalmadı');
    document.querySelectorAll('[data-size-btn]').forEach((el) => el.setAttribute('aria-pressed', String(Number(el.dataset.sizeBtn) === n)));
    document.querySelectorAll('[data-sample]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.sample === imageKind)));
    if (pendingFocus) {
      const pf = pendingFocus; pendingFocus = null;
      const el = pf.kind === 'slot' ? slotEls[pf.index] : pieceEls[pf.index];
      if (el) el.focus({ preventScroll: true });
    }
  }

  // --- Oyun akışı ----------------------------------------------------------
  function newPuzzle() {
    cancelDrag();
    clearTimeout(confettiTimer);
    $('confetti').textContent = '';
    n = store.size;
    slots = Array(n * n).fill(null);
    trayIds = shuffledIds(n * n);
    selected = null; moves = 0; elapsed = 0; running = false; finished = false; record = null;
    slotCursor = 0; trayFocus = null; pendingFocus = null;
    setPreview(false);
    preview.classList.remove('final');
    buildBoard();
    render();
    ready = true;
    board.dataset.ready = '1';
    setStatus(`${n * n} parça karıştırıldı. Parçaları tahtadaki yerine sürükleyin; doğru yere oturan parça kilitlenir. Süre ilk hamlenizle başlar.`, '');
  }

  function finish() {
    stopTimer();
    finished = true;
    selected = null;
    const time = Math.round(elapsed);
    const prev = store.best[bestKey()];
    const newTime = !prev || time < prev.time;
    const newMoves = !prev || moves < prev.moves;
    store.best[bestKey()] = { time: newTime ? time : prev.time, moves: newMoves ? moves : prev.moves };
    saveStore();
    let msg = `Tebrikler! ${n}×${n} yapbozu ${moves} hamlede, ${formatTime(time)} sürede tamamladınız.`;
    if (newTime && prev) msg += ' Yeni en iyi süre!';
    else if (!prev) msg += ' İlk süreniz kaydedildi.';
    record = { time, moves, newBest: newTime, key: bestKey() };
    // Tamamlanan resmi dikişsiz göster
    preview.hidden = false;
    preview.classList.add('final');
    $('btn-preview').setAttribute('aria-pressed', 'false');
    render();
    setStatus(msg, 'ok');
    launchConfetti();
  }

  function launchConfetti() {
    if (reducedMotion()) return;
    const box = $('confetti');
    box.textContent = '';
    const colors = ['#ec008c', '#00aeef', '#ffe000', '#7b2331', '#6fcf97', '#fff'];
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('i');
      s.style.left = `${Math.random() * 100}%`;
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = `${Math.random() * 0.5}s`;
      s.style.animationDuration = `${1.6 + Math.random() * 1.2}s`;
      s.style.setProperty('--dx', `${(Math.random() - 0.5) * 120}px`);
      box.appendChild(s);
    }
    clearTimeout(confettiTimer);
    confettiTimer = setTimeout(() => { box.textContent = ''; }, 3600);
  }

  /** Parçayı karesine (ya da tepsiye: cell < 0) yerleştirir; dolu karedeki kilitsiz parça yer değiştirir. */
  function placePiece(id, cell) {
    if (finished) return false;
    const from = locate(id);
    if (isLocked(id)) return false;
    if (cell < 0) {
      if (from.kind === 'slot') {
        slots[from.index] = null;
        trayIds.push(id);
        trayFocus = id;
        moves++; startTimer();
        render();
        setStatus('Parça tepsiye geri alındı.', '');
        return true;
      }
      render();
      return false;
    }
    if (from.kind === 'slot' && from.index === cell) { render(); return false; }
    const occ = slots[cell];
    if (occ !== null && occ === cell) {
      setStatus('Bu kare doğru parçayla dolu ve kilitli; başka bir kare seçin.', 'warn');
      render();
      return false;
    }
    startTimer();
    if (from.kind === 'tray') {
      if (occ !== null) trayIds.splice(from.index, 1, occ); else trayIds.splice(from.index, 1);
    } else {
      slots[from.index] = occ; // dolu kareyle yer değiştir ya da boşalt
    }
    slots[cell] = id;
    moves++;
    const hit = slots[cell] === cell;
    const moved = occ !== null && from.kind === 'slot' && slots[from.index] === from.index;
    if (trayFocus === id || !trayIds.includes(trayFocus)) trayFocus = trayIds.length ? trayIds[Math.min(from.kind === 'tray' ? from.index : 0, trayIds.length - 1)] : null;
    render();
    for (const k of [cell, from.kind === 'slot' ? from.index : -1]) {
      if (k >= 0 && slots[k] === k) glow(pieceEls[k]);
    }
    if (lockedCount() === n * n) { finish(); return true; }
    const left = n * n - lockedCount();
    if (hit && moved) setStatus(`Parçalar yer değiştirdi ve ikisi de yerine oturdu! ${left} parça kaldı.`, 'ok');
    else if (hit) setStatus(`Doğru yer! Parça yerine oturdu ve kilitlendi. ${left} parça kaldı.`, 'ok');
    else if (moved) setStatus(`Yer değiştirdi ve bir parça yerine oturdu. ${left} parça kaldı.`, 'ok');
    else setStatus('Parça yerleşti ama burası doğru yer değil; kilitlenmedi. Başka bir kareyi deneyin.', '');
    return true;
  }

  function glow(el) {
    if (!el || reducedMotion()) return;
    el.classList.remove('glow');
    void el.offsetWidth; // animasyonu yeniden başlat
    el.classList.add('glow');
    el.addEventListener('animationend', () => el.classList.remove('glow'), { once: true });
  }

  // --- Dokunma / klavye ile yerleştirme ----------------------------------------
  function tapPiece(id) {
    if (finished) return;
    const loc = locate(id);
    if (loc.kind === 'slot' && isLocked(id)) { setStatus('Bu parça doğru yerinde ve kilitli.', ''); return; }
    if (selected === id) { selected = null; setStatus('Seçim kaldırıldı.', ''); render(); return; }
    if (selected !== null && loc.kind === 'slot') { const q = selected; selected = null; placePiece(q, loc.index); return; }
    selected = id;
    if (loc.kind === 'tray') trayFocus = id;
    setStatus(`Parça ${id + 1} seçildi. Şimdi tahtada bir kareye dokunun (klavyede oklarla gidip Enter'a basın).`, '');
    render();
  }

  function tapSlot(i) {
    if (finished) return;
    slotCursor = i;
    if (selected !== null) { const q = selected; selected = null; placePiece(q, i); return; }
    const occ = slots[i];
    if (occ === null) { render(); return; }
    if (occ === i) { setStatus('Bu parça doğru yerinde ve kilitli.', ''); render(); return; }
    selected = occ;
    setStatus(`Parça ${occ + 1} seçildi. Yeni karesini seçin ya da tepsiye geri almak için tepsiye dokunun.`, '');
    render();
  }

  function tapTray() {
    if (finished || selected === null) return;
    if (locate(selected).kind === 'slot') { const q = selected; selected = null; placePiece(q, -1); }
  }

  // --- Sürükle-bırak (pointer events: fare, kalem ve dokunmatik) -----------
  function slotAt(x, y) {
    const rect = board.getBoundingClientRect();
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) return -1;
    const c = Math.min(n - 1, Math.floor(((x - rect.left) / rect.width) * n));
    const r = Math.min(n - 1, Math.floor(((y - rect.top) / rect.height) * n));
    return r * n + c;
  }

  function setHover(idx) {
    slotEls.forEach((s, i) => s.classList.toggle('hover', i === idx));
  }

  function applyDrag() {
    if (!drag) return;
    const dx = (drag.x - drag.sx) + (window.scrollX - drag.scrollX0);
    const dy = (drag.y - drag.sy) + (window.scrollY - drag.scrollY0);
    drag.el.style.transform = `translate(${dx}px, ${dy}px) scale(${drag.scale})`;
    setHover(slotAt(drag.x, drag.y));
  }

  function autoScroll() {
    scrollRaf = 0;
    if (!drag || !drag.moved) return;
    const edge = 70;
    let dy = 0;
    if (drag.y < edge) dy = -Math.ceil((edge - drag.y) / 5);
    else if (drag.y > window.innerHeight - edge) dy = Math.ceil((drag.y - (window.innerHeight - edge)) / 5);
    if (dy) { window.scrollBy(0, dy); applyDrag(); }
    scrollRaf = requestAnimationFrame(autoScroll);
  }

  function cancelDrag() {
    if (!drag) return;
    const d = drag;
    drag = null;
    if (scrollRaf) { cancelAnimationFrame(scrollRaf); scrollRaf = 0; }
    d.el.classList.remove('dragging');
    d.el.style.transform = '';
    d.el.style.transformOrigin = '';
    try { d.el.releasePointerCapture(d.pid); } catch { /* yakalama zaten bırakılmış olabilir */ }
    setHover(-1);
  }

  area.addEventListener('pointerdown', (e) => {
    if (finished || drag) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = e.target.closest ? e.target.closest('.yb-piece') : null;
    if (!el) return;
    const id = Number(el.dataset.id);
    if (!Number.isInteger(id) || isLocked(id)) return;
    e.preventDefault();
    const rect = el.getBoundingClientRect();
    const boardCell = board.getBoundingClientRect().width / n;
    drag = {
      id, el, pid: e.pointerId, sx: e.clientX, sy: e.clientY, x: e.clientX, y: e.clientY,
      scrollX0: window.scrollX, scrollY0: window.scrollY, moved: false,
      scale: rect.width > 0 ? boardCell / rect.width : 1,
    };
    el.style.transformOrigin = `${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`;
    try { el.setPointerCapture(e.pointerId); } catch { /* yakalama desteklenmiyorsa sürükleme yine çalışır */ }
  });

  area.addEventListener('pointermove', (e) => {
    if (!drag || drag.pid !== e.pointerId) return;
    drag.x = e.clientX; drag.y = e.clientY;
    if (!drag.moved) {
      if (Math.hypot(drag.x - drag.sx, drag.y - drag.sy) < DRAG_SLOP) return;
      drag.moved = true;
      drag.el.classList.add('dragging');
      if (preview.classList.contains('shown')) setPreview(false); // tahtayı görebilmek için önizleme kapanır
      scrollRaf = requestAnimationFrame(autoScroll);
    }
    applyDrag();
  });

  area.addEventListener('pointerup', (e) => {
    if (!drag || drag.pid !== e.pointerId) return;
    const d = drag;
    const cell = slotAt(e.clientX, e.clientY);
    cancelDrag();
    if (!d.moved) { tapPiece(d.id); return; }
    selected = null;
    placePiece(d.id, cell);
  });

  area.addEventListener('pointercancel', (e) => {
    if (!drag || drag.pid !== e.pointerId) return;
    cancelDrag();
    render();
  });

  // Parça olmayan yerlere (boş kare, tepsi zemini) dokunma/tıklama
  area.addEventListener('click', (e) => {
    if (e.target.closest && e.target.closest('.yb-piece')) return;
    const slot = e.target.closest ? e.target.closest('.yb-slot') : null;
    if (slot) { tapSlot(Number(slot.dataset.cell)); return; }
    if (e.target === tray) tapTray();
  });

  // --- Klavye ----------------------------------------------------------------
  const ARROWS = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] };
  area.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const slot = e.target.closest ? e.target.closest('.yb-slot') : null;
    const piece = !slot && e.target.closest ? e.target.closest('.yb-piece') : null;
    if (!slot && !piece) return;
    const k = e.key;
    if (k === 'Escape' && selected !== null) {
      e.preventDefault();
      const was = selected; selected = null;
      setStatus('Seçim kaldırıldı.', '');
      pendingFocus = locate(was).kind === 'tray' ? { kind: 'piece', index: was } : null;
      render();
      return;
    }
    if (k === 'Enter' || k === ' ') {
      e.preventDefault();
      if (slot) { tapSlot(Number(slot.dataset.cell)); return; }
      const id = Number(piece.dataset.id);
      const wasSelected = selected === id;
      tapPiece(id);
      // Parça seçilince odak tahtaya geçer: kullanıcı hedef kareyi seçsin.
      if (!wasSelected && selected === id) { pendingFocus = { kind: 'slot', index: slotCursor }; render(); }
      return;
    }
    if (slot && (ARROWS[k] || k === 'Home' || k === 'End')) {
      e.preventDefault();
      let r = Math.floor(slotCursor / n); let c = slotCursor % n;
      if (k === 'Home') c = 0; else if (k === 'End') c = n - 1;
      else { r = Math.min(n - 1, Math.max(0, r + ARROWS[k][0])); c = Math.min(n - 1, Math.max(0, c + ARROWS[k][1])); }
      slotCursor = r * n + c;
      pendingFocus = { kind: 'slot', index: slotCursor };
      render();
      return;
    }
    if (piece && (ARROWS[k] || k === 'Home' || k === 'End') && !piece.classList.contains('in-slot')) {
      e.preventDefault();
      const idx = trayIds.indexOf(Number(piece.dataset.id));
      let next = idx;
      if (k === 'ArrowLeft' || k === 'ArrowUp') next = Math.max(0, idx - 1);
      else if (k === 'ArrowRight' || k === 'ArrowDown') next = Math.min(trayIds.length - 1, idx + 1);
      else if (k === 'Home') next = 0; else next = trayIds.length - 1;
      trayFocus = trayIds[next];
      pendingFocus = { kind: 'piece', index: trayFocus };
      render();
    }
  });

  // --- Önizleme ------------------------------------------------------------
  function setPreview(on) {
    preview.hidden = !on;
    preview.classList.toggle('shown', on);
    $('btn-preview').setAttribute('aria-pressed', String(on));
    $('btn-preview').textContent = on ? 'Önizlemeyi gizle' : 'Önizleme göster';
  }

  // --- Bağlantılar ---------------------------------------------------------
  $('btn-shuffle').addEventListener('click', () => { clearError(); newPuzzle(); });
  $('btn-preview').addEventListener('click', () => {
    if (finished) return;
    setPreview(!preview.classList.contains('shown'));
  });
  document.querySelectorAll('[data-size-btn]').forEach((b) => b.addEventListener('click', () => {
    const next = Number(b.dataset.sizeBtn);
    if (next === store.size && ready) return;
    store.size = next; saveStore(); clearError(); newPuzzle();
  }));
  document.querySelectorAll('[data-sample]').forEach((b) => b.addEventListener('click', async () => {
    clearError(); setNote('');
    try { await useSample(b.dataset.sample); newPuzzle(); } catch { showError('Örnek görsel hazırlanamadı. Sayfayı yenileyip tekrar deneyin.'); }
  }));
  $('photo').addEventListener('change', (e) => { const f = e.target.files && e.target.files[0]; loadPhoto(f); e.target.value = ''; });
  $('show-nums').addEventListener('change', (e) => area.classList.toggle('nums', e.target.checked));

  const box = $('game-box');
  const fsBtn = $('btn-full');
  if (document.fullscreenEnabled && box.requestFullscreen) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else box.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => { fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran'; });
  }

  // Tarayıcı testleri için kanca: durumu okur ve dosya açmayı sınar (oyuncuya sunulan bir özellik değildir).
  window.__yapbozTest = Object.assign(() => (ready ? {
    n,
    image: imageKind,
    ready,
    slots: slots.slice(),
    tray: trayIds.slice(),
    pieces: Array.from({ length: n * n }, (_, id) => {
      const loc = locate(id);
      return { id, target: { r: Math.floor(id / n), c: id % n }, where: loc.kind, slot: loc.kind === 'slot' ? loc.index : null, locked: isLocked(id) };
    }),
    remaining: n * n - lockedCount(),
    moves,
    done: finished,
    elapsed: Math.round(elapsed),
    selected,
    record,
  } : null), { loadFile: (f) => loadPhoto(f) });

  (async () => {
    try {
      await useSample(store.image);
    } catch {
      showError('Örnek görsel hazırlanamadı. Sayfayı yenileyip tekrar deneyin.');
      return;
    }
    newPuzzle();
  })();
}

if (typeof document !== 'undefined' && document.getElementById('board')) init();
