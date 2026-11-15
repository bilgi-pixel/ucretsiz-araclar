// Braille Alfabesi Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const HARF = {
      a: '1', b: '12', c: '14', 'ç': '16', d: '145', e: '15', f: '124', g: '1245', 'ğ': '126', h: '125', 'ı': '35', i: '24',
      j: '245', k: '13', l: '123', m: '134', n: '1345', o: '135', 'ö': '246', p: '1234', q: '12345', r: '1235', s: '234',
      'ş': '146', t: '2345', u: '136', 'ü': '1256', v: '1236', w: '2456', x: '1346', y: '13456', z: '1356',
    };
    const NOKTA = { ',': '2', ';': '23', ':': '25', '.': '256', '?': '236', '!': '235', '-': '36', '\'': '3', '’': '3' };
    const hucre = (d) => { let k = 0; for (const c of d) k |= 1 << (Number(c) - 1); return String.fromCharCode(0x2800 + k); };
    const SAYI = hucre('3456'), BUYUK = hucre('6');
    const RAKAM = '1234567890', RAKAMHARF = 'abcdefghij';
    const kucult = (c) => (c === 'İ' ? 'i' : c === 'I' ? 'ı' : c.toLowerCase());
    const buyut = (c) => (c === 'i' ? 'İ' : c === 'ı' ? 'I' : c.toUpperCase());
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('Çevrilecek metni ya da Braille karakterlerini yazın.');
    let cikti = '', hucreSayisi = 0, desteksiz = 0;
    if (v.yon === 'coz') {
      const TERS = {}, TERSN = {};
      for (const k of Object.keys(HARF)) TERS[hucre(HARF[k])] = k;
      for (const k of Object.keys(NOKTA)) if (k !== '’') TERSN[hucre(NOKTA[k])] = k;
      let sayi = false, buyukSonraki = false;
      for (const ch of ham) {
        const kod = ch.codePointAt(0);
        if (kod < 0x2800 || kod > 0x28FF) {
          sayi = false; buyukSonraki = false; cikti += ch;
          if (!/\s/.test(ch)) desteksiz++;
          continue;
        }
        hucreSayisi++;
        if (kod === 0x2800) { sayi = false; cikti += ' '; continue; }
        if (ch === SAYI) { sayi = true; continue; }
        if (ch === BUYUK) { buyukSonraki = true; continue; }
        const harf = TERS[ch];
        if (sayi && harf !== undefined && RAKAMHARF.includes(harf)) { cikti += RAKAM[RAKAMHARF.indexOf(harf)]; continue; }
        sayi = false;
        if (harf !== undefined) { cikti += buyukSonraki ? buyut(harf) : harf; buyukSonraki = false; continue; }
        buyukSonraki = false;
        if (TERSN[ch] !== undefined) { cikti += TERSN[ch]; continue; }
        cikti += ch; desteksiz++;
      }
      if (!hucreSayisi) h.err('Girdide Braille karakteri bulunamadı. Düz metni çevirmek için yönü "Metin → Braille" seçin.');
    } else {
      let sayi = false;
      for (const ch of ham) {
        if (RAKAM.includes(ch)) {
          if (!sayi) { cikti += SAYI; hucreSayisi++; sayi = true; }
          cikti += hucre(HARF[RAKAMHARF[RAKAM.indexOf(ch)]]); hucreSayisi++;
          continue;
        }
        sayi = false;
        const kucuk = kucult(ch);
        if (HARF[kucuk] !== undefined) {
          if (v.buyuk === 'var' && kucuk !== ch) { cikti += BUYUK; hucreSayisi++; }
          cikti += hucre(HARF[kucuk]); hucreSayisi++;
          continue;
        }
        if (NOKTA[ch] !== undefined) { cikti += hucre(NOKTA[ch]); hucreSayisi++; continue; }
        cikti += ch;
        if (!/\s/.test(ch)) desteksiz++;
      }
      if (!hucreSayisi) h.err('Metinde Braille karşılığı olan harf, rakam ya da işaret bulunamadı.');
    }
    return {
      rows: [
        ['Braille hücresi', h.fmt(hucreSayisi, 0)],
        ['Desteklenmeyen karakter', h.fmt(desteksiz, 0)],
      ],
      text: cikti,
      note: 'Kısaltmasız Türkçe Braille düzeni kullanılır. Desteklenmeyen karakterler olduğu gibi bırakılır; basılı kabartma belge hazırlamadan önce bir uzmana kontrol ettirin.',
    };
  }
