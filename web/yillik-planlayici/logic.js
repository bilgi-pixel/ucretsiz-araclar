// Yıllık Planlayıcı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const yil = String(v.yil ?? '').trim() === '' ? h.dateOrToday('').getUTCFullYear() : h.int(v.yil, 'Yıl');
    if (yil < 1900 || yil > 2200) h.err('Yıl 1900 ile 2200 arasında olmalı (örn. 2027).');
    const n = h.posint(v.yilSayisi, 'Yıl sayısı');
    if (n > 10) h.err('Yıl sayısı en fazla 10 olabilir.');
    if (yil + n - 1 > 2200) h.err('Son yıl 2200 yılını geçemez; yıl sayısını azaltın.');
    const ek = (v.baslik || '').trim();
    if (ek.length > 40) h.err('Ek başlık en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5', takvim = v.duzen === 'takvim';
    const k = a5 ? 0.7 : 1;
    const [kisa, uzun] = a5 ? [148, 210] : [210, 297];
    const W = takvim ? kisa : uzun, H = takvim ? uzun : kisa;
    const m = takvim ? (a5 ? 9 : 12) : (a5 ? 7 : 10);
    const f = (p) => Math.max(5, p * k);
    const gunSay = (y, mo) => new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
    const KISA = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']; // getUTCDay sırası
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const y = yil + i, ops = [];
      ops.push(['yazi', String(y), m, m + 7 * k, f(20), { kalin: true }]);
      ops.push(['yazi', ek || 'Yıllık Plan', W - m, m + 7 * k, f(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 13 * k;
      if (!takvim) {
        // 12 ay sütunu × 31 gün satırı
        const bh = 6 * k, cw = (W - 2 * m) / 12, rh = (H - m - ust - bh) / 31;
        for (let mo = 0; mo < 12; mo++) {
          const x = m + mo * cw, gs = gunSay(y, mo);
          ops.push(['kutu', x, ust, cw, bh, { dolgu: 0.88, cizgi: 0.45 }]);
          ops.push(['yazi', h.ayAdi(mo + 1), x + cw / 2, ust + 4.3 * k, f(8), { kalin: true, hiza: 'orta' }]);
          for (let d = 1; d <= 31; d++) {
            const yy = ust + bh + (d - 1) * rh;
            if (d > gs) { ops.push(['kutu', x, yy, cw, rh, { dolgu: 0.8, cizgi: 0.45 }]); continue; }
            const g = new Date(Date.UTC(y, mo, d)).getUTCDay(), hs = g === 0 || g === 6;
            ops.push(['kutu', x, yy, cw, rh, hs ? { dolgu: 0.92, cizgi: 0.45 } : { cizgi: 0.45 }]);
            ops.push(['yazi', String(d), x + 3.6 * k, yy + rh * 0.7, f(6.5), { kalin: true, hiza: 'sag' }]);
            ops.push(['yazi', KISA[g], x + 4.3 * k, yy + rh * 0.7, f(5.5), { ton: 0.45 }]);
          }
        }
      } else {
        // 3 × 4 küçük takvim, altta not alanı
        const bosluk = 5 * k, notYuk = 32 * k, alanYuk = H - m - notYuk - bosluk - ust;
        const bw = (W - 2 * m - 2 * bosluk) / 3, byuk = (alanYuk - 3 * bosluk) / 4, cw = bw / 7, rh = (byuk - 13 * k) / 6;
        const HARF = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
        for (let mo = 0; mo < 12; mo++) {
          const x = m + (mo % 3) * (bw + bosluk), yy = ust + Math.floor(mo / 3) * (byuk + bosluk);
          ops.push(['yazi', h.ayAdi(mo + 1), x + 1 * k, yy + 4.6 * k, f(10), { kalin: true }]);
          ops.push(['cizgi', x, yy + 6.2 * k, x + bw, yy + 6.2 * k, { kalinlik: 0.4, ton: 0.3 }]);
          for (let g = 0; g < 7; g++) ops.push(['yazi', HARF[g], x + (g + 0.5) * cw, yy + 10.8 * k, f(6.5), { hiza: 'orta', ton: g >= 5 ? 0.55 : 0.4 }]);
          const kayma = (new Date(Date.UTC(y, mo, 1)).getUTCDay() + 6) % 7, gs = gunSay(y, mo);
          for (let d = 1; d <= gs; d++) {
            const p = kayma + d - 1, c = p % 7, r = Math.floor(p / 7);
            ops.push(['yazi', String(d), x + (c + 0.5) * cw, yy + 13 * k + (r + 0.72) * rh, f(8), { hiza: 'orta', ton: c >= 5 ? 0.5 : 0.05 }]);
          }
        }
        const ny = H - m - notYuk;
        ops.push(['kutu', m, ny, W - 2 * m, notYuk, { cizgi: 0.5 }]);
        ops.push(['yazi', 'Yılın önemli tarihleri ve notlar', m + 2 * k, ny + 5.2 * k, f(8.5), { kalin: true }]);
        for (let yq = ny + 12 * k; yq < ny + notYuk - 2 * k; yq += 7 * k) ops.push(['cizgi', m + 2.5 * k, yq, W - m - 2.5 * k, yq, { kalinlik: 0.2, ton: 0.75 }]);
      }
      sayfalar.push(ops);
    }
    const artik = (yil % 4 === 0 && yil % 100 !== 0) || yil % 400 === 0;
    const boyutAd = a5 ? (takvim ? 'A5 dikey (148 × 210 mm)' : 'A5 yatay (210 × 148 mm)') : (takvim ? 'A4 dikey (210 × 297 mm)' : 'A4 yatay (297 × 210 mm)');
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['Yıl', n === 1 ? String(yil) : `${yil} – ${yil + n - 1}`],
        ['İlk yılın gün sayısı', artik ? '366 gün (artık yıl)' : '365 gün'],
        ['1 Ocak', h.gunAdi(new Date(Date.UTC(yil, 0, 1)))],
        ['31 Aralık', h.gunAdi(new Date(Date.UTC(yil, 11, 31)))],
        ['Düzen', takvim ? 'On iki küçük takvim' : 'Yıl çizelgesi'],
        ['Kâğıt', boyutAd],
      ],
      note: `Yazdırırken kâğıt yönünü ${takvim ? 'dikey' : 'yatay'}, ölçeği "gerçek boyut" (%100) seçin.`,
      pdf: { ad: 'yillik-planlayici', baslik: ek || 'Yıllık Plan', boyut: a5 ? 'a5' : 'a4', yatay: !takvim, sayfalar },
    };
  }
