// Crop Faktörü ve Eşdeğer Odak Uzaklığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const f = h.pos(v.odak, 'Objektif odak uzaklığı');
    let c;
    if (v.sensor === 'ozel') {
      c = h.pos(v.ozel, 'Özel crop faktörü');
      if (c > 20) h.err('Crop faktörü 20\'den büyük olamaz; değeri kontrol edin.');
    } else c = Number(v.sensor);
    const fe = f * c;
    const kosegen = Math.sqrt(36 * 36 + 24 * 24);
    const aci = 2 * Math.atan(kosegen / (2 * fe)) * 180 / Math.PI;
    let tur;
    if (fe < 24) tur = 'Ultra geniş açı';
    else if (fe < 35) tur = 'Geniş açı';
    else if (fe <= 60) tur = 'Normal (standart)';
    else if (fe <= 135) tur = 'Kısa tele (portre)';
    else if (fe <= 300) tur = 'Tele';
    else tur = 'Süper tele';
    const rows = [
      ['Eşdeğer odak uzaklığı', h.fmt(fe, 1) + ' mm'],
      ['Crop faktörü', h.fmt(c, 2) + '×'],
      ['Köşegen görüş açısı', h.fmt(aci, 2) + '°'],
      ['Objektif sınıfı', tur],
      ['Sensör köşegeni', h.fmt(kosegen / c, 1) + ' mm'],
    ];
    if (String(v.diyafram ?? '').trim() !== '') {
      const N = h.pos(v.diyafram, 'Diyafram');
      rows.splice(1, 0, ['Eşdeğer diyafram (alan derinliği)', 'f/' + h.fmt(N * c, 1)]);
    }
    return {
      rows,
      note: 'Eşdeğer diyafram yalnızca alan derinliği ve toplam ışık içindir; pozlama ayarı objektifteki f değeriyle yapılır.',
    };
  }
