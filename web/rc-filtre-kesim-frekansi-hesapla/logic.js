// RC Filtre Kesim Frekansı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carp = (s, izinli, vars) => (izinli.includes(String(s)) ? Number(s) : vars);
    const R = h.pos(v.direnc, 'Direnç') * carp(v.direncBirim, ['1', '1e3', '1e6'], 1e3);
    const C = h.pos(v.kapasite, 'Kapasite') * carp(v.kapBirim, ['1e-6', '1e-9', '1e-12'], 1e-9);
    const tau = R * C;
    const fc = 1 / (2 * Math.PI * tau);
    const hz = (x) => {
      if (x < 1) return h.sig(x * 1e3, 4) + ' mHz';
      if (x < 1e3) return h.sig(x, 4) + ' Hz';
      if (x < 1e6) return h.sig(x / 1e3, 4) + ' kHz';
      if (x < 1e9) return h.sig(x / 1e6, 4) + ' MHz';
      return h.sig(x / 1e9, 4) + ' GHz';
    };
    const sn = (x) => {
      if (x >= 1) return h.sig(x, 4) + ' s';
      if (x >= 1e-3) return h.sig(x * 1e3, 4) + ' ms';
      if (x >= 1e-6) return h.sig(x * 1e6, 4) + ' µs';
      return h.sig(x * 1e9, 4) + ' ns';
    };
    const rows = [
      ['Kesim frekansı (fc)', hz(fc)],
      ['Zaman sabiti (τ = R·C)', sn(tau)],
      ['Açısal kesim frekansı', h.sig(1 / tau, 5) + ' rad/s'],
    ];
    if (String(v.frekans ?? '').trim() !== '') {
      const f = h.pos(v.frekans, 'Test frekansı');
      const o = f / fc;
      const fazA = -Math.atan(o) * 180 / Math.PI;
      rows.push(['Alçak geçiren kazancı', h.fmt(-10 * Math.log10(1 + o * o), 2) + ' dB']);
      rows.push(['Yüksek geçiren kazancı', h.fmt(-10 * Math.log10(1 + 1 / (o * o)), 2) + ' dB']);
      rows.push(['Alçak geçiren faz kayması', h.fmt(fazA, 2) + '°']);
      rows.push(['Yüksek geçiren faz kayması', h.fmt(90 + fazA, 2) + '°']);
    }
    return { rows, note: 'Kesim frekansında çıkış gerilimi girişin yaklaşık %70,7\'sine (−3 dB) düşer. Hesap, kaynağın iç direncinin sıfır ve yükün çok yüksek empedanslı olduğunu varsayar.' };
  }
