// Yapılacaklar Listesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const baslik = (v.baslik || '').trim() || 'Yapılacaklar Listesi';
    if (baslik.length > 40) h.err('Liste başlığı en fazla 40 karakter olabilir.');
    const maddeler = h.lines(v.maddeler);
    if (maddeler.length > 120) h.err('En fazla 120 madde yazabilirsiniz; listeyi iki parçaya bölün.');
    const uzun = maddeler.findIndex((s) => s.length > 50);
    if (uzun >= 0) h.err(`${uzun + 1}. madde 50 karakterden uzun; kısaltın ya da iki satıra bölün.`);
    const a5 = v.boyut === 'a5';
    const satir = h.posint(v.satir, 'Sayfa başına satır'), enCok = a5 ? 28 : 40;
    if (satir < 8 || satir > enCok) h.err(`Sayfa başına satır ${a5 ? 'A5' : 'A4'} kâğıt için 8 ile ${enCok} arasında olmalı.`);
    const sayfa = h.posint(v.sayfa, 'Sayfa sayısı');
    if (sayfa > 20) h.err('Sayfa sayısı en fazla 20 olabilir.');
    const toplam = satir * sayfa;
    if (maddeler.length > toplam) h.err(`${maddeler.length} madde yazdınız ama listede ${toplam} satır var. Sayfa sayısını en az ${Math.ceil(maddeler.length / satir)} yapın ya da satır sayısını artırın.`);
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const tur = v.sutun === 'sade' ? 'sade' : v.sutun === 'kisi' ? 'kisi' : 'oncelik';
    // Sağdaki ek sütunlar: [ad, genişlik]
    const ek = tur === 'oncelik' ? [['Öncelik', 17 * k], ['Son tarih', 27 * k]] : tur === 'kisi' ? [['Sorumlu', 36 * k], ['Son tarih', 27 * k]] : [];
    const noW = 9 * k, kutuW = 8 * k;
    const sayfalar = [];
    for (let s = 0; s < sayfa; s++) {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, f(17), { kalin: true }]);
      ops.push(['yazi', sayfa > 1 ? `Sayfa ${s + 1} / ${sayfa}` : 'Tarih: ____ / ____ / ________', W - m, m + 7 * k, f(9), { hiza: 'sag', ton: 0.4 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 14 * k, bh = 7 * k, alt = H - m, rh = (alt - ust - bh) / satir, sag = W - m;
      const ekTop = ek.reduce((a, e) => a + e[1], 0), isX = m + noW + kutuW, isSon = sag - ekTop;
      // Başlık şeridi
      ops.push(['kutu', m, ust, W - 2 * m, bh, { dolgu: 0.9, cizgi: 0.5 }]);
      ops.push(['yazi', 'No', m + noW / 2, ust + 5 * k, f(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Yapılacak iş', isX + 1.5 * k, ust + 5 * k, f(8), { kalin: true }]);
      let x = isSon;
      for (const [ad, gen] of ek) { ops.push(['yazi', ad, x + gen / 2, ust + 5 * k, f(8), { kalin: true, hiza: 'orta' }]); x += gen; }
      // Satırlar
      ops.push(['kutu', m, ust + bh, W - 2 * m, alt - ust - bh, { cizgi: 0.5 }]);
      const kb = Math.min(3.8 * k, rh * 0.6);
      for (let r = 0; r < satir; r++) {
        const y = ust + bh + r * rh, no = s * satir + r, orta = y + rh / 2;
        if (r > 0) ops.push(['cizgi', m, y, sag, y, { kalinlik: 0.2, ton: 0.65 }]);
        ops.push(['yazi', String(no + 1), m + noW / 2, orta + 1 * k, f(7.5), { hiza: 'orta', ton: 0.45 }]);
        ops.push(['kutu', m + noW + (kutuW - kb) / 2, orta - kb / 2, kb, kb, { cizgi: 0.3, kalinlik: 0.3 }]);
        if (no < maddeler.length) ops.push(['yazi', maddeler[no], isX + 1.5 * k, orta + 1.1 * k, f(9)]);
      }
      // Sütun ayırıcılar
      ops.push(['cizgi', m + noW, ust, m + noW, alt, { kalinlik: 0.2, ton: 0.65 }]);
      x = isSon;
      for (const [, gen] of ek) { ops.push(['cizgi', x, ust, x, alt, { kalinlik: 0.2, ton: 0.65 }]); x += gen; }
      sayfalar.push(ops);
    }
    return {
      rows: [
        ['Sayfa sayısı', `${sayfa} sayfa`],
        ['Toplam satır', `${toplam} satır`],
        ['Hazır yazılan madde', maddeler.length ? `${maddeler.length} madde` : 'Yok (boş liste)'],
        ['Boş satır', `${toplam - maddeler.length} satır`],
        ['Sütunlar', tur === 'sade' ? 'No, onay kutusu, iş' : tur === 'kisi' ? 'No, onay kutusu, iş, sorumlu, son tarih' : 'No, onay kutusu, iş, öncelik, son tarih'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'yapilacaklar-listesi-olustur', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
