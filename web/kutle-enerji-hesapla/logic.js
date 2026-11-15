// Kütle Enerji Eşdeğerliği (E = mc²) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const c = 299792458; // m/s, tam tanım
    const eV = 1.602176634e-19;
    const kb = { kg: 1, g: 1e-3, mg: 1e-6, ug: 1e-9, u: 1.6605390666e-27 };
    const eb = { J: 1, kWh: 3.6e6, MeV: eV * 1e6 };
    const bil = (x) => {
      if (x === 0) return '0';
      const a = Math.abs(x);
      if (a >= 1e7 || a < 1e-4) {
        const [m, e] = x.toExponential(5).split('e');
        return String(Number(m)).replace('.', ',') + ' × 10^' + Number(e);
      }
      return h.sig(x, 6);
    };
    let m, E;
    if (v.hesap === 'enerji') {
      E = h.pos(v.enerji, 'Enerji') * (eb[v.eBirim] || 1);
      m = E / (c * c);
    } else {
      m = h.pos(v.kutle, 'Kütle') * (kb[v.kBirim] || 1);
      E = m * c * c;
    }
    if (!Number.isFinite(E) || !(E > 0) || !(m > 0)) h.err('Değer hesaplanamayacak kadar büyük ya da küçük; girdiyi kontrol edin.');
    const enerjiSatiri = ['Enerji', bil(E) + ' J'];
    const kutleSatiri = ['Kütle', bil(m) + ' kg'];
    return {
      rows: [
        ...(v.hesap === 'enerji' ? [kutleSatiri, enerjiSatiri] : [enerjiSatiri, kutleSatiri]),
        ['Kütle (gram)', bil(m * 1000) + ' g'],
        ['Kilowatt saat', bil(E / 3.6e6) + ' kWh'],
        ['Megaelektronvolt', bil(E / (eV * 1e6)) + ' MeV'],
        ['TNT eşdeğeri', bil(E / 4.184e9) + ' ton'],
      ],
      note: 'c = 299 792 458 m/s (tam tanım). Sonuç, kütlenin tamamının enerjiye dönüştüğü kuramsal durumu gösterir. TNT eşdeğeri 1 ton = 4,184 × 10⁹ J kabulüyle hesaplanır.',
    };
  }
