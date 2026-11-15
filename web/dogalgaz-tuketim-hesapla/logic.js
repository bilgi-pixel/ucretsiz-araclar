// Doğal Gaz Tüketimi (m³ – kWh) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Tüketim');
    const k = h.pos(v.isilDeger, 'Çevrim katsayısı');
    if (k < 5 || k > 15) h.err('Çevrim katsayısı 5 ile 15 kWh/m³ arasında olmalı. Doğal gaz için yaygın değer 10,64\'tür.');
    const fiyat = h.opt(v.fiyat, null, 'Birim fiyat');
    if (fiyat !== null && fiyat < 0) h.err('"Birim fiyat" negatif olamaz.');
    const m3 = v.yon === 'kwh' ? x / k : x;
    const kwh = m3 * k;
    const rows = [
      v.yon === 'kwh' ? ['Hacim', h.fmt(m3, 3) + ' m³'] : ['Enerji', h.fmt(kwh, 2) + ' kWh'],
      v.yon === 'kwh' ? ['Enerji', h.fmt(kwh, 2) + ' kWh'] : ['Hacim', h.fmt(m3, 3) + ' m³'],
      ['Megajul karşılığı', h.fmt(kwh * 3.6, 1) + ' MJ'],
      ['Kilokalori karşılığı', h.fmt(kwh * 859.845, 0) + ' kcal'],
    ];
    if (fiyat !== null) {
      rows.push(['Tutar', h.para(m3 * fiyat)]);
      rows.push(['kWh başına maliyet', h.fmt(fiyat / k, 4) + ' TL/kWh']);
    }
    return {
      rows,
      note: 'kWh = m³ × çevrim katsayısı. 1 kWh = 3,6 MJ = 859,845 kcal. Tutar tek bir birim fiyatla hesaplanır; sabit bedeller ve yuvarlamalar dahil değildir.',
    };
  }
