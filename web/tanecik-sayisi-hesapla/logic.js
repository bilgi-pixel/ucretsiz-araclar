// Avogadro ile Tanecik Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const NA = 6.02214076e23;
    const x = h.pos(v.miktar, "Değer");
    const mkVar = String(v.molKutle ?? "").trim() !== "";
    const mk = mkVar ? h.pos(v.molKutle, "Molar kütle") : null;
    let mol;
    if (v.tur === "mol") mol = x;
    else if (v.tur === "gram") {
      if (mk === null) h.err("Kütleden tanecik sayısına geçmek için \"Molar kütle\" alanını doldurun.");
      mol = x / mk;
    } else if (v.tur === "tanecik") mol = x / NA;
    else h.err("Bilinen büyüklüğü listeden seçin.");
    const N = v.tur === "tanecik" ? x : mol * NA;
    const sTanecik = ["Tanecik sayısı", h.sig(N, 6) + " tanecik"];
    const sMol = ["Mol sayısı", h.sig(mol, 6) + " mol"];
    const rows = v.tur === "tanecik" ? [sMol, sTanecik] : [sTanecik, sMol];
    if (String(v.atom ?? "").trim() !== "") {
      const a = h.posint(v.atom, "Bir tanecikteki atom sayısı");
      rows.push(["Toplam atom sayısı", h.sig(N * a, 6) + " atom"]);
      rows.push(["Atomların mol sayısı", h.sig(mol * a, 6) + " mol atom"]);
    }
    if (mk !== null) rows.push(["Kütle", h.sig(mol * mk, 6) + " g"]);
    return { rows, note: "Avogadro sayısı 6,02214076 × 10^23 mol^-1 alınmıştır. Sonuçlar altı anlamlı basamakla gösterilir." };
  }
