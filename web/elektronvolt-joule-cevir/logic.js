// Elektronvolt Joule Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const E = 1.602176634e-19; // 1 eV kaç joule (tam)
    const carpan = { '1': 1, '1e3': 1e3, '1e6': 1e6, '1e9': 1e9 }[v.onek] || 1;
    const ev = v.yon === 'j' ? x / E : x * carpan;
    const j = v.yon === 'j' ? x : ev * E;
    const jRow = ['Joule', h.sig(j, 10) + ' J'];
    const evRow = ['Elektronvolt', h.sig(ev, 10) + ' eV'];
    return {
      rows: [
        ...(v.yon === 'j' ? [evRow, jRow] : [jRow, evRow]),
        ['Kiloelektronvolt', h.sig(ev / 1e3, 10) + ' keV'],
        ['Megaelektronvolt', h.sig(ev / 1e6, 10) + ' MeV'],
      ],
      note: '1 eV = 1,602176634 × 10^-19 J (tam değer). Sonuçlar on anlamlı basamağa yuvarlanır; "× 10^n" bilimsel gösterimdir.',
    };
  }
