// Bilgi Yarışması (Genel Kültür) — Bilişim Ajans
// Sorular aynı klasördeki sorular.json dosyasından yüklenir (aynı origin; dış istek yok).
// Puan, seri ve istatistik yalnızca bu tarayıcının localStorage alanında tutulur; sunucuya hiçbir şey gitmez.

const STORE_KEY = 'ba-oyun-bilgi-yarismasi';
const TIME_LIMIT_MS = 15000; // süreli modda soru başına süre
const MIN_QUESTIONS = 5; // bir turun başlaması için gereken en az soru
const SEEN_LIMIT = 600; // görülen soru listesinin üst sınırı

const $ = (id) => document.getElementById(id);
const root = $('oyun');

/* ---------- Depolama (gizli sekmede veya dolu depoda hata vermesin) ---------- */

const emptyStore = () => ({
  best: 0,
  seen: [],
  stats: { rounds: 0, answered: 0, correct: 0, bestStreak: 0, byCategory: {}, last: [] },
});

function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return emptyStore();
    const base = emptyStore();
    return {
      best: Number(raw.best) || 0,
      seen: Array.isArray(raw.seen) ? raw.seen.filter((x) => typeof x === 'string') : [],
      stats: { ...base.stats, ...(raw.stats || {}) },
    };
  } catch {
    return emptyStore();
  }
}

function saveStore() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* depo kapalıysa oyun yine çalışır, sadece kayıt tutulmaz */
  }
}

let store = loadStore();

/* ---------- Yardımcılar ---------- */

function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Soru metninden kısa, kararlı bir kimlik üretir (görülen soruları hatırlamak için). */
function questionId(q) {
  let h = 5381;
  for (let i = 0; i < q.soru.length; i++) h = ((h << 5) + h + q.soru.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

const fmtPct = (a, b) => (b ? `%${Math.round((a / b) * 100)}` : '—');
const levelDots = (n) => '●'.repeat(n) + '○'.repeat(3 - n);

function showPhase(phase) {
  root.dataset.phase = phase;
  for (const [id, ph] of [['ekran-yukleniyor', ['yukleniyor']], ['ekran-hata', ['hata']], ['ekran-ayar', ['ayar']], ['ekran-oyun', ['soru', 'cevaplandi']], ['ekran-sonuc', ['sonuc']]]) {
    $(id).hidden = !ph.includes(phase);
  }
}

/* ---------- Soru havuzu ---------- */

let allQuestions = [];

function isValidQuestion(q) {
  return q && typeof q.soru === 'string' && Array.isArray(q.siklar) && q.siklar.length === 4 &&
    q.siklar.every((s) => typeof s === 'string') && q.siklar.includes(q.dogru) &&
    typeof q.kategori === 'string' && [1, 2, 3].includes(q.zorluk);
}

async function loadQuestions() {
  const res = await fetch(new URL('./sorular.json', import.meta.url));
  if (!res.ok) throw new Error('http ' + res.status);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('biçim');
  return data.filter(isValidQuestion);
}

function fillCategories() {
  const sel = $('kategori');
  const names = [...new Set(allQuestions.map((q) => q.kategori))];
  const order = ['tarih', 'coğrafya', 'bilim', 'spor', 'sanat', 'Türkçe', 'genel'];
  names.sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  for (const n of names) {
    const count = allQuestions.filter((q) => q.kategori === n).length;
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = `${n.charAt(0).toLocaleUpperCase('tr')}${n.slice(1)} (${count} soru)`;
    sel.appendChild(opt);
  }
  $('havuz-sayisi').textContent = String(allQuestions.length);
}

/** Seçime uyan sorulardan, daha önce görülmeyenleri öne alarak bir tur seçer. */
function pickQuestions({ category, level, count }) {
  const pool = allQuestions.filter((q) => (category === 'hepsi' || q.kategori === category) && (level === 0 || q.zorluk === level));
  if (pool.length < MIN_QUESTIONS) return { picks: [], poolSize: pool.length };
  const seen = new Set(store.seen);
  const fresh = pool.filter((q) => !seen.has(questionId(q)));
  const picks = [...shuffle(fresh), ...shuffle(pool.filter((q) => seen.has(questionId(q))))].slice(0, count);
  // Taze soru kalmadıysa görülenler listesini bu turla yeniden başlat.
  const base = fresh.length <= count ? [] : store.seen;
  store.seen = [...base, ...picks.map(questionId)].slice(-SEEN_LIMIT);
  saveStore();
  return { picks: shuffle(picks), poolSize: pool.length };
}

/* ---------- Tur durumu ---------- */

let round = null;
const optionButtons = [...document.querySelectorAll('#siklar .bg-opt')];

function startRound({ questions, timed, practice }) {
  round = {
    questions, index: 0, timed, practice,
    score: 0, correct: 0, streak: 0, bestStreak: 0,
    jokerUsed: false, jokerThisQuestion: false,
    wrong: [], byCategory: {}, answered: false, current: null,
  };
  $('sure-kutu').hidden = !timed;
  $('toplam').textContent = String(questions.length);
  $('tur-etiketi').hidden = !practice;
  renderQuestion();
}

function renderQuestion() {
  const q = round.questions[round.index];
  const order = shuffle([0, 1, 2, 3]);
  round.current = { q, options: order.map((i) => q.siklar[i]) };
  round.answered = false;
  round.jokerThisQuestion = false;

  $('soru').textContent = q.soru;
  $('sira').textContent = String(round.index + 1);
  $('puan').textContent = String(round.score);
  $('seri').textContent = String(round.streak);
  $('kategori-etiket').textContent = `${q.kategori.charAt(0).toLocaleUpperCase('tr')}${q.kategori.slice(1)}`;
  const zorluk = $('zorluk-etiket');
  zorluk.textContent = levelDots(q.zorluk);
  zorluk.setAttribute('aria-label', `Zorluk ${q.zorluk}/3`);

  optionButtons.forEach((btn, i) => {
    btn.hidden = false;
    btn.disabled = false;
    btn.classList.remove('is-correct', 'is-wrong');
    btn.querySelector('.bg-t').textContent = round.current.options[i];
  });
  const joker = $('joker');
  joker.disabled = round.jokerUsed;
  joker.textContent = round.jokerUsed ? '50:50 kullanıldı' : '50:50 joker (1 hak)';
  $('geri-bildirim').textContent = '';
  $('geri-bildirim').className = 'bg-feedback';
  $('sonraki').hidden = true;
  showPhase('soru');
  if (round.timed) startTimer(TIME_LIMIT_MS);
  $('soru').focus({ preventScroll: false });
}

function useJoker() {
  if (!round || round.answered || round.jokerUsed) return;
  round.jokerUsed = true;
  round.jokerThisQuestion = true;
  const q = round.current.q;
  const wrongButtons = optionButtons.filter((btn, i) => round.current.options[i] !== q.dogru && !btn.hidden);
  shuffle(wrongButtons).slice(0, 2).forEach((btn) => { btn.hidden = true; });
  $('joker').disabled = true;
  $('joker').textContent = '50:50 kullanıldı';
  $('geri-bildirim').textContent = 'İki yanlış şık elendi. Bu sorudan alacağınız temel puan yarıya iner.';
}

function answer(index) {
  if (!round || round.answered) return;
  round.answered = true;
  const remainingMs = timer.running ? Math.max(0, timer.endAt - performance.now()) : timer.left;
  stopTimer();

  const { q, options } = round.current;
  const chosen = index === null ? null : options[index];
  const ok = chosen === q.dogru;
  const cat = (round.byCategory[q.kategori] ||= { c: 0, t: 0 });
  cat.t += 1;

  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (options[i] === q.dogru) btn.classList.add('is-correct');
    else if (i === index) btn.classList.add('is-wrong');
  });
  $('joker').disabled = true;

  const feedback = $('geri-bildirim');
  if (ok) {
    round.streak += 1;
    round.bestStreak = Math.max(round.bestStreak, round.streak);
    round.correct += 1;
    cat.c += 1;
    let base = q.zorluk * 10;
    if (round.jokerThisQuestion) base = Math.ceil(base / 2);
    const timeBonus = round.timed ? Math.ceil(remainingMs / 1000) : 0;
    const streakBonus = Math.min(round.streak - 1, 5) * 5;
    const gain = base + timeBonus + streakBonus;
    round.score += gain;
    const parts = [`temel ${base}`];
    if (timeBonus) parts.push(`süre ${timeBonus}`);
    if (streakBonus) parts.push(`seri ${streakBonus}`);
    feedback.textContent = `Doğru! +${gain} puan (${parts.join(' + ')})`;
    feedback.className = 'bg-feedback is-ok';
  } else {
    round.streak = 0;
    round.wrong.push({ q, chosen });
    feedback.textContent = chosen === null
      ? `Süre doldu. Doğru cevap: ${q.dogru}`
      : `Yanlış. Doğru cevap: ${q.dogru}`;
    feedback.className = 'bg-feedback is-bad';
  }
  $('puan').textContent = String(round.score);
  $('seri').textContent = String(round.streak);

  const last = round.index + 1 >= round.questions.length;
  const next = $('sonraki');
  next.textContent = last ? 'Sonucu gör' : 'Sonraki soru';
  next.hidden = false;
  showPhase('cevaplandi');
  next.focus();
}

function nextQuestion() {
  if (!round || !round.answered) return;
  if (round.index + 1 >= round.questions.length) return finishRound();
  round.index += 1;
  renderQuestion();
}

/* ---------- Süreli mod ---------- */

const timer = { id: 0, endAt: 0, left: TIME_LIMIT_MS, running: false, paused: false };

function paintTimer(leftMs) {
  const secs = Math.ceil(leftMs / 1000);
  $('sure-yazi').textContent = String(secs);
  const bar = $('sure-bar');
  bar.style.width = `${Math.max(0, Math.min(100, (leftMs / TIME_LIMIT_MS) * 100))}%`;
  bar.classList.toggle('is-low', secs <= 5);
}

function tickTimer() {
  const left = Math.max(0, timer.endAt - performance.now());
  timer.left = left;
  paintTimer(left);
  if (left <= 0) answer(null);
}

function startTimer(ms) {
  stopTimer();
  timer.left = ms;
  timer.endAt = performance.now() + ms;
  timer.running = true;
  timer.paused = false;
  paintTimer(ms);
  timer.id = setInterval(tickTimer, 100);
}

function stopTimer() {
  clearInterval(timer.id);
  timer.running = false;
  timer.paused = false;
}

// Sekme arka plana geçince süre durur; haksız yere kaybetmeyin.
document.addEventListener('visibilitychange', () => {
  if (!round || round.answered || !round.timed) return;
  if (document.hidden && timer.running) {
    clearInterval(timer.id);
    timer.left = Math.max(0, timer.endAt - performance.now());
    timer.running = false;
    timer.paused = true;
  } else if (!document.hidden && timer.paused) {
    timer.endAt = performance.now() + timer.left;
    timer.running = true;
    timer.paused = false;
    timer.id = setInterval(tickTimer, 100);
  }
});

/* ---------- Sonuç ve istatistik ---------- */

function gradeText(pct) {
  if (pct >= 90) return 'Muhteşem! Genel kültürünüz parlıyor.';
  if (pct >= 70) return 'Çok iyi! Küçük bir cilayla tam puana yaklaşırsınız.';
  if (pct >= 50) return 'İyi bir başlangıç. Yanlışlara göz atıp yeniden deneyin.';
  return 'Pes etmeyin; yanlışları gözden geçirmek en hızlı öğrenme yoludur.';
}

function finishRound() {
  stopTimer();
  const total = round.questions.length;
  const pct = Math.round((round.correct / total) * 100);
  let newRecord = false;

  if (!round.practice) {
    const s = store.stats;
    s.rounds += 1;
    s.answered += total;
    s.correct += round.correct;
    s.bestStreak = Math.max(s.bestStreak, round.bestStreak);
    for (const [name, v] of Object.entries(round.byCategory)) {
      const cur = (s.byCategory[name] ||= { c: 0, t: 0 });
      cur.c += v.c;
      cur.t += v.t;
    }
    s.last = [...(s.last || []), { score: round.score, correct: round.correct, total }].slice(-5);
    if (round.score > store.best) {
      store.best = round.score;
      newRecord = round.score > 0;
    }
    saveStore();
  }

  $('sonuc-puan').textContent = String(round.score);
  $('sonuc-ozet').textContent = `${round.correct}/${total} doğru · ${fmtPct(round.correct, total)} · en uzun seri ${round.bestStreak}`;
  $('sonuc-yorum').textContent = gradeText(pct);
  $('sonuc-rekor').hidden = !newRecord;
  $('sonuc-en-yuksek').textContent = round.practice
    ? 'Tekrar turu istatistiklere ve rekora yazılmaz.'
    : `En yüksek puanınız: ${store.best}`;

  const list = $('yanlislar');
  list.replaceChildren();
  for (const { q, chosen } of round.wrong) {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = q.soru;
    const you = document.createElement('span');
    you.className = 'bg-you';
    you.textContent = chosen === null ? 'Cevabınız: süre doldu' : `Cevabınız: ${chosen}`;
    const right = document.createElement('span');
    right.className = 'bg-right';
    right.textContent = `Doğru cevap: ${q.dogru}`;
    li.append(strong, you, right);
    list.appendChild(li);
  }
  $('yanlis-baslik').hidden = round.wrong.length === 0;
  $('yanlis-yok').hidden = round.wrong.length !== 0;
  list.hidden = round.wrong.length === 0;
  $('yanlis-coz').hidden = round.wrong.length === 0;

  showPhase('sonuc');
  $('sonuc-baslik').focus();
}

function renderStats() {
  const s = store.stats;
  const box = $('istatistik');
  if (!s.rounds) {
    box.hidden = true;
    return;
  }
  box.hidden = false;
  $('ist-tur').textContent = String(s.rounds);
  $('ist-soru').textContent = String(s.answered);
  $('ist-dogruluk').textContent = fmtPct(s.correct, s.answered);
  $('ist-puan').textContent = String(store.best);
  $('ist-seri').textContent = String(s.bestStreak);
  $('ist-son').textContent = (s.last || []).map((x) => x.score).join(' · ') || '—';
  const ul = $('ist-kategori');
  ul.replaceChildren();
  const rows = Object.entries(s.byCategory).filter(([, v]) => v.t > 0).sort((a, b) => b[1].c / b[1].t - a[1].c / a[1].t);
  for (const [name, v] of rows) {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = `${name.charAt(0).toLocaleUpperCase('tr')}${name.slice(1)}`;
    const val = document.createElement('span');
    val.textContent = `${fmtPct(v.c, v.t)} (${v.c}/${v.t})`;
    const meter = document.createElement('i');
    meter.style.setProperty('--w', `${Math.round((v.c / v.t) * 100)}%`);
    meter.setAttribute('aria-hidden', 'true');
    li.append(label, val, meter);
    ul.appendChild(li);
  }
}

function goSetup(focus = true) {
  stopTimer();
  round = null;
  renderStats();
  $('ayar-uyari').textContent = '';
  showPhase('ayar');
  if (focus) $('baslat').focus();
}

/* ---------- Olaylar ---------- */

function startFromSetup() {
  const category = $('kategori').value;
  const level = Number($('zorluk').value);
  const wanted = Number($('soru-sayisi').value);
  const timed = $('mod').value === 'sureli';
  const { picks, poolSize } = pickQuestions({ category, level, count: wanted });
  const warn = $('ayar-uyari');
  if (poolSize < MIN_QUESTIONS) {
    warn.textContent = 'Bu seçimde yeterli soru yok. Kategoriyi "Karışık" yapın veya zorluk seviyesini "Hepsi" olarak değiştirin.';
    return;
  }
  warn.textContent = poolSize < wanted ? `Bu seçimde ${poolSize} soru var; tur ${poolSize} soruyla başlıyor.` : '';
  startRound({ questions: picks, timed, practice: false });
}

optionButtons.forEach((btn, i) => btn.addEventListener('click', () => answer(i)));
$('joker').addEventListener('click', useJoker);
$('sonraki').addEventListener('click', nextQuestion);
$('baslat').addEventListener('click', startFromSetup);
$('tekrar').addEventListener('click', startFromSetup);
$('ayara-don').addEventListener('click', () => goSetup());
$('birak').addEventListener('click', () => goSetup());
$('yanlis-coz').addEventListener('click', () => {
  const again = shuffle(round.wrong.map((w) => w.q));
  startRound({ questions: again, timed: round.timed, practice: true });
});

let resetArmed = 0;
$('ist-sifirla').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  if (!resetArmed) {
    btn.textContent = 'Emin misiniz? Silmek için tekrar tıklayın';
    resetArmed = setTimeout(() => { resetArmed = 0; btn.textContent = 'İstatistikleri sıfırla'; }, 4000);
    return;
  }
  clearTimeout(resetArmed);
  resetArmed = 0;
  btn.textContent = 'İstatistikleri sıfırla';
  store = emptyStore();
  saveStore();
  renderStats();
});

// Klavye: 1-4 şık seçer, J jokeri kullanır. Seçim ekranındaki alanlara dokunmaz.
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || root.dataset.phase !== 'soru') return;
  const idx = ['1', '2', '3', '4'].indexOf(e.key);
  if (idx >= 0) {
    const btn = optionButtons[idx];
    if (!btn.hidden && !btn.disabled) {
      e.preventDefault();
      btn.click();
    }
  } else if (e.key === 'j' || e.key === 'J') {
    e.preventDefault();
    $('joker').click();
  }
});

// Tam ekran (destekleyen tarayıcılarda): yalnızca oyun kutusu görünür, reklam alanları dışarıda kalır.
const fsBtn = $('tam-ekran');
if (document.fullscreenEnabled) {
  fsBtn.hidden = false;
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else root.requestFullscreen?.().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === root;
    fsBtn.setAttribute('aria-pressed', String(on));
    fsBtn.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

/* ---------- Başlangıç ---------- */

(async function init() {
  showPhase('yukleniyor');
  try {
    allQuestions = await loadQuestions();
    if (allQuestions.length < MIN_QUESTIONS) throw new Error('boş');
    fillCategories();
    goSetup(false);
  } catch {
    showPhase('hata');
  }
})();
