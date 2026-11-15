// AWG mm² Kablo Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const cap = (n) => 0.127 * Math.pow(92, (36 - n) / 39); // mm
    const alan = (n) => Math.PI / 4 * cap(n) * cap(n); // mm²
    const ad = (n) => (n <= 0 ? (1 - n) + '/0 AWG' : 'AWG ' + n);
    const RHO = 17.241; // Ω·mm²/km, tavlanmış bakır, 20 °C
    if (v.yon === 'mm2') {
      const A = h.pos(v.deger, 'Kesit');
      const d = Math.sqrt(4 * A / Math.PI);
      const n = 36 - 39 * Math.log(d / 0.127) / Math.log(92);
      if (n < -3 - 1e-6) h.err('Bu kesit 4/0 AWG\'den (107,2 mm²) kalın; daha kalın kablolar AWG yerine kcmil ile ifade edilir.');
      if (n > 40.5) h.err('Bu kesit AWG 40\'tan (0,0049 mm²) ince; aracın kapsamı dışında.');
      const yakin = Math.min(40, Math.max(-3, Math.round(n)));
      const kalin = Math.min(40, Math.max(-3, Math.floor(n + 1e-6)));
      return {
        rows: [
          ['En yakın AWG', ad(yakin) + ' (' + h.sig(alan(yakin), 4) + ' mm²)'],
          ['Eşit ya da daha kalın ilk AWG', ad(kalin) + ' (' + h.sig(alan(kalin), 4) + ' mm²)'],
          ['Eşdeğer dolu tel çapı', h.sig(d, 4) + ' mm'],
          ['Bakır direnci (20 °C)', h.sig(RHO / A, 4) + ' Ω/km'],
        ],
        note: 'Akım taşıma açısından güvenli seçim, kesiti girilen değere eşit ya da ondan büyük olan AWG numarasıdır (numara küçüldükçe tel kalınlaşır).',
      };
    }
    let t = String(v.deger ?? '').trim().toUpperCase().replace(/AWG/g, '').replace(/\s/g, '');
    if (!t) h.err('AWG numarasını yazın (örn. 12 ya da 4/0).');
    let n, m;
    if ((m = /^([1-4])\/0$/.exec(t))) n = 1 - Number(m[1]);
    else if (/^0{1,4}$/.test(t)) n = 1 - t.length;
    else if (/^\d{1,2}$/.test(t)) n = Number(t);
    else h.err('AWG numarası 1–40 arası bir tam sayı ya da 1/0, 2/0, 3/0, 4/0 biçiminde olmalı.');
    if (n > 40) h.err('AWG numarası en fazla 40 olabilir.');
    const A = alan(n);
    const std = [0.14, 0.25, 0.34, 0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
    const ust = std.find((s) => s >= A - 1e-9);
    return {
      rows: [
        ['Kesit', h.sig(A, 4) + ' mm²'],
        ['Çap', h.sig(cap(n), 4) + ' mm'],
        ['Bakır direnci (20 °C)', h.sig(RHO / A, 4) + ' Ω/km'],
        ['Eşit ya da büyük ilk metrik kesit', h.fmt(ust, 2) + ' mm²'],
        ['Gösterim', ad(n)],
      ],
      note: 'Çap ve kesit dolu (tek telli) iletken içindir; çok telli kablolarda dış çap biraz daha büyüktür. İzolasyon kalınlığı dâhil değildir.',
    };
  }
