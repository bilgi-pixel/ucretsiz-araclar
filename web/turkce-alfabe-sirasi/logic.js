// Kelimenin Alfabe Sıra Numaraları — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').trim();
    if (s === '') h.err('Sıra numaralarını bulmak için bir kelime yazın.');
    const tr = v.alfabe !== 'en';
    const ALF = tr ? 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Büyük harfe çevir: Türkçede i → İ, ı → I; şapkalı harfler yalın karşılığıyla sayılır
    const buyut = (x) => {
      let t = x.replace(/[âÂ]/g, 'A').replace(/[ûÛ]/g, 'U');
      if (tr) t = t.replace(/[îÎ]/g, 'İ').replace(/i/g, 'İ').replace(/ı/g, 'I');
      else t = t.replace(/[îÎİı]/g, 'I');
      return t.toUpperCase();
    };
    const kelimeler = [];
    const dokum = [];
    const atlanan = new Set();
    let toplam = 0, adet = 0;
    for (const k of s.split(/\s+/)) {
      const sayilar = [];
      for (const c of Array.from(buyut(k))) {
        const i = ALF.indexOf(c);
        if (i < 0) { if (/\p{L}/u.test(c)) atlanan.add(c); continue; }
        sayilar.push(i + 1); dokum.push(`${c}=${i + 1}`); toplam += i + 1; adet++;
      }
      if (sayilar.length) kelimeler.push(sayilar);
    }
    if (adet === 0) h.err(tr ? 'Türk alfabesinde yer alan bir harf bulunamadı. Harflerden oluşan bir kelime yazın.' : 'İngiliz alfabesinde yer alan bir harf bulunamadı. A–Z harflerinden oluşan bir kelime yazın.');
    const rows = [
      ['Sıra numaraları', kelimeler.map((k) => k.join('-')).join(' / ')],
      ['Toplam', h.fmt(toplam, 0)],
      ['Harf sayısı', h.fmt(adet, 0)],
      ['Harf dökümü', dokum.join(', ')],
    ];
    if (kelimeler.length > 1) rows.push(['Kelime toplamları', kelimeler.map((k) => k.reduce((a, b) => a + b, 0)).join(' + ')]);
    let note = tr ? 'Türk alfabesi: A=1, B=2, C=3, Ç=4 … Y=28, Z=29.' : 'İngiliz alfabesi: A=1, B=2 … Z=26.';
    if (atlanan.size) note += ` Bu alfabede bulunmadığı için sayılmayan harfler: ${[...atlanan].join(', ')}.`;
    return { rows, note };
  }
