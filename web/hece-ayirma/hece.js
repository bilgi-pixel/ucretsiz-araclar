// Türkçe hece ayırma çekirdeği (saf mantık, DOM yok).
// Kural: her hecede tek ünlü vardır; ğ ve y ünsüzdür. İki ünlü arasında ünsüz yoksa ikinci ünlü yeni heceyi başlatır,
// tek ünsüz sonraki heceye gider, iki ünsüzün ilki öncekine, üç ünsüzde ilk ikisi öncekine gider (kont-rol).
// Alıntı istisnası: "ktr" kümesi k | tr biçiminde bölünür (e-lek-trik, dok-trin).

const VOWELS = 'aeıioöuüâîû';

/** Tek harfi Türkçe kurala göre küçültür. */
const lc = (c) => (c === 'I' ? 'ı' : c === 'İ' ? 'i' : c.toLowerCase());
const isV = (c) => VOWELS.includes(lc(c));

/** Yalnızca harflerden oluşan bir sözcüğü hecelerine ayırır; büyük/küçük harf korunur. */
export function syllabify(word) {
  const ch = Array.from(word);
  const vi = [];
  ch.forEach((c, i) => { if (isV(c)) vi.push(i); });
  if (vi.length <= 1) return [word];
  const cuts = [];
  for (let k = 0; k < vi.length - 1; k++) {
    const a = vi[k]; const b = vi[k + 1];
    const n = b - a - 1;
    if (n === 0) cuts.push(b);
    else if (n === 1) cuts.push(a + 1);
    else if (n === 2) cuts.push(a + 2);
    else {
      const run = ch.slice(a + 1, b).map(lc).join('');
      cuts.push(run === 'ktr' ? a + 2 : a + 3);
    }
  }
  const out = [];
  let from = 0;
  for (const c of cuts) { out.push(ch.slice(from, c).join('')); from = c; }
  out.push(ch.slice(from).join(''));
  return out;
}

/** Kesme işaretli sözcüğü ("Ankara'nın") parça parça heceler; her parçanın hece dizisini döndürür. */
export function syllabifyToken(token) {
  return token.split(/['’]/).filter(Boolean).map(syllabify);
}

/** Görüntü biçimi: "An-ka-ra'-nın". */
export function formatToken(token) {
  return syllabifyToken(token).map((s) => s.join('-')).join("'-");
}

/** Sözcükteki hece sayısı = ünlü sayısı. */
export function countSyllables(token) {
  return Array.from(token).filter(isV).length;
}

const WORD_RE = /[\p{L}]+(?:['’][\p{L}]+)*/gu;

/** Metindeki sözcükleri (hece dizileriyle) çıkarır. */
export function tokenize(text) {
  return Array.from(text.matchAll(WORD_RE)).map((m) => ({ word: m[0], index: m.index, parts: syllabifyToken(m[0]) }));
}

/** Metni, sözcüklerin içi hece tireli, geri kalanı aynen olacak biçimde döndürür. */
export function hyphenateText(text) {
  return text.replace(WORD_RE, (w) => formatToken(w));
}

/**
 * Satır sonunda bölünebilecek yerler: her iki yanda en az 2 harf kalmalı
 * (tek harf satır sonunda ya da satır başında bırakılmaz; sözcük sonundaki tek ünlü de başa taşınmaz).
 */
export function breakPoints(word) {
  const syl = syllabify(word.replace(/['’]/g, ''));
  const res = [];
  for (let i = 1; i < syl.length; i++) {
    const left = syl.slice(0, i).join('');
    const right = syl.slice(i).join('');
    if (Array.from(left).length >= 2 && Array.from(right).length >= 2) res.push(`${left}-${right}`);
  }
  return res;
}

/** Hece ölçüsü seçenekleri: değer → { toplam, duraklar } */
export const METERS = {
  serbest: { total: 0, stops: [] },
  '7': { total: 7, stops: [4] },
  '8-44': { total: 8, stops: [4] },
  '8-53': { total: 8, stops: [5] },
  '11-65': { total: 11, stops: [6] },
  '11-443': { total: 11, stops: [4, 8] },
};

/** Bir şiir satırını çözümler: sözcükler, toplam hece, durak işaretli gösterim. */
export function analyzeLine(line, meterKey = 'serbest') {
  const meter = METERS[meterKey] || METERS.serbest;
  const words = tokenize(line);
  const items = []; // { text, wordEnd }
  for (const w of words) {
    const sylls = w.parts.flat();
    sylls.forEach((s, i) => items.push({ text: s, wordEnd: i === sylls.length - 1 }));
  }
  const count = items.filter((it) => countSyllables(it.text) > 0).length;
  let display = '';
  let seen = 0;
  items.forEach((it, i) => {
    display += it.text;
    seen += countSyllables(it.text) > 0 ? 1 : 0;
    const last = i === items.length - 1;
    if (last) return;
    const stop = meter.stops.includes(seen) && seen < count;
    if (it.wordEnd) display += stop ? ' | ' : ' ';
    else display += stop ? ' | ' : '-';
  });
  let status = 'serbest';
  let diff = 0;
  if (meter.total) {
    diff = count - meter.total;
    status = count === 0 ? 'bos' : diff === 0 ? 'uygun' : diff < 0 ? 'eksik' : 'fazla';
  }
  return { count, display, status, diff, words: words.length };
}
