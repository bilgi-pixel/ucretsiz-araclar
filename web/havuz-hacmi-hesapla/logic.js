// Havuz Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const a = h.pos(v.boy, 'Boy ya da çap');
    let alan;
    if (v.sekil === 'yuvarlak') alan = Math.PI * a * a / 4;
    else {
      const b = h.pos(v.en, 'En');
      alan = v.sekil === 'oval' ? Math.PI * a * b / 4 : a * b;
    }
    const d1 = h.pos(v.sig, 'Su derinliği');
    const d2 = bos(v.derin) ? d1 : h.pos(v.derin, 'Derin uç su derinliği');
    if (Math.max(d1, d2) > 20) h.err('Derinlik metre olarak yazılmalı; 20 m üzeri değerler için ölçüyü kontrol edin (120 cm için 1,2 yazın).');
    const ort = (d1 + d2) / 2;
    const m3 = alan * ort;
    const rows = [
      ['Havuz hacmi', h.fmt(m3, 2) + ' m³'],
      ['Litre', h.fmt(m3 * 1000, 0) + ' litre'],
      ['Su yüzey alanı', h.fmt(alan, 2) + ' m²'],
      ['Ortalama derinlik', h.fmt(ort, 2) + ' m'],
      ['Suyun ağırlığı', h.fmt(m3, 2) + ' ton'],
    ];
    if (!bos(v.debi)) {
      const q = h.pos(v.debi, 'Doldurma debisi');
      rows.push(['Dolum süresi', h.fmt(m3 * 1000 / q / 60, 1) + ' saat']);
    }
    return {
      rows,
      note: 'Derinlik olarak havuz duvarının değil suyun derinliğini yazın. Eğimli tabanda iki ucun ortalaması alınır; 1 m³ su yaklaşık 1 ton kabul edilmiştir.',
    };
  }
