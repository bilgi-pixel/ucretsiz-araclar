// Koli Sığdırma (Palet ve Konteyner) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const l = h.pos(v.koliBoy, 'Koli boyu');
    const w = h.pos(v.koliEn, 'Koli eni');
    const k = h.pos(v.koliYuk, 'Koli yüksekliği');
    const hazir = { k20: [589, 235, 239], k40: [1203, 235, 239], k40hc: [1203, 235, 269] };
    let L, W, H;
    if (hazir[v.alan]) [L, W, H] = hazir[v.alan];
    else {
      if (v.alan === 'ozel') { L = h.pos(v.alanBoy, 'Özel alan boyu'); W = h.pos(v.alanEn, 'Özel alan eni'); }
      else if (v.alan === 'standart') { L = 120; W = 100; }
      else { L = 120; W = 80; }
      H = h.pos(v.alanYuk, 'Yükleme yüksekliği');
    }
    let yonler;
    if (v.dondur === 'yok') yonler = [[l, w, k]];
    else if (v.dondur === 'her') yonler = [[l, w, k], [w, l, k], [l, k, w], [k, l, w], [w, k, l], [k, w, l]];
    else yonler = [[l, w, k], [w, l, k]];
    let en = null;
    for (const [a, b, c] of yonler) {
      const nx = Math.floor(L / a + 1e-9), ny = Math.floor(W / b + 1e-9), nz = Math.floor(H / c + 1e-9);
      const adet = nx * ny * nz;
      if (!en || adet > en.adet) en = { adet, nx, ny, nz, a, b, c };
    }
    if (!en || en.adet < 1) h.err('Koli bu alana sığmıyor. Ölçüleri santimetre olarak girdiğinizden emin olun ya da döndürme seçeneğini değiştirin.');
    if (en.adet > 1e7) h.err('Sonuç 10 milyon koliyi aşıyor; ölçüleri kontrol edin.');
    const doluluk = en.adet * l * w * k / (L * W * H) * 100;
    const taban = en.nx * en.ny * en.a * en.b / (L * W) * 100;
    return {
      rows: [
        ['Sığan koli sayısı', h.fmt(en.adet, 0) + ' koli'],
        ['Yerleşim (boy × en × kat)', en.nx + ' × ' + en.ny + ' × ' + en.nz],
        ['Kat başına koli', h.fmt(en.nx * en.ny, 0) + ' koli'],
        ['Kat sayısı', h.fmt(en.nz, 0) + ' kat'],
        ['Koli yönü (boy × en × yükseklik)', h.fmt(en.a, 1) + ' × ' + h.fmt(en.b, 1) + ' × ' + h.fmt(en.c, 1) + ' cm'],
        ['Yük yüksekliği', h.fmt(en.nz * en.c, 1) + ' cm'],
        ['Taban doluluğu', '%' + h.fmt(taban, 1)],
        ['Hacim doluluğu', '%' + h.fmt(doluluk, 2)],
        ['Toplam koli hacmi', h.fmt(en.adet * l * w * k / 1e6, 2) + ' m³'],
      ],
      note: 'Tüm koliler aynı yönde, düzgün sıralar hâlinde dizilir. Karışık (örgülü) dizilimle bazen birkaç koli daha sığabilir; ağırlık sınırı ayrıca kontrol edilmelidir.',
    };
  }
