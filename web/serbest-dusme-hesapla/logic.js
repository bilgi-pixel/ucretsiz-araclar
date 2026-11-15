// Serbest Düşme Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ad = v.bilinen === 't' ? 'Düşme süresi' : v.bilinen === 'v' ? 'Yere çarpma hızı' : 'Yükseklik';
    const x = h.pos(v.deger, ad);
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    let t, y, hiz;
    if (v.bilinen === 't') { t = x; y = 0.5 * g * t * t; hiz = g * t; }
    else if (v.bilinen === 'v') { hiz = x; t = hiz / g; y = (hiz * hiz) / (2 * g); }
    else { y = x; t = Math.sqrt((2 * y) / g); hiz = Math.sqrt(2 * g * y); }
    const tS = ['Düşme süresi', h.fmt(t, 4) + ' s'];
    const yS = ['Yükseklik', h.fmt(y, 4) + ' m'];
    const vS = ['Yere çarpma hızı', h.fmt(hiz, 4) + ' m/s'];
    const bas = v.bilinen === 't' ? [yS, vS, tS] : v.bilinen === 'v' ? [yS, tS, vS] : [tS, vS, yS];
    return {
      rows: [
        ...bas,
        ['Yere çarpma hızı (km/sa)', h.fmt(hiz * 3.6, 2) + ' km/sa'],
        ['Ortalama hız', h.fmt(hiz / 2, 4) + ' m/s'],
      ],
      note: `g = ${h.fmt(g, 4)} m/s² alındı. İlk hız sıfır kabul edilir ve hava direnci yok sayılır; gerçek düşmede hız daha düşük, süre daha uzun olur.`,
    };
  }
