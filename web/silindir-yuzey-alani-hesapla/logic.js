// Silindir Yüzey Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ad = v.olcu === 'd' ? 'Çap' : 'Yarıçap';
    const x = h.pos(v.deger, ad);
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const m2Kat = b === 'm' ? 1 : b === 'mm' ? 1e-6 : 1e-4;
    const r = v.olcu === 'd' ? x / 2 : x;
    const taban = Math.PI * r * r;
    const cevre = 2 * Math.PI * r;
    const yanal = cevre * yuk;
    const tabanSayisi = v.tur === 'yanal' ? 0 : v.tur === 'acik' ? 1 : 2;
    const alan = yanal + tabanSayisi * taban;
    return {
      rows: [
        ['Yüzey alanı', `${h.fmt(alan, 4)} ${b}²`],
        ['Metrekare karşılığı', `${h.fmt(alan * m2Kat, 4)} m²`],
        ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
        ['Bir taban alanı', `${h.fmt(taban, 4)} ${b}²`],
        ['Taban çevresi', `${h.fmt(cevre, 4)} ${b}`],
        ['Hacim', `${h.fmt(taban * yuk, 4)} ${b}³`],
      ],
      note: tabanSayisi === 2 ? 'Yüzey alanı yan yüzey ile iki tabanın toplamıdır.' : tabanSayisi === 1 ? 'Yüzey alanı yan yüzey ile tek tabanın toplamıdır (üstü açık kap).' : 'Yüzey alanı yalnız yan yüzeydir; tabanlar sayılmamıştır.',
    };
  }
