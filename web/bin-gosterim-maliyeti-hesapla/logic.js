// Bin Gösterim Maliyeti (CPM) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let maliyet, gosterim, cpm;
    const rows = [];
    if (v.bul === 'maliyet') {
      cpm = h.pos(v.cpm, 'Bin gösterim maliyeti');
      gosterim = h.pos(v.gosterim, 'Gösterim sayısı');
      maliyet = (cpm * gosterim) / 1000;
      rows.push(['Toplam maliyet', h.para(maliyet)]);
      rows.push(['Bin gösterim maliyeti (CPM)', h.para(cpm)]);
      rows.push(['Gösterim sayısı', h.fmt(gosterim, 0)]);
    } else if (v.bul === 'gosterim') {
      maliyet = h.pos(v.maliyet, 'Toplam maliyet');
      cpm = h.pos(v.cpm, 'Bin gösterim maliyeti');
      gosterim = (maliyet / cpm) * 1000;
      rows.push(['Gösterim sayısı', h.fmt(Math.floor(gosterim + 1e-6), 0)]);
      rows.push(['Bin gösterim maliyeti (CPM)', h.para(cpm)]);
      rows.push(['Toplam maliyet', h.para(maliyet)]);
    } else {
      maliyet = h.nonneg(v.maliyet, 'Toplam maliyet');
      gosterim = h.pos(v.gosterim, 'Gösterim sayısı');
      cpm = (maliyet / gosterim) * 1000;
      rows.push(['Bin gösterim maliyeti (CPM)', h.para(cpm)]);
      rows.push(['Toplam maliyet', h.para(maliyet)]);
      rows.push(['Gösterim sayısı', h.fmt(gosterim, 0)]);
    }
    rows.push(['Tek gösterimin maliyeti', h.fmt(cpm / 1000, 5) + ' TL']);
    rows.push(['1.000 TL ile alınan gösterim', h.fmt(cpm > 0 ? Math.floor((1000 / cpm) * 1000 + 1e-6) : Infinity, 0)]);
    if (String(v.tiklama ?? '').trim() !== '') {
      const t = h.int(v.tiklama, 'Tıklama sayısı');
      if (t < 0) h.err('"Tıklama sayısı" negatif olamaz.');
      if (t > gosterim + 1e-6) h.err('Tıklama sayısı gösterim sayısından büyük olamaz.');
      rows.push(['Tıklama oranı (CTR)', '%' + h.fmt((t / gosterim) * 100, 2)]);
      rows.push(['Tıklama başı maliyet (CPC)', t > 0 ? h.para(maliyet / t) : '—']);
    }
    return {
      rows,
      note: 'CPM = toplam maliyet ÷ gösterim sayısı × 1.000. Tutarları vergiler hariç ya da dahil, ama hep aynı esasa göre girin.',
    };
  }
