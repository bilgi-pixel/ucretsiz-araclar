// Alçıpan Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.uzunluk, 'Duvar uzunluğu');
    const H = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const le = h.pos(v.levhaEn, 'Levha eni');
    const lb = h.pos(v.levhaBoy, 'Levha boyu');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const ar = h.pos(v.aralik, 'Dikme aralığı');
    if (fire > 100) h.err('"Fire payı" en fazla 100 olabilir.');
    const yuz = v.yuz === '1' ? 1 : 2;
    const kat = v.kat === '2' ? 2 : 1;
    const alan = L * H * yuz * kat;
    const fireli = alan * (1 + fire / 100);
    const levhaAlan = le * lb / 10000;
    const levha = Math.ceil(fireli / levhaAlan - 1e-9);
    const dikme = Math.ceil(L / (ar / 100) - 1e-9) + 1;
    return {
      rows: [
        ['Levha adedi', h.fmt(levha, 0) + ' levha'],
        ['Kaplanacak yüzey alanı', h.fmt(alan, 2) + ' m²'],
        ['Fire dahil alan', h.fmt(fireli, 2) + ' m²'],
        ['Bir levhanın alanı', h.fmt(levhaAlan, 2) + ' m²'],
        ['Dikme profili adedi', h.fmt(dikme, 0) + ' adet'],
        ['Dikme profili toplam uzunluğu', h.fmt(dikme * H, 2) + ' m'],
        ['Taban ve tavan profili', h.fmt(2 * L, 2) + ' m'],
      ],
      note: 'Kapı ve pencere boşlukları düşülmemiştir. Boşluk kenarlarına eklenen ek dikmeler ve lento parçaları hesaba dahil değildir.',
    };
  }
