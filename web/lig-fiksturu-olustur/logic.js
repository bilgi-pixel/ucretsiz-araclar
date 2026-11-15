// Lig Fikstürü Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let takimlar = h.lines(v.takimlar);
    if (takimlar.length < 2) h.err('Fikstür için en az 2 takım gerekir; her satıra bir takım adı yazın.');
    if (takimlar.length > 40) h.err('En çok 40 takım girebilirsiniz.');
    const gorulen = new Set();
    for (const t of takimlar) {
      const anahtar = t.toLocaleLowerCase('tr-TR');
      if (gorulen.has(anahtar)) h.err(`"${t}" adı birden fazla kez yazılmış; her takımın adı farklı olmalı.`);
      gorulen.add(anahtar);
    }
    if (v.kura === 'evet') {
      takimlar = takimlar.slice();
      for (let i = takimlar.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [takimlar[i], takimlar[j]] = [takimlar[j], takimlar[i]];
      }
    }
    const n = takimlar.length;
    const BAY = null;
    let dizi = takimlar.slice();
    if (n % 2 === 1) dizi.push(BAY);
    const m = dizi.length;
    const haftalar = [];
    for (let r = 0; r < m - 1; r++) {
      const maclar = [];
      let bay = '';
      for (let i = 0; i < m / 2; i++) {
        const a = dizi[i], b = dizi[m - 1 - i];
        if (a === BAY) { bay = b; continue; }
        if (b === BAY) { bay = a; continue; }
        const aEvSahibi = i === 0 ? r % 2 === 0 : i % 2 === 1;
        maclar.push(aEvSahibi ? [a, b] : [b, a]);
      }
      haftalar.push({ maclar, bay });
      dizi = [dizi[0], dizi[m - 1], ...dizi.slice(1, m - 1)];
    }
    const cift = v.devre === 'cift';
    const tum = cift ? haftalar.concat(haftalar.map((x) => ({ maclar: x.maclar.map(([e, d]) => [d, e]), bay: x.bay }))) : haftalar;
    const bloklar = tum.map((x, i) => {
      const satirlar = [`${i + 1}. Hafta`, ...x.maclar.map(([e, d]) => `${e} - ${d}`)];
      if (x.bay) satirlar.push(`Bay: ${x.bay}`);
      return satirlar.join('\n');
    });
    const macSayisi = tum.reduce((t, x) => t + x.maclar.length, 0);
    return {
      rows: [
        ['Toplam maç', String(macSayisi)],
        ['Hafta sayısı', String(tum.length)],
        ['Takım sayısı', String(n)],
        ['Haftada oynanan maç', String(Math.floor(n / 2))],
        ['Takım başına maç', String((n - 1) * (cift ? 2 : 1))],
      ],
      text: bloklar.join('\n\n'),
      note: 'Her satırda ilk yazılan takım ev sahibidir.' + (n % 2 === 1 ? ' Takım sayısı tek olduğu için her hafta bir takım bay geçer.' : '') + (cift ? ' İkinci devrede aynı eşleşmeler ev sahibi değiştirilerek tekrarlanır.' : ''),
    };
  }
