// Binom Dağılımı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.n, 'Deneme sayısı (n)');
    if (n > 100000) h.err('"Deneme sayısı (n)" en fazla 100.000 olabilir.');
    const k = h.int(v.k, 'Başarı sayısı (k)');
    if (k < 0 || k > n) h.err(`"Başarı sayısı (k)" 0 ile ${n} (deneme sayısı) arasında olmalı.`);
    const ad = 'Tek denemede başarı olasılığı (p)';
    let ps = String(v.p ?? '').trim();
    if (ps === '') h.err(`"${ad}" alanını doldurun.`);
    let p;
    if (ps.includes('/')) {
      const par = ps.split('/');
      if (par.length !== 2) h.err('Kesri "1/6" biçiminde yazın.');
      const pay = h.num(par[0], ad), payda = h.num(par[1], ad);
      if (payda === 0) h.err('Kesrin paydası sıfır olamaz.');
      p = pay / payda;
    } else if (ps.includes('%')) {
      p = h.num(ps.replace(/%/g, ''), ad) / 100;
    } else {
      p = h.num(ps, ad);
    }
    if (!(p >= 0 && p <= 1)) h.err('Başarı olasılığı 0 ile 1 arasında olmalı. Yüzde olarak yazacaksanız % işareti ekleyin (örn. %30).');
    const q = 1 - p;
    // pmf(i) = C(n,i) p^i q^(n-i); taşmayı önlemek için logaritmayla hesaplanır.
    const pmf = new Array(n + 1).fill(0);
    if (p === 0) pmf[0] = 1;
    else if (p === 1) pmf[n] = 1;
    else {
      const lp = Math.log(p), lq = Math.log(q);
      let lc = 0;
      for (let i = 0; i <= n; i++) {
        if (i > 0) lc += Math.log(n - i + 1) - Math.log(i);
        pmf[i] = Math.exp(lc + i * lp + (n - i) * lq);
      }
    }
    let alt = 0, ust = 0;
    for (let i = 0; i < k; i++) alt += pmf[i];
    for (let i = n; i > k; i--) ust += pmf[i];
    const esit = pmf[k];
    const kirp = (x) => Math.min(1, Math.max(0, x));
    const yaz = (x) => {
      x = kirp(x);
      if (x > 0 && x < 1e-6) return `${h.sig(x, 4)} (%${h.sig(x * 100, 4)})`;
      return `${h.fmt(x, 6)} (%${h.fmt(x * 100, 4)})`;
    };
    return {
      rows: [
        [`P(X = ${k})`, yaz(esit)],
        [`P(X ≤ ${k})`, yaz(alt + esit)],
        [`P(X < ${k})`, yaz(alt)],
        [`P(X ≥ ${k})`, yaz(ust + esit)],
        [`P(X > ${k})`, yaz(ust)],
        ['Beklenen değer (n·p)', h.fmt(n * p, 4)],
        ['Varyans (n·p·q)', h.fmt(n * p * q, 4)],
        ['Standart sapma', h.fmt(Math.sqrt(n * p * q), 4)],
      ],
      note: `n = ${h.fmt(n, 0)}, p = ${h.fmt(p, 6)}, q = 1 − p = ${h.fmt(q, 6)}. Denemelerin bağımsız ve başarı olasılığının sabit olduğu varsayılır.`,
    };
  }
