// Kelime Sayacı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Saymak için "Metin" alanına bir şeyler yazın ya da yapıştırın.');
    const hiz = h.opt(v.hiz, 200, 'Okuma hızı');
    if (!(hiz > 0)) h.err('"Okuma hızı" sıfırdan büyük olmalı (örn. 200).');
    const kelimeler = s.split(/\s+/u)
      .map((w) => w.replace(/^[^\p{L}\p{Nd}]+|[^\p{L}\p{Nd}]+$/gu, ''))
      .filter((w) => w !== '');
    if (!kelimeler.length) h.err('Metinde sayılabilecek bir kelime bulunamadı; harf ya da rakam içeren bir metin yazın.');
    const kucuk = kelimeler.map((w) => w.toLocaleLowerCase('tr-TR'));
    const benzersiz = new Set(kucuk).size;
    let toplamUzunluk = 0, enUzun = '';
    for (const w of kucuk) {
      const u = Array.from(w).length;
      toplamUzunluk += u;
      if (u > Array.from(enUzun).length) enUzun = w;
    }
    const cumle = s.split(/[.!?…]+(?=\s|$)/u).filter((p) => /[\p{L}\p{Nd}]/u.test(p)).length;
    const paragraf = s.split('\n').filter((p) => p.trim() !== '').length;
    const ch = Array.from(s);
    const bosluksuz = ch.filter((c) => !/\s/u.test(c)).length;
    const sn = Math.round(kelimeler.length / hiz * 60);
    const dk = Math.floor(sn / 60), kalan = sn % 60;
    const sure = dk > 0 ? (kalan > 0 ? `${h.fmt(dk, 0)} dk ${kalan} sn` : `${h.fmt(dk, 0)} dk`) : `${kalan} sn`;
    const n = (x) => h.fmt(x, 0);
    return {
      rows: [
        ['Kelime', n(kelimeler.length)],
        ['Benzersiz kelime', n(benzersiz)],
        ['Cümle', n(cumle)],
        ['Paragraf', n(paragraf)],
        ['Karakter (boşluklu)', n(ch.length)],
        ['Karakter (boşluksuz)', n(bosluksuz)],
        ['Ortalama kelime uzunluğu', h.fmt(toplamUzunluk / kelimeler.length, 1) + ' karakter'],
        ['En uzun kelime', enUzun],
        ['Tahmini okuma süresi', sure],
      ],
      note: 'Kelimeler boşluklara göre ayrılır; yalnızca noktalama işaretinden oluşan parçalar sayılmaz. Benzersiz kelime sayımında büyük-küçük harf farkı Türkçe kurallarına göre yok sayılır.',
    };
  }
