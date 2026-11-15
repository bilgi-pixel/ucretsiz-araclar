// Taksit Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tutar = h.pos(v.tutar, 'Peşin fiyat');
    const pesinat = h.nonneg(h.opt(v.pesinat, 0, 'Peşinat'), 'Peşinat');
    const n = h.posint(v.taksit, 'Taksit sayısı');
    const r = h.nonneg(h.opt(v.oran, 0, 'Aylık oran'), 'Aylık oran') / 100;
    if (pesinat >= tutar) h.err('Peşinat, peşin fiyattan küçük olmalı; aksi halde taksitlendirilecek tutar kalmaz.');
    if (n > 600) h.err('Taksit sayısı en fazla 600 olabilir.');
    if (r > 1) h.err('Aylık oran %100\'den büyük olamaz; oranı yüzde olarak yazın (örn. 2,5).');
    const A = tutar - pesinat;
    const aylik = r === 0 ? A / n : (A * r) / (1 - Math.pow(1 + r, -n));
    const taksitToplam = aylik * n;
    const fark = taksitToplam - A;
    const genel = pesinat + taksitToplam;
    return {
      rows: [
        ['Aylık taksit', h.para(aylik)],
        ['Taksitlendirilen tutar', h.para(A)],
        ['Taksitlerin toplamı', h.para(taksitToplam)],
        ['Toplam vade farkı', h.para(fark)],
        ['Toplam ödeme (peşinat dahil)', h.para(genel)],
        ['Peşin fiyata göre artış', '%' + h.fmt((genel / tutar - 1) * 100, 2)],
      ],
      note: r === 0
        ? 'Vade farksız taksit: tutar taksit sayısına eşit bölünmüştür.'
        : 'Eşit taksit (anüite) yöntemi: vade farkı her ay kalan borç üzerinden işler. Vergi, sigorta ve masraflar dahil değildir.',
    };
  }
