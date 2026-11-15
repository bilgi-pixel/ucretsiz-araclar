// Uptime (SLA) Kesinti Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sure = (sn) => {
      let s = Math.round(sn * 100) / 100;
      const g = Math.floor(s / 86400 + 1e-9); s -= g * 86400;
      const sa = Math.floor(s / 3600 + 1e-9); s -= sa * 3600;
      const dk = Math.floor(s / 60 + 1e-9); s -= dk * 60;
      s = Math.round(s * 100) / 100;
      const p = [];
      if (g) p.push(g + ' gün');
      if (sa) p.push(sa + ' sa');
      if (dk) p.push(dk + ' dk');
      if (s > 0.004) p.push(h.fmt(s, 2) + ' sn');
      return p.length ? p.join(' ') : '0 sn';
    };
    if (v.mod === 'kesinti') {
      const k = h.nonneg(v.kesinti, 'Kesinti süresi');
      const d = h.pos(v.donem, 'Dönem uzunluğu');
      const toplam = d * 1440;
      if (k > toplam + 1e-9) h.err('Kesinti süresi dönemin tamamından uzun olamaz. Dönem ' + h.fmt(toplam, 2) + ' dakikadır; değerleri kontrol edin.');
      const up = (1 - k / toplam) * 100;
      return {
        rows: [
          ['Gerçekleşen uptime', '%' + h.fmt(up, 4)],
          ['Kesinti oranı', '%' + h.fmt(100 - up, 4)],
          ['Çalışma süresi', sure((toplam - k) * 60)],
          ['Toplam kesinti', sure(k * 60)],
          ['Dönem', h.fmt(d, 2) + ' gün (' + h.fmt(toplam, 2) + ' dakika)'],
        ],
        note: 'Uptime = (dönem − kesinti) ÷ dönem × 100. Planlı bakımın hesaba girip girmediği sözleşmeye göre değişir.',
      };
    }
    const o = h.num(v.oran, 'Uptime yüzdesi');
    if (o < 0 || o > 100) h.err('Uptime yüzdesi 0 ile 100 arasında olmalı (örn. 99,9).');
    const pay = 1 - o / 100;
    return {
      rows: [
        ['Yıllık kesinti (365 gün)', sure(pay * 365 * 86400)],
        ['Aylık kesinti (30 gün)', sure(pay * 30 * 86400)],
        ['Haftalık kesinti', sure(pay * 7 * 86400)],
        ['Günlük kesinti', sure(pay * 86400)],
        ['Kesinti oranı', '%' + h.fmt(100 - o, 4)],
      ],
      note: 'Yıl 365 gün, ay 30 gün kabul edilmiştir. Sözleşmeniz takvim ayını (28–31 gün) esas alıyorsa aylık değer birkaç dakika oynar.',
    };
  }
