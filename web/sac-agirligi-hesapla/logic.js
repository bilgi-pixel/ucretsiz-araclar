// Sac Ağırlığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Levha eni');
    const boy = h.pos(v.boy, 'Levha boyu');
    const k = h.pos(v.kalinlik, 'Kalınlık');
    const n = h.posint(v.adet, 'Adet');
    const yog = { 7850: 7850, 7930: 7930, 2700: 2700, 8960: 8960, 8500: 8500 };
    const ro = yog[v.malzeme] || 7850;
    const alan = en * boy / 1e6;
    const m2kg = k * ro / 1000;
    const levha = alan * m2kg;
    const toplam = levha * n;
    const rows = [
      ['Toplam ağırlık', h.fmt(toplam, 2) + ' kg'],
      ['Bir levhanın ağırlığı', h.fmt(levha, 2) + ' kg'],
      ['m² ağırlığı', h.fmt(m2kg, 3) + ' kg/m²'],
      ['Toplam alan', h.fmt(alan * n, 3) + ' m²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Kilogram fiyatı');
      rows.push(['Tutar', h.para(toplam * f)]);
    }
    return { rows, note: 'Teorik ağırlıktır; kalınlık toleransı ve kaplama nedeniyle kantar ağırlığı birkaç puan farklı olabilir.' };
  }
