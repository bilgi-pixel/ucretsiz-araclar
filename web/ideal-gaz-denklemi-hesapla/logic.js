// İdeal Gaz Denklemi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const R = 8.314462618; // J/(mol·K)
    const pa = { atm: 101325, kPa: 1000, bar: 100000, mmHg: 101325 / 760 };
    const pb = pa[v.pBirim] ? v.pBirim : 'atm';
    const bul = ['P', 'V', 'n', 'T'].includes(v.bul) ? v.bul : 'P';
    let P, V, n, T;
    if (bul !== 'P') P = h.pos(v.basinc, 'Basınç') * pa[pb];
    if (bul !== 'V') V = h.pos(v.hacim, 'Hacim') / 1000;
    if (bul !== 'n') n = h.pos(v.mol, 'Mol sayısı');
    if (bul !== 'T') {
      const t = h.num(v.sicaklik, 'Sıcaklık');
      T = v.tBirim === 'K' ? t : t + 273.15;
      if (!(T > 0)) h.err('Sıcaklık mutlak sıfırdan (0 K, −273,15 °C) büyük olmalı.');
    }
    if (bul === 'P') P = n * R * T / V;
    else if (bul === 'V') V = n * R * T / P;
    else if (bul === 'n') n = P * V / (R * T);
    else T = P * V / (n * R);
    const satir = {
      P: ['Basınç', h.sig(P / pa[pb], 6) + ' ' + pb],
      V: ['Hacim', h.sig(V * 1000, 6) + ' L'],
      n: ['Mol sayısı', h.sig(n, 6) + ' mol'],
      T: ['Sıcaklık', h.sig(T, 6) + ' K'],
    };
    const rows = [satir[bul]];
    for (const k of ['P', 'V', 'n', 'T']) if (k !== bul) rows.push(satir[k]);
    rows.push(['Sıcaklık (°C)', h.fmt(T - 273.15, 2) + ' °C']);
    rows.push(['Basınç (kPa)', h.sig(P / 1000, 6) + ' kPa']);
    rows.push(['Basınç (atm)', h.sig(P / 101325, 6) + ' atm']);
    rows.push(['Hacim (m³)', h.sig(V, 6) + ' m³']);
    rows.push(['Tanecik sayısı', h.sig(n * 6.02214076e23, 4)]);
    return { rows, note: 'R = 8,314462618 J/(mol·K) = 0,082057 L·atm/(mol·K) alınmıştır. Gaz ideal kabul edilir.' };
  }
