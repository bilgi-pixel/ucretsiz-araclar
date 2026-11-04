// Wi-Fi, vCard, e-posta, SMS, konum, takvim ve metin QR kodu.
// Tüm işlem tarayıcıda yapılır; parola ve kişi bilgileri hiçbir yere gönderilmez.
import { downloadBlob, showError, loadScript } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const canvas = $('qr-canvas');
let QR = null;
let currentText = '';
let renderTimer = null;
let currentTab = 'wifi';

async function getQr() {
  if (QR) return QR;
  await loadScript(new URL('../vendor/qrcode@1.5.1/qrcode.min.js', import.meta.url).href);
  QR = window.QRCode;
  return QR;
}

const v = (id) => ($(id).value || '').trim();
/** Wi-Fi biçiminde özel karakterler ters eğik çizgiyle kaçırılır: \ ; , " : */
const wifiEscape = (s) => s.replace(/([\\;,":])/g, '\\$1');
const vcardEscape = (s) => s.replace(/([\\;,])/g, '\\$1').replace(/\r?\n/g, '\\n');
const icsEscape = (s) => s.replace(/([\\;,])/g, '\\$1').replace(/\r?\n/g, '\\n');

/** datetime-local değerini (2026-05-01T14:30) iCalendar biçimine (20260501T143000) çevirir. */
function icsDate(val) { return val.replace(/[-:]/g, '').padEnd(15, '0').slice(0, 15); }

/** Seçili sekmeye göre QR metnini üretir. */
function buildPayload() {
  switch (currentTab) {
    case 'wifi': {
      const ssid = $('f-wifi-ssid').value; // SSID'de baştaki/sondaki boşluk anlamlı olabilir
      if (!ssid.trim()) return { empty: true, hint: 'Ağ adını (SSID) yazın; kod anında oluşur.' };
      const enc = $('f-wifi-enc').value;
      const pass = $('f-wifi-pass').value;
      if (enc !== 'nopass' && !pass) return { error: 'Şifreli ağ için parolayı girin ya da güvenliği "Açık ağ" yapın.' };
      if (enc === 'WPA' && pass.length < 8) return { error: 'WPA parolası en az 8 karakter olmalıdır. Parolayı kontrol edin.' };
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
      if (v('f-vc-email')) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('f-vc-email'))) return { error: 'E-posta adresi geçersiz görünüyor. Örnek: ad@firma.com' };
        lines.push(`EMAIL;TYPE=INTERNET:${v('f-vc-email')}`);
      }
      if (v('f-vc-url')) lines.push(`URL:${v('f-vc-url')}`);
      if (v('f-vc-adr')) lines.push(`ADR;TYPE=WORK:;;${vcardEscape(v('f-vc-adr'))};;;;`);
      lines.push('END:VCARD');
      return { text: lines.join('\n') };
    }
    case 'email': {
      const to = v('f-em-to');
      if (!to) return { empty: true, hint: 'Alıcı e-posta adresini yazın.' };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return { error: 'E-posta adresi geçersiz görünüyor. Örnek: ad@firma.com' };
      const q = [];
      if (v('f-em-subject')) q.push(`subject=${encodeURIComponent(v('f-em-subject'))}`);
      if (v('f-em-body')) q.push(`body=${encodeURIComponent(v('f-em-body'))}`);
      return { text: `mailto:${to}${q.length ? '?' + q.join('&') : ''}` };
    }
    case 'sms': {
      const tel = v('f-sms-tel');
      if (!tel) return { empty: true, hint: 'Telefon numarasını yazın.' };
      const num = tel.replace(/[^\d+]/g, '');
      if (num.replace(/\D/g, '').length < 7) return { error: 'Telefon numarası eksik görünüyor. Alan koduyla birlikte yazın: +90 532 000 00 00' };
      return { text: `SMSTO:${num}:${v('f-sms-body')}` };
    }
    case 'geo': {
      const lat = v('f-geo-lat').replace(',', '.');
      const lon = v('f-geo-lon').replace(',', '.');
      if (!lat && !lon) return { empty: true, hint: 'Enlem ve boylamı yazın; örn. 37.9144 ve 40.2306.' };
      const la = Number(lat), lo = Number(lon);
      if (!lat || !lon || Number.isNaN(la) || Number.isNaN(lo)) return { error: 'Enlem ve boylam sayı olmalıdır. Örnek: 37.9144 ve 40.2306 (ondalık için nokta kullanın).' };
      if (la < -90 || la > 90) return { error: 'Enlem -90 ile 90 arasında olmalıdır. Enlem ile boylam yer değiştirmiş olabilir.' };
      if (lo < -180 || lo > 180) return { error: 'Boylam -180 ile 180 arasında olmalıdır.' };
      return { text: `geo:${la},${lo}` };
    }
    case 'event': {
      const title = v('f-ev-title');
      if (!title) return { empty: true, hint: 'Etkinlik adını yazın.' };
      const s = $('f-ev-start').value, e = $('f-ev-end').value;
      if (!s) return { error: 'Başlangıç tarih ve saatini seçin.' };
      if (e && e < s) return { error: 'Bitiş, başlangıçtan önce olamaz. Tarihleri kontrol edin.' };
      const lines = ['BEGIN:VEVENT', `SUMMARY:${icsEscape(title)}`, `DTSTART:${icsDate(s)}`];
      if (e) lines.push(`DTEND:${icsDate(e)}`);
      if (v('f-ev-loc')) lines.push(`LOCATION:${icsEscape(v('f-ev-loc'))}`);
      if (v('f-ev-desc')) lines.push(`DESCRIPTION:${icsEscape(v('f-ev-desc'))}`);
      lines.push('END:VEVENT');
      return { text: lines.join('\n') };
    }
    case 'text': {
      const t = $('f-text').value;
      if (!t.trim()) return { empty: true, hint: 'Bir metin ya da web adresi yazın.' };
      return { text: t };
    }
  }
  return { empty: true };
}

/* ---------- Sekmeler ---------- */
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(name, focus = false) {
  currentTab = name;
  tabs.forEach((t) => {
    const on = t.dataset.tab === name;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    t.tabIndex = on ? 0 : -1;
    if (on && focus) t.focus();
  });
  document.querySelectorAll('[data-type]').forEach((el) => { el.hidden = el.dataset.type !== name; });
  $('print-card-btn').hidden = name !== 'wifi';
  scheduleRender();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t.dataset.tab));
  // Ok tuşlarıyla sekmeler arasında gezinme
  t.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(n.dataset.tab, true);
  });
});

/* ---------- Çizim ---------- */
function opts() {
  return { size: Number($('opt-size').value), ecl: $('opt-ecl').value, dark: $('opt-fg').value, light: $('opt-bg').value };
}
function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16 & 255, n >> 8 & 255, n & 255].map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrastCheck(o) {
  const ld = luminance(o.dark), ll = luminance(o.light);
  const ratio = (Math.max(ld, ll) + 0.05) / (Math.min(ld, ll) + 0.05);
  const w = $('warn-contrast');
  if (ld > ll) { w.textContent = 'Ön plan arka plandan daha açık: ters renkli QR kodlarını çoğu telefon okuyamaz. Koyu desen, açık zemin kullanın.'; w.hidden = false; }
  else if (ratio < 4) { w.textContent = `Kontrast düşük (${ratio.toFixed(1)}:1). Güvenli okuma için en az 4:1 önerilir.`; w.hidden = false; }
  else w.hidden = true;
}
function scheduleRender() { const c = document.getElementById('qr-canvas'); if (c) c.dataset.ready = '0'; clearTimeout(renderTimer); renderTimer = setTimeout(render, 120); }

function setReady(ready, hint = '') {
  $('preview-hint').textContent = ready ? '' : hint;
  $('preview-hint').hidden = ready;
  $('actions').hidden = !ready;
  $('qr-info').hidden = !ready;
  canvas.hidden = !ready;
  canvas.dataset.ready = ready ? '1' : '0';
}

async function render() {
  const out = buildPayload();
  const o = opts();
  showError($('error'), null);
  contrastCheck(o);
  if (out.error) { currentText = ''; setReady(false); showError($('error'), out.error); return; }
  if (out.empty) { currentText = ''; setReady(false, out.hint); return; }
  try {
    const qr = await getQr();
    await qr.toCanvas(canvas, out.text, { width: o.size, margin: 4, errorCorrectionLevel: o.ecl, color: { dark: o.dark, light: o.light } });
    currentText = out.text;
    const seg = qr.create(out.text, { errorCorrectionLevel: o.ecl });
    $('qr-info').textContent = `${out.text.length} karakter · sürüm ${seg.version} · hata düzeltme ${o.ecl}`;
    setReady(true);
  } catch (err) {
    console.error(err);
    currentText = '';
    setReady(false);
    const m = String(err && err.message || err);
    showError($('error'), /too big|exceeds|overflow/i.test(m)
      ? 'İçerik bu QR kod için fazla uzun. Metni kısaltın ya da hata düzeltme seviyesini "L" yapın.'
      : 'QR kod oluşturulamadı. Girdiyi kontrol edip tekrar deneyin.');
  }
}

/* ---------- Dosya adı ---------- */
function fileBase() {
  const raw = currentTab === 'wifi' ? $('f-wifi-ssid').value : currentTab === 'vcard' ? v('f-vc-name') : '';
  const slug = raw.toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  return `qr-${currentTab}${slug ? '-' + slug : ''}`;
}

/* ---------- Eylemler ---------- */
$('download-png').addEventListener('click', () => {
  if (!currentText) return;
  canvas.toBlob((b) => { if (b) downloadBlob(b, `${fileBase()}.png`); }, 'image/png');
});
$('download-svg').addEventListener('click', async () => {
  if (!currentText) return;
  try {
    const qr = await getQr();
    const o = opts();
    const svg = await qr.toString(currentText, { type: 'svg', margin: 4, width: o.size, errorCorrectionLevel: o.ecl, color: { dark: o.dark, light: o.light } });
    downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `${fileBase()}.svg`);
  } catch (err) { console.error(err); showError($('error'), 'SVG oluşturulamadı. PNG indirmeyi deneyin.'); }
});

/** Wi-Fi için A6 "misafir ağı kartı": yalnızca bu kart yazdırılır. */
$('print-card-btn').addEventListener('click', () => {
  if (!currentText || currentTab !== 'wifi') return;
  $('pc-ssid').textContent = $('f-wifi-ssid').value;
  const showPass = $('f-wifi-showpass').checked && $('f-wifi-enc').value !== 'nopass';
  $('pc-pass').textContent = showPass ? `Parola: ${$('f-wifi-pass').value}` : '';
  $('pc-pass').hidden = !showPass;
  $('pc-img').src = canvas.toDataURL('image/png');
  if ($('pc-img').complete) window.print(); else $('pc-img').onload = () => window.print();
});

/* ---------- Parola göster/gizle ---------- */
$('f-wifi-reveal').addEventListener('change', () => { $('f-wifi-pass').type = $('f-wifi-reveal').checked ? 'text' : 'password'; });

document.querySelectorAll('.ba-tool input, .ba-tool select, .ba-tool textarea').forEach((el) => {
  el.addEventListener('input', scheduleRender);
  el.addEventListener('change', scheduleRender);
});
selectTab('wifi');
