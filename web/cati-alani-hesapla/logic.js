// Çatı Alanı ve Eğimi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Bina eni');
    const boy = h.pos(v.boy, 'Bina boyu');
    const e = h.pos(v.egim, 'Eğim değeri');
    const s = h.nonneg(v.sacak, 'Saçak çıkıntısı') / 100;
    let t;
    if (v.egimTur === 'derece') {
      if (e >= 80) h.err('Eğim açısı 80 dereceden küçük olmalı. Yüzde değeri yazdıysanız eğim birimini "Yüzde" seçin.');
      t = Math.tan(e * Math.PI / 180);
    } else {
      if (e > 500) h.err('Eğim yüzdesi en fazla 500 olabilir.');
      t = e / 100;
    }
    const carpan = Math.sqrt(1 + t * t);
    const E = en + 2 * s;
    const B = boy + 2 * s;
    const plan = E * B;
    const alan = plan * carpan;
    const kosu = v.tip === 'tek' ? E : v.tip === 'kirma' ? Math.min(E, B) / 2 : E / 2;
    const mertek = kosu * carpan;
    const yuk = kosu * t;
    return {
      rows: [
        ['Çatı alanı', h.fmt(alan, 2) + ' m²'],
        ['Plan (izdüşüm) alanı', h.fmt(plan, 2) + ' m²'],
        ['Eğim', '% ' + h.fmt(t * 100, 2)],
        ['Eğim açısı', h.fmt(Math.atan(t) * 180 / Math.PI, 2) + '°'],
        ['Mertek uzunluğu', h.fmt(mertek, 2) + ' m'],
        ['Mahya yüksekliği', h.fmt(yuk, 2) + ' m'],
        ['Alan çarpanı', h.fmt(carpan, 4)],
      ],
      note: 'Mahya yüksekliği saçak ucu hizasından ölçülür. Kırma çatıda dört yüzeyin de aynı eğimde olduğu varsayılır. Bindirme ve fire payı dahil değildir. Sonuç eğik yüzey alanıdır; yağmur suyu toplama hesabında izdüşüm (plan) alanı kullanılır.',
    };
  }
