// Aralıklı Tekrar Planı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ilk = h.dateOrToday(v.ilk, 'İlk çalışma tarihi');
    const ham = h.nums(v.araliklar, 'Tekrar günleri');
    for (const g of ham) {
      if (!Number.isInteger(g) || g < 1) h.err('Tekrar günleri 1 ya da daha büyük tam sayılar olmalı (örn. 1 3 7 14 30).');
      if (g > 3650) h.err('Tekrar günü 3650\'den (yaklaşık 10 yıl) büyük olamaz.');
    }
    const gunler = [...new Set(ham)].sort((a, b) => a - b);
    if (gunler.length > 12) h.err('En fazla 12 tekrar günü yazabilirsiniz.');
    const sinavVar = String(v.sinav ?? '').trim() !== '';
    let sinav = null;
    if (sinavVar) {
      sinav = h.date(v.sinav, 'Sınav tarihi');
      if (h.gunFarki(ilk, sinav) < 1) h.err('Sınav tarihi ilk çalışma tarihinden sonra olmalı.');
    }
    const konu = String(v.konu ?? '').trim();
    const rows = [];
    const satirlar = [`${konu ? konu + ' – ' : ''}İlk çalışma: ${h.fmtDate(ilk)} ${h.gunAdi(ilk)}`];
    let yetisen = 0;
    gunler.forEach((g, i) => {
      const d = h.gunEkle(ilk, g);
      const once = i === 0 ? g : g - gunler[i - 1];
      let deger = `${h.fmtDate(d)} ${h.gunAdi(d)} (${g} gün sonra)`;
      if (sinav) {
        if (h.gunFarki(d, sinav) > 0) yetisen++;
        else deger += ' – sınava yetişmiyor';
      }
      rows.push([`${i + 1}. tekrar`, deger]);
      satirlar.push(`${i + 1}. tekrar: ${h.fmtDate(d)} ${h.gunAdi(d)} (önceki adımdan ${once} gün sonra)`);
    });
    if (sinav) {
      rows.push(['Sınava kadar yapılabilen tekrar', `${yetisen} / ${gunler.length}`]);
      rows.push(['Sınava kalan gün', `${h.gunFarki(ilk, sinav)} gün`]);
      satirlar.push(`Sınav: ${h.fmtDate(sinav)} ${h.gunAdi(sinav)}`);
    }
    return { rows, text: satirlar.join('\n'), note: 'Günler ilk çalışma tarihinden itibaren sayılır. Bir tekrarı kaçırırsanız en kısa sürede yapın ve sonraki tarihleri aynı tutun.' };
  }
