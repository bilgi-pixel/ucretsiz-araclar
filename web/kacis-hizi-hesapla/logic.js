// Kaçış Hızı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const G = 6.6743e-11;
    const tablo = {
      dunya: [5.972e24, 6371], ay: [7.342e22, 1737.4], mars: [6.417e23, 3389.5], venus: [4.867e24, 6051.8],
      merkur: [3.301e23, 2439.7], jupiter: [1.898e27, 69911], saturn: [5.683e26, 58232], gunes: [1.989e30, 695700],
    };
    let M, R;
    if (v.cisim === 'ozel') { M = h.pos(v.kutle, 'Özel kütle'); R = h.pos(v.yaricap, 'Özel yarıçap'); }
    else [M, R] = tablo[v.cisim] || tablo.dunya;
    const yuk = h.nonneg(h.opt(v.yukseklik, 0, 'Yüzeyden yükseklik'), 'Yüzeyden yükseklik');
    const r = (R + yuk) * 1000;
    const ve = Math.sqrt(2 * G * M / r);
    if (!Number.isFinite(ve)) h.err('Sonuç hesaplanamadı; kütle ve yarıçap değerlerini kontrol edin.');
    const c = 299792458;
    const rows = [
      ['Kaçış hızı', h.fmt(ve / 1000, 3) + ' km/s'],
      ['Metre/saniye', h.fmt(ve, 1) + ' m/s'],
      ['Kilometre/saat', h.fmt(ve * 3.6, 0) + ' km/sa'],
      ['Dairesel yörünge hızı', h.fmt(ve / Math.SQRT2 / 1000, 3) + ' km/s'],
      ['Çekim ivmesi', h.fmt(G * M / (r * r), 3) + ' m/s²'],
      ['Merkezden uzaklık', h.fmt(r / 1000, 1) + ' km'],
    ];
    let note = 'Hava direnci ve gök cisminin dönüşü hesaba katılmaz. Kaçış hızı, fırlatılan cismin kütlesine bağlı değildir.';
    if (ve >= c) note = 'Bulunan değer ışık hızına eşit ya da ondan büyük; bu ölçekte Newton fiziği geçerli değildir ve sonuç fiziksel anlam taşımaz.';
    else if (ve > 0.1 * c) note = 'Bulunan hız ışık hızının onda birini aşıyor; bu ölçekte göreli etkiler önem kazanır, sonuç yaklaşık kabul edilmelidir.';
    return { rows, note };
  }
