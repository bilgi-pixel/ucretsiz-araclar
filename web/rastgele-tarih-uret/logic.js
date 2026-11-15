// Rastgele Tarih Üretme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.date(v.baslangic, 'Başlangıç tarihi');
    const b = h.date(v.bitis, 'Bitiş tarihi');
    if (b.getTime() < a.getTime()) h.err('Bitiş tarihi başlangıç tarihinden önce olamaz; tarihleri kontrol edin.');
    const adet = h.posint(v.adet, 'Kaç tarih üretilsin?');
    if (adet > 1000) h.err('Tek seferde en fazla 1000 tarih üretilebilir.');
    const toplamGun = h.gunFarki(a, b) + 1;
    if (toplamGun > 1500000) h.err('Tarih aralığı çok geniş; daha dar bir aralık seçin.');
    const uygunMu = (d) => {
      const g = d.getUTCDay();
      if (v.gunler === 'haftaici') return g >= 1 && g <= 5;
      if (v.gunler === 'haftasonu') return g === 0 || g === 6;
      return true;
    };
    // Uygun gün sayısı: tam haftalar + artan günler
    const sayUygun = () => {
      if (v.gunler !== 'haftaici' && v.gunler !== 'haftasonu') return toplamGun;
      const tamHafta = Math.floor(toplamGun / 7);
      let n = tamHafta * (v.gunler === 'haftaici' ? 5 : 2);
      for (let i = tamHafta * 7; i < toplamGun; i++) if (uygunMu(h.gunEkle(a, i))) n++;
      return n;
    };
    const uygun = sayUygun();
    if (uygun === 0) h.err('Seçtiğiniz aralıkta bu filtreye uyan gün yok; aralığı genişletin ya da gün filtresini değiştirin.');
    if (v.tekrar === 'hayir' && adet > uygun) h.err(`Bu aralıkta filtreye uyan yalnızca ${uygun} gün var; tekrarsız ${adet} tarih üretilemez. Adedi azaltın ya da tekrara izin verin.`);
    const rastgele = (n) => {
      // 0..n-1 arasında yansız tam sayı (reddetme örneklemesi)
      const sinir = Math.floor(4294967296 / n) * n;
      const buf = new Uint32Array(1);
      for (;;) {
        if (globalThis.crypto && globalThis.crypto.getRandomValues) globalThis.crypto.getRandomValues(buf);
        else buf[0] = Math.floor(Math.random() * 4294967296);
        if (buf[0] < sinir) return buf[0] % n;
      }
    };
    const secilen = [];
    const gorulen = new Set();
    let deneme = 0;
    while (secilen.length < adet) {
      if (++deneme > 5000000) h.err('Üretim tamamlanamadı; adedi azaltıp yeniden deneyin.');
      const i = rastgele(toplamGun);
      const d = h.gunEkle(a, i);
      if (!uygunMu(d)) continue;
      if (v.tekrar === 'hayir') { if (gorulen.has(i)) continue; gorulen.add(i); }
      secilen.push(d);
    }
    if (v.sira === 'artan') secilen.sort((x, y) => x.getTime() - y.getTime());
    else if (v.sira === 'azalan') secilen.sort((x, y) => y.getTime() - x.getTime());
    const yaz = (d) => {
      if (v.bicim === 'iso') return `${String(d.getUTCFullYear()).padStart(4, '0')}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      if (v.bicim === 'uzun') return `${d.getUTCDate()} ${h.ayAdi(d.getUTCMonth() + 1)} ${d.getUTCFullYear()} ${h.gunAdi(d)}`;
      return h.fmtDate(d);
    };
    return {
      rows: [
        ['Üretilen tarih sayısı', String(secilen.length)],
        ['Aralıktaki gün sayısı', h.fmt(toplamGun, 0)],
        ['Filtreye uyan gün sayısı', h.fmt(uygun, 0)],
        ['Aralık', `${h.fmtDate(a)} – ${h.fmtDate(b)}`],
      ],
      text: secilen.map(yaz).join('\n'),
      note: 'Başlangıç ve bitiş günleri aralığa dahildir. Her uygun günün seçilme olasılığı eşittir.',
    };
  }
