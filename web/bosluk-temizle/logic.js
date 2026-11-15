// Fazla Boşlukları Temizleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham === '') h.err('Boşlukları temizlemek için "Metin" alanına bir metin yapıştırın.');
    if (ham.trim() === '') h.err('Metin yalnızca boşluklardan oluşuyor. İçinde yazı bulunan bir metin yapıştırın.');
    // Bölünemez boşluk ve diğer özel boşluk karakterleri normal boşluğa çevrilir
    let s = ham.replace(/[   -   　]/g, ' ');
    if (v.sekme !== 'hayir') s = s.replace(/\t/g, ' ');
    const coklu = v.coklu !== 'hayir', kenar = v.kenar !== 'hayir';
    let satirlar = s.split('\n').map((x) => {
      let y = x;
      if (coklu) y = y.replace(/ {2,}/g, ' ');
      if (v.noktalama === 'evet') y = y.replace(/ +([,.;:!?])/g, '$1');
      if (kenar) y = y.replace(/^[ \t]+|[ \t]+$/g, '');
      return y;
    });
    let cikti;
    if (v.satirYapisi === 'tek') {
      cikti = satirlar.map((x) => x.replace(/^[ \t]+|[ \t]+$/g, '')).filter((x) => x !== '').join(' ');
    } else {
      if (v.satirYapisi === 'bos') satirlar = satirlar.filter((x) => x.trim() !== '');
      cikti = satirlar.join('\n');
    }
    const once = Array.from(ham).length, sonra = Array.from(cikti).length;
    return {
      rows: [
        ['Silinen karakter', h.fmt(once - sonra, 0)],
        ['Önceki uzunluk', h.fmt(once, 0) + ' karakter'],
        ['Sonraki uzunluk', h.fmt(sonra, 0) + ' karakter'],
      ],
      text: cikti,
      note: once === sonra && ham === cikti ? 'Metinde seçtiğiniz kurallara göre temizlenecek fazla boşluk bulunamadı.' : 'Bölünemez boşluk gibi özel boşluk karakterleri normal boşluğa çevrildi. Uzunluklara satır sonu karakterleri dahildir.',
    };
  }
