// Tarihe İş Günü Ekleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bas = h.date(v.baslangic, 'Başlangıç tarihi');
    const n = h.int(v.gun, 'Eklenecek iş günü');
    if (n === 0) h.err('"Eklenecek iş günü" sıfır olamaz; ileri saymak için pozitif, geri saymak için negatif bir tam sayı yazın.');
    if (Math.abs(n) > 10000) h.err('"Eklenecek iş günü" en fazla 10.000 olabilir.');
    const cmt = v.cumartesi === 'evet';
    const tatil = new Set();
    for (const p of String(v.tatiller ?? '').split(/[\s,;]+/).filter(Boolean)) tatil.add(h.date(p, 'Atlanacak tatil günleri').getTime());
    const haftaSonu = (d) => { const g = d.getUTCDay(); return g === 0 || (!cmt && g === 6); };
    const yon = n > 0 ? 1 : -1;
    let d = bas, sayilan = 0, hs = 0, tt = 0;
    while (sayilan < Math.abs(n)) {
      d = h.gunEkle(d, yon);
      if (haftaSonu(d)) hs++;
      else if (tatil.has(d.getTime())) tt++;
      else sayilan++;
    }
    const takvim = Math.abs(h.gunFarki(bas, d));
    return {
      rows: [
        ['Sonuç tarihi', `${h.fmtDate(d)} ${h.gunAdi(d)}`],
        ['Başlangıç', `${h.fmtDate(bas)} ${h.gunAdi(bas)}`],
        ['Geçen takvim günü', `${h.fmt(takvim, 0)} gün`],
        ['Atlanan hafta sonu günü', `${h.fmt(hs, 0)} gün`],
        ['Atlanan tatil günü', `${h.fmt(tt, 0)} gün`],
      ],
      note: `Başlangıç günü sayılmaz; sayım ${yon > 0 ? 'ertesi günden ileriye' : 'bir önceki günden geriye'} doğru yapılır. İş günü olarak pazartesi–${cmt ? 'cumartesi' : 'cuma'} alınmıştır. Yalnızca listeye yazdığınız tatiller atlanır.`,
    };
  }
