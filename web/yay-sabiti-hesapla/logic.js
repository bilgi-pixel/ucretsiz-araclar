// Yay Sabiti (Hooke Yasası) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let F, x, k;
    if (v.bul === 'kuvvet') {
      k = h.pos(v.sabit, 'Yay sabiti'); x = h.nonneg(v.uzama, 'Uzama'); F = k * x;
    } else if (v.bul === 'uzama') {
      F = h.nonneg(v.kuvvet, 'Kuvvet'); k = h.pos(v.sabit, 'Yay sabiti'); x = F / k;
    } else {
      F = h.pos(v.kuvvet, 'Kuvvet'); x = h.pos(v.uzama, 'Uzama'); k = F / x;
    }
    const kS = ['Yay sabiti', h.fmt(k, 4) + ' N/m'];
    const fS = ['Kuvvet', h.fmt(F, 4) + ' N'];
    const xS = ['Uzama', h.fmt(x, 6) + ' m'];
    const ilk = v.bul === 'kuvvet' ? [fS, kS, xS] : v.bul === 'uzama' ? [xS, kS, fS] : [kS, fS, xS];
    const rows = [
      ...ilk,
      ['Uzama (cm)', h.fmt(x * 100, 4) + ' cm'],
      ['Esneklik potansiyel enerjisi', h.fmt(0.5 * k * x * x, 4) + ' J'],
    ];
    if (String(v.kutle ?? '').trim() !== '') {
      const m = h.pos(v.kutle, 'Kütle');
      const T = 2 * Math.PI * Math.sqrt(m / k);
      rows.push(['Salınım periyodu', h.fmt(T, 4) + ' s']);
      rows.push(['Salınım frekansı', h.fmt(1 / T, 4) + ' Hz']);
    }
    return {
      rows,
      note: 'Yayın esneklik sınırı içinde kaldığı ve kütlesinin ihmal edildiği varsayılır. Enerji: E = ½ · k · x².',
    };
  }
