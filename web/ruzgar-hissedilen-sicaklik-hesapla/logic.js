// Hissedilen Sıcaklık (Rüzgâr Etkisi) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const T = h.num(v.sicaklik, 'Hava sıcaklığı');
    const r = h.nonneg(v.ruzgar, 'Rüzgâr hızı');
    const kat = v.birim === 'ms' ? 3.6 : v.birim === 'knot' ? 1.852 : 1;
    const V = r * kat;
    if (T > 10) h.err('Rüzgâr soğutması formülü 10 °C ve altındaki sıcaklıklar için tanımlıdır. Sıcak havalar için ısı indeksi aracını kullanın.');
    if (T < -60) h.err('Hava sıcaklığı −60 °C\'den düşük olamaz; değeri kontrol edin.');
    if (V > 200) h.err('Rüzgâr hızı 200 km/sa değerini aşamaz; birimi kontrol edin.');
    const gecerli = V >= 4.8 - 1e-9;
    const p = Math.pow(V, 0.16);
    const wc = gecerli ? 13.12 + 0.6215 * T - 11.37 * p + 0.3965 * T * p : T;
    const his = Math.min(wc, T);
    let risk;
    if (his > 0) risk = 'Donma riski yok; uygun giyimle rahatsızlık azalır';
    else if (his > -10) risk = 'Düşük: rahatsızlık artar, kat kat giyinin';
    else if (his > -28) risk = 'Orta: uzun süre açıkta kalındığında hipotermi ve donma riski';
    else if (his > -40) risk = 'Yüksek: açıktaki cilt yaklaşık 10-30 dakikada donabilir';
    else if (his > -48) risk = 'Çok yüksek: açıktaki cilt yaklaşık 5-10 dakikada donabilir';
    else if (his > -55) risk = 'Şiddetli: açıktaki cilt yaklaşık 2-5 dakikada donabilir';
    else risk = 'Aşırı: açıktaki cilt 2 dakikadan kısa sürede donabilir';
    return {
      rows: [
        ['Hissedilen sıcaklık', h.fmt(his, 1) + ' °C'],
        ['Termometre ile fark', h.fmt(his - T, 1) + ' °C'],
        ['Hissedilen sıcaklık (Fahrenhayt)', h.fmt(his * 9 / 5 + 32, 1) + ' °F'],
        ['Rüzgâr hızı', `${h.fmt(V, 1)} km/sa (${h.fmt(V / 3.6, 1)} m/sn)`],
        ['Risk düzeyi', risk],
      ],
      note: gecerli
        ? 'Formül, 10 m yükseklikte ölçülen rüzgâr hızı ve gölgede kuru cilt için geçerlidir; güneş, ıslaklık ve nem etkisini içermez.'
        : 'Rüzgâr hızı 4,8 km/sa değerinin altında olduğunda rüzgâr soğutması hesaplanmaz; hissedilen sıcaklık hava sıcaklığına eşit alınmıştır.',
    };
  }
