// Dirençte Harcanan Güç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const mod = v.bilinen === 'ir' ? 'ir' : v.bilinen === 'vi' ? 'vi' : 'vr';
    let u, i, r;
    if (mod === 'vr') { u = h.pos(v.gerilim, 'Gerilim'); r = h.pos(v.direnc, 'Direnç'); i = u / r; }
    else if (mod === 'ir') { i = h.pos(v.akim, 'Akım'); r = h.pos(v.direnc, 'Direnç'); u = i * r; }
    else { u = h.pos(v.gerilim, 'Gerilim'); i = h.pos(v.akim, 'Akım'); r = u / i; }
    const kat = h.opt(v.kat, 2, 'Güvenlik katsayısı');
    if (kat < 1 || kat > 10) h.err('Güvenlik katsayısı 1 ile 10 arasında olmalı.');
    const p = u * i;
    const gucYaz = (x) => (x >= 1000 ? h.sig(x / 1000, 5) + ' kW' : x >= 1 ? h.sig(x, 5) + ' W' : x >= 1e-3 ? h.sig(x * 1e3, 5) + ' mW' : h.sig(x * 1e6, 5) + ' µW');
    const akimYaz = (x) => (x >= 1 ? h.sig(x, 5) + ' A' : x >= 1e-3 ? h.sig(x * 1e3, 5) + ' mA' : h.sig(x * 1e6, 5) + ' µA');
    const direncYaz = (x) => (x >= 1e6 ? h.sig(x / 1e6, 5) + ' MΩ' : x >= 1e3 ? h.sig(x / 1e3, 5) + ' kΩ' : h.sig(x, 5) + ' Ω');
    const siniflar = [0.125, 0.25, 0.5, 1, 2, 3, 5, 10, 25, 50, 100];
    const gerek = p * kat;
    const sec = siniflar.find((s) => s >= gerek - 1e-12);
    const oneri = sec === undefined
      ? 'Standart dirençlerin üzerinde (en az ' + gucYaz(gerek) + ' gerekir)'
      : (sec < 1 ? h.fmt(sec, 3) + ' W' : sec + ' W') + ' ya da üzeri';
    return {
      rows: [
        ['Dirençte harcanan güç', gucYaz(p)],
        ['Önerilen direnç gücü', oneri],
        ['Gerilim', h.sig(u, 5) + ' V'],
        ['Akım', akimYaz(i)],
        ['Direnç', direncYaz(r)],
        ['Bir saatte açığa çıkan ısı', h.sig(p * 3.6, 5) + ' kJ'],
      ],
      note: sec === undefined
        ? 'Bu güç düzeyi sıradan devre dirençleriyle karşılanamaz; soğutuculu güç direnci ya da ısıtıcı eleman gerekir.'
        : 'Öneri, harcanan gücün güvenlik katsayısıyla çarpılıp bir üst standart değere yuvarlanmasıyla bulunur. Sıcak ya da kapalı ortamlarda daha büyük bir katsayı seçin.',
    };
  }
