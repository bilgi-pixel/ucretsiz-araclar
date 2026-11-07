// Ayakkabı Numarası Dönüştürme — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Not: markalar arasında resmî tek bir dönüşüm standardı yoktur; sonuçlar yaklaşıktır (parametreler.json).
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** Ayak uzunluğuna eklenen rahatlık payı (cm) — Paris noktası mantığı: EU = (cm + pay) × 1,5. */
export const ALLOWANCE_CM = 1.5;

/** Sistem farkları (EU numarasına göre). Yetişkin ölçüleri için yaklaşık değerlerdir. */
export const OFFSET = { uk: 34, usm: 33, usw: 31.5 };

const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });
const half = (x) => Math.round(x * 2) / 2;

/** "42,5" veya "42.5" -> sayı; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

/** Kaynak sisteme göre EU numarasını bulur. */
export function toEU(system, v) {
  if (system === 'eu') return v;
  if (system === 'cm') return half((v + ALLOWANCE_CM) * 1.5);
  return v + OFFSET[system];
}

/** Tüm sistemlerdeki karşılıkları üretir; geçersiz girdide Türkçe, çözüm öneren Error fırlatır. */
export function convert(system, raw) {
  const v = parseNum(raw);
  if (Number.isNaN(v)) throw new Error('Geçerli bir sayı yazın (örn. 42 ya da 42,5). Harf ve birim eki kullanmayın.');
  if (system === 'cm' && (v < 9 || v > 36)) throw new Error('Ayak uzunluğu 9 ile 36 cm arasında olmalıdır. Topuktan en uzun parmak ucuna kadar olan mesafeyi santimetre olarak ölçüp yeniden girin.');
  const eu = half(toEU(system, v));
  if (eu < 16 || eu > 56) throw new Error('Bu numara olağan ayakkabı aralığının (EU 16 – 56) dışında kalıyor. Seçtiğiniz sistemi ve numarayı kontrol edin.');
  const cm = eu / 1.5 - ALLOWANCE_CM;
  return { eu, uk: eu - OFFSET.uk, usm: eu - OFFSET.usm, usw: eu - OFFSET.usw, cm, inch: cm / 2.54, fromCm: system === 'cm' ? v : null };
}

/* ---------- Arayüz ---------- */
const show = (id, v, suffix = '') => { $(id).textContent = v === null ? '—' : `${nf.format(v)}${suffix}`; };

function render(r) {
  show('r-eu', r.eu);
  show('r-uk', r.uk >= 1 ? r.uk : null);
  show('r-usm', r.usm >= 1 ? r.usm : null);
  show('r-usw', r.usw >= 1 ? r.usw : null);
  show('r-cm', r.cm, ' cm');
  show('r-in', r.inch, ' inç');
  $('r-big').textContent = `EU ${nf.format(r.eu)} ≈ UK ${r.uk >= 1 ? nf.format(r.uk) : '—'} ≈ US erkek ${r.usm >= 1 ? nf.format(r.usm) : '—'} ≈ US kadın ${r.usw >= 1 ? nf.format(r.usw) : '—'}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = convert($('system').value, $('value').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  const hints = { eu: 'Avrupa (Paris noktası) numarası, örn. 42', uk: 'İngiltere numarası, örn. 8', usm: 'ABD erkek numarası, örn. 9', usw: 'ABD kadın numarası, örn. 10,5', cm: 'Ayak uzunluğu santimetre, örn. 26,5' };
  const syncHint = () => { $('value-hint').textContent = hints[$('system').value]; };
  $('system').addEventListener('change', () => { syncHint(); run_if_value(); });
  const run_if_value = () => { if ($('value').value.trim()) run(); };
  syncHint();
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    $('value').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('value').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const text = `EU ${nf.format(last.eu)} / UK ${nf.format(last.uk)} / US erkek ${nf.format(last.usm)} / US kadın ${nf.format(last.usw)} / ayak uzunluğu yaklaşık ${nf.format(last.cm)} cm (yaklaşık değerler).`;
    try { await navigator.clipboard.writeText(text); st.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
}
