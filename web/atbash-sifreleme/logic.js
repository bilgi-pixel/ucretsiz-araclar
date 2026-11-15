// Atbash Şifreleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Şifrelemek ya da çözmek için "Metin" alanına bir yazı yazın.');
    const en = v.alfabe === 'en';
    const BUYUK = en ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const KUCUK = en ? 'abcdefghijklmnopqrstuvwxyz' : 'abcçdefgğhıijklmnoöprsştuüvyz';
    const n = BUYUK.length;
    let cikti = '', cevrilen = 0, sabit = 0, diger = 0;
    for (const c of s) {
      let i = BUYUK.indexOf(c), dizi = BUYUK;
      if (i < 0) { i = KUCUK.indexOf(c); dizi = KUCUK; }
      if (i < 0) { cikti += c; if (/\p{L}/u.test(c)) diger++; continue; }
      const o = dizi[n - 1 - i];
      if (o === c) sabit++; else cevrilen++;
      cikti += o;
    }
    if (cevrilen + sabit === 0) h.err('Metinde seçilen alfabeye ait harf yok; alfabeyi değiştirin ya da metni denetleyin.');
    return {
      rows: [
        ['Değişen harf', h.fmt(cevrilen, 0)],
        ['Kendine dönüşen harf', h.fmt(sabit, 0)],
        ['Alfabe dışı harf', h.fmt(diger, 0)],
        ['Alfabe', en ? 'İngilizce, 26 harf' : 'Türkçe, 29 harf'],
      ],
      text: cikti,
      note: (en ? '' : 'Türk alfabesinin ortasındaki L harfi kendi karşılığıdır ve değişmez. ') + 'Çıktıyı aynı alfabeyle yeniden çevirirseniz özgün metne dönersiniz.',
    };
  }
