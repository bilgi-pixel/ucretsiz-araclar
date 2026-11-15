// Isı İndeksi (Nem Etkisi) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const g = h.num(v.sicaklik, 'Hava sıcaklığı');
    const R = h.num(v.nem, 'Bağıl nem');
    if (R < 0 || R > 100) h.err('Bağıl nem 0 ile 100 arasında olmalı.');
    const T = v.birim === 'f' ? g : g * 1.8 + 32;
    if (T < 68 - 1e-9) h.err('Isı indeksi 20 °C (68 °F) ve üzerindeki sıcaklıklar için anlamlıdır. Soğuk havalar için rüzgâr etkili hissedilen sıcaklık aracını kullanın.');
    if (T > 140) h.err('Hava sıcaklığı 60 °C (140 °F) değerini aşamaz; değeri ve birimi kontrol edin.');
    const basit = 0.5 * (T + 61 + (T - 68) * 1.2 + R * 0.094);
    let hi = basit;
    if ((basit + T) / 2 >= 80) {
      hi = -42.379 + 2.04901523 * T + 10.14333127 * R - 0.22475541 * T * R
        - 6.83783e-3 * T * T - 5.481717e-2 * R * R + 1.22874e-3 * T * T * R
        + 8.5282e-4 * T * R * R - 1.99e-6 * T * T * R * R;
      if (R < 13 && T >= 80 && T <= 112) hi -= ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
      if (R > 85 && T >= 80 && T <= 87) hi += ((R - 85) / 10) * ((87 - T) / 5);
    }
    const hiC = (hi - 32) / 1.8;
    const tC = (T - 32) / 1.8;
    let duzey;
    if (hi < 80) duzey = 'Belirgin ısı stresi beklenmez';
    else if (hi < 90) duzey = 'Dikkat: uzun süreli etkinlikte yorgunluk olabilir';
    else if (hi < 103) duzey = 'Aşırı dikkat: sıcak krampı ve ısı bitkinliği olası';
    else if (hi < 125) duzey = 'Tehlike: ısı bitkinliği muhtemel, sıcak çarpması olası';
    else duzey = 'Aşırı tehlike: sıcak çarpması riski çok yüksek';
    return {
      rows: [
        ['Isı indeksi', h.fmt(hiC, 1) + ' °C'],
        ['Isı indeksi (Fahrenhayt)', h.fmt(hi, 1) + ' °F'],
        ['Termometre ile fark', h.fmt(hiC - tC, 1) + ' °C'],
        ['Risk düzeyi', duzey],
      ],
      note: 'Değer gölge ve hafif rüzgâr içindir; doğrudan güneş altında hissedilen sıcaklık yaklaşık 8 °C\'ye kadar daha yüksek olabilir.',
    };
  }
