// Esnek ve Esnek Olmayan Çarpışma Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const m1 = h.pos(v.m1, 'Birinci cismin kütlesi');
    const m2 = h.pos(v.m2, 'İkinci cismin kütlesi');
    const u1 = h.num(v.v1, 'Birinci cismin ilk hızı');
    const u2 = h.num(v.v2, 'İkinci cismin ilk hızı');
    if (u1 === u2) h.err('İki cismin hızı aynıysa çarpışma olmaz. Hızlardan birini değiştirin.');
    let e = 1;
    if (v.tur === 'yapisan') e = 0;
    else if (v.tur === 'kismi') {
      e = h.num(v.e, 'Geri sıçrama katsayısı');
      if (e < 0 || e > 1) h.err('Geri sıçrama katsayısı 0 ile 1 arasında olmalı.');
    }
    const M = m1 + m2;
    const p = m1 * u1 + m2 * u2;
    const s1 = (p + m2 * e * (u2 - u1)) / M;
    const s2 = (p + m1 * e * (u1 - u2)) / M;
    const ke0 = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
    const ke1 = 0.5 * m1 * s1 * s1 + 0.5 * m2 * s2 * s2;
    let kayip = ke0 - ke1;
    if (Math.abs(kayip) < 1e-9 * Math.max(1, ke0)) kayip = 0;
    const hiz = (x) => h.fmt(x, 4) + ' m/s';
    const rows = [];
    if (v.tur === 'yapisan') {
      rows.push(['Ortak son hız', hiz(s1)]);
    } else {
      rows.push(['Birinci cismin son hızı', hiz(s1)]);
      rows.push(['İkinci cismin son hızı', hiz(s2)]);
    }
    rows.push(['Toplam momentum (korunur)', h.fmt(p, 4) + ' kg·m/s']);
    rows.push(['İlk kinetik enerji', h.fmt(ke0, 4) + ' J']);
    rows.push(['Son kinetik enerji', h.fmt(ke0 - kayip, 4) + ' J']);
    rows.push(['Kaybolan kinetik enerji', h.fmt(kayip, 4) + ' J']);
    rows.push(['Enerji kaybı oranı', '%' + h.fmt(kayip / ke0 * 100, 2)]);
    rows.push(['Kütle merkezinin hızı', hiz(p / M)]);
    return {
      rows,
      note: 'Çarpışma tek boyutlu (merkezî) kabul edilir ve dış kuvvetler ihmal edilir. Negatif hız, seçtiğiniz pozitif yönün tersine hareketi gösterir.',
    };
  }
