// Skaler (Nokta) Çarpım Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const oku = (s, ad) => {
      const x = h.nums(String(s ?? '').replace(/[()\[\]<>]/g, ' '), ad);
      if (x.length < 2) h.err(`"${ad}" için en az iki bileşen yazın ve bileşenleri boşlukla ayırın (örn. 3 4).`);
      if (x.length > 10) h.err(`"${ad}" en fazla 10 bileşenli olabilir.`);
      return x;
    };
    const A = oku(v.a, 'A vektörü'), B = oku(v.b, 'B vektörü');
    if (A.length !== B.length) h.err(`Vektörlerin boyutları aynı olmalı: A ${A.length}, B ${B.length} bileşenli.`);
    const ic = A.reduce((t, k, i) => t + k * B[i], 0);
    const na = Math.sqrt(A.reduce((t, k) => t + k * k, 0));
    const nb = Math.sqrt(B.reduce((t, k) => t + k * k, 0));
    const sifir = na < 1e-12 || nb < 1e-12;
    const cos = sifir ? 0 : Math.max(-1, Math.min(1, ic / (na * nb)));
    const aci = (Math.acos(cos) * 180) / Math.PI;
    let durum;
    if (sifir) durum = 'Vektörlerden biri sıfır vektör; açı tanımsız';
    else if (Math.abs(cos) < 1e-9) durum = 'Vektörler birbirine dik';
    else if (cos > 1 - 1e-9) durum = 'Vektörler paralel ve aynı yönlü';
    else if (cos < -1 + 1e-9) durum = 'Vektörler paralel ve zıt yönlü';
    else durum = cos > 0 ? 'Aradaki açı dar' : 'Aradaki açı geniş';
    return {
      rows: [
        ['Skaler çarpım (A · B)', h.fmt(ic, 4)],
        ['Aradaki açı', sifir ? 'tanımsız' : h.fmt(aci, 4) + '°'],
        ['cos θ', sifir ? 'tanımsız' : h.fmt(cos, 4)],
        ['|A|', h.fmt(na, 4)],
        ['|B|', h.fmt(nb, 4)],
        ['A\'nın B üzerindeki izdüşümü', nb < 1e-12 ? 'tanımsız' : h.fmt(ic / nb, 4)],
        ['Durum', durum],
      ],
      note: 'Açı 0° ile 180° arasında verilir. İzdüşüm, A vektörünün B doğrultusundaki işaretli uzunluğudur.',
    };
  }
