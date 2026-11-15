// Ekonomik Sipariş Miktarı (EOQ) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const D = h.pos(v.talep, 'Yıllık talep');
    const S = h.pos(v.siparis, 'Sipariş başına maliyet');
    const H = h.pos(v.elde, 'Birim başına yıllık elde bulundurma maliyeti');
    const gun = h.opt(v.gun, 365, 'Yıllık çalışma günü');
    if (!(gun > 0) || gun > 366) h.err('"Yıllık çalışma günü" 1 ile 366 arasında olmalı.');
    const Q = Math.sqrt((2 * D * S) / H);
    const n = D / Q;
    const sipMal = n * S;
    const eldeMal = (Q / 2) * H;
    return {
      rows: [
        ['Ekonomik sipariş miktarı', h.fmt(Q, 2) + ' birim'],
        ['Yıllık sipariş sayısı', h.fmt(n, 2)],
        ['Sipariş aralığı', h.fmt(gun / n, 1) + ' gün'],
        ['Yıllık sipariş maliyeti', h.para(sipMal)],
        ['Yıllık elde bulundurma maliyeti', h.para(eldeMal)],
        ['Yıllık toplam stok maliyeti', h.para(sipMal + eldeMal)],
        ['Ortalama stok', h.fmt(Q / 2, 2) + ' birim'],
      ],
      note: 'EOQ = √(2 × yıllık talep × sipariş maliyeti ÷ elde bulundurma maliyeti). Model sabit talep ve sabit maliyet varsayar; emniyet stoğu ve satın alma bedeli toplam maliyete dahil değildir.',
    };
  }
