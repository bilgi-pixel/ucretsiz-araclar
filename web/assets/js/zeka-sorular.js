// Zekâ testleri için soru üreticileri. DOM yok, ağ yok; tarayıcıda ve doğrulama betiğinde aynı çalışır.
// Sorular bir tohumdan (seed) kurala göre üretilir: doğru cevap kuralın kendisinden hesaplanır.
// Her üretici şunu döndürür: { tur, soru (HTML), secenekler: [HTML…], dogru: sıra, aciklama }.
import { BENZETME, FARKLI } from './zeka-banka.js';

/** Tohumlu rastgele sayı üreteci (mulberry32). */
export function rng(seed) {
  let a = (seed >>> 0) || 1;
  const f = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  f.int = (lo, hi) => lo + Math.floor(f() * (hi - lo + 1));
  f.pick = (arr) => arr[Math.floor(f() * arr.length)];
  f.shuffle = (arr) => { const b = arr.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(f() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  return f;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Doğru cevap + çeldiricilerden karışık, tekrarsız seçenek listesi kurar. */
function secenekKur(r, dogru, celdiriciler, n = 5) {
  const set = [String(dogru)];
  for (const c of celdiriciler) { const s = String(c); if (!set.includes(s) && set.length < n) set.push(s); }
  let k = 1;
  while (set.length < n && typeof dogru === 'number') { const s = String(dogru + (k % 2 ? k : -k) * 3 + 7 * Math.ceil(k / 2)); if (!set.includes(s)) set.push(s); k++; }
  const karisik = r.shuffle(set);
  return { secenekler: karisik.map(esc), dogru: karisik.indexOf(String(dogru)) };
}

// ---- 1) Sayı dizisi ----
export function sayiDizisi(r, z = 2) {
  const tipler = z <= 1 ? ['arit', 'arit', 'geo', 'azalan'] : z === 2 ? ['arit', 'geo', 'artanFark', 'fib', 'ikili', 'kare'] : ['artanFark', 'fib', 'ikili', 'kare', 'carpTopla', 'almasik', 'kup'];
  const tip = r.pick(tipler);
  let d = [], sonraki, kural;
  if (tip === 'arit') { const a = r.int(1, 20), k = r.int(2, z <= 1 ? 6 : 12); for (let i = 0; i < 6; i++) d.push(a + i * k); kural = `Her terim bir öncekinden ${k} fazladır.`; }
  else if (tip === 'azalan') { const k = r.int(2, 7), a = r.int(40, 70); for (let i = 0; i < 6; i++) d.push(a - i * k); kural = `Her terim bir öncekinden ${k} eksiktir.`; }
  else if (tip === 'geo') { const a = r.int(1, 5), k = r.pick([2, 2, 3]); for (let i = 0; i < 6; i++) d.push(a * k ** i); kural = `Her terim bir öncekinin ${k} katıdır.`; }
  else if (tip === 'artanFark') { const a = r.int(1, 10), f0 = r.int(1, 4), k = r.int(1, 3); let x = a, f = f0; for (let i = 0; i < 6; i++) { d.push(x); x += f; f += k; } kural = `Terimler arasındaki fark her adımda ${k} artar (${f0}, ${f0 + k}, ${f0 + 2 * k}…).`; }
  else if (tip === 'fib') { let a = r.int(1, 5), b = r.int(1, 6); for (let i = 0; i < 6; i++) { d.push(a); [a, b] = [b, a + b]; } kural = 'Her terim kendinden önceki iki terimin toplamıdır.'; }
  else if (tip === 'ikili') { const a = r.int(1, 9), b = r.int(20, 40), k1 = r.int(2, 5), k2 = r.int(2, 6); for (let i = 0; i < 7; i++) d.push(i % 2 === 0 ? a + (i / 2) * k1 : b - ((i - 1) / 2) * k2); kural = `İç içe iki dizi var: tek sıradaki terimler ${k1} artar, çift sıradakiler ${k2} azalır.`; }
  else if (tip === 'kare') { const n0 = r.int(1, 5), c = r.int(0, 3); for (let i = 0; i < 6; i++) d.push((n0 + i) ** 2 + c); kural = c ? `Terimler ardışık sayıların karelerinin ${c} fazlasıdır.` : 'Terimler ardışık sayıların kareleridir.'; }
  else if (tip === 'kup') { const n0 = r.int(1, 3); for (let i = 0; i < 6; i++) d.push((n0 + i) ** 3); kural = 'Terimler ardışık sayıların küpleridir.'; }
  else if (tip === 'carpTopla') { const m = 2, c = r.int(1, 3); let x = r.int(1, 4); for (let i = 0; i < 6; i++) { d.push(x); x = x * m + c; } kural = `Her terim bir öncekinin ${m} katının ${c} fazlasıdır.`; }
  else { const p = r.int(3, 8), q = r.int(1, p - 1); let x = r.int(5, 15); for (let i = 0; i < 7; i++) { d.push(x); x += i % 2 === 0 ? p : -q; } kural = `Sırayla ${p} eklenip ${q} çıkarılır.`; }
  sonraki = d.pop();
  const son = d[d.length - 1], fark = son - d[d.length - 2];
  const s = secenekKur(r, sonraki, [son + fark, sonraki + 1, sonraki - 1, sonraki + 2, son + fark + 1, sonraki - 2, sonraki + 10]);
  return { tur: 'Sayısal', soru: `<p>Dizide soru işaretinin yerine hangi sayı gelmelidir?</p><p class="zk-dizi">${d.join(' &nbsp; ')} &nbsp; <b>?</b></p>`, ...s, aciklama: `${kural} Bu yüzden sıradaki sayı ${sonraki} olur.` };
}

// ---- 2) Harf dizisi (29 harfli Türk alfabesi) ----
const ALFABE = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
export function harfDizisi(r, z = 2) {
  const tip = z <= 1 ? 'sabit' : r.pick(['sabit', 'geri', 'artan', 'ikili']);
  let idx = [], kural;
  if (tip === 'sabit') { const k = r.int(1, z <= 1 ? 2 : 4), a = r.int(0, 28 - 5 * k); for (let i = 0; i < 6; i++) idx.push(a + i * k); kural = k === 1 ? 'Harfler alfabede art arda gelir.' : `Her adımda alfabede ${k} harf ileri gidilir.`; }
  else if (tip === 'geri') { const k = r.int(1, 3), a = r.int(5 * k, 28); for (let i = 0; i < 6; i++) idx.push(a - i * k); kural = `Her adımda alfabede ${k} harf geri gidilir.`; }
  else if (tip === 'artan') { const a = r.int(0, 7); let x = a; for (let i = 0; i < 6; i++) { idx.push(x); x += i + 1; } kural = 'Atlanan harf sayısı her adımda bir artar (1, 2, 3… harf ileri).'; }
  else { const a = r.int(0, 6), b = r.int(20, 28); for (let i = 0; i < 7; i++) idx.push(i % 2 === 0 ? a + i / 2 : b - (i - 1) / 2); kural = 'İç içe iki dizi var: biri alfabede ileri, diğeri geri gider.'; }
  const dogru = ALFABE[idx.pop()], son = idx[idx.length - 1];
  const cel = [ALFABE[son + 1], ALFABE[son - 1], ALFABE[ALFABE.indexOf(dogru) + 1], ALFABE[ALFABE.indexOf(dogru) - 1], ALFABE[ALFABE.indexOf(dogru) + 2], ALFABE[ALFABE.indexOf(dogru) - 2], ALFABE[r.int(0, 28)], ALFABE[r.int(0, 28)], ALFABE[r.int(0, 28)]].filter(Boolean);
  const s = secenekKur(r, dogru, cel);
  return { tur: 'Sözel', soru: `<p>Harf dizisinde soru işaretinin yerine hangi harf gelmelidir? (29 harfli Türk alfabesi)</p><p class="zk-dizi">${idx.map((i) => ALFABE[i]).join(' &nbsp; ')} &nbsp; <b>?</b></p>`, ...s, aciklama: `${kural} Sıradaki harf ${dogru} olur.` };
}

// ---- 3) Sayı benzetmesi ----
export function sayiBenzetme(r, z = 2) {
  const tip = z <= 1 ? r.pick(['kat', 'topla']) : r.pick(['kat', 'topla', 'kare', 'katTopla', 'yarim']);
  let f, kural;
  if (tip === 'kat') { const k = r.int(2, 6); f = (x) => x * k; kural = `İkinci sayı birincinin ${k} katıdır.`; }
  else if (tip === 'topla') { const k = r.int(3, 15); f = (x) => x + k; kural = `İkinci sayı birincinin ${k} fazlasıdır.`; }
  else if (tip === 'kare') { f = (x) => x * x; kural = 'İkinci sayı birincinin karesidir.'; }
  else if (tip === 'katTopla') { const k = r.int(2, 4), c = r.int(1, 5); f = (x) => x * k + c; kural = `İkinci sayı birincinin ${k} katının ${c} fazlasıdır.`; }
  else { f = (x) => x / 2; kural = 'İkinci sayı birincinin yarısıdır.'; }
  const havuz = tip === 'yarim' ? [8, 12, 14, 18, 22, 26, 30, 34] : [2, 3, 4, 5, 6, 7, 8, 9, 11, 12];
  const [a, b, c] = r.shuffle(havuz), dogru = f(c);
  const s = secenekKur(r, dogru, [c + (f(a) - a), dogru + 1, dogru - 1, c * 2, dogru + 2, c + a, dogru - 2].filter((x) => x > 0));
  return { tur: 'Sayısal', soru: `<p>İlk iki çiftteki ilişkiyi bulun ve aynı ilişkiyi üçüncü çifte uygulayın.</p><p class="zk-dizi">${a} → ${f(a)} &nbsp;&nbsp; ${b} → ${f(b)} &nbsp;&nbsp; ${c} → <b>?</b></p>`, ...s, aciklama: `${kural} ${c} için sonuç ${dogru} olur.` };
}

// ---- 4) Farklı olan sayı ----
const ASAL = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
export function farkliSayi(r) {
  const tip = r.pick(['kat', 'kat', 'asal', 'kare', 'cift']);
  let dort, tek, kural;
  if (tip === 'kat') { const k = r.pick([3, 4, 5, 6, 7, 9]); dort = r.shuffle([2, 3, 4, 5, 6, 7, 8, 9, 11, 12]).slice(0, 4).map((x) => x * k); do { tek = r.int(2 * k + 1, 12 * k - 1); } while (tek % k === 0); kural = `Diğer dört sayı ${k} ile tam bölünür; ${tek} bölünmez.`; }
  else if (tip === 'asal') { dort = r.shuffle(ASAL).slice(0, 4); tek = r.pick([9, 15, 21, 25, 27, 33, 35, 39, 45, 49]); kural = `Diğer dört sayı asaldır; ${tek} asal değildir.`; }
  else if (tip === 'kare') { dort = r.shuffle([4, 9, 16, 25, 36, 49, 64, 81, 100, 121]).slice(0, 4); do { tek = r.int(5, 120); } while (Number.isInteger(Math.sqrt(tek))); kural = `Diğer dört sayı tam karedir; ${tek} tam kare değildir.`; }
  else { dort = r.shuffle([12, 18, 24, 26, 32, 38, 44, 46, 52, 58, 64, 68]).slice(0, 4); tek = r.pick([15, 21, 27, 33, 37, 43, 51, 57]); kural = `Diğer dört sayı çifttir; ${tek} tektir.`; }
  const karisik = r.shuffle([...dort, tek]);
  return { tur: 'Sayısal', soru: '<p>Aşağıdaki sayılardan dördü ortak bir özelliğe sahiptir. Hangisi bu gruba uymaz?</p>', secenekler: karisik.map(String), dogru: karisik.indexOf(tek), aciklama: kural };
}

// ---- 5) Mantık (uydurma sözcüklerle tasım ve sıralama) ----
const UYDURMA = ['zopi', 'tirma', 'belon', 'kupar', 'miret', 'saven', 'dolun', 'pirka', 'hesil', 'carak', 'lumet', 'gofan'];
const ADLAR = ['Ali', 'Banu', 'Cem', 'Deniz', 'Ece', 'Fatih', 'Gül', 'Hakan', 'İpek', 'Kaan', 'Lale', 'Mert'];
const sonUnlu = (w) => [...w.toLocaleLowerCase('tr')].reverse().find((c) => 'aeıioöuü'.includes(c));
const cogul = (w) => w + ('eiöü'.includes(sonUnlu(w)) ? 'ler' : 'lar');
const dir = (w) => { const u = sonUnlu(w), sert = 'çfhkpsşt'.includes(w[w.length - 1]); return w + (sert ? 't' : 'd') + ({ a: 'ı', ı: 'ı', e: 'i', i: 'i', o: 'u', u: 'u', ö: 'ü', ü: 'ü' }[u]) + 'r'; };
const B = (w) => w[0].toLocaleUpperCase('tr') + w.slice(1);
export function mantik(r, z = 2) {
  const tip = z <= 1 ? r.pick(['sira3', 'tum']) : r.pick(['tum', 'hicbir', 'bazi', 'sira3', 'sira4', 'sira4']);
  if (tip === 'tum' || tip === 'hicbir' || tip === 'bazi') {
    const [a, b, c] = r.shuffle(UYDURMA);
    let onc, dogru, yanlis;
    if (tip === 'tum') { onc = `Tüm ${cogul(a)} ${dir(b)}. Tüm ${cogul(b)} ${dir(c)}.`; dogru = `Tüm ${cogul(a)} ${dir(c)}.`; yanlis = [`Tüm ${cogul(c)} ${dir(a)}.`, `Hiçbir ${a} ${c} değildir.`, `Tüm ${cogul(b)} ${dir(a)}.`, `Bazı ${cogul(a)} ${c} değildir.`]; }
    else if (tip === 'hicbir') { onc = `Tüm ${cogul(a)} ${dir(b)}. Hiçbir ${b} ${c} değildir.`; dogru = `Hiçbir ${a} ${c} değildir.`; yanlis = [`Tüm ${cogul(a)} ${dir(c)}.`, `Bazı ${cogul(a)} ${dir(c)}.`, `Tüm ${cogul(b)} ${dir(a)}.`, `Tüm ${cogul(c)} ${dir(b)}.`]; }
    else { onc = `Bazı ${cogul(a)} ${dir(b)}. Tüm ${cogul(b)} ${dir(c)}.`; dogru = `Bazı ${cogul(a)} ${dir(c)}.`; yanlis = [`Tüm ${cogul(a)} ${dir(c)}.`, `Hiçbir ${a} ${c} değildir.`, `Tüm ${cogul(c)} ${dir(b)}.`, `Tüm ${cogul(a)} ${dir(b)}.`]; }
    const karisik = r.shuffle([dogru, ...yanlis]);
    return { tur: 'Mantık', soru: `<p>Sözcükler uydurmadır; yalnızca verilen bilgilere göre düşünün.</p><p class="zk-oncul">${esc(onc)}</p><p>Buna göre aşağıdakilerden hangisi <b>kesinlikle doğrudur</b>?</p>`, secenekler: karisik.map(esc), dogru: karisik.indexOf(dogru), aciklama: `Öncüller birlikte okunduğunda yalnızca "${dogru}" sonucu zorunlu olarak çıkar; diğer seçenekler verilen bilgiyle kesinleşmez ya da onunla çelişir.` };
  }
  const n = tip === 'sira3' ? 3 : 4, kisi = r.shuffle(ADLAR).slice(0, n); // kisi[0] en uzun … kisi[n-1] en kısa
  const den = (ad) => `${ad}'${'çfhkpsşt'.includes(ad[ad.length - 1]) ? 't' : 'd'}${'eiöü'.includes(sonUnlu(ad)) ? 'en' : 'an'}`; // Mert'ten, Banu'dan
  const cumle = []; for (let i = 0; i < n - 1; i++) cumle.push(`${kisi[i]}, ${den(kisi[i + 1])} uzundur.`);
  const soruTip = n === 3 ? r.pick(['kisa', 'uzun']) : r.pick(['kisa', 'uzun', 'ikinci']);
  const hedef = soruTip === 'kisa' ? kisi[n - 1] : soruTip === 'uzun' ? kisi[0] : kisi[1];
  const soruMetni = soruTip === 'kisa' ? 'en kısa boylu' : soruTip === 'uzun' ? 'en uzun boylu' : 'boy sırasında en uzundan sonra gelen ikinci';
  const karisik = r.shuffle(kisi);
  return { tur: 'Mantık', soru: `<p class="zk-oncul">${esc(r.shuffle(cumle).join(' '))}</p><p>Buna göre ${soruMetni} kişi kimdir?</p>`, secenekler: karisik.map(esc), dogru: karisik.indexOf(hedef), aciklama: `Bilgiler birleştirilince uzundan kısaya sıra ${kisi.join(' > ')} olur; aranan kişi ${hedef}.` };
}

// ---- 6) Şekil matrisi (3×3) ----
const TON = ['#ffffff', '#b9bcc2', '#2b2d33'];
function sekil(tip, cx, cy, s, ton) {
  const st = `fill="${TON[ton]}" stroke="#2b2d33" stroke-width="2"`;
  if (tip === 0) return `<circle cx="${cx}" cy="${cy}" r="${s}" ${st}/>`;
  if (tip === 1) return `<rect x="${cx - s}" y="${cy - s}" width="${2 * s}" height="${2 * s}" ${st}/>`;
  if (tip === 2) return `<polygon points="${cx},${cy - s} ${cx + s},${cy + s} ${cx - s},${cy + s}" ${st}/>`;
  return `<polygon points="${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}" ${st}/>`;
}
const hucre = (h, x = 0, y = 0) => { const n = h.adet, s = n === 1 ? 16 : n === 2 ? 11 : 8, ara = 60 / (n + 1); let o = ''; for (let i = 0; i < n; i++) o += sekil(h.tip, x + ara * (i + 1), y + 30, s, h.ton); return o; };
const hucreSvg = (h) => `<svg class="zk-hucre" viewBox="0 0 60 60" role="img" aria-label="${h.adet} adet ${['daire', 'kare', 'üçgen', 'eşkenar dörtgen'][h.tip]}, ${['boş', 'gri', 'koyu'][h.ton]}">${hucre(h)}</svg>`;
export function matris(r, z = 2) {
  // Her nitelik (şekil, adet, ton) için bir kural: 'satir' (satırda sabit), 'sutun' (sütunda sabit), 'kayan' (her satırda bir kayar)
  const kurallar = r.shuffle(z <= 1 ? ['satir', 'sabit', 'sabit'] : z === 2 ? ['satir', 'sutun', 'sabit'] : r.pick([['satir', 'sutun', 'kayan'], ['kayan', 'sutun', 'satir'], ['kayan', 'kayan', 'satir']]));
  const deger = { tip: r.shuffle([0, 1, 2, 3]).slice(0, 3), adet: r.shuffle([1, 2, 3]), ton: r.shuffle([0, 1, 2]) };
  const nit = ['tip', 'adet', 'ton'], ad = { tip: 'Şekil', adet: 'Şekil sayısı', ton: 'Dolgu tonu' };
  const al = (k, i, row, col) => { const kr = kurallar[i], v = deger[k]; return kr === 'satir' ? v[row] : kr === 'sutun' ? v[col] : kr === 'kayan' ? v[(row + col) % 3] : v[0]; };
  const g = []; for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) g.push(Object.fromEntries(nit.map((k, i) => [k, al(k, i, row, col)])));
  const dogru = g[8], key = (h) => `${h.tip}-${h.adet}-${h.ton}`;
  const cel = []; const ekle = (h) => { if (key(h) !== key(dogru) && !cel.some((c) => key(c) === key(h))) cel.push(h); };
  for (const k of r.shuffle(nit)) for (const v of r.shuffle(k === 'tip' ? [0, 1, 2, 3] : k === 'adet' ? [1, 2, 3] : [0, 1, 2])) ekle({ ...dogru, [k]: v });
  ekle(g[7]); ekle(g[5]); ekle({ tip: (dogru.tip + 1) % 4, adet: (dogru.adet % 3) + 1, ton: dogru.ton });
  const karisik = r.shuffle([dogru, ...r.shuffle(cel).slice(0, 5)]);
  let svg = '<svg class="zk-matris" viewBox="0 0 196 196" role="img" aria-label="Üçe üç şekil tablosu; sağ alt hücre boş">';
  for (let i = 0; i < 9; i++) { const x = 4 + (i % 3) * 64, y = 4 + Math.floor(i / 3) * 64; svg += `<rect x="${x}" y="${y}" width="60" height="60" fill="#fff" stroke="#8e9096" stroke-width="1.5"/>` + (i < 8 ? hucre(g[i], x, y) : `<text x="${x + 30}" y="${y + 40}" text-anchor="middle" font-size="30" font-weight="700" fill="#7b2331">?</text>`); }
  svg += '</svg>';
  const acik = nit.map((k, i) => `${ad[k]} ${{ satir: 'her satırda aynı kalır, satırdan satıra değişir', sutun: 'her sütunda aynı kalır, sütundan sütuna değişir', kayan: 'her satırda bir sağa kayarak tekrar eder', sabit: 'tabloda hiç değişmez' }[kurallar[i]]}`).join('; ');
  return { tur: 'Görsel', soru: `<p>Tablodaki düzeni bulun. Soru işaretinin yerine hangi şekil gelmelidir?</p>${svg}`, secenekler: karisik.map(hucreSvg), dogru: karisik.indexOf(dogru), aciklama: `${acik}. Bu kurallara göre boş hücrede ${dogru.adet} adet ${['daire', 'kare', 'üçgen', 'eşkenar dörtgen'][dogru.tip]} (${['boş', 'gri', 'koyu'][dogru.ton]}) olmalıdır.` };
}

// ---- 7) Şekil döndürme (uzamsal) ----
const don = (c) => c.map(([x, y]) => [3 - y, x]);           // 90° saat yönünde (4×4 ızgara)
const ayna = (c) => c.map(([x, y]) => [3 - x, y]);
const norm = (c) => { const mx = Math.min(...c.map((p) => p[0])), my = Math.min(...c.map((p) => p[1])); return c.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[1] - b[1] || a[0] - b[0]); };
const anahtar = (c) => norm(c).map((p) => p.join(',')).join(';');
const izgaraSvg = (c, etiket) => { const n = norm(c); let o = `<svg class="zk-hucre" viewBox="0 0 68 68" role="img" aria-label="${etiket}">`; for (let i = 0; i < 16; i++) o += `<rect x="${2 + (i % 4) * 16}" y="${2 + Math.floor(i / 4) * 16}" width="16" height="16" fill="#fff" stroke="#d0d2d6" stroke-width="1"/>`; for (const [x, y] of n) o += `<rect x="${2 + x * 16}" y="${2 + y * 16}" width="16" height="16" fill="#7b2331" stroke="#2b2d33" stroke-width="1"/>`; return o + '</svg>'; };
export function donus(r) {
  let c, donusler, aynalar;
  for (;;) { // bağlantılı, 5–6 hücreli ve ayna görüntüsü hiçbir döndürmesine eşit olmayan şekil
    c = [[r.int(0, 2), r.int(0, 2)]]; const hedef = r.int(5, 6);
    for (let d = 0; c.length < hedef && d < 200; d++) { const [x, y] = r.pick(c), [dx, dy] = r.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), nx = x + dx, ny = y + dy; if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4 && !c.some((p) => p[0] === nx && p[1] === ny)) c.push([nx, ny]); }
    if (c.length < hedef) continue;
    donusler = [c]; for (let i = 0; i < 3; i++) donusler.push(don(donusler[i]));
    aynalar = [ayna(c)]; for (let i = 0; i < 3; i++) aynalar.push(don(aynalar[i]));
    const dk = donusler.map(anahtar), ak = aynalar.map(anahtar);
    if (new Set(dk).size === 4 && new Set(ak).size === 4 && !ak.some((k) => dk.includes(k))) break;
  }
  const dogru = donusler[r.int(1, 3)], yanlis = r.shuffle(aynalar).slice(0, 3);
  const karisik = r.shuffle([dogru, ...yanlis]);
  return { tur: 'Görsel', soru: `<p>Soldaki şekil kâğıt üzerinde <b>döndürülüyor</b> (ters çevrilmiyor). Aşağıdakilerden hangisi onun döndürülmüş hâlidir?</p>${izgaraSvg(c, 'Örnek şekil').replace('zk-hucre', 'zk-ornek')}`, secenekler: karisik.map((s, i) => izgaraSvg(s, `Seçenek ${i + 1}`)), dogru: karisik.indexOf(dogru), aciklama: 'Doğru seçenek, örnek şeklin kâğıt üzerinde çevrilmesiyle elde edilir. Diğer üç seçenek şeklin ayna görüntüsüdür; ayna görüntüsü ne kadar döndürülürse döndürülsün örnekle üst üste gelmez.' };
}

// ---- 8) Dikkat (benzer harfleri sayma) ----
export function dikkat(r, z = 2) {
  const takim = r.pick([['b', 'd', 'p', 'q'], ['6', '9', '8', '0'], ['m', 'n', 'u', 'w'], ['E', 'F', 'L', 'T']]), hedef = r.pick(takim);
  const sat = z <= 1 ? 4 : 5, sut = z <= 1 ? 10 : 14; let say = 0, o = '';
  for (let i = 0; i < sat; i++) { let s = ''; for (let j = 0; j < sut; j++) { const ch = r() < 0.3 ? hedef : r.pick(takim.filter((t) => t !== hedef)); if (ch === hedef) say++; s += ch + ' '; } o += `<span>${s.trim()}</span>`; }
  const s = secenekKur(r, say, [say + 1, say - 1, say + 2, say - 2, say + 3].filter((x) => x >= 0));
  return { tur: 'Dikkat', soru: `<p>Aşağıdaki karakterler arasında kaç tane <b class="zk-hedef">${hedef}</b> vardır?</p><p class="zk-izgara" aria-label="Karakter tablosu">${o}</p>`, ...s, aciklama: `Satırlar tek tek sayıldığında toplam ${say} tane "${hedef}" bulunur.` };
}

// ---- 9) Sözel benzetme ve farklı kelime (soru bankasından) ----
export function benzetme(r, z, kullanilan = new Set()) {
  const kalan = BENZETME.map((_, i) => i).filter((i) => !kullanilan.has('b' + i)); const i = r.pick(kalan.length ? kalan : BENZETME.map((_, j) => j)); kullanilan.add('b' + i);
  const q = BENZETME[i], karisik = r.shuffle([q.d, ...q.yanlis]);
  return { tur: 'Sözel', soru: `<p>İlk çiftteki ilişkinin aynısını ikinci çiftte kurun.</p><p class="zk-dizi">${esc(q.a)} : ${esc(q.b)} &nbsp; = &nbsp; ${esc(q.c)} : <b>?</b></p>`, secenekler: karisik.map(esc), dogru: karisik.indexOf(q.d), aciklama: q.aciklama };
}
export function farkliKelime(r, z, kullanilan = new Set()) {
  const kalan = FARKLI.map((_, i) => i).filter((i) => !kullanilan.has('f' + i)); const i = r.pick(kalan.length ? kalan : FARKLI.map((_, j) => j)); kullanilan.add('f' + i);
  const q = FARKLI[i], hedef = q.kelimeler[q.farkli], karisik = r.shuffle(q.kelimeler);
  return { tur: 'Sözel', soru: '<p>Aşağıdaki sözcüklerden dördü ortak bir özelliğe sahiptir. Hangisi bu gruba uymaz?</p>', secenekler: karisik.map(esc), dogru: karisik.indexOf(hedef), aciklama: q.aciklama };
}

export const URETICILER = { sayiDizisi, harfDizisi, sayiBenzetme, farkliSayi, mantik, matris, donus, dikkat, benzetme, farkliKelime };

/** Test tanımından soru listesi üretir. karisim: [[üretici adı, adet, zorluk?], …] */
export function testUret(karisim, tohum) {
  const r = rng(tohum), kullanilan = new Set(), liste = [];
  for (const [ad, adet, z] of karisim) for (let i = 0; i < adet; i++) {
    const zor = z || (i < adet / 3 ? 1 : i < (2 * adet) / 3 ? 2 : 3); // zorluk verilmemişse kolaydan zora
    liste.push({ ...URETICILER[ad](r, zor, kullanilan), zorluk: zor, uretici: ad });
  }
  // Türleri karıştır ama zorluk sırasını (kolay → zor) koru
  return liste.map((q, i) => [q, q.zorluk * 100 + r() * 99, i]).sort((a, b) => a[1] - b[1]).map((x) => x[0]);
}
