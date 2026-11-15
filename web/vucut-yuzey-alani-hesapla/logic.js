// Vücut Yüzey Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const boy = h.pos(v.boy, 'Boy');
    const kilo = h.pos(v.kilo, 'Kilo');
    if (boy < 30 || boy > 250) h.err('Boy 30 ile 250 cm arasında olmalı; metre yerine santimetre yazın (1,70 değil 170).');
    if (kilo < 1 || kilo > 400) h.err('Kilo 1 ile 400 kg arasında olmalı.');
    const mosteller = Math.sqrt(boy * kilo / 3600);
    const dubois = 0.007184 * Math.pow(kilo, 0.425) * Math.pow(boy, 0.725);
    const haycock = 0.024265 * Math.pow(kilo, 0.5378) * Math.pow(boy, 0.3964);
    const ort = (mosteller + dubois + haycock) / 3;
    return {
      rows: [
        ['Vücut yüzey alanı (Mosteller)', h.fix(mosteller, 2) + ' m²'],
        ['Du Bois formülü', h.fix(dubois, 2) + ' m²'],
        ['Haycock formülü', h.fix(haycock, 2) + ' m²'],
        ['Üç formülün ortalaması', h.fix(ort, 2) + ' m²'],
        ['Santimetrekare olarak (Mosteller)', h.fmt(mosteller * 10000, 0) + ' cm²'],
      ],
      note: 'İlaç dozu gibi tıbbi kararlar yalnızca hekim ve eczacı tarafından verilir; bu sonuç bilgilendirme amaçlıdır.',
    };
  }
