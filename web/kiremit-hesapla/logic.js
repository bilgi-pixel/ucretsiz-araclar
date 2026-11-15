// Kiremit Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Alan');
    const m2 = h.pos(v.m2Adet, 'm² başına kiremit adedi');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const mahya = h.nonneg(v.mahya, 'Mahya uzunluğu');
    const mAdet = h.pos(v.mahyaAdet, 'Metrede mahya kiremidi adedi');
    if (fire > 100) h.err('"Fire payı" en fazla 100 olabilir.');
    let cati = alan;
    if (v.alanTur === 'plan') {
      const e = h.nonneg(v.egim, 'Çatı eğimi');
      if (e > 500) h.err('Çatı eğimi yüzde olarak yazılmalı; en fazla 500 olabilir.');
      cati = alan * Math.sqrt(1 + (e / 100) * (e / 100));
    }
    const k = 1 + fire / 100;
    const net = Math.ceil(cati * m2 - 1e-9);
    const adet = Math.ceil(cati * m2 * k - 1e-9);
    const mahyaAd = Math.ceil(mahya * mAdet * k - 1e-9);
    const rows = [
      ['Kiremit adedi', h.fmt(adet, 0) + ' adet'],
      ['Eğimli çatı alanı', h.fmt(cati, 2) + ' m²'],
      ['Fire hariç kiremit', h.fmt(net, 0) + ' adet'],
      ['Mahya kiremidi', h.fmt(mahyaAd, 0) + ' adet'],
    ];
    if (String(v.agirlik ?? '').trim() !== '') {
      const kg = h.pos(v.agirlik, 'Bir kiremidin ağırlığı');
      rows.push(['Toplam kiremit ağırlığı', h.fmt(adet * kg, 0) + ' kg']);
      rows.push(['m² başına ağırlık', h.fmt(m2 * kg, 2) + ' kg/m²']);
    }
    return { rows, note: 'Saçak başlangıç sırası, kenar kiremitleri ve havalandırma kiremitleri gibi özel parçalar ayrıca sayılmalıdır.' };
  }
