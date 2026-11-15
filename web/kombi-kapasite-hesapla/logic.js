// Kombi Kapasitesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Isıtılacak alan');
    const q = { 70: 70, 100: 100, 130: 130 }[v.yalitim] ?? 100;
    const k = { '0.85': 0.85, 1: 1, '1.2': 1.2 }[v.iklim] ?? 1;
    const tavan = h.opt(v.tavan, 2.7, 'Tavan yüksekliği');
    if (!(tavan > 0)) h.err('"Tavan yüksekliği" sıfırdan büyük olmalı.');
    if (tavan > 10) h.err('"Tavan yüksekliği" metre cinsinden olmalı (örn. 2,7).');
    const pay = h.opt(v.pay, 15, 'Emniyet payı');
    if (pay < 0 || pay > 100) h.err('"Emniyet payı" 0 ile 100 arasında olmalı.');
    const kw = alan * q * (tavan / 2.7) * k * (1 + pay / 100) / 1000;
    const sinif = [24, 28, 35, 42].find((s) => s >= kw - 1e-9);
    return {
      rows: [
        ['Isıtma yükü', h.fmt(kw, 2) + ' kW'],
        ['Isıtma yükü (kcal/saat)', h.fmt(kw * 859.845, 0) + ' kcal/saat'],
        ['Önerilen kombi sınıfı', sinif ? sinif + ' kW' : '42 kW üzeri (kaskad sistem ya da kazan değerlendirin)'],
        ['Metrekare başına yük', h.fmt(kw * 1000 / alan, 1) + ' W/m²'],
      ],
      note: 'Bu bir ön tahmindir; kesin kapasite için bina ısı kaybı hesabı gerekir. Kullanım sıcak suyu ihtiyacı nedeniyle konut kombileri çoğunlukla en az 24 kW sınıfında seçilir.',
    };
  }
