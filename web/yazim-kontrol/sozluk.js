// Türkçe yazım denetimi çekirdeği: sözlük + ek soyma + kural tabanlı kontroller.
// Saf mantık (DOM yok); arayüz tool.js içinde. Hiçbir veri ağa gitmez.
// Not: sözlük tabanlıdır, TDK'nin yerini tutmaz; liste her çekimli biçimi içermez,
// bu yüzden ek soyma ile desteklenir (ad çekimi, fiil çekimi, yaygın yapım ekleri).

const VOWELS = 'aeıioöuüâîû';
const isVowel = (c) => c !== undefined && c !== '' && VOWELS.includes(c);

/** Türkçe küçük harf kuralı: I → ı, İ → i. */
export function trLower(s) {
  return s.replace(/I/g, 'ı').replace(/İ/g, 'i').toLocaleLowerCase('tr-TR');
}

/** Türkçe büyük harf kuralı: i → İ, ı → I. */
export function trUpper(s) {
  return s.replace(/i/g, 'İ').replace(/ı/g, 'I').toLocaleUpperCase('tr-TR');
}

const capitalize = (s) => {
  const [first = '', ...rest] = Array.from(s);
  return trUpper(first) + rest.join('');
};

// ---------- Ünlü uyumu ve ünsüz benzeşmesi yardımcıları ----------

const lastVowel = (s) => {
  for (let i = s.length - 1; i >= 0; i--) if (isVowel(s[i])) return s[i];
  return '';
};
const HARM_I = { a: 'ı', ı: 'ı', â: 'ı', e: 'i', i: 'i', î: 'i', o: 'u', u: 'u', û: 'u', ö: 'ü', ü: 'ü' };
const ALT_VOWEL = { a: 'e', ı: 'i', o: 'ö', u: 'ü', â: 'e', û: 'ü', e: 'a', i: 'ı', ö: 'o', ü: 'u', î: 'ı' };
// Ünlü uyumuna uymayan yaygın alıntı gövdeler (kalbi, saati, harfi...).
const LOOSE_STEMS = new Set(['saat', 'kalp', 'harf', 'dikkat', 'hakikat', 'sıhhat', 'ihtimal', 'kalb']);
const uniq = (arr) => Array.from(new Set(arr));
const cart = (...parts) => parts.reduce((acc, p) => {
  const out = [];
  for (const a of acc) for (const x of p) out.push(a + x);
  return out;
}, ['']);

function vowelSet(R) {
  const v = lastVowel(R) || 'e';
  const loose = R.endsWith('l') || LOOSE_STEMS.has(R) || /[âîû]/.test(R);
  return loose ? [v, ALT_VOWEL[v]] : [v];
}
const hA = (R) => uniq(vowelSet(R).map((v) => ('aıouâû'.includes(v) ? 'a' : 'e')));
const hI = (R) => uniq(vowelSet(R).map((v) => HARM_I[v]));
const VOICELESS = 'çfhkpsşt';
const dd = (R) => (VOICELESS.includes(R[R.length - 1]) ? 't' : 'd');
const cc = (R) => (VOICELESS.includes(R[R.length - 1]) ? 'ç' : 'c');
const ve = (R) => isVowel(R[R.length - 1]);
const FOLD = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };
const fold = (s) => s.replace(/[çğıöşüâîû]/g, (c) => FOLD[c]);

/** Gövdeye uygun yer-durum eki ("kitap" → "kitapta", "ev" → "evde"). */
export function locativeOf(stem) {
  return stem + dd(stem) + hA(stem)[0];
}

// ---------- Ek tablosu ----------
// Her ek: id, dom (hangi gövde türünden sonra: N ad / V fiil), slot (sıra), left (soyulunca kalan türü),
// next (kalan için üst sıra sınırı), forms(R) → olası yüzey biçimleri, needNext (hemen sonra zorunlu ek sırası).
// Sağdan sola soyulur; slot sırası azalmak zorundadır (ör. ev-ler-i-nde: durum < iyelik < çoğul).

const ENTRIES = [];
const add = (id, dom, slot, left, next, forms, extra = {}) => ENTRIES.push({ id, dom, slot, left, next, forms, ...extra });

// Ad çekimi (slot: 1 yapım, 2 çoğul, 3 iyelik, 4 durum, 5 ek-fiil, 6 kişi)
add('pl', 'N', 2, 'N', 2, (R) => cart(['l'], hA(R), ['r']));
add('poss', 'N', 3, 'N', 3, (R) => {
  const I = hI(R); const buf = ve(R);
  return [
    ...cart(buf ? [''] : I, ['m']),
    ...cart(buf ? [''] : I, ['n']),
    ...(buf ? cart(['s'], I) : I),
    ...cart(buf ? [''] : I, ['m'], I, ['z']),
    ...cart(buf ? [''] : I, ['n'], I, ['z']),
  ];
});
add('acc', 'N', 4, 'N', 4, (R) => (ve(R) ? [...cart(['y'], hI(R)), ...cart(['n'], hI(R))] : [...hI(R), ...cart(['n'], hI(R))]));
add('dat', 'N', 4, 'N', 4, (R) => (ve(R) ? [...cart(['y'], hA(R)), ...cart(['n'], hA(R))] : [...hA(R), ...cart(['n'], hA(R))]));
add('loc', 'N', 4, 'N', 4, (R) => [...cart(['nd'], hA(R)), ...cart([dd(R)], hA(R))]);
add('abl', 'N', 4, 'N', 4, (R) => [...cart(['nd'], hA(R), ['n']), ...cart([dd(R)], hA(R), ['n'])]);
add('gen', 'N', 4, 'N', 4, (R) => (ve(R) ? cart(['n'], hI(R), ['n']) : cart(hI(R), ['n'])));
add('ins', 'N', 4, 'N', 4, (R) => (ve(R) ? cart(['yl'], hA(R)) : cart(['l'], hA(R))));
add('ki', 'N', 0, 'N', 5, () => ['ki', 'kü']);
// Ek-fiil
add('copdir', 'N', 5, 'N', 5, (R) => cart([dd(R)], hI(R), ['r']));
add('copdi', 'N', 5, 'N', 5, (R) => cart(ve(R) ? ['y'] : [''], [dd(R)], hI(R)));
add('copmis', 'N', 5, 'N', 5, (R) => cart(ve(R) ? ['y'] : [''], ['m'], hI(R), ['ş']));
add('copsa', 'N', 5, 'N', 5, (R) => cart(ve(R) ? ['y'] : [''], ['s'], hA(R)));
add('copperson', 'N', 6, 'N', 6, (R) => {
  const I = hI(R); const y = ve(R) ? ['y'] : [''];
  return [...cart(y, I, ['m']), ...cart(['s'], I, ['n']), ...cart(y, I, ['z']), ...cart(['s'], I, ['n'], I, ['z'])];
});
add('copperson2', 'N', 6, 'N', 6, (R) => ['m', 'n', 'k', ...cart(['n'], hI(R), ['z'])], { needNext: [5] });
// Addan ad / fiil yapım ekleri (slot 1)
add('nken', 'N', 5, 'N', 5, () => ['ken', 'yken']);
add('lI', 'N', 1, 'N', 1, (R) => cart(['l'], hI(R)));
add('sIz', 'N', 1, 'N', 1, (R) => cart(['s'], hI(R), ['z']));
add('lIk', 'N', 1, 'N', 1, (R) => [...cart(['l'], hI(R), ['k']), ...cart(['l'], hI(R), ['ğ'])]);
add('cI', 'N', 1, 'N', 1, (R) => cart([cc(R)], hI(R)));
add('cIk', 'N', 1, 'N', 1, (R) => [...cart([cc(R)], hI(R), ['k']), ...cart([cc(R)], hI(R), ['ğ'])]);
add('cA', 'N', 1, 'N', 1, (R) => cart([cc(R)], hA(R)));
add('sAl', 'N', 1, 'N', 1, (R) => cart(['s'], hA(R), ['l']));
add('lAs', 'V', 1, 'N', 2, (R) => cart(['l'], hA(R), ['ş']));
add('lA', 'V', 1, 'N', 2, (R) => cart(['l'], hA(R)));
add('lAn', 'V', 1, 'N', 2, (R) => cart(['l'], hA(R), ['n']));
// Fiilden ad yapan ekler (slot 1; soldaki fiil gövdesi, neg/çatı sırası serbest)
add('nmA', 'N', 1, 'V', 3, (R) => cart(['m'], hA(R)));
add('nmAk', 'N', 1, 'V', 3, (R) => cart(['m'], hA(R), ['k']));
add('nDIk', 'N', 1, 'V', 3, (R) => [...cart([dd(R)], hI(R), ['k']), ...cart([dd(R)], hI(R), ['ğ'])]);
add('nAn', 'N', 1, 'V', 3, (R) => cart(ve(R) ? ['y'] : [''], hA(R), ['n']));
add('nIs', 'N', 1, 'V', 3, (R) => cart(ve(R) ? ['y'] : [''], hI(R), ['ş']));
add('nAcAk', 'N', 1, 'V', 3, (R) => [...cart(ve(R) ? ['y'] : [''], hA(R), ['c'], hA(R), ['k']), ...cart(ve(R) ? ['y'] : [''], hA(R), ['c'], hA(R), ['ğ'])]);
add('nIcI', 'N', 1, 'V', 3, (R) => cart(ve(R) ? ['y'] : [''], hI(R), ['c'], hI(R)));
// Fiil çekimi (slot: 1 çatı, 2 olumsuzluk, 3 kip/zaman, 4 hikâye, 5 kişi)
add('vDIr', 'V', 1, 'V', 1, (R) => cart([dd(R)], hI(R), ['r']));
add('vT', 'V', 1, 'V', 1, () => ['t']);
add('vIl', 'V', 1, 'V', 1, (R) => [...cart(hI(R), ['l']), ...cart(hI(R), ['n']), ...(ve(R) ? ['n'] : [])]);
add('vIs', 'V', 1, 'V', 1, (R) => [...cart(hI(R), ['ş']), ...(ve(R) ? ['ş'] : [])]);
add('vAbil', 'V', 2.5, 'V', 2.5, (R) => cart(ve(R) ? ['y'] : [''], hA(R), ['bil']));
add('neg', 'V', 2, 'V', 1, (R) => cart(['m'], hA(R)));
add('vAmA', 'V', 2, 'V', 1, (R) => cart(ve(R) ? ['y'] : [''], hA(R), ['m'], hA(R)));
add('mAz', 'V', 3, 'V', 1, (R) => cart(['m'], hA(R), ['z']));
add('mAdAn', 'V', 3, 'V', 1, (R) => cart(['m'], hA(R), ['d'], hA(R), ['n']));
add('mIyor', 'V', 3, 'V', 1, (R) => cart(['m'], hI(R), ['yor']));
add('yor', 'V', 3, 'V', 3, () => ['yor'], {
  // Daralma: bekle-yor → bekliyor, de-yor → diyor; gel-iyor → geliyor.
  post: (R) => {
    const out = [{ R, vi: false }];
    const last = R[R.length - 1];
    if (R.length >= 2 && 'ıiuü'.includes(last)) {
      out.push({ R: R.slice(0, -1), vi: true });
      out.push({ R: R.slice(0, -1) + ('ıu'.includes(last) ? 'a' : 'e'), vi: false });
    }
    return out;
  },
});
add('vDI', 'V', 3, 'V', 3, (R) => cart([dd(R)], hI(R)));
add('vMIs', 'V', 3, 'V', 3, (R) => cart(['m'], hI(R), ['ş']));
add('vAcAk', 'V', 3, 'V', 3, (R) => [...cart(ve(R) ? ['y'] : [''], hA(R), ['c'], hA(R), ['k']), ...cart(ve(R) ? ['y'] : [''], hA(R), ['c'], hA(R), ['ğ'])]);
add('aorist', 'V', 3, 'V', 3, (R) => (ve(R) ? ['r'] : [...cart(hI(R), ['r']), ...cart(hA(R), ['r'])]));
add('vSA', 'V', 3, 'V', 3, (R) => cart(['s'], hA(R)));
add('mAlI', 'V', 3, 'V', 3, (R) => cart(['m'], hA(R), ['l'], hI(R)));
add('mAktA', 'V', 3, 'V', 3, (R) => cart(['m'], hA(R), ['kt'], hA(R)));
add('imp3', 'V', 3, 'V', 3, (R) => cart(['s'], hI(R), ['n']));
add('imp2', 'V', 3, 'V', 3, (R) => [...cart(ve(R) ? ['y'] : [''], hI(R), ['n']), ...cart(ve(R) ? ['y'] : [''], hI(R), ['n'], hI(R), ['z'])]);
add('opt1', 'V', 3, 'V', 3, (R) => [...cart(ve(R) ? ['y'] : [''], hA(R), ['l'], hI(R), ['m']), ...cart(ve(R) ? ['y'] : [''], hA(R), ['y'], hI(R), ['m'])]);
add('gerIp', 'V', 3, 'V', 3, (R) => cart(ve(R) ? ['y'] : [''], hI(R), ['p']));
add('gerArAk', 'V', 3, 'V', 3, (R) => cart(ve(R) ? ['y'] : [''], hA(R), ['r'], hA(R), ['k']));
add('gerIncA', 'V', 3, 'V', 3, (R) => cart(ve(R) ? ['y'] : [''], hI(R), ['nc'], hA(R)));
add('vcopdi', 'V', 4, 'V', 4, (R) => cart(ve(R) ? ['y'] : [''], [dd(R)], hI(R)), { needNext: [3, 3.5] });
add('vcopmis', 'V', 4, 'V', 4, (R) => cart(ve(R) ? ['y'] : [''], ['m'], hI(R), ['ş']), { needNext: [3, 3.5] });
add('vcopsa', 'V', 4, 'V', 4, (R) => cart(ve(R) ? ['y'] : [''], ['s'], hA(R)), { needNext: [3, 3.5] });
add('vcopdir', 'V', 4, 'V', 4, (R) => cart([dd(R)], hI(R), ['r']), { needNext: [3, 3.5] });
add('vplural', 'V', 3.5, 'V', 3.5, (R) => cart(['l'], hA(R), ['r']), { needNext: [3] });
add('ken', 'V', 4, 'V', 4, () => ['ken', 'yken'], { needNext: [3, 3.5] });
add('vperson', 'V', 5, 'V', 5, (R) => {
  const I = hI(R); const A = hA(R);
  return [
    'm', 'n', 'k',
    ...cart(I, ['m']), ...cart(['y'], I, ['m']),
    ...cart(['s'], I, ['n']),
    ...cart(I, ['z']), ...cart(['y'], I, ['z']),
    ...cart(['n'], I, ['z']), ...cart(['s'], I, ['n'], I, ['z']),
    ...cart(['l'], A, ['r']),
  ];
}, { needNext: [2, 3, 4] });

// Soyma tabloları: (alan, gövde özelliği) → { yüzey biçim → ek listesi }; gövdeye yalnızca son ünlü/son harf etki eder.
const tableCache = new Map();
function tableFor(dom, rest) {
  const key = `${dom}|${lastVowel(rest)}|${rest[rest.length - 1] || ''}|${rest.endsWith('l') ? 'l' : ''}|${LOOSE_STEMS.has(rest) ? rest : ''}`;
  let t = tableCache.get(key);
  if (!t) {
    t = new Map();
    for (const e of ENTRIES) {
      if (e.dom !== dom) continue;
      for (const f of e.forms(rest)) {
        if (!t.has(f)) t.set(f, []);
        t.get(f).push(e);
      }
    }
    tableCache.set(key, t);
  }
  return t;
}

// ---------- Kelime listesi ve sorgular ----------

// Listede bulunmayabilen sık kapalı sınıf sözcükler (zamir, bağlaç, sayı, soru sözcüğü...).
const EXTRA_WORDS = (
  'o ben sen biz siz onlar beni seni bizi sizi onu onları bana sana ona bize size onlara benim senin onun bizim sizin onların ' +
  'bende sende onda bizde sizde onlarda benden senden ondan bizden sizden onlardan benimle seninle onunla bizimle sizinle onlarla ' +
  'bunu şunu buna şuna bunun şunun bunda şunda bundan şundan bunlar şunlar bunları şunları bunlara şunlara bunlarda bunlardan bunlarla ' +
  'bununla şununla burada şurada orada buraya şuraya oraya buradan şuradan oradan burası şurası orası buranın oranın ' +
  'kendi kendim kendin kendisi kendimiz kendiniz kendileri kendini kendine kendinde kendinden kendisini kendisine ' +
  'hepsi hepimiz hepiniz herkes herkesin herkese herkesi kimse kimsenin kimseye kimseyi kimi kime kimin kimle kimden kimler ' +
  'neyi neye neden nerede nereye nereden neler nelerin nedir nasıl niçin niye hangi hangisi kaç kaçı kaçıncı ' +
  'bir biri birisi birine birini birinin birinde birinden biriyle hiçbiri birkaç birçok hiçbir ' +
  'iki üç dört beş altı yedi sekiz dokuz on yirmi otuz kırk elli altmış yetmiş seksen doksan yüz bin milyon milyar ' +
  'birinci ikinci üçüncü dördüncü beşinci ' +
  've ile ama fakat ancak lakin çünkü hatta ise ki de da mi mı mu mü ya yahut veya yani oysa oysaki halbuki sanki belki ' +
  'çok az daha en pek hem hiç hep her bazı bütün tüm sadece yalnız ancak bile dahi gibi kadar için üzere göre rağmen karşın ' +
  'şimdi sonra önce evet hayır tamam lütfen teşekkür merhaba selam ' +
  'mod modu ipucu ipuçları internet web site kağıt kâğıt telefon e-posta bilgisayar şu bu o şey şeyi şeyin şeyler şeylerin'
).split(/\s+/);

export function createSpeller(words) {
  const set = new Set(words);
  for (const w of EXTRA_WORDS) set.add(w);
  const cache = new Map();

  const lookupN = (R, vi) => {
    if (set.has(R)) return true;
    if (!vi || R.length < 2) return false;
    const last = R[R.length - 1];
    const hard = { b: 'p', c: 'ç', d: 't', g: 'k', ğ: 'k' }[last];
    if (hard && set.has(R.slice(0, -1) + hard)) return true;
    // Ünsüz ikizleşmesi: hakkı → hak, hissi → his
    if (R.length >= 3 && R[R.length - 2] === last && set.has(R.slice(0, -1))) return true;
    // Ünlü düşmesi: metni → metin, ağzı → ağız
    if (R.length >= 3 && !isVowel(last) && !isVowel(R[R.length - 2])) {
      for (const v of 'ıiuü') if (set.has(R.slice(0, -1) + v + last)) return true;
    }
    return false;
  };

  const lookupV = (R, vi) => {
    const roots = [R];
    if (vi && R.length >= 2) {
      const hard = { b: 'p', c: 'ç', d: 't', g: 'k', ğ: 'k' }[R[R.length - 1]];
      if (hard) roots.push(R.slice(0, -1) + hard);
    }
    return roots.some((r) => r.length >= 1 && set.has(r + ('aıouâû'.includes(lastVowel(r)) ? 'mak' : 'mek')));
  };

  function analyze(w) {
    const memo = new Map();
    const go = (R, dom, bound, need, vi, depth) => {
      if (!need && (dom === 'N' ? lookupN(R, vi) : lookupV(R, vi))) return true;
      if (depth >= 5) return false;
      const key = `${R}|${dom}|${bound}|${need ? need.join('') : ''}|${vi ? 1 : 0}`;
      if (memo.has(key)) return memo.get(key);
      let ok = false;
      const maxLen = Math.min(10, R.length - 1);
      for (let len = 1; len <= maxLen && !ok; len++) {
        const suf = R.slice(R.length - len);
        const rest = R.slice(0, R.length - len);
        const hits = tableFor(dom, rest).get(suf);
        if (!hits) continue;
        for (const e of hits) {
          if (!(e.slot === 0 || (e.slot === 1 ? bound >= 1 : e.slot < bound))) continue;
          if (need && !need.includes(e.slot)) continue;
          const alts = e.post ? e.post(rest) : [{ R: rest, vi: isVowel(suf[0]) }];
          for (const a of alts) {
            const viNext = e.post ? (a.vi || false) : a.vi;
            if (go(a.R, e.left, e.next, e.needNext || null, viNext, depth + 1)) { ok = true; break; }
          }
          if (ok) break;
        }
      }
      memo.set(key, ok);
      return ok;
    };
    return go(w, 'N', 7, null, false, 0) || go(w, 'V', 6, null, false, 0);
  }

  /** Küçük harfli, yalnızca harflerden oluşan sözcük bilinen bir biçim mi? */
  function isKnown(word) {
    let w = word.replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u');
    if (cache.has(w)) return cache.get(w);
    const res = set.has(w) || analyze(w);
    cache.set(w, res);
    return res;
  }

  // Öneri için uzunluğa göre kovalar (ilk kullanımda kurulur).
  let byLen = null;
  const buckets = () => {
    if (byLen) return byLen;
    byLen = new Map();
    for (const w of set) {
      if (w.length < 2) continue;
      if (!byLen.has(w.length)) byLen.set(w.length, []);
      byLen.get(w.length).push(w);
    }
    return byLen;
  };

  /** Sınırlı Damerau-Levenshtein (yan yana yer değiştirme 1 sayılır); sınırı aşarsa Infinity. */
  function distance(a, b, max) {
    const la = a.length; const lb = b.length;
    if (Math.abs(la - lb) > max) return Infinity;
    let prev2 = null;
    let prev = Array.from({ length: lb + 1 }, (_, j) => j);
    for (let i = 1; i <= la; i++) {
      const cur = new Array(lb + 1);
      cur[0] = i;
      let rowMin = i;
      for (let j = 1; j <= lb; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
        cur[j] = v;
        if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return Infinity;
      prev2 = prev;
      prev = cur;
    }
    return prev[lb] <= max ? prev[lb] : Infinity;
  }

  /** En yakın öneriler (düzenleme uzaklığı ≤ 2; yalnızca Türkçe karakter farkı olanlar öne alınır). */
  function suggest(word, max = 5) {
    const w = trLower(word).replace(/[^\p{L}]/gu, '');
    if (w.length < 2) return [];
    const fw = fold(w);
    const b = buckets();
    const scored = new Map();
    const put = (cand, cost) => {
      const old = scored.get(cand);
      if (old === undefined || cost < old) scored.set(cand, cost);
    };
    for (let L = Math.max(2, w.length - 2); L <= w.length + 2; L++) {
      for (const cand of b.get(L) || []) {
        if (cand === w) continue;
        const foldEq = L === w.length && fold(cand) === fw;
        const d = distance(w, cand, 2);
        if (d === Infinity && !foldEq) continue;
        let cost = d === Infinity ? 2.2 : d;
        if (foldEq) cost -= 0.7;
        if ((FOLD[cand[0]] || cand[0]) !== (FOLD[w[0]] || w[0])) cost += 0.5;
        if (cand.startsWith(w) || w.startsWith(cand)) cost -= 0.1;
        cost += Math.abs(L - w.length) * 0.01;
        put(cand, cost);
      }
    }
    // Ekli biçimler: kök yazım hatası olabilir (kitablar → kitaplar).
    for (let k = 1; k <= 5; k++) {
      const stem = w.slice(0, w.length - k);
      const suf = w.slice(w.length - k);
      if (stem.length < 3) break;
      for (let L = stem.length - 1; L <= stem.length + 1; L++) {
        for (const cand of b.get(L) || []) {
          if (cand === stem) continue;
          const d = distance(stem, cand, 1);
          if (d === Infinity) continue;
          const full = cand + suf;
          if (set.has(full) || isKnown(full)) put(full, d + 0.4);
        }
      }
    }
    return Array.from(scored.entries())
      .sort((x, y) => x[1] - y[1] || x[0].localeCompare(y[0], 'tr'))
      .slice(0, max)
      .map(([cand]) => cand);
  }

  return { size: set.size, has: (w) => set.has(w), isKnown, suggest };
}

// ---------- Kural tabanlı kontroller ----------

// Sık yapılan yazım yanlışları (ayrı/bitişik, ünlü eksikliği) → doğru yazılış.
const COMMON_MISTAKES = [
  ['herşey', 'her şey'], ['hiçbirşey', 'hiçbir şey'], ['birşey', 'bir şey'], ['hertürlü', 'her türlü'],
  ['hergün', 'her gün'], ['yada', 'ya da'], ['yinede', 'yine de'], ['dahada', 'daha da'], ['birde', 'bir de'],
  ['pekçok', 'pek çok'], ['herkez', 'herkes'], ['yalnış', 'yanlış'], ['yanlız', 'yalnız'], ['malesef', 'maalesef'],
  ['orjinal', 'orijinal'], ['kordinat', 'koordinat'], ['inşaallah', 'inşallah'], ['şuan', 'şu an'], ['çünki', 'çünkü'],
  ['bi kaç', 'birkaç'], ['bir kaç', 'birkaç'], ['bir çok', 'birçok'], ['hiç bir', 'hiçbir'], ['her kes', 'herkes'],
];
const MISTAKE_RE = new RegExp(
  `(?<![\\p{L}\\p{N}])(${COMMON_MISTAKES.map(([w]) => w.replace(' ', '\\s+')).join('|')})(?![\\p{L}\\p{N}])`, 'giu');
const MISTAKE_MAP = new Map(COMMON_MISTAKES.map(([w, r]) => [w, r]));

const ABBREVIATIONS = new Set(['vb', 'vs', 'vd', 'bkz', 'örn', 'yy', 'sn', 'dk', 'sa', 'no', 'dr', 'prof', 'doç', 'av', 'mah', 'cad', 'sok', 'tel', 'apt', 'kat', 'yrd', 'öğr', 'üyesi', 'çev', 'ed', 'bs', 'ort']);

const PRONOUN_DE = { bende: 'ben de', sende: 'sen de', bizde: 'biz de', sizde: 'siz de', onda: 'o da' };

const MI_TAILS = ['', 'sin', 'sın', 'sun', 'sün', 'siniz', 'sınız', 'sunuz', 'sünüz', 'yim', 'yım', 'yum', 'yüm', 'yiz', 'yız', 'yuz', 'yüz', 'ydi', 'ydı', 'ydu', 'ydü']
  .sort((a, b) => b.length - a.length);

/** Soru ekinin ("mı/mi/mu/mü") sözcüğe bitişik yazıldığı durumu bulur. */
function detectMi(lw, speller) {
  for (const tail of MI_TAILS) {
    if (tail && !lw.endsWith(tail)) continue;
    const body = tail ? lw.slice(0, lw.length - tail.length) : lw;
    const m = /(m[ıiuü])$/.exec(body);
    if (!m) continue;
    const stem = body.slice(0, body.length - 2);
    if (stem.length < 2 || !speller.isKnown(stem)) continue;
    return { stemLen: stem.length, particleLen: 2 + tail.length };
  }
  return null;
}

/** "de/da" ya da "ki" bitişik yazıldığında soldaki sözcük bilinen bir sözcükse ipucu üretir. */
function detectDeKi(lw, speller) {
  const m = /(d[ae]|t[ae]|k[iü])$/.exec(lw);
  if (!m) return null;
  const stem = lw.slice(0, lw.length - 2);
  if (stem.length < 3 || !speller.isKnown(stem)) return null;
  return { stemLen: stem.length, kind: m[1][0] === 'k' ? 'ki' : 'de' };
}

const isUrlLike = (chunk) => /https?:|www\.|@|\/\//.test(chunk);
const chunkAt = (text, i) => {
  let a = i; let b = i;
  while (a > 0 && !/\s/.test(text[a - 1])) a--;
  while (b < text.length && !/\s/.test(text[b])) b++;
  return text.slice(a, b);
};

/** Metindeki biçim ve kural sorunlarını (boşluk, noktalama, cümle başı, sık yanlışlar) bulur. */
function ruleIssues(text) {
  const out = [];
  const push = (start, end, code, kind, message, choices, extra = {}) =>
    out.push({ start, end, code, kind, message, choices, text: text.slice(start, end), ...extra });

  for (const m of text.matchAll(/(?<=\S)( {2,})(?=\S)/g)) {
    push(m.index, m.index + m[1].length, 'cift-bosluk', 'rule', 'Arka arkaya birden fazla boşluk var. Tek boşluk yeterlidir.', [' '], { fixable: true });
  }
  for (const m of text.matchAll(/(?<=[\p{L}\p{N}])( +)([,;:!?.])(?=\s|$)/gu)) {
    // "…" ve çok noktalı listeler dışında: noktalama işaretinden önce boşluk bırakılmaz.
    push(m.index, m.index + m[0].length, 'noktalama-once', 'rule', 'Noktalama işaretinden önce boşluk bırakılmaz.', [m[2]], { fixable: true });
  }
  for (const m of text.matchAll(/(?<=[\p{L}\p{N}])([,;:!?])(?=\p{L})/gu)) {
    if (isUrlLike(chunkAt(text, m.index))) continue;
    push(m.index, m.index + 1, 'noktalama-sonra', 'rule', 'Noktalama işaretinden sonra bir boşluk bırakılır.', [`${m[1]} `], { fixable: true });
  }
  for (const m of text.matchAll(/(?<=\p{Ll})\.(?=\p{Lu})/gu)) {
    const chunk = chunkAt(text, m.index);
    if (isUrlLike(chunk) || /\p{L}\.\p{L}\./u.test(chunk)) continue;
    push(m.index, m.index + 1, 'noktalama-sonra', 'rule', 'Nokta işaretinden sonra bir boşluk bırakılır.', ['. '], { fixable: true });
  }
  // Cümle başı küçük harf
  for (const m of text.matchAll(/(^\s*|[.!?]\s+)(\p{Ll}+)/gu)) {
    const startOfWord = m.index + m[1].length;
    const word = m[2];
    if (m[1] && m[1][0] === '.') {
      const dotAt = m.index;
      if (/\d/.test(text[dotAt - 1] || '')) continue; // "3. madde"
      if (text[dotAt - 1] === '.') continue; // üç nokta
      const prevWord = /(\p{L}+)$/u.exec(text.slice(0, dotAt));
      if (prevWord && ABBREVIATIONS.has(trLower(prevWord[1]))) continue;
    }
    if (/^[.@]/.test(text.slice(startOfWord + word.length, startOfWord + word.length + 1)) && /\p{L}/u.test(text[startOfWord + word.length + 1] || '')) continue;
    if (/^(http|www)/.test(word)) continue;
    push(startOfWord, startOfWord + word.length, 'cumle-basi', 'rule', 'Cümle büyük harfle başlar.', [capitalize(word)], { fixable: false });
  }
  // Sık yanlışlar
  for (const m of text.matchAll(MISTAKE_RE)) {
    const key = trLower(m[1]).replace(/\s+/g, ' ');
    const right = MISTAKE_MAP.get(key);
    if (!right) continue;
    const repl = /^\p{Lu}/u.test(m[1]) ? capitalize(right) : right;
    push(m.index, m.index + m[0].length, 'sik-yanlis', 'rule', `Doğru yazılışı "${right}" biçimindedir.`, [repl]);
  }
  return out;
}

const overlaps = (a, b) => a.start < b.end && b.start < a.end;

/**
 * Metni denetler ve sorun listesi döndürür.
 * opts: ignored (Set, "kod:küçük metin"), checkStart (cümle başı sözcükleri de denetle), tick (async), onProgress(frac)
 */
export async function checkText(text, speller, opts = {}) {
  const ignored = opts.ignored || new Set();
  const issues = [];
  const rules = ruleIssues(text);
  const keyOf = (i) => `${i.code}:${trLower(i.text)}`;
  for (const r of rules) if (!ignored.has(keyOf(r))) issues.push(r);

  const re = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
  const matches = Array.from(text.matchAll(re));
  let prev = null; // önceki sözcük (küçük harf)
  for (let n = 0; n < matches.length; n++) {
    if (opts.tick && n > 0 && n % 1500 === 0) {
      if (opts.onProgress) opts.onProgress(n / matches.length);
      await opts.tick();
      if (opts.cancelled && opts.cancelled()) return issues;
    }
    const m = matches[n];
    const token = m[0];
    const idx = m.index;
    if (/\p{N}/u.test(token)) { prev = null; continue; }
    const apos = token.search(/['’]/);
    const head = apos >= 0 ? token.slice(0, apos) : token;
    const before = text[idx - 1] || '';
    const after = text[idx + head.length] || '';
    const next2 = text[idx + head.length + 1] || '';
    const urlish = (before !== '' && '@/#'.includes(before)) || (before === '.' && /\p{L}/u.test(text[idx - 2] || '')) || after === '@' || (after === '.' && /\p{L}/u.test(next2));
    const lw = trLower(head);
    const isCap = /^\p{Lu}/u.test(head);
    const startsSentence = idx === 0 || /(^|[.!?]\s+)$/.test(text.slice(Math.max(0, idx - 4), idx)) || /^\s*$/.test(text.slice(0, idx));
    const prevWord = prev;
    prev = lw;
    if (head.length < 2 || urlish || !/[aeıioöuüâîû]/.test(lw)) continue;

    const mk = (code, kind, message, choices, extra = {}) => {
      const issue = { start: idx, end: idx + head.length, code, kind, message, choices, text: head, ...extra };
      if (!ignored.has(keyOf(issue)) && !issues.some((x) => x.kind !== 'spell' && overlaps(x, issue))) issues.push(issue);
    };

    if (!speller.isKnown(lw)) {
      const mi = detectMi(lw, speller);
      if (mi) {
        const fixed = `${head.slice(0, mi.stemLen)} ${head.slice(mi.stemLen)}`;
        mk('mi', 'rule', 'Soru eki "mı/mi/mu/mü" kendinden önceki sözcükten ayrı yazılır.', [fixed]);
        continue;
      }
      const dk = detectDeKi(lw, speller);
      if (dk) {
        const stem = head.slice(0, dk.stemLen);
        const tail = head.slice(dk.stemLen);
        if (dk.kind === 'ki') {
          mk('ki', 'hint', '"ki" bağlaç ise ayrı yazılır (dedi ki). İlgi eki ise bitişiktir (evdeki, bugünkü). Anlamınıza göre kontrol edin.', [`${stem} ${tail}`]);
        } else {
          const lwStem = lw.slice(0, dk.stemLen);
          const conj = `${stem} d${hA(lwStem)[0]}`;
          const loc = locativeOf(stem);
          mk('de-da', 'hint', '"de/da" bağlaçsa ayrı yazılır ve her zaman "d" ile başlar; yer-durum (bulunma) eki ise bitişik yazılır ve sert ünsüzden sonra "t" olur. Kontrol edin.', uniq([conj, loc]).filter((c) => trLower(c) !== lw));
        }
        continue;
      }
      if (isCap && !(opts.checkStart && startsSentence)) continue;
      mk('spell', 'spell', 'Sözlükte bulunamadı.', null);
      continue;
    }
    // Bilinen sözcükler için ipuçları
    if (PRONOUN_DE[lw]) {
      const right = PRONOUN_DE[lw];
      mk('de-da', 'hint', `"${head}" yer-durum anlamındaysa ("bende var") bitişik yazılır; bağlaçsa ("ben de gelirim") ayrı yazılır. Anlamınıza göre kontrol edin.`, [isCap ? capitalize(right) : right]);
    } else if ((lw === 'ta' || lw === 'te') && prevWord && !isCap && before === ' ') {
      const harmony = hA(prevWord)[0] === 'a' ? 'da' : 'de';
      mk('de-da', 'hint', 'Ayrı yazılan bağlaç her zaman "da/de" olur ("ta/te" olmaz). "Ta uzaklardan" gibi pekiştirme kullanımıysa doğrudur; değilse kontrol edin.', [harmony]);
    } else if (lw === 'ki' && prevWord && /(d[ae]|t[ae])$/.test(prevWord) && speller.isKnown(prevWord)) {
      const pm = matches[n - 1];
      const pStart = pm.index;
      const pEnd = idx + head.length;
      if (text.slice(pm.index + pm[0].length, idx).trim() === '') {
        mk('ki', 'hint', '"ki" ilgi ekiyse önceki sözcüğe bitişik yazılır (evdeki, sınıftaki); bağlaçsa ayrı yazılır. Anlamınıza göre kontrol edin.', [pm[0] + head], { start: pStart, end: pEnd, text: text.slice(pStart, pEnd) });
      }
    }
  }
  // Metin sırasına diz; çakışanlarda kural/ipucu, yazım sorunundan önce gelir.
  issues.sort((a, b) => a.start - b.start || b.end - a.end);
  const kept = [];
  for (const i of issues) {
    const last = kept[kept.length - 1];
    if (last && overlaps(last, i)) continue;
    kept.push(i);
  }
  kept.forEach((i, k) => { i.id = k; });
  return kept;
}

/** Tek bir sorunu, seçilen metinle değiştirir; yeni metni döndürür. */
export function applyReplacement(text, issue, replacement) {
  return text.slice(0, issue.start) + replacement + text.slice(issue.end);
}

/** Otomatik düzeltilebilir biçim sorunlarını (boşluk/noktalama) toplu uygular. */
export function applyFormatFixes(text, issues) {
  let out = text;
  const fixes = issues.filter((i) => i.fixable).sort((a, b) => b.start - a.start);
  for (const i of fixes) out = applyReplacement(out, i, i.choices[0]);
  return { text: out, count: fixes.length };
}

/** Öneriyi özgün yazımın büyük/küçük harf biçimine uydurur. */
export function matchCase(original, suggestion) {
  return /^\p{Lu}/u.test(original) ? capitalize(suggestion) : suggestion;
}
