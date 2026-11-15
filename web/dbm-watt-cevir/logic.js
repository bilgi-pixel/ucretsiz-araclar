// dBm Watt Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const olcek = (x, birimler) => {
      for (const [k, ad] of birimler) if (x >= k * (1 - 1e-9)) return h.sig(x / k, 6) + ' ' + ad;
      return h.sig(x, 6) + ' ' + birimler[birimler.length - 1][1].replace(/^./, '');
    };
    let dbm, w;
    if (v.yon === 'dbm') {
      dbm = h.num(v.deger, 'Değer');
      if (Math.abs(dbm) > 200) h.err('dBm değeri −200 ile 200 arasında olmalı.');
      w = Math.pow(10, dbm / 10) / 1000;
    } else {
      const x = h.pos(v.deger, 'Değer');
      w = v.yon === 'mw' ? x / 1000 : x;
      dbm = 10 * Math.log10(w * 1000);
    }
    const guc = olcek(w, [[1e9, 'GW'], [1e6, 'MW'], [1e3, 'kW'], [1, 'W'], [1e-3, 'mW'], [1e-6, 'µW'], [1e-9, 'nW'], [1e-12, 'pW'], [1e-15, 'fW']]);
    const volt = Math.sqrt(w * 50);
    const gerilim = olcek(volt, [[1e3, 'kV'], [1, 'V'], [1e-3, 'mV'], [1e-6, 'µV'], [1e-9, 'nV']]);
    const dbmYaz = h.fmt(dbm, 2) + ' dBm';
    const rows = [
      v.yon === 'dbm' ? ['Güç', guc] : ['dBm', dbmYaz],
      v.yon === 'dbm' ? ['dBm', dbmYaz] : ['Güç', guc],
      ['Miliwatt', h.sig(w * 1000, 6) + ' mW'],
      ['Watt', h.sig(w, 6) + ' W'],
      ['dBW', h.fmt(dbm - 30, 2) + ' dBW'],
      ['50 Ω yükte RMS gerilim', gerilim],
    ];
    return { rows, note: 'P(mW) = 10^(dBm ÷ 10), dBm = 10 × log10(P ÷ 1 mW). Gerilim satırı yalnızca 50 Ω sistemler için geçerlidir.' };
  }
