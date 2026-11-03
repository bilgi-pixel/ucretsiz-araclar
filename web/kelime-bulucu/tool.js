// Kelime Bulucu: harflerden kelime türetme, kalıp arama, Wordle yardımcısı.
// Her şey tarayıcıda çalışır; kelime listesi aynı klasördeki kelimeler.txt dosyasından okunur.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_SHOWN = 600;

// Kelime oyunları için kendi puan tablomuz (harf nadirliğine göre; herhangi bir oyunun tablosu değildir).
const POINTS = {
  a: 1, e: 1, i: 1, n: 1, r: 1, l: 1, k: 1,
  d: 2, m: 2, t: 2, u: 2, ı: 2, s: 2, o: 2,
  y: 3, b: 3, ü: 3, ş: 3,
  z: 4, c: 4, ç: 4,
  h: 5, g: 5, p: 5,
  f: 7, v: 7, ö: 7,
  ğ: 8, j: 10,
};

let words = [];

/** Türkçe küçük harf kuralı: I → ı, İ → i. */
const lower = (s) => s.replace(/I/g, 'ı').replace(/İ/g, 'i').toLocaleLowerCase('tr-TR');

/** Yalnızca Türkçe harfleri ve izin verilen özel işaretleri bırakır. */
function cleanLetters(s, keep) {
  return Array.from(lower(s)).filter((c) => /[a-zçğıöşüâîû]/.test(c) || keep.includes(c)).join('');
}

function score(word, jokerCount) {
  // Joker yerine kullanılan harfler 0 puan verir; jokerler en düşük puanlı harfleri karşılar (en değerli harfler puan getirir).
  const letters = Array.from(word).sort((a, b) => (POINTS[a] || 1) - (POINTS[b] || 1));
  let total = 0;
  letters.forEach((c, i) => { if (i >= jokerCount) total += POINTS[c] || 1; });
  return total;
}

/** Eldeki harflerle (jokerli) kelime kurulabilir mi? Kullanılan joker sayısını döndürür, olmuyorsa -1. */
function jokersNeeded(word, avail, jokers) {
  const used = {};
  let missing = 0;
  for (const c of word) {
    used[c] = (used[c] || 0) + 1;
    if (used[c] > (avail[c] || 0)) { missing++; if (missing > jokers) return -1; }
  }
  return missing;
}

function countLetters(s) {
  const m = {};
  for (const c of s) m[c] = (m[c] || 0) + 1;
  return m;
}

/** Kalıbı (_ ? . tek harf, * herhangi uzunluk) düzenli ifadeye çevirir. */
function patternRegex(p) {
  const body = Array.from(p).map((c) => (c === '_' || c === '?' || c === '.' ? '.' : c === '*' ? '.*' : c)).join('');
  return new RegExp(`^${body}$`, 'u');
}

function readOptions() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const o = { mode };
  o.minLen = Number($('f-min').value) || 0;
  o.maxLen = Number($('f-max').value) || 99;
  o.starts = cleanLetters($('f-starts').value, '');
  o.ends = cleanLetters($('f-ends').value, '');
  o.contains = cleanLetters($('f-contains').value, '');
  if (mode === 'anagram') {
    const raw = lower($('f-letters').value);
    o.jokers = (raw.match(/[?*_]/g) || []).length;
    o.letters = cleanLetters(raw, '');
    o.exact = $('f-exact').checked;
  } else if (mode === 'pattern') {
    o.pattern = cleanLetters($('f-pattern').value, '_?.*');
  } else {
    // Wordle: yeşil kalıp, sarı (burada olmayan ama kelimede olan), gri (kelimede olmayan)
    o.pattern = cleanLetters($('f-green').value, '_?.');
    o.yellow = Array.from($('yellow-slots').querySelectorAll('input')).map((i) => cleanLetters(i.value, ''));
    o.gray = cleanLetters($('f-gray').value, '');
  }
  return o;
}

function hasInput(o) {
  if (o.mode === 'anagram') return o.letters.length + o.jokers > 0;
  if (o.mode === 'pattern') return o.pattern.length > 0 || o.starts || o.ends || o.contains;
  return o.pattern.length > 0 || o.yellow.some(Boolean) || o.gray.length > 0;
}

function search(o) {
  const out = [];
  const avail = o.mode === 'anagram' ? countLetters(o.letters) : null;
  const re = o.pattern ? patternRegex(o.pattern) : null;
  const wordleLen = o.mode === 'wordle' ? Number($('f-wlen').value) : 0;
  const yellowAll = o.mode === 'wordle' ? o.yellow.join('') : '';
  const greenLetters = o.mode === 'wordle' ? Array.from(o.pattern).filter((c) => !'_?.'.includes(c)) : [];
  // Gri harf: yeşil/sarıda geçmeyen ve kelimede hiç olmaması gereken harfler
  const grayOnly = o.mode === 'wordle'
    ? Array.from(o.gray).filter((c) => !greenLetters.includes(c) && !yellowAll.includes(c)) : [];

  for (const w of words) {
    const len = w.length;
    if (len < o.minLen || len > o.maxLen) continue;
    if (o.starts && !w.startsWith(o.starts)) continue;
    if (o.ends && !w.endsWith(o.ends)) continue;
    if (o.contains && !Array.from(o.contains).every((c) => w.includes(c))) continue;
    let jk = 0;
    if (o.mode === 'anagram') {
      const total = o.letters.length + o.jokers;
      if (len > total) continue;
      if (o.exact && len !== total) continue;
      jk = jokersNeeded(w, avail, o.jokers);
      if (jk < 0) continue;
    } else {
      if (re && !re.test(w)) continue;
      if (o.mode === 'wordle') {
        if (wordleLen && len !== wordleLen) continue;
        let ok = true;
        for (let i = 0; i < o.yellow.length && ok; i++) {
          for (const c of o.yellow[i]) {
            if (!w.includes(c) || w[i] === c) { ok = false; break; }
          }
        }
        if (!ok) continue;
        if (grayOnly.some((c) => w.includes(c))) continue;
      }
    }
    out.push({ w, pts: score(w, jk) });
  }
  return out;
}

function render(found) {
  const box = $('results');
  box.textContent = '';
  $('count').textContent = `${found.length} kelime bulundu`;
  if (!found.length) {
    const p = document.createElement('p');
    p.className = 'kb-empty';
    p.textContent = 'Eşleşen kelime yok. Joker (?) ekleyin, uzunluk sınırını gevşetin ya da kalıbı kısaltın. Liste kapsamı sınırlıdır; çekimli biçimlerin hepsi bulunmaz.';
    box.appendChild(p);
    return;
  }
  const sortBy = $('f-sort').value;
  const cmpAlpha = (a, b) => a.w.localeCompare(b.w, 'tr');
  let list = [...found];
  if (sortBy === 'score') list.sort((a, b) => b.pts - a.pts || b.w.length - a.w.length || cmpAlpha(a, b));
  else if (sortBy === 'alpha') list.sort(cmpAlpha);
  else list.sort((a, b) => b.w.length - a.w.length || b.pts - a.pts || cmpAlpha(a, b));
  const shown = list.slice(0, MAX_SHOWN);
  const groups = new Map();
  if (sortBy === 'length') {
    for (const f of shown) {
      if (!groups.has(f.w.length)) groups.set(f.w.length, []);
      groups.get(f.w.length).push(f);
    }
  } else {
    groups.set(0, shown);
  }
  for (const [len, arr] of groups) {
    const sec = document.createElement('section');
    sec.className = 'kb-group';
    if (len) {
      const h = document.createElement('h3');
      const total = found.filter((f) => f.w.length === len).length;
      h.textContent = `${len} harfli (${total})`;
      sec.appendChild(h);
    }
    const ul = document.createElement('ul');
    ul.className = 'kb-words';
    for (const f of arr) {
      const li = document.createElement('li');
      li.textContent = f.w;
      const s = document.createElement('small');
      s.textContent = f.pts;
      s.title = 'Kelime oyunları için puan';
      li.appendChild(s);
      ul.appendChild(li);
    }
    sec.appendChild(ul);
    box.appendChild(sec);
  }
  if (found.length > MAX_SHOWN) {
    const p = document.createElement('p');
    p.className = 'kb-more';
    p.textContent = `İlk ${MAX_SHOWN} kelime gösteriliyor. Sonuçları daraltmak için uzunluk, başlangıç/bitiş veya kalıp ekleyin.`;
    box.appendChild(p);
  }
}

function update() {
  const err = $('error');
  if (!words.length) return;
  const o = readOptions();
  $('panel-anagram').hidden = o.mode !== 'anagram';
  $('panel-pattern').hidden = o.mode !== 'pattern';
  $('panel-wordle').hidden = o.mode !== 'wordle';
  if (!hasInput(o)) {
    showError(err, '');
    $('results').textContent = '';
    $('count').textContent = 'Henüz arama yapılmadı';
    $('hint').hidden = false;
    return;
  }
  $('hint').hidden = true;
  if (o.minLen && o.maxLen < o.minLen) {
    showError(err, 'En az harf sayısı, en çok harf sayısından büyük olamaz. İki değeri düzeltip tekrar deneyin.');
    return;
  }
  showError(err, '');
  render(search(o));
}

function buildYellowSlots() {
  const n = Number($('f-wlen').value);
  const wrap = $('yellow-slots');
  const old = Array.from(wrap.querySelectorAll('input')).map((i) => i.value);
  wrap.textContent = '';
  for (let i = 0; i < n; i++) {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.maxLength = 8;
    inp.autocomplete = 'off';
    inp.setAttribute('aria-label', `${i + 1}. konumda olmayan sarı harfler`);
    inp.placeholder = String(i + 1);
    inp.value = old[i] || '';
    inp.addEventListener('input', update);
    wrap.appendChild(inp);
  }
  // Yeşil kalıbı seçilen uzunluğa göre ayarla
  const g = $('f-green');
  g.maxLength = n;
  g.placeholder = '_'.repeat(n);
}

async function init() {
  const err = $('error');
  try {
    const res = await fetch('kelimeler.txt');
    if (!res.ok) throw new Error('http');
    words = (await res.text()).split('\n').filter(Boolean);
  } catch {
    showError(err, 'Kelime listesi yüklenemedi. Sayfayı yenileyin; sorun sürerse internet bağlantınızı ve tarayıcı önbelleğini kontrol edin.');
    return;
  }
  $('list-info').textContent = `${words.length.toLocaleString('tr-TR')} kelime`;
  buildYellowSlots();
  document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', update));
  $('f-wlen').addEventListener('change', () => { buildYellowSlots(); update(); });
  document.querySelectorAll('.kb-live').forEach((el) => el.addEventListener('input', update));
  document.querySelectorAll('.kb-live-change').forEach((el) => el.addEventListener('change', update));
  $('clear').addEventListener('click', () => {
    document.querySelectorAll('.kb-form input[type=text], .kb-form input[type=number]').forEach((i) => { i.value = ''; });
    $('f-exact').checked = false;
    buildYellowSlots();
    update();
  });
  document.body.dataset.ready = '1';
  update();
}

init();
