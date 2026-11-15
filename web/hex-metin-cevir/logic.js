// Metni Hex Koda Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.girdi ?? '');
    if (s.trim() === '') h.err('Çevirmek için kutuya bir metin ya da hex kod yazın.');
    if (v.yon === 'metin') {
      const hex = s.replace(/0x|\\x/gi, '').replace(/[\s,;:\-]+/g, '');
      const kotu = /[^0-9a-f]/i.exec(hex);
      if (kotu) h.err(`Hex kod yalnızca 0–9 ve A–F içerebilir; "${kotu[0]}" karakteri geçersiz. Metni koda çevirmek istiyorsanız yönü değiştirin.`);
      if (hex.length === 0) h.err('Kutuda çevrilecek hex basamağı bulunamadı.');
      if (hex.length % 2 !== 0) h.err(`Her bayt iki hex basamağıdır. Girilen ${hex.length} basamak çift sayı değil; eksik ya da fazla basamak olup olmadığını denetleyin.`);
      const bayt = new Uint8Array(hex.length / 2);
      for (let i = 0; i < bayt.length; i++) bayt[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
      let metin;
      try { metin = new TextDecoder('utf-8', { fatal: true }).decode(bayt); }
      catch (e) { h.err('Bu bayt dizisi geçerli bir UTF-8 metni değil. Kod başka bir kodlamayla üretilmiş, ikili (metin olmayan) veri içeriyor ya da eksik kopyalanmış olabilir.'); }
      return {
        rows: [
          ['Bayt sayısı', h.fmt(bayt.length, 0)],
          ['Hex basamak sayısı', h.fmt(hex.length, 0)],
          ['Karakter sayısı', h.fmt(Array.from(metin).length, 0)],
        ],
        text: metin,
        note: 'Baytlar UTF-8 olarak çözüldü. 0x ve \\x önekleri, boşluk, virgül, iki nokta ve tire ayraç sayılır.',
      };
    }
    const metin = s.replace(/\r\n?/g, '\n');
    const bayt = new TextEncoder().encode(metin);
    const kucuk = v.harf === 'kucuk';
    const cift = Array.from(bayt, (b) => { const x = b.toString(16).padStart(2, '0'); return kucuk ? x : x.toUpperCase(); });
    let cikti;
    if (v.bicim === 'yok') cikti = cift.join('');
    else if (v.bicim === 'onek') cikti = cift.map((x) => '0x' + x).join(' ');
    else if (v.bicim === 'nokta') cikti = cift.join(':');
    else cikti = cift.join(' ');
    const karakter = Array.from(metin).length;
    return {
      rows: [
        ['Bayt sayısı', h.fmt(bayt.length, 0)],
        ['Hex basamak sayısı', h.fmt(bayt.length * 2, 0)],
        ['Karakter sayısı', h.fmt(karakter, 0)],
      ],
      text: cikti,
      note: bayt.length > karakter ? 'ASCII dışındaki karakterler UTF-8\'de birden çok bayt tuttuğu için bayt sayısı karakter sayısından fazladır.' : 'Metindeki her karakter ASCII olduğu için tek bayt, yani iki hex basamağı tutar.',
    };
  }
