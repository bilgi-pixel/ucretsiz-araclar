// Toner ve Kartuş Ömrü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const verim = h.pos(v.verim, 'Kartuşun sayfa verimi');
    const dol = h.opt(v.doluluk, 5, 'Gerçek doluluk oranı');
    if (!(dol > 0) || dol > 100) h.err('Doluluk oranı 0 ile 100 arasında olmalı; emin değilseniz 5 yazın.');
    const kalan = h.opt(v.kalan, 100, 'Kalan toner');
    if (kalan < 0 || kalan > 100) h.err('Kalan toner yüzdesi 0 ile 100 arasında olmalı.');
    const gunluk = h.pos(v.gunluk, 'Günlük baskı adedi');
    const isGunu = h.opt(v.isGunu, 22, 'Aylık çalışma günü');
    if (!(isGunu > 0) || isGunu > 31) h.err('Aylık çalışma günü 1 ile 31 arasında olmalı.');
    const tamVerim = verim * 5 / dol;
    const kalanSayfa = tamVerim * kalan / 100;
    const gun = kalanSayfa / gunluk;
    const yillikSayfa = gunluk * isGunu * 12;
    const yillikKartus = yillikSayfa / tamVerim;
    const adet = Math.ceil(yillikKartus - 1e-9);
    return {
      rows: [
        ['Kartuş ömrü', h.fmt(gun, 1) + ' iş günü'],
        ['Basılabilecek sayfa', h.fmt(kalanSayfa, 0) + ' sayfa'],
        ['Takvim karşılığı', h.fmt(gun / isGunu, 2) + ' ay'],
        ['Dolu kartuşun gerçek verimi', h.fmt(tamVerim, 0) + ' sayfa'],
        ['Yıllık baskı adedi', h.fmt(yillikSayfa, 0) + ' sayfa'],
        ['Yıllık kartuş ihtiyacı', h.fmt(yillikKartus, 2) + ' adet (' + adet + ' kartuş)'],
      ],
      note: 'Gerçek verim = kutudaki verim × 5 ÷ doluluk. Yıl 12 ay ve her ay girdiğiniz çalışma günü kadar baskı yapıldığı varsayılmıştır.',
    };
  }
