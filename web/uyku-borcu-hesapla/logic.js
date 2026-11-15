// Uyku Borcu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ihtiyac = h.pos(v.ihtiyac, 'Gecelik uyku ihtiyacı');
    if (ihtiyac < 3 || ihtiyac > 16) h.err('"Gecelik uyku ihtiyacı" 3 ile 16 saat arasında olmalı.');
    const g = h.nums(v.geceler, 'Son gecelerde uyunan süreler');
    if (g.length > 31) h.err('En fazla 31 gece girebilirsiniz; listeyi kısaltın.');
    for (const x of g) if (x < 0 || x > 24) h.err('Uyku süreleri 0 ile 24 saat arasında olmalı; değerleri saat olarak yazın (örn. 6,5).');
    const sure = (saat) => {
      const dk = Math.round(saat * 60);
      const s = Math.floor(dk / 60), d = dk % 60;
      if (s && d) return `${s} saat ${d} dakika`;
      if (s) return `${s} saat`;
      return `${d} dakika`;
    };
    const n = g.length;
    const toplam = g.reduce((a, b) => a + b, 0);
    const gerek = ihtiyac * n;
    const borc = Math.round((gerek - toplam) * 60) / 60;
    const eksikGece = g.filter((x) => x < ihtiyac - 1e-9).length;
    const rows = [];
    if (borc > 1e-9) rows.push(['Toplam uyku borcu', sure(borc)]);
    else if (borc < -1e-9) rows.push(['Toplam uyku borcu', `Uyku borcunuz yok (${sure(-borc)} fazla uyku)`]);
    else rows.push(['Toplam uyku borcu', 'Uyku borcunuz yok']);
    rows.push(['Gecelik ortalama uyku', sure(toplam / n)]);
    rows.push(['Toplam uyku', `${sure(toplam)} (${n} gece)`]);
    rows.push(['Toplam ihtiyaç', sure(gerek)]);
    rows.push(['İhtiyacın altında kalan gece', `${eksikGece} / ${n}`]);
    if (borc > 1e-9) {
      rows.push(['Gecelik ortalama açık', sure(borc / n)]);
      rows.push(['Günde 1 saat ek uykuyla telafi süresi', Math.ceil(borc - 1e-9) + ' gün']);
    }
    return {
      rows,
      note: 'Borç = (gecelik ihtiyaç × gece sayısı) − toplam uyku. Fazla uyunan geceler eksik geceleri dengeler. Sonuç bilgilendirme amaçlıdır; süregen uykusuzlukta hekime başvurun.',
    };
  }
