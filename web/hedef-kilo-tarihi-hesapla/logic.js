// Hedef Kiloya Ulaşma Tarihi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const mevcut = h.pos(v.mevcut, 'Mevcut kilo');
    const hedef = h.pos(v.hedef, 'Hedef kilo');
    const hiz = h.pos(v.hiz, 'Haftalık değişim');
    if (mevcut > 400 || hedef > 400) h.err('Kilo değerleri 400 kg\'dan büyük olamaz; kilogram cinsinden yazdığınızdan emin olun.');
    if (Math.abs(mevcut - hedef) < 1e-9) h.err('Mevcut kilo ile hedef kilo aynı; farklı bir hedef yazın.');
    if (hiz > 5) h.err('Haftalık değişim 5 kg\'dan büyük olamaz; daha gerçekçi bir tempo yazın.');
    const bas = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const fark = Math.abs(mevcut - hedef);
    const veriyor = hedef < mevcut;
    const hafta = fark / hiz;
    const gun = Math.ceil(hafta * 7 - 1e-9);
    const bitis = h.gunEkle(bas, gun);
    const gunlukKcal = hiz * 7700 / 7;
    const yuzde = hiz / mevcut * 100;
    const tamHafta = Math.floor(gun / 7);
    const artan = gun % 7;
    let not = 'Hesap, 1 kg vücut ağırlığı değişimini yaklaşık 7.700 kcal sayan kaba kurala ve sabit haftalık tempoya dayanır; gerçek ilerleme dalgalıdır.';
    if (veriyor && yuzde > 1 + 1e-9) not += ' Seçtiğiniz tempo vücut ağırlığınızın haftada %1\'inden fazla; bu hız çoğu kişi için sürdürülebilir değildir, bir uzmana danışın.';
    return {
      rows: [
        ['Hedefe ulaşma tarihi', `${h.fmtDate(bitis)} ${h.gunAdi(bitis)}`],
        ['Süre', `${gun} gün (${tamHafta} hafta${artan ? ' ' + artan + ' gün' : ''})`],
        ['Yaklaşık ay', h.fmt(gun / 30.44, 1) + ' ay'],
        [veriyor ? 'Verilecek toplam kilo' : 'Alınacak toplam kilo', h.fmt(fark, 2) + ' kg'],
        [veriyor ? 'Gereken günlük kalori açığı' : 'Gereken günlük kalori fazlası', h.fmt(gunlukKcal, 0) + ' kcal'],
        ['Haftalık değişim oranı', '%' + h.fmt(yuzde, 2) + ' (vücut ağırlığına göre)'],
        ['Başlangıç tarihi', h.fmtDate(bas)],
      ],
      note: not,
    };
  }
