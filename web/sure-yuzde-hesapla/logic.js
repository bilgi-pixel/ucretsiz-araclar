// Yılın Yüzde Kaçı Geçti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = h.dateOrToday(v.tarih, 'Tarih');
    const y = t.getUTCFullYear();
    const yilBasi = new Date(Date.UTC(y, 0, 1)); yilBasi.setUTCFullYear(y);
    const sonrakiYil = new Date(Date.UTC(y + 1, 0, 1)); sonrakiYil.setUTCFullYear(y + 1);
    const toplam = h.gunFarki(yilBasi, sonrakiYil);
    const sira = h.gunFarki(yilBasi, t) + 1;
    const gecen = v.say === 'son' ? sira : sira - 1;
    const kalan = toplam - gecen;
    const yuzde = gecen / toplam * 100;
    const ay = t.getUTCMonth();
    const ayGun = new Date(Date.UTC(2000, ay + 1, 0)).getUTCDate() - (ay === 1 && toplam === 365 ? 1 : 0);
    const ayGecen = v.say === 'son' ? t.getUTCDate() : t.getUTCDate() - 1;
    const dolu = Math.round(yuzde / 5);
    const cubuk = '▓'.repeat(dolu) + '░'.repeat(20 - dolu);
    return {
      rows: [
        ['Yılın geçen kısmı', '%' + h.fmt(yuzde, 2)],
        ['Yılın kalan kısmı', '%' + h.fmt(100 - yuzde, 2)],
        ['Geçen gün', `${gecen} gün`],
        ['Kalan gün', `${kalan} gün`],
        ['Yılın kaçıncı günü', `${sira}. gün (${y} yılı ${toplam} gün)`],
        [`${h.ayAdi(ay + 1)} ayının geçen kısmı`, '%' + h.fmt(ayGecen / ayGun * 100, 2)],
        ['İlerleme çubuğu', `${cubuk} %${h.fmt(yuzde, 0)}`],
      ],
      note: v.say === 'son' ? 'Seçilen gün tamamlanmış sayıldı; kalan gün sayısına bugün dahil değildir.' : 'Seçilen gün henüz başlamış sayıldı; kalan gün sayısına bugün dahildir.',
    };
  }
