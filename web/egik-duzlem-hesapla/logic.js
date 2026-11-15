// Eğik Düzlem Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const m = h.pos(v.kutle, 'Kütle');
    const aci = h.pos(v.aci, 'Eğim açısı');
    if (aci >= 90) h.err('Eğim açısı 0 ile 90 derece arasında olmalı. 90 derece düşey duvar demektir; bu durumda serbest düşme hesabını kullanın.');
    const mu = h.opt(v.mu, 0, 'Sürtünme katsayısı');
    if (mu < 0) h.err('Sürtünme katsayısı negatif olamaz.');
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    const rad = (aci * Math.PI) / 180;
    const W = m * g;
    const par = W * Math.sin(rad);
    const N = W * Math.cos(rad);
    const fmax = mu * N;
    const kayar = par > fmax + 1e-12;
    const f = kayar ? fmax : par;
    const net = kayar ? par - fmax : 0;
    const a = net / m;
    const rows = [
      ['İvme', h.fmt(a, 3) + ' m/s²'],
      ['Durum', kayar ? 'Cisim aşağı doğru kayar' : 'Cisim kaymaz (sürtünme yeterli)'],
      ['Ağırlığın paralel bileşeni', h.fmt(par, 2) + ' N'],
      ['Normal kuvvet', h.fmt(N, 2) + ' N'],
      ['Sürtünme kuvveti', h.fmt(f, 2) + ' N'],
      ['Net kuvvet', h.fmt(net, 2) + ' N'],
      ['Ağırlık', h.fmt(W, 2) + ' N'],
    ];
    if (mu > 0) rows.push(['Kaymanın başladığı açı', h.fmt((Math.atan(mu) * 180) / Math.PI, 2) + '°']);
    if (String(v.uzunluk ?? '').trim() !== '') {
      const L = h.pos(v.uzunluk, 'Eğik düzlemin uzunluğu');
      rows.push(['Yükseklik', h.fmt(L * Math.sin(rad), 3) + ' m']);
      if (kayar) {
        rows.push(['İniş süresi', h.fmt(Math.sqrt((2 * L) / a), 3) + ' s']);
        rows.push(['Alt uçtaki hız', h.fmt(Math.sqrt(2 * a * L), 3) + ' m/s']);
      }
    }
    return { rows, note: 'Cismin durgun bırakıldığı, statik ve kinetik sürtünme katsayılarının eşit olduğu ve cismin yuvarlanmadan kaydığı varsayılmıştır.' };
  }
