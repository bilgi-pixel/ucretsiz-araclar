// Saatlik Ücreti Aylık Maaşa Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tutar = h.pos(v.tutar, 'Ücret');
    const hafta = h.pos(v.haftalik, 'Haftalık çalışma saati');
    if (hafta > 168) h.err('"Haftalık çalışma saati" 168 saati aşamaz; bir haftada 168 saat vardır.');
    const aySaat = v.yontem === 'hafta' ? hafta * 52 / 12 : hafta / 6 * 30;
    const saatlik = v.yon === 'aylik' ? tutar / aySaat : tutar;
    const aylik = saatlik * aySaat;
    const ana = v.yon === 'aylik' ? ['Saatlik ücret', h.para(saatlik)] : ['Aylık ücret', h.para(aylik)];
    const diger = v.yon === 'aylik' ? ['Aylık ücret', h.para(aylik)] : ['Saatlik ücret', h.para(saatlik)];
    return {
      rows: [
        ana,
        diger,
        ['Aylık çalışma saati', h.fmt(aySaat, 2) + ' saat'],
        ['Günlük ücret (aylık ÷ 30)', h.para(aylik / 30)],
        ['Haftalık ücret', h.para(saatlik * hafta)],
        ['Yıllık ücret (12 ay)', h.para(aylik * 12)],
      ],
      note: 'Girdiğiniz tutar brütse sonuç brüt, netse nettir; araç vergi ve prim kesintisi hesaplamaz. Fazla mesai, ikramiye ve yan haklar dâhil değildir.',
    };
  }
