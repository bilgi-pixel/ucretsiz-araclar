// Astronomik Birim Kilometre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const AB_KM = 149597870.7;          // tam tanım (IAU 2012)
    const C_KM_S = 299792.458;          // ışık hızı, km/s (tam)
    const IY_KM = 9460730472580.8;      // ışık yılı, km (Jülyen yılıyla tam)
    const x = h.nonneg(v.deger, 'Uzaklık');
    const km = v.yon === 'km' ? x : x * AB_KM;
    const ab = km / AB_KM;
    const sn = km / C_KM_S;
    let sure;
    if (sn < 60) sure = h.fmt(sn, 2) + ' sn';
    else if (sn < 3600) {
      const dk = Math.floor(sn / 60 + 1e-9);
      sure = `${dk} dk ${h.fmt(Math.max(0, sn - dk * 60), 1)} sn`;
    } else if (sn < 86400) {
      const toplamDk = Math.round(sn / 60);
      sure = `${Math.floor(toplamDk / 60)} sa ${toplamDk % 60} dk`;
    } else sure = h.fmt(sn / 86400, 2) + ' gün';
    const kmSatir = ['Kilometre', h.fmt(km, 3) + ' km'];
    const abSatir = ['Astronomik birim', h.sig(ab, 6) + ' AB'];
    return {
      rows: [
        v.yon === 'km' ? abSatir : kmSatir,
        v.yon === 'km' ? kmSatir : abSatir,
        ['Milyon kilometre', h.fmt(km / 1e6, 3) + ' milyon km'],
        ['Işığın yol süresi', sure],
        ['Işık yılı', h.sig(km / IY_KM, 6) + ' ışık yılı'],
      ],
      note: '1 AB = 149.597.870,7 km (tam tanım). Işık süresi, ışığın boşluktaki hızı 299.792,458 km/s alınarak hesaplanır.',
    };
  }
