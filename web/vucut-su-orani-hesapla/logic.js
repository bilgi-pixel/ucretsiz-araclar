// Vücut Su Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const erkek = v.cinsiyet !== 'kadin';
    const boy = h.pos(v.boy, 'Boy');
    const kilo = h.pos(v.kilo, 'Kilo');
    if (boy < 130 || boy > 220) h.err('"Boy" 130 ile 220 cm arasında olmalı; değeri santimetre olarak yazın (örn. 175).');
    if (kilo < 30 || kilo > 250) h.err('"Kilo" 30 ile 250 kg arasında olmalı.');
    let su;
    if (erkek) {
      const yas = h.pos(v.yas, 'Yaş');
      if (yas < 18 || yas > 100) h.err('Formül erişkinler içindir; "Yaş" 18 ile 100 arasında olmalı.');
      su = 2.447 - 0.09156 * yas + 0.1074 * boy + 0.3362 * kilo;
    } else {
      if (String(v.yas ?? '').trim() !== '') {
        const yas = h.pos(v.yas, 'Yaş');
        if (yas < 18 || yas > 100) h.err('Formül erişkinler içindir; "Yaş" 18 ile 100 arasında olmalı.');
      }
      su = -2.097 + 0.1069 * boy + 0.2466 * kilo;
    }
    const oran = (su / kilo) * 100;
    return {
      rows: [
        ['Toplam vücut suyu', h.fmt(su, 1) + ' litre'],
        ['Vücut ağırlığına oranı', '%' + h.fmt(oran, 1)],
        ['Hücre içi sıvı (yaklaşık 2/3)', h.fmt((su * 2) / 3, 1) + ' litre'],
        ['Hücre dışı sıvı (yaklaşık 1/3)', h.fmt(su / 3, 1) + ' litre'],
        ['Su dışındaki kütle', h.fmt(kilo - su, 1) + ' kg'],
      ],
      note: 'Watson formülü sağlıklı erişkinlerden elde edilen bir tahmindir. Ödem, sıvı kaybı, gebelik ve ileri derecede kas ya da yağ fazlalığında gerçek değer sapabilir; sonuç tıbbi değerlendirme yerine geçmez.',
    };
  }
