// MET Değeriyle Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const met = h.pos(v.met, 'MET değeri');
    const kg = h.pos(v.kilo, 'Vücut ağırlığı');
    const dk = h.pos(v.sure, 'Süre');
    if (met < 0.9 || met > 25) h.err('MET değeri 0,9 ile 25 arasında olmalı. Uyku yaklaşık 0,95, en yoğun sporlar 20 civarındadır.');
    if (kg < 20 || kg > 250) h.err('Vücut ağırlığı 20 ile 250 kg arasında olmalı.');
    if (dk > 1440) h.err('Süre 1.440 dakikadan (24 saat) uzun olamaz.');
    const saat = dk / 60;
    const kcal = met * kg * saat;
    const net = Math.max(0, (met - 1) * kg * saat);
    let sinif;
    if (met < 1.5 - 1e-9) sinif = 'Sedanter (hareketsiz)';
    else if (met < 3 - 1e-9) sinif = 'Hafif şiddetli';
    else if (met < 6 - 1e-9) sinif = 'Orta şiddetli';
    else sinif = 'Yüksek şiddetli';
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
        ['Dakika başına', h.fmt(kcal / dk, 2) + ' kcal'],
        ['Saat başına', h.fmt(met * kg, 0) + ' kcal'],
        ['Yoğunluk sınıfı', sinif],
        ['MET-dakika', h.fmt(met * dk, 0)],
        ['Kilojul karşılığı', h.fmt(kcal * 4.184, 0) + ' kJ'],
      ],
      note: '1 MET = kilogram başına saatte 1 kcal kabul edilmiştir. Kişisel dinlenme metabolizması bu ortalamadan farklı olabilir.',
    };
  }
