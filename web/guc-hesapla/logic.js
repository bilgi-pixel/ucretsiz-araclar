// Güç Hesaplama (Fizik) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const BG = 735.49875;
    let p, w = null, t = null, f = null, hiz = null;
    if (v.bul === 'fv') {
      f = h.nonneg(v.kuvvet, 'Kuvvet');
      hiz = h.nonneg(v.hiz, 'Hız');
      p = f * hiz;
    } else if (v.bul === 'w') {
      p = h.nonneg(v.guc, 'Güç');
      t = h.nonneg(v.sure, 'Süre');
      w = p * t;
    } else if (v.bul === 't') {
      w = h.nonneg(v.isDegeri, 'İş');
      p = h.pos(v.guc, 'Güç');
      t = w / p;
    } else {
      w = h.nonneg(v.isDegeri, 'İş');
      t = h.pos(v.sure, 'Süre');
      p = w / t;
    }
    const gucSatir = ['Güç', h.fmt(p, 4) + ' W'];
    const rows = [];
    if (v.bul === 'w') rows.push(['İş', h.fmt(w, 4) + ' J'], gucSatir);
    else if (v.bul === 't') rows.push(['Süre', h.fmt(t, 4) + ' s'], gucSatir);
    else rows.push(gucSatir);
    rows.push(['Güç (kW)', h.fmt(p / 1000, 6) + ' kW']);
    rows.push(['Güç (beygir gücü)', h.fmt(p / BG, 4) + ' BG']);
    if (v.bul === 'p' || v.bul === 't') rows.push(['İş', h.fmt(w, 4) + ' J']);
    if (v.bul === 'p' || v.bul === 'w') rows.push(['Süre', h.fmt(t, 4) + ' s']);
    if (w !== null) rows.push(['Enerji (kWh)', h.fmt(w / 3.6e6, 6) + ' kWh']);
    if (v.bul === 'fv') rows.push(['Kuvvet', h.fmt(f, 4) + ' N'], ['Hız', h.fmt(hiz, 4) + ' m/s']);
    return {
      rows,
      note: v.bul === 'fv'
        ? 'Kuvvetin hareketle aynı yönde olduğu varsayılır. 1 BG (metrik beygir gücü) = 735,49875 W.'
        : 'İş ve süreden bulunan değer ortalama güçtür. 1 BG (metrik beygir gücü) = 735,49875 W; 1 kWh = 3.600.000 J.',
    };
  }
