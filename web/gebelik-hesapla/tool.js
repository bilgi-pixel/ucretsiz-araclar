// Gebelik Haftası ve Tahmini Doğum Tarihi — tamamı tarayıcıda çalışır; tarihler sunucuya gitmez.
// Bilgilendirme amaçlıdır: tanı, tedavi, ilaç ya da muayene önerisi üretmez; son söz hekiminizindir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');

/* ---------- Takvim yardımcıları (gün numarası: saat dilimi/yaz saati kayması olmaz) ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNumber = (t) => Math.round(Date.UTC(t.y, t.m - 1, t.d) / 86400000);
const fromDayNumber = (n) => { const d = new Date(n * 86400000); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() }; };

/** "YYYY-MM-DD" → {y,m,d}; geçersizse null (30 Şubat dahil). */
export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
export function todayLocal() { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() }; }
export const toISO = (t) => `${t.y}-${String(t.m).padStart(2, '0')}-${String(t.d).padStart(2, '0')}`;
const dateTR = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const dateShort = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const dayWeekday = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('tr-TR', { weekday: 'long', timeZone: 'UTC' });

/** Genel (bilgilendirici) haftalık notlar; kesin muayene takvimi hekime aittir. */
const WEEK_NOTES = [
  [6, 10, 'Genellikle ilk hekim görüşmesinin yapıldığı dönem'],
  [11, 14, 'Genellikle ilk trimester tarama dönemi'],
  [18, 22, 'Genellikle ayrıntılı ultrason dönemi'],
  [24, 28, 'Genellikle şeker yükleme testinin konuştuğu dönem'],
  [36, 40, 'Genellikle doğuma hazırlık görüşmeleri dönemi'],
];
const noteFor = (w) => (WEEK_NOTES.find(([a, b]) => w >= a && w <= b) || [0, 0, ''])[2];
const trimesterOf = (days) => (days < 14 * 7 ? 1 : days < 28 * 7 ? 2 : 3);

/**
 * Tüm sonucu hesaplar; hata durumunda Türkçe, çözüm öneren Error fırlatır.
 * v: { mode: 'sat'|'ivf'|'edd', lmp, cycle, ivf, ivfDay, edd, ref }
 */
export function computePregnancy(v) {
  let edd;
  let basis;
  if (v.mode === 'sat') {
    const lmp = parseISO(v.lmp);
    if (!lmp) throw new Error('Son adet tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin.');
    const cycle = Number(String(v.cycle || '28').trim());
    if (!Number.isInteger(cycle) || cycle < 21 || cycle > 45) throw new Error('Döngü uzunluğu 21–45 gün arasında, tam sayı olmalıdır. Bilmiyorsanız 28 yazın.');
    edd = fromDayNumber(dayNumber(lmp) + 280 + (cycle - 28)); // Naegele kuralı + döngü düzeltmesi
    basis = `Son adet tarihi ${dateTR(lmp)}, döngü ${cycle} gün`;
  } else if (v.mode === 'ivf') {
    const tr = parseISO(v.ivf);
    if (!tr) throw new Error('Embriyo transfer tarihi eksik ya da geçersiz. Tarihi takvimden yeniden seçin.');
    const emb = Number(v.ivfDay);
    if (emb !== 3 && emb !== 5) throw new Error('Embriyo gününü seçin: 3. gün ya da 5. gün (blastosist).');
    edd = fromDayNumber(dayNumber(tr) + 266 - emb);
    basis = `Transfer tarihi ${dateTR(tr)}, ${emb}. gün embriyo`;
  } else if (v.mode === 'edd') {
    edd = parseISO(v.edd);
    if (!edd) throw new Error('Tahmini doğum tarihi eksik ya da geçersiz. Tarihi takvimden yeniden seçin.');
    basis = 'Bilinen tahmini doğum tarihi';
  } else {
    throw new Error('Hesaplama yöntemini seçin.');
  }
  if (edd.y < 1990 || edd.y > 2100) throw new Error('Tarih makul bir aralıkta değil. Yılı kontrol edip tarihi yeniden seçin.');
  const ref = v.ref ? parseISO(v.ref) : todayLocal();
  if (!ref) throw new Error('Hesaplanacak tarih geçersiz. Tarihi yeniden seçin ya da alanı boş bırakıp bugünü kullanın.');
  const lmpEq = dayNumber(edd) - 280; // gebelik başlangıcı (SAT eşdeğeri)
  const days = dayNumber(ref) - lmpEq;
  if (days < 0) throw new Error('Hesaplanacak tarih gebeliğin başlangıcından önce görünüyor. Girdiğiniz tarihleri kontrol edin.');
  if (days > 44 * 7) throw new Error('Hesaplanan gebelik süresi 44 haftayı aşıyor. Tarihleri kontrol edin; gebelik sona erdiyse bu araç gerekli değildir.');
  const weeks = Math.floor(days / 7), rem = days % 7;
  const daysLeft = dayNumber(edd) - dayNumber(ref);
  const rows = [];
  for (let w = 4; w <= 42; w++) {
    rows.push({ week: w, from: fromDayNumber(lmpEq + w * 7), to: fromDayNumber(lmpEq + w * 7 + 6), trimester: trimesterOf(w * 7), note: noteFor(w), current: w === weeks });
  }
  return {
    edd, basis, ref, usedToday: !v.ref, weeks, days: rem, totalDays: days, daysLeft,
    trimester: trimesterOf(days), lmpEq, rows,
    // 37. haftadan (term) ve 42. haftadan sonra; yalnızca bilgi
    termStart: fromDayNumber(lmpEq + 37 * 7), termEnd: fromDayNumber(lmpEq + 42 * 7 - 1),
    percent: Math.min(100, Math.round((days / 280) * 100)),
  };
}

/* ---------- Arayüz ---------- */
const TRI = { 1: '1. trimester (1–13. hafta)', 2: '2. trimester (14–27. hafta)', 3: '3. trimester (28. hafta ve sonrası)' };

function render(r) {
  $('r-edd').textContent = dateTR(r.edd);
  $('r-edd-iso').textContent = toISO(r.edd);
  $('r-edd-day').textContent = dayWeekday(r.edd);
  $('r-week').textContent = `${r.weeks}. hafta ${r.days}. gün`;
  $('r-tri').textContent = TRI[r.trimester];
  $('r-left').textContent = r.daysLeft > 0 ? `${nf.format(r.daysLeft)} gün (${Math.floor(r.daysLeft / 7)} hafta ${r.daysLeft % 7} gün)` : r.daysLeft === 0 ? 'Tahmini doğum tarihi bugün' : `Tahmini tarih ${nf.format(-r.daysLeft)} gün önce geçti`;
  $('r-progress').value = r.percent; $('r-progress').textContent = `%${r.percent}`;
  $('r-pct').textContent = `%${r.percent}`;
  $('r-basis').textContent = `${r.basis}. Hesaplanan tarih: ${dateTR(r.ref)}${r.usedToday ? ' (bugün)' : ''}. Bebeklerin yalnızca yaklaşık %4–5\'i tam tahmin edilen günde doğar; 37–42. hafta arası (${dateShort(r.termStart)} – ${dateShort(r.termEnd)}) genel olarak miadında doğum aralığı kabul edilir.`;
  $('week-body').innerHTML = r.rows.map((x) => `<tr${x.current ? ' class="is-now" aria-current="true"' : ''}><th scope="row">${x.week}. hafta${x.current ? ' (şu an)' : ''}</th><td>${dateShort(x.from)} – ${dateShort(x.to)}</td><td>${x.trimester}. trimester</td><td>${x.note}</td></tr>`).join('');
  $('result').hidden = false; $('result').classList.add('is-active');
}

const summaryText = (r) => `Tahmini doğum tarihi: ${dateTR(r.edd)}. ${dateTR(r.ref)} itibarıyla gebelik ${r.weeks}. hafta ${r.days}. gün (${r.trimester}. trimester). Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın.`;

let last = null;
const mode = () => (document.querySelector('input[name="mode"]:checked') || {}).value;

function syncMode() {
  const m = mode();
  ['sat', 'ivf', 'edd'].forEach((k) => { $('box-' + k).hidden = k !== m; });
}

function run() {
  showError($('error'), '');
  try {
    last = computePregnancy({ mode: mode(), lmp: $('lmp').value, cycle: $('cycle').value, ivf: $('ivf').value, ivfDay: $('ivf-day').value, edd: $('edd-in').value, ref: $('ref').value });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', syncMode));
syncMode();
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset(); syncMode(); $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
$('print').addEventListener('click', () => window.print());
