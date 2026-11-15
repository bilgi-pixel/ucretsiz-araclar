// Birleşik Gaz Yasası Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const AD = { p1: 'İlk basınç (P₁)', v1: 'İlk hacim (V₁)', t1: 'İlk sıcaklık (T₁)', p2: 'Son basınç (P₂)', v2: 'Son hacim (V₂)', t2: 'Son sıcaklık (T₂)' };
    const anahtar = Object.keys(AD);
    const bos = anahtar.filter((k) => String(v[k] ?? '').trim() === '');
    if (bos.length === 0) h.err('Bulunacak değerin alanını boş bırakın; altı alanın tümü dolu.');
    if (bos.length > 1) h.err('Yalnızca bir alan boş kalmalı. Şu an ' + bos.length + ' alan boş; bilinen beş değeri yazın.');
    const b = bos[0];
    const c = v.tBirim === 'c';
    const x = {};
    for (const k of anahtar) {
      if (k === b) continue;
      if (k[0] === 't') {
        const t = h.num(v[k], AD[k]);
        x[k] = c ? t + 273.15 : t;
        if (!(x[k] > 0)) h.err(`"${AD[k]}" mutlak sıfırın (0 K = −273,15 °C) üzerinde olmalı.`);
      } else x[k] = h.pos(v[k], AD[k]);
    }
    if (b === 'p1') x.p1 = x.p2 * x.v2 * x.t1 / (x.t2 * x.v1);
    else if (b === 'v1') x.v1 = x.p2 * x.v2 * x.t1 / (x.t2 * x.p1);
    else if (b === 't1') x.t1 = x.p1 * x.v1 * x.t2 / (x.p2 * x.v2);
    else if (b === 'p2') x.p2 = x.p1 * x.v1 * x.t2 / (x.t1 * x.v2);
    else if (b === 'v2') x.v2 = x.p1 * x.v1 * x.t2 / (x.t1 * x.p2);
    else x.t2 = x.p2 * x.v2 * x.t1 / (x.p1 * x.v1);
    let deger;
    if (b[0] === 't') deger = c ? h.fmt(x[b] - 273.15, 2) + ' °C' : h.fmt(x[b], 2) + ' K';
    else deger = h.fmt(x[b], 4) + (b[0] === 'p' ? ' (girilen basınç birimiyle)' : ' (girilen hacim birimiyle)');
    const oran = (a, s) => h.fmt(a / s, 4) + ' kat';
    return {
      rows: [
        [AD[b], deger],
        ['T₁ (Kelvin)', h.fmt(x.t1, 2) + ' K'],
        ['T₂ (Kelvin)', h.fmt(x.t2, 2) + ' K'],
        ['Basınç değişimi (P₂ ÷ P₁)', oran(x.p2, x.p1)],
        ['Hacim değişimi (V₂ ÷ V₁)', oran(x.v2, x.v1)],
        ['Mutlak sıcaklık değişimi (T₂ ÷ T₁)', oran(x.t2, x.t1)],
        ['P·V ÷ T sabiti', h.sig(x.p1 * x.v1 / x.t1, 6)],
      ],
      note: 'Gaz miktarının (mol sayısının) değişmediği ve gazın ideal davrandığı varsayılır. Sıcaklıklar hesapta Kelvin\'e çevrilir (K = °C + 273,15).',
    };
  }
