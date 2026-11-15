// İki Tarih Arası Ay Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let a = h.date(v.baslangic, 'Başlangıç tarihi');
    let b = h.date(v.bitis, 'Bitiş tarihi');
    let ters = false;
    if (b.getTime() < a.getTime()) { const t = a; a = b; b = t; ters = true; }
    const ayGun = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    // Başlangıca n ay ekler; hedef ayda o gün yoksa ayın son gününe çeker.
    const ayEkle = (d, n) => {
      const top = d.getUTCFullYear() * 12 + d.getUTCMonth() + n;
      const y = Math.floor(top / 12), m = top % 12;
      const dt = new Date(Date.UTC(2000, m, Math.min(d.getUTCDate(), ayGun(y, m))));
      dt.setUTCFullYear(y);
      return dt;
    };
    const takvim = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
    let ay = takvim;
    if (ayEkle(a, ay).getTime() > b.getTime()) ay -= 1;
    const gun = h.gunFarki(ayEkle(a, ay), b);
    const toplam = h.gunFarki(a, b);
    const yil = Math.floor(ay / 12), kalanAy = ay % 12;
    return {
      rows: [
        ['Tam ay sayısı', `${h.fmt(ay, 0)} ay`],
        ['Ay ve gün', `${h.fmt(ay, 0)} ay ${gun} gün`],
        ['Yıl, ay, gün', `${yil} yıl ${kalanAy} ay ${gun} gün`],
        ['Toplam gün', `${h.fmt(toplam, 0)} gün`],
        ['Ondalık ay (ortalama ay uzunluğuyla)', `${h.fmt(toplam / 30.436875, 2)} ay`],
        ['Takvim ayı farkı', `${h.fmt(takvim, 0)} ay`],
      ],
      note: (ters ? 'Bitiş tarihi başlangıçtan önce olduğu için tarihler yer değiştirilerek hesaplandı. ' : '')
        + 'Bitiş günü sayıma dahil değildir. Ayın 29, 30 ya da 31\'inde başlayan sürelerde, hedef ayda o gün yoksa ay dönümü ayın son günü kabul edilir.',
    };
  }
