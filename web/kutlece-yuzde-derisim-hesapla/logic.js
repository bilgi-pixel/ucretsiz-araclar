// Kütlece Yüzde Derişim Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let cozunen, cozucu, cozelti, yuzde;
    const yuzdeAl = () => {
      const y = h.pos(v.yuzde, "Kütlece yüzde");
      if (y >= 100) h.err("Kütlece yüzde 100'den küçük olmalı; %100 çözücü içermeyen saf madde demektir.");
      return y;
    };
    if (v.mod === "yuzde") {
      cozunen = h.pos(v.cozunen, "Çözünen kütlesi");
      cozucu = h.pos(v.cozucu, "Çözücü kütlesi");
      cozelti = cozunen + cozucu;
      yuzde = cozunen / cozelti * 100;
    } else if (v.mod === "cozunen") {
      yuzde = yuzdeAl();
      cozelti = h.pos(v.cozelti, "Çözelti kütlesi");
      cozunen = cozelti * yuzde / 100;
      cozucu = cozelti - cozunen;
    } else if (v.mod === "cozucu") {
      cozunen = h.pos(v.cozunen, "Çözünen kütlesi");
      yuzde = yuzdeAl();
      cozelti = cozunen * 100 / yuzde;
      cozucu = cozelti - cozunen;
    } else h.err("Hesap türünü listeden seçin.");
    const s = {
      yuzde: ["Kütlece yüzde derişim", "%" + h.fmt(yuzde, 4)],
      cozunen: ["Çözünen kütlesi", h.fmt(cozunen, 4) + " g"],
      cozucu: ["Çözücü kütlesi", h.fmt(cozucu, 4) + " g"],
      cozelti: ["Çözelti kütlesi", h.fmt(cozelti, 4) + " g"],
    };
    const sira = v.mod === "yuzde" ? ["yuzde", "cozelti", "cozunen", "cozucu"] : v.mod === "cozunen" ? ["cozunen", "cozucu", "cozelti", "yuzde"] : ["cozucu", "cozelti", "cozunen", "yuzde"];
    const rows = sira.map((k) => s[k]);
    rows.push(["100 g çözücü başına çözünen", h.fmt(cozunen / cozucu * 100, 4) + " g"]);
    return { rows, note: "Tüm kütleler aynı birimde olmalıdır. Gram yerine kilogram yazarsanız sonuçtaki kütleleri de kilogram olarak okuyun; yüzde değişmez." };
  }
