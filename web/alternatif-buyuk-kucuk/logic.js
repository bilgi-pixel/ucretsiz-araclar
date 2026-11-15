// Alternatif Büyük Küçük Harf Yazma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Dönüştürmek için "Metin" alanına bir metin yazın.');
    if (!/\p{L}/u.test(s)) h.err('Metinde harf bulunamadı. Büyük küçük harf yalnızca harflere uygulanabilir.');
    const tr = v.dil !== 'en';
    const kucuk = (x) => (tr ? x.replace(/I/g, 'ı').replace(/İ/g, 'i') : x.replace(/İ/g, 'i')).toLowerCase();
    const buyuk = (x) => (tr ? x.replace(/i/g, 'İ').replace(/ı/g, 'I') : x.replace(/ı/g, 'I')).toUpperCase();
    const ilkBuyuk = v.baslangic === 'buyuk';
    let sira = 0, nb = 0, nk = 0, o = '';
    for (const c of Array.from(s)) {
      const harf = /\p{L}/u.test(c);
      if (v.sayim === 'kelime' && /\s/.test(c)) { sira = 0; o += c; continue; }
      if (!harf) { o += c; if (v.sayim === 'hepsi' && c !== '\n') sira++; continue; }
      const cift = sira % 2 === 0;
      const b = cift === ilkBuyuk;
      const y = b ? buyuk(c) : kucuk(c);
      // Büyük/küçük biçimi olmayan harfler (ör. Arapça, Çince) sayılır ama değişmez
      if (y !== kucuk(c) || buyuk(c) !== kucuk(c)) { if (b) nb++; else nk++; }
      o += y;
      sira++;
    }
    return {
      rows: [
        ['Büyük harf', h.fmt(nb, 0)],
        ['Küçük harf', h.fmt(nk, 0)],
        ['Toplam harf', h.fmt(nb + nk, 0)],
      ],
      text: o,
      note: v.sayim === 'hepsi' ? 'Boşluk, rakam ve noktalama işaretleri de sırada bir yer tuttu; satır sonları sayılmadı.' : v.sayim === 'kelime' ? 'Sıra her kelimenin başında yeniden başlatıldı.' : 'Boşluk, rakam ve noktalama işaretleri sırayı etkilemedi; yalnızca harfler sayıldı.',
    };
  }
