// Günlük Faiz Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const P = h.pos(v.anapara, 'Anapara');
    const r = h.nonneg(v.oran, 'Yıllık faiz oranı') / 100;
    const gun = h.posint(h.opt(v.gun, 1, 'Gün sayısı'), 'Gün sayısı');
    const esas = v.esas === '360' ? 360 : 365;
    const stopaj = h.nonneg(h.opt(v.stopaj, 0, 'Stopaj oranı'), 'Stopaj oranı') / 100;
    if (stopaj >= 1) h.err('Stopaj oranı %100\'den küçük olmalı.');
    if (gun > 36500) h.err('Gün sayısı en fazla 36.500 (100 yıl) olabilir.');
    if (r > 100) h.err('Yıllık faiz oranı %10.000\'den büyük olamaz; değeri kontrol edin.');
    const gunlukOran = r / esas;
    const gunlukFaiz = P * gunlukOran;
    const brut = v.yontem === 'bilesik' ? P * (Math.pow(1 + gunlukOran, gun) - 1) : gunlukFaiz * gun;
    const kesinti = brut * stopaj;
    const net = brut - kesinti;
    return {
      rows: [
        ['Günlük faiz (brüt)', h.para(gunlukFaiz)],
        ['Günlük faiz (net)', h.para(gunlukFaiz * (1 - stopaj))],
        ['Günlük faiz oranı', '%' + h.fmt(gunlukOran * 100, 5)],
        [gun + ' günlük brüt faiz', h.para(brut)],
        ['Stopaj kesintisi', h.para(kesinti)],
        [gun + ' günlük net faiz', h.para(net)],
        ['Vade sonu tutar (net)', h.para(P + net)],
      ],
      note: v.yontem === 'bilesik'
        ? 'Günlük bileşik: tutar = anapara × (1 + yıllık oran ÷ ' + esas + ')^gün. Günlük faiz satırları ilk güne aittir; sonraki günlerde biraz artar.'
        : 'Basit faiz: faiz = anapara × yıllık oran × gün ÷ ' + esas + '.',
    };
  }
