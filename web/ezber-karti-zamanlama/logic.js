// Ezber Kartı Tekrar Tarihleri Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.ilk, 'İlk öğrenme tarihi');
    const a1 = h.posint(v.a1, 'Birinci aralık');
    const a2 = h.posint(v.a2, 'İkinci aralık');
    const ef = h.num(v.carpan, 'Kolaylık çarpanı');
    const adet = h.posint(v.adet, 'Tekrar sayısı');
    if (a1 > 365 || a2 > 365) h.err('İlk iki aralık 365 günden uzun olamaz.');
    if (a2 < a1) h.err('İkinci aralık birinci aralıktan kısa olamaz.');
    if (ef < 1.3 - 1e-9 || ef > 5 + 1e-9) h.err('Kolaylık çarpanı 1,3 ile 5 arasında olmalı (yaygın başlangıç değeri 2,5).');
    if (adet > 15) h.err('Tekrar sayısı en fazla 15 olabilir.');
    const rows = [];
    const araliklar = [];
    let onceki = 0, toplam = 0;
    for (let i = 1; i <= adet; i++) {
      let ar;
      if (i === 1) ar = a1;
      else if (i === 2) ar = a2;
      else ar = Math.max(onceki + 1, Math.round(onceki * ef + 1e-9));
      if (toplam + ar > 36500) h.err('Aralıklar 100 yılı aşıyor; tekrar sayısını ya da çarpanı küçültün.');
      toplam += ar;
      onceki = ar;
      araliklar.push(ar);
      const d = h.gunEkle(ilk, toplam);
      rows.push([`${i}. tekrar`, `${h.fmtDate(d)} ${h.gunAdi(d)} (aralık ${h.fmt(ar, 0)} gün)`]);
    }
    rows.push(['Son tekrara kadar geçen süre', h.fmt(toplam, 0) + ' gün']);
    rows.push(['Aralık dizisi', araliklar.join(', ') + ' gün']);
    return { rows, note: 'Tarihler, kartı her tekrarda doğru hatırladığınız varsayımıyla hesaplanır. Hatırlayamadığınız kartı o günü ilk öğrenme tarihi kabul ederek yeniden zamanlayın.' };
  }
