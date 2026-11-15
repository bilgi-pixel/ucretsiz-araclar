// Tıklama Oranı (CTR) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const g = h.posint(v.gosterim, 'Gösterim sayısı');
    const t = h.int(v.tiklama, 'Tıklama sayısı');
    if (t < 0) h.err('"Tıklama sayısı" negatif olamaz.');
    if (t > g) h.err('Tıklama sayısı gösterim sayısından büyük olamaz; iki değerin aynı rapora ve aynı döneme ait olduğunu kontrol edin.');
    const ctr = (t / g) * 100;
    const rows = [
      ['Tıklama oranı (CTR)', '%' + h.fmt(ctr, 2)],
      ['Tıklama sıklığı', t > 0 ? 'Her ' + h.fmt(g / t, 2) + ' gösterimde 1' : '—'],
      ['1.000 gösterimde tıklama', h.fmt((t / g) * 1000, 1)],
      ['Tıklanmayan gösterim', h.fmt(g - t, 0)],
    ];
    if (String(v.harcama ?? '').trim() !== '') {
      const p = h.nonneg(v.harcama, 'Toplam harcama');
      rows.push(['Tıklama başı maliyet (CPC)', t > 0 ? h.para(p / t) : '—']);
      rows.push(['Bin gösterim maliyeti (CPM)', h.para((p / g) * 1000)]);
    }
    if (String(v.hedef ?? '').trim() !== '') {
      const hedef = h.pos(v.hedef, 'Hedef tıklama oranı');
      if (hedef > 100) h.err('"Hedef tıklama oranı" en fazla 100 olabilir.');
      const gerek = Math.ceil((g * hedef) / 100 - 1e-9);
      const ek = Math.max(0, gerek - t);
      rows.push(['Hedef için gereken tıklama', h.fmt(gerek, 0)]);
      rows.push(['Gereken ek tıklama', ek > 0 ? h.fmt(ek, 0) : '0 (hedefe ulaşılmış)']);
    }
    return {
      rows,
      note: 'CTR = tıklama sayısı ÷ gösterim sayısı × 100. Oranlar yerleşime, hedeflemeye ve reklam biçimine göre büyük farklılık gösterir.',
    };
  }
