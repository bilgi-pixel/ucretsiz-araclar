// Radyan Devir Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Açı değeri');
    const IKI_PI = 2 * Math.PI;
    const devir = v.yon === 'devir' ? x : x / IKI_PI;
    const rad = v.yon === 'devir' ? x * IKI_PI : x;
    const satirRad = ['Radyan', h.fmt(rad, 6) + ' rad'];
    const satirDevir = ['Devir', h.fmt(devir, 6) + ' devir'];
    return {
      rows: [
        v.yon === 'devir' ? satirRad : satirDevir,
        v.yon === 'devir' ? satirDevir : satirRad,
        ['π cinsinden', h.fmt(devir * 2, 6) + 'π rad'],
        ['Derece', h.fmt(devir * 360, 4) + '°'],
        ['Grad', h.fmt(devir * 400, 4) + ' grad'],
      ],
      note: '1 devir = 2π rad ≈ 6,283185 rad = 360° = 400 grad. Sonuçlar en fazla altı ondalık basamakla gösterilir.',
    };
  }
