// Kaldırma Kuvveti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tablo = { su: 1000, deniz: 1025, civa: 13600, hava: 1.225 };
    const rho = v.sivi === 'ozel' ? h.pos(v.yogunluk, 'Özel akışkan yoğunluğu') : (tablo[v.sivi] || 1000);
    const carpan = { L: 1e-3, m3: 1, cm3: 1e-6 }[v.hBirim] || 1e-3;
    const V = h.pos(v.hacim, 'Cismin batan hacmi') * carpan;
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    const F = rho * V * g;
    const rows = [
      ['Kaldırma kuvveti', h.fmt(F, 4) + ' N'],
      ['Yer değiştiren akışkan kütlesi', h.fmt(rho * V, 6) + ' kg'],
      ['Batan hacim', h.sig(V, 6) + ' m³'],
      ['Akışkan yoğunluğu', h.fmt(rho, 3) + ' kg/m³'],
    ];
    let note = 'Kaldırma kuvveti yalnızca batan hacme ve akışkanın yoğunluğuna bağlıdır; cismin yapıldığı maddeye bağlı değildir.';
    if (String(v.kutle ?? '').trim() !== '') {
      const m = h.pos(v.kutle, 'Cismin kütlesi');
      const W = m * g;
      const net = F - W;
      rows.push(['Cismin ağırlığı', h.fmt(W, 4) + ' N']);
      const yon = Math.abs(net) < 1e-9 ? 'dengede' : net > 0 ? 'yukarı' : 'aşağı';
      rows.push(['Net kuvvet', h.fmt(Math.abs(net), 4) + ' N (' + yon + ')']);
      rows.push(['Dengede yüzmesi için gereken batan hacim', h.sig(m / rho, 6) + ' m³']);
      note = yon === 'yukarı' ? 'Bu batan hacimde kaldırma kuvveti ağırlıktan büyüktür; serbest bırakılan cisim yükselir ve batan hacmi azalarak dengeye gelir.'
        : yon === 'aşağı' ? 'Bu batan hacimde kaldırma kuvveti ağırlığı karşılamıyor. Girilen hacim cismin tüm hacmiyse cisim batar; net kuvvet cismin sıvı içindeki görünür ağırlığıdır.'
          : 'Kaldırma kuvveti ağırlığa eşit; cisim bu batan hacimle dengede kalır.';
    }
    return { rows, note };
  }
