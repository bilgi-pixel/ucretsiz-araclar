// BPM Milisaniye (Delay Süresi) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bpm = h.pos(v.bpm, 'Tempo');
    if (bpm < 10 || bpm > 1000) h.err('Tempo 10 ile 1000 BPM arasında olmalı; değeri kontrol edin.');
    const q = 60000 / bpm;
    const notalar = [['1/1 (birlik)', 4], ['1/2 (ikilik)', 2], ['1/4 (dörtlük)', 1], ['1/8 (sekizlik)', 0.5], ['1/16 (onaltılık)', 0.25], ['1/32 (otuzikilik)', 0.125]];
    const ms = (x) => h.fmt(x, 2) + ' ms';
    const satir = notalar.map(([ad, k]) => ad + ':  düz ' + ms(q * k) + '  |  noktalı ' + ms(q * k * 1.5) + '  |  üçleme ' + ms(q * k * 2 / 3) + '  |  ' + h.fmt(1000 / (q * k), 3) + ' Hz');
    return {
      rows: [
        ['Dörtlük nota (1/4)', ms(q)],
        ['Sekizlik nota (1/8)', ms(q / 2)],
        ['Noktalı sekizlik', ms(q * 0.75)],
        ['Sekizlik üçleme', ms(q / 3)],
        ['Onaltılık nota (1/16)', ms(q / 4)],
        ['Bir ölçü (4/4)', ms(q * 4)],
        ['Vuruş frekansı', h.fmt(bpm / 60, 3) + ' Hz'],
      ],
      text: h.fmt(bpm, 2) + ' BPM için nota süreleri\n' + satir.join('\n'),
      note: 'Dörtlük nota süresi = 60.000 ÷ BPM. Noktalı değer 1,5 katı, üçleme değer 2/3 katıdır.',
    };
  }
