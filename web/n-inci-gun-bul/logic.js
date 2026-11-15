// Ayın N'inci Haftasının Günü Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = h.int(v.yil, 'Yıl');
    if (y < 1583 || y > 9999) h.err('"Yıl" 1583 ile 9999 arasında olmalı.');
    const ay = Number(v.ay), gun = Number(v.gun);
    if (!Number.isInteger(ay) || ay < 1 || ay > 12) h.err('Listeden geçerli bir ay seçin.');
    if (!Number.isInteger(gun) || gun < 1 || gun > 7) h.err('Listeden haftanın bir gününü seçin.');
    const son = v.sira === 'son';
    const sira = son ? 0 : Number(v.sira);
    if (!son && (!Number.isInteger(sira) || sira < 1 || sira > 5)) h.err('Listeden geçerli bir sıra seçin.');
    const ilk = new Date(Date.UTC(2000, ay - 1, 1));
    ilk.setUTCFullYear(y);
    const sonraki = new Date(Date.UTC(2000, ay % 12, 1));
    sonraki.setUTCFullYear(ay === 12 ? y + 1 : y);
    const uzunluk = h.gunFarki(ilk, sonraki);
    const hedef = gun % 7; // JS: 0 = Pazar
    const ilkGun = 1 + ((hedef - ilk.getUTCDay() + 7) % 7);
    const gunler = [];
    for (let d = ilkGun; d <= uzunluk; d += 7) gunler.push(d);
    const adlar = ['', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    if (!son && sira > gunler.length) {
      h.err(`${h.ayAdi(ay)} ${y} ayında yalnızca ${gunler.length} ${adlar[gun]} var; beşincisi yok. "Sonuncu" seçeneğini ya da daha küçük bir sıra seçin.`);
    }
    const g = son ? gunler[gunler.length - 1] : gunler[sira - 1];
    const tarih = h.gunEkle(ilk, g - 1);
    const yilBasi = new Date(Date.UTC(2000, 0, 1));
    yilBasi.setUTCFullYear(y);
    return {
      rows: [
        ['Tarih', `${h.fmtDate(tarih)} ${h.gunAdi(tarih)}`],
        ['Tanım', `${h.ayAdi(ay)} ${y} ayının ${son ? 'son' : sira + '.'} ${adlar[gun]} günü`],
        ['Ay içindeki aynı günler', `${gunler.join(', ')} (${gunler.length} kez)`],
        ['Yılın kaçıncı günü', `${h.gunFarki(yilBasi, tarih) + 1}. gün`],
        ['Ay sonuna kalan', `${uzunluk - g} gün`],
      ],
      note: 'Sıra, ayın içinde o günün kaçıncı kez geldiğine göre sayılır; takvim haftası satırına göre değil. Örneğin ay cumartesi başlıyorsa ilk pazartesi ayın 3\'üdür.',
    };
  }
