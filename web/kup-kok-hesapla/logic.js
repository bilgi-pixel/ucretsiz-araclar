// Küp Kök Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.x, 'Sayı (x)');
    if (Math.abs(x) > 1e15) h.err('Sayı çok büyük; mutlak değeri en fazla 15 basamaklı bir sayı yazın.');
    let r = Math.cbrt(x);
    // Ondalık gösterimi kısa olan tam sonuçları (ör. 0,1) kayan nokta artığından arındır
    const yuvarlak = Number(r.toFixed(9));
    if (Math.abs(yuvarlak * yuvarlak * yuvarlak - x) <= 1e-12 * Math.max(1, Math.abs(x))) r = yuvarlak;
    const tamSayi = Number.isInteger(x);
    const k = Math.round(r);
    const tamKup = tamSayi && k * k * k === x;
    const f0 = (n) => h.fmt(n, 0);
    const par = (n) => (n < 0 ? `(${f0(n)})` : f0(n));
    const rows = [
      ['Küp kök (∛x)', h.fmt(r, 8)],
      ['Tam küp mü?', tamKup ? `Evet, ${par(k)}³ = ${f0(x)}` : tamSayi ? 'Hayır' : 'Hayır (sayı tam sayı değil)'],
      ['Sağlama (sonucun küpü)', h.fmt(r * r * r, 6)],
      ['Üslü gösterim', `${h.fmt(x, 10)}^(1/3)`],
    ];
    let note;
    if (tamKup) {
      note = 'Sonuç bir tam sayı olduğu için yazdığınız sayı tam küptür.';
    } else if (tamSayi) {
      let a = Math.floor(r);
      while (a * a * a > x) a--;
      while ((a + 1) * (a + 1) * (a + 1) <= x) a++;
      rows.push(['Bir önceki tam küp', `${f0(a * a * a)} = ${par(a)}³`]);
      rows.push(['Bir sonraki tam küp', `${f0((a + 1) * (a + 1) * (a + 1))} = ${par(a + 1)}³`]);
      note = 'Sayı tam küp olmadığı için küp kökü irrasyoneldir; sonuç sekiz ondalık basamağa yuvarlanmıştır.';
    } else {
      note = 'Sonuç en fazla sekiz ondalık basamakla gösterilir.';
    }
    if (x < 0) note += ' Negatif sayının küp kökü de negatiftir.';
    return { rows, note };
  }
