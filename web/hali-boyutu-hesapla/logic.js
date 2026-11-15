// Halı Boyutu Seçimi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.en, 'Oda eni');
    const b = h.pos(v.boy, 'Oda boyu');
    const bos = h.nonneg(h.opt(v.bosluk, 30, 'Kenar boşluğu'), 'Kenar boşluğu');
    if (a > 30 || b > 30) h.err('Oda ölçüleri metre olarak yazılmalı ve 30 metreyi aşmamalı (350 cm için 3,5 yazın).');
    const W = Math.min(a, b) * 100, L = Math.max(a, b) * 100;
    const mw = W - 2 * bos, ml = L - 2 * bos;
    if (mw < 40) h.err('Bu kenar boşluğuyla odada halıya yer kalmıyor; boşluğu azaltın ya da oda ölçülerini kontrol edin.');
    const STD = [[80, 150], [120, 180], [160, 230], [200, 290], [240, 340], [300, 400]];
    let sec = null;
    for (const s of STD) if (s[0] <= mw + 1e-6 && s[1] <= ml + 1e-6) sec = s;
    const oda = W * L / 10000;
    const rows = [];
    if (sec) {
      const alan = sec[0] * sec[1] / 10000;
      rows.push(['Önerilen standart halı', `${sec[0]} × ${sec[1]} cm`]);
      rows.push(['Halı alanı', h.fmt(alan, 2) + ' m²']);
      rows.push(['Zemini kaplama oranı', '%' + h.fmt(alan / oda * 100, 1)]);
      rows.push(['Halı ortalanınca kenar boşluğu', `kısa kenarlarda ${h.fmt((L - sec[1]) / 2, 1)} cm, uzun kenarlarda ${h.fmt((W - sec[0]) / 2, 1)} cm`]);
    } else {
      rows.push(['Önerilen standart halı', 'Uygun standart ölçü yok (özel kesim ya da yolluk düşünün)']);
    }
    rows.push(['Sığan en büyük halı', `${h.fmt(mw, 1)} × ${h.fmt(ml, 1)} cm (${h.fmt(mw * ml / 10000, 2)} m²)`]);
    rows.push(['Oda alanı', h.fmt(oda, 2) + ' m²']);
    return {
      rows,
      note: 'Standart ölçüler olarak 80×150, 120×180, 160×230, 200×290, 240×340 ve 300×400 cm alınmıştır. Üreticiye göre birkaç santimetrelik farklar olabilir; satın almadan önce etiketi kontrol edin.',
    };
  }
