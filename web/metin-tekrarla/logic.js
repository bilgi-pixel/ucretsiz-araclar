// Metin Tekrarlama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin.trim() === '') h.err('Tekrarlanacak metni yazın.');
    const adet = h.posint(v.adet, 'Tekrar sayısı');
    if (adet > 10000) h.err('Tekrar sayısı en fazla 10.000 olabilir.');
    const AYIRICI = { satir: '\n', bosluk: ' ', virgul: ', ', yok: '' };
    let ayr;
    if (v.ayirici === 'ozel') {
      ayr = String(v.ozel ?? '');
      if (ayr === '') h.err('"Özel ayırıcı" alanını doldurun ya da listeden başka bir ayırıcı seçin.');
    } else ayr = AYIRICI[v.ayirici] ?? '\n';
    const toplam = metin.length * adet + ayr.length * (adet - 1);
    if (toplam > 1000000) h.err('Sonuç 1.000.000 karakteri aşıyor; tekrar sayısını azaltın ya da metni kısaltın.');
    const sonuc = Array(adet).fill(metin).join(ayr);
    return {
      rows: [
        ['Tekrar sayısı', h.fmt(adet, 0)],
        ['Toplam karakter', h.fmt(sonuc.length, 0)],
        ['Tek parçanın uzunluğu', h.fmt(metin.length, 0) + ' karakter'],
      ],
      text: sonuc,
    };
  }
