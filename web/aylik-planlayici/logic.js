// Aylık Planlayıcı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.ay, 'Başlangıç ayı');
    const y0 = ilk.getUTCFullYear(), m0 = ilk.getUTCMonth();
    if (y0 < 1900 || y0 > 2200) h.err('Başlangıç ayı 1900 ile 2200 yılları arasında olmalı.');
    const n = h.posint(v.aySayisi, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir; daha uzun dönem için aracı ikinci kez çalıştırın.');
    const ek = (v.baslik || '').trim();
    if (ek.length > 40) h.err('Ek başlık en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const f = (p) => Math.max(5, p * k);
    const pazarBasi = v.haftaBasi === 'pazar';
    const GUN = pazarBasi
      ? ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
      : ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const bilgi = (i) => {
      const t = new Date(Date.UTC(y0, m0 + i, 1));
      const y = t.getUTCFullYear(), mo = t.getUTCMonth();
      const gunSay = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
      const kayma = pazarBasi ? t.getUTCDay() : (t.getUTCDay() + 6) % 7; // 1. günden önceki boş kutu sayısı
      return { t, y, mo, gunSay, kayma, sat: Math.ceil((kayma + gunSay) / 7) };
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = bilgi(i), ops = [];
      ops.push(['yazi', `${h.ayAdi(b.mo + 1)} ${b.y}`, m, m + 7.5 * k, f(20), { kalin: true }]);
      if (ek) ops.push(['yazi', ek, W - m, m + 7 * k, f(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 14 * k, alt = H - m, yanW = 46 * k, bosluk = 4 * k;
      const gw = (W - 2 * m - yanW - bosluk) / 7, bh = 7 * k, ch = (alt - ust - bh) / b.sat;
      // Gün adı şeridi
      for (let g = 0; g < 7; g++) {
        const hs = GUN[g] === 'Cumartesi' || GUN[g] === 'Pazar';
        ops.push(['kutu', m + g * gw, ust, gw, bh, { dolgu: hs ? 0.84 : 0.91, cizgi: 0.5 }]);
        ops.push(['yazi', GUN[g], m + (g + 0.5) * gw, ust + 5 * k, f(8.5), { kalin: true, hiza: 'orta' }]);
      }
      // Gün kutuları
      for (let r = 0; r < b.sat; r++) for (let g = 0; g < 7; g++) {
        const gunNo = r * 7 + g - b.kayma + 1, x = m + g * gw, y = ust + bh + r * ch;
        const hs = GUN[g] === 'Cumartesi' || GUN[g] === 'Pazar';
        if (gunNo < 1 || gunNo > b.gunSay) { ops.push(['kutu', x, y, gw, ch, { dolgu: 0.95, cizgi: 0.5 }]); continue; }
        ops.push(['kutu', x, y, gw, ch, hs ? { dolgu: 0.97, cizgi: 0.5 } : { cizgi: 0.5 }]);
        ops.push(['yazi', String(gunNo), x + 1.8 * k, y + 5.6 * k, f(11), { kalin: true, ton: hs ? 0.35 : 0.1 }]);
      }
      // Yan sütun: hedefler ve notlar
      const yx = W - m - yanW, hedefYuk = 7 * k + 4 * 8 * k + 3 * k;
      ops.push(['kutu', yx, ust, yanW, hedefYuk, { cizgi: 0.5 }]);
      ops.push(['kutu', yx, ust, yanW, bh, { dolgu: 0.91, cizgi: 0.5 }]);
      ops.push(['yazi', 'Bu ayın hedefleri', yx + 2 * k, ust + 5 * k, f(8.5), { kalin: true }]);
      for (let j = 0; j < 4; j++) {
        const yy = ust + bh + (j + 1) * 8 * k;
        ops.push(['kutu', yx + 2.5 * k, yy - 4 * k, 3.6 * k, 3.6 * k, { cizgi: 0.4 }]);
        ops.push(['cizgi', yx + 8 * k, yy, yx + yanW - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.7 }]);
      }
      const ny = ust + hedefYuk + bosluk;
      ops.push(['kutu', yx, ny, yanW, alt - ny, { cizgi: 0.5 }]);
      ops.push(['kutu', yx, ny, yanW, bh, { dolgu: 0.91, cizgi: 0.5 }]);
      ops.push(['yazi', 'Notlar', yx + 2 * k, ny + 5 * k, f(8.5), { kalin: true }]);
      for (let yy = ny + bh + 8 * k; yy < alt - 1.5 * k; yy += 8 * k) ops.push(['cizgi', yx + 2.5 * k, yy, yx + yanW - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      sayfalar.push(ops);
    }
    const b0 = bilgi(0), bs = bilgi(n - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', `${h.ayAdi(b0.mo + 1)} ${b0.y}`],
        ['Son ay', `${h.ayAdi(bs.mo + 1)} ${bs.y}`],
        ['İlk ayın 1. günü', h.gunAdi(b0.t)],
        ['İlk ayda gün sayısı', `${b0.gunSay} gün`],
        ['İlk ayda hafta satırı', `${b0.sat} satır`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'aylik-planlayici', baslik: ek || 'Aylık Plan', boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  }
