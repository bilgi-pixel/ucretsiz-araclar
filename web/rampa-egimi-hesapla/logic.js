// Rampa Eğimi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hCm = h.pos(v.yukseklik, 'Aşılacak yükseklik');
    const hM = hCm / 100;
    let yatay; let oran;
    if (v.bilinen === 'uzunluk') {
      yatay = h.pos(v.deger, 'Yatay uzunluk');
      oran = hM / yatay;
    } else {
      const yz = h.pos(v.deger, 'Hedef eğim');
      if (yz > 100) h.err('Hedef eğim %100\'den büyük olamaz; rampalar için genellikle %5–15 arası değerler kullanılır.');
      oran = yz / 100;
      yatay = hM / oran;
    }
    const yuzey = Math.sqrt(yatay * yatay + hM * hM);
    const aci = Math.atan(oran) * 180 / Math.PI;
    const ana = v.bilinen === 'uzunluk'
      ? [['Eğim yüzdesi', '%' + h.fmt(oran * 100, 2)], ['Yatay uzunluk', h.fmt(yatay, 2) + ' m']]
      : [['Gereken yatay uzunluk', h.fmt(yatay, 2) + ' m'], ['Eğim yüzdesi', '%' + h.fmt(oran * 100, 2)]];
    return {
      rows: [
        ...ana,
        ['Rampa yüzey uzunluğu', h.fmt(yuzey, 2) + ' m'],
        ['Eğim açısı', h.fmt(aci, 2) + '°'],
        ['Oran (düşey:yatay)', '1:' + h.fmt(1 / oran, 2)],
        ['Her 1 m yatayda yükselme', h.fmt(oran * 100, 2) + ' cm'],
      ],
      note: 'Sahanlık (dinlenme düzlüğü) uzunlukları hesaba dahil değildir. Erişilebilirlik rampalarında izin verilen eğim ve sahanlık koşulları için güncel standart ve yönetmelikleri kontrol edin.',
    };
  }
