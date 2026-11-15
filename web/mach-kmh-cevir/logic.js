// Mach km/h Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const t = h.opt(v.sicaklik, 15, 'Hava sıcaklığı');
    if (t <= -273.15) h.err('"Hava sıcaklığı" mutlak sıfırdan (−273,15 °C) büyük olmalı.');
    if (t > 1000) h.err('"Hava sıcaklığı" için 1.000 °C\'yi aşmayan bir değer yazın.');
    // İdeal gaz için ses hızı: a = √(γ·R·T); kuru hava γ = 1,4, R = 287,05287 J/(kg·K)
    const a = Math.sqrt(1.4 * 287.05287 * (t + 273.15)); // m/s
    const aKmh = a * 3.6;
    const mach = v.yon === 'kmh' ? x / aKmh : x;
    const kmh = v.yon === 'kmh' ? x : x * aKmh;
    const f = (n) => h.sig(n, 7);
    const rejim = mach < 0.8 ? 'Ses altı (subsonik)' : mach < 1.2 ? 'Ses hızı civarı (transonik)' : mach < 5 ? 'Ses üstü (süpersonik)' : 'Hipersonik';
    return {
      rows: [
        v.yon === 'kmh' ? ['Mach sayısı', 'Mach ' + f(mach)] : ['Kilometre/saat', f(kmh) + ' km/h'],
        v.yon === 'kmh' ? ['Kilometre/saat', f(kmh) + ' km/h'] : ['Mach sayısı', 'Mach ' + f(mach)],
        ['Bu sıcaklıkta ses hızı', h.fmt(a, 2) + ' m/s (' + h.fmt(aKmh, 1) + ' km/h)'],
        ['Metre/saniye', f(kmh / 3.6) + ' m/s'],
        ['Knot', f(kmh / 1.852) + ' kn'],
        ['Hız rejimi', rejim],
      ],
      note: 'Ses hızı kuru hava için a = √(1,4 × 287,05 × T) bağıntısıyla hesaplanır (T kelvin). Nem ve gerçek atmosfer koşulları küçük sapmalara yol açar.',
    };
  }
