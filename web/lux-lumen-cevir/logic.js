// Lüks Lümen Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const alan = h.pos(v.alan, 'Aydınlatılan alan');
    const lm = v.yon === 'lx' ? x * alan : x;
    const lx = lm / alan;
    const a = ['Aydınlık düzeyi', h.fmt(lx, 2) + ' lx'];
    const b = ['Işık akısı', h.fmt(lm, 2) + ' lm'];
    return {
      rows: [
        v.yon === 'lx' ? b : a,
        v.yon === 'lx' ? a : b,
        ['Alan', h.fmt(alan, 4) + ' m²'],
        ['Foot-candle karşılığı', h.fmt(lx / 10.763910416709722, 2) + ' fc'],
      ],
      note: 'Işığın tamamının yüzeye eşit dağıldığı varsayılır; armatür, duvar ve tavan kayıpları hesaba katılmaz.',
    };
  }
