// Ay Kaç Gün Çekiyor Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ay = Number(v.ay);
    if (!(ay >= 1 && ay <= 12)) h.err('Listeden bir ay seçin.');
    const yil = h.int(v.yil, 'Yıl');
    if (yil < 1583 || yil > 9999) h.err('Yıl 1583 ile 9999 arasında olmalı (Miladi takvim).');
    const artik = (yil % 4 === 0 && yil % 100 !== 0) || yil % 400 === 0;
    const gunler = [31, artik ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const n = gunler[ay - 1];
    const ilk = new Date(Date.UTC(yil, ay - 1, 1));
    const son = new Date(Date.UTC(yil, ay - 1, n));
    let haftaIci = 0;
    let haftaSonu = 0;
    for (let i = 0; i < n; i++) {
      const g = (ilk.getUTCDay() + i) % 7;
      if (g === 0 || g === 6) haftaSonu++; else haftaIci++;
    }
    const tam = Math.floor(n / 7);
    const artan = n % 7;
    return {
      rows: [
        ['Ayın uzunluğu', `${n} gün`],
        ['İlk gün', `${h.fmtDate(ilk)} ${h.gunAdi(ilk)}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Hafta içi günleri', `${haftaIci} gün`],
        ['Hafta sonu günleri', `${haftaSonu} gün`],
        ['Hafta olarak', artan ? `${tam} hafta ${artan} gün` : `${tam} hafta`],
        ['Saat olarak', `${h.fmt(n * 24, 0)} saat`],
        ['Yıl', artik ? `${yil} artık yıl (366 gün)` : `${yil} artık yıl değil (365 gün)`],
      ],
      note: `${h.ayAdi(ay)} ${yil} için hesaplandı. Hafta içi sayısı Pazartesi–Cuma günlerini kapsar; resmî tatiller düşülmemiştir.`,
    };
  }
