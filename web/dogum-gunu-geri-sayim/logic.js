// Doğum Gününe Kaç Gün Kaldı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dogum = h.date(v.dogum, 'Doğum tarihi');
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    if (dogum.getTime() > bugun.getTime()) h.err('Doğum tarihi bugünden ileri bir tarih olamaz. Tarihleri kontrol edin.');
    const ay = dogum.getUTCMonth();
    const gun = dogum.getUTCDate();
    const artik = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const kutlama = (y) => {
      let a = ay;
      let g = gun;
      if (ay === 1 && gun === 29 && !artik(y)) {
        if (v.subat === '1') { a = 2; g = 1; } else { g = 28; }
      }
      const d = new Date(Date.UTC(y, a, g));
      d.setUTCFullYear(y);
      return d;
    };
    let yil = bugun.getUTCFullYear();
    let hedef = kutlama(yil);
    if (hedef.getTime() < bugun.getTime()) { yil++; hedef = kutlama(yil); }
    const kalan = h.gunFarki(bugun, hedef);
    const yeniYas = yil - dogum.getUTCFullYear();
    const simdiki = kalan === 0 ? yeniYas : yeniYas - 1;
    const yilGun = h.gunFarki(kutlama(yil - 1), hedef);
    const hafta = Math.floor(kalan / 7);
    const rows = [
      ['Kalan süre', kalan === 0 ? '0 gün (doğum günü bugün)' : `${kalan} gün`],
      ['Sıradaki doğum günü', `${h.fmtDate(hedef)} ${h.gunAdi(hedef)}`],
      ['Girilecek yaş', `${yeniYas}`],
      ['Şu anki yaş', `${simdiki}`],
      ['Hafta olarak', `${hafta} hafta ${kalan % 7} gün`],
      ['Saat olarak', `${h.fmt(kalan * 24, 0)} saat`],
      ['Yaş yılının geçen kısmı', '%' + h.fmt(kalan === 0 ? 0 : ((yilGun - kalan) / yilGun) * 100, 1)],
    ];
    return {
      rows,
      note: `${h.fmtDate(bugun)} tarihine göre hesaplandı. Kalan gün, bugün ile doğum günü arasındaki takvim günü farkıdır; doğum saati dikkate alınmaz.`,
    };
  }
