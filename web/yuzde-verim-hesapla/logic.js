// Yüzde Verim Hesaplama (Kimya) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let gercek, teorik, yuzde;
    const yuzdeAl = () => {
      const y = h.pos(v.yuzde, "Yüzde verim");
      if (y > 100) h.err("Yüzde verim 100'den büyük girilemez; teorik verim elde edilebilecek en yüksek miktardır.");
      return y;
    };
    if (v.mod === "verim") {
      gercek = h.nonneg(v.gercek, "Gerçek verim");
      teorik = h.pos(v.teorik, "Teorik verim");
      yuzde = gercek / teorik * 100;
    } else if (v.mod === "gercek") {
      teorik = h.pos(v.teorik, "Teorik verim");
      yuzde = yuzdeAl();
      gercek = teorik * yuzde / 100;
    } else if (v.mod === "teorik") {
      gercek = h.pos(v.gercek, "Gerçek verim");
      yuzde = yuzdeAl();
      teorik = gercek * 100 / yuzde;
    } else h.err("Hesap türünü listeden seçin.");
    const u = { g: "g", kg: "kg", mol: "mol", L: "L" }[v.birim] || "g";
    const s = {
      verim: ["Yüzde verim", "%" + h.fmt(yuzde, 4)],
      gercek: ["Gerçek verim", h.fmt(gercek, 4) + " " + u],
      teorik: ["Teorik verim", h.fmt(teorik, 4) + " " + u],
    };
    const rows = [s[v.mod]];
    for (const k of ["verim", "gercek", "teorik"]) if (k !== v.mod) rows.push(s[k]);
    rows.push(["Kayıp (elde edilemeyen ürün)", h.fmt(Math.max(0, teorik - gercek), 4) + " " + u]);
    const fazla = yuzde > 100 + 1e-9;
    return {
      rows,
      note: fazla
        ? "Verim %100'ün üzerinde çıktı. Bu, gerçekte mümkün değildir; ürün yeterince kurutulmamış ya da saf olmayabilir, tartım ya da teorik verim hesabı hatalı olabilir."
        : "Gerçek ve teorik verim aynı birimde olmalıdır. Teorik verim, sınırlayıcı bileşene göre stokiyometriyle hesaplanan en yüksek ürün miktarıdır.",
    };
  }
