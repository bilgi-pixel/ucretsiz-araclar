// Palindrom Sayı Kontrolü — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let s = String(v.sayi ?? '').replace(/\s/g, '').replace(/−/g, '-');
    if (s === '') h.err('"Sayı" alanını doldurun.');
    if (s[0] === '-') h.err('Negatif sayılar palindrom sayılmaz; eksi işareti tersten okunuşta sona geçer. Sayıyı işaretsiz yazın.');
    if (!/^\d+$/.test(s)) h.err('Yalnızca rakamlardan oluşan bir tam sayı yazın; nokta, virgül ya da harf kullanmayın (örn. 12321).');
    s = s.replace(/^0+(?=\d)/, '');
    if (s.length > 60) h.err('Sayı en fazla 60 basamaklı olabilir; daha kısa bir sayı yazın.');
    const cevir = (t) => t.split('').reverse().join('');
    const ters = cevir(s);
    const pal = s === ters;
    const tersSayi = ters.replace(/^0+(?=\d)/, '');
    // Kendisinden büyük ilk palindrom
    const n = s.length;
    let sonraki;
    if (/^9+$/.test(s)) sonraki = '1' + '0'.repeat(n - 1) + '1';
    else {
      const yari = Math.ceil(n / 2);
      const ayna = (sol) => sol + cevir(sol.slice(0, n - yari));
      let sol = s.slice(0, yari);
      sonraki = ayna(sol);
      if (!(sonraki > s)) { sol = String(BigInt(sol) + 1n); sonraki = ayna(sol); }
    }
    // Ters çevir ve topla (en fazla 200 adım)
    let tt = 'Sayı zaten palindrom';
    let ilkAdim = '';
    if (!pal) {
      let str = s, adim = 0, bulundu = false;
      while (adim < 200) {
        const yeni = String(BigInt(str) + BigInt(cevir(str)));
        if (adim === 0) ilkAdim = `${s} + ${tersSayi} = ${yeni}`;
        str = yeni; adim++;
        if (str === cevir(str)) { bulundu = true; break; }
      }
      tt = bulundu ? `${adim} adımda ${str}` : '200 adımda palindroma ulaşılamadı';
    }
    return {
      rows: [
        ['Sonuç', pal ? 'Palindrom sayı' : 'Palindrom değil'],
        ['Tersten yazılışı', tersSayi],
        ['Basamak sayısı', String(n)],
        ['Sonraki palindrom sayı', sonraki],
        ['Ters çevir ve topla', tt],
      ],
      note: pal ? 'Sayı soldan sağa ve sağdan sola aynı okunuyor.' : `Sayı tersten ${tersSayi} olarak okunuyor. İlk ters çevir-topla adımı: ${ilkAdim}.`,
    };
  }
