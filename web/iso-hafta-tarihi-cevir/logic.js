// ISO Hafta Tarihi Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const gunNo = (d) => (d.getUTCDay() + 6) % 7 + 1;
    const utc = (y, m, d) => { const t = new Date(Date.UTC(y, m, d)); t.setUTCFullYear(y); return t; };
    const birinciPazartesi = (y) => { const d4 = utc(y, 0, 4); return h.gunEkle(d4, 1 - gunNo(d4)); };
    const isoBilgi = (d) => {
      const g = gunNo(d);
      const per = h.gunEkle(d, 4 - g);
      const yil = per.getUTCFullYear();
      const hafta = Math.floor(h.gunFarki(utc(yil, 0, 1), per) / 7) + 1;
      return { yil, hafta, g };
    };
    const haftaSayisi = (y) => isoBilgi(utc(y, 11, 28)).hafta;
    let d;
    if (v.yon === 'iso') {
      const y = h.int(v.isoYil, 'ISO yılı');
      if (y < 1583 || y > 9999) h.err('"ISO yılı" 1583 ile 9999 arasında olmalı.');
      const w = h.int(v.isoHafta, 'Hafta numarası');
      const top = haftaSayisi(y);
      if (w < 1 || w > 53) h.err('"Hafta numarası" 1 ile 53 arasında olmalı.');
      if (w > top) h.err(`${y} ISO yılı ${top} hafta sürer; 53. hafta yoktur. Hafta numarasını kontrol edin.`);
      const g = Number(v.isoGun);
      if (!(g >= 1 && g <= 7)) h.err('Haftanın gününü listeden seçin.');
      d = h.gunEkle(birinciPazartesi(y), (w - 1) * 7 + (g - 1));
    } else {
      d = h.date(v.tarih, 'Takvim tarihi');
      if (d.getUTCFullYear() < 1583) h.err('Takvim tarihi 1583 yılından önce olamaz (Miladi takvim öncesi).');
    }
    const b = isoBilgi(d);
    const ww = String(b.hafta).padStart(2, '0');
    const yyyy = String(b.yil).padStart(4, '0');
    const pzt = h.gunEkle(d, 1 - b.g), paz = h.gunEkle(d, 7 - b.g);
    const isoSatir = ['ISO hafta tarihi', `${yyyy}-W${ww}-${b.g}`];
    const tarihSatir = ['Takvim tarihi', `${h.fmtDate(d)} ${h.gunAdi(d)}`];
    return {
      rows: [
        ...(v.yon === 'iso' ? [tarihSatir, isoSatir] : [isoSatir, tarihSatir]),
        ['Kısa gösterim', `${yyyy}-W${ww}`],
        ['ISO yılı', String(b.yil)],
        ['Hafta numarası', String(b.hafta)],
        ['Haftanın günü', `${b.g} (${h.gunAdi(d)})`],
        ['Hafta aralığı', `${h.fmtDate(pzt)} Pazartesi – ${h.fmtDate(paz)} Pazar`],
        ['ISO yılındaki hafta sayısı', String(haftaSayisi(b.yil))],
      ],
      note: b.yil !== d.getUTCFullYear() ? `Dikkat: bu tarih takvim yılı olarak ${d.getUTCFullYear()} yılındadır, ancak ISO hafta yılı ${b.yil} olarak sayılır.` : 'ISO 8601: hafta Pazartesi başlar; yılın ilk Perşembe gününü içeren hafta 1. haftadır.',
    };
  }
