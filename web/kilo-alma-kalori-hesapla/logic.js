// Kilo Alma İçin Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ihtiyac = h.pos(v.ihtiyac, 'Günlük kalori ihtiyacı');
    const mevcut = h.pos(v.mevcut, 'Mevcut kilo');
    const hedef = h.pos(v.hedef, 'Hedef kilo');
    if (ihtiyac < 800 || ihtiyac > 10000) h.err('Günlük kalori ihtiyacı 800 ile 10.000 kcal arasında olmalı; binlik ayraç kullanmadan yazın (2500).');
    if (mevcut < 30 || mevcut > 300) h.err('Mevcut kilo 30 ile 300 kg arasında olmalı.');
    if (hedef > 400) h.err('Hedef kilo 400 kg\'dan büyük olamaz.');
    if (hedef <= mevcut) h.err('Hedef kilo mevcut kilodan büyük olmalı. Kilo vermek için "Kalori Açığı ve Kilo Verme Süresi Hesaplama" aracını kullanın.');
    const hizlar = { '0.25': 0.25, '0.5': 0.5, '0.75': 0.75, '1': 1 };
    const hiz = hizlar[v.hiz] || 0.25;
    const KG = 7700;
    const fazla = hiz * KG / 7;
    const kilo = hedef - mevcut;
    const hafta = kilo / hiz;
    const gun = Math.max(1, Math.ceil(hafta * 7 - 1e-9));
    return {
      rows: [
        ['Günlük alınması gereken kalori', h.fmt(ihtiyac + fazla, 0) + ' kcal'],
        ['Günlük kalori fazlası', h.fmt(fazla, 0) + ' kcal'],
        ['Alınacak kilo', h.fmt(kilo, 1) + ' kg'],
        ['Tahmini süre', `${h.fmt(gun, 0)} gün (yaklaşık ${h.fmt(hafta, 1)} hafta)`],
        ['Toplam kalori fazlası', h.fmt(kilo * KG, 0) + ' kcal'],
        ['Fazlanın ihtiyaca oranı', '%' + h.fmt(fazla / ihtiyac * 100, 1)],
      ],
      note: (hiz >= 0.75 ? 'Hızlı kilo artışında alınan kilonun daha büyük bölümü yağ olur; kas kazanımı hedefleniyorsa daha yavaş bir hız seçin. ' : '')
        + '1 kg vücut ağırlığı yaklaşık 7700 kcal kabul edildi; gerçek artış kişiden kişiye değişir.',
    };
  }
