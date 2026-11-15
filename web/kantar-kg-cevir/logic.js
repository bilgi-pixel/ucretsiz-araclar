// Kantar ve Batman Kilogram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const OKKA = 1.282945; // kg
    const okkaKat = { kantar: 44, batman: 6, okka: 1, ceki: 176 };
    let okka;
    if (v.birim === 'kg') okka = x / OKKA;
    else if (okkaKat[v.birim]) okka = x * okkaKat[v.birim];
    else h.err('Listeden geçerli bir birim seçin.');
    const kg = v.birim === 'kg' ? x : okka * OKKA;
    const s = {
      kg: ['Kilogram', h.fmt(kg, 4) + ' kg'],
      kantar: ['Kantar', h.fmt(okka / 44, 4) + ' kantar'],
      batman: ['Batman', h.fmt(okka / 6, 4) + ' batman'],
      okka: ['Okka', h.fmt(okka, 4) + ' okka'],
      ceki: ['Çeki', h.fmt(okka / 176, 4) + ' çeki'],
    };
    const sira = v.birim === 'kg' ? ['kantar', 'batman', 'okka', 'ceki'] : ['kg', 'kantar', 'batman', 'okka', 'ceki'];
    return {
      rows: sira.filter((k) => k !== v.birim).map((k) => s[k]),
      note: '1 okka = 1,282945 kg alınmıştır (İstanbul ölçüsü). Batman ve kantar bölgeden bölgeye farklı ağırlıklarda kullanılmıştır; yerel bir kaynağı okurken bunu göz önünde bulundurun.',
    };
  }
