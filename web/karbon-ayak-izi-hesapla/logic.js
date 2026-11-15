// Karbon Ayak İzi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const YAKIT = { benzin: 2.31, dizel: 2.68, lpg: 1.51 };
    const GAZ = 2.0, UCUS = 0.15;
    const el = h.opt(v.elektrik, 0, 'Elektrik tüketimi');
    const fk = h.opt(v.faktor, 0.44, 'Elektrik emisyon faktörü');
    const gaz = h.opt(v.gaz, 0, 'Doğal gaz tüketimi');
    const yk = h.opt(v.yakit, 0, 'Yakıt tüketimi');
    const uc = h.opt(v.ucus, 0, 'Uçuş mesafesi');
    const kisi = h.posint(String(v.kisi || '').trim() === '' ? '1' : v.kisi, 'Kişi sayısı');
    if (el < 0 || fk < 0 || gaz < 0 || yk < 0 || uc < 0) h.err('Tüketim değerleri negatif olamaz.');
    if (fk > 2) h.err('Elektrik emisyon faktörü 0 ile 2 kg CO₂/kWh arasında olmalı.');
    if (el + gaz + yk + uc <= 0) h.err('En az bir tüketim kalemi girin (elektrik, doğal gaz, yakıt ya da uçuş).');
    const kEl = el * 12 * fk;
    const kGaz = gaz * 12 * GAZ;
    const kYk = yk * 12 * (YAKIT[v.yakitTur] || 2.31);
    const kUc = uc * UCUS;
    const top = kEl + kGaz + kYk + kUc;
    const kalemler = [['Elektrik', kEl], ['Doğal gaz', kGaz], ['Araç yakıtı', kYk], ['Uçuş', kUc]];
    let buyuk = kalemler[0];
    for (const k of kalemler) if (k[1] > buyuk[1]) buyuk = k;
    const pay = (x) => h.fmt(x, 0) + ' kg (%' + h.fmt(top > 0 ? x / top * 100 : 0, 1) + ')';
    return {
      rows: [
        ['Yıllık karbon ayak izi', h.fmt(top / 1000, 2) + ' ton CO₂'],
        ['Kişi başı yıllık', h.fmt(top / 1000 / kisi, 2) + ' ton CO₂'],
        ['Aylık ortalama', h.fmt(top / 12, 1) + ' kg CO₂'],
        ['Elektrik', pay(kEl)],
        ['Doğal gaz', pay(kGaz)],
        ['Araç yakıtı', pay(kYk)],
        ['Uçuş', pay(kUc)],
        ['En büyük kalem', buyuk[0]],
      ],
      note: 'Yaklaşık faktörler: doğal gaz 2,0 kg CO₂/m³, uçuş 0,15 kg CO₂/yolcu-km. Beslenme, alışveriş, toplu taşıma ve atık dahil değildir; sonuç yalnızca girilen kalemlerin tahminidir.',
    };
  }
