// Koşu Temposu (Pace) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const km = h.pos(v.mesafe, 'Mesafe');
    if (km > 1000) h.err('Mesafe 1.000 km\'den büyük olamaz.');
    const ham = String(v.sure ?? '').trim();
    if (ham === '') h.err('"Süre" alanını doldurun (örn. 50:00).');
    let sn;
    if (ham.includes(':')) {
      const p = ham.split(':').map((x) => x.trim());
      if (p.length > 3 || p.some((x) => !/^\d+([.,]\d+)?$/.test(x))) h.err('Süreyi saat:dakika:saniye ya da dakika:saniye biçiminde yazın (örn. 1:45:30).');
      const n = p.map((x) => Number(x.replace(',', '.')));
      if (p.length === 3) {
        if (n[1] >= 60 || n[2] >= 60) h.err('Dakika ve saniye 60\'tan küçük olmalı.');
        sn = n[0] * 3600 + n[1] * 60 + n[2];
      } else {
        if (n[1] >= 60) h.err('Saniye 60\'tan küçük olmalı.');
        sn = n[0] * 60 + n[1];
      }
    } else {
      sn = h.pos(ham, 'Süre') * 60;
    }
    if (!(sn > 0)) h.err('Süre sıfırdan büyük olmalı.');
    const tempo = sn / km; // sn/km
    if (tempo < 120) h.err('Tempo 2:00 dk/km\'den hızlı çıkıyor. Mesafe ve süreyi kontrol edin.');
    if (tempo > 1800) h.err('Tempo 30:00 dk/km\'den yavaş çıkıyor. Mesafe ve süreyi kontrol edin.');
    const bicim = (s) => {
      const t = Math.round(s + 1e-6);
      const sa = Math.floor(t / 3600), d = Math.floor((t % 3600) / 60), ss = t % 60;
      return sa > 0 ? `${sa}:${String(d).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${d}:${String(ss).padStart(2, '0')}`;
    };
    return {
      rows: [
        ['Tempo', bicim(tempo) + ' dk/km'],
        ['Hız', h.fmt(3600 / tempo, 2) + ' km/sa'],
        ['Mil temposu', bicim(tempo * 1.609344) + ' dk/mil'],
        ['400 m tur süresi', bicim(tempo * 0.4)],
        ['5 km süresi', bicim(tempo * 5)],
        ['10 km süresi', bicim(tempo * 10)],
        ['Yarı maraton süresi', bicim(tempo * 21.0975)],
        ['Maraton süresi', bicim(tempo * 42.195)],
      ],
      note: 'Yarış süreleri aynı tempoyu sonuna kadar koruduğunuz varsayımıyla hesaplanır; yorgunluk hesaba katılmaz.',
    };
  }
