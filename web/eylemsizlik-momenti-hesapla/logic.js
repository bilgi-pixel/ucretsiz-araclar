// Eylemsizlik Momenti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const m = h.pos(v.kutle, 'Kütle');
    const a = h.pos(v.boyut, 'Boyut');
    let I;
    let formul;
    switch (v.sekil) {
      case 'halka': I = m * a * a; formul = 'I = m·r²'; break;
      case 'nokta': I = m * a * a; formul = 'I = m·r²'; break;
      case 'bos': {
        const ic = h.pos(v.ikinci, 'İç yarıçap');
        if (ic >= a) h.err('İç yarıçap dış yarıçaptan küçük olmalı. Dış yarıçapı ilk boyut kutusuna yazın.');
        I = 0.5 * m * (a * a + ic * ic); formul = 'I = ½·m·(R² + r²)'; break;
      }
      case 'kure': I = 0.4 * m * a * a; formul = 'I = (2/5)·m·r²'; break;
      case 'kabuk': I = (2 / 3) * m * a * a; formul = 'I = (2/3)·m·r²'; break;
      case 'cubukorta': I = m * a * a / 12; formul = 'I = (1/12)·m·L²'; break;
      case 'cubukuc': I = m * a * a / 3; formul = 'I = (1/3)·m·L²'; break;
      case 'levha': {
        const b = h.pos(v.ikinci, 'Levha kenarı b');
        I = m * (a * a + b * b) / 12; formul = 'I = (1/12)·m·(a² + b²)'; break;
      }
      default: I = 0.5 * m * a * a; formul = 'I = ½·m·r²';
    }
    const rows = [
      ['Eylemsizlik momenti', h.sig(I) + ' kg·m²'],
      ['Kullanılan formül', formul],
      ['Jirasyon yarıçapı', h.sig(Math.sqrt(I / m)) + ' m'],
      ['g·cm² cinsinden', h.sig(I * 1e7) + ' g·cm²'],
    ];
    if (String(v.omega ?? '').trim() !== '') {
      const w = h.nonneg(v.omega, 'Açısal hız');
      rows.push(['Dönme kinetik enerjisi', h.sig(0.5 * I * w * w) + ' J']);
      rows.push(['Açısal momentum', h.sig(I * w) + ' kg·m²/s']);
    }
    return {
      rows,
      note: 'Cismin kütlesinin düzgün dağıldığı (homojen olduğu) ve eksenin seçenekte belirtilen konumda bulunduğu varsayılır.',
    };
  }
