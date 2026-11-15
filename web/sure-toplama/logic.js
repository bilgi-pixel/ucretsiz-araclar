// Süre Toplama (Saat Dakika Saniye) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = h.lines(v.sureler);
    if (!satirlar.length) h.err('En az bir süre yazın (örn. 1:30:00). Her satıra bir süre gelmeli.');
    const sd = v.ikili === 'sd';
    let toplam = 0;
    let eklenen = 0;
    let cikan = 0;
    satirlar.forEach((ham, i) => {
      let t = ham.replace(/−/g, '-').replace(/\s+/g, '');
      let isaret = 1;
      if (t.startsWith('-')) { isaret = -1; t = t.slice(1); } else if (t.startsWith('+')) t = t.slice(1);
      if (!/^\d+(:\d+){0,2}$/.test(t)) h.err(`${i + 1}. satır anlaşılamadı: "${ham}". Süreyi 1:30:00 ya da 3:45 biçiminde, yalnızca rakam ve iki nokta ile yazın.`);
      const p = t.split(':').map(Number);
      let sn;
      if (p.length === 3) sn = p[0] * 3600 + p[1] * 60 + p[2];
      else if (p.length === 2) sn = sd ? p[0] * 3600 + p[1] * 60 : p[0] * 60 + p[1];
      else sn = sd ? p[0] * 60 : p[0];
      if (!Number.isSafeInteger(sn)) h.err(`${i + 1}. satırdaki süre çok büyük.`);
      toplam += isaret * sn;
      if (isaret > 0) eklenen++; else cikan++;
    });
    const iki = (n) => String(n).padStart(2, '0');
    const bicim = (sn) => {
      const a = Math.abs(sn);
      return `${sn < 0 ? '-' : ''}${Math.floor(a / 3600)}:${iki(Math.floor((a % 3600) / 60))}:${iki(a % 60)}`;
    };
    const a = Math.abs(toplam);
    const gun = Math.floor(a / 86400);
    const sozle = `${toplam < 0 ? 'eksi ' : ''}${gun ? gun + ' gün ' : ''}${Math.floor((a % 86400) / 3600)} saat ${Math.floor((a % 3600) / 60)} dakika ${a % 60} saniye`;
    const adet = satirlar.length;
    return {
      rows: [
        ['Toplam süre', bicim(toplam)],
        ['Sözle', sozle],
        ['Toplam saniye', `${h.fmt(toplam, 0)} saniye`],
        ['Toplam dakika', `${h.fmt(toplam / 60, 2)} dakika`],
        ['Ondalık saat', `${h.fmt(toplam / 3600, 4)} saat`],
        ['Satır sayısı', cikan ? `${adet} (${eklenen} eklenen, ${cikan} çıkarılan)` : `${adet}`],
        ['Satır başına ortalama', bicim(Math.round(toplam / adet))],
      ],
      note: `İki parçalı yazımlar ${sd ? 'saat:dakika' : 'dakika:saniye'} olarak yorumlandı. Toplam gösterimi saat:dakika:saniye biçimindedir; saat kısmı 24'ü aşabilir.`,
    };
  }
