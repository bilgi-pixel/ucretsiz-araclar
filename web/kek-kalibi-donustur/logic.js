// Kek Kalıbı Boyutu Dönüştürme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = (sekil, aMetin, bMetin, ad) => {
      const a = h.pos(aMetin, ad + ' ölçüsü');
      if (a > 200) h.err(ad + ' ölçüsü 200 cm\'den büyük olamaz; değeri santimetre olarak yazdığınızdan emin olun.');
      if (sekil === 'dikdortgen') {
        const b = String(bMetin ?? '').trim() === '' ? a : h.pos(bMetin, ad + ' 2. kenarı');
        if (b > 200) h.err(ad + ' 2. kenarı 200 cm\'den büyük olamaz.');
        return a * b;
      }
      return Math.PI * a * a / 4;
    };
    const A1 = alan(v.kaynakSekil, v.kaynakA, v.kaynakB, 'Tarifteki kalıp');
    const A2 = alan(v.hedefSekil, v.hedefA, v.hedefB, 'Elimdeki kalıp');
    const k = A2 / A1;
    const yuzde = (k - 1) * 100;
    const degisim = Math.abs(yuzde) < 0.05 ? 'Aynı miktar' : '%' + h.fmt(Math.abs(yuzde), 1) + (yuzde > 0 ? ' daha fazla' : ' daha az');
    const rows = [
      ['Malzeme çarpanı', h.fmt(k, 2) + ' kat'],
      ['Malzeme değişimi', degisim],
      ['Tarifteki kalıbın taban alanı', h.fmt(A1, 1) + ' cm²'],
      ['Elimdeki kalıbın taban alanı', h.fmt(A2, 1) + ' cm²'],
    ];
    if (String(v.miktar ?? '').trim() !== '') {
      const m = h.pos(v.miktar, 'Malzeme miktarı');
      rows.push(['Yeni malzeme miktarı', h.fmt(m * k, 2)]);
    }
    return {
      rows,
      note: 'Çarpan, hamur yüksekliğinin aynı kalması için taban alanlarının oranıdır. Pişirme süresi çarpanla orantılı değişmez; keki kürdan testiyle denetleyin.',
    };
  }
