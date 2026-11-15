// Onaltılık Hesap Makinesi — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const oku = (s, ad) => {
      const t = String(s ?? '').trim().replace(/[\s_]/g, '').replace(/^(0x|#)/i, '');
      if (t === '') h.err(`"${ad}" alanını doldurun.`);
      if (!/^[0-9a-f]+$/i.test(t)) h.err(`"${ad}" yalnızca 0–9 rakamları ve A–F harflerinden oluşmalı; diğer karakterleri silin.`);
      if (t.length > 32) h.err(`"${ad}" en fazla 32 onaltılık basamak olabilir.`);
      return BigInt('0x' + t);
    };
    const a = oku(v.birinci, 'Birinci hex sayı');
    const b = oku(v.ikinci, 'İkinci hex sayı');
    const yaz = (x, taban) => (x < 0n ? '-' + (-x).toString(taban) : x.toString(taban)).toUpperCase();
    const dec = (x) => x.toLocaleString('tr-TR');
    let sonuc, kalan = null, simge;
    switch (v.islem) {
      case 'cikar': sonuc = a - b; simge = '−'; break;
      case 'carp': sonuc = a * b; simge = '×'; break;
      case 'bol':
        if (b === 0n) h.err('Sıfıra bölme tanımsızdır; ikinci sayıyı sıfırdan farklı yazın.');
        sonuc = a / b; kalan = a % b; simge = '÷'; break;
      case 'and': sonuc = a & b; simge = 'AND'; break;
      case 'or': sonuc = a | b; simge = 'OR'; break;
      case 'xor': sonuc = a ^ b; simge = 'XOR'; break;
      default: sonuc = a + b; simge = '+';
    }
    const rows = [[kalan === null ? 'Sonuç (hex)' : 'Bölüm (hex)', yaz(sonuc, 16)]];
    if (kalan !== null) rows.push(['Kalan (hex)', yaz(kalan, 16)]);
    rows.push(['Sonucun ondalık karşılığı', dec(sonuc)]);
    rows.push(['Sonucun ikili karşılığı', yaz(sonuc, 2)]);
    rows.push(['Ondalık sağlama', `${dec(a)} ${simge} ${dec(b)} = ${dec(sonuc)}` + (kalan !== null ? `, kalan ${dec(kalan)}` : '')]);
    return {
      rows,
      note: kalan !== null ? 'Bölme tam sayı bölmesidir: bölüm ve kalan ayrı ayrı verilir.' : 'Negatif sonuçlar başında eksi işaretiyle gösterilir; ikiye tümleyen biçimi kullanılmaz.',
    };
  }
