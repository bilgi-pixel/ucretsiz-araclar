// Şimşek Uzaklığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = h.pos(v.sure, 'Süre');
    const T = h.opt(v.sicaklik, 20, 'Hava sıcaklığı');
    if (t > 120) h.err('Süre en fazla 120 saniye olabilir; gök gürültüsü bu kadar uzaktan duyulmaz. Saniye cinsinden yazdığınızdan emin olun.');
    if (T < -50 || T > 55) h.err('Hava sıcaklığı −50 °C ile 55 °C arasında olmalı.');
    const ses = 331.3 + 0.606 * T;
    const m = ses * t;
    const durum = t < 30
      ? 'Fırtına 10 km\'den yakın: tehlike bölgesindesiniz, hemen kapalı bir yere girin'
      : 'Fırtına yaklaşık 10 km\'den uzakta; yaklaşıp yaklaşmadığını izlemeyi sürdürün';
    return {
      rows: [
        ['Uzaklık', h.fmt(m / 1000, 2) + ' km'],
        ['Uzaklık (metre)', h.fmt(m, 0) + ' m'],
        ['Kullanılan ses hızı', h.fmt(ses, 2) + ' m/sn'],
        ['Değerlendirme', durum],
      ],
      note: 'Işığın size ulaşma süresi ihmal edilir. Sonuç, şimşeğin size en yakın noktasına olan yaklaşık uzaklıktır; yıldırım, fırtınanın kilometrelerce uzağına da düşebilir.',
    };
  }
