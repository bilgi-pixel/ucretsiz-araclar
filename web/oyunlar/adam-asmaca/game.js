// Adam Asmaca — kategorili, ipuçlu, SVG çizimli Türkçe harf tahmin oyunu (tek ve iki kişilik).
// Tüm oyun mantığı tarayıcıda çalışır; ağ isteği yalnızca aynı kökendeki kategoriler.json dosyasına yapılır.
// İki kişilik modda gizli kelime yalnızca bellekte tutulur (localStorage'a ya da başka yere yazılmaz).
// Skorlar yalnızca localStorage'da durur; çerez, analitik ya da sunucuya veri gönderimi yoktur.

const MAX_WRONG = 7;
const STORE_KEY = 'ba-adam-asmaca-v1';
const DATA_URL = 'kategoriler.json';
// Türkçe Q klavye düzeni (Q, W, X yok); "I" burada noktasız büyük I'dır (ı harfinin büyüğü).
const KEY_ROWS = [[...'ERTYUIOPĞÜ'], [...'ASDFGHJKLŞİ'], [...'ZCVBNMÖÇ']];
const ALPHABET = new Set([...'ABCÇDEFGĞHIİJKLMNOÖPRŞSTUÜVYZ']);
const SECRET_RE = /^[ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ]{3,20}$/;
const RECENT_LIMIT = 20;

const $ = (id) => document.getElementById(id);
const up = (s) => s.toLocaleUpperCase('tr');
const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/* ---------- Kayıt (localStorage) ---------- */
const defaults = () => ({ score: 0, streak: 0, bestStreak: 0, wins: 0, losses: 0, duo: { p1: 0, p2: 0, round: 1 } });
function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    const d = defaults();
    return { ...d, ...raw, duo: { ...d.duo, ...(raw.duo || {}) } };
  } catch (_) {
    return defaults();
  }
}
let store = loadStore();
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (_) { /* gizli sekme: kayıt atlanır */ }
}

/* ---------- Oyun durumu ---------- */
let data = null; // { anahtar: { ad, kelimeler[] } }
let ready = false;
const recent = [];
const game = {
  mode: 'single',      // 'single' | 'duo'
  phase: 'idle',       // 'idle' (iki kişilikte kelime bekleniyor) | 'playing' | 'won' | 'lost'
  word: '',
  category: '',        // gerçek kategori anahtarı (tek kişilik)
  hidden: false,       // karışık seçildiyse kategori ipucuyla açılır
  hintText: '',        // iki kişilikte kelimeyi seçenin yazdığı ipucu
  guessed: new Set(),
  wrong: [],
  hintUsed: false,
  catShown: false,
  hintLetter: '',      // ipucuyla açılan ilk harf (tuşta ayrı renkle gösterilir)
};
let msgTimer = 0;

/* ---------- SVG çizimi (7 adım) ---------- */
function buildSvg() {
  const svg = $('hm-svg');
  const parts = [
    // 1: zemin ve direk
    '<line x1="20" y1="212" x2="150" y2="212"/><line x1="55" y1="212" x2="55" y2="18"/>',
    // 2: üst kiriş, destek ve ip
    '<line x1="55" y1="18" x2="135" y2="18"/><line x1="55" y1="48" x2="85" y2="18"/><line x1="135" y1="18" x2="135" y2="48"/>',
    // 3: kafa
    '<circle cx="135" cy="68" r="20"/>',
    // 4: gövde
    '<line x1="135" y1="88" x2="135" y2="148"/>',
    // 5: kollar
    '<line x1="135" y1="104" x2="110" y2="130"/><line x1="135" y1="104" x2="160" y2="130"/>',
    // 6: sol bacak
    '<line x1="135" y1="148" x2="113" y2="188"/>',
    // 7: sağ bacak
    '<line x1="135" y1="148" x2="157" y2="188"/>',
  ];
  // Soluk zemin çizgisi her zaman görünür; adımlar hata sayısına göre açılır.
  svg.innerHTML = '<line class="hm-ground" x1="20" y1="212" x2="150" y2="212"/>' + parts.map((p, i) => `<g class="hm-part" data-step="${i + 1}">${p}</g>`).join('')
    + '<g class="hm-face" aria-hidden="true"><path d="M127 61l6 6m0-6l-6 6M137 61l6 6m0-6l-6 6"/></g>';
}

function buildKeyboard() {
  const kb = $('keyboard');
  for (const keys of KEY_ROWS) {
    const row = document.createElement('div');
    row.className = 'hm-keyrow';
    for (const k of keys) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'hm-key';
      b.dataset.key = k;
      b.textContent = k;
      b.setAttribute('aria-label', k);
      row.appendChild(b);
    }
    kb.appendChild(row);
  }
}

function setMsg(text, isError = false, keepMs = 3000) {
  const el = $('hm-msg');
  clearTimeout(msgTimer);
  el.textContent = text;
  el.classList.toggle('is-error', !!isError && !!text);
  if (text && keepMs) msgTimer = setTimeout(() => { el.textContent = ''; el.classList.remove('is-error'); }, keepMs);
}

/* ---------- Çizim ---------- */
function render() {
  const playing = game.phase === 'playing';
  const finished = game.phase === 'won' || game.phase === 'lost';
  const w = [...game.word];

  // Panel görünürlükleri
  $('duo-setup').hidden = !(game.mode === 'duo' && game.phase === 'idle');
  $('play').hidden = game.phase === 'idle';
  $('single-setup').hidden = game.mode !== 'single';
  $('mode-single').setAttribute('aria-pressed', String(game.mode === 'single'));
  $('mode-duo').setAttribute('aria-pressed', String(game.mode === 'duo'));
  $('score-single').hidden = game.mode !== 'single';
  $('score-duo').hidden = game.mode !== 'duo';
  $('hm-box').dataset.mode = game.mode;
  $('play').dataset.phase = game.phase;

  // SVG
  const svg = $('hm-svg');
  const n = game.wrong.length;
  svg.dataset.wrong = String(n);
  svg.querySelectorAll('.hm-part').forEach((g) => g.classList.toggle('is-on', Number(g.dataset.step) <= n));
  svg.querySelector('.hm-face').classList.toggle('is-on', game.phase === 'lost');
  svg.setAttribute('aria-label', `Adam asmaca çizimi: ${n} / ${MAX_WRONG} hata`);

  // Kelime kutuları
  const wordEl = $('word');
  wordEl.textContent = '';
  w.forEach((ch) => {
    const li = document.createElement('li');
    li.className = 'hm-slot';
    if (game.guessed.has(ch)) li.textContent = ch;
    else if (game.phase === 'lost') { li.textContent = ch; li.classList.add('is-missed'); }
    wordEl.appendChild(li);
  });
  const shown = w.map((ch) => (game.guessed.has(ch) || game.phase === 'lost' ? ch : '_')).join(' ');
  wordEl.setAttribute('aria-label', `Kelime, ${w.length} harf: ${shown}`);

  // Bilgi satırları
  $('wrong-count').textContent = `Hata: ${n} / ${MAX_WRONG}`;
  $('wrong-letters').textContent = n ? game.wrong.join(' ') : '—';
  $('cat-line').textContent = categoryLine();

  // Ekran klavyesi
  document.querySelectorAll('#keyboard .hm-key').forEach((b) => {
    const k = b.dataset.key;
    const used = game.guessed.has(k);
    const isWrong = game.wrong.includes(k);
    if (used) b.dataset.state = isWrong ? 'yanlis' : (k === game.hintLetter ? 'ipucu' : 'dogru');
    else delete b.dataset.state;
    b.setAttribute('aria-disabled', String(used || !playing));
    b.setAttribute('aria-label', used ? `${k}, ${isWrong ? 'yanlış' : 'doğru'}` : k);
  });

  // Düğmeler
  $('hint').disabled = !playing || game.hintUsed;
  $('restart').textContent = finished || game.phase === 'idle' ? 'Yeni oyun' : 'Yeniden başlat';
  $('hm-result').hidden = !finished;

  renderScores();
}

function categoryLine() {
  if (game.mode === 'duo') {
    if (game.catShown && game.hintText) return `İpucu: ${game.hintText}`;
    return game.catShown ? 'İpucu: kelimeyi seçen bir ipucu yazmadı' : 'Kategori: iki kişilik mod (ipucu alabilirsiniz)';
  }
  if (game.hidden && !game.catShown && game.phase === 'playing') return 'Kategori: gizli (ipucuyla öğrenebilirsiniz)';
  return `Kategori: ${data?.[game.category]?.ad ?? ''}`;
}

function renderScores() {
  $('sc-score').textContent = String(store.score);
  $('sc-streak').textContent = String(store.streak);
  $('sc-best').textContent = String(store.bestStreak);
  $('sc-record').textContent = `${store.wins} / ${store.losses}`;
  $('duo-p1').textContent = String(store.duo.p1);
  $('duo-p2').textContent = String(store.duo.p2);
}

/* ---------- Oyun akışı ---------- */
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Tek kişilik yeni oyun: seçili kategoriden (ya da karışık) son oynananlar hariç bir kelime seçer. */
function startSingle() {
  if (!ready) return;
  const sel = $('category').value;
  const keys = Object.keys(data);
  const catKey = sel === 'karisik' ? pickRandom(keys) : sel;
  let pool = data[catKey].kelimeler.filter((x) => !recent.includes(x));
  if (!pool.length) { recent.length = 0; pool = data[catKey].kelimeler.slice(); }
  const word = pickRandom(pool);
  recent.push(word);
  if (recent.length > RECENT_LIMIT) recent.shift();
  Object.assign(game, {
    mode: 'single', phase: 'playing', word, category: catKey, hidden: sel === 'karisik', hintText: '',
    guessed: new Set(), wrong: [], hintUsed: false, catShown: sel !== 'karisik', hintLetter: '',
  });
  $('hm-result').dataset.result = '';
  render();
  setMsg('Bir harf seçin. 7 hata yaparsanız oyun biter.', false, 3500);
}

/** İki kişilik: gizli kelimeyle oyunu başlatır. */
function startDuo(word, hintText) {
  Object.assign(game, {
    mode: 'duo', phase: 'playing', word, category: '', hidden: false, hintText, guessed: new Set(), wrong: [],
    hintUsed: false, catShown: false, hintLetter: '',
  });
  render();
  setMsg('Oyun başladı. Şimdi tahmin eden oyuncu harf seçsin.', false, 3500);
}

/** Yarım bırakılan tek kişilik oyun yenilgi sayılır (seri hilesini önler). */
function abandonIfNeeded() {
  if (game.mode !== 'single' || game.phase !== 'playing') return false;
  if (!game.guessed.size && !game.hintUsed) return false;
  store.losses++;
  store.streak = 0;
  saveStore();
  return true;
}

function guess(letter) {
  if (game.phase !== 'playing' || !ready) return;
  if (game.guessed.has(letter)) { setMsg(`${letter} harfini zaten denediniz.`, true, 2000); return; }
  game.guessed.add(letter);
  const hit = [...game.word].includes(letter);
  if (!hit) game.wrong.push(letter);
  checkEnd();
  render();
  if (game.phase === 'playing') setMsg(hit ? `Evet, kelimede ${letter} var.` : `Hayır, kelimede ${letter} yok.`, !hit, 1800);
}

function useHint() {
  if (game.phase !== 'playing' || game.hintUsed) return;
  game.hintUsed = true;
  game.catShown = true;
  const first = [...game.word][0];
  game.hintLetter = game.guessed.has(first) ? '' : first;
  game.guessed.add(first); // ilk harfi açar; hata sayılmaz
  checkEnd();
  render();
  if (game.phase === 'playing') setMsg(game.mode === 'single' ? `İpucu: kategori “${data[game.category].ad}”, ilk harf ${first}. (Kazanırsanız puan 30 azalır.)` : `İpucu: ilk harf ${first}.`, false, 5000);
}

function checkEnd() {
  const all = [...game.word].every((ch) => game.guessed.has(ch));
  if (all) game.phase = 'won';
  else if (game.wrong.length >= MAX_WRONG) game.phase = 'lost';
  else return;
  finish();
}

function finish() {
  const won = game.phase === 'won';
  const left = MAX_WRONG - game.wrong.length;
  const title = $('hm-result-title');
  const detail = $('hm-result-detail');
  $('hm-result').dataset.result = won ? 'won' : 'lost';
  if (game.mode === 'single') {
    if (won) {
      const gained = Math.max(10, 50 + 10 * left - (game.hintUsed ? 30 : 0));
      store.score += gained;
      store.wins++;
      store.streak++;
      store.bestStreak = Math.max(store.bestStreak, store.streak);
      title.textContent = `Tebrikler! Kelime ${game.word}.`;
      detail.textContent = `+${gained} puan · ${game.wrong.length} hata${game.hintUsed ? ' · ipucu kullanıldı (−30)' : ''}. Seri: ${store.streak}.`;
    } else {
      store.losses++;
      store.streak = 0;
      title.textContent = `Kaybettiniz. Kelime: ${game.word}`;
      detail.textContent = 'Seri sıfırlandı. Yeni oyunda daha çok şansınız olacak; sık geçen ünlülerle (A, E, İ) başlamak iyi bir yoldur.';
    }
  } else {
    const setter = store.duo.round % 2 === 1 ? 1 : 2; // kelimeyi seçen
    const guesser = setter === 1 ? 2 : 1;
    const winner = won ? guesser : setter;
    store.duo[`p${winner}`]++;
    title.textContent = won ? `Oyuncu ${guesser} kelimeyi buldu: ${game.word}` : `Oyuncu ${setter} kazandı. Kelime: ${game.word}`;
    detail.textContent = `Puan: Oyuncu ${winner} +1. Yeni oyunda roller değişir.`;
  }
  saveStore();
  if (!reduceMotion) setTimeout(() => $('hm-result').scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 50);
}

/** "Yeniden başlat" / "Yeni oyun" düğmesi. */
function restart() {
  if (!ready) return;
  if (game.mode === 'single') {
    const penalized = abandonIfNeeded();
    startSingle();
    if (penalized) setMsg('Önceki oyun yarım bırakıldığı için yenilgi sayıldı ve seri sıfırlandı. Yeni kelime hazır.', false, 4500);
  } else {
    if (game.phase === 'won' || game.phase === 'lost') store.duo.round++;
    saveStore();
    game.phase = 'idle';
    game.word = '';
    game.guessed = new Set();
    game.wrong = [];
    prepareDuoForm();
    render();
  }
}

function setMode(mode) {
  if (!ready || game.mode === mode) return;
  const penalized = abandonIfNeeded();
  if (mode === 'single') {
    startSingle();
    if (penalized) setMsg('Önceki oyun yarım bırakıldığı için yenilgi sayıldı ve seri sıfırlandı.', false, 4500);
    return;
  }
  game.mode = 'duo';
  game.phase = 'idle';
  game.word = '';
  game.guessed = new Set();
  game.wrong = [];
  prepareDuoForm();
  render();
}

function prepareDuoForm() {
  const setter = store.duo.round % 2 === 1 ? 1 : 2;
  $('duo-who').textContent = `Tur ${store.duo.round}: Kelimeyi Oyuncu ${setter} seçiyor, Oyuncu ${setter === 1 ? 2 : 1} tahmin edecek. Tahmin eden oyuncu ekrana bakmasın.`;
  $('secret').value = '';
  $('secret-hint').value = '';
  $('secret-show').checked = false;
  $('secret').classList.remove('is-shown');
  $('duo-error').textContent = '';
}

function submitDuo(e) {
  e.preventDefault();
  const raw = $('secret').value.trim();
  const word = up(raw);
  const err = $('duo-error');
  if (!raw) { err.textContent = 'Gizli bir kelime yazın (3–20 harf).'; return; }
  if (/\s/.test(raw)) { err.textContent = 'Boşluk kullanmayın; tek bir kelime yazın.'; return; }
  if (!SECRET_RE.test(word)) {
    err.textContent = 'Kelimede yalnızca Türkçe harfler olmalı (rakam, işaret, Q, W, X olmaz) ve 3–20 harf uzunluğunda olmalı.';
    return;
  }
  err.textContent = '';
  const hint = $('secret-hint').value.trim().slice(0, 40);
  $('secret').value = '';
  startDuo(word, hint);
}

/* ---------- Olaylar ---------- */
$('keyboard').addEventListener('click', (e) => {
  const b = e.target.closest('.hm-key');
  if (!b) return;
  guess(b.dataset.key);
  if (e.detail > 0) b.blur(); // fare/dokunmadan sonra odağı bırak; klavyeyle odak korunur
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (e.key === 'Enter' || e.key === ' ') {
    if (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY') return;
    if (e.key === 'Enter' && (game.phase === 'won' || game.phase === 'lost')) { e.preventDefault(); restart(); }
    return;
  }
  if (e.key.length !== 1) return;
  const ch = up(e.key);
  if (ALPHABET.has(ch)) { e.preventDefault(); guess(ch); }
});

$('restart').addEventListener('click', restart);
$('hint').addEventListener('click', useHint);
$('mode-single').addEventListener('click', () => setMode('single'));
$('mode-duo').addEventListener('click', () => setMode('duo'));
$('category').addEventListener('change', () => {
  if (game.mode !== 'single') return;
  const penalized = abandonIfNeeded();
  startSingle();
  if (penalized) setMsg('Kategori değiştirildiği için önceki oyun yenilgi sayıldı ve seri sıfırlandı.', false, 4500);
});
$('duo-form').addEventListener('submit', submitDuo);
$('secret-show').addEventListener('change', (e) => $('secret').classList.toggle('is-shown', e.target.checked));
$('reset-scores').addEventListener('click', () => {
  const d = defaults();
  store = { ...d, duo: store.duo };
  saveStore();
  renderScores();
  setMsg('Tek kişilik puan ve seri sıfırlandı.', false, 2500);
});
$('reset-duo').addEventListener('click', () => {
  store.duo = { p1: 0, p2: 0, round: 1 };
  saveStore();
  if (game.mode === 'duo' && game.phase === 'idle') prepareDuoForm();
  renderScores();
  setMsg('İki kişilik skor sıfırlandı.', false, 2500);
});

async function init() {
  buildSvg();
  buildKeyboard();
  renderScores();
  setMsg('Kelime listesi yükleniyor…', false, 0);
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(String(res.status));
    data = await res.json();
    if (!Object.keys(data).length) throw new Error('boş');
  } catch (_) {
    setMsg('Kelime listesi yüklenemedi. Sayfayı yenileyin; sorun sürerse bağlantınızı kontrol edip tekrar deneyin. İki kişilik mod için de liste gerekir.', true, 0);
    return;
  }
  // Kategori listesi: karışık + dosyadaki kategoriler
  const sel = $('category');
  for (const [key, v] of Object.entries(data)) {
    const o = document.createElement('option');
    o.value = key;
    o.textContent = v.ad;
    sel.appendChild(o);
  }
  ready = true;
  $('hm-box').dataset.ready = '1';
  startSingle();
}

init();
