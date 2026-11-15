// Bit İşlemleri (AND, OR, XOR) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const w = [8, 16, 32, 64].includes(Number(v.genislik)) ? Number(v.genislik) : 32;
    const W = BigInt(w);
    const mod = 1n << W;
    const maske = mod - 1n;
    const oku = (s, ad) => {
      let t = String(s ?? '').trim().replace(/[\s_]/g, '').replace(/−/g, '-');
      if (t === '') h.err(`"${ad}" alanını doldurun.`);
      let eksi = false;
      if (t[0] === '-') { eksi = true; t = t.slice(1); } else if (t[0] === '+') t = t.slice(1);
      if (!/^(0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+)$/.test(t)) h.err(`"${ad}" geçerli bir tam sayı değil. Ondalık (12), onaltılık (0x0C), ikili (0b1100) ya da sekizlik (0o14) yazın.`);
      if (t.length > 80) h.err(`"${ad}" çok uzun.`);
      let n = BigInt(t);
      if (eksi) n = -n;
      if (n > maske || n < -(mod >> 1n)) h.err(`"${ad}" ${w} bite sığmıyor. Daha büyük bir bit genişliği seçin ya da sayıyı küçültün.`);
      return n & maske;
    };
    const op = v.islem || 'and';
    const A = oku(v.a, 'A sayısı');
    const kaydirma = op === 'shl' || op === 'shr' || op === 'sar';
    let B = 0n;
    if (kaydirma) {
      const t = String(v.b ?? '').trim();
      if (!/^\d{1,3}$/.test(t)) h.err('Kaydırma miktarını 0 ya da pozitif bir tam sayı olarak "B sayısı" alanına yazın.');
      B = BigInt(t);
      if (B > W) h.err(`Kaydırma miktarı bit genişliğinden (${w}) büyük olamaz.`);
    } else if (op !== 'not') B = oku(v.b, 'B sayısı');
    const isaretli = (x) => (x >= (mod >> 1n) ? x - mod : x);
    let r;
    if (op === 'and') r = A & B;
    else if (op === 'or') r = A | B;
    else if (op === 'xor') r = A ^ B;
    else if (op === 'not') r = ~A;
    else if (op === 'nand') r = ~(A & B);
    else if (op === 'nor') r = ~(A | B);
    else if (op === 'xnor') r = ~(A ^ B);
    else if (op === 'shl') r = A << B;
    else if (op === 'shr') r = A >> B;
    else r = isaretli(A) >> B;
    r &= maske;
    const iki = (x) => x.toString(2).padStart(w, '0').replace(/(.{4})(?=.)/g, '$1 ');
    const on6 = (x) => '0x' + x.toString(16).toUpperCase().padStart(w / 4, '0');
    const bin = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const birler = r.toString(2).replace(/0/g, '').length;
    const rows = [
      ['Sonuç (ondalık)', bin(r)],
      ['Sonuç (ikili)', iki(r)],
      ['Sonuç (onaltılık)', on6(r)],
      ['Sonuç (sekizlik)', '0o' + r.toString(8)],
      ['Sonuç (işaretli ondalık)', bin(isaretli(r)).replace(/^-\./, '-')],
      ['A (ikili)', iki(A)],
    ];
    if (!kaydirma && op !== 'not') rows.push(['B (ikili)', iki(B)]);
    rows.push(['1 olan bit sayısı', String(birler)]);
    return {
      rows,
      note: `Hesap ${w} bit genişliğinde yapılır; bu genişliğin dışına taşan bitler atılır. İşaretli değer ikiye tümleyen yorumudur.`,
    };
  }
