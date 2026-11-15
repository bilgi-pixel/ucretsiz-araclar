// Newton Metre lb-ft Tork Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Tork değeri');
    const LBFT = 1.3558179483314004;
    const KGFM = 9.80665;
    let nm;
    if (v.birim === 'lbft') nm = x * LBFT;
    else if (v.birim === 'kgfm') nm = x * KGFM;
    else if (v.birim === 'lbin') nm = x * LBFT / 12;
    else nm = x;
    const satirlar = {
      nm: ['Newton metre', h.fmt(nm, 3) + ' N·m'],
      lbft: ['Pound-foot', h.fmt(nm / LBFT, 3) + ' lb-ft'],
      kgfm: ['Kilogram-kuvvet metre', h.fmt(nm / KGFM, 3) + ' kgf·m'],
      lbin: ['Pound-inch', h.fmt(nm / LBFT * 12, 3) + ' lb-in'],
    };
    const sira = v.birim === 'nm' || !satirlar[v.birim] ? ['lbft', 'kgfm', 'lbin', 'nm'] : ['nm', 'lbft', 'kgfm', 'lbin'];
    return {
      rows: sira.map((k) => satirlar[k]),
      note: '1 lb-ft = 1,3558179483 N·m, 1 kgf·m = 9,80665 N·m, 1 lb-ft = 12 lb-in alınır. Sonuçlar üç ondalık basamağa yuvarlanır.',
    };
  }
