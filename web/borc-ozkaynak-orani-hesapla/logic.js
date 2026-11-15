// Borç/Özkaynak Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kisa = h.nonneg(v.kisa, 'Kısa vadeli yabancı kaynaklar');
    const uzun = h.opt(v.uzun, 0, 'Uzun vadeli yabancı kaynaklar');
    if (uzun < 0) h.err('"Uzun vadeli yabancı kaynaklar" negatif olamaz.');
    const oz = h.num(v.ozkaynak, 'Özkaynaklar');
    if (oz < 0) h.err('Özkaynak negatif: işletmenin borçları varlıklarını aşmış durumda (borca batıklık). Bu durumda borç/özkaynak oranı anlamlı biçimde yorumlanamaz.');
    if (oz === 0) h.err('Özkaynak sıfır olduğunda oran hesaplanamaz (sıfıra bölme). Özkaynak tutarını kontrol edin.');
    const borc = kisa + uzun;
    const varlik = borc + oz;
    const oran = borc / oz;
    const yorum = oran <= 1 + 1e-9 ? 'Borçlar özkaynağı aşmıyor' : oran <= 2 + 1e-9 ? 'Borçlar özkaynağın üzerinde; kaldıraç orta-yüksek' : 'Borçlar özkaynağın iki katından fazla; kaldıraç yüksek';
    return {
      rows: [
        ['Borç/Özkaynak oranı', h.fmt(oran, 2)],
        ['Toplam borç', h.para(borc)],
        ['Toplam kaynak (pasif)', h.para(varlik)],
        ['Kaldıraç oranı (borç ÷ toplam kaynak)', '%' + h.fmt((borc / varlik) * 100, 2)],
        ['Özkaynak oranı', '%' + h.fmt((oz / varlik) * 100, 2)],
        ['Özkaynak çarpanı', h.fmt(varlik / oz, 2)],
        ['Kısa vadeli borcun toplam borçtaki payı', borc > 0 ? '%' + h.fmt((kisa / borc) * 100, 2) : '—'],
        ['Değerlendirme', yorum],
      ],
      note: 'Toplam kaynak, toplam varlıklara (aktif toplamına) eşittir. Değerlendirme genel bir kılavuzdur; uygun borçluluk düzeyi sektöre göre değişir.',
    };
  }
