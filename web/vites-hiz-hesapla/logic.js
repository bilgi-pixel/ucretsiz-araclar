// Vites Oranına Göre Hız Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const devir = h.pos(v.devir, 'Motor devri');
    const vites = h.pos(v.vites, 'Vites oranı');
    const dif = h.pos(v.dif, 'Diferansiyel oranı');
    if (devir > 30000) h.err('"Motor devri" en fazla 30000 d/d olabilir.');
    if (vites > 30 || dif > 30) h.err('Vites ve diferansiyel oranları en fazla 30 olabilir; oranı 3,5 gibi tek sayı olarak yazın.');
    const t = String(v.lastik ?? '').trim().toUpperCase().replace(',', '.');
    if (t === '') h.err('"Lastik ebadı" alanını doldurun (örn. 205/55 R16).');
    const m = /^(\d{3})\s*\/\s*(\d{2})\s*(?:Z?R|-|\s)\s*(\d{2}(?:\.5)?)$/.exec(t);
    if (!m) h.err('"Lastik ebadı" 205/55 R16 biçiminde olmalı: genişlik (mm) / yanak oranı R jant çapı (inç).');
    const gen = +m[1], oran = +m[2], jant = +m[3];
    if (gen < 105 || gen > 455 || oran < 20 || oran > 95 || jant < 10 || jant > 30) h.err('Lastik ebadı olağan sınırların dışında; değerleri kontrol edin.');
    const cap = jant * 25.4 + 2 * gen * oran / 100; // mm
    const cevre = Math.PI * cap; // mm
    const toplam = vites * dif;
    const teker = devir / toplam;
    const hiz = teker * cevre * 60 / 1e6;
    return {
      rows: [
        ['Hız', h.fmt(hiz, 1) + ' km/sa'],
        ['Tekerlek devri', h.fmt(teker, 1) + ' d/d'],
        ['Toplam aktarma oranı', h.fmt(toplam, 3) + ' : 1'],
        ['1.000 d/d başına hız', h.fmt(hiz / devir * 1000, 2) + ' km/sa'],
        ['Lastik çapı', h.fmt(cap, 1) + ' mm'],
        ['Lastik çevresi', h.fmt(cevre, 0) + ' mm'],
      ],
      note: 'Kuramsal hızdır: debriyaj ya da tork konvertörü kayması, lastiğin yük altında ezilmesi ve aşınma hesaba katılmamıştır; gerçek hız genellikle birkaç yüzde düşük olur.',
    };
  }
