// Temettü Verimi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = h.nonneg(v.temettu, 'Hisse başına brüt temettü');
    const f = h.pos(v.fiyat, 'Hisse fiyatı');
    const bos = (s) => String(s ?? '').trim() === '';
    const st = bos(v.stopaj) ? null : h.nonneg(v.stopaj, 'Stopaj oranı');
    if (st !== null && st > 100) h.err('"Stopaj oranı" 0 ile 100 arasında olmalı.');
    const adet = bos(v.adet) ? null : h.pos(v.adet, 'Hisse adedi');
    const brutVerim = (t / f) * 100;
    const rows = [['Brüt temettü verimi', '%' + h.fmt(brutVerim, 2)]];
    let net = t;
    if (st !== null) {
      net = t * (1 - st / 100);
      rows.push(['Net temettü verimi', '%' + h.fmt((net / f) * 100, 2)]);
      rows.push(['Hisse başına net temettü', h.fmt(net, 4) + ' TL']);
      rows.push(['Hisse başına stopaj', h.fmt(t - net, 4) + ' TL']);
    }
    if (adet !== null) {
      rows.push(['Toplam brüt temettü', h.para(t * adet)]);
      if (st !== null) rows.push(['Toplam net temettü', h.para(net * adet)]);
      rows.push(['Hisselerin toplam değeri', h.para(f * adet)]);
    }
    return { rows, note: 'Temettü verimi = hisse başına temettü ÷ hisse fiyatı × 100. Geçmişte dağıtılan temettü, gelecekte de dağıtılacağının güvencesi değildir.' };
  }
