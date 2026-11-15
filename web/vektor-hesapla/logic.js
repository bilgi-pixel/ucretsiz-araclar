// Vektör Toplama ve Büyüklük Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const oku = (s, ad) => {
      const t = String(s ?? '').replace(/[()\[\]<>]/g, ' ');
      const x = h.nums(t, ad);
      if (x.length < 2) h.err(`"${ad}" için en az iki bileşen yazın ve bileşenleri boşlukla ayırın (örn. 3 4).`);
      if (x.length > 10) h.err(`"${ad}" en fazla 10 bileşenli olabilir.`);
      return x;
    };
    const boy = (x) => Math.sqrt(x.reduce((t, k) => t + k * k, 0));
    const yaz = (x) => '(' + x.map((k) => h.fmt(k, 4)).join('; ') + ')';
    const A = oku(v.a, 'A vektörü');
    const bVar = String(v.b ?? '').trim() !== '';
    const B = bVar ? oku(v.b, 'B vektörü') : null;
    if (B && B.length !== A.length) h.err(`Vektörlerin boyutları aynı olmalı: A ${A.length}, B ${B.length} bileşenli.`);
    const R = B ? A.map((k, i) => (v.islem === 'cikar' ? k - B[i] : k + B[i])) : A.slice();
    const n = boy(R);
    const rows = [
      ['Sonuç vektörü', yaz(R)],
      ['Sonucun büyüklüğü', h.fmt(n, 4)],
      ['Birim vektör', n < 1e-12 ? 'tanımsız (sıfır vektör)' : yaz(R.map((k) => k / n))],
    ];
    if (R.length === 2) rows.push(['Yön açısı (x ekseniyle)', n < 1e-12 ? 'tanımsız' : h.fmt((Math.atan2(R[1], R[0]) * 180) / Math.PI, 4) + '°']);
    rows.push(['|A|', h.fmt(boy(A), 4)]);
    if (B) rows.push(['|B|', h.fmt(boy(B), 4)]);
    return {
      rows,
      note: B ? 'Bileşkenin büyüklüğü, vektörler aynı yönde değilse |A| + |B| toplamından küçüktür.' : 'B vektörü boş bırakıldığı için yalnızca A vektörünün özellikleri hesaplandı.',
    };
  }
