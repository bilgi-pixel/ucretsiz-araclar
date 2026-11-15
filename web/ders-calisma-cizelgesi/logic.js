// Ders Çalışma Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 12) h.err('Hafta sayısı en fazla 12 olabilir; daha uzun dönem için başlangıç tarihini ilerletip aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Ders Çalışma Çizelgesi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    let ders = h.lines(v.dersler);
    if (!ders.length) ders = ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilgiler', 'Yabancı Dil'];
    if (ders.length > 12) h.err('En fazla 12 ders yazabilirsiniz; az çalışılan dersleri tek satırda birleştirin.');
    if (ders.some((s) => s.length > 22)) h.err('Ders adları en fazla 22 karakter olabilir; uzun adı kısaltın.');
    const bos = h.int(h.opt(v.bosSatir, 0, 'Ek boş satır'), 'Ek boş satır');
    if (bos < 0 || bos > 6) h.err('Ek boş satır sayısı 0 ile 6 arasında olmalı.');
    const R = ders.length + bos;
    if (R > 14) h.err('Dersler ve boş satırların toplamı en fazla 14 olabilir; boş satır sayısını azaltın.');
    const BIRIM = { dk: 'dakika', soru: 'soru', sayfa: 'sayfa' }[v.birim] || 'dakika';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const kucuk = Math.max(5, 6 * k);
    const ust = m + 14 * k, hh = 13 * k, altYuk = 30 * k, ara = 4 * k;
    const dw = 42 * k, tw = 24 * k, gw = (W - 2 * m - dw - tw) / 7;
    const rh = Math.min(13 * k, (H - m - ust - hh - ara - altYuk) / (R + 1));
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const GUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, 18 * k, { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, 6))}  ·  birim: ${BIRIM}`, W - m, m + 7 * k, 10 * k, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      // Başlık satırı
      ops.push(['kutu', m, ust, dw, hh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Ders', m + 2 * k, ust + 8 * k, 10 * k, { kalin: true }]);
      for (let g = 0; g < 7; g++) {
        const x = m + dw + g * gw, d = h.gunEkle(b, g);
        ops.push(['kutu', x, ust, gw, hh, { dolgu: g >= 5 ? 0.8 : 0.86, cizgi: 0.5 }]);
        ops.push(['yazi', GUN[g], x + 1.5 * k, ust + 5.2 * k, 8.5 * k, { kalin: true }]);
        ops.push(['yazi', `${d.getUTCDate()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`, x + gw - 1.5 * k, ust + 5.2 * k, Math.max(5.5, 7 * k), { hiza: 'sag', ton: 0.3 }]);
        ops.push(['yazi', 'plan', x + gw / 4, ust + hh - 2 * k, kucuk, { hiza: 'orta', ton: 0.3 }]);
        ops.push(['yazi', 'yapılan', x + gw * 0.75, ust + hh - 2 * k, kucuk, { hiza: 'orta', ton: 0.3 }]);
      }
      const tx = W - m - tw;
      ops.push(['kutu', tx, ust, tw, hh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Haftalık', tx + tw / 2, ust + 5.2 * k, 8.5 * k, { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'toplam', tx + tw / 2, ust + hh - 2 * k, 8.5 * k, { kalin: true, hiza: 'orta' }]);
      // Ders satırları ve en altta günlük toplam satırı
      for (let r = 0; r <= R; r++) {
        const y = ust + hh + r * rh, sonSatir = r === R;
        ops.push(['kutu', m, y, W - 2 * m, rh, sonSatir ? { dolgu: 0.92, cizgi: 0.5 } : { cizgi: 0.55 }]);
        const ad = sonSatir ? 'Günlük toplam' : ders[r];
        if (ad) ops.push(['yazi', ad, m + 2 * k, y + rh / 2 + 1.2 * k, 9.5 * k, { kalin: sonSatir }]);
      }
      const altY = ust + hh + (R + 1) * rh;
      for (let g = 0; g <= 7; g++) {
        const x = m + dw + g * gw;
        ops.push(['cizgi', x, ust + hh, x, altY, { kalinlik: 0.3, ton: 0.4 }]);
        if (g < 7) ops.push(['cizgi', x + gw / 2, ust + hh, x + gw / 2, altY, { kalinlik: 0.2, ton: 0.7, kesik: true }]);
      }
      // Alt bölüm: hedefler ve değerlendirme
      const ay = altY + ara, ah = H - m - ay, ow = (W - 2 * m - ara) * 0.5;
      [['Bu haftanın hedefleri', m], ['Hafta sonu değerlendirmesi', m + ow + ara]].forEach(([ad, x]) => {
        ops.push(['kutu', x, ay, ow, ah, { cizgi: 0.55 }]);
        ops.push(['yazi', ad, x + 2 * k, ay + 5.5 * k, 8.5 * k, { kalin: true }]);
        const adim = a5 ? 6.2 : 7.5;
        for (let y = ay + 5.5 * k + adim; y < ay + ah - 1.5; y += adim) ops.push(['cizgi', x + 2.5 * k, y, x + ow - 2.5 * k, y, { kalinlik: 0.2, ton: 0.78 }]);
      });
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Satır sayısı', `${R} satır (${ders.length} ders, ${bos} boş)`],
        ['Takip birimi', BIRIM],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'ders-calisma-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  }
