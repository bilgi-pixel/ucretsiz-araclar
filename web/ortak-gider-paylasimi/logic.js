// Ortak Gider Paylaşımı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = h.lines(v.odemeler);
    if (!satirlar.length) h.err('Her satıra bir ad ve ödediği tutarı yazın (örn. "Ayşe 1200").');
    const kisiler = [];
    const dizin = new Map();
    for (const satir of satirlar) {
      const temiz = satir.replace(/\s*(TL|₺)\s*$/i, '').trim();
      const m = /^(.*?\S)\s*(?:[:=]\s*|\s[-–]\s+|\s+)(\S+)$/.exec(temiz);
      if (!m) h.err(`"${satir}" satırı anlaşılamadı; ad ve tutarı boşlukla ayırarak yazın (örn. "Ayşe 1200").`);
      const ad = m[1].replace(/[\s:=\-–]+$/, '').trim();
      if (!ad || /^[\d.,]+$/.test(ad)) h.err(`"${satir}" satırında ad eksik; önce adı, sonra tutarı yazın.`);
      const tutar = h.nonneg(m[2], `${ad} için tutar`);
      const anahtar = ad.toLocaleLowerCase('tr');
      if (dizin.has(anahtar)) kisiler[dizin.get(anahtar)].kurus += Math.round(tutar * 100);
      else { dizin.set(anahtar, kisiler.length); kisiler.push({ ad, kurus: Math.round(tutar * 100) }); }
    }
    if (kisiler.length < 2) h.err('Paylaşım için en az iki kişi gerekir; ödeme yapmayanları da 0 tutarla ekleyin.');
    if (kisiler.length > 50) h.err('En fazla 50 kişi girilebilir.');
    const toplam = kisiler.reduce((a, k) => a + k.kurus, 0);
    if (toplam === 0) h.err('Toplam gider sıfır; en az bir kişinin ödediği tutarı yazın.');
    const pay = toplam / kisiler.length;
    const tl = (kurus) => h.para(kurus / 100);
    const bakiye = kisiler.map((k) => ({ ad: k.ad, b: Math.round(k.kurus - pay) }));
    const durum = bakiye.map((k) => `${k.ad}: ${k.b > 0 ? tl(k.b) + ' alacaklı' : k.b < 0 ? tl(-k.b) + ' borçlu' : 'denk'}`);
    const alacakli = bakiye.filter((k) => k.b > 0).map((k) => ({ ...k })).sort((a, b) => b.b - a.b);
    const borclu = bakiye.filter((k) => k.b < 0).map((k) => ({ ad: k.ad, b: -k.b })).sort((a, b) => b.b - a.b);
    const transferler = [];
    let i = 0, j = 0;
    while (i < borclu.length && j < alacakli.length) {
      const m = Math.min(borclu[i].b, alacakli[j].b);
      if (m > 0) transferler.push(`${borclu[i].ad} → ${alacakli[j].ad}: ${tl(m)}`);
      borclu[i].b -= m;
      alacakli[j].b -= m;
      if (borclu[i].b === 0) i++;
      if (j < alacakli.length && alacakli[j].b === 0) j++;
    }
    const metin = 'Bakiye durumu:\n' + durum.join('\n') + '\n\nYapılacak ödemeler:\n' + (transferler.length ? transferler.join('\n') : 'Herkes payını ödemiş; ödeme gerekmiyor.');
    return {
      rows: [
        ['Kişi başı pay', tl(pay)],
        ['Toplam gider', tl(toplam)],
        ['Kişi sayısı', String(kisiler.length)],
        ['Gereken ödeme sayısı', String(transferler.length)],
      ],
      text: metin,
      note: 'Gider tüm kişiler arasında eşit paylaştırılmıştır. Pay tam bölünmediğinde bir kuruşluk yuvarlama farkı oluşabilir.',
    };
  }
