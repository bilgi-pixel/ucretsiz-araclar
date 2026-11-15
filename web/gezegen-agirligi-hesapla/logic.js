// Diğer Gezegenlerdeki Ağırlık Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const G0 = 9.80665;
    const T = [
      ['merkur', 'Merkür', 3.7], ['venus', 'Venüs', 8.87], ['dunya', 'Dünya', G0], ['ay', 'Ay', 1.62],
      ['mars', 'Mars', 3.71], ['jupiter', 'Jüpiter', 24.79], ['saturn', 'Satürn', 10.44], ['uranus', 'Uranüs', 8.87],
      ['neptun', 'Neptün', 11.15], ['pluton', 'Plüton', 0.62], ['gunes', 'Güneş', 274],
    ];
    const m = h.pos(v.kutle, 'Kütle');
    const sec = T.find((x) => x[0] === v.cisim) || T[3];
    const W = m * sec[2];
    const rows = [
      ['Seçilen gök cismindeki ağırlık', h.fmt(W, 2) + ' N'],
      ['Tartının göstereceği değer', h.fmt(W / G0, 2) + ' kg'],
      ['Dünya\'daki ağırlık', h.fmt(m * G0, 2) + ' N'],
      ['Dünya\'ya göre oran', h.fmt(sec[2] / G0, 3) + ' kat'],
      ['Yüzey çekim ivmesi', h.fmt(sec[2], 2) + ' m/s²'],
    ];
    for (const x of T) rows.push([x[1], h.fmt(m * x[2], 1) + ' N (tartıda ' + h.fmt((m * x[2]) / G0, 1) + ' kg)']);
    return { rows, note: 'Kütleniz her yerde aynıdır; değişen yalnızca ağırlık kuvvetidir. "Tartıda" değeri, Dünya\'ya göre ayarlanmış bir banyo tartısının o gök cisminde göstereceği sayıdır. Gaz devleri ve Güneş için değerler katı bir yüzeyi değil, kabul edilen referans seviyesini temsil eder.' };
  }
