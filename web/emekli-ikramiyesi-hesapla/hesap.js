// Emekli ikramiyesi, emekli maaşı zammı ve bayram ikramiyesi (tahmini, saf JS). Katsayı ve oranlar gömülü değildir; kullanıcı girer.
const nf = (min, max) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: min, maximumFractionDigits: max });
const fNum = nf(0, 2), fMoney = nf(2, 2);
export const fmtNum = (x) => fNum.format(x);
export const fmtMoney = (x) => fMoney.format(x) + ' TL';

/** Türkçe sayı girişini çözer. Geçersizse NaN, boşsa null. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (t === '') return null;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}
function need(v, label, example) {
  const n = parseNum(v);
  if (n === null) throw new Error(`${label} boş. Bir değer yazın (örn. ${example}).`);
  if (Number.isNaN(n)) throw new Error(`${label} geçersiz. Yalnızca rakam ve virgül kullanın (örn. ${example}).`);
  if (n <= 0) throw new Error(`${label} sıfırdan büyük olmalıdır. Değeri kontrol edip yeniden girin.`);
  return n;
}
function opt(v, label, example) {
  const n = parseNum(v);
  if (n === null) return null;
  if (Number.isNaN(n) || n < 0) throw new Error(`${label} geçersiz. Boş bırakın ya da bir sayı yazın (örn. ${example}).`);
  return n;
}
const summaryOf = (rows) => rows.map(([a, b]) => `${a}: ${b}`).join('\n');

/** Memur emekli ikramiyesi (yaklaşık): hizmet süresi (yıl, en çok azami) × emekli keseneğine esas aylık. */
export function calcIkramiye({ salary, gosterge, ek, katsayi, years, months }, par) {
  const y = need(years, 'Hizmet yılı', '25');
  if (!Number.isInteger(y)) throw new Error('Hizmet yılı tam sayı olmalıdır; artan ayları "Ay" alanına yazın.');
  const mo = opt(months, 'Ay', '6') ?? 0;
  if (mo > 11 || !Number.isInteger(mo)) throw new Error('Ay 0 ile 11 arasında tam sayı olmalıdır. 12 ay ve üzerini yıl alanına ekleyin.');
  let base = opt(salary, 'Emekli keseneğine esas aylık', '40.000');
  const rows = [], notes = [];
  if (base === null || base === 0) {
    const g = need(gosterge, 'Gösterge puanı', '1.320');
    const e = opt(ek, 'Ek gösterge', '3.600') ?? 0;
    const k = need(katsayi, 'Aylık katsayı', '0,5');
    base = (g + e) * k;
    rows.push(['Hesaplanan aylık (gösterge + ek gösterge) × katsayı', fmtMoney(base)]);
    notes.push('Aylık, girdiğiniz katsayı ile yaklaşık hesaplandı; taban aylık ve diğer kalemler dahil değildir. Kesin tutar için kurumunuzun hesabına bakın.');
  } else rows.push(['Emekli keseneğine esas aylık', fmtMoney(base)]);
  const total = y + mo / 12;
  const counted = Math.min(total, par.ikramiye_azami_hizmet_yili);
  if (total > par.ikramiye_azami_hizmet_yili) notes.push(`Hizmet süresi en çok ${par.ikramiye_azami_hizmet_yili} yıl üzerinden sayıldı.`);
  rows.push(['Sayılan hizmet süresi', fmtNum(Math.round(counted * 100) / 100) + ' yıl']);
  rows.push(['Tahmini emekli ikramiyesi', fmtMoney(base * counted), true]);
  notes.push('Yalnızca yaklaşık değerdir; SGK ve ilgili kurumun hesabı esastır. Bilgilendirme amaçlıdır.');
  return { rows, notes, summary: summaryOf(rows) };
}

/** Emekli maaşı zammı: mevcut maaş × (1 + oran). */
export function calcZam({ salary, rate, period }) {
  const s = need(salary, 'Mevcut aylık', '20.000');
  const r = need(rate, 'Zam oranı (%)', '15');
  if (r > 300) throw new Error('Zam oranı yüzde 300 değerinden büyük olamaz. Oranı yüzde olarak (örn. 15) yazın.');
  const diff = (s * r) / 100;
  const rows = [
    ['Dönem', period === 'temmuz' ? 'Temmuz zammı' : 'Ocak zammı'],
    ['Mevcut aylık', fmtMoney(s)],
    ['Zam oranı', '%' + fmtNum(r)],
    ['Zam farkı (aylık)', fmtMoney(diff)],
    ['Yeni aylık', fmtMoney(s + diff), true],
    ['Yıllık ek gelir (12 ay)', fmtMoney(diff * 12)],
  ];
  const notes = ['Maaş tutarı hesaplanmaz; yalnızca girdiğiniz maaşa zam oranı uygulanır. Kesinti ve vergi dikkate alınmaz. Resmî oran, TÜİK enflasyon verisiyle belirlenir ve değişebilir.'];
  return { rows, notes, summary: summaryOf(rows) };
}

/** Bayram ikramiyesi: tutar × bayram sayısı. */
export function calcBayram({ amount, count }) {
  const a = need(amount, 'Bayram ikramiyesi tutarı', '4.000');
  const c = parseNum(count === '' ? '1' : count);
  if (c === null || Number.isNaN(c) || !Number.isInteger(c) || c < 1 || c > 4) throw new Error('Bayram sayısı 1 ile 4 arasında tam sayı olmalıdır.');
  const rows = [['Bir bayram için ikramiye', fmtMoney(a)], ['Bayram sayısı', String(c)], ['Toplam', fmtMoney(a * c), true]];
  const notes = ['Tutar yaklaşıktır; güncel miktar her dönem SGK duyurusuyla belirlenir. Duyuruyu sgk.gov.tr adresinden teyit edin.'];
  return { rows, notes, summary: summaryOf(rows) };
}
