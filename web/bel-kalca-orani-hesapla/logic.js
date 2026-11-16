// Bel Kalça Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bel = h.pos(v.bel, 'Bel çevresi');
    const kalca = h.pos(v.kalca, 'Kalça çevresi');
    if (bel < 30 || bel > 250) h.err('Bel çevresi 30 ile 250 cm arasında olmalı; değeri santimetre olarak yazdığınızdan emin olun.');
    if (kalca < 40 || kalca > 250) h.err('Kalça çevresi 40 ile 250 cm arasında olmalı; değeri santimetre olarak yazdığınızdan emin olun.');
    const erkek = v.cinsiyet === 'erkek';
    const oran = bel / kalca;
    const orta = erkek ? 0.90 : 0.80;
    const yuksek = erkek ? 1.00 : 0.85;
    const o = oran + 1e-9;
    const durum = o >= yuksek ? 'Yüksek risk' : o >= orta ? 'Orta risk' : 'Düşük risk';
    // Düşük risk bandında kalmak için bel çevresinin altında olması gereken değer
    const sinir = kalca * orta;
    return {
      rows: [
        ['Bel kalça oranı', h.fix(oran, 2)],
        ['Değerlendirme', durum],
        ['Dünya Sağlık Örgütü eşiği', `${erkek ? '0,90' : '0,85'} – ${o >= (erkek ? 0.90 : 0.85) ? 'eşikte ya da üzerinde' : 'eşiğin altında'}`],
        ['Düşük risk sınırı', `${h.fix(orta, 2)} altı`],
        ['Bu kalça ölçüsünde sınır bel çevresi', h.fmt(sinir, 1) + ' cm'],
        ['Vücut tipi eğilimi', o >= yuksek ? 'Elma tipi (karın bölgesinde toplanma)' : o >= orta ? 'Ara tip' : 'Armut tipi ya da dengeli dağılım'],
      ],
      note: erkek
        ? 'Değerlendirme satırı üç kademeli yaygın sınıflamayı kullanır (0,90 altı düşük, 0,90–0,99 orta, 1,00 ve üzeri yüksek). Dünya Sağlık Örgütü ise erkeklerde 0,90 ve üzerini artmış risk eşiği sayar. Sonuç tanı değildir.'
        : 'Değerlendirme satırı üç kademeli yaygın sınıflamayı kullanır (0,80 altı düşük, 0,80–0,84 orta, 0,85 ve üzeri yüksek). Dünya Sağlık Örgütü kadınlarda 0,85 ve üzerini artmış risk eşiği sayar. Sonuç tanı değildir.',
    };
  }
