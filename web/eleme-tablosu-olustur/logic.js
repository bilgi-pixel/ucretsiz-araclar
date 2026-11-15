// Eleme Turnuvası Tablosu Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let adlar = h.lines(v.katilimcilar);
    if (adlar.length < 2) h.err('Eleme tablosu için en az 2 katılımcı gerekir; her satıra bir ad yazın.');
    if (adlar.length > 64) h.err('En çok 64 katılımcı girebilirsiniz.');
    const gorulen = new Set();
    for (const t of adlar) {
      const anahtar = t.toLocaleLowerCase('tr-TR');
      if (gorulen.has(anahtar)) h.err(`"${t}" adı birden fazla kez yazılmış; her katılımcının adı farklı olmalı.`);
      gorulen.add(anahtar);
    }
    if (v.yerlesim === 'kura') {
      adlar = adlar.slice();
      for (let i = adlar.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [adlar[i], adlar[j]] = [adlar[j], adlar[i]];
      }
    }
    const n = adlar.length;
    let boyut = 2;
    while (boyut < n) boyut *= 2;
    let sira = [1, 2];
    while (sira.length < boyut) {
      const yeni = sira.length * 2;
      sira = sira.flatMap((s) => [s, yeni + 1 - s]);
    }
    const turAdi = (yuva) => ({ 2: 'Final', 4: 'Yarı final', 8: 'Çeyrek final', 16: 'Son 16', 32: 'Son 32', 64: 'Son 64' })[yuva];
    let mevcut = sira.map((s) => (s <= n ? adlar[s - 1] : null));
    let macNo = 0, tur = 0, ilkTurMac = 0;
    const bloklar = [];
    while (mevcut.length > 1) {
      tur++;
      const satirlar = [`${tur}. Tur (${turAdi(mevcut.length)})`];
      const sonraki = [];
      const baylar = [];
      for (let i = 0; i < mevcut.length; i += 2) {
        const a = mevcut[i], b = mevcut[i + 1];
        if (a !== null && b !== null) {
          macNo++;
          satirlar.push(`Maç ${macNo}: ${a} - ${b}`);
          sonraki.push(`Maç ${macNo} galibi`);
        } else {
          const gecen = a !== null ? a : b;
          baylar.push(gecen);
          sonraki.push(gecen);
        }
      }
      if (baylar.length) satirlar.push('Bay: ' + baylar.join(', '));
      if (tur === 1) ilkTurMac = macNo;
      bloklar.push(satirlar.join('\n'));
      mevcut = sonraki;
    }
    return {
      rows: [
        ['Toplam maç', String(macNo)],
        ['Tur sayısı', String(tur)],
        ['Katılımcı sayısı', String(n)],
        ['Tablo büyüklüğü', String(boyut)],
        ['İlk turu bay geçen', String(boyut - n)],
        ['İlk tur maç sayısı', String(ilkTurMac)],
      ],
      text: bloklar.join('\n\n'),
      note: boyut === n ? 'Katılımcı sayısı 2\'nin kuvveti olduğu için bay geçen yok.' : `Tablo ${boyut} kişilik olduğundan ${boyut - n} katılımcı ilk turu maç yapmadan geçer; seri başı yerleşiminde bay hakkı listenin en üstündekilere verilir.`,
    };
  }
