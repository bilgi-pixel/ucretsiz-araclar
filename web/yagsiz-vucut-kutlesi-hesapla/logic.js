// Yağsız Vücut Kütlesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    const boy = h.pos(v.boy, 'Boy');
    if (kilo < 20 || kilo > 300) h.err('Kilo 20 ile 300 kg arasında olmalı; formüller yetişkinler içindir.');
    if (boy < 100 || boy > 250) h.err('Boy 100 ile 250 cm arasında olmalı; metre yerine santimetre yazın (1,80 değil 180).');
    const erkek = v.cinsiyet !== 'kadin';
    const boer = erkek ? 0.407 * kilo + 0.267 * boy - 19.2 : 0.252 * kilo + 0.473 * boy - 48.3;
    const k2 = (kilo / boy) * (kilo / boy);
    const james = erkek ? 1.1 * kilo - 128 * k2 : 1.07 * kilo - 148 * k2;
    const hume = erkek ? 0.3281 * kilo + 0.33929 * boy - 29.5336 : 0.29569 * kilo + 0.41813 * boy - 43.2933;
    const yaz = (x) => (x > 0 && x < kilo ? h.fix(x, 1) + ' kg' : '— (bu ölçülerde formül geçersiz)');
    const yagVar = String(v.yagOrani ?? '').trim() !== '';
    let lbm, yontem;
    if (yagVar) {
      const yag = h.num(v.yagOrani, 'Vücut yağ oranı');
      if (yag < 2 || yag > 70) h.err('Vücut yağ oranı %2 ile %70 arasında olmalı.');
      lbm = kilo * (1 - yag / 100);
      yontem = 'Girilen yağ oranından';
    } else {
      lbm = boer;
      yontem = 'Boer formülü (tahmin)';
      if (!(lbm > 0 && lbm < kilo)) h.err('Bu boy ve kilo birleşimi için formül anlamlı sonuç vermiyor; değerleri kontrol edin ya da yağ oranınızı girin.');
    }
    return {
      rows: [
        ['Yağsız vücut kütlesi', h.fix(lbm, 1) + ' kg'],
        ['Yöntem', yontem],
        ['Yağ kütlesi', h.fix(kilo - lbm, 1) + ' kg'],
        ['Yağsız kütle oranı', '%' + h.fix(lbm / kilo * 100, 1)],
        ['Boer formülü', yaz(boer)],
        ['James formülü', yaz(james)],
        ['Hume formülü', yaz(hume)],
      ],
      note: yagVar
        ? 'Sonuç, yazdığınız yağ oranının doğruluğu kadar doğrudur. Formül satırları karşılaştırma içindir.'
        : 'Formüller ortalama yapıdaki yetişkinler için tahmin verir; çok kaslı ya da çok kilolu kişilerde sapma büyür.',
    };
  }
