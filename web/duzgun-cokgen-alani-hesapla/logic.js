// Düzgün Çokgen Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.int(v.kenarSayisi, 'Kenar sayısı');
    if (n < 3) h.err('Bir çokgenin en az 3 kenarı olur; kenar sayısını 3 ya da daha büyük yazın.');
    if (n > 1000) h.err('Kenar sayısı en fazla 1.000 olabilir.');
    const x = h.pos(v.deger, 'Ölçü');
    const t = Math.PI / n;
    let a;
    if (v.tur === 'yaricap') a = 2 * x * Math.sin(t);
    else if (v.tur === 'apotem') a = 2 * x * Math.tan(t);
    else a = x;
    const apotem = a / (2 * Math.tan(t));
    const R = a / (2 * Math.sin(t));
    const alan = n * a * apotem / 2;
    return {
      rows: [
        ['Alan', h.fmt(alan, 4) + ' birim²'],
        ['Kenar', h.fmt(a, 4) + ' birim'],
        ['Çevre', h.fmt(n * a, 4) + ' birim'],
        ['Apotem', h.fmt(apotem, 4) + ' birim'],
        ['Çevrel çember yarıçapı', h.fmt(R, 4) + ' birim'],
        ['İç açı', h.fmt(180 * (n - 2) / n, 4) + '°'],
        ['Dış açı (merkez açı)', h.fmt(360 / n, 4) + '°'],
        ['Köşegen sayısı', h.fmt(n * (n - 3) / 2, 0)],
      ],
      note: 'Alan = çevre × apotem ÷ 2 = n·a² ÷ (4·tan(180°/n)). Formül yalnızca bütün kenarları ve açıları eşit (düzgün) çokgenler için geçerlidir.',
    };
  }
