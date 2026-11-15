// Saat Dakika Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Süre');
    const dk = v.yon === 'saat' ? x * 60 : x;
    const saat = dk / 60;
    const m = Math.round(dk * 1000) / 1000;
    const tamSaat = Math.floor(m / 60);
    const kalan = m - tamSaat * 60;
    const rSaat = ['Saat', h.fmt(saat, 6) + ' saat'];
    const rDk = ['Dakika', h.fmt(dk, 4) + ' dakika'];
    return {
      rows: [
        ...(v.yon === 'saat' ? [rDk, rSaat] : [rSaat, rDk]),
        ['Saat ve dakika', `${h.fmt(tamSaat, 0)} sa ${h.fmt(kalan, 3)} dk`],
        ['Saniye', h.fmt(dk * 60, 2) + ' saniye'],
        ['Gün', h.fmt(dk / 1440, 6) + ' gün'],
      ],
      note: '1 saat = 60 dakika = 3.600 saniye. Ondalık saatin kesir kısmı dakika değildir; dakikayı bulmak için 60 ile çarpılır.',
    };
  }
