// Bisiklet Hız ve Kadans Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kadans = h.pos(v.kadans, 'Kadans');
    if (kadans > 250) h.err('Kadans 250 tur/dakikadan büyük olamaz; değeri kontrol edin.');
    const on = h.posint(v.on, 'Aynakol diş sayısı');
    const arka = h.posint(v.arka, 'Arka dişli diş sayısı');
    if (on > 80 || arka > 80) h.err('Diş sayısı 80\'den büyük olamaz; değerleri kontrol edin.');
    const ozel = String(v.cevre ?? '').trim();
    const cevre = ozel === '' ? Number(v.lastik || 2105) : h.pos(ozel, 'Tekerlek çevresi');
    if (cevre < 500 || cevre > 3500) h.err('Tekerlek çevresi 500 ile 3500 mm arasında olmalı (milimetre olarak yazın).');
    const oran = on / arka;
    const yol = oran * cevre / 1000;
    const hiz = (k) => k * yol * 60 / 1000;
    const rows = [
      ['Hız', h.fmt(hiz(kadans), 2) + ' km/sa'],
      ['Vites oranı', h.fmt(oran, 2)],
      ['Pedal turu başına yol', h.fmt(yol, 2) + ' m'],
      ['Tekerlek devri', h.fmt(kadans * oran, 0) + ' tur/dk'],
      ['Kullanılan tekerlek çevresi', h.fmt(cevre, 0) + ' mm'],
    ];
    const hedefHam = String(v.hedef ?? '').trim();
    if (hedefHam !== '') {
      const hedef = h.pos(hedefHam, 'Hedef hız');
      rows.push([`${h.fmt(hedef, 1)} km/sa için gereken kadans`, h.fmt(hedef * 1000 / 60 / yol, 1) + ' tur/dk']);
    }
    const satirlar = [60, 70, 80, 90, 100, 110].map((k) => `${k} tur/dk → ${h.fix(hiz(k), 1)} km/sa`);
    return {
      rows,
      text: `${on}/${arka} vitesinde kadansa göre hız:\n` + satirlar.join('\n'),
      note: 'Lastik çevreleri yaklaşık değerlerdir; lastik markası, basıncı ve sürücü ağırlığı çevreyi birkaç milimetre değiştirebilir.',
    };
  }
