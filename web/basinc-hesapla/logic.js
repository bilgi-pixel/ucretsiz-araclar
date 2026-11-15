// Basınç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kat = v.alanBirim === 'cm2' ? 1e-4 : 1;
    let p, f, a;
    if (v.bul === 'f') {
      p = h.nonneg(v.basinc, 'Basınç');
      a = h.pos(v.alan, 'Yüzey alanı') * kat;
      f = p * a;
    } else if (v.bul === 'a') {
      f = h.pos(v.kuvvet, 'Kuvvet');
      p = h.pos(v.basinc, 'Basınç');
      a = f / p;
    } else {
      f = h.nonneg(v.kuvvet, 'Kuvvet');
      a = h.pos(v.alan, 'Yüzey alanı') * kat;
      p = f / a;
    }
    const pSatir = ['Basınç', h.fmt(p, 4) + ' Pa'];
    const fSatir = ['Kuvvet', h.fmt(f, 4) + ' N'];
    const aSatir = ['Yüzey alanı', h.sig(a, 6) + ' m²'];
    const bas = v.bul === 'f' ? [fSatir, pSatir, aSatir] : v.bul === 'a' ? [aSatir, pSatir, fSatir] : [pSatir, fSatir, aSatir];
    return {
      rows: [
        ...bas,
        ['Yüzey alanı (cm²)', h.sig(a * 1e4, 6) + ' cm²'],
        ['Basınç (kPa)', h.fmt(p / 1000, 6) + ' kPa'],
        ['Basınç (bar)', h.fmt(p / 1e5, 6) + ' bar'],
        ['Basınç (atm)', h.fmt(p / 101325, 6) + ' atm'],
      ],
      note: '1 Pa = 1 N/m²; 1 bar = 100.000 Pa; 1 atm = 101.325 Pa. Kuvvetin yüzeye dik ve düzgün dağıldığı varsayılır.',
    };
  }
