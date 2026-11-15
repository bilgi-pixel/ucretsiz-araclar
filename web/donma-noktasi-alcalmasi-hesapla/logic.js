// Donma Noktası Alçalması Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tablo = { su: [1.86, 0], benzen: [5.12, 5.5], etanol: [1.99, -114.6], kloroform: [4.68, -63.5], asetik: [3.9, 16.6] };
    let kd, t0 = null;
    if (v.cozucu === "ozel") {
      if (String(v.kd ?? "").trim() === "") h.err("\"Diğer\" çözücü için \"Özel Kd sabiti\" alanını doldurun.");
      kd = h.pos(v.kd, "Özel Kd sabiti");
      if (String(v.td ?? "").trim() !== "") t0 = h.num(v.td, "Saf çözücünün donma noktası");
    } else if (tablo[v.cozucu]) { kd = tablo[v.cozucu][0]; t0 = tablo[v.cozucu][1]; }
    else h.err("Çözücüyü listeden seçin.");
    const m = h.pos(v.molalite, "Molalite");
    const i = h.opt(v.i, 1, "Van't Hoff faktörü");
    if (!(i > 0)) h.err("\"Van't Hoff faktörü\" sıfırdan büyük olmalı; iyonlaşmayan maddeler için 1 yazın.");
    const dT = i * kd * m;
    const rows = [["Donma noktası alçalması", h.fmt(dT, 4) + " °C"]];
    if (t0 !== null) {
      rows.push(["Çözeltinin donma noktası", h.fmt(t0 - dT, 4) + " °C"]);
      rows.push(["Saf çözücünün donma noktası", h.fmt(t0, 4) + " °C"]);
    }
    rows.push(["Kullanılan Kd sabiti", h.fmt(kd, 4) + " °C·kg/mol"]);
    rows.push(["Etkin tanecik derişimi", h.fmt(i * m, 4) + " mol/kg"]);
    return { rows, note: "Bağıntı seyreltik çözeltiler için geçerlidir; derişik çözeltilerde (antifriz karışımları, doymuşa yakın tuzlu su) gerçek donma noktası hesaplanandan sapar." };
  }
