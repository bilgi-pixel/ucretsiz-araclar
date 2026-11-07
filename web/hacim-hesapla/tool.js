// Hacim Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** Uzunluk birimleri -> metre çarpanı. */
const UNITS = { mm: 0.001, cm: 0.01, m: 1, in: 0.0254, ft: 0.3048 };

/** Şekil tanımları: alan etiketleri, hacim ve yüzey alanı formülleri. */
export const SHAPES = {
  kup: { name: 'Küp', fields: ['Kenar uzunluğu (a)'], vol: (a) => a ** 3, area: (a) => 6 * a * a },
  prizma: { name: 'Dikdörtgenler prizması', fields: ['En (a)', 'Boy (b)', 'Yükseklik (h)'], vol: (a, b, h) => a * b * h, area: (a, b, h) => 2 * (a * b + a * h + b * h) },
  silindir: { name: 'Silindir', fields: ['Yarıçap (r)', 'Yükseklik (h)'], vol: (r, h) => Math.PI * r * r * h, area: (r, h) => 2 * Math.PI * r * (r + h) },
  koni: { name: 'Koni', fields: ['Yarıçap (r)', 'Yükseklik (h)'], vol: (r, h) => Math.PI * r * r * h / 3, area: (r, h) => Math.PI * r * (r + Math.hypot(r, h)) },
  kure: { name: 'Küre', fields: ['Yarıçap (r)'], vol: (r) => 4 / 3 * Math.PI * r ** 3, area: (r) => 4 * Math.PI * r * r },
  piramit: { name: 'Kare tabanlı piramit', fields: ['Taban kenarı (a)', 'Yükseklik (h)'], vol: (a, h) => a * a * h / 3, area: (a, h) => a * a + 2 * a * Math.sqrt(a * a / 4 + h * h) },
};

/** "12,5" veya "12.5" -> sayı; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(/\s/g, '').replace(',', '.');
  return /^\d*\.?\d+$|^\d+\.$/.test(t) ? Number(t) : NaN;
}

/** Okunur sayı biçimi (çok büyük/küçükse bilimsel gösterim). */
export function fmt(x) {
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 1e12 || a < 1e-6) return x.toExponential(4).replace('.', ',');
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 6 }).format(x);
}

/** Hesaplar; hata varsa Türkçe, çözüm öneren Error fırlatır. */
export function compute(shapeKey, values, unit) {
  const s = SHAPES[shapeKey];
  if (!s) throw new Error('Şekil seçilemedi. Listeden bir şekil seçin.');
  const nums = values.slice(0, s.fields.length).map(parseNum);
  for (let i = 0; i < nums.length; i++) {
    if (Number.isNaN(nums[i])) throw new Error(`"${s.fields[i]}" alanına geçerli bir sayı yazın (örn. 12,5). Negatif değer ve harf kabul edilmez.`);
    if (nums[i] <= 0) throw new Error(`"${s.fields[i]}" sıfırdan büyük olmalıdır. Ölçüyü kontrol edip yeniden girin.`);
  }
  const f = UNITS[unit] ?? 1;
  const vol = s.vol(...nums), area = s.area(...nums);
  if (!Number.isFinite(vol)) throw new Error('Değerler çok büyük; sonuç hesaplanamadı. Daha küçük bir birim ya da daha küçük sayılar deneyin.');
  const m3 = vol * f ** 3;
  return { name: s.name, unit, vol, area, m3, liter: m3 * 1000, cm3: m3 * 1e6 };
}

/* ---------- Arayüz ---------- */
function syncFields() {
  const s = SHAPES[$('shape').value];
  for (let i = 0; i < 3; i++) {
    const wrap = $('f' + i + '-wrap');
    wrap.hidden = i >= s.fields.length;
    if (i < s.fields.length) $('f' + i + '-label').textContent = s.fields[i];
  }
}

function render(r) {
  $('r-big').textContent = `${r.name}: ${fmt(r.vol)} ${r.unit}³`;
  $('r-vol').textContent = `${fmt(r.vol)} ${r.unit}³`;
  $('r-m3').textContent = `${fmt(r.m3)} m³`;
  $('r-l').textContent = `${fmt(r.liter)} litre`;
  $('r-cm3').textContent = `${fmt(r.cm3)} cm³`;
  $('r-area').textContent = `${fmt(r.area)} ${r.unit}²`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = compute($('shape').value, [$('f0').value, $('f1').value, $('f2').value], $('unit').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  $('shape').addEventListener('change', () => { syncFields(); $('result').hidden = true; $('result').classList.remove('is-active'); });
  syncFields();
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    ['f0', 'f1', 'f2'].forEach((id) => { $(id).value = ''; });
    $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('f0').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const text = `${last.name}: hacim ${fmt(last.vol)} ${last.unit}³ (${fmt(last.liter)} litre, ${fmt(last.m3)} m³); yüzey alanı ${fmt(last.area)} ${last.unit}².`;
    try { await navigator.clipboard.writeText(text); st.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
}
