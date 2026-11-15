// Çalışma Süresi (Giriş Çıkış) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const saatOku = (s, ad) => {
      const t = String(s ?? '').trim();
      if (t === '') h.err(`"${ad}" alanını doldurun (örn. 08:30).`);
      let m = /^(\d{1,2})(?:\s*[:.,]\s*(\d{1,2}))?$/.exec(t);
      let sa;
      let dk;
      if (m) { sa = +m[1]; dk = m[2] === undefined ? 0 : +m[2]; }
      else if ((m = /^(\d{2})(\d{2})$/.exec(t))) { sa = +m[1]; dk = +m[2]; }
      else h.err(`"${ad}" alanına saati SS:DD biçiminde yazın (örn. 17:45).`);
      if (sa === 24 && dk === 0) return 1440;
      if (sa > 23 || dk > 59) h.err(`"${ad}" geçerli bir saat değil. Saat 00–23, dakika 00–59 arasında olmalı.`);
      return sa * 60 + dk;
    };
    const sure = (dk) => {
      const r = Math.round(dk);
      return `${Math.floor(r / 60)} saat ${r % 60} dakika`;
    };
    const g = saatOku(v.giris, 'Giriş saati');
    const c = saatOku(v.cikis, 'Çıkış saati');
    const mola = h.nonneg(String(v.mola ?? '').trim() === '' ? '0' : v.mola, 'Toplam mola');
    const gunSayisi = String(v.gunSayisi ?? '').trim() === '' ? 1 : h.posint(v.gunSayisi, 'Gün sayısı');
    if (g === c) h.err('Giriş ve çıkış saati aynı. Süre hesaplanabilmesi için farklı saatler yazın.');
    const gece = c < g;
    const brut = gece ? c + 1440 - g : c - g;
    if (mola >= brut) h.err('Mola süresi, giriş ile çıkış arasındaki süreden kısa olmalı.');
    const net = brut - mola;
    const rows = [
      ['Net çalışma süresi', sure(net)],
      ['Ondalık saat', `${h.fmt(net / 60, 2)} saat`],
      ['Brüt süre (mola dahil)', sure(brut)],
      ['Mola', `${h.fmt(mola, 0)} dakika`],
      ['Toplam dakika', `${h.fmt(net, 0)} dakika`],
    ];
    if (gunSayisi > 1) rows.push([`${gunSayisi} günlük toplam`, `${sure(net * gunSayisi)} (${h.fmt((net * gunSayisi) / 60, 2)} saat)`]);
    if (String(v.saatUcret ?? '').trim() !== '') {
      const u = h.nonneg(v.saatUcret, 'Saatlik ücret');
      rows.push(['Günlük tutar', h.para((net / 60) * u)]);
      if (gunSayisi > 1) rows.push([`${gunSayisi} günlük tutar`, h.para((net / 60) * u * gunSayisi)]);
    }
    return {
      rows,
      note: gece
        ? 'Çıkış saati girişten küçük olduğu için vardiyanın ertesi gün bittiği kabul edildi.'
        : 'Giriş ve çıkış aynı gün içinde kabul edildi. Tutar, net süre ile saatlik ücretin çarpımıdır; kesinti ve ek ödemeler dahil değildir.',
    };
  }
