// pH ve pOH Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, "Değer");
    let ph;
    if (v.tur === "h" || v.tur === "oh") {
      if (!(x > 0)) h.err("Derişim sıfırdan büyük olmalı; logaritma sıfır ve negatif sayılar için tanımsızdır.");
      const p = -Math.log10(x);
      ph = v.tur === "h" ? p : 14 - p;
    } else if (v.tur === "ph") ph = x;
    else if (v.tur === "poh") ph = 14 - x;
    else h.err("Bilinen değerin türünü listeden seçin.");
    if (ph < -2 || ph > 16) h.err("Sonuç gerçekçi pH aralığının (yaklaşık −2 ile 16) dışında kalıyor. Yazdığınız değeri ve türünü kontrol edin.");
    const poh = 14 - ph;
    const hc = Math.pow(10, -ph);
    const ohc = Math.pow(10, -poh);
    const ortam = Math.abs(ph - 7) < 1e-9 ? "Nötr" : ph < 7 ? "Asidik" : "Bazik";
    return {
      rows: [
        ["pH", h.fmt(ph, 4)],
        ["pOH", h.fmt(poh, 4)],
        ["[H+] derişimi", h.sig(hc, 4) + " mol/L"],
        ["[OH−] derişimi", h.sig(ohc, 4) + " mol/L"],
        ["Ortam", ortam],
      ],
      note: "25 °C'de suyun iyonlaşma sabiti 1 × 10^-14 alınmıştır (pH + pOH = 14). Derişim yerine aktiflik gerektiren çok derişik çözeltilerde sonuç yaklaşık kalır.",
    };
  }
