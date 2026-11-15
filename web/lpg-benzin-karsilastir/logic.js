// LPG Benzin Karşılaştırma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tuk = h.pos(v.tuketim, 'Benzin tüketimi');
    const pb = h.pos(v.benzin, 'Benzin litre fiyatı');
    const pl = h.pos(v.lpg, 'LPG litre fiyatı');
    const artis = h.nonneg(v.artis, 'LPG\'de tüketim artışı');
    const km = h.pos(v.km, 'Yıllık kilometre');
    if (tuk > 60) h.err('"Benzin tüketimi" 100 km için litre olarak girilmeli; değer çok yüksek görünüyor.');
    if (artis > 100) h.err('"LPG\'de tüketim artışı" yüzde 100\'den büyük olamaz.');
    const lpgTuk = tuk * (1 + artis / 100);
    const mB = tuk * pb;
    const mL = lpgTuk * pl;
    const fark = mB - mL;
    const yillik = fark * km / 100;
    const rows = [
      ['Yıllık tasarruf', h.para(yillik)],
      ['100 km benzin maliyeti', h.para(mB)],
      ['100 km LPG maliyeti', h.para(mL)],
      ['100 km tasarruf', h.para(fark)],
      ['Tasarruf oranı', '% ' + h.fmt(fark / mB * 100, 1)],
      ['LPG tüketimi', h.fmt(lpgTuk, 2) + ' L/100 km'],
      ['Aylık tasarruf', h.para(yillik / 12)],
      ['Başabaş LPG fiyatı', h.para(pb / (1 + artis / 100))],
    ];
    if (String(v.donusum ?? '').trim() !== '') {
      const d = h.pos(v.donusum, 'Dönüşüm maliyeti');
      if (fark > 1e-9) {
        rows.push(['Amorti mesafesi', h.fmt(d / fark * 100, 0) + ' km']);
        rows.push(['Amorti süresi', h.fmt(d / (yillik / 12), 1) + ' ay']);
      } else {
        rows.push(['Amorti mesafesi', 'Amorti etmez']);
        rows.push(['Amorti süresi', 'Amorti etmez']);
      }
    }
    return {
      rows,
      note: fark > 1e-9
        ? 'Hesap yalnızca yakıt giderini karşılaştırır; LPG sisteminin bakımı, soğuk çalıştırmada harcanan benzin ve olası ek giderler dahil değildir.'
        : 'Girdiğiniz fiyatlarla LPG kullanımı benzinden ucuz değil. LPG fiyatı "Başabaş LPG fiyatı" satırındaki değerin altına indiğinde tasarruf başlar.',
    };
  }
