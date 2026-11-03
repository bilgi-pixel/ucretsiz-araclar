// Yakıt ve yol masrafı hesabı (saf JS, DOM yok). Fiyat verisi gömülü değildir; kullanıcı girer.
const nf = (min, max) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: min, maximumFractionDigits: max });
const fNum = nf(0, 2), fMoney = nf(2, 2), fKm = nf(0, 1);
export const fmtNum = (x) => fNum.format(x);
export const fmtMoney = (x) => fMoney.format(x) + ' TL';
export const fmtKm = (x) => fKm.format(x) + ' km';

/** Türkçe sayı girişini çözer: "1.417,50", "7,5", "450", "45.5". Geçersizse NaN, boşsa null. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (t === '') return null;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

/** Zorunlu pozitif sayı: boş ya da geçersizse çözüm öneren Türkçe hata. */
function need(v, label, hint) {
  const n = parseNum(v);
  if (n === null) throw new Error(`${label} boş. ${hint}`);
  if (Number.isNaN(n)) throw new Error(`${label} geçersiz. Yalnızca rakam ve virgül kullanın (örn. ${hint.replace(/^Örnek: /, '')}).`);
  if (n <= 0) throw new Error(`${label} sıfırdan büyük olmalıdır. Değeri kontrol edip yeniden girin.`);
  return n;
}
/** İsteğe bağlı pozitif sayı: boşsa null. */
function opt(v, label) {
  const n = parseNum(v);
  if (n === null) return null;
  if (Number.isNaN(n) || n <= 0) throw new Error(`${label} geçersiz. Boş bırakın ya da sıfırdan büyük bir sayı yazın (örn. 45,50).`);
  return n;
}
function people(v) {
  const n = parseNum(v === '' ? '1' : v);
  if (n === null || Number.isNaN(n) || !Number.isInteger(n) || n < 1 || n > 99) throw new Error('Kişi sayısı 1 ile 99 arasında tam sayı olmalıdır.');
  return n;
}

/**
 * Hesap: mode = 'cost' | 'ev' | 'range' | 'consume'. Dönüş: { rows: [[etiket, değer, vurgulu?]], notes: [], summary }.
 */
export function calc(mode, v) {
  const rows = [], notes = [];
  const unit = mode === 'ev' ? 'kWh' : 'L';

  if (mode === 'cost' || mode === 'ev') {
    const ev = mode === 'ev';
    let km = need(v.km, 'Mesafe', 'Örnek: 450');
    const cons = need(v.cons, ev ? '100 km\'deki kWh tüketimi' : '100 km\'deki yakıt tüketimi', ev ? 'Örnek: 17,5' : 'Örnek: 7');
    const price = opt(v.price, ev ? 'kWh fiyatı' : 'Yakıt fiyatı');
    const n = people(v.people);
    const monthly = opt(v.monthly, 'Aylık mesafe');
    if (v.round) { km *= 2; notes.push('Gidiş-dönüş seçili: mesafe iki katına çıkarıldı.'); }
    const amount = (km * cons) / 100;
    rows.push(['Toplam mesafe', fmtKm(km)]);
    rows.push([ev ? 'Toplam enerji' : 'Toplam yakıt', `${fmtNum(amount)} ${unit}`, true]);
    if (price !== null) {
      const cost = amount * price;
      rows.push(['Toplam maliyet', fmtMoney(cost), true]);
      rows.push([`Kişi başı (${n} kişi)`, fmtMoney(cost / n)]);
      rows.push(['Kilometre başına maliyet', fmtMoney(cost / km)]);
      if (monthly !== null) {
        const mc = (monthly * cons / 100) * price;
        rows.push([`Aylık ${fmtKm(monthly)} için ${unit}`, `${fmtNum(monthly * cons / 100)} ${unit}`]);
        rows.push(['Aylık gider (tahmini)', fmtMoney(mc)]);
        rows.push(['Yıllık gider (tahmini)', fmtMoney(mc * 12)]);
      }
    } else {
      notes.push(`${ev ? 'kWh' : 'Yakıt'} fiyatı girilmediği için maliyet hesaplanmadı. Güncel ${ev ? 'şarj' : 'pompa'} fiyatını girerseniz maliyet, kişi başı pay ve yıllık gider görünür.`);
      if (monthly !== null) rows.push([`Aylık ${fmtKm(monthly)} için ${unit}`, `${fmtNum(monthly * cons / 100)} ${unit}`]);
    }
    return { rows, notes, summary: `${fmtKm(km)} yol: ${fmtNum(amount)} ${unit}` + (price !== null ? `, ${fmtMoney(amount * price)} (kişi başı ${fmtMoney(amount * price / n)})` : '') };
  }

  if (mode === 'range') {
    const tank = need(v.tank, 'Depo (alınan yakıt) miktarı', 'Örnek: 45');
    const cons = need(v.cons, '100 km\'deki yakıt tüketimi', 'Örnek: 7');
    const price = opt(v.price, 'Yakıt fiyatı');
    const km = (tank / cons) * 100;
    rows.push(['Alınabilecek yol', fmtKm(km), true]);
    if (price !== null) {
      rows.push(['Depoyu doldurma maliyeti', fmtMoney(tank * price)]);
      rows.push(['Kilometre başına maliyet', fmtMoney((tank * price) / km), true]);
      rows.push(['100 km maliyeti', fmtMoney((cons * price))]);
    } else notes.push('Yakıt fiyatı girerseniz depo maliyeti ve kilometre başına maliyet de hesaplanır.');
    return { rows, notes, summary: `${fmtNum(tank)} L ile yaklaşık ${fmtKm(km)} yol` };
  }

  if (mode === 'consume') {
    const liters = need(v.liters, 'Depoya alınan yakıt', 'Örnek: 38,5');
    const km = need(v.km, 'İki dolum arasında yapılan yol', 'Örnek: 520');
    const price = opt(v.price, 'Yakıt fiyatı');
    const per100 = (liters / km) * 100;
    rows.push(['Tüketim', `${fmtNum(per100)} L / 100 km`, true]);
    rows.push(['Litre başına yol', `${fmtNum(km / liters)} km/L`]);
    if (price !== null) {
      rows.push(['Kilometre başına maliyet', fmtMoney((liters * price) / km)]);
      rows.push(['100 km maliyeti', fmtMoney(per100 * price)]);
    } else notes.push('Yakıt fiyatı girerseniz kilometre başına maliyet de gösterilir.');
    notes.push('Doğru sonuç için depoyu iki seferde de aynı şekilde (otomatik durmaya kadar) doldurun; yalnızca ikinci dolumdaki litre miktarı kullanılır.');
    return { rows, notes, summary: `Tüketim: ${fmtNum(per100)} L/100 km (${fmtNum(liters)} L, ${fmtKm(km)})` };
  }
  throw new Error('Hesaplama türü seçilmedi. Üstteki seçeneklerden birini işaretleyin.');
}
