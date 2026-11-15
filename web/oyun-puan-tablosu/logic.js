// Oyun Puan Tablosu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = h.lines(v.puanlar);
    if (!satirlar.length) h.err('En az bir oyuncu yazın. Biçim: "Ali: 10 20 30" (her satıra bir oyuncu).');
    if (satirlar.length > 50) h.err('En fazla 50 oyuncu girebilirsiniz.');
    const oyuncular = [];
    const adlar = new Set();
    for (const [no, satir] of satirlar.entries()) {
      let ad, kalan;
      const iki = satir.indexOf(':');
      if (iki >= 0) { ad = satir.slice(0, iki).trim(); kalan = satir.slice(iki + 1); }
      else {
        const m = /^(.*?)\s+([-+−]?[\d.,]+(?:[\s;]+[-+−]?[\d.,]+)*)\s*$/.exec(satir);
        if (!m) h.err(`${no + 1}. satır anlaşılamadı: "${satir}". Biçim: "Ad: 10 20 30".`);
        ad = m[1].trim(); kalan = m[2];
      }
      if (!ad) h.err(`${no + 1}. satırda oyuncu adı eksik. Biçim: "Ad: 10 20 30".`);
      const parcalar = kalan.replace(/,\s+/g, ' ').split(/[\s;]+/).filter(Boolean);
      if (!parcalar.length) h.err(`"${ad}" için en az bir puan yazın (örn. ${ad}: 10 20).`);
      const puanlar = parcalar.map((p) => {
        const t = p.replace(/−/g, '-');
        if ((t.match(/[.,]/g) || []).length > 1 || !/^[-+]?(\d+[.,]?\d*|[.,]\d+)$/.test(t)) h.err(`"${ad}" satırındaki "${p}" puanı anlaşılamadı. Puanları boşlukla ayırın (örn. 10 20 -5).`);
        return Number(t.replace(',', '.'));
      });
      const anahtar = ad.toLocaleLowerCase('tr-TR');
      if (adlar.has(anahtar)) h.err(`"${ad}" adı birden fazla satırda geçiyor; her oyuncuyu tek satıra yazın.`);
      adlar.add(anahtar);
      const toplam = puanlar.reduce((a, b) => a + b, 0);
      oyuncular.push({ ad, tur: puanlar.length, toplam: Math.round(toplam * 1e6) / 1e6 });
    }
    const dusuk = v.yon === 'dusuk';
    const sirali = oyuncular.map((o, i) => ({ ...o, i })).sort((a, b) => (dusuk ? a.toplam - b.toplam : b.toplam - a.toplam) || a.i - b.i);
    let sira = 0;
    sirali.forEach((o, k) => { if (k === 0 || o.toplam !== sirali[k - 1].toplam) sira = k + 1; o.sira = sira; });
    const en = sirali[0].toplam;
    const liderler = sirali.filter((o) => o.toplam === en);
    const enTur = Math.max(...oyuncular.map((o) => o.tur));
    const esitTur = oyuncular.every((o) => o.tur === enTur);
    const genel = oyuncular.reduce((a, o) => a + o.toplam, 0);
    const text = sirali.map((o) => {
      const fark = Math.abs(o.toplam - en);
      return `${o.sira}. ${o.ad} — ${h.fmt(o.toplam, 2)} puan (${o.tur} tur, ortalama ${h.fmt(o.toplam / o.tur, 2)}${fark > 0 ? `, liderden ${h.fmt(fark, 2)} ${dusuk ? 'fazla' : 'geride'}` : ''})`;
    }).join('\n');
    return {
      rows: [
        ['Lider', liderler.length > 1 ? `${liderler.map((o) => o.ad).join(', ')} (berabere, ${h.fmt(en, 2)} puan)` : `${liderler[0].ad} (${h.fmt(en, 2)} puan)`],
        ['Oyuncu sayısı', String(oyuncular.length)],
        ['Tur sayısı', esitTur ? String(enTur) : `${enTur} (oyuncuların tur sayıları farklı)`],
        ['İlk ile son arasındaki fark', h.fmt(Math.abs(sirali[sirali.length - 1].toplam - en), 2) + ' puan'],
        ['Tüm puanların toplamı', h.fmt(genel, 2)],
      ],
      text,
      note: esitTur ? '' : 'Bazı oyuncuların tur sayısı diğerlerinden farklı; eksik ya da fazla yazılmış bir puan olup olmadığını kontrol edin.',
    };
  }
