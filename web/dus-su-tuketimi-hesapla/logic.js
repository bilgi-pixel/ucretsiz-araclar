// Duş Su Tüketimi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sure = h.pos(v.sure, 'Duş süresi');
    const debi = h.pos(v.debi === '' ? '10' : v.debi, 'Duş başlığı debisi');
    const gunluk = h.pos(v.gunluk === '' ? '1' : v.gunluk, 'Günlük duş sayısı');
    const kisi = h.posint(v.kisi === '' ? '1' : v.kisi, 'Kişi sayısı');
    const fark = h.nonneg(v.fark === '' ? '25' : v.fark, 'Sıcaklık farkı');
    if (sure > 600) h.err('Duş süresi en fazla 600 dakika olabilir.');
    if (debi > 100) h.err('Debi en fazla 100 litre/dakika olabilir.');
    if (fark > 90) h.err('Sıcaklık farkı en fazla 90 °C olabilir.');
    const dus = sure * debi;
    const gun = dus * gunluk * kisi;
    const ay = gun * 30, yil = gun * 365;
    const kwhDus = dus * fark * 1.163 / 1000;
    const rows = [
      ['Bir duşta', h.fmt(dus, 1) + ' litre'],
      ['Günlük', h.fmt(gun, 1) + ' litre'],
      ['Aylık (30 gün)', h.fmt(ay, 0) + ' litre (' + h.fmt(ay / 1000, 2) + ' m³)'],
      ['Yıllık (365 gün)', h.fmt(yil, 0) + ' litre (' + h.fmt(yil / 1000, 2) + ' m³)'],
      ['Isıtma enerjisi (duş başına)', h.fmt(kwhDus, 2) + ' kWh'],
      ['Isıtma enerjisi (aylık)', h.fmt(kwhDus * gunluk * kisi * 30, 1) + ' kWh'],
    ];
    if (String(v.fiyat || '').trim() !== '') {
      const f = h.pos(v.fiyat, 'Su birim fiyatı');
      rows.push(['Aylık su tutarı', h.para(ay / 1000 * f)]);
      rows.push(['Yıllık su tutarı', h.para(yil / 1000 * f)]);
    }
    return {
      rows,
      note: 'Isıtma enerjisi, suyun özgül ısısı (1 litre suyu 1 °C ısıtmak için 1,163 Wh) ile hesaplanan net ısıdır; kombi ya da şofbenin verim kaybı dahil değildir.',
    };
  }
