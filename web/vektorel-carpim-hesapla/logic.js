// Vektörel (Çapraz) Çarpım Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const oku = (s, ad) => {
      const x = h.nums(String(s ?? '').replace(/[()\[\]<>]/g, ' '), ad);
      if (x.length < 2 || x.length > 3) h.err(`"${ad}" üç bileşenli olmalı (örn. 1 2 3). Vektörel çarpım üç boyutlu uzayda tanımlıdır; bileşenleri boşlukla ayırın.`);
      if (x.length === 2) x.push(0);
      return x;
    };
    const A = oku(v.a, 'A vektörü'), B = oku(v.b, 'B vektörü');
    const C = [A[1] * B[2] - A[2] * B[1], A[2] * B[0] - A[0] * B[2], A[0] * B[1] - A[1] * B[0]];
    const boy = (x) => Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
    const yaz = (x) => '(' + x.map((k) => h.fmt(k, 4)).join('; ') + ')';
    const n = boy(C), na = boy(A), nb = boy(B);
    const ic = A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
    const sifirVar = na < 1e-12 || nb < 1e-12;
    const paralel = !sifirVar && n <= 1e-9 * na * nb;
    let durum;
    if (sifirVar) durum = 'Vektörlerden biri sıfır vektör; çarpım sıfır vektördür';
    else if (paralel) durum = 'Vektörler paralel; çarpım sıfır vektördür';
    else if (Math.abs(ic) <= 1e-9 * na * nb) durum = 'Vektörler dik; |A × B| = |A| · |B|';
    else durum = 'Sonuç vektörü A ve B\'nin ikisine de diktir';
    return {
      rows: [
        ['Vektörel çarpım (A × B)', yaz(paralel || sifirVar ? [0, 0, 0] : C)],
        ['Büyüklük |A × B|', h.fmt(paralel ? 0 : n, 4)],
        ['Paralelkenar alanı', h.fmt(paralel ? 0 : n, 4)],
        ['Üçgen alanı', h.fmt(paralel ? 0 : n / 2, 4)],
        ['Birim normal vektör', paralel || sifirVar ? 'tanımsız' : yaz(C.map((k) => k / n))],
        ['Aradaki açı', sifirVar ? 'tanımsız' : h.fmt((Math.atan2(paralel ? 0 : n, ic) * 180) / Math.PI, 4) + '°'],
        ['Durum', durum],
      ],
      note: 'Sıra önemlidir: B × A, A × B\'nin ters yönlüsüdür. Alanlar, bileşenlerin biriminin karesi cinsindendir.',
    };
  }
