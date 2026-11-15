// Karmaşık Sayı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.num(v.re1, 'z₁ gerçek kısım');
    const b = h.num(v.im1, 'z₁ sanal kısım');
    const c = h.num(v.re2, 'z₂ gerçek kısım');
    const d = h.num(v.im2, 'z₂ sanal kısım');
    let re, im;
    if (v.islem === 'cikar') { re = a - c; im = b - d; }
    else if (v.islem === 'carp') { re = a * c - b * d; im = a * d + b * c; }
    else if (v.islem === 'bol') {
      const payda = c * c + d * d;
      if (payda === 0) h.err('Sıfıra bölünemez: z₂ için gerçek ve sanal kısımdan en az biri sıfırdan farklı olmalı.');
      re = (a * c + b * d) / payda; im = (b * c - a * d) / payda;
    } else { re = a + c; im = b + d; }
    const yuv = (x) => { const y = Number(x.toFixed(4)); return Object.is(y, -0) ? 0 : y; };
    const yaz = (x, y) => {
      const p = yuv(x), q = yuv(y);
      if (q === 0) return h.fmt(p, 4);
      const k = Math.abs(q) === 1 ? 'i' : h.fmt(Math.abs(q), 4) + 'i';
      if (p === 0) return (q < 0 ? '-' : '') + k;
      return `${h.fmt(p, 4)} ${q < 0 ? '-' : '+'} ${k}`;
    };
    const mod = Math.hypot(re, im);
    const sifir = yuv(re) === 0 && yuv(im) === 0;
    const arg = (Math.atan2(yuv(im), yuv(re)) * 180) / Math.PI;
    return {
      rows: [
        ['Sonuç', yaz(re, im)],
        ['Modül |z|', h.fmt(mod, 4)],
        ['Argüman', sifir ? 'tanımsız' : h.fmt(arg, 4) + '°'],
        ['Eşlenik', yaz(re, -im)],
        ['Kutupsal gösterim', sifir ? '0' : `${h.fmt(mod, 4)} · (cos ${h.fmt(arg, 4)}° + i · sin ${h.fmt(arg, 4)}°)`],
        ['|z₁|', h.fmt(Math.hypot(a, b), 4)],
        ['|z₂|', h.fmt(Math.hypot(c, d), 4)],
      ],
      note: 'Argüman −180° ile 180° arasındaki esas değer olarak verilir. Sonuçlar dört ondalık basamağa yuvarlanır.',
    };
  }
