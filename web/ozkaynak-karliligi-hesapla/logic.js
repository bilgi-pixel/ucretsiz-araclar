// Özkaynak Kârlılığı (ROE) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const yuzde = (x) => (x < 0 && Number(x.toFixed(2)) !== 0 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const kar = h.num(v.netKar, 'Dönem net kârı');
    const son = h.pos(v.ozSon, 'Dönem sonu özkaynak');
    const bas = dolu(v.ozBas) ? h.pos(v.ozBas, 'Dönem başı özkaynak') : son;
    const ort = (bas + son) / 2;
    const roe = kar / ort * 100;
    const rows = [
      ['Özkaynak kârlılığı (ROE)', yuzde(roe)],
      ['Ortalama özkaynak', h.para(ort)],
      ['100 TL özkaynak başına net kâr', h.para(roe)],
    ];
    let note = 'Özkaynak negatif ya da sıfıra çok yakınsa oran anlamını yitirir; bu durumda ROE yorumlanmamalıdır.';
    const sVar = dolu(v.satis), aVar = dolu(v.aktif);
    if (sVar !== aVar) h.err('DuPont ayrıştırması için "Net satışlar" ve "Ortalama toplam aktif" alanlarının ikisini de doldurun ya da ikisini de boş bırakın.');
    if (sVar && aVar) {
      const satis = h.pos(v.satis, 'Net satışlar');
      const aktif = h.pos(v.aktif, 'Ortalama toplam aktif');
      if (aktif < ort - 1e-9) h.err('"Ortalama toplam aktif" özkaynaktan küçük olamaz; toplam aktif, özkaynak ile borçların toplamıdır.');
      rows.push(['Net kâr marjı', yuzde(kar / satis * 100)]);
      rows.push(['Aktif devir hızı', h.fmt(satis / aktif, 2)]);
      rows.push(['Özkaynak çarpanı', h.fmt(aktif / ort, 2)]);
      note = 'DuPont: ROE = Net kâr marjı × Aktif devir hızı × Özkaynak çarpanı. Bileşenler yuvarlanmış gösterildiği için çarpımları ROE ile küçük farklar verebilir.';
    }
    return { rows, note };
  }
