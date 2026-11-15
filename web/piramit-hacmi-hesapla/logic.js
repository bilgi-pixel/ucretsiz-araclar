// Piramit Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.kenarA, 'Taban kenarı (a)');
    const kare = String(v.kenarB ?? '').trim() === '';
    const b2 = kare ? a : h.pos(v.kenarB, 'Diğer taban kenarı (b)');
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const taban = a * b2;
    const hacim = taban * yuk / 3;
    // a kenarına oturan yan yüzün yüksekliği, tepe izdüşümünün o kenara uzaklığı b/2 olduğundan √(h² + (b/2)²)
    const yanA = Math.sqrt(yuk * yuk + (b2 / 2) * (b2 / 2));
    const yanB = Math.sqrt(yuk * yuk + (a / 2) * (a / 2));
    const yanal = a * yanA + b2 * yanB;
    const rows = [
      ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
      ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
      ['Taban alanı', `${h.fmt(taban, 4)} ${b}²`],
      ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
      ['Toplam yüzey alanı', `${h.fmt(yanal + taban, 4)} ${b}²`],
    ];
    if (Math.abs(a - b2) < 1e-12) rows.push(['Yan yüz yüksekliği', `${h.fmt(yanA, 4)} ${b}`]);
    rows.push(['Aynı ölçülerdeki prizmanın hacmi', `${h.fmt(taban * yuk, 4)} ${b}³`]);
    return {
      rows,
      note: 'Tepe noktasının taban merkezinin tam üstünde olduğu dik piramit varsayılır. Hacim eğik piramitte de aynıdır; yanal alan yalnızca dik piramit için geçerlidir.',
    };
  }
