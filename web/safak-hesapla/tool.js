// Şafak Hesaplama — tamamı tarayıcıda çalışır; tarih ve gün sayıları cihazınızdan çıkmaz.
// Hizmet süreleri 7179 sayılı Askeralma Kanunu'na dayanır: md. 5/2 (er/erbaş 6 ay, yedek subay/astsubay 12 ay),
// md. 5/3 (isteğe bağlı 6 ay devam), md. 5/9 (hizmet sevk tarihinde başlar), md. 9 (bedelli: bir aylık temel eğitim),
// md. 32 (firar, izin tecavüzü, hapis infazı gibi hizmetten sayılmayan süreler), md. 39 (dövizle askerlik).
// Paylaşım bağlantısı yalnızca adres çubuğundaki tarih ve sayılardır; son ayar yalnızca bu cihazın localStorage'ında tutulur.
import { showError, downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DAY = 86400000;
const STORE_KEY = 'ba-safak-hesapla';
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const WEEKDAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const nfInt = new Intl.NumberFormat('tr-TR');
const nfPct = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pad = (n) => String(n).padStart(2, '0');

/* Varsayılanlar parametreler.json ile aynıdır; dosya okunamazsa (ör. çevrimdışı önbellekte yoksa) bunlar kullanılır. */
export const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: '7179 sayılı Askeralma Kanunu md. 5, 9, 32 ve 39 (mevzuat.gov.tr).',
  turler: {
    er6: { ad: 'Er / erbaş (kısa dönem) – 6 ay', ay: 6, yaklasik: false },
    ys12: { ad: 'Yedek subay / yedek astsubay – 12 ay', ay: 12, yaklasik: false },
    er12: { ad: 'Er / erbaş + isteğe bağlı 6 ay devam (uzun dönem) – 12 ay', ay: 12, yaklasik: false },
    bedelli: { ad: 'Bedelli askerlik temel eğitimi – 1 ay (28 gün)', gun: 28, yaklasik: true },
    dovizle: { ad: 'Dövizle askerlik (eğitim gün sayısını siz girin)', gun: null, yaklasik: false },
    ozel: { ad: 'Özel gün sayısı', gun: null, yaklasik: false },
  },
  yol_izni_max: 15,
  izin_max: 365,
  ceza_max: 999,
  ozel_gun_max: 730,
  bedelli: { gosterge: 300000, aylik_katsayi: 1.575512, katsayi_baslangic: '2026-07-01', katsayi_bitis: '2026-12-31', kaynak: '7179 md. 9/1; memur aylık katsayısı genelgesi', yaklasik: false },
};

/* ---------- Tarih yardımcıları ----------
   Tarihler UTC gün numarası (tamsayı) olarak tutulur; cihazın saat dilimi ve yaz saati kayması hesabı bozmaz. */

export const dayNum = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / DAY);
const toDate = (n) => new Date(n * DAY);

/** "YYYY-AA-GG" → gün numarası; geçersiz tarih (ör. 2027-02-29) için null. */
export function parseISO(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s ?? '').trim());
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  if (y < 1900 || y > 2200) return null;
  const t = Date.UTC(y, mo - 1, d);
  const dt = new Date(t);
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return Math.round(t / DAY);
}
export function toISO(n) { const d = toDate(n); return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()); }
/** GG.AA.YYYY */
export function fmt(n) { const d = toDate(n); return pad(d.getUTCDate()) + '.' + pad(d.getUTCMonth() + 1) + '.' + d.getUTCFullYear(); }
export const weekday = (n) => WEEKDAYS[toDate(n).getUTCDay()];
/** "30.05.2027 Pazar" */
export const fmtDay = (n) => fmt(n) + ' ' + weekday(n);
/** "30 Mayıs 2027 Pazar" */
export function fmtLong(n) { const d = toDate(n); return d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()] + ' ' + d.getUTCFullYear() + ' ' + weekday(n); }
const compact = (n) => toISO(n).replace(/-/g, '');

/** Ay ekler; hedef ayda aynı gün yoksa ayın son günü alınır (31 Ağustos + 6 ay = 28 ya da 29 Şubat). */
export function addMonths(n, months) {
  const d = toDate(n);
  const y = d.getUTCFullYear(), m = d.getUTCMonth() + months, day = d.getUTCDate();
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return Math.round(Date.UTC(y, m, Math.min(day, last)) / DAY);
}

/** a'dan b'ye kaç tam takvim ayı ve kaç gün var (b > a). */
export function monthsAndDays(a, b) {
  if (b <= a) return { m: 0, d: 0 };
  let m = 0;
  while (m < 1200 && addMonths(a, m + 1) <= b) m++;
  return { m, d: b - addMonths(a, m) };
}

/** [a, b) aralığındaki cumartesi sayısı = kalan hafta sonu sayısı. */
export function countSaturdays(a, b) {
  let n = 0;
  for (let x = a; x < b; x++) if (toDate(x).getUTCDay() === 6) n++;
  return n;
}

/** Bugünün tarihi Türkiye saatine (Europe/Istanbul) göre; gün, İstanbul'da gece yarısı değişir. */
export function istanbulToday(now = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
    const get = (t) => Number(parts.find((p) => p.type === t).value);
    const n = dayNum(get('year'), get('month'), get('day'));
    if (Number.isFinite(n)) return n;
  } catch (e) { /* saat dilimi verisi yoksa aşağıdaki sabit UTC+3 kullanılır */ }
  // Türkiye 2016'dan beri yıl boyu UTC+3 kullanır.
  const t = new Date(now.getTime() + 3 * 3600000);
  return dayNum(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}

/* ---------- Saf hesap ---------- */

const needsDays = (tur) => tur === 'ozel' || tur === 'dovizle';

/**
 * s: { tur, sevk (gün no), gun (özel/dövizle gün sayısı), yol, kullanilan, kalan, ceza, odul }
 * Terhis = sevk + hizmet süresi + ceza/firar günleri − erken terhis/ödül günleri.
 * Şafak = terhis − bugün − kullanılmamış izin − yol izni (kalan iznin terhisten hemen önce kullanıldığı varsayılır).
 */
export function calcSafak(s, today, P0 = DEFAULTS) {
  const t = P0.turler[s.tur] || P0.turler.er6;
  const serviceDays = t.ay ? null : (needsDays(s.tur) ? s.gun : t.gun);
  let base, terhis;
  if (s.tur === 'er12' && t.ay > 6) {
    // md. 5/3: ek 6 ay, "terhise hak kazandığı tarihten itibaren" sayılır. Ceza/firar ilk 6 ayın sonunu
    // (hak kazanma tarihini) öteler; ek dönemde hizmetten sayılmayan süre hükümleri uygulanmaz.
    // Bu yüzden ay sonu sevklerinde sonuç "sevk + 12 ay"dan birkaç gün farklı olabilir (31.08 → 28.02 → 28.08).
    const hak = addMonths(s.sevk, 6);
    base = addMonths(hak, t.ay - 6);
    terhis = addMonths(hak + (s.ceza || 0), t.ay - 6) - (s.odul || 0);
  } else {
    base = t.ay ? addMonths(s.sevk, t.ay) : s.sevk + serviceDays;
    terhis = base + (s.ceza || 0) - (s.odul || 0);
  }
  const leave = (s.kalan || 0) + (s.yol || 0);
  const cikis = terhis - leave; // birlikten fiilen ayrılış günü
  const total = cikis - s.sevk;
  const safak = cikis - today;
  let phase;
  if (today < s.sevk) phase = 'once';
  else if (safak > 0) phase = 'devam';
  else if (safak === 0) phase = 'son';
  else if (today < terhis) phase = 'izinde';
  else phase = 'bitti';

  const elapsed = Math.min(Math.max(today - s.sevk, 0), Math.max(total, 0));
  const percent = total > 0 ? (elapsed / total) * 100 : 100;
  const from = Math.max(today, s.sevk);
  const remaining = Math.max(0, cikis - from);
  const md = monthsAndDays(from, cikis);

  const miles = [];
  const half = s.sevk + Math.ceil(total / 2);
  miles.push({ key: 'yari', day: half, title: 'Askerliğin yarısı', desc: `Hizmetinizin yarısını (${nfInt.format(Math.ceil(total / 2))} gün) tamamladığınız gün.` });
  if (total > 100) miles.push({ key: 'safak100', day: cikis - 100, title: 'Şafak 100', desc: 'Son 100 gün başlıyor.' });
  if (total > 30) miles.push({ key: 'safak30', day: cikis - 30, title: 'Şafak 30', desc: 'Son 30 gün başlıyor.' });
  if (leave > 0) miles.push({ key: 'ayrilis', day: cikis, title: 'Birlikten ayrılış', desc: `Kalan izin ve yol izni (${leave} gün) terhisten önce kullanılırsa birlikteki son gün.` });
  miles.push({ key: 'terhis', day: terhis, title: 'Terhis günü', desc: 'Hesaplanan terhis tarihi. Kesin tarih birlik ve askerlik şubesi kayıtlarındadır.' });
  miles.sort((a, b) => a.day - b.day);

  return {
    tur: s.tur, sevk: s.sevk, today, base, terhis, cikis, leave, total, safak, phase,
    serviceMonths: t.ay || null, serviceDays, approx: !!t.yaklasik,
    elapsed, percent, remaining,
    weeks: Math.floor(remaining / 7), weekDays: remaining % 7,
    months: md.m, monthDays: md.d,
    weekends: countSaturdays(from, cikis),
    toSevk: Math.max(0, s.sevk - today),
    sinceTerhis: today - terhis,
    inUnit: Math.max(0, elapsed - (s.kullanilan || 0)),
    ceza: s.ceza || 0, odul: s.odul || 0, kalan: s.kalan || 0, yol: s.yol || 0, kullanilan: s.kullanilan || 0,
    milestones: miles,
  };
}

/** Bedelli askerlik bedeli = gösterge × memur aylık katsayısı (7179 md. 9/1). */
export function bedelliFee(B = DEFAULTS.bedelli) {
  return Math.round(B.gosterge * B.aylik_katsayi * 100) / 100;
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
export function buildICS(r) {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bilisim Ajans//Safak Hesaplama//TR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Şafak sayacı'];
  const note = ' Bilgilendirme amaçlı hesaptır; kesin terhis tarihi birlik ve askerlik şubesi kayıtlarıdır.';
  for (const m of r.milestones) {
    if (m.day < r.today && m.key !== 'terhis') continue; // geçmiş dönüm noktaları takvime eklenmez
    lines.push('BEGIN:VEVENT', `UID:safak-${compact(r.sevk)}-${m.key}@araclar.bilisimajans.com`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(m.day)}`, `DTEND;VALUE=DATE:${compact(m.day + 1)}`,
      fold(`SUMMARY:${icsEscape(m.title)}`), fold(`DESCRIPTION:${icsEscape(m.desc + note)}`), 'TRANSP:TRANSPARENT', 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

/* ---------- Şafak kartı (PNG) ---------- */
function roundRect(g, x, y, w, h, r) {
  const rr = Math.min(r, h / 2, w / 2);
  g.beginPath();
  g.moveTo(x + rr, y);
  g.arcTo(x + w, y, x + w, y + h, rr);
  g.arcTo(x + w, y + h, x, y + h, rr);
  g.arcTo(x, y + h, x, y, rr);
  g.arcTo(x, y, x + w, y, rr);
  g.closePath();
  g.fill();
}
/** Kartın üç satırlık başlık/sayı/alt yazısı (sayaçla aynı mantık). */
export function headline(r) {
  switch (r.phase) {
    case 'once': return { label: 'Teslim olmaya', num: nfInt.format(r.toSevk), unit: 'gün var' };
    case 'devam': return { label: 'Şafak', num: nfInt.format(r.safak), unit: 'gün kaldı' };
    case 'son': return { label: 'Şafak', num: '0', unit: r.leave > 0 ? 'bugün birlikte son gün' : 'bugün terhis günü' };
    case 'izinde': return { label: 'Şafak', num: '0', unit: 'izindesiniz, terhis yakın' };
    default: return { label: 'Terhis oldunuz', num: nfInt.format(r.sinceTerhis), unit: r.sinceTerhis === 0 ? 'bugün terhis' : 'gün önce' };
  }
}
export function drawCard(canvas, r) {
  const W = 1080, H = 1080;
  canvas.width = W; canvas.height = H;
  const g = canvas.getContext('2d');
  const font = '"IBM Plex Sans", "Segoe UI", Arial, sans-serif';
  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#1e2126');
  bg.addColorStop(1, '#7b2331');
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(255,255,255,.22)';
  g.lineWidth = 4;
  g.strokeRect(40, 40, W - 80, H - 80);
  const h = headline(r);
  g.textAlign = 'center';
  g.textBaseline = 'alphabetic';
  g.fillStyle = '#ffffff';
  g.font = `600 56px ${font}`;
  g.fillText(h.label.toLocaleUpperCase('tr-TR'), W / 2, 200);
  let size = 300;
  g.font = `700 ${size}px ${font}`;
  while (g.measureText(h.num).width > W - 200 && size > 80) { size -= 10; g.font = `700 ${size}px ${font}`; }
  g.fillText(h.num, W / 2, 500);
  g.font = `500 44px ${font}`;
  g.fillText(h.unit, W / 2, 580);
  g.font = `400 40px ${font}`;
  g.fillStyle = 'rgba(255,255,255,.88)';
  g.fillText('Terhis: ' + fmtLong(r.terhis), W / 2, 670);
  const bx = 140, by = 730, bw = W - 280, bh = 36;
  g.fillStyle = 'rgba(255,255,255,.18)';
  roundRect(g, bx, by, bw, bh, 18);
  const fillW = (bw * Math.min(100, Math.max(0, r.percent))) / 100;
  if (fillW > 0) { g.fillStyle = '#f2c14e'; roundRect(g, bx, by, Math.max(fillW, bh), bh, 18); }
  g.fillStyle = '#ffffff';
  g.font = `600 38px ${font}`;
  g.fillText(`%${nfPct.format(r.percent)} tamamlandı · ${nfInt.format(r.elapsed)} / ${nfInt.format(r.total)} gün`, W / 2, 830);
  g.font = `400 30px ${font}`;
  g.fillStyle = 'rgba(255,255,255,.72)';
  g.fillText('Bilişim Ajans · araclar.bilisimajans.com/safak-hesapla', W / 2, 970);
}

/* ---------- Arayüz ---------- */
let P = { ...DEFAULTS };
let last = null;       // son hesap sonucu (PNG/ICS için)
let lastInput = null;  // son geçerli girdi (gece yarısı yenilemesi için)
let lastToday = null;

function showResult(el) { el.hidden = false; el.classList.add('is-active'); }
function hideResult(el) { el.hidden = true; el.classList.remove('is-active'); }
function fail(msg, field) {
  hideResult($('result'));
  last = null;
  showError($('error'), msg);
  if (field && $(field)) $(field).setAttribute('aria-invalid', 'true');
}
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) {
      const j = await res.json();
      P = { ...DEFAULTS, ...j, turler: { ...DEFAULTS.turler, ...(j.turler || {}) }, bedelli: { ...DEFAULTS.bedelli, ...(j.bedelli || {}) } };
    }
  } catch (e) { /* çevrimdışıysa varsayılanlar kullanılır */ }
  const d = parseISO(P.guncelleme);
  const txt = d == null ? P.guncelleme : fmtLong(d).replace(/ \S+$/, '');
  $('params-line').textContent = 'Parametreler ' + txt + ' tarihinde güncellendi. Kaynak: ' + P.kaynak;
}

/** Tam sayı alanı: boş → 0; negatif, ondalık ve harf için Türkçe, çözüm öneren hata. */
function readInt(id, label, max, min = 0) {
  const raw = $(id).value.trim();
  if (raw === '') return { v: 0 };
  if (/^[-−–]\s*\d+([.,]\d+)?$/.test(raw)) return { error: `${label} negatif olamaz. Gün sayısını 0 ya da pozitif bir tam sayı olarak yazın (örnek: 6); kullandığınız izni "kullanılan izin" alanına yazın.`, field: id };
  if (!/^\d+$/.test(raw)) return { error: `${label} okunamadı. Yalnızca rakam kullanın ve gün sayısını tam sayı olarak yazın (örnek: 6).`, field: id };
  const v = Number(raw);
  if (v < min || v > max) return { error: `${label} ${min} ile ${max} gün arasında olmalı. Değeri kontrol edin.`, field: id };
  return { v };
}

/** Formu okur; { s } ya da { error, field } döner. */
function readForm() {
  const tur = $('tur').value;
  if (!P.turler[tur]) return { error: 'Askerlik türünü listeden seçin.', field: 'tur' };
  const sevkRaw = $('sevk').value;
  if (!sevkRaw) return { error: 'Sevk (celp) tarihini girin. Sevk belgenizde yazan tarihi takvimden seçin; askerlik hizmeti bu tarihte başlar.', field: 'sevk' };
  const sevk = parseISO(sevkRaw);
  if (sevk == null) return { error: 'Sevk tarihi geçerli bir tarih değil. Gün, ay ve yılı takvimden seçin (örnek: 30.11.2026).', field: 'sevk' };
  const y = toDate(sevk).getUTCFullYear();
  if (y < 2000 || y > 2100) return { error: 'Sevk tarihi 2000 ile 2100 arasında olmalı. Yılı dört haneli yazdığınızdan emin olun.', field: 'sevk' };
  let gun = null;
  if (needsDays(tur)) {
    const raw = $('gun').value.trim();
    if (raw === '') {
      return tur === 'dovizle'
        ? { error: 'Dövizle askerlikte kanunda birlikte geçirilecek bir temel eğitim süresi yoktur (7179 sayılı Kanun md. 39; ödeme ve uzaktan eğitim). Size bildirilen eğitim gün sayısını "Hizmet süresi (gün)" alanına yazın.', field: 'gun' }
        : { error: 'Hizmet süresini gün olarak girin (1-' + P.ozel_gun_max + '). Ay olarak biliyorsanız yukarıdan askerlik türünü seçin.', field: 'gun' };
    }
    const g = readInt('gun', 'Hizmet süresi', P.ozel_gun_max, 1);
    if (g.error) return g;
    gun = g.v;
  }
  const out = { tur, sevk, gun };
  const fields = [
    ['yol', 'Yol izni', P.yol_izni_max, 'Yol izni 0 ile ' + P.yol_izni_max + ' gün arasında olmalı. Birliğinizin size bildirdiği gidiş-dönüş yol izni süresini yazın.'],
    ['kullanilan', 'Kullanılan izin', P.izin_max],
    ['kalan', 'Kalan izin', P.izin_max],
    ['ceza', 'Ceza / firar günü', P.ceza_max],
    ['odul', 'Erken terhis / ödül günü', P.ceza_max],
  ];
  for (const [id, label, max, rangeMsg] of fields) {
    const r = readInt(id, label, max);
    if (r.error) return rangeMsg && /arasında olmalı/.test(r.error) ? { error: rangeMsg, field: id } : r;
    out[id] = r.v;
  }
  return { s: out };
}

function syncType() {
  const tur = $('tur').value;
  $('gun-wrap').hidden = !needsDays(tur);
  const note = $('tur-note');
  const notes = {
    er6: 'Erbaş ve erler için hizmet süresi 6 aydır (7179 sayılı Kanun md. 5/2). 2019\'dan beri öğrenim durumuna göre ayrı "kısa/uzun dönem" süresi yoktur.',
    ys12: 'Yedek subay ve yedek astsubaylar için hizmet süresi 12 aydır (md. 5/2). Hizmet, sevk belgesindeki tarihte başlar (md. 5/9).',
    er12: 'İstekli erbaş ve erler, amirlerinin olumlu değerlendirmesiyle 6 aylık sürenin sonunda 6 ay daha hizmete devam edebilir (md. 5/3); toplam 12 ay. Ek 6 ay, terhise hak kazanılan tarihten (ilk 6 ay + varsa ceza günleri) itibaren sayılır.',
    bedelli: 'Kanunda "bir aylık temel askerlik eğitimi" yazar (md. 9/1). Hesapta uygulamada duyurulan 28 gün kullanılır; bu değer MSB duyurusundan doğrulanamadığı için yaklaşıktır. Celp belgenizdeki tarihleri esas alın.',
    dovizle: 'Dövizle askerlikte ödeme ve Bakanlığın verdiği uzaktan eğitimle askerlik yapılmış sayılır (md. 39); kanunda birlikte geçirilecek temel eğitim süresi yoktur. Size bir eğitim süresi bildirildiyse gün sayısını yazın.',
    ozel: 'Hizmet sürenizi gün olarak yazın; terhis tarihi sevk tarihine bu gün sayısı eklenerek bulunur.',
  };
  note.textContent = notes[tur] || '';
  note.classList.toggle('is-warn', !!(P.turler[tur] && P.turler[tur].yaklasik));
}

function row(dl, label, value, strong = false, id = null) {
  const r = el('div', 'sf-row' + (strong ? ' is-strong' : ''));
  r.append(el('dt', null, label));
  const dd = el('dd', null, value);
  if (id) dd.id = id;
  r.append(dd);
  dl.append(r);
}

function statusText(r) {
  const leaveTxt = r.leave > 0 ? ` Kalan izniniz ve yol izniniz terhisten önce kullanılırsa birlikten ${fmtLong(r.cikis)} günü ayrılırsınız.` : '';
  switch (r.phase) {
    case 'once': return `Sevk tarihiniz henüz gelmedi: teslim olmaya ${nfInt.format(r.toSevk)} gün var. Teslim olduğunuz gün şafağınız ${nfInt.format(r.total)} olacak; terhis tarihiniz ${fmtLong(r.terhis)}.`;
    case 'devam': return `Terhisinize ${nfInt.format(r.safak)} gün kaldı; hizmetinizin %${nfPct.format(r.percent)} kadarını tamamladınız. Terhis tarihi: ${fmtLong(r.terhis)}.${leaveTxt}`;
    case 'son': return r.leave > 0 ? `Bugün birlikteki son gününüz. Resmî terhis tarihiniz ${fmtLong(r.terhis)}. Geçmiş olsun!` : 'Şafak bitti: bugün terhis gününüz. Geçmiş olsun!';
    case 'izinde': return `Birlikten ayrıldınız; izin ve yol izni günlerinizdesiniz. Resmî terhis tarihiniz ${fmtLong(r.terhis)} (${nfInt.format(r.terhis - r.today)} gün sonra).`;
    default: return r.sinceTerhis === 0 ? 'Terhis oldunuz! Bugün resmî terhis gününüz. Geçmiş olsun.' : `Terhis oldunuz! Resmî terhis tarihiniz ${fmtLong(r.terhis)} idi (${nfInt.format(r.sinceTerhis)} gün önce). Geçmiş olsun.`;
  }
}

function render(r) {
  const h = headline(r);
  $('r-label').textContent = h.label;
  $('r-safak').textContent = h.num;
  $('r-unit').textContent = h.unit;
  $('r-status').textContent = statusText(r);
  const pct = Math.min(100, Math.max(0, r.percent));
  $('r-bar-fill').style.width = pct + '%';
  $('r-bar').setAttribute('aria-valuenow', String(Math.round(pct)));
  $('r-bar').setAttribute('aria-valuetext', '%' + nfPct.format(pct) + ' tamamlandı');
  $('r-pct').textContent = `%${nfPct.format(pct)} tamamlandı · ${nfInt.format(r.elapsed)} / ${nfInt.format(r.total)} gün`;

  const dl = $('r-list');
  dl.textContent = '';
  row(dl, 'Terhis tarihi', fmtDay(r.terhis), true, 'r-terhis');
  if (r.leave > 0) row(dl, 'Birlikten ayrılış (kalan izin + yol izni düşülerek)', fmtDay(r.cikis), false, 'r-cikis');
  row(dl, 'Sevk (başlangıç) tarihi', fmtDay(r.sevk), false, 'r-sevk');
  const dur = r.serviceMonths ? `${r.serviceMonths} ay` : `${nfInt.format(r.serviceDays)} gün`;
  row(dl, 'Hizmet süresi', dur + (r.ceza ? ` + ${r.ceza} gün ceza` : '') + (r.odul ? ` − ${r.odul} gün erken terhis` : ''), false, 'r-dur');
  row(dl, 'Toplam şafak günü (sevkten ayrılışa)', nfInt.format(r.total) + ' gün', false, 'r-total');
  row(dl, 'Geçen gün', nfInt.format(r.elapsed) + ' gün', false, 'r-elapsed');
  if (r.kullanilan > 0) row(dl, 'Birlikte geçen gün (kullanılan izin hariç)', nfInt.format(r.inUnit) + ' gün', false, 'r-inunit');
  row(dl, 'Kalan hafta', `${nfInt.format(r.weeks)} hafta ${r.weekDays} gün`, false, 'r-weeks');
  row(dl, 'Kalan ay', `${nfInt.format(r.months)} ay ${r.monthDays} gün`, false, 'r-months');
  row(dl, 'Kalan hafta sonu', nfInt.format(r.weekends), false, 'r-weekends');

  const ul = $('r-miles');
  ul.textContent = '';
  for (const m of r.milestones) {
    const li = el('li', m.day < r.today ? 'is-past' : (m.day === r.today ? 'is-today' : ''));
    li.dataset.key = m.key;
    li.append(el('strong', null, m.title + ': '));
    li.append(document.createTextNode(fmtDay(m.day) + ' · '));
    const diff = m.day - r.today;
    li.append(el('span', 'sf-when', diff === 0 ? 'bugün' : diff > 0 ? `${nfInt.format(diff)} gün sonra` : `geçti (${nfInt.format(-diff)} gün önce)`));
    ul.append(li);
  }

  const notes = $('r-notes');
  notes.textContent = '';
  if (r.approx) notes.append(el('li', 'is-warn', 'Yaklaşık: bedelli temel eğitim süresi kanunda "bir ay" olarak yazar; hesapta uygulamada duyurulan 28 gün kullanıldı ve bu değer MSB duyurusundan doğrulanamadı. Celp belgenizdeki tarihleri esas alın.'));
  if (r.ceza > 0) notes.append(el('li', null, r.tur === 'er12'
    ? `${r.ceza} gün ceza / firar süresi ilk 6 ayın sonunu (terhise hak kazanma tarihini) ileri aldı; ek 6 ay bu tarihten itibaren sayıldı (7179 sayılı Kanun md. 5/3 ve 32).`
    : `${r.ceza} gün ceza / firar süresi hizmetten sayılmadığı için terhis tarihi ${r.ceza} gün ileri alındı (7179 sayılı Kanun md. 32).`));
  if (r.odul > 0) notes.append(el('li', null, `${r.odul} gün erken terhis / ödül süresi terhis tarihinden düşüldü. Bu süreyi birliğinizin size bildirdiği biçimde girin.`));
  if (r.leave > 0) notes.append(el('li', null, `Şafaktan ${r.kalan} gün kalan izin ve ${r.yol} gün yol izni düşüldü; izinlerin terhisten hemen önce kullanılacağı varsayıldı.`));
  notes.append(el('li', null, 'Bugünün tarihi Türkiye saatine (Europe/Istanbul) göre alınır; şafak her gece 00.00\'da bir azalır.'));
  notes.append(el('li', null, 'Kesin terhis tarihi birlik ve askerlik şubesi kayıtlarıdır. Bu hesap bilgilendirme amaçlıdır.'));

  showResult($('result'));
}

function toQuery(s) {
  const q = new URLSearchParams();
  q.set('tur', s.tur);
  q.set('sevk', toISO(s.sevk));
  if (needsDays(s.tur)) q.set('gun', String(s.gun));
  for (const k of ['yol', 'kullanilan', 'kalan', 'ceza', 'odul']) if (s[k]) q.set(k, String(s[k]));
  return q;
}

/** URL'den ya da localStorage'dan gelen değerleri doğrulayarak forma yazar (yalnızca tarih ve sayılar). */
function fillForm(o) {
  if (!o || typeof o !== 'object') return false;
  const tur = String(o.tur ?? '');
  if (Object.prototype.hasOwnProperty.call(P.turler, tur)) $('tur').value = tur;
  const sevk = String(o.sevk ?? '');
  if (parseISO(sevk) == null) return false;
  $('sevk').value = sevk;
  for (const k of ['gun', 'yol', 'kullanilan', 'kalan', 'ceza', 'odul']) {
    const v = String(o[k] ?? '');
    $(k).value = /^\d{1,4}$/.test(v) ? String(Number(v)) : '';
  }
  syncType();
  return true;
}

function save(s) {
  const q = toQuery(s);
  try { localStorage.setItem(STORE_KEY, JSON.stringify(Object.fromEntries(q))); } catch (e) { /* gizli mod ya da kapalı depolama: kaydedilmez */ }
  try { history.replaceState(null, '', location.pathname + '?' + q.toString()); } catch (e) { /* adres çubuğu güncellenemezse sorun değil */ }
  const link = $('r-link');
  link.href = location.href;
  link.textContent = location.href;
}

function run() {
  showError($('error'), '');
  for (const e of document.querySelectorAll('#form [aria-invalid]')) e.removeAttribute('aria-invalid');
  const f = readForm();
  if (f.error) return fail(f.error, f.field);
  const today = istanbulToday();
  const r = calcSafak(f.s, today, P);
  if (r.total <= 0) {
    return fail('Kalan izin, yol izni ve erken terhis günlerinin toplamı hizmet süresinden fazla olamaz. Değerleri kontrol edin; kullandığınız izinleri "kullanılan izin" alanına yazın.', 'kalan');
  }
  last = r;
  lastInput = f.s;
  lastToday = today;
  render(r);
  save(f.s);
  $('status').textContent = '';
}

function restore() {
  const q = new URLSearchParams(location.search);
  let src = null;
  if (q.has('sevk')) src = Object.fromEntries(q);
  else {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) { const o = JSON.parse(raw); if (o && typeof o === 'object' && !Array.isArray(o)) src = o; }
    } catch (e) { /* bozuk kayıt ya da kapalı depolama: yok sayılır */ }
  }
  if (src && fillForm(src)) run();
}

function renderBedelli() {
  const B = P.bedelli;
  const fee = bedelliFee(B);
  $('bedelli-fee').textContent = nf2.format(fee) + ' TL';
  const a = parseISO(B.katsayi_baslangic), b = parseISO(B.katsayi_bitis);
  $('bedelli-period').textContent = (a != null && b != null ? fmt(a) + ' – ' + fmt(b) : '') + ' dönemi, aylık katsayı ' + new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 6 }).format(B.aylik_katsayi) + ', gösterge ' + nfInt.format(B.gosterge);
  $('bedelli-src').textContent = 'Kaynak: ' + B.kaynak;
  const expired = b != null && istanbulToday() > b;
  $('bedelli-warn').hidden = !(expired || B.yaklasik);
  if (expired) $('bedelli-warn').textContent = 'Dikkat: bu tutarın dayandığı katsayının geçerlilik süresi ' + fmt(b) + ' tarihinde bitti. Yeni dönem katsayısıyla bedel değişir; ödeme günü geçerli tutarı MSB ve e-Devlet üzerinden kontrol edin.';
  else if (B.yaklasik) $('bedelli-warn').textContent = 'Yaklaşık tutar: katsayı resmî kaynaktan doğrulanamadı; ödeme günü geçerli tutarı MSB ve e-Devlet üzerinden kontrol edin.';
}

async function downloadCard() {
  if (!last) return;
  try {
    if (document.fonts && document.fonts.load) {
      await Promise.race([
        Promise.all([document.fonts.load('700 100px "IBM Plex Sans"', 'Şafak0123'), document.fonts.load('400 40px "IBM Plex Sans"', 'Şafak')]),
        new Promise((res) => setTimeout(res, 1500)),
      ]);
    }
  } catch (e) { /* yazı tipi yüklenemezse sistem yazı tipi kullanılır */ }
  const canvas = document.createElement('canvas');
  drawCard(canvas, last);
  canvas.toBlob((blob) => {
    if (!blob) { showError($('error'), 'Kart görseli oluşturulamadı. Tarayıcınızı güncelleyip tekrar deneyin ya da ekran görüntüsü alın.'); return; }
    const h = headline(last);
    const name = last.phase === 'once' ? `teslim-${h.num.replace(/\D/g, '')}-gun.png` : last.phase === 'bitti' ? 'terhis-oldum.png' : `safak-${h.num.replace(/\D/g, '')}.png`;
    downloadBlob(blob, name);
    $('status').textContent = 'Şafak kartı indirildi (' + name + '). Görsel cihazınızda oluşturuldu; hiçbir yere yüklenmedi.';
  }, 'image/png');
}

function downloadIcs() {
  if (!last) return;
  const blob = new Blob([buildICS(last)], { type: 'text/calendar;charset=utf-8' });
  downloadBlob(blob, 'safak-terhis-' + compact(last.terhis) + '.ics');
  $('status').textContent = 'Takvim dosyası indirildi. Açtığınızda terhis günü ve dönüm noktaları takviminize eklenir.';
}

async function copyLink() {
  const link = location.href;
  try {
    await navigator.clipboard.writeText(link);
    $('status').textContent = 'Bağlantı kopyalandı. Bu bağlantıyı yer imlerine ekleyerek her gün aynı sayaca dönebilirsiniz.';
  } catch (e) {
    $('status').textContent = 'Bağlantı otomatik kopyalanamadı; aşağıdaki bağlantıyı seçip kopyalayın.';
  }
}

$('tur').addEventListener('change', syncType);
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  syncType();
  hideResult($('result'));
  showError($('error'), '');
  last = null; lastInput = null;
  try { localStorage.removeItem(STORE_KEY); } catch (e) { /* depolama kapalı */ }
  try { history.replaceState(null, '', location.pathname); } catch (e) { /* yok say */ }
  $('sevk').focus();
});
$('png').addEventListener('click', downloadCard);
$('ics').addEventListener('click', downloadIcs);
$('copy').addEventListener('click', copyLink);

// Sayfa açık kalırsa İstanbul'da gece yarısı geçtiğinde sayaç kendini yeniler.
setInterval(() => {
  if (!lastInput) return;
  const t = istanbulToday();
  if (t === lastToday) return;
  lastToday = t;
  last = calcSafak(lastInput, t, P);
  render(last);
}, 30000);

syncType();
loadParams().then(() => { syncType(); renderBedelli(); restore(); });
