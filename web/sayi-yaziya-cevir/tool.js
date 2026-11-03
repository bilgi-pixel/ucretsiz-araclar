// Sayıyı Yazıya Çevir — saf JS, kütüphane yok, ağ isteği yok.
// Girilen sayı yalnızca bu sekmenin belleğinde işlenir; geçmiş de sayfa kapanınca silinir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

const ONES = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
const TENS = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
const SCALES = ['', 'bin', 'milyon', 'milyar', 'trilyon', 'katrilyon'];
const MAX_DIGITS = SCALES.length * 3; // 18 basamak: 999 katrilyon

// Son kelimeye göre sıra sayısı eki (ünlü uyumu elle verildi).
const ORDINAL = {
  sıfır: 'sıfırıncı', bir: 'birinci', iki: 'ikinci', üç: 'üçüncü', dört: 'dördüncü', beş: 'beşinci',
  altı: 'altıncı', yedi: 'yedinci', sekiz: 'sekizinci', dokuz: 'dokuzuncu',
  on: 'onuncu', yirmi: 'yirminci', otuz: 'otuzuncu', kırk: 'kırkıncı', elli: 'ellinci',
  altmış: 'altmışıncı', yetmiş: 'yetmişinci', seksen: 'sekseninci', doksan: 'doksanıncı',
  yüz: 'yüzüncü', bin: 'bininci', milyon: 'milyonuncu', milyar: 'milyarıncı',
  trilyon: 'trilyonuncu', katrilyon: 'katrilyonuncu',
};

export const CURRENCIES = {
  TRY: { unit: 'Türk lirası', sub: 'kuruş', short: 'TL', shortSub: 'Kr' },
  USD: { unit: 'dolar', sub: 'sent', short: 'USD', shortSub: 'Sent' },
  EUR: { unit: 'avro', sub: 'sent', short: 'EUR', shortSub: 'Sent' },
  GBP: { unit: 'sterlin', sub: 'peni', short: 'GBP', shortSub: 'Peni' },
};

/**
 * Kullanıcı girdisini ayrıştırır. Binlik ayracı nokta/virgül, ondalık ayracı virgül/nokta toleranslı:
 * "1.234,50" "1,234.50" "1234,5" "1234.50" "-12.000" "1 234,50" hepsi kabul edilir.
 * Döner: { negative, int: "1234", frac: "50" } — basamaklar dize olarak tutulur (büyük sayılar için).
 */
export function parseNumber(raw) {
  let s = String(raw ?? '').trim().replace(/\s+/g, '').replace(/[₺$€£]|TL|tl/g, '');
  if (!s) throw new Error('EMPTY');
  let negative = false;
  if (s.startsWith('-') || s.startsWith('−')) { negative = true; s = s.slice(1); }
  else if (s.startsWith('+')) s = s.slice(1);
  if (!/^[\d.,]+$/.test(s) || !/\d/.test(s)) throw new Error('NOT_NUMBER');

  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');
  let intPart = s;
  let frac = '';
  const split = (idx) => { intPart = s.slice(0, idx); frac = s.slice(idx + 1); };

  if (lastDot >= 0 && lastComma >= 0) {
    // İkisi de varsa en sondaki ondalık ayracıdır.
    split(Math.max(lastDot, lastComma));
  } else if (lastComma >= 0) {
    // Türkçede virgül ondalık ayracıdır; birden fazla virgül varsa binlik sayılır (1,234,567).
    if (s.indexOf(',') !== lastComma) frac = ''; else split(lastComma);
  } else if (lastDot >= 0) {
    const after = s.length - lastDot - 1;
    const single = s.indexOf('.') === lastDot;
    // Tek nokta ve ardından tam 3 basamak → binlik ayracı (1.234); aksi hâlde ondalık (12.5, 3.14159).
    if (single && after !== 3) split(lastDot);
  }
  intPart = intPart.replace(/[.,]/g, '');
  frac = frac.replace(/[.,]/g, '');
  if (frac && !/^\d+$/.test(frac)) throw new Error('NOT_NUMBER');
  intPart = intPart.replace(/^0+(?=\d)/, '') || '0';
  if (intPart.length > MAX_DIGITS) throw new Error('TOO_BIG');
  if (negative && intPart === '0' && !/[1-9]/.test(frac)) negative = false;
  return { negative, int: intPart, frac };
}

/** 0–999 arası grubu kelimelere çevirir. isThousand: "bir bin" yerine "bin". */
function groupWords(n, isThousand) {
  const words = [];
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  if (h) { if (h > 1) words.push(ONES[h]); words.push('yüz'); } // "bir yüz" değil "yüz"
  if (t) words.push(TENS[t]);
  if (o) { if (!(isThousand && n === 1)) words.push(ONES[o]); } // "bir bin" değil "bin"
  return words;
}

/** Negatif olmayan tam sayı dizesini kelime dizisine çevirir. */
export function integerWords(intStr) {
  const s = String(intStr).replace(/^0+(?=\d)/, '');
  if (s === '0' || s === '') return ['sıfır'];
  if (s.length > MAX_DIGITS) throw new Error('TOO_BIG');
  const words = [];
  const padded = s.padStart(Math.ceil(s.length / 3) * 3, '0');
  const groups = padded.match(/\d{3}/g);
  groups.forEach((g, i) => {
    const n = Number(g);
    if (!n) return;
    const scaleIdx = groups.length - 1 - i;
    words.push(...groupWords(n, scaleIdx === 1));
    if (scaleIdx) words.push(SCALES[scaleIdx]);
  });
  return words;
}

/** Ondalık kısmı okur: "50" → "elli", "05" → "sıfır beş", "125" → "yüz yirmi beş". */
function fractionWords(frac) {
  const words = [];
  const m = frac.match(/^(0*)(\d*)$/);
  for (let i = 0; i < m[1].length; i++) words.push('sıfır');
  if (m[2]) words.push(...integerWords(m[2]));
  return words;
}

/** Düz sayı: "eksi bin iki yüz otuz dört virgül elli" */
export function toPlainWords(p) {
  const words = [];
  if (p.negative) words.push('eksi');
  words.push(...integerWords(p.int));
  // Ondalık kısım yazıldığı gibi okunur: 1234,50 → "virgül elli" (5 değil).
  if (p.frac) words.push('virgül', ...fractionWords(p.frac));
  return words;
}

/** Sıra sayısı: son kelimeyi ekli biçimiyle değiştirir. */
export function toOrdinalWords(p) {
  if (/[1-9]/.test(p.frac)) throw new Error('ORDINAL_DECIMAL');
  if (p.negative) throw new Error('ORDINAL_NEGATIVE');
  const words = integerWords(p.int);
  const last = words[words.length - 1];
  words[words.length - 1] = ORDINAL[last] || `${last}ıncı`;
  return words;
}

/** Para: kuruş iki basamağa yuvarlanır (üçüncü basamak 5 ve üzeri yukarı). */
export function toMoney(p) {
  let int = p.int;
  let cents = Number((p.frac + '00').slice(0, 2));
  const third = Number((p.frac + '000')[2]);
  if (third >= 5) cents += 1;
  if (cents === 100) { cents = 0; int = String(BigInt(int) + 1n); if (int.length > MAX_DIGITS) throw new Error('TOO_BIG'); }
  return { negative: p.negative, int, cents };
}

export function moneyReadable(m, cur) {
  const c = CURRENCIES[cur];
  const words = [];
  if (m.negative) words.push('eksi');
  if (m.int !== '0' || !m.cents) words.push(...integerWords(m.int), ...c.unit.split(' '));
  if (m.cents) words.push(...integerWords(String(m.cents)), c.sub);
  return words;
}

/** Çek/senet biçimi: "YalnızBinİkiYüzOtuzDörtTL,ElliKr" — bitişik, her kelime büyük harfle başlar. */
export function moneyCheck(m, cur, { yalniz = true, hash = false } = {}) {
  const c = CURRENCIES[cur];
  if (m.negative) throw new Error('CHECK_NEGATIVE');
  let s = (yalniz ? 'Yalnız' : '') + titleJoin(integerWords(m.int)) + c.short;
  if (m.cents) s += ',' + titleJoin(integerWords(String(m.cents))) + c.shortSub;
  else s += ',' + 'Sıfır' + c.shortSub;
  return hash ? `#${s}#` : s;
}

export const upperTr = (s) => s.toLocaleUpperCase('tr-TR');
export const capTr = (w) => upperTr(w.charAt(0)) + w.slice(1);
const titleJoin = (words) => words.map(capTr).join('');

/** Büyük/küçük harf seçeneğini uygular. */
export function applyCase(text, mode) {
  if (mode === 'upper') return upperTr(text);
  if (mode === 'title') return text.split(' ').map(capTr).join(' ');
  if (mode === 'sentence') return capTr(text);
  return text;
}

/** Sayıyı Türkçe biçimde gösterir: 1234.5 → "1.234,50" */
export function formatTr(p, decimals) {
  const int = p.int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  let frac = p.frac;
  if (decimals !== undefined) frac = (frac + '0'.repeat(decimals)).slice(0, decimals);
  return (p.negative ? '-' : '') + int + (frac ? ',' + frac : '');
}

// ---------- Ters yön: yazıdan sayıya ----------
const WORD_VALUES = (() => {
  const m = new Map();
  ONES.forEach((w, i) => w && m.set(w, i));
  TENS.forEach((w, i) => w && m.set(w, i * 10));
  m.set('sıfır', 0); m.set('yüz', 100);
  SCALES.forEach((w, i) => w && m.set(w, 10 ** (3 * i)));
  // Sıra sayıları da kabul edilsin.
  Object.entries(ORDINAL).forEach(([w, o]) => m.set(o, m.get(w)));
  return m;
})();
const IGNORE = new Set(['yalnız', 've', 'türk', 'lirası', 'lira', 'tl', 'dolar', 'avro', 'euro', 'sterlin', 'usd', 'eur', 'gbp', 'adet', 'tam']);
const SUB_UNITS = new Set(['kuruş', 'kr', 'sent', 'cent', 'peni', 'pens']);

function wordsToInteger(tokens) {
  let total = 0n, current = 0n, seen = false;
  for (const t of tokens) {
    if (!WORD_VALUES.has(t)) throw new Error(`UNKNOWN:${t}`);
    const v = BigInt(WORD_VALUES.get(t));
    seen = true;
    if (v < 100n) current += v;
    else if (v === 100n) current = (current || 1n) * 100n;
    else { total += (current || 1n) * v; current = 0n; }
  }
  if (!seen) throw new Error('EMPTY');
  return total + current;
}

/** "bin iki yüz otuz dört virgül elli" / "BinİkiYüzOtuzDörtTL,ElliKr" / "yüz lira elli kuruş" → "1234,50" */
export function wordsToNumber(text) {
  let s = String(text || '').trim();
  if (!s) throw new Error('EMPTY');
  s = s.replace(/#/g, ' ');
  // Bitişik çek yazımını büyük harflerden böl: "BinİkiYüz" → "Bin İki Yüz"
  s = s.replace(/([a-zçğıöşü])(?=[A-ZÇĞİÖŞÜ])/g, '$1 ').replace(/,/g, ' , ').replace(/\./g, ' . ');
  let tokens = s.toLocaleLowerCase('tr-TR').split(/\s+/).filter(Boolean);
  let negative = false;
  if (tokens[0] === 'eksi' || tokens[0] === '-') { negative = true; tokens = tokens.slice(1); }
  let intTokens = tokens, fracTokens = [], subMode = false;
  const sepIdx = tokens.findIndex((t) => t === 'virgül' || t === 'nokta' || t === ',' || t === '.');
  const subIdx = tokens.findIndex((t) => SUB_UNITS.has(t));
  if (sepIdx >= 0) { intTokens = tokens.slice(0, sepIdx); fracTokens = tokens.slice(sepIdx + 1); }
  if (subIdx >= 0) {
    subMode = true;
    // Kuruş kelimesinden önceki, ana birimden sonraki bölüm alt birimdir.
    const unitIdx = tokens.findIndex((t) => IGNORE.has(t) && t !== 'yalnız' && t !== 've' && t !== 'tam');
    const start = sepIdx >= 0 ? sepIdx + 1 : (unitIdx >= 0 && unitIdx < subIdx ? unitIdx + 1 : -1);
    if (start < 0) { intTokens = []; fracTokens = tokens.slice(0, subIdx); }
    else { intTokens = tokens.slice(0, sepIdx >= 0 ? sepIdx : unitIdx); fracTokens = tokens.slice(start, subIdx); }
  }
  const clean = (arr) => arr.filter((t) => !IGNORE.has(t) && !SUB_UNITS.has(t) && t !== ',' && t !== '.');
  intTokens = clean(intTokens); fracTokens = clean(fracTokens);
  const intVal = intTokens.length ? wordsToInteger(intTokens) : 0n;
  let frac = '';
  if (fracTokens.length) {
    // Baştaki "sıfır"lar basamak olarak korunur: "sıfır beş" → 05
    let zeros = 0;
    while (fracTokens[0] === 'sıfır' && fracTokens.length > 1) { zeros++; fracTokens.shift(); }
    frac = '0'.repeat(zeros) + wordsToInteger(fracTokens).toString();
    if (subMode) frac = frac.padStart(2, '0').slice(0, 2);
  }
  return (negative ? '-' : '') + intVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (frac ? ',' + frac : '');
}

// ---------- Hata mesajları ----------
function message(err) {
  const m = String(err && err.message || err);
  if (m === 'EMPTY') return '';
  if (m === 'NOT_NUMBER') return 'Yalnızca rakam girin; harf veya başka karakter kullanmayın. Örnek: 1.234,50 ya da -250';
  if (m === 'TOO_BIG') return 'Sayı çok büyük: en fazla 999 katrilyon (18 basamak) yazıya çevrilebilir. Daha küçük bir sayı girin.';
  if (m === 'ORDINAL_DECIMAL') return 'Sıra sayısı yalnızca tam sayılar için yazılır. Ondalık kısmı silin ya da "Düz sayı" modunu seçin.';
  if (m === 'ORDINAL_NEGATIVE') return 'Negatif sayının sıra sayısı olmaz. Eksi işaretini kaldırın.';
  if (m === 'CHECK_NEGATIVE') return 'Çek/senet tutarı negatif olamaz. Eksi işaretini kaldırın; okunur biçim yine de aşağıda gösterilir.';
  if (m.startsWith('UNKNOWN:')) return `"${m.slice(8)}" tanınan bir sayı kelimesi değil. Türkçe sayı adları kullanın: bir, iki, yüz, bin, milyon… Örnek: "bin iki yüz otuz dört virgül elli"`;
  return 'Beklenmeyen bir hata oluştu. Girdiyi kontrol edip tekrar deneyin.';
}

// ---------- Arayüz ----------
const history = []; // yalnızca bellekte; sayfa kapanınca silinir

function copyText(text, statusEl) {
  const done = () => { statusEl.textContent = 'Kopyalandı.'; setTimeout(() => { statusEl.textContent = ''; }, 2000); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallback());
  } else fallback();
  function fallback() {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch { statusEl.textContent = 'Kopyalanamadı; metni seçip Ctrl+C ile kopyalayın.'; }
    ta.remove();
  }
}

function init() {
  const amount = $('amount');
  if (!amount) return;
  const modeEls = Array.from(document.querySelectorAll('input[name="mode"]'));
  const currency = $('currency');
  const caseSel = $('case');
  const optYalniz = $('opt-yalniz');
  const optHash = $('opt-hash');
  const error = $('error');
  const result = $('result');
  const formatted = $('formatted');
  const rows = { main: $('row-main'), readable: $('row-readable'), check: $('row-check') };
  const outs = { main: $('out-main'), readable: $('out-readable'), check: $('out-check') };
  const moneyOpts = $('money-options');
  const historyEl = $('history');
  const historyWrap = $('history-wrap');
  const copyStatus = $('copy-status');

  const mode = () => (modeEls.find((r) => r.checked) || modeEls[0]).value;

  function pushHistory(input, text) {
    if (!text || (history[0] && history[0].input === input && history[0].mode === mode())) return;
    history.unshift({ input, text, mode: mode() });
    if (history.length > 5) history.pop();
    historyEl.innerHTML = '';
    for (const h of history) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'hist-btn';
      btn.innerHTML = `<strong></strong><span></span>`;
      btn.querySelector('strong').textContent = h.input;
      btn.querySelector('span').textContent = h.text;
      btn.addEventListener('click', () => {
        amount.value = h.input;
        modeEls.forEach((r) => { r.checked = r.value === h.mode; });
        render();
        amount.focus();
      });
      li.appendChild(btn);
      historyEl.appendChild(li);
    }
    historyWrap.hidden = history.length === 0;
  }

  function render({ record = false } = {}) {
    const m = mode();
    moneyOpts.hidden = m !== 'money';
    const cs = caseSel.value;
    showError(error, '');
    Object.values(rows).forEach((r) => { r.hidden = true; });
    let p;
    try {
      p = parseNumber(amount.value);
    } catch (e) {
      result.classList.remove('is-active');
      result.dataset.ready = '0';
      showError(error, message(e));
      return;
    }
    let primary = '';
    try {
      if (m === 'plain') {
        formatted.textContent = formatTr(p);
        primary = applyCase(toPlainWords(p).join(' '), cs);
        outs.main.textContent = primary; rows.main.hidden = false;
      } else if (m === 'ordinal') {
        formatted.textContent = formatTr(p) + '.';
        primary = applyCase(toOrdinalWords(p).join(' '), cs);
        outs.main.textContent = primary; rows.main.hidden = false;
      } else {
        const money = toMoney(p);
        const cur = currency.value;
        formatted.textContent = formatTr({ negative: money.negative, int: money.int, frac: String(money.cents).padStart(2, '0') }) + ' ' + CURRENCIES[cur].short;
        primary = applyCase(moneyReadable(money, cur).join(' '), cs);
        outs.readable.textContent = primary; rows.readable.hidden = false;
        try {
          let check = moneyCheck(money, cur, { yalniz: optYalniz.checked, hash: optHash.checked });
          if (cs === 'upper') check = upperTr(check);
          outs.check.textContent = check; rows.check.hidden = false;
        } catch (e) {
          showError(error, message(e));
        }
      }
      result.classList.add('is-active');
      result.dataset.ready = '1';
      if (record) pushHistory(amount.value.trim(), primary);
    } catch (e) {
      result.classList.remove('is-active');
      result.dataset.ready = '0';
      showError(error, message(e));
    }
  }

  amount.addEventListener('input', () => render());
  amount.addEventListener('change', () => render({ record: true }));
  amount.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); render({ record: true }); } });
  [currency, caseSel, optYalniz, optHash, ...modeEls].forEach((el) => el.addEventListener('change', () => render({ record: true })));

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => copyText($(btn.dataset.copy).textContent, copyStatus));
  });

  // Hızlı örnekler
  document.querySelectorAll('[data-example]').forEach((btn) => {
    btn.addEventListener('click', () => {
      amount.value = btn.dataset.example;
      const em = btn.dataset.exampleMode;
      if (em) modeEls.forEach((r) => { r.checked = r.value === em; });
      render({ record: true });
      amount.focus();
    });
  });

  // Ters yön
  const wordsIn = $('words-input');
  const wordsOut = $('words-out');
  const wordsErr = $('words-error');
  const wordsRow = $('row-words');
  if (wordsIn) {
    const renderWords = () => {
      showError(wordsErr, '');
      wordsRow.hidden = true;
      if (!wordsIn.value.trim()) return;
      try {
        wordsOut.textContent = wordsToNumber(wordsIn.value);
        wordsRow.hidden = false;
      } catch (e) {
        showError(wordsErr, message(e));
      }
    };
    wordsIn.addEventListener('input', renderWords);
  }

  render();
}

init();
