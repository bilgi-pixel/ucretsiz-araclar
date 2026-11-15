// Avize Boyutu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const tavan = h.pos(v.tavan, 'Tavan yüksekliği');
    if (en > 30 || boy > 30) h.err('Oda ölçüleri metre olarak yazılmalı ve 30 metreyi aşmamalı (450 cm için 4,5 yazın).');
    if (tavan < 1.8 || tavan > 10) h.err('Tavan yüksekliği 1,8 ile 10 metre arasında olmalı; değeri metre olarak yazın (270 cm için 2,7).');
    const yuv = (x) => Math.round(x + 1e-9);
    // Çap (inç) = en (ft) + boy (ft)  →  cm = (en + boy) m × 25/3
    const cap = (en + boy) * 25 / 3;
    // Yükseklik: tavanın her feet'i için 2,5–3 inç  →  metre başına 20,83–25 cm
    const yMin = tavan * 2.5 * 2.54 / 0.3048;
    const yMax = tavan * 25;
    const sarkma = tavan * 100 - 210;
    const rows = [
      ['Önerilen avize çapı', yuv(cap) + ' cm'],
      ['Önerilen avize yüksekliği', `${yuv(yMin)}–${yuv(yMax)} cm`],
      ['En fazla sarkma (altında 210 cm kalacak biçimde)', sarkma > 1e-9 ? h.fmt(sarkma, 0) + ' cm' : 'Sarkıt uygun değil; tavana yakın (plafonyer) model seçin'],
      ['Oda alanı', h.fmt(en * boy, 2) + ' m²'],
    ];
    if (String(v.masa ?? '').trim() !== '') {
      const masa = h.pos(v.masa, 'Masa genişliği');
      if (masa < 40 || masa > 400) h.err('Masa genişliği 40 ile 400 cm arasında olmalı; değeri santimetre olarak yazın.');
      rows.push(['Masa üstü avize çapı', `${yuv(masa / 2)}–${yuv(masa * 2 / 3)} cm`]);
      rows.push(['Avize altının masa yüzeyinden yüksekliği', '75–90 cm']);
    }
    return {
      rows,
      note: 'Çap için "en + boy" kuralı, yükseklik için tavan yüksekliğiyle orantı kullanılmıştır. Bunlar tasarım için başlangıç değerleridir; avizenin görsel ağırlığına ve odanın düzenine göre ayarlanabilir.',
    };
  }
