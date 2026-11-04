// Metrekare (alan) ve malzeme ihtiyacı hesabı — saf mantık (DOM yok).

/** Varsayılan parametreler (sabit dönüşüm katsayıları). Yıllık değişmez; yine de tarihli tutulur. */
export const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: 'Uluslararası birim sistemi katsayıları: 1 dönüm = 1.000 m² (resmî ölçü), 1 hektar = 10.000 m², 1 ar = 100 m², 1 ft = 0,3048 m. Yerel "dönüm" ölçüleri bölgeden bölgeye farklı olabilir.',
  yaklasik: false,
  uzunluk: { m: 1, cm: 0.01, ft: 0.3048 },
  alanM2: { m2: 1, donum: 1000, hektar: 10000, ar: 100, ft2: 0.09290304 },
  fireVarsayilan: 10,
  boyaVerim: 10, // 1 litre boya ~10 m² (tek kat), ürüne göre değişir
};

/** Sayıyı ("-3,5" dahil) çözer; geçersizse NaN. */
export function num(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!/^-?[0-9.,]+$/.test(t)) return NaN;
  const neg = t.startsWith('-'); if (neg) t = t.slice(1);
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if (!/^\d*\.?\d+$/.test(t)) return NaN;
  return neg ? -Number(t) : Number(t);
}

const pos = (v, ad) => {
  if (!(v > 0) || !Number.isFinite(v)) throw new Error(`${ad} geçersiz. Sıfırdan büyük bir sayıyı rakamla yazın (örnek: 4,5).`);
  return v;
};

/** İki doğru parçası kesişiyor mu (uç noktalar paylaşılan komşu kenarlar hariç tutulur). */
function segIntersect(p1, p2, p3, p4) {
  const o = (a, b, c) => Math.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
  const on = (a, b, c) => Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
  const o1 = o(p1, p2, p3), o2 = o(p1, p2, p4), o3 = o(p3, p4, p1), o4 = o(p3, p4, p2);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && on(p1, p2, p3)) return true;
  if (o2 === 0 && on(p1, p2, p4)) return true;
  if (o3 === 0 && on(p3, p4, p1)) return true;
  if (o4 === 0 && on(p3, p4, p2)) return true;
  return false;
}

/** Çokgen köşe metnini çözer. Satır başına bir köşe: "x,y", "x y" ya da "x;y". */
export function parsePolygon(text) {
  const pts = [];
  const lines = String(text || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  for (const [i, line] of lines.entries()) {
    let parts;
    if (line.includes(';')) parts = line.split(';');
    else if (/\s/.test(line)) parts = line.split(/\s+/);
    else parts = line.split(',');
    if (parts.length !== 2) throw new Error(`${i + 1}. satırdaki köşe okunamadı. Her satıra bir köşe yazın: "x,y" ya da "x y" (örnek: 4 3).`);
    const x = num(parts[0]), y = num(parts[1]);
    if (Number.isNaN(x) || Number.isNaN(y)) throw new Error(`${i + 1}. satırdaki sayılar geçersiz. Yalnızca rakam, nokta ve virgül kullanın (örnek: 4,5 3).`);
    pts.push({ x, y });
  }
  if (pts.length > 1 && pts[0].x === pts[pts.length - 1].x && pts[0].y === pts[pts.length - 1].y) pts.pop(); // kapanış köşesi tekrarı
  if (pts.length < 3) throw new Error('Çokgen için en az 3 köşe gerekir. Her satıra bir köşe yazarak köşeleri ekleyin.');
  if (pts.length > 500) throw new Error('En fazla 500 köşe girilebilir. Köşe sayısını azaltın.');
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue; // komşu kenarlar
      if (segIntersect(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n])) throw new Error('Kenarlar birbirini kesiyor (8 şeklinde). Köşeleri saat yönünde ya da tersi yönde, sırayla yazdığınızdan emin olun.');
    }
  }
  return pts;
}

/**
 * Şekle göre alan (m²) ve çevre (m) hesaplar.
 * shape: 'dik' | 'l' | 'ucgen' | 'ucgen3' | 'daire' | 'cokgen' | 'dogrudan'; v: girdi nesnesi (metin değerleri), unit: 'm'|'cm'|'ft'.
 */
export function computeArea(shape, v, unit = 'm', P = DEFAULTS) {
  const k = P.uzunluk[unit] ?? 1;
  const L = (s, ad) => pos(num(s), ad) * k;
  let area, perimeter = null, label;
  switch (shape) {
    case 'dik': {
      const a = L(v.a, 'En'), b = L(v.b, 'Boy');
      area = a * b; perimeter = 2 * (a + b); label = 'Dikdörtgen/kare';
      break;
    }
    case 'l': {
      const a1 = L(v.a1, '1. parçanın eni'), b1 = L(v.b1, '1. parçanın boyu'), a2 = L(v.a2, '2. parçanın eni'), b2 = L(v.b2, '2. parçanın boyu');
      area = a1 * b1 + a2 * b2; label = 'L şekli (iki dikdörtgen)';
      break;
    }
    case 'ucgen': {
      const t = L(v.t, 'Taban'), h = L(v.h, 'Yükseklik');
      area = (t * h) / 2; label = 'Üçgen (taban × yükseklik)';
      break;
    }
    case 'ucgen3': {
      const a = L(v.a, '1. kenar'), b = L(v.b, '2. kenar'), c = L(v.c, '3. kenar');
      if (a + b <= c || a + c <= b || b + c <= a) throw new Error('Bu üç kenar bir üçgen oluşturmaz (iki kenarın toplamı üçüncüden büyük olmalı). Ölçüleri kontrol edin.');
      const s = (a + b + c) / 2;
      area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); perimeter = a + b + c; label = 'Üçgen (üç kenar)';
      break;
    }
    case 'daire': {
      const d = L(v.d, 'Çap');
      area = Math.PI * (d / 2) ** 2; perimeter = Math.PI * d; label = 'Daire';
      break;
    }
    case 'cokgen': {
      const pts = parsePolygon(v.pts);
      let s = 0, per = 0;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i], q = pts[(i + 1) % pts.length];
        s += p.x * q.y - q.x * p.y;
        per += Math.hypot(q.x - p.x, q.y - p.y);
      }
      area = (Math.abs(s) / 2) * k * k; perimeter = per * k; label = 'Düzensiz çokgen';
      if (!(area > 0)) throw new Error('Köşeler aynı doğru üzerinde; alan sıfır çıktı. Köşe koordinatlarını kontrol edin.');
      break;
    }
    case 'dogrudan': {
      const val = pos(num(v.val), 'Alan');
      area = val * (P.alanM2[v.unit] ?? 1); label = 'Hazır alan';
      break;
    }
    default: throw new Error('Şekil seçin.');
  }
  if (!Number.isFinite(area) || area > 1e12) throw new Error('Alan çok büyük çıktı. Ölçü birimini ve değerleri kontrol edin.');
  return { area, perimeter, label };
}

/** m² alanını diğer birimlere çevirir. */
export function convertArea(m2, P = DEFAULTS) {
  return { m2, donum: m2 / P.alanM2.donum, hektar: m2 / P.alanM2.hektar, ar: m2 / P.alanM2.ar, ft2: m2 / P.alanM2.ft2 };
}

/**
 * Malzeme ihtiyacı.
 * kind: 'fayans' | 'parke' | 'boya'; area: m²; firePct: fire %; packM2: paket/kutu m² (isteğe bağlı), price: birim fiyat (isteğe bağlı), coats: kat, coverage: m²/litre.
 */
export function computeMaterial({ kind, area, firePct, packM2 = null, price = null, coats = 2, coverage = 10 }) {
  if (!(firePct >= 0 && firePct <= 100)) throw new Error('Fire oranı geçersiz. 0 ile 100 arasında bir yüzde yazın (örnek: 10).');
  if (price !== null && !(price >= 0)) throw new Error('Birim fiyat geçersiz. Sıfır ya da daha büyük bir tutarı rakamla yazın veya boş bırakın.');
  const factor = 1 + firePct / 100;
  if (kind === 'boya') {
    if (!(coats >= 1 && coats <= 10)) throw new Error('Kat sayısı geçersiz. 1 ile 10 arasında bir sayı yazın.');
    if (!(coverage > 0)) throw new Error('Boya verimi geçersiz. 1 litrenin kaç m² boyadığını (örnek: 10) yazın.');
    const liters = (area * coats * factor) / coverage;
    const pails = packM2 ? Math.ceil(liters / packM2 - 1e-9) : null; // packM2 burada kova litresi
    const buyLiters = pails ? pails * packM2 : liters;
    return { kind, needed: liters, unit: 'litre', packs: pails, packLabel: 'kova', cost: price !== null ? buyLiters * price : null, buy: buyLiters };
  }
  const needed = area * factor;
  const packs = packM2 ? Math.ceil(needed / packM2 - 1e-9) : null;
  const buy = packs ? packs * packM2 : needed;
  return { kind, needed, unit: 'm²', packs, packLabel: 'kutu/paket', cost: price !== null ? buy * price : null, buy };
}
