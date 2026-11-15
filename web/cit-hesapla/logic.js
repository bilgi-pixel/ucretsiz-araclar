// Çit ve Tel Örgü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.uzunluk, 'Çit hattı uzunluğu');
    const s = h.pos(v.aralik, 'En fazla direk aralığı');
    const kapi = h.nonneg(v.kapi, 'Toplam kapı genişliği');
    const rulo = h.pos(v.rulo, 'Tel örgü rulo boyu');
    const sira = h.int(v.gergi, 'Gergi teli sıra sayısı');
    if (sira < 0) h.err('"Gergi teli sıra sayısı" negatif olamaz; gergi teli kullanmayacaksanız 0 yazın.');
    if (kapi >= L) h.err('Toplam kapı genişliği çit hattı uzunluğundan küçük olmalı.');
    const bolme = Math.max(1, Math.ceil(L / s - 1e-9));
    const direk = v.tip === 'acik' ? bolme + 1 : bolme;
    const tel = L - kapi;
    return {
      rows: [
        ['Direk sayısı', direk + ' adet'],
        ['Gerçek direk aralığı', h.fmt(L / bolme, 2) + ' m'],
        ['Tel örgü uzunluğu', h.fmt(tel, 2) + ' m'],
        ['Tel örgü rulosu', Math.ceil(tel / rulo - 1e-9) + ' rulo'],
        ['Gergi teli', h.fmt(tel * sira, 2) + ' m'],
      ],
      note: 'Köşe ve kapı direklerine konan payandalar, bağ teli ve gergi aparatları bu sayılara dahil değildir.',
    };
  }
