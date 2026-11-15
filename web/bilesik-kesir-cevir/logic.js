// Bileşik Kesir ve Tam Sayılı Kesir Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ebob = (x, y) => { x = Math.abs(x); y = Math.abs(y); while (y) { const t = x % y; x = y; y = t; } return x; };
    const SINIR = 1e12;
    // p/q (q > 0) için sade bileşik ve tam sayılı yazılış
    const yaz = (p, q) => {
      const g = ebob(p, q) || 1;
      p /= g; q /= g;
      const isaret = p < 0 ? '-' : '';
      const m = Math.abs(p);
      const sade = q === 1 ? `${isaret}${m}` : `${isaret}${m}/${q}`;
      let tamli;
      if (q === 1) tamli = `${isaret}${m}`;
      else if (m < q) tamli = `${isaret}${m}/${q} (basit kesir, tam kısmı yok)`;
      else tamli = `${isaret}${Math.floor(m / q)} tam ${m % q}/${q}`;
      return { sade, tamli, deger: p / q };
    };
    if (v.yon === 'tam') {
      const t = h.int(v.tamKisim, 'Tam kısım');
      const pay = h.int(v.pay, 'Pay');
      const payda = h.int(v.payda, 'Payda');
      if (payda === 0) h.err('Payda sıfır olamaz. Sıfırdan büyük bir payda yazın.');
      if (payda < 0 || pay < 0) h.err('Tam sayılı kesirde pay ve payda pozitif yazılır; negatif sayı için eksi işaretini tam kısma koyun.');
      if (Math.abs(t) > SINIR || pay > SINIR || payda > SINIR) h.err('Sayılar en fazla 12 basamaklı olabilir.');
      const yeniPay = Math.abs(t) * payda + pay;
      const isaret = t < 0 ? '-' : '';
      const r = yaz(t < 0 ? -yeniPay : yeniPay, payda);
      return {
        rows: [
          ['Bileşik kesir', `${isaret}${yeniPay}/${payda}`],
          ['Sade bileşik kesir', r.sade],
          ['Tam sayılı kesir (sade)', r.tamli],
          ['Ondalık değer', h.fmt(r.deger, 6)],
        ],
        note: `İşlem: ${Math.abs(t)} × ${payda} + ${pay} = ${yeniPay}; payda aynı kalır.` + (pay >= payda ? ' Girdiğiniz kesir kısmında pay paydadan küçük değil; sonuç yine de doğru hesaplandı.' : ''),
      };
    }
    let pay = h.int(v.pay, 'Pay');
    let payda = h.int(v.payda, 'Payda');
    if (payda === 0) h.err('Payda sıfır olamaz; sıfıra bölme tanımsızdır. Sıfırdan farklı bir payda yazın.');
    if (Math.abs(pay) > SINIR || Math.abs(payda) > SINIR) h.err('Sayılar en fazla 12 basamaklı olabilir.');
    if (payda < 0) { pay = -pay; payda = -payda; }
    const r = yaz(pay, payda);
    const m = Math.abs(pay);
    return {
      rows: [
        ['Tam sayılı kesir', r.tamli],
        ['Sade bileşik kesir', r.sade],
        ['Ondalık değer', h.fmt(r.deger, 6)],
      ],
      note: `İşlem: ${m} ÷ ${payda} = ${Math.floor(m / payda)}, kalan ${m % payda}. Bölüm tam kısım, kalan yeni pay olur.`,
    };
  }
