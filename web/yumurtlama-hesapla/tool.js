// Yumurtlama (ovülasyon) ve doğurgan gün hesaplayıcı — tamamı tarayıcıda çalışır; tarihler sunucuya gitmez.
// Tüm hesap "takvim gün numarası" (UTC gece yarısı / 86400000) üzerinden yapılır; saat dilimi ve yaz saati sonucu kaydırmaz.
// Bilgilendirme amaçlıdır; tıbbi tavsiye değildir, doğum kontrol yöntemi olarak kullanılmaz.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

export const LUTEAL_DAYS = 14;   // yumurtlamadan sonraki adete kadar varsayılan gün sayısı
export const FERTILE_BEFORE = 5; // doğurgan pencere: yumurtlamadan 5 gün önce başlar
export const FERTILE_AFTER = 1;  // ... yumurtlamadan 1 gün sonra biter
export const CYCLE_COUNT = 6;    // tabloda gösterilecek döngü sayısı (ilk satır girilen döngüdür)

/* ---------- Takvim yardımcıları ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; // m: 1-12
/** Gün numarası: saat dilimi ve yaz saatinden etkilenmez. */
export const dayNumber = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / 86400000);
const fromDayNumber = (n) => { const dt = new Date(n * 86400000); return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() }; };
const utcDate = (n) => new Date(n * 86400000);

/** "YYYY-MM-DD" → {y,m,d}; geçersizse null (30 Şubat gibi tarihler dahil). */
export function parseISO(s) {
  const mt = /^(\d{4,6})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

/** Gün numarası → "YYYY-MM-DD" */
export function toISO(n) {
  const t = fromDayNumber(n);
  return `${String(t.y).padStart(4, '0')}-${String(t.m).padStart(2, '0')}-${String(t.d).padStart(2, '0')}`;
}

/** Yerel (cihaz) bugünün gün numarası; yalnızca takvimdeki "bugün" işareti ve eski tarih notu için. */
const todayNumber = () => { const n = new Date(); return dayNumber(n.getFullYear(), n.getMonth() + 1, n.getDate()); };

const fmt = (n, opts) => utcDate(n).toLocaleDateString('tr-TR', { timeZone: 'UTC', ...opts });
/** "15 Mart 2026 Pazar" */
const dateFull = (n) => fmt(n, { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
/** "10 Mart – 16 Mart 2026" (yıl farklıysa iki yıl da yazılır) */
function rangeLong(a, b) {
  const ya = utcDate(a).getUTCFullYear(), yb = utcDate(b).getUTCFullYear();
  const left = fmt(a, ya === yb ? { day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long', year: 'numeric' });
  return `${left} – ${fmt(b, { day: 'numeric', month: 'long', year: 'numeric' })}`;
}
/** "10 – 16 Mar" ya da "28 Mar – 3 Nis" */
function rangeShort(a, b) {
  const da = utcDate(a), db = utcDate(b);
  if (da.getUTCMonth() === db.getUTCMonth() && da.getUTCFullYear() === db.getUTCFullYear()) {
    return `${da.getUTCDate()} – ${fmt(b, { day: 'numeric', month: 'short' })}`;
  }
  return `${fmt(a, { day: 'numeric', month: 'short' })} – ${fmt(b, { day: 'numeric', month: 'short' })}`;
}
const dateShort = (n) => fmt(n, { day: 'numeric', month: 'short' });
const dateShortYear = (n) => fmt(n, { day: 'numeric', month: 'short', year: 'numeric' });

/* ---------- Hesap ---------- */
const parseIntStrict = (v) => (/^\d{1,3}$/.test(String(v ?? '').trim()) ? Number(String(v).trim()) : NaN);

/**
 * Yumurtlama ve doğurgan günleri hesaplar. Hata durumunda Türkçe, çözüm öneren Error fırlatır.
 * Girdi: { lmp: 'YYYY-MM-DD', cycle: '28', period: '5' }
 */
export function computeOvulation({ lmp, cycle, period }) {
  const start = parseISO(lmp);
  if (!start) throw new Error('Son adet başlangıç tarihi eksik ya da geçersiz. Adet kanamanızın ilk gününü takvimden seçin (örn. 01.03.2026).');
  if (start.y < 2000 || start.y > 2100) throw new Error('Son adet tarihi 2000–2100 yılları arasında olmalıdır. Yılı kontrol edip tarihi yeniden seçin.');
  const cycleLen = parseIntStrict(cycle);
  if (!Number.isInteger(cycleLen) || cycleLen < 21 || cycleLen > 35) {
    throw new Error('Döngü uzunluğu 21–35 gün arasında bir tam sayı olmalıdır (örn. 28). Döngünüz bu aralığın dışındaysa ya da çok düzensizse tahmin güvenilir olmaz; hekiminize danışın.');
  }
  const periodLen = parseIntStrict(period);
  if (!Number.isInteger(periodLen) || periodLen < 2 || periodLen > 8) {
    throw new Error('Adet süresi 2–8 gün arasında bir tam sayı olmalıdır (örn. 5). Değeri düzeltip tekrar deneyin.');
  }

  const lmpN = dayNumber(start.y, start.m, start.d);
  const cycles = [];
  for (let k = 0; k < CYCLE_COUNT; k++) {
    const periodStart = lmpN + k * cycleLen;
    const nextPeriod = periodStart + cycleLen;
    const ovulation = nextPeriod - LUTEAL_DAYS;
    cycles.push({
      index: k + 1, periodStart, periodEnd: periodStart + periodLen - 1, nextPeriod, ovulation,
      fertileStart: ovulation - FERTILE_BEFORE, fertileEnd: ovulation + FERTILE_AFTER,
    });
  }
  // Takvimde son döngünün bitiminde başlayan adet de gösterilsin diye bir sonraki adet penceresi.
  const last = cycles[cycles.length - 1];
  const periods = cycles.map((c) => [c.periodStart, c.periodEnd]);
  periods.push([last.nextPeriod, last.nextPeriod + periodLen - 1]);

  const first = cycles[0];
  return {
    lmpN, cycleLen, periodLen, cycles, periods,
    first,
    testDate: first.nextPeriod + 1, // beklenen adetin ertesi günü
    calStart: lmpN,
    calEnd: periods[periods.length - 1][1],
  };
}

/** Bir günün durumlarını döndürür: 'period', 'fertile', 'ovulation' (birden çok olabilir). */
export function dayStates(n, r) {
  const s = [];
  if (r.periods.some(([a, b]) => n >= a && n <= b)) s.push('period');
  if (r.cycles.some((c) => n >= c.fertileStart && n <= c.fertileEnd)) s.push('fertile');
  if (r.cycles.some((c) => n === c.ovulation)) s.push('ovulation');
  return s;
}

/* ---------- Arayüz: sonuç ---------- */
const setDate = (id, n, text) => { const el = $(id); el.textContent = text; el.dataset.iso = toISO(n); };

function render(r) {
  const c = r.first;
  setDate('r-ovulation', c.ovulation, dateFull(c.ovulation));
  const fert = $('r-fertile');
  fert.textContent = rangeLong(c.fertileStart, c.fertileEnd);
  fert.dataset.start = toISO(c.fertileStart); fert.dataset.end = toISO(c.fertileEnd);
  setDate('r-next', c.nextPeriod, dateFull(c.nextPeriod));
  const per = $('r-period');
  per.textContent = `${rangeLong(c.periodStart, c.periodEnd)} (${r.periodLen} gün)`;
  per.dataset.start = toISO(c.periodStart); per.dataset.end = toISO(c.periodEnd);
  setDate('r-test', r.testDate, dateFull(r.testDate));
  $('r-cycle').textContent = `${r.cycleLen} gün`;

  // Eski tarih uyarısı: yalnızca bilgi; hesap yine yapılır.
  $('r-stale').hidden = !(c.nextPeriod < todayNumber());

  // 6 döngü tablosu
  const body = $('cycle-body');
  body.textContent = '';
  for (const cy of r.cycles) {
    const tr = document.createElement('tr');
    const th = document.createElement('th'); th.scope = 'row';
    th.append(dateShortYear(cy.periodStart));
    const small = document.createElement('small'); small.textContent = cy.index === 1 ? '1. döngü (girdiğiniz)' : `${cy.index}. döngü`;
    th.append(small);
    const td1 = document.createElement('td'); td1.textContent = rangeShort(cy.fertileStart, cy.fertileEnd);
    const td2 = document.createElement('td'); td2.textContent = dateShort(cy.ovulation);
    tr.append(th, td1, td2);
    body.append(tr);
  }

  // Takvim: girilen yumurtlamanın ayından başla
  const ov = fromDayNumber(c.ovulation);
  calMonth = clampMonth({ y: ov.y, m: ov.m });
  renderCalendar();

  $('result').hidden = false; $('result').classList.add('is-active');
}

/* ---------- Arayüz: takvim ---------- */
let state = null;     // son hesap sonucu
let calMonth = null;  // { y, m } gösterilen ay
const monthIndex = (t) => t.y * 12 + (t.m - 1);
const fromIndex = (i) => ({ y: Math.floor(i / 12), m: (i % 12) + 1 });

function monthRange() {
  const a = fromDayNumber(state.calStart), b = fromDayNumber(state.calEnd);
  return [monthIndex({ y: a.y, m: a.m }), monthIndex({ y: b.y, m: b.m })];
}
function clampMonth(t) {
  const [lo, hi] = monthRange();
  return fromIndex(Math.max(lo, Math.min(hi, monthIndex(t))));
}

const STATE_LABEL = { period: 'adet günü', fertile: 'doğurgan gün', ovulation: 'tahmini yumurtlama günü' };
const STATE_LETTER = { period: 'A', fertile: 'D', ovulation: 'Y' };

function renderCalendar() {
  const grid = $('cal-grid');
  grid.textContent = '';
  const { y, m } = calMonth;
  const monthName = utcDate(dayNumber(y, m, 1)).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  $('cal-title').textContent = monthName;

  for (const wd of ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']) {
    const h = document.createElement('div'); h.className = 'cal-h'; h.textContent = wd; grid.append(h);
  }
  const firstN = dayNumber(y, m, 1);
  const lead = (utcDate(firstN).getUTCDay() + 6) % 7; // pazartesi başlangıçlı
  for (let i = 0; i < lead; i++) { const b = document.createElement('div'); b.className = 'cal-b'; b.setAttribute('aria-hidden', 'true'); grid.append(b); }

  const today = todayNumber();
  for (let d = 1; d <= daysInMonth(y, m); d++) {
    const n = firstN + d - 1;
    const states = dayStates(n, state);
    const cell = document.createElement('div');
    cell.className = 'cal-d' + states.map((s) => ` is-${s}`).join('');
    cell.dataset.iso = toISO(n);
    const num = document.createElement('span'); num.className = 'cal-n'; num.textContent = String(d);
    cell.append(num);
    const labels = [];
    if (states.length) {
      const order = ['ovulation', 'fertile', 'period'].filter((s) => states.includes(s));
      // Ovülasyon günü zaten doğurgan penceredir; harf işaretinde yalnızca Y gösterilir.
      const letters = order.includes('ovulation') ? order.filter((s) => s !== 'fertile') : order;
      const mark = document.createElement('span'); mark.className = 'cal-m'; mark.setAttribute('aria-hidden', 'true');
      mark.textContent = letters.map((s) => STATE_LETTER[s]).join(' ');
      cell.append(mark);
      for (const s of order) labels.push(STATE_LABEL[s]);
    }
    if (n === today) { cell.classList.add('is-today'); cell.setAttribute('aria-current', 'date'); labels.push('bugün'); }
    if (labels.length) {
      const hid = document.createElement('span'); hid.className = 'visually-hidden';
      hid.textContent = `, ${utcDate(n).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long', timeZone: 'UTC' })}: ${labels.join(', ')}`;
      cell.append(hid);
    }
    grid.append(cell);
  }

  const [lo, hi] = monthRange();
  const idx = monthIndex(calMonth);
  $('cal-prev').disabled = idx <= lo;
  $('cal-next').disabled = idx >= hi;
}

function stepMonth(delta) {
  if (!state) return;
  calMonth = clampMonth(fromIndex(monthIndex(calMonth) + delta));
  renderCalendar();
}

/* ---------- Olaylar ---------- */
function summaryText(r) {
  const c = r.first;
  return `Tahmini yumurtlama: ${dateFull(c.ovulation)}. Doğurgan günler: ${rangeLong(c.fertileStart, c.fertileEnd)}. Sonraki adet: ${dateFull(c.nextPeriod)}. `
    + 'Bu bir tahmindir; tıbbi tavsiye değildir, doğum kontrol yöntemi olarak kullanılmaz.';
}

function run() {
  showError($('error'), '');
  try {
    state = computeOvulation({ lmp: $('lmp').value, cycle: $('cycle').value, period: $('period').value });
    render(state);
  } catch (e) {
    state = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('lmp').value = ''; $('cycle').value = '28'; $('period').value = '5';
  $('result').hidden = true; $('result').classList.remove('is-active'); state = null;
  showError($('error'), ''); $('copy-status').textContent = ''; $('lmp').focus();
});
$('cal-prev').addEventListener('click', () => stepMonth(-1));
$('cal-next').addEventListener('click', () => stepMonth(1));
$('copy').addEventListener('click', async () => {
  if (!state) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(state)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
