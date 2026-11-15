// Küçük Harcamaların Yıllık Tutarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tutar = h.pos(v.tutar, 'Bir seferlik harcama');
    const adet = h.pos(v.adet, 'Kaç kez');
    const yil = h.posint(v.yil, 'Yıl sayısı');
    if (yil > 60) h.err('"Kaç yıl boyunca" en fazla 60 olabilir.');
    const kat = v.periyot === 'hafta' ? 52 : v.periyot === 'ay' ? 12 : 365;
    if (v.periyot !== 'hafta' && v.periyot !== 'ay' && adet > 50) h.err('Günde 50\'den fazla tekrar girilemez; sıklığı kontrol edin.');
    const tekrar = adet * kat;
    const yillik = tutar * tekrar;
    const rows = [
      ['Yıllık tutar', h.para(yillik)],
      ['Aylık ortalama', h.para(yillik / 12)],
      ['Haftalık ortalama', h.para(yillik / 52)],
      ['Günlük ortalama', h.para(yillik / 365)],
      ['Yılda tekrar sayısı', `${h.fmt(tekrar, 1)} kez`],
      ['Seçilen sürede toplam', `${h.para(yillik * yil)} (${yil} yıl)`],
    ];
    let note = 'Bir yıl 365 gün, 52 hafta ve 12 ay kabul edilmiştir; fiyatın süre boyunca değişmediği varsayılır.';
    if (String(v.getiri || '').trim() !== '') {
      const r = h.nonneg(v.getiri, 'Yıllık getiri oranı') / 100;
      if (r > 10) h.err('"Yıllık getiri oranı" en fazla %1000 olabilir.');
      const fv = r === 0 ? yillik * yil : yillik * (Math.pow(1 + r, yil) - 1) / r;
      rows.push(['Biriktirilseydi ulaşacağı tutar', h.para(fv)]);
      note += ' Birikim satırı, yıllık tutarın her yılın sonunda yatırıldığını ve girdiğiniz oranda yıllık bileşik getiri sağladığını varsayar; gerçek getiri garanti edilemez.';
    }
    return { rows, note };
  }
