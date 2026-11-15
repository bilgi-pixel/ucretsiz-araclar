// Düzgün Hızlanan Hareket Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const v0 = h.num(v.ilkHiz, 'İlk hız');
    let a, t, x, vs;
    if (v.tur === 'yol') {
      a = h.num(v.ivme, 'İvme');
      x = h.pos(v.yol, 'Yol');
      if (v0 < 0) h.err('Bu hesap türünde ilk hız negatif olamaz; hareket yönünü pozitif kabul edin.');
      const d = v0 * v0 + 2 * a * x;
      if (d < -1e-9) h.err('Cisim bu yolu tamamlayamadan duruyor. Durma mesafesi ' + h.fmt((v0 * v0) / (-2 * a), 3) + ' m; daha kısa bir yol ya da daha küçük bir yavaşlama girin.');
      vs = Math.sqrt(Math.max(0, d));
      if (a === 0) {
        if (v0 === 0) h.err('İlk hız ve ivme birlikte sıfır olamaz; cisim hareket etmez.');
        t = x / v0;
      } else t = (vs - v0) / a;
    } else if (v.tur === 'hiz') {
      vs = h.num(v.sonHiz, 'Son hız');
      t = h.pos(v.sure, 'Süre');
      a = (vs - v0) / t;
      x = ((v0 + vs) / 2) * t;
    } else {
      a = h.num(v.ivme, 'İvme');
      t = h.pos(v.sure, 'Süre');
      vs = v0 + a * t;
      x = v0 * t + 0.5 * a * t * t;
    }
    // Yön değişimi varsa alınan toplam yol yer değiştirmeden farklıdır
    let alinan = Math.abs(x), dondu = false;
    if (a !== 0) {
      const ts = -v0 / a;
      if (ts > 1e-12 && ts < t - 1e-12) {
        const xs = v0 * ts + 0.5 * a * ts * ts;
        alinan = Math.abs(xs) + Math.abs(x - xs);
        dondu = true;
      }
    }
    const R = {
      son: ['Son hız', h.fmt(vs, 4) + ' m/s'],
      yer: ['Yer değiştirme', h.fmt(x, 4) + ' m'],
      ivme: ['İvme', h.fmt(a, 4) + ' m/s²'],
      sure: ['Süre', h.fmt(t, 4) + ' s'],
    };
    const sira = v.tur === 'yol' ? ['son', 'sure', 'ivme', 'yer'] : v.tur === 'hiz' ? ['ivme', 'yer', 'son', 'sure'] : ['son', 'yer', 'ivme', 'sure'];
    const rows = sira.map((k) => R[k]);
    rows.push(['Ortalama hız', h.fmt(x / t, 4) + ' m/s']);
    rows.push(['Alınan toplam yol', h.fmt(alinan, 4) + ' m']);
    rows.push(['Son hız (km/sa)', h.fmt(vs * 3.6, 2) + ' km/sa']);
    const durum = a === 0 ? 'İvme sıfır: cisim sabit hızla hareket ediyor.' : dondu ? 'Cisim hareket sırasında durup yön değiştiriyor; bu yüzden alınan yol yer değiştirmeden büyük.' : (a * (v0 + vs) >= 0 ? 'Cisim düzgün hızlanıyor.' : 'Cisim düzgün yavaşlıyor.');
    return { rows, note: durum + ' Pozitif yön, ilk hızın yönü kabul edilmiştir; hava direnci gibi etkiler hesaba katılmaz.' };
  }
