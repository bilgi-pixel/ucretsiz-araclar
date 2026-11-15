// Vade Tarihi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.date(v.baslangic, 'Başlangıç tarihi');
    const n = h.int(v.sure, 'Vade süresi');
    if (n < 0) h.err('"Vade süresi" negatif olamaz; peşin ödeme için 0 yazın.');
    if (n > 36500) h.err('"Vade süresi" çok büyük; en fazla 36.500 yazabilirsiniz.');
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    let takvim;
    if (v.birim === 'ay') {
      const t = a.getUTCFullYear() * 12 + a.getUTCMonth() + n;
      const y = Math.floor(t / 12), m = t % 12;
      const son = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
      takvim = new Date(Date.UTC(y, m, Math.min(a.getUTCDate(), son)));
    } else {
      takvim = h.gunEkle(a, v.birim === 'hafta' ? n * 7 : n);
    }
    let vade = takvim, duzeltme = 'Yok';
    const g = takvim.getUTCDay(); // 0 Pazar, 6 Cumartesi
    if (g === 0 || g === 6) {
      if (v.kaydir === 'sonraki') {
        const k = g === 6 ? 2 : 1;
        vade = h.gunEkle(takvim, k);
        duzeltme = h.gunAdi(takvim) + ' yerine Pazartesi (+' + k + ' gün)';
      } else if (v.kaydir === 'onceki') {
        const k = g === 6 ? 1 : 2;
        vade = h.gunEkle(takvim, -k);
        duzeltme = h.gunAdi(takvim) + ' yerine Cuma (−' + k + ' gün)';
      } else {
        duzeltme = 'Yapılmadı (vade hafta sonuna denk geliyor)';
      }
    }
    const kalan = h.gunFarki(bugun, vade);
    return {
      rows: [
        ['Vade tarihi', h.fmtDate(vade) + ' ' + h.gunAdi(vade)],
        ['Hafta sonu düzeltmesi', duzeltme],
        ['Başlangıçtan vadeye', h.fmt(h.gunFarki(a, vade), 0) + ' gün'],
        ['Bugüne göre durum', kalan > 0 ? h.fmt(kalan, 0) + ' gün kaldı' : kalan === 0 ? 'Vade günü bugün' : h.fmt(-kalan, 0) + ' gün geçti'],
        ['Başlangıç tarihi', h.fmtDate(a) + ' ' + h.gunAdi(a)],
      ],
      note: 'Başlangıç günü sayılmaz; süre ertesi günden itibaren işler. Resmî tatiller dikkate alınmaz. Bağlayıcı vade için sözleşmenize ve güncel mevzuata bakın.',
    };
  }
