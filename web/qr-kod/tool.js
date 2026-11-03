import { createDropzone, downloadBlob, showError, loadScript, formatBytes } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const canvas = $('qr-canvas');
let QR = null;            // vendor/qrcode global
let logoImg = null;       // HTMLImageElement | null
let logoDataUrl = null;   // SVG'ye gömmek için
let currentText = '';     // son başarılı payload
let renderTimer = null;

/* ---------- Kütüphane ---------- */
async function getQr() {
  if (QR) return QR;
  await loadScript(new URL('../vendor/qrcode@1.5.1/qrcode.min.js', import.meta.url).href);
  QR = window.QRCode;
  return QR;
}

/* ---------- Tür seçimi ---------- */
const typeSel = $('qr-type');
function showType() {
  const t = typeSel.value;
  document.querySelectorAll('[data-type]').forEach((el) => { el.hidden = el.dataset.type !== t; });
  scheduleRender();
}
typeSel.addEventListener('change', showType);

/* ---------- Yük (payload) üreticileri ---------- */
const v = (id) => ($(id).value || '').trim();
const wifiEscape = (s) => s.replace(/([\\;,":])/g, '\\$1');
const vcardEscape = (s) => s.replace(/([\\;,])/g, '\\$1').replace(/\n/g, '\\n');
/** Telefonu wa.me biçimine çevirir: boşluk/çizgi atılır, baştaki 0 → 90, + atılır. */
function normalizePhone(raw) {
  let d = raw.replace(/[^\d+]/g, '');
  if (d.startsWith('+')) d = d.slice(1);
  else if (d.startsWith('00')) d = d.slice(2);
  else if (d.startsWith('0')) d = '90' + d.slice(1);
  else if (d.length === 10 && d.startsWith('5')) d = '90' + d;
  return d;
}

function buildPayload() {
  switch (typeSel.value) {
    case 'url': {
      const t = v('f-url');
      if (!t) return { empty: true, hint: 'Bir web adresi ya da metin yazın; QR kod anında oluşur.' };
      return { text: t };
    }
    case 'wifi': {
      const ssid = v('f-wifi-ssid');
      if (!ssid) return { empty: true, hint: 'Ağ adını (SSID) yazın; kod anında oluşur.' };
      const enc = $('f-wifi-enc').value;
      const pass = v('f-wifi-pass');
      if (enc !== 'nopass' && !pass) return { error: 'Şifreli ağ için şifreyi girin ya da güvenliği "Açık ağ" yapın.' };
      const hidden = $('f-wifi-hidden').checked ? 'H:true;' : '';
      const p = enc === 'nopass' ? '' : `P:${wifiEscape(pass)};`;
      return { text: `WIFI:T:${enc};S:${wifiEscape(ssid)};${p}${hidden};` };
    }
    case 'vcard': {
      const name = v('f-vc-name');
      if (!name) return { empty: true, hint: 'Ad soyad yazın; kartvizit kodu anında oluşur.' };
      const parts = name.split(/\s+/);
      const last = parts.length > 1 ? parts.pop() : '';
      const first = parts.join(' ');
      const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${vcardEscape(last)};${vcardEscape(first)};;;`, `FN:${vcardEscape(name)}`];
      if (v('f-vc-org')) lines.push(`ORG:${vcardEscape(v('f-vc-org'))}`);
      if (v('f-vc-title')) lines.push(`TITLE:${vcardEscape(v('f-vc-title'))}`);
      if (v('f-vc-tel')) lines.push(`TEL;TYPE=CELL:${v('f-vc-tel')}`);
      if (v('f-vc-email')) lines.push(`EMAIL:${v('f-vc-email')}`);
      if (v('f-vc-url')) lines.push(`URL:${v('f-vc-url')}`);
      if (v('f-vc-adr')) lines.push(`ADR;TYPE=WORK:;;${vcardEscape(v('f-vc-adr'))};;;;`);
      lines.push('END:VCARD');
      return { text: lines.join('\n') };
    }
    case 'email': {
      const to = v('f-em-to');
      if (!to) return { empty: true, hint: 'Alıcı e-posta adresini yazın.' };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return { error: 'E-posta adresi geçersiz görünüyor. Örnek: ad@firma.com' };
      const q = new URLSearchParams();
      if (v('f-em-subject')) q.set('subject', v('f-em-subject'));
      if (v('f-em-body')) q.set('body', v('f-em-body'));
      const qs = q.toString().replace(/\+/g, '%20');
      return { text: `mailto:${to}${qs ? '?' + qs : ''}` };
    }
    case 'sms': {
      const tel = v('f-sms-tel');
      if (!tel) return { empty: true, hint: 'Telefon numarasını yazın.' };
      return { text: `SMSTO:${tel.replace(/[^\d+]/g, '')}:${v('f-sms-body')}` };
    }
    case 'tel': {
      const tel = v('f-tel');
      if (!tel) return { empty: true, hint: 'Telefon numarasını yazın; örn. +90 212 000 00 00' };
      return { text: `tel:${tel.replace(/[^\d+]/g, '')}` };
    }
    case 'whatsapp': {
      const tel = v('f-wa-tel');
      if (!tel) return { empty: true, hint: 'WhatsApp numarasını ülke koduyla yazın; örn. 0532 000 00 00' };
      const num = normalizePhone(tel);
      if (num.length < 10) return { error: 'Numara eksik görünüyor. Ülke koduyla birlikte yazın: +90 532 000 00 00' };
      const msg = v('f-wa-msg');
      return { text: `https://wa.me/${num}${msg ? '?text=' + encodeURIComponent(msg) : ''}` };
    }
  }
  return { empty: true };
}

/* ---------- Renk / kontrast ---------- */
function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16 & 255, n >> 8 & 255, n & 255].map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrastCheck(dark, light) {
  const ld = luminance(dark), ll = luminance(light);
  const ratio = (Math.max(ld, ll) + 0.05) / (Math.min(ld, ll) + 0.05);
  const warn = $('warn-contrast');
  if (ld > ll) { warn.textContent = 'Ön plan arka plandan daha açık: ters (negatif) QR kodları çoğu telefon okuyamaz. Koyu desen, açık zemin kullanın.'; warn.hidden = false; }
  else if (ratio < 4) { warn.textContent = `Kontrast düşük (${ratio.toFixed(1)}:1). Güvenli okuma için en az 4:1 önerilir; daha koyu bir ön plan ya da daha açık bir arka plan seçin.`; warn.hidden = false; }
  else warn.hidden = true;
}

/* ---------- Çizim ---------- */
function opts() {
  return {
    size: Number($('opt-size').value),
    margin: Number($('opt-margin').value),
    ecl: $('opt-ecl').value,
    dark: $('opt-fg').value,
    light: $('opt-bg').value,
  };
}

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 120);
}

async function render() {
  const out = buildPayload();
  const o = opts();
  showError($('error'), null);
  contrastCheck(o.dark, o.light);
  $('warn-logo').hidden = !(logoImg && o.ecl !== 'H');
  if (out.error) { setReady(false); showError($('error'), out.error); return; }
  if (out.empty) { setReady(false, out.hint); return; }
  try {
    const qr = await getQr();
    await qr.toCanvas(canvas, out.text, { width: o.size, margin: o.margin, errorCorrectionLevel: o.ecl, color: { dark: o.dark, light: o.light } });
    if (logoImg) drawLogo(canvas, o);
    currentText = out.text;
    const seg = qr.create(out.text, { errorCorrectionLevel: o.ecl });
    $('qr-info').textContent = `${out.text.length} karakter · sürüm ${seg.version} (${seg.modules.size}×${seg.modules.size} modül) · hata düzeltme ${o.ecl}`;
    setReady(true);
  } catch (err) {
    console.error(err);
    setReady(false);
    showError($('error'), friendlyQrError(err));
  }
}

function friendlyQrError(err) {
  const m = String(err && err.message || err);
  if (/too big|exceeds|overflow/i.test(m)) return 'Metin bu QR kod için fazla uzun. Metni kısaltın, hata düzeltme seviyesini "L" yapın ya da uzun içerik için bir web bağlantısı kullanın.';
  if (/Invalid hex color|color/i.test(m)) return 'Renk değeri geçersiz. Renk seçicilerden yeniden seçin.';
  return 'QR kod oluşturulamadı. Girdiyi kontrol edip tekrar deneyin.';
}

/** Logoyu ortaya, arka plan renginde bir yastık üstüne çizer (~%22 genişlik). */
function drawLogo(cv, o) {
  const ctx = cv.getContext('2d');
  const w = Math.round(cv.width * 0.22);
  const ar = logoImg.naturalWidth / logoImg.naturalHeight || 1;
  const lw = ar >= 1 ? w : Math.round(w * ar), lh = ar >= 1 ? Math.round(w / ar) : w;
  const pad = Math.round(w * 0.12);
  const x = (cv.width - lw) / 2, y = (cv.height - lh) / 2;
  ctx.fillStyle = o.light;
  roundRect(ctx, x - pad, y - pad, lw + pad * 2, lh + pad * 2, pad);
  ctx.fill();
  ctx.drawImage(logoImg, x, y, lw, lh);
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function setReady(ready, hint = '') {
  $('preview').classList.toggle('is-ready', ready);
  $('preview-hint').textContent = ready ? '' : hint;
  $('preview-hint').hidden = ready;
  $('actions').hidden = !ready;
  $('qr-info').hidden = !ready;
  canvas.hidden = !ready;
  canvas.dataset.ready = ready ? '1' : '0';
}

/* ---------- SVG ---------- */
async function buildSvg() {
  const qr = await getQr();
  const o = opts();
  let svg = await qr.toString(currentText, { type: 'svg', margin: o.margin, width: o.size, errorCorrectionLevel: o.ecl, color: { dark: o.dark, light: o.light } });
  if (logoImg && logoDataUrl) {
    const m = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
    const vb = m ? Number(m[1]) : 0;
    if (vb) {
      const w = vb * 0.22;
      const ar = logoImg.naturalWidth / logoImg.naturalHeight || 1;
      const lw = ar >= 1 ? w : w * ar, lh = ar >= 1 ? w / ar : w;
      const pad = w * 0.12;
      const x = (vb - lw) / 2, y = (vb - lh) / 2;
      const f = (n) => n.toFixed(3);
      const extra = `<rect x="${f(x - pad)}" y="${f(y - pad)}" width="${f(lw + pad * 2)}" height="${f(lh + pad * 2)}" rx="${f(pad)}" fill="${o.light}"/>` +
        `<image x="${f(x)}" y="${f(y)}" width="${f(lw)}" height="${f(lh)}" href="${logoDataUrl}" preserveAspectRatio="xMidYMid meet"/>`;
      svg = svg.replace(/<\/svg>\s*$/, `${extra}</svg>`);
    }
  }
  return svg;
}

/* ---------- Dosya adı ---------- */
function fileBase() {
  const t = typeSel.value;
  const raw = t === 'wifi' ? v('f-wifi-ssid') : t === 'vcard' ? v('f-vc-name') : t === 'url' ? v('f-url').replace(/^https?:\/\//, '').split(/[/?#]/)[0] : '';
  const slug = raw.toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  return slug ? `qr-${slug}` : 'qr-kod';
}

/* ---------- Eylemler ---------- */
$('download-png').addEventListener('click', () => {
  if (!currentText) return;
  canvas.toBlob((blob) => { if (blob) downloadBlob(blob, `${fileBase()}.png`); }, 'image/png');
});

$('download-svg').addEventListener('click', async () => {
  if (!currentText) return;
  try {
    const svg = await buildSvg();
    downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `${fileBase()}.svg`);
  } catch (err) { console.error(err); showError($('error'), 'SVG oluşturulamadı. PNG indirmeyi deneyin.'); }
});

$('copy').addEventListener('click', async () => {
  if (!currentText) return;
  const status = $('copy-status');
  try {
    if (!navigator.clipboard || !window.ClipboardItem) throw new Error('unsupported');
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    status.textContent = 'Kopyalandı; Word, WhatsApp ya da e-postaya yapıştırabilirsiniz.';
  } catch {
    status.textContent = 'Tarayıcınız görsel kopyalamayı desteklemiyor; "PNG indir" düğmesini kullanın.';
  }
  setTimeout(() => { status.textContent = ''; }, 5000);
});

/* ---------- Logo ---------- */
createDropzone({ el: $('logo-drop'), accept: 'image/png,image/jpeg,image/svg+xml,image/webp', multiple: false, onFiles: ([file]) => setLogo(file) });
function setLogo(file) {
  if (!/^image\/(png|jpeg|svg\+xml|webp)$/.test(file.type)) { showError($('error'), 'Logo için PNG, JPG, SVG veya WebP seçin.'); return; }
  if (file.size > 2 * 1024 * 1024) { showError($('error'), `Logo ${formatBytes(file.size)}; 2 MB altında bir görsel seçin, QR dosyası gereksiz büyümesin.`); return; }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      logoImg = img; logoDataUrl = reader.result;
      $('logo-name').textContent = file.name;
      $('logo-remove').hidden = false;
      if ($('opt-ecl').value !== 'H') $('opt-ecl').value = 'H';
      scheduleRender();
    };
    img.onerror = () => showError($('error'), 'Logo görseli açılamadı. Başka bir dosya deneyin.');
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
$('logo-remove').addEventListener('click', () => {
  logoImg = null; logoDataUrl = null;
  $('logo-name').textContent = '';
  $('logo-remove').hidden = true;
  scheduleRender();
});

/* ---------- Canlı önizleme ---------- */
document.querySelectorAll('.ba-tool input, .ba-tool select, .ba-tool textarea').forEach((el) => {
  if (el.type === 'file') return;
  el.addEventListener('input', scheduleRender);
  el.addEventListener('change', scheduleRender);
});

showType();
