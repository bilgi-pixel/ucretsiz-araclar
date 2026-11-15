// Reel Faiz Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const nom = h.num(v.nominal, 'Nominal faiz oranı');
    const enf = h.num(v.enflasyon, 'Enflasyon oranı');
    const stopaj = h.nonneg(h.opt(v.stopaj, 0, 'Stopaj'), 'Stopaj');
    if (nom <= -100) h.err('Nominal oran −%100\'den büyük olmalı.');
    if (enf <= -100) h.err('Enflasyon oranı −%100\'den büyük olmalı.');
    if (stopaj >= 100) h.err('Stopaj oranı %100\'den küçük olmalı.');
    if (Math.abs(nom) > 1e6 || Math.abs(enf) > 1e6) h.err('Oranlar çok büyük; değerleri kontrol edin.');
    const net = nom > 0 ? nom * (1 - stopaj / 100) : nom;
    const reel = ((1 + net / 100) / (1 + enf / 100) - 1) * 100;
    const durum = Math.abs(reel) < 5e-5 ? 'Alım gücü korunuyor (reel faiz sıfır)' : reel > 0 ? 'Pozitif reel faiz: alım gücü artıyor' : 'Negatif reel faiz: alım gücü azalıyor';
    const yuzde = (x) => { const t = h.fmt(Math.abs(x), 4); return (x < 0 && t !== '0' ? '−%' : '%') + t; };
    const rows = [
      ['Reel faiz oranı', yuzde(reel)],
      ['Net nominal getiri', yuzde(net)],
      ['Yaklaşık yöntem (nominal − enflasyon)', yuzde(net - enf)],
      ['Değerlendirme', durum],
    ];
    if (String(v.anapara ?? '').trim() !== '') {
      const P = h.pos(v.anapara, 'Anapara');
      const son = P * (1 + net / 100);
      const reelDeger = son / (1 + enf / 100);
      rows.push(['Dönem sonu tutar (nominal)', h.para(son)]);
      rows.push(['Bugünün alım gücüyle değeri', h.para(reelDeger)]);
      rows.push(['Reel kazanç / kayıp', h.para(reelDeger - P)]);
    }
    return {
      rows,
      note: 'Reel faiz = (1 + net nominal) ÷ (1 + enflasyon) − 1. İki oran da aynı döneme (örneğin bir yıla) ait olmalıdır.',
    };
  }
