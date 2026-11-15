// kVA kW Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const pf = h.pos(v.cosfi, 'Güç faktörü');
    if (pf > 1) h.err('"Güç faktörü" 1\'den büyük olamaz; 0 ile 1 arasında bir değer yazın (örn. 0,8).');
    const kva = v.yon === 'kwkva' ? x / pf : x;
    const kw = kva * pf;
    const kvar = kva * Math.sqrt(Math.max(0, 1 - pf * pf));
    const aci = Math.acos(pf) * 180 / Math.PI;
    const rows = v.yon === 'kwkva'
      ? [['Görünür güç', h.fmt(kva, 3) + ' kVA'], ['Aktif güç', h.fmt(kw, 3) + ' kW']]
      : [['Aktif güç', h.fmt(kw, 3) + ' kW'], ['Görünür güç', h.fmt(kva, 3) + ' kVA']];
    rows.push(['Reaktif güç', h.fmt(kvar, 3) + ' kVAR']);
    rows.push(['Faz açısı (φ)', h.fmt(aci, 2) + '°']);
    return { rows, note: 'kW = kVA × cos φ; kVAR = kVA × sin φ. Sonuç bilgilendirme amaçlıdır; jeneratör ve trafo seçimi için uzman görüşü alın.' };
  }
