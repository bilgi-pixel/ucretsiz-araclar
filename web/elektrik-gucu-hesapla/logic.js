// Elektrik Gücü (Watt) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const V = h.pos(v.gerilim, 'Gerilim');
    const I = h.pos(v.akim, 'Akım');
    const dc = v.sistem === 'dc';
    const uc = v.sistem === 'uc';
    let pf = 1;
    if (!dc) {
      pf = h.opt(v.cosfi, 1, 'Güç faktörü');
      if (!(pf > 0) || pf > 1) h.err('"Güç faktörü" 0\'dan büyük ve en çok 1 olmalı (örn. 0,85).');
    }
    const S = (uc ? Math.sqrt(3) : 1) * V * I;
    const P = S * pf;
    const rows = [
      ['Aktif güç', h.fmt(P, 2) + ' W'],
      ['Aktif güç (kW)', h.fmt(P / 1000, 4) + ' kW'],
    ];
    if (!dc) {
      const Q = S * Math.sqrt(Math.max(0, 1 - pf * pf));
      rows.push(['Görünür güç', h.fmt(S, 2) + ' VA']);
      rows.push(['Reaktif güç', h.fmt(Q, 2) + ' VAR']);
    }
    if (!bos(v.saat)) {
      const saat = h.pos(v.saat, 'Günlük çalışma süresi');
      if (saat > 24) h.err('"Günlük çalışma süresi" 24 saatten fazla olamaz.');
      const gun = P / 1000 * saat;
      rows.push(['Günlük tüketim', h.fmt(gun, 3) + ' kWh']);
      rows.push(['Aylık tüketim (30 gün)', h.fmt(gun * 30, 2) + ' kWh']);
      if (!bos(v.fiyat)) {
        const f = h.nonneg(v.fiyat, 'Birim fiyat');
        rows.push(['Aylık maliyet (30 gün)', h.para(gun * 30 * f)]);
      }
    } else if (!bos(v.fiyat)) h.err('Maliyet hesabı için "Günlük çalışma süresi" alanını da doldurun.');
    return {
      rows,
      note: dc ? 'Doğru akımda P = V × I.' : uc ? 'Dengeli üç fazlı yük için P = √3 × V(hat) × I(hat) × cos φ.' : 'Tek fazlı alternatif akımda P = V × I × cos φ.',
    };
  }
