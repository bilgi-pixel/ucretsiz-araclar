// Üç Faz (Trifaze) Güç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const U = h.pos(v.gerilim, 'Hat gerilimi');
    const cos = h.pos(v.cos, 'Güç faktörü');
    if (cos > 1) h.err('"Güç faktörü" 1\'den büyük olamaz; 0 ile 1 arasında bir değer yazın (örn. 0,85).');
    const k3 = Math.sqrt(3);
    let I, P;
    if (v.mod === 'akim') {
      P = h.pos(v.kw, 'Aktif güç') * 1000;
      I = P / (k3 * U * cos);
    } else {
      I = h.pos(v.akim, 'Hat akımı');
      P = k3 * U * I * cos;
    }
    const S = k3 * U * I;
    const Q = S * Math.sqrt(Math.max(0, 1 - cos * cos));
    const pSatir = ['Aktif güç', h.fmt(P / 1000, 3) + ' kW'];
    const iSatir = ['Hat akımı', h.fmt(I, 2) + ' A'];
    return {
      rows: [
        ...(v.mod === 'akim' ? [iSatir, pSatir] : [pSatir, iSatir]),
        ['Görünür güç', h.fmt(S / 1000, 3) + ' kVA'],
        ['Reaktif güç', h.fmt(Q / 1000, 3) + ' kVAr'],
        ['Faz-nötr gerilimi', h.fmt(U / k3, 1) + ' V'],
      ],
      note: 'P = √3 × U × I × cos φ. Dengeli yük ve sinüs biçimli akım varsayılır; U fazlar arası (hat) gerilimidir.',
    };
  }
