// HbA1c Ortalama Kan Şekeri Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    let a; // HbA1c, %
    if (v.tur === 'ifcc') a = x / 10.929 + 2.15;
    else if (v.tur === 'mg') a = (x + 46.7) / 28.7;
    else if (v.tur === 'mmol') a = (x + 2.59) / 1.59;
    else a = x;
    if (a < 3 || a > 20) {
      if (v.tur === 'yuzde' || !v.tur) h.err('HbA1c değeri %3 ile %20 arasında olmalı; değer mmol/mol ise türü değiştirin.');
      h.err('Girilen değer geçerli HbA1c aralığının (%3 – %20) dışında bir sonuca karşılık geliyor; değeri ve türünü kontrol edin.');
    }
    const mg = 28.7 * a - 46.7;
    const mmol = 1.59 * a - 2.59;
    const ifcc = (a - 2.15) * 10.929;
    const a1 = Math.round(a * 10 + 1e-9) / 10;
    let aralik;
    if (a1 < 5.7) aralik = 'Normal aralık (%5,7 altı)';
    else if (a1 < 6.5) aralik = 'Prediyabet aralığı (%5,7 – %6,4)';
    else aralik = 'Diyabet aralığı (%6,5 ve üzeri)';
    const rOrt = ['Tahmini ortalama kan şekeri', h.fmt(mg, 1) + ' mg/dL'];
    const rMmol = ['Ortalama kan şekeri (mmol/L)', h.fmt(mmol, 2) + ' mmol/L'];
    const rA = ['HbA1c', '%' + h.fmt(a, 1)];
    const rI = ['HbA1c (IFCC)', h.fmt(ifcc, 0) + ' mmol/mol'];
    const rows = (v.tur === 'mg' || v.tur === 'mmol') ? [rA, rI, rOrt, rMmol] : [rOrt, rMmol, rA, rI];
    rows.push(['HbA1c aralığı', aralik]);
    return {
      rows,
      note: 'Formül: ortalama glukoz (mg/dL) = 28,7 × HbA1c − 46,7. Sonuç bir tahmindir; kansızlık, hemoglobin farklılıkları ve gebelik gibi durumlarda HbA1c gerçek ortalamayı tam yansıtmayabilir.',
    };
  }
