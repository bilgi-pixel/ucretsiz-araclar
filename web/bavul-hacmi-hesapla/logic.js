// Bavul Hacmi (Litre) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const boy = h.pos(v.boy, 'Yükseklik');
    const en = h.pos(v.en, 'Genişlik');
    const der = h.pos(v.derinlik, 'Derinlik');
    const oran = h.pos(v.oran, 'Kullanılabilir iç hacim oranı');
    if (oran > 100) h.err('Kullanılabilir hacim oranı %100\'den büyük olamaz.');
    if (Math.max(boy, en, der) > 300) h.err('Ölçüler santimetre olarak girilmeli ve 300 cm\'yi aşmamalı; değerleri kontrol edin.');
    const litre = boy * en * der / 1000;
    const toplam = boy + en + der;
    const uzun = Math.max(boy, en, der);
    let sinif;
    if (uzun <= 45) sinif = 'Kişisel eşya / sırt çantası boyu';
    else if (uzun <= 56) sinif = 'Kabin boy';
    else if (uzun <= 70) sinif = 'Orta boy';
    else sinif = 'Büyük boy';
    const inc = (x) => h.fmt(x / 2.54, 1);
    return {
      rows: [
        ['Dış hacim', h.fmt(litre, 1) + ' L'],
        ['Tahmini iç hacim', h.fmt(litre * oran / 100, 1) + ' L'],
        ['Toplam boyut (en + boy + derinlik)', h.fmt(toplam, 1) + ' cm'],
        ['İnç ölçüleri', inc(boy) + ' × ' + inc(en) + ' × ' + inc(der) + ' inç'],
        ['Toplam boyut (inç)', inc(toplam) + ' inç'],
        ['Yaklaşık sınıf', sinif],
      ],
      note: 'Hacim dikdörtgen prizma kabulüyle bulunur; köşeleri yuvarlak valizlerde gerçek hacim biraz daha azdır. Bagaj sınırları havayoluna göre değişir.',
    };
  }
