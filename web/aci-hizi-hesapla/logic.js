// Açısal Hız Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const ikiPi = 2 * Math.PI;
    let w;
    let r = null;
    if (v.mod === 'cizgisel') {
      const hiz = h.pos(v.deger, 'Çizgisel hız');
      r = h.pos(v.yaricap, 'Yarıçap');
      w = hiz / r;
    } else {
      if (v.mod === 'frekans') w = ikiPi * h.pos(v.deger, 'Frekans');
      else if (v.mod === 'periyot') w = ikiPi / h.pos(v.deger, 'Periyot');
      else if (v.mod === 'aci') {
        const aci = h.pos(v.deger, 'Taranan açı');
        if (!dolu(v.sure)) h.err('Taranan açıdan hesap için "Süre" alanını da doldurun.');
        w = (aci * Math.PI / 180) / h.pos(v.sure, 'Süre');
      } else w = h.pos(v.deger, 'Devir sayısı') * ikiPi / 60;
      if (dolu(v.yaricap)) r = h.pos(v.yaricap, 'Yarıçap');
    }
    const f = w / ikiPi;
    const rows = [
      ['Açısal hız', h.sig(w) + ' rad/s'],
      ['Derece/saniye', h.sig(w * 180 / Math.PI) + ' °/s'],
      ['Devir/dakika', h.sig(f * 60) + ' dev/dk'],
      ['Frekans', h.sig(f) + ' Hz'],
      ['Periyot', h.sig(1 / f) + ' s'],
    ];
    if (r !== null) {
      rows.push(['Çizgisel hız', h.sig(w * r) + ' m/s']);
      rows.push(['Çizgisel hız (km/saat)', h.sig(w * r * 3.6) + ' km/saat']);
      rows.push(['Merkezcil ivme', h.sig(w * w * r) + ' m/s²']);
    }
    return {
      rows,
      note: 'Dönmenin düzgün (sabit hızlı) olduğu varsayılır. Taranan açıdan yapılan hesap ortalama açısal hızı verir.',
    };
  }
