// Güneş Paneli İhtiyacı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = h.pos(v.tuketim, 'Elektrik tüketimi');
    const gunluk = v.donem === 'gun' ? t : t / 30;
    const saat = h.pos(v.gunes, 'Günlük eşdeğer güneş saati');
    if (saat > 12) h.err('"Günlük eşdeğer güneş saati" 12\'den büyük olamaz; tipik değerler 3 ile 6 arasındadır.');
    const pw = h.pos(v.panel, 'Tek panelin gücü');
    const kayip = h.nonneg(v.kayip, 'Sistem kaybı');
    if (kayip >= 100) h.err('"Sistem kaybı" %100\'den küçük olmalı; tipik değer %15 ile %25 arasındadır.');
    const verim = 1 - kayip / 100;
    const gerekli = gunluk / (saat * verim); // kWp
    const adet = Math.max(1, Math.ceil(gerekli * 1000 / pw - 1e-9));
    const kurulu = adet * pw / 1000;
    const uretim = kurulu * saat * verim;
    return {
      rows: [
        ['Gereken panel sayısı', h.fmt(adet, 0) + ' adet'],
        ['Gereken kurulu güç', h.fmt(gerekli, 2) + ' kWp'],
        ['Panellerin toplam gücü', h.fmt(kurulu, 2) + ' kWp'],
        ['Günlük tüketim', h.fmt(gunluk, 2) + ' kWh'],
        ['Tahmini günlük üretim', h.fmt(uretim, 2) + ' kWh'],
        ['Tahmini aylık üretim (30 gün)', h.fmt(uretim * 30, 1) + ' kWh'],
        ['Tahmini yıllık üretim (365 gün)', h.fmt(uretim * 365, 0) + ' kWh'],
      ],
      note: 'Sonuç, girdiğiniz ortalama güneş saatine dayanan bir ön boyutlandırmadır; kesin tasarım için yerinde keşif gerekir.',
    };
  }
