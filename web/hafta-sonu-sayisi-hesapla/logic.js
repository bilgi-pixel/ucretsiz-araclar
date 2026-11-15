// İki Tarih Arası Hafta Sonu Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.date(v.baslangic, 'Başlangıç tarihi');
    const b = h.date(v.bitis, 'Bitiş tarihi');
    if (b.getTime() < a.getTime()) h.err('Bitiş tarihi başlangıç tarihinden önce olamaz. İki tarihin yerini değiştirin.');
    const n = h.gunFarki(a, b) + 1;
    const ilk = a.getUTCDay(); // 0 = Pazar … 6 = Cumartesi
    const tam = Math.floor(n / 7), artan = n % 7;
    const say = (g) => tam + (((g - ilk + 7) % 7) < artan ? 1 : 0);
    const cmt = say(6), paz = say(0);
    const cift = cmt - (b.getUTCDay() === 6 ? 1 : 0);
    const haftaSonu = cmt + paz;
    return {
      rows: [
        ['Hafta sonu günü', h.fmt(haftaSonu, 0) + ' gün'],
        ['Cumartesi sayısı', h.fmt(cmt, 0)],
        ['Pazar sayısı', h.fmt(paz, 0)],
        ['Tam hafta sonu (Cumartesi + Pazar)', h.fmt(cift, 0)],
        ['Hafta içi gün', h.fmt(n - haftaSonu, 0) + ' gün'],
        ['Toplam gün', h.fmt(n, 0) + ' gün'],
        ['Dönem', h.fmtDate(a) + ' ' + h.gunAdi(a) + ' – ' + h.fmtDate(b) + ' ' + h.gunAdi(b)],
      ],
      note: 'Başlangıç ve bitiş günleri dahildir. Resmî tatiller ve idari izinler hesaba katılmaz; hafta içi sayısı yalnızca pazartesi–cuma günlerini gösterir.',
    };
  }
