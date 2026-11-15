// Bir Ürün Kaç Saatlik Çalışma Eder Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const fiyat = h.pos(v.fiyat, 'Ürün fiyatı');
    const gelir = h.pos(v.gelir, 'Aylık net gelir');
    const hs = h.pos(v.haftalikSaat, 'Haftalık çalışma saati');
    if (hs > 168) h.err('"Haftalık çalışma saati" 168\'den büyük olamaz; bir haftada 168 saat vardır.');
    const hg = h.posint(v.haftalikGun, 'Haftada çalışılan gün');
    if (hg > 7) h.err('"Haftada çalışılan gün" 1 ile 7 arasında olmalı.');
    const aylikSaat = hs * 52 / 12;
    const saatlik = gelir / aylikSaat;
    const saat = fiyat / saatlik;
    const gunSaat = hs / hg;
    const dkToplam = Math.round(saat * 60);
    let sure;
    if (dkToplam < 1) sure = '1 dakikadan az';
    else if (dkToplam < 60) sure = `${dkToplam} dk`;
    else sure = `${h.fmt(Math.floor(dkToplam / 60), 0)} saat ${dkToplam % 60} dk`;
    return {
      rows: [
        ['Gereken çalışma süresi', sure],
        ['İş günü karşılığı', `${h.fmt(saat / gunSaat, 2)} iş günü`],
        ['Aylık gelire oranı', `%${h.fmt(fiyat / gelir * 100, 2)}`],
        ['Saatlik net kazanç', h.para(saatlik)],
        ['Günlük net kazanç', h.para(saatlik * gunSaat)],
        ['Aylık çalışma saati', `${h.fmt(aylikSaat, 2)} saat`],
      ],
      note: 'Aylık çalışma saati, haftalık süre × 52 ÷ 12 ile bulunur. Yol, hazırlık ve fazla mesai süreleri dahil değildir; bunları eklerseniz gerçek saatlik kazancınız daha düşük çıkar.',
    };
  }
