// Yüzdelik Dilim (Persentil) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nums(v.sayilar, 'Veriler').slice().sort((a, b) => a - b);
    const n = x.length;
    if (n > 100000) h.err('En fazla 100.000 veri girebilirsiniz.');
    const p = h.num(v.yuzdelik, 'Yüzdelik (0–100)');
    if (p < 0 || p > 100) h.err('"Yüzdelik" 0 ile 100 arasında olmalı.');
    const f = p / 100;
    // sıra: 1 tabanlı, kesirli olabilir
    const araDeger = (sira) => {
      const alt = Math.floor(sira + 1e-9);
      const kes = sira - alt;
      if (alt >= n) return x[n - 1];
      if (alt < 1) return x[0];
      return kes < 1e-9 ? x[alt - 1] : x[alt - 1] + kes * (x[alt] - x[alt - 1]);
    };
    const dogrusal = araDeger(1 + f * (n - 1));
    const enYakin = x[Math.min(n, Math.max(1, Math.ceil(f * n - 1e-9))) - 1];
    const sExc = f * (n + 1);
    const haric = sExc >= 1 - 1e-9 && sExc <= n + 1e-9 ? h.fmt(araDeger(sExc), 4) : '— (bu veri sayısıyla tanımsız)';
    const rows = [
      ['Yüzdelik değer', h.fmt(dogrusal, 4)],
      ['En yakın sıra yöntemi', h.fmt(enYakin, 4)],
      ['(n + 1) yöntemi', haric],
      ['Veri sayısı', h.fmt(n, 0)],
      ['En küçük – en büyük', `${h.fmt(x[0], 4)} – ${h.fmt(x[n - 1], 4)}`],
    ];
    if (String(v.deger ?? '').trim() !== '') {
      const d = h.num(v.deger, 'Sırası bulunacak değer');
      let kucuk = 0, esit = 0;
      for (const a of x) { if (a < d) kucuk++; else if (a === d) esit++; }
      rows.push(['Değerin yüzdelik sırası', '%' + h.fmt((kucuk + 0.5 * esit) / n * 100, 2)]);
      rows.push(['Değerden küçük veri sayısı', `${h.fmt(kucuk, 0)} (eşit: ${h.fmt(esit, 0)})`]);
    }
    return {
      rows,
      note: `İlk satır ${h.fmt(p, 4)}. yüzdeliği doğrusal ara değer yöntemiyle verir (hesap tablolarındaki YÜZDEBİRLİK işleviyle aynı). Yöntemler küçük veri setlerinde farklı sonuç verebilir.`,
    };
  }
