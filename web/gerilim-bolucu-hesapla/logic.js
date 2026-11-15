// Gerilim Bölücü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carpan = Number(v.birim) || 1;
    const u = h.pos(v.giris, 'Giriş gerilimi');
    const r1 = h.pos(v.r1, 'R1') * carpan;
    const r2 = h.pos(v.r2, 'R2') * carpan;
    const oran = r2 / (r1 + r2);
    const cikis = u * oran;
    const akim = u / (r1 + r2);
    const rows = [
      ['Çıkış gerilimi', h.fmt(cikis, 4) + ' V'],
      ['Bölme oranı', h.fmt(oran, 4)],
      ['R1 üzerindeki gerilim', h.fmt(u - cikis, 4) + ' V'],
      ['Bölücü akımı', h.fmt(akim * 1000, 4) + ' mA'],
      ['R1 gücü', h.fmt(akim * akim * r1 * 1000, 3) + ' mW'],
      ['R2 gücü', h.fmt(akim * akim * r2 * 1000, 3) + ' mW'],
    ];
    const yukHam = h.opt(v.yuk, null, 'Yük direnci');
    if (yukHam !== null) {
      if (!(yukHam > 0)) h.err('"Yük direnci" sıfırdan büyük olmalı; yük yoksa alanı boş bırakın.');
      const rl = yukHam * carpan;
      const alt = (r2 * rl) / (r2 + rl);
      const yuklu = (u * alt) / (r1 + alt);
      rows.push(['Yüklü çıkış gerilimi', h.fmt(yuklu, 4) + ' V']);
      rows.push(['Yük nedeniyle düşüş', '%' + h.fmt(((cikis - yuklu) / cikis) * 100, 2)]);
      rows.push(['Yük akımı', h.fmt((yuklu / rl) * 1000, 4) + ' mA']);
    }
    return { rows, note: 'Çıkış, R2 üzerinden (R1 ile R2\'nin birleştiği nokta ile şase arasından) alınır. Dirençler ideal kabul edilmiştir.' };
  }
