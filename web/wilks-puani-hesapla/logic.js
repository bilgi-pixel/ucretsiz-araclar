// Wilks Puanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carpan = v.birim === 'lb' ? 0.45359237 : 1;
    const vucut = h.pos(v.vucut, 'Vücut ağırlığı') * carpan;
    const toplam = h.pos(v.toplam, 'Kaldırılan ağırlık') * carpan;
    if (vucut < 40 || vucut > 200) h.err('Vücut ağırlığı 40 ile 200 kg arasında olmalı; Wilks formülü bu aralığın dışında güvenilir değildir.');
    if (toplam > 1500) h.err('Kaldırılan ağırlık 1.500 kg\'dan büyük olamaz; değeri ve birimi kontrol edin.');
    const E = [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-6, -1.291e-8];
    const K = [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-5, -9.054e-8];
    const k = v.cinsiyet === 'kadin' ? K : E;
    let payda = 0;
    for (let i = 0; i < 6; i++) payda += k[i] * Math.pow(vucut, i);
    const katsayi = 500 / payda;
    const puan = katsayi * toplam;
    const rows = [
      ['Wilks puanı', h.fix(puan, 2)],
      ['Wilks katsayısı', h.fix(katsayi, 4)],
      ['Vücut ağırlığının katı', h.fmt(toplam / vucut, 2) + ' kat'],
      ['Vücut ağırlığı', h.fmt(vucut, 2) + ' kg'],
      ['Kaldırılan ağırlık', h.fmt(toplam, 2) + ' kg'],
    ];
    for (const hedef of [300, 400]) {
      rows.push([`${hedef} Wilks puanı için gereken`, h.fmt(hedef / katsayi, 1) + ' kg']);
    }
    return {
      rows,
      note: 'Hesap, özgün Wilks formülünün erkek ve kadın katsayılarıyla yapılır. Puan birimsizdir; yalnızca aynı formülle hesaplanmış puanlarla karşılaştırın.',
    };
  }
