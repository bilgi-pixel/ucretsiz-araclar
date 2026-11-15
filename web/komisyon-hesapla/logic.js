// Komisyon Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tutar = h.pos(v.tutar, 'Tutar');
    const oran = h.nonneg(v.oran, 'Komisyon oranı');
    if (oran > 100) h.err('Komisyon oranı %100\'den büyük olamaz.');
    const sabit = h.opt(v.sabit, 0, 'Sabit işlem ücreti');
    if (sabit < 0) h.err('"Sabit işlem ücreti" negatif olamaz.');
    const kdv = h.opt(v.kdv, 0, 'Komisyon KDV oranı');
    if (kdv < 0 || kdv > 100) h.err('KDV oranı 0 ile 100 arasında olmalı.');
    const r = oran / 100, k = 1 + kdv / 100;
    let satis;
    if (v.mod === 'net') {
      const payda = 1 - r * k;
      if (payda <= 1e-9) h.err('Bu komisyon ve KDV oranıyla kesinti satışın tamamını aşıyor; net tutara ulaşılamaz. Oranı düşürün.');
      satis = (tutar + sabit * k) / payda;
    } else satis = tutar;
    const kom = satis * r + sabit;
    const kdvTutar = kom * (k - 1);
    const kesinti = kom + kdvTutar;
    const net = satis - kesinti;
    if (net < -0.005) h.err('Komisyon ve ücretlerin toplamı satış tutarını aşıyor; tutarı ya da oranları kontrol edin.');
    const rows = [
      v.mod === 'net' ? ['Gereken satış tutarı', h.para(satis)] : ['Komisyon tutarı', h.para(kom)],
      v.mod === 'net' ? ['Komisyon tutarı', h.para(kom)] : ['Net ele geçen', h.para(net)],
    ];
    if (kdv > 0) rows.push(['Komisyon KDV\'si', h.para(kdvTutar)]);
    rows.push(['Toplam kesinti', h.para(kesinti)]);
    if (v.mod === 'net') rows.push(['Net ele geçen', h.para(net)]);
    else rows.push(['Satış tutarı', h.para(satis)]);
    rows.push(['Gerçek kesinti oranı', '%' + h.fmt((kesinti / satis) * 100, 2)]);
    return {
      rows,
      note: 'Komisyon = satış tutarı × oran + sabit ücret. KDV girildiyse komisyonun üzerine eklenir. Stopaj ve gelir vergisi gibi kesintiler hesaba dahil değildir.',
    };
  }
