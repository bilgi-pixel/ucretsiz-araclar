// Yılın Kaçıncı Günü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const d = h.dateOrToday(v.tarih, 'Tarih');
    const y = d.getUTCFullYear();
    if (y < 1583 || y > 9999) h.err('Yıl 1583 ile 9999 arasında olmalı (Miladi takvim).');
    const bas = new Date(Date.UTC(y, 0, 1));
    bas.setUTCFullYear(y);
    const sira = h.gunFarki(bas, d) + 1;
    const artik = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const toplam = artik ? 366 : 365;
    const kalan = toplam - sira;
    return {
      rows: [
        ['Yılın günü', `${sira}. gün`],
        ['Yıl sonuna kalan', `${kalan} gün`],
        ['Yılın uzunluğu', `${toplam} gün (${artik ? 'artık yıl' : 'artık yıl değil'})`],
        ['Yılın geçen kısmı', '%' + h.fmt((sira / toplam) * 100, 2)],
        ['Haftanın günü', h.gunAdi(d)],
        ['Sıralı tarih gösterimi', `${y}-${String(sira).padStart(3, '0')}`],
      ],
      note: `${h.fmtDate(d)} tarihi için hesaplandı. Seçilen gün sayıma dahildir; 1 Ocak yılın 1. günüdür.`,
    };
  }
