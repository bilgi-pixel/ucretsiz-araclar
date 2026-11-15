// Yatırımın Geri Ödeme Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = h.pos(v.yatirim, 'Yatırım tutarı');
    const cf = h.nums(v.akislar, 'Yıllık net nakit girişi');
    if (cf.length > 200) h.err('En fazla 200 yıl girebilirsiniz.');
    const isk = String(v.iskonto ?? '').trim() === '' ? null : h.nonneg(v.iskonto, 'Yıllık iskonto oranı');
    const sabit = cf.length === 1;
    if (sabit && !(cf[0] > 0)) h.err('Yıllık net nakit girişi sıfırdan büyük olmalı; aksi halde yatırım geri dönmez.');
    if (!cf.some((x) => x > 0)) h.err('En az bir yılda pozitif nakit girişi olmalı.');
    const sinir = sabit ? 1000 : cf.length;
    const bul = (oran) => {
      let kum = 0;
      // Sabit girişte sonsuz serinin bugünkü değeri giriş ÷ oran'dır; yatırımı aşmıyorsa hiç geri dönmez.
      if (sabit && oran > 0 && cf[0] / oran <= y * (1 + 1e-9)) return { sure: null, kum: cf[0] / oran };
      for (let t = 1; t <= sinir; t++) {
        const a = (sabit ? cf[0] : cf[t - 1]) / Math.pow(1 + oran, t);
        if (a > 0 && kum + a >= y - 1e-9) return { sure: (t - 1) + Math.max(0, y - kum) / a, kum: kum + a };
        kum += a;
      }
      return { sure: null, kum };
    };
    const yaz = (s) => h.fmt(s, 2) + ' yıl';
    const yilAy = (s) => {
      const ay = Math.round(s * 12 - 1e-9);
      const yy = Math.floor(ay / 12), aa = ay % 12;
      return (yy > 0 ? yy + ' yıl' : '') + (yy > 0 && aa > 0 ? ' ' : '') + (aa > 0 || yy === 0 ? aa + ' ay' : '');
    };
    const yok = sabit ? 'Geri dönmüyor' : 'Verilen ' + cf.length + ' yılda geri dönmüyor';
    const rows = [];
    const basit = sabit ? { sure: y / cf[0] } : bul(0);
    if (basit.sure !== null) {
      rows.push(['Geri ödeme süresi', yaz(basit.sure)]);
      rows.push(['Yıl ve ay karşılığı', yilAy(basit.sure)]);
    } else {
      rows.push(['Geri ödeme süresi', yok]);
      rows.push(['Karşılanmayan tutar', h.para(y - basit.kum)]);
    }
    if (!sabit) rows.push(['Toplam nakit girişi', h.para(cf.reduce((s, x) => s + x, 0))]);
    if (isk !== null) {
      const r = isk / 100;
      const d = bul(r);
      if (d.sure !== null) {
        rows.push(['İskontolu geri ödeme süresi', yaz(d.sure)]);
        rows.push(['İskontolu yıl ve ay karşılığı', yilAy(d.sure)]);
      } else {
        rows.push(['İskontolu geri ödeme süresi', sabit && d.kum < y * (1 - 1e-9) && cf[0] / r > y * (1 + 1e-9) ? '1000 yılda geri dönmüyor' : yok]);
        rows.push(['Bugünkü değerle karşılanmayan tutar', h.para(y - d.kum)]);
      }
    }
    return { rows, note: 'Nakit girişlerinin yıl içine eşit yayıldığı varsayılır; kesirli yıl buna göre bulunur. Geri ödeme süresi, süre dolduktan sonraki kazancı ölçmez.' };
  }
