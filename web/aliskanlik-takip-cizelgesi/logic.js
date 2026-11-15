// Alışkanlık Takip Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.ay, 'Başlangıç ayı');
    const y0 = ilk.getUTCFullYear(), m0 = ilk.getUTCMonth();
    if (y0 < 1900 || y0 > 2200) h.err('Başlangıç ayı 1900 ile 2200 yılları arasında olmalı.');
    const n = h.posint(v.aySayisi, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir.');
    const adlar = h.lines(v.aliskanliklar);
    if (adlar.length > 15) h.err('En fazla 15 alışkanlık yazabilirsiniz; az sayıda alışkanlığı izlemek daha kolaydır.');
    const uzun = adlar.findIndex((s) => s.length > 28);
    if (uzun >= 0) h.err(`${uzun + 1}. alışkanlık adı 28 karakterden uzun; kısaltın (örn. "20 dk kitap").`);
    const satir = h.posint(v.satir, 'Toplam satır sayısı');
    if (satir < 5 || satir > 15) h.err('Toplam satır sayısı 5 ile 15 arasında olmalı.');
    if (adlar.length > satir) h.err(`${adlar.length} alışkanlık yazdınız; toplam satır sayısını en az ${adlar.length} yapın.`);
    const baslik = (v.baslik || '').trim() || 'Alışkanlık Takibi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const f = (p) => Math.max(5, p * k);
    const HARF = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];
    const bilgi = (i) => {
      const t = new Date(Date.UTC(y0, m0 + i, 1));
      return { y: t.getUTCFullYear(), mo: t.getUTCMonth(), ilkGun: t.getUTCDay(), gunSay: new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate() };
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = bilgi(i), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, f(17), { kalin: true }]);
      ops.push(['yazi', `${h.ayAdi(b.mo + 1)} ${b.y}`, W - m, m + 7 * k, f(12), { hiza: 'sag', kalin: true, ton: 0.25 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 14 * k, adW = 54 * k, topW = 14 * k, bh = 10 * k, altNot = 9 * k;
      const gw = (W - 2 * m - adW - topW) / b.gunSay, gx = m + adW, tx = W - m - topW;
      const rh = Math.min(11 * k, (H - m - altNot - ust - bh) / satir), alt = ust + bh + satir * rh;
      // Başlık satırı
      ops.push(['kutu', m, ust, adW, bh, { dolgu: 0.9, cizgi: 0.5 }]);
      ops.push(['yazi', 'Alışkanlık', m + 2 * k, ust + 6.3 * k, f(8.5), { kalin: true }]);
      ops.push(['kutu', tx, ust, topW, bh, { dolgu: 0.9, cizgi: 0.5 }]);
      ops.push(['yazi', 'Toplam', tx + topW / 2, ust + 6.3 * k, f(7.5), { kalin: true, hiza: 'orta' }]);
      for (let d = 1; d <= b.gunSay; d++) {
        const g = (b.ilkGun + d - 1) % 7, hs = g === 0 || g === 6, x = gx + (d - 1) * gw;
        ops.push(['kutu', x, ust, gw, bh, { dolgu: hs ? 0.8 : 0.9, cizgi: 0.5 }]);
        ops.push(['yazi', String(d), x + gw / 2, ust + 4.2 * k, f(7.5), { kalin: true, hiza: 'orta' }]);
        ops.push(['yazi', HARF[g], x + gw / 2, ust + 8.2 * k, f(5.5), { hiza: 'orta', ton: 0.4 }]);
        if (hs) ops.push(['kutu', x, ust + bh, gw, satir * rh, { dolgu: 0.94 }]);
      }
      // Satırlar ve ızgara
      for (let r = 0; r < satir; r++) {
        const y = ust + bh + r * rh;
        if (r < adlar.length) ops.push(['yazi', adlar[r], m + 2 * k, y + rh / 2 + 1.1 * k, f(8.5)]);
        else ops.push(['cizgi', m + 2 * k, y + rh - 2.2 * k, m + adW - 2 * k, y + rh - 2.2 * k, { kalinlik: 0.2, ton: 0.75 }]);
        ops.push(['cizgi', m, y + rh, W - m, y + rh, { kalinlik: 0.25, ton: 0.5 }]);
      }
      for (let d = 0; d <= b.gunSay; d++) ops.push(['cizgi', gx + d * gw, ust + bh, gx + d * gw, alt, { kalinlik: 0.25, ton: 0.5 }]);
      ops.push(['kutu', m, ust + bh, W - 2 * m, satir * rh, { cizgi: 0.4, kalinlik: 0.4 }]);
      ops.push(['yazi', 'Yaptığınız günün kutusunu işaretleyin; ay sonunda işaretleri sayıp "Toplam" sütununa yazın.', m, alt + 5.5 * k, f(7.5), { ton: 0.4 }]);
      // Tablo sayfayı doldurmuyorsa kalan alana ay sonu not kutusu
      const ny = alt + 10 * k, nyuk = H - m - ny;
      if (nyuk >= 22 * k) {
        ops.push(['kutu', m, ny, W - 2 * m, nyuk, { cizgi: 0.5 }]);
        ops.push(['yazi', 'Ay sonu notları: ne iyi gitti, gelecek ay neyi değiştireceğim?', m + 2 * k, ny + 5.5 * k, f(8.5), { kalin: true }]);
        for (let yy = ny + 14 * k; yy < ny + nyuk - 2 * k; yy += 8 * k) ops.push(['cizgi', m + 2.5 * k, yy, W - m - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      }
      sayfalar.push(ops);
    }
    const b0 = bilgi(0), bs = bilgi(n - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', `${h.ayAdi(b0.mo + 1)} ${b0.y}`],
        ['Son ay', `${h.ayAdi(bs.mo + 1)} ${bs.y}`],
        ['İlk ayda gün sütunu', `${b0.gunSay} gün`],
        ['Satırlar', `${satir} satır (${adlar.length} hazır yazılı, ${satir - adlar.length} boş)`],
        ['İlk ayda işaret kutusu', `${satir * b0.gunSay} kutu`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Bu çizelge kişisel takip içindir; tıbbi tavsiye ya da tedavi planı değildir. Yazdırırken yönü yatay, ölçeği %100 seçin.',
      pdf: { ad: 'aliskanlik-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  }
