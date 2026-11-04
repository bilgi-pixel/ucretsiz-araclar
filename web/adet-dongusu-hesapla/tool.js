// Adet Döngüsü Hesaplama — sonraki regl tarihleri, döngü düzeni, takvim ve .ics dosyası.
// Tamamı tarayıcıda çalışır; tarihler sunucuya gitmez. İsteğe bağlı kayıt yalnızca açık onayla ve
// yalnızca bu tarayıcının localStorage alanına yapılır; "Verileri sil" ile anında silinir.
// Tüm tarih hesabı "gün numarası" (UTC gece yarısı / 86400000) üzerinden yapılır; saat dilimi ve
// yaz saati geçişleri sonucu bir gün kaydırmaz.
// Bilgilendirme amaçlıdır; doğum kontrol yöntemi değildir, tıbbi tavsiye değildir.
import { showError, downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DAY_MS = 86400000;
export const STORE_KEY = 'ba-adet-dongusu-hesapla-v1';

/** Girdi sınırları (arayüz kuralı; tıbbi değerler parametreler.json'dadır). */
export const LIMITS = {
  cycleMin: 21, cycleMax: 45, adultCycleMax: 35,
  periodMin: 2, periodMax: 10, periodNormalMax: 7,
  countMin: 1, countMax: 12, historyMin: 2, historyMax: 5,
  minGap: 10, yearMin: 2000, yearMax: 2100,
};

/** Varsayılan tıbbi parametreler; parametreler.json yüklenince üzerine yazılır. */
let P = {
  guncelleme: '2026-11-04',
  kaynak_kisa: 'T.C. Sağlık Bakanlığı Evlilik Öncesi Danışmanlık Rehberi; ACOG hasta bilgilendirme sayfaları ve Committee Opinion No. 651',
  luteal_gun: 14, dogurgan_once: 5, dogurgan_sonra: 1,
  duzenli_fark_ust: 7, sinirda_fark_ust: 9,
};

/* ---------- Takvim yardımcıları ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; // m: 1-12
/** Gün numarası: saat diliminden ve yaz saatinden bağımsız tam sayı. */
export const dayNumber = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
const fromDayNumber = (n) => { const dt = new Date(n * DAY_MS); return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() }; };
const utcDate = (n) => new Date(n * DAY_MS);

/** "YYYY-MM-DD" → {y,m,d}; 30 Şubat gibi geçersiz tarihlerde null. */
export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s ?? '').trim());
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
const pad = (v, n = 2) => String(v).padStart(n, '0');
/** Gün numarası → "YYYY-MM-DD" */
export function toISO(n) { const t = fromDayNumber(n); return `${pad(t.y, 4)}-${pad(t.m)}-${pad(t.d)}`; }
/** Gün numarası → "YYYYMMDD" (iCalendar DATE biçimi) */
const toICSDate = (n) => toISO(n).replace(/-/g, '');
/** "YYYY-MM-DD" tarihine gün ekler (test ve kenar durum doğrulaması için). */
export function addDaysISO(iso, days) { const t = parseISO(iso); return t ? toISO(dayNumber(t.y, t.m, t.d) + days) : null; }

/** Cihazın yerel takvimine göre bugünün gün numarası. */
export const todayNumber = () => { const n = new Date(); return dayNumber(n.getFullYear(), n.getMonth() + 1, n.getDate()); };

const fmt = (n, opts) => utcDate(n).toLocaleDateString('tr-TR', { timeZone: 'UTC', ...opts });
/** "29 Ocak 2026 Perşembe" */
const dateFull = (n) => fmt(n, { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
/** "29 Ocak 2026" */
const dateLong = (n) => fmt(n, { day: 'numeric', month: 'long', year: 'numeric' });
/** "29 Oca" */
const dateShort = (n) => fmt(n, { day: 'numeric', month: 'short' });
/** "10 Ocak – 16 Ocak 2026" (yıl farklıysa iki yıl da yazılır) */
function rangeLong(a, b) {
  const sameYear = utcDate(a).getUTCFullYear() === utcDate(b).getUTCFullYear();
  return `${fmt(a, sameYear ? { day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long', year: 'numeric' })} – ${dateLong(b)}`;
}
/** "10–16 Oca" ya da "28 Oca – 3 Şub" */
function rangeShort(a, b) {
  const da = utcDate(a), db = utcDate(b);
  if (da.getUTCMonth() === db.getUTCMonth() && da.getUTCFullYear() === db.getUTCFullYear()) return `${da.getUTCDate()}–${dateShort(b)}`;
  return `${dateShort(a)} – ${dateShort(b)}`;
}
const nf1 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });

/* ---------- Saf hesap ---------- */
const parseIntStrict = (v) => (/^\d{1,3}$/.test(String(v ?? '').trim()) ? Number(String(v).trim()) : NaN);

/**
 * Geçmiş adet başlangıçlarından döngü istatistiği. lmpN: son adet gün numarası; list: önceki tarihler ("YYYY-MM-DD", sıra serbest).
 * Döngü düzeni: en uzun − en kısa döngü farkı ≤ 7 gün düzenli, 8–9 sınırda, ≥ 10 düzensiz (ACOG: 7–9 günden fazla değişim düzensizdir).
 */
export function cycleStats(lmpN, list, p = P) {
  const raw = (list || []).map((s) => String(s ?? '').trim()).filter(Boolean);
  const nums = [];
  for (const s of raw) {
    const t = parseISO(s);
    if (!t || t.y < LIMITS.yearMin || t.y > LIMITS.yearMax) throw new Error(`Önceki adet tarihlerinden biri geçersiz (${s}). Tarihi takvimden yeniden seçin; yıl ${LIMITS.yearMin}–${LIMITS.yearMax} arasında olmalıdır.`);
    nums.push(dayNumber(t.y, t.m, t.d));
  }
  if (nums.length < LIMITS.historyMin) {
    throw new Error('Geçmiş tarihlerden hesap için son adet tarihine ek olarak en az 2 önceki adet başlangıç tarihi girin (toplam 3–6 tarih). Kaydınız yoksa "Döngü uzunluğumu biliyorum" seçeneğiyle 28 gün kullanın.');
  }
  if (nums.some((x) => x >= lmpN)) {
    throw new Error('Önceki adet tarihleri, son adet başlangıç tarihinden önce olmalıdır. En yeni tarihi "Son adet başlangıç tarihi" alanına, daha eskileri aşağıdaki alanlara yazın.');
  }
  const all = [...nums, lmpN].sort((a, b) => a - b);
  for (let i = 1; i < all.length; i++) {
    if (all[i] === all[i - 1]) throw new Error(`${dateLong(all[i])} tarihi iki kez girilmiş. Her alana farklı bir adetin ilk gününü yazın.`);
  }
  const intervals = [];
  for (let i = 1; i < all.length; i++) intervals.push(all[i] - all[i - 1]);
  const tooShort = intervals.findIndex((d) => d < LIMITS.minGap);
  if (tooShort >= 0) {
    throw new Error(`${dateLong(all[tooShort])} ile ${dateLong(all[tooShort + 1])} arasında yalnızca ${intervals[tooShort]} gün var. Her tarih ayrı bir adetin ilk günü olmalı; aynı adetin farklı günlerini girmiş olabilirsiniz.`);
  }
  const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const min = Math.min(...intervals), max = Math.max(...intervals);
  const spread = max - min;
  const verdict = spread <= p.duzenli_fark_ust ? 'regular' : spread <= p.sinirda_fark_ust ? 'borderline' : 'irregular';
  const cycles = intervals.map((d, i) => ({ from: all[i], to: all[i + 1], days: d }));
  const outOfRange = cycles.filter((c) => c.days < LIMITS.cycleMin || c.days > LIMITS.cycleMax);
  return { dates: all, intervals, cycles, avg, used: Math.round(avg), min, max, spread, verdict, outOfRange };
}

/**
 * Sonraki N adet tarihini, yumurtlama ve doğurgan pencereyi hesaplar. Hatalı girdide Türkçe, çözüm öneren Error fırlatır.
 * input: { mode: 'known'|'history', lmp, cycle, period, count, history: [...] }
 */
export function computeCycles(input, todayN = todayNumber(), p = P) {
  const { mode = 'known', lmp, cycle, period, count = 6, history = [] } = input || {};
  const lmpStr = String(lmp ?? '').trim();
  if (!lmpStr) throw new Error('Son adet başlangıç tarihini girin. Takvim simgesinden son adet kanamanızın ilk gününü seçin (örn. 01.01.2026).');
  const start = parseISO(lmpStr);
  if (!start) throw new Error('Son adet başlangıç tarihi okunamadı. Tarihi takvimden yeniden seçin (gün.ay.yıl).');
  if (start.y < LIMITS.yearMin || start.y > LIMITS.yearMax) throw new Error(`Son adet tarihi ${LIMITS.yearMin}–${LIMITS.yearMax} yılları arasında olmalıdır. Yılı kontrol edip tarihi yeniden seçin.`);
  const lmpN = dayNumber(start.y, start.m, start.d);

  const periodLen = parseIntStrict(period);
  if (Number.isNaN(periodLen)) throw new Error('Adet süresini gün olarak tam sayı yazın (örn. 5). Kanamanın sürdüğü gün sayısını girin.');

  let cycleLen, hist = null;
  if (mode === 'history') {
    hist = cycleStats(lmpN, history, p);
    cycleLen = hist.used;
  } else {
    cycleLen = parseIntStrict(cycle);
    if (Number.isNaN(cycleLen)) throw new Error('Döngü uzunluğunu gün olarak tam sayı yazın (örn. 28). Bilmiyorsanız 28 bırakın ya da "Geçmiş adet tarihlerimden hesapla" seçeneğini kullanın.');
  }
  // Alanlar karıştırıldığında (döngüye 5, süreye 28 yazmak gibi) bu kontrol aralık kontrolünden önce yapılır.
  if (periodLen >= cycleLen) {
    throw new Error(`Adet süresi (${periodLen} gün) döngü uzunluğundan (${cycleLen} gün) kısa olmalıdır. Döngü, bir adetin ilk gününden sonrakinin ilk gününe kadar sayılır; iki alanı karıştırmış olabilirsiniz.`);
  }
  if (cycleLen < LIMITS.cycleMin || cycleLen > LIMITS.cycleMax) {
    const what = hist ? `Tarihlerinizden hesaplanan ortalama döngü ${cycleLen} gün` : `Girdiğiniz döngü ${cycleLen} gün`;
    throw new Error(`Düzensiz döngü, hekime danışın: ${what}; bu, 21–45 gün aralığının dışında. Bu aralığın dışındaki döngülerde takvim tahmini güvenilir olmaz. Değeri yanlış yazdıysanız düzeltin (örn. 28).`);
  }
  if (periodLen < LIMITS.periodMin || periodLen > LIMITS.periodMax) {
    throw new Error(`Adet süresi ${LIMITS.periodMin}–${LIMITS.periodMax} gün arasında olmalıdır (örn. 5). 7 günden uzun süren kanamalar için hekiminize danışın.`);
  }
  const n = parseIntStrict(count);
  if (!(n >= LIMITS.countMin && n <= LIMITS.countMax)) throw new Error('Gösterilecek döngü sayısı 1 ile 12 arasında olmalıdır. Listeden bir değer seçin.');

  const periods = [];
  for (let k = 1; k <= n; k++) {
    const s = lmpN + k * cycleLen;            // tahmini adet başlangıcı
    const ov = s - p.luteal_gun;              // yumurtlama: sonraki adetten luteal gün kadar önce
    periods.push({ index: k, start: s, end: s + periodLen - 1, ovulation: ov, fertileStart: ov - p.dogurgan_once, fertileEnd: ov + p.dogurgan_sonra });
  }
  const first = periods[0];
  return {
    mode, lmpN, cycleLen, periodLen, count: n, periods, first, hist, todayN,
    entered: { start: lmpN, end: lmpN + periodLen - 1 },
    cycleDay: todayN >= lmpN ? todayN - lmpN + 1 : null,
    daysLeft: first.start - todayN,
    future: lmpN > todayN,
    stale: todayN > first.start,
    adultLong: cycleLen > LIMITS.adultCycleMax,
    longPeriod: periodLen > LIMITS.periodNormalMax,
    calStart: lmpN, calEnd: periods[n - 1].end,
  };
}

/** Bir günün durumları: 'period', 'fertile', 'ovulation' (birden çok olabilir). */
export function dayStates(n, r) {
  const s = [];
  if ((n >= r.entered.start && n <= r.entered.end) || r.periods.some((c) => n >= c.start && n <= c.end)) s.push('period');
  if (r.periods.some((c) => n >= c.fertileStart && n <= c.fertileEnd)) s.push('fertile');
  if (r.periods.some((c) => n === c.ovulation)) s.push('ovulation');
  return s;
}

/* ---------- iCalendar (.ics) ---------- */
/** RFC 5545 TEXT kaçışı. */
const icsText = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
/** 75 sekizliyi aşan satırları UTF-8 karakterlerini bölmeden katlar. */
function foldLine(line) {
  const enc = new TextEncoder();
  const out = [];
  let cur = '', bytes = 0, limit = 75;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    if (bytes + b > limit) { out.push(cur); cur = ' '; bytes = 1; limit = 75; }
    cur += ch; bytes += b;
  }
  out.push(cur);
  return out.join('\r\n');
}
const icsStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/**
 * Tahmini adetleri (isteğe bağlı doğurgan pencere/yumurtlama ve hatırlatıcıyla) iCalendar metnine çevirir.
 * Tüm gün etkinlikleri: DTEND hariç tutulan gündür (bitiş + 1).
 */
export function buildICS(r, { fertile = false, alarm = false, now = new Date() } = {}) {
  const NOTE = 'Bilgilendirme amaçlıdır, doğum kontrol yöntemi değildir, tıbbi tavsiye değildir. Bilişim Ajans Adet Döngüsü Hesaplama ile tarayıcıda oluşturuldu.';
  const stamp = icsStamp(now);
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bilisim Ajans//Adet Dongusu Hesaplama//TR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:' + icsText('Tahmini adet takvimi')];
  const ev = (uid, startN, endN, summary, desc, withAlarm) => {
    L.push('BEGIN:VEVENT', `UID:${uid}@araclar.bilisimajans.com`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${toICSDate(startN)}`, `DTEND;VALUE=DATE:${toICSDate(endN + 1)}`,
      'SUMMARY:' + icsText(summary), 'DESCRIPTION:' + icsText(desc), 'TRANSP:TRANSPARENT');
    if (withAlarm) L.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + icsText('Yarın tahmini adet başlangıcı'), 'TRIGGER:-P1D', 'END:VALARM');
    L.push('END:VEVENT');
  };
  for (const c of r.periods) {
    ev(`adet-${toICSDate(c.start)}`, c.start, c.end, `Tahmini adet (${c.index}/${r.count})`,
      `Tahmini adet: ${rangeLong(c.start, c.end)} (${r.periodLen} gün). Döngü uzunluğu ${r.cycleLen} gün. ${NOTE}`, alarm);
    if (fertile) {
      ev(`dogurgan-${toICSDate(c.fertileStart)}`, c.fertileStart, c.fertileEnd, 'Tahmini doğurgan pencere',
        `Tahmini doğurgan günler: ${rangeLong(c.fertileStart, c.fertileEnd)}. ${NOTE}`, false);
      ev(`yumurtlama-${toICSDate(c.ovulation)}`, c.ovulation, c.ovulation, 'Tahmini yumurtlama günü',
        `Tahmini yumurtlama: ${dateLong(c.ovulation)} (sonraki adetten ${P.luteal_gun} gün önce). ${NOTE}`, false);
    }
  }
  L.push('END:VCALENDAR');
  return L.map(foldLine).join('\r\n') + '\r\n';
}

/* ---------- Parametreler ---------- */
async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) P = { ...P, ...(await res.json()) };
  } catch (e) { /* çevrimdışı önbellekte olmayabilir; varsayılanlar kullanılır */ }
  const line = $('params-line');
  if (line) {
    const t = parseISO(P.guncelleme);
    const when = t ? dateLong(dayNumber(t.y, t.m, t.d)) : P.guncelleme;
    line.textContent = `Parametreler ${when} tarihinde güncellendi. Kaynak: ${P.kaynak_kisa || P.kaynak}.`;
  }
}

/* ---------- Arayüz ---------- */
let state = null;     // son hesap sonucu
let calMonth = null;  // { y, m } gösterilen ay

const show = (el, on) => { el.hidden = !on; };
function setDate(id, n, text) { const el = $(id); el.textContent = text; el.dataset.iso = toISO(n); }
function setRange(id, a, b, text) { const el = $(id); el.textContent = text; el.dataset.start = toISO(a); el.dataset.end = toISO(b); }

const VERDICT = {
  regular: 'Düzenli görünüyor: en kısa ve en uzun döngünüz arasındaki fark 7 günü aşmıyor.',
  borderline: 'Sınırda: fark 8–9 gün. Yaşa göre normal sayılabilir; tahminler birkaç gün kayabilir.',
  irregular: 'Düzensiz görünüyor: fark 9 günü aşıyor. Takvim tahmini güvenilir olmayabilir; hekime danışın.',
};

function render(r) {
  const c = r.first;
  // Özet cümlesi
  const sum = $('r-summary');
  sum.textContent = '';
  const strong = document.createElement('strong'); strong.textContent = dateFull(c.start);
  sum.append('Sonraki adetiniz tahminen ', strong, ` günü başlar ve ${dateFull(c.end)} gününe kadar sürer (${r.periodLen} gün).`);

  setDate('r-next', c.start, dateFull(c.start));
  setDate('r-next-end', c.end, dateFull(c.end));
  setDate('r-ovulation', c.ovulation, dateFull(c.ovulation));
  setRange('r-fertile', c.fertileStart, c.fertileEnd, rangeLong(c.fertileStart, c.fertileEnd));

  const cd = $('r-cycleday');
  if (r.cycleDay === null) { cd.textContent = '— (girdiğiniz tarih gelecekte)'; cd.dataset.day = ''; }
  else {
    cd.textContent = `${r.cycleDay}. gün` + (r.cycleDay > r.cycleLen ? ` (${r.cycleLen} günlük döngü aşıldı)` : '');
    cd.dataset.day = String(r.cycleDay);
  }
  const dl = $('r-daysleft');
  dl.dataset.days = String(r.daysLeft);
  dl.textContent = r.daysLeft > 0 ? `${r.daysLeft} gün kaldı` : r.daysLeft === 0 ? 'Bugün bekleniyor' : `Beklenen tarih ${-r.daysLeft} gün önceydi`;
  $('r-cycle').textContent = `${r.cycleLen} gün` + (r.hist ? ` (son ${r.hist.intervals.length} döngünüzün ortalaması)` : '');
  $('r-cycle').dataset.days = String(r.cycleLen);

  // Döngü geçmişi
  show($('hist'), !!r.hist);
  if (r.hist) {
    const h = r.hist;
    const avgTxt = `${nf1.format(Math.round(h.avg * 10) / 10)} gün`;
    $('r-avg').textContent = h.avg === h.used ? avgTxt : `${avgTxt} (hesapta ${h.used} gün kullanıldı)`;
    $('r-avg').dataset.avg = String(h.avg);
    $('r-range').textContent = `${h.min}–${h.max} gün`;
    $('r-spread').textContent = `${h.spread} gün`;
    $('r-spread').dataset.days = String(h.spread);
    const v = $('r-verdict'); v.textContent = VERDICT[h.verdict]; v.dataset.verdict = h.verdict;
    const ul = $('r-intervals'); ul.textContent = '';
    for (const cy of h.cycles) {
      const li = document.createElement('li');
      li.textContent = `${rangeShort(cy.from, cy.to)}: ${cy.days} gün`;
      li.dataset.days = String(cy.days);
      ul.append(li);
    }
  }

  // Notlar
  show($('r-future'), r.future);
  const irr = $('r-irregular');
  const outs = r.hist ? r.hist.outOfRange : [];
  show(irr, outs.length > 0);
  if (outs.length) irr.textContent = `Düzensiz döngü, hekime danışın: girdiğiniz tarihler arasında 21–45 gün aralığının dışında kalan döngü var (${outs.map((o) => o.days + ' gün').join(', ')}). Bu durumda tahminler güvenilir olmayabilir.`;
  show($('r-adult'), r.adultLong);
  show($('r-longperiod'), r.longPeriod);
  const stale = $('r-stale');
  show(stale, r.stale);
  if (r.stale) $('r-stale-date').textContent = dateLong(c.start);

  // Sonraki N adet listesi
  $('list-title').textContent = `Önümüzdeki ${r.count} adet (tahmini)`;
  const list = $('period-list'); list.textContent = '';
  for (const p of r.periods) {
    const li = document.createElement('li');
    li.dataset.start = toISO(p.start); li.dataset.end = toISO(p.end); li.dataset.ovulation = toISO(p.ovulation);
    const b = document.createElement('strong'); b.textContent = `${p.index}. adet: ${rangeLong(p.start, p.end)}`;
    const s = document.createElement('small');
    s.textContent = `Önceki yumurtlama: ${dateShort(p.ovulation)} · Doğurgan pencere: ${rangeShort(p.fertileStart, p.fertileEnd)}`;
    li.append(b, s);
    list.append(li);
  }

  // Takvim: girilen son adetin ayından başlar
  const a = fromDayNumber(r.calStart);
  calMonth = { y: a.y, m: a.m };
  renderCalendar();

  $('ics-status').textContent = '';
  const res = $('result');
  res.hidden = false; res.classList.add('is-active');
}

/* Takvim */
const monthIndex = (t) => t.y * 12 + (t.m - 1);
const fromIndex = (i) => ({ y: Math.floor(i / 12), m: (i % 12) + 1 });
function monthRange() {
  const a = fromDayNumber(state.calStart), b = fromDayNumber(state.calEnd);
  return [monthIndex(a), monthIndex(b)];
}
const STATE_LABEL = { period: 'adet günü', fertile: 'doğurgan gün', ovulation: 'tahmini yumurtlama günü' };
const STATE_LETTER = { period: 'A', fertile: 'D', ovulation: 'Y' };

function renderCalendar() {
  const grid = $('cal-grid');
  grid.textContent = '';
  const { y, m } = calMonth;
  $('cal-title').textContent = fmt(dayNumber(y, m, 1), { month: 'long', year: 'numeric' });
  for (const wd of ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']) {
    const h = document.createElement('div'); h.className = 'ad-cal-h'; h.setAttribute('aria-hidden', 'true'); h.textContent = wd; grid.append(h);
  }
  const firstN = dayNumber(y, m, 1);
  const lead = (utcDate(firstN).getUTCDay() + 6) % 7; // pazartesi başlangıçlı hafta
  for (let i = 0; i < lead; i++) { const b = document.createElement('div'); b.className = 'ad-cal-b'; b.setAttribute('aria-hidden', 'true'); grid.append(b); }
  const today = todayNumber();
  for (let d = 1; d <= daysInMonth(y, m); d++) {
    const n = firstN + d - 1;
    const states = dayStates(n, state);
    const cell = document.createElement('div');
    cell.className = 'ad-cal-d' + states.map((s) => ` is-${s}`).join('');
    cell.dataset.iso = toISO(n);
    const num = document.createElement('span'); num.className = 'ad-cal-n'; num.textContent = String(d); num.setAttribute('aria-hidden', 'true');
    cell.append(num);
    if (states.length) {
      // Yumurtlama günü zaten doğurgan penceredir; harf işaretinde yalnızca Y yazılır.
      const letters = ['period', 'ovulation', 'fertile'].filter((s) => states.includes(s) && !(s === 'fertile' && states.includes('ovulation')));
      const mark = document.createElement('span'); mark.className = 'ad-cal-m'; mark.setAttribute('aria-hidden', 'true');
      mark.textContent = letters.map((s) => STATE_LETTER[s]).join(' ');
      cell.append(mark);
    }
    const labels = states.map((s) => STATE_LABEL[s]);
    if (n === today) { cell.classList.add('is-today'); cell.setAttribute('aria-current', 'date'); labels.push('bugün'); }
    const hid = document.createElement('span'); hid.className = 'visually-hidden';
    hid.textContent = fmt(n, { day: 'numeric', month: 'long', weekday: 'long' }) + (labels.length ? ': ' + labels.join(', ') : '');
    cell.append(hid);
    grid.append(cell);
  }
  const [lo, hi] = monthRange();
  const idx = monthIndex(calMonth);
  $('cal-prev').disabled = idx <= lo;
  $('cal-next').disabled = idx >= hi;
}
function stepMonth(delta) {
  if (!state) return;
  const btn = $(delta < 0 ? 'cal-prev' : 'cal-next');
  const hadFocus = document.activeElement === btn;
  const [lo, hi] = monthRange();
  calMonth = fromIndex(Math.max(lo, Math.min(hi, monthIndex(calMonth) + delta)));
  renderCalendar();
  // Son/ilk aya gelince düğme devre dışı kalır ve odak kaybolur; klavye kullanıcısı için odak diğer düğmeye geçer.
  if (hadFocus && btn.disabled) $(delta < 0 ? 'cal-next' : 'cal-prev').focus();
}

/* Form */
const HIST_IDS = ['h1', 'h2', 'h3', 'h4', 'h5'];
const currentMode = () => ($('mode-history').checked ? 'history' : 'known');
function syncMode() {
  const hist = currentMode() === 'history';
  $('known-fields').hidden = hist;
  $('history-fields').hidden = !hist;
}
function readForm() {
  return {
    mode: currentMode(), lmp: $('lmp').value, cycle: $('cycle').value, period: $('period').value,
    count: $('count').value, history: HIST_IDS.map((id) => $(id).value),
  };
}

function run({ save = true } = {}) {
  showError($('error'), '');
  try {
    state = computeCycles(readForm());
    render(state);
    if (save && $('remember').checked) saveStore();
  } catch (e) {
    state = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

/* ---------- İsteğe bağlı yerel kayıt (yalnızca açık onayla) ---------- */
function storage() {
  // Gizli pencere ya da engelli depolamada erişim hata fırlatabilir; o durumda kayıt özelliği kapanır.
  try { return window.localStorage || null; } catch { return null; }
}
const storeStatus = (msg) => { $('store-status').textContent = msg; };
function saveStore() {
  const s = storage();
  if (!s) { storeStatus('Tarayıcınız yerel kayda izin vermiyor (gizli pencere olabilir); veriler kaydedilmedi.'); return; }
  const f = readForm();
  const data = { v: 1, mode: f.mode, lmp: f.lmp, cycle: f.cycle, period: f.period, count: f.count, history: f.history.filter(Boolean) };
  try { s.setItem(STORE_KEY, JSON.stringify(data)); storeStatus('Girdileriniz yalnızca bu cihazdaki tarayıcıya kaydedildi.'); }
  catch { storeStatus('Kayıt yapılamadı (depolama dolu ya da engelli). Hesap yine de çalışır.'); }
}
function clearStore() { const s = storage(); if (s) { try { s.removeItem(STORE_KEY); } catch { /* yok say */ } } }

/** Kayıtlı veriyi okur; bozuksa siler ve false döndürür. Sayfa hiçbir durumda çökmez. */
function restoreStore() {
  const s = storage();
  if (!s) { $('remember').disabled = true; storeStatus('Bu tarayıcıda yerel kayıt kullanılamıyor; hesap kayıt olmadan çalışır.'); return false; }
  let raw = null;
  try { raw = s.getItem(STORE_KEY); } catch { return false; }
  if (raw === null) return false;
  let d = null;
  try { d = JSON.parse(raw); } catch { d = null; }
  const okStr = (v, re) => typeof v === 'string' && re.test(v);
  if (!d || typeof d !== 'object' || !okStr(d.lmp, /^\d{4}-\d{2}-\d{2}$/)) {
    clearStore();
    storeStatus('Bu cihazdaki kayıt okunamadı ve silindi. Bilgilerinizi yeniden girin.');
    return false;
  }
  $('lmp').value = d.lmp;
  if (okStr(d.cycle, /^\d{1,3}$/)) $('cycle').value = d.cycle;
  if (okStr(d.period, /^\d{1,2}$/)) $('period').value = d.period;
  if (okStr(d.count, /^\d{1,2}$/) && +d.count >= 1 && +d.count <= 12) $('count').value = d.count;
  const hist = Array.isArray(d.history) ? d.history.filter((v) => okStr(v, /^\d{4}-\d{2}-\d{2}$/)).slice(0, HIST_IDS.length) : [];
  HIST_IDS.forEach((id, i) => { $(id).value = hist[i] || ''; });
  $(d.mode === 'history' ? 'mode-history' : 'mode-known').checked = true;
  syncMode();
  $('remember').checked = true;
  storeStatus('Bu cihazda kayıtlı girdileriniz yüklendi. İstemiyorsanız "Verileri sil" düğmesine basın.');
  return true;
}

/* ---------- Olaylar ---------- */
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('mode-known').addEventListener('change', syncMode);
$('mode-history').addEventListener('change', syncMode);
$('clear').addEventListener('click', () => {
  $('lmp').value = ''; $('cycle').value = '28'; $('period').value = '5'; $('count').value = '6';
  HIST_IDS.forEach((id) => { $(id).value = ''; });
  $('mode-known').checked = true; syncMode();
  state = null; $('result').hidden = true; $('result').classList.remove('is-active');
  showError($('error'), ''); $('lmp').focus();
});
$('cal-prev').addEventListener('click', () => stepMonth(-1));
$('cal-next').addEventListener('click', () => stepMonth(1));
$('ics').addEventListener('click', () => {
  if (!state) return;
  const text = buildICS(state, { fertile: $('ics-fertile').checked, alarm: $('ics-alarm').checked });
  downloadBlob(new Blob([text], { type: 'text/calendar;charset=utf-8' }), `adet-takvimi-${toISO(state.first.start)}.ics`);
  $('ics-status').textContent = `${state.count} tahmini adet içeren takvim dosyası indirildi. Takvim uygulamanızda "İçe aktar" ile açın.`;
});
$('remember').addEventListener('change', () => {
  if ($('remember').checked) {
    if (state) saveStore();
    else storeStatus('Onay verildi: bir sonraki hesaplamada girdileriniz yalnızca bu cihaza kaydedilecek.');
  } else {
    clearStore();
    storeStatus('Kayıt kapatıldı; bu cihazdaki veriler silindi.');
  }
});
$('forget').addEventListener('click', () => {
  clearStore();
  $('remember').checked = false;
  storeStatus('Bu cihazdaki kayıtlı adet verileri silindi.');
});

syncMode();
loadParams().then(() => {
  // Kayıtlı girdiler yüklendiyse sonuç hemen gösterilir; aynı veri yeniden yazılmaz.
  if (restoreStore()) run({ save: false });
});
