// Saat Dilimi Çevirici — tamamı tarayıcıda çalışır; tarih/saat sunucuya gitmez.
// Dönüşüm tarayıcının yerleşik IANA saat dilimi veritabanı (Intl.DateTimeFormat timeZone) ile yapılır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
/** .ba-result bloğunu göster/gizle (ba.css is-active sınıfı gerektirir). */
const showResult = (on) => { $('result').hidden = !on; $('result').classList.toggle('is-active', on); };

/** [etiket, IANA kimliği] — 60'tan fazla popüler şehir/dilim. */
export const CITIES = [
  ['İstanbul (Türkiye)', 'Europe/Istanbul'], ['Londra', 'Europe/London'], ['Paris', 'Europe/Paris'], ['Berlin', 'Europe/Berlin'],
  ['Madrid', 'Europe/Madrid'], ['Roma', 'Europe/Rome'], ['Amsterdam', 'Europe/Amsterdam'], ['Brüksel', 'Europe/Brussels'],
  ['Viyana', 'Europe/Vienna'], ['Zürih', 'Europe/Zurich'], ['Stockholm', 'Europe/Stockholm'], ['Atina', 'Europe/Athens'],
  ['Lizbon', 'Europe/Lisbon'], ['Dublin', 'Europe/Dublin'], ['Varşova', 'Europe/Warsaw'], ['Prag', 'Europe/Prague'],
  ['Kiev', 'Europe/Kiev'], ['Moskova', 'Europe/Moscow'], ['Bakü', 'Asia/Baku'], ['Tiflis', 'Asia/Tbilisi'],
  ['Erivan', 'Asia/Yerevan'], ['Dubai', 'Asia/Dubai'], ['Doha', 'Asia/Qatar'], ['Riyad', 'Asia/Riyadh'],
  ['Tahran', 'Asia/Tehran'], ['Bağdat', 'Asia/Baghdad'], ['Kudüs', 'Asia/Jerusalem'], ['Kahire', 'Africa/Cairo'],
  ['Taşkent', 'Asia/Tashkent'], ['Almatı', 'Asia/Almaty'], ['Karaçi', 'Asia/Karachi'], ['Yeni Delhi', 'Asia/Kolkata'],
  ['Dakka', 'Asia/Dhaka'], ['Bangkok', 'Asia/Bangkok'], ['Cakarta', 'Asia/Jakarta'], ['Singapur', 'Asia/Singapore'],
  ['Hong Kong', 'Asia/Hong_Kong'], ['Şanghay / Pekin', 'Asia/Shanghai'], ['Seul', 'Asia/Seoul'], ['Tokyo', 'Asia/Tokyo'],
  ['Manila', 'Asia/Manila'], ['Sidney', 'Australia/Sydney'], ['Melbourne', 'Australia/Melbourne'], ['Perth', 'Australia/Perth'],
  ['Auckland', 'Pacific/Auckland'], ['Honolulu', 'Pacific/Honolulu'], ['Anchorage', 'America/Anchorage'], ['Los Angeles', 'America/Los_Angeles'],
  ['Vancouver', 'America/Vancouver'], ['Denver', 'America/Denver'], ['Chicago', 'America/Chicago'], ['Meksiko', 'America/Mexico_City'],
  ['New York', 'America/New_York'], ['Toronto', 'America/Toronto'], ['Bogota', 'America/Bogota'], ['Lima', 'America/Lima'],
  ['Santiago', 'America/Santiago'], ['Sao Paulo', 'America/Sao_Paulo'], ['Buenos Aires', 'America/Argentina/Buenos_Aires'],
  ['Johannesburg', 'Africa/Johannesburg'], ['Lagos', 'Africa/Lagos'], ['Nairobi', 'Africa/Nairobi'], ['UTC (Eş güdümlü evrensel zaman)', 'UTC'],
];
const DEFAULT_TARGETS = ['America/New_York', 'Europe/London', 'Asia/Dubai', 'Asia/Tokyo', 'Australia/Sydney'];
const LIVE_ZONES = ['Europe/Istanbul', 'Europe/London', 'America/New_York', 'America/Los_Angeles', 'Asia/Dubai', 'Europe/Moscow', 'Asia/Tokyo', 'Australia/Sydney'];
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const WEEKDAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

const labelOf = (zone) => (CITIES.find((c) => c[1] === zone) || [zone])[0];
const pad = (n) => String(n).padStart(2, '0');

/* ---------- Saat dilimi hesabı ---------- */
const fmtCache = new Map();
function partsFormatter(zone) {
  if (!fmtCache.has(zone)) {
    fmtCache.set(zone, new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }));
  }
  return fmtCache.get(zone);
}
/** Bir anın (ms) verilen dilimdeki duvar saati parçaları. */
export function zoneParts(zone, ms) {
  const o = {};
  for (const p of partsFormatter(zone).formatToParts(new Date(ms))) if (p.type !== 'literal') o[p.type] = +p.value;
  if (o.hour === 24) o.hour = 0;
  return o;
}
/** Dilimin o andaki UTC farkı (dakika). */
export function offsetMinutes(zone, ms) {
  const p = zoneParts(zone, ms);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
}
/** Duvar saati (dilimde) → an (ms). Dilimde var olmayan saatte (yaz saati boşluğu) null döner. */
export function localToInstant(zone, y, mo, d, h, mi) {
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  let t = guess - offsetMinutes(zone, guess) * 60000;
  t = guess - offsetMinutes(zone, t) * 60000;
  const back = zoneParts(zone, t);
  if (back.year !== y || back.month !== mo || back.day !== d || back.hour !== h || back.minute !== mi) return null;
  return t;
}
export function offsetLabel(min) {
  const s = min < 0 ? '-' : '+', a = Math.abs(min);
  return `UTC${s}${Math.floor(a / 60)}${a % 60 ? ':' + pad(a % 60) : ''}`;
}
/** Yaz saati durumu: yıl içindeki en küçük farka göre karşılaştırılır (güney yarımküre dahil). */
export function dstState(zone, ms) {
  const y = zoneParts(zone, ms).year;
  const jan = offsetMinutes(zone, Date.UTC(y, 0, 1)), jul = offsetMinutes(zone, Date.UTC(y, 6, 1));
  if (jan === jul) return 'none';
  return offsetMinutes(zone, ms) > Math.min(jan, jul) ? 'dst' : 'std';
}
const DST_TEXT = { none: 'Yaz saati uygulanmıyor', std: 'Kış saati (yaz saati şu an yok)', dst: 'Yaz saati uygulanıyor' };
const dateText = (p) => {
  const wd = new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay();
  return `${p.day} ${MONTHS[p.month - 1]} ${p.year} ${WEEKDAYS[wd]}`;
};
const dayNumOf = (p) => Math.round(Date.UTC(p.year, p.month - 1, p.day) / 86400000);

/* ---------- Form durumu ---------- */
let lastText = '';
let lastShare = '';

function buildTargetList() {
  const wrap = $('targets');
  wrap.innerHTML = '';
  for (const [name, zone] of CITIES) {
    const lab = document.createElement('label');
    lab.className = 'tz-check';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.value = zone; cb.checked = DEFAULT_TARGETS.includes(zone);
    lab.append(cb, document.createTextNode(' ' + name));
    wrap.append(lab);
  }
}
function fillSelect(sel, value) {
  for (const [name, zone] of CITIES) sel.add(new Option(name, zone));
  sel.value = value;
}
const selectedTargets = () => [...$('targets').querySelectorAll('input:checked')].map((i) => i.value);

/** datetime-local değeri "YYYY-MM-DDTHH:mm" → parçalar; geçersizse null. */
export function parseLocal(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(s || '');
  if (!m) return null;
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const chk = new Date(Date.UTC(y, mo - 1, d, h, mi));
  if (chk.getUTCFullYear() !== y || chk.getUTCMonth() !== mo - 1 || chk.getUTCDate() !== d || h > 23 || mi > 59) return null;
  return { y, mo, d, h, mi };
}

function convert() {
  const err = $('error');
  showError(err, '');
  showResult(false);
  const src = $('src-zone').value;
  const raw = $('dt').value;
  const p = parseLocal(raw);
  if (!p) { showError(err, 'Tarih ve saat geçerli görünmüyor. Takvim ve saat alanlarını eksiksiz doldurun ya da "Şimdi" düğmesini kullanın.'); return false; }
  const targets = selectedTargets();
  if (!targets.length) { showError(err, 'Hedef şehir seçilmedi. Listeden en az bir şehir işaretleyin.'); return false; }
  const t = localToInstant(src, p.y, p.mo, p.d, p.h, p.mi);
  if (t === null) { showError(err, `Bu saat ${labelOf(src)} diliminde yok; yaz saatine geçişte bir saat atlanıyor. Saati bir saat ileri ya da geri alın.`); return false; }

  const srcParts = zoneParts(src, t);
  const lines = [`${labelOf(src)}: ${dateText(srcParts)} ${pad(srcParts.hour)}:${pad(srcParts.minute)} (${offsetLabel(offsetMinutes(src, t))})`];
  const list = $('cards');
  list.innerHTML = '';
  for (const zone of targets) {
    const tp = zoneParts(zone, t), off = offsetMinutes(zone, t), st = dstState(zone, t);
    const diff = dayNumOf(tp) - dayNumOf(srcParts);
    const dayNote = diff === 0 ? 'Aynı gün' : diff > 0 ? 'Ertesi gün (+1)' : 'Önceki gün (-1)';
    const li = document.createElement('li');
    li.className = 'tz-card';
    li.dataset.zone = zone;
    li.innerHTML = '<h4></h4><p class="tz-time"></p><p class="tz-date"></p><p class="tz-meta"></p>';
    li.querySelector('h4').textContent = labelOf(zone);
    li.querySelector('.tz-time').textContent = `${pad(tp.hour)}:${pad(tp.minute)}`;
    li.querySelector('.tz-date').textContent = `${dateText(tp)} · ${dayNote}`;
    li.querySelector('.tz-meta').textContent = `${offsetLabel(off)} · ${DST_TEXT[st]}`;
    list.append(li);
    lines.push(`${labelOf(zone)}: ${dateText(tp)} ${pad(tp.hour)}:${pad(tp.minute)} (${offsetLabel(off)})`);
  }
  $('r-head').textContent = `${labelOf(src)} saatiyle ${pad(p.h)}:${pad(p.mi)}, ${p.d} ${MONTHS[p.mo - 1]} ${p.y}`;
  lastText = lines.join('\n');
  const q = new URLSearchParams({ t: raw, s: src, z: targets.join(',') });
  lastShare = `${location.origin}${location.pathname}?${q.toString()}`;
  showResult(true);
  return true;
}

/* ---------- Toplantı planlayıcı ---------- */
function planMeeting() {
  const err = $('m-error');
  showError(err, '');
  $('m-result').hidden = true;
  const zones = [$('m-c1').value, $('m-c2').value, $('m-c3').value];
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec($('m-date').value);
  const start = Number($('m-start').value), end = Number($('m-end').value);
  if (!dm) { showError(err, 'Toplantı günü seçilmedi. Takvimden bir tarih seçin.'); return; }
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > 24 || start >= end) {
    showError(err, 'Çalışma saatleri geçersiz. Başlangıç, bitişten küçük olmalı (örneğin 9 ve 18).'); return;
  }
  const y = +dm[1], mo = +dm[2], d = +dm[3];
  const midnightUtc = Date.UTC(y, mo - 1, d);
  const t0 = localToInstant(zones[0], y, mo, d, 0, 0) ?? (midnightUtc - offsetMinutes(zones[0], midnightUtc) * 60000);
  const rows = [];
  for (let i = 0; i < 24; i++) {
    const t = t0 + i * 3600000;
    const base = dayNumOf(zoneParts(zones[0], t));
    const cells = zones.map((z) => {
      const p = zoneParts(z, t), mins = p.hour * 60 + p.minute;
      return { text: `${pad(p.hour)}:${pad(p.minute)}`, work: mins >= start * 60 && mins + 60 <= end * 60, dayDiff: dayNumOf(p) - base };
    });
    rows.push({ cells, all: cells.every((c) => c.work) });
  }
  const strips = $('m-strips');
  strips.innerHTML = '';
  zones.forEach((z, zi) => {
    const row = document.createElement('div');
    row.className = 'tz-strip-row';
    const lab = document.createElement('span');
    lab.className = 'tz-strip-label'; lab.textContent = labelOf(z);
    const bar = document.createElement('div');
    bar.className = 'tz-strip'; bar.setAttribute('role', 'img');
    bar.setAttribute('aria-label', `${labelOf(z)}: ${rows.filter((r) => r.cells[zi].work).length} çalışma saati`);
    rows.forEach((r) => {
      const c = document.createElement('i');
      c.className = (r.cells[zi].work ? 'w ' : '') + (r.all ? 'all' : '');
      c.title = `${r.cells[zi].text}${r.all ? ' (ortak)' : ''}`;
      bar.append(c);
    });
    row.append(lab, bar);
    strips.append(row);
  });
  const tb = $('m-body');
  tb.innerHTML = '';
  for (const r of rows) {
    const tr = document.createElement('tr');
    if (r.all) tr.className = 'tz-all';
    for (const c of r.cells) {
      const td = document.createElement('td');
      td.textContent = c.text + (c.dayDiff ? (c.dayDiff > 0 ? ' (+1)' : ' (-1)') : '');
      if (c.work) td.className = 'tz-work';
      tr.append(td);
    }
    const ok = document.createElement('td');
    ok.textContent = r.all ? 'Evet' : '-';
    tr.append(ok);
    tb.append(tr);
  }
  $('m-th1').textContent = labelOf(zones[0]); $('m-th2').textContent = labelOf(zones[1]); $('m-th3').textContent = labelOf(zones[2]);
  const common = rows.filter((r) => r.all);
  $('m-summary').textContent = common.length
    ? `Üç şehirde de çalışma saati içinde kalan ${common.length} saatlik dilim var. Tabloda "Evet" yazan satırlar uygundur: ${common.map((r) => r.cells[0].text).join(', ')} (${labelOf(zones[0])} saatiyle başlangıç).`
    : 'Bu gün için üç şehirde de çalışma saati içinde kalan ortak bir saat yok. Çalışma saatlerini genişletmeyi ya da farklı bir gün/şehir denemeyi düşünün.';
  $('m-result').hidden = false;
}

/* ---------- Canlı dünya saati ---------- */
function buildWorld() {
  const ul = $('world');
  ul.innerHTML = '';
  for (const z of LIVE_ZONES) {
    const li = document.createElement('li');
    li.className = 'tz-card'; li.dataset.zone = z;
    li.innerHTML = '<h4></h4><p class="tz-time"></p><p class="tz-date"></p><p class="tz-meta"></p>';
    li.querySelector('h4').textContent = labelOf(z);
    ul.append(li);
  }
  tickWorld();
  setInterval(tickWorld, 1000);
}
function tickWorld() {
  const now = Date.now();
  for (const li of $('world').children) {
    const z = li.dataset.zone, p = zoneParts(z, now);
    li.querySelector('.tz-time').textContent = `${pad(p.hour)}:${pad(p.minute)}:${pad(p.second)}`;
    li.querySelector('.tz-date').textContent = dateText(p);
    li.querySelector('.tz-meta').textContent = `${offsetLabel(offsetMinutes(z, now))} · ${DST_TEXT[dstState(z, now)]}`;
  }
}

/* ---------- Başlatma ---------- */
async function copy(text, statusEl) {
  if (!text) { statusEl.textContent = 'Önce "Çevir" düğmesine basın.'; return; }
  try { await navigator.clipboard.writeText(text); statusEl.textContent = 'Kopyalandı.'; }
  catch { statusEl.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
}
function nowInZone(zone) {
  const p = zoneParts(zone, Date.now());
  return `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}`;
}

function init() {
  buildTargetList();
  fillSelect($('src-zone'), 'Europe/Istanbul');
  fillSelect($('m-c1'), 'Europe/Istanbul'); fillSelect($('m-c2'), 'America/New_York'); fillSelect($('m-c3'), 'Asia/Tokyo');
  $('dt').value = nowInZone('Europe/Istanbul');
  $('m-date').value = nowInZone('Europe/Istanbul').slice(0, 10);
  buildWorld();

  $('form').addEventListener('submit', (e) => { e.preventDefault(); convert(); });
  $('now').addEventListener('click', () => { $('dt').value = nowInZone($('src-zone').value); });
  $('src-zone').addEventListener('change', () => { showResult(false); });
  $('copy').addEventListener('click', () => copy(lastText, $('copy-status')));
  $('share').addEventListener('click', () => copy(lastShare, $('copy-status')));
  $('sel-none').addEventListener('click', () => $('targets').querySelectorAll('input').forEach((i) => { i.checked = false; }));
  $('sel-def').addEventListener('click', () => $('targets').querySelectorAll('input').forEach((i) => { i.checked = DEFAULT_TARGETS.includes(i.value); }));
  $('m-form').addEventListener('submit', (e) => { e.preventDefault(); planMeeting(); });

  // Paylaşılabilir bağlantı: ?t=2026-11-04T12:00&s=Europe/Istanbul&z=Asia/Tokyo,America/New_York
  const q = new URLSearchParams(location.search);
  if (q.has('t')) {
    const valid = new Set(CITIES.map((c) => c[1]));
    if (q.get('s') && valid.has(q.get('s'))) $('src-zone').value = q.get('s');
    if (q.get('z')) {
      const zs = q.get('z').split(',').filter((z) => valid.has(z));
      $('targets').querySelectorAll('input').forEach((i) => { i.checked = zs.includes(i.value); });
    }
    $('dt').value = q.get('t');
    if (!parseLocal($('dt').value)) { showError($('error'), 'Bağlantıdaki tarih geçersiz. Tarihi aşağıdan yeniden seçip "Çevir" düğmesine basın.'); return; }
    convert();
  }
}
init();
document.documentElement.dataset.ready = "1"; // testler için: betik hazır
