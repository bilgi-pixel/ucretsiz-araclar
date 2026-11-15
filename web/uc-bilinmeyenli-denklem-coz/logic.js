// Üç Bilinmeyenli Denklem Çözme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const oku = (metin, sira) => {
      const ad = `${sira}. denklem`;
      const sayilar = h.nums(metin, ad);
      if (sayilar.length !== 4) h.err(`${ad} için tam dört sayı yazın: x, y, z katsayıları ve eşitliğin sağ tarafı (örn. 2 1 -1 8). Olmayan terim için 0 girin.`);
      if (sayilar[0] === 0 && sayilar[1] === 0 && sayilar[2] === 0) h.err(`${ad} içinde x, y ve z katsayılarının üçü birden sıfır olamaz.`);
      return sayilar;
    };
    const R = [oku(v.d1, 1), oku(v.d2, 2), oku(v.d3, 3)];
    const det = (m) => {
      const t = [
        m[0][0] * m[1][1] * m[2][2], m[0][1] * m[1][2] * m[2][0], m[0][2] * m[1][0] * m[2][1],
        -m[0][2] * m[1][1] * m[2][0], -m[0][0] * m[1][2] * m[2][1], -m[0][1] * m[1][0] * m[2][2],
      ];
      const toplam = t.reduce((p, q) => p + q, 0);
      const olcek = t.reduce((p, q) => p + Math.abs(q), 0);
      return Math.abs(toplam) <= 1e-12 * olcek ? 0 : toplam;
    };
    const sutunDegistir = (k) => R.map((r) => [0, 1, 2].map((j) => (j === k ? r[3] : r[j])));
    const A = R.map((r) => r.slice(0, 3));
    const d = det(A);
    const dx = det(sutunDegistir(0)), dy = det(sutunDegistir(1)), dz = det(sutunDegistir(2));
    const s = (x) => h.fmt(x, 6);
    if (d === 0) {
      const rank = (M0) => {
        const M = M0.map((r) => r.slice());
        const enBuyuk = Math.max(...M.flat().map(Math.abs));
        const eps = 1e-9 * (enBuyuk || 1);
        let r = 0;
        for (let c = 0; c < M[0].length && r < M.length; c++) {
          let p = r;
          for (let i = r + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
          if (Math.abs(M[p][c]) <= eps) continue;
          [M[r], M[p]] = [M[p], M[r]];
          for (let i = r + 1; i < M.length; i++) {
            const f = M[i][c] / M[r][c];
            for (let j = c; j < M[0].length; j++) M[i][j] -= f * M[r][j];
          }
          r++;
        }
        return r;
      };
      const sonsuz = rank(A) === rank(R);
      return {
        rows: [
          ['Çözüm', sonsuz ? 'Sonsuz çözüm var (denklemler birbirine bağımlı)' : 'Çözüm yok (denklemler çelişiyor)'],
          ['Determinant (D)', '0'],
          ['Dx', s(dx)],
          ['Dy', s(dy)],
          ['Dz', s(dz)],
        ],
        note: sonsuz
          ? 'Denklemlerden en az biri diğerlerinden türetilebiliyor; üç bilinmeyeni tek tek belirlemek için bağımsız bir denklem daha gerekir.'
          : 'Sol taraflar birbirine bağımlı, sağ taraflar ise bu bağımlılığa uymuyor; üç koşul aynı anda sağlanamaz.',
      };
    }
    const x = dx / d, y = dy / d, z = dz / d;
    return {
      rows: [
        ['Çözüm', `x = ${s(x)}, y = ${s(y)}, z = ${s(z)}`],
        ['x', s(x)],
        ['y', s(y)],
        ['z', s(z)],
        ['Determinant (D)', s(d)],
        ['Dx', s(dx)],
        ['Dy', s(dy)],
        ['Dz', s(dz)],
      ],
      note: 'Cramer kuralı: x = Dx ÷ D, y = Dy ÷ D, z = Dz ÷ D. Sonuçlar en fazla altı ondalık basamağa yuvarlanır.',
    };
  }
