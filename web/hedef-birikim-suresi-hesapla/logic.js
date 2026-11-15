// Hedef Birikime Ulaşma Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hedef = h.pos(v.hedef, 'Hedef tutar');
    const mevcut = h.opt(v.mevcut, 0, 'Mevcut birikim');
    const aylik = h.opt(v.aylik, 0, 'Aylık birikim');
    const oran = h.opt(v.getiri, 0, 'Yıllık getiri oranı');
    if (mevcut < 0) h.err('"Mevcut birikim" negatif olamaz.');
    if (aylik < 0) h.err('"Aylık birikim" negatif olamaz.');
    if (oran < 0) h.err('"Yıllık getiri oranı" negatif olamaz; getiri yoksa alanı boş bırakın.');
    if (oran > 1000) h.err('"Yıllık getiri oranı" çok yüksek; yüzde olarak yazdığınızdan emin olun (örn. 12).');
    const i = oran / 100 / 12;
    const sureMetni = (n) => {
      const y = Math.floor(n / 12), a = n % 12;
      const parca = [];
      if (y) parca.push(y + ' yıl');
      if (a) parca.push(a + ' ay');
      return y ? `${parca.join(' ')} (${n} ay)` : `${n} ay`;
    };
    if (mevcut >= hedef - 1e-9) {
      return { rows: [['Süre', 'Hedefe zaten ulaşıldı (0 ay)'], ['Hedefi aşan tutar', h.para(mevcut - hedef)]] };
    }
    if (aylik === 0 && (i === 0 || mevcut === 0)) h.err('Aylık birikim yazın. Birikim eklemeden hedefe ancak mevcut paranız getiri sağlıyorsa ulaşılabilir.');
    const deger = (n) => i === 0 ? mevcut + aylik * n : mevcut * Math.pow(1 + i, n) + aylik * (Math.pow(1 + i, n) - 1) / i;
    let n = i === 0 ? (hedef - mevcut) / aylik : Math.log((hedef * i + aylik) / (mevcut * i + aylik)) / Math.log(1 + i);
    if (!Number.isFinite(n) || n > 1200) h.err('Bu değerlerle hedefe ulaşmak 100 yıldan uzun sürüyor. Aylık birikimi artırın ya da hedefi küçültün.');
    n = Math.max(1, Math.ceil(n - 1e-9));
    while (n > 1 && deger(n - 1) >= hedef - 0.005) n--;
    while (deger(n) < hedef - 0.005) n++;
    const son = deger(n);
    const yatirilan = aylik * n;
    return {
      rows: [
        ['Süre', sureMetni(n)],
        ['Bu sürede yatırılan toplam', h.para(yatirilan)],
        ['Getiri kazancı', h.para(son - mevcut - yatirilan)],
        ['Süre sonundaki birikim', h.para(son)],
        ['Hedefi aşan tutar', h.para(son - hedef)],
      ],
      note: 'Birikimin her ay sonunda eklendiği, getirinin aylık bileşik işlediği ve oranın süre boyunca sabit kaldığı varsayılır. Vergi, kesinti ve enflasyon hesaba katılmaz.',
    };
  }
