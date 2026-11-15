// Saatlik Gün Planı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bas = h.int(v.bas, 'Başlangıç saati'), bit = h.int(v.bit, 'Bitiş saati');
    if (bas < 0 || bas > 23) h.err('Başlangıç saati 0 ile 23 arasında olmalı.');
    if (bit < 1 || bit > 24) h.err('Bitiş saati 1 ile 24 arasında olmalı.');
    if (bit <= bas) h.err('Bitiş saati başlangıç saatinden büyük olmalı (örn. 7 ve 22).');
    const aralik = v.aralik === '60' ? 60 : 30;
    const a5 = v.boyut === 'a5';
    const satir = (bit - bas) * 60 / aralik, enCok = a5 ? 30 : 40;
    if (satir < 4) h.err('Plan en az 4 satır içermeli; saat aralığını genişletin ya da 30 dakikalık satır seçin.');
    if (satir > enCok) h.err(`Bu kâğıda en fazla ${enCok} satır sığar, seçiminiz ${satir} satır tutuyor. Saat aralığını daraltın ya da 60 dakikalık satır seçin.`);
    const tarihli = v.tarihli !== 'hayir';
    const ilk = tarihli ? h.dateOrToday(v.baslangic, 'İlk günün tarihi') : null;
    if (ilk && (ilk.getUTCFullYear() < 1900 || ilk.getUTCFullYear() > 2200)) h.err('Tarih 1900 ile 2200 yılları arasında olmalı.');
    const n = h.posint(v.gun, 'Sayfa (gün) sayısı');
    if (n > 31) h.err('Sayfa sayısı en fazla 31 olabilir.');
    const baslik = (v.baslik || '').trim() || 'Gün Planı';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const iki = (x) => String(x).padStart(2, '0');
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, f(17), { kalin: true }]);
      if (tarihli) {
        const t = h.gunEkle(ilk, i);
        ops.push(['yazi', `${t.getUTCDate()} ${h.ayAdi(t.getUTCMonth() + 1)} ${t.getUTCFullYear()}`, W - m, m + 4 * k, f(11), { hiza: 'sag', kalin: true }]);
        ops.push(['yazi', h.gunAdi(t), W - m, m + 9 * k, f(9), { hiza: 'sag', ton: 0.35 }]);
      } else {
        ops.push(['yazi', 'Tarih:', W - m - 38 * k, m + 7 * k, f(9), { hiza: 'sag', ton: 0.35 }]);
        ops.push(['cizgi', W - m - 36 * k, m + 7.6 * k, W - m, m + 7.6 * k, { kalinlik: 0.25, ton: 0.5 }]);
      }
      ops.push(['cizgi', m, m + 12 * k, W - m, m + 12 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 16 * k, alt = H - m, bosluk = 4 * k, tw = W - 2 * m;
      const sw = tw * 0.6, yx = m + sw + bosluk, yw = tw - sw - bosluk, saatW = 13 * k;
      const rh = (alt - ust) / satir;
      // Saat çizelgesi
      ops.push(['kutu', m, ust, saatW, alt - ust, { dolgu: 0.94, cizgi: 0.5 }]);
      ops.push(['kutu', m, ust, sw, alt - ust, { cizgi: 0.5 }]);
      for (let r = 0; r < satir; r++) {
        const dk = bas * 60 + r * aralik, tam = dk % 60 === 0, y = ust + r * rh;
        if (r > 0) ops.push(['cizgi', tam ? m : m + saatW, y, m + sw, y, tam ? { kalinlik: 0.3, ton: 0.45 } : { kalinlik: 0.2, ton: 0.7, kesik: true }]);
        const yy = y + Math.min(rh * 0.5 + 1.2 * k, 5.5 * k);
        if (tam) ops.push(['yazi', `${iki(dk / 60)}.00`, m + saatW - 1.8 * k, yy, f(8.5), { kalin: true, hiza: 'sag' }]);
        else ops.push(['yazi', `.${iki(dk % 60)}`, m + saatW - 1.8 * k, yy, f(7), { hiza: 'sag', ton: 0.5 }]);
      }
      // Yan sütun
      const bolum = (y, yuk, ad) => {
        ops.push(['kutu', yx, y, yw, yuk, { cizgi: 0.5 }]);
        ops.push(['kutu', yx, y, yw, 7 * k, { dolgu: 0.92, cizgi: 0.5 }]);
        ops.push(['yazi', ad, yx + 2 * k, y + 5 * k, f(8.5), { kalin: true }]);
        return y + 7 * k;
      };
      const sat = 8 * k, onYuk = 7 * k + 3 * sat + 3 * k, notYuk = 7 * k + 6 * sat + 3 * k;
      let y = bolum(ust, onYuk, 'Bugünün öncelikleri');
      for (let j = 0; j < 3; j++) {
        ops.push(['yazi', `${j + 1}.`, yx + 2.5 * k, y + (j + 1) * sat - 1 * k, f(10), { kalin: true, ton: 0.3 }]);
        ops.push(['cizgi', yx + 8 * k, y + (j + 1) * sat, yx + yw - 2.5 * k, y + (j + 1) * sat, { kalinlik: 0.2, ton: 0.7 }]);
      }
      const yapY = ust + onYuk + bosluk, yapYuk = alt - notYuk - bosluk - yapY;
      y = bolum(yapY, yapYuk, 'Saati olmayan işler');
      for (let yy = y + sat; yy < yapY + yapYuk - 2 * k; yy += sat) {
        ops.push(['kutu', yx + 2.5 * k, yy - 4 * k, 3.6 * k, 3.6 * k, { cizgi: 0.4 }]);
        ops.push(['cizgi', yx + 8 * k, yy, yx + yw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.7 }]);
      }
      y = bolum(alt - notYuk, notYuk, 'Notlar');
      for (let yy = y + sat; yy < alt - 2 * k; yy += sat) ops.push(['cizgi', yx + 2.5 * k, yy, yx + yw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      sayfalar.push(ops);
    }
    const rows = [
      ['Sayfa sayısı', `${n} sayfa`],
      ['Saat aralığı', `${iki(bas)}.00 – ${iki(bit)}.00`],
      ['Satır sayısı', `${satir} satır (${aralik} dakikalık)`],
      ['Planlanan süre', `${bit - bas} saat`],
    ];
    if (tarihli) {
      const son = h.gunEkle(ilk, n - 1);
      rows.push(['İlk gün', `${h.fmtDate(ilk)} ${h.gunAdi(ilk)}`], ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`]);
    } else rows.push(['Tarih', 'Elle yazılacak']);
    rows.push(['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)']);
    return {
      rows,
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'saatlik-gun-plani', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
