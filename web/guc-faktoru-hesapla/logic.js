// Güç Faktörü (Cos φ) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const P = h.pos(v.aktif, 'Aktif güç');
    let S, Q;
    if (v.yontem === 'kvar') {
      Q = h.nonneg(v.ikinci, 'Reaktif güç');
      S = Math.sqrt(P * P + Q * Q);
    } else {
      S = h.pos(v.ikinci, 'Görünür güç');
      if (S < P - 1e-9) h.err('Görünür güç (kVA), aktif güçten (kW) küçük olamaz. Değerleri ve birimleri kontrol edin.');
      Q = Math.sqrt(Math.max(0, S * S - P * P));
    }
    const pf = Math.min(1, P / S);
    const aci = Math.acos(pf) * 180 / Math.PI;
    const tan1 = Q / P;
    const rows = [
      ['Güç faktörü (cos φ)', h.fmt(pf, 4)],
      ['Faz açısı (φ)', h.fmt(aci, 2) + '°'],
      ['Görünür güç', h.fmt(S, 2) + ' kVA'],
      ['Reaktif güç', h.fmt(Q, 2) + ' kVAR'],
      ['tan φ', h.fmt(tan1, 4)],
    ];
    let note = 'cos φ = kW ÷ kVA. Sonuç bilgilendirme amaçlıdır; kompanzasyon panosu tasarımı için elektrik mühendisine danışın.';
    if (String(v.hedef ?? '').trim() !== '') {
      const t = h.pos(v.hedef, 'Hedef cos φ');
      if (t > 1) h.err('"Hedef cos φ" 1\'den büyük olamaz; 0,95 gibi bir değer yazın.');
      const tan2 = Math.sqrt(Math.max(0, 1 - t * t)) / t;
      const qc = Math.max(0, P * (tan1 - tan2));
      rows.push(['Gereken kompanzasyon gücü', h.fmt(qc, 2) + ' kVAR']);
      rows.push(['Kompanzasyon sonrası görünür güç', h.fmt(qc > 0 ? P / t : S, 2) + ' kVA']);
      if (qc === 0) note = 'Mevcut güç faktörü hedef değere eşit ya da ondan yüksek; ek kompanzasyon gerekmiyor. ' + note;
    }
    return { rows, note };
  }
