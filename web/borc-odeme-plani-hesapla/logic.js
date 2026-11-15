// Borç Ödeme Planı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const borc = h.pos(v.borc, 'Borç tutarı');
    const faiz = h.nonneg(v.faiz, 'Aylık faiz oranı');
    const odeme = h.pos(v.odeme, 'Aylık ödeme');
    const r = faiz / 100;
    const ilkFaiz = borc * r;
    if (odeme <= ilkFaiz + 1e-9) h.err(`Aylık ödeme ilk ayın faizini (${h.para(ilkFaiz)}) karşılamıyor; bu ödemeyle borç azalmaz. Daha yüksek bir ödeme yazın.`);
    let kalan = borc, ay = 0, toplamFaiz = 0, son = 0;
    const satirlar = [];
    while (kalan > 0.005) {
      if (ay >= 1200) h.err('Bu ödemeyle borç 100 yılda bile bitmiyor; aylık ödemeyi artırın.');
      const f = kalan * r;
      son = Math.min(odeme, kalan + f);
      kalan = kalan + f - son;
      if (kalan < 0.005) kalan = 0;
      toplamFaiz += f;
      ay++;
      if (ay <= 60) satirlar.push(`${ay} | ${h.para(son)} | ${h.para(f)} | ${h.para(son - f)} | ${h.para(kalan)}`);
    }
    const yil = Math.floor(ay / 12), artan = ay % 12;
    const sure = ay < 12 ? `${ay} ay` : `${ay} ay (${yil} yıl${artan ? ` ${artan} ay` : ''})`;
    let metin = 'Ay | Ödeme | Faiz | Anapara | Kalan borç\n' + satirlar.join('\n');
    if (ay > 60) metin += `\n… (toplam ${ay} ay; tabloda ilk 60 ay gösterilir)`;
    return {
      rows: [
        ['Borcun biteceği süre', sure],
        ['Toplam faiz', h.para(toplamFaiz)],
        ['Toplam ödeme', h.para(borc + toplamFaiz)],
        ['Son ay ödemesi', h.para(son)],
        ['İlk ay faizi', h.para(ilkFaiz)],
      ],
      text: metin,
      note: 'Faiz her ay kalan borca uygulanır ve oranın dönem boyunca sabit kaldığı varsayılır. Gecikme faizi, masraf ve yeni harcamalar hesaba katılmaz.',
    };
  }
