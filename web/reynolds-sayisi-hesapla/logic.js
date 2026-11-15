// Reynolds Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hiz = h.pos(v.hiz, 'Akış hızı');
    const D = h.pos(v.cap, 'Çap');
    let ro;
    let mu;
    if (v.akiskan === 'ozel') {
      ro = h.pos(v.yogunluk, 'Yoğunluk');
      mu = h.pos(v.viskozite, 'Dinamik viskozite');
    } else if (v.akiskan === 'hava') { ro = 1.204; mu = 1.825e-5; }
    else { ro = 998.2; mu = 1.002e-3; }
    const Re = ro * hiz * D / mu;
    let rejim;
    if (Re < 2300) rejim = 'Laminer (Re < 2300)';
    else if (Re <= 4000) rejim = 'Geçiş bölgesi (2300–4000)';
    else rejim = 'Türbülanslı (Re > 4000)';
    return {
      rows: [
        ['Reynolds sayısı', h.sig(Re, 5)],
        ['Akış rejimi (boru akışı)', rejim],
        ['Kinematik viskozite', h.sig(mu / ro) + ' m²/s'],
        ['Laminer sınır hızı (Re = 2300)', h.sig(2300 * mu / (ro * D)) + ' m/s'],
        ['Kullanılan yoğunluk', h.sig(ro) + ' kg/m³'],
        ['Kullanılan dinamik viskozite', h.sig(mu) + ' Pa·s'],
      ],
      note: 'Rejim sınırları dairesel kesitli boru içi akış için yaygın kabul edilen değerlerdir. Su ve hava özellikleri 20 °C için yaklaşık değerlerdir; sıcaklıkla değişir.',
    };
  }
