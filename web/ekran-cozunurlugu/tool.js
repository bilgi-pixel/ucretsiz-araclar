// Ekran Çözünürlüğü ve Tarayıcı Bilgisi — tüm değerler yalnızca bu sayfada gösterilir, hiçbir şey gönderilmez.
const $ = (id) => document.getElementById(id);

/** userAgent'tan basit tarayıcı adı ve sürümü çıkarır (sıra önemli: Edge/Opera Chrome gibi görünür). */
export function parseBrowser(ua) {
  const rules = [
    [/Edg(?:e|A|iOS)?\/([\d.]+)/, 'Microsoft Edge'],
    [/OPR\/([\d.]+)/, 'Opera'],
    [/SamsungBrowser\/([\d.]+)/, 'Samsung Internet'],
    [/(?:Firefox|FxiOS)\/([\d.]+)/, 'Firefox'],
    [/(?:Chrome|CriOS)\/([\d.]+)/, 'Chrome'],
    [/Version\/([\d.]+).*Safari/, 'Safari'],
  ];
  for (const [re, name] of rules) {
    const m = ua.match(re);
    if (m) return `${name} ${m[1].split('.')[0]}`;
  }
  return 'Bilinmiyor';
}

/** userAgent'tan basit işletim sistemi adı çıkarır. */
export function parseOS(ua) {
  if (/Windows NT 10/.test(ua)) return 'Windows 10 / 11';
  if (/Windows NT 6\.3/.test(ua)) return 'Windows 8.1';
  if (/Windows NT 6\.1/.test(ua)) return 'Windows 7';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Android ([\d.]+)/.test(ua)) return 'Android ' + ua.match(/Android ([\d.]+)/)[1];
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS / iPadOS';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/CrOS/.test(ua)) return 'ChromeOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Bilinmiyor';
}

/** En büyük ortak bölenle en-boy oranını sadeleştirir. */
export function simplifyRatio(w, h) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const g = gcd(w, h);
  return [w / g, h / g];
}

/** Sadeleşmiş oran çirkinse (ör. 683:384) bilinen yakın oranı döndürür. */
export function friendlyRatio(w, h) {
  const [a, b] = simplifyRatio(w, h);
  if (a <= 32 && b <= 32) return `${a}:${b}`;
  const known = [[16, 9], [16, 10], [4, 3], [3, 2], [21, 9], [32, 9], [5, 4], [1, 1], [9, 16], [10, 16], [3, 4], [2, 3], [9, 21]];
  const r = w / h;
  let best = null;
  let bestDiff = Infinity;
  for (const k of known) {
    const d = Math.abs(r - k[0] / k[1]);
    if (d < bestDiff) { bestDiff = d; best = k; }
  }
  return bestDiff < 0.02 ? `≈ ${best[0]}:${best[1]}` : `${a}:${b}`;
}

const rows = {};
function setRow(id, text) { rows[id] = text; const el = $(id); if (el) el.textContent = text; }

function orientText(t) {
  const land = t.startsWith('landscape');
  return `${land ? 'Yatay' : 'Dikey'} (${t})`;
}

function readViewport() {
  const dpr = window.devicePixelRatio || 1;
  setRow('v-viewport', `${window.innerWidth} × ${window.innerHeight} piksel`);
  setRow('v-dpr', String(Math.round(dpr * 100) / 100));
  setRow('v-physical', `${Math.round(screen.width * dpr)} × ${Math.round(screen.height * dpr)} piksel`);
  setRow('v-orient', (screen.orientation && screen.orientation.type) ? orientText(screen.orientation.type) : (window.innerWidth >= window.innerHeight ? 'Yatay' : 'Dikey'));
  updatePpi();
}

function readStatic() {
  const ua = navigator.userAgent;
  setRow('v-screen', `${screen.width} × ${screen.height} piksel`);
  setRow('v-avail', `${screen.availWidth} × ${screen.availHeight} piksel`);
  setRow('v-depth', `${screen.colorDepth} bit`);
  setRow('v-browser', parseBrowser(ua));
  setRow('v-os', parseOS(ua));
  const pts = navigator.maxTouchPoints || 0;
  setRow('v-touch', pts > 0 ? `Var (en çok ${pts} dokunma noktası)` : 'Yok');
  setRow('v-lang', navigator.language || '—');
  let tz = '—';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '—'; } catch (e) { /* desteklenmiyor */ }
  setRow('v-tz', tz);
  readOnline();
}

function readOnline() { setRow('v-online', navigator.onLine ? 'Çevrimiçi' : 'Çevrimdışı'); }

// ---- Ekran boyutu / PPI tahmini -------------------------------------------------
function updatePpi() {
  const inch = parseFloat(String($('inch').value).replace(',', '.'));
  const out = $('ppi-out');
  if (!inch || inch < 3 || inch > 120) {
    out.textContent = 'Ekranın köşegen ölçüsünü inç olarak girerseniz yaklaşık PPI ve fiziksel boyut hesaplanır.';
    setRow('v-ppi', 'Hesaplanmadı (inç girin)');
    return;
  }
  const dpr = window.devicePixelRatio || 1;
  const pw = screen.width * dpr;
  const ph = screen.height * dpr;
  const diag = Math.hypot(pw, ph);
  const ppi = diag / inch;
  const cmW = (pw / diag) * inch * 2.54;
  const cmH = (ph / diag) * inch * 2.54;
  const text = `Yaklaşık ${Math.round(ppi)} PPI · ekran ≈ ${cmW.toFixed(1)} × ${cmH.toFixed(1)} cm`;
  out.textContent = text + ' (fiziksel piksel esas alınır; tarayıcı ölçeklemesi tahmini değiştirebilir)';
  setRow('v-ppi', text);
}

// ---- Yenileme hızı tahmini ------------------------------------------------------
function estimateRefresh() {
  const btn = $('hz-measure');
  btn.disabled = true;
  setRow('v-hz', 'Ölçülüyor…');
  const times = [];
  const stopAt = performance.now() + 1200;
  function frame(t) {
    times.push(t);
    if (t < stopAt) { requestAnimationFrame(frame); return; }
    const deltas = [];
    for (let i = 2; i < times.length; i++) deltas.push(times[i] - times[i - 1]);
    if (!deltas.length) { setRow('v-hz', 'Ölçülemedi; sekme arka planda olabilir, tekrar deneyin'); btn.disabled = false; return; }
    deltas.sort((a, b) => a - b);
    const med = deltas[Math.floor(deltas.length / 2)];
    const raw = 1000 / med;
    const common = [24, 30, 48, 50, 60, 72, 75, 90, 100, 120, 144, 165, 180, 240, 360];
    let near = common[0];
    for (const c of common) if (Math.abs(c - raw) < Math.abs(near - raw)) near = c;
    setRow('v-hz', `≈ ${near} Hz (ölçülen ${raw.toFixed(1)})`);
    btn.disabled = false;
  }
  requestAnimationFrame(frame);
}

// ---- En-boy oranı hesaplayıcı ---------------------------------------------------
function updateRatio() {
  const w = parseInt($('rw').value, 10);
  const h = parseInt($('rh').value, 10);
  const out = $('ratio-out');
  const err = $('ratio-error');
  err.textContent = '';
  if (!w || !h || w < 1 || h < 1) {
    out.textContent = '—';
    if ($('rw').value || $('rh').value) err.textContent = 'Genişlik ve yüksekliği 0\'dan büyük tam sayı olarak girin (ör. 1920 ve 1080).';
    return;
  }
  const ratio = friendlyRatio(w, h);
  const mp = ((w * h) / 1e6).toFixed(2);
  out.textContent = `${ratio}  (${w} × ${h} = ${mp} megapiksel)`;
}

// ---- Kopyala --------------------------------------------------------------------
function buildSummary() {
  const label = {
    'v-screen': 'Ekran çözünürlüğü', 'v-avail': 'Kullanılabilir alan', 'v-viewport': 'Tarayıcı görünüm alanı',
    'v-dpr': 'Piksel oranı (devicePixelRatio)', 'v-physical': 'Tahmini fiziksel çözünürlük', 'v-depth': 'Renk derinliği',
    'v-orient': 'Ekran yönü', 'v-ppi': 'Ekran boyutu / PPI', 'v-hz': 'Yenileme hızı', 'v-browser': 'Tarayıcı',
    'v-os': 'İşletim sistemi', 'v-touch': 'Dokunmatik', 'v-lang': 'Dil', 'v-tz': 'Saat dilimi', 'v-online': 'Bağlantı',
  };
  return Object.keys(label).map((k) => `${label[k]}: ${rows[k] ?? $(k).textContent}`).join('\n');
}

async function copySummary() {
  const status = $('copy-status');
  const text = buildSummary();
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'Bilgiler panoya kopyalandı.';
  } catch (e) {
    // Pano izni yoksa eski yöntemle dene
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
    ta.remove();
    status.textContent = ok ? 'Bilgiler panoya kopyalandı.' : 'Kopyalanamadı. Tarayıcı pano iznini engelliyor olabilir; tabloyu elle seçip kopyalayın.';
  }
}

readStatic();
readViewport();
$('inch').addEventListener('input', updatePpi);
$('hz-measure').addEventListener('click', estimateRefresh);
$('copy-btn').addEventListener('click', copySummary);
['rw', 'rh'].forEach((id) => $(id).addEventListener('input', updateRatio));
$('use-screen').addEventListener('click', () => { $('rw').value = screen.width; $('rh').value = screen.height; updateRatio(); });
window.addEventListener('resize', readViewport);
window.addEventListener('online', readOnline);
window.addEventListener('offline', readOnline);
if (screen.orientation) screen.orientation.addEventListener('change', readViewport);
estimateRefresh();
