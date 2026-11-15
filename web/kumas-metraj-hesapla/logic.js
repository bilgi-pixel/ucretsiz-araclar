// Kumaş Metrajı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.parcaEn, 'Parça eni');
    const boy = h.pos(v.parcaBoy, 'Parça boyu');
    const adet = h.posint(v.adet, 'Parça adedi');
    const ke = h.pos(v.kumasEni, 'Kumaş eni');
    const pay = h.nonneg(h.opt(v.pay, 0, 'Dikiş payı'), 'Dikiş payı');
    const cekme = h.nonneg(h.opt(v.cekme, 0, 'Çekme payı'), 'Çekme payı');
    if (cekme > 30) h.err('Çekme payı %30\'dan büyük olamaz.');
    const pe = en + 2 * pay, pb = boy + 2 * pay;
    const dene = (w, l) => {
      const n = Math.floor(ke / w + 1e-9);
      if (n < 1) return null;
      const sira = Math.ceil(adet / n - 1e-9);
      return { n, sira, uzun: sira * l };
    };
    const duz = dene(pe, pb);
    const yan = v.dondur === 'evet' ? dene(pb, pe) : null;
    let sec = duz, cevrik = false;
    if (yan && (!duz || yan.uzun < duz.uzun - 1e-9)) { sec = yan; cevrik = true; }
    if (!sec) {
      h.err(v.dondur === 'evet'
        ? 'Parça, payları ile birlikte kumaş enine hiçbir yönde sığmıyor; daha enli kumaş seçin ya da parçayı ekleyerek dikmeyi planlayın.'
        : `Parçanın paylı eni (${h.fmt(pe, 1)} cm) kumaş eninden büyük; daha enli kumaş seçin ya da yön önemli değilse parçayı yan çevirmeye izin verin.`);
    }
    const net = sec.uzun * (1 + cekme / 100);
    const al = Math.ceil(net / 10 - 1e-9) / 10;
    const fireOran = (1 - (adet * pe * pb) / (ke * sec.uzun)) * 100;
    return {
      rows: [
        ['Gerekli kumaş', h.fmt(net / 100, 2) + ' m'],
        ['Satın alınacak (10 cm\'e yuvarlanmış)', h.fmt(al, 1) + ' m'],
        ['Yerleşim', `Enine ${sec.n} parça × ${sec.sira} sıra (${cevrik ? 'yan çevrilmiş' : 'düz'})`],
        ['Paylı kesim ölçüsü', `${h.fmt(pe, 1)} × ${h.fmt(pb, 1)} cm`],
        ['Kullanılan kumaş alanı', h.fmt(ke * net / 10000, 2) + ' m²'],
        ['Artan kumaş (fire)', '%' + h.fmt(Math.max(0, fireOran), 1)],
      ],
      note: 'Parça boyu kumaşın boyuna (kenar örgüsüne paralel) yerleştirilir. Hesap aynı ölçüde dikdörtgen parçalar içindir; kalıplı giysi parçalarında pastal planına göre değişir.',
    };
  }
