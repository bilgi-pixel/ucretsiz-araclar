// Bayrak Bil: bayraktan ülke, ülkeden başkent, başkentten ülke bilmeceleri. 195 ülke, 4 şık, süreli mod, localStorage skoru.
// Bayrak görselleri flag-icons (MIT) SVG'leridir ve aynı siteden yüklenir; dış istek yok.
import { COUNTRIES, CONTINENTS } from './ulkeler.js';

const $ = (id) => document.getElementById(id);
const FLAG_DIR = '../../vendor/flag-icons@7.6.0/flags/';
const KEY = 'ba-oyun-bayrak-bil';
const SECONDS = 15;

const MODES = {
  bayrak: { label: 'Bayraktan ülke' },
  baskent: { label: 'Ülkeden başkent' },
  ulke: { label: 'Başkentten ülke' },
};

const screens = { ayar: $('ekran-ayar'), oyun: $('ekran-oyun'), sonuc: $('ekran-sonuc') };
const optBtns = [...document.querySelectorAll('#siklar .bg-opt')];
const qEl = $('soru-metin');
const flagBox = $('bayrak-kutu');
const flagImg = $('bayrak');
const feedbackEl = $('geri-bildirim');
const nextBtn = $('sonraki');
const timeBox = $('sure-kutu');
const timeBar = $('sure-bar');
const timeTxt = $('sure-yazi');
const fsBtn = $('tam-ekran');
const boxEl = $('oyun');

/* ---------- Kayıt (bozuk veriye karşı korumalı) ---------- */
const clampInt = (v, lo, hi) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, Math.round(v))) : 0);
function defaultStore() { return { rounds: 0, answered: 0, correct: 0, bestStreak: 0, best: {}, last: [] }; }
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
  } catch (e) { /* bozuk kayıt: varsayılana dön */ }
  return s;
}
let store = loadStore();
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

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

/* ---------- Oyun durumu ---------- */
let round = null; // { mode, items, i, score, streak, bestStreak, correct, wrong[], timed, answered, cur, deadline, remaining, tick }

// Bir soru üretir: doğru ülke + 3 yanlış ülke (aynı kıtadan öncelikli); şıklar metindir
function buildQuestion(country, mode, pool) {
  const sameCont = shuffle(COUNTRIES.filter((c) => c.continent === country.continent && c.code !== country.code));
  const others = shuffle(COUNTRIES.filter((c) => c.continent !== country.continent));
  const text = (c) => (mode === 'baskent' ? c.capital : c.name);
  const used = new Set([text(country)]);
  const picks = [];
  const take = (list, max) => {
    for (const c of list) {
      if (picks.length >= max) break;
      if (used.has(text(c))) continue;
      used.add(text(c));
      picks.push(c);
    }
  };
  // Havuz (kıta filtresi) küçükse bile 3 şık çıksın diye önce aynı kıtadan iki, sonra kalan
  take(sameCont, 2);
  take(others, 3);
  take(sameCont, 3);
  const options = shuffle([country, ...picks]).map((c) => ({ code: c.code, label: text(c) }));
  let prompt;
  if (mode === 'bayrak') prompt = 'Bu bayrak hangi ülkeye ait?';
  else if (mode === 'baskent') prompt = `${country.name} ülkesinin başkenti neresidir?`;
  else prompt = `${country.capital} hangi ülkenin başkentidir?`;
  return { country, mode, prompt, options, answer: country.code };
}

function startRound() {
  const mode = $('mod').value;
  const cont = $('kita').value;
  const n = Number($('soru-sayisi').value) === 20 ? 20 : 10;
  const timed = $('sure').value === 'sureli';
  const warn = $('ayar-uyari');
  warn.textContent = '';
  const pool = COUNTRIES.filter((c) => cont === 'hepsi' || c.continent === cont);
  if (pool.length < 4) { warn.textContent = 'Bu kıtada yeterli ülke yok; başka bir kıta seçin.'; return; }
  const items = shuffle(pool).slice(0, Math.min(n, pool.length));
  if (items.length < n) warn.textContent = `Bu seçimde yalnızca ${items.length} ülke var; tur ${items.length} soru olacak.`;
  round = { mode, cont, n: items.length, want: n, items, i: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, wrong: [], timed, answered: false, cur: null, tick: 0, remaining: SECONDS, deadline: 0 };
  show('oyun');
  nextQuestion();
}

function nextQuestion() {
  stopTimer();
  const r = round;
  r.cur = buildQuestion(r.items[r.i], r.mode);
  r.answered = false;
  $('sira').textContent = String(r.i + 1);
  $('toplam').textContent = String(r.n);
  $('puan').textContent = String(r.score);
  $('seri').textContent = String(r.streak);
  $('mod-etiket').textContent = MODES[r.mode].label;
  qEl.textContent = r.cur.prompt;
  if (r.mode === 'bayrak') {
    flagBox.hidden = false;
    flagImg.src = FLAG_DIR + r.cur.country.code + '.svg';
    flagImg.dataset.code = r.cur.country.code;
  } else {
    flagBox.hidden = true;
    flagImg.removeAttribute('src');
    delete flagImg.dataset.code;
  }
  optBtns.forEach((b, k) => {
    const o = r.cur.options[k];
    b.disabled = false;
    b.className = 'bg-opt';
    b.dataset.code = o ? o.code : '';
    b.querySelector('.bg-t').textContent = o ? o.label : '';
    b.hidden = !o;
  });
  feedbackEl.textContent = '';
  feedbackEl.className = 'bg-feedback';
  nextBtn.hidden = true;
  timeBox.hidden = !r.timed;
  if (r.timed) startTimer(SECONDS);
  qEl.focus({ preventScroll: true });
}

/* ---------- Süre (sekme arka plana alınınca durur) ---------- */
function startTimer(seconds) {
  const r = round;
  r.remaining = seconds;
  r.deadline = Date.now() + seconds * 1000;
  paintTime();
  r.tick = setInterval(() => {
    if (document.hidden) { r.deadline = Date.now() + r.remaining * 1000; return; }
    r.remaining = Math.max(0, (r.deadline - Date.now()) / 1000);
    paintTime();
    if (r.remaining <= 0) timeUp();
  }, 100);
}
function stopTimer() { if (round && round.tick) { clearInterval(round.tick); round.tick = 0; } }
function paintTime() {
  const r = round;
  timeBar.style.width = Math.max(0, (r.remaining / SECONDS) * 100) + '%';
  timeBar.classList.toggle('is-low', r.remaining <= 5);
  timeTxt.textContent = String(Math.ceil(r.remaining));
}
function timeUp() {
  stopTimer();
  settle(null);
}

/* ---------- Cevaplama ---------- */
function answer(k) {
  const r = round;
  if (!r || r.answered) return;
  const o = r.cur.options[k];
  if (!o) return;
  stopTimer();
  settle(o.code);
}

function settle(chosenCode) {
  const r = round;
  r.answered = true;
  const q = r.cur;
  const ok = chosenCode === q.answer;
  const leftover = r.remaining;
  r.answeredCount = (r.answeredCount || 0) + 1;
  store.answered += 1;
  if (ok) {
    store.correct += 1;
    r.correct += 1;
    r.streak += 1;
    r.bestStreak = Math.max(r.bestStreak, r.streak);
    const bonusSeries = Math.min(25, (r.streak - 1) * 5);
    const bonusTime = r.timed ? Math.min(10, Math.floor(leftover)) : 0;
    const gain = 10 + bonusSeries + bonusTime;
    r.score += gain;
    feedbackEl.textContent = `Doğru! +${gain} puan`;
    feedbackEl.className = 'bg-feedback is-ok';
  } else {
    r.streak = 0;
    const right = q.options.find((x) => x.code === q.answer);
    const chosen = q.options.find((x) => x.code === chosenCode);
    r.wrong.push({ q, chosen: chosen ? chosen.label : null, right: right.label });
    feedbackEl.textContent = chosenCode === null ? `Süre doldu. Doğru cevap: ${right.label}` : `Yanlış. Doğru cevap: ${right.label}`;
    feedbackEl.className = 'bg-feedback is-bad';
  }
  optBtns.forEach((b) => {
    b.disabled = true;
    if (b.dataset.code === q.answer) b.classList.add('is-correct');
    else if (b.dataset.code === chosenCode) b.classList.add('is-wrong');
  });
  $('puan').textContent = String(r.score);
  $('seri').textContent = String(r.streak);
  nextBtn.textContent = r.i + 1 >= r.n ? 'Sonucu gör' : 'Sonraki soru';
  nextBtn.hidden = false;
  nextBtn.focus({ preventScroll: true });
}

function advance() {
  const r = round;
  if (!r || !r.answered) return;
  r.i += 1;
  if (r.i >= r.n) finish();
  else nextQuestion();
}

function finish(early) {
  stopTimer();
  const r = round;
  const key = `${r.mode}-${r.want}`;
  const prev = store.best[key] || 0;
  const isRecord = !early && r.score > prev && r.answeredCount > 0;
  if (!early || r.answeredCount > 0) {
    store.rounds += 1;
    store.bestStreak = Math.max(store.bestStreak, r.bestStreak);
    if (isRecord) store.best[key] = r.score;
    store.last = store.last.concat([r.score]).slice(-5);
    saveStore();
  }
  show('sonuc');
  $('sonuc-puan').textContent = String(r.score);
  $('sonuc-rekor').hidden = !isRecord;
  const asked = r.answeredCount || 0;
  $('sonuc-ozet').textContent = `${asked} sorudan ${r.correct} tanesini doğru bildiniz. En uzun seriniz: ${r.bestStreak}.`;
  const pct = asked ? r.correct / asked : 0;
  $('sonuc-yorum').textContent = pct >= 0.9 ? 'Harika, coğrafya bilginiz çok sağlam!' : pct >= 0.7 ? 'Çok iyi, birkaç tekrarla tam puana yaklaşırsınız.' : pct >= 0.4 ? 'Fena değil. Yanlışlarınızı gözden geçirip yeniden deneyin.' : 'Bu bir başlangıç. Aşağıdaki doğru cevapları inceleyip bir tur daha oynayın.';
  $('sonuc-en-yuksek').textContent = `Bu mod için en yüksek puanınız: ${store.best[key] || 0}`;
  const list = $('yanlislar');
  list.textContent = '';
  $('yanlis-yok').hidden = !(r.wrong.length === 0 && asked > 0);
  $('yanlis-baslik').hidden = r.wrong.length === 0;
  list.hidden = r.wrong.length === 0;
  r.wrong.forEach((w) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = w.q.mode === 'bayrak' ? 'Bayrak sorusu' : w.q.prompt;
    li.appendChild(strong);
    if (w.q.mode === 'bayrak') {
      const img = document.createElement('img');
      img.src = FLAG_DIR + w.q.country.code + '.svg';
      img.alt = `${w.right} bayrağı`;
      img.width = 60; img.height = 45;
      img.className = 'bb-mini';
      li.appendChild(img);
    }
    const you = document.createElement('span');
    you.className = 'bg-you';
    you.textContent = w.chosen ? `Cevabınız: ${w.chosen}` : 'Cevap verilmedi (süre doldu)';
    const right = document.createElement('span');
    right.className = 'bg-right';
    right.textContent = `Doğru cevap: ${w.right}`;
    li.append(you, right);
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
}

/* ---------- Başlangıç ---------- */
function init() {
  const mod = $('mod');
  Object.keys(MODES).forEach((k) => { const o = document.createElement('option'); o.value = k; o.textContent = MODES[k].label; mod.appendChild(o); });
  const kita = $('kita');
  CONTINENTS.forEach((c) => {
    const n = COUNTRIES.filter((x) => x.continent === c).length;
    const o = document.createElement('option'); o.value = c; o.textContent = `${c} (${n} ülke)`; kita.appendChild(o);
  });
  kita.firstElementChild.textContent = `Tüm dünya (${COUNTRIES.length} ülke)`;
  $('havuz-sayisi').textContent = String(COUNTRIES.length);

  optBtns.forEach((b, k) => b.addEventListener('click', () => answer(k)));
  nextBtn.addEventListener('click', advance);
  $('baslat').addEventListener('click', startRound);
  $('tekrar').addEventListener('click', startRound);
  $('ayara-don').addEventListener('click', () => { show('ayar'); renderStats(); });
  $('birak').addEventListener('click', () => { if (round) finish(true); });
  $('ist-sifirla').addEventListener('click', () => {
    if (!window.confirm('İstatistikleriniz silinsin mi? Bu işlem geri alınamaz.')) return;
    store = defaultStore();
    saveStore();
    renderStats();
  });
  document.addEventListener('keydown', (e) => {
    if (!round || screens.oyun.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'SELECT' || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    if (e.key >= '1' && e.key <= '4') { answer(Number(e.key) - 1); e.preventDefault(); }
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
