// Yamuk Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.altTaban, 'Alt taban');
    const b = h.pos(v.ustTaban, 'Üst taban');
    const y = h.pos(v.yukseklik, 'Yükseklik');
    const alan = (a + b) * y / 2;
    const rows = [
      ['Alan', h.fmt(alan, 4) + ' birim²'],
      ['Orta taban', h.fmt((a + b) / 2, 4) + ' birim'],
    ];
    let note = 'Alan = (a + b) × h ÷ 2. Sonuç, uzunlukları yazdığınız birimin karesidir.';
    const cDolu = String(v.yanC ?? '').trim() !== '';
    const dDolu = String(v.yanD ?? '').trim() !== '';
    if (cDolu !== dDolu) h.err('Çevre için iki yan kenarı da yazın ya da ikisini de boş bırakın.');
    if (cDolu && dDolu) {
      const c = h.pos(v.yanC, 'Yan kenar c');
      const d = h.pos(v.yanD, 'Yan kenar d');
      const pay = 1e-9 * Math.max(c, d, y);
      if (c < y - pay || d < y - pay) h.err('Yan kenar yükseklikten kısa olamaz; yükseklik iki taban arasındaki en kısa (dik) uzaklıktır.');
      rows.push(['Çevre', h.fmt(a + b + c + d, 4) + ' birim']);
      const x1 = Math.sqrt(Math.max(0, c * c - y * y));
      const x2 = Math.sqrt(Math.max(0, d * d - y * y));
      const fark = Math.abs(a - b);
      const tol = 0.01 * Math.max(a, b, c, d);
      const uyumlu = Math.abs(x1 + x2 - fark) <= tol || Math.abs(Math.abs(x1 - x2) - fark) <= tol;
      if (!uyumlu) note += ' Uyarı: yazdığınız yan kenarlar bu tabanlar ve yükseklikle geometrik olarak tam uyuşmuyor; çevre, girdiğiniz dört kenarın toplamı olarak verilmiştir.';
    }
    if (Math.abs(a - b) <= 1e-12 * Math.max(a, b)) note += ' İki taban eşit olduğundan şekil bir paralelkenardır.';
    return { rows, note };
  }
