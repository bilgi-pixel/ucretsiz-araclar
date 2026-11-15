// Kitap Okuma Takip Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const listeVar = v.icerik !== 'gunluk', gunlukVar = v.icerik !== 'liste';
    const ilk = h.dateOrToday(v.ay, 'Başlangıç ayı');
    const n = h.posint(v.aySayisi, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir; daha uzun dönem için aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Kitap Okuma Çizelgesi';
    if (baslik.length > 30) h.err('Sayfa başlığı en fazla 30 karakter olabilir.');
    const hedef = String(v.hedef ?? '').trim() === '' ? 0 : h.posint(v.hedef, 'Günlük sayfa hedefi');
    if (hedef > 1000) h.err('Günlük sayfa hedefi en fazla 1000 olabilir.');
    const kitap = h.lines(v.kitaplar);
    if (kitap.length && !listeVar) h.err('Hazır kitap adları yalnızca kitap listesi sayfasına basılır. İçeriğe kitap listesini ekleyin ya da kitap alanını boşaltın.');
    if (kitap.length > 20) h.err('En fazla 20 kitap adı hazır yazdırılabilir; kalanını listeye elle ekleyin.');
    if (kitap.some((s) => s.length > 30)) h.err('Kitap adları en fazla 30 karakter olabilir; uzun adı kısaltın.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12, tw = W - 2 * m;
    const pt = a5 ? 7.5 : 9.5, ust = m + 15, hh = a5 ? 6 : 7;
    const ustBilgi = (ops, sag) => {
      ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
      ops.push(['yazi', sag, W - m, m + 7, a5 ? 8.5 : 10, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
    };
    // Alt özet şeridi: etiket + yazma çizgisi
    const ozet = (ops, y, etiketler) => {
      const w = tw / etiketler.length;
      etiketler.forEach((e, j) => {
        const x = m + j * w, ew = e.length * pt * 0.2 + 2;
        ops.push(['yazi', e, x, y, pt, { kalin: true }]);
        ops.push(['cizgi', x + ew, y + 0.4, x + w - 4, y + 0.4, { kalinlik: 0.25, ton: 0.5 }]);
      });
    };
    const sayfalar = [];
    let listeSatir = 0;
    // 1) Kitap listesi
    if (listeVar) {
      const ops = [], rh = a5 ? 6.8 : 8.5;
      listeSatir = Math.floor((H - m - ust - hh - 10) / rh);
      ustBilgi(ops, 'Okuma listesi');
      const SUT = [['No', 0.06], ['Kitap adı', 0.36], ['Yazar', 0.2], ['Sayfa', 0.09], ['Bitiş tarihi', 0.13], ['Puan', 0.16]];
      const xs = []; SUT.reduce((x, s) => { xs.push(x); return x + s[1] * tw; }, m);
      ops.push(['kutu', m, ust, tw, hh, { dolgu: 0.85, cizgi: 0.5 }]);
      SUT.forEach((s, j) => ops.push(['yazi', s[0], xs[j] + 1.5, ust + hh - 2, pt - 0.5, { kalin: true }]));
      const pw = SUT[5][1] * tw, yr = a5 ? 1.3 : 1.6, adim = (pw - 4) / 5;
      for (let r = 0; r < listeSatir; r++) {
        const y = ust + hh + r * rh;
        ops.push(['kutu', m, y, tw, rh, r % 2 ? { dolgu: 0.965, cizgi: 0.55 } : { cizgi: 0.55 }]);
        ops.push(['yazi', String(r + 1), xs[0] + SUT[0][1] * tw / 2, y + rh / 2 + pt * 0.12, pt - 0.5, { hiza: 'orta', ton: 0.4 }]);
        if (kitap[r]) ops.push(['yazi', kitap[r], xs[1] + 1.5, y + rh / 2 + pt * 0.12, pt]);
        for (let j = 0; j < 5; j++) ops.push(['daire', xs[5] + 2 + adim * (j + 0.5), y + rh / 2, yr, { dolgu: 1, cizgi: 0.4 }]);
      }
      for (let j = 1; j < xs.length; j++) ops.push(['cizgi', xs[j], ust, xs[j], ust + hh + listeSatir * rh, { kalinlik: 0.2, ton: 0.7 }]);
      ozet(ops, H - m - 2.5, ['Biten kitap', 'Toplam sayfa']);
      sayfalar.push(ops);
    }
    // 2) Aylık günlük takip
    const y0 = ilk.getUTCFullYear(), m0 = ilk.getUTCMonth();
    const ayBilgi = (i) => {
      const yil = y0 + Math.floor((m0 + i) / 12), ay = (m0 + i) % 12;
      return { yil, ay, gun: new Date(Date.UTC(yil, ay + 1, 0)).getUTCDate(), ad: `${h.ayAdi(ay + 1)} ${yil}` };
    };
    let toplamGun = 0;
    if (gunlukVar) {
      const KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
      const SUT = a5 ? [['Gün', 0.3], ['Okunan sayfa', 0.35], ['Süre (dk)', 0.35]] : [['Gün', 0.15], ['Kitap', 0.37], ['Sayfa aralığı', 0.18], ['Okunan sayfa', 0.15], ['Süre (dk)', 0.15]];
      const blok = a5 ? 2 : 1, bw = (tw - (blok - 1) * 4) / blok;
      for (let i = 0; i < n; i++) {
        const A = ayBilgi(i), ops = [];
        toplamGun += A.gun;
        const per = a5 ? 16 : A.gun, rh = Math.min(a5 ? 9.6 : 8, (H - m - ust - hh - 12) / per);
        ustBilgi(ops, hedef ? `${A.ad}  ·  hedef: günde ${hedef} sayfa` : A.ad);
        for (let b = 0; b < blok; b++) {
          const bx = m + b * (bw + 4), xs = [];
          SUT.reduce((x, s) => { xs.push(x); return x + s[1] * bw; }, bx);
          ops.push(['kutu', bx, ust, bw, hh, { dolgu: 0.85, cizgi: 0.5 }]);
          SUT.forEach((s, j) => ops.push(['yazi', s[0], xs[j] + 1.5, ust + hh - 2, pt - 0.5, { kalin: true }]));
          let y = ust + hh;
          for (let g = b * per + 1; g <= Math.min(A.gun, (b + 1) * per); g++) {
            const hg = new Date(Date.UTC(A.yil, A.ay, g)).getUTCDay(), sonu = hg === 0 || hg === 6;
            ops.push(['kutu', bx, y, bw, rh, sonu ? { dolgu: 0.93, cizgi: 0.55 } : { cizgi: 0.55 }]);
            ops.push(['yazi', String(g), bx + 1.5, y + rh / 2 + pt * 0.12, pt, { kalin: true }]);
            ops.push(['yazi', KISA[hg], bx + (a5 ? 7 : 8.5), y + rh / 2 + pt * 0.12, pt - 1, { ton: 0.35 }]);
            y += rh;
          }
          for (let j = 1; j < xs.length; j++) ops.push(['cizgi', xs[j], ust, xs[j], y, { kalinlik: 0.2, ton: 0.7 }]);
        }
        ozet(ops, H - m - 2.5, ['Ay toplamı', 'Okunan gün', 'Biten kitap']);
        sayfalar.push(ops);
      }
    }
    const sonAy = ayBilgi(n - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${sayfalar.length} sayfa`],
        ['Kitap listesi', listeVar ? `${listeSatir} satır` : 'yok'],
        ['Günlük takip', gunlukVar ? (n === 1 ? ayBilgi(0).ad : `${ayBilgi(0).ad} – ${sonAy.ad}`) : 'yok'],
        ['Takip edilen gün', gunlukVar ? `${toplamGun} gün` : '—'],
        ['Günlük hedef', hedef ? `${hedef} sayfa` : 'belirtilmedi'],
        ['Dönem hedefi', hedef && gunlukVar ? `${h.fmt(hedef * toplamGun, 0)} sayfa` : '—'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken ölçeği "gerçek boyut" (%100) seçin. Dönem hedefi, günlük hedefin takip edilen gün sayısıyla çarpımıdır.',
      pdf: { ad: 'kitap-okuma-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
