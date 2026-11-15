// Fire Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const giren = h.pos(v.giren, 'Giren miktar');
    const m = h.nonneg(v.miktar, v.tur === 'net' ? 'Net miktar' : 'Fire miktarı');
    if (m > giren + 1e-9) h.err(v.tur === 'net' ? 'Net çıktı giren miktardan büyük olamaz. Değerleri aynı birimde yazdığınızdan emin olun.' : 'Fire miktarı giren miktardan büyük olamaz. Değerleri aynı birimde yazdığınızdan emin olun.');
    const fire = v.tur === 'net' ? giren - m : m;
    const net = giren - fire;
    const rows = [
      ['Fire oranı', '%' + h.fmt(fire / giren * 100, 2)],
      ['Fire miktarı', h.fmt(fire, 3)],
      ['Net (kullanılabilir) miktar', h.fmt(net, 3)],
      ['Verim (randıman)', '%' + h.fmt(net / giren * 100, 2)],
    ];
    const netVar = net > 1e-12;
    if (netVar) rows.push(['Nete eklenecek fire payı', '%' + h.fmt(fire / net * 100, 2)]);
    if (dolu(v.birimMaliyet)) {
      const bm = h.pos(v.birimMaliyet, 'Birim alış maliyeti');
      rows.push(['Fire maliyeti', h.para(fire * bm)]);
      if (netVar) rows.push(['Net birim maliyet', h.para(giren * bm / net)]);
    }
    if (dolu(v.hedef)) {
      const hedef = h.pos(v.hedef, 'Hedef net miktar');
      if (!netVar) h.err('Fire oranı %100 olduğu için hedef miktara ulaşmak mümkün değil; fire ya da net miktarı kontrol edin.');
      rows.push(['Hedef için gereken brüt miktar', h.fmt(hedef * giren / net, 3)]);
    }
    return {
      rows,
      note: 'Fire oranı giren miktara göre hesaplanır. Net miktardan brüt ihtiyaca giderken "nete eklenecek fire payı" kullanılır; bu oran her zaman fire oranından büyüktür.',
    };
  }
