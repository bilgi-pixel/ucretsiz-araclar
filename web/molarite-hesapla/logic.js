// Molarite Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const miktar = h.pos(v.miktar, "Çözünen miktarı");
    let mol = miktar;
    let mk = null;
    if (v.birim === "g") {
      if (String(v.molKutle ?? "").trim() === "") h.err("Çözüneni gram olarak yazdınız; mol sayısına geçebilmek için \"Molar kütle\" alanını da doldurun.");
      mk = h.pos(v.molKutle, "Molar kütle");
      mol = miktar / mk;
    }
    const hacim = h.pos(v.hacim, "Çözelti hacmi");
    const litre = v.hacimBirim === "mL" ? hacim / 1000 : hacim;
    const M = mol / litre;
    const rows = [
      ["Molarite", h.sig(M, 6) + " mol/L"],
      ["Çözünen madde", h.sig(mol, 6) + " mol"],
      ["Çözelti hacmi", h.sig(litre, 6) + " L"],
      ["Milimolar karşılığı", h.sig(M * 1000, 6) + " mmol/L"],
    ];
    if (mk !== null) rows.push(["Litre başına kütle", h.sig(miktar / litre, 6) + " g/L"]);
    return { rows, note: "Hacim, çözücünün değil hazırlanan çözeltinin toplam hacmidir. Molarite sıcaklıkla az da olsa değişir." };
  }
