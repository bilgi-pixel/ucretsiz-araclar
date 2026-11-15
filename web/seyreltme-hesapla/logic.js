// Seyreltme Hesaplama (M1V1 = M2V2) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const b = v.bilinmeyen;
    const ad = { m1: "Stok derişimi (M1)", v1: "Stok hacmi (V1)", m2: "Son derişim (M2)", v2: "Son hacim (V2)" };
    const d = {};
    for (const k of ["m1", "v1", "m2", "v2"]) if (k !== b) d[k] = h.pos(v[k], ad[k]);
    if (b === "v1") d.v1 = d.m2 * d.v2 / d.m1;
    else if (b === "m2") d.m2 = d.m1 * d.v1 / d.v2;
    else if (b === "v2") d.v2 = d.m1 * d.v1 / d.m2;
    else if (b === "m1") d.m1 = d.m2 * d.v2 / d.v1;
    else h.err("Hesaplanacak değeri listeden seçin.");
    if (d.m2 > d.m1 * (1 + 1e-9)) h.err("Son derişim stok derişiminden büyük olamaz; seyreltme derişimi yalnızca düşürür. Değerleri kontrol edin.");
    if (d.v1 > d.v2 * (1 + 1e-9)) h.err("Stok hacmi son hacimden büyük olamaz. V1 ve V2 değerlerini kontrol edin.");
    const u = v.hacimBirim === "L" ? "L" : "mL";
    const satir = {
      m1: [ad.m1, h.sig(d.m1, 6)],
      v1: [ad.v1, h.sig(d.v1, 6) + " " + u],
      m2: [ad.m2, h.sig(d.m2, 6)],
      v2: [ad.v2, h.sig(d.v2, 6) + " " + u],
    };
    const rows = [satir[b]];
    for (const k of ["m1", "v1", "m2", "v2"]) if (k !== b) rows.push(satir[k]);
    const ek = Math.max(0, d.v2 - d.v1);
    rows.push(["Eklenecek çözücü", h.sig(ek, 6) + " " + u]);
    rows.push(["Seyreltme katsayısı", h.sig(d.v2 / d.v1, 6) + " kat"]);
    return { rows, note: "Derişimler aynı birimde yazılmalıdır; sonuç da o birimdedir. Eklenecek çözücü, hacimlerin toplanabilir olduğu varsayımıyla V2 − V1 olarak verilir." };
  }
