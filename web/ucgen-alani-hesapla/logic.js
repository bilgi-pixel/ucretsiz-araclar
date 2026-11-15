// Üçgen Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    if (v.yontem === 'heron') {
      const a = h.pos(v.kenarA, 'a kenarı');
      const b = h.pos(v.kenarB, 'b kenarı');
      const c = h.pos(v.kenarC, 'c kenarı');
      const enBuyuk = Math.max(a, b, c);
      if (a + b + c - enBuyuk <= enBuyuk * (1 + 1e-12)) h.err('Bu üç uzunluk üçgen oluşturmaz: en uzun kenar, diğer iki kenarın toplamından kısa olmalı.');
      const s = (a + b + c) / 2;
      const alan = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      return {
        rows: [
          ['Alan', h.fmt(alan, 4) + ' birim²'],
          ['Çevre', h.fmt(a + b + c, 4) + ' birim'],
          ['Yarı çevre (s)', h.fmt(s, 4) + ' birim'],
          ['a kenarına ait yükseklik', h.fmt(2 * alan / a, 4) + ' birim'],
        ],
        note: 'Heron formülü: Alan = √(s·(s−a)·(s−b)·(s−c)), s = (a+b+c)/2. Sonuç, kenarları yazdığınız birimin karesidir.',
      };
    }
    if (v.yontem === 'sas') {
      const a = h.pos(v.kenarA, 'a kenarı');
      const b = h.pos(v.kenarB, 'b kenarı');
      const aci = h.pos(v.aci, 'Açı');
      if (aci >= 180) h.err('Üçgenin bir açısı 180 dereceden küçük olmalı; 0 ile 180 arasında bir açı yazın.');
      const rad = aci * Math.PI / 180;
      const alan = 0.5 * a * b * Math.sin(rad);
      const c = Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * Math.cos(rad)));
      return {
        rows: [
          ['Alan', h.fmt(alan, 4) + ' birim²'],
          ['Üçüncü kenar (c)', h.fmt(c, 4) + ' birim'],
          ['Çevre', h.fmt(a + b + c, 4) + ' birim'],
          ['a kenarına ait yükseklik', h.fmt(2 * alan / a, 4) + ' birim'],
        ],
        note: 'Alan = ½·a·b·sin(C). Üçüncü kenar kosinüs teoremiyle bulunur.',
      };
    }
    const t = h.pos(v.taban, 'Taban');
    const y = h.pos(v.yukseklik, 'Yükseklik');
    return {
      rows: [
        ['Alan', h.fmt(t * y / 2, 4) + ' birim²'],
        ['Aynı taban ve yükseklikteki dikdörtgenin alanı', h.fmt(t * y, 4) + ' birim²'],
      ],
      note: 'Alan = taban × yükseklik ÷ 2. Sonuç, uzunlukları yazdığınız birimin karesidir (cm yazdıysanız cm²).',
    };
  }
