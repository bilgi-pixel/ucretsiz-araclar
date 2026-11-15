// Yakıt Tüketimi Çevirici (L/100 km – MPG) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Tüketim değeri');
    const MIL = 1.609344, GAL_ABD = 3.785411784, GAL_ING = 4.54609;
    const kAbd = 100 * GAL_ABD / MIL;
    const kIng = 100 * GAL_ING / MIL;
    let l100;
    if (v.birim === 'kml') l100 = 100 / x;
    else if (v.birim === 'mpgus') l100 = kAbd / x;
    else if (v.birim === 'mpguk') l100 = kIng / x;
    else l100 = x;
    const satirlar = {
      l100: ['L/100 km', h.fmt(l100, 2) + ' L/100 km'],
      mpgus: ['MPG (ABD galonu)', h.fmt(kAbd / l100, 2) + ' mpg'],
      mpguk: ['MPG (İngiliz galonu)', h.fmt(kIng / l100, 2) + ' mpg'],
      kml: ['km/L', h.fmt(100 / l100, 2) + ' km/L'],
    };
    const sira = v.birim === 'l100' || !satirlar[v.birim] ? ['mpgus', 'mpguk', 'kml', 'l100'] : ['l100', 'kml', 'mpgus', 'mpguk'];
    const rows = sira.map((k) => satirlar[k]);
    rows.push(['1 litreyle gidilen yol', h.fmt(100 / l100, 2) + ' km']);
    return { rows, note: '1 mil = 1,609344 km, 1 ABD galonu = 3,785411784 L, 1 İngiliz galonu = 4,54609 L alınır. L/100 km küçüldükçe, MPG ve km/L büyüdükçe araç daha tasarrufludur.' };
  }
