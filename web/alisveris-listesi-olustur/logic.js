// Alışveriş Listesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kopya = h.posint(v.kopya, 'Sayfa sayısı');
    if (kopya > 10) h.err('Sayfa sayısı en fazla 10 olabilir.');
    const baslik = (v.baslik || '').trim() || 'Alışveriş Listesi';
    if (baslik.length > 32) h.err('Sayfa başlığı en fazla 32 karakter olabilir.');
    const duz = v.duzen === 'duz';
    let kats = h.lines(v.kategoriler);
    const kal = h.lines(v.kalemler);
    if (!duz) {
      if (!kats.length) kats = ['Meyve ve sebze', 'Et, tavuk, balık', 'Süt ve kahvaltılık', 'Bakliyat ve kuru gıda', 'Ekmek ve unlu mamul', 'İçecek ve atıştırmalık', 'Temizlik ve kâğıt', 'Kişisel bakım ve diğer'];
      if (kats.length < 2 || kats.length > 10) h.err('Kategorili düzen için 2 ile 10 arasında başlık yazın ya da alanı boş bırakın.');
      if (kats.some((s) => s.length > 26)) h.err('Kategori başlıkları en fazla 26 karakter olabilir; uzun başlığı kısaltın.');
      if (kal.length) h.err('Hazır ürünler yalnızca düz listede yazdırılır. Düzeni "Düz liste" yapın ya da ürün alanını boşaltın.');
    } else {
      if (kal.length > 40) h.err('En fazla 40 hazır ürün yazabilirsiniz; kalanını listeye elle ekleyin.');
      if (kal.some((s) => s.length > 32)) h.err('Ürün adları en fazla 32 karakter olabilir; uzun satırı kısaltın.');
    }
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12;
    const rh = a5 ? 6.8 : 8, kare = a5 ? 3 : 3.6, pt = a5 ? 8.5 : 10, ara = a5 ? 3 : 4;
    const ops = [];
    // Başlık ve tarih alanı
    ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
    ops.push(['yazi', 'Tarih', W - m - (a5 ? 36 : 44), m + 7, pt, { ton: 0.3 }]);
    ops.push(['cizgi', W - m - (a5 ? 26 : 32), m + 7.4, W - m, m + 7.4, { kalinlik: 0.25, ton: 0.5 }]);
    ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
    const ust = m + 15, altBant = H - m - 10, alt = altBant - 4;
    // Onay kutulu satır
    const satir = (x, y, w, metin) => {
      ops.push(['kutu', x, y + (rh - kare) / 2, kare, kare, { cizgi: 0.4 }]);
      ops.push(['cizgi', x + kare + 2, y + rh - 1.2, x + w, y + rh - 1.2, { kalinlik: 0.2, ton: 0.75 }]);
      if (metin) ops.push(['yazi', metin, x + kare + 3, y + rh - 2.2, pt]);
    };
    let toplam = 0;
    if (duz) {
      const n = Math.floor((alt - ust) / rh), cw = (W - 2 * m - 6) / 2;
      for (let c = 0; c < 2; c++) for (let r = 0; r < n; r++) satir(m + c * (cw + 6), ust + r * rh, cw, kal[c * n + r]);
      ops.push(['cizgi', W / 2, ust, W / 2, ust + n * rh, { kalinlik: 0.2, ton: 0.85, kesik: true }]);
      toplam = n * 2;
    } else {
      const sira = Math.ceil(kats.length / 2), bh = (alt - ust - (sira - 1) * ara) / sira, hh = a5 ? 6 : 7;
      const bw = (W - 2 * m - ara) / 2, n = Math.floor((bh - hh - 1) / rh);
      kats.forEach((ad, i) => {
        const tek = i === kats.length - 1 && kats.length % 2 === 1; // son tek kutu tüm genişliğe yayılır
        const x = m + (i % 2) * (bw + ara), y = ust + Math.floor(i / 2) * (bh + ara), w = tek ? W - 2 * m : bw;
        ops.push(['kutu', x, y, w, bh, { cizgi: 0.5 }]);
        ops.push(['kutu', x, y, w, hh, { dolgu: 0.88, cizgi: 0.5 }]);
        ops.push(['yazi', ad, x + 2.5, y + hh - 2, pt, { kalin: true }]);
        const sutun = tek ? 2 : 1, sw = (w - 5 - (sutun - 1) * ara) / sutun;
        for (let c = 0; c < sutun; c++) for (let r = 0; r < n; r++) satir(x + 2.5 + c * (sw + ara), y + hh + 0.5 + r * rh, sw, '');
        toplam += n * sutun;
      });
    }
    // Alt bant: bütçe ve toplam
    const yb = altBant + 7, yari = (W - 2 * m) / 2;
    ops.push(['cizgi', m, altBant, W - m, altBant, { kalinlik: 0.4, ton: 0.4 }]);
    ops.push(['yazi', 'Ayrılan bütçe', m, yb, pt, { kalin: true }]);
    ops.push(['cizgi', m + (a5 ? 23 : 28), yb + 0.4, m + yari - 4, yb + 0.4, { kalinlik: 0.25, ton: 0.5 }]);
    ops.push(['yazi', 'Ödenen toplam', m + yari + 2, yb, pt, { kalin: true }]);
    ops.push(['cizgi', m + yari + (a5 ? 27 : 32), yb + 0.4, W - m, yb + 0.4, { kalinlik: 0.25, ton: 0.5 }]);
    const sayfalar = [];
    for (let i = 0; i < kopya; i++) sayfalar.push(ops.slice());
    return {
      rows: [
        ['Sayfa sayısı', `${kopya} sayfa`],
        ['Düzen', duz ? 'Düz liste (iki sütun)' : `Kategorili (${kats.length} bölüm)`],
        ['Yazma satırı', `sayfa başına ${toplam} satır`],
        ['Hazır yazılan ürün', duz && kal.length ? `${kal.length} ürün` : 'yok'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken ölçeği "gerçek boyut" (%100) seçin; onay kutuları ve satır aralıkları tasarlandığı ölçüde basılır.',
      pdf: { ad: 'alisveris-listesi-olustur', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
