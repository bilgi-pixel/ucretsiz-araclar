// Tasarruf Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const gelir = h.pos(v.gelir, 'Aylık net gelir');
    const gider = h.nonneg(v.gider, 'Aylık toplam gider');
    const tasarruf = gelir - gider;
    const oran = tasarruf / gelir * 100;
    const rows = [
      ['Tasarruf oranı', '%' + h.fmt(oran, 2)],
      ['Aylık tasarruf', h.para(tasarruf)],
      ['Yıllık tasarruf', h.para(tasarruf * 12)],
      ['Gider oranı', '%' + h.fmt(gider / gelir * 100, 2)],
      ['Üç aylık gideri biriktirme süresi', tasarruf > 0 && gider > 0 ? h.fmt(gider * 3 / tasarruf, 1) + ' ay' : '—'],
    ];
    let note = tasarruf < 0
      ? 'Gideriniz gelirinizi aşıyor; tasarruf oranı eksi. Aradaki fark borç ya da önceki birikimle karşılanıyor demektir.'
      : 'Yıllık tasarruf, bu ayın tutarının on iki ay boyunca aynen sürdüğü varsayımıyla hesaplanır; faiz ve getiri eklenmez.';
    if (String(v.hedef ?? '').trim() !== '') {
      const hedef = h.nonneg(v.hedef, 'Hedef tasarruf oranı');
      if (hedef > 100) h.err('"Hedef tasarruf oranı" %100\'den büyük olamaz.');
      const gereken = gelir * hedef / 100;
      const fark = gereken - tasarruf;
      rows.push(['Hedef için gereken aylık tasarruf', h.para(gereken)]);
      rows.push(['Hedef durumu', fark > 0.005 ? `Hedef için giderleri ${h.para(fark)} azaltmalısınız` : fark < -0.005 ? `Hedefin üzerindesiniz (aylık ${h.para(-fark)} fazla)` : 'Tam hedeftesiniz']);
    }
    return { rows, note };
  }
