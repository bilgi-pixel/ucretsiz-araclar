// Merdiven Çıkmada Yakılan Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    const sure = h.pos(v.sure, 'Süre');
    if (kilo < 20 || kilo > 300) h.err('Kilo 20 ile 300 kg arasında olmalı.');
    if (sure > 600) h.err('Süre 600 dakikadan uzun olamaz; süreyi dakika olarak yazın.');
    const tablo = { yavas: 4.0, hizli: 8.8, inis: 3.5 };
    const met = tablo[v.tempo] || tablo.yavas;
    const saat = sure / 60;
    const kcal = met * kilo * saat;
    const net = (met - 1) * kilo * saat;
    const rows = [
      ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
      ['Dakika başına', h.fmt(kcal / sure, 1) + ' kcal/dk'],
      ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
      ['Kullanılan MET değeri', h.fmt(met, 1)],
    ];
    if (String(v.basamak ?? '').trim() !== '') {
      const basamak = h.posint(v.basamak, 'Basamak sayısı');
      const cm = h.pos(v.yukseklik, 'Basamak yüksekliği');
      if (cm < 5 || cm > 40) h.err('Basamak yüksekliği 5 ile 40 cm arasında olmalı.');
      if (basamak > 100000) h.err('Basamak sayısı 100.000\'den büyük olamaz.');
      const metre = basamak * cm / 100;
      const joule = kilo * 9.80665 * metre;
      rows.push([v.tempo === 'inis' ? 'İnilen yükseklik' : 'Tırmanılan yükseklik', h.fmt(metre, 1) + ' m']);
      rows.push(['Yaklaşık kat sayısı', h.fmt(metre / 3, 1) + ' kat']);
      rows.push(['Yerçekimine karşı iş', `${h.fmt(joule / 1000, 2)} kJ (${h.fmt(joule / 4184, 1)} kcal)`]);
      rows.push(['Tempo', h.fmt(basamak / sure, 0) + ' basamak/dk']);
      rows.push(['Basamak başına kalori', h.fmt(kcal / basamak, 2) + ' kcal']);
    }
    return {
      rows,
      note: 'Kalori, MET × kilo × süre formülüyle tahmin edilir. Bir kat yaklaşık 3 metre kabul edilmiştir. Mekanik iş, vücudun harcadığı toplam enerjinin yalnızca küçük bir bölümüdür.',
    };
  }
