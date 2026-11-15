// Sekmeyi Boşluğa Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s === '') h.err('Dönüştürmek için "Metin ya da kod" alanına bir metin yapıştırın.');
    const n = Number(v.genislik);
    if (![2, 3, 4, 8].includes(n)) h.err('Sekme genişliği 2, 3, 4 ya da 8 olmalı.');
    const satirlar = s.split('\n');
    let sekmeSayisi = 0, degisen = 0;
    const cikti = satirlar.map((satir) => {
      const bas = /^[ \t]*/.exec(satir)[0];
      const govde = satir.slice(bas.length);
      let yeni;
      if (v.yon === 'sekme') {
        // Baştaki girintinin görsel genişliğini bul, sekme + artan boşluk olarak yeniden yaz
        let kol = 0;
        for (const c of bas) kol = c === '\t' ? kol + (n - (kol % n)) : kol + 1;
        const t = Math.floor(kol / n);
        const yeniBas = '\t'.repeat(t) + ' '.repeat(kol % n);
        if (yeniBas !== bas) sekmeSayisi += t;
        yeni = yeniBas + govde;
      } else {
        let kol = 0, o = '';
        const hedef = v.kapsam === 'bas' ? bas : satir;
        for (const c of Array.from(hedef)) {
          if (c === '\t') { const ek = n - (kol % n); o += ' '.repeat(ek); kol += ek; sekmeSayisi++; }
          else { o += c; kol++; }
        }
        yeni = v.kapsam === 'bas' ? o + govde : o;
      }
      if (yeni !== satir) degisen++;
      return yeni;
    });
    const rows = v.yon === 'sekme'
      ? [['Yazılan sekme', h.fmt(sekmeSayisi, 0)], ['Değişen satır', h.fmt(degisen, 0)], ['Toplam satır', h.fmt(satirlar.length, 0)]]
      : [['Çevrilen sekme', h.fmt(sekmeSayisi, 0)], ['Değişen satır', h.fmt(degisen, 0)], ['Toplam satır', h.fmt(satirlar.length, 0)]];
    let note;
    if (degisen === 0) note = v.yon === 'sekme' ? 'Satır başlarında sekmeye çevrilecek kadar boşluk bulunamadı; metin olduğu gibi bırakıldı.' : 'Metinde sekme karakteri bulunamadı; metin olduğu gibi bırakıldı.';
    else note = v.yon === 'sekme' ? `Satır başındaki her ${n} boşluk bir sekmeye çevrildi; artan boşluklar korundu. Satır içindeki boşluklara dokunulmadı.` : `Sekme durakları ${n} sütunda bir kabul edildi.`;
    return { rows, text: cikti.join('\n'), note };
  }
