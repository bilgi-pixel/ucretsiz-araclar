// Sekizlik (Oktal) Ondalık Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let t = String(v.deger ?? '').trim().replace(/[\s_]/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Sayı" alanını doldurun.');
    let eksi = false;
    if (t[0] === '-') { eksi = true; t = t.slice(1); } else if (t[0] === '+') t = t.slice(1);
    let n, izin = null;
    if (v.yon === 'ondalik') {
      if (/^\d+[.,]\d+$/.test(t)) h.err('Bu araç yalnızca tam sayıları çevirir; ondalık kısmı olmayan bir sayı yazın.');
      if (!/^\d+$/.test(t)) h.err('Ondalık sayı yalnızca 0–9 rakamlarından oluşur; harf ve simgeleri silin.');
      if (t.length > 60) h.err('Sayı çok uzun; en fazla 60 basamak yazın.');
      n = BigInt(t);
    } else {
      t = t.replace(/^0o/i, '');
      if (/^\d+$/.test(t) && /[89]/.test(t)) h.err('Sekizlik sayıda 8 ve 9 rakamları bulunmaz. Ondalık bir sayı yazdıysanız çeviri yönünü "Ondalık → Sekizlik" yapın.');
      if (!/^[0-7]+$/.test(t)) h.err('Sekizlik sayı yalnızca 0–7 rakamlarından oluşur; diğer karakterleri silin.');
      if (t.length > 70) h.err('Sekizlik sayı çok uzun; en fazla 70 basamak yazın.');
      n = BigInt('0o' + t);
      if (t.length === 3 && !eksi) izin = [...t].map((c) => { const k = Number(c); return (k & 4 ? 'r' : '-') + (k & 2 ? 'w' : '-') + (k & 1 ? 'x' : '-'); }).join('');
    }
    if (n === 0n) eksi = false;
    const s = eksi ? '-' : '';
    const okSatir = ['Sekizlik', s + n.toString(8)], ondalikSatir = ['Ondalık', s + n.toString(10)];
    const rows = [
      ...(v.yon === 'ondalik' ? [okSatir, ondalikSatir] : [ondalikSatir, okSatir]),
      ['İkili', s + n.toString(2)],
      ['Onaltılık', s + n.toString(16).toUpperCase()],
    ];
    if (izin) rows.push(['Dosya izni olarak', izin]);
    return { rows, note: 'Basamak değerleri sağdan sola 1, 8, 64, 512, 4.096… biçiminde 8\'in kuvvetleridir.' };
  }
