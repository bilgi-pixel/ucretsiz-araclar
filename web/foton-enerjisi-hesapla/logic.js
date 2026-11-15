// Foton Enerjisi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hP = 6.62607015e-34; // J·s
    const c = 299792458; // m/s
    const eV = 1.602176634e-19; // J
    const NA = 6.02214076e23;
    const x = h.pos(v.deger, 'Değer');
    let E;
    if (v.tur === 'hz') E = hP * x;
    else if (v.tur === 'ev') E = x * eV;
    else E = hP * c / (x * 1e-9);
    if (!Number.isFinite(E) || !(E > 0)) h.err('Değer hesaplanamayacak kadar büyük ya da küçük; girdiyi kontrol edin.');
    const f = E / hP;
    const lam = c / f; // metre
    const nm = lam * 1e9;
    const bil = (y) => {
      const a = Math.abs(y);
      if (a >= 1e7 || a < 1e-4) {
        const [m, e] = y.toExponential(5).split('e');
        return String(Number(m)).replace('.', ',') + ' × 10^' + Number(e);
      }
      return h.sig(y, 6);
    };
    let bolge;
    if (nm < 0.01) bolge = 'Gama ışınları';
    else if (nm < 10) bolge = 'X ışınları';
    else if (nm < 380) bolge = 'Morötesi';
    else if (nm < 450) bolge = 'Görünür ışık (mor)';
    else if (nm < 495) bolge = 'Görünür ışık (mavi)';
    else if (nm < 570) bolge = 'Görünür ışık (yeşil)';
    else if (nm < 590) bolge = 'Görünür ışık (sarı)';
    else if (nm < 620) bolge = 'Görünür ışık (turuncu)';
    else if (nm <= 750) bolge = 'Görünür ışık (kırmızı)';
    else if (nm < 1e6) bolge = 'Kızılötesi';
    else if (nm < 1e9) bolge = 'Mikrodalga';
    else bolge = 'Radyo dalgaları';
    return {
      rows: [
        ['Foton enerjisi', bil(E / eV) + ' eV'],
        ['Enerji (joule)', bil(E) + ' J'],
        ['Dalga boyu', bil(nm) + ' nm'],
        ['Dalga boyu (metre)', bil(lam) + ' m'],
        ['Frekans', bil(f) + ' Hz'],
        ['Tayf bölgesi', bolge],
        ['1 mol fotonun enerjisi', bil(E * NA / 1000) + ' kJ/mol'],
        ['Foton momentumu', bil(E / c) + ' kg·m/s'],
      ],
      note: 'h = 6,62607015 × 10⁻³⁴ J·s, c = 299 792 458 m/s, 1 eV = 1,602176634 × 10⁻¹⁹ J. Dalga boyu boşluktaki değerdir; tayf bölgelerinin ve renklerin sınırları yaklaşıktır.',
    };
  }
