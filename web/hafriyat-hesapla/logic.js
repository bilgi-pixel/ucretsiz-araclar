// Hafriyat (Kazı) Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.boy, 'Taban boyu');
    const b = h.pos(v.en, 'Taban eni');
    const d = h.pos(v.derinlik, 'Kazı derinliği');
    const n = h.nonneg(v.sev, 'Şev oranı');
    const k = h.nonneg(v.kabarma, 'Kabarma payı');
    const kap = h.pos(v.kamyon, 'Kamyon kasa hacmi');
    if (n > 10) h.err('Şev oranı 10\'dan büyük olamaz; yatay/düşey oranını (örn. 0,5 ya da 1) yazın.');
    const ustA = a + 2 * n * d, ustB = b + 2 * n * d;
    const A1 = a * b, A2 = ustA * ustB, Am = (a + n * d) * (b + n * d);
    const V = d / 6 * (A1 + 4 * Am + A2);
    const gevsek = V * (1 + k / 100);
    const sefer = Math.ceil(gevsek / kap - 1e-9);
    return {
      rows: [
        ['Kazı hacmi (yerinde)', h.fmt(V, 2) + ' m³'],
        ['Taşınacak hacim (kabarmış)', h.fmt(gevsek, 2) + ' m³'],
        ['Kamyon seferi', sefer + ' sefer'],
        ['Taban alanı', h.fmt(A1, 2) + ' m²'],
        ['Üst ağız ölçüsü', h.fmt(ustA, 2) + ' × ' + h.fmt(ustB, 2) + ' m'],
        ['Üst ağız alanı', h.fmt(A2, 2) + ' m²'],
      ],
      note: 'Kabarma payı zemin cinsine göre değişir; değer bir kabuldür. Derin kazılarda şev ve iksa kararını mutlaka yetkili mühendis vermelidir.',
    };
  }
