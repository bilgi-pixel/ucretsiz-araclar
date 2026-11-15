// Maraton ve Yarış Süresi Tahmini — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const d1 = h.pos(v.mesafe, 'Bilinen yarış mesafesi');
    const d2 = h.pos(h.opt(v.hedef, 42.195, 'Hedef mesafe') + '', 'Hedef mesafe');
    const k = h.opt(v.katsayi, 1.06, 'Yorgunluk katsayısı');
    if (d1 < 1 || d1 > 250) h.err('Bilinen yarış mesafesi 1 ile 250 km arasında olmalı.');
    if (d2 < 1 || d2 > 250) h.err('Hedef mesafe 1 ile 250 km arasında olmalı.');
    if (k < 1 || k > 1.3) h.err('Yorgunluk katsayısı 1 ile 1,3 arasında olmalı. Standart değer 1,06\'dır.');
    const ham = String(v.sure ?? '').trim();
    if (ham === '') h.err('"Bilinen yarış süresi" alanını doldurun (örn. 50:00).');
    let t1;
    if (ham.includes(':')) {
      const p = ham.split(':').map((x) => x.trim());
      if (p.length > 3 || p.some((x) => !/^\d+([.,]\d+)?$/.test(x))) h.err('Süreyi saat:dakika:saniye ya da dakika:saniye biçiminde yazın (örn. 1:45:30).');
      const n = p.map((x) => Number(x.replace(',', '.')));
      if (p.length === 3) {
        if (n[1] >= 60 || n[2] >= 60) h.err('Dakika ve saniye 60\'tan küçük olmalı.');
        t1 = n[0] * 3600 + n[1] * 60 + n[2];
      } else {
        if (n[1] >= 60) h.err('Saniye 60\'tan küçük olmalı.');
        t1 = n[0] * 60 + n[1];
      }
    } else {
      t1 = h.pos(ham, 'Bilinen yarış süresi') * 60;
    }
    if (!(t1 > 0)) h.err('Süre sıfırdan büyük olmalı.');
    const tempo1 = t1 / d1;
    if (tempo1 < 120 || tempo1 > 1800) h.err('Girdiğiniz mesafe ve süre 2:00 ile 30:00 dk/km arasında bir tempoya denk gelmiyor. Değerleri kontrol edin.');
    const bicim = (s) => {
      const t = Math.round(s);
      const sa = Math.floor(t / 3600), d = Math.floor((t % 3600) / 60), ss = t % 60;
      return sa > 0 ? `${sa}:${String(d).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${d}:${String(ss).padStart(2, '0')}`;
    };
    const tahmin = (d) => t1 * Math.pow(d / d1, k);
    const t2 = tahmin(d2);
    return {
      rows: [
        ['Tahmini süre', bicim(t2)],
        ['Gereken tempo', bicim(t2 / d2) + ' dk/km'],
        ['Hedef mesafe', h.fmt(d2, 4) + ' km'],
        ['Bilinen yarış temposu', bicim(tempo1) + ' dk/km'],
        ['5 km tahmini', bicim(tahmin(5))],
        ['10 km tahmini', bicim(tahmin(10))],
        ['Yarı maraton tahmini', bicim(tahmin(21.0975))],
        ['Maraton tahmini', bicim(tahmin(42.195))],
      ],
      note: 'Tahmin, hedef mesafeye uygun antrenman yaptığınızı ve benzer parkur ve hava koşullarını varsayar.',
    };
  }
