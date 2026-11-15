// N. Dereceden Kök Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.x, 'Sayı (x)');
    const n = h.int(v.n, 'Kök derecesi (n)');
    if (n < 2) h.err('Kök derecesi en az 2 olmalı (2 karekök, 3 küp kök demektir).');
    if (n > 1000) h.err('Kök derecesi en fazla 1000 olabilir.');
    if (Math.abs(x) > 1e300) h.err('Sayı çok büyük; daha küçük bir değer yazın.');
    const cift = n % 2 === 0;
    if (x < 0 && cift) h.err(`Negatif bir sayının ${n}. dereceden (çift dereceli) gerçek kökü yoktur. Pozitif bir sayı ya da tek bir derece yazın.`);
    let r = Math.sign(x) * Math.pow(Math.abs(x), 1 / n);
    // Kayan nokta artığını temizle: kısa ondalıklı aday tam sağlıyorsa onu kullan
    const aday = Number(r.toFixed(9));
    if (Math.abs(Math.pow(aday, n) - x) <= 1e-12 * Math.max(1, Math.abs(x))) r = aday;
    const tamKok = Number.isInteger(x) && Number.isInteger(r);
    const par = (t) => (t < 0 ? `(${h.fmt(t, 0)})` : h.fmt(t, 0));
    const ad = n === 2 ? 'Karekök' : n === 3 ? 'Küp kök' : `${n}. dereceden kök`;
    const rows = [
      ['Kök değeri', h.fmt(r, 8)],
      ['İşlem', `${ad}: ${x < 0 ? '(' + h.fmt(x, 10) + ')' : h.fmt(x, 10)}^(1/${n})`],
      ['Sağlama (sonucun n. kuvveti)', h.sig(Math.pow(r, n), 9)],
      ['Tam kök mü?', tamKok ? `Evet, ${par(r)}^${n} = ${h.fmt(x, 0)}` : 'Hayır'],
    ];
    let note;
    if (cift && x > 0) {
      rows.push(['İkinci gerçek kök', h.fmt(-r, 8)]);
      note = 'Derece çift olduğu için karşıt işaretli sayı da aynı kuvveti verir; kök işaretinin değeri ise pozitif olan köktür.';
    } else if (x < 0) {
      note = 'Derece tek olduğu için negatif sayının kökü tanımlıdır ve negatiftir.';
    } else if (x === 0) {
      note = 'Sıfırın her dereceden kökü sıfırdır.';
    } else {
      note = 'Derece tek olduğu için tek bir gerçek kök vardır.';
    }
    if (!tamKok && r !== aday) note += ' Sonuç sekiz ondalık basamağa yuvarlanmıştır.';
    return { rows, note };
  }
