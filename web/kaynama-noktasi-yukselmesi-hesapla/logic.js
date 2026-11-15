// Kaynama Noktası Yükselmesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tablo = { su: [0.512, 100], benzen: [2.53, 80.1], etanol: [1.22, 78.4], kloroform: [3.63, 61.2], asetik: [3.07, 118.1] };
    let kk, t0 = null;
    if (v.cozucu === "ozel") {
      if (String(v.kk ?? "").trim() === "") h.err("\"Diğer\" çözücü için \"Özel Kk sabiti\" alanını doldurun.");
      kk = h.pos(v.kk, "Özel Kk sabiti");
      if (String(v.tk ?? "").trim() !== "") t0 = h.num(v.tk, "Saf çözücünün kaynama noktası");
    } else if (tablo[v.cozucu]) { kk = tablo[v.cozucu][0]; t0 = tablo[v.cozucu][1]; }
    else h.err("Çözücüyü listeden seçin.");
    const m = h.pos(v.molalite, "Molalite");
    const i = h.opt(v.i, 1, "Van't Hoff faktörü");
    if (!(i > 0)) h.err("\"Van't Hoff faktörü\" sıfırdan büyük olmalı; iyonlaşmayan maddeler için 1 yazın.");
    const dT = i * kk * m;
    const rows = [["Kaynama noktası yükselmesi", h.fmt(dT, 4) + " °C"]];
    if (t0 !== null) {
      rows.push(["Çözeltinin kaynama noktası", h.fmt(t0 + dT, 4) + " °C"]);
      rows.push(["Saf çözücünün kaynama noktası", h.fmt(t0, 4) + " °C"]);
    }
    rows.push(["Kullanılan Kk sabiti", h.fmt(kk, 4) + " °C·kg/mol"]);
    rows.push(["Etkin tanecik derişimi", h.fmt(i * m, 4) + " mol/kg"]);
    return { rows, note: "Kaynama noktaları 1 atm dış basınç içindir. Bağıntı seyreltik çözeltiler ve uçucu olmayan çözünenler için geçerlidir; derişik çözeltilerde gerçek değer sapar." };
  }
