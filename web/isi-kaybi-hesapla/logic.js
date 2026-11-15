// Duvar Isı Kaybı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const A = h.pos(v.alan, 'Duvar alanı');
    const ti = h.num(String(v.icSicaklik ?? '').trim() === '' ? '20' : v.icSicaklik, 'İç sıcaklık');
    const td = h.num(v.disSicaklik, 'Dış sıcaklık');
    const dT = ti - td;
    if (!(dT > 0)) h.err('İç sıcaklık dış sıcaklıktan yüksek olmalı; ısı kaybı ısıtma dönemi için hesaplanır.');
    const d1 = h.pos(v.duvarKalinlik, 'Duvar kalınlığı') / 100;
    const l1 = h.pos(v.duvarLambda, 'Duvar malzemesi ısı iletkenliği');
    const d2 = h.opt(v.yalitimKalinlik, 0, 'Yalıtım kalınlığı') / 100;
    if (d2 < 0) h.err('"Yalıtım kalınlığı" negatif olamaz.');
    const l2 = d2 > 0 ? h.pos(v.yalitimLambda, 'Yalıtım malzemesi λ') : 1;
    const Ryuzey = 0.13 + 0.04;
    const R0 = Ryuzey + d1 / l1;
    const R = R0 + (d2 > 0 ? d2 / l2 : 0);
    const U = 1 / R;
    const Q = U * A * dT;
    const rows = [
      ['Isı kaybı', h.fmt(Q, 1) + ' W'],
      ['U değeri (ısı geçirgenlik katsayısı)', h.fmt(U, 3) + ' W/m²K'],
      ['Toplam ısıl direnç', h.fmt(R, 3) + ' m²K/W'],
      ['Sıcaklık farkı', h.fmt(dT, 1) + ' °C'],
      ['24 saatte kaybedilen enerji', h.fmt(Q * 24 / 1000, 2) + ' kWh'],
    ];
    if (d2 > 0) {
      const Q0 = A * dT / R0;
      rows.push(['Yalıtımsız durumda ısı kaybı', h.fmt(Q0, 1) + ' W']);
      rows.push(['Yalıtımın sağladığı azalma', '%' + h.fmt((1 - Q / Q0) * 100, 1)]);
    }
    return {
      rows,
      note: 'İç ve dış yüzey dirençleri toplam 0,17 m²K/W alınmıştır. Sıva katmanları, ısı köprüleri, pencere ve hava sızıntısı kayıpları dahil değildir.',
    };
  }
