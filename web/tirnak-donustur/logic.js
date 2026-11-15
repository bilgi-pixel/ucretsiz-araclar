// Düz Tırnakları Kıvrık Tırnağa Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Dönüştürmek için "Metin" alanına tırnak içeren bir yazı yazın.');
    const stil = v.stil || 'kivrik';
    if (stil === 'duz') {
      let cift = 0, tek = 0;
      const cikti = s.replace(/[“”„‟«»]/g, () => { cift++; return '"'; }).replace(/[‘’‚‛‹›]/g, () => { tek++; return '\''; });
      return {
        rows: [
          ['Çevrilen çift tırnak', h.fmt(cift, 0)],
          ['Çevrilen tek tırnak', h.fmt(tek, 0)],
        ],
        text: cikti,
        note: 'Kıvrık kesme işareti de tek tırnak sayısına dahildir. Metinde çevrilecek işaret yoksa çıktı girdiyle aynıdır.',
      };
    }
    const T = { kivrik: ['“', '”', '‘', '’'], alman: ['„', '“', '‚', '‘'], fransiz: ['«', '»', '‹', '›'] }[stil] || ['“', '”', '‘', '’'];
    const ch = Array.from(s);
    const harf = (c) => c !== undefined && /[\p{L}\p{N}]/u.test(c);
    let cikti = '', cift = 0, tek = 0, kesme = 0;
    let oncekiTirnakAcilis = null; // bir önceki karakter tırnaksa açılış mıydı
    for (let i = 0; i < ch.length; i++) {
      const c = ch[i], once = ch[i - 1], sonra = ch[i + 1];
      if (c !== '"' && c !== '\'') { cikti += c; oncekiTirnakAcilis = null; continue; }
      if (c === '\'' && harf(once) && harf(sonra)) { cikti += '’'; kesme++; oncekiTirnakAcilis = null; continue; }
      let acilis;
      if (once === undefined) acilis = true;
      else if (oncekiTirnakAcilis !== null) acilis = oncekiTirnakAcilis;
      else acilis = /[\s(\[{–—\-\/=]/.test(once);
      if (c === '"') { cikti += acilis ? T[0] : T[1]; cift++; }
      else { cikti += acilis ? T[2] : T[3]; tek++; }
      oncekiTirnakAcilis = acilis;
    }
    return {
      rows: [
        ['Çevrilen çift tırnak', h.fmt(cift, 0)],
        ['Çevrilen tek tırnak', h.fmt(tek, 0)],
        ['Çevrilen kesme işareti', h.fmt(kesme, 0)],
      ],
      text: cikti,
      note: 'Açılış ve kapanış, tırnaktan önceki karaktere göre belirlenir: satır başı, boşluk ya da açma parantezinden sonra gelen tırnak açılış sayılır.',
    };
  }
