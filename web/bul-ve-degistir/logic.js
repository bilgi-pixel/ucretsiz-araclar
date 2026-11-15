// Metinde Bul ve Değiştir — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin === '') h.err('Üzerinde arama yapılacak metni yazın.');
    const bul = String(v.bul ?? '');
    if (bul === '') h.err('"Bulunacak ifade" alanını doldurun.');
    if (metin.length > 2000000) h.err('Metin 2.000.000 karakterden uzun; parçalara bölerek deneyin.');
    const yeni = String(v.degistir ?? '');
    const duyarli = v.harf === 'duyarli';
    const tam = v.kelime === 'tam';
    const kelimeKarakteri = (c) => c !== undefined && c !== '' && /[\p{L}\p{N}_]/u.test(c);
    let sonuc = '', adet = 0;
    if (v.kip === 'regex') {
      let re;
      try { re = new RegExp(bul, 'gmu' + (duyarli ? '' : 'i')); }
      catch (e) { h.err('Düzenli ifade geçersiz; parantez ve köşeli parantezlerin kapandığını, özel karakterlerin önüne ters eğik çizgi koyduğunuzu kontrol edin.'); }
      let son = 0;
      for (const m of metin.matchAll(re)) {
        const bas = m.index, bit = bas + m[0].length;
        if (m[0] === '') continue;
        if (tam && (kelimeKarakteri(metin[bas - 1]) || kelimeKarakteri(metin[bit]))) continue;
        // $1, $2, $& ve $$ yer tutucularını çöz
        const yerine = yeni.replace(/\$(\$|&|\d{1,2})/g, (t, k) => {
          if (k === '$') return '$';
          if (k === '&') return m[0];
          const n = Number(k);
          return n >= 1 && n < m.length ? (m[n] ?? '') : t;
        });
        sonuc += metin.slice(son, bas) + yerine;
        son = bit; adet++;
      }
      sonuc += metin.slice(son);
    } else {
      // Türkçe kurallarına göre harf harf küçültme (uzunluk korunur): I→ı, İ→i
      const kucuk = (s) => {
        let o = '';
        for (let i = 0; i < s.length; i++) {
          const c = s[i];
          if (c === 'I') o += 'ı';
          else if (c === 'İ') o += 'i';
          else { const k = c.toLowerCase(); o += k.length === 1 ? k : c; }
        }
        return o;
      };
      const saman = duyarli ? metin : kucuk(metin);
      const igne = duyarli ? bul : kucuk(bul);
      let i = 0, son = 0;
      while (true) {
        const k = saman.indexOf(igne, i);
        if (k === -1) break;
        const bit = k + igne.length;
        if (tam && (kelimeKarakteri(metin[k - 1]) || kelimeKarakteri(metin[bit]))) { i = k + 1; continue; }
        sonuc += metin.slice(son, k) + yeni;
        son = bit; i = bit; adet++;
      }
      sonuc += metin.slice(son);
    }
    return {
      rows: [
        ['Değiştirilen eşleşme', h.fmt(adet, 0)],
        ['Önceki uzunluk', h.fmt(metin.length, 0) + ' karakter'],
        ['Sonraki uzunluk', h.fmt(sonuc.length, 0) + ' karakter'],
      ],
      text: sonuc,
      note: adet === 0 ? 'Eşleşme bulunamadı; metin değiştirilmedi. Yazımı ve seçenekleri kontrol edin.' : undefined,
    };
  }
