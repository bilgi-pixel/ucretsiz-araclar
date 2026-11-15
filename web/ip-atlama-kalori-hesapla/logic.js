// İp Atlamada Yakılan Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    const sure = h.pos(v.sure, 'Atlama süresi');
    if (kilo < 20 || kilo > 300) h.err('Kilo 20 ile 300 kg arasında olmalı.');
    if (sure > 300) h.err('Atlama süresi 300 dakikadan uzun olamaz; süreyi dakika olarak yazın.');
    const tablo = { yavas: [8.8, 80], orta: [11.8, 110], hizli: [12.3, 140] };
    const [met, atlamaDk] = tablo[v.tempo] || tablo.orta;
    const saat = sure / 60;
    const kcal = met * kilo * saat;
    const net = (met - 1) * kilo * saat;
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Dakika başına', h.fmt(kcal / sure, 1) + ' kcal/dk'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
        ['Yaklaşık atlama sayısı', h.fmt(atlamaDk * sure, 0) + ' atlama'],
        ['Kullanılan MET değeri', h.fmt(met, 1)],
        ['Yağ eşdeğeri (kuramsal)', h.fmt(kcal / 7700 * 1000, 1) + ' g'],
      ],
      note: `Atlama sayısı dakikada ortalama ${atlamaDk} atlama varsayımıyla tahmin edilir. Teknik, ip türü ve dinlenme araları gerçek harcamayı değiştirir.`,
    };
  }
