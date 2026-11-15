// Yürüyüşte Yakılan Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    const sure = h.pos(v.sure, 'Süre');
    if (kilo < 20 || kilo > 300) h.err('Kilo 20 ile 300 kg arasında olmalı.');
    if (sure > 1440) h.err('Süre en fazla 1440 dakika (24 saat) olabilir; değeri dakika olarak yazın.');
    // Yaklaşık MET değerleri (düz, sert zeminde yürüyüş)
    const tablo = { '3.2': 2.8, '4': 3.0, '4.8': 3.5, '5.6': 4.3, '6.4': 5.0, '7.2': 7.0, '8': 8.3 };
    const anahtar = Object.prototype.hasOwnProperty.call(tablo, v.tempo) ? v.tempo : '4.8';
    const met = tablo[anahtar];
    const hiz = Number(anahtar);
    const saat = sure / 60;
    const kcal = met * kilo * saat;
    const net = (met - 1) * kilo * saat;
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
        ['Mesafe', h.fmt(hiz * saat, 2) + ' km'],
        ['Dakika başına', h.fmt(kcal / sure, 2) + ' kcal'],
        ['MET değeri', h.fmt(met, 1)],
      ],
      note: 'Hesap: kalori = MET × kilo × saat. Değerler düz zemin içindir ve ortalama bir tahmindir; yokuş, zemin, yaş ve kondisyon sonucu değiştirir.',
    };
  }
