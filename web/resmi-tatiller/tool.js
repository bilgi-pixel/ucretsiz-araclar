// Resmî Tatiller — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
// Tüm hesap "takvim gün numarası" (UTC gece yarısı / 86400000) üzerinden yapılır; saat dilimi kaymaz.
import { downloadBlob, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const DAY_MS = 86400000;

/** "YYYY-MM-DD" → gün numarası (epoch'tan beri gün). */
const dn = (s) => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / DAY_MS); };
const wd = (n) => new Date(n * DAY_MS).getUTCDay(); // 0 = Pazar
const isWeekend = (n) => { const w = wd(n); return w === 0 || w === 6; };
const fmt = (n) => { const d = new Date(n * DAY_MS); return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
const fmtDay = (n) => { const d = new Date(n * DAY_MS); return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${DAYS[d.getUTCDay()]}`; };
const compact = (n) => new Date(n * DAY_MS).toISOString().slice(0, 10).replace(/-/g, '');
/** Cihazın yerel bugünü → gün numarası. */
const todayNum = () => { const n = new Date(); return Math.round(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) / DAY_MS); };

let DATA = null;
let ALL = [];          // tüm yılların tatilleri (gün numaralarıyla), tarihe göre sıralı
let OFF = new Set();   // resmî tatil günleri

function prepare(data) {
  ALL = []; OFF = new Set();
  for (const [year, info] of Object.entries(data.yillar)) {
    for (const t of info.tatiller) {
      const s = dn(t.baslangic), e = dn(t.bitis);
      ALL.push({ ...t, year: +year, s, e, len: e - s + 1, arifeN: t.arife ? dn(t.arife) : null, yaklasik: info.yaklasik });
      for (let d = s; d <= e; d++) OFF.add(d);
    }
  }
  ALL.sort((a, b) => a.s - b.s || a.e - b.e);
}

const isOff = (n) => isWeekend(n) || OFF.has(n);

/** Bir tatilin hafta içine / hafta sonuna düşen gün sayıları. */
function splitDays(h) {
  let weekday = 0, weekend = 0;
  for (let d = h.s; d <= h.e; d++) (isWeekend(d) ? weekend++ : weekday++);
  return { weekday, weekend };
}

/** Yıl içindeki benzersiz tatil günleri (19 Mayıs + Kurban gibi çakışmalar bir kez sayılır). */
function yearTotals(year) {
  const days = new Set();
  for (const h of ALL) if (h.year === year) for (let d = h.s; d <= h.e; d++) days.add(d);
  let weekday = 0, weekend = 0;
  for (const d of days) (isWeekend(d) ? weekend++ : weekday++);
  return { total: days.size, weekday, weekend };
}

/**
 * Köprü önerileri: hafta sonu + resmî tatil günlerinden oluşan boş gün öbeklerini
 * araya 1-4 iş günü izin alarak birleştirir. Pencerenin ilk ve son günü boş gündür,
 * içinde seçilen yılın en az bir resmî tatili bulunur, uzunluk en az 4 gündür.
 */
function bridgeSuggestions(year) {
  const yStart = dn(`${year}-01-01`), yEnd = dn(`${year}-12-31`);
  const inYear = new Set();
  for (const h of ALL) if (h.year === year) for (let d = h.s; d <= h.e; d++) inYear.add(d);
  const found = [];
  for (let s = yStart - 10; s <= yEnd + 10; s++) {
    if (!isOff(s) || isOff(s - 1)) continue;
    let work = 0;
    for (let e = s; e <= yEnd + 14; e++) {
      if (!isOff(e)) { work++; if (work > 4) break; continue; }
      if (isOff(e + 1) || work < 1) continue;
      const len = e - s + 1;
      if (len < 4 || len < work * 2 + 1) continue;
      const hol = [];
      for (let d = s; d <= e; d++) if (OFF.has(d)) hol.push(d);
      if (!hol.some((d) => inYear.has(d))) continue;
      const leave = [];
      for (let d = s; d <= e; d++) if (!isOff(d)) leave.push(d);
      found.push({ s, e, len, work, leave, key: hol.join(',') });
    }
  }
  // Aynı tatil kümesi için daha az izinle aynı ya da daha uzun tatil varsa kalabalığı azalt.
  const groups = new Map();
  for (const f of found) { if (!groups.has(f.key)) groups.set(f.key, []); groups.get(f.key).push(f); }
  const out = [];
  for (const list of groups.values()) {
    list.sort((a, b) => a.work - b.work || b.len - a.len || a.s - b.s);
    let lastWork = -1, lastLen = 0;
    for (const f of list) {
      if (f.work === lastWork || f.len > lastLen) { out.push(f); lastWork = f.work; lastLen = Math.max(lastLen, f.len); }
    }
  }
  return out.sort((a, b) => a.s - b.s || a.work - b.work);
}

/* ---------- .ics üretimi ---------- */
const icsEscape = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const slug = (s) => s.toLocaleLowerCase('tr').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function eventLines(h, stamp) {
  const lines = [];
  const ev = (uid, start, endExcl, name, desc) => {
    lines.push('BEGIN:VEVENT', `UID:${uid}@araclar.bilisimajans.com`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(start)}`, `DTEND;VALUE=DATE:${compact(endExcl)}`,
      `SUMMARY:${icsEscape(name)}`, `DESCRIPTION:${icsEscape(desc)}`, 'TRANSP:TRANSPARENT', 'END:VEVENT');
  };
  ev(`${h.baslangic}-${slug(h.ad)}`, h.s, h.e + 1, h.ad, `${h.len} gün resmî tatil. Tarihleri Diyanet / Resmî Gazete ile teyit edin.`);
  if (h.arifeN) ev(`${h.arife}-arife-${slug(h.ad)}`, h.arifeN, h.arifeN + 1, `${h.ad} Arifesi (yarım gün)`, 'Arife günü öğleden sonra tatildir (13.00).');
  return lines;
}

function buildICS(list) {
  const now = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const stamp = `${now.getUTCFullYear()}${p(now.getUTCMonth() + 1)}${p(now.getUTCDate())}T${p(now.getUTCHours())}${p(now.getUTCMinutes())}${p(now.getUTCSeconds())}Z`;
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bilisim Ajans//Resmi Tatiller//TR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Resmî Tatiller'];
  for (const h of list) lines.push(...eventLines(h, stamp));
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

function saveICS(list, name) {
  downloadBlob(new Blob([buildICS(list)], { type: 'text/calendar;charset=utf-8' }), name);
}

/* ---------- Arayüz ---------- */
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

function render(year) {
  const today = todayNum();
  const list = ALL.filter((h) => h.year === year);
  const info = DATA.yillar[String(year)];

  // Özet satırları
  const tot = yearTotals(year);
  $('s-total').textContent = `${tot.total} gün`;
  $('s-weekday').textContent = `${tot.weekday} gün`;
  $('s-weekend').textContent = `${tot.weekend} gün`;
  const remaining = list.filter((h) => h.e >= today).length;
  $('s-remaining').textContent = `${remaining} / ${list.length}`;
  const next = ALL.find((h) => h.e >= today);
  if (next) {
    const diff = next.s - today;
    const when = diff > 0 ? `${diff} gün kaldı` : 'şu an tatildesiniz';
    $('s-next').textContent = `${next.ad} · ${fmt(next.s)} · ${when}`;
  } else {
    $('s-next').textContent = 'Listedeki tüm tatiller geçti';
  }
  $('year-note').hidden = !info.yaklasik;
  $('year-note').textContent = info.yaklasik
    ? `${year} tarihleri Diyanet dini günler takvimine göre yazılmıştır ve resmî ilan öncesinde yaklaşık kabul edilmelidir; Resmî Gazete ile teyit edin.`
    : '';

  // Tablo
  const body = $('tbl-body');
  body.replaceChildren();
  for (const h of list) {
    const sp = splitDays(h);
    const tr = el('tr', h.e < today ? 'is-past' : '');
    const c1 = el('td');
    c1.append(fmt(h.s));
    if (h.len > 1) { c1.append(el('br')); c1.append(el('small', '', `→ ${fmt(h.e)}`)); }
    const c2 = el('td', '', h.len > 1 ? `${DAYS[wd(h.s)]} – ${DAYS[wd(h.e)]}` : DAYS[wd(h.s)]);
    const c3 = el('td');
    c3.append(el('strong', '', h.ad));
    if (h.tur === 'dini') c3.append(el('small', '', ' (dini bayram)'));
    const c4 = el('td');
    c4.append(`${h.len} gün`);
    c4.append(el('br'));
    c4.append(el('small', '', sp.weekend ? `${sp.weekday} hafta içi, ${sp.weekend} hafta sonu` : 'tamamı hafta içi'));
    const c5 = el('td', '', h.arifeN ? `${fmtDay(h.arifeN)}, yarım gün${isWeekend(h.arifeN) ? ' (hafta sonu)' : ''}` : '—');
    const c6 = el('td', 'no-print');
    const b = el('button', 'ba-btn', 'Takvime ekle');
    b.type = 'button';
    b.setAttribute('aria-label', `${h.ad} ${year} takvim dosyasını (.ics) indir`);
    b.addEventListener('click', () => saveICS([h], `${slug(h.ad)}-${year}.ics`));
    c6.append(b);
    tr.append(c1, c2, c3, c4, c5, c6);
    body.append(tr);
  }

  // Köprü önerileri
  const ul = $('bridges');
  ul.replaceChildren();
  const bridges = bridgeSuggestions(year);
  if (!bridges.length) ul.append(el('li', '', 'Bu yıl için izinle uzatılabilecek köprü fırsatı bulunamadı.'));
  for (const b of bridges) {
    const li = el('li', 'bridge');
    const head = el('strong', '', `${b.work} gün izin al, ${b.len} gün tatil yap`);
    const names = [...new Set(ALL.filter((h) => h.e >= b.s && h.s <= b.e).map((h) => h.ad))].join(', ');
    const detail = el('span', '', `${fmtDay(b.s)} – ${fmtDay(b.e)} · İzin günleri: ${b.leave.map(fmtDay).join(', ')} · İçerdiği tatil: ${names}`);
    li.append(head, el('br'), detail);
    ul.append(li);
  }
  $('dl-all').textContent = `${year} tüm tatilleri takvime ekle (.ics)`;
  showError($('error'), '');
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('http');
    DATA = await res.json();
    prepare(DATA);
  } catch {
    showError($('error'), 'Tatil verisi yüklenemedi. Sayfayı yenileyin; sorun sürerse tarayıcı önbelleğini temizleyip tekrar deneyin.');
    return;
  }
  const years = Object.keys(DATA.yillar).map(Number).sort();
  const sel = $('year');
  for (const y of years) { const o = el('option', '', String(y)); o.value = String(y); sel.append(o); }
  const cur = new Date().getFullYear();
  const wanted = Number(new URLSearchParams(location.search).get('yil'));
  const start = years.includes(wanted) ? wanted : years.includes(cur) ? cur : (cur > years[years.length - 1] ? years[years.length - 1] : years[0]);
  sel.value = String(start);
  sel.addEventListener('change', () => render(Number(sel.value)));
  $('dl-all').addEventListener('click', () => {
    const y = Number(sel.value);
    saveICS(ALL.filter((h) => h.year === y), `resmi-tatiller-${y}.ics`);
  });
  $('print').addEventListener('click', () => window.print());
  $('updated').textContent = DATA.guncelleme.split('-').reverse().join('.');
  render(start);
  document.documentElement.dataset.ready = '1';
}

init();
