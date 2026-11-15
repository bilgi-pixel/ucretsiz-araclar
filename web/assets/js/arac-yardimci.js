// Form tabanlı araçların ortak hesap yardımcıları. DOM yok, ağ yok; tarayıcıda ve testte aynı çalışır.

/** Kullanıcıya gösterilecek hata fırlatır. */
export function err(msg) { throw new Error(msg); }

/** "1.234,56" / "1234.56" / "12,5" → sayı. Geçersizse Türkçe hata. */
export function num(s, ad = 'Değer') {
  let t = String(s ?? '').trim().replace(/\s/g, '').replace(/−/g, '-');
  if (t === '') err(`"${ad}" alanını doldurun.`);
  if (t.includes(',') && t.includes('.')) t = t.lastIndexOf(',') > t.lastIndexOf('.') ? t.replace(/\./g, '').replace(',', '.') : t.replace(/,/g, '');
  else if (/^[-+]?\d{1,3}(\.\d{3}){2,}$/.test(t)) t = t.replace(/\./g, ''); // 1.234.567 → binlik nokta
  else t = t.replace(',', '.');
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t)) err(`"${ad}" alanına geçerli bir sayı yazın (örn. 12,5).`);
  const n = Number(t);
  if (!Number.isFinite(n)) err(`"${ad}" alanındaki sayı çok büyük.`);
  return n;
}
/** Boşsa varsayılan, doluysa sayı. */
export function opt(s, varsayilan, ad = 'Değer') { return String(s ?? '').trim() === '' ? varsayilan : num(s, ad); }
/** Sıfırdan büyük sayı. */
export function pos(s, ad = 'Değer') { const n = num(s, ad); if (!(n > 0)) err(`"${ad}" sıfırdan büyük olmalı.`); return n; }
/** Sıfır ya da pozitif sayı. */
export function nonneg(s, ad = 'Değer') { const n = num(s, ad); if (n < 0) err(`"${ad}" negatif olamaz.`); return n; }
/** Tam sayı. */
export function int(s, ad = 'Değer') { const n = num(s, ad); if (!Number.isInteger(n)) err(`"${ad}" tam sayı olmalı.`); return n; }
/** Sıfırdan büyük tam sayı. */
export function posint(s, ad = 'Değer') { const n = int(s, ad); if (n < 1) err(`"${ad}" en az 1 olmalı.`); return n; }

/** Türkçe biçim: binlik nokta, ondalık virgül; en fazla `d` ondalık (sondaki sıfırlar atılır). */
export function fmt(n, d = 2) {
  if (!Number.isFinite(n)) return '—';
  const r = Number(n.toFixed(Math.min(20, Math.max(0, d))));
  return (Object.is(r, -0) ? 0 : r).toLocaleString('tr-TR', { maximumFractionDigits: d, minimumFractionDigits: 0 });
}
/** Türkçe biçim, tam `d` ondalık basamak. */
export function fix(n, d = 2) {
  if (!Number.isFinite(n)) return '—';
  const r = Number(n.toFixed(d));
  return (Object.is(r, -0) ? 0 : r).toLocaleString('tr-TR', { maximumFractionDigits: d, minimumFractionDigits: d });
}
/** Para: "1.234,50 TL". */
export function para(n, birim = 'TL') { return `${fix(n, 2)} ${birim}`; }
/** Anlamlı basamağa göre biçim (çok küçük/büyük sayılar için); gerekirse bilimsel gösterim. */
export function sig(n, basamak = 6) {
  if (!Number.isFinite(n)) return '—';
  if (n === 0) return '0';
  const a = Math.abs(n);
  if (a >= 1e15 || a < 1e-6) {
    const [m, e] = n.toExponential(basamak - 1).split('e');
    return `${String(Number(m)).replace('.', ',')} × 10^${Number(e)}`;
  }
  return Number(n.toPrecision(basamak)).toLocaleString('tr-TR', { maximumFractionDigits: 12 });
}

/** Metni dolu satırlara böler (kırpılmış). */
export function lines(s) { return String(s ?? '').split(/\r?\n/).map((x) => x.trim()).filter(Boolean); }
/** Sayı listesi: boşluk, satır sonu ya da noktalı virgülle ayrılır; ondalık virgül korunur. */
export function nums(s, ad = 'Sayılar') {
  const parts = String(s ?? '').split(/[\s;]+/).map((x) => x.trim()).filter(Boolean);
  if (!parts.length) err(`"${ad}" alanına en az bir sayı yazın.`);
  return parts.map((p) => num(p, ad));
}

/** "2026-03-15" ya da "15.03.2026" → UTC gece yarısı Date. Boş ve varsayilan verilmişse o döner. */
export function date(s, ad = 'Tarih') {
  const t = String(s ?? '').trim();
  if (t === '') err(`"${ad}" alanını doldurun.`);
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t), y, mo, d;
  if (m) { y = +m[1]; mo = +m[2]; d = +m[3]; }
  else if ((m = /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/.exec(t))) { d = +m[1]; mo = +m[2]; y = +m[3]; }
  else err(`"${ad}" alanına geçerli bir tarih yazın (GG.AA.YYYY).`);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  dt.setUTCFullYear(y);
  if (dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) err(`"${ad}" alanındaki tarih takvimde yok.`);
  return dt;
}
/** Boşsa bugünün tarihi (yerel güne göre, UTC gece yarısı), doluysa date(). */
export function dateOrToday(s, ad = 'Tarih') {
  if (String(s ?? '').trim() !== '') return date(s, ad);
  const n = new Date();
  return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
}
/** Date → "15.03.2026". */
export function fmtDate(d) {
  return `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${d.getUTCFullYear()}`;
}
const GUNLER = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
/** Date → "Pazartesi". */
export function gunAdi(d) { return GUNLER[d.getUTCDay()]; }
/** 1–12 → "Ocak". */
export function ayAdi(ay) { return AYLAR[ay - 1]; }
/** İki UTC tarihi arasındaki gün farkı (b − a). */
export function gunFarki(a, b) { return Math.round((b.getTime() - a.getTime()) / 86400000); }
/** Tarihe gün ekler (yeni Date). */
export function gunEkle(d, n) { return new Date(d.getTime() + n * 86400000); }

export const h = { err, num, opt, pos, nonneg, int, posint, fmt, fix, para, sig, lines, nums, date, dateOrToday, fmtDate, gunAdi, ayAdi, gunFarki, gunEkle };
