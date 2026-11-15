// Kaldıraç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let P, x, F, y; // yük, yük kolu, kuvvet, kuvvet kolu
    if (v.bul !== 'yuk') P = h.pos(v.yuk, 'Yük');
    if (v.bul !== 'yukKolu') x = h.pos(v.yukKolu, 'Yük kolu');
    if (v.bul !== 'kuvvet') F = h.pos(v.kuvvet, 'Kuvvet');
    if (v.bul !== 'kuvvetKolu') y = h.pos(v.kuvvetKolu, 'Kuvvet kolu');
    if (v.bul === 'yuk') P = F * y / x;
    else if (v.bul === 'yukKolu') x = F * y / P;
    else if (v.bul === 'kuvvetKolu') y = P * x / F;
    else F = P * x / y;
    const ma = y / x;
    const satirlar = {
      kuvvet: ['Kuvvet', h.fmt(F, 4) + ' N'],
      yuk: ['Yük', h.fmt(P, 4) + ' N'],
      kuvvetKolu: ['Kuvvet kolu', h.fmt(y, 4) + ' m'],
      yukKolu: ['Yük kolu', h.fmt(x, 4) + ' m'],
    };
    const sira = [v.bul in satirlar ? v.bul : 'kuvvet'];
    for (const k of ['kuvvet', 'yuk', 'kuvvetKolu', 'yukKolu']) if (!sira.includes(k)) sira.push(k);
    let durum;
    if (Math.abs(ma - 1) < 1e-9) durum = 'Kuvvet ve yol kazancı yok (kollar eşit)';
    else if (ma > 1) durum = 'Kuvvetten kazanç, yoldan kayıp';
    else durum = 'Yoldan kazanç, kuvvetten kayıp';
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Mekanik avantaj', h.fmt(ma, 4)],
        ['Moment (her iki yanda)', h.fmt(P * x, 4) + ' N·m'],
        ['Durum', durum],
      ],
      note: 'İdeal kaldıraç varsayılmıştır: çubuğun ağırlığı ve sürtünme ihmal edilir. Mekanik avantaj = kuvvet kolu ÷ yük kolu = yük ÷ kuvvet.',
    };
  }
