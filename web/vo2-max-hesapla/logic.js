// VO2 Max Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = v.yontem || 'cooper';
    let vo2, ad, girdi;
    if (y === 'cooper') {
      const m = h.pos(v.mesafe, '12 dakikada koşulan mesafe');
      if (m < 1000 || m > 5000) h.err('Mesafe 1.000 ile 5.000 metre arasında olmalı. Değeri kilometre değil metre olarak yazın.');
      vo2 = (m - 504.9) / 44.73;
      ad = 'Cooper 12 dakika testi';
      girdi = h.fmt(m, 0) + ' m';
    } else if (y === 'kosu') {
      const dk = h.pos(v.sure, '2,4 km koşu süresi');
      if (dk < 6 || dk > 30) h.err('2,4 km süresi 6 ile 30 dakika arasında olmalı.');
      vo2 = 483 / dk + 3.5;
      ad = '2,4 km koşu testi';
      girdi = h.fmt(dk, 2) + ' dk';
    } else if (y === 'nabiz') {
      const mx = h.pos(v.maksNabiz, 'Maksimum nabız');
      const dn = h.pos(v.dinlenmeNabiz, 'Dinlenme nabzı');
      if (mx < 100 || mx > 230) h.err('Maksimum nabız 100 ile 230 atım/dk arasında olmalı.');
      if (dn < 25 || dn > 120) h.err('Dinlenme nabzı 25 ile 120 atım/dk arasında olmalı.');
      if (dn >= mx) h.err('Dinlenme nabzı maksimum nabızdan küçük olmalı.');
      vo2 = 15.3 * (mx / dn);
      ad = 'Nabız oranı yöntemi';
      girdi = `${h.fmt(mx, 0)} / ${h.fmt(dn, 0)} atım/dk`;
    } else h.err('Geçerli bir yöntem seçin.');
    const rows = [
      ['VO2 max', h.fmt(vo2, 1) + ' ml/kg/dk'],
      ['MET kapasitesi', h.fmt(vo2 / 3.5, 1) + ' MET'],
      ['Yöntem', ad],
      ['Kullanılan değer', girdi],
    ];
    if (String(v.kilo ?? '').trim() !== '') {
      const kg = h.pos(v.kilo, 'Vücut ağırlığı');
      if (kg < 25 || kg > 250) h.err('Vücut ağırlığı 25 ile 250 kg arasında olmalı.');
      rows.push(['Mutlak VO2 max', h.fmt((vo2 * kg) / 1000, 2) + ' L/dk']);
    }
    return { rows, note: 'Saha testleri laboratuvar ölçümünün yerini tutmaz; sonuç tahmindir ve birkaç ml/kg/dk sapabilir.' };
  }
