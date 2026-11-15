// Ohm Kanunu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const AD = { gerilim: 'Gerilim', akim: 'Akım', direnc: 'Direnç', guc: 'Güç' };
    const dolu = Object.keys(AD).filter((k) => String(v[k] ?? '').trim() !== '');
    if (dolu.length !== 2) h.err(`Tam olarak iki alan doldurulmalı; şu an ${dolu.length} alan dolu. Bilinen iki değeri yazıp diğerlerini boş bırakın.`);
    const x = {};
    for (const k of dolu) x[k] = h.pos(v[k], AD[k]);
    let V = x.gerilim, I = x.akim, R = x.direnc, P = x.guc;
    const var_ = (a, b) => dolu.includes(a) && dolu.includes(b);
    if (var_('gerilim', 'akim')) { R = V / I; P = V * I; }
    else if (var_('gerilim', 'direnc')) { I = V / R; P = V * V / R; }
    else if (var_('gerilim', 'guc')) { I = P / V; R = V * V / P; }
    else if (var_('akim', 'direnc')) { V = I * R; P = I * I * R; }
    else if (var_('akim', 'guc')) { V = P / I; R = P / (I * I); }
    else { V = Math.sqrt(P * R); I = Math.sqrt(P / R); }
    const hepsi = {
      gerilim: ['Gerilim', h.sig(V, 6) + ' V'],
      akim: ['Akım', h.sig(I, 6) + ' A'],
      direnc: ['Direnç', h.sig(R, 6) + ' Ω'],
      guc: ['Güç', h.sig(P, 6) + ' W'],
    };
    const rows = [];
    for (const k of Object.keys(AD)) if (!dolu.includes(k)) rows.push(hepsi[k]);
    for (const k of dolu) rows.push(hepsi[k]);
    rows.push(['Akım (mA)', h.sig(I * 1000, 6) + ' mA']);
    rows.push(['İletkenlik', h.sig(1 / R, 6) + ' S']);
    return { rows, note: 'Hesap, doğru akım devreleri ve yalnızca dirençten oluşan (omik) yükler için geçerlidir. İlk iki satır hesaplanan, sonraki iki satır girdiğiniz değerlerdir.' };
  }
