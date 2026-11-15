// Çeyreklikler ve IQR Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nums(v.sayilar, 'Veriler').slice().sort((a, b) => a - b);
    const n = x.length;
    if (n < 2) h.err('Çeyreklikleri hesaplamak için en az 2 veri girin.');
    if (n > 100000) h.err('En fazla 100.000 veri girebilirsiniz.');
    const medyan = (a) => { const m = a.length; return m % 2 ? a[(m - 1) / 2] : (a[m / 2 - 1] + a[m / 2]) / 2; };
    const q2 = medyan(x);
    let q1, q3;
    if (v.yontem === 'dogrusal') {
      const konum = (f) => {
        const s = f * (n - 1), a = Math.floor(s + 1e-9), k = s - a;
        return a >= n - 1 ? x[n - 1] : (k < 1e-9 ? x[a] : x[a] + k * (x[a + 1] - x[a]));
      };
      q1 = konum(0.25); q3 = konum(0.75);
    } else {
      const yari = Math.floor(n / 2);
      const dahil = v.yontem === 'dahil' && n % 2 === 1;
      q1 = medyan(x.slice(0, dahil ? yari + 1 : yari));
      q3 = medyan(x.slice(dahil ? yari : n - yari));
    }
    const iqr = q3 - q1;
    const alt = q1 - 1.5 * iqr, ust = q3 + 1.5 * iqr;
    const aykiri = x.filter((a) => a < alt - 1e-9 || a > ust + 1e-9);
    let aykiriMetin = 'Yok';
    if (aykiri.length) {
      aykiriMetin = aykiri.slice(0, 30).map((a) => h.fmt(a, 4)).join('; ');
      if (aykiri.length > 30) aykiriMetin += ` … (toplam ${h.fmt(aykiri.length, 0)})`;
    }
    return {
      rows: [
        ['Q1 (birinci çeyreklik)', h.fmt(q1, 4)],
        ['Q2 (medyan)', h.fmt(q2, 4)],
        ['Q3 (üçüncü çeyreklik)', h.fmt(q3, 4)],
        ['Çeyrekler açıklığı (IQR)', h.fmt(iqr, 4)],
        ['Çeyrek sapma (IQR ÷ 2)', h.fmt(iqr / 2, 4)],
        ['Alt sınır (Q1 − 1,5 × IQR)', h.fmt(alt, 4)],
        ['Üst sınır (Q3 + 1,5 × IQR)', h.fmt(ust, 4)],
        ['Aykırı değerler', aykiriMetin],
        ['En küçük – en büyük', `${h.fmt(x[0], 4)} – ${h.fmt(x[n - 1], 4)}`],
        ['Veri sayısı', h.fmt(n, 0)],
      ],
      note: 'Çeyrekliklerin birden çok kabul görmüş tanımı vardır; küçük veri setlerinde yöntemler farklı sonuç verebilir. Ödev ya da raporda istenen yöntemi seçin.',
    };
  }
