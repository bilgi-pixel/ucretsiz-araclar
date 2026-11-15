// Döviz Alım Satım Kâr Zarar Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const m = h.pos(v.miktar, 'Döviz miktarı');
    const a = h.pos(v.alis, 'Aldığınız kur');
    const s = h.nonneg(v.satis, 'Sattığınız kur');
    const masraf = String(v.masraf ?? '').trim() === '' ? 0 : h.nonneg(v.masraf, 'Toplam işlem masrafı');
    const maliyet = m * a + masraf;
    const gelir = m * s;
    const kz = gelir - maliyet;
    const oran = (kz / maliyet) * 100;
    const yuzde = (x) => {
      const t = h.fmt(Math.abs(x), 2);
      return (x < 0 && t !== '0' ? '-%' : '%') + t;
    };
    const rows = [
      [kz < 0 ? 'Zarar' : 'Kâr', h.para(Math.abs(kz))],
      ['Getiri oranı', yuzde(oran)],
      ['Toplam maliyet', h.para(maliyet)],
      ['Satış geliri', h.para(gelir)],
      ['Kur farkı (birim başına)', h.fmt(s - a, 4) + ' TL'],
      ['Kur değişimi', yuzde(((s - a) / a) * 100)],
      ['Başabaş satış kuru', h.fmt(maliyet / m, 4) + ' TL'],
    ];
    return { rows, note: 'Kâr/zarar = miktar × (satış kuru − alış kuru) − masraf. Getiri oranı toplam maliyete göre hesaplanır; enflasyon ve alternatif getiri dikkate alınmaz.' };
  }
