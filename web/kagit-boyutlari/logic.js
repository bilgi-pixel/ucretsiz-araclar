// Kâğıt Boyutları (A, B, C Serisi) Sorgulama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const T = {
      A: [[841, 1189], [594, 841], [420, 594], [297, 420], [210, 297], [148, 210], [105, 148], [74, 105], [52, 74], [37, 52], [26, 37]],
      B: [[1000, 1414], [707, 1000], [500, 707], [353, 500], [250, 353], [176, 250], [125, 176], [88, 125], [62, 88], [44, 62], [31, 44]],
      C: [[917, 1297], [648, 917], [458, 648], [324, 458], [229, 324], [162, 229], [114, 162], [81, 114], [57, 81], [40, 57], [28, 40]],
    };
    const t = String(v.boyut ?? '').trim().toUpperCase().replace(/\s+/g, '');
    if (t === '') h.err('Kâğıt boyutunu yazın (örn. A4).');
    const m = /^([ABC])(\d{1,2})$/.exec(t);
    if (!m || +m[2] > 10) h.err('Geçerli bir boyut kodu yazın: A0–A10, B0–B10 ya da C0–C10 (örn. A4, B5, C6).');
    const seri = m[1], no = +m[2];
    const [en, boy] = T[seri][no];
    const dpi = h.opt(v.dpi, 300, 'Çözünürlük');
    if (!(dpi > 0)) h.err('"Çözünürlük" sıfırdan büyük olmalı.');
    const px = (mm) => Math.round(mm / 25.4 * dpi);
    const alanCm = en * boy / 100;
    const rows = [
      ['Ölçü (mm)', en + ' × ' + boy + ' mm'],
      ['Ölçü (cm)', h.fmt(en / 10, 1) + ' × ' + h.fmt(boy / 10, 1) + ' cm'],
      ['Ölçü (inç)', h.fmt(en / 25.4, 2) + ' × ' + h.fmt(boy / 25.4, 2) + ' inç'],
      ['Piksel (' + h.fmt(dpi, 2) + ' DPI)', h.fmt(px(en), 0) + ' × ' + h.fmt(px(boy), 0) + ' px'],
      ['Alan', h.fmt(alanCm, 2) + ' cm² (' + h.fmt(alanCm / 10000, 4) + ' m²)'],
    ];
    if (no < 10) {
      const [e2, b2] = T[seri][no + 1];
      rows.push(['İkiye katlanınca', seri + (no + 1) + ' (' + e2 + ' × ' + b2 + ' mm)']);
    }
    if (seri === 'C') rows.push(['İçine sığan kâğıt', 'A' + no + ' (katlanmadan)']);
    const notlar = {
      A: 'A serisi yazı, baskı ve fotokopi kâğıtlarında kullanılır; A0 yaklaşık 1 m² alandadır.',
      B: 'B serisi afiş, kitap ve pasaport gibi ara boyutlarda kullanılır; aynı numaralı A boyutundan büyüktür.',
      C: 'C serisi zarf boyutudur; aynı numaralı A kâğıdı katlanmadan içine sığar.',
    };
    return { rows, note: notlar[seri] + ' Ölçüler tam milimetreye yuvarlanmış standart değerlerdir.' };
  }
