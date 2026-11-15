// Doppler Etkisi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const f = h.pos(v.frekans, 'Kaynağın frekansı');
    const c = h.pos(v.sesHizi, 'Ses hızı');
    const vk = h.nonneg(h.opt(v.kaynakHizi, 0, 'Kaynağın hızı'), 'Kaynağın hızı');
    const vg = h.nonneg(h.opt(v.gozlemciHizi, 0, 'Gözlemcinin hızı'), 'Gözlemcinin hızı');
    if (vk >= c) h.err('Kaynağın hızı ses hızından küçük olmalı; ses hızına ulaşan ya da aşan kaynakta şok dalgası oluşur ve bu formül uygulanamaz.');
    if (vg >= c) h.err('Gözlemcinin hızı ses hızından küçük olmalı.');
    const pay = v.gozlemciYon === 'uzaklas' ? c - vg : c + vg;
    const payda = v.kaynakYon === 'uzaklas' ? c + vk : c - vk;
    const fa = f * pay / payda;
    const fark = fa - f;
    const isaret = (x, d) => (x > 0 ? '+' : '') + h.fmt(x, d);
    let yorum;
    if (Math.abs(fark) < 1e-9) yorum = 'Frekans değişmez';
    else if (fark > 0) yorum = 'Ses daha tiz (ince) duyulur';
    else yorum = 'Ses daha pes (kalın) duyulur';
    return {
      rows: [
        ['Algılanan frekans', h.fmt(fa, 2) + ' Hz'],
        ['Frekans farkı', isaret(fark, 2) + ' Hz'],
        ['Yüzde değişim', '%' + isaret(fark / f * 100, 2)],
        ['Gözlemciye ulaşan dalga boyu', h.fmt(payda / f, 4) + ' m'],
        ['Yorum', yorum],
      ],
      note: 'Kaynak ve gözlemcinin aynı doğru üzerinde hareket ettiği, ortamın (havanın) durgun olduğu ve hızların ses hızından küçük olduğu varsayılır.',
    };
  }
