// Çalışan Başına Ciro Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const ciro = h.pos(v.ciro, 'Dönem cirosu');
    const n = h.pos(v.calisan, 'Ortalama çalışan sayısı');
    const ay = h.pos(v.ay, 'Dönem uzunluğu');
    if (ay > 120) h.err('"Dönem uzunluğu" en fazla 120 ay olabilir.');
    const kisi = ciro / n;
    const rows = [
      ['Çalışan başına ciro', h.para(kisi)],
      ['Çalışan başına aylık ciro', h.para(kisi / ay)],
    ];
    if (dolu(v.netKar)) {
      const kar = h.num(v.netKar, 'Dönem net kârı');
      rows.push(['Çalışan başına net kâr', h.para(kar / n)]);
    }
    if (dolu(v.personel)) {
      const p = h.pos(v.personel, 'Dönem toplam personel gideri');
      rows.push(['Çalışan başına personel gideri', h.para(p / n)]);
      rows.push(['Personel giderinin ciroya oranı', '%' + h.fmt(p / ciro * 100, 2)]);
      rows.push(['1 TL personel giderine karşılık ciro', h.fix(ciro / p, 2) + ' TL']);
    }
    return {
      rows,
      note: `Çalışan başına ciro, ${h.fmt(ay, 2)} aylık dönemin toplamıdır; aylık değer bu tutarın dönem ay sayısına bölünmüş hâlidir.`,
    };
  }
