// Sulama Suyu İhtiyacı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Sulanacak alan');
    const net = h.pos(v.net, 'Verilecek net su');
    const rand = h.pos(v.randiman, 'Sulama randımanı');
    if (rand > 100) h.err('Sulama randımanı %100\'den büyük olamaz; 50 ile 95 arasında bir değer yazın.');
    const debi = h.opt(v.debi, 0, 'Pompa debisi');
    if (debi < 0) h.err('Pompa debisi negatif olamaz; boş bırakabilir ya da pozitif bir değer yazabilirsiniz.');
    const brut = net / (rand / 100);
    const hacim = alan * brut; // 1 mm × 1 dekar = 1 m³
    const netHacim = alan * net;
    const rows = [
      ['Toplam su ihtiyacı', h.fmt(hacim, 2) + ' m³ (ton)'],
      ['Litre karşılığı', h.fmt(hacim * 1000, 0) + ' litre'],
      ['Brüt su derinliği', h.fmt(brut, 2) + ' mm'],
      ['Dekara verilecek su', h.fmt(brut, 2) + ' m³/dekar'],
      ['Bitkiye ulaşan net su', h.fmt(netHacim, 2) + ' m³'],
      ['Kayıp (buharlaşma, sızma, akış)', h.fmt(hacim - netHacim, 2) + ' m³'],
    ];
    if (debi > 0) {
      const saat = hacim / debi;
      const tamSaat = Math.floor(saat + 1e-9);
      let dk = Math.round((saat - tamSaat) * 60);
      let ss = tamSaat;
      if (dk === 60) { ss += 1; dk = 0; }
      rows.push(['Sulama süresi', `${h.fmt(saat, 2)} saat (${ss} saat ${dk} dakika)`]);
    }
    return {
      rows,
      note: '1 mm su, 1 dekarda 1 m³ (1 ton) eder. Brüt su = net su ÷ randıman. Değerler planlama amaçlıdır; gerçek ihtiyaç toprak, iklim ve bitkiye göre değişir.',
    };
  }
