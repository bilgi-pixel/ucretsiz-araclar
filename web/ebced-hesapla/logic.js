// Ebced Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').trim();
    if (s === '') h.err('Ebced değerini hesaplamak için Arap harfleriyle bir kelime yazın.');
    const D = {
      'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ٱ': 1,
      'ب': 2, 'پ': 2, 'ج': 3, 'چ': 3, 'د': 4,
      'ه': 5, 'ە': 5, 'ھ': 5, 'ہ': 5,
      'و': 6, 'ؤ': 6, 'ز': 7, 'ژ': 7, 'ح': 8, 'ط': 9,
      'ي': 10, 'ى': 10, 'ی': 10, 'ئ': 10,
      'ك': 20, 'ک': 20, 'گ': 20, 'ڭ': 20,
      'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90,
      'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000,
    };
    D['ة'] = v.teMerbuta === '400' ? 400 : 5;
    D['ء'] = v.hemze === '0' ? 0 : 1;
    // Harekeler, şedde, sükûn, üstün elif ve uzatma çizgisi sayılmaz
    const temiz = s.replace(/[ً-ٰٟـۖ-ۭ]/g, '');
    const kelimeToplam = [];
    const dokum = [];
    let toplam = 0, adet = 0;
    for (const k of temiz.split(/\s+/)) {
      let kt = 0, kn = 0;
      for (const c of Array.from(k)) {
        if (!(c in D)) continue;
        const d = D[c];
        if (c === 'ء' && d === 0) continue;
        kt += d; kn++; dokum.push(`${c}=${d}`);
      }
      if (kn) { kelimeToplam.push(kt); toplam += kt; adet += kn; }
    }
    if (adet === 0) h.err('Metinde Arap harfi bulunamadı. Ebced hesabı Arap ya da Osmanlı harfleriyle yazılmış metinler içindir; örneğin محمد yazın.');
    const rows = [
      ['Ebced değeri', h.fmt(toplam, 0)],
      ['Harf sayısı', h.fmt(adet, 0)],
      ['Harf dökümü', dokum.join(', ')],
    ];
    if (kelimeToplam.length > 1) rows.push(['Kelime değerleri', kelimeToplam.join(' + ')]);
    return {
      rows,
      note: 'Büyük ebced (cümel-i kebir) değerleri kullanıldı. Şeddeli harf bir kez sayıldı; harekeler hesaba katılmadı.',
    };
  }
