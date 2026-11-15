// Şerit LED Güç Kaynağı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const l = h.pos(v.uzunluk, 'Şerit uzunluğu');
    const wm = h.pos(v.wm, 'Metre başına güç');
    const u = v.gerilim === '24' ? 24 : v.gerilim === '5' ? 5 : 12;
    const pay = h.opt(v.pay, 20, 'Yedek pay');
    if (pay < 0 || pay > 100) h.err('Yedek pay %0 ile %100 arasında olmalı.');
    const p = l * wm;
    const i = p / u;
    const pOn = p * (1 + pay / 100);
    const iOn = pOn / u;
    const sinir = u === 24 ? 10 : 5;
    let note = 'Adaptörü hesaplanan değere eşit ya da bir üst standart güçte seçin. Adaptör gerilimi şeridin gerilimiyle aynı olmalıdır.';
    if (l > sinir + 1e-9) note += ' Şerit ' + sinir + ' metreden uzun olduğu için tek uçtan beslemede uçta parlaklık düşebilir; şeridi iki uçtan ya da ara noktalardan besleyin.';
    return {
      rows: [
        ['Önerilen en düşük adaptör gücü', h.fmt(pOn, 1) + ' W'],
        ['Önerilen en düşük adaptör akımı', h.fmt(iOn, 2) + ' A'],
        ['Şeridin toplam gücü', h.fmt(p, 2) + ' W'],
        ['Şeridin çektiği akım', h.fmt(i, 2) + ' A'],
        ['Çalışma gerilimi', u + ' V DC'],
      ],
      note,
    };
  }
