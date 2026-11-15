// Molalite Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const miktar = h.pos(v.miktar, "Çözünen miktarı");
    let mol = miktar;
    let gram = null;
    if (v.birim !== "mol") {
      if (String(v.molKutle ?? "").trim() === "") h.err("Çözüneni gram olarak yazdınız; mol sayısını bulmak için \"Molar kütle\" alanını da doldurun.");
      const mk = h.pos(v.molKutle, "Molar kütle");
      gram = miktar;
      mol = miktar / mk;
    }
    const c = h.pos(v.cozucu, "Çözücü kütlesi");
    const kg = v.cozucuBirim === "kg" ? c : c / 1000;
    const m = mol / kg;
    const rows = [
      ["Molalite", h.sig(m, 6) + " mol/kg"],
      ["Çözünen madde", h.sig(mol, 6) + " mol"],
      ["Çözücü kütlesi", h.sig(kg, 6) + " kg"],
    ];
    if (gram !== null) {
      rows.push(["Çözelti kütlesi", h.sig(gram + kg * 1000, 6) + " g"]);
      rows.push(["Kütlece yüzde", "%" + h.fmt(gram / (gram + kg * 1000) * 100, 4)]);
    }
    return { rows, note: "Paydada çözeltinin değil yalnızca çözücünün kütlesi kullanılır. Molalite sıcaklık değişiminden etkilenmez." };
  }
