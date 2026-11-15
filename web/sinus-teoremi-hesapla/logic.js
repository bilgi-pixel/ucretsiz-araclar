// Sinüs Teoremi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const R = Math.PI / 180, sin = (x) => Math.sin(x * R);
    const d = (x) => h.fmt(x, 4) + '°', u = (x) => h.fmt(x, 4) + ' birim', al = (x) => h.fmt(x, 4) + ' birim²';
    const a = h.pos(v.kenarA, 'a kenarı');
    const A = h.pos(v.aciA, 'A açısı');
    if (A >= 180) h.err('A açısı 0° ile 180° arasında olmalıdır.');
    const cap = a / (2 * sin(A));
    if (v.mod !== 'kka') {
      const B = h.pos(v.aciB, 'B açısı');
      if (A + B >= 180 - 1e-9) h.err(`A ve B açılarının toplamı 180°\'den küçük olmalı (şu an ${h.fmt(A + B, 4)}°); aksi hâlde üçüncü açıya yer kalmaz.`);
      const C = 180 - A - B, b = a * sin(B) / sin(A), c = a * sin(C) / sin(A);
      return {
        rows: [
          ['b kenarı', u(b)], ['c kenarı', u(c)], ['C açısı', d(C)],
          ['Çevre', u(a + b + c)], ['Alan', al(0.5 * a * b * sin(C))],
          ['Çevrel çember yarıçapı (R)', u(cap)],
        ],
        note: 'a / sin A = b / sin B = c / sin C = 2R. Sonuçlar, a kenarını yazdığınız uzunluk birimindedir.',
      };
    }
    const b = h.pos(v.kenarB, 'b kenarı');
    const sB = b * sin(A) / a;
    if (sB > 1 + 1e-12) h.err(`Bu ölçülerle üçgen oluşmaz: sin B = ${h.fmt(sB, 4)} çıkıyor ve sinüs 1\'den büyük olamaz. a kenarı, karşısındaki açıya göre çok kısa; değerleri kontrol edin.`);
    const B1 = Math.abs(sB - 1) < 1e-12 ? 90 : Math.asin(Math.min(1, sB)) / R;
    const aday = B1 === 90 ? [90] : [B1, 180 - B1];
    const coz = aday.filter((B) => A + B < 180 - 1e-9).map((B) => { const C = 180 - A - B; const c = a * sin(C) / sin(A); return { B, C, c, alan: 0.5 * a * b * sin(C) }; });
    if (!coz.length) h.err('Bu ölçülerle üçgen oluşmaz: A açısı dik ya da geniş olduğunda karşısındaki a kenarı b kenarından uzun olmalıdır.');
    const rows = [
      ['B açısı', d(coz[0].B)], ['C açısı', d(coz[0].C)], ['c kenarı', u(coz[0].c)], ['Alan', al(coz[0].alan)],
      ['Çevrel çember yarıçapı (R)', u(cap)],
      ['Çözüm sayısı', coz.length === 2 ? '2 (belirsiz durum)' : '1'],
    ];
    if (coz.length === 2) rows.push(['2. çözüm: B açısı', d(coz[1].B)], ['2. çözüm: C açısı', d(coz[1].C)], ['2. çözüm: c kenarı', u(coz[1].c)], ['2. çözüm: Alan', al(coz[1].alan)]);
    return {
      rows,
      note: coz.length === 2 ? 'Verilen ölçüler iki farklı üçgene uyuyor: B açısı dar da olabilir, geniş de. Hangisinin geçerli olduğunu sorudaki ek bilgi (şekil, açının türü) belirler.' : 'Verilen ölçülere uyan tek bir üçgen vardır.',
    };
  }
