// SGK Gün Hesaplama — tamamı tarayıcıda çalışır; girilen tarihler sunucuya gitmez.
// SGK usulü: ay 30 gün, yıl 360 gün; ayın son günü (28/29/30/31) 30. gün sayılır; uç günler dahildir.
// Hesap "takvim gün numarası" mantığıyla yapılır (saat/saat dilimi yok), UTC kayması olmaz.
// Bilgilendirme amaçlıdır; e-Devlet'teki SGK tescil ve hizmet dökümü esastır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');
const MAX_ROWS = 30;
const MIN_YEAR = 1950;
const MAX_YEAR = 2100;

// parametreler.json yüklenemezse (çevrimdışı vb.) kullanılacak varsayılanlar.
let params = {
  guncelleme: '2026-11-04',
  prim_gunu_hedef: 7200,
  sigortalilik_yil: { kadin: 20, erkek: 25 },
};

/* ---------- Takvim yardımcıları ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
export const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
export const dayNumber = (t) => Math.round(Date.UTC(t.y, t.m - 1, t.d) / 86400000);
const pad = (n) => String(n).padStart(2, '0');
const dateTR = (t) => `${pad(t.d)}.${pad(t.m)}.${t.y}`;

/** "YYYY-MM-DD" metnini {y,m,d} nesnesine çevirir; geçersizse null. */
export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

export function todayLocal() {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}

/** Ay sayısı ekler; ay sonlarında günü ilgili ayın son gününe sabitler. */
function addMonths(t, n) {
  const total = t.m - 1 + n;
  const y = t.y + Math.floor(total / 12);
  const m = ((total % 12) + 12) % 12 + 1;
  return { y, m, d: Math.min(t.d, daysInMonth(y, m)) };
}

/** a <= b için takvim yıl/ay/gün farkı (sigortalılık süresi bilgisi için). */
export function diffYMD(a, b) {
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  if (dayNumber(addMonths(a, months)) > dayNumber(b)) months--;
  const an = addMonths(a, months);
  return { years: Math.floor(months / 12), months: months % 12, days: dayNumber(b) - dayNumber(an) };
}

/* ---------- SGK 30/360 mantığı ---------- */

/** SGK takvim günü: ayın son günü (Şubat 28/29, 31 çeken aylarda 31 vb.) 30. gün sayılır. */
export function sgkDay(t) {
  return t.d === daysInMonth(t.y, t.m) ? 30 : t.d;
}

/** [a, b] (a <= b) aralığındaki SGK günü: tam ay 30, yıl 360; ilk ve son gün dahil. */
export function sgkDays(a, b) {
  return (b.y - a.y) * 360 + (b.m - a.m) * 30 + (sgkDay(b) - sgkDay(a)) + 1;
}

/** Gün sayısını 360 günlük yıl ve 30 günlük ay ile yıl-ay-gün olarak yazar. */
export function fromDays(n) {
  return { years: Math.floor(n / 360), months: Math.floor((n % 360) / 30), days: n % 30 };
}

const ymdText = (x) => `${x.years} yıl, ${x.months} ay, ${x.days} gün`;

/** Takvimde kesişen (aynı günü paylaşan) dönem çiftlerini bulur. */
export function findOverlaps(rows) {
  const out = [];
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      if (rows[i].an <= rows[j].bn && rows[j].an <= rows[i].bn) out.push([rows[i].n, rows[j].n]);
    }
  }
  return out;
}

/** Çakışan dönemleri birleştirir: aynı gün iki kez sayılmaz. */
export function mergeRanges(rows) {
  const sorted = [...rows].sort((x, y) => x.an - y.an);
  const merged = [];
  for (const r of sorted) {
    const last = merged[merged.length - 1];
    if (last && r.an <= last.bn) {
      if (r.bn > last.bn) { last.bn = r.bn; last.b = r.b; }
    } else merged.push({ a: r.a, b: r.b, an: r.an, bn: r.bn });
  }
  return merged;
}

/**
 * Dönem satırlarını hesaplar. periods: [{ start, end, missing }] (start/end "YYYY-MM-DD").
 * Tamamen boş satırlar atlanır; hatalarda Türkçe, çözüm öneren Error fırlatır.
 */
export function computeSgk(periods) {
  const rows = [];
  periods.forEach((p, idx) => {
    const n = idx + 1;
    const blank = !p.start && !p.end && !String(p.missing || '').trim();
    if (blank) return;
    const a = parseISO(p.start);
    const b = parseISO(p.end);
    if (!a) throw new Error(`Dönem ${n}: başlangıç tarihi eksik ya da geçersiz. Tarihi takvimden seçin ya da gün, ay ve yılı eksiksiz yazın; 31 Nisan gibi var olmayan günler kabul edilmez.`);
    if (!b) throw new Error(`Dönem ${n}: bitiş tarihi eksik ya da geçersiz. Hâlâ çalışıyorsanız bugünün tarihini bitiş olarak seçin.`);
    for (const t of [a, b]) {
      if (t.y < MIN_YEAR || t.y > MAX_YEAR) throw new Error(`Dönem ${n}: tarihler ${MIN_YEAR} ile ${MAX_YEAR} yılları arasında olmalıdır. Yılı kontrol edip tekrar seçin.`);
    }
    const an = dayNumber(a), bn = dayNumber(b);
    if (an > bn) throw new Error(`Dönem ${n}: başlangıç tarihi (${dateTR(a)}) bitiş tarihinden (${dateTR(b)}) sonra olamaz. İki tarihi kontrol edip yer değiştirin.`);
    const rawMissing = String(p.missing || '').trim();
    if (rawMissing && !/^\d{1,6}$/.test(rawMissing)) throw new Error(`Dönem ${n}: eksik gün sayısı geçersiz. 0 ya da pozitif bir tam sayı yazın (örneğin 12) ya da alanı boş bırakın.`);
    const missing = rawMissing ? Number(rawMissing) : 0;
    const days = sgkDays(a, b);
    if (missing > days) throw new Error(`Dönem ${n}: eksik gün sayısı (${nf.format(missing)}) dönemin gün sayısından (${nf.format(days)}) büyük olamaz. Eksik günü kontrol edin.`);
    rows.push({ n, a, b, an, bn, days, missing, net: days - missing });
  });
  if (!rows.length) throw new Error('En az bir çalışma dönemi girin. Başlangıç ve bitiş tarihini seçip "Hesapla" düğmesine basın.');

  const overlaps = findOverlaps(rows);
  const merged = mergeRanges(rows);
  const gross = merged.reduce((s, m) => s + sgkDays(m.a, m.b), 0);
  const missingTotal = rows.reduce((s, r) => s + r.missing, 0);
  const net = Math.max(0, gross - missingTotal);
  const earliest = rows.reduce((m, r) => (r.an < m.an ? r : m), rows[0]).a;
  return { rows, overlaps, gross, missingTotal, net, ymd: fromDays(net), earliest };
}

/** 7.200 gün hedefi için kalan gün (bilgilendirme). */
export function primTarget(net, target) {
  const remaining = Math.max(0, target - net);
  return { remaining, over: Math.max(0, net - target), ymd: fromDays(remaining) };
}

/** Sigortalılık süresi hedefi: listedeki en erken başlangıçtan bugüne geçen süre ve kalan (bilgilendirme). */
export function insuranceTarget(earliest, today, targetYears) {
  if (dayNumber(today) < dayNumber(earliest)) return { future: true, targetYears };
  const elapsed = diffYMD(earliest, today);
  if (elapsed.years >= targetYears) return { done: true, elapsed, targetYears };
  const remaining = diffYMD(today, addMonths(earliest, targetYears * 12));
  return { elapsed, remaining, targetYears };
}

/* ---------- Arayüz ---------- */
let rowSeq = 0;
let lastText = '';

function datesAttr() {
  return `min="${MIN_YEAR}-01-01" max="${MAX_YEAR}-12-31"`;
}

function renumber() {
  const rows = $('periods').querySelectorAll('.period-row');
  rows.forEach((fs, i) => {
    fs.querySelector('.period-title').textContent = `Dönem ${i + 1}`;
    const btn = fs.querySelector('.period-remove');
    btn.setAttribute('aria-label', `Dönem ${i + 1}'i sil`);
    btn.disabled = rows.length === 1;
  });
}

function addRow(focus) {
  const list = $('periods');
  if (list.children.length >= MAX_ROWS) {
    showError($('error'), `En fazla ${MAX_ROWS} çalışma dönemi ekleyebilirsiniz. Ardışık dönemleri tek satırda birleştirin.`);
    return;
  }
  const id = ++rowSeq;
  const fs = document.createElement('fieldset');
  fs.className = 'period-row';
  fs.innerHTML = `<legend class="period-title">Dönem</legend>
    <div class="period-grid">
      <div class="ba-field"><label for="start-${id}">Başlangıç tarihi</label><input id="start-${id}" name="start" type="date" ${datesAttr()}></div>
      <div class="ba-field"><label for="end-${id}">Bitiş tarihi</label><input id="end-${id}" name="end" type="date" ${datesAttr()}></div>
      <div class="ba-field"><label for="missing-${id}">Eksik gün (isteğe bağlı)</label><input id="missing-${id}" name="missing" type="text" inputmode="numeric" autocomplete="off" placeholder="0"></div>
      <div class="period-remove-wrap"><button type="button" class="ba-btn period-remove">Sil</button></div>
    </div>`;
  list.appendChild(fs);
  renumber();
  if (focus) fs.querySelector('input[name="start"]').focus();
}

function readPeriods() {
  return [...$('periods').querySelectorAll('.period-row')].map((fs) => ({
    start: fs.querySelector('input[name="start"]').value,
    end: fs.querySelector('input[name="end"]').value,
    missing: fs.querySelector('input[name="missing"]').value,
  }));
}

function render(r) {
  const gender = $('gender').value;
  $('r-main').textContent = `Toplam ${nf.format(r.net)} gün (${ymdText(r.ymd)})`;
  $('r-gross').textContent = `${nf.format(r.gross)} gün`;
  $('r-missing').textContent = `${nf.format(r.missingTotal)} gün`;
  $('r-total').textContent = `${nf.format(r.net)} gün`;
  $('r-ymd').textContent = ymdText(r.ymd);

  const list = $('r-periods');
  list.textContent = '';
  for (const row of r.rows) {
    const li = document.createElement('li');
    li.textContent = `Dönem ${row.n} (${dateTR(row.a)} – ${dateTR(row.b)}): ${nf.format(row.days)} gün`
      + (row.missing ? `, eksik ${nf.format(row.missing)} gün düşülünce ${nf.format(row.net)} gün` : '');
    list.appendChild(li);
  }

  // Çakışma uyarısı ayrı bir kutuda gösterilir; sonuç yine de hesaplanır.
  const warn = $('warning');
  if (r.overlaps.length) {
    const pairs = r.overlaps.map(([x, y]) => `Dönem ${x} ile Dönem ${y}`).join(', ');
    warn.textContent = `Çakışan dönemler var: ${pairs}. SGK aynı günü iki kez saymaz; çakışan günler yalnızca bir kez sayıldı, bu yüzden toplam satırlardaki günlerin toplamından az olabilir. Tarihleri hizmet dökümünüzle karşılaştırın.`;
    warn.hidden = false;
  } else {
    warn.textContent = '';
    warn.hidden = true;
  }

  // Bilgilendirme bölümü: emeklilik tarihi vermez.
  const pt = primTarget(r.net, params.prim_gunu_hedef);
  const target = nf.format(params.prim_gunu_hedef);
  $('r-prim').textContent = pt.remaining === 0
    ? `${target} günlük hedefin ${nf.format(pt.over)} gün üzerindesiniz (yalnızca gün sayısı olarak).`
    : `${target} güne kalan: ${nf.format(pt.remaining)} gün (360 günlük yıl hesabıyla ${ymdText(pt.ymd)}).`;
  const insRow = $('row-ins');
  let insText = '';
  if (gender === 'kadin' || gender === 'erkek') {
    const years = params.sigortalilik_yil[gender];
    const it = insuranceTarget(r.earliest, todayLocal(), years);
    if (it.future) insText = `Listenizdeki ilk başlangıç tarihi ileri bir tarih; ${years} yıllık sigortalılık süresi henüz başlamamış görünüyor.`;
    else if (it.done) insText = `Listenizdeki ilk başlangıçtan bugüne ${it.elapsed.years} yıl ${it.elapsed.months} ay geçmiş; ${years} yıllık süre dolmuş görünüyor.`;
    else insText = `Listenizdeki ilk başlangıçtan bugüne ${it.elapsed.years} yıl ${it.elapsed.months} ay geçmiş; ${years} yıllık süreye kalan: ${it.remaining.years} yıl, ${it.remaining.months} ay, ${it.remaining.days} gün.`;
  }
  $('r-ins').textContent = insText;
  insRow.hidden = !insText;

  lastText = `SGK gün hesabı: toplam ${nf.format(r.net)} gün (${ymdText(r.ymd)}); ${r.rows.length} dönem, eksik gün ${nf.format(r.missingTotal)}. Bilgilendirme amaçlıdır; e-Devlet SGK hizmet dökümü esastır.`;
  $('result').hidden = false;
  $('result').classList.add('is-active');
}

function hideResult() {
  $('result').hidden = true;
  $('result').classList.remove('is-active');
  $('warning').hidden = true;
  $('warning').textContent = '';
}

function run() {
  showError($('error'), '');
  try {
    render(computeSgk(readPeriods()));
  } catch (e) {
    hideResult();
    showError($('error'), e.message);
  }
}

async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* çevrimdışı önbellek yoksa yerleşik değerlerle devam */ }
  const d = parseISO(params.guncelleme);
  $('rates-updated').textContent = d ? dateTR(d) : String(params.guncelleme);
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('add-period').addEventListener('click', () => { showError($('error'), ''); addRow(true); });
$('periods').addEventListener('click', (e) => {
  const btn = e.target.closest('.period-remove');
  if (!btn || btn.disabled) return;
  btn.closest('.period-row').remove();
  renumber();
  $('add-period').focus();
});
$('clear').addEventListener('click', () => {
  $('periods').textContent = '';
  addRow(true);
  $('gender').value = 'none';
  showError($('error'), '');
  hideResult();
  $('copy-status').textContent = '';
});
$('copy').addEventListener('click', async () => {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(lastText); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

addRow(false);
loadParams();
