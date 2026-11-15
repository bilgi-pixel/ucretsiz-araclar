// Bütünleme Geçme Notu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const vize = h.nonneg(v.vize, 'Vize notu');
    const w = h.pos(v.agirlik, 'Vizenin ağırlığı');
    const gecme = h.pos(v.gecme, 'Geçme notu');
    const baraj = h.nonneg(h.opt(v.baraj, 0, 'Bütünleme barajı') + '', 'Bütünleme barajı');
    if (vize > 100) h.err('Vize notu 0 ile 100 arasında olmalı.');
    if (w >= 100) h.err('Vizenin ağırlığı 100\'den küçük olmalı; kalan pay bütünlemeye aittir.');
    if (gecme > 100) h.err('Geçme notu 100\'den büyük olamaz.');
    if (baraj > 100) h.err('Bütünleme barajı 100\'den büyük olamaz.');
    const wb = 100 - w;
    const katki = vize * w / 100;
    const ham = (gecme - katki) / (wb / 100);
    const gereken = Math.max(ham, baraj, 0);
    const yuvar = Math.ceil(gereken * 100 - 1e-7) / 100;
    const mumkun = yuvar <= 100 + 1e-9;
    let durum;
    if (!mumkun) durum = 'Bütünlemeden 100 alınsa bile geçme notuna ulaşılamıyor';
    else if (ham <= baraj + 1e-9 && baraj > 0) durum = 'Baraj belirleyici: barajı aşmanız yeterli';
    else if (yuvar <= 0) durum = 'Vize notu tek başına yetiyor';
    else durum = 'Ortalama belirleyici: bu notla ortalama geçme notuna ulaşır';
    const rows = [
      ['Gereken en düşük bütünleme notu', mumkun ? h.fmt(yuvar, 2) : 'Geçmek mümkün değil'],
      ['Durum', durum],
      ['Vizeden gelen katkı', h.fmt(katki, 2) + ' puan'],
      ['Bütünlemenin ağırlığı', '%' + h.fmt(wb, 2)],
      ['Bütünlemeden 100 alınırsa ortalama', h.fmt(katki + wb, 2)],
    ];
    if (String(v.but ?? '').trim() !== '') {
      const b = h.nonneg(v.but, 'Bütünleme notu');
      if (b > 100) h.err('Bütünleme notu 0 ile 100 arasında olmalı.');
      const ort = katki + b * wb / 100;
      const gecti = ort >= gecme - 1e-9 && b >= baraj - 1e-9;
      rows.push(['Dönem sonu ortalaması', h.fmt(ort, 2)]);
      rows.push(['Sonuç', gecti ? 'Geçti' : (b < baraj - 1e-9 ? 'Kaldı (baraj altı)' : 'Kaldı (ortalama yetersiz)')]);
    }
    return { rows, note: 'Bütünleme notu final notunun yerine geçer varsayılmıştır. Bağıl değerlendirme (çan eğrisi) uygulanan derslerde sonuç farklı olabilir; kendi yönetmeliğinizi kontrol edin.' };
  }
