// Yağmur Suyu Hasadı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Çatı izdüşüm alanı');
    const yagis = h.nonneg(v.yagis, 'Yıllık yağış');
    const k = Number(v.katsayi);
    const verim = h.opt(v.verim, 90, 'Filtre ve sistem verimi');
    if (!(verim > 0) || verim > 100) h.err('"Filtre ve sistem verimi" 0 ile 100 arasında bir yüzde olmalı (örn. 90).');
    const birMm = alan * k * verim / 100;
    const yil = birMm * yagis;
    const rows = [
      ['Yıllık toplanabilir su', h.fmt(yil, 0) + ' litre'],
      ['Metreküp karşılığı', h.fmt(yil / 1000, 2) + ' m³'],
      ['Aylık ortalama', h.fmt(yil / 12, 0) + ' litre'],
      ['Günlük ortalama', h.fmt(yil / 365, 1) + ' litre'],
      ['Her 1 mm yağışta toplanan', h.fmt(birMm, 1) + ' litre'],
    ];
    if (String(v.tuketim ?? '').trim() !== '') {
      const t = h.pos(v.tuketim, 'Günlük su ihtiyacı');
      rows.push(['Yıllık ihtiyaç', h.fmt(t * 365, 0) + ' litre']);
      rows.push(['İhtiyacı karşılama oranı', '%' + h.fmt(yil / (t * 365) * 100, 1)]);
    }
    return {
      rows,
      note: 'Sonuç yıllık toplam üzerinden bir ortalamadır; yağış aylara eşit dağılmaz. Depo boyutunu belirlerken yağışlı ve kurak ayları ayrı ayrı değerlendirin. Çatı alanı olarak eğik yüzeyi değil, çatının yere izdüşüm (plan) alanını girin.',
    };
  }
