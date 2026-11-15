// Koni Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ad = v.olcu === 'd' ? 'Taban çapı' : 'Taban yarıçapı';
    const x = h.pos(v.deger, ad);
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const r = v.olcu === 'd' ? x / 2 : x;
    const taban = Math.PI * r * r;
    const hacim = taban * yuk / 3;
    const anaDogru = Math.sqrt(r * r + yuk * yuk);
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Taban alanı', `${h.fmt(taban, 4)} ${b}²`],
        ['Ana doğru uzunluğu', `${h.fmt(anaDogru, 4)} ${b}`],
        ['Aynı ölçülerdeki silindirin hacmi', `${h.fmt(taban * yuk, 4)} ${b}³`],
      ],
      note: 'Yükseklik, tepe noktasından taban düzlemine inen dik uzaklıktır. Koni hacmi aynı taban ve yükseklikteki silindirin üçte biridir.',
    };
  }
