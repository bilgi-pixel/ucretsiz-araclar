// Göreli Zaman Genleşmesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const C = 299792458;
    const x = h.nonneg(v.hiz, 'Hız');
    let beta;
    if (v.birim === 'yuzde') beta = x / 100;
    else if (v.birim === 'kms') beta = (x * 1000) / C;
    else if (v.birim === 'ms') beta = x / C;
    else beta = x;
    if (!(beta < 1)) h.err('Hız ışık hızından küçük olmalı. Kütlesi olan bir cisim ışık hızına ulaşamaz; 0,999999 c gibi bir değer deneyin.');
    const sure = h.pos(v.sure, 'Bilinen süre');
    const kok = Math.sqrt(1 - beta * beta);
    const gama = 1 / kok;
    // γ − 1 için düşük hızlarda duyarlılığı koruyan biçim
    const gm1 = (beta * beta) / (kok * (1 + kok));
    let oz, goz;
    if (v.yon === 'goz') { goz = sure; oz = sure * kok; } else { oz = sure; goz = sure * gama; }
    const fark = oz * gm1;
    const rows = [
      ['Lorentz çarpanı (γ)', h.sig(gama, 7)],
      v.yon === 'goz' ? ['Hareketli saatte geçen süre', h.sig(oz, 8)] : ['Durgun gözlemciye göre süre', h.sig(goz, 8)],
      v.yon === 'goz' ? ['Durgun gözlemciye göre süre', h.sig(goz, 8)] : ['Hareketli saatte geçen süre', h.sig(oz, 8)],
      ['Süre farkı', h.sig(fark, 6)],
      ['Hız (c cinsinden)', h.sig(beta, 8) + ' c'],
      ['Hız (km/s)', h.sig(beta * C / 1000, 8) + ' km/s'],
    ];
    return { rows, note: 'Süreler girdiğiniz birimdedir. Hesap yalnızca özel göreliliği (sabit hız) kapsar; kütle çekiminden kaynaklanan zaman genleşmesi dahil değildir. c = 299.792.458 m/s.' };
  }
