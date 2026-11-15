// Tempo Çevirici (dk/km – dk/mil) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const MIL_KM = 1.609344; // uluslararası kara mili (tam tanım)
    const t = String(v.tempo ?? '').trim();
    if (t === '') h.err('"Tempo" alanını doldurun (örn. 5:30).');
    let sn;
    const m = /^(\d{1,3})\s*[:.]\s*(\d{2})$/.exec(t);
    if (m && t.includes(':')) {
      const dk = Number(m[1]), s = Number(m[2]);
      if (s >= 60) h.err('Saniye kısmı 0 ile 59 arasında olmalı (örn. 5:30).');
      sn = dk * 60 + s;
    } else if (t.includes(':')) {
      h.err('Tempoyu dakika:saniye biçiminde yazın (örn. 5:30 ya da 4:05).');
    } else {
      sn = h.num(t, 'Tempo') * 60;
    }
    if (!(sn > 0)) h.err('Tempo sıfırdan büyük olmalı.');
    if (sn > 3600) h.err('Tempo en fazla 60 dakika olabilir; değeri dakika:saniye olarak yazdığınızdan emin olun.');
    const snKm = v.yon === 'mil' ? sn / MIL_KM : sn;
    const snMil = snKm * MIL_KM;
    // Saniyeyi en yakın tam saniyeye yuvarlayıp d:ss ya da s:dd:ss olarak yazar.
    const sure = (x) => {
      const top = Math.round(x);
      const sa = Math.floor(top / 3600), dk = Math.floor((top % 3600) / 60), s = top % 60;
      const iki = (n) => String(n).padStart(2, '0');
      return sa > 0 ? `${sa}:${iki(dk)}:${iki(s)}` : `${dk}:${iki(s)}`;
    };
    const kmSatir = ['Tempo (dk/km)', sure(snKm) + ' dk/km'];
    const milSatir = ['Tempo (dk/mil)', sure(snMil) + ' dk/mil'];
    const kmh = 3600 / snKm;
    return {
      rows: [
        v.yon === 'mil' ? kmSatir : milSatir,
        v.yon === 'mil' ? milSatir : kmSatir,
        ['Hız (km/sa)', h.fmt(kmh, 2) + ' km/sa'],
        ['Hız (mil/sa)', h.fmt(kmh / MIL_KM, 2) + ' mil/sa'],
        ['5 km süresi', sure(snKm * 5)],
        ['10 km süresi', sure(snKm * 10)],
        ['Yarı maraton (21,0975 km)', sure(snKm * 21.0975)],
        ['Maraton (42,195 km)', sure(snKm * 42.195)],
      ],
      note: '1 mil = 1,609344 km. Süreler en yakın saniyeye yuvarlanır ve tempo baştan sona sabit tutulduğu varsayılır.',
    };
  }
