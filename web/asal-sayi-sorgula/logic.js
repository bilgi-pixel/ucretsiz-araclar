// Asal Sayı Sorgulama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.int(v.n, 'Sayı');
    if (n < 0) h.err('Asallık yalnızca pozitif tam sayılar için tanımlıdır; negatif olmayan bir tam sayı yazın.');
    if (n > 1e12) h.err('Bu araç en fazla 1.000.000.000.000 (bir trilyon) değerine kadar sorgular; daha küçük bir sayı yazın.');
    // m ≥ 2 için en küçük asal bölen (m asalsa kendisi)
    const enKucukBolen = (m) => {
      if (m % 2 === 0) return 2;
      if (m % 3 === 0) return 3;
      for (let i = 5; i * i <= m; i += 6) {
        if (m % i === 0) return i;
        if (m % (i + 2) === 0) return i + 2;
      }
      return m;
    };
    const asalMi = (m) => m >= 2 && enKucukBolen(m) === m;
    const f = (x) => h.fmt(x, 0);
    const rows = [];
    let note;
    if (n < 2) {
      rows.push(['Sonuç', `${n} asal değil (ne asal ne bileşik)`]);
      note = n === 0
        ? '0 sayısı her pozitif tam sayıya bölünür, bu yüzden asal sayılmaz; bileşik sayı tanımına da girmez.'
        : '1 sayısının yalnızca bir pozitif böleni vardır; asal sayıların ise tam iki böleni olmalıdır.';
    } else {
      const ilk = enKucukBolen(n);
      if (ilk === n) {
        rows.push(['Sonuç', `${f(n)} asal sayıdır`]);
        rows.push(['Pozitif bölenleri', `1 ve ${f(n)}`]);
      } else {
        rows.push(['Sonuç', `${f(n)} asal değil (bileşik sayı)`]);
        rows.push(['En küçük asal böleni', f(ilk)]);
        const parcalar = [];
        let kalan = n;
        while (kalan > 1) {
          const p = enKucukBolen(kalan);
          let us = 0;
          while (kalan % p === 0) { kalan /= p; us++; }
          parcalar.push(us > 1 ? `${f(p)}^${us}` : f(p));
        }
        rows.push(['Asal çarpanları', parcalar.join(' × ')]);
      }
      rows.push(['Denenen en büyük bölen sınırı (√n)', f(Math.floor(Math.sqrt(n) + 1e-9))]);
      note = ilk === n
        ? 'Sayı, karekökünü aşmayan hiçbir asal sayıya bölünmediği için asaldır.'
        : `Sayı ${f(ilk)} ile tam bölündüğü için asal değildir: ${f(n)} = ${f(ilk)} × ${f(n / ilk)}.`;
    }
    let onceki = n - 1;
    while (onceki >= 2 && !asalMi(onceki)) onceki--;
    let sonraki = Math.max(n + 1, 2);
    while (!asalMi(sonraki)) sonraki++;
    rows.push(['Önceki asal sayı', onceki >= 2 ? f(onceki) : 'Yok']);
    rows.push(['Sonraki asal sayı', f(sonraki)]);
    return { rows, note };
  }
