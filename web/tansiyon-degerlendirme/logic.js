// Tansiyon Değeri Değerlendirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let s = h.pos(v.buyuk, 'Büyük tansiyon');
    let d = h.pos(v.kucuk, 'Küçük tansiyon');
    // "12'ye 8" gibi cmHg söylenişini mmHg'ye çevir
    if (s < 30 && d < 30) { s *= 10; d *= 10; }
    else if (s < 30 || d < 30) h.err('İki değeri de aynı biçimde yazın: ya 120 ve 80 (mmHg) ya da 12 ve 8.');
    s = Math.round(s * 1e6) / 1e6; d = Math.round(d * 1e6) / 1e6;
    if (s < 50 || s > 300) h.err('"Büyük tansiyon" 50 ile 300 mmHg arasında olmalı; ölçümü kontrol edin.');
    if (d < 30 || d > 200) h.err('"Küçük tansiyon" 30 ile 200 mmHg arasında olmalı; ölçümü kontrol edin.');
    if (d >= s) h.err('Küçük tansiyon büyük tansiyondan düşük olmalı; değerlerin yerini kontrol edin.');
    const adlar = ['Optimal', 'Normal', 'Yüksek normal', 'Evre 1 hipertansiyon', 'Evre 2 hipertansiyon', 'Evre 3 hipertansiyon'];
    const sinif = (x, esik) => { let k = 0; for (let i = 0; i < esik.length; i++) if (x >= esik[i]) k = i + 1; return k; };
    const ks = sinif(s, [120, 130, 140, 160, 180]);
    const kd = sinif(d, [80, 85, 90, 100, 110]);
    const k = Math.max(ks, kd);
    let sonuc;
    if (k >= 3 && d < 90) sonuc = `İzole sistolik hipertansiyon (${adlar[ks].replace(' hipertansiyon', '')} düzeyinde)`;
    else if (k >= 3) sonuc = adlar[k];
    else if (s < 90 || d < 60) sonuc = 'Düşük tansiyon (hipotansiyon)';
    else sonuc = adlar[k];
    const nb = s - d;
    const oab = d + nb / 3;
    return {
      rows: [
        ['Değerlendirme', sonuc],
        ['Ölçüm', `${h.fmt(s, 1)}/${h.fmt(d, 1)} mmHg`],
        ['Büyük tansiyonun sınıfı', s < 90 ? 'Düşük' : adlar[ks]],
        ['Küçük tansiyonun sınıfı', d < 60 ? 'Düşük' : adlar[kd]],
        ['Nabız basıncı', h.fmt(nb, 1) + ' mmHg'],
        ['Ortalama arteriyel basınç', h.fmt(oab, 1) + ' mmHg'],
      ],
      note: 'Sınıflama erişkinlerde sağlık kuruluşunda yapılan ölçümler içindir. Tek bir ölçüm tanı koydurmaz; bu sonuç bilgilendirme amaçlıdır ve hekim değerlendirmesinin yerini tutmaz.',
    };
  }
