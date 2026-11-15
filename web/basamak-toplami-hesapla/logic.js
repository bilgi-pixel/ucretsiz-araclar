// Basamak Toplamı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let s = String(v.sayi ?? '').replace(/\s/g, '').replace(/−/g, '-');
    if (s === '') h.err('"Sayı" alanını doldurun.');
    if (s[0] === '-' || s[0] === '+') s = s.slice(1);
    if (!/^\d+$/.test(s)) h.err('Yalnızca rakamlardan oluşan bir tam sayı yazın; nokta, virgül ya da harf kullanmayın (örn. 12345).');
    s = s.replace(/^0+(?=\d)/, '');
    if (s.length > 1000) h.err('Sayı en fazla 1000 basamaklı olabilir; daha kısa bir sayı yazın.');
    let toplam = 0;
    let carpim = 1n;
    for (const c of s) { const d = c.charCodeAt(0) - 48; toplam += d; carpim *= BigInt(d); }
    const kok = toplam === 0 ? 0 : 1 + ((toplam - 1) % 9);
    // Kök adımları: 12345 → 15 → 6
    const adimlar = [];
    let t = toplam;
    while (t > 9) { adimlar.push(t); t = String(t).split('').reduce((a, c) => a + Number(c), 0); }
    adimlar.push(t);
    const rows = [
      ['Basamak toplamı', String(toplam)],
      ['Basamak sayısı', String(s.length)],
      ['Sayısal kök', String(kok)],
      ['Basamak çarpımı', String(carpim)],
      ['3 ile bölünebilir mi?', toplam % 3 === 0 ? 'Evet' : 'Hayır'],
      ['9 ile bölünebilir mi?', toplam % 9 === 0 ? 'Evet' : 'Hayır'],
    ];
    if (s.length <= 40) rows.push(['İşlem', s.length === 1 ? s : `${s.split('').join(' + ')} = ${toplam}`]);
    return {
      rows,
      note: adimlar.length > 1 ? `Sayısal kök adımları: ${adimlar.join(' → ')}.` : 'Basamak toplamı tek basamaklı olduğu için sayısal kök toplamın kendisidir.',
    };
  }
