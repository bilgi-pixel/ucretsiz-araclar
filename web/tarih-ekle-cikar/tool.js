// Tarihe Gün Ekleme / Çıkarma — tamamı tarayıcıda çalışır; tarihler sunucuya gitmez.
// Hesap "takvim gün numarası" üzerinden yapılır (saat/saat dilimi kullanılmaz), UTC kayması olmaz.
// Paylaşım bağlantısı yalnızca adres çubuğundaki parametrelerdir (?t=&g=…); kimse bunları kaydetmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const UNIT_LABEL = { gun: 'gün', hafta: 'hafta', ay: 'ay', yil: 'yıl' };
const MAX_AMOUNT = 100000;
const MIN_YEAR = 1900, MAX_START_YEAR = 2200, MAX_RESULT_YEAR = 2999;
const DEFAULT_MULTI = '7, 15, 30, 60, 90, 180, 365';

/* ---------- Takvim yardımcıları ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNumber = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / 86400000);
/** Haftanın günü: 0 = Pazar … 6 = Cumartesi (1970-01-01 Perşembe). */
const dow = (n) => (((n + 4) % 7) + 7) % 7;
const pad = (n) => String(n).padStart(2, '0');
const fromNumber = (n) => { const t = new Date(n * 86400000); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; };
const isoOf = (t) => `${String(t.y).padStart(4, '0')}-${pad(t.m)}-${pad(t.d)}`;
const dateTR = (t) => `${t.d} ${MONTHS[t.m - 1]} ${t.y}`;
const dateDots = (t) => `${pad(t.d)}.${pad(t.m)}.${t.y}`;
const numOf = (t) => dayNumber(t.y, t.m, t.d);

export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (y < 1 || m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
export function todayLocal() {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}

/** Tarihe ay ekler/çıkarır; ay sonu taşmasında günü ayın son gününe sabitler (31 Ocak + 1 ay = 28 Şubat). */
function addMonths(a, months) {
  const total = a.m - 1 + months;
  const y = a.y + Math.floor(total / 12), m = ((total % 12) + 12) % 12 + 1;
  return { y, m, d: Math.min(a.d, daysInMonth(y, m)) };
}

/**
 * Başlangıç tarihine +/- süre ekler.
 * opts: { start:{y,m,d}, sign:+1|-1, amount, unit:'gun'|'hafta'|'ay'|'yil', business, useHolidays, holidays:Set, holidayYears:Set, roll }
 * Hata durumunda Türkçe, çözüm öneren Error fırlatır.
 */
export function computeAdd(opts) {
  const { start, sign, unit, business, useHolidays, holidays, holidayYears, roll, amount } = opts;
  if (!start) throw new Error('Başlangıç tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin (örn. 01.01.2026); 31 Nisan gibi var olmayan günler kabul edilmez.');
  if (start.y < MIN_YEAR || start.y > MAX_START_YEAR) throw new Error(`Başlangıç yılı ${MIN_YEAR} ile ${MAX_START_YEAR} arasında olmalıdır. Yılı kontrol edip tekrar seçin.`);
  if (!Number.isInteger(amount) || amount < 0 || amount > MAX_AMOUNT) throw new Error(`Süre 0 ile ${nf.format(MAX_AMOUNT)} arasında bir tam sayı olmalıdır. Ondalık ya da negatif değer yazmayın; çıkarmak için "Çıkar (öncesi)" seçeneğini kullanın.`);
  if (business && (unit === 'ay' || unit === 'yil')) throw new Error('İş günü sayımı yalnızca gün ve hafta birimiyle yapılır. Birimi "gün" yapıp süreyi iş günü olarak yazın ya da "Takvim günü" seçeneğine dönün.');
  const startN = numOf(start);
  const holiday = (n) => !!(useHolidays && holidays && holidays.has(isoOf(fromNumber(n))));
  const nonWorking = (n) => { const w = dow(n); return w === 0 || w === 6 || holiday(n); };

  let resultN, skippedWeekend = 0, skippedHoliday = 0, rolledFrom = null;
  if (business) {
    // İş günü: başlangıç günü sayılmaz; her adımda hafta sonu ve tatil atlanır.
    const count = amount * (unit === 'hafta' ? 5 : 1);
    resultN = startN;
    let left = count;
    while (left > 0) {
      resultN += sign;
      const w = dow(resultN);
      if (w === 0 || w === 6) { skippedWeekend++; continue; }
      if (holiday(resultN)) { skippedHoliday++; continue; }
      left--;
    }
  } else {
    if (unit === 'gun') resultN = startN + sign * amount;
    else if (unit === 'hafta') resultN = startN + sign * amount * 7;
    else {
      const months = sign * amount * (unit === 'yil' ? 12 : 1);
      const approxYear = start.y + Math.floor((start.m - 1 + months) / 12);
      if (approxYear < MIN_YEAR || approxYear > MAX_RESULT_YEAR) throw new Error(`Sonuç tarihi ${MIN_YEAR}–${MAX_RESULT_YEAR} aralığının dışına çıkıyor. Süreyi küçültüp tekrar deneyin.`);
      resultN = numOf(addMonths(start, months));
    }
    // Süre hesabı: son gün hafta sonu/tatile denk gelirse ilk iş gününe ötele (yalnızca "ekle" yönünde).
    if (roll && sign > 0 && nonWorking(resultN)) {
      rolledFrom = resultN;
      while (nonWorking(resultN)) resultN++;
    }
  }
  const result = fromNumber(resultN);
  if (result.y < MIN_YEAR || result.y > MAX_RESULT_YEAR) throw new Error(`Sonuç tarihi ${MIN_YEAR}–${MAX_RESULT_YEAR} aralığının dışına çıkıyor. Süreyi küçültüp tekrar deneyin.`);

  // Tatil verisi yalnızca belirli yılları kapsar; aralık başka yıla taşarsa uyarı için işaretle.
  let holidayWarning = false;
  if ((business || (roll && sign > 0)) && useHolidays) {
    const lo = fromNumber(Math.min(startN, resultN)).y, hi = fromNumber(Math.max(startN, resultN)).y;
    for (let y = lo; y <= hi; y++) if (!holidayYears || !holidayYears.has(y)) holidayWarning = true;
  }
  return {
    start, startN, result, resultN, sign, amount, unit, business: !!business, roll: !!roll,
    calendarDays: Math.abs(resultN - startN), skippedWeekend, skippedHoliday,
    rolledFrom: rolledFrom === null ? null : fromNumber(rolledFrom), holidayWarning,
    weekday: DAYS[dow(resultN)],
  };
}

/** "7, 15 30" → [7, 15, 30]; geçersiz öğede Türkçe Error. */
export function parseMulti(text) {
  const parts = String(text || '').split(/[\s,;]+/).filter(Boolean);
  if (parts.length > 20) throw new Error('Çoklu hesap listesine en fazla 20 süre yazabilirsiniz. Listeyi kısaltıp tekrar deneyin.');
  return parts.map((p) => {
    if (!/^\d+$/.test(p) || +p > MAX_AMOUNT) throw new Error(`Süre listesinde "${p}" geçersiz. Süreleri gün olarak, virgül ya da boşlukla ayırarak yazın (örn. 7, 15, 30).`);
    return +p;
  });
}

/* ---------- Arayüz ---------- */
let params = { guncelleme: '', yil: 2026, resmi_tatiller: [] };
let holidaySet = new Set();
let holidayYears = new Set();
let holidaysOk = false;
let last = null;

const val = (name) => document.querySelector(`input[name="${name}"]:checked`).value;

function syncBusiness() {
  const biz = val('cnt') === 'is';
  for (const o of $('unit').options) o.disabled = biz && (o.value === 'ay' || o.value === 'yil');
  if (biz && ($('unit').value === 'ay' || $('unit').value === 'yil')) $('unit').value = 'gun';
  $('biz-hint').textContent = biz ? 'İş günü sayımında yalnızca gün ve hafta kullanılır (1 hafta = 5 iş günü). Başlangıç günü sayılmaz.' : '';
}

function relativeToToday(n) {
  const diff = n - numOf(todayLocal());
  if (diff === 0) return 'Bugün';
  return diff > 0 ? `Bugünden ${nf.format(diff)} gün sonra` : `Bugünden ${nf.format(-diff)} gün önce`;
}

function readOptions() {
  return {
    start: parseISO($('start').value),
    sign: val('dir') === 'sub' ? -1 : 1,
    amount: $('amount').value.trim() === '' ? NaN : Number($('amount').value),
    unit: $('unit').value,
    business: val('cnt') === 'is',
    useHolidays: $('f-hol').checked,
    holidays: holidaySet,
    holidayYears,
    roll: $('f-roll').checked,
  };
}

function summaryText(r) {
  const unit = r.business ? (r.unit === 'hafta' ? 'hafta (iş günü)' : 'iş günü') : UNIT_LABEL[r.unit];
  const dir = r.sign > 0 ? 'sonra' : 'önce';
  return `${dateTR(r.start)} ${DAYS[dow(r.startN)]} tarihinden ${nf.format(r.amount)} ${unit} ${dir}: ${dateTR(r.result)} ${r.weekday}.`;
}

function render(r, multiRows) {
  $('r-main').textContent = `${dateTR(r.result)} ${r.weekday}`;
  $('r-date').textContent = dateDots(r.result);
  $('r-iso').textContent = isoOf(r.result);
  $('r-weekday').textContent = r.weekday;
  $('r-today').textContent = relativeToToday(r.resultN);
  $('r-cal').textContent = `${nf.format(r.calendarDays)} gün`;
  $('row-skip').hidden = !r.business;
  if (r.business) $('r-skip').textContent = `${nf.format(r.skippedWeekend)} hafta sonu, ${nf.format(r.skippedHoliday)} resmî tatil`;
  const notes = [`Başlangıç: ${dateTR(r.start)} ${DAYS[dow(r.startN)]}. Başlangıç günü sayılmaz; sonuç ${r.sign > 0 ? 'ileri' : 'geri'} doğru sayılarak bulundu.`];
  if (r.rolledFrom) notes.push(`Süre ${dateTR(r.rolledFrom)} ${DAYS[dow(numOf(r.rolledFrom))]} gününe denk geldi; hafta sonu ya da resmî tatil olduğu için ilk iş gününe ötelendi.`);
  if (!r.business && (r.unit === 'ay' || r.unit === 'yil') && r.start.d > 28) notes.push('Hedef ayda o gün yoksa sonuç ayın son gününe sabitlenir.');
  if (r.holidayWarning) notes.push(`Resmî tatil verisi yalnızca ${[...holidayYears].sort().join(', ') || '2026'} yılı için vardır; aralığın diğer yıllarında yalnızca hafta sonları dikkate alındı.`);
  if (r.business && $('f-hol').checked) notes.push('Arife yarım günleri ve köprü/idari izin günleri tatil sayılmaz; dini bayram tarihlerini resmî kaynaktan doğrulayın.');
  if (!holidaysOk && (r.business || r.roll) && $('f-hol').checked) notes.push('Resmî tatil listesi yüklenemedi; yalnızca hafta sonları dikkate alındı. Sayfayı yenileyip tekrar deneyin.');
  $('r-note').textContent = notes.join(' ');

  const tbody = $('multi-body');
  tbody.textContent = '';
  $('multi-wrap').hidden = multiRows.length === 0;
  for (const m of multiRows) {
    const tr = document.createElement('tr');
    const c1 = document.createElement('th'); c1.scope = 'row'; c1.textContent = `${nf.format(m.amount)} gün`;
    const c2 = document.createElement('td'); c2.textContent = `${dateTR(m.result)}${m.rolledFrom ? ' (ötelendi)' : ''}`;
    const c3 = document.createElement('td'); c3.textContent = m.weekday;
    tr.append(c1, c2, c3); tbody.append(tr);
  }
  $('multi-cap').textContent = `Aynı başlangıç (${dateTR(r.start)}) ve sayım türüyle ${r.sign > 0 ? 'sonraki' : 'önceki'} tarihler`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

/** Paylaşılabilir bağlantıyı üretir (yalnızca adres parametreleri). */
function shareUrl(o, multiText) {
  const q = new URLSearchParams();
  q.set('t', isoOf(o.start));
  q.set('g', String(o.sign * o.amount));
  if (o.unit !== 'gun') q.set('b', o.unit);
  if (o.business) q.set('m', 'is');
  if (!o.useHolidays) q.set('th', '0');
  if (o.roll) q.set('r', '1');
  if (multiText && multiText !== DEFAULT_MULTI) q.set('c', multiText.replace(/\s+/g, ''));
  return `${location.origin}${location.pathname}?${q.toString()}`;
}

async function run() {
  showError($('error'), '');
  await paramsReady; // tatil listesi yüklenmeden hesap yapılmaz
  try {
    const o = readOptions();
    last = computeAdd(o);
    const multiText = $('multi').value.trim();
    const list = parseMulti(multiText);
    const multiRows = list.map((n) => computeAdd({ ...o, amount: n, unit: 'gun' }));
    render(last, multiRows);
    last.url = shareUrl(o, multiText);
    history.replaceState(null, '', last.url);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('http');
    params = await res.json();
    holidaysOk = true;
  } catch { /* çevrimdışı/önbellek sorunu: tatil listesi boş kalır, sonuçta uyarı gösterilir */ }
  holidaySet = new Set((params.resmi_tatiller || []).map((h) => h.tarih));
  holidayYears = new Set((params.resmi_tatiller || []).map((h) => +String(h.tarih).slice(0, 4)));
  const d = parseISO(params.guncelleme);
  $('rates-updated').textContent = d ? dateTR(d) : (params.guncelleme || 'bilinmiyor');
  $('hol-year').textContent = holidayYears.size ? [...holidayYears].sort().join(', ') : '2026';
}

/** Adres çubuğundaki parametreleri forma yükler; parametre varsa true. */
function applyQuery() {
  const q = new URLSearchParams(location.search);
  if (!q.has('g') && !q.has('t')) return false;
  const g = q.get('g');
  if (g !== null && /^-?\d+$/.test(g)) {
    const n = Number(g);
    $(n < 0 ? 'dir-sub' : 'dir-add').checked = true;
    $('amount').value = String(Math.abs(n));
  }
  const b = q.get('b');
  if (b && UNIT_LABEL[b]) $('unit').value = b;
  $(q.get('m') === 'is' ? 'cnt-biz' : 'cnt-cal').checked = true;
  $('f-hol').checked = q.get('th') !== '0';
  $('f-roll').checked = q.get('r') === '1';
  if (q.get('c')) $('multi').value = q.get('c').split(',').join(', ');
  if (q.get('t') && parseISO(q.get('t'))) $('start').value = q.get('t');
  syncBusiness();
  return true;
}

function reset() {
  $('start').value = isoOf(todayLocal());
  $('amount').value = '90'; $('unit').value = 'gun';
  $('dir-add').checked = true; $('cnt-cal').checked = true;
  $('f-hol').checked = true; $('f-roll').checked = false;
  $('multi').value = DEFAULT_MULTI;
  syncBusiness();
}

const paramsReady = loadParams();

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
document.querySelectorAll('input[name="cnt"]').forEach((el) => el.addEventListener('change', syncBusiness));
document.querySelectorAll('[data-quick]').forEach((b) => b.addEventListener('click', () => {
  $('amount').value = b.dataset.quick; $('unit').value = 'gun';
  run();
}));
$('clear').addEventListener('click', () => {
  reset();
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
  history.replaceState(null, '', location.pathname);
  $('start').focus();
});
async function copy(text, okMsg) {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(text); st.textContent = okMsg; }
  catch { st.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
}
$('copy').addEventListener('click', () => { if (last) copy(summaryText(last), 'Sonuç panoya kopyalandı.'); });
$('copy-link').addEventListener('click', () => { if (last) copy(last.url, 'Bağlantı panoya kopyalandı. Aynı hesabı açmak için kullanabilirsiniz.'); });

reset();
if (applyQuery()) run();
