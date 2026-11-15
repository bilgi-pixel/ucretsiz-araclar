// PWM Görev Döngüsü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const f = h.pos(v.frekans, 'Frekans');
    const d = h.num(v.gorev, 'Görev döngüsü');
    if (d < 0 || d > 100) h.err('Görev döngüsü %0 ile %100 arasında olmalı.');
    const u = h.opt(v.gerilim, 5, 'Tepe gerilimi');
    if (u < 0) h.err('Tepe gerilimi negatif olamaz.');
    const n = h.opt(v.bit, 8, 'PWM çözünürlüğü');
    if (!Number.isInteger(n) || n < 1 || n > 32) h.err('PWM çözünürlüğü 1 ile 32 arasında tam sayı olmalı.');
    const oran = d / 100;
    const t = 1 / f;
    const sure = (x) => {
      if (x <= 0) return '0 ms';
      const e = 1 - 1e-12;
      if (x >= e) return h.sig(x, 5) + ' s';
      if (x >= 1e-3 * e) return h.sig(x * 1e3, 5) + ' ms';
      if (x >= 1e-6 * e) return h.sig(x * 1e6, 5) + ' µs';
      return h.sig(x * 1e9, 5) + ' ns';
    };
    const ust = Math.pow(2, n) - 1;
    const deger = Math.round(oran * ust + 1e-9);
    return {
      rows: [
        ['Açık (yüksek) süre', sure(t * oran)],
        ['Kapalı (düşük) süre', sure(t * (1 - oran))],
        ['Periyot', sure(t)],
        ['Ortalama gerilim', h.sig(u * oran, 5) + ' V'],
        ['Etkin (RMS) gerilim', h.sig(u * Math.sqrt(oran), 5) + ' V'],
        ['Dirençli yükte güç oranı', '%' + h.fmt(d, 2)],
        ['Sayaç karşılaştırma değeri', h.fmt(deger, 0) + ' / ' + h.fmt(ust, 0)],
        ['Gerçekleşen görev döngüsü', '%' + h.fmt(deger / ust * 100, 2)],
      ],
      note: 'İdeal kare dalga varsayılmıştır: düşük seviye 0 V, yükselme ve düşme süreleri sıfır. Sayaç değeri, görev döngüsünün 0 ile en büyük değer arasına orantılanıp en yakın tam sayıya yuvarlanmasıyla bulunur.',
    };
  }
