// RC Zaman Sabiti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carpanlar = { pF: 1e-12, nF: 1e-9, uF: 1e-6, mF: 1e-3, F: 1 };
    const r = h.pos(v.direnc, 'Direnç') * (Number(v.direncBirim) || 1000);
    const c = h.pos(v.kapasite, 'Kapasite') * (carpanlar[v.kapBirim] || 1e-6);
    const tau = r * c;
    const sure = (t) => {
      if (t < 0.9999999e-6) return h.sig(t * 1e9, 6) + ' ns';
      if (t < 0.9999999e-3) return h.sig(t * 1e6, 6) + ' µs';
      if (t < 0.9999999) return h.sig(t * 1e3, 6) + ' ms';
      return h.sig(t, 6) + ' s';
    };
    const fc = 1 / (2 * Math.PI * tau);
    const frekans = fc >= 999999.5 ? h.sig(fc / 1e6, 6) + ' MHz' : fc >= 999.9995 ? h.sig(fc / 1e3, 6) + ' kHz' : h.sig(fc, 6) + ' Hz';
    const rows = [
      ['Zaman sabiti (τ)', sure(tau)],
      ['Yarı gerilime ulaşma süresi', sure(tau * Math.LN2)],
      ['Tam dolma süresi (5τ)', sure(5 * tau)],
      ['Kesim frekansı', frekans],
    ];
    const u = h.opt(v.gerilim, null, 'Kaynak gerilimi');
    if (u !== null) {
      if (!(u > 0)) h.err('"Kaynak gerilimi" sıfırdan büyük olmalı.');
      rows.push(['1τ sonunda gerilim', h.fmt(u * (1 - Math.exp(-1)), 3) + ' V']);
      rows.push(['5τ sonunda gerilim', h.fmt(u * (1 - Math.exp(-5)), 3) + ' V']);
      rows.push(['İlk şarj akımı', h.sig((u / r) * 1000, 6) + ' mA']);
    }
    return { rows, note: 'Dolma: V(t) = V × (1 − e^(−t/τ)); boşalma: V(t) = V × e^(−t/τ). 1τ sonunda %63,2, 5τ sonunda %99,3 dolmuş olur.' };
  }
