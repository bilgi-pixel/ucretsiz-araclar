// LED Direnç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const u = h.pos(v.kaynak, 'Kaynak gerilimi');
    const vf = h.pos(v.ledGerilim, 'LED ileri gerilimi');
    const ma = h.pos(v.akim, 'LED akımı');
    const n = h.posint(v.adet, 'Seri bağlı LED sayısı');
    if (n > 100) h.err('Seri LED sayısı en fazla 100 olabilir.');
    const toplamVf = vf * n;
    const fark = u - toplamVf;
    if (!(fark > 1e-9)) h.err(`Kaynak gerilimi (${h.fmt(u, 2)} V), LED'lerin toplam ileri geriliminden (${h.fmt(toplamVf, 2)} V) büyük olmalı. LED sayısını azaltın ya da daha yüksek gerilimli kaynak kullanın.`);
    const i = ma / 1000;
    const r = fark / i;
    const e12 = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2, 10];
    const onluk = Math.pow(10, Math.floor(Math.log10(r) + 1e-12));
    let std = 10 * onluk;
    for (const k of e12) {
      if (k * onluk >= r * (1 - 1e-9)) { std = k * onluk; break; }
    }
    std = Number(std.toPrecision(3));
    const gercek = fark / std;
    const pDirenc = gercek * gercek * std;
    const gucler = [0.25, 0.5, 1, 2, 3, 5, 10, 25, 50];
    const onerilen = gucler.find((g) => g >= pDirenc * 2 - 1e-12);
    const rows = [
      ['Gerekli direnç', h.fmt(r, 2) + ' Ω'],
      ['En yakın standart direnç (E12)', h.fmt(std, 2) + ' Ω'],
      ['Standart dirençle LED akımı', h.fmt(gercek * 1000, 2) + ' mA'],
      ['Dirençte harcanan güç', h.fmt(pDirenc * 1000, 1) + ' mW'],
      ['Önerilen direnç gücü', onerilen ? h.fmt(onerilen, 2) + ' W' : 'Bu güç için direnç yerine LED sürücü kullanın'],
      ['Direnç üzerindeki gerilim', h.fmt(fark, 3) + ' V'],
      ['LED\'lerde harcanan güç', h.fmt(toplamVf * gercek * 1000, 1) + ' mW'],
    ];
    return { rows, note: 'Standart değer, akımın hedefi aşmaması için hesaplanan değere eşit ya da ondan büyük ilk E12 direncidir. Önerilen güç, harcanan gücün en az iki katıdır.' };
  }
