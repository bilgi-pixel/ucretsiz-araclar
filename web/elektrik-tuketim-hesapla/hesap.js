// Elektrik ve doğalgaz tüketimi hesabı (saf JS, DOM yok). Birim fiyat gömülü değildir; kullanıcı girer.
const nf = (min, max) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: min, maximumFractionDigits: max });
const fNum = nf(0, 2), fMoney = nf(2, 2);
export const fmtNum = (x) => fNum.format(x);
export const fmtMoney = (x) => fMoney.format(x) + ' TL';
export const fmtKwh = (x) => fNum.format(x) + ' kWh';

/** Türkçe sayı girişini çözer: "1.417,50", "7,5", "450". Geçersizse NaN, boşsa null. */
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
  if (Number.isNaN(n) || n <= 0) throw new Error(`${label} geçersiz. Boş bırakın ya da sıfırdan büyük bir sayı yazın (örn. ${example}).`);
  return n;
}
function daysIn(v) {
  const n = parseNum(v === '' ? '30' : v);
  if (n === null || Number.isNaN(n) || !Number.isInteger(n) || n < 1 || n > 31) throw new Error('Ay içindeki gün sayısı 1 ile 31 arasında tam sayı olmalıdır.');
  return n;
}

/** Cihaz listesi: devices = [{name, watt, hours, count}], price (TL/kWh, isteğe bağlı), days. */
export function calcDevices({ devices, price, days }) {
  if (!devices.length) throw new Error('Listede cihaz yok. Önce bir cihaz seçip "Ekle" düğmesine basın ya da özel cihaz tanımlayın.');
  const p = opt(price, 'Elektrik birim fiyatı', '3,50');
  const d = daysIn(days);
  const lines = devices.map((dev, i) => {
    const name = (dev.name || '').trim() || `Cihaz ${i + 1}`;
    const watt = need(dev.watt, `${name} için güç (W)`, '1000');
    const hours = need(dev.hours, `${name} için günlük saat`, '5');
    if (hours > 24) throw new Error(`${name} için günlük kullanım 24 saati aşamaz. Saati 24 veya daha küçük girin.`);
    const cn = parseNum(dev.count === '' ? '1' : dev.count);
    if (cn === null || Number.isNaN(cn) || !Number.isInteger(cn) || cn < 1 || cn > 99) throw new Error(`${name} için adet 1 ile 99 arasında tam sayı olmalıdır.`);
    const daily = (watt * hours * cn) / 1000;
    return { name, daily, monthly: daily * d };
  });
  const totalDaily = lines.reduce((s, l) => s + l.daily, 0);
  const totalMonthly = totalDaily * d;
  lines.forEach((l) => { l.share = totalMonthly ? l.monthly / totalMonthly : 0; l.cost = p ? l.monthly * p : null; });
  const rows = [
    ['Günlük tüketim', fmtKwh(totalDaily)],
    ['Aylık tüketim (' + d + ' gün)', fmtKwh(totalMonthly), true],
    ['Yıllık tüketim (12 × aylık)', fmtKwh(totalMonthly * 12)],
  ];
  const notes = ['Cihaz güçleri yaklaşık değerlerdir; gerçek tüketim modele, yaşa ve kullanıma göre değişir.'];
  if (p) {
    rows.splice(1, 0, ['Günlük maliyet', fmtMoney(totalDaily * p)]);
    rows.splice(3, 0, ['Aylık maliyet', fmtMoney(totalMonthly * p), true]);
    rows.push(['Yıllık maliyet (12 × aylık)', fmtMoney(totalMonthly * p * 12)]);
  } else notes.push('Maliyet için birim fiyatı girin; faturanızdaki güncel tarifeyi kullanın.');
  const summary = rows.map(([a, b]) => `${a}: ${b}`).join('\n');
  return { rows, notes, lines, summary, totalMonthly };
}

/** Doğalgaz: aylık m³ ve fiyat ya da kombi kapasitesinden tahmin. */
export function calcGas({ m3, price, kw, hours, load, days }, par) {
  const p = opt(price, 'Doğalgaz birim fiyatı', '9,50');
  const d = daysIn(days);
  const rows = [], notes = [];
  const m = opt(m3, 'Aylık doğalgaz (m³)', '120');
  const k = opt(kw, 'Kombi gücü (kW)', '24');
  if (m === null && k === null) throw new Error('Aylık m³ değerini ya da kombi gücünü (kW) girin. Fatura üzerindeki tüketim m³ olarak yazar.');
  if (m !== null) {
    rows.push(['Aylık tüketim', fmtNum(m) + ' m³', true]);
    rows.push(['Günlük ortalama', fmtNum(m / d) + ' m³']);
    rows.push(['Enerji karşılığı (yaklaşık)', fmtKwh(m * par.dogalgaz_isil_degeri_kwh_m3)]);
    if (p) { rows.push(['Aylık maliyet', fmtMoney(m * p), true]); rows.push(['Yıllık (12 × aylık)', fmtMoney(m * p * 12)]); }
  }
  if (k !== null) {
    const h = need(hours, 'Kombinin günlük çalışma saati', '8');
    if (h > 24) throw new Error('Günlük çalışma saati 24 saati aşamaz. 24 veya daha küçük bir değer girin.');
    const l = opt(load, 'Ortalama yük (%)', '50');
    const pct = l === null ? 50 : l;
    if (pct > 100) throw new Error('Ortalama yük yüzde 100 değerini aşamaz. 1 ile 100 arasında bir değer girin.');
    const perHour = k / par.kombi_verim / par.dogalgaz_isil_degeri_kwh_m3; // tam yükte saatlik m³
    const eff = perHour * (pct / 100);
    rows.push(['Tam yükte saatlik tüketim (tahmini)', fmtNum(perHour) + ' m³/saat']);
    rows.push([`Ortalama saatlik tüketim (%${fmtNum(pct)} yük)`, fmtNum(eff) + ' m³/saat']);
    rows.push(['Günlük tahmini tüketim', fmtNum(eff * h) + ' m³']);
    rows.push(['Aylık tahmini tüketim', fmtNum(eff * h * d) + ' m³', true]);
    if (p) rows.push(['Aylık tahmini maliyet', fmtMoney(eff * h * d * p), true]);
    notes.push(`Kombi tahmini: kapasite ÷ verim (${par.kombi_verim}) ÷ ısıl değer (${par.dogalgaz_isil_degeri_kwh_m3} kWh/m³). Gerçek tüketim yalıtıma ve hava sıcaklığına göre değişir.`);
  }
  if (!p) notes.push('Maliyet için doğalgaz birim fiyatını girin; faturanızdaki güncel tarifeyi kullanın.');
  return { rows, notes, summary: rows.map(([a, b]) => `${a}: ${b}`).join('\n') };
}

/** Klima: BTU/saat → kW soğutma, COP ile elektrik girişi, saatlik maliyet. */
export function calcAc({ btu, cop, hours, price, days }, par) {
  const b = need(btu, 'Klima kapasitesi (BTU)', '12000');
  const c = opt(cop, 'Verimlilik (COP)', '3') ?? par.klima_cop;
  const p = opt(price, 'Elektrik birim fiyatı', '3,50');
  const h = opt(hours, 'Günlük çalışma saati', '8');
  if (h !== null && h > 24) throw new Error('Günlük çalışma saati 24 saati aşamaz. 24 veya daha küçük bir değer girin.');
  const d = daysIn(days);
  const coolKw = (b * par.btu_w) / 1000;
  const inKw = coolKw / c;
  const rows = [
    ['Soğutma kapasitesi', fmtNum(coolKw) + ' kW', true],
    ['Elektrik girişi (COP ' + fmtNum(c) + ')', fmtNum(inKw) + ' kW'],
    ['Saatte tüketim', fmtKwh(inKw)],
  ];
  if (p) rows.push(['Saatlik maliyet', fmtMoney(inKw * p), true]);
  if (h) {
    rows.push(['Günlük tüketim', fmtKwh(inKw * h)]);
    rows.push(['Aylık tüketim (' + d + ' gün)', fmtKwh(inKw * h * d)]);
    if (p) rows.push(['Aylık maliyet', fmtMoney(inKw * h * d * p), true]);
  }
  const notes = ['Klima sürekli tam güçte çalışmaz; inverter modelde gerçek tüketim çoğunlukla bu değerin altındadır. COP değeri cihaz etiketindedir.'];
  if (!p) notes.push('Maliyet için elektrik birim fiyatını girin.');
  return { rows, notes, summary: rows.map(([a, b]) => `${a}: ${b}`).join('\n') };
}
