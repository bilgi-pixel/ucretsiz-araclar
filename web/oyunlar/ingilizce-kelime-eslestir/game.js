// İngilizce Kelime Eşleştir: eşleştirme kartları, 4 şıklı mod ve yazarak mod. A1-B2 seviye filtresi, yanlışları tekrar, localStorage rekoru.
import { WORDS, LEVELS } from './kelimeler.js';

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-ingilizce-kelime-eslestir';
const BOARD_SIZE = 5;
const WRONG_LIMIT = 60;

const MODES = {
  kart: { label: 'Eşleştirme kartları' },
  sik: { label: '4 şıklı test' },
  yaz: { label: 'Yazarak' },
};

const screens = { ayar: $('ekran-ayar'), oyun: $('ekran-oyun'), sonuc: $('ekran-sonuc') };
const panels = { kart: $('panel-kart'), sik: $('panel-sik'), yaz: $('panel-yaz') };
const optBtns = [...document.querySelectorAll('#siklar .bg-opt')];
const qEl = $('soru-metin');
const feedbackEl = $('geri-bildirim');
const nextBtn = $('sonraki');
const fsBtn = $('tam-ekran');
const boxEl = $('oyun');
const typeInput = $('yaz-girdi');

/* ---------- Kayıt (bozuk veriye karşı korumalı) ---------- */
const clampInt = (v, lo, hi) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, Math.round(v))) : 0);
const KNOWN = new Set(WORDS.map((w) => w[1]));
function defaultStore() { return { rounds: 0, answered: 0, correct: 0, bestStreak: 0, best: {}, last: [], wrong: [] }; }
function loadStore() {
  const s = defaultStore();
  try {
    const o = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!o || typeof o !== 'object' || Array.isArray(o)) return s;
    s.rounds = clampInt(o.rounds, 0, 1e7);
    s.answered = clampInt(o.answered, 0, 1e7);
    s.correct = Math.min(s.answered, clampInt(o.correct, 0, 1e7));
    s.bestStreak = clampInt(o.bestStreak, 0, 1e5);
    if (o.best && typeof o.best === 'object' && !Array.isArray(o.best)) {
      Object.keys(o.best).slice(0, 40).forEach((k) => { if (/^[a-z]+-\d+$/.test(k)) s.best[k] = clampInt(o.best[k], 0, 1e6); });
    }
    if (Array.isArray(o.last)) s.last = o.last.filter((x) => typeof x === 'number' && Number.isFinite(x)).slice(-5).map((x) => clampInt(x, 0, 1e6));
    // yalnızca havuzda gerçekten bulunan sözcükler kabul edilir
    if (Array.isArray(o.wrong)) s.wrong = [...new Set(o.wrong.filter((x) => typeof x === 'string' && KNOWN.has(x)))].slice(0, WRONG_LIMIT);
  } catch (e) { /* bozuk kayıt: varsayılana dön */ }
  return s;
}
let store = loadStore();
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }
function markWrong(en) { if (!store.wrong.includes(en)) store.wrong.push(en); if (store.wrong.length > WRONG_LIMIT) store.wrong.shift(); }
function markRight(en) { store.wrong = store.wrong.filter((x) => x !== en); }

/* ---------- Yardımcılar ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function show(name) {
  Object.keys(screens).forEach((k) => { screens[k].hidden = k !== name; });
  boxEl.dataset.phase = name;
}
const toObj = (w) => ({ level: w[0], en: w[1], tr: w[2] });
const ALL = WORDS.map(toObj);
const norm = (s) => s.trim().toLocaleLowerCase('en').replace(/\s+/g, ' ');

/* ---------- Oyun durumu ---------- */
let round = null; // { mode, dir, want, items[], i, n, score, streak, bestStreak, correct, attempts, wrong[], answered, cur, boards[], boardNo, matched, sel }

function startRound(overrideItems) {
  const mode = MODES[$('mod').value] ? $('mod').value : 'kart';
  const level = $('seviye').value;
  const want = Number($('soru-sayisi').value) === 20 ? 20 : 10;
  const dir = $('yon').value === 'tr-en' ? 'tr-en' : 'en-tr';
  const warn = $('ayar-uyari');
  warn.textContent = '';
  let items;
  if (Array.isArray(overrideItems) && overrideItems.length) {
    items = overrideItems.slice();
  } else {
    const pool = ALL.filter((w) => level === 'hepsi' || w.level === level);
    if (pool.length < 10) { warn.textContent = 'Bu seviyede yeterli sözcük yok; başka bir seviye seçin.'; return; }
    items = shuffle(pool).slice(0, want);
  }
  // Eşleştirme tahtası için en az 4 sözcük gerekir; yanlış tekrarında eksik kalırsa havuzdan tamamlanır
  while (mode === 'kart' && items.length < 4) {
    const extra = ALL[Math.floor(Math.random() * ALL.length)];
    if (!items.some((x) => x.en === extra.en)) items.push(extra);
  }
  round = { mode, dir, want: overrideItems ? Math.min(20, Math.max(10, items.length > 10 ? 20 : 10)) : want, items, i: 0, n: items.length, score: 0, streak: 0, bestStreak: 0, correct: 0, attempts: 0, wrong: [], answered: false, cur: null, boards: [], boardNo: 0, matched: 0, sel: null, review: !!overrideItems };
  show('oyun');
  Object.keys(panels).forEach((k) => { panels[k].hidden = k !== mode; });
  $('mod-etiket').textContent = MODES[mode].label + (round.review ? ' (tekrar)' : '');
  $('sira-etiket').textContent = mode === 'kart' ? 'Eşleşen' : 'Soru';
  $('toplam').textContent = String(round.n);
  $('puan').textContent = '0';
  $('seri').textContent = '0';
  feedbackEl.textContent = '';
  feedbackEl.className = 'bg-feedback';
  if (mode === 'kart') { buildBoards(); showBoard(); } else { $('sira').textContent = '1'; nextQuestion(); }
}

/* ---------- Eşleştirme kartları ---------- */
function buildBoards() {
  const r = round;
  const count = Math.ceil(r.items.length / BOARD_SIZE);
  const size = Math.ceil(r.items.length / count);
  r.boards = [];
  for (let k = 0; k < r.items.length; k += size) r.boards.push(r.items.slice(k, k + size));
}
function showBoard() {
  const r = round;
  const board = r.boards[r.boardNo];
  r.sel = null;
  r.answered = false;
  $('sira').textContent = String(r.matched);
  qEl.textContent = `Tahta ${r.boardNo + 1}/${r.boards.length}: bir İngilizce sözcüğü ve Türkçe karşılığını seçin.`;
  const left = $('kart-en');
  const right = $('kart-tr');
  left.textContent = '';
  right.textContent = '';
  const mk = (w, side) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ke-card';
    b.dataset.side = side;
    b.dataset.en = w.en;
    b.setAttribute('aria-pressed', 'false');
    b.textContent = side === 'en' ? w.en : w.tr;
    b.addEventListener('click', () => pickCard(b));
    return b;
  };
  shuffle(board).forEach((w) => left.appendChild(mk(w, 'en')));
  shuffle(board).forEach((w) => right.appendChild(mk(w, 'tr')));
  nextBtn.hidden = true;
}
function pickCard(btn) {
  const r = round;
  if (!r || r.mode !== 'kart' || btn.disabled) return;
  if (r.sel && r.sel.dataset.side === btn.dataset.side) {
    r.sel.setAttribute('aria-pressed', 'false');
    r.sel.classList.remove('is-sel');
    r.sel = r.sel === btn ? null : btn;
    if (r.sel) { btn.setAttribute('aria-pressed', 'true'); btn.classList.add('is-sel'); }
    return;
  }
  if (!r.sel) {
    r.sel = btn;
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('is-sel');
    return;
  }
  const first = r.sel;
  r.sel = null;
  first.setAttribute('aria-pressed', 'false');
  first.classList.remove('is-sel');
  const enBtn = first.dataset.side === 'en' ? first : btn;
  const trBtn = first.dataset.side === 'tr' ? first : btn;
  r.attempts += 1;
  store.answered += 1;
  if (enBtn.dataset.en === trBtn.dataset.en) {
    store.correct += 1;
    r.correct += 1;
    r.streak += 1;
    r.bestStreak = Math.max(r.bestStreak, r.streak);
    const gain = 10 + Math.min(25, (r.streak - 1) * 5);
    r.score += gain;
    r.matched += 1;
    markRight(enBtn.dataset.en);
    [enBtn, trBtn].forEach((b) => { b.disabled = true; b.classList.add('is-matched'); });
    feedbackEl.textContent = `Doğru eşleşme! +${gain} puan`;
    feedbackEl.className = 'bg-feedback is-ok';
    $('sira').textContent = String(r.matched);
    $('puan').textContent = String(r.score);
    $('seri').textContent = String(r.streak);
    const left = [...document.querySelectorAll('#kart-en .ke-card')].filter((b) => !b.disabled);
    if (left.length === 0) {
      if (r.boardNo + 1 < r.boards.length) { nextBtn.textContent = 'Sonraki tahta'; nextBtn.hidden = false; nextBtn.focus({ preventScroll: true }); r.answered = true; }
      else finish(false);
    }
  } else {
    r.streak = 0;
    const word = ALL.find((w) => w.en === enBtn.dataset.en);
    if (word && !r.wrong.some((x) => x.en === word.en)) r.wrong.push({ ...word, chosen: trBtn.textContent });
    markWrong(enBtn.dataset.en);
    feedbackEl.textContent = 'Yanlış eşleşme. Seriniz sıfırlandı, tekrar deneyin.';
    feedbackEl.className = 'bg-feedback is-bad';
    $('seri').textContent = '0';
    [enBtn, trBtn].forEach((b) => { b.classList.add('is-wrong'); setTimeout(() => b.classList.remove('is-wrong'), 600); });
  }
}

/* ---------- 4 şıklı ve yazarak mod ---------- */
function buildChoices(word, dir) {
  const text = (w) => (dir === 'en-tr' ? w.tr : w.en);
  const used = new Set([text(word)]);
  const picks = [];
  const take = (list) => {
    for (const w of list) {
      if (picks.length >= 3) break;
      if (used.has(text(w))) continue;
      used.add(text(w));
      picks.push(w);
    }
  };
  take(shuffle(ALL.filter((w) => w.level === word.level && w.en !== word.en)));
  take(shuffle(ALL.filter((w) => w.en !== word.en)));
  return shuffle([word, ...picks]).map((w) => ({ en: w.en, label: text(w) }));
}

function nextQuestion() {
  const r = round;
  const word = r.items[r.i];
  r.cur = word;
  r.answered = false;
  $('sira').textContent = String(r.i + 1);
  $('puan').textContent = String(r.score);
  $('seri').textContent = String(r.streak);
  feedbackEl.textContent = '';
  feedbackEl.className = 'bg-feedback';
  nextBtn.hidden = true;
  if (r.mode === 'sik') {
    r.cur = { word, options: buildChoices(word, r.dir) };
    qEl.textContent = r.dir === 'en-tr' ? `“${word.en}” sözcüğünün Türkçesi nedir?` : `“${word.tr}” sözcüğünün İngilizcesi nedir?`;
    optBtns.forEach((b, k) => {
      const o = r.cur.options[k];
      b.disabled = false;
      b.className = 'bg-opt';
      b.dataset.en = o ? o.en : '';
      b.querySelector('.bg-t').textContent = o ? o.label : '';
      b.hidden = !o;
    });
    qEl.focus({ preventScroll: true });
  } else {
    qEl.textContent = `“${word.tr}” sözcüğünün İngilizcesini yazın.`;
    typeInput.value = '';
    typeInput.disabled = false;
    $('yaz-gonder').disabled = false;
    typeInput.focus({ preventScroll: true });
  }
}

function recordResult(ok, word, chosenText) {
  const r = round;
  r.answered = true;
  r.attempts += 1;
  store.answered += 1;
  if (ok) {
    store.correct += 1;
    r.correct += 1;
    r.streak += 1;
    r.bestStreak = Math.max(r.bestStreak, r.streak);
    const gain = 10 + Math.min(25, (r.streak - 1) * 5);
    r.score += gain;
    markRight(word.en);
    feedbackEl.textContent = `Doğru! +${gain} puan`;
    feedbackEl.className = 'bg-feedback is-ok';
  } else {
    r.streak = 0;
    r.wrong.push({ ...word, chosen: chosenText });
    markWrong(word.en);
    feedbackEl.textContent = r.mode === 'yaz' ? `Yanlış. Doğrusu: ${word.en}` : `Yanlış. Doğru cevap: ${r.dir === 'en-tr' ? word.tr : word.en}`;
    feedbackEl.className = 'bg-feedback is-bad';
  }
  $('puan').textContent = String(r.score);
  $('seri').textContent = String(r.streak);
  nextBtn.textContent = r.i + 1 >= r.n ? 'Sonucu gör' : 'Sonraki soru';
  nextBtn.hidden = false;
  nextBtn.focus({ preventScroll: true });
}

function answerChoice(k) {
  const r = round;
  if (!r || r.mode !== 'sik' || r.answered || screens.oyun.hidden) return;
  const o = r.cur.options[k];
  if (!o) return;
  const word = r.cur.word;
  const ok = o.en === word.en;
  optBtns.forEach((b) => {
    b.disabled = true;
    if (b.dataset.en === word.en) b.classList.add('is-correct');
    else if (b.dataset.en === o.en) b.classList.add('is-wrong');
  });
  recordResult(ok, word, o.label);
}

function submitTyped(e) {
  if (e) e.preventDefault();
  const r = round;
  if (!r || r.mode !== 'yaz' || r.answered) return;
  const typed = typeInput.value;
  if (!typed.trim()) { feedbackEl.textContent = 'Önce bir sözcük yazın.'; feedbackEl.className = 'bg-feedback is-bad'; return; }
  typeInput.disabled = true;
  $('yaz-gonder').disabled = true;
  recordResult(norm(typed) === norm(r.cur.en), r.cur, typed.trim());
}

function advance() {
  const r = round;
  if (!r || !r.answered) return;
  if (r.mode === 'kart') {
    r.boardNo += 1;
    showBoard();
    return;
  }
  r.i += 1;
  if (r.i >= r.n) finish(false);
  else nextQuestion();
}

/* ---------- Tur sonu ---------- */
function finish(early) {
  const r = round;
  if (!r) return;
  const key = `${r.mode}-${r.want}`;
  const prev = store.best[key] || 0;
  const countsForRecord = !r.review; // tekrar turları rekor sayılmaz
  const isRecord = !early && countsForRecord && r.score > prev && r.attempts > 0;
  if (!early || r.attempts > 0) {
    store.rounds += 1;
    store.bestStreak = Math.max(store.bestStreak, r.bestStreak);
    if (isRecord) store.best[key] = r.score;
    store.last = store.last.concat([r.score]).slice(-5);
  }
  saveStore();
  show('sonuc');
  $('sonuc-puan').textContent = String(r.score);
  $('sonuc-rekor').hidden = !isRecord;
  const asked = r.attempts;
  $('sonuc-ozet').textContent = r.mode === 'kart'
    ? `${asked} eşleştirme denemesinin ${r.correct} tanesi doğruydu. En uzun seriniz: ${r.bestStreak}.`
    : `${asked} sorudan ${r.correct} tanesini doğru bildiniz. En uzun seriniz: ${r.bestStreak}.`;
  const pct = asked ? r.correct / asked : 0;
  $('sonuc-yorum').textContent = pct >= 0.9 ? 'Harika, kelime hazineniz çok sağlam!' : pct >= 0.7 ? 'Çok iyi, birkaç tekrarla tam puana yaklaşırsınız.' : pct >= 0.4 ? 'Fena değil. Yanlışlarınızı tekrar edip yeniden deneyin.' : 'Bu bir başlangıç. Aşağıdaki sözcükleri inceleyip yanlışları tekrar edin.';
  $('sonuc-en-yuksek').textContent = r.review ? 'Tekrar turları rekor sayılmaz.' : `Bu mod için en yüksek puanınız: ${store.best[key] || 0}`;
  const list = $('yanlislar');
  list.textContent = '';
  $('yanlis-yok').hidden = !(r.wrong.length === 0 && asked > 0);
  $('yanlis-baslik').hidden = r.wrong.length === 0;
  list.hidden = r.wrong.length === 0;
  $('yanlis-tekrar').hidden = r.wrong.length === 0;
  r.wrong.forEach((w) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `${w.en} = ${w.tr}`;
    const lvl = document.createElement('span');
    lvl.className = 'bg-you';
    lvl.textContent = `Seviye ${w.level}` + (w.chosen ? ` · Cevabınız: ${w.chosen}` : '');
    li.append(strong, lvl);
    list.appendChild(li);
  });
  renderStats();
  $('sonuc-baslik').focus({ preventScroll: true });
}

/* ---------- İstatistik ---------- */
function renderStats() {
  const box = $('istatistik');
  box.hidden = store.rounds === 0 && store.answered === 0;
  $('ist-tur').textContent = String(store.rounds);
  $('ist-soru').textContent = String(store.answered);
  $('ist-dogruluk').textContent = store.answered ? `%${Math.round((store.correct / store.answered) * 100)}` : '—';
  const bests = Object.values(store.best);
  $('ist-puan').textContent = String(bests.length ? Math.max(...bests) : 0);
  $('ist-seri').textContent = String(store.bestStreak);
  $('ist-son').textContent = store.last.length ? store.last.join(' · ') : '—';
  const wb = $('yanlis-calis');
  wb.hidden = store.wrong.length === 0;
  $('yanlis-sayi').textContent = String(store.wrong.length);
}

/* ---------- Başlangıç ---------- */
function init() {
  const mod = $('mod');
  Object.keys(MODES).forEach((k) => { const o = document.createElement('option'); o.value = k; o.textContent = MODES[k].label; mod.appendChild(o); });
  const lv = $('seviye');
  LEVELS.forEach((c) => {
    const n = ALL.filter((x) => x.level === c).length;
    const o = document.createElement('option'); o.value = c; o.textContent = `${c} (${n} sözcük)`; lv.appendChild(o);
  });
  lv.firstElementChild.textContent = `Tüm seviyeler (${ALL.length} sözcük)`;
  $('havuz-sayisi').textContent = String(ALL.length);

  optBtns.forEach((b, k) => b.addEventListener('click', () => answerChoice(k)));
  $('yaz-form').addEventListener('submit', submitTyped);
  nextBtn.addEventListener('click', advance);
  $('baslat').addEventListener('click', () => startRound());
  $('tekrar').addEventListener('click', () => startRound());
  $('ayara-don').addEventListener('click', () => { show('ayar'); renderStats(); });
  $('birak').addEventListener('click', () => { if (round) finish(true); });
  // Kayıtlı yanlışlardan tur başlat
  $('yanlis-calis').addEventListener('click', () => {
    const items = store.wrong.map((en) => ALL.find((w) => w.en === en)).filter(Boolean);
    startRound(items);
  });
  // Bu turun yanlışlarından tur başlat
  $('yanlis-tekrar').addEventListener('click', () => {
    if (!round) return;
    const items = round.wrong.map((w) => ALL.find((x) => x.en === w.en)).filter(Boolean);
    startRound(items);
  });
  $('ist-sifirla').addEventListener('click', () => {
    if (!window.confirm('İstatistikleriniz ve kayıtlı yanlışlarınız silinsin mi? Bu işlem geri alınamaz.')) return;
    store = defaultStore();
    saveStore();
    renderStats();
  });
  document.addEventListener('keydown', (e) => {
    if (!round || screens.oyun.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'SELECT' || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    if (round.mode === 'sik' && e.key >= '1' && e.key <= '4') { answerChoice(Number(e.key) - 1); e.preventDefault(); }
  });
  if (document.fullscreenEnabled) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else boxEl.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => {
      fsBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement));
      fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
    });
  }
  renderStats();
  show('ayar');
}

init();
