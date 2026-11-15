// PPM Derişim Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.cozunen, "Çözünen miktarı");
    const b = h.pos(v.cozelti, "Çözelti miktarı");
    const mgKat = { mg: 1, g: 1000, ug: 0.001, kg: 1e6 }[v.cozunenBirim];
    const kgKat = { kg: 1, g: 0.001, L: 1, mL: 0.001 }[v.cozeltiBirim];
    if (!mgKat || !kgKat) h.err("Birimleri listeden seçin.");
    const mg = a * mgKat;
    const kg = b * kgKat;
    const ppm = mg / kg;
    if (ppm > 1e6 * (1 + 1e-9)) h.err("Çözünen miktarı çözeltinin tamamından büyük olamaz. Miktarları ve birimleri kontrol edin.");
    const hacim = v.cozeltiBirim === "L" || v.cozeltiBirim === "mL";
    return {
      rows: [
        ["Derişim", h.sig(ppm, 6) + " ppm"],
        ["ppb karşılığı", h.sig(ppm * 1000, 6) + " ppb"],
        ["Kütlece yüzde", "%" + h.sig(ppm / 10000, 6)],
        [hacim ? "Litre başına" : "Kilogram başına", h.sig(ppm, 6) + (hacim ? " mg/L" : " mg/kg")],
      ],
      note: hacim
        ? "Hacim girdisinde çözeltinin yoğunluğu 1 kg/L kabul edilmiştir; bu varsayım seyreltik sulu çözeltiler için uygundur."
        : "Kütle temelli ppm: 1 ppm = 1 kilogram çözeltide 1 miligram çözünen.",
    };
  }
