// Aylık Faizi Yıllık Faize Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.oran, 'Faiz oranı');
    if (x > 100000) h.err('Oran çok büyük; değeri yüzde olarak yazın (örn. 3,5).');
    const r = x / 100;
    if (v.yon === 'yil') {
      const basit = r / 12;
      const bilesik = Math.pow(1 + r, 1 / 12) - 1;
      return {
        rows: [
          ['Aylık faiz (basit, yıllık ÷ 12)', '%' + h.fmt(basit * 100, 4)],
          ['Aylık faiz (bileşik eşdeğer)', '%' + h.fmt(bilesik * 100, 4)],
          ['Günlük faiz (basit, yıllık ÷ 365)', '%' + h.fmt((r / 365) * 100, 5)],
          ['Yıllık oran', '%' + h.fmt(x, 4)],
        ],
        note: 'Basit: aylık = yıllık ÷ 12. Bileşik eşdeğer: aylık = (1 + yıllık)^(1/12) − 1; bu oran 12 ay bileşiklendiğinde tam olarak yıllık oranı verir.',
      };
    }
    if (r > 10) h.err('Aylık oran %1.000\'den büyük olamaz; değeri kontrol edin.');
    const basit = r * 12;
    const bilesik = Math.pow(1 + r, 12) - 1;
    return {
      rows: [
        ['Yıllık faiz (basit, aylık × 12)', '%' + h.fmt(basit * 100, 4)],
        ['Yıllık faiz (bileşik, efektif)', '%' + h.fmt(bilesik * 100, 4)],
        ['Günlük faiz (basit, aylık ÷ 30)', '%' + h.fmt((r / 30) * 100, 5)],
        ['Aylık oran', '%' + h.fmt(x, 4)],
      ],
      note: 'Basit: yıllık = aylık × 12. Bileşik: yıllık = (1 + aylık)^12 − 1; faizin her ay anaparaya eklendiği durumdaki gerçek yıllık orandır.',
    };
  }
