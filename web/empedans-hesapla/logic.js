// Empedans Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const R = dolu(v.direnc) ? h.nonneg(v.direnc, 'Direnç R') : 0;
    const lVar = dolu(v.enduktans), cVar = dolu(v.kapasite);
    if (!dolu(v.direnc) && !lVar && !cVar) h.err('Direnç, endüktans ya da kapasite alanlarından en az birini doldurun.');
    let xl = 0, xc = 0;
    if (lVar || cVar) {
      const f = h.pos(v.frekans, 'Frekans');
      const w = 2 * Math.PI * f;
      if (lVar) xl = w * h.pos(v.enduktans, 'Endüktans L') / 1000;
      if (cVar) xc = 1 / (w * h.pos(v.kapasite, 'Kapasite C') * 1e-6);
    }
    const X = xl - xc;
    const Z = Math.hypot(R, X);
    if (!(Z > 0)) h.err('Empedans sıfır çıktı; direnç ya da reaktans değerlerinden en az biri sıfırdan büyük olmalı.');
    const esik = 1e-9 * Math.max(R, xl, xc, 1e-12);
    const net = Math.abs(X) < esik ? 0 : X;
    const faz = Math.atan2(net, R) * 180 / Math.PI;
    const pf = R / Z;
    const ohm = (x) => h.sig(x, 4) + ' Ω';
    const rows = [
      ['Empedans (Z)', ohm(Z)],
      ['Endüktif reaktans (XL)', ohm(xl)],
      ['Kapasitif reaktans (Xc)', ohm(xc)],
      ['Net reaktans (XL − Xc)', ohm(net)],
      ['Faz açısı (φ)', h.fmt(faz, 2) + '°'],
      ['Güç faktörü (cos φ)', h.fmt(pf, 3)],
      ['Devre karakteri', net > 0 ? 'Endüktif (akım gerilimden geride)' : net < 0 ? 'Kapasitif (akım gerilimin önünde)' : 'Omik (akım ve gerilim aynı fazda)'],
    ];
    if (dolu(v.gerilim)) {
      const V = h.pos(v.gerilim, 'Kaynak gerilimi');
      const I = V / Z;
      rows.push(['Akım', h.sig(I, 4) + ' A']);
      rows.push(['Aktif güç', h.fmt(I * I * R, 2) + ' W']);
      rows.push(['Görünür güç', h.fmt(V * I, 2) + ' VA']);
    }
    return { rows, note: 'Elemanların seri bağlı ve ideal olduğu, işaretin sinüs biçimli olduğu varsayılmıştır. Bobinin tel direncini R değerine ekleyebilirsiniz.' };
  }
