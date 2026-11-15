// Jeneratör Gücü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const liste = h.nums(v.yukler, 'Cihaz güçleri');
    if (liste.some((x) => x < 0)) h.err('Cihaz güçleri negatif olamaz.');
    const toplam = liste.reduce((a, b) => a + b, 0);
    if (!(toplam > 0)) h.err('Toplam güç sıfırdan büyük olmalı; en az bir cihazın gücünü yazın.');
    const motor = h.opt(v.motor, 0, 'En büyük motorlu cihazın gücü');
    if (motor < 0) h.err('Motor gücü negatif olamaz.');
    if (motor > toplam + 1e-9) h.err('Motorlu cihazın gücü toplamdan büyük olamaz; bu cihazı "Cihaz güçleri" listesine de ekleyin.');
    const k = h.opt(v.katsayi, 3, 'Kalkış katsayısı');
    if (k < 1 || k > 10) h.err('Kalkış katsayısı 1 ile 10 arasında olmalı.');
    const cosfi = h.opt(v.cosfi, 0.8, 'Güç faktörü');
    if (!(cosfi > 0) || cosfi > 1) h.err('Güç faktörü 0 ile 1 arasında olmalı (örn. 0,8).');
    const pay = h.opt(v.pay, 20, 'Yedek pay');
    if (pay < 0 || pay > 200) h.err('Yedek pay %0 ile %200 arasında olmalı.');
    const tepe = toplam + motor * (k - 1);
    const surekli = toplam * (1 + pay / 100);
    const secim = Math.max(tepe, surekli);
    const kva = secim / cosfi / 1000;
    return {
      rows: [
        ['Önerilen en düşük jeneratör gücü', h.fmt(kva, 2) + ' kVA'],
        ['Karşılık gelen aktif güç', h.fmt(secim / 1000, 2) + ' kW'],
        ['Toplam çalışma gücü', h.fmt(toplam, 0) + ' W'],
        ['Kalkış anındaki tepe yük', h.fmt(tepe, 0) + ' W'],
        ['Yedek paylı sürekli güç', h.fmt(surekli, 0) + ' W'],
        ['Belirleyici ölçüt', tepe > surekli + 1e-9 ? 'Motor kalkış yükü' : 'Sürekli yük ve yedek pay'],
        ['Cihaz sayısı', liste.length + ' adet'],
      ],
      note: 'Sonuç, tepe yük ile yedek paylı sürekli yükten büyük olanına göre verilir ve temkinli bir alt sınırdır. Piyasadaki bir üst standart güce yuvarlayın; kesin seçim için cihaz etiketlerine ve üretici verilerine bakın.',
    };
  }
