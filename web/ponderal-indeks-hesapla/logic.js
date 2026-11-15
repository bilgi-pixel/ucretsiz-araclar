// Ponderal İndeks Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kilo = h.pos(v.kilo, 'Ağırlık');
    const boy = h.pos(v.boy, 'Boy');
    const bebek = v.grup === 'bebek';
    if (boy < 3) h.err('Boyu santimetre olarak yazın (örn. 1,75 yerine 175).');
    if (bebek) {
      if (boy < 25 || boy > 70) h.err('Yenidoğan hesabında boy 25 ile 70 cm arasında olmalı.');
      if (kilo < 0.3 || kilo > 8) h.err('Yenidoğan hesabında ağırlık 0,3 ile 8 kg arasında olmalı (kilogram olarak yazın, örn. 3,4).');
    } else {
      if (boy < 60 || boy > 250) h.err('Boy 60 ile 250 cm arasında olmalı.');
      if (kilo < 5 || kilo > 400) h.err('Ağırlık 5 ile 400 kg arasında olmalı.');
    }
    const m = boy / 100;
    const pi = kilo / (m * m * m);
    const vki = kilo / (m * m);
    if (bebek) {
      const pib = pi / 10;
      let yorum;
      if (pib < 2.2 - 1e-9) yorum = 'Düşük (2,2 altı)';
      else if (pib <= 3 + 1e-9) yorum = 'Olağan aralıkta (2,2–3,0)';
      else yorum = 'Yüksek (3,0 üstü)';
      return {
        rows: [
          ['Ponderal indeks', h.fmt(pib, 2) + ' (g/cm³ × 100)'],
          ['kg/m³ karşılığı', h.fmt(pi, 2) + ' kg/m³'],
          ['Genel başvuru aralığına göre', yorum],
          ['Ağırlık (gram)', h.fmt(kilo * 1000, 0) + ' g'],
        ],
        note: 'Yenidoğan formülü: 100 × ağırlık (g) ÷ boy (cm)³. Aralıklar kaynaklara göre değişir; değerlendirmeyi gebelik haftasını da bilen hekim yapar.',
      };
    }
    let yorum;
    if (pi < 11 - 1e-9) yorum = 'Düşük (11 altı)';
    else if (pi <= 15 + 1e-9) yorum = 'Olağan aralıkta (11–15)';
    else yorum = 'Yüksek (15 üstü)';
    return {
      rows: [
        ['Ponderal indeks', h.fmt(pi, 2) + ' kg/m³'],
        ['Vücut kitle indeksi (VKİ)', h.fmt(vki, 2) + ' kg/m²'],
        ['Genel başvuru aralığına göre', yorum],
        ['Bu boyda indeks 11–15 için ağırlık', `${h.fmt(11 * m * m * m, 1)}–${h.fmt(15 * m * m * m, 1)} kg`],
      ],
      note: 'Formül: ağırlık (kg) ÷ boy (m)³. Yetişkin aralığı kaynaklarda yaklaşık 11 ile 14–15 arasında verilir; kas kütlesini ve yağ dağılımını ayırt etmez, tanı koymaz.',
    };
  }
