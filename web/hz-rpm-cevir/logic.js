// Hertz RPM Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const hz = v.yon === 'rpm' ? x / 60 : x;
    const rpm = hz * 60;
    const rads = 2 * Math.PI * hz;
    const tur = hz > 0 ? h.fmt(1000 / hz, 4) + ' ms' : '— (dönme yok)';
    const a = ['Devir/dakika (RPM)', h.fmt(rpm, 4) + ' RPM'];
    const b = ['Frekans (Hz)', h.fmt(hz, 4) + ' Hz'];
    return {
      rows: [
        v.yon === 'rpm' ? b : a,
        v.yon === 'rpm' ? a : b,
        ['Açısal hız', h.fmt(rads, 4) + ' rad/s'],
        ['Bir tur süresi', tur],
      ],
      note: '1 Hz = 60 RPM. Hertz burada saniyedeki tam tur sayısı (devir/saniye) olarak yorumlanır.',
    };
  }
