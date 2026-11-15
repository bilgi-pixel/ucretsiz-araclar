// Yazıcı Sayfa Başı Maliyet Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const fiyat = h.nonneg(v.sarfFiyat, 'Toner / kartuş fiyatı');
    const verim = h.pos(v.sarfVerim, 'Kartuşun sayfa verimi');
    const dol = h.opt(v.doluluk, 5, 'Gerçek doluluk oranı');
    if (!(dol > 0) || dol > 100) h.err('Doluluk oranı 0 ile 100 arasında olmalı; emin değilseniz 5 yazın.');
    const gercekVerim = verim * 5 / dol;
    const sarf = fiyat / gercekVerim;
    let kagit = 0, drum = 0;
    if (!bos(v.kagitFiyat)) {
      const kf = h.nonneg(v.kagitFiyat, 'Kâğıt paketi fiyatı');
      const ka = h.opt(v.kagitAdet, 500, 'Paketteki yaprak sayısı');
      if (!(ka > 0)) h.err('"Paketteki yaprak sayısı" sıfırdan büyük olmalı.');
      kagit = kf / ka;
    }
    if (!bos(v.drumFiyat) || !bos(v.drumVerim)) {
      if (bos(v.drumFiyat) || bos(v.drumVerim)) h.err('Drum giderini eklemek için hem drum fiyatını hem drum ömrünü yazın ya da ikisini de boş bırakın.');
      drum = h.nonneg(v.drumFiyat, 'Drum ünitesi fiyatı') / h.pos(v.drumVerim, 'Drum ömrü');
    }
    const toplam = sarf + kagit + drum;
    const rows = [
      ['Sayfa başı maliyet', h.fmt(toplam, 4) + ' TL'],
      ['Kuruş karşılığı', h.fmt(toplam * 100, 2) + ' kuruş'],
      ['Toner / mürekkep payı', h.fmt(sarf, 4) + ' TL'],
    ];
    if (kagit > 0) rows.push(['Kâğıt payı', h.fmt(kagit, 4) + ' TL']);
    if (drum > 0) rows.push(['Drum payı', h.fmt(drum, 4) + ' TL']);
    rows.push(['Gerçek kartuş verimi', h.fmt(gercekVerim, 0) + ' sayfa']);
    if (!bos(v.aylikSayfa)) {
      const ay = h.nonneg(v.aylikSayfa, 'Aylık baskı adedi');
      rows.push(['Aylık baskı maliyeti', h.para(toplam * ay)]);
      rows.push(['Yıllık baskı maliyeti', h.para(toplam * ay * 12)]);
    }
    return {
      rows,
      note: 'Kutudaki verim %5 doluluk içindir; gerçek verim = verim × 5 ÷ doluluk. Elektrik, bakım ve cihazın satın alma bedeli hesaba katılmamıştır.',
    };
  }
