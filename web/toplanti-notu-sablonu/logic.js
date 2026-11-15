// Toplantı Notu Şablonu Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ad = (v.ad || '').trim() || 'Toplantı Notu';
    if (ad.length > 40) h.err('Toplantı adı en fazla 40 karakter olabilir.');
    const tarih = String(v.tarih || '').trim() ? h.date(v.tarih, 'Toplantı tarihi') : null;
    const n = h.posint(v.adet, 'Sayfa sayısı');
    if (n > 20) h.err('Sayfa sayısı en fazla 20 olabilir; daha fazlası için dosyayı birden çok kez yazdırın.');
    const kisi = h.lines(v.kisiler);
    if (kisi.length > 12) h.err('En fazla 12 katılımcı yazabilirsiniz; kalabalık toplantılarda listeyi boş bırakıp elle doldurun.');
    for (const p of kisi) if (p.length > 26) h.err(`"${p.slice(0, 18)}…" adı 26 karakterden uzun; kısaltın.`);
    const g = ['4', '6', '8'].includes(v.gundem) ? Number(v.gundem) : 6;
    const kr = ['5', '8', '10'].includes(v.karar) ? Number(v.karar) : 8;
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const tarihYazi = tarih ? `${h.fmtDate(tarih)} ${h.gunAdi(tarih)}` : '';
    const sayfa = () => {
      const ops = [];
      const hat = (x1, y1, x2) => ops.push(['cizgi', x1, y1, x2, y1, { kalinlik: 0.2, ton: 0.6 }]);
      // Etiket + doldurma çizgisi (ya da hazır değer)
      const alan = (x1, x2, y, etiket, deger) => {
        ops.push(['yazi', etiket, x1, y, F(8), { kalin: true }]);
        const lw = etiket.length * F(8) * 0.21 + 1.5 * k;
        if (deger) ops.push(['yazi', deger, x1 + lw, y, F(8)]);
        else hat(x1 + lw, y + 0.8 * k, x2);
      };
      ops.push(['yazi', ad, m, m + 7 * k, F(16), { kalin: true }]);
      ops.push(['yazi', 'Toplantı no: ________', W - m, m + 7 * k, F(9), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      let y = m + 14 * k;
      // Toplantı bilgileri
      ops.push(['kutu', m, y, iw, 16 * k, { cizgi: 0.55, dolgu: 0.96 }]);
      alan(m + 2 * k, m + iw * 0.36, y + 6 * k, 'Tarih:', tarihYazi);
      alan(m + iw * 0.39, m + iw * 0.62, y + 6 * k, 'Saat:', '');
      alan(m + iw * 0.65, m + iw - 2 * k, y + 6 * k, 'Yer:', '');
      alan(m + 2 * k, m + iw * 0.5 - 1.5 * k, y + 13 * k, 'Yöneten:', '');
      alan(m + iw * 0.5 + 1.5 * k, m + iw - 2 * k, y + 13 * k, 'Notu tutan:', '');
      y += 19 * k;
      // Katılımcılar: 3 sütun × 4 satır
      ops.push(['kutu', m, y, iw, 31 * k, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Katılımcılar', m + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
      ops.push(['yazi', 'Gelenleri işaretleyin', m + iw - 2 * k, y + 5.2 * k, F(7), { hiza: 'sag', ton: 0.45 }]);
      const cw = (iw - 4 * k) / 3;
      for (let j = 0; j < 12; j++) {
        const cx = m + 2 * k + (j % 3) * cw, cy = y + 12 * k + Math.floor(j / 3) * 5.6 * k;
        ops.push(['kutu', cx, cy - 3 * k, 3.4 * k, 3.4 * k, { cizgi: 0.4 }]);
        if (kisi[j]) ops.push(['yazi', kisi[j], cx + 5.2 * k, cy, F(8)]);
        else if (!kisi.length || j >= kisi.length) hat(cx + 5.2 * k, cy + 0.5 * k, cx + cw - 3 * k);
      }
      y += 34 * k;
      // Gündem
      const gh = 7 * k + g * 6.5 * k;
      ops.push(['kutu', m, y, iw, gh, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Gündem', m + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
      for (let j = 0; j < g; j++) {
        const ly = y + 7 * k + (j + 1) * 6.5 * k - 1.6 * k;
        ops.push(['yazi', `${j + 1}.`, m + 2 * k, ly - 0.4 * k, F(8), { ton: 0.4 }]);
        hat(m + 8 * k, ly, m + iw - 2 * k);
      }
      y += gh + 3 * k;
      // Alt bölümlerin yüksekliği: karar tablosu + sonraki toplantı satırı
      const kh = 7 * k + kr * 7 * k, sonH = 9 * k;
      const notH = H - m - sonH - 3 * k - kh - 3 * k - y;
      // Görüşme notları (esnek)
      ops.push(['kutu', m, y, iw, notH, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Görüşme notları', m + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
      const ns = Math.max(2, Math.floor((notH - 8 * k) / (7 * k))), na = (notH - 8 * k) / ns;
      for (let j = 1; j <= ns; j++) hat(m + 2 * k, y + 7 * k + j * na - 1 * k, m + iw - 2 * k);
      y += notH + 3 * k;
      // Kararlar tablosu
      const cNo = 8 * k, cS = 34 * k, cT = 26 * k, cI = iw - cNo - cS - cT;
      ops.push(['kutu', m, y, iw, 7 * k, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['kutu', m, y + 7 * k, iw, kh - 7 * k, { cizgi: 0.55 }]);
      ops.push(['yazi', 'No', m + cNo / 2, y + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Karar / yapılacak iş', m + cNo + 2 * k, y + 4.9 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Sorumlu', m + cNo + cI + 2 * k, y + 4.9 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Son tarih', m + cNo + cI + cS + 2 * k, y + 4.9 * k, F(8), { kalin: true }]);
      for (const x of [m + cNo, m + cNo + cI, m + cNo + cI + cS]) ops.push(['cizgi', x, y, x, y + kh, { kalinlik: 0.25, ton: 0.55 }]);
      for (let j = 0; j < kr; j++) {
        const ry = y + 7 * k + j * 7 * k;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(j + 1), m + cNo / 2, ry + 4.8 * k, F(8), { hiza: 'orta', ton: 0.4 }]);
      }
      y += kh + 3 * k;
      // Sonraki toplantı
      ops.push(['kutu', m, y, iw, sonH, { cizgi: 0.55, dolgu: 0.96 }]);
      alan(m + 2 * k, m + iw * 0.55, y + 5.9 * k, 'Sonraki toplantı:', '');
      alan(m + iw * 0.58, m + iw - 2 * k, y + 5.9 * k, 'Saat / yer:', '');
      return ops;
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) sayfalar.push(sayfa());
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['Tarih alanı', tarihYazi || 'Elle yazılacak'],
        ['Katılımcı listesi', kisi.length ? `${kisi.length} kişi yazıldı` : 'Elle yazılacak'],
        ['Gündem', `${g} madde`],
        ['Karar tablosu', `${kr} satır`],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'toplanti-notu-sablonu', baslik: ad, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
