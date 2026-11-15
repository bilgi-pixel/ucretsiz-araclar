// Işık Yılı Kilometre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const LY = 9460730472580.8; // km: 299.792,458 km/sn × 31.557.600 sn (Jülyen yılı)
    const AU = 149597870.7; // km
    const PC = AU * 648000 / Math.PI; // km
    const km = v.yon === 'km' ? x : x * LY;
    const ly = v.yon === 'km' ? x / LY : x;
    const genel = (n, d) => (n < 1e-3 || n >= 1e12 ? h.sig(n, 7) : h.fmt(n, d));
    let kmMetni;
    if (km < 1e9) kmMetni = h.fmt(km, 4);
    else if (km < 1e14) kmMetni = h.fmt(km, 1);
    else if (km < 1e15) kmMetni = h.fmt(km, 0);
    else kmMetni = h.sig(km, 7);
    const [mant, us] = km.toExponential(4).split('e');
    const bilimsel = `${String(Number(mant)).replace('.', ',')} × 10^${Number(us)} km`;
    return {
      rows: [
        v.yon === 'km' ? ['Işık yılı', h.sig(ly, 7) + ' ışık yılı'] : ['Kilometre', kmMetni + ' km'],
        v.yon === 'km' ? ['Kilometre', kmMetni + ' km'] : ['Işık yılı', h.sig(ly, 7) + ' ışık yılı'],
        ['Kilometre (bilimsel gösterim)', bilimsel],
        ['Astronomik birim', genel(km / AU, 4) + ' AB'],
        ['Parsek', genel(km / PC, 6) + ' pc'],
      ],
      note: '1 ışık yılı = 9.460.730.472.580,8 km (ışık hızı 299.792,458 km/sn, yıl 365,25 gün). 1 AB = 149.597.870,7 km. Çok büyük sonuçlar yedi anlamlı basamağa yuvarlanarak üslü biçimde gösterilir.',
    };
  }
