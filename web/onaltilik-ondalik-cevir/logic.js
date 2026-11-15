// Onaltılık (Hex) Ondalık Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let t = String(v.deger ?? '').trim().replace(/[\s_]/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Sayı" alanını doldurun.');
    let eksi = false;
    if (t[0] === '-') { eksi = true; t = t.slice(1); } else if (t[0] === '+') t = t.slice(1);
    let n, renk = null;
    if (v.yon === 'ondalik') {
      if (/^\d+[.,]\d+$/.test(t)) h.err('Bu araç yalnızca tam sayıları çevirir; ondalık kısmı olmayan bir sayı yazın.');
      if (!/^\d+$/.test(t)) h.err('Ondalık sayı yalnızca 0–9 rakamlarından oluşur. Harf içeren bir değer yazdıysanız çeviri yönünü "Onaltılık → Ondalık" yapın.');
      if (t.length > 60) h.err('Sayı çok uzun; en fazla 60 basamak yazın.');
      n = BigInt(t);
    } else {
      t = t.replace(/^(0x|#)/i, '');
      if (!/^[0-9a-f]+$/i.test(t)) h.err('Onaltılık sayı yalnızca 0–9 rakamları ve A–F harflerinden oluşur; diğer karakterleri silin.');
      if (t.length > 50) h.err('Onaltılık sayı çok uzun; en fazla 50 basamak yazın.');
      n = BigInt('0x' + t);
      if (t.length === 6 && !eksi) renk = [0, 2, 4].map((i) => parseInt(t.slice(i, i + 2), 16)).join(', ');
    }
    if (n === 0n) eksi = false;
    const s = eksi ? '-' : '';
    const hexSatir = ['Onaltılık', s + n.toString(16).toUpperCase()], ondalikSatir = ['Ondalık', s + n.toString(10)];
    const rows = [
      ...(v.yon === 'ondalik' ? [hexSatir, ondalikSatir] : [ondalikSatir, hexSatir]),
      ['İkili', s + n.toString(2)],
      ['Sekizlik', s + n.toString(8)],
    ];
    if (renk) rows.push(['Renk kodu olarak RGB', renk]);
    return { rows, note: 'Onaltılık basamaklar: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.' };
  }
