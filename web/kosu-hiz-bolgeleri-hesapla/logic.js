// Koşu Hız Bölgeleri Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const km = h.pos(v.mesafe, 'Test mesafesi');
    if (km > 100) h.err('Test mesafesi 100 km\'den büyük olamaz.');
    const t = String(v.sure ?? '').trim();
    if (t === '') h.err('"Test süresi" alanını doldurun (örn. 30:00).');
    let saniye;
    if (t.includes(':')) {
      const p = t.split(':').map((x) => x.trim());
      if (p.length > 3 || p.some((x) => !/^\d+$/.test(x))) h.err('Test süresini dakika:saniye ya da saat:dakika:saniye biçiminde yazın (örn. 30:00 ya da 1:02:30).');
      const n = p.map(Number);
      if (n[n.length - 1] > 59 || (n.length === 3 && n[1] > 59)) h.err('Süredeki dakika ve saniye değerleri 59\'dan büyük olamaz.');
      saniye = n.length === 3 ? n[0] * 3600 + n[1] * 60 + n[2] : n[0] * 60 + n[1];
    } else {
      saniye = h.pos(t, 'Test süresi') * 60;
    }
    if (!(saniye > 0)) h.err('Test süresi sıfırdan büyük olmalı.');
    const esik = saniye / km;
    if (esik < 120 || esik > 900) h.err('Hesaplanan tempo kilometre başına 2:00 ile 15:00 arasında olmalı; mesafe ve süreyi kontrol edin.');
    const tempo = (s) => {
      const r = Math.round(s);
      return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
    };
    const hiz = (s) => h.fmt(3600 / s, 1);
    const aralik = (hizliKat, yavasKat) => `${tempo(esik * hizliKat)}–${tempo(esik * yavasKat)} /km (${hiz(esik * yavasKat)}–${hiz(esik * hizliKat)} km/sa)`;
    return {
      rows: [
        ['Eşik temposu', `${tempo(esik)} /km (${hiz(esik)} km/sa)`],
        ['Bölge 1 – Toparlanma', `${tempo(esik * 1.29)} /km ve daha yavaş (${hiz(esik * 1.29)} km/sa altı)`],
        ['Bölge 2 – Aerobik dayanıklılık', aralik(1.14, 1.29)],
        ['Bölge 3 – Tempo', aralik(1.06, 1.14)],
        ['Bölge 4 – Eşik', aralik(1.0, 1.06)],
        ['Bölge 5 – Interval', aralik(0.9, 1.0)],
      ],
      note: 'Bölgeler eşik temposunun yüzdesine göre belirlenir: %129 ve üzeri, %114–129, %106–114, %100–106, %90–100. Sınırlar kaynağa göre birkaç puan değişebilir; değerler düz zemin içindir.',
    };
  }
