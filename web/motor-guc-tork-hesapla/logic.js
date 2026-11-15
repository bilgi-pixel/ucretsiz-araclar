// Motor Güç Tork Devir Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const K = 60000 / (2 * Math.PI); // 9549,2966
    let P, T, n;
    if (v.hedef === 'guc') {
      T = h.pos(v.tork, 'Tork');
      n = h.pos(v.devir, 'Devir');
      P = T * n / K;
    } else if (v.hedef === 'devir') {
      P = h.pos(v.guc, 'Güç');
      T = h.pos(v.tork, 'Tork');
      n = P * K / T;
    } else {
      P = h.pos(v.guc, 'Güç');
      n = h.pos(v.devir, 'Devir');
      T = P * K / n;
    }
    const satirlar = {
      tork: ['Tork', h.fmt(T, 2) + ' Nm'],
      guc: ['Güç', h.fmt(P, 3) + ' kW'],
      devir: ['Devir', h.fmt(n, 1) + ' d/dk'],
    };
    const ilk = v.hedef === 'guc' ? 'guc' : v.hedef === 'devir' ? 'devir' : 'tork';
    const sira = [ilk, ...['tork', 'guc', 'devir'].filter((k) => k !== ilk)];
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Güç (beygir gücü)', h.fmt(P / 0.73549875, 2) + ' BG'],
        ['Açısal hız', h.fmt(2 * Math.PI * n / 60, 2) + ' rad/s'],
        ['Tork (kgf·m)', h.fmt(T / 9.80665, 3) + ' kgf·m'],
      ],
      note: 'P (kW) = T (Nm) × n (d/dk) ÷ 9549,3. Hesap mil çıkışındaki mekanik güç içindir; 1 BG = 0,7355 kW (metrik beygir gücü).',
    };
  }
