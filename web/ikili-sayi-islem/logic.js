// İkili Sayılarla Dört İşlem — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const oku = (s, ad) => {
      const t = String(s ?? '').trim().replace(/[\s_]/g, '').replace(/^0b/i, '');
      if (t === '') h.err(`"${ad}" alanını doldurun.`);
      if (!/^[01]+$/.test(t)) h.err(`"${ad}" yalnızca 0 ve 1 rakamlarından oluşmalı; diğer karakterleri silin.`);
      if (t.length > 128) h.err(`"${ad}" en fazla 128 bit olabilir.`);
      return BigInt('0b' + t);
    };
    const a = oku(v.birinci, 'Birinci ikili sayı');
    const b = oku(v.ikinci, 'İkinci ikili sayı');
    const bin = (x) => (x < 0n ? '-' + (-x).toString(2) : x.toString(2));
    const dec = (x) => x.toLocaleString('tr-TR');
    let sonuc, kalan = null, simge;
    if (v.islem === 'cikar') { sonuc = a - b; simge = '−'; }
    else if (v.islem === 'carp') { sonuc = a * b; simge = '×'; }
    else if (v.islem === 'bol') {
      if (b === 0n) h.err('Sıfıra bölme tanımsızdır; ikinci sayıyı sıfırdan farklı yazın.');
      sonuc = a / b; kalan = a % b; simge = '÷';
    } else { sonuc = a + b; simge = '+'; }
    const rows = [[kalan === null ? 'Sonuç (ikili)' : 'Bölüm (ikili)', bin(sonuc)]];
    if (kalan !== null) rows.push(['Kalan (ikili)', bin(kalan)]);
    rows.push(['Sonucun ondalık karşılığı', dec(sonuc)]);
    rows.push(['Ondalık sağlama', `${dec(a)} ${simge} ${dec(b)} = ${dec(sonuc)}` + (kalan !== null ? `, kalan ${dec(kalan)}` : '')]);
    rows.push(['Sonucun bit sayısı', String((sonuc < 0n ? -sonuc : sonuc).toString(2).length)]);
    return {
      rows,
      note: kalan !== null ? 'Bölme tam sayı bölmesidir: bölüm ve kalan ayrı ayrı verilir.' : 'Negatif sonuçlar başında eksi işaretiyle gösterilir; ikiye tümleyen biçimi kullanılmaz.',
    };
  }
