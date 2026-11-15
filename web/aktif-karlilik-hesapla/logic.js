// Aktif Kârlılığı (ROA) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const yuzde = (x) => (x < 0 && Number(x.toFixed(2)) !== 0 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const kar = h.num(v.netKar, 'Dönem net kârı');
    const son = h.pos(v.aktifSon, 'Dönem sonu toplam aktif');
    const bas = dolu(v.aktifBas) ? h.pos(v.aktifBas, 'Dönem başı toplam aktif') : son;
    const ort = (bas + son) / 2;
    const roa = kar / ort * 100;
    const rows = [
      ['Aktif kârlılığı (ROA)', yuzde(roa)],
      ['Ortalama toplam aktif', h.para(ort)],
      ['100 TL varlık başına net kâr', h.para(roa)],
    ];
    let note = 'Net kâr vergi sonrası dönem kârıdır. Oran, varlıkların borçla mı özkaynakla mı finanse edildiğine bakmaksızın toplam varlık getirisini gösterir.';
    if (dolu(v.satis)) {
      const satis = h.pos(v.satis, 'Net satışlar');
      rows.push(['Net kâr marjı', yuzde(kar / satis * 100)]);
      rows.push(['Aktif devir hızı', h.fmt(satis / ort, 2)]);
      note = 'ROA = Net kâr marjı × Aktif devir hızı. Bileşenler yuvarlanmış gösterildiği için çarpımları ROA ile küçük farklar verebilir.';
    }
    return { rows, note };
  }
