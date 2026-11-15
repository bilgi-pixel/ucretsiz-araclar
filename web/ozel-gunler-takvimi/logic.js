// Doğum Günü ve Özel Günler Takvimi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const baslik = (v.baslik || '').trim() || 'Özel Günler Takvimi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const satirlar = h.lines(v.kayitlar);
    if (satirlar.length > 120) h.err('En fazla 120 kayıt yazabilirsiniz.');
    const AYGUN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 29 Şubat doğumlular için şubat 29 gün
    const duzen = v.duzen === 'iki' ? 'iki' : v.duzen === 'aylik' ? 'aylik' : 'tek';
    const kapasite = duzen === 'tek' ? 7 : duzen === 'iki' ? 12 : 31;
    // Kayıtları çöz: "14.03 Ad", "14/3 Ad", "14.03 - Ad"
    const aylar = Array.from({ length: 12 }, () => []);
    satirlar.forEach((s, i) => {
      const e = /^(\d{1,2})\s*[./-]\s*(\d{1,2})\.?\s*[:–-]?\s*(.+)$/.exec(s);
      if (!e) h.err(`${i + 1}. satır anlaşılamadı: "${s.slice(0, 30)}". Biçim "14.03 Ad" olmalı (gün.ay, sonra boşluk ve ad).`);
      const gun = +e[1], ay = +e[2], ad = e[3].trim();
      if (ay < 1 || ay > 12) h.err(`${i + 1}. satırda ay 1 ile 12 arasında olmalı (yazılan: ${ay}).`);
      if (gun < 1 || gun > AYGUN[ay - 1]) h.err(`${i + 1}. satırdaki tarih takvimde yok: ${gun} ${h.ayAdi(ay)}.`);
      if (ad.length > 28) h.err(`${i + 1}. satırdaki ad 28 karakterden uzun; kısaltın.`);
      aylar[ay - 1].push({ gun, ad, sira: i });
    });
    aylar.forEach((a) => a.sort((x, y) => x.gun - y.gun || x.sira - y.sira));
    aylar.forEach((a, mo) => {
      if (duzen !== 'aylik' && a.length > kapasite) h.err(`${h.ayAdi(mo + 1)} ayında ${a.length} kayıt var; bu düzende ay başına en fazla ${kapasite} satır bulunur. Daha geniş bir düzen seçin.`);
      if (duzen === 'aylik') for (let g = 1; g <= 31; g++) if (a.filter((k) => k.gun === g).length > 3) h.err(`${g} ${h.ayAdi(mo + 1)} için üçten fazla kayıt var; aynı güne en fazla üç ad sığar.`);
    });
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const ust = m + 14 * k, tw = W - 2 * m;
    const tepe = (ops, sag, buyuk) => {
      ops.push(['yazi', baslik, m, m + 7 * k, f(buyuk ? 14 : 17), { kalin: true }]);
      ops.push(['yazi', sag, W - m, m + 7 * k, f(buyuk ? 15 : 9.5), buyuk ? { hiza: 'sag', kalin: true, ton: 0.25 } : { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
    };
    const sayfalar = [];
    if (duzen !== 'aylik') {
      const sutun = duzen === 'tek' ? 3 : 2, sira = duzen === 'tek' ? 4 : 3, bosluk = 4 * k, bh = 7 * k;
      const bw = (tw - (sutun - 1) * bosluk) / sutun, byuk = (H - m - ust - (sira - 1) * bosluk) / sira, rh = (byuk - bh) / kapasite;
      for (let s = 0; s < 12 / (sutun * sira); s++) {
        const ops = [];
        tepe(ops, duzen === 'tek' ? 'Her yıl kullanılır' : (s === 0 ? 'Ocak – Haziran' : 'Temmuz – Aralık'));
        for (let j = 0; j < sutun * sira; j++) {
          const mo = s * sutun * sira + j, x = m + (j % sutun) * (bw + bosluk), y = ust + Math.floor(j / sutun) * (byuk + bosluk);
          ops.push(['kutu', x, y, bw, byuk, { cizgi: 0.5 }]);
          ops.push(['kutu', x, y, bw, bh, { dolgu: 0.9, cizgi: 0.5 }]);
          ops.push(['yazi', h.ayAdi(mo + 1), x + 2 * k, y + 5 * k, f(9.5), { kalin: true }]);
          ops.push(['cizgi', x + 9 * k, y + bh, x + 9 * k, y + byuk, { kalinlik: 0.2, ton: 0.7 }]);
          for (let r = 0; r < kapasite; r++) {
            const yy = y + bh + r * rh;
            if (r > 0) ops.push(['cizgi', x, yy, x + bw, yy, { kalinlik: 0.2, ton: 0.75 }]);
            const kay = aylar[mo][r];
            if (kay) {
              ops.push(['yazi', String(kay.gun), x + 7.6 * k, yy + rh / 2 + 1.1 * k, f(8.5), { kalin: true, hiza: 'sag' }]);
              ops.push(['yazi', kay.ad, x + 10.8 * k, yy + rh / 2 + 1.1 * k, f(8)]);
            }
          }
        }
        sayfalar.push(ops);
      }
    } else {
      for (let mo = 0; mo < 12; mo++) {
        const ops = [], gs = AYGUN[mo], rh = (H - m - ust) / gs;
        tepe(ops, h.ayAdi(mo + 1), true);
        ops.push(['kutu', m, ust, 13 * k, H - m - ust, { dolgu: 0.93, cizgi: 0.5 }]);
        ops.push(['kutu', m, ust, tw, H - m - ust, { cizgi: 0.5 }]);
        for (let g = 1; g <= gs; g++) {
          const yy = ust + (g - 1) * rh;
          if (g > 1) ops.push(['cizgi', m, yy, W - m, yy, { kalinlik: 0.2, ton: 0.7 }]);
          ops.push(['yazi', String(g), m + 6.5 * k, yy + rh / 2 + 1.2 * k, f(9), { kalin: true, hiza: 'orta' }]);
          const ad = aylar[mo].filter((q) => q.gun === g).map((q) => q.ad).join(', ');
          if (ad) ops.push(['yazi', ad, m + 16 * k, yy + rh / 2 + 1.2 * k, f(9)]);
        }
        sayfalar.push(ops);
      }
    }
    const toplam = satirlar.length;
    let enDolu = 0;
    aylar.forEach((a, mo) => { if (a.length > aylar[enDolu].length) enDolu = mo; });
    const ilkAy = aylar.findIndex((a) => a.length > 0);
    const rows = [
      ['Sayfa sayısı', `${sayfalar.length} sayfa`],
      ['Hazır yazılan özel gün', toplam ? `${toplam} kayıt` : 'Yok (boş takvim)'],
    ];
    if (toplam) {
      rows.push(['En dolu ay', `${h.ayAdi(enDolu + 1)} (${aylar[enDolu].length} kayıt)`]);
      rows.push(['Yılın ilk özel günü', `${aylar[ilkAy][0].gun} ${h.ayAdi(ilkAy + 1)} – ${aylar[ilkAy][0].ad}`]);
      rows.push(['Kayıt bulunan ay', `${aylar.filter((a) => a.length).length} ay`]);
    }
    rows.push(['Düzen', duzen === 'tek' ? 'On iki ay tek sayfada' : duzen === 'iki' ? 'Sayfa başına altı ay' : 'Her ay ayrı sayfa']);
    rows.push(['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)']);
    return {
      rows,
      note: 'Takvimde yıl bulunmaz; aynı çıktıyı her yıl kullanabilirsiniz. Yazdırırken yönü dikey, ölçeği %100 seçin.',
      pdf: { ad: 'ozel-gunler-takvimi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
