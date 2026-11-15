// Reklam Harcaması Getirisi (ROAS) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const gelir = h.nonneg(v.gelir, 'Reklamdan gelen ciro');
    const harcama = h.pos(v.harcama, 'Reklam harcaması');
    const roas = gelir / harcama;
    const rows = [
      ['ROAS', h.fmt(roas, 2) + ' kat'],
      ['ROAS (yüzde)', '%' + h.fmt(roas * 100, 2)],
      ['Harcanan 1 TL başına ciro', h.para(roas)],
      ['Reklam harcamasının ciroya oranı', gelir > 0 ? '%' + h.fmt(harcama / gelir * 100, 2) : '—'],
    ];
    let note = 'ROAS ciroyu ölçer, kârı değil. Kârlılığı görmek için brüt kâr marjınızı da girin.';
    if (String(v.marj ?? '').trim() !== '') {
      const marj = h.pos(v.marj, 'Brüt kâr marjı');
      if (marj > 100) h.err('"Brüt kâr marjı" %100\'den büyük olamaz; satış fiyatı üzerinden hesaplanan marjı yazın.');
      const basabas = 100 / marj;
      const kar = gelir * marj / 100 - harcama;
      rows.push(['Başabaş ROAS', h.fmt(basabas, 2) + ' kat']);
      rows.push(['Reklam sonrası brüt kâr', h.para(kar)]);
      const durum = Math.abs(kar) < 0.005 ? 'Başabaş: reklam kendini tam karşılıyor' : kar > 0 ? 'Kârlı: ROAS başabaş değerinin üzerinde' : 'Zararda: ROAS başabaş değerinin altında';
      rows.push(['Durum', durum]);
      note = 'Başabaş ROAS = 100 ÷ brüt kâr marjı. Kargo, komisyon, iade ve genel giderler marja dahil değilse gerçek başabaş noktası daha yüksektir.';
    }
    return { rows, note };
  }
