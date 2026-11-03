import { downloadBlob, showError, loadScript } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* Ülke kodları: [ad, arama kodu]. İlk sırada Türkiye varsayılan. */
const COUNTRIES = [
  ['Türkiye', '90'], ['Almanya', '49'], ['Azerbaycan', '994'], ['KKTC', '90'], ['Amerika Birleşik Devletleri / Kanada', '1'],
  ['Birleşik Krallık', '44'], ['Fransa', '33'], ['Hollanda', '31'], ['Belçika', '32'], ['Avusturya', '43'], ['İsviçre', '41'],
  ['İtalya', '39'], ['İspanya', '34'], ['Yunanistan', '30'], ['Bulgaristan', '359'], ['Rusya', '7'], ['Ukrayna', '380'],
  ['Gürcistan', '995'], ['Irak', '964'], ['Suriye', '963'], ['Suudi Arabistan', '966'], ['Birleşik Arap Emirlikleri', '971'],
  ['Katar', '974'], ['Mısır', '20'], ['Hindistan', '91'], ['Pakistan', '92'], ['Çin', '86'], ['Japonya', '81'],
  ['Brezilya', '55'], ['Avustralya', '61'],
];

const sel = $('country');
COUNTRIES.forEach(([name, code], i) => {
  const o = document.createElement('option');
  o.value = String(i);
  o.textContent = `${name} (+${code})`;
  sel.appendChild(o);
});
const dial = () => COUNTRIES[Number(sel.value) || 0][1];

/** Girdiyi wa.me biçimine çevirir; { digits, note } ya da { error } döner. */
export function normalizePhone(raw, cc) {
  let d = String(raw || '').replace(/[^\d+]/g, '');
  if (!d) return { empty: true };
  let full;
  if (d.startsWith('+')) full = d.slice(1).replace(/\D/g, '');
  else if (d.startsWith('00')) full = d.slice(2);
  else {
    d = d.replace(/\D/g, '');
    if (d.startsWith('0')) full = cc + d.replace(/^0+/, '');
    else if (d.startsWith(cc) && (cc !== '90' || d.length === 12)) full = d;
    else full = cc + d;
  }
  if (full.length < 8 || full.length > 15) {
    return { error: 'Numara geçersiz görünüyor: ülke kodu dahil 8-15 hane olmalı. Numarayı ve ülke kodunu kontrol edin.' };
  }
  let note = '';
  if (full.startsWith('90') && !/^905\d{9}$/.test(full)) {
    note = 'Bu numara Türkiye cep numarası biçiminde değil (5 ile başlayan 10 hane). Sabit hatların WhatsApp hesabı genellikle olmaz.';
  }
  return { digits: full, note };
}

const buildLink = (digits, msg) => `https://wa.me/${digits}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Panoya kopyalar; izin yoksa eski yönteme düşer. */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}
function flash(el, text) {
  el.textContent = text;
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.textContent = ''; }, 4000);
}

/* ---------- QR ---------- */
let QR = null;
async function getQr() {
  if (QR) return QR;
  await loadScript(new URL('../vendor/qrcode@1.5.1/qrcode.min.js', import.meta.url).href);
  QR = window.QRCode;
  return QR;
}

let current = '';
let renderSeq = 0;
async function drawQr(link) {
  const seq = ++renderSeq;
  const qr = await getQr();
  await qr.toCanvas($('qr-canvas'), link, { width: 320, margin: 2, errorCorrectionLevel: 'M', color: { dark: '#000000', light: '#ffffff' } });
  if (seq === renderSeq) $('qr-canvas').dataset.ready = '1';
}

function snippet(link) {
  const label = ($('btn-label').value.trim() || 'WhatsApp ile yazın');
  const style = 'display:inline-block;background:#25D366;color:#073b1d;font:600 16px/1.2 Arial,sans-serif;padding:14px 22px;border-radius:8px;text-decoration:none;min-height:44px;box-sizing:border-box;';
  return `<a href="${escAttr(link)}" target="_blank" rel="noopener noreferrer" style="${style}">${escAttr(label)}</a>`;
}

/* ---------- Ana akış ---------- */
function setResult(on) {
  $('result').hidden = !on;
  $('result').classList.toggle('is-active', on);
}

function update() {
  const raw = $('phone').value;
  const res = normalizePhone(raw, dial());
  if (res.empty) {
    showError($('error'), '');
    setResult(false); current = '';
    return;
  }
  if (res.error) {
    showError($('error'), res.error);
    setResult(false); current = '';
    return;
  }
  showError($('error'), '');
  current = buildLink(res.digits, $('message').value.trim());
  $('link-out').value = current;
  $('phone-note').textContent = res.note;
  $('html-snippet').value = snippet(current);
  setResult(true);
  $('qr-canvas').dataset.ready = '0';
  drawQr(current).catch(() => showError($('error'), 'QR kod çizilemedi. Mesajı kısaltıp yeniden deneyin.'));
}

$('country').addEventListener('change', update);
$('phone').addEventListener('input', update);
$('message').addEventListener('input', update);
$('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
$('btn-label').addEventListener('input', () => { if (current) $('html-snippet').value = snippet(current); });

$('copy-link').addEventListener('click', async () => {
  flash($('link-status'), (await copyText(current)) ? 'Bağlantı panoya kopyalandı.' : 'Kopyalanamadı; bağlantıyı seçip Ctrl+C ile kopyalayın.');
});
$('copy-html').addEventListener('click', async () => {
  flash($('html-status'), (await copyText($('html-snippet').value)) ? 'HTML kodu panoya kopyalandı.' : 'Kopyalanamadı; kodu seçip Ctrl+C ile kopyalayın.');
});
// Yalnızca kullanıcı tıklayınca yeni sekme açılır.
$('open-wa').addEventListener('click', () => { if (current) window.open(current, '_blank', 'noopener'); });

const fileBase = () => `whatsapp-qr-${current.replace(/^https:\/\/wa\.me\//, '').split('?')[0]}`;
$('download-png').addEventListener('click', () => {
  if (!current) return;
  $('qr-canvas').toBlob((b) => { if (b) downloadBlob(b, `${fileBase()}.png`); }, 'image/png');
});
$('download-svg').addEventListener('click', async () => {
  if (!current) return;
  try {
    const qr = await getQr();
    const svg = await qr.toString(current, { type: 'svg', margin: 2, width: 320, errorCorrectionLevel: 'M', color: { dark: '#000000', light: '#ffffff' } });
    downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `${fileBase()}.svg`);
  } catch {
    showError($('error'), 'SVG oluşturulamadı. Sayfayı yenileyip tekrar deneyin.');
  }
});

/* ---------- Toplu liste ---------- */
let bulkLinks = [];
$('bulk-make').addEventListener('click', () => {
  const list = $('bulk-list');
  list.textContent = '';
  bulkLinks = [];
  const lines = $('bulk').value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (!lines.length) { flash($('bulk-status'), 'Önce en az bir numara yazın.'); $('bulk-copy').hidden = true; return; }
  const used = lines.slice(0, 200);
  const msg = $('message').value.trim();
  let bad = 0;
  used.forEach((line) => {
    const li = document.createElement('li');
    const res = normalizePhone(line, dial());
    const num = document.createElement('span'); num.className = 'num'; num.textContent = line;
    li.appendChild(num);
    if (res.error || res.empty) {
      bad++;
      const p = document.createElement('span'); p.className = 'bad'; p.textContent = 'Geçersiz numara: ülke kodu dahil 8-15 hane olmalı.';
      li.appendChild(p);
    } else {
      const link = buildLink(res.digits, msg);
      bulkLinks.push(link);
      const l = document.createElement('span'); l.className = 'lnk'; l.textContent = link;
      const act = document.createElement('span'); act.className = 'act';
      const c = document.createElement('button'); c.type = 'button'; c.className = 'ba-btn'; c.textContent = 'Kopyala';
      c.addEventListener('click', async () => { c.textContent = (await copyText(link)) ? 'Kopyalandı' : 'Kopyalanamadı'; });
      const o = document.createElement('button'); o.type = 'button'; o.className = 'ba-btn'; o.textContent = 'WhatsApp\'ta aç';
      o.addEventListener('click', () => window.open(link, '_blank', 'noopener'));
      act.append(c, o);
      li.append(l, act);
    }
    list.appendChild(li);
  });
  $('bulk-copy').hidden = bulkLinks.length === 0;
  let s = `${bulkLinks.length} bağlantı oluşturuldu`;
  if (bad) s += `, ${bad} satır geçersiz`;
  if (lines.length > 200) s += `; ilk 200 satır işlendi`;
  flash($('bulk-status'), s + '.');
});
$('bulk-copy').addEventListener('click', async () => {
  flash($('bulk-status'), (await copyText(bulkLinks.join('\n'))) ? 'Tüm bağlantılar panoya kopyalandı.' : 'Kopyalanamadı.');
});
