// Doğru mu Yanlış mı: 385 özgün önerme, her birinin kısa açıklaması var.
// İki mod: 60 saniyede olabildiğince çok önerme (hızlı mod) ve 20 soruluk tur. Seri bonusu, localStorage rekoru.
import { STATEMENTS, CATEGORIES } from './onermeler.js';

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-dogru-mu-yanlis-mi';
const SPEED_SECONDS = 60;
const ROUND_LEN = 20;
const NEXT_DELAY = 450; // hızlı modda cevaptan sonra yeni önermeye geçiş gecikmesi (ms)

const screens = { ayar: $('ekran-ayar'), oyun: $('ekran-oyun'), sonuc: $('ekran-sonuc') };
const optBtns = [...document.querySelectorAll('#siklar .bg-opt')];
const qEl = $('soru-metin');
const feedbackEl = $('geri-bildirim');
const explainEl = $('aciklama');
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
let round = null; // { mode, key, queue[], i, score, streak, bestStreak, correct, wrong[], answeredCount, answered, cur, tick, remaining, deadline, advance }

function startRound() {
  const mode = $('mod').value === 'soru20' ? 'soru20' : 'sure60';
  const cat = $('kategori').value;
  const pool = STATEMENTS.filter((s) => cat === 'hepsi' || s[0] === cat);
  const warn = $('ayar-uyari');
  warn.textContent = '';
  if (pool.length < 20) { warn.textContent = 'Bu kategoride yeterli önerme yok; başka bir kategori seçin.'; return; }
  const queue = shuffle(pool);
  round = { mode, key: mode === 'sure60' ? 'sure-60' : 'soru-20', pool, queue, i: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, wrong: [], answeredCount: 0, answered: false, cur: null, tick: 0, remaining: SPEED_SECONDS, deadline: 0, advance: 0 };
  show('oyun');
  $('toplam-etiket').hidden = mode === 'sure60';
  timeBox.hidden = mode !== 'sure60';
  showQuestion();
  if (mode === 'sure60') startTimer(SPEED_SECONDS);
}

function showQuestion() {
  const r = round;
  if (r.i >= r.queue.length) { r.queue = r.queue.concat(shuffle(r.pool)); } // hızlı modda havuz biterse baştan karıştır
  r.cur = r.queue[r.i];
  r.answered = false;
  $('sira').textContent = String(r.i + 1);
  $('toplam').textContent = String(ROUND_LEN);
  $('puan').textContent = String(r.score);
  $('seri').textContent = String(r.streak);
  $('kat-etiket').textContent = CATEGORIES[r.cur[0]];
  qEl.textContent = r.cur[1];
  optBtns.forEach((b) => { b.disabled = false; b.className = 'bg-opt'; });
  explainEl.hidden = true;
  nextBtn.hidden = true;
  if (r.mode === 'soru20') { feedbackEl.textContent = ''; feedbackEl.className = 'bg-feedback'; }
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
    if (r.remaining <= 0) finish(false);
  }, 100);
}
function stopTimer() {
  if (!round) return;
  if (round.tick) { clearInterval(round.tick); round.tick = 0; }
  if (round.advance) { clearTimeout(round.advance); round.advance = 0; }
}
function paintTime() {
  const r = round;
  timeBar.style.width = Math.max(0, (r.remaining / SPEED_SECONDS) * 100) + '%';
  timeBar.classList.toggle('is-low', r.remaining <= 10);
  timeTxt.textContent = String(Math.ceil(r.remaining));
}

/* ---------- Cevaplama ---------- */
function answer(val) {
  const r = round;
  if (!r || r.answered || screens.oyun.hidden) return;
  r.answered = true;
  const q = r.cur;
  const ok = val === q[2];
  r.answeredCount += 1;
  store.answered += 1;
  if (ok) {
    store.correct += 1;
    r.correct += 1;
    r.streak += 1;
    r.bestStreak = Math.max(r.bestStreak, r.streak);
    const gain = 10 + Math.min(25, (r.streak - 1) * 5);
    r.score += gain;
    feedbackEl.textContent = `Doğru! +${gain} puan`;
    feedbackEl.className = 'bg-feedback is-ok';
  } else {
    r.streak = 0;
    r.wrong.push({ q, chosen: val });
    feedbackEl.textContent = `Yanlış. Bu önerme ${q[2] ? 'doğruydu' : 'yanlıştı'}.`;
    feedbackEl.className = 'bg-feedback is-bad';
  }
  optBtns.forEach((b) => {
    b.disabled = true;
    const v = Number(b.dataset.val);
    if (v === q[2]) b.classList.add('is-correct');
    else if (v === val) b.classList.add('is-wrong');
  });
  $('puan').textContent = String(r.score);
  $('seri').textContent = String(r.streak);
  explainEl.textContent = q[3];
  explainEl.hidden = false;
  if (r.mode === 'sure60') {
    // Hızlı mod: kısa bir bekleyişten sonra yeni önerme gelir; açıklama sonuç ekranında da listelenir
    r.advance = setTimeout(() => { r.advance = 0; if (round === r && r.remaining > 0) { r.i += 1; showQuestion(); } }, NEXT_DELAY);
  } else {
    nextBtn.textContent = r.i + 1 >= ROUND_LEN ? 'Sonucu gör' : 'Sonraki önerme';
    nextBtn.hidden = false;
    nextBtn.focus({ preventScroll: true });
  }
}

function advanceManual() {
  const r = round;
  if (!r || !r.answered || r.mode !== 'soru20') return;
  r.i += 1;
  if (r.i >= ROUND_LEN) finish(false);
  else showQuestion();
}

function finish(early) {
  const r = round;
  if (!r) return;
  stopTimer();
  const prev = store.best[r.key] || 0;
  const isRecord = !early && r.score > prev && r.answeredCount > 0;
  if (!early || r.answeredCount > 0) {
    store.rounds += 1;
    store.bestStreak = Math.max(store.bestStreak, r.bestStreak);
    if (isRecord) store.best[r.key] = r.score;
    store.last = store.last.concat([r.score]).slice(-5);
    saveStore();
  }
  show('sonuc');
  $('sonuc-baslik').textContent = r.mode === 'sure60' && !early ? 'Süre doldu' : 'Tur bitti';
  $('sonuc-puan').textContent = String(r.score);
  $('sonuc-rekor').hidden = !isRecord;
  const asked = r.answeredCount;
  $('sonuc-ozet').textContent = `${asked} önermeden ${r.correct} tanesini doğru bildiniz. En uzun seriniz: ${r.bestStreak}.`;
  const pct = asked ? r.correct / asked : 0;
  $('sonuc-yorum').textContent = pct >= 0.9 ? 'Harika, genel kültürünüz çok sağlam!' : pct >= 0.7 ? 'Çok iyi, birkaç tekrarla tam puana yaklaşırsınız.' : pct >= 0.4 ? 'Fena değil. Yanlışlarınızın açıklamalarını okuyup yeniden deneyin.' : 'Bu bir başlangıç. Aşağıdaki açıklamaları okuyup bir tur daha oynayın.';
  $('sonuc-en-yuksek').textContent = `Bu mod için en yüksek puanınız: ${store.best[r.key] || 0}`;
  const list = $('yanlislar');
  list.textContent = '';
  $('yanlis-yok').hidden = !(r.wrong.length === 0 && asked > 0);
  $('yanlis-baslik').hidden = r.wrong.length === 0;
  list.hidden = r.wrong.length === 0;
  r.wrong.forEach((w) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = w.q[1];
    const you = document.createElement('span');
    you.className = 'bg-you';
    you.textContent = `Cevabınız: ${w.chosen ? 'Doğru' : 'Yanlış'}`;
    const right = document.createElement('span');
    right.className = 'bg-right';
    right.textContent = `Doğru cevap: ${w.q[2] ? 'Doğru' : 'Yanlış'}`;
    const why = document.createElement('span');
    why.className = 'dy-why';
    why.textContent = w.q[3];
    li.append(strong, you, right, why);
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
  const kat = $('kategori');
  Object.keys(CATEGORIES).forEach((k) => {
    const n = STATEMENTS.filter((s) => s[0] === k).length;
    const o = document.createElement('option'); o.value = k; o.textContent = `${CATEGORIES[k]} (${n} önerme)`; kat.appendChild(o);
  });
  kat.firstElementChild.textContent = `Karışık (${STATEMENTS.length} önerme)`;
  $('havuz-sayisi').textContent = String(STATEMENTS.length);

  optBtns.forEach((b) => b.addEventListener('click', () => answer(Number(b.dataset.val))));
  nextBtn.addEventListener('click', advanceManual);
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
    const k = e.key.toLowerCase();
    if (k === '1' || k === 'd') { answer(1); e.preventDefault(); }
    else if (k === '2' || k === 'y') { answer(0); e.preventDefault(); }
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
