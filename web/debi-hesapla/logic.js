// Debi (Akış Hızı) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alanBul = () => {
      const d = h.pos(v.cap, 'Boru iç çapı') / 1000;
      return Math.PI * d * d / 4;
    };
    const debiSatirlari = (Q) => [
      ['Debi', h.fmt(Q * 60000, 2) + ' L/dk'],
      ['Litre/saniye', h.fmt(Q * 1000, 3) + ' L/s'],
      ['Metreküp/saat', h.fmt(Q * 3600, 3) + ' m³/saat'],
      ['Metreküp/saniye', h.sig(Q) + ' m³/s'],
    ];
    const dolum = (Q) => {
      const sn = 1 / Q;
      if (sn < 120) return h.fmt(sn, 1) + ' saniye';
      if (sn < 7200) return h.fmt(sn / 60, 1) + ' dakika';
      return h.fmt(sn / 3600, 2) + ' saat';
    };
    if (v.mod === 'hacim') {
      const V = h.pos(v.hacim, 'Hacim');
      const t = h.pos(v.sure, 'Süre');
      const Q = V / 1000 / t;
      return {
        rows: [...debiSatirlari(Q), ['1 m³ (1000 L) dolum süresi', dolum(Q)]],
        note: 'Ölçüm süresince akışın sabit olduğu varsayılır; sonuç ortalama debidir.',
      };
    }
    if (v.mod === 'hiz') {
      const A = alanBul();
      const Q = h.pos(v.debi, 'Debi') / 60000;
      const hiz = Q / A;
      return {
        rows: [
          ['Akış hızı', h.fmt(hiz, 3) + ' m/s'],
          ['Kesit alanı', h.fmt(A * 1e4, 3) + ' cm²'],
          ['Litre/saniye', h.fmt(Q * 1000, 3) + ' L/s'],
          ['Metreküp/saat', h.fmt(Q * 3600, 3) + ' m³/saat'],
        ],
        note: 'Hız, boru kesitindeki ortalama hızdır. Borunun tam dolu aktığı varsayılır.',
      };
    }
    const A = alanBul();
    const hiz = h.pos(v.hiz, 'Akış hızı');
    const Q = A * hiz;
    return {
      rows: [...debiSatirlari(Q), ['Kesit alanı', h.fmt(A * 1e4, 3) + ' cm²'], ['1 m³ (1000 L) dolum süresi', dolum(Q)]],
      note: 'Borunun tam dolu aktığı ve girilen hızın kesit ortalaması olduğu varsayılır.',
    };
  }
