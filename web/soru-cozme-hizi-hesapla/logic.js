// Soru Çözme Hızı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const soru = h.pos(v.soru, 'Çözülen soru sayısı');
    const sure = h.pos(v.sure, 'Harcanan süre');
    const dolu = (s) => String(s ?? '').trim() !== '';
    const hs = dolu(v.hedefSoru) ? h.pos(v.hedefSoru, 'Sınavdaki soru sayısı') : null;
    const ht = dolu(v.hedefSure) ? h.pos(v.hedefSure, 'Sınav süresi') : null;
    const sn = (s) => {
      const dk = Math.floor(s / 60 + 1e-9);
      const kalan = Math.max(0, s - dk * 60);
      return dk > 0 ? `${dk} dk ${h.fmt(kalan, 1)} sn` : `${h.fmt(kalan, 1)} sn`;
    };
    const basi = (sure * 60) / soru; // saniye
    const rows = [
      ['Soru başına süre', sn(basi)],
      ['Dakikada çözülen soru', `${h.fmt(soru / sure, 2)} soru`],
      ['Saatte çözülen soru', `${h.fmt((soru / sure) * 60, 1)} soru`],
    ];
    if (hs !== null) rows.push(['Bu hızla sınavın süreceği zaman', `${h.fmt((hs * basi) / 60, 2)} dakika`]);
    if (ht !== null) rows.push(['Sınav süresinde çözülebilecek soru', `${h.fmt(Math.floor((ht * 60) / basi + 1e-9), 0)} soru`]);
    if (hs !== null && ht !== null) {
      rows.push(['Sınav için gereken soru başı süre', sn((ht * 60) / hs)]);
      const fark = ht - (hs * basi) / 60;
      rows.push(['Durum', Math.abs(fark) < 1e-9 ? 'Tam yetişiyor; hiç pay kalmıyor'
        : fark > 0 ? `Yetişiyor; ${h.fmt(fark, 2)} dakika artar` : `Yetişmiyor; ${h.fmt(-fark, 2)} dakika daha gerekir`]);
    }
    return { rows, note: 'Hesap, tüm soruların ortalama hızla çözüldüğünü varsayar; işaretleme ve kontrol süresi ayrıca düşünülmelidir.' };
  }
