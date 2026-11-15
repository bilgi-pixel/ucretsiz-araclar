// Saniye Dakika Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Süre');
    const sn = v.yon === 'dk' ? x * 60 : x;
    const dk = sn / 60;
    const s = Math.round(sn * 1000) / 1000;
    const tamDk = Math.floor(s / 60);
    const kalan = s - tamDk * 60;
    const t = Math.round(sn);
    const p = (n) => String(n).padStart(2, '0');
    const sa = Math.floor(t / 3600);
    const bicim = `${p(sa)}:${p(Math.floor((t - sa * 3600) / 60))}:${p(t % 60)}`;
    const rDk = ['Dakika', h.fmt(dk, 6) + ' dakika'];
    const rSn = ['Saniye', h.fmt(sn, 4) + ' saniye'];
    return {
      rows: [
        ...(v.yon === 'dk' ? [rSn, rDk] : [rDk, rSn]),
        ['Dakika ve saniye', `${h.fmt(tamDk, 0)} dk ${h.fmt(kalan, 3)} sn`],
        ['Saat', h.fmt(sn / 3600, 6) + ' saat'],
        ['Süre biçimi (SS:DD:SN)', bicim],
      ],
      note: '1 dakika = 60 saniye. Süre biçimi satırı en yakın tam saniyeye yuvarlanır.',
    };
  }
