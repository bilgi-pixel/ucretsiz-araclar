// Kesik Koni Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.buyuk, 'Büyük yarıçap');
    const y = h.nonneg(v.kucuk, 'Küçük yarıçap');
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const R = Math.max(x, y);
    const r = Math.min(x, y);
    if (!(R > 0)) h.err('Yarıçaplardan en az biri sıfırdan büyük olmalı.');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const hacim = Math.PI * yuk * (R * R + R * r + r * r) / 3;
    const l = Math.sqrt((R - r) * (R - r) + yuk * yuk);
    const yanal = Math.PI * (R + r) * l;
    const tabanlar = Math.PI * (R * R + r * r);
    const tur = r === 0 ? 'Küçük yarıçap sıfır olduğu için cisim tam konidir.' : R === r ? 'İki yarıçap eşit olduğu için cisim silindirdir.' : 'Yükseklik iki taban arasındaki dik uzaklıktır.';
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Ana doğru (yan kenar)', `${h.fmt(l, 4)} ${b}`],
        ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
        ['Toplam yüzey alanı', `${h.fmt(yanal + tabanlar, 4)} ${b}²`],
      ],
      note: tur + ' Kap kapasitesi için iç ölçüleri kullanın.',
    };
  }
