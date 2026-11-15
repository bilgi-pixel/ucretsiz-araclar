// 10.000. Gün Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dogum = h.date(v.dogum, 'Doğum tarihi');
    const n = h.posint(v.gunSayisi, 'Gün sayısı');
    if (n > 60000) h.err('"Gün sayısı" en fazla 60000 olabilir (yaklaşık 164 yıl).');
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    if (dogum.getTime() > bugun.getTime()) h.err('Doğum tarihi bugünden sonra olamaz; tarihleri kontrol edin.');
    const hedef = h.gunEkle(dogum, n);
    const yasadigi = h.gunFarki(dogum, bugun);
    const fark = h.gunFarki(bugun, hedef);
    // Hedef gündeki yaş: yıl, ay, gün
    let y = hedef.getUTCFullYear() - dogum.getUTCFullYear();
    let m = hedef.getUTCMonth() - dogum.getUTCMonth();
    let d = hedef.getUTCDate() - dogum.getUTCDate();
    if (d < 0) {
      m -= 1;
      d += new Date(Date.UTC(hedef.getUTCFullYear(), hedef.getUTCMonth(), 0)).getUTCDate();
    }
    if (m < 0) { y -= 1; m += 12; }
    const durum = fark > 0 ? `${h.fmt(fark, 0)} gün kaldı` : fark < 0 ? `${h.fmt(-fark, 0)} gün önce geçti` : 'Tam bugün';
    const siradaki = (Math.floor(yasadigi / 1000) + 1) * 1000;
    return {
      rows: [
        ['Hedef gün tarihi', `${h.fmtDate(hedef)} ${h.gunAdi(hedef)}`],
        ['Durum', durum],
        ['O gün yaşınız', `${y} yıl ${m} ay ${d} gün`],
        ['Bugüne kadar yaşadığınız gün', `${h.fmt(yasadigi, 0)} gün`],
        ['Sıradaki bin günlük dönüm', `${h.fmt(siradaki, 0)}. gün – ${h.fmtDate(h.gunEkle(dogum, siradaki))}`],
      ],
      note: 'Doğum günü 0. gün sayılır; hedef tarih, doğum tarihine gün sayısının eklenmesiyle bulunur. Doğduğunuz günü 1. gün sayıyorsanız sonuç bir gün öncesidir.',
    };
  }
