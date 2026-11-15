// Desibel (dB) Kazanç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let db;
    if (v.mod === 'db') {
      db = h.num(v.db, 'dB değeri');
      if (Math.abs(db) > 400) h.err('dB değeri −400 ile 400 arasında olmalı.');
    } else {
      const g = h.pos(v.giris, 'Giriş değeri');
      const c = h.pos(v.cikis, 'Çıkış değeri');
      db = (v.tur === 'gerilim' ? 20 : 10) * Math.log10(c / g);
    }
    if (Math.abs(db) < 1e-12) db = 0;
    const gucOran = Math.pow(10, db / 10);
    const gerOran = Math.pow(10, db / 20);
    const durum = db > 0 ? 'Kazanç (yükseltme)' : db < 0 ? 'Zayıflama (kayıp)' : 'Değişim yok';
    const dbSatir = ['Kazanç', h.fmt(db, 2) + ' dB'];
    const oranlar = [
      ['Güç oranı', h.sig(gucOran, 6) + ' kat'],
      ['Gerilim (genlik) oranı', h.sig(gerOran, 6) + ' kat'],
    ];
    return {
      rows: v.mod === 'db' ? [...oranlar, dbSatir, ['Durum', durum]] : [dbSatir, ...oranlar, ['Durum', durum]],
      note: 'Güç için dB = 10 × log10(çıkış ÷ giriş), gerilim ve akım için dB = 20 × log10(çıkış ÷ giriş). Gerilim formülü giriş ve çıkış empedansları eşitken güç oranıyla tutarlıdır.',
    };
  }
