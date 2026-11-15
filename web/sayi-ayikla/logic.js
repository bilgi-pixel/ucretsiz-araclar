// Metinden Sayı Ayıklama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin" alanına içinde sayı geçen metni yapıştırın.');
    const re = v.bicim === 'en' ? /(?<!\d)(?:\d{1,3}(?:,\d{3})+(?!\d)|\d+)(?:\.\d+)?(?!\d)/g
      : v.bicim === 'tam' ? /\d+/g
      : /(?<!\d)(?:\d{1,3}(?:\.\d{3})+(?!\d)|\d+)(?:,\d+)?(?!\d)/g;
    const yazilar = [], degerler = [];
    for (const m of ham.matchAll(re)) {
      let yazi = m[0];
      let deger = v.bicim === 'en' ? Number(yazi.replace(/,/g, ''))
        : v.bicim === 'tam' ? Number(yazi)
        : Number(yazi.replace(/\./g, '').replace(',', '.'));
      if (!Number.isFinite(deger)) h.err('Metindeki sayılardan biri hesaplanamayacak kadar uzun. Çok uzun rakam dizilerini çıkarıp yeniden deneyin.');
      if (v.negatif !== 'yoksay' && m.index > 0) {
        const once = ham[m.index - 1];
        const dahaOnce = m.index > 1 ? ham[m.index - 2] : ' ';
        if ((once === '-' || once === '−') && !/[\p{L}\p{N})\]]/u.test(dahaOnce)) { yazi = '-' + yazi; deger = -deger; }
      }
      yazilar.push(yazi); degerler.push(deger);
    }
    if (!yazilar.length) h.err('Metinde sayı bulunamadı. Sayıların rakamla yazıldığından emin olun.');
    const toplam = degerler.reduce((a, b) => a + b, 0);
    const ayr = v.ayrac === 'bosluk' ? ' ' : v.ayrac === 'noktalivirgul' ? '; ' : '\n';
    return {
      rows: [
        ['Bulunan sayı adedi', String(yazilar.length)],
        ['Toplam', h.fmt(toplam, 6)],
        ['Ortalama', h.fmt(toplam / degerler.length, 6)],
        ['En küçük', h.fmt(Math.min(...degerler), 6)],
        ['En büyük', h.fmt(Math.max(...degerler), 6)],
      ],
      text: yazilar.join(ayr),
      note: 'Listede sayılar metinde yazıldıkları biçimde gösterilir; toplam ve ortalama Türkçe biçimde, en fazla altı ondalık basamakla verilir.',
    };
  }
