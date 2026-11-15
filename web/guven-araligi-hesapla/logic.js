// Güven Aralığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const m = h.num(v.ortalama, 'Örneklem ortalaması');
    const s = h.nonneg(v.ss, 'Standart sapma');
    const n = h.posint(v.n, 'Örneklem büyüklüğü (n)');
    const zTablo = { '80': 1.2815515655, '90': 1.6448536270, '95': 1.9599639845, '98': 2.3263478740, '99': 2.5758293035, '99.9': 3.2905267315 };
    const duzey = String(v.guven);
    if (!(duzey in zTablo)) h.err('Listeden bir güven düzeyi seçin.');
    const tMi = v.dagilim !== 'z';
    if (tMi && n < 2) h.err('t dağılımı için örneklem büyüklüğü en az 2 olmalı.');
    const alfa = 1 - Number(duzey) / 100;
    // Student t birikimli dağılımı: düzenlenmiş tamamlanmamış beta fonksiyonu ile.
    const lgam = (x) => {
      const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
      let y = x, tmp = x + 5.5;
      tmp -= (x + 0.5) * Math.log(tmp);
      let ser = 1.000000000190015;
      for (let j = 0; j < 6; j++) ser += c[j] / ++y;
      return -tmp + Math.log(2.5066282746310005 * ser / x);
    };
    const betacf = (a, b, x) => {
      const K = 1e-300;
      let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap;
      if (Math.abs(d) < K) d = K;
      d = 1 / d;
      let hh = d;
      for (let i = 1; i <= 500; i++) {
        const m2 = 2 * i;
        let aa = i * (b - i) * x / ((qam + m2) * (a + m2));
        d = 1 + aa * d; if (Math.abs(d) < K) d = K;
        c = 1 + aa / c; if (Math.abs(c) < K) c = K;
        d = 1 / d; hh *= d * c;
        aa = -(a + i) * (qab + i) * x / ((a + m2) * (qap + m2));
        d = 1 + aa * d; if (Math.abs(d) < K) d = K;
        c = 1 + aa / c; if (Math.abs(c) < K) c = K;
        d = 1 / d;
        const del = d * c; hh *= del;
        if (Math.abs(del - 1) < 1e-15) break;
      }
      return hh;
    };
    const ibeta = (a, b, x) => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      const bt = Math.exp(lgam(a + b) - lgam(a) - lgam(b) + a * Math.log(x) + b * Math.log(1 - x));
      return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
    };
    // İki kuyruk olasılığı P(|T| > t)
    const ikiKuyruk = (t, sd) => ibeta(sd / 2, 0.5, sd / (sd + t * t));
    let kritik;
    if (tMi) {
      const sd = n - 1;
      let lo = 0, hi = 1;
      while (ikiKuyruk(hi, sd) > alfa && hi < 1e7) hi *= 2;
      for (let i = 0; i < 200; i++) {
        const mid = (lo + hi) / 2;
        if (ikiKuyruk(mid, sd) > alfa) lo = mid; else hi = mid;
      }
      kritik = (lo + hi) / 2;
    } else kritik = zTablo[duzey];
    const se = s / Math.sqrt(n);
    const me = kritik * se;
    const alt = m - me, ust = m + me;
    const yuzde = duzey.replace('.', ',');
    return {
      rows: [
        [`%${yuzde} güven aralığı`, `${h.fmt(alt, 4)} – ${h.fmt(ust, 4)}`],
        ['Alt sınır', h.fmt(alt, 4)],
        ['Üst sınır', h.fmt(ust, 4)],
        ['Hata payı (±)', h.fmt(me, 4)],
        ['Standart hata', h.fmt(se, 4)],
        ['Kritik değer', tMi ? `t = ${h.fmt(kritik, 4)} (serbestlik derecesi ${h.fmt(n - 1, 0)})` : `z = ${h.fmt(kritik, 4)}`],
      ],
      note: 'Aralık, verinin rastgele bir örneklemden geldiğini ve örneklem ortalamasının yaklaşık normal dağıldığını varsayar.',
    };
  }
