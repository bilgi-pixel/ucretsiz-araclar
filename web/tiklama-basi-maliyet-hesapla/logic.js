// Tıklama Başı Maliyet (CPC) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const harcama = h.nonneg(v.harcama, 'Reklam harcaması');
    const tiklama = h.posint(v.tiklama, 'Tıklama sayısı');
    const dolu = (s) => String(s ?? '').trim() !== '';
    const tbm = harcama / tiklama;
    const rows = [
      ['Tıklama başı maliyet', h.para(tbm)],
      ['100 tıklamanın maliyeti', h.para(tbm * 100)],
    ];
    if (dolu(v.gosterim)) {
      const gosterim = h.posint(v.gosterim, 'Gösterim sayısı');
      if (tiklama > gosterim) h.err('Tıklama sayısı gösterim sayısından büyük olamaz; iki alanı kontrol edin.');
      rows.push(['Tıklama oranı', '%' + h.fmt(tiklama / gosterim * 100, 2)]);
      rows.push(['Bin gösterim maliyeti', h.para(harcama / gosterim * 1000)]);
    }
    if (dolu(v.donusum)) {
      const donusum = h.int(v.donusum, 'Dönüşüm sayısı');
      if (donusum < 0) h.err('"Dönüşüm sayısı" negatif olamaz.');
      rows.push(['Dönüşüm oranı', '%' + h.fmt(donusum / tiklama * 100, 2)]);
      rows.push(['Dönüşüm başı maliyet', donusum > 0 ? h.para(harcama / donusum) : '—']);
    }
    return {
      rows,
      note: 'Sonuç, girdiğiniz dönemin ortalama tıklama başı maliyetidir; tek tek tıklamaların bedeli bu ortalamanın altında ya da üstünde olabilir.',
    };
  }
