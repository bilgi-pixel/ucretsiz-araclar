// NATO Fonetik Alfabe Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const SOZ = {
      A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India',
      J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo',
      S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'Xray', Y: 'Yankee', Z: 'Zulu',
      0: 'Zero', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine',
    };
    const TR = { 'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U', 'Â': 'A', 'Î': 'I', 'Û': 'U' };
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('Çevrilecek metni ya da kod sözcüklerini yazın.');
    const satirlar = ham.split('\n').map((s) => s.trim()).filter((s) => s !== '');
    let cevrilen = 0, atlanan = 0;
    const cikti = [];
    if (v.yon === 'coz') {
      const TERS = {};
      for (const k of Object.keys(SOZ)) TERS[SOZ[k].toLowerCase()] = k;
      Object.assign(TERS, { alpha: 'A', juliet: 'J', whisky: 'W', niner: '9', tree: '3', fower: '4', fife: '5' });
      for (const satir of satirlar) {
        let s = '';
        for (const parca of satir.split(/\s+/)) {
          if (parca === '/' || parca === '|') { s += ' '; continue; }
          const anahtar = parca.toLowerCase().replace(/[-.,;]/g, '');
          if (anahtar === '') continue;
          const harf = TERS[anahtar];
          if (harf === undefined) h.err(`"${parca}" bir NATO kod sözcüğü değil. Sözcükleri boşlukla ayırın (örn. Alfa Lima India).`);
          s += harf; cevrilen++;
        }
        cikti.push(s.replace(/ +/g, ' ').trim());
      }
    } else {
      for (const satir of satirlar) {
        const kelimeler = [];
        for (const kelime of satir.split(/\s+/)) {
          const parcalar = [];
          for (const ch of kelime) {
            let b = ch.toUpperCase();
            if (TR[b]) b = TR[b];
            if (SOZ[b] !== undefined) { parcalar.push(SOZ[b]); cevrilen++; } else atlanan++;
          }
          if (parcalar.length) kelimeler.push(parcalar.join(' '));
        }
        if (kelimeler.length) cikti.push(kelimeler.join(' / '));
      }
      if (!cevrilen) h.err('Metinde çevrilebilecek harf ya da rakam bulunamadı.');
    }
    return {
      rows: [
        ['Çevrilen karakter', h.fmt(cevrilen, 0)],
        ['Atlanan karakter', h.fmt(atlanan, 0)],
      ],
      text: cikti.join('\n'),
      note: v.yon === 'coz' ? 'Kelime aralarını belirtmek için kod sözcükleri arasına "/" koyabilirsiniz.' : 'Kelimeler " / " ile ayrılır; noktalama işaretleri atlanır, Türkçe harfler en yakın Latin harfiyle kodlanır.',
    };
  }
