// Akvaryum Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const boy = h.pos(v.boy, 'Boy');
    const en = h.pos(v.en, 'En');
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const cam = h.nonneg(h.opt(v.cam, 0, 'Cam kalınlığı') + '', 'Cam kalınlığı') / 10;
    const bosluk = h.nonneg(h.opt(v.bosluk, 0, 'Üstten boşluk') + '', 'Üstten boşluk');
    const dekor = h.nonneg(h.opt(v.dekor, 0, 'Kum ve dekor payı') + '', 'Kum ve dekor payı');
    if (dekor >= 100) h.err('Kum ve dekor payı yüzde 100\'den küçük olmalı.');
    const icBoy = boy - 2 * cam;
    const icEn = en - 2 * cam;
    const suYuk = yuk - cam - bosluk;
    if (icBoy <= 0 || icEn <= 0) h.err('Cam kalınlığı ölçülere göre çok büyük. Cam kalınlığını milimetre, diğer ölçüleri santimetre olarak yazın.');
    if (suYuk <= 0) h.err('Üstten boşluk ve cam kalınlığı toplamı yükseklikten küçük olmalı.');
    const brut = boy * en * yuk / 1000;
    const dolu = icBoy * icEn * suYuk / 1000;
    const net = dolu * (1 - dekor / 100);
    return {
      rows: [
        ['Net su hacmi', h.fmt(net, 1) + ' L'],
        ['Brüt hacim (dış ölçü)', h.fmt(brut, 1) + ' L'],
        ['Su ağırlığı (tatlı su)', h.fmt(net, 1) + ' kg'],
        ['Su yüksekliği', h.fmt(suYuk, 1) + ' cm'],
        ['Taban alanı (iç)', h.fmt(icBoy * icEn, 0) + ' cm²'],
      ],
      note: 'Tatlı suyun 1 litresi yaklaşık 1 kg kabul edilmiştir. Camın, kumun, taşların ve sehpanın ağırlığı su ağırlığına dahil değildir.',
    };
  }
