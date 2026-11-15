// Elektrikli Araç Menzil Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kap = h.pos(v.kapasite, 'Kullanılabilir batarya kapasitesi');
    const tuk = h.pos(v.tuketim, 'Ortalama tüketim');
    const sarj = h.opt(v.sarj, 100, 'Mevcut şarj');
    const rez = h.opt(v.rezerv, 0, 'Varışta kalacak rezerv');
    const ek = h.opt(v.ek, 0, 'Ek tüketim payı');
    if (kap > 1000) h.err('"Kullanılabilir batarya kapasitesi" kWh olarak girilmeli; değer çok yüksek görünüyor.');
    if (tuk > 200) h.err('"Ortalama tüketim" 100 km için kWh olarak girilmeli; Wh/km değerini 10\'a bölerek yazın.');
    if (sarj <= 0 || sarj > 100) h.err('"Mevcut şarj" 0 ile 100 arasında olmalı.');
    if (rez < 0 || rez >= 100) h.err('"Varışta kalacak rezerv" 0 ile 100 arasında olmalı.');
    if (rez >= sarj) h.err('Rezerv, mevcut şarjdan küçük olmalı; aksi halde kullanılabilecek enerji kalmaz.');
    if (ek < -50 || ek > 300) h.err('"Ek tüketim payı" −50 ile 300 arasında olmalı.');
    const etkin = tuk * (1 + ek / 100);
    const enerji = kap * (sarj - rez) / 100;
    const menzil = enerji / etkin * 100;
    return {
      rows: [
        ['Tahmini menzil', h.fmt(menzil, 1) + ' km'],
        ['Kullanılabilecek enerji', h.fmt(enerji, 2) + ' kWh'],
        ['Etkin tüketim', h.fmt(etkin, 2) + ' kWh/100 km'],
        ['Tam şarjla menzil (%100 → %0)', h.fmt(kap / etkin * 100, 1) + ' km'],
        ['Her %1 şarj ile gidilen yol', h.fmt(kap / etkin, 2) + ' km'],
        ['1 kWh ile gidilen yol', h.fmt(100 / etkin, 2) + ' km'],
      ],
      note: 'Menzil = kullanılabilecek enerji ÷ tüketim × 100. Gerçek menzil hıza, sıcaklığa, eğime, lastiklere ve batarya yaşına göre değişir; sonuç tahmindir.',
    };
  }
