// Bobin Endüktansı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const N = h.pos(v.sarim, 'Sarım sayısı');
    const d = h.pos(v.cap, 'Bobin çapı');
    const l = h.pos(v.uzunluk, 'Sarım uzunluğu');
    const mur = h.opt(v.mur, 1, 'Nüvenin bağıl geçirgenliği');
    if (!(mur >= 1)) h.err('"Nüvenin bağıl geçirgenliği" en az 1 olmalı (hava için 1).');
    const bicim = (H) => {
      const a = Math.abs(H);
      if (a < 1e-6) return h.sig(H * 1e9, 4) + ' nH';
      if (a < 1e-3) return h.sig(H * 1e6, 4) + ' µH';
      if (a < 1) return h.sig(H * 1e3, 4) + ' mH';
      return h.sig(H, 4) + ' H';
    };
    const mu0 = 4e-7 * Math.PI;
    const r = d / 2000;
    const A = Math.PI * r * r;
    const L = mu0 * mur * N * N * A / (l / 1000);
    const rows = [['Endüktans (uzun solenoid formülü)', bicim(L)]];
    if (mur === 1) {
      const ri = d / 2 / 25.4;
      const li = l / 25.4;
      rows.push(['Endüktans (Wheeler, hava nüveli)', bicim(ri * ri * N * N / (9 * ri + 10 * li) * 1e-6)]);
    }
    rows.push(['Uzunluk / çap oranı', h.fmt(l / d, 2)]);
    rows.push(['Yaklaşık tel uzunluğu', h.fmt(N * Math.PI * d / 1000, 2) + ' m']);
    rows.push(['Kesit alanı', h.fmt(A * 1e6, 2) + ' mm²']);
    let note = 'Uzun solenoid formülü uç etkilerini yok sayar ve kısa bobinlerde endüktansı olduğundan büyük gösterir.';
    if (mur === 1) note += l / d < 0.4 ? ' Bu bobin çok kısa (uzunluk çapın 0,4 katından az); Wheeler sonucu da yaklaşık kabul edilmelidir.' : ' Hava nüveli bobinde Wheeler sonucunu esas alın.';
    else note += ' Nüveli bobinlerde gerçek değer nüvenin biçimine ve hava aralığına bağlıdır; sonucu üst sınır olarak değerlendirin.';
    return { rows, note };
  }
