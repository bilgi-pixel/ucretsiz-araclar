// Pirinç Su Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ORAN = { baldo: 1.5, osmancik: 1.5, basmati: 1.75, yasemin: 1.25, esmer: 2.5 };
    const BARDAK_ML = 200, BARDAK_G = 180, PORSIYON_G = 75;
    const x = h.pos(v.miktar, 'Pirinç miktarı');
    const oran = ORAN[v.tur] || 1.5;
    let gram;
    if (v.birim === 'gram') gram = x;
    else if (v.birim === 'kisi') {
      if (!Number.isInteger(x)) h.err('Kişi sayısı tam sayı olmalı (örn. 4).');
      gram = x * PORSIYON_G;
    } else gram = x * BARDAK_G;
    if (gram > 100000) h.err('Pirinç miktarı çok büyük; en fazla 100 kg için hesap yapılır.');
    const bardak = gram / BARDAK_G;
    const suBardak = bardak * oran;
    const suMl = suBardak * BARDAK_ML;
    return {
      rows: [
        ['Su miktarı', h.fmt(suBardak, 2) + ' su bardağı'],
        ['Su (mililitre)', h.fmt(suMl, 0) + ' ml'],
        ['Pirinç', h.fmt(bardak, 2) + ' su bardağı (' + h.fmt(gram, 0) + ' g)'],
        ['Hacimce oran', '1 ölçü pirince ' + h.fmt(oran, 2) + ' ölçü su'],
        ['Yaklaşık porsiyon', h.fmt(gram / PORSIYON_G, 1) + ' kişilik'],
      ],
      note: 'Varsayımlar: 1 su bardağı 200 ml, 1 su bardağı pirinç yaklaşık 180 g, kişi başı 75 g çiğ pirinç (garnitür porsiyonu). Oranlar kapağı kapalı tencerede, suyunu çekerek pişirme yöntemi içindir. Paketin üzerinde su oranı yazıyorsa onu esas alın.',
    };
  }
