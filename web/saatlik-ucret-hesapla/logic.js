// Serbest Çalışan Saatlik Ücret Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hedef = h.pos(v.hedef, 'Hedef aylık net gelir');
    const gider = h.nonneg(h.opt(v.gider, 0, 'Aylık iş giderleri'), 'Aylık iş giderleri');
    const vergi = h.nonneg(h.opt(v.vergi, 0, 'Vergi ve prim payı'), 'Vergi ve prim payı');
    if (vergi >= 100) h.err('"Vergi ve prim payı" %100\'den küçük olmalı.');
    const saat = h.pos(v.saat, 'Haftalık faturalanabilir saat');
    if (saat > 168) h.err('Bir haftada en fazla 168 saat vardır; "Haftalık faturalanabilir saat" alanını kontrol edin.');
    const tatil = h.nonneg(h.opt(v.tatil, 0, 'Yılda çalışılmayan hafta'), 'Yılda çalışılmayan hafta');
    if (tatil >= 52) h.err('"Yılda çalışılmayan hafta" 52\'den küçük olmalı.');
    const pay = h.nonneg(h.opt(v.pay, 0, 'Güvenlik / kâr payı'), 'Güvenlik / kâr payı');
    const yillikSaat = saat * (52 - tatil);
    const yillikCiro = (hedef * 12 / (1 - vergi / 100) + gider * 12) * (1 + pay / 100);
    const saatlik = yillikCiro / yillikSaat;
    return {
      rows: [
        ['Saatlik ücret', h.para(saatlik)],
        ['Günlük ücret (8 saat)', h.para(saatlik * 8)],
        ['Yıllık faturalanabilir saat', h.fmt(yillikSaat, 1) + ' saat'],
        ['Aylık ciro hedefi', h.para(yillikCiro / 12)],
        ['Yıllık ciro hedefi', h.para(yillikCiro)],
      ],
      note: 'Tutarlar KDV hariçtir; KDV uygulanıyorsa müşteriye ayrıca eklenir. Vergi ve prim payı sizin girdiğiniz orandır; güncel mevzuatı ve kendi durumunuzu mali müşavirinizle kontrol edin.',
    };
  }
