// Dönüşüm Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const z = h.posint(v.ziyaretci, 'Ziyaretçi sayısı');
    const d = h.int(v.donusum, 'Dönüşüm sayısı');
    if (d < 0) h.err('"Dönüşüm sayısı" negatif olamaz.');
    if (d > z) h.err('Dönüşüm sayısı ziyaretçi sayısından büyük olamaz; iki değerin aynı döneme ve aynı kaynağa ait olduğunu kontrol edin.');
    const oran = (d / z) * 100;
    const rows = [
      ['Dönüşüm oranı', '%' + h.fmt(oran, 2)],
      ['Dönüşüm sıklığı', d > 0 ? 'Her ' + h.fmt(z / d, 2) + ' ziyaretçiden 1' : '—'],
      ['Dönüşmeyen ziyaretçi', h.fmt(z - d, 0) + ' (%' + h.fmt(100 - oran, 2) + ')'],
      ['1.000 ziyaretçide beklenen dönüşüm', h.fmt((d / z) * 1000, 1)],
    ];
    let ciro = null;
    if (String(v.ciro ?? '').trim() !== '') {
      ciro = h.nonneg(v.ciro, 'Dönüşümlerden elde edilen ciro');
      if (d === 0 && ciro > 0) h.err('Dönüşüm sayısı sıfırken ciro girilemez.');
      rows.push(['Ortalama dönüşüm değeri', d > 0 ? h.para(ciro / d) : '—']);
      rows.push(['Ziyaretçi başına gelir', h.para(ciro / z)]);
    }
    if (String(v.hedef ?? '').trim() !== '') {
      const hedef = h.pos(v.hedef, 'Hedef dönüşüm oranı');
      if (hedef > 100) h.err('"Hedef dönüşüm oranı" en fazla 100 olabilir.');
      const gerek = Math.ceil((z * hedef) / 100 - 1e-9);
      const ek = Math.max(0, gerek - d);
      rows.push(['Hedef için gereken dönüşüm', h.fmt(gerek, 0)]);
      rows.push(['Gereken ek dönüşüm', ek > 0 ? h.fmt(ek, 0) : '0 (hedefe ulaşılmış)']);
      if (ciro !== null && d > 0) rows.push(['Hedef oranda tahmini ciro', h.para((ciro / d) * gerek)]);
    }
    return {
      rows,
      note: 'Dönüşüm oranı = dönüşüm sayısı ÷ ziyaretçi sayısı × 100. Az sayıda ziyaretçiyle hesaplanan oranlar rastlantısal dalgalanmaya açıktır.',
    };
  }
