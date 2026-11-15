// Karışım Derişimi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const yuzde = v.tur !== 'molarite';
    const bos = (s) => String(s ?? '').trim() === '';
    const parca = [];
    const ekle = (c, m, no) => {
      const cc = h.nonneg(c, `${no}. çözeltinin derişimi`);
      const mm = h.pos(m, `${no}. çözeltinin miktarı`);
      if (yuzde && cc > 100) h.err(`${no}. çözeltinin derişimi %100'den büyük olamaz.`);
      parca.push([cc, mm]);
    };
    ekle(v.c1, v.m1, 1);
    ekle(v.c2, v.m2, 2);
    if (!bos(v.c3) || !bos(v.m3)) {
      if (bos(v.c3) || bos(v.m3)) h.err('3. çözelti için derişim ve miktarı birlikte yazın ya da ikisini de boş bırakın.');
      ekle(v.c3, v.m3, 3);
    }
    const toplam = parca.reduce((a, [, m]) => a + m, 0);
    const carpim = parca.reduce((a, [c, m]) => a + c * m, 0);
    const son = carpim / toplam;
    const enK = Math.min(...parca.map(([c]) => c));
    const enB = Math.max(...parca.map(([c]) => c));
    const rows = yuzde
      ? [
        ['Karışımın derişimi', '%' + h.fmt(son, 4)],
        ['Toplam miktar', h.fmt(toplam, 4) + ' g'],
        ['Toplam çözünen', h.fmt(carpim / 100, 4) + ' g'],
        ['Toplam çözücü', h.fmt(toplam - carpim / 100, 4) + ' g'],
      ]
      : [
        ['Karışımın derişimi', h.fmt(son, 4) + ' M'],
        ['Toplam miktar', h.fmt(toplam, 4) + ' mL'],
        ['Toplam çözünen', h.fmt(carpim / 1000, 6) + ' mol'],
      ];
    rows.push(['Derişim aralığı', yuzde ? `%${h.fmt(enK, 4)} – %${h.fmt(enB, 4)}` : `${h.fmt(enK, 4)} M – ${h.fmt(enB, 4)} M`]);
    return {
      rows,
      note: yuzde
        ? 'Kütleler toplanabilir olduğundan sonuç kesindir. Çözeltilerin aynı çözüneni içerdiği ve aralarında tepkime olmadığı varsayılır.'
        : 'Hacimlerin toplanabildiği (karışınca hacim değişmediği) ve çözeltilerin aynı çözüneni içerdiği varsayılır.',
    };
  }
