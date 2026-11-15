// Boru Ağırlığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const D = h.pos(v.cap, 'Dış çap');
    const t = h.pos(v.et, 'Et kalınlığı');
    const L = h.pos(v.boy, 'Boru boyu');
    const n = h.posint(v.adet, 'Adet');
    if (t * 2 >= D) h.err('Et kalınlığı dış çapın yarısından küçük olmalı; aksi halde boru içi boşluk kalmaz. Değerleri milimetre olarak yazdığınızı kontrol edin.');
    const ro = String(v.ozel ?? '').trim() === '' ? Number(v.malzeme) : h.pos(v.ozel, 'Özel yoğunluk');
    const alan = Math.PI * (D - t) * t; // mm²
    const kgm = alan * ro / 1e6;
    const toplamBoy = L * n;
    return {
      rows: [
        ['Metre ağırlığı', h.fmt(kgm, 3) + ' kg/m'],
        ['Toplam ağırlık', h.fmt(kgm * toplamBoy, 2) + ' kg'],
        ['Bir borunun ağırlığı', h.fmt(kgm * L, 2) + ' kg'],
        ['Toplam uzunluk', h.fmt(toplamBoy, 2) + ' m'],
        ['İç çap', h.fmt(D - 2 * t, 2) + ' mm'],
        ['Kesit alanı', h.fmt(alan, 1) + ' mm²'],
      ],
      note: 'Kuramsal ağırlıktır; üretim toleransı, kaynak dikişi, galvaniz ya da boya kaplaması gerçek tartıyı birkaç yüzde değiştirebilir.',
    };
  }
