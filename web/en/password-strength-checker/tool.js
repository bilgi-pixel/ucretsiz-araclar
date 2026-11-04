// Password strength checker (EN) — entropy, pattern detection and estimated crack time.
// The password is processed only in this page's memory: never sent, stored or logged.
// (common.json in this folder is just a list of common patterns; the password is not sent to it, the list is downloaded here.)

const $ = (id) => document.getElementById(id);
const OFFLINE_RATE = 1e10; // offline: 10 billion guesses per second
const ONLINE_RATE = 100; // online: 100 attempts per second

let rankMap = new Map(); // common word/password → rank (1 = most frequent)
let listReady = false;

fetch('common.json').then((r) => r.json()).then((j) => {
  j.list.forEach((w, i) => rankMap.set(w, i + 1));
  listReady = true;
  analyze();
}).catch(() => { /* if the list fails to load, pattern checks are limited to sequences */ });

// ---- Normalization: folds accented letters and l33t spelling to plain letters (length preserved) ----
const TR = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'é': 'e', 'è': 'e', 'ê': 'e', 'á': 'a', 'à': 'a', 'â': 'a', 'ä': 'a', 'ñ': 'n', 'í': 'i', 'ó': 'o', 'ú': 'u' };
function fold(s) {
  let out = '';
  for (const ch of s) {
    const low = ch === 'İ' ? 'i' : ch === 'I' ? 'i' : ch.toLowerCase();
    out += TR[low] || low;
  }
  return out;
}
const LEET = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's', '!': 'i', '€': 'e' };
const leet = (s) => [...s].map((c) => LEET[c] || c).join('');

// ---- Keyboard sequences (QWERTY rows and diagonals) ----
const ROWS = ['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'qwertyuiopgu', 'asdfghjklsi', 'zxcvbnmoc', '1qaz2wsx3edc4rfv', 'qazwsxedcrfvtgb', '1q2w3e4r5t6y7u8i9o0p', 'poiuytrewq', 'lkjhgfdsa', 'mnbvcxz'];

const log2 = Math.log2;

/** Cheapest decomposition ending at each position: dynamic programming. */
function analyzePassword(pw) {
  const chars = [...pw];
  const n = chars.length;
  const raw = chars.join('');
  const plain = chars.map((c) => fold(c)).join('');
  const leeted = leet(plain);

  // Character pool size (brute-force pool)
  const has = { lower: /[a-zçğıöşü]/.test(pw), upper: /[A-ZÇĞİÖŞÜ]/.test(pw), digit: /[0-9]/.test(pw), symbol: /[^A-Za-z0-9çğıöşüÇĞİÖŞÜ\s\u0080-￿]/.test(pw), space: /\s/.test(pw), other: /[^\u0000-\u007F\sçğıöşüÇĞİÖŞÜ]/.test(pw) };
  let pool = 0;
  if (has.lower) pool += 26 + (/[çğıöşü]/.test(pw) ? 6 : 0);
  if (has.upper) pool += 26 + (/[ÇĞİÖŞÜ]/.test(pw) ? 6 : 0);
  if (has.digit) pool += 10;
  if (has.symbol) pool += 33;
  if (has.space) pool += 1;
  if (has.other) pool += 100;
  pool = Math.max(pool, 2);
  const perChar = log2(pool);

  // best[i] = lowest bits explaining the first i characters; seg[i] = info about that segment
  const best = new Array(n + 1).fill(Infinity);
  const seg = new Array(n + 1).fill(null);
  best[0] = 0;
  const consider = (i, j, bits, type, extra) => {
    if (best[i] + bits < best[j]) { best[j] = best[i] + bits; seg[j] = { from: i, to: j, type, bits, ...extra }; }
  };

  for (let i = 0; i < n; i++) {
    if (best[i] === Infinity) continue;
    // 1) Brute force: single character
    consider(i, i + 1, perChar, 'brute');

    // 2) Dictionary (plain and l33t spelling)
    for (let len = 3; len <= Math.min(24, n - i); len++) {
      const wordPlain = plain.slice(i, i + len), wordLeet = leeted.slice(i, i + len);
      const piece = raw.slice(i, i + len);
      const hasUpper = /[A-ZÇĞİÖŞÜ]/.test(piece);
      const hasLeetChars = wordPlain !== wordLeet;
      let r = rankMap.get(wordPlain);
      if (r) consider(i, i + len, log2(r) + (hasUpper ? 1 : 0) + 0.5, 'word', { word: piece, rank: r, leet: false });
      r = hasLeetChars ? rankMap.get(wordLeet) : 0;
      if (r) consider(i, i + len, log2(r) + (hasUpper ? 1 : 0) + 2, 'word', { word: piece, rank: r, leet: true });
    }
    // short (1-2 letter) dictionary entries only matter for a full match (e.g. "fb")
    if (i === 0 && n <= 2) {
      const r = rankMap.get(plain);
      if (r) consider(0, n, log2(r) + 0.5, 'word', { word: raw, rank: r, leet: false });
    }
    // is the whole password in the list (entire password is common): extra safeguard
    if (i === 0) {
      const r = rankMap.get(plain) || rankMap.get(leeted);
      if (r) consider(0, n, log2(r) + 0.49, 'common', { word: raw, rank: r });
    }

    // 3) Sequence (1234, abcd, 9876, dcba)
    if (n - i >= 3) {
      const d = chars[i + 1].codePointAt(0) - chars[i].codePointAt(0);
      if (d === 1 || d === -1) {
        let j = i + 1;
        while (j < n && chars[j].codePointAt(0) - chars[j - 1].codePointAt(0) === d) j++;
        for (let e = i + 3; e <= j; e++) {
          const base = /[0-9]/.test(chars[i]) ? 10 : 26;
          consider(i, e, log2(base) + 1 + log2(e - i), 'sequence', { text: chars.slice(i, e).join('') });
        }
      }
    }

    // 4) Repeat: the same unit repeated several times ("aaaa", "abab", "123123")
    for (let u = 1; u <= Math.floor((n - i) / 2); u++) {
      const unit = raw.slice(i, i + u);
      let k = 1;
      while (raw.slice(i + k * u, i + (k + 1) * u) === unit) k++;
      if (k >= 2 && k * u >= 3) {
        for (let kk = 2; kk <= k; kk++) {
          if (kk * u < 3) continue;
          consider(i, i + kk * u, Math.min(perChar * u, 12) + log2(kk) + 1, 'repeat', { text: raw.slice(i, i + kk * u), unit });
        }
      }
    }

    // 5) Keyboard pattern (qwerty, asdf, 1qaz2wsx, forwards or backwards)
    for (let len = 3; len <= Math.min(20, n - i); len++) {
      const s = plain.slice(i, i + len);
      if (ROWS.some((row) => row.includes(s) || row.includes([...s].reverse().join('')))) {
        consider(i, i + len, log2(40) + 1 + log2(len), 'keyboard', { text: raw.slice(i, i + len) });
      }
    }

    // 6) Years (1900-2099) and dates
    if (/^(19|20)\d\d$/.test(raw.slice(i, i + 4))) consider(i, i + 4, log2(120), 'year', { text: raw.slice(i, i + 4) });
    if (/^\d{8}$/.test(raw.slice(i, i + 8)) && /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])(19|20)\d\d$/.test(raw.slice(i, i + 8))) {
      consider(i, i + 8, log2(31 * 12 * 120), 'date', { text: raw.slice(i, i + 8) });
    }
  }

  // Trace the segments back
  const parts = [];
  for (let k = n; k > 0;) { const s = seg[k]; parts.unshift(s); k = s.from; }
  // merge consecutive brute segments into one
  const merged = [];
  for (const p of parts) {
    const last = merged[merged.length - 1];
    if (p.type === 'brute' && last && last.type === 'brute') { last.to = p.to; last.bits += p.bits; }
    else merged.push({ ...p });
  }

  const bits = n ? Math.max(0, best[n]) : 0;
  return { bits, pool, has, parts: merged, length: n, naiveBits: n * perChar };
}

// ---- Duration formatting ----
function fmtDuration(sec) {
  const nf = (x) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(x);
  if (sec < 1) return 'in less than a second';
  if (sec < 60) return `${nf(sec)} seconds`;
  if (sec < 3600) return `${nf(sec / 60)} minutes`;
  if (sec < 86400) return `${nf(sec / 3600)} hours`;
  if (sec < 86400 * 365) return `${nf(sec / 86400)} days`;
  const y = sec / (86400 * 365.25);
  if (y < 1000) return `${nf(y)} years`;
  if (y < 1e6) return `${nf(y / 1000)} thousand years`;
  if (y < 1e9) return `${nf(y / 1e6)} million years`;
  if (y < 1e12) return `${nf(y / 1e9)} billion years`;
  return 'far longer than the age of the universe (about 13.8 billion years)';
}

function level(bits) {
  if (bits < 28) return { name: 'Very weak', cls: 'l0' };
  if (bits < 40) return { name: 'Weak', cls: 'l1' };
  if (bits < 60) return { name: 'Fair', cls: 'l2' };
  if (bits < 80) return { name: 'Strong', cls: 'l3' };
  return { name: 'Very strong', cls: 'l4' };
}

const TYPE_TEXT = {
  common: (p) => `This password is among the most commonly used ones (rank ${p.rank} in our list). Attackers try these lists first.`,
  word: (p) => `A common word or pattern: "${p.word}"${p.leet ? ' (swapping letters for digits or symbols is a well-known trick that crackers expect)' : ''}. Names, teams, cities and dictionary words are tried very quickly.`,
  sequence: (p) => `Sequence: "${p.text}". Runs such as 1234, abcd or 9876 are guessed immediately.`,
  repeat: (p) => `Repetition: "${p.text}". Repeating the same character or group does not add real security.`,
  keyboard: (p) => `Keyboard pattern: "${p.text}". Key walks such as qwerty, asdf or 1qaz2wsx are well-known patterns.`,
  year: (p) => `Year: "${p.text}". Birth years and other dates are among the easiest additions to guess.`,
  date: (p) => `Date format: "${p.text}". Birthdays and anniversaries are the first patterns attackers try.`,
};

function render(res) {
  const pw = $('pw').value;
  const lv = level(res.bits);
  const score = Math.min(100, Math.round((res.bits / 90) * 100));
  $('empty').hidden = !!pw;
  $('report').hidden = !pw;
  if (!pw) return;

  $('score').textContent = String(score);
  $('label').textContent = lv.name;
  $('meter-fill').style.width = `${Math.max(3, score)}%`;
  $('meter-fill').className = `sg-fill ${lv.cls}`;
  $('meter').setAttribute('aria-valuenow', String(score));
  $('meter').setAttribute('aria-valuetext', `${lv.name}, ${score} points`);

  $('bits').textContent = `${res.bits.toFixed(1)} bits`;
  $('naive').textContent = `${res.naiveBits.toFixed(1)} bits`;
  $('len').textContent = `${res.length} characters`;

  const classes = [];
  if (res.has.lower) classes.push('lowercase');
  if (res.has.upper) classes.push('UPPERCASE');
  if (res.has.digit) classes.push('digits');
  if (res.has.symbol) classes.push('symbols');
  if (res.has.space) classes.push('spaces');
  if (res.has.other) classes.push('other characters');
  $('charset').textContent = `${classes.join(', ') || '—'} · pool ≈ ${res.pool} characters`;

  const avg = (rate) => Math.pow(2, Math.max(0, res.bits - 1)) / rate;
  $('offline').textContent = fmtDuration(avg(OFFLINE_RATE));
  $('online').textContent = fmtDuration(avg(ONLINE_RATE));

  // Findings
  const f = $('findings');
  f.textContent = '';
  const found = res.parts.filter((p) => p.type !== 'brute');
  const add = (list, text) => { const li = document.createElement('li'); li.textContent = text; list.appendChild(li); };
  if (!found.length) add(f, 'No known pattern, sequence, year or common word was found.');
  const seenCommon = found.some((p) => p.type === 'common');
  for (const p of found) {
    if (seenCommon && p.type !== 'common') continue;
    add(f, TYPE_TEXT[p.type](p));
  }
  if (!listReady) add(f, 'The common-password list could not be loaded; only sequences, repeats and keyboard patterns were checked.');

  // Suggestions
  const s = $('suggestions');
  s.textContent = '';
  if (res.length < 12) add(s, `Use at least 12 characters, ideally 14 to 16 (currently ${res.length}). Length is the factor that improves security the most.`);
  if (found.length) add(s, 'Instead of personal details (name, team, city, birth year) and dictionary words, use a randomly generated password or a passphrase of 4 to 5 unrelated words.');
  if (res.length >= 8 && !(res.has.upper && res.has.lower)) add(s, 'Mixing upper and lower case widens the pool, but use capitals in random positions rather than only at the start.');
  if (!res.has.digit && res.length < 16) add(s, 'Adding digits enlarges the pool, but do not put predictable values such as "1" or a year at the end.');
  if (!res.has.symbol && res.length < 16) add(s, 'A few symbols (for example ! ? # %) enlarge the pool; scatter them in random places.');
  if (res.bits < 80) add(s, 'For important accounts, create a long random password with the Password Generator and keep it in a password manager.');
  add(s, 'Use a different password for every account and turn on two-factor authentication (2FA) wherever possible; even a strong password does not help if a site leaks it.');
  if (res.bits >= 80 && !found.length) add(s, 'This password looks good. Make sure you do not use it anywhere else.');
}

function analyze() {
  const pw = $('pw').value;
  if (!pw) { render({}); return; }
  render(analyzePassword(pw.length > 128 ? pw.slice(0, 128) : pw));
  $('trunc').hidden = pw.length <= 128;
}

$('pw').addEventListener('input', analyze);

$('toggle').addEventListener('click', () => {
  const show = $('pw').type === 'password';
  $('pw').type = show ? 'text' : 'password';
  $('toggle').textContent = show ? 'Hide' : 'Show';
  $('toggle').setAttribute('aria-pressed', String(show));
});

$('clear').addEventListener('click', () => {
  $('pw').value = '';
  $('pw').type = 'password';
  $('toggle').textContent = 'Show';
  $('toggle').setAttribute('aria-pressed', 'false');
  analyze();
  $('pw').focus();
});

analyze();
