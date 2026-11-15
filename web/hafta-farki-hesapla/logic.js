// İki Tarih Arası Hafta Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let a = h.date(v.baslangic, 'Başlangıç tarihi');
    let b = h.date(v.bitis, 'Bitiş tarihi');
    let ters = false;
    if (b.getTime() < a.getTime()) { const t = a; a = b; b = t; ters = true; }
    const gun = h.gunFarki(a, b) + (v.dahil === 'evet' ? 1 : 0);
    const hafta = Math.floor(gun / 7);
    const artan = gun - hafta * 7;
    // ISO 8601 hafta numarası: hafta pazartesi başlar, 1. hafta yılın ilk perşembesini içeren haftadır.
    const isoHafta = (d) => {
      const pzt = (d.getUTCDay() + 6) % 7;
      const per = h.gunEkle(d, 3 - pzt);
      const y = per.getUTCFullYear();
      const ilk = new Date(Date.UTC(2000, 0, 1));
      ilk.setUTCFullYear(y);
      return `${y} yılının ${Math.floor(h.gunFarki(ilk, per) / 7) + 1}. haftası`;
    };
    return {
      rows: [
        ['Tam hafta sayısı', `${h.fmt(hafta, 0)} hafta`],
        ['Hafta ve gün', `${h.fmt(hafta, 0)} hafta ${artan} gün`],
        ['Toplam gün', `${h.fmt(gun, 0)} gün`],
        ['Ondalık hafta', `${h.fmt(gun / 7, 4)} hafta`],
        ['Başlangıç tarihi', `${h.fmtDate(a)} ${h.gunAdi(a)}, ${isoHafta(a)}`],
        ['Bitiş tarihi', `${h.fmtDate(b)} ${h.gunAdi(b)}, ${isoHafta(b)}`],
      ],
      note: (ters ? 'Bitiş tarihi başlangıçtan önce olduğu için tarihler yer değiştirilerek hesaplandı. ' : '')
        + 'Hafta numaraları ISO 8601 kuralına göredir: hafta pazartesi başlar, yılın ilk perşembesini içeren hafta 1. haftadır.',
    };
  }
