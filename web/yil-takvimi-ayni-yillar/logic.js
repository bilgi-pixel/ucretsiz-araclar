// Takvimi Aynı Olan Yılları Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = h.int(v.yil, 'Yıl');
    if (y < 1583 || y > 9999) h.err('"Yıl" 1583 ile 9999 arasında olmalı (Miladi takvimin kullanıldığı dönem).');
    const adet = h.posint(v.adet, 'Her yönde listelenecek yıl sayısı');
    if (adet > 20) h.err('"Her yönde listelenecek yıl sayısı" en fazla 20 olabilir.');
    const artik = (n) => (n % 4 === 0 && n % 100 !== 0) || n % 400 === 0;
    const ilkGun = (n) => { const d = new Date(Date.UTC(2000, 0, 1)); d.setUTCFullYear(n); return d.getUTCDay(); };
    const gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const a0 = artik(y), g0 = ilkGun(y);
    const ayni = (n) => artik(n) === a0 && ilkGun(n) === g0;
    const sonraki = [], onceki = [];
    for (let n = y + 1; sonraki.length < adet && n <= y + 2000; n++) if (ayni(n)) sonraki.push(n);
    for (let n = y - 1; onceki.length < adet && n >= 1583; n--) if (ayni(n)) onceki.push(n);
    const son = new Date(Date.UTC(2000, 11, 31)); son.setUTCFullYear(y);
    return {
      rows: [
        ['Sonraki aynı takvimli yıl', sonraki.length ? `${sonraki[0]} (${sonraki[0] - y} yıl sonra)` : '—'],
        ['Önceki aynı takvimli yıl', onceki.length ? `${onceki[0]} (${y - onceki[0]} yıl önce)` : '1583 sonrasında yok'],
        ['Yılın yapısı', `${gunler[g0]} günü başlar, ${gunler[son.getUTCDay()]} günü biter; ${a0 ? '366 gün (artık yıl)' : '365 gün (artık yıl değil)'}`],
        ['Sonraki yıllar', sonraki.length ? sonraki.join(', ') : '—'],
        ['Önceki yıllar', onceki.length ? onceki.join(', ') : '1583 sonrasında yok'],
      ],
      note: 'İki yılın takvimi, 1 Ocak aynı güne denk geliyorsa ve ikisi de artık yıl ya da ikisi de normal yıl ise aynıdır. Dinî bayramlar ve Ay takvimine bağlı günler bu eşleşmeye dahil değildir.',
    };
  }
