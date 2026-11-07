// Morse çevirici mantığı — saf fonksiyonlar, DOM yok (Node ile test edilebilir).
// Türkçe harfler (Ç, Ğ, Ö, Ş, Ü) yaygın Morse uzantılarına göre eşlenir; İ ve ı, I olarak gönderilir.
export const MORSE = {
  A: '.-', B: '-...', C: '-.-.', Ç: '-.-..', D: '-..', E: '.', F: '..-.', G: '--.', Ğ: '--.-.', H: '....', I: '..',
  J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', Ö: '---.', P: '.--.', Q: '--.-', R: '.-.', S: '...',
  Ş: '.--..', T: '-', U: '..-', Ü: '..--', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', _: '..--.-', '"': '.-..-.',
  $: '...-..-', '@': '.--.-.',
};
const REVERSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

/** Türkçe büyük harfe çevirir; İ ve ı Morse'ta I olarak kabul edilir. */
function normalizeChar(ch) {
  if (ch === 'i' || ch === 'İ' || ch === 'ı') return 'I';
  return ch.toLocaleUpperCase('tr-TR');
}

/** Metni Morse'a çevirir. Harfler arası tek boşluk, sözcükler arası " / ". Çevrilemeyen karakterler skipped listesine girer. */
export function textToMorse(text) {
  const skipped = [];
  const words = String(text).split(/\s+/).filter(Boolean).map((w) => {
    const letters = [];
    for (const raw of w) {
      const ch = normalizeChar(raw);
      if (MORSE[ch]) letters.push(MORSE[ch]);
      else if (!skipped.includes(raw)) skipped.push(raw);
    }
    return letters.join(' ');
  }).filter(Boolean);
  return { morse: words.join(' / '), skipped };
}

/** Morse'u metne çevirir. Nokta için . • · , çizgi için - – — _ kabul edilir; sözcük ayırıcı / veya 3+ boşluk. */
export function morseToText(code) {
  const unknown = [];
  const clean = String(code).replace(/[•·]/g, '.').replace(/[–—_−]/g, '-').trim();
  const words = clean.split(/\s*\/\s*|\s{3,}|\r?\n/).filter((w) => w.trim());
  const out = words.map((w) => w.trim().split(/\s+/).map((sym) => {
    if (REVERSE[sym]) return REVERSE[sym];
    unknown.push(sym);
    return '?';
  }).join(''));
  return { text: out.join(' '), unknown };
}

/** Çalma için olay listesi: [{on:boolean, units:number}]. PARIS standardı: nokta 1, çizgi 3, işaret arası 1, harf arası 3, sözcük arası 7. */
export function morseTimings(morse) {
  const ev = [];
  const words = morse.split(' / ');
  words.forEach((w, wi) => {
    w.split(' ').forEach((l, li) => {
      [...l].forEach((s, si) => {
        ev.push({ on: true, units: s === '.' ? 1 : 3 });
        if (si < l.length - 1) ev.push({ on: false, units: 1 });
      });
      if (li < w.split(' ').length - 1) ev.push({ on: false, units: 3 });
    });
    if (wi < words.length - 1) ev.push({ on: false, units: 7 });
  });
  return ev;
}
