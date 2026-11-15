// Dirhem ve Miskal Gram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const DIRHEM = 3.2073625; // gram (okka 1,282945 kg ÷ 400)
    const dKat = { dirhem: 1, miskal: 1.5, kirat: 1 / 16 };
    let dirhem;
    if (v.birim === 'gram') dirhem = x / DIRHEM;
    else if (dKat[v.birim]) dirhem = x * dKat[v.birim];
    else h.err('Listeden geçerli bir birim seçin.');
    const gram = v.birim === 'gram' ? x : dirhem * DIRHEM;
    const s = {
      gram: ['Gram', h.fmt(gram, 4) + ' g'],
      dirhem: ['Dirhem', h.fmt(dirhem, 4) + ' dirhem'],
      miskal: ['Miskal', h.fmt(dirhem / 1.5, 4) + ' miskal'],
      kirat: ['Kırat', h.fmt(dirhem * 16, 3) + ' kırat'],
    };
    const sira = v.birim === 'gram' ? ['dirhem', 'miskal', 'kirat'] : ['gram', 'dirhem', 'miskal', 'kirat'];
    const rows = sira.filter((k) => k !== v.birim).map((k) => s[k]);
    rows.push(['Okka', h.fmt(dirhem / 400, 5) + ' okka']);
    return {
      rows,
      note: 'Osmanlı çarşı (örfi) ölçüsü kullanılmıştır: 1 dirhem = 3,2073625 g. Dinî hesaplarda esas alınan şer\'i dirhem ve miskal daha hafiftir; bu araç onları hesaplamaz.',
    };
  }
