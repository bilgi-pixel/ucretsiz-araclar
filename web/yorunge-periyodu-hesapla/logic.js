// Yörünge Periyodu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const G = 6.6743e-11;
    const tablo = { dunya: [5.972e24, 6371], gunes: [1.989e30, 695700], ay: [7.342e22, 1737.4], mars: [6.417e23, 3389.5], jupiter: [1.898e27, 69911] };
    let M, R;
    if (v.merkez === 'ozel') {
      M = h.pos(v.kutle, 'Özel kütle');
      R = v.tur === 'merkez' ? h.nonneg(h.opt(v.yaricap, 0, 'Özel yarıçap'), 'Özel yarıçap') : h.pos(v.yaricap, 'Özel yarıçap');
    } else [M, R] = tablo[v.merkez] || tablo.dunya;
    let aKm;
    if (v.tur === 'merkez') {
      aKm = h.pos(v.mesafe, 'Uzaklık');
      if (aKm < R) h.err(`Yörünge yarıçapı merkezdeki cismin yarıçapından (${h.fmt(R, 1)} km) küçük olamaz.`);
    } else aKm = R + h.nonneg(v.mesafe, 'Uzaklık');
    const a = aKm * 1000;
    const T = 2 * Math.PI * Math.sqrt(a * a * a / (G * M));
    if (!Number.isFinite(T)) h.err('Sonuç hesaplanamadı; değerleri kontrol edin.');
    const hiz = 2 * Math.PI * a / T;
    let s = Math.round(T);
    const gun = Math.floor(s / 86400); s -= gun * 86400;
    const sa = Math.floor(s / 3600); s -= sa * 3600;
    const dk = Math.floor(s / 60); s -= dk * 60;
    const parca = [];
    if (gun) parca.push(h.fmt(gun, 0) + ' gün');
    if (gun || sa) parca.push(sa + ' sa');
    if (gun || sa || dk) parca.push(dk + ' dk');
    parca.push(s + ' sn');
    return {
      rows: [
        ['Yörünge periyodu', parca.join(' ')],
        ['Saniye', h.fmt(T, 1) + ' s'],
        ['Dakika', h.fmt(T / 60, 2) + ' dk'],
        ['Gün', h.fmt(T / 86400, 4) + ' gün'],
        ['Yörünge hızı', h.fmt(hiz / 1000, 3) + ' km/s'],
        ['Yörünge yarıçapı', h.fmt(aKm, 1) + ' km'],
        ['Günlük tur sayısı', h.fmt(86400 / T, 2)],
      ],
      note: 'Dairesel yörünge ve merkezdeki cisme göre ihmal edilebilir uydu kütlesi varsayılmıştır. Eliptik yörüngede "uzaklık" yerine yarı büyük eksen kullanılır; hız satırı ortalama değerdir.',
    };
  }
