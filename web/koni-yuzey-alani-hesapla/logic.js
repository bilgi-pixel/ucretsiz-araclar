// Koni Yüzey Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const r = h.pos(v.yaricap, 'Taban yarıçapı');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const m2Kat = b === 'm' ? 1 : b === 'mm' ? 1e-6 : 1e-4;
    let l, yuk;
    if (v.tur === 'l') {
      l = h.pos(v.ikinci, 'Ana doğru');
      if (l <= r) h.err('Ana doğru taban yarıçapından büyük olmalı; aksi halde koni oluşmaz. Değerleri kontrol edin.');
      yuk = Math.sqrt(l * l - r * r);
    } else {
      yuk = h.pos(v.ikinci, 'Yükseklik');
      l = Math.sqrt(r * r + yuk * yuk);
    }
    const yanal = Math.PI * r * l;
    const taban = Math.PI * r * r;
    return {
      rows: [
        ['Toplam yüzey alanı', `${h.fmt(yanal + taban, 4)} ${b}²`],
        ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
        ['Taban alanı', `${h.fmt(taban, 4)} ${b}²`],
        ['Metrekare karşılığı (toplam)', `${h.fmt((yanal + taban) * m2Kat, 4)} m²`],
        ['Ana doğru', `${h.fmt(l, 4)} ${b}`],
        ['Yükseklik', `${h.fmt(yuk, 4)} ${b}`],
        ['Açınım merkez açısı', `${h.fmt(360 * r / l, 4)}°`],
      ],
      note: 'Dik dairesel koni varsayılır. Açınım merkez açısı, yan yüzey düzleme açıldığında oluşan daire diliminin açısıdır; dilimin yarıçapı ana doğruya eşittir.',
    };
  }
