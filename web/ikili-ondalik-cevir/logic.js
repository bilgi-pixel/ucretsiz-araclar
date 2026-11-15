// İkili (Binary) Ondalık Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let t = String(v.deger ?? '').trim().replace(/[\s_]/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Sayı" alanını doldurun.');
    let eksi = false;
    if (t[0] === '-') { eksi = true; t = t.slice(1); } else if (t[0] === '+') t = t.slice(1);
    let n;
    if (v.yon === 'ondalik') {
      if (/^\d+[.,]\d+$/.test(t)) h.err('Bu araç yalnızca tam sayıları çevirir; ondalık kısmı olmayan bir sayı yazın.');
      if (!/^\d+$/.test(t)) h.err('Ondalık sayı yalnızca 0–9 rakamlarından oluşur; harf ve simgeleri silin.');
      if (t.length > 60) h.err('Sayı çok uzun; en fazla 60 basamak yazın.');
      n = BigInt(t);
    } else {
      t = t.replace(/^0b/i, '');
      if (!/^[01]+$/.test(t)) h.err('İkili sayı yalnızca 0 ve 1 rakamlarından oluşur; diğer karakterleri silin ya da çeviri yönünü değiştirin.');
      if (t.length > 200) h.err('İkili sayı çok uzun; en fazla 200 basamak yazın.');
      n = BigInt('0b' + t);
    }
    if (n === 0n) eksi = false;
    const s = eksi ? '-' : '';
    const bin = n.toString(2);
    const grup = bin.padStart(Math.ceil(bin.length / 4) * 4, '0').replace(/(.{4})(?=.)/g, '$1 ');
    const ikiliSatir = ['İkili', s + bin], ondalikSatir = ['Ondalık', s + n.toString(10)];
    return {
      rows: [
        ...(v.yon === 'ondalik' ? [ikiliSatir, ondalikSatir] : [ondalikSatir, ikiliSatir]),
        ['Dörtlü gruplarla', s + grup],
        ['Onaltılık', s + n.toString(16).toUpperCase()],
        ['Sekizlik', s + n.toString(8)],
        ['Bit sayısı', String(bin.length)],
      ],
      note: 'Dörtlü gruplar, soldan sıfır eklenerek tamamlanır; her grup bir onaltılık basamağa karşılık gelir.',
    };
  }
