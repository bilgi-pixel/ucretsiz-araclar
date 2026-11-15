// Emniyet Stoğu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const Z = { '90': 1.281552, '95': 1.644854, '97.5': 1.959964, '99': 2.326348, '99.9': 3.090232 };
    const ort = h.pos(v.ortSatis, 'Ortalama günlük satış');
    const sure = h.pos(v.ortSure, 'Ortalama tedarik süresi');
    const beklenen = ort * sure;
    let ss;
    const rows = [];
    let note;
    if (v.yontem === 'servis') {
      const sapma = h.nonneg(v.sapma, 'Günlük satışın standart sapması');
      const z = Z[v.duzey] || Z['95'];
      ss = z * sapma * Math.sqrt(sure);
      rows.push(['Emniyet stoğu', h.fmt(ss, 2) + ' birim']);
      rows.push(['Yukarı yuvarlanmış emniyet stoğu', h.fmt(Math.ceil(ss - 1e-9), 0) + ' birim']);
      rows.push(['Yeniden sipariş noktası', h.fmt(beklenen + ss, 2) + ' birim']);
      rows.push(['Tedarik süresindeki beklenen talep', h.fmt(beklenen, 2) + ' birim']);
      rows.push(['Z katsayısı', h.fmt(z, 4)]);
      rows.push(['Tedarik süresi talebinin standart sapması', h.fmt(sapma * Math.sqrt(sure), 2) + ' birim']);
      note = 'Emniyet stoğu = Z × günlük standart sapma × √tedarik süresi. Talebin normal dağıldığı ve tedarik süresinin sabit olduğu varsayılır.';
    } else {
      const mSatis = h.pos(v.maksSatis, 'En yüksek günlük satış');
      const mSure = h.pos(v.maksSure, 'En uzun tedarik süresi');
      if (mSatis < ort) h.err('En yüksek günlük satış, ortalama günlük satıştan küçük olamaz.');
      if (mSure < sure) h.err('En uzun tedarik süresi, ortalama tedarik süresinden kısa olamaz.');
      ss = mSatis * mSure - beklenen;
      rows.push(['Emniyet stoğu', h.fmt(ss, 2) + ' birim']);
      rows.push(['Yukarı yuvarlanmış emniyet stoğu', h.fmt(Math.ceil(ss - 1e-9), 0) + ' birim']);
      rows.push(['Yeniden sipariş noktası', h.fmt(beklenen + ss, 2) + ' birim']);
      rows.push(['Tedarik süresindeki beklenen talep', h.fmt(beklenen, 2) + ' birim']);
      rows.push(['En kötü durumdaki talep', h.fmt(mSatis * mSure, 2) + ' birim']);
      note = 'Emniyet stoğu = (en yüksek günlük satış × en uzun tedarik süresi) − (ortalama günlük satış × ortalama tedarik süresi).';
    }
    rows.push(['Emniyet stoğunun karşıladığı süre', h.fmt(ss / ort, 1) + ' gün']);
    return { rows, note };
  }
