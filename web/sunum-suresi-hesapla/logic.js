// Sunum Süresi ve Slayt Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sure = h.pos(v.sure, 'Toplam süre');
    const sc = h.nonneg(String(h.opt(v.sc, 0, 'Soru-cevap payı')), 'Soru-cevap payı');
    const sd = h.pos(v.slaytDk, 'Slayt başına süre');
    const hiz = h.pos(v.hiz, 'Konuşma hızı');
    if (sure > 1440) h.err('Toplam süre 1440 dakikadan (24 saat) uzun olamaz.');
    if (sc >= sure) h.err('Soru-cevap payı toplam süreden kısa olmalı; konuşmaya süre kalmıyor.');
    if (hiz > 400) h.err('Konuşma hızı dakikada 400 kelimeden büyük olamaz; değeri kontrol edin.');
    const net = sure - sc;
    const slayt = Math.max(1, Math.floor(net / sd + 1e-9));
    const kelime = net * hiz;
    return {
      rows: [
        ['Önerilen slayt sayısı', h.fmt(slayt, 0) + ' slayt'],
        ['Net konuşma süresi', h.fmt(net, 2) + ' dk'],
        ['Konuşma metni uzunluğu', h.fmt(kelime, 0) + ' kelime'],
        ['Slayt başına ortalama kelime', h.fmt(kelime / slayt, 0) + ' kelime'],
        ['Slayt başına düşen süre', h.fmt(net / slayt, 2) + ' dk'],
        ['Yarı noktada olmanız gereken slayt', h.fmt(Math.max(1, Math.round(slayt / 2)), 0) + '. slayt'],
      ],
      note: 'Slayt sayısı aşağı yuvarlanır; süreyi aşmaktansa bir slayt eksik hazırlamak daha güvenlidir. Başlık ve teşekkür slaytları kısa geçildiği için bu sayıya ek olarak düşünülebilir.',
    };
  }
