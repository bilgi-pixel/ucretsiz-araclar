// Troy Ons Gram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const TROY = 31.1034768;
    const OZ = 28.349523125;
    const x = h.nonneg(v.deger, 'Ağırlık');
    const g = v.yon === 'g' ? x : x * TROY;
    const ozt = v.yon === 'g' ? x / TROY : x;
    const rows = v.yon === 'g'
      ? [['Troy ons', h.fmt(ozt, 4) + ' ozt'], ['Gram', h.fmt(g, 4) + ' g']]
      : [['Gram', h.fmt(g, 4) + ' g'], ['Troy ons', h.fmt(ozt, 4) + ' ozt']];
    rows.push(['Kilogram', h.fmt(g / 1000, 6) + ' kg']);
    rows.push(['Gündelik ons (avoirdupois)', h.fmt(g / OZ, 4) + ' oz']);
    let note = '1 troy ons = 31,1034768 g (tam tanım). Gündelik ons (28,349523125 g) ile aynı birim değildir.';
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Ons fiyatı');
      rows.push(['Gram başına fiyat', h.fix(f / TROY, 2)]);
      rows.push(['Girilen ağırlığın tutarı', h.fix(f * ozt, 2)]);
      note += ' Fiyat satırları, yazdığınız ons fiyatıyla aynı para birimindedir ve saf maden içindir; ayar, işçilik, alış-satış farkı ve vergiler dahil değildir.';
    }
    return { rows, note };
  }
