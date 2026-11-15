// Metinden E-posta Adresi Ayıklama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin" alanına içinde e-posta adresi geçen metni yapıştırın.');
    const re = /[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}(?![A-Za-z0-9])/g;
    let bulunan = ham.match(re) || [];
    bulunan = bulunan.filter((a) => a.length <= 254 && a.indexOf('@') <= 64);
    if (!bulunan.length) h.err('Metinde e-posta adresi bulunamadı. Adreslerin ad@alanadi.com biçiminde yazıldığından emin olun.');
    const toplam = bulunan.length;
    if (v.harf !== 'ayni') bulunan = bulunan.map((a) => a.toLowerCase());
    let liste = bulunan;
    if (v.tekrar !== 'koru') {
      const gor = new Set();
      liste = [];
      for (const a of bulunan) { const k = a.toLowerCase(); if (!gor.has(k)) { gor.add(k); liste.push(a); } }
    }
    const alan = (a) => a.slice(a.lastIndexOf('@') + 1).toLowerCase();
    const kars = (x, y) => (x < y ? -1 : x > y ? 1 : 0);
    if (v.sirala === 'alfabe') liste = [...liste].sort((x, y) => kars(x.toLowerCase(), y.toLowerCase()));
    else if (v.sirala === 'alan') liste = [...liste].sort((x, y) => kars(alan(x), alan(y)) || kars(x.toLowerCase(), y.toLowerCase()));
    const alanlar = new Map();
    for (const a of liste) alanlar.set(alan(a), (alanlar.get(alan(a)) || 0) + 1);
    const enCok = [...alanlar.entries()].sort((x, y) => y[1] - x[1] || kars(x[0], y[0]))[0];
    const ayr = v.ayrac === 'virgul' ? ', ' : v.ayrac === 'noktalivirgul' ? '; ' : '\n';
    return {
      rows: [
        ['Listelenen adres', String(liste.length)],
        ['Metinde bulunan toplam adres', String(toplam)],
        ['Çıkarılan tekrar', String(toplam - liste.length)],
        ['Farklı alan adı', String(alanlar.size)],
        ['En çok geçen alan adı', `${enCok[0]} (${enCok[1]} adres)`],
      ],
      text: liste.join(ayr),
      note: 'Adresler yalnızca yazım biçimine göre bulunur; adresin gerçekten var olduğu ya da ileti aldığı denetlenmez.',
    };
  }
