// Tarihin Çeyrek Dönemini Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const d = h.date(v.tarih, 'Tarih');
    const s = Number(v.malibas) || 1;
    if (!(s >= 1 && s <= 12)) h.err('Başlangıç ayını listeden seçin.');
    const y = d.getUTCFullYear(), m = d.getUTCMonth() + 1;
    const sira = (m - s + 12) % 12; // mali yılın kaçıncı ayı (0 tabanlı)
    const q = Math.floor(sira / 3) + 1;
    const bas = new Date(Date.UTC(y, m - 1 - (sira % 3), 1));
    const bit = new Date(Date.UTC(bas.getUTCFullYear(), bas.getUTCMonth() + 3, 0));
    const yilBas = new Date(Date.UTC(y, m - 1 - sira, 1));
    const yilBit = new Date(Date.UTC(yilBas.getUTCFullYear(), yilBas.getUTCMonth() + 12, 0));
    const aylar = [0, 1, 2].map((i) => h.ayAdi(((bas.getUTCMonth() + i) % 12) + 1)).join(', ');
    const rows = [
      ['Çeyrek', q + '. çeyrek (Ç' + q + ')'],
      ['Çeyreğin ayları', aylar],
      ['Çeyrek başlangıcı', h.fmtDate(bas)],
      ['Çeyrek bitişi', h.fmtDate(bit)],
      ['Çeyrekteki gün sayısı', (h.gunFarki(bas, bit) + 1) + ' gün'],
      ['Çeyreğin kaçıncı günü', (h.gunFarki(bas, d) + 1) + '. gün'],
      ['Çeyrek sonuna kalan', h.gunFarki(d, bit) + ' gün'],
      ['Yarıyıl', (q <= 2 ? 1 : 2) + '. yarıyıl'],
    ];
    if (s !== 1) rows.push(['Mali yıl', h.fmtDate(yilBas) + ' – ' + h.fmtDate(yilBit)]);
    return {
      rows,
      note: s === 1 ? 'Çeyrekler takvim yılına göre hesaplandı: Ç1 Ocak–Mart, Ç2 Nisan–Haziran, Ç3 Temmuz–Eylül, Ç4 Ekim–Aralık.' : 'Çeyrekler, ' + h.ayAdi(s) + ' ayında başlayan mali yıla göre hesaplandı.',
    };
  }
