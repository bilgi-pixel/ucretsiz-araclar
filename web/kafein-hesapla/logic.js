// Günlük Kafein Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kaynak = [
      ['turkKahvesi', 'Türk kahvesi', 60],
      ['filtre', 'Filtre kahve', 95],
      ['espresso', 'Espresso', 63],
      ['hazir', 'Hazır kahve', 60],
      ['cay', 'Siyah çay', 20],
      ['yesilCay', 'Yeşil çay', 28],
      ['kola', 'Kolalı içecek', 35],
      ['enerji', 'Enerji içeceği', 80],
    ];
    let toplam = 0, enCok = null;
    for (const [id, ad, mg] of kaynak) {
      const adet = h.opt(v[id], 0, ad);
      if (adet < 0) h.err(`"${ad}" adedi negatif olamaz.`);
      if (adet > 100) h.err(`"${ad}" adedi 100'den büyük olamaz.`);
      const m = adet * mg;
      toplam += m;
      if (m > 0 && (!enCok || m > enCok[1])) enCok = [ad, m];
    }
    const diger = h.opt(v.diger, 0, 'Diğer kaynaklar');
    if (diger < 0) h.err('"Diğer kaynaklar" negatif olamaz.');
    toplam += diger;
    if (diger > 0 && (!enCok || diger > enCok[1])) enCok = ['Diğer kaynaklar', diger];
    if (!(toplam > 0)) h.err('En az bir içecek için adet ya da "Diğer kaynaklar" alanına miligram değeri girin.');
    const sinir = 400;
    let durum;
    if (toplam <= 200 + 1e-9) durum = 'Düşük–orta düzey';
    else if (toplam <= sinir + 1e-9) durum = '400 mg düzeyinin altında';
    else durum = '400 mg düzeyinin üzerinde';
    const rows = [
      ['Toplam kafein', h.fmt(toplam, 0) + ' mg'],
      ['400 mg düzeyine oran', '%' + h.fmt((toplam / sinir) * 100, 0)],
      toplam <= sinir + 1e-9 ? ['400 mg düzeyine kalan', h.fmt(sinir - toplam, 0) + ' mg'] : ['400 mg düzeyini aşan', h.fmt(toplam - sinir, 0) + ' mg'],
      ['Değerlendirme', durum],
      ['En büyük kaynak', `${enCok[0]} (${h.fmt(enCok[1], 0)} mg)`],
      ['Filtre kahve eşdeğeri', h.fmt(toplam / 95, 1) + ' kupa'],
    ];
    if (String(v.kilo ?? '').trim() !== '') {
      const kg = h.pos(v.kilo, 'Vücut ağırlığı');
      if (kg < 20 || kg > 250) h.err('Vücut ağırlığı 20 ile 250 kg arasında olmalı.');
      rows.push(['Kilogram başına', h.fmt(toplam / kg, 1) + ' mg/kg']);
    }
    return { rows, note: 'İçeceklerin kafein içeriği demleme süresine, çekirdek ve çay türüne, porsiyona göre değişir; değerler yaklaşık ortalamalardır.' };
  }
