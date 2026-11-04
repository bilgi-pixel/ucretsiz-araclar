// Klasik şifreler ve kodlamalar — saf fonksiyonlar (DOM yok, ağ yok). Yalnızca eğitim ve eğlence içindir;
// bu yöntemler gerçek güvenlik sağlamaz.

/* ---------- Alfabeler ---------- */
// i/İ ve ı/I çiftleri yüzünden toUpperCase/toLowerCase kullanılmaz; büyük ve küçük harf dizgileri açıkça verilir.
export const ALPHABETS = {
  tr: { id: 'tr', up: Array.from('ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'), lo: Array.from('abcçdefgğhıijklmnoöprsştuüvyz'), label: 'Türk alfabesi (29 harf)' },
  en: { id: 'en', up: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), lo: Array.from('abcdefghijklmnopqrstuvwxyz'), label: 'İngiliz alfabesi (26 harf)' },
};

/** Harfin alfabedeki sırası ve büyük/küçük bilgisi; harf değilse null. */
function letterInfo(ch, alpha) {
  let i = alpha.up.indexOf(ch);
  if (i >= 0) return { i, upper: true };
  i = alpha.lo.indexOf(ch);
  if (i >= 0) return { i, upper: false };
  return null;
}

const mod = (a, n) => ((a % n) + n) % n;

/** Türkçe harfleri ASCII karşılıklarına çevirir (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u; İ→I). */
export function simplifyTr(text) {
  const map = { 'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U' };
  return Array.from(text).map((c) => map[c] ?? c).join('');
}

/**
 * Metindeki her harfi fn(sıra, harfSayacı) ile dönüştürür; harf olmayanlar aynen kalır.
 * Dönüş: { out, skipped } — skipped, alfabede olmayan ama harf gibi görünen karakterler (ör. Türk alfabesinde Q, W, X).
 */
export function mapLetters(text, alpha, fn) {
  let k = 0;
  const skipped = new Set();
  const out = Array.from(String(text).normalize('NFC')).map((ch) => {
    const li = letterInfo(ch, alpha);
    if (!li) {
      if (/\p{L}/u.test(ch)) skipped.add(ch);
      return ch;
    }
    const j = mod(fn(li.i, k++), alpha.up.length);
    return li.upper ? alpha.up[j] : alpha.lo[j];
  }).join('');
  return { out, skipped: [...skipped] };
}

/* ---------- Sezar ---------- */
export function caesar(text, alpha, shift, decrypt = false) {
  const n = alpha.up.length;
  const s = mod(Number(shift) || 0, n);
  return mapLetters(text, alpha, (i) => (decrypt ? i - s : i + s));
}

/** Sezar için tüm kaydırmaları dener (1 … N-1); her biri çözme yönündedir. */
export function caesarAll(text, alpha) {
  const n = alpha.up.length;
  const list = [];
  for (let k = 1; k < n; k++) list.push({ shift: k, text: caesar(text, alpha, k, true).out });
  return list;
}

/* ---------- Vigenère ---------- */
export function keyIndices(key, alpha) {
  const idx = [];
  for (const ch of Array.from(String(key ?? '').normalize('NFC'))) {
    const li = letterInfo(ch, alpha);
    if (li) idx.push(li.i);
  }
  return idx;
}

export function vigenere(text, alpha, key, decrypt = false) {
  const ks = keyIndices(key, alpha);
  if (!ks.length) throw new Error('Anahtar kelime en az bir harf içermeli. Seçili alfabedeki harflerden oluşan bir kelime yazın (ör. ANAHTAR).');
  return mapLetters(text, alpha, (i, k) => (decrypt ? i - ks[k % ks.length] : i + ks[k % ks.length]));
}

/* ---------- Atbash ve ROT13 ---------- */
export function atbash(text, alpha) {
  const n = alpha.up.length;
  return mapLetters(text, alpha, (i) => n - 1 - i);
}

export function rot13(text) {
  return mapLetters(text, ALPHABETS.en, (i) => i + 13);
}

/* ---------- A1Z26 ---------- */
export function a1z26Encode(text, alpha) {
  let prevLetter = false;
  const skipped = new Set();
  const out = Array.from(String(text).normalize('NFC')).map((ch) => {
    const li = letterInfo(ch, alpha);
    if (!li) {
      prevLetter = false;
      if (/\p{L}/u.test(ch)) skipped.add(ch);
      return ch;
    }
    const piece = (prevLetter ? '-' : '') + String(li.i + 1);
    prevLetter = true;
    return piece;
  }).join('');
  return { out, skipped: [...skipped] };
}

export function a1z26Decode(text, alpha) {
  const n = alpha.up.length;
  let bad = false;
  const out = String(text).replace(/\d+(?:\s*-\s*\d+)*/g, (run) => run.split('-').map((p) => {
    const v = Number(p.trim());
    if (v >= 1 && v <= n) return alpha.up[v - 1];
    bad = true;
    return '?';
  }).join(''));
  return { out, bad, max: n };
}

/* ---------- Ters çevirme ---------- */
export function reverseText(text, mode = 'tum') {
  const s = String(text).normalize('NFC');
  const rev = (t) => Array.from(t).reverse().join('');
  if (mode === 'kelime') return s.replace(/\S+/g, (w) => rev(w));
  if (mode === 'sira') return s.split(/(\s+)/).reverse().join('');
  return rev(s);
}

/* ---------- Mors ---------- */
export const MORSE = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--',
  N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
};
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

/** Metni Mors koduna çevirir: harfler arasında tek boşluk, kelimeler arasında " / ". Türkçe harfler ASCII karşılığıyla yazılır. */
export function morseEncode(text) {
  const src = simplifyTr(String(text).normalize('NFC')).toUpperCase();
  const skipped = new Set();
  const words = src.split(/\s+/).filter(Boolean).map((w) => Array.from(w).map((ch) => {
    if (MORSE[ch]) return MORSE[ch];
    skipped.add(ch);
    return '';
  }).filter(Boolean).join(' ')).filter(Boolean);
  return { out: words.join(' / '), skipped: [...skipped] };
}

/** Mors kodunu metne çevirir. Nokta, tire, boşluk ve / dışındaki karakterler hata sayılır. */
export function morseNormalize(code) {
  return String(code).replace(/[·•∙]/g, '.').replace(/[–—−_]/g, '-');
}

export function morseDecode(code) {
  const src = morseNormalize(code).trim();
  if (!src) return { out: '', unknown: [] };
  if (/[^.\-\s/|]/.test(src)) {
    throw new Error('Mors kodunda yalnızca nokta (.), tire (-), boşluk ve kelime ayırıcı (/) olabilir. Harf ya da başka işaret varsa "Şifrele" yönüne geçin.');
  }
  const unknown = [];
  const out = src.split(/\s*[/|]\s*|\n+|\s{3,}/).filter((w) => w.trim()).map((w) => w.trim().split(/\s+/).map((c) => {
    if (MORSE_REV[c]) return MORSE_REV[c];
    unknown.push(c);
    return '?';
  }).join('')).join(' ');
  return { out, unknown };
}

/** Çalma zaman çizelgesi: [{ on, units }] — nokta 1, çizgi 3, işaret arası 1, harf arası 3, kelime arası 7 birim. */
export function morseTimeline(code) {
  const segs = [];
  const words = morseNormalize(code).split(/\s*[/|]\s*|\n+/).map((w) => w.trim()).filter(Boolean);
  words.forEach((w, wi) => {
    const letters = w.split(/\s+/).filter(Boolean);
    letters.forEach((l, li) => {
      Array.from(l).forEach((sym) => {
        if (sym !== '.' && sym !== '-') return;
        segs.push({ on: true, units: sym === '.' ? 1 : 3 });
        segs.push({ on: false, units: 1 });
      });
      if (li < letters.length - 1 && segs.length) segs[segs.length - 1].units = 3;
    });
    if (wi < words.length - 1 && segs.length) segs[segs.length - 1].units = 7;
  });
  if (segs.length && !segs[segs.length - 1].on) segs.pop(); // sondaki sessizlik gereksiz
  return segs;
}

/* ---------- İkili / onaltılık / Base64 ---------- */
const utf8 = new TextEncoder();
const fatalUtf8 = () => new TextDecoder('utf-8', { fatal: true });

export function toBinary(text) {
  return Array.from(utf8.encode(String(text).normalize('NFC'))).map((b) => b.toString(2).padStart(8, '0')).join(' ');
}
export function fromBinary(code) {
  const bits = String(code).replace(/[\s,]+/g, '');
  if (!bits) return '';
  if (/[^01]/.test(bits)) throw new Error('İkili kodda yalnızca 0 ve 1 olabilir. Harf, rakam ya da başka işaret varsa onları silin; baytlar boşlukla ayrılabilir.');
  if (bits.length % 8 !== 0) throw new Error(`İkili kod 8 bitlik gruplardan oluşmalı; şu an ${bits.length} bit var. Her harf 8 bit (bazı Türkçe harfler 16 bit) tutar; eksik ya da fazla bir basamak olup olmadığına bakın.`);
  const bytes = new Uint8Array(bits.length / 8);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  return decodeBytes(bytes);
}

export function toHex(text) {
  return Array.from(utf8.encode(String(text).normalize('NFC'))).map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
}
export function fromHex(code) {
  const hex = String(code).replace(/0x/gi, '').replace(/[\s,]+/g, '');
  if (!hex) return '';
  if (/[^0-9a-fA-F]/.test(hex)) throw new Error('Onaltılık kodda yalnızca 0-9 ve A-F karakterleri olabilir. Başka işaret varsa silin; baytlar boşlukla ayrılabilir.');
  if (hex.length % 2 !== 0) throw new Error('Onaltılık kod çift sayıda basamak içermeli (her bayt iki basamaktır). Başta ya da sonda bir basamak eksik olabilir.');
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return decodeBytes(bytes);
}

function decodeBytes(bytes) {
  try {
    return fatalUtf8().decode(bytes);
  } catch {
    throw new Error('Bu veri geçerli bir UTF-8 metni değil; muhtemelen bir dosyanın içeriği ya da eksik kopyalanmış bir koddur. Kodu baştan sona yeniden kopyalayın.');
  }
}

export function toBase64(text) {
  const bytes = utf8.encode(String(text).normalize('NFC'));
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
export function fromBase64(code) {
  let s = String(code).trim().replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  if (!s) return '';
  if (/[^A-Za-z0-9+/=]/.test(s)) throw new Error('Geçersiz Base64: yalnızca A-Z, a-z, 0-9, +, / ve = karakterleri olabilir. Metnin eksiksiz kopyalandığından emin olun.');
  s = s.replace(/=+$/, '');
  if (s.length % 4 === 1) throw new Error('Geçersiz Base64: uzunluk tutmuyor, metnin sonu eksik kalmış olabilir. Kaynağı baştan sona yeniden kopyalayın.');
  s += '='.repeat((4 - (s.length % 4)) % 4);
  let bin;
  try { bin = atob(s); } catch { throw new Error('Geçersiz Base64: çözülemedi. Metni yeniden kopyalayın.'); }
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return decodeBytes(bytes);
}

/* ---------- Kendi anahtar tablonuz (yerine koyma) ---------- */
/** Anahtarı doğrular: alfabedeki her harf tam bir kez geçmeli. Dönüş: sıra dizisi (anahtar[i] = i. harfin karşılığı). */
export function parseKey(key, alpha) {
  const n = alpha.up.length;
  const chars = Array.from(String(key ?? '').normalize('NFC')).filter((c) => !/[\s,]/.test(c));
  if (!chars.length) throw new Error(`Anahtar tablosu boş. Alfabedeki ${n} harfi karışık sırayla yazın ya da "Rastgele anahtar üret" düğmesine basın.`);
  const idx = [];
  for (const c of chars) {
    const li = letterInfo(c, alpha);
    if (!li) throw new Error(`Anahtarda alfabede olmayan bir karakter var: "${c}". Yalnızca seçili alfabenin harflerini kullanın.`);
    idx.push(li.i);
  }
  const seen = new Set();
  const dup = new Set();
  idx.forEach((i) => { if (seen.has(i)) dup.add(alpha.up[i]); seen.add(i); });
  if (dup.size) throw new Error(`Anahtarda tekrar eden harf var: ${[...dup].join(', ')}. Her harf yalnızca bir kez geçmeli.`);
  if (idx.length !== n) {
    const missing = alpha.up.filter((_, i) => !seen.has(i));
    throw new Error(`Anahtar ${n} benzersiz harf içermeli; şu an ${idx.length} harf var${missing.length <= 8 ? ` (eksik: ${missing.join(', ')})` : ''}.`);
  }
  return idx;
}

export function substitute(text, alpha, key, decrypt = false) {
  const perm = parseKey(key, alpha);
  const table = decrypt ? perm.map((_, j) => perm.indexOf(j)) : perm;
  return mapLetters(text, alpha, (i) => table[i]);
}

/** Karışık bir alfabe üretir (Fisher–Yates, crypto.getRandomValues ile). */
export function randomKey(alpha) {
  const a = alpha.up.slice();
  const rnd = new Uint32Array(a.length);
  crypto.getRandomValues(rnd);
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd[i] % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.join('');
}
