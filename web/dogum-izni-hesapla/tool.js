// Doğum İzni Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz tarih ve kazanç bilgisi cihazınızdan çıkmaz.
// Kurallar: 7578 sayılı Kanun (RG 01.05.2026/33240) ile değişik 4857 md. 74, ek md. 2; 657 md. 104, 108; 5510 md. 17, 18; 4447 ek md. 5.
import { showError, downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DAY = 86400000;
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => nf2.format(n) + ' TL';
const WEEKDAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const pad = (n) => String(n).padStart(2, '0');

/* Varsayılanlar parametreler.json ile aynıdır; dosya okunamazsa (ör. çevrimdışı önbellekte yoksa) bunlar kullanılır. */
export const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: '7578 sayılı Kanun (RG 01.05.2026, sayı 33240); 4857 md. 74 ve ek md. 2; 657 md. 104 ve 108; 5510 md. 17 ve 18; 4447 ek md. 5.',
  dogum_oncesi_hafta: 8,
  cogul_ek_hafta: 2,
  dogum_sonrasi_hafta: 16,
  calisma_en_gec_hafta: 2,
  babalik_izni_gun: 10,
  isci_ucretsiz_izin_ay: 6,
  memur_ayliksiz_izin_ay: 24,
  yarim_calisma_gun: [60, 120, 180],
  yarim_calisma_cogul_ek_gun: 30,
  yarim_calisma_engelli_gun: 360,
  yarim_calisma_prim_sarti_gun: 600,
  yarim_calisma_basvuru_gun: 30,
  memur_yarim_gun_ay: [2, 4, 6],
  memur_yarim_gun_cogul_ek_ay: 1,
  memur_yarim_gun_engelli_ay: 12,
  sut_izni_isci_saat: 1.5,
  sut_izni_memur_ilk6_saat: 3,
  sut_izni_memur_ikinci6_saat: 1.5,
  odenek_pay: 2,
  odenek_payda: 3,
  odenek_prim_sarti_gun: 90,
  az_prim_esigi_gun: 180,
  az_prim_tavan_kat: 2,
  asgari_ucret_brut: 33030,
  asgari_ucret_yil: 2026,
  gecis_yururluk: '2026-05-01',
  gecis_esik: '2026-04-01',
  gecis_ek_hafta: 8,
  gecis_basvuru_is_gunu: 10,
  gecis_tahmini_son_basvuru: '2026-05-15',
  // 7578 öncesi kurallar (1 Mayıs 2026'dan önce izni bitmiş doğumlar için)
  eski_dogum_sonrasi_hafta: 8,
  eski_calisma_en_gec_hafta: 3,
  eski_babalik_izni_gun: 5,
};

/** 7578 sayılı Kanun öncesi parametreler: doğum sonrası 8 hafta, hekim onayıyla doğuma 3 hafta kalana kadar çalışma. */
export function oldRulesParams(P = DEFAULTS) {
  return { ...P, dogum_sonrasi_hafta: P.eski_dogum_sonrasi_hafta, calisma_en_gec_hafta: P.eski_calisma_en_gec_hafta };
}

/* ---------- Tarih yardımcıları ----------
   Tarihler UTC gün numarası (tamsayı) olarak tutulur; saat dilimi ve yaz saati kayması olmaz. */

/** "YYYY-AA-GG" biçimini gün numarasına çevirir; geçersiz tarih (ör. 2027-02-29) için null. */
export function parseISODate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s ?? '').trim());
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  const t = Date.UTC(y, mo - 1, d);
  const dt = new Date(t);
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return Math.round(t / DAY);
}
const toDate = (n) => new Date(n * DAY);
/** Gün numarasını GG.AA.YYYY biçiminde yazar. */
export function fmt(n) { const d = toDate(n); return pad(d.getUTCDate()) + '.' + pad(d.getUTCMonth() + 1) + '.' + d.getUTCFullYear(); }
export function fmtLong(n) { return fmt(n) + ' ' + WEEKDAYS[toDate(n).getUTCDay()]; }
const compact = (n) => { const d = toDate(n); return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()); };
const yearOf = (n) => toDate(n).getUTCFullYear();
const isWeekend = (n) => { const w = toDate(n).getUTCDay(); return w === 0 || w === 6; };
/** Ay ekler; hedef ayda aynı gün yoksa ayın son günü alınır (ör. 29 Şubat + 12 ay = 28 Şubat). */
export function addMonths(n, months) {
  const d = toDate(n);
  const y = d.getUTCFullYear(), m = d.getUTCMonth() + months, day = d.getUTCDate();
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return Math.round(Date.UTC(y, m, Math.min(day, last)) / DAY);
}
function todayNum() { const t = new Date(); return Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / DAY); }

/** Türkçe ondalık (virgül) ve binlik (nokta) biçimlerini sayıya çevirir; geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '').replace(/₺|TL|tl/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  const hasC = t.includes(','), hasD = t.includes('.');
  if (hasC && hasD) t = t.replace(/\./g, '').replace(',', '.');
  else if (hasC) t = t.replace(',', '.');
  else if (hasD && /^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if ((t.match(/\./g) || []).length > 1 || (t.match(/,/g) || []).length > 0) return NaN;
  return Number(t);
}

/* ---------- Saf hesap ---------- */

/**
 * Analık izni hesabı.
 * status: 'isci' | 'memur'; multiple: çoğul gebelik; due: tahmini doğum (gün no); birth: gerçekleşen doğum (gün no ya da null);
 * preWeeks: doğumdan kaç hafta önce izne çıkılacağı (kanuni süre ya da hekim onayıyla en az 2 hafta).
 */
export function calcLeave({ status = 'isci', multiple = false, due, birth = null, preWeeks = null }, P = DEFAULTS) {
  const fullPre = (P.dogum_oncesi_hafta + (multiple ? P.cogul_ek_hafta : 0)) * 7; // 56 ya da 70 gün
  const postBase = P.dogum_sonrasi_hafta * 7; // 112 gün
  const pw = preWeeks == null ? fullPre / 7 : Math.min(fullPre / 7, Math.max(P.calisma_en_gec_hafta, preWeeks));
  const W = due - fullPre; // kanuni doğum öncesi izin başlangıcı
  const S = due - pw * 7; // seçilen başlangıç (hekim onayıyla çalışılırsa daha geç)
  const b = birth ?? due; // esas alınan doğum tarihi
  let start, pre, worked, unused, memurExtra = 0;
  if (b >= S) {
    // izne çıktıktan sonra (ya da tam tarihinde / geç) doğum
    start = S; pre = b - S;
    worked = S - W; // hekim onayıyla çalışılan günler doğum sonrasına eklenir
    unused = Math.max(0, due - b); // erken doğumda kullanılamayan doğum öncesi günler doğum sonrasına eklenir
  } else {
    // doğum, izne çıkılmadan önce gerçekleşti: doğum öncesi izin kullanılmadı
    start = b; pre = 0;
    if (b >= W) { worked = b - W; unused = due - b; } // toplam = kanuni doğum öncesi süre
    else {
      worked = 0; unused = fullPre;
      // 657 md. 104/A: doğum öncesi iznin başlaması gereken tarihten önceki doğumda aradaki süre de eklenir
      if (status === 'memur') memurExtra = W - b;
    }
  }
  const post = postBase + worked + unused + memurExtra;
  const end = b + post - 1; // doğum günü doğum sonrası iznin ilk günüdür
  const ret = end + 1;
  const total = pre + post;
  const lateDays = Math.max(0, b - due);
  return {
    status, multiple, preWeeks, fullPre, postBase, W, S, due, b, birthGiven: birth != null, start, pre, post, worked, unused, memurExtra,
    end, ret, total, lateDays, earlyDays: Math.max(0, due - b),
    // geç doğumda fazladan geçen günler ödenek tahminine katılmaz (SGK uygulaması esas)
    allowanceDays: total - lateDays,
  };
}

/** SGK analık (doğum) ödeneği tahmini: günlük kazanç x 2/3 x ödenek günü (5510 md. 18). */
export function calcAllowance({ daily, lt180 = false }, days, P = DEFAULTS) {
  const floor = P.asgari_ucret_brut / 30;
  let base = daily, capped = false;
  if (lt180) {
    const cap = floor * P.az_prim_tavan_kat; // 5510 md. 17: son 12 ayda 180 günden az prim varsa tavan
    if (base > cap) { base = cap; capped = true; }
  }
  const perDayExact = (base * P.odenek_pay) / P.odenek_payda;
  return {
    base, capped, floor,
    perDay: Math.round(perDayExact * 100) / 100,
    total: Math.round(perDayExact * days * 100) / 100,
    days,
    belowFloor: daily < floor - 0.005,
  };
}

/** Yarım çalışma (işçi, gün) ya da yarım gün (memur, ay) süresi. order: 1, 2, 3 (3 = üçüncü ve sonrası). */
export function halfTime(status, order, multiple, disabled, P = DEFAULTS) {
  const i = Math.min(3, Math.max(1, order)) - 1;
  if (status === 'memur') {
    if (disabled) return { unit: 'ay', value: P.memur_yarim_gun_engelli_ay };
    return { unit: 'ay', value: P.memur_yarim_gun_ay[i] + (multiple ? P.memur_yarim_gun_cogul_ek_ay : 0) };
  }
  if (disabled) return { unit: 'gün', value: P.yarim_calisma_engelli_gun };
  return { unit: 'gün', value: P.yarim_calisma_gun[i] + (multiple ? P.yarim_calisma_cogul_ek_gun : 0) };
}

/**
 * 7578 geçici md. 1 açısından durum. r, calcLeave sonucudur (hangi kuralla hesaplandığı fark etmez).
 * 'yeni': doğum yürürlükten sonra; 'devam': eski kurala göre izin yürürlük günü sürüyordu (yeni süre uygulanır);
 * 'gecis': eski izin bitmiş, 1/4/2026 itibarıyla 24 hafta dolmamış (talep hâlinde +8 hafta); 'kapsam-disi': eski kural.
 */
export function transitionStatus(r, P = DEFAULTS) {
  const law = parseISODate(P.gecis_yururluk);
  const esik = parseISODate(P.gecis_esik);
  if (r.b >= law) return 'yeni';
  const old = calcLeave({ status: r.status, multiple: r.multiple, due: r.due, birth: r.birthGiven ? r.b : null, preWeeks: r.preWeeks }, oldRulesParams(P));
  if (old.end >= law) return 'devam';
  if (r.b + 24 * 7 - 1 >= esik) return 'gecis';
  return 'kapsam-disi';
}

/* ---------- .ics (takvim) ---------- */
const icsEscape = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
/** 75 sekizli sınırını aşmamak için uzun satırları katlar (Türkçe harfler 2 bayt olabilir; 60 karakterde bölünür). */
function fold(line) {
  const out = [];
  let rest = line;
  while (rest.length > 60) { out.push(rest.slice(0, 60)); rest = ' ' + rest.slice(60); }
  out.push(rest);
  return out.join('\r\n');
}
export function buildICS(r, extra = []) {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bilisim Ajans//Dogum Izni Hesaplama//TR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Doğum izni'];
  const ev = (key, startN, endExcl, name, desc) => {
    lines.push('BEGIN:VEVENT', `UID:dogum-izni-${compact(r.due)}-${key}@araclar.bilisimajans.com`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(startN)}`, `DTEND;VALUE=DATE:${compact(endExcl)}`,
      fold(`SUMMARY:${icsEscape(name)}`), fold(`DESCRIPTION:${icsEscape(desc)}`), 'TRANSP:TRANSPARENT', 'END:VEVENT');
  };
  const note = 'Bilgilendirme amaçlı tahmindir; kesin süre için işvereninize, kurumunuza veya SGK\'ya danışın.';
  if (r.pre > 0) ev('dogum-oncesi', r.start, r.b, 'Doğum öncesi analık izni', `${r.pre} gün. ${note}`);
  ev('dogum-sonrasi', r.b, r.ret, 'Doğum sonrası analık izni', `${r.post} gün. Son gün ${fmt(r.end)}. ${note}`);
  ev('ise-donus', r.ret, r.ret + 1, 'İşe dönüş', `Ücretli analık izni bitti (toplam ${r.total} gün). ${note}`);
  for (const x of extra) ev(x.key, x.day, x.day + 1, x.name, `${x.desc} ${note}`);
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

/* ---------- Arayüz ---------- */
let P = { ...DEFAULTS };
let last = null; // son hesap (takvim indirme için)

function showResult(el) { el.hidden = false; el.classList.add('is-active'); }
function hideResult(el) { el.hidden = true; el.classList.remove('is-active'); }
function fail(msg) { hideResult($('result')); last = null; showError($('error'), msg); }
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) P = { ...DEFAULTS, ...(await res.json()) };
  } catch (e) { /* çevrimdışıysa varsayılanlar kullanılır */ }
  const d = parseISODate(P.guncelleme);
  const txt = d == null ? P.guncelleme : new Date(d * DAY).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  $('params-line').textContent = 'Parametreler ' + txt + ' tarihinde güncellendi. Kaynak: ' + P.kaynak;
}

const statusVal = () => (document.querySelector('input[name="status"]:checked') || {}).value || 'isci';
const multipleVal = () => ((document.querySelector('input[name="preg"]:checked') || {}).value === 'cogul');
const earnModeVal = () => (document.querySelector('input[name="earnmode"]:checked') || {}).value || 'uc-ay';

/** Doğum öncesi hafta seçeneklerini gebelik tipine göre yeniden kurar. */
function buildPreOptions() {
  const sel = $('preweeks');
  const prev = sel.value;
  const full = P.dogum_oncesi_hafta + (multipleVal() ? P.cogul_ek_hafta : 0);
  sel.textContent = '';
  for (let w = full; w >= P.calisma_en_gec_hafta; w--) {
    const label = w === full
      ? `Doğumdan ${w} hafta önce izne çıkacağım (kanuni süre)`
      : `Hekim onayıyla doğuma ${w} hafta kalana kadar çalışacağım`;
    const o = el('option', null, label);
    o.value = w === full ? 'tam' : String(w);
    sel.append(o);
  }
  sel.value = [...sel.options].some((o) => o.value === prev) ? prev : 'tam';
}

function syncMode() {
  const memur = statusVal() === 'memur';
  $('sgk-box').hidden = memur;
  $('memur-note').hidden = !memur;
  const daily = earnModeVal() === 'gunluk';
  $('earn-3ay').hidden = daily;
  $('earn-daily').hidden = !daily;
}

/** Kazanç alanlarını okur. Boşsa null, hatalıysa { error }. */
function readEarnings() {
  if (earnModeVal() === 'gunluk') {
    const raw = $('daily').value.trim();
    if (!raw) return null;
    const v = parseNum(raw);
    if (!Number.isFinite(v) || v <= 0) return { error: 'Günlük brüt kazanç okunamadı. Yalnızca rakam ve ondalık için virgül kullanın (örnek: 1.200 ya da 1200,50).' };
    if (v > 100000) return { error: 'Günlük brüt kazanç çok yüksek görünüyor. Aylık tutarı girdiyseniz "Son 3 ayın kazancı" seçeneğini kullanın ya da tutarı 30\'a bölün.' };
    return { daily: v };
  }
  const rawE = $('earn3').value.trim();
  const rawD = $('days3').value.trim();
  if (!rawE && !rawD) return null;
  if (!rawE) return { error: 'Son 3 ayın prime esas kazanç toplamını da girin; tutar bordronuzda ya da e-Devlet\'teki SGK hizmet dökümünde yazar.' };
  const e = parseNum(rawE);
  if (!Number.isFinite(e) || e <= 0) return { error: 'Son 3 ayın prime esas kazanç toplamı okunamadı. Rakam ve virgül kullanın (örnek: 108.000 ya da 108000,50).' };
  if (!rawD) return { error: 'Bu 3 aydaki prim gün sayısını da girin (çoğu tam çalışan için 90).' };
  const d = Number(rawD.replace(',', '.'));
  if (!Number.isInteger(d) || d < 1 || d > 90) return { error: 'Prim gün sayısı 1 ile 90 arasında bir tam sayı olmalı (3 ayda en fazla 90 gün). Hizmet dökümünüzdeki son 3 ayın gün sayılarını toplayın.' };
  return { daily: e / d, earn3: e, days3: d };
}

function row(dl, label, value, strong = false, id = null) {
  const r = el('div', 'kdv-row' + (strong ? ' is-strong' : ''));
  r.append(el('dt', null, label));
  const dd = el('dd', null, value);
  if (id) dd.id = id;
  r.append(dd);
  dl.append(r);
}
function card(title, paras, cls = '') {
  const c = el('section', 'dg-card' + (cls ? ' ' + cls : ''));
  c.append(el('h4', null, title));
  for (const p of paras) {
    if (p instanceof Node) c.append(p); else c.append(el('p', null, p));
  }
  return c;
}

function run() {
  showError($('error'), '');
  const status = statusVal();
  const multiple = multipleVal();
  const dueRaw = $('due').value;
  if (!dueRaw) return fail('Tahmini doğum tarihini girin. Bilmiyorsanız Gebelik Haftası Hesaplama aracıyla son adet tarihinizden bulabilir ya da hekiminizin raporundaki tarihi kullanabilirsiniz.');
  const due = parseISODate(dueRaw);
  if (due == null) return fail('Tahmini doğum tarihi geçerli bir tarih değil. Gün, ay ve yılı takvimden seçin (örnek: 01.03.2027).');
  if (yearOf(due) < 2000 || yearOf(due) > 2100) return fail('Tahmini doğum tarihi 2000 ile 2100 arasında olmalı. Yılı dört haneli yazdığınızdan emin olun.');
  let birth = null;
  if ($('birth').value) {
    birth = parseISODate($('birth').value);
    if (birth == null) return fail('Gerçekleşen doğum tarihi geçerli bir tarih değil. Takvimden seçin ya da alanı boş bırakın.');
    if (birth - due > 42) return fail('Gerçekleşen doğum tarihi, tahmini tarihten 6 haftadan fazla sonra görünüyor. Tarihleri kontrol edin; gün ile ayın yeri karışmış olabilir.');
    if (due - birth > 140) return fail('Gerçekleşen doğum tarihi, tahmini tarihten 20 haftadan fazla önce görünüyor. Tarihleri kontrol edin; çok erken doğum, düşük ya da ölü doğum hâllerinde kesin süreyi hekim raporu ve SGK/kurumunuz belirler.');
  }
  const pv = $('preweeks').value;
  const preWeeks = pv === 'tam' ? null : Number(pv);
  let earn = null;
  if (status === 'isci') {
    earn = readEarnings();
    if (earn && earn.error) return fail(earn.error);
  }

  // 1 Mayıs 2026'dan önce eski kurala göre izni bitmiş doğumlarda (geçiş ve kapsam dışı) o tarihteki eski süreler geçerlidir.
  let r = calcLeave({ status, multiple, due, birth, preWeeks }, P);
  const ts = transitionStatus(r, P);
  const oldRules = ts === 'gecis' || ts === 'kapsam-disi';
  if (oldRules) r = calcLeave({ status, multiple, due, birth, preWeeks }, oldRulesParams(P));
  const legalWeeks = (r.fullPre + r.postBase) / 7; // 24/26 (eski kuralda 16/18)
  const order = Number($('order').value) || 1;
  const disabled = $('disabled').checked;
  last = { r, status, multiple, order, disabled };

  // Özet
  $('r-big').textContent = `Toplam ${r.total} gün ücretli analık izni · işe dönüş ${fmtLong(r.ret)}`;
  const dl = $('r-list');
  dl.textContent = '';
  row(dl, r.pre > 0 ? 'Doğum öncesi izin başlangıcı' : 'İzin başlangıcı (doğum günü)', fmtLong(r.start), false, 'r-start');
  row(dl, r.birthGiven ? 'Doğum tarihi (gerçekleşen)' : 'Doğum tarihi (tahmini)', fmtLong(r.b), false, 'r-birth');
  row(dl, 'Doğum öncesi izin', `${r.pre} gün`, false, 'r-pre');
  row(dl, 'Doğum sonrası izin', `${r.post} gün`, false, 'r-post');
  row(dl, 'Doğum sonrası iznin son günü', fmtLong(r.end), true, 'r-end');
  row(dl, 'İşe dönüş tarihi', fmtLong(r.ret), true, 'r-return');
  row(dl, 'Toplam ücretli izin', `${r.total} gün (${nf.format(Math.round((r.total / 7) * 10) / 10)} hafta)`, true, 'r-total');

  // Açıklama satırları
  const notes = $('r-notes');
  notes.textContent = '';
  const addNote = (t, cls = '') => notes.append(el('li', cls, t));
  if (oldRules) addNote(`Doğum 1 Mayıs 2026'dan önce gerçekleşti ve eski kurala göre izin bu tarihten önce bitti; bu yüzden süreler 7578 sayılı Kanun öncesi kurala göre (doğum öncesi ${P.dogum_oncesi_hafta}, doğum sonrası ${P.eski_dogum_sonrasi_hafta} hafta; hekim onayıyla doğuma ${P.eski_calisma_en_gec_hafta} hafta kalana kadar çalışma) hesaplandı. Geçiş hükmü için aşağıdaki karta bakın.`, 'is-warn');
  addNote(`Kanuni süre: doğumdan önce ${r.fullPre / 7} hafta, doğumdan sonra ${r.postBase / 7} hafta (${r.fullPre + r.postBase} gün)${multiple ? '; çoğul gebelikte doğum öncesine 2 hafta eklenir' : ''}.`);
  if (r.worked > 0) addNote(`Hekim onayıyla çalıştığınız ${r.worked} gün doğum sonrası izne eklendi.`);
  if (r.unused > 0) addNote(`Erken doğum nedeniyle kullanılamayan ${r.unused} günlük doğum öncesi izin doğum sonrasına eklendi.`);
  if (r.memurExtra > 0) addNote(`657 sayılı Kanun md. 104/A gereği, doğum öncesi iznin başlaması gereken tarihten önce gerçekleşen doğumda aradaki ${r.memurExtra} gün de doğum sonrası izne eklendi.`);
  if (r.lateDays > 0) addNote(`Doğum, tahmini tarihten ${r.lateDays} gün sonra gerçekleşti. Doğum öncesi izin doğuma kadar sürer; fazladan geçen günler doğum sonrası 16 haftadan düşülmez. Bu yüzden toplam süre ${r.total} gündür.`, 'is-warn');
  if (!r.birthGiven) addNote('Doğum gerçekleşince gerçek tarihi girip yeniden hesaplayın; erken ya da geç doğum tarihleri değiştirir.');
  if (isWeekend(r.ret)) addNote(`İşe dönüş günü ${WEEKDAYS[toDate(r.ret).getUTCDay()]} gününe denk geliyor; fiilen ilk iş gününüzde başlarsınız (resmî tatiller ayrıca kontrol edilmeli).`);
  if (r.end < todayNum()) addNote('Hesaplanan izin dönemi geçmişte kalmış. Sonuç bilgi amaçlıdır; o tarihte yürürlükte olan kurallar farklı olabilir (aşağıdaki geçiş kartına bakın).', 'is-warn');

  // Zaman çizelgesi
  const total = r.total || 1;
  $('bar-pre').style.flexGrow = String(r.pre);
  $('bar-post').style.flexGrow = String(r.post);
  $('bar-pre').hidden = r.pre === 0;
  $('bar-pre-label').textContent = `Doğum öncesi ${r.pre} gün`;
  $('bar-post-label').textContent = `Doğum sonrası ${r.post} gün`;
  $('bar').setAttribute('aria-label', `Zaman çizelgesi: doğum öncesi ${r.pre} gün, doğum sonrası ${r.post} gün, toplam ${total} gün`);

  const events = [];
  if (r.worked > 0 && r.b >= r.S) events.push([r.W, `Hekim onayıyla çalışmaya devam (${r.worked} gün sonra izne eklenir)`]);
  if (r.pre > 0) events.push([r.start, 'Doğum öncesi analık izni başlar']);
  events.push([r.b, r.birthGiven ? 'Doğum' : 'Tahmini doğum — doğum sonrası izin başlar']);
  events.push([r.end, 'Ücretli analık izninin son günü']);
  events.push([r.ret, 'İşe dönüş (ya da isteğe bağlı izinlerin başlangıcı)']);

  // Kartlar
  const cards = $('r-cards');
  cards.textContent = '';
  const ht = halfTime(status, order, multiple, disabled, P);
  const extraIcs = [];
  if (status === 'isci') {
    const unpaidEnd = addMonths(r.ret, P.isci_ucretsiz_izin_ay) - 1;
    const halfEnd = r.ret + ht.value - 1;
    const oneYear = addMonths(r.b, 12);
    events.push([unpaidEnd, '6 aylık ücretsiz izin seçilirse son gün']);
    events.push([oneYear, 'Çocuk 1 yaşında — süt izni sona erer']);
    extraIcs.push({ key: 'ucretsiz-izin-sonu', day: unpaidEnd, name: 'İsteğe bağlı ücretsiz iznin son günü', desc: `4857 md. 74: ${P.isci_ucretsiz_izin_ay} aya kadar ücretsiz izin (talep ederseniz).` });
    cards.append(card('Babalık izni', [oldRules
      ? `Doğum 1 Mayıs 2026'dan önce olduğu için eşi doğum yapan işçiye o tarihte geçerli ${P.eski_babalik_izni_gun} gün ücretli izin uygulanır (4857 sayılı Kanun ek md. 2; 7578 sayılı Kanunla ${P.babalik_izni_gun} güne çıktı).`
      : `Eşi doğum yapan işçiye ${P.babalik_izni_gun} gün ücretli izin verilir (4857 sayılı Kanun ek md. 2; 7578 sayılı Kanunla ${P.eski_babalik_izni_gun} günden ${P.babalik_izni_gun} güne çıktı). Doğumdan sonra işverene bildirerek kullanılır.`]));
    cards.append(card('6 aya kadar ücretsiz izin', [`İsteğiniz hâlinde ${legalWeeks} haftalık sürenin bitiminden sonra ${P.isci_ucretsiz_izin_ay} aya kadar ücretsiz izin: ${fmt(r.ret)} – ${fmt(unpaidEnd)}. Bu süre yıllık izin hesabında dikkate alınmaz.`], 'is-unpaid'));
    cards.append(card('Yarım çalışma ve ödeneği', [
      `${disabled ? 'Çocuk engelli doğduğu için' : (order >= 3 ? 'Üçüncü ve sonraki doğumda' : order === 2 ? 'İkinci doğumda' : 'İlk doğumda')}${multiple && !disabled ? ' (çoğul doğum, +30 gün)' : ''} analık izninin bitiminden itibaren ${ht.value} gün haftalık çalışma süresinin yarısı kadar çalışabilirsiniz: ${fmt(r.ret)} – ${fmt(halfEnd)}.`,
      `İŞKUR yarım çalışma ödeneği günlük brüt asgari ücret kadardır (${P.asgari_ucret_yil} için yaklaşık ${money(P.asgari_ucret_brut / 30)}). Şartlar: doğumdan önceki son 3 yılda en az ${P.yarim_calisma_prim_sarti_gun} gün işsizlik sigortası primi ve analık izninin bitiminden itibaren ${P.yarim_calisma_basvuru_gun} gün içinde başvuru. Bu sürede süt izni kullanılmaz; 6 aylık ücretsiz izinle aynı anda kullanılamaz.`,
    ], 'is-half'));
    cards.append(card('Süt izni', [`Çocuğunuz 1 yaşını dolduracağı ${fmt(oneYear)} tarihine kadar günde toplam ${nf.format(P.sut_izni_isci_saat)} saat süt izni; saatleri ve kaça bölüneceğini siz belirlersiniz, çalışma süresinden sayılır.`]));
  } else {
    const halfEnd = addMonths(r.ret, ht.value) - 1;
    const unpaidEnd = addMonths(r.ret, P.memur_ayliksiz_izin_ay) - 1;
    const unpaidAfterHalfEnd = addMonths(halfEnd + 1, P.memur_ayliksiz_izin_ay) - 1;
    const fatherEnd = addMonths(r.b, P.memur_ayliksiz_izin_ay) - 1;
    const milk1 = addMonths(r.ret, 6) - 1, milk2 = addMonths(r.ret, 12) - 1;
    events.push([halfEnd, `Yarım gün çalışma (${ht.value} ay) seçilirse son gün`]);
    cards.append(card('Babalık izni', [`Eşi doğum yapan memura isteği üzerine ${P.babalik_izni_gun} gün babalık izni verilir (657 sayılı Kanun md. 104/B).`]));
    cards.append(card('Yarım gün çalışma', [`${disabled ? 'Çocuk engelli doğduğu için' : (order >= 3 ? 'Üçüncü ve sonraki doğumda' : order === 2 ? 'İkinci doğumda' : 'İlk doğumda')}${multiple && !disabled ? ' (çoğul doğum, +1 ay)' : ''} analık izninin bitiminden itibaren ${ht.value} ay günlük çalışma süresinin yarısı kadar çalışabilirsiniz: ${fmt(r.ret)} – ${fmt(halfEnd)}. Bu sürede ayrıca süt izni verilmez (657 md. 104/F).`], 'is-half'));
    cards.append(card('Süt izni', [`Doğum sonrası izin bitiminden itibaren ilk 6 ay günde ${nf.format(P.sut_izni_memur_ilk6_saat)} saat (${fmt(r.ret)} – ${fmt(milk1)}), ikinci 6 ay günde ${nf.format(P.sut_izni_memur_ikinci6_saat)} saat (${fmt(milk1 + 1)} – ${fmt(milk2)}) (657 md. 104/D).`]));
    cards.append(card('Aylıksız izin (md. 108/B)', [`Doğum yapan memura isteği hâlinde ${P.memur_ayliksiz_izin_ay} aya kadar aylıksız izin: analık izni bitiminden itibaren ${fmt(r.ret)} – ${fmt(unpaidEnd)}; yarım gün çalışma kullanılırsa onun bitiminden itibaren ${fmt(halfEnd + 1)} – ${fmt(unpaidAfterHalfEnd)}. Eşi doğum yapan memura doğum tarihinden itibaren ${fmt(r.b)} – ${fmt(fatherEnd)}.`], 'is-unpaid'));
  }

  // SGK analık ödeneği
  const sgk = $('r-sgk');
  sgk.textContent = '';
  if (status === 'memur') {
    sgk.append(card('SGK analık ödeneği', ['Memurlar analık izni süresince aylıklarını kurumlarından almaya devam eder; SGK analık (doğum) ödeneği 4/1-a kapsamındaki işçi sigortalılar içindir.']));
  } else if (!earn) {
    sgk.append(card('SGK analık (doğum) ödeneği', [`Tahmin için "SGK doğum parası" alanlarına son 3 ayın prime esas kazancını ve prim gün sayısını ya da günlük brüt kazancınızı girin. Ödenek, günlük kazancın 2/3'ü × ${r.allowanceDays} gün olarak hesaplanır.`]));
  } else if (!$('prim90').checked) {
    sgk.append(card('SGK analık (doğum) ödeneği', [`Doğumdan önceki 1 yıl içinde en az ${P.odenek_prim_sarti_gun} gün kısa vadeli sigorta primi bildirilmemişse analık ödeneği hakkı doğmaz (5510 md. 18). Prim gün sayınızı e-Devlet'teki SGK hizmet dökümünden kontrol edin.`], 'is-warn'));
  } else {
    const a = calcAllowance({ daily: earn.daily, lt180: $('lt180').checked }, r.allowanceDays, P);
    const box = card('SGK analık (doğum) ödeneği tahmini', []);
    const adl = el('dl', 'kdv-results');
    if (earn.earn3) row(adl, 'Son 3 ay kazanç / prim günü', `${money(earn.earn3)} / ${earn.days3} gün`);
    row(adl, 'Günlük kazanç', money(earn.daily), false, 'r-daily');
    if (a.capped) row(adl, 'Tavan uygulanan günlük kazanç', money(a.base));
    row(adl, 'Günlük ödenek (2/3)', money(a.perDay), false, 'r-perday');
    row(adl, 'Ödenek günü', `${a.days} gün`, false, 'r-allowdays');
    row(adl, 'Tahmini toplam ödenek', money(a.total), true, 'r-allowance');
    box.append(adl);
    box.append(el('p', 'kdv-note', `Şart: doğumdan önceki 1 yılda en az ${P.odenek_prim_sarti_gun} gün kısa vadeli sigorta primi. Ödenek, işverene "çalışmadığına dair bildirim" girildikten sonra SGK tarafından ödenir; hesap tahminidir.`));
    if (a.capped) box.append(el('p', 'kdv-note is-warn', `Son 12 ayda ${P.az_prim_esigi_gun} günden az prim bildirildiği için günlük kazanç, günlük alt sınırın ${P.az_prim_tavan_kat} katıyla (${money(a.floor * P.az_prim_tavan_kat)}) sınırlandı (5510 md. 17). Alt sınır ${P.asgari_ucret_yil} brüt asgari ücretinden (${money(P.asgari_ucret_brut)}) hesaplanmıştır; güncel tutarı kontrol edin.${yearOf(r.start) !== P.asgari_ucret_yil ? ` Yaklaşık: SGK, iznin başladığı tarihteki (${yearOf(r.start)} yılı) alt sınırı kullanır.` : ''}`));
    if (ts === 'gecis') box.append(el('p', 'kdv-note is-warn', `Geçiş hükmüyle talep üzerine verilen ${P.gecis_ek_hafta} haftalık ilave izin bu tahmine katılmadı.`));
    if (a.belowFloor) box.append(el('p', 'kdv-note is-warn', `Girdiğiniz günlük kazanç, ${P.asgari_ucret_yil} günlük alt sınırının (yaklaşık ${money(a.floor)}) altında görünüyor. Tutarı ve gün sayısını kontrol edin.`));
    if (r.lateDays > 0) box.append(el('p', 'kdv-note is-warn', `Yaklaşık: geç doğum nedeniyle fazladan geçen ${r.lateDays} gün ödenek tahminine katılmadı; bu günler için ödemeyi SGK uygulaması belirler.`));
    sgk.append(box);
  }

  // Geçiş kartı (7578 geçici md. 1)
  const gecis = $('r-gecis');
  gecis.textContent = '';
  const gTxt = {
    yeni: 'Doğum 1 Mayıs 2026 ve sonrasında olduğundan yeni süreler (24 hafta; çoğulda 26 hafta) doğrudan uygulanır.',
    devam: 'Eski kurala göre doğum sonrası izniniz 1 Mayıs 2026\'da hâlâ devam ediyordu; yeni kanun yayımı tarihinde yürürlüğe girdiği için doğum sonrası 16 haftalık süre uygulanır. Kesin uygulama için işvereninize ya da kurumunuza danışın.',
    gecis: `Geçiş hükmü kapsamında görünüyorsunuz: eski kurala göre analık izniniz 1 Mayıs 2026'dan önce bitmiş, ancak 1 Nisan 2026 itibarıyla doğumdan itibaren 24 hafta dolmamış. Bu durumdakilere, yürürlük tarihinden itibaren ${P.gecis_basvuru_is_gunu} iş günü içinde (yaklaşık ${fmt(parseISODate(P.gecis_tahmini_son_basvuru))} tarihine kadar) talep etmeleri hâlinde ${P.gecis_ek_hafta} hafta ilave analık izni verilir. Yukarıdaki tarihler eski kurala göredir; ilave izin talep tarihinden sonra ayrıca kullanılır. Başvuru süresi geçtiyse işvereninize ya da kurumunuza danışın.`,
    'kapsam-disi': 'Doğumdan itibaren 24 haftalık süre 1 Nisan 2026\'dan önce dolduğu için geçiş hükmündeki 8 haftalık ilave izin kapsamında görünmüyorsunuz. Bu doğum için o tarihte yürürlükte olan eski süreler (8 + 8 hafta) geçerlidir.',
  };
  gecis.append(card('Geçiş hükmü (7578 sayılı Kanun geçici md. 1)', [gTxt[ts]], ts === 'gecis' || ts === 'kapsam-disi' ? 'is-warn' : ''));
  gecis.dataset.status = ts;

  // Memur parametre tablosu
  $('memur-table').hidden = status !== 'memur';

  // Zaman çizelgesi listesi
  events.sort((a, b) => a[0] - b[0]);
  const ol = $('timeline');
  ol.textContent = '';
  for (const [d, t] of events) {
    const li = el('li');
    li.append(el('time', null, fmt(d)));
    li.lastChild.setAttribute('datetime', `${yearOf(d)}-${compact(d).slice(4, 6)}-${compact(d).slice(6)}`);
    li.append(el('span', null, t));
    ol.append(li);
  }
  last.extraIcs = extraIcs;
  showResult($('result'));
}

function downloadICS() {
  if (!last) { showError($('error'), 'Önce "Doğum iznini hesapla" düğmesine basın; takvim dosyası hesaplanan tarihlerden oluşturulur.'); return; }
  const blob = new Blob([buildICS(last.r, last.extraIcs || [])], { type: 'text/calendar;charset=utf-8' });
  downloadBlob(blob, 'dogum-izni-takvimi.ics');
  $('ics-status').textContent = 'Takvim dosyası indirildi (dogum-izni-takvimi.ics). Telefonunuzda ya da takvim uygulamanızda açarak içe aktarabilirsiniz.';
}

function init() {
  buildPreOptions();
  syncMode();
  for (const r of document.querySelectorAll('input[name="preg"]')) r.addEventListener('change', () => { buildPreOptions(); if (last) run(); });
  for (const r of document.querySelectorAll('input[name="status"]')) r.addEventListener('change', () => { syncMode(); if (last) run(); });
  for (const r of document.querySelectorAll('input[name="earnmode"]')) r.addEventListener('change', syncMode);
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('ics').addEventListener('click', downloadICS);
  $('clear').addEventListener('click', () => {
    $('form').reset();
    buildPreOptions();
    syncMode();
    hideResult($('result'));
    last = null;
    $('ics-status').textContent = '';
    showError($('error'), '');
    $('due').focus();
  });
  loadParams().then(() => buildPreOptions());
}

init();
