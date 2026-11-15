// Karakter Sayacı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s === '') h.err('Saymak için "Metin" alanına bir şeyler yazın ya da yapıştırın.');
    const ch = Array.from(s);
    let harf = 0, rakam = 0, bosluk = 0, satirSonu = 0, diger = 0;
    for (const c of ch) {
      if (c === '\n') satirSonu++;
      else if (/\s/u.test(c)) bosluk++;
      else if (/\p{L}/u.test(c)) harf++;
      else if (/\p{Nd}/u.test(c)) rakam++;
      else diger++;
    }
    const isaret = 0;
    const kelime = s.split(/\s+/u).filter((w) => /[\p{L}\p{Nd}]/u.test(w)).length;
    const bayt = new TextEncoder().encode(s).length;
    const n = (x) => h.fmt(x, 0);
    return {
      rows: [
        ['Karakter (boşluklu)', n(ch.length)],
        ['Karakter (boşluksuz)', n(ch.length - bosluk - satirSonu)],
        ['Harf', n(harf)],
        ['Rakam', n(rakam)],
        ['Boşluk', n(bosluk)],
        ['Noktalama ve simge', n(diger + isaret)],
        ['Kelime', n(kelime)],
        ['Satır', n(satirSonu + 1)],
        ['Boyut (UTF-8)', n(bayt) + ' bayt'],
      ],
      note: 'Boşluklu sayıma boşluklar, sekmeler ve satır sonları dahildir; her satır sonu tek karakter sayılır. Boşluksuz sayımda bunların tamamı çıkarılır.',
    };
  }
