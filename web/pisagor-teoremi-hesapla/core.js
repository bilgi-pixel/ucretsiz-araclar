// Pisagor teoremi — saf mantık (DOM yok). a² + b² = c² (c hipotenüs).

/** Türkçe yazımlı sayıyı çözer: "1.234,5" -> 1234.5 ; "2,5" -> 2.5. Boşsa null döner. */
export function parseOptional(text, label) {
  let s = String(text ?? '').trim().replace(/\s/g, '');
  if (s === '') return null;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) throw new Error(`${label} geçersiz. Yalnızca rakam ve ondalık için virgül kullanın (örneğin 3 ya da 4,5).`);
  const v = Number(s);
  if (!Number.isFinite(v)) throw new Error(`${label} çok büyük. Daha küçük bir değer deneyin.`);
  if (v <= 0) throw new Error(`${label} sıfırdan büyük olmalı. Kenar uzunlukları negatif ya da sıfır olamaz.`);
  return v;
}

/** Sayıyı Türkçe yazar (en çok 10 ondalık, gereksiz sıfırlar atılır). */
export function fmt(v, max = 10) {
  const r = Number(v.toFixed(max));
  return r.toLocaleString('tr-TR', { maximumFractionDigits: max });
}

const gcd = (x, y) => (y ? gcd(y, x % y) : x);

/** a, b, c'den tam olarak biri null olmalıdır; eksik kenarı ve türev değerleri döndürür. */
export function solveTriangle(a, b, c) {
  const empty = [a, b, c].filter((v) => v === null).length;
  if (empty === 0) throw new Error('Üç kenar da dolu. Bulmak istediğiniz kenarın alanını boş bırakın.');
  if (empty > 1) throw new Error('En az iki kenar uzunluğu girin. Üç kenardan yalnızca biri boş kalmalı.');
  let missing;
  if (c === null) { c = Math.hypot(a, b); missing = 'c'; }
  else {
    const known = a === null ? b : a;
    if (c <= known) throw new Error('Hipotenüs (c) dik kenarlardan uzun olmalı. Değerleri kontrol edin; dik açının karşısındaki en uzun kenar c olarak girilir.');
    const other = Math.sqrt(c * c - known * known);
    if (a === null) { a = other; missing = 'a'; } else { b = other; missing = 'b'; }
  }
  const area = (a * b) / 2;
  const perimeter = a + b + c;
  const angleA = (Math.atan2(a, b) * 180) / Math.PI; // a kenarının karşısındaki açı
  const angleB = 90 - angleA;
  const height = (a * b) / c; // hipotenüse inen yükseklik
  const ints = [a, b, c].map((v) => Math.round(v * 1e6) / 1e6);
  let triple = null;
  if (ints.every((v) => Number.isInteger(v)) && ints[0] ** 2 + ints[1] ** 2 === ints[2] ** 2) {
    const g = gcd(gcd(ints[0], ints[1]), ints[2]);
    triple = { values: ints, primitive: g === 1, base: ints.map((v) => v / g) };
  }
  return { a, b, c, missing, area, perimeter, angleA, angleB, height, triple };
}
