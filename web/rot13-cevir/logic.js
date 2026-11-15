// ROT13 Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Çevirmek için "Metin" alanına bir yazı yazın.');
    const y = ['rot5', 'rot18', 'rot47'].includes(v.yontem) ? v.yontem : 'rot13';
    let degisen = 0, ayni = 0, cikti = '';
    for (const c of s) {
      const k = c.codePointAt(0);
      let o = c;
      if (y === 'rot47') {
        if (k >= 33 && k <= 126) o = String.fromCharCode(33 + ((k - 33 + 47) % 94));
      } else {
        if (y !== 'rot5') {
          if (k >= 65 && k <= 90) o = String.fromCharCode(65 + ((k - 65 + 13) % 26));
          else if (k >= 97 && k <= 122) o = String.fromCharCode(97 + ((k - 97 + 13) % 26));
        }
        if (y !== 'rot13' && k >= 48 && k <= 57) o = String.fromCharCode(48 + ((k - 48 + 5) % 10));
      }
      if (o !== c) degisen++; else if (!/\s/.test(c)) ayni++;
      cikti += o;
    }
    const ad = { rot13: 'ROT13', rot5: 'ROT5', rot18: 'ROT18', rot47: 'ROT47' }[y];
    return {
      rows: [
        ['Yöntem', ad],
        ['Değişen karakter', h.fmt(degisen, 0)],
        ['Değişmeyen karakter (boşluk hariç)', h.fmt(ayni, 0)],
      ],
      text: cikti,
      note: `${ad} kendi tersidir: çıktıyı aynı yöntemle yeniden çevirirseniz özgün metni elde edersiniz.` + (ayni > 0 && y !== 'rot47' ? ' Türkçe harfler ve yöntemin kapsamı dışındaki işaretler değiştirilmez.' : ''),
    };
  }
