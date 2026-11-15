// Motor Hacmi (cc) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const cap = h.pos(v.cap, 'Silindir çapı');
    const strok = h.pos(v.strok, 'Strok');
    const n = h.posint(v.silindir, 'Silindir sayısı');
    if (cap > 1500 || strok > 4000) h.err('Çap ve strok milimetre cinsinden girilmeli; değerler olağan dışı büyük görünüyor.');
    if (n > 64) h.err('"Silindir sayısı" en fazla 64 olabilir.');
    const tek = Math.PI / 4 * cap * cap * strok / 1000; // cm³
    const toplam = tek * n;
    const oran = strok / cap;
    let tip;
    if (Math.abs(oran - 1) < 0.005) tip = 'Kare motor (çap = strok)';
    else if (oran < 1) tip = 'Kısa stroklu (çap > strok)';
    else tip = 'Uzun stroklu (strok > çap)';
    const rows = [
      ['Toplam motor hacmi', h.fmt(toplam, 2) + ' cc'],
      ['Litre karşılığı', h.fmt(toplam / 1000, 3) + ' L'],
      ['Silindir başına hacim', h.fmt(tek, 2) + ' cc'],
      ['Strok / çap oranı', h.fmt(oran, 3)],
      ['Motor tipi', tip],
    ];
    if (String(v.yanma ?? '').trim() !== '') {
      const yc = h.pos(v.yanma, 'Yanma odası hacmi');
      rows.push(['Sıkıştırma oranı', h.fmt((tek + yc) / yc, 2) + ' : 1']);
    }
    return { rows, note: 'Hacim = π ÷ 4 × çap² × strok × silindir sayısı. Sonuç geometrik süpürme hacmidir; ruhsattaki değerle birkaç cc fark olabilir.' };
  }
