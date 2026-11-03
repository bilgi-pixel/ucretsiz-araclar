// Barkod Oluşturucu — JsBarcode (MIT) ile tarayıcıda çizim. Girdi hiçbir yere gönderilmez.
// Kontrol basamağı (GS1 mod-10) burada hesaplanır/doğrulanır; JsBarcode'a hep tam numara verilir.
import { downloadBlob, showError, loadScript } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_LINES = 200;

// Biçim tanımları: len = kontrol basamağı dahil uzunluk (yalnızca rakam biçimleri için)
const FORMATS = {
  ean13: { label: 'EAN-13', js: 'EAN13', len: 13 },
  ean8: { label: 'EAN-8', js: 'EAN8', len: 8 },
  upca: { label: 'UPC-A', js: 'UPC', len: 12 },
  itf14: { label: 'ITF-14', js: 'ITF14', len: 14 },
  code128: { label: 'Code 128', js: 'CODE128' },
  code39: { label: 'Code 39', js: 'CODE39' },
};

/** GS1 kontrol basamağı: sağdan başlayarak 3,1,3,1… ağırlıkla (gövde, kontrol hariç). */
export function gs1CheckDigit(body) {
  let sum = 0;
  for (let i = 0; i < body.length; i++) {
    const d = body.charCodeAt(body.length - 1 - i) - 48;
    sum += d * (i % 2 === 0 ? 3 : 1);
  }
  return (10 - (sum % 10)) % 10;
}

/** Tek satırı doğrular. Döner: { value, note } ya da Türkçe mesajla hata fırlatır. */
function prepare(type, raw) {
  const f = FORMATS[type];
  if (f.len) {
    const v = raw.replace(/[\s-]/g, '');
    if (!/^\d+$/.test(v)) throw new Error(`${f.label} yalnızca rakam kabul eder. Harf, boşluk dışı işaret ya da Türkçe karakter içeren değer için "Code 128" biçimini seçin.`);
    if (v.length === f.len - 1) {
      const cd = gs1CheckDigit(v);
      return { value: v + cd, note: `Kontrol basamağı otomatik eklendi: ${cd}` };
    }
    if (v.length === f.len) {
      const cd = gs1CheckDigit(v.slice(0, -1));
      if (cd !== Number(v[v.length - 1])) {
        throw new Error(`Kontrol basamağı hatalı: son rakam ${v[v.length - 1]} yazılmış, doğrusu ${cd} olmalı (${v.slice(0, -1)}${cd}). Numarayı kontrol edin ya da son rakamı silip otomatik hesaplatın.`);
      }
      return { value: v, note: 'Kontrol basamağı doğru' };
    }
    throw new Error(`${f.label} için ${f.len - 1} rakam (kontrol basamağı otomatik hesaplanır) ya da ${f.len} rakam girin; bu satırda ${v.length} rakam var.`);
  }
  if (type === 'code39') {
    const v = raw.toUpperCase();
    if (!/^[0-9A-Z\-. $/+%]+$/.test(v)) throw new Error('Code 39 yalnızca A–Z (Türkçe karakter hariç), 0–9 ve - . boşluk $ / + % karakterlerini destekler. Ç, Ş, Ğ, İ, Ö, Ü ya da küçük/özel işaretler için "Code 128" biçimini seçin.');
    return { value: v, note: v !== raw ? 'Harfler büyük harfe çevrildi' : '' };
  }
  // Code 128: yazdırılabilir ASCII
  if (!/^[\x20-\x7E]+$/.test(raw)) throw new Error('Code 128 yalnızca ASCII karakterleri destekler; ç, ğ, ı, ö, ş, ü gibi Türkçe harfler çizilemez. Bunları c, g, i, o, s, u ile değiştirip yeniden deneyin.');
  return { value: raw, note: '' };
}

function luminance(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

function options() {
  return {
    width: Math.min(8, Math.max(1, Math.round(Number($('opt-width').value) || 2))),
    height: Math.min(400, Math.max(20, Math.round(Number($('opt-height').value) || 100))),
    margin: Math.min(60, Math.max(0, Math.round(Number($('opt-margin').value) || 0))),
    displayValue: $('opt-text').checked,
    lineColor: $('opt-fg').value || '#000000',
    background: $('opt-bg').value || '#ffffff',
    fontSize: 18,
    textMargin: 4,
  };
}

let items = []; // { value, label, note, error, raw }
let JB = null;

function drawTo(target, item, opts) {
  JB(target, item.value, { ...opts, format: FORMATS[$('type').value].js, valid: () => {}, });
}

function fileSafe(s) { return s.replace(/[^A-Za-z0-9_-]+/g, '_').slice(0, 40) || 'barkod'; }

function svgBlob(item, opts) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  drawTo(svg, item, opts);
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(svg);
  return new Blob([xml], { type: 'image/svg+xml' });
}

function pngBlob(item, opts) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    drawTo(canvas, item, opts);
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('png'))), 'image/png');
  });
}

function render() {
  const type = $('type').value;
  const lines = $('input').value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  const list = $('items');
  list.innerHTML = '';
  items = [];
  showError($('error'), null);
  $('warn').hidden = true;
  $('summary').textContent = '';
  $('download-all').hidden = true;
  if (!JB) return;
  if (!lines.length) { $('summary').textContent = 'Henüz değer girilmedi. Bir numara ya da metin yazın; barkod anında çizilir.'; return; }
  if (lines.length > MAX_LINES) {
    showError($('error'), `Bir seferde en fazla ${MAX_LINES} satır işlenir; ${lines.length} satır girdiniz. Listeyi parçalara bölüp tekrar deneyin.`);
    lines.length = MAX_LINES;
  }
  const opts = options();
  if (contrast(opts.lineColor, opts.background) < 4) {
    $('warn').hidden = false;
    $('warn').textContent = 'Çubuk ve arka plan renkleri birbirine yakın; okuyucular bu barkodu tarayamayabilir. Koyu çubuk, açık arka plan en güvenli seçimdir.';
  }
  let bad = 0;
  for (const raw of lines) {
    const li = document.createElement('li');
    const item = { raw, value: '', note: '', error: '' };
    try {
      Object.assign(item, prepare(type, raw));
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      drawTo(svg, item, opts);
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', `${FORMATS[type].label} barkod: ${item.value}`);
      svg.style.maxWidth = '100%';
      svg.style.height = 'auto';
      li.innerHTML = '<div class="bk-prev"></div><div class="bk-info"><strong class="bk-val"></strong><span class="bk-note"></span><div class="ba-actions"><button class="ba-btn ba-btn-success" type="button" data-act="png">PNG indir</button><button class="ba-btn" type="button" data-act="svg">SVG indir</button></div></div>';
      li.querySelector('.bk-prev').appendChild(svg);
      li.querySelector('.bk-val').textContent = item.value;
      li.querySelector('.bk-note').textContent = item.note;
    } catch (err) {
      bad++;
      item.error = err.message && /[a-zçğıöşü]/i.test(err.message) && !/^(png|svg)$/i.test(err.message) ? err.message : 'Bu değer seçilen biçimde çizilemedi; biçimi ya da değeri kontrol edin.';
      // JsBarcode'un kendi (İngilizce) hatası kullanıcıya gösterilmez
      if (/is not a valid input/i.test(err.message || '') || err.name === 'InvalidInputException') item.error = `"${raw}" ${FORMATS[type].label} için geçerli değil. Biçimi ve karakter sayısını kontrol edin.`;
      li.className = 'bk-bad';
      li.innerHTML = '<div class="bk-info"><strong class="bk-val"></strong><span class="bk-err" role="alert"></span></div>';
      li.querySelector('.bk-val').textContent = raw;
      li.querySelector('.bk-err').textContent = item.error;
    }
    li._item = item;
    items.push(item);
    list.appendChild(li);
  }
  const ok = items.length - bad;
  $('summary').textContent = `${ok} barkod hazır${bad ? `, ${bad} satırda hata var` : ''}.`;
  if (bad) showError($('error'), items.find((i) => i.error).error);
  $('download-all').hidden = ok < 2;
}

$('items').addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const item = btn.closest('li')._item;
  const opts = options();
  const name = `barkod-${fileSafe(item.value)}`;
  try {
    if (btn.dataset.act === 'svg') downloadBlob(svgBlob(item, opts), `${name}.svg`);
    else downloadBlob(await pngBlob(item, opts), `${name}.png`);
  } catch (err) {
    console.error(err);
    showError($('error'), 'Dosya oluşturulamadı. Sayfayı yenileyip tekrar deneyin; sorun sürerse SVG indirmeyi deneyin.');
  }
});

$('download-all').addEventListener('click', async () => {
  const opts = options();
  for (const item of items.filter((i) => !i.error)) {
    downloadBlob(await pngBlob(item, opts), `barkod-${fileSafe(item.value)}.png`);
    await new Promise((r) => setTimeout(r, 300));
  }
});

$('sample').addEventListener('click', () => {
  const samples = { ean13: '5901234123457', ean8: '9638507', upca: '03600029145', itf14: '1234567890123', code128: 'Bilisim-Ajans-2026', code39: 'BILISIM 123' };
  $('input').value = samples[$('type').value];
  render();
});

let timer = 0;
const schedule = () => { clearTimeout(timer); timer = setTimeout(render, 120); };
['input', 'opt-width', 'opt-height', 'opt-margin', 'opt-fg', 'opt-bg'].forEach((id) => $(id).addEventListener('input', schedule));
$('opt-text').addEventListener('change', render);
$('type').addEventListener('change', () => {
  $('hint-type').textContent = {
    ean13: '12 rakam yazın, 13. (kontrol) rakam otomatik eklenir; 13 rakam yazarsanız doğrulanır.',
    ean8: '7 rakam yazın, 8. rakam otomatik eklenir; 8 rakam yazarsanız doğrulanır.',
    upca: '11 rakam yazın, 12. rakam otomatik eklenir; 12 rakam yazarsanız doğrulanır.',
    itf14: '13 rakam yazın, 14. rakam otomatik eklenir; 14 rakam yazarsanız doğrulanır.',
    code128: 'Harf, rakam ve işaretler (yalnızca ASCII). Türkçe karakter yok.',
    code39: 'A–Z, 0–9 ve - . boşluk $ / + % ; küçük harfler büyüğe çevrilir.',
  }[$('type').value];
  render();
});

try {
  await loadScript(new URL('../vendor/jsbarcode@3.12.1/JsBarcode.all.min.js', import.meta.url).href);
  JB = window.JsBarcode;
  render();
} catch (err) {
  console.error(err);
  showError($('error'), 'Barkod kütüphanesi yüklenemedi. Sayfayı yenileyin; çevrimdışıysanız sayfayı bir kez internetle açıp tekrar deneyin.');
}
