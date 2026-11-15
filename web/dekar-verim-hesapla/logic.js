// Dekara Verim Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const u = h.nonneg(v.urun, 'Toplam hasat miktarı');
    const a = h.pos(v.alan, 'Ekili alan');
    const fiyat = h.opt(v.fiyat, 0, 'Satış fiyatı');
    if (fiyat < 0) h.err('Satış fiyatı negatif olamaz; boş bırakabilir ya da pozitif bir değer yazabilirsiniz.');
    const kg = v.urunBirim === 'ton' ? u * 1000 : u;
    const da = v.alanBirim === 'ha' ? a * 10 : v.alanBirim === 'm2' ? a / 1000 : a;
    const verim = kg / da;
    const rows = [
      ['Dekara verim', h.fmt(verim, 2) + ' kg/da'],
      ['Hektara verim', h.fmt(verim / 100, 3) + ' ton/ha'],
      ['Metrekareye verim', h.fmt(verim / 1000, 3) + ' kg/m²'],
      ['Toplam hasat', h.fmt(kg, 2) + ' kg'],
      ['Alan', `${h.fmt(da, 3)} dekar (${h.fmt(da * 1000, 1)} m²)`],
    ];
    if (fiyat > 0) {
      rows.push(['Toplam gelir', h.para(kg * fiyat)]);
      rows.push(['Dekara gelir', h.para(verim * fiyat)]);
    }
    return {
      rows,
      note: 'Dekara verim = toplam hasat (kg) ÷ alan (dekar). 1 hektar = 10 dekar, 1 dekar = 1.000 m². Gelir brüt değerdir; masraflar düşülmemiştir.',
    };
  }
