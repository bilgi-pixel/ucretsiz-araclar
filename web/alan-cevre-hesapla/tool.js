// Alan, Çevre ve Hacim Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Sayı biçimi ve ayrıştırma ---------- */
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const nfSmall = new Intl.NumberFormat('tr-TR', { maximumSignificantDigits: 4 });
/** Türkçe biçimli sayı: 1'den büyükse 2 ondalık, küçükse 4 anlamlı hane. */
export function fmt(v) {
  if (!Number.isFinite(v)) return '—';
  if (v === 0) return '0';
  return Math.abs(v) < 1 ? nfSmall.format(v) : nf2.format(v);
}

/** 1.250,50 / 1250,5 / 1250.5 biçimlerini sayıya çevirir; boşsa null. */
export function parseNumber(raw, label) {
  let s = String(raw ?? '').trim().replace(/\s/g, '');
  if (!s) return null;
  if (/[^0-9.,]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 12,5). Harf ve sembolleri silip tekrar deneyin.`);
  const lc = s.lastIndexOf(','); const ld = s.lastIndexOf('.');
  if (lc >= 0 && ld >= 0) s = lc > ld ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lc >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (ld >= 0) {
    if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 12,5`);
  return n;
}

/* ---------- Birimler ---------- */
export const UNITS = {
  cm: { name: 'cm', toM: 0.01 },
  m: { name: 'm', toM: 1 },
  mm: { name: 'mm', toM: 0.001 },
  in: { name: 'inç', toM: 0.0254 },
};

const pi = Math.PI;

// Her şekil: alanlar ([anahtar, etiket, isteğe bağlı?]), şema (SVG), formül ve hesap.
// calc(v, u): v sayısal girişler, u birim adı → { res: {alan, cevre, hacim, yuzey}, steps: [] }
export const SHAPES = {
  kare: {
    group: '2d', name: 'Kare', fields: [['a', 'Kenar (a)']],
    formula: 'Alan = a² · Çevre = 4a',
    svg: '<rect x="30" y="15" width="60" height="60" /><text x="60" y="88">a</text>',
    calc: ({ a }, u) => ({ res: { alan: a * a, cevre: 4 * a }, steps: [`Alan = a × a = ${fmt(a)} × ${fmt(a)} = ${fmt(a * a)} ${u}²`, `Çevre = 4 × a = 4 × ${fmt(a)} = ${fmt(4 * a)} ${u}`] }),
  },
  dikdortgen: {
    group: '2d', name: 'Dikdörtgen', fields: [['a', 'Uzun kenar (a)'], ['b', 'Kısa kenar (b)']],
    formula: 'Alan = a × b · Çevre = 2(a + b)',
    svg: '<rect x="15" y="22" width="90" height="46" /><text x="60" y="84">a</text><text x="110" y="48">b</text>',
    calc: ({ a, b }, u) => ({ res: { alan: a * b, cevre: 2 * (a + b) }, steps: [`Alan = a × b = ${fmt(a)} × ${fmt(b)} = ${fmt(a * b)} ${u}²`, `Çevre = 2 × (a + b) = 2 × (${fmt(a)} + ${fmt(b)}) = ${fmt(2 * (a + b))} ${u}`] }),
  },
  ucgen3: {
    group: '2d', name: 'Üçgen (üç kenar, Heron)', fields: [['a', 'Birinci kenar (a)'], ['b', 'İkinci kenar (b)'], ['c', 'Üçüncü kenar (c)']],
    formula: 's = (a+b+c)/2 · Alan = √(s(s−a)(s−b)(s−c))',
    svg: '<polygon points="15,75 105,75 70,15" /><text x="60" y="88">c</text><text x="95" y="40">a</text><text x="35" y="40">b</text>',
    calc: ({ a, b, c }, u) => {
      const [x, y, z] = [a, b, c].sort((p, q) => p - q);
      if (x + y <= z) throw new Error('Bu kenar uzunluklarıyla üçgen oluşmaz: en uzun kenar, diğer ikisinin toplamından küçük olmalı. Kenarları kontrol edin (örn. 3, 4, 5).');
      const s = (a + b + c) / 2;
      const alan = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      return { res: { alan, cevre: a + b + c }, steps: [`Yarı çevre s = (a + b + c) / 2 = (${fmt(a)} + ${fmt(b)} + ${fmt(c)}) / 2 = ${fmt(s)} ${u}`, `Alan = √(s × (s−a) × (s−b) × (s−c)) = √(${fmt(s)} × ${fmt(s - a)} × ${fmt(s - b)} × ${fmt(s - c)}) = ${fmt(alan)} ${u}²`, `Çevre = a + b + c = ${fmt(a + b + c)} ${u}`] };
    },
  },
  ucgentb: {
    group: '2d', name: 'Üçgen (taban ve yükseklik)', fields: [['a', 'Taban (a)'], ['h', 'Yükseklik (h)'], ['b', 'Yan kenar b (çevre için, isteğe bağlı)', true], ['c', 'Yan kenar c (çevre için, isteğe bağlı)', true]],
    formula: 'Alan = taban × yükseklik / 2',
    svg: '<polygon points="15,75 105,75 70,15" /><line class="dash" x1="70" y1="15" x2="70" y2="75" /><text x="55" y="88">taban</text><text x="76" y="50">h</text>',
    calc: ({ a, h, b, c }, u) => {
      const alan = (a * h) / 2;
      const steps = [`Alan = taban × yükseklik / 2 = ${fmt(a)} × ${fmt(h)} / 2 = ${fmt(alan)} ${u}²`];
      const res = { alan };
      if (b != null && c != null) { res.cevre = a + b + c; steps.push(`Çevre = a + b + c = ${fmt(a)} + ${fmt(b)} + ${fmt(c)} = ${fmt(res.cevre)} ${u}`); }
      else steps.push('Çevre için iki yan kenarı da girin; yalnızca tabandan ve yükseklikten çevre bulunamaz.');
      return { res, steps };
    },
  },
  daire: {
    group: '2d', name: 'Daire', fields: [['r', 'Yarıçap (r)']],
    formula: 'Alan = π·r² · Çevre = 2π·r',
    svg: '<circle cx="60" cy="45" r="34" /><line class="dash" x1="60" y1="45" x2="94" y2="45" /><text x="78" y="40">r</text>',
    calc: ({ r }, u) => ({ res: { alan: pi * r * r, cevre: 2 * pi * r }, steps: [`Alan = π × r² = 3,14159 × ${fmt(r)}² = ${fmt(pi * r * r)} ${u}²`, `Çevre = 2 × π × r = 2 × 3,14159 × ${fmt(r)} = ${fmt(2 * pi * r)} ${u}`] }),
  },
  yamuk: {
    group: '2d', name: 'Yamuk', fields: [['a', 'Alt taban (a)'], ['c', 'Üst taban (c)'], ['h', 'Yükseklik (h)'], ['b', 'Sol bacak (çevre için, isteğe bağlı)', true], ['d', 'Sağ bacak (çevre için, isteğe bağlı)', true]],
    formula: 'Alan = (a + c) × h / 2 · Çevre = a + b + c + d',
    svg: '<polygon points="12,72 108,72 88,20 32,20" /><line class="dash" x1="32" y1="20" x2="32" y2="72" /><text x="60" y="86">a</text><text x="60" y="14">c</text><text x="22" y="50">h</text>',
    calc: ({ a, c, h, b, d }, u) => {
      const alan = ((a + c) * h) / 2;
      const steps = [`Alan = (a + c) × h / 2 = (${fmt(a)} + ${fmt(c)}) × ${fmt(h)} / 2 = ${fmt(alan)} ${u}²`];
      const res = { alan };
      if (b != null && d != null) { res.cevre = a + b + c + d; steps.push(`Çevre = a + b + c + d = ${fmt(a)} + ${fmt(b)} + ${fmt(c)} + ${fmt(d)} = ${fmt(res.cevre)} ${u}`); }
      else steps.push('Çevre için iki bacak uzunluğunu da girin.');
      return { res, steps };
    },
  },
  paralelkenar: {
    group: '2d', name: 'Paralelkenar', fields: [['a', 'Taban (a)'], ['h', 'Yükseklik (h)'], ['b', 'Yan kenar (çevre için, isteğe bağlı)', true]],
    formula: 'Alan = taban × yükseklik · Çevre = 2(a + b)',
    svg: '<polygon points="25,72 95,72 110,22 40,22" /><line class="dash" x1="40" y1="22" x2="40" y2="72" /><text x="60" y="86">a</text><text x="30" y="50">h</text><text x="112" y="50">b</text>',
    calc: ({ a, h, b }, u) => {
      const alan = a * h;
      const steps = [`Alan = taban × yükseklik = ${fmt(a)} × ${fmt(h)} = ${fmt(alan)} ${u}²`];
      const res = { alan };
      if (b != null) { res.cevre = 2 * (a + b); steps.push(`Çevre = 2 × (a + b) = 2 × (${fmt(a)} + ${fmt(b)}) = ${fmt(res.cevre)} ${u}`); }
      else steps.push('Çevre için yan kenarı (b) da girin.');
      return { res, steps };
    },
  },
  esdortgen: {
    group: '2d', name: 'Eşkenar dörtgen', fields: [['p', 'Birinci köşegen (p)'], ['q', 'İkinci köşegen (q)']],
    formula: 'Alan = p × q / 2 · Kenar = √((p/2)² + (q/2)²) · Çevre = 4 × kenar',
    svg: '<polygon points="60,10 105,45 60,80 15,45" /><line class="dash" x1="60" y1="10" x2="60" y2="80" /><line class="dash" x1="15" y1="45" x2="105" y2="45" /><text x="66" y="30">p</text><text x="30" y="40">q</text>',
    calc: ({ p, q }, u) => {
      const k = Math.sqrt((p / 2) ** 2 + (q / 2) ** 2);
      return { res: { alan: (p * q) / 2, cevre: 4 * k }, steps: [`Alan = p × q / 2 = ${fmt(p)} × ${fmt(q)} / 2 = ${fmt((p * q) / 2)} ${u}²`, `Kenar = √((p/2)² + (q/2)²) = √(${fmt(p / 2)}² + ${fmt(q / 2)}²) = ${fmt(k)} ${u}`, `Çevre = 4 × kenar = ${fmt(4 * k)} ${u}`] };
    },
  },
  cokgen: {
    group: '2d', name: 'Düzgün çokgen', fields: [['n', 'Kenar sayısı (n, 3–100)'], ['a', 'Bir kenarın uzunluğu (a)']],
    formula: 'Alan = n·a² / (4·tan(π/n)) · Çevre = n × a',
    svg: '<polygon points="60,8 100,32 100,65 60,85 20,65 20,32" /><text x="60" y="98">a</text>',
    calc: ({ n, a }, u) => {
      if (!Number.isInteger(n) || n < 3 || n > 100) throw new Error('Kenar sayısı 3 ile 100 arasında bir tam sayı olmalı (örn. 6 altıgen için). Değeri düzeltin.');
      const alan = (n * a * a) / (4 * Math.tan(pi / n));
      return { res: { alan, cevre: n * a }, steps: [`Alan = n × a² / (4 × tan(π/n)) = ${n} × ${fmt(a)}² / (4 × tan(180°/${n})) = ${fmt(alan)} ${u}²`, `Çevre = n × a = ${n} × ${fmt(a)} = ${fmt(n * a)} ${u}`] };
    },
  },
  elips: {
    group: '2d', name: 'Elips', fields: [['a', 'Yarı büyük eksen (a)'], ['b', 'Yarı küçük eksen (b)']],
    formula: 'Alan = π·a·b · Çevre ≈ π(3(a+b) − √((3a+b)(a+3b)))',
    svg: '<ellipse cx="60" cy="45" rx="48" ry="28" /><line class="dash" x1="60" y1="45" x2="108" y2="45" /><line class="dash" x1="60" y1="45" x2="60" y2="17" /><text x="86" y="40">a</text><text x="64" y="34">b</text>',
    calc: ({ a, b }, u) => {
      const cevre = pi * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b))); // Ramanujan yaklaşımı
      return { res: { alan: pi * a * b, cevre }, steps: [`Alan = π × a × b = 3,14159 × ${fmt(a)} × ${fmt(b)} = ${fmt(pi * a * b)} ${u}²`, `Çevre ≈ π × (3(a+b) − √((3a+b)(a+3b))) = ${fmt(cevre)} ${u} (Ramanujan yaklaşımı; elips çevresinin kesin formülü yoktur)`] };
    },
  },
  kup: {
    group: '3d', name: 'Küp', fields: [['a', 'Kenar (a)']],
    formula: 'Hacim = a³ · Yüzey alanı = 6a²',
    svg: '<polygon points="20,35 70,35 70,82 20,82" /><polygon points="20,35 40,15 90,15 70,35" /><polygon points="70,35 90,15 90,62 70,82" /><text x="45" y="94">a</text>',
    calc: ({ a }, u) => ({ res: { hacim: a ** 3, yuzey: 6 * a * a }, steps: [`Hacim = a³ = ${fmt(a)}³ = ${fmt(a ** 3)} ${u}³`, `Yüzey alanı = 6 × a² = 6 × ${fmt(a)}² = ${fmt(6 * a * a)} ${u}²`] }),
  },
  prizma: {
    group: '3d', name: 'Dikdörtgenler prizması', fields: [['a', 'En (a)'], ['b', 'Boy (b)'], ['h', 'Yükseklik (h)']],
    formula: 'Hacim = a × b × h · Yüzey alanı = 2(ab + ah + bh)',
    svg: '<polygon points="12,38 72,38 72,82 12,82" /><polygon points="12,38 32,18 102,18 72,38" /><polygon points="72,38 102,18 102,62 72,82" /><text x="40" y="94">a</text><text x="95" y="14">b</text><text x="6" y="62">h</text>',
    calc: ({ a, b, h }, u) => ({ res: { hacim: a * b * h, yuzey: 2 * (a * b + a * h + b * h) }, steps: [`Hacim = a × b × h = ${fmt(a)} × ${fmt(b)} × ${fmt(h)} = ${fmt(a * b * h)} ${u}³`, `Yüzey alanı = 2 × (ab + ah + bh) = 2 × (${fmt(a * b)} + ${fmt(a * h)} + ${fmt(b * h)}) = ${fmt(2 * (a * b + a * h + b * h))} ${u}²`] }),
  },
  silindir: {
    group: '3d', name: 'Silindir', fields: [['r', 'Taban yarıçapı (r)'], ['h', 'Yükseklik (h)']],
    formula: 'Hacim = π·r²·h · Yüzey alanı = 2π·r·(r + h)',
    svg: '<ellipse cx="60" cy="20" rx="32" ry="10" /><path d="M28 20 V72 A32 10 0 0 0 92 72 V20" /><line class="dash" x1="60" y1="20" x2="92" y2="20" /><text x="76" y="16">r</text><text x="98" y="50">h</text>',
    calc: ({ r, h }, u) => {
      const v = pi * r * r * h; const s = 2 * pi * r * (r + h);
      return { res: { hacim: v, yuzey: s }, steps: [`Hacim = π × r² × h = 3,14159 × ${fmt(r)}² × ${fmt(h)} = ${fmt(v)} ${u}³`, `Yüzey alanı = 2 × π × r × (r + h) = 2 × 3,14159 × ${fmt(r)} × (${fmt(r)} + ${fmt(h)}) = ${fmt(s)} ${u}²`] };
    },
  },
  koni: {
    group: '3d', name: 'Koni', fields: [['r', 'Taban yarıçapı (r)'], ['h', 'Yükseklik (h)']],
    formula: 'Hacim = π·r²·h / 3 · Yüzey alanı = π·r·(r + l), l = √(r²+h²)',
    svg: '<polygon points="60,8 22,72 98,72" /><ellipse cx="60" cy="72" rx="38" ry="10" /><line class="dash" x1="60" y1="8" x2="60" y2="72" /><text x="64" y="44">h</text><text x="80" y="68">r</text>',
    calc: ({ r, h }, u) => {
      const l = Math.sqrt(r * r + h * h); const v = (pi * r * r * h) / 3; const s = pi * r * (r + l);
      return { res: { hacim: v, yuzey: s }, steps: [`Hacim = π × r² × h / 3 = 3,14159 × ${fmt(r)}² × ${fmt(h)} / 3 = ${fmt(v)} ${u}³`, `Eğik yükseklik l = √(r² + h²) = √(${fmt(r)}² + ${fmt(h)}²) = ${fmt(l)} ${u}`, `Yüzey alanı = π × r × (r + l) = ${fmt(s)} ${u}²`] };
    },
  },
  kure: {
    group: '3d', name: 'Küre', fields: [['r', 'Yarıçap (r)']],
    formula: 'Hacim = 4π·r³ / 3 · Yüzey alanı = 4π·r²',
    svg: '<circle cx="60" cy="45" r="36" /><ellipse class="dash" cx="60" cy="45" rx="36" ry="10" /><line class="dash" x1="60" y1="45" x2="96" y2="45" /><text x="78" y="40">r</text>',
    calc: ({ r }, u) => ({ res: { hacim: (4 * pi * r ** 3) / 3, yuzey: 4 * pi * r * r }, steps: [`Hacim = 4 × π × r³ / 3 = 4 × 3,14159 × ${fmt(r)}³ / 3 = ${fmt((4 * pi * r ** 3) / 3)} ${u}³`, `Yüzey alanı = 4 × π × r² = ${fmt(4 * pi * r * r)} ${u}²`] }),
  },
  piramit: {
    group: '3d', name: 'Kare dik piramit', fields: [['a', 'Taban kenarı (a)'], ['h', 'Yükseklik (h)']],
    formula: 'Hacim = a²·h / 3 · Yüzey alanı = a² + 2a·l, l = √(h² + (a/2)²)',
    svg: '<polygon points="60,8 15,70 75,82" /><polygon points="60,8 75,82 108,60" /><line class="dash" x1="60" y1="8" x2="60" y2="68" /><text x="64" y="40">h</text><text x="45" y="94">a</text>',
    calc: ({ a, h }, u) => {
      const l = Math.sqrt(h * h + (a / 2) ** 2); const v = (a * a * h) / 3; const s = a * a + 2 * a * l;
      return { res: { hacim: v, yuzey: s }, steps: [`Hacim = a² × h / 3 = ${fmt(a)}² × ${fmt(h)} / 3 = ${fmt(v)} ${u}³`, `Yan yüz yüksekliği l = √(h² + (a/2)²) = ${fmt(l)} ${u}`, `Yüzey alanı = a² + 2 × a × l = ${fmt(s)} ${u}²`] };
    },
  },
};

/** Saf hesap: şekil, ham giriş nesnesi ve birim → sonuç. Boş zorunlu alan varsa null. */
export function compute(shapeKey, raw, unitKey = 'cm') {
  const sh = SHAPES[shapeKey]; const unit = UNITS[unitKey];
  const vals = {};
  for (const [key, label, opt] of sh.fields) {
    const n = parseNumber(raw[key], label);
    if (n === null) { if (opt) { vals[key] = null; continue; } return null; }
    if (!(n > 0)) throw new Error(`${label} sıfırdan büyük olmalı. Değeri pozitif bir sayı olarak yazın.`);
    vals[key] = n;
  }
  const u = unit.name;
  const { res, steps } = sh.calc(vals, u);
  const f = unit.toM; // birimden metreye
  const rows = [];
  if (res.alan != null) {
    const m2 = res.alan * f * f;
    rows.push(['Alan', `${fmt(res.alan)} ${u}²`]);
    if (res.cevre != null) rows.push(['Çevre', `${fmt(res.cevre)} ${u}`]);
    rows.push(['Alan (m²)', `${fmt(m2)} m²`], ['Alan (dönüm)', `${fmt(m2 / 1000)} dönüm`], ['Alan (hektar)', `${fmt(m2 / 10000)} ha`]);
    return { title: sh.name, rows, steps, formula: sh.formula, areaM2: m2 };
  }
  const m3 = res.hacim * f ** 3;
  rows.push(['Hacim', `${fmt(res.hacim)} ${u}³`], ['Hacim (m³)', `${fmt(m3)} m³`], ['Hacim (litre)', `${fmt(m3 * 1000)} L`], ['Yüzey alanı', `${fmt(res.yuzey)} ${u}²`], ['Yüzey alanı (m²)', `${fmt(res.yuzey * f * f)} m²`]);
  return { title: sh.name, rows, steps, formula: sh.formula, areaM2: null };
}

/** Pratik mod: m² → malzeme miktarı tahmini. */
export function material({ kind, area, fire, w, l, perBox, cover, coats }) {
  if (!(area > 0)) throw new Error('Alan sıfırdan büyük olmalı. Oda için en ve boyu ya da toplam m² değerini yazın.');
  if (fire < 0 || fire > 100) throw new Error('Fire oranı 0 ile 100 arasında olmalı (örn. 10).');
  const total = area * (1 + fire / 100);
  const rows = [['Fire dahil alan', `${fmt(total)} m²`]];
  const steps = [`Fire dahil alan = ${fmt(area)} × (1 + ${fmt(fire)}/100) = ${fmt(total)} m²`];
  if (kind === 'fayans') {
    if (!(w > 0 && l > 0)) throw new Error('Fayans en ve boyunu cm olarak yazın (örn. 60 ve 60).');
    const one = (w * l) / 10000; const count = Math.ceil(total / one);
    rows.unshift(['Gerekli fayans', `${count} adet`]);
    steps.push(`Bir fayansın alanı = ${fmt(w)} × ${fmt(l)} / 10.000 = ${fmt(one)} m²`, `Adet = ${fmt(total)} / ${fmt(one)} = ${fmt(total / one)} → yukarı yuvarla = ${count}`);
    if (perBox > 0) { const boxes = Math.ceil(count / perBox); rows.splice(1, 0, ['Gerekli kutu', `${boxes} kutu`]); steps.push(`Kutu = ${count} / ${fmt(perBox)} → yukarı yuvarla = ${boxes}`); }
  } else if (kind === 'boya') {
    if (!(cover > 0) || !(coats > 0)) throw new Error('Boya kapsama (m²/litre) ve kat sayısını yazın (örn. 10 ve 2).');
    const liters = (total * coats) / cover;
    rows.unshift(['Gerekli boya', `${fmt(liters)} litre`]);
    steps.push(`Litre = alan × kat / kapsama = ${fmt(total)} × ${fmt(coats)} / ${fmt(cover)} = ${fmt(liters)} L`);
  } else {
    const label = kind === 'hali' ? 'halı' : 'parke/laminat';
    rows.unshift([`Gerekli ${label}`, `${fmt(total)} m²`]);
    if (perBox > 0) { const boxes = Math.ceil(total / perBox); rows.splice(1, 0, ['Gerekli paket', `${boxes} paket`]); steps.push(`Paket = ${fmt(total)} / ${fmt(perBox)} → yukarı yuvarla = ${boxes}`); }
  }
  return { title: 'Malzeme tahmini', rows, steps };
}

/* ---------- Arayüz ---------- */
if (typeof document !== 'undefined' && $('shape')) {
  const sel = $('shape');
  for (const grp of [['2d', 'Alan ve çevre'], ['3d', 'Hacim ve yüzey alanı']]) {
    const og = document.createElement('optgroup'); og.label = grp[1];
    for (const [k, s] of Object.entries(SHAPES)) if (s.group === grp[0]) og.append(new Option(s.name, k));
    sel.append(og);
  }
  const fieldsBox = $('fields'); let lastText = ''; let lastArea = null;

  const renderRows = (box, rows) => {
    box.replaceChildren();
    rows.forEach(([k, v], i) => {
      const row = document.createElement('div'); row.className = 'ac-row' + (i === 0 ? ' is-strong' : '');
      const dt = document.createElement('dt'); dt.textContent = k;
      const dd = document.createElement('dd'); dd.textContent = v;
      row.append(dt, dd); box.append(row);
    });
  };
  const renderSteps = (ol, steps) => {
    ol.replaceChildren();
    steps.forEach((t) => { const li = document.createElement('li'); li.textContent = t; ol.append(li); });
  };

  function buildFields() {
    const sh = SHAPES[sel.value];
    fieldsBox.replaceChildren();
    sh.fields.forEach(([key, label, opt]) => {
      const wrap = document.createElement('div'); wrap.className = 'ba-field';
      const lb = document.createElement('label'); lb.htmlFor = `f-${key}`; lb.textContent = label;
      const inp = document.createElement('input'); inp.id = `f-${key}`; inp.type = 'text'; inp.inputMode = 'decimal'; inp.autocomplete = 'off';
      inp.placeholder = opt ? 'boş bırakılabilir' : 'örn. 12,5';
      inp.addEventListener('input', update);
      wrap.append(lb, inp); fieldsBox.append(wrap);
    });
    // Şemalar bu dosyadaki sabit metinlerdir; kullanıcı girdisi içermez.
    $('diagram').innerHTML = `<svg viewBox="0 0 120 100" role="img" aria-label="${sh.name} şeması" class="ac-svg">${sh.svg}</svg>`;
    $('formula').textContent = sh.formula;
  }

  function update() {
    $('copy-status').textContent = '';
    const raw = {}; SHAPES[sel.value].fields.forEach(([k]) => { raw[k] = $(`f-${k}`).value; });
    try {
      const r = compute(sel.value, raw, $('unit').value);
      showError($('error'), '');
      if (!r) { $('result').classList.remove('is-active'); lastText = ''; lastArea = null; $('use-area').disabled = true; return; }
      $('r-title').textContent = r.title;
      renderRows($('r-rows'), r.rows);
      renderSteps($('steps'), r.steps);
      lastText = `${r.title}: ${r.rows.map(([k, v]) => `${k} ${v}`).join(' · ')}\nFormül: ${r.formula}\n${r.steps.join('\n')}`;
      lastArea = r.areaM2;
      $('use-area').disabled = lastArea == null;
      $('result').classList.add('is-active');
    } catch (e) {
      $('result').classList.remove('is-active'); lastText = ''; lastArea = null; $('use-area').disabled = true;
      showError($('error'), e.message);
    }
  }

  /* Pratik mod: arsa / oda malzeme tahmini */
  const kindSel = $('p-kind');
  function pracFields() {
    const k = kindSel.value;
    $('p-tile').hidden = k !== 'fayans'; $('p-paint').hidden = k !== 'boya';
    $('p-boxwrap').hidden = k === 'boya';
    $('p-boxlabel').textContent = k === 'fayans' ? 'Kutuda kaç adet var? (isteğe bağlı)' : 'Pakette kaç m² var? (isteğe bağlı)';
  }
  function pracUpdate() {
    try {
      let area = parseNumber($('p-area').value, 'Alan');
      const w = parseNumber($('p-w').value, 'Oda eni'); const l = parseNumber($('p-l').value, 'Oda boyu');
      if (area === null && w !== null && l !== null) area = w * l;
      if (area === null) { $('p-result').classList.remove('is-active'); showError($('p-error'), ''); return; }
      const fire = parseNumber($('p-fire').value, 'Fire oranı') ?? 0;
      const r = material({
        kind: kindSel.value, area, fire,
        w: parseNumber($('p-tw').value, 'Fayans eni'), l: parseNumber($('p-tl').value, 'Fayans boyu'),
        perBox: parseNumber($('p-box').value, 'Kutu içeriği') ?? 0,
        cover: parseNumber($('p-cover').value, 'Kapsama'), coats: parseNumber($('p-coats').value, 'Kat sayısı'),
      });
      showError($('p-error'), '');
      renderRows($('p-rows'), r.rows);
      renderSteps($('p-steps'), r.steps);
      $('p-result').classList.add('is-active');
    } catch (e) { $('p-result').classList.remove('is-active'); showError($('p-error'), e.message); }
  }

  sel.addEventListener('change', () => { buildFields(); update(); });
  $('unit').addEventListener('change', update);
  $('copy').addEventListener('click', async () => {
    if (!lastText) { $('copy-status').textContent = 'Kopyalanacak sonuç yok; önce ölçüleri girin.'; return; }
    try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });
  $('use-area').addEventListener('click', () => {
    if (lastArea != null) { $('p-area').value = String(Math.round(lastArea * 10000) / 10000).replace('.', ','); pracUpdate(); }
  });
  kindSel.addEventListener('change', () => { pracFields(); pracUpdate(); });
  ['p-area', 'p-w', 'p-l', 'p-fire', 'p-tw', 'p-tl', 'p-box', 'p-cover', 'p-coats'].forEach((id) => $(id).addEventListener('input', pracUpdate));
  $('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
  buildFields(); pracFields(); $('use-area').disabled = true;
}
