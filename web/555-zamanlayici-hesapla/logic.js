// 555 Zamanlayıcı Devre Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sure = (s) => {
      if (s >= 1 - 1e-9) return h.sig(s, 4) + ' s';
      if (s >= 1e-3 - 1e-12) return h.sig(s * 1e3, 4) + ' ms';
      return h.sig(s * 1e6, 4) + ' µs';
    };
    const frek = (f) => {
      if (f >= 1e6 - 1e-3) return h.sig(f / 1e6, 4) + ' MHz';
      if (f >= 1e3 - 1e-6) return h.sig(f / 1e3, 4) + ' kHz';
      return h.sig(f, 4) + ' Hz';
    };
    const r1 = h.pos(v.r1, 'R1 direnci') * 1e3;
    const carpan = v.cb === 'pF' ? 1e-12 : v.cb === 'nF' ? 1e-9 : 1e-6;
    const c = h.pos(v.c, 'C kondansatörü') * carpan;
    if (v.mod === 'mono') {
      const t = 1.1 * r1 * c;
      return {
        rows: [
          ['Darbe süresi', sure(t)],
          ['Zaman sabiti (R1 × C)', sure(r1 * c)],
        ],
        note: 'T = 1,1 × R1 × C. Tetikleme darbesi bu süreden kısa olmalıdır; gerçek süre eleman toleranslarına göre değişir.',
      };
    }
    const r2 = h.pos(v.r2, 'R2 direnci') * 1e3;
    const ln2 = Math.LN2;
    const th = ln2 * (r1 + r2) * c;
    const tl = ln2 * r2 * c;
    const T = th + tl;
    return {
      rows: [
        ['Frekans', frek(1 / T)],
        ['Periyot', sure(T)],
        ['Yüksek süre', sure(th)],
        ['Düşük süre', sure(tl)],
        ['Görev döngüsü', h.fmt((th / T) * 100, 2) + ' %'],
      ],
      note: 'f = 1,44 ÷ ((R1 + 2 × R2) × C). Standart bağlantıda görev döngüsü her zaman %50\'nin üzerindedir.',
    };
  }
