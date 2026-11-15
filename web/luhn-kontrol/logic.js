// Luhn Algoritması Kontrolü — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.numara ?? '').trim();
    if (ham === '') h.err('"Numara" alanını doldurun.');
    if (!/^[\d\s-]+$/.test(ham)) h.err('Numara yalnızca rakam, boşluk ve tire içerebilir. Harf ve diğer işaretleri silin.');
    const d = ham.replace(/[\s-]/g, '');
    if (d.length < 2) h.err('Luhn denetimi için en az 2 haneli bir numara gerekir (son hane kontrol hanesidir).');
    if (d.length > 64) h.err('Numara en fazla 64 haneli olabilir.');
    const don = [];
    let toplam = 0;
    let katlanan = 0;
    for (let i = d.length - 1, sira = 1; i >= 0; i--, sira++) {
      let x = d.charCodeAt(i) - 48;
      if (sira % 2 === 0) {
        x *= 2;
        if (x > 9) x -= 9;
        katlanan++;
      }
      toplam += x;
      don.unshift(x);
    }
    const kalan = toplam % 10;
    return {
      rows: [
        ['Sonuç', kalan === 0 ? 'Geçerli – Luhn denetiminden geçti' : 'Geçersiz – Luhn denetiminden geçmedi'],
        ['Hane sayısı', String(d.length)],
        ['Luhn toplamı', String(toplam)],
        ['Toplamın 10\'a bölümünden kalan', String(kalan)],
        ['Kontrol hanesi (son hane)', d[d.length - 1]],
        ['İkiye katlanan hane sayısı', String(katlanan)],
        ['Dönüştürülmüş haneler', don.join(' ')],
      ],
      note: kalan === 0
        ? 'Denetimden geçmek yalnızca hanelerin kendi içinde tutarlı olduğunu gösterir; numaranın gerçekten var olduğu ya da kullanılabilir olduğu anlamına gelmez.'
        : 'Bir hane yanlış yazılmış ya da iki komşu hane yer değiştirmiş olabilir. Numarayı kaynağından yeniden kontrol edin.',
    };
  }
