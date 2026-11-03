// Hicri-Miladi Tarih Çevirme — tamamı tarayıcıda çalışır; tarihler sunucuya gitmez.
// Gün hesabı UTC gece yarısı üzerinden yapılır (saat dilimi kayması olmaz).
import { showError } from '../assets/js/ba.js';

export const HIJRI_MONTHS = ['Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir', 'Cemaziyelevvel', 'Cemaziyelahir', 'Recep', 'Şaban', 'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'];
export const GREG_MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const WEEKDAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
export const CAL_LABEL = { 'islamic-umalqura': 'Ümmülkura', 'islamic-civil': 'Tabular (civil)' };

/* ---------- Gün numarası yardımcıları ---------- */
/** Unix gün numarası (UTC gece yarısı / 86400000). */
export const dayNum = (y, m, d) => { const t = new Date(0); t.setUTCFullYear(y, m - 1, d); return Math.round(t.getTime() / 86400000); };
/** Gün numarası → {y,m,d} Miladi. */
export function gregFromDay(n) { const t = new Date(n * 86400000); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; }
export const weekdayOf = (n) => WEEKDAYS[((n + 4) % 7 + 7) % 7]; // 1 Ocak 1970 Perşembe
export const fmtGreg = (n) => { const g = gregFromDay(n); return `${g.d} ${GREG_MONTHS[g.m - 1]} ${g.y} ${weekdayOf(n)}`; };
export const fmtHijri = (h) => `${h.d} ${HIJRI_MONTHS[h.m - 1]} ${h.y}`;
const isGregValid = (y, m, d) => { const g = gregFromDay(dayNum(y, m, d)); return g.y === y && g.m === m && g.d === d; };

/* ---------- Tabular islamic-civil (kendi algoritmamız) ---------- */
/** Civil hicri tarihi → Unix gün numarası (kapalı formül; epoch: JDN 1948440 = 1 Muharrem 1). */
export function civilToDay(y, m, d) {
  const jdn = d + Math.ceil(29.5 * (m - 1)) + (y - 1) * 354 + Math.floor((3 + 11 * y) / 30) + 1948440 - 1;
  return jdn - 2440588; // JDN → Unix gün (1970-01-01 = JDN 2440588)
}
/** Unix gün numarası → civil hicri. Yaklaşık yıl tahmini + düzeltme. */
export function dayToCivil(n) {
  let y = Math.floor((n - civilToDay(1, 1, 1)) / 354.36667) + 1;
  while (civilToDay(y + 1, 1, 1) <= n) y++;
  while (civilToDay(y, 1, 1) > n) y--;
  let m = 1;
  while (m < 12 && civilToDay(y, m + 1, 1) <= n) m++;
  return { y, m, d: n - civilToDay(y, m, 1) + 1 };
}

/* ---------- Intl ile Miladi → Hicri ---------- */
const fmtCache = {};
function getFmt(cal) {
  if (!(cal in fmtCache)) {
    const f = new Intl.DateTimeFormat('tr-TR-u-ca-' + cal + '-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
    fmtCache[cal] = f.resolvedOptions().calendar === cal ? f : null; // tarayıcı takvimi desteklemiyorsa null
  }
  return fmtCache[cal];
}
/** Unix gün numarası → {y,m,d} hicri. Intl yoksa civil algoritmaya düşer. */
export function hijriFromDay(cal, n) {
  const f = getFmt(cal);
  if (!f) return dayToCivil(n);
  const o = {};
  for (const p of f.formatToParts(new Date(n * 86400000))) if (p.type === 'day' || p.type === 'month' || p.type === 'year') o[p.type] = parseInt(p.value, 10);
  return { y: o.year, m: o.month, d: o.day };
}
const hKey = (h) => h.y * 10000 + h.m * 100 + h.d;

/** Hicri → Unix gün numarası; geçersizse null. Ümmülkura için Intl üzerinden ikili arama. */
export function hijriToDay(cal, y, m, d) {
  if (cal === 'islamic-civil' || !getFmt(cal)) {
    const n = civilToDay(y, m, d);
    const back = dayToCivil(n);
    return back.y === y && back.m === m && back.d === d ? n : null;
  }
  const target = y * 10000 + m * 100 + d;
  let lo = civilToDay(y, m, 1) - 45, hi = lo + 120; // civil tahmin ± birkaç gün
  while (lo < hi) { const mid = Math.floor((lo + hi) / 2); if (hKey(hijriFromDay(cal, mid)) < target) lo = mid + 1; else hi = mid; }
  return hKey(hijriFromDay(cal, lo)) === target ? lo : null;
}

/* ---------- Dini günler (tahmini) ---------- */
/** Verilen Miladi yıl için dini gün listesi: [{n (gün no), label, kind}] */
export function religiousDays(cal, gy) {
  const hy1 = hijriFromDay(cal, dayNum(gy, 1, 1)).y, hy2 = hijriFromDay(cal, dayNum(gy, 12, 31)).y;
  const out = [];
  const add = (n, label, kind) => { if (n != null && gregFromDay(n).y === gy) out.push({ n, label, kind }); };
  for (let hy = hy1; hy <= hy2; hy++) {
    const at = (m, d) => hijriToDay(cal, hy, m, d);
    const night = (m, d) => { const n = at(m, d); return n == null ? null : n - 1; }; // kandil: önceki akşam
    add(at(1, 1), `Hicri yılbaşı (1 Muharrem ${hy})`, 'gun');
    add(at(1, 10), 'Aşure Günü (10 Muharrem)', 'gun');
    add(night(3, 12), 'Mevlid Kandili (akşamı)', 'kandil');
    add(at(7, 1), 'Üç Ayların başlangıcı (1 Recep)', 'gun');
    const r1 = at(7, 1);
    if (r1 != null) { const wd = ((r1 + 4) % 7 + 7) % 7; const toFri = (5 - wd + 7) % 7; add(r1 + toFri - 1, 'Regaib Kandili (akşamı)', 'kandil'); }
    add(night(7, 27), 'Miraç Kandili (akşamı)', 'kandil');
    add(night(8, 15), 'Berat Kandili (akşamı)', 'kandil');
    add(at(9, 1), `Ramazan başlangıcı (1 Ramazan ${hy})`, 'gun');
    add(night(9, 27), 'Kadir Gecesi (akşamı)', 'kandil');
    const sv = at(10, 1);
    if (sv != null) { add(sv - 1, 'Ramazan Bayramı arifesi', 'gun'); add(sv, 'Ramazan Bayramı 1. gün', 'bayram'); add(sv + 2, 'Ramazan Bayramı 3. gün', 'gun'); }
    const kb = at(12, 10);
    if (kb != null) { add(kb - 1, 'Kurban Bayramı arifesi', 'gun'); add(kb, 'Kurban Bayramı 1. gün', 'bayram'); add(kb + 3, 'Kurban Bayramı 4. gün', 'gun'); }
  }
  return out.sort((a, b) => a.n - b.n);
}

/* ---------- Arayüz ---------- */
if (typeof document !== 'undefined') {
  const $ = (id) => document.getElementById(id);
  const todayN = (() => { const t = new Date(); return dayNum(t.getFullYear(), t.getMonth() + 1, t.getDate()); })();
  const iso = (g) => `${g.y}-${String(g.m).padStart(2, '0')}-${String(g.d).padStart(2, '0')}`;
  let last = null;

  const cal = () => $('cal').value;
  const mode = () => document.querySelector('input[name="mode"]:checked').value;
  const hide = () => { $('result').hidden = true; $('result').classList.remove('is-active'); last = null; };

  function renderToday() {
    const c = cal(), other = c === 'islamic-umalqura' ? 'islamic-civil' : 'islamic-umalqura';
    $('today-hijri').textContent = fmtHijri(hijriFromDay(c, todayN));
    $('today-greg').textContent = fmtGreg(todayN);
    $('today-other').textContent = `${CAL_LABEL[other]} takvimine göre: ${fmtHijri(hijriFromDay(other, todayN))}`;
  }

  function renderEvents() {
    const gy = parseInt($('ev-year').value, 10);
    const list = $('ev-list');
    list.textContent = '';
    if (!(gy >= 1900 && gy <= 2100)) { const li = document.createElement('li'); li.textContent = 'Yıl 1900 ile 2100 arasında olmalı.'; list.append(li); return; }
    for (const e of religiousDays(cal(), gy)) {
      const li = document.createElement('li');
      li.className = 'hm-ev hm-' + e.kind;
      const a = document.createElement('span'); a.className = 'hm-ev-d'; a.textContent = fmtGreg(e.n);
      const b = document.createElement('span'); b.textContent = e.label;
      li.append(a, b);
      list.append(li);
    }
  }

  function compute() {
    showError($('error'), '');
    const c = cal();
    let n, h;
    if (mode() === 'g2h') {
      const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec($('gdate').value);
      if (!mt) { hide(); return; }
      const y = +mt[1], m = +mt[2], d = +mt[3];
      if (y < 1900 || y > 2100 || !isGregValid(y, m, d)) { hide(); showError($('error'), 'Miladi tarih geçersiz ya da desteklenen aralığın (1900–2100) dışında. Tarihi takvimden yeniden seçin.'); return; }
      n = dayNum(y, m, d); h = hijriFromDay(c, n);
    } else {
      const d = parseInt($('hday').value, 10), m = parseInt($('hmonth').value, 10), y = parseInt($('hyear').value, 10);
      if (!(d >= 1 && d <= 30) || !(y >= 1318 && y <= 1500)) {
        hide();
        if ($('hday').value && $('hyear').value) showError($('error'), 'Hicri gün 1–30, yıl 1318–1500 arasında olmalı. Değerleri kontrol edip yeniden deneyin.');
        return;
      }
      n = hijriToDay(c, y, m, d);
      if (n == null) { hide(); showError($('error'), `${HIJRI_MONTHS[m - 1]} ${y} ayında ${d}. gün yok; hicri aylar 29 ya da 30 gündür. Günü 29'a düşürün.`); return; }
      h = { y, m, d };
    }
    last = { n, h, c };
    const g = gregFromDay(n);
    const rh = $('r-hijri');
    rh.textContent = fmtHijri(h);
    rh.dataset.day = h.d; rh.dataset.month = h.m; rh.dataset.year = h.y;
    $('r-greg').textContent = `${g.d} ${GREG_MONTHS[g.m - 1]} ${g.y}`;
    $('r-greg').dataset.iso = iso(g);
    $('r-weekday').textContent = weekdayOf(n);
    $('r-cal').textContent = CAL_LABEL[c];
    const other = c === 'islamic-umalqura' ? 'islamic-civil' : 'islamic-umalqura';
    $('r-other').textContent = `${fmtHijri(hijriFromDay(other, n))} (${CAL_LABEL[other]})`;
    $('r-diff').textContent = n === todayN ? 'Bugün' : (n > todayN ? `${n - todayN} gün sonra` : `${todayN - n} gün önce`);
    $('result').hidden = false; $('result').classList.add('is-active');
  }

  function syncMode() {
    const g2h = mode() === 'g2h';
    $('box-g').hidden = !g2h; $('box-h').hidden = g2h;
    compute();
  }

  for (const id of ['gdate', 'hday', 'hmonth', 'hyear']) { $(id).addEventListener('input', compute); $(id).addEventListener('change', compute); }
  for (const r of document.querySelectorAll('input[name="mode"]')) r.addEventListener('change', syncMode);
  $('cal').addEventListener('change', () => { compute(); renderToday(); renderEvents(); });
  $('ev-year').addEventListener('input', renderEvents);
  $('form').addEventListener('submit', (e) => { e.preventDefault(); compute(); });
  $('use-today').addEventListener('click', () => {
    $('gdate').value = iso(gregFromDay(todayN));
    document.querySelector('input[name="mode"][value="g2h"]').checked = true;
    syncMode();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const g = gregFromDay(last.n);
    const txt = `${fmtHijri(last.h)} (${CAL_LABEL[last.c]}) = ${g.d} ${GREG_MONTHS[g.m - 1]} ${g.y} ${weekdayOf(last.n)}`;
    try { await navigator.clipboard.writeText(txt); st.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });

  // Varsayılanlar
  $('ev-year').value = gregFromDay(todayN).y;
  $('hmonth').innerHTML = HIJRI_MONTHS.map((n, i) => `<option value="${i + 1}">${n}</option>`).join('');
  renderToday(); renderEvents();
  document.documentElement.dataset.ready = '1';
}
