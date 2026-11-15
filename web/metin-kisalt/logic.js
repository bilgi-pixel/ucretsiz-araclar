// Metin Kısaltma (Karakter Sınırı) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin" alanına kısaltılacak metni yazın.');
    const sinir = h.posint(v.sinir, 'Karakter sınırı');
    const ek = String(v.ek ?? '');
    const ekUz = Array.from(ek).length;
    const ch = Array.from(ham.trim());
    const ozgun = ch.length;
    if (ozgun <= sinir) {
      return {
        rows: [
          ['Sonuç uzunluğu', `${ozgun} karakter`],
          ['Özgün uzunluk', `${ozgun} karakter`],
          ['Kesilen karakter', '0'],
          ['Durum', 'Kısaltma gerekmedi'],
        ],
        text: ch.join(''),
        note: 'Metin zaten sınırın içinde olduğu için değiştirilmedi ve bitiş işareti eklenmedi.',
      };
    }
    const pay = sinir - ekUz;
    if (pay < 1) h.err(`Karakter sınırı bitiş işaretinden (${ekUz} karakter) büyük olmalı. Sınırı artırın ya da bitiş işaretini kısaltın.`);
    let parca = ch.slice(0, pay);
    let bolundu = false;
    if (v.yontem !== 'karakter' && !/\s/.test(ch[pay])) {
      let i = parca.length - 1;
      while (i >= 0 && !/\s/.test(parca[i])) i--;
      if (i > 0) parca = parca.slice(0, i); else bolundu = true;
    }
    let govde = parca.join('').replace(/\s+$/u, '');
    if (v.yontem !== 'karakter') govde = govde.replace(/[\s,;:\-–—]+$/u, '');
    if (govde === '') govde = ch.slice(0, pay).join('');
    const sonuc = govde + ek;
    const uz = Array.from(sonuc).length;
    return {
      rows: [
        ['Sonuç uzunluğu', `${uz} karakter`],
        ['Özgün uzunluk', `${ozgun} karakter`],
        ['Kesilen karakter', String(ozgun - Array.from(govde).length)],
        ['Durum', 'Kısaltıldı'],
      ],
      text: sonuc,
      note: bolundu ? 'İlk kelime tek başına sınırı aştığı için kelime ortasından kesildi.'
        : 'Bitiş işareti sınıra dahildir. Baştaki ve sondaki boşluklar sayılmaz.',
    };
  }
