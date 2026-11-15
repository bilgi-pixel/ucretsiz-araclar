// Su Bardağı Gram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    // 200 ml'lik silme dolu bardak için yaklaşık ağırlıklar (gram).
    const tablo = {
      un: [110, 'un'], seker: [170, 'toz şeker'], pudra: [120, 'pudra şekeri'], pirinc: [180, 'pirinç'],
      bulgur: [160, 'bulgur'], irmik: [160, 'irmik'], nisasta: [120, 'nişasta'], kakao: [100, 'kakao'],
      mercimek: [180, 'kırmızı mercimek'], yulaf: [80, 'yulaf ezmesi'], tuz: [240, 'tuz'], su: [200, 'su'],
      sut: [206, 'süt'], yag: [184, 'sıvı yağ'], yogurt: [210, 'yoğurt'], bal: [280, 'bal'],
    };
    const m = tablo[v.malzeme] || tablo.un;
    const x = h.nonneg(v.miktar, 'Miktar');
    const bardakMl = h.pos(v.bardakMl, 'Su bardağı hacmi');
    if (bardakMl < 50 || bardakMl > 500) h.err('"Su bardağı hacmi" 50 ile 500 ml arasında olmalı; tipik değer 200 ml\'dir.');
    const gMl = m[0] / 200;                 // yaklaşık yığın yoğunluğu, g/ml
    const gBardak = gMl * bardakMl;
    const gram = v.yon === 'gram' ? x : x * gBardak;
    const bardak = gram / gBardak;
    const gramSatir = ['Ağırlık', h.fmt(gram, 1) + ' g'];
    const bardakSatir = ['Su bardağı', h.fmt(bardak, 2) + ' su bardağı'];
    return {
      rows: [
        v.yon === 'gram' ? bardakSatir : gramSatir,
        v.yon === 'gram' ? gramSatir : bardakSatir,
        ['Hacim', h.fmt(bardak * bardakMl, 1) + ' ml'],
        ['1 su bardağı ağırlığı', h.fmt(gBardak, 1) + ' g'],
        ['1 yemek kaşığı (15 ml)', h.fmt(gMl * 15, 2) + ' g'],
      ],
      note: `Hesap, ${h.fmt(bardakMl, 0)} ml'lik silme dolu bir bardak ${m[1]} için yaklaşık ${h.fmt(gBardak, 1)} g kabulüne dayanır. Gerçek ağırlık malzemenin türüne, nemine ve bardağın nasıl doldurulduğuna göre değişir.`,
    };
  }
