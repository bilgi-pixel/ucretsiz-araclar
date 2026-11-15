// PCB Yol Genişliği Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const i = h.pos(v.akim, 'Akım');
    if (i > 35) h.err('Bu bağıntı yaklaşık 35 A\'e kadar geçerlidir; daha yüksek akımlar için bara ya da kalın bakır çözümleri gerekir.');
    const oz = v.bakir === '0.5' ? 0.5 : v.bakir === '2' ? 2 : v.bakir === '3' ? 3 : 1;
    const dt = h.opt(v.artis, 10, 'Sıcaklık artışı');
    if (dt < 1 || dt > 100) h.err('Sıcaklık artışı 1 ile 100 °C arasında olmalı; genellikle 10 ya da 20 °C seçilir.');
    const k = v.katman === 'ic' ? 0.024 : 0.048;
    const alan = Math.pow(i / (k * Math.pow(dt, 0.44)), 1 / 0.725); // mil²
    const kalinMil = 1.378 * oz;
    const mil = alan / kalinMil;
    const mm = mil * 0.0254;
    const rows = [
      ['Gerekli en düşük yol genişliği', h.fmt(mm, 3) + ' mm'],
      ['Yol genişliği (mil)', h.fmt(mil, 2) + ' mil'],
      ['Gerekli bakır kesit alanı', h.fmt(alan, 2) + ' mil²'],
      ['Bakır kalınlığı', h.fmt(kalinMil * 25.4, 1) + ' µm'],
    ];
    if (String(v.uzunluk ?? '').trim() !== '') {
      const l = h.pos(v.uzunluk, 'Yol uzunluğu');
      const r = 1.724e-8 * (l / 1000) / (mm * 1e-3 * kalinMil * 25.4e-6);
      rows.push(['Yol direnci (20 °C)', h.fmt(r * 1000, 2) + ' mΩ']);
      rows.push(['Gerilim düşümü', h.fmt(r * i * 1000, 2) + ' mV']);
      rows.push(['Yolda harcanan güç', h.fmt(r * i * i * 1000, 2) + ' mW']);
    }
    return {
      rows,
      note: 'IPC-2221 bağıntısı: I = k × ΔT^0,44 × A^0,725 (dış katman k = 0,048; iç katman k = 0,024; A mil²). Sonuç alt sınırdır; yer varsa yolu daha geniş çizin ve üreticinizin en düşük yol genişliği kuralına uyun.',
    };
  }
