// Mutlak Değer Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.num(v.a, 'Sayı (a)');
    const f = (x) => h.fmt(x, 10);
    const isaret = (x) => (x > 0 ? 'Pozitif' : x < 0 ? 'Negatif' : 'Sıfır (işaretsiz)');
    const rows = [
      ['Mutlak değer |a|', f(Math.abs(a))],
      ['a sayısının işareti', isaret(a)],
      ['Ters işaretlisi (−a)', f(-a)],
    ];
    let note = a < 0
      ? 'a negatif olduğu için |a| = −a kuralı uygulandı: işaret değişti.'
      : 'a negatif olmadığı için |a| = a; sayı olduğu gibi kaldı.';
    if (String(v.b ?? '').trim() !== '') {
      const b = h.num(v.b, 'İkinci sayı (b)');
      const top = Math.abs(a + b);
      const ayri = Math.abs(a) + Math.abs(b);
      rows.push(
        ['Mutlak değer |b|', f(Math.abs(b))],
        ['Aradaki uzaklık |a − b|', f(Math.abs(a - b))],
        ['Toplamın mutlak değeri |a + b|', f(top)],
        ['Mutlak değerlerin toplamı |a| + |b|', f(ayri)],
        ['Çarpımın mutlak değeri |a × b|', f(Math.abs(a * b))],
      );
      note = Math.abs(top - ayri) < 1e-12
        ? 'Sayılar aynı işaretli (ya da biri sıfır) olduğu için |a + b| = |a| + |b| eşitliği sağlandı.'
        : 'Sayılar zıt işaretli olduğu için |a + b| < |a| + |b| çıktı (üçgen eşitsizliği).';
    }
    return { rows, note };
  }
