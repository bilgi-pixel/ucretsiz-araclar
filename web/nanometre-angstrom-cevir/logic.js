// Nanometre Angström Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    // Taban birim pikometre: tüm çarpanlar tam sayıdır.
    const birimler = {
      pm: [1, 'pm'],
      a: [100, 'Å'],
      nm: [1000, 'nm'],
      um: [1e6, 'µm'],
    };
    const x = h.nonneg(v.deger, 'Uzunluk değeri');
    const k = birimler[v.kaynak] || birimler.nm;
    const t = birimler[v.hedef] || birimler.a;
    const pm = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(pm / b[0], 9) + ' ' + b[1];
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Nanometre', yaz(birimler.nm)],
        ['Angström', yaz(birimler.a)],
        ['Pikometre', yaz(birimler.pm)],
        ['Mikrometre', yaz(birimler.um)],
        ['Metre', h.sig(pm * 1e-12, 9) + ' m'],
      ],
      note: '1 Å = 0,1 nm = 100 pm = 10⁻¹⁰ m. Angström SI birimi değildir ama metreyle ilişkisi tam tanımlıdır; çeviride yuvarlama yoktur.',
    };
  }
