// Hesap Bölüşme (Adisyon Paylaşma) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const toplam = h.pos(v.toplam, 'Hesap toplamı');
    const kisi = h.posint(v.kisi, 'Kişi sayısı');
    const bahsis = h.nonneg(h.opt(v.bahsis, 0, 'Bahşiş oranı'), 'Bahşiş oranı');
    const ekstra = String(v.ozel ?? '').trim() === '' ? [] : h.nums(v.ozel, 'Kişiye özel ekstralar');
    if (ekstra.some((e) => e < 0)) h.err('"Kişiye özel ekstralar" negatif olamaz.');
    if (ekstra.length > kisi) h.err(`Ekstra sayısı (${ekstra.length}) kişi sayısından (${kisi}) fazla olamaz; her sayı ayrı bir kişiye aittir.`);
    const ekstraToplam = ekstra.reduce((a, b) => a + b, 0);
    if (ekstraToplam > toplam + 1e-9) h.err('Ekstraların toplamı hesap toplamını aşıyor; ekstralar hesap toplamının içinde olmalı.');
    const adim = { 1: 1, 5: 5, 10: 10 }[v.yuvarla] || 0;
    const yuvarla = (x) => (adim ? Math.ceil(x / adim - 1e-9) * adim : Math.round(x * 100) / 100);
    const carpan = 1 + bahsis / 100;
    const ortak = toplam - ekstraToplam;
    const taban = yuvarla(ortak / kisi * carpan);
    const ozelPaylar = ekstra.map((e) => yuvarla((ortak / kisi + e) * carpan));
    const toplanan = ozelPaylar.reduce((a, b) => a + b, 0) + taban * (kisi - ekstra.length);
    const hedef = toplam * carpan;
    const rows = [
      ['Kişi başı ödeme', h.para(taban)],
      ['Bahşiş dahil toplam', h.para(hedef)],
      ['Bahşiş tutarı', h.para(hedef - toplam)],
      ['Eşit bölünen ortak tutar', h.para(ortak)],
      ['Toplanan tutar', h.para(toplanan)],
      ['Yuvarlama farkı', h.para(toplanan - hedef)],
    ];
    const sonuc = { rows };
    if (ekstra.length) {
      const satirlar = ekstra.map((e, i) => `${i + 1}. kişi: ${h.para(ozelPaylar[i])} (ekstra ${h.para(e)} dahil)`);
      const kalan = kisi - ekstra.length;
      if (kalan > 0) satirlar.push(`Diğer ${kalan} kişi: ${h.para(taban)}`);
      sonuc.text = satirlar.join('\n');
      sonuc.note = '"Kişi başı ödeme" ekstrası olmayan kişilerin payıdır; ekstrası olanların ödeyeceği tutar aşağıdaki listede yer alır.';
    } else {
      sonuc.note = adim
        ? 'Paylar yukarı yuvarlandığı için toplanan tutar hesabı biraz aşar; fark masada bahşişe eklenebilir.'
        : 'Kuruş yuvarlaması nedeniyle toplanan tutar ile hesap arasında birkaç kuruşluk fark oluşabilir.';
    }
    return sonuc;
  }
