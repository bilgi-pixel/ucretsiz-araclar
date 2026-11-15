// 12 Saat 24 Saat Biçimi Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.saat ?? '').trim();
    if (ham === '') h.err('"Saat" alanını doldurun (örn. 3:30 PM ya da 15:30).');
    let t = ham.toLocaleUpperCase('tr-TR').replace(/\s+/g, '').replace(/\.(?=[AP]\.?M|M)/g, '');
    let ek = null;
    const m1 = /(A\.?M\.?|P\.?M\.?|ÖÖ|ÖS)$/.exec(t);
    if (m1) {
      const e = m1[1].replace(/\./g, '');
      ek = e === 'AM' || e === 'ÖÖ' ? 'AM' : 'PM';
      t = t.slice(0, m1.index);
    }
    let m = /^(\d{1,2})(?:[:.](\d{2}))?(?:[:.](\d{2}))?$/.exec(t);
    if (!m && (m = /^(\d{2})(\d{2})$/.exec(t))) m = [m[0], m[1], m[2], undefined];
    if (!m) h.err('Saat anlaşılamadı. 15:30, 3:30 PM, 7 ÖS ya da 15:30:45 gibi yazın.');
    let sa = +m[1];
    const dk = m[2] === undefined ? 0 : +m[2];
    const sn = m[3] === undefined ? null : +m[3];
    if (dk > 59 || (sn !== null && sn > 59)) h.err('Dakika ve saniye 00 ile 59 arasında olmalı.');
    if (ek) {
      if (sa < 1 || sa > 12) h.err('AM/PM ile yazılan saatte saat kısmı 1 ile 12 arasında olmalı. 24 saat biçimi için AM/PM eklemeyin.');
      if (ek === 'AM') sa = sa === 12 ? 0 : sa; else sa = sa === 12 ? 12 : sa + 12;
    } else if (sa > 23) {
      if (sa === 24 && dk === 0 && !sn) sa = 0;
      else h.err('24 saat biçiminde saat kısmı 00 ile 23 arasında olmalı.');
    }
    const iki = (n) => String(n).padStart(2, '0');
    const snEk = sn === null ? '' : ':' + iki(sn);
    const s12 = sa % 12 === 0 ? 12 : sa % 12;
    const pm = sa >= 12;
    const yirmiDort = `${iki(sa)}:${iki(dk)}${snEk}`;
    const onIki = `${s12}:${iki(dk)}${snEk} ${pm ? 'PM' : 'AM'}`;
    const turkce = `${pm ? 'ÖS' : 'ÖÖ'} ${s12}:${iki(dk)}${snEk}`;
    let bolum;
    if (sa === 0 && dk === 0 && !sn) bolum = 'gece yarısı (günün başlangıcı)';
    else if (sa === 12 && dk === 0 && !sn) bolum = 'öğle (tam 12:00)';
    else bolum = pm ? 'öğleden sonra (PM / ÖS)' : 'öğleden önce (AM / ÖÖ)';
    const gecen = sa * 60 + dk;
    const r24 = ['24 saat biçimi', yirmiDort];
    const r12 = ['12 saat biçimi', onIki];
    return {
      rows: [
        ...(ek ? [r24, r12] : [r12, r24]),
        ['Türkçe kısaltmayla', turkce],
        ['Günün yarısı', bolum],
        ['Gece yarısından beri', `${h.fmt(gecen, 0)} dakika`],
        ['Gece yarısına kalan', `${h.fmt(1440 - gecen, 0)} dakika`],
      ],
      note: ek
        ? 'Girdi 12 saat biçiminde (AM/PM) kabul edildi. 12 AM gece yarısı (00:00), 12 PM öğle (12:00) olarak çevrilir.'
        : 'Girdi 24 saat biçiminde kabul edildi. 00:00 gece yarısı 12:00 AM, 12:00 öğle 12:00 PM olarak gösterilir.',
    };
  }
