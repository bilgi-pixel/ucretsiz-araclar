// Yüzme Temposu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const mesafe = h.pos(v.mesafe, 'Yüzülen mesafe');
    const ham = String(v.sure ?? '').trim();
    if (ham === '') h.err('"Süre" alanını doldurun (örn. 30:00).');
    let sn;
    if (ham.includes(':')) {
      const p = ham.split(':').map((x) => x.trim());
      if (p.length > 3 || p.some((x) => !/^\d+([.,]\d+)?$/.test(x))) h.err('Süreyi dk:sn ya da sa:dk:sn biçiminde yazın (örn. 30:00 ya da 1:05:30).');
      const n = p.map((x) => Number(x.replace(',', '.')));
      if (p.length === 2) sn = n[0] * 60 + n[1];
      else sn = n[0] * 3600 + n[1] * 60 + n[2];
      if (n[n.length - 1] >= 60 || (p.length === 3 && n[1] >= 60)) h.err('Dakika ve saniye değerleri 60\'tan küçük olmalı.');
    } else {
      sn = h.pos(ham, 'Süre') * 60;
    }
    if (!(sn > 0)) h.err('"Süre" sıfırdan büyük olmalı.');
    const havuz = v.havuz === '50' ? 50 : 25;
    const tempo = (t) => {
      const t10 = Math.round(t * 10 + 1e-9);
      const m = Math.floor(t10 / 600);
      const k = t10 - m * 600;
      const s = Math.floor(k / 10);
      const d = k % 10;
      return `${m}:${String(s).padStart(2, '0')}${d ? ',' + d : ''}`;
    };
    const uzun = (t) => {
      const s = Math.round(t);
      const sa = Math.floor(s / 3600);
      const dk = Math.floor((s % 3600) / 60);
      const ss = s % 60;
      return sa > 0 ? `${sa}:${String(dk).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${dk}:${String(ss).padStart(2, '0')}`;
    };
    const yuzMetre = (sn / mesafe) * 100;
    const ms = mesafe / sn;
    if (ms > 3) h.err('Bu hız yüzme için gerçekçi değil (saniyede 3 metreden fazla). Mesafe ve süreyi kontrol edin.');
    const boy = mesafe / havuz;
    return {
      rows: [
        ['100 m temposu', tempo(yuzMetre) + ' /100 m'],
        ['Ortalama hız', h.fmt(ms * 3.6, 2) + ' km/sa'],
        ['Hız (metre/saniye)', h.fmt(ms, 3) + ' m/sn'],
        ['Havuz boyu sayısı', h.fmt(boy, 2) + ' boy'],
        ['Boy başına süre', h.fmt(sn / boy, 1) + ' sn'],
        ['Aynı tempoyla 400 m', uzun(yuzMetre * 4)],
        ['Aynı tempoyla 1500 m', uzun(yuzMetre * 15)],
        ['Aynı tempoyla 3800 m', uzun(yuzMetre * 38)],
      ],
      note: 'Tahmini süreler temponun hiç düşmediğini varsayar; uzun mesafede yorgunluk nedeniyle gerçek süre genellikle daha uzundur.',
    };
  }
