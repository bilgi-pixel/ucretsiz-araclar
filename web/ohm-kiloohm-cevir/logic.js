// Ohm Kiloohm Megaohm Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const birimler = {
      mili: [1e-3, 'mΩ', 'Miliohm'],
      ohm: [1, 'Ω', 'Ohm'],
      kohm: [1e3, 'kΩ', 'Kiloohm'],
      mega: [1e6, 'MΩ', 'Megaohm'],
      giga: [1e9, 'GΩ', 'Gigaohm'],
    };
    const x = h.nonneg(v.deger, 'Direnç değeri');
    const k = birimler[v.kaynak] || birimler.ohm;
    const t = birimler[v.hedef] || birimler.kohm;
    const ohm = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(ohm / b[0], 9) + ' ' + b[1];
    // Şema kısa yazımı: ondalık ayracın yerine çarpan harfi konur (4k7, 2M2, 470R).
    let harf = 'R', bol = 1;
    if (ohm >= 1e9) { harf = 'G'; bol = 1e9; } else if (ohm >= 1e6) { harf = 'M'; bol = 1e6; } else if (ohm >= 1e3) { harf = 'k'; bol = 1e3; }
    const s = String(Number((ohm / bol).toPrecision(4)));
    const kisa = /e/i.test(s) ? '—' : (s.includes('.') ? s.replace('.', harf) : s + harf);
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Ohm', yaz(birimler.ohm)],
        ['Kiloohm', yaz(birimler.kohm)],
        ['Megaohm', yaz(birimler.mega)],
        ['Miliohm', yaz(birimler.mili)],
        ['Gigaohm', yaz(birimler.giga)],
        ['Şema kısa yazımı', kisa],
      ],
      note: '1 kΩ = 1.000 Ω, 1 MΩ = 1.000.000 Ω. Kısa yazım dört anlamlı basamağa yuvarlanır; R ohm, k kiloohm, M megaohm anlamına gelir.',
    };
  }
