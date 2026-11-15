// Sesli ve Sessiz Harf Sayacı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin" alanına sayılacak metni yazın.');
    const t = ham.normalize('NFC').toLocaleLowerCase('tr');
    const temel = { 'â': 'a', 'î': 'i', 'û': 'u' };
    const unluler = ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'];
    const adet = Object.fromEntries(unluler.map((u) => [u, 0]));
    let unlu = 0, unsuz = 0, rakam = 0, bosluk = 0, diger = 0;
    for (const c0 of Array.from(t)) {
      const c = temel[c0] || c0;
      if (c in adet) { adet[c]++; unlu++; }
      else if (/\p{L}/u.test(c)) unsuz++;
      else if (/\p{Nd}/u.test(c)) rakam++;
      else if (/\s/.test(c)) bosluk++;
      else diger++;
    }
    const harf = unlu + unsuz;
    if (harf === 0) h.err('Metinde harf bulunamadı. Sayım için en az bir harf içeren metin yazın.');
    const kalin = adet.a + adet['ı'] + adet.o + adet.u;
    const ince = adet.e + adet.i + adet['ö'] + adet['ü'];
    const duz = adet.a + adet.e + adet['ı'] + adet.i;
    const yuvarlak = adet.o + adet['ö'] + adet.u + adet['ü'];
    return {
      rows: [
        ['Sesli harf (ünlü)', String(unlu)],
        ['Sessiz harf (ünsüz)', String(unsuz)],
        ['Toplam harf', String(harf)],
        ['Sesli harf oranı', '%' + h.fmt(unlu / harf * 100, 1)],
        ['Sessiz harf oranı', '%' + h.fmt(unsuz / harf * 100, 1)],
        ['Kalın ünlü (a, ı, o, u)', String(kalin)],
        ['İnce ünlü (e, i, ö, ü)', String(ince)],
        ['Düz ünlü (a, e, ı, i)', String(duz)],
        ['Yuvarlak ünlü (o, ö, u, ü)', String(yuvarlak)],
        ['Ünlülerin dağılımı', unluler.map((u) => `${u}: ${adet[u]}`).join(' · ')],
        ['Rakam', String(rakam)],
        ['Boşluk ve satır sonu', String(bosluk)],
        ['Noktalama ve diğer', String(diger)],
      ],
      note: 'Şapkalı â, î, û harfleri a, i, u ile birlikte sayılır. Türk alfabesinde bulunmayan q, w, x gibi harfler sessiz harf kabul edilir.',
    };
  }
