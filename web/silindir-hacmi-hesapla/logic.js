// Silindir Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ad = v.olcu === 'd' ? 'Çap' : 'Yarıçap';
    const x = h.pos(v.deger, ad);
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const r = v.olcu === 'd' ? x / 2 : x;
    const taban = Math.PI * r * r;
    const hacim = taban * yuk;
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Taban alanı', `${h.fmt(taban, 4)} ${b}²`],
        ['Yarıçap', `${h.fmt(r, 4)} ${b}`],
      ],
      note: 'Hesap dik dairesel silindir içindir; π değeri tam duyarlıkla alınır ve sonuçlar dört ondalık basamağa yuvarlanır.',
    };
  }
