// Faktöriyel Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.int(v.n, 'Sayı (n)');
    if (n < 0) h.err('Negatif sayıların faktöriyeli tanımlı değildir; 0 ya da pozitif bir tam sayı yazın.');
    if (n > 5000) h.err('Bu araç en fazla 5000! değerini hesaplar; daha küçük bir sayı yazın.');
    let f = 1n;
    for (let i = 2n; i <= BigInt(n); i++) f *= i;
    const s = f.toString();
    const basamak = s.length;
    let sifir = 0;
    for (let p = 5; p <= n; p *= 5) sifir += Math.floor(n / p);
    const grupla = (t) => t.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Bilimsel gösterim: ilk 7 basamaktan 6 anlamlı basamağa yuvarla
    let bilimsel;
    if (basamak <= 6) bilimsel = grupla(s);
    else {
      let m = Math.round(Number(s.slice(0, 8)) / 100);
      let e = basamak - 1;
      if (m >= 1000000) { m = Math.round(m / 10); e += 1; }
      const ms = String(m);
      const kesir = ms.slice(1).replace(/0+$/, '');
      bilimsel = `${ms[0]}${kesir ? ',' + kesir : ''} × 10^${e}`;
    }
    const kisa = basamak <= 30;
    const rows = [
      [`${n}! değeri`, kisa ? grupla(s) : '≈ ' + bilimsel],
      ['Basamak sayısı', h.fmt(basamak, 0)],
      ['Sondaki sıfır sayısı', h.fmt(sifir, 0)],
    ];
    if (kisa && basamak > 6) rows.push(['Bilimsel gösterim', '≈ ' + bilimsel]);
    const acilim = n >= 2 && n <= 12 ? Array.from({ length: n }, (_, i) => n - i).join(' × ') : '';
    if (acilim) rows.push(['Açılım', acilim]);
    const out = { rows };
    if (!kisa) {
      out.text = s;
      out.note = 'Sonuç 30 basamaktan uzun olduğu için üstte yaklaşık değer, aşağıdaki kutuda tam değer (ayraçsız) gösterilir.';
    } else if (n < 2) {
      out.note = 'Tanım gereği 0! = 1 ve 1! = 1\'dir.';
    }
    return out;
  }
