// Çiy Noktası Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const T = h.num(v.sicaklik, 'Hava sıcaklığı');
    const R = h.num(v.nem, 'Bağıl nem');
    if (T < -45 || T > 60) h.err('Hava sıcaklığı −45 °C ile 60 °C arasında olmalı; formül bu aralıkta geçerlidir.');
    if (!(R > 0) || R > 100) h.err('Bağıl nem 0\'dan büyük ve en fazla 100 olmalı (örn. 55).');
    const b = 17.62;
    const c = 243.12;
    const gama = Math.log(R / 100) + (b * T) / (c + T);
    const td = (c * gama) / (b - gama);
    const es = 6.112 * Math.exp((b * T) / (c + T));
    const e = (es * R) / 100;
    const mutlak = (216.7 * e) / (T + 273.15);
    let yorum;
    if (td < 0) yorum = 'Çok kuru hava; yoğuşma kırağı (don) olarak görülür';
    else if (td < 10) yorum = 'Kuru ve ferah';
    else if (td < 16) yorum = 'Rahat';
    else if (td < 18) yorum = 'Hafif nemli';
    else if (td < 21) yorum = 'Nemli; çoğu kişi için rahatsız edici';
    else if (td < 24) yorum = 'Bunaltıcı';
    else yorum = 'Çok bunaltıcı';
    return {
      rows: [
        ['Çiy noktası', h.fmt(td, 1) + ' °C'],
        ['Sıcaklık ile çiy noktası farkı', h.fmt(T - td, 1) + ' °C'],
        ['Buhar basıncı', h.fmt(e, 2) + ' hPa'],
        ['Doymuş buhar basıncı', h.fmt(es, 2) + ' hPa'],
        ['Mutlak nem', h.fmt(mutlak, 1) + ' g/m³'],
        ['Hava hissi', yorum],
      ],
      note: 'Sıcaklığı çiy noktasının altında olan her yüzeyde (cam, soğuk duvar, boru) yoğuşma başlar. Hesap su üzerindeki doyma için Magnus formülünü kullanır.',
    };
  }
