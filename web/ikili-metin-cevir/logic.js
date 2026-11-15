// Metni İkili Koda (Binary) Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.girdi ?? '');
    if (s.trim() === '') h.err('Çevirmek için kutuya bir metin ya da ikili kod yazın.');
    if (v.yon === 'metin') {
      const bitler = s.replace(/[\s,;]+/g, '');
      const kotu = /[^01]/.exec(bitler);
      if (kotu) h.err(`İkili kod yalnızca 0 ve 1 içerebilir; "${kotu[0]}" karakteri geçersiz. Metni koda çevirmek istiyorsanız yönü değiştirin.`);
      if (bitler.length % 8 !== 0) h.err(`İkili kod 8 bitlik baytlardan oluşmalı. Girilen ${bitler.length} bit 8'in katı değil; eksik ya da fazla basamak olup olmadığını denetleyin.`);
      const bayt = new Uint8Array(bitler.length / 8);
      for (let i = 0; i < bayt.length; i++) bayt[i] = parseInt(bitler.slice(i * 8, i * 8 + 8), 2);
      let metin;
      try { metin = new TextDecoder('utf-8', { fatal: true }).decode(bayt); }
      catch (e) { h.err('Bu bayt dizisi geçerli bir UTF-8 metni değil. Kod başka bir kodlamayla üretilmiş ya da eksik kopyalanmış olabilir.'); }
      return {
        rows: [
          ['Bayt sayısı', h.fmt(bayt.length, 0)],
          ['Bit sayısı', h.fmt(bitler.length, 0)],
          ['Karakter sayısı', h.fmt(Array.from(metin).length, 0)],
        ],
        text: metin,
        note: 'Baytlar UTF-8 olarak çözüldü. Boşluk, virgül ve satır sonları ayraç sayılır.',
      };
    }
    const metin = s.replace(/\r\n?/g, '\n');
    const bayt = new TextEncoder().encode(metin);
    const parcalar = Array.from(bayt, (b) => b.toString(2).padStart(8, '0'));
    const ayr = v.ayrac === 'yok' ? '' : v.ayrac === 'satir' ? '\n' : ' ';
    const karakter = Array.from(metin).length;
    return {
      rows: [
        ['Bayt sayısı', h.fmt(bayt.length, 0)],
        ['Bit sayısı', h.fmt(bayt.length * 8, 0)],
        ['Karakter sayısı', h.fmt(karakter, 0)],
      ],
      text: parcalar.join(ayr),
      note: bayt.length > karakter ? 'ASCII dışındaki karakterler (Türkçe harfler, emojiler) UTF-8\'de birden çok bayt tuttuğu için bayt sayısı karakter sayısından fazladır.' : 'Metindeki her karakter ASCII olduğu için tek bayt, yani 8 bit tutar.',
    };
  }
