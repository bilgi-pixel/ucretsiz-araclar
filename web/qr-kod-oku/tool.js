// QR Kod Okuyucu — resim dosyası, pano (yapıştır), kamera ve PDF ilk sayfasından QR çözer.
// Tüm işlem tarayıcıda; ne resim ne kamera görüntüsü hiçbir yere gönderilmez.
import { createDropzone, setProgress, showError, loadScript, formatBytes, downloadBlob, getPdfJs, friendlyError, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const progressEl = $('progress');
const errorEl = $('error');
let jsQRLib = null;
let busy = false;
let lastResult = null; // { raw, info }

/* ---------- Kütüphane ---------- */
async function getJsQR() {
  if (jsQRLib) return jsQRLib;
  await loadScript(new URL('../vendor/jsqr@1.4.0/jsQR.js', import.meta.url).href);
  jsQRLib = window.jsQR;
  return jsQRLib;
}

/* ---------- Giriş: dosya / sürükle-bırak / yapıştır ---------- */
createDropzone({
  el: $('drop'),
  accept: 'image/*,.pdf,application/pdf',
  multiple: false,
  onFiles: ([file]) => handleFile(file),
});

// Pano: ekran görüntüsü ya da kopyalanmış resim yapıştırılınca okunur.
document.addEventListener('paste', (e) => {
  const target = e.target;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
  const dt = e.clipboardData;
  if (!dt) return;
  let file = Array.from(dt.files || []).find((f) => /^image\//.test(f.type) || f.type === 'application/pdf');
  if (!file) {
    const item = Array.from(dt.items || []).find((i) => i.kind === 'file' && /^image\//.test(i.type));
    file = item && item.getAsFile();
  }
  if (!file) return;
  e.preventDefault();
  handleFile(file);
});

async function handleFile(file) {
  if (busy) return;
  stopCamera();
  resetResult();
  showError(errorEl, null);
  $('tips').hidden = true;
  $('warn').hidden = true;

  const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
  const isImage = /^image\//.test(file.type) || /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(file.name);
  if (!isPdf && !isImage) {
    showError(errorEl, `"${file.name}" bir resim ya da PDF değil. QR kodun ekran görüntüsünü (PNG/JPG) ya da kodun bulunduğu PDF'i seçin.`);
    return;
  }
  if (/heic|heif/i.test(file.type + file.name)) {
    showError(errorEl, 'HEIC/HEIF fotoğraflar tarayıcıda açılamıyor. iPhone\'da fotoğrafı paylaş > "JPEG olarak kaydet" ile dönüştürün ya da ekran görüntüsü alıp onu seçin.');
    return;
  }
  if (file.size > 50 * 1024 * 1024) {
    $('warn').textContent = `Dosya ${formatBytes(file.size)}; tarama birkaç saniye sürebilir. QR kodu içeren bölgeyi kırpıp daha küçük bir resim seçmek daha hızlı sonuç verir.`;
    $('warn').hidden = false;
  }

  busy = true;
  $('file-name').textContent = `${file.name} · ${formatBytes(file.size)}`;
  try {
    setProgress(progressEl, 5, isPdf ? 'PDF açılıyor…' : 'Resim açılıyor…');
    await tick();
    const src = isPdf ? await loadPdfFirstPage(file) : await loadImage(file);
    const found = await decodeFromSource(src.el, src.width, src.height, (pct, label) => setProgress(progressEl, pct, label));
    setProgress(progressEl, null);
    if (!found) {
      showError(errorEl, 'QR kod bulunamadı. Aşağıdaki ipuçlarını deneyin.');
      $('tips').hidden = false;
      return;
    }
    renderResult(found.data, { multiple: found.multiple, source: isPdf ? 'PDF ilk sayfası' : file.name });
  } catch (err) {
    console.error(err);
    setProgress(progressEl, null);
    showError(errorEl, isPdf ? friendlyError(err) : imageError(err));
  } finally {
    busy = false;
  }
}

function imageError(err) {
  const m = String(err && err.message || err);
  if (/decode|Unsupported|not supported|invalid image/i.test(m)) return 'Resim açılamadı; dosya bozuk ya da tarayıcının desteklemediği bir biçimde olabilir. PNG veya JPG olarak kaydedip tekrar deneyin.';
  if (/memory|allocation/i.test(m)) return 'Resim tarayıcı belleği için fazla büyük. QR kodun olduğu bölgeyi kırpıp daha küçük bir resim seçin.';
  return 'Resim işlenirken beklenmeyen bir hata oluştu. Dosyayı PNG olarak kaydedip yeniden deneyin.';
}

/* ---------- Kaynak yükleme ---------- */
async function loadImage(file) {
  // createImageBitmap EXIF yönünü uygular; eski tarayıcılar için Image yedeği.
  if (window.createImageBitmap) {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return { el: bmp, width: bmp.width, height: bmp.height };
    } catch { /* aşağıdaki yedeğe düş */ }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('decode'));
      i.src = url;
    });
    return { el: img, width: img.naturalWidth, height: img.naturalHeight };
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

async function loadPdfFirstPage(file) {
  const pdfjs = await getPdfJs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const page = await doc.getPage(1);
  const base = page.getViewport({ scale: 1 });
  const scale = Math.min(4, 2000 / Math.max(base.width, base.height));
  const vp = page.getViewport({ scale });
  const cv = document.createElement('canvas');
  cv.width = Math.round(vp.width); cv.height = Math.round(vp.height);
  await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
  doc.destroy && doc.destroy();
  return { el: cv, width: cv.width, height: cv.height };
}

/* ---------- Çözme: farklı ölçeklerde + ters çevirerek ---------- */
async function decodeFromSource(src, w, h, onProgress) {
  const jsQR = await getJsQR();
  const maxDim = Math.max(w, h);
  // Önce makul bir ölçek, sonra daha büyük/küçük; büyük fotoğraflarda ayrıntı için 2000'e kadar.
  const targets = [...new Set([Math.min(maxDim, 1000), Math.min(maxDim, 1600), Math.min(maxDim, 600), Math.min(maxDim, 400), Math.min(maxDim, 2400)])];
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  let step = 0;
  for (const target of targets) {
    step++;
    onProgress && onProgress(10 + (step / (targets.length + 1)) * 80, `Taranıyor (${target} px)…`);
    await tick();
    const s = target / maxDim;
    cv.width = Math.max(1, Math.round(w * s)); cv.height = Math.max(1, Math.round(h * s));
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height); // şeffaf PNG için beyaz zemin
    ctx.drawImage(src, 0, 0, cv.width, cv.height);
    const img = ctx.getImageData(0, 0, cv.width, cv.height);
    const code = jsQR(img.data, img.width, img.height, { inversionAttempts: 'attemptBoth' });
    if (code && code.data) {
      const multiple = await hasAnotherCode(jsQR, ctx, cv, code);
      return { data: code.data, multiple };
    }
  }
  // Son çare: orta bölge kırpması (kod ortada küçük kalmış fotoğraflar için).
  if (maxDim > 1200) {
    onProgress && onProgress(95, 'Orta bölge taranıyor…');
    await tick();
    const cw = Math.round(w * 0.6), ch = Math.round(h * 0.6);
    const s = Math.min(1, 1200 / Math.max(cw, ch));
    cv.width = Math.round(cw * s); cv.height = Math.round(ch * s);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.drawImage(src, (w - cw) / 2, (h - ch) / 2, cw, ch, 0, 0, cv.width, cv.height);
    const img = ctx.getImageData(0, 0, cv.width, cv.height);
    const code = jsQR(img.data, img.width, img.height, { inversionAttempts: 'attemptBoth' });
    if (code && code.data) return { data: code.data, multiple: false };
  }
  return null;
}

/** Bulunan kodun alanını beyazlayıp ikinci bir kod var mı diye bakar. */
async function hasAnotherCode(jsQR, ctx, cv, code) {
  try {
    const L = code.location;
    const xs = [L.topLeftCorner.x, L.topRightCorner.x, L.bottomLeftCorner.x, L.bottomRightCorner.x];
    const ys = [L.topLeftCorner.y, L.topRightCorner.y, L.bottomLeftCorner.y, L.bottomRightCorner.y];
    const pad = 8;
    ctx.fillStyle = '#fff';
    ctx.fillRect(Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) - Math.min(...xs) + pad * 2, Math.max(...ys) - Math.min(...ys) + pad * 2);
    await tick();
    const img = ctx.getImageData(0, 0, cv.width, cv.height);
    const other = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    return !!(other && other.data && other.data !== code.data);
  } catch { return false; }
}

/* ---------- Kamera (izole; otomatik başlamaz) ---------- */
let stream = null;
let camTimer = null;
const video = $('cam-video');

async function startCamera() {
  showError(errorEl, null);
  $('tips').hidden = true;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showError(errorEl, 'Tarayıcınız kamera erişimini desteklemiyor ya da sayfa güvenli (https) bağlantıyla açılmadı. Bunun yerine QR kodun fotoğrafını ya da ekran görüntüsünü seçin.');
    return;
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
  } catch (err) {
    showError(errorEl, cameraError(err));
    return;
  }
  resetResult();
  video.srcObject = stream;
  try { await video.play(); } catch { /* bazı tarayıcılar play'i reddeder; akış yine de çizilir */ }
  $('cam-panel').hidden = false;
  $('cam-start').hidden = true;
  $('cam-status').textContent = 'Kamera açık; QR kodu çerçeveye alın. Görüntü yalnızca bu sekmede işlenir, kaydedilmez.';
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const jsQR = await getJsQR();
  camTimer = setInterval(() => {
    if (!stream || video.readyState < 2 || !video.videoWidth) return;
    const s = Math.min(1, 800 / Math.max(video.videoWidth, video.videoHeight));
    cv.width = Math.round(video.videoWidth * s); cv.height = Math.round(video.videoHeight * s);
    ctx.drawImage(video, 0, 0, cv.width, cv.height);
    const img = ctx.getImageData(0, 0, cv.width, cv.height);
    const code = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    if (code && code.data) {
      stopCamera();
      $('file-name').textContent = 'Kameradan okundu';
      renderResult(code.data, { multiple: false, source: 'kamera' });
    }
  }, 200);
}

function stopCamera() {
  if (camTimer) { clearInterval(camTimer); camTimer = null; }
  if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
  video.srcObject = null;
  $('cam-panel').hidden = true;
  $('cam-start').hidden = false;
}

function cameraError(err) {
  const n = err && err.name || '';
  if (n === 'NotAllowedError' || n === 'PermissionDeniedError' || n === 'SecurityError') {
    return 'Kamera izni verilmedi. Adres çubuğundaki kilit/kamera simgesinden bu site için kameraya izin verin ve "Kamerayı aç"a yeniden basın. Kamera görüntüsü yalnızca tarayıcınızda işlenir, hiçbir yere gönderilmez. İsterseniz QR kodun fotoğrafını da seçebilirsiniz.';
  }
  if (n === 'NotFoundError' || n === 'DevicesNotFoundError' || n === 'OverconstrainedError') {
    return 'Bu cihazda kullanılabilir bir kamera bulunamadı. Telefonla fotoğrafını çekip resim olarak seçin ya da ekran görüntüsünü yapıştırın (Ctrl+V).';
  }
  if (n === 'NotReadableError' || n === 'TrackStartError') {
    return 'Kamera başka bir uygulama tarafından kullanılıyor (Zoom, Teams, başka bir sekme). O uygulamayı kapatıp tekrar deneyin.';
  }
  return 'Kamera açılamadı. Sayfayı yenileyip tekrar deneyin ya da QR kodun resmini seçin.';
}

$('cam-start').addEventListener('click', startCamera);
$('cam-stop').addEventListener('click', stopCamera);
window.addEventListener('pagehide', stopCamera);

/* ---------- İçerik türü algılama ---------- */
const SHORTENERS = /^(bit\.ly|tinyurl\.com|t\.co|goo\.gl|cutt\.ly|is\.gd|rb\.gy|shorturl\.at|ow\.ly|buff\.ly|rebrand\.ly|tiny\.cc|s\.id|lnkd\.in|kisa\.link)$/i;

function classify(raw) {
  const t = raw.trim();
  if (/^WIFI:/i.test(t)) return parseWifi(t);
  if (/^BEGIN:VCARD/i.test(t)) return parseVcard(t);
  if (/^MECARD:/i.test(t)) return parseMecard(t);
  if (/^tel:/i.test(t)) return { type: 'tel', label: 'Telefon numarası', main: t.slice(4), href: t, fields: [['Numara', t.slice(4)]] };
  if (/^(sms|smsto|mms|mmsto):/i.test(t)) {
    const body = t.replace(/^(sms|smsto|mms|mmsto):/i, '');
    const [num, ...rest] = body.split(/[:?]/);
    let msg = rest.join(':');
    const q = body.match(/[?&]body=([^&]*)/i); if (q) msg = safeDecode(q[1]);
    return { type: 'sms', label: 'SMS', main: num, href: t, fields: [['Numara', num], ['Mesaj', msg]] };
  }
  if (/^mailto:/i.test(t)) {
    const u = t.slice(7); const [addr, qs] = u.split('?');
    const p = new URLSearchParams(qs || '');
    return { type: 'mailto', label: 'E-posta', main: safeDecode(addr), href: t, fields: [['Alıcı', safeDecode(addr)], ['Konu', p.get('subject') || ''], ['Mesaj', p.get('body') || '']] };
  }
  if (/^MATMSG:/i.test(t)) {
    const g = (k) => (t.match(new RegExp(k + ':([^;]*);', 'i')) || [])[1] || '';
    return { type: 'mailto', label: 'E-posta', main: g('TO'), href: `mailto:${g('TO')}`, fields: [['Alıcı', g('TO')], ['Konu', g('SUB')], ['Mesaj', g('BODY')]] };
  }
  if (/^geo:/i.test(t)) {
    const m = t.match(/^geo:(-?[\d.]+),(-?[\d.]+)/i);
    const lat = m ? m[1] : '', lon = m ? m[2] : '';
    return { type: 'geo', label: 'Konum', main: `${lat}, ${lon}`, href: m ? `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}` : '', openLabel: 'Haritada aç', fields: [['Enlem', lat], ['Boylam', lon]] };
  }
  if (/^https?:\/\//i.test(t) || /^www\./i.test(t)) return parseUrl(t);
  if (/^[a-z][a-z0-9+.-]{1,20}:\/\//i.test(t)) return { type: 'app', label: 'Uygulama bağlantısı', main: t, fields: [['Bağlantı', t]], warn: ['Bu bağlantı bir uygulamayı açmak için tasarlanmış; tarayıcıda açmadan önce hangi uygulama olduğundan emin olun.'] };
  return { type: 'text', label: 'Düz metin', main: t, fields: [] };
}

function safeDecode(s) { try { return decodeURIComponent(String(s).replace(/\+/g, ' ')); } catch { return s; } }

function parseUrl(t) {
  const full = /^www\./i.test(t) ? `https://${t}` : t;
  let u = null;
  try { u = new URL(full); } catch { return { type: 'text', label: 'Düz metin', main: t, fields: [] }; }
  const warn = [];
  const host = u.hostname;
  const isWa = /^(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)$/i.test(host);
  if (u.protocol !== 'https:') warn.push('Bağlantı şifresiz (http). Kişisel bilgi ya da ödeme isteyen bir sayfaysa açmayın.');
  if (SHORTENERS.test(host)) warn.push('Bu bir kısaltılmış bağlantı; gerçek hedef görünmüyor. Açtığınızda adres çubuğunu kontrol edin.');
  if (/^xn--/i.test(host) || /\.xn--/i.test(host)) warn.push('Alan adı uluslararası (punycode) karakter içeriyor; tanıdık bir siteyi taklit ediyor olabilir.');
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) warn.push('Hedef bir alan adı değil, doğrudan IP adresi. Güvenilir kurumlar nadiren IP adresiyle bağlantı paylaşır.');
  if (u.username || u.password) warn.push('Adreste "@" ile gizlenmiş bir kullanıcı adı var; gerçek site "@" işaretinden sonraki kısımdır.');
  const fields = [['Alan adı', host]];
  if (isWa) {
    const num = (u.pathname.match(/\/(\d{6,})/) || [])[1] || '';
    const msg = u.searchParams.get('text') || '';
    if (num) fields.push(['Numara', `+${num}`]);
    if (msg) fields.push(['Hazır mesaj', msg]);
  }
  return { type: isWa ? 'whatsapp' : 'url', label: isWa ? 'WhatsApp bağlantısı' : 'URL', main: u.href, href: u.href, host, fields, warn };
}

/** WIFI:T:WPA;S:ağ;P:şifre;H:true;; — \; \, \: \\ kaçışlarını çözer. */
function parseWifi(t) {
  const body = t.slice(5);
  const out = {};
  let key = '', val = '', inVal = false;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === '\\' && i + 1 < body.length) { (inVal ? (val += body[++i]) : (key += body[++i])); continue; }
    if (!inVal && c === ':') { inVal = true; continue; }
    if (c === ';') { if (key) out[key.toUpperCase()] = val; key = ''; val = ''; inVal = false; continue; }
    if (inVal) val += c; else key += c;
  }
  if (key) out[key.toUpperCase()] = val;
  const enc = (out.T || 'nopass').toUpperCase();
  const encLabel = enc === 'NOPASS' || enc === '' ? 'Açık ağ (şifresiz)' : enc === 'WEP' ? 'WEP' : enc === 'SAE' ? 'WPA3' : 'WPA/WPA2';
  const fields = [['Ağ adı (SSID)', out.S || ''], ['Güvenlik', encLabel]];
  if (out.P) fields.push(['Şifre', out.P, 'secret']);
  if (/^true$/i.test(out.H || '')) fields.push(['Gizli ağ', 'Evet']);
  return { type: 'wifi', label: 'Wi-Fi ağı', main: out.S || '', fields, password: out.P || '' };
}

function vUnescape(s) { return s.replace(/\\n/gi, '\n').replace(/\\([;,\\])/g, '$1'); }

function parseVcard(t) {
  const lines = t.replace(/\r\n?/g, '\n').replace(/\n[ \t]/g, '').split('\n');
  const get = {};
  for (const line of lines) {
    const idx = line.indexOf(':'); if (idx < 1) continue;
    const keyPart = line.slice(0, idx).toUpperCase();
    const key = keyPart.split(';')[0].replace(/^ITEM\d+\./, '');
    const val = line.slice(idx + 1);
    if (!(key in get)) get[key] = [];
    get[key].push({ params: keyPart, val });
  }
  const first = (k) => (get[k] && get[k][0] ? vUnescape(get[k][0].val) : '');
  let name = first('FN');
  if (!name && get.N) { const p = get.N[0].val.split(';'); name = [p[1], p[0]].filter(Boolean).join(' '); }
  const fields = [['Ad soyad', name]];
  if (get.ORG) fields.push(['Şirket', first('ORG').replace(/;$/, '')]);
  if (get.TITLE) fields.push(['Unvan', first('TITLE')]);
  (get.TEL || []).forEach((x, i) => fields.push([i ? `Telefon ${i + 1}` : 'Telefon', x.val.replace(/^tel:/i, '')]));
  (get.EMAIL || []).forEach((x, i) => fields.push([i ? `E-posta ${i + 1}` : 'E-posta', x.val]));
  if (get.URL) fields.push(['Web', first('URL')]);
  if (get.ADR) fields.push(['Adres', get.ADR[0].val.split(';').map(vUnescape).filter(Boolean).join(', ')]);
  if (get.NOTE) fields.push(['Not', first('NOTE')]);
  return { type: 'vcard', label: 'Kartvizit (vCard)', main: name || 'Kartvizit', fields, vcf: t, vcfName: name };
}

function parseMecard(t) {
  const body = t.slice(7);
  const g = (k) => { const m = body.match(new RegExp('(?:^|;)' + k + ':([^;]*)', 'i')); return m ? m[1].replace(/\\(.)/g, '$1') : ''; };
  const name = g('N').split(',').reverse().join(' ').trim();
  const fields = [['Ad soyad', name]];
  if (g('ORG')) fields.push(['Şirket', g('ORG')]);
  if (g('TEL')) fields.push(['Telefon', g('TEL')]);
  if (g('EMAIL')) fields.push(['E-posta', g('EMAIL')]);
  if (g('URL')) fields.push(['Web', g('URL')]);
  if (g('ADR')) fields.push(['Adres', g('ADR')]);
  const vcf = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${name}`, g('ORG') && `ORG:${g('ORG')}`, g('TEL') && `TEL:${g('TEL')}`, g('EMAIL') && `EMAIL:${g('EMAIL')}`, g('URL') && `URL:${g('URL')}`, g('ADR') && `ADR:;;${g('ADR')};;;;`, 'END:VCARD'].filter(Boolean).join('\r\n');
  return { type: 'vcard', label: 'Kartvizit (MeCard)', main: name || 'Kartvizit', fields, vcf, vcfName: name };
}

/* ---------- Sonuç gösterimi ---------- */
function resetResult() {
  lastResult = null;
  const r = $('result');
  r.classList.remove('is-active');
  r.dataset.type = '';
  $('result-fields').innerHTML = '';
  $('result-warn').hidden = true; $('result-warn').innerHTML = '';
  $('multi-warn').hidden = true;
  $('copy-status').textContent = '';
}

function renderResult(raw, { multiple, source }) {
  resetResult();
  const info = classify(raw);
  lastResult = { raw, info };
  const r = $('result');
  r.dataset.type = info.type;
  $('result-type').textContent = info.label;
  $('result-source').textContent = source ? `Kaynak: ${source}` : '';
  $('result-main').textContent = info.main;
  $('result-raw').textContent = raw;
  $('raw-wrap').open = info.type === 'text';

  // Alanlar
  const dl = $('result-fields');
  for (const [k, v, kind] of info.fields) {
    if (!v) continue;
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd');
    if (kind === 'secret') {
      const span = document.createElement('span'); span.id = 'wifi-pass'; span.className = 'qr-secret'; span.dataset.value = v; span.dataset.shown = '0'; span.textContent = '•'.repeat(Math.min(12, Math.max(6, v.length)));
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ba-btn qr-mini'; btn.id = 'pass-toggle'; btn.textContent = 'Göster'; btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        const shown = span.dataset.shown === '1';
        span.textContent = shown ? '•'.repeat(Math.min(12, Math.max(6, v.length))) : v;
        span.dataset.shown = shown ? '0' : '1';
        btn.textContent = shown ? 'Göster' : 'Gizle';
        btn.setAttribute('aria-pressed', shown ? 'false' : 'true');
      });
      const cp = document.createElement('button'); cp.type = 'button'; cp.className = 'ba-btn qr-mini'; cp.id = 'copy-pass'; cp.textContent = 'Şifreyi kopyala';
      cp.addEventListener('click', () => copyText(v, 'Wi-Fi şifresi kopyalandı.'));
      dd.append(span, ' ', btn, ' ', cp);
    } else {
      dd.textContent = v;
    }
    dl.append(dt, dd);
  }

  // Aç bağlantısı: yalnızca kullanıcı tıklarsa, yeni sekmede, noopener. Otomatik yönlendirme yok.
  const open = $('open-link');
  if (info.href) {
    open.href = info.href;
    open.textContent = info.openLabel || (info.type === 'url' ? 'Bağlantıyı aç' : info.type === 'whatsapp' ? 'WhatsApp\'ta aç' : info.type === 'tel' ? 'Ara' : info.type === 'sms' ? 'SMS yaz' : info.type === 'mailto' ? 'E-posta yaz' : 'Aç');
    open.hidden = false;
  } else { open.hidden = true; open.removeAttribute('href'); }

  $('download-vcf').hidden = info.type !== 'vcard';

  // Uyarılar
  const warns = [...(info.warn || [])];
  if (info.type === 'url' || info.type === 'whatsapp') warns.unshift(`Açmadan önce alan adını kontrol edin: <strong>${escapeHtml(info.host)}</strong>. Tanımadığınız bir adresse ya da kod bir afişe sonradan yapıştırılmış görünüyorsa açmayın; şifre, kart bilgisi veya SMS kodu istenirse kapatın.`);
  if (warns.length) { $('result-warn').innerHTML = warns.map((w) => `<li>${w.startsWith('Açmadan') ? w : escapeHtml(w)}</li>`).join(''); $('result-warn').hidden = false; }
  $('multi-warn').hidden = !multiple;

  r.classList.add('is-active');
  r.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

/* ---------- Eylemler ---------- */
async function copyText(text, okMsg) {
  const status = $('copy-status');
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
    else {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    status.textContent = okMsg;
  } catch {
    status.textContent = 'Kopyalanamadı; metni aşağıdaki "Ham içerik" kutusundan seçip kopyalayın.';
    $('raw-wrap').open = true;
  }
  setTimeout(() => { status.textContent = ''; }, 5000);
}

$('copy').addEventListener('click', () => {
  if (!lastResult) return;
  const { raw, info } = lastResult;
  copyText(info.type === 'url' || info.type === 'whatsapp' ? info.href : raw, 'Kopyalandı.');
});

$('download-vcf').addEventListener('click', () => {
  if (!lastResult || lastResult.info.type !== 'vcard') return;
  const name = (lastResult.info.vcfName || 'kartvizit').toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'kartvizit';
  downloadBlob(new Blob([lastResult.info.vcf], { type: 'text/vcard;charset=utf-8' }), `${name}.vcf`);
});

$('clear').addEventListener('click', () => {
  stopCamera();
  resetResult();
  showError(errorEl, null);
  $('tips').hidden = true;
  $('warn').hidden = true;
  $('file-name').textContent = '';
});
