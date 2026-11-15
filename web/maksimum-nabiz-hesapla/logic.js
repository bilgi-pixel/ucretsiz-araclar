// Maksimum Nabız Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const yas = h.posint(v.yas, 'Yaş');
    if (yas < 5 || yas > 110) h.err('Yaş 5 ile 110 arasında olmalı.');
    const f = {
      fox: 220 - yas,
      tanaka: 208 - 0.7 * yas,
      gellish: 207 - 0.7 * yas,
      gulati: 206 - 0.88 * yas,
      nes: 211 - 0.64 * yas,
    };
    const yuv = (x) => Math.round(x + 1e-9);
    const sec = v.formul || 'tanaka';
    if (!(sec in f)) h.err('Geçerli bir formül seçin.');
    const maks = yuv(f[sec]);
    const b = (a, c) => `${yuv(maks * a)}–${yuv(maks * c)} atım/dk`;
    return {
      rows: [
        ['Maksimum nabız', maks + ' atım/dk'],
        ['Bölge 1 – çok hafif (%50–60)', b(0.5, 0.6)],
        ['Bölge 2 – hafif (%60–70)', b(0.6, 0.7)],
        ['Bölge 3 – orta (%70–80)', b(0.7, 0.8)],
        ['Bölge 4 – zor (%80–90)', b(0.8, 0.9)],
        ['Bölge 5 – maksimum (%90–100)', b(0.9, 1)],
        ['Fox (220 − yaş)', yuv(f.fox) + ' atım/dk'],
        ['Tanaka', yuv(f.tanaka) + ' atım/dk'],
        ['Gellish', yuv(f.gellish) + ' atım/dk'],
        ['Gulati (kadınlar)', yuv(f.gulati) + ' atım/dk'],
        ['Nes', yuv(f.nes) + ' atım/dk'],
      ],
      note: 'Formüller nüfus ortalamasını verir; kişisel maksimum nabız bu değerden 10–12 atım kadar farklı olabilir.',
    };
  }
