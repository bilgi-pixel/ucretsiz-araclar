// Isıl Genleşme Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tablo = { celik: 12, aluminyum: 23, bakir: 17, pirinc: 19, demir: 12, cam: 9, beton: 12, kursun: 29, gumus: 19, altin: 14 };
    const alfa6 = v.malzeme === 'ozel' ? h.pos(v.katsayi, 'Özel boyca genleşme katsayısı') : tablo[v.malzeme];
    if (!alfa6) h.err('Listeden bir malzeme seçin.');
    const ilk = h.pos(v.ilk, 'İlk boyut');
    const t1 = h.num(v.t1, 'İlk sıcaklık');
    const t2 = h.num(v.t2, 'Son sıcaklık');
    if (t1 < -273.15 || t2 < -273.15) h.err('Sıcaklık mutlak sıfırın (−273,15 °C) altında olamaz.');
    const kat = v.tur === 'hacim' ? 3 : v.tur === 'yuzey' ? 2 : 1;
    const birim = v.tur === 'hacim' ? 'm³' : v.tur === 'yuzey' ? 'm²' : 'm';
    const ad = v.tur === 'hacim' ? 'Hacim' : v.tur === 'yuzey' ? 'Yüzey' : 'Boy';
    const dT = t2 - t1;
    const delta = kat * alfa6 * 1e-6 * ilk * dT;
    const rows = [
      [ad + ' değişimi', h.sig(delta, 6) + ' ' + birim],
      ['Son ' + ad.toLowerCase(), h.sig(ilk + delta, 9) + ' ' + birim],
    ];
    if (v.tur === 'boy' || !v.tur) rows.push(['Boy değişimi (mm)', h.sig(delta * 1000, 6) + ' mm']);
    rows.push(['Sıcaklık farkı', h.fmt(dT, 2) + ' °C']);
    rows.push(['Bağıl değişim', '%' + h.sig(kat * alfa6 * 1e-6 * dT * 100, 4)]);
    rows.push(['Kullanılan katsayı', h.fmt(kat * alfa6, 3) + ' × 10⁻⁶ 1/°C']);
    return {
      rows,
      note: (dT < 0 ? 'Sıcaklık düştüğü için değişim negatiftir; cisim büzülür. ' : '') + 'Yüzeyce katsayı 2α, hacimce katsayı 3α alınmıştır. Katsayılar tipik ders kitabı değerleridir.',
    };
  }
