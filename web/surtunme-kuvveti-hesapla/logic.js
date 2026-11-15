// Sürtünme Kuvveti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const mu = h.nonneg(v.mu, 'Sürtünme katsayısı');
    const d = h.nonneg(v.deger, 'Kütle ya da normal kuvvet');
    let N, ivme = null, aci = 0;
    if (v.tur === 'normal') {
      N = d;
    } else {
      const g = h.pos(v.g, 'Yer çekimi ivmesi');
      aci = h.opt(v.aci, 0, 'Eğim açısı');
      if (aci < 0 || aci >= 90) h.err('Eğim açısı 0 ile 90 derece arasında olmalı (90 hariç). Yatay zemin için 0 yazın.');
      const c = Math.cos((aci * Math.PI) / 180);
      N = d * g * c;
      ivme = mu * g * c;
    }
    const F = mu * N;
    const rows = [
      ['Sürtünme kuvveti', h.fmt(F, 2) + ' N'],
      ['Normal kuvvet', h.fmt(N, 2) + ' N'],
    ];
    if (ivme !== null) {
      rows.push(['Sürtünmenin yavaşlatma ivmesi', h.fmt(ivme, 3) + ' m/s²']);
      rows.push(['Cismin ağırlığı', h.fmt(d * h.pos(v.g, 'Yer çekimi ivmesi'), 2) + ' N']);
    }
    return { rows, note: 'Statik katsayı girdiyseniz sonuç, cismi harekete geçirmek için aşılması gereken en büyük sürtünme kuvvetidir; kinetik katsayı girdiyseniz kayma sırasındaki kuvvettir.' };
  }
