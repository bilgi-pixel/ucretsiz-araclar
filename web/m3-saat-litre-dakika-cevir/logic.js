// Debi Çevirici (m³/saat – litre/dakika) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Debi');
    const kat = { m3h: 1000 / 60, lmin: 1, ls: 60, lh: 1 / 60, m3s: 60000, gpm: 3.785411784 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const lmin = x * k;
    const s = {
      lmin: ['Litre/dakika', h.sig(lmin, 6) + ' L/dk'],
      m3h: ['Metreküp/saat', h.sig(lmin * 0.06, 6) + ' m³/saat'],
      ls: ['Litre/saniye', h.sig(lmin / 60, 6) + ' L/sn'],
      lh: ['Litre/saat', h.sig(lmin * 60, 6) + ' L/saat'],
      m3s: ['Metreküp/saniye', h.sig(lmin / 60000, 6) + ' m³/sn'],
      gpm: ['ABD galonu/dakika', h.sig(lmin / 3.785411784, 6) + ' gpm'],
    };
    const sira = v.birim === 'm3h' ? ['lmin', 'ls', 'lh', 'm3s', 'gpm'] : ['m3h', 'lmin', 'ls', 'lh', 'm3s', 'gpm'];
    const rows = sira.filter((b) => b !== v.birim).map((b) => s[b]);
    rows.push(['Metreküp/gün', h.sig(lmin * 1.44, 6) + ' m³/gün']);
    const hacim = h.opt(v.hacim, null, 'Doldurulacak hacim');
    if (hacim !== null) {
      if (hacim <= 0) h.err('"Doldurulacak hacim" sıfırdan büyük olmalı ya da boş bırakılmalı.');
      if (lmin <= 0) h.err('Dolum süresi için debi sıfırdan büyük olmalı.');
      const sn = Math.round((hacim / lmin) * 60);
      const sa = Math.floor(sn / 3600);
      const dk = Math.floor((sn % 3600) / 60);
      const kalan = sn % 60;
      rows.push(['Dolum süresi', (sa ? h.fmt(sa, 0) + ' saat ' : '') + dk + ' dk ' + kalan + ' sn']);
    }
    return {
      rows,
      note: '1 m³ = 1.000 litre, 1 ABD galonu = 3,785411784 litre alınmıştır. Dolum süresi debinin sabit kaldığını varsayar; gerçek tesisatta basınç değiştikçe debi de değişir.',
    };
  }
